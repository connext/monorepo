import { Bid, ExecuteArgs, expect, XTransfer } from "@connext/nxtp-utils";
import { stub, restore, reset, SinonStub } from "sinon";

import { encodeExecuteFromBids } from "../../../src/lib/helpers/auctions";
import { ctxMock } from "../../globalTestHook";
import { mock } from "../../mock";

describe("Helpers:Auctions", () => {
  describe("#encodeExecuteFromBids", () => {
    const mockEncoded = "123456789qwertyuiopasdfghjklzxcvbnm";
    let encodeFunctionDataStub: SinonStub;

    beforeEach(() => {
      encodeFunctionDataStub = stub();
      (ctxMock.adapters.contracts.connext as any).encodeFunctionData = encodeFunctionDataStub;
      encodeFunctionDataStub.returns(mockEncoded);
    });

    afterEach(() => {
      restore();
      reset();
    });

    it("happy", () => {
      const transfer: XTransfer = mock.entity.xtransfer();
      const bids: Bid[] = [mock.entity.bid()];
      const expectedArgs: ExecuteArgs = {
        params: {
          originDomain: transfer.originDomain,
          destinationDomain: transfer.destinationDomain,
          to: transfer.callTo,
          callData: transfer.callData,
        },
        local: transfer.xcall.localAsset,
        routers: bids.map((b) => b.router),
        routerSignatures: bids.map((b) => b.signatures[bids.length.toString()]),
        amount: transfer.xcall.localAmount,
        nonce: transfer.nonce,
        originSender: transfer.xcall.caller,
      };

      const encoded = encodeExecuteFromBids(bids, transfer);
      expect(encoded).to.be.eq(mockEncoded);
      expect(encodeFunctionDataStub.calledWith("execute", [expectedArgs])).to.be.true;
    });

    it("should throw if no xcall", () => {
      const transfer: XTransfer = mock.entity.xtransfer();
      transfer.xcall = undefined;
      const bids: Bid[] = [mock.entity.bid()];

      expect(() => encodeExecuteFromBids(bids, transfer)).to.throw();
    });
  });
});
