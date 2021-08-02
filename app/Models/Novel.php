<?php

namespace App\Models;

use App\Drivers\DriverInterface;
use App\Drivers\Syosetu;
use Illuminate\Database\Eloquent\Model;

class Novel extends Model
{
	protected $table = 'novels';
	protected $primaryKey = 'id';
	public $timestamps = false;
	//const CREATED_AT = 'dateCreated';
	//const UPDATED_AT = 'dateRevision';

	protected $fillable = [
		 'code'
		,'nameOriginal'
		,'nameCustom'
		,'numberChapters'
		,'driver'
		,'flagR18'
		,'completed'
		,'addedBy'
		,'show'
	];
	public function dictionary(){
		return $this->belongsToMany(Dictionary::class,'novelsDictionaries', 'idNovel','idDictionary');
	}
	private static $drivers = [
		'manual'		=>	'Manual',
		'syosetu'		=>	'Syosetu ni Narou / 小説家になろう',
		'alphapolis'	=>	'Alphapolis / アルファポリス',
		'kakuyomu'		=>	'Kakuyomu / カクヨム'
	];
	public static function getDrivers(){
		return self::$drivers;
	}
	public function startDriver($no = 0) : DriverInterface{
		switch($this->driver){
			case 'syosetu':
				return new Syosetu($this->code, $no);
		}
		return null;
	}

	public static function prepare($data){
		if(isset($data['driver'])){
			if(!in_array($data['driver'],array_keys(self::$drivers))){
				$data['driver'] = null;
			}
		}

		if(isset($data['flagR18']) || is_null($data['flagR18']))
			$data['flagR18'] = $data['flagR18'] ? 1 : 0;

		if(isset($data['show']) || is_null($data['show']))
			$data['show'] = $data['show'] ? 1 : 0;

		if(isset($data['dictionaries'])){
			if(!(isset($data['dictionaries']['-']) || isset($data['dictionaries']['+']))){
				unset($data['dictionaries']);
			}
		}

		return $data;
	}
	public function setDictionaries($idsDictionary){
		$this->dictionary()->detach();
		$this->dictionary()->attach($idsDictionary);
	}
}
