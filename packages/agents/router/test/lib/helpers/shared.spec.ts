import { getHelpers } from "../../../src/lib/helpers";
import { stubContext } from "../../mock";

const { shared } = getHelpers();

describe("Helpers:Shared", () => {
  const mockContext = stubContext();

  // describe("#sanitationCheck", () => {
  //   beforeEach(() => {
  //     context = mock.context();
  //   });

  //   afterEach(() => {
  //     restore();
  //     reset();
  //   });

  //   // it("should work for cancel if receiving is zero hash", async () => {
  //   //   const txDataMockToCancel = { ...txDataMock, amount: "0", expiry: 0, preparedBlockNumber: 0 };
  //   //   const invariantDigest = getInvariantTransactionDigest(txDataMockToCancel);
  //   //   interfaceMock.encodeFunctionData.returns(invariantDigest);

  //   //   const receivingChainNxtpContractAddress = mkAddress("0xd");
  //   //   stub(shared, "getContractAddress")
  //   //     .withArgs(txDataMockToCancel.receivingChainId)
  //   //     .returns(receivingChainNxtpContractAddress);

  //   //   mockTxservice.readTx
  //   //     .withArgs({
  //   //       chainId: txDataMockToCancel.receivingChainId,
  //   //       to: receivingChainNxtpContractAddress,
  //   //       data: invariantDigest,
  //   //     })
  //   //     .resolves(HashZero);

  //   //   mockTxservice.readTx.resolves(getVariantTransactionDigest(txDataMockToCancel));

  //   //   await shared.sanitationCheck(txDataMock.sendingChainId, txDataMock, "cancel");
  //   //   expect(interfaceMock.encodeFunctionData.firstCall.args).to.be.deep.eq([
  //   //     "variantTransactionData",
  //   //     [invariantDigest],
  //   //   ]);
  //   //   expect(interfaceMock.encodeFunctionData.callCount).to.be.eq(1);
  //   // });

  //   // it("should error for cancel if sender is not expired", async () => {
  //   //   stub(shared, "getNtpTimeSeconds").resolves(txDataMock.expiry - 1);
  //   //   const invariantDigest = getInvariantTransactionDigest(txDataMock);
  //   //   interfaceMock.encodeFunctionData.returns(invariantDigest);

  //   //   const receivingChainNxtpContractAddress = mkAddress("0xd");
  //   //   stub(shared, "getContractAddress")
  //   //     .withArgs(txDataMock.receivingChainId)
  //   //     .returns(receivingChainNxtpContractAddress);

  //   //   await expect(shared.sanitationCheck(txDataMock.sendingChainId, txDataMock, "cancel")).to.be.rejectedWith(
  //   //     new SanitationCheckFailed("cancel", txDataMock.transactionId, txDataMock.sendingChainId).message,
  //   //   );
  //   // });

  //   // it("should work for cancel if sender is expired", async () => {
  //   //   stub(shared, "getNtpTimeSeconds").resolves(txDataMock.expiry + 1);
  //   //   const invariantDigest = getInvariantTransactionDigest(txDataMock);
  //   //   interfaceMock.encodeFunctionData.returns(invariantDigest);

  //   //   const receivingChainNxtpContractAddress = mkAddress("0xd");
  //   //   stub(shared, "getContractAddress")
  //   //     .withArgs(txDataMock.receivingChainId)
  //   //     .returns(receivingChainNxtpContractAddress);

  //   //   await shared.sanitationCheck(txDataMock.sendingChainId, txDataMock, "cancel");
  //   //   expect(interfaceMock.encodeFunctionData.firstCall.args).to.be.deep.eq([
  //   //     "variantTransactionData",
  //   //     [invariantDigest],
  //   //   ]);
  //   //   expect(interfaceMock.encodeFunctionData.callCount).to.be.eq(1);
  //   // });

  //   // it("should work for cancel", async () => {
  //   //   const txDataMockToCancel = { ...txDataMock, amount: "0", expiry: 0, preparedBlockNumber: 0 };
  //   //   const invariantDigest = getInvariantTransactionDigest(txDataMockToCancel);
  //   //   interfaceMock.encodeFunctionData.returns(invariantDigest);

  //   //   mockTxservice.readTx.resolves(getVariantTransactionDigest(txDataMockToCancel));

  //   //   const mockReceiverChainTx: SingleChainTransaction = {
  //   //     status: TransactionStatus.Cancelled,
  //   //     txData: txDataMock,
  //   //     encryptedCallData: "0x",
  //   //     encodedBid: "0x",
  //   //     bidSignature: "0x",
  //   //   };
  //   //   (contractReaderMock.getTransactionForChain as SinonStub).onCall(0).resolves(mockReceiverChainTx);

  //   //   await shared.sanitationCheck(txDataMock.sendingChainId, txDataMock, "cancel");
  //   //   expect(interfaceMock.encodeFunctionData.firstCall.args).to.be.deep.eq([
  //   //     "variantTransactionData",
  //   //     [invariantDigest],
  //   //   ]);
  //   //   expect(interfaceMock.encodeFunctionData.callCount).to.be.eq(1);
  //   // });

  //   // it("should throw an error if receiving tx status is not Cancelled", async () => {
  //   //   const txDataMockToCancel = { ...txDataMock, amount: "0", expiry: 0, preparedBlockNumber: 0 };
  //   //   const invariantDigest = getInvariantTransactionDigest(txDataMockToCancel);
  //   //   interfaceMock.encodeFunctionData.returns(invariantDigest);

  //   //   mockTxservice.readTx.resolves(getVariantTransactionDigest(txDataMockToCancel));

  //   //   const mockReceiverChainTx: SingleChainTransaction = {
  //   //     status: TransactionStatus.Prepared,
  //   //     txData: txDataMock,
  //   //     encryptedCallData: "0x",
  //   //     encodedBid: "0x",
  //   //     bidSignature: "0x",
  //   //   };
  //   //   (contractReaderMock.getTransactionForChain as SinonStub).onCall(0).resolves(mockReceiverChainTx);

  //   //   await expect(shared.sanitationCheck(txDataMock.sendingChainId, txDataMock, "cancel")).to.be.rejectedWith(
  //   //     new SanitationCheckFailed("cancel", txDataMock.transactionId, txDataMock.sendingChainId).message,
  //   //   );
  //   // });
  // });

  describe("#getDestinationLocalAsset", () => {});
});
