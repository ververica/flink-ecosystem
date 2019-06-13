import checkGithub from "server/middleware/checkGithub";

export const post = [
  checkGithub(),
  async ctx => {
    const { package_id, text } = ctx.request.body;
    try {
      await ctx.db("comment").insert({
        package_id,
        text,
        added: ctx.db.raw("NOW()"),
        user_id: ctx.state.user.id,
      });
      ctx.body = {};
    } catch (e) {
      ctx.throw(500, e);
    }
  },
];
