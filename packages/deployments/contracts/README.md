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

<aside>
💡 Before deploying, you should ensure that precompiles available on the chain cannot be abused, specifically by the arbitrary calldata supported by the `IXReceiver` contracts called in `execute`.

Last updated deployment guide on: May 3 2022

</aside>

<aside>
⚠️ When using any tasks that require the address of an upgradeable contract, make sure you use the address stored as the `[ContractName]UpgradeBeaconProxy` address, not the implementation address. Keep in mind staging deployments will append `Staging` to the end of the deployed artifact name as well

</aside>

Contracts are deployed via the [hardhat deploy](https://hardhat.org/plugins/hardhat-deploy.html) plugin. Before deploying any contracts, make sure the [deploy](https://github.com/connext/nxtp/blob/main/modules/contracts/deploy/deploy.ts) script used is up to date with the contracts you will need deployed (see note above!). To deploy the contracts:

1.  Obtain a funded mnemonic and provider url (if there is no URL in the default hardhat config) for the network(s) you would like to deploy the contracts to. The mnemonic chosen will be a system admin, who can remove or add routers and assets so make sure to keep it handy. You may also add an api key for etherscan if you plan to verify the contracts:

    ```bash
    export MNEMONIC="<YOUR_MNEMONIC_HERE>"
    export ETH_PROVIDER_URL="<YOUR_PROVIDER_URL_HERE>"
    export ETHERSCAN_API_KEY="<ETHERSCAN_API_KEY_HERE>" # optional, but highly recommended
    export ENV="<ENV>" # should be staging or production, if not supplied will default to staging
    ```

    You can also add a `.env` to the `packages/contracts` dir with the above env vars.

2.  Once the proper environment variables are added to your environment, you can begin the contract deployments by running the following from the root directory:

    ```bash
    $ yarn workspace @connext/nxtp-contracts hardhat deploy --network \<NETWORK_NAME\>
    # e.g. yarn workspace @connext/nxtp-contracts deploy --network goerli
    ```

    You should use the `NETWORK_NAME` that corresponds to the correct network within the `hardhat.config.ts` file.

Congratulations! You have deployed a new set of amarok contracts. Now, we have to configure them.

1. You must enroll the remote handlers using the `enroll-handlers` task. This is done so the handlers know to accept messages from each other across domains, and must be done on each router. You can specify a `type` as the remote handlers you want to enroll (may be `all`, `promise`, `relayer`), and the `chains` you want to enroll the remotes for

   ```bash
   $ yarn workspace @connext/nxtp-contracts hardhat enroll-handler --type \<HANDLER_TYPE\> --chains \<REMOTE_CHAIN_IDS\> --network \<NETWORK_NAME\>
   # e.g. for registering all rinkeby, goerli handlers on kovan:
   # ywc hardhat enroll-handlers --type all --chains "4,5" --network kovan
   ```

2. You must ensure there is a local `mad*` asset on the destination domain (this is the asset routers supply liquidity in). The best way to do this on testnets is to use the `enroll-custom` task. This task must be performed by the owner of the `TokenRegistry` and will list the specified token (defaults to the `TestERC20` on the network) as the `mad*` asset. It’s best to enroll the `TestERC20` as the local token so anyone can mint the asset for testing purposes. This task should be run on all domains _except_ the canonical domain of the token (i.e. for our testnet setup, kovan is the canonical domain, so the task is run on all networks except kovan).

   ```bash
   $ yarn workspace @connext/nxtp-contracts hardhat enroll-custom --domain \<CANONICAL_TOKEN_DOMAIN\> --canonical \<TOKEN_ADDR_ON_CANONICAL_DOMAIN\> --network \<NETWORK_TO_ENSURE_LOCAL_ON\>
   # i.e. on rinkeby with kovan canonical you would run:
   # ywc hardhat enroll-custom --domain 2221 --canonical "TEST_ERC20_ADDR_ON_KOVAN" --network rinkeby
   ```

   When you set the asset up using `ensure-local`, the only person that can `mint` the token
   is the deployer.

3. Once you have enrolled the handlers and set up the local assets, you should run the `preflight` task. The preflight task will do the following in an idempotent way:

   - Allowlist a specified router
   - Setup an asset
   - Add router liquidity (by minting tokens, so a mintable token must be enrolled as the local token)
   - Allowlist a specified relayer

   You can provide these values via a `.env` file, via arguments to the hardhat task, or a combination of the two. Sample:

   ```bash
   # Sample .env file contents for preflight
   ROUTER_ADDRESS= # router to allowlist + add liq for
   CANONICAL_DOMAIN= # on our current testnet setup, is kovan domain
   CANONICAL_TOKEN= # on our current testnet setup, is TestERC20 on kovan
   RELAYER_ADDRESS= # relayer to allowlist
   ENV= # staging or production, defaults to staging
   ```

   See [here](https://github.com/connext/nxtp/blob/819cdd7fe2cd164d8b14160a34424d640c9f21ac/packages/deployments/contracts/src/tasks/preflight.ts#L6-L12) for details about the command line arguments.

**NOTE: You can do all of these tasks in separate tasks as well!**

**Upgrading** **Contracts**

The `Connext` is using `TransparentProxy` of OpenZeppelin. When executing the deploy script using [hardhat deploy](https://hardhat.org/plugins/hardhat-deploy.html) plugin, it will automatically detect if the proxy and implementation must be deployed, or if the proxy must simply be upgraded. The contracts (`TokenRegistry`) are using a custom upgrade scheme, but the deploy script will automatically detect if fresh deployments or only upgrades are needed.

If want to deploy completely new proxy contracts, remove the `.json` files from the `deployments` directory. (ie. `TokenRegistry`, `TokenRegistryUpgradeBeacon`, `TokenRegistryUpgradeBeaconProxy`, `ConnextHandler_Implementation`, `ConnextHandler_Proxy`), and execute the deploy script again.

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

## Other Helper Tasks

There are helper tasks defined in the [`./src/tasks`](./src/tasks) directory. These can be run using the following example command structure:

```sh
yarn workspace @connext/nxtp-contracts hardhat add-liquidity --network goerli --amount 2500000000000000000000000 --router 0xDc150c5Db2cD1d1d8e505F824aBd90aEF887caC6 --asset-id 0x8a1Cad3703E0beAe0e0237369B4fcD04228d1682
```

### allowlist

Allowlist command for a single router across multiple networks

```bash
yarn workspace @connext/nxtp-contracts allowlist <router-address>
```

### read-balances

Check the current balances of a wallet's accounts. Omit `asset` to check native token.

```bash
# Check ETH balance
yarn workspace @connext/nxtp-contracts hardhat read-balances --network \<NETWORK\> --asset \<TOKEN_ADDR\>
```

### dust

`dust` allows you to dust (native gas token) all the accounts of a wallet with a specified amount. It will dust from a single account (signers[0]) so the user should make sure they have enough founds. The task will warn you otherwise.

```bash
$ yarn workspace @connext/nxtp-contracts hardhat dust --amount \<AMT_IN_REAL_UNITS\> --network \<NETWORK\>
```

In tandem with the `mint` task, this task is useful for preparing for stress testing multiple accounts in parallel using the `xcall` task.

### mint

`mint` allows you to mint any token to a specified account:

```bash
$ yarn workspace @connext/nxtp-contracts hardhat mint --amount \<AMT_IN_REAL_UNITS\> --recipient \<RECIPIENT\> --asset \<TOKEN_ADDR\> --network \<NETWORK\>
# assetid and to are optional (will default to TestERC20 and mnemonic account[0], respectively)
# amount should be in ETH-like units (i.e. 1 = 1 ETH)
```

This task can be used to mint tokens to all accounts of a wallet by omitting the `--recipient` param. The max number of accounts used is specified in `hardhat.config.ts` under each chain's `accounts: { mnemonic, count: 100 }` (default 20 if unspecified)

### xcall

`xcall` allows you to create a crosschain transaction via CLI:

```bash
$ yarn workspace @connext/nxtp-contracts hardhat xcall --transacting-asset-id \<TOKEN_ADDR\> --amount \<AMT_IN_REAL_UNITS\> --network \<NETWORK\> --destination-domain \<DOMAIN_ID\>
```

Example using real values:

```bash
$ yarn workspace @connext/nxtp-contracts hardhat xcall --transacting-asset-id 0x3FFc03F05D1869f493c7dbf913E636C6280e0ff9 --amount 100000000000000000 --network rinkeby --destination-domain 3331
```

This task can be used to run load tests by specifying the number of `--runs`. It can also be configured to run stress tests with multiple accounts in parallel, simulating "bursty" requests to the network.

The max number of accounts used is specified in `hardhat.config.ts` under each chain's `accounts: { mnemonic, count: 100 }` (default 20 if unspecified). The `--accounts` flag determines the first N of these accounts to use for this task.

### renounce-ownership

`renounce-ownership` allows you to relinquish allowlist privileges (though it will take a week to take effect):

```bash
$ yarn workspace @connext/nxtp-contracts hardhat renounce-ownership --type \<TYPE\> --network \<NETWORK\>
# type can be either "router" or "asset" and refers to the privileges you are relinquishing
```

### add-liquidity

`add-liquidity` allows you to add liquidity on behalf of a router:

```bash
$ yarn workspace @connext/nxtp-contracts hardhat add-liquidity --router \<ROUTER\> --asset-id \<TOKEN\> --amount \<AMOUNT\> --network \<NETWORK\>
# amount is in ETH units (i.e. 1 = 1 ETH)
# the router should be supplying liquidity in the local (mad*) asset
```

## Load Testing

Using `dust`, `mint`, and `xcall`, we can run load tests purely through hardhat tasks.

_Config_

- Ensure `.env` is filled out with the correct
  - `ENV` to use which environment's contracts (staging or production).
  - `ETH_PROVIDER_URL` that matches the `--network` to target (rinkeby in the examples below).
- in `hardhat.config.ts`, specify the number of accounts that should be involved
  ```
  rinkeby: {
     accounts: { mnemonic, count: 10 },
     ...
  }
  ```

_Funding_

Each account needs to have enough gas to run the desired number of xcalls (`--runs`) and a balance of TEST tokens to use for the load test.

To check current balances:

```bash
# Check ETH balances
yarn workspace @connext/nxtp-contracts hardhat read-balances --network rinkeby
```

```bash
# Check TEST balances
yarn workspace @connext/nxtp-contracts hardhat read-balances --network rinkeby --asset 0x3FFc03F05D1869f493c7dbf913E636C6280e0ff9
```

_Dust_

Run the `dust` task to distribute funds to the accounts that will be used in the load test. It will throw if there aren't enough funds in the first account (`getSigners[0]`) to cover the complete distribution. There should also be some extra gas buffer on top of the minimum needed to account for transaction fees.

Using `--minimum-only true` will cause the task to dust accounts _up to_ the `amount` and ignore accounts that already have sufficient funds.

```bash
# Top up each account with <0.5 ETH to exactly 0.5 ETH.
$ yarn workspace @connext/nxtp-contracts hardhat dust --amount 0.5 --network rinkeby --minimum-only true
```

_Mint_

Run the `mint` task to mint an appropriate number of TestERC20 tokens to each account.

Using `--minimum-only true` will cause the task to mint accounts _up to_ the `amount` and ignore accounts that already have sufficient funds.

Tip: Just mint a ton of TEST to each account once so this task doesn't have to be run again.

```bash
# Mint 100_000_000 TEST to each account
$ yarn workspace @connext/nxtp-contracts hardhat mint --amount 100000000 --network rinkeby
```

_XCall_

Run the `xcall` task with desired concurrency and iterations.

Note: `xcall` takes `--amount` in the token's base units.

```bash
# Run xcall 10 times with 20 concurrent accounts, sending 1 TEST each time
$ yarn workspace @connext/nxtp-contracts hardhat xcall --transacting-asset-id 0x3FFc03F05D1869f493c7dbf913E636C6280e0ff9 --amount 1000000000000000000 --network rinkeby --destination-domain 3331 --runs 10 --accounts 20
```
