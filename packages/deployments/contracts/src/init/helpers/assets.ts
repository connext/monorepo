import { constants, utils } from "ethers";

import { canonizeId } from "../../nomad";

import { AssetStack, NetworkStack } from "./types";
import { updateIfNeeded } from "./tx";

export const setupAsset = async (args: { asset: AssetStack; networks: NetworkStack[] }) => {
  const { asset, networks } = args;

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

    if (!representation.local) {
      throw new Error("Can't setupAsset for a domain with no representations!");
    }

    // Enroll custom local token.
    const TokenRegistry = network.deployments.TokenRegistry;
    await updateIfNeeded({
      deployment: TokenRegistry,
      desired: representation.local,
      read: { method: "getRepresentationAddress", args: [canonical.domain, canonical.id] },
      write: {
        method: "enrollCustom",
        args: [canonical.domain, canonical.id, representation.local],
      },
    });

    // Run setupAsset.
    const desiredAdopted = representation.adopted ?? representation.local;
    await updateIfNeeded({
      deployment: network.deployments.Connext,
      desired: desiredAdopted,
      read: { method: "canonicalToAdopted(bytes32)", args: [key] },
      write: {
        method: "setupAsset",
        args: [[canonical.domain, canonical.id], desiredAdopted, stableswapPool],
      },
    });
  }
};
