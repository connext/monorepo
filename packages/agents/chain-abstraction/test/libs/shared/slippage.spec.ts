import { expect, mkAddress } from "@connext/nxtp-utils";
import { SinonStub, restore, reset, stub } from "sinon";
import { ethers } from "ethers";

import { getPriceImpactForSwaps, getSlippageDistribution, getAmountOutMinForUniV3 } from "../../../src/libs/shared";
import * as quoteModule from "../../../src/libs/shared/quote";
import * as slippageModule from "../../../src/libs/shared/slippage";
import * as assetModule from "../../../src/helpers/asset";

describe("Libs:slippage", () => {
  const originChain = 1337;
  const originDomain = 133712;
  const destinationChain = 1338;
  const destinationDomain = 133812;
  const inputToken = mkAddress("0x1");
  const outputToken = mkAddress("0x2");
  const inputDecimal = 18;
  const outputDecimal = 18;
  const signerAddress = mkAddress("0x3");
  const originRpc = "https://origin-provider.io";
  const destinationRpc = "https://destination-provider.io";

  let getEstimateAmountReceivedStub: SinonStub;
  let getCoingeckoIDsStub: SinonStub;
  let getTokenPricesInUsdStub: SinonStub;

  beforeEach(() => {
    getCoingeckoIDsStub = stub(assetModule, "getCoingeckoIDs");
    getTokenPricesInUsdStub = stub(assetModule, "getTokenPricesInUsd");
    getEstimateAmountReceivedStub = stub(quoteModule, "getEstimateAmountReceived");
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#getPriceImpactForSwaps", () => {
    const amountIn = ethers.utils.parseUnits("10", inputDecimal);

    it("should calculate price impact correctly", async () => {
      getEstimateAmountReceivedStub.resolves(ethers.utils.parseUnits("5", 18).toString());
      getCoingeckoIDsStub.resolves({ [inputToken]: "inputTokenId", [outputToken]: "outputTokenId" });
      getTokenPricesInUsdStub.resolves([10000, 5000]);

      const priceImpact = await getPriceImpactForSwaps(
        inputToken,
        inputDecimal,
        originChain,
        originRpc,
        outputToken,
        outputDecimal,
        amountIn,
        signerAddress,
      );

      expect(priceImpact).to.equal(50);
    });

    it("should throw an error if the estimate calls fails", async () => {
      getEstimateAmountReceivedStub.throws();

      await expect(
        getPriceImpactForSwaps(
          inputToken,
          inputDecimal,
          originChain,
          originRpc,
          outputToken,
          outputDecimal,
          amountIn,
          signerAddress,
        ),
      ).to.be.rejectedWith(Error, `Failed to get Price Impact`);
    });
  });

  describe("#getSlippageDistribution", () => {
    let getPriceImpactForSwapsStub: SinonStub;

    const amountIn = ethers.utils.parseUnits("10", 18);
    const slippage = "300";

    beforeEach(() => {
      getPriceImpactForSwapsStub = stub(slippageModule, "getPriceImpactForSwaps");
    });

    afterEach(() => {
      restore();
      reset();
    });

    it("should calculate slippage distribution correctly", async () => {
      getEstimateAmountReceivedStub.resolves(ethers.utils.parseUnits("5", 18).toString());
      getPriceImpactForSwapsStub.resolves(10);

      const slippageDistribution = await getSlippageDistribution(
        inputToken,
        originDomain,
        destinationDomain,
        originRpc,
        destinationRpc,
        outputToken,
        outputDecimal,
        amountIn,
        signerAddress,
        inputDecimal,
        slippage,
      );

      expect(slippageDistribution).to.deep.equal({
        originSlippage: 12,
        destinationSlippage: 12,
        connextSlippage: 276,
      });
    });

    it("should throw an error if inputToken is the same as outputToken", async () => {
      const slippage = "300";

      await expect(
        getSlippageDistribution(
          inputToken,
          originDomain,
          destinationDomain,
          originRpc,
          destinationRpc,
          inputToken,
          inputDecimal,
          amountIn,
          signerAddress,
          inputDecimal,
          slippage,
        ),
      ).to.be.rejectedWith(Error, "Slippage cannot be calculated in same tokens");
    });
  });

  describe("#getAmountOutMinForUniV3", () => {
    const amountIn = ethers.utils.parseUnits("10", 18);
    const quoteAmountOut = ethers.utils.parseUnits("5", 18);
    const slippage = "300";

    it("should calculate the minimum amount out correctly", async () => {
      const expectedAmountOutMin =
        parseFloat(ethers.utils.formatUnits(quoteAmountOut, outputDecimal)) * (1 - +slippage);

      getEstimateAmountReceivedStub.resolves(quoteAmountOut);

      const amountOutMin = await getAmountOutMinForUniV3(
        inputToken,
        outputToken,
        originRpc,
        originDomain,
        amountIn,
        signerAddress,
        +slippage,
        outputDecimal,
      );

      expect(amountOutMin).to.equal(expectedAmountOutMin);
    });

    it("should throw an error if the estimate call fails", async () => {
      getEstimateAmountReceivedStub.throws();

      await expect(
        getAmountOutMinForUniV3(
          inputToken,
          outputToken,
          originRpc,
          originDomain,
          amountIn,
          signerAddress,
          +slippage,
          outputDecimal,
        ),
      ).to.be.rejectedWith(Error, "Failed to get Minimum Amount Out for UniV3");
    });
  });
});
