import checkUser from "server/middleware/checkUser";
import { selectVotes, joinVotes } from "server/helpers/votes";
import { omit } from "lodash/fp";
import { packageMailerTemplate } from "server/helpers/mailerTemplates";
import { validatePackage } from "server/middleware/validatePackage";

exports.get = [
  checkUser({ required: false }),
  async ctx => {
    const slug = ctx.params.packageSlug;
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
        "package.image_id",
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
        "package.name",
        "package.slug",
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
  validatePackage(),
  async ctx => {
    const data = omit(["slug"], ctx.request.body);
    const result = await ctx
      .db("package")
      .update({ ...data, updated: ctx.db.raw("now()") })
      .where({ slug })
      .limit(1);

    ctx
      .sendMail(
        "package-edited",
        `Edited package: "${data.name}"`,
        packageMailerTemplate({
          ...data,
          slug,
          origin: ctx.request.origin,
          userName: ctx.state.user.name,
        })
      )
      .catch(e => {
        console.log(e);
      });

    ctx.status = 200;
    ctx.body = { result };
  },
];

exports.delete = [
  checkUser(),
  async ctx => {
    const result = await ctx
      .db("package")
      .update({ deleted: 1 })
      .where({ slug: ctx.params.packageSlug })
      .limit(1);

    ctx.body = { result };
  },
];
