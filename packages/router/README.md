# Router

## Local Development

### Running the Router

Run all commands from the root directory.

- Run the router in hot-reload mode.

```sh
yarn workspace @connext/nxtp-router dev
```

### Generating Subgraph Client

The router uses [graphql-codegen](https://www.graphql-code-generator.com) to generate a fully-typed subgraph client. Subgraph changes can be propogated by following these steps:

- Make sure subgraph is deployed (follow instructions in subgraph [README](../subgraph/README.md)). This step is required because the code generator cannot point at a local schema due to the custom BigInt types. We are trying to figure out a workaround for this.
- Add/modify graphql queries in `queries.ts`.
- Regenerate client code.

```sh
yarn workspace @connext/nxtp-router codegen
```
