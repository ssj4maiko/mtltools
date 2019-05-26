<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\NovelController;

use App\Novel;
use App\Chapter;

use App\Drivers\Syosetu;

class ChapterController extends Controller
{
	public function getAll($idNovel){
		return Chapter::select('idNovel','no','title','dateCreated', 'dateRevision')
					  ->where(['idNovel' => $idNovel])
					  ->get();
	}
	public function get($idNovel, $no) {
		return Chapter::where(['idNovel' => $idNovel, 'no' => $no])->first();
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


		$novel->numberChapters++;
		$novel->save();

		// For some reason the chapter number resets to 0? So put it back its right number
		$chapter->no = $novel->numberChapters;

		return ['chapter' => $chapter, 'novel' => $novel];
	}
}
