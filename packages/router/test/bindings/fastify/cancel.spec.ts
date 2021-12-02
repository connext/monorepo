import { getRandomAddress, getRandomBytes32, expect } from "@connext/nxtp-utils";
import { SinonStub } from "sinon";
import { TransactionStatus } from "../../../src/adapters/subgraph/runtime/graphqlsdk";
import { prepareCancel } from "../../../src/bindings/fastify/cancel";
import { NoSenderTxFound, ReceiverTxInvalidStatus, SenderTxInvalidStatus } from "../../../src/bindings/fastify/errors";
import { contractReaderMock } from "../../globalTestHook";

describe("Cancel Fastify Binding", () => {
  it("should fail if there is no sender tx", async () => {
    const params = {
      transactionId: getRandomBytes32(),
      user: getRandomAddress(),
      senderChainId: 1337,
    };
    (contractReaderMock.getTransactionForChain as SinonStub).resolves(undefined);
    await expect(prepareCancel(params)).to.be.rejectedWith(new NoSenderTxFound(params.transactionId).message);
  });

  it("should fail if the sender tx is not prepared", async () => {
    const params = {
      transactionId: getRandomBytes32(),
      user: getRandomAddress(),
      senderChainId: 1337,
    };
    (contractReaderMock.getTransactionForChain as SinonStub).resolves({ status: TransactionStatus.Fulfilled });
    await expect(prepareCancel(params)).to.be.rejectedWith(
      new SenderTxInvalidStatus(params.transactionId, TransactionStatus.Fulfilled).message,
    );
  });

  it("should fail if receiver tx status is not cancelled", async () => {
    const params = {
      transactionId: getRandomBytes32(),
      user: getRandomAddress(),
      senderChainId: 1337,
    };
    (contractReaderMock.getTransactionForChain as SinonStub)
      .onFirstCall()
      .resolves({ status: TransactionStatus.Prepared, txData: { receivingChainId: 1 } });
    (contractReaderMock.getTransactionForChain as SinonStub)
      .onSecondCall()
      .resolves({ status: TransactionStatus.Prepared });
    await expect(prepareCancel(params)).to.be.rejectedWith(
      new ReceiverTxInvalidStatus(params.transactionId, TransactionStatus.Prepared).message,
    );
  });

  it("should work", async () => {
    const params = {
      transactionId: getRandomBytes32(),
      user: getRandomAddress(),
      senderChainId: 1337,
    };
    const sender = { status: TransactionStatus.Prepared, txData: { receivingChainId: 1 } };
    (contractReaderMock.getTransactionForChain as SinonStub).onFirstCall().resolves(sender);
    (contractReaderMock.getTransactionForChain as SinonStub).onSecondCall().resolves(undefined);
    const ret = await prepareCancel(params);
    expect(ret).to.be.deep.eq(sender);
    expect((contractReaderMock.getTransactionForChain as SinonStub).callCount).to.be.eq(2);
  });
});
