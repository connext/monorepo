import { BigNumber, Contract } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../src/utils";

type TaskArgs = {
  connextAddress?: string;
  env?: Env;
};

export default task("renounce-router-ownership", "Renounce Ownership")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ connextAddress: _connextAddress, env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("deployer: ", deployer.address);

    const connextName = getDeploymentName("Connext", env);
    const connextDeployment = await deployments.get(connextName);
    const connextAddress = _connextAddress ?? connextDeployment.address;
    const connext = new Contract(connextAddress, connextDeployment.abi, deployer);
    console.log("connextAddress: ", connextAddress);

    const ownershipTimestampFunction = connext.routerAllowlistTimestamp;
    const proposeRenunciationFunction = connext.proposeRouterAllowlistRemoval;
    const renounceFunction = connext.removeRouterAllowlist;
    const renouncedEvent = "RouterAllowlistRemoved";

    // Check to see if renunciation event has ever been emitted
    const [event] = await connext.queryFilter(
      connext.filters[renouncedEvent](),
      connextDeployment.receipt?.blockNumber,
    );
    if (event) {
      console.log(`router ownership already renounced: ${event.transactionHash}`);
      return;
    }

    const ownershipTimestamp: BigNumber = await ownershipTimestampFunction();
    console.log("ownershipTimestamp: ", ownershipTimestamp.toString());
    const currentTime = Math.floor(Date.now() / 1000);
    console.log("currentTime: ", currentTime);

    // check the renunciation has been proposed
    if (ownershipTimestamp.isZero()) {
      console.log("Proposing renunciation");
      const tx = await proposeRenunciationFunction();
      console.log("proposeRenunciationFunction tx: ", tx);
      await tx.wait();
      const ownershipTimestamp = await ownershipTimestampFunction();
      console.log("ownershipTimestamp: ", ownershipTimestamp.toString());
      return;
    }
    const DELAY_SECONDS = 7 * 24 * 60 * 60; // 7 days

    const elapsed = BigNumber.from(currentTime).sub(ownershipTimestamp);
    if (elapsed.lt(DELAY_SECONDS)) {
      console.log(`Ownership delay has not expired yet, expires in: ${DELAY_SECONDS - elapsed.toNumber()}s`);
      return;
    }

    console.log("Delay has expired, proceeding with renunciation");
    const tx = await renounceFunction();
    console.log("renounceFunction tx: ", tx);
    const rec = await tx.wait();
    console.log("renounceFunction tx mined! ", rec);
  });
