echo "BUILDING DOCKER IMAGE"
docker build -t taylonr/postman .
echo "LAUNCHING DOCKER CONTAINER"
call dev.bat
call database.bat