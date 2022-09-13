import * as fs from "fs";

import { getChainData, getChainIdFromDomain, getDomainFromChainId } from "@connext/nxtp-utils";
import { constants, providers, Wallet } from "ethers";

import {
  ProtocolStack,
  NetworkStack,
  HubMessagingDeployments,
  SpokeMessagingDeployments,
  getDeployments,
  enrollHandlers,
  updateIfNeeded,
  assertValue,
  getValue,
} from "./helpers";
import { setupAsset } from "./helpers/assets";

/**
 * Call the core `initProtocol` method using a JSON config file provided by the local environment.
 */
export const initWithEnv = async () => {
  const path = process.env.INIT_CONFIG_FILE ?? "init.json";
  console.log(`Retrieving config file from ${path}...`);
  if (!fs.existsSync(path)) {
    throw new Error(
      "No init config file was provided. Please set INIT_CONFIG_FILE in env or create init.json locally.",
    );
  }
  const json = fs.readFileSync(path, { encoding: "utf-8" });
  console.log("Parsing JSON config...");
  // TODO: Use typebox and AJV parser for config to ensure params are correct?
  const config = JSON.parse(json);
  if (!config) {
    throw new Error("Config was empty? Please ensure your JSON file has, like, stuff in it.");
  }

  await sanitizeAndInit(config);
};

/**
 * Sanitizer method to make sure config is set up correctly.
 * @param config - ProtocolStack, but as any/Partial.
 */
