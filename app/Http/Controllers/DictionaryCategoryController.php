<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Novel;
use App\Models\Dictionary;
use App\Models\DictionaryCategory;
use App\Services\DictionaryCategoryService;

class DictionaryCategoryController extends Controller
{
	private $dictionaryCategoryService = null;
	private $dictionaryMassService = null;
	public function __construct(DictionaryCategoryService $dictionaryCategoryService)
	{
		$this->dictionaryCategoryService = $dictionaryCategoryService;
	}
	public function getAll($idDictionary){
		return $this->dictionaryCategoryService->getAll($idDictionary);
	}
	public function get($idDictionary,$id)
	{
		return $this->dictionaryCategoryService->get($idDictionary, $id);
    }
	public function insert(Request $request, $idDictionary, $defaultParameters = false)
	{
		$category = $this->dictionaryCategoryService->insert($request->json()->all(), $idDictionary);
		return $this->dictionaryCategoryService->get($idDictionary, $category->id);
    }
	public function update(Request $request, $idDictionary, $id)
	{
		$category = $this->dictionaryCategoryService->update($request->json()->all(),$idDictionary, $id);
		return $this->dictionaryCategoryService->get($idDictionary, $category->id);
	}
	public function delete($idDictionary, $id)
	{
		return $this->dictionaryCategoryService->delete($idDictionary, $id);
	}
}
