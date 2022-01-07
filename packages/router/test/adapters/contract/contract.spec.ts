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
  sigMock,
} from "@connext/nxtp-utils";
import { Interface } from "ethers/lib/utils";
import { BigNumber, constants } from "ethers/lib/ethers";

import * as SharedFns from "../../../src/lib/helpers/shared";
import * as ContractFns from "../../../src/adapters/contract/contract";
import {
  prepareTransactionManager,
  fulfillTransactionManager,
  cancelTransactionManager,
  removeLiquidityTransactionManager,
  startContractListeners,
  addLiquidityForTransactionManager,
  migrateLiquidity,
} from "../../../src/adapters/contract/contract";
import { createStubInstance, SinonStubbedInstance, stub, SinonStub, restore, reset } from "sinon";
import { TransactionManagerInterface } from "@connext/nxtp-contracts/typechain/TransactionManager";
import { RouterInterface } from "@connext/nxtp-contracts/typechain/Router";
import { routerAddrMock, routerContractAddressMock } from "../../utils";
import { ctxMock, messagingMock, signerAddress, txServiceMock } from "../../globalTestHook";
import { SanitationCheckFailed } from "../../../src/lib/errors";
import { ERC20Interface } from "@connext/nxtp-contracts/typechain/ERC20";

const requestContext = createRequestContext("TEST");
const encodedDataMock = "0xabcde";

let interfaceMock: SinonStubbedInstance<Interface>;
let routerInterfaceMock: SinonStubbedInstance<Interface>;
let erc20InterfaceMock: SinonStubbedInstance<Interface>;

