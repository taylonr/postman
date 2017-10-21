#!/bin/bash
ENV=test DB_PORT=5433 WEB_PORT=3030 docker-compose -p test up -d
echo "****************************"
echo "* API Running on port 3030 *"
echo "****************************"