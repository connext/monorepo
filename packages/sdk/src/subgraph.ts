import { Signer } from "ethers";
import { BaseLogger } from "pino";
import { CrosschainTransaction, getUuid, TransactionData, VariantTransactionData } from "@connext/nxtp-utils";
import { GraphQLClient } from "graphql-request";
import { Evt } from "evt";

import {
  NxtpSdkEvent,
  ReceiverTransactionCancelledPayload,
  ReceiverTransactionFulfilledPayload,
  ReceiverTransactionPreparedPayload,
  SenderTransactionPreparedPayload,
} from "./sdk";
import { getSdk, Sdk, TransactionStatus } from "./graphqlsdk";

export const SubgraphUri: { [chainId: number]: string } = {
  4: "https://api.thegraph.com/subgraphs/name/connext/nxtp-rinkeby",
  5: "https://api.thegraph.com/subgraphs/name/connext/nxtp-goerli",
  69: "https://api.thegraph.com/subgraphs/name/connext/nxtp-optimism-kovan",
  80001: "https://api.thegraph.com/subgraphs/name/connext/nxtp-mumbai",
  421611: "https://api.thegraph.com/subgraphs/name/connext/nxtp-arbitrum-rinkeby",
};
/**
 * Converts subgraph transactions to properly typed TransactionData
 *
 * @param transaction Subgraph data
 * @returns Properly formatted TransactionData
 */
export const convertTransactionToTxData = (transaction: any): TransactionData => {
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
    expiry: parseInt(transaction.expiry),
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
  ReceiverTransactionCancelled: "ReceiverTransactionCancelled",
} as const;
export type SubgraphEvent = typeof SubgraphEvents[keyof typeof SubgraphEvents];

export interface SubgraphEventPayloads {
  [SubgraphEvents.SenderTransactionPrepared]: SenderTransactionPreparedPayload;
  [SubgraphEvents.ReceiverTransactionPrepared]: ReceiverTransactionPreparedPayload;
  [SubgraphEvents.ReceiverTransactionFulfilled]: ReceiverTransactionFulfilledPayload;
  [SubgraphEvents.ReceiverTransactionCancelled]: ReceiverTransactionCancelledPayload;
}

/**
 * Creates an evt container to be used for translating subgraph events into an easy to use and strongly typed format
 * @returns A container keyed on event names with values of the Evt instance used for that event
 */
export const createSubgraphEvts = (): {
  [K in SubgraphEvent]: Evt<SubgraphEventPayloads[K]>;
} => {
  return {
    [SubgraphEvents.SenderTransactionPrepared]: Evt.create<SenderTransactionPreparedPayload>(),
    [SubgraphEvents.ReceiverTransactionPrepared]: Evt.create<ReceiverTransactionPreparedPayload>(),
    [SubgraphEvents.ReceiverTransactionFulfilled]: Evt.create<ReceiverTransactionFulfilledPayload>(),
    [SubgraphEvents.ReceiverTransactionCancelled]: Evt.create<ReceiverTransactionCancelledPayload>(),
  };
};

