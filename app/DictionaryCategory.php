<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DictionaryCategory extends Model
{
	protected $table = 'dictionaryCategories';
	protected $primaryKey = 'id';
	public $timestamps = false;
	//const CREATED_AT = 'dateCreated';
	//const UPDATED_AT = 'dateRevised';

	protected $fillable = [
		 'id'
		,'idDictionary'
		,'name'
	];

	public static function prepare($data){
		return $data;
	}
}
