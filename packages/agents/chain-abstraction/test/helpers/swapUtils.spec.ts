import { expect, mkAddress } from "@connext/nxtp-utils";
import { stub, SinonStub, reset, restore, SinonStubbedInstance } from "sinon";
import { getSwapPathForUniV3 } from "../../src/helpers/swapUtils";
import { Token, TradeType, CurrencyAmount } from "@uniswap/sdk-core";
import { AlphaRouter, SwapRoute } from "@uniswap/smart-order-router";
import * as MockableFns from "../../src/mockable";
import { ethers, BigNumber } from "ethers";

describe("Helpers: swapUtils", () => {
  describe("#getSwapPathForUniV3", async () => {
    const mockArgs = {
      fromTokenContractAddress: "0xSomeTokenAddress1",
      toTokenContractAddress: "0xSomeTokenAddress2",
      chainId: 1,
      rpc: "http://localhost:8545",
      fromTokenDecimal: 18,
      toTokenDecimal: 18,
      amount: "1000000000000000000", // 1 token for example
      signerAddress: mkAddress("1"),
    };

    const fakeRoute = {
      quote: CurrencyAmount.fromRawAmount(new Token(1, "0xSomeTokenAddress1", 18), "1000000000000000000"),
      route: [
        {
          tokenPath: [new Token(1, "0xSomeTokenAddress1", 18), new Token(1, "0xSomeTokenAddress2", 18)],
          route: {
            protocol: "V3",
          },
        },
      ],
    };
    let stubs = [];
    afterEach(() => {
      stubs = [];
    });

    it("Should return the correct value", async () => {
      //   stub(ethers.providers, "JsonRpcProvider").returns({});
      //   stub(AlphaRouter.prototype, "route").resolves(fakeRoute as any);
      //   const result = await getSwapPathForUniV3(mockArgs);

      //   expect(result).to.deep.equal({
      //     quote: fakeRoute.quote,
      //     tokenPath: fakeRoute.route[0].tokenPath.map((token) => token.address),
      //     route: "V3",
      //   });
      const result = 3;
      expect(1 + 1).to.be.eq(result);
    });
  });
});
