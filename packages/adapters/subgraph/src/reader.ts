import { BigNumber } from "ethers";
import { FallbackSubgraph, SubgraphDomain } from "@connext/nxtp-utils";
import { TransactionCache } from "@connext/nxtp-adapters-cache";

import { GetPreparedTransactionsQuery } from "./runtime/graphqlsdk";
import { Sdk as RuntimeSdk } from "./runtime/graphqlsdk";
import { SubgraphMap } from "./types";
import { ReadSubgraphConfig } from "./config";
import { getRuntimeSdk } from ".";

export class SubgraphReader {
  private subgraphs: SubgraphMap = new Map();

  private constructor() {}

  public async create(config: ReadSubgraphConfig, txCache: TransactionCache) {
    const subgraphMap: SubgraphMap = new Map();
    for (const chain of Object.keys(config.chains)) {
      const chainId = parseInt(chain);
      const { maxLag, runtime: runtimeUrls } = config.chains[chain].subgraph;
      subgraphMap.set(chainId, {
        runtime: new FallbackSubgraph<RuntimeSdk>(
          chainId,
          (url: string) => getRuntimeSdk(url),
          maxLag,
          SubgraphDomain.RUNTIME,
          runtimeUrls,
        ),
      });
    }
  }

  // TODO: query update
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

  // get transactions from all the subgraphs and save into redis
  public async updateTransactions({
    nonce,
    maxPrepareBlockNumber,
  }: {
    nonce: BigNumber;
    maxPrepareBlockNumber: BigNumber;
  }): Promise<any> {
    const destinations = [...this.subgraphs.keys()];

    // first get all sending side txs
    const sendingSide = (
      await Promise.all(
        [...this.subgraphs.values()].map(async (subgraph) => {
          await subgraph.runtime.sync();
          const { transactions } = await subgraph.runtime.request<GetPreparedTransactionsQuery>((client) =>
            client.GetPreparedTransactions({
              destinationDomains: destinations,
              nonce,
              maxPrepareBlockNumber,
            }),
          );
          return transactions;
        }),
      )
    )
      .flat()
      .filter((x) => !!x);

    // separate all sending side txs into receiving side buckets
    const destinationTxs = new Map<string, string[]>();
    sendingSide.forEach((tx) => {
      if (destinationTxs.has(tx.destinationDomain)) {
        const txs = destinationTxs.get(tx.destinationDomain)!;
        txs.push(tx.transactionId);
        destinationTxs.set(tx.destinationDomain, txs);
      } else {
        destinationTxs.set(tx.destinationDomain, [tx.transactionId]);
      }
    });

    // save to txCache
    // await txCache.saveTxs(destinationTxs);

    // get receiving
    [...destinationTxs.entries()].forEach(([destinationDomain, txs]) => {});

    // update cache
  }
}
