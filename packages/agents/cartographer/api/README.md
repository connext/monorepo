# Local Development

- Make sure a local database is running and has the proper migrations that are in the [backend poller](../README.md) package.
- Run the Postgrest server (command works with Mac OSX, `PGRST_DB_URI` might need to be modified for other systems):

```sh
docker run --rm -p 3000:3000 -e PGRST_DB_URI="postgres://reader:3eadooor@host.docker.internal:5432/connext" -e PGRST_DB_SCHEMA="public" -e PGRST_DB_ANON_ROLE="query" postgrest/postgrest
```

- Example queries are found in [`example.http`](./example.http).

# Parsing

Postgrest returns JSON objects directly from the database. In most cases, you will want to convert these to a format that is used across our apps. We have some helper functions for this [here](../../../deployments/contracts/contracts/nomad-xapps/contracts/connext/ConnextHandler.sol). These should be used to parse the returned API results into more useful types.
