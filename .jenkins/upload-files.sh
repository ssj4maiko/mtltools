#!/bin/bash

if [ -d "./resources/frontend" ]; then
    source .jenkins/variables.sh

    chmod 400 $SSH_CREDENTIALS

    echo "Create public2 folder"
    ssh -i $SSH_CREDENTIALS $SSH_USER@$SSH_HOST mkdir $SSH_REMOTE_DIRECTORY_BASE/public2
    echo "ssh -i $SSH_CREDENTIALS $SSH_USER@$SSH_HOST mkdir $SSH_REMOTE_DIRECTORY_BASE/public2" | base64

    echo "Upload everything from public to remote server"
    scp -i $SSH_CREDENTIALS -r public/* $SSH_USER@$SSH_HOST:$SSH_REMOTE_DIRECTORY_BASE/public2/
    echo "scp -i $SSH_CREDENTIALS -r public/* $SSH_USER@$SSH_HOST:$SSH_REMOTE_DIRECTORY_BASE/public2/" | base64

    #echo "Remove original public folder"
    #ssh -i $SSH_CREDENTIALS $SSH_USER@$SSH_HOST rm -R $SSH_REMOTE_DIRECTORY_BASE/public

    #echo "Upload new home for updated scripts"
    #scp -i $SSH_CREDENTIALS -r resources/views/index.blade.php $SSH_USER@$SSH_HOST:$SSH_REMOTE_DIRECTORY_BASE/resources/views/index.blade.php

    #echo "Rename `public2` to `public`"
    #ssh -i $SSH_CREDENTIALS $SSH_USER@$SSH_HOST mv $SSH_REMOTE_DIRECTORY_BASE/public2 $SSH_REMOTE_DIRECTORY_BASE/public
else
    echo "You must run this script from the project's root."
    exit 0
fi
