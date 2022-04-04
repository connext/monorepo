import { task } from "hardhat/config";

type TaskArgs = {
  router: string;
  connextAddress?: string;
};

export default task("remove-router", "Remove a router")
  .addParam("router", "The router's address to remove")
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
      if (!approved) {
        console.log("not approved, no need to remove");
        return;
      }
      const tx = await connext.removeRouter(router, { from: namedAccounts.deployer });
      console.log("removeRouter tx: ", tx);
      const receipt = await tx.wait();
      console.log("removeRouter tx mined: ", receipt.transactionHash);

      const isRouterApproved = await connext.approvedRouters(router);
      console.log("isRouterApproved: ", isRouterApproved);
    },
  );
