import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Wallet } from "ethers";

import { SKIP_SETUP } from "../src/constants";

// Helper for deploying a utility contract below and handling proper logs, etc.
const deployContract = async (params: { hre: HardhatRuntimeEnvironment; deployer: Wallet; contractName: string }) => {
  const { hre, deployer, contractName } = params;
  let deployment = await hre.deployments.getOrNull(contractName);
  if (!deployment) {
    console.log(`Deploying ${contractName} contract...`);
    deployment = await hre.deployments.deploy(contractName, {
      from: deployer.address,
      log: true,
      skipIfAlreadyDeployed: true,
      contract: contractName,
    });
    console.log(`Deployed ${contractName} contract to: ${deployment.address}`);
  } else {
    console.log(`${contractName} contract already deployed at: ${deployment.address}`);
  }
};

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
    throw new Error(`Should have skipped setup for this chain (${chainId})`);
  }

  /// MARK - MultiSend
  // NOTE: MultiSend will be shared between staging and production environments; we do not
  // deploy 1 for each.
  // Multisend utility contract is used by the SDK to conveniently wrap ETH => WETH before
  // making xcalls transferring WETH tokens.
  deployContract({ hre, deployer, contractName: "MultiSend" });

  /// MARK - Unwrapper
  // NOTE: Unwrapper can be shared between staging and production environments; we do not
  // deploy 1 for each.
  // Unwrapper utility contract is used by the SDK to conveniently unwrap WETH => ETH on the
  // transfer's destination chain after an xcall transferring WETH tokens.
  deployContract({ hre, deployer, contractName: "Unwrapper" });
};

export default func;
func.tags = ["Utils", "prod"];
func.skip = async (hre: HardhatRuntimeEnvironment) => {
  const chainId = +(await hre.getChainId());
  return SKIP_SETUP.includes(chainId);
};
