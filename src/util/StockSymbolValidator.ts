const Joi = require('joi');

const StockSymbolValidationSchema = Joi.object({
    symbol: Joi.string()
        .min(1)
        .max(5)
        .pattern(new RegExp('^[a-zA-Z]+$'))
        .messages({
            "string.pattern.base": `"Stock Symbol" can only be letters`,
            "string.empty": `"Stock Symbol" cannot be an empty field`,
            "any.required": `"Stock Symbol" is a required field`
          })
});

export default StockSymbolValidationSchema;