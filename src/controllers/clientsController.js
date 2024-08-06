import prisma from 'database/prisma'
import {
  BadRequest,
  Deleted,
  InternalServerError,
  NotFound
} from 'helpers'

export const create = async (req, res) => {
  const { firstName, surname, nickname, email, cpf, birthDate, phone, address } = req.body

  let parsedBirthdate = new Date(birthDate)
  parsedBirthdate.toString() === 'Invalid Date'
    ? parsedBirthdate = undefined
    : parsedBirthdate

  try {
    return res.json(
      await prisma.client.create({
        data: {
          firstName,
          surname,
          nickname,
          email,
          cpf,
          birthDate: parsedBirthdate,
          phone,
          address
        }
      })
    )
  } catch (error) {
    const errorMsg = error.message
    if (errorMsg.includes('Unique constraint failed')) {
      return BadRequest('User already registered', res)
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
    const client = await prisma.client.findUnique({
      where: { id }
    })
    if (!client) throw new Error('client not found')
    return res.json(client)
  } catch (error) {
    const errorMsg = error.message
    if (errorMsg.includes('client not found')) {
      return NotFound('Client not found', res)
    }
    console.error(error)
    return InternalServerError(errorMsg, res)
  }
}

export const getAll = async (req, res) => {
  const { id } = req.params
  try {
    const client = await prisma.client.findMany()
    if (!client) throw new Error('client not found')
    return res.json(client)
  } catch (error) {
    const errorMsg = error.message
    if (errorMsg.includes('client not found')) {
      return NotFound('Client not found', res)
    }
    console.error(error)
    return InternalServerError(errorMsg, res)
  }
}

export const update = async (req, res) => {
  const { id } = req.query
  const { firstName, surname, nickname, email, cpf, birthDate, phone, address } = req.body

  let parsedBirthdate = new Date(birthDate)
  parsedBirthdate.toString() === 'Invalid Date'
    ? parsedBirthdate = undefined
    : parsedBirthdate


  try {
    return res.json(
      await prisma.client.update({
        where: { id: id },
        data: {
          firstName,
          surname,
          nickname,
          email,
          cpf,
          birthDate: parsedBirthdate,
          phone,
          address
        }
      })
    )
  } catch (error) {
    const errorMsg = error.message
    if (errorMsg.includes('Record to update not found')) {
      return NotFound('Client not found', res)
    }
    console.error(error)
    return InternalServerError(errorMsg, res)
  }
}

export const remove = async (req, res) => {
  const { id } = req.query
  try {
    const client = await prisma.client.delete({
      where: { id }
    })
    if (!client) throw new Error('client not found')
    return Deleted('Successfully deleted', res)
  } catch (error) {
    const errorMsg = error.message
    if (errorMsg.includes('Record to delete does not exist')) {
      return NotFound('Client not found', res)
    }
    if (errorMsg.includes('client not found')) {
      return NotFound('Client not found', res)
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
