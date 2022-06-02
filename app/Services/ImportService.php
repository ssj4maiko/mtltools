<?php
namespace App\Services;

use App\Models\Chapter;
use App\Models\Novel;
use App\Drivers\DriverInterface;

/**
 * This service only exists for online novels, not when importing from files.
 */
class ImportService
{
	private ?NovelService $novelService = null;
	private function loadServiceNovel():void {
		if(!$this->novelService){
			$this->novelService = app(NovelService::class);
		}
	}
	private ?ChapterService $chapterService = null;
	private function loadServiceChapter(): void {
		if(!$this->chapterService){
			$this->chapterService = app(ChapterService::class);
		}
	}
	/**
	 * Gets Novel from DB
	 *
	 * @param int $idNovel
	 * @return Novel
	 */
	private function getNovel(int $idNovel):Novel {
		$this->loadServiceNovel();
		return $this->novelService->get($idNovel);
	}
	/**
	 * Gets Chapter from DB
	 *
	 * @param integer $idNovel
	 * @param integer $no
	 * @return Chapter
	 */
	private function getChapter(int $idNovel, int $no):Chapter {
		$this->loadServiceChapter();
		return $this->chapterService->get($idNovel, $no);
	}
	/**
	 * The intention was to import the next Chapter dynamically. It didn't work as expected, and I have found no use for it since then
	 *
	 * @param integer $idNovel
	 */
	public function importNext(int $idNovel): void
	{
		/** @var Novel $novel */
		//$novel = $this->getNovel($idNovel);
		//if (!$novel->driver) {
		//	return null;
		//}
		/** @var DriverInterface $driver */
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
	/**
	 * Update a Single Chapter. contains the logic to decide if text should be updated, and what has to be updated
	 *
	 * @param Chapter $KnownChapter
	 * @param DriverInterface $driver
	 * @param array $foundChapter
	 * @return Chapter
	 */
	private function updateDatabaseChapter(Chapter $KnownChapter, DriverInterface $driver, array $foundChapter = []):Chapter {
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

	/**
	 * Gets the Index from the External Source. Nothing from Database, nor chapter text
	 *
	 * @param integer $idNovel
	 * @return Array
	 */
	public function importIndex(int $idNovel):Array
	{
		/** @var Novel $novel */
		$novel = $this->getNovel($idNovel);
		if (!$novel->driver) {
			return null;
		}
		/** @var DriverInterface $driver */
		$driver = $novel->startDriver();
		$chapters = $driver->importIndex($idNovel);

		return $chapters;
	}
	/**
	 * Actively updates new chapters and fills them up
	 *
	 * @param integer $idNovel
	 * @return Novel
	 */
	public function updateIndex(int $idNovel):Novel
	{
		/** @var Novel $novel */
		$novel = $this->getNovel($idNovel);
		if (!$novel->driver) {
			return null;
		}
		/** @var DriverInterface $driver */
		$driver = $novel->startDriver();

		/** @var [idNovel:int, no:int, noCode:string, arc:string|null, title:string, dateOriginalPost:string, dateOriginalRevision:string|null][] $ImportedChapters */
		$ImportedChapters = $driver->importIndex($idNovel);

		/**
		 * Before we did things in Order, meaning update the first chapters, then insert.
		 * Kakuyomu disrupted this order, so I will be setting another array with the content.
		 * 
		 * First we do the new chapters (insert), then we do all the update checks
		 * */
		$Chapters2Check4Update = [];
		
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
				$Chapters2Check4Update[] = [$KnownChapter, $foundChapter];
			} else {
				dd('An already known chapter was not found on the server... Weird...', $counter, $KnownChapter, $ImportedChapters);
			}
		}
		// Because I have been removing from the array already imported chapters, only new ones remain here
		$numberChapters = count($Chapters2Check4Update);
		if(!empty($ImportedChapters)){
			$numberChapters += $this->InsertNewChapters($ImportedChapters, $driver);
		}
		// Yeah, Do not update if it's just deleted content for now
		if($numberChapters > $novel->numberChapters){
			$novel->numberChapters = $numberChapters;
			// Save Number of Chapters
			$novel->save();
		}
		// Same condition as the insert. I want to save the number of chapters before starting this.
		if(!empty($ImportedChapters)){
			$this->UpdateAllChaptersWithNoText($novel->id, $driver);
		}
		// Finally, we start the updates now.
		foreach($Chapters2Check4Update as $vector){
			$chapter = $this->updateDatabaseChapter($vector[0], $driver, $vector[1]);
		}

		return $novel;
	}
	/**
	 * Inserts an Array of Arrays (The type that is returned from the Index Importer) of Chapters to the DB.
	 * The original behavior was to add the text at the same time, but the new behavior is to add all missing Text later
	 * 
	 * This change of behavior is due to some hosts ending in Timeout, so I want a want to be able to "resume from where it stopped"
	 *
	 * @param array[array] $ImportedChapters
	 * @param DriverInterface $driver
	 * @return integer
	 */
	private function InsertNewChapters(array $ImportedChapters, DriverInterface $driver):int {
		$numberChapters = 0;
		$chapters = [];
		foreach ($ImportedChapters as $importedChapterSub) {
			foreach ($importedChapterSub as $importedChapter) {
				$tmp = [
					'idNovel' => $importedChapter['idNovel'],
					'no' => $importedChapter['no'],
					'noCode' => isset($importedChapter['noCode']) ? $importedChapter['noCode'] : null,
					'arc' => $importedChapter['arc'],
					'title' => $importedChapter['title'],
					'dateOriginalPost' => $importedChapter['dateOriginalPost'],
					'dateOriginalRevision' => $importedChapter['dateOriginalRevision'],
				];
				
				/**
				 * Once I removed adding the Content for the sake of improving speed,
				 * because of Kakuyomu, I will also remove the date part now, because there would be conflicts later.
				 */

				//$chapter = new Chapter($tmp);
				//if (!$tmp['dateOriginalRevision']) {
				//	// Because of Kakuyomu, makes an extra external access. Syosetsu works straight
				//	$updateMeta = $driver->getUpdateMeta($chapter);
				//	$tmp['dateOriginalPost'] = $updateMeta['dateOriginalPost'];
				//	$tmp['dateOriginalRevision'] = $updateMeta['dateOriginalRevision'];
				//}
				//$tmp['textOriginal'] = $driver->importContent($chapter);

				$chapters[] = $tmp;
				++$numberChapters;
			}
		}
		Chapter::insert($chapters);
		return $numberChapters;
	}
	public function UpdateAllChaptersWithNoText(int $idNovel, DriverInterface $driver):void {
		$this->loadServiceChapter();
		$chapters = $this->chapterService->getAllWithNoText($idNovel);
		foreach($chapters as $chapter) {
			if (!$chapter->dateOriginalRevision) {
				// Because of Kakuyomu, makes an extra external access. Syosetsu works straight
				$updateMeta = $driver->getUpdateMeta($chapter);
				$chapter->dateOriginalPost = $updateMeta['dateOriginalPost'];
				$chapter->dateOriginalRevision = $updateMeta['dateOriginalRevision'];
			}
			$chapter->textOriginal = $driver->importContent($chapter);
			$chapter->save();
		}
	}

	public function updateChapter(Novel $novel, int $no): Chapter
	{
		/** @var Novel $novel */
		if (!$novel->driver) {
			return null;
		}
		/** @var Chapter $chapter */
		$chapter = $this->getChapter($novel->id, $no);
		/** @var DriverInterface $driver */
		$driver = $novel->startDriver();
		
		$chapter = $this->updateDatabaseChapter($chapter, $driver, $driver->getUpdateMeta($chapter));
		return $chapter;
	}
}