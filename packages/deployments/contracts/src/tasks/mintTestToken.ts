import { task } from "hardhat/config";

type TaskArgs = {
  amount: string;
  receiver: string;
  asset?: string;
};

export default task("mint", "Mint test tokens")
  .addParam("amount", "Amount (real units)")
  .addParam("receiver", "Override address to mint to")
  .addOptionalParam("asset", "Override token address")
  .setAction(async ({ receiver, asset: _assetId, amount }: TaskArgs, { deployments, getNamedAccounts, ethers }) => {
    const namedAccounts = await getNamedAccounts();
    console.log("namedAccounts: ", namedAccounts);

    let assetIdAddress = _assetId;
    if (!assetIdAddress) {
      const assetIdDeployment = await deployments.get("TestERC20");
      assetIdAddress = assetIdDeployment.address;
    }
    console.log("asset address: ", assetIdAddress);
    console.log("receiver: ", receiver);

    const erc20 = await ethers.getContractAt("TestERC20", assetIdAddress);
    const tx = await erc20.mint(receiver, amount, {
      from: namedAccounts.deployer,
    });
    console.log("mint tx: ", tx);
    const receipt = await tx.wait(1);
    console.log("mint tx mined: ", receipt.transactionHash);

    const balance = await erc20.balanceOf(receiver);
    console.log("balance: ", balance.toString());
  });
