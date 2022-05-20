#!/bin/bash
cd resources/frontend/
sh build2php-production.sh

git add ./public/ ./resources/views/
