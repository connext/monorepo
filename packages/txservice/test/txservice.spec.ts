import { BigNumber, providers, utils, Wallet } from "ethers";
import Sinon, { restore, reset, createStubInstance, SinonStubbedInstance } from "sinon";
import pino from "pino";

import { NxtpTxServiceEvents, TransactionService } from "../src/txservice";
import { Transaction } from "../src/dispatch/transaction";
import { TransactionDispatch } from "../src/dispatch";
import {
  makeChaiReadable,
  TEST_SENDER_CHAIN_ID,
  TEST_TX,
  TEST_FULL_TX,
  TEST_TX_RESPONSE,
  TEST_TX_RECEIPT,
  TEST_READ_TX,
} from "./constants";
import { AlreadyMined, RpcError, TimeoutError, TransactionReverted, TransactionServiceFailure } from "../src/error";
import { getRandomAddress, getRandomBytes32, mkAddress, RequestContext, expect } from "@connext/nxtp-utils";
import { err, ok } from "neverthrow";
import { EvtError } from "evt";

const logger = pino({ level: process.env.LOG_LEVEL ?? "silent", name: "TransactionServiceTest" });

let signer: SinonStubbedInstance<Wallet>;
let txService: TransactionService;
let dispatch: SinonStubbedInstance<TransactionDispatch>;
let transaction: SinonStubbedInstance<Transaction>;
let context: RequestContext = {
  id: "",
  origin: "",
};

