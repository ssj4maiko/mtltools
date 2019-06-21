<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Contracts\Routing\UrlGenerator;
use App\Http\Controllers\NovelController;
use App\Http\Controllers\DictionaryController;

use App\Novel;
use App\Chapter;

use App\Drivers\Syosetu;
use Illuminate\Support\Facades\Storage;

class ChapterController extends Controller
{
    private $URL;
    public function __construct(UrlGenerator $url){
        $this->URL = $url;
    }
	public function getAll($idNovel){
		return Chapter::select('idNovel','no','title','dateCreated', 'dateRevision','dateOriginalPost', 'dateOriginalRevision')
					  ->addSelect(DB::raw('(textOriginal IS NOT NULL) as hasText'))
					  ->where(['idNovel' => $idNovel])
					  ->get();
	}
	public function get($idNovel, $no) {
		return Chapter::select()->addSelect(DB::raw('(textOriginal IS NOT NULL) as hasText'))
						->where(['idNovel' => $idNovel, 'no' => $no])
						->first();
	}
	public function insert(Request $request, $idNovel) {
		$data = Chapter::prepare($request->json()->all());
		return Chapter::create($data);
	}
	public function update(Request $request, $idNovel, $no) {
		$chapter = Chapter::where(['idNovel' => $idNovel, 'no' => $no])->findOrFail();
		$data = Chapter::prepare($request->json()->all());
		$chapter->update($data);

		return $chapter;
	}
	public function delete($idNovel, $no) {
		Chapter::where(['idNovel' => $idNovel, 'no' => $no])
			   ->get()
			   ->delete();

		return 204;
	}


	// This function only exists for online novels, not when importing from files.
	public function importNext(NovelController $NC, $idNovel) {
		$novel = $NC->get($idNovel);
		if(!$novel->flagSyosetu){
			return null;
		}
		$syosetu = new Syosetu($novel->code, $novel->numberChapters+1);

		$chapter = $syosetu->importChapter();
		$chapter->idNovel = $idNovel;
		$chapter->save();
		$chapter->empty = 0;


		$novel->numberChapters++;
		$novel->save();

		// For some reason the chapter number resets to 0? So let's fix this for the Front.
		$chapter->no = $novel->numberChapters;

		return ['chapter' => $chapter, 'novel' => $novel];
	}


	public function importIndex(NovelController $NC, $idNovel){
		$novel = $NC->get($idNovel);
		if(!$novel->flagSyosetu){
			return null;
		}

		$syosetu = new Syosetu($novel->code);
		$chapters = $syosetu->importIndex($idNovel);

		//DB::table('chapters')->insert($chapters);

		$novel->numberChapters = count($chapters);
		//$novel->save();

		return $chapters;
		//foreach ($chapters as $value) {}
	}

    public function updateIndex(NovelController $NC, $idNovel){
		$novel = $NC->get($idNovel);
		if(!$novel->flagSyosetu){
			return null;
		}

		$syosetu = new Syosetu($novel->code);
		$chapters = $syosetu->importIndex($idNovel);
		$KnownChapters = $this->getAll($idNovel);


		$counter = 0;
		foreach($KnownChapters as $KnownChapter){

			// UPDATE
			$counter = $KnownChapter->no;
			if(isset($chapters[ $counter ])){
				$update = false;

				if(!$KnownChapter->hasText){
					// There is no text, go get it
					$update = 1;
					$KnownChapter->textOriginal = $syosetu->importContent($counter);
					$KnownChapter->dateOriginalRevision = $chapters[ $counter ]['dateOriginalRevision'];
				} elseif (
					(empty($KnownChapter->dateOriginalRevision) && $chapters[ $counter ]['dateOriginalRevision'])
					||
					($chapters[ $counter ]['dateOriginalRevision'] > $KnownChapter->dateOriginalRevision)
				) {
					// There is a revision
					$update = 2;
					$KnownChapter->textRevision = $syosetu->importContent($counter);
					$KnownChapter->dateOriginalRevision = $chapters[ $counter ]['dateOriginalRevision'];
				}

				if($update){
					$KnownChapter->save();
				}
			}
		}

        // If there are more
		$length = count($chapters);
		for(++$counter;$counter <= $length; ++$counter){

			$chapter = new Chapter();
			$chapter->idNovel = $chapters[ $counter ]['idNovel'];
			$chapter->no = $chapters[ $counter ]['no'];
			$chapter->title = $chapters[ $counter ]['title'];
			$chapter->textOriginal = $syosetu->importContent($counter);
			$chapter->dateOriginalPost = $chapters[ $counter ]['dateOriginalPost'];
			$chapter->dateOriginalRevision = $chapters[ $counter ]['dateOriginalRevision'];
            $chapter->save();
        }
		$novel->numberChapters = count($chapters);
		$novel->save();

        return $novel;
    }

