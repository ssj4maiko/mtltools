#!/bin/bash

PHP_BUILD_NAME="docker-mtltools-php-api"

## Use these from root
if [ -d "./resources/frontend" ]; then
    docker run -v ./:/var/www/api -w /var/www/api --restart=no $PHP_BUILD_NAME php artisan test
else
    echo "You must run this script from the project's root."
    exit 0
fi