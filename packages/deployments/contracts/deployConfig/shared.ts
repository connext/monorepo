import { BigNumber, constants, utils } from "ethers";
import { getDeploymentName } from "../src";

export type AMBInfo = {
  hub: string;
  spoke: string;
};

/**
 * Configuration scheme for Messaging contract deployments.
 */

// Contract prefixes for Connector contracts.
export const HUB_PREFIX = "Hub";
export const SPOKE_PREFIX = "Spoke";

const DEFAULT_PROCESS_GAS = BigNumber.from("850000");
const DEFAULT_RESERVE_GAS = BigNumber.from("15000");

const ZKSYNC_DEFAULT_PROCESS_GAS = BigNumber.from("20000000000000000");

// mapping of chainId => rough blocks per minute
const BLOCKS_PER_MINUTE: Record<number, number> = {
  // mainnets
  1: 4, // mainnet
  10: 30, // optimism
  56: 30, // bsc
  100: 30, // gnosis
  137: 30, // polygon
  42161: 4, // arbitrum one
  59144: 30, // linea
  8453: 30, // base
  1088: 30, // metis
  43114: 20, //avalanche
  1101: 8, //polygon-zkevm
  324: 10, // zksync-era
  5000: 200, // mantle network
  34443: 30, // mode network

  // testnets
  5: 4, // goerli
  420: 30, // optimism-goerli
  80001: 30, // mumbai
  59140: 30, // linea-goerli
  84531: 30, // base-goerli
  195: 60, // x1-testnet
};

const THIRTY_MINUTES_IN_BLOCKS = Object.fromEntries(
  Object.entries(BLOCKS_PER_MINUTE).map(([key, value]) => {
    return [key, value * 30];
  }),
);

