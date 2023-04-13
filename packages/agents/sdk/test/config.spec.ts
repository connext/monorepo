import { chainDataToMap, expect } from "@connext/nxtp-utils";
import { stub, restore, reset } from "sinon";

import { getEnvConfig, getConfig } from "../src/config";
import { mock } from "./mock";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

describe("Config", () => {
  const testChainId = mock.chain.A;

  afterEach(() => {
    restore();
    reset();
  });

  describe("#getEnvConfig", () => {
    it("happy: should parse out configuration", () => {
      expect(() => getEnvConfig(mockConfig, mockChainData, mockDeployments)).not.throw();
    });

    it("should read config from NXTP Config with testnet network values overridden", () => {
      expect(() => getEnvConfig({ ...mockConfig, network: "testnet" }, mockChainData, mockDeployments)).not.throw();
    });

    it("should error if the connext address is missing", () => {
      const _chainData = chainDataToMap([
        {
          name: "Unit Test Chain 1",
          chainId: 111,
          domainId: "111",
          confirmations: 1,
          assetId: {},
        },
        {
          name: "Unit Test Chain 2",
          chainId: 222,
          domainId: "222",
          confirmations: 1,
          assetId: {},
        },
      ]);

      expect(() =>
        getEnvConfig(
          {
            ...mockConfig,
            chains: {
              [testChainId]: {
                assets: [],
                providers: [],
              },
            },
            deployments: {},
          },
          _chainData,
          mockDeployments,
        ),
      ).throw(`No Connext contract address for domain ${testChainId}`);
    });

    it("should substitute contract deployments with deployments argument if none exist in config", () => {
      const alteredMockChain = parseInt(mock.domain.A);
      const expectedDeployment = mockDeployments.connext(alteredMockChain);
      const config = getEnvConfig(
        {
          ...mockConfig,
          chains: {
            ...mockConfig.chains,
            [alteredMockChain]: {
              assets: [],
              providers: [],
              deployments: { connext: null },
              subgraph: {
                runtime: [{ query: "http://example.com", health: "http://example.com" }],
                analytics: [{ query: "http://example.com", health: "http://example.com" }],
                maxLag: 10,
              },
            },
          },
        },
        mockChainData,
        mockDeployments,
      );
      expect(config.chains[alteredMockChain].deployments.connext).to.be.eq(expectedDeployment.address);
    });

    it("should error if validation fails", () => {
      expect(() =>
        getEnvConfig(
          {
            ...mockConfig,
            chains: {
              13337: {},
              13338: {},
            },
          },
          mockChainData,
          mockDeployments,
        ),
      ).throw("must have required property");
    });
  });

  describe("getConfig", () => {
    it("should work", async () => {
      const env = getEnvConfig(mockConfig, mockChainData, mockDeployments);
      const { nxtpConfig } = await getConfig(mockConfig, mockDeployments, mockChainData);
      expect(nxtpConfig).to.be.deep.eq(env);
    });
  });
});
