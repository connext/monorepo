import { WatcherDefaultConfig } from "./types";

export const TESTNET_STAGING_DEFAULT: WatcherDefaultConfig = {
  logLevel: "info",
  environment: "staging",
  hubDomain: "1735353714",
  server: {
    port: 8000,
    host: "0.0.0.0",
  },
  assets: [
    {
      name: "BigBroERC20",
      address: "0x2D4A671E49d39Fc13F9237f60B6E6FDd16d8Ad4d",
    },
  ],
  interval: 15000,
  chains: {
    "1735353714": {
      quorum: 2,
    },
    "1735356532": {
      quorum: 2,
    },
  },
};
