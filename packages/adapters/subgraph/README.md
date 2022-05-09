# Cross Chain Subgraph for NXTP

The subgraph adapter has been built on top of the [graphclient](https://github.com/graphprotocol/graph-client). This basically works in cross-chain mode right now and uses `highestValue` strategy, but we will integrate the `most-synced` strategy once they get it released [here](https://github.com/graphprotocol/graph-client/issues/63).

## Cross Chain Mode

There are several use cases graphclient can support for cross chain mode. See more details [here](https://github.com/graphprotocol/graph-client/issues/41).

- Use-case 1: Subgraphs are managed separately and prefixed
- Use-case 2: Merge responses
- Use-case 3: Merge root-operation, while `union` the responses

Cross chain mode has been implemented in the adapter using use-case 1. So in this scenario, developers need to prefix each schema types while being compose, at the level of each source:

```
sources:
  - name: Connext_Kovan
    handler:
      graphql:
        endpoint: https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-v0-kovan
    transforms:
      - prefix:
          value: kovan_
          includeRootOperations: true
          ignore:
            - _SubgraphErrorPolicy_
  - name: Connext_Rinkeby
    handler:
      graphql:
        endpoint: https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-v0-rinkeby
    transforms:
      - prefix:
          value: rinkeby_
          includeRootOperations: true
          ignore:
            - _SubgraphErrorPolicy_
```

The merged schema allows users to execute a cross-chain query through multiple chains at the same time and parse responses.

```
query something($t: String) { # you can even pass the same GraphQL variable, into multiple GraphQL field arguments
   kovan_something(t: $t) {
     id
   }
   rinkeby_something(t: $t) {
     id
   }
}
```

### How to add a new subgraph

To add a new subgraph, you need to determine source name, endpoint and prefix first. After that, you can add a new source to .graphclientrc.yml and need to regenerate typescript types for schemas to be updated.


### How to generate typescript types.

Whenever you add a new source in .graphclientrc.yml or there is an update in subgraph schema, you need to rebuild graphclient.

```sh
yarn workspace @connext/nxtp-adapters-subgraph build-client
```

This basically fetches the schemas from endpoints and creates typescript-based entities which are prefixed.
