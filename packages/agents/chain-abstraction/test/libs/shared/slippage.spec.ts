import { expect, mkAddress } from "@connext/nxtp-utils";
import { SinonStub, restore, reset, stub } from "sinon";
import { ethers } from "ethers";
import * as SharedFns from "../../../src/libs/shared";

import { getPriceImpactForSwaps, getSlippageDistribution, getAmountOutMinForUniV3 } from "../../../src/libs/shared";
import * as quoteModule from "../../../src/libs/shared/quote";
import * as assetModule from "../../../src/helpers/asset";

describe("Libs:slippage", () => {
  let chainIdToDomainStub: SinonStub;
  let domainToChainIdStub: SinonStub;
  let getEstimateAmountReceivedStub: SinonStub;
  let getCoingeckoIDsStub: SinonStub;
  let getTokenPricesInUsdStub: SinonStub;

  beforeEach(() => {
    chainIdToDomainStub = stub(SharedFns, "chainIdToDomain");
    domainToChainIdStub = stub(SharedFns, "domainToChainId");
    getCoingeckoIDsStub = stub(assetModule, "getCoingeckoIDs");
    getTokenPricesInUsdStub = stub(assetModule, "getTokenPricesInUsd");
    getEstimateAmountReceivedStub = stub(quoteModule, "getEstimateAmountReceived");
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#getPriceImpactForSwaps", () => {
    it("should calculate price impact correctly", async () => {
      const inputToken = mkAddress("0x1");
      const outputToken = mkAddress("0x2");
      const inputDecimal = 18;
      const outputDecimal = 18;
      const chainID = 1;
      const rpc = "https://some-provider.io";
      const amountIn = ethers.utils.parseUnits("10", inputDecimal);
      const signerAddress = mkAddress("0x3");

      chainIdToDomainStub.returns(1);
      getEstimateAmountReceivedStub.resolves(ethers.utils.parseUnits("5", 18).toString());
      getCoingeckoIDsStub.resolves({ [inputToken]: "inputTokenId", [outputToken]: "outputTokenId" });
      getTokenPricesInUsdStub.resolves([10000, 5000]);

      const priceImpact = await getPriceImpactForSwaps(
        inputToken,
        inputDecimal,
        chainID,
        rpc,
        outputToken,
        outputDecimal,
        amountIn,
        signerAddress,
      );

      expect(priceImpact).to.equal(50);
    });

    it("should throw an error if one of the underlying calls fails", async () => {
      const inputToken = "0xInputTokenAddress";
      const outputToken = "0xOutputTokenAddress";
      const inputDecimal = 18;
      const outputDecimal = 18;
      const chainID = 1;
      const rpc = "https://some-provider.io";
      const amountIn = ethers.utils.parseUnits("10", inputDecimal);
      const signerAddress = "0xSignerAddress";

      chainIdToDomainStub.returns(1);
      getEstimateAmountReceivedStub.throws();

      await expect(
        getPriceImpactForSwaps(
          inputToken,
          inputDecimal,
          chainID,
          rpc,
          outputToken,
          outputDecimal,
          amountIn,
          signerAddress,
        ),
      ).to.be.rejectedWith(Error);
    });
  });
});
