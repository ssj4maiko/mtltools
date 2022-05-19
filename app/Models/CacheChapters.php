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
    public function setIdNovel(int $idNovel)
    {
        $this->idNovel = $idNovel;
    }
    public function setNoChapter(int $noChapter)
    {
        $this->noChapter = $noChapter;
    }
    public function setIdDictionary(int $idDictionary)
    {
        $this->idDictionary = $idDictionary;
    }

    private const CACHEFOLDER = 'public/chapters/';
    private const AVERAGE_CHAR_COUNT = 25000;
    private $forceCache = false;
    public function Lock(string $key)
    {
        return Storage::put(self::CACHEFOLDER . '/lock/' . $key . '.lock', 1);
    }
    public function checkLock(string $key)
    {
        return false;
        return Storage::exists(self::CACHEFOLDER . '/lock/' . $key . '.lock');
    }
    public function Unlock(string $key)
    {
        return Storage::delete(self::CACHEFOLDER . '/lock/' . $key . '.lock');
    }

    public function get(int $part)
    {
        if($this->idNovel === 0) {
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
            $cachedChapter = $this->create($this->idDictionary,$this->idNovel, $this->noChapter);
            return [
                'view' => $cachedChapter['view'],
                'status' => $cachedChapter['status']
            ];
        }
    }
    private function UrlCreator(Novel $novel, int $noChapter, int $part, int $total, string $direction = '=')
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
    public function create()
    {
        if ($this->idNovel === 0) {
            throw new \Throwable("There is no novel, you are doing something wrong.", 404);
        }
        $cacheDictionary = new CacheDictionary($this->idDictionary);
        $cache = $cacheDictionary->get();

        $view = null;
        $status = false;

        if ($cache) {
            $cacheName = self::CACHEFOLDER .  $this->idDictionary . '/' . $this->idNovel . '/' . $this->noChapter . '-{part}.html';

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
                    $translatedText = $chapter->translateText($cacheDictionary);

                    /*
                    while ($textLength > $strStart) {
                        $strEnd += self::AVERAGE_CHAR_COUNT;
                        if ($strEnd < $textLength) {
                            $strEnd = strpos($translatedText, "\n", $strEnd);
                            $chunks[] = substr($translatedText, $strStart, $strEnd);
                        } else {
                            $chunks[] = substr($translatedText, $strStart);
                        }
                        $strStart = $strEnd + 1;
                    };
                    */

                    $view = view('cache/chapter', [
                        'text'      => $translatedText,
                        'novel'     => $novel,
                        'chapter'   => $chapter,
                        'total'     => 1,
                        'part'      => 1,
                        'control'   =>  [
                            'previous'  =>  $this->UrlCreator($novel, $this->noChapter, 0, 1, '-'),
                            'next'      =>  $this->UrlCreator($novel, $this->noChapter, 0, 1, '+')
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
                    if($driver){
                        $url = $driver->prepareUrl();
                        if($url){
                            $view = view('cache/wait', [
                                'novel'     => $novel,
                                'total'     => $novel->numberChapters,
                                'no'        => $this->noChapter,
                                'url'       => $url,
                                'control'   =>  [
                                    'update'  =>  '/api/chapter/autoUpdate/' . $novel->id,
                                    'current'  =>  $this->UrlCreator($novel, $this->noChapter, 0, 1, '='),
                                    'previous'  =>  $this->UrlCreator($novel, $this->noChapter, 0, 1, '-')
                                ]
                            ]);
                        }
                    }
                }
                if(!$view){
                    $view = view('cache/stop', [
                        'novel'     => $novel,
                        'total'     => $novel->numberChapters,
                        'no'        => $this->noChapter,
                        'url'       => $url,
                        'control'   =>  [
                            'current'  =>  $this->UrlCreator($novel, $this->noChapter, 0, 1, '='),
                            'previous'  =>  $this->UrlCreator($novel, $this->noChapter, 0, 1, '-')
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
