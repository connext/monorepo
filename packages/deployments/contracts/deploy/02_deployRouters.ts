import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract, Wallet } from "ethers";

import { getDeploymentName, mustGetEnv } from "../src/utils";
import { Connector } from "../src";
import { HUB_PREFIX, MESSAGING_PROTOCOL_CONFIGS, SPOKE_PREFIX } from "../deployConfig/shared";
import { deployConfigs } from "../deployConfig";

import { deployNomadBeaconProxy } from "./nomad/01_deployNomad";

// List of all the router contracts to deploy (by name).
const ROUTERS = ["PromiseRouter", "RelayerFeeRouter", "BridgeRouter"];

/**
 * Hardhat task for deploying the Routers.
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  let _deployer: any;
  ({ deployer: _deployer } = await hre.ethers.getNamedSigners());
  if (!_deployer) {
    [_deployer] = await hre.ethers.getUnnamedSigners();
  }
  const deployer = _deployer as Wallet;
  console.log("\n============================= Deploying Routers ===============================");
  console.log("deployer: ", deployer.address);

  const chainId = +(await hre.getChainId());

  const env = mustGetEnv();
  const network = env === "production" ? "mainnet" : env === "staging" ? "testnet" : "local";
  const protocol = MESSAGING_PROTOCOL_CONFIGS[network];

  if (!protocol.configs[protocol.hub]) {
    throw new Error(`Network ${network} is not supported! (no messaging config)`);
  }

  const connectorName = `${protocol.configs[chainId].prefix}${
    protocol.hub === chainId ? HUB_PREFIX : SPOKE_PREFIX
  }Connector`;
  console.log(`using connector: ${connectorName}`);

  // Find the connector that exists on this domain / chain
  // and use it as the connectorManager address
  const connector = (await hre.ethers.getContractOrNull(getDeploymentName(connectorName), deployer)) as
    | Connector
    | undefined;
  if (!connector) {
    throw new Error(`No connector manager deployed to this chain (looking for: ${connectorName})`);
  }

  // Find the token registry (and deploy if needed)
  let tokenRegistryAddress = deployConfigs[chainId]?.TokenRegistry;
  if (!tokenRegistryAddress) {
    // Deploy token beacon
    const tokenDeployment = await deployNomadBeaconProxy("BridgeToken", [], deployer, hre);
    // Deploy token registry
    const tokenRegistryDeployment = await deployNomadBeaconProxy(
      "TokenRegistry",
      [tokenDeployment.address, connector.address],
      deployer,
      hre,
    );
    tokenRegistryAddress = tokenRegistryDeployment.address;
  }

  for (const router of ROUTERS) {
    // NOTE: the connector manager address will *NOT* be known until the connectors are deployed
    console.log(`Deploying ${router}`);
    const deployment = (
      await deployNomadBeaconProxy(
        router,
        router.includes("Bridge") ? [tokenRegistryAddress, connector.address] : [connector.address],
        deployer,
        hre,
      )
    ).connect(deployer);
    console.log(`${router} deployed to ${deployment.address}`);
    const owner = await deployment.owner();
    console.log(`${router} owner set to ${owner}`);

    // whitelist the router on the connector
    if (await (connector as Contract).whitelistedSenders(deployment.address)) {
      console.log(`router already whitelisted on connector`);
      continue;
    }
    console.log(`whitelisting router on connector: ${connector.address}`);
    const whitelist = await connector.addSender(deployment.address);
    console.log(`whitelist tx:`, whitelist.hash);
    await whitelist.wait();
    console.log(`whitelist tx mined`);
  }
};

export default func;

func.tags = ["Routers", "prod", "local", "mainnet"];
func.dependencies = ["Messaging"];
