import { BigNumber } from "ethers";

// import { FallbackSubgraph, SubgraphDomain } from "@connext/nxtp-utils";

import { getOperations } from "./lib/operations";
import { ReadSubgraphConfig, SubgraphMap } from "./lib/entities";

export class SubgraphReader {
  private subgraphs: SubgraphMap = new Map();

  constructor() {}

  public async create(config: ReadSubgraphConfig) {
    const { create } = getOperations();
    this.subgraphs = await create(config);
  }

  // TODO: update the redis instance passed in periodically
  public async redisUpdate() {}

  // TODO: query update
  public async query() {}

  // public async getOpenPrepares(
  //   chain: number,
  //   destinations: BigNumber[],
  //   nonce: BigNumber,
  //   maxPrepareBlockNumber: BigNumber,
  // ): Promise<any> {
  //   // const subgraph = this.subgraphs.get(chain);
  //   // if (!subgraph) {
  //   //   throw new Error(`Subgraph not defined for chain ${chain}`);
  //   // }
  //   // await subgraph.runtime.sync();
  //   // const { transactions } = await subgraph.runtime.request<GetPreparedTransactionsQuery>((client) =>
  //   //   client.GetPreparedTransactions({
  //   //     destinationDomains: destinations,
  //   //     nonce,
  //   //     maxPrepareBlockNumber,
  //   //   }),
  //   // );
  //   // return transactions;
  //   // Query and return all prepares in the past 30 mins for this chain, assuming the destination chain
  //   // is included in the respective array argument, `destinations`.
  // }

  /**
   * Get the latest prepare transactions' nonce.
   * @param chain - Chain where we'll check the latest prepare nonce
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getLatestNonce(chain: number): Promise<BigNumber> {
    throw new Error("Not implemented");
  }
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
}
