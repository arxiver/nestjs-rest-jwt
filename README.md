
## Description

- Backend Framework: NodeJS
- Language: TypeScript
- Server Framework: NestJS
- Database: PostgreSQL
- Testing Framework: JestJS
- API Documentation: Swagger


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

### Context:

Development template


## Installation

```bash
$ npm install
```

### Database Setup
1. Make sure you are having postgresql installed on your machine & running server.
2. Create a database named `server_db` or any name you want (config is at `config/env/dev.env`).
3. Create a databased for testing purpose named `test_db` you can change it also from same above file.

Make sure to configure all the environment variables in `config/env/dev.env` file.

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

# test coverage
$ npm run test:cov
```
