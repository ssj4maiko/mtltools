<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Images extracted from chapter text (base64 data: URIs) into content-addressed files
 * storage/app/public/images/<h2>/<sha256>.<ext>, served by nginx at /images/<h2>/<sha256>.<ext>.
 * One row per (chapter, column, image); `refs` counts repeated uses inside that text.
 * Used by chapters:extract-images; also lets a cleanup job find unreferenced files.
 */
return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('chapter_images')) {
            return;
        }
        Schema::create('chapter_images', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedSmallInteger('idNovel');
            $table->unsignedSmallInteger('no');
            $table->string('col', 20);
            $table->char('sha256', 64);
            $table->string('ext', 5);
            $table->unsignedInteger('bytes');
            $table->unsignedSmallInteger('refs')->default(1);
            $table->timestamp('created_at')->useCurrent();
            $table->unique(['idNovel', 'no', 'col', 'sha256'], 'chapter_images_chapter_sha');
            $table->index('sha256');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chapter_images');
    }
};
