import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction, DeployResult } from "hardhat-deploy/types";
import { BigNumber, constants, Wallet } from "ethers";

import { chainIdToDomain, getConnectorName, getDeploymentName, getProtocolNetwork, deployBeaconProxy } from "../src";
import { MessagingProtocolConfig, MESSAGING_PROTOCOL_CONFIGS } from "../deployConfig/shared";

// Format the arguments for Connector contract constructor.
const formatConnectorArgs = (
  protocol: MessagingProtocolConfig,
  args: {
    connectorChainId: number;
    deploymentChainId: number;
    mirrorChainId: number;
    rootManager: string;
    mirrorConnector?: string;
    merkleManager?: string;
    watcherManager?: string;
    amb?: string;
  },
): any[] => {
  const {
    deploymentChainId,
    mirrorChainId,
    rootManager,
    mirrorConnector,
    connectorChainId,
    merkleManager,
    watcherManager,
  } = args;
  const config = protocol.configs[connectorChainId];
  console.log(`using config`, config);

  const isHub = deploymentChainId === protocol.hub && connectorChainId != protocol.hub;

  const deploymentDomain = BigNumber.from(chainIdToDomain(deploymentChainId).toString());
  const mirrorDomain = BigNumber.from(chainIdToDomain(mirrorChainId).toString());

  const amb = args.amb ?? isHub ? config.ambs.hub : config.ambs.spoke;

  const hubArgs = [
    deploymentDomain,
    // Mirror domain should be known.
    mirrorDomain,
    amb,
    rootManager,
    mirrorConnector ?? constants.AddressZero,
    ...Object.values((isHub ? config?.custom?.hub : {}) ?? {}),
  ];
  if (isHub) {
    if (config.prefix.includes("Optimism")) {
      hubArgs.push(config.processGas);
    }
    console.log(
      `hub connector constructorArgs:`,
      hubArgs.map((c) => c.toString()),
    );
    return hubArgs;
  }
  const constructorArgs = [
    ...hubArgs,
    config.processGas,
    config.reserveGas,
    config.delayBlocks,
    merkleManager!,
    watcherManager!,
    ...Object.values(config?.custom?.spoke ?? {}),
  ];
  if (config.prefix.includes("Optimism")) {
    constructorArgs.push(config.processGas);
  }
  console.log(
    `spoke connector constructorArgs:`,
    constructorArgs.map((c) => c.toString()),
  );
  // console.log(`- domain:`, constructorArgs[0].toString());
  return constructorArgs;
};

