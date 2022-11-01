const Joi = require('joi');

const StockSymbolValidationSchema = Joi.object({
    symbol: Joi.string()
        .min(1)
        .max(5)
        .pattern(new RegExp('^[a-zA-Z]+$'))
});

export default StockSymbolValidationSchema;