export default async function errorHandler(ctx, next) {
  return next().catch(err => {
    const { statusCode, message } = err;

    ctx.type = "json";
    ctx.status = statusCode || 500;
    ctx.body = {
      status: "error",
      message,
    };

    ctx.app.emit("error", err, ctx);
  });
}
