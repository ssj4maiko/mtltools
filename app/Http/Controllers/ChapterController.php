<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\NovelController;

use App\Novel;
use App\Chapter;

use App\Drivers\Syosetu;

class ChapterController extends Controller
{
	public function getAll($idNovel){
		return Chapter::select('idNovel','no','title','dateCreated', 'dateRevision','dateOriginalPost', 'dateOriginalRevision')
					  ->addSelect(DB::raw('(textOriginal IS NOT NULL) as hasText'))
					  ->where(['idNovel' => $idNovel])
					  ->get();
	}
	public function get($idNovel, $no) {
		return Chapter::select()->addSelect(DB::raw('(textOriginal IS NOT NULL) as hasText'))
						->where(['idNovel' => $idNovel, 'no' => $no])
						->first();
	}
	public function insert(Request $request, $idNovel) {
		$data = Chapter::prepare($request->json()->all());
		return Chapter::create($data);
	}
	public function update(Request $request, $idNovel, $no) {
		$chapter = Chapter::where(['idNovel' => $idNovel, 'no' => $no])->findOrFail();
		$data = Chapter::prepare($request->json()->all());
		$chapter->update($data);

		return $chapter;
	}
	public function delete($idNovel, $no) {
		Chapter::where(['idNovel' => $idNovel, 'no' => $no])
			   ->get()
			   ->delete();

		return 204;
	}


	// This function only exists for online novels, not when importing from files.
	public function importNext(NovelController $NC, $idNovel) {
		$novel = $NC->get($idNovel);
		if(!$novel->flagSyosetu){
			return null;
		}
		$syosetu = new Syosetu($novel->code, $novel->numberChapters+1);

		$chapter = $syosetu->importChapter();
		$chapter->idNovel = $idNovel;
		$chapter->save();
		$chapter->empty = 0;


		$novel->numberChapters++;
		$novel->save();

		// For some reason the chapter number resets to 0? So let's fix this for the Front.
		$chapter->no = $novel->numberChapters;

		return ['chapter' => $chapter, 'novel' => $novel];
	}


	public function importIndex(NovelController $NC, $idNovel){
		$novel = $NC->get($idNovel);
		if(!$novel->flagSyosetu){
			return null;
		}

		$syosetu = new Syosetu($novel->code);
		$chapters = $syosetu->importIndex($idNovel);

		//DB::table('chapters')->insert($chapters);

		$novel->numberChapters = count($chapters);
		//$novel->save();
		
		return $chapters;
		//foreach ($chapters as $value) {}
	}

	public function updateIndex(NovelController $NC, $idNovel){
		$novel = $NC->get($idNovel);
		if(!$novel->flagSyosetu){
			return null;
		}

		$syosetu = new Syosetu($novel->code);
		$chapters = $syosetu->importIndex($idNovel);

		$novel->numberChapters = count($chapters);
		$novel->save();

		$KnownChapters = $this->getAll($idNovel);


		$counter = 0;
		foreach($KnownChapters as $KnownChapter){

			// UPDATE
			$counter = $KnownChapter->no;
			if(isset($chapters[ $counter ])){
				$update = false;

				if(!$KnownChapter->hasText){
					// There is no text, go get it
					$update = 1;
					$KnownChapter->textOriginal = $syosetu->importContent($counter);
					$KnownChapter->dateOriginalRevision = $chapters[ $counter ]['dateOriginalRevision'];
				} elseif (
					(empty($KnownChapter->dateOriginalRevision) && $chapters[ $counter ]['dateOriginalRevision'])
					||
					($chapters[ $counter ]['dateOriginalRevision'] > $KnownChapter->dateOriginalRevision)
				) {
					// There is a revision
					$update = 2;
					$KnownChapter->textRevision = $syosetu->importContent($counter);
					$KnownChapter->dateOriginalRevision = $chapters[ $counter ]['dateOriginalRevision'];
				}

				if($update){
					$KnownChapter->save();
				}
			}
		}

		// If there are 
		$length = count($chapters);
		for(;$counter < $length; ++$counter){

			$chapter = new Chapter();
			$chapter->idNovel = $chapters[ $counter ]['idNovel'];
			$chapter->no = $chapters[ $counter ]['no'];
			$chapter->title = $chapters[ $counter ]['title'];
			$chapter->textOriginal = $syosetu->importContent($counter);
			$chapter->dateOriginalPost = $chapters[ $counter ]['dateOriginalPost'];
			$chapter->dateOriginalRevision = $chapters[ $counter ]['dateOriginalRevision'];
			$chapter->save();
		}
	}
}
