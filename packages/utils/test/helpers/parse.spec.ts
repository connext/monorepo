import { expect } from "chai";
import { parseHostname } from "../../src";

describe("Helpers:Parse", () => {
  describe("#parseHostname", () => {
    it("happy", () => {
      expect(parseHostname("https://api.thegraph.com/subgraphs/")).to.be.eq("api.thegraph.com");
    });
  });
});
