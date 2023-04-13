import { Contract } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../src/utils";

type TaskArgs = {
  watcher: string;
  managerAddress?: string;
  connextAddress?: string;
  env?: Env;
};

export default task("add-watcher", "Add watcher to allowlist")
  .addParam("watcher", "The address of watcher to add")
  .addOptionalParam("managerAddress", "Override watcher manager address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(
    async (
      { watcher, managerAddress: _managerAddress, connextAddress: _connextAddress, env: _env }: TaskArgs,
      { deployments, ethers },
    ) => {
      let { deployer } = await ethers.getNamedSigners();
      if (!deployer) {
        [deployer] = await ethers.getUnnamedSigners();
      }

      const env = mustGetEnv(_env);
      console.log("env:", env);
      console.log("watcher: ", watcher);

      // verify provided address
      if (!isAddress(watcher) || watcher === ethers.constants.AddressZero) {
        throw new Error("Invalid Watcher address");
      }

      // get watcher manager (for messaging)
      const managerName = getDeploymentName("WatcherManager", env);
      const deployment = await deployments.get(managerName);
      const managerAddress = _managerAddress ?? deployment.address;
      console.log("managerAddress: ", managerAddress);

      const manager = new Contract(managerAddress, deployment.abi, deployer);

      console.log("enrolling watcher on manager...");
      let isWatcher = await manager.isWatcher(watcher);
      if (isWatcher) {
        console.log("Already approved watcher on manager");
      } else {
        const tx = await manager.addWatcher(watcher);
        console.log("addWatcher tx: ", tx);
        const receipt = await tx.wait();
        console.log("addWatcher tx mined: ", receipt.transactionHash);
      }

      // get connext (for liquidity)
      const connextName = getDeploymentName("Connext", env);
      const connextDeployment = await deployments.get(connextName);
      const connextAddress = _connextAddress ?? connextDeployment.address;
      console.log("connextAddress: ", connextAddress);

      const connext = new Contract(connextAddress, connextDeployment.abi, deployer);
      console.log("enrolling watcher on connext...");
      isWatcher = (await connext.queryRole(watcher)) === 2;
      if (isWatcher) {
        console.log("Already approved watcher on manager");
      } else {
        const tx = await connext.assignRoleWatcher(watcher);
        console.log("addWatcher tx: ", tx);
        const receipt = await tx.wait();
        console.log("addWatcher tx mined: ", receipt.transactionHash);
      }
    },
  );
