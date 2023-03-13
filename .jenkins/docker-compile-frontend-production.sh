#!/bin/bash

NODE_BUILD_NAME="docker-mtltools-node-app"

## Use these from root
if [ -d "./resources/frontend" ]; then
    if [ -d "./resources/frontend/dist" ]; then
        echo "Compilation already exists. Cleaning it."
        sudo rm -R ./resources/frontend/dist
    else
        echo "First time running the compilation"
    fi

    echo "Building front-end"
    docker run -v ./resources/frontend:/home/node/app:rw -w /home/node/app --restart=no $NODE_BUILD_NAME ng build --build-optimizer --aot --aot --configuration production 
else
    echo "You must run this script from the project's root."
    exit 0
fi