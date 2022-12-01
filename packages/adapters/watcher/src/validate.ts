import { BigNumber } from "ethers";

/**
 * @notice Validate whether an asset is violating the invariant statement (summing error).
 * @dev Should compare totalMintedAssets and totalLockedAssets according to the invariant statement. If
 * the invariant is violated, should return a value to indicate that the caller/consumer should escalate.
 *
 * @param args.totalMintedAssets - The total amount of minted bridge assets across all chain for a given
 * xchain asset.
 * @param args.totalLockedAssets - The total number of locked (custodied) assets on the canonical chain
 * for a given xchain asset.
 * @returns boolean - Whether the invariant is validated. `true` if validated (no pause needed). `false`
 * if the invariant was violated (pause is needed)!
 */
export const validateAsset = (args: { totalMintedAssets: BigNumber; totalLockedAssets: BigNumber }): boolean => {
  return args.totalMintedAssets.lte(args.totalLockedAssets);
};
