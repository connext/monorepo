import { utils, Wallet } from "ethers";
import { SequencerConfig } from "@connext/nxtp-sequencer/src/lib/entities/config";
import { NxtpRouterConfig as RouterConfig, ChainConfig as RouterChainConfig } from "@connext/nxtp-router/src/config";
import { RelayerConfig } from "@connext/nxtp-relayer/src/lib/entities/config";
import { getChainData, mkBytes32 } from "@connext/nxtp-utils";
import { getTransfers } from "@connext/nxtp-adapters-subgraph/src/lib/subgraphs/runtime/queries";
import { getDeployedConnextContract } from "@connext/nxtp-txservice";

export enum Environment {
  Staging = "staging",
  Production = "production",
}

// TODO: Should have an overrides in env:
export const LOCALHOST = "localhost"; // alt. 0.0.0.0
export const ORIGIN_ASSET = {
  name: "TEST",
  address: "0xB5AabB55385bfBe31D627E2A717a7B189ddA4F8F".toLowerCase(),
};
export const DESTINATION_ASSET = {
  name: "TEST",
  address: "0xb7b1d3cc52e658922b2af00c5729001cea98142c",
};

/// MARK - Integration Settings
// TODO: Allow overwrites for most, if not all of these in .env!
const ORIGIN_DOMAIN = "2221"; // Kovan
const DESTINATION_DOMAIN = "1111"; // Rinkeby
export const CANONICAL_DOMAIN = "ORIGIN";

// Environment setting.
export const ENVIRONMENT = process.env.ENV || process.env.ENVIRONMENT || Environment.Staging;

// TODO: May need to increase this at some point:
export const RELAYER_FEE_AMOUNT = utils.parseEther("0.0000000001"); // In ETH.
export const TRANSFER_TOKEN_AMOUNT = utils.parseEther("25"); // In TEST.
export const ROUTER_DESIRED_LIQUIDITY = utils.parseEther("1000000"); // In TEST.

// Min amounts needed for testing.
export const MIN_USER_ETH = utils.parseEther("0.02").add(RELAYER_FEE_AMOUNT);
export const MIN_FUNDER_ETH = utils.parseEther("0").add(MIN_USER_ETH);

// Logging.
export const LOGFILE_PATH = "ops/data";

// Time period after which we consider the XCall appearance on the subgraph to have timed out.
// NOTE: This should basically reflect any lag that can occur in subgraph syncing... if it's not appearing
// after this period of time, something is wrong with the subgraph!
export const XCALL_TIMEOUT = 120_000;
// Time period in ms, after which we consider the fast liquidity layer's `execute` to have timed out.
// NOTE: This should reflect agent response time.
export const EXECUTE_TIMEOUT = 3_000_000;

export const SKIP_SEQUENCER_CHECKS = true;

// Used in polling loops.
export const SUBG_POLL_PARITY = 5_000;

export const DEBUG_XCALL_TXHASH = process.env.XCALL_TXHASH || process.env.XCALL_HASH;

/// MARK - Utility Constants
export const EMPTY_BYTES = mkBytes32("0x0");
export const SUBG_TRANSFER_ENTITY_PARAMS = getTransfers
  .slice(getTransfers.lastIndexOf(") {"), getTransfers.lastIndexOf("}"))
  .replace(/router \{\n.*id\n.*\}/, "router { id }")
  .split("\n")
  .slice(1, -2)
  .filter((line) => !line.includes("#"))
  .map((line) => line.trim());

/// MARK - General
export type DomainInfo = {
  name: string;
  network: string;
  domain: string;
  chain: number;
  config: RouterChainConfig;
};

export type Agent = {
  address: string;
  origin: Wallet;
  destination: Wallet;
};

export type TestAgents = {
  user: Agent;
  router?: Agent;
  relayer?: Agent;
  deployer?: Agent;
};

