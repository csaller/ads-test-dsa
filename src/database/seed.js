import prisma from './prisma'

import { encryptPassword } from 'helpers'

async function seed() {
  await prisma.user.createMany({
    data: [
      {
      email: 'admin@email.com',
      password: await encryptPassword('superpassword'),
      name: 'Admin',
      birthDate: '2000-01-01T12:00:00+00:00',
      phone: '53912345678',
      isAdmin: true,
      cpf: '12345678901',
      address: {
        address1: 'Rua 1',
        address2: '',
        address3: '',
        number: 10,
        cep: '12345678',
        alias: 'Casa'
      }
    },
    {
      email: 'user1@email.com',
      password: await encryptPassword('User_1_password!'),
      name: 'User 1',
      birthDate: '2000-01-01T12:00:00+00:00',
      phone: '53912345678',
      cpf: '12345678902'
    }
  ]
  })
  await prisma.client.createMany({
    data: [
      {firstName: 'Cliente', surname: '1', email: 'cliente1@email.com', phone: '53123456789'},
      {firstName: 'Cliente', surname: '2', email: 'cliente2@email.com', phone: '53123456789'},
      {firstName: 'Cliente', surname: '3', email: 'cliente3@email.com', phone: '53123456789'},
      {firstName: 'Cliente', surname: '4', email: 'cliente4@email.com', phone: '53123456789'},
    ]
  })
  await prisma.procedure.createMany({
    data: [
      {name: 'Procedimento 1', value: 30, duration: 30},
      {name: 'Procedimento 2', value: 60, duration: 60},
      {name: 'Procedimento 3', value: 15, duration: 15},
    ]
  })
}

seed()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
