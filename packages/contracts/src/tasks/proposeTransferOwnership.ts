import { task } from "hardhat/config";

export default task("propose-transfer-owner", "Propose Transfer Ownership")
  .addParam("newOwner", "New owner")
  .addOptionalParam("txManagerAddress", "Override tx manager address")
  .setAction(async ({ newOwner, txManagerAddress: _txManagerAddress }, { deployments, getNamedAccounts, ethers }) => {
    const namedAccounts = await getNamedAccounts();

    console.log("newOwner: ", newOwner);
    console.log("namedAccounts: ", namedAccounts);

    let txManagerAddress = _txManagerAddress;
    if (!txManagerAddress) {
      const txManagerDeployment = await deployments.get("TransactionManager");
      txManagerAddress = txManagerDeployment.address;
    }
    console.log("txManagerAddress: ", txManagerAddress);

    const txManager = await ethers.getContractAt("TransactionManager", txManagerAddress);
    const tx = await txManager.proposeNewOwner(newOwner);
    console.log("proposeNewOwner tx: ", tx);
    await tx.wait();
    const proposedOwner = await txManager.proposed();
    console.log("proposedOwner: ", proposedOwner);
  });
