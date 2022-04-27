import { Contract } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../utils";

type TaskArgs = {
  amount: string;
  receiver: string;
  asset?: string;
  env?: Env;
};

export default task("mint", "Mint test tokens")
  .addParam("amount", "Amount (real units)")
  .addParam("receiver", "Override address to mint to")
  .addOptionalParam("asset", "Override token address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ receiver, asset: _assetId, amount, env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("deployer: ", deployer.address);

    const tokenName = getDeploymentName("TestERC20", env);
    const tokenDeployment = await deployments.get(tokenName);
    const assetId = _assetId ?? tokenDeployment.address;
    console.log("asset address: ", assetId);
    console.log("receiver: ", receiver);

    const erc20 = new Contract(assetId, tokenDeployment.abi, deployer);
    const tx = await erc20.mint(receiver, amount);
    console.log("mint tx: ", tx);
    const receipt = await tx.wait(1);
    console.log("mint tx mined: ", receipt.transactionHash);

    const balance = await erc20.balanceOf(receiver);
    console.log("balance: ", balance.toString());
  });
