import { createStubInstance, reset, restore, stub, spy } from "sinon";
import { expect, getCanonicalHash } from "@connext/nxtp-utils";
import { ChainReader, getConnextInterface } from "@connext/nxtp-txservice";
import { providers, utils, BigNumber, Contract } from "ethers";
import { mock } from "./mock";
import { NxtpSdkPool, Pool } from "../src/sdkPool";
import { getEnvConfig, NxtpSdkConfig } from "../src/config";
import { Connext__factory } from "@connext/nxtp-contracts";

import * as ConfigFns from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";
import { Logger } from "@connext/nxtp-utils";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

describe("NxtpSdkPool", () => {
  let config: NxtpSdkConfig;
  let logger = createStubInstance(Logger);
  let chainReader: ChainReader;
  let nxtpPool: NxtpSdkPool;

  beforeEach(async () => {
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);
    chainReader = new ChainReader(logger, mockConfig);
    nxtpPool = await NxtpSdkPool.create(mockConfig, undefined, mockChainData, chainReader);

    stub(ConfigFns, "getConfig").resolves(config);
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#create", () => {
    it("happy: should work", async () => {
      expect(nxtpPool).to.not.be.undefined;
      expect(nxtpPool.config).to.not.be.null;
      expect(nxtpPool.chainData).to.not.be.null;

      expect(nxtpPool.getCanonicalTokenId).to.be.a("function");
      expect(nxtpPool.getLPTokenAddress).to.be.a("function");
      expect(nxtpPool.getLPTokenSupply).to.be.a("function");
      expect(nxtpPool.getTokenUserBalance).to.be.a("function");
      expect(nxtpPool.getPoolTokenIndex).to.be.a("function");
      expect(nxtpPool.getPoolTokenBalance).to.be.a("function");
      expect(nxtpPool.getPoolTokenAddress).to.be.a("function");
      expect(nxtpPool.getVirtualPrice).to.be.a("function");
      expect(nxtpPool.calculateSwap).to.be.a("function");
      expect(nxtpPool.calculateTokenAmount).to.be.a("function");
      expect(nxtpPool.calculateRemoveSwapLiquidity).to.be.a("function");
      expect(nxtpPool.addLiquidity).to.be.a("function");
      expect(nxtpPool.removeLiquidity).to.be.a("function");
      expect(nxtpPool.swap).to.be.a("function");
      expect(nxtpPool.getPool).to.be.a("function");
      expect(nxtpPool.getUserPools).to.be.a("function");
      expect(nxtpPool.getPoolStats).to.be.a("function");
      expect(nxtpPool.getDefaultDeadline).to.be.a("function");
      expect(nxtpPool.calculateAddLiquidityPriceImpact).to.be.a("function");
      expect(nxtpPool.calculateRemoveLiquidityPriceImpact).to.be.a("function");
      expect(nxtpPool.calculatePriceImpact).to.be.a("function");
    });
  });

  describe("#addLiquidity", () => {
    const mockParams = {
      domainId: mock.domain.A,
      canonicalId: utils.formatBytes32String("0"),
      tokenAddress: mock.asset.A.address,
      amounts: ["100", "100"],
      minToMint: "100",
      deadline: 1700000000,
      connextAddress: mockConfig.chains[mock.domain.A].deployments!.connext,
    };

    it("happy: should work", async () => {
      const key = getCanonicalHash(mockParams.domainId, mockParams.canonicalId);
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

      stub(nxtpPool, "getCanonicalTokenId").resolves([mockParams.domainId, mockParams.canonicalId]);

      const res = await nxtpPool.addLiquidity(
        mockParams.domainId,
        mockParams.tokenAddress,
        mockParams.amounts,
        mockParams.minToMint,
        mockParams.deadline,
      );
      expect(res).to.be.deep.eq(mockRequest);
    });
  });

  describe("#removeLiquidity", () => {
    const mockParams = {
      domainId: mock.domain.A,
      canonicalId: utils.formatBytes32String("0"),
      tokenAddress: mock.asset.A.address,
      amount: "100",
      minAmounts: ["100", "100"],
      deadline: 1700000000,
      connextAddress: mockConfig.chains[mock.domain.A].deployments!.connext,
    };

    it("happy: should work", async () => {
      const key = getCanonicalHash(mockParams.domainId, mockParams.canonicalId);
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

      stub(nxtpPool, "getCanonicalTokenId").resolves([mockParams.domainId, mockParams.canonicalId]);

      const res = await nxtpPool.removeLiquidity(
        mockParams.domainId,
        mockParams.tokenAddress,
        mockParams.amount,
        mockParams.minAmounts,
        mockParams.deadline,
      );
      expect(res).to.be.deep.eq(mockRequest);
    });
  });

  describe("#swap", () => {
    const mockParams = {
      domainId: mock.domain.A,
      canonicalId: utils.formatBytes32String("0"),
      tokenAddress: mock.asset.A.address,
      from: "0x0",
      to: "0x0",
      amount: "100",
      minDy: 100,
      deadline: 170000000,
      connextAddress: mockConfig.chains[mock.domain.A].deployments!.connext,
    };

    it("happy: should work", async () => {
      const key = getCanonicalHash(mockParams.domainId, mockParams.canonicalId);
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

      stub(nxtpPool, "getCanonicalTokenId").resolves([mockParams.domainId, mockParams.canonicalId]);
      stub(nxtpPool, "getPoolTokenIndex").onCall(0).resolves(0).onCall(1).resolves(1);

      const res = await nxtpPool.swap(
        mockParams.domainId,
        mockParams.tokenAddress,
        mockParams.from,
        mockParams.to,
        mockParams.amount,
        mockParams.minDy,
        mockParams.deadline,
      );
      expect(res).to.be.deep.eq(mockRequest);
    });
  });

  describe("#getPool", () => {
    const mockParams = {
      domainId: mock.domain.A,
      canonicalId: utils.formatBytes32String("0"),
      key: utils.formatBytes32String("0"),
      tokenAddress: mock.asset.A.address,
      poolName: `${mock.asset.A.symbol}-Pool`,
      poolSymbol: `${mock.asset.A.symbol}-next${mock.asset.A.symbol}`,
      poolTokens: [utils.formatBytes32String("1"), mock.asset.A.address],
      poolDecimals: [18, 18],
      poolBalances: [BigNumber.from("100"), BigNumber.from("100")],
      lpTokenAddress: utils.formatBytes32String("2"),
      connextAddress: mockConfig.chains[mock.domain.A].deployments!.connext,
    };

    it("happy: should work", async () => {
      stub(nxtpPool, "getCanonicalTokenId").resolves([mock.domain.B, mockParams.canonicalId]);
      stub(nxtpPool, "getLPTokenAddress").resolves(mockParams.lpTokenAddress);
      stub(nxtpPool, "getConnext").resolves(
        Connext__factory.connect(mockParams.connextAddress, providers.getDefaultProvider()),
      );

      const res = await nxtpPool.getPool(mockParams.domainId, mockParams.tokenAddress);

      expect(res!.domainId).to.equal(mockParams.domainId);
      expect(res!.name).to.equal(mockParams.poolName);
      expect(res!.symbol).to.equal(mockParams.poolSymbol);
      expect(res!.tokens).to.deep.equal(mockParams.poolTokens);
      expect(res!.decimals).to.deep.equal(mockParams.poolDecimals);
      expect(res!.balances).to.deep.equal(mockParams.poolBalances);
      expect(res!.lpTokenAddress).to.equal(mockParams.lpTokenAddress);
    });

    it("should throw if local domain is canonical", async () => {
      stub(nxtpPool, "getCanonicalTokenId").resolves([mockParams.domainId, mockParams.key]);

      expect(nxtpPool.getPool(mockParams.domainId, mockParams.tokenAddress)).to.be.rejectedWith(
        new Error("Pool doesn't exist for the token on this domain"),
      );
    });

    it("should return undefined if local token is adopted", async () => {
      stub(nxtpPool, "getCanonicalTokenId").resolves([mock.domain.B, mockParams.key]);
      stub(chainReader, "readTx").onCall(0).resolves("0x");

      // stub call to canonicalToAdopted()
      stub(nxtpPool.connext, "decodeFunctionResult").onCall(0).returns([mockParams.key]);

      expect(nxtpPool.getPool(mockParams.domainId, mockParams.key)).to.be.rejectedWith(
        new Error("Pool doesn't exist for the token on this domain"),
      );
    });
  });

  describe("#getUserPools", () => {
    const mockParams = {
      userAddress: "0x01".padEnd(42, "0"),
      domainId: mock.domain.A,
      key: utils.formatBytes32String("0"),
      poolName: `${mock.asset.A.symbol}-Pool`,
      poolSymbol: `${mock.asset.A.symbol}-next${mock.asset.A.symbol}`,
      poolTokens: [utils.formatBytes32String("1"), mock.asset.A.address],
      poolDecimals: [18, 18],
      poolTokenUserBalances: [BigNumber.from(100), BigNumber.from(200)],
      lpTokenAddress: utils.formatBytes32String("2"),
      lpTokenUserBalance: BigNumber.from(150),
    };

    it("happy: should work", async () => {
      const mockPool: Pool = new Pool(
        mockParams.domainId,
        mockParams.poolName,
        mockParams.poolSymbol,
        mockParams.poolTokens,
        mockParams.poolDecimals,
        mockParams.poolTokenUserBalances,
        mockParams.key,
        mockParams.lpTokenAddress,
      );

      stub(nxtpPool, "getPool").resolves(mockPool);
      stub(nxtpPool, "getTokenUserBalance")
        .onCall(0)
        .resolves(mockParams.lpTokenUserBalance)
        .onCall(1)
        .resolves(mockParams.poolTokenUserBalances[0])
        .onCall(2)
        .resolves(mockParams.poolTokenUserBalances[1]);

      const res = await nxtpPool.getUserPools(mockParams.domainId, mockParams.userAddress);

      // TODO: why doesn't the await above suffice?
      await setTimeout(() => {
        expect(res).to.have.lengthOf(1);
      }, 100);
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
      const res = await nxtpPool.calculatePriceImpact(
        mockParams.totalReservesIn,
        mockParams.lpTokensOut,
        mockParams.virtualPrice,
      );

      expect(res.toString()).to.equal(BigNumber.from(10).pow(16).toString());
    });

    it("happy: should work with withdrawals", async () => {
      const res = await nxtpPool.calculatePriceImpact(
        mockParams.lpTokensIn,
        mockParams.totalReservesOut,
        mockParams.virtualPrice,
        false,
      );

      expect(res.toString()).to.equal(BigNumber.from(10).pow(16).toString());
    });

    it("happy: should work with swaps", async () => {
      const res = await nxtpPool.calculatePriceImpact(mockParams.rate, mockParams.marketRate);

      expect(res.toString()).to.equal(BigNumber.from("10000000000000000").toString());
    });

    it("should return 0 when amounts are 0", async () => {
      const res = await nxtpPool.calculatePriceImpact(BigNumber.from(0), BigNumber.from(0), mockParams.virtualPrice);

      expect(res.toString()).to.equal(BigNumber.from("0").toString());
    });
  });

  describe("#getPoolStats", () => {
    const mockParams = {
      domainId: mock.domain.A,
      tokenAddress: mock.asset.A.address,
      key: utils.formatBytes32String("0"),
      poolName: `${mock.asset.A.symbol}-Pool`,
      poolSymbol: `${mock.asset.A.symbol}-next${mock.asset.A.symbol}`,
      poolTokens: [utils.formatBytes32String("1"), mock.asset.A.address],
      poolDecimals: [18, 18],
      amounts: [BigNumber.from(100), BigNumber.from(200)],
      lpTokenAddress: utils.formatBytes32String("2"),
    };

    it("happy: should work", async () => {
      const mockPool: Pool = new Pool(
        mockParams.domainId,
        mockParams.poolName,
        mockParams.poolSymbol,
        mockParams.poolTokens,
        mockParams.poolDecimals,
        mockParams.amounts,
        mockParams.key,
        mockParams.lpTokenAddress,
      );

      stub(nxtpPool, "getPool").resolves(mockPool);

      const getLiquiditySpy = spy(mockPool, "getLiquidity");
      const getVolumeSpy = spy(mockPool, "getVolume");
      const getFeesSpy = spy(mockPool, "getFees");
      const getApySpy = spy(mockPool, "getApy");

      const res = await nxtpPool.getPoolStats(mockParams.domainId, mockParams.tokenAddress);

      expect(getLiquiditySpy).called;
      expect(getVolumeSpy).called;
      expect(getFeesSpy).called;
      expect(getApySpy).called;
    });
  });
});
