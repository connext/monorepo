import { getRandomBytes32, Logger, mkAddress, RequestContext, txReceiptMock } from "@connext/nxtp-utils";
import { expect } from "@connext/nxtp-utils/src/expect";
import axios from "axios";
import { BigNumber, providers, Wallet } from "ethers";
import { err, errAsync, ok, okAsync, ResultAsync } from "neverthrow";
import Sinon, { createStubInstance, reset, restore, SinonSpy, SinonStub, SinonStubbedInstance, spy, stub } from "sinon";

import { ChainConfig, DEFAULT_CONFIG } from "../src/config";
import { DispatchCallbacks, TransactionDispatch } from "../src/dispatch";
import {
  BadNonce,
  MaxBufferLengthError,
  RpcError,
  TimeoutError,
  TransactionError,
  TransactionReplaced,
  TransactionReverted,
  TransactionServiceFailure,
} from "../src/error";
import { Gas, Transaction } from "../src/types";
import { makeChaiReadable, TEST_SENDER_CHAIN_ID, TEST_TX, TEST_TX_RECEIPT, TEST_TX_RESPONSE } from "./constants";

const logger = new Logger({
  level: process.env.LOG_LEVEL ?? "silent",
  name: "DispatchTest",
});
const ADDRESS = mkAddress("0xaaa");
const OG_MAX_INFLIGHT_TRANSACTIONS = (TransactionDispatch as any).MAX_INFLIGHT_TRANSACTIONS;

let signer: SinonStubbedInstance<Wallet>;
let transaction: Transaction;
let txDispatch: TransactionDispatch;
let getAddressStub: SinonStub;
let dispatchCallbacks: DispatchCallbacks;
let context: RequestContext = {
  id: "",
  origin: "",
};

let getGas: SinonStub<any[], Gas>;
let getTransactionCount: SinonStub<any[], number>;
let submit: SinonStub<any[], Promise<void>>;
let mine: SinonStub<any[], Promise<void>>;
let confirm: SinonStub<any[], Promise<void>>;
let bump: SinonStub<any[], Promise<void>>;
let fail: SinonStub<any[], Promise<void>>;

const stubDispatchMethods = (methods?: SinonStub[]): void => {
  getGas = stub().callsFake(() => {
    return new Gas(BigNumber.from(1), BigNumber.from(1));
  });
  getTransactionCount = stub().resolves(ok(TEST_TX_RESPONSE.nonce));
  submit = stub().resolves();
  mine = stub().resolves();
  confirm = stub().resolves();
  bump = stub().resolves();
  fail = stub().resolves();
  const methodsToStub = methods ?? [getGas, getTransactionCount, submit, mine, confirm, bump, fail];
  (txDispatch as any).getGas = getGas;
  (txDispatch as any).getTransactionCount = getTransactionCount;
  (txDispatch as any).submit = submit;
  (txDispatch as any).mine = mine;
  (txDispatch as any).confirm = confirm;
  (txDispatch as any).bump = bump;
  (txDispatch as any).fail = fail;
};

let fakeTransactionState: {
  didSubmit: boolean;
  didFinish: boolean;
  discontinued: boolean;
};

let sendTransactionStub: SinonStub<any[], ResultAsync<providers.TransactionResponse, TransactionError>>;

