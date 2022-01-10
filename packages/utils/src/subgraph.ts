import { ChainData } from "./chainData";
import axios, { AxiosResponse } from "axios";
import { NxtpError } from "./error";

/**
 * Gets hosted subgraph for applicable chains
 *
 * @param chainId - The chain you want the subgraph URI for
 * @returns A string of the appropriate URI to access the hosted subgraph
 *
 * @remarks
 * Currently only returns URIs for hosted subgraphs
 */
export const getDeployedSubgraphUri = (chainId: number, chainData?: Map<string, ChainData>): string[] => {
  if (chainData) {
    const subgraph = chainData?.get(chainId.toString())?.subgraph;
    if (subgraph) {
      return subgraph;
    }
  }
  switch (chainId) {
    // testnets
    case 3:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-ropsten-v1-runtime"];
    case 4:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-rinkeby-v1-runtime"];
    case 5:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-goerli-v1-runtime"];
    case 42:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-kovan-v1-runtime"];
    case 69:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-optimism-kovan-v1-runtime"];
    case 97:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-chapel-v1-runtime"];
    case 80001:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-mumbai-v1-runtime"];
    case 421611:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-arbitrum-rinkeby-v1-runtime"];

    // mainnets
    case 1:
      return [
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-mainnet-v1-runtime",
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-mainnet-v1-runtime",
      ];
    case 10:
      return [
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-optimism-v1-runtime",
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-optimism-v1-runtime",
      ];
    case 56:
      return [
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-bsc-v1-runtime",
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-bsc-v1-runtime",
      ];
    case 100:
      return [
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-xdai-v1-runtime",
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-xdai-v1-runtime",
      ];
    case 122:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-fuse-v1-runtime"];
    case 137:
      return [
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-matic-v1-runtime",
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-matic-v1-runtime",
      ];
    case 250:
      return [
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-fantom-v1-runtime",
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-fantom-v1-runtime",
      ];
    case 1285:
      return [
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-moonriver-v1-runtime",
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-moonriver",
      ];
    case 42161:
      return [
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-arbitrum-one-v1-runtime",
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-arbitrum-one-v1-runtime",
      ];
    case 43114:
      return [
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-avalanche-v1-runtime",
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-avalanche-v1-runtime",
      ];
    default:
      return [];
  }
};

export const getDeployedAnalyticsSubgraphUri = (chainId: number, chainData?: Map<string, ChainData>) => {
  if (chainData) {
    const subgraph = chainData?.get(chainId.toString())?.analyticsSubgraph;
    if (subgraph) {
      return subgraph;
    }
  }

  switch (chainId) {
    // testnets
    case 3:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-ropsten-v1-analytics"];
    case 4:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-rinkeby-v1-analytics"];
    case 5:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-goerli-v1-analytics"];
    case 42:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-kovan-v1-analytics"];
    case 69:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-optimism-kovan-v1-analytics"];
    case 97:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-chapel-v1-analytics"];
    case 80001:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-mumbai-v1-analytics"];
    case 421611:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-arbitrum-rinkeby-v1-analytics"];

    // mainnets
    case 1:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-mainnet-v1-analytics"];
    case 10:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-optimism-v1-analytics"];
    case 56:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-bsc-v1-analytics"];
    case 100:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-xdai-v1-analytics"];
    case 122:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-fuse-v1-analytics"];
    case 137:
      return ["https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-matic-v1-analytics"];
    case 250:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-fantom-v1-analytics"];
    case 1285:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-moonriver-v1-analytics"];
    case 42161:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-arbitrum-one-v1-analytics"];
    case 43114:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-avalanche-v1-analytics"];
    default:
      return [];
  }
};

export const buffer = 15_000;
// chainId -> {subgraph, unix timestamp}
export const subgraphTracker: Map<number, { subgraphUrl: string; timestamp: number }> = new Map();

export const getMostSyncedSubgraph = async (chainId: number, _endPointUrl: string): Promise<any> => {
  // logic to ping the subgraph hosted enpoint
  const endPointUrl = _endPointUrl.concat(`?chainId=${chainId}`);

  let response: AxiosResponse<string> = await axios.get(endPointUrl);
  if (!response || !response.data || response.data.length === 0) {
    throw new NxtpError("Received bad response; make sure your key file is configured correctly.", {
      response,
    });
  }

  return response.data;
};

export const getSubgraph = (chainId: number, _endPointUrl: string, subgraphBuffer?: number) => {
  let data = subgraphTracker.get(chainId);

  if (data) {
    const now = Date.now();
    const diff = now - data.timestamp;
    if (diff > buffer) {
      const mostSyncedSubgraphdata = getMostSyncedSubgraph(chainId, _endPointUrl);
      const currentBuffer = mostSyncedSubgraphdata.latestBlock - mostSyncedSubgraphdata.syncedBlock;
      if (subgraphBuffer && subgraphBuffer > currentBuffer) {
        throw new NxtpError("Subgraph is behind", {
          subgraphBuffer,
          currentBuffer,
        });
      }
      data = { subgraphUrl: mostSyncedSubgraphdata.url, timestamp: Date.now() };
      subgraphTracker.set(chainId, data);
    }
  }

  return data?.subgraphUrl;
};
