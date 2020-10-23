<?php

namespace App\Drivers;

use App\Chapter;

use Illuminate\Database\Eloquent\Model;
use GuzzleHttp\Client;

class Syosetu extends Model
{
	private $url = 'https://ncode.syosetu.com/{{code}}/{{chapter}}';
	private $currentCode = null;
	private $currentChapter = '';
	public function prepareUrl(){
		return str_replace('{{code}}', $this->currentCode,
				str_replace('{{chapter}}', $this->currentChapter, $this->url)
			);
	}

	public function __construct($code, $chapter = ''){
		$this->setCode($code);
		$this->setChapter($chapter);
	}

	public function setCode($code){
		$this->currentCode = $code;
	}
	public function setChapter($chapter){
		$this->currentChapter = $chapter;
	}

	private function callUrl(){
		$client = new Client();
		$response = $client->request('GET',$this->prepareUrl());

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
		$posStart = strpos($html, 'novel_subtitle');
		if($posStart > 0){
			$posStart = strpos($html, '>', $posStart) + 1;
			$posEnd = strpos($html, '</', $posStart);
		} else {
			$posStart = strpos($html, '<title>')+7;
			$posEnd = strpos($html, '</title>');
		}
		$this->currentTitle = substr($html, $posStart, $posEnd - $posStart);
		return $this->currentTitle;
	}

	private function HTMLgetContent($html)
	{
		$classContent = ['"novel_p"', '"novel_honbun"', '"novel_a"'];
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
	public function importChapter(){
		$content = $this->callUrl();

		if($content){
			$chapter = new Chapter();
			$chapter->no = $this->currentChapter;
			$chapter->title = $this->HTMLgetTitle($content);
			$chapter->textOriginal = $this->HTMLgetContent($content);

			return $chapter;
		}
		return null;
	}
	public function importContent($no){
		$this->setChapter($no);
		$content = $this->callUrl();
		$this->setChapter('');

		if($content){
			return $this->HTMLgetContent($content);
		}
		return null;
	}

	private function parseIndex($html, $idNovel){
		$Found = true;
		$posStart = 0;

		$listOfChapters = [];

		for($index=1; $Found; ++$index){

			$needle = $this->currentCode.'/'.$index;
			$posStart = strpos($html, $needle, $posStart);

			if($posStart>0){

				$posStart += strlen($needle)+3;
				$posEnd = strpos($html, '</a>', $posStart);
				$title = substr($html, $posStart, $posEnd - $posStart);
				$posEnd = $posStart;

				$needle = '<dt class="long_update">';
				$posStart = strpos($html, $needle, $posStart);
				$posStart += strlen($needle)+1;
				$posEnd = strpos($html, '</dt>', $posStart);
				$dates = substr($html, $posStart, $posEnd - $posStart);

				$dateOriginalPost = null;
				$dateOriginalRevision = null;

					$dateOriginalPost = str_replace('/', '-', substr($dates, 0, 16)).':00';

					$needle2 = "title=";
					$posStart2 = strpos($dates, $needle2, 16);
					if($posStart2 > 0){
						$dateOriginalRevision = str_replace('/', '-', substr($dates, $posStart2 + 6 + 1, 16)).':00';
					}

				$listOfChapters[$index] = [
					'idNovel'				=>	$idNovel,
					'no'					=>	$index,
					'title'					=>	$title,
					'dateOriginalPost'		=>	$dateOriginalPost,
					'dateOriginalRevision'	=>	$dateOriginalRevision,
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
