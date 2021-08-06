import { expect } from "../../utils/dist";
import { stub, restore, reset } from "sinon";
import { getEnvConfig, getConfig } from "../src/config";
import { fakeConfig } from "./utils";

describe("Config", () => {
  afterEach(() => {
    restore();
    reset();
  });

  describe("getEnvConfig", () => {
    it("should read config from default filepath", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_CONFIG: JSON.stringify(fakeConfig),
      });

      let res;
      let error;

      try {
        res = getEnvConfig();
      } catch (e) {
        error = e;
      }

      console.log(error);
      expect(error).to.be.undefined;
    });
  });
  describe("getConfig", () => {
    it("should getEnvConfig", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_AUTH_URL: fakeConfig.authUrl,
        NXTP_NATS_URL: fakeConfig.natsUrl,
        NXTP_MNEMONIC: fakeConfig.mnemonic,
        NXTP_ADMIN_TOKEN: fakeConfig.adminToken,
        NXTP_CHAIN_CONFIG: JSON.stringify(fakeConfig.chainConfig),
        NXTP_SWAP_POOLS: JSON.stringify(fakeConfig.swapPools),
        NXTP_LOG_LEVEL: fakeConfig.logLevel,
      });

      let res;
      let error;

      try {
        res = getConfig();
      } catch (e) {
        error = e;
      }

      console.log(error);

      expect(error).to.be.undefined;
    });
  });
});
