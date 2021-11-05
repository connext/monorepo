import { expect, mkAddress } from "@connext/nxtp-utils";
import { stub, restore, reset } from "sinon";
import {
  getEnvConfig,
  getConfig,
  getDeployedTransactionManagerContract,
  getDeployedPriceOracleContract,
  getDeployedChainIdsForGasFee,
} from "../src/config";
import { configMock, chainDataMock } from "./utils";

describe("Config", () => {
  afterEach(() => {
    restore();
    reset();
  });

  describe("#getDeployedTransactionManagerContract", () => {
    it("should undefined if no transaction manager", () => {
      const res = getDeployedTransactionManagerContract(0);
      expect(res).to.be.undefined;
    });

    it("happy func", () => {
      const res = getDeployedTransactionManagerContract(4);
      expect(res).to.be.ok;
    });
  });

  describe("#getDeployedPriceOracleContract", () => {
    it("should undefined if no price oracle", () => {
      const res = getDeployedPriceOracleContract(0);
      expect(res).to.be.undefined;
    });

    it("happy func", () => {
      const res = getDeployedPriceOracleContract(4);
      expect(res).to.be.ok;
    });
  });

  describe("#getDeployedChainIdsForGasFee", () => {
    it("happy func", () => {
      const res = getDeployedChainIdsForGasFee();
      expect(res).to.be.includes(4);
      expect(res).to.be.includes(42161);
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
