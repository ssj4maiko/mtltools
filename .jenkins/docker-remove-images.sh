#!/bin/bash

source .jenkins/variables.sh

#docker container prune -f

echo "Removing node image $NODE_BUILD_NAME"
docker image rm $NODE_BUILD_NAME -f

echo "Removing php image $PHP_BUILD_NAME"
docker image rm $PHP_BUILD_NAME -f