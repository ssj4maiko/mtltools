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
	public function prepareUrl() : string{
		$link = str_replace('{{code}}', $this->currentCode, $this->url[0]);
		if($this->currentChapter){
			$link .= str_replace('{{chapter}}', $this->currentChapter, $this->url[1]);
		}
		return $link;
	}

	public function __construct($code, $R18, $chapter = ''){
		$this->setCode($code);
		$this->setChapter($chapter);
		$this->setR18($R18);
	}

	public function setCode($code){
		$this->currentCode = $code;
	}
	public function setChapter($chapter){
		$this->currentChapter = $chapter;
	}
	public function setR18($R18){
		$this->R18 = $R18;
	}

	private function callUrl(){
		$extra = [];
		$clientExtras = [];
		$client = new Client($clientExtras);
		$response = $client->request('GET',$this->prepareUrl(), $extra);

		if($response->getStatusCode() == 200){
			return $response->getBody()->getContents();
		}
		else {
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
	public function importContent(Chapter $chapter){
		$this->setChapter($chapter->noCode);
		$content = $this->callUrl();
		$this->setChapter('');

		if($content){
			return $this->HTMLgetContent($content);
		}
		return null;
	}

	public function getPointer(): string{
		return $this->pointer;
	}
	private function parseIndex($html, $idNovel){
		$Found = true;
		$posStart = 0;

		$listOfChapters = [];
		$posStart = strpos($html, 'widget-toc-episode', 0);

		for($index=1; $Found; ++$index){
			// Unlike Syosetsu, the index is a random number, so we can only get the links in order
			$needle = $this->currentCode.'/episodes/';
			$posStart = strpos($html, $needle, $posStart);

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

				if(!isset($listOfChapters[$dateOriginalPost])){
					$listOfChapters[$dateOriginalPost] = [];
				}
				$listOfChapters[$dateOriginalPost][] = [
					'idNovel'				=>	$idNovel,
					'no'					=>	$index,
					'noCode'				=>	$currentIndexCode,
					'title'					=>	$title,
					'dateOriginalPost'		=>	$dateOriginalPost,
					'dateOriginalRevision'	=>	$dateOriginalPost,
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
