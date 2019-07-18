FROM node:10
RUN mkdir /node
WORKDIR /node
COPY *.json .env ./
RUN npm ci
