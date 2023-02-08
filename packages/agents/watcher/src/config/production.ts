import { WatcherDefaultConfig } from "./types";

export const MAINNET_PRODUCTION_DEFAULT: WatcherDefaultConfig = {
  logLevel: "info",
  environment: "production",
  hubDomain: "6648936",
  server: {
    port: 8000,
    host: "0.0.0.0",
  },
  interval: 15000,
  chains: {
    "6648936": {
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
      quorum: 2,
    },
    "1869640809": {
      assets: [
        {
          name: "USDC",
          address: "0x85FB8e2903Ad92A2ab0C6a725806636666ee2Ab4",
        },
        {
          name: "WETH",
          address: "0xfD5C16a50b717338Cbcb44e34e10d735709E9Cb9",
        },
      ],
      quorum: 2,
    },
    "1886350457": {
      assets: [
        {
          name: "USDC",
          address: "0x2ABe2d4F09ea3124DE56AD91ae0950A3B71eCD11",
        },
        {
          name: "WETH",
          address: "0x2BD5B3cfB2b16F2B10e7BA41dc1cb93d61B36bB8",
        },
      ],
      quorum: 2,
    },
    "1634886255": {
      assets: [
        {
          name: "USDC",
          address: "0x85fb8e2903ad92a2ab0c6a725806636666ee2ab4",
        },
        {
          name: "WETH",
          address: "0xfd5c16a50b717338cbcb44e34e10d735709e9cb9",
        },
      ],
      quorum: 2,
    },
    "6450786": {
      assets: [
        {
          name: "USDC",
          address: "0xe4f1ce2dc807084a874e957d5d2ac6502820bc15",
        },
        {
          name: "WETH",
          address: "0x6b205aeaae9de574d76d4e45af92998aefca205b",
        },
      ],
      quorum: 2,
    },
    "6778479": {
      assets: [
        {
          name: "USDC",
          address: "0x67e79CC8d6b7C164Da28864875242b9210BFeb15",
        },
        {
          name: "WETH",
          address: "0x735c7e2035ff902EC8F7115355191Cabb05D86fd",
        },
      ],
      quorum: 2,
    },
  },
};
