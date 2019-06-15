<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Novel;
use App\Dictionary;
use App\DictionaryCategory;
use App\DictionaryEntry;
use App\Http\Controllers\DictionaryController;

class DictionaryEntryController extends Controller
{
	public function getAll($idCategory){
		return DictionaryEntry::where(['idCategory' => $idCategory])
						 ->get();
	}
	public function get($idCategory,$id) {
		return DictionaryEntry::where(['id' => $id])->first();
	}
    public function updateCategory(DictionaryEntry $Entry, Request $request, $idCategory){
        return $this->updateAllEntries($Entry, $request->json()->all(), $idCategory, true);
    }
    public function updateAllEntries(DictionaryEntry $Entry, $data, $idCategory, $updateCache = false){
        $data = $Entry->prepare($data,$idCategory);
        $data = $Entry->getInsert();

        $changes = $Entry->massInsert()
                || $Entry->massUpdate()
                || $Entry->massDelete();

        $return = ['changes' => $changes];
        if($changes && $updateCache){
            $DIC = Dictionary::updateRevision(null,1);
            $return['dateRevision'] = $DIC->dateRevision;
            $DICC = new DictionaryController();
            $DICC->delCache($DIC->idNovel, $DIC->id);
        }

        return $return;

    }
    public function internalInsert($idCategory, $data){
		$data = DictionaryEntry::prepare($data);
        $data['idDictionary'] = $idDictionary;
        $category = DictionaryEntry::create($data);

        return $category->id;
    }
	public function insert(Request $request, $idCategory) {
		$data = DictionaryEntry::prepare($request->json()->all());
		$data['idCategory'] = $idCategory;
		return DictionaryEntry::create($data);
	}
	public function update(Request $request, $idCategory, $id) {
		$entry = DictionaryEntry::findOrFail($id);
		$data = DictionaryEntry::prepare($request->json()->all());
		$entry->update($data);

		return $entry;
	}
	public function delete($idCategory, $id) {
		DictionaryEntry::where(['id' => $id])
			   ->get()
			   ->delete();

		return 204;
	}
}
