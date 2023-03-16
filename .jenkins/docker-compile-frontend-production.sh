#!/bin/bash

## Use these from root
if [ -d "./resources/frontend" ]; then
    source .jenkins/variables.sh
    
    if [ -d "./resources/frontend/dist" ]; then
        echo "Compilation already exists. Cleaning it."
        # rm -R ./resources/frontend/dist
    else
        echo "First time running the compilation"
    fi

    echo "Building front-end."
    # docker run -v ./resources/frontend:/home/node/app:rw -w /home/node/app --restart=no $NODE_BUILD_NAME ng build --build-optimizer --aot --aot --configuration production 
    echo """
    Front-end compiled.
    
    Deleting previous build files:
    """
    rm -f -R ./public/*.js
    rm -f -R ./public/*.css
    rm -f -R ./public/*.ico
    rm -f ./resources/views/index.blade.php
    echo "Copying new build into the public directory + Laravel Index view:"
    cp -R ./resources/frontend/dist/frontend/* ./public/
    cp ./resources/frontend/dist/frontend/index.html ./resources/views/index.blade.php
    echo "... Compilation finished."
else
    echo "You must run this script from the project's root."
    exit 0
fi