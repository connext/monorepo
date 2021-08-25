import { InvariantTransactionData, mkBytes32, RequestContext, txReceiptMock, expect, delay } from "@connext/nxtp-utils";
import { reset, restore, SinonStub, stub } from "sinon";
import { providers } from "ethers/lib/ethers";

import {
  ActiveTransaction,
  CancelInput,
  CrosschainTransactionStatus,
  FulfillInput,
  PrepareInput,
} from "../../../src/lib/entities";
import * as binding from "../../../src/bindings/contractReader/index";
import * as PrepareFns from "../../../src/lib/operations/prepare";
import * as FulfillFns from "../../../src/lib/operations/fulfill";
import * as CancelFns from "../../../src/lib/operations/cancel";
import { ExpiryInvalid } from "../../../src/lib/errors";
import { activeTransactionFulfillMock, activeTransactionPrepareMock } from "../../utils";
import { contractReaderMock, txServiceMock } from "../../globalTestHook";

let prepareMock: SinonStub<
  [invariantData: InvariantTransactionData, input: PrepareInput, requestContext: RequestContext],
  Promise<providers.TransactionReceipt>
>;
let fulfillMock: SinonStub<
  [invariantData: InvariantTransactionData, input: FulfillInput, requestContext: RequestContext],
  Promise<providers.TransactionReceipt>
>;

let cancelMock: SinonStub<
  [invariantData: InvariantTransactionData, input: CancelInput, requestContext: RequestContext],
  Promise<providers.TransactionReceipt>
>;

