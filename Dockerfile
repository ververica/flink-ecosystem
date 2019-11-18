FROM node:10 AS base
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY *.json ./

FROM base AS frontend
RUN npm install
COPY public ./public
COPY src/index.js ./src/index.js
COPY src/react-app-env.d.ts ./src/react-app-env.d.ts
COPY src/client ./src/client
RUN npm run build

FROM base AS backend
ENV NODE_ENV=production \
    NODE_PATH=src/
COPY --from=build /home/node/app/*.json ./
RUN npm install
COPY src/server ./src/server
COPY --from=build /home/node/app/build ./build
EXPOSE 4000
CMD ["npm", "run", "server"]
