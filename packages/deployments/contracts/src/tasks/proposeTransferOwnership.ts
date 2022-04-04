import { task } from "hardhat/config";

type TaskArgs = {
  newOwner: string;
  connextAddress?: string;
};

export default task("propose-transfer-owner", "Propose Transfer Ownership")
  .addParam("newOwner", "New owner")
  .addOptionalParam("connextAddress", "Override connext address")
  .setAction(
    async ({ newOwner, connextAddress: _connextAddress }: TaskArgs, { deployments, getNamedAccounts, ethers }) => {
      const namedAccounts = await getNamedAccounts();

      console.log("newOwner: ", newOwner);
      console.log("namedAccounts: ", namedAccounts);

      let connextAddress = _connextAddress;
      if (!connextAddress) {
        const connextDeployment = await deployments.get("Connext");
        connextAddress = connextDeployment.address;
      }
      console.log("connextAddress: ", connextAddress);

      const connext = await ethers.getContractAt("Connext", connextAddress);
      const tx = await connext.proposeNewOwner(newOwner);
      console.log("proposeNewOwner tx: ", tx);
      await tx.wait();
      const proposedOwner = await connext.proposed();
      console.log("proposedOwner: ", proposedOwner);
    },
  );
