import { BigNumberish, Contract, utils } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../utils";

type TaskArgs = {
  router: string;
  asset: string;
  amount: string;
  connextAddress?: string;
  tokenRegistryAddress?: string;
  env?: Env;
};

export default task("add-liquidity", "Add liquidity for a router")
  .addParam("router", "Router address")
  .addParam("asset", "Local token address")
  .addParam("amount", "Amount (real units)")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("tokenRegistryAddress", "Override token registry address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(
    async (
      {
        asset,
        router,
        connextAddress: _connextAddress,
        amount: _amount,
        tokenRegistryAddress: _tokenRegistryAddress,
        env: _env,
      }: TaskArgs,
      { deployments, ethers },
    ) => {
      let { deployer } = await ethers.getNamedSigners();
      if (!deployer) {
        [deployer] = await ethers.getUnnamedSigners();
      }

      const env = mustGetEnv(_env);
      console.log("env:", env);
      console.log("router: ", router);
      console.log("asset: ", asset);
      console.log("deployer: ", deployer.address);

      const connextName = getDeploymentName("ConnextHandler", env);
      const connextDeployment = await deployments.get(connextName);
      const connextAddress = _connextAddress ?? connextDeployment.address;
      console.log("connextAddress: ", connextAddress);

      const connext = new Contract(connextAddress, connextDeployment.abi, deployer);
      let amount;
      if (asset !== ethers.constants.AddressZero) {
        const erc20 = await ethers.getContractAt(getDeploymentName("TestERC20", env), asset);
        const balance = await erc20.balanceOf(deployer.address);
        amount = utils.parseUnits(_amount, (await erc20.decimals()) as BigNumberish);
        console.log("balance: ", balance.toString());
        if (balance.lt(amount)) {
          throw new Error("Not enough balance");
        }
        const allowance = await erc20.allowance(deployer.address, connext.address);
        if (allowance.lt(amount)) {
          const approveTx = await erc20.approve(connext.address, ethers.constants.MaxUint256);
          console.log("approveTx: ", approveTx.hash);
          await approveTx.wait();
          console.log("approveTx mined");
        } else {
          console.log(`Sufficient allowance: ${allowance.toString()}`);
        }
      } else {
        amount = utils.parseEther(_amount);
      }

      const approvedRouter = await connext.getRouterApproval(router);
      console.log("approvedRouter: ", approvedRouter);
      if (!approvedRouter) {
        throw new Error("Router not approved");
      }

      const tokenDeployment = await deployments.get(getDeploymentName("TokenRegistryUpgradeBeaconProxy", env));
      const tokenRegistry = new Contract(
        _tokenRegistryAddress ?? tokenDeployment.address,
        (await deployments.get(getDeploymentName("TokenRegistry"))).abi,
        deployer,
      );
      console.log("tokenRegistryAddress:", tokenRegistry.address);
      const [domain, canonical] = await tokenRegistry.getTokenId(asset);
      console.log("domain: ", domain);
      console.log("canonical: ", canonical);

      const approvedAsset = await connext.approvedAssets(canonical);
      console.log("approvedAsset: ", approvedAsset);
      if (!approvedAsset) {
        throw new Error("Asset not approved");
      }

      console.log("args:", amount, asset, router);
      const tx = await connext.addLiquidityFor(amount, asset, router, {
        value: asset === ethers.constants.AddressZero ? amount : 0,
      });
      console.log("addLiquidityFor tx: ", tx);
      const receipt = await tx.wait();
      console.log("addLiquidityFor tx mined: ", receipt.transactionHash);
      const liquidity = await connext.routerBalances(router, asset);
      console.log("liquidity: ", liquidity.toString());
    },
  );
