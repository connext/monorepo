import { reset, restore, stub, SinonStub, createStubInstance, SinonStubbedInstance } from "sinon";
import { encodeMultisendCall, expect, MultisendTransaction, WETHAbi, mkAddress } from "@connext/nxtp-utils";
import { getConnextInterface, ChainReader } from "@connext/nxtp-txservice";
import { providers, BigNumber, utils, constants } from "ethers";
import { mock } from "./mock";
import { SdkBase } from "../src/sdkBase";
import { SdkUtils } from "../src/sdkUtils";
import { SdkPool } from "../src/sdkPool";
import { PoolAsset, Pool, Transfer } from "../src/interfaces";
import { getEnvConfig, LOCKBOX_ADAPTER_DOMAIN_ADDRESS } from "../src/config";
import { CannotUnwrapOnDestination, ParamsInvalid, SignerAddressMissing, ProviderMissing } from "../src/lib/errors";

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
  let sdkUtilsStub: SdkUtils;
  let sdkPoolStub: SdkPool;
  let config: ConfigFns.SdkConfig;

  let chainreader: SinonStubbedInstance<ChainReader>;

  const mockXTransfer: Transfer = {
    transfer_id: mock.entity.xtransfer().transferId,
    nonce: 100,
    to: mock.entity.xtransfer().xparams.to,
    call_data: mock.entity.xtransfer().xparams.callData,
    origin_domain: mock.entity.xtransfer().xparams.originDomain,
    destination_domain: mock.entity.xtransfer().xparams.destinationDomain,
    receive_local: mock.entity.xtransfer().xparams.receiveLocal,
    origin_chain: mock.entity.xtransfer().origin?.chain!,
    origin_transacting_asset: mock.entity.xtransfer().origin!.assets.transacting.asset,
    origin_transacting_amount: mock.entity.xtransfer().origin!.assets.transacting.amount,
    origin_bridged_asset: mock.entity.xtransfer().origin!.assets.bridged.asset,
    origin_bridged_amount: mock.entity.xtransfer().origin!.assets.bridged.amount,
    xcall_caller: mock.config().signerAddress!,
    xcall_transaction_hash: mkAddress("0xabc"),
    xcall_timestamp: "100",
    xcall_gas_price: "100",
    xcall_gas_limit: "100",
    xcall_block_number: "100",
    destination_chain: mock.entity.xtransfer().destination?.chain!,
    status: "XCalled",
    routers: [],
    destination_transacting_asset: mock.asset.B.address,
    destination_transacting_amount: "100",
    destination_local_asset: mock.asset.B.address,
    destination_local_amount: "100",
    execute_caller: mkAddress("0x111"),
    execute_transaction_hash: mkAddress("0x111"),
    execute_timestamp: Date.now(),
    execute_gas_price: "100",
    execute_gas_limit: "100",
    execute_block_number: 100,
    execute_origin_sender: mkAddress("0x111"),
    reconcile_caller: mkAddress("0x111"),
    reconcile_transaction_hash: mkAddress("0x111"),
    reconcile_timestamp: "100",
    reconcile_gas_price: "100",
    reconcile_gas_limit: "100",
    reconcile_block_number: 100,
    update_time: "100",
    delegate: mock.entity.xtransfer().xparams.delegate,
    message_hash: "asdf",
    canonical_domain: mock.domain.A,
    slippage: 100,
    origin_sender: mock.config().signerAddress!,
    bridged_amt: mock.entity.xtransfer().xparams.bridgedAmt,
    normalized_in: mock.entity.xtransfer().xparams.normalizedIn,
    canonical_id: "0x0000000000000000000000007ea6ea49b0b0ae9c5db7907d139d9cd3439862a1",
    xcall_tx_origin: "aaaa",
    execute_tx_origin: "aaaa",
    reconcile_tx_origin: "aaaa",
    relayer_fee: "100",
  };

  beforeEach(async () => {
    chainreader = createStubInstance(ChainReader);
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);

    stub(ConfigFns, "getConfig").resolves({ nxtpConfig: config, chainData: mockChainData });
    stub(SharedFns, "domainToChainId").returns(chainId);
    stub(SharedFns, "axiosGetRequest").resolves([]);

    sdkBase = await SdkBase.create(mockConfig, undefined, mockChainData);
    sdkUtilsStub = createStubInstance(SdkUtils);
    sdkPoolStub = createStubInstance(SdkPool);
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
      value: relayerFee,
      chainId,
    };
    const mockXCallIntoLocalRequest: providers.TransactionRequest = {
      to: mockConnextAddress,
      data: standardXCallIntoLocalData,
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

    it("happy-1: should work if ERC20", async () => {
      stub(sdkBase, "isXERC20WithLockbox").resolves(false);
      const res = await sdkBase.xcall(sdkXCallArgs);
      expect(res).to.be.deep.eq(mockXCallRequest);
    });

    it("happy-1.1: should work if ERC20 and if asset is xERC20", async () => {
      stub(sdkBase, "isXERC20WithLockbox").resolves(true);
      // Changing domain to mainnet
      const mockXcallArgs = {
        ...sdkXCallArgs,
        origin: "6648936",
      };
      stub(sdkBase, "providerSanityCheck").resolves(true);
      const res = await sdkBase.xcall(mockXcallArgs);

      const adapterMockXcallArgs = {
        ...mockXCallRequest,
        chainId: 1,
        to: LOCKBOX_ADAPTER_DOMAIN_ADDRESS["6648936"],
      };
      expect(res).to.be.deep.eq(adapterMockXcallArgs);
    });

    it("happy-2: should work if a user wants to pay fee in transacting asset", async () => {
      const _sdkXCallArgs = { ...sdkXCallArgs, relayerFeeInTransactingAsset: "10" };
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
        value: relayerFee,
        chainId,
      };
      stub(sdkBase, "isXERC20WithLockbox").resolves(false);
      const res = await sdkBase.xcall(_sdkXCallArgs);
      expect(res).to.be.deep.eq(xcallRequest);
    });

    it("happy-3: should use xcallIntoLocal if receiveLocal is used", async () => {
      stub(sdkBase, "isXERC20WithLockbox").resolves(false);
      const res = await sdkBase.xcall({
        ...sdkXCallArgs,
        receiveLocal: true,
      });

      expect(res).to.be.deep.eq(mockXCallIntoLocalRequest);
    });

    it("happy-4: if wrapNativeOnOrigin specified, should make a multisend tx for wrapping eth before xcall", async () => {
      const { asset, amount: _amount } = sdkXCallArgs;
      const amount = BigNumber.from(_amount);
      const expectedTxRequest: providers.TransactionRequest = {
        to: mockMultisendAddress,
        data: encodeMultisendCall(wrapNativeOnOriginMultisendTxs(asset!, amount)),
        // Important: must send the full amount in ETH for transfer! Not just relayerFee.
        value: relayerFee.add(amount),
        chainId,
      };
      stub(sdkBase, "isXERC20WithLockbox").resolves(false);
      const res = await sdkBase.xcall({
        ...sdkXCallArgs,
        wrapNativeOnOrigin: true,
      });

      expect(res).to.be.deep.eq(expectedTxRequest);
    });

    it("happy-5: wrapNativeOnOrigin && receiveLocal works", async () => {
      const { asset, amount: _amount } = sdkXCallArgs;
      const amount = BigNumber.from(_amount);
      const txs = wrapNativeOnOriginMultisendTxs(asset!, amount);
      txs[2].data = standardXCallIntoLocalData;
      const expectedTxRequest: providers.TransactionRequest = {
        to: mockMultisendAddress,
        data: encodeMultisendCall(txs),
        // Important: must send the full amount in ETH for transfer! Not just relayerFee.
        value: relayerFee.add(amount),
        chainId,
      };
      stub(sdkBase, "isXERC20WithLockbox").resolves(false);
      const res = await sdkBase.xcall({
        ...sdkXCallArgs,
        receiveLocal: true,
        wrapNativeOnOrigin: true,
      });

      expect(res).to.be.deep.eq(expectedTxRequest);
    });

    it("happy-6: handle unwrapNativeOnDestination", async () => {
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
        value: relayerFee,
        chainId,
      };
      stub(sdkBase, "isXERC20WithLockbox").resolves(false);
      const res = await sdkBase.xcall({
        ...sdkXCallArgs,
        unwrapNativeOnDestination: true,
      });

      expect(res).to.be.deep.eq(expectedTxRequest);
    });

    it("happy-7: handle both wrapNativeOnOrigin && unwrapNativeOnDestination", async () => {
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
        // Important: must send the full amount in ETH for transfer! Not just relayerFee.
        value: relayerFee.add(amount),
        chainId,
      };
      stub(sdkBase, "isXERC20WithLockbox").resolves(false);
      const res = await sdkBase.xcall({
        ...sdkXCallArgs,
        wrapNativeOnOrigin: true,
        unwrapNativeOnDestination: true,
      });

      expect(res).to.be.deep.eq(expectedTxRequest);
    });

    // TODO: Add relayer fee calculation at xcall
    it.skip("happy-8: should calculate the relayerFee if args.relayerFee is zero", async () => {
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
      stub(sdkBase, "isXERC20WithLockbox").resolves(false);
      stub(sdkBase, "isXERC20WithLockbox").resolves(false);
      const res = await sdkBase.xcall(sdkXcallArgs);

      expect(res).to.be.deep.eq(mockXCallRequest);
    });

    it("happy-9: should work if signerAddress is passed into options", async () => {
      sdkBase.config.signerAddress = undefined;

      const options = {
        signerAddress: mockXTransfer.delegate,
      };
      const sdkXcallArgs = {
        ...mock.entity.xcallArgs(),
        origin,
      };
      stub(sdkBase, "isXERC20WithLockbox").resolves(false);
      const res = await sdkBase.xcall({ ...sdkXcallArgs, options });

      expect(res).to.not.be.undefined;
    });

    it("throws CannotUnwrapOnDestination if receiveLocal && unwrapNativeOnDestination", async () => {
      stub(sdkBase, "isXERC20WithLockbox").resolves(false);
      await expect(
        sdkBase.xcall({
          ...sdkXCallArgs,
          unwrapNativeOnDestination: true,
          callData: "0xabcdef",
        }),
      ).to.be.rejectedWith(CannotUnwrapOnDestination);
    });

    it("throws CannotUnwrapOnDestination if callData specified && unwrapNativeOnDestination", async () => {
      stub(sdkBase, "isXERC20WithLockbox").resolves(false);
      await expect(
        sdkBase.xcall({
          ...sdkXCallArgs,
          unwrapNativeOnDestination: true,
          receiveLocal: true,
        }),
      ).to.be.rejectedWith(CannotUnwrapOnDestination);
    });

    it("should error if provider sanity check returns false", async () => {
      stub(sdkBase, "providerSanityCheck").resolves(false);
      stub(sdkBase, "isXERC20WithLockbox").resolves(false);
      await expect(sdkBase.xcall(sdkXCallArgs)).to.be.rejectedWith(ProviderMissing);
    });
  });

  describe("#bumpTransfer", () => {
    const mockBumpTransferParams = {
      domainId: mockXTransfer.origin_domain,
      transferId: mockXTransfer.transfer_id,
      asset: mockXTransfer.origin_transacting_asset,
      relayerFee: "1",
    };

    it("happy-1: should work with native asset", async () => {
      const bumpParams = { ...mockBumpTransferParams, asset: constants.AddressZero };
      const data = getConnextInterface().encodeFunctionData("bumpTransfer(bytes32)", [bumpParams.transferId]);
      const mockBumpTransferTxRequest: providers.TransactionRequest = {
        to: mockConnextAddress,
        data,
        value: BigNumber.from(bumpParams.relayerFee),
        chainId,
      };

      const res = await sdkBase.bumpTransfer(bumpParams);

      expect(res).to.be.deep.eq(mockBumpTransferTxRequest);
    });

    it("happy-2: should work with transacting asset", async () => {
      const bumpParams = { ...mockBumpTransferParams, asset: mockXTransfer.origin_transacting_asset };
      const data = getConnextInterface().encodeFunctionData("bumpTransfer(bytes32,address,uint256)", [
        bumpParams.transferId,
        bumpParams.asset,
        bumpParams.relayerFee,
      ]);
      const mockBumpTransferTxRequest: providers.TransactionRequest = {
        to: mockConnextAddress,
        data,
        chainId,
      };

      const res = await sdkBase.bumpTransfer(bumpParams);

      expect(res).to.be.deep.eq(mockBumpTransferTxRequest);
    });

    it("happy-3: should work if signerAddress is passed into options", async () => {
      sdkBase.config.signerAddress = undefined;
      const options = {
        signerAddress: mockXTransfer.delegate,
      };

      const res = await sdkBase.bumpTransfer({ ...mockBumpTransferParams, options });

      expect(res).to.not.be.undefined;
    });

    it("should error if provider sanity check returns false", async () => {
      stub(sdkBase, "providerSanityCheck").resolves(false);

      await expect(sdkBase.bumpTransfer(mockBumpTransferParams)).to.be.rejectedWith(ProviderMissing);
    });
  });

  describe("#updateSlippage", () => {
    const mockUpdateSlippageParams = {
      domainId: mockXTransfer.destination_domain,
      transferId: mockXTransfer.transfer_id,
      slippage: "100",
    };

    const mockUpdateSlippageParamsWrongDomain = {
      domainId: mockXTransfer.origin_domain,
      transferId: mockXTransfer.transfer_id,
      slippage: "100",
    };

    it("happy-1: should work", async () => {
      sdkBase.config.signerAddress = mockXTransfer.delegate;
      (sdkUtilsStub.getTransfers as any).returns(Promise.resolve([mockXTransfer]));
      stub(SdkUtils, "create").resolves(sdkUtilsStub);

      const res = await sdkBase.updateSlippage(mockUpdateSlippageParams);

      expect(res).to.not.be.undefined;
    });

    it("happy-2: should work if signerAddress is passed into options", async () => {
      sdkBase.config.signerAddress = undefined;
      (sdkUtilsStub.getTransfers as any).returns(
        Promise.resolve([{ ...mockXTransfer, destination_domain: mockXTransfer.destination_domain }]),
      );
      stub(SdkUtils, "create").resolves(sdkUtilsStub);

      const options = {
        signerAddress: mockXTransfer.delegate,
      };
      const res = await sdkBase.updateSlippage({ ...mockUpdateSlippageParams, options });

      expect(res).to.not.be.undefined;
    });

    it("should error if not updated on destination domain", async () => {
      (sdkUtilsStub.getTransfers as any).returns(Promise.resolve([mockXTransfer]));
      stub(SdkUtils, "create").resolves(sdkUtilsStub);

      await expect(sdkBase.updateSlippage(mockUpdateSlippageParamsWrongDomain)).to.be.rejectedWith(ParamsInvalid);
    });

    it("should error if not updated by delegate", async () => {
      (sdkUtilsStub.getTransfers as any).returns(Promise.resolve([mockXTransfer]));
      stub(SdkUtils, "create").resolves(sdkUtilsStub);

      await expect(sdkBase.updateSlippage(mockUpdateSlippageParamsWrongDomain)).to.be.rejectedWith(ParamsInvalid);
    });

    it("should error if signerAddress is undefined", async () => {
      sdkBase.config.signerAddress = undefined;

      await expect(sdkBase.updateSlippage(mockUpdateSlippageParams)).to.be.rejectedWith(SignerAddressMissing);
    });

    it("should error if provider sanity check returns false", async () => {
      stub(sdkBase, "providerSanityCheck").resolves(false);

      await expect(sdkBase.updateSlippage(mockUpdateSlippageParams)).to.be.rejectedWith(ProviderMissing);
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

    it("should return maxRelayerFeeInNative from chaindata if estimate is too high", async () => {
      calculateRelayerFeeStub.resolves(BigNumber.from(100_000_000_000));
      const relayerFee = await sdkBase.estimateRelayerFee({
        originDomain: mock.domain.A,
        destinationDomain: mock.domain.A,
      });
      expect(relayerFee.toString()).to.be.eq(sdkBase.chainData.get(mock.domain.A)!.maxRelayerFeeInNative);
    });

    it("should return high estimate if no override in chaindata", async () => {
      calculateRelayerFeeStub.resolves(BigNumber.from(100_000_000_000));
      const relayerFee = await sdkBase.estimateRelayerFee({
        originDomain: mock.domain.A,
        destinationDomain: mock.domain.B,
      });
      expect(relayerFee.toString()).to.be.eq(BigNumber.from(100_000_000_000).toString());
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
      (sdkPoolStub.calculateAmountReceived as any).returns(Promise.resolve(mockResponse));
      stub(SdkPool, "create").resolves(sdkPoolStub);

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
