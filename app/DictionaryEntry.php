<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DictionaryEntry extends Model
{
	protected $table = 'dictionaryEntries';
	protected $primaryKey = 'id';
	public $timestamps = false;
	//const CREATED_AT = 'dateCreated';
	//const UPDATED_AT = 'dateRevised';

	protected $fillable = [
		 'id'
		,'idDictionary'
		,'entryOriginal'
		,'entryTranslation'
		,'description'
	];
	protected $hidden = [
		'length'
	];

	public static function prepare($data){

		$data['length'] = strlen($data['entryOriginal']);

		if(empty($data['entryTranslation']))
			$data['entryTranslation'] = $data['entryOriginal'];

		return $data;
	}
}
