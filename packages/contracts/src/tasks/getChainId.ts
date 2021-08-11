import { task } from "hardhat/config";

export default task("get-chain-id", "Get chainId")
  .addOptionalParam("txManagerAddress", "Override tx manager address")
  .setAction(async ({ txManagerAddress: _txManagerAddress }, { deployments, getNamedAccounts, ethers }) => {
    const namedAccounts = await getNamedAccounts();

    console.log("namedAccounts: ", namedAccounts);

    let txManagerAddress = _txManagerAddress;
    if (!txManagerAddress) {
      const txManagerDeployment = await deployments.get("TransactionManager");
      txManagerAddress = txManagerDeployment.address;
    }
    console.log("txManagerAddress: ", txManagerAddress);

    const txManager = await ethers.getContractAt("TransactionManager", txManagerAddress);
    const chainId = await txManager.chainId();
    console.log("chainId: ", chainId.toString());
  });
