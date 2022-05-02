# Local Setup

- Run Postgres locally:

```sh
docker run -p 5432:5432 -e POSTGRES_PASSWORD=qwerty postgres
```

- Run database migrations:

  ```sh
  yarn workspace @connext/backend-poller dbmate up
  ```

- Install [`dbmate`](https://github.com/amacneil/dbmate) (instructions for Mac OS):

  ```sh
  brew install dbmate
  ```

- Create `.env` to point at local database (or export DATABASE_URL):

```sh
DATABASE_URL=postgres://postgres:qwerty@localhost:5432/connext?sslmode=disable
```

- Create `config.json` to indicate chains and optionally override subgraph URLs:

```json
{
  "logLevel": "debug",
  "chains": {
    "1111": {},
    "2221": {}
  }
}
```

- Run poller:

```sh
yarn workspace @connext/backend-poller dev
```

# Updating DB Schema

In order to update the database schema, create a new migration:

```sh
yarn workspace @connext/backend-poller dbmate new migration_name
```

Edit the migration file and run the migration:

```sh
yarn workspace @connext/backend-poller dbmate up
```

Create the Typescript schema using [Zapatos](https://jawj.github.io/zapatos/):

```sh
yarn workspace @connext/backend-poller zapatos
```
