<?php

namespace App\Http\Controllers;

use App\Services\NovelService;
use Illuminate\Http\Request;
use App\Models\Novel;
use App\Transformers\NovelTransformer;
use League\Fractal\Serializer\ArraySerializer;

class NovelController extends Controller
{
	private $novelService;
	public function __construct(NovelService $novelService)
	{
		$this->novelService = $novelService;
	}


	private function returnSingle(Novel $item)
	{
		return \fractal($item, new NovelTransformer());
	}
	private function returnMultiple($items)
	{
		return \fractal()
			->collection($items, new NovelTransformer())
			->serializeWith(new ArraySerializer)
			->toArray()['data'];
	}


	public function getAll(Request $request){
	    $novels = $this->novelService->getAll($request->all());
		return $this->returnMultiple($novels);
	}
	public function get(int $id)
	{
		$novel = $this->novelService->get($id);
		return $this->returnSingle($novel);
	}
	public function getByDictionary($idDictionary)
	{
		$novels = $this->novelService->getByDictionary($idDictionary);
		return $this->returnMultiple($novels);
	}

	public function insert(Request $request)
	{
		$novel = $this->novelService->insert($request->json()->all());
		return $this->returnSingle($novel);
	}
	public function update(Request $request, $id)
	{
		$novel = $this->novelService->update($request->json()->all(), $id);
		return $this->returnSingle($novel);
	}
	public function delete($id)
	{
		return $this->novelService->delete($id);
	}
}
