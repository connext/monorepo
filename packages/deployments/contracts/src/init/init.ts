import { config } from "dotenv";
import { getChainData, getChainIdFromDomain } from "@connext/nxtp-utils";
import { providers, Wallet, utils } from "ethers";

import { canonizeId, chainIdToDomain } from "../domain";

import { ProtocolStack, getDeployments, updateIfNeeded, NetworkStack, HubMessagingDeployments } from "./helpers";
import { setupAsset } from "./helpers/assets";
import { setupMessaging } from "./helpers/messaging";
import { DEFAULT_INIT_CONFIG } from "./config";

config();

export const OptionDefinitions = [
  { name: "name", defaultOption: true },
  { name: "network", type: String },
  { name: "env", type: String },
  { name: "chains", type: Number, multiple: true },
];

/**
 * Call the core `initProtocol` method.
 * Sanitizer method to make sure config is set up correctly.
 * @param config - ProtocolStack, but as any/Partial.
 */
export const sanitizeAndInit = async () => {
  /// MARK - ENV
  // Get deployment environment.
  const env = process.env.ENV || process.env.ENVIRONMENT;
  if (!env) {
    throw new Error(
      `ENVIRONMENT was not specified in env. Please specify whether ENVIRONMENT (for deployments) is staging or production, etc.",
      ${process.env.ENV}`,
    );
  }
  const useStaging = env === "staging";
  console.log(`USING ${useStaging ? "STAGING" : "PRODUCTION"} AS ENVIRONMENT`);

  /// MARK - CONFIG
  const config: any = useStaging ? STAGING_INIT_CONFIG : PRODUCTION_INIT_CONFIG;

  /// MARK - Deployer
  // Get deployer mnemonic, which should be provided in env if not in the config.
  const mnemonic = process.env.DEPLOYER || process.env.DEPLOYER_MNEMONIC || process.env.MNEMONIC;
  if (!mnemonic) {
    throw new Error(
      "Deployer mnemonic was not specified. Please specify `deployer` in the config file, " +
        "or set DEPLOYER or DEPLOYER_MNEMONIC in env.",
    );
  }
  // Convert deployer from mnemonic to Wallet.
  const deployer = Wallet.fromMnemonic(mnemonic);

  /// MARK - Domains
  // Make sure hub is specified.
  if (!config.hub) {
    throw new Error("`hub` was not specified in config. Please specify the Hub (L1) domain used for messaging.");
  }
  // Make sure hub domain is a string value.
  let hub = (config.hub as string | number).toString();
  // Make sure networks were specified.
  if (!Array.isArray(config.networks) || config.networks.length === 0) {
    throw new Error(
      "Networks were not specified in the config, or the networks list was empty. " +
        "Do you even want to init anything?",
    );
  }

  /// MARK - Deployments

  // Get deployments for each domain if not specified in the config.
  for (let i = 0; i < config.networks.length; i++) {
    const network = config.networks[i];
    // Make sure either domain or chain are specified.
    if (!network.domain && !network.chain) {
      throw new Error(
        "One of the networks in config doesn't even have a `domain` or `chain` " +
          "specified... bro, am I reading this right?",
      );
    } else if (network.domain) {
      const domain = (network.domain as string | number).toString();

      // Make sure domain is saved as a string.
      network.domain = domain;
      // Make sure correct chain ID is saved.
      // NOTE: Even if chain was specified as well, we'll consult the Domain => Chain ID conversion table anyway.
      network.chain = (await getChainIdFromDomain(domain)).toString();
    } else if (network.chain) {
      const chain = (network.chain as string | number).toString();

      // Make sure chain is saved as a string.
      network.chain = chain;
      // Make sure domain is specified.
      // network.domain = await getDomainFromChainId(parseInt(chain, 10));
      network.domain = chainIdToDomain(parseInt(chain, 10)).toString();
    }

    // RPC provider is required.
    if (!network.rpc) {
      throw new Error(
        `You didn't include an RPC provider for domain ${network.domain}. ` +
          "I literally can't work in these conditions.",
      );
    }
    // Convert RPC from URL string to JsonRpcProvider.
    network.rpc = new providers.JsonRpcProvider(network.rpc as string);

    // Get the deployments for this domain, if needed.
    if (!network.deployments) {
      let isHub = network.domain === hub;
      if (network.chain === hub) {
        // Consumer could have specified the hub by chain ID. If so, convert the hub to domain ID.
        isHub = true;
        hub = network.domain;
      }
      network.deployments = getDeployments({
        deployer,
        network,
        isHub,
        useStaging,
      });
    }

    // Make sure the stack is set.
    // TODO: Is this already performed in-place?
    config.networks[i] = network;
  }

  /// MARK - Hub
  // Hub domain should be a domain ID and be included in the list of supported domains.
  const supportedDomains = config.networks.map((d: any) => d.domain);
  console.log({ supportedDomains });
  if (!supportedDomains.includes(hub)) {
    const supportedChains = config.networks.map((d: any) => d.chain);
    throw new Error(
      `Hub domain/chain ${hub} was not found among the networks in protocol config. Is this some kind of prank?` +
        `Support domains: ${supportedDomains.join(",")}; Supported chains: ${supportedChains.join(",")}`,
    );
  }

  /// MARK - Assets
  // If assets are not specified, just set an empty array.
  const assets = config.assets ?? [];
  // All domains specified in AssetStack(s) must be included in domains.
  for (const asset of assets) {
    const domains = [asset.canonical.domain].concat(Object.keys(asset.representations as { [domain: string]: any }));
    console.log({ domains });
    for (const domain of domains) {
      if (!supportedDomains.includes(domain)) {
        throw new Error(
          `Asset with canonical address of ${asset.canonical.local} and canonical domain ${asset.canonical.domain} included ` +
            `an entry for a non-supported domain ${domain}. Please add the domain under the networks list in your config file.`,
        );
      }
    }
  }

  // TODO: Sanitize assets - all addresses specified?

  /// MARK - Agents
  // TODO: Sanitize agents - all strings are addresses?

  // TODO: Sanity - check that every hub has a spoke and vice versa!

  const sanitized = {
    ...config,
    deployer,
    hub,
    assets,
  } as ProtocolStack;
  console.log("Sanitized protocol config:", sanitized);

  console.log("DEBUG: Logging all deployment names:");
  for (const network of sanitized.networks) {
    console.log(
      network.chain,
      "deployments:",
      "\n" +
        Object.entries(network.deployments)
          .map(([k, v]) => {
            if ((v as any).name) {
              return `${k}: ${(v as any).proxy}`;
            } else {
              return Object.entries(network.deployments[k as keyof typeof network.deployments] as unknown as object)
                .map(([k, v]) => {
                  if (k === "HubConnectors") {
                    const list: string = v.map((c: any) => c.name).join(", ");
                    return `${k}: [ ${list} ]`;
                  }
                  return `${k}: ${v.proxy ?? v.name}`;
                })
                .join(";\n");
            }
          })
          .join(";\n"),
      "\n",
    );
  }

  await initProtocol(sanitized);
};

