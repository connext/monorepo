import { expect, mkAddress } from "@connext/nxtp-utils";
import Sinon, { stub, restore, reset, SinonStub, SinonStubbedInstance, createStubInstance } from "sinon";

import * as ConfigFns from "../src/config";
import { configMock, chainDataMock } from "./utils";

import { makeRouter } from "../src/router";

describe("Config", () => {
  beforeEach(() => {});

  afterEach(() => {
    restore();
    reset();
  });

  describe.only("#makeRouter", () => {
    beforeEach(() => {
      Sinon.stub(ConfigFns, "getConfig").returns({
        ...configMock,
        mnemonic: undefined,
        web3SignerUrl: "localhostsigner",
      });
    });

    it("happy func", async () => {
      const res = await makeRouter();
      expect(res).to.be.ok;
    });
  });
});
