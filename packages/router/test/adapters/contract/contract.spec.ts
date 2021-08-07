import {
  createRequestContext,
  txDataMock,
  prepareParamsMock,
  txReceiptMock,
  fulfillParamsMock,
  cancelParamsMock,
  mkAddress,
} from "@connext/nxtp-utils";
import { expect } from "chai";

import { fulfill, getContractAddress, prepare, cancel, removeLiquidity } from "../../../src/adapters/contract/contract";
import * as ContractFns from "../../../src/adapters/contract/contract";
import { createStubInstance, SinonStubbedInstance, stub } from "sinon";
import { Interface } from "ethers/lib/utils";
import { TransactionManagerInterface } from "@connext/nxtp-contracts/typechain/TransactionManager";
import { routerAddrMock } from "../../utils";

const requestContext = createRequestContext("TEST");
const encodedDataMock = "0xabcde";

let interfaceMock: SinonStubbedInstance<Interface>;
describe.only("Contract Adapter", () => {
  beforeEach(() => {
    interfaceMock = createStubInstance(Interface);
    interfaceMock.encodeFunctionData.returns(encodedDataMock);
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
      expect(interfaceMock.encodeFunctionData).calledOnceWithExactly("prepare", [
        prepareParamsMock.txData,
        prepareParamsMock.amount,
        prepareParamsMock.expiry,
        prepareParamsMock.encryptedCallData,
        prepareParamsMock.encodedBid,
        prepareParamsMock.bidSignature,
      ]);
      expect(res).to.deep.eq(txReceiptMock);
    });
  });

  describe("#fulfill", () => {
    it("happy case: fulfill", async () => {
      const chainId = txDataMock.sendingChainId;

      const res = await fulfill(chainId, fulfillParamsMock, requestContext);
      expect(interfaceMock.encodeFunctionData).calledOnceWithExactly("fulfill", [
        fulfillParamsMock.txData,
        fulfillParamsMock.relayerFee,
        fulfillParamsMock.signature,
        fulfillParamsMock.callData,
      ]);
      expect(res).to.deep.eq(txReceiptMock);
    });
  });

  describe("#cancel", () => {
    it("happy case: cancel", async () => {
      const chainId = txDataMock.sendingChainId;

      const res = await cancel(chainId, cancelParamsMock, requestContext);
      expect(interfaceMock.encodeFunctionData).calledOnceWithExactly("cancel", [
        cancelParamsMock.txData,
        cancelParamsMock.relayerFee,
        cancelParamsMock.signature,
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
