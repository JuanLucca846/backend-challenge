import Joi from "joi";

enum Sex {
  Male = "Male",
  Female = "Female",
}

export const updateClientSchema = Joi.object({
  name: Joi.string().optional(),
  dob: Joi.date().optional(),
  sex: Joi.optional()
    .valid(...Object.values(Sex))
    .optional(),
  healthProblem: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      degree: Joi.number().required(),
    })
  ),
});
