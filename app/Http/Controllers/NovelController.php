<?php

namespace App\Http\Controllers;

use App\Http\Controllers\DictionaryController;
use App\Http\Controllers\DictionaryCategoryController;
use App\Services\NovelService;
use Illuminate\Http\Request;
use App\Models\Novel;

class NovelController extends Controller
{
	private $novelService;

	public function __construct(NovelService $novelService)
	{
		$this->novelService = $novelService;
	}
	public function getAll(Request $request){
	    return $this->novelService->getAll($request->all());
	}
	public function get(int $id)
	{
		return $this->novelService->get($id);
	}
	public function getByDictionary($idDictionary)
	{
		return $this->novelService->getByDictionary($idDictionary);
	}

	public function insert(Request $request) {
		return $this->novelService->insert($request->json()->all());
	}
	public function update(Request $request, $id)
	{
		return $this->novelService->update($request->json()->all(),$id);
	}
	public function delete($id)
	{
		return $this->novelService->delete($id);
	}
}
