<?php
namespace App\Models;

ini_set('memory_limit', '-1');

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use App\Drivers\Syosetu;
use App\Services\ChapterService;
use Illuminate\Contracts\Routing\UrlGenerator;

class CacheChapters extends Model
{
    private $idNovel = null;
    private $noChapter = null;
    private $idDictionary = null;
    private $URLGenerator;
    public function __construct(int $idDictionary, int $idNovel = 0, int $noChapter = 0, $forceCache = false)
    {
        $this->setIdNovel($idNovel);
        $this->setNoChapter($noChapter);
        $this->setIdDictionary($idDictionary);
        $this->URLGenerator = app(UrlGenerator::class);
        $this->forceCache = $forceCache;
    }
    public function setIdNovel(int $idNovel): void
    {
        $this->idNovel = $idNovel;
    }
    public function setNoChapter(int $noChapter): void
    {
        $this->noChapter = $noChapter;
    }
    public function setIdDictionary(int $idDictionary): void
    {
        $this->idDictionary = $idDictionary;
    }

    private const CACHEFOLDER = 'public/chapters/';
    private const AVERAGE_CHAR_COUNT = 25000;
    private $forceCache = false;
    public function Lock(string $key): bool
    {
        return Storage::put(self::CACHEFOLDER . '/lock/' . $key . '.lock', 1);
    }
    public function checkLock(string $key): bool
    {
        return false;
        return Storage::exists(self::CACHEFOLDER . '/lock/' . $key . '.lock');
    }
    public function Unlock(string $key): bool
    {
        return Storage::delete(self::CACHEFOLDER . '/lock/' . $key . '.lock');
    }
    /**
     * Returns the cache page or creates it on the fly.
     * Because Novel, Chapter and Dictionary are set on construction, we just have to pass the part if it's divided, otherwise, always 1
     *
     * @param integer $part
     * @return [view:string,status:bool]
     */
    public function get(int $part = 1): array
    {
        if ($this->idNovel === 0) {
            throw new \Exception("There is no novel, you are doing something wrong.", 404);
        }
        $cacheName = self::CACHEFOLDER . $this->idNovel . '/' . $this->idDictionary . '/' . $this->noChapter . '-' . $part . '.html';
        if (Storage::exists($cacheName)) {
            return [
                'view' => Storage::get($cacheName),
                'status' => true
            ];
        } else {
            $this->forceCache = true;
            $cachedChapter = $this->create($this->idDictionary, $this->idNovel, $this->noChapter);
            return [
                'view' => $cachedChapter['view'],
                'status' => $cachedChapter['status']
            ];
        }
    }
    /**
     * Returns the String for the static URL relative to the values inserted
     *
     * @param Novel $novel
     * @param integer $noChapter
     * @param integer $part
     * @param integer $total
     * @param string $direction = '-'|'+'|'='
     * @return string
     */
    private function UrlCreator(Novel $novel, int $noChapter, int $part, int $total, string $direction = '='): ?string
    {
        // URL::current();
        switch ($direction) {
            case '-':
                --$noChapter;
                if ($noChapter == 0) {
                    return null;
                }
                break;
            case '+':
                ++$noChapter;

                // If it's syosetu, there could still be more chapters, but if it's manually uploaded, then there shouldn't be any
                // Otherwise, they just need to reset the cache in this rare situation
                if (!$novel->driver && $noChapter > $novel->numberChapters) {
                    return null;
                }
                break;
        }
        $array = [$novel->id, $this->idDictionary, $noChapter, $part + 1];
        return $this->URLGenerator->to('/static/' . implode('/', $array));
    }
    /**
     * Creation of the cache
     *
     * @return [view:string,status:bool]
     */
    public function create(): array
    {
        if ($this->idNovel === 0) {
            throw new \Throwable("There is no novel, you are doing something wrong.", 404);
        }
        $cacheDictionary = new CacheDictionary($this->idDictionary);
        $cache = $cacheDictionary->get();
        $view = null;
        $status = false;

        if ($cache) {
            $cacheName = self::CACHEFOLDER . $this->idDictionary . '/' . $this->idNovel . '/' . $this->noChapter . '-{part}.html';

            /** @var Novel $novel */
            $novel = Novel::where('id', $this->idNovel)->first();
            $chapterService = app(ChapterService::class);

            /** @var Chapter $chapter */
            $chapter = $chapterService->get($this->idNovel, $this->noChapter);
            if ($chapter) {
                // To avoid  multiple translations at the same time, marking it here so that others wait.
                $key = intval($this->idNovel . $this->idDictionary . $this->noChapter);

                if (!$this->checkLock($key)) {
                    // There is no processing this yet
                    $this->Lock($key);
                    $cacheDictionary = json_decode($cache);

                    $separator = '||||||||||';
                    $translated = explode(
                        $separator,
                        $chapter->translateText(
                            $chapter->title . $separator .
                            $chapter->arc . $separator .
                            ($chapter->textRevision ? $chapter->textRevision : $chapter->textOriginal)
                            ,
                            $cacheDictionary
                        )
                    );

                    $view = view('cache/chapter', [
                        'text' => $translated[2],
                        'title' => $translated[0],
                        'arc' => $translated[1],
                        'novel' => $novel,
                        'chapter' => $chapter,
                        'total' => 1,
                        'part' => 1,
                        'control' => [
                            'previous' => $this->UrlCreator($novel, $this->noChapter, 0, 1, '-'),
                            'next' => $this->UrlCreator($novel, $this->noChapter, 0, 1, '+')
                        ]
                    ]);
                    $status = true;
                    Storage::put(str_replace('{part}', 1, $cacheName), $view);
                    $this->Unlock($key);
                } else {
                    throw new \Exception("Chapter is not ready yet", 404);
                }
            } else {
                if ($novel->driver) {
                    $driver = $novel->startDriver($novel->numberChapters + 1);
                    if ($driver) {
                        $url = $driver->prepareUrl();
                        if ($url) {
                            $view = view('cache/wait', [
                                'novel' => $novel,
                                'total' => $novel->numberChapters,
                                'no' => $this->noChapter,
                                'url' => $url,
                                'control' => [
                                    'update' => '/api/chapter/autoUpdate/' . $novel->id,
                                    'current' => $this->UrlCreator($novel, $this->noChapter, 0, 1, '='),
                                    'previous' => $this->UrlCreator($novel, $this->noChapter, 0, 1, '-')
                                ]
                            ]);
                        }
                    }
                }
                if (!$view) {
                    $view = view('cache/stop', [
                        'novel' => $novel,
                        'total' => $novel->numberChapters,
                        'no' => $this->noChapter,
                        'url' => $url,
                        'control' => [
                            'current' => $this->UrlCreator($novel, $this->noChapter, 0, 1, '='),
                            'previous' => $this->UrlCreator($novel, $this->noChapter, 0, 1, '-')
                        ]
                    ]);
                }

                //throw new \Exception("No chapter", 1);
            }
            //return Storage::url($cacheName);
        } else {
            throw new \Exception("No dictionary", 1);
        }
        // To say there is nothing important to return;
        return [
            'view' => $view,
            'status' => $status
        ];
    }
    /**
     * Delete all caches related to Dictionary, or related to chapter number (A reminder that some chapters used to have multiple parts)
     *
     * @param boolean $noChapter
     * @return void
     */
    public function del($noChapter = false)
    {
        if (!$noChapter) {
            $cacheName = self::CACHEFOLDER . $this->idDictionary . '/';
            return Storage::deleteDirectory($cacheName);
        }
        $cacheName = self::CACHEFOLDER . $this->idDictionary . '/';
        return Storage::deleteDirectory($cacheName);
        // Create something that will get all the files and manually check each instance to see if needs to delete
        $cacheName = self::CACHEFOLDER . $this->idDictionary . '/' . '/*/' . $noChapter . '-*.html';
    }
}
