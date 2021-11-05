import { task } from "hardhat/config";

export default task("setup-test-router", "Add router and test assets")
  .addParam("router", "Router address")
  .addOptionalParam("signatureInterpreter", "Override signature interpreter")
  .addOptionalParam("assetId", "Override token address")
  .addOptionalParam("amount", "Override amount (real units)")
  .addOptionalParam("txManagerAddress", "Override tx manager address")
  .setAction(
    async (
      {
        assetId: _assetId,
        router,
        txManagerAddress: _txManagerAddress,
        amount: _amount,
        signatureInterpreter: _signatureInterpreter,
      },
      { deployments, getNamedAccounts, ethers, run },
    ) => {
      console.log("router: ", router);

      const namedAccounts = await getNamedAccounts();
      console.log("namedAccounts: ", namedAccounts);

      const txManagerAddress = _txManagerAddress ?? (await deployments.get("TransactionManager")).address;
      console.log("txManagerAddress: ", txManagerAddress);

      const assetId = _assetId ?? (await deployments.get("TestERC20")).address;
      console.log("assetId:", assetId);

      const signatureInterpreter = _signatureInterpreter ?? (await deployments.get("SignatureInterpreter")).address;
      console.log("signatureInterpreter:", signatureInterpreter);

      const amount = _amount ?? "2500000000000000000000000";
      console.log("amount:", amount);

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

      const isConditionApproved = await txManager.approvedConditions(signatureInterpreter);
      console.log("isConditionApproved: ", isConditionApproved);
      if (!isConditionApproved) {
        await run("add-condition", { condition: signatureInterpreter, txManagerAddress });
      }
      console.log("Condition approved");

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
