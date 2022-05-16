import { Bid, ExecuteArgs, expect, mkAddress, OriginTransfer, XTransfer } from "@connext/nxtp-utils";
import { stub, restore, reset, SinonStub } from "sinon";

import { encodeExecuteFromBids, getDestinationLocalAsset } from "../../../src/lib/helpers/auctions";
import { ctxMock } from "../../globalTestHook";
import { mock } from "../../mock";

describe("Helpers:Auctions", () => {
  describe("#encodeExecuteFromBids", () => {
    const mockEncoded = "123456789qwertyuiopasdfghjklzxcvbnm";
    const mockLocalAsset = mkAddress("0xdedddddddddddddd");

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
      const transfer: OriginTransfer = mock.entity.xtransfer();
      const bids: Bid[] = [mock.entity.bid()];
      const expectedArgs: ExecuteArgs = {
        params: {
          originDomain: transfer.originDomain,
          destinationDomain: transfer.destinationDomain,
          to: transfer.xparams.to,
          callData: transfer.xparams.callData,
          forceSlow: transfer.xparams.forceSlow,
          receiveLocal: transfer.xparams.receiveLocal,
        },
        local: mockLocalAsset,
        routers: bids.map((b) => b.router),
        routerSignatures: bids.map((b) => b.signatures[bids.length.toString()]),
        amount: transfer.origin.assets.bridged.amount,
        nonce: transfer.nonce,
        originSender: transfer.origin.xcall.caller,
      };

      const encoded = encodeExecuteFromBids(bids, transfer, mockLocalAsset);
      expect(encoded).to.be.eq(mockEncoded);
      expect(encodeFunctionDataStub.calledWith("execute", [expectedArgs])).to.be.true;
    });

    it("should throw if no xcall", () => {
      const transfer: OriginTransfer = mock.entity.xtransfer();
      transfer.origin.xcall = undefined;
      const bids: Bid[] = [mock.entity.bid()];

      expect(() => encodeExecuteFromBids(bids, transfer, mockLocalAsset)).to.throw();
    });
  });

  describe("#getDestinationLocalAsset", () => {
    it("should return the local asset for the destination chain", async () => {
      const canonicalId = "0x123";
      const mockLocalAsset = "0x456";
      (ctxMock.adapters.subgraph as any).getAssetByLocal.resolves({ canonicalId });
      (ctxMock.adapters.subgraph as any).getAssetByCanonicalId.resolves({ local: mockLocalAsset });
      const origin = mock.domain.A;
      const originLocal = mock.asset.A.address;
      const destination = mock.domain.B;

      const localAsset = await getDestinationLocalAsset(origin, originLocal, destination);
      expect(localAsset).to.be.eq(mockLocalAsset);
      expect((ctxMock.adapters.subgraph as any).getAssetByLocal).calledOnceWithExactly(origin, originLocal);
      expect((ctxMock.adapters.subgraph as any).getAssetByCanonicalId).calledOnceWithExactly(destination, canonicalId);
    });
  });
});
