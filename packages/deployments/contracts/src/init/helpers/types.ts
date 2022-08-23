// NOTE: Agents will currently be whitelisted on ALL domains.
export type WhitelistAgents = {
  // Arrays of addresses for each type of agent that requires whitelisting.
  relayers?: string[]; // NOTE: Relayers will be whitelisted for both `execute` and messaging calls.
  sequencers?: string[];
  routers?: string[];
  watchers?: string[];
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

export type DomainDeployments = {
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
        HubConnectors: string[];
      }
    | {
        SpokeConnector: string;
      };
};

export type DomainStack = {
  // Meta info.
  chain: string;
  domain: string;

  // RPC provider to use for this network.
  rpc: string;

  // NOTE: If deployments are not specified in JSON config, we will attempt to retrieve them locally.
  deployments: DomainDeployments;
};

export type ProtocolStack = {
  deployer: string; // The deployer/admin address.
  hub: string; // The hub domain.
  // Domain stack should have all info pertaining to each supported domain.
  domains: DomainStack[];
  // Crosschain ERC20 assets to enroll in TokenRegistry.
  assets: AssetStack[];
  // Agents that need to be whitelisted (across all domains).
  // Leave undefined if no agents should be whitelisted in this setup.
  agents?: WhitelistAgents;
};
