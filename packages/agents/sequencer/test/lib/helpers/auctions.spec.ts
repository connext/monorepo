import {
  Bid,
  ExecuteArgs,
  expect,
  mkAddress,
  mkBytes32,
  mkSig,
  OriginTransfer,
  mockSequencer,
} from "@connext/nxtp-utils";
import { constants } from "ethers";
import { stub, restore, reset, SinonStub } from "sinon";

import {
  encodeExecuteFromBids,
  getAllSubsets,
  getBidsRoundMap,
  getDestinationLocalAsset,
  getMinimumBidsCountForRound,
} from "../../../src/lib/helpers/auctions";
import * as AuctionHelpers from "../../../src/lib/helpers/auctions";
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
      stub(AuctionHelpers, "signSequencerPermitPayload").resolves(mock.signature);
    });

    afterEach(() => {
      restore();
      reset();
    });

    it("happy", async () => {
      const transfer = mock.entity.xtransfer() as OriginTransfer;
      const round = 1;
      const signatures: Record<string, string> = {};
      signatures["1"] = mkSig();
      const bids: Bid[] = [{ ...mock.entity.bid(), signatures }];
      const expectedArgs: ExecuteArgs = {
        params: {
          originDomain: transfer.xparams.originDomain,
          destinationDomain: transfer.xparams.destinationDomain,
          to: transfer.xparams.to,
          callData: transfer.xparams.callData,
          callback: constants.AddressZero,
          callbackFee: "0",
          recovery: transfer.xparams.recovery,
          forceSlow: transfer.xparams.forceSlow,
          receiveLocal: transfer.xparams.receiveLocal,
          agent: transfer.xparams.agent,
          relayerFee: transfer.xparams.relayerFee,
          destinationMinOut: transfer.xparams.destinationMinOut,
        },
        local: mockLocalAsset,
        routers: bids.map((b) => b.router),
        routerSignatures: bids.map((b) => b.signatures[round.toString()]),
        amount: transfer.origin.assets.bridged.amount,
        nonce: transfer.nonce,
        originSender: transfer.origin.xcall.caller,
        sequencer: mockSequencer,
        sequencerSignature: mock.signature,
      };

      const encoded = await encodeExecuteFromBids(1, bids, transfer, mockLocalAsset);
      expect(encoded).to.be.eq(mockEncoded);

      expect(encodeFunctionDataStub.calledWith("execute", [expectedArgs])).to.be.true;
    });

    it("should throw if no xcall", async () => {
      const transfer = mock.entity.xtransfer() as OriginTransfer;
      transfer.origin = undefined as any;
      const bids: Bid[] = [mock.entity.bid()];

      await expect(encodeExecuteFromBids(1, bids, transfer, mockLocalAsset)).to.be.rejected;
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
    it("should return native asset if origin transacting asset is native asset", async () => {
      const canonicalId = "0x123";
      const mockLocalAsset = constants.AddressZero;
      (ctxMock.adapters.subgraph as any).getAssetByLocal.resolves({ canonicalId });
      (ctxMock.adapters.subgraph as any).getAssetByCanonicalId.resolves({ local: mockLocalAsset });
      const origin = mock.domain.A;
      const originLocal = mock.asset.A.address;
      const destination = mock.domain.B;

      const localAsset = await getDestinationLocalAsset(origin, originLocal, destination);
      expect(localAsset).to.be.eq(constants.AddressZero);
      expect((ctxMock.adapters.subgraph as any).getAssetByLocal).calledOnceWithExactly(origin, originLocal);
      expect((ctxMock.adapters.subgraph as any).getAssetByCanonicalId).calledOnceWithExactly(destination, canonicalId);
    });
  });

  describe("#getBidsRoundMap", () => {
    it("should return an array of bids which can be fulfilled", () => {
      const transferId = mkBytes32();
      const router1 = mkAddress("0x111");
      const router2 = mkAddress("0x112");
      const router3 = mkAddress("0x113");
      const router4 = mkAddress("0x114");
      const bids: Record<string, Bid> = {};
      bids[router1] = {
        routerVersion: "0.0.0",
        transferId: transferId,
        origin: "1111",
        router: router1,
        signatures: {
          "1": mkSig("0xrouter1_1"),
        },
      };
      bids[router2] = {
        routerVersion: "0.0.0",
        transferId: transferId,
        origin: "1111",
        router: router2,
        signatures: {
          "1": mkSig("0xrouter2_1"),
          "2": mkSig("0xrouter2_2"),
          "4": mkSig("0xrouter2_4"),
        },
      };
      bids[router3] = {
        routerVersion: "0.0.0",
        transferId: transferId,
        origin: "1111",
        router: router3,
        signatures: {
          "1": mkSig("0xrouter3_1"),
          "2": mkSig("0xrouter3_2"),
          "3": mkSig("0xrouter3_3"),
        },
      };
      bids[router4] = {
        routerVersion: "0.0.0",
        transferId: transferId,
        origin: "1111",
        router: router4,
        signatures: {
          "2": mkSig("0xrouter4_2"),
          "3": mkSig("0xrouter4_3"),
          "4": mkSig("0xrouter3_4"),
        },
      };

      const bidsByRound = getBidsRoundMap(bids, 4);
      expect(Object.keys(bidsByRound).length).to.be.eq(2);
      expect(Object.keys(bidsByRound)).to.be.deep.eq(["1", "2"]);
      expect(bidsByRound["1"]).to.be.deep.eq([
        {
          routerVersion: "0.0.0",
          transferId: transferId,
          origin: "1111",
          router: router1,
          signatures: {
            "1": mkSig("0xrouter1_1"),
          },
        },
        {
          routerVersion: "0.0.0",
          transferId: transferId,
          origin: "1111",
          router: router2,
          signatures: {
            "1": mkSig("0xrouter2_1"),
          },
        },
        {
          routerVersion: "0.0.0",
          transferId: transferId,
          origin: "1111",
          router: router3,
          signatures: {
            "1": mkSig("0xrouter3_1"),
          },
        },
      ]);
      expect(bidsByRound["2"]).to.be.deep.eq([
        {
          routerVersion: "0.0.0",
          transferId: transferId,
          origin: "1111",
          router: router2,
          signatures: {
            "2": mkSig("0xrouter2_2"),
          },
        },
        {
          routerVersion: "0.0.0",
          transferId: transferId,
          origin: "1111",
          router: router3,
          signatures: {
            "2": mkSig("0xrouter3_2"),
          },
        },
        {
          routerVersion: "0.0.0",
          transferId: transferId,
          origin: "1111",
          router: router4,
          signatures: {
            "2": mkSig("0xrouter4_2"),
          },
        },
      ]);
    });
  });

  describe("#getAllSubsets", () => {
    it("happy", () => {
      const sources = ["A", "B", "C", "D"];
      const combination1 = [["A"], ["B"], ["C"], ["D"]];
      const combination2 = [
        ["A", "B"],
        ["A", "C"],
        ["A", "D"],
        ["B", "C"],
        ["B", "D"],
        ["C", "D"],
      ];
      const combination3 = [
        ["A", "B", "C"],
        ["A", "B", "D"],
        ["A", "C", "D"],
        ["B", "C", "D"],
      ];
      expect(getAllSubsets(sources, 1)).to.be.deep.eq(combination1);
      expect(getAllSubsets(sources, 2)).to.be.deep.eq(combination2);
      expect(getAllSubsets(sources, 3)).to.be.deep.eq(combination3);
    });
  });

  describe("#getMinimumBidsCountForRound", () => {
    afterEach(() => {
      restore();
      reset();
    });
    it("throw an error if a round isn't within the specified boundary", () => {
      expect(() => getMinimumBidsCountForRound(0)).to.throw(`Rounds invalid`);
      expect(() => getMinimumBidsCountForRound(5)).to.throw(`Rounds invalid`);
    });
    it("throw an error if a round number isn't an integer", () => {
      expect(() => getMinimumBidsCountForRound(1.1)).to.throw(`Rounds invalid`);
    });
    it("happy: should return the number of bids to complete the round", () => {
      expect(getMinimumBidsCountForRound(1)).to.be.eq(1);
      expect(getMinimumBidsCountForRound(2)).to.be.eq(2);
      expect(getMinimumBidsCountForRound(3)).to.be.eq(4);
      expect(getMinimumBidsCountForRound(4)).to.be.eq(8);
    });
  });
});
