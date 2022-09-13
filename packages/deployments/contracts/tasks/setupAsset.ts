import { constants } from "ethers";
import { defaultAbiCoder, hexlify, solidityKeccak256 } from "ethers/lib/utils";
import { task } from "hardhat/config";

import { canonizeId } from "../src";
import { Env, getDeploymentName, mustGetEnv } from "../src/utils";

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
  .addParam("adopted", "Adopted token address")
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
      let connextAddress = _connextAddress;
      if (!connextAddress) {
        const connextName = getDeploymentName("ConnextHandler", env);
        const connextDeployment = await deployments.get(connextName);
        connextAddress = connextDeployment.address;
      }
      const connext = await ethers.getContractAt("ConnextHandler", connextAddress);
      console.log("connextAddress: ", connextAddress);

      const canonicalTokenId = {
        id: hexlify(canonizeId(canonical)),
        domain: +domain,
      };
      const key = solidityKeccak256(
        ["bytes"],
        [defaultAbiCoder.encode(["bytes32", "uint32"], [canonicalTokenId.id, canonicalTokenId.domain])],
      );

      console.log("key: ", key);
      const [approved] = connext.interface.decodeFunctionResult(
        "approvedAssets(bytes32)",
        await deployer.call({
          to: connext.address,
          value: constants.Zero,
          data: connext.interface.encodeFunctionData("approvedAssets(bytes32)", [key]),
        }),
      );
      console.log("approved: ", approved);
      if (approved) {
        // check that the correct domain is set
        // check that the correct adopted asset is set

        // get the current adopted asset
        const [currentAdopted] = connext.interface.decodeFunctionResult(
          "canonicalToAdopted(bytes32)",
          await deployer.call({
            to: connext.address,
            data: connext.interface.encodeFunctionData("canonicalToAdopted(bytes32)", [key]),
          }),
        );
        // const currentAdopted = await connext.canonicalToAdopted(key);
        console.log("currentAdopted: ", currentAdopted);

        // check that the correct domain is set
        // const currentCanonical = await connext.adoptedToCanonical(currentAdopted);
        const [currentCanonical] = connext.interface.decodeFunctionResult(
          "adoptedToCanonical(address)",
          await deployer.call({
            to: connext.address,
            data: connext.interface.encodeFunctionData("adoptedToCanonical(address)", [currentAdopted]),
          }),
        );
        console.log("currentCanonical", currentCanonical);
        const correctCanonical =
          currentCanonical.domain === canonicalTokenId.domain &&
          currentCanonical.id.toLowerCase() === canonicalTokenId.id.toLowerCase();

        // check that the correct adopted asset is set + correct domain
        if (currentAdopted.toLowerCase() === adopted.toLowerCase() && correctCanonical) {
          console.log("approved, no need to add");
          return;
        }
        console.log("approved with different adopted asset or canonical id:");
        console.log(" - current adopted  :", currentAdopted);
        console.log(" - current canonical:", currentCanonical.id, "on", currentCanonical.domain.toString());
        console.log("removing asset and readding");
        const remove = await deployer.sendTransaction({
          to: connext.address,
          data: connext.interface.encodeFunctionData("removeAssetId(bytes32,address)", [key, currentAdopted]),
          value: constants.Zero,
        });
        // const remove = await connext.removeAssetId(key, currentAdopted);
        console.log("remove tx:", remove.hash);
        const receipt = await remove.wait();
        console.log("remove tx mined:", receipt.transactionHash);
      }
      const tx = await connext.setupAsset(canonicalTokenId, adopted, pool ?? constants.AddressZero);

      console.log("setupAsset tx: ", tx);
      const receipt = await tx.wait(1);
      console.log("setupAsset tx mined: ", receipt.transactionHash);

      const [isAssetApproved] = connext.interface.decodeFunctionResult(
        "approvedAssets(bytes32)",
        await deployer.call({
          to: connext.address,
          value: constants.Zero,
          data: connext.interface.encodeFunctionData("approvedAssets(bytes32)", [key]),
        }),
      );

      console.log("isAssetApproved: ", isAssetApproved);
    },
  );
