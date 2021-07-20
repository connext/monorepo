import { GraphQLClient } from "graphql-request";
import { BaseLogger } from "pino";
import {
  TransactionCancelledEvent,
  TransactionData,
  TransactionFulfilledEvent,
  TransactionPreparedEvent,
} from "@connext/nxtp-utils";
import { BigNumber } from "ethers";
import hyperid from "hyperid";
import { Evt, VoidCtx, distinct } from "evt";

import { getSdk, Sdk, TransactionStatus } from "./graphqlsdk";

const hId = hyperid();

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
  ReceiverTransactionFulfilled: "ReceiverTransactionFulfilled",
  ReceiverTransactionCancelled: "ReceiverTransactionCancelled",
} as const;
export type SubgraphEvent = typeof SubgraphEvents[keyof typeof SubgraphEvents];

export type SenderTransactionPreparedPayload = {
  senderEvent: TransactionPreparedEvent;
};

export type ReceiverTransactionFulfilledPayload = {
  senderEvent: TransactionPreparedEvent;
  receiverEvent: TransactionFulfilledEvent;
};

export type ReceiverTransactionCancelledPayload = {
  senderEvent: TransactionPreparedEvent;
  receiverEvent: TransactionCancelledEvent;
};

export interface SubgraphEventPayloads {
  [SubgraphEvents.SenderTransactionPrepared]: SenderTransactionPreparedPayload;
  [SubgraphEvents.ReceiverTransactionFulfilled]: ReceiverTransactionFulfilledPayload;
  [SubgraphEvents.ReceiverTransactionCancelled]: ReceiverTransactionCancelledPayload;
}

export const createEvts = (): {
  [K in SubgraphEvent]: { evt: Evt<SubgraphEventPayloads[K]>; flushCxt: VoidCtx };
} => {
  return {
    [SubgraphEvents.SenderTransactionPrepared]: {
      evt: Evt.create<SenderTransactionPreparedPayload>(),
      flushCxt: Evt.newCtx(),
    },
    [SubgraphEvents.ReceiverTransactionFulfilled]: {
      evt: Evt.create<ReceiverTransactionFulfilledPayload>(),
      flushCxt: Evt.newCtx(),
    },
    [SubgraphEvents.ReceiverTransactionCancelled]: {
      evt: Evt.create<ReceiverTransactionCancelledPayload>(),
      flushCxt: Evt.newCtx(),
    },
  };
};

export class Subgraph {
  private sdks: Record<number, Sdk> = {};
  private evts = createEvts();

  constructor(
    private readonly chainConfig: Record<number, { subgraph: string }>,
    private readonly routerAddress: string,
    private readonly logger: BaseLogger,
    private readonly pollInterval = 15_000,
  ) {
    Object.entries(this.chainConfig).forEach(([chainId, { subgraph }]) => {
      const client = new GraphQLClient(subgraph);
      this.sdks[parseInt(chainId)] = getSdk(client);
    });

    this.subgraphLoop();
  }

  /**
   * Run a loop that queries the subgraph and gets the relevant transactions. There are three categories the router cares about:
   * SenderPrepared, ReceiverFulfilled, and ReceiverCancelled.
   *
   * SenderPrepared = sender transactions which have not been prepared on the receiver side (i.e. do not exist)
   * ReceiverFulfilled = receiver fulfilled transactions which have a corresponding sender transaction in Prepared status
   * ReceiverCancelled = receiver cancelled transactions which have a corresponding sender transaction in Prepared status
   */
  private subgraphLoop() {
    const method = "startLoop";
    const methodId = hId();
    Object.keys(this.chainConfig).forEach(async (cId) => {
      const chainId = parseInt(cId);
      const sdk: Sdk = this.sdks[chainId];
      let loopCt = 0;
      setInterval(async () => {
        // flush every 20 loop iterations
        if (loopCt === 20) {
          this.logger.info({ method, methodId }, "Flushing EVT contexts");
          // flush contexts
          Object.values(this.evts).forEach(({ flushCxt }) => {
            flushCxt.done();
          });
          loopCt = 0;
        }
        loopCt++;
        // get all sender prepared txs
        const allSenderPrepared = await sdk.GetSenderTransactions({
          routerId: this.routerAddress.toLowerCase(),
          sendingChainId: chainId,
          status: TransactionStatus.Prepared,
        });

        // create list of txIds for each receiving chain
        const receivingChains: Record<string, string[]> = {};
        allSenderPrepared.router?.transactions.forEach(({ transactionId, receivingChainId }) => {
          if (receivingChains[receivingChainId]) {
            receivingChains[receivingChainId].push(transactionId);
          } else {
            receivingChains[receivingChainId] = [transactionId];
          }
        });

        // get all existing txs corresponding to all the sender prepared txs by id
        const queries = await Promise.all(
          Object.entries(receivingChains).map(async ([cId, txIds]) => {
            const _sdk = this.sdks[Number(cId)];
            if (!_sdk) {
              this.logger.error({ chainId: cId, method, methodId }, "No config for chain, this should not happen");
              return [];
            }
            const query = await _sdk.GetTransactions({ transactionIds: txIds.map((t) => t.toLowerCase()) });
            return query.transactions;
          }),
        );
        const correspondingReceiverTxs = queries.flat();

        // foreach sender prepared check if corresponding receiver exists
        // if it does not, call the handleSenderPrepare handler
        // if it is fulfilled, call the handleReceiverFulfill handler
        // if it is cancelled, call the handlerReceiverCancel handler
        // TODO: refactor to Evts or better yet, a structure that can be idempotent by default

        allSenderPrepared.router?.transactions.forEach((senderTx) => {
          const corresponding = correspondingReceiverTxs.find(
            (receiverTx) => senderTx.transactionId === receiverTx.transactionId,
          );
          if (!corresponding) {
            // sender prepare
            this.evts.SenderTransactionPrepared.evt.post({
              senderEvent: {
                bidSignature: senderTx.bidSignature,
                caller: senderTx.prepareCaller,
                encodedBid: senderTx.encodedBid,
                encryptedCallData: senderTx.encryptedCallData,
                txData: convertTransactionToTxData(senderTx),
              },
            });
          } else if (corresponding.status === TransactionStatus.Fulfilled) {
            // receiver fulfilled
            this.evts.ReceiverTransactionFulfilled.evt.post({
              senderEvent: {
                bidSignature: senderTx.bidSignature,
                caller: senderTx.prepareCaller,
                encodedBid: senderTx.encodedBid,
                encryptedCallData: senderTx.encryptedCallData,
                txData: convertTransactionToTxData(senderTx),
              },
              receiverEvent: {
                signature: corresponding.signature,
                relayerFee: corresponding.relayerFee,
                callData: corresponding.callData ?? "0x",
                caller: corresponding.fulfillCaller,
                txData: convertTransactionToTxData(corresponding),
              },
            });
          } else if (corresponding.status === TransactionStatus.Cancelled) {
            this.evts.ReceiverTransactionCancelled.evt.post({
              senderEvent: {
                bidSignature: senderTx.bidSignature,
                caller: senderTx.prepareCaller,
                encodedBid: senderTx.encodedBid,
                encryptedCallData: senderTx.encryptedCallData,
                txData: convertTransactionToTxData(senderTx),
              },
              receiverEvent: {
                relayerFee: corresponding.relayerFee,
                caller: corresponding.cancelCaller,
                txData: convertTransactionToTxData(corresponding),
              },
            });
          }
        });
      }, this.pollInterval);
    });
  }

