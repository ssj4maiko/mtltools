<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Services\CacheService;

class NovelController extends Controller
{
    private CacheService $cacheService;

    public function __construct(
        CacheService $cacheService
    ) {
        $this->cacheService = $cacheService;
    }
    
    public function getChapter($idNovel,$idDictionary,$noChapter, $partNo = 1){
        return $this->cacheService->getChapter($idDictionary, $idNovel, $noChapter, $partNo)['view'];
    }
}
