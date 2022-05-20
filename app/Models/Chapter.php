<?php

namespace App\Models;

use Dotenv\Parser\Entry;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class Chapter extends Model
{
	//
    protected $table = 'chapters';
    /** @var string[] $primaryKey */
	protected $primaryKey = ['idNovel','no'];
	const CREATED_AT = 'dateCreated';
	const UPDATED_AT = 'dateRevision';
	public $incrementing = false;

	//Pseudo-column = addSelect(DB::raw('(textOriginal IS NOT NULL) as hasText'))

	protected $fillable = [
		 'idNovel'
		,'no'
		,'noCode'
		,'title'
		,'textOriginal'
		,'dateRevision'
		,'textCustom'
		,'dateOriginalPost'
		,'dateOriginalRevision'
	];
	public static function prepare($data){

		return $data;
    }
    public function translateText($text, $dictionary):string{
        /** @var Dictionary $dictionary */
        foreach ($dictionary->dictionary_entry as $entry) {
            /** @var DictionaryEntry $entry */
            if($entry->entryOriginal == $entry->entryTranslation){
                continue;
            }
            if($entry->sufix){
                $text = str_replace(
                    ']'.$entry->sufix.']'.$entry->entryOriginal
                    ,$entry->entryTranslation.']'.$entry->idCategory.']', $text);
            } else if($entry->prefix) {
                $text = str_replace(
                    $entry->entryOriginal . '[' . $entry->idCategory . '[',
                    '[' . $entry->idCategory . '['. $entry->entryTranslation,
                    $text
                );
            } else {
                $text = str_replace($entry->entryOriginal, '['. $entry->idCategory.'['.$entry->entryTranslation.']'.$entry->idCategory.']', $text);
            }
        }
        $regexStart = '\[[0-9]+\[';
        $regexEnd   = '\][0-9]+\]';
        $text = preg_replace('/(' . $regexEnd.$regexStart . ')+/m', ' ', $text);
        $text = preg_replace('/('.$regexEnd.')+/m', '', $text);
        $text = preg_replace('/('.$regexStart.')+/m', '', $text);
        return $text;
    }

    protected function getKeyForSaveQuery($keyName = null)
    {
        if (is_null($keyName)) {
            $keyName = $this->getKeyName();
        }

        if (isset($this->original[$keyName])) {
            return $this->original[$keyName];
        }

        return $this->getAttribute($keyName);
    }

    /**
     * Set the keys for a save update query.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function setKeysForSaveQuery($query)
    {
        $keys = $this->getKeyName();
        if (!is_array($keys)) {
            return parent::setKeysForSaveQuery($query);
        }

        foreach ($keys as $keyName) {
            $query->where($keyName, '=', $this->getKeyForSaveQuery($keyName));
        }

        return $query;
    }
    
}