/**
 * Handle configuration of the entire protocol, including messaging stack and connext diamond
 * contracts, across all listed domains.
 *
 * Should effectively be a diagnostic on the whole protocol, making sure that everything that
 * requires configuration and/or setup has been done so properly.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const initProtocol = async (protocol: ProtocolStack) => {
  /// ********************** SETUP **********************
  /// MARK - ChainData
  // Retrieve chain data for it to be saved locally; this will avoid those pesky logs and frontload the http request.
  await getChainData(true);

  /// ********************* Messaging **********************
  /// MARK - Messaging
  await setupMessaging(protocol);

  // ********************* CONNEXT *********************
  /// MARK - Enroll Handlers
  console.log("\n\nEnrolling handlers");
  for (let i = 0; i < protocol.networks.length; i++) {
    const targetNetwork = protocol.networks[i];
    const remoteNetworks = protocol.networks.filter((_, j) => j !== i);
    for (const remoteNetwork of remoteNetworks) {
      const desiredConnextion = remoteNetwork.deployments.Connext.address;
      await updateIfNeeded({
        deployment: targetNetwork.deployments.Connext,
        desired: desiredConnextion,
        read: { method: "remote", args: [remoteNetwork.domain] },
        write: {
          method: "enrollRemoteRouter",
          args: [remoteNetwork.domain, utils.hexlify(canonizeId(desiredConnextion))],
        },
      });
    }
  }

  /// ********************* ASSETS **********************
  /// MARK - Register Assets
  console.log("\n\nREGISTER ASSETS");
  // Convert asset addresses: get canonical ID, canonical domain, convert to `key` hash.
  // Determine if a stableswap pool is needed - does asset have both `local` and `adopted`?
  // If so, initialize stableswap pool with `initializeSwap`.
  // Call `setupAsset` for each domain. This will:
  // - Set up mappings for canonical ID / canonical domain / adopted asset address / etc.
  // - Set up mapping for stableswap pool if applicable.
  for (const asset of protocol.assets) {
    await setupAsset({
      asset,
      networks: protocol.networks,
    });
  }

  /// ********************* AGENTS **********************
  if (protocol.agents) {
    /// MARK - Watchers
    if (protocol.agents.watchers) {
      if (protocol.agents.watchers.whitelist) {
        console.log("\n\nWHITELIST WATCHERS");

        // Get hub domain for specific use.
        const hub: NetworkStack = protocol.networks.filter((d) => d.domain === protocol.hub)[0];

        /// MARK - Contracts
        // Convenience setup for contracts.
        const { WatcherManager } = hub.deployments.messaging as HubMessagingDeployments;

        // Watchers are a permissioned role with the ability to disconnect malicious connectors.
        // Whitelist watchers in RootManager.
        for (const watcher of protocol.agents.watchers.whitelist) {
          await updateIfNeeded({
            deployment: WatcherManager,
            desired: true,
            read: { method: "isWatcher", args: [watcher] },
            write: { method: "addWatcher", args: [watcher] },
          });
        }
      }
      // TODO: Blacklist/remove watchers.
    }

    /// MARK - Relayers
    if (protocol.agents.relayers) {
      if (protocol.agents.relayers.whitelist) {
        console.log("\n\nWHITELIST RELAYERS");
        // Whitelist named relayers for the Connext bridge, in order to call `execute`.
        for (const relayer of protocol.agents.relayers.whitelist) {
          for (const network of protocol.networks) {
            await updateIfNeeded({
              deployment: network.deployments.Connext,
              desired: true,
              read: { method: "approvedRelayers", args: [relayer] },
              write: { method: "addRelayer", args: [relayer] },
            });
          }
        }
        // Additionally, approve relayers as callers for connectors and root manager.
      }
      // TODO: Blacklist/remove relayers.
    }

    /// MARK - Sequencers
    if (protocol.agents.sequencers) {
      if (protocol.agents.sequencers.whitelist) {
        console.log("\n\nWHITELIST SEQUENCERS");
        // Whitelist named sequencers.
        for (const sequencer of protocol.agents.sequencers.whitelist) {
          for (const network of protocol.networks) {
            await updateIfNeeded({
              deployment: network.deployments.Connext,
              desired: true,
              read: { method: "approvedSequencers", args: [sequencer] },
              write: { method: "addSequencer", args: [sequencer] },
            });
          }
        }
      }
      // TODO: Blacklist/remove sequencers.
    }

    /// MARK - Routers
    if (protocol.agents.routers) {
      if (protocol.agents.routers.whitelist) {
        console.log("\n\nWHITELIST ROUTERS");
        // Whitelist connext routers.
        for (const router of protocol.agents.routers.whitelist) {
          for (const network of protocol.networks) {
            await updateIfNeeded({
              deployment: network.deployments.Connext,
              desired: true,
              read: { method: "getRouterApproval", args: [router] },
              // TODO: Should we enable configuring owner and recipient for this script, too?
              write: { method: "setupRouter", args: [router, router, router] },
            });
          }
        }
      }
      // TODO: Blacklist/remove routers.
    }
  }
};
