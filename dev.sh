#!/bin/bash
ENV=dev DB_PORT=5434 WEB_PORT=3000 docker-compose -p dev up -d
echo "****************************"
echo "* API Running on port 3000 *"
echo "****************************"