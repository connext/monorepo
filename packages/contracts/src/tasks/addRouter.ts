import { task } from "hardhat/config";

export default task("add-router", "Add a router")
  .addParam("router", "The router's address to add")
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
    const tx = await txManager.addRouter(router, { from: namedAccounts.deployer });
    console.log("addRouter tx: ", tx);
  });
