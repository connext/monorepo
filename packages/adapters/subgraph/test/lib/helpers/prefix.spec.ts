import { expect } from "@connext/nxtp-utils";
import { restore, reset } from "sinon";
import { getDomainFromPrefix, getPrefixForDomain } from "../../../src/lib/helpers/prefix";
import { stubContext } from "../../mock";

describe("Helpers:prefix", () => {
  beforeEach(() => {
    stubContext();
  });
  afterEach(() => {
    restore();
    reset();
  });
  describe("#getPrefixForDomain", () => {
    it("happy: get the prefix for the domain", () => {
      expect(getPrefixForDomain("3331")).to.be.eq("goerli");
    });
    it("should throw the `DomainInvalid` error", async () => {
      expect(() => {
        getPrefixForDomain("1000");
      }).to.throw("Domain invalid: no supported subgraph found for given domain.");
    });
  });
  describe("#getDomainFromPrefix", () => {
    it("happy: get the domain from the prefix", () => {
      expect(getDomainFromPrefix("rinkeby")).to.be.eq("1111");
      expect(getDomainFromPrefix("goerli")).to.be.eq("3331");
    });
    it("should return undefined if the prefix isn't included", () => {
      expect(getDomainFromPrefix("localtest")).to.be.undefined;
    });
  });
});
