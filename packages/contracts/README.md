# Nxtp Contracts

## System Overview

### Video Walkthrough

[![Security walkthrough video](https://img.youtube.com/vi/ABEOIKzEshA/0.jpg)](https://www.youtube.com/watch?v=ABEOIKzEshA)

### TLDR

NXTP is designed to facilitate crosschain transactions via simple atomic swaps where one party provides the liquidity of `assetA` on `chainA` and the other provides the liquidity of `assetB` on `chainB`.

There are two main offchain agents:

1. **User**: The person initiating the crosschain transaction. Their ultimate desire is to move `assetA` on `chainA` to `assetB` on `chainB`. They are willing to pay a fee denominated in `assetA` on `chainA` to accomplish this, and may want to execute some contract call with `assetB` on `chainB` when they transfer. The system does not make any assumptions about their liveness or their ability to maintain a data store.
2. **Router**: The person providing liquidity to facilitate crosschain transactions. Routers earn fees on their available liquidity of `assetB` on `chainB` (continuing the above example), and they are willing to accept a fee denominated in `assetA` on `chainA`. There are no imposed storage requirements, though a router is assumed to be online through the duration of the transfer acceptance (via participation in an auction) to the provision of liquidity on the receiver chain.

When using NXTP to perform a crosschain swap, a user first locks liquidity of `assetA` on `chainA`, waits for the router to lock `assetB` on `chainB`, and finally is able to unlock the funds by providing a signature and submitting it to a contract that exists on `chainB`. The router can use this same signature to unlock the funds the user locked on `chainA`. If something goes wrong, or the payment expires, the transfer may also be cancelled, and the funds returned to their original owner.

### Transaction Lifecycle

![HighLevelFlow](https://github.com/connext/nxtp/blob/main/packages/documentation/assets/HighLevelFlow.png)

Transactions go through three phases:

1. **Route Auction**: User broadcasts to our network signalling their desired route. Routers respond with sealed bids containing commitments to fulfilling the transaction within a certain time and price range. This step allows the user to select which router will participate in the transaction.
2. **Prepare**: Once the auction is completed, the transaction can be prepared. The user submits a transaction to `TransactionManager` contract on sender-side chain containing router's signed bid. This transaction locks up the users funds on the sending chain. Upon detecting an event containing their signed bid from the chain, router submits the same data to the `TransactionManager` on the receiver-side chain, and locks up a corresponding amount of liquidity. The amount locked on the receiving chain is `sending amount - fee` so the router is incentivized to complete the transaction (they pocket the difference).
3. **Fulfill**: Upon detecting the `TransactionPrepared` event on the receiver-side chain, the user signs a message and sends it to a relayer, who will earn a fee for submission. The relayer (which may be the router) then submits the message to the `TransactionManager` to complete their transaction on receiver-side chain and claim the funds locked by the router. A relayer is used here to allow users to submit transactions with arbitrary calldata on the receiving chain without needing gas to do so. The router then submits the same signed message and completes transaction on sender-side, unlocking the original `amount`.

If a transaction is not fulfilled within a fixed timeout, it reverts and can be reclaimed by the party that called `prepare` on each chain (initiator). Additionally, transactions can be cancelled unilaterally by the person owed funds on that chain (router for sending chain, user for receiving chain) prior to expiry.

### Key Principles

- `TransactionManager` _is_ our data store. Neither participant should require a store to complete crosschain transactions. All information to `prepare`, `fulfill`, or `cancel` transactions should be retrievable through contract events. If a user goes offline and returns, they should be able to read the onchain data to determine which transactions require the actions, and the data needed to execute them.
- `TransactionManager` is also how we pass messages most of the time -- the events are used as a mechanism for broadcasting data to the counterparty. This removes the need for the majority messaging overhead.
- The user should be able to use relayers for any actions that need to be taken on the receiving chain. It should _not_ be assumed that they have gas on that chain.
- The `amount` and `expiry` should be decremented from the sending to the receiving chain. The `amount` is decremented to allow the router to take some profits for facilitating the transaction upon unlocking the sender-chain transfer. The `expiry` is decremented so the receiver-side is _guaranteed_ to be completed (either cancellable or fulfilled) before the sender-side.
- The signature should be constant between the sending and receiving chains, to allow the router to automatically fulfill on the sending-side once it has been revealed.
- Router keeps their funds on the contract itself. This should slightly reduce costs, make analytics much easier, and will separate gas funds from operating funds (e.g. xDai side running out of gas bc all our \$XDAI was drained).

### Detailed Flow

The more detailed flow can be seen below:

![Contracts Flow](https://github.com/connext/nxtp/blob/main/packages/documentation/assets/ContractsFlow@2x.png)

There are three key functions in the contract: `prepare`, `fulfill`, and `cancel`.

Lets assume that by this point the user has already run the auction.

1. User calls `prepare` passing in all of the relevant data about the transfer on the sender side chain along with their funds for the transfer. The contract stores the funds and the hash of the data in its state. This call emits a `TransactionPrepared` event with the same data used to create the transaction.

2. Router hears this event (which includes its address) and calls the `prepare` function with the same calldata on the receiving chain (with decremented `amount` and `expiry`). This call emits another `TransactionPrepared` event.

3. User hears the `TransactionPrepared` event on receiver chain, alerting them that the transaction is ready to be `fulfilled` since both parties have locked up funds.

4. User validates the data:
   a. If it is invalid, they can `cancel` on the receiver-chain and wait for either the expiry to elapse and `cancel` on the sending chain, or for the router to `cancel` on the sending chain upon seeing the emittted `TransactionCancelled` event on the receiving chain.
   b. If the data is valid, they generate a signature that can be used to `fulfill` the transfer. The user can either call `fulfill` on the receiver-chain themselves, or broadcast their signature to a relayer who will submit the receiver `fulfill` transaction for a fee.

5. The router, upon seeing the `TransactionFulfilled` event on receiver side, collects the signature from the event data and submits `fulfill` to sender side. This claims the original `amount` sent by the user to the `TransactionManager` when the transaction was `prepared`.

**NOTE:** In both sender and receiver cases, `fulfill` must be called before the timeout expires. This acts as a failsafe against funds getting locked indefinitely if the counterparty is malicious. However, this also means expiry must be far enough away (w/ enough gap between both sides) to _make sure_ the tx will go through.

### Offline Protections

The `TransactionManager` contract and its associated events should contain sufficient information for both the user and the router to properly resume any active transfers if they have been offline. To accomplish this, the transactions all store the `preparedBlockNumber` on them, and the contract tracks the `activeTransactionBlocks` for each user in a `mapping(address => uint256[]`). This mapping adds the `block.number` each time a transaction is prepared, and removes the `preparedBlockNumber` on completion (both `fulfill` and `cancel`). By looking at these blocks, users and routers should be able to easily find the relevant events and determine the necessary actions without needing a store of their own.

## Development

### Running the tests

To run the contract tests, run the following from the `modules/contracts` directory:

```sh
yarn test
```

This command will output the gas estimates, as well as test coverage of the suites by default. There is no need to deploy or build the repo before running the tests, which will run against a local [hardhat](https://hardhat.org) network.

### Contract Deployment

Contracts are deployed via the [hardhat deploy](https://hardhat.org/plugins/hardhat-deploy.html). Before deploying any contracts, make sure the [deploy](https://github.com/connext/nxtp/blob/main/modules/contracts/deploy/deploy.ts) script used is up to date with the contracts you will need deployed.

To deploy the contracts:

1. Obtain a funded mnemonic, provider url, and the [chain id](https://chainid.network) for the network(s) you would like to deploy the contracts to. There is no ownership of the contracts, so the mnemonic is not systemically important. Run the following commands:

```sh
export MNEMONIC="<YOUR_MNEMONIC_HERE>"
export ETH_PROVIDER_URL="<YOUR_PROVIDER_URL_HERE>"
export CHAIN_ID="<CHAIN_ID_HERE>"
export ETHERSCAN_API_KEY="<ETHERSCAN_API_KEY_HERE>" # optional to run verification task, but highly recommended
```

Once the proper environment variables are added to your environment, you can begin the contract deployments by running the following from the root directory:

```sh
yarn workspace @connext/nxtp-contracts deploy --network \<NETWORK_NAME\> # e.g. yarn workspace @connext/nxtp-contracts etherscan-verify --network goerli
```

You should use the `NETWORK_NAME` that corresponds to the correct network within the `hardhat.config.ts` file.

To optionally verify the contracts (works with Etherscan-based networks):

````sh
yarn workspace @connext/nxtp-contracts etherscan-verify --network goerli \<NETWORK_NAME\>
```

Once the contracts have been deployed, export them using:

```sh
yarn workspace @connext/nxtp-contracts export
````

**NOTE:** Once you have deployed the contracts, you will then need to update (if necessary) and redeploy the subgraphs. See [here](https://github.com/connext/nxtp/tree/main/modules/subgraph) for details.
