import { constants, utils } from "ethers";

import { canonizeId } from "../../domain";

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
  console.log(
    `\tVerifying asset setup for ${asset.name ?? asset.canonical.address}. Canonical ID: ${
      canonical.id
    }; Canonical Domain: ${canonical.domain}; Key: ${key}`,
  );

  // Set up the canonical asset on the canonical domain.
  const home = networks.find((n) => n.domain === asset.canonical.domain);
  if (!home) {
    throw new Error(
      `Could not find canonical domain network ${asset.canonical.domain} for asset ${asset.canonical.address} in` +
        "the configured list of networks!",
    );
  }
  await updateIfNeeded({
    deployment: home.deployments.Connext,
    desired: asset.canonical.address,
    read: { method: "canonicalToAdopted(bytes32)", args: [key] },
    write: {
      method: "setupAsset",
      args: [[canonical.domain, canonical.id], asset.canonical.address, constants.AddressZero],
    },
  });

  // Set up all the representational assets on their respective domains.
  for (const [domain, representation] of Object.entries(asset.representations)) {
    const stableswapPool = constants.AddressZero;
    if (representation.local && representation.adopted) {
      // TODO: A stableswap pool is needed. Initialize the pool.
    }

    const network = networks.find((n) => n.domain === domain);
    if (!network) {
      throw new Error(
        `Could not find network ${domain} for asset ${asset.canonical.address} in the configured list of networks!`,
      );
    }

    if (!representation.local) {
      throw new Error(
        "Can't call `setupAsset` for an asset with no local representations! No `local` bridge token was provided.",
      );
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
