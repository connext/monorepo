import { expect, mkAddress } from "@connext/nxtp-utils";
import Sinon, { stub, restore, reset, SinonStub } from "sinon";
import { getEnvConfig, getConfig, getDeployedTransactionManagerContract } from "../src/config";
import * as ConfigFns from "../src/config";
import { mock } from "./mock";

const mockConfig = mock.config();
const mockChainData = mock.chainData();

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

  describe("#getDeployedTransactionManagerContract", () => {
    beforeEach(() => {
      Sinon.stub(ConfigFns, "getContractDeployments").returns(contractDeployment);
    });

    it("should undefined if no transaction manager", () => {
      const res = getDeployedTransactionManagerContract(0);
      expect(res).to.be.undefined;
    });

    it("happy func", () => {
      const res = getDeployedTransactionManagerContract(testChainId);
      expect(res).to.be.ok;
    });
  });

  describe("getEnvConfig", () => {
    it("should read config from NXTP Config with testnet network values overridden", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_CONFIG_FILE: "buggypath",
        NXTP_NETWORK: "testnet",
        NXTP_CONFIG: JSON.stringify(mockConfig),
      });

      expect(() => getEnvConfig(mockChainData)).not.throw();
    });

    it("should error if transaction manager address is missing", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_NETWORK: "local",
        NXTP_CONFIG: JSON.stringify({
          ...mockConfig,
          chainConfig: {
            1337: {},
            1338: {},
          },
        }),
      });

      expect(() => getEnvConfig(mockChainData)).throw("No transactionManager address");
    });

    it("should error if validation fails", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_NETWORK: "local",
        NXTP_CONFIG: JSON.stringify({
          ...mockConfig,
          chainConfig: {
            1337: { transactionManagerAddress: mkAddress("0xaaa"), subgraph: "http://example.com" },
            1338: { transactionManagerAddress: mkAddress("0xbbb"), subgraph: "http://example.com" },
          },
        }),
      });

      expect(() => getEnvConfig(mockChainData)).throw("must have required property");
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
        res = getEnvConfig(mockChainData);
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

      expect(() => getEnvConfig(mockChainData)).not.throw();
    });

    it("should getEnvConfig", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_MNEMONIC: mockConfig.mnemonic,
        // NXTP_ADMIN_TOKEN: configMock.adminToken,
        NXTP_CHAIN_CONFIG: JSON.stringify(mockConfig.chains),
        NXTP_LOG_LEVEL: mockConfig.logLevel,
      });

      expect(() => getEnvConfig(mockChainData)).not.throw();
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

      const env = getEnvConfig(mockChainData);
      const config = await getConfig(mockChainData);
      expect(config).to.be.deep.eq(env);
    });
  });
});