    private const CACHEFOLDER = 'public/chapters/';
    private const AVERAGE_CHAR_COUNT = 25000;
    private $forceCache = false;
    public function Lock($key){
        return Storage::put(self::CACHEFOLDER.'/lock/'.$key.'.lock',1);
    }
    public function checkLock($key){
        return Storage::exists(self::CACHEFOLDER.'/lock/'.$key.'.lock');
    }
    public function Unlock($key){
        return Storage::delete(self::CACHEFOLDER.'/lock/'.$key.'.lock');
    }
    public function getCache($idNovel, $idDictionary, $noChapter, $part){
        $cacheName = self::CACHEFOLDER.$idNovel.'/'.$idDictionary.'/'.$noChapter.'-'.$part.'.html';
        if(Storage::exists($cacheName)){
            return Storage::get($cacheName);
        } else {
            $this->forceCache = true;
            $unexpectContent = $this->createCache($idNovel, $idDictionary, $noChapter);
            if(!$unexpectContent)
                return Storage::get($cacheName);
            else
                return $unexpectContent;
        }
    }
    private function UrlCreator($novel, $idDictionary, $noChapter, $part, $total, $direction = '='){
        // URL::current();
        switch($direction){
            case '-':
                --$part;
                if($part < 0){
                    $part = 0;
                    --$noChapter;
                    if($noChapter==0){
                        return null;
                    }
                }
                break;
            case '+':
                ++$part;
                if($part >= $total){
                    $part = 1;
                    ++$noChapter;

                    // If it's syosetu, there could still be more chapters, but if it's manually uploaded, then there shouldn't be any
                    // Otherwise, they just need to reset the cache in this rare situation
                    if(!$novel->flagSyosetu && $noChapter > $novel->numberChapters){
                        return null;
                    }
                }
                break;
        }
        $array = [$novel->id, $idDictionary, $noChapter, $part+1];
        return $this->URL->to('/static/'.implode('/',$array));
    }
    public function createCache($idNovel, $idDictionary, $noChapter){
        $DICC = new DictionaryController($this->URL);

        $cacheName = self::CACHEFOLDER.$idNovel.'/'.$idDictionary.'/'.$noChapter.'-{part}.html';

        $NOVC = new NovelController();
        $novel = $NOVC->get($idNovel);
        $cache = $DICC->getCache($idNovel, $idDictionary);
        if($cache){

            $chapter = $this->get($idNovel, $noChapter);

            if($chapter){
                // To avoid  multiple translations at the same time, marking it here so that others wait.
                $key = intval($idNovel.$idDictionary.$noChapter);
                if(!$this->checkLock($key)){
                    // There is no processing this yet
                    $this->Lock($key);
                    $cacheDictionary = json_decode($cache);

                    $translatedText = $chapter->translateText($cacheDictionary[0]);

                    $strStart = $strEnd = 0;
                    $textLength = strlen($translatedText);
                    $chunks = [];
                    while($textLength > $strStart) {
                        $strEnd+=self::AVERAGE_CHAR_COUNT;
                        if($strEnd < $textLength){
                            $strEnd = strpos($translatedText, "\n", $strEnd);
                            $chunks[] = substr($translatedText, $strStart, $strEnd);
                        } else {
                            $chunks[] = substr($translatedText, $strStart);
                        }
                        $strStart = $strEnd+1;
                    };

                    $total = count($chunks);
                    for($i = 0; $i < $total; ++$i){
                        Storage::put(str_replace('{part}',$i+1,$cacheName), view('cache/chapter',[
                                'text'      => $chunks[$i],
                                'novel'     => $novel,
                                'chapter'   => $chapter,
                                'total'     => $total,
                                'part'      => $i+1,
                                'control'   =>  [
                                    'previous'  =>  $this->UrlCreator($novel,$idDictionary,$noChapter, $i, $total, '-'),
                                    'next'      =>  $this->UrlCreator($novel,$idDictionary,$noChapter, $i, $total, '+')
                                ]
                            ])
                        );
                        $this->Unlock($key);
                    }
                } else {
                    throw new Exception("Chapter is not ready yet", 404);
                }
            } else {
                if($novel->flagSyosetu){
                    $syosetu = new Syosetu($novel->code, $novel->numberChapters+1);
                    $url = $syosetu->prepareUrl();
                }
                return view('cache/wait',[
                    'novel'     => $novel,
                    'total'     => $novel->numberChapters,
                    'no'        => $noChapter,
                    'url'       => $url,
                    'control'   =>  [
                        'previous'  =>  $this->UrlCreator($novel,$idDictionary,$noChapter, 0, 1, '-')
                    ]
                ]);
                //throw new \Exception("No chapter", 1);
            }
            //return Storage::url($cacheName);
        } else {
            throw new \Exception("No dictionary", 1);
        }
        // To say there is nothing important to return;
        return null;
    }
    public function delCache($idNovel, $idDictionary, $noChapter = false){
        if(!$noChapter){
            $cacheName = self::CACHEFOLDER.$idNovel.'/'.$idDictionary.'/';
            return Storage::deleteDirectory($cacheName);
        }
        $cacheName = self::CACHEFOLDER.$idNovel.'/'.$idDictionary.'/';
        return Storage::deleteDirectory($cacheName);
        // Create something that will get all the files and manually check each instance to see if needs to delete
        $cacheName = self::CACHEFOLDER.$idNovel.'/*/'.$noChapter.'-.html';

    }
}