describe("Contract Adapter", () => {
  let sanitationStub: any;
  let isRouterWhitelistedStub: SinonStub;
  let isChainSupportedByGelatoStub: SinonStub;
  let gelatoSendStub: SinonStub;

  beforeEach(() => {
    interfaceMock = createStubInstance(Interface);
    interfaceMock.encodeFunctionData.returns(encodedDataMock);
    interfaceMock.decodeFunctionResult.returns([BigNumber.from(1000)]);
    stub(SharedFns, "getTxManagerInterface").returns(interfaceMock as unknown as TransactionManagerInterface);

    routerInterfaceMock = createStubInstance(Interface);
    routerInterfaceMock.encodeFunctionData.returns(encodedDataMock);
    routerInterfaceMock.decodeFunctionResult.returns([BigNumber.from(1000)]);
    stub(SharedFns, "getRouterContractInterface").returns(routerInterfaceMock as unknown as RouterInterface);

    erc20InterfaceMock = createStubInstance(Interface);
    erc20InterfaceMock.encodeFunctionData.returns(encodedDataMock);
    erc20InterfaceMock.decodeFunctionResult.returns([BigNumber.from(1000)]);
    stub(SharedFns, "getErc20ContractInterface").returns(erc20InterfaceMock as unknown as ERC20Interface);

    isRouterWhitelistedStub = stub(SharedFns, "isRouterWhitelisted");
    isChainSupportedByGelatoStub = stub(ContractFns, "isChainSupportedByGelato").returns(true);
    gelatoSendStub = stub(ContractFns, "gelatoSend");
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#startContractListeners", () => {
    it("should work", async () => {
      expect(() => startContractListeners()).to.not.throw();
    });
  });

  describe("#sanitationCheck", () => {
    it("should work for prepare", async () => {
      const digest = getInvariantTransactionDigest(txDataMock);
      interfaceMock.encodeFunctionData.returns(digest);

      txServiceMock.readTx.resolves(constants.HashZero);

      await SharedFns.sanitationCheck(txDataMock.sendingChainId, txDataMock, "prepare");
      expect(interfaceMock.encodeFunctionData).to.be.calledOnceWithExactly("variantTransactionData", [digest]);
    });

    it("should throw an error if the hash is not empty && function is prepare", async () => {
      const digest = getInvariantTransactionDigest(txDataMock);
      interfaceMock.encodeFunctionData.returns(digest);

      txServiceMock.readTx.resolves(getRandomBytes32());

      await expect(SharedFns.sanitationCheck(txDataMock.sendingChainId, txDataMock, "prepare")).to.be.rejectedWith(
        new SanitationCheckFailed("prepare", invariantDataMock.transactionId, invariantDataMock.sendingChainId).message,
      );
    });

    it("should work for fulfill", async () => {
      const invariantDigest = getInvariantTransactionDigest(txDataMock);
      const variantDigest = getVariantTransactionDigest(txDataMock);
      interfaceMock.encodeFunctionData.returns(invariantDigest);

      txServiceMock.readTx.resolves(variantDigest);

      await SharedFns.sanitationCheck(txDataMock.sendingChainId, txDataMock, "fulfill");
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

      await expect(SharedFns.sanitationCheck(txDataMock.sendingChainId, txDataMock, "fulfill")).to.be.rejectedWith(
        new SanitationCheckFailed("fulfill", txDataMock.transactionId, txDataMock.sendingChainId).message,
      );
    });

    it("should throw an error if its a fulfilled hash", async () => {
      const invariantDigest = getInvariantTransactionDigest(txDataMock);
      interfaceMock.encodeFunctionData.returns(invariantDigest);

      txServiceMock.readTx.resolves(getVariantTransactionDigest({ ...txDataMock, preparedBlockNumber: 0 }));

      await expect(SharedFns.sanitationCheck(txDataMock.sendingChainId, txDataMock, "fulfill")).to.be.rejectedWith(
        new SanitationCheckFailed("fulfill", txDataMock.transactionId, txDataMock.sendingChainId).message,
      );
    });
  });

  describe("#prepare", () => {
    beforeEach(() => {
      sanitationStub = stub(SharedFns, "sanitationCheck").resolves();
    });

    it("happy case: prepare", async () => {
      const chainId = txDataMock.sendingChainId;

      const res = await prepareTransactionManager(chainId, prepareParamsMock, requestContext);
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
      await expect(prepareTransactionManager(chainId, prepareParamsMock, requestContext)).to.be.rejectedWith("fail");
    });
  });

  describe("#fulfill", () => {
    beforeEach(() => {
      sanitationStub = stub(SharedFns, "sanitationCheck").resolves();
    });

    it("happy case: fulfill", async () => {
      const chainId = txDataMock.sendingChainId;

      const res = await fulfillTransactionManager(chainId, fulfillParamsMock, requestContext);
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
      await expect(fulfillTransactionManager(chainId, fulfillParamsMock, requestContext)).to.be.rejectedWith("fail");
    });

    it("should fail if encoding fails", async () => {
      const chainId = txDataMock.sendingChainId;

      interfaceMock.encodeFunctionData.throws(new Error("fail"));
      await expect(fulfillTransactionManager(chainId, fulfillParamsMock, requestContext)).to.be.rejectedWith("fail");
    });
  });

  describe("#cancel", () => {
    beforeEach(() => {
      sanitationStub = stub(SharedFns, "sanitationCheck").resolves();
    });

    it("happy case: cancel", async () => {
      const chainId = txDataMock.sendingChainId;

      const res = await cancelTransactionManager(chainId, cancelParamsMock, requestContext);
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
      await expect(cancelTransactionManager(chainId, cancelParamsMock, requestContext)).to.be.rejectedWith("fail");
    });

    it("should fail if encoding fails", async () => {
      const chainId = txDataMock.sendingChainId;

      interfaceMock.encodeFunctionData.throws(new Error("fail"));
      await expect(cancelTransactionManager(chainId, cancelParamsMock, requestContext)).to.be.rejectedWith("fail");
    });
  });

  describe("#removeLiquidity", () => {
    it("if no recipient, use wallet address", async () => {
      const chainId = txDataMock.sendingChainId;

      const amount = "1000";
      const assetId = mkAddress("0x6");

      const res = await removeLiquidityTransactionManager(chainId, amount, assetId, undefined, requestContext);
      expect(interfaceMock.encodeFunctionData).calledOnceWithExactly("removeLiquidity", [
        amount,
        assetId,
        signerAddress,
      ]);
      expect(res).to.deep.eq(txReceiptMock);
    });

    it("happy case: remove liquidity", async () => {
      const chainId = txDataMock.sendingChainId;

      const amount = "1000";
      const assetId = mkAddress("0x1");
      const recipientAddress = mkAddress("0x2");

      const res = await removeLiquidityTransactionManager(chainId, amount, assetId, recipientAddress, requestContext);
      expect(interfaceMock.encodeFunctionData).calledOnceWithExactly("removeLiquidity", [
        amount,
        assetId,
        recipientAddress,
      ]);
      expect(res).to.deep.eq(txReceiptMock);
    });
  });

  describe("#addLiquidityFor", () => {
    afterEach(() => {
      restore();
      reset();
    });

    it("should work for native asset", async () => {
      const chainId = txDataMock.sendingChainId;

      const amount = "1000";
      const assetId = constants.AddressZero;

      const res = await addLiquidityForTransactionManager(chainId, amount, assetId, undefined, requestContext);
      expect(interfaceMock.encodeFunctionData).calledOnceWithExactly("addLiquidityFor", [
        amount,
        assetId,
        signerAddress,
      ]);
      expect(res).to.deep.eq(txReceiptMock);
    });

    it("if insufficient allowance, approve", async () => {
      const chainId = txDataMock.sendingChainId;

      const amount = "1000";
      const assetId = mkAddress("0x6");
      const contractAddress = mkAddress("0xaaa");

      txServiceMock.readTx.resolves("0x00000000000000000000000000000000000000000000000000000000000003e0");
      const res = await addLiquidityForTransactionManager(chainId, amount, assetId, undefined, requestContext);
      expect(erc20InterfaceMock.encodeFunctionData.calledOnceWith("allowance", [signerAddress, contractAddress]));
      expect(erc20InterfaceMock.encodeFunctionData.calledOnceWith("approve", [contractAddress, constants.MaxUint256]));
      expect(interfaceMock.encodeFunctionData).calledWith("addLiquidityFor", [amount, assetId, signerAddress]);
      expect(res).to.deep.eq(txReceiptMock);
    });

    it("if no recipient, use wallet address", async () => {
      const chainId = txDataMock.sendingChainId;

      const amount = "1000";
      const assetId = mkAddress("0x6");

      txServiceMock.readTx.resolves("0x00000000000000000000000000000000000000000000000000000000000003e8");
      const res = await addLiquidityForTransactionManager(chainId, amount, assetId, undefined, requestContext);
      expect(interfaceMock.encodeFunctionData).calledWith("addLiquidityFor", [amount, assetId, signerAddress]);
      expect(res).to.deep.eq(txReceiptMock);
    });

    it("happy case: addLiquidityFor", async () => {
      const chainId = txDataMock.sendingChainId;

      const amount = "1000";
      const assetId = mkAddress("0x1");
      const routerAddress = mkAddress("0x2");

      txServiceMock.readTx.resolves("0x00000000000000000000000000000000000000000000000000000000000003e8");
      const res = await addLiquidityForTransactionManager(chainId, amount, assetId, routerAddress, requestContext);
      expect(interfaceMock.encodeFunctionData).calledWith("addLiquidityFor", [amount, assetId, routerAddress]);
      expect(res).to.deep.eq(txReceiptMock);
    });
  });

  describe("#migrateLiquidity", () => {
    it("happy case: migrate liquidity", async () => {
      const chainId = txDataMock.sendingChainId;

      const amount = "1000";
      const assetId = mkAddress("0x1");
      const newRouterAddress = mkAddress("0x2");

      txServiceMock.readTx.resolves("0x00000000000000000000000000000000000000000000000000000000000003e8");
      isRouterWhitelistedStub.resolves(true);
      const res = await migrateLiquidity(chainId, assetId, requestContext, newRouterAddress, amount);
      expect(interfaceMock.encodeFunctionData).calledWith("removeLiquidity", [amount, assetId, signerAddress]);
      expect(interfaceMock.encodeFunctionData).calledWith("addLiquidityFor", [amount, assetId, newRouterAddress]);
      expect(res.removeLiqudityTx).to.deep.eq(txReceiptMock);
      expect(res.addLiquidityForTx).to.deep.eq(txReceiptMock);
    });

    it("should read balance from contractReader if amount is undefined", async () => {
      const chainId = txDataMock.sendingChainId;

      const amount = "10001000000000000000000";
      const assetId = mkAddress("0x1");
      const newRouterAddress = mkAddress("0x2");

      isRouterWhitelistedStub.resolves(true);
      txServiceMock.readTx.resolves("0x00000000000000000000000000000000000000000000000000000000000003e8");
      const res = await migrateLiquidity(chainId, assetId, requestContext, newRouterAddress, undefined);
      expect(interfaceMock.encodeFunctionData).calledWith("removeLiquidity", [amount, assetId, signerAddress]);
      expect(interfaceMock.encodeFunctionData).calledWith("addLiquidityFor", [amount, assetId, newRouterAddress]);
      expect(res.removeLiqudityTx).to.deep.eq(txReceiptMock);
      expect(res.addLiquidityForTx).to.deep.eq(txReceiptMock);
    });

    it("should return undefined if amount is zero", async () => {
      const chainId = txDataMock.sendingChainId;

      const amount = "0";
      const assetId = mkAddress("0x1");
      const newRouterAddress = mkAddress("0x2");

      isRouterWhitelistedStub.resolves(true);
      txServiceMock.readTx.resolves("0x00000000000000000000000000000000000000000000000000000000000003e8");
      const res = await migrateLiquidity(chainId, assetId, requestContext, newRouterAddress, amount);
      expect(res).to.be.undefined;
    });

    it("should return undefined if router isn't whitelisted", async () => {
      const chainId = txDataMock.sendingChainId;

      const amount = "1000";
      const assetId = mkAddress("0x1");
      const newRouterAddress = mkAddress("0x22222");

      isRouterWhitelistedStub.resolves(false);
      txServiceMock.readTx.resolves("0x00000000000000000000000000000000000000000000000000000000000003e8");
      const res = await migrateLiquidity(chainId, assetId, requestContext, newRouterAddress, amount);
      expect(res).to.be.undefined;
    });
  });

  describe("getRouterBalance", async () => {
    it("should work", async () => {
      txServiceMock.readTx.resolves("10");
      const ret = await ContractFns.getRouterBalance(1337, routerAddrMock, mkAddress());
      expect(ret.toNumber()).to.be.eq(10);
    });
  });

  describe("prepareRouterContract", async () => {
    const chainIdMock = txDataMock.sendingChainId;
    const onchainTxMock = {
      to: routerContractAddressMock,
      data: encodedDataMock,
      value: constants.Zero,
      chainId: chainIdMock,
      from: ctxMock.wallet.address ?? mkAddress("0xa"),
    };
    const routerRelayerFeeAssetMock = mkAddress("0x1a2b3c");

    beforeEach(() => {
      sanitationStub = stub(SharedFns, "sanitationCheck").resolves();
      txServiceMock.sendTx.withArgs(onchainTxMock, requestContext).resolves(txReceiptMock);
    });

    it("should work (without relayers)", async () => {
      const res = await ContractFns.prepareRouterContract(
        chainIdMock,
        prepareParamsMock,
        routerContractAddressMock,
        sigMock,
        routerRelayerFeeAssetMock,
        "1",
        false,
        requestContext,
      );
      expect(routerInterfaceMock.encodeFunctionData).calledOnceWith("prepare", [
        {
          invariantData: prepareParamsMock.txData,
          amount: prepareParamsMock.amount,
          expiry: prepareParamsMock.expiry,
          encryptedCallData: prepareParamsMock.encryptedCallData,
          encodedBid: prepareParamsMock.encodedBid,
          bidSignature: prepareParamsMock.bidSignature,
          encodedMeta: "0x",
        },
        routerRelayerFeeAssetMock,
        "1",
        sigMock,
      ]);
      expect(res).to.deep.eq(txReceiptMock);
      // Preflight estimate gas check should *not* be called if we aren't using relayers.
      expect(txServiceMock.getGasEstimate.callCount).to.be.eq(0);
      // Should have used txservice to send the tx.
      expect(txServiceMock.sendTx).to.have.been.calledOnceWithExactly(onchainTxMock);
    });

    it("should work if useRelayer && chain is supported by gelato", async () => {
      isChainSupportedByGelatoStub.returns(true);
      gelatoSendStub.resolves({
        taskId: "task",
      });
      txServiceMock.getTransactionReceipt.withArgs(chainIdMock, txReceiptMock.transactionHash).resolves(txReceiptMock);

      setTimeout(() => {
        ContractFns.prepareEvt.post({ event: "prepare", args: prepareParamsMock, chainId: chainIdMock });
      }, 200);

      const res = await ContractFns.prepareRouterContract(
        chainIdMock,
        prepareParamsMock,
        routerContractAddressMock,
        sigMock,
        routerRelayerFeeAssetMock,
        "1",
        true,
        requestContext,
      );

      expect(res).to.deep.eq(txReceiptMock);

      // Preflight estimate gas check should be called if we use relayers.
      expect(txServiceMock.getGasEstimate).to.be.calledOnceWithExactly(onchainTxMock);
    });

    it("should work if useRelayer && chain is supported by gelato && gelato send failed", async () => {
      isChainSupportedByGelatoStub.returns(true);
      gelatoSendStub.resolves({
        taskId: undefined,
      });
      txServiceMock.getTransactionReceipt.withArgs(chainIdMock, txReceiptMock.transactionHash).resolves(txReceiptMock);

      setTimeout(() => {
        ContractFns.prepareEvt.post({ event: "prepare", args: prepareParamsMock, chainId: chainIdMock });
      }, 200);

      const res = await ContractFns.prepareRouterContract(
        chainIdMock,
        prepareParamsMock,
        routerContractAddressMock,
        sigMock,
        routerRelayerFeeAssetMock,
        "1",
        true,
        requestContext,
      );
      expect(messagingMock.publishMetaTxRequest.callCount).to.be.eq(1);
      expect(res).to.deep.eq(txReceiptMock);

      // Preflight estimate gas check should be called if we use relayers.
      expect(txServiceMock.getGasEstimate).to.be.calledOnceWithExactly(onchainTxMock);
    });

    it("should throw if txService estimateGas preflight check throws an error", async () => {
      const testError = new Error("test");
      txServiceMock.getGasEstimate.rejects(testError);
      await expect(
        ContractFns.prepareRouterContract(
          chainIdMock,
          prepareParamsMock,
          routerContractAddressMock,
          sigMock,
          routerRelayerFeeAssetMock,
          "1",
          true,
          requestContext,
        ),
      ).to.be.rejectedWith(testError);
    });
  });

  describe("#fulfillRouterContract", async () => {
    const chainIdMock = txDataMock.sendingChainId;
    const onchainTxMock = {
      to: routerContractAddressMock,
      data: encodedDataMock,
      value: constants.Zero,
      chainId: chainIdMock,
      from: ctxMock.wallet.address ?? mkAddress("0xa"),
    };
    const routerRelayerFeeAssetMock = mkAddress("0x1a2b3c");

    beforeEach(() => {
      sanitationStub = stub(SharedFns, "sanitationCheck").resolves();
    });

    it("should work (without relayers)", async () => {
      const res = await ContractFns.fulfillRouterContract(
        chainIdMock,
        fulfillParamsMock,
        routerContractAddressMock,
        sigMock,
        routerRelayerFeeAssetMock,
        "1",
        false,
        requestContext,
      );

      expect(routerInterfaceMock.encodeFunctionData).calledWith("fulfill", [
        {
          txData: fulfillParamsMock.txData,
          relayerFee: fulfillParamsMock.relayerFee,
          signature: fulfillParamsMock.signature,
          callData: fulfillParamsMock.callData,
          encodedMeta: "0x",
        },
        routerRelayerFeeAssetMock,
        "1",
        sigMock,
      ]);
      expect(res).to.deep.eq(txReceiptMock);
      // Preflight estimate gas check should *not* be called if we aren't using relayers.
      expect(txServiceMock.getGasEstimate.callCount).to.be.eq(0);
      // Should have used txservice to send the tx.
      expect(txServiceMock.sendTx).to.have.been.calledOnceWithExactly(onchainTxMock);
    });

    it("should work if useRelayer && chain is supported by gelato", async () => {
      isChainSupportedByGelatoStub.returns(true);
      gelatoSendStub.resolves({
        taskId: "task",
      });
      txServiceMock.getTransactionReceipt.withArgs(chainIdMock, txReceiptMock.transactionHash).resolves(txReceiptMock);

      setTimeout(() => {
        ContractFns.fulfillEvt.post({ event: "fulfill", args: fulfillParamsMock, chainId: chainIdMock });
      }, 200);

      const res = await ContractFns.fulfillRouterContract(
        chainIdMock,
        fulfillParamsMock,
        routerContractAddressMock,
        sigMock,
        routerRelayerFeeAssetMock,
        "1",
        true,
        requestContext,
      );
      expect(res).to.deep.eq(txReceiptMock);
      // Preflight estimate gas check should be called if we use relayers.
      expect(txServiceMock.getGasEstimate).to.be.calledOnceWithExactly(onchainTxMock);
    });

    it("should work if useRelayer && chain is supported by gelato && gelato send failed", async () => {
      isChainSupportedByGelatoStub.returns(true);
      gelatoSendStub.resolves({
        taskId: undefined,
      });
      txServiceMock.getTransactionReceipt.withArgs(chainIdMock, txReceiptMock.transactionHash).resolves(txReceiptMock);

      setTimeout(() => {
        ContractFns.fulfillEvt.post({ event: "fulfill", args: fulfillParamsMock, chainId: chainIdMock });
      }, 200);

      const res = await ContractFns.fulfillRouterContract(
        chainIdMock,
        fulfillParamsMock,
        routerContractAddressMock,
        sigMock,
        routerRelayerFeeAssetMock,
        "1",
        true,
        requestContext,
      );
      expect(messagingMock.publishMetaTxRequest.callCount).to.be.eq(1);
      expect(res).to.deep.eq(txReceiptMock);
      // Preflight estimate gas check should be called if we use relayers.
      expect(txServiceMock.getGasEstimate).to.be.calledOnceWithExactly(onchainTxMock);
    });

    it("should throw if txService estimateGas preflight check throws an error", async () => {
      const testError = new Error("test");
      txServiceMock.getGasEstimate.rejects(testError);
      await expect(
        ContractFns.fulfillRouterContract(
          chainIdMock,
          fulfillParamsMock,
          routerContractAddressMock,
          sigMock,
          routerRelayerFeeAssetMock,
          "1",
          true,
          requestContext,
        ),
      ).to.be.rejectedWith(testError);
    });
  });

  describe("cancelRouterContract", async () => {
    const chainIdMock = txDataMock.sendingChainId;
    const onchainTxMock = {
      to: routerContractAddressMock,
      data: encodedDataMock,
      value: constants.Zero,
      chainId: chainIdMock,
      from: ctxMock.wallet.address ?? mkAddress("0xa"),
    };
    const routerRelayerFeeAssetMock = mkAddress("0x1a2b3c");

    beforeEach(() => {
      sanitationStub = stub(SharedFns, "sanitationCheck").resolves();
    });

    it("should work (without relayers)", async () => {
      const res = await ContractFns.cancelRouterContract(
        chainIdMock,
        cancelParamsMock,
        routerContractAddressMock,
        sigMock,
        routerRelayerFeeAssetMock,
        "1",
        false,
        requestContext,
      );
      expect(routerInterfaceMock.encodeFunctionData).calledOnceWith("cancel", [
        {
          txData: cancelParamsMock.txData,
          signature: cancelParamsMock.signature,
          encodedMeta: "0x",
        },
        routerRelayerFeeAssetMock,
        "1",
        sigMock,
      ]);
      expect(res).to.deep.eq(txReceiptMock);
      // Preflight estimate gas check should *not* be called if we aren't using relayers.
      expect(txServiceMock.getGasEstimate.callCount).to.be.eq(0);
      // Should have used txservice to send the tx.
      expect(txServiceMock.sendTx).to.have.been.calledOnceWithExactly(onchainTxMock);
    });

    it("should work if useRelayer && chain is supported by gelato", async () => {
      isChainSupportedByGelatoStub.returns(true);
      gelatoSendStub.resolves({
        taskId: "task",
      });
      txServiceMock.getTransactionReceipt.withArgs(chainIdMock, txReceiptMock.transactionHash).resolves(txReceiptMock);

      setTimeout(() => {
        ContractFns.cancelEvt.post({ event: "cancel", args: cancelParamsMock, chainId: chainIdMock });
      }, 200);

      const res = await ContractFns.cancelRouterContract(
        chainIdMock,
        cancelParamsMock,
        routerContractAddressMock,
        sigMock,
        routerRelayerFeeAssetMock,
        "1",
        true,
        requestContext,
      );
      expect(res).to.deep.eq(txReceiptMock);
      // Preflight estimate gas check should be called if we use relayers.
      expect(txServiceMock.getGasEstimate).to.be.calledOnceWithExactly(onchainTxMock);
    });

    it("should work if useRelayer && chain is supported by gelato && gelato send failed", async () => {
      isChainSupportedByGelatoStub.returns(true);
      gelatoSendStub.resolves({
        taskId: undefined,
      });
      txServiceMock.getTransactionReceipt.withArgs(chainIdMock, txReceiptMock.transactionHash).resolves(txReceiptMock);

      setTimeout(() => {
        ContractFns.cancelEvt.post({ event: "fulfill", args: cancelParamsMock, chainId: chainIdMock });
      }, 200);

      const res = await ContractFns.cancelRouterContract(
        chainIdMock,
        cancelParamsMock,
        routerContractAddressMock,
        sigMock,
        routerRelayerFeeAssetMock,
        "1",
        true,
        requestContext,
      );
      expect(messagingMock.publishMetaTxRequest.callCount).to.be.eq(1);
      expect(res).to.deep.eq(txReceiptMock);
      // Preflight estimate gas check should be called if we use relayers.
      expect(txServiceMock.getGasEstimate).to.be.calledOnceWithExactly(onchainTxMock);
    });

    it("should throw if txService estimateGas preflight check throws an error", async () => {
      const testError = new Error("test");
      txServiceMock.getGasEstimate.rejects(testError);
      await expect(
        ContractFns.cancelRouterContract(
          chainIdMock,
          cancelParamsMock,
          routerContractAddressMock,
          sigMock,
          routerRelayerFeeAssetMock,
          "1",
          true,
          requestContext,
        ),
      ).to.be.rejectedWith(testError);
    });
  });
});
