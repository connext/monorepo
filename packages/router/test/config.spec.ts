import { expect } from "@connext/nxtp-utils";
import { stub, restore, reset } from "sinon";
import { getEnvConfig, getConfig } from "../src/config";
import { configMock } from "./utils";

const TEST_CHAIN_DATA = JSON.parse(fs.readFileSync("./chaindata.test.json", "utf-8"));

describe("Config", () => {
  afterEach(() => {
    restore();
    reset();
  });

  describe("getEnvConfig", () => {
    it("should read config from NXTP Config with testnet network values ovveridden", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_CONFIG_FILE: "buggypath",
        NXTP_NETWORK: "testnet",
        NXTP_CONFIG: JSON.stringify(configMock),
      });

      let res;
      let error;

      try {
        res = getEnvConfig(TEST_CHAIN_DATA);
      } catch (e) {
        error = e;
      }

      expect(error).to.be.undefined;
    });

    it("should read config from NXTP Config with local network values ovveridden", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_NETWORK: "local",
        NXTP_CONFIG: JSON.stringify(configMock),
      });

      let res;
      let error;

      try {
        res = getEnvConfig(TEST_CHAIN_DATA);
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

      let res;
      let error;

      try {
        res = getEnvConfig(TEST_CHAIN_DATA);
      } catch (e) {
        error = e;
      }

      expect(error).to.be.undefined;
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

      let res;
      let error;

      try {
        res = getEnvConfig();
      } catch (e) {
        error = e;
      }

      expect(error).to.be.undefined;
    });
  });

  describe("getConfig", () => {
    it("should work", () => {
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

      const env = getEnvConfig();
      expect(getConfig()).to.be.deep.eq(env);
    });
  });
});
