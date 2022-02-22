import { GetPreparedTransactionsQuery, GetPreparedTransactionsQueryVariables } from "../runtime/graphqlsdk";
import { SubgraphMap } from "../types";

export const getSenderTransactionsQuery = async (
  subgraphs: SubgraphMap,
  chainId: number,
  params: GetPreparedTransactionsQueryVariables,
) => {
  const subgraph = subgraphs.get(chainId);
  const { transactions } = await subgraph!.runtime.request<GetPreparedTransactionsQuery>((client) =>
    client.GetPreparedTransactions(params),
  );
  return transactions;
};

export const getTransaction = async (subgraphs: SubgraphMap, chainId: number, params: GetTransactionQueryVariables) => {
  const subgraph = subgraphs.get(chainId);

  const { transaction } = await subgraph!.runtime.request<GetTransactionQuery>((client) =>
    client.GetTransaction(params),
  );
};
