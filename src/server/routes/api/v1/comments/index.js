import checkUser from "server/middleware/checkUser";

exports.post = [
  checkUser(),
  async ctx => {
    const { package_id, text } = ctx.request.body;

    try {
      const [id] = await ctx.db("comment").insert({
        package_id,
        text,
        user_id: ctx.state.user.id,
        added: ctx.db.raw("now()"),
        updated: ctx.db.raw("now()"),
      });

      const comment = await ctx
        .db("comment")
        .select("*")
        .where({ id })
        .first();

      ctx.sendMail("comment created", text).catch(e => {
        console.log(e);
      });

      ctx.status = 201;
      ctx.body = comment;
    } catch (e) {
      ctx.throw(500, e);
    }
  },
];
