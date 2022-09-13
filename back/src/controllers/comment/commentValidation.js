import Joi from "joi";

const commentValidation = Joi.object({
    comment: Joi.string().required(),
});

export default commentValidation;