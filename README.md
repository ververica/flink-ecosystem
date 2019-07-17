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

To create a github app, to go Github -> Settings -> Developer Settings -> OAuth Apps

You will also need docker to run the project.

### Running the dev server

- Clone the repo
- Run `npm install`
- Run `docker-compose up -d`
  This will create the database, populate it with some dummy data, and start the local server on port 3000.

- Copy `.env.example` to `.env` and replace the values with your own `client_id` and `secret` from your github developer settings.
