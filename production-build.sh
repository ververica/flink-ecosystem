#!/bin/sh

echo "Running docker-compose for building and launching the backend server"
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

echo "Building frontend"
npm install
npm run build

echo "Moving build results to nginx"
cp build/ /var/www/html