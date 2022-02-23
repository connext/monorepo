import { StoreManager } from "@connext/nxtp-adapters-cache";

import { GetPreparedTransactionsQueryVariables } from "../runtime/graphqlsdk";
import { SubgraphMap } from "../types";

import { getSenderTransactionsQuery, getTransaction } from "./query";

const pollInterval = 10_000;

export const getChainIdFromDomain = (domain: string) => {
  // TODO: get chainId from domain.
  // TODO: move this function in utils after cleanup
  return 1;
};

export const getDomainFromChainId = (chainId: number) => {
  // TODO: get domain from chainId.
  // TODO: move this function in utils after cleanup
  return "1";
};

export const cacheUpdate = async (cacheInstance: StoreManager, subgraphs: SubgraphMap): Promise<NodeJS.Timeout> => {
  // initiate the polling here

  const updaterLoop = setInterval(async () => {
    try {
      await Promise.all([
        updatePreparedTransactions(cacheInstance, subgraphs),
        updateTransaction(cacheInstance, subgraphs),
      ]);
    } catch (err) {
      // throw error
    }
  }, pollInterval);

  return updaterLoop;
};

export const updatePreparedTransactions = async (cacheInstance: StoreManager, subgraphs: SubgraphMap) => {
  const destinationChainIds: number[] = [...subgraphs.keys()];

  const destinationDomains: string[] = destinationChainIds.map((chainId) => getDomainFromChainId(chainId));
  // first get all sending side txs
  const preparedTransactions = (
    await Promise.all(
      [...subgraphs.keys()].map(async (chainId) => {
        const subgraph = subgraphs.get(chainId);
        const syncRecord = await subgraph!.runtime.sync();

        // TODO: get last nonce entry from cache
        const lastNonceEntry = cacheInstance;

        // TODO: get safe confirmation from chainData per chain
        const safeConfirmation = 50;
        const maxPrepareBlockNumber = syncRecord[0].syncedBlock - safeConfirmation;

        const params: GetPreparedTransactionsQueryVariables = {
          destinationDomains: destinationDomains,
          maxPrepareBlockNumber,
          nonce: lastNonceEntry,
        };

        const transactions = await getSenderTransactionsQuery(subgraphs, chainId, params);
        return transactions;
      }),
    )
  )
    .flat()
    .filter((x) => !!x);

  // TODO: update redis db with preparedTransactions
};

export const updateTransaction = async (cacheInstance: StoreManager, subgraphs: SubgraphMap) => {
  // get transactions with prepared/fulfilled status from redis instance and update it

  // TODO: fetch transactions with prepared/fulfilled status from redis instance.

  const transactions: any = [];

  transactions.map(async (tx: any) => {
    const transactionId = tx.transactionId;

    const chainId = getChainIdFromDomain(tx.destinationDomain);

    const receivingSideRecord = await getTransaction(subgraphs, chainId, transactionId);

    // check if the status is either fulfilled or reconcilled
    // if yes then update the redis storage
  });
};
