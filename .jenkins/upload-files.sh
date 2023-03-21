#!/bin/bash

if [ -d "./resources/frontend" ]; then
    source .jenkins/variables.sh

    chmod 400 $SSH_CREDENTIALS

    echo "Using GIT inside ./$SSH_REMOTE_DIRECTORY_BASE to update backend. Then create folder public_tmp"
    ssh -i $SSH_CREDENTIALS $SSH_USER@$SSH_HOST <<REMOTE_COMMANDS
        cd $SSH_REMOTE_DIRECTORY_BASE;

        git reset --hard HEAD;
        git pull;

        php composer.phar update;
        php artisan migrate --force;
        php artisan config:cache;
        php artisan route:cache;
        php artisan view:cache;
        php artisan event:cache;

        mkdir public_tmp;
REMOTE_COMMANDS

    echo "Upload all compiled files to a temporary folder on remote server"
    scp -i $SSH_CREDENTIALS -r public/* $SSH_USER@$SSH_HOST:$SSH_REMOTE_DIRECTORY_BASE/public_tmp/
    echo "scp -i $SSH_CREDENTIALS -r public/* $SSH_USER@$SSH_HOST:$SSH_REMOTE_DIRECTORY_BASE/public_tmp/" | base64

    echo "Upload new home for updated scripts"
    scp -i $SSH_CREDENTIALS -r resources/views/index.blade.php $SSH_USER@$SSH_HOST:$SSH_REMOTE_DIRECTORY_BASE/resources/views/index.blade.php

    echo "Remove original public folder content, replace with new content, remove public_tmp folder"
    ssh -i $SSH_CREDENTIALS $SSH_USER@$SSH_HOST <<REMOTE_COMMANDS
        cd $SSH_REMOTE_DIRECTORY_BASE;
        rm -R public/*;
        mv public_tmp/* public;
        rm public_tmp;
REMOTE_COMMANDS

    if [[ ! -z "$BRANCH_NAME" ]]; then
        echo "If running through Jenkins, delete copy Credentials file"
        rm $SSH_CREDENTIALS
    fi
else
    echo "You must run this script from the project's root."
    exit 0
fi
