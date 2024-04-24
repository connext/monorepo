import { reset, restore, stub, spy, match, createStubInstance } from "sinon";
import { expect, getCanonicalHash, getRandomBytes32, DEFAULT_ROUTER_FEE, mkAddress } from "@connext/nxtp-utils";
import { getConnextInterface } from "@connext/nxtp-txservice";
import { providers, utils, BigNumber, constants } from "ethers";
import { mock } from "./mock";
import { SdkPool } from "../src/sdkPool";
import { PoolAsset, Pool } from "../src/interfaces";
import { getEnvConfig } from "../src/config";

import * as ConfigFns from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";
import { UriInvalid, ParamsInvalid } from "../src/lib/errors";
import { SdkUtils } from "../src/sdkUtils";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

describe("SdkPool", () => {
  let sdkPool: SdkPool;
  let sdkUtilsStub: SdkUtils;
  let config: ConfigFns.SdkConfig;

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
    balances: [BigNumber.from("20000"), BigNumber.from("20000")],
    decimals: [18, 18],
    invariant: BigNumber.from("20000"),
    initialA: BigNumber.from("20000"),
    initialATime: 0,
    futureA: BigNumber.from("20000"),
    futureATime: 0,
    currentA: BigNumber.from("20000"),
    adminFee: "0",
  };

  const mockPoolData = {
    key: utils.formatBytes32String("13337"),
    domain: mock.domain.A,
    is_active: true,
    lp_token: utils.formatBytes32String("asdf"),
    initial_a: 20000,
    future_a: 20000,
    initial_a_time: 0,
    future_a_time: 0,
    swap_fee: "4000000",
    admin_fee: "0",
    pooled_tokens: [mockPool.local.address, mockPool.adopted.address],
    token_precision_multipliers: ["1", "1"],
    pool_token_decimals: [18, 18],
    balances: [BigNumber.from("100"), BigNumber.from("100")],
    virtual_price: BigNumber.from("100"),
    invariant: BigNumber.from("100"),
    lp_token_supply: BigNumber.from("100"),
  };

  const mockAssetData = {
    local: mockPool.local.address,
    adopted: mockPool.adopted.address,
    canonical_id: constants.HashZero,
    canonical_domain: mockPool.domainId,
    domain: mockPool.domainId,
    key: mockPool.canonicalHash,
    id: mockPool.local.address,
  };

  beforeEach(async () => {
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);
    stub(ConfigFns, "getConfig").resolves({ nxtpConfig: config, chainData: mockChainData });
    stub(SharedFns, "axiosGetRequest").resolves([]);

    sdkPool = await SdkPool.create(config, undefined, mockChainData);
    sdkUtilsStub = createStubInstance(SdkUtils);
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#create", () => {
    it("happy: should work", async () => {
      expect(sdkPool).to.not.be.undefined;
      expect(sdkPool.config).to.not.be.null;
      expect(sdkPool.chainData).to.not.be.null;

      expect(sdkPool.getConnext).to.be.a("function");
      expect(sdkPool.getERC20).to.be.a("function");
      expect(sdkPool.getDefaultDeadline).to.be.a("function");
      expect(sdkPool.calculateCanonicalKey).to.be.a("function");
      expect(sdkPool.calculateSwap).to.be.a("function");
      expect(sdkPool.calculateSwapLocal).to.be.a("function");
      expect(sdkPool.calculateTokenAmount).to.be.a("function");
      expect(sdkPool.calculateRemoveSwapLiquidity).to.be.a("function");
      expect(sdkPool.calculatePriceImpact).to.be.a("function");
      expect(sdkPool.calculateSwapPriceImpact).to.be.a("function");
      expect(sdkPool.calculateAddLiquidityPriceImpact).to.be.a("function");
      expect(sdkPool.calculateRemoveLiquidityPriceImpact).to.be.a("function");
      expect(sdkPool.getTokenPrice).to.be.a("function");
      expect(sdkPool.getDefaultDeadline).to.be.a("function");

      expect(sdkPool.getLPTokenAddress).to.be.a("function");
      expect(sdkPool.getTokenSupply).to.be.a("function");
      expect(sdkPool.getTokenUserBalance).to.be.a("function");
      expect(sdkPool.getPoolTokenIndex).to.be.a("function");
      expect(sdkPool.getPoolTokenDecimals).to.be.a("function");
      expect(sdkPool.getPoolTokenBalance).to.be.a("function");
      expect(sdkPool.getPoolTokenAddress).to.be.a("function");
      expect(sdkPool.getVirtualPrice).to.be.a("function");
      expect(sdkPool.getRepresentation).to.be.a("function");
      expect(sdkPool.getAdopted).to.be.a("function");
      expect(sdkPool.getTokenSwapEvents).to.be.a("function");
      expect(sdkPool.getPoolData).to.be.a("function");

      expect(sdkPool.addLiquidity).to.be.a("function");
      expect(sdkPool.removeLiquidity).to.be.a("function");
      expect(sdkPool.removeLiquidityOneToken).to.be.a("function");
      expect(sdkPool.swap).to.be.a("function");

      expect(sdkPool.getPool).to.be.a("function");
      expect(sdkPool.getUserPools).to.be.a("function");
      expect(sdkPool.getYieldStatsForDays).to.be.a("function");
      expect(sdkPool.calculateYield).to.be.a("function");
      expect(sdkPool.getYieldData).to.be.a("function");
      expect(sdkPool.getLiquidityMiningAprPerPool).to.be.a("function");
    });
  });

  describe("#addLiquidity", () => {
    const mockParams = {
      canonicalId: utils.formatBytes32String("0"),
      amounts: ["100", "100"],
      minToMint: "100",
      deadline: 10000000000,
      connextAddress: mockConfig.chains[mock.domain.A].deployments!.connext,
    };

    it("happy: should work", async () => {
      sdkPool.config.signerAddress = mockConfig.signerAddress;
      const key = getCanonicalHash(mockPool.domainId, mockParams.canonicalId);
      const data = getConnextInterface().encodeFunctionData("addSwapLiquidity", [
        key,
        mockParams.amounts,
        mockParams.minToMint,
        mockParams.deadline,
      ]);

      const mockRequest: providers.TransactionRequest = {
        to: mockParams.connextAddress,
        data,
      };

      stub(sdkPool, "getCanonicalTokenId").resolves([mockPool.domainId, mockParams.canonicalId]);

      const res = await sdkPool.addLiquidity(
        mockPool.domainId,
        mockPool.local.address,
        mockParams.amounts,
        mockParams.minToMint,
        mockParams.deadline,
      );
      expect(res).to.be.deep.eq(mockRequest);
    });
  });

  describe("#removeLiquidityOneToken", () => {
    const mockParams = {
      canonicalId: utils.formatBytes32String("0"),
      amount: "100",
      minAmount: "0",
      index: 0,
      deadline: 10000000000,
      connextAddress: mockConfig.chains[mock.domain.A].deployments!.connext,
    };

    it("happy: should work", async () => {
      sdkPool.config.signerAddress = mockConfig.signerAddress;
      const key = getCanonicalHash(mockPool.domainId, mockParams.canonicalId);
      const data = getConnextInterface().encodeFunctionData("removeSwapLiquidityOneToken", [
        key,
        mockParams.amount,
        mockParams.index,
        mockParams.minAmount,
        mockParams.deadline,
      ]);

      const mockRequest: providers.TransactionRequest = {
        to: mockParams.connextAddress,
        data,
      };

      stub(sdkPool, "getCanonicalTokenId").resolves([mockPool.domainId, mockParams.canonicalId]);
      stub(sdkPool, "getPoolTokenIndex").resolves(0);

      const res = await sdkPool.removeLiquidityOneToken(
        mockPool.domainId,
        mockPool.local.address,
        mockPool.local.address,
        mockParams.amount,
        mockParams.minAmount,
        mockParams.deadline,
      );
      expect(res).to.be.deep.eq(mockRequest);
    });
  });

  describe("#removeLiquidity", () => {
    const mockParams = {
      canonicalId: utils.formatBytes32String("0"),
      amount: "100",
      minAmounts: ["100", "100"],
      deadline: 10000000000,
      connextAddress: mockConfig.chains[mock.domain.A].deployments!.connext,
    };

    it("happy: should work", async () => {
      sdkPool.config.signerAddress = mockConfig.signerAddress;
      const key = getCanonicalHash(mockPool.domainId, mockParams.canonicalId);
      const data = getConnextInterface().encodeFunctionData("removeSwapLiquidity", [
        key,
        mockParams.amount,
        mockParams.minAmounts,
        mockParams.deadline,
      ]);

      const mockRequest: providers.TransactionRequest = {
        to: mockParams.connextAddress,
        data,
      };

      stub(sdkPool, "getCanonicalTokenId").resolves([mockPool.domainId, mockParams.canonicalId]);

      const res = await sdkPool.removeLiquidity(
        mockPool.domainId,
        mockPool.local.address,
        mockParams.amount,
        mockParams.minAmounts,
        mockParams.deadline,
      );
      expect(res).to.be.deep.eq(mockRequest);
    });
  });

  describe("#removeLiquidityImbalance", () => {
    const mockParams = {
      canonicalId: utils.formatBytes32String("0"),
      amounts: ["100", "100"],
      maxBurnAmount: "100",
      deadline: 10000000000,
      connextAddress: mockConfig.chains[mock.domain.A].deployments!.connext,
    };

    it("happy: should work", async () => {
      sdkPool.config.signerAddress = mockConfig.signerAddress;
      const key = getCanonicalHash(mockPool.domainId, mockParams.canonicalId);
      const data = getConnextInterface().encodeFunctionData("removeSwapLiquidityImbalance", [
        key,
        mockParams.amounts,
        mockParams.maxBurnAmount,
        mockParams.deadline,
      ]);

      const mockRequest: providers.TransactionRequest = {
        to: mockParams.connextAddress,
        data,
      };

      stub(sdkPool, "getCanonicalTokenId").resolves([mockPool.domainId, mockParams.canonicalId]);
      stub(sdkPool, "getPoolTokenIndex").resolves(0);

      const res = await sdkPool.removeLiquidityImbalance(
        mockPool.domainId,
        mockPool.local.address,
        mockParams.amounts,
        mockParams.maxBurnAmount,
        mockParams.deadline,
      );
      expect(res).to.be.deep.eq(mockRequest);
    });

    it("happy: should work if signerAddress is passed into options", async () => {
      sdkPool.config.signerAddress = undefined;
      const options = {
        signerAddress: mkAddress("0xabc"),
      };

      const res = await sdkPool.removeLiquidityImbalance(
        mockPool.domainId,
        mockPool.local.address,
        mockParams.amounts,
        mockParams.maxBurnAmount,
        mockParams.deadline,
        options,
      );

      expect(res).to.not.be.undefined;
    });
  });

  describe("#swap", () => {
    const mockParams = {
      canonicalId: utils.formatBytes32String("0"),
      from: "0x0",
      to: "0x0",
      amount: "100",
      minDy: 100,
      deadline: 10000000000,
      connextAddress: mockConfig.chains[mock.domain.A].deployments!.connext,
    };

    it("happy: should work", async () => {
      sdkPool.config.signerAddress = mockConfig.signerAddress;
      const key = getCanonicalHash(mockPool.domainId, mockParams.canonicalId);
      const data = getConnextInterface().encodeFunctionData("swap", [
        key,
        0,
        1,
        mockParams.amount,
        mockParams.minDy,
        mockParams.deadline,
      ]);

      const mockRequest: providers.TransactionRequest = {
        to: mockParams.connextAddress,
        data,
      };

      stub(sdkPool, "getCanonicalTokenId").resolves([mockPool.domainId, mockParams.canonicalId]);
      stub(sdkPool, "getPoolTokenIndex").onCall(0).resolves(0).onCall(1).resolves(1);

      const res = await sdkPool.swap(
        mockPool.domainId,
        mockPool.local.address,
        mockParams.from,
        mockParams.to,
        mockParams.amount,
        mockParams.minDy,
        mockParams.deadline,
      );

      expect(res).to.be.deep.eq(mockRequest);
    });

    it("happy: should work if signerAddress is passed into options", async () => {
      sdkPool.config.signerAddress = undefined;
      const options = {
        signerAddress: mkAddress("0xabc"),
      };

      stub(sdkPool, "getPoolTokenIndex").onCall(0).resolves(0).onCall(1).resolves(1);

      const res = await sdkPool.swap(
        mockPool.domainId,
        mockPool.local.address,
        mockParams.from,
        mockParams.to,
        mockParams.amount,
        mockParams.minDy,
        mockParams.deadline,
        options,
      );

      expect(res).to.not.be.undefined;
    });
  });

  describe("#getPool", () => {
    const mockParams = {
      canonicalId: utils.formatBytes32String("0"),
      connext: mock.contracts.deployments().connext(Number(mock.chain.A)),
    };

    it("happy: should work", async () => {
      stub(sdkPool, "getAssetsData").resolves([mockAssetData, mockAssetData]);
      stub(sdkPool, "getPoolData").resolves([mockPoolData]);

      const res = await sdkPool.getPool(mockPool.domainId, mockPool.local.address);

      expect(res!.domainId).to.equal(mockPool.domainId);
      expect(res!.name).to.equal(mockPool.name);
      expect(res!.symbol).to.equal(mockPool.symbol);
      expect(res!.lpTokenAddress).to.equal(mockPool.lpTokenAddress);
    });
  });

  describe("#calculateAmountReceived", () => {
    const mockAssetData = {
      local: mockPool.local.address,
      adopted: mockPool.adopted.address,
      canonical_id: utils.formatBytes32String("0"),
      canonical_domain: mockPool.domainId,
      domain: mockPool.domainId,
      key: mockPool.canonicalHash,
      id: mockPool.local.address,
    };

    const feeBps = BigNumber.from(+DEFAULT_ROUTER_FEE * 100);

    it("happy: should work with local origin asset and adopted destination asset", async () => {
      stub(sdkPool, "getPool").onCall(0).resolves(undefined).onCall(1).resolves(mockPool);
      (sdkUtilsStub.enoughRouterLiquidity as any).returns(Promise.resolve(true));
      stub(SdkUtils, "create").resolves(sdkUtilsStub);

      const originAmount = BigNumber.from(100_000);
      const originSlippage = "0"; // 0% in BPS

      const destinationAmount = originAmount.sub(originAmount.mul(feeBps).div(10000)); // router takes 0.05%
      const destinationAmountAfterSwap = destinationAmount.mul(9).div(10); // assume swap ate 10%;
      const destinationSlippage = "1000"; // 10% in BPS

      stub(sdkPool, "calculateSwapLocal")
        .onCall(0) // swap once for destination pool
        .resolves(destinationAmountAfterSwap);
      stub(sdkPool, "getCanonicalTokenId").resolves([mockAssetData.canonical_domain, mockAssetData.canonical_id]);
      stub(sdkPool, "getAssetsDataByDomainAndKey").resolves(mockAssetData);

      const res = await sdkPool.calculateAmountReceived(
        mockPool.domainId,
        mockPool.domainId,
        mockPool.local.address,
        originAmount,
        false,
        true
      );

      expect(res.originSlippage.toString()).to.equal(originSlippage);
      expect(res.destinationSlippage.toString()).to.equal(destinationSlippage);
      expect(res.isFastPath).to.be.true;
    });

    it("happy: should work with adopted origin asset and adopted destination asset", async () => {
      stub(sdkPool, "getPool").onCall(0).resolves(mockPool).onCall(1).resolves(mockPool);
      (sdkUtilsStub.enoughRouterLiquidity as any).returns(Promise.resolve(true));
      stub(SdkUtils, "create").resolves(sdkUtilsStub);

      const originAmount = BigNumber.from(100_000);
      const originAmountAfterSwap = originAmount.mul(9).div(10); // assume swap ate 10%
      const originSlippage = "1000"; // 10% in BPS

      const destinationAmount = originAmountAfterSwap.sub(originAmountAfterSwap.mul(feeBps).div(10000)); // router takes 0.05%
      const destinationAmountAfterSwap = destinationAmount.mul(9).div(10); // assume swap ate 10%;
      const destinationSlippage = "1000"; // 10% in BPS

      stub(sdkPool, "calculateSwapLocal")
        .onCall(0) // swap once for origin pool
        .resolves(originAmountAfterSwap)
        .onCall(1) // swap once for destination pool
        .resolves(destinationAmountAfterSwap);
      stub(sdkPool, "getCanonicalTokenId").resolves([mockAssetData.canonical_domain, mockAssetData.canonical_id]);
      stub(sdkPool, "getAssetsDataByDomainAndKey").resolves(mockAssetData);

      const res = await sdkPool.calculateAmountReceived(
        mockPool.domainId,
        mockPool.domainId,
        mockPool.adopted.address,
        originAmount,
        false,
        true
      );

      expect(res.originSlippage.toString()).to.equal(originSlippage);
      expect(res.destinationSlippage.toString()).to.equal(destinationSlippage);
      expect(res.isFastPath).to.be.true;
    });

    it("happy: should work with adopted origin asset and local destination asset", async () => {
      stub(sdkPool, "getPool").onCall(0).resolves(mockPool).onCall(1).resolves(undefined);

      const originAmount = BigNumber.from(100_000);
      const originAmountAfterSwap = originAmount.mul(9).div(10); // assume swap ate 10%
      const originSlippage = "1000"; // 10% in BPS
      const destinationSlippage = "0"; // 0% in BPS

      stub(sdkPool, "calculateSwapLocal")
        .onCall(0) // swap once for origin pool
        .resolves(originAmountAfterSwap);
      stub(sdkPool, "getCanonicalTokenId").resolves([mockAssetData.canonical_domain, mockAssetData.canonical_id]);
      stub(sdkPool, "getAssetsDataByDomainAndKey").resolves(mockAssetData);

      const res = await sdkPool.calculateAmountReceived(
        mockPool.domainId,
        mockPool.domainId,
        mockPool.adopted.address,
        originAmount,
        true,
      );

      expect(res.originSlippage.toString()).to.equal(originSlippage);
      expect(res.destinationSlippage.toString()).to.equal(destinationSlippage);
    });

    it("happy: should work with local origin asset and local destination asset", async () => {
      stub(sdkPool, "getPool").onCall(0).resolves(undefined).onCall(1).resolves(undefined);

      const originAmount = BigNumber.from(100_000);
      const originSlippage = "0"; // 0% in BPS
      const destinationSlippage = "0"; // 0% in BPS

      stub(sdkPool, "getCanonicalTokenId").resolves([mockAssetData.canonical_domain, mockAssetData.canonical_id]);
      stub(sdkPool, "getAssetsDataByDomainAndKey").resolves(mockAssetData);

      const res = await sdkPool.calculateAmountReceived(
        mockPool.domainId,
        mockPool.domainId,
        mockPool.local.address,
        originAmount,
        true,
      );

      expect(res.originSlippage.toString()).to.equal(originSlippage);
      expect(res.destinationSlippage.toString()).to.equal(destinationSlippage);
    });

    it("happy: should work with local origin asset and adopted destination asset, 6 and 18 decimals respectively", async () => {
      (sdkUtilsStub.enoughRouterLiquidity as any).returns(Promise.resolve(true));
      stub(SdkUtils, "create").resolves(sdkUtilsStub);

      const localAsset6Decimals = { ...localAsset, decimals: 6 };
      const adoptedAsset18Decimals = { ...adoptedAsset, decimals: 18 };
      const mockPoolDifferentDecimals = {
        ...mockPool,
        local: localAsset6Decimals,
        adopted: adoptedAsset18Decimals,
      };

      // return destination pool
      stub(sdkPool, "getPool").onCall(0).resolves(undefined).onCall(1).resolves(mockPoolDifferentDecimals);

      const originAmount = BigNumber.from(100_000);
      const originSlippage = "0"; // 0% in BPS

      const originAmountAfterRouterFee = originAmount.sub(originAmount.mul(feeBps).div(10000)); // router takes 0.05%

      const destinationAmountAfterSwap = originAmountAfterRouterFee.mul(9).div(10); // assume swap ate 10%;
      const destinationAmountAfterSwapConverted = destinationAmountAfterSwap.mul(BigNumber.from(10).pow(12)); // to 18 decimals
      const destinationSlippage = "1000"; // 10% in BPS

      stub(sdkPool, "calculateSwapLocal")
        .onCall(0) // swap once for destination pool
        .resolves(destinationAmountAfterSwapConverted);
      stub(sdkPool, "getCanonicalTokenId").resolves([mockAssetData.canonical_domain, mockAssetData.canonical_id]);
      stub(sdkPool, "getAssetsDataByDomainAndKey").resolves(mockAssetData);

      const res = await sdkPool.calculateAmountReceived(
        mockPoolDifferentDecimals.domainId,
        mockPoolDifferentDecimals.domainId,
        mockPoolDifferentDecimals.local.address,
        originAmount,
        false,
        true
      );

      expect(res.originSlippage.toString()).to.equal(originSlippage);
      expect(res.destinationSlippage.toString()).to.equal(destinationSlippage);
      expect(res.isFastPath).to.be.true;
    });

    it("happy: should work with adopted origin asset and local destination asset, 18 and 6 decimals respectively", async () => {
      const localAsset6Decimals = { ...localAsset, decimals: 6 };
      const adoptedAsset18Decimals = { ...adoptedAsset, decimals: 18 };
      const mockPoolDifferentDecimals = {
        ...mockPool,
        local: localAsset6Decimals,
        adopted: adoptedAsset18Decimals,
      };

      // return origin pool
      stub(sdkPool, "getPool").onCall(0).resolves(mockPoolDifferentDecimals).onCall(1).resolves(undefined);

      const originAmount = BigNumber.from(10).pow(18);
      const originAmountAfterSwap = originAmount.mul(9).div(10); // assume swap ate 10%
      const originAmountAfterSwapConverted = originAmountAfterSwap.div(BigNumber.from(10).pow(12)); // to 6 decimals
      const originSlippage = "1000"; // 10% in BPS
      const destinationSlippage = "0"; // 0% in BPS

      stub(sdkPool, "calculateSwapLocal")
        .onCall(0) // swap once for origin pool
        .resolves(originAmountAfterSwapConverted);
      stub(sdkPool, "getCanonicalTokenId").resolves([mockAssetData.canonical_domain, mockAssetData.canonical_id]);
      stub(sdkPool, "getAssetsDataByDomainAndKey").resolves(mockAssetData);

      const res = await sdkPool.calculateAmountReceived(
        mockPoolDifferentDecimals.domainId,
        mockPoolDifferentDecimals.domainId,
        mockPoolDifferentDecimals.adopted.address,
        originAmount,
      );

      expect(res.originSlippage.toString()).to.equal(originSlippage);
      expect(res.destinationSlippage.toString()).to.equal(destinationSlippage);
    });
  });

  describe("#getUserPools", () => {
    it("happy: should return all pools that a user has LP tokens in", async () => {
      const userAddress = "0x01".padEnd(42, "0");

      stub(sdkPool, "getAssetsData").resolves([mockAssetData, mockAssetData]);
      stub(sdkPool, "getPool").resolves(mockPool);
      stub(sdkPool, "getTokenUserBalance")
        .onCall(0) // LP token amount for pool 1
        .resolves(BigNumber.from(100))
        .onCall(1) // adopted token amount for pool 1
        .resolves(BigNumber.from(0))
        .onCall(2) // local token amount for pool 1
        .resolves(BigNumber.from(0))
        .onCall(3) // LP token amount for pool 2
        .resolves(BigNumber.from(100))
        .onCall(4) // adopted token amount for pool 2
        .resolves(BigNumber.from(0))
        .onCall(5) // local token amount for pool 2
        .resolves(BigNumber.from(0));

      const res = await sdkPool.getUserPools(mockPool.domainId, userAddress);

      expect(res).to.have.lengthOf(1);
    });

    it("happy: should not return any pools if a user doesn't have LP tokens", async () => {
      const userAddress = "0x01".padEnd(42, "0");

      stub(sdkPool, "getAssetsData").resolves([mockAssetData]);
      stub(sdkPool, "getPool").resolves(mockPool);
      stub(sdkPool, "getTokenUserBalance")
        .onCall(0) // LP token amount
        .resolves(BigNumber.from(0))
        .onCall(1) // adopted token amount
        .resolves(BigNumber.from(0))
        .onCall(2) // local token amount
        .resolves(BigNumber.from(0));

      const res = await sdkPool.getUserPools(mockPool.domainId, userAddress);

      expect(res).to.have.lengthOf(0);
    });

    it("happy: should log info if no pool found for asset", async () => {
      const userAddress = "0x01".padEnd(42, "0");

      stub(sdkPool, "getAssetsData").resolves([mockAssetData]);
      stub(sdkPool, "getPool").resolves(undefined);

      const loggerInfoSpy = spy(sdkPool.logger, "info");

      const res = await sdkPool.getUserPools(mockPool.domainId, userAddress);

      expect(res).to.have.lengthOf(0);
      expect(loggerInfoSpy).to.have.been.calledWith(
        "No pool for asset",
        match.any,
        match.any,
        match({ data: mockAssetData }),
      );

      loggerInfoSpy.restore();
    });

    it("should log error if an error occurs while processing assetData", async () => {
      const userAddress = "0x01".padEnd(42, "0");

      stub(sdkPool, "getAssetsData").resolves([mockAssetData]);
      stub(sdkPool, "getPool").throws(new Error("Some error"));

      const loggerErrorSpy = spy(sdkPool.logger, "error");

      const res = await sdkPool.getUserPools(mockPool.domainId, userAddress);

      expect(res).to.have.lengthOf(0);
      expect(loggerErrorSpy).to.have.been.calledOnceWithExactly(
        "Error while processing assetData",
        match.object, // requestContext
        match.object, // methodContext
        match.object, // Error object
      );

      loggerErrorSpy.restore();
    });
  });

  describe("#calculateSwap", () => {
    it("happy: should work", async () => {
      const mockConnext = {
        calculateSwap: function () {
          return "100";
        },
      };

      stub(sdkPool, "getConnext").resolves(mockConnext as any);
      stub(sdkPool, "getCanonicalTokenId").resolves([mockPool.domainId, mockPool.adopted.address]);

      const res = await sdkPool.calculateSwap(mockPool.domainId, mockPool.local.address, 0, 1, 100);

      expect(res.toString()).to.equal("100");
    });
  });

  describe("#calculateTokenAmount", () => {
    it("happy: should work", async () => {
      const mockConnext = {
        calculateSwapTokenAmount: function () {
          return "100";
        },
      };

      stub(sdkPool, "getConnext").resolves(mockConnext as any);
      stub(sdkPool, "getCanonicalTokenId").resolves([mockPool.domainId, mockPool.adopted.address]);

      const res = await sdkPool.calculateTokenAmount(mockPool.domainId, mockPool.local.address, ["10", "10"]);

      expect(res.toString()).to.equal("100");
    });
  });

  describe("#calculateRemoveSwapLiquidity", () => {
    it("happy: should work", async () => {
      const mockConnext = {
        calculateRemoveSwapLiquidity: function () {
          return ["100", "100"];
        },
      };

      stub(sdkPool, "getConnext").resolves(mockConnext as any);
      stub(sdkPool, "getCanonicalTokenId").resolves([mockPool.domainId, mockPool.adopted.address]);

      const res = await sdkPool.calculateRemoveSwapLiquidity(mockPool.domainId, mockPool.local.address, "10");

      expect(res).to.deep.equal([BigNumber.from("100"), BigNumber.from("100")]);
    });
  });

  describe("#calculateRemoveSwapLiquidityOneToken", () => {
    it("happy: should work", async () => {
      const mockConnext = {
        calculateRemoveSwapLiquidityOneToken: function () {
          return ["100", "100"];
        },
      };

      stub(sdkPool, "getConnext").resolves(mockConnext as any);
      stub(sdkPool, "getCanonicalTokenId").resolves([mockPool.domainId, mockPool.adopted.address]);

      const res = await sdkPool.calculateRemoveSwapLiquidityOneToken(
        mockPool.domainId,
        mockPool.local.address,
        "10",
        0,
      );

      expect(res).to.deep.equal(["100", "100"]);
    });
  });

  describe("#calculatePriceImpact", () => {
    const mockParams = {
      totalReservesIn: BigNumber.from("100"),
      lpTokensOut: BigNumber.from("101"),
      totalReservesOut: BigNumber.from("101"),
      lpTokensIn: BigNumber.from("100"),
      virtualPrice: BigNumber.from(10).pow(18),
      rate: BigNumber.from("100"),
      marketRate: BigNumber.from("101"),
    };

    it("happy: should work with deposits", async () => {
      const res = await sdkPool.calculatePriceImpact(
        mockParams.totalReservesIn,
        mockParams.lpTokensOut,
        mockParams.virtualPrice,
      );

      expect(res.toString()).to.equal(BigNumber.from(10).pow(16).toString());
    });

    it("happy: should work with withdrawals", async () => {
      const res = await sdkPool.calculatePriceImpact(
        mockParams.lpTokensIn,
        mockParams.totalReservesOut,
        mockParams.virtualPrice,
        false,
      );

      expect(res.toString()).to.equal(BigNumber.from(10).pow(16).toString());
    });

    it("happy: should work with swaps", async () => {
      const res = await sdkPool.calculatePriceImpact(mockParams.rate, mockParams.marketRate);

      expect(res.toString()).to.equal(BigNumber.from("10000000000000000").toString());
    });

    it("should return 0 when amounts are 0", async () => {
      const res = await sdkPool.calculatePriceImpact(BigNumber.from(0), BigNumber.from(0), mockParams.virtualPrice);

      expect(res.toString()).to.equal(BigNumber.from("0").toString());
    });
  });

  describe("#calculateAddLiquidityPriceImpact", () => {
    it("happy: should work", async () => {
      stub(sdkPool, "getVirtualPrice").resolves(BigNumber.from("20"));
      stub(sdkPool, "calculateTokenAmount").resolves(BigNumber.from("10"));
      stub(sdkPool, "getPool").resolves(mockPool);

      const res = await sdkPool.calculateAddLiquidityPriceImpact(mockPool.domainId, mockPool.local.address, "10", "10");

      expect(res?.toString()).to.equal(
        (
          await sdkPool.calculatePriceImpact(BigNumber.from("20"), BigNumber.from("10"), BigNumber.from("20"), true)
        ).toString(),
      );
    });

    it("should return undefined when pool is not exist", async () => {
      stub(sdkPool, "getVirtualPrice").resolves(BigNumber.from("20"));
      stub(sdkPool, "calculateTokenAmount").resolves(BigNumber.from("10"));
      stub(sdkPool, "getPool").resolves(undefined);

      const res = await sdkPool.calculateAddLiquidityPriceImpact(mockPool.domainId, mockPool.local.address, "10", "10");
      expect(res).to.be.undefined;
    });
  });

  describe("#calculateRemoveLiquidityPriceImpact", () => {
    it("happy: should work", async () => {
      stub(sdkPool, "getVirtualPrice").resolves(BigNumber.from("20"));
      stub(sdkPool, "calculateTokenAmount").resolves(BigNumber.from("10"));
      stub(sdkPool, "getPool").resolves(mockPool);

      const res = await sdkPool.calculateRemoveLiquidityPriceImpact(
        mockPool.domainId,
        mockPool.local.address,
        "10",
        "10",
      );

      expect(res?.toString()).to.equal(
        (
          await sdkPool.calculatePriceImpact(BigNumber.from("10"), BigNumber.from("20"), BigNumber.from("20"), false)
        ).toString(),
      );
    });

    it("should return undefined when pool is not exist", async () => {
      stub(sdkPool, "getVirtualPrice").resolves(BigNumber.from("20"));
      stub(sdkPool, "calculateTokenAmount").resolves(BigNumber.from("10"));
      stub(sdkPool, "getPool").resolves(undefined);

      const res = await sdkPool.calculateRemoveLiquidityPriceImpact(
        mockPool.domainId,
        mockPool.local.address,
        "10",
        "10",
      );
      expect(res).to.be.undefined;
    });
  });

  describe("#getTokenPrice", () => {
    it("happy: should return USDC price", async () => {
      const price = await sdkPool.getTokenPrice("USDC");
      expect(price).gt(0);
      expect(price).lt(2);
    });

    it("happy: should return OP price", async () => {
      const price = await sdkPool.getTokenPrice("OP");
      expect(price).gt(0);
      expect(price).lt(20);
    });
  });

  describe("#getYieldStatsForDay", () => {
    it("should return undefined if no pool is found", async () => {
      const mockParams = {
        canonicalId: utils.formatBytes32String("0"),
      };

      stub(sdkPool, "getConnext").resolves(undefined);
      stub(sdkPool, "getCanonicalTokenId").resolves([mock.domain.A, mockParams.canonicalId]);

      const result = await sdkPool.getYieldStatsForDays(mock.domain.A, constants.AddressZero, 1675394597, 1);

      expect(result).to.be.undefined;
    });

    it("happy: should calculate yield stats for 1 day using hourly swap volume", async () => {
      const domainId = "13337";
      const tokenAddress = constants.AddressZero;
      const unixTimestamp = 1675394597;
      const days = 1;

      const hourlySwapVolumeStub = stub(sdkPool, "getHourlySwapVolume").resolves([]);
      stub(sdkPool, "getPool").resolves(mockPool);

      await sdkPool.getYieldStatsForDays(domainId, tokenAddress, unixTimestamp, days);

      expect(hourlySwapVolumeStub).to.have.been.calledOnceWithExactly({
        key: mockPool.canonicalHash,
        domainId: mockPool.domainId,
        endTimestamp: unixTimestamp,
        range: { limit: 24 },
      });
    });

    it("happy: should calculate yield stats for more than 1 day using daily swap volume", async () => {
      const domainId = "13337";
      const tokenAddress = constants.AddressZero;
      const unixTimestamp = 1675394597;
      const days = 10;

      const dailySwapVolumeStub = stub(sdkPool, "getDailySwapVolume").resolves([]);
      stub(sdkPool, "getPool").resolves(mockPool);

      await sdkPool.getYieldStatsForDays(domainId, tokenAddress, unixTimestamp, days);

      expect(dailySwapVolumeStub).to.have.been.calledOnceWithExactly({
        key: mockPool.canonicalHash,
        domainId: mockPool.domainId,
        endTimestamp: unixTimestamp,
        range: { limit: days },
      });
    });

    it("should throw ParamsInvalid if days is less than 1", async () => {
      const domainId = "13337";
      const tokenAddress = constants.AddressZero;
      const unixTimestamp = 1675394597;
      const days = 0;

      await expect(sdkPool.getYieldStatsForDays(domainId, tokenAddress, unixTimestamp, days)).to.be.rejectedWith(
        ParamsInvalid,
      );
    });
  });

  describe("#calculateYield", () => {
    it("happy: should return the correct apr, apy", async () => {
      const yieldData = await sdkPool.calculateYield(1, 10000, 1);

      expect(yieldData.apr).closeTo(0.0365, 0.001);
      expect(yieldData.apy).closeTo(0.03706870443, 0.001);
    });
  });

  describe("#getYieldData", () => {
    it("happy: should return the correct apr, apy", async () => {
      const domainId = "13337";
      const tokenAddress = constants.AddressZero;
      const days = 1;
      const yieldStats = {
        totalFeesFormatted: 1,
        totalLiquidityFormatted: 10000,
        totalVolume: BigNumber.from(100),
        totalVolumeFormatted: 100,
      };

      stub(sdkPool, "getYieldStatsForDays").resolves(yieldStats);

      const yieldData = await sdkPool.getYieldData(domainId, tokenAddress, days);

      expect(yieldData).to.not.be.undefined;
      expect(yieldData!.apr).closeTo(0.0365, 0.001);
      expect(yieldData!.apy).closeTo(0.03706870443, 0.001);
    });
  });

  describe("#getLiquidityMiningAprPerPool", () => {
    it("happy: should return the correct APR", async () => {
      const apr = await sdkPool.getLiquidityMiningAprPerPool(250_000, 657_436, 2, "USDC", 1_000_000);
      // should be about 50% APR
      expect(apr).gt(0.45);
      expect(apr).lessThan(0.55);
    });
  });

  describe("#getTokenSwapEvents", () => {
    it("happy: should work with key", async () => {
      (sdkPool as any).config.cartographerUrl = config.cartographerUrl;
      const res = await sdkPool.getTokenSwapEvents({
        key: mockConfig.signerAddress,
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with buyer", async () => {
      (sdkPool as any).config.cartographerUrl = config.cartographerUrl;
      const res = await sdkPool.getTokenSwapEvents({
        buyer: getRandomBytes32(),
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with transactionHash", async () => {
      (sdkPool as any).config.cartographerUrl = config.cartographerUrl;
      const res = await sdkPool.getTokenSwapEvents({
        transactionHash: getRandomBytes32(),
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with range", async () => {
      (sdkPool as any).config.cartographerUrl = config.cartographerUrl;
      const res = await sdkPool.getTokenSwapEvents({
        range: {
          limit: 100,
          offset: 20,
        },
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with all params", async () => {
      (sdkPool as any).config.cartographerUrl = config.cartographerUrl;
      const res = await sdkPool.getTokenSwapEvents({
        key: getRandomBytes32(),
        buyer: getRandomBytes32(),
        transactionHash: getRandomBytes32(),
        range: {
          limit: 100,
          offset: 20,
        },
      });

      expect(res).to.not.be.undefined;
    });

    it("should error if validateUri fails", async () => {
      (sdkPool as any).config.cartographerUrl = "invalidUrl";

      await expect(sdkPool.getTokenSwapEvents({})).to.be.rejectedWith(UriInvalid);
    });
  });

  describe("#getPoolData", () => {
    it("happy: should work with key", async () => {
      (sdkPool as any).config.cartographerUrl = config.cartographerUrl;
      const res = await sdkPool.getPoolData({
        key: mockConfig.signerAddress,
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with domainId", async () => {
      (sdkPool as any).config.cartographerUrl = config.cartographerUrl;
      const res = await sdkPool.getPoolData({
        domainId: getRandomBytes32(),
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with lpTokenAddress", async () => {
      (sdkPool as any).config.cartographerUrl = config.cartographerUrl;
      const res = await sdkPool.getPoolData({
        lpTokenAddress: getRandomBytes32(),
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with all params", async () => {
      (sdkPool as any).config.cartographerUrl = config.cartographerUrl;
      const res = await sdkPool.getPoolData({
        key: getRandomBytes32(),
        domainId: getRandomBytes32(),
        lpTokenAddress: getRandomBytes32(),
      });

      expect(res).to.not.be.undefined;
    });

    it("should error if validateUri fails", async () => {
      (sdkPool as any).config.cartographerUrl = "invalidUrl";

      await expect(sdkPool.getPoolData({})).to.be.rejectedWith(UriInvalid);
    });
  });

  describe("#getHourlySwapVolume", () => {
    it("happy: should work with key", async () => {
      (sdkPool as any).config.cartographerUrl = config.cartographerUrl;
      const res = await sdkPool.getHourlySwapVolume({
        key: mockConfig.signerAddress,
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with domainId", async () => {
      (sdkPool as any).config.cartographerUrl = config.cartographerUrl;
      const res = await sdkPool.getHourlySwapVolume({
        domainId: mock.domain.A,
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with startTimestamp", async () => {
      (sdkPool as any).config.cartographerUrl = config.cartographerUrl;
      const res = await sdkPool.getHourlySwapVolume({
        startTimestamp: new Date().valueOf(),
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with endTimestamp", async () => {
      (sdkPool as any).config.cartographerUrl = config.cartographerUrl;
      const res = await sdkPool.getHourlySwapVolume({
        endTimestamp: new Date().valueOf(),
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with range", async () => {
      (sdkPool as any).config.cartographerUrl = config.cartographerUrl;
      const res = await sdkPool.getHourlySwapVolume({
        range: {
          limit: 100,
          offset: 20,
        },
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with all params", async () => {
      (sdkPool as any).config.cartographerUrl = config.cartographerUrl;
      const res = await sdkPool.getHourlySwapVolume({
        key: getRandomBytes32(),
        domainId: mock.domain.A,
        startTimestamp: new Date().valueOf(),
        endTimestamp: new Date().valueOf(),
        range: {
          limit: 100,
          offset: 20,
        },
      });

      expect(res).to.not.be.undefined;
    });

    it("should error if validateUri fails", async () => {
      (sdkPool as any).config.cartographerUrl = "invalidUrl";

      await expect(sdkPool.getHourlySwapVolume({})).to.be.rejectedWith(UriInvalid);
    });
  });

  describe("#getDailySwapVolume", () => {
    it("happy: should work with key", async () => {
      (sdkPool as any).config.cartographerUrl = config.cartographerUrl;
      const res = await sdkPool.getDailySwapVolume({
        key: mockConfig.signerAddress,
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with domainId", async () => {
      (sdkPool as any).config.cartographerUrl = config.cartographerUrl;
      const res = await sdkPool.getDailySwapVolume({
        domainId: mock.domain.A,
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with startTimestamp", async () => {
      (sdkPool as any).config.cartographerUrl = config.cartographerUrl;
      const res = await sdkPool.getDailySwapVolume({
        startTimestamp: new Date().valueOf(),
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with endTimestamp", async () => {
      (sdkPool as any).config.cartographerUrl = config.cartographerUrl;
      const res = await sdkPool.getDailySwapVolume({
        endTimestamp: new Date().valueOf(),
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with range", async () => {
      (sdkPool as any).config.cartographerUrl = config.cartographerUrl;
      const res = await sdkPool.getDailySwapVolume({
        range: {
          limit: 100,
          offset: 20,
        },
      });

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with all params", async () => {
      (sdkPool as any).config.cartographerUrl = config.cartographerUrl;
      const res = await sdkPool.getDailySwapVolume({
        key: getRandomBytes32(),
        domainId: mock.domain.A,
        startTimestamp: new Date().valueOf(),
        endTimestamp: new Date().valueOf(),
        range: {
          limit: 100,
          offset: 20,
        },
      });

      expect(res).to.not.be.undefined;
    });

    it("should error if validateUri fails", async () => {
      (sdkPool as any).config.cartographerUrl = "invalidUrl";

      await expect(sdkPool.getDailySwapVolume({})).to.be.rejectedWith(UriInvalid);
    });
  });

  describe("#scientificToBigInt", () => {
    it("happy: should work", async () => {
      expect(sdkPool.scientificToBigInt("1e5")).to.be.equal(BigInt("100000"));
      expect(sdkPool.scientificToBigInt("1.3e5")).to.be.equal(BigInt("130000"));
      expect(sdkPool.scientificToBigInt("1e0")).to.be.equal(BigInt("1"));
      expect(sdkPool.scientificToBigInt("10")).to.be.equal(BigInt("10"));
      expect(sdkPool.scientificToBigInt("1.0e0")).to.be.equal(BigInt("1"));
    });
  });
});
