#!/bin/bash
sudo chmod -R 777 storage/logs
sudo chmod -R 777 storage/framework/cache
sudo chmod -R 777 storage/framework/sessions
sudo chmod -R 777 storage/framework/views
mkdir storage/app/public/cache
sudo chmod -R 777 storage/app/public
