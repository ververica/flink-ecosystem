import Koa from "koa";
import FileRouter from "koa-file-router";
import Router from "koa-router";
import serve from "koa-static";
import cors from "kcors";
import bodyParser from "koa-bodyparser";
import knex from "koa-knex";

import path from "path";
import fs from "fs";

import errorHandler from "./middleware/errorHandler";
import lruCache from "./middleware/lruCache";

const app = new Koa();
const fileRouter = new FileRouter("./src/server/routes");
const router = new Router();

const indexFile = fs.readFileSync(path.resolve("./build/index.html"), {
  encoding: "utf8",
});

router.get("*", ctx => (ctx.body = indexFile));

const middleware = [
  cors(),
  bodyParser(),
  knex({
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "test",
      database: "flink-ecosystem",
    },
  }),
  lruCache,
  errorHandler,
  serve("./build"),
  fileRouter.routes(),
  router.routes(),
];

middleware.map(mw => app.use(mw));

app.listen(4000);
