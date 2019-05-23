import Koa from "koa";
import FileRouter from "koa-file-router";
import Router from "koa-router";
import serve from "koa-static";
import cors from "kcors";
import bodyParser from "koa-bodyparser";

import path from "path";
import fs from "fs";

const app = new Koa();
const fileRouter = new FileRouter("./src/server/routes");
const router = new Router();

const indexFile = fs.readFileSync(path.resolve("./build/index.html"), {
  encoding: "utf8"
});

router.get("*", ctx => (ctx.body = indexFile));

const middleware = [
  cors(),
  bodyParser(),
  serve("./build"),
  fileRouter.routes(),
  router.routes()
];

middleware.map(mw => app.use(mw));

app.listen(4000);