export type MessagingProtocolConfig = {
  // The chain ID of the hub. For production environment, should be Ethereum Mainnet (1).
  hub: {
    chain: number;
    minDisputeBlocks: number;
    disputeBlocks: number;
  };
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
      disputeBlocks: number;
      minDisputeBlocks: number;
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
    hub: {
      chain: 1337,
      disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[1337],
      minDisputeBlocks: 0,
    },
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
        delayBlocks: THIRTY_MINUTES_IN_BLOCKS[1337],
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[1337],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[1337] / 2,
      },
      31338: {
        prefix: "Admin",
        networkName: "Optimism",
        ambs: {
          hub: "0x5086d1eEF304eb5284A0f6720f79403b4e9bE294",
          spoke: "0x4200000000000000000000000000000000000007",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: THIRTY_MINUTES_IN_BLOCKS[1338],
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[1338],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[1338] / 2,
        custom: {
          hub: {
            // https://goerli.etherscan.io/address/0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383#code
            optimismPortal: "0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383",
          },
        },
      },
    },
  },
  devnet: {
    hub: {
      chain: 1,
      disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[1],
      minDisputeBlocks: 0,
    },
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
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[1],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[1] / 2,
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
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[10],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[10] / 2,
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
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[100],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[100] / 2,
      },
    },
  },
  testnet: {
    hub: {
      chain: 5,
      minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[5] / 2, // for root manager
      disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[5], // for root manager
    }, // Goerli hub.
    configs: {
      // Optimism goerli:
      // https://community.optimism.io/docs/useful-tools/networks/#op-goerli
      420: {
        prefix: "Optimism",
        ambs: {
          // L1CrossDomainMessenger
          // https://goerli.etherscan.io/address/0x5086d1eEF304eb5284A0f6720f79403b4e9bE294
          hub: "0x5086d1eEF304eb5284A0f6720f79403b4e9bE294", // L1 cross domain messenger
          spoke: "0x4200000000000000000000000000000000000007",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: THIRTY_MINUTES_IN_BLOCKS[420],
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[420],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[420] / 2,
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
        delayBlocks: THIRTY_MINUTES_IN_BLOCKS[80001],
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[80001],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[80001] / 2,
        custom: {
          hub: {
            // https://goerli.etherscan.io/address/0x2890ba17efe978480615e330ecb65333b880928e
            checkpointManager: "0x2890bA17EfE978480615e330ecB65333b880928e",
          },
        },
      },
      // FIXME: not added in op-roots, sepolia?
      // 280: {
      //   prefix: "ZkSync",
      //   ambs: {
      //     // zkSync Diamond on goerli
      //     // https://goerli.etherscan.io/address/0x1908e2bf4a88f91e4ef0dc72f02b8ea36bea2319
      //     hub: "0x1908e2BF4a88F91E4eF0DC72f02b8Ea36BEa2319",
      //     // zkSync on testnet
      //     // https://goerli.explorer.zksync.io/address/0x0000000000000000000000000000000000008008
      //     // https://github.com/matter-labs/era-system-contracts/blob/5a6c728576de5db68ad577a09f34e7b85c374192/contracts/Constants.sol#L40
      //     spoke: "0x0000000000000000000000000000000000008008",
      //   },
      //   processGas: DEFAULT_PROCESS_GAS,
      //   reserveGas: DEFAULT_RESERVE_GAS,
      //   delayBlocks: THIRTY_MINUTES_IN_BLOCKS[280],
      //   disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[280],
      //   minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[280] / 2,
      //   custom: {
      //     hub: {
      //       gasCap: DEFAULT_PROCESS_GAS,
      //     },
      //   },
      // },
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
        delayBlocks: THIRTY_MINUTES_IN_BLOCKS[59140],
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[59140],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[59140] / 2,
      },
      // Base goerli:
      // https://community.optimism.io/docs/useful-tools/networks/#op-goerli
      84531: {
        prefix: "Optimism",
        networkName: "Base",
        ambs: {
          // L1CrossDomainMessenger
          // https://goerli.etherscan.io/address/0x8e5693140eA606bcEB98761d9beB1BC87383706D
          hub: "0x8e5693140eA606bcEB98761d9beB1BC87383706D", // L1 cross domain messenger
          spoke: "0x4200000000000000000000000000000000000007",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: THIRTY_MINUTES_IN_BLOCKS[84531],
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[84531],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[84531] / 2,
        custom: {
          hub: {
            // https://goerli.etherscan.io/address/0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA#code
            optimismPortal: "0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA",
            gasCap: DEFAULT_PROCESS_GAS,
          },
          spoke: {
            gasCap: DEFAULT_PROCESS_GAS,
          },
        },
      },
      195: {
        prefix: "Admin",
        networkName: "X1",
        ambs: {
          hub: constants.AddressZero,
          spoke: constants.AddressZero,
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: THIRTY_MINUTES_IN_BLOCKS[195],
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[195],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[195] / 2,
      },
      // // FIXME: wormhole relayer deployment not listed in docs for goerli
      // // address used is core bridge; different from mainnet so this testnet is skipped
      // 97: {
      //   prefix: "Wormhole",
      //   networkName: "Chapel",
      //   ambs: {
      //     // Wormhole Core bridge
      //     hub: "0x706abc4E45D419950511e474C7B9Ed348A4a716c",
      //     // Wormhole Relayer on BNB Chapel Chain
      //     spoke: "0x80aC94316391752A193C1c47E27D382b507c93F3",
      //   },
      //   delayBlocks: DEFAULT_DELAY_BLOCKS,
      // disputeBlocks: DEFAULT_DISPUTE_BLOCKS,
      // minDisputeBlocks: DEFAULT_DISPUTE_BLOCKS / 2,
      //   processGas: DEFAULT_PROCESS_GAS,
      //   reserveGas: DEFAULT_RESERVE_GAS,
      //   custom: {
      //     hub: {
      //       gasCap: "300000", // gas limit for receiveWormholeMessages on bnb
      //       mirrorChainId: "4", // bsc wormhole chainId: 4
      //     },
      //     spoke: {
      //       gasCap: "400000", // gas limit for receiveWormholeMessages on mainnet
      //       mirrorChainId: "2", // mainnet wormhole chainid: 2
      //     },
      //   },
      // },
      // FIXME: not added in op-roots, sepolia?
      // 1442: {
      //   prefix: "PolygonZk",
      //   ambs: {
      //     // PolygonZkEVMBridge on goerli
      //     // https://goerli.etherscan.io/address/0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7
      //     hub: "0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7",
      //     // PolygonZkEVMBridge on polygon-zkevm
      //     // https://testnet-zkevm.polygonscan.com/address/0xf6beeebb578e214ca9e23b0e9683454ff88ed2a7
      //     spoke: "0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7",
      //   },
      //   processGas: DEFAULT_PROCESS_GAS,
      //   reserveGas: DEFAULT_RESERVE_GAS,
      //   delayBlocks: THIRTY_MINUTES_IN_BLOCKS[1442],
      //   disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[1442],
      //   minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[1442] / 2,
      //   custom: {
      //     hub: {
      //       mirrorNetworkId: "1",
      //     },
      //     spoke: {
      //       mirrorNetworkId: "0",
      //     },
      //   },
      // },
      5: {
        prefix: "Mainnet",
        ambs: {
          hub: constants.AddressZero,
          spoke: constants.AddressZero,
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: THIRTY_MINUTES_IN_BLOCKS[5],
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[5],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[5] / 2,
      },
    },
  },
  mainnet: {
    hub: { chain: 1, minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[1] / 2, disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[1] },
    configs: {
      1: {
        prefix: "Mainnet",
        ambs: {
          hub: constants.AddressZero,
          spoke: constants.AddressZero,
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: THIRTY_MINUTES_IN_BLOCKS[1],
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[1],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[1] / 2,
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
        delayBlocks: THIRTY_MINUTES_IN_BLOCKS[10],
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[10],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[10] / 2,
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
        delayBlocks: THIRTY_MINUTES_IN_BLOCKS[100],
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[100],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[100] / 2,
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
        delayBlocks: THIRTY_MINUTES_IN_BLOCKS[137],
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[137],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[137] / 2,
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
        delayBlocks: THIRTY_MINUTES_IN_BLOCKS[42161],
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[42161],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[42161] / 2,
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
        delayBlocks: THIRTY_MINUTES_IN_BLOCKS[56],
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[56],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[56] / 2,
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
        delayBlocks: THIRTY_MINUTES_IN_BLOCKS[59144],
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[59144],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[59144] / 2,
      },
      1088: {
        prefix: "OptimismV0",
        networkName: "Metis",
        ambs: {
          // L1CrossDomainMessenger
          // https://github.com/MetisProtocol/mvm/blob/develop/packages/contracts/deployments/andromeda/Proxy__OVM_L1CrossDomainMessenger.json
          hub: "0x081D1101855bD523bA69A9794e0217F0DB6323ff",
          // L2CrossDomainMessenger
          // https://github.com/MetisProtocol/mvm/blob/cd9a23984c49d54945a9b9b7bad032d3e53ee105/packages/contracts/src/predeploys.ts#L14
          spoke: "0x4200000000000000000000000000000000000007",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: THIRTY_MINUTES_IN_BLOCKS[1088],
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[1088],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[1088] / 2,
        custom: {
          hub: {
            // https://immunefi.com/bounty/metis/
            // https://etherscan.io/address/0xf209815E595Cdf3ed0aAF9665b1772e608AB9380
            stateCommitmentChain: "0xf209815E595Cdf3ed0aAF9665b1772e608AB9380",
            gasCap: DEFAULT_PROCESS_GAS,
          },
          spoke: {
            gasCap: DEFAULT_PROCESS_GAS,
          },
        },
      },
      5000: {
        prefix: "Mantle",
        ambs: {
          // L1CrossDomainMessenger
          // https://github.com/mantlenetworkio/mantle/blob/main/packages/contracts/deployments/mainnet/Proxy__BVM_L1CrossDomainMessenger.json
          hub: "0x676A795fe6E43C17c668de16730c3F690FEB7120",
          // L2CrossDomainMessenger
          // https://github.com/mantlenetworkio/mantle/blob/5cda5f811f73d9f331e6168617f87d3e19e6db6b/packages/contracts/src/predeploys.ts#L12
          spoke: "0x4200000000000000000000000000000000000007",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: THIRTY_MINUTES_IN_BLOCKS[5000],
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[5000],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[5000] / 2,
        custom: {
          hub: {
            // https://github.com/mantlenetworkio/mantle/blob/main/packages/contracts/deployments/mainnet/StateCommitmentChain.json
            stateCommitmentChain: "0x89E9D387555AF0cDE22cb98833Bae40d640AD7fa",
            gasCap: DEFAULT_PROCESS_GAS,
          },
          spoke: {
            gasCap: DEFAULT_PROCESS_GAS,
          },
        },
      },
      // Base chain
      8453: {
        prefix: "Optimism",
        networkName: "Base",
        ambs: {
          // L1CrossDomainMessenger
          // https://docs.base.org/base-contracts/#ethereum-mainnet
          hub: "0x866E82a600A1414e583f7F13623F1aC5d58b0Afa",
          // L2CrossDomainMessenger
          // https://docs.base.org/base-contracts/#base-mainnet
          spoke: "0x4200000000000000000000000000000000000007",
        },
        processGas: BigNumber.from("2000000"),
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: THIRTY_MINUTES_IN_BLOCKS[8453],
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[8453],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[8453] / 2,
        custom: {
          hub: {
            // BasePortal
            // https://docs.base.org/base-contracts/#ethereum-mainnet
            // https://etherscan.io/address/0x49048044D57e1C92A77f79988d21Fa8fAF74E97e#code
            optimismPortal: "0x49048044D57e1C92A77f79988d21Fa8fAF74E97e",
            gasCap: DEFAULT_PROCESS_GAS,
          },
          spoke: {
            gasCap: DEFAULT_PROCESS_GAS,
          },
        },
      },
      // Avalanche C Chain
      43114: {
        prefix: "Wormhole",
        networkName: "Avalanche",
        ambs: {
          // Wormhole Relayer address on Mainnet
          // https://etherscan.io/address/0x27428DD2d3DD32A4D7f7C497eAaa23130d894911
          hub: "0x27428DD2d3DD32A4D7f7C497eAaa23130d894911",
          // Wormhole Relayer on Avalanche Chain
          // https://43114.snowtrace.io/address/0x27428DD2d3DD32A4D7f7C497eAaa23130d894911
          spoke: "0x27428DD2d3DD32A4D7f7C497eAaa23130d894911",
        },
        delayBlocks: THIRTY_MINUTES_IN_BLOCKS[43114],
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[43114],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[43114] / 2,
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        custom: {
          hub: {
            gasCap: "300000", // gas limit for receiveWormholeMessages on avalanche
            mirrorChainId: "6", // avalanche wormhole chainId: 6
          },
          spoke: {
            gasCap: "400000", // gas limit for receiveWormholeMessages on mainnet
            mirrorChainId: "2", // mainnet wormhole chainid: 2
          },
        },
      },
      1101: {
        prefix: "PolygonZk",
        ambs: {
          // PolygonZkEVMBridge on mainnet
          // https://etherscan.io/address/0x2a3DD3EB832aF982ec71669E178424b10Dca2EDe
          hub: "0x2a3DD3EB832aF982ec71669E178424b10Dca2EDe",
          // PolygonZkEVMBridge on polygon-zkevm
          // https://zkevm.polygonscan.com/address/0x2a3dd3eb832af982ec71669e178424b10dca2ede
          spoke: "0x2a3DD3EB832aF982ec71669E178424b10Dca2EDe",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: THIRTY_MINUTES_IN_BLOCKS[1101],
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[1101],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[1101] / 2,
        custom: {
          hub: {
            mirrorNetworkId: "1",
          },
          spoke: {
            mirrorNetworkId: "0",
          },
        },
      },
      324: {
        prefix: "ZkSync",
        ambs: {
          // zkSync Diamond on mainnet
          // https://etherscan.io/address/0x32400084c286cf3e17e7b677ea9583e60a000324
          hub: "0x32400084c286cf3e17e7b677ea9583e60a000324",
          // zkSync on era mainnet
          // https://era.zksync.network/address/0x0000000000000000000000000000000000008008
          // https://github.com/matter-labs/era-system-contracts/blob/5a6c728576de5db68ad577a09f34e7b85c374192/contracts/Constants.sol#L40
          spoke: "0x0000000000000000000000000000000000008008",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: THIRTY_MINUTES_IN_BLOCKS[324],
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[324],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[324] / 2,
        custom: {
          hub: {
            gasCap: ZKSYNC_DEFAULT_PROCESS_GAS,
          },
        },
      },
      // Mode chain
      34443: {
        prefix: "Optimism",
        networkName: "Mode",
        ambs: {
          // L1CrossDomainMessenger
          // https://github.com/mode-network/chain-deployments/blob/main/mainnet/addresses.json
          hub: "0x95bDCA6c8EdEB69C98Bd5bd17660BaCef1298A6f",
          // L2CrossDomainMessenger
          spoke: "0x4200000000000000000000000000000000000007",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
        delayBlocks: THIRTY_MINUTES_IN_BLOCKS[34443],
        disputeBlocks: THIRTY_MINUTES_IN_BLOCKS[34443],
        minDisputeBlocks: THIRTY_MINUTES_IN_BLOCKS[34443] / 2,
        custom: {
          hub: {
            // OptimismPortal
            // https://docs.mode.network/mode-mainnet/mainnet-contract-addresses/l1-l2-contracts
            // https://etherscan.io/address/0x8B34b14c7c7123459Cf3076b8Cb929BE097d0C07#code
            optimismPortal: "0x8B34b14c7c7123459Cf3076b8Cb929BE097d0C07",
            gasCap: DEFAULT_PROCESS_GAS,
          },
          spoke: {
            gasCap: DEFAULT_PROCESS_GAS,
          },
        },
      },
    },
  },
};
