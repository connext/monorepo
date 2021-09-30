import { task } from "hardhat/config";

export default task("set-aggregator", "Set an aggregator")
  .addParam("tokenAddresses", "Token addresses")
  .addParam("sources", "Chainlink sources")
  .setAction(async ({ tokenAddresses, sources }, { deployments, getNamedAccounts, ethers }) => {
    const namedAccounts = await getNamedAccounts();

    console.log("tokenAddresses: ", tokenAddresses);
    console.log("sources: ", sources);
    console.log("namedAccounts: ", namedAccounts);

    const _tokenAddresses = tokenAddresses.split(",");
    const _sources = sources.split(",");

    const cxtPriceOracleDeployment = await deployments.get("ConnextPriceOracle");

    console.log("PriceOracle: ", cxtPriceOracleDeployment.address);

    const priceOracle = await ethers.getContractAt("ConnextPriceOracle", cxtPriceOracleDeployment.address);
    const tx = await priceOracle.setAggregators(_tokenAddresses, _sources, { from: namedAccounts.deployer });
    console.log("setAggregator tx: ", tx);
    const receipt = await tx.wait();
    console.log("setAggregator tx mined: ", receipt.transactionHash);
  });