  async getTransactionForChain(
    transactionId: string,
    user: string,
    chainId: number,
  ): Promise<
    | {
        status: TransactionStatus;
        txData: TransactionData;
        encryptedCallData: string;
        encodedBid: string;
        bidSignature: string;
        signature?: string; // only there when fulfilled
        relayerFee?: string; // only there when fulfilled
      }
    | undefined
  > {
    const sdk: Sdk = this.sdks[chainId];
    const { transaction } = await sdk.GetTransaction({
      transactionId: transactionId.toLowerCase() + "-" + user.toLowerCase() + "-" + this.routerAddress.toLowerCase(),
    });
    return transaction
      ? {
          status: transaction.status,
          txData: {
            user: transaction.user.id,
            router: transaction.router.id,
            sendingAssetId: transaction.sendingAssetId,
            receivingAssetId: transaction.receivingAssetId,
            sendingChainFallback: transaction.sendingChainFallback,
            callTo: transaction.callTo,
            receivingAddress: transaction.receivingAddress,
            callDataHash: transaction.callDataHash,
            transactionId: transaction.transactionId,
            sendingChainId: BigNumber.from(transaction.sendingChainId).toNumber(),
            receivingChainId: BigNumber.from(transaction.receivingChainId).toNumber(),
            amount: transaction.amount,
            expiry: transaction.expiry.toString(),
            preparedBlockNumber: BigNumber.from(transaction.preparedBlockNumber).toNumber(),
          },
          encryptedCallData: transaction.encryptedCallData,
          encodedBid: transaction.encodedBid,
          bidSignature: transaction.bidSignature,
          signature: transaction.signature,
          relayerFee: transaction.relayerFee,
        }
      : undefined;
  }

  async getAssetBalance(assetId: string, chainId: number): Promise<BigNumber | undefined> {
    const sdk: Sdk = this.sdks[chainId];
    const assetBalanceId = `${assetId.toLowerCase()}-${this.routerAddress.toLowerCase()}`;
    const res = await sdk.GetAssetBalance({ assetBalanceId });
    return res.assetBalance?.amount ? BigNumber.from(res.assetBalance?.amount) : undefined;
  }

  // Listener methods
  public attach<T extends SubgraphEvent>(
    event: T,
    callback: (data: SubgraphEventPayloads[T]) => void,
    filter: (data: SubgraphEventPayloads[T]) => boolean = (_data: SubgraphEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x);
    this.evts[event].evt
      .pipe(filter)
      .pipe(distinct((data) => data.senderEvent.txData.transactionId, this.evts[event].flushCxt))
      .attach(...(args as [number, any]));
  }

  public attachOnce<T extends SubgraphEvent>(
    event: T,
    callback: (data: SubgraphEventPayloads[T]) => void,
    filter: (data: SubgraphEventPayloads[T]) => boolean = (_data: SubgraphEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x);
    this.evts[event].evt.pipe(filter).attachOnce(...(args as [number, any]));
  }

  public detach<T extends SubgraphEvent>(event?: T): void {
    if (event) {
      this.evts[event].evt.detach();
      return;
    }
    Object.values(this.evts).forEach((evt) => evt.evt.detach());
  }

  public waitFor<T extends SubgraphEvent>(
    event: T,
    timeout: number,
    filter: (data: SubgraphEventPayloads[T]) => boolean = (_data: SubgraphEventPayloads[T]) => true,
  ): Promise<SubgraphEventPayloads[T]> {
    return this.evts[event].evt.pipe(filter).waitFor(timeout) as Promise<SubgraphEventPayloads[T]>;
  }
}
