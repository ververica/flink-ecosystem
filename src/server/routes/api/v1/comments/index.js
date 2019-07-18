import checkUser from "server/middleware/checkUser";
import { commentMailerTemplate } from "../../../../helpers/mailerTemplates";

exports.post = [
  checkUser(),
  async ctx => {
    const {
      packageId,
      packageName,
      packageSlug,
      text,
      userName,
    } = ctx.request.body;

    try {
      const [commentId] = await ctx.db("comment").insert({
        package_id: packageId,
        text,
        user_id: ctx.state.user.id,
        added: ctx.db.raw("now()"),
        updated: ctx.db.raw("now()"),
      });

      const comment = await ctx
        .db("comment")
        .select("*")
        .where({ id: commentId })
        .first();

      ctx
        .sendMail(
          "comment-created",
          `New comment on package "${packageName}"`,
          commentMailerTemplate({
            packageName,
            userName,
            text,
            origin: ctx.request.origin,
            packageSlug,
            commentId,
          })
        )
        .catch(e => {
          console.log(e);
        });

      ctx.status = 201;
      ctx.body = comment;
    } catch (e) {
      ctx.throw(500, e);
    }
  },
];
