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
  setConnextions,
  getConnextContract,
  getRootManagerContract,
  getConnectorContract,
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
      network.deployments = getDeployments(network.chain as string, isHub, useStaging);
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

  const sanitized = {
    ...config,
    deployer,
    hub,
    assets,
  } as ProtocolStack;
  console.log("Sanitized protocol config:", sanitized);
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
  const { deployer } = protocol;

  /// MARK - Contracts
  // Convenience setup for contracts.
  const { RootManager, MainnetConnector, HubConnectors } = hub.deployments.messaging as HubMessagingDeployments;
  // TODO: Might be cool to go ahead and convert all deployments to Contract objects, connected to their corresponding providers...
  const RootManagerContract = getRootManagerContract({
    deployer,
    hub,
  });
  const MainnetConnectorContract = getConnectorContract({
    deployer,
    network: hub,
    address: MainnetConnector.address,
  });

  /// ******************** MESSAGING ********************
  /// MARK - Init
  // TODO: Currently unused, as messaging init checks are not needed with the AMB-compatible stack.
  // However, they will be useful as sanity checks for Nomad deployments in the future - thus, leaving
  // this placeholder here for now...

  /// MARK - Connector Mirrors
  console.log("\n\nCONNECTORS : SET MIRRORS");
  // Connectors should have their mirrors' address set; this lets them know about their counterparts.
  for (const HubConnector of HubConnectors) {
    const HubConnectorContract = getConnectorContract({
      deployer,
      network: hub,
      address: HubConnector.address,
    });

    // Get the connector's mirror domain.
    const mirrorDomain = (
      await getValue<number>({
        scheme: {
          contract: HubConnectorContract,
          read: "mirrorDomain",
        },
      })
    ).toString();

    // Find the spoke domain.
    let foundMirror = false;
    for (const spoke of protocol.networks) {
      if (spoke.domain === mirrorDomain) {
        foundMirror = true;
        const SpokeConnector = (spoke.deployments.messaging as SpokeMessagingDeployments).SpokeConnector;
        const SpokeConnectorContract = getConnectorContract({
          deployer,
          network: spoke,
          address: SpokeConnector.address,
        });

        // Sanity check: Make sure RootManager is set correctly for the HubConnector.
        // NOTE: We CANNOT update the currently set ROOT_MANAGER; it is `immutable` and will require redeployment.
        await assertValue({
          scheme: {
            contract: HubConnectorContract,
            read: "ROOT_MANAGER",
            desired: RootManager.address,
          },
        });
        // Sanity check: Make sure RootManager is set correctly for the SpokeConnector.
        await assertValue({
          scheme: {
            contract: SpokeConnectorContract,
            read: "ROOT_MANAGER",
            desired: RootManager.address,
          },
        });

        // Set hub connector address for this domain on RootManager.
        await updateIfNeeded({
          scheme: {
            contract: RootManagerContract,
            desired: HubConnector.address,
            read: { method: "connectors", args: [spoke.domain] },
            write: { method: "addConnector", args: [spoke.domain, HubConnector.address] },
          },
        });

        // Set the mirrors for both the spoke domain's Connector and hub domain's Connector.
        await updateIfNeeded({
          scheme: {
            contract: HubConnectorContract,
            desired: SpokeConnector.address,
            read: { method: "mirrorConnector", args: [] },
            write: { method: "setMirrorConnector", args: [SpokeConnector.address] },
          },
        });
        await updateIfNeeded({
          scheme: {
            contract: SpokeConnectorContract,
            desired: HubConnector.address,
            read: { method: "mirrorConnector", args: [] },
            write: { method: "setMirrorConnector", args: [HubConnector.address] },
          },
        });
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

  // On the hub itself, you only need to connect the mainnet l1 connector to RootManager (no mirror).
  // Make sure all things are set correctly.

  // Sanity check: mirror is address(0).
  assertValue({
    scheme: {
      contract: MainnetConnectorContract,
      desired: constants.AddressZero,
      read: "mirrorConnector",
    },
  });

  // Make sure RootManager is set correctly for this MainnetConnector.
  // NOTE: We CANNOT update the currently set ROOT_MANAGER; it is `immutable` and will require redeployment.
  assertValue({
    scheme: {
      contract: MainnetConnectorContract,
      desired: RootManager.address,
      read: "ROOT_MANAGER",
    },
  });

  /// MARK - Whitelist Senders
  console.log("\n\nHANDLERS : WHITELIST SENDERS");
  // Whitelist message-sending Handler contracts (AKA 'Routers'); will enable those message senders to call `dispatch`.
  for (const network of protocol.networks) {
    // Skip the hub; no senders need whitelisting.
    if (network.domain === protocol.hub) {
      continue;
    }
    console.log(`\n* [${network.chain}] Whitelisting senders.`);
    for (const handler of Object.values(network.deployments.handlers)) {
      await updateIfNeeded({
        scheme: {
          contract: getConnectorContract({
            deployer,
            network,
            address: undefined, // Will default to the address from SpokeConnector deployment.
          }),
          desired: true,
          read: { method: "whitelistedSenders", args: [handler.address] },
          write: { method: "addSender", args: [handler.address] },
        },
      });
    }
  }

  /// MARK - Enroll Handlers
  console.log("\n\nHANDLERS : ENROLL HANDLERS");
  // While the Connectors will only accept messages from registered routers on their domains, Routers will only process
  // messages that originate from their counterpart on another domain (e.g. BridgeRouter on Domain X to BridgeRouter on
  // Domain Y). Thus, we need to enroll each Handler/Router contract with all of their counterparts on all other domains.
  // NOTE: This will also set `bridgeRouter` in Connext contract to the correct address.
  await enrollHandlers({ protocol });

  /// ********************* CONNEXT *********************
  /// MARK - Init
  // Check to make sure Diamond Proxy is initialized.
  /// MARK - Connextions
  console.log("\n\nCONNEXT : SET CONNEXTIONS");
  // TODO/NOTE: Will likely be removing 'connextions' once we combine Connext+BridgeRouter.
  await setConnextions({ protocol });

  /// ********************* ASSETS **********************
  /// MARK - Register Assets
  console.log("\n\nASSETS : REGISTER ASSETS");
  // Convert asset addresses: get canonical ID, canonical domain, convert to `key` hash.
  // Determine if a stableswap pool is needed - does asset have both `local` and `adopted`?
  // If so, initialize stableswap pool with `initializeSwap`.
  // Call `setupAsset` for each domain. This will:
  // - Register assets in the TokenRegistry (enroll-custom).
  // - Set up mappings for canonical ID / canonical domain / adopted asset address / etc.
  // - Set up mapping for stableswap pool if applicable.
  for (const asset of protocol.assets) {
    await setupAsset({
      deployer,
      asset,
      networks: protocol.networks,
    });
  }

  /// ********************* AGENTS **********************
  if (protocol.agents) {
    /// MARK - Watchers
    if (protocol.agents.watchers) {
      if (protocol.agents.watchers.whitelist) {
        console.log("\n\nROOT MANAGER : WHITELIST WATCHERS");
        // Watchers are a permissioned role with the ability to disconnect malicious connectors.
        // Whitelist watchers in RootManager.
        for (const watcher of protocol.agents.watchers.whitelist) {
          await updateIfNeeded({
            scheme: {
              contract: RootManagerContract,
              desired: true,
              read: { method: "watchers", args: [watcher] },
              write: { method: "addWatcher", args: [watcher] },
            },
          });
        }
      }
      // TODO: Blacklist/remove watchers.
    }

    /// MARK - Relayers
    if (protocol.agents.relayers) {
      if (protocol.agents.relayers.whitelist) {
        console.log("\n\nCONNEXT : WHITELIST RELAYERS");
        // Whitelist named relayers for the Connext bridge, in order to call `execute`.
        // for (const relayer of protocol.agents.relayers.whitelist) {
        // }
        // Additionally, approve relayers as callers for connectors and root manager.
      }
      // TODO: Blacklist/remove relayers.
    }

    /// MARK - Sequencers
    if (protocol.agents.sequencers) {
      if (protocol.agents.sequencers.whitelist) {
        console.log("\n\nCONNEXT : WHITELIST SEQUENCERS");
        // Whitelist named sequencers.
        for (const sequencer of protocol.agents.sequencers.whitelist) {
          for (const network of protocol.networks) {
            await updateIfNeeded({
              scheme: {
                contract: getConnextContract({ deployer, network }),
                desired: true,
                read: { method: "approvedSequencers", args: [sequencer] },
                write: { method: "addSequencer", args: [sequencer] },
              },
            });
          }
        }
      }
      // TODO: Blacklist/remove sequencers.
    }

    /// MARK - Routers
    if (protocol.agents.routers) {
      if (protocol.agents.routers.whitelist) {
        console.log("\n\nCONNEXT : WHITELIST ROUTERS");
        // Whitelist connext routers.
        for (const router of protocol.agents.routers.whitelist) {
          for (const network of protocol.networks) {
            await updateIfNeeded({
              scheme: {
                contract: getConnextContract({ deployer, network }),
                desired: true,
                read: { method: "getRouterApproval", args: [router] },
                // TODO: Should we enable configuring owner and recipient for this script, too?
                write: { method: "setupRouter", args: [router, router, router] },
              },
            });
          }
        }
      }
      // TODO: Blacklist/remove routers.
    }
  }
};
