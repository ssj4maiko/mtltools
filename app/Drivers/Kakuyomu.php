<?php

namespace App\Drivers;

use App\Models\Chapter;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use GuzzleHttp\Client;

class Kakuyomu extends Model implements DriverInterface
{
	private $url = ['https://kakuyomu.jp/works/{{code}}','/episodes/{{chapter}}'];
	private $currentCode = null;
	private $currentChapter = '';
	private $R18 = false;
	private $pointer = 'noCode';
	public function prepareUrl($update_information = false) : string{
		$link = str_replace('{{code}}', $this->currentCode, $this->url[0]);
		if($this->currentChapter){
			$link .= str_replace('{{chapter}}', $this->currentChapter, $this->url[1]);
			if($update_information) {
				$link .= '/episode_sidebar';
			}
		}
		return $link;
	}

	public function __construct($code, $R18, $chapter = ''){
		$this->setCode($code);
		$this->setChapter($chapter);
		$this->setR18($R18);
	}

	public function setCode($code):void {
		$this->currentCode = $code;
	}
	public function setChapter($chapter):void {
		$this->currentChapter = $chapter;
	}
	public function setR18($R18):void {
		$this->R18 = $R18;
	}

	private function getSidebar(){
		$extra = [];
		$clientExtras = [];
		$client = new Client($clientExtras);
		$response = $client->request('GET',$this->prepareUrl(true), $extra);

		if($response->getStatusCode() == 200){
			return $response->getBody()->getContents();
		}
		else {
			return false;
		}
	}
	private function callUrl()
	{
		$extra = [];
		$clientExtras = [];
		$client = new Client($clientExtras);
		$response = $client->request('GET', $this->prepareUrl(), $extra);

		if ($response->getStatusCode() == 200) {
			return $response->getBody()->getContents();
		} else {
			return false;
		}
	}


	private $currentTitle = null;
	private $currentContent = null;

	private function HTMLgetTitle($html){
		$posStart = strpos($html, 'widget-episodeTitle');
		if($posStart > 0){
			$posStart = strpos($html, '>', $posStart) + 1;
			$posEnd = strpos($html, '</', $posStart);
		} else {
			$posStart = strpos($html, '<title>')+8;
			$posEnd = strpos($html, '</title>');
		}
		$this->currentTitle = substr($html, $posStart, $posEnd - $posStart);
		return $this->currentTitle;
	}

	private $chapterMetadata = [];
	private function SidebarHTMLgetContent($html)
	{
		preg_match_all('/<time datetime="(.*?)"/m', $html, $matches);
		$count = count($matches[1])-1;
		$this->chapterMetadata[$this->currentChapter] = [];
		$this->chapterMetadata[$this->currentChapter]['dateOriginalPost'] = (new Carbon($matches[1][$count-1]))->format('Y-m-d H:i:s');
		$this->chapterMetadata[$this->currentChapter]['dateOriginalRevision'] = $matches[1][$count] != $matches[1][$count-1] ? (new Carbon($matches[1][$count]))->format('Y-m-d H:i:s') : null;
		return $this->chapterMetadata[$this->currentChapter];
	}
	private function HTMLgetContent($html)
	{
		$classContent = ['widget-episodeBody'];
		$contents = [];
		foreach($classContent as $class){
			$posStart = strpos($html, $class);
			if($posStart > 0){
				$posStart = strpos($html, '>', $posStart) + 1;
				$posEnd = strpos($html, '</div>', $posStart);

				$contents[] = substr($html, $posStart, $posEnd - $posStart);
			}
		}

		$this->currentContent = implode('<ht/>', $contents);
		return $this->currentContent;
	}
	public function getUpdateMeta(Chapter $chapter) : array
	{
		$this->setChapter($chapter->noCode);

        if (!isset($this->chapterMetadata[$this->currentChapter])) {
            $sidebar = $this->getSidebar();

            if ($sidebar) {
                return $this->SidebarHTMLgetContent($sidebar);
            } else {
				$this->chapterMetadata[$this->currentChapter] = ['dateOriginalPost'=>null,'dateOriginalRevision'=>null];
			}
        }
		return $this->chapterMetadata[$this->currentChapter];
	}
	public function importContent(Chapter &$chapter):string
	{
		$updateMeta = $this->getUpdateMeta($chapter);
		if($updateMeta) {
			// Adding this rule because at first, I had not implemented Kakuyomu updates correctly
			// Should be good to remove later
			if(!$chapter->hasText || $chapter->dateCreated->format('Y-m-d H:i:s') < $updateMeta['dateOriginalRevision']) {
				$content = $this->callUrl();
				if ($content) {
					return $this->HTMLgetContent($content);
				}
			}
		}
		return '';
	}

