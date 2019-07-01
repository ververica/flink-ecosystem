# Flink Ecosystem

Ecosystem website for Apache Flink

# Design document

https://docs.google.com/document/d/12oCItoLbKrLGuwEUFcCfigezIR2hW3925j1hh3kGp4A/edit#

---

## How to run locally.

### Prerequisites

You will need a github `client_id` and `secret` to use any part of this project
that requires authentication.

### Running the dev server

- Clone the repo
- run `npm install`
- run `npm run mariadb` to start the mysql database.
  - apply the table schema to the database. The schema is located in `/src/server/database.sql`
- run the dev server
  - `GITHUB_CLIENT=<abcd> GITHUB_SECRET=<efgh> npm start`
