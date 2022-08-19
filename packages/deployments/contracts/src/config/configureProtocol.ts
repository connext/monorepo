// NOTE: Agents will currently be whitelisted on ALL domains.
type WhitelistAgents = {
  // Arrays of addresses for each type of agent that requires whitelisting.
  relayers: string[]; // NOTE: Relayers will be whitelisted for both `execute` and messaging calls.
  sequencers: string[];
  routers: string[];
};

type AssetStack = {
  canonical: {
    // The canonical domain of the asset.
    domain: string;
    // Address of the bridged asset on the canonical domain.
    local: string;
    // The address of the official canonical token.
    // NOTE: If not specified here, then I guess the asset is natively cross-chain?
    adopted?: string;
  };
  representational: {
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

type DomainStack = {
  // Meta info.
  chain: number;
  domain: string;

  // RPC provider to use for this network.
  rpc: string;

  deployments: {
    // Diamond.
    Connext: string;
    // Handlers.
    BridgeRouter: string;
    RelayerFeeRouter: string;
    PromiseRouter: string;
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

type ProtocolStack = {
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
 * Handle configuration of the entire protocol, including messaging stack and connext diamond
 * contracts, across all listed domains.
 *
 * Should effectively be a diagnostic on the whole protocol, making sure that everything that
 * requires configuration and/or setup has been done so properly.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const configureProtocol = async (protocol: ProtocolStack) => {
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
  // Whitelist messaging routers as callers of dispatch?
  // Enroll messaging handlers.
  /// ********************* CONNEXT *********************
  /// MARK - Init
  // Check to make sure Diamond Proxy is initialized.
  /// MARK - Connextions
  //
  /// ********************* ASSETS **********************
  /// MARK - Register Assets
  // Convert asset addresses
  // Register assets in the TokenRegistry (enroll-custom).
  /// ********************* AGENTS **********************
  /// MARK - Relayers
  // Whitelist named relayers for the Connext bridge, in order to call `execute`.
  // Approve relayers as callers for connectors and root manager
  /// MARK - Sequencers
  // Whitelist named sequencers.
};
