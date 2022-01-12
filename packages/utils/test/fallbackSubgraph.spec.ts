import { SinonStub, stub } from "sinon";
import { expect } from "../dist";
import { FallbackSubgraph, SubgraphDomain } from "../src";
import * as fallbackSubgraphIndex from "../src/fallbackSubgraph";

type MockSubgraphSdk = {
  mockSubgraphSdkMethod: () => {};
};

describe("FallbackSubgraph", () => {
  const mockChainId = 1337;
  const mockMaxLag = 10;

  let mockSubgraphSdkMethod: SinonStub;

  let fallbackSubgraph: FallbackSubgraph<MockSubgraphSdk>;

  beforeEach(() => {
    mockSubgraphSdkMethod = stub();
    fallbackSubgraph = new FallbackSubgraph<MockSubgraphSdk>(
      mockChainId,
      (_: string) => ({ mockSubgraphSdkMethod }),
      mockMaxLag,
      SubgraphDomain.TEST,
    );
  });

  describe("request-wrapped methods", () => {
    let mockRequestMethod: SinonStub;
    beforeEach(() => {
      mockRequestMethod = stub(fallbackSubgraph, "request").callsFake(
        async (method: (client: any, url: string) => Promise<any>, _: boolean) => {
          return await method({ mockSubgraphSdkMethod }, "");
        },
      );
    });

    describe("#query", () => {
      const mockGenericQueryResponse = "test";
      let mockGraphQueryMethod: SinonStub;
      beforeEach(() => {
        mockGraphQueryMethod = stub(fallbackSubgraphIndex, "graphQuery").resolves(mockGenericQueryResponse);
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
    let mockOrderedSubgraphs = [{ mockSubgraphSdkMethod }, { mockSubgraphSdkMethod }];
    const failingSubgraphSdkError = new Error("test");
    let mockFailingSubgraphSdkMethod: SinonStub;
    beforeEach(() => {
      stub(fallbackSubgraph as any, "getOrderedSubgraphs").returns(mockOrderedSubgraphs);
      mockFailingSubgraphSdkMethod = stub().rejects(failingSubgraphSdkError);
    });
    it("happy: should return first successful result, and update metrics", async () => {});
    it("should retry if initial method call throws", async () => {});
    it("should resort to next subgraph in orderedSubgraphs if first one fails", async () => {});
    it("should throw if syncRequired and no subgraphs are synced", async () => {});
    it("should throw if no subgraphs available", async () => {});
    it("should throw if none of the subgraph clients succeeded", async () => {});
  });

  describe("#sync", () => {
    it("happy: should update subgraph sync records", () => {});
    it("should return without syncing if there's no health resource/endpoint available", () => {});
  });

  describe("#getOrderedSdks", () => {
    it("should order based on priority", () => {});
    it("should always order synced subgraphs before out of sync subgraphs", () => {});
  });

  describe("#createSubgraphRecord", () => {});
});
