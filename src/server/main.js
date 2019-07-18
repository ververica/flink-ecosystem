import Koa from "koa";
import FileRouter from "koa-file-router";
import Router from "koa-router";
import serve from "koa-static";
import cors from "kcors";
import koaBody from "koa-body";
import knex from "knex";

import path from "path";
import fs from "fs";

import errorHandler from "./middleware/errorHandler";
import lruCache from "./middleware/lruCache";
import { mailer } from "./middleware/mailer";

const app = new Koa();
const fileRouter = new FileRouter("./src/server/routes");
const router = new Router();

// For devel, we serve the index file out of /public/index.html.  This fill
// will not load the app, or do anything useful, it will just spit out a blank
// page.  But in devel, we actually load the app from the webpack-dev-server, so
// there is no need for this file to do anything.
const indexFilePath =
  process.env.NODE_ENV === "production"
    ? "./build/index.html"
    : "./public/index.html";

const indexFile = fs.readFileSync(path.resolve(indexFilePath), {
  encoding: "utf8",
});

// 404's for /api routes that don't exist, and the webapp for everythign else
router.get("/api/*", ctx => ctx.throw(404));
router.get("*", ctx => (ctx.body = indexFile));

const db = knex({
  client: "mysql",
  pool: { min: 0 },
  connection: {
    host: process.env.MYSQL_HOST || "127.0.0.1",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "test",
    database: process.env.MYSQL_DATABASE || "flink_ecosystem",
  },
});

const middleware = [
  cors(),
  koaBody({ multipart: true }),
  errorHandler,
  (ctx, next) => {
    ctx.db = db;
    return next();
  },
  mailer,
  lruCache,
  serve("./build"),
  fileRouter.routes(),
  router.routes(),
];

middleware.map(mw => app.use(mw));

app.proxy = true;
app.listen(4000);
console.log("server listening on port 4000");

process.on("SIGTERM", () => {
  console.log("Bye bye!");
  db.destroy();
  process.exit();
});
