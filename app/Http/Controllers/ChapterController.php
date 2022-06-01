<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ChapterService;
use App\Services\NovelService;
use App\Services\ImportService;
use App\Transformers\ChapterTransformer;

use App\Models\Chapter;

use League\Fractal\Serializer\ArraySerializer;

class ChapterController extends Controller
{
    private $chapterService;
    private $importService;
    private $novelService;

    public function __construct(ChapterService $chapterService, NovelService $novelService, ImportService $importService){
        $this->chapterService = $chapterService;
        $this->importService = $importService;
        $this->novelService = $novelService;
    }


    private function returnSingle($idNovel, Chapter $chapter)
    {
        $novel = $this->novelService->get($idNovel);
        return \fractal($chapter, new ChapterTransformer($novel->startDriver()));
    }
    private function returnMultiple($idNovel, $chapters)
    {
        $novel = $this->novelService->get($idNovel);
        return \fractal()
            ->collection($chapters, new ChapterTransformer($novel->startDriver()))
            ->serializeWith(new ArraySerializer)
            ->toArray()['data'];
    }


	public function getAll(Request $request, $idNovel){
		$chapters = $this->chapterService->getAll($idNovel, $request->all());
        return $this->returnMultiple($idNovel, $chapters);
	}
	public function get($idNovel, $no){
        $chapter = $this->chapterService->get($idNovel, $no);
        return $this->returnSingle($idNovel, $chapter);
	}
	public function insert(Request $request, $idNovel) {
        $chapter = $this->chapterService->insert($request->json()->all(), $idNovel);
        return $this->returnSingle($idNovel, $chapter);
	}
	public function update(Request $request, $idNovel, $no) {
        $chapter = $this->chapterService->update($request->json()->all(), $idNovel, $no);
        return $this->returnSingle($idNovel, $chapter);
	}
	public function delete($idNovel, $no) {
        return $this->chapterService->delete($idNovel, $no);
    }
    
    // public function importNext(int $idNovel){
    //     return $this->importService->importNext($idNovel);
    // }
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
        return $this->importService->updateIndex($idNovel);
    }
    public function updateChapter(int $idNovel, int $no){
        return $this->importService->updateChapter($idNovel, $no);
    }
}
