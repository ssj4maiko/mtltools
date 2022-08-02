<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Services\DictionaryService;
use App\Services\MassDictionaryService;
use App\Services\TransformerService;

class DictionaryController extends Controller
{
    private TransformerService $TransformerService;
    private DictionaryService $dictionaryService;
    private MassDictionaryService $MassDictionaryService;

    public function __construct(
        TransformerService $TransformerService,
        DictionaryService $dictionaryService,
        MassDictionaryService $MassDictionaryService
    ) {
        $this->TransformerService = $TransformerService;
        $this->dictionaryService = $dictionaryService;
        $this->MassDictionaryService = $MassDictionaryService;
    }

	public function getAll(){
        $dictionary = $this->dictionaryService->getAll();
        return $this->TransformerService->returnMultipleDictionary($dictionary);
	}
	public function get($id){
        $dictionary = $this->dictionaryService->get($id);
        return $this->TransformerService->returnSingleDictionary($dictionary);
    }
    public function getByNovel($idNovel){
        $dictionary = $this->dictionaryService->getByNovel($idNovel);
        return $this->TransformerService->returnMultipleDictionary($dictionary);
    }
	public function insert(Request $request) {
        $dictionary = $this->dictionaryService->insert($request->json()->all());
        return $this->TransformerService->returnSingleDictionary($dictionary);
	}
	public function update(Request $request, $id)
    {
        $dictionary = $this->dictionaryService->update($request->json()->all(),$id);
        return $this->TransformerService->returnSingleDictionary($dictionary);
	}
	public function delete($id)
    {
        return $this->dictionaryService->delete($id);
    }
    public function fullSave(Request $request, $id)
    {
        return $this->MassDictionaryService->fullSave($request->json()->all(),$id);
    }
}
