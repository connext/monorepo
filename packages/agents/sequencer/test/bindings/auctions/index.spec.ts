import { expect, delay } from "@connext/nxtp-utils";
import { stub, restore, reset, SinonStub } from "sinon";

import { ctxMock, getOperationsStub, getHelpersStub } from "../../globalTestHook";
import { bindAuctions } from "../../../src/bindings";
import * as BindAuctionsFns from "../../../src/bindings/auctions";

describe("bidSelection", () => {
  describe("#bidSelection", () => {
    let bidSelectionStub: SinonStub;
    beforeEach(() => {
      getOperationsStub = stub(operations, "getOperations");
      getOperationsStub.returns(mock);
      bidSelectionStub = stub(BidFns, "bidSelection").resolves(null);
    });

    after(() => {
      restore();
      reset();
    });

    it("happy: should start an interval loop that calls polling fn", async () => {
      // Override the poll interval to 10ms so we can test the interval loop
      await bindBidSelection(10);
      // TODO: slight race here?
      await delay(20);
      ctxMock.config.mode.cleanup = true;
      expect(bidSelectionStub.callCount).to.be.gte(1);
    });

    it("happy: default polling interval", async () => {
      BindBidSelectionFns.BID_SELECTION_POLL_INTERVAL = 10;
      await bindBidSelection();
      await delay(20);
      ctxMock.config.mode.cleanup = true;
      expect(bidSelectionStub.callCount).to.be.gte(1);
    });
  });
});
