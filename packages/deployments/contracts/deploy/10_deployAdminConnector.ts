import { Wallet, constants } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { chainIdToDomain } from "@connext/nxtp-utils";

import { MESSAGING_PROTOCOL_CONFIGS } from "../deployConfig";
import { ProtocolNetwork, getConnectorName, getDeploymentName, getProtocolNetwork } from "../src";

/**
 * Hardhat task defining the contract deployments for Connext
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
  console.log("\n============================= Deploying Admin Hub ===============================");
  console.log("deployer: ", deployer.address);

  const network = getProtocolNetwork(chain, hre.network.name);
  console.log("network: ", network, chain);
  const protocol = MESSAGING_PROTOCOL_CONFIGS[network];

  if (+chain !== protocol.hub.chain) {
    console.warn(`Admin connector must be deployed on network hub (${protocol.hub}), not ${chain})`);
    return;
  }

  // Get the correct name for the hub connector
  // TODO: If using multiple times, need to make sure this is pulled from env
  const mirrorChain = network === ProtocolNetwork.TESTNET ? 97 : 56;
  const contract = "AdminHubConnector";
  const deploymentName = getDeploymentName(
    getConnectorName(protocol, mirrorChain, protocol.hub.chain),
    undefined,
    protocol.configs[mirrorChain].networkName,
  );

  // Get the root manager deployment
  const rootManager = await hre.deployments.getOrNull(getDeploymentName("RootManager"));
  if (!rootManager) {
    throw new Error("RootManager deployment not found for " + chain);
  }

  console.log(`Deploying AdminHubConnector (${deploymentName})...`);
  const deployment = await hre.deployments.deploy(deploymentName, {
    contract,
    from: deployer.address,
    args: [
      chainIdToDomain(protocol.hub.chain),
      chainIdToDomain(mirrorChain),
      constants.AddressZero,
      rootManager.address,
      constants.AddressZero,
    ],
    skipIfAlreadyDeployed: true,
    log: true,
  });
  console.log(`${deploymentName} deployed to ${deployment.address}`);
};
func.tags = ["admin-hub"];

export default func;