// Deploy messaging contracts unique to Eth mainnet, including hub connectors.
const handleDeployHub = async (
  hre: HardhatRuntimeEnvironment,
  deployer: Wallet,
  protocol: MessagingProtocolConfig,
): Promise<void> => {
  // Deploy WatcherManager.
  console.log("Deploying WatcherManager...");
  const watcherManager = await hre.deployments.deploy(getDeploymentName("WatcherManager"), {
    contract: "WatcherManager",
    from: deployer.address,
    args: [],
    skipIfAlreadyDeployed: true,
    log: true,
  });
  console.log(`WatcherManager deployed to ${watcherManager.address}`);

  // Deploy MerkleTreeManager(beacon proxy)
  console.log("Deploying MerkleTreeManager proxy For RootManager...");
  const merkleTreeManagerForRoot = await deployBeaconProxy(
    "MerkleTreeManager",
    [constants.AddressZero],
    deployer,
    hre,
    [],
    "MerkleTreeManagerRoot",
  );

  // Deploy RootManager.
  console.log("Deploying RootManager...");
  // TODO: need to make this hardcoded value configurable
  const delayBlocks = 100;
  const rootManager = await hre.deployments.deploy(getDeploymentName("RootManager"), {
    contract: "RootManager",
    from: deployer.address,
    args: [delayBlocks, merkleTreeManagerForRoot.address, watcherManager.address],
    skipIfAlreadyDeployed: true,
    log: true,
  });
  console.log(`RootManager deployed to ${rootManager.address}`);

  // setArborist to Merkle for RootManager
  const merkleForRootContract = await hre.ethers.getContractAt(
    "MerkleTreeManager",
    merkleTreeManagerForRoot.address,
    deployer,
  );
  if (!(await merkleForRootContract.arborist())) {
    const tx = await merkleForRootContract.setArborist(rootManager.address);
    console.log(`setArborist for RootManager tx submitted:`, tx.hash);
    await tx.wait();
  }

  // Deploy MerkleTreeManager(beacon proxy)
  console.log("Deploying MerkleTreeManager proxy For MainnetSpokeConnector...");
  const merkleTreeManagerForSpoke = await deployBeaconProxy(
    "MerkleTreeManager",
    [constants.AddressZero],
    deployer,
    hre,
    [],
    "MerkleTreeManagerSpoke",
  );

  // Deploy MainnetSpokeConnector.
  const connectorName = getConnectorName(protocol, protocol.hub);
  console.log(`Deploying ${connectorName}...`);
  const deployment = await hre.deployments.deploy(getDeploymentName(connectorName), {
    contract: connectorName,
    from: deployer.address,
    args: formatConnectorArgs(protocol, {
      connectorChainId: protocol.hub,
      deploymentChainId: protocol.hub,
      mirrorChainId: protocol.hub,
      rootManager: rootManager.address,
      merkleManager: merkleTreeManagerForSpoke.address,
      watcherManager: watcherManager.address,
    }),
    skipIfAlreadyDeployed: true,
    log: true,
  });
  console.log(`${connectorName} deployed to ${deployment.address}`);

  // setArborist for Spoke to Merkle
  const merkleForSpokeContract = await hre.ethers.getContractAt(
    "MerkleTreeManager",
    merkleTreeManagerForSpoke.address,
    deployer,
  );
  if (!(await merkleForSpokeContract.arborist())) {
    const tx = await merkleForSpokeContract.setArborist(deployment.address);
    console.log(`setArborist for MainnetSpokeConnector tx submitted:`, tx.hash);
    await tx.wait();
  }

  /// HUBCONNECTOR DEPLOYMENT
  // Loop through every HubConnector configuration (except for the actual hub's) and deploy.
  const { configs } = protocol;
  for (const mirrorChain of Object.keys(configs)) {
    const mirrorChainId = +mirrorChain;
    if (mirrorChainId === protocol.hub) {
      // Skip; we're just deploying the spokes' hub-side connectors.
      continue;
    }

    const contract = getConnectorName(protocol, mirrorChainId, protocol.hub);

    const deploymentName = getDeploymentName(contract, undefined, protocol.configs[mirrorChainId].networkName);

    console.log(`Deploying ${contract}...`);
    const deployment = await hre.deployments.deploy(deploymentName, {
      contract,
      from: deployer.address,
      args: formatConnectorArgs(protocol, {
        connectorChainId: mirrorChainId,
        deploymentChainId: protocol.hub,
        mirrorChainId,
        rootManager: rootManager.address,
      }),
      skipIfAlreadyDeployed: true,
      log: true,
    });
    console.log(`${contract} deployed to ${deployment.address}`);
  }
};

/**
 * @notice Deploys the `Connector` contract on the given domain
 * @param hre
 * @param deployer
 * @param protocol
 * @param deploymentChainId
 * @param rootManager
 */
