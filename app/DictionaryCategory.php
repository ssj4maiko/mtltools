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
	public static $defaultForeignKey = 'idCategory';
	//const CREATED_AT = 'dateCreated';
	//const UPDATED_AT = 'dateRevised';

	protected $fillable = [
		 'id'
		,'idDictionary'
		,'name'
    ];
    public function dictionary(){
        return $this->belongsTo(Dictionary::class, 'idDictionary', 'id');
    }
    public function dictionaryEntry(){
        return $this->hasMany(DictionaryEntry::class, self::$defaultForeignKey);
    }
    public function countEntries(){
        return $this->dictionaryEntry()->select(self::$defaultForeignKey,DB::raw('count(*) as count'))->groupBy(self::$defaultForeignKey);
    }

	public static function prepare($data){
		return $data;
	}
}
