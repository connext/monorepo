import { fetchJson } from "../ethers";

export const CHAIN_ID = {
  MAINNET: 1,
  RINKEBY: 4,
  GOERLI: 5,
  OPTIMISM: 10,
  BSC: 56,
  XDAI: 100,
  FUSE: 122,
  MATIC: 137,
  FANTOM: 250,
  MOVR: 1285,
  ARBITRUM: 42161,
  AVALANCHE: 43114,
};

export type ChainDataSubgraph = {
  query: string;
  health: string;
};

export type ChainData = {
  name: string;
  chainId: number;
  domainId: string;
  confirmations: number;
  shortName: string;
  type: "mainnet" | "testnet" | "";
  chain: string;
  network: string;
  networkId: number;
  nomadDomain: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: string;
  };
  assetId: Record<
    string,
    {
      name: string;
      symbol: string;
      mainnetEquivalent?: string;
      decimals?: number;
      coingeckoId?: string;
    }
  >;
  rpc: string[];
  subgraph: string[];
  analyticsSubgraph?: string[];
  subgraphs: {
    runtime: ChainDataSubgraph[];
    analytics: ChainDataSubgraph[];
  };
  faucets: string[];
  infoURL: string;
  gasStations: string[];
  explorers: {
    name: string;
    url: string;
    icon: string;
    standard: string;
  }[];
  gasEstimates: {
    xcall: string;
    execute: string;
    xcallL1: string;
    executeL1: string;
    proveAndProcess: string;
    proveAndProcessL1: string;
    messaging: string;
    gasPriceFactor?: string;
  };
  maxRelayerFeeInEth: string;
};

// Helper method to reorganize this list into a mapping by chain ID for quicker lookup.
export const chainDataToMap = (data: any, ignoreMissing = true): Map<string, ChainData> => {
  const chainData: Map<string, ChainData> = new Map();
  const noDomainIdFound: string[] = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const domainId = item.domainId as string | undefined;
    // NOTE: Ignore domain 0, as that is a placeholder for a ChainData entry template.
    if (domainId && domainId !== "0") {
      chainData.set(domainId, item as ChainData);
    } else {
      noDomainIdFound.push(item.chainId as string);
    }
  }
  if (noDomainIdFound.length > 0) {
    if (!ignoreMissing) {
      console.warn(
        `No domainId was found for the following chains: ${noDomainIdFound.join(
          ", ",
        )};\nContinuing without indexing these chains.`,
      );
    }
  }
  return chainData;
};

export const getChainData = async (): Promise<Map<string, ChainData>> => {
  const url = "https://chaindata.connext.ninja";
  try {
    const data = await fetchJson(url);
    if (!data) throw new Error("No chain data found");
    return chainDataToMap(data);
  } catch (err: unknown) {
    const url = "https://raw.githubusercontent.com/connext/chaindata/main/crossChain.json";
    try {
      const data = await fetchJson(url);
      if (!data) throw new Error("No chain data found");
      return chainDataToMap(data);
    } catch (err: unknown) {
      // Check to see if we have the chain data cached locally.
      // It could be dangerous to let any agent start without chain data.
      throw new Error("Could not get chain data, and no cached chain data was available.");
    }
  }
};
