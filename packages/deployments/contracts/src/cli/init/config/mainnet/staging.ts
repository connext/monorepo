import { utils } from "ethers";

import { InitConfig } from "../../helpers";
import { PROTOCOL_ADMINS } from "../../../ownership/helpers";

export const MAINNET_STAGING_INIT_CONFIG: InitConfig = {
  hub: "6648936", // MAINNET
  supportedDomains: [
    "6648936", // MAINNET
    "1869640809", // OPTIMISM
    "1886350457", // POLYGON
    "1634886255", // ARBITRUM ONE
    "6450786", // BNB
    "6778479", // GNOSIS
    "1818848877", // LINEA
  ],
  // NOTE: ENSURE LPTOKEN AND BRIDGETOKEN NAMES ARE GENERATED CORRECTLY BASED
  // ON THE NAME GIVEN IN EACH ASSET ENTRY

  assets: [
    {
      name: "TEST",
      canonical: {
        domain: "6648936",
        address: "0x29240a275cddde26BbD6d80fA8ad315C35F91604",
        decimals: 18,
      },
      representations: {
        "1869640809": {
          local: "0xAFCE6eAc6CdcEd6a54d367E1271C10d6595aE78C",
          adopted: "0xAFCE6eAc6CdcEd6a54d367E1271C10d6595aE78C",
        },
        "1886350457": {
          local: "0x09d3DD665e6603150899dE6cc6b4A04EdF60088D",
          adopted: "0x09d3DD665e6603150899dE6cc6b4A04EdF60088D",
        },
        "1634886255": {
          local: "0xF71F1bF36e9c20977927b52Df49cc2F69c8c153d",
          adopted: "0xF71F1bF36e9c20977927b52Df49cc2F69c8c153d",
        },
        "6450786": {
          local: "0xF6eD617c23949A7dE8ABf5318f2AFE9275A53AAb",
          adopted: "0xF6eD617c23949A7dE8ABf5318f2AFE9275A53AAb",
        },
        "6778479": {
          local: "0x2902c5EE62121df4ac5fa76a7d532722Bdf108e0",
          adopted: "0x2902c5EE62121df4ac5fa76a7d532722Bdf108e0",
        },
        "1818848877": {
          local: "0x7FD0bC1d931fABCB18c78f2257f614498CEA1d30",
          adopted: "0x7FD0bC1d931fABCB18c78f2257f614498CEA1d30",
        },
      },
    },
  ],
  agents: {
    relayerFeeVaults: {
      "6648936": PROTOCOL_ADMINS.mainnet["6648936"],
      "1869640809": PROTOCOL_ADMINS.mainnet["1869640809"],
      "1886350457": PROTOCOL_ADMINS.mainnet["1886350457"],
      "1634886255": PROTOCOL_ADMINS.mainnet["1634886255"],
      "6450786": PROTOCOL_ADMINS.mainnet["6450786"],
      "6778479": PROTOCOL_ADMINS.mainnet["6778479"],
      "1818848877": PROTOCOL_ADMINS.mainnet["1818848877"],
    },
    watchers: {
      allowlist: ["0x9c77788d761ee0347Ab550883237CeD274a0F248", "0x917133b1dE100E9fF8F03E24c43F9272dD6A8E99"],
    },
    routers: {
      allowlist: [
        "0xF26c772C0fF3a6036bDdAbDAbA22cf65ECa9F97c", // Connext
      ],
    },
    sequencers: {
      allowlist: ["0x4fFA5968857a6C8242E4A6Ded2418155D33e82E7"],
    },
    relayers: {
      allowlist: [
        "0x75bA5Af8EFFDCFca32E1e288806d54277D1fde99", // gelato 1balance
        "0x935AaAe0f5b02007c08512F0629a9d37Af2E1A47", // connext relayer
        // "0x99a039d4F0e734aA8CcBE74C0FF9780BccD79f1d", // gelato 1balance zksync era
      ],
    },
    proposers: {
      allowlist: [
        "0x163Ac207A8A9b9675bE139256c4d0dc19BBfb93B", // lighthouse
      ],
    },
  },
};
