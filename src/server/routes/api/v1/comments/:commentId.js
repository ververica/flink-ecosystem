import checkUser from "server/middleware/checkUser";
import { commentMailerTemplate } from "../../../../helpers/mailerTemplates";
import Joi from "@hapi/joi";
import { parseValidatorError } from "server/helpers/parseValidatorError";
import { commentSchema } from "server/helpers/validatorSchemas";

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

    const validation = Joi.validate({ text, packageSlug }, commentSchema);
    if (validation.error) {
      ctx.throw(400, parseValidatorError(validation.error.message));
    }

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
