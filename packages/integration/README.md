# Integration

A test script to validate the end-to-end cross-chain transfer process.

## Setup

1. ENVIRONMENT

Create a .env file and fill in the following information:

```sh
ROUTER_MNEMONIC="<...>"
USER_MNEMONIC="<...>"
DEPLOYER_MNEMONIC="<...>"
INFURA_KEY="<...>"
```

**If you don't specify a `ROUTER_MNEMONIC`, we won't run a local router/sequencer instance. Instead, the test will be conducted using any active live counterparts.**

The `USER_MNEMONIC` can literally be any random mnemonic. While it's not necessary (the integration test will just generate a fresh random wallet), it's recommended that you specify one to use continually so as to recycle dust and save ETH on additional setup steps during execution.

You can generate a random wallet easily using node shell, assuming you have `ethers.js` installed globally (or locally)

```s
$ node
Welcome to Node.js v16.14.2.
Type ".help" for more information.
> require("ethers").Wallet.createRandom()._mnemonic().phrase
'provide tray domain smooth gentle now dad mesh artwork coast estate great'
>
```

`DEPLOYER_MNEMONIC` is only necessary if you want to run your router locally and the router hasn't been approved (on the destination domain) yet.

If you don't have an `INFURA_API_KEY`, head over to [infura.io](https://infura.io/) and make an account (it's free). It should be under Project Settings > Project ID (_not Project Secret!_). If you really don't want to use Infura, you can specify `ORIGIN_PROVIDER` and `DESTINATION_PROVIDER` directly, although it's less flexible. At the time of writing this README, the default transfer route for the test is Kovan (origin) => Rinkeby (destination).

2. FUNDING

#### With a local router

Your router's wallet (the wallet to which `ROUTER_MNEMONIC` belongs) must have some ETH supplied on both the origin and destination domains. Ultimately, once initial setup transactions are taken care of, the router _should not_ be using any ETH on the destination domain. However, it will require additional ETH on origin to fund the user agent as needed.

If you're not sure which domains to fund your router wallet for, you can check `constants.ts` under `Integration Settings`.

#### With live router

If `ROUTER_MNEMONIC` isn't specified, the `USER_MNEMONIC` will need to be pre-funded with ETH.

And that's it! No additional set up is required. All pre-flight tasking will be taken care of.

## Execution

To execute the test, just run (in NXTP root):

```s
yarn workspace @connext/nxtp-integration run test
```

NOTE: Do **NOT** run the router or sequencer separately, both will be initialized within the test itself.

## FAQ:

- Q: Do I need to run the router or sequencer separately for this to work? A: No. Both will be run inside the test, assuming a `ROUTER_MNEMONIC` is specified.
- Q: How can I save the test execution logs? A: They are saved automatically by timestamp in the ops/data folder.
- Q: Does this have to run on testnet? A: Yes.
- Q: Can I change the execution router and/or domains? A: Not yet.
- Q: Is this test intended to be run as a step in the CI pipeline? A: No.
- Q: How can I get the `DEPLOYER_MNEMONIC`? A: Ask the team.
