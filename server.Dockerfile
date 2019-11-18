FROM node:10
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY *.json ./

ENV NODE_ENV=production \
    NODE_PATH=src/

RUN npm ci
COPY src/server ./src/server
EXPOSE 4000
CMD ["npm", "run", "server"]