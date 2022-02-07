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
	private $novelService = null;
	// This function only exists for online novels, not when importing from files.
	private function getNovel($idNovel){
		$this->novelService = app(NovelService::class);
		return $this->novelService->get($idNovel);
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

		/** @var Chapter[][] $ImportedChapters */
		$ImportedChapters = $driver->importIndex($idNovel);
		
		// We save the number of chapters only at the end of the process
		$novel->numberChapters = count($ImportedChapters);
		
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
			$foundChapter = null;

			if (isset($ImportedChapters[$counter])) {
				$update = false;
				if (!$KnownChapter->hasText) {
					// There is no text, go get it
					$update = 1;
					$KnownChapter->textOriginal = $driver->importContent($KnownChapter);
				} elseif (
					$foundChapter['dateOriginalRevision'] > $KnownChapter->dateOriginalRevision
				) {
					// There is a revision
					$update = 2;
					$KnownChapter->textRevision = $driver->importContent($KnownChapter);
				}

				if ($update) {
					$KnownChapter->no = $foundChapter['no'];
					$KnownChapter->title = $foundChapter['title'];
					$KnownChapter->dateOriginalRevision = $foundChapter['dateOriginalRevision'];

					$KnownChapter->save();
				}
			} else {
				dd('An already known chapter was not found on the server... Weird...', $counter, $KnownChapter, $ImportedChapters);
			}
		}
		// Because I have been deleting already imported chapters, only new ones remain here
		if(!empty($ImportedChapters)){
			foreach ($ImportedChapters as $importedChapterSub) {
				foreach($importedChapterSub as $importedChapter){
					$chapter = new Chapter();
					$chapter->idNovel = $importedChapter['idNovel'];
					$chapter->no = $importedChapter['no'];
					$chapter->noCode = $importedChapter['noCode'];
					$chapter->title = $importedChapter['title'];
					$chapter->dateOriginalPost = $importedChapter['dateOriginalPost'];
					$chapter->dateOriginalRevision = $importedChapter['dateOriginalRevision'];
					$chapter->textOriginal = $driver->importContent($chapter);
					$chapter->save();
				}
			}
		}
		// Save Number of Chapters
		$novel->save();

		return $novel;
	}
}