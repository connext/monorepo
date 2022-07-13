import { expect, mkBytes32 } from "@connext/nxtp-utils";

import { mock } from "../../mock";
import { mockPubContext } from "../../globalTestHook";
import { getXCalls } from "../../../src/publisher/operations/getXCalls";
import { SinonStub } from "sinon";

describe("Operations:GetXCalls", () => {
  describe("#pollSubgraph", () => {
    it("happy: should retrieve xcalls from the subgraph and publish them", async () => {
      const mockInfo = {
        [mock.chain.A]: {
          latestBlockNumber: 1234567,
          latestNonce: 232323,
          safeConfirmations: 19,
        },
        [mock.chain.B]: {
          latestBlockNumber: 1234567,
          latestNonce: 454545,
          safeConfirmations: 28,
        },
      };

      const mockBlockNumber: Map<string, number> = new Map();
      mockBlockNumber.set(mock.chain.A, 1234567);
      mockBlockNumber.set(mock.chain.B, 1234567);

      (mockPubContext.adapters.cache.transfers.getLatestNonce as SinonStub).callsFake(
        (domain: string) => mockInfo[domain].latestNonce,
      );
      mockPubContext.config.chains[mock.domain.A].confirmations = mockInfo[mock.domain.A].safeConfirmations;
      mockPubContext.config.chains[mock.domain.B].confirmations = mockInfo[mock.domain.B].safeConfirmations;
      const mockSubgraphResponse = [
        mock.entity.xtransfer({ transferId: mkBytes32("0x1"), nonce: 9 }),
        mock.entity.xtransfer({ transferId: mkBytes32("0x2"), nonce: 10 }),
      ];
      (mockPubContext.adapters.subgraph.getLatestBlockNumber as SinonStub).resolves(mockBlockNumber);
      (mockPubContext.adapters.subgraph.getXCalls as SinonStub).resolves(mockSubgraphResponse);

      await getXCalls();

      // Should have been called once per available/configured chain.
      expect((mockPubContext.adapters.cache.transfers.getLatestNonce as SinonStub).callCount).to.be.eq(
        Object.keys(mockInfo).length,
      );
      expect((mockPubContext.adapters.mqClient.publish as SinonStub).calledWithExactly(mockSubgraphResponse[0]));
      expect((mockPubContext.adapters.mqClient.publish as SinonStub).calledWithExactly(mockSubgraphResponse[1]));
      expect((mockPubContext.adapters.cache.transfers.setLatestNonce as SinonStub).calledWithExactly(mock.domain.A, 9));
      expect(
        (mockPubContext.adapters.cache.transfers.setLatestNonce as SinonStub).calledWithExactly(mock.domain.A, 10),
      );
    });
  });
});
