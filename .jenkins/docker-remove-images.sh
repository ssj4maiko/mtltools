#!/bin/bash

NODE_BUILD_NAME="docker-mtltools-node-app"
PHP_BUILD_NAME="docker-mtltools-php-api"

#docker container prune -f

echo "Removing node image $NODE_BUILD_NAME"
docker image rm $NODE_BUILD_NAME -f

echo "Removing php image $PHP_BUILD_NAME"
docker image rm $PHP_BUILD_NAME -f