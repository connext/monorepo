import { task } from "hardhat/config";

export default task("add-asset", "Add a asset")
  .addParam("asset", "Token address")
  .addOptionalParam("txManagerAddress", "Override tx manager address")
  .setAction(async ({ asset, txManagerAddress: _txManagerAddress }, { deployments, getNamedAccounts, ethers }) => {
    const namedAccounts = await getNamedAccounts();

    console.log("asset: ", asset);
    console.log("namedAccounts: ", namedAccounts);

    let txManagerAddress = _txManagerAddress;
    if (!txManagerAddress) {
      const txManagerDeployment = await deployments.get("TransactionManager");
      txManagerAddress = txManagerDeployment.address;
    }
    console.log("txManagerAddress: ", txManagerAddress);

    const txManager = await ethers.getContractAt("TransactionManager", txManagerAddress);
    const approved = await txManager.approvedAssets(asset);
    if (approved) {
      console.log("approved, no need to add");
      return;
    }
    const tx = await txManager.addAssetId(asset, { from: namedAccounts.deployer });

    console.log("addAssetId tx: ", tx);
    const receipt = await tx.wait();
    console.log("addAssetId tx mined: ", receipt.transactionHash);

    const isAssetApproved = await txManager.approvedAssets(asset);
    console.log("isAssetApproved: ", isAssetApproved);
  });
