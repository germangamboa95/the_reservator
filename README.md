# Quickstart

- Run `docker-compose up` or the docker dashboard equivalent.

- You may also do the following for a faster build time:
  - `docker-compose build --parallel`
  - `docker-compose up`

- Run `docker-compose exec  backend npm run database:refresh` to refresh the database and run the seeder. 

`dev.env` contains all the envs needed to run this project. All values there are assumed to be public.

**IMPORTANT:** backend service is configured to bring database to a usable state via typeorm's`synchronize` option. This is only meant for initial prototyping and can cause issues if ran against an existing database.

## Overview

A simple restaurant reservation app.

### Backend

#### Techstack

- Typescript
- TypeORM
- Express with OvernightJS enhancements
- various utilities (date-fns, class-validator,...)

#### API Documentation

Routes

- All routes expect bearer token.
- API expects all times to be in UTC and returns all time in UTC.

### Frontend

#### Techstack

- Typescript
- Vue 3
- various utilities (date-fns, axios,...)
