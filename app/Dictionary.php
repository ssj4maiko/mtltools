<?php

namespace App;
use App\DictionaryCategory;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class Dictionary extends Model
{
	protected $table = 'dictionaries';
    protected $primaryKey = 'id';

	public static $defaultForeignKey = 'idDictionary';
	//public $timestamps = false;
	const CREATED_AT = 'dateCreated';
	const UPDATED_AT = 'dateRevision';

	protected $fillable = [
		 'id'
		,'idNovel'
		,'language'
    ];
    public function dictionaryCategory(){
        return $this->hasMany(DictionaryCategory::class, self::$defaultForeignKey);
    }
    public function dictionaryEntry(){
        return $this->hasManyThrough(DictionaryEntry::class,DictionaryCategory::class
                                    ,self::$defaultForeignKey,DictionaryCategory::$defaultForeignKey
                                    ,'id', 'id'
                                )->orderBy('length', 'desc');
    }
    public static function updateRevision($idDictionary = null, $idCategory = null){
        if($idCategory){
            $C = dictionaryCategory::find($idCategory);
            $idDictionary = $C->idDictionary;
        }

        if($idDictionary){
            $D = self::findOrFail($idDictionary);
            $D->dateRevision = Carbon::now();
            $D->update();
        }
    }
    public function countCategories(){
        return $this->dictionaryCategory()
                    ->select(self::$defaultForeignKey, DB::raw('count(*) as count'))
                    ->groupBy(self::$defaultForeignKey)
                    ;
    }
	public static function prepare($data){

		return $data;
	}
}
