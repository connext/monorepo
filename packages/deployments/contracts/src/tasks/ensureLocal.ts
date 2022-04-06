import { isValidBytes32 } from "@connext/nxtp-utils";
import { constants } from "ethers";
import { hexlify } from "ethers/lib/utils";
import { task } from "hardhat/config";

import { canonizeId } from "../nomad";

type TaskArgs = {
  domain: string;
  canonical: string;
  registry?: string;
};

export default task("ensure-local", "Ensures a local address exists for the given canonical token")
  .addParam("domain", "Canonical token domain")
  .addParam("canonical", "Address of canonical token")
  .addOptionalParam("registry", "Override token registry address")
  .setAction(
    async ({ domain, canonical, registry: _registry }: TaskArgs, { deployments, getNamedAccounts, ethers }) => {
      const namedAccounts = await getNamedAccounts();

      console.log("domain: ", domain);
      console.log("canonical: ", canonical);
      console.log("namedAccounts: ", namedAccounts);

      let tokenRegistryAddress = _registry;
      if (!tokenRegistryAddress) {
        const deployment = await deployments.get("TokenRegistryUpgradeBeaconProxy");
        tokenRegistryAddress = deployment.address;
      }
      console.log("tokenRegistryAddress: ", tokenRegistryAddress);

      const tokenRegistry = await ethers.getContractAt(
        (
          await deployments.getArtifact("TokenRegistry")
        ).abi,
        tokenRegistryAddress,
      );
      console.log("token registry owner:", await tokenRegistry.owner());
      console.log("token registry beacon:", await tokenRegistry.tokenBeacon());

      const canonicalTokenId = {
        id: hexlify(canonizeId(canonical)),
        domain: +domain,
      };
      console.log("valid bytes32?", isValidBytes32(canonicalTokenId.id));

      let local = await tokenRegistry.getRepresentationAddress(canonicalTokenId.domain, canonicalTokenId.id);
      if (local !== constants.AddressZero) {
        console.log("local already exists at:", local);
        return;
      }
      console.log("deploying local token");

      const tx = await tokenRegistry.ensureLocalToken(canonicalTokenId.domain, canonicalTokenId.id, {
        from: namedAccounts.deployer,
      });
      console.log("ensureLocalToken tx: ", tx);
      const receipt = await tx.wait();
      console.log("ensureLocalToken tx mined: ", receipt.transactionHash);

      local = await tokenRegistry.getRepresentationAddress(canonicalTokenId.domain, canonicalTokenId.id);
      console.log(`local representation of ${canonical} on ${domain}: ${local}`);
    },
  );
