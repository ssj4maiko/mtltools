<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Novel;
use App\Dictionary;
use App\DictionaryCategory;
use App\DictionaryEntry;

class DictionaryEntryController extends Controller
{
	public function getAll($idCategory){
		return DictionaryEntry::where(['idCategory' => $idCategory])
						 ->get();
	}
	public function get($idCategory,$id) {
		return DictionaryEntry::where(['id' => $id])->first();
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
