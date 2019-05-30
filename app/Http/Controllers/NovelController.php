<?php

namespace App\Http\Controllers;

use App\Http\Controllers\DictionaryController;
use App\Http\Controllers\DictionaryCategoryController;

use Illuminate\Http\Request;
use App\Novel;

class NovelController extends Controller
{
	public function getAll(){
	    return Novel::all();
	}
	public function get($id) {
		return Novel::find($id);
	}
	public function insert(Request $request, DictionaryController $DC, DictionaryCategoryController $DCC) {
		$data = Novel::prepare($request->json()->all());
		$Novel = Novel::create($data);

		$DC->insert($request, $DCC, $Novel->id, true);

		return $Novel;
	}
	public function update(Request $request, $id) {
	    $novel = Novel::findOrFail($id);
		$data = Novel::prepare($request->json()->all());
	    $novel->update($data);

	    return $novel;
	}
	public function delete($id) {
	    Novel::find($id)->delete();

	    return 204;
	}
}
