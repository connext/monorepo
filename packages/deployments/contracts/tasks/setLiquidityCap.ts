import { Contract, constants } from "ethers";
import { defaultAbiCoder, hexlify, solidityKeccak256 } from "ethers/lib/utils";
import { task } from "hardhat/config";
import { chainIdToDomain } from "@connext/nxtp-utils";

import { canonizeId } from "../src";
import { Env, getDeploymentName, mustGetEnv } from "../src/utils";

type TaskArgs = {
  canonical: string;
  cap: string;
  connextAddress?: string;
  env?: Env;
};

export default task("set-liquidity-cap", "Configures the liquidity cap of an asset")
  .addParam("canonical", "Canonical token address")
  .addParam("cap", "Cap for the token")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(
    async ({ canonical, cap, connextAddress: _connextAddress, env: _env }: TaskArgs, { deployments, ethers }) => {
      let { deployer } = await ethers.getNamedSigners();
      if (!deployer) {
        [deployer] = await ethers.getUnnamedSigners();
      }

      const env = mustGetEnv(_env);

      const network = await ethers.provider.getNetwork();
      const domain = chainIdToDomain(network.chainId);

      console.log("canonical:", canonical);
      console.log("domain:", domain);
      console.log("cap: ", cap);
      console.log("domain: ", domain);
      console.log("deployer: ", deployer.address);
      const connextName = getDeploymentName("Connext", env);
      const connextDeployment = await deployments.get(connextName);
      const connextAddress = _connextAddress ?? connextDeployment.address;
      console.log("connextAddress: ", connextAddress);

      const connext = new Contract(connextAddress, connextDeployment.abi, deployer);
      console.log("connextAddress: ", connextAddress);

      const canonicalTokenId = {
        id: hexlify(canonizeId(canonical)),
        domain: +domain,
      };
      const key = solidityKeccak256(
        ["bytes"],
        [defaultAbiCoder.encode(["bytes32", "uint32"], [canonicalTokenId.id, canonicalTokenId.domain])],
      );

      if (network.chainId === 1 && +cap === 0 && env === "production") {
        throw new Error(`Must have nonzero cap on prod canonical domains`);
      }

      let tx = await connext.updateLiquidityCap(canonicalTokenId, cap);
      console.log("setupAsset tx: ", tx);

      const receipt = await tx.wait(1);
      console.log("tx mined: ", receipt.transactionHash);
    },
  );
