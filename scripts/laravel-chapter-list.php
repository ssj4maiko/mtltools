<?php
/**
 * Dispatch GET /api/chapter/{id} through Laravel's HTTP kernel (ignores nginx).
 * Prints: status code on the first line, then the raw body.
 * Used by the Node contract test. Do not log or commit the body.
 */
if ($argc < 2 || !ctype_digit((string) $argv[1])) {
    fwrite(STDERR, "Usage: php scripts/laravel-chapter-list.php {idNovel}\n");
    exit(2);
}

require __DIR__ . '/../vendor/autoload.php';
$app = require __DIR__ . '/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
$http = $app->make(Illuminate\Contracts\Http\Kernel::class);
$request = Illuminate\Http\Request::create('/api/chapter/' . $argv[1], 'GET');
$response = $http->handle($request);
echo $response->getStatusCode(), "\n";
echo $response->getContent();
