import { Contract } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../src/utils";

type TaskArgs = {
  tokenAddresses: string;
  sources: string;
  env?: Env;
};

export default task("set-aggregator", "Set an aggregator")
  .addParam("tokenAddresses", "Token addresses")
  .addParam("sources", "Chainlink sources")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ tokenAddresses, sources, env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("tokenAddresses: ", tokenAddresses);
    console.log("sources: ", sources);
    console.log("deployer: ", deployer.address);

    const _tokenAddresses = tokenAddresses.split(",");
    const _sources = sources.split(",");

    const cxtPriceOracleDeployment = await deployments.get(getDeploymentName("ConnextPriceOracle", env));
    console.log("PriceOracle: ", cxtPriceOracleDeployment.address);

    const priceOracle = new Contract(cxtPriceOracleDeployment.address, cxtPriceOracleDeployment.abi, deployer);
    const tx = await priceOracle.setAggregators(_tokenAddresses, _sources);
    console.log("setAggregator tx: ", tx);
    const receipt = await tx.wait();
    console.log("setAggregator tx mined: ", receipt.transactionHash);
  });
