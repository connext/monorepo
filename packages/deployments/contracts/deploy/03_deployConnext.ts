import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract, Wallet } from "ethers";
import { ethers } from "hardhat";

import { SKIP_SETUP } from "../src/constants";
import { getDeploymentName, getProtocolNetwork } from "../src/utils";
import { chainIdToDomain } from "../src/nomad";
import { deployConfigs } from "../deployConfig";
import { MESSAGING_PROTOCOL_CONFIGS, HUB_PREFIX, SPOKE_PREFIX } from "../deployConfig/shared";

/**
 * Hardhat task defining the contract deployments for nxtp
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  const chainId = await hre.getChainId();

  const acceptanceDelay = 0; // 604800 = 7 days

  let _deployer: any;
  ({ deployer: _deployer } = await hre.ethers.getNamedSigners());
  if (!_deployer) {
    [_deployer] = await hre.ethers.getUnnamedSigners();
  }
  const deployer = _deployer as Wallet;
  console.log("\n============================= Deploying Connext Contracts ===============================");
  console.log("deployer: ", deployer.address);

  const network = await hre.ethers.provider.getNetwork();
  console.log("network: ", network);
  const domain = chainIdToDomain(network.chainId);
  console.log("domain: ", domain);
  const price = await hre.ethers.provider.getGasPrice();
  console.log("price: ", price.toString());

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("balance: ", balance.toString());

  // Retrieve Router deployments, format into ethers.Contract objects:
  const promiseRouterDeployment = await hre.deployments.getOrNull(getDeploymentName("PromiseRouterUpgradeBeaconProxy"));
  if (!promiseRouterDeployment) {
    throw new Error("PromiseRouterUpgradeBeaconProxy deployment not found!");
  }
  const promiseRouter = await hre.ethers.getContractAt("PromiseRouter", promiseRouterDeployment.address, deployer);

  const relayerFeeRouterDeployment = await hre.deployments.getOrNull(
    getDeploymentName("RelayerFeeRouterUpgradeBeaconProxy"),
  );
  if (!relayerFeeRouterDeployment) {
    throw new Error("RelayerFeeRouterUpgradeBeaconProxy deployment not found!");
  }
  const relayerFeeRouter = await hre.ethers.getContractAt(
    "RelayerFeeRouter",
    relayerFeeRouterDeployment.address,
    deployer,
  );

  const deployConfig = deployConfigs[chainId];
  // Get connector manager
  const messagingNetwork = getProtocolNetwork(chainId);
  const protocol = MESSAGING_PROTOCOL_CONFIGS[messagingNetwork];

  if (!protocol.configs[protocol.hub]) {
    throw new Error(`Network ${messagingNetwork} is not supported! (no messaging config)`);
  }

  const connectorName = `${protocol.configs[network.chainId].prefix}${
    protocol.hub === network.chainId ? HUB_PREFIX : SPOKE_PREFIX
  }Connector`;
  const connectorManagerDeployment = await hre.deployments.getOrNull(getDeploymentName(connectorName));
  if (!connectorManagerDeployment) {
    throw new Error(`${connectorName} not deployed`);
  }

  console.log("Fetching token registry...");
  let tokenRegistryAddress = deployConfig?.TokenRegistry;
  if (!tokenRegistryAddress) {
    const tokenRegistryDeployment = await hre.deployments.getOrNull(
      getDeploymentName("TokenRegistryUpgradeBeaconProxy"),
    );
    if (!tokenRegistryDeployment) {
      throw new Error(`TokenRegistry not deployed`);
    }
    tokenRegistryAddress = tokenRegistryDeployment.address;
  }
  const tokenRegistry = await hre.ethers.getContractAt("TokenRegistry", tokenRegistryAddress, deployer);

  const lpTokenDeployment = await hre.deployments.deploy("LPToken", {
    from: deployer.address,
    log: true,
    skipIfAlreadyDeployed: true,
  });

  if (lpTokenDeployment.newlyDeployed) {
    await hre.deployments.execute(
      "LPToken",
      { from: deployer.address, log: true },
      "initialize",
      "Nxtp Stable LP Token",
      "NxtpStableLPToken",
    );
  }

  // Deploy connext diamond contract
  console.log("Deploying connext diamond...");
  const isDiamondUpgrade = !!(await hre.deployments.getOrNull(getDeploymentName("ConnextHandler")));
  const connext = await hre.deployments.diamond.deploy(getDeploymentName("ConnextHandler"), {
    from: deployer.address,
    owner: deployer.address,
    log: true,
    facets: [
      { name: getDeploymentName("AssetFacet"), contract: "AssetFacet", args: [] },
      { name: getDeploymentName("BridgeFacet"), contract: "BridgeFacet", args: [] },
      { name: getDeploymentName("NomadFacet"), contract: "NomadFacet", args: [] },
      { name: getDeploymentName("ProposedOwnableFacet"), contract: "ProposedOwnableFacet", args: [] },
      { name: getDeploymentName("RelayerFacet"), contract: "RelayerFacet", args: [] },
      { name: getDeploymentName("RoutersFacet"), contract: "RoutersFacet", args: [] },
      { name: getDeploymentName("StableSwapFacet"), contract: "StableSwapFacet", args: [] },
      { name: getDeploymentName("SwapAdminFacet"), contract: "SwapAdminFacet", args: [] },
      { name: getDeploymentName("VersionFacet"), contract: "VersionFacet", args: [] },
      { name: getDeploymentName("DiamondCutFacet"), contract: "DiamondCutFacet", args: [] },
    ],
    defaultOwnershipFacet: false,
    defaultCutFacet: false,
    execute: isDiamondUpgrade
      ? undefined
      : {
          contract: "DiamondInit",
          methodName: "init",
          args: [
            domainConfig.domain,
            xappConnectionManagerAddress,
            tokenRegistry.address,
            WRAPPED_ETH_MAP.get(+chainId) ?? constants.AddressZero,
            relayerFeeRouter.address,
            promiseRouter.address,
            acceptanceDelay,
          ],
        },
    // deterministicSalt: keccak256(utils.toUtf8Bytes("connextDiamondProxyV1")),
  });
  const connextAddress = connext.address;
  console.log("connextAddress: ", connextAddress);

  // Sanity check: did token registry set
  const contract = new Contract(connext.address, connext.abi, ethers.provider);
  if ((await contract.tokenRegistry()).toLowerCase() !== tokenRegistry.address.toLowerCase()) {
    console.log("expected token registry:", tokenRegistry.address);
    console.log("init-d token registry:", await contract.tokenRegistry());
    console.log(`Improperly init-d token registry, setting TokenRegistry...`);
    const setTm = await contract.connect(deployer).setTokenRegistry(tokenRegistry.address);
    await setTm.wait();
    console.log(`New TokenRegistry address set!`);
  }

  // Add connext to relayer fee router
  if ((await relayerFeeRouter.connext()) !== connextAddress) {
    console.log("setting connext on relayer fee router");
    const addTm = await relayerFeeRouter.connect(deployer).setConnext(connextAddress);
    await addTm.wait();
  } else {
    console.log("relayer fee router connext set");
  }

  // Add connext to promise router
  if ((await promiseRouter.connext()) !== connextAddress) {
    console.log("setting connext on promiseRouter router");
    const addTm = await promiseRouter.connect(deployer).setConnext(connextAddress);
    await addTm.wait();
  } else {
    console.log("promise router connext set");
  }

  console.log("Deploying multicall...");
  const multicallName = getDeploymentName("Multicall");
  let deployment = await hre.deployments.deploy(multicallName, {
    from: deployer.address,
    log: true,
    skipIfAlreadyDeployed: true,
    contract: "Multicall",
  });

  if (!SKIP_SETUP.includes(parseInt(chainId))) {
    console.log("Deploying test token on non-mainnet chain...");
    // Note: NOT using special token for staging envs
    deployment = await hre.deployments.deploy("TestERC20", {
      from: deployer.address,
      log: true,
      skipIfAlreadyDeployed: true,
      args: ["Test Token", "TEST"],
    });
    console.log("TestERC20: ", deployment.address);

    deployment = await hre.deployments.deploy("TestWETH", {
      contract: "TestERC20",
      from: deployer.address,
      log: true,
      skipIfAlreadyDeployed: true,
      args: ["Test Wrapped Ether", "TWETH"],
    });
    console.log("TestERC20: ", deployment.address);
  } else {
    console.log("Skipping test setup on chainId: ", chainId);
  }
};

export default func;

func.tags = ["Connext", "prod", "local", "mainnet"];
// func.dependencies = ["Nomad"];
func.dependencies = ["Messaging"];
