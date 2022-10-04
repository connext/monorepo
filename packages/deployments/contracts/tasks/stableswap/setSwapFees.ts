import { BigNumber, constants, Contract, utils } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../../src/utils";
import { canonizeId } from "../../src";

type TaskArgs = {
  canonical: string;
  swapFee: string;
  adminFee?: string;
  connextAddress?: string;
  env?: Env;
};

export default task("set-swap-fees", "Set admin fee and swap fee of the stable swap pool")
  .addParam("canonical", "Canonical token address")
  .addParam("swapFee", "Swap Fee percent (FEE_DENOMINATOR: 1e10, ie: 0.5% = 5e7, max: 1e8)")
  .addOptionalParam("adminFee", "Amount Fee percent (FEE_DENOMINATOR: 1e10, ie: 1%, = 1e8, max: 1e10)")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(
    async (
      { canonical, swapFee: _swapFee, adminFee: _adminFee, connextAddress: _connextAddress, env: _env }: TaskArgs,
      { deployments, ethers },
    ) => {
      let { deployer } = await ethers.getNamedSigners();
      if (!deployer) {
        [deployer] = await ethers.getUnnamedSigners();
      }

      const env = mustGetEnv(_env);
      console.log("env:", env);
      console.log("canonical: ", canonical);
      console.log("swap fee percent: ", _swapFee);
      console.log("admin fee percent: ", _adminFee);

      const FEE_DENOMINATOR = BigNumber.from(1e10);
      const MAX_SWAP_FEE = BigNumber.from(1e8);
      const MAX_ADMIN_FEE = FEE_DENOMINATOR;

      const connextName = getDeploymentName("Connext", env);
      const connextDeployment = await deployments.get(connextName);
      const connextAddress = _connextAddress ?? connextDeployment.address;
      console.log("connextAddress: ", connextAddress);

      const connext = new Contract(connextAddress, connextDeployment.abi, deployer);

      const canonicalId = utils.hexlify(canonizeId(canonical));

      const swapPool = await connext.getSwapStorage(canonicalId);
      if (swapPool.pooledTokens.length <= 1) {
        throw new Error("Stable swap pool not initialized!");
      }

      if (_swapFee) {
        if (BigNumber.from(_swapFee).gt(MAX_SWAP_FEE)) {
          console.log("Too big swap Fee!, max: 1e8 = 1%");
        } else {
          const tx = await connext.setSwapFee(canonicalId, _swapFee);
          console.log(`set swap fee (${((+_swapFee / FEE_DENOMINATOR.toNumber()) * 100).toFixed(4)}%) tx: `, tx);
          const receipt = await tx.wait();
          console.log("set swap fee tx mined: ", receipt.transactionHash);
        }
      }

      if (_adminFee) {
        if (BigNumber.from(_adminFee).gt(MAX_ADMIN_FEE)) {
          console.log("Too big admin Fee!, max: 1e10 = 100%");
        } else {
          const tx = await connext.setAdminFee(canonicalId, _adminFee);
          console.log(`set admin fee (${((+_adminFee / FEE_DENOMINATOR.toNumber()) * 100).toFixed(4)}%) tx: `, tx);
          const receipt = await tx.wait();
          console.log("set admin fee tx mined: ", receipt.transactionHash);
        }
      }
    },
  );
