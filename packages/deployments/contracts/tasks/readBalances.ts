import { BigNumber, constants, utils } from "ethers";
import { task } from "hardhat/config";

import { Env } from "../src/utils";

type TaskArgs = {
  asset?: string;
  env?: Env;
};

export default task("read-balances", "Read balances of accounts")
  .addOptionalParam("asset", "Transacting asset Id")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ asset: _asset, env: _env }: TaskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();
    const asset = _asset ? _asset : constants.AddressZero;

    console.log(`Reading ${accounts.length} accounts`);
    console.log(`  Asset in question: ${asset}`);

    // Read balances
    const balances: Map<string, BigNumber> = new Map();
    for (let i = 0; i < accounts.length; i++) {
      let balance: BigNumber;
      if (asset === constants.AddressZero) {
        balance = await hre.ethers.provider.getBalance(accounts[i].address);
        console.log(`  Balance of ${accounts[i].address}: ${utils.formatEther(balance)}`);
      } else {
        const erc20 = await hre.ethers.getContractAt("TestERC20", asset, accounts[i]);
        balance = await erc20.balanceOf(accounts[i].address);
        console.log(`  Balance of ${accounts[i].address}: ${utils.formatUnits(balance)}`);
      }
      balances.set(accounts[i].address, balance);
    }

    return balances;
  });
