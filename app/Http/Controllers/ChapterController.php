<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Contracts\Routing\UrlGenerator;
use App\Http\Controllers\NovelController;
use App\Http\Controllers\DictionaryController;
use App\Services\ChapterService;
use App\Services\ImportService;

use App\Models\Novel;
use App\Models\Chapter;

use App\Drivers\Syosetu;
use Illuminate\Support\Facades\Storage;

class ChapterController extends Controller
{
    private $chapterService;
    private $importService;

    public function __construct(ChapterService $chapterService, ImportService $importService){
        $this->chapterService = $chapterService;
        $this->importService = $importService;
    }
	public function getAll(Request $request, $idNovel){
		return $this->chapterService->getAll($idNovel, $request->all());
	}
	public function get($idNovel, $no){
        return $this->chapterService->get($idNovel, $no);
	}
	public function insert(Request $request, $idNovel) {
        return $this->chapterService->insert($request->json()->all(), $idNovel);
	}
	public function update(Request $request, $idNovel, $no) {
        return $this->chapterService->update($request->json()->all(), $idNovel, $no);
	}
	public function delete($idNovel, $no) {
        return $this->chapterService->delete($idNovel, $no);
    }
    
    public function importNext(int $idNovel){
        return $this->importService->importNext($idNovel);
    }
    public function importIndex(int $idNovel){
        return $this->importService->importIndex($idNovel);
    }
    public function updateIndex(int $idNovel){
        return $this->importService->updateIndex($idNovel);
    }
}
