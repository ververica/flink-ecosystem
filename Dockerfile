FROM node:10 AS base
RUN mkdir /home/node/app
WORKDIR /home/node/app

FROM base AS build
COPY . .
RUN npm install
RUN npm run build

FROM base
ENV NODE_ENV=production \
    NODE_PATH=src/
COPY --from=build /home/node/app/*.json ./
RUN npm install
COPY --from=build /home/node/app/build ./build
COPY --from=build /home/node/app/src ./src
EXPOSE 3000
CMD ["npm", "run", "server"]
