import { BigNumber, Contract, utils } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../src/utils";

type TaskArgs = {
  amount: string;
  recipient?: string;
  asset?: string;
  env?: Env;
};

export default task("mint", "Mint test tokens")
  .addParam("amount", "Amount to mint (real units)")
  .addOptionalParam("recipient", "Override address to mint to; if not provided, will mint to all accounts")
  .addOptionalParam("asset", "Override token address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ recipient, asset: _assetId, amount, env: _env }: TaskArgs, { deployments, ethers }) => {
    const [signer, ...accounts] = await ethers.getSigners();

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("signer: ", signer.address);

    const tokenName = getDeploymentName("TestERC20", env);
    const tokenDeployment = await deployments.get(tokenName);
    const assetId = _assetId ?? tokenDeployment.address;
    console.log("asset address: ", assetId);

    const erc20 = new Contract(assetId, tokenDeployment.abi, signer);
    const decimals: BigNumber = await erc20.decimals();

    const mintTxn = async (recipient: string) => {
      const tx = await erc20.mint(recipient, utils.parseUnits(amount, decimals));
      const receipt = await tx.wait(1);
      console.log(`Minted ${amount} TEST for ${recipient}`);
      console.log(`  Tx: ${receipt.transactionHash}`);
      const balance = await erc20.balanceOf(recipient);
      console.log("  New balance: ", balance.toString());
    };

    // Recipient provided, just mint to that address
    if (recipient) {
      await mintTxn(recipient);
      return;
    }

    console.log("number of accounts: ", accounts.length);
    console.log("amount to each account: ", amount);

    // Mint to each account in the wallet if recipient unspecified
    for (let i = 0; i < accounts.length; i++) {
      await mintTxn(accounts[i].address);
    }
  });
