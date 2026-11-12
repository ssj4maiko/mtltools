<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use RuntimeException;

/**
 * Moves base64 images (data:image/...;base64,...) out of chapter text into files.
 *
 *   storage/app/public/images/<h2>/<sha256>.<ext>   (served by nginx at /images/<h2>/<sha256>.<ext>)
 *
 * - Content-addressed: identical images are stored once; the extension comes from the bytes
 *   (the epub scrapper labelled every image image/jpeg).
 * - Idempotent: rows without data:image are not touched, existing files are reused.
 * - Each row update is conditional on the text being unchanged since it was read.
 * - Records every reference in chapter_images and writes a JSONL manifest to storage/app/image-extraction/.
 * - --dry-run writes only the manifest (no files, no DB writes).
 */
class ExtractChapterImages extends Command
{
    protected $signature = 'chapters:extract-images
                            {--dry-run : Only report what would change (writes the manifest only)}
                            {--novel=* : Limit to these idNovel values}
                            {--limit=0 : Process at most N chapters}';

    protected $description = 'Extract base64 images from chapter text into /images/<h2>/<sha256>.<ext> files';

    private const COLUMNS = ['textOriginal', 'textRevision', 'textCustom'];
    // Possessive quantifier: no backtracking over multi-MB base64 runs.
    private const PATTERN = '~data:(image/[a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=]++)~';

