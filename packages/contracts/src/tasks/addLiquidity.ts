import { task } from "hardhat/config";

export default task("add-liquidity", "Add liquidity for a router")
  .addParam("router", "Router address")
  .addParam("asset", "Token address")
  .addParam("amount", "Amount (real units)")
  .addOptionalParam("txmanageraddress", "Override tx manager address")
  .setAction(
    async (
      { asset, router, txmanageraddress: _txmanageraddress, amount },
      { deployments, getNamedAccounts, ethers },
    ) => {
      const namedAccounts = await getNamedAccounts();

      console.log("router: ", router);
      console.log("asset: ", asset);
      console.log("namedAccounts: ", namedAccounts);

      let txmanageraddress = _txmanageraddress;
      if (!txmanageraddress) {
        const txManagerDeployment = await deployments.get("TransactionManager");
        txmanageraddress = txManagerDeployment.address;
      }
      console.log("txmanageraddress: ", txmanageraddress);

      const txManager = await ethers.getContractAt("TransactionManager", txmanageraddress);
      if (asset !== ethers.constants.AddressZero) {
        const erc20 = await ethers.getContractAt("TestERC20", asset);
        const balance = await erc20.balanceOf(namedAccounts.deployer);
        console.log("balance: ", balance.toString());
        if (balance.lt(amount)) {
          throw new Error("Not enough balance");
        }
        const allowance = await erc20.allowance(namedAccounts.deployer, txManager.address);
        if (allowance.lt(amount)) {
          const approveTx = await erc20.approve(txManager.address, ethers.constants.MaxUint256);
          console.log("approveTx: ", approveTx.hash);
          await approveTx.wait();
          console.log("approveTx mined");
        } else {
          console.log(`Sufficient allowance: ${allowance.toString()}`);
        }
      }

      const ownershipRenounced = await txManager.isRouterOwnershipRenounced();
      if (!ownershipRenounced) {
        const approvedRouter = await txManager.approvedRouters(router);
        console.log("approvedRouter: ", approvedRouter);
        if (!approvedRouter) {
          throw new Error("Router not approved");
        }
      }

      const approvedAsset = await txManager.approvedAssets(asset);
      console.log("approvedAsset: ", approvedAsset);
      if (!approvedAsset) {
        throw new Error("Asset not approved");
      }

      const tx = await txManager.addLiquidityFor(amount, asset, router, {
        from: namedAccounts.deployer,
        value: asset === ethers.constants.AddressZero ? amount : 0,
      });
      console.log("addLiquidityFor tx: ", tx);
      const receipt = await tx.wait();
      console.log("addLiquidityFor tx mined: ", receipt.transactionHash);
      const liquidity = await txManager.routerBalances(router, asset);
      console.log("liquidity: ", liquidity.toString());
    },
  );
