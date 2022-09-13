import Joi from 'joi';

const Schema = Joi.object({
  name: Joi.string().max(30),
  surname: Joi.string().max(30),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

export default Schema;
