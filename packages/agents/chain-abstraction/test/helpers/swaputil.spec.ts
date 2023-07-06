import { expect, mkAddress, mock } from "@connext/nxtp-utils";
import { stub, reset, restore } from "sinon";
import { getSwapPathForUniV3, getSwapPathForUniV2, getPathForPanCake } from "../../src/helpers/swaputil";
import * as MockableFns from "../../src/mockable";
import { Token, TradeType, CurrencyAmount } from "@uniswap/sdk-core";
import { Fetcher, Pair, Token as _Token, TokenAmount, Route, Trade } from "@uniswap/sdk";
import { FeeAmount } from "@uniswap/v3-sdk";
import {
  Fetcher as PancakeFetcher,
  Pair as PancakePair,
  Token as PancakeToken,
  Route as PancakeRoute,
  Trade as PancakeTrade,
  CurrencyAmount as PancakeCurrencyAmount,
} from "@pancakeswap/sdk";
import { AlphaRouter } from "@uniswap/smart-order-router";
import { ethers } from "ethers";

const mockSwapQuoteCallbackArgs = {
  chainId: 1337,
  quoter: mkAddress("0x123"),
  rpc: "http://localhost:8545",
  fromAsset: mkAddress("0x1"),
  toAsset: mkAddress("0x2"),
  amountIn: "10000000000000000000000",
  fee: "300",
};

class MockJsonRpcProvider {
  public getBlockNumber = stub().resolves(1232132);
}

describe("Helpers:swapUtil", () => {
  beforeEach(() => {
    stub(MockableFns, "JsonRpcProvider").value(MockJsonRpcProvider);
  });

  afterEach(() => {
    restore();
    reset();
  });
  const mockArgs = {
    fromTokenContractAddress: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    toTokenContractAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    chainId: 1,
    rpc: "http://localhost:8545",
    fromTokenDecimal: 18,
    toTokenDecimal: 18,
    amount: "1000000000000000000", // 1 token for example
    signerAddress: mkAddress("1"),
  };

  describe("#getSwapPathForUniV3", () => {
    it("should work", async () => {
      const FEE_SIZE = 3;

      function encodePath(path: string[], fees: FeeAmount[]): string {
        if (path.length != fees.length + 1) {
          throw new Error("path/fee lengths do not match");
        }

        let encoded = "0x";
        for (let i = 0; i < fees.length; i++) {
          // 20 byte encoding of the address
          encoded += path[i].slice(2);
          // 3 byte encoding of the fee
          encoded += fees[i].toString(16).padStart(2 * FEE_SIZE, "0");
        }
        // encode the final token
        encoded += path[path.length - 1].slice(2);

        return encoded.toLowerCase();
      }
      const fakeRoute = {
        quote: CurrencyAmount.fromRawAmount(new Token(1, mockArgs.fromTokenContractAddress, 18), "1000000000000000000"),
        route: [
          {
            tokenPath: [
              new Token(1, mockArgs.fromTokenContractAddress, 18),
              new Token(1, mockArgs.toTokenContractAddress, 18),
            ],
            route: {
              protocol: "V3",
            },
          },
        ],
      };

      stub(ethers.providers, "JsonRpcProvider").returns({});
      stub(AlphaRouter.prototype, "route").resolves(fakeRoute as any);
      const result = await getSwapPathForUniV3(mockArgs);
      const path = encodePath(
        fakeRoute.route[0].tokenPath.map((token) => token.address),
        [FeeAmount.MEDIUM],
      );
      expect(result).to.deep.equal({
        quote: fakeRoute.quote,
        tokenPath: path,
        route: "V3",
      });
    });

    it("should throw an error if no routes found", async () => {
      stub(AlphaRouter.prototype, "route").resolves(null);
      await expect(getSwapPathForUniV3(mockArgs)).to.be.throw;
    });

    it("should propagate any error occurred while getting paths", async () => {
      const fakeError = new Error("Something went wrong");
      stub(AlphaRouter.prototype, "route").rejects(fakeError);

      await expect(getSwapPathForUniV3(mockArgs)).to.be.throw;
    });
  });

  describe("#getSwapPathForUniV2", () => {
    it("should work", async () => {
      const tokenIn = new _Token(mockArgs.chainId, mockArgs.fromTokenContractAddress, 18);
      const tokenOut = new _Token(mockArgs.chainId, mockArgs.toTokenContractAddress, 18);
      const amountIn = new TokenAmount(
        tokenIn,
        ethers.utils.parseUnits(mockArgs.amount, mockArgs.fromTokenDecimal).toString(),
      );
      const amountOut = new TokenAmount(
        tokenOut,
        ethers.utils.parseUnits(mockArgs.amount, mockArgs.toTokenDecimal).toString(),
      );

      const pair = new Pair(amountIn, amountOut);
      const route = new Route([pair], tokenIn);
      const trade = new Trade(route, amountIn, TradeType.EXACT_INPUT);

      stub(ethers.providers, "JsonRpcProvider").returns({});
      stub(Fetcher, "fetchPairData").resolves(pair);
      const result = await getSwapPathForUniV2(mockArgs);
      expect(result).to.be.deep.equal({
        quote: trade.outputAmount.toSignificant(),
        tokenPath: route.path.map((token) => token.address),
        route: "V2",
      });
    });

    it("should propagate any error occurred while getting paths", async () => {
      const fakeError = new Error("Something went wrong");
      stub(Fetcher, "fetchPairData").rejects(fakeError);

      await expect(getSwapPathForUniV2(mockArgs)).to.be.throw;
    });
  });

  describe("#getPathForPanCake", () => {
    it("should work", async () => {
      const tokenIn = new PancakeToken(mockArgs.chainId, mockArgs.fromTokenContractAddress, 18, "");
      const tokenOut = new PancakeToken(mockArgs.chainId, mockArgs.toTokenContractAddress, 18, "");

      const amountIn = PancakeCurrencyAmount.fromRawAmount(tokenIn, mockArgs.amount);
      const amountOut = PancakeCurrencyAmount.fromRawAmount(tokenOut, mockArgs.amount);
      const pair = new PancakePair(amountIn, amountOut);
      const route = new PancakeRoute([pair], tokenIn, tokenOut);
      const trade = new PancakeTrade(route, amountIn, TradeType.EXACT_INPUT);

      stub(ethers.providers, "JsonRpcProvider").returns({});
      stub(PancakeFetcher, "fetchPairData").resolves(pair);
      const result = await getPathForPanCake(mockArgs);
      expect(result).to.be.deep.equal({
        quote: trade.outputAmount.toSignificant(),
        tokenPath: route.path.map((token) => token.address),
        route: "PANCAKE",
      });
    });

    it("should propagate any error occurred while getting paths", async () => {
      const fakeError = new Error("Something went wrong");
      stub(PancakeFetcher, "fetchPairData").rejects(fakeError);

      await expect(getPathForPanCake(mockArgs)).to.be.throw;
    });
  });
});
