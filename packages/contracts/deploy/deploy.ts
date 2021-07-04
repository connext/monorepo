import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  const chainId = await hre.getChainId();

  let deployer;
  ({ deployer } = await hre.getNamedAccounts());
  if (!deployer) {
    [deployer] = await hre.getUnnamedAccounts();
  }
  console.log("deployer: ", deployer);

  const multisend = await hre.deployments.deploy("MultiSendCallOnly", {
    from: deployer,
    log: true,
  });

  const interpreter = await hre.deployments.deploy("MultisendInterpreter", {
    from: deployer,
    args: [multisend.address],
    log: true,
  });

  await hre.deployments.deploy("TransactionManager", {
    from: deployer,
    args: [interpreter.address, chainId],
    log: true,
  });

  if (chainId !== "1") {
    console.log("Deploying test token on non-mainnet chain");
    await hre.deployments.deploy("TestERC20", {
      from: deployer,
      log: true,
    });
  }
};
export default func;
