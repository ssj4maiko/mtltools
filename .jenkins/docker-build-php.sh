#!/bin/bash

PHP_BUILD_NAME="docker-mtltools-php-api"

## Use these from root
if [ -d "./resources/frontend" ]; then
    cd .docker/php/
    docker build -t $PHP_BUILD_NAME .

    cd ../../
    if [ -f ".env"]; then
        cp .env.example .env
    fi
    docker run -v ./:/var/www/api -w /var/www/api --restart=no $PHP_BUILD_NAME bash -c ("composer install; php artisan key:generate;")
else
    echo "You must run this script from the project's root."
    exit 0
fi