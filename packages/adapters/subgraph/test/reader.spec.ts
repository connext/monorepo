import { stub, SinonStub, restore, reset } from "sinon";
import { expect, mkAddress, mkBytes32, OriginTransfer, SubgraphQueryMetaParams, XTransfer } from "@connext/nxtp-utils";
import {
  mockChainData,
  mockDestinationTransferEntity,
  mockOriginTransferEntity,
  mockResponse,
  stubContext,
} from "./mock";
import { SubgraphReader } from "../src/reader";
import * as ParserFns from "../src/lib/helpers/parse";

import * as ExecuteFns from "../src/lib/helpers/execute";
import { BigNumber } from "ethers";

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
      await expect(SubgraphReader.create(mockChainData, "staging")).to.not.throw;
    });
    it("create a production subgraph adapter", async () => {
      await expect(SubgraphReader.create(mockChainData, "production")).to.not.throw;
    });
  });
  describe("#supported", () => {
    it("get supported domains", () => {
      expect(subgraphReader.supported).to.be.deep.eq({ "1111": true, "2221": true, "5555555555555": false });
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
      response.set("1111", [[{ asset: { local: mkAddress("0x111") }, amount: "100" }]]);
      executeStub.resolves(response);
      expect(await subgraphReader.getAssetBalances("1111", mkAddress("0x11"))).to.be.deep.eq({
        "0x1110000000000000000000000000000000000000": BigNumber.from("100"),
      });
    });
  });

  describe("#getAssetBalancesAllRouters", () => {
    it("should return the router balances", async () => {
      response.set("1111", [
        [
          {
            id: mkAddress("aaa"),
            assetBalances: [
              {
                asset: {
                  adoptedAsset: mkAddress("0x111"),
                  local: mkAddress("0x222"),
                  blockNumber: 50000,
                  canonicalDomain: "1111",
                  canonicalId: mkAddress("0x11111"),
                },
                domain: "1111",
                amount: "100",
              },
            ],
          },
        ],
      ]);
      executeStub.resolves(response);
      expect(await subgraphReader.getAssetBalancesAllRouters("1111")).to.be.deep.eq([
        {
          router: mkAddress("aaa"),
          assets: [
            {
              adoptedAsset: mkAddress("0x111"),
              local: mkAddress("0x222"),
              blockNumber: 50000,
              canonicalDomain: "1111",
              canonicalId: mkAddress("0x11111"),
              domain: "1111",
              balance: "100",
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
            local: mkAddress("0x111"),
            adoptedAsset: mkAddress("0x112"),
            canonicalId: mkBytes32(),
            canonicalDomain: "1111",
            blockNumber: "5000",
          },
        ],
      ]);
      executeStub.resolves(response);
      expect(await subgraphReader.getAssetByLocal("1111", mkAddress())).to.be.deep.eq({
        local: mkAddress("0x111"),
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
            local: mkAddress("0x111"),
            adoptedAsset: mkAddress("0x112"),
            canonicalId: mkBytes32(),
            canonicalDomain: "1111",
            blockNumber: "5000",
          },
        ],
      ]);
      executeStub.resolves(response);
      expect(await subgraphReader.getAssetByCanonicalId("1111", mkAddress())).to.be.deep.eq({
        local: mkAddress("0x111"),
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
        ParserFns.originTransfer(mockOriginTransferEntity),
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
        ParserFns.originTransfer(mockOriginTransferEntity),
      );
    });
  });

  describe("#getDestinationTransferById", () => {
    it("should be undefined", async () => {
      response.set("1111", [[]]);
      executeStub.resolves(response);
      expect(await subgraphReader.getDestinationTransferById("1111", mkBytes32())).to.be.undefined;
    });
    it("should return the origin transfer entity", async () => {
      response.set("1111", [[mockDestinationTransferEntity]]);
      executeStub.resolves(response);
      expect(await subgraphReader.getDestinationTransferById("1111", mkBytes32())).to.be.deep.eq(
        ParserFns.destinationTransfer(mockDestinationTransferEntity),
      );
    });
  });

  describe("#getOriginTransfers", () => {
    it("should return the origin transfers across the multichains", async () => {
      response.set("1111", [[mockOriginTransferEntity]]);
      response.set("2221", [[mockOriginTransferEntity]]);
      executeStub.resolves(response);

      const agents: Map<string, SubgraphQueryMetaParams> = new Map();
      agents.set("1111", { maxBlockNumber: 99999999, latestNonce: 0 });
      agents.set("2221", { maxBlockNumber: 99999999, latestNonce: 0 });

      expect(await subgraphReader.getOriginTransfers(agents)).to.be.deep.eq([
        ParserFns.originTransfer(mockOriginTransferEntity),
        ParserFns.originTransfer(mockOriginTransferEntity),
      ]);
    });
  });

  describe("#getXCalls", () => {
    it("should not throw if the response is empty", async () => {
      const agents: Map<string, SubgraphQueryMetaParams> = new Map();
      agents.set("1111", { maxBlockNumber: 99999999, latestNonce: 0 });
      agents.set("2221", { maxBlockNumber: 99999999, latestNonce: 0 });

      response.set("1111", [[]]);
      response.set("2221", [[]]);
      executeStub.resolves(response);
      expect(() => subgraphReader.getXCalls(agents)).to.not.throw;
      expect(await subgraphReader.getXCalls(agents)).to.be.deep.eq([]);
    });

    it("should return the calls which are xcalled on the originDomain and not executed/reconciled on the destinationDomain", async () => {
      const agents: Map<string, SubgraphQueryMetaParams> = new Map();
      agents.set("1111", { maxBlockNumber: 99999999, latestNonce: 0 });
      agents.set("2221", { maxBlockNumber: 99999999, latestNonce: 0 });
      const originCallsResponse: Map<string, any[]> = new Map();
      const destinationCallsResponse: Map<string, any[]> = new Map();
      const originTransferEntity1 = {
        ...mockOriginTransferEntity,
        transferId: mkBytes32("0xaaa111"),
        originDomain: "1111",
        destinationDomain: "2221",
      };
      const originTransferEntity2 = {
        ...mockOriginTransferEntity,
        transferId: mkBytes32("0xaaa222"),
        originDomain: "1111",
        destinationDomain: "2221",
      };

      const originTransferEntity3 = {
        ...mockOriginTransferEntity,
        transferId: mkBytes32("0xbbb111"),
        originDomain: "2221",
        destinationDomain: "1111",
      };

      const originTransferEntity4 = {
        ...mockOriginTransferEntity,
        transferId: mkBytes32("0xbbb222"),
        originDomain: "2221",
        destinationDomain: "1111",
      };
      originCallsResponse.set("1111", [[originTransferEntity1, originTransferEntity2]]);
      originCallsResponse.set("2221", [[originTransferEntity3, originTransferEntity4]]);

      const destinationTransferEntity1 = {
        ...mockDestinationTransferEntity,
        transferId: mkBytes32("0xaaa111"),
      };
      const destinationTransferEntity2 = {
        ...mockDestinationTransferEntity,
        transferId: mkBytes32("0xbbb111"),
      };
      destinationCallsResponse.set("2221", [[destinationTransferEntity1]]);
      destinationCallsResponse.set("1111", [[destinationTransferEntity2]]);

      executeStub.onFirstCall().resolves(originCallsResponse);
      executeStub.onSecondCall().resolves(destinationCallsResponse);
      const xcalledTransfers = await subgraphReader.getXCalls(agents);
      expect(xcalledTransfers.length).to.be.eq(2);
      expect(xcalledTransfers).to.be.deep.eq([
        ParserFns.originTransfer(originTransferEntity2),
        ParserFns.originTransfer(originTransferEntity4),
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
        destinationDomain: "2221",
      };
      const originTransferEntity2 = {
        ...mockOriginTransferEntity,
        transferId: mkBytes32("0xaaa222"),
        originDomain: "1111",
        destinationDomain: "2221",
      };
      const originTransfers: OriginTransfer[] = [
        ParserFns.originTransfer(originTransferEntity1),
        ParserFns.originTransfer(originTransferEntity2),
      ];

      const destinationTransferEntity = { ...mockDestinationTransferEntity, transferId: mkBytes32("0xaaa111") };

      response.set("2221", [[destinationTransferEntity]]);
      executeStub.resolves(response);
      const transferEntity: XTransfer = ParserFns.originTransfer(originTransferEntity1);
      transferEntity.destination = ParserFns.destinationTransfer(destinationTransferEntity).destination;
      expect(await subgraphReader.getDestinationTransfers(originTransfers)).to.be.deep.eq([transferEntity]);
    });
  });

  describe("#getLatestBlockNumber", () => {
    it("should return latestBlockNumber per domain", async () => {
      response.set("1111", [{ block: { number: 100 } }]);
      response.set("2221", [{ block: { number: 200 } }]);
      executeStub.resolves(response);
      const res = await subgraphReader.getLatestBlockNumber(["1111", "2221"]);
      expect(res.get("1111")).to.be.eq(100);
      expect(res.get("2221")).to.be.eq(200);
    });
  });

  describe("#getMaxRoutersPerTransfer", () => {
    it("should return maxRoutersPerTransfer per domain", async () => {
      response.set("1111", [{ maxRoutersPerTransfer: 3 }]);
      response.set("2221", [{ maxRoutersPerTransfer: 3 }]);
      executeStub.resolves(response);
      const res = await subgraphReader.getMaxRoutersPerTransfer(["1111", "2221"]);
      expect(res.get("1111")).to.be.eq(3);
      expect(res.get("2221")).to.be.eq(3);
    });
  });
});
