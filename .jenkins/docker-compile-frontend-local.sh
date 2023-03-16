#!/bin/bash

## Use these from root
if [ -d "./resources/frontend" ]; then
    source .jenkins/variables.sh

    if [ -d "./resources/frontend/dist" ]; then
        echo "Compilation already exists. Cleaning it."
        sudo rm -R ./resources/frontend/dist
    else
        echo "First time running the compilation"
    fi

    echo "Building front-end"
    docker run -v ./resources/frontend:/home/node/app:rw -w /home/node/app --restart=no $NODE_BUILD_NAME ng build --build-optimizer
else
    echo "You must run this script from the project's root."
    exit 0
fi