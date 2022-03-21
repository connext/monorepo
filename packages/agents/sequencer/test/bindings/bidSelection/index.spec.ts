import { delay, mock } from "@connext/nxtp-utils";
import { expect } from "chai";
import { stub, restore, reset, SinonStub } from "sinon";
import { bindBidSelection } from "../../../src/bindings";
import { BID_SELECTION_POLL_INTERVAL } from "../../../src/bindings/bidSelection";
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
    it("should be called 1 time within polling interval", async () => {
      await bindBidSelection();
      console.log(`Waiting for ${BID_SELECTION_POLL_INTERVAL}...`);
      await delay(BID_SELECTION_POLL_INTERVAL + 1_000);
      expect(bidSelectionStub.callCount).to.be.eq(1);
    });
  });
});
