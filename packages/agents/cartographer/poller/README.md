# Local Setup

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

- To run against staging subgraphs for example:

```json
{
  "service": "< transfers | roots | messages | routers >",
  "logLevel": "debug",
  "environment": "staging",
  "database": {
    "url": "<your db url>"
  },
  "server": {
    "adminToken": "<your admin token>",
    "port": 8085,
    "host": "localhost",
    "requestLimit": 10
  }
}
```

- Run poller:

```sh
yarn workspace @connext/cartographer-poller start
```

If you'd like to run a different poller, you can specify which one you'd
like to run by setting the `SERVICE` env var, e.g.L

SERVICE=transfers yarn workspace @connext/cartographer-poller start

# Updating DB Schema

In order to update the database schema, create a new migration:

```sh
yarn workspace @connext/cartographer-poller dbmate new migration_name
```

Edit the migration file and run the migration:

```sh
yarn workspace @connext/cartographer-poller dbmate up
```

Create the Typescript schema using [Zapatos](https://jawj.github.io/zapatos/):

```sh
yarn workspace @connext/cartographer-poller zapatos
```
