import * as fs from "fs";

import { getChainIdFromDomain, getDomainFromChainId } from "@connext/nxtp-utils";
import { providers, Wallet } from "ethers";

import {
  ProtocolStack,
  getDeployments,
  HubMessagingDeployments,
  DomainStack,
  getConnectorMirrorDomain,
} from "./helpers";

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
  // Make sure domains were specified.
  if (!Array.isArray(config.domains) || config.domains.length === 0) {
    throw new Error(
      "Domains were not specified in the config, or the domains list was empty. " +
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
  for (let i = 0; i < config.domains.length; i++) {
    const stack = config.domains[i];
    // Make sure either domain or chain are specified.
    if (!stack.domain && !stack.chain) {
      throw new Error(
        "One of the domains in config doesn't even have a `domain` or `chain` " +
          "specified... bro, am I reading this right?",
      );
    } else if (stack.domain) {
      const domain = (stack.domain as string | number).toString();

      // Make sure domain is saved as a string.
      stack.domain = domain;
      // Make sure correct chain ID is saved.
      // NOTE: Even if chain was specified as well, we'll consult the Domain => Chain ID conversion table anyway.
      stack.chain = (await getChainIdFromDomain(domain)).toString();
    } else if (stack.chain) {
      const chain = (stack.chain as string | number).toString();

      // Make sure chain is saved as a string.
      stack.chain = chain;
      // Make sure domain is specified.
      stack.domain = await getDomainFromChainId(parseInt(chain, 10));
    }

    // RPC provider is required.
    if (!stack.rpc) {
      throw new Error(
        `You didn't include an RPC provider for domain ${stack.domain}. ` +
          "I literally can't work in these conditions.",
      );
    }
    // Convert RPC from URL string to JsonRpcProvider.
    stack.rpc = new providers.JsonRpcProvider(stack.rpc as string);

    // Get the deployments for this domain, if needed.
    if (!stack.deployments) {
      let isHub = stack.domain === hub;
      if (stack.chain === hub) {
        // Consumer could have specified the hub by chain ID. If so, convert the hub to domain ID.
        isHub = true;
        hub = stack.domain;
      }
      stack.deployments = getDeployments(stack.chain as string, isHub, useStaging);
    }

    // Make sure the stack is set.
    // TODO: Is this already performed in-place?
    config.domains[i] = stack;
  }

  /// MARK - Hub
  // Hub domain should be a domain ID and be included in the list of supported domains.
  const supportedDomains = config.domains.map((d: any) => d.domain);
  if (!supportedDomains.includes(hub)) {
    const supportedChains = config.domains.map((d: any) => d.chain);
    throw new Error(
      `Hub domain/chain ${hub} was not found among the \`domains\` in protocol config. Is this some kind of prank?` +
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
            `an entry for a non-supported domain ${domain}. Please add the domain to the \`domains\` list in your config. `,
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
  /// MARK - Peripherals Setup
  // Get hub domain for specific use.
  const hub: DomainStack = protocol.domains.filter((d) => d.domain === protocol.hub)[0];
  /// ******************** MESSAGING ********************
  /// MARK - Init
  // TODO: Currently unused, as messaging init checks are not needed with the AMB-compatible stack.
  // However, they will be useful as sanity checks for Nomad deployments in the future - thus, leaving
  // this placeholder here for now...
  /// MARK - Connector Mirrors
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { RootManager, MainnetConnector, HubConnectors } = hub.deployments.messaging as HubMessagingDeployments;

  for (const Connector of HubConnectors) {
    // Get the connector's mirror domain.
    const mirrorDomain = await getConnectorMirrorDomain({
      Connector,
      domain: hub,
    });
    console.log(mirrorDomain);
  }

  // Connectors should have their mirrors' address set; this lets them know about their counterparts.
  // const connectors: { chain: string; hub: Deployment; spoke: Deployment }[] = [];
  // On the hub, you only need to connect the mainnet l1 connector (no mirror).

  for (const stack of protocol.domains) {
    // Skip hub domain.
    if (stack.domain === protocol.hub) {
      continue;
      // connectors.push({
      //   chain: +stack.chain,
      //   deployment:
      //   mirrorName: undefined,
      //   mirrorChain: undefined,
      // });
      // continue;
    }

    // When not on the hub, there will be a name for both the hub and spoke side connectors.
    // connectors.push({
    //   chain: stack.chain,
    //   hub: HubConnectors.
    // })

    // const hubName = getDeploymentName(`${config.prefix}${HUB_PREFIX}Connector`);
    // const spokeName = getDeploymentName(`${config.prefix}${SPOKE_PREFIX}Connector`);
    // connectors.push({
    //   chain: protocol.hub,
    //   name: hubName,
    //   mirrorName: spokeName,
    //   mirrorChain: +chainId,
    // });
    // connectors.push({
    //   chain: +chainId,
    //   name: spokeName,
    //   mirrorName: hubName,
    //   mirrorChain: protocol.hub,
    // });
  }

  /// MARK - Enroll Handlers
  // Whitelist message-sending Handler contracts (AKA 'Routers'); will enable those message senders to call `dispatch`.
  // Call `addSender` on Connector contract, passing in each Handler contract.
  /// ********************* CONNEXT *********************
  /// MARK - Init
  // Check to make sure Diamond Proxy is initialized.
  /// MARK - Connextions
  // TODO/NOTE: Will likely be removing 'connextions' once we combine Connext+BridgeRouter.
  /// MARK - Set BridgeRouter
  // Set `bridgeRouter` in Connext contract to the correct address.
  /// ********************* ASSETS **********************
  /// MARK - Register Assets
  // Convert asset addresses: get canonical ID, canonical domain, convert to `key` hash.
  // Determine if a stableswap pool is needed - does asset have both `local` and `adopted`?
  // If so, initialize stableswap pool with `initializeSwap`.
  // Call `setupAsset` for each domain. This will:
  // - Register assets in the TokenRegistry (enroll-custom).
  // - Set up mappings for canonical ID / canonical domain / adopted asset address / etc.
  // - Set up mapping for stableswap pool if applicable.
  /// ********************* AGENTS **********************
  /// MARK - Watchers
  // Whitelist watchers in RootManager, with the ability to disconnect malicious connectors.
  /// MARK - Relayers
  // Whitelist named relayers for the Connext bridge, in order to call `execute`.
  // Approve relayers as callers for connectors and root manager
  /// MARK - Sequencers
  // Whitelist named sequencers.
  /// MARK - Routers
  // Whitelist routers.
};
