import { task } from "hardhat/config";

type TaskArgs = {
  signer: string;
  recipient: string;
  routerFactoryAddress?: string;
};

export default task("create-router", "create a router")
  .addParam("signer", "The router's signer address")
  .addParam("recipient", "recipient address")
  .addOptionalParam("routerFactoryAddress", "Override tx manager address")
  .setAction(
    async (
      { signer, recipient, routerFactoryAddress: _routerFactoryAddress }: TaskArgs,
      { deployments, ethers, run },
    ) => {
      const deployer = await ethers.getNamedSigner("deployer");

      console.log("signer: ", signer);
      console.log("recipient: ", recipient);

      console.log("deployer: ", deployer.address);

      let routerFactoryAddress = _routerFactoryAddress;
      if (!routerFactoryAddress) {
        const routerFactoryDeployment = await deployments.get("RouterFactory");
        routerFactoryAddress = routerFactoryDeployment.address;
      }
      console.log("routerFactoryAddress: ", routerFactoryAddress);

      const routerFactory = await ethers.getContractAt("RouterFactory", routerFactoryAddress);
      let routerAddress: string = await routerFactory.getRouterAddress(signer);

      const code = await deployer.provider!.getCode(routerAddress);

      if (code !== "0x") {
        console.log("RouterFactory already deployed at: ", routerAddress);
        return;
      }
      const tx = await routerFactory.createRouter(signer, recipient, { from: deployer.address });
      console.log("createRouter tx: ", tx);
      const receipt = await tx.wait();
      console.log("createRouter tx mined: ", receipt.transactionHash);

      routerAddress = await routerFactory.routerAddresses(signer);
      console.log("routerAddress ", routerAddress);

      try {
        console.log("attempting to verify on explorer");
        await run("verify:verify", {
          address: routerAddress,
          constructorArguments: [routerFactoryAddress],
        });
      } catch (e: unknown) {
        console.log("verification failed:", e);
      }
    },
  );
