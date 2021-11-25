import { task } from "hardhat/config";

export default task("create-router", "create a router")
  .addParam("signer", "The router's signer address")
  .addParam("recipient", "recipient address")
  .setAction(async ({ signer, recipient }, { deployments, getNamedAccounts, ethers }) => {
    const namedAccounts = await getNamedAccounts();

    console.log("signer: ", signer);
    console.log("recipient: ", recipient);

    console.log("namedAccounts: ", namedAccounts);

    const routerFactoryDeployment = await deployments.get("RouterFactory");
    const routerFactoryAddress = routerFactoryDeployment.address;

    console.log("routerFactoryAddress: ", routerFactoryAddress);

    const routerFactory = await ethers.getContractAt("RouterFactory", routerFactoryAddress);
    const tx = await routerFactory.createRouter(signer, recipient, { from: namedAccounts.deployer });
    console.log("createRouter tx: ", tx);
    const receipt = await tx.wait();
    console.log("createRouter tx mined: ", receipt.transactionHash);

    const routerAddress = await routerFactory.routerAddresses(signer);
    console.log("routerAddress ", routerAddress);
  });
