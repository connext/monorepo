# Chain Abstraction Utilities

## Publish Package

1. Update version in `package.json`

2. After merging to the correct branch (e.g. `main` for `alpha` versions), run:

   ```
   git tag -a chain-abstraction-v<VERSION>
   ```

3. Push tag

   ```
   git push --follow-tags
   ```

4. Check the GitHub workflow completed successfully

For more information refer chain-abstraction [docs](https://documentation-git-revert-103-revert-101-3-31d64b-connextproject.vercel.app/developers/guides/chain-abstraction).
