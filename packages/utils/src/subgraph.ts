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
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-ropsten"];
    case 4:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-rinkeby"];
    case 5:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-goerli"];
    case 42:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-kovan"];
    case 69:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-optimism-kovan-v1"];
    case 97:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-chapel"];
    case 80001:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-mumbai"];
    case 421611:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-arbitrum-rinkeby"];

    // mainnets
    case 1:
      return [
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-mainnet",
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-mainnet",
      ];
    case 10:
      return ["https://api.thegraph.com/subgraphs/name/connext/nxtp-optimism"];
    case 56:
      return [
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-bsc",
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-bsc",
      ];
    case 100:
      return [
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-xdai",
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-xdai",
      ];
    case 137:
      return [
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-matic",
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-matic",
      ];
    case 250:
      return [
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-fantom",
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-fantom",
      ];
    case 1285:
      return [
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-moonriver",
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-moonriver",
      ];
    case 42161:
      return [
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-arbitrum-one",
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-arbitrum-one",
      ];
    case 43114:
      return [
        "https://connext.bwarelabs.com/subgraphs/name/connext/nxtp-avalanche",
        "https://api.thegraph.com/subgraphs/name/connext/nxtp-avalanche",
      ];
    default:
      return [];
  }
};
