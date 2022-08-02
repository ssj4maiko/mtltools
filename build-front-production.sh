#!/bin/bash
cd resources/frontend/
sh build2php-production.sh
cd ../../
git add ./public/ ./resources/views/
