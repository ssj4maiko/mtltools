<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Novel extends Model
{
	//
	protected $table = 'novels';
	protected $primaryKey = 'id';
	public $timestamps = false;
	//const CREATED_AT = 'dateCreated';
	//const UPDATED_AT = 'dateRevised';

	protected $fillable = [
		 'code'
		,'nameOriginal'
		,'nameCustom'
		,'numberChapters'
		,'flagSyosetu'
		,'flagR18'
		,'addedBy'
		,'show'
	];

	public static function prepare($data){

		if(isset($data['flagSyosetu']) || is_null($data['flagSyosetu']))
			$data['flagSyosetu'] = $data['flagSyosetu'] ? 1 : 0;

		if(isset($data['flagR18']) || is_null($data['flagR18']))
			$data['flagR18'] = $data['flagR18'] ? 1 : 0;

		if(isset($data['show']) || is_null($data['show']))
			$data['show'] = $data['show'] ? 1 : 0;

		return $data;
	}
}
