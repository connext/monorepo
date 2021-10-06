import { providers, Signer } from "ethers";
import {
  createLoggingContext,
  FallbackSubgraph,
  jsonifyError,
  Logger,
  RequestContext,
  TransactionData,
  VariantTransactionData,
} from "@connext/nxtp-utils";
import { GraphQLClient } from "graphql-request";
import { Evt } from "evt";

import { InvalidTxStatus } from "../error";
import {
  SenderTransactionPreparedPayload,
  SenderTransactionCancelledPayload,
  ReceiverTransactionPreparedPayload,
  ReceiverTransactionFulfilledPayload,
  ReceiverTransactionCancelledPayload,
  HistoricalTransaction,
  HistoricalTransactionStatus,
  ActiveTransaction,
  SubgraphSyncRecord,
} from "../types";

import {
  GetReceiverTransactionsQuery,
  getSdk,
  GetSenderTransactionsQuery,
  GetTransactionsQuery,
  Sdk,
  TransactionStatus,
} from "./graphqlsdk";

/**
 * Converts subgraph transactions to properly typed TransactionData
 *
 * @param transaction Subgraph data
 * @returns Properly formatted TransactionData
 */
export const convertTransactionToTxData = (transaction: any): TransactionData => {
  return {
    receivingChainTxManagerAddress: transaction.receivingChainTxManagerAddress,
    user: transaction.user.id,
    initiator: transaction.initiator,
    router: transaction.router.id,
    sendingChainId: parseInt(transaction.sendingChainId),
    sendingAssetId: transaction.sendingAssetId,
    sendingChainFallback: transaction.sendingChainFallback,
    amount: transaction.amount.toString(),
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
  SenderTransactionCancelled: "SenderTransactionCancelled",
  ReceiverTransactionPrepared: "ReceiverTransactionPrepared",
  ReceiverTransactionFulfilled: "ReceiverTransactionFulfilled",
  ReceiverTransactionCancelled: "ReceiverTransactionCancelled",
} as const;
export type SubgraphEvent = typeof SubgraphEvents[keyof typeof SubgraphEvents];

export interface SubgraphEventPayloads {
  [SubgraphEvents.SenderTransactionPrepared]: SenderTransactionPreparedPayload;
  [SubgraphEvents.SenderTransactionCancelled]: SenderTransactionCancelledPayload;
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
    [SubgraphEvents.SenderTransactionCancelled]: Evt.create<SenderTransactionCancelledPayload>(),
    [SubgraphEvents.ReceiverTransactionPrepared]: Evt.create<ReceiverTransactionPreparedPayload>(),
    [SubgraphEvents.ReceiverTransactionFulfilled]: Evt.create<ReceiverTransactionFulfilledPayload>(),
    [SubgraphEvents.ReceiverTransactionCancelled]: Evt.create<ReceiverTransactionCancelledPayload>(),
  };
};

const DEFAULT_SUBGRAPH_SYNC_BUFFER = 50;

export type SubgraphChainConfig = {
  subgraph: string | string[];
  provider: providers.FallbackProvider;
  subgraphSyncBuffer: number;
};

/**
 * @classdesc Handles all user-facing subgraph queries
 */
export class Subgraph {
  private sdks: Record<number, FallbackSubgraph<Sdk>> = {};
  private evts = createSubgraphEvts();
  private activeTxs: Map<string, ActiveTransaction> = new Map();
  private pollingLoop: NodeJS.Timer | undefined;
  private syncStatus: Record<number, SubgraphSyncRecord> = {};
  private chainConfig: Record<number, SubgraphChainConfig>;

