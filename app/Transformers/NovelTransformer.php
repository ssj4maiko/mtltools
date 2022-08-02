<?php
namespace App\Transformers;

use League\Fractal\Serializer\ArraySerializer;
use League\Fractal\TransformerAbstract;
use App\Models\Novel;

class NovelTransformer extends TransformerAbstract
{
	private $doDictionary = true;
	public function __construct($doDictionary = true) {
		$this->doDictionary = $doDictionary;
	}
	public function transform(Novel $novel)
	{
		$base = [
			"id"				=>	$novel->id
			,"code"				=>	$novel->code
			,"nameOriginal"		=>	$novel->nameOriginal
			,"nameCustom"		=>	$novel->nameCustom
			,"driver"			=>	$novel->driver
			,"numberChapters"	=>	$novel->numberChapters
			,"flagR18"			=>	$novel->flagR18
			,"completed"		=>	$novel->completed
			,"addedBy"			=>	$novel->addedBy
			,"show"				=>	$novel->show
			,"urlSource"		=>	$novel->getUrlSource()
		];
		if ($this->doDictionary) {
			$base['dictionary'] = \fractal()
				->collection($novel->dictionary, new DictionaryTransformer(false))
				->serializeWith(new ArraySerializer)
				->toArray()['data'];
		}
		return $base;
	}
}