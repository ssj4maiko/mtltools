<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSufixPrefixColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('dictionaryEntries', function (Blueprint $table) {
            $table->unsignedMediumInteger('sufix')->nullable();
            $table->unsignedMediumInteger('prefix')->nullable();
            $table->string('simplified')->nullable();

            $table->foreign('sufix')->references('id')->on('dictionaryCategories');
            $table->foreign('prefix')->references('id')->on('dictionaryCategories');
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
            $table->dropForeign(['sufix']);
            $table->dropForeign(['prefix']);
            $table->dropColumn('sufix');
            $table->dropColumn('prefix');
            $table->dropColumn('simplified');
        });
    }
}
