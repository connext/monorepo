import { Wallet } from "ethers";
import { task } from "hardhat/config";

export default task("mint", "Mint test tokens")
  .addParam("amount", "Amount (real units)")
  .addParam("mintto", "Override address to mint to")
  .addOptionalParam("assetid", "Override token address")
  .setAction(async ({ mintto: mintTo, assetid: _assetId, amount }, { deployments, getNamedAccounts, ethers }) => {
    const namedAccounts = await getNamedAccounts();
    console.log("namedAccounts: ", namedAccounts);

    let assetIdAddress = _assetId;
    if (!assetIdAddress) {
      const assetIdDeployment = await deployments.get("TestERC20");
      assetIdAddress = assetIdDeployment.address;
    }
    console.log("asset address: ", assetIdAddress);
    console.log("mint to: ", mintTo);

    const erc20 = await ethers.getContractAt("TestERC20", assetIdAddress);
    const tx = await erc20.mint(mintTo, amount, { from: namedAccounts.deployer });
    console.log("mint tx: ", tx);
    const receipt = await tx.wait();
    console.log("mint tx mined: ", receipt.transactionHash);

    const balance = await erc20.balanceOf(mintTo);
    console.log("balance: ", balance.toString());
  });
