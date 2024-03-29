import { BigNumber, BigNumberish, Contract, constants, utils } from "ethers";
import { ChainData, ERC20Abi, getAssetEntryFromChaindata } from "@connext/nxtp-utils";
import { parseUnits } from "ethers/lib/utils";

import { canonizeId } from "../../../domain";

import { AssetStack, NetworkStack } from "./types";
import { getValue, updateIfNeeded } from "../../helpers";

export const setupAsset = async (args: {
  apply: boolean;
  asset: AssetStack;
  networks: NetworkStack[];
  chainData: Map<string, ChainData>;
  useStaging: boolean;
}) => {
  const { asset, networks, chainData, apply, useStaging } = args;

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
    `\n\tVerifying asset setup for ${asset.name} (${asset.canonical.address}). Canonical ID: ${canonical.id}; Canonical Domain: ${canonical.domain}; Key: ${key}`,
  );

  let canonicalDecimals = asset.canonical.decimals;
  if (!canonicalDecimals) {
    const record = getAssetEntryFromChaindata(asset.canonical.address, asset.canonical.domain, chainData);
    canonicalDecimals = record?.decimals;
  }

  if (!canonicalDecimals) {
    throw new Error(
      `Could not get the decimals for asset ${asset.canonical.address} on domain ${asset.canonical.domain}`,
    );
  }

  const tokenName = asset.name.startsWith(`next`) ? asset.name : `next${asset.name.toUpperCase()}`;
  const tokenSymbol = tokenName;

  if (!canonicalDecimals) {
    throw new Error(`Unable to find canonical decimals in config for ${asset.name}`);
  }

  // Set up all the representational assets on their respective domains.
  for (const [domain, representation] of Object.entries(asset.representations)) {
    if (!representation) continue;
    const stableswapPool = constants.AddressZero;

    const network = networks.find((n) => n.domain === domain);
    if (!network) {
      throw new Error(
        `Could not find network ${domain} for asset ${asset.canonical.address} in the configured list of networks!`,
      );
    }

    // Run setupAsset.
    const desiredAdopted = representation.adopted;
    if (desiredAdopted === constants.AddressZero) {
      console.log(`Desired Adopted is Zero Address. Skipping`);
      continue;
    }

    let setupAssetDone = true;
    try {
      const adopted: undefined | string = await getValue({
        deployment: network.deployments.Connext,
        read: { method: "canonicalToAdopted(bytes32)", args: [key] },
      });

      if (adopted && adopted.toLowerCase() !== desiredAdopted.toLowerCase()) {
        await updateIfNeeded({
          apply,
          deployment: network.deployments.Connext,
          desired: false,
          auth: [
            { method: "owner", eval: (ret: string) => ret.toLowerCase() === network.signerAddress },
            { method: "queryRole", args: [network.signerAddress], eval: (ret) => ret === 3 },
          ],
          read: { method: "approvedAssets(bytes32)", args: [key] },
          write: {
            method: "removeAssetId((uint32,bytes32),address,address)",
            args: [[canonical.domain, canonical.id], desiredAdopted, representation.local],
          },
        });

        setupAssetDone = false;
      }
    } catch (e: any) {
      console.log(`Failed to lookup canonical to adopted, or remove asset:`, e.message);
      // `canonicalToAdopted` function reverts if `key` didn't get allowlisted
      setupAssetDone = false;
    }

    if (representation.local) {
      await updateIfNeeded({
        apply,
        deployment: network.deployments.Connext,
        desired: desiredAdopted,
        read: { method: "canonicalToAdopted(bytes32)", args: [key] },
        auth: [
          { method: "owner", eval: (ret: string) => ret.toLowerCase() === network.signerAddress },
          { method: "queryRole", args: [network.signerAddress], eval: (ret) => ret === 3 },
        ],
        write: {
          method: "setupAssetWithDeployedRepresentation",
          args: [[canonical.domain, canonical.id], representation.local, desiredAdopted, stableswapPool],
        },
      });
    } else {
      if (!setupAssetDone) {
        await updateIfNeeded({
          apply,
          deployment: network.deployments.Connext,
          desired: desiredAdopted,
          read: { method: "canonicalToAdopted(bytes32)", args: [key] },
          auth: [
            { method: "owner", eval: (ret: string) => ret.toLowerCase() === network.signerAddress },
            { method: "queryRole", args: [network.signerAddress], eval: (ret) => ret === 3 },
          ],
          write: {
            method: "setupAsset",
            args: [
              [canonical.domain, canonical.id],
              canonicalDecimals,
              tokenName,
              tokenSymbol,
              desiredAdopted,
              stableswapPool,
              0, // caps are not set on non-canonical domains
            ],
          },
        });
      }
    }

    // After registering the asset, check pool status.
    const [local, adopted] = apply
      ? await getValue<[string, string]>({
          deployment: network.deployments.Connext,
          read: { method: "getLocalAndAdoptedToken(bytes32,uint32)", args: [canonical.id, canonical.domain] },
        })
      : [representation.local ?? constants.AddressZero, representation.adopted];

    if (local.toLowerCase() === adopted.toLowerCase() || local.toLowerCase() === constants.AddressZero) {
      // No pools are needed / configured
      continue;
    }

    // Verify pools must be initialized
    const poolInitd = await getValue<BigNumber>({
      read: { method: "getSwapA(bytes32)", args: [key] },
      deployment: network.deployments.Connext,
    });

    if (poolInitd.gt(0)) {
      // Pool init-d, continue
      continue;
    }

    // Get decimals from tokens
    const tokens = [new Contract(local, ERC20Abi, network.rpc), new Contract(adopted, ERC20Abi, network.rpc)];
    const decimals = await Promise.all(tokens.map((t) => t.decimals()));

    // Generate inputs for pool
    const INITIAL_A = 200;
    const SWAP_FEE = 4e6; // 4bps FEE_DENOMINATOR = 10 ** 10
    const ADMIN_FEE = 0;
    const lpTokenName = `Connext ${asset.name.toUpperCase()} ${asset.name.toUpperCase()} StableSwap LP`;
    const lpTokenSymbol = `C${asset.name.toUpperCase()}LP`;

    const a = representation.pool?.a ?? INITIAL_A;

    // Initialize pool
    await updateIfNeeded({
      apply,
      deployment: network.deployments.Connext,
      desired: BigNumber.from(a),
      read: { method: "getSwapA(bytes32)", args: [key] },
      auth: [
        { method: "owner", eval: (ret: string) => ret.toLowerCase() === network.signerAddress },
        { method: "queryRole", args: [network.signerAddress], eval: (ret) => ret === 3 },
      ],
      write: {
        method: "initializeSwap",
        args: [
          key,
          [local, adopted],
          decimals,
          lpTokenName,
          lpTokenSymbol,
          a,
          representation.pool?.fee ?? SWAP_FEE,
          representation.pool?.adminFee ?? ADMIN_FEE,
        ],
      },
    });

    // Deposit into pool in equal amounts
    const liquidity = decimals.map((decimal) =>
      parseUnits(representation.pool?.initialLiquidity ?? "15", decimal as number),
    );

    // Verify there is sufficient amounts
    const addr = await network.deployments.Connext.contract.signer.getAddress();
    const balances = await Promise.all(tokens.map((t) => t.balanceOf(addr)));
    const funded = liquidity.every((l, i) => l.gte(balances[i] as BigNumberish));
    if (!funded && apply) {
      // Cannot fund pool
      console.warn(`Insufficient balance to provide initial pool funding. Skipping.`);
      continue;
    }

    // This is the buffer to submit the add liquidity. should be sufficient to ensure the
    // tx is fully completed. Less sensitive to front-running due to small amounts added.
    const deadlineBuffer = 2 * 24 * 60 * 60; // 2 days

    // Add liquidity
    await updateIfNeeded({
      apply,
      deployment: network.deployments.Connext,
      desired: liquidity[0],
      read: { method: "getSwapTokenBalance(bytes32,uint8)", args: [key, 0] },
      write: {
        method: "addSwapLiquidity",
        args: [
          key,
          liquidity, // equal liquidity amounts
          constants.One, // min to mint is 1
          Math.floor(Date.now() / 1_000) + deadlineBuffer,
        ],
      },
    });
    console.log("");
  }
};
