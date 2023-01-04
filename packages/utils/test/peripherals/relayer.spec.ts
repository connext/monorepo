import { restore, reset, stub, SinonStub } from "sinon";
import { BigNumber } from "ethers";

import { expect, Logger, calculateRelayerFee, mock } from "../../src";
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
  });
});
