import { Signer } from "ethers";
import { BaseLogger } from "pino";
import { getUuid, TransactionData, TransactionFulfilledEvent, TransactionPreparedEvent } from "@connext/nxtp-utils";
import { GraphQLClient } from "graphql-request";

import { NxtpSdkEvent, NxtpSdkEvents } from "./sdk";
import { getSdk, Sdk, TransactionStatus } from "./graphqlsdk";
import { Evt } from "evt";

/**
 * Gets hosted subgraph for applicable chains
 *
 * @param chainId - The chain you want the subgraph URI for
 * @returns A string of the appropriate URI to access the hosted subgraph
 *
 * @remarks
 * Currently only returns URIs for hosted subgraphs
 */
export const getDeployedSubgraphUri = (chainId: number): string | undefined => {
  switch (chainId) {
    case 4:
      return "https://api.thegraph.com/subgraphs/name/connext/nxtp-rinkeby";
    case 5:
      return "https://api.thegraph.com/subgraphs/name/connext/nxtp-goerli";
    default:
      return undefined;
  }
};

/**
 * Converts subgraph transactions to properly typed TransactionData
 *
 * @param transaction Subgraph data
 * @returns Properly formatted TransactionData
 */
const convertTransactionToTxData = (transaction: any): TransactionData => {
  return {
    user: transaction.user.id,
    router: transaction.router.id,
    sendingChainId: parseInt(transaction.sendingChainId),
    sendingAssetId: transaction.sendingAssetId,
    sendingChainFallback: transaction.sendingChainFallback,
    amount: transaction.amount,
    receivingChainId: parseInt(transaction.receivingChainId),
    receivingAssetId: transaction.receivingAssetId,
    receivingAddress: transaction.receivingAddress,
    expiry: transaction.expiry,
    callDataHash: transaction.callDataHash,
    callTo: transaction.callTo,
    transactionId: transaction.transactionId,
    preparedBlockNumber: parseInt(transaction.preparedBlockNumber),
  };
};

export const SubgraphEvents = {
  SenderTransactionPrepared: "SenderTransactionPrepared",
  ReceiverTransactionPrepared: "ReceiverTransactionPrepared",
  ReceiverTransactionFulfilled: "ReceiverTransactionFulfilled",
} as const;
export type SubgraphEvent = typeof SubgraphEvents[keyof typeof SubgraphEvents];

export interface SubgraphEventPayloads {
  [SubgraphEvents.SenderTransactionPrepared]: TransactionPreparedEvent;
  [SubgraphEvents.ReceiverTransactionPrepared]: TransactionPreparedEvent;
  [SubgraphEvents.ReceiverTransactionFulfilled]: TransactionFulfilledEvent;
}

/**
 * Creates an evt container to be used for translating subgraph events into an easy to use and strongly typed format
 * @returns A container keyed on event names with values of the Evt instance used for that event
 */
export const createSubgraphEvts = (): {
  [K in SubgraphEvent]: Evt<SubgraphEventPayloads[K]>;
} => {
  return {
    [SubgraphEvents.SenderTransactionPrepared]: Evt.create<TransactionPreparedEvent>(),
    [SubgraphEvents.ReceiverTransactionPrepared]: Evt.create<TransactionPreparedEvent>(),
    [SubgraphEvents.ReceiverTransactionFulfilled]: Evt.create<TransactionFulfilledEvent>(),
  };
};

export type ActiveTransaction = {
  txData: TransactionData;
  status: NxtpSdkEvent;
  bidSignature: string;
  caller: string;
  encodedBid: string;
  encryptedCallData: string;
};

/**
 * @classdesc Handles all user-facing subgraph queries
 */
export class Subgraph {
  private sdks: Record<number, Sdk> = {};
  private evts = createSubgraphEvts();
  private activeTxs: Map<string, ActiveTransaction> = new Map();

  constructor(
    private readonly user: Signer,
    private readonly chainConfig: Record<number, { subgraph: string }>,
    private readonly logger: BaseLogger,
    private readonly pollInterval = 10_000,
  ) {
    Object.entries(this.chainConfig).forEach(([chainId, { subgraph }]) => {
      const client = new GraphQLClient(subgraph);
      this.sdks[parseInt(chainId)] = getSdk(client);
    });
  }

