import { GetPreparedTransactionsQuery, GetPreparedTransactionsQueryVariables } from "../../runtime/graphqlsdk";
import { SubgraphMap } from "../entities";

export const getPreparedTransactions = async (
  subgraphs: SubgraphMap,
  chainId: number,
  params: GetPreparedTransactionsQueryVariables,
) => {
  const subgraph = subgraphs.get(chainId);

  if (!subgraph) {
    throw new Error(`Subgraph not defined for chain ${chainId}`);
  }
  await subgraph.runtime.sync();
  const { transactions } = await subgraph.runtime.request<GetPreparedTransactionsQuery>((client) =>
    client.GetPreparedTransactions(params),
  );
  return transactions;
};
