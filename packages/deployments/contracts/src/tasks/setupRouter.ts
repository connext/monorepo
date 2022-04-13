import { constants } from "ethers";
import { task } from "hardhat/config";

type TaskArgs = {
  router: string;
  owner?: string;
  recipient: string;
  connextAddress?: string;
};

export default task("setup-router", "Setup a router")
  .addParam("router", "The router's address to add")
  .addOptionalParam("owner", "The router owner's address")
  .addOptionalParam("recipient", "The rotuer recipient's address")
  .addOptionalParam("connextAddress", "Override connext address")
  .setAction(
    async (
      { router, owner: _owner, recipient: _recipient, connextAddress: _connextAddress }: TaskArgs,
      { deployments, getNamedAccounts, ethers },
    ) => {
      const namedAccounts = await getNamedAccounts();

      console.log("router: ", router);
      console.log("owner: ", _owner);
      console.log("recipient: ", _recipient);
      console.log("namedAccounts: ", namedAccounts);

      const recipient = _recipient || constants.AddressZero;
      const owner = _owner || constants.AddressZero;

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

      const tx = await connext.setupRouter(router, owner, recipient, { from: namedAccounts.deployer });
      console.log("setupRouter tx: ", tx);
      const receipt = await tx.wait();
      console.log("setupRouter tx mined: ", receipt.transactionHash);

      const isRouterApproved = await connext.approvedRouters(router);
      console.log("isRouterApproved: ", isRouterApproved);
    },
  );
