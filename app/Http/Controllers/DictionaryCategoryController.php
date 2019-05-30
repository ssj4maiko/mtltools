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
						 ->get();
	}
	public function get($idDictionary,$id) {
		return DictionaryCategory::where(['id' => $id])->first();
	}
	public function insert(Request $request, $idDictionary, $defaultParameters = false) {
		if(!$defaultParameters)
			$data = DictionaryCategory::prepare($request->json()->all());
		else
			$data['name'] = 'default';
		$data['idDictionary'] = $idDictionary;
		return DictionaryCategory::create($data);
	}
	public function update(Request $request, $idDictionary, $id) {
		$chapter = DictionaryCategory::findOrFail($id);
		$data = DictionaryCategory::prepare($request->json()->all());
		$chapter->update($data);

		return $chapter;
	}
	public function delete($idDictionary, $id) {
		DictionaryCategory::where(['id' => $id])
			   ->get()
			   ->delete();

		return 204;
	}
}
