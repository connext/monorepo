import { createStubInstance, reset, restore, SinonStubbedInstance, stub, SinonStub } from "sinon";
import { expect, mkAddress } from "@connext/nxtp-utils";
import { ChainReader, getErc20Interface, getConnextInterface } from "@connext/nxtp-txservice";
import { constants, providers, BigNumber, utils } from "ethers";
import { mock } from "./mock";
import { NxtpSdkBase } from "../src/sdkBase";
import { getEnvConfig } from "../src/config";
import { ChainDataUndefined, SignerAddressMissing } from "../src/lib/errors";

import * as ConfigFns from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

const mockConnextAddresss = mockConfig.chains[mock.domain.A].deployments!.connext;
const mockAssetId = mock.asset.A.address;

const chainId = 1337;
describe("SdkBase", () => {
  let nxtpSdkBase: NxtpSdkBase;
  let config;

  let chainReader: SinonStubbedInstance<ChainReader>;

  beforeEach(async () => {
    chainReader = createStubInstance(ChainReader);
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);
    stub(ConfigFns, "getConfig").resolves(config);

    nxtpSdkBase = await NxtpSdkBase.create(mockConfig, undefined, mockChainData);

    (nxtpSdkBase as any).chainReader = chainReader;

    stub(SharedFns, "getChainIdFromDomain").resolves(chainId);
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

      expect(nxtpSdkBase.approveIfNeeded).to.be.a("function");
      expect(nxtpSdkBase.xcall).to.be.a("function");
      expect(nxtpSdkBase.bumpTransfer).to.be.a("function");
      expect(nxtpSdkBase.changeSignerAddress).to.be.a("function");
    });

    it("should error if chaindata is undefined", async () => {
      stub(SharedFns, "getChainData").resolves(undefined);
      await expect(NxtpSdkBase.create(config)).to.be.rejectedWith(ChainDataUndefined);
    });
  });

  describe("#approveIfNeeded", () => {
    it("should error if signerAddress is undefined", async () => {
      (nxtpSdkBase as any).config.signerAddress = undefined;

      await expect(nxtpSdkBase.approveIfNeeded(mock.domain.A, mock.asset.A.address, "1")).to.be.rejectedWith(
        SignerAddressMissing,
      );
    });

    it("happy: should work for Native", async () => {
      const res = await nxtpSdkBase.approveIfNeeded(mock.domain.A, constants.AddressZero, "1");
      expect(res).to.be.undefined;
    });

    it("happy: should work for ERC20 when allowance sufficient", async () => {
      chainReader.readTx.resolves("0x0000000000000000000000000000000000000000000000000000000000000001");

      const res = await nxtpSdkBase.approveIfNeeded(mock.domain.A, mock.asset.A.address, "1");
      expect(res).to.be.undefined;
    });

    it("happy: should work for ERC20 when allowance in-sufficient", async () => {
      chainReader.readTx.resolves("0x0000000000000000000000000000000000000000000000000000000000000000");
      const data = getErc20Interface().encodeFunctionData("approve", [mockConnextAddresss, constants.MaxUint256]);

      const mockApproveTxRequest: providers.TransactionRequest = {
        to: mockAssetId,
        data,
        from: mock.config().signerAddress,
        value: 0,
        chainId,
      };

      const res = await nxtpSdkBase.approveIfNeeded(mock.domain.A, mockAssetId, "1");
      expect(res).to.be.deep.eq(mockApproveTxRequest);
    });
  });

  describe("#xCall", () => {
    let getConversionRateStub: SinonStub;
    let getDecimalsForAssetStub: SinonStub;
    let getHardcodedGasLimitsStub: SinonStub;
    beforeEach(() => {
      getConversionRateStub = stub(SharedFns, "getConversionRate");
      getDecimalsForAssetStub = stub(SharedFns, "getDecimalsForAsset");
      getHardcodedGasLimitsStub = stub(SharedFns, "getHardcodedGasLimits");
    });
    afterEach(() => {
      restore();
      reset();
    });

    it("should error if signerAddress is undefined", async () => {
      (nxtpSdkBase as any).config.signerAddress = undefined;

      await expect(nxtpSdkBase.xcall(mock.entity.xcallArgs())).to.be.rejectedWith(SignerAddressMissing);
    });

    it("happy: should work if ERC20", async () => {
      const mockXcallArgs = mock.entity.xcallArgs();
      const data = getConnextInterface().encodeFunctionData("xcall", [mockXcallArgs]);

      const mockXCallRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
        from: mock.config().signerAddress,
        value: BigNumber.from(mockXcallArgs.params.relayerFee),
        chainId,
      };

      const res = await nxtpSdkBase.xcall(mockXcallArgs);
      expect(res).to.be.deep.eq(mockXCallRequest);
    });

    it("happy: should calculate the relayerFee if args.relayerFee is zero", async () => {
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

      const mockXcallArgs = mock.entity.xcallArgs({
        params: { ...mock.entity.callParams(), relayerFee: "0" },
      });

      const callArgForEncoded = mock.entity.xcallArgs({
        params: { ...mock.entity.callParams(), relayerFee: "50000" },
      });

      const data = getConnextInterface().encodeFunctionData("xcall", [callArgForEncoded]);

      const mockXCallRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
        from: mock.config().signerAddress,
        value: BigNumber.from("50000"),
        chainId,
      };

      const res = await nxtpSdkBase.xcall(mockXcallArgs);
      expect(res).to.be.deep.eq(mockXCallRequest);
    });
  });

  describe("#bumpTransfer", () => {
    const mockXTransfer = mock.entity.xtransfer();

    const mockBumpTransferParams = {
      domain: mockXTransfer.xparams.originDomain,
      transferId: mockXTransfer.transferId,
      relayerFee: "1",
    };

    it("should error if signerAddress is undefined", async () => {
      (nxtpSdkBase as any).config.signerAddress = undefined;

      await expect(nxtpSdkBase.bumpTransfer(mockBumpTransferParams)).to.be.rejectedWith(SignerAddressMissing);
    });

    it("happy: should work", async () => {
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

  describe("#changeSignerAddress", () => {
    it("happy: should work", async () => {
      const mockSignerAddress = mkAddress("0xabcdef456");
      await nxtpSdkBase.changeSignerAddress(mockSignerAddress);
      expect(nxtpSdkBase.config.signerAddress).to.be.eq(mockSignerAddress);
    });
  });
});
