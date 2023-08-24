import { expect } from "@connext/nxtp-utils";
import { stub, restore, reset } from "sinon";

import { create } from "../src/sdk";
import { mock } from "./mock";
import { getEnvConfig } from "../src/config";

import * as ConfigFns from "../src/config";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

describe("Index", () => {
  let config;

  describe("#create", () => {
    beforeEach(() => {
      config = getEnvConfig(mockConfig, mockChainData, mockDeployments);
      stub(ConfigFns, "getConfig").resolves({ nxtpConfig: config, chainData: mockChainData });
    });
    afterEach(() => {
      restore();
      reset();
    });
    it("happy: should return class instance", async () => {
      const { sdkBase, sdkPool, sdkRouter, sdkUtils } = await create(config, undefined, mockChainData);

      expect(sdkBase).to.not.be.undefined;
      expect(sdkRouter).to.not.be.undefined;
      expect(sdkUtils).to.not.be.undefined;
      expect(sdkPool).to.not.be.undefined;

      expect(sdkBase.xcall).to.be.a("function");
    });
  });

  describe("Test caching of config", () => {
    beforeEach(() => {
      config = getEnvConfig(mockConfig, mockChainData, mockDeployments);
    });

    it("happy: multiple configs", async () => {
      const testnetConfig = getEnvConfig({ ...mockConfig, network: "testnet" }, mockChainData, mockDeployments);
      const mainnetConfig = getEnvConfig({ ...mockConfig, network: "mainnet" }, mockChainData, mockDeployments);

      // initialize clients
      const testnetClient = await create(testnetConfig, undefined, mockChainData);
      const mainnetClient = await create(mainnetConfig, undefined, mockChainData);

      // check that configs are different
      expect(mainnetClient.sdkBase.config).to.deep.eq(mainnetConfig);
      expect(mainnetClient.sdkPool.config).to.deep.eq(mainnetConfig);
      expect(mainnetClient.sdkRouter.config).to.deep.eq(mainnetConfig);
      expect(mainnetClient.sdkUtils.config).to.deep.eq(mainnetConfig);

      expect(testnetClient.sdkBase.config).to.deep.eq(testnetConfig);
      expect(testnetClient.sdkPool.config).to.deep.eq(testnetConfig);
      expect(testnetClient.sdkRouter.config).to.deep.eq(testnetConfig);
      expect(testnetClient.sdkUtils.config).to.deep.eq(testnetConfig);
    });
  });
});
