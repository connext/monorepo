import { expect } from "@connext/nxtp-utils";
import { stub, restore, reset } from "sinon";

import { mock, getChainIdFromDomain, getDomainFromChainId } from "../../src";
import * as ChainDataFns from "../../src/peripherals/chainData";

describe("Helpers:Nomad", () => {
  beforeEach(() => {
    stub(ChainDataFns, "getChainData").resolves(mock.chainData());
  });
  afterEach(() => {
    restore();
    reset();
  });
  describe("#getChainIdFromDomain", () => {
    it("should error if the chainData doesn't have a record for domain", () => {
      expect(getChainIdFromDomain("2000", mock.chainData())).to.be.eventually.throw();
    });
    it("happy: should get chainId from domain with the `chainData` argument", async () => {
      const chainId = await getChainIdFromDomain("1337", mock.chainData());
      expect(chainId).to.be.eq(1337);
    });
    it("happy: should get chainId from domain using `getChainData`", async () => {
      const chainId = await getChainIdFromDomain("1337");
      expect(chainId).to.be.eq(1337);
    });
  });
  describe("#getDomainFromChainId", () => {
    it("should error if the chainData doesn't have a record for chainId", () => {
      expect(getDomainFromChainId(2000, mock.chainData())).to.be.eventually.throw();
    });
    it("happy: should get domain from chainId with the `chainData` argument", async () => {
      const domain = await getDomainFromChainId(1337, mock.chainData());
      expect(domain).to.be.eq("1337");
    });
    it("happy: should get domain from chainId using `getChainData`", async () => {
      const domain = await getDomainFromChainId(1337);
      expect(domain).to.be.eq("1337");
    });
  });
});
