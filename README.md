<div align="center">
  <!-- PROJECT LOGO -->
  <a href="https://github.com/connext/nxtp">
    <img src="https://images.squarespace-cdn.com/content/v1/619f86b8de2c6f4f7fa201c0/8eaeca35-ccf3-495f-9e9a-19fbec796187/connext__Logo+%2B+WhiteText+MultiColor.png?format=1500w" alt="Logo" width="320" height="80">
  </a>

[![Test Sops][sops-shield]][sops-url] [![Deploy Testnet][deploy-testnet-shield]][deploy-testnet-url] [![Build Test Deploy][build-test-deploy-shield]][build-test-deploy-url]

[![Discord][discord-shield]][discord-url] [![Twitter][twitter-shield]][twitter-url]

  <br />

  <h3 align="center">About Connext</h3>
  <h4 align="center">Connext is public infrastructure powering fast, trust-minimized communication between blockchains.</h4>

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

| Layer                            | Protocol/Stakeholders                  |
| -------------------------------- | -------------------------------------- |
| `Application Layer`              | `Crosschain Applications (xApps), SDK` |
| `Liquidity Layer`                | `Routers, Sequencer`                   |
| `Messaging - Execution Layer`    | `Lighthouse, Sequencer`                |
| `Messaging - Verification Layer` | `Watcher`                              |
| `Messaging - Transport Layer`    | `AMBs`                                 |

## About NXTP

Connext is public infrastructure powering fast, trust-minimized communication between blockchains. [Read More](https://docs.connext.network/core-concepts/understanding-connext)

### Architecture

- [adapters](https://github.com/connext/nxtp/tree/main/packages/adapters) - Wrappers around external modules. These adapters can be shared between different packages.

  - [Cache](https://github.com/connext/nxtp/tree/main/packages/adapters/cache) is a wrapper around all the redis based caches that are used.
  - [Database](https://github.com/connext/nxtp/tree/main/packages/adapters/database) is implementation of schema and client for the database.
  - [Subrgaph](https://github.com/connext/nxtp/tree/main/packages/adapters/subgraph) includes graphclient implementation and reader functions for subgraph.
  - [TxService](https://github.com/connext/nxtp/tree/main/packages/adapters/txservice) resiliently attempts to send transactions to chain (with retries, etc.) and is used to read and write to RPC providers, and has fallback providers if needed. Fallbacks can be defined as arrays and this way we can provide resiliency in case of failure
  - [Web3Signer](https://github.com/connext/nxtp/tree/main/packages/adapters/web3signer) is a wrapper around Web3Signer, which is a secure way of signing which does not require to include mnemonics in the app itself.

- [agents](https://github.com/connext/nxtp/tree/main/packages/agents) - Core infra Hosted services for Functionality and UX.

  - [Cartographer](https://github.com/connext/nxtp/tree/main/packages/agents/cartographer) is our chain indexer, which indexes from subgraph and provides an API to query raw and computed data.
  - [Lighthouse](https://github.com/connext/nxtp/tree/main/packages/agents/lighthouse) is an implementation for execution layer.
  - [Relayer](https://github.com/connext/nxtp/tree/main/packages/agents/relayer is an implementatino of a relayer in case we can't use Gelato
  - [Router](https://github.com/connext/nxtp/tree/main/packages/router) - listens for events from messaging service and subgraph, and then dispatches transactions to txService
  - [SDK](https://github.com/connext/nxtp/tree/main/packages/agents/sdk) - is a JS wrapper around the contract calls themselves and can be used by integrations
  - [Sequencer](https://github.com/connext/nxtp/tree/main/packages/agents/sequencer) - is the agent module which is in charge of sourcing bids from routers and puts fast liquidity bids onto the chain itself.

- [deployments](https://github.com/connext/nxtp/tree/main/packages/deployments)

  - [Contracts](https://github.com/connext/nxtp/tree/main/packages/deployments/contracts) - Contracts are the contracts that we deploy and the deployment scripts
  - [Subgraph](https://github.com/connext/nxtp/tree/main/packages/deployments/subgraph) is all the subgraph source code to define all the mappings and contains all the configurations to deploy to different graph hosted services or third party graph providers

- [examples](https://github.com/connext/nxtp/tree/main/packages/examples) - these are not used in production, but contains ways to use the SDK that are illustrative of how to integrate NXTP
- [integration](https://github.com/connext/nxtp/tree/main/packages/integration) - Utilities for integration test
- [utils](https://github.com/connext/nxtp/tree/main/packages/utils) - Collection of helper functions that are shared thoughout the different packages

<p align="right">(<a href="#top">back to top</a>)</p>

## First time setup

Use Node verision `18.x`.
And Make sure you are on the latest yarn version:

- `yarn set version berry`

Try running `yarn` to update everything. If you have issues, try deleting `node_modules` and `yarn.lock`. After deleting `yarn.lock` run `touch yarn.lock` since it does not like if there is no lock file.

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
  - Use `X.X.X-beta.N` for Amarok releases from `production` branch and `X.X.X-alpha.N` for Amarok releases from `main` branch.
- Commit and add a tag matching the version: `git commit -am "<version>" && git tag -am "<version>"`
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
