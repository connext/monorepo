# Test UI

### Add Token for Swap
 You can add your own custom token for swap in test-ui by following the given format in config and create a pull request to main.

## Local Development

### ENV Configuration

Create a `.env` in the root of this package (`packages/test-ui`) with the following keys:

- `REACT_APP_CHAIN_CONFIG`: _required_ Stringified JSON object mapping `chainId` to an array of provider URLs. Example: `'{"4":{"provider":["https://rinkeby.infura.io/v3/"]},"5":{"provider":["https://goerli.infura.io/v3/"]}}'`

- `REACT_APP_NATS_URL_OVERRIDE`: _optional_ Override default NATS URL. Example: `ws://localhost:4221`

- `REACT_APP_AUTH_URL_OVERRIDE`: _optional_ Override default auth URL. Example: `http://localhost:5040`

### Running the App

From the root of the repo, run:

`yarn workspace @connext/nxtp-test-ui dev`
