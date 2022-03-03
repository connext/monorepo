import { hexlify } from "ethers/lib/utils";
import { task } from "hardhat/config";

import { canonizeId } from "../nomad";

export default task("setup-asset", "Configures an asset")
  .addParam("canonical", "Canonical token address")
  .addParam("domain", "Canonical domain of token")
  .addParam("adopted", "Addopted token address")
  .addParam("pool", "Stable swap pool for adopted <> local asset")
  .addOptionalParam("txManagerAddress", "Override tx manager address")
  .setAction(
    async (
      { pool, adopted, canonical, domain, txManagerAddress: _txManagerAddress },
      { deployments, getNamedAccounts, ethers },
    ) => {
      const namedAccounts = await getNamedAccounts();

      console.log("pool: ", pool);
      console.log("adopted: ", adopted);
      console.log("canonical: ", canonical);
      console.log("domain: ", domain);
      console.log("namedAccounts: ", namedAccounts);

      let txManagerAddress = _txManagerAddress;
      if (!txManagerAddress) {
        const txManagerDeployment = await deployments.get("TransactionManager");
        txManagerAddress = txManagerDeployment.address;
      }
      console.log("txManagerAddress: ", txManagerAddress);

      const canonicalTokenId = {
        id: hexlify(canonizeId(canonical)),
        domain: +domain,
      };

      const txManager = await ethers.getContractAt("TransactionManager", txManagerAddress);
      const approved = await txManager.approvedAssets(canonicalTokenId.id);
      if (approved) {
        console.log("approved, no need to add");
        return;
      }
      const tx = await txManager.setupAsset(canonicalTokenId, adopted, pool, { from: namedAccounts.deployer });

      console.log("setupAsset tx: ", tx);
      const receipt = await tx.wait();
      console.log("setupAsset tx mined: ", receipt.transactionHash);

      const isAssetApproved = await txManager.approvedAssets(canonicalTokenId.id);
      console.log("isAssetApproved: ", isAssetApproved);
    },
  );
