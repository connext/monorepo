import { stub, restore, reset, SinonStub } from "sinon";
import { expect } from "@connext/nxtp-utils";
import { getEnvConfig, getConfig } from "../src/config";
import * as ConfigFns from "../src/config";

import { mock } from "./mock";

describe("Config", () => {
  afterEach(() => {
    restore();
    reset();
  });

  describe("#getConfig", () => {
    let getEnvConfigStub: SinonStub;
    beforeEach(() => {
      getEnvConfigStub = stub(ConfigFns, "getEnvConfig");
    });

    it("should generate sdk server config from chainData in arguments", async () => {
      expect(() => getConfig()).not.throw();
    });

    it("should return sdk server config already created", async () => {
      stub(ConfigFns, "sdkServerConfig").value(mock.config());
      await getConfig();
      expect(getEnvConfigStub).callCount(0);
    });
  });

  describe("#getEnvConfig", () => {
    beforeEach(() => {});

    afterEach(() => {
      restore();
      reset();
    });

    it("should read config from config with network overridden in env vars", () => {
      stub(process, "env").value({
        ...process.env,
        SDK_SERVER_NETWORK: "testnet",
        SDK_SERVER_CONFIG: JSON.stringify(mock.config()),
      });
      expect(() => getEnvConfig()).not.throw();
    });

    it("should error if no config ", () => {
      stub(process, "env").value({
        ...process.env,
        SDK_SERVER_NETWORK: "testnet",
        SDK_SERVER_CONFIG: null,
        SDK_SERVER_CONFIG_FILE: "buggypath",
      });

      expect(() => getEnvConfig()).throw();
    });

    it("should error if no file fails", () => {
      stub(process, "env").value({
        ...process.env,
        SDK_SERVER_CONFIG_FILE: "buggypath",
      });
      expect(() => getEnvConfig()).throw();
    });

    it("should error if validation fails", () => {
      stub(process, "env").value({
        ...process.env,
        SDK_SERVER_CONFIG_FILE: "buggypath",
      });
      expect(() => getEnvConfig()).throw();
    });

    it("should return sdk server config already created", async () => {});
  });
});
