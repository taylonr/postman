## Starting & Stopping containers

# To initialize the container.
This will build the docker container, start both the web server and database server and perform an initial database migration.

`sh init.sh` (development)

`sh init.test.sh` (test)

# To start the container:

`sh dev.sh` (development)

`sh test.sh` (test)

# To stop the containers:

`sh stop.dev.sh` (development)

`sh stop.test.sh` (test)

# To reset the database:

`sh database.sh` (development)

`sh database.test.sh` (test)
