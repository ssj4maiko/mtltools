<?php
/**
 * Dispatch GET /api/chapter/{idNovel}/{no} through Laravel's HTTP kernel (ignores nginx).
 * Prints: status code on the first line, then the raw body.
 * Used by the Node contract test. Do not log or commit the body.
 */
if ($argc < 3 || !ctype_digit((string) $argv[1]) || !ctype_digit((string) $argv[2])) {
    fwrite(STDERR, "Usage: php scripts/laravel-chapter.php {idNovel} {no}\n");
    exit(2);
}

require __DIR__ . '/../vendor/autoload.php';
$app = require __DIR__ . '/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
$http = $app->make(Illuminate\Contracts\Http\Kernel::class);
$request = Illuminate\Http\Request::create('/api/chapter/' . $argv[1] . '/' . $argv[2], 'GET');
$response = $http->handle($request);
echo $response->getStatusCode(), "\n";
echo $response->getContent();
