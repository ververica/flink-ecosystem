import checkUser from "server/middleware/checkUser";

exports.post = [
  checkUser(),
  async ctx => {
    const { package_id, text } = ctx.request.body;
    try {
      const [id] = await ctx.db("comment").insert({
        package_id,
        text,
        added: ctx.db.raw("NOW()"),
        user_id: ctx.state.user.id,
      });

      const comment = await ctx
        .db("comment")
        .select("*")
        .where({ id })
        .first();

      ctx.status = 201;
      ctx.body = comment;
    } catch (e) {
      ctx.throw(500, e);
    }
  },
];
