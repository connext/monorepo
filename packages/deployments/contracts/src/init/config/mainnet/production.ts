import { InitConfig } from "../../helpers";

export const MAINNET_PRODUCTION_INIT_CONFIG: InitConfig = {
  hub: "6648936", // MAINNET
  supportedDomains: [
    "6648936", // MAINNET
    "1869640809", // OPTIMISM
    "1886350457", // POLYGON
  ],
  assets: [
    {
      name: "USDC",
      canonical: {
        domain: "6648936",
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      },
      representations: {
        "1869640809": {
          local: "",
          adopted: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
        },
        "1886350457": {
          local: "",
          adopted: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        },
      },
    },
    {
      name: "WETH",
      canonical: {
        domain: "6648936",
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      },
      representations: {
        "1869640809": {
          local: "",
          adopted: "0x4200000000000000000000000000000000000006",
        },
        "1886350457": {
          local: "",
          adopted: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
        },
      },
    },
  ],
  agents: {
    watchers: {
      whitelist: ["", ""],
    },
    routers: {
      whitelist: [""],
    },
    sequencers: {
      whitelist: [""],
    },
    relayers: {
      whitelist: [""],
    },
  },
};