export type ActiveTransaction = {
  crosschainTx: CrosschainTransaction;
  status: NxtpSdkEvent;
  bidSignature: string;
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
    this.subgraphLoop();
  }

  private subgraphLoop(): void {
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
        const user = (await this.user.getAddress()).toLowerCase();
        const chainId = parseInt(c);
        const subgraph = this.sdks[chainId];

        // get all sender prepared
        const { transactions: senderPrepared } = await subgraph.GetSenderTransactions({
          sendingChainId: chainId,
          userId: user,
          status: TransactionStatus.Prepared,
        });

        // for each, break up receiving txs by chain
        const senderPerChain: Record<number, any[]> = {};
        senderPrepared.forEach((tx) => {
          if (!senderPerChain[tx.receivingChainId]) {
            senderPerChain[tx.receivingChainId] = [tx];
          } else {
            senderPerChain[tx.receivingChainId].push(tx);
          }
        });

        // for each chain in each of the sets of txs, get the corresponding receiver txs
        const activeTxs = await Promise.all(
          Object.entries(senderPerChain).map(async ([chainId, senderTxs]) => {
            const _sdk = this.sdks[parseInt(chainId)];
            if (!_sdk) {
              this.logger.error({ methodId, methodName, chainId }, "No SDK for chainId");
              return undefined;
            }
            const { transactions: correspondingReceiverTxs } = await _sdk.GetTransactions({
              transactionIds: senderTxs.map((tx) => tx.transactionId),
            });

            return senderTxs.map((senderTx): ActiveTransaction | undefined => {
              const correspondingReceiverTx = correspondingReceiverTxs.find(
                (tx) => tx.transactionId === senderTx.transactionId,
              );
              const sendingTxData = convertTransactionToTxData(senderTx);
              const {
                amount: sendingAmount,
                preparedBlockNumber: sendingPreparedBlockNumber,
                expiry: sendingExpiry,
                ...invariant
              } = sendingTxData;
              const sendingVariant: VariantTransactionData = {
                amount: sendingAmount,
                preparedBlockNumber: sendingPreparedBlockNumber,
                expiry: sendingExpiry,
              };

              const active = this.activeTxs.get(senderTx.transactionId);
              if (!correspondingReceiverTx) {
                // if receiver doesnt exist, its a sender prepared
                // if we are not tracking it

                const common = {
                  bidSignature: senderTx.bidSignature,
                  caller: senderTx.prepareCaller,
                  encodedBid: senderTx.encodedBid,
                  encryptedCallData: senderTx.encryptedCallData,
                  transactionHash: senderTx.prepareTransactionHash,
                };
                const tx: ActiveTransaction = {
                  ...common,
                  crosschainTx: {
                    invariant,
                    sending: sendingVariant,
                  },
                  status: SubgraphEvents.SenderTransactionPrepared,
                };
                if (!active) {
                  this.activeTxs.set(senderTx.transactionId, tx);
                  this.evts.SenderTransactionPrepared.post({
                    ...common,
                    txData: sendingTxData,
                  });
                }
                return tx;
                // otherwise we are already tracking, no change
              }
              if (correspondingReceiverTx.status === TransactionStatus.Prepared) {
                const receiverData = convertTransactionToTxData(correspondingReceiverTx);
                const common = {
                  bidSignature: correspondingReceiverTx.bidSignature,
                  caller: correspondingReceiverTx.prepareCaller,
                  encodedBid: correspondingReceiverTx.encodedBid,
                  encryptedCallData: correspondingReceiverTx.encryptedCallData,
                  transactionHash: correspondingReceiverTx.prepareTransactionHash,
                };
                const { amount, expiry, preparedBlockNumber, ...invariant } = receiverData;

                const tx: ActiveTransaction = {
                  ...common,
                  crosschainTx: {
                    invariant,
                    receiving: { amount, expiry, preparedBlockNumber },
                    sending: sendingVariant,
                  },
                  status: SubgraphEvents.ReceiverTransactionPrepared,
                };
                if (!active) {
                  this.logger.warn(
                    { transactionId: invariant.transactionId, active: this.activeTxs.keys() },
                    "Missing active sender tx",
                  );
                }
                // if receiver is prepared, its a receiver prepared
                // if we are not tracking it or the status changed post an event
                if (!active || active.status !== SubgraphEvents.ReceiverTransactionPrepared) {
                  this.activeTxs.set(senderTx.transactionId, tx);
                  this.evts.ReceiverTransactionPrepared.post({
                    ...common,
                    txData: receiverData,
                    transactionHash: correspondingReceiverTx.prepareTransactionHash,
                  });
                }
                return tx;
                // otherwise we are already tracking, no change
              }
              if (correspondingReceiverTx.status === TransactionStatus.Fulfilled) {
                const tx = {
                  txData: convertTransactionToTxData(correspondingReceiverTx),
                  signature: correspondingReceiverTx.signature,
                  relayerFee: correspondingReceiverTx.relayerFee,
                  callData: correspondingReceiverTx.callData!,
                  caller: correspondingReceiverTx.fulfillCaller,
                  transactionHash: correspondingReceiverTx.fulfillTransactionHash,
                };
                // if receiver is fulfilled, its a receiver fulfilled
                // if we are not tracking it or the status changed post an event
                if (active) {
                  this.activeTxs.delete(senderTx.transactionId);
                  this.evts.ReceiverTransactionFulfilled.post(tx);
                }
                return undefined; // no longer active
              }
              if (correspondingReceiverTx.status === TransactionStatus.Cancelled) {
                const tx = {
                  txData: convertTransactionToTxData(correspondingReceiverTx),
                  relayerFee: correspondingReceiverTx.relayerFee,
                  caller: correspondingReceiverTx.fulfillCaller,
                  transactionHash: correspondingReceiverTx.cancelTransactionHash,
                };
                // if receiver is cancelled, its a receiver cancelled
                if (!active || active.status !== SubgraphEvents.ReceiverTransactionCancelled) {
                  this.activeTxs.delete(senderTx.transactionId);
                  this.evts.ReceiverTransactionCancelled.post(tx);
                }
                return undefined; // no longer active
              }
              return undefined;
            });
          }),
        );

        const activeFlattened = activeTxs.flat().filter((x) => !!x) as ActiveTransaction[];
        return activeFlattened;
      }),
    );

    const all = txs.flat();
    if (all.length > 0) {
      this.logger.info({
        methodName,
        methodId,
        active: all.map((a) => a.crosschainTx.invariant.transactionId).join(","),
      });
      this.logger.debug({ methodId, methodName, all }, "Queried active txs");
    }
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
