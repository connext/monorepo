import { stub } from "sinon";
import { expect } from "chai";

import { AppContext } from "../../../src/context";
import { createMockContext } from "../../globalTestHook";
import * as bindSubgraphFns from "../../../src/bindings/subgraph/index";

let context: AppContext

describe("SubgraphBinding", () => {
  beforeEach(() => {
    context = createMockContext();
  });

  describe("bindSubgraph", async () => {
    it("should start an interval loop that calls polling fn", async () => {
      const pollStub = stub(bindSubgraphFns, "pollSubgraph").resolves();
      bindSubgraphFns.bindSubgraph(context, 10);
      await expect(pollStub.callCount).to.eventually.be.gte(1);
    });
  });

  describe("pollSubgraph", () => {
    it("should get prepared transactions from the subgraph", async () => {
      
    });

    it("should store the transactions in the cache", async () => {});
  });
});
