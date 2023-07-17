import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction, DeployResult } from "hardhat-deploy/types";
import { Wallet } from "ethers";

import { getContract } from "../src/cli/helpers";
import { SKIP_SETUP, WRAPPED_ETH_MAP } from "../src/constants";

// Helper for deploying a utility contract below and handling proper logs, etc.
const deployContract = async (params: {
  hre: HardhatRuntimeEnvironment;
  deployer: Wallet;
  contractName: string;
  args: any[];
  deploymentName?: string;
}): Promise<DeployResult | undefined> => {
  const { hre, deployer, contractName, args } = params;
  const deploymentName = params.deploymentName ?? contractName;
  const deployment = await hre.deployments.getOrNull(deploymentName);
  if (!deployment) {
    console.log(`Deploying ${deploymentName} contract...`);
    const deployResult = await hre.deployments.deploy(deploymentName, {
      from: deployer.address,
      log: true,
      skipIfAlreadyDeployed: true,
      contract: contractName,
      args: args,
    });
    console.log(`Deployed ${deploymentName} (${contractName}): ${deployResult.address}`);
    return deployResult;
  } else {
    console.log(`${deploymentName} (${contractName}) contract already deployed at: ${deployment.address}`);
    return;
  }
};

/**
 * Hardhat task defining the contract deployments for Connext
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

  const network = await hre.ethers.provider.getNetwork();
  console.log("network: ", network);
  const chain = network.chainId;

  /// MARK - Test assets:
  /// - Test ERC20
  /// - Test WETH
  /// - Test Adopted
  console.log("Deploying test tokens...");
  // Note: NOT using special token for staging envs
  await deployContract({
    hre,
    deployer,
    contractName: "TestERC20",
    args: ["Test Token", "TEST"],
  });

  await deployContract({
    hre,
    deployer,
    contractName: "TestERC20",
    deploymentName: "TestAdopted",
    args: ["Test Adopted", "TEST2"],
  });

  await deployContract({
    hre,
    deployer,
    contractName: "TestERC20",
    deploymentName: "TestWETH",
    args: ["Test Wrapped Ether", "TWETH"],
  });

  /// MARK - MultiSend
  // NOTE: MultiSend will be shared between staging and production environments; we do not
  // deploy 1 for each.
  // Multisend utility contract is used by the SDK to conveniently wrap ETH => WETH before
  // making xcalls transferring WETH tokens.
  await deployContract({ hre, deployer, contractName: "MultiSend", args: [] });

  /// MARK - Unwrapper
  // NOTE: Unwrapper can be shared between staging and production environments; we do not
  // deploy 1 for each.
  // Unwrapper utility contract is used by the SDK to conveniently unwrap WETH => ETH on the
  // transfer's destination chain after an xcall transferring WETH tokens.
  const connext = getContract("Connext_DiamondProxy", chain.toString(), false);
  const wrappedETH = WRAPPED_ETH_MAP.get(chain);
  if (!wrappedETH) {
    throw new Error(`Wrapped ETH contract not defined in WRAPPED_ETH_MAP for this domain!`);
  }

  await deployContract({
    hre,
    deployer,
    contractName: "Unwrapper",
    args: [connext.address, wrappedETH],
  });
};

export default func;
func.tags = ["Utils", "prod"];
func.skip = async (hre: HardhatRuntimeEnvironment) => {
  const chainId = +(await hre.getChainId());
  return SKIP_SETUP.includes(chainId);
};
