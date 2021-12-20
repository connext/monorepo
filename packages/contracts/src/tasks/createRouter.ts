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

    const routerFactory = await ethers.getContractAt("RouterFactory", routerFactoryAddress);
    let routerAddress = await routerFactory.getRouterAddress(signer);

    const [_signer] = await ethers.getSigners();
    const code = await _signer.provider!.getCode(routerAddress);

    if (code !== "0x") {
      console.log("RouterFactory already deployed at: ", routerAddress);
      // return;
    }
    const tx = await routerFactory.createRouter(signer, recipient, { from: namedAccounts.deployer });
    console.log("createRouter tx: ", tx);
    const receipt = await tx.wait();
    console.log("createRouter tx mined: ", receipt.transactionHash);

    routerAddress = await routerFactory.routerAddresses(signer);
    console.log("routerAddress ", routerAddress);
  });
