import { BigNumber, utils } from "ethers";
import { expect, mkAddress, MultisendAbi } from "@connext/nxtp-utils";

import { encodeMultisendCall, MultisendTransaction, MultisendTransactionOperation } from "../../src";

describe("Helpers:Multisend", () => {
  describe("#encodeMultisendCall", () => {
    it("converts the given tx info into valid multisend transaction calldata", () => {
      const tx: MultisendTransaction = {
        operation: MultisendTransactionOperation.CALL,
        to: mkAddress("0x123"),
        data: "0xc0ffee",
        value: BigNumber.from("987654321"),
      };
      const expected =
        "0x001230000000000000000000000000000000000000000000000000000000000000" +
        "000000000000000000000000000000003ade68b100000000000000000000000000000" +
        "00000000000000000000000000000000003c0ffee";

      const result = encodeMultisendCall([tx]);

      // Encode expected result using the Multisend ABI; should match result from encodeMultisendCall method.
      const iface = new utils.Interface(MultisendAbi);
      const encoded = iface.encodeFunctionData("multiSend", [expected]);
      expect(result).to.be.eq(encoded);
    });

    it("converts the multiple txs into valid multisend transaction calldata", () => {
      const tx1: MultisendTransaction = {
        operation: MultisendTransactionOperation.CALL,
        to: mkAddress("0x123"),
        data: "0xc0ffee",
        value: BigNumber.from("987654321"),
      };
      const tx2: MultisendTransaction = {
        operation: MultisendTransactionOperation.CALL,
        to: mkAddress("0x321"),
        data: "0xc0ffee",
        value: BigNumber.from("987654321"),
      };
      const expected =
        "0x001230000000000000000000000000000000000000000000000000000000000000" +
        "000000000000000000000000000000003ade68b100000000000000000000000000000" +
        "00000000000000000000000000000000003c0ffee" +
        "003210000000000000000000000000000000000000000000000000000000000000" +
        "000000000000000000000000000000003ade68b100000000000000000000000000000" +
        "00000000000000000000000000000000003c0ffee";

      const result = encodeMultisendCall([tx1, tx2]);

      // Encode expected result using the Multisend ABI; should match result from encodeMultisendCall method.
      const iface = new utils.Interface(MultisendAbi);
      const encoded = iface.encodeFunctionData("multiSend", [expected]);
      expect(result).to.be.eq(encoded);
    });
  });
});
