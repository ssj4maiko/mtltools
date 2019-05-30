<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dictionary extends Model
{
	protected $table = 'dictionaries';
	protected $primaryKey = 'id';
	//public $timestamps = false;
	const CREATED_AT = 'dateCreated';
	const UPDATED_AT = 'dateRevision';

	protected $fillable = [
		 'id'
		,'idNovel'
		,'language'
	];
	public static function prepare($data){

		return $data;
	}
}
