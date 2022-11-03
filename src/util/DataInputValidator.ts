const Joi = require('joi');

const UserInputValidationSchema = Joi.object({
    firstname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .messages({
            "string.base": `"First Name" should be a type of 'text'`,
            "string.empty": `"First Name" cannot be an empty field`,
            "string.min": `"First Name" should have a minimum length of {#limit}`,
            "string.max": `"First Name" should have a maximum length of {#limit}`,
            "any.required": `"First Name" is a required field`
          }),

    lastname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .messages({
            "string.base": `"Last Name" should be a type of 'text'`,
            "string.empty": `"Last Name" cannot be an empty field`,
            "string.min": `"Last Name" should have a minimum length of {#limit}`,
            "string.max": `"Last Name" should have a maximum length of {#limit}`,
            "any.required": `"Last Name" is a required field`
          }),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9!@#$%&*.]{3,30}$'))
        .required()
        .messages({
            "string.pattern.base": `"Password" must be a min of 3, max of 30, consisting of only letters, numbers, and these characters @$!%*#?&`,
            "string.empty": `"Password" cannot be an empty field`,
            "any.required": `"Password" is a required field`
          }),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            "string.email.base": `"Email" must be valid ending in com or net`,
            "string.empty": `"Email" cannot be an empty field`,
            "any.required": `"Email" is a required field`
          })
});

export default UserInputValidationSchema;