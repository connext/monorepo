import { BigNumberish, constants, Contract, utils } from "ethers";
import { defaultAbiCoder, solidityKeccak256 } from "ethers/lib/utils";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../../src/utils";

type TaskArgs = {
  canonical: string;
  canonicalAmount: string;
  adoptedAmount: string;
  minToMint?: string;
  connextAddress?: string;
  env?: Env;
};

export default task("add-swap-liquidity", "Add liquidity to the stable swap pool")
  .addParam("canonical", "Canonical token address")
  .addParam("canonicalAmount", "Amount of the canonical token")
  .addParam("adoptedAmount", "Amount of the adopted token")
  .addOptionalParam("minToMint", "The minimum LP tokens adding this amount of liquidity")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(
    async (
      {
        canonical,
        canonicalAmount: _canonicalAmount,
        adoptedAmount: _adoptedAmount,
        minToMint: _minToMint,
        connextAddress: _connextAddress,
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
      console.log("canonical amount: ", _canonicalAmount);
      console.log("adopted amount: ", _adoptedAmount);
      console.log("minToMint: ", _minToMint);

      const connextName = getDeploymentName("Connext", env);
      const connextDeployment = await deployments.get(connextName);
      const connextAddress = _connextAddress ?? connextDeployment.address;
      console.log("connextAddress: ", connextAddress);

      const connext = new Contract(connextAddress, connextDeployment.abi, deployer);

      const [domain, canonicalId] = await connext.getTokenId(canonical);
      console.log("domain: ", domain);
      console.log("canonicalId: ", canonicalId);

      const key = solidityKeccak256(["bytes"], [defaultAbiCoder.encode(["bytes32", "uint32"], [canonicalId, domain])]);
      console.log({ key });

      const [canonicalAsset, adoptedAsset] = await Promise.all([
        connext.getSwapToken(key, 0),
        connext.getSwapToken(key, 1),
      ]);

      if (canonicalAsset == constants.AddressZero || adoptedAsset === constants.AddressZero) {
        throw new Error("StableSwap pool not initialized");
      }

      const decimals = await Promise.all([
        (await ethers.getContractAt("TestERC20", canonicalAsset as string)).decimals(),
        (await ethers.getContractAt("TestERC20", adoptedAsset as string)).decimals(),
      ]);

      const canonicalERC20 = await ethers.getContractAt(getDeploymentName("TestERC20", env), canonicalAsset as string);
      const canonicalBalance = await canonicalERC20.balanceOf(deployer.address);
      const canonicalAmount = utils.parseUnits(_canonicalAmount, decimals[0] as BigNumberish);
      console.log("canonical balance: ", canonicalBalance.toString());
      if (canonicalBalance.lt(canonicalAmount)) {
        throw new Error("Not enough canonical balance");
      }
      const canonicalAllowance = await canonicalERC20.allowance(deployer.address, connext.address);
      if (canonicalAllowance.lt(canonicalAmount)) {
        const approveTx = await canonicalERC20.approve(connext.address, ethers.constants.MaxUint256);
        console.log("canonical approveTx: ", approveTx.hash);
        await approveTx.wait();
        console.log("canonical approveTx mined");
      } else {
        console.log(`Sufficient canonical allowance: ${canonicalAllowance.toString()}`);
      }

      const adoptedERC20 = await ethers.getContractAt(getDeploymentName("TestERC20", env), adoptedAsset as string);
      const adoptedBalance = await adoptedERC20.balanceOf(deployer.address);
      const adoptedAmount = utils.parseUnits(_adoptedAmount, decimals[1] as BigNumberish);
      console.log("adopted balance: ", adoptedBalance.toString());
      if (adoptedBalance.lt(adoptedAmount)) {
        throw new Error("Not enough adopted balance");
      }
      const adoptedAllowance = await adoptedERC20.allowance(deployer.address, connext.address);
      if (adoptedAllowance.lt(adoptedAmount)) {
        const approveTx = await adoptedERC20.approve(connext.address, ethers.constants.MaxUint256);
        console.log("adopted approveTx: ", approveTx.hash);
        await approveTx.wait();
        console.log("adopted approveTx mined");
      } else {
        console.log(`Sufficient adopted allowance: ${adoptedAllowance.toString()}`);
      }

      const tx = await connext.addSwapLiquidity(
        key,
        [canonicalAmount, adoptedAmount],
        _minToMint ?? 0,
        Math.floor(new Date().getTime() / 1000 + 600),
      );
      console.log("add liquidity tx: ", tx);
      const receipt = await tx.wait();
      console.log("add liquidity tx mined: ", receipt.transactionHash);
    },
  );
