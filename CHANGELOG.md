# NXTP Changelog

## Next Release

## Bacco 2.5.0-alpha.3

- [sdk] Removes use of relayer fee in native fetched from chaindata
- [utils] Use max relayer fee in ETH

## Amarok 2.0.0-alpha.4

- [all] Workflow changes

## Amarok 2.0.0-alpha.1

- [sdk] Uses browser provider for calls, if detected
- [sdk] Added optional flag `checkFastLiquidity` to `calculateAmountReceived`
- [contracts] Added HARD token to testnet
- [contracts] Log proposal transactions

## Amarok 2.0.0-alpha.0

- [all] Testnet support for relayer fee in transacting asset

## Amarok 1.2.0-alpha.0

- [sdk] Add removeLiquidityOneToken, removeLiquidityImbalance, calculateRemoveSwapLiquidityOneToken methods

## Amarok 1.0.3-alpha.2

- [sequencer] Fix relayer fee check
- [sdk] Fix bumpTransfer for native asset

## Amarok 1.0.3-alpha.1

- [all] Support transacting asset for relayer fee on staging testnet

## Amarok 1.0.3-alpha.0

- [sdk] Fixed getTransfers

## Amarok 1.0.2

- [sdk] more optimisation

## Amarok 1.0.2-alpha.0

- [sdk] `calculateAmountReceived` optimizations

## Amarok 1.0.1

- [sdk] Fixed active liquidity fast path determination

## Amarok 1.0.0

- [sdk] Maintain `calculateAmountReceived` backwards caompatibility, accessible in both SdkPool and SdkBase

## Amarok 1.0.0-alpha.0

- [sdk] Moved core function `calculateAmountReceived` to SdkBase
- [sdk] `calculateAmountReceived` now provides isFastPath determination

## Amarok 0.2.8-alpha.2

- [sdk] fixes for optimisation gas fee estimation
- [sdk] Multiple optimizations for relayer fee calculation
  - config setup creates chainData once
  - parallelize async calls
  - added optional params for token prices and gas prices
- [sdk] router liquidity visualisation
- [subgraph][carto] add decimals to Assets
- [subgraph][carto] supplied, locked, removed liquidity for Router
- [contracts] Added ability to fork chains, apply proposed upgrades, and run tests against proposed upgrades.
- [utils] Added CDN for chainData JSON file to make globally available.

## Amarok 0.2.8-alpha.1

- [sdk] support for debugging simulation support for explorer.
- [all] support of Consesys ZKevm is live on testnet.

## Amarok 0.2.7

- [all] CI to explicitly tag alpha/beta versions so `latest` is always a stable version
- [sdk] Fixed optional `params` object for `getTransfers`, added optional `order` to `params` object for `getRoutersData`, added `checkRouterLiquidity` to `SdkUtils`
- [sdk-server] Added `checkRouterLiquidity` endpoint
- [subgraph] Added ConsenSys zkEVM subgraphs, added `transactingAsset` field to `OriginTransfer` entity
- [contracts] Added ConsenSys zkEVM connectors, added ownership helpers for CLI
- [infra] Bumped memory for lambdas

## Amarok 0.2.7-alpha.4

- [sdk] optimise relayer fee calculations

## Amarok 0.2.7-alpha.3

- [sdk] more fixes

## Amarok 0.2.7-alpha.2

- [sdk] optimisation for fee caclulation on optimism

## Amarok 0.2.7-alpha.1

- [sequencer] extra errors
- [db] updated slippage field

## Amarok 0.2.6

- [all] stable release

## Amarok 0.2.1-rc.27

- [graph] bug fixes
- [ops] config update

## Amarok 0.2.1-rc.26

- [sdk] bug fixes

## Amarok 0.2.1-rc.25

- [sdk] more getYieldData fixes

## Amarok 0.2.1-rc.24

- [sdk] getYieldData fixes

## Amarok 0.2.1-rc.23

- [sdk] bug fixes
- [adapter-subgraph] fixes at graph client

## Amarok 0.2.1-rc.22

- [sdk] enhancement at latency and rpc calls for stable swap data request
- [sdk] fix getSupported()

## Amarok 0.2.1-rc.21

- [all] bug fixes.

## Amarok 0.2.1-rc.20

