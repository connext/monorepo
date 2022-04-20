# SDK Server

### Configuration

Create `config.json` in the root of this package (`packages/sdk-server):

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
  },
  "mnemonic": "<add mnemonic here>"
}
```

**_OR_**

Create a `.env` in the root of this package (`packages/sdk-server`) with the following keys:

- `NXTP_MNEMONIC`: \_required\* string mnemonic of the wallet you wish to connect with.

- `NXTP_CHAIN_CONFIG`: _required_ Stringified JSON object mapping `chainId` to an array of provider URLs. Example: `'{"4":{"provider":["https://rinkeby.infura.io/v3/"]},"5": {"provider":["https://goerli.infura.io/v3/"]}}'`

- `NXTP_NETWORK`: _optional_ Override default network mainnet to any existing network(local, testnet, mainnet).
- `NXTP_NATS_URL`: _optional_ Override default NATS URL. Example: `ws://localhost:4221`
- `NXTP_AUTH_URL`: _optional_ Override default auth URL. Example: `http://localhost:5040`
- `NXTP_LOG_LEVEL`: _optional_ Override default LogLevel info. Example: `debug`
- `NXTP_MESSAGING_MNEMONIC`: _optional_ Override Random messaging key.
- `NXTP_SKIP_POLLING`: _optional_ skip auction waiting for testing.

### Running the Server

From the root of the repo, run:

`yarn workspace @connext/nxtp-sdk-server dev`
