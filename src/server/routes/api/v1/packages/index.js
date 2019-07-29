import Joi from "@hapi/joi";
import checkUser from "server/middleware/checkUser";
import { selectVotes, joinVotes } from "server/helpers/votes";
import { packageMailerTemplate } from "server/helpers/mailerTemplates";
import { parseValidatorError } from "server/helpers/parseValidatorError";
import { packageSchema } from "server/helpers/validatorSchemas";

const addCategory = (query, category) =>
  query.andWhere(whereCtx => {
    whereCtx.where({ category }).orWhereRaw(`find_in_set('${category}', tags)`);
  });

exports.get = [
  checkUser({ required: false }),
  async ctx => {
    const { category, page = 1 } = ctx.request.query;

    // pagination
    const limit = 15;
    const offset = (page - 1) * limit;

    const packagesQuery = ctx
      .db("package")
      .select(
        "package.id",
        "package.name",
        "package.slug",
        "package.description",
        "package.updated",
        "package.image_id",
        ctx.db.raw("count(distinct comment.id) as comments"),
        ...selectVotes(ctx)
      )
      .leftJoin("comment", join =>
        join.on("package.id", "comment.package_id").on("comment.deleted", 0)
      )
      .where({ "package.deleted": 0 })
      .groupBy("package.id")
      .limit(limit)
      .offset(offset)
      .orderBy("package.added", "desc");

    const finalPackagesQuery = joinVotes(packagesQuery, ctx.state.user.id);

    const countQuery = ctx
      .db("package")
      .where({ deleted: 0 })
      .count("* as count")
      .first();

    if (category) {
      addCategory(finalPackagesQuery, category);
      addCategory(countQuery, category);
    }

    const [packages, { count }] = await Promise.all([
      finalPackagesQuery,
      countQuery,
    ]);

    // + 1 pecause pages are 1 indexed, not 0 indexed.
    const totalPages = ((count / limit) | 0) + 1;
    ctx.body = { packages, count, totalPages };
  },
];

exports.post = [
  checkUser(),
  async ctx => {
    const { body } = ctx.request;
    const validation = Joi.validate(body, packageSchema);
    if (validation.error) {
      ctx.throw(400, parseValidatorError(validation.error.message));
    }

    try {
      const result = await ctx.db("package").insert({
        ...body,
        user_id: ctx.state.user.id,
        added: ctx.db.raw("now()"),
        updated: ctx.db.raw("now()"),
      });

      ctx
        .sendMail(
          "package-created",
          `New package created: "${body.name}"`,
          packageMailerTemplate({
            ...body,
            origin: ctx.request.origin,
            userName: ctx.state.user.login,
          })
        )
        .catch(e => {
          console.log(e);
        });

      ctx.body = { result };
    } catch (e) {
      switch (e.code) {
        case "ER_DUP_ENTRY":
          return ctx.throw(400, {
            id: "slug",
            message: `the package id "${ctx.request.body.slug}" is already in use`,
          });
        default:
          return ctx.throw(500, { message: "an unknown error has occured" });
      }
    }
  },
];
