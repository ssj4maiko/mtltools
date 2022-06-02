<?php
namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\DictionaryEntry;

class DictionaryEntryTransformer extends TransformerAbstract
{
	public function transform(DictionaryEntry $DictionaryEntry)
	{
		return [
			"id"	=> $DictionaryEntry->id,
			"idCategory"	=> $DictionaryEntry->idCategory,
			"entryOriginal"	=> $DictionaryEntry->entryOriginal,
			"entryTranslation"	=> $DictionaryEntry->entryTranslation,
			"description"	=> $DictionaryEntry->description,
			"length"	=> $DictionaryEntry->length,
			"sufix"	=> $DictionaryEntry->sufix,
			"prefix"	=> $DictionaryEntry->prefix,
			"simplified"	=> $DictionaryEntry->simplified
		];
	}
}