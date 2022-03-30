import axios from "axios";
import { SinonStub, stub } from "sinon";

import { expect } from "../../src/mocks";
import { FallbackSubgraph, SubgraphDomain, NxtpError, SubgraphSyncRecord } from "../../src";
import * as FallbackSubgraphIndex from "../../src/peripherals/fallbackSubgraph";

type MockSubgraphSdk = {
  MockSubgraphSdkMethod: () => {};
};

describe("FallbackSubgraph", () => {
  const mockChainId = 1337;
  const mockMaxLag = 20;

  let MockSubgraphSdkMethod: SinonStub;
  let MockFailingSubgraphSdkMethod: SinonStub;

  const generateRandomSubgraphUrl = () => {
    return mockSubgraph.url + Math.random().toString();
  };

  const mockSubgraphSdk = {
    MockSubgraphSdkMethod,
  };
  const mockSubgraph = {
    url: "test-url",
    client: mockSubgraphSdk,
    record: {
      name: "test-url-name",
      synced: true,
      latestBlock: -1,
      syncedBlock: -1,
      lag: 0,
      error: undefined,
    },
    priority: 0,
    metrics: {
      calls: [],
      cps: 0,
      reliability: 0,
      avgExecTime: 0,
    },
  };

  const successfulSubgraphSdkResult = "test-result";
  const failingSubgraphSdkError = new Error("test");

  let fallbackSubgraph: FallbackSubgraph<MockSubgraphSdk>;

  beforeEach(() => {
    MockSubgraphSdkMethod = stub();
    fallbackSubgraph = new FallbackSubgraph<MockSubgraphSdk>(
      mockChainId,
      (_: string) => ({ MockSubgraphSdkMethod: MockSubgraphSdkMethod }),
      mockMaxLag,
      SubgraphDomain.TEST,
    );
    MockFailingSubgraphSdkMethod = stub().rejects(failingSubgraphSdkError);
  });

  describe("getOrderedSubgraphs-stubbed methods", () => {
    let getOrderedSubgraphsStub: SinonStub;
    let mockOrderedSubgraphs = [mockSubgraph];

    beforeEach(() => {
      getOrderedSubgraphsStub = stub(fallbackSubgraph as any, "getOrderedSubgraphs").returns(mockOrderedSubgraphs);
    });

    describe("request-wrapped methods", () => {
      let mockRequestMethod: SinonStub;
      beforeEach(() => {
        try {
          (fallbackSubgraph.request as SinonStub).restore();
        } catch (_) {}
        mockRequestMethod = stub(fallbackSubgraph, "request").callsFake(
          async (method: (client: any, url: string) => Promise<any>, _: boolean) => {
            return await method({ mockSubgraphSdkMethod: MockSubgraphSdkMethod }, "");
          },
        );
      });

      describe("#query", () => {
        const mockGenericQueryResponse = "test";
        let mockGraphQueryMethod: SinonStub;
        beforeEach(() => {
          mockGraphQueryMethod = stub(FallbackSubgraphIndex, "graphQuery").callsFake(async () => {
            return mockGenericQueryResponse;
          });
        });

        afterEach(() => {
          mockGraphQueryMethod.restore();
        });

        it("happy: should passthrough query message to graphql request", async () => {
          expect(await fallbackSubgraph.query("test query")).to.be.eq(mockGenericQueryResponse);
          expect(mockGraphQueryMethod.callCount).to.be.eq(1);
        });

        it("should throw any errors that graphql throws", async () => {
          const testError = new Error("test");
          mockGraphQueryMethod.rejects(testError);
          await expect(fallbackSubgraph.query("test query")).to.be.rejectedWith(testError);
        });
      });
    });

    describe("#request", () => {
      it("happy: should return successful result, and update metrics", async () => {
        expect(mockSubgraph.metrics.calls.length).to.eq(0);

        const result = await fallbackSubgraph.request(async (client: any, url: string) => {
          expect(client).to.be.deep.eq(mockSubgraphSdk);
          expect(url).to.eq(mockSubgraph.url);
          return successfulSubgraphSdkResult;
        });

        expect(result).to.eq(successfulSubgraphSdkResult);
        expect(mockSubgraph.metrics.calls.length).to.eq(1);
        expect(mockSubgraph.metrics.calls[0].success).to.be.true;
      });

      it("should retry if initial method call throws due to enotfound network errors", async () => {
        const fakeNetworkError = new Error("connection failed");
        (fakeNetworkError as any).errno = "ENOTFOUND";

        let i = 0;
        const result = await fallbackSubgraph.request(async (client: any, url: string) => {
          if (i < 3) {
            i++;
            throw fakeNetworkError;
          }
          return successfulSubgraphSdkResult;
        });
        expect(result).to.eq(successfulSubgraphSdkResult);
      });

      it("should resort to next subgraph in orderedSubgraphs if first one fails", async () => {
        const badSubgraphSdk = { MockSubgraphSdkMethod: MockFailingSubgraphSdkMethod };
        const badSubgraph = {
          ...mockSubgraph,
          url: "bad-subg-url",
          client: badSubgraphSdk,
        };
        mockOrderedSubgraphs = [badSubgraph, mockSubgraph];
        getOrderedSubgraphsStub.returns(mockOrderedSubgraphs);

        let i = 0;
        const result = await fallbackSubgraph.request(async (client: any, url: string) => {
          if (i === 0) {
            i++;
            expect(url).to.eq(badSubgraph.url);
            throw new Error("failed");
          }
          expect(url).to.eq(mockSubgraph.url);
          return successfulSubgraphSdkResult;
        });
        expect(result).to.eq(successfulSubgraphSdkResult);
      });

      it("should throw if syncRequired and no subgraphs are synced", async () => {
        stub(fallbackSubgraph, "inSync").get(() => false);
        expect(fallbackSubgraph.request(async (client: any, url: string) => {}, true)).to.be.rejectedWith(NxtpError);
      });

      it("should throw if no subgraphs available", async () => {
        mockOrderedSubgraphs = [];
        expect(fallbackSubgraph.request(async (client: any, url: string) => {}, true)).to.be.rejectedWith(NxtpError);
      });

      it("should throw if none of the subgraph clients succeeded", async () => {
        const badSubgraphSdk = { MockSubgraphSdkMethod: MockFailingSubgraphSdkMethod };
        const badSubgraph = {
          ...mockSubgraph,
          url: "bad-subg-url",
          client: badSubgraphSdk,
        };
        mockOrderedSubgraphs = [badSubgraph, badSubgraph, badSubgraph];

        expect(
          fallbackSubgraph.request(async (client: any, url: string) => {
            throw new Error("failed");
          }, true),
        ).to.be.rejectedWith(NxtpError);
      });
    });
  });

  describe("#sync", () => {
    const mockChainBlockNumber = 42069;
    let mockSubgraphGetBlockNumber: SinonStub;
    let subgraphSdkGetBlockNumberStub: SinonStub;
    let axiosGetStub: SinonStub;

    const mockSubgraphHealth = {
      data: {
        chainHeadBlock: mockChainBlockNumber,
        latestBlock: mockChainBlockNumber,
        syncedBlock: mockChainBlockNumber,
        lastHealthyBlock: undefined,
        network: "test-123",
        fatalError: undefined,
        health: "healthy",
        synced: true,
      },
      url: generateRandomSubgraphUrl(),
    };

    beforeEach(async () => {
      mockSubgraphGetBlockNumber = stub().resolves(mockChainBlockNumber);
      subgraphSdkGetBlockNumberStub = stub().resolves(mockSubgraphGetBlockNumber);
      axiosGetStub = stub(axios, "get");
      axiosGetStub.resolves({ data: [mockSubgraphHealth] });
    });

    afterEach(async () => {
      axiosGetStub.restore();
    });

    it("happy: should use health endpoint; should update sync records", async () => {
      expect(fallbackSubgraph.records.length).to.eq(0);

      const records = await fallbackSubgraph.sync();

      const syncedBlock = mockSubgraphHealth.data.syncedBlock ?? mockSubgraphHealth.data.latestBlock;
      expect(records).to.deep.eq([
        {
          name: records[0].name,
          synced: true,
          latestBlock: mockSubgraphHealth.data.chainHeadBlock,
          syncedBlock,
          lag: mockSubgraphHealth.data.chainHeadBlock - syncedBlock,
          error: undefined,
        },
      ]);
      expect(axiosGetStub.callCount).to.eq(1);
    });

    it("should use getBlockNumber if health point doesn't work; should update sync records", async () => {
      const mockLag = mockMaxLag - 7;
      const mockSubgraphSyncBlockNumber = mockChainBlockNumber - mockLag;
      mockSubgraphGetBlockNumber.resolves({ _meta: { block: { number: mockSubgraphSyncBlockNumber } } });

      const mockSubgraphMap = new Map();
      mockSubgraphMap.set(mockSubgraph.url, {
        ...mockSubgraph,
        client: {
          MockSubgraphSdkMethod: MockSubgraphSdkMethod,
          GetBlockNumber: mockSubgraphGetBlockNumber,
        } as any,
      });
      (fallbackSubgraph as any).subgraphs = mockSubgraphMap;
      axiosGetStub.rejects("no thank u, goodbye");

      const records = await fallbackSubgraph.sync(async () => mockChainBlockNumber);

      expect(records).to.deep.eq([
        {
          name: records[0].name,
          synced: true,
          latestBlock: mockChainBlockNumber,
          syncedBlock: mockSubgraphSyncBlockNumber,
          lag: mockLag,
          error: undefined,
        },
      ]);
      expect(axiosGetStub.callCount).to.eq(1);
    });

    it("should label as out of sync if lagging beyond maxLag", async () => {
      const mockOutOfSyncSubgraphLag = 538;
      const mockLaggingSubgraphLag = mockMaxLag - 3;
      axiosGetStub.resolves({
        data: [
          // First subgraph is bad
          {
            data: {
              ...mockSubgraphHealth.data,
              syncedBlock: mockChainBlockNumber - mockOutOfSyncSubgraphLag,
              latestBlock: mockChainBlockNumber - mockOutOfSyncSubgraphLag,
              chainHeadBlock: mockChainBlockNumber,
            },
            url: generateRandomSubgraphUrl(),
          },
          // Second one is fine
          {
            data: {
              ...mockSubgraphHealth.data,
              syncedBlock: mockChainBlockNumber - mockLaggingSubgraphLag,
              latestBlock: mockChainBlockNumber - mockLaggingSubgraphLag,
              chainHeadBlock: mockChainBlockNumber,
            },
            url: generateRandomSubgraphUrl(),
          },
        ],
      });

      const records = await fallbackSubgraph.sync();

      // Records are returned in order of priority.
      expect(records).to.deep.eq([
        {
          name: records[0].name,
          synced: true,
          latestBlock: mockChainBlockNumber,
          syncedBlock: mockChainBlockNumber - mockLaggingSubgraphLag,
          lag: mockLaggingSubgraphLag,
          error: undefined,
        },
        {
          name: records[1].name,
          synced: false,
          latestBlock: mockChainBlockNumber,
          syncedBlock: mockChainBlockNumber - mockOutOfSyncSubgraphLag,
          lag: mockOutOfSyncSubgraphLag,
          error: undefined,
        },
      ]);
    });
  });

  describe("#getOrderedSubgraphs", () => {
    let mockSubgraphMap = new Map();
    const generateRandomCallMetric = () => {
      return {
        timestamp: Date.now() - Math.floor(Math.random() * 100_000),
        execTime: Math.random(),
        success: Math.random() > 0.8,
      };
    };
    beforeEach(() => {
      for (let _ = 0; _ < 10; _++) {
        const url = generateRandomSubgraphUrl();
        mockSubgraphMap.set(url, {
          ...mockSubgraph,
          url,
        });
      }

      (fallbackSubgraph as any).subgraphs = mockSubgraphMap;
    });

    it("should order based on priority", async () => {
      const mockSubgraphMapValues = Array.from(mockSubgraphMap.values());
      for (let i = 0; i < 10; i++) {
        const subgraph = mockSubgraphMapValues[i];
        mockSubgraphMap.set(subgraph.url, {
          ...mockSubgraph,
          url: subgraph.url,
          metrics: {
            calls: [generateRandomCallMetric(), generateRandomCallMetric(), generateRandomCallMetric()],
            cps: Math.random(),
            reliability: Math.random(),
            avgExecTime: Math.random(),
          },
        });
      }

      const ordered = (fallbackSubgraph as any).getOrderedSubgraphs();

      let lastPriorityValue = -99999;
      expect(
        ordered.every((subgraph) => {
          const isGreaterThanLastValue = subgraph.priority >= lastPriorityValue;
          lastPriorityValue = subgraph.priority;
          return isGreaterThanLastValue;
        }),
      ).to.be.true;
    });

    it("should always order synced subgraphs before out of sync subgraphs", async () => {
      const mockSubgraphMapValues = Array.from(mockSubgraphMap.values());
      // Just mark first 5 as out of sync.
      for (let i = 0; i < 5; i++) {
        mockSubgraphMapValues[i].record = {
          ...mockSubgraphMapValues[i].record,
          synced: false,
        };
      }

      const ordered: { record: SubgraphSyncRecord }[] = (fallbackSubgraph as any).getOrderedSubgraphs();

      expect(ordered.slice(0, 5).every((subgraph) => subgraph.record.synced));
      expect(ordered.slice(5).every((subgraph) => !subgraph.record.synced));
    });
  });
});
