import { reset, restore, stub, SinonStub, createStubInstance, SinonStubbedInstance } from "sinon";
import { expect, mkAddress } from "@connext/nxtp-utils";
import { ChainReader } from "@connext/nxtp-txservice";
import { mock } from "./mock";
import { SdkPool } from "../src/sdkPool";
import { BigNumber } from "ethers";

import * as SharedFns from "../src/lib/helpers/shared";
import * as MockableFns from "../src/mockable";
import * as ConfigFns from "@connext/sdk-core/src/config";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

const mockPool = {
  domainId: "1869640809",
  name: "USDC Pool",
  symbol: "USDC-nextUSDC",
  local: {
    address: "0x67E51f46e8e14D4E4cab9dF48c59ad8F512486DD",
    name: "nextUSDC",
    symbol: "nextUSDC",
    decimals: 6,
    index: 0,
    balance: BigNumber.from("205608700888"),
  },
  adopted: {
    address: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
    name: "USDC Coin",
    symbol: "USDC",
    decimals: 6,
    index: 1,
    balance: BigNumber.from("223116010913"),
  },
  lpTokenAddress: "0xb12a1be740b99d845af98098965af761be6bd7fe",
  canonicalHash: "0x6d9af4a33ed4034765652ab0f44205952bc6d92198d3ef78fe3fb2b078d0941c",
  balances: [BigNumber.from("100000000000000"), BigNumber.from("200000000000000")],
  decimals: [6, 6],
  invariant: BigNumber.from("300000000000000"),
  initialA: BigNumber.from("20000"),
  initialATime: 0,
  futureA: BigNumber.from("20000"),
  futureATime: 0,
  currentA: BigNumber.from("20000"),
  swapFee: "4000000",
  adminFee: "0",
};

