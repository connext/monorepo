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

export class Subgraph {
  private sdks: Record<number, Sdk> = {};
  private senderPrepareHandler: (data: TransactionPreparedEvent) => Promise<void> = async () => {};
  private receiverFulfillHandler: (
    senderEvent: TransactionPreparedEvent,
    receiverEvent: TransactionFulfilledEvent,
  ) => Promise<void> = async () => {};
  private receiverCancelHandler: (
    senderEvent: TransactionPreparedEvent,
    receiverEvent: TransactionCancelledEvent,
  ) => Promise<void> = async () => {};

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
      setInterval(async () => {
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
            this.senderPrepareHandler({
              bidSignature: senderTx.bidSignature,
              caller: senderTx.prepareCaller,
              encodedBid: senderTx.encodedBid,
              encryptedCallData: senderTx.encryptedCallData,
              txData: convertTransactionToTxData(senderTx),
            });
          } else if (corresponding.status === TransactionStatus.Fulfilled) {
            // receiver fulfilled
            this.receiverFulfillHandler(
              {
                bidSignature: senderTx.bidSignature,
                caller: senderTx.prepareCaller,
                encodedBid: senderTx.encodedBid,
                encryptedCallData: senderTx.encryptedCallData,
                txData: convertTransactionToTxData(senderTx),
              },
              {
                signature: corresponding.signature,
                relayerFee: corresponding.relayerFee,
                callData: corresponding.callData ?? "0x",
                caller: corresponding.fulfillCaller,
                txData: convertTransactionToTxData(corresponding),
              },
            );
          } else if (corresponding.status === TransactionStatus.Cancelled) {
            this.receiverCancelHandler(
              {
                bidSignature: senderTx.bidSignature,
                caller: senderTx.prepareCaller,
                encodedBid: senderTx.encodedBid,
                encryptedCallData: senderTx.encryptedCallData,
                txData: convertTransactionToTxData(senderTx),
              },
              {
                relayerFee: corresponding.relayerFee,
                caller: corresponding.cancelCaller,
                txData: convertTransactionToTxData(corresponding),
              },
            );
          }
        });
      }, this.pollInterval);
    });
  }

  onSenderPrepare(handler: (data: TransactionPreparedEvent) => Promise<void>): void {
    this.senderPrepareHandler = handler;
  }

  onReceiverFulfill(
    handler: (senderEvent: TransactionPreparedEvent, receiverEvent: TransactionFulfilledEvent) => Promise<void>,
  ): void {
    this.receiverFulfillHandler = handler;
  }

  onReceiverCancel(
    handler: (senderEvent: TransactionPreparedEvent, receiverEvent: TransactionCancelledEvent) => Promise<void>,
  ): void {
    this.receiverCancelHandler = handler;
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
}
