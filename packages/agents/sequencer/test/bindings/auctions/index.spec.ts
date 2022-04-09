import { expect, delay } from "@connext/nxtp-utils";
import { stub, SinonStub } from "sinon";

import { ctxMock, getOperationsStub, getHelpersStub } from "../../globalTestHook";
import { bindAuctions } from "../../../src/bindings";

describe("Bindings:Auctions", () => {
  describe("#bidSelection", () => {
    let selectBidsStub: SinonStub;
    beforeEach(() => {
      selectBidsStub = stub().resolves();
      getOperationsStub.returns({
        auctions: {
          selectBids: selectBidsStub,
        },
      });
    });

    it("happy: should start an interval loop that calls polling fn", async () => {
      // Override the poll interval to 10ms so we can test the interval loop
      await bindAuctions(10);
      // TODO: slight race here?
      await delay(20);
      ctxMock.config.mode.cleanup = true;
      expect(selectBidsStub.callCount).to.be.gte(1);
    });
  });
});
