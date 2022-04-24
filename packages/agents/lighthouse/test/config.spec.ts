import { chainDataToMap, expect } from "@connext/nxtp-utils";
import { stub, restore, reset } from "sinon";

import { getEnvConfig, getConfig } from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";
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
      stub(process, "env").value({
        ...process.env,
        NXTP_MNEMONIC: mockConfig.mnemonic,
        NXTP_CHAIN_CONFIG: JSON.stringify(mockConfig.chains),
        NXTP_LOG_LEVEL: mockConfig.logLevel,
        NXTP_CONFIG: JSON.stringify(mockConfig),
      });

      expect(() => getEnvConfig(mockChainData, mockDeployments)).not.throw();
    });

    it("should read config from NXTP Config with testnet network values overridden", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_CONFIG_FILE: "buggypath",
        NXTP_NETWORK: "testnet",
        NXTP_CONFIG: JSON.stringify(mockConfig),
      });

      expect(() => getEnvConfig(mockChainData, mockDeployments)).not.throw();
    });

    it("should error if the connext address is missing", () => {
      mockChainData[testChainId] = undefined;
      stub(process, "env").value({
        ...process.env,
        NXTP_NETWORK: "local",
        NXTP_CONFIG: JSON.stringify({
          ...mockConfig,
          chains: {
            [testChainId]: {
              assets: [],
              providers: [],
            },
          },
          deployments: {},
        }),
      });

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

      expect(() => getEnvConfig(_chainData, mockDeployments)).throw(
        `No Connext contract address for domain ${testChainId}`,
      );
    });

    it("should error if the wallet is missing", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_MNEMONIC: null,
        NXTP_NETWORK: "local",
        NXTP_CONFIG: JSON.stringify({
          ...mockConfig,
          mnemonic: null,
          web3SignerUrl: null,
        }),
        NXTP_CONFIG_FILE: "buggypath",
      });

      expect(() => getEnvConfig(mockChainData, mockDeployments)).throw(
        `Wallet missing, please add either mnemonic or web3SignerUrl`,
      );
    });

    it("should substitute contract deployments with deployments argument if none exist in config", () => {
      const alteredMockChain = parseInt(mock.chain.A);
      stub(process, "env").value({
        ...process.env,
        NXTP_NETWORK: "local",
        NXTP_CONFIG: JSON.stringify({
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
        }),
      });

      const expectedDeployment = mockDeployments.connext(alteredMockChain);
      const config = getEnvConfig(mockChainData, mockDeployments);
      expect(config.chains[alteredMockChain].deployments.connext).to.be.eq(expectedDeployment.address);
    });

    it("should error if validation fails", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_NETWORK: "local",
        NXTP_CONFIG: JSON.stringify({
          ...mockConfig,
          chains: {
            1337: {
              subgraph: {
                runtime: [{ query: "http://example.com", health: "http://example.com" }],
                analytics: [{ query: "http://example.com", health: "http://example.com" }],
                maxLag: 10,
              },
            },
            1338: {
              subgraph: {
                runtime: [{ query: "http://example.com", health: "http://example.com" }],
                analytics: [{ query: "http://example.com", health: "http://example.com" }],
                maxLag: 10,
              },
            },
          },
        }),
      });

      expect(() => getEnvConfig(mockChainData, mockDeployments)).throw("must have required property");
    });

    it("should read config from NXTP Config with local network values overridden", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_NETWORK: "local",
        NXTP_CONFIG: JSON.stringify(mockConfig),
      });

      let res;
      let error;

      try {
        res = getEnvConfig(mockChainData, mockDeployments);
      } catch (e) {
        error = e;
      }

      expect(error).to.be.undefined;
    });

    it("should read config from default filepath", () => {
      stub(SharedFns, "existsSync").returns(true);
      stub(SharedFns, "readFileSync").returns(JSON.stringify(mockConfig));
      stub(process, "env").value({
        ...process.env,
        NXTP_CONFIG_FILE: "buggypath",
      });

      expect(() => getEnvConfig(mockChainData, mockDeployments)).not.throw();
    });
  });

  describe("getConfig", () => {
    it("should work", async () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_MNEMONIC: mockConfig.mnemonic,
        NXTP_CHAIN_CONFIG: JSON.stringify(mockConfig.chains),
        NXTP_LOG_LEVEL: mockConfig.logLevel,
        NXTP_CONFIG: JSON.stringify(mockConfig),
      });

      const env = getEnvConfig(mockChainData, mockDeployments);
      const config = await getConfig(mockChainData, mockDeployments);
      expect(config).to.be.deep.eq(env);
    });
  });
});