  constructor(
    private readonly user: Signer,
    _chainConfig: Record<number, Omit<SubgraphChainConfig, "subgraphSyncBuffer"> & { subgraphSyncBuffer?: number }>,
    private readonly logger: Logger,
    skipPolling = false,
    private readonly pollInterval = 10_000,
  ) {
    this.chainConfig = {};
    Object.entries(_chainConfig).forEach(
      ([chainId, { subgraph, provider, subgraphSyncBuffer: _subgraphSyncBuffer }]) => {
        const cId = parseInt(chainId);
        const uris = typeof subgraph === "string" ? [subgraph] : subgraph;
        const sdksWithClients = uris.map((uri) => ({ client: getSdk(new GraphQLClient(uri)), uri }));
        const fallbackSubgraph = new FallbackSubgraph<Sdk>(
          logger,
          cId,
          sdksWithClients,
          _subgraphSyncBuffer ?? DEFAULT_SUBGRAPH_SYNC_BUFFER,
        );
        this.sdks[cId] = fallbackSubgraph;
        this.syncStatus[cId] = {
          latestBlock: 0,
          synced: true,
          syncedBlock: 0,
        };
        this.chainConfig[cId] = {
          subgraph,
          provider,
          subgraphSyncBuffer: _subgraphSyncBuffer ?? DEFAULT_SUBGRAPH_SYNC_BUFFER,
        };
      },
    );
    if (!skipPolling) {
      this.startPolling();
    }
  }

  public stopPolling(): void {
    if (this.pollingLoop != null) {
      clearInterval(this.pollingLoop);
      this.pollingLoop = undefined;
    }
  }

  public startPolling(): void {
    if (this.pollingLoop == null) {
      this.pollingLoop = setInterval(async () => {
        const { methodContext, requestContext } = createLoggingContext("pollingLoop");
        try {
          await this.getActiveTransactions();
        } catch (err) {
          this.logger.error("Error in subgraph loop", requestContext, methodContext, err);
        }
      }, this.pollInterval);
    }
  }

  getSyncStatus(chainId: number): SubgraphSyncRecord {
    const record = this.syncStatus[chainId];
    return (
      record ?? {
        synced: false,
        syncedBlock: 0,
        latestBlock: 0,
      }
    );
  }

