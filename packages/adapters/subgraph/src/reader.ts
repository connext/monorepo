import { BigNumber } from "ethers";
import { CrossChainTx } from "@connext/nxtp-utils";

import { ReadSubgraphConfig, SubgraphMap } from "./types";
import { getHelpers } from "./helpers";
import { GetFulfilledAndReconciledTransactionsByIdsQuery, GetPreparedTransactionsQuery } from "./runtime/graphqlsdk";

const convertSubgraphEntityToCrossChainTx = (subgEntity: any): CrossChainTx => {
  return {
    // Meta
    originDomain: subgEntity.originDomain,
    destinationDomain: subgEntity.destinationDomain,
    status: subgEntity.status,

    // Transfer Data
    nonce: subgEntity.nonce,
    transactionId: subgEntity.transactionId,
    recipient: subgEntity.recipient,
    router: subgEntity.router,
    transactingAsset: subgEntity.transactingAsset,
    localAsset: subgEntity.localAsset,

    // Prepared
    prepareCaller: subgEntity.prepareCaller,
    prepareTransactingAmount: subgEntity.prepareTransactingAmount,
    prepareLocalAmount: subgEntity.prepareLocalAmount,
    callTo: subgEntity.callTo,
    callData: subgEntity.callData,

    // TransactionPrepared
    prepareTransactionHash: subgEntity.prepareTransactionHash,
    prepareTimestamp: subgEntity.prepareTimestamp,
    prepareGasPrice: subgEntity.prepareGasPrice,
    prepareGasLimit: subgEntity.prepareGasLimit,
    prepareBlockNumber: subgEntity.prepareBlockNumber,

    // Fulfill
    fulfillCaller: subgEntity.fulfillCaller,
    fulfillTransactingAmount: subgEntity.fulfillTransactingAmount,
    fulfillLocalAmount: subgEntity.fulfillLocalAmount,

    // TransactionFulfilled
    fulfillTransactionHash: subgEntity.fulfillTransactionHash,
    fulfillTimestamp: subgEntity.fulfillTimestamp,
    fulfillGasPrice: subgEntity.fulfillGasPrice,
    fulfillGasLimit: subgEntity.fulfillGasLimit,
    fulfillBlockNumber: subgEntity.fulfillBlockNumber,

    // Reconciled
    externalCallHash: subgEntity.externalCallHash,
    reconciledTransactionHash: subgEntity.reconciledTransactionHash,
    reconciledTimestamp: subgEntity.reconciledTimestamp,
    reconciledGasPrice: subgEntity.reconciledGasPrice,
    reconciledGasLimit: subgEntity.reconciledGasLimit,
    reconciledBlockNumber: subgEntity.reconciledBlockNumber,
  };
};

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

  public async getTransactionsWithStatuses(): Promise<CrossChainTx[]> {
    const destinationDomains = [...this.subgraphs.keys()];
    const txIdsByDestinationDomain: Map<string, string[]> = new Map();

    // first get prepared transactions on all chains
    const allOrigin: [string, CrossChainTx][] = (
      await Promise.all(
        [...this.subgraphs].map(async ([, subgraph]) => {
          const { transactions } = await subgraph.runtime.request<GetPreparedTransactionsQuery>(
            (client) =>
              client.GetPreparedTransactions({ destinationDomains, maxPrepareBlockNumber: Date.now(), nonce: 0 }), // TODO: nonce + maxPrepareBlockNumber
          );
          return transactions;
        }),
      )
    )
      .flat()
      .filter((x) => !!x)
      .map((s) => {
        const tx = convertSubgraphEntityToCrossChainTx(s);

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
      [...txIdsByDestinationDomain.entries()].map(async ([destinationDomain, txIds]) => {
        const subgraph = this.subgraphs.get(destinationDomain)!; // should exist bc of initial filter
        const { transactions } = await subgraph.runtime.request<GetFulfilledAndReconciledTransactionsByIdsQuery>(
          (client) =>
            client.GetPreparedTransactions({ destinationDomains, maxPrepareBlockNumber: Date.now(), nonce: 0 }), // TODO: nonce + maxPrepareBlockNumber
        );
        transactions.forEach((_tx) => {
          const tx = convertSubgraphEntityToCrossChainTx(_tx);
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
