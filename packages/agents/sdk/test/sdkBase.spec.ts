import { reset, restore, stub, SinonStub } from "sinon";
import { expect } from "@connext/nxtp-utils";
import { getConnextInterface } from "@connext/nxtp-txservice";
import { constants, providers, BigNumber, utils } from "ethers";
import { mock } from "./mock";
import { NxtpSdkBase } from "../src/sdkBase";
import { getEnvConfig } from "../src/config";
import { SignerAddressMissing } from "../src/lib/errors";

import * as ConfigFns from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

const mockConnextAddresss = mockConfig.chains[mock.domain.A].deployments!.connext;
const mockMultisendAddress = mockConfig.chains[mock.domain.A].deployments!.multisend;
const chainId = 1337;

describe("SdkBase", () => {
  let nxtpSdkBase: NxtpSdkBase;
  let config: ConfigFns.NxtpSdkConfig;

  beforeEach(async () => {
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);

    stub(ConfigFns, "getConfig").resolves(config);
    stub(SharedFns, "getChainIdFromDomain").resolves(chainId);

    nxtpSdkBase = await NxtpSdkBase.create(mockConfig, undefined, mockChainData);
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#create", () => {
    it("happy: should work", async () => {
      expect(nxtpSdkBase).to.not.be.undefined;
      expect(nxtpSdkBase.config).to.not.be.null;
      expect(nxtpSdkBase.chainData).to.not.be.null;

      expect(nxtpSdkBase.xcall).to.be.a("function");
      expect(nxtpSdkBase.wrapEthAndXCall).to.be.a("function");
      expect(nxtpSdkBase.bumpTransfer).to.be.a("function");
      expect(nxtpSdkBase.estimateRelayerFee).to.be.a("function");
    });
  });

  describe("#xcall", () => {
    let getConversionRateStub: SinonStub;
    let getDecimalsForAssetStub: SinonStub;
    let getHardcodedGasLimitsStub: SinonStub;
    let relayerFee = BigNumber.from("1");

    beforeEach(() => {
      getConversionRateStub = stub(SharedFns, "getConversionRate");
      getDecimalsForAssetStub = stub(SharedFns, "getDecimalsForAsset");
      getHardcodedGasLimitsStub = stub(SharedFns, "getHardcodedGasLimits");
    });

    afterEach(() => {
      restore();
      reset();
    });

    it("happy: should work if ERC20", async () => {
      const mockXcallArgs = mock.entity.xcallArgs();
      const data = getConnextInterface().encodeFunctionData("xcall", [
        mockXcallArgs.destination,
        mockXcallArgs.to,
        mockXcallArgs.asset,
        mockXcallArgs.delegate,
        mockXcallArgs.amount,
        mockXcallArgs.slippage,
        mockXcallArgs.callData,
      ]);
      const mockXCallRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
        from: mock.config().signerAddress,
        value: relayerFee,
        chainId,
      };

      const origin = mock.entity.callParams().originDomain;
      const sdkXcallArgs = {
        ...mock.entity.xcallArgs(),
        origin,
        relayerFee: relayerFee.toString(),
      };

      const res = await nxtpSdkBase.xcall(sdkXcallArgs);
      expect(res).to.be.deep.eq(mockXCallRequest);
    });

    it("happy: should use xCallIntoLocal if receiveLocal is used", async () => {
      const mockXcallArgs = mock.entity.xcallArgs();
      const data = getConnextInterface().encodeFunctionData("xcallIntoLocal", [
        mockXcallArgs.destination,
        mockXcallArgs.to,
        mockXcallArgs.asset,
        mockXcallArgs.delegate,
        mockXcallArgs.amount,
        mockXcallArgs.slippage,
        mockXcallArgs.callData,
      ]);
      const mockXCallRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
        from: mock.config().signerAddress,
        value: relayerFee,
        chainId,
      };

      const origin = mock.entity.callParams().originDomain;
      const sdkXcallArgs = {
        ...mock.entity.xcallArgs(),
        origin,
        relayerFee: relayerFee.toString(),
        receiveLocal: true,
      };

      const res = await nxtpSdkBase.xcall(sdkXcallArgs);
      expect(res).to.be.deep.eq(mockXCallRequest);
    });

    // TODO: Add relayer fee calculation at xcall
    it.skip("happy: should calculate the relayerFee if args.relayerFee is zero", async () => {
      getConversionRateStub.resolves(1);
      getDecimalsForAssetStub.resolves(18);
      getHardcodedGasLimitsStub.resolves({
        xcall: "10000",
        xcallL1: "10000",
        execute: "20000",
        executeL1: "20000",
        gasPriceFactor: "10000",
      });

      stub(nxtpSdkBase, "estimateRelayerFee").resolves(BigNumber.from("50000"));
      const mockXcallArgs = mock.entity.xcallArgs();
      const data = getConnextInterface().encodeFunctionData("xcall", [
        mockXcallArgs.destination,
        mockXcallArgs.to,
        mockXcallArgs.asset,
        mockXcallArgs.delegate,
        mockXcallArgs.amount,
        mockXcallArgs.slippage,
        mockXcallArgs.callData,
      ]);

      const mockXCallRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
        from: mock.config().signerAddress,
        value: BigNumber.from("50000"),
        chainId,
      };

      const origin = mock.entity.callParams().originDomain;
      const sdkXcallArgs = {
        ...mock.entity.xcallArgs(),
        origin,
      };

      const res = await nxtpSdkBase.xcall(sdkXcallArgs);
      expect(res).to.be.deep.eq(mockXCallRequest);
    });

    it("should error if signerAddress is undefined", async () => {
      nxtpSdkBase.config.signerAddress = undefined;
      const origin = mock.entity.callParams().originDomain;
      const sdkXcallArgs = {
        ...mock.entity.xcallArgs(),
        origin,
      };

      await expect(nxtpSdkBase.xcall(sdkXcallArgs)).to.be.rejectedWith(SignerAddressMissing);
    });
  });

  describe("#wrapEthAndXCall", () => {
    let getConversionRateStub: SinonStub;
    let getDecimalsForAssetStub: SinonStub;
    let getHardcodedGasLimitsStub: SinonStub;
    let relayerFee = BigNumber.from("1");

    beforeEach(() => {
      getConversionRateStub = stub(SharedFns, "getConversionRate");
      getDecimalsForAssetStub = stub(SharedFns, "getDecimalsForAsset");
      getHardcodedGasLimitsStub = stub(SharedFns, "getHardcodedGasLimits");
    });

    afterEach(() => {
      restore();
      reset();
    });

    it("happy: should work for wrap", async () => {
      nxtpSdkBase.config.signerAddress = mockConfig.signerAddress;
      const mockXcallArgs = mock.entity.xcallArgs();
      const mockEncodedData =
        "0x8d80ff0a000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000002c400beefbeefbeef00000000000000000000000000000000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000000000000000004d0e30db000beefbeefbeef0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000242e1a7d4d0000000000000000000000000000000000000000000000000de0b6b3a764000000beefbeefbeef000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044095ea7b3000000000000000000000000abcdef12300000000000000000000000000000000000000000000000000000000000000000000000000000000de0b6b3a764000000abcdef1230000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000001048aac16ba000000000000000000000000000000000000000000000000000000000000341a000000000000000000000000aaa0000000000000000000000000000000000000000000000000000000000000beefbeefbeef000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000003e800000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

      const mockWrapEthAndXCallRequest: providers.TransactionRequest = {
        to: mockMultisendAddress,
        data: mockEncodedData,
        from: mock.config().signerAddress,
        value: BigNumber.from(mockXcallArgs.amount).add(relayerFee),
        chainId,
      };

      const origin = mock.entity.callParams().originDomain;
      const sdkXcallArgs = {
        ...mock.entity.xcallArgs(),
        relayerFee: relayerFee.toString(),
        origin,
      };

      const res = await nxtpSdkBase.wrapEthAndXCall(sdkXcallArgs);
      expect(res).to.be.deep.eq(mockWrapEthAndXCallRequest);
    });

    it("should error if signerAddress is undefined", async () => {
      nxtpSdkBase.config.signerAddress = undefined;
      const origin = mock.entity.callParams().originDomain;
      const sdkXcallArgs = {
        ...mock.entity.xcallArgs(),
        origin,
      };

      await expect(nxtpSdkBase.wrapEthAndXCall(sdkXcallArgs)).to.be.rejectedWith(SignerAddressMissing);
    });
  });

  describe("#bumpTransfer", () => {
    const mockXTransfer = mock.entity.xtransfer();

    const mockBumpTransferParams = {
      domainId: mockXTransfer.xparams.originDomain,
      transferId: mockXTransfer.transferId,
      relayerFee: "1",
    };

    it("should error if signerAddress is undefined", async () => {
      (nxtpSdkBase as any).config.signerAddress = undefined;

      await expect(nxtpSdkBase.bumpTransfer(mockBumpTransferParams)).to.be.rejectedWith(SignerAddressMissing);
    });

    it("happy: should work", async () => {
      nxtpSdkBase.config.signerAddress = mockConfig.signerAddress;
      const data = getConnextInterface().encodeFunctionData("bumpTransfer", [mockBumpTransferParams.transferId]);

      const mockBumpTransferTxRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
        from: mock.config().signerAddress,
        value: BigNumber.from(mockBumpTransferParams.relayerFee),
        chainId,
      };

      const res = await nxtpSdkBase.bumpTransfer(mockBumpTransferParams);
      expect(res).to.be.deep.eq(mockBumpTransferTxRequest);
    });
  });

  describe("estimateRelayerFee", () => {
    let getGelatoEstimatedFeeStub: SinonStub;
    let getConversionRateStub: SinonStub;
    let getDecimalsForAssetStub: SinonStub;
    let getHardcodedGasLimitsStub: SinonStub;
    beforeEach(() => {
      getGelatoEstimatedFeeStub = stub(SharedFns, "getGelatoEstimatedFee");
      getConversionRateStub = stub(SharedFns, "getConversionRate");
      getDecimalsForAssetStub = stub(SharedFns, "getDecimalsForAsset");
      getHardcodedGasLimitsStub = stub(SharedFns, "getHardcodedGasLimits");
    });
    afterEach(() => {
      restore();
      reset();
    });
    it("should return 0 if origin/destination native asset price is 0", async () => {
      getConversionRateStub.resolves(0);
      getHardcodedGasLimitsStub.resolves({
        xcall: "10000",
        xcallL1: "10000",
        execute: "20000",
        executeL1: "20000",
        gasPriceFactor: "10000",
      });
      getGelatoEstimatedFeeStub.resolves(BigNumber.from("50000"));
      const relayerFee = await nxtpSdkBase.estimateRelayerFee({
        originDomain: mock.domain.A,
        destinationDomain: mock.domain.B,
      });
      expect(getConversionRateStub.callCount).to.be.eq(2);
      expect(getHardcodedGasLimitsStub.callCount).to.be.eq(1);
      expect(getGelatoEstimatedFeeStub.callCount).to.be.eq(1);
      expect(getGelatoEstimatedFeeStub.getCall(0).args).to.be.deep.eq([chainId, constants.AddressZero, 20000, false]);
      expect(relayerFee.toString()).to.be.eq("0");
    });
    it("should add callData gasAmount", async () => {
      getConversionRateStub.resolves(1);
      getDecimalsForAssetStub.resolves(18);
      getHardcodedGasLimitsStub.resolves({
        xcall: "10000",
        xcallL1: "10000",
        execute: "20000",
        executeL1: "20000",
        gasPriceFactor: "10000",
      });
      getGelatoEstimatedFeeStub.resolves(BigNumber.from("50000"));
      const callDataGasAmount = 10000;

      const res = await nxtpSdkBase.estimateRelayerFee({
        originDomain: mock.domain.A,
        destinationDomain: mock.domain.B,
        callDataGasAmount,
      });
      expect(getConversionRateStub.callCount).to.be.eq(2);
      expect(getHardcodedGasLimitsStub.callCount).to.be.eq(1);
      expect(getGelatoEstimatedFeeStub.callCount).to.be.eq(1);
      expect(getGelatoEstimatedFeeStub.getCall(0).args).to.be.deep.eq([chainId, constants.AddressZero, 30000, false]);
      expect(res.toString()).to.be.eq("60000");
    });
    it("should properly handle the difference in decimals", async () => {
      getConversionRateStub.onFirstCall().resolves(1);
      getConversionRateStub.onSecondCall().resolves(1);
      getDecimalsForAssetStub.onFirstCall().resolves(6);
      getDecimalsForAssetStub.onSecondCall().resolves(18);
      getHardcodedGasLimitsStub.resolves({
        xcall: "10000",
        xcallL1: "10000",
        execute: "20000",
        executeL1: "20000",
        gasPriceFactor: "10000",
      });
      getGelatoEstimatedFeeStub.resolves(utils.parseUnits("5", 16));

      const res = await nxtpSdkBase.estimateRelayerFee({
        originDomain: mock.domain.A,
        destinationDomain: mock.domain.B,
      });
      expect(getConversionRateStub.callCount).to.be.eq(2);
      expect(getHardcodedGasLimitsStub.callCount).to.be.eq(1);
      expect(getGelatoEstimatedFeeStub.callCount).to.be.eq(1);
      expect(getGelatoEstimatedFeeStub.getCall(0).args).to.be.deep.eq([chainId, constants.AddressZero, 20000, false]);

      expect(res.toString()).to.be.eq(utils.parseUnits("6", 4).toString());
    });

    it("should work with different prices", async () => {
      const mockToken1Price = 1;
      const mockToken2Price = 2;
      getConversionRateStub.onFirstCall().resolves(mockToken1Price);
      getConversionRateStub.onSecondCall().resolves(mockToken2Price);
      getDecimalsForAssetStub.resolves(18);
      getHardcodedGasLimitsStub.resolves({
        xcall: "10000",
        xcallL1: "10000",
        execute: "20000",
        executeL1: "20000",
        gasPriceFactor: "10000",
      });
      const mockPrice = BigNumber.from("50000");
      getGelatoEstimatedFeeStub.resolves(mockPrice);

      const res = await nxtpSdkBase.estimateRelayerFee({
        originDomain: mock.domain.A,
        destinationDomain: mock.domain.B,
      });
      expect(getConversionRateStub.callCount).to.be.eq(2);
      expect(getHardcodedGasLimitsStub.callCount).to.be.eq(1);
      expect(getGelatoEstimatedFeeStub.callCount).to.be.eq(1);
      expect(getGelatoEstimatedFeeStub.getCall(0).args).to.be.deep.eq([chainId, constants.AddressZero, 20000, false]);

      const impactedMockPrice1 = Math.floor(mockToken1Price * 1000);
      const impactedMockPrice2 = Math.floor(mockToken2Price * 1000);

      const expectedPrice = mockPrice
        .add(mockPrice.mul(SharedFns.relayerBufferPercentage).div(100))
        .mul(impactedMockPrice2)
        .div(impactedMockPrice1);
      expect(res.toString()).to.be.eq(expectedPrice.toString());
    });

    it("should work with float-point prices", async () => {
      const mockToken1Price = 1.50035869;
      const mockToken2Price = 3.0001568;
      getConversionRateStub.onFirstCall().resolves(mockToken1Price);
      getConversionRateStub.onSecondCall().resolves(mockToken2Price);
      getDecimalsForAssetStub.resolves(18);
      getHardcodedGasLimitsStub.resolves({
        xcall: "10000",
        xcallL1: "10000",
        execute: "20000",
        executeL1: "20000",
        gasPriceFactor: "10000",
      });
      const mockPrice = BigNumber.from("50000");
      getGelatoEstimatedFeeStub.resolves(mockPrice);

      const res = await nxtpSdkBase.estimateRelayerFee({
        originDomain: mock.domain.A,
        destinationDomain: mock.domain.B,
      });
      expect(getConversionRateStub.callCount).to.be.eq(2);
      expect(getHardcodedGasLimitsStub.callCount).to.be.eq(1);
      expect(getGelatoEstimatedFeeStub.callCount).to.be.eq(1);
      expect(getGelatoEstimatedFeeStub.getCall(0).args).to.be.deep.eq([chainId, constants.AddressZero, 20000, false]);

      const impactedMockPrice1 = Math.floor(mockToken1Price * 1000);
      const impactedMockPrice2 = Math.floor(mockToken2Price * 1000);
      const expectedPrice = mockPrice
        .add(mockPrice.mul(SharedFns.relayerBufferPercentage).div(100))
        .mul(impactedMockPrice2)
        .div(impactedMockPrice1);
      expect(res.toString()).to.be.eq(expectedPrice.toString());
    });
  });
});
