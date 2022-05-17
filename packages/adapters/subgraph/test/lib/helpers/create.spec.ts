import { chainDataToMap, expect } from "@connext/nxtp-utils";
import { stub, SinonStub, restore, reset } from "sinon";
import * as GraphClientFns from "../../../src/lib/helpers/graphclient";

const mockChainData = chainDataToMap([
  {
    name: "Rinkeby Testnet",
    chainId: 4,
    domainId: "1111",
    network: "rinkeby",
  },
  {
    name: "Kovan Testnet",
    chainId: 42,
    domainId: "2221",
    network: "kovan",
  },
  {
    name: "Local Testnet",
    chainId: 65555,
    domainId: "5555555555555",
    network: "localtest",
  },
]);

import { create, getNetwork } from "../../../src/lib/helpers/create";
describe("Helpers:create", () => {
  describe("#getNetwork", () => {
    it("should return the valid value in case of staging", () => {
      expect(getNetwork("Connext_Staging_Rinkeby", "staging")[1]).to.be.eq("Rinkeby");
    });
    it("should return null in case of staging", () => {
      expect(getNetwork("Connext_Rinkeby", "staging")).to.be.eq(null);
    });

    it("should return the valid value in case of production", () => {
      expect(getNetwork("Connext_Staging_Rinkeby", "production")).to.be.eq(null);
    });
    it("should return null in case of staging", () => {
      expect(getNetwork("Connext_Rinkeby", "production")[1]).to.be.eq("Rinkeby");
    });
  });
  describe("#create", () => {
    let getSubgraphNamesStub: SinonStub;
    before(() => {
      getSubgraphNamesStub = stub(GraphClientFns, "getSubgraphNames");
    });
    after(() => {
      restore();
      reset();
    });

    it("happy: create the staging subgraphMap by parsing chainData", async () => {
      getSubgraphNamesStub.resolves(["Connext_Staging_Rinkeby", "Connext_Staging_Kovan"]);
      const subgraphMap = await create(mockChainData, "staging");
      const response = {
        sources: {
          "1111": { domain: "1111", prefix: "stagingrinkeby" },
          "2221": { domain: "2221", prefix: "stagingkovan" },
        },
        supported: { "1111": true, "2221": true, "5555555555555": false },
      };
      expect(subgraphMap).to.be.deep.eq(response);
    });

    it("happy: create the production subgraphMap by parsing chainData", async () => {
      getSubgraphNamesStub.resolves(["Connext_Rinkeby", "Connext_Kovan"]);
      const subgraphMap = await create(mockChainData, "production");
      const response = {
        sources: {
          "1111": { domain: "1111", prefix: "rinkeby" },
          "2221": { domain: "2221", prefix: "kovan" },
        },
        supported: { "1111": true, "2221": true, "5555555555555": false },
      };
      expect(subgraphMap).to.be.deep.eq(response);
    });

    it("happy: create the production subgraphMap by default", async () => {
      getSubgraphNamesStub.resolves(["Connext_Rinkeby", "Connext_Kovan"]);
      const subgraphMap = await create(mockChainData);
      const response = {
        sources: {
          "1111": { domain: "1111", prefix: "rinkeby" },
          "2221": { domain: "2221", prefix: "kovan" },
        },
        supported: { "1111": true, "2221": true, "5555555555555": false },
      };
      expect(subgraphMap).to.be.deep.eq(response);
    });

    it("happy: should support all the domains", async () => {
      getSubgraphNamesStub.resolves(["Connext_Rinkeby", "Connext_Kovan"]);
      const _chainData = chainDataToMap([
        {
          name: "Rinkeby Testnet",
          chainId: 4,
          domainId: "1111",
          network: "rinkeby",
        },
      ]);
      const subgraphMap = await create(_chainData);
      const response = {
        sources: {
          "1111": { domain: "1111", prefix: "rinkeby" },
        },
        supported: { "1111": true },
      };
      expect(subgraphMap).to.be.deep.eq(response);
    });
  });
});
