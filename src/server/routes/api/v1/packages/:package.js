import Joi from "@hapi/joi";
import { packageSchema } from "server/routes/api/v1/packages";
import checkUser from "server/middleware/checkUser";

exports.get = [
  checkUser({ required: false }),
  async (ctx, next) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return next();
  },

  async ctx => {
    const slug = ctx.params.package;
    const deleted = 0;

    try {
      const pkg = await ctx
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
          ctx.db.raw("ifnull(vote.vote, 0) as vote"),
          ctx.db.raw("count(distinct upvote.id) as upvotes"),
          ctx.db.raw("count(distinct downvote.id) as downvotes")
        )
        .leftJoin("user", "package.user_id", "user.id")
        .leftJoin("vote", join => {
          join
            .on("package.id", "vote.package_id")
            .on("vote.user_id", ctx.state.user.id);
        })
        .leftJoin("vote as upvote", join => {
          join.on("package.id", "upvote.package_id").on("upvote.vote", 1);
        })
        .leftJoin("vote as downvote", join => {
          join.on("package.id", "downvote.package_id").on("downvote.vote", -1);
        })
        .where({ slug, deleted })
        .first();

      const comments = await ctx
        .db("package")
        .select(
          "comment.added",
          "comment.text",
          "comment.id",
          "user.id as user_id",
          "user.avatar_url",
          "user.login"
        )
        .where({ slug, deleted })
        .join("comment", "comment.package_id", "package.id")
        .leftJoin("user", "comment.user_id", "user.id");

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
    ctx.body = result;
  },
];

exports.delete = [
  checkUser(),
  async ctx => {
    //do stuff
    ctx.body = {};
  },
];
