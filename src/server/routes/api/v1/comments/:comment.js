import checkUser from "server/middleware/checkUser";

const mailTemplate = (text, origin, slug, id) => `
New Text:
------
${text}
------

View this comment: ${origin}/packages/${slug}#comment-${id}
`;

exports.delete = [
  checkUser(),
  async ctx => {
    const id = ctx.params.comment;
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
    const { text, packageSlug, packageName } = ctx.request.body;
    const user_id = ctx.state.user.id;

    await ctx
      .db("comment")
      .update({ text, updated: ctx.db.raw("now()") })
      .where({ id, user_id })
      .limit(1);

    ctx
      .sendMail(
        "comment-edited",
        `Comment on package "${packageName}" edited`,
        mailTemplate(text, ctx.request.origin, packageSlug, id)
      )
      .catch(e => {
        console.log(e);
      });

    ctx.body = { id, text };
  },
];
