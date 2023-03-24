import { Wallet } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { getDeploymentName } from "../src";

/**
 * Hardhat task defining the contract deployments for Connext
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
  console.log("\n============================= Deploying Bridge Facet ===============================");
  console.log("deployer: ", deployer.address);

  const zksync = hre.network.config.zksync || false;
  console.log("zksync: ", zksync);

  // Deploy BridgeFacet
  const contractName = "BridgeFacet";
  const deploymentName = getDeploymentName(contractName);
  console.log("Deploying BridgeFacet...");

  const deployment = await hre.deployments.deploy(deploymentName, {
    contract: contractName,
    args: [],
    from: deployer.address,
    log: true,
    skipIfAlreadyDeployed: true,
    // deterministicDeployment: true,
  });
  console.log(`deployed ${deploymentName} at ${deployment.address}`);
};
func.tags = ["relayer-fee-upgrade"];

export default func;
