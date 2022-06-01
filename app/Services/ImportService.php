<?php
namespace App\Services;

use App\Models\CacheChapters;
use App\Models\CacheDictionary;
use App\Models\Chapter;
use App\Models\Novel;

use Illuminate\Support\Facades\DB;
use App\Drivers\Syosetu;

class ImportService
{
	private ?NovelService $novelService = null;
	// This function only exists for online novels, not when importing from files.
	private function loadServiceNovel(){
		if(!$this->novelService){
			$this->novelService = app(NovelService::class);
		}
	}
	private ?ChapterService $chapterService = null;
	private function loadServiceChapter(){
		if(!$this->chapterService){
			$this->chapterService = app(ChapterService::class);
		}
	}
	private function getNovel($idNovel){
		$this->loadServiceNovel();
		return $this->novelService->get($idNovel);
	}
	private function getChapter($idNovel, $no){
		$this->loadServiceChapter();
		return $this->chapterService->get($idNovel, $no);
	}
	public function importNext(int $idNovel): void
	{
		/** @var Novel $novel */
		//$novel = $this->getNovel($idNovel);
		//if (!$novel->driver) {
		//	return null;
		//}
		/** @var \App\Drivers\DriverInterface $driver */
		//$driver = $novel->startDriver($novel->numberChapters + 1);
		//
		//$chapter = $driver->importChapter();
		//$chapter->idNovel = $idNovel;
		//$chapter->save();
		//$chapter->empty = 0;
		//
		//$novel->numberChapters++;
		//$novel->save();
		//
		//// For some reason the chapter number resets to 0? So let's fix this for the Front.
		//$chapter->no = $novel->numberChapters;
		//
		//return ['chapter' => $chapter, 'novel' => $novel];
	}
	private function updateDatabaseChapter(Chapter $KnownChapter, \App\Drivers\DriverInterface $driver, array $foundChapter = [])
	{
		$update = false;
		$updateMeta = $driver->getUpdateMeta($KnownChapter);
		if (isset($foundChapter['arc']) && $foundChapter['arc'] != $KnownChapter->arc) {
			$KnownChapter->arc = $foundChapter['arc'];
			$update = true;
		}

		if (!$KnownChapter->hasText) {
			// There is no text, go get it
			$update = 1;
			$KnownChapter->textOriginal = $driver->importContent($KnownChapter);
		} elseif (
			(empty($KnownChapter->dateOriginalRevision) && $updateMeta['dateOriginalRevision'])
			||
			(($updateMeta['dateOriginalRevision'] && $updateMeta['dateOriginalRevision']) > $KnownChapter->dateOriginalRevision)
		) {
			// There is a revision
			$update = 2;
			$KnownChapter->textRevision = $driver->importContent($KnownChapter);
		}

		if (!$KnownChapter->dateOriginalRevision && $updateMeta['dateOriginalRevision']) {
			$KnownChapter->dateOriginalRevision = $updateMeta['dateOriginalRevision'];
			$update = true;
		}

		if ($update) {
			if(isset($foundChapter['no']))
				$KnownChapter->no = $foundChapter['no'];
			if(isset($foundChapter['title']))
				$KnownChapter->title = $foundChapter['title'];

			$KnownChapter->save();
		}
		return $KnownChapter;
	}


	public function importIndex(int $idNovel)
	{
		/** @var Novel $novel */
		$novel = $this->getNovel($idNovel);
		if (!$novel->driver) {
			return null;
		}
		/** @var \App\Drivers\DriverInterface $driver */
		$driver = $novel->startDriver();
		$chapters = $driver->importIndex($idNovel);

		return $chapters;
	}

