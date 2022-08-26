import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../src/utils";

type TaskArgs = {
  tokenAddresses: string;
  sources: string;
  env?: Env;
};

export default task("set-bridge-router", "Set bridge router")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("deployer: ", deployer.address);

    const connext = await ethers.getContract(getDeploymentName("ConnextHandler", env), deployer);
    const bridgeRouter = await deployments.get(getDeploymentName("BridgeRouterUpgradeBeaconProxy", env));
    console.log("bridgeRouter: ", bridgeRouter.address);
    const tx = await connext.setBridgeRouter(bridgeRouter.address);
    console.log("setBridgeRouter tx: ", tx);
    const receipt = await tx.wait();
    console.log("bridgeRouter tx mined: ", receipt.transactionHash);
  });
