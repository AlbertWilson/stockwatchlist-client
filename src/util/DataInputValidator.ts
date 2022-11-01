const Joi = require('joi');

const UserInputValidationSchema = Joi.object({
    firstname: Joi.string()
        .alphanum()
        .min(3)
        .max(30),

    lastname: Joi.string()
        .alphanum()
        .min(3)
        .max(30),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
});

export default UserInputValidationSchema;