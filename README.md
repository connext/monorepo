[![Verify](https://github.com/connext/nxtp/actions/workflows/build-docker-image-and-verify.yml/badge.svg?branch=main)](https://github.com/connext/nxtp/actions/workflows/verify.yml) [![](https://img.shields.io/discord/454734546869551114?&logo=discord)](https://discord.gg/m93Sqf4) [![](https://img.shields.io/twitter/follow/ConnextNetwork?style=social)](https://twitter.com/ConnextNetwork)

# NXTP

**N**oncustodial **X**chain **T**ransfer **P**rotocol.

**Nxtp** is a lightweight protocol for generalized xchain/xrollup transactions that retain the security properties of the underlying execution environment (i.e. it does **not** rely on any external validator set).

The protocol is made up of a simple contract that uses a locking pattern to `prepare` and `fulfill` transactions, a network of offchain routers that participate in pricing auctions and pass calldata between chains, and a user-side sdk that finds routes and prompts onchain transactions.

## Transaction Lifecycle

![HighLevelFlow](https://github.com/connext/nxtp/blob/main/packages/documentation/assets/HighLevelFlow.png)

Transactions go through three phases:

1. **Route Auction**: User broadcasts to our network signalling their desired route. Routers respond with sealed bids containing commitments to fulfilling the transaction within a certain time and price range.
2. **Prepare**: Once the auction is completed, the transaction can be prepared. The user submits a transaction to `TransactionManager` contract on sender-side chain containing router's signed bid. This transaction locks up the users funds on the sending chiain. Upon detecting an event containing their signed bid from the chain, router submits the same transaction to `TransactionManager` on the receiver-side chain, and locks up a corresponding amount of liquidity. The amount locked on the receiving chain is `sending amount - auction fee` so the router is incentivized to complete the transaction.
3. **Fulfill**: Upon detecting the `TransactionPrepared` event on the receiver-side chain, the user signs a message and sends it to a relayer, who will earn a fee for submission. The relayer (which may be the router) then submits the message to the `TransactionManager` to complete their transaction on receiver-side chain and claim the funds locked by the router. A relayer is used here to allow users to submit transactions with arbitrary calldata on the receiving chain without needing gas to do so. The router then submits the same signed message and completes transaction on sender-side, unlocking the original `amount`.

If a transaction is not fulfilled within a fixed timeout, it reverts and can be reclaimed by the party that called `prepare` on each chain (initiator). Additionally, transactions can be cancelled unilaterally by the person owed funds on that chain (router for sending chain, user for receiving chain) prior to expiry.

It is important to note that neither participant should require a store to complete these transactions. All information to `prepare`, `fulfill`, or `cancel` transactions should be retrievable through contract events.

## Key Differences With Vector

Benefits:

1. Nxtp _only_ has onchain data. No offchain state or db at all. This means:
   - Impossible for data to get out of sync
   - TxService can be way simpler bc double collateralizations are impossible.
   - No more iframe/browser state data.
   - Out of the box perfect crash tolerance.
   - We can use a subgraph out of the box for all of our data reading needs.
   - Router can be _fully_ stateless.
2. When the receiving side funds are unlocked, sender side is immediately able to be unlocked. This means it is not possible for liquidity to leak.
3. All of our current functionality around crosschain transfers is preserved. Auctions and AMMs will work very easily on this.
4. The protocol is stupidly simple (enough that we can reasonably build and test it in 2-3 weeks).

Drawbacks/Risks:

1. Nxtp is _only_ a protocol for (generalized) xchain transactions. It does not use channels (i.e. does not utilize offchain state). This means it cannot be used to do batched conditional transfers for the purposes of scalable micropayments.
2. While there is great crash tolerance, there is a strong requirement that the router must reclaim its funds within a certain time window (we can set this how we like... presumably 48-96 hours). Note that the pessimistic channel case actually has this same liveness requirement, but it exists on both the user _and_ router.

## Architecture

![Architecture](https://github.com/connext/nxtp/blob/main/packages/documentation/assets/Architecture.png)

This monorepo contains the following pieces:

- [Contracts](https://github.com/connext/nxtp/tree/main/packages/contracts) - hold funds for all network participants, and lock/unlock based on data submitted by users and routers
- [Subgraph](https://github.com/connext/nxtp/tree/main/packages/subgraph) - enables scalable querying/responding by caching onchain data and events.
- [TxService](https://github.com/connext/nxtp/tree/main/packages/txService) - resiliently attempts to send transactions to chain (with retries, etc.)
- [Messaging](https://github.com/connext/nxtp/blob/main/packages/utils/src/messaging.ts) - prepares, sends, and listens for message data over [nats](https://nats.io)
- [Router](https://github.com/connext/nxtp/tree/main/packages/router) - listens for events from messaging service and subgraph, and then dispatches transactions to txService
- [SDK](https://github.com/connext/nxtp/tree/main/packages/sdk) - creates auctions, listens for events and creates transactions on the user side.

## Internal Design Principles

These are **important** and everyone must adhere to them:

0. Keep it simple, stupid.

1. Follow the Unix philosophy for every file and function. For instance, a `listeners.ts` file should _only_ handle setting up listeners and then route to a corresponding `handler`. This keeps all business logic consolidated, making it easy to test and read.

1. Every file and function should be unit tested. The scope of this codebase is very small, so it shouldn't be difficult to do this.

1. Build for future hires and contributors. Every function should have a top-level comment that describes what it does, and internal comments breaking down each step. Files should have comments delineating their reponsibilities. Remember: Good code is **never surprising**.

# Local Dev

## Yarn Setup

We are using a Yarn 2 Workspace-based monorepo structure. The individual workspaces are within the `packages/` directory. This repo structure was heavily inspired by [create-ts-project](https://github.com/jtbennett/create-ts-project). The goal is to minimize 3rd party dependencies, and expose the configurations so that they can be transparently managed.

There are a few top-level scripts that can be used:

- `lint:all` - Lints all packages.
- `test:all` - Tests all packages.
- `clean:all` - Removes build artifacts.
- `build:all` - Builds all packages.
- `verify:all` - Tests, builds, and lints all packages.
- `version:all` - Sets versions for packages.
- `purge:all` - Cleans and removes node_modules, etc.

Individual commands can be run against workspaces as so (example for `nxtp-utils` package):

`yarn workspace @connext/nxtp-utils test`

You should be able to do everything from the root and not need to go into the individual package dirs. For example, adding an npm package:

`yarn workspace @connext/nxtp-txservice add ethers`

### First time setup

Make sure you are on the latest yarn version:

- `yarn set version berry`

Try running `yarn` to update everything. If you have issues, try deleting `node_modules` and `yarn.lock`. After deleting `yarn.lock` run `touch yarn.lock` since it does not like if there is no lock file.

### Common Tasks

- `yarn`: Install deps, create symlinks, hoist packages.
- `yarn build:all`: Build all packages.

Run router:

- `yarn workspace @connext/nxtp-router dev` - Runs router in hot-reload mode.

Run test-ui:

- `yarn workspace @connext/nxtp-test-ui dev` - Runs test-ui in hot-reload mode.

### Running Tests

- `yarn`: Install deps, create symlinks, hoist packages.
- `yarn build:all`: Build all packages.
  or
- `yarn workspace @connext/nxtp-contracts build`: Build the specific package.

Run test:

- `yarn workspace @connext/nxtp-contracts test` - Runs test.

### Adding Packages

To add a new package that can be shared by the rest of the repo, you can use some convenience scripts that we have installed:

`yarn tsp create @connext/test-lib --template node-lib`

Note: The `tsp` tool is not required, it just makes boilerplate generation easier. If you want, you can copy paste stuff from other packages. Documentation on the tool is [here](https://github.com/jtbennett/create-ts-project/blob/main/docs/tsp-commands.md).

To add the lib to be a dependency of a consuming app (i.e. the router):

`yarn tsp add @connext/test-lib --cwd packages/router`

Again, this can all be done without the tool, all it does is add some files and make some config changes.

Note: We use `node-lib` as the template for all the packages. There are some other included templates like `browser-lib` which didn't work with our bundling. We might need to revisit things for bundling reqs.

### Publishing Packages

- Update the [`CHANGELOG.md`](./CHANGELOG.md).
- Run `yarn version:all X.X.X` where `X.X.X` is the full version string of the NPM version to deploy (i.e. `0.0.1`).
- Run `git push --follow-tags`.
- The [GitHub action will](./.github/workflows/build-docker-image-and-verify.yml) publish the packages by recognizing the version tag.

## Integration

Information about common integration flows.

### Setup Router for TransactionManager

There's an easy hardhat script to run that sets up a router, adds assets, and adds liquidity. Run it by calling:

```sh
yarn workspace @connext/nxtp-contracts hardhat setup-test-router --router 0x0EC26F03e3dBA9bb5162D28fD5a3378A25f168d1 --network rinkeby
```

There are other configurable options. Note: You must use the deployer mnemonic. If you don't have it, ask a team member.

### Running Test UI and Router Locally Against Live Chains

- Spin up local messaging (optional but good idea to not use prod messaging):

```sh
yarn workspace @connext/nxtp-integration docker:messaging:up
```

- Create router `packages/router/config.json`. Configure for live chains and the desired messaging. If you have not set up your mnemonic with the `TransactionManager`, see the [instructions](#setup-router-for-TransactionManager):

```json
{
  "adminToken": "blahblah",
  "chainConfig": {
    "4": {
      "providers": [
        "https://rinkeby.infura.io/v3/...",
        "https://rinkeby.infura.io/v3/...",
        "https://rinkeby.infura.io/v3/..."
      ],
      "confirmations": 1,
      "subgraph": "https://api.thegraph.com/subgraphs/name/connext/nxtp-rinkeby"
    },
    "5": {
      "providers": [
        "https://goerli.infura.io/v3/...",
        "https://goerli.infura.io/v3/...",
        "https://goerli.infura.io/v3/..."
      ],
      "confirmations": 1,
      "subgraph": "https://api.thegraph.com/subgraphs/name/connext/nxtp-goerli"
    }
  },
  "logLevel": "info",
  "natsUrl": "nats://localhost:4222",
  "authUrl": "http://localhost:5040",
  "mnemonic": "..." // use your own mnemonic!
}
```

- Spin up local router:

```sh
yarn workspace @connext/nxtp-router dev
```

- Create `packages/test-ui/.env`. Configure for live chains and the desired messaging:

```
REACT_APP_CHAIN_CONFIG='{"4":{"provider":["https://rinkeby.infura.io/v3/...","https://rinkeby.infura.io/v3/...","https://rinkeby.infura.io/v3/..."]},"5":{"provider":["https://goerli.infura.io/v3/af2f28bdb95d40edb06226a46106f5f9","https://goerli.infura.io/v3/...","https://goerli.infura.io/v3/..."]}}'
REACT_APP_SWAP_CONFIG='[{"name":"TEST","assets":{"4":"0x9aC2c46d7AcC21c881154D57c0Dc1c55a3139198","5":"0x8a1Cad3703E0beAe0e0237369B4fcD04228d1682"}}]'
#REACT_APP_NATS_URL_OVERRIDE=ws://localhost:4221
#REACT_APP_AUTH_URL_OVERRIDE=http://localhost:5040
```

- Spin up local `test-ui`:

```sh
yarn workspace @connext/nxtp-test-ui dev
```

### Local Messaging and Chains

In some cases it is desirable to develop against local blockchains and messaging services. To do that, run:

- `yarn workspace @connext/nxtp-integration docker:services:up`
- `bash setup-integration-test.sh`

The above commands run local chains and messaging and take care of local deployment. Modify `packages/router/config.json` to look similar to the following:

```json
{
  "adminToken": "blahblah",
  "chainConfig": {
    "1337": {
      "provider": ["http://localhost:8545"],
      "confirmations": 1,
      "subgraph": "http://localhost:8000/subgraphs/name/connext/nxtp",
      "transactionManagerAddress": "0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0"
    },
    "1338": {
      "provider": ["http://localhost:8546"],
      "confirmations": 1,
      "subgraph": "http://localhost:9000/subgraphs/name/connext/nxtp",
      "transactionManagerAddress": "0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0"
    }
  },
  "logLevel": "info",
  "natsUrl": "nats://localhost:4222",
  "authUrl": "http://localhost:5040",
  "mnemonic": "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"
}
```

Run the router locally with:

`yarn workspace @connext/nxtp-router dev`

The router will now hot reload and allow easy testing/debug.

Now you can run `yarn workspace @connext/nxtp-integration test` to run integration tests against a local machine.

When you are done, you can run `yarn docker:stop:all` to halt all running services.
