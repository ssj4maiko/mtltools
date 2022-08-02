<?php
namespace App\Transformers;

use League\Fractal\Serializer\ArraySerializer;
use League\Fractal\TransformerAbstract;
use App\Models\DictionaryCategory;

class DictionaryCategoryTransformer extends TransformerAbstract
{
	public function transform(DictionaryCategory $dictionaryCategory)
	{
		return [
			"id"	=>	$dictionaryCategory->id,
			"idDictionary"	=>	$dictionaryCategory->idDictionary,
			"name"	=>	$dictionaryCategory->name,
			'count_entries'	=>	$dictionaryCategory->countEntries[0]->count,
		];
	}
}