  private subgraphLoop(): void {
    const method = "subgraphLoop";
    const methodId = getUuid();
    setInterval(async () => {
      await this.getActiveTransactions();
    }, this.pollInterval);
  }

  /**
   * Gets the transactions that the user may need to take action on, or is waiting for the router to take action on. Specifically,
   * transactions that have been prepared on the sending chain, but have yet to be fulfilled on the receiving chain, or have yet
   * to be cancelled on the sending chain
   *
   * @returns All active transactions for the instantiated user
   */
  async getActiveTransactions(): Promise<ActiveTransaction[]> {
    const methodName = "getActiveTransactions";
    const methodId = getUuid();

    const txs = await Promise.all(
      Object.keys(this.sdks).map(async (c) => {
        const user = await this.user.getAddress();
        const chainId = parseInt(c);
        const subgraph = this.sdks[chainId];
        // receiver side prepared = ReceiverPrepared
        const { transactions: receiverPrepared } = await subgraph.GetReceiverTransactions({
          userId: user,
          receivingChainId: chainId,
          status: TransactionStatus.Prepared,
        });

        // sender prepared + no receiver side = SenderPrepared
        const { transactions: allSenderPrepared } = await subgraph.GetSenderTransactions({
          sendingChainId: chainId,
          userId: user,
          status: TransactionStatus.Prepared,
        });
        const { transactions: receiverForSenderPrepared } = await subgraph.GetTransactions({
          transactionIds: allSenderPrepared.map((t) => t.transactionId),
        });
        const receiverForSenderPreparedIds = receiverForSenderPrepared.map((t) => t.transactionId);

        // filter out everything that has a receiver prepared tx
        const senderPrepared = allSenderPrepared.filter(
          (tx) => !receiverForSenderPreparedIds.includes(tx.transactionId),
        );

        const rxTxs: ActiveTransaction[] = receiverPrepared.map((txData) => {
          const tx: ActiveTransaction = {
            txData: convertTransactionToTxData(txData),
            bidSignature: txData.bidSignature,
            caller: txData.prepareCaller,
            encodedBid: txData.encodedBid,
            encryptedCallData: txData.encryptedCallData,
            status: SubgraphEvents.SenderTransactionPrepared,
          };
          // if it doesn't exist in the map, we need to post about it
          // also if it is in the SenderPrepared status, update the status and post about it
          const existing = this.activeTxs.get(tx.txData.transactionId);
          if (!existing || existing.status === NxtpSdkEvents.SenderTransactionPrepared) {
            this.evts.ReceiverTransactionPrepared.post({
              txData: convertTransactionToTxData(tx.txData),
              bidSignature: tx.bidSignature,
              caller: tx.caller,
              encodedBid: tx.encodedBid,
              encryptedCallData: tx.encryptedCallData,
            });
            // add to map
            this.activeTxs.set(tx.txData.transactionId, tx);
          }
          // else it's already there
          return {
            txData: convertTransactionToTxData(txData),
            status: NxtpSdkEvents.ReceiverTransactionPrepared,
            bidSignature: txData.bidSignature,
            caller: txData.prepareCaller,
            encodedBid: txData.encodedBid,
            encryptedCallData: txData.encryptedCallData,
          };
        });

        const senderTxs: ActiveTransaction[] = senderPrepared.map((txData) => {
          const tx: ActiveTransaction = {
            txData: convertTransactionToTxData(txData),
            bidSignature: txData.bidSignature,
            caller: txData.prepareCaller,
            encodedBid: txData.encodedBid,
            encryptedCallData: txData.encryptedCallData,
            status: SubgraphEvents.SenderTransactionPrepared,
          };
          // if it doesn't exist in the map, we need to post about it
          if (!this.activeTxs.has(txData.transactionId)) {
            this.evts.SenderTransactionPrepared.post(tx);
            // add to map
            this.activeTxs.set(txData.transactionId, tx);
          }
          // else it's already there
          return {
            txData: convertTransactionToTxData(txData),
            status: NxtpSdkEvents.SenderTransactionPrepared,
            bidSignature: txData.bidSignature,
            caller: txData.prepareCaller,
            encodedBid: txData.encodedBid,
            encryptedCallData: txData.encryptedCallData,
          };
        });
        return rxTxs.concat(senderTxs);
      }),
    );
    this.logger.debug({ methodId, methodName, txs }, "Queried active txs");
    const all = txs.flat();

    // get statuses for txs we are already tracking so we can determine which ones have been fulfilled
    const allIds = all.map((tx) => tx.txData.transactionId);
    const unknownTxs = [...this.activeTxs]
      .filter(([, tx]) => !allIds.includes(tx.txData.transactionId))
      .map(([, tx]) => tx); // get just the array of txs from the map
    const unknownPerChain: Record<number, ActiveTransaction[]> = {};
    unknownTxs.forEach((tx) => {
      if (!unknownPerChain[tx.txData.receivingChainId]) {
        unknownPerChain[tx.txData.receivingChainId] = [tx];
      } else {
        unknownPerChain[tx.txData.receivingChainId].push(tx);
      }
    });

    // dont await this, can happen in the bg
    Object.entries(unknownPerChain).map(async ([chainId, txs]) => {
      const _sdk = this.sdks[parseInt(chainId)];
      if (!_sdk) {
        this.logger.error({ methodId, methodName, chainId }, "No SDK for chainId");
      }
      const _txs = await _sdk.GetTransactions({ transactionIds: txs.map((tx) => tx.txData.transactionId) });
      _txs.transactions.forEach((tx) => {
        if (tx.status === TransactionStatus.Fulfilled) {
          this.evts.ReceiverTransactionFulfilled.post({
            callData: tx.callData!,
            signature: tx.signature!,
            relayerFee: tx.relayerFee!,
            caller: tx.fulfillCaller!,
            txData: convertTransactionToTxData(tx),
          });
          this.activeTxs.delete(tx.transactionId);
        } else if (tx.status === TransactionStatus.Cancelled) {
          this.activeTxs.delete(tx.transactionId);
        }
      });
    });

    return all;
  }

