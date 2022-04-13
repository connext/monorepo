import { expect } from "@connext/nxtp-utils";

import { parseHostname, formatUrl } from "../../src";

describe("Helpers:Parse", () => {
  describe("#parseHostname", () => {
    it("happy", () => {
      expect(parseHostname("https://api.thegraph.com/subgraphs/")).to.be.eq("api.thegraph.com");
    });
  });
  describe("#parseHostname", () => {
    it("happy", () => {
      expect(parseHostname("https://api.thegraph.com/subgraphs/")).to.be.eq("api.thegraph.com");
    });
  });
  describe("#formatUrl", () => {
    it("happy: should add indetifier if exists", () => {
      expect(formatUrl("https://api.thegraph.com", "subgraphs", "hosted-service")).to.be.eq(
        "https://api.thegraph.com/subgraphs/hosted-service",
      );
    });
    it("happy: should not add indetifier if no exists", () => {
      expect(formatUrl("https://api.thegraph.com", "subgraphs")).to.be.eq("https://api.thegraph.com/subgraphs");
    });
  });
});
