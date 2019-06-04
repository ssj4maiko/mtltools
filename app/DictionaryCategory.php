<?php

namespace App;
use App\DictionaryEntry;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class DictionaryCategory extends Model
{
	protected $table = 'dictionaryCategories';
	protected $primaryKey = 'id';
	public $timestamps = false;
	protected $defaultForeignKey = 'idCategory';
	//const CREATED_AT = 'dateCreated';
	//const UPDATED_AT = 'dateRevised';

	protected $fillable = [
		 'id'
		,'idDictionary'
		,'name'
    ];
    public function dictionaryEntry(){
        return $this->hasMany(DictionaryEntry::class, $this->defaultForeignKey);
    }
    public function countEntries(){
        return $this->dictionaryEntry()->select($this->defaultForeignKey,DB::raw('count(*) as count'))->groupBy($this->defaultForeignKey);
    }

	public static function prepare($data){
		return $data;
	}
}
