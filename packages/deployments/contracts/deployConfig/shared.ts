import { BigNumber, constants, utils } from "ethers";
import { getDeploymentName } from "../src";

export type AMBInfo = {
  hub: string;
  spoke: string;
};

export const OPTIMISM_AMB: AMBInfo = {
  hub: "0x5086d1eEF304eb5284A0f6720f79403b4e9bE294",
  spoke: "0x4200000000000000000000000000000000000007",
};

/**
 * Configuration scheme for Messaging contract deployments.
 */

// Contract prefixes for Connector contracts.
export const HUB_PREFIX = "Hub";
export const SPOKE_PREFIX = "Spoke";

const DEFAULT_PROCESS_GAS = BigNumber.from("850000");
const DEFAULT_RESERVE_GAS = BigNumber.from("15000");
const DEFAULT_DELAY_BLOCKS = 100;

export type RelayerConfig = {
  [chain: number]: {
    relayerFeeVault: string;
  };
};

export const RELAYER_CONFIGS: {
  local: RelayerConfig;
  testnet: RelayerConfig;
  mainnet: RelayerConfig;
} = {
  local: {
    1337: {
      relayerFeeVault: constants.AddressZero,
    },
    1338: {
      relayerFeeVault: constants.AddressZero,
    },
  },
  testnet: {
    5: {
      relayerFeeVault: "",
    },
  },
  mainnet: {
    1: {
      relayerFeeVault: "",
    },
  },
};

export type MessagingProtocolConfig = {
  // The chain ID of the hub. For production environment, should be Ethereum Mainnet (1).
  hub: number;
  configs: {
    // Map of chain ID => configs.
    [chain: number]: {
      prefix: string; // The chain's name and the Connector name prefix.
      // Official AMB contract addresses.
      networkName?: string;
      ambs: {
        hub: string;
        spoke: string;
      };
      processGas: BigNumber;
      reserveGas: BigNumber;
      delayBlocks: number;
      custom?: {
        hub?: { [key: string]: string | BigNumber };
        spoke?: { [key: string]: string | BigNumber };
      };
    };
  };
};

export const getFacetsToDeploy = (zksync: boolean) => [
  {
    // always include the loupe facet
    name: "_DefaultDiamondLoupeFacet",
    contract: "DiamondLoupeFacet",
    args: [],
    deterministic: !zksync,
  },
  { name: getDeploymentName("TokenFacet"), contract: "TokenFacet", args: [], deterministic: !zksync },
  { name: getDeploymentName("BridgeFacet"), contract: "BridgeFacet", args: [], deterministic: !zksync },
  { name: getDeploymentName("InboxFacet"), contract: "InboxFacet", args: [], deterministic: !zksync },
  {
    name: getDeploymentName("ProposedOwnableFacet"),
    contract: "ProposedOwnableFacet",
    args: [],
    deterministic: !zksync,
  },
  { name: getDeploymentName("PortalFacet"), contract: "PortalFacet", args: [], deterministic: !zksync },
  { name: getDeploymentName("RelayerFacet"), contract: "RelayerFacet", args: [], deterministic: !zksync },
  { name: getDeploymentName("RoutersFacet"), contract: "RoutersFacet", args: [], deterministic: !zksync },
  { name: getDeploymentName("StableSwapFacet"), contract: "StableSwapFacet", args: [], deterministic: !zksync },
  { name: getDeploymentName("SwapAdminFacet"), contract: "SwapAdminFacet", args: [], deterministic: !zksync },
  { name: getDeploymentName("DiamondCutFacet"), contract: "DiamondCutFacet", args: [], deterministic: !zksync },
  { name: getDeploymentName("DiamondInit"), contract: "DiamondInit", args: [], deterministic: !zksync },
];

