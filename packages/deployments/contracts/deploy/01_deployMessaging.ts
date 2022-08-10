import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { BigNumber, constants, Wallet } from "ethers";

import { chainIdToDomain, mustGetEnv } from "../src";

// TODO: Should be made a step in the deployment process.
// Should replace the nomad steps.

const DEFAULT_PROCESS_GAS = BigNumber.from("200000");
const DEFAULT_RESERVE_GAS = BigNumber.from("100000");

// Contract prefixes for Connector contracts.
const HUB_PREFIX = "L1";
const SPOKE_PREFIX = "L2";

type RouterAddresses = {
  bridgeRouter: string;
  // promiseRouter: string;
  // relayerFeeRouter: string;
};

type ProtocolConfig = {
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

const PROTOCOL_CONFIGS: {
  local: ProtocolConfig;
  testnet: ProtocolConfig;
  mainnet: ProtocolConfig;
} = {
  local: {
    hub: 1337,
    configs: {
      // TODO: Configs for 1337, 1338
    },
  },
  testnet: {
    hub: 4,
    configs: {
      // TODO: Configs for rinkeby, goerli, ropsten, etc.
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
          hub: "",
          spoke: "",
        },
        // TODO: 2mil gas for opti (going L1 => L2)? Is that correct?
        processGas: BigNumber.from("2000000"),
        reserveGas: DEFAULT_RESERVE_GAS,
      },
      100: {
        prefix: "Gnosis",
        ambs: {
          hub: "0x4C36d2919e407f0Cc2Ee3c993ccF8ac26d9CE64e",
          spoke: "0x75Df5AF045d91108662D8080fD1FEFAd6aA0bb59",
        },
        processGas: DEFAULT_PROCESS_GAS,
        reserveGas: DEFAULT_RESERVE_GAS,
      },
    },
  },
};

// Format the arguments for Connector contract constructor.
const formatConnectorArgs = (
  protocol: ProtocolConfig,
  args: {
    deploymentChainId: number;
    mirrorChainId: number;
    rootManager: string;
    routers: RouterAddresses;
  },
): any[] => {
  const { deploymentChainId, mirrorChainId, rootManager, routers } = args;
  const config = protocol.configs[deploymentChainId];

  const isHub = deploymentChainId === protocol.hub;

  const deploymentDomain = BigNumber.from(chainIdToDomain(deploymentChainId).toString());
  const mirrorDomain = BigNumber.from(chainIdToDomain(mirrorChainId).toString());
  return [
    deploymentDomain,
    isHub ? config.ambs.hub : config.ambs.spoke,
    rootManager,
    routers.bridgeRouter,
    config.processGas,
    config.reserveGas,
    // Mirror domain should be known.
    mirrorDomain,
    // Mirror contract address should be configured separately, after deployment.
    constants.AddressZero,
  ];
};

// Deploy messaging contracts unique to Eth mainnet, including hub connectors.
const handleDeployMainnet = async (
  hre: HardhatRuntimeEnvironment,
  deployer: Wallet,
  protocol: ProtocolConfig,
  routers: RouterAddresses,
): Promise<void> => {
  // Deploy RootManager.
  console.log("Deploying RootManager...");
  const rootManager = await hre.deployments.deploy("RootManager", {
    contract: "RootManager",
    from: deployer.address,
    args: [],
    skipIfAlreadyDeployed: true,
    log: true,
  });
  console.log(`RootManager deployed to ${rootManager.address}`);
  // TODO: Deploy EthMainnetConnector.

  // Loop through every HubConnector and deploy.
  const { configs } = protocol;
  for (const mirrorChain of Object.keys(configs)) {
    const mirrorChainId = +mirrorChain;
    const prefix = configs[mirrorChainId].prefix + HUB_PREFIX;
    const contract = `${prefix}Connector`;
    console.log(`Deploying ${contract}...`);
    const deployment = await hre.deployments.deploy(contract, {
      contract,
      from: deployer.address,
      args: formatConnectorArgs(protocol, {
        deploymentChainId: protocol.hub,
        mirrorChainId,
        rootManager: rootManager.address,
        routers,
      }),
      skipIfAlreadyDeployed: true,
      log: true,
    });
    console.log(`${contract} deployed to ${deployment.address}`);
  }
};

const handleDeploySpoke = async (
  hre: HardhatRuntimeEnvironment,
  deployer: Wallet,
  protocol: ProtocolConfig,
  deploymentChainId: number,
  routers: RouterAddresses,
): Promise<void> => {
  // Deploy RootManager.
  console.log("Deploying RootManager...");
  const rootManager = await hre.deployments.deploy("RootManager", {
    contract: "RootManager",
    from: deployer.address,
    args: [],
    skipIfAlreadyDeployed: true,
    log: true,
  });
  console.log(`RootManager deployed to ${rootManager.address}`);

  // Deploy the Connector contract for this Spoke chain.
  const { configs } = protocol;
  const prefix = configs[deploymentChainId].prefix + SPOKE_PREFIX;
  const contract = `${prefix}Connector`;
  console.log(`Deploying ${contract}...`);
  const deployment = await hre.deployments.deploy(contract, {
    contract,
    from: deployer.address,
    args: formatConnectorArgs(protocol, {
      deploymentChainId,
      mirrorChainId: protocol.hub,
      rootManager: rootManager.address,
      routers,
    }),
    skipIfAlreadyDeployed: true,
    log: true,
  });
  console.log(`${contract} deployed to ${deployment.address}`);
};

/**
 * Hardhat task for deploying the AMB Messaging contracts.
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  const chain = await hre.getChainId();

  let _deployer: any;
  ({ deployer: _deployer } = await hre.ethers.getNamedSigners());
  if (!_deployer) {
    [_deployer] = await hre.ethers.getUnnamedSigners();
  }
  const deployer = _deployer as Wallet;
  console.log("\n============================= Deploying Messaging Contracts ===============================");
  console.log("deployer: ", deployer.address);

  const env = mustGetEnv();
  const network = env === "production" ? "mainnet" : env === "staging" ? "testnet" : "local";
  const protocol = PROTOCOL_CONFIGS[network];

  if (!protocol.configs[protocol.hub]) {
    throw new Error(`Network ${network} is not supported!`);
  }

  // Deploy BridgeRouter.
  console.log("Deploying BridgeRouter...");
  const bridgeRouter = await hre.deployments.deploy("BridgeRouter", {
    contract: "BridgeRouter",
    from: deployer.address,
    args: [],
    skipIfAlreadyDeployed: true,
    log: true,
  });
  console.log(`BridgeRouter deployed to ${bridgeRouter.address}`);

  // Handle deployment for RootManager and Connector(s).
  if (chain === protocol.toString()) {
    await handleDeployMainnet(hre, deployer, protocol, {
      bridgeRouter: bridgeRouter.address,
    });
  } else {
    if (!Object.keys(protocol.configs).includes(chain)) {
      throw new Error(`Invalid chain (${chain}) for deployment!`);
    }
    await handleDeploySpoke(hre, deployer, protocol, +chain, {
      bridgeRouter: bridgeRouter.address,
    });
  }
};

export default func;

func.tags = ["Messaging", "prod", "local", "mainnet"];
func.dependencies = [];
