# SDK Server

This package provides an HTTP server that allows direct interaction with our supported testnets and exposes our SDK via RESTful APIs.

It comes with a .http file located in the examples folder in this package, which can be loaded in Postman or in a VScode extension like humao.rest-client .

## Configuration

Create `config.json` or copy `config.json.example` in the root of this package (`packages/sdk-server`)

```json
{
  "network": "testnet",
  "chainConfig": {
    "4": {
      "provider": ["https://rinkeby.infura.io/v3/..."]
    },
    "5": {
      "provider": ["https://goerli.infura.io/v3/..."]
    }
  }
}
```

**_OR_**

Create a `.env` in the root of this package (`packages/sdk-server`) with the following keys:

- `NXTP_CHAIN_CONFIG`: _required_ Stringified JSON object mapping `chainId` to an array of provider URLs. Example: `'{"4":{"provider":["https://rinkeby.infura.io/v3/"]},"5": {"provider":["https://goerli.infura.io/v3/"]}}'`

- `NXTP_NETWORK`: _optional_ Override default network mainnet to any existing network(local, testnet, mainnet).
- `NXTP_NATS_URL`: _optional_ Override default NATS URL. Example: `ws://localhost:4221`
- `NXTP_AUTH_URL`: _optional_ Override default auth URL. Example: `http://localhost:5040`
- `NXTP_LOG_LEVEL`: _optional_ Override default LogLevel info. Example: `debug`
- `NXTP_SKIP_POLLING`: _optional_ skip auction waiting for testing.

## First time setup

First of all, make sure you are on the latest yarn version:

- `yarn set version berry`

You must install the dependencies of the connext workspace.
To do so, from the root of the repo, run:

- `yarn`

If you have issues, try deleting `node_modules` and `yarn.lock`. After deleting `yarn.lock` run `touch yarn.lock` since it does not like if there is no lock file.

We must now build all packages:

- `yarn build:all`

If you have issues, try running `yarn clean:all`

### Running the Server

From the root of the repo, run:

`yarn workspace @connext/sdk-server dev`
