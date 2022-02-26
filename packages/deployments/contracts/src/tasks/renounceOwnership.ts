import { BigNumber } from "ethers";
import { task } from "hardhat/config";

export default task("renounce-ownership", "Renounce Ownership")
  .addParam("type", "Type of ownership to renounce, either asset or router")
  .addOptionalParam("txManagerAddress", "Override tx manager address")
  .setAction(async ({ type, txManagerAddress: _txManagerAddress }, { deployments, getNamedAccounts, ethers }) => {
    const namedAccounts = await getNamedAccounts();

    console.log("type: ", type);
    console.log("namedAccounts: ", namedAccounts);

    let txManagerAddress = _txManagerAddress;
    if (!txManagerAddress) {
      const txManagerDeployment = await deployments.get("TransactionManager");
      txManagerAddress = txManagerDeployment.address;
    }
    console.log("txManagerAddress: ", txManagerAddress);

    const txManager = await ethers.getContractAt("TransactionManager", txManagerAddress);
    let isRenouncedFunction;
    let ownershipTimestampFunction;
    // let proposeRenunciationFunction;
    let renounceFunction;
    if (type === "router") {
      isRenouncedFunction = txManager.isRouterOwnershipRenounced;
      ownershipTimestampFunction = txManager.routerOwnershipTimestamp;
      // proposeRenunciationFunction = txManager.proposeRouterOwnershipRenunciation;
      renounceFunction = txManager.renounceRouterOwnership;
    } else if (type === "asset") {
      isRenouncedFunction = txManager.isAssetOwnershipRenounced;
      ownershipTimestampFunction = txManager.assetOwnershipTimestamp;
      // proposeRenunciationFunction = txManager.proposeAssetOwnershipRenunciation;
      renounceFunction = txManager.renounceAssetOwnership;
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

    // bug in contracts doesnt check for zero
    // if (ownershipTimestamp.isZero()) {
    //   console.log("Proposing renunciation");
    //   const tx = await proposeRenunciationFunction();
    //   console.log("proposeRenunciationFunction tx: ", tx);
    //   await tx.wait();
    //   const ownershipTimestamp = await ownershipTimestampFunction();
    //   console.log("ownershipTimestamp: ", ownershipTimestamp);
    //   return;
    // }

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
