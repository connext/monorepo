import { Contract } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../src/utils";

type TaskArgs = {
  router: string;
  connextAddress?: string;
  env?: Env;
};

export default task("approve-router", "Setup a router")
  .addParam("router", "The router's address to add")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ router, connextAddress: _connextAddress, env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("router: ", router);
    console.log("deployer: ", deployer.address);

    const connextName = getDeploymentName("Connext", env);
    const connextDeployment = await deployments.get(connextName);
    const connextAddress = _connextAddress ?? connextDeployment.address;
    const connext = new Contract(connextAddress, connextDeployment.abi, deployer);
    console.log("connextAddress: ", connextAddress);

    const approved = await connext.getRouterApproval(router);
    if (approved) {
      console.log("approved, no need to add");
      return;
    }

    const tx = await connext.approveRouter(router);
    console.log("approveRouter tx: ", tx);
    const receipt = await tx.wait();
    console.log("approveRouter tx mined: ", receipt.transactionHash);

    const isRouterApproved = await connext.getRouterApproval(router);
    console.log("isRouterApproved: ", isRouterApproved);
  });
