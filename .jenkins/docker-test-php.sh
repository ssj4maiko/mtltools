#!/bin/bash

## Use these from root
if [ -d "./resources/frontend" ]; then
    source .jenkins/variables.sh
    
    docker run -v ./:/var/www/api -w /var/www/api --restart=no $PHP_BUILD_NAME bash -c "php artisan key:generate; php artisan test;"
else
    echo "You must run this script from the project's root."
    exit 0
fi