import { task } from "hardhat/config";

import { TestERC20 } from "../../typechain";

export default task("mint", "Mint test tokens")
  .addParam("amount", "Amount (real units)")
  .addOptionalParam("mintTo", "Override address to mint to")
  .addOptionalParam("assetId", "Override token address")
  .addOptionalParam("txManagerAddress", "Override tx manager address")
  .setAction(
    async (
      { mintTo: _mintTo, assetId: _assetId, txManagerAddress: _txManagerAddress, amount },
      { deployments, getNamedAccounts, ethers },
    ) => {
      const namedAccounts = await getNamedAccounts();
      console.log("namedAccounts: ", namedAccounts);

      let txManagerAddress = _txManagerAddress;
      if (!txManagerAddress) {
        const txManagerDeployment = await deployments.get("TransactionManager");
        txManagerAddress = txManagerDeployment.address;
      }
      console.log("txManagerAddress: ", txManagerAddress);

      let assetIdAddress = _assetId;
      if (!assetIdAddress) {
        const assetIdDeployment = await deployments.get("TestERC20");
        assetIdAddress = assetIdDeployment.address;
      }
      console.log("assetIdAddress: ", assetIdAddress);

      const mintTo = _mintTo ?? namedAccounts.deployer;
      console.log("mintTo: ", mintTo);

      const erc20: TestERC20 = await ethers.getContractAt("TestERC20", assetIdAddress);
      const tx = await erc20.mint(mintTo, amount, { from: namedAccounts.deployer });
      console.log("mint tx: ", tx);
      const receipt = await tx.wait();
      console.log("mint tx mined: ", receipt.transactionHash);

      const balance = await erc20.balanceOf(mintTo);
      console.log("balance: ", balance.toString());
    },
  );
