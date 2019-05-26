import Joi from "@hapi/joi";
import checkGithub from "../../../../middleware/checkGithub";

const schema = Joi.object().keys({
  name: Joi.string().required(),
  id: Joi.string()
    .regex(/[a-z-_]{2,}/)
    .required(),
  description: Joi.string().required(),
  readme: Joi.string().required(),
  website: Joi.string().required(),
  repository: Joi.string().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  license: Joi.string().required(),
});

export const get = async ctx => {
  const packages = await ctx.db
    .collection("packages")
    .find()
    .toArray();

  ctx.body = { packages };
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
