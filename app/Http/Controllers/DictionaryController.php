<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Novel;
use App\Dictionary;
use App\DictionaryEntry;
use App\Http\Controllers\DictionaryCategoryController;
use App\Http\Controllers\DictionaryEntryController;
use App\Http\Controllers\ChapterController;

use Illuminate\Contracts\Routing\UrlGenerator;

use Illuminate\Support\Facades\Storage;

class DictionaryController extends Controller
{
    private $URL = null;
    public function __construct(UrlGenerator $url){
        if($url)
            $this->URL = $url;
    }
	public function getAll($idNovel){
        return Dictionary::where(['idNovel' => $idNovel])
                         ->with('countCategories')
						 ->get();
	}
	public function get($idNovel,$id) {
		return Dictionary::where(['id' => $id])->first();
	}
	public function insert(Request $request, DictionaryCategoryController $DCC, $idNovel, $defaultParameters = false) {
		if(!$defaultParameters)
			$data = Dictionary::prepare($request->json()->all());
		else
			$data['language'] = 'english';

		$data['idNovel'] = $idNovel;

		$Dictionary = Dictionary::create($data);

		$DCC->insert($request, $Dictionary->id, true);

		return $Dictionary;
	}
	public function update(Request $request, $idNovel, $id) {
		$chapter = Dictionary::findOrFail($id);
		$data = Dictionary::prepare($request->json()->all());
		$chapter->update($data);

		return $chapter;
	}
	public function delete($idNovel, $id) {
		Dictionary::where(['id' => $id])
			   ->get()
			   ->delete();

		return 204;
    }


    private const CACHEFOLDER = 'public/cache/';
    private $forceCache = false;
    public function createCache($idNovel, $idDictionary){

        $dictionary = Dictionary::find($idDictionary);
        if($dictionary){
            $files = Storage::files(self::CACHEFOLDER);
            $cacheName = self::CACHEFOLDER.$idNovel.'-'.$idDictionary.'.json';
            $dateName = self::CACHEFOLDER.$idNovel.'-'.$idDictionary.'.txt';

            if(!$this->forceCache){
                $key = array_filter($files, function($el) use ($idNovel, $idDictionary) {
                    return strpos($el, self::CACHEFOLDER.$idNovel.'-'.$idDictionary) === 0;
                });

                // Found the cache for the current novel-dictionary
                if(!empty($key)){
                    $date = Storage::get($dateName);
                    // There has been no update, so there is nothing to do
                    if($date == $dictionary->dateRevision)
                    return Storage::url($cacheName);
                }
            }

            $entries = Dictionary::with(['dictionaryCategory','dictionaryEntry'])
                                ->where('id',$idDictionary)
                                ->get();
            Storage::put($dateName, $dictionary->dateRevision);
            Storage::put($cacheName, $entries);

            return Storage::url($cacheName);
        }
        throw new \Exception("No Dictionary found", 1);
    }

    public function getCache($idNovel, $idDictionary){
        $cacheName = self::CACHEFOLDER.$idNovel.'-'.$idDictionary.'.json';
        if(Storage::exists($cacheName)){
            return Storage::get($cacheName);
        } else {
            $this->forceCache = true;
            $this->createCache($idNovel,$idDictionary);
            return Storage::get($cacheName);
        }
    }
    public function delCache($idNovel, $idDictionary){
        $cacheName = self::CACHEFOLDER.$idNovel.'-'.$idDictionary.'.json';
        $CHAC = new ChapterController($this->URL);
        $CHAC->delCache($idNovel, $idDictionary);
        return Storage::delete($cacheName);
    }

    private $clearCache = false;
    public function fullSave(DictionaryCategoryController $CATC, DictionaryEntryController $ENTC, Request $request, $idNovel, $idDictionary){
        $categories = $request->json()->all();

        foreach($categories as $category){
            if($category['id'] == 0){
                $this->clearCache = true;
                $category['id'] = $CATC->internalInsert($idNovel, $idDictionary,[
                    'name' => $category['name']
                ]);
            }
            $idCategory = $category['id'];
            if(isset($category['update']) && $category['update']){
                $this->clearCache = true;
                $CATC->internalUpdate($idNovel, $idDictionary,$idCategory,[
                    'name' => $category['name']
                ]);
            }
            if(isset($category['entries'])){
                $changes = $ENTC->updateAllEntries(new DictionaryEntry(), $category, $idCategory, false);
                if($changes['changes'])
                    $this->clearCache = true;
            }
        }

        $return = ['changes' => $this->clearCache];

        if($this->clearCache){
            $DIC = Dictionary::updateRevision($idDictionary,null);
            $return['dateRevision'] = $DIC->dateRevision;
            $this->delCache($DIC->idNovel, $DIC->id);
        }

        return $return;
    }
    private function fullSaveEntries(DictionaryEntryController $ENTC, $idNovel, $idDictionary, $idCategory, $entries){
    }
}
