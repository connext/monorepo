# SDK-Wrapper Changelog

## Next Release

## v2.1.2-alpha.0

- `getTokenSupply`, `getTokenUserBalance`, `getUserPools`: Passes `options` correctly to backend request.

## v2.1.1

- Stable release with just sdk-core changes

## v2.1.0

- Stable release

## v2.1.0-alpha.4

- Functions with BigNumber return types are converted by the wrapper before returning.

## v2.1.0-alpha.0

- [`options?`] Functions that return a transaction request (`xcall`, `addLiquidity`, etc.) now take an optional `options` object. This allows specification of the chain provider(s) and signer that the transaction request should be created for. By default, functions will use config values provided at initialization.
