import { mkAddress } from "@connext/nxtp-utils";
import { expect } from "@connext/nxtp-utils/src/expect";
import { createLoggingContext } from "@connext/nxtp-utils/src/request";
import { Wallet } from "ethers";
import { okAsync } from "neverthrow";
import pino from "pino";
import { createStubInstance, SinonStub, SinonStubbedInstance, stub } from "sinon";

import { ChainConfig, DEFAULT_CONFIG } from "../../src/config";
import { TransactionDispatch } from "../../src/dispatch";
import { TransactionBuffer } from "../../src/dispatch/buffer";
import * as TransactionFns from "../../src/dispatch/transaction";
import { Gas } from "../../src/types";
import { TEST_SENDER_CHAIN_ID, TEST_TX, TEST_TX_RECEIPT, TEST_TX_RESPONSE } from "../constants";

const logger = pino({ level: process.env.LOG_LEVEL ?? "silent", name: "DispatchTest" });

// Set to 10ms to keep tests speedy.
const MONITOR_POLL_PARITY = 10;
(TransactionDispatch as any).MONITOR_POLL_PARITY = MONITOR_POLL_PARITY;

const ADDRESS = mkAddress("0xaaa");

describe("Dispatch", () => {
  let signer: SinonStubbedInstance<Wallet>;
  let txDispatch: TransactionDispatch;
  let txBuffer: SinonStubbedInstance<TransactionBuffer>;
  let backfillStub = stub().resolves(undefined);
  let bufferPending: SinonStub;
  let getAddressStub: SinonStub<any[], any>;

  const { requestContext } = createLoggingContext("test");

  beforeEach(async () => {
    signer = createStubInstance(Wallet);
    signer.sendTransaction.resolves(TEST_TX_RESPONSE);
    signer.getTransactionCount.resolves(TEST_TX_RESPONSE.nonce);
    signer.connect.returns(signer);
    (signer as any).address = ADDRESS;

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
    getAddressStub = stub().resolves(okAsync(signer.address));
    (txDispatch as any).getAddress = getAddressStub;
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

  describe("#createTransaction", () => {
    it("should not create a transaction if dispatch is aborted", async () => {
      const assertNotAborted = stub().throws(new Error("foo"));
      (txDispatch as any).assertNotAborted = assertNotAborted;
      await expect(txDispatch.createTransaction(TEST_TX, requestContext)).to.be.rejectedWith("foo");
    });

    it("should create a transaction", async () => {
      const gasStub = createStubInstance(Gas);
      const getGasStub = stub().resolves(gasStub);
      (txDispatch as any).getGas = getGasStub;

      const getNonceStub = stub().resolves(TEST_TX_RESPONSE.nonce);
      (txDispatch as any).getNonce = getNonceStub;

      const incrementNonceStub = stub().resolves();
      (txDispatch as any).incrementNonce = incrementNonceStub;

      const txStub = createStubInstance(TransactionFns.Transaction);
      const createTxStub = stub(TransactionFns, "Transaction").returns(txStub);

      const tx = await txDispatch.createTransaction(TEST_TX, requestContext);

      expect(getGasStub).calledOnceWith(TEST_TX);
      expect(getNonceStub).calledOnceWith();
      expect(createTxStub).to.have.been.calledOnceWith(
        (txDispatch as any).logger,
        txDispatch,
        TEST_TX,
        TEST_TX_RESPONSE.nonce,
        gasStub,
      );
      expect(txBuffer.insert).to.have.been.calledOnceWith(TEST_TX_RESPONSE.nonce, txStub);
      expect(incrementNonceStub).calledOnceWithExactly();
      expect(tx).to.deep.eq(txStub);
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
      txDispatch.getTransactionCount = stub().rejects(testError);
      await expect((txDispatch as any).getNonce()).to.be.rejectedWith(testError);
    });
  });

  describe("#monitor", async () => {
    it("should backfill tx if txDispatch.getTransactionCount === txBuffer.getLastNonce", async () => {
      (txDispatch as any).backfill = backfillStub;
      txBuffer.getLastNonce.returns(4);
      await txDispatch.monitor();
      expect(backfillStub).to.be.calledOnceWith(TEST_TX_RESPONSE.nonce, undefined, "NOT_FOUND");
    });
  });

  describe.skip("#backfill", async () => {
    let gasStub: SinonStubbedInstance<Gas>;
    let getGasStub: SinonStub<any[], any>;
    let txStub: SinonStubbedInstance<TransactionFns.Transaction>;
    let sendTxStub: SinonStub<any[], any>;
    let confirmTxStub: SinonStub<any[], any>;
    beforeEach(async () => {
      gasStub = createStubInstance(Gas);

      getGasStub = stub().resolves(gasStub);
      (txDispatch as any).getGas = getGasStub;

      txStub = createStubInstance(TransactionFns.Transaction);
      txStub.timeUntilExpiry.returns(100);
      (txStub.responses as any) = [];
      stub(TransactionFns, "Transaction").returns(txStub);

      sendTxStub = stub().returns(okAsync(TEST_TX_RESPONSE));
      (txDispatch as any).sendTransaction = sendTxStub;

      confirmTxStub = stub().returns(okAsync(TEST_TX_RECEIPT));
      (txDispatch as any).sendTransaction = sendTxStub;

      (txDispatch as any).confirmationsRequired = 1;
    });

    it("should backfill tx with max gas", async () => {
      await (txDispatch as any).backfill(TEST_TX_RESPONSE.nonce, txStub, "NOT_FOUND");
      expect(gasStub.setToMax).to.be.calledOnceWithExactly();
      expect(sendTxStub).to.be.calledOnceWithExactly(txStub);
      expect(confirmTxStub).to.be.calledOnceWithExactly(TEST_TX_RESPONSE, 1, 100);

      expect(txBuffer.insert).to.have.been.calledOnceWithExactly(TEST_TX_RESPONSE.nonce, txStub, 100);
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

  describe("#getGas", async () => {});
});
