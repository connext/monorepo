import { stub, SinonStub } from "sinon";
import { expect } from "@connext/nxtp-utils";

import * as Mockable from "../../../src/mockable";

import { mockContext } from "../../globalTestHook";
import { updateAssetPrices, updateHistoricAssetPrices } from "../../../src/lib/operations";

describe("Asset Prices operations", () => {
  let axiosGetStub: SinonStub;

  describe("#updateAssetPrices", () => {
    it("should work", async () => {
      axiosGetStub = stub(Mockable, "axiosGet");
      axiosGetStub.resolves({ data: { ethereum: { usd: 100 } } });

      await updateAssetPrices();
      expect(mockContext.adapters.database.saveAssetPrice as SinonStub).callCount(1);

      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(0);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(0);
    });
  });

  describe("#updateHistoricAssetPrices", () => {
    it("should work", async () => {
      axiosGetStub = stub(Mockable, "axiosGet");
      axiosGetStub.resolves({ data: { prices: [[1392595200000, 100]] } });

      await updateHistoricAssetPrices();
      expect(mockContext.adapters.database.saveAssetPrice as SinonStub).callCount(1);

      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(1);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(1);
    });
  });
});