    public function handle(): int
    {
        $dry = (bool) $this->option('dry-run');
        $novels = array_map('intval', (array) $this->option('novel'));
        $limit = (int) $this->option('limit');
        $imagesDir = storage_path('app/public/images');
        $manifestDir = storage_path('app/image-extraction');
        if (!is_dir($manifestDir)) {
            mkdir($manifestDir, 0750, true);
        }
        $manifestPath = $manifestDir . '/' . date('Ymd-His') . ($dry ? '-dry' : '') . '.jsonl';
        $manifest = fopen($manifestPath, 'w');

        $keys = DB::table('chapters')->select('idNovel', 'no')
            ->where(function ($q) {
                foreach (self::COLUMNS as $col) {
                    $q->orWhere($col, 'LIKE', '%data:image%');
                }
            })
            ->when($novels, fn ($q) => $q->whereIn('idNovel', $novels))
            ->orderBy('idNovel')->orderBy('no')
            ->when($limit > 0, fn ($q) => $q->limit($limit))
            ->get();

        $t = ['rows' => 0, 'updated' => 0, 'conflicts' => 0, 'uris' => 0, 'skipped_uris' => 0,
              'would' => 0, 'files_new' => 0, 'files_existing' => 0, 'file_bytes_new' => 0, 'before' => 0, 'after' => 0, 'leftover_rows' => 0];
        $seen = [];
        $this->info(($dry ? '[dry-run] ' : '') . count($keys) . ' chapters contain data:image');
        $bar = $this->output->createProgressBar(count($keys));

        foreach ($keys as $key) {
            $row = DB::table('chapters')->select(self::COLUMNS)
                ->where('idNovel', $key->idNovel)->where('no', $key->no)->first();
            if (!$row) {
                $bar->advance();
                continue;
            }
            $t['rows']++;
            $updates = [];
            $refs = [];
            $conditions = [];

            foreach (self::COLUMNS as $col) {
                $text = $row->{$col};
                if ($text === null || strpos($text, 'data:image') === false) {
                    continue;
                }
                $new = preg_replace_callback(self::PATTERN, function ($m) use ($col, $dry, $imagesDir, &$t, &$seen, &$refs) {
                    $t['uris']++;
                    $bin = base64_decode($m[2], true);
                    $ext = $bin === false ? null : self::sniff($bin);
                    if ($ext === null) {
                        $t['skipped_uris']++;
                        return $m[0];
                    }
                    $sha = hash('sha256', $bin);
                    $rel = substr($sha, 0, 2) . '/' . $sha . '.' . $ext;
                    if (!isset($seen[$rel])) {
                        $seen[$rel] = true;
                        $path = $imagesDir . '/' . $rel;
                        if (is_file($path) && filesize($path) === strlen($bin)) {
                            $t['files_existing']++;
                        } else {
                            $t['files_new']++;
                            $t['file_bytes_new'] += strlen($bin);
                            if (!$dry) {
                                self::writeAtomic($path, $bin);
                            }
                        }
                    }
                    $k = $col . '|' . $sha;
                    $refs[$k] = $refs[$k] ?? ['col' => $col, 'sha256' => $sha, 'ext' => $ext, 'bytes' => strlen($bin), 'refs' => 0];
                    $refs[$k]['refs']++;
                    return '/images/' . $rel;
                }, $text);
                if ($new === null) {
                    throw new RuntimeException("preg error " . preg_last_error_msg() . " on {$key->idNovel}/{$key->no} {$col}");
                }
                if (strpos($new, 'data:image') !== false) {
                    $t['leftover_rows']++;
                }
                if ($new !== $text) {
                    $updates[$col] = $new;
                    $conditions[$col] = [strlen($text), md5($text)];
                    $t['before'] += strlen($text);
                    $t['after'] += strlen($new);
                }
            }

            $status = $updates ? ($dry ? 'would-update' : 'updated') : 'unchanged';
            if ($updates && $dry) {
                $t['would']++;
            }
            if ($updates && !$dry) {
                $affected = DB::transaction(function () use ($key, $updates, $conditions, $refs) {
                    $q = DB::table('chapters')->where('idNovel', $key->idNovel)->where('no', $key->no);
                    foreach ($conditions as $col => [$len, $md5]) {
                        $q->whereRaw("LENGTH(`$col`) = ? AND MD5(`$col`) = ?", [$len, $md5]);
                    }
                    $affected = $q->update($updates);
                    if ($affected === 1) {
                        foreach ($refs as $r) {
                            DB::table('chapter_images')->upsert(
                                [['idNovel' => $key->idNovel, 'no' => $key->no] + $r],
                                ['idNovel', 'no', 'col', 'sha256'],
                                ['refs', 'ext', 'bytes']
                            );
                        }
                    }
                    return $affected;
                });
                if ($affected === 1) {
                    $t['updated']++;
                } else {
                    $t['conflicts']++;
                    $status = 'conflict-skipped';
                }
            }
            fwrite($manifest, json_encode([
                'idNovel' => $key->idNovel, 'no' => $key->no, 'status' => $status,
                'columns' => array_map(fn ($c) => ['before' => $c[0]], $conditions),
                'after' => array_map('strlen', $updates),
                'images' => array_values($refs),
            ]) . "\n");
            $bar->advance();
        }
        $bar->finish();
        fclose($manifest);
        $this->newLine();

        $mb = fn ($b) => round($b / 1048576, 1) . ' MB';
        $this->table(['metric', 'value'], [
            ['chapters scanned', $t['rows']],
            [$dry ? 'chapters that would change' : 'chapters updated', $dry ? $t['would'] : $t['updated']],
            ['conflicts (text changed meanwhile, skipped)', $t['conflicts']],
            ['data URIs found', $t['uris']],
            ['data URIs left as-is (undecodable/unknown type)', $t['skipped_uris']],
            ['rows still containing data:image', $t['leftover_rows']],
            [$dry ? 'files that would be written' : 'files written', $t['files_new'] . ' (' . $mb($t['file_bytes_new']) . ')'],
            ['files already present', $t['files_existing']],
            ['text before -> after', $mb($t['before']) . ' -> ' . $mb($t['after'])],
            ['manifest', $manifestPath],
        ]);
        return self::SUCCESS;
    }

    private static function sniff(string $b): ?string
    {
        if (strncmp($b, "\xFF\xD8\xFF", 3) === 0) return 'jpg';
        if (strncmp($b, "\x89PNG\r\n\x1A\n", 8) === 0) return 'png';
        if (strncmp($b, 'GIF8', 4) === 0) return 'gif';
        if (strncmp($b, 'RIFF', 4) === 0 && substr($b, 8, 4) === 'WEBP') return 'webp';
        return null;
    }

    private static function writeAtomic(string $path, string $bin): void
    {
        $dir = dirname($path);
        if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
            throw new RuntimeException("cannot create $dir");
        }
        $tmp = $path . '.tmp-' . getmypid();
        if (file_put_contents($tmp, $bin) !== strlen($bin) || !rename($tmp, $path)) {
            @unlink($tmp);
            throw new RuntimeException("cannot write $path");
        }
        chmod($path, 0644);
    }
}
