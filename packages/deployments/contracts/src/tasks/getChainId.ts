import { task } from "hardhat/config";

type TaskArgs = {
  connextAddress?: string;
};

export default task("get-chain-id", "Get chainId")
  .addOptionalParam("connextAddress", "Override tx manager address")
  .setAction(async ({ connextAddress: _connextAddress }: TaskArgs, { deployments, getNamedAccounts, ethers }) => {
    const namedAccounts = await getNamedAccounts();

    console.log("namedAccounts: ", namedAccounts);

    let connextAddress = _connextAddress;
    if (!connextAddress) {
      const connextDeployment = await deployments.get("Connext_Proxy");
      connextAddress = connextDeployment.address;
    }
    console.log("connextAddress: ", connextAddress);

    const connext = await ethers.getContractAt("Connext_Implementation", connextAddress);
    const chainId = await connext.getChainId();
    console.log("chainId: ", chainId.toString());
  });
