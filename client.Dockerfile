FROM node:10
RUN mkdir /node
WORKDIR /node
COPY *.json .env ./
RUN npm ci
COPY public ./public
COPY src/index.js ./src/index.js
COPY src/react-app-env.d.ts ./src/react-app-env.d.ts
COPY src/client ./src/client
RUN npm run build
