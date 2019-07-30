import Joi from "@hapi/joi";
import { packageSchema } from "server/helpers/validatorSchemas";
import { parseValidatorError } from "server/helpers/parseValidatorError";

export const validatePackage = () => (ctx, next) => {
  const { body } = ctx.request;

  const validation = Joi.validate(body, packageSchema);
  if (validation.error) {
    ctx.throw(400, parseValidatorError(validation.error.message));
  }

  if (body.tags.split(",").length > 10) {
    ctx.throw(400, {
      id: "tags",
      message: '"tags" cannot have more than 10 entries.',
    });
  }

  return next();
};
