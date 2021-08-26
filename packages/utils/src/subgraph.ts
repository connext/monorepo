/**
 * Gets hosted subgraph for applicable chains
 *
 * @param chainId - The chain you want the subgraph URI for
 * @returns A string of the appropriate URI to access the hosted subgraph
 *
 * @remarks
 * Currently only returns URIs for hosted subgraphs
 */
export const getDeployedSubgraphUri = (chainId: number): string | undefined => {
  switch (chainId) {
    case 3:
      return "https://api.thegraph.com/subgraphs/name/connext/nxtp-ropsten";
    case 4:
      return "https://api.thegraph.com/subgraphs/name/connext/nxtp-rinkeby";
    case 5:
      return "https://api.thegraph.com/subgraphs/name/connext/nxtp-goerli";
    case 42:
      return "https://api.thegraph.com/subgraphs/name/connext/nxtp-kovan";
    case 56:
      return "https://api.thegraph.com/subgraphs/name/connext/nxtp-bsc";
    case 69:
      return "https://api.thegraph.com/subgraphs/name/connext/nxtp-optimism-kovan";
    case 97:
      return "https://api.thegraph.com/subgraphs/name/connext/nxtp-chapel";
    case 100:
      return "https://api.thegraph.com/subgraphs/name/connext/nxtp-xdai";
    case 137:
      return "https://api.thegraph.com/subgraphs/name/connext/nxtp-matic";
    case 250:
      return "https://api.thegraph.com/subgraphs/name/connext/nxtp-ftm";
    case 80001:
      return "https://api.thegraph.com/subgraphs/name/connext/nxtp-mumbai";
    case 421611:
      return "https://api.thegraph.com/subgraphs/name/connext/nxtp-arbitrum-rinkeby";
    default:
      return undefined;
  }
};
