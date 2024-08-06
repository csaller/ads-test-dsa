import { Router } from 'express'

import Procedures from 'controllers/proceduresController'
import { roleMiddleware } from 'middlewares/role-middleware'

const router = Router()

router.post('/', roleMiddleware, Procedures.create)
router.get('/:id', roleMiddleware, Procedures.get)
router.get('/', roleMiddleware, Procedures.getAll)
router.patch('/', roleMiddleware, Procedures.update)
router.delete('/', roleMiddleware, Procedures.remove)

export default router
