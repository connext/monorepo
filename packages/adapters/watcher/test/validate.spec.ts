import { expect } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import { validateAsset } from "../src/validate";

describe("Watcher Adapter: Validate", () => {
  describe("#validateAsset", () => {
    it("should validate when invariant is passed", () => {
      // Equal values: should pass.
      const totalLockedAssets = BigNumber.from(10_000);
      let totalMintedAssets = BigNumber.from(10_000);
      let result = validateAsset({ totalMintedAssets, totalLockedAssets });
      expect(result).to.be.true;

      // totalMinted is less than totalLocked: should pass.
      totalMintedAssets = BigNumber.from(8_123);
      result = validateAsset({ totalMintedAssets, totalLockedAssets });
      expect(result).to.be.true;
    });

    it("should fail when invariant is violated", () => {
      // Total minted is greater than total locked: should return false.
      const totalLockedAssets = BigNumber.from(10_000);
      const totalMintedAssets = BigNumber.from(20_000);
      const result = validateAsset({ totalMintedAssets, totalLockedAssets });
      expect(result).to.be.false;
    });
  });
});
