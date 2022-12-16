import { ChainData, Logger } from "@connext/nxtp-utils";
import { SubgraphReader as _SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { Database } from "@connext/nxtp-adapters-database";
import contractDeployments from "@connext/nxtp-contracts/deployments.json";

import { CartographerConfig } from "./config";

export const SubgraphReader = _SubgraphReader;

export type AppContext = {
  logger: Logger;
  adapters: {
    subgraph: _SubgraphReader; // Aggregates subgraphs in a FallbackSubgraph for each chain.
    database: Database; // Database adapter.
  };
  config: CartographerConfig;
  chainData: Map<string, ChainData>;
  domains: string[]; // List of all supported domains.
};

export const context: AppContext = {} as any;
export const getContext = () => context;

/**
 * Returns the address of the `Connext` deployed to the provided chain, or undefined if it has not been deployed
 *
 * @param chainId - The chain you want the address on
 * @param postfix - The postfix to use for the contract
 * @returns The deployed address or `undefined` if it has not been deployed yet
 */
export const getDeployedConnextContract = (
  chainId: number,
  postfix: string,
): { address: string; abi: any } | undefined => {
  const record = (contractDeployments as any)[chainId.toString()] ?? {};
  const contract = record[0]?.contracts ? record[0]?.contracts[`Connext${postfix}`] : undefined;
  return contract ? { address: contract.address, abi: contract.abi } : undefined;
};
