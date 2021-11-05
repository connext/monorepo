# NXTP Changelog

## Next Release

- [router] Add support for web3signer
- [contracts] Include `remove-router` hardhat task
- [sdk] SDK supports string `subgraph` in config

## 0.0.73

- [contracts] Deploy to mainnet

## 0.0.72

- [router/sdk] Fix fallback subgraph

## 0.0.71

- [router] Handle fulfill relay bugfix

## 0.0.70

- [router] Handle fulfill relay
- [router/sdk] Add subgraph fallbacks by default
- [test-ui] Fixes for test-ui based on feedback

## 0.0.69

- [sdk] Return fulfill fee from `getTransferQuote`

## 0.0.68

- [sdk] Fix build

## 0.0.67

- [sdk/router] Add fallback subgraph using multiple subgraph URIs
- [sdk-server] new sdk-server to interact with sdkBase on backend
- [subgraph] update structure to handle multiple networks subgraph deployment
- [integration] fix load testing

## 0.0.66

- [sdk] Fix signer instantiation
- [test-ui] Fix input params

## 0.0.65

- [router] Fix relayer fee threshold

## 0.0.64

- [sdk] SDK gas limit fix

## 0.0.63

- [sdk] Fix relayer fee issue

## 0.0.62

- [sdk] fix exchange amount
- [sdk] bump gas limit for Arbitrum
- [router] fix exchange amount

## 0.0.61

- [sdk] Add SDKBase class that does not use signer
- [contracts] Add PriceOracle to BSC
- [sdk] Add way to bypass messaging signer

## 0.0.58

- [subgraphs] Fix user typo
- [txservice] Sync chain providers
- [sdk] Estimate gas on fulfill for configured chains

## 0.0.57

- [txservice] Add nonce gap backfill in event that txcount backtracks
- [txservice] Curb gas spikes
- [sdk/router] Catch errors per chain in active tx subgraph poller
- [router] Fix estimate gas bug

## 0.0.56

- [subgraph] Use bware subgraph endpoints

## 0.0.55

- [sdk] Fix lower bound

## 0.0.54

- [contracts] Update default subgraphs

## 0.0.53

- [contracts] Redeploy to mainnets
- [utils] Update default subgraph URLs

## 0.0.52

- [sdk] Add sanity check for callTo parameter
- [sdk] update sdk constructor params structure again
- [router] perf subgraph buffer
- [contracts] Redeploy contracts to testnets

## 0.0.51

- [contracts] Final updates from auditor
- [contracts] Add price oracle contract
- [router] Estimate gas and add to fee on configured chains
- [contracts] Deploy on testnets

## 0.0.50

- [sdk] Hardcode estimated gas for xdai

## 0.0.49

- [txservice] Properly handle insufficient funds errors
- [router] Log gas when there is low balance
- [router] Properly default signature on admin cancel endpoint

## 0.0.48

- [txservice] Refactor
- [txservice] Add serial submit

## 0.0.47

- [utils] Attempt fix on trust wallet again final final.

## 0.0.46

- [sdk] Fix calldata encryption.
- [sdk] Subgraph buffer.
- [sdk] Fix dryRun.
- [sdk] Add Subgraph loop errors handling.
- [sdk] Change NxtpSDK constructor params.
- [router] Attempt to resolve expired receiver prepare transactions.

## 0.0.45

- [sdk] Attempt fix on trust wallet again.

## 0.0.44

- [sdk] Attempt fix on trust wallet again.

## 0.0.41

- [sdk] Attempt fix on trust wallet again.
- [sdk] Estimate gas on SDK transactions.
- [router] Serialize tx submission.

## 0.0.40

- [sdk] Fix xDai issue.

## 0.0.39

- [txservice] Serialize tx submission

## 0.0.38

- [sdk] Fix Arbitrum subgraph URL
- [router] Add onchain checks before sending txs
- [router] Fix subgraph status determinations
- [router] Fix bug where receipt could be undefined
- [router] Add tracker for in-progress metatxs
- [router] Hardcode gas limit

## 0.0.37

- [router] Retry getting subgraph sync status if not set by default

## 0.0.36

- [sdk] Attempt fix BSC issue.

## 0.0.35

- [sdk] Fix Trust Wallet-specific signing.

## 0.0.34

- [sdk] Fix Trust Wallet-specific signing.

## 0.0.33

- [sdk] Check subgraph sync status and block transfers if out of sync.
- [sdk] Make sync buffer configurable.

## 0.0.32

- [router] Cancel sender transaction if subgraph is out of sync.
- [router] Add admin endpoint to cancel sender txs.
- [utils,sdk,router,txservice] Add custom logger class.
- [contracts] Arbitrum deployment.
- [utils] Sanitize signatures.
- [test-ui] Router liquidity table.

## 0.0.31

- [router] Don't respond to bid if subgraphs are out of sync
- [router] Use `transactionId` in request contexts
- [test-ui] Use readable units for liquidity

## 0.0.30

- [router] Fix fantom subgraph url

## 0.0.29

- [router] Fix `undefined` handling of confirmations

## 0.0.28

- [subgraph] Add default URLs
- [router] Properly handle chain confirmation defaults

## 0.0.27

- [contracts] Deploy to FTM, BSC, MATIC, XDAI

## 0.0.26

- [contracts] Deploy to Avalanche Fuji
- [txservice] Overhaul for blockade monitoring

## 0.0.25

- [router] Fix bug in subgraph loop.

## 0.0.24

- [sdk] Use local clock for all time calcs.

## 0.0.22

- [sdk] Add back `connectMessaging` with proper functionality.

## 0.0.21

- [sdk] Add back `connectMessaging` with proper functionality.

## 0.0.20

- [test-ui] Router liquidity management UI.
- [test-ui] Test preferred router.
- [sdk] Use NTP time server instead of block time.

## 0.0.19

- [contracts] Updated deployments for all chains.
- [sdk] Add method to get historical transfers.

## 0.0.18

- [contracts] Deploy to Ropsten.
- [router] Cancel expired transfers.

## 0.0.17

- [router] Refactor router architecture.

## 0.0.16

- [sdk] Fix cancellation.
- [sdk] Change method name from `cancelExpired` to `cancel`.
- [sdk, router] Add `network` param for abstracting messaging configuration.
- [sdk] Rename `startTransfer` and `finishTransfer` to `prepareTransfer` and `fulfillTransfer`.

## 0.0.15

- [txservice] Fix in gas price for Optimism.
- [contracts] Deployments for Mumbai, Optimism Kovan, Arbitrum Rinkeby.

## 0.0.14

- [sdk] Add `transactionHash` to all applicable events.
- [contracts] Deploy to all chains.

## 0.0.13

- [sdk] Add subgraph to the frontend for transaction status tracking.

## 0.0.12

- [txservice] Bugfixes.

## 0.0.11

- [sdk] Fix for signature sending bug.
- [txservice] Fix for tx confirmed bug.
- [sdk] Add constructor param to skip setting up contract listeners.

## 0.0.10

- [router, sdk] Refactor error handling.
- [sdk] [#53](https://github.com/connext/nxtp/issues/53) Add `ReceiverPrepareSigned` event.
- [sdk] [#54](https://github.com/connext/nxtp/issues/54) Fix `finishTransfer` resolution.

## 0.0.9

- [sdk] Add methods to attach and detach listener.
- [sdk] Break up methods into `startTransfer` and `finishTransfer`.
- [router, sdk] Add getTransferQuote method and simulate auction request/response.

## 0.0.8
