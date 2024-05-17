import {
  expect,
  mkAddress,
  mkBytes32,
  OriginMessage,
  RootMessage,
  ReceivedAggregateRoot,
  mkHash,
} from "@connext/nxtp-utils";
import {
  destinationTransfer,
  originMessage,
  rootMessage,
  originTransfer,
  receivedAggregateRoot,
  xquery,
  stableSwapPool,
  stableSwapExchange,
  stableSwapPoolEvent,
  routerDailyTvl,
  routerLiquidityEvent,
} from "../../../src/lib/helpers/parse";
import { stubContext, mockOriginTransferEntity, mockDestinationTransferEntity } from "../../mock";
import { mock } from "@connext/nxtp-utils";
import { restore, reset } from "sinon";
import { constants, utils } from "ethers";

describe("Helpers:parse", () => {
  describe("#originTransfer", () => {
    const relayerFees = {
      [mkAddress("0x123")]: "1",
      [constants.AddressZero]: "2",
    };
    const relayerFeesForEntity = [
      {
        asset: mkAddress("0x123"),
        fee: "1",
      },
      {
        asset: constants.AddressZero,
        fee: "2",
      },
    ];
    it("should throw if the entity is undefined", () => {
      const entity = undefined;
      expect(() => {
        originTransfer(entity, { [constants.AddressZero]: { symbol: "ETH", decimals: 18 } });
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
        originTransfer(entity1, { [constants.AddressZero]: { symbol: "ETH", decimals: 18 } });
      }).to.throw("Subgraph `OriginTransfer` entity parser: Transfer entity is a destination transfer entity.");
      expect(() => {
        originTransfer(entity2, { [constants.AddressZero]: { symbol: "ETH", decimals: 18 } });
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
        originTransfer(entity, { [constants.AddressZero]: { symbol: "ETH", decimals: 18 } });
      }).to.throw("Subgraph `OriginTransfer` entity parser: Transfer entity missing required field");
    });

    it("happy-1: should parse the originTransfer entity", () => {
      expect(
        originTransfer(
          { ...mockOriginTransferEntity, relayerFees: relayerFeesForEntity },
          { [mockOriginTransferEntity.asset]: { symbol: "ETH", decimals: 18 } },
        ),
      ).to.be.deep.eq({
        transferId: "0xaaa0000000000000000000000000000000000000000000000000000000000000",
        xparams: {
          originDomain: "1111",
          destinationDomain: "3331",
          canonicalDomain: undefined,
          to: "0x1000000000000000000000000000000000000000",
          delegate: undefined,
          receiveLocal: false,
          callData: "0x",
          slippage: undefined,
          originSender: undefined,
          bridgedAmt: undefined,
          normalizedIn: "100",
          nonce: 0,
          canonicalId: undefined,
        },
        origin: {
          chain: 4,
          messageHash: undefined,
          assets: {
            transacting: {
              asset: constants.AddressZero,
              amount: mockOriginTransferEntity.normalizedIn,
            },
            bridged: { asset: constants.AddressZero, amount: undefined },
          },
          xcall: {
            caller: "0x2000000000000000000000000000000000000000",
            txOrigin: "0x2000000000000000000000000000000000000000",
            transactionHash: "0xbbb0000000000000000000000000000000000000000000000000000000000000",
            timestamp: 11111111,
            gasPrice: "10000000000",
            gasLimit: "1000000",
            blockNumber: 5000,
          },
          relayerFees,
        },
        destination: undefined,
      });
    });

    it("happy-2: should parse the originTransfer entity", () => {
      expect(
        originTransfer(
          {
            ...mockOriginTransferEntity,
            timestamp: undefined,
            blockNumber: undefined,
            relayerFees: relayerFeesForEntity,
          },
          { [constants.AddressZero]: { symbol: "ETH", decimals: 18 } },
        ),
      ).to.be.deep.eq({
        transferId: "0xaaa0000000000000000000000000000000000000000000000000000000000000",
        xparams: {
          originDomain: "1111",
          destinationDomain: "3331",
          canonicalDomain: undefined,
          to: "0x1000000000000000000000000000000000000000",
          delegate: undefined,
          receiveLocal: false,
          callData: "0x",
          slippage: undefined,
          originSender: undefined,
          bridgedAmt: undefined,
          normalizedIn: "100",
          nonce: 0,
          canonicalId: undefined,
        },
        origin: {
          chain: 4,
          messageHash: undefined,
          assets: {
            transacting: {
              asset: constants.AddressZero,
              amount: mockOriginTransferEntity.normalizedIn,
            },
            bridged: { asset: constants.AddressZero, amount: undefined },
          },
          xcall: {
            caller: "0x2000000000000000000000000000000000000000",
            txOrigin: "0x2000000000000000000000000000000000000000",
            transactionHash: "0xbbb0000000000000000000000000000000000000000000000000000000000000",
            timestamp: 0,
            gasPrice: "10000000000",
            gasLimit: "1000000",
            blockNumber: 0,
          },
          relayerFees,
        },
        destination: undefined,
      });
    });

    it("happy-3: should parse the originTransfer entity with non-standard decimals", () => {
      expect(
        originTransfer(
          {
            ...mockOriginTransferEntity,
            timestamp: undefined,
            blockNumber: undefined,
            normalizedIn: "72850291000000000000",
            asset: {
              adoptedAsset: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            },
            transactingAsset: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            relayerFees: relayerFeesForEntity,
          },
          { ["0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"]: { symbol: "USDC", decimals: 6 } },
        ),
      ).to.be.deep.eq({
        transferId: "0xaaa0000000000000000000000000000000000000000000000000000000000000",
        xparams: {
          originDomain: "1111",
          destinationDomain: "3331",
          canonicalDomain: undefined,
          to: "0x1000000000000000000000000000000000000000",
          delegate: undefined,
          receiveLocal: false,
          callData: "0x",
          slippage: undefined,
          originSender: undefined,
          bridgedAmt: undefined,
          normalizedIn: "72850291000000000000",
          nonce: 0,
          canonicalId: undefined,
        },
        origin: {
          chain: 4,
          messageHash: undefined,
          assets: {
            transacting: {
              asset: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
              amount: "72850291",
            },
            bridged: { asset: constants.AddressZero, amount: undefined },
          },
          xcall: {
            caller: "0x2000000000000000000000000000000000000000",
            txOrigin: "0x2000000000000000000000000000000000000000",
            transactionHash: "0xbbb0000000000000000000000000000000000000000000000000000000000000",
            timestamp: 0,
            gasPrice: "10000000000",
            gasLimit: "1000000",
            blockNumber: 0,
          },
          relayerFees,
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
        transferId: "0xaaa0000000000000000000000000000000000000000000000000000000000000",
        xparams: {
          originDomain: "1111",
          destinationDomain: "3331",
          canonicalDomain: undefined,
          to: "0x1000000000000000000000000000000000000000",
          delegate: undefined,
          receiveLocal: false,
          callData: "0x",
          slippage: undefined,
          originSender: "0x1300000000000000000000000000000000000000",
          bridgedAmt: undefined,
          amount: "100",
          normalizedIn: undefined,
          nonce: 0,
          canonicalId: undefined,
        },
        origin: undefined,
        destination: {
          chain: 42,
          status: "Executed",
          routers: ["0x1110000000000000000000000000000000000000", "0x1120000000000000000000000000000000000000"],
          assets: {
            transacting: {
              amount: "100",
              asset: "0x0000000000000000000000000000000000000000",
            },
            local: { asset: constants.AddressZero, amount: undefined },
          },
          execute: {
            originSender: "0x1300000000000000000000000000000000000000",
            caller: "0x1400000000000000000000000000000000000000",
            txOrigin: "0x1400000000000000000000000000000000000000",
            transactionHash: "0xaaa0000000000000000000000000000000000000000000000000000000000000",
            timestamp: 1000000,
            gasPrice: "10000000000",
            gasLimit: "1000000",
            blockNumber: 5000,
            txNonce: 10000000001,
          },
          reconcile: {
            caller: "0x1500000000000000000000000000000000000000",
            txOrigin: "0x1500000000000000000000000000000000000000",
            transactionHash: "0xbbb0000000000000000000000000000000000000000000000000000000000000",
            timestamp: 1000000,
            gasPrice: "10000000000",
            gasLimit: "1000000",
            blockNumber: 5000,
            txNonce: 10000000002,
          },
        },
      });
    });
    it("happy-2: should parse the destination transfer entity", () => {
      expect(
        destinationTransfer({
          ...mockDestinationTransferEntity,

          to: undefined,
          amount: undefined,
          executedTimestamp: undefined,
          executedBlockNumber: undefined,
          reconciledTimestamp: undefined,
          reconciledBlockNumber: undefined,
        }),
      ).to.be.deep.eq({
        transferId: "0xaaa0000000000000000000000000000000000000000000000000000000000000",
        xparams: {
          originDomain: "1111",
          destinationDomain: "3331",
          canonicalDomain: undefined,
          to: undefined,
          delegate: undefined,
          receiveLocal: false,
          callData: "0x",
          slippage: undefined,
          originSender: "0x1300000000000000000000000000000000000000",
          bridgedAmt: undefined,
          normalizedIn: undefined,
          amount: undefined,
          nonce: 0,
          canonicalId: undefined,
        },
        origin: undefined,
        destination: {
          chain: 42,
          status: "Executed",
          routers: ["0x1110000000000000000000000000000000000000", "0x1120000000000000000000000000000000000000"],
          assets: {
            transacting: undefined,
            local: { asset: constants.AddressZero, amount: undefined },
          },
          execute: {
            originSender: "0x1300000000000000000000000000000000000000",
            caller: "0x1400000000000000000000000000000000000000",
            txOrigin: "0x1400000000000000000000000000000000000000",
            transactionHash: "0xaaa0000000000000000000000000000000000000000000000000000000000000",
            timestamp: 0,
            gasPrice: "10000000000",
            gasLimit: "1000000",
            blockNumber: 0,
            txNonce: 10000000001,
          },
          reconcile: {
            caller: "0x1500000000000000000000000000000000000000",
            txOrigin: "0x1500000000000000000000000000000000000000",
            transactionHash: "0xbbb0000000000000000000000000000000000000000000000000000000000000",
            timestamp: 0,
            gasPrice: "10000000000",
            gasLimit: "1000000",
            blockNumber: 0,
            txNonce: 10000000002,
          },
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

    it("should throw if a required field is missing", () => {
      const entity: OriginMessage = {} as any;

      expect(() => {
        originMessage(entity);
      }).to.throw("Subgraph `OriginMessage` entity parser: Message entity missing required field");
    });

    it("should parse valid origin message", () => {
      const entity: OriginMessage = mock.entity.originMessage();
      expect(originMessage(entity)).to.be.deep.eq(entity);
    });
  });

  describe("#rootMessage", () => {
    it("should throw if the entity is undefined", () => {
      const entity = undefined;
      expect(() => {
        rootMessage(entity);
      }).to.throw("Subgraph `RootMessage` entity parser: RootMessage, entity is `undefined`.");
    });

    it("should throw if a required field is missing", () => {
      const entity: RootMessage = {} as any;

      expect(() => {
        rootMessage(entity);
      }).to.throw("Subgraph `RootMessage` entity parser: Message entity missing required field");
    });

    it("should parse valid root message", () => {
      const entity: RootMessage = mock.entity.rootMessage();
      expect(rootMessage(entity)).to.be.deep.eq(entity);
    });
  });
  describe("#receivedAggregateRoot", () => {
    it("should throw if the entity is undefined", () => {
      const entity = undefined;
      expect(() => {
        receivedAggregateRoot(entity);
      }).to.throw("Subgraph `ReceivedAggregateRoot` entity parser: ReceivedAggregateRoot, entity is `undefined`.");
    });

    it("should throw if wrong message type", () => {
      const entity: RootMessage = mock.entity.rootMessage();
      expect(() => {
        receivedAggregateRoot(entity);
      }).to.throw("Subgraph `ReceivedAggregateRoot` entity parser: Message entity missing required field");
    });

    it("should throw if a required field is missing", () => {
      const entity: ReceivedAggregateRoot = {} as any;

      expect(() => {
        receivedAggregateRoot(entity);
      }).to.throw("Subgraph `ReceivedAggregateRoot` entity parser: Message entity missing required field");
    });

    it("should parse valid received aggregate root", () => {
      const entity: ReceivedAggregateRoot = mock.entity.receivedAggregateRoot();
      expect(receivedAggregateRoot(entity)).to.be.deep.eq(entity);
    });
  });

  describe("#stableSwapPool", () => {
    it("should throw if the entity is undefined", () => {
      const entity = undefined;
      expect(() => {
        stableSwapPool(entity);
      }).to.throw("Subgraph `StableSwapPool` entity parser: StableSwapPool, entity is `undefined`.");
    });

    it("should throw if a required field is missing", () => {
      const entity = {} as any;

      expect(() => {
        stableSwapPool(entity);
      }).to.throw("Subgraph `StableSwapPool` entity parser: Message entity missing required field");
    });

    it("should not throw if a required boolean field is false", () => {
      const entity = {
        key: mkBytes32("0xa"),
        domain: "1111",
        isActive: false,
        lpToken: mkAddress("0xa"),
        initialA: 200,
        futureA: 200,
        initialATime: 0,
        futureATime: 0,
        swapFee: "400000",
        adminFee: "0",
        pooledTokens: [mkAddress("0xa"), mkAddress("0xb")],
        tokenPrecisionMultipliers: ["1", "1"],
        poolTokenDecimals: [18, 18],
        balances: ["200000", "200000"],
        virtualPrice: "400000",
        invariant: "0",
        lpTokenSupply: "0",
      };

      expect(() => {
        stableSwapPool(entity);
      }).not.to.throw("Subgraph `StableSwapPool` entity parser: Message entity missing required field");
    });

    it("should parse valid swap pool", () => {
      const entity = {
        key: mkBytes32("0xa"),
        domain: "1111",
        isActive: true,
        lpToken: mkAddress("0xa"),
        initialA: 200,
        futureA: 200,
        initialATime: 0,
        futureATime: 0,
        swapFee: "400000",
        adminFee: "0",
        pooledTokens: [mkAddress("0xa"), mkAddress("0xb")],
        tokenPrecisionMultipliers: ["1", "1"],
        poolTokenDecimals: [18, 18],
        balances: ["200000", "200000"],
        virtualPrice: "400000",
        invariant: "0",
        lpTokenSupply: "0",
      };
      expect(stableSwapPool(entity)).to.be.deep.eq(
        mock.entity.stableSwapPool({
          key: mkBytes32("0xa"),
          domain: "1111",
          lpToken: mkAddress("0xa"),
          pooledTokens: [mkAddress("0xa"), mkAddress("0xb")],
        }),
      );
    });
  });

  describe("#stableSwapExchange", () => {
    it("should throw if the entity is undefined", () => {
      const entity = undefined;
      expect(() => {
        stableSwapExchange(entity);
      }).to.throw("Subgraph `stableSwapExchange` entity parser: stableSwapExchange, entity is `undefined`.");
    });

    it("should throw if a required field is missing", () => {
      const entity = {} as any;

      expect(() => {
        stableSwapExchange(entity);
      }).to.throw("Subgraph `stableSwapExchange` entity parser: Message entity missing required field");
    });

    it("should parse valid swap exchange", () => {
      const entity = {
        id: mkBytes32("0xa"),
        domain: "1111",
        stableSwap: {
          key: mkBytes32("0xa"),
          domain: "1111",
          tokenPrecisionMultipliers: ["1", "1"],
        },
        buyer: mkAddress("0xb"),
        boughtId: "1",
        soldId: "0",
        tokensSold: "1000000000000000000",
        tokensBought: "1000000000000000000",
        balances: ["1000000000000000000", "1000000000000000000"],
        fee: "0",
        block: "25792350",
        timestamp: "1672823480",
        transaction: mkBytes32("0xa"),
        nonce: "16728234800000",
      };
      expect(stableSwapExchange(entity)).to.be.deep.eq(
        mock.entity.stableSwapExchange({
          id: mkBytes32("0xa"),
          poolId: mkBytes32("0xa"),
          domain: "1111",
          buyer: mkAddress("0xb"),
          boughtId: 1,
          soldId: 0,
          tokensSold: 1,
          tokensBought: 1,
          balances: [1, 1],
          fee: 0,
          blockNumber: 25792350,
          timestamp: 1672823480,
          transactionHash: mkBytes32("0xa"),
          nonce: 16728234800000,
        }),
      );
    });
  });

  describe("#stableSwapPoolEvent", () => {
    it("should throw if the entity is undefined", () => {
      const entity = undefined;
      expect(() => {
        stableSwapPoolEvent(entity);
      }).to.throw("Subgraph `stableSwapPoolEvent` entity parser: stableSwapPoolEvent, entity is `undefined`.");
    });

    it("should throw if a required field is missing", () => {
      const entity = {} as any;

      expect(() => {
        stableSwapPoolEvent(entity);
      }).to.throw("Subgraph `stableSwapPoolEvent` entity parser: Message entity missing required field");
    });

    it("should parse valid pool event", () => {
      const entity = {
        id: `add_liquidity-${mkBytes32("0xa")}`,
        domain: "1337",
        stableSwap: {
          key: mkBytes32("0xa"),
          domain: "1337",
          tokenPrecisionMultipliers: ["1", "1"],
          pooledTokens: [mkAddress("0xa"), mkAddress("0xb")],
        },
        provider: mkAddress("0xa"),
        balances: ["200000000000000000000", "200000000000000000000"],
        tokenAmounts: ["200000000000000000000", "200000000000000000000"],
        fees: ["2000000000000000000", "2000000000000000000"],
        lpTokenAmount: "100000000000000000",
        lpTokenSupply: "400000000000000000",
        block: 37933815,
        timestamp: 1673421076,
        transaction: mkBytes32("0xb"),
        nonce: 16734210760001,
      };
      expect(stableSwapPoolEvent(entity)).to.be.deep.eq(
        mock.entity.stableswapPoolEvent({
          id: `add_liquidity-${mkBytes32("0xa")}`,
          domain: "1337",
          poolId: mkBytes32("0xa"),
          provider: mkAddress("0xa"),
          action: "Add",
          pooledTokens: [mkAddress("0xa"), mkAddress("0xb")],
          poolTokenDecimals: [18, 18],
          balances: [200, 200],
          tokenAmounts: [200, 200],
          fees: [2, 2],
          lpTokenAmount: 0.1,
          lpTokenSupply: 0.4,
          blockNumber: 37933815,
          timestamp: 1673421076,
          transactionHash: mkBytes32("0xb"),
          nonce: 16734210760001,
        }),
      );
    });
  });

  describe("#routerDailyTvl", () => {
    it("should throw if the entity is undefined", () => {
      const entity = undefined;
      expect(() => {
        routerDailyTvl(entity);
      }).to.throw("Subgraph `RouterDailyTVL` entity parser: RouterDailyTVL, entity is `undefined`.");
    });

    it("should throw if a required field is missing", () => {
      const entity = {} as any;

      expect(() => {
        routerDailyTvl(entity);
      }).to.throw("Subgraph `RouterDailyTVL` entity parser: Message entity missing required field");
    });

    it("should parse valid router daily tvl", () => {
      const entity = {
        id: mkBytes32("0xa"),
        domain: "1111",
        asset: { id: mkAddress("0xa"), decimal: 18 },
        router: { id: mkAddress("0xb") },
        timestamp: 1673421076,
        balance: "123122343",
        blockNumber: 1234,
        transactionHash: mkHash("0xa"),
      };

      expect(routerDailyTvl(entity)).to.be.deep.eq({
        id: `1111-${mkBytes32("0xa")}`,
        asset: mkAddress("0xa"),
        router: mkAddress("0xb"),
        domain: "1111",
        timestamp: 1673421076,

        balance: "123122343",
      });
    });
  });

  describe("#routerLiquidityEvent", () => {
    it("should throw if the entity is undefined", () => {
      const entity = undefined;
      expect(() => {
        routerLiquidityEvent(entity);
      }).to.throw("Subgraph `routerLiquidityEvent` entity parser: routerLiquidityEvent, entity is `undefined`.");
    });

    it("should throw if a required field is missing", () => {
      const entity = {} as any;

      expect(() => {
        routerLiquidityEvent(entity);
      }).to.throw("Subgraph `routerLiquidityEvent` entity parser: Message entity missing required field");
    });

    it("should parse valid router liquidity event", () => {
      const entity = {
        id: mkBytes32("0xa"),
        domain: "1111",
        type: "Add",
        asset: { id: mkAddress("0xa"), decimal: 18 },
        router: { id: mkAddress("0xb") },
        timestamp: 1673421076,
        balance: "123122343",
        amount: "100298394",
        blockNumber: 1234,
        transactionHash: mkHash("0xa"),
        nonce: 1123,
      };

      expect(routerLiquidityEvent(entity)).to.be.deep.eq({
        id: `${mkBytes32("0xa")}`,
        domain: "1111",
        event: "Add",
        asset: mkAddress("0xa"),
        router: mkAddress("0xb"),
        amount: +utils.formatUnits("100298394", 18),
        balance: +utils.formatUnits("123122343", 18),
        blockNumber: 1234,
        timestamp: 1673421076,
        nonce: 1123,
        transactionHash: mkHash("0xa"),
      });
    });
  });
});
