import {
  createRequestContext,
  mkAddress,
  fulfillParamsMock,
  txReceiptMock,
  txDataMock,
  prepareParamsMock,
  cancelParamsMock,
  expect,
} from "@connext/nxtp-utils";

import { fulfill, getContractAddress, prepare, cancel, removeLiquidity } from "../../../src/adapters/contract/contract";
import * as ContractFns from "../../../src/adapters/contract/contract";
import { createStubInstance, SinonStubbedInstance, stub } from "sinon";
import { Interface } from "ethers/lib/utils";
import { TransactionManagerInterface } from "@connext/nxtp-contracts/typechain/TransactionManager";
import { routerAddrMock } from "../../utils";

const requestContext = createRequestContext("TEST");
const encodedDataMock = "0xabcde";

let interfaceMock: SinonStubbedInstance<Interface>;

describe("Contract Adapter", () => {
  beforeEach(() => {
    interfaceMock = createStubInstance(Interface);
    interfaceMock.encodeFunctionData.returns(encodedDataMock);
    stub(ContractFns, "prepareSanitationCheck").resolves();
    stub(ContractFns, "cancelAndFullfillSanitationCheck").resolves();
    stub(ContractFns, "getTxManagerInterface").returns(interfaceMock as unknown as TransactionManagerInterface);
  });

  describe("#getContractAddress", () => {
    it("should error if chainId is not supported in config", async () => {
      const chainId = 1400;
      expect(() => getContractAddress(chainId)).throws(`No contract exists for chain ${chainId}`);
    });
  });

  describe("#prepare", () => {
    it("happy case: prepare", async () => {
      const chainId = txDataMock.sendingChainId;

      const res = await prepare(chainId, prepareParamsMock, requestContext);
      expect(interfaceMock.encodeFunctionData).calledOnceWith("prepare", [
        {
          invariantData: prepareParamsMock.txData,
          amount: prepareParamsMock.amount,
          expiry: prepareParamsMock.expiry,
          encryptedCallData: prepareParamsMock.encryptedCallData,
          encodedBid: prepareParamsMock.encodedBid,
          bidSignature: prepareParamsMock.bidSignature,
          encodedMeta: "0x",
        },
      ]);
      expect(res).to.deep.eq(txReceiptMock);
    });
  });

  describe("#fulfill", () => {
    it("happy case: fulfill", async () => {
      const chainId = txDataMock.sendingChainId;

      const res = await fulfill(chainId, fulfillParamsMock, requestContext);
      expect(interfaceMock.encodeFunctionData).calledOnceWith("fulfill", [
        {
          txData: fulfillParamsMock.txData,
          relayerFee: fulfillParamsMock.relayerFee,
          signature: fulfillParamsMock.signature,
          callData: fulfillParamsMock.callData,
          encodedMeta: "0x",
        },
      ]);
      expect(res).to.deep.eq(txReceiptMock);
    });
  });

  describe("#cancel", () => {
    it("happy case: cancel", async () => {
      const chainId = txDataMock.sendingChainId;

      const res = await cancel(chainId, cancelParamsMock, requestContext);
      expect(interfaceMock.encodeFunctionData).calledOnceWith("cancel", [
        {
          txData: cancelParamsMock.txData,
          signature: cancelParamsMock.signature,
          encodedMeta: "0x",
        },
      ]);
      expect(res).to.deep.eq(txReceiptMock);
    });
  });

  describe("#removeLiquidity", () => {
    it("if no recipient, use wallet address", async () => {
      const chainId = txDataMock.sendingChainId;

      const amount = "1000";
      const assetId = mkAddress("0x6");

      const res = await removeLiquidity(chainId, amount, assetId, undefined, requestContext);
      expect(interfaceMock.encodeFunctionData).calledOnceWithExactly("removeLiquidity", [
        amount,
        assetId,
        routerAddrMock,
      ]);
      expect(res).to.deep.eq(txReceiptMock);
    });

    it("happy case: remove liquidity", async () => {
      const chainId = txDataMock.sendingChainId;

      const amount = "1000";
      const assetId = mkAddress("0x1");
      const recipientAddress = mkAddress("0x2");

      const res = await removeLiquidity(chainId, amount, assetId, recipientAddress, requestContext);
      expect(interfaceMock.encodeFunctionData).calledOnceWithExactly("removeLiquidity", [
        amount,
        assetId,
        recipientAddress,
      ]);
      expect(res).to.deep.eq(txReceiptMock);
    });
  });
});
