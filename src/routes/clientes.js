import { Router } from 'express'

import Client from 'controllers/clientsController'
import { roleMiddleware } from 'middlewares/role-middleware'

const router = Router()

router.post('/', Client.create)
router.get('/:id', Client.get)
router.get('/', Client.getAll)
router.patch('/', Client.update)
router.delete('/', roleMiddleware, Client.remove)

export default router
