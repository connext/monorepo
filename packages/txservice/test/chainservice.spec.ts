import { BigNumber, providers, utils, Wallet } from "ethers";
import Sinon, { restore, reset, createStubInstance, SinonStubbedInstance } from "sinon";

import { NxtpTxServiceEvents, ChainService } from "../src/chainservice";
import { TransactionDispatch, DispatchCallbacks } from "../src/dispatch";
import {
  makeChaiReadable,
  TEST_SENDER_CHAIN_ID,
  TEST_TX,
  TEST_FULL_TX,
  TEST_TX_RESPONSE,
  TEST_TX_RECEIPT,
} from "./constants";
import { BadNonce, RpcError, TimeoutError, TransactionReverted, TransactionServiceFailure } from "../src/error";
import { getRandomBytes32, mkAddress, RequestContext, expect, Logger } from "@connext/nxtp-utils";
import { err, ok } from "neverthrow";
import { EvtError } from "evt";
import { Gas, Transaction } from "../src/types";

const logger = new Logger({
  level: process.env.LOG_LEVEL ?? "silent",
  name: "ChainServiceTest",
});

let signer: SinonStubbedInstance<Wallet>;
let chainService: ChainService;
let dispatch: SinonStubbedInstance<TransactionDispatch>;
let context: RequestContext = {
  id: "",
  origin: "",
};
let dispatchCallbacks: DispatchCallbacks;
let transaction: Transaction;

