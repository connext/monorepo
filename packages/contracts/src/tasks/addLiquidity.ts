import { task } from "hardhat/config";

export default task("add-liquidity", "Add liquidity for a router")
  .addParam("router", "Router address")
  .addParam("assetId", "Token address")
  .addParam("amount", "Amount (real units)")
  .addOptionalParam("txManagerAddress", "Override tx manager address")
  .setAction(
    async (
      { assetId, router, txManagerAddress: _txManagerAddress, amount },
      { deployments, getNamedAccounts, ethers },
    ) => {
      const namedAccounts = await getNamedAccounts();

      console.log("router: ", router);
      console.log("assetId: ", assetId);
      console.log("namedAccounts: ", namedAccounts);

      let txManagerAddress = _txManagerAddress;
      if (!txManagerAddress) {
        const txManagerDeployment = await deployments.get("TransactionManager");
        txManagerAddress = txManagerDeployment.address;
      }
      console.log("txManagerAddress: ", txManagerAddress);

      const txManager = await ethers.getContractAt("TransactionManager", txManagerAddress);
      if (assetId !== ethers.constants.AddressZero) {
        const erc20 = await ethers.getContractAt("TestERC20", assetId);
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

      const approvedRouter = await txManager.approvedRouters(router);
      console.log("approvedRouter: ", approvedRouter);
      if (!approvedRouter) {
        throw new Error("Router not approved");
      }

      const approvedAsset = await txManager.approvedAssets(assetId);
      console.log("approvedAsset: ", approvedAsset);
      if (!approvedAsset) {
        throw new Error("Asset not approved");
      }

      const tx = await txManager.addLiquidityFor(amount, assetId, router, {
        from: namedAccounts.deployer,
        value: assetId === ethers.constants.AddressZero ? amount : 0,
      });
      console.log("addLiquidity tx: ", tx);
      const receipt = await tx.wait();
      console.log("addLiquidity tx mined: ", receipt.transactionHash);
      const liquidity = await txManager.routerBalances(router, assetId);
      console.log("liquidity: ", liquidity.toString());
    },
  );
