#!/bin/bash
echo "BUILDING DOCKER IMAGE"
docker build -t taylonr/postman ../
echo "LAUNCHING DOCKER CONTAINER"
sh ./dev.sh
sh ./database.sh