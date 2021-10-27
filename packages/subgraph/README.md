# NXTP Subgraph

## Development

### Updating the Subgraph

If contract changes have been made, create a new version under `src` directory and structure the directory like prior versions. first update the requisite `abi` in the `abis` directory. You can pull the correct `abi` from the `packages/contracts/artifacts/**.json` files, using only the `abi` field. Now update the `mappings.ts`, `schema.graphql` and `subgraph.template.yaml` accordingly.

#### Contract Event changes

When changes have been made to the `TransactionManager.sol` events, first update the [subgraph.template.yaml](./subgraph.template.yaml) to make sure the event signatures are correct. Make sure these changes are properly propagated by running the following from the root directory:

```sh
yarn workspace @connext/nxtp-subgraph prepare:local
```

which will ensure a `subgraph.yaml` gets generated from the template.

Then, regenerate the typings by running:

```sh
yarn workspace @connext/nxtp-subgraph codegen
```

From there, you can update the `mapping.ts` as needed to conform to the new event structures. Once the `mapping.ts` is updated, run:

```sh
yarn workspace @connext/nxtp-subgraph build
```

#### Subgraph Schema Changes

If you would like to change the schema of the subgraph, make the requisite changes in the respective version's `schema.graphql` and regenerate the typings by running:

```sh
yarn workspace @connext/nxtp-subgraph prepare:local
```

which will ensure a `subgraph.yaml` gets generated from the template.

```sh
yarn workspace @connext/nxtp-subgraph codegen
```

Then, update the `mapping.ts` as needed to properly account for the schema changes and run:

```sh
yarn workspace @connext/nxtp-subgraph build
```

### Deploying Subgraph

Before deploying a subgraph, update the `.json` files for the supported chains in the `config/` directory for the `TransactionManager.sol` you want to connect the subgraph to. You should update the:

- `address` to be the deployed `TransactionManager.sol` address
- `startBlock` to match the block the deploy transaction was mined

You can find the correct values in the `packages/contracts/deployments` directory for each supported chain.

Then, once you added the `subgraph name`, `network`, `start block number` and `address`. You can deploy the subgraph for the appropriate chain.

For example, if you want to use contract version `v1`, under `staging`, run:

```sh
yarn workspace @connext/nxtp-subgraph deploy v1 staging rinkeby <graph-access-token>
```

OR

```sh
yarn workspace @connext/nxtp-subgraph deploy:staging rinkeby <graph-access-token>
```

You can also deploy subgraph on all the networks for given environment at once by using `ALL`.

```sh
yarn workspace @connext/nxtp-subgraph deploy v1 staging all <graph-access-token>
```

**NOTE:** Before deploying, ensure you are properly authed with the graph service. See their [documentation](https://thegraph.com/docs/deploy-a-subgraph) for more information.
