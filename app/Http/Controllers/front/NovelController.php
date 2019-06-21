<?php

namespace App\Http\Controllers\front;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ChapterController;

class NovelController extends Controller
{
    public function getChapter(ChapterController $CHAC, $idNovel,$idDictionary,$noChapter, $partNo = 1){
        $cache = $CHAC->getCache($idNovel, $idDictionary,$noChapter,$partNo);
        return $cache;
    }
}
