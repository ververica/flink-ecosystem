import checkUser from "server/middleware/checkUser";

exports.delete = [
  checkUser(),
  async ctx => {
    const { id } = ctx.params;

    await ctx
      .db("comment")
      .update({ deleted: 1 })
      .where({ id })
      .limit(1);

    ctx.body = { id };
  },
];
