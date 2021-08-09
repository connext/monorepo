import { BigNumber } from "ethers/lib/ethers";
import { GraphQLClient } from "graphql-request";

import { ActiveTransaction, SingleChainTransaction } from "../../lib/entities";
import { ContractReaderNotAvailableForChain } from "../../lib/errors/contractReader";
import { getContext } from "../../router";

import { getSdk, Sdk } from "./graphqlsdk";
import { getActiveTransactions, getAssetBalance, getTransactionForChain } from "./subgraph";

export type ContractReader = {
  getActiveTransactions: () => Promise<ActiveTransaction[]>;
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
   * @returns The available balance (or undefined)
   */
  getAssetBalance: (assetId: string, chainId: number) => Promise<BigNumber>;
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
    const client = new GraphQLClient(subgraph);
    sdks[parseInt(chainId)] = getSdk(client);
  });

  return {
    getActiveTransactions,
    getTransactionForChain,
    getAssetBalance,
  };
};
