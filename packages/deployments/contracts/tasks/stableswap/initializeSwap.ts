import { Contract, utils, constants } from "ethers";
import { defaultAbiCoder, solidityKeccak256 } from "ethers/lib/utils";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../../src/utils";
import { canonizeId } from "../../src";

type TaskArgs = {
  canonical: string;
  domain: string;
  adopted: string;
  lpTokenName: string;
  lpTokenSymbol: string;
  a?: string;
  fee?: string;
  adminFee?: string;
  connextAddress?: string;
  env?: Env;
};

/**
 * @notice IMPORTANT -- Do *NOT* use this on mainnet to initialize a swap pool until
 * `setDetails` has been called with the correct canonical details (not the default
 * ones) on the mad-asset.
 *
 * TODO: when updating the scripts after audit fixes, ensure this is an automated check.
 */
export default task("initialize-stableswap", "Initializes stable swap")
  .addParam("canonical", "Canonical token address")
  .addParam("domain", "Canonical token domain")
  .addParam("lpTokenName", "LP token name")
  .addParam("lpTokenSymbol", "Lp token symbol")
  .addOptionalParam("a", "Override connext address")
  .addOptionalParam("fee", "Override connext address")
  .addOptionalParam("adminFee", "Override connext address")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(
    async (
      {
        canonical,
        domain: _domain,
        lpTokenName,
        lpTokenSymbol,
        a: _a,
        fee: _fee,
        adminFee: _adminFee,
        connextAddress: _connextAddress,
        env: _env,
      }: TaskArgs,
      { deployments, ethers },
    ) => {
      let { deployer } = await ethers.getNamedSigners();
      if (!deployer) {
        [deployer] = await ethers.getUnnamedSigners();
      }
      const domain = +_domain;

      const env = mustGetEnv(_env);
      console.log("env:", env);
      console.log("canonical: ", canonical);
      console.log("domain:", domain);
      console.log("lpTokenName: ", lpTokenName);
      console.log("lpTokenSymbol: ", lpTokenSymbol);

      const INITIAL_A = 200;
      const SWAP_FEE = 4e6; // 4bps FEE_DENOMINATOR = 10 ** 10
      const ADMIN_FEE = 0;

      const a = _a ?? INITIAL_A;
      const fee = _fee ?? SWAP_FEE;
      const adminFee = _adminFee ?? ADMIN_FEE;
      console.log("a: ", a);
      console.log("fee: ", fee);
      console.log("adminFee: ", adminFee);

      const connextName = getDeploymentName("Connext", env);
      const connextDeployment = await deployments.get(connextName);
      const connextAddress = _connextAddress ?? connextDeployment.address;
      console.log("connextAddress: ", connextAddress);

      const connext = new Contract(connextAddress, connextDeployment.abi, deployer);

      const canonicalId = utils.hexlify(canonizeId(canonical));
      console.log("domain: ", domain);
      console.log("canonicalId: ", canonicalId);

      const canonicalTokenId = {
        id: canonicalId,
        domain: +domain,
      };
      const key = solidityKeccak256(
        ["bytes"],
        [defaultAbiCoder.encode(["bytes32", "uint32"], [canonicalTokenId.id, canonicalTokenId.domain])],
      );

      const [isAssetApproved] = connext.interface.decodeFunctionResult(
        "approvedAssets(bytes32)",
        await deployer.call({
          to: connext.address,
          value: constants.Zero,
          data: connext.interface.encodeFunctionData("approvedAssets(bytes32)", [key]),
        }),
      );
      console.log("approvedAsset: ", isAssetApproved);
      if (!isAssetApproved) {
        throw new Error("Asset not approved");
      }

      const [local, adopted] = connext.interface.decodeFunctionResult(
        "getLocalAndAdoptedToken(bytes32,uint32)",
        await deployer.call({
          to: connext.address,
          data: connext.interface.encodeFunctionData("getLocalAndAdoptedToken(bytes32,uint32)", [canonicalId, domain]),
        }),
      );
      console.log("adopted:", adopted);
      console.log("local:", local);

      if (adopted.toLowerCase() === local.toLowerCase()) {
        throw new Error("Adopted and Local asset is same address!");
      }

      const lpTokenDeployment = await deployments.get(getDeploymentName("LPToken", env));

      const decimals = await Promise.all([
        (await ethers.getContractAt("TestERC20", local)).decimals(),
        (await ethers.getContractAt("TestERC20", adopted)).decimals(),
      ]);
      console.log("decimals: ", decimals);

      const tx = await connext.initializeSwap(
        key,
        [local, adopted],
        decimals,
        lpTokenName,
        lpTokenSymbol,
        a,
        fee,
        adminFee,
        {
          gasLimit: 2_000_000,
        },
      );
      console.log("initializeStableSwap tx: ", tx);
      const receipt = await tx.wait();
      console.log("initializeStableSwap tx mined: ", receipt.transactionHash);
    },
  );
