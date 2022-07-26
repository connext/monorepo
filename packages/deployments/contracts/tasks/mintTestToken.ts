import { BigNumber, Contract, utils } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../src/utils";

type TaskArgs = {
  amount: string;
  minimumOnly?: string;
  recipient?: string;
  asset?: string;
  env?: Env;
};

export default task("mint", "Mint test tokens")
  .addParam("amount", "Amount to mint (real units)")
  .addOptionalParam("minimumOnly", "Whether to skip accounts that already have enough")
  .addOptionalParam("recipient", "Override address to mint to; if not provided, will mint to all accounts")
  .addOptionalParam("asset", "Override token address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ minimumOnly: _minimumOnly, recipient, asset: _assetId, amount, env: _env }: TaskArgs, hre) => {
    const minimumOnly = _minimumOnly === "true" ? true : false;
    const signers = await hre.ethers.getSigners();
    const signer = signers[0];
    let accounts = signers.map((signer) => signer.address);
    if (recipient) {
      accounts = [recipient];
    }
    const amountBase = utils.parseUnits(amount, 18);

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("signer: ", signer.address);

    const tokenName = getDeploymentName("TestERC20", env);
    const tokenDeployment = await hre.deployments.get(tokenName);
    const assetId = _assetId ?? tokenDeployment.address;
    console.log("asset address: ", assetId);

    const erc20 = new Contract(assetId, tokenDeployment.abi, signer);

    const balances: Map<string, BigNumber> = await hre.run("read-balances", { asset: assetId });

    const mintTxn = async (recipient: string, amt: BigNumber) => {
      const tx = await erc20.mint(recipient, amt);
      const receipt = await tx.wait();
      console.log(`Minted ${utils.formatUnits(amt, 18)} TEST for ${recipient}`);
      console.log(`  Tx: ${receipt.transactionHash}`);
      const balance: BigNumber = await erc20.balanceOf(recipient);
      console.log("  New balance: ", utils.formatUnits(balance, 18));
    };

    if (minimumOnly) {
      for (const account of accounts) {
        const balance = balances.get(account)!;
        if (balance.lt(amountBase)) {
          const diff: BigNumber = amountBase.sub(balance);
          console.log(`Account ${account} needs ${utils.formatUnits(diff, 18)} more`);
          await mintTxn(account, diff);
        }
      }
    } else {
      for (const account of accounts) {
        await mintTxn(account, amountBase);
      }
    }
  });
