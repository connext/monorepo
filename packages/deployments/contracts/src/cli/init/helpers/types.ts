import { TAddress } from "@connext/nxtp-utils";
import { Type, Static } from "@sinclair/typebox";
import { providers, Wallet } from "ethers";

import { Deployment } from "../../types";

// NOTE: Agents will currently be allowlisted/blacklisted respectively on ALL domains.
export const AgentStackSchema = Type.Object({
  allowlist: Type.Optional(Type.Array(TAddress)),
  blacklist: Type.Optional(Type.Array(TAddress)),
});
export type AgentStack = Static<typeof AgentStackSchema>;

export const AgentsSchema = Type.Object({
  relayers: Type.Optional(AgentStackSchema), // // NOTE: Relayers will be allowlisted for both `execute` and messaging calls.
  sequencers: Type.Optional(AgentStackSchema),
  routers: Type.Optional(AgentStackSchema),
  watchers: Type.Optional(AgentStackSchema),
});
export type Agents = Static<typeof AgentsSchema>;

export const AssetStackSchema = Type.Object({
  name: Type.String(),
  canonical: Type.Object({
    // The canonical domain of the asset.
    domain: Type.String(),
    // Address of the official canonical token on the canonical domain.
    address: Type.String(),
    // Decimals of the canonical token on the canonical domain
    decimals: Type.Optional(Type.Number()),
    // Liquidity cap -- lock on the amount custodied on mainnet + router liquidity
    // in wei units. If not defined, will not have a cap enforced
    cap: Type.Optional(Type.String()),
  }),
  representations: Type.Record(
    Type.String(),
    Type.Object({
      // Address of the bridged asset on this domain.
      local: Type.Optional(Type.String()),
      // Address of the adopted asset on this domain.
      // NOTE: If adopted is specified, a stableswap will be initialized! If not
      // specified, then we assume the local asset is the adopted asset on this domain.
      adopted: Type.String(),
    }),
  ),
});
export type AssetStack = Static<typeof AssetStackSchema>;

export type HubMessagingDeployments = {
  RootManager: Deployment;
  MainnetConnector: Deployment;
  HubConnectors: Deployment[];
  WatcherManager: Deployment;
  MerkleTreeManagerForRoot: Deployment;
  MerkleTreeManagerForSpoke: Deployment;
  RelayerProxy: Deployment;
};

export type SpokeMessagingDeployments = {
  SpokeConnector: Deployment;
  MerkleTreeManager: Deployment;
  WatcherManager: Deployment;
  RelayerProxy: Deployment;
};

export type DomainDeployments = {
  // Diamond.
  Connext: Deployment;

  // Messaging Layer.
  // ConnectorManager

  // The messaging layer deployments are different depending on whether this
  // is the hub domain or spoke domain.
  messaging: HubMessagingDeployments | SpokeMessagingDeployments;
};

export type NetworkStack = {
  // Meta info.
  chain: string;
  domain: string;

  // RPC provider to use for this network.
  rpc: providers.JsonRpcProvider;

  // NOTE: If deployments are not specified in JSON config, we will attempt to retrieve them locally.
  deployments: DomainDeployments;

  // relayer fee vault for this network
  relayerFeeVault: string;
};

export type ProtocolStack = {
  deployer: Wallet; // The deployer/admin wallet.
  hub: string; // The hub domain.
  // Network stack should have all info pertaining to each supported domain.
  networks: NetworkStack[];
  // Crosschain ERC20 assets to enroll.
  assets: AssetStack[];
  // Agents that need to be allowlisted (across all domains).
  // Leave undefined if no agents should be allowlisted in this setup.
  agents?: Agents;
};

export type CallSchema<T> = {
  deployment: Deployment;
  desired?: T; // Desired value.
  // Read method to call on contract.
  read:
    | {
        method: string;
        args?: (number | string)[];
      }
    | string;
  // Write method to call to update value on contract.
  write?: {
    method: string;
    args?: any[];
  };
  chainData?: any;
  caseSensitive?: boolean;
};

// NOTE: Used to do a sanity check when loading default config from json files
export const InitHeaderConfigSchema = Type.Object({
  hub: Type.String(),
  assets: Type.Array(AssetStackSchema),
  agents: AgentsSchema,
});

export const InitConfigSchema = Type.Intersect([
  InitHeaderConfigSchema,
  Type.Object({
    supportedDomains: Type.Array(Type.String()),
  }),
]);

export type InitConfig = Static<typeof InitConfigSchema>;
