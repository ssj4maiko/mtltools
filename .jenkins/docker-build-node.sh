#!/bin/bash

NODE_BUILD_NAME="docker-mtltools-node-app"

## Use these from root
if [ -d "./resources/frontend" ]; then
    cd .docker/node/
    echo "Creating new image"
    docker build -t $NODE_BUILD_NAME .

    cd ../../
    echo "Building front-end"
    docker run -v ./resources/frontend:/home/node/app:rw -w /home/node/app --restart=no $NODE_BUILD_NAME npm install
else
    echo "You must run this script from the project's root."
    exit 0
fi
