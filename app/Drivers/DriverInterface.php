<?php

namespace App\Drivers;
use App\Models\Chapter;

interface DriverInterface {
	/**
	 * Required. Sets the current novel Code for the URL. Used on prepareUrl()
	 *
	 * @param string $code
	 * @return void
	 */
	public function setCode(string $code):void;
	/**
	 * Optional. Sets the current Chapter. Used on prepareUrl()
	 *
	 * @param string|int $chapterNumber
	 * @return void
	 */
	public function setChapter(string $chapterNumber):void;
	/**
	 * Optional. If the driver has R18 support, it will change the URL accordingly.
	 *
	 * @param boolean $isOrIsNot
	 * @return void
	 */
	public function setR18(bool $isOrIsNot):void;

	/**
	 * Gets the URL for the current URL configuration for external calls
	 *
	 * @return string
	 */
	public function prepareUrl() : string;
	/**
	 * Returns the insert and update Date from the Chapter, Syosetsu has them on the Index on the chapter itself, but Kakuyomu requires external connection
	 *
	 * @param Chapter $chapter
	 * @return [dateOriginalPost:string,dateOriginalRevision:string]|null
	 */
	public function getUpdateMeta(Chapter $chapter) : array;
	/**
	 * Returns the text content from external source.
	 *
	 * @param Chapter $chapter
	 * @return string
	 */
	public function importContent(Chapter &$chapter):string;
	/**
	 * Returns Array with necessary data from Index. It's important to remember that not all drivers may return all data in one go, use getUpdateMeta for Insert/Update data
	 *
	 * @param inte $idNovel
	 * @return [idNovel:int, no:int, noCode:string, arc:string|null, title:string, dateOriginalPost:string, dateOriginalRevision:string|null][]
	 */
	public function importIndex(int $idNovel);
	/**
	 * Get "unique identifier" to use. Syosetsu has no unique IDs, so I'm using posting dates, but Kakuyomu uses unique IDs, so there is no problem on that front.
	 *
	 * @return string
	 */
	public function getPointer() : string;
}