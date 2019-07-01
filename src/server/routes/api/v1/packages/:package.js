import Joi from "@hapi/joi";
import { packageSchema } from "server/routes/api/v1/packages";
import checkUser from "server/middleware/checkUser";
import { selectVotes, joinVotes } from "server/helpers/votes";

exports.get = [
  checkUser({ required: false }),
  async ctx => {
    const slug = ctx.params.package;
    const deleted = 0;

    const packageQuery = ctx
      .db("package")
      .select(
        "package.id",
        "package.slug",
        "package.name",
        "user.login as owner",
        "user.id as user_id",
        "package.description",
        "package.readme",
        "package.image",
        "package.website",
        "package.repository",
        "package.added",
        "package.updated",
        "package.license",
        "package.category",
        "package.tags",
        ...selectVotes(ctx)
      )
      .leftJoin("user", "package.user_id", "user.id")
      .where({ slug, "package.deleted": deleted })
      .first();

    const finalPackageQuery = joinVotes(packageQuery, ctx.state.user.id);

    const commentsQuery = ctx
      .db("package")
      .select(
        "comment.added",
        "comment.updated",
        "comment.text",
        "comment.id",
        "user.id as user_id",
        "user.avatar_url",
        "user.login"
      )
      .where({ slug, "package.deleted": deleted, "comment.deleted": deleted })
      .join("comment", "comment.package_id", "package.id")
      .leftJoin("user", "comment.user_id", "user.id");

    try {
      const [pkg, comments] = await Promise.all([
        finalPackageQuery,
        commentsQuery,
      ]);

      if (pkg.id === null) {
        ctx.throw(404, "package not found.");
      }

      ctx.body = {
        package: pkg,
        comments,
      };
    } catch (err) {
      ctx.throw(500, err);
    }
  },
];

exports.post = [
  checkUser(),
  async ctx => {
    const { body } = ctx.request;
    const validation = Joi.validate(body, packageSchema);
    if (validation.error) ctx.throw(400, validation.error);

    const { slug, ...rest } = body;
    const result = await ctx
      .db("package")
      .update({ ...rest, updated: ctx.db.raw("now()") })
      .where({ slug })
      .limit(1);

    ctx.status = 200;
    ctx.body = { result };
  },
];

exports.deletee = [
  checkUser(),
  async ctx => {
    const result = await ctx
      .db("package")
      .update({ deleted: 1 })
      .where({ slug: ctx.params.package })
      .limit(1);

    ctx.body = { result };
  },
];
