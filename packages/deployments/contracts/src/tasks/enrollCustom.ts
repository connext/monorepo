import { constants, Contract } from "ethers";
import { hexlify } from "ethers/lib/utils";
import { task } from "hardhat/config";

import { canonizeId, delay } from "../nomad";
import { Env, getDeploymentName, mustGetEnv } from "../utils";

type TaskArgs = {
  domain: string;
  canonical: string;
  custom?: string;
  registry?: string;
  env?: Env;
};

export default task("enroll-custom", "Ensures a local address exists for the given canonical token")
  .addParam("domain", "Canonical token domain")
  .addParam("canonical", "Address of canonical token")
  .addOptionalParam("custom", "Address of token to enroll (otherwise is TestERC20 on network)")
  .addOptionalParam("registry", "Token registry address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(
    async (
      { domain, canonical, custom: _custom, registry: _registry, env: _env }: TaskArgs,
      { deployments, ethers },
    ) => {
      let { deployer } = await ethers.getNamedSigners();
      if (!deployer) {
        [deployer] = await ethers.getUnnamedSigners();
      }

      const env = mustGetEnv(_env);
      console.log("env:", env);
      console.log("domain: ", domain);
      console.log("canonical: ", canonical);
      console.log("deployer: ", deployer.address);

      const tokenName = getDeploymentName("TestERC20", env);
      const tokenDeployment = await deployments.get(tokenName);
      const custom = _custom ?? tokenDeployment.address;
      console.log("custom: ", custom);

      const tokenRegistryDeployment = await deployments.get(getDeploymentName("TokenRegistryUpgradeBeaconProxy", env));
      const tokenRegistryAddress = _registry ?? tokenRegistryDeployment.address;
      console.log("tokenRegistryAddress: ", tokenRegistryAddress);

      const tokenRegistry = new Contract(
        tokenRegistryAddress,
        (await deployments.get(getDeploymentName("TokenRegistry", env))).abi,
        deployer,
      );
      const owner = await tokenRegistry.owner();
      console.log("token registry owner:", owner);
      console.log("token registry beacon:", await tokenRegistry.tokenBeacon());

      // if (deployer.address !== owner) {
      //   throw new Error("deployer is not owner");
      // }
      const canonicalTokenId = {
        id: hexlify(canonizeId(canonical)),
        domain: +domain,
      };

      const local = await tokenRegistry.getRepresentationAddress(canonicalTokenId.domain, canonicalTokenId.id);
      if (local !== constants.AddressZero) {
        console.log("overriding existing local at:", local);
        // smol delay for the fat-fingered
        await delay(1_000);
      }
      console.log("enrolling custom token");

      const tx = await tokenRegistry.enrollCustom(canonicalTokenId.domain, canonicalTokenId.id, custom);
      console.log("enrollCustom tx: ", tx);
      const receipt = await tx.wait(1);
      console.log("enrollCustom tx mined: ", receipt.transactionHash);

      const enrolled = await tokenRegistry.getRepresentationAddress(canonicalTokenId.domain, canonicalTokenId.id);
      console.log(`local representation of ${canonical} on ${domain}: ${enrolled}`);
    },
  );