const handleDeploySpoke = async (
  hre: HardhatRuntimeEnvironment,
  deployer: Wallet,
  protocol: MessagingProtocolConfig,
  deploymentChainId: number,
): Promise<DeployResult | undefined> => {
  // Get hub root manager from deployments. if it does not exist, error (should always
  // deploy hub chain first in series of chain deployments)
  const rootManagerDeployment = await hre.companionNetworks["hub"].deployments.getOrNull(
    getDeploymentName("RootManager"),
  );
  if (!rootManagerDeployment) {
    throw new Error(`RootManager (hub) not deployed`);
  }

  // Deploy the Connector contract for this Spoke chain.
  const contract = getConnectorName(protocol, deploymentChainId);
  if (
    (!contract.includes("Optimism") &&
      !contract.includes("Polygon") &&
      !contract.includes("Gnosis") &&
      !contract.includes("Arbitrum") &&
      !contract.includes("Multichain")) ||
    contract.includes("Mainnet")
  ) {
    return;
  }

  // Deploy WatcherManager.
  console.log("Deploying WatcherManager...");
  const watcherManager = await hre.deployments.deploy(getDeploymentName("WatcherManager"), {
    contract: "WatcherManager",
    from: deployer.address,
    args: [],
    skipIfAlreadyDeployed: true,
    log: true,
  });
  console.log(`WatcherManager deployed to ${watcherManager.address}`);

  // Deploy MerkleTreeManager(beacon proxy)
  console.log("Deploying MerkleTreeManager proxy...");
  const merkleTreeManager = await deployBeaconProxy("MerkleTreeManager", [constants.AddressZero], deployer, hre);

  // Deploy Spoke Connector

  let amb: undefined | string;
  let hubConnectorAddress;
  if (protocol.configs[deploymentChainId].prefix.includes("Arbitrum")) {
    // NOTE: If the spoke network is arbitrum, the AMB should be set to the alias address.
    // For more info, see alias address in docs:
    // https://developer.offchainlabs.com/arbos/l1-to-l2-messaging
    const arbitrumHubConnector = await hre.companionNetworks["hub"].deployments.getOrNull(
      getDeploymentName("ArbitrumHubConnector"),
    );
    if (!arbitrumHubConnector) {
      throw new Error(
        "Could not find the ArbitrumHubConnector contract deployment; " +
          "address is needed in order to deploy ArbitrumSpokeConnector",
      );
    }
    hubConnectorAddress = arbitrumHubConnector.address;
  }

  console.log(`Deploying ${contract}...`);
  const deployment = await hre.deployments.deploy(
    getDeploymentName(contract, undefined, protocol.configs[deploymentChainId].networkName),
    {
      contract,
      from: deployer.address,
      args: formatConnectorArgs(protocol, {
        connectorChainId: deploymentChainId,
        deploymentChainId,
        mirrorChainId: protocol.hub,
        mirrorConnector: hubConnectorAddress,
        rootManager: rootManagerDeployment.address,
        merkleManager: merkleTreeManager.address,
        watcherManager: watcherManager.address,
        amb,
      }),
      skipIfAlreadyDeployed: true,
      log: true,
    },
  );
  console.log(`${contract} deployed to ${deployment.address}`);

  // setArborist to Merkle
  const merkleContract = await hre.ethers.getContractAt("MerkleTreeManager", merkleTreeManager.address, deployer);
  console.log("merkleContract: ", merkleContract.address);

  console.log("await merkleContract.arborist(): ", await merkleContract.arborist());
  if (!(await merkleContract.arborist())) {
    const tx = await merkleContract.setArborist(deployment.address);
    console.log(`setArborist tx submitted:`, tx.hash);
    await tx.wait();
  }
  return deployment;
};

/**
 * Hardhat task for deploying the AMB Messaging Layer contracts.
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

  const network = getProtocolNetwork(chain);
  console.log("Network: ", network, chain);
  const protocol = MESSAGING_PROTOCOL_CONFIGS[network];

  if (!protocol.configs[+chain] && +chain !== protocol.hub) {
    throw new Error(`Network ${network} is not supported for chain ${chain}!`);
  }

  const isHub = chain === protocol.hub.toString();

  // Handle deployment for Connector(s) and RootManager, if applicable.
  if (isHub) {
    console.log("Deploying hub messaging contracts...");
    await handleDeployHub(hre, deployer, protocol);
  } else {
    if (!hre.companionNetworks["hub"]) {
      throw new Error(`Cannot handle deployments for Spoke chain ${chain}; hub deployments not found!`);
    }
    console.log("Deploying spoke messaging contracts...");
    if (!Object.keys(protocol.configs).includes(chain)) {
      throw new Error(`Invalid chain (${chain}) for deployment!`);
    }

    await handleDeploySpoke(hre, deployer, protocol, +chain);
  }
};

export default func;

func.tags = ["Messaging", "prod", "local", "mainnet"];
func.dependencies = [];
