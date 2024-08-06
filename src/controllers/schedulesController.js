import prisma from 'database/prisma'
import {
  BadRequest,
  Deleted,
  InternalServerError,
  NotFound
} from 'helpers'

export const create = async (req, res) => {
  const { userId, clientId, procedures, date } = req.body

  let scheduleDate = new Date(date)
  scheduleDate.toString() === 'Invalid Date'
    ? scheduleDate = undefined
    : scheduleDate

  try {
    return res.json(
      await prisma.schedule.create({
        data: {
          date: scheduleDate,
          user: {
            connect: {
              id: userId
            }
          },
          client: {
            connect: {
              id: clientId
            }
          },
          procedures: {
            connect:
              procedures.map(proc => ({ id: proc }))
          }
        }
      })
    )
  } catch (error) {
    const errorMsg = error.message
    if (errorMsg.includes('Unique constraint failed')) {
      return BadRequest('Schedule already registered', res)
    }
    if (errorMsg.includes('records to be connected, found only')) {
      return BadRequest('Required field not provided or wrong', res)
    }
    console.error(error)
    return InternalServerError(errorMsg, res)
  }
}

export const getByClient = async (req, res) => {
  const { id } = req.query

  try {
    const schedule = await prisma.schedule.findMany({
      where: {
        client: {
          some: {
            id
          }
        }
      },
      select: {
        id: true,
        date: true,
        procedures: {
          select: {
            id: true,
            name: true,
            value: true,
            duration: true
          }
        }
      }
    })
    if (!schedule.length) throw new Error('schedule not found')
    return res.json(schedule)
  } catch (error) {
    const errorMsg = error.message
    if (errorMsg.includes('schedule not found')) {
      return NotFound('Schedule not found', res)
    }
    console.error(error)
    return InternalServerError(errorMsg, res)
  }
}

export const getByProcedure = async (req, res) => {
  const { id } = req.params

  try {
    const schedule = await prisma.schedule.findUnique({
      where: { id },
      select: {
        id: true,
        date: true,
        procedures: {
          select: {
            id: true,
            name: true,
            value: true,
            duration: true
          }
        }
      }
    })
    if (!schedule) throw new Error('schedule not found')
    return res.json(schedule)
  } catch (error) {
    const errorMsg = error.message
    if (errorMsg.includes('schedule not found')) {
      return NotFound('Schedule not found', res)
    }
    console.error(error)
    return InternalServerError(errorMsg, res)
  }
}

export const getByRange = async (req, res) => {
  const { startDate, endDate } = req.query

  const startDateT = new Date(startDate)
  const endDateT = new Date(`${endDate} 23:00`)

  try {
    const schedule = await prisma.schedule.findMany({
      where: {
        date: {
          gte: startDateT,
          lt: endDateT
        }
      },
      select: {
        id: true,
        date: true,
        procedures: {
          select: {
            id: true,
            name: true,
            value: true,
            duration: true
          }
        }
      }
    })
    if (!schedule.length) throw new Error('schedule not found')
    return res.json(schedule)
  } catch (error) {
    const errorMsg = error.message
    if (errorMsg.includes('schedule not found')) {
      return NotFound('No schedules found on this time range.', res)
    }
    console.error(error)
    return InternalServerError(errorMsg, res)
  }
}

export const update = async (req, res) => {
  const { id } = req.query
  const { procedures, date } = req.body
  let scheduleDate = new Date(date)
  scheduleDate.toString() === 'Invalid Date'
    ? scheduleDate = undefined
    : scheduleDate

  try {
    return res.json(
      await prisma.schedule.update({
        where: { id },
        data: {
          date: scheduleDate,
          procedures: {
            connect:
              procedures?.map(proc => ({ id: proc }))
          }
        }
      })
    )
  } catch (error) {
    const errorMsg = error.message
    if (errorMsg.includes('Record to update not found')) {
      return NotFound('Schedule not found', res)
    }
    console.error(error)
    return InternalServerError(errorMsg, res)
  }
}

export const remove = async (req, res) => {
  const { id } = req.query
  try {
    const schedule = await prisma.schedule.delete({
      where: { id }
    })
    if (!schedule) throw new Error('schedule not found')
    return Deleted('Successfully deleted', res)
  } catch (error) {
    const errorMsg = error.message
    if (errorMsg.includes('Record to delete does not exist')) {
      return NotFound('Schedule not found', res)
    }
    if (errorMsg.includes('schedule not found')) {
      return NotFound('Schedule not found', res)
    }
    console.error(error)
    return InternalServerError(errorMsg, res)
  }

}

export default {
  create,
  getByClient,
  getByProcedure,
  getByRange,
  update,
  remove
}
