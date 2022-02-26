import { task } from "hardhat/config";

export default task("set-direct-price", "Set price directly")
  .addParam("token", "Token addresses")
  .addParam("price", "Direct price")
  .setAction(async ({ token, price }, { deployments, getNamedAccounts, ethers }) => {
    const namedAccounts = await getNamedAccounts();

    console.log("token: ", token);
    console.log("price: ", price);

    const cxtPriceOracleDeployment = await deployments.get("ConnextPriceOracle");

    console.log("PriceOracle: ", cxtPriceOracleDeployment.address);

    const priceOracle = await ethers.getContractAt("ConnextPriceOracle", cxtPriceOracleDeployment.address);
    const tx = await priceOracle.setDirectPrice(token, price, { from: namedAccounts.deployer });
    console.log("setDirectPrice tx: ", tx);
    const receipt = await tx.wait();
    console.log("setDirectPrice tx mined: ", receipt.transactionHash);
  });
