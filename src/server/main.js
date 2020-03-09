import Koa from "koa";
import FileRouter from "koa-file-router";
import Router from "koa-router";
import cors from "kcors";
import koaBody from "koa-body";
import knex from "knex";

import errorHandler from "./middleware/errorHandler";
import lruCache from "./middleware/lruCache";
import { mailer } from "./middleware/mailer";

const app = new Koa();
const fileRouter = new FileRouter("./src/server/routes");
const router = new Router();

// 404's for /api routes that don't exist, and the webapp for everythign else
router.get("/api/*", ctx => ctx.throw(404));

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

const dbMiddleWare = (ctx, next) => {
  ctx.db = db;
  return next();
};

const middleware = [
  cors(),
  koaBody({ multipart: true }),
  errorHandler,
  dbMiddleWare,
  mailer,
  lruCache,
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
