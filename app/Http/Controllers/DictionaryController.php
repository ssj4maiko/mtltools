<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Novel;
use App\Models\Dictionary;
use App\Models\DictionaryEntry;
use App\Services\DictionaryService;
use App\Services\MassDictionaryService;
use App\Http\Controllers\DictionaryCategoryController;
use App\Http\Controllers\DictionaryEntryController;
use App\Http\Controllers\ChapterController;

use Illuminate\Contracts\Routing\UrlGenerator;

use Illuminate\Support\Facades\Storage;

class DictionaryController extends Controller
{
    private $dictionaryService = null;
    private $MassDictionaryService = null;
    public function __construct(DictionaryService $dictionaryService, MassDictionaryService $MassDictionaryService){
        $this->dictionaryService = $dictionaryService;
        $this->MassDictionaryService = $MassDictionaryService;
    }
	public function getAll(){
        return $this->dictionaryService->getAll();
	}
	public function get($id){
        return $this->dictionaryService->get($id);
    }
    public function getByNovel($idNovel){
        return $this->dictionaryService->getByNovel($idNovel);
    }
	public function insert(Request $request) {
        return $this->dictionaryService->insert($request->json()->all());
	}
	public function update(Request $request, $id)
    {
        return $this->dictionaryService->update($request->json()->all(),$id);
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
