import { SinonStub } from "sinon";
import { expect } from "@connext/nxtp-utils";
import {
  mockStableSwapExchangeResponse,
  mockStableSwapPoolResponse,
  mockStableSwapAddLiquidityResponse,
} from "@connext/nxtp-adapters-subgraph/test/mock";

import { mockContext } from "../../globalTestHook";
import { updateStableSwap, updatePoolEvents } from "../../../src/lib/operations";

describe("StableSwap operations", () => {
  describe("#updateStableSwap", () => {
    it("should work", async () => {
      await updateStableSwap();
      expect(mockContext.adapters.database.saveStableSwapPool as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveStableSwapPool as SinonStub).to.be.calledWithExactly(
        mockStableSwapPoolResponse,
      );

      expect(mockContext.adapters.database.saveStableSwapExchange as SinonStub).callCount(1);
      expect(mockContext.adapters.database.saveStableSwapExchange as SinonStub).to.be.calledWithExactly(
        mockStableSwapExchangeResponse,
      );

      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(1);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "stableswap_exchange_timestamp_" + mockStableSwapExchangeResponse[0].domain,
        mockStableSwapExchangeResponse[0].timestamp,
      );
    });
  });

  describe("#updatePoolEvents", () => {
    it("should work", async () => {
      (mockContext.adapters.subgraph.getStableSwapPoolEventsByDomainAndTimestamp as SinonStub).resolves(
        mockStableSwapAddLiquidityResponse,
      );
      await updatePoolEvents();
      expect(mockContext.adapters.database.saveStableSwapPoolEvent as SinonStub).callCount(mockContext.domains.length);
      expect(mockContext.adapters.database.saveStableSwapPoolEvent as SinonStub).to.be.calledWithExactly(
        mockStableSwapAddLiquidityResponse,
      );
      expect(mockContext.adapters.database.getCheckPoint as SinonStub).callCount(mockContext.domains.length * 2);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).callCount(2);
      expect(mockContext.adapters.database.saveCheckPoint as SinonStub).to.be.calledWithExactly(
        "stableswap_add_liquidity_timestamp_" + mockStableSwapAddLiquidityResponse[0].domain,
        mockStableSwapAddLiquidityResponse[0].timestamp,
      );
    });
  });
});
