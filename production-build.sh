#!/bin/sh

echo "Running docker-compose for building and launching the backend server"
docker-compose build
docker-compose down
docker-compose up -d

echo "Building frontend"

export NODE_ENV=production
export NODE_PATH=src/
npm install
npm run build

echo "Moving build results to nginx"
sudo cp -r build/* /var/www/html/