describe("Contract Reader Binding", () => {
  describe("#handleActiveTransactions", () => {
    beforeEach(() => {
      prepareMock = stub(PrepareFns, "prepare").resolves(txReceiptMock);
      fulfillMock = stub(FulfillFns, "fulfill").resolves(txReceiptMock);
      cancelMock = stub(CancelFns, "cancel").resolves(txReceiptMock);
    });

    it("should prepare, fulfill, and cancel active transactions", async () => {
      prepareMock.onSecondCall().rejects(new ExpiryInvalid(1234));
      const prepare: ActiveTransaction<"SenderPrepared"> = { ...activeTransactionPrepareMock };
      const fulfill: ActiveTransaction<"ReceiverFulfilled"> = {
        ...activeTransactionFulfillMock,
        crosschainTx: {
          ...activeTransactionFulfillMock.crosschainTx,
          invariant: { ...activeTransactionFulfillMock.crosschainTx.invariant, transactionId: mkBytes32("0x1234") },
        },
      };
      const cancel: ActiveTransaction<"SenderPrepared"> = {
        ...activeTransactionPrepareMock,
        crosschainTx: {
          ...activeTransactionPrepareMock.crosschainTx,
          invariant: { ...activeTransactionPrepareMock.crosschainTx.invariant, transactionId: mkBytes32("0x2345") },
        },
      };

      await binding.handleActiveTransactions([prepare, fulfill, cancel]);

      // prepare receiver
      expect(prepareMock).to.be.calledWith(prepare.crosschainTx.invariant, {
        senderExpiry: prepare.crosschainTx.sending.expiry,
        senderAmount: prepare.crosschainTx.sending.amount,
        bidSignature: prepare.payload.bidSignature,
        encodedBid: prepare.payload.encodedBid,
        encryptedCallData: prepare.payload.encryptedCallData,
      });

      // fulfill sender
      expect(fulfillMock).to.be.calledWith(fulfill.crosschainTx.invariant, {
        amount: fulfill.crosschainTx.sending.amount,
        expiry: fulfill.crosschainTx.sending.expiry,
        preparedBlockNumber: fulfill.crosschainTx.sending.preparedBlockNumber,
        signature: fulfill.payload.signature,
        callData: fulfill.payload.callData,
        relayerFee: fulfill.payload.relayerFee,
        side: "sender",
      });

      // cancel sender
      expect(prepareMock).to.be.calledWith(cancel.crosschainTx.invariant, {
        senderExpiry: cancel.crosschainTx.sending.expiry,
        senderAmount: cancel.crosschainTx.sending.amount,
        bidSignature: prepare.payload.bidSignature,
        encodedBid: prepare.payload.encodedBid,
        encryptedCallData: prepare.payload.encryptedCallData,
      });
      expect(cancelMock).to.be.calledWith(cancel.crosschainTx.invariant, {
        amount: cancel.crosschainTx.sending.amount,
        expiry: cancel.crosschainTx.sending.expiry,
        preparedBlockNumber: cancel.crosschainTx.sending.preparedBlockNumber,
        side: "sender",
      });
    });

    it("should not prepare tx if not enough confirmations", async () => {
      const badTx = { ...txReceiptMock, confirmations: 0 };
      txServiceMock.getTransactionReceipt.resolves(badTx);
      const prepare: ActiveTransaction<"SenderPrepared"> = { ...activeTransactionPrepareMock };
      await binding.handleActiveTransactions([prepare]);
      expect(prepareMock).callCount(0);
    });

    it("should handle expired txs properly", async () => {
      const receiverExpired: ActiveTransaction<"ReceiverExpired"> = {
        ...activeTransactionFulfillMock,
        crosschainTx: {
          ...activeTransactionFulfillMock.crosschainTx,
          invariant: { ...activeTransactionFulfillMock.crosschainTx.invariant, transactionId: mkBytes32("0x123") },
        },
        payload: undefined,
        status: CrosschainTransactionStatus.ReceiverExpired,
      };

      const senderExpiredNoReceiver: ActiveTransaction<"SenderExpired"> = {
        ...activeTransactionFulfillMock,
        crosschainTx: {
          ...activeTransactionFulfillMock.crosschainTx,
          invariant: { ...activeTransactionFulfillMock.crosschainTx.invariant, transactionId: mkBytes32("0x456") },
          receiving: undefined,
        },
        payload: undefined,
        status: CrosschainTransactionStatus.SenderExpired,
      };

      const senderExpiredWithReceiver: ActiveTransaction<"SenderExpired"> = {
        ...activeTransactionFulfillMock,
        crosschainTx: {
          ...activeTransactionFulfillMock.crosschainTx,
          invariant: { ...activeTransactionFulfillMock.crosschainTx.invariant, transactionId: mkBytes32("0x789") },
        },
        payload: undefined,
        status: CrosschainTransactionStatus.SenderExpired,
      };

      await binding.handleActiveTransactions([receiverExpired, senderExpiredNoReceiver, senderExpiredWithReceiver]);

      // receiverExpired
      expect(cancelMock).to.be.calledWith(receiverExpired.crosschainTx.invariant, {
        amount: receiverExpired.crosschainTx.receiving.amount,
        expiry: receiverExpired.crosschainTx.receiving.expiry,
        preparedBlockNumber: receiverExpired.crosschainTx.receiving.preparedBlockNumber,
        side: "receiver",
      });

      // senderExpiredNoReceiver
      expect(cancelMock).to.be.calledWith(senderExpiredNoReceiver.crosschainTx.invariant, {
        amount: senderExpiredNoReceiver.crosschainTx.sending.amount,
        expiry: senderExpiredNoReceiver.crosschainTx.sending.expiry,
        preparedBlockNumber: senderExpiredNoReceiver.crosschainTx.sending.preparedBlockNumber,
        side: "sender",
      });

      // senderExpiredWithReceiver
      expect(cancelMock).to.be.calledWith(senderExpiredWithReceiver.crosschainTx.invariant, {
        amount: senderExpiredWithReceiver.crosschainTx.sending.amount,
        expiry: senderExpiredWithReceiver.crosschainTx.sending.expiry,
        preparedBlockNumber: senderExpiredWithReceiver.crosschainTx.sending.preparedBlockNumber,
        side: "sender",
      });

      expect(cancelMock).to.be.calledWith(senderExpiredWithReceiver.crosschainTx.invariant, {
        amount: senderExpiredWithReceiver.crosschainTx.receiving.amount,
        expiry: senderExpiredWithReceiver.crosschainTx.receiving.expiry,
        preparedBlockNumber: senderExpiredWithReceiver.crosschainTx.receiving.preparedBlockNumber,
        side: "receiver",
      });
    });

    it("should handle ReceiverCancelled", async () => {
      const receiverCancelled: ActiveTransaction<"ReceiverCancelled"> = {
        ...activeTransactionFulfillMock,
        crosschainTx: {
          ...activeTransactionFulfillMock.crosschainTx,
          receiving: undefined,
        },
        payload: undefined,
        status: CrosschainTransactionStatus.ReceiverCancelled,
      };

      await binding.handleActiveTransactions([receiverCancelled]);

      expect(cancelMock).to.be.calledOnceWith(receiverCancelled.crosschainTx.invariant, {
        amount: receiverCancelled.crosschainTx.sending.amount,
        expiry: receiverCancelled.crosschainTx.sending.expiry,
        preparedBlockNumber: receiverCancelled.crosschainTx.sending.preparedBlockNumber,
        side: "sender",
      });
    });

    it("should handle ReceiverNotConfigured", async () => {
      const receiverNotConfigured: ActiveTransaction<"ReceiverNotConfigured"> = {
        ...activeTransactionFulfillMock,
        crosschainTx: {
          ...activeTransactionFulfillMock.crosschainTx,
          receiving: undefined,
        },
        payload: undefined,
        status: CrosschainTransactionStatus.ReceiverNotConfigured,
      };

      await binding.handleActiveTransactions([receiverNotConfigured]);

      expect(cancelMock).to.be.calledOnceWith(receiverNotConfigured.crosschainTx.invariant, {
        amount: receiverNotConfigured.crosschainTx.sending.amount,
        expiry: receiverNotConfigured.crosschainTx.sending.expiry,
        preparedBlockNumber: receiverNotConfigured.crosschainTx.sending.preparedBlockNumber,
        side: "sender",
      });
    });
  });

  describe("getLoopInterval", async () => {
    expect(binding.getLoopInterval()).to.be.eq(15_000);
  });

  describe("bindContractReader", () => {
    const interval = 250;

    let handleActiveTransactionsStub: SinonStub;
    beforeEach(() => {
      handleActiveTransactionsStub = stub(binding, "handleActiveTransactions").resolves();
      stub(binding, "getLoopInterval").returns(interval);
    });

    afterEach(() => {
      restore();
      reset();
    });

    it("should work", async () => {
      await binding.bindContractReader();
      await delay(interval + 10);
      expect((contractReaderMock.getActiveTransactions as SinonStub).callCount).to.be.eq(1);
      expect(handleActiveTransactionsStub.callCount).to.be.eq(1);
      // done();
    });
  });
});
