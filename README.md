<div align="center">
  <!-- PROJECT LOGO -->
  <a href="https://github.com/connext/nxtp">
    <img src="https://images.squarespace-cdn.com/content/v1/619f86b8de2c6f4f7fa201c0/8eaeca35-ccf3-495f-9e9a-19fbec796187/connext__Logo+%2B+WhiteText+MultiColor.png?format=1500w" alt="Logo" width="320" height="80">
  </a>

[![Test Sops][sops-shield]][sops-url] [![Deploy Testnet][deploy-testnet-shield]][deploy-testnet-url] [![Build Test Deploy][build-test-deploy-shield]][build-test-deploy-url]

[![Discord][discord-shield]][discord-url] [![Twitter][twitter-shield]][twitter-url]

  <br />

  <h3 align="center">About Connext</h3>
  <h4 align="center">Connext is a bridging protocol which allows for safe transfer of tokens and data between EVM compatible blockchains.</h4>

  <h3 align="center">NXTP</h3>
  <h4 align="center"><b>N</b>oncustodial <b>X</b>domain <b>T</b>ransfer <b>P</b>rotocol.</h4>

  <p align="center">
    Useful Links
    <br />
    <a href="https://docs.connext.network"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://bridge.connext.network/">View Mainnet Bridge</a>
    <br />
    <a href="https://testnet.bridge.connext.network/">View Testnet Bridge (Connext Amarok)</a>
    <br />
    <br />
    <a href="https://github.com/connext/nxtp/issues">Report Bug</a>
    <br />
    <a href="https://immunefi.com/bounty/connext/">Bug Bounty Program</a>
    <br />
    <br />
    <a href="https://github.com/connext/nxtp/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-nxtp">About NXTP </a>
       <ul>
        <li><a href="#built-with">Architecture</a></li>
      </ul>
      <ul>
        <li><a href="#built-with">Architecture</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## Connext Architecture

The Connext architecture can be seen as a layered system, as follows:

| Layer                   | Protocol/Stakeholders             |
| ----------------------- | --------------------------------- |
| `Application Layer`     | `Crosschain Applications (xApps)` |
| `Liquidity Layer`       | `NXTP`                            |
| `Gateway/Routing Layer` | `Interchain Gateway Protocol`     |
| `Messaging Layer`       | `Nomad`                           |
| `Transport Layer`       | `Connext Routers`                 |

## About NXTP

**Nxtp** is a liquidity layer and a developer interface on top of the [nomad](nomad-url) optimisitic briding protocol.

<p align="right">(<a href="#top">back to top</a>)</p>

### Structure of this repo

