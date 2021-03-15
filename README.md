# :calendar: Maya's Calendar Api

This Api has been built with NestJS framework (Node.js + TypeScript). To start using this project you have to follow the next steps:


## The easy start :rocket:

Use `startDev.sh` script to easily start the project :wink:

```bash
$ chmod +x startDev.sh
$ sh startDev.sh
```

## How to start:
### 1. Install dependencies

```bash
$ yarn install
```

### 2. Pre-config: add a .env file with the database and port information

Create a `.env` file in the root of the project, and add your `DATABASE_URL` connection and `PORT` information.

```
PORT=5000
DATABASE_URL="postgresql://postgres:password@localhost:5445/mayascalendar"
```

### 3. Run Postgresql DB image with Docker

This project uses Postgresql DB as Database, so the best way to make it work is using a Docker image. So, first of all make sure to have Docker in your computer and finally run the next instruction into your terminal to start the postgresql Database container.

```bash
$ docker rm mayas-postgres
$ docker run -p 5445:5432 -d -e POSTGRES_PASSWORD=password --name mayas-postgres postgres
```

WARNING:
The password added in the `POSTGRES_PASSWORD` environment variable should be the same added in the .env `DATABASE_URL` and the first port should be the same as well in order to succesfully connect with the DB.

`postgres:password@localhost:5445`

### 4. Create de database, migrate the Prisma schemas and seed the DB

In yours project folder execute the script to create the DB `mayascalendar` into Postgress, migrate Prisma schemas and seed the DB. This script has to be execute only to initialize the DB and seed it.

```bash
$ yarn db:generate && yarn db:migration:create && yarn db:seed
```

### 5. Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

### 6. Try the api's endpoints using Postmap, Insomnia or curl

- **Find events**           `GET http://localhost:5000/api/events`
- **Find one event**        `GET http://localhost:5000/api/events/:id`
- **Create a new event**    `POST http://localhost:5000/api/events`
- **Update one event**      `PUT http://localhost:5000/api/events/:id`
- **Delete one event**      `DELETE http://localhost:5000/api/events/:id`

### Optional: Check the app's tests

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
