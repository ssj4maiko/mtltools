#!/bin/bash
if [[ -z "$BRANCH_NAME" ]]; then
    BRANCH_NAME="test-local"
else
    BRANCH_NAME="${BRANCH_NAME,,}"  ## Lowercase
fi
if [[ -z "$SSH_USER" ]]; then
    SSH_USER=""
fi
if [[ -z "$SSH_HOST" ]]; then
    SSH_HOST=""
fi
if [[ -z "$SSH_REMOTE_DIRECTORY_BASE" ]]; then
    SSH_REMOTE_DIRECTORY_BASE="mtltools"
fi
if [[ -z "$SSH_CREDENTIALS" ]]; then
    SSH_CREDENTIALS="./ssh_key"
fi

NODE_BUILD_NAME="docker-mtltools-node-app-$BRANCH_NAME"
PHP_BUILD_NAME="docker-mtltools-php-api-$BRANCH_NAME"