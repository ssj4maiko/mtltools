<?php

namespace App\Drivers;

use App\Models\Chapter;

use Illuminate\Database\Eloquent\Model;
use GuzzleHttp\Client;

class Syosetu extends Model implements DriverInterface
{
	private static $url = 'https://{{R18}}.syosetu.com/{{code}}/{{chapter}}';
	private $currentCode = null;
	private $currentChapter = '';
	private $R18 = false;
	private $pointer = 'dateOriginalPost';
	public function prepareUrl() : string{
		return str_replace('{{R18}}', ($this->R18 ? 'novel18' : 'ncode'), 
			str_replace('{{code}}', $this->currentCode,
				str_replace('{{chapter}}', $this->currentChapter > 0 ? $this->currentChapter : '', self::$url)
			)
		);
	}
	public static function getSourceUrl($code, $R18 = false, $no = ''): string
	{
		return str_replace(
			'{{R18}}',
			($R18 ? 'novel18' : 'ncode'),
			str_replace(
				'{{code}}',
				$code,
				str_replace('{{chapter}}', $no > 0 ? $no : '', self::$url)
			)
		);
	}

	public function __construct($code, $R18, $chapter = ''){
		$this->setCode($code);
		$this->currentChapter = $chapter;
		$this->setR18($R18);
	}

	public function setCode($code):void {
		$this->currentCode = $code;
	}
	public function setChapter(?Chapter $chapter):void {
		if($chapter)
			$this->currentChapter = $chapter->no;
		else
			$this->currentChapter = '';
	}
	public function setR18($R18):void {
		$this->R18 = $R18;
	}

	private function callUrl(){
		$extra = [];
		if($this->R18){
			$extra['cookies'] = \GuzzleHttp\Cookie\CookieJar::fromArray(['over18' => 'yes'], '.syosetu.com'); //
		}
		$clientExtras = [];
		if(isset($extra['cookies'])){
			$clientExtras['cookies'] = true;
		}
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
		$classContent = ['"novel_p"','"novel_honbun"','"novel_a"'];
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
	public function getUpdateMeta(Chapter $chapter, $foundChapter): array
	{
		return [
			  'dateOriginalPost'		=>	$foundChapter["dateOriginalPost"]
			, 'dateOriginalRevision'	=>	$foundChapter["dateOriginalRevision"]
		];
	}
	public function importContent(Chapter &$chapter) : string{
		$this->setChapter($chapter);
		$content = $this->callUrl();
		$this->setChapter(null);

		if($content){
			return $this->HTMLgetContent($content);
		}
		return null;
	}

	public function getPointer(): string{
		return $this->pointer;
	}
	private $arcs = [];
	private function parseArcs($html)
	{
		$posStart = 0;
		while ($posStart = strpos($html, 'chapter_title', $posStart)) {
			$posStart = strpos($html, 'chapter_title">', $posStart) + 15;
			$posEnd = strpos($html, '</div>', $posStart);
			$this->arcs[] = [
				'title'	=>	substr($html, $posStart, $posEnd - $posStart), 'position'	=>	$posStart
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

		for($index=1; $Found; ++$index){
			$needle = $this->currentCode.'/'.$index;
			$posStart = strpos($html, $needle, $posStart);
			if (isset($arcs[$nextArc])) {
				if ($posStart > $arcs[$nextArc]['position']) {
					$nextArc++;
				}
			}

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
					'arc'					=>	isset($arcs[$nextArc - 1]) ? $arcs[$nextArc - 1]['title'] : null,
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