  /**
   * Gets the transactions that the user may need to take action on, or is waiting for the router to take action on. Specifically,
   * transactions that have been prepared on the sending chain, but have yet to be fulfilled on the receiving chain, or have yet
   * to be cancelled on the sending chain
   *
   * @returns All active transactions for the instantiated user
   */
  async getActiveTransactions(_requestContext?: RequestContext): Promise<ActiveTransaction[]> {
    const { requestContext, methodContext } = createLoggingContext(this.getActiveTransactions.name, _requestContext);

    // Step 1: handle any already listed as active transactions.
    // This is important to make sure the events are properly emitted
    // when sdks remain online for the duration of the transaction.
    // i.e. consider the case the sender tx is fulfilled before the loop
    // begins again. then it would not be captured by the subgraph only
    // loop but would exist in the class memory

    // Get all ids organized in an object with keyed on their receiving chain id
    const idsBySendingChains: Record<string, string[]> = {};
    [...this.activeTxs.entries()].forEach(([id, tx]) => {
      if (!idsBySendingChains[tx.crosschainTx.invariant.sendingChainId]) {
        idsBySendingChains[tx.crosschainTx.invariant.sendingChainId] = [id];
      } else {
        idsBySendingChains[tx.crosschainTx.invariant.sendingChainId].push(id);
      }
    });

    // For each chain, update subgraph sync status
    await this.updateSyncStatus();
    

    // Gather matching sending-chain records from the subgraph that will *not*
    // be handled by step 2 (i.e. statuses are *not* prepared)
    const nonPreparedSendingTxs: any[] = [];
    const correspondingReceiverTxIdsByChain: Record<string, string[]> = {};
    await Promise.all(
      Object.keys(idsBySendingChains).map(async (sendingChainId) => {
        const chainId = parseInt(sendingChainId);
        const subgraph = this.sdks[chainId];
        if (!subgraph) {
          return;
        }
        const ids = idsBySendingChains[sendingChainId];
        if (ids.length === 0) {
          return;
        }

        const { transactions } = await subgraph.request<GetTransactionsQuery>((client) =>
          client.GetTransactions({ transactionIds: ids }),
        );
        if (transactions.length === 0) {
          return;
        }

        // Get transactions to add
        const toAdd = transactions.filter((x) => !!x && x.status !== TransactionStatus.Prepared);

        // Add results to sending tx array
        nonPreparedSendingTxs.push(...toAdd);
      }),
    );

    // Get corresponding receiver transaction records
    nonPreparedSendingTxs.forEach((transaction) => {
      if (!correspondingReceiverTxIdsByChain[transaction.receivingChainId]) {
        correspondingReceiverTxIdsByChain[transaction.receivingChainId] = [transaction.transactionId];
      } else {
        correspondingReceiverTxIdsByChain[transaction.receivingChainId].push(transaction.transactionId);
      }
    });

    const correspondingReceiverTxs: any[] = [];
    await Promise.all(
      Object.keys(correspondingReceiverTxIdsByChain).map(async (receivingChain) => {
        const subgraph = this.sdks[parseInt(receivingChain)];
        if (!subgraph) {
          return;
        }
        const ids = correspondingReceiverTxIdsByChain[receivingChain];
        if (ids.length === 0) {
          return;
        }
        const { transactions } = await subgraph.request<GetTransactionsQuery>((client) =>
          client.GetTransactions({ transactionIds: ids }),
        );
        if (transactions.length === 0) {
          return;
        }

        // Get transactions to add
        const toAdd = transactions.filter((x) => !!x);

        // Add results to sending tx array
        correspondingReceiverTxs.push(...toAdd);
      }),
    );

    // For all non-prepared sending transactions, post to the correct evt
    // and update the transaction map
    nonPreparedSendingTxs.map((transaction) => {
      const record = this.activeTxs.get(transaction.transactionId)!;
      const receivingMatches = correspondingReceiverTxs.filter((x) => x.transactionId === transaction.transactionId);
      if (receivingMatches.length > 1) {
        throw new Error("Duplicate transaction ids");
      }
      const [match] = receivingMatches;
      if (transaction.status === TransactionStatus.Cancelled) {
        // Remove from active transactions
        this.activeTxs.delete(transaction.transactionId);

        // Post data to evt
        const { invariant, sending } = record.crosschainTx;
        this.evts.SenderTransactionCancelled.post({
          txData: { ...invariant, ...sending },
          caller: transaction.cancelCaller,
          transactionHash: transaction.cancelTransactionHash,
        });
        return;
      }

      if (transaction.status === TransactionStatus.Fulfilled) {
        // Remove from active transactions
        this.activeTxs.delete(transaction.transactionId);

        // Find the matching receiver subgraph tx
        if (!match || match.status !== TransactionStatus.Fulfilled) {
          // This should never happen
          throw new Error("Sender fulfilled, no fulfilled receiver transaction");
        }

        // Post to receiver transaction fulfilled evt
        const { invariant, receiving } = record.crosschainTx;
        this.evts.ReceiverTransactionFulfilled.post({
          transactionHash: match.fulfillTranssactionHash,
          txData: {
            ...invariant,
            amount: receiving!.amount,
            expiry: receiving!.expiry,
            preparedBlockNumber: receiving!.preparedBlockNumber,
          },
          signature: match.signature,
          relayerFee: match.relayerFee,
          callData: match.callData,
          caller: match.fulfillCaller,
        });
      }
    });

    // Step 2: handle any not-listed active transactions (i.e. sdk has
    // gone offline at some point during the transactions)
    const errors: Map<string, Error> = new Map();
    const txs = await Promise.all(
      Object.keys(this.sdks).map(async (c) => {
        try {
          const user = (await this.user.getAddress()).toLowerCase();
          const chainId = parseInt(c);
          const subgraph = this.sdks[chainId];

          // get all sender prepared
          const { transactions: senderPrepared } = await subgraph.request<GetSenderTransactionsQuery>((client) =>
            client.GetSenderTransactions({
              sendingChainId: chainId,
              userId: user,
              status: TransactionStatus.Prepared,
            }),
          );

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
                return undefined;
              }
              const { transactions: correspondingReceiverTxs } = await _sdk.request<GetTransactionsQuery>((client) =>
                client.GetTransactions({
                  transactionIds: senderTxs.map((tx) => tx.transactionId),
                }),
              );

              const active = senderTxs.map((senderTx): ActiveTransaction | undefined => {
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
                    preparedTimestamp: senderTx.preparedTimestamp,
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
                    preparedTimestamp: senderTx.preparedTimestamp,
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
                    this.logger.warn("Missing active sender tx", requestContext, methodContext, {
                      transactionId: invariant.transactionId,
                      active: this.activeTxs.keys(),
                    });
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
                  if (!active || active.status !== SubgraphEvents.ReceiverTransactionFulfilled) {
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

                // Unrecognized corresponding status, likely an error with the
                // subgraph. Throw an error
                throw new InvalidTxStatus(
                  correspondingReceiverTx.transactionId,
                  correspondingReceiverTx.status,
                  correspondingReceiverTx,
                );
              });

              return active;
            }),
          );

          const activeFlattened = activeTxs.flat().filter((x) => !!x) as ActiveTransaction[];
          return activeFlattened;
        } catch (e) {
          errors.set(c, e);
          this.logger.error("Error getting active transactions", requestContext, methodContext, jsonifyError(e), {
            chainId: c,
          });
          return [];
        }
      }),
    );

    if (errors.size === Object.keys(this.sdks).length) {
      if (errors.size === 1) {
        // Just throw the first error in the Map if there's only one chain supported.
        throw errors.values().next().value;
      }
      throw new Error("Failed to get active transactions for all chains");
    }

    const all = txs.flat();
    if (all.length > 0) {
      this.logger.info("Queried active txs", requestContext, methodContext, {
        active: all.length,
      });
      this.logger.debug("Queried active txs", requestContext, methodContext, { all });
    }
    return all;
  }

  async getHistoricalTransactions(_requestContext?: RequestContext): Promise<HistoricalTransaction[]> {
    const { requestContext, methodContext } = createLoggingContext(
      this.getHistoricalTransactions.name,
      _requestContext,
    );

    // update subgraphs sync status
    await this.updateSyncStatus();

    const fulfilledTxs = await Promise.all(
      Object.keys(this.sdks).map(async (c) => {
        const user = (await this.user.getAddress()).toLowerCase();
        const chainId = parseInt(c);
        const subgraph = this.sdks[chainId];

        // get all receiver fulfilled
        const { transactions: receiverFulfilled } = await subgraph.request<GetReceiverTransactionsQuery>((client) =>
          client.GetReceiverTransactions({
            receivingChainId: chainId,
            userId: user,
            status: TransactionStatus.Fulfilled,
          }),
        );

        // for each, break up receiving txs by chain
        const receiverPerChain: Record<number, any[]> = {};
        receiverFulfilled.forEach((tx) => {
          if (!receiverPerChain[tx.sendingChainId]) {
            receiverPerChain[tx.sendingChainId] = [tx];
          } else {
            receiverPerChain[tx.sendingChainId].push(tx);
          }
        });

        const historicalTxs = await Promise.all(
          Object.entries(receiverPerChain).map(async ([chainId, receiverTxs]) => {
            const _sdk = this.sdks[parseInt(chainId)];
            if (!_sdk) {
              this.logger.warn("No SDK for chainId", requestContext, methodContext, { chainId });
              return undefined;
            }

            const { transactions: correspondingSenderTxs } = await _sdk.request<GetTransactionsQuery>((client) =>
              client.GetTransactions({
                transactionIds: receiverTxs.map((tx) => tx.transactionId),
              }),
            );

            return receiverTxs.map((receiverTx): HistoricalTransaction | undefined => {
              const correspondingSenderTx = correspondingSenderTxs.find(
                (tx) => tx.transactionId === receiverTx.transactionId,
              );
              if (!correspondingSenderTx) {
                this.logger.warn(
                  "No corresponding sender tx, this should never happen",
                  requestContext,
                  methodContext,
                  { receiverTx },
                );
                return undefined;
              }
              return {
                status: HistoricalTransactionStatus.FULFILLED,
                fulfilledTxHash: receiverTx.fulfillTransactionHash,
                preparedTimestamp: correspondingSenderTx.preparedTimestamp,
                crosschainTx: {
                  invariant: {
                    user,
                    router: receiverTx.router.id,
                    initiator: receiverTx.initiator,
                    sendingChainId: Number(receiverTx.sendingChainId),
                    sendingAssetId: receiverTx.sendingAssetId,
                    sendingChainFallback: receiverTx.sendingChainFallback,
                    receivingChainId: Number(receiverTx.receivingChainId),
                    receivingAssetId: receiverTx.receivingAssetId,
                    receivingAddress: receiverTx.receivingAddress,
                    callTo: receiverTx.callTo,
                    callDataHash: receiverTx.callDataHash,
                    transactionId: receiverTx.transactionId,
                    receivingChainTxManagerAddress: receiverTx.receivingChainTxManagerAddress,
                  },
                  sending: {
                    amount: correspondingSenderTx.amount,
                    expiry: Number(correspondingSenderTx.expiry),
                    preparedBlockNumber: Number(correspondingSenderTx.preparedBlockNumber),
                  },
                  receiving: {
                    amount: receiverTx.amount,
                    expiry: Number(receiverTx.expiry),
                    preparedBlockNumber: Number(receiverTx.preparedBlockNumber),
                  },
                },
              };
            });
          }),
        );
        return historicalTxs
          .filter((x) => !!x)
          .flat()
          .filter((x) => !!x) as HistoricalTransaction[];
      }),
    );

    const cancelledTxs = await Promise.all(
      Object.keys(this.sdks).map(async (c) => {
        const user = (await this.user.getAddress()).toLowerCase();
        const chainId = parseInt(c);
        const subgraph = this.sdks[chainId];

        // get all receiver fulfilled
        const { transactions: senderCancelled } = await subgraph.request<GetSenderTransactionsQuery>((client) =>
          client.GetSenderTransactions({
            sendingChainId: chainId,
            userId: user,
            status: TransactionStatus.Cancelled,
          }),
        );

        const cancelled = senderCancelled.map((tx): HistoricalTransaction | undefined => {
          return {
            status: HistoricalTransactionStatus.CANCELLED,
            preparedTimestamp: tx.preparedTimestamp,
            crosschainTx: {
              invariant: {
                user,
                initiator: tx.initiator,
                router: tx.router.id,
                sendingChainId: Number(tx.sendingChainId),
                sendingAssetId: tx.sendingAssetId,
                sendingChainFallback: tx.sendingChainFallback,
                receivingChainId: Number(tx.receivingChainId),
                receivingAssetId: tx.receivingAssetId,
                receivingAddress: tx.receivingAddress,
                callTo: tx.callTo,
                callDataHash: tx.callDataHash,
                transactionId: tx.transactionId,
                receivingChainTxManagerAddress: tx.receivingChainTxManagerAddress,
              },
              sending: {
                amount: tx.amount,
                expiry: Number(tx.expiry),
                preparedBlockNumber: Number(tx.preparedBlockNumber),
              },
            },
          };
        });

        return cancelled
          .filter((x) => !!x)
          .flat()
          .filter((x) => !!x) as HistoricalTransaction[];
      }),
    );

    return fulfilledTxs.flat().concat(cancelledTxs.flat());
  }

  /**
   * Update the sync statuses of subgraph providers for each chain.
   * This will enable FallbackSubgraph to use the most in-sync subgraph provider.
   */
  private async updateSyncStatus() {
    await Promise.all(
      Object.keys(this.sdks).map(async (_chainId) => {
        const chainId = parseInt(_chainId);
        const subgraph = this.sdks[chainId];
        const latestBlock = await this.chainConfig[chainId].provider.getBlockNumber();
        const records = await subgraph.sync(latestBlock);
        const mostSynced = records.sort((r) => r.latestBlock - r.syncedBlock)[0];
        this.syncStatus[chainId] = {
          latestBlock,
          syncedBlock: mostSynced.syncedBlock,
          synced: mostSynced.synced,
        };
      }),
    );
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
