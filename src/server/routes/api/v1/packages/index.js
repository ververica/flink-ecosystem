import Joi from "@hapi/joi";

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

export const get = [
  checkGithub({ required: false }),
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
        ctx.db.raw("ifnull(vote.vote, 0) as vote"),
        ctx.db.raw("count(distinct upvote.id) as upvotes"),
        ctx.db.raw("count(distinct downvote.id) as downvotes")
      )
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
      .groupBy("package.id")
      .limit(limit)
      .offset(offset);

    const countQuery = ctx
      .db("package")
      .count("* as count")
      .first();

    if (category) {
      packagesQuery.where({ category });
      countQuery.where({ category });
    }

    console.log("packages query: ", packagesQuery.toString());

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
      user_id: ctx.state.user.id,
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
