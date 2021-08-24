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
      const expired: ActiveTransaction<"ReceiverExpired"> = {
        ...activeTransactionFulfillMock,
        crosschainTx: {
          ...activeTransactionFulfillMock.crosschainTx,
          invariant: { ...activeTransactionFulfillMock.crosschainTx.invariant, transactionId: mkBytes32("0x3456") },
        },
        status: CrosschainTransactionStatus.ReceiverExpired,
      };

      await binding.handleActiveTransactions([prepare, fulfill, cancel, expired]);

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

      // cancel receiver
      expect(cancelMock).to.be.calledWith(expired.crosschainTx.invariant, {
        amount: expired.crosschainTx.receiving.amount,
        expiry: expired.crosschainTx.receiving.expiry,
        preparedBlockNumber: expired.crosschainTx.receiving.preparedBlockNumber,
        side: "receiver",
      });
    });

    it("should not prepare tx if not enough confirmations", async () => {
      const badTx = { ...txReceiptMock, confirmations: 0 };
      txServiceMock.getTransactionReceipt.resolves(badTx);
      const prepare: ActiveTransaction<"SenderPrepared"> = { ...activeTransactionPrepareMock };
      await binding.handleActiveTransactions([prepare]);
      expect(prepareMock).callCount(0);
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
