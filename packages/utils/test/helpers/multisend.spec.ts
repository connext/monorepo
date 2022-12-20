import { expect, mkAddress } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import { makeMultisendTransactions, MultisendTransaction, MultisendTransactionOperation } from "../../src";

describe("Helpers:Multisend", () => {
  describe("#getMultisendTransaction", () => {
    it("converts the given tx info into valid multisend transaction calldata", () => {
      const tx: MultisendTransaction = {
        operation: MultisendTransactionOperation.CALL,
        to: mkAddress("0x123"),
        data: "0xc0ffee",
        value: BigNumber.from("987654321"),
      };
      const result = makeMultisendTransactions([tx]);
      expect(result).to.be.eq(
        "0x001230000000000000000000000000000000000000000000000000000000000000" +
          "000000000000000000000000000000003ade68b100000000000000000000000000000" +
          "00000000000000000000000000000000003c0ffee",
      );
    });
  });
});