describe("#SDKPool", () => {
  let sdkPool: SdkPool;
  let config: ConfigFns.SdkConfig;
  let axiosPostStub: SinonStub;

  let chainreader: SinonStubbedInstance<ChainReader>;

  beforeEach(async () => {
    axiosPostStub = stub(MockableFns, "axiosPost");
    chainreader = createStubInstance(ChainReader);
    config = ConfigFns.getEnvConfig(mockConfig, mockChainData, mockDeployments);

    stub(ConfigFns, "getConfig").resolves({ nxtpConfig: config, chainData: mockChainData });
    stub(SharedFns, "axiosGetRequest").resolves([]);

    sdkPool = await SdkPool.create(mockConfig, undefined, mockChainData);
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#calculateSwap", async () => {
    it("happy should calculate swap", async () => {
      const mockIndexFrom = 1;
      const mockIndexTo = 1;
      const mockAmount = 100;
      axiosPostStub.resolves({
        data: {
          type: "BigNumber",
          hex: "0x383fd3a9b7",
        },
      });
      const swap = await sdkPool.calculateSwap(
        mock.domain.A,
        mock.asset.A.address,
        mockIndexFrom,
        mockIndexTo,
        mockAmount,
      );
      expect(swap).not.to.be.eq(null);
    });
  });

  describe("#calculateSwapLocal", async () => {
    it("happy:should calculate swap Local", async () => {
      const mockIndexFrom = 1;
      const mockIndexTo = 1;
      const mockAmount = 100;
      axiosPostStub.resolves({
        data: {
          type: "BigNumber",
          hex: "0xb5d380956000",
        },
      });
      const swap = await sdkPool.calculateSwapLocal(
        mock.domain.A,
        mockPool,
        mock.asset.A.address,
        mockIndexFrom,
        mockIndexTo,
        mockAmount,
      );
      expect(swap).not.to.be.eq(null);
    });
  });

  describe("#getSwapOut", async () => {
    it("happy: should calculate swap out", async () => {
      const mockX = BigNumber.from("100000000000000");
      const mockxp = [BigNumber.from("100000000000000")];
      const mockIndexFrom = 1;
      const mockIndexTo = 1;
      const swapOut = await sdkPool.getSwapOut(mockPool, mockX, mockxp, mockIndexFrom, mockIndexTo);
      expect(swapOut).not.to.be.eq(null);
    });
  });

  describe("#calculateAmountReceived", async () => {
    it("happy: should get amount recieved", async () => {
      const mockAmount = 100;
      axiosPostStub.resolves({
        data: {
          type: "BigNumber",
          hex: "0xb5d380956000",
        },
      });
      const amountReceived = await sdkPool.calculateAmountReceived(
        mock.domain.A,
        mock.domain.B,
        mock.asset.A.address,
        mockAmount,
        false,
        true,
      );
      expect(amountReceived).not.to.be.eq(null);
    });
  });

  describe("#scientificToBigInt", async () => {
    it("happy: should get bigInt", async () => {
      const mockscientificNotationString = "1e18";
      const bigInt = await sdkPool.scientificToBigInt(mockscientificNotationString);
      expect(bigInt).to.be.eq(BigInt(1000000000000000000));
    });
  });

  describe("#calculateTokenAmount", async () => {
    it("happy: should get tokenAmount", async () => {
      const mockAmount: string[] = ["100", "100"];
      axiosPostStub.resolves({
        data: {
          type: "BigNumber",
          hex: "0x010f09b6d7f1ca",
        },
      });
      const tokenAmount = await sdkPool.calculateTokenAmount(mock.domain.A, mock.asset.A.address, mockAmount);
      expect(tokenAmount).not.to.be.eq(null);
    });
  });

  describe("#calculateRemoveSwapLiquidity", async () => {
    it("happy: should get swap liquidity", async () => {
      const mockAmount: string = "1000000000000000000";
      axiosPostStub.resolves({
        data: [
          {
            type: "BigNumber",
            hex: "0x0715f9",
          },
          {
            type: "BigNumber",
            hex: "0x0845f9",
          },
        ],
      });
      const swapLiquidity = await sdkPool.calculateRemoveSwapLiquidity(mock.domain.A, mock.asset.A.address, mockAmount);
      expect(swapLiquidity.length).to.be.greaterThan(0);
    });
  });

  describe("#calculateRemoveSwapLiquidityOneToken", async () => {
    it("happy: should get swap liquidity one token", async () => {
      const mockAmount: string = "1000000000000000000";
      const mockIndex = 0;
      axiosPostStub.resolves({
        data: {
          type: "BigNumber",
          hex: "0x0f5974",
        },
      });
      const swapLiquidity = await sdkPool.calculateRemoveSwapLiquidityOneToken(
        mock.domain.A,
        mock.asset.A.address,
        mockAmount,
        mockIndex,
      );
      expect(swapLiquidity).not.to.be.eq(null);
    });
  });

  describe("#calculatePriceImpact", async () => {
    it("happy: should get price impact", async () => {
      const mockAmount: BigNumber = BigNumber.from("1000000000000000000").pow(18);
      const mockOutputAmount: BigNumber = BigNumber.from("2000000000000000000").pow(18);
      const result: string = "262143000000000000000000";
      const priceImpact = await sdkPool.calculatePriceImpact(mockAmount, mockOutputAmount);
      expect(priceImpact.toString()).to.be.eq(result);
    });
  });

  describe("#calculateAddLiquidityPriceImpact", async () => {
    it("happy: should get liquidity price impact", async () => {
      const mockAmount: string = "1000000000000000000";
      axiosPostStub.resolves({
        data: {
          type: "BigNumber",
          hex: "-0x011a8a4bd06798",
        },
      });
      const priceImpact = await sdkPool.calculateAddLiquidityPriceImpact(
        mock.domain.A,
        mock.asset.A.address,
        mockAmount,
        mockAmount,
      );
      expect(priceImpact).not.to.be.eq(null);
    });
  });

  describe("#calculateRemoveLiquidityPriceImpact", async () => {
    it("happy: should get remove liquidity price impact", async () => {
      const mockAmount: string = "1000000000000000000";
      axiosPostStub.resolves({
        data: {
          type: "BigNumber",
          hex: "0x684144e2519c",
        },
      });
      const priceImpact = await sdkPool.calculateRemoveLiquidityPriceImpact(
        mock.domain.A,
        mock.asset.A.address,
        mockAmount,
        mockAmount,
      );
      expect(priceImpact).not.to.be.eq(null);
    });
  });

  describe("#calculateSwapPriceImpact", async () => {
    it("happy: should get swap price impact", async () => {
      const mockAmount: string = "1000000000000000000";
      axiosPostStub.resolves({
        data: {
          type: "BigNumber",
          hex: "-0x0de0b67b68257ddd",
        },
      });
      const swapPriceImpact = await sdkPool.calculateSwapPriceImpact(
        mock.domain.A,
        mock.asset.A.address,
        mockAmount,
        mockAmount,
      );
      expect(swapPriceImpact).not.to.be.eq(null);
    });
  });

  describe("#getTokenPrice", async () => {
    it("happy: should get Token price ", async () => {
      axiosPostStub.resolves({
        data: 1836.02,
      });
      const tokenPrice = await sdkPool.getTokenPrice(mock.asset.A.symbol);
      expect(tokenPrice).to.be.eq(1836.02);
    });
  });

  describe("#getLPTokenAddress", async () => {
    it("happy: should get LPToken price ", async () => {
      axiosPostStub.resolves({
        data: "0x0000000000000000000000000000000000000000",
      });
      const LPtokenPrice = await sdkPool.getLPTokenAddress(mock.domain.A, mock.asset.A.address);
      expect(LPtokenPrice).to.be.eq("0x0000000000000000000000000000000000000000");
    });
  });

  describe("#getTokenSupply", async () => {
    it("happy: should get token supply", async () => {
      axiosPostStub.resolves({
        data: {
          type: "BigNumber",
          hex: "0x01383dd1df741a",
        },
      });
      const tokenSupply = await sdkPool.getTokenSupply(mock.domain.A, mock.asset.A.address);
      expect(tokenSupply).not.to.be.eq(null);
    });
  });

  describe("#getTokenUserBalance", async () => {
    it("happy: should get token balance", async () => {
      const result = {
        type: "BigNumber",
        hex: "0x09c314",
      };
      axiosPostStub.resolves({
        data: result,
      });
      const TokenBalance = await sdkPool.getTokenUserBalance(mock.domain.A, mock.asset.A.address, mkAddress());
      expect(TokenBalance).to.be.eq(result);
    });
  });

  describe("#getPoolTokenIndex", async () => {
    it("happy: should get token index", async () => {
      axiosPostStub.resolves({
        data: -1,
      });
      const tokenIndex = await sdkPool.getPoolTokenIndex(mock.domain.A, mock.asset.A.address, mock.asset.A.address);
      expect(tokenIndex).to.be.eq(-1);
    });
  });

  describe("#getPoolTokenDecimals", async () => {
    it("happy: should get token decimals", async () => {
      axiosPostStub.resolves({
        data: -1,
      });
      const tokenIndex = await sdkPool.getPoolTokenDecimals(mock.domain.A, mock.asset.A.address, mock.asset.A.address);
      expect(tokenIndex).to.be.eq(-1);
    });
  });

  describe("#getPoolTokenBalance", async () => {
    it("happy: should get pool token balance", async () => {
      const mockIndex = 0;
      axiosPostStub.resolves({
        data: {
          type: "BigNumber",
          hex: "0x3031ad3e8b",
        },
      });
      const tokenIndex = await sdkPool.getPoolTokenBalance(
        mock.domain.A,
        mock.asset.A.address,
        mock.asset.A.address,
        mockIndex,
      );
      expect(tokenIndex).not.to.be.eq(null);
    });
  });

  describe("#getPoolTokenAddress", async () => {
    it("happy: should get pool token address", async () => {
      const mockIndex = 0;
      axiosPostStub.resolves({
        data: "0x0000000000000000000000000000000000000000",
      });
      const tokenAddress = await sdkPool.getPoolTokenAddress(mock.domain.A, mock.asset.A.address, mockIndex);
      expect(tokenAddress).to.be.eq("0x0000000000000000000000000000000000000000");
    });
  });

  describe("#getVirtualPrice", async () => {
    it("happy: should get virtual price", async () => {
      const mockIndex = 0;
      axiosPostStub.resolves({
        data: {
          type: "BigNumber",
          hex: "0x0df808f573654d22",
        },
      });
      const virtualPrice = await sdkPool.getVirtualPrice(mock.domain.A, mock.asset.A.address);
      expect(virtualPrice).not.to.be.eq(null);
    });
  });

  describe("#getRepresentation", async () => {
    it("happy: should get representation", async () => {
      axiosPostStub.resolves({
        data: "0x0000000000000000000000000000000000000000",
      });
      const representation = await sdkPool.getRepresentation(mock.domain.A, mock.asset.A.address);
      expect(representation).to.be.eq("0x0000000000000000000000000000000000000000");
    });
  });

  describe("#getAdopted", async () => {
    it("happy: should get adopted", async () => {
      axiosPostStub.resolves({
        data: "0x0000000000000000000000000000000000000000",
      });
      const adopted = await sdkPool.getAdopted(mock.domain.A, mock.asset.A.address);
      expect(adopted).to.be.eq("0x0000000000000000000000000000000000000000");
    });
  });

  describe("#getAdopted", async () => {
    it("happy: should get adopted", async () => {
      axiosPostStub.resolves({
        data: "0x0000000000000000000000000000000000000000",
      });
      const adopted = await sdkPool.getAdopted(mock.domain.A, mock.asset.A.address);
      expect(adopted).to.be.eq("0x0000000000000000000000000000000000000000");
    });
  });

  describe("#getTokenSwapEvents", async () => {
    it("happy: should get tokenEvents", async () => {
      axiosPostStub.resolves({
        data: [
          {
            id: "0x292e02936c5b0f88fab7f755caac58d92cd10b13f484cd46f6dd45468cb23e3f-0x3985e6eedcf60f94900be0a403e9bdd5467a0241437dafbd717b188efe45872d-0",
            pool_id: "0x292e02936c5b0f88fab7f755caac58d92cd10b13f484cd46f6dd45468cb23e3f",
            domain: "1735356532",
            buyer: "0x75ba5af8effdcfca32e1e288806d54277d1fde99",
            bought_id: 1,
            sold_id: 0,
            tokens_sold: 0.1,
            tokens_bought: 0.08243356576537139,
            block_number: 9317977,
            transaction_hash: "0x3985e6eedcf60f94900be0a403e9bdd5467a0241437dafbd717b188efe45872d",
            timestamp: 1684064022,
            balances: [1.6990179609720153, 0.060167877355211036],
            fee: 0.000032973426306148,
            nonce: 16840640220000,
          },
        ],
      });
      const tokenEvents = await sdkPool.getTokenSwapEvents({});
      expect(tokenEvents.length).to.be.greaterThan(0);
    });
  });

  describe("#getPoolData", async () => {
    it("happy: should get pool data", async () => {
      axiosPostStub.resolves({
        data: [
          {
            pool_id: "0x292e02936c5b0f88fab7f755caac58d92cd10b13f484cd46f6dd45468cb23e3f",
          },
        ],
      });
      const poolData = await sdkPool.getPoolData({});
      expect(poolData).not.to.be.eq(null);
    });
  });

  describe("#addLiquidity", async () => {
    it("happy: should add liquidity", async () => {
      const mockAmounts: string[] = ["100", "100"];
      axiosPostStub.resolves({
        data: {
          data: "0x8d365457ad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb5000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000018891ac12210000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000c8",
          to: "0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA",
        },
      });
      const liquidity = await sdkPool.addLiquidity(mock.domain.A, mock.asset.A.address, mockAmounts);
      expect(liquidity).not.to.be.eq({
        data: "0x8d365457ad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb5000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000018891ac12210000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000c8",
        to: "0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA",
      });
    });
  });

  describe("#removeLiquidityOneToken", async () => {
    it("happy: should remove liquidity one token", async () => {
      const mockAmounts: string = "100";
      axiosPostStub.resolves({
        data: {
          data: "0xb6618dff6d9af4a33ed4034765652ab0f44205952bc6d92198d3ef78fe3fb2b078d0941c000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001889b5f3a2a",
          to: "0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA",
        },
      });
      const liquidity = await sdkPool.removeLiquidityOneToken(
        mock.domain.A,
        mock.asset.A.address,
        mock.asset.A.address,
        mockAmounts,
      );
      expect(liquidity.data).to.be.eq(
        "0xb6618dff6d9af4a33ed4034765652ab0f44205952bc6d92198d3ef78fe3fb2b078d0941c000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001889b5f3a2a",
      );
    });
  });

  describe("#removeLiquidity", async () => {
    it("happy: should remove liquidity", async () => {
      const mockAmounts: string = "100";
      axiosPostStub.resolves({
        data: {
          data: "0x4bbcba8ead3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb500000000000000000000000000000000000000000000000000000000000001f400000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000018891b0ab68000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
          to: "0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA",
        },
      });
      const liquidity = await sdkPool.removeLiquidity(mock.domain.A, mock.asset.A.address, mockAmounts);
      expect(liquidity).not.to.be.eq({
        data: "0x4bbcba8ead3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb500000000000000000000000000000000000000000000000000000000000001f400000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000018891b0ab68000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        to: "0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA",
      });
    });
  });

  describe("#removeLiquidityImbalance", async () => {
    it("happy: should remove liquidity Imbalance", async () => {
      const mockAmounts: string[] = ["100"];
      axiosPostStub.resolves({
        data: {
          data: "0x241ca57a6d9af4a33ed4034765652ab0f44205952bc6d92198d3ef78fe3fb2b078d0941c00000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001889b5fadf00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000c8",
          to: "0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA",
        },
      });
      const liquidity = await sdkPool.removeLiquidityImbalance(mock.domain.A, mock.asset.A.address, mockAmounts);
      expect(liquidity.to).to.be.eq("0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA");
    });
  });

  describe("#swap", async () => {
    it("happy: should get swap", async () => {
      const mockAmounts: string = "100";
      const result = {
        data: "0xff126de96d9af4a33ed4034765652ab0f44205952bc6d92198d3ef78fe3fb2b078d0941c0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001f40000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001889b60216e",
        to: "0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA",
      };
      axiosPostStub.resolves({
        data: result,
      });
      const swap = await sdkPool.swap(
        mock.domain.A,
        mock.asset.A.address,
        mock.asset.A.address,
        mock.asset.B.address,
        mockAmounts,
      );
      expect(swap).to.be.eq(result);
    });
  });

  describe("#getPool", async () => {
    it("happy: should get pool", async () => {
      const mockPool = {
        domainId: "1869640809",
        name: "USDC Pool",
        symbol: "USDC-nextUSDC",
        local: {
          address: "0x67E51f46e8e14D4E4cab9dF48c59ad8F512486DD",
          name: "nextUSDC",
          symbol: "nextUSDC",
          decimals: 6,
          index: 0,
          balance: "206987163913",
        },
        adopted: {
          address: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
          name: "USDC Coin",
          symbol: "USDC",
          decimals: 6,
          index: 1,
          balance: "241675900092",
        },
        lpTokenAddress: "0xb12a1be740b99d845af98098965af761be6bd7fe",
        canonicalHash: "0x6d9af4a33ed4034765652ab0f44205952bc6d92198d3ef78fe3fb2b078d0941c",
        balances: [
          {
            type: "BigNumber",
            hex: "0x3031657909",
          },
          {
            type: "BigNumber",
            hex: "0x38450194bc",
          },
        ],
        decimals: [6, 6],
        invariant: {
          type: "BigNumber",
          hex: "0x5f01b5a8e03de64a1e85",
        },
        initialA: 20000,
        initialATime: 0,
        futureA: 20000,
        futureATime: 0,
        currentA: {
          type: "BigNumber",
          hex: "0x4e20",
        },
        swapFee: "4000000",
        adminFee: "0",
      };
      axiosPostStub.resolves({
        data: mockPool,
      });
      const pool = await sdkPool.getPool(mock.domain.A, mock.asset.A.address);
      expect(pool).to.be.eq(mockPool);
    });
  });

  describe("#getUserPools", async () => {
    it("happy: should get user pool", async () => {
      axiosPostStub.resolves({
        data: [],
      });
      const pool = await sdkPool.getUserPools(mock.domain.A, mock.asset.A.address);
      expect(pool.length).to.be.eq(0);
    });
  });

  describe("#getYieldStatsForDays", async () => {
    it("happy: should get yeild stats", async () => {
      const mockunixTimestamp = 1672932000;
      const mockDays = 30;
      const result = {
        totalFeesFormatted: 0.0375968672,
        totalLiquidityFormatted: 448663.058913,
        totalVolume: {
          type: "BigNumber",
          hex: "0x05186742cddcd68c15",
        },
        totalVolumeFormatted: 93.992168,
      };
      axiosPostStub.resolves({
        data: result,
      });
      const yieldStats = await sdkPool.getYieldStatsForDays(
        mock.domain.A,
        mock.asset.A.address,
        mockunixTimestamp,
        mockDays,
      );
      expect(yieldStats).to.be.eq(result);
    });
  });

  describe("#calculateYield", async () => {
    it("happy: should calculate yield", async () => {
      const mockFeesEarned = 1000;
      const mockPrincipal = 5000;
      const mockDays = 30;
      const result = {
        apr: 2.4333333333333336,
        apy: 8.19119175644181,
      };
      const yeild = await sdkPool.calculateYield(mockFeesEarned, mockPrincipal, mockDays);
      expect(yeild.apr).to.be.eq(result.apr);
    });
  });

  describe("#getYieldData", async () => {
    it("happy: should get yield Data", async () => {
      const mockDays = 30;
      const result = {
        fees: 1082.3539729064,
        liquidity: 448663.058913,
        apr: 0.02935084523249786,
        apy: 0.02974942825137239,
        volume: {
          type: "BigNumber",
          hex: "0x023cfe50ec1f2035135dc6",
        },
        volumeFormatted: 2705884.932266,
      };
      axiosPostStub.resolves({
        data: result,
      });
      const yeildData = await sdkPool.getYieldData(mock.domain.A, mock.asset.A.address, mockDays);
      expect(yeildData).to.be.eq(result);
    });
  });

  describe("#getLiquidityMiningAprPerPool", async () => {
    it("happy: should get liquidity mining per pool", async () => {
      const mockTotalTokens = 1000000;
      const mockTotalBlocks = 10000;
      const mockNumPools = 10;
      const mockPoolTVL = 1000000;
      axiosPostStub.resolves({
        data: 26.134000000000004,
      });
      const liqMiningPerPool = await sdkPool.getLiquidityMiningAprPerPool(
        mockTotalTokens,
        mockTotalBlocks,
        mockNumPools,
        mock.asset.A.symbol,
        mockPoolTVL,
      );
      expect(liqMiningPerPool).to.be.eq(26.134000000000004);
    });
  });

  describe("#getHourlySwapVolume", async () => {
    it("happy: should get hourly swap volume", async () => {
      axiosPostStub.resolves({
        data: [
          {
            pool_id: "0x12acadfa38ab02479ae587196a9043ee4d8bf52fcb96b7f8d2ba240f03bcd08a",
            domain: "1869640809",
            swap_hour: "2023-06-08T13:00:00+00:00",
            volume: 0.03616104117192621,
            swap_count: 4,
          },
        ],
      });
      const swapVolume = await sdkPool.getHourlySwapVolume({
        domainId: mock.domain.A,
      });
      expect(swapVolume.length).to.be.greaterThan(0);
    });
  });

  describe("#getDailySwapVolume", async () => {
    it("happy: should get daily swap volume", async () => {
      axiosPostStub.resolves({
        data: [
          {
            pool_id: "0x9e79219debefdf827d33c85c1bc250b0ba1f2821d37ccae57e96a42c70a442ec",
            domain: "1869640809",
            swap_day: "2023-06-08",
            volume: 30616.0722615,
            swap_count: 44,
          },
        ],
      });
      const swapVolume = await sdkPool.getDailySwapVolume({
        domainId: mock.domain.A,
      });
      expect(swapVolume[0].volume).to.be.eq(30616.0722615);
    });
  });
});
