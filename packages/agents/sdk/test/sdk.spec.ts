import { expect } from "@connext/utils";
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
      const { sdkBase, sdkRouter, sdkUtils, sdkPool } = await create(config, undefined, mockChainData);
      expect(sdkBase).to.not.be.undefined;
      expect(sdkRouter).to.not.be.undefined;
      expect(sdkUtils).to.not.be.undefined;
      expect(sdkPool).to.not.be.undefined;

      expect(sdkBase.xcall).to.be.a("function");
    });
  });
});
