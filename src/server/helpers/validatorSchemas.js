import Joi from "@hapi/joi";

const packageSlug = Joi.string()
  .regex(/^[a-z0-9-_]{2,}$/)
  .required();

const requiredString = Joi.string().required();
const optionalString = Joi.string()
  .allow("")
  .optional();

export const commentSchema = Joi.object().keys({
  text: requiredString,
  packageSlug,
});

export const packageSchema = Joi.object().keys({
  name: requiredString,
  slug: packageSlug,
  description: requiredString,
  readme: requiredString,
  website: optionalString,
  repository: requiredString,
  license: requiredString,
  category: requiredString,
  tags: optionalString,
  image_id: Joi.number()
    .allow(0)
    .optional(),
});
