export default async function errorHandler(ctx, next) {
  return next().catch(err => {
    const { statusCode, message, id } = err;

    ctx.type = "json";
    ctx.status = statusCode || 500;
    ctx.body = {
      id,
      message,
      status: "error",
    };

    ctx.app.emit("error", err, ctx);
  });
}
