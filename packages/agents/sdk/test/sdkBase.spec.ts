import { reset, restore, stub, SinonStub, createStubInstance, SinonStubbedInstance } from "sinon";
import {
  encodeMultisendCall,
  expect,
  MultisendTransaction,
  WETHAbi,
  mkAddress,
  DEFAULT_ROUTER_FEE,
} from "@connext/nxtp-utils";
import { getConnextInterface, ChainReader } from "@connext/nxtp-txservice";
import { providers, BigNumber, utils, constants } from "ethers";
import { mock } from "./mock";
import { SdkBase } from "../src/sdkBase";
import { SdkUtils } from "../src/sdkUtils";
import { SdkPool } from "../src/sdkPool";
import { PoolAsset, Pool } from "../src/interfaces";
import { getEnvConfig } from "../src/config";
import { CannotUnwrapOnDestination, ParamsInvalid, SignerAddressMissing } from "../src/lib/errors";

import * as ConfigFns from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";
import { SdkXCallParams } from "../src/interfaces";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

const mockConnextAddress = mockConfig.chains[mock.domain.A].deployments!.connext;
const mockMultisendAddress = mockConfig.chains[mock.domain.A].deployments!.multisend;
const mockUnwrapperAddress = mockConfig.chains[mock.domain.B].deployments!.unwrapper!;
const chainId = +mock.chain.A;

