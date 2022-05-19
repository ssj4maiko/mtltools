<?php

namespace App\Models;
use App\Models\DictionaryCategory;

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
		,'name'
		,'language'
    ];
    public function dictionaryCategory(){
        return $this->hasMany(DictionaryCategory::class, self::$defaultForeignKey);
    }
    public function dictionaryEntry(){
        return $this->hasManyThrough(DictionaryEntry::class,DictionaryCategory::class
                                    ,self::$defaultForeignKey,DictionaryCategory::$defaultForeignKey
                                    ,'id', 'id'
                                )
                                // Must come at the end
                                ->orderBy('sufix', 'ASC')
                                ->orderBy('prefix', 'ASC')
                                ->orderBy('length', 'desc');
    }
    public function novel(){
        return $this->belongsToMany(Novel::class,'novelsDictionaries','idDictionary', 'idNovel');
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
        return $D;
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
    public function setNovels($idsNovel)
    {
        $this->novel()->detach();
        $this->novel()->attach($idsNovel);
    }
    public function toArray(){
        $array = parent::toArray();
        if(isset($array['count_categories'])){
            $array['count_categories'] = isset($array['count_categories'][0]) ? $array['count_categories'][0]['count'] : 0;
        }
        return $array;
    }
}
