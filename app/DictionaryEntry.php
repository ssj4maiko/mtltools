<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class DictionaryEntry extends Model
{
	protected $table = 'dictionaryEntries';
	protected $primaryKey = 'id';
	public $timestamps = false;
	//const CREATED_AT = 'dateCreated';
	//const UPDATED_AT = 'dateRevised';

	protected $fillable = [
		'id',
		'idCategory',
		'entryOriginal',
		'entryTranslation',
		'description',
        'length'
	];
	protected $hidden = [
    ];


    private $insert = [];
    private $update = [];
    private $delete = [];

    public function getInsert(){
        return $this->insert;
    }
    public function getUpdate(){
        return $this->update;
    }
    public function getDelete(){
        return $this->delete;
    }
    public function massInsert(){
        if(count($this->insert) > 0){
            DB::table($this->table)->insert($this->insert);
            return true;
        }
        return false;
    }
    public function massUpdate(){
        foreach($this->update as $update){
            $update->save();
        }
        return count($this->update) > 0;
    }
    public function massDelete(){
        if(count($this->delete) > 0){
            DB::table($this->table)->whereIn($this->primaryKey, $this->delete)->delete();
            return true;
        }
        return false;
    }
	public function prepare($data, $idCategory){
        foreach($data['entries'] as $v){
            if($v['id']){
                if($v['delete']){
                    $this->delete[] = $v['id'];
                }
                elseif($v['update']){
                    $tmp = DictionaryEntry::find($v['id']);
                    $tmp->entryOriginal = $v['original'];
                    $tmp->entryTranslation = $v['translation'];
                    $tmp->description = $v['description'];
                    $tmp->length = strlen($v['original']);

                    $this->update[] = $tmp;
                }
            } else {
                if($v['original']
                || $v['translation']){
                    $this->insert[] = [
                        'idCategory'        =>  $idCategory,
                        'entryOriginal'     =>  !empty($v['original']) ? $v['original'] : $v['translation'],
                        'entryTranslation'  =>  !empty($v['translation']) ? $v['translation'] : $v['original'],
                        'description'       =>  $v['description'],
                        'length'            =>  strlen(!empty($v['original']) ? $v['original'] : $v['translation'])
                    ];
                }
            }
        }

		return $data;
	}
}
