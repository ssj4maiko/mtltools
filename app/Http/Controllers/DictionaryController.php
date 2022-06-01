<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Dictionary;
use App\Services\DictionaryService;
use App\Services\MassDictionaryService;
use App\Transformers\DictionaryTransformer;
use League\Fractal\Serializer\ArraySerializer;

class DictionaryController extends Controller
{
    private $dictionaryService = null;
    private $MassDictionaryService = null;
    public function __construct(DictionaryService $dictionaryService, MassDictionaryService $MassDictionaryService){
        $this->dictionaryService = $dictionaryService;
        $this->MassDictionaryService = $MassDictionaryService;
    }


    private function returnSingle(Dictionary $item)
    {
        return \fractal($item, new DictionaryTransformer());
    }
    private function returnMultiple($items)
    {
        return \fractal()
        ->collection($items, new DictionaryTransformer())
        ->serializeWith(new ArraySerializer)
        ->toArray()['data'];
    }


	public function getAll(){
        $dictionary = $this->dictionaryService->getAll();
        return $this->returnMultiple($dictionary);
	}
	public function get($id){
        $dictionary = $this->dictionaryService->get($id);
        return $this->returnSingle($dictionary);
    }
    public function getByNovel($idNovel){
        $dictionary = $this->dictionaryService->getByNovel($idNovel);
        return $this->returnMultiple($dictionary);
    }
	public function insert(Request $request) {
        $dictionary = $this->dictionaryService->insert($request->json()->all());
        return $this->returnSingle($dictionary);
	}
	public function update(Request $request, $id)
    {
        $dictionary = $this->dictionaryService->update($request->json()->all(),$id);
        return $this->returnSingle($dictionary);
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
