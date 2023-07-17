import { reset, restore, stub, SinonStub } from "sinon";
import { BigNumber, providers } from "ethers";
import { mock } from "./mock";
import { SdkPool } from "../src/sdkPool";
import * as MockableFns from "../src/mockable";
import { convertBigNumberObject } from "./utils";
import { isEqual } from "lodash";

import {
  Pool,
  SdkAddLiquidityParams,
  SdkCalculateAddLiquidityPriceImpactParams,
  SdkCalculateAmountReceivedParams,
  SdkCalculateRemoveLiquidityPriceImpactParams,
  SdkCalculateRemoveSwapLiquidityOneTokenParams,
  SdkCalculateRemoveSwapLiquidityParams,
  SdkCalculateSwapLocalParams,
  SdkCalculateSwapParams,
  SdkCalculateSwapPriceImpactParams,
  SdkCalculateTokenAmountParams,
  SdkGetAdoptedParams,
  SdkGetDailySwapVolumeParams,
  SdkGetHourlySwapVolumeParams,
  SdkGetLPTokenAddressParams,
  SdkGetLiquidityMiningAprPerPoolParams,
  SdkGetPoolDataParams,
  SdkGetPoolParams,
  SdkGetPoolTokenAddressParams,
  SdkGetPoolTokenBalanceParams,
  SdkGetPoolTokenDecimalsParams,
  SdkGetPoolTokenIndexParams,
  SdkGetRepresentationParams,
  SdkGetTokenPriceParams,
  SdkGetTokenSupplyParams,
  SdkGetTokenSwapEventsParams,
  SdkGetTokenUserBalanceParams,
  SdkGetUserPoolsParams,
  SdkGetVirtualPriceParams,
  SdkGetYieldDataParams,
  SdkGetYieldStatsForDaysParams,
  SdkRemoveLiquidityImbalanceParams,
  SdkRemoveLiquidityOneTokenParams,
  SdkRemoveLiquidityParams,
  SdkSwapParams,
  Options,
} from "../src/sdk-types";
import { expect, mkAddress } from "@connext/nxtp-utils";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockConnextAddress = mockConfig.chains[mock.domain.A].deployments!.connext;

