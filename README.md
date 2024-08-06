# Getting started

## Installation

1. Install [Node.JS](https://nodejs.org/en/) LTS version
2. Install PostgreSQL OR use the Docker version with `compose` file in this repository
3. Clone this repository and enter on the respective folder
4. Install dependencies running: `yarn`

## Things to do before run the project:

1. Rename `.env.example` to `.env`
2. Change DATABASE_URL to postgres://`user`:`password`@`localhost`/`database`
3. Run database init: `yarn db:update`
3. Run database seed: `yarn db:seed`
4. Run `yarn dev` to start development server

The seed command generates a user with admin permissions using the following data:
E-mail: `admin@email.com`
Password: `superpassword`

## Database

This project usesPostgreSQL as database and Prisma as ORM.
