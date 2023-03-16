#!/bin/bash
NODE_BUILD_NAME="docker-mtltools-node-app-$BRANCH_NAME"
PHP_BUILD_NAME="docker-mtltools-php-api-$BRANCH_NAME"

SSH_USER=""
SSH_HOST=""
SSH_REMOTE_DIRECTORY_BASE="mtltools"
SSH_CREDENTIALS="./ssh_key"