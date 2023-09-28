# SDK

Package that wraps Connext contract interactions.

## SDK Base

Contains SDK initialization, `xcall`, and peripheral helpers like transaction approval, relayer estimation, and transfer bumping functions.

## SDK Router

Contains functions for adding router liquidity.

## SDK Pool

Contains functions for interacting with StableSwap pools.

## SDK Utils

Contains functions for getting `xcall` transfer data.

## Publish Package

1. Update version in `package.json`

2. After merging to the correct branch (e.g. `main` for `alpha` versions), run:

   ```
   git tag -a sdk-v<VERSION>
   ```

3. Push tag

   ```
   git push --follow-tags
   ```

4. Check the GitHub workflow completed successfully
