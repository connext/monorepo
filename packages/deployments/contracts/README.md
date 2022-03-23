# Nxtp Contracts

## System Overview

### Video Walkthrough

TODO

### TLDR

TODO

### Transaction Lifecycle

TODO

### Key Principles

TODO

### Detailed Flow

TODO

### Offline Protections

TODO

## Error Codes

TODO

## Development

### Building

First, install and build all the packages from the root:

```sh
nxtp$ yarn && yarn build:all
```

Then, if you are only making updates to the contracts package, rebuild by running:

```sh
nxtp$ yarn workspace @connext/nxtp-contracts build
```

### Running the tests

This repository uses [foundry](https://github.com/gakonst/foundry) for unit tests and [hardhat](https://hardhat.org) for integration tests.

To run the contract tests, run the appropriate command:

```sh
$ yarn workspace @connext/nxtp-contracts test:forge # runs unit tests
$ yarn workspace @connext/nxtp-contracts test:hardhat # runs integration tests
$ yarn workspace @connext/nxtp-contracts test # runs both tests
```

Running the hardhat tests will output the gas estimates for the integration tests. You can generate a coverage output as well, but as it is not supported by foundry it is not considered to be accurate.

To run the coverage tests, run the following from the root directory:

```sh
nxtp$ yarn workspace @connext/nxtp-contracts coverage
```

### Contract Deployment

Contracts are deployed via the [hardhat deploy](https://hardhat.org/plugins/hardhat-deploy.html). Before deploying any contracts, make sure the [deploy](https://github.com/connext/nxtp/blob/main/modules/contracts/deploy/deploy.ts) script used is up to date with the contracts you will need deployed.

To deploy the contracts:

1. Obtain a funded mnemonic and provider url (if there is no URL in the default [hardhat config](./hardhat.config.ts)) for the network(s) you would like to deploy the contracts to. The mnemonic chosen will be a system admin, who can remove or add routers and assets so make sure to keep it handy. You may also add an api key for etherscan if you plan to verify the contracts:

```sh
export MNEMONIC="<YOUR_MNEMONIC_HERE>"
export ETH_PROVIDER_URL="<YOUR_PROVIDER_URL_HERE>"
export ETHERSCAN_API_KEY="<ETHERSCAN_API_KEY_HERE>" # optional, but highly recommended
```

You can also add a `.env` to the `packages/contracts` dir with the above env vars.

2. Once the proper environment variables are added to your environment, you can begin the contract deployments by running the following from the root directory:

```sh
yarn workspace @connext/nxtp-contracts hardhat deploy --network \<NETWORK_NAME\> # e.g. yarn workspace @connext/nxtp-contracts deploy --network goerli
```

You should use the `NETWORK_NAME` that corresponds to the correct network within the `hardhat.config.ts` file.

**NOTE:** You will have to run the `enroll-remote` task if deploying custom bridge routers.

3. After the contracts are deployed, you must enroll the remote handlers. This is done so the handlers know to accept messages from each other across chains:

```sh
yarn workspace @connext/nxtp-contracts hardhat enroll-handler --handler \<REMOTE_HANDLER_ADDR\> --chain \<REMOTE_CHAIN_ID\> --network \<NETWORK_NAME\>
```

**NOTE:** This step should be removed from the process once the router responsibility is handed to the nomad team.

4. (optional) To verify the contracts (works with Etherscan-based networks):

```sh
yarn workspace @connext/nxtp-contracts hardhat etherscan-verify --solc-input --network \<NETWORK_NAME\>
```

5. Once the contracts have been deployed, export them using:

```sh
yarn workspace @connext/nxtp-contracts export
```

Congratulations! You have deployed the contracts. To configure them properly, see the Amarok Tasks below.

**NOTE:** Once you have deployed the contracts, you will then need to update (if necessary) and redeploy the subgraphs. See [here](https://github.com/connext/nxtp/tree/main/modules/subgraph) for details.

## How to set price information in ConnextPriceOracle

Price Oracle fetches token price from chainlink protocol and decentralized exchanges such as uniswap, sushiswap, pancakeswap, etc.
There are two types of tokens. First ones are listed on Chainlink Protocol. But others aren't listed on Chainlink protocol.
You can get prices from chainlink by setting aggregators for tokens listed on Chainlink. See [here](https://docs.chain.link/docs/ethereum-addresses/)
You can get prices from DEx by setting price records for tokens not listed on Chainlink.

1. To use chainlink protocol, you need to set aggregators for tokens.

```sh
yarn workspace @connext/nxtp-contracts hardhat set-aggregator --token-addresses TOKEN_ADDRESSES --sources CHAINLINK_SOURCES --network NETWORK_NAME
# e.g. yarn workspace @connext/nxtp-contracts hardhat set-aggregator --token-addresses 0xc778417e063141139fce010982780140aa0cd5ab --sources 0x8a753747a1fa494ec906ce90e9f37563a8af630e --network rinkeby
```

2. To use decentralized exchanges, you need to set price records for tokens.

```sh
yarn workspace @connext/nxtp-contracts hardhat set-dex-price --token TOKEN_ADDRESS --base-token BASE_TOKEN_ADDRESS --lp-token LP_TOKEN_ADDRESS --active ACTIVE --network NETWORK
# e.g. yarn workspace @connext/nxtp-contracts hardhat set-dex-price --token 0x4AD6C49FC206C8070915151F31EAbE4c70016F55 --base-token 0xc778417E063141139Fce010982780140Aa0cD5Ab --lp-token 0x21F644B1433D1744a84dc0616C0BFfC04D3A45eb --active true --network rinkeby

# 0x4AD6C49FC206C8070915151F31EAbE4c70016F55: DogeToken on Rinkeby
# 0xc778417E063141139Fce010982780140Aa0cD5Ab: WETH on Rinkeby
# 0x21F644B1433D1744a84dc0616C0BFfC04D3A45eb: WETH-DOGE LP on Rinkeby


'TOKEN_ADDRESS': The token address that you want to fetch price of.

'BASE_TOKEN_ADDRESS': The base token address used to add liquidity on DEX. Its price should be able to be fetched from Chainlink protocol.

'LP_TOKEN_ADDRESS': TOKEN_ADDRESS-BASE_TOKEN_ADDRESS The pair address created by factory of DEX.

'ACTIVE': Shows price record status. If true, the price record will work.
```

3. To set token price directly and use it, you need to set direct price for tokens.

```sh
yarn workspace @connext/nxtp-contracts hardhat set-direct-price --token TOKEN_ADDRESS --price TOKEN_PRICE --network NETWORK
# e.g. yarn workspace @connext/nxtp-contracts hardhat set-direct-price --token 0x4AD6C49FC206C8070915151F31EAbE4c70016F55 --price 1000000000000000000 --network rinkeby

'TOKEN_ADDRESS': The token address that you want to fetch price of.

'TOKEN_PRICE': The direct price of token.
```

## Helper Tasks

There are helper tasks defined in the [`./src/tasks`](./src/tasks) directory. These can be run using the following example command structure:

```sh
yarn workspace @connext/nxtp-contracts hardhat add-liquidity --network goerli --amount 2500000000000000000000000 --router 0xDc150c5Db2cD1d1d8e505F824aBd90aEF887caC6 --asset-id 0x8a1Cad3703E0beAe0e0237369B4fcD04228d1682
```

- Deploy Router Factory

```sh
yarn workspace @connext/nxtp-contracts hardhat deploy-router-factory --network <Network-Name> --signer <Router Signer> --recipient <Router Recipient>
```

- Create Router Contract

```sh
yarn workspace @connext/nxtp-contracts hardhat create-router --network <Network-Name> --signer <Router Signer> --recipient <Router Recipient>
```

- whitelist command for multiple networks

```sh
yarn workspace @connext/nxtp-contracts whitelist <router-address>
```

- create-router for RouterContract multiple network in one-step

```sh
yarn workspace @connext/nxtp-contracts create-router <signer-address> <recipient-address>
```

### Amarok Tasks

- Ensure there are local token representations (i.e. a mad\* asset is deployed n the given network for the token you supply):

```sh
yarn workspace @connext/nxtp-contracts hardhat ensure-local --domain \<CANONICAL_DOMAIN\> --canonical \<TOKEN_ADDR_ON_CANONICAL_DOMAIN\> --network \<NETWORK_TO_ENSURE_LOCAL_ON\>
```

**NOTE** This task should be removed once using the nomad token registry

- Setup the asset on the `Connext` to ensure the routers can supply liquidity for all local assets, the correct adopted asset is set, and configure the stable swap pool:

```sh
yarn workspace @connext/nxtp-contracts hardhat setup-asset --canonical \<TOKEN_ADDR_ON_CANONICAL_DOMAIN\> --domain \<CANONICAL_DOMAIN\> --adopted \<ADOPTED_ADDR_ON_NETWORK\> --pool \<SWAP_LOCAL_FOR_ADOPTED\> --network \<NETWORK\>
```

- Prepare transaction from sender side

```sh
yarn workspace @connext/nxtp-contracts hardhat prepare --transacting-asset-id 0xe71678794fff8846bFF855f716b0Ce9d9a78E844 --amount 10000000000000000000 --recipient 0x5A9e792143bf2708b4765C144451dCa54f559a19 --origin-domain 3000 --destination-domain 2000 --tx-manager-address 0x35Ca61d8D9da6d6F5F4B256132955A3a2723BB19 --network kovan
```

- Track a nomad message from the origin domain (can use the `prepare` transaction hash)

```sh
yarn workspace @connext/nxtp-contracts hardhat trace-message --transaction \<TRANSACTION_HASH\> --destination \<DESTINATION_DOMAIN\> --network \<ORIGIN_NETWORK_NAME\>
```