- [sdk] Fix config default for cartographer uri, testnet relayerFee estimates.

## Amarok 0.2.1-rc.19

- [sdk] Allow `getTransfers` query to filter by xcall caller.

## Amarok 0.2.1-rc.18

- [contracts] NPM package name update (@connext/contracts -> @connext/smart-contracts)

## Amarok 0.2.1-rc.17

- [contracts] NPM package name update (@connext/nxtp-contracts -> @connext/contracts)
- [sdk] NPM package name update (@connext/nxtp-sdk -> @connext/sdk)

## Amarok 0.2.1-rc.16

- [contracts] Added Unwrapper contract to deliver native tokens on destination
- [sdk] Updated annotations and error handling, added UpdateSlippage, added removeRouterLiquidityFor

## Amarok 0.2.1-rc.14

- [all] updates

## Amarok 0.2.1-rc.13

- [sdk] updates for pools, price impact calculation

## Amarok 0.2.1-rc.12

- [sdk] updates for pools and relayer estimates

## Amarok 0.2.1-rc.3

- [contracts] Multisend mainnet deployments

## Amarok 0.2.1-rc.2

- [all] Multisend contract, sdk fixes, update deps

## Amarok 0.2.1-beta.13

- [sdk] pool fixes

## Amarok 0.2.1-beta.12

- [all] pool metrics for sdk

## Amarok 0.2.1-beta.11

- [all] version release for sdk

## Amarok 0.2.1-beta.10

- [all] Multiple fixes
- [contracts] prod testnet update

## Amarok 0.2.1-beta.8

- [all] Mainnet Deployments :tada:

## Amarok 0.2.1-beta.6

- [sdk] pool price impact

## Amarok 0.2.1-beta.5

- [all] new release for npm

## Amarok 0.2.1-beta.4

- [sdk] add support for priceImpact
- [contracts] new deployments for staging

## Amarok 0.2.1-beta.3

- [sdk] add support for xCallIntoLocal

## Amarok 0.2.1-beta.2

- [all] multi fixes

## Amarok 0.2.1-beta.0

- [all] working prod, mainnet in progress

## Amarok 0.2.0-alpha.29

- [contracts] fresh deployment for prod-testnet
- [all] working staging

## Amarok 0.2.0-alpha.28

- [contracts] fresh staging deployments
- [all] prove and process

## Amarok 0.2.0-alpha.27

- [sdk] getTransfers fixes

## Amarok 0.2.0-alpha.26

- [sdk] sdkPool fixes
- [contracts] bug fixes at connectors
- [all] proof message support

## Amarok 0.2.0-alpha.25

- [all] new interface release
- [contract] freeze for audits
- [networks] supports goerli, opt-goerli & mumbai

## Amarok 0.2.0-alpha.24

- [sdk] CanonicalHash as key for pools.
- [release] X.X.X-alpha.N for releases from main branch.

## Amarok 0.2.0-beta.21

- [sdk] Function updates.
- [contracts] Parameter updates.

## Amarok 0.2.0-beta.20

- [sdk] Function updates.
- [ops] Config changes.

## Amarok 0.2.0-beta.19

- [contracts] Deploy to Polygon Mumbai.
- [lighthouse] Logging updates.

## Amarok 0.2.0-beta.17

- [router] [sequencer] messaging refactor

## Amarok 0.2.0-beta.16

- fix release

## Amarok 0.2.0-beta.15

- [cartographer] Fix relayer_fee type name.

## Amarok 0.2.0-beta.14

- [sdk] Fix SDK deployments bug.

## Amarok 0.2.0-beta.13

- [subgraph] Fix client.

## Amarok 0.2.0-beta.12

- [contracts] New contracts.

## Amarok 0.2.0-beta.11

- [sdk] Stableswap pool functions

## Amarok 0.2.0-beta.10

- [router] Parallelize sending bids to sequencer

## Amarok 0.2.0-beta.8

- [router] Paginate the router queries

## Amarok 0.2.0-beta.7

- [lighthouse][sdk] Fix URL generation for BigNumber

## Amarok 0.2.0-beta.6

- [sdk] Fix URL

## Amarok 0.2.0-beta.5

- [sdk] Fix limits

