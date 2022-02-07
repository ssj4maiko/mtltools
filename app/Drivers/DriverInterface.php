<?php

namespace App\Drivers;
use App\Models\Chapter;

interface DriverInterface {
	public function prepareUrl() : string;
	//public function importChapter();
	public function importContent(Chapter $chapter);
	public function importIndex($idNovel);
	public function getPointer() : string;
}