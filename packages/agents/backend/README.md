# Backend

The backend is a service that stores transfer data to a persistent datastore. The data schema is bespoke for Connext cross-chain transfers and can facilitate use cases such as:

- Querying current state of transfers (i.e. to get the status).
- Get transfer history for a user.
- Network-wide analytics.

# Architecture

The backend consists of multiple microservices:

- **Poller**: The poller service is responsible for querying subgraphs and storing transfer data to a persistent datastore.
- **Postgrest**: The postgrest service is responsible for querying the persistent datastore and returning transfer data through a REST API.

# Local Development

Refer to the individual microservice READMEs for more information.
