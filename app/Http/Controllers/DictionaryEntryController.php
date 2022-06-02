<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Services\TransformerService;
use App\Services\DictionaryEntryService;
use App\Services\MassDictionaryService;
use App\Services\DictionaryCategoryService;

class DictionaryEntryController extends Controller
{
	private TransformerService $TransformerService;
	private DictionaryCategoryService $dictionaryCategoryService;
	private DictionaryEntryService $dictionaryEntryService;
	private MassDictionaryService $massDictionaryService;

	public function __construct(
		TransformerService $TransformerService,
		DictionaryCategoryService $dictionaryCategoryService,
		DictionaryEntryService $dictionaryEntryService,
		MassDictionaryService $massDictionaryService
	) {
        $this->TransformerService = $TransformerService;
		$this->dictionaryCategoryService = $dictionaryCategoryService;
		$this->dictionaryEntryService = $dictionaryEntryService;
		$this->massDictionaryService = $massDictionaryService;
	}

	public function getAll($idDictionary, $idCategory){
		$entry = $this->dictionaryEntryService->getAll($idDictionary, $idCategory);
		return $this->TransformerService->returnMultipleEntry($entry);
	}
	public function get($idDictionary, $idCategory,$id)
	{
		$entry = $this->dictionaryEntryService->get($idDictionary, $idCategory,$id);
		return $this->TransformerService->returnSingleEntry($entry);
	}
	public function insert(Request $request,$idDictionary, $idCategory) {
		$entry = $this->dictionaryEntryService->insert($request->json()->all(),$idDictionary, $idCategory);
		return $this->TransformerService->returnSingleEntry($entry);
	}
	public function update(Request $request,$idDictionary, $idCategory, $id)
	{
		$entry = $this->dictionaryEntryService->update($request->json()->all(), $idDictionary, $idCategory, $id);
		return $this->TransformerService->returnSingleEntry($entry);
	}
	public function delete($idDictionary, $idCategory, $id)
	{
		return $this->dictionaryEntryService->delete($idDictionary, $idCategory, $id);
	}

	public function updateByCategory(Request $request, $idDictionary, $idCategory)
	{
		$affectedCategories = $this->massDictionaryService->updateAllEntries($request->json()->all(), $idDictionary, $idCategory);
		return [
			'categories' => $this->TransformerService->returnMultipleCategory(
								$this->dictionaryCategoryService->getAll($idDictionary,$affectedCategories)
							),
			'entries' => $this->getAll($idDictionary, $idCategory)
		];
	}
}
