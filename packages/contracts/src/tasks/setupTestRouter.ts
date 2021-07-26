import { task } from "hardhat/config";

export default task("setup-test-router", "Add router and test assets")
  .addParam("router", "Router address")
  .addOptionalParam("assetId", "Override token address")
  .addOptionalParam("amount", "Override amount (real units)")
  .addOptionalParam("txManagerAddress", "Override tx manager address")
  .setAction(
    async (
      { assetId: _assetId, router, txManagerAddress: _txManagerAddress, amount: _amount },
      { deployments, getNamedAccounts, ethers, run },
    ) => {
      console.log("router: ", router);

      const namedAccounts = await getNamedAccounts();
      console.log("namedAccounts: ", namedAccounts);

      let txManagerAddress = _txManagerAddress;
      if (!txManagerAddress) {
        const txManagerDeployment = await deployments.get("TransactionManager");
        txManagerAddress = txManagerDeployment.address;
      }
      console.log("txManagerAddress: ", txManagerAddress);

      let assetId = _assetId;
      if (!_assetId) {
        const assetIdDeployment = await deployments.get("TestERC20");
        assetId = assetIdDeployment.address;
      }

      let amount = _amount;
      if (!amount) {
        amount = "2500000000000000000000000";
      }

      const txManager = await ethers.getContractAt("TransactionManager", txManagerAddress);

      const isRouterApproved = await txManager.approvedRouters(router);
      console.log("isRouterApproved: ", isRouterApproved);
      if (!isRouterApproved) {
        await run("add-router", { router, txManagerAddress });
      }
      console.log("Router approved");

      const isAssetApproved = await txManager.approvedAssets(assetId);
      console.log("isAssetApproved: ", isAssetApproved);
      if (!isAssetApproved) {
        await run("add-asset", { assetId, txManagerAddress });
      }
      console.log("Asset approved");

      if (assetId !== ethers.constants.AddressZero) {
        const erc20 = await ethers.getContractAt("TestERC20", assetId);
        const balance = await erc20.balanceOf(namedAccounts.deployer);
        console.log("balance: ", balance.toString());
        if (balance.lt(amount)) {
          await run("mint", { amount, assetId, txManagerAddress });
        }
      }

      await run("add-liquidity", { router, assetId, amount, txManagerAddress });
    },
  );
