<?php
namespace App\Transformers;

use League\Fractal\Serializer\ArraySerializer;
use League\Fractal\TransformerAbstract;
use App\Models\Dictionary;

class DictionaryTransformer extends TransformerAbstract
{
	private $doNovels = true;
	public function __construct($doNovels = true) {
		$this->doNovels = $doNovels;
	}
	public function transform(Dictionary $dictionary)
	{
		$base = [
			"id"	=>	$dictionary->id,
			"name"	=>	$dictionary->name,
			"language"	=>	$dictionary->language,
			"dateCreated"	=>	$dictionary->dateCreated,
			"dateRevision"	=>	$dictionary->dateRevision,
			'count_categories'	=>	$dictionary->countCategories[0]->count,
		];

		if ($this->doNovels) {
			$base['novel'] = \fractal()
				->collection($dictionary->novel, new NovelTransformer(false))
				->serializeWith(new ArraySerializer)
				->toArray()['data'];
		}
		return $base;
	}
}