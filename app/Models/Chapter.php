<?php

namespace App\Models;

use App\Drivers\DriverInterface;
use Dotenv\Parser\Entry;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class Chapter extends Model
{
    //
    protected $table = 'chapters';
    /** @var string[] $primaryKey */
    protected $primaryKey = ['idNovel', 'no'];
    const CREATED_AT = 'dateCreated';
    const UPDATED_AT = 'dateRevision';
    public $incrementing = false;

    //Pseudo-column = addSelect(DB::raw('(textOriginal IS NOT NULL) as hasText'))

    protected $fillable = [
        'idNovel',
        'no',
        'noCode',
        'arc',
        'title',
        'textOriginal',
        'dateRevision',
        'textCustom',
        'dateOriginalPost',
        'dateOriginalRevision'
    ];
    public function novel()
    {
        return $this->hasOne(Novel::class, 'id', 'idNovel');
    }
    public static function prepare($data)
    {
        return $data;
    }
    public function translateText($text, $dictionary): string
    {
        $text = self::fixRuby($text);

        /** @var Dictionary $dictionary */
        foreach ($dictionary->dictionary_entry as $entry) {
            /** @var DictionaryEntry $entry */
            if ($entry->sufix) {
                $text = str_replace(
                    ']' . $entry->sufix . ']' . $entry->entryOriginal
                    ,
                    $entry->entryTranslation . ']' . $entry->idCategory . ']',
                    $text
                );
            } else if ($entry->prefix) {
                $text = str_replace(
                    $entry->entryOriginal . '[' . $entry->prefix . '[',
                    '[' . $entry->idCategory . '[' . $entry->entryTranslation,
                    $text
                );
            } else {
                $text = str_replace(
                    $entry->entryOriginal,
                    strlen($entry->entryTranslation) === 0 ?
                    '' : '[' . $entry->idCategory . '[' . $entry->entryTranslation . ']' . $entry->idCategory . ']',
                    $text
                );
            }
        }
        $regexStart = '\[[0-9]+\[';
        $regexEnd = '\][0-9]+\]';
        $text = preg_replace('/(' . $regexEnd . $regexStart . ')+/m', ' ', $text);
        $text = preg_replace('/(' . $regexEnd . ')+/m', '', $text);
        $text = preg_replace('/(' . $regexStart . ')+/m', '', $text);
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
    public function getUrlSource(?DriverInterface $driver)
    {
        if (!$driver) {
            return null;
        }
        $driver->setChapter($this);
        return $driver->prepareUrl();
    }
    /**
     * In case a book has something like <ruby><span>a</span><rt>1</rt><span>b</span><rt>2</rt></ruby> which destroys MTL output, we merge the entries to simplify it.
     */
    public static function fixRuby(string $input): string
    {
        $pattern = '/<ruby>(.*?)<\/ruby>/s';
        $output = preg_replace_callback($pattern, function ($matches) {
            $pos = strpos($matches[1], '</rt><span>');
            if ($pos > 0) {
                $rtSpanPattern = '/<rt>(.*?)<\/rt>|<span>(.*?)<\/span>/s';
                $rtMatches = [];
                $spanMatches = [];

                // Collect all <rt> and <span> separately
                preg_match_all($rtSpanPattern, $matches[1], $allMatches, PREG_SET_ORDER);

                foreach ($allMatches as $match) {
                    if (!empty($match[1])) {
                        $rtMatches[] = $match[1];
                    } elseif (!empty($match[2])) {
                        $spanMatches[] = $match[2];
                    }
                }

                // Blend <rt> and <span> into one <rt> and one <span>
                $mergedRt = !empty($rtMatches) ? '<rt>' . implode('', $rtMatches) . '</rt>' : '';
                $mergedSpan = !empty($spanMatches) ? '<span>' . implode('', $spanMatches) . '</span>' : '';

                return "<ruby>{$mergedSpan}{$mergedRt}</ruby>";
            } else {
                return $matches[0];
            }
        }, $input);

        return $output;
    }
}
