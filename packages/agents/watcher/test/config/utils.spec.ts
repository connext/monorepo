import { createRequestContext, expect } from "@connext/nxtp-utils";

import { stub } from "sinon";

import { getEnvConfig, getConfig, TESTNET_STAGING_DEFAULT, MAINNET_PRODUCTION_DEFAULT } from "../../src/config";

const requestContext = createRequestContext("test");

const mockConfig = {
  chains: {
    6648936: {
      providers: ["https://rpc.ankr.com/eth", "https://rpc.ankr.com/eth", "https://rpc.ankr.com/eth"],
    },
    1869640809: {
      providers: ["https://rpc.ankr.com/optimism", "https://rpc.ankr.com/optimism", "https://rpc.ankr.com/optimism"],
    },
    1886350457: {
      providers: ["https://rpc.ankr.com/polygon", "https://rpc.ankr.com/polygon", "https://rpc.ankr.com/polygon"],
    },
    1634886255: {
      providers: ["https://rpc.ankr.com/arbitrum", "https://rpc.ankr.com/arbitrum", "https://rpc.ankr.com/arbitrum"],
    },
    6450786: {
      providers: ["https://rpc.ankr.com/bsc", "https://rpc.ankr.com/bsc", "https://rpc.ankr.com/bsc"],
    },
    6778479: {
      providers: ["https://rpc.ankr.com/gnosis", "https://rpc.ankr.com/gnosis", "https://rpc.ankr.com/gnosis"],
    },
  },
  server: {
    adminToken: "foo",
  },
  mnemonic: "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat",
};

describe("Config:utils", () => {
  describe("getEnvConfig", () => {
    it("should throw if its invalid", () => {
      stub(process, "env").value({
        ...process.env,
        WATCHER_HUB_DOMAIN: 12321,
        WATCHER_CONFIG: JSON.stringify({ ...mockConfig, logLevel: "fail" }),
      });

      let throws = undefined;
      try {
        getEnvConfig();
      } catch (e) {
        throws = e;
      }

      expect(throws).to.not.be.undefined;
    });

    it("should properly default to production config", () => {
      stub(process, "env").value({
        ...process.env,
        WATCHER_CONFIG: JSON.stringify(mockConfig),
      });

      const config = getEnvConfig();
      expect(config).to.containSubset({
        ...MAINNET_PRODUCTION_DEFAULT,
        ...mockConfig,
      });
    });

    it("should properly default to staging config", () => {
      stub(process, "env").value({
        ...process.env,
        WATCHER_ENVIRONMENT: "staging",
        WATCHER_CONFIG: JSON.stringify(mockConfig),
      });

      const config = getEnvConfig();
      expect(config).to.containSubset({
        ...TESTNET_STAGING_DEFAULT,
        ...mockConfig,
      });
    });
  });

  describe("getConfig", () => {
    it("should work", async () => {
      stub(process, "env").value({
        ...process.env,
        WATCHER_CONFIG: JSON.stringify(mockConfig),
      });

      const env = getEnvConfig();
      const config = getConfig();
      expect(config).to.be.deep.eq(env);
    });
  });
});
