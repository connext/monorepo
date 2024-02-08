import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction, DeployResult } from "hardhat-deploy/types";
import { Wallet } from "ethers";

import { SKIP_SETUP, WRAPPED_ETH_MAP } from "../src/constants";
import { getDeploymentName } from "../src";

// Helper for deploying a utility contract below and handling proper logs, etc.
const deployContract = async (params: {
  name: string;
  hre: HardhatRuntimeEnvironment;
  deployer: Wallet;
  contractName: string;
  args: any[];
}): Promise<DeployResult | undefined> => {
  const { hre, deployer, contractName, args, name } = params;
  const deployment = await hre.deployments.getOrNull(contractName);
  if (!deployment) {
    console.log(`Deploying ${contractName} contract...`);
    const deployResult = await hre.deployments.deploy(contractName, {
      name,
      from: deployer.address,
      log: true,
      skipIfAlreadyDeployed: true,
      contract: contractName,
      args: args,
    });
    console.log(`Deployed ${contractName} contract to: ${deployResult.address}`);
    return deployResult;
  } else {
    console.log(`${contractName} contract already deployed at: ${deployment.address}`);
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

  const network = await hre.ethers.provider.getNetwork();
  console.log("network: ", network);
  const chain = network.chainId;

  /// MARK - MultiSend
  // NOTE: MultiSend will be shared between staging and production environments; we do not
  // deploy 1 for each.
  // Multisend utility contract is used by the SDK to conveniently wrap ETH => WETH before
  // making xcalls transferring WETH tokens.
  await deployContract({ hre, deployer, contractName: "MultiSend", args: [], name: "MultiSend" });

  /// MARK - Unwrapper
  // NOTE: Unwrapper can be shared between staging and production environments; we do not
  // deploy 1 for each.
  // Unwrapper utility contract is used by the SDK to conveniently unwrap WETH => ETH on the
  // transfer's destination chain after an xcall transferring WETH tokens.
  if (SKIP_SETUP.includes(chainId)) {
    const connext = (await hre.deployments.getOrNull(getDeploymentName("Connext")))!;
    const wrappedETH = WRAPPED_ETH_MAP.get(chain);
    if (!wrappedETH) {
      throw new Error(`Wrapped ETH contract not defined in WRAPPED_ETH_MAP for this domain!`);
    }

    await deployContract({
      hre,
      deployer,
      contractName: "Unwrapper",
      name: getDeploymentName("Unwrapper"),
      args: [connext.address, wrappedETH],
    });
  }
};

export default func;
func.tags = ["Utils", "prod"];
