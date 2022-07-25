<?php
namespace App\Transformers;

use App\Drivers\DriverInterface;
use League\Fractal\TransformerAbstract;
use App\Models\Chapter;

class ChapterTransformer extends TransformerAbstract
{
	private $driver;
    public function __construct(?DriverInterface $driver)
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