This repo is set up as a [Yarn workspace](https://yarnpkg.com/features/workspaces) monorepo:

All main level scripts are defined in the main package.json at the root of the repo

### Internal Design Principles

These are **important** and everyone must adhere to them:

0. Keep it simple, stupid.

1. Follow the Unix philosophy for every file and function. For instance, a `listeners.ts` file should _only_ handle setting up listeners and then route to a corresponding `handler`. This keeps all business logic consolidated, making it easy to test and read.

2. Every file and function should be unit tested. The scope of this codebase is very small, so it shouldn't be difficult to do this.

3. Build for future hires and contributors. Every function should have a top-level comment that describes what it does, and internal comments breaking down each step. Files should have comments delineating their reponsibilities. Remember: Good code is **never surprising**.

## Core Flow of a transaction through Connext

A transaction flowing through Connext will now have the following lifecycle:

**A User will:**

Initiate the transaction by calling a `xcall` function on our contracts, passing in funds, gas details, arbitrary data, and a target address object (includes chain info). Note that `xcall` is meant to mimic solidity's lower level `call` as best as possible.

**Our contracts will:**

-If needed, swap the passed in token to the Nomad version of the same asset.
Call the Nomad contracts with a hash of the tx details to initiate the 30-60m message across chains.

-Emit an event with the tx details.
Routers observing the origin chain with funds on the destination chain will:
Simulate the transaction (if this fails, the assumption is that this is a more "expressive" crosschain message that requires authentication of the call and verification of the data, and so it must go through the slow Nomad process only).

**Routers (Active Liquidity Providers) will:**

-Prepare a signed transaction object using funds on the receiving chain.
Post this object (a "bid") to the auctioneer.
Note: if the router does not have enough funds for the transfer, they may also provide only part of the transfer's value, which gets split across multiple routers in the network.

-The sequencer collects bids from routers and allows routers 30 seconds per transfer to send bids. After this time, sequencer will select a bid randomly (selection process TBD) and submit the payload which contains the router's signature to the relayer network to be submitted to chain.

-When a given bid is submitted to chain, the contracts will do the following:
Check that there are enough funds available for the transaction.

-Swap the router's Nomad-flavored funds for the canonical asset of the chain if needed.
Send the swapped funds to the correct target (if it is a contract, this will also execute calldata against the target).

-Hash the router's params and store a mapping of this hash to the router's address in the contract.

--> At this point, the user's tx has already been completed!

Later, when the Nomad message arrives, a heavily batched tx can be submitted to take all pending hashes received over Nomad and look up whether they have corresponding router addresses in the hash -> router address mapping. If they do, then Nomad assets are minted and given to the router.

Note: if the router gives the incorrect amount of funds to a user or if they execute the wrong calldata, then the router's param hash will not match the hash coming over Nomad and the router will not get reimbursed. This is the core security mechanism that ensures that routers behave correctly.

Note 2: Routers will take a 30-60 minute lockup on their funds when relaying transactions. While this theoretically reduces capital efficiency compared to the existing system, in practice the lack of need to rebalance will mean that routers have more capital available more often regardless.

### Architecture

- [adapters](https://github.com/connext/nxtp/tree/main/packages/adapters) - Wrappers around external modules. These adapters can be shared between different packages.

  - Cache is a wrapper around all the redis based caches that are used.
  - Subrgaph contains all the code to read from the subgraph
  - TxService resiliently attempts to send transactions to chain (with retries, etc.) and is used to read and write to RPC providers, and has fallback providers if needed. Fallbacks can be defined as arrays and this way we can provide resiliency in case of failure
  - Web3Signer is a wrapper around Web3Signer, which is a secure way of signing which does not require to include mnemonics in the app itself.

- [agents](https://github.com/connext/nxtp/tree/main/packages/agents) - Any kind of backend service that we have running

  - [Cartograpber](https://github.com/connext/nxtp/tree/main/packages/agents/cartographer) is our chain indexer, which indexes from subgraph
  - [Lighthouse](https://github.com/connext/nxtp/tree/main/packages/agents/lighthouse) is our implementation of a Watchtower, when transfers are fulfilled using slowpath, they are not executed by a router. So they need to be executed by another agent, and that's what lighthouse does
  - [Relayer](https://github.com/connext/nxtp/tree/main/packages/agents/relayer is an implementatino of a relayer in case we can't use Gelato
  - [Router](https://github.com/connext/nxtp/tree/main/packages/router) - listens for events from messaging service and subgraph, and then dispatches transactions to txService
  - [SDK](https://github.com/connext/nxtp/tree/main/packages/agents/sdk) - is a JS wrapper around the contract calls themselves and can be used by integrations
  - [Sequencer](https://github.com/connext/nxtp/tree/main/packages/agents/sequencer) - is the agent module which is in charge of sourcing bids from routers and puts fast liquidity bids onto the chain itself.

- [Contracts](https://github.com/connext/nxtp/tree/main/packages/contracts) - hold funds for all network participants, and lock/unlock based on data submitted by users and routers
- [deployments](https://github.com/connext/nxtp/tree/main/packages/deployments) - These are things which we deploy
  - Contracts are the contracts that we deploy and the deployment scripts
  - Subgraph is all the subgraph source code to define all the mappings and contains all the configurations to deploy to different graph hosted services or third party graph providers
- [examples](https://github.com/connext/nxtp/tree/main/packages/examples) - these are not used in production, but contains ways to use the SDK that are illustrative of how to integrate NXTP
- [integration](https://github.com/connext/nxtp/tree/main/packages/integration) - Utilities for integration test
- [utils](https://github.com/connext/nxtp/tree/main/packages/utils) - A catchall for different types of helper functions that are shared thoughout the different packages

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

<p align="right">(<a href="#top">back to top</a>)</p>

## SDK Quickstart

The Connext SDK allows developers to interact with the Connext protocol in standard Node.js or web environments. This quickstart will go through how to build on top of Connext using the TypeScript SDK.

These examples (and others) can be found in our xApp Starter Kit, under `src/sdk-interactions`.

[xApp Starter Kit](https://github.com/connext/xapp-starter/)

---

### Cross-Chain Transfer

In this quickstart, we'll demonstrate how to execute an `xcall` to transfer funds from a wallet on Kovan to a destination address on Rinkeby.

#### 1. Setup project

If you have an existing project, you can skip to [Install dependencies](./sdk-quickstart#2-install-dependencies).

Create the project folder and initialize the package.

```bash
mkdir node-examples && cd node-examples
yarn init
```

We'll use TypeScript / Node.js in this example.

```bash
yarn add @types/node typescript
yarn add -D @types/chai
yarn tsc --init
```

We want to use top-level await so we'll set the compiler options accordingly.

```json title="tsconfig.json"
{
  "compilerOptions": {
    "outDir": "./dist",
    "target": "es2017",
    "module": "esnext",
    "moduleResolution": "node"
  },
  "exclude": ["node_modules"]
}
```

And add the following to `package.json`:

```json title="package.json"
"type": "module",
"scripts": {
  "build": "tsc",
  "xtransfer": "node dist/xtransfer.js"
}
```

Create `xtransfer.ts` in project directory, where we will write all the code in this example.

```bash
mkdir src && touch src/xtransfer.ts
```

#### 2. Install dependencies

Install the SDK.

```bash
yarn add @connext/nxtp-sdk
```

Also, install `ethers`.

```bash
yarn add ethers
```

#### 3. Pull in imports

We only need a few imports for this example.

```ts title="src/xtransfer.ts"
import { create, NxtpSdkConfig } from "@connext/nxtp-sdk";
import { ethers } from "ethers";
```

The rest of this guide will be working with this file.

#### 4. Create a Signer

Use a wallet (i.e. MetaMask) as a [Signer](https://docs.ethers.io/v5/api/signer/).

```ts
const privateKey = "<wallet_private_key>";
let signer = new ethers.Wallet(privateKey);
```

And connect it to a [Provider](https://docs.ethers.io/v5/api/providers/) on the sending chain ([Infura](https://infura.io/), [Alchemy](https://www.alchemy.com/), etc).

```ts
const provider = new ethers.providers.JsonRpcProvider("<kovan_rpc_url>");
signer = signer.connect(provider);
const signerAddress = await signer.getAddress();
```

#### 5. Construct the `NxtpSdkConfig`

Fill in the placeholders with the appropriate provider URLs.

```ts
const nxtpConfig: NxtpSdkConfig = {
  logLevel: "info",
  signerAddress: signerAddress,
  chains: {
    "1111": {
      providers: ["<rinkeby_rpc_url>"],
      assets: [
        {
          name: "TEST",
          address: "0xB7b1d3cC52E658922b2aF00c5729001ceA98142C",
        },
      ],
    },
    "2221": {
      providers: ["<kovan_rpc_url>"],
      assets: [
        {
          name: "TEST",
          address: "0xB5AabB55385bfBe31D627E2A717a7B189ddA4F8F",
        },
      ],
    },
  },
};
```

> Not sure where those IDs came from? They refer to the [Nomad Domain IDs](../testing-against-testnet#nomad-domain-ids) which are a custom mapping of ID to specific execution environment (not always equivalent to "chain", hence we have Domain IDs).

#### 6. Create the SDK

Simply call `create()` with the config from above.

```ts
const { nxtpSdkBase } = await create(nxtpConfig);
```

#### 7. Construct the `xCallArgs`

Now, we construct the arguments that will be passed into the `xcall`.

```ts
const callParams = {
  to: "<destination_address>", // the address that should receive the funds
  callData: "0x", // empty calldata for a simple transfer
  originDomain: "2221", // send from Kovan
  destinationDomain: "1111", // to Rinkeby
  recovery: "<destination_address>", // fallback address to send funds to if execution fails on destination side
  callback: ethers.constants.AddressZero, // zero address because we don't expect a callback for a simple transfer
  callbackFee: "0", // relayers on testnet don't take a fee
  forceSlow: false, // option that allows users to take the Nomad slow path (~30 mins) instead of paying routers a 0.05% fee on their transaction
  receiveLocal: false, // option for users to receive the local Nomad-flavored asset instead of the adopted asset on the destination side
};

const xCallArgs = {
  params: callParams,
  transactingAssetId: "0xB5AabB55385bfBe31D627E2A717a7B189ddA4F8F", // the Kovan Test Token
  amount: "1000000000000000000", // amount to send (1 TEST)
  relayerFee: "0", // relayers on testnet don't take a fee
};
```

#### 8. Approve the asset transfer

This is necessary because funds will first be sent to the ConnextHandler contract before being bridged.

`approveIfNeeded()` is a helper function that finds the right contract address and executes the standard "increase allowance" flow for an asset.

```ts
const approveTxReq = await nxtpSdkBase.approveIfNeeded(
  xCallArgs.params.originDomain,
  xCallArgs.transactingAssetId,
  xCallArgs.amount,
);
const approveTxReceipt = await signer.sendTransaction(approveTxReq);
const approveResult = await approveTxReceipt.wait();
```

#### 9. Send it!

Send the `xcall`.

```ts
const xcallTxReq = await nxtpSdkBase.xcall(xCallArgs);
xcallTxReq.gasLimit = ethers.BigNumber.from("30000000");
const xcallTxReceipt = await signer.sendTransaction(xcallTxReq);
console.log(xcallTxReceipt); // so we can see the transaction hash
const xcallResult = await xcallTxReceipt.wait();
```

Finally, run the following to fire off the cross-chain transfer!

```shell
yarn build
yarn xtransfer
```

#### 10. Track the `xcall`

We can use the transaction hash from the transaction receipt we logged above to track the status of the `xcall`, following instructions here.

[Tracking an xcall](../xcall-status)

After the DestinationTransfer shows up on the Rinkeby side, the freshly transferred tokens should show up in the destination wallet.

---

### Cross-Chain Mint (unauthenticated)

We can also send arbitrary `calldata`, along with the `xcall`, to be executed on the destination domain.

In this example, we're going to construct some `calldata` targeting an existing contract function to avoid having to deploy a new contract. We'll aim for the `mint` function of the [Test ERC20 Token (TEST) contract](https://rinkeby.etherscan.io/address/0xB7b1d3cC52E658922b2aF00c5729001ceA98142C#writeContract) to demonstrate this.

> Minting usually requires verification of the data but the Test Token has a public `mint` function (callable by anyone!) that we can leverage for this example. Hence, this is an "unauthenticated" `xcall` with unverified calldata - nothing extra needs to be done on the destination side.

#### 7. Encode the `calldata`

After creating the SDK (steps 1-6 above), we have to create and encode the `calldata`.

To do this, we'll just grab the Test Token contract's ABI (we only care about the `mint` function here) and encode the `calldata` with the correct arguments.

```js
const contractABI = ["function mint(address account, uint256 amount)"];
const iface = new ethers.utils.Interface(contractABI);

const calldata = iface.encodeFunctionData("mint", [
  "0x6d2A06543D23Cc6523AE5046adD8bb60817E0a94", // address to mint tokens for
  ethers.BigNumber.from("100000000000000000000"), // amount to mint (100 TEST)
]);
```

#### 8. Construct the `xCallArgs`

Now with the `calldata` ready, we supply it to the `xCallArgs`.

```js
const callParams = {
  to: "0xB7b1d3cC52E658922b2aF00c5729001ceA98142C", // Rinkeby Test Token - this is the contract we are targeting
  //highlight-next-line
  callData: calldata,
  originDomain: "2221", // send from Kovan
  destinationDomain: "1111", // to Rinkeby
  forceSlow: false, // option that allows users to take the Nomad slow path (~30 mins) instead of paying routers a 0.05% fee on their transaction
  receiveLocal: false, // option for users to receive the local Nomad-flavored asset instead of the adopted asset on the destination side
};

const xCallArgs = {
  params: callParams,
  transactingAssetId: "0xB5AabB55385bfBe31D627E2A717a7B189ddA4F8F", // the Kovan Test Token
  amount: "0", // not sending any funds
  relayerFee: "0", // relayers on testnet don't take a fee
};
```

#### 9. Send it!

Notice that we specified `amount: "0"` above so we're not sending any funds with this `xcall`. Therefore, we can skip the approval dance and just send the transaction.

```ts title="*same code*"
const xcallTxReq = await nxtpSdkBase.xcall(xCallArgs);
xcallTxReq.gasLimit = ethers.BigNumber.from("30000000");
const xcallTxReceipt = await signer.sendTransaction(xcallTxReq);
console.log(xcallTxReceipt); // so we can see the transaction hash
const xcallResult = await xcallTxReceipt.wait();
```

Add a new script to `package.json`:

```json title="package.json"
"scripts": {
  "xmint": "node dist/xmint.js"
}
```

Finally, run the following to fire off the cross-chain mint!

```shell
yarn build
yarn xmint
```

#### 10. Track the `xcall`

Again, we use the transaction hash from the transaction receipt to track the status of the xcall and we can check the destination wallet to make sure the right amount of funds were minted.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Testnet Launch
- [ ] Mainnet Launch

See the [open issues](https://github.com/connext/nxtp/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

Project Link: [https://github.com/connext/nxtp](https://github.com/connext/nxtp)

<p align="right">(<a href="#top">back to top</a>)</p>

# Local Dev

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

## First time setup

Make sure you are on the latest yarn version:

- `yarn set version berry`

Try running `yarn` to update everything. If you have issues, try deleting `node_modules` and `yarn.lock`. After deleting `yarn.lock` run `touch yarn.lock` since it does not like if there is no lock file.

## Common Tasks

- `yarn`: Install deps, create symlinks, hoist packages.
- `yarn build:all`: Build all packages.

Run router:

- `yarn workspace @connext/nxtp-router dev` - Runs router in hot-reload mode.

Run test-ui:

- `yarn workspace @connext/nxtp-test-ui dev` - Runs test-ui in hot-reload mode.

## Running Test

- `yarn`: Install deps, create symlinks, hoist packages.
- `yarn build:all`: Build all packages.
  or
- `yarn workspace @connext/nxtp-contracts build`: Build the specific package.

Run test:

- `yarn workspace @connext/nxtp-contracts test` - Runs test.

## Adding Packages

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

### Setup Router for Connext

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

- Create router `packages/router/config.json`. Configure for live chains and the desired messaging. If you have not set up your mnemonic with the `Connext`, see the [instructions](#setup-router-for-Connext):

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
  "mnemonic": "...", // use your own mnemonic!
  "swapPools": [
    {
      "name": "TEST",
      "assets": [
        { "chainId": 4, "assetId": "0x9aC2c46d7AcC21c881154D57c0Dc1c55a3139198" },
        { "chainId": 5, "assetId": "0x8a1Cad3703E0beAe0e0237369B4fcD04228d1682" }
      ]
    }
  ]
}
```

- Spin up local router:

```sh
yarn workspace @connext/nxtp-router dev
```

- Create `packages/test-ui/.env`. Configure for live chains and the desired messaging:

```sh
REACT_APP_CHAIN_CONFIG='{"1":{"providers":["https://mainnet.infura.io/v3/...","https://mainnet.infura.io/v3/...","https://mainnet.infura.io/v3/..."]},"4":{"providers":["https://rinkeby.infura.io/v3/...","https://rinkeby.infura.io/v3/...","https://rinkeby.infura.io/v3/..."]},"5":{"providers":["https://goerli.infura.io/v3/...","https://goerli.infura.io/v3/...","https://goerli.infura.io/v3/..."]}}'
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

- `yarn docker:local:services`

The above command runs local chains and messaging and take care of local deployment. Modify `packages/router/config.json` to look similar to the following:

```json
{
  "adminToken": "blahblah",
  "chainConfig": {
    "1337": {
      "providers": ["http://localhost:8545"],
      "confirmations": 1,
      "subgraph": "http://localhost:8010/subgraphs/name/connext/nxtp",
      "transactionManagerAddress": "0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0",
      "safeRelayerFee": "100"
    },
    "1338": {
      "providers": ["http://localhost:8546"],
      "confirmations": 1,
      "subgraph": "http://localhost:9010/subgraphs/name/connext/nxtp",
      "transactionManagerAddress": "0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0",
      "safeRelayerFee": "100"
    }
  },
  "logLevel": "info",
  "natsUrl": "nats://localhost:4222",
  "authUrl": "http://localhost:5040",
  "mnemonic": "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat",
  "swapPools": [
    {
      "name": "TEST",
      "assets": [
        { "chainId": 1337, "assetId": "0x345cA3e014Aaf5dcA488057592ee47305D9B3e10" },
        { "chainId": 1338, "assetId": "0x345cA3e014Aaf5dcA488057592ee47305D9B3e10" }
      ]
    }
  ]
}
```

Run the router locally with:

`yarn workspace @connext/nxtp-router dev`

The router will now hot reload and allow easy testing/debug.

Now you can run `yarn workspace @connext/nxtp-integration test` to run integration tests against a local machine.

When you are done, you can run `yarn docker:stop:all` to halt all running services.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[sops-shield]: https://github.com/connext/nxtp/actions/workflows/test-sops.yaml/badge.svg
[sops-url]: https://github.com/connext/nxtp/actions/workflows/test-sops.yaml
[deploy-testnet-shield]: https://github.com/connext/nxtp/actions/workflows/deploy-testnet.yaml/badge.svg
[deploy-testnet-url]: https://github.com/connext/nxtp/actions/workflows/deploy-testnet.yaml
[build-test-deploy-shield]: https://github.com/connext/nxtp/actions/workflows/build-test-deploy.yml/badge.svg
[build-test-deploy-url]: https://github.com/connext/nxtp/actions/workflows/build-test-deploy.yml
[discord-shield]: https://img.shields.io/discord/454734546869551114?&logo=discord
[discord-url]: https://discord.gg/m93Sqf4
[twitter-shield]: https://img.shields.io/twitter/follow/ConnextNetwork?style=social
[twitter-url]: https://twitter.com/ConnextNetwork
[nomad-url]: https://www.nomad.xyz/
