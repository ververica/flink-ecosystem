# Flink Ecosystem

Ecosystem website for Apache Flink

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

- run `npm run mariadb` to start the mysql database (in docker). (use `docker stop mariadb` to stop it)

  - get the [mysql-client](https://formulae.brew.sh/formula/mysql-client). (or elsewhere if you don't have homebrew)
  - connect to mysql to create the database.

    ```
    $ mysql --host=127.0.0.1 --port=3306 --user=root --password=test
    ...
    ...
    mysql> `CREATE DATABASE `flink_ecosystem` /*!40100 DEFAULT CHARACTER SET utf8mb4 */
    ```

  - disconnect and apply the table schema to the database. The schema is located in `/src/server/database.sql`
    ```
    $ mysql --host=127.0.0.1 --port=3306 --user=root --password=test --database flink_ecosystem < src/server/database.sql
    ```
  - this command is set to persist the data to `/tmp/maria-data` if you need to remove it for any reason.

- run `npm install` to install all the JS dependencies.
- run the dev server
  ```
  GITHUB_CLIENT=<abcd> GITHUB_SECRET=<efgh> npm start
  ```
