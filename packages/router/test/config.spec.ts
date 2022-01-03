import { expect, mkAddress } from "@connext/nxtp-utils";
import Sinon, { stub, restore, reset, SinonStub } from "sinon";
import {
  getEnvConfig,
  getConfig,
  getDeployedTransactionManagerContract,
  getDeployedPriceOracleContract,
  getDeployedMulticallContract,
  getDeployedChainIdsForGasFee,
} from "../src/config";
import * as ConfigFns from "../src/config";
import { configMock, chainDataMock } from "./utils";

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

  describe("#getDeployedPriceOracleContract", () => {
    beforeEach(() => {
      Sinon.stub(ConfigFns, "getContractDeployments").returns(contractDeployment);
    });

    it("should undefined if no price oracle", () => {
      const res = getDeployedPriceOracleContract(0);
      expect(res).to.be.undefined;
    });

    it("happy func", () => {
      const res = getDeployedPriceOracleContract(testChainId);
      expect(res.address).to.be.ok;
      expect(res.abi).to.be.ok;
    });
  });

  describe("#getDeployedChainIdsForGasFee", () => {
    beforeEach(() => {
      Sinon.stub(ConfigFns, "getContractDeployments").returns(contractDeployment);
    });

    it("happy func", () => {
      const res = getDeployedChainIdsForGasFee();
      expect(res.length).to.be.ok;
    });
  });

  describe("#getDeployedMulticallContract", () => {
    beforeEach(() => {
      Sinon.stub(ConfigFns, "getContractDeployments").returns(contractDeployment);
    });

    it("should undefined if no price oracle", () => {
      const res = getDeployedMulticallContract(0);
      expect(res).to.be.undefined;
    });

    it("happy func", () => {
      const res = getDeployedMulticallContract(testChainId);
      expect(res.address).to.be.ok;
      expect(res.abi).to.be.ok;
    });
  });

  describe("getEnvConfig", () => {
    it("should read config from NXTP Config with testnet network values overridden", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_CONFIG_FILE: "buggypath",
        NXTP_NETWORK: "testnet",
        NXTP_CONFIG: JSON.stringify(configMock),
      });

      expect(() => getEnvConfig(chainDataMock)).not.throw();
    });

    it("should error if transaction manager address is missing", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_NETWORK: "local",
        NXTP_CONFIG: JSON.stringify({
          ...configMock,
          chainConfig: {
            1337: {},
            1338: {},
          },
        }),
      });

      expect(() => getEnvConfig(chainDataMock)).throw("No transactionManager address");
    });

    it("should error if validation fails", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_NETWORK: "local",
        NXTP_CONFIG: JSON.stringify({
          ...configMock,
          chainConfig: {
            1337: { transactionManagerAddress: mkAddress("0xaaa"), subgraph: "http://example.com" },
            1338: { transactionManagerAddress: mkAddress("0xbbb"), subgraph: "http://example.com" },
          },
        }),
      });

      expect(() => getEnvConfig(chainDataMock)).throw("must have required property");
    });

    it("should read config from NXTP Config with local network values overridden", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_NETWORK: "local",
        NXTP_CONFIG: JSON.stringify(configMock),
      });

      let res;
      let error;

      try {
        res = getEnvConfig(chainDataMock);
      } catch (e) {
        error = e;
      }

      expect(error).to.be.undefined;
    });

    it("should read config from default filepath", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_CONFIG: JSON.stringify(configMock),
      });

      expect(() => getEnvConfig(chainDataMock)).not.throw();
    });

    it("should getEnvConfig", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_AUTH_URL: configMock.authUrl,
        NXTP_NATS_URL: configMock.natsUrl,
        NXTP_MNEMONIC: configMock.mnemonic,
        NXTP_ADMIN_TOKEN: configMock.adminToken,
        NXTP_CHAIN_CONFIG: JSON.stringify(configMock.chainConfig),
        NXTP_SWAP_POOLS: JSON.stringify(configMock.swapPools),
        NXTP_LOG_LEVEL: configMock.logLevel,
      });

      expect(() => getEnvConfig(chainDataMock)).not.throw();
    });
  });

  describe("getConfig", () => {
    it("should work", async () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_AUTH_URL: configMock.authUrl,
        NXTP_NATS_URL: configMock.natsUrl,
        NXTP_MNEMONIC: configMock.mnemonic,
        NXTP_ADMIN_TOKEN: configMock.adminToken,
        NXTP_CHAIN_CONFIG: JSON.stringify(configMock.chainConfig),
        NXTP_SWAP_POOLS: JSON.stringify(configMock.swapPools),
        NXTP_LOG_LEVEL: configMock.logLevel,
      });

      const env = getEnvConfig(chainDataMock);
      const config = await getConfig(chainDataMock);
      expect(config).to.be.deep.eq(env);
    });

    it("should work without param", async () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_AUTH_URL: configMock.authUrl,
        NXTP_NATS_URL: configMock.natsUrl,
        NXTP_MNEMONIC: configMock.mnemonic,
        NXTP_ADMIN_TOKEN: configMock.adminToken,
        NXTP_CHAIN_CONFIG: JSON.stringify(configMock.chainConfig),
        NXTP_SWAP_POOLS: JSON.stringify(configMock.swapPools),
        NXTP_LOG_LEVEL: configMock.logLevel,
      });

      const env = getEnvConfig(chainDataMock);
      const config = await getConfig();
      expect(config).to.be.deep.eq(env);
    });
  });
});
