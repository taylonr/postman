echo "Stopping web server"
docker stop test_web_1
echo "Dropping & Recreating DB"
docker exec -it $(docker ps | grep test_db | awk '{ print $1 }') /bin/sh -c 'dropdb -U postgres postman_test'
docker exec -it $(docker ps | grep test_db | awk '{ print $1 }') /bin/sh -c 'createdb -U postgres postman_test'
echo "Starting web server"
docker start test_web_1
echo "Seeding database"
docker exec -it $(docker ps | grep test_web | awk '{ print $1 }') /bin/sh -c 'NODE_ENV=test npm run db:migrate'
docker exec -it $(docker ps | grep test_web | awk '{ print $1 }') /bin/sh -c 'NODE_ENV=test npm run db:seed'