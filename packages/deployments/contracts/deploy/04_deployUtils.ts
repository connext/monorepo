import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Wallet } from "ethers";

import { SKIP_SETUP } from "../src/constants";

/**
 * Hardhat task defining the contract deployments for nxtp
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  console.log("\n============================= Deploying Utility Contracts ===============================");
  const chainId = +(await hre.getChainId());

  let _deployer: any;
  ({ deployer: _deployer } = await hre.ethers.getNamedSigners());
  if (!_deployer) {
    [_deployer] = await hre.ethers.getUnnamedSigners();
  }
  const deployer = _deployer as Wallet;
  console.log("deployer: ", deployer.address);

  if (SKIP_SETUP.includes(chainId)) {
    throw new Error(`Should be skipped on mainnet chain`);
  }

  {
    // NOTE: Multisend will be shared between staging and production environments; we do not
    // deploy 1 for each.
    // Multisend utility contract is used by the SDK to conveniently wrap ETH => WETH before
    // making xcalls transferring WETH tokens.
    const multisendContractName = "MultiSend";
    let deployment = await hre.deployments.getOrNull(multisendContractName);
    if (!deployment) {
      console.log("Deploying Multisend contract...");
      deployment = await hre.deployments.deploy(multisendContractName, {
        from: deployer.address,
        log: true,
        skipIfAlreadyDeployed: true,
        contract: multisendContractName,
      });
      console.log(`Deployed Multisend contract to ${deployment.address}!`);
    } else {
      console.log(`Multisend contract already deployed at ${deployment.address}`);
    }
  }
};

export default func;
func.tags = ["Utils", "prod"];
func.skip = async (hre: HardhatRuntimeEnvironment) => {
  const chainId = +(await hre.getChainId());
  return SKIP_SETUP.includes(chainId);
};
