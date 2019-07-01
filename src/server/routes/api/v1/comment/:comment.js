import checkUser from "server/middleware/checkUser";

exports.delete = [
  checkUser(),
  async ctx => {
    const { id } = ctx.params;
    const user_id = ctx.state.user.id;

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
    const id = ctx.params.comment;
    const { text } = ctx.request.body;
    const user_id = ctx.state.user.id;

    console.log({ id, text, user_id });

    await ctx
      .db("comment")
      .update({ text, updated: ctx.db.raw("now()") })
      .where({ id, user_id })
      .limit(1);

    ctx.body = { id, text };
  },
];
