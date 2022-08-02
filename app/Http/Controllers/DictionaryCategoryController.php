<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Services\DictionaryCategoryService;
use App\Services\TransformerService;

class DictionaryCategoryController extends Controller
{
	private TransformerService $TransformerService;
	private DictionaryCategoryService $dictionaryCategoryService;

	public function __construct(
		TransformerService $TransformerService,
		DictionaryCategoryService $dictionaryCategoryService
	) {
		$this->TransformerService = $TransformerService;
		$this->dictionaryCategoryService = $dictionaryCategoryService;
	}

	public function getAll($idDictionary){
		$categories = $this->dictionaryCategoryService->getAll($idDictionary);
		return $this->TransformerService->returnMultipleCategory($categories);
	}
	public function get($idDictionary,$id)
	{
		$category = $this->dictionaryCategoryService->get($idDictionary, $id);
		return $this->TransformerService->returnSingleCategory($category);
    }
	public function insert(Request $request, $idDictionary, $defaultParameters = false)
	{
		$category = $this->dictionaryCategoryService->insert($request->json()->all(), $idDictionary);
		//$categories = $this->dictionaryCategoryService->get($idDictionary, $category->id);
		return $this->TransformerService->returnSingleCategory($category);
    }
	public function update(Request $request, $idDictionary, $id)
	{
		$category = $this->dictionaryCategoryService->update($request->json()->all(),$idDictionary, $id);
		//$categories = $this->dictionaryCategoryService->get($idDictionary, $category->id);
		return $this->TransformerService->returnSingleCategory($category);
	}
	public function delete($idDictionary, $id)
	{
		return $this->dictionaryCategoryService->delete($idDictionary, $id);
	}
}
