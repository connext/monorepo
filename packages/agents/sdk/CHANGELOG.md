# SDK Changelog

## Next Release

## 2.5.0-alpha.8

- Fix estimates for Metis

## 2.5.0-alpha.6

- Better error log in txservice

## 2.5.0-alpha.4

- `getLatestAssetPrice`: Added to fetch prices from Cartographer

## 2.5.0-alpha.3

- Removes use of relayer fee in native fetched from chaindata

## v2.5.0-alpha.2

- `estimateRelayerFee`: Capped by hardcoded gas estimates of execute

## v2.5.0-alpha.0

- Sepolia moved to testnet prod

## v2.3.0-alpha.2

- Mainnet support for mode

## v2.3.0-alpha.1

- Environment-specific Unwrapper contracts deployed

## v2.3.0-alpha.0

- Mainnet support for: Avalanche, Base, Mantle, Metis, Polygon zkEVM, zkSync

## v2.2.2-alpha.7

- Added ability to extend utils domainId to chainId mapping using chainData

## v2.2.2-alpha.6

- Added testnet adapters and registries for Goerli, Op-Goerli, and Mumbai

## v2.2.2-alpha.1

- X1 testnet support with `smart-contracts` deployments

## v2.2.2-alpha.0

- X1 testnet support

## v2.2.1-alpha.0

- `xcall`: Handles Lockbox adapter flow for xERC20s

## v2.2.0-alpha.4

- `getSupported`: Filters out disabled assets/chains from config

## v2.2.0-alpha.3

- `getTransfers`: Fix query syntax

## v2.2.0-alpha.0

- Linea mainnet support

## v2.1.3-alpha.2

- Contracts: New staging contract deployments

## v2.1.3-alpha.1

- `updateSlippage`: Fix decimal parsing

## v2.1.2

- `options`: SDK takes passed in provider

## v2.1.2-alpha.0

- `getUserPools`: Takes `options?` param

## v2.1.1

- Stable release with filter by domain

## v2.1.1

- Stable release with filter by domain

## v2.1.1-alpha.0

- Add filtering by domain to getTransfers

## Amarok 2.0.2

- `estimateRelayerFee`: Handle div by zero and decimals

## Amarok 2.0.1

- `estimateRelayerFee`: Fix gelato endpoint

## Amarok 2.0.0

- Release following relayerFeeInTransactingAsset changes
