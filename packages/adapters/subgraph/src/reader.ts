import { BigNumber } from "ethers";

import { ReadSubgraphConfig, SubgraphMap } from "./types";
import { getHelpers } from "./helpers";
import { GetPreparedTransactionsQuery } from "./runtime/graphqlsdk";

export class SubgraphReader {
  private subgraphs: SubgraphMap = new Map();

  public constructor() {}

  public async create(config: ReadSubgraphConfig) {
    const { create } = getHelpers();
    this.subgraphs = await create(config);
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

  /**
   * Get the latest prepare transactions' nonce.
   * @param chain - Chain where we'll check the latest prepare nonce
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getLatestNonce(chain: number): Promise<BigNumber> {
    throw new Error("Not implemented");
  }

  public async getTransactionsWithStatuses(): Promise<any[]> {
    // first get prepared transactions on all chains
    const destinationDomains = [...this.subgraphs.keys()];
    const allSending = (
      await Promise.all(
        [...this.subgraphs].map(async ([chain, subgraph]) => {
          const { transactions } = await subgraph.runtime.request<GetPreparedTransactionsQuery>((client) =>
            client.GetPreparedTransactions({ destinationDomains, maxPrepareBlockNumber: Date.now(), nonce: 0 }), // TODO: nonce + maxPrepareBlockNumber
          );
          return transactions;
        }),
      )
    )
      .flat()
      .filter((x) => !!x);

    // get all receiving domains

    // client.GetFulfilledAndReconciledTransactionsByIds use prepared IDs to get all receiving txs

    // create array of all transactions by status
  }
}
