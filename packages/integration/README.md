# Integration

Contains the integration and load testing logic for nxtp.

## Running the tests

### Local router, chains, and messaging

Update your `packages/router/config.json` to have a proper local config, i.e.:

```json
{
  "adminToken": "blahblah",
  "chainConfig": {
    "1337": {
      "providers": ["http://localhost:8545"],
      "confirmations": 1,
      "subgraph": "http://localhost:8010/subgraphs/name/connext/nxtp",
      "transactionManagerAddress": "0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0"
    },
    "1338": {
      "providers": ["http://localhost:8546"],
      "confirmations": 1,
      "subgraph": "http://localhost:9010/subgraphs/name/connext/nxtp",
      "transactionManagerAddress": "0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0"
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

Start the chains and messaging with:

```
yarn workspace @connext/nxtp-integration docker:services:up
```

Make sure you have added your router address to the `TEST_ROUTERS` array in `packages/contracts/deploy.ts` (this will ensure the router has liquidity and both the router and the asset are whitelisted), then deploy + setup the contracts:

```
bash setup-integration-test.sh
```

The start the router:

```
yarn workspace @connext/nxtp-router dev
```

Make sure you put a similarly structured config in your `packages/integration/ops/config/load/config.json` (can use the same mnemonic as router, make sure accounts[0] is funded):

```json
{
  "adminToken": "blahblah",
  "chainConfig": {
    "1337": {
      "providers": ["http://localhost:8545"],
      "confirmations": 1,
      "subgraph": "http://localhost:8010/subgraphs/name/connext/nxtp",
      "transactionManagerAddress": "0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0",
      "safeRelayerFee": 100
    },
    "1338": {
      "providers": ["http://localhost:8546"],
      "confirmations": 1,
      "subgraph": "http://localhost:9010/subgraphs/name/connext/nxtp",
      "transactionManagerAddress": "0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0",
      "safeRelayerFee": 100
    }
  },
  "logLevel": "info",
  "natsUrl": "nats://localhost:4222",
  "authUrl": "http://localhost:5040",
  "mnemonic": "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"
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

Then run the tests using the appropriate script. For example, to run the router concurrency tests, use:

```
yarn workspace @connext/nxtp-integration concurrency:router
```

### Running Web3Signer locally and testing integration

Web3Signer is used to securely host private keys for signing transactions. (see: https://docs.web3signer.consensys.net/en/latest/)

A sample key file is provided in ops/config/router/. To create a docker container to host web3signer locally, use:

```
yarn workspace @connext/nxtp-integration docker:web3signer:up
```

To run the router with this test integration instance of web3signer, add to the router config:

```
"web3SignerUrl": "http://0.0.0.0:9000"
```

Remove the "mnemonic" entry from the config if you have one. Make sure the docker instance is running and web3signer is reachable.
