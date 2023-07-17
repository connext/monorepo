import { SinonStub } from "sinon";
import { expect } from "@connext/nxtp-utils";
import {
  mockAssetsResponse,
  mockRouterDailyTVLResponse,
  mockRouterResponse,
} from "@connext/nxtp-adapters-subgraph/test/mock";

import { mockContext } from "../../globalTestHook";
import { updateRouters } from "../../../src/lib/operations";
import { updateAssets, updateDailyRouterTvl } from "../../../src/lib/operations/routers";

describe("Routers operations", () => {
  describe("#updateRouters", () => {
    it("should work", async () => {
      await updateRouters();

      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "router_" + mockContext.domains[0],
      );
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "router_" + mockContext.domains[1],
      );

      expect(mockContext.adapters.database.saveRouterBalances as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveRouterBalances as SinonStub).to.be.calledWithExactly(mockRouterResponse);

      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "router_" + mockContext.domains[0],
        44,
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "router_" + mockContext.domains[1],
        44,
      );
    });
    it("intial conditions", async () => {
      (mockContext.adapters.subgraph.getAssetBalancesRouters as SinonStub).resolves([]);
      await updateRouters();

      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "router_" + mockContext.domains[0],
      );
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "router_" + mockContext.domains[1],
      );

      expect(mockContext.adapters.database.saveRouterBalances as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveRouterBalances as SinonStub).to.be.calledWithExactly([]);

      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "router_" + mockContext.domains[0],
        0,
      );
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "router_" + mockContext.domains[1],
        0,
      );
    });
  });

  describe("#updateAssets", () => {
    it("should work", async () => {
      (mockContext.adapters.subgraph.getAssets as SinonStub)
        .withArgs(mockContext.domains[0])
        .resolves([mockAssetsResponse[0]]);
      (mockContext.adapters.subgraph.getAssets as SinonStub)
        .withArgs(mockContext.domains[1])
        .resolves([mockAssetsResponse[1]]);

      await updateAssets();

      expect(mockContext.adapters.database.saveAssets as SinonStub).callCount(1);
      expect(mockContext.adapters.database.saveAssets as SinonStub).to.be.calledWithExactly(mockAssetsResponse);
    });
  });

  describe("#updateDailyRouterTvl", () => {
    it("should work", async () => {
      (mockContext.adapters.subgraph.getLatestBlockNumber as SinonStub).resolves(
        new Map([
          ["1337", 1],
          ["1338", 1],
        ]),
      );
      await updateDailyRouterTvl();

      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "daily_router_tvl_timestamp_" + mockContext.domains[0],
      );
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).to.be.calledWithExactly(
        "daily_router_tvl_timestamp_" + mockContext.domains[1],
      );

      expect(mockContext.adapters.database.saveRouterDailyTVL as SinonStub).callCount(1);
      expect(mockContext.adapters.database.saveRouterDailyTVL as SinonStub).to.be.calledWithExactly(
        mockRouterDailyTVLResponse,
      );

      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(1);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "daily_router_tvl_timestamp_" + mockContext.domains[0],
        mockRouterDailyTVLResponse[0].timestamp,
      );
    });
  });
});
