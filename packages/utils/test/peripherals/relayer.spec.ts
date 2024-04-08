import { restore, reset, stub, SinonStub } from "sinon";
import { BigNumber } from "ethers";

import { expect, Logger, calculateRelayerFee, mock, chainDataToMap } from "../../src";
import * as GelatoFns from "../../src/peripherals/gelato";
import * as AssetFns from "../../src/helpers/asset";

const logger = new Logger({ name: "TEST", level: "debug" });
describe("Peripherals:Relayer", () => {
  describe("#calculateRelayerFee", () => {
    let getConversionRateStub: SinonStub;
    let getGelatoEstimatedFeeStub: SinonStub;
    beforeEach(() => {
      getConversionRateStub = stub(GelatoFns, "getConversionRate");
      getGelatoEstimatedFeeStub = stub(GelatoFns, "getGelatoEstimatedFee");
      stub(AssetFns, "getDecimalsForAsset").resolves(18);
    });

    afterEach(() => {
      restore();
      reset();
    });

    it("should return zero value if zero token price", async () => {
      getConversionRateStub.resolves(0);
      getGelatoEstimatedFeeStub.resolves(BigNumber.from(10000));
      const estimatedRelayerFee = await calculateRelayerFee(
        { originDomain: "13337", destinationDomain: "13338" },
        mock.chainData(),
        logger,
      );
      expect(estimatedRelayerFee).to.be.deep.eq(BigNumber.from("0"));
    });

    it("should return correct value", async () => {
      getConversionRateStub.onFirstCall().resolves(1);
      getConversionRateStub.onSecondCall().resolves(1.5);
      getGelatoEstimatedFeeStub.resolves(BigNumber.from(10000));
      const estimatedRelayerFee = await calculateRelayerFee(
        { originDomain: "13337", destinationDomain: "13338" },
        mock.chainData(),
        logger,
      );
      // estimatedRelayerFee = (estimatedGelatoFee + estimatedGelatoFee x buffer_percentage / 100) x ( destinationTokenPrice / originTokenPrice )
      // ==> (10000 + 10000 x 20 / 100) x ( 1.5 / 1 ) = 18000
      expect(estimatedRelayerFee).to.be.deep.eq(BigNumber.from("18000"));
    });

    it("should return correct capped value", async () => {
      getConversionRateStub.onFirstCall().resolves(1);
      getConversionRateStub.onSecondCall().resolves(150);
      getConversionRateStub.onThirdCall().resolves(1);
      getGelatoEstimatedFeeStub.resolves(BigNumber.from(10000));
      const estimatedRelayerFee = await calculateRelayerFee(
        { originDomain: "13337", destinationDomain: "13338" },
        mock.chainData(),
        logger,
      );
      // estimatedRelayerFee = (estimatedGelatoFee + estimatedGelatoFee x buffer_percentage / 100) x ( destinationTokenPrice / originTokenPrice )
      // ==> (10000 + 10000 x 20 / 100) x ( 150 / 1 ) = 1800000 > 1000000
      expect(estimatedRelayerFee).to.be.deep.eq(BigNumber.from("1000000"));
    });

    it("should return correct capped value in native", async () => {
      getConversionRateStub.onFirstCall().resolves(1);
      getConversionRateStub.onSecondCall().resolves(150);
      getConversionRateStub.onThirdCall().resolves(1);
      getGelatoEstimatedFeeStub.resolves(BigNumber.from(10000));
      const estimatedRelayerFee = await calculateRelayerFee(
        { originDomain: "13337", destinationDomain: "13338", priceIn: "native" },
        mock.chainData(),
        logger,
      );
      // estimatedRelayerFee = (estimatedGelatoFee + estimatedGelatoFee x buffer_percentage / 100) x ( destinationTokenPrice / originTokenPrice )
      // ==> (10000 + 10000 x 20 / 100) x ( 150 / 1 ) = 1800000 > 1000000
      expect(estimatedRelayerFee).to.be.deep.eq(BigNumber.from("1000000"));
    });

    it("should return correct value when provided token prices", async () => {
      getGelatoEstimatedFeeStub.resolves(BigNumber.from(10000));
      const estimatedRelayerFee = await calculateRelayerFee(
        {
          originDomain: "13337",
          destinationDomain: "13338",
          originNativeTokenPrice: 1000,
          destinationNativeTokenPrice: 1500,
        },
        mock.chainData(),
        logger,
      );
      // estimatedRelayerFee = (estimatedGelatoFee + estimatedGelatoFee x buffer_percentage / 100) x ( destinationTokenPrice / originTokenPrice )
      // ==> (10000 + 10000 x 20 / 100) x ( 1500 / 1000 ) = 18000
      expect(estimatedRelayerFee).to.be.deep.eq(BigNumber.from("18000"));
    });

    it("should return correct value when provided gas price", async () => {
      getConversionRateStub.onFirstCall().resolves(1);
      getConversionRateStub.onSecondCall().resolves(1.5);
      getGelatoEstimatedFeeStub.resolves(BigNumber.from(0));
      const estimatedRelayerFee = await calculateRelayerFee(
        {
          originDomain: "13337",
          destinationDomain: "13338",
          destinationGasPrice: "50",
        },
        mock.chainData(),
        logger,
      );
      // fallbackRelayerFee = gasPrice x executeGasAmount
      // ==> 50 x 400000 = 20000000
      // estimatedRelayerFee = (fallbackRelayerFee + fallbackRelayerFee x buffer_percentage / 100) x ( destinationTokenPrice / originTokenPrice )
      // ==> (20000000 + 20000000 x 20 / 100) x ( 1.5 / 1 ) = 36000000
      expect(estimatedRelayerFee).to.be.deep.eq(BigNumber.from("36000000"));
    });

    it("should add l1Gas for optimism network", async () => {
      const chainData = chainDataToMap([
        {
          name: "Unit Test Chain 1",
          chainId: parseInt(mock.chain.A),
          domainId: "13337",
          confirmations: 1,
          assetId: {
            "0xBeEFBEEfBeEf0000000000000000000000000000": {
              name: mock.asset.A.name,
              symbol: mock.asset.A.symbol,
              mainnetEquivalent: "0x0000000000000000000000000000000000000000",
              decimals: 18,
            },
            "0x2fAceD0000000000000000000000000000000000": {
              name: mock.asset.B.name,
              symbol: mock.asset.B.symbol,
              mainnetEquivalent: "0x0000000000000000000000000000000000000000",
              decimals: 18,
            },
          },
          subgraphs: {
            runtime: [{ query: "http://example.com", health: "http://example.com" }],
            analytics: [{ query: "http://example.com", health: "http://example.com" }],
            maxLag: 10,
          },
        },
        {
          name: "Unit Test Chain 2",
          chainId: 10, // optimism
          domainId: "13338",
          confirmations: 1,
          assetId: {},
          subgraphs: {
            runtime: [{ query: "http://example.com", health: "http://example.com" }],
            analytics: [{ query: "http://example.com", health: "http://example.com" }],
            maxLag: 10,
          },
        },
      ]);

      getConversionRateStub.onFirstCall().resolves(1);
      getConversionRateStub.onSecondCall().resolves(1.5);
      getGelatoEstimatedFeeStub.onFirstCall().resolves(BigNumber.from(10000));
      const estimatedRelayerFee = await calculateRelayerFee(
        { originDomain: "13337", destinationDomain: "13338" },
        chainData,
        logger,
      );
      // estimatedRelayerFee = (estimatedGelatoFee + estimatedGelatoFee x buffer_percentage / 100) x ( destinationTokenPrice / originTokenPrice )
      // ==> (10000 + 10000 x 20 / 100) x ( 1.5 / 1 ) = 108000
      expect(estimatedRelayerFee).to.be.deep.eq(BigNumber.from("18000"));
    });
  });
});
