/**
 * Gets hosted subgraph for applicable chains
 *
 * @param chainId - The chain you want the subgraph URI for
 * @returns A string of the appropriate URI to access the hosted subgraph
 *
 * @remarks
 * Currently only returns URIs for hosted subgraphs
 */
export const getDeployedSubgraphUri = (chainId: number): string[] => {
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
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-mainnet",
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-mainnet-v1-runtime",
      ];
    case 10:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-optimism-v1-runtime"];
    case 56:
      return [
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-bsc",
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-bsc-v1-runtime",
      ];
    case 100:
      return [
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-xdai",
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-xdai-v1-runtime",
      ];
    case 137:
      return [
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-matic",
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-matic-v1-runtime",
      ];
    case 250:
      return [
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-fantom",
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-fantom-v1-runtime",
      ];
    case 1285:
      return [
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-moonriver-v1-runtime",
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-moonriver",
      ];
    case 42161:
      return [
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-arbitrum-one",
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-arbitrum-one-v1-runtime",
      ];
    case 43114:
      return [
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-avalanche",
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-avalanche-v1-runtime",
      ];
    default:
      return [];
  }
};
