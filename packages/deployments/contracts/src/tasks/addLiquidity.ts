import { task } from "hardhat/config";

export default task("add-liquidity", "Add liquidity for a router")
  .addParam("router", "Router address")
  .addParam("assetId", "Local token address")
  .addParam("amount", "Amount (real units)")
  .addOptionalParam("txManagerAddress", "Override tx manager address")
  .addOptionalParam("tokenRegistryAddress", "Override token registry address")
  .setAction(
    async (
      { assetId, router, txManagerAddress: _txManagerAddress, amount, tokenRegistryAddress: _tokenRegistryAddress },
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

      let tokenRegistryAddress = _tokenRegistryAddress;
      if (!_tokenRegistryAddress) {
        const tokenRegistryDeployment = await deployments.get("TokenRegistry");
        tokenRegistryAddress = tokenRegistryDeployment.address;
      }
      console.log("tokenRegistryAddress: ", tokenRegistryAddress);
      const tokenRegistry = await ethers.getContractAt("TokenRegistry", tokenRegistryAddress);
      const [domain, canonical] = await tokenRegistry.getTokenId(assetId);
      console.log("domain: ", domain);
      console.log("canonical: ", canonical);

      const approvedAsset = await txManager.approvedAssets(canonical);
      console.log("approvedAsset: ", approvedAsset);
      if (!approvedAsset) {
        throw new Error("Asset not approved");
      }

      const tx = await txManager.addLiquidityFor(amount, assetId, router, {
        from: namedAccounts.deployer,
        value: assetId === ethers.constants.AddressZero ? amount : 0,
      });
      console.log("addLiquidityFor tx: ", tx);
      const receipt = await tx.wait();
      console.log("addLiquidityFor tx mined: ", receipt.transactionHash);
      const liquidity = await txManager.routerBalances(router, assetId);
      console.log("liquidity: ", liquidity.toString());
    },
  );
