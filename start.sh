#!/bin/bash
CURRENT_UID=$(id -u):$(id -g) docker-compose up -d
docker-compose logs -f --tail=30
