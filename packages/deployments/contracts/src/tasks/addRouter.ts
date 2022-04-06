import { task } from "hardhat/config";

type TaskArgs = {
  router: string;
  connextAddress?: string;
};

export default task("add-router", "Add a router")
  .addParam("router", "The router's address to add")
  .addOptionalParam("connextAddress", "Override connext address")
  .setAction(
    async ({ router, connextAddress: _connextAddress }: TaskArgs, { deployments, getNamedAccounts, ethers }) => {
      const namedAccounts = await getNamedAccounts();

      console.log("router: ", router);
      console.log("namedAccounts: ", namedAccounts);

      let connextAddress = _connextAddress;
      if (!connextAddress) {
        const connextDeployment = await deployments.get("Connext");
        connextAddress = connextDeployment.address;
      }
      console.log("connextAddress: ", connextAddress);

      const connext = await ethers.getContractAt("Connext", connextAddress);
      const approved = await connext.approvedRouters(router);
      if (approved) {
        console.log("approved, no need to add");
        return;
      }

      const tx = await connext.addRouter(router, { from: namedAccounts.deployer });
      console.log("addRouter tx: ", tx);
      const receipt = await tx.wait();
      console.log("addRouter tx mined: ", receipt.transactionHash);

      const isRouterApproved = await connext.approvedRouters(router);
      console.log("isRouterApproved: ", isRouterApproved);
    },
  );
