import { stub, SinonStub, restore, reset } from "sinon";
import {
  expect,
  mkAddress,
  mkBytes32,
  OriginTransfer,
  SubgraphQueryMetaParams,
  SubgraphQueryByTimestampMetaParams,
  SubgraphQueryByNoncesMetaParams,
  SubgraphQueryByTransferIDsMetaParams,
  XTransfer,
  mock,
  mkHash,
} from "@connext/nxtp-utils";
import {
  mockChainData,
  mockDestinationTransferEntity,
  mockOriginTransferEntity,
  mockResponse,
  mockRouterDailyTVLResponse,
  mockRouterLiquidityEventsResponse,
  stubContext,
} from "./mock";
import { SubgraphReader } from "../src/reader";
import * as ParserFns from "../src/lib/helpers/parse";

import * as ExecuteFns from "../src/lib/helpers/execute";
import { BigNumber } from "ethers";
import { CONNECTOR_META_ID } from "../src/lib/operations";

describe("SubgraphReader", () => {
  let subgraphReader: SubgraphReader;
  let executeStub: SinonStub;
  const response: Map<string, any[]> = new Map();
  beforeEach(async () => {
    subgraphReader = await SubgraphReader.create(mockChainData);
    executeStub = stub(ExecuteFns, "execute");
    stubContext();
  });
  afterEach(() => {
    response.clear();
    restore();
    reset();
  });
  describe("#create", () => {
    it("create a staging subgraph adapter", async () => {
      await expect(SubgraphReader.create(mockChainData, "staging")).to.eventually.not.be.rejected;
    });
    it("create a production subgraph adapter", async () => {
      await expect(SubgraphReader.create(mockChainData, "production")).to.eventually.not.be.rejected;
    });
  });

  describe("#supported", () => {
    it("get supported domains", () => {
      console.log("subgraphReader.supported: ", subgraphReader.supported);
      expect(subgraphReader.supported).to.be.deep.eq({ "1111": false, "3331": false, "5555555555555": false });
    });
  });
  describe("#query", () => {
    it("should execute the query", async () => {
      executeStub.resolves(mockResponse);
      expect(await subgraphReader.query("hello")).to.be.deep.eq(mockResponse);
    });
  });

  describe("#getAssetBalance", () => {
    it("should return 0 if the asset is not added", async () => {
      response.set("1111", []);
      executeStub.resolves(response);
      expect((await subgraphReader.getAssetBalance("1111", mkAddress("0x11"), mkAddress("0x111"))).toString()).to.be.eq(
        "0",
      );
    });
    it("happy: should return the asset balance", async () => {
      response.set("1111", [{ amount: "100" }]);
      executeStub.resolves(response);
      expect((await subgraphReader.getAssetBalance("1111", mkAddress("0x11"), mkAddress("0x111"))).toString()).to.be.eq(
        "100",
      );
    });
  });

  describe("#getAssetBalances", () => {
    it("should return {} if the router didn't add the liquidity", async () => {
      response.set("1111", [[]]);
      executeStub.resolves(response);
      expect(await subgraphReader.getAssetBalances("1111", mkAddress("0x111"))).to.be.deep.eq({});
    });
    it("happy: should return the asset balance", async () => {
      response.set("1111", [[{ asset: { id: mkAddress("0x111") }, amount: "100" }]]);
      executeStub.resolves(response);
      expect(await subgraphReader.getAssetBalances("1111", mkAddress("0x11"))).to.be.deep.eq({
        "0x1110000000000000000000000000000000000000": BigNumber.from("100"),
      });
    });
  });

  describe("#getAssetBalancesRouters", () => {
    it("should return the router balances", async () => {
      response.set("1111", [
        [
          {
            id: mkAddress("aaa"),
            assetBalances: [
              {
                asset: {
                  adoptedAsset: mkAddress("0x111"),
                  id: mkAddress("0x222"),
                  blockNumber: 50000,
                  canonicalDomain: "1111",
                  canonicalId: mkAddress("0x11111"),
                  key: mkBytes32(),
                  localAsset: mkAddress("0x222"),
                  decimal: "18",
                  adoptedDecimal: "18",
                },
                domain: "1111",
                amount: "100",
                locked: "100",
                supplied: "100",
                removed: "100",
              },
            ],
          },
        ],
      ]);
      executeStub.resolves(response);
      expect(await subgraphReader.getAssetBalancesRouters("1111", 0, 100)).to.be.deep.eq([
        {
          router: mkAddress("aaa"),
          assets: [
            {
              adoptedAsset: mkAddress("0x111"),
              id: mkAddress("0x222"),
              blockNumber: 50000,
              canonicalDomain: "1111",
              canonicalId: mkAddress("0x11111"),
              key: mkBytes32(),
              decimal: "18",
              adoptedDecimal: "18",
              localAsset: mkAddress("0x222"),
              domain: "1111",
              balance: "100",
              feesEarned: 0,
              locked: "100",
              supplied: "100",
              removed: "100",
            },
          ],
        },
      ]);
    });
  });

  describe("#isRouterApproved", () => {
    it("should be approved", async () => {
      response.set("1111", [{ id: mkAddress() }]);
      executeStub.resolves(response);
      expect(await subgraphReader.isRouterApproved("1111", mkAddress())).to.be.eq(true);
    });
  });

  describe("#getAssetByLocal", () => {
    it("should return undefined", async () => {
      response.set("1111", [[]]);
      executeStub.resolves(response);
      expect(await subgraphReader.getAssetByLocal("1111", mkAddress())).to.be.undefined;
    });
    it("should return the asset", async () => {
      response.set("1111", [
        [
          {
            id: mkAddress("0x111"),
            adoptedAsset: mkAddress("0x112"),
            canonicalId: mkBytes32(),
            canonicalDomain: "1111",
            blockNumber: "5000",
          },
        ],
      ]);
      executeStub.resolves(response);
      expect(await subgraphReader.getAssetByLocal("1111", mkAddress())).to.be.deep.eq({
        id: mkAddress("0x111"),
        adoptedAsset: mkAddress("0x112"),
        canonicalId: mkBytes32(),
        canonicalDomain: "1111",
        blockNumber: "5000",
      });
    });
  });

  describe("#getAssetByCanonicalId", () => {
    it("should return undefined", async () => {
      response.set("1111", [[]]);
      executeStub.resolves(response);
      expect(await subgraphReader.getAssetByCanonicalId("1111", mkAddress())).to.be.undefined;
    });
    it("should return the asset", async () => {
      response.set("1111", [
        [
          {
            id: mkAddress("0x111"),
            adoptedAsset: mkAddress("0x112"),
            canonicalId: mkBytes32(),
            canonicalDomain: "1111",
            blockNumber: "5000",
          },
        ],
      ]);
      executeStub.resolves(response);
      expect(await subgraphReader.getAssetByCanonicalId("1111", mkAddress())).to.be.deep.eq({
        id: mkAddress("0x111"),
        adoptedAsset: mkAddress("0x112"),
        canonicalId: mkBytes32(),
        canonicalDomain: "1111",
        blockNumber: "5000",
      });
    });
  });

  describe("#getOriginTransferById", () => {
    it("should be undefined", async () => {
      response.set("1111", [[]]);
      executeStub.resolves(response);
      expect(await subgraphReader.getOriginTransferById("1111", mkBytes32())).to.be.undefined;
    });

    it("should return originTransfer", async () => {
      response.set("1111", [[mockOriginTransferEntity]]);
      executeStub.resolves(response);
      expect(await subgraphReader.getOriginTransferById("1111", mkBytes32())).to.be.deep.eq(
        ParserFns.originTransfer(mockOriginTransferEntity, {
          [mockOriginTransferEntity.asset]: { symbol: "DAI", decimals: 18 },
        }),
      );
    });
  });

  describe("#getOriginTransferByHash", () => {
    it("should be undefined", async () => {
      response.set("1111", [[]]);
      executeStub.resolves(response);
      expect(await subgraphReader.getOriginTransferByHash("1111", mkBytes32())).to.be.undefined;
    });
    it("should return originTransfer", async () => {
      response.set("1111", [[mockOriginTransferEntity]]);
      executeStub.resolves(response);
      expect(await subgraphReader.getOriginTransferByHash("1111", mkBytes32())).to.be.deep.eq(
        ParserFns.originTransfer(mockOriginTransferEntity, {
          [mockOriginTransferEntity.asset]: { symbol: "DAI", decimals: 18 },
        }),
      );
    });
  });

  describe("#getDestinationTransferById", () => {
    it("should be undefined", async () => {
      response.set("1111", [[]]);
      executeStub.resolves(response);
      expect(await subgraphReader.getDestinationTransferById("1111", mkBytes32())).to.be.undefined;
    });
    it("should return the destination transfer entity", async () => {
      response.set("3331", [[mockDestinationTransferEntity]]);
      executeStub.resolves(response);
      expect(await subgraphReader.getDestinationTransferById("3331", mkBytes32())).to.be.deep.eq(
        ParserFns.destinationTransfer(mockDestinationTransferEntity),
      );
    });
  });

  describe("#getOriginTransfersById", () => {
    it("should return the origin transfers", async () => {
      response.set("1111", [[mockOriginTransferEntity]]);
      response.set("3331", [[mockOriginTransferEntity]]);
      executeStub.resolves(response);

      const agents: Map<string, SubgraphQueryByTransferIDsMetaParams> = new Map();
      agents.set("1111", { maxBlockNumber: 99999999, transferIDs: [] });
      agents.set("3331", { maxBlockNumber: 99999999, transferIDs: [] });

      expect(await subgraphReader.getOriginTransfersById(agents)).to.be.deep.eq([
        ParserFns.originTransfer(mockOriginTransferEntity, {
          [mockOriginTransferEntity.asset]: { symbol: "DAI", decimals: 18 },
        }),
        ParserFns.originTransfer(mockOriginTransferEntity, {
          [mockOriginTransferEntity.asset]: { symbol: "DAI", decimals: 18 },
        }),
      ]);
    });
  });

  describe("#getOriginTransfersByNonces", () => {
    it("should return the origin transfers", async () => {
      response.set("1111", [[mockOriginTransferEntity]]);
      response.set("3331", [[mockOriginTransferEntity]]);
      executeStub.resolves(response);

      const agents: Map<string, SubgraphQueryByNoncesMetaParams> = new Map();
      agents.set("1111", { maxBlockNumber: 99999999, nonces: ["1"] });
      agents.set("3331", { maxBlockNumber: 99999999, nonces: ["1"] });

      expect(await subgraphReader.getOriginTransfersByNonces(agents)).to.be.deep.eq([
        ParserFns.originTransfer(mockOriginTransferEntity, {
          [mockOriginTransferEntity.asset]: { symbol: "DAI", decimals: 18 },
        }),
        ParserFns.originTransfer(mockOriginTransferEntity, {
          [mockOriginTransferEntity.asset]: { symbol: "DAI", decimals: 18 },
        }),
      ]);
    });
  });

  describe("#getDestinationTransfersById", () => {
    it("should return the destination transfers", async () => {
      response.set("1111", [[mockDestinationTransferEntity]]);
      response.set("3331", [[mockDestinationTransferEntity]]);
      executeStub.resolves(response);

      const agents: Map<string, SubgraphQueryByTransferIDsMetaParams> = new Map();
      agents.set("1111", { maxBlockNumber: 99999999, transferIDs: [] });
      agents.set("3331", { maxBlockNumber: 99999999, transferIDs: [] });

      expect(await subgraphReader.getDestinationTransfersById(agents)).to.be.deep.eq([
        ParserFns.destinationTransfer({ ...mockDestinationTransferEntity, destinationDomain: "1111" }),
        ParserFns.destinationTransfer({ ...mockDestinationTransferEntity, destinationDomain: "3331" }),
      ]);
    });
  });

  describe("#getOriginTransfers", () => {
    it("should return the origin transfers across the multichains", async () => {
      response.set("1111", [[mockOriginTransferEntity]]);
      response.set("3331", [[mockOriginTransferEntity]]);
      executeStub.resolves(response);

      const agents: Map<string, SubgraphQueryMetaParams> = new Map();
      agents.set("1111", { maxBlockNumber: 99999999, latestNonce: 0 });
      agents.set("3331", { maxBlockNumber: 99999999, latestNonce: 0 });

      expect(await subgraphReader.getOriginTransfers(agents)).to.be.deep.eq([
        ParserFns.originTransfer(mockOriginTransferEntity, {
          [mockOriginTransferEntity.asset]: { symbol: "DAI", decimals: 18 },
        }),
        ParserFns.originTransfer(mockOriginTransferEntity, {
          [mockOriginTransferEntity.asset]: { symbol: "DAI", decimals: 18 },
        }),
      ]);
    });
  });

  describe("#getOriginTransfersByDomain", () => {
    it("should return the origin transfers for the domain", async () => {
      const domain = "1111";
      response.set(domain, [[mockOriginTransferEntity]]);
      executeStub.resolves(response);

      const agents: Map<string, SubgraphQueryMetaParams> = new Map();
      agents.set(domain, { maxBlockNumber: 99999999, latestNonce: 0 });

      const originTransfers = await subgraphReader.getOriginTransfers(agents);

      const transferIds = originTransfers.map((transfer) => transfer.transferId);

      expect(await subgraphReader.getOriginTransfersByDomain(domain, transferIds)).to.be.deep.eq(originTransfers);

      const { allTxById } = await subgraphReader.getOriginXCalls(agents);
      expect(allTxById.size).eq(transferIds.length);
    });
  });

  describe("#getOriginTransfersByNonce", () => {
    it("should return the origin transfers across the multichains", async () => {
      response.set("1111", [[mockOriginTransferEntity]]);
      response.set("3331", [[mockOriginTransferEntity]]);
      executeStub.resolves(response);

      const agents: Map<string, SubgraphQueryMetaParams> = new Map();
      agents.set("1111", { maxBlockNumber: 99999999, latestNonce: 0 });
      agents.set("3331", { maxBlockNumber: 99999999, latestNonce: 0 });

      expect(await subgraphReader.getOriginTransfersByNonce(agents)).to.be.deep.eq([
        ParserFns.originTransfer(mockOriginTransferEntity, {
          [mockOriginTransferEntity.asset]: { symbol: "DAI", decimals: 18 },
        }),
        ParserFns.originTransfer(mockOriginTransferEntity, {
          [mockOriginTransferEntity.asset]: { symbol: "DAI", decimals: 18 },
        }),
      ]);
    });
  });

  describe("#getDestinationTransfersByNonce", () => {
    it("should return the destination transfers", async () => {
      response.set("1111", [[mockDestinationTransferEntity]]);
      response.set("3331", [[mockDestinationTransferEntity]]);
      executeStub.resolves(response);

      const agents: Map<string, SubgraphQueryMetaParams> = new Map();
      agents.set("1111", { maxBlockNumber: 99999999, latestNonce: 0 });
      agents.set("3331", { maxBlockNumber: 99999999, latestNonce: 1 });

      expect(await subgraphReader.getDestinationTransfersByExecutedNonce(agents)).to.be.deep.eq([
        ParserFns.destinationTransfer({ ...mockDestinationTransferEntity, destinationDomain: "1111" }),
        ParserFns.destinationTransfer({ ...mockDestinationTransferEntity, destinationDomain: "3331" }),
      ]);
    });
  });

  describe("#getDestinationTransfersByDomainAndReconcileNonce", () => {
    it("should return the destination transfers across the multichains", async () => {
      response.set("1111", [[mockDestinationTransferEntity]]);
      response.set("3331", [[mockDestinationTransferEntity]]);
      executeStub.resolves(response);

      const agents: Map<string, SubgraphQueryMetaParams> = new Map();
      agents.set("1111", { maxBlockNumber: 99999999, latestNonce: 0 });

      expect(
        await subgraphReader.getDestinationTransfersByDomainAndReconcileNonce(agents.get("1111")!, "1111"),
      ).to.be.deep.eq([
        ParserFns.destinationTransfer({ ...mockDestinationTransferEntity, destinationDomain: "1111" }),
        ParserFns.destinationTransfer({ ...mockDestinationTransferEntity, destinationDomain: "3331" }),
      ]);
    });
  });

  describe("#getOriginXCalls", () => {
    it("should not throw if the response is empty", async () => {
      const agents: Map<string, SubgraphQueryMetaParams> = new Map();
      agents.set("1111", { maxBlockNumber: 99999999, latestNonce: 0 });
      agents.set("3331", { maxBlockNumber: 99999999, latestNonce: 0 });

      response.set("1111", [[]]);
      response.set("3331", [[]]);
      executeStub.resolves(response);
      expect(() => subgraphReader.getOriginXCalls(agents)).to.not.throw;
    });
  });

  describe("#getDestinationXCalls", () => {
    it("should return the calls which are xcalled on the originDomain and not executed/reconciled on the destinationDomain", async () => {
      const agents: Map<string, SubgraphQueryMetaParams> = new Map();
      agents.set("1111", { maxBlockNumber: 99999999, latestNonce: 0 });
      agents.set("3331", { maxBlockNumber: 99999999, latestNonce: 0 });
      const destinationCallsResponse: Map<string, any[]> = new Map();
      const originTransferEntity1 = {
        ...mockOriginTransferEntity,
        transferId: mkBytes32("0xaaa111"),
        originDomain: "1111",
        destinationDomain: "3331",
      };
      const originTransferEntity2 = {
        ...mockOriginTransferEntity,
        transferId: mkBytes32("0xaaa222"),
        originDomain: "1111",
        destinationDomain: "3331",
      };

      const originTransferEntity3 = {
        ...mockOriginTransferEntity,
        transferId: mkBytes32("0xbbb111"),
        originDomain: "3331",
        destinationDomain: "1111",
      };

      const originTransferEntity4 = {
        ...mockOriginTransferEntity,
        transferId: mkBytes32("0xbbb222"),
        originDomain: "3331",
        destinationDomain: "1111",
      };

      const destinationTransferEntity1 = {
        ...mockDestinationTransferEntity,
        transferId: mkBytes32("0xaaa111"),
      };
      const destinationTransferEntity2 = {
        ...mockDestinationTransferEntity,
        transferId: mkBytes32("0xbbb111"),
      };
      destinationCallsResponse.set("3331", [[destinationTransferEntity1]]);
      destinationCallsResponse.set("1111", [[destinationTransferEntity2]]);

      executeStub.resolves(destinationCallsResponse);
      const txIdsByDestinationDomain = new Map<string, string[]>();
      txIdsByDestinationDomain.set("3331", [mkBytes32("0xaaa111"), mkBytes32("0xaaa222")]);
      txIdsByDestinationDomain.set("1111", [mkBytes32("0xbbb111"), mkBytes32("0xbbb222")]);
      const allTxById = new Map<string, XTransfer>();
      allTxById.set(
        mkBytes32("0xaaa111"),
        ParserFns.originTransfer(originTransferEntity1, {
          [mockOriginTransferEntity.asset]: { symbol: "DAI", decimals: 18 },
        }),
      );
      allTxById.set(
        mkBytes32("0xaaa222"),
        ParserFns.originTransfer(originTransferEntity2, {
          [mockOriginTransferEntity.asset]: { symbol: "DAI", decimals: 18 },
        }),
      );
      allTxById.set(
        mkBytes32("0xbbb111"),
        ParserFns.originTransfer(originTransferEntity3, {
          [mockOriginTransferEntity.asset]: { symbol: "DAI", decimals: 18 },
        }),
      );
      allTxById.set(
        mkBytes32("0xbbb222"),
        ParserFns.originTransfer(originTransferEntity4, {
          [mockOriginTransferEntity.asset]: { symbol: "DAI", decimals: 18 },
        }),
      );
      const xcalledTransfers = await subgraphReader.getDestinationXCalls(txIdsByDestinationDomain, allTxById);
      expect(xcalledTransfers.length).to.be.eq(2);
      expect(xcalledTransfers).to.be.deep.eq([
        ParserFns.originTransfer(originTransferEntity2, {
          [mockOriginTransferEntity.asset]: { symbol: "DAI", decimals: 18 },
        }),
        ParserFns.originTransfer(originTransferEntity4, {
          [mockOriginTransferEntity.asset]: { symbol: "DAI", decimals: 18 },
        }),
      ]);
    });
  });

  describe("#getDestinationTransfers", () => {
    it("should handle the case to parse empty transfers", async () => {
      expect(() => subgraphReader.getDestinationTransfers([])).to.not.throw;
      expect(await subgraphReader.getDestinationTransfers([])).to.be.deep.eq([]);
    });
    it("should get the corresponding destination transfers from the origin transfers", async () => {
      const originTransferEntity1 = {
        ...mockOriginTransferEntity,
        transferId: mkBytes32("0xaaa111"),
        originDomain: "1111",
        destinationDomain: "3331",
      };
      const originTransferEntity2 = {
        ...mockOriginTransferEntity,
        transferId: mkBytes32("0xaaa222"),
        originDomain: "1111",
        destinationDomain: "3331",
      };
      const originTransfers: OriginTransfer[] = [
        ParserFns.originTransfer(originTransferEntity1, {
          [mockOriginTransferEntity.asset]: { symbol: "DAI", decimals: 18 },
        }),
        ParserFns.originTransfer(originTransferEntity2, {
          [mockOriginTransferEntity.asset]: { symbol: "DAI", decimals: 18 },
        }),
      ];

      const destinationTransferEntity = { ...mockDestinationTransferEntity, transferId: mkBytes32("0xaaa111") };

      response.set("3331", [[destinationTransferEntity]]);
      executeStub.resolves(response);
      const transferEntity: XTransfer = ParserFns.originTransfer(originTransferEntity1, {
        [mockOriginTransferEntity.asset]: { symbol: "DAI", decimals: 18 },
      });
      transferEntity.destination = ParserFns.destinationTransfer(destinationTransferEntity).destination;
      expect(await subgraphReader.getDestinationTransfers(originTransfers)).to.be.deep.eq([transferEntity]);
    });
  });

  describe("#getProcessedRootMessagesByDomain", () => {
    it("should return the processed root messages", async () => {
      const rootMessages = [mock.entity.rootMessage(), mock.entity.rootMessage()];
      response.set("1111", [rootMessages]);
      executeStub.resolves(response);

      const processedRootMessages = await subgraphReader.getProcessedRootMessagesByDomain([
        { domain: "1111", limit: 100, offset: 0 },
      ]);
      expect(processedRootMessages).to.be.deep.eq(rootMessages);
    });
  });

  describe("#getSentRootMessagesByDomain", () => {
    it("should return the sent root message by domain", async () => {
      const messages = [mock.entity.rootMessage()];
      response.set("1111", messages);
      executeStub.resolves(response);

      const sentMessages = await subgraphReader.getSentRootMessagesByDomain([
        { domain: "1111", offset: 0, limit: 100 },
      ]);
      expect(sentMessages).to.be.deep.eq(messages);
    });
  });

  describe("#getOriginMessagesByDomain", () => {
    it("should return the origin message by domain", async () => {
      const messages = [mock.entity.originMessage()];
      response.set("1111", messages);
      executeStub.resolves(response);

      const originMessages = await subgraphReader.getOriginMessagesByDomain([
        { domain: "1111", offset: 0, limit: 100, maxBlockNumber: 1 },
      ]);
      expect(originMessages).to.be.deep.eq(
        messages.map((r) => {
          return { ...r, domain: "1111" };
        }),
      );
    });
  });

  describe("#getGetAggregatedRootsByDomain", () => {
    it("should return the aggregated root by domain", async () => {
      const roots = [mock.entity.aggregatedRoot()];
      response.set("1111", roots);
      executeStub.resolves(response);

      const aggregatedRoots = await subgraphReader.getGetAggregatedRootsByDomain([
        { hub: "1111", index: 0, limit: 100, maxBlockNumber: 10000 },
      ]);
      expect(aggregatedRoots).to.be.deep.eq(
        roots.map((r) => {
          return { ...r, domain: "1111" };
        }),
      );
    });
  });

  describe("#getGetPropagatedRoots", () => {
    it("should return the propagated roots", async () => {
      const root = mock.entity.propagatedRoot();
      response.set("1111", [root]);
      executeStub.resolves(response);

      const propagatedRoots = await subgraphReader.getGetPropagatedRoots("1111", 0, 100, 1000);
      expect(propagatedRoots).to.be.deep.eq([root]);
    });
  });

  describe("#getLatestBlockNumber", () => {
    it("should return latestBlockNumber per domain", async () => {
      response.set("1111", [{ block: { number: 100 } }]);
      response.set("3331", [{ block: { number: 200 } }]);
      executeStub.resolves(response);
      const res = await subgraphReader.getLatestBlockNumber(["1111", "3331"]);
      expect(res.get("1111")).to.be.eq(100);
      expect(res.get("3331")).to.be.eq(200);
    });
  });

  describe("#getMaxRoutersPerTransfer", () => {
    it("should return maxRoutersPerTransfer per domain", async () => {
      response.set("1111", [{ maxRoutersPerTransfer: 3 }]);
      response.set("3331", [{ maxRoutersPerTransfer: 3 }]);
      executeStub.resolves(response);
      const res = await subgraphReader.getMaxRoutersPerTransfer(["1111", "3331"]);
      expect(res.get("1111")).to.be.eq(3);
      expect(res.get("3331")).to.be.eq(3);
    });
  });

  describe("#getConnectorMeta", () => {
    it("should return connector meta per domain", async () => {
      const connectorMeta1111 = {
        amb: mkAddress("0x1111"),
        hubDomain: "1111",
        spokeDomain: "1111",
        id: CONNECTOR_META_ID,
        mirrorConnector: mkAddress("0x2222"),
        rootManager: mkAddress("0x3333"),
      };

      const connectorMeta3331 = {
        amb: mkAddress("0x1111"),
        hubDomain: "1111",
        spokeDomain: "3331",
        id: CONNECTOR_META_ID,
        mirrorConnector: mkAddress("0x2222"),
        rootManager: mkAddress("0x3333"),
      };
      response.set("1111", [connectorMeta1111]);
      response.set("3331", [connectorMeta3331]);
      executeStub.resolves(response);
      const res = await subgraphReader.getConnectorMeta(["1111", "3331"]);
      expect(res).to.deep.eq([ParserFns.connectorMeta(connectorMeta1111), ParserFns.connectorMeta(connectorMeta3331)]);
    });
  });

  describe("#getReceivedAggregatedRootsByDomain", () => {
    it("should return the received aggregated roots", async () => {
      const roots = [mock.entity.receivedAggregateRoot(), mock.entity.receivedAggregateRoot()];
      response.set("1111", [roots]);
      executeStub.resolves(response);

      const aggregatedRoots = await subgraphReader.getReceivedAggregatedRootsByDomain([
        { domain: "1111", offset: 0, limit: 100, maxBlockNumber: 1000 },
      ]);
      expect(aggregatedRoots).to.be.deep.eq(
        roots.map((r) => {
          return { ...r, domain: "1111" };
        }),
      );
    });
  });

  describe("#getRootManagerMeta", () => {
    it("should return the root manager meta", async () => {
      const root = {
        domains: [mock.domain.A, mock.domain.B],
        connectors: [mkAddress("0x1"), mkAddress("0x2")],
        id: "ROOT_MANAGER_META_ID",
      };
      response.set("1111", [root]);
      executeStub.resolves(response);

      const rootManagerMeta = await subgraphReader.getRootManagerMeta("1111");
      expect(rootManagerMeta).to.be.deep.eq(root);
    });
  });

  describe("#getRootManagerMode", () => {
    it("should return the root manager mode", async () => {
      const mode = {
        id: "ROOT_MANAGER_MODE_ID",
        mode: "OPTIMISTIC_MODE",
      };
      response.set("1111", [mode]);
      executeStub.resolves(response);

      const rootManagerMode = await subgraphReader.getRootManagerMode("1111");
      expect(rootManagerMode).to.be.deep.eq(mode);
    });
    it("should return the default value", async () => {
      const defaultMode = {
        id: "ROOT_MANAGER_MODE_ID",
        mode: "SLOW_MODE",
      };
      executeStub.resolves(response);

      const rootManagerMode = await subgraphReader.getRootManagerMode("1111");
      expect(rootManagerMode).to.be.deep.eq(defaultMode);
    });
  });

  describe("#getSpokeConnectorMode", () => {
    it("should return the root manager meta", async () => {
      const mode = {
        id: "CONNECTOR_MODE_ID",
        mode: "OPTIMISTIC_MODE",
      };
      response.set("1111", [mode]);
      executeStub.resolves(response);

      const rootManagerMode = await subgraphReader.getSpokeConnectorMode("1111");
      expect(rootManagerMode).to.be.deep.eq(mode);
    });

    it("should return the default value", async () => {
      const defaultMode = {
        id: "CONNECTOR_MODE_ID",
        mode: "SLOW_MODE",
      };
      executeStub.resolves(response);

      const rootManagerMode = await subgraphReader.getSpokeConnectorMode("1111");
      expect(rootManagerMode).to.be.deep.eq(defaultMode);
    });
  });
  describe("#getStableSwapPools", () => {
    it("should return the stable swap pools", async () => {
      const pool = {
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
        pooledTokens: [{ asset: mkAddress("0xa") }, { asset: mkAddress("0xb") }],
        tokenPrecisionMultipliers: ["1", "1"],
        poolTokenDecimals: [18, 18],
        balances: ["200000", "200000"],
        virtualPrice: "400000",
        invariant: "0",
        lpTokenSupply: "0",
      };
      response.set("1111", [pool]);
      executeStub.resolves(response);

      const swapPool = await subgraphReader.getStableSwapPools("1111");
      expect(swapPool).to.be.deep.eq([ParserFns.stableSwapPool(pool)]);
    });
  });

  describe("#getStableSwapPoolEventsByDomainAndNonce", () => {
    it("should return the stable swap pool", async () => {
      const pool = mock.entity.stableswapPoolEvent();
      pool["stableSwap"] = {
        key: pool.poolId,
        pooledTokens: pool.pooledTokens,
        asset: mkAddress("0xb"),
        tokenPrecisionMultipliers: ["1", "1"],
      };
      pool["block"] = pool.blockNumber;
      pool["transaction"] = pool.transactionHash;

      response.set("1111", [pool]);
      executeStub.resolves(response);
      const agents: Map<string, SubgraphQueryMetaParams> = new Map();
      agents.set("1111", { maxBlockNumber: 99999999, latestNonce: 0, orderDirection: "asc" });

      const swapPool = await subgraphReader.getStableSwapPoolEventsByDomainAndNonce(agents, "add");
      expect(swapPool[0].poolId).to.be.eq(pool.poolId);
    });
  });

  describe("#getStableSwapLpTransferEventsByDomainAndNonce", () => {
    it("should return the stable swap transfer", async () => {
      const transfer = mock.entity.stableSwapLpTransfer();
      transfer["token"] = {
        stableSwap: { key: transfer.poolId, pooledTokens: transfer.pooledTokens },
        address: transfer.lpToken,
      };
      transfer["block"] = transfer.blockNumber;
      transfer["transaction"] = transfer.transactionHash;
      transfer["from"] = transfer.fromAddress;
      transfer["to"] = transfer.toAddress;
      transfer["fromBalance"] = transfer.balances[0];
      transfer["toBalance"] = transfer.balances[1];

      response.set("1111", [transfer]);
      executeStub.resolves(response);
      const agents: Map<string, SubgraphQueryMetaParams> = new Map();
      agents.set("1111", { maxBlockNumber: 99999999, latestNonce: 0, orderDirection: "asc" });

      const swapPool = await subgraphReader.getStableSwapLpTransferEventsByDomainAndNonce(agents);
      expect(swapPool[0].poolId).to.be.eq(transfer.poolId);
    });
  });

  describe("#getProposedSnapshotsByDomain", () => {
    it("should getProposedSnapshotsByDomain", async () => {
      const snapshot = mock.entity.snapshot();
      snapshot["disputeCliff"] = snapshot.endOfDispute;
      snapshot["snapshotsRoots"] = snapshot.roots;
      snapshot["timestamp"] = snapshot.proposedTimestamp;

      response.set("1111", [snapshot]);
      executeStub.resolves(response);

      const graphSnapshot = await subgraphReader.getProposedSnapshotsByDomain([
        { hub: "1111", snapshotId: 1, limit: 100, maxBlockNumber: 1000 },
      ]);
      expect(graphSnapshot[0].aggregateRoot).to.be.eq(snapshot.aggregateRoot);
    });
  });

  describe("#getSavedSnapshotRootsByDomain", () => {
    it("should getSavedSnapshotRootsByDomain", async () => {
      const snapshot = mock.entity.snapshotRoot();

      response.set("1111", [snapshot]);
      executeStub.resolves(response);

      const graphSnapshot = await subgraphReader.getSavedSnapshotRootsByDomain([
        { hub: "1111", snapshotId: 1, limit: 100, maxBlockNumber: 1000 },
      ]);
      expect(graphSnapshot[0]).to.deep.eq(snapshot);
    });
  });

  describe("#getFinalizedRootsByDomain", () => {
    it("should getFinalizedRootsByDomain", async () => {
      const snapshot = mock.entity.optimisticRootFinalized();

      response.set("1111", [snapshot]);
      executeStub.resolves(response);

      const graphSnapshot = await subgraphReader.getFinalizedRootsByDomain(
        [{ domain: "1111", timestamp: 1, limit: 100, maxBlockNumber: 1000 }],
        false,
      );
      expect(graphSnapshot[0]).to.deep.eq(snapshot);
    });
  });

  describe("#getPropagatedOptimisticRootsByDomain", () => {
    it("should getPropagatedOptimisticRootsByDomain", async () => {
      const snapshot = mock.entity.optimisticRootPropagated();

      response.set("1111", [snapshot]);
      executeStub.resolves(response);

      const graphSnapshot = await subgraphReader.getPropagatedOptimisticRootsByDomain([
        { hub: "1111", timestamp: 1, limit: 100, maxBlockNumber: 1000 },
      ]);
      expect(graphSnapshot[0]).to.deep.eq(snapshot);
    });
  });

  describe("#getGetPropagatedRoots", () => {
    it("should getGetPropagatedRoots", async () => {
      const root = mock.entity.propagatedRoot();

      response.set("1111", [root]);
      executeStub.resolves(response);

      const roots = await subgraphReader.getGetPropagatedRoots("1111", 1, 100, 1000);
      expect(roots[0]).to.deep.eq(root);
    });
  });

  describe("#getRelayerFeesIncreasesByDomainAndTimestamp", () => {
    it("should getRelayerFeesIncreasesByDomainAndTimestamp", async () => {
      const increase = mock.entity.relayerFeesIncrease();
      increase["transfer"] = { id: increase.transferId };

      response.set("1111", [increase]);
      executeStub.resolves(response);

      const agents: Map<string, SubgraphQueryByTimestampMetaParams> = new Map();
      agents.set("1111", { fromTimestamp: 0, orderDirection: "asc" });

      const graphIncrease = await subgraphReader.getRelayerFeesIncreasesByDomainAndTimestamp(agents);
      expect(graphIncrease[0].id).to.deep.eq(increase.id);
    });
  });

  describe("#getSlippageUpdatesByDomainAndTimestamp", () => {
    it("should getSlippageUpdatesByDomainAndTimestamp", async () => {
      const slippage = mock.entity.slippageUpdate();
      slippage["transfer"] = { id: slippage.transferId };

      response.set("1111", [slippage]);
      executeStub.resolves(response);

      const agents: Map<string, SubgraphQueryByTimestampMetaParams> = new Map();
      agents.set("1111", { fromTimestamp: 0, orderDirection: "asc" });

      const graphSlippage = await subgraphReader.getSlippageUpdatesByDomainAndTimestamp(agents);
      expect(graphSlippage[0].id).to.deep.eq(slippage.id);
    });
  });

  describe("#getRouterDailyTVLByDomainAndTimestamp", () => {
    it("should getRouterDailyTVLByDomainAndTimestamp", async () => {
      const _routerTvl = mock.entity.routerDailyTVL();
      const routerTvl = { ..._routerTvl, asset: mkAddress(_routerTvl.asset), router: mkAddress(_routerTvl.asset) };

      response.set("13337", [routerTvl]);
      executeStub.resolves(response);

      const agents: Map<string, SubgraphQueryByTimestampMetaParams> = new Map();
      agents.set("13337", { fromTimestamp: 0, orderDirection: "asc" });

      const graphRouterTvl = await subgraphReader.getRouterDailyTVLByDomainAndTimestamp(agents);
      expect(graphRouterTvl[0].id).to.eq(`${routerTvl.domain}-${routerTvl.id}`);
    });
  });

  describe("#getStableSwapExchanges", () => {
    it("should return the stable swap exchange", async () => {
      const exchange = {
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
        tokensSold: "100000",
        tokensBought: "100000",
        balances: ["100000", "100000"],
        fee: "10000",
        block: "25792350",
        timestamp: "1672823480",
        transaction: mkBytes32("0xa"),
        nonce: "16728234800001",
      };
      response.set("1111", [exchange]);
      executeStub.resolves(response);

      const agents: Map<string, SubgraphQueryMetaParams> = new Map();
      agents.set("1111", { maxBlockNumber: 99999999, latestNonce: 0 });

      const swapExchange = await subgraphReader.getStableSwapExchangeByDomainAndNonce(agents);
      expect(swapExchange).to.be.deep.eq([ParserFns.stableSwapExchange(exchange)]);
    });
  });

  describe("#getRouterDailyTVLByDomainAndTimestamp", () => {
    it("should return the router daily tvl", async () => {
      const tvl = {
        id: mkBytes32("0xa"),
        domain: "1111",
        asset: { id: mkAddress("0xa"), decimal: 18 },
        router: { id: mkAddress("0xb") },
        timestamp: 1673421076,
        balance: "123122343",
        blockNumber: 1234,
        transactionHash: mkHash("0xa"),
      };
      response.set(tvl.domain, [tvl]);
      executeStub.resolves(response);

      const agents: Map<string, SubgraphQueryByTimestampMetaParams> = new Map();
      agents.set(tvl.domain, { maxBlockNumber: 99999999, fromTimestamp: 0 });

      const dailyTvl = await subgraphReader.getRouterDailyTVLByDomainAndTimestamp(agents);
      expect(dailyTvl).to.be.deep.eq([ParserFns.routerDailyTvl(tvl)]);
    });
  });

  describe("#getRouterLiquidityEventsByDomainAndNonce", () => {
    it("should return the router liquidity events", async () => {
      const event = {
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
      response.set(event.domain, [event]);
      executeStub.resolves(response);

      const agents: Map<string, SubgraphQueryMetaParams> = new Map();
      agents.set(event.domain, { maxBlockNumber: 99999999, latestNonce: 0 });

      const liquidityEvent = await subgraphReader.getRouterLiquidityEventsByDomainAndNonce(agents);
      expect(liquidityEvent).to.be.deep.eq([ParserFns.routerLiquidityEvent(event)]);
    });
  });
});
