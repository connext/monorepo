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
    chainId: 42,
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
  });
});
