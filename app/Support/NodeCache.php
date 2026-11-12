<?php

namespace App\Support;

/**
 * Deletes Node's on-disk chapter-list and single-chapter caches.
 * Needed while Laravel still handles writes.
 * Files live at storage/app/node-cache/chapter-list/{idNovel}.json
 * and storage/app/node-cache/chapter/{idNovel}/{no}.json
 * (storage-prod in the prod stack).
 */
class NodeCache
{
    public static function invalidateChapterList(?int $idNovel): void
    {
        if (!$idNovel) {
            return;
        }
        $list = storage_path('app/node-cache/chapter-list/' . $idNovel . '.json');
        if (is_file($list)) {
            @unlink($list);
        }
        $dir = storage_path('app/node-cache/chapter/' . $idNovel);
        if (is_dir($dir)) {
            foreach (glob($dir . '/*.json') ?: [] as $file) {
                @unlink($file);
            }
            @rmdir($dir);
        }
    }
}
