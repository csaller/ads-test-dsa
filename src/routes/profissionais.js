import { Router } from 'express'

import User from 'controllers/usersController'
import { roleMiddleware, validationMiddleware } from 'middlewares'

const router = Router()

router.post('/signup', validationMiddleware, roleMiddleware, User.create)
router.get('/:id', roleMiddleware, User.get)
router.get('/', roleMiddleware, User.getAll)
router.get('/payment/:id', roleMiddleware, User.getPayment)
router.patch('/', roleMiddleware, User.update)
router.delete('/', roleMiddleware, User.remove)

router.post('/login', User.login)

export default router
