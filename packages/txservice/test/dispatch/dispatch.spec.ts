import { expect } from "@connext/nxtp-utils/src/expect";
import { Wallet } from "ethers";
import { okAsync } from "neverthrow";
import pino from "pino";
import { createStubInstance, SinonStub, SinonStubbedInstance, stub } from "sinon";

import { ChainConfig, DEFAULT_CONFIG } from "../../src/config";
import { TransactionDispatch } from "../../src/dispatch";
import { TransactionBuffer } from "../../src/dispatch/buffer";
import { TEST_SENDER_CHAIN_ID, TEST_TX, TEST_TX_RESPONSE } from "../constants";

const logger = pino({ level: process.env.LOG_LEVEL ?? "silent", name: "DispatchTest" });

// Set to 10ms to keep tests speedy.
const MONITOR_POLL_PARITY = 10;
(TransactionDispatch as any).MONITOR_POLL_PARITY = MONITOR_POLL_PARITY;

describe("Dispatch", () => {
  let signer: SinonStubbedInstance<Wallet>;
  let txDispatch: TransactionDispatch;
  let txBuffer: SinonStubbedInstance<TransactionBuffer>;
  let backfillStub = stub().resolves(undefined);
  let bufferPending: SinonStub;

  beforeEach(async () => {
    signer = createStubInstance(Wallet);
    signer.sendTransaction.resolves(TEST_TX_RESPONSE);
    signer.getTransactionCount.resolves(TEST_TX_RESPONSE.nonce);
    signer.connect.returns(signer);

    const chainConfig: ChainConfig = {
      providers: [
        {
          url: "https://-------------",
        },
      ],
      confirmations: 1,
      confirmationTimeout: 10_000,
    };

    txBuffer = createStubInstance(TransactionBuffer);
    txBuffer.pending.returns([undefined, undefined, undefined]);
    txBuffer.getLastNonce.returns(TEST_TX_RESPONSE.nonce - 1);
    txDispatch = new TransactionDispatch(logger, signer, TEST_SENDER_CHAIN_ID, chainConfig, DEFAULT_CONFIG, false);
    (txDispatch as any).buffer = txBuffer;
    (txDispatch as any).backfill = backfillStub;
    // #createTransaction test below is dependent on this returning TEST_TX_RESPONSE.nonce.
    txDispatch.getTransactionCount = stub().returns(okAsync(TEST_TX_RESPONSE.nonce));
  });

  describe("#stopMonitor", async () => {
    it("should stop the monitor", async () => {
      txDispatch.stopMonitor();
      expect((txDispatch as any).isActive).to.be.false;
      expect((txDispatch as any).shouldMonitor).to.be.false;
    });
  });

  describe("#startMonitor", async () => {
    it("should start the monitor", async () => {
      txDispatch.startMonitor();
      expect((txDispatch as any).isActive).to.be.true;
      expect((txDispatch as any).shouldMonitor).to.be.true;
    });
  });

  describe("#createTransaction", async () => {
    it("should create a transaction", async () => {
      const tx = await txDispatch.createTransaction(TEST_TX);
      expect(tx.nonce).to.equal(TEST_TX_RESPONSE.nonce);
      expect((txDispatch as any).getNonce).to.have.been.calledOnce;
      expect(txBuffer.insert).to.have.been.calledOnce;
    });
  });

  describe("#getNonce", async () => {
    it("should get the current nonce", async () => {
      const nonce = await (txDispatch as any).getNonce();
      expect(nonce).to.equal(TEST_TX_RESPONSE.nonce);
    });

    it("should return transaction count if buffer is empty", async () => {
      txBuffer.getLastNonce.returns(undefined);
      const nonce = await (txDispatch as any).getNonce();
      expect(nonce).to.equal(TEST_TX_RESPONSE.nonce);
    });

    it("should throw if getTransactionCount fails", async () => {
      const testError = new Error("test");
      txBuffer.getLastNonce.returns(undefined);
      txDispatch.getTransactionCount = stub().rejects();
      await expect((txDispatch as any).getNonce()).to.be.rejectedWith(testError);
    });
  });

  describe("#monitor", async () => {
    it("should backfill tx if txDispatch.getTransactionCount === txBuffer.getLastNonce", async () => {
      await txDispatch.monitor();
      expect(backfillStub).to.be.calledOnceWithExactly(TEST_TX_RESPONSE.nonce, undefined, "NOT_FOUND");
    });
  });

  describe("#backfill", async () => {
    it("should backfill tx with max gas", async () => {
      await (txDispatch as any).backfill(TEST_TX_RESPONSE.nonce, TEST_TX);
      expect(txBuffer.insert).to.have.been.calledOnce;
    });

    it("should throw and abort if getAddress fails", async () => {
      
      expect((txDispatch as any).aborted).to.be.true;
    });

    it("should throw and abort if estimateGas fails", async () => {

      expect((txDispatch as any).aborted).to.be.true;
    });

    it("should throw and abort if backfill sendTransaction fails", async () => {
      const testError = new Error("test");
      backfillStub.rejects(testError);
      await expect((txDispatch as any).backfill(TEST_TX)).to.be.rejectedWith(testError);
      expect((txDispatch as any).aborted).to.be.true;
    });

    it("should backfill with fake tx if estimateGas fails with AlreadyMined error", async () => {
      const testError = new Error("AlreadyMined");
      backfillStub.rejects(testError);
      await expect((txDispatch as any).backfill(TEST_TX)).to.be.rejectedWith(testError);
      expect((txDispatch as any).aborted).to.be.false;
    });

    it("should backfill with fake tx if sendTransaction fails with AlreadyMined error", async () => {

      expect((txDispatch as any).aborted).to.be.false;
    });
  });

  describe("#getGas", async () => {

  });
});
