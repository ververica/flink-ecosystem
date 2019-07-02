import Joi from "@hapi/joi";

import checkUser from "server/middleware/checkUser";
import { selectVotes, joinVotes } from "server/helpers/votes";

export const packageSchema = Joi.object().keys({
  name: Joi.string().required(),
  slug: Joi.string()
    .regex(/[a-z0-9-_]{2,}/)
    .required(),
  description: Joi.string().required(),
  readme: Joi.string().required(),
  website: Joi.string().required(),
  repository: Joi.string(),
  license: Joi.string().required(),
  category: Joi.string().required(),
  tags: Joi.string(),
  image_id: Joi.number(),
});

// The error messagse from Joi are not quite a "joy" to parse. :(
const parseError = error => {
  const firstBracket = error.indexOf("[");
  const lastBracket = error.lastIndexOf("]");
  const message = error.slice(firstBracket + 1, lastBracket) || "";
  const match = message.match(/"(.*?)"/) || [];
  const id = match[1];

  return { id, message };
};

const addCategory = (query, category) =>
  query.orWhere({ category }).orWhere("tags", "like", `%${category}%`);

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
      .leftJoin("comment", "package.id", "comment.package_id")
      .where({ "package.deleted": 0 })
      .groupBy("package.id")
      .limit(limit)
      .offset(offset)
      .orderBy("package.added", "desc");

    const finalPackagesQuery = joinVotes(packagesQuery, ctx.state.user.id);

    const countQuery = ctx
      .db("package")
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
    const validation = Joi.validate(ctx.request.body, packageSchema);
    if (validation.error) ctx.throw(400, parseError(validation.error.message));

    const result = await ctx.db("package").insert({
      ...ctx.request.body,
      user_id: ctx.state.user.id,
      added: ctx.db.raw("now()"),
      updated: ctx.db.raw("now()"),
    });

    ctx.body = { result };
  },
];
