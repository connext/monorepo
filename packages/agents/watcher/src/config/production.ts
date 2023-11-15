import { WatcherDefaultConfig } from "./types";

export const MAINNET_PRODUCTION_DEFAULT: WatcherDefaultConfig = {
  logLevel: "info",
  environment: "production",
  hubDomain: "6648936",
  server: {
    port: 8000,
    host: "0.0.0.0",
  },
  assets: [
    {
      name: "USDC",
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    },
    {
      name: "WETH",
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    },
  ],
  interval: 15000,
  chains: {
    "6648936": {
      quorum: 2,
    },
    "1869640809": {
      quorum: 2,
    },
    "1886350457": {
      quorum: 2,
    },
    "1634886255": {
      quorum: 2,
    },
    "6450786": {
      quorum: 2,
    },
    "6778479": {
      quorum: 2,
    },
    "1818848877": {
      quorum: 2,
    },
  },
};
