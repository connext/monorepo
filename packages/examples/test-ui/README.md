# Test UI

## Local Development

### Configuration

Create a `.env` in the root of this package (`packages/test-ui`) with the following keys:

- `REACT_APP_CHAIN_CONFIG`: _required_ Stringified JSON object mapping `chainId` to an array of provider URLs. Example: `'{"4":{"provider":["https://rinkeby.infura.io/v3/"]},"5":{"provider":["https://goerli.infura.io/v3/"]}}'`

- `REACT_APP_SWAP_CONFIG`: _required_ Stringified JSON array of objects representing a cross-chain swap pool. Example: `'[{"name":"TEST","assets":{"4":"0x9aC2c46d7AcC21c881154D57c0Dc1c55a3139198","5":"0x8a1Cad3703E0beAe0e0237369B4fcD04228d1682"}}]'`

- `REACT_APP_NATS_URL_OVERRIDE`: _optional_ Override default NATS URL. Example: `ws://localhost:4221`

- `REACT_APP_AUTH_URL_OVERRIDE`: _optional_ Override default auth URL. Example: `http://localhost:5040`

### Running the App

From the root of the repo, run:

`yarn workspace @connext/nxtp-test-ui dev`
