import { Contract } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../src/utils";

type TaskArgs = {
  watcher: string;
  connextAddress?: string;
  env?: Env;
};

export default task("add-watcher", "Add watcher to whitelist")
  .addParam("watcher", "The address of watcher to add")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ watcher, connextAddress: _connextAddress, env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("watcher: ", watcher);

    const connextName = getDeploymentName("WatcherManager", env);
    const connextDeployment = await deployments.get(connextName);
    const connextAddress = _connextAddress ?? connextDeployment.address;
    console.log("connextAddress: ", connextAddress);

    const connext = new Contract(connextAddress, connextDeployment.abi, deployer);

    if (!isAddress(watcher) || watcher === ethers.constants.AddressZero) {
      throw new Error("Invalid Watcher address");
    }

    const isWatcher = await connext.isWatcher(watcher);
    console.log("isWatcher: ", isWatcher);
    if (isWatcher) {
      throw new Error("Already approved watcher");
    }

    const tx = await connext.addWatcher(watcher);
    console.log("addWatcher tx: ", tx);
    const receipt = await tx.wait();
    console.log("addWatcher tx mined: ", receipt.transactionHash);
  });
