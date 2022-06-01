<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Services\DictionaryEntryService;
use App\Services\MassDictionaryService;
use App\Services\DictionaryCategoryService;

class DictionaryEntryController extends Controller
{
	private $dictionaryEntryService;
	private $massDictionaryService;

	public function __construct(DictionaryCategoryService $dictionaryCategoryService, DictionaryEntryService $dictionaryEntryService, MassDictionaryService $massDictionaryService)
	{
		$this->dictionaryCategoryService = $dictionaryCategoryService;
		$this->dictionaryEntryService = $dictionaryEntryService;
		$this->massDictionaryService = $massDictionaryService;
	}
	public function getAll($idDictionary, $idCategory){
		return $this->dictionaryEntryService->getAll($idDictionary, $idCategory);
	}
	public function get($idDictionary, $idCategory,$id)
	{
		return $this->dictionaryEntryService->get($idDictionary, $idCategory,$id);
	}
	public function insert(Request $request,$idDictionary, $idCategory) {
		return $this->dictionaryEntryService->insert($request->json()->all(),$idDictionary, $idCategory);
	}
	public function update(Request $request,$idDictionary, $idCategory, $id)
	{
		return $this->dictionaryEntryService->update($request->json()->all(), $idDictionary, $idCategory, $id);
	}
	public function delete($idDictionary, $idCategory, $id)
	{
		return $this->dictionaryEntryService->delete($idDictionary, $idCategory, $id);
	}

	public function updateByCategory(Request $request, $idDictionary, $idCategory)
	{
		$affectedCategories = $this->massDictionaryService->updateAllEntries($request->json()->all(), $idDictionary, $idCategory);
		return [
			'categories' => $this->dictionaryCategoryService->getAll($idDictionary,$affectedCategories),
			'entries' => $this->getAll($idDictionary, $idCategory)
		];
	}
}
