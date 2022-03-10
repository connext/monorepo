import {
  createLoggingContext,
  ERC20Abi,
  expect,
  getChainData,
  getRandomBytes32,
  mkAddress,
  mkBytes32,
} from "@connext/nxtp-utils";
import { constants, utils } from "ethers";
import { Interface } from "ethers/lib/utils";
import { BigNumber } from "ethers";
import { SinonStubbedInstance, createStubInstance, stub, SinonStub, restore, reset } from "sinon";
import { getDeployedPriceOracleContract } from "@connext/nxtp-txservice";

import * as shared from "../../../src/lib/helpers/shared";
import { SanitationCheckFailed } from "../../../src/lib/errors";
import { mock } from "../../mock";
import { AppContext } from "../../../src/context";
const { HashZero } = constants;

const encodedDataMock = "0xabcde";
let interfaceMock: SinonStubbedInstance<Interface>;
const mockTxservice = mock.adapter.txservice();

let context: SinonStubbedInstance<AppContext>;

describe("Helpers:Shared", () => {
  describe("#sanitationCheck", () => {
    beforeEach(() => {
      context = mock.context();
    });
  
    afterEach(() => {
      restore();
      reset();
    });
  
    it("should work for cancel if receiving is zero hash", async () => {
      const txDataMockToCancel = { ...txDataMock, amount: "0", expiry: 0, preparedBlockNumber: 0 };
      const invariantDigest = getInvariantTransactionDigest(txDataMockToCancel);
      interfaceMock.encodeFunctionData.returns(invariantDigest);
  
      const receivingChainNxtpContractAddress = mkAddress("0xd");
      stub(shared, "getContractAddress")
        .withArgs(txDataMockToCancel.receivingChainId)
        .returns(receivingChainNxtpContractAddress);
  
      mockTxservice.readTx
        .withArgs({
          chainId: txDataMockToCancel.receivingChainId,
          to: receivingChainNxtpContractAddress,
          data: invariantDigest,
        })
        .resolves(HashZero);
  
      mockTxservice.readTx.resolves(getVariantTransactionDigest(txDataMockToCancel));
  
      await shared.sanitationCheck(txDataMock.sendingChainId, txDataMock, "cancel");
      expect(interfaceMock.encodeFunctionData.firstCall.args).to.be.deep.eq([
        "variantTransactionData",
        [invariantDigest],
      ]);
      expect(interfaceMock.encodeFunctionData.callCount).to.be.eq(1);
    });
  
    it("should error for cancel if sender is not expired", async () => {
      stub(shared, "getNtpTimeSeconds").resolves(txDataMock.expiry - 1);
      const invariantDigest = getInvariantTransactionDigest(txDataMock);
      interfaceMock.encodeFunctionData.returns(invariantDigest);
  
      const receivingChainNxtpContractAddress = mkAddress("0xd");
      stub(shared, "getContractAddress").withArgs(txDataMock.receivingChainId).returns(receivingChainNxtpContractAddress);
  
      await expect(shared.sanitationCheck(txDataMock.sendingChainId, txDataMock, "cancel")).to.be.rejectedWith(
        new SanitationCheckFailed("cancel", txDataMock.transactionId, txDataMock.sendingChainId).message,
      );
    });
  
    it("should work for cancel if sender is expired", async () => {
      stub(shared, "getNtpTimeSeconds").resolves(txDataMock.expiry + 1);
      const invariantDigest = getInvariantTransactionDigest(txDataMock);
      interfaceMock.encodeFunctionData.returns(invariantDigest);
  
      const receivingChainNxtpContractAddress = mkAddress("0xd");
      stub(shared, "getContractAddress").withArgs(txDataMock.receivingChainId).returns(receivingChainNxtpContractAddress);
  
      await shared.sanitationCheck(txDataMock.sendingChainId, txDataMock, "cancel");
      expect(interfaceMock.encodeFunctionData.firstCall.args).to.be.deep.eq([
        "variantTransactionData",
        [invariantDigest],
      ]);
      expect(interfaceMock.encodeFunctionData.callCount).to.be.eq(1);
    });
  
    it("should work for cancel", async () => {
      const txDataMockToCancel = { ...txDataMock, amount: "0", expiry: 0, preparedBlockNumber: 0 };
      const invariantDigest = getInvariantTransactionDigest(txDataMockToCancel);
      interfaceMock.encodeFunctionData.returns(invariantDigest);
  
      mockTxservice.readTx.resolves(getVariantTransactionDigest(txDataMockToCancel));
  
      const mockReceiverChainTx: SingleChainTransaction = {
        status: TransactionStatus.Cancelled,
        txData: txDataMock,
        encryptedCallData: "0x",
        encodedBid: "0x",
        bidSignature: "0x",
      };
      (contractReaderMock.getTransactionForChain as SinonStub).onCall(0).resolves(mockReceiverChainTx);
  
      await shared.sanitationCheck(txDataMock.sendingChainId, txDataMock, "cancel");
      expect(interfaceMock.encodeFunctionData.firstCall.args).to.be.deep.eq([
        "variantTransactionData",
        [invariantDigest],
      ]);
      expect(interfaceMock.encodeFunctionData.callCount).to.be.eq(1);
    });
  
    it("should throw an error if receiving tx status is not Cancelled", async () => {
      const txDataMockToCancel = { ...txDataMock, amount: "0", expiry: 0, preparedBlockNumber: 0 };
      const invariantDigest = getInvariantTransactionDigest(txDataMockToCancel);
      interfaceMock.encodeFunctionData.returns(invariantDigest);
  
      mockTxservice.readTx.resolves(getVariantTransactionDigest(txDataMockToCancel));
  
      const mockReceiverChainTx: SingleChainTransaction = {
        status: TransactionStatus.Prepared,
        txData: txDataMock,
        encryptedCallData: "0x",
        encodedBid: "0x",
        bidSignature: "0x",
      };
      (contractReaderMock.getTransactionForChain as SinonStub).onCall(0).resolves(mockReceiverChainTx);
  
      await expect(shared.sanitationCheck(txDataMock.sendingChainId, txDataMock, "cancel")).to.be.rejectedWith(
        new SanitationCheckFailed("cancel", txDataMock.transactionId, txDataMock.sendingChainId).message,
      );
    });
  });

  describe("#getDestinationTransactingAsset", () => {});

  describe("#getDestinationLocalAsset", () => {});

  describe("#getAmountIn", () => {});

  describe("#getAmountOut", () => {});

  describe("#getDecimalsForAsset", () => {
    beforeEach(() => {
      mockTxservice.getDecimalsForAsset.resolves(18);
    });
  });

  describe("#calculateGasFeeInReceivingToken", () => {});
});

describe("#sanitationCheck", () => {

});

describe("multicall", () => {
  it("should work", async () => {
    const priceOralceOnBsc = getDeployedPriceOracleContract(56);

    const calls = [
      {
        address: priceOralceOnBsc.address,
        name: "getTokenPrice",
        params: [mkAddress("0x0")], // BNB address
      },
      {
        address: priceOralceOnBsc.address,
        name: "getTokenPrice",
        params: ["0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"], // WBNB address
      },
    ];
    const rpcUrl = "https://bsc-dataseed.binance.org/";
    const multicallAddress = "0x966dc92E72376ae21CC2793333f83B4c394DDC3c";
    const [bnbPrice, wbnbPrice] = await shared.multicall(priceOralceOnBsc.abi, calls, multicallAddress, rpcUrl);
    expect(bnbPrice.toString()).to.be.eq(wbnbPrice.toString());
  });
});
