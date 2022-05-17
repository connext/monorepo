import { expect, mkAddress, mkBytes32 } from "@connext/nxtp-utils";
import { destinationTransfer, originTransfer, xquery } from "../../../src/lib/helpers/parse";
import { stubContext } from "../../mock";
import { restore, reset } from "sinon";

const mockMetaData = {
  idx: "1",
  transferId: mkBytes32("0xaaa"),
  nonce: "0",
  originDomain: "1111",
  destinationDomain: "2221",
};

const mockCallData = {
  to: mkAddress("0x1"),
  callData: "0x",
  forceSlow: false,
  receiveLocal: false,
};

const mockOriginTransferEntity = {
  ...mockMetaData,
  ...mockCallData,
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

const mockDestinationTransferEntity = {
  ...mockMetaData,
  ...mockCallData,
  chainId: 42,
  status: "Executed",
  routers: [{ id: mkAddress("0x111") }, { id: mkAddress("0x112") }],
  transactingAsset: mkAddress("0x11"),
  transactingAmount: "100",
  localAsset: mkAddress("0x12"),
  localAmount: "100",
  executedTransactionHash: mkBytes32("0xaaa"),
  originSender: mkAddress("0x13"),
  executedCaller: mkAddress("0x14"),
  executedTimestamp: "1000000",
  executedGasPrice: "10000000000",
  executedGasLimit: "1000000",
  executedBlockNumber: 5000,
  reconciledCaller: mkAddress("0x15"),
  reconciledTransactionHash: mkBytes32("0xbbb"),
  reconciledTimestamp: "1000000",
  reconciledGasPrice: "10000000000",
  reconciledGasLimit: "1000000",
  reconciledBlockNumber: 5000,
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

    it("happy-1: should parse the destination transfer entity", () => {
      expect(destinationTransfer(mockDestinationTransferEntity)).to.be.deep.eq({
        destination: {
          assets: {
            local: {
              amount: "100",
              asset: "0x1200000000000000000000000000000000000000",
            },
            transacting: {
              amount: "100",
              asset: "0x1100000000000000000000000000000000000000",
            },
          },
          chain: 42,
          execute: {
            blockNumber: 5000,
            caller: "0x1400000000000000000000000000000000000000",
            gasLimit: "1000000",
            gasPrice: "10000000000",
            originSender: "0x1300000000000000000000000000000000000000",
            timestamp: 1000000,
            transactionHash: "0xaaa0000000000000000000000000000000000000000000000000000000000000",
          },
          reconcile: {
            blockNumber: 5000,
            caller: "0x1500000000000000000000000000000000000000",
            gasLimit: "1000000",
            gasPrice: "10000000000",
            timestamp: 1000000,
            transactionHash: "0xbbb0000000000000000000000000000000000000000000000000000000000000",
          },
          routers: [mkAddress("0x111"), mkAddress("0x112")],
          status: "Executed",
        },
        destinationDomain: "2221",
        idx: "1",
        nonce: 0,
        origin: undefined,
        originDomain: "1111",
        transferId: "0xaaa0000000000000000000000000000000000000000000000000000000000000",
        xparams: {
          callData: "0x",
          forceSlow: false,
          receiveLocal: false,
          to: "0x1000000000000000000000000000000000000000",
        },
      });
    });
    it("happy-2: should parse the destination transfer entity", () => {
      expect(
        destinationTransfer({
          ...mockDestinationTransferEntity,
          idx: undefined,
          to: undefined,
          transactingAmount: undefined,
          executedTimestamp: undefined,
          executedBlockNumber: undefined,
          reconciledTimestamp: undefined,
          reconciledBlockNumber: undefined,
        }),
      ).to.be.deep.eq({
        destination: {
          assets: {
            local: {
              amount: "100",
              asset: "0x1200000000000000000000000000000000000000",
            },
            transacting: undefined,
          },
          chain: 42,
          execute: {
            blockNumber: 0,
            caller: "0x1400000000000000000000000000000000000000",
            gasLimit: "1000000",
            gasPrice: "10000000000",
            originSender: "0x1300000000000000000000000000000000000000",
            timestamp: 0,
            transactionHash: "0xaaa0000000000000000000000000000000000000000000000000000000000000",
          },
          reconcile: {
            blockNumber: 0,
            caller: "0x1500000000000000000000000000000000000000",
            gasLimit: "1000000",
            gasPrice: "10000000000",
            timestamp: 0,
            transactionHash: "0xbbb0000000000000000000000000000000000000000000000000000000000000",
          },
          routers: ["0x1110000000000000000000000000000000000000", "0x1120000000000000000000000000000000000000"],
          status: "Executed",
        },
        destinationDomain: "2221",
        idx: undefined,
        nonce: 0,
        origin: undefined,
        originDomain: "1111",
        transferId: "0xaaa0000000000000000000000000000000000000000000000000000000000000",
        xparams: undefined,
      });
    });
  });
  describe("#xquery", () => {
    before(() => {
      stubContext();
    });
    after(() => {
      restore();
      reset();
    });
    it("throw the error if response data doesn't exist", () => {
      const response = { msg: "success" };
      expect(() => {
        xquery(response);
      }).to.throw("Parsing xquery result failed!");
    });
    it("happy: should parse the crosschain query result", () => {
      const response = {
        data: {
          rinkeby_assets: [
            {
              id: mkBytes32("0x111"),
              local: mkAddress("0x11"),
              adoptedAsset: mkAddress("0x12"),
            },
          ],
          rinkeby_assetBalances: [
            {
              id: `${mkAddress("0x12")}-${mkAddress("0x13")}`,
              amount: "1000000000000000",
            },
          ],
          kovan_assets: [
            {
              id: mkBytes32("0x112"),
              local: mkAddress("0x21"),
              adoptedAsset: mkAddress("0x22"),
            },
          ],
          kovan_assetBalances: [
            {
              id: `${mkAddress("0x22")}-${mkAddress("0x23")}`,
              amount: "1000000000000000",
            },
          ],
        },
      };

      const xqeuryRes = xquery(response);
      expect(xqeuryRes.get("1111")).to.be.deep.eq([
        [
          {
            id: "0x1110000000000000000000000000000000000000000000000000000000000000",
            local: "0x1100000000000000000000000000000000000000",
            adoptedAsset: "0x1200000000000000000000000000000000000000",
          },
        ],
        [
          {
            id: "0x1200000000000000000000000000000000000000-0x1300000000000000000000000000000000000000",
            amount: "1000000000000000",
          },
        ],
      ]);

      expect(xqeuryRes.get("2221")).to.be.deep.eq([
        [
          {
            id: "0x1120000000000000000000000000000000000000000000000000000000000000",
            local: "0x2100000000000000000000000000000000000000",
            adoptedAsset: "0x2200000000000000000000000000000000000000",
          },
        ],
        [
          {
            id: "0x2200000000000000000000000000000000000000-0x2300000000000000000000000000000000000000",
            amount: "1000000000000000",
          },
        ],
      ]);
    });
  });
});
