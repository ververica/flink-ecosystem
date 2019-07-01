import checkUser from "server/middleware/checkUser";

exports.delete = [
  checkUser(),
  async ctx => {
    const { id } = ctx.params;
    const { user_id } = ctx.state;

    await ctx
      .db("comment")
      .update({ deleted: 1 })
      .where({ id, user_id })
      .limit(1);

    ctx.body = { id };
  },
];

exports.post = [
  checkUser(),
  async ctx => {
    const { id } = ctx.params;
    const { text } = ctx.request.body;
    const { id: user_id } = ctx.state.user;

    console.log({ id, text, user_id });

    await ctx
      .db("comment")
      .update({ text })
      .where({ id, user_id })
      .limit(1);

    ctx.body = { id, text };
  },
];
