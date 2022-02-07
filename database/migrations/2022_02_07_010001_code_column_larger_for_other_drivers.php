<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CodeColumnLargerForOtherDrivers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('novels', function (Blueprint $table) {
            $table->string('code',20)->change();
        });
        Schema::table('chapters', function (Blueprint $table) {
            $table->string('noCode',25)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('novels', function (Blueprint $table) {
            $table->string('code',7)->change();
        });
        Schema::table('chapters', function (Blueprint $table) {
            $table->dropColumn('noCode');
        });
    }
}
