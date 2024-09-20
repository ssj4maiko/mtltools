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
	private $chaptersPerPage = 100;
	public function prepareUrl($page = 1): string
	{
		return str_replace(
			'{{R18}}',
			($this->R18 ? 'novel18' : 'ncode'),
			str_replace(
				'{{code}}',
				$this->currentCode,
				str_replace('{{chapter}}', $this->currentChapter > 0 ? $this->currentChapter : '', self::$url)
			)
		) . ($page > 1 ? '?p=' . $page : '');
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

	public function __construct($code, $R18, $chapter = '')
	{
		$this->setCode($code);
		$this->currentChapter = $chapter;
		$this->setR18($R18);
	}

	public function setCode($code): void
	{
		$this->currentCode = $code;
	}
	public function setChapter(?Chapter $chapter): void
	{
		if ($chapter)
			$this->currentChapter = $chapter->no;
		else
			$this->currentChapter = '';
	}
	public function setR18($R18): void
	{
		$this->R18 = $R18;
	}

	private function callUrl($page = 1)
	{
		$extra = [];
		if ($this->R18) {
			$extra['cookies'] = \GuzzleHttp\Cookie\CookieJar::fromArray(['over18' => 'yes'], '.syosetu.com'); //
		}
		$clientExtras = [];
		if (isset($extra['cookies'])) {
			$clientExtras['cookies'] = true;
		}
		$client = new Client($clientExtras);
		$url = $this->prepareUrl($page);
		$response = $client->request('GET', $url, $extra);

		if ($response->getStatusCode() == 200) {
			return $response->getBody()->getContents();
		} else {
			return false;
		}
	}

	private $currentTitle = null;
	private $currentContent = null;

	private function HTMLgetTitle($html)
	{
		$posStart = strpos($html, 'novel_subtitle');
		if ($posStart > 0) {
			$posStart = strpos($html, '>', $posStart) + 1;
			$posEnd = strpos($html, '</', $posStart);
		} else {
			$posStart = strpos($html, '<title>') + 7;
			$posEnd = strpos($html, '</title>');
		}
		$this->currentTitle = substr($html, $posStart, $posEnd - $posStart);
		return $this->currentTitle;
	}

	private function HTMLgetContent($html)
	{
		$classContent = ['p-novel__text--preface"', 'novel__text"', 'novel__text--afterword"'];
		$contents = [];
		foreach ($classContent as $class) {
			$posStart = strpos($html, $class);
			if ($posStart > 0) {
				$posStart = strpos($html, '>', $posStart) + 1;
				$posEnd = strpos($html, '</div>', $posStart);

				$contents[] = substr($html, $posStart, $posEnd - $posStart);
			}
		}

		$this->currentContent = implode('<ht/>', $contents);
		return $this->currentContent;
	}
	public function importChapter()
	{
		$content = $this->callUrl();

		if ($content) {
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
			'dateOriginalPost' => $foundChapter["dateOriginalPost"],
			'dateOriginalRevision' => $foundChapter["dateOriginalRevision"]
		];
	}
	public function importContent(Chapter &$chapter): string
	{
		$this->setChapter($chapter);
		$content = $this->callUrl();
		$this->setChapter(null);

		if ($content) {
			return $this->HTMLgetContent($content);
		}
		return null;
	}

	public function getPointer(): string
	{
		return $this->pointer;
	}
	private $arcs = [];
	private function parseArcs($html, $page)
	{
		$posStart = 0;
		while ($posStart = strpos($html, 'chapter-title', $posStart)) {
			$posStart = strpos($html, 'chapter-title">', $posStart) + 15;
			$posEnd = strpos($html, '</div>', $posStart);
			$this->arcs[] = [
				'title' => substr($html, $posStart, $posEnd - $posStart),
				'position' => $posStart,
				'page' => $page
			];
		}
		return $this->arcs;
	}
	private function detectPageNumber(string $html): int
	{
		// Look for the button "Next", and we can use that to search for the "last" button.
		$posStart = strpos($html, 'c-pager__item--next', 0);
		if ($posStart) {
			$posStart = strpos($html, '?p=', $posStart) + 3;
			$posEnd = strpos($html, '"', $posStart);
			return intval(substr($html, $posStart, $posEnd - $posStart));
		}
		return 1;
	}
	private function parseIndex($idNovel)
	{
		/**
		 * For debug reasons, can use json_encode($listOfChapters) at the end of this method, save in a json and save time.
		 */
		// $json = \Illuminate\Support\Facades\Storage::get('public/listOfChapters.json');
		// return json_decode($json, true);
		// $jsonData = json_decode($jsonString, true);
		$listOfChapters = [];
		$nextArc = 0;
		$lastPage = 1;

		for ($page = 1; $page <= $lastPage; ++$page) {

			$html = $this->callUrl($page);
			if ($lastPage == 1) {
				$lastPage = $this->detectPageNumber($html);
			}
			$arcs = $this->parseArcs($html, $page);
			$posStart = 0;
			$Found = true;

			for ($index = 1; $Found; ++$index) {
				$current_no = (($page - 1) * $this->chaptersPerPage) + $index;
				$needle = $this->currentCode . '/' . $current_no;
				$posStart = strpos($html, $needle, $posStart);
				$posStart = strpos($html, $needle = '>', $posStart);
				if (isset($arcs[$nextArc])) {
					if ($posStart > $arcs[$nextArc]['position'] && $page == $arcs[$nextArc]['page']) {
						$nextArc++;
					}
				}

				if ($posStart > 0) {
					$posStart += strlen($needle) + 1;
					$posEnd = strpos($html, '</a>', $posStart);
					$title = trim(substr($html, $posStart, $posEnd - $posStart));

					$posEnd = $posStart;

					$needle = 'p-eplist__update">';
					$posStart = strpos($html, $needle, $posStart);
					$posStart += strlen($needle) + 1;
					$posEnd = strpos($html, '</div>', $posStart);

					$datestring = substr($html, $posStart, $posEnd - $posStart);

					$pattern = '/(\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2})/';
					preg_match_all($pattern, $datestring, $matches);

					$dateOriginalPost = $matches[0][0];
					$dateOriginalRevision = $matches[0][1] ?? null;

					if ($dateOriginalPost)
						$dateOriginalPost = str_replace('/', '-', substr($dateOriginalPost, 0, 16)) . ':00';
					if ($dateOriginalRevision)
						$dateOriginalRevision = str_replace('/', '-', substr($dateOriginalRevision, 0, 16)) . ':00';

					/**
					 * Gotta use the same pointer as configured at the top, this is because this is the only "absolute" in Syosetu.
					 * I previously used the chapter number (no), however, if the author releases a new chapter in between old chapters, all numbers are pushed up.
					 * Same when a chapter is deleted. As such, the original post date is the only absolute variable.
					 * */

					if (!isset($listOfChapters[$dateOriginalPost])) {
						$listOfChapters[$dateOriginalPost] = [];
					}
					$listOfChapters[$dateOriginalPost][] = [
						'idNovel' => $idNovel,
						'no' => $current_no,
						'arc' => isset($arcs[$nextArc - 1]) ? $arcs[$nextArc - 1]['title'] : null,
						'title' => $title,
						'dateOriginalPost' => $dateOriginalPost,
						'dateOriginalRevision' => $dateOriginalRevision,
					];
				} else {
					$Found = false;
					break;
				}
			}
		}
		// die(json_encode($listOfChapters));
		return $listOfChapters;
	}
	public function importIndex($idNovel)
	{
		$listOfChapters = $this->parseIndex($idNovel);
		return $listOfChapters;
	}
}
