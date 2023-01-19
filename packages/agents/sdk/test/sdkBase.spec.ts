import { reset, restore, stub, SinonStub, SinonStubbedInstance, createStubInstance } from "sinon";
import { encodeMultisendCall, expect, MultisendTransaction, WETHAbi } from "@connext/nxtp-utils";
import { getConnextInterface, ChainReader } from "@connext/nxtp-txservice";
import { constants, providers, BigNumber, utils } from "ethers";

import { mock } from "./mock";
import { NxtpSdkBase } from "../src/sdkBase";
import { getEnvConfig } from "../src/config";
import { CannotUnwrapOnDestination, SignerAddressMissing } from "../src/lib/errors";

import * as ConfigFns from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";
import { SdkXCallArgs } from "../src/interfaces";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

const mockConnextAddress = mockConfig.chains[mock.domain.A].deployments!.connext;
const mockMultisendAddress = mockConfig.chains[mock.domain.A].deployments!.multisend;
const mockUnwrapperAddress = mockConfig.chains[mock.domain.B].deployments!.unwrapper!;
const chainId = +mock.chain.A;

describe("SdkBase", () => {
  let nxtpSdkBase: NxtpSdkBase;
  let config: ConfigFns.NxtpSdkConfig;

  let chainreader: SinonStubbedInstance<ChainReader>;

  beforeEach(async () => {
    chainreader = createStubInstance(ChainReader);
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);

    stub(ConfigFns, "getConfig").resolves(config);
    stub(SharedFns, "getChainIdFromDomain").resolves(chainId);

    nxtpSdkBase = await NxtpSdkBase.create(mockConfig, undefined, mockChainData);
    (nxtpSdkBase as any).chainreader = chainreader;
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
      expect(nxtpSdkBase.bumpTransfer).to.be.a("function");
      expect(nxtpSdkBase.estimateRelayerFee).to.be.a("function");
    });
  });

  describe("#xcall", () => {
    let getConversionRateStub: SinonStub;
    let getDecimalsForAssetStub: SinonStub;
    let getHardcodedGasLimitsStub: SinonStub;
    let relayerFee = BigNumber.from("1");

    const mockXCallArgs = mock.entity.xcallArgs();
    const standardXCallData: string = getConnextInterface().encodeFunctionData("xcall", [
      mockXCallArgs.destination,
      mockXCallArgs.to,
      mockXCallArgs.asset,
      mockXCallArgs.delegate,
      mockXCallArgs.amount,
      mockXCallArgs.slippage,
      mockXCallArgs.callData,
    ]);
    const standardXCallIntoLocalData: string = getConnextInterface().encodeFunctionData("xcallIntoLocal", [
      mockXCallArgs.destination,
      mockXCallArgs.to,
      mockXCallArgs.asset,
      mockXCallArgs.delegate,
      mockXCallArgs.amount,
      mockXCallArgs.slippage,
      mockXCallArgs.callData,
    ]);

    const mockXCallRequest: providers.TransactionRequest = {
      to: mockConnextAddress,
      data: standardXCallData,
      from: mock.config().signerAddress,
      value: relayerFee,
      chainId,
    };
    const mockXCallIntoLocalRequest: providers.TransactionRequest = {
      to: mockConnextAddress,
      data: standardXCallIntoLocalData,
      from: mock.config().signerAddress,
      value: relayerFee,
      chainId,
    };

    const origin = mock.entity.callParams().originDomain;
    const sdkXCallArgs: SdkXCallArgs = {
      ...mock.entity.xcallArgs(),
      origin,
      relayerFee: relayerFee.toString(),
      receiveLocal: false,
      wrapNativeOnOrigin: false,
      unwrapNativeOnDestination: false,
    };

    const wrapNativeOnOriginMultisendTxs = (asset: string, amount: BigNumber) => {
      const weth = new utils.Interface(WETHAbi);
      const txs: MultisendTransaction[] = [
        {
          to: asset,
          data: weth.encodeFunctionData("deposit"),
          value: amount,
        },
        {
          to: asset,
          data: weth.encodeFunctionData("approve", [mockConnextAddress, amount]),
        },
        {
          to: mockConnextAddress,
          data: standardXCallData,
          value: relayerFee,
        },
      ];
      return txs;
    };

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
      const res = await nxtpSdkBase.xcall(sdkXCallArgs);
      expect(res).to.be.deep.eq(mockXCallRequest);
    });

    it("happy: should use xcallIntoLocal if receiveLocal is used", async () => {
      const res = await nxtpSdkBase.xcall({
        ...sdkXCallArgs,
        receiveLocal: true,
      });
      expect(res).to.be.deep.eq(mockXCallIntoLocalRequest);
    });

    it("happy: if wrapNativeOnOrigin specified, should make a multisend tx for wrapping eth before xcall", async () => {
      const { asset, amount: _amount } = sdkXCallArgs;
      const amount = BigNumber.from(_amount);

      const expectedTxRequest: providers.TransactionRequest = {
        to: mockMultisendAddress,
        data: encodeMultisendCall(wrapNativeOnOriginMultisendTxs(asset, amount)),
        from: mock.config().signerAddress,
        // Important: must send the full amount in ETH for transfer! Not just relayerFee.
        value: relayerFee.add(amount),
        chainId,
      };

      const res = await nxtpSdkBase.xcall({
        ...sdkXCallArgs,
        wrapNativeOnOrigin: true,
      });
      expect(res).to.be.deep.eq(expectedTxRequest);
    });

    it("happy: wrapNativeOnOrigin && receiveLocal works", async () => {
      const { asset, amount: _amount } = sdkXCallArgs;
      const amount = BigNumber.from(_amount);
      const txs = wrapNativeOnOriginMultisendTxs(asset, amount);
      txs[2].data = standardXCallIntoLocalData;

      const expectedTxRequest: providers.TransactionRequest = {
        to: mockMultisendAddress,
        data: encodeMultisendCall(txs),
        from: mock.config().signerAddress,
        // Important: must send the full amount in ETH for transfer! Not just relayerFee.
        value: relayerFee.add(amount),
        chainId,
      };

      const res = await nxtpSdkBase.xcall({
        ...sdkXCallArgs,
        receiveLocal: true,
        wrapNativeOnOrigin: true,
      });
      expect(res).to.be.deep.eq(expectedTxRequest);
    });

    it("happy: handle unwrapNativeOnDestination", async () => {
      // Format the xcall for the unwrapNativeOnDestination case.
      const xcallData = getConnextInterface().encodeFunctionData("xcall", [
        mockXCallArgs.destination,
        // The `to` argument becomes the Unwrapper contract address.
        mockUnwrapperAddress,
        mockXCallArgs.asset,
        mockXCallArgs.delegate,
        mockXCallArgs.amount,
        mockXCallArgs.slippage,
        // For the Unwrapper contract, we provide the original recipient as argument.
        utils.defaultAbiCoder.encode(["address"], [sdkXCallArgs.to]),
      ]);

      const expectedTxRequest: providers.TransactionRequest = {
        to: mockConnextAddress,
        data: xcallData,
        from: mock.config().signerAddress,
        value: relayerFee,
        chainId,
      };

      const res = await nxtpSdkBase.xcall({
        ...sdkXCallArgs,
        unwrapNativeOnDestination: true,
      });
      expect(res).to.be.deep.eq(expectedTxRequest);
    });

    it("happy: handle both wrapNativeOnOrigin && unwrapNativeOnDestination", async () => {
      const { asset, amount: _amount } = sdkXCallArgs;
      const amount = BigNumber.from(_amount);
      const txs = wrapNativeOnOriginMultisendTxs(asset, amount);

      // Format the xcall for the unwrapNativeOnDestination case.
      const xcallData = getConnextInterface().encodeFunctionData("xcall", [
        mockXCallArgs.destination,
        // The `to` argument becomes the Unwrapper contract address.
        mockUnwrapperAddress,
        mockXCallArgs.asset,
        mockXCallArgs.delegate,
        mockXCallArgs.amount,
        mockXCallArgs.slippage,
        // For the Unwrapper contract, we provide the original recipient as argument.
        utils.defaultAbiCoder.encode(["address"], [sdkXCallArgs.to]),
      ]);
      txs[2].data = xcallData;

      const expectedTxRequest: providers.TransactionRequest = {
        to: mockMultisendAddress,
        data: encodeMultisendCall(txs),
        from: mock.config().signerAddress,
        // Important: must send the full amount in ETH for transfer! Not just relayerFee.
        value: relayerFee.add(amount),
        chainId,
      };

      const res = await nxtpSdkBase.xcall({
        ...sdkXCallArgs,
        wrapNativeOnOrigin: true,
        unwrapNativeOnDestination: true,
      });
      expect(res).to.be.deep.eq(expectedTxRequest);
    });

    it("throws CannotUnwrapOnDestination if receiveLocal && unwrapNativeOnDestination", async () => {
      await expect(
        nxtpSdkBase.xcall({
          ...sdkXCallArgs,
          unwrapNativeOnDestination: true,
          callData: "0xabcdef",
        }),
      ).to.be.rejectedWith(CannotUnwrapOnDestination);
    });

    it("throws CannotUnwrapOnDestination if callData specified && unwrapNativeOnDestination", async () => {
      await expect(
        nxtpSdkBase.xcall({
          ...sdkXCallArgs,
          unwrapNativeOnDestination: true,
          receiveLocal: true,
        }),
      ).to.be.rejectedWith(CannotUnwrapOnDestination);
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
        to: mockConnextAddress,
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
        to: mockConnextAddress,
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
