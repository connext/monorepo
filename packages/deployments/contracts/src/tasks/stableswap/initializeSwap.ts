import { BigNumberish, Contract, utils } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../../utils";

type TaskArgs = {
  canonical: string;
  adopted: string;
  lpTokenName: string;
  lpTokenSymbol: string;
  a?: string;
  fee?: string;
  adminFee?: string;
  lpTokenTargetAddress?: string;
  connextAddress?: string;
  tokenRegistryAddress?: string;
  env?: Env;
};

export default task("initialize-stableswap", "Initializes stable swap")
  .addParam("canonical", "Canonical token address")
  .addParam("adopted", "Adopted token address")
  .addParam("lpTokenName", "LP token name")
  .addParam("lpTokenSymbol", "Lp token symbol")
  .addOptionalParam("a", "Override connext address")
  .addOptionalParam("fee", "Override connext address")
  .addOptionalParam("adminFee", "Override connext address")
  .addOptionalParam("lpTokenTargetAddress", "Override LP token target address")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("tokenRegistryAddress", "Override token registry address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(
    async (
      {
        canonical,
        adopted,
        lpTokenName,
        lpTokenSymbol,
        a: _a,
        fee: _fee,
        adminFee: _adminFee,
        lpTokenTargetAddress: _lpTokenTargetAddress,
        connextAddress: _connextAddress,
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
      console.log("canonical: ", canonical);
      console.log("adopted: ", adopted);
      console.log("lpTokenName: ", lpTokenName);
      console.log("lpTokenSymbol: ", lpTokenSymbol);
      console.log("a: ", _a);
      console.log("fee: ", _fee);
      console.log("adminFee: ", _adminFee);

      const INITIAL_A = 200;
      const SWAP_FEE = 4e6; // 4bps FEE_DENOMINATOR = 10 ** 10
      const ADMIN_FEE = 0;

      const connextName = getDeploymentName("ConnextHandler", env);
      const connextDeployment = await deployments.get(connextName);
      const connextAddress = _connextAddress ?? connextDeployment.address;
      console.log("connextAddress: ", connextAddress);

      const connext = new Contract(connextAddress, connextDeployment.abi, deployer);

      const tokenDeployment = await deployments.get(getDeploymentName("TokenRegistryUpgradeBeaconProxy", env));
      const tokenRegistry = new Contract(
        _tokenRegistryAddress ?? tokenDeployment.address,
        (await deployments.get(getDeploymentName("TokenRegistry"))).abi,
        deployer,
      );
      console.log("tokenRegistryAddress:", tokenRegistry.address);
      const [domain, canonicalId] = await tokenRegistry.getTokenId(canonical);
      console.log("domain: ", domain);
      console.log("canonicalId: ", canonicalId);

      const approvedAsset = await connext.approvedAssets(canonicalId);
      console.log("approvedAsset: ", approvedAsset);
      if (!approvedAsset) {
        throw new Error("Asset not approved");
      }

      const a = _a ?? INITIAL_A;
      const fee = _fee ?? SWAP_FEE;
      const adminFee = _adminFee ?? ADMIN_FEE;

      const lpTokenDeployment = await deployments.get(getDeploymentName("LPToken", env));
      const lpTokenTargetAddress = _lpTokenTargetAddress ?? lpTokenDeployment.address;
      console.log("lpTokenTargetAddress: ", lpTokenTargetAddress);

      const decimals = await Promise.all([
        (await ethers.getContractAt("TestERC20", canonical)).decimals(),
        (await ethers.getContractAt("TestERC20", adopted)).decimals(),
      ]);

      const tx = await connext.initializeSwap(
        canonicalId,
        [canonical, adopted],
        decimals,
        lpTokenName,
        lpTokenSymbol,
        a,
        fee,
        adminFee,
        lpTokenTargetAddress,
      );
      console.log("initializeStableSwap tx: ", tx);
      const receipt = await tx.wait();
      console.log("initializeStableSwap tx mined: ", receipt.transactionHash);
    },
  );
