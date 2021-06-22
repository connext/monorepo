import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { constants } from "ethers";

const func: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, getChainId, getUnnamedAccounts } = hre;
  const { deploy } = deployments;

  const chainId = await getChainId();

  let deployer;
  ({ deployer } = await getNamedAccounts());
  if (!deployer) {
    [deployer] = await getUnnamedAccounts();
  }
  console.log("deployer: ", deployer);

  await deploy("TransactionManager", {
    from: deployer,
    args: [constants.AddressZero, chainId],
    log: true,
  });
};
export default func;
