import { BigNumber, constants } from "ethers";

export type DeployConfig = {
  XAppConnectionManager: string;
  TokenRegistry: string;
};

// Contract prefixes for Connector contracts.
export const HUB_PREFIX = "L1";
export const SPOKE_PREFIX = "L2";

const DEFAULT_PROCESS_GAS = BigNumber.from("850000");
const DEFAULT_RESERVE_GAS = BigNumber.from("15000");

export type MessagingProtocolConfig = {
  // The chain ID of the hub. For production environment, should be Ethereum Mainnet (1).
  hub: number;
  configs: {
    // Map of chain ID => configs.
    [chain: number]: {
      prefix: string; // The chain's name and the Connector name prefix.
      // Official AMB contract addresses.
      ambs: {
        hub: string;
        spoke: string;
      };
      processGas: BigNumber;
      reserveGas: BigNumber;
    };
  };
};

export const MESSAGING_PROTOCOL_CONFIGS: {
  local: MessagingProtocolConfig;
  testnet: MessagingProtocolConfig;
  mainnet: MessagingProtocolConfig;
} = {
  local: {
    hub: 1337,
    configs: {
      1337: {
        prefix: "Mainnet",
        ambs: {
          hub: constants.AddressZero,
          spoke: constants.AddressZero,
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
      },
      1338: {
        prefix: "Mainnet",
        ambs: {
          hub: constants.AddressZero,
          spoke: constants.AddressZero,
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
      },
    },
  },
  testnet: {
    hub: 5, // Goerli hub.
    configs: {
      // TODO: Configs for rinkeby, ropsten, etc.
      // Optimism goerli:
      420: {
        prefix: "Optimism",
        ambs: {
          // L1CrossDomainMessenger
          // https://kovan.etherscan.io/address/0x22f24361d548e5faafb36d1437839f080363982b
          // hub: "0x22F24361D548e5FaAfb36d1437839f080363982B",

          // https://goerli.etherscan.io/address/0x5086d1eEF304eb5284A0f6720f79403b4e9bE294
          hub: "0x5086d1eEF304eb5284A0f6720f79403b4e9bE294", // L1 cross domain messenger
          spoke: "0x4200000000000000000000000000000000000007",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
      },
      // // Sokol testnet (for Gnosis):
      // 77: {
      //   prefix: "Gnosis",
      //   ambs: {
      //     // https://kovan.etherscan.io/address/0xfe446bef1dbf7afe24e81e05bc8b271c1ba9a560#code
      //     hub: "0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560",
      //     // https://blockscout.com/poa/sokol/address/0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560/contracts
      //     spoke: "0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560",
      //   },
      //   processGas: DEFAULT_PROCESS_GAS,
      //   reserveGas: DEFAULT_RESERVE_GAS,
      // },
      5: {
        prefix: "Mainnet",
        ambs: {
          hub: constants.AddressZero,
          spoke: constants.AddressZero,
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
      },
    },
  },
  mainnet: {
    hub: 1,
    configs: {
      1: {
        prefix: "Eth",
        ambs: {
          hub: "",
          spoke: "",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
      },
      10: {
        prefix: "Optimism",
        ambs: {
          // L1CrossDomainMessenger
          // https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/deployments/mainnet/Proxy__OVM_L1CrossDomainMessenger.json#L2
          hub: "0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1",
          // L2CrossDomainMessenger
          // see: https://github.com/ethereum-optimism/optimism-tutorial/tree/main/cross-dom-comm
          spoke: "0x4200000000000000000000000000000000000007",
        },
        // TODO: 2mil gas for opti (going L1 => L2)? Is that correct?
        processGas: BigNumber.from("2000000"),
        reserveGas: DEFAULT_RESERVE_GAS,
      },
      100: {
        prefix: "Gnosis",
        ambs: {
          // https://etherscan.io/address/0x4C36d2919e407f0Cc2Ee3c993ccF8ac26d9CE64e
          hub: "0x4C36d2919e407f0Cc2Ee3c993ccF8ac26d9CE64e",
          // https://blockscout.com/xdai/mainnet/address/0x75Df5AF045d91108662D8080fD1FEFAd6aA0bb59
          spoke: "0x75Df5AF045d91108662D8080fD1FEFAd6aA0bb59",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
      },
    },
  },
};
