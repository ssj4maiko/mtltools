<?php

namespace App\Http\Controllers;

use App\Services\CacheService;

class CacheController extends Controller
{
    private CacheService $cacheService;

    public function __construct(
        CacheService $cacheService
    ) {
        $this->cacheService = $cacheService;
    }

    public function getDictionary($idDictionary)
    {
        return $this->cacheService->getDictionary($idDictionary);
    }
    public function createDictionary($idDictionary)
    {
        return $this->cacheService->createDictionary($idDictionary);
    }
    public function getChapter($idNovel, $idDictionary, $no, $part = 1)
    {
        $return = $this->cacheService->getChapter($idDictionary, $idNovel, $no, $part);
        return response($return['view'], $return['status'] ? 200 : 404);
    }
    public function createChapter($idNovel, $idDictionary, $no, $part = 1)
    {
        $return = $this->cacheService->createChapter($idDictionary, $idNovel, $no, $part);
        return response($return['view'], $return['status'] ? 200 : 404);
    }
}
