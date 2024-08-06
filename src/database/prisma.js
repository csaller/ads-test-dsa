import { PrismaClient } from '@prisma/client'
import { NotFound } from 'helpers'

const prisma = new PrismaClient()

export default prisma
