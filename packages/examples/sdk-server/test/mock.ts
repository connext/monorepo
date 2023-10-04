import { Logger } from "@connext/nxtp-utils";

import { SdkServerConfig } from "../src/config";
import { SdkServerContext } from "../src/context";

export const mock = {
  context: (): SdkServerContext => {
    return {
      config: mock.config(),
      logger: new Logger({ name: "mock", level: process.env.LOG_LEVEL || "silent" }),
    };
  },
  config: (): SdkServerConfig => ({
    network: "testnet",
    environment: "staging",
    logLevel: "info",
    chains: {
      "1000": {
        providers: ["http://example.com"],
      },
      "2000": {
        providers: ["http://example.com"],
      },
    },
    redis: {
      enabled: false,
      expirationTime: 10,
      host: "localhost",
      port: 6379,
    },
    server: {
      http: {
        port: 3002,
        host: "localhost",
      },
    },
  }),
};
