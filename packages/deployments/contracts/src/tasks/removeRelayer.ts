import { isAddress } from "ethers/lib/utils";
import { task } from "hardhat/config";

type TaskArgs = {
  relayer: string;
  connextAddress?: string;
};

export default task("remove-relayer", "Remove Relayer from whitelist")
  .addParam("relayer", "The address of relayer to remove")
  .addOptionalParam("connextAddress", "Override connext address")
  .setAction(
    async ({ relayer, connextAddress: _connextAddress }: TaskArgs, { deployments, getNamedAccounts, ethers }) => {
      const namedAccounts = await getNamedAccounts();

      console.log("relayer: ", relayer);

      let connextAddress = _connextAddress;
      if (!connextAddress) {
        const connextDeployment = await deployments.get("Connext");
        connextAddress = connextDeployment.address;
      }
      console.log("connextAddress: ", connextAddress);

      const connext = await ethers.getContractAt("Connext", connextAddress);

      if (!isAddress(relayer) || relayer === ethers.constants.AddressZero) {
        throw new Error("Invalid Relayer address");
      }

      const approvedRelayer = await connext.approvedRelayer(relayer);
      console.log("approvedRelayer: ", approvedRelayer);
      if (!approvedRelayer) {
        throw new Error("Not approved relayer");
      }

      const tx = await connext.removeRelayer(relayer, {
        from: namedAccounts.deployer,
      });
      console.log("removeRelayer tx: ", tx);
      const receipt = await tx.wait();
      console.log("removeRelayer tx mined: ", receipt.transactionHash);
    },
  );
