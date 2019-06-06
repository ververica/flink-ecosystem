import Joi from "@hapi/joi";
import { getOr } from "lodash/fp";

import checkGithub from "../../../../middleware/checkGithub";

const schema = Joi.object().keys({
  name: Joi.string().required(),
  id: Joi.string()
    .regex(/[a-z0-9-_]{2,}/)
    .required(),
  description: Joi.string().required(),
  readme: Joi.string().required(),
  website: Joi.string().required(),
  repository: Joi.string().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  license: Joi.string().required(),
});

const getUserId = getOr(0, "state.user.id");

export const get = [
  checkGithub({ required: false }),
  async ctx => {
    const { category, page = 1 } = ctx.request.query;

    // pagination
    const limit = 15;
    const offset = (page - 1) * limit;

    const packagesQuery = ctx
      .knex("package")
      .select(
        "package.name",
        "package.slug",
        "package.description",
        "package.updated",
        ctx.knex.raw("count(distinct upvotes.id) as upvotes"),
        ctx.knex.raw("count(distinct downvotes.id) as downvotes"),
        ctx
          .knex("upvotes")
          .select(1)
          .whereRaw("upvotes.package_id = package.id")
          .where({ "upvotes.user_id": getOr(0, "state.user.id", ctx) })
          .as("upvoted"),
        ctx
          .knex("downvotes")
          .select(1)
          .whereRaw("downvotes.package_id = package.id")
          .where({ "downvotes.user_id": getOr(0, "state.user.id", ctx) })
          .as("downvoted")
      )
      .leftJoin("upvotes", "package.id", "upvotes.package_id")
      .leftJoin("downvotes", "package.id", "downvotes.package_id")
      .groupBy("package.id")
      .limit(limit)
      .offset(offset);

    const countQuery = ctx
      .knex("package")
      .count("* as count")
      .first();

    if (category) {
      packagesQuery.where({ category });
      countQuery.where({ category });
    }

    const packages = await packagesQuery;
    const { count } = await countQuery;

    // + 1 pecause pages are 1 indexed, not 0 indexed.
    const totalPages = ((count / limit) | 0) + 1;
    ctx.body = { packages, count, totalPages };
  },
];

export const post = [
  checkGithub({ required: true }),
  async ctx => {
    const validation = Joi.validate(ctx.request.body, schema);
    if (validation.error) ctx.throw(400, validation.error);

    const packageData = {
      ...ctx.request.body,
      owner: ctx.state.user.login,
      commentsCount: 0,
      upvotes: 0,
      downvotes: 0,
      added: Date.now(),
      updated: Date.now(),
    };

    const result = await ctx.db.collection("packages").insertOne(packageData);

    ctx.body = { result: result.ops[0] };
  },
];
