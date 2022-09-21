import { expect, mkAddress, mkBytes32, OriginMessage, DestinationMessage, RootMessage } from "@connext/nxtp-utils";
import {
  destinationTransfer,
  originMessage,
  destinationMessage,
  rootMessage,
  originTransfer,
  xquery,
} from "../../../src/lib/helpers/parse";
import { stubContext, mockOriginTransferEntity, mockDestinationTransferEntity } from "../../mock";
import { mock } from "@connext/nxtp-utils";
import { restore, reset } from "sinon";

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
        destinationDomain: "3331",
        nonce: 0,
        to: mkAddress(),
      };

      expect(() => {
        originTransfer(entity);
      }).to.throw("Subgraph `OriginTransfer` entity parser: Transfer entity missing required field");
    });

    it("happy-1: should parse the originTransfer entity", () => {
      expect(originTransfer(mockOriginTransferEntity)).to.be.deep.eq({
        transferId: "0xaaa0000000000000000000000000000000000000000000000000000000000000",
        nonce: 0,
        xparams: {
          destinationMinOut: "456",
          destinationDomain: "3331",
          originDomain: "1111",
          to: "0x1000000000000000000000000000000000000000",
          callData: "0x",
          callback: "0xaaa0000000000000000000000000000000000000",
          callbackFee: "0",
          recovery: "0x1000000000000000000000000000000000000000",
          forceSlow: false,
          receiveLocal: false,
          agent: "foo",
          relayerFee: "1",
        },
        origin: {
          chain: 4,
          originMinOut: "123",
          assets: {
            transacting: { asset: mkAddress("0x11"), amount: "100" },
            bridged: { asset: mkAddress("0x12"), amount: "100" },
          },
          xcall: {
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
        originTransfer({ ...mockOriginTransferEntity, timestamp: undefined, blockNumber: undefined }),
      ).to.be.deep.eq({
        transferId: "0xaaa0000000000000000000000000000000000000000000000000000000000000",
        nonce: 0,
        xparams: {
          destinationDomain: "3331",
          originDomain: "1111",
          to: "0x1000000000000000000000000000000000000000",
          callData: "0x",
          callback: "0xaaa0000000000000000000000000000000000000",
          callbackFee: "0",
          recovery: "0x1000000000000000000000000000000000000000",
          forceSlow: false,
          receiveLocal: false,
          agent: "foo",
          relayerFee: "1",
          destinationMinOut: "456",
        },
        origin: {
          chain: 4,
          originMinOut: "123",
          assets: {
            transacting: { asset: mkAddress("0x11"), amount: "100" },
            bridged: { asset: mkAddress("0x12"), amount: "100" },
          },
          xcall: {
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
      expect(() => {
        destinationTransfer(entity1);
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
        nonce: 0,
        origin: undefined,
        transferId: "0xaaa0000000000000000000000000000000000000000000000000000000000000",
        xparams: {
          destinationDomain: "3331",
          originDomain: "1111",
          callData: "0x",
          callback: "0xaaa0000000000000000000000000000000000000",
          callbackFee: "0",
          forceSlow: false,
          receiveLocal: false,
          recovery: "0x1000000000000000000000000000000000000000",
          to: "0x1000000000000000000000000000000000000000",
          agent: "foo",
          relayerFee: "1",
          destinationMinOut: "456",
        },
      });
    });
    it("happy-2: should parse the destination transfer entity", () => {
      expect(
        destinationTransfer({
          ...mockDestinationTransferEntity,

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

        nonce: 0,
        origin: undefined,
        transferId: "0xaaa0000000000000000000000000000000000000000000000000000000000000",
        xparams: {
          agent: "foo",
          callData: "0x",
          callback: "0xaaa0000000000000000000000000000000000000",
          callbackFee: "0",
          destinationDomain: "3331",
          forceSlow: false,
          originDomain: "1111",
          receiveLocal: false,
          recovery: "0x1000000000000000000000000000000000000000",
          relayerFee: "1",
          to: undefined,
          destinationMinOut: "456",
        },
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
          goerli_assets: [
            {
              id: mkBytes32("0x112"),
              local: mkAddress("0x21"),
              adoptedAsset: mkAddress("0x22"),
            },
          ],
          goerli_assetBalances: [
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

      expect(xqeuryRes.get("3331")).to.be.deep.eq([
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
  describe("#originMessage", () => {
    it("should throw if the entity is undefined", () => {
      const entity = undefined;
      expect(() => {
        originMessage(entity);
      }).to.throw("Subgraph `OriginMessage` entity parser: OriginMessage entity is `undefined`.");
    });

    it("should throw if wrong message type", () => {
      const entity: OriginMessage = mock.entity.destinationMessage();
      expect(() => {
        originMessage(entity);
      }).to.throw("Subgraph `OriginMessage` entity parser: Message entity missing required field");
    });

    it("should throw if a required field is missing", () => {
      const entity: OriginMessage = {};

      expect(() => {
        originMessage(entity);
      }).to.throw("Subgraph `OriginMessage` entity parser: Message entity missing required field");
    });

    it("should parse valid origin message", () => {
      const entity: OriginMessage = mock.entity.originMessage();
      expect(originMessage(entity)).to.be.deep.eq(entity);
    });
  });
  describe("#destinationMessage", () => {
    it("should throw if the entity is undefined", () => {
      const entity = undefined;
      expect(() => {
        destinationMessage(entity);
      }).to.throw("Subgraph `DestinationMessage` entity parser: DestinationMessage entity is `undefined`.");
    });

    it("should throw if wrong message type", () => {
      const entity: DestinationMessage = mock.entity.originMessage();
      expect(() => {
        destinationMessage(entity);
      }).to.throw("Subgraph `DestinationMessage` entity parser: Message entity missing required field");
    });

    it("should throw if a required field is missing", () => {
      const entity: DestinationMessage = {};

      expect(() => {
        destinationMessage(entity);
      }).to.throw("Subgraph `DestinationMessage` entity parser: Message entity missing required field");
    });

    it("should parse valid destination message", () => {
      const entity: DestinationMessage = mock.entity.destinationMessage();
      expect(destinationMessage(entity)).to.be.deep.eq(entity);
    });
  });
  describe("#rootMessage", () => {
    it("should throw if the entity is undefined", () => {
      const entity = undefined;
      expect(() => {
        rootMessage(entity);
      }).to.throw("Subgraph `RootMessage` entity parser: RootMessage, entity is `undefined`.");
    });

    it("should throw if wrong message type", () => {
      const entity: RootMessage = mock.entity.destinationMessage();
      expect(() => {
        rootMessage(entity);
      }).to.throw("Subgraph `RootMessage` entity parser: Message entity missing required field");
    });

    it("should throw if a required field is missing", () => {
      const entity: RootMessage = {};

      expect(() => {
        rootMessage(entity);
      }).to.throw("Subgraph `RootMessage` entity parser: Message entity missing required field");
    });

    it("should parse valid root message", () => {
      const entity: RootMessage = mock.entity.rootMessage();
      expect(rootMessage(entity)).to.be.deep.eq(entity);
    });
  });
});
