import { isAddress } from "ethers/lib/utils";
import { task } from "hardhat/config";

type TaskArgs = {
  relayer: string;
  connextAddress?: string;
};

export default task("add-relayer", "Add Relayer to whitelist")
  .addParam("relayer", "The address of relayer to add")
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

      const approvedRelayer = await connext.approvedRelayers(relayer);
      console.log("approvedRelayer: ", approvedRelayer);
      if (approvedRelayer) {
        throw new Error("Already approved relayer");
      }

      const tx = await connext.addRelayer(relayer, {
        from: namedAccounts.deployer,
      });
      console.log("addRelayer tx: ", tx);
      const receipt = await tx.wait();
      console.log("addRelayer tx mined: ", receipt.transactionHash);
    },
  );
