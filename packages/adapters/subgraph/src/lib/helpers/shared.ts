import { ChainData } from "@connext/nxtp-utils";

/**
 * Gets subgraph prefix by domain. `prefix` is used in composing the cross-chain queries.
 * @param domain - The domain Id you're going to get the prefix by
 */
export const getPrefixByDomain = (domain: string, chainData: Map<string, ChainData>): string => {
  if (chainData.has(domain)) {
    return chainData.get(domain)!.network;
  }
  throw Error(`Prefix doesn't exist in chainData`);
};
