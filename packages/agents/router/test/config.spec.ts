import { expect, mkAddress } from "@connext/nxtp-utils";
import { stub, restore, reset } from "sinon";

import { getEnvConfig, getConfig } from "../src/config";
import { mock } from "./mock";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

describe("Config", () => {
  let testChainId = 1336;
  let testAddress = "0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
  let contractDeployment: any;

  beforeEach(() => {
    contractDeployment = {
      [String(testChainId)]: {
        test: {
          name: "test",
          chainId: testChainId,
          contracts: {
            TransactionManager: {
              address: testAddress,
              abi: ["fakeAbi()"],
            },
            ConnextPriceOracle: {
              address: testAddress,
              abi: ["fakeAbi()"],
            },
            Multicall: {
              address: testAddress,
              abi: ["fakeAbi()"],
            },
          },
        },
      },
    };
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("getEnvConfig", () => {
    it("happy: should parse out configuration", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_MNEMONIC: mockConfig.mnemonic,
        // NXTP_ADMIN_TOKEN: configMock.adminToken,
        NXTP_CHAIN_CONFIG: JSON.stringify(mockConfig.chains),
        NXTP_LOG_LEVEL: mockConfig.logLevel,
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

    it("should error if transaction manager address is missing", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_NETWORK: "local",
        NXTP_CONFIG: JSON.stringify({
          ...mockConfig,
          chains: {
            1337: {},
            1338: {},
          },
        }),
      });

      expect(() => getEnvConfig(mockChainData, mockDeployments)).throw("No transactionManager address");
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
            [alteredMockChain]: { deployments: { transactionManager: null } },
          },
        }),
      });

      const expectedDeployment = mockDeployments.transactionManager(alteredMockChain);
      const config = getEnvConfig(mockChainData, mockDeployments);
      expect(config.chains[alteredMockChain].deployments.transactionManager).to.deep.equal(expectedDeployment);
    });

    it("should error if validation fails", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_NETWORK: "local",
        NXTP_CONFIG: JSON.stringify({
          ...mockConfig,
          chains: {
            1337: { subgraph: "http://example.com" },
            1338: { subgraph: "http://example.com" },
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
      stub(process, "env").value({
        ...process.env,
        NXTP_CONFIG: JSON.stringify(mockConfig),
      });

      expect(() => getEnvConfig(mockChainData, mockDeployments)).not.throw();
    });
  });

  describe("getConfig", () => {
    it("should work", async () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_MNEMONIC: mockConfig.mnemonic,
        // NXTP_ADMIN_TOKEN: configMock.adminToken,
        NXTP_CHAIN_CONFIG: JSON.stringify(mockConfig.chains),
        NXTP_LOG_LEVEL: mockConfig.logLevel,
      });

      const env = getEnvConfig(mockChainData, mockDeployments);
      const config = await getConfig(mockChainData, mockDeployments);
      expect(config).to.be.deep.eq(env);
    });
  });
});
