import { Contract } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../utils";

type TaskArgs = {
  token: string;
  price: string;
  env?: Env;
};

export default task("set-direct-price", "Set price directly")
  .addParam("token", "Token addresses")
  .addParam("price", "Direct price")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ token, price, env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("token: ", token);
    console.log("price: ", price);

    const cxtPriceOracleDeployment = await deployments.get(getDeploymentName("ConnextPriceOracle", env));

    console.log("PriceOracle: ", cxtPriceOracleDeployment.address);

    const priceOracle = new Contract(cxtPriceOracleDeployment.address, cxtPriceOracleDeployment.abi, deployer);

    const tx = await priceOracle.setDirectPrice(token, price);
    console.log("setDirectPrice tx: ", tx);
    const receipt = await tx.wait();
    console.log("setDirectPrice tx mined: ", receipt.transactionHash);
  });
