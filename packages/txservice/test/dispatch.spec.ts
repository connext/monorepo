import { getRandomBytes32, Logger, mkAddress, RequestContext, txReceiptMock } from "@connext/nxtp-utils";
import { expect } from "@connext/nxtp-utils/src/expect";
import { BigNumber, providers, Wallet } from "ethers";
import Sinon, { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";

import { ChainConfig, DEFAULT_CONFIG } from "../src/config";
import { DispatchCallbacks, TransactionDispatch } from "../src/dispatch";
import {
  BadNonce,
  MaxBufferLengthError,
  NotEnoughConfirmations,
  RpcError,
  TimeoutError,
  TransactionProcessingError,
  TransactionReplaced,
  TransactionReverted,
} from "../src/error";
import { ChainRpcProvider } from "../src/provider";
import { Gas, OnchainTransaction } from "../src/types";
import {
  makeChaiReadable,
  TEST_FULL_TX,
  TEST_SENDER_CHAIN_ID,
  TEST_TX,
  TEST_TX_RECEIPT,
  TEST_TX_RESPONSE,
} from "./constants";

const logger = new Logger({
  level: process.env.LOG_LEVEL ?? "silent",
  name: "DispatchTest",
});
const ADDRESS = mkAddress("0xaaa");
const OG_MAX_INFLIGHT_TRANSACTIONS = (TransactionDispatch as any).MAX_INFLIGHT_TRANSACTIONS;

let signer: SinonStubbedInstance<Wallet>;
let transaction: OnchainTransaction;
let txDispatch: TransactionDispatch;
let dispatchCallbacks: DispatchCallbacks;
let context: RequestContext = {
  id: "",
  origin: "",
};

let getGasPriceStub: SinonStub;
let estimateGasStub: SinonStub;
let getTransactionCountStub: SinonStub;
let sendTransactionStub: SinonStub;
let getAddressStub: SinonStub;
let confirmTransactionStub: SinonStub;
let determineNonceStub: SinonStub;
let submitStub: SinonStub;
let mineStub: SinonStub;
let confirmStub: SinonStub;
let bumpStub: SinonStub;
let failStub: SinonStub;

const stubAllDispatchMethods = (): void => {
  determineNonceStub = stub(txDispatch as any, "determineNonce").callsFake(() => {
    const nonce = TEST_TX_RESPONSE.nonce;
    return { nonce, backfill: false, transactionCount: nonce };
  });
  getAddressStub = stub(txDispatch as any, "getAddress").resolves(signer.address);
  sendTransactionStub = stub(txDispatch as any, "sendTransaction").returns(TEST_TX_RESPONSE);
  getTransactionCountStub = stub(txDispatch as any, "getTransactionCount").resolves(TEST_TX_RESPONSE.nonce);
  getGasPriceStub = stub(txDispatch as any, "getGasPrice").resolves(TEST_FULL_TX.gasPrice);
  estimateGasStub = stub(txDispatch as any, "estimateGas").resolves(TEST_FULL_TX.gasLimit);
  submitStub = stub(txDispatch as any, "submit").resolves();
  mineStub = stub(txDispatch as any, "mine").resolves();
  confirmStub = stub(txDispatch as any, "confirm").resolves();
  bumpStub = stub(txDispatch as any, "bump").resolves();
  failStub = stub(txDispatch as any, "fail").resolves();
  confirmTransactionStub = stub(txDispatch, "confirmTransaction").resolves(txReceiptMock);
};

let fakeTransactionState: {
  didSubmit: boolean;
  didFinish: boolean;
};

describe("TransactionDispatch", () => {
  beforeEach(async () => {
    (TransactionDispatch as any).MAX_INFLIGHT_TRANSACTIONS = OG_MAX_INFLIGHT_TRANSACTIONS;

    fakeTransactionState = {
      didSubmit: false,
      didFinish: false,
    };

    dispatchCallbacks = {
      onSubmit: Sinon.spy(),
      onMined: Sinon.spy(),
      onConfirm: Sinon.spy(),
      onFail: Sinon.spy(),
    };

    signer = createStubInstance(Wallet);
    (signer as any).address = ADDRESS;

    const chainConfig: ChainConfig = {
      providers: [
        {
          url: "https://-------------",
        },
      ],
      confirmations: 1,
      confirmationTimeout: 10_000,
      gasStations: [],
    };

    Sinon.stub(ChainRpcProvider.prototype as any, "syncProviders").resolves();
    Sinon.stub(ChainRpcProvider.prototype as any, "setBlockPeriod").resolves();

    // NOTE: This will start dispatch with NO loops running. We will start the loops manually in unit tests below.
    txDispatch = new TransactionDispatch(
      logger,
      TEST_SENDER_CHAIN_ID,
      chainConfig,
      { ...DEFAULT_CONFIG },
      signer,
      dispatchCallbacks,
      false,
    );

    // This will stub all dispatch methods. Methods below should be restored manually as needed.
    stubAllDispatchMethods();

    context.id = getRandomBytes32();
    context.origin = "TransactionDispatchTest";

    transaction = new OnchainTransaction(
      context,
      TEST_TX,
      TEST_TX_RESPONSE.nonce,
      new Gas(BigNumber.from(1), BigNumber.from(1)),
      {
        confirmationTimeout: 1,
        confirmationsRequired: 1,
      },
      "test_tx_uuid",
    );
    stub(transaction, "didSubmit").get(() => fakeTransactionState.didSubmit);
    stub(transaction, "didFinish").get(() => fakeTransactionState.didFinish);
    (transaction as any).context = context;
    transaction.attempt = 0;
    (transaction as any).timestamp = undefined;
    transaction.responses = [];
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#mineLoop", () => {
    let stubTx: OnchainTransaction;
    beforeEach(() => {
      stubTx = new OnchainTransaction(
        context,
        {
          ...TEST_TX,
          data: getRandomBytes32(),
        },
        TEST_TX_RESPONSE.nonce,
        new Gas(BigNumber.from(1), BigNumber.from(1)),
        {
          confirmationTimeout: 1,
          confirmationsRequired: 1,
        },
        "1",
      );
      (txDispatch as any).inflightBuffer = [stubTx];
    });

    it("should fail if there is a non-timeout tx error", async () => {
      stubTx.error = new Error("test error");
      await (txDispatch as any).mineLoop();
      expect(failStub).callCount(0);
    });

    it("should bump if times out during confirming", async () => {
      mineStub.onCall(0).rejects(new TimeoutError());
      mineStub.onCall(1).resolves();
      await (txDispatch as any).mineLoop();
      expect(mineStub.callCount).to.eq(2);
      expect(makeChaiReadable(mineStub.getCall(0).args[0])).to.deep.eq(makeChaiReadable(stubTx));
      expect(makeChaiReadable(mineStub.getCall(1).args[0])).to.deep.eq(makeChaiReadable(stubTx));
      expect(bumpStub).to.have.been.calledOnceWithExactly(stubTx);
      expect(submitStub).to.have.been.calledOnceWithExactly(stubTx);
      expect((txDispatch as any).minedBuffer.length).to.eq(1);
    });

    it("should bump txs in the buffer", async () => {
      const stubTx1 = { ...stubTx, data: "0xa" };
      const stubTx2 = { ...stubTx, data: "0xb" };
      const stubTx3 = { ...stubTx, data: "0xc" };
      (txDispatch as any).inflightBuffer = [stubTx1, stubTx2, stubTx3];
      mineStub.onCall(0).rejects(new TimeoutError());
      mineStub.onCall(1).resolves();
      mineStub.onCall(2).rejects(new TimeoutError());
      mineStub.onCall(3).resolves();
      mineStub.onCall(4).rejects(new TimeoutError());
      mineStub.onCall(5).resolves();
      await (txDispatch as any).mineLoop();

      const readableStubTx1 = makeChaiReadable(stubTx1);
      const readableStubTx2 = makeChaiReadable(stubTx2);
      const readableStubTx3 = makeChaiReadable(stubTx3);

      expect(mineStub.callCount).to.eq(6);
      expect(mineStub).to.have.been.calledWithExactly(readableStubTx1);
      expect(mineStub).to.have.been.calledWithExactly(readableStubTx2);
      expect(mineStub).to.have.been.calledWithExactly(readableStubTx3);

      expect(bumpStub).to.have.been.calledWithExactly(readableStubTx1);
      expect(submitStub).to.have.been.calledWithExactly(readableStubTx1);
      expect(bumpStub).to.have.been.calledWithExactly(readableStubTx2);
      expect(submitStub).to.have.been.calledWithExactly(readableStubTx2);
      expect(bumpStub).to.have.been.calledWithExactly(readableStubTx3);
      expect(submitStub).to.have.been.calledWithExactly(readableStubTx3);

      expect((txDispatch as any).minedBuffer.length).to.deep.eq(1);
    });

    it("should assign errors on tx resubmit", async () => {
      const stubTx1 = { ...stubTx, data: "0xa" };
      (txDispatch as any).inflightBuffer = [stubTx1];
      mineStub.rejects(new TimeoutError());
      const error = new Error("test");
      submitStub.rejects(error);
      await (txDispatch as any).mineLoop();

      const readableStubTx = makeChaiReadable(stubTx1);
      expect(mineStub).to.have.been.calledOnceWithExactly(readableStubTx);
      expect(bumpStub).to.have.been.calledOnceWithExactly(readableStubTx);
      expect(submitStub).to.have.been.calledOnceWithExactly(readableStubTx);
      expect(stubTx1.error).to.eq(error);
      expect(failStub).to.have.been.calledOnceWithExactly(readableStubTx);
      // Should have taken tx out of the buffer, but not added to minedBuffer.
      expect((txDispatch as any).inflightBuffer).to.deep.eq([]);
      expect((txDispatch as any).minedBuffer).to.deep.eq([]);
    });

    it("should catch top level error", async () => {
      const mineError = new Error("test mine error");
      mineStub.rejects(mineError);
      failStub.rejects(new Error("test fail error"));
      await expect((txDispatch as any).mineLoop()).to.not.be.rejected;
      expect(mineStub.callCount).to.eq(1);
      expect(failStub.callCount).to.eq(1);
      expect(failStub.getCall(0).args[0].error).to.deep.eq(mineError);
    });

    it("should mine a tx and remove it from the buffer", async () => {
      await (txDispatch as any).mineLoop();
      expect(mineStub).to.have.been.calledOnceWithExactly(stubTx);
      expect((txDispatch as any).inflightBuffer.length).to.eq(0);
    });
  });

  describe("#confirmLoop", () => {
    let stubTx: any;
    beforeEach(() => {
      stubTx = {};
      (txDispatch as any).minedBuffer = [stubTx];
    });

    it("should fail if confirming fails", async () => {
      const error = new Error("test error");
      confirmStub.rejects(error);
      await (txDispatch as any).confirmLoop();
      stubTx.error = error;
      expect(failStub).to.have.been.calledOnceWithExactly(stubTx);
      expect((txDispatch as any).minedBuffer.length).to.eq(0);
    });

    it("should confirm tx and remove from buffer", async () => {
      await (txDispatch as any).confirmLoop();
      expect(confirmStub).to.have.been.calledOnceWithExactly(stubTx);
      expect((txDispatch as any).minedBuffer.length).to.eq(0);
    });
  });

  describe("#determineNonce", () => {
    let attemptedNonces: number[];
    beforeEach(() => {
      (txDispatch as any).nonce = 0;
      (txDispatch as any).lastReceivedTxCount = -1;
      getTransactionCountStub = stub().resolves(TEST_TX_RESPONSE.nonce);
      (txDispatch as any).getTransactionCount = getTransactionCountStub;
      attemptedNonces = [];
      // Restore related method.
      determineNonceStub.restore();
    });

    it("happy: first send, no error", async () => {
      const txCount = 20;
      getTransactionCountStub.resolves(txCount);
      const { nonce, backfill, transactionCount } = await (txDispatch as any).determineNonce(attemptedNonces);
      expect(nonce).to.eq(txCount);
      expect(backfill).to.be.false;
      expect(transactionCount).to.eq(txCount);
      // should have called getTransactionCount (NOTE: we are temporarily calling it twice for debugging,
      // leaving this as a > 0 check for now).
      expect(getTransactionCountStub.callCount > 0).to.be.true;
      // This method should have modified the passed-in map.
      expect(attemptedNonces.includes(nonce)).to.be.true;
      // Should have also modified lastReceivedTxCount.
      expect((txDispatch as any).lastReceivedTxCount).to.eq(txCount);
    });

    it("should assign nonce based on higher value: transaction count or cached nonce", async () => {
      const txCount = 97;
      let localNonce = 3;
      getTransactionCountStub.resolves(txCount);
      (txDispatch as any).nonce = localNonce;
      let { nonce, backfill, transactionCount } = await (txDispatch as any).determineNonce(attemptedNonces);
      expect(nonce).to.eq(txCount);
      expect(backfill).to.be.false;
      expect(transactionCount).to.eq(txCount);

      // Now, let's try again, but this time we'll set the local nonce to be higher than the txCount
      attemptedNonces = [];
      localNonce = 348;
      (txDispatch as any).nonce = localNonce;
      ({ nonce, backfill, transactionCount } = await (txDispatch as any).determineNonce(attemptedNonces));
      expect(nonce).to.eq(localNonce);
      expect(backfill).to.be.false;
      expect(transactionCount).to.eq(txCount);
    });

    it("happy: handles backtracking txcount", async () => {
      (txDispatch as any).nonce = 101;
      (txDispatch as any).lastReceivedTxCount = 100;
      let backtrackTxCount = 91;

      // On initial attempt:
      getTransactionCountStub.onCall(0).resolves(backtrackTxCount);
      let { nonce, backfill, transactionCount } = await (txDispatch as any).determineNonce(attemptedNonces);
      expect(nonce).to.eq(backtrackTxCount);
      expect(transactionCount).to.eq(backtrackTxCount);
      expect(backfill).to.be.true;
      expect((txDispatch as any).lastReceivedTxCount).to.eq(backtrackTxCount);

      // On second, follow-up attempt, txcount backtracks further:
      const error = new BadNonce(BadNonce.reasons.NonceExpired);
      backtrackTxCount = 83;
      getTransactionCountStub.resolves(backtrackTxCount);
      ({ nonce, backfill, transactionCount } = await (txDispatch as any).determineNonce(attemptedNonces, error));
      expect(nonce).to.eq(backtrackTxCount);
      expect(transactionCount).to.eq(backtrackTxCount);
      expect(backfill).to.be.true;
      expect((txDispatch as any).lastReceivedTxCount).to.eq(backtrackTxCount);
    });

    it("should throw if getTransactionCount fails", async () => {
      getTransactionCountStub.rejects(new RpcError("fail"));
      await expect((txDispatch as any).determineNonce(attemptedNonces)).to.be.rejectedWith("fail");
    });

    it("should handle nonce too low error by incrementing nonce to first unused position", async () => {
      attemptedNonces = [52, 53, 54, 55, 56];
      const nonceExpiredError = new BadNonce(BadNonce.reasons.NonceExpired);
      const replacementUnderpricedError = new BadNonce(BadNonce.reasons.ReplacementUnderpriced);
      let txCount = attemptedNonces[0];
      (txDispatch as any).lastReceivedTxCount = txCount;
      getTransactionCountStub.resolves(txCount);
      const expectedNonce = attemptedNonces[attemptedNonces.length - 1] + 1;

      // Should increment by 1 for both of these.
      // NONCE_EXPIRED
      let { nonce, backfill, transactionCount } = await (txDispatch as any).determineNonce(
        attemptedNonces,
        nonceExpiredError,
      );
      expect(nonce).to.eq(expectedNonce);
      expect(transactionCount).to.eq(txCount);
      expect(backfill).to.be.false;
      expect((txDispatch as any).lastReceivedTxCount).to.eq(txCount);
      // REPLACEMENT_UNDERPRICED
      ({ nonce, backfill, transactionCount } = await (txDispatch as any).determineNonce(
        attemptedNonces,
        replacementUnderpricedError,
      ));
      expect(nonce).to.eq(expectedNonce + 1);
      expect(transactionCount).to.eq(txCount);
      expect(backfill).to.be.false;
      expect((txDispatch as any).lastReceivedTxCount).to.eq(txCount);

      // In this test case, we simulate conditions as they would be if we backfilled for the previous transaction (so the nonce is much lower than it
      // should be). We should set the nonce to the transaction count in this case.
      // NOTE: This may seem redundant with a previous unit test "should assign nonce based on higher value: transaction count or cached nonce";
      // but in fact, it is different: in this case we have a value inside our attemptedNonces, and we are handling things inside the 'BadNonce error' block.
      const localNonce = 59;
      (txDispatch as any).nonce = localNonce;
      attemptedNonces = [localNonce];
      (txDispatch as any).lastReceivedTxCount = localNonce;
      txCount = 83;
      getTransactionCountStub.resolves(txCount);
      ({ nonce, backfill, transactionCount } = await (txDispatch as any).determineNonce(
        attemptedNonces,
        nonceExpiredError,
      ));
      expect(nonce).to.eq(txCount);
      expect(transactionCount).to.eq(txCount);
      expect(backfill).to.be.false;
      expect((txDispatch as any).lastReceivedTxCount).to.eq(txCount);
    });

    it("should handle nonce incorrect by always setting to the tx count", async () => {
      attemptedNonces = [33, 34, 35, 36, 37, 37, 37];
      const error = new BadNonce(BadNonce.reasons.NonceIncorrect);
      const txCount = 37;
      (txDispatch as any).lastReceivedTxCount = txCount;
      getTransactionCountStub.resolves(txCount);

      // Should not increment for this error, and instead just set it to the exact tx count.
      let { nonce, backfill, transactionCount } = await (txDispatch as any).determineNonce(attemptedNonces, error);
      expect(nonce).to.eq(txCount);
      expect(transactionCount).to.eq(txCount);
      expect(backfill).to.be.false;
      expect((txDispatch as any).lastReceivedTxCount).to.eq(txCount);
    });
  });

  describe("#send", () => {
    beforeEach(() => {
      // Setting the state ahead of time so when we do reach the waiting portions of send, it will wrap up right away.
      // NOTE: State updating is usually relagated to the mine/confirm loops.
      fakeTransactionState.didSubmit = true;
      fakeTransactionState.didFinish = true;

      submitStub.callsFake(async (transaction: OnchainTransaction) => {
        stub(transaction, "didSubmit").get(() => fakeTransactionState.didSubmit);
        stub(transaction, "didFinish").get(() => fakeTransactionState.didFinish);
        transaction.responses = [TEST_TX_RESPONSE];
        transaction.receipt = TEST_TX_RECEIPT;
      });
    });

    it("happy", async () => {
      const receipt = await txDispatch.send(TEST_TX, context);
      expect(makeChaiReadable(receipt)).to.deep.eq(makeChaiReadable(TEST_TX_RECEIPT));

      // should have called getGas
      expect(getGasPriceStub.callCount).to.eq(1);
      expect(estimateGasStub.callCount).to.eq(1);
      expect(estimateGasStub.getCall(0).args[0]).to.deep.eq(TEST_TX);

      // should have called submit (just once)
      expect(submitStub.callCount).to.eq(1);

      // should push to inflight buffer
      expect((txDispatch as any).inflightBuffer.length).to.eq(1);

      // should increment local nonce
      expect((txDispatch as any).nonce).to.eq(TEST_TX_RESPONSE.nonce + 1);
    });

    it("should stall if buffer is full, i.e. we hit inflight maximum", async () => {
      // Fill up the inflight buffer
      (txDispatch as any).inflightBuffer = [...Array(TransactionDispatch.MAX_INFLIGHT_TRANSACTIONS)].map(() => ({}));
      // Async send
      const receipt = txDispatch.send(TEST_TX, context);
      // Make sure we havent called submit yet
      expect(submitStub.callCount).to.eq(0);
      // Now that we've removed 1 spot from buffer, send should execute.
      (txDispatch as any).inflightBuffer.shift();
      expect(makeChaiReadable(await receipt)).to.be.deep.eq(makeChaiReadable(TEST_TX_RECEIPT));
      expect(submitStub.callCount).to.eq(1);
    });

    it("should throw if getGas fails", async () => {
      getGasPriceStub.rejects(new RpcError("fail"));
      await expect(txDispatch.send(TEST_TX, context)).to.be.rejectedWith("fail");
    });

    it("should retrieve new nonce and retry after a badnonce error", async () => {
      const badNonceError = new BadNonce(BadNonce.reasons.NonceExpired);
      submitStub.onCall(0).rejects(badNonceError);
      submitStub.onCall(1).resolves();
      const txCount = 2;
      // Array to which we can push copies of argument to avoid mutex getting in the way of call validation.
      const attemptedNoncesArgPerCall: any[] = [];
      determineNonceStub.onCall(0).callsFake((attemptedNonces: number[]) => {
        attemptedNoncesArgPerCall.push(Array.from(attemptedNonces));
        const nonce = txCount;
        attemptedNonces.push(nonce);
        return { nonce, backfill: false, transactionCount: txCount };
      });
      determineNonceStub.onCall(1).callsFake((attemptedNonces: number[]) => {
        attemptedNoncesArgPerCall.push(Array.from(attemptedNonces));
        const nonce = txCount + 1;
        attemptedNonces.push(nonce);
        return { nonce, backfill: false, transactionCount: txCount };
      });

      await txDispatch.send(TEST_TX, context);

      expect(submitStub.callCount).to.eq(3);
      expect(submitStub.getCall(0).args[0].nonce).to.eq(2);
      expect(submitStub.getCall(1).args[0].nonce).to.eq(3);

      expect(determineNonceStub.callCount).to.eq(2);
      expect(attemptedNoncesArgPerCall[0]).to.deep.eq([]);
      expect(determineNonceStub.getCall(0).args[1]).to.eq(undefined);
      expect(attemptedNoncesArgPerCall[1]).to.deep.eq([2]);
      expect(determineNonceStub.getCall(1).args[1]).to.eq(badNonceError);
    });

    it("should throw if a non-nonce error occurs", async () => {
      submitStub.rejects(new TransactionReverted("fail"));
      await expect(txDispatch.send(TEST_TX, context)).to.be.rejectedWith("fail");
    });

    it.skip("should eventually hit a maximum retry on initial submit", async () => {});

    it.skip("should wait until transaction is mined/confirmed", async () => {});

    it.skip("should throw if the transaction has an error after mine/confirm", async () => {});

    it.skip("should throw if the transaction has no receipt after mine/confirm", async () => {});
  });

  describe("#submit", () => {
    beforeEach(() => {
      submitStub.restore();
    });

    it("should throw if the transaction is already finished", async () => {
      fakeTransactionState.didFinish = true;
      await expect((txDispatch as any).submit(transaction)).to.eventually.be.rejectedWith(TransactionProcessingError);
    });

    it("should throw if it's a second attempt and gas price hasn't been increased", async () => {
      const txResponse: providers.TransactionResponse = { ...TEST_TX_RESPONSE };
      transaction.responses = [txResponse];
      await expect((txDispatch as any).submit(transaction)).to.eventually.be.rejectedWith(TransactionProcessingError);
    });

    it("should throw if sendTransaction errors", async () => {
      const error = new MaxBufferLengthError();
      sendTransactionStub.rejects(error);
      await expect((txDispatch as any).submit(transaction)).to.eventually.be.rejectedWith(MaxBufferLengthError);
    });

    it("happy", async () => {
      await (txDispatch as any).submit(transaction);
      expect(sendTransactionStub).to.be.calledOnceWithExactly(transaction);
      expect(dispatchCallbacks.onSubmit).to.be.calledOnceWithExactly(transaction);
      expect(transaction.responses.length).to.eq(1);
      expect(makeChaiReadable(transaction.responses[0])).to.deep.eq(makeChaiReadable(TEST_TX_RESPONSE));
      expect(transaction.attempt).to.eq(1);
    });
  });

  describe("#mine", () => {
    beforeEach(() => {
      fakeTransactionState.didSubmit = true;
      mineStub.restore();
    });

    it("throws if tx did not submit", async () => {
      fakeTransactionState.didSubmit = false;
      await expect((txDispatch as any).mine(transaction)).to.eventually.be.rejectedWith(TransactionProcessingError);
    });

    it("throws if confirmTransaction errors with TransactionReplaced but no replacement exists", async () => {
      confirmTransactionStub.rejects(new TransactionReplaced(undefined, undefined));
      await expect((txDispatch as any).mine(transaction)).to.eventually.be.rejectedWith(TransactionProcessingError);
    });

    it("throws if confirmTransaction errors with TransactionReplaced but replacement is unrecognized", async () => {
      transaction.responses = [TEST_TX_RESPONSE];
      confirmTransactionStub.rejects(
        new TransactionReplaced(
          { ...TEST_TX_RECEIPT, transactionHash: "0x123456789" },
          { ...TEST_TX_RESPONSE, hash: "0x123456789" },
        ),
      );
      await expect((txDispatch as any).mine(transaction)).to.eventually.be.rejectedWith(TransactionReplaced);
    });

    it("happy: confirms if transaction is replaced", async () => {
      const replacementHash = getRandomBytes32();
      const replacement = { ...TEST_TX_RESPONSE, hash: replacementHash };
      transaction.responses = [TEST_TX_RESPONSE, { ...TEST_TX_RESPONSE, hash: replacementHash }];
      const preTx = { ...transaction };
      confirmTransactionStub.rejects(new TransactionReplaced(txReceiptMock, replacement));

      await (txDispatch as any).mine(transaction);
      expect(makeChaiReadable(transaction.receipt)).to.deep.eq(makeChaiReadable(txReceiptMock));
    });

    it("throws if confirmTransaction errors with TransactionReverted", async () => {
      transaction.responses = [TEST_TX_RESPONSE];
      const error = new TransactionReverted("test", txReceiptMock);
      confirmTransactionStub.rejects(error);

      await expect((txDispatch as any).mine(transaction)).to.be.rejectedWith(error);
    });

    it("throws if confirmTransaction receipt status == 0", async () => {
      transaction.responses = [TEST_TX_RESPONSE];
      confirmTransactionStub.resolves({ ...txReceiptMock, status: 0 });

      await expect((txDispatch as any).mine(transaction)).to.be.rejectedWith(
        TransactionProcessingError.reasons.DidNotThrowRevert,
      );
    });

    it("throws if confirmTransaction confirmations < 1", async () => {
      transaction.responses = [TEST_TX_RESPONSE];
      confirmTransactionStub.resolves({ ...txReceiptMock, confirmations: 0 });

      await expect((txDispatch as any).mine(transaction)).to.be.rejectedWith(
        TransactionProcessingError.reasons.InsufficientConfirmations,
      );
    });

    it("happy: mines tx with response", async () => {
      transaction.responses = [TEST_TX_RESPONSE];
      const preTx = { ...transaction };
      await (txDispatch as any).mine(transaction);
      expect(makeChaiReadable(transaction.receipt)).to.deep.eq(makeChaiReadable(txReceiptMock));
      expect(transaction.minedBlockNumber).to.eq(txReceiptMock.blockNumber);
    });
  });

  describe("#confirm", () => {
    const testNumOfConfirmations = 10;
    beforeEach(() => {
      confirmTransactionStub.resolves({
        ...txReceiptMock,
        confirmations: 10,
      });
      fakeTransactionState.didSubmit = true;
      transaction.receipt = txReceiptMock;

      confirmStub.restore();
    });

    it("happy", async () => {
      await (txDispatch as any).confirm(transaction);
      expect(makeChaiReadable(confirmTransactionStub.getCall(0).args[0])).to.be.deep.eq(makeChaiReadable(transaction));
      // Check to make sure we overwrote transaction receipt.
      expect(makeChaiReadable(transaction.receipt)).to.be.deep.eq(
        makeChaiReadable({
          ...txReceiptMock,
          confirmations: testNumOfConfirmations,
        }),
      );
    });

    it("throws if you have not submitted yet", async () => {
      fakeTransactionState.didSubmit = false;
      await expect((txDispatch as any).confirm(transaction)).to.be.rejectedWith(
        TransactionProcessingError.reasons.MineOutOfOrder,
      );
    });

    it("throws if confirmTransaction receipt status == 0", async () => {
      transaction.responses = [TEST_TX_RESPONSE];
      confirmTransactionStub.resolves({ ...txReceiptMock, status: 0 });

      await expect((txDispatch as any).confirm(transaction)).to.be.rejectedWith(
        TransactionProcessingError.reasons.DidNotThrowRevert,
      );
    });

    it("escalates error as a TransactionServiceFailure if timeout occurs", async () => {
      const timeoutError = new TimeoutError("test");
      confirmTransactionStub.rejects(timeoutError);
      await expect((txDispatch as any).confirm(transaction)).to.be.rejectedWith(NotEnoughConfirmations);
    });
  });

  describe("#bump", () => {
    beforeEach(() => {
      (transaction as any).responses = [TEST_TX_RESPONSE];
      transaction.bumps = 0;

      bumpStub.restore();
    });

    it("shouldn't bump if we've reached maximum gas price", async () => {
      const max = (txDispatch as any).config.gasMaximum;
      transaction.gas.price = BigNumber.from(max);
      // Valid state: we've sent off 2 transactions and bumped once.
      (transaction as any).responses = [TEST_TX_RESPONSE, TEST_TX_RESPONSE];
      transaction.bumps = 1;
      // Should return without bumping; the transaction's gas price is already at the max.
      await txDispatch.bump(transaction);
      // Assuming it didn't bump, these values should stay the same.
      expect(transaction.gas.price.toString()).to.be.eq(max);
      expect(transaction.bumps).to.be.eq(1);
    });

    it("should procceed using gas price minimum from config if getGasPrice fails", async () => {
      getGasPriceStub.rejects(new Error("fail"));
      await txDispatch.bump(transaction);
    });

    it("shouldn't bump if a previous resubmit failed", async () => {
      // This will simulate state: we've sent off 1 initial tx, bumped gas price, then failed to resubmit
      // (there should be a second hash present in the transaction if the "resubmit" was successful).
      (transaction as any).responses = [TEST_TX_RESPONSE];
      transaction.bumps = 1;
      const testCurrentGasPrice = BigNumber.from(1234567);
      transaction.gas.price = testCurrentGasPrice;
      // Should return without bumping.
      await txDispatch.bump(transaction);
      // Assuming it didn't bump, these values should stay the same.
      expect(transaction.gas.price.toString()).to.be.eq(testCurrentGasPrice.toString());
      expect(transaction.bumps).to.be.eq(1);
    });

    it("happy: should bump updated price", async () => {
      const initial = BigNumber.from(10);
      (transaction as any).gas.price = BigNumber.from(5);
      getGasPriceStub.resolves(initial);
      await txDispatch.bump(transaction);
      expect(transaction.gas.price.toNumber()).to.be.eq(13);
    });

    it("happy: should bump previous price if previous price > updated price", async () => {
      const initial = BigNumber.from(10);
      (transaction as any).gas.price = initial;
      getGasPriceStub.resolves(BigNumber.from(5));
      await txDispatch.bump(transaction);
      expect(transaction.gas.price.toNumber()).to.be.eq(13);
    });
  });

  describe("#fail", () => {
    beforeEach(() => {
      failStub.restore();
    });

    it("happy: should execute the fail callback", async () => {
      let called = false;
      (txDispatch as any).callbacks.onFail = () => {
        called = true;
      };

      await (txDispatch as any).fail(transaction);
      expect(called).to.be.true;
    });
  });
});
