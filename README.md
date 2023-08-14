# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone git@github.com:Commandor05/nodejs2023Q2-service.git
```

## Installing NPM modules

```
npm install
```

## Copy .env

```
cp .env.example .env
```

and change "PORT" inside .env if needed

## Run docker & start application

```
docker-compose up -d
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Apply initial migrations

```
docker exec nest-dc npm run migration:run
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
docker exec nest-dc npm run test
```

To run only one of all test suites

```
docker exec nest-dc npm run test -- <path to suite>
```

To run all test with authorization

```
docker exec nest-dc npm run test:auth
```

To run only specific test suite with authorization

```
docker exec nest-dc npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

### Images on docker hub

https://hub.docker.com/repository/docker/commandor05/service-postgres/general
https://hub.docker.com/repository/docker/commandor05/service-nest/general

### Run images scanning

```
docker scout recommendations commandor05/service-postgres
docker scout quickview commandor05/service-postgres

docker scout recommendations commandor05/service-nest
docker scout quickview commandor05/service-nest
```

### Run sript for vulnerabilities scanning

```
npm run scan:critical
```
