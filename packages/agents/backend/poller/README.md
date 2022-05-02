# Local Setup

- Run Postgres locally:

```sh
docker run -p 5432:5432 -e POSTGRES_PASSWORD=qwerty postgres
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
