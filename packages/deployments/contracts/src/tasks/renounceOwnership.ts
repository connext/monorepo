import { BigNumber, Contract } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../utils";

type TaskArgs = {
  type: "asset" | "router";
  connextAddress?: string;
  env?: Env;
};

export default task("renounce-ownership", "Renounce Ownership")
  .addParam("type", "Type of ownership to renounce, either asset or router")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ type, connextAddress: _connextAddress, env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("type: ", type);
    console.log("deployer: ", deployer.address);

    const connextName = getDeploymentName("ConnextHandler", env);
    const connextDeployment = await deployments.get(connextName);
    const connextAddress = _connextAddress ?? connextDeployment.address;
    const connext = new Contract(connextAddress, connextDeployment.abi, deployer);
    console.log("connextAddress: ", connextAddress);

    let isRenouncedFunction;
    let ownershipTimestampFunction;
    let proposeRenunciationFunction;
    let renounceFunction;
    if (type === "router") {
      isRenouncedFunction = connext.isRouterOwnershipRenounced;
      ownershipTimestampFunction = connext.routerOwnershipTimestamp;
      proposeRenunciationFunction = connext.proposeRouterOwnershipRenunciation;
      renounceFunction = connext.renounceRouterOwnership;
    } else if (type === "asset") {
      isRenouncedFunction = connext.isAssetOwnershipRenounced;
      ownershipTimestampFunction = connext.assetOwnershipTimestamp;
      proposeRenunciationFunction = connext.proposeAssetOwnershipRenunciation;
      renounceFunction = connext.renounceAssetOwnership;
    } else {
      throw new Error("Unsupported type");
    }

    let ownershipRenounced = await isRenouncedFunction();
    console.log("ownershipRenounced: ", ownershipRenounced);
    if (ownershipRenounced === true) {
      console.log("Ownership has been renounced already");
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
      console.log("ownershipTimestamp: ", ownershipTimestamp);
      return;
    }

    if (ownershipTimestamp.gt(currentTime)) {
      console.log(
        `Ownership delay has not expired yet, expires in: ${ownershipTimestamp.sub(currentTime).toString()} seconds`,
      );
      return;
    }

    console.log("Delay has expired, proceeding with renunciation");
    const tx = await renounceFunction();
    console.log("renounceFunction tx: ", tx);
    await tx.wait();
    ownershipRenounced = await isRenouncedFunction();
    console.log("ownershipRenounced: ", ownershipRenounced);
  });