/// In these tests, we are testing the outer shell of chainservice - the interface, not the core functionality.
/// For core functionality tests, see dispatch.spec.ts and provider.spec.ts.
describe("ChainService", () => {
  beforeEach(() => {
    dispatch = createStubInstance(TransactionDispatch);
    signer = createStubInstance(Wallet);
    signer.connect.resolves(true);
    // This data structure is used to pass info back through the event callbacks.
    transaction = new Transaction(
      context,
      TEST_TX,
      1,
      new Gas(BigNumber.from(1), BigNumber.from(1)),
      { confirmationTimeout: 1, confirmationsRequired: 1 },
      "1",
    );

    const chains = {
      [TEST_SENDER_CHAIN_ID.toString()]: {
        providers: [{ url: "https://-------------" }],
        confirmations: 1,
        gasStations: [],
      },
    };

    (ChainService as any).instance = undefined;
    chainService = new ChainService(logger, { chains }, signer);

    // NOTE: Chain service SHOULD instantiate a provider for this chain and SHOULD pass VALID callbacks
    // that link to event emitters (see: DispatchCallbacks type).
    dispatchCallbacks = (chainService as any).providers.get(TEST_SENDER_CHAIN_ID).callbacks;

    Sinon.stub(chainService as any, "getProvider").callsFake((chainId: number) => {
      // NOTE: We check to make sure we are only getting the one chainId we expect
      // to get in these unit tests.
      expect(chainId).to.be.eq(TEST_SENDER_CHAIN_ID);
      return dispatch;
    });

    context.id = getRandomBytes32();
    context.origin = "ChainServiceTest";
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#sendTx", () => {
    it("happy", async () => {
      dispatch.send.resolves(TEST_TX_RECEIPT);
      const receipt = await chainService.sendTx(TEST_TX, context);
      expect(dispatch.send.callCount).to.be.eq(1);
      expect(dispatch.send.getCall(0).args[0]).to.be.deep.eq(TEST_TX);
      expect(makeChaiReadable(receipt)).to.deep.eq(makeChaiReadable(TEST_TX_RECEIPT));
    });

    it("throws if send fails", async () => {
      const callException = new TransactionReverted(TransactionReverted.reasons.CallException);
      dispatch.send.rejects(callException);

      // We should get the exact error back.
      await expect(chainService.sendTx(TEST_TX, context)).to.be.rejectedWith(callException);
    });
  });

  describe("#attach", () => {
    it("should attach callback to event", async () => {
      const onSubmitSpy = Sinon.spy();
      chainService.attach(NxtpTxServiceEvents.TransactionSubmitted, onSubmitSpy);

      const onMinedSpy = Sinon.spy();
      chainService.attach(NxtpTxServiceEvents.TransactionMined, onMinedSpy);

      const onConfirmSpy = Sinon.spy();
      chainService.attach(NxtpTxServiceEvents.TransactionConfirmed, onConfirmSpy);

      const onFailSpy = Sinon.spy();
      chainService.attach(NxtpTxServiceEvents.TransactionFailed, onFailSpy);

      dispatchCallbacks.onSubmit(transaction);
      dispatchCallbacks.onMined(transaction);
      dispatchCallbacks.onConfirm(transaction);
      dispatchCallbacks.onFail(transaction);

      expect(onSubmitSpy.callCount).to.be.eq(1);
      expect(onMinedSpy.callCount).to.be.eq(1);
      expect(onConfirmSpy.callCount).to.be.eq(1);
      expect(onFailSpy.callCount).to.be.eq(1);
    });

    it("should properly use filtering condition", async () => {
      const totalCallNumber = 6;
      const filteredCallThreshold = 3;
      const spy = Sinon.spy();
      chainService.attach(NxtpTxServiceEvents.TransactionSubmitted, spy, (data): boolean => {
        return data.responses.length > filteredCallThreshold;
      });

      // We want to be certain that the event will be triggered each time.
      for (let i = 1; i <= totalCallNumber; i++) {
        transaction.responses.push(TEST_TX_RESPONSE);
        dispatchCallbacks.onSubmit(transaction);
      }

      expect(spy.callCount).to.be.eq(totalCallNumber - filteredCallThreshold);
    });
  });

  describe("#attachOnce", () => {
    it("happy", async () => {
      const spy = Sinon.spy();
      chainService.attachOnce(NxtpTxServiceEvents.TransactionSubmitted, spy);
      dispatchCallbacks.onSubmit(transaction);
      expect(spy.callCount).to.equal(1);
    });

    it("should properly use filtering condition", async () => {
      const spy = Sinon.spy();
      chainService.attachOnce(NxtpTxServiceEvents.TransactionSubmitted, spy, (data): boolean => {
        return data.responses.length > 3;
      });

      // We want to be certain that the event will be triggered just once.
      for (let i = 1; i <= 6; i++) {
        transaction.responses.push(TEST_TX_RESPONSE);
        dispatchCallbacks.onSubmit(transaction);
      }

      expect(spy.callCount).to.equal(1);
    });
  });

  describe("#detach", () => {
    it("should remove listener from event", async () => {
      const spy = Sinon.spy();
      chainService.attach(NxtpTxServiceEvents.TransactionSubmitted, spy);

      // Event should be triggered for this round.
      dispatchCallbacks.onSubmit(transaction);
      expect(spy.callCount).to.equal(1);

      // Event should NOT be triggered for this round.
      chainService.detach(NxtpTxServiceEvents.TransactionSubmitted);
      dispatchCallbacks.onSubmit(transaction);

      // Call count should remain the same.
      expect(spy.callCount).to.equal(1);
    });
  });

  describe("#waitFor", () => {
    it("should wait for event", async () => {
      const spy = Sinon.spy();
      chainService.attach(NxtpTxServiceEvents.TransactionSubmitted, spy);

      // Wrap in a promise here to be sure that the waitFor call is blocking.
      const promise = new Promise<boolean>(async (resolve) => {
        await chainService.waitFor(NxtpTxServiceEvents.TransactionSubmitted, 10_000);
        resolve(spy.callCount === 1);
      });

      expect(promise).to.eventually.be.true;
      dispatchCallbacks.onSubmit(transaction);
    });

    it("should expire after timeout", async () => {
      chainService.attach(NxtpTxServiceEvents.TransactionSubmitted, () => {});
      await expect(chainService.waitFor(NxtpTxServiceEvents.TransactionSubmitted, 10)).to.be.rejectedWith(
        EvtError.Timeout,
      );
    });
  });
});
