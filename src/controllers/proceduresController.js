import prisma from 'database/prisma'
import {
  BadRequest,
  Deleted,
  InternalServerError,
  NotFound
} from 'helpers'


export const create = async (req, res) => {
  const { name, value, duration } = req.body
  try {
    return res.json(
      await prisma.procedure.create({
        data: {
          name,
          value,
          duration
        }
      })
    )
  } catch (error) {
    const errorMsg = error.message
    if (errorMsg.includes('Unique constraint failed')) {
      return BadRequest('Procedure already registered', res)
    }
    if (errorMsg.includes('is missing')) {
      return BadRequest('Required field not provided', res)
    }
    console.error(error)
    return InternalServerError(errorMsg, res)
  }
}

export const get = async (req, res) => {
  const { id } = req.params
  try {
    const procedure = await prisma.procedure.findUnique({
      where: { id }
    })
    if (!procedure) throw new Error('procedure not found')
    return res.json(procedure)
  } catch (error) {
    const errorMsg = error.message
    if (errorMsg.includes('procedure not found')) {
      return NotFound('Procedure not found', res)
    }
    console.error(error)
    return InternalServerError(errorMsg, res)
  }
}

export const getAll = async (req, res) => {
  const { id } = req.params
  try {
    const procedure = await prisma.procedure.findMany({
      select: {
        id: true,
        name: true,
        value: true,
        duration: true
      }
    })
    if (!procedure) throw new Error('procedure not found')
    return res.json(procedure)
  } catch (error) {
    const errorMsg = error.message
    if (errorMsg.includes('procedure not found')) {
      return NotFound('Procedure not found', res)
    }
    console.error(error)
    return InternalServerError(errorMsg, res)
  }
}

export const update = async (req, res) => {
  const { id } = req.query
  const { name, value, duration } = req.body
  try {
    return res.json(
      await prisma.procedure.update({
        where: { id: id },
        data: {
          name,
          value,
          duration
        }
      })
    )
  } catch (error) {
    const errorMsg = error.message
    if (errorMsg.includes('Record to update not found')) {
      return NotFound('Procedure not found', res)
    }
    console.error(error)
    return InternalServerError(errorMsg, res)
  }
}

export const remove = async (req, res) => {
  const { id } = req.query
  try {
    const procedure = await prisma.procedure.delete({
      where: { id }
    })
    if (!procedure) throw new Error('procedure not found')
    return Deleted('Successfully deleted', res)
  } catch (error) {
    const errorMsg = error.message
    if (errorMsg.includes('Record to delete does not exist')) {
      return NotFound('Procedure not found', res)
    }
    if (errorMsg.includes('procedure not found')) {
      return NotFound('Procedure not found', res)
    }
    console.error(error)
    return InternalServerError(errorMsg, res)
  }
}

export default {
  create,
  get,
  getAll,
  update,
  remove
}
