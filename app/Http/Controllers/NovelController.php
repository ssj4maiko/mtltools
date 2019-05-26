<?php

namespace App\Http\Controllers;

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
	public function insert(Request $request) {
		$data = Novel::prepare($request->json()->all());
		return Novel::create($data);
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