## Amarok 0.2.0-beta.4

- [sdk] Fix limits

## Amarok 0.2.0-beta.3

- [sdk] fix api uri

## Amarok 0.2.0-beta.2

- [sdk] fix api uri

## Amarok 0.2.0-beta.1

- [sdk] multiple sdk updates
- [sdk] unit test
- [poller] backend pagination

## Amarok 0.2.0-beta.0

- [all] Update contract architecture

## Amarok 0.2.0-alpha.16

- [all] Support Goerli
- [all] Update contract interfaces

## Amarok 0.2.0-alpha.15

- [router] Sanity check for bad callData + to
- [lighthouse] multiple fixes
- [sdk] fix default backend staging url

## Amarok 0.2.0-alpha.14

- [sdk] Optional signer address

## Amarok 0.2.0-alpha.13

- [ops] Fix lighthouse dockerfile

## Amarok 0.2.0-alpha.12

- [sdk] Allow lower case

## Amarok 0.2.0-alpha.11

- [subgraph] Fix graph-client config

## Amarok 0.2.0-alpha.10

- [backend] Fix backend config and poller

## Amarok 0.2.0-alpha.9

- [sdk] sdk public release

## Amarok 0.2.0-alpha.8

- [contracts] Relayer fee upgrade

## Amarok 0.2.0-alpha.6

- [ops] Staging and prod envs separated

## 0.2.0-alpha.4

- [amarok] hardfork alpha release

## 0.1.25

- [sdk] sdk subgraph active polling

## 0.1.24

- [sdk] another hotfix for sdk subgraph polling

## 0.1.23

- [sdk] hotfix for sdk subgraph polling

## 0.1.22

- [sdk] type update for userAddress for sdkBase
- [sdk] sdk polling only active txs
- [utils] fix hardcoded gaslimit
- [router] Remove relayerFeesPaid stuff when fulfilling on receiving side

## 0.1.21

- [utils] Estimate gas updates for Arbitrum

## 0.1.20

- [utils] Estimate gas updates

## 0.1.19

- [router] Fix metrics bug

## 0.1.18

- [ops] Alpine version update
- [utils] Implement health endpoint call in FallbackSubgraph
- [router] Improve logging, add waiting for safe confirmations when handling receiver cancelled

## 0.1.17

- [router] Disable removeLiquidity through relayers

## 0.1.16

- [router] Use mainnet equivalent for `convertToUsd`
- [router] Improve metrics error handling

## 0.1.15

- [router] fix params for gas estimation before relayer use
- [utils] Update hardcoded gasLimits for arbitrum network
- [contracts] Add v1PriceOracle

## 0.1.14

- [contracts] Added Moonbeam deployements
- [router] Update gas consumed, relayer fees tracking

## 0.1.12

- [router] Fix metrics error
- [txservice] Rewind nonce if transaction fails and was never mined
- [router] Run an estimate gas check before calling relayers for tx execution
- [sdk] Return subgraph query in generic query method
- [router] Track bids in memory to only bid 150% of available liquidity

## 0.1.11

- [contracts] Add ability to one-off verify contracts via hardhat
- [router] Sanity check for router contracts existing on chain
- [utils] Correctly determine the Gelato-supported chains
- [router][txservice] Move sanity check of oracle address to txservice

## 0.1.10

- [utils] Use the correct url for the subgraph health
- [utils] Cache the sync records in subgraph health and fallback subgraph
- [router] Update polling time

## 0.1.9

- [router] Use correct chain for gas fee calc for cancel

## 0.1.8

- [router] Properly check low gas on router contracts

## 0.1.7

- [router][sdk] - Fix gas estimation issue

## 0.1.6

- [router] Fix relaying signature

## 0.1.5

- [sdk][router] more unit test
- [sdk][router][txservice] fee cleanup
- [sdk] Resort to using router network if gelato fails; set default useRelayers = false
- [txservice] Check that transaction exists when mine timeout occurs.
- [sdk] Make auction selection tests deterministic

## 0.1.4

- [router] Fix relayer fee

## 0.1.3

- [router] Fix admin function for checking approved router

## 0.1.2

- [router] Further improve logic for gelato fallback handling
- [router] Fix "Cannot read property 'transactionId' of undefined" error

