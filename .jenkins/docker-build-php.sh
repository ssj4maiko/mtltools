#!/bin/bash


## Use these from root
if [ -d "./resources/frontend" ]; then
    source ./.jenkins/variables.sh
    
    cd .docker/php/
    docker build -t $PHP_BUILD_NAME .

    cd ../../
    if [ ! -f .env ]; then
        echo ".env file did not exist. Creating it from the example file."
        cp .env.example .env
    else
        echo ".env file already exists"
    fi
    docker run -v ./:/var/www/api -w /var/www/api --restart=no $PHP_BUILD_NAME bash -c "composer install;"
else
    echo "You must run this script from the project's root."
    exit 0
fi