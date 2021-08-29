import { GraphQLClient } from "graphql-request";

import { ContractReader } from "../../lib/entities";
import { ContractReaderNotAvailableForChain } from "../../lib/errors";
import { getContext } from "../../router";

import { getSdk, Sdk } from "./graphqlsdk";
import { getActiveTransactions, getAssetBalance, getTransactionForChain, getSyncRecord } from "./subgraph";

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
    getSyncRecord,
  };
};
