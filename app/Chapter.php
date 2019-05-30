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

	//Pseudo-column = addSelect(DB::raw('(textOriginal IS NOT NULL) as hasText'))

	protected $fillable = [
		 'idNovel'
		,'no'
		,'title'
		,'textOriginal'
		,'textRevised'
		,'textCustom'
		,'dateOriginalPost'
		,'dateOriginalRevision'
	];
	public static function prepare($data){

		return $data;
	}
}
