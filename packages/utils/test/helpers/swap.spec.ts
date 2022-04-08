import { expect } from "@connext/nxtp-utils";
import { parseEther, parseUnits } from "ethers/lib/utils";

import { getReceiverAmount, getSwapRate } from "../../src";

describe("Helpers:Swap", () => {
  describe("#getSwapRate", () => {
    it("happy", async () => {
      expect(await getSwapRate()).to.be.eq("1");
    });
  });
  describe("getReceiverAmount", () => {
    it("happy-1: should work with different decimals", async () => {
      const amount = parseEther("1");
      const inputDecimals = 18;
      const outputDecimals = 6;
      const receiverAmount = await getReceiverAmount(amount.toString(), inputDecimals, outputDecimals);
      expect(receiverAmount).to.be.deep.eq({
        receivingAmount: "999500",
        routerFee: "500",
        amountAfterSwapRate: "1000000",
      });
    });
    it("happy-2: should work with different decimals", async () => {
      const amount = parseUnits("1", 6);
      const inputDecimals = 6;
      const outputDecimals = 18;
      const receiverAmount = await getReceiverAmount(amount.toString(), inputDecimals, outputDecimals);
      expect(receiverAmount).to.be.deep.eq({
        receivingAmount: "999500000000000000",
        routerFee: "500000000000000",
        amountAfterSwapRate: "1000000000000000000",
      });
    });
  });
});
