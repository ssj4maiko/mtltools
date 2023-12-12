<?php

namespace App\Http\Controllers;

use App\Services\NovelService;
use App\Services\TransformerService;
use Illuminate\Http\Request;

class NovelController extends Controller
{
    private TransformerService $TransformerService;
    private NovelService $novelService;

    public function __construct(
        TransformerService $TransformerService,
        NovelService $novelService
    ) {
        $this->TransformerService = $TransformerService;
        $this->novelService = $novelService;
    }

    public function getAll(Request $request)
    {
        $novels = $this->novelService->getAll($request->all());
        return $this->TransformerService->returnMultipleNovel($novels);
    }
    public function get(int $id)
    {
        $novel = $this->novelService->get($id);
        return $this->TransformerService->returnSingleNovel($novel);
    }
    public function getByDictionary($idDictionary)
    {
        $novels = $this->novelService->getByDictionary($idDictionary);
        return $this->TransformerService->returnMultipleNovel($novels);
    }

    public function insert(Request $request)
    {
        $novel = $this->novelService->insert($request->json()->all());
        return $this->TransformerService->returnSingleNovel($novel);
    }
    public function update(Request $request, $id)
    {
        $novel = $this->novelService->update($request->json()->all(), $id);
        return $this->TransformerService->returnSingleNovel($novel);
    }
    public function delete($id)
    {
        return $this->novelService->delete($id);
    }
}
