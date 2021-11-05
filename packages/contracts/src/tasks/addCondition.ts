import { task } from "hardhat/config";

export default task("add-condition", "Add a condition")
  .addParam("condition", "Condition address")
  .addOptionalParam("txManagerAddress", "Override tx manager address")
  .setAction(async ({ condition, txManagerAddress: _txManagerAddress }, { deployments, getNamedAccounts, ethers }) => {
    const namedAccounts = await getNamedAccounts();

    console.log("condition: ", condition);
    console.log("namedAccounts: ", namedAccounts);

    const txManagerAddress = _txManagerAddress ?? (await deployments.get("TransactionManager")).address;
    console.log("txManagerAddress: ", txManagerAddress);

    const txManager = await ethers.getContractAt("TransactionManager", txManagerAddress);
    const approved = await txManager.approvedConditions(condition);
    if (approved) {
      console.log("approved, no need to add");
      return;
    }
    const tx = await txManager.addCondition(condition, { from: namedAccounts.deployer });

    console.log("addCondition tx: ", tx);
    const receipt = await tx.wait();
    console.log("addCondition tx mined: ", receipt.transactionHash);

    const isConditionApproved = await txManager.approvedConditions(condition);
    console.log("isConditionApproved: ", isConditionApproved);
  });