describe("SdkBase", () => {
  let sdkBase: SdkBase;
  let sdkUtils: SdkUtils;
  let sdkPool: SdkPool;
  let config: ConfigFns.SdkConfig;

  let chainreader: SinonStubbedInstance<ChainReader>;

  beforeEach(async () => {
    chainreader = createStubInstance(ChainReader);
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);

    stub(ConfigFns, "getConfig").resolves({ nxtpConfig: config, chainData: mockChainData });
    stub(SharedFns, "domainToChainId").returns(chainId);
    stub(SharedFns, "axiosGetRequest").resolves([]);

    sdkBase = await SdkBase.create(mockConfig, undefined, mockChainData);
    sdkUtils = await SdkUtils.create(mockConfig, undefined, mockChainData);
    sdkPool = await SdkPool.create(mockConfig, undefined, mockChainData);
    (sdkBase as any).chainreader = chainreader;
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#create", () => {
    it("happy: should work", async () => {
      expect(sdkBase).to.not.be.undefined;
      expect(sdkBase.config).to.not.be.null;
      expect(sdkBase.chainData).to.not.be.null;

      expect(sdkBase.xcall).to.be.a("function");
      expect(sdkBase.bumpTransfer).to.be.a("function");
      expect(sdkBase.updateSlippage).to.be.a("function");
      expect(sdkBase.estimateRelayerFee).to.be.a("function");
      expect(sdkBase.calculateAmountReceived).to.be.a("function");
    });
  });

  describe("#xcall", () => {
    let getConversionRateStub: SinonStub;
    let getDecimalsForAssetStub: SinonStub;
    let getHardcodedGasLimitsStub: SinonStub;
    let relayerFee = BigNumber.from("1");

    const mockXCallArgs = mock.entity.xcallArgs();
    const standardXCallData: string = getConnextInterface().encodeFunctionData(
      "xcall(uint32,address,address,address,uint256,uint256,bytes)",
      [
        mockXCallArgs.destination,
        mockXCallArgs.to,
        mockXCallArgs.asset,
        mockXCallArgs.delegate,
        mockXCallArgs.amount,
        mockXCallArgs.slippage,
        mockXCallArgs.callData,
      ],
    );
    const standardXCallIntoLocalData: string = getConnextInterface().encodeFunctionData(
      "xcallIntoLocal(uint32,address,address,address,uint256,uint256,bytes)",
      [
        mockXCallArgs.destination,
        mockXCallArgs.to,
        mockXCallArgs.asset,
        mockXCallArgs.delegate,
        mockXCallArgs.amount,
        mockXCallArgs.slippage,
        mockXCallArgs.callData,
      ],
    );

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
    const sdkXCallArgs: SdkXCallParams = {
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
      const res = await sdkBase.xcall(sdkXCallArgs);
      expect(res).to.be.deep.eq(mockXCallRequest);
    });

    it("happy: should work if a user wants to pay fee in transacting asset", async () => {
      const _sdkXCallArgs = { ...sdkXCallArgs, relayerFeeInTransactingAsset: "10" };
      const res = await sdkBase.xcall(_sdkXCallArgs);

      const xcallData: string = getConnextInterface().encodeFunctionData(
        "xcall(uint32,address,address,address,uint256,uint256,bytes,uint256)",
        [
          mockXCallArgs.destination,
          mockXCallArgs.to,
          mockXCallArgs.asset,
          mockXCallArgs.delegate,
          mockXCallArgs.amount,
          mockXCallArgs.slippage,
          mockXCallArgs.callData,
          "10",
        ],
      );

      const xcallRequest: providers.TransactionRequest = {
        to: mockConnextAddress,
        data: xcallData,
        from: mock.config().signerAddress,
        value: relayerFee,
        chainId,
      };

      expect(res).to.be.deep.eq(xcallRequest);
    });

    it("happy: should use xcallIntoLocal if receiveLocal is used", async () => {
      const res = await sdkBase.xcall({
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
        data: encodeMultisendCall(wrapNativeOnOriginMultisendTxs(asset!, amount)),
        from: mock.config().signerAddress,
        // Important: must send the full amount in ETH for transfer! Not just relayerFee.
        value: relayerFee.add(amount),
        chainId,
      };

      const res = await sdkBase.xcall({
        ...sdkXCallArgs,
        wrapNativeOnOrigin: true,
      });
      expect(res).to.be.deep.eq(expectedTxRequest);
    });

    it("happy: wrapNativeOnOrigin && receiveLocal works", async () => {
      const { asset, amount: _amount } = sdkXCallArgs;
      const amount = BigNumber.from(_amount);
      const txs = wrapNativeOnOriginMultisendTxs(asset!, amount);
      txs[2].data = standardXCallIntoLocalData;

      const expectedTxRequest: providers.TransactionRequest = {
        to: mockMultisendAddress,
        data: encodeMultisendCall(txs),
        from: mock.config().signerAddress,
        // Important: must send the full amount in ETH for transfer! Not just relayerFee.
        value: relayerFee.add(amount),
        chainId,
      };

      const res = await sdkBase.xcall({
        ...sdkXCallArgs,
        receiveLocal: true,
        wrapNativeOnOrigin: true,
      });
      expect(res).to.be.deep.eq(expectedTxRequest);
    });

    it("happy: handle unwrapNativeOnDestination", async () => {
      // Format the xcall for the unwrapNativeOnDestination case.
      const xcallData = getConnextInterface().encodeFunctionData(
        "xcall(uint32,address,address,address,uint256,uint256,bytes)",
        [
          mockXCallArgs.destination,
          // The `to` argument becomes the Unwrapper contract address.
          mockUnwrapperAddress,
          mockXCallArgs.asset,
          mockXCallArgs.delegate,
          mockXCallArgs.amount,
          mockXCallArgs.slippage,
          // For the Unwrapper contract, we provide the original recipient as argument.
          utils.defaultAbiCoder.encode(["address"], [sdkXCallArgs.to]),
        ],
      );

      const expectedTxRequest: providers.TransactionRequest = {
        to: mockConnextAddress,
        data: xcallData,
        from: mock.config().signerAddress,
        value: relayerFee,
        chainId,
      };

      const res = await sdkBase.xcall({
        ...sdkXCallArgs,
        unwrapNativeOnDestination: true,
      });
      expect(res).to.be.deep.eq(expectedTxRequest);
    });

    it("happy: handle both wrapNativeOnOrigin && unwrapNativeOnDestination", async () => {
      const { asset, amount: _amount } = sdkXCallArgs;
      const amount = BigNumber.from(_amount);
      const txs = wrapNativeOnOriginMultisendTxs(asset!, amount);

      // Format the xcall for the unwrapNativeOnDestination case.
      const xcallData = getConnextInterface().encodeFunctionData(
        "xcall(uint32,address,address,address,uint256,uint256,bytes)",
        [
          mockXCallArgs.destination,
          // The `to` argument becomes the Unwrapper contract address.
          mockUnwrapperAddress,
          mockXCallArgs.asset,
          mockXCallArgs.delegate,
          mockXCallArgs.amount,
          mockXCallArgs.slippage,
          // For the Unwrapper contract, we provide the original recipient as argument.
          utils.defaultAbiCoder.encode(["address"], [sdkXCallArgs.to]),
        ],
      );
      txs[2].data = xcallData;

      const expectedTxRequest: providers.TransactionRequest = {
        to: mockMultisendAddress,
        data: encodeMultisendCall(txs),
        from: mock.config().signerAddress,
        // Important: must send the full amount in ETH for transfer! Not just relayerFee.
        value: relayerFee.add(amount),
        chainId,
      };

      const res = await sdkBase.xcall({
        ...sdkXCallArgs,
        wrapNativeOnOrigin: true,
        unwrapNativeOnDestination: true,
      });
      expect(res).to.be.deep.eq(expectedTxRequest);
    });

    it("throws CannotUnwrapOnDestination if receiveLocal && unwrapNativeOnDestination", async () => {
      await expect(
        sdkBase.xcall({
          ...sdkXCallArgs,
          unwrapNativeOnDestination: true,
          callData: "0xabcdef",
        }),
      ).to.be.rejectedWith(CannotUnwrapOnDestination);
    });

    it("throws CannotUnwrapOnDestination if callData specified && unwrapNativeOnDestination", async () => {
      await expect(
        sdkBase.xcall({
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

      stub(sdkBase, "estimateRelayerFee").resolves(BigNumber.from("50000"));
      const mockXcallArgs = mock.entity.xcallArgs();
      const data = getConnextInterface().encodeFunctionData(
        "xcall(uint32,address,address,address,uint256,uint256,bytes)",
        [
          mockXcallArgs.destination,
          mockXcallArgs.to,
          mockXcallArgs.asset,
          mockXcallArgs.delegate,
          mockXcallArgs.amount,
          mockXcallArgs.slippage,
          mockXcallArgs.callData,
        ],
      );

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

      const res = await sdkBase.xcall(sdkXcallArgs);
      expect(res).to.be.deep.eq(mockXCallRequest);
    });

    it("should error if signerAddress is undefined", async () => {
      sdkBase.config.signerAddress = undefined;
      const origin = mock.entity.callParams().originDomain;
      const sdkXcallArgs = {
        ...mock.entity.xcallArgs(),
        origin,
      };

      await expect(sdkBase.xcall(sdkXcallArgs)).to.be.rejectedWith(SignerAddressMissing);
    });
  });

  describe("#bumpTransfer", () => {
    const mockXTransfer = mock.entity.xtransfer();

    const mockBumpTransferParams = {
      domainId: mockXTransfer.xparams.originDomain,
      transferId: mockXTransfer.transferId,
      asset: mockXTransfer.origin!.assets.transacting.asset,
      relayerFee: "1",
    };

    it("should error if signerAddress is undefined", async () => {
      (sdkBase as any).config.signerAddress = undefined;

      await expect(sdkBase.bumpTransfer(mockBumpTransferParams)).to.be.rejectedWith(SignerAddressMissing);
    });

    it("happy-1: should work with native asset", async () => {
      const bumpParams = { ...mockBumpTransferParams, asset: constants.AddressZero };
      sdkBase.config.signerAddress = mockConfig.signerAddress;
      const data = getConnextInterface().encodeFunctionData("bumpTransfer(bytes32)", [bumpParams.transferId]);

      const mockBumpTransferTxRequest: providers.TransactionRequest = {
        to: mockConnextAddress,
        data,
        from: mock.config().signerAddress,
        value: BigNumber.from(bumpParams.relayerFee),
        chainId,
      };

      const res = await sdkBase.bumpTransfer(bumpParams);
      expect(res).to.be.deep.eq(mockBumpTransferTxRequest);
    });
    it("happy-2: should work with transacting asset", async () => {
      const bumpParams = { ...mockBumpTransferParams, asset: mockXTransfer.origin!.assets.transacting.asset };
      sdkBase.config.signerAddress = mockConfig.signerAddress;
      const data = getConnextInterface().encodeFunctionData("bumpTransfer(bytes32,address,uint256)", [
        bumpParams.transferId,
        bumpParams.asset,
        bumpParams.relayerFee,
      ]);

      const mockBumpTransferTxRequest: providers.TransactionRequest = {
        to: mockConnextAddress,
        data,
        from: mock.config().signerAddress,
        chainId,
      };

      const res = await sdkBase.bumpTransfer(bumpParams);
      expect(res).to.be.deep.eq(mockBumpTransferTxRequest);
    });
  });

  describe("#updateSlippage", () => {
    const mockXTransfer = mock.entity.xtransfer();

    const mockUpdateSlippageParams = {
      domainId: mockXTransfer.xparams.destinationDomain,
      transferId: mockXTransfer.transferId,
      slippage: "100",
    };

    const mockUpdateSlippageParamsWrongDomain = {
      domainId: mockXTransfer.xparams.originDomain,
      transferId: mockXTransfer.transferId,
      slippage: "100",
    };

    it("happy: should work", async () => {
      stub(sdkUtils, "getTransfers").resolves([mockXTransfer]);

      await expect(sdkBase.updateSlippage(mockUpdateSlippageParams)).to.not.be.undefined;
    });

    it("should error if not updated on destination domain", async () => {
      stub(sdkUtils, "getTransfers").resolves([mockXTransfer]);

      await expect(sdkBase.updateSlippage(mockUpdateSlippageParamsWrongDomain)).to.be.rejectedWith(ParamsInvalid);
    });

    it("should error if not updated by delegate", async () => {
      (sdkBase as any).config.signerAddress = mkAddress("0xbeef");

      stub(sdkUtils, "getTransfers").resolves([mockXTransfer]);

      await expect(sdkBase.updateSlippage(mockUpdateSlippageParamsWrongDomain)).to.be.rejectedWith(ParamsInvalid);
    });

    it("should error if signerAddress is undefined", async () => {
      (sdkBase as any).config.signerAddress = undefined;

      await expect(sdkBase.updateSlippage(mockUpdateSlippageParams)).to.be.rejectedWith(SignerAddressMissing);
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
      const relayerFee = await sdkBase.estimateRelayerFee({
        originDomain: mock.domain.A,
        destinationDomain: mock.domain.B,
      });
      expect(calculateRelayerFeeStub.callCount).to.be.eq(1);
      expect(relayerFee.toString()).to.be.eq("100");
    });
  });

  describe("#calculateAmountReceived", () => {
    const localAsset: PoolAsset = {
      address: mock.asset.A.address,
      name: mock.asset.A.name,
      symbol: mock.asset.A.symbol,
      decimals: 18,
      index: 0,
      balance: BigNumber.from("100"),
    };

    const adoptedAsset: PoolAsset = {
      address: mock.asset.B.address,
      name: mock.asset.B.name,
      symbol: mock.asset.B.symbol,
      decimals: 18,
      index: 1,
      balance: BigNumber.from("100"),
    };

    const mockPool: Pool = {
      domainId: mock.domain.A,
      name: "TSTB Pool",
      symbol: "TSTB-TSTA",
      local: localAsset,
      adopted: adoptedAsset,
      lpTokenAddress: utils.formatBytes32String("asdf"),
      canonicalHash: utils.formatBytes32String("13337"),
      swapFee: "4000000",
      adminFee: "0",
    };

    const mockResponse = {
      amountReceived: "100",
      originSlippage: "1",
      routerFee: "1",
      destinationSlippage: "1",
      isFastPath: true,
    };

    it("happy: should work with local origin asset and local destination asset", async () => {
      stub(sdkPool, "calculateAmountReceived").resolves(mockResponse);
      const res = await sdkBase.calculateAmountReceived(
        mockPool.domainId,
        mockPool.domainId,
        mockPool.local.address,
        "100",
        true,
      );

      expect(res).to.equal(mockResponse);
    });
  });
});
