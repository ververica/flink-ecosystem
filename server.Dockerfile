# The Dockerfile for building
# the backend and the frontend
#
FROM node:10
LABEL PROJECT=flink-packages
# set working directory
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Set the env to "production"
ENV NODE_ENV=production \
    NODE_PATH=src/
EXPOSE 4000
CMD ["npm", "run", "server"]