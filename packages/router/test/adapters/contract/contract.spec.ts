import {
  createRequestContext,
  mkAddress,
  fulfillParamsMock,
  txReceiptMock,
  txDataMock,
  prepareParamsMock,
  cancelParamsMock,
  expect,
  getInvariantTransactionDigest,
  invariantDataMock,
  getRandomBytes32,
  getVariantTransactionDigest,
} from "@connext/nxtp-utils";

import {
  fulfill,
  getOracleContractAddress,
  prepare,
  cancel,
  removeLiquidity,
} from "../../../src/adapters/contract/contract";
import * as ContractFns from "../../../src/adapters/contract/contract";
import { createStubInstance, SinonStubbedInstance, stub } from "sinon";
import { Interface } from "ethers/lib/utils";
import { TransactionManagerInterface } from "@connext/nxtp-contracts/typechain/TransactionManager";
import { configMock, routerAddrMock } from "../../utils";
import { NotExistPriceOracle, SanitationCheckFailed } from "../../../src/lib/errors/contracts";
import { txServiceMock } from "../../globalTestHook";
import { constants } from "ethers";

const requestContext = createRequestContext("TEST");
const encodedDataMock = "0xabcde";

let interfaceMock: SinonStubbedInstance<Interface>;

describe("Contract Adapter", () => {
  let sanitationStub;
  beforeEach(() => {
    interfaceMock = createStubInstance(Interface);
    interfaceMock.encodeFunctionData.returns(encodedDataMock);
    stub(ContractFns, "getTxManagerInterface").returns(interfaceMock as unknown as TransactionManagerInterface);
  });

  describe("#getContractAddress / #getOracleContractAddress", () => {
    const badChainId = 1400;
    const tests = [
      {
        field: "transactionManagerAddress",
        functionName: "getContractAddress",
        error: `No contract exists for chain ${badChainId}`,
      },
      {
        field: "priceOracleAddress",
        functionName: "getOracleContractAddress",
        error: new NotExistPriceOracle(badChainId).message,
      },
    ];
    for (const test of tests) {
      const { error, field, functionName } = test;
      it(`${functionName} should error if chainId is not supported in config`, async () => {
        expect(() => ContractFns[functionName](badChainId)).throws(error);
      });

      it(`${functionName} should work`, async () => {
        expect(ContractFns[functionName](1337)).to.be.eq(configMock.chainConfig[1337][field]);
      });
    }
  });

  describe("sanitation check", () => {
    it("should work for prepare", async () => {
      const digest = getInvariantTransactionDigest(txDataMock);
      interfaceMock.encodeFunctionData.returns(digest);

      txServiceMock.readTx.resolves(constants.HashZero);

      await ContractFns.sanitationCheck(txDataMock.sendingChainId, txDataMock, "prepare");
      expect(interfaceMock.encodeFunctionData.firstCall.args).to.be.deep.eq(["variantTransactionData", [digest]]);
      expect(interfaceMock.encodeFunctionData.callCount).to.be.eq(1);
    });

    it("should throw an error if the hash is not empty && function is prepare", async () => {
      const digest = getInvariantTransactionDigest(txDataMock);
      interfaceMock.encodeFunctionData.returns(digest);

      txServiceMock.readTx.resolves(getRandomBytes32());

      await expect(ContractFns.sanitationCheck(txDataMock.sendingChainId, txDataMock, "prepare")).to.be.rejectedWith(
        new SanitationCheckFailed("prepare", invariantDataMock.transactionId, invariantDataMock.sendingChainId).message,
      );
    });

    it("should work for fulfill", async () => {
      const invariantDigest = getInvariantTransactionDigest(txDataMock);
      const variantDigest = getVariantTransactionDigest(txDataMock);
      interfaceMock.encodeFunctionData.returns(invariantDigest);

      txServiceMock.readTx.resolves(variantDigest);

      await ContractFns.sanitationCheck(txDataMock.sendingChainId, txDataMock, "fulfill");
      expect(interfaceMock.encodeFunctionData.firstCall.args).to.be.deep.eq([
        "variantTransactionData",
        [invariantDigest],
      ]);
      expect(interfaceMock.encodeFunctionData.callCount).to.be.eq(1);
    });

    it("should throw an error if its an empty hash", async () => {
      const invariantDigest = getInvariantTransactionDigest(txDataMock);
      interfaceMock.encodeFunctionData.returns(invariantDigest);

      txServiceMock.readTx.resolves(constants.HashZero);

      await expect(ContractFns.sanitationCheck(txDataMock.sendingChainId, txDataMock, "fulfill")).to.be.rejectedWith(
        new SanitationCheckFailed("fulfill", txDataMock.transactionId, txDataMock.sendingChainId).message,
      );
    });

    it("should throw an error if its a fulfilled hash", async () => {
      const invariantDigest = getInvariantTransactionDigest(txDataMock);
      interfaceMock.encodeFunctionData.returns(invariantDigest);

      txServiceMock.readTx.resolves(getVariantTransactionDigest({ ...txDataMock, preparedBlockNumber: 0 }));

      await expect(ContractFns.sanitationCheck(txDataMock.sendingChainId, txDataMock, "fulfill")).to.be.rejectedWith(
        new SanitationCheckFailed("fulfill", txDataMock.transactionId, txDataMock.sendingChainId).message,
      );
    });
  });

  describe("#getOracleContractAddress", () => {
    it("should error if chainId is not supported in config", async () => {
      const chainId = 1400;
      expect(() => getOracleContractAddress(chainId, requestContext)).throws(
        `Price Oracle doesn't exist for chain ${chainId}`,
      );
    });
  });

  describe("#prepare", () => {
    beforeEach(() => {
      sanitationStub = stub(ContractFns, "sanitationCheck");
      sanitationStub.resolves();
    });
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

    it("should fail if encoding fails", async () => {
      const chainId = txDataMock.sendingChainId;

      interfaceMock.encodeFunctionData.throws(new Error("fail"));
      await expect(prepare(chainId, prepareParamsMock, requestContext)).to.be.rejectedWith("fail");
    });
  });

  describe("#fulfill", () => {
    beforeEach(() => {
      sanitationStub = stub(ContractFns, "sanitationCheck");
      sanitationStub.resolves();
    });
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

    it("should fail if sanitation check fails", async () => {
      const chainId = txDataMock.sendingChainId;

      sanitationStub.rejects(new Error("fail"));
      await expect(fulfill(chainId, fulfillParamsMock, requestContext)).to.be.rejectedWith("fail");
    });

    it("should fail if encoding fails", async () => {
      const chainId = txDataMock.sendingChainId;

      interfaceMock.encodeFunctionData.throws(new Error("fail"));
      await expect(fulfill(chainId, fulfillParamsMock, requestContext)).to.be.rejectedWith("fail");
    });
  });

  describe("#cancel", () => {
    beforeEach(() => {
      sanitationStub = stub(ContractFns, "sanitationCheck");
      sanitationStub.resolves();
    });
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

    it("should fail if sanitation check fails", async () => {
      const chainId = txDataMock.sendingChainId;

      sanitationStub.rejects(new Error("fail"));
      await expect(fulfill(chainId, cancelParamsMock, requestContext)).to.be.rejectedWith("fail");
    });

    it("should fail if encoding fails", async () => {
      const chainId = txDataMock.sendingChainId;

      interfaceMock.encodeFunctionData.throws(new Error("fail"));
      await expect(fulfill(chainId, cancelParamsMock, requestContext)).to.be.rejectedWith("fail");
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

  describe("getRouterBalance", async () => {
    it("should work", async () => {
      txServiceMock.readTx.resolves("10");
      const ret = await ContractFns.getRouterBalance(1337, routerAddrMock, mkAddress());
      expect(ret.toNumber()).to.be.eq(10);
    });
  });
});