// Asynchronous domain info setup.
export const DOMAINS: Promise<{ ORIGIN: DomainInfo; DESTINATION: DomainInfo }> = (async (): Promise<{
  ORIGIN: DomainInfo;
  DESTINATION: DomainInfo;
}> => {
  const chainData = await getChainData();
  if (!chainData) {
    throw new Error("Could not get chain data");
  }

  const originChainData = chainData.get(ORIGIN_DOMAIN);
  const destinationChainData = chainData.get(DESTINATION_DOMAIN);

  if (!originChainData || !destinationChainData) {
    throw new Error("Could not get chain data for origin or destination");
  }

  const infuraKey =
    process.env.INFURA_KEY || process.env.INFURA_API_KEY || process.env.INFURA_PROJECT || process.env.INFURA_PROJECT_ID;
  const originProvider =
    process.env.ORIGIN_PROVIDER ?? infuraKey ? `https://kovan.infura.io/v3/${infuraKey}` : undefined;
  const destinationProvider =
    process.env.DESTINATION_PROVIDER ?? infuraKey ? `https://rinkeby.infura.io/v3/${infuraKey}` : undefined;

  if (!originProvider || !destinationProvider) {
    throw new Error(
      "RPC provider URLs for origin or destination were not set." +
        " Please set the env vars ORIGIN_PROVIDER and DESTINATION_PROVIDER." +
        " Alternatively, if you are using Infura, set the env var INFURA_KEY.",
    );
  }

  // See above TODO regarding hardcoded contract addresses.
  const getConnextContract = (chainId: number): string => {
    const contract = getDeployedConnextContract(chainId, ENVIRONMENT === Environment.Staging ? "Staging" : "");
    if (!contract) {
      throw new Error(`No Connext contract deployed on chain ${chainId}`);
    }
    return contract.address.toLowerCase();
  };
  const originRuntimeSubgraph = originChainData.subgraphs.runtime[0]
    ? {
        query:
          ENVIRONMENT == Environment.Staging
            ? originChainData.subgraphs.runtime[0].query.replace("v0", "staging")
            : originChainData.subgraphs.runtime[0].query,
        health: originChainData.subgraphs.runtime[0].health,
      }
    : undefined;
  const destinationRuntimeSubgraph = originChainData.subgraphs.runtime[0]
    ? {
        query:
          ENVIRONMENT == Environment.Staging
            ? destinationChainData.subgraphs.runtime[0].query.replace("v0", "staging")
            : destinationChainData.subgraphs.runtime[0].query,
        health: destinationChainData.subgraphs.runtime[0].health,
      }
    : undefined;
  return {
    ORIGIN: {
      name: originChainData.name,
      network: originChainData.network,
      domain: originChainData.domainId,
      chain: originChainData.chainId,
      config: {
        providers: [originProvider],
        assets: [ORIGIN_ASSET],
        subgraph: {
          analytics: originChainData.subgraphs.analytics ? originChainData.subgraphs.analytics : [],
          runtime: originRuntimeSubgraph ? [originRuntimeSubgraph] : [],
          maxLag: 25,
        },
        gasStations: [],
        confirmations: originChainData.confirmations ?? 1,
        deployments: {
          connext: getConnextContract(originChainData.chainId),
        },
      },
    },
    DESTINATION: {
      name: destinationChainData.name,
      network: destinationChainData.network,
      domain: destinationChainData.domainId,
      chain: destinationChainData.chainId,
      config: {
        providers: [destinationProvider],
        assets: [DESTINATION_ASSET],
        subgraph: {
          analytics: destinationChainData.subgraphs.analytics ? destinationChainData.subgraphs.analytics : [],
          runtime: destinationRuntimeSubgraph ? [destinationRuntimeSubgraph] : [],
          maxLag: 25,
        },
        gasStations: [],
        confirmations: destinationChainData.confirmations ?? 1,
        deployments: {
          connext: getConnextContract(destinationChainData.chainId),
        },
      },
    },
  };
})();

/// MARK - Router
export const ROUTER_CONFIG: Promise<RouterConfig> = (async (): Promise<RouterConfig> => {
  const { ORIGIN, DESTINATION } = await DOMAINS;
  const environment = ENVIRONMENT.toString();
  if (environment !== "staging" && environment !== "production") {
    throw new Error(`Router environment only available for staging and production, not ${environment}`);
  }
  return {
    logLevel: "info",
    sequencerUrl: `http://${LOCALHOST}:8081`,
    redis: {},
    server: {
      adminToken: "a",
      port: 8080,
      host: LOCALHOST,
      requestLimit: 10,
    },
    chains: {
      [ORIGIN.domain]: ORIGIN.config,
      [DESTINATION.domain]: DESTINATION.config,
    },
    network: "testnet",
    maxSlippage: 1,
    mode: {
      cleanup: false,
      diagnostic: false,
      priceCaching: false,
    },
    polling: {
      subgraph: 10_000,
      cache: 5_000,
    },
    environment,
  };
})();

/// MARK - Sequencer
export const SEQUENCER_CONFIG: Promise<SequencerConfig> = (async (): Promise<SequencerConfig> => {
  const { ORIGIN, DESTINATION } = await DOMAINS;
  return {
    redis: {},
    server: {
      adminToken: "b",
      port: 8081,
      host: LOCALHOST,
    },
    chains: {
      [ORIGIN.domain]: {
        providers: ORIGIN.config.providers,
        subgraph: ORIGIN.config.subgraph,
        confirmations: ORIGIN.config.confirmations,
        deployments: ORIGIN.config.deployments,
      },
      [DESTINATION.domain]: {
        providers: DESTINATION.config.providers,
        subgraph: DESTINATION.config.subgraph,
        confirmations: DESTINATION.config.confirmations,
        deployments: DESTINATION.config.deployments,
      },
    },
    logLevel: "info",
    mode: {
      cleanup: false,
    },
    auctionWaitTime: 1,
    network: "testnet",
    environment: ENVIRONMENT.toString() as "staging" | "production",
    relayerUrl: `http://${LOCALHOST}:8082`,
  };
})();

/// MARK - RELAYER CONFIG
export const RELAYER_CONFIG: Promise<RelayerConfig> = (async (): Promise<RelayerConfig> => {
  const { DESTINATION } = await DOMAINS;
  return {
    redis: {},
    server: {
      adminToken: "c",
      port: 8082,
      host: LOCALHOST,
    },
    chains: {
      // [ORIGIN.domain]: {
      //   providers: ORIGIN.config.providers,
      //   confirmations: ORIGIN.config.confirmations,
      //   deployments: ORIGIN.config.deployments,
      // },
      [DESTINATION.domain]: {
        providers: DESTINATION.config.providers,
        confirmations: DESTINATION.config.confirmations,
        deployments: DESTINATION.config.deployments,
      },
    },
    logLevel: "debug",
    mode: {
      cleanup: false,
    },
    network: "testnet",
    environment: ENVIRONMENT.toString() as "staging" | "production",
  };
})();
