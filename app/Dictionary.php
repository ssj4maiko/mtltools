<?php

namespace App;
use App\DictionaryCategory;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Dictionary extends Model
{
	protected $table = 'dictionaries';
    protected $primaryKey = 'id';

	protected $defaultForeignKey = 'idDictionary';
	//public $timestamps = false;
	const CREATED_AT = 'dateCreated';
	const UPDATED_AT = 'dateRevision';

	protected $fillable = [
		 'id'
		,'idNovel'
		,'language'
    ];
    public function dictionaryCategory(){
        return $this->hasMany(dictionaryCategory::class, $this->defaultForeignKey);
    }
    public function countCategories(){
        return $this->dictionaryCategory()->select($this->defaultForeignKey,DB::raw('count(*) as count'))->groupBy($this->defaultForeignKey);
    }
	public static function prepare($data){

		return $data;
	}
}
