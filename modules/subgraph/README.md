# NXTP Subgraph

## Development

### Updating the Subgraph

If contract changes have been made, first update the requisite `abi` in the `abis` directory. You can pull the correct `abi` from the `modules/contracts/artifacts/**.json` files, using only the `abi` field.

#### Contract Event changes

When changes have been made to the `TransactionManager.sol` events, first update the [sugraph.template.yaml](./subgraph.template.yaml) to make sure the event signatures are correct. Make sure these changes are properly propagated by running:

```sh
yarn prepare:local
```

which will ensure a `subgraph.yaml` gets generated from the template.

Then, regenerate the typings by running:

```sh
yarn codegen
```

From there, you can update the `mapping.ts` as needed to conform to the new event structures. Once the `mapping.ts` is updated, run:

```sh
yarn build
```

#### Subgraph Schema Changes

If you would like to change the schema of the subgraph, make the requisite changes in the `schema.graphql` and regenerate the typings by running:

```sh
yarn codegen
```

Then, update the `mapping.ts` as needed to properly account for the schema changes and run:

```sh
yarn build
```

### Deploying Subgraph

Before deploying a subgraph, update the `.json` files for the supported chains in the `config/` directory for the `TransactionManager.sol` you want to connect the subgraph to. You should update the:

- `address` to be the deployed `TransactionManager.sol` address
- `startBlock` to match the block the deploy transaction was mined

You can find the correct values in the `modules/contracts/deployments` directory for each supported chain.

Then, prepare and deploy the subgraph for the appropriate chain. For example, for a rinkeby subgraph deployment, run:

```sh
yarn prepare:rinkeby && yarn deploy:rinkeby
```

**NOTE:** Before deploying, ensure you are properly authed with the graph service. See their [documentation](https://thegraph.com/docs/deploy-a-subgraph) for more information.
