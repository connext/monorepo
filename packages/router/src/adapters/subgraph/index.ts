import { FallbackSubgraph, SubgraphDomain } from "@connext/nxtp-utils";
import { getRuntimeSdk, Sdk, GetPreparedTransactionsQuery } from "@connext/nxtp-read-subgraph";
import { BigNumber } from "ethers";

import { AppContext } from "../../context";

export type ChainSubgraphs = {
  runtime: FallbackSubgraph<Sdk>;
};

export class SubgraphReader {
  private subgraphs: Map<number, ChainSubgraphs> = new Map();

  constructor(context: AppContext) {
    if (context.adapters.subgraph) {
      throw new Error("Instance already exists.");
    }
    for (const chain of Object.keys(context.config.chains)) {
      const chainId = parseInt(chain);
      const { maxLag, runtime: runtimeUrls } = context.config.chains[chain].subgraph;
      this.subgraphs.set(chainId, {
        runtime: new FallbackSubgraph<Sdk>(
          chainId,
          (url: string) => getRuntimeSdk(url),
          maxLag,
          SubgraphDomain.COMMON,
          runtimeUrls,
        ),
      });
    }
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
  public async getAssetBalance(chain: number, router: string, asset: string) {
    throw new Error("Not implemented");
  }

  /**
   * Returns available liquidity for all of the routers' assets on target chain.
   *
   * @param chainId - The chain you want to determine liquidity on
   * @returns An array of asset ids and amounts of liquidity
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getAssetBalances(chain: number, router: string) {
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

  public async getOpenPrepares(
    chain: number,
    destinations: BigNumber[],
    nonce: BigNumber,
    prepareBlockNumber: BigNumber,
  ): Promise<any> {
    const subgraph = this.subgraphs.get(chain);
    if (!subgraph) {
      throw new Error(`Subgraph not defined for chain ${chain}`);
    }
    await subgraph.runtime.sync();
    const { transactions } = await subgraph.runtime.request<GetPreparedTransactionsQuery>((client) =>
      client.GetPreparedTransactions({ destinationDomains: destinations, nonce, prepareBlockNumber }),
    );
    return transactions;
    // Query and return all prepares in the past 30 mins for this chain, assuming the destination chain
    // is included in the respective array argument, `destinations`.
  }
}
