import { Router } from 'express'

import profissionais from './profissionais'
import cliente from './clientes'
import agendamento from './agendamentos'
import procedure from './procedimentos'

const router = Router()
const api = Router()

api.use('/profissionais', profissionais)
api.use('/clientes', cliente)
api.use('/agendamentos', agendamento)
api.use('/procedimentos', procedure)

router.use('/v1', api)

export default router
