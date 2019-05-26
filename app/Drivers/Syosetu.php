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
	private function prepareUrl(){
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
			return $response->getBody();
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

	private function HTMLgetContent($html){
		$classContent = ['novel_p','novel_honbun','novel_a'];
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
}
