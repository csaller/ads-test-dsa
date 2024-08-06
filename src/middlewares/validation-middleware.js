import { BadRequest, userSchema } from 'helpers'

export const validationMiddleware = (req, res, next) => {
  const mainPath = req.baseUrl.split('/')[2]
  switch (mainPath) {
    case 'clients': {
      return 'TODO'
    }
    case 'procedures': {
      return 'TODO'
    }
    case 'schedules': {
      return 'TODO'
    }
    case 'users': {
      const validation = userSchema.validate(req.body)
      if (!validation.error) {
        return next()
      }
      validationErrorSend(validation)
    }
    default: {
      return BadRequest()
    }
  }
}

const validationErrorSend = validation => {
  if (validation.error.details.length === 1) {
    return BadRequest(`Field '${validation.error.details[0].path}' is invalid or malformatted.`)
  }

  const errors = []
  validation.error.details.forEach(error => {
    errors.push(error.path)
  })
  return BadRequest(`Fields '${errors}' are invalid or malformatted.`)
}
