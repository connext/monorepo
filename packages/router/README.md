# Router

## TLDR

### Video Walkthrough

If even this looks like too much reading, video walkthrough of the code can be found [here](https://youtu.be/qApqoUXplyU).

### High Level Overview

The router is an automated actor that is in charge of providing liquidity and facilitates cross-chain swaps. The basic operation of the router is:

- Listen for user swap requests.
- Submit bids to fulfill user swap requests.
- Monitor `TransactionManager` contract events across all chains for `TransactionPrepared` events where `router` matches the configured router's signer address, and `sendingChainId` matches the chain of the event.
- Call `prepare` on the receiving chain with `amount = amount - calculatedFees` where `calculatedFees` are a combination of the AMM-based swap rate, flat 0.05% fee, and any gas fees that will be reimbursed by the user.
- Monitor `TransactionManager` contract events across all chains for `TransactionFulfilled` events where `router` matches the configured router's signer address and `receivingChainId` matches the chain of the event.
- Call `fulfill` on the sending chain with the signature emitted from the `TransactionFulfilled` event.

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
