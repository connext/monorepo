<div align="center">
  <!-- PROJECT LOGO -->
  <a href="https://github.com/connext/monorepo">
    <img src="https://github.com/connext/brand/blob/main/connext__Logo__BlackText_MultiColor.png?raw=true" alt="Logo" width="320" height="80">
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
    <a href="https://github.com/connext/monorepo/issues">Report Bug</a>
    <br />
    <a href="https://immunefi.com/bounty/connext/">Bug Bounty Program</a>
    <br />
    <br />
    <a href="https://github.com/connext/monorepo/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-connext">About Connext </a>
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
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details> -->

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

## About Connext

Connext is a modular stack for trust-minimized, generalized communication between blockchains. [Read More](https://docs.connext.network/core-concepts/understanding-connext)

### Architecture

- [adapters](https://github.com/connext/monorepo/tree/main/packages/adapters) - Wrappers around external modules. These adapters can be shared between different packages.

  - [Cache](https://github.com/connext/monorepo/tree/main/packages/adapters/cache) is a wrapper around all the redis based caches that are used.
  - [Database](https://github.com/connext/monorepo/tree/main/packages/adapters/database) is implementation of schema and client for the database.
  - [Subrgaph](https://github.com/connext/monorepo/tree/main/packages/adapters/subgraph) includes graphclient implementation and reader functions for subgraph.
  - [TxService](https://github.com/connext/monorepo/tree/main/packages/adapters/txservice) resiliently attempts to send transactions to chain (with retries, etc.) and is used to read and write to RPC providers, and has fallback providers if needed. Fallbacks can be defined as arrays and this way we can provide resiliency in case of failure
  - [Web3Signer](https://github.com/connext/monorepo/tree/main/packages/adapters/web3signer) is a wrapper around Web3Signer, which is a secure way of signing which does not require to include mnemonics in the app itself.

- [agents](https://github.com/connext/monorepo/tree/main/packages/agents) - Core infra Hosted services for Functionality and UX.

  - [Cartographer](https://github.com/connext/monorepo/tree/main/packages/agents/cartographer) is our chain indexer, which indexes from subgraph and provides an API to query raw and computed data.
  - [Lighthouse](https://github.com/connext/monorepo/tree/main/packages/agents/lighthouse) is an implementation for execution layer.
  - [Relayer](https://github.com/connext/monorepo/tree/main/packages/agents/relayer) is an implementatino of a relayer in case we can't use Gelato
  - [Router](https://github.com/connext/monorepo/tree/main/packages/router) - listens for events from messaging service and subgraph, and then dispatches transactions to txService
  - [SDK](https://github.com/connext/monorepo/tree/main/packages/agents/sdk) - is a JS wrapper around the contract calls themselves and can be used by integrations
  - [Sequencer](https://github.com/connext/monorepo/tree/main/packages/agents/sequencer) - is the agent module which is in charge of sourcing bids from routers and puts fast liquidity bids onto the chain itself.

- [deployments](https://github.com/connext/monorepo/tree/main/packages/deployments)

  - [Contracts](https://github.com/connext/monorepo/tree/main/packages/deployments/contracts) - Contracts are the contracts that we deploy and the deployment scripts
  - [Subgraph](https://github.com/connext/monorepo/tree/main/packages/deployments/subgraph) is all the subgraph source code to define all the mappings and contains all the configurations to deploy to different graph hosted services or third party graph providers

- [examples](https://github.com/connext/monorepo/tree/main/packages/examples) - these are not used in production, but contains ways to use the SDK that are illustrative of how to integrate Connext
- [integration](https://github.com/connext/monorepo/tree/main/packages/integration) - Utilities for integration test
- [utils](https://github.com/connext/monorepo/tree/main/packages/utils) - Collection of helper functions that are shared thoughout the different packages

<p align="right">(<a href="#top">back to top</a>)</p>

## First time setup

Use Node verision `18.x`.
And Make sure you are on the latest yarn version:

- `yarn set version berry`

Try running `yarn` to update everything. If you have issues, try deleting `node_modules` and `yarn.lock`. After deleting `yarn.lock` run `touch yarn.lock` since it does not like if there is no lock file.

# Dev Environment

Setup Environment, by initiating the build:

- `yarn && yarn build:all`

Here `yarn`: Install deps, create symlinks, hoist packages. & `yarn build:all`: Build all packages.

And now you are all ready to interact with Monorepo.

Individual commands can be run against workspaces as so (example for `nxtp-utils` package):

`yarn workspace @connext/nxtp-utils test`

You should be able to do everything from the root and not need to go into the individual package dirs. For example, adding an npm package:

`yarn workspace @connext/nxtp-txservice add ethers`

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

Project Link: [https://github.com/connext/monorepo](https://github.com/connext/monorepo)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[sops-shield]: https://github.com/connext/monorepo/actions/workflows/test-sops.yaml/badge.svg
[sops-url]: https://github.com/connext/monorepo/actions/workflows/test-sops.yaml
[deploy-testnet-shield]: https://github.com/connext/monorepo/actions/workflows/deploy-testnet.yaml/badge.svg
[deploy-testnet-url]: https://github.com/connext/monorepo/actions/workflows/deploy-testnet.yaml
[build-test-deploy-shield]: https://github.com/connext/monorepo/actions/workflows/build-test-deploy.yml/badge.svg
[build-test-deploy-url]: https://github.com/connext/monorepo/actions/workflows/build-test-deploy.yml
[discord-shield]: https://img.shields.io/discord/454734546869551114?&logo=discord
[discord-url]: https://discord.gg/m93Sqf4
[twitter-shield]: https://img.shields.io/twitter/follow/ConnextNetwork?style=social
[twitter-url]: https://twitter.com/ConnextNetwork
