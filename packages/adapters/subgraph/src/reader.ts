import { BigNumber } from "ethers";
import { CrossChainTx } from "@connext/nxtp-utils";

import { SubgraphReaderConfig, SubgraphMap } from "./lib/entities";
import { getHelpers } from "./lib/helpers";
import {
  GetFulfilledAndReconciledTransactionsByIdsQuery,
  GetPreparedTransactionsQuery,
} from "./lib/subgraphs/runtime/graphqlsdk";

export class SubgraphReader {
  private static instance: SubgraphReader | undefined;
  private readonly subgraphs: SubgraphMap;

  private constructor(subgraphs: SubgraphMap) {
    this.subgraphs = subgraphs;
  }

  public static async create(config: SubgraphReaderConfig): Promise<SubgraphReader> {
    if (SubgraphReader.instance) {
      return SubgraphReader.instance;
    }
    const { create } = getHelpers();
    const subgraphs = await create(config);
    return new SubgraphReader(subgraphs);
  }

  // TODO: query
  public async query() {}

  /**
   *
   * Returns available liquidity for the given asset on the TransactionManager on the provided chain.
   *
   * @param chain - The chain you want to determine liquidity on
   * @param router - Router address
   * @param asset - The asset you want to determine router liquidity of
   * @returns The available balance
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getAssetBalance(chain: number, router: string, asset: string): Promise<BigNumber> {
    throw new Error("Not implemented");
  }

  /**
   * Returns available liquidity for all of the routers' assets on target chain.
   *
   * @param chain - The chain you want to determine liquidity on
   * @param router - Router address
   * @returns An array of asset ids and amounts of liquidity
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getAssetBalances(chain: number, router: string): Promise<{ [asset: string]: BigNumber }> {
    throw new Error("Not implemented");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async isRouterApproved(chain: number, router: string) {
    throw new Error("Not implemented");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async isAssetApproved(chain: number, asset: string) {
    throw new Error("Not implemented");
  }

  public async getTransactionsWithStatuses(): Promise<CrossChainTx[]> {
    const destinationDomains = [...this.subgraphs.keys()];
    const txIdsByDestinationDomain: Map<string, string[]> = new Map();
    const { parser } = getHelpers();

    // first get prepared transactions on all chains
    const allOrigin: [string, CrossChainTx][] = (
      await Promise.all(
        [...this.subgraphs].map(async ([, subgraph]) => {
          const { transactions } = await subgraph.runtime.request<GetPreparedTransactionsQuery>(
            (client) =>
              client.GetPreparedTransactions({
                destinationDomains,
                maxPrepareBlockNumber: Date.now().toString(),
                nonce: 0,
              }), // TODO: nonce + maxPrepareBlockNumber
          );
          return transactions;
        }),
      )
    )
      .flat()
      .filter((x) => !!x)
      .map((s) => {
        const tx = parser.crossChainTx(s);

        // set into a map by destination domain
        txIdsByDestinationDomain.set(
          tx.destinationDomain,
          (txIdsByDestinationDomain.get(tx.transactionId) ?? []).concat([tx.transactionId]),
        );
        return [s.transactionId as string, tx];
      });

    const allTxById = new Map<string, CrossChainTx>(allOrigin);

    // use prepared IDs to get all receiving txs
    await Promise.all(
      [...txIdsByDestinationDomain.entries()].map(async ([destinationDomain, transactionIds]) => {
        const subgraph = this.subgraphs.get(destinationDomain)!; // should exist bc of initial filter
        const { transactions } = await subgraph.runtime.request<GetFulfilledAndReconciledTransactionsByIdsQuery>(
          (client) =>
            client.GetFulfilledAndReconciledTransactionsByIds({ transactionIds, maxPrepareBlockNumber: Date.now() }), // TODO: maxPrepareBlockNumber
        );
        transactions.forEach((_tx) => {
          const tx = parser.crossChainTx(_tx);
          const inMap = allTxById.get(tx.transactionId)!;
          inMap.status = tx.status;
          allTxById.set(tx.transactionId, inMap);
        });
      }),
    );

    // create array of all transactions by status
    return [...allTxById.values()];
  }
}