export const sanitizeAndInit = async (config: any) => {
  /// MARK - Deployer
  // Get deployer mnemonic, which should be provided in env if not in the config.
  const mnemonic = config.deployer || process.env.DEPLOYER || process.env.DEPLOYER_MNEMONIC;
  if (!mnemonic) {
    throw new Error(
      "Deployer mnemonic was not specified. Please specify `deployer` in the config file, " +
        "or set DEPLOYER or DEPLOYER_MNEMONIC in env.",
    );
  }
  // Convert deployer from mnemonic to Wallet.
  const deployer = Wallet.fromMnemonic(mnemonic as string);

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
  // Get deployment environment.
  const env = config.environment || process.env.ENVIRONMENT;
  if (!env) {
    throw new Error(
      "ENVIRONMENT was not specified in config or env. Please specify whether ENVIRONMENT (for deployments) is `staging` " +
        "or `production`, etc.",
    );
  }
  const useStaging = env === "staging";
  console.log(`USING ${useStaging ? "STAGING" : "PRODUCTION"} AS ENVIRONMENT`);

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
      network.domain = await getDomainFromChainId(parseInt(chain, 10));
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

  /// MARK - Peripherals
  // Get hub domain for specific use.
  const hub: NetworkStack = protocol.networks.filter((d) => d.domain === protocol.hub)[0];

  /// MARK - Contracts
  // Convenience setup for contracts.
  const { RootManager, MainnetConnector, HubConnectors } = hub.deployments.messaging as HubMessagingDeployments;

  /// ******************** MESSAGING ********************
  /// MARK - Init
  // TODO: Currently unused, as messaging init checks are not needed with the AMB-compatible stack.
  // However, they will be useful as sanity checks for Nomad deployments in the future - thus, leaving
  // this placeholder here for now...

  /// MARK - Connector Mirrors
  console.log("\n\nMESSAGING");
  // Connectors should have their mirrors' address set; this lets them know about their counterparts.
  for (const HubConnector of HubConnectors) {
    // Get the connector's mirror domain (and convert to a string value).
    const mirrorDomain = (
      await getValue<number>({
        deployment: HubConnector,
        read: "mirrorDomain",
      })
    ).toString();

    // Find the spoke domain.
    let foundMirror = false;
    for (const spoke of protocol.networks) {
      if (spoke.domain === mirrorDomain) {
        if (spoke.domain === hub.domain) {
          throw new Error("Mirror domain was hub? Bruh");
        }
        foundMirror = true;
        const SpokeConnector = (spoke.deployments.messaging as SpokeMessagingDeployments).SpokeConnector;

        console.log(`\tVerifying connection: ${hub.chain}<>${spoke.chain}:`);

        /// MARK - Sanity Checks
        // Sanity check: Make sure RootManager is set correctly for the HubConnector.
        // NOTE: We CANNOT update the currently set ROOT_MANAGER; it is `immutable` and will require redeployment.
        console.log("\tVerifying Connectors' ROOT_MANAGER set correctly.");
        await assertValue({
          deployment: HubConnector,
          read: "ROOT_MANAGER",
          desired: RootManager.address,
        });
        // Sanity check: Make sure RootManager is set correctly for the SpokeConnector.
        await assertValue({
          deployment: SpokeConnector,
          read: "ROOT_MANAGER",
          desired: RootManager.address,
        });

        /// MARK - RootManager: Add Connector
        // Set hub connector address for this domain on RootManager.
        console.log("\tVerifying RootManager `connectors` has HubConnector set correctly.");
        const currentValue = await getValue({
          deployment: RootManager,
          read: { method: "connectors", args: [spoke.domain] },
        });
        // If the current connector address is not correct and isn't empty, we need to remove the connector first.
        if (currentValue !== HubConnector.address && currentValue !== constants.AddressZero) {
          await updateIfNeeded({
            deployment: RootManager,
            desired: constants.AddressZero,
            read: { method: "connectors", args: [spoke.domain] },
            write: { method: "removeConnector", args: [spoke.domain] },
          });
        }

        await updateIfNeeded({
          deployment: RootManager,
          desired: HubConnector.address,
          read: { method: "connectors", args: [spoke.domain] },
          write: { method: "addConnector", args: [spoke.domain, HubConnector.address] },
        });

        /// MARK - Connectors: Mirrors
        // Set the mirrors for both the spoke domain's Connector and hub domain's Connector.
        console.log("\tVerifying mirror connectors are set correctly.");
        await updateIfNeeded({
          deployment: HubConnector,
          desired: SpokeConnector.address,
          read: { method: "mirrorConnector", args: [] },
          write: { method: "setMirrorConnector", args: [SpokeConnector.address] },
        });
        await updateIfNeeded({
          deployment: SpokeConnector,
          desired: HubConnector.address,
          read: { method: "mirrorConnector", args: [] },
          write: { method: "setMirrorConnector", args: [HubConnector.address] },
        });

        /// MARK - Connectors: Whitelist Senders
        // Whitelist message-sending Handler contracts (AKA 'Routers'); will enable those message senders to
        // call `dispatch`.
        console.log("\tVerifying senders (handlers) are whitelisted.");
        for (const handler of Object.values(spoke.deployments.handlers)) {
          await updateIfNeeded({
            deployment: SpokeConnector,
            desired: true,
            read: { method: "whitelistedSenders", args: [handler.address] },
            write: { method: "addSender", args: [handler.address] },
          });
        }
        for (const handler of Object.values(hub.deployments.handlers)) {
          await updateIfNeeded({
            deployment: HubConnector,
            desired: true,
            read: { method: "whitelistedSenders", args: [handler.address] },
            write: { method: "addSender", args: [handler.address] },
          });
        }
      }
    }

    // TODO: Actually, should we just submit a warning and skip this iteration? We may discontinue an L2...
    // TODO: Alternatively, this would be best as a sanity check.
    if (!foundMirror) {
      throw new Error(
        `Did not find mirrorDomain ${mirrorDomain} in protocol networks! Please configure all Spoke (L2) networks.`,
      );
    }
  }

  /// MARK - MainnetConnector
  // On the hub itself, you only need to connect the mainnet l1 connector to RootManager (no mirror).
  console.log("\tVerifying MainnetConnector is set up correctly...");
  // Sanity check: mirror is address(0).
  assertValue({
    deployment: MainnetConnector,
    desired: constants.AddressZero,
    read: "mirrorConnector",
  });

  // Make sure RootManager is set correctly for this MainnetConnector.
  // NOTE: We CANNOT update the currently set ROOT_MANAGER; it is `immutable` and will require redeployment.
  assertValue({
    deployment: MainnetConnector,
    desired: RootManager.address,
    read: "ROOT_MANAGER",
  });

  // Functionality of the MainnetConnector is that of a spoke; we should hook it up to the RootManager.
  const currentValue = await getValue({
    deployment: RootManager,
    read: { method: "connectors", args: [hub.domain] },
  });
  // If the current connector address is not correct and isn't empty, we need to remove the connector first.
  if (currentValue !== MainnetConnector.address && currentValue !== constants.AddressZero) {
    await updateIfNeeded({
      deployment: RootManager,
      desired: constants.AddressZero,
      read: { method: "connectors", args: [hub.domain] },
      write: { method: "removeConnector", args: [hub.domain] },
    });
  }
  await updateIfNeeded({
    deployment: RootManager,
    desired: MainnetConnector.address,
    read: { method: "connectors", args: [hub.domain] },
    write: { method: "addConnector", args: [hub.domain, MainnetConnector.address] },
  });

  for (const handler of Object.values(hub.deployments.handlers)) {
    await updateIfNeeded({
      deployment: MainnetConnector,
      desired: true,
      read: { method: "whitelistedSenders", args: [handler.address] },
      write: { method: "addSender", args: [handler.address] },
    });
  }

  /// MARK - Enroll Handlers
  console.log("\n\nENROLL HANDLERS");
  // While the Connectors will only accept messages from registered routers on their domains, Routers will only process
  // messages that originate from their counterpart on another domain (e.g. BridgeRouter on Domain X to BridgeRouter on
  // Domain Y). Thus, we need to enroll each Handler/Router contract with all of their counterparts on all other domains.
  // NOTE: This will also set `bridgeRouter` in Connext contract to the correct address.
  await enrollHandlers({ protocol });

  /// ********************* CONNEXT *********************
  /// MARK - Init
  // Check to make sure Diamond Proxy is initialized.
  /// MARK - Connextions
  console.log("\n\nSET CONNEXTIONS");
  // TODO/NOTE: Will likely be removing 'connextions' once we combine Connext+BridgeRouter.
  for (let i = 0; i < protocol.networks.length; i++) {
    const targetNetwork = protocol.networks[i];
    const remoteNetworks = protocol.networks.filter((_, j) => j !== i);
    for (const remoteNetwork of remoteNetworks) {
      const desiredConnextion = remoteNetwork.deployments.Connext.address;
      await updateIfNeeded({
        deployment: targetNetwork.deployments.Connext,
        desired: desiredConnextion,
        read: { method: "connextion", args: [remoteNetwork.domain] },
        write: { method: "addConnextion", args: [remoteNetwork.domain, desiredConnextion] },
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
  // - Register assets in the TokenRegistry (enroll-custom).
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
        // Watchers are a permissioned role with the ability to disconnect malicious connectors.
        // Whitelist watchers in RootManager.
        for (const watcher of protocol.agents.watchers.whitelist) {
          await updateIfNeeded({
            deployment: RootManager,
            desired: true,
            read: { method: "watchers", args: [watcher] },
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