## 0.1.1

- [router] Improve logic for gelato fallback handling
- [router] Fix sanitation check for router contract cancel

## 0.1.0

- [router/sdk] Router contract integration

## 0.0.105

- [sdk] update transaferQuote
- [contracts] fuse deployment
- [txService] Fix and Bump test coverage

## 0.0.104

- [router] Fix metrics collection
- [router] Fix cache duration for token prices

## 0.0.103

- [txservice] Fix handling of RPC provider server errors

## 0.0.102

- [txservice] Fixed issue with RPC stall timeout handling
- [router] Undefined handling in `bindPrices`
- [router/sdk] Get active transactions specific to users and routers
- [subgraph] more analytics updates
- [sdk] update generateTransactionId method
- [txservice] error types
- [utils] subgraph health query method implementation
- [sdk] Add generic subgraph query method
- [sdk] Add generic subgraph query method

## 0.0.101

- [txservice] Reorganization, code coverage improvements
- [txservice] Update / expose config vars
- [router] add active transactions logs
- [sdk] generateTransactionId method

## 0.0.100

- [router] Cleanup prometheus collection
- [router/txservice] Explicitly use legacy transactions only
- [router] Fix mainnet equivalent
- [subgraph] analytics graphs updates

## 0.0.99

- [txservice] Fix error parsing
- [router] router status messaging
- [sdk] getRouterStatus method

## 0.0.98

- [contracts] Set up Moonriver price oracle

## 0.0.97

- [contracts] Deploy gas price oracle on xdai

## 0.0.96

- [router/sdk] Fix gas price estimation

## 0.0.94

- [router] Delegate fee calc to chainreader
- [sdk] Integrate chainreader
- [txservice] Introduced provider syncing
- [router] Arbitrum `block.number` handling on cancel

## 0.0.93

- [router] Improved caching and auction response time
- [sdk, router] Add method to allow slippage in prepared amount
- [txservice] removed TransactionServiceFailure error, replaced with specific error types
- [subgraph] Add convenience fields for analytics subgraph
- [subgraph] Redeploy analytics subgraphs

## 0.0.92

- [utils] Add native asset decimals handling
- [utils] Fallback subgraph should order synced subgraphs first

## 0.0.91

- [sdk] Allow chainData to be passed in

## 0.0.90

- [router] use subgraphs form chainData default
- [sdk] fees estimation on sdk side
- [contracts] [router] use price oracle for optimism

## 0.0.89

- [router] Fix handling tracker

## 0.0.88

- [utils] Update default subgraph URIs

## 0.0.87

- [contracts] Add deploy script to package

## 0.0.86

- [contracts] Add artifacts to package

## 0.0.85

- [router] Add optimism fees using mainnet pricing
- [test-ui] Minor error fixes
- [router] Remove fees decimal conversion
- [txservice] `readTransaction` should use provider not signer
- [router] Improve logs and error contexts
- [router] Handle null case for getBlock

## 0.0.84

- [utils] Update `setup-router` and `deploy-subgraph` scripts to include optimism
- [txservice] Remove min gas enforcement for optimism
- [router] Ensure handling tracker is pruned properly

## 0.0.83

- [router] Track handling transactions by status over block

## 0.0.82

- [router] Add time-delay for sender cancellations

## 0.0.81

- [sdk] Gelato support for Arbitrum
- [subgraph] subgraph lite for routers and sdk
- [subgraph] add sending tx count for explorer
- [router] update active transactions logs!minor

## 0.0.80

- [utils] Enforce minimum subgraph sync buffer
- [utils] Subgraph starts as synced

## 0.0.79

- [utils] Bump gas estimate
- [sdk] Remove hardcoded arbitrum gas limit

## 0.0.78

- [utils] Fix subgraph hasSynced logic

## 0.0.77

- [sdk] Hardcode gas limit for Arbitrum
- [ci] Fix 0.0.76 build
- [utils] Add extra gas reimbursement for fulfill for Gelato relayers

## 0.0.76

- [router] New Web3signer support
- [router] Fix logging level
- [sdk] fulfill response

## 0.0.75

- [contracts] Moonriver deployment

## 0.0.74

- [sdk] Integrate Gelato for fulfill relaying
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
