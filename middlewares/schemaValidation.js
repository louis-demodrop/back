const Joi = require('@hapi/joi')

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = schema.validate(req.body)
      if (result.error) {
        return res.status(400).json(result.error)
      }

      if (!req.value)
        req.value = {}
      req.value['body'] = result.value
      next()
    }
  },

  schemas: {
    register: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
      password_repeat: Joi.string().valid(Joi.ref('password')).required()
    }),
    login: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
  }
}