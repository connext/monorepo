import { delay } from "@connext/nxtp-utils";
import { expect } from "chai";
import { stub, restore, reset, SinonStub } from "sinon";

import { ctxMock } from "../../globalTestHook";
import { bindBidSelection } from "../../../src/bindings";
import * as BindBidSelectionFns from "../../../src/bindings/bidSelection";
import * as BidFns from "../../../src/lib/operations/bid";

describe("bidSelection", () => {
  describe("#bidSelection", () => {
    let bidSelectionStub: SinonStub;
    beforeEach(() => {
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
