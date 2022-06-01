<?php
namespace App\Transformers;

use App\Drivers\DriverInterface;
use League\Fractal\TransformerAbstract;
use App\Models\Chapter;

class ChapterTransformer extends TransformerAbstract
{
	private $driver;
	public function __construct(DriverInterface $driver){
		$this->driver = $driver;
	}
	public function transform(Chapter $chapter)
	{
		$base = [
			"idNovel"				=> $chapter->idNovel,
			"no"					=> $chapter->no,
			"arc"					=> $chapter->arc,
			"title"					=> $chapter->title,
			"dateOriginalPost"		=> $chapter->dateOriginalPost,
			"dateOriginalRevision"	=> $chapter->dateOriginalRevision,
			"dateCreated"			=> $chapter->dateCreated,
			"dateRevision"			=> $chapter->dateRevision,
			//"noCode"				=> $chapter->noCode,
			"hasText"				=> $chapter->hasText,
			"urlSource"				=> $chapter->getUrlSource($this->driver)
		];
		if($chapter->textOriginal){
			$base['textOriginal']	=	$chapter->textOriginal;
		}
		if($chapter->textRevision){
			$base['textRevision']	=	$chapter->textRevision;
		}
		if($chapter->textCustom){
			$base['textCustom']	=	$chapter->textCustom;
		}
		return $base;
	}
}