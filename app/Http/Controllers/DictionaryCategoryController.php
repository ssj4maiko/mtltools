<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Novel;
use App\Dictionary;
use App\DictionaryCategory;

class DictionaryCategoryController extends Controller
{
	public function getAll($idDictionary){
		return DictionaryCategory::where(['idDictionary' => $idDictionary])
                         ->with('countEntries')
						 ->get();
	}
	public function get($idDictionary,$id) {
		return DictionaryCategory::where(['id' => $id])
                                 ->with('countEntries')
                                 ->first();
    }

	public function insert(Request $request, $idDictionary, $defaultParameters = false) {
		if(!$defaultParameters)
			$data = DictionaryCategory::prepare($request->json()->all());
		else
			$data['name'] = 'default';
        $data['idDictionary'] = $idDictionary;
        $category = DictionaryCategory::create($data);
		return $this->get($idDictionary,$category->id);
    }
    public function internalInsert($idNovel, $idDictionary, $data){
		$data = DictionaryCategory::prepare($data);
        $data['idDictionary'] = $idDictionary;
        $category = DictionaryCategory::create($data);

        return $category->id;
    }

	public function update(Request $request, $idDictionary, $id) {
		$category = DictionaryCategory::findOrFail($id);
		$data = DictionaryCategory::prepare($request->json()->all());
		$category->update($data);

		return $this->get($idDictionary,$category->id);
	}

	public function internalUpdate($idNovel, $idDictionary, $id, $data) {
		$category = DictionaryCategory::findOrFail($id);
		$data = DictionaryCategory::prepare($data);
		return $category->update($data);
	}
	public function delete($idDictionary, $id) {
		DictionaryCategory::where(['id' => $id])
			   ->get()
			   ->delete();

		return 204;
	}
}
