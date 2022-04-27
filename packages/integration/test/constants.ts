import { utils, Wallet } from "ethers";
import { SequencerConfig } from "@connext/nxtp-sequencer/src/lib/entities/config";
import { NxtpRouterConfig as RouterConfig, ChainConfig as RouterChainConfig } from "@connext/nxtp-router/src/config";
import { getChainData, mkBytes32 } from "@connext/nxtp-utils";
import { getTransfers } from "@connext/nxtp-adapters-subgraph/src/lib/subgraphs/runtime/queries";
import { getDeployedConnextContract } from "@connext/nxtp-txservice";

// TODO: Should have an overrides in env:
export const LOCALHOST = "localhost"; // alt. 0.0.0.0
export const ORIGIN_ASSET = {
  name: "TEST",
  address: "0xB5AabB55385bfBe31D627E2A717a7B189ddA4F8F",
};
export const DESTINATION_ASSET = {
  name: "TEST",
  address: "0xcF4d2994088a8CDE52FB584fE29608b63Ec063B2",
};

/// MARK - Integration Settings
const ORIGIN_DOMAIN = "2221"; // Kovan
const DESTINATION_DOMAIN = "1111"; // Rinkeby
export const CANONICAL_DOMAIN = "ORIGIN";
export const MIN_USER_ETH = utils.parseEther("0.02");
export const MIN_FUNDER_ETH = utils.parseEther("0").add(MIN_USER_ETH);
export const TRANSFER_TOKEN_AMOUNT = utils.parseEther("25");
export const LOGFILE_PATH = "ops/data";
// Time period in ms, after which we consider the fast liquidity layer's `execute` to have timed out!
export const EXECUTE_TIMEOUT = 120_000;
export const SUBG_POLL_PARITY = 5_000;

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
    const contract = getDeployedConnextContract(chainId, "Staging");
    if (!contract) {
      throw new Error(`No Connext contract deployed on chain ${chainId}`);
    }
    return contract.address;
  };
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
          runtime: originChainData.subgraphs.runtime,
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
          runtime: destinationChainData.subgraphs.runtime,
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
      subgraph: 5_000,
      cache: 5_000,
    },
    environment: "staging",
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
        providers: ["https://rpc.ankr.com/eth_rinkeby"],
        subgraph: ORIGIN.config.subgraph,
        confirmations: ORIGIN.config.confirmations,
        deployments: ORIGIN.config.deployments,
      },
      [DESTINATION.domain]: {
        providers: ["https://kovan.infura.io/v3/19b854cad0bc4089bffd0c93f23ece9f"],
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
    environment: "staging",
  };
})();
