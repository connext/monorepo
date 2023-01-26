import { reset, restore, stub, spy } from "sinon";
import { expect, getCanonicalHash, DEFAULT_ROUTER_FEE } from "@connext/nxtp-utils";
import { getConnextInterface } from "@connext/nxtp-txservice";
import { providers, utils, BigNumber, Contract, constants } from "ethers";
import { mock } from "./mock";
import { SdkPool } from "../src/sdkPool";
import { PoolAsset, Pool } from "../src/interfaces";
import { getEnvConfig } from "../src/config";
import { Connext } from "@connext/smart-contracts";

import * as ConfigFns from "../src/config";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

describe("SdkPool", () => {
  let nxtpPool: SdkPool;
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
    name: `TSTA-Pool`,
    symbol: `TSTA-TSTA`,
    local: localAsset,
    adopted: adoptedAsset,
    lpTokenAddress: utils.formatBytes32String("1337"),
    canonicalHash: utils.formatBytes32String("13337"),
  };

  const mockAssetData = {
    local: mockPool.local.address,
    adopted: mockPool.adopted.address,
    canonicalId: utils.formatBytes32String("0"),
    canonicalDomain: mockPool.domainId,
    domain: mockPool.domainId,
    key: mockPool.canonicalHash,
    id: mockPool.local.address,
  };

  beforeEach(async () => {
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);

    stub(ConfigFns, "getConfig").resolves(config);

    nxtpPool = await SdkPool.create(mockConfig, undefined, mockChainData);
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

      expect(nxtpPool.getConnext).to.be.a("function");
      expect(nxtpPool.getERC20).to.be.a("function");
      expect(nxtpPool.getDefaultDeadline).to.be.a("function");
      expect(nxtpPool.calculateCanonicalKey).to.be.a("function");
      expect(nxtpPool.calculateSwap).to.be.a("function");
      expect(nxtpPool.calculateTokenAmount).to.be.a("function");
      expect(nxtpPool.calculateRemoveSwapLiquidity).to.be.a("function");
      expect(nxtpPool.calculatePriceImpact).to.be.a("function");
      expect(nxtpPool.calculateSwapPriceImpact).to.be.a("function");
      expect(nxtpPool.calculateAddLiquidityPriceImpact).to.be.a("function");
      expect(nxtpPool.calculateRemoveLiquidityPriceImpact).to.be.a("function");
      expect(nxtpPool.calculateAmountReceived).to.be.a("function");
      expect(nxtpPool.getTokenPrice).to.be.a("function");
      expect(nxtpPool.getDefaultDeadline).to.be.a("function");

      expect(nxtpPool.getLPTokenAddress).to.be.a("function");
      expect(nxtpPool.getTokenSupply).to.be.a("function");
      expect(nxtpPool.getTokenUserBalance).to.be.a("function");
      expect(nxtpPool.getPoolTokenIndex).to.be.a("function");
      expect(nxtpPool.getPoolTokenBalance).to.be.a("function");
      expect(nxtpPool.getPoolTokenAddress).to.be.a("function");
      expect(nxtpPool.getVirtualPrice).to.be.a("function");
      expect(nxtpPool.getRepresentation).to.be.a("function");
      expect(nxtpPool.getAdopted).to.be.a("function");

      expect(nxtpPool.addLiquidity).to.be.a("function");
      expect(nxtpPool.removeLiquidity).to.be.a("function");
      expect(nxtpPool.swap).to.be.a("function");

      expect(nxtpPool.getPool).to.be.a("function");
      expect(nxtpPool.getUserPools).to.be.a("function");
      expect(nxtpPool.getYieldStatsForDay).to.be.a("function");
      expect(nxtpPool.calculateYield).to.be.a("function");
      expect(nxtpPool.getYieldData).to.be.a("function");
      expect(nxtpPool.getLiquidityMiningAprPerPool).to.be.a("function");
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

      stub(nxtpPool, "getCanonicalTokenId").resolves([mockPool.domainId, mockParams.canonicalId]);

      const res = await nxtpPool.addLiquidity(
        mockPool.domainId,
        mockPool.local.address,
        mockParams.amounts,
        mockParams.minToMint,
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

      stub(nxtpPool, "getCanonicalTokenId").resolves([mockPool.domainId, mockParams.canonicalId]);

      const res = await nxtpPool.removeLiquidity(
        mockPool.domainId,
        mockPool.local.address,
        mockParams.amount,
        mockParams.minAmounts,
        mockParams.deadline,
      );
      expect(res).to.be.deep.eq(mockRequest);
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

      stub(nxtpPool, "getCanonicalTokenId").resolves([mockPool.domainId, mockParams.canonicalId]);
      stub(nxtpPool, "getPoolTokenIndex").onCall(0).resolves(0).onCall(1).resolves(1);

      const res = await nxtpPool.swap(
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
  });

  describe("#getPool", () => {
    const mockParams = {
      canonicalId: utils.formatBytes32String("0"),
      connext: mock.contracts.deployments().connext(Number(mock.chain.A)),
    };

    it("happy: should work", async () => {
      stub(nxtpPool, "getCanonicalTokenId").resolves([mock.domain.B, mockParams.canonicalId]);
      stub(nxtpPool, "getRepresentation").resolves(mockPool.local.address);
      stub(nxtpPool, "getAdopted").resolves(mockPool.adopted.address);
      stub(nxtpPool, "getLPTokenAddress").resolves(mockPool.lpTokenAddress);
      stub(nxtpPool, "getPoolTokenBalance").resolves(localAsset.balance);
      stub(nxtpPool, "getPoolTokenIndex").resolves(0);

      const provider = providers.getDefaultProvider();
      const connextContract = new Contract(mockParams.connext!.address, mockParams.connext!.abi, provider);
      const mockERC20 = {
        symbol: function () {
          return "TSTA";
        },
        name: function () {
          return "Test A";
        },
        decimals: function () {
          return 18;
        },
      };

      stub(nxtpPool, "getConnext").resolves(connextContract as Connext);
      stub(nxtpPool, "getERC20").resolves(mockERC20 as any);

      const res = await nxtpPool.getPool(mockPool.domainId, mockPool.local.address);

      expect(res!.domainId).to.equal(mockPool.domainId);
      expect(res!.name).to.equal(mockPool.name);
      expect(res!.symbol).to.equal(mockPool.symbol);
      expect(res!.lpTokenAddress).to.equal(mockPool.lpTokenAddress);
    });

    it("should throw if local domain is canonical", async () => {
      stub(nxtpPool, "getCanonicalTokenId").resolves([mockPool.domainId, mockParams.canonicalId]);

      expect(nxtpPool.getPool(mockPool.domainId, mockPool.local.address)).to.be.rejectedWith(
        new Error("Pool doesn't exist for the token on this domain"),
      );
    });

    it("should return undefined if local token is adopted", async () => {
      stub(nxtpPool, "getCanonicalTokenId").resolves([mock.domain.B, mockParams.canonicalId]);

      expect(nxtpPool.getPool(mockPool.domainId, mockParams.canonicalId)).to.be.rejectedWith(
        new Error("Pool doesn't exist for the token on this domain"),
      );
    });
  });

  describe("#getUserPools", () => {
    it("happy: should return all pools that a user has LP tokens in", async () => {
      const userAddress = "0x01".padEnd(42, "0");

      stub(nxtpPool, "getAssetsData").resolves([mockAssetData, mockAssetData]);
      stub(nxtpPool, "getPool").resolves(mockPool);
      stub(nxtpPool, "getTokenUserBalance")
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

      const res = await nxtpPool.getUserPools(mockPool.domainId, userAddress);

      expect(res).to.have.lengthOf(1);
    });

    it("happy: should not return any pools if a user doesn't have LP tokens", async () => {
      const userAddress = "0x01".padEnd(42, "0");

      stub(nxtpPool, "getAssetsData").resolves([mockAssetData]);
      stub(nxtpPool, "getPool").resolves(mockPool);
      stub(nxtpPool, "getTokenUserBalance")
        .onCall(0) // LP token amount
        .resolves(BigNumber.from(0))
        .onCall(1) // adopted token amount
        .resolves(BigNumber.from(0))
        .onCall(2) // local token amount
        .resolves(BigNumber.from(0));

      const res = await nxtpPool.getUserPools(mockPool.domainId, userAddress);

      expect(res).to.have.lengthOf(0);
    });
  });

  describe("#calculateSwap", () => {
    it("happy: should work", async () => {
      const mockConnext = {
        calculateSwap: function () {
          return "100";
        },
      };

      stub(nxtpPool, "getConnext").resolves(mockConnext as any);
      stub(nxtpPool, "getCanonicalTokenId").resolves([mockPool.domainId, mockPool.adopted.address]);

      const res = await nxtpPool.calculateSwap(mockPool.domainId, mockPool.local.address, 0, 1, 100);

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

      stub(nxtpPool, "getConnext").resolves(mockConnext as any);
      stub(nxtpPool, "getCanonicalTokenId").resolves([mockPool.domainId, mockPool.adopted.address]);

      const res = await nxtpPool.calculateTokenAmount(mockPool.domainId, mockPool.local.address, ["10", "10"]);

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

      stub(nxtpPool, "getConnext").resolves(mockConnext as any);
      stub(nxtpPool, "getCanonicalTokenId").resolves([mockPool.domainId, mockPool.adopted.address]);

      const res = await nxtpPool.calculateRemoveSwapLiquidity(mockPool.domainId, mockPool.local.address, "10");

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

  describe("#calculateAmountReceived", () => {
    const mockAssetData = {
      local: mockPool.local.address,
      adopted: mockPool.adopted.address,
      canonicalId: utils.formatBytes32String("0"),
      canonicalDomain: mockPool.domainId,
      domain: mockPool.domainId,
      key: mockPool.canonicalHash,
      id: mockPool.local.address,
    };

    const feeBps = BigNumber.from(+DEFAULT_ROUTER_FEE * 100);

    it("happy: should work with local origin asset and adopted destination asset", async () => {
      stub(nxtpPool, "getPool").onCall(0).resolves(undefined).onCall(1).resolves(mockPool);

      const originAmount = BigNumber.from(100_000);
      const originSlippage = "0"; // 0% in BPS

      const destinationAmount = originAmount.sub(originAmount.mul(feeBps).div(10000)); // router takes 0.05%
      const destinationAmountAfterSwap = destinationAmount.mul(9).div(10); // assume swap ate 10%;
      const destinationSlippage = "1000"; // 10% in BPS

      stub(nxtpPool, "calculateSwap")
        .onCall(0) // swap once for destination pool
        .resolves(destinationAmountAfterSwap);
      stub(nxtpPool, "getCanonicalTokenId").resolves([mockAssetData.canonicalDomain, mockAssetData.canonicalId]);
      stub(nxtpPool, "getAssetsDataByDomainAndKey").resolves(mockAssetData);

      const res = await nxtpPool.calculateAmountReceived(
        mockPool.domainId,
        mockPool.domainId,
        mockPool.local.address,
        originAmount,
      );

      expect(res.originSlippage.toString()).to.equal(originSlippage);
      expect(res.destinationSlippage.toString()).to.equal(destinationSlippage);
    });

    it("happy: should work with adopted origin asset and adopted destination asset", async () => {
      stub(nxtpPool, "getPool").onCall(0).resolves(mockPool).onCall(1).resolves(mockPool);

      const originAmount = BigNumber.from(100_000);
      const originAmountAfterSwap = originAmount.mul(9).div(10); // assume swap ate 10%
      const originSlippage = "1000"; // 10% in BPS

      const destinationAmount = originAmountAfterSwap.sub(originAmountAfterSwap.mul(feeBps).div(10000)); // router takes 0.05%
      const destinationAmountAfterSwap = destinationAmount.mul(9).div(10); // assume swap ate 10%;
      const destinationSlippage = "1000"; // 10% in BPS

      stub(nxtpPool, "calculateSwap")
        .onCall(0) // swap once for origin pool
        .resolves(originAmountAfterSwap)
        .onCall(1) // swap once for destination pool
        .resolves(destinationAmountAfterSwap);
      stub(nxtpPool, "getCanonicalTokenId").resolves([mockAssetData.canonicalDomain, mockAssetData.canonicalId]);
      stub(nxtpPool, "getAssetsDataByDomainAndKey").resolves(mockAssetData);

      const res = await nxtpPool.calculateAmountReceived(
        mockPool.domainId,
        mockPool.domainId,
        mockPool.adopted.address,
        originAmount,
      );

      expect(res.originSlippage.toString()).to.equal(originSlippage);
      expect(res.destinationSlippage.toString()).to.equal(destinationSlippage);
    });

    it("happy: should work with adopted origin asset and local destination asset", async () => {
      stub(nxtpPool, "getPool").onCall(0).resolves(mockPool).onCall(1).resolves(undefined);

      const originAmount = BigNumber.from(100_000);
      const originAmountAfterSwap = originAmount.mul(9).div(10); // assume swap ate 10%
      const originSlippage = "1000"; // 10% in BPS
      const destinationSlippage = "0"; // 0% in BPS

      stub(nxtpPool, "calculateSwap")
        .onCall(0) // swap once for origin pool
        .resolves(originAmountAfterSwap);
      stub(nxtpPool, "getCanonicalTokenId").resolves([mockAssetData.canonicalDomain, mockAssetData.canonicalId]);
      stub(nxtpPool, "getAssetsDataByDomainAndKey").resolves(mockAssetData);

      const res = await nxtpPool.calculateAmountReceived(
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
      stub(nxtpPool, "getPool").onCall(0).resolves(undefined).onCall(1).resolves(undefined);

      const originAmount = BigNumber.from(100_000);
      const originSlippage = "0"; // 10% in BPS
      const destinationSlippage = "0"; // 0% in BPS

      stub(nxtpPool, "getCanonicalTokenId").resolves([mockAssetData.canonicalDomain, mockAssetData.canonicalId]);
      stub(nxtpPool, "getAssetsDataByDomainAndKey").resolves(mockAssetData);

      const res = await nxtpPool.calculateAmountReceived(
        mockPool.domainId,
        mockPool.domainId,
        mockPool.local.address,
        originAmount,
        true,
      );

      expect(res.originSlippage.toString()).to.equal(originSlippage);
      expect(res.destinationSlippage.toString()).to.equal(destinationSlippage);
    });
  });

  describe("#getTokenPrice", () => {
    it("happy: should return USDC price", async () => {
      const price = await nxtpPool.getTokenPrice("USDC");
      expect(price).gt(0);
      expect(price).lt(2);
    });

    it("happy: should return OP price", async () => {
      const price = await nxtpPool.getTokenPrice("OP");
      expect(price).gt(0);
      expect(price).lt(20);
    });
  });

  describe("#getYieldStatsForDay", () => {
    it("should return undefined if no pool is found", async () => {
      const mockParams = {
        canonicalId: utils.formatBytes32String("0"),
      };

      stub(nxtpPool, "getConnext").resolves(undefined);
      stub(nxtpPool, "getCanonicalTokenId").resolves([mock.domain.A, mockParams.canonicalId]);

      const result = await nxtpPool.getYieldStatsForDay(mock.domain.A, constants.AddressZero, 1);

      expect(result).to.be.undefined;
    });
  });

  describe("#calculateYield", () => {
    it("happy: should return the correct apr, apy", async () => {
      const yieldData = await nxtpPool.calculateYield(1, 10000, 1);

      expect(yieldData.apr).closeTo(0.0365, 0.001);
      expect(yieldData.apy).closeTo(0.03706870443, 0.001);
    });
  });

  describe("#getLiquidityMiningAprPerPool", () => {
    it("happy: should return the correct APR", async () => {
      const apr = await nxtpPool.getLiquidityMiningAprPerPool(250_000, 657_436, 2, "USDC", 1_000_000);
      // should be about 50% APR
      expect(apr).gt(0.45);
      expect(apr).lessThan(0.55);
    });
  });
});
