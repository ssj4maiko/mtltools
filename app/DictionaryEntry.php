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
	//const UPDATED_AT = 'dateRevision';

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

    public function dictionaryCategory(){
        return $this->belongsTo(DictionaryCategory::class, 'idCategory', 'id');
    }

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
            if($v['id'] && $v['id'] > 0){
                if(isset($v['delete']) && $v['delete']){
                    $this->delete[] = $v['id'];
                }
                elseif(isset($v['update']) && $v['update']){
                    $tmp = DictionaryEntry::find($v['id']);
                    $tmp->idCategory = $v['idCategory'];
                    $tmp->entryOriginal = $v['entryOriginal'];
                    $tmp->entryTranslation = $v['entryTranslation'];
                    $tmp->description = $v['description'];
                    $tmp->length = strlen($v['entryOriginal']);

                    $this->update[] = $tmp;
                }
            } else {
                if($v['entryOriginal']
                || $v['entryTranslation']){
                    $insert = [
                        'idCategory'        =>  $v['idCategory'],
                        'entryOriginal'     =>  !empty($v['entryOriginal']) ? $v['entryOriginal'] : $v['entryTranslation'],
                        'entryTranslation'  =>  !empty($v['entryTranslation']) ? $v['entryTranslation'] : $v['entryOriginal'],
                        'description'       =>  $v['description'],
                    ];
                    $insert['length'] = strlen($v['entryOriginal']);
                    $this->insert[] = $insert;
                }
            }
        }

		return $data;
	}
}
