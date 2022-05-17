import { expect, mkAddress, mkBytes32 } from "@connext/nxtp-utils";
import { restore, reset } from "sinon";
import { destinationTransfer, originTransfer } from "../../../src/lib/helpers/parse";

const mockOriginTransferEntity = {
  idx: "1",
  transferId: mkBytes32("0xaaa"),
  nonce: "0",
  originDomain: "1111",
  destinationDomain: "2221",
  to: mkAddress("0x1"),
  callData: "0x",
  forceSlow: false,
  receiveLocal: false,
  chainId: 4,
  transactingAsset: mkAddress("0x11"),
  transactingAmount: "100",
  bridgedAsset: mkAddress("0x12"),
  bridgedAmount: "100",
  relayerFee: "1",
  caller: mkAddress("0x2"),
  transactionHash: mkBytes32("0xbbb"),
  timestamp: "11111111",
  gasPrice: "10000000000",
  gasLimit: "1000000",
  blockNumber: 5000,
};
describe("Helpers:parse", () => {
  describe("#originTransfer", () => {
    it("should throw if the entity is undefined", () => {
      const entity = undefined;
      expect(() => {
        originTransfer(entity);
      }).to.throw("Subgraph `OriginTransfer` entity parser: Transfer entity is `undefined`.");
    });

    it("should throw if wrong transfer type", () => {
      const entity1 = {
        executedTransactionHash: mkBytes32(),
      };
      const entity2 = {
        reconciledTransactionHash: mkBytes32(),
      };
      expect(() => {
        originTransfer(entity1);
      }).to.throw("Subgraph `OriginTransfer` entity parser: Transfer entity is a destination transfer entity.");
      expect(() => {
        originTransfer(entity2);
      }).to.throw("Subgraph `OriginTransfer` entity parser: Transfer entity is a destination transfer entity.");
    });

    it("should throw if a required field is missing", () => {
      const entity = {
        transferId: mkBytes32(),
        originDomain: "1111",
        destinationDomain: "2221",
        nonce: 0,
        to: mkAddress(),
      };

      expect(() => {
        originTransfer(entity);
      }).to.throw("Subgraph `OriginTransfer` entity parser: Transfer entity missing required field");
    });

    it("happy-1: should parse the originTransfer entity", () => {
      expect(originTransfer(mockOriginTransferEntity)).to.be.deep.eq({
        idx: "1",
        transferId: "0xaaa0000000000000000000000000000000000000000000000000000000000000",
        nonce: 0,
        originDomain: "1111",
        destinationDomain: "2221",
        xparams: {
          to: "0x1000000000000000000000000000000000000000",
          callData: "0x",
          forceSlow: false,
          receiveLocal: false,
        },
        origin: {
          chain: 4,
          assets: {
            transacting: { asset: mkAddress("0x11"), amount: "100" },
            bridged: { asset: mkAddress("0x12"), amount: "100" },
          },
          xcall: {
            relayerFee: "1",
            caller: "0x2000000000000000000000000000000000000000",
            transactionHash: "0xbbb0000000000000000000000000000000000000000000000000000000000000",
            timestamp: 11111111,
            gasPrice: "10000000000",
            gasLimit: "1000000",
            blockNumber: 5000,
          },
        },
        destination: undefined,
      });
    });
    it("happy-2: should parse the originTransfer entity", () => {
      expect(
        originTransfer({ ...mockOriginTransferEntity, idx: undefined, timestamp: undefined, blockNumber: undefined }),
      ).to.be.deep.eq({
        idx: undefined,
        transferId: "0xaaa0000000000000000000000000000000000000000000000000000000000000",
        nonce: 0,
        originDomain: "1111",
        destinationDomain: "2221",
        xparams: {
          to: "0x1000000000000000000000000000000000000000",
          callData: "0x",
          forceSlow: false,
          receiveLocal: false,
        },
        origin: {
          chain: 4,
          assets: {
            transacting: { asset: mkAddress("0x11"), amount: "100" },
            bridged: { asset: mkAddress("0x12"), amount: "100" },
          },
          xcall: {
            relayerFee: "1",
            caller: "0x2000000000000000000000000000000000000000",
            transactionHash: "0xbbb0000000000000000000000000000000000000000000000000000000000000",
            timestamp: 0,
            gasPrice: "10000000000",
            gasLimit: "1000000",
            blockNumber: 0,
          },
        },
        destination: undefined,
      });
    });
  });
  describe("#destinationTransfer", () => {
    it("should throw if the entity is undefined", () => {
      const entity = undefined;
      expect(() => {
        destinationTransfer(entity);
      }).to.throw("Subgraph `DestinationTransfer` entity parser: Transfer entity is `undefined`.");
    });

    it("should throw if wrong transfer type", () => {
      const entity1 = {
        transactionHash: mkBytes32(),
      };
      const entity2 = {
        relayerFee: "1",
      };
      expect(() => {
        destinationTransfer(entity1);
      }).to.throw("Subgraph `DestinationTransfer` entity parser: Transfer entity is an origin transfer entity.");
      expect(() => {
        destinationTransfer(entity2);
      }).to.throw("Subgraph `DestinationTransfer` entity parser: Transfer entity is an origin transfer entity.");
    });

    it("should throw if a required field is missing", () => {
      const entity = {
        transferId: mkBytes32(),
        originDomain: "1111",
        localAmount: "100",
        localAsset: mkAddress(),
        router: [mkAddress("0x111"), mkAddress("0x112")],
      };

      expect(() => {
        destinationTransfer(entity);
      }).to.throw("Subgraph `DestinationTransfer` entity parser: Transfer entity missing required field");
    });
  });
  describe("#xquery", () => {});
});
