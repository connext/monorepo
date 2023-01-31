import { BigNumber, Contract, providers } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../src/utils";

type TaskArgs = {
  admin: string;
  type: "router" | "protocol";
  connextAddress?: string;
  env?: Env;
};

export default task("add-admin", "Add admin role to address")
  .addParam("admin", "The address of admin to add")
  .addParam("type", "The admin role - router or protocol")
  .addOptionalParam("managerAddress", "Override watcher manager address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ admin, type, connextAddress: _connextAddress, env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("admin: ", admin);
    console.log("type: ", type);

    // verify provided address
    if (!isAddress(admin) || admin === ethers.constants.AddressZero) {
      throw new Error("Invalid admin address");
    }

    // get connext
    const connextName = getDeploymentName("Connext", env);
    const connextDeployment = await deployments.get(connextName);
    const connextAddress = _connextAddress ?? connextDeployment.address;
    console.log("connextAddress: ", connextAddress);

    const connext = new Contract(connextAddress, connextDeployment.abi, deployer);
    console.log("setting admin role");
    const role = await connext.queryRole(admin);
    let tx: providers.TransactionResponse;
    if (type === "protocol") {
      if (role === 3) {
        console.log(`${admin} already has ${type} role (${role.toString()})`);
        return;
      }
      tx = await connext.assignRoleAdmin(admin);
    } else if (type === "router") {
      if (role === 1) {
        console.log(`${admin} already has ${type} role (${role.toString()})`);
        return;
      }
      tx = await connext.assignRoleRouterAdmin(admin);
    } else {
      throw new Error(`unsupported admin type: ${type}`);
    }
    console.log(`enroll ${type} tx:`, tx.hash);
    const receipt = await tx.wait();
    console.log(`tx mined: ${receipt.transactionHash}`);
  });
