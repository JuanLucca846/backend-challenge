import Joi from "joi";

enum Sex {
  Male = "Male",
  Female = "Female",
}

export const createClientSchema = Joi.object({
  name: Joi.string().required(),
  dob: Joi.date().required(),
  sex: Joi.string()
    .valid(...Object.values(Sex))
    .required(),
  healthProblem: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      degree: Joi.number().required(),
    })
  ),
});
