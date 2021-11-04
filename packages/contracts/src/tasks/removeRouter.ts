import { task } from "hardhat/config";

export default task("remove-router", "Remove a router")
  .addParam("router", "The router's address to remove")
  .addOptionalParam("txManagerAddress", "Override tx manager address")
  .setAction(async ({ router, txManagerAddress: _txManagerAddress }, { deployments, getNamedAccounts, ethers }) => {
    const namedAccounts = await getNamedAccounts();

    console.log("router: ", router);
    console.log("namedAccounts: ", namedAccounts);

    let txManagerAddress = _txManagerAddress;
    if (!txManagerAddress) {
      const txManagerDeployment = await deployments.get("TransactionManager");
      txManagerAddress = txManagerDeployment.address;
    }
    console.log("txManagerAddress: ", txManagerAddress);

    const txManager = await ethers.getContractAt("TransactionManager", txManagerAddress);
    const approved = await txManager.approvedRouters(router);
    if (!approved) {
      console.log("not approved, no need to remove");
      return;
    }
    const tx = await txManager.removeRouter(router, { from: namedAccounts.deployer });
    console.log("removeRouter tx: ", tx);
    const receipt = await tx.wait();
    console.log("removeRouter tx mined: ", receipt.transactionHash);

    const isRouterApproved = await txManager.approvedRouters(router);
    console.log("isRouterApproved: ", isRouterApproved);
  });
