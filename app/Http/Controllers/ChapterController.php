<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ChapterService;
use App\Services\NovelService;
use App\Services\ImportService;
use App\Services\TransformerService;
class ChapterController extends Controller
{
    private TransformerService $TransformerService;
    private ChapterService $chapterService;
    private NovelService $novelService;
    private ImportService $importService;

    public function __construct(
        TransformerService $TransformerService,
        ChapterService $chapterService,
        NovelService $novelService,
        ImportService $importService
    ) {
        $this->TransformerService = $TransformerService;
        $this->chapterService = $chapterService;
        $this->novelService = $novelService;
        $this->importService = $importService;
    }

	public function getAll(Request $request, $idNovel){
		$chapters = $this->chapterService->getAll($idNovel, $request->all());
        $novel = $this->novelService->get($idNovel);
        return $this->TransformerService->returnMultipleChapter($novel, $chapters);
	}
	public function get($idNovel, $no){
        $chapter = $this->chapterService->get($idNovel, $no);
        $novel = $this->novelService->get($idNovel);
        return $this->TransformerService->returnSingleChapter($novel, $chapter);
	}
	public function insert(Request $request, $idNovel) {
        $chapter = $this->chapterService->insert($request->json()->all(), $idNovel);
        $novel = $this->novelService->get($idNovel);
        return $this->TransformerService->returnSingleChapter($novel, $chapter);
	}
	public function update(Request $request, $idNovel, $no) {
        $chapter = $this->chapterService->update($request->json()->all(), $idNovel, $no);
        $novel = $this->novelService->get($idNovel);
        return $this->TransformerService->returnSingleChapter($novel, $chapter);
	}
	public function delete($idNovel, $no) {
        return $this->chapterService->delete($idNovel, $no);
    }
    
    /**
     * Gets only the External Source index, no interaction with DB
     *
     * @param integer $idNovel
     * @return void
     */
    public function importIndex(int $idNovel){
        return $this->importService->importIndex($idNovel);
    }
    public function updateIndex(int $idNovel){
        $novel = $this->importService->updateIndex($idNovel);
        return $this->TransformerService->returnSingleNovel($novel);
    }
    public function updateChapter(int $idNovel, int $no)
    {
        $novel = $this->novelService->get($idNovel);
        $chapter = $this->importService->updateChapter($novel, $no);
        return $this->TransformerService->returnSingleChapter($novel, $chapter);
    }
}
