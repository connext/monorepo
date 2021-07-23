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

  await hre.deployments.deploy("TransactionManager", {
    from: deployer,
    args: [chainId],
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
