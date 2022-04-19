import { constants, Contract } from "ethers";
import { hexlify } from "ethers/lib/utils";
import { task } from "hardhat/config";

import { canonizeId } from "../nomad";
import { Env, getDeploymentName, mustGetEnv } from "../utils";

type TaskArgs = {
  canonical: string;
  domain: string;
  adopted: string;
  pool?: string;
  connextAddress?: string;
  env?: Env;
};

export default task("setup-asset", "Configures an asset")
  .addParam("canonical", "Canonical token address")
  .addParam("domain", "Canonical domain of token")
  .addParam("adopted", "Addopted token address")
  .addOptionalParam("pool", "Stable swap pool for adopted <> local asset")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(
    async (
      { pool, adopted, canonical, domain, connextAddress: _connextAddress, env: _env }: TaskArgs,
      { deployments, ethers },
    ) => {
      let { deployer } = await ethers.getNamedSigners();
      if (!deployer) {
        [deployer] = await ethers.getUnnamedSigners();
      }

      const env = mustGetEnv(_env);
      console.log("env:", env);
      console.log("pool: ", pool);
      console.log("adopted: ", adopted);
      console.log("canonical: ", canonical);
      console.log("domain: ", domain);
      console.log("deployer: ", deployer.address);

      const connextName = getDeploymentName("Connext", env);
      const connextDeployment = await deployments.get(connextName);
      const connextAddress = _connextAddress ?? connextDeployment.address;
      const connext = new Contract(connextAddress, connextDeployment.abi, deployer);
      console.log("connextAddress: ", connextAddress);

      const canonicalTokenId = {
        id: hexlify(canonizeId(canonical)),
        domain: +domain,
      };

      const approved = await connext.approvedAssets(canonicalTokenId.id);
      if (approved) {
        console.log("approved, no need to add");
        return;
      }
      const tx = await connext.setupAsset(canonicalTokenId, adopted, pool ?? constants.AddressZero);

      console.log("setupAsset tx: ", tx);
      const receipt = await tx.wait(1);
      console.log("setupAsset tx mined: ", receipt.transactionHash);

      const isAssetApproved = await connext.approvedAssets(canonicalTokenId.id);
      console.log("isAssetApproved: ", isAssetApproved);
    },
  );
