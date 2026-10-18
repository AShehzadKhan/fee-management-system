import Joi from "joi";

const studentSchema = Joi.object({
  name: Joi.string().trim().min(4).max(30).required(),

  email: Joi.string().trim().email().required(),

  password: Joi.string().min(6).required(),

  phone: Joi.string().pattern(/^03\d{9}$/).trim().required(),

  dateOfBirth: Joi.date().required(),

  address: Joi.string().trim().required(),

  rollNo: Joi.string().trim().required(),

  department: Joi.string().required(),

  program: Joi.string().required(),

  semester: Joi.string().required(),

  session: Joi.string().required(),
});

export default studentSchema;
