import Joi from "@hapi/joi";

const schema = Joi.object().keys({
  id: Joi.string()
    .regex(/[a-z-_]{2,}/)
    .required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  readme: Joi.string().required(),
  website: Joi.string().required(),
  repository: Joi.string().required(),
  license: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
});

export const get = async ctx => {
  const packages = await ctx.db
    .collection("packages")
    .find()
    .toArray();

  ctx.body = { packages };
};

export const post = async ctx => {
  const validation = Joi.validate(ctx.request.body, schema);
  if (validation.error) ctx.throw(400);

  const packageData = {
    ...ctx.request.body,
    commentsCount: 0,
    upvotes: 0,
    downvotes: 0,
    added: Date.now(),
    updated: Date.now(),
  };

  const result = await ctx.db.collection("packages").insertOne(packageData);

  ctx.body = { result: result.ops[0] };
};
