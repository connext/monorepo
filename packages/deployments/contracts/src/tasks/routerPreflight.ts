import { BigNumber } from "ethers";
import { task } from "hardhat/config";

export default task("router-preflight", "Check if router has been set up correctly")
  .addParam("router", "Router address")
  .addOptionalParam("asset", "Override token address")
  .addOptionalParam("amount", "Override amount (real units)")
  .addOptionalParam("connextAddress", "Override connext address")
  .setAction(
    async (
      { router, connextAddress: _connextAddress, asset: _asset, amount: _amount },
      { deployments, ethers, run },
    ) => {
      console.log("router: ", router);

      let connextAddress = _connextAddress;
      if (!connextAddress) {
        const connextDeployment = await deployments.get("ConnextUpgradeBeaconProxy");
        connextAddress = connextDeployment.address;
      }
      console.log("connextAddress: ", connextAddress);

      const asset = _asset ?? (await deployments.get("TestERC20")).address;
      const amount = _amount ?? "2500000000000000000000000";

      const connext = await ethers.getContractAt("Connext", connextAddress);

      // Not needed for testnets.
      // Make sure router's signer address is approved.
      // const isRouterApproved = await connext.approvedRouters(router);
      // console.log("isRouterApproved: ", isRouterApproved);
      // if (!isRouterApproved) {
      //   await run("add-router", { router, connextAddress });
      // }
      // console.log("Router approved");

      // Make sure the asset is approved.
      // const isAssetApproved = await connext.approvedAssets(asset);
      // console.log("isAssetApproved: ", isAssetApproved);
      // if (!isAssetApproved) {
      //   await run("add-asset", { asset, connextAddress });
      // }
      // console.log("Asset approved");

      // Make sure the router's signer address has liquidity by checking the TransactionManager
      // contract in the block explorer and reading the routerBalances mapping, putting in the
      // router signer address and Rinkeby asset ID.
      const liquidity = await connext.routerBalances(router, asset);
      console.log("liquidity: ", liquidity.toString());
      if (liquidity.lt(amount)) {
        if (asset !== ethers.constants.AddressZero) {
          const erc20 = await ethers.getContractAt("TestERC20", asset);
          const balance = await erc20.balanceOf(router);
          console.log("balance: ", balance.toString());
          if (balance.lt(amount)) {
            await run("mint", { amount, asset, connextAddress });
          }
        } else {
          // TODO: send ETH to txmanager
          throw new Error("Need to support eth");
        }
        await run("add-liquidity", { router, asset, amount, connextAddress });
      }

      // Make sure the router's signer address has relayer fees by checking the
      // TransactionManager contract on chain and reading the routerRelayerFees function.
      const relayerFees = await connext.routerRelayerFees(router);
      console.log("relayerFees: ", relayerFees.toString());
      if (relayerFees.lt(BigNumber.from(amount).mul(10).div(100))) {
        // TODO: add relayer fees
      }
    },
  );
