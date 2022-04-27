import { Contract } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../utils";

type TaskArgs = {
  token: string;
  baseToken: string;
  lpToken: string;
  active: string;
  env?: Env;
};

export default task("set-dex-price", "Set dex price information")
  .addParam("token", "Token addresses")
  .addParam("baseToken", "Base token address")
  .addParam("lpToken", "Liquidity Provider token address")
  .addParam("active", "Makes a record active")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ token, baseToken, lpToken, active, env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("token: ", token);
    console.log("baseToken: ", baseToken);
    console.log("lpToken: ", lpToken);
    console.log("active: ", active);
    console.log("deployer: ", deployer.address);

    const cxtPriceOracleDeployment = await deployments.get(getDeploymentName("ConnextPriceOracle", env));
    console.log("PriceOracle: ", cxtPriceOracleDeployment.address);
    const priceOracle = new Contract(cxtPriceOracleDeployment.address, cxtPriceOracleDeployment.abi, deployer);
    const tx = await priceOracle.setDexPriceInfo(token, baseToken, lpToken, active);
    console.log("setDexPriceInfo tx: ", tx);
    const receipt = await tx.wait();
    console.log("setDexPriceInfo tx mined: ", receipt.transactionHash);
  });
