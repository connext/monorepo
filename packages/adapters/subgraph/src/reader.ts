import { BigNumber } from "ethers";

import { GetPreparedTransactionsQuery } from "./runtime/graphqlsdk";
import { ReadSubgraphConfig, SubgraphMap } from "./types";
import { getHelpers } from "./helpers";

export class SubgraphReader {
  private subgraphs: SubgraphMap = new Map();

  private constructor() {}

  public async create(config: ReadSubgraphConfig) {
    const { create } = getHelpers();
    this.subgraphs = await create(config);
  }

  // TODO: query update
  public async query() {}

  // get transactions from all the subgraphs and save into redis
  public async update(): Promise<any> {
    // cacheUpdate
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

  /**
   * Get the latest prepare transactions' nonce.
   * @param chain - Chain where we'll check the latest prepare nonce
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getLatestNonce(chain: number): Promise<BigNumber> {
    throw new Error("Not implemented");
  }
}
