import { stub, SinonStub, restore, reset } from "sinon";
import { expect, mkAddress } from "@connext/nxtp-utils";
import { mockChainData, mockResponse, stubContext } from "./mock";
import { SubgraphReader } from "../src/reader";

import * as ExecuteFns from "../src/lib/helpers/execute";

describe("SubgraphReader", () => {
  beforeEach(async () => {
    stubContext();
  });
  afterEach(() => {
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
    it("should return the instance already created", async () => {
      await expect(SubgraphReader.create(mockChainData, "staging")).to.not.throw;
      await expect(SubgraphReader.create(mockChainData, "staging")).to.not.throw;
    });
  });
  describe("#query", () => {
    let subgraphReader: SubgraphReader;
    beforeEach(async () => {
      stub(ExecuteFns, "execute").resolves(mockResponse);
      subgraphReader = await SubgraphReader.create(mockChainData);
    });
    afterEach(() => {
      restore();
      reset();
    });
    it("should execute the query", async () => {
      expect(await subgraphReader.query("hello")).to.be.deep.eq(mockResponse);
    });
  });

  describe("#getAssetBalance", () => {
    let exeuteStub: SinonStub;
    let subgraphReader: SubgraphReader;
    const response: Map<string, any[]> = new Map();
    beforeEach(async () => {
      subgraphReader = await SubgraphReader.create(mockChainData);
      exeuteStub = stub(ExecuteFns, "execute");
    });
    afterEach(() => {
      restore();
      reset();
    });

    it("should return 0 if the asset is not added", async () => {
      response.set("1111", []);
      exeuteStub.resolves(response);
      expect((await subgraphReader.getAssetBalance("1111", mkAddress("0x11"), mkAddress("0x111"))).toString()).to.be.eq(
        "0",
      );
    });
    it("happy: should return the asset balance", async () => {
      response.set("1111", [{ amount: "100" }]);
      exeuteStub.resolves(response);
      expect((await subgraphReader.getAssetBalance("1111", mkAddress("0x11"), mkAddress("0x111"))).toString()).to.be.eq(
        "100",
      );
    });
  });
});
