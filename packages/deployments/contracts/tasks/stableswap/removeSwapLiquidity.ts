import { constants, Contract, utils } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../../src/utils";

type TaskArgs = {
  canonical: string;
  amount: string;
  asset?: string;
  connextAddress?: string;
  env?: Env;
};

export default task("remove-swap-liquidity", "Remove liquidity from the stable swap pool")
  .addParam("canonical", "Canonical token address")
  .addParam("amount", "Amount of the lp token")
  .addOptionalParam(
    "asset",
    "The address of the asset you want to receive. If not specified, will receive both of assets",
  )
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(
    async (
      { canonical, amount: _amount, asset, connextAddress: _connextAddress, env: _env }: TaskArgs,
      { deployments, ethers },
    ) => {
      let { deployer } = await ethers.getNamedSigners();
      if (!deployer) {
        [deployer] = await ethers.getUnnamedSigners();
      }

      const env = mustGetEnv(_env);
      console.log("env:", env);
      console.log("canonical: ", canonical);
      console.log("lp amount: ", _amount);
      console.log("asset: ", asset);

      const connextName = getDeploymentName("Connext", env);
      const connextDeployment = await deployments.get(connextName);
      const connextAddress = _connextAddress ?? connextDeployment.address;
      console.log("connextAddress: ", connextAddress);

      const connext = new Contract(connextAddress, connextDeployment.abi, deployer);

      const [domain, canonicalId] = await connext.getTokenId(canonical);
      console.log("domain: ", domain);
      console.log("canonicalId: ", canonicalId);

      const [canonicalAsset, adoptedAsset, lpAsset] = await Promise.all([
        connext.getSwapToken(canonicalId, 0),
        connext.getSwapToken(canonicalId, 1),
        connext.getSwapLPToken(canonicalId),
      ]);

      if (canonicalAsset == constants.AddressZero || adoptedAsset === constants.AddressZero) {
        throw new Error("StableSwap pool not initialized");
      }

      const lpERC20 = await ethers.getContractAt(getDeploymentName("TestERC20", env), lpAsset as string);
      const lpBalance = await lpERC20.balanceOf(deployer.address);
      const amount = utils.parseUnits(_amount, 18);
      console.log("LP token balance: ", lpBalance.toString());
      if (lpBalance.lt(amount)) {
        throw new Error("Not enough LP balance");
      }
      const lpAllowance = await lpERC20.allowance(deployer.address, connext.address);
      if (lpAllowance.lt(amount)) {
        const approveTx = await lpERC20.approve(connext.address, ethers.constants.MaxUint256);
        console.log("lp approveTx: ", approveTx.hash);
        await approveTx.wait();
        console.log("lp approveTx mined");
      } else {
        console.log(`Sufficient lp allowance: ${lpAllowance.toString()}`);
      }

      let tokenIndex = -1;
      if (asset) {
        if (asset.toLowerCase() === canonicalAsset.toLowerCase()) {
          tokenIndex = 0;
        } else {
          tokenIndex = 1;
        }
      }

      let tx;
      if (tokenIndex >= 0) {
        tx = await connext.removeSwapLiquidityOneToken(
          canonicalId,
          amount,
          tokenIndex,
          0,
          Math.floor(new Date().getTime() / 1000 + 600),
        );
      } else {
        tx = await connext.removeSwapLiquidity(
          canonicalId,
          amount,
          [0, 0],
          Math.floor(new Date().getTime() / 1000 + 600),
        );
      }

      console.log("remove liquidity tx: ", tx);
      const receipt = await tx.wait();
      console.log("remove liquidity tx mined: ", receipt.transactionHash);
    },
  );
