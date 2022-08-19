import { expect } from "@connext/nxtp-utils";
import { getMinimumBidsCountForRound } from "../../src";

describe("Peripherals:MultiPath", () => {
  describe("getMinimumBidsCountForRound", () => {
    it("happy", () => {
      expect(getMinimumBidsCountForRound(1)).to.be.eq(1);
      expect(getMinimumBidsCountForRound(2)).to.be.eq(2);
      expect(getMinimumBidsCountForRound(3)).to.be.eq(4);
    });
  });
});
