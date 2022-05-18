#!/bin/bash
cd resources/frontend/
sh build2php.sh

git add ./public/ ./resources/views/
