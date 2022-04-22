import { SequencerConfig } from "@connext/nxtp-sequencer/src/lib/entities/config";
import { NxtpRouterConfig as RouterConfig, ChainConfig as RouterChainConfig } from "@connext/nxtp-router/src/config";
import { contractDeployments } from "@connext/nxtp-txservice";
import { getChainData } from "@connext/nxtp-utils";

/// MARK - Integration Settings
export const ORIGIN_DOMAIN = "2221";
export const DESTINATION_DOMAIN = "1111";
export const ORIGIN_ASSET = {
  name: "TEST",
  address: "0xcF4d2994088a8CDE52FB584fE29608b63Ec063B2",
};
export const DESTINATION_ASSET = {
  name: "TEST",
  address: "0xB5AabB55385bfBe31D627E2A717a7B189ddA4F8F",
};

/// MARK - General
export type DomainInfo = {
  name: string;
  domain: string;
  chain: number;
  config: RouterChainConfig;
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

  const getConnextContract = (chainId: number): string => {
    const contract = contractDeployments.connext(chainId);
    if (!contract) {
      throw new Error(`No Connext contract deployed on chain ${chainId}`);
    }
    return contract.address;
  };
  return {
    ORIGIN: {
      name: originChainData.name,
      domain: originChainData.domainId,
      chain: originChainData.chainId,
      config: {
        providers: ["https://kovan.infura.io/v3/38f8f85747014e87b48035d84398a97c", ...originChainData.rpc],
        assets: [ORIGIN_ASSET],
        subgraph: {
          analytics: originChainData.analyticsSubgraph
            ? [
                {
                  query: originChainData.analyticsSubgraph[0],
                  health: "",
                },
              ]
            : [],
          runtime: [
            {
              query: originChainData.subgraph[0],
              health: "",
            },
          ],
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
      domain: destinationChainData.domainId,
      chain: destinationChainData.chainId,
      config: {
        providers: ["https://rpc.ankr.com/eth_rinkeby", ...destinationChainData.rpc],
        assets: [DESTINATION_ASSET],
        subgraph: {
          analytics: [
            {
              query: "",
              health: "",
            },
          ],
          runtime: [
            {
              query: "",
              health: "",
            },
          ],
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
    logLevel: "debug",
    sequencerUrl: "http://sequencer:8081",
    redis: {
      host: "router-cache",
      port: 6379,
    },
    server: {
      adminToken: "a",
      port: 8080,
      host: "0.0.0.0",
      requestLimit: 10,
    },
    chains: {
      [ORIGIN.name]: ORIGIN.config,
      [DESTINATION.name]: DESTINATION.config,
    },
    network: "testnet",
    maxSlippage: 1,
    mode: {
      cleanup: false,
      diagnostic: false,
      priceCaching: false,
    },
  };
})();

/// MARK - Sequencer
export const SEQUENCER_CONFIG: Promise<SequencerConfig> = (async (): Promise<SequencerConfig> => {
  const { ORIGIN, DESTINATION } = await DOMAINS;
  return {
    redis: {
      host: "router-cache",
      port: 6379,
    },
    server: {
      adminToken: "b",
      port: 8081,
      host: "0.0.0.0",
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
    logLevel: "debug",
    mode: {
      cleanup: false,
    },
    auctionWaitTime: 10,
    network: "testnet",
  };
})();
