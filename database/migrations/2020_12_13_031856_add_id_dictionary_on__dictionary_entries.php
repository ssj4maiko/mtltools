<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AddIdDictionaryOnDictionaryEntries extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('dictionaryEntries', function (Blueprint $table) {
            $table->smallInteger('idDictionary')->nullable();
        });

        DB::update('update dictionaryEntries e
                    join dictionaryCategories c ON e.idCategory = c.id
                    set e.idDictionary = c.idDictionary;');
        
        Schema::table('dictionaryEntries', function (Blueprint $table) {
            $table->smallInteger('idDictionary')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('dictionaryEntries', function (Blueprint $table) {
            $table->dropColumn('idDictionary');
        });
    }
}
