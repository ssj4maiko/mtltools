<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class DictionaryEntry extends Model
{
	protected $table = 'dictionaryEntries';
	protected $primaryKey = 'id';
	public $timestamps = false;
	//const CREATED_AT = 'dateCreated';
	//const UPDATED_AT = 'dateRevision';

	protected $fillable = [
		'id',
		'idDictionary',
		'idCategory',
		'entryOriginal',
		'entryTranslation',
		'description',
        'length'
	];
	protected $hidden = [
        'idDictionary'
    ];

    public function dictionaryCategory(){
        return $this->belongsTo(DictionaryCategory::class, 'idCategory', 'id');
    }
}
