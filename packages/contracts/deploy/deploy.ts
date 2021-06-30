import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

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

  const multisend = await deploy("MultiSendCallOnly", {
    from: deployer,
    log: true,
  });

  const interpreter = await deploy("MultisendInterpreter", {
    from: deployer,
    args: [multisend.address],
    log: true,
  });

  await deploy("TransactionManager", {
    from: deployer,
    args: [interpreter.address, chainId],
    log: true,
  });
};
export default func;
