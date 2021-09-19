import { getRandomBytes32, Logger, mkAddress, RequestContext } from "@connext/nxtp-utils";
import { expect } from "@connext/nxtp-utils/src/expect";
import { BigNumber, Wallet } from "ethers";
import { err, ok } from "neverthrow";
import Sinon, { createStubInstance, reset, restore, SinonSpy, SinonStub, SinonStubbedInstance, stub } from "sinon";

import { ChainConfig, DEFAULT_CONFIG } from "../src/config";
import { DispatchCallbacks, TransactionDispatch } from "../src/dispatch";
import { BadNonce, MaxBufferLengthError, RpcError, TransactionReverted, TransactionServiceFailure } from "../src/error";
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
let getAddressStub: SinonStub<any[], any>;
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
  const methodsToStub = methods ?? [
    getGas,
    getTransactionCount,
    submit,
    mine,
    confirm,
    bump,
    fail,
  ];
  (txDispatch as any).getGas = getGas;
  (txDispatch as any).getTransactionCount = getTransactionCount;
  (txDispatch as any).submit = submit;
  (txDispatch as any).mine = mine;
  (txDispatch as any).confirm = confirm;
  (txDispatch as any).bump = bump;
  (txDispatch as any).fail = fail;
}

let fakeTransactionState: {
  didSubmit: boolean;
  didFinish: boolean;
}

describe("TransactionDispatch", () => {
  beforeEach(async () => {
    (TransactionDispatch as any).MAX_INFLIGHT_TRANSACTIONS = OG_MAX_INFLIGHT_TRANSACTIONS;

    fakeTransactionState = {
      didSubmit: false,
      didFinish: false,
    }

    getGas = stub().callsFake(() => {
      return new Gas(BigNumber.from(1), BigNumber.from(1));
    });
    getTransactionCount = stub().resolves(ok(TEST_TX_RESPONSE.nonce));
    submit = stub().resolves();
    mine = stub().resolves();
    confirm = stub().resolves();
    bump = stub().resolves();
    fail = stub().resolves();

    dispatchCallbacks = {
      onSubmit: Sinon.spy(),
      onMined: Sinon.spy(),
      onConfirm: Sinon.spy(),
      onFail: Sinon.spy(),
    }

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
    txDispatch = new TransactionDispatch(logger, TEST_SENDER_CHAIN_ID, chainConfig, DEFAULT_CONFIG, signer, dispatchCallbacks, false);
    getAddressStub = stub().resolves(ok(signer.address));
    (txDispatch as any).getAddress = getAddressStub;

    context.id = getRandomBytes32();
    context.origin = "TransactionDispatchTest";

    transaction = new Transaction(context, TEST_TX, TEST_TX_RESPONSE.nonce, new Gas(BigNumber.from(1), BigNumber.from(1)), {
      confirmationTimeout: 1,
      confirmationsRequired: 1,
    }, "test_tx_uuid");
    Sinon.stub(transaction, "didSubmit").get(() => fakeTransactionState.didSubmit);
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
  });

  describe("#confirmLoop", () => {
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

    it("should eventually hit a maximum retry on initial submit", async () => {


    });

    it("should wait until transaction is mined/confirmed", async () => {});

    it("should throw if the transaction has an error after mine/confirm", async () => {});

    it("should throw if the transaction has no receipt after mine/confirm", async () => {});
  });

  describe.skip("#submit", () => {
    let sendTransactionStub: SinonStub

    beforeEach(() => {
      sendTransactionStub = stub().resolves(ok(TEST_TX_RESPONSE));
      (txDispatch as any).sendTransaction = sendTransactionStub;
    });

    it("happy", async () => {
      (txDispatch as any).submit(transaction);
      expect(sendTransactionStub.callCount).to.eq(1);
      expect(makeChaiReadable(sendTransactionStub.getCall(0).args[0])).to.deep.eq(makeChaiReadable(transaction));
      expect((dispatchCallbacks.onSubmit as SinonSpy).callCount).to.eq(transaction);
      expect((dispatchCallbacks.onSubmit as SinonSpy).getCall(0).args[0].uuid).to.be.eq(transaction.uuid);
      expect(transaction.responses.length).to.eq(1);
      expect(makeChaiReadable(transaction.responses[0])).to.deep.eq(makeChaiReadable(TEST_TX_RESPONSE));
      expect(transaction.timestamp).to.not.eq(undefined);
      expect(transaction.attempt).to.eq(1);
    });

    it("should throw if the transaction is already finished", async () => {
      fakeTransactionState.didFinish = true;
      expect(async () => await (txDispatch as any).submit(transaction)).to.throw(TransactionServiceFailure);
    });

    it("should throw if transaction is discontinued", async () => {

    });

    it("should throw if it's a second attempt and gas price hasn't been increased", async () => {

    });
  });

  describe("#mine", () => {

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

  // describe("#bump", () => {
  //   it("happy: bumps by configured percentage", async () => {
  //     const originalGasPrice = transaction.params.gasPrice;
  //     await transaction.bumpGasPrice();
  //     expect(gas.price.gt(originalGasPrice)).to.be.true;
  //   });

  //   // TODO:Should instead rely on max attempts here.
  //   it.skip("throws if it would bump above max gas price", async () => {
  //     // Make it so the gas price will return exactly == the maximum (which is acceptable).
  //     (transaction as any).gasPrice._gasPrice = BigNumber.from(DEFAULT_CONFIG.gasMaximum);

  //     // First call should go through fine.
  //     const response = await transaction.submit();
  //     expect(response).to.deep.eq(TEST_TX_RESPONSE);

  //     // This should throw, as we are attempting to bump above the maximum.
  //     expect(await transaction.bumpGasPrice()).to.throw(TransactionServiceFailure.reasons.MaxAttemptsReached);
  //   });
  // });

  // describe("#fail", () => {
  //   it("happy: kills the transaction, preventing further submits", async () => {
  //     transaction.kill();
  //     expect(transaction.discontinued).to.be.true;
  //     expect(await transaction.submit()).to.be.rejectedWith(TransactionKilled);
  //   });
  // });

  describe("#getGas", () => {

  });
});
