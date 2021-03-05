# :calendar: Maya's Calendar Api

This Api has been built with NestJS framework (Node.js + TypeScript).

### Installation

```bash
$ npm install
```

### Pre-config

Add .env file with your database connection and PORT information.

```
PORT=5000
DATABASE_URL="postgresql://postgres:password@localhost:5432/mayascalendar?schema=public"
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
