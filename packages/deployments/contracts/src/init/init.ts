import * as fs from "fs";

// NOTE: Agents will currently be whitelisted on ALL domains.
export type WhitelistAgents = {
  // Arrays of addresses for each type of agent that requires whitelisting.
  relayers: string[]; // NOTE: Relayers will be whitelisted for both `execute` and messaging calls.
  sequencers: string[];
  routers: string[];
  watchers: string[];
};

export type AssetStack = {
  canonical: {
    // The canonical domain of the asset.
    domain: string;
    // Address of the official canonical token on the canonical domain.
    local: string;
  };
  representations: {
    [domain: string]: {
      // Address of the bridged asset on this domain.
      local: string;
      // Address of the adopted asset on this domain.
      // NOTE: If adopted is specified, a stableswap will be initialized! If not
      // specified, then we assume the local asset is the adopted asset on this domain.
      adopted?: string;
    };
  };
};

export type DomainStack = {
  // Meta info.
  chain: number;
  domain: string;

  // RPC provider to use for this network.
  rpc: string;

  // NOTE: If deployments are not specified, we will attempt to retrieve them locally.
  deployments?: {
    // Diamond.
    Connext: string;
    // Handlers.
    handlers: {
      BridgeRouter: string; // TODO/NOTE: Will likely be combined with Connext in the future.
      RelayerFeeRouter: string;
      PromiseRouter: string;
    };
    // Registry.
    TokenRegistry: string;

    // Messaging Layer.
    // ConnectorManager
    // SendOutboundRootResolver

    // The messaging layer deployments are different depending on whether this
    // is the hub domain or spoke domain.
    messaging:
      | {
          RootManager: string;
          MainnetConnector: string;
          HubConnectors: string;
        }
      | {
          SpokeConnector: string;
        };
  };
};

export type ProtocolStack = {
  hub: string; // The hub domain.
  // Domain stack should have all info pertaining to each supported domain.
  domains: DomainStack[];
  // Crosschain ERC20 assets to enroll in TokenRegistry.
  assets: AssetStack[];
  // Agents that need to be whitelisted (across all domains).
  // Leave undefined if no agents should be whitelisted in this setup.
  agents?: WhitelistAgents;
};

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
  const config = JSON.parse(json) as ProtocolStack;
  if (!config) {
    throw new Error("Config was empty? Please ensure your JSON file has, like, stuff in it.");
  }
  await initProtocol(config);
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
  /// MARK - Sanity Checks
  // Hub domain should be included in domains.
  // All domains specified in AssetStack(s) must be included in domains.
  // DomainStack for hub includes proper messaging deployments.
  // All spoke domains should have proper messaging deployments.
  /// MARK - Deployer
  // Get deployer mnemonic, which should be provided in env.
  /// MARK - Deployments
  // Get all deployments
  /// ******************** MESSAGING ********************
  /// MARK - Init
  // TODO: Currently unused, as messaging init checks are not needed with the AMB-compatible stack.
  // However, they will be useful as sanity checks for Nomad deployments in the future - thus, leaving
  // this placeholder here for now...
  /// MARK - Connector Mirrors
  // Connectors should have their mirrors' address set; this lets them know about their counterparts.
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
  /// MARK - Enroll Watchers
  // Whitelist watchers in RootManager, with the ability to disconnect malicious connectors.
  /// MARK - Relayers
  // Whitelist named relayers for the Connext bridge, in order to call `execute`.
  // Approve relayers as callers for connectors and root manager
  /// MARK - Sequencers
  // Whitelist named sequencers.
};
