import { expect, delay } from "@connext/nxtp-utils";
import { stub, SinonStub } from "sinon";

import { ctxMock, getOperationsStub } from "../../globalTestHook";
import { bindSubscriber } from "../../../src/bindings";

describe("Bindings:Auctions", () => {
  describe("#bidSelection", () => {
    let executeAuctionStub: SinonStub;
    beforeEach(() => {
      executeAuctionStub = stub().resolves();
      getOperationsStub.returns({
        auctions: {
          executeAuction: executeAuctionStub,
        },
      });
    });

    it("happy: should start an interval loop that calls polling fn", async () => {
      // Override the poll interval to 10ms so we can test the interval loop
      await bindSubscriber(10);
      // TODO: slight race here?
      await delay(20);
      ctxMock.config.mode.cleanup = true;
      expect(executeAuctionStub.callCount).to.be.gte(1);
    });
  });
});
