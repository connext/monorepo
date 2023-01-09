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
        "0x8d80ff0a0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000024b00beefbeefbeef00000000000000000000000000000000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000000000000000004d0e30db000beefbeefbeef000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044095ea7b3000000000000000000000000abcdef12300000000000000000000000000000000000000000000000000000000000000000000000000000000de0b6b3a764000000abcdef1230000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000001048aac16ba000000000000000000000000000000000000000000000000000000000000341a000000000000000000000000aaa0000000000000000000000000000000000000000000000000000000000000beefbeefbeef000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000003e800000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

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
    let calculateRelayerFeeStub: SinonStub;
    beforeEach(() => {
      calculateRelayerFeeStub = stub(SharedFns, "calculateRelayerFee");
    });
    afterEach(() => {
      restore();
      reset();
    });
    it("should return 0 if origin/destination native asset price is 0", async () => {
      calculateRelayerFeeStub.resolves(BigNumber.from(100));
      const relayerFee = await nxtpSdkBase.estimateRelayerFee({
        originDomain: mock.domain.A,
        destinationDomain: mock.domain.B,
      });
      expect(calculateRelayerFeeStub.callCount).to.be.eq(1);
      expect(relayerFee.toString()).to.be.eq("100");
    });
  });
});
