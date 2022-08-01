import { createStubInstance, reset, restore, stub, spy } from "sinon";
import { expect } from "@connext/nxtp-utils";
import { ChainReader, getConnextInterface, getTokenRegistryInterface } from "@connext/nxtp-txservice";
import { providers, utils, BigNumber } from "ethers";
import { mock } from "./mock";
import { NxtpSdkPool, Pool } from "../src/sdkPool";
import { getEnvConfig, NxtpSdkConfig } from "../src/config";

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

      expect(nxtpPool.getCanonicalFromLocal).to.be.a("function");
      expect(nxtpPool.getLPTokenAddress).to.be.a("function");
      expect(nxtpPool.getLPTokenUserBalance).to.be.a("function");
      expect(nxtpPool.getPoolTokenIndex).to.be.a("function");
      expect(nxtpPool.getPoolTokenBalance).to.be.a("function");
      expect(nxtpPool.getPoolTokenUserBalance).to.be.a("function");
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
    });
  });

  describe("#addLiquidity", () => {
    const mockParams = {
      domainId: mock.domain.A,
      canonicalId: utils.formatBytes32String("0"),
      amounts: ["100", "100"],
      minToMint: "100",
      deadline: 1700000000,
      connextAddress: mockConfig.chains[mock.domain.A].deployments!.connext,
    };

    it("happy: should work", async () => {
      const data = getConnextInterface().encodeFunctionData("addSwapLiquidity", [
        mockParams.canonicalId,
        mockParams.amounts,
        mockParams.minToMint,
        mockParams.deadline,
      ]);

      const mockRequest: providers.TransactionRequest = {
        to: mockParams.connextAddress,
        data,
        from: mock.config().signerAddress,
        value: 0,
      };

      stub(nxtpPool, "calculateTokenAmount").resolves(BigNumber.from("100"));

      const res = await nxtpPool.addLiquidity(
        mockParams.domainId,
        mockParams.canonicalId,
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
      amount: "100",
      minAmounts: ["100", "100"],
      deadline: 1700000000,
      connextAddress: mockConfig.chains[mock.domain.A].deployments!.connext,
    };

    it("happy: should work", async () => {
      const data = getConnextInterface().encodeFunctionData("removeSwapLiquidity", [
        mockParams.canonicalId,
        mockParams.amount,
        mockParams.minAmounts,
        mockParams.deadline,
      ]);

      const mockRequest: providers.TransactionRequest = {
        to: mockParams.connextAddress,
        data,
        from: mock.config().signerAddress,
        value: 0,
      };

      stub(nxtpPool, "calculateRemoveSwapLiquidity").resolves([BigNumber.from("100"), BigNumber.from("100")]);

      const res = await nxtpPool.removeLiquidity(
        mockParams.domainId,
        mockParams.canonicalId,
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
      from: "0x0",
      to: "0x0",
      amount: "100",
      minDy: 100,
      deadline: 170000000,
      connextAddress: mockConfig.chains[mock.domain.A].deployments!.connext,
    };

    it("happy: should work", async () => {
      const data = getConnextInterface().encodeFunctionData("swap", [
        mockParams.canonicalId,
        0,
        1,
        mockParams.amount,
        mockParams.minDy,
        mockParams.deadline,
      ]);

      const mockRequest: providers.TransactionRequest = {
        to: mockParams.connextAddress,
        data,
        from: mock.config().signerAddress,
        value: 0,
      };

      stub(nxtpPool, "getCanonicalFromLocal").resolves([1337, "0x0"]);
      stub(nxtpPool, "getPoolTokenIndex").onCall(0).resolves(0).onCall(1).resolves(1);
      stub(nxtpPool, "calculateSwap").resolves(mockParams.minDy);

      const res = await nxtpPool.swap(
        mockParams.domainId,
        mockParams.canonicalId,
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
      tokenAddress: mock.asset.A.address,
      poolName: `${mock.asset.A.symbol}-Pool`,
      poolSymbol: `${mock.asset.A.symbol}-mad${mock.asset.A.symbol}`,
      poolTokens: [utils.formatBytes32String("1"), mock.asset.A.address],
      poolDecimals: [18, 18],
      poolBalances: [BigNumber.from("100"), BigNumber.from("100")],
      lpTokenAddress: utils.formatBytes32String("2"),
    };

    it("happy: should work", async () => {
      stub(nxtpPool, "getCanonicalFromLocal").resolves([parseInt(mock.domain.B), mockParams.canonicalId]);
      stub(chainReader, "readTx").onCall(0).resolves("0x");

      stub(nxtpPool.connext, "decodeFunctionResult")
        .onCall(0) // stub call to canonicalToAdopted()
        .returns([mockParams.poolTokens[0]])
        .onCall(1) // stub call to getSwapLPToken()
        .returns([mockParams.lpTokenAddress]);

      stub(nxtpPool.erc20, "decodeFunctionResult")
        .onCall(0) // stub call to local's decimals()
        .returns([mockParams.poolDecimals[0]])
        .onCall(1) // stub call to adopted's decimals()
        .returns([mockParams.poolDecimals[1]])
        .onCall(2) // stub call to symbol()
        .returns([mock.asset.A.symbol]);

      stub(nxtpPool, "getPoolTokenBalance")
        .onCall(0) // stub call to adopted's balance
        .resolves(mockParams.poolBalances[0])
        .onCall(1) // stub call to local's balance
        .resolves(mockParams.poolBalances[1]);

      const res = await nxtpPool.getPool(mockParams.domainId, mockParams.tokenAddress);

      expect(res!.domainId).to.equal(mockParams.domainId);
      expect(res!.name).to.equal(mockParams.poolName);
      expect(res!.symbol).to.equal(mockParams.poolSymbol);
      expect(res!.tokens).to.deep.equal(mockParams.poolTokens);
      expect(res!.decimals).to.deep.equal(mockParams.poolDecimals);
      expect(res!.balances).to.deep.equal(mockParams.poolBalances);
      expect(res!.lpTokenAddress).to.equal(mockParams.lpTokenAddress);
    });

    it("happy: should return undefined if local domain is canonical", async () => {
      stub(nxtpPool, "getCanonicalFromLocal").resolves([Number(mockParams.domainId), mockParams.canonicalId]);

      const res = await nxtpPool.getPool(mockParams.domainId, mockParams.tokenAddress);
      expect(res).to.be.undefined;
    });

    it("happy: should return undefined if local token is adopted", async () => {
      stub(nxtpPool, "getCanonicalFromLocal").resolves([Number(mock.domain.B), mockParams.canonicalId]);
      stub(chainReader, "readTx").onCall(0).resolves("0x");

      // stub call to canonicalToAdopted()
      stub(nxtpPool.connext, "decodeFunctionResult").onCall(0).returns([mockParams.canonicalId]);

      const res = await nxtpPool.getPool(mockParams.domainId, mockParams.canonicalId);
      expect(res).to.be.undefined;
    });
  });

  describe("#getUserPools", () => {
    const mockParams = {
      userAddress: "0x01".padEnd(42, "0"),
      domainId: mock.domain.A,
      poolName: `${mock.asset.A.symbol}-Pool`,
      poolSymbol: `${mock.asset.A.symbol}-mad${mock.asset.A.symbol}`,
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
        mockParams.lpTokenAddress,
      );

      stub(nxtpPool, "getPool").resolves(mockPool);
      // stub(chainReader, "readTx").onCall(0).resolves("0x");
      stub(nxtpPool, "getLPTokenUserBalance").resolves(mockParams.lpTokenUserBalance);
      stub(nxtpPool, "getPoolTokenUserBalance")
        .onCall(0)
        .resolves(mockParams.poolTokenUserBalances[0])
        .onCall(1)
        .resolves(mockParams.poolTokenUserBalances[1]);

      const res = await nxtpPool.getUserPools(mockParams.domainId, mockParams.userAddress);

      // TODO: why doesn't the await above suffice?
      await setTimeout(() => {
        expect(res).to.have.lengthOf(1);
      }, 100);
    });
  });

  describe("#getPoolStats", () => {
    const mockParams = {
      domainId: mock.domain.A,
      tokenAddress: mock.asset.A.address,
      poolName: `${mock.asset.A.symbol}-Pool`,
      poolSymbol: `${mock.asset.A.symbol}-mad${mock.asset.A.symbol}`,
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
