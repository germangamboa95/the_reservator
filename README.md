# Quickstart

- Run `docker-compose up` or the docker dashboard equivalent.

- You may also do the following for a faster build time:
  - `docker-compose build --parallel`
  - `docker-compose up`

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

`POST /inventories`

```json
{
  // Expects the following application/json body
  "block_start": "",
  "block_end": "",
  "stock": ""
}
```

`GET /inventories`

```json
{
  "data": [
    {
      "id":"",
      "location_id": "",
      "block_start": "",
      "block_end": "",
      "stock": ""
    },
    ...
  ]
}
```

`GET /reservations`

```json
{
  "data": [
    {
      "id":"",
      "restaurant_id": "",
      "scheduled_at": "",
      "name": "",
      "party_size": ""
    },
    ...
  ]
}
```

`GET /reservations/inventories`

```json
{
  "data": [
    {
      "time": "9:00",
      "current": 0,
      "max": 3
    },
    {
      "time": "9:00",
      "current": 0,
      "max": 3
    }
  ]
}
```

`POST /reservations`

```json
{
  // Expects the following application/json body
  "name": "",
  "email": "",
  "party_size": 0,
  "scheduled_at": ""
}
```

### Frontend

#### Techstack

- Typescript
- Vue 3
- tailwindcss
- various utilities (date-fns, axios,...)
