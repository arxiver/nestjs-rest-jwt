
## Description

- Backend Framework: NodeJS
- Language: TypeScript
- Server Framework: NestJS
- Database: PostgreSQL
- Testing Framework: JestJS
- API Documentation: Swagger

### Task Directive:

- Building a web application with the below API endpoints. 
- Add sample data in the PostgreSQL database to showcase your work.

Task Quality Requirements:

- Functions documentations:
```ts
/** Does something interesting
* 
* @param Place $where Where something interesting takes place
* @param integer $repeat How many times something interesting should happen
*
* @throws Some_Exception_Class If something interesting cannot happen
* @return Status
*/
```

- All API endpoints should be documented using Swagger. You can follow the example here: https://petstore.swagger.io/

- All functions should be unit tested using JestJS.

### Context:

FunApp is a USA-based app that has a simple sign up process. FunApp only accepts sign ups from phones located in the USA.

## Required Endpoints:

1- `GET`  Profile data ✅ 

`/user/{user_id}`

Get all fields for the user listed below. Note failures such as an expired or invalid user token (or any other failure, if any).

This endpoint takes the user_id as a querystring parameter and returns the user data below.

- name 
- email
- state (in the USA)
- city


2- `POST`  Sign Up ✅ 

`/user/signup`

Sign up should be rejected if longitude and latitude are not in the USA. State and city should be derived from the longitude and latitude and stored in the database.

The following parameters need to be in the POST body:

- name (string, required)
- email (string, backend validation required)
- latitude (decimal, required)
- longitude (decimal, required)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
