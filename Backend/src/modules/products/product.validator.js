import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().required(),

  description: Joi.string().allow(""),

  price: Joi.number().required(),

  categoryId: Joi.string().required(),
});