	public function getPointer(): string{
		return $this->pointer;
	}
	private $arcs = [];
	private function parseArcs($html){
		$posStart = 0;
		while($posStart = strpos($html, 'widget-toc-chapter', $posStart)){
			$posStart = strpos($html, '<span>', $posStart)+6;
			$posEnd = strpos($html, '</span>', $posStart);
			$this->arcs[] = [
				 'title'	=>	substr($html, $posStart, $posEnd - $posStart)
				,'position'	=>	$posStart
			];
		}
		return $this->arcs;
	}
	private function parseIndex($html, $idNovel){
		$Found = true;
		$posStart = 0;

		$listOfChapters = [];
		$arcs = $this->parseArcs($html);
		$nextArc = 0;

		$posStart = strpos($html, 'widget-toc-episode', 0);
		for($index=1; $Found; ++$index){
			// Unlike Syosetsu, the index is a random number, so we can only get the links in order
			$needle = $this->currentCode.'/episodes/';
			$posStart = strpos($html, $needle, $posStart);
			if(isset($arcs[$nextArc])){
				if($posStart > $arcs[$nextArc]['position']) {
					$nextArc++;
				}
			}
			if($posStart>0){
				$posStart += strlen($needle);
				$posEnd = strpos($html, '"', $posStart);
				$currentIndexCode = substr($html, $posStart, $posEnd - $posStart);
				
				$posStart = strpos($html, '<span class=', $posStart);
				$posStart = strpos($html, '>', $posStart)+1;
				$posEnd = strpos($html, '</', $posStart);
				$title = substr($html, $posStart, $posEnd - $posStart);

				$posStart = strpos($html, 'datetime=', $posEnd)+10;
				$posEnd = strpos($html, '"', $posStart);
				$date = substr($html, $posStart, $posEnd - $posStart);

				$dateOriginalPost = null;
				$dateOriginalPost = (new Carbon($date))->format('Y-m-d H:i:s');

				/**
				 * Gotta use the same pointer as configured at the top, this is because this is the only "absolute" in Syosetu.
				 * I previously used the chapter number (no), however, if the author releases a new chapter in between old chapters, all numbers are pushed up.
				 * Same when a chapter is deleted. As such, the original post date is the only absolute variable.
				 * */ 

				if(!isset($listOfChapters[$currentIndexCode])){
					$listOfChapters[$currentIndexCode] = [];
				}
				$listOfChapters[$currentIndexCode][] = [
					'idNovel'				=>	$idNovel,
					'no'					=>	$index,
					'noCode'				=>	$currentIndexCode,
					'arc'					=>	isset($arcs[$nextArc-1]) ? $arcs[$nextArc - 1]['title'] : null,
					'title'					=>	$title,
					'dateOriginalPost'		=>	$dateOriginalPost,
					'dateOriginalRevision'	=>	null,
				];

			} else {
				$Found = false;
				break;
			}
		}
		return $listOfChapters;
	}
	public function importIndex($idNovel){
		$content = $this->callUrl();
		$listOfChapters = $this->parseIndex($content, $idNovel);
		return $listOfChapters;
	}
}
