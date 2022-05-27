import { expect } from "@connext/nxtp-utils";
import { stub, restore, reset } from "sinon";

import { create } from "../src";
import { mock } from "./mock";

import { getEnvConfig } from "../src/config";

import * as ConfigFns from "../src/config";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

describe("Index", () => {
  let config;

  beforeEach(() => {
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);
    stub(ConfigFns, "getConfig").resolves(config);
  });
  afterEach(() => {
    restore();
    reset();
  });
  describe("#create", () => {
    it("happy: should return class instances", async () => {
      const { nxtpSdkBase, nxtpSdkRouter, nxtpSdkStableSwap, nxtpSdkUtils } = await create(
        config,
        undefined,
        mockChainData,
      );
      expect(nxtpSdkBase).to.not.be.undefined;
      expect(nxtpSdkRouter).to.not.be.undefined;
      expect(nxtpSdkStableSwap).to.not.be.undefined;
      expect(nxtpSdkUtils).to.not.be.undefined;

      expect(nxtpSdkBase.xcall).to.be.a("function");
    });
  });
});
