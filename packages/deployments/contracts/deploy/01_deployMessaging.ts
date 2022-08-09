import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { BigNumber, constants, Wallet } from "ethers";

import { chainIdToDomain } from "../src";

// TODO: Should be made a step in the deployment process.
// Should replace the nomad steps.

// The chain ID of the hub. For production environment, should be Ethereum Mainet.
const HUB_CHAIN_ID = 1;
// Contract prefixes for Connector contracts.
const HUB_PREFIX = "L1";
const SPOKE_PREFIX = "L2";
// Map of chain ID => config for all spoke chains.
const CHAIN_TO_CONFIG: {
  [chain: number]: {
    prefix: string; // The chain's name and the Connector name prefix.
    amb: string; // Official AMB contract address.
    processGas: BigNumber;
    reserveGas: BigNumber;
  };
} = {
  // NOTE: Eth mainnet (chain ID = 1) intentionally not included here.
  10: {
    prefix: "Optimism",
    amb: "",
    processGas: BigNumber.from("200_000"),
    reserveGas: BigNumber.from("200_000"),
  },
  100: {
    prefix: "Gnosis",
    amb: "",
    processGas: BigNumber.from("2_000_000"),
    reserveGas: BigNumber.from("200_000"),
  },
};

// Format the arguments for Connector contract constructor.
const formatConnectorArgs = (args: {
  deploymentChainId: number;
  mirrorChainId: number;
  rootManager: string;
  bridgeRouter: string;
}): any[] => {
  const { deploymentChainId, mirrorChainId, rootManager, bridgeRouter } = args;
  const config = CHAIN_TO_CONFIG[deploymentChainId];

  const deploymentDomain = BigNumber.from(chainIdToDomain(deploymentChainId).toString());
  const mirrorDomain = BigNumber.from(chainIdToDomain(mirrorChainId).toString());
  return [
    deploymentDomain,
    config.amb,
    rootManager,
    bridgeRouter,
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
  bridgeRouter: string,
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
  for (const mirrorChain of Object.keys(CHAIN_TO_CONFIG)) {
    const mirrorChainId = +mirrorChain;
    const prefix = CHAIN_TO_CONFIG[mirrorChainId].prefix + HUB_PREFIX;
    const contract = `${prefix}Connector`;
    console.log(`Deploying ${contract}...`);
    const deployment = await hre.deployments.deploy(contract, {
      contract,
      from: deployer.address,
      args: formatConnectorArgs({
        deploymentChainId: HUB_CHAIN_ID,
        mirrorChainId,
        rootManager: rootManager.address,
        bridgeRouter,
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
  deploymentChainId: number,
  bridgeRouter: string,
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

  const prefix = CHAIN_TO_CONFIG[deploymentChainId].prefix + SPOKE_PREFIX;
  const contract = `${prefix}Connector`;
  console.log(`Deploying ${contract}...`);
  const deployment = await hre.deployments.deploy(contract, {
    contract,
    from: deployer.address,
    args: formatConnectorArgs({
      deploymentChainId,
      mirrorChainId: HUB_CHAIN_ID,
      rootManager: rootManager.address,
      bridgeRouter,
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

  // TODO: Deploy BridgeRouter.

  // Handle deployment for RootManager and Connector(s).
  if (chain === HUB_CHAIN_ID.toString()) {
    await handleDeployMainnet(hre, deployer, bridgeRouter.address);
  } else {
    if (!Object.keys(CHAIN_TO_CONFIG).includes(chain)) {
      throw new Error("Invalid chain for deployment!");
    }
    await handleDeploySpoke(hre, deployer, +chain, bridgeRouter.address);
  }
};

export default func;

func.tags = ["Messaging", "prod", "local", "mainnet"];
func.dependencies = [];
