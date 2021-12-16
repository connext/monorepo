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

  const addMockTxsToBuffer = (count: number): number => {
    let i: number;
    for (i = 0; i < count; i++) {
      const { transaction } = getMockOnchainTransaction(i);
      buffer.push(transaction);
    }
    return i;
  };

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
      const i = addMockTxsToBuffer(buffer.maxLength);
      const { transaction } = getMockOnchainTransaction(i + 1);
      expect(() => buffer.push(transaction)).to.throw(MaxBufferLengthError);
    });
  });

  describe("#shift", () => {
    it("should set lastShiftedTx", () => {
      expect((buffer as any).lastShiftedTx).to.be.undefined;
      const { transaction } = getMockOnchainTransaction();
      buffer.push(transaction);
      expect((buffer as any).lastShiftedTx).to.be.undefined;
      buffer.shift();
      expect((buffer as any).lastShiftedTx).to.deep.eq(transaction);
    });
  });

  describe("#getTxByNonce", () => {
    it("should return tx with specified nonce", () => {
      // Will be ordered by nonce, so the first tx nonce = 0, last tx nonce = 11 in this case:
      const txCount = 12;
      addMockTxsToBuffer(txCount);
      expect(buffer.getTxByNonce(4)).to.deep.eq(buffer[4]);
    });

    it("should return last shifted if nonce belongs to the last shifted tx", () => {
      addMockTxsToBuffer(3);
      const tx = buffer.shift();
      const nonce = tx.nonce;
      expect(buffer.getTxByNonce(nonce)).to.deep.eq(tx);
    });

    it("should return undefined if it doesn't exist", () => {
      expect(buffer.getTxByNonce(123)).to.be.undefined;
    });
  });
});