  // Listener methods
  /**
   * Attaches a callback to the emitted event
   *
   * @param event - The event name to attach a handler for
   * @param callback - The callback to invoke on event emission
   * @param filter - (optional) A filter where callbacks are only invoked if the filter returns true
   * @param timeout - (optional) A timeout to detach the handler within. I.e. if no events fired within the timeout, then the handler is detached
   */
  public attach<T extends SubgraphEvent>(
    event: T,
    callback: (data: SubgraphEventPayloads[T]) => void,
    filter: (data: SubgraphEventPayloads[T]) => boolean = (_data: SubgraphEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x);
    this.evts[event].pipe(filter).attach(...(args as [number, any]));
  }

  /**
   * Attaches a callback to the emitted event that will be executed one time and then detached.
   *
   * @param event - The event name to attach a handler for
   * @param callback - The callback to invoke on event emission
   * @param filter - (optional) A filter where callbacks are only invoked if the filter returns true
   * @param timeout - (optional) A timeout to detach the handler within. I.e. if no events fired within the timeout, then the handler is detached
   *
   */
  public attachOnce<T extends SubgraphEvent>(
    event: T,
    callback: (data: SubgraphEventPayloads[T]) => void,
    filter: (data: SubgraphEventPayloads[T]) => boolean = (_data: SubgraphEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x);
    this.evts[event].pipe(filter).attachOnce(...(args as [number, any]));
  }

  /**
   * Removes all attached handlers from the given event.
   *
   * @param event - (optional) The event name to remove handlers from. If not provided, will detach handlers from *all* subgraph events
   */
  public detach<T extends SubgraphEvent>(event?: T): void {
    if (event) {
      this.evts[event].detach();
      return;
    }
    Object.values(this.evts).forEach((evt) => evt.detach());
  }

  /**
   * Returns a promise that resolves when the event matching the filter is emitted
   *
   * @param event - The event name to wait for
   * @param timeout - The ms to continue waiting before rejecting
   * @param filter - (optional) A filter where the promise is only resolved if the filter returns true
   *
   * @returns Promise that will resolve with the event payload once the event is emitted, or rejects if the timeout is reached.
   *
   */
  public waitFor<T extends SubgraphEvent>(
    event: T,
    timeout: number,
    filter: (data: SubgraphEventPayloads[T]) => boolean = (_data: SubgraphEventPayloads[T]) => true,
  ): Promise<SubgraphEventPayloads[T]> {
    return this.evts[event].pipe(filter).waitFor(timeout) as Promise<SubgraphEventPayloads[T]>;
  }
}
