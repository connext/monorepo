import { delay } from "@connext/nxtp-utils";
import { expect } from "chai";
import { stub, restore, reset, SinonStub } from "sinon";

import { stubContext } from "../../mock";
import { bindBidSelection } from "../../../src/bindings";
import * as BidFns from "../../../src/lib/operations/bid";

describe("bidSelection", () => {
  let mockContext: any;

  before(() => {
    mockContext = stubContext();
  });

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
      mockContext.config.mode.cleanup = true;
      await delay(10);
      expect(bidSelectionStub.callCount).to.be.gte(1);
    });
  });
});
