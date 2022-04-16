import { expect, delay } from "@connext/nxtp-utils";
import { stub, SinonStub } from "sinon";

import { ctxMock, getOperationsStub, getHelpersStub } from "../../globalTestHook";
import { bindAuctions } from "../../../src/bindings";

describe("Bindings:Auctions", () => {
  describe("#bidSelection", () => {
    let executeAuctionsStub: SinonStub;
    beforeEach(() => {
      executeAuctionsStub = stub().resolves();
      getOperationsStub.returns({
        auctions: {
          executeAuctions: executeAuctionsStub,
        },
      });
    });

    it("happy: should start an interval loop that calls polling fn", async () => {
      // Override the poll interval to 10ms so we can test the interval loop
      await bindAuctions(10);
      // TODO: slight race here?
      await delay(20);
      ctxMock.config.mode.cleanup = true;
      expect(executeAuctionsStub.callCount).to.be.gte(1);
    });
  });
});
