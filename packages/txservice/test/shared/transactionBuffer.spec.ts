import { randomInt } from "crypto";
import { utils } from "ethers";
import { SinonStub, stub } from "sinon";
import { expect, Logger } from "@connext/nxtp-utils";

import { MaxBufferLengthError, OnchainTransaction, TransactionBuffer } from "../../src/shared";
import { getMockOnchainTransaction, MockOnchainTransactionState, TEST_ERROR, TEST_SENDER_CHAIN_ID } from "../utils";

const logger = new Logger({
  level: process.env.LOG_LEVEL ?? "silent",
  name: "TransactionBufferTest",
});

describe("TransactionBuffer", () => {
  const MAX_LENGTH = 64;
  let buffer: TransactionBuffer;

  beforeEach(() => {
    buffer = new TransactionBuffer(logger, MAX_LENGTH, {
      name: "testBuffer",
      chainId: TEST_SENDER_CHAIN_ID,
    });
  });

  describe("#push", () => {
    it("happy: push tx (non-backfill)", () => {
      const { transaction } = getMockOnchainTransaction();
      buffer.push(transaction);
      expect(buffer.length).to.eq(1);
      expect(buffer[0]).to.deep.eq(transaction);
    });

    it("throws MaxBufferLengthError if at max length", () => {
      let i: number;
      for (i = 0; i < buffer.maxLength; i++) {
        const { transaction } = getMockOnchainTransaction(i);
        buffer.push(transaction);
      }
      const { transaction } = getMockOnchainTransaction(i + 1);
      expect(() => buffer.push(transaction)).to.throw(MaxBufferLengthError);
    });
  });

  describe("#shift", () => {
    it("happy shift", () => {
      let shiftedTx: OnchainTransaction;
      let i: number;

      // empty buffer returns undefined
      expect(buffer.shift()).to.be.equal(undefined);

      for (i = 0; i < buffer.maxLength; i++) {
        const { transaction } = getMockOnchainTransaction(i);
        buffer.push(transaction);
      }

      shiftedTx = buffer.shift();
      expect(buffer.length).to.be.equal(buffer.maxLength - 1);
      expect(shiftedTx.nonce).to.be.equal(0);
    });
  });

  describe("#getTxByNonce", () => {
    it("happy getTx from Nonce", () => {
      let i: number;
      for (i = 0; i < buffer.maxLength; i++) {
        const { transaction } = getMockOnchainTransaction(i + 1);
        buffer.push(transaction);
      }

      expect(buffer.getTxByNonce(1)).to.be.deep.eq(buffer[0]);
      expect(buffer.getTxByNonce(buffer.maxLength)).to.be.deep.eq(buffer[buffer.maxLength - 1]);
      expect(buffer.getTxByNonce(buffer.maxLength + 1)).to.be.eq(undefined);
    });
  });
});
