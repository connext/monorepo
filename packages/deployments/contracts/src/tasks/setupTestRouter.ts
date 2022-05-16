import { Contract } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../utils";

type TaskArgs = {
  router: string;
  assetId?: string;
  amount?: string;
  connextAddress?: string;
  env?: Env;
};

export default task("setup-test-router", "Add router and test assets")
  .addParam("router", "Router address")
  .addOptionalParam("assetId", "Override token address")
  .addOptionalParam("amount", "Override amount (real units)")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(
    async (
      { assetId: _assetId, router, connextAddress: _connextAddress, amount: _amount, env: _env }: TaskArgs,
      { deployments, getNamedAccounts, ethers, run },
    ) => {
      console.log("router: ", router);
      let { deployer } = await ethers.getNamedSigners();
      if (!deployer) {
        [deployer] = await ethers.getUnnamedSigners();
      }

      const env = mustGetEnv(_env);
      console.log("env:", env);
      const namedAccounts = await getNamedAccounts();
      console.log("namedAccounts: ", namedAccounts);

      const connextName = getDeploymentName("ConnextHandler", env);
      const connextDeployment = await deployments.get(connextName);
      const connextAddress = _connextAddress ?? connextDeployment.address;
      const connext = new Contract(connextAddress, connextDeployment.abi, deployer);
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

      const isRouterApproved = await connext.getRouterApproval(router);
      console.log("isRouterApproved: ", isRouterApproved);
      if (!isRouterApproved) {
        await run("setup-router", { router, connextAddress });
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
