import { expect } from "chai";
import { restore, reset, stub, SinonStub } from "sinon";
import axios from "axios";
import { getSubgraphHealth } from "../../src";

describe("Peripherals:Subgraph", () => {
  let axiosGetStub: SinonStub;
  let axiosPostStub: SinonStub;
  beforeEach(() => {
    axiosGetStub = stub(axios, "get");
    axiosPostStub = stub(axios, "post");
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#getSubgraphHealth", () => {
    it("happy: should get subgraph health data", async () => {
      axiosPostStub.resolves({
        data: {
          data: {
            indexingStatusForCurrentVersion: {
              chains: [
                {
                  chainHeadBlock: {
                    number: 100,
                  },
                  latestBlock: {
                    number: 100,
                  },
                  lastHealthyBlock: 100,
                  network: "mocknet",
                },
              ],
              fatalError: undefined,
              health: "healthy",
              synced: true,
            },
          },
        },
      });
      const res = await getSubgraphHealth("test", "https://example.com");
      expect(res).to.be.deep.eq({
        chainHeadBlock: 100,
        latestBlock: 100,
        lastHealthyBlock: 100,
        network: "mocknet",
        fatalError: undefined,
        health: "healthy",
        synced: true,
        url: "https://example.com",
      });
    });
    it("should return undefined", async () => {
      axiosPostStub.resolves(null);
      const res = await getSubgraphHealth("test", "https://example.com");
      expect(res).to.be.undefined;
    });
  });
});
