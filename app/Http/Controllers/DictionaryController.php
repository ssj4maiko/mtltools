<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Novel;
use App\Dictionary;

class DictionaryController extends Controller
{
	public function getAll($idNovel){
		return Dictionary::where(['idNovel' => $idNovel])
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
}
