#!/bin/bash
sudo chown ssj4maiko -R ./
CURRENT_UID=$(id -u):$(id -g) docker-compose up -d
docker-compose logs -f --tail=30