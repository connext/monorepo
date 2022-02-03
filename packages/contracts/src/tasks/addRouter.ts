import { task } from "hardhat/config";

export default task("add-router", "Add a router")
  .addParam("router", "The router's address to add")
  .addOptionalParam("txmanageraddress", "Override tx manager address")
  .setAction(async ({ router, txmanageraddress: _txmanageraddress }, { deployments, getNamedAccounts, ethers }) => {
    const namedAccounts = await getNamedAccounts();

    console.log("router: ", router);
    console.log("namedAccounts: ", namedAccounts);

    let txmanageraddress = _txmanageraddress;
    if (!txmanageraddress) {
      const txManagerDeployment = await deployments.get("TransactionManager");
      txmanageraddress = txManagerDeployment.address;
    }
    console.log("txmanageraddress: ", txmanageraddress);

    const txManager = await ethers.getContractAt("TransactionManager", txmanageraddress);

    const ownershipRenounced = await txManager.isRouterOwnershipRenounced();
    if (ownershipRenounced) {
      console.log("Ownership has been renounced already, no need for approval");
      return;
    }

    const approved = await txManager.approvedRouters(router);
    if (approved) {
      console.log("approved, no need to add");
      return;
    }

    const tx = await txManager.addRouter(router, { from: namedAccounts.deployer });
    console.log("addRouter tx: ", tx);
    const receipt = await tx.wait();
    console.log("addRouter tx mined: ", receipt.transactionHash);

    const isRouterApproved = await txManager.approvedRouters(router);
    console.log("isRouterApproved: ", isRouterApproved);
  });
