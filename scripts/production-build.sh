#!/bin/sh
#
# The script for bulding and running the
# backend and frontend parts of a website
#

# Build a new Docker image
echo "Running Docker Compose Plugin for building and launching the backend server"
docker compose -f docker-compose-prod.yml build

# Run a new container from the new image
echo "Recreating container with the backend"
docker compose -f docker-compose-prod.yml down # Down all running containers
docker compose -f docker-compose-prod.yml up -d

# Copy the frontend part from the new image
echo "Copying a build results to temporary folder"
TEMP_FOLDER=$(mktemp -d)
docker cp -a flink-packages-server:/app/build/ ${TEMP_FOLDER}/

# Move the frontend to a web server
echo "Moving the build results to Nginx root folder"
sudo cp -a ${TEMP_FOLDER}/build/* /var/www/html/