/// In these tests, we are testing the outer shell of txservice - the interface, not the core functionality.
/// For core functionality tests, see transaction.spec.ts and provider.spec.ts.
describe("TransactionService", () => {
  let validateAttemptShouldSucceed = 1;
  let confirmAttemptShouldSucceed = 1;
  let attempts = {
    submit: 0,
    validate: 0,
    confirm: 0,
  };

  let transactionState = {
    didFinish: false,
  };

  beforeEach(() => {
    transactionState.didFinish = false;
    attempts.submit = 0;
    attempts.validate = 0;
    attempts.confirm = 0;
    confirmAttemptShouldSucceed = 1;
    validateAttemptShouldSucceed = 1;

    dispatch = createStubInstance(TransactionDispatch);
    transaction = createStubInstance(Transaction);
    signer = createStubInstance(Wallet);
    signer.connect.resolves(true);

    const chains = {
      [TEST_SENDER_CHAIN_ID.toString()]: {
        providers: [{ url: "https://-------------" }],
        confirmations: 1,
      },
    };

    txService = new TransactionService(logger, signer, { chains });
    Sinon.stub(txService as any, "getProvider").callsFake((chainId: number) => {
      // NOTE: We check to make sure we are only getting the one chainId we expect
      // to get in these unit tests.
      expect(chainId).to.be.eq(TEST_SENDER_CHAIN_ID);
      return dispatch;
    });

    dispatch.createTransaction.callsFake(async (): Promise<Transaction> => {
      return transaction as unknown as Transaction;
    });

    // Override submit/validate/confirm to increment the attempt counters.
    // NOTE: Do NOT override these sinon stubs unless the tx lifecycle should fail. We are using
    // these fake calls to update the transaction stub's fake "internal state".
    transaction.submit.callsFake(async (): Promise<providers.TransactionResponse> => {
      attempts.submit += 1;
      return TEST_TX_RESPONSE;
    });
    transaction.validate.callsFake(async () => {
      attempts.validate += 1;
      logger.debug({ attempts }, "validate attempt");
      if (attempts.validate >= validateAttemptShouldSucceed) {
        transaction.receipt = TEST_TX_RECEIPT;
      } else {
        throw new TimeoutError();
      }
    });
    transaction.confirm.callsFake(async (): Promise<providers.TransactionReceipt> => {
      attempts.confirm += 1;
      if (attempts.confirm === confirmAttemptShouldSucceed) {
        transactionState.didFinish = true;
        transaction.receipt = TEST_TX_RECEIPT;
        return TEST_TX_RECEIPT;
      } else {
        throw new TimeoutError();
      }
    });
    // Stub didSubmit and didFinish.
    Sinon.stub(transaction, "didSubmit").get(() => attempts.submit > 0);
    Sinon.stub(transaction, "didFinish").get(() => transactionState.didFinish);
    // Stub the getter for data.
    Sinon.stub(transaction, "params").get(() => TEST_FULL_TX);
    // Stub the getter for attempt.
    Sinon.stub(transaction, "attempt").get(() => attempts.submit);

    context.id = getRandomBytes32();
    context.origin = "TransactionServiceTest";
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("sendTx", () => {
    it("happy: tx sent and confirmed", async () => {
      const receipt = await txService.sendTx(TEST_TX, context);

      expect(dispatch.createTransaction.callCount).to.be.eq(1);
      expect(dispatch.createTransaction.getCall(0).args[0]).to.be.deep.eq(TEST_TX);
      expect(transaction.submit.callCount).to.be.eq(1);
      expect(transaction.validate.callCount).to.be.eq(1);
      expect(transaction.confirm.callCount).to.be.eq(1);
      expect(makeChaiReadable(receipt)).to.deep.eq(makeChaiReadable(TEST_TX_RECEIPT));
    });

    it("throws if the createTransaction (i.e. estimateGas) step fails", async () => {
      const callException = new TransactionReverted(TransactionReverted.reasons.CallException);
      dispatch.createTransaction.rejects(callException);

      // We should get the exact error back.
      await expect(txService.sendTx(TEST_TX, context)).to.be.rejectedWith(callException);
    });

    it("throws at any step when RpcError occurs", async () => {
      // Working backwards, throw this rpc error at every step.
      const rpcError = new RpcError(RpcError.reasons.OutOfSync);

      transaction.confirm.rejects(rpcError);
      await expect(txService.sendTx(TEST_TX, context)).to.be.rejectedWith(rpcError);

      transaction.validate.rejects(rpcError);
      await expect(txService.sendTx(TEST_TX, context)).to.be.rejectedWith(rpcError);

      transaction.submit.rejects(rpcError);
      await expect(txService.sendTx(TEST_TX, context)).to.be.rejectedWith(rpcError);

      dispatch.createTransaction.rejects(rpcError);
      await expect(txService.sendTx(TEST_TX, context)).to.be.rejectedWith(rpcError);
    });

    it("throws if submit fails on first attempt", async () => {
      const callException = new TransactionReverted(TransactionReverted.reasons.ExecutionFailed);
      transaction.submit.rejects(callException);

      // We should get the exact error back.
      await expect(txService.sendTx(TEST_TX, context)).to.be.rejectedWith(callException);
    });

    it("retries transaction with higher gas price if validate fails", async () => {
      // We would expect transaction to reject with timeout in this edge case.
      validateAttemptShouldSucceed = 2;

      // This should send the tx, then attempt to confirm, fail, bump gas, and receive confirmation the second time.
      await txService.sendTx(TEST_TX, context);

      expect(transaction.validate.callCount).to.equal(2);
      expect(transaction.bumpGasPrice.callCount).to.equal(1);
    });

    it("retries transaction with same gas price if confirm fails", async () => {
      // We would expect transaction to reject with confirmation timeout in this edge case.
      confirmAttemptShouldSucceed = 2;

      // A failure at confirmation step implies a re-org, so we should resubmit from the start.
      await txService.sendTx(TEST_TX, context);

      expect(transaction.confirm.callCount).to.equal(2);
      expect(transaction.bumpGasPrice.callCount).to.equal(0);
    });

    it("handles failure on retry due to tx already mined", async () => {
      confirmAttemptShouldSucceed = 2;
      transaction.submit.onCall(1).callsFake(async (): Promise<providers.TransactionResponse> => {
        attempts.submit += 1;
        throw new AlreadyMined(AlreadyMined.reasons.ReplacementUnderpriced);
      });

      await txService.sendTx(TEST_TX, context);
    });
  });

  describe("readTx", () => {
    it("happy: returns exactly what it reads", async () => {
      const fakeData = getRandomBytes32();
      dispatch.readTransaction.resolves(ok(fakeData));

      const data = await txService.readTx(TEST_READ_TX);

      expect(data).to.deep.eq(fakeData);
      expect(dispatch.readTransaction.callCount).to.equal(1);
      expect(dispatch.readTransaction.args[0][0]).to.deep.eq(TEST_READ_TX);
    });
  });

  describe("getProvider", () => {
    it("errors if cannot get provider", async () => {
      // Replacing this method with the original fn not working.
      (txService as any).getProvider.restore();
      await expect(txService.sendTx({ ...TEST_TX, chainId: 9999 }, context)).to.be.rejectedWith(
        TransactionServiceFailure,
      );
    });
  });

  describe("getBalance", () => {
    it("happy", async () => {
      const testBalance = utils.parseUnits("42", "ether");
      const testAddress = getRandomAddress();
      dispatch.getBalance.resolves(ok(testBalance));

      const balance = await txService.getBalance(TEST_SENDER_CHAIN_ID, testAddress);

      expect(balance.eq(testBalance)).to.be.true;
      expect(dispatch.getBalance.callCount).to.equal(1);
      expect(dispatch.getBalance.getCall(0).args[0]).to.deep.eq(testAddress);
    });

    it("should throw if provider fails", async () => {
      dispatch.getBalance.resolves(err(new RpcError("fail")));

      await expect(txService.getBalance(TEST_SENDER_CHAIN_ID, mkAddress("0xaaa"))).to.be.rejectedWith("fail");
    });
  });

  describe("getDecimalsForAsset", () => {
    it("happy", async () => {
      const decimals = 18;
      const assetId = mkAddress("0xaaa");
      dispatch.getDecimalsForAsset.resolves(ok(decimals));

      const retrieved = await txService.getDecimalsForAsset(TEST_SENDER_CHAIN_ID, assetId);

      expect(retrieved).to.be.eq(decimals);
      expect(dispatch.getDecimalsForAsset.callCount).to.equal(1);
      expect(dispatch.getDecimalsForAsset.getCall(0).args[0]).to.deep.eq(assetId);
    });

    it("should throw if provider fails", async () => {
      dispatch.getBalance.resolves(err(new RpcError("fail")));

      await expect(txService.getBalance(TEST_SENDER_CHAIN_ID, mkAddress("0xaaa"))).to.be.rejectedWith("fail");
    });
  });

  describe("getBlockTime", () => {
    it("happy", async () => {
      const time = Math.floor(Date.now() / 1000);
      dispatch.getBlockTime.resolves(ok(time));

      const blockTime = await txService.getBlockTime(TEST_SENDER_CHAIN_ID);

      expect(blockTime).to.be.eq(time);
      expect(dispatch.getBlockTime.callCount).to.equal(1);
    });

    it("should throw if provider fails", async () => {
      dispatch.getBlockTime.resolves(err(new RpcError("fail")));

      await expect(txService.getBlockTime(TEST_SENDER_CHAIN_ID)).to.be.rejectedWith("fail");
    });
  });

  // TODO: #154 Maybe we should test whether the events are firing for each event type?
  describe("attach", () => {
    it("should attach callback to event", async () => {
      const spy = Sinon.spy();
      txService.attach(NxtpTxServiceEvents.TransactionAttemptSubmitted, spy);

      // We want to be certain that the event will be triggered each time.
      const testAttempts = 5;
      confirmAttemptShouldSucceed = testAttempts;
      await txService.sendTx(TEST_TX, context);
      expect(spy.callCount).to.equal(testAttempts);
    });

    it("should properly use filtering condition", async () => {
      // Fake bumping up the gas price. We'll use this as part of the filtering condition below.
      const testAttempts = 8;
      for (let i = 1; i <= testAttempts; i++) {
        transaction.submit.onCall(i).resolves({
          ...TEST_TX_RESPONSE,
          gasPrice: BigNumber.from(i),
        });
      }
      // Spy should only be called 'targetCalls' number of times.
      const targetCalls = 3;
      const spy = Sinon.spy();
      txService.attach(NxtpTxServiceEvents.TransactionAttemptSubmitted, spy, (data): boolean => {
        return data.response.gasPrice.gt(testAttempts - targetCalls - 1);
      });
      confirmAttemptShouldSucceed = testAttempts;

      await txService.sendTx(TEST_TX, context);

      expect(spy.callCount).to.equal(targetCalls);
    });
  });

  describe("attachOnce", () => {
    it("should attach listener to event, and only be called once", async () => {
      const spy = Sinon.spy();
      txService.attachOnce(NxtpTxServiceEvents.TransactionAttemptSubmitted, spy);
      // We want to be certain that the event will be triggered only once.
      confirmAttemptShouldSucceed = 5;

      await txService.sendTx(TEST_TX, context);

      expect(spy.callCount).to.equal(1);
    });

    it("should properly use filtering condition", async () => {
      // Rinse and repeat the last filtering condition test.
      const testAttempts = 8;
      for (let i = 1; i <= testAttempts; i++) {
        transaction.submit.onCall(i).resolves({
          ...TEST_TX_RESPONSE,
          gasPrice: BigNumber.from(i),
        });
      }
      // Spy should only be called once.
      const spy = Sinon.spy();
      // The attempt # that will trigger the spy.
      const targetAttemptTrigger = 5;
      txService.attachOnce(NxtpTxServiceEvents.TransactionAttemptSubmitted, spy, (data): boolean => {
        return data.response.gasPrice.gt(targetAttemptTrigger);
      });
      confirmAttemptShouldSucceed = testAttempts;

      await txService.sendTx(TEST_TX, context);

      expect(spy.callCount).to.equal(1);
      expect(spy.args[0][0].response.gasPrice.eq(targetAttemptTrigger));
    });
  });

  describe("detach", () => {
    it("should remove listener from event", async () => {
      const spy = Sinon.spy();
      txService.attach(NxtpTxServiceEvents.TransactionAttemptSubmitted, spy);

      // Event should be triggered for this round.
      await txService.sendTx(TEST_TX, context);
      expect(spy.callCount).to.equal(1);

      // Event should NOT be triggered for this round.
      txService.detach(NxtpTxServiceEvents.TransactionAttemptSubmitted);
      await txService.sendTx(TEST_TX, context);

      // Call count should remain the same.
      expect(spy.callCount).to.equal(1);
    });
  });

  describe("waitFor", () => {
    it("should wait for event", async () => {
      const spy = Sinon.spy();
      txService.attach(NxtpTxServiceEvents.TransactionAttemptSubmitted, spy);

      // Wrap in a promise here to be sure that the waitFor call is blocking.
      const promise = new Promise<boolean>(async (resolve) => {
        await txService.waitFor(NxtpTxServiceEvents.TransactionAttemptSubmitted, 10_000);
        resolve(spy.callCount === 1);
      });

      expect(promise).to.eventually.be.true;
      await txService.sendTx(TEST_TX, context);
    });

    it("should expire after timeout", async () => {
      txService.attach(NxtpTxServiceEvents.TransactionAttemptSubmitted, () => {});
      await expect(txService.waitFor(NxtpTxServiceEvents.TransactionAttemptSubmitted, 10)).to.be.rejectedWith(
        EvtError.Timeout,
      );
    });
  });
});
