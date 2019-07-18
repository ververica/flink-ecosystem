import checkUser from "server/middleware/checkUser";
import { commentMailerTemplate } from "../../../../helpers/mailerTemplates";

exports.delete = [
  checkUser(),
  async ctx => {
    const { commentId } = ctx.params;
    const user_id = ctx.state.user.id;

    await ctx
      .db("comment")
      .update({ deleted: 1 })
      .where({ id: commentId, user_id })
      .limit(1);

    ctx.body = { commentId };
  },
];

exports.post = [
  checkUser(),
  async ctx => {
    const { commentId } = ctx.params;
    const { text, packageSlug, packageName } = ctx.request.body;

    await ctx
      .db("comment")
      .update({ text, updated: ctx.db.raw("now()") })
      .where({ id: commentId })
      .limit(1);

    ctx
      .sendMail(
        "comment-edited",
        `Edited comment on package "${packageName}"`,
        commentMailerTemplate({
          packageName,
          userName: ctx.state.user.login,
          text,
          origin: ctx.request.origin,
          packageSlug,
          commentId,
        })
      )
      .catch(e => {
        console.log(e);
      });

    ctx.body = { commentId, text };
  },
];