export const MESSAGING_PROTOCOL_CONFIGS: Record<string, MessagingProtocolConfig> = {
  local: {
    hub: 31337,
    configs: {
      31337: {
        prefix: "AdminMainnet",
        networkName: "Mainnet",
        ambs: {
          hub: constants.AddressZero,
          spoke: constants.AddressZero,
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: 1,
      },
      31338: {
        prefix: "Admin",
        networkName: "Optimism",
        ambs: {
          hub: constants.AddressZero,
          spoke: constants.AddressZero,
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: 1,
      },
      31339: {
        prefix: "Admin",
        networkName: "Arbitrum",
        ambs: {
          hub: constants.AddressZero,
          spoke: constants.AddressZero,
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: 1,
      },
    },
  },
  devnet: {
    hub: 1,
    configs: {
      1: {
        prefix: "Admin",
        networkName: "Mainnet",
        ambs: {
          hub: constants.AddressZero,
          spoke: constants.AddressZero,
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: 1,
      },
      10: {
        prefix: "Admin",
        networkName: "Optimism",
        ambs: {
          hub: constants.AddressZero,
          spoke: constants.AddressZero,
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: 1,
      },
      100: {
        prefix: "Admin",
        networkName: "Gnosis",
        ambs: {
          hub: constants.AddressZero,
          spoke: constants.AddressZero,
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: 1,
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
        delayBlocks: DEFAULT_DELAY_BLOCKS,
        custom: {
          hub: {
            // https://goerli.etherscan.io/address/0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383#code
            optimismPortal: "0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383",
            gasCap: DEFAULT_PROCESS_GAS,
          },
          spoke: {
            gasCap: DEFAULT_PROCESS_GAS,
          },
        },
      },
      // Arbitrum nitro goerli testnet:
      // https://developer.offchainlabs.com/docs/Useful_Addresses
      421613: {
        prefix: "Arbitrum",
        ambs: {
          // https://goerli.etherscan.io/address/0x6BEbC4925716945D46F0Ec336D5C2564F419682C
          hub: "0x6BEbC4925716945D46F0Ec336D5C2564F419682C",
          // https://goerli-rollup-explorer.arbitrum.io/address/0x0000000000000000000000000000000000000064
          spoke: "0x0000000000000000000000000000000000000064",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: DEFAULT_DELAY_BLOCKS,
        custom: {
          hub: {
            // https://goerli.etherscan.io/address/0x45Af9Ed1D03703e480CE7d328fB684bb67DA5049
            outbox: "0x45Af9Ed1D03703e480CE7d328fB684bb67DA5049",
            maxSubmissionCostCap: utils.parseUnits("100000", "gwei"),
            maxGasCap: DEFAULT_PROCESS_GAS,
            gasPriceCap: utils.parseUnits("20", "gwei"), // minimum on arbitrum is 0.01 gwei
          },
        },
      },
      80001: {
        prefix: "Polygon",
        ambs: {
          // FxRoot on goerli
          // https://goerli.etherscan.io/address/0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA
          hub: "0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA",
          // FxChild on mumbai
          // https://mumbai.polygonscan.com/address/0xCf73231F28B7331BBe3124B907840A94851f9f11
          spoke: "0xCf73231F28B7331BBe3124B907840A94851f9f11",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: DEFAULT_DELAY_BLOCKS,
        custom: {
          hub: {
            // https://goerli.etherscan.io/address/0x2890ba17efe978480615e330ecb65333b880928e
            checkpointManager: "0x2890bA17EfE978480615e330ecB65333b880928e",
          },
        },
      },
      280: {
        prefix: "ZkSync",
        ambs: {
          // zkSync Diamond on goerli
          // https://goerli.etherscan.io/address/0x1908e2bf4a88f91e4ef0dc72f02b8ea36bea2319
          hub: "0x1908e2BF4a88F91E4eF0DC72f02b8Ea36BEa2319",
          // zkSync on testnet
          // https://goerli.explorer.zksync.io/address/0x0000000000000000000000000000000000008008
          // https://github.com/matter-labs/era-system-contracts/blob/5a6c728576de5db68ad577a09f34e7b85c374192/contracts/Constants.sol#L40
          spoke: "0x0000000000000000000000000000000000008008",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: DEFAULT_DELAY_BLOCKS,
        custom: {
          hub: {
            gasCap: DEFAULT_PROCESS_GAS,
          },
        },
      },
      59140: {
        prefix: "Linea",
        ambs: {
          // ZkEvmV202 on goerli
          // https://goerli.etherscan.io/address/0x70BaD09280FD342D02fe64119779BC1f0791BAC2
          hub: "0x70BaD09280FD342D02fe64119779BC1f0791BAC2",
          // L2Bridge on zkEvm
          // https://explorer.goerli.linea.build/address/0xC499a572640B64eA1C8c194c43Bc3E19940719dC/transactions#address-tabs
          spoke: "0xC499a572640B64eA1C8c194c43Bc3E19940719dC",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: DEFAULT_DELAY_BLOCKS,
      },
      // 97: {
      //   prefix: "Multichain",
      //   networkName: "Chapel",
      //   ambs: {
      //     // AnyCallV6Proxy on goerli
      //     // https://goerli.etherscan.io/address/0x3D4e1981f822e87A1A4C05F2e4b3bcAdE5406AE3
      //     hub: "0x3D4e1981f822e87A1A4C05F2e4b3bcAdE5406AE3",
      //     // AnyCallV6Proxy on chapel/bsc testnet
      //     // https://testnet.bscscan.com/address/0xD2b88BA56891d43fB7c108F23FE6f92FEbD32045
      //     spoke: "0xD2b88BA56891d43fB7c108F23FE6f92FEbD32045",
      //   },
      //   processGas: DEFAULT_PROCESS_GAS,
      //   reserveGas: DEFAULT_RESERVE_GAS,
      //   delayBlocks: DEFAULT_DELAY_BLOCKS,
      //   custom: {
      //     hub: {
      //       mirrorChainId: "97",
      //       gasCap: "20000000000000000", // calcSrcFee: 10000320000000000
      //     },
      //     spoke: {
      //       mirrorChainId: "5",
      //       gasCap: "20000000000000000", // calcSrcFee: 10000320000000000
      //     },
      //   },
      // },
      1442: {
        prefix: "PolygonZk",
        ambs: {
          // PolygonZkEVMBridge on goerli
          // https://goerli.etherscan.io/address/0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7
          hub: "0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7",
          // PolygonZkEVMBridge on polygon-zkevm
          // https://testnet-zkevm.polygonscan.com/address/0xf6beeebb578e214ca9e23b0e9683454ff88ed2a7
          spoke: "0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: DEFAULT_DELAY_BLOCKS,
        custom: {
          hub: {
            mirrorNetworkId: "1",
          },
          spoke: {
            mirrorNetworkId: "0",
          },
        },
      },
      5: {
        prefix: "Mainnet",
        ambs: {
          hub: constants.AddressZero,
          spoke: constants.AddressZero,
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: DEFAULT_DELAY_BLOCKS,
      },
    },
  },
  mainnet: {
    hub: 1,
    configs: {
      1: {
        prefix: "Mainnet",
        ambs: {
          hub: constants.AddressZero,
          spoke: constants.AddressZero,
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: DEFAULT_DELAY_BLOCKS,
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
        delayBlocks: DEFAULT_DELAY_BLOCKS,
        custom: {
          hub: {
            // https://etherscan.io/address/0xbEb5Fc579115071764c7423A4f12eDde41f106Ed#code
            optimismPortal: "0xbEb5Fc579115071764c7423A4f12eDde41f106Ed",
            gasCap: DEFAULT_PROCESS_GAS,
          },
          spoke: {
            gasCap: DEFAULT_PROCESS_GAS,
          },
        },
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
        delayBlocks: DEFAULT_DELAY_BLOCKS,
        custom: {
          hub: {
            gasCap: "4000000", // maxGasPerTx
            mirrorChainId: "100",
          },
          spoke: {
            gasCap: "2000000", // maxGasPerTx
            mirrorChainId: "1",
          },
        },
      },
      // Polygon
      137: {
        prefix: "Polygon",
        ambs: {
          // FxRoot on mainnet
          // https://static.matic.network/network/mainnet/v1/index.json
          hub: "0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2",
          spoke: "0x8397259c983751DAf40400790063935a11afa28a",
        },
        delayBlocks: DEFAULT_DELAY_BLOCKS,
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        custom: {
          hub: {
            // https://static.matic.network/network/mainnet/v1/index.json
            // RootChainProxy
            checkpointManager: "0x86E4Dc95c7FBdBf52e33D563BbDB00823894C287",
          },
        },
      },
      // Arbitrum one
      // https://developer.offchainlabs.com/docs/Useful_Addresses
      42161: {
        prefix: "Arbitrum",
        ambs: {
          // https://etherscan.io/address/0x4Dbd4fc535Ac27206064B68FfCf827b0A60BAB3f
          hub: "0x4Dbd4fc535Ac27206064B68FfCf827b0A60BAB3f",
          // https://arbiscan.io/address/0x0000000000000000000000000000000000000064
          spoke: "0x0000000000000000000000000000000000000064",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: DEFAULT_DELAY_BLOCKS,
        custom: {
          hub: {
            // https://etherscan.io/address/0x0B9857ae2D4A3DBe74ffE1d7DF045bb7F96E4840
            outbox: "0x0B9857ae2D4A3DBe74ffE1d7DF045bb7F96E4840",
            maxSubmissionCostCap: utils.parseUnits("100000", "gwei"),
            maxGasCap: DEFAULT_PROCESS_GAS,
            gasPriceCap: utils.parseUnits("20", "gwei"), // minimum on arbitrum is 0.01 gwei
          },
        },
      },
      // BNB Chain
      56: {
        prefix: "Wormhole",
        networkName: "Bnb",
        ambs: {
          // Wormhole Relayer address on Mainnet
          // https://etherscan.io/address/0x27428DD2d3DD32A4D7f7C497eAaa23130d894911
          hub: "0x27428DD2d3DD32A4D7f7C497eAaa23130d894911",
          // Wormhole Relayer on BNB Chain
          // https://bscscan.com/address/0x27428DD2d3DD32A4D7f7C497eAaa23130d894911
          spoke: "0x27428DD2d3DD32A4D7f7C497eAaa23130d894911",
        },
        delayBlocks: DEFAULT_DELAY_BLOCKS,
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        custom: {
          hub: {
            gasCap: "300000", // gas limit for receiveWormholeMessages on bnb
            mirrorChainId: "4", // bsc wormhole chainId: 4
          },
          spoke: {
            gasCap: "400000", // gas limit for receiveWormholeMessages on mainnet
            mirrorChainId: "2", // mainnet wormhole chainid: 2
          },
        },
      },
      // Linea chain
      59144: {
        prefix: "Linea",
        ambs: {
          // https://etherscan.io/address/0xd19d4B5d358258f05D7B411E21A1460D11B0876F
          hub: "0xd19d4B5d358258f05D7B411E21A1460D11B0876F",
          // https://lineascan.build/address/0x508Ca82Df566dCD1B0DE8296e70a96332cD644ec
          spoke: "0x508Ca82Df566dCD1B0DE8296e70a96332cD644ec",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: DEFAULT_DELAY_BLOCKS,
      },
    },
  },
};
