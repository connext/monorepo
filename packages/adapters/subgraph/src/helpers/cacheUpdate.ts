import { TransactionCache } from "@connext/nxtp-adapters-cache";
import { SubgraphMap } from "../types";
import { GetPreparedTransactionsQueryVariables } from "../runtime/graphqlsdk";
import { getSenderTransactionsQuery } from "./query";

export const cacheUpdate = (cacheInstance: TransactionCache) => {
  // initiate the polling here
};

export const updatePreparedTransactions = async (
  cacheInstance: TransactionCache,
  subgraphs: SubgraphMap,
  destinationDomains: string[],
) => {
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

export const updateTransaction = (cacheInstance: TransactionCache, subgraphs: SubgraphMap, transferId: string) => {
  // Either we get the prepared status transactions from instance and then update the receiving side status
  // Or
  // Router/Auctioneer/ExplorerBackend pushes transactionId or nonce to fetch the updated status
  // First one seems like a better approach
  // problem: what's the best way to decide to fetch these transactions data?
  // should we get all the prepareTransactions within a time interval?
};
