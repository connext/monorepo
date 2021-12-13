import { expect } from "@connext/nxtp-utils";
import { getDeployedPriceOracleContract } from "../../src/shared";

describe("Shared contract utils", () => {
  describe("#getDeployedPriceOracleContract", () => {
    it("should return undefined for random chain ID", () => {
      const po = getDeployedPriceOracleContract(1234);
      expect(po).to.be.undefined;
    });

    it("should work", () => {
      const po = getDeployedPriceOracleContract(1);
      expect(po).to.be.ok;
    });
  });
});
