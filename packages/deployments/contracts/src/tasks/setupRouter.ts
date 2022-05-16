import { constants, Contract } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../utils";

type TaskArgs = {
  router: string;
  owner?: string;
  recipient: string;
  connextAddress?: string;
  env?: Env;
};

export default task("setup-router", "Setup a router")
  .addParam("router", "The router's address to add")
  .addOptionalParam("owner", "The router owner's address")
  .addOptionalParam("recipient", "The rotuer recipient's address")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(
    async (
      { router, owner: _owner, recipient: _recipient, connextAddress: _connextAddress, env: _env }: TaskArgs,
      { deployments, ethers },
    ) => {
      let { deployer } = await ethers.getNamedSigners();
      if (!deployer) {
        [deployer] = await ethers.getUnnamedSigners();
      }

      const env = mustGetEnv(_env);
      console.log("env:", env);
      console.log("router: ", router);
      console.log("owner: ", _owner);
      console.log("recipient: ", _recipient);
      console.log("deployer: ", deployer.address);

      const recipient = _recipient || constants.AddressZero;
      const owner = _owner || constants.AddressZero;

      const connextName = getDeploymentName("ConnextHandler", env);
      const connextDeployment = await deployments.get(connextName);
      const connextAddress = _connextAddress ?? connextDeployment.address;
      const connext = new Contract(connextAddress, connextDeployment.abi, deployer);
      console.log("connextAddress: ", connextAddress);

      const approved = await connext.getRouterApproval(router);
      if (approved) {
        console.log("approved, no need to add");
        return;
      }

      const tx = await connext.setupRouter(router, owner, recipient);
      console.log("setupRouter tx: ", tx);
      const receipt = await tx.wait();
      console.log("setupRouter tx mined: ", receipt.transactionHash);

      const isRouterApproved = await connext.getRouterApproval(router);
      console.log("isRouterApproved: ", isRouterApproved);
    },
  );
