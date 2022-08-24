import { constants, utils, Wallet } from "ethers";
import { canonizeId } from "@connext/nxtp-contracts";

import { AssetStack, NetworkStack } from "./types";
import { updateIfNeeded } from "./tx";
import { getConnextContract } from "./contracts";

export const setupAsset = async (args: { deployer: Wallet; asset: AssetStack; networks: NetworkStack[] }) => {
  const { asset, networks, deployer } = args;

  // Derive the global asset key using the (canonized) canonical address and the canonical domain.
  const canonical = {
    id: utils.hexlify(canonizeId(asset.canonical.address)),
    domain: +asset.canonical.domain,
  };
  const key = utils.solidityKeccak256(
    ["bytes"],
    [utils.defaultAbiCoder.encode(["bytes32", "uint32"], [canonical.id, canonical.domain])],
  );

  for (const [domain, representation] of Object.entries(asset.representations)) {
    const stableswapPool = constants.AddressZero;
    if (representation.local && representation.adopted) {
      // A stableswap pool is needed. Initialize the pool.
    }

    const network = networks.find((n) => n.domain === domain);
    if (!network) {
      throw new Error(
        `Could not find network ${domain} for asset ${asset.canonical.address} in the configured list of networks!`,
      );
    }

    const adopted = representation.adopted ?? representation.local;
    if (!adopted) {
      throw new Error("Can't setupAsset for a domain with no representations!");
    }
    await updateIfNeeded({
      scheme: {
        contract: getConnextContract({
          deployer,
          network,
        }),
        desired: adopted,
        read: { method: "canonicalToAdopted(bytes32)", args: [key] },
        write: {
          method: "setupAsset",
          args: [[canonical.domain, canonical.id], adopted, stableswapPool],
        },
      },
    });
  }
};
