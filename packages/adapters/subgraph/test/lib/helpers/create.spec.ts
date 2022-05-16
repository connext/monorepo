import { expect } from "@connext/nxtp-utils";
import { stub, SinonStub } from "sinon";

import { mock } from "@connext/nxtp-utils";

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
    before(() => {
      // stub(SharedFns, "getMeshOptions").resolves();
    });
  });
});
