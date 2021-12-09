import {
  expect,
  getRandomBytes32,
  mkAddress,
  RequestContextWithTransactionId,
  senderPrepareDataMock,
  txDataMock,
} from "@connext/nxtp-utils";
import { SinonStub } from "sinon";
import { TransactionStatus } from "../../../src/adapters/subgraph/runtime/graphqlsdk";
import { prepareCancel } from "../../../src/bindings/fastify/cancel";
import { NoSenderTxFound, ReceiverTxInvalidStatus, SenderTxInvalidStatus } from "../../../src/bindings/fastify/errors";
import { SingleChainTransaction } from "../../../src/lib/entities";
import { contractReaderMock } from "../../globalTestHook";

let context: RequestContextWithTransactionId = {
  id: "",
  origin: "",
  transactionId: "",
};

const mockTransactionId = getRandomBytes32();
const mockUser = mkAddress("0xabc");
const mockSendingChainTx: SingleChainTransaction = {
  status: TransactionStatus.Prepared,
  txData: txDataMock,
  encryptedCallData: senderPrepareDataMock.encryptedCallData,
  encodedBid: senderPrepareDataMock.encodedBid,
  bidSignature: senderPrepareDataMock.bidSignature,
};
const mockReceiverChainTx: SingleChainTransaction = {
  status: TransactionStatus.Cancelled,
  txData: txDataMock,
  encryptedCallData: senderPrepareDataMock.encryptedCallData,
  encodedBid: senderPrepareDataMock.encodedBid,
  bidSignature: senderPrepareDataMock.bidSignature,
};

describe("#cancel", () => {
  beforeEach(() => {
    context.id = getRandomBytes32();
    context.origin = "fastifyBindingsTest";
    context.transactionId = mockTransactionId;
    (contractReaderMock.getTransactionForChain as SinonStub).onCall(0).resolves(mockSendingChainTx);
    (contractReaderMock.getTransactionForChain as SinonStub).onCall(1).resolves(mockReceiverChainTx);
  });

  it("should work", async () => {
    await prepareCancel({
      transactionId: mockTransactionId,
      user: mockUser,
      senderChainId: txDataMock.sendingChainId,
    });

    expect((contractReaderMock.getTransactionForChain as SinonStub).getCall(0).args).to.be.deep.eq([
      mockTransactionId,
      mockUser,
      txDataMock.sendingChainId,
    ]);
    expect((contractReaderMock.getTransactionForChain as SinonStub).getCall(1).args).to.be.deep.eq([
      mockTransactionId,
      mockUser,
      txDataMock.receivingChainId,
    ]);
  });

  it("should work if there's no receiver tx", async () => {
    (contractReaderMock.getTransactionForChain as SinonStub).onCall(1).resolves(undefined);
    await prepareCancel({
      transactionId: mockTransactionId,
      user: mockUser,
      senderChainId: txDataMock.sendingChainId,
    });
  });

  it("should throw NoSenderTxFound if no sender tx found", async () => {
    (contractReaderMock.getTransactionForChain as SinonStub).onCall(0).resolves(undefined);
    await expect(
      prepareCancel({
        transactionId: mockTransactionId,
        user: mockUser,
        senderChainId: txDataMock.sendingChainId,
      }),
    ).to.be.rejectedWith(NoSenderTxFound);
  });

  it("should throw SenderTxInvalidStatus if status is not prepared", async () => {
    (contractReaderMock.getTransactionForChain as SinonStub).onCall(0).resolves({
      ...mockSendingChainTx,
      status: TransactionStatus.Fulfilled,
    });
    await expect(
      prepareCancel({
        transactionId: mockTransactionId,
        user: mockUser,
        senderChainId: txDataMock.sendingChainId,
      }),
    ).to.be.rejectedWith(SenderTxInvalidStatus);
  });

  it("should throw ReceiverTxInvalidStatus if the receiver tx has not already been cancelled", async () => {
    (contractReaderMock.getTransactionForChain as SinonStub).onCall(1).resolves({
      ...mockSendingChainTx,
      status: TransactionStatus.Fulfilled,
    });
    await expect(
      prepareCancel({
        transactionId: mockTransactionId,
        user: mockUser,
        senderChainId: txDataMock.sendingChainId,
      }),
    ).to.be.rejectedWith(ReceiverTxInvalidStatus);
  });
});
