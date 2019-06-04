export const get = async ctx => {
  try {
    ctx.body = await ctx.db
      .collection("packages")
      .findOne({ id: ctx.params.package });
  } catch (err) {
    ctx.throw(500, err);
  }
};
