import { FallbackSubgraph, RequestContext } from "@connext/nxtp-utils";
import { BigNumber } from "ethers/lib/ethers";
import { GraphQLClient } from "graphql-request";

import { ActiveTransaction, SingleChainTransaction, SubgraphSyncRecord } from "../../lib/entities";
import { ContractReaderNotAvailableForChain } from "../../lib/errors/contractReader";
import { getContext } from "../../router";

import { getSdk, Sdk } from "./graphqlsdk";
import { getActiveTransactions, getAssetBalance, getTransactionForChain, getSyncRecord } from "./subgraph";

export type ContractReader = {
  getActiveTransactions: () => Promise<ActiveTransaction<any>[]>;
  getTransactionForChain: (
    transactionId: string,
    user: string,
    chainId: number,
  ) => Promise<SingleChainTransaction | undefined>;

  /**
   *
   * Returns available liquidity for the given asset on the TransactionManager on the provided chain.
   *
   * @param assetId - The asset you want to determine router liquidity of
   * @param chainId - The chain you want to determine liquidity on
   * @returns The available balance
   */
  getAssetBalance: (assetId: string, chainId: number) => Promise<BigNumber>;
  getSyncRecord: (chainId: number, requestContext?: RequestContext) => Promise<SubgraphSyncRecord>;
};

const sdks: Record<number, Sdk> = {};

export const getSdks = (): Record<number, Sdk> => {
  if (Object.keys(sdks).length === 0) {
    throw new ContractReaderNotAvailableForChain(0);
  }
  return sdks;
};

export const subgraphContractReader = (): ContractReader => {
  const { config } = getContext();
  Object.entries(config.chainConfig).forEach(([chainId, { subgraph }]) => {
    const clients: GraphQLClient[] = [];
    subgraph.forEach(uri => {
      const client = new GraphQLClient(uri);
      clients.push(client);
    });
    const chainIdNumber = parseInt(chainId);
    sdks[chainIdNumber] = getSdk(new FallbackSubgraph(chainIdNumber, clients));
  });

  return {
    getActiveTransactions,
    getTransactionForChain,
    getAssetBalance,
    getSyncRecord,
  };
};
