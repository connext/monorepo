import { task } from "hardhat/config";

type TaskArgs = {
  router: string;
  assetId?: string;
  amount?: string;
  connextAddress?: string;
};

export default task("setup-test-router", "Add router and test assets")
  .addParam("router", "Router address")
  .addOptionalParam("assetId", "Override token address")
  .addOptionalParam("amount", "Override amount (real units)")
  .addOptionalParam("connextAddress", "Override connext address")
  .setAction(
    async (
      { assetId: _assetId, router, connextAddress: _connextAddress, amount: _amount }: TaskArgs,
      { deployments, getNamedAccounts, ethers, run },
    ) => {
      console.log("router: ", router);

      const namedAccounts = await getNamedAccounts();
      console.log("namedAccounts: ", namedAccounts);

      let connextAddress = _connextAddress;
      if (!connextAddress) {
        const connextDeployment = await deployments.get("Connext");
        connextAddress = connextDeployment.address;
      }
      console.log("connextAddress: ", connextAddress);

      let assetId = _assetId;
      if (!assetId) {
        const assetIdDeployment = await deployments.get("TestERC20");
        assetId = assetIdDeployment.address;
      }

      let amount = _amount;
      if (!amount) {
        amount = "2500000000000000000000000";
      }

      const connext = await ethers.getContractAt("Connext", connextAddress);

      const isRouterApproved = await connext.approvedRouters(router);
      console.log("isRouterApproved: ", isRouterApproved);
      if (!isRouterApproved) {
        await run("add-router", { router, connextAddress });
      }
      console.log("Router approved");

      const isAssetApproved = await connext.approvedAssets(assetId);
      console.log("isAssetApproved: ", isAssetApproved);
      if (!isAssetApproved) {
        await run("add-asset", { assetId, connextAddress });
      }
      console.log("Asset approved");

      if (assetId !== ethers.constants.AddressZero) {
        const erc20 = await ethers.getContractAt("TestERC20", assetId);
        const balance = await erc20.balanceOf(namedAccounts.deployer);
        console.log("balance: ", balance.toString());
        if (balance.lt(amount)) {
          await run("mint", { amount, assetId, connextAddress });
        }
      }

      await run("add-liquidity", { router, assetId, amount, connextAddress });
    },
  );
