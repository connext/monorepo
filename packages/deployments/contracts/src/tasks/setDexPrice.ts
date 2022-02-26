import { task } from "hardhat/config";

export default task("set-dex-price", "Set dex price information")
  .addParam("token", "Token addresses")
  .addParam("baseToken", "Base token address")
  .addParam("lpToken", "Liquidity Provider token address")
  .addParam("active", "Makes a record active")
  .setAction(async ({ token, baseToken, lpToken, active }, { deployments, getNamedAccounts, ethers }) => {
    const namedAccounts = await getNamedAccounts();

    console.log("token: ", token);
    console.log("baseToken: ", baseToken);
    console.log("lpToken: ", lpToken);
    console.log("active: ", active);
    console.log("namedAccounts: ", namedAccounts);

    const cxtPriceOracleDeployment = await deployments.get("ConnextPriceOracle");

    console.log("PriceOracle: ", cxtPriceOracleDeployment.address);

    const priceOracle = await ethers.getContractAt("ConnextPriceOracle", cxtPriceOracleDeployment.address);
    const tx = await priceOracle.setDexPriceInfo(token, baseToken, lpToken, active, { from: namedAccounts.deployer });
    console.log("setDexPriceInfo tx: ", tx);
    const receipt = await tx.wait();
    console.log("setDexPriceInfo tx mined: ", receipt.transactionHash);
  });
