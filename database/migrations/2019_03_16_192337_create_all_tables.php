<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAllTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('novels', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->char('code',7);
            $table->string('nameOriginal',100);
            $table->string('nameCustom',255)->nullable();
            $table->unsignedSmallInteger('numberChapters')->default(0);
            $table->unsignedTinyInteger('flagSyosetu')->default(1);
            $table->unsignedTinyInteger('flagR18')->default(0);
            $table->string('addedBy');
            $table->unsignedTinyInteger('show')->default(1);

            $table->unique('code');
        });
        Schema::create('chapters', function (Blueprint $table) {
            $table->unsignedSmallInteger('idNovel');
            $table->unsignedSmallInteger('no');
            $table->string('title',100);
            $table->mediumText('textOriginal')->nullable();
            $table->mediumText('textRevised')->nullable();
            $table->mediumText('textCustom')->nullable();
            $table->dateTimeTz('dateOriginalPost')->nullable();
            $table->dateTimeTz('dateOriginalRevision')->nullable();
            $table->timestampTz('dateCreated')->useCurrent();
            $table->dateTimeTz('dateRevision')->nullable();

            $table->primary(['idNovel','no']);
            $table->foreign('idNovel')->references('id')->on('novels');
        });

        Schema::create('dictionaries', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->unsignedSmallInteger('idNovel');
            $table->string('language',15);
            $table->timestampTz('dateCreated')->useCurrent();
            $table->dateTimeTz('dateRevision')->nullable();

            $table->foreign('idNovel')->references('id')->on('novels');
        });

        Schema::create('dictionaryCategories', function (Blueprint $table) {
            $table->mediumIncrements('id');
            $table->unsignedSmallInteger('idDictionary');
            $table->string('name',20);

            $table->foreign('idDictionary')->references('id')->on('dictionaries');
        });

        Schema::create('dictionaryEntries', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedMediumInteger('idCategory');
            $table->string('entryOriginal',60);
            $table->string('entryTranslation',80);
            $table->string('description',1500)->nullable(); //Should be TINYTEXT...
            $table->unsignedTinyInteger('length');

            $table->foreign('idCategory')->references('id')->on('dictionaryCategories');
        });
        /*
            Schema::create('dictionaryEntCat', function (Blueprint $table) {
                $table->unsignedInteger('idEntry');
                $table->unsignedMediumInteger('idCategory');

                $table->primary(['idEntry','idCategory']);
                $table->foreign('idEntry')->references('id')->on('dictionaryEntries');
                $table->foreign('idCategory')->references('id')->on('dictionaryCategories');
            });
        */
        Schema::create('filters', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->unsignedSmallInteger('idNovel');
            $table->string('name',25);
            $table->string('language',25);
            $table->timestampTz('dateCreated')->useCurrent();
            $table->string('searchPrefix',5);
            $table->string('searchSufix',5);

            $table->foreign('idNovel')->references('id')->on('novels');
        });

        Schema::create('filterEntries', function (Blueprint $table) {
            $table->mediumIncrements('id');
            $table->unsignedSmallInteger('idFilter');
            $table->string('word',20);
            $table->string('translation',30)->nullable();

            $table->foreign('idFilter')->references('id')->on('filters');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dictionaryEntCat');
        Schema::dropIfExists('filterEntries');
        Schema::dropIfExists('dictionaryEntries');
        Schema::dropIfExists('dictionaryCategories');
        Schema::dropIfExists('dictionaries');
        Schema::dropIfExists('filters');
        Schema::dropIfExists('chapters');
        Schema::dropIfExists('novels');
    }
}
