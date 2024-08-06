import jwt from 'jsonwebtoken'

import { ACCESS_SECRET } from "config"
import { Unauthorized, InternalServerError } from 'helpers'

export const roleMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(" ")[1]
  try {
  const decryptedToken = jwt.verify(token, ACCESS_SECRET)
  if (decryptedToken.isAdmin) return next()
  throw Unauthorized('You don\'t have permission to access this resource')
  } catch (error) {
    console.error(error)
    return InternalServerError(error.message)
  }
}
