# Flink Ecosystem

Ecosystem website for Apache Flink

[![Build Status](https://travis-ci.com/sorahn/flink-ecosystem.svg?branch=master)](https://travis-ci.com/sorahn/flink-ecosystem)

# Design document

https://docs.google.com/document/d/12oCItoLbKrLGuwEUFcCfigezIR2hW3925j1hh3kGp4A/edit#

---

## How to run locally.

### Prerequisites

You will need a github `client_id` and `secret` to use any part of this project
that requires authentication.

You will also need docker to run mysql.

### Running the dev server

- Clone the repo

- run `npm run flink-ecosystem-db` to start the test mysql database (in docker). (use `docker stop flink-ecosystem-db` to stop it)

  this docker command is set to persist the data to `/tmp/flink-ecosystem-data` if you need to remove it for any reason.

- get the [mysql-client](https://formulae.brew.sh/formula/mysql-client). (or elsewhere if you don't have homebrew)
- connect to mysql to create the database and user.

  ```
  $ mysql --host=127.0.0.1 --port=3306 --user=root --password=<root-password>
  ...
  ...
  mysql> CREATE DATABASE `flink_ecosystem` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
  mysql> CREATE USER 'flink_ecosystem'@'%' IDENTIFIED BY '<password>';
  mysql> GRANT ALL PRIVILEGES ON `flink_ecosystem`.* TO 'flink_ecosystem'@'%';
  ```

- disconnect and apply the table schema to the database. The schema is located in `/src/server/database.sql`

  ```
  $ mysql --host=127.0.0.1 --port=3306 --user=flink_ecosystem --password --database flink_ecosystem < src/server/database.sql
  ```

- run `npm install` to install all the JS dependencies.
- run the dev server
  ```
  GITHUB_CLIENT=<abcd> GITHUB_SECRET=<efgh> npm start
  ```