const chainId = +mock.chain.A;
const relayerFee = BigNumber.from("1");
const mockXTransfer = mock.entity.xtransfer();
const mockGenericTxRequest: providers.TransactionRequest = {
  to: mockConnextAddress,
  data: "0x",
  from: mock.config().signerAddress,
  value: relayerFee,
  chainId,
};
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
    balance: "205608700888",
  },
  adopted: {
    address: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
    name: "USDC Coin",
    symbol: "USDC",
    decimals: 6,
    index: 1,
    balance: "223116010913",
  },
  lpTokenAddress: "0xb12a1be740b99d845af98098965af761be6bd7fe",
  canonicalHash: "0x6d9af4a33ed4034765652ab0f44205952bc6d92198d3ef78fe3fb2b078d0941c",
  balances: ["100000000000000", "200000000000000"],
  decimals: [6, 6],
  invariant: "300000000000000",
  initialA: "20000",
  initialATime: 0,
  futureA: "20000",
  futureATime: 0,
  currentA: "20000",
  swapFee: "4000000",
  adminFee: "0",
};
const mockPoolBN: Pool = {
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
  let axiosPostStub: SinonStub;
  let expectedBaseUri: string;

  beforeEach(async () => {
    sdkPool = await SdkPool.create(mockConfig, undefined, mockChainData);
    axiosPostStub = stub(MockableFns, "axiosPost");
    expectedBaseUri = sdkPool.baseUri;
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

      expect(sdkPool.calculateSwap).to.be.a("function");
      expect(sdkPool.calculateSwapLocal).to.be.a("function");
      expect(sdkPool.getSwapOut).to.be.a("function");
      expect(sdkPool.calculateAmountReceived).to.be.a("function");
      expect(sdkPool.scientificToBigInt).to.be.a("function");
      expect(sdkPool.calculateTokenAmount).to.be.a("function");
      expect(sdkPool.calculateRemoveSwapLiquidity).to.be.a("function");
      expect(sdkPool.calculateRemoveSwapLiquidityOneToken).to.be.a("function");
      expect(sdkPool.calculatePriceImpact).to.be.a("function");
      expect(sdkPool.calculateAddLiquidityPriceImpact).to.be.a("function");
      expect(sdkPool.calculateRemoveLiquidityPriceImpact).to.be.a("function");
      expect(sdkPool.calculateSwapPriceImpact).to.be.a("function");
      expect(sdkPool.getTokenPrice).to.be.a("function");
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
      expect(sdkPool.removeLiquidityOneToken).to.be.a("function");
      expect(sdkPool.removeLiquidity).to.be.a("function");
      expect(sdkPool.removeLiquidityImbalance).to.be.a("function");
      expect(sdkPool.swap).to.be.a("function");
      expect(sdkPool.getPool).to.be.a("function");
      expect(sdkPool.getUserPools).to.be.a("function");
      expect(sdkPool.getYieldStatsForDays).to.be.a("function");
      expect(sdkPool.calculateYield).to.be.a("function");
      expect(sdkPool.getYieldData).to.be.a("function");
      expect(sdkPool.getLiquidityMiningAprPerPool).to.be.a("function");
      expect(sdkPool.getHourlySwapVolume).to.be.a("function");
      expect(sdkPool.getDailySwapVolume).to.be.a("function");
    });
  });

  describe("#calculateSwap", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/calculateSwap";
      const expectedArgs: SdkCalculateSwapParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        tokenIndexFrom: 0,
        tokenIndexTo: 1,
        amount: "100",
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };
      const mockServerRes = {
        type: "BigNumber",
        hex: "0x1",
      };
      const expectedRes = BigNumber.from(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkPool.calculateSwap(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.tokenIndexFrom,
        expectedArgs.tokenIndexTo,
        expectedArgs.amount,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.deep.eq(expectedRes);
    });

    it("happy: should send request with overridden options", async () => {
      const expectedEndpoint = "/calculateSwap";
      const expectedArgs: SdkCalculateSwapParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        tokenIndexFrom: 0,
        tokenIndexTo: 1,
        amount: "100",
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "404": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };
      const mockServerRes = {
        type: "BigNumber",
        hex: "0x1",
      };
      const expectedRes = BigNumber.from(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkPool.calculateSwap(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.tokenIndexFrom,
        expectedArgs.tokenIndexTo,
        expectedArgs.amount,
        options,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options,
      });
      expect(res).to.deep.eq(expectedRes);
    });
  });

  describe("#calculateSwapLocal", async () => {
    it("happy: should work", async () => {
      const expectedArgs: SdkCalculateSwapLocalParams = {
        domainId: mockXTransfer.xparams.originDomain,
        pool: mockPool,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        tokenIndexFrom: 0,
        tokenIndexTo: 1,
        amount: "100",
      };
      const expectedRes = BigNumber.from(199920000000000);

      const res = await sdkPool.calculateSwapLocal(
        expectedArgs.domainId,
        mockPoolBN,
        expectedArgs.tokenAddress,
        expectedArgs.tokenIndexFrom,
        expectedArgs.tokenIndexTo,
        expectedArgs.amount,
      );

      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getSwapOut", async () => {
    it("happy: should calculate swap out", async () => {
      const mockX = BigNumber.from("100000000000000");
      const mockxp = [BigNumber.from("100000000000000")];
      const mockIndexFrom = 1;
      const mockIndexTo = 1;
      const swapOut = await sdkPool.getSwapOut(mockPoolBN, mockX, mockxp, mockIndexFrom, mockIndexTo);
      expect(swapOut).not.to.be.eq(null);
    });
  });

  describe("#calculateAmountReceived", () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/calculateAmountReceived";
      const expectedArgs: SdkCalculateAmountReceivedParams = {
        originDomain: mockXTransfer.xparams.originDomain,
        destinationDomain: mockXTransfer.xparams.destinationDomain,
        originTokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        amount: "100",
        receiveLocal: false,
        checkFastLiquidity: false,
      };
      const mockServerRes = {
        amountReceived: {
          type: "BigNumber",
          hex: "0x1",
        },
        originSlippage: {
          type: "BigNumber",
          hex: "0x1",
        },
        routerFee: {
          type: "BigNumber",
          hex: "0x1",
        },
        destinationSlippage: {
          type: "BigNumber",
          hex: "0x1",
        },
        isFastPath: true,
      };
      const expectedRes = convertBigNumberObject(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkPool.calculateAmountReceived(
        expectedArgs.originDomain,
        expectedArgs.destinationDomain,
        expectedArgs.originTokenAddress,
        expectedArgs.amount,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.deep.eq(expectedRes);
    });
  });

  describe("#scientificToBigInt", async () => {
    it("happy: should get bigInt", async () => {
      const mockscientificNotationString = "1e18";
      const bigInt = sdkPool.scientificToBigInt(mockscientificNotationString);
      expect(bigInt).to.be.eq(BigInt(1000000000000000000));
    });
  });

  describe("#calculateTokenAmount", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/calculateTokenAmount";
      const expectedArgs: SdkCalculateTokenAmountParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        amounts: ["100", "100"],
        isDeposit: true,
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };
      const mockServerRes = {
        type: "BigNumber",
        hex: "0x1",
      };
      const expectedRes = BigNumber.from(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkPool.calculateTokenAmount(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.amounts,
        expectedArgs.isDeposit,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.deep.eq(expectedRes);
    });

    it("happy: should send request with overridden options", async () => {
      const expectedEndpoint = "/calculateTokenAmount";
      const expectedArgs: SdkCalculateTokenAmountParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        amounts: ["100", "100"],
        isDeposit: true,
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "404": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };
      const mockServerRes = {
        type: "BigNumber",
        hex: "0x1",
      };
      const expectedRes = BigNumber.from(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkPool.calculateTokenAmount(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.amounts,
        expectedArgs.isDeposit,
        options,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options,
      });
      expect(res).to.deep.eq(expectedRes);
    });
  });

  describe("#calculateRemoveSwapLiquidity", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/calculateRemoveSwapLiquidity";
      const expectedArgs: SdkCalculateRemoveSwapLiquidityParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        amount: "100",
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };
      const mockServerRes = [
        {
          type: "BigNumber",
          hex: "0x1",
        },
        {
          type: "BigNumber",
          hex: "0x1",
        },
      ];
      const expectedRes = [BigNumber.from(mockServerRes[0]), BigNumber.from(mockServerRes[1])];

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkPool.calculateRemoveSwapLiquidity(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.amount,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.deep.eq(expectedRes);
    });

    it("happy: should send request with overridden options", async () => {
      const expectedEndpoint = "/calculateRemoveSwapLiquidity";
      const expectedArgs: SdkCalculateRemoveSwapLiquidityParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        amount: "100",
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "404": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };
      const mockServerRes = [
        {
          type: "BigNumber",
          hex: "0x1",
        },
        {
          type: "BigNumber",
          hex: "0x1",
        },
      ];
      const expectedRes = [BigNumber.from(mockServerRes[0]), BigNumber.from(mockServerRes[1])];

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkPool.calculateRemoveSwapLiquidity(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.amount,
        options,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options,
      });
      expect(res).to.deep.eq(expectedRes);
    });
  });

  describe("#calculateRemoveSwapLiquidityOneToken", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/calculateRemoveSwapLiquidityOneToken";
      const expectedArgs: SdkCalculateRemoveSwapLiquidityOneTokenParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        amount: "100",
        index: 0,
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };
      const mockServerRes = {
        type: "BigNumber",
        hex: "0x1",
      };
      const expectedRes = BigNumber.from(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkPool.calculateRemoveSwapLiquidityOneToken(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.amount,
        expectedArgs.index,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });

    it("happy: should send request with overridden options", async () => {
      const expectedEndpoint = "/calculateRemoveSwapLiquidityOneToken";
      const expectedArgs: SdkCalculateRemoveSwapLiquidityOneTokenParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        amount: "100",
        index: 0,
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "404": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };
      const mockServerRes = {
        type: "BigNumber",
        hex: "0x1",
      };
      const expectedRes = BigNumber.from(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkPool.calculateRemoveSwapLiquidityOneToken(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.amount,
        expectedArgs.index,
        options,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options,
      });
      expect(res).to.be.deep.eq(expectedRes);
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
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/calculateAddLiquidityPriceImpact";
      const expectedArgs: SdkCalculateAddLiquidityPriceImpactParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        amountX: "100",
        amountY: "100",
      };
      const mockServerRes = {
        type: "BigNumber",
        hex: "0x1",
      };
      const expectedRes = BigNumber.from(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkPool.calculateAddLiquidityPriceImpact(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.amountX,
        expectedArgs.amountY,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#calculateRemoveLiquidityPriceImpact", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/calculateRemoveLiquidityPriceImpact";
      const expectedArgs: SdkCalculateRemoveLiquidityPriceImpactParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        amountX: "100",
        amountY: "100",
      };
      const mockServerRes = {
        type: "BigNumber",
        hex: "0x1",
      };
      const expectedRes = BigNumber.from(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkPool.calculateRemoveLiquidityPriceImpact(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.amountX,
        expectedArgs.amountY,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#calculateSwapPriceImpact", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/calculateSwapPriceImpact";
      const expectedArgs: SdkCalculateSwapPriceImpactParams = {
        domainId: mockXTransfer.xparams.originDomain,
        amountX: "100",
        tokenX: mock.asset.A.address,
        tokenY: mock.asset.B.address,
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };
      const mockServerRes = {
        type: "BigNumber",
        hex: "0x1",
      };
      const expectedRes = BigNumber.from(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkPool.calculateSwapPriceImpact(
        expectedArgs.domainId,
        expectedArgs.amountX,
        expectedArgs.tokenX,
        expectedArgs.tokenY,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });

    it("happy: should send request with overridden options", async () => {
      const expectedEndpoint = "/calculateSwapPriceImpact";
      const expectedArgs: SdkCalculateSwapPriceImpactParams = {
        domainId: mockXTransfer.xparams.originDomain,
        amountX: "100",
        tokenX: mock.asset.A.address,
        tokenY: mock.asset.B.address,
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "404": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };
      const mockServerRes = {
        type: "BigNumber",
        hex: "0x1",
      };
      const expectedRes = BigNumber.from(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkPool.calculateSwapPriceImpact(
        expectedArgs.domainId,
        expectedArgs.amountX,
        expectedArgs.tokenX,
        expectedArgs.tokenY,
        options,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options,
      });
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getTokenPrice", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getTokenPrice";
      const expectedArgs: SdkGetTokenPriceParams = {
        tokenSymbol: "USDC",
      };
      const expectedRes = BigNumber.from(1);

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkPool.getTokenPrice(expectedArgs.tokenSymbol);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getLPTokenAddress", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getLPTokenAddress";
      const expectedArgs: SdkGetLPTokenAddressParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
      };
      const expectedRes = "0x0000000000000000000000000000000000000000";

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkPool.getLPTokenAddress(expectedArgs.domainId, expectedArgs.tokenAddress);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getTokenSupply", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getTokenSupply";
      const expectedArgs: SdkGetTokenSupplyParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
          originProviderUrl: mockConfig.chains[mock.domain.A].providers?.[0],
        },
      };
      const mockServerRes = {
        type: "BigNumber",
        hex: "0x1",
      };
      const expectedRes = BigNumber.from(mockServerRes);

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkPool.getTokenSupply(expectedArgs.domainId, expectedArgs.tokenAddress);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });

    it("happy: should send request with overridden options", async () => {
      const expectedEndpoint = "/getTokenSupply";
      const expectedArgs: SdkGetTokenSupplyParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "404": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };
      const mockServerRes = {
        type: "BigNumber",
        hex: "0x1",
      };
      const expectedRes = BigNumber.from(mockServerRes);

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkPool.getTokenSupply(expectedArgs.domainId, expectedArgs.tokenAddress, options);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options,
      });
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getTokenUserBalance", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getTokenUserBalance";
      const expectedArgs: SdkGetTokenUserBalanceParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        userAddress: "0x0000000000000000000000000000000000000000",
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
          originProviderUrl: mockConfig.chains[mock.domain.A].providers?.[0],
        },
      };
      const mockServerRes = {
        type: "BigNumber",
        hex: "0x1",
      };
      const expectedRes = BigNumber.from(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkPool.getTokenUserBalance(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.userAddress,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });

    it("happy: should send request with overridden options", async () => {
      const expectedEndpoint = "/getTokenUserBalance";
      const expectedArgs: SdkGetTokenUserBalanceParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        userAddress: "0x0000000000000000000000000000000000000000",
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "404": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };
      const mockServerRes = {
        type: "BigNumber",
        hex: "0x1",
      };
      const expectedRes = BigNumber.from(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkPool.getTokenUserBalance(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.userAddress,
        options,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options,
      });
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getPoolTokenIndex", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getPoolTokenIndex";
      const expectedArgs: SdkGetPoolTokenIndexParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        poolTokenAddress: mockXTransfer.origin!.assets.transacting.asset,
      };
      const expectedRes = 0;

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkPool.getPoolTokenIndex(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.poolTokenAddress,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getPoolTokenDecimals", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getPoolTokenDecimals";
      const expectedArgs: SdkGetPoolTokenDecimalsParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        poolTokenAddress: mockXTransfer.origin!.assets.transacting.asset,
      };
      const expectedRes = 0;

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkPool.getPoolTokenDecimals(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.poolTokenAddress,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getPoolTokenBalance", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getPoolTokenBalance";
      const expectedArgs: SdkGetPoolTokenBalanceParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        poolTokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        _index: 0,
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };
      const mockServerRes = {
        type: "BigNumber",
        hex: "0x1",
      };
      const expectedRes = BigNumber.from(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkPool.getPoolTokenBalance(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.poolTokenAddress,
        expectedArgs._index,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });

    it("happy: should send request with overridden options", async () => {
      const expectedEndpoint = "/getPoolTokenBalance";
      const expectedArgs: SdkGetPoolTokenBalanceParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        poolTokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        _index: 0,
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "404": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };
      const mockServerRes = {
        type: "BigNumber",
        hex: "0x1",
      };
      const expectedRes = BigNumber.from(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkPool.getPoolTokenBalance(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.poolTokenAddress,
        expectedArgs._index,
        options,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options,
      });
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getPoolTokenAddress", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getPoolTokenAddress";
      const expectedArgs: SdkGetPoolTokenAddressParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        index: 0,
      };
      const expectedRes = "0x0000000000000000000000000000000000000000";

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkPool.getPoolTokenAddress(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.index,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getVirtualPrice", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getVirtualPrice";
      const expectedArgs: SdkGetVirtualPriceParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };
      const mockServerRes = {
        type: "BigNumber",
        hex: "0x1",
      };
      const expectedRes = BigNumber.from(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkPool.getVirtualPrice(expectedArgs.domainId, expectedArgs.tokenAddress);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });

    it("happy: should send request with overridden options", async () => {
      const expectedEndpoint = "/getVirtualPrice";
      const expectedArgs: SdkGetVirtualPriceParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "404": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };
      const mockServerRes = {
        type: "BigNumber",
        hex: "0x1",
      };
      const expectedRes = BigNumber.from(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkPool.getVirtualPrice(expectedArgs.domainId, expectedArgs.tokenAddress, options);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options,
      });
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getRepresentation", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getRepresentation";
      const expectedArgs: SdkGetRepresentationParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
      };
      const expectedRes = "0x0000000000000000000000000000000000000000";

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkPool.getRepresentation(expectedArgs.domainId, expectedArgs.tokenAddress);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getAdopted", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getAdopted";
      const expectedArgs: SdkGetAdoptedParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
      };
      const expectedRes = "0x0000000000000000000000000000000000000000";

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkPool.getAdopted(expectedArgs.domainId, expectedArgs.tokenAddress);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getTokenSwapEvents", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getTokenSwapEvents";
      const expectedArgs: SdkGetTokenSwapEventsParams = {};
      const expectedRes = {};

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkPool.getTokenSwapEvents(expectedArgs);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getPoolData", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getPoolData";
      const expectedArgs: SdkGetPoolDataParams = {};
      const expectedRes = {};

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkPool.getPoolData(expectedArgs);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#addLiquidity", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/addLiquidity";
      const expectedArgs: SdkAddLiquidityParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        amounts: ["100", "100"],
        minToMint: "0",
        deadline: 100000,
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkPool.addLiquidity(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.amounts,
        expectedArgs.minToMint,
        expectedArgs.deadline,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(mockGenericTxRequest);
    });

    it("happy: should send request with overridden options", async () => {
      const expectedEndpoint = "/addLiquidity";
      const expectedArgs: SdkAddLiquidityParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        amounts: ["100", "100"],
        minToMint: "0",
        deadline: 100000,
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "404": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkPool.addLiquidity(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.amounts,
        expectedArgs.minToMint,
        expectedArgs.deadline,
        options,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options,
      });
      expect(res).to.be.deep.eq(mockGenericTxRequest);
    });
  });

  describe("#removeLiquidityOneToken", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/removeLiquidityOneToken";
      const expectedArgs: SdkRemoveLiquidityOneTokenParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        withdrawTokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        amount: "100",
        minAmount: "0",
        deadline: 100000,
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkPool.removeLiquidityOneToken(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.withdrawTokenAddress,
        expectedArgs.amount,
        expectedArgs.minAmount,
        expectedArgs.deadline,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(mockGenericTxRequest);
    });

    it("happy: should send request with overridden options", async () => {
      const expectedEndpoint = "/removeLiquidityOneToken";
      const expectedArgs: SdkRemoveLiquidityOneTokenParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        withdrawTokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        amount: "100",
        minAmount: "0",
        deadline: 100000,
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "404": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkPool.removeLiquidityOneToken(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.withdrawTokenAddress,
        expectedArgs.amount,
        expectedArgs.minAmount,
        expectedArgs.deadline,
        options,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options,
      });
      expect(res).to.be.deep.eq(mockGenericTxRequest);
    });
  });

  describe("#removeLiquidity", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/removeLiquidity";
      const expectedArgs: SdkRemoveLiquidityParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        amount: "100",
        minAmounts: ["100", "100"],
        deadline: 100000,
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkPool.removeLiquidity(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.amount,
        expectedArgs.minAmounts,
        expectedArgs.deadline,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(mockGenericTxRequest);
    });

    it("happy: should send request with overridden options", async () => {
      const expectedEndpoint = "/removeLiquidity";
      const expectedArgs: SdkRemoveLiquidityParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        amount: "100",
        minAmounts: ["100", "100"],
        deadline: 100000,
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "404": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkPool.removeLiquidity(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.amount,
        expectedArgs.minAmounts,
        expectedArgs.deadline,
        options,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options,
      });
      expect(res).to.be.deep.eq(mockGenericTxRequest);
    });
  });

  describe("#removeLiquidityImbalance", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/removeLiquidityImbalance";
      const expectedArgs: SdkRemoveLiquidityImbalanceParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        amounts: ["100", "100"],
        maxBurnAmount: "0",
        deadline: 100000,
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkPool.removeLiquidityImbalance(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.amounts,
        expectedArgs.maxBurnAmount,
        expectedArgs.deadline,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(mockGenericTxRequest);
    });

    it("happy: should send request with overridden options", async () => {
      const expectedEndpoint = "/removeLiquidityImbalance";
      const expectedArgs: SdkRemoveLiquidityImbalanceParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        amounts: ["100", "100"],
        maxBurnAmount: "0",
        deadline: 100000,
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "404": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkPool.removeLiquidityImbalance(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.amounts,
        expectedArgs.maxBurnAmount,
        expectedArgs.deadline,
        options,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options,
      });
      expect(res).to.be.deep.eq(mockGenericTxRequest);
    });
  });

  describe("#swap", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/swap";
      const expectedArgs: SdkSwapParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        from: mockXTransfer.origin!.assets.transacting.asset,
        to: mockXTransfer.origin!.assets.bridged.asset,
        amount: "1000",
        minDy: 0,
        deadline: 100000,
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkPool.swap(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.from,
        expectedArgs.to,
        expectedArgs.amount,
        expectedArgs.minDy,
        expectedArgs.deadline,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(mockGenericTxRequest);
    });

    it("happy: should send request with overridden options", async () => {
      const expectedEndpoint = "/swap";
      const expectedArgs: SdkSwapParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        from: mockXTransfer.origin!.assets.transacting.asset,
        to: mockXTransfer.origin!.assets.bridged.asset,
        amount: "1000",
        minDy: 0,
        deadline: 100000,
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "404": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkPool.swap(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.from,
        expectedArgs.to,
        expectedArgs.amount,
        expectedArgs.minDy,
        expectedArgs.deadline,
        options,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options,
      });
      expect(res).to.be.deep.eq(mockGenericTxRequest);
    });
  });

  describe("#getPool", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getPool";
      const expectedArgs: SdkGetPoolParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
      };
      const mockServerRes = {
        domainId: "9991",
        name: "WETH Pool",
        symbol: "WETH-nextWETH",
        local: {
          address: "0x1E5341E4b7ed5D0680d9066aac0396F0b1bD1E69",
          name: "nextWETH",
          symbol: "nextWETH",
          decimals: 18,
          index: 0,
          balance: {
            type: "BigNumber",
            hex: "0x1ef4c8cbee1a7077",
          },
        },
        adopted: {
          address: "0xFD2AB41e083c75085807c4A65C0A14FDD93d55A9",
          name: "Wrapped Ether",
          symbol: "WETH",
          decimals: 18,
          index: 1,
          balance: {
            type: "BigNumber",
            hex: "0x03bd8fcf8ed970",
          },
        },
        lpTokenAddress: "0x6abd68912d3b4bad9d8979aad3de6a392bb7bbb0",
        canonicalHash: "0x292e02936c5b0f88fab7f755caac58d92cd10b13f484cd46f6dd45468cb23e3f",
        balances: [
          {
            type: "BigNumber",
            hex: "0x1ef4c8cbee1a7077",
          },
          {
            type: "BigNumber",
            hex: "0x03bd8fcf8ed970",
          },
        ],
        decimals: [18, 18],
        invariant: {
          type: "BigNumber",
          hex: "0x13fcc233687bc6d2",
        },
        initialA: {
          type: "BigNumber",
          hex: "0x4e20",
        },
        initialATime: 0,
        futureA: {
          type: "BigNumber",
          hex: "0x4e20",
        },
        futureATime: 0,
        currentA: {
          type: "BigNumber",
          hex: "0x4e20",
        },
        swapFee: "4000000",
        adminFee: "0",
      };
      const expectedRes = convertBigNumberObject(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkPool.getPool(expectedArgs.domainId, expectedArgs.tokenAddress);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getUserPools", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getUserPools";
      const expectedArgs: SdkGetUserPoolsParams = {
        domainId: mockXTransfer.xparams.originDomain,
        userAddress: mockXTransfer.origin!.assets.transacting.asset,
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
          originProviderUrl: mockConfig.chains[mock.domain.A].providers?.[0],
        },
      };
      const mockServerRes = [
        {
          info: {
            domainId: "9991",
            name: "WETH Pool",
            symbol: "WETH-nextWETH",
            local: {
              address: "0x1E5341E4b7ed5D0680d9066aac0396F0b1bD1E69",
              name: "nextWETH",
              symbol: "nextWETH",
              decimals: 18,
              index: 0,
              balance: {
                type: "BigNumber",
                hex: "0x1ef4c8cbee1a7077",
              },
            },
            adopted: {
              address: "0xFD2AB41e083c75085807c4A65C0A14FDD93d55A9",
              name: "Wrapped Ether",
              symbol: "WETH",
              decimals: 18,
              index: 1,
              balance: {
                type: "BigNumber",
                hex: "0x03bd8fcf8ed970",
              },
            },
            lpTokenAddress: "0x6abd68912d3b4bad9d8979aad3de6a392bb7bbb0",
            canonicalHash: "0x292e02936c5b0f88fab7f755caac58d92cd10b13f484cd46f6dd45468cb23e3f",
            balances: [
              {
                type: "BigNumber",
                hex: "0x1ef4c8cbee1a7077",
              },
              {
                type: "BigNumber",
                hex: "0x03bd8fcf8ed970",
              },
            ],
            decimals: [18, 18],
            invariant: {
              type: "BigNumber",
              hex: "0x13fcc233687bc6d2",
            },
            initialA: {
              type: "BigNumber",
              hex: "0x4e20",
            },
            initialATime: 0,
            futureA: {
              type: "BigNumber",
              hex: "0x4e20",
            },
            futureATime: 0,
            currentA: {
              type: "BigNumber",
              hex: "0x4e20",
            },
            swapFee: "4000000",
            adminFee: "0",
          },
          lpTokenBalance: {
            type: "BigNumber",
            hex: "0x470de4df820000",
          },
          poolTokenBalances: [
            {
              type: "BigNumber",
              hex: "0x068dbe6b7a8a002b",
            },
            {
              type: "BigNumber",
              hex: "0x36a0e6a7c8ab86d067c3437476d8",
            },
          ],
        },
      ];
      const expectedRes = [convertBigNumberObject(mockServerRes[0])];

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkPool.getUserPools(expectedArgs.domainId, expectedArgs.userAddress);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.deep.equal(expectedRes);
    });

    it("happy: should send request with overridden options", async () => {
      const expectedEndpoint = "/getUserPools";
      const expectedArgs: SdkGetUserPoolsParams = {
        domainId: mockXTransfer.xparams.originDomain,
        userAddress: mockXTransfer.origin!.assets.transacting.asset,
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "404": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };
      const mockServerRes = [
        {
          info: {
            domainId: "9991",
            name: "WETH Pool",
            symbol: "WETH-nextWETH",
            local: {
              address: "0x1E5341E4b7ed5D0680d9066aac0396F0b1bD1E69",
              name: "nextWETH",
              symbol: "nextWETH",
              decimals: 18,
              index: 0,
              balance: {
                type: "BigNumber",
                hex: "0x1ef4c8cbee1a7077",
              },
            },
            adopted: {
              address: "0xFD2AB41e083c75085807c4A65C0A14FDD93d55A9",
              name: "Wrapped Ether",
              symbol: "WETH",
              decimals: 18,
              index: 1,
              balance: {
                type: "BigNumber",
                hex: "0x03bd8fcf8ed970",
              },
            },
            lpTokenAddress: "0x6abd68912d3b4bad9d8979aad3de6a392bb7bbb0",
            canonicalHash: "0x292e02936c5b0f88fab7f755caac58d92cd10b13f484cd46f6dd45468cb23e3f",
            balances: [
              {
                type: "BigNumber",
                hex: "0x1ef4c8cbee1a7077",
              },
              {
                type: "BigNumber",
                hex: "0x03bd8fcf8ed970",
              },
            ],
            decimals: [18, 18],
            invariant: {
              type: "BigNumber",
              hex: "0x13fcc233687bc6d2",
            },
            initialA: {
              type: "BigNumber",
              hex: "0x4e20",
            },
            initialATime: 0,
            futureA: {
              type: "BigNumber",
              hex: "0x4e20",
            },
            futureATime: 0,
            currentA: {
              type: "BigNumber",
              hex: "0x4e20",
            },
            swapFee: "4000000",
            adminFee: "0",
          },
          lpTokenBalance: {
            type: "BigNumber",
            hex: "0x470de4df820000",
          },
          poolTokenBalances: [
            {
              type: "BigNumber",
              hex: "0x068dbe6b7a8a002b",
            },
            {
              type: "BigNumber",
              hex: "0x36a0e6a7c8ab86d067c3437476d8",
            },
          ],
        },
      ];
      const expectedRes = [convertBigNumberObject(mockServerRes[0])];

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkPool.getUserPools(expectedArgs.domainId, expectedArgs.userAddress, options);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options,
      });
      expect(res).to.deep.equal(expectedRes);
    });
  });

  describe("#getYieldStatsForDays", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getYieldStatsForDays";
      const expectedArgs: SdkGetYieldStatsForDaysParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        unixTimestamp: 1000000,
        days: 1,
      };
      const mockServerRes = {
        totalFeesFormatted: 0.000037987101001304,
        totalLiquidityFormatted: 2.231681343944215,
        totalVolume: {
          type: "BigNumber",
          hex: "0x015164aaf112f3f9",
        },
        totalVolumeFormatted: 0.09496775250326016,
      };
      const expectedRes = convertBigNumberObject(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkPool.getYieldStatsForDays(
        expectedArgs.domainId,
        expectedArgs.tokenAddress,
        expectedArgs.unixTimestamp,
        expectedArgs.days,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
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
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getYieldData";
      const expectedArgs: SdkGetYieldDataParams = {
        domainId: mockXTransfer.xparams.originDomain,
        tokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        days: 1,
      };
      const expectedRes = {};

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkPool.getYieldData(expectedArgs.domainId, expectedArgs.tokenAddress, expectedArgs.days);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getLiquidityMiningAprPerPool", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getLiquidityMiningAprPerPool";
      const expectedArgs: SdkGetLiquidityMiningAprPerPoolParams = {
        totalTokens: 100,
        totalBlocks: 100,
        numPools: 1,
        tokenSymbol: "USDC",
        poolTVL: 10000000,
      };
      const expectedRes = BigNumber.from(1);

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkPool.getLiquidityMiningAprPerPool(
        expectedArgs.totalTokens,
        expectedArgs.totalBlocks,
        expectedArgs.numPools,
        expectedArgs.tokenSymbol,
        expectedArgs.poolTVL,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getHourlySwapVolume", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getHourlySwapVolume";
      const expectedArgs: SdkGetHourlySwapVolumeParams = {
        domainId: mockXTransfer.xparams.originDomain,
      };
      const expectedRes = {};

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkPool.getHourlySwapVolume(expectedArgs);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#getDailySwapVolume", async () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/getDailySwapVolume";
      const expectedArgs: SdkGetDailySwapVolumeParams = {
        domainId: mockXTransfer.xparams.originDomain,
      };
      const expectedRes = {};

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkPool.getDailySwapVolume(expectedArgs);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });
});
