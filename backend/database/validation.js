import Joi from 'joi';

const patientSchema = Joi.object({
    name: Joi.string().min(1).required(),
    address: Joi.string().min(10).required().messages({
        'string.pattern.base': 'the address should be at least 10 character.'
    }),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().pattern(/^\+\d{10,}$/).messages({
        'string.pattern.base': 'The phone number must start with a + and be followed by at least 10 digits.'
    }),
    password: Joi.string()
        .min(8)
        .max(15)
        .pattern(/(?=.*[a-z])/)
        .pattern(/(?=.*[A-Z])/)
        .pattern(/(?=.*\d)/)
        .required().messages({
            'string.pattern.base': 'The password must contain one upper character, one lower character and a number. Max length 15 and min length 8'
        }),
    photo: Joi.string().required()
});

export default patientSchema;