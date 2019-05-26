<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
	//
	protected $table = 'chapters';
	protected $primaryKey = 'no';
	const CREATED_AT = 'dateCreated';
	const UPDATED_AT = 'dateRevision';

	protected $fillable = [
		 'idNovel'
		,'no'
		,'title'
		,'textOriginal'
		,'textCustom'
	];
	public static function prepare($data){

		return $data;
	}
}
