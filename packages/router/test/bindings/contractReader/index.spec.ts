import {
  InvariantTransactionData,
  mkBytes32,
  txReceiptMock,
  expect,
  delay,
  getRandomBytes32,
  RequestContextWithTransactionId,
  VariantTransactionData,
} from "@connext/nxtp-utils";
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
import { ContractReaderNotAvailableForChain, ExpiryInvalid } from "../../../src/lib/errors";
import { activeTransactionFulfillMock, activeTransactionPrepareMock } from "../../utils";
import { contractReaderMock, txServiceMock } from "../../globalTestHook";

let context: RequestContextWithTransactionId = {
  id: "",
  origin: "",
  transactionId: "",
};

describe("Contract Reader Binding", () => {
  beforeEach(() => {
    context.id = getRandomBytes32();
    context.origin = "ChainServiceTest";
    context.transactionId = getRandomBytes32();
  });

  describe("#handleSingle", () => {
    let prepareMock: SinonStub<
      [invariantData: InvariantTransactionData, input: PrepareInput, requestContext: RequestContextWithTransactionId],
      Promise<providers.TransactionReceipt>
    >;

    let fulfillMock: SinonStub<
      [invariantData: InvariantTransactionData, input: FulfillInput, requestContext: RequestContextWithTransactionId],
      Promise<providers.TransactionReceipt>
    >;

    let cancelMock: SinonStub<
      [invariantData: InvariantTransactionData, input: CancelInput, requestContext: RequestContextWithTransactionId],
      Promise<providers.TransactionReceipt>
    >;
    beforeEach(() => {
      prepareMock = stub(PrepareFns, "prepare").resolves(txReceiptMock);
      fulfillMock = stub(FulfillFns, "fulfill").resolves(txReceiptMock);
      cancelMock = stub(CancelFns, "cancel").resolves(txReceiptMock);
    });

    it("should throw error if no config for SenderPrepared", async () => {
      const prepare: ActiveTransaction<"SenderPrepared"> = {
        ...activeTransactionPrepareMock,
        crosschainTx: {
          ...activeTransactionPrepareMock.crosschainTx,
          invariant: { ...activeTransactionPrepareMock.crosschainTx.invariant, sendingChainId: 1234 },
        },
      };
      await expect(binding.handleSingle(prepare, context)).to.eventually.be.rejectedWith(
        ContractReaderNotAvailableForChain,
      );
    });

    it("should handle SenderPrepared", async () => {
      const prepare: ActiveTransaction<"SenderPrepared"> = activeTransactionPrepareMock;
      await binding.handleSingle(prepare, context);

      // prepare receiver
      expect(prepareMock).to.be.calledOnceWith(prepare.crosschainTx.invariant, {
        senderExpiry: prepare.crosschainTx.sending.expiry,
        senderAmount: prepare.crosschainTx.sending.amount,
        bidSignature: prepare.payload.bidSignature,
        encodedBid: prepare.payload.encodedBid,
        encryptedCallData: prepare.payload.encryptedCallData,
      });
    });

    it("should handle SenderPrepared error not cancellable", async () => {
      prepareMock.rejects(new Error("foo"));
      const prepare: ActiveTransaction<"SenderPrepared"> = activeTransactionPrepareMock;
      await binding.handleSingle(prepare, context);

      expect(prepareMock).to.be.calledOnceWith(prepare.crosschainTx.invariant, {
        senderExpiry: prepare.crosschainTx.sending.expiry,
        senderAmount: prepare.crosschainTx.sending.amount,
        bidSignature: prepare.payload.bidSignature,
        encodedBid: prepare.payload.encodedBid,
        encryptedCallData: prepare.payload.encryptedCallData,
      });

      expect(cancelMock).callCount(0);
    });

    it("should handle SenderPrepared error cancellable", async () => {
      prepareMock.rejects(new ExpiryInvalid(1234));
      const prepare: ActiveTransaction<"SenderPrepared"> = activeTransactionPrepareMock;
      await binding.handleSingle(prepare, context);

      expect(prepareMock).to.be.calledOnceWith(prepare.crosschainTx.invariant, {
        senderExpiry: prepare.crosschainTx.sending.expiry,
        senderAmount: prepare.crosschainTx.sending.amount,
        bidSignature: prepare.payload.bidSignature,
        encodedBid: prepare.payload.encodedBid,
        encryptedCallData: prepare.payload.encryptedCallData,
      });

      expect(cancelMock).to.be.calledOnceWith(prepare.crosschainTx.invariant, {
        amount: prepare.crosschainTx.sending.amount,
        expiry: prepare.crosschainTx.sending.expiry,
        preparedBlockNumber: prepare.crosschainTx.sending.preparedBlockNumber,
        preparedTransactionHash: prepare.payload.hashes.sending.prepareHash,
        side: "sender",
      });
    });

    it("should handle SenderPrepared error cancellable errors", async () => {
      prepareMock.rejects(new ExpiryInvalid(1234));
      cancelMock.rejects(new Error("foo"));
      const prepare: ActiveTransaction<"SenderPrepared"> = activeTransactionPrepareMock;
      await binding.handleSingle(prepare, context);

      expect(prepareMock).to.be.calledOnceWith(prepare.crosschainTx.invariant, {
        senderExpiry: prepare.crosschainTx.sending.expiry,
        senderAmount: prepare.crosschainTx.sending.amount,
        bidSignature: prepare.payload.bidSignature,
        encodedBid: prepare.payload.encodedBid,
        encryptedCallData: prepare.payload.encryptedCallData,
      });

      expect(cancelMock).to.be.calledOnceWith(prepare.crosschainTx.invariant, {
        amount: prepare.crosschainTx.sending.amount,
        expiry: prepare.crosschainTx.sending.expiry,
        preparedBlockNumber: prepare.crosschainTx.sending.preparedBlockNumber,
        preparedTransactionHash: prepare.payload.hashes.sending.prepareHash,
        side: "sender",
      });

      expect(binding.handlingTracker.get(prepare.crosschainTx.invariant.transactionId)).to.be.undefined;
    });

    it("should not fulfill tx if not enough confirmations", async () => {
      const fulfill: ActiveTransaction<"ReceiverFulfilled"> = activeTransactionFulfillMock;
      const badTx = { ...txReceiptMock, confirmations: 0 };
      txServiceMock.getTransactionReceipt.resolves(badTx);
      await binding.handleSingle(fulfill, context);
      expect(fulfillMock).callCount(0);
    });

    it("should throw error if no config for ReceiverFulfilled", async () => {
      const prepare: ActiveTransaction<"ReceiverFulfilled"> = {
        ...activeTransactionFulfillMock,
        crosschainTx: {
          ...activeTransactionFulfillMock.crosschainTx,
          invariant: { ...activeTransactionFulfillMock.crosschainTx.invariant, receivingChainId: 1234 },
        },
      };
      await expect(binding.handleSingle(prepare, context)).to.eventually.be.rejectedWith(
        ContractReaderNotAvailableForChain,
      );
    });

    it("should handle ReceiverFulfilled", async () => {
      const fulfill: ActiveTransaction<"ReceiverFulfilled"> = activeTransactionFulfillMock;
      await binding.handleSingle(fulfill, context);

      expect(fulfillMock).to.be.calledOnceWith(fulfill.crosschainTx.invariant, {
        amount: fulfill.crosschainTx.sending.amount,
        expiry: fulfill.crosschainTx.sending.expiry,
        preparedBlockNumber: fulfill.crosschainTx.sending.preparedBlockNumber,
        signature: fulfill.payload.signature,
        callData: fulfill.payload.callData,
        relayerFee: fulfill.payload.relayerFee,
        side: "sender",
      });
    });

    it("should handle ReceiverExpired", async () => {
      const receiverExpired: ActiveTransaction<"ReceiverExpired"> = {
        ...activeTransactionFulfillMock,
        payload: {
          hashes: {
            ...activeTransactionFulfillMock.payload.hashes,
          },
        },
        status: CrosschainTransactionStatus.ReceiverExpired,
      };
      await binding.handleSingle(receiverExpired, context);

      // receiverExpired
      expect(cancelMock).to.be.calledOnceWith(receiverExpired.crosschainTx.invariant, {
        amount: receiverExpired.crosschainTx.receiving.amount,
        expiry: receiverExpired.crosschainTx.receiving.expiry,
        preparedBlockNumber: receiverExpired.crosschainTx.receiving.preparedBlockNumber,
        preparedTransactionHash: receiverExpired.payload.hashes.receiving.prepareHash,
        side: "receiver",
      });
    });

    it("should handle already cancelled in ReceiverExpired", async () => {
      const receiverExpired: ActiveTransaction<"ReceiverExpired"> = {
        ...activeTransactionFulfillMock,
        payload: {
          hashes: {
            ...activeTransactionFulfillMock.payload.hashes,
          },
        },
        status: CrosschainTransactionStatus.ReceiverExpired,
      };
      cancelMock.rejects(new Error("#C:019"));
      await binding.handleSingle(receiverExpired, context);
    });

    it("should handle error in ReceiverExpired", async () => {
      const receiverExpired: ActiveTransaction<"ReceiverExpired"> = {
        ...activeTransactionFulfillMock,
        payload: {
          hashes: {
            ...activeTransactionFulfillMock.payload.hashes,
          },
        },
        status: CrosschainTransactionStatus.ReceiverExpired,
      };
      cancelMock.rejects(new Error("fail"));
      await binding.handleSingle(receiverExpired, context);
    });

    it("should handle SenderExpired", async () => {
      const senderExpiredNoReceiver: ActiveTransaction<"SenderExpired"> = {
        ...activeTransactionFulfillMock,
        crosschainTx: {
          ...activeTransactionFulfillMock.crosschainTx,
          receiving: undefined,
        },
        payload: {
          hashes: {
            ...activeTransactionFulfillMock.payload.hashes,
          },
        },
        status: CrosschainTransactionStatus.SenderExpired,
      };
      await binding.handleSingle(senderExpiredNoReceiver, context);

      expect(cancelMock).to.be.calledOnceWith(senderExpiredNoReceiver.crosschainTx.invariant, {
        amount: senderExpiredNoReceiver.crosschainTx.sending.amount,
        expiry: senderExpiredNoReceiver.crosschainTx.sending.expiry,
        preparedBlockNumber: senderExpiredNoReceiver.crosschainTx.sending.preparedBlockNumber,
        preparedTransactionHash: senderExpiredNoReceiver.payload.hashes.sending.prepareHash,
        side: "sender",
      });
    });

    it("should handle already cancelled in SenderExpired", async () => {
      const senderExpiredNoReceiver: ActiveTransaction<"SenderExpired"> = {
        ...activeTransactionFulfillMock,
        crosschainTx: {
          ...activeTransactionFulfillMock.crosschainTx,
          receiving: undefined,
        },
        payload: {
          hashes: {
            ...activeTransactionFulfillMock.payload.hashes,
          },
        },
        status: CrosschainTransactionStatus.SenderExpired,
      };
      cancelMock.rejects(new Error("#C:019"));
      await binding.handleSingle(senderExpiredNoReceiver, context);
    });

    it("should handle error in SenderExpired", async () => {
      const senderExpiredNoReceiver: ActiveTransaction<"SenderExpired"> = {
        ...activeTransactionFulfillMock,
        crosschainTx: {
          ...activeTransactionFulfillMock.crosschainTx,
          receiving: undefined,
        },
        payload: {
          hashes: {
            ...activeTransactionFulfillMock.payload.hashes,
          },
        },
        status: CrosschainTransactionStatus.SenderExpired,
      };
      cancelMock.rejects(new Error("fail"));
      await binding.handleSingle(senderExpiredNoReceiver, context);
    });

    it("should handle ReceiverCancelled", async () => {
      const senderExpiredNoReceiver: ActiveTransaction<"ReceiverCancelled"> = {
        ...activeTransactionFulfillMock,
        crosschainTx: {
          ...activeTransactionFulfillMock.crosschainTx,
          receiving: undefined,
        },
        payload: {
          hashes: {
            ...activeTransactionFulfillMock.payload.hashes,
          },
        },
        status: CrosschainTransactionStatus.ReceiverCancelled,
      };
      await binding.handleSingle(senderExpiredNoReceiver, context);

      expect(cancelMock).to.be.calledOnceWith(senderExpiredNoReceiver.crosschainTx.invariant, {
        amount: senderExpiredNoReceiver.crosschainTx.sending.amount,
        expiry: senderExpiredNoReceiver.crosschainTx.sending.expiry,
        preparedBlockNumber: senderExpiredNoReceiver.crosschainTx.sending.preparedBlockNumber,
        preparedTransactionHash: senderExpiredNoReceiver.payload.hashes.sending.prepareHash,
        side: "sender",
      });
    });

    it("should handle ReceiverCancelled with already canceled error", async () => {
      cancelMock.rejects(new Error("#C:019"));
      const senderExpiredNoReceiver: ActiveTransaction<"ReceiverCancelled"> = {
        ...activeTransactionFulfillMock,
        crosschainTx: {
          ...activeTransactionFulfillMock.crosschainTx,
          receiving: undefined,
        },
        payload: {
          hashes: {
            ...activeTransactionFulfillMock.payload.hashes,
          },
        },
        status: CrosschainTransactionStatus.ReceiverCancelled,
      };
      await binding.handleSingle(senderExpiredNoReceiver, context);

      expect(cancelMock).to.be.calledOnceWith(senderExpiredNoReceiver.crosschainTx.invariant, {
        amount: senderExpiredNoReceiver.crosschainTx.sending.amount,
        expiry: senderExpiredNoReceiver.crosschainTx.sending.expiry,
        preparedBlockNumber: senderExpiredNoReceiver.crosschainTx.sending.preparedBlockNumber,
        preparedTransactionHash: senderExpiredNoReceiver.payload.hashes.sending.prepareHash,
        side: "sender",
      });

      expect(binding.handlingTracker.get(senderExpiredNoReceiver.crosschainTx.invariant.transactionId)).to.be.undefined;
    });

    it("should handle ReceiverCancelled with error", async () => {
      cancelMock.rejects(new Error("foo"));
      const senderExpiredNoReceiver: ActiveTransaction<"ReceiverCancelled"> = {
        ...activeTransactionFulfillMock,
        crosschainTx: {
          ...activeTransactionFulfillMock.crosschainTx,
          receiving: undefined,
        },
        payload: {
          hashes: {
            ...activeTransactionFulfillMock.payload.hashes,
          },
        },
        status: CrosschainTransactionStatus.ReceiverCancelled,
      };
      await binding.handleSingle(senderExpiredNoReceiver, context);

      expect(cancelMock).to.be.calledOnceWith(senderExpiredNoReceiver.crosschainTx.invariant, {
        amount: senderExpiredNoReceiver.crosschainTx.sending.amount,
        expiry: senderExpiredNoReceiver.crosschainTx.sending.expiry,
        preparedBlockNumber: senderExpiredNoReceiver.crosschainTx.sending.preparedBlockNumber,
        preparedTransactionHash: senderExpiredNoReceiver.payload.hashes.sending.prepareHash,
        side: "sender",
      });

      expect(binding.handlingTracker.get(senderExpiredNoReceiver.crosschainTx.invariant.transactionId)).to.be.undefined;
    });

    it("should handle ReceiverCancelled with error", async () => {
      cancelMock.rejects(new Error("foo"));
      const senderExpiredNoReceiver: ActiveTransaction<"ReceiverCancelled"> = {
        ...activeTransactionFulfillMock,
        crosschainTx: {
          ...activeTransactionFulfillMock.crosschainTx,
          receiving: undefined,
        },
        payload: {
          hashes: {
            ...activeTransactionFulfillMock.payload.hashes,
          },
        },
        status: CrosschainTransactionStatus.ReceiverCancelled,
      };
      await binding.handleSingle(senderExpiredNoReceiver, context);

      expect(cancelMock).to.be.calledOnceWith(senderExpiredNoReceiver.crosschainTx.invariant, {
        amount: senderExpiredNoReceiver.crosschainTx.sending.amount,
        expiry: senderExpiredNoReceiver.crosschainTx.sending.expiry,
        preparedBlockNumber: senderExpiredNoReceiver.crosschainTx.sending.preparedBlockNumber,
        preparedTransactionHash: senderExpiredNoReceiver.payload.hashes.sending.prepareHash,
        side: "sender",
      });

      expect(binding.handlingTracker.get(senderExpiredNoReceiver.crosschainTx.invariant.transactionId)).to.be.undefined;
    });

    it("should handle ReceiverNotConfigured", async () => {
      const receiverNotConfigured: ActiveTransaction<"ReceiverNotConfigured"> = {
        ...activeTransactionFulfillMock,
        crosschainTx: {
          ...activeTransactionFulfillMock.crosschainTx,
          receiving: undefined,
        },
        payload: {
          hashes: {
            ...activeTransactionFulfillMock.payload.hashes,
          },
        },
        status: CrosschainTransactionStatus.ReceiverNotConfigured,
      };

      await binding.handleSingle(receiverNotConfigured, context);

      expect(cancelMock).to.be.calledOnceWith(receiverNotConfigured.crosschainTx.invariant, {
        amount: receiverNotConfigured.crosschainTx.sending.amount,
        expiry: receiverNotConfigured.crosschainTx.sending.expiry,
        preparedBlockNumber: receiverNotConfigured.crosschainTx.sending.preparedBlockNumber,
        preparedTransactionHash: receiverNotConfigured.payload.hashes.sending.prepareHash,
        side: "sender",
      });
    });

    it("should not prepare tx if not enough confirmations", async () => {
      const badTx = { ...txReceiptMock, confirmations: 0 };
      txServiceMock.getTransactionReceipt.resolves(badTx);
      const prepare: ActiveTransaction<"SenderPrepared"> = { ...activeTransactionPrepareMock };
      await binding.handleSingle(prepare, context);
      expect(prepareMock).callCount(0);
    });

    it("should handle sender already fulfilled", async () => {
      const fulfill: ActiveTransaction<"ReceiverFulfilled"> = activeTransactionFulfillMock;
      fulfillMock.rejects(new Error("#F:019"));
      await binding.handleSingle(fulfill, context);
    });

    it("should handle sender fulfill error", async () => {
      const fulfill: ActiveTransaction<"ReceiverFulfilled"> = activeTransactionFulfillMock;
      fulfillMock.rejects(new Error("fail"));
      await binding.handleSingle(fulfill, context);
    });
  });

  describe("#handleActiveTransactions", () => {
    it("should skip handling txs that are already handled", async () => {
      const handleSingleStub = stub(binding, "handleSingle").resolves();
      const prepare: ActiveTransaction<"SenderPrepared"> = activeTransactionPrepareMock;
      const fulfill: ActiveTransaction<"ReceiverFulfilled"> = {
        ...activeTransactionFulfillMock,
        crosschainTx: {
          ...activeTransactionFulfillMock.crosschainTx,
          invariant: { ...activeTransactionFulfillMock.crosschainTx.invariant, transactionId: mkBytes32("0xeee") },
        },
      };
      binding.handlingTracker.set(prepare.crosschainTx.invariant.transactionId, {
        status: prepare.status,
        chainId: prepare.crosschainTx.invariant.receivingChainId,
        block: txReceiptMock.blockNumber,
      });
      await binding.handleActiveTransactions([prepare, fulfill]);
      expect(handleSingleStub).callCount(1);
      expect(handleSingleStub).to.be.calledOnceWith(fulfill);
      binding.handlingTracker.clear();
    });
  });

  describe("#getLoopInterval", async () => {
    expect(binding.getLoopInterval()).to.be.eq(15_000);
  });

  describe("#bindContractReader", () => {
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

    it("should error if contract reader active transactions fails", async () => {
      (contractReaderMock.getActiveTransactions as SinonStub).throws(new Error("fails"));
      await binding.bindContractReader();
      await delay(interval + 10);
      expect((contractReaderMock.getActiveTransactions as SinonStub).callCount).to.be.eq(1);
      expect(handleActiveTransactionsStub.callCount).to.be.eq(0);
    });

    it("should work", async () => {
      await binding.bindContractReader();
      await delay(interval + 10);
      expect((contractReaderMock.getActiveTransactions as SinonStub).callCount).to.be.eq(1);
      expect(handleActiveTransactionsStub.callCount).to.be.eq(1);
    });
  });
});
