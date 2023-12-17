<?php

namespace App\Drivers;

use App\Models\Chapter;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use GuzzleHttp\Client;

class Kakuyomu extends Model implements DriverInterface
{
    private static $url = ['https://kakuyomu.jp/works/{{code}}','/episodes/{{chapter}}'];
    private $currentCode = null;
    private $currentChapter = '';
    private $R18 = false;
    private $pointer = 'noCode';

    public function prepareUrl($update_information = false) : string
    {
        $link = str_replace('{{code}}', $this->currentCode, self::$url[0]);
        if($this->currentChapter) {
            $link .= str_replace('{{chapter}}', $this->currentChapter, self::$url[1]);
            if($update_information) {
                $link .= '/episode_sidebar';
            }
        }
        return $link;
    }

    public static function getSourceUrl($code, $R18 = false, $no = ''): string
    {
        $link = str_replace('{{code}}', $code, self::$url[0]);
        if ($no) {
            $link .= str_replace('{{chapter}}', $no, self::$url[1]);
        }
        return $link;
    }

    public function __construct($code, $R18, $chapter = '')
    {
        $this->setCode($code);
        $this->currentChapter = $chapter;
        $this->setR18($R18);
    }

    public function setCode($code):void
    {
        $this->currentCode = $code;
    }
    public function setChapter(?Chapter $chapter):void
    {
        if ($chapter) {
            $this->currentChapter = $chapter->noCode;
        } else {
            $this->currentChapter = '';
        }
    }
    public function setR18($R18):void
    {
        $this->R18 = $R18;
    }
    

    private function getSidebar()
    {
        $extra = [];
        $clientExtras = [];
        $client = new Client($clientExtras);
        $response = $client->request('GET', $this->prepareUrl(true), $extra);

        if($response->getStatusCode() == 200) {
            return $response->getBody()->getContents();
        } else {
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

    private function HTMLgetTitle($html)
    {
        $posStart = strpos($html, 'widget-episodeTitle');
        if($posStart > 0) {
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
        foreach($classContent as $class) {
            $posStart = strpos($html, $class);
            if($posStart > 0) {
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
        $this->setChapter($chapter);

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

    public function getPointer(): string
    {
        return $this->pointer;
    }
    /**
	 * Everything below is related to updating the index (finding new chapters)
	 *
	 * @param int $idNovel
	 * @return array
	 */
    private function parseIndex($idNovel):array
    {
        $currentIndexCode = 1; //To count chapter numbers

        $listOfChapters = [];

        $ArcTable = $this->getRefFromJson('Work:' . $this->currentCode)->tableOfContents;

        for($arcI = 0; $arcI < count($ArcTable); ++$arcI) {
            $arcRef = $this->getRefFromJson($ArcTable[$arcI]->__ref);

            for($chapterI = 0; $chapterI < count($arcRef->episodeUnions); ++$chapterI) {
                $chapterRef = $this->getRefFromJson($arcRef->episodeUnions[$chapterI]-> __ref);
                $arcTitle = $arcRef->chapter ? $this->getRefFromJson($arcRef->chapter->__ref)->title : null;
                
                if(!isset($listOfChapters[$chapterRef->id])) {
                    $listOfChapters[$chapterRef->id] = [];
                }
                $listOfChapters[$chapterRef->id][] = [
                    'idNovel'				=>	$idNovel,
                    'no'					=>	$currentIndexCode,
                    'noCode'				=>	$chapterRef->id,
                    'arc'					=>	$arcTitle,
                    'title'					=>	$chapterRef->title,
                    'dateOriginalPost'		=>	(new Carbon($chapterRef->publishedAt))->format('Y-m-d H:i:s'),
                    'dateOriginalRevision'	=>	null,
                ];
                $currentIndexCode++;
            }
        }
        return $listOfChapters;
    }
    private $json = null;
    private function getRefFromJson($ref)
    {
        return $this->json->$ref;
    }
	private function setJson($html): bool {
		$jsonPosStart = strpos($html, 'application/json', 0);
		$jsonPosStart = strpos($html, '>', $jsonPosStart) + 1;

		$jsonPosEnd = strpos($html, '</script', $jsonPosStart);
		try{

			$this->json = json_decode(substr($html, $jsonPosStart, $jsonPosEnd - $jsonPosStart));
			
			// Keeping only the relevant part of the tree
			$this->json = $this->json->props->pageProps->__APOLLO_STATE__;
		} catch(\Exception $e) {
			dd($e);
		}
		return true;
	}
    public function importIndex($idNovel)
    {
        $content = $this->callUrl();
		$this->setJson($content);
        $listOfChapters = $this->parseIndex($idNovel);
        return $listOfChapters;
    }
}
