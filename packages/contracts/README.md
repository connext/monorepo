# Nxtp Contracts

## System Overview

### High Level Architecture

### Flow

The more detailed flow can be seen below:

[flow](https://whimsical.com/contracts-flow-ByhtnAsv4EN58yWD1pJ5kd)

There are two key functions in the contract, `prepare` and `fulfill`.

0. Lets assume that by this point the user has already run the auction.
1. User calls `prepare` passing in all of the relevant data about the transfer on the sender side chain along with their funds for the transfer. The contract stores the funds and the hash of the data in its state.
1. The `prepare` call above emits an event with the same calldata. Router hears this event (which includes its address) and calls the `prepare` function with the same calldata on the receiving chain (with decremented fees and timeout).
1. User hears `prepare` event on receiver side. User validates the event data and signs the data, then broadcasts it to the network.
1. Any router can then submit `fulfill` on the receiver side using the user's commitment + event data. If they do so, they get a small fee (in addition to gas).
1. Original router, upon seeing the `fulfill` event on receiver side, submits `fulfill` to sender side.
1. Note that in both sender and receiver side cases, `fulfill` must be called before the timeout expires. This acts as a failsafe against funds getting locked indefinitely if the counterparty is malicious. However, this also means expiry must be far enough away (w/ enough gap between both sides) to _make sure_ the tx will go through.

There is also a `cancel` function. This can be called at any time by the receiver of a tx (router on sender side, user on receiver side) OR by the sender after `expiry`.

### Key Principles

- `TransactionManager` _is_ our data store. As such, we should design in a way that removes any need for us to store offchain data. This includes for things like user pending transactions.
- `TransactionManager` is also how we pass messages most of the time -- the events are used as a mechanism for broadcasting data to the counterparty. This removes the need for messaging overhead.
- Router keeps their funds on the contract itself. This should slightly reduce costs, make analytics much easier, and will separate gas funds from operating funds (e.g. xDai side running out of gas bc all our \$XDAI was drained).

## Development

### Running the tests

To run the contract tests, run the following from the `modules/contracts` directory:

```sh
yarn test
```

This command will output the gas estimates, as well as test coverage of the suites by default. There is no need to deploy or build the repo before running the tests, which will run against a local [hardhat](https://hardhat.org) network.

### Contract Deployment

Contracts are deployed via the [hardhat deploy](https://hardhat.org/plugins/hardhat-deploy.html). Before deploying any contracts, make sure the [deploy](https://github.com/connext/nxtp/blob/main/modules/contracts/deploy/deploy.ts) script used is up to date with the contracts you will need deployed.

To deploy the contracts:

1. Obtain a funded mnemonic, provider url, and the [chain id](https://chainid.network) for the network(s) you would like to deploy the contracts to. There is no ownership of the contracts, so the mnemonic is not systemically important. Run the following commands:

```sh
export MNEMONIC="<YOUR_MNEMONIC_HERE>"
export ETH_PROVIDER_URL="<YOUR_PROVIDER_URL_HERE>"
export CHAIN_ID="<CHAIN_ID_HERE>"
```

Once the proper environment variables are added to your environment, you can begin the contract deployments by running the following from the `modules/contracts` directory:

```sh
npx hardhat deploy --network "<NETWORK_NAME_FOR_CHAIN_ID>" # e.g. npx hardhat deploy --network "goerli"
```

You should use the `NETWORK_NAME` that corresponds to the correct network within the `hardhat.config.ts` file.

Once the contracts have been deployed, export them using:

```sh
yarn export
```

**NOTE:** Once you have deployed the contracts, you will then need to update (if necessary) and redeploy the subgraphs. See [here](https://github.com/connext/nxtp/tree/main/modules/subgraph) for details.
