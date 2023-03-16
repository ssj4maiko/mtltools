#!/bin/bash

if [ -d "./resources/frontend" ]; then
    source .jenkins/variables.sh

    ssh -i $SSH_CREDENTIALS $SSH_USER@$SSH_HOST mkdir $SSH_REMOTE_DIRECTORY_BASE/public2
    scp -i $SSH_CREDENTIALS -r public/* $SSH_USER@$SSH_HOST:$SSH_REMOTE_DIRECTORY_BASE/public2/
    #ssh -i $SSH_CREDENTIALS $SSH_USER@$SSH_HOST rm -R $SSH_REMOTE_DIRECTORY_BASE/public
    #scp -i $SSH_CREDENTIALS -r resources/views/index.blade.php $SSH_USER@$SSH_HOST:$SSH_REMOTE_DIRECTORY_BASE/resources/views/index.blade.php
    #ssh -i $SSH_CREDENTIALS $SSH_USER@$SSH_HOST mv $SSH_REMOTE_DIRECTORY_BASE/public2 $SSH_REMOTE_DIRECTORY_BASE/public
else
    echo "You must run this script from the project's root."
    exit 0
fi
