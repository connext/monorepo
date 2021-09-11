# NXTP Changelog

## Next Release

- [router] Add onchain checks before sending txs
- [router] Fix subgraph status determinations
- [router] Fix bug where receipt could be undefined

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
