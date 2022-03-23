import { ChainData, getChainData } from "..";

/**
 * Gets chain id from domain with `chainData`
 *
 * @param domain The network identifier defined by nomad
 * @param _chainData The global chain data
 * @returns The chain id
 */
export const getChainIdFromDomain = async (domain: string, _chainData?: Map<string, ChainData>): Promise<number> => {
  const chainData = _chainData ?? (await getChainData());

  if (chainData!.has(domain)) {
    return chainData!.get(domain)!.chainId;
  } else {
    throw new Error(`ChainData doesn't have a record for domain: ${domain}`);
  }
};

/**
 * Gets domain from chain id with `chainData`
 *
 * @param chainId The network identifier
 * @param chainData The global chain data
 * @returns The domain defined by nomad
 */
export const getDomainFromChainId = async (chainId: number, _chainData?: Map<string, ChainData>): Promise<string> => {
  const chaindata = _chainData ?? (await getChainData());
  for (const domain of chaindata!.keys()) {
    if (chaindata!.get(domain)!.chainId == chainId) return domain;
  }

  throw new Error(`ChainData doesn't have a record for chain: ${chainId}`);
};