	public function updateIndex(int $idNovel)
	{
		/** @var Novel $novel */
		$novel = $this->getNovel($idNovel);
		if (!$novel->driver) {
			return null;
		}
		/** @var \App\Drivers\DriverInterface $driver */
		$driver = $novel->startDriver();

		/** @var [idNovel:int, no:int, noCode:string, arc:string|null, title:string, dateOriginalPost:string, dateOriginalRevision:string|null][] $ImportedChapters */
		$ImportedChapters = $driver->importIndex($idNovel);

		// We save the number of chapters only at the end of the process
		// We are using an array of arrays, meaning, Count won't count correctly all the time. So it's manual counting
		$numberChapters = 0;
		
		$pointer = $driver->getPointer();
		/** @var ChapterService $chapterService */
		$chapterService = app(ChapterService::class);
		/** @var Chapter[] $KnownChapters */
		$KnownChapters = $chapterService->getAll($idNovel);

		$ANYTHING_UPDATED = false;

		$counter = null;
		foreach ($KnownChapters as $KnownChapter) {
			// UPDATE
			$counter = $KnownChapter->$pointer;
			/** @var Chapter $foundChapter */
			$foundChapter = null;
			$pass = isset($ImportedChapters[$counter]);
			if(!$pass){
				/**
				 * The chapter was deleted, and reposted, thus earning a new post date
				 */
				foreach($ImportedChapters as $idx1 => $importedChaptersSub){
					foreach($importedChaptersSub as $idx2 => $importedChapter){
						if($importedChapter['no'] == $KnownChapter->no){
							$foundChapter = $importedChapter;
							$pass = true;
							unset($ImportedChapters[$idx1][$idx2]);
							if(count($ImportedChapters[$idx1]) == 0){
								unset($ImportedChapters[$idx1]);
							}
							break;
						}
					}
				}
			}
			if($pass && !$foundChapter){
				// If there is only one chapter at this specific time, just get it
				if(count($ImportedChapters[$counter]) == 1){
					$foundChapter = $ImportedChapters[$counter][0];
					unset($ImportedChapters[$counter]);
				}
				// If there are more, check with no
				else {
					for($i=0; $i < count($ImportedChapters[$counter]); ++$i) {
						if ($ImportedChapters[$counter][$i]['no'] == $KnownChapter->no) {
							$foundChapter = array_splice($ImportedChapters[$counter],$i,1)[0];
						}
					}
				}
			}
			/** @var [idNovel:int, no:int, noCode:string, arc:string|null, title:string, dateOriginalPost:string, dateOriginalRevision:string|null] $foundChapter */
			if ($foundChapter) {
				++$numberChapters;
				$chapter = $this->updateDatabaseChapter($KnownChapter, $driver, $foundChapter);
			} else {
				dd('An already known chapter was not found on the server... Weird...', $counter, $KnownChapter, $ImportedChapters);
			}
		}
		// Because I have been removing from the array already imported chapters, only new ones remain here
		if(!empty($ImportedChapters)){
			$chapters = [];
			foreach ($ImportedChapters as $importedChapterSub) {
				foreach($importedChapterSub as $importedChapter){
					$tmp = [
						'idNovel' => $importedChapter['idNovel'],
						'no' => $importedChapter['no'],
						'noCode' => isset($importedChapter['noCode']) ? $importedChapter['noCode'] : null,
						'arc' => $importedChapter['arc'],
						'title' => $importedChapter['title'],
						'dateOriginalPost' => $importedChapter['dateOriginalPost'],
						'dateOriginalRevision' => $importedChapter['dateOriginalRevision'],
					];
					$chapter = new Chapter($tmp);
					if(!$tmp['dateOriginalRevision']){
						// Because of Kakuyomu, makes an extra external access. Syosetsu works straight
						$updateMeta = $driver->getUpdateMeta($chapter);
						$tmp['dateOriginalPost'] = $updateMeta['dateOriginalPost'];
						$tmp['dateOriginalRevision'] = $updateMeta['dateOriginalRevision'];
					}
					$tmp['textOriginal'] = $driver->importContent($chapter);

					$chapters[] = $tmp;
					++$numberChapters;
				}
			}
			Chapter::insert($chapters);
		}
		if($numberChapters != $novel->numberChapters){
			$novel->numberChapters = $numberChapters;
			// Save Number of Chapters
			$novel->save();
		}

		return $novel;
	}

	public function updateChapter(int $idNovel, int $no)
	{
		/** @var Novel $novel */
		$novel = $this->getNovel($idNovel);
		if (!$novel->driver) {
			return null;
		}
		/** @var Chapter $chapter */
		$chapter = $this->getChapter($idNovel, $no);
		/** @var \App\Drivers\DriverInterface $driver */
		$driver = $novel->startDriver();
		
		$chapter = $this->updateDatabaseChapter($chapter, $driver, $driver->getUpdateMeta($chapter));
		return $chapter;
	}
}