import { FallbackSubgraph, RequestContext, SubgraphSyncRecord } from "@connext/nxtp-utils";
import { BigNumber } from "ethers/lib/ethers";
import { GraphQLClient } from "graphql-request";

import { ActiveTransaction, SingleChainTransaction } from "../../lib/entities";
import { ContractReaderNotAvailableForChain } from "../../lib/errors/contractReader";
import { getContext } from "../../router";

import { getSdk, Sdk } from "./graphqlsdk";
import {
  getActiveTransactions,
  getAssetBalance,
  getTransactionForChain,
  getSyncRecords,
  getAssetBalances,
} from "./subgraph";

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

  /**
   * Returns available liquidity for any of the assets
   *
   * @param chainId - The chain you want to determine liquidity on
   * @returns An array of asset ids and amounts of liquidity
   */
  getAssetBalances: (chainId: number) => Promise<{ assetId: string; amount: BigNumber }[]>;

  getLiquiditySupplied: (chainId: number) => Promise<{ assetId: string; amount: BigNumber }[]>;

  getSyncRecords: (chainId: number, requestContext?: RequestContext) => Promise<SubgraphSyncRecord[]>;
};

const sdks: Record<number, FallbackSubgraph<Sdk>> = {};

export const getSdks = (): Record<number, FallbackSubgraph<Sdk>> => {
  if (Object.keys(sdks).length === 0) {
    throw new ContractReaderNotAvailableForChain(0);
  }
  return sdks;
};

export const subgraphContractReader = (): ContractReader => {
  const { config } = getContext();
  Object.entries(config.chainConfig).forEach(([chainId, { subgraph, subgraphSyncBuffer }]) => {
    const chainIdNumber = parseInt(chainId);
    const sdksWithClients = subgraph.map((uri) => ({ client: getSdk(new GraphQLClient(uri)), uri }));
    const fallbackSubgraph = new FallbackSubgraph<Sdk>(chainIdNumber, sdksWithClients, subgraphSyncBuffer);
    sdks[chainIdNumber] = fallbackSubgraph;
  });

  return {
    getActiveTransactions,
    getTransactionForChain,
    getAssetBalance,
    getSyncRecords,
    getAssetBalances,
    getLiquiditySupplied,
  };
};