describe("TransactionDispatch", () => {
  beforeEach(async () => {
    (TransactionDispatch as any).MAX_INFLIGHT_TRANSACTIONS = OG_MAX_INFLIGHT_TRANSACTIONS;

    fakeTransactionState = {
      didSubmit: false,
      didFinish: false,
      discontinued: false,
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

    // NOTE: This will start dispatch with NO loops running. We will start the loops manually in unit tests below.
    txDispatch = new TransactionDispatch(
      logger,
      TEST_SENDER_CHAIN_ID,
      chainConfig,
      DEFAULT_CONFIG,
      signer,
      dispatchCallbacks,
      false,
    );
    getAddressStub = stub().resolves(ok(signer.address));
    (txDispatch as any).getAddress = getAddressStub;
    sendTransactionStub = stub().returns(okAsync(TEST_TX_RESPONSE));
    (txDispatch as any).sendTransaction = sendTransactionStub;

    context.id = getRandomBytes32();
    context.origin = "TransactionDispatchTest";

    transaction = new Transaction(
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
    Sinon.stub(transaction, "didSubmit").get(() => fakeTransactionState.didSubmit);
    Sinon.stub(transaction, "discontinued").get(() => fakeTransactionState.discontinued);
    Sinon.stub(transaction, "didFinish").get(() => fakeTransactionState.didFinish);
    (transaction as any).context = context;
    transaction.attempt = 0;
    transaction.timestamp = undefined;
    transaction.responses = [];
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#mineLoop", () => {
    let stubTx: Transaction;
    beforeEach(() => {
      stubTx = new Transaction(
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
      stubDispatchMethods();
      (txDispatch as any).inflightBuffer = [stubTx];
    });

    it("should fail if there is a non-timeout tx error", async () => {
      stubTx.error = new TransactionServiceFailure("test error");
      await (txDispatch as any).mineLoop();
      expect(fail).callCount(0);
    });

    it("should bump if times out during confirming", async () => {
      mine.onCall(0).rejects(new TimeoutError());
      mine.onCall(1).resolves();
      await (txDispatch as any).mineLoop();
      expect(mine.callCount).to.eq(2);
      expect(makeChaiReadable(mine.getCall(0).args[0])).to.deep.eq(makeChaiReadable(stubTx));
      expect(makeChaiReadable(mine.getCall(1).args[0])).to.deep.eq(makeChaiReadable(stubTx));
      expect(bump).to.have.been.calledOnceWithExactly(stubTx);
      expect(submit).to.have.been.calledOnceWithExactly(stubTx);
      expect((txDispatch as any).minedBuffer.length).to.eq(1);
    });

    it("should bump all txs in the buffer", async () => {
      const stubTx1 = { ...stubTx, data: "0xa" };
      const stubTx2 = { ...stubTx, data: "0xb" };
      const stubTx3 = { ...stubTx, data: "0xc" };
      (txDispatch as any).inflightBuffer = [stubTx1, stubTx2, stubTx3];
      mine.onCall(0).rejects(new TimeoutError());
      mine.onCall(1).resolves();
      mine.onCall(2).rejects(new TimeoutError());
      mine.onCall(3).resolves();
      mine.onCall(4).rejects(new TimeoutError());
      mine.onCall(5).resolves();
      await (txDispatch as any).mineLoop();

      const readableStubTx1 = makeChaiReadable(stubTx1);
      const readableStubTx2 = makeChaiReadable(stubTx2);
      const readableStubTx3 = makeChaiReadable(stubTx3);

      expect(mine.callCount).to.eq(6);
      expect(mine).to.have.been.calledWithExactly(readableStubTx1);
      expect(mine).to.have.been.calledWithExactly(readableStubTx2);
      expect(mine).to.have.been.calledWithExactly(readableStubTx3);

      expect(bump).to.have.been.calledWithExactly(readableStubTx1);
      expect(submit).to.have.been.calledWithExactly(readableStubTx1);
      expect(bump).to.have.been.calledWithExactly(readableStubTx2);
      expect(submit).to.have.been.calledWithExactly(readableStubTx2);
      expect(bump).to.have.been.calledWithExactly(readableStubTx3);
      expect(submit).to.have.been.calledWithExactly(readableStubTx3);

      expect((txDispatch as any).minedBuffer.length).to.deep.eq(3);
    });

    it("should assign errors on tx resubmit", async () => {
      const stubTx1 = { ...stubTx, data: "0xa" };
      (txDispatch as any).inflightBuffer = [stubTx1];
      mine.rejects(new TimeoutError());
      const error = new Error("test");
      submit.rejects(error);
      await (txDispatch as any).mineLoop();

      const readableStubTx = makeChaiReadable(stubTx1);
      expect(mine).to.have.been.calledOnceWithExactly(readableStubTx);
      expect(bump).to.have.been.calledOnceWithExactly(readableStubTx);
      expect(submit).to.have.been.calledOnceWithExactly(readableStubTx);
      expect(stubTx1.error).to.eq(error);
      expect(fail).to.have.been.calledOnceWithExactly(readableStubTx);
      // Should have taken tx out of the buffer, but not added to minedBuffer.
      expect((txDispatch as any).inflightBuffer).to.deep.eq([]);
      expect((txDispatch as any).minedBuffer).to.deep.eq([]);
    });

    it("should catch top level error", async () => {
      const mineError = new Error("test mine error");
      mine.rejects(mineError);
      fail.rejects(new Error("test fail error"));
      await expect((txDispatch as any).mineLoop()).to.not.be.rejected;
      expect(mine.callCount).to.eq(1);
      expect(fail.callCount).to.eq(1);
      expect(fail.getCall(0).args[0].error).to.deep.eq(mineError);
    });

    it("should mine a tx and remove it from the buffer", async () => {
      await (txDispatch as any).mineLoop();
      expect(mine).to.have.been.calledOnceWithExactly(stubTx);
      expect((txDispatch as any).inflightBuffer.length).to.eq(0);
    });
  });

  describe("#confirmLoop", () => {
    let stubTx: any;
    beforeEach(() => {
      stubTx = {};
      stubDispatchMethods();
      (txDispatch as any).minedBuffer = [stubTx];
    });

    it("should fail if confirming fails", async () => {
      const error = new Error("test error");
      confirm.rejects(error);
      await (txDispatch as any).confirmLoop();
      stubTx.error = error;
      expect(fail).to.have.been.calledOnceWithExactly(stubTx);
      expect((txDispatch as any).minedBuffer.length).to.eq(0);
    });

    it("should catch top level error", async () => {
      const error = new Error("test");
      confirm.rejects(error);
      fail.rejects(error);
      await expect((txDispatch as any).confirmLoop()).to.not.be.rejected;
      stubTx.error = error;
      expect(fail).to.have.been.calledOnceWithExactly(stubTx);
      expect((txDispatch as any).minedBuffer).to.deep.eq([stubTx]);
    });

    it("should confirm tx and remove from buffer", async () => {
      await (txDispatch as any).confirmLoop();
      expect(confirm).to.have.been.calledOnceWithExactly(stubTx);
      expect((txDispatch as any).minedBuffer.length).to.eq(0);
    });
  });

  describe("#send", () => {
    beforeEach(() => {
      stubDispatchMethods();

      // Setting the state ahead of time so when we do reach the waiting portions of send, it will wrap up right away.
      // NOTE: State updating is usually relagated to the mine/confirm loops.
      fakeTransactionState.didSubmit = true;
      fakeTransactionState.didFinish = true;

      submit.callsFake(async (transaction: Transaction) => {
        Sinon.stub(transaction, "didSubmit").get(() => fakeTransactionState.didSubmit);
        Sinon.stub(transaction, "didFinish").get(() => fakeTransactionState.didFinish);
        transaction.receipt = TEST_TX_RECEIPT;
      });
    });

    it("happy", async () => {
      const receipt = await txDispatch.send(TEST_TX, context);
      expect(makeChaiReadable(receipt)).to.deep.eq(makeChaiReadable(TEST_TX_RECEIPT));

      // should have called getGas
      expect(getGas.callCount).to.eq(1);
      expect(getGas.getCall(0).args[0]).to.deep.eq(TEST_TX);

      // should have called getTransactionCount
      expect(getTransactionCount.callCount).to.eq(1);

      // should have called submit (just once)
      expect(submit.callCount).to.eq(1);

      // should push to inflight buffer
      expect((txDispatch as any).inflightBuffer.length).to.eq(1);

      // should increment local nonce
      expect((txDispatch as any).nonce).to.eq(TEST_TX_RESPONSE.nonce + 1);
    });

    it("should throw if buffer is full, i.e. we hit inflight maximum", async () => {
      (TransactionDispatch as any).MAX_INFLIGHT_TRANSACTIONS = 0;
      await expect(txDispatch.send(TEST_TX, context)).to.be.rejectedWith(MaxBufferLengthError);
    });

    it("should throw if getGas fails", async () => {
      getGas.rejects(new RpcError("fail"));
      await expect(txDispatch.send(TEST_TX, context)).to.be.rejectedWith("fail");
    });

    it("should throw if getTransactionCount fails", async () => {
      getTransactionCount.resolves(err(new RpcError("fail")));
      await expect(txDispatch.send(TEST_TX, context)).to.be.rejectedWith("fail");
    });

    it("should assign nonce based on higher value: transaction count or cached nonce", async () => {
      const txCount = 97;
      getTransactionCount.resolves(ok(txCount));
      // This should start at 0 on boot, but leaving this line here for clarity.
      (txDispatch as any).nonce = 0;
      await txDispatch.send(TEST_TX, context);

      expect(submit.getCall(0).args[0].nonce).to.eq(txCount);

      // Now, let's try again, but this time we'll set the local nonce to be higher than the txCount
      const nonce = 348;
      (txDispatch as any).nonce = nonce;
      await txDispatch.send(TEST_TX, context);

      expect(submit.getCall(1).args[0].nonce).to.eq(nonce);
    });

    it("should handle nonce too low by incrementing nonce and retrying", async () => {
      const testNumCalls = 7;
      let i = 0;
      for (i = 0; i < testNumCalls - 1; i++) {
        submit.onCall(i).rejects(new BadNonce(BadNonce.reasons.NonceExpired));
      }
      submit.onCall(i + 1).resolves();

      await txDispatch.send(TEST_TX, context);
      expect(submit.callCount).to.eq(testNumCalls);
      for (let j = 0; j < testNumCalls - 1; j++) {
        expect(submit.getCall(j).args[0].nonce).to.eq(TEST_TX_RESPONSE.nonce + j);
      }
    });

    it("should handle nonce incorrect (too high)", async () => {
      const txCount = 30;
      const localNonce = 42;
      (txDispatch as any).nonce = localNonce;
      getTransactionCount.resolves(ok(txCount));

      const testNumCalls = 7;
      let i = 0;
      for (i = 0; i < testNumCalls - 1; i++) {
        submit.onCall(i).rejects(new BadNonce(BadNonce.reasons.NonceIncorrect));
      }
      submit.onCall(i + 1).resolves();

      await txDispatch.send(TEST_TX, context);
      expect(submit.callCount).to.eq(testNumCalls);
      expect(submit.getCall(0).args[0].nonce).to.eq(localNonce);
      // Should have incremented nonce up from the txCount value until it was accepted.
      for (let j = 0; j < testNumCalls - 2; j++) {
        expect(submit.getCall(j + 1).args[0].nonce).to.eq(txCount + j);
      }
    });

    it("should throw if a non-nonce error occurs", async () => {
      submit.rejects(new TransactionReverted("fail"));
      await expect(txDispatch.send(TEST_TX, context)).to.be.rejectedWith("fail");
    });

    it("should eventually hit a maximum retry on initial submit", async () => {});

    it("should wait until transaction is mined/confirmed", async () => {});

    it("should throw if the transaction has an error after mine/confirm", async () => {});

    it("should throw if the transaction has no receipt after mine/confirm", async () => {});
  });

  describe("#submit", () => {
    beforeEach(() => {});

    it("should throw if the transaction is already finished", async () => {
      fakeTransactionState.didFinish = true;
      await expect((txDispatch as any).submit(transaction)).to.eventually.be.rejectedWith(TransactionServiceFailure);
    });

    it("should throw if transaction is discontinued", async () => {
      fakeTransactionState.discontinued = true;
      await expect((txDispatch as any).submit(transaction)).to.eventually.be.rejectedWith(TransactionServiceFailure);
    });

    it("should throw if it's a second attempt and gas price hasn't been increased", async () => {
      const txResponse: providers.TransactionResponse = { ...TEST_TX_RESPONSE };
      transaction.responses = [txResponse];
      await expect((txDispatch as any).submit(transaction)).to.eventually.be.rejectedWith(TransactionServiceFailure);
    });

    it("should throw if sendTransaction errors", async () => {
      const error = new MaxBufferLengthError();
      sendTransactionStub.returns(errAsync(error));
      await expect((txDispatch as any).submit(transaction)).to.eventually.be.rejectedWith(MaxBufferLengthError);
    });

    it("happy", async () => {
      await (txDispatch as any).submit(transaction);
      expect(sendTransactionStub).to.be.calledOnceWithExactly(transaction);
      expect(dispatchCallbacks.onSubmit).to.be.calledOnceWithExactly(transaction);
      expect(transaction.responses.length).to.eq(1);
      expect(makeChaiReadable(transaction.responses[0])).to.deep.eq(makeChaiReadable(TEST_TX_RESPONSE));
      expect(transaction.timestamp).to.not.eq(undefined);
      expect(transaction.attempt).to.eq(1);
    });
  });

  describe("#mine", () => {
    let confirmTransaction: SinonStub;
    beforeEach(() => {
      confirmTransaction = stub(txDispatch, "confirmTransaction");
      confirmTransaction.returns(okAsync(txReceiptMock));
      fakeTransactionState.didSubmit = true;
    });

    it("throws if tx did not submit", async () => {
      fakeTransactionState.didSubmit = false;
      await expect((txDispatch as any).mine(transaction)).to.eventually.be.rejectedWith(TransactionServiceFailure);
    });

    it("throws if confirmTransaction errors with TransactionReplaced but no replacement exists", async () => {
      confirmTransaction.returns(errAsync(new TransactionReplaced(undefined, undefined)));
      await expect((txDispatch as any).mine(transaction)).to.eventually.be.rejectedWith(
        "Transaction was replaced, but no replacement transaction was returned",
      );
    });

    it("throws if confirmTransaction errors with TransactionReplaced but replacement is unrecognized", async () => {
      transaction.responses = [TEST_TX_RESPONSE];
      confirmTransaction.returns(
        errAsync(new TransactionReplaced(undefined, { ...TEST_TX_RESPONSE, hash: "0x123456789" })),
      );
      await expect((txDispatch as any).mine(transaction)).to.eventually.be.rejectedWith(TransactionReplaced);
    });

    it("happy: confirms if transaction is replaced", async () => {
      const replacement = { ...TEST_TX_RESPONSE, nonce: TEST_TX_RESPONSE.nonce + 1 };
      transaction.responses = [TEST_TX_RESPONSE];
      const preTx = { ...transaction };
      confirmTransaction.returns(errAsync(new TransactionReplaced(txReceiptMock, replacement)));

      await (txDispatch as any).mine(transaction);
      expect(transaction).to.deep.eq({ ...preTx, minedResponse: replacement, receipt: txReceiptMock });
    });

    it("throws if confirmTransaction errors with TransactionReverted", async () => {
      transaction.responses = [TEST_TX_RESPONSE];
      const error = new TransactionReverted("test", txReceiptMock);
      confirmTransaction.returns(errAsync(error));

      await expect((txDispatch as any).mine(transaction)).to.be.rejectedWith(error);
    });

    it("throws if confirmTransaction does not return receipt", async () => {
      transaction.responses = [TEST_TX_RESPONSE];
      confirmTransaction.returns(okAsync(null));

      await expect((txDispatch as any).mine(transaction)).to.be.rejectedWith(
        "Unable to obtain receipt: ethers responded with null",
      );
    });

    it("throws if confirmTransaction receipt status == 0", async () => {
      transaction.responses = [TEST_TX_RESPONSE];
      confirmTransaction.returns(okAsync({ ...txReceiptMock, status: 0 }));

      await expect((txDispatch as any).mine(transaction)).to.be.rejectedWith(
        "Transaction was reverted but TransactionReverted error was not thrown",
      );
    });

    it("throws if confirmTransaction confirmations < 1", async () => {
      transaction.responses = [TEST_TX_RESPONSE];
      confirmTransaction.returns(okAsync({ ...txReceiptMock, confirmations: 0 }));

      await expect((txDispatch as any).mine(transaction)).to.be.rejectedWith(
        "Receipt did not have any confirmations, should have timed out",
      );
    });

    it("happy: mines tx with response", async () => {
      transaction.responses = [TEST_TX_RESPONSE];
      const preTx = { ...transaction };
      await (txDispatch as any).mine(transaction);
      expect(transaction).to.deep.eq({ ...preTx, receipt: txReceiptMock });
    });
  });

  // describe("#confirm", () => {
  //   it("happy", async () => {
  //     await transaction.submit();
  //     const receipt = await transaction.confirm();
  //     // Expect receipt to be correct.
  //     expect(receipt).to.deep.eq(TEST_TX_RECEIPT);
  //     // Ensure confirmTransaction was called.
  //     expect(dispatch.confirmTransaction.callCount).eq(1);
  //     const confirmTransaction = dispatch.confirmTransaction.getCall(0);
  //     // Ensure we pass the correct response.
  //     expect(confirmTransaction.args[0]).to.deep.eq(TEST_TX_RESPONSE);
  //   });

  //   it("throws if you have not submitted yet", async () => {
  //     await expect(transaction.confirm()).to.be.rejectedWith(TransactionServiceFailure);
  //   });

  //   it("throws if you have not validated yet", async () => {
  //     await transaction.submit();
  //     await expect(transaction.confirm()).to.be.rejectedWith(TransactionServiceFailure);

  //     // Set validated to true (should fail, response is undefined).
  //     // Set mined response (should fail, receipt is still undefined).
  //     // Set receipt (this should work).
  //   });

  //   it("escalates error if confirmation times out", async () => {
  //     const timeoutError = new TimeoutError();
  //     dispatch.confirmTransaction.resolves(err(timeoutError));
  //     await transaction.submit();
  //     await expect(transaction.confirm()).to.be.rejectedWith(timeoutError);
  //   });

  //   it("won't return until it has the required number of confirmations", async () => {
  //     // Raise confirmations required count for this test to 10.
  //     const testConfirmationsRequired = 10;
  //     (dispatch as any).confirmationsRequired = testConfirmationsRequired;

  //     // We should call confirm transaction twice, once for the first confirmation, and
  //     // again to get the required number of confirmations.
  //     dispatch.confirmTransaction.onCall(0).resolves(
  //       ok({
  //         ...TEST_TX_RECEIPT,
  //         confirmations: 1,
  //       }),
  //     );
  //     dispatch.confirmTransaction.onCall(1).resolves(
  //       ok({
  //         ...TEST_TX_RECEIPT,
  //         confirmations: testConfirmationsRequired,
  //       }),
  //     );

  //     await transaction.submit();
  //     const receipt = await transaction.confirm();
  //     expect(receipt.confirmations).to.eq(testConfirmationsRequired);
  //     expect(dispatch.confirmTransaction.callCount).eq(2);
  //   });
  // });

  describe("#bump", () => {
    it("should throw if reached MAX_ATTEMPTS", async () => {
      transaction.attempt = Transaction.MAX_ATTEMPTS;
      await expect(txDispatch.bump(transaction)).to.be.rejectedWith(
        TransactionServiceFailure.reasons.MaxAttemptsReached,
      );
    });

    it("should fail if getGasPrice fails", async () => {
      txDispatch.getGasPrice = (_rc: RequestContext) => Promise.reject(new Error("fail")) as any;
      await expect(txDispatch.bump(transaction)).to.be.rejectedWith("fail");
    });

    it("happy: should bump updated price", async () => {
      const initial = BigNumber.from(10);
      (transaction as any).gas.price = BigNumber.from(5);
      txDispatch.getGasPrice = (_rc: RequestContext) => okAsync(initial);
      await txDispatch.bump(transaction);
      expect(transaction.gas.price.toNumber()).to.be.eq(13);
    });

    it("happy: should bump previous price if previous price > updated price", async () => {
      const initial = BigNumber.from(10);
      (transaction as any).gas.price = initial;
      txDispatch.getGasPrice = (_rc: RequestContext) => okAsync(BigNumber.from(5));
      await txDispatch.bump(transaction);
      expect(transaction.gas.price.toNumber()).to.be.eq(13);
    });
  });

  // describe("#fail", () => {
  //   it("happy: kills the transaction, preventing further submits", async () => {
  //     transaction.kill();
  //     expect(transaction.discontinued).to.be.true;
  //     expect(await transaction.submit()).to.be.rejectedWith(TransactionKilled);
  //   });
  // });

  describe("#getGas", () => {});
});
