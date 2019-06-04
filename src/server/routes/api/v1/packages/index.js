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

const findCategory = category => {
  if (!category) return null;
  return {
    category: {
      $regex: category.replace("-", " "),
      $options: "i",
    },
  };
};

export const get = async ctx => {
  const { category, page = 1 } = ctx.request.query;

  // pagination
  const limit = 15;
  const skip = (page - 1) * limit;

  const base = ctx.db
    .collection("packages")
    .find({ ...findCategory(category) });

  const [packages, count] = await Promise.all([
    base
      .skip(skip)
      .limit(limit)
      .toArray(),

    base.count(),
  ]);

  // + 1 pecause pages are 1 indexed, not 0 indexed.
  const totalPages = ((count / limit) | 0) + 1;

  ctx.body = { packages, count, totalPages };
};

export const post = [
  checkGithub,
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
