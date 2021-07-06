import { GraphQLClient } from "graphql-request";
import { BaseLogger } from "pino";
import { TransactionData, TransactionFulfilledEvent, TransactionPreparedEvent } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";
import { v4 } from "uuid";

import { getSdk, Sdk, TransactionStatus } from "./graphqlsdk";

export interface TransactionManagerListener {
  onSenderPrepare(handler: (data: TransactionPreparedEvent) => any): Promise<void>;
  onReceiverPrepare(handler: (data: TransactionPreparedEvent) => any): void;
  onSenderFulfill(handler: (data: TransactionFulfilledEvent) => any): void;
  onReceiverFulfill(handler: (data: TransactionFulfilledEvent) => any): void;
}

// imported

export class SubgraphTransactionManagerListener implements TransactionManagerListener {
  private sdks: Record<number, Sdk> = {};

  constructor(
    private readonly chainConfig: { [chainId: number]: string },
    private readonly routerAddress: string,
    private readonly logger: BaseLogger,
    private readonly pollInterval = 15_000,
  ) {
    Object.entries(this.chainConfig).forEach(([chainId, subgraphUrl]) => {
      const client = new GraphQLClient(subgraphUrl);
      this.sdks[parseInt(chainId)] = getSdk(client);
    });
  }

  // handler methods need to listen to the subgraph and call handler on any new results that come in
  // we will need to keep track of which txs we have already handled and only call handlers on new results

  /**
   * onSenderPrepare
   * @param handler
   *
   * Queries subgraph to get prepared txs which have not been handled on the receiver side.
   */
  async onSenderPrepare(handler: (data: TransactionPreparedEvent) => Promise<void>): Promise<void> {
    const method = "onSenderPrepare";
    const methodId = v4();
    Object.keys(this.chainConfig).forEach(async (cId) => {
      const chainId = parseInt(cId);
      const sdk: Sdk = this.sdks[chainId];
      setInterval(async () => {
        const query = await sdk.GetSenderPrepareTransactions({
          routerId: this.routerAddress.toLowerCase(),
          sendingChainId: chainId,
        });

        this.logger.info(
          { method, methodId, transactions: query.router?.transactions, chainId },
          "Queried senderPrepare transactions",
        );
        query.router?.transactions.forEach(async (transaction) => {
          // Make sure we didnt *already* prepare receiver tx
          // NOTE: if subgraph is out of date here, worst case is that the tx is
          // reverted. this is fine.
          const receiverTransaction = await this.getTransactionForChain(
            transaction.transactionId,
            transaction.receivingChainId,
          );
          if (receiverTransaction) {
            this.logger.info({ method, methodId, receiverTransaction }, "Receiver transaction already prepared");
            return;
          }

          const data: TransactionPreparedEvent = {
            bidSignature: transaction.bidSignature,
            caller: transaction.prepareCaller,
            encodedBid: transaction.encodedBid,
            encryptedCallData: transaction.encryptedCallData,
            txData: {
              user: transaction.user.id,
              router: transaction.router.id,
              sendingAssetId: transaction.sendingAssetId,
              receivingAssetId: transaction.receivingAssetId,
              sendingChainFallback: transaction.sendingChainFallback,
              receivingAddress: transaction.receivingAddress,
              callDataHash: transaction.callDataHash,
              transactionId: transaction.transactionId,
              sendingChainId: transaction.sendingChainId,
              receivingChainId: transaction.receivingChainId,
              amount: transaction.amount,
              expiry: transaction.expiry,
              preparedBlockNumber: transaction.preparedBlockNumber,
            },
          };

          // NOTE: this will call the handler every time the interval runs if the tx status is not changed
          // make sure handlers are idempotent
          handler(data);
        });
      }, this.pollInterval);
    });
  }

  onReceiverPrepare(handler: (data: TransactionPreparedEvent) => void): void {
    Object.keys(this.chainConfig).forEach(async (cId) => {
      const chainId = parseInt(cId);
      const sdk: Sdk = this.sdks[chainId];
      setInterval(async () => {
        const query = await sdk.GetReceiverPrepareTransactions({
          routerId: this.routerAddress.toLowerCase(),
          receivingChainId: chainId,
        });

        this.logger.info({ transactions: query.router?.transactions, chainId }, "Queried receiverPrepare transactions");
        query.router?.transactions.forEach((transaction) => {
          const data: TransactionPreparedEvent = {
            txData: {
              user: transaction.user.id,
              router: transaction.router.id,
              sendingAssetId: transaction.sendingAssetId,
              receivingAssetId: transaction.receivingAssetId,
              sendingChainFallback: transaction.sendingChainFallback,
              receivingAddress: transaction.receivingAddress,
              callDataHash: transaction.callDataHash,
              transactionId: transaction.transactionId,
              sendingChainId: transaction.sendingChainId,
              receivingChainId: transaction.receivingChainId,
              amount: transaction.amount,
              expiry: transaction.expiry,
              preparedBlockNumber: transaction.preparedBlockNumber,
            },
            bidSignature: transaction.bidSignature,
            caller: transaction.prepareCaller,
            encodedBid: transaction.encodedBid,
            encryptedCallData: transaction.encryptedCallData,
          };

          // NOTE: this will call the handler every time the interval runs if the tx status is not changed
          // make sure handlers are idempotent
          handler(data);
        });
      }, this.pollInterval);
    });
  }

  onReceiverFulfill(handler: (data: TransactionFulfilledEvent) => void): void {
    Object.keys(this.chainConfig).forEach(async (cId) => {
      const chainId = parseInt(cId);
      const sdk: Sdk = this.sdks[chainId];
      setInterval(async () => {
        const query = await sdk.GetReceiverFulfillTransactions({
          routerId: this.routerAddress.toLowerCase(),
          receivingChainId: chainId,
        });

        this.logger.info({ transactions: query.router?.transactions, chainId }, "Queried receiverFulfill transactions");
        query.router?.transactions.forEach((transaction) => {
          const data: TransactionFulfilledEvent = {
            txData: {
              user: transaction.user.id,
              router: transaction.router.id,
              sendingAssetId: transaction.sendingAssetId,
              receivingAssetId: transaction.receivingAssetId,
              sendingChainFallback: transaction.sendingChainFallback,
              receivingAddress: transaction.receivingAddress,
              callDataHash: transaction.callDataHash,
              transactionId: transaction.transactionId,
              sendingChainId: transaction.sendingChainId,
              receivingChainId: transaction.receivingChainId,
              amount: transaction.amount,
              expiry: transaction.expiry,
              preparedBlockNumber: transaction.preparedBlockNumber,
            },
            signature: transaction.signature,
            relayerFee: transaction.relayerFee,
            callData: transaction.callData ?? "",
            caller: transaction.fulfillCaller,
          };

          // NOTE: this will call the handler every time the interval runs if the tx status is not changed
          // make sure handlers are idempotent
          handler(data);
        });
      }, this.pollInterval);
    });
  }

  onSenderFulfill(handler: (data: TransactionFulfilledEvent) => void): void {
    Object.keys(this.chainConfig).forEach(async (cId) => {
      const chainId = parseInt(cId);
      const sdk: Sdk = this.sdks[chainId];
      setInterval(async () => {
        const query = await sdk.GetSenderFulfillTransactions({
          routerId: this.routerAddress.toLowerCase(),
          sendingChainId: chainId,
        });

        this.logger.info({ transactions: query.router?.transactions, chainId }, "Queried senderFulfill transactions");
        query.router?.transactions.forEach((transaction) => {
          const data: TransactionFulfilledEvent = {
            txData: {
              user: transaction.user.id,
              router: transaction.router.id,
              sendingAssetId: transaction.sendingAssetId,
              receivingAssetId: transaction.receivingAssetId,
              sendingChainFallback: transaction.sendingChainFallback,
              receivingAddress: transaction.receivingAddress,
              callDataHash: transaction.callDataHash,
              transactionId: transaction.transactionId,
              sendingChainId: transaction.sendingChainId,
              receivingChainId: transaction.receivingChainId,
              amount: transaction.amount,
              expiry: transaction.expiry,
              preparedBlockNumber: transaction.preparedBlockNumber,
            },
            signature: transaction.signature,
            relayerFee: transaction.relayerFee,
            callData: transaction.callData ?? "",
            caller: transaction.fulfillCaller,
          };

          // NOTE: this will call the handler every time the interval runs if the tx status is not changed
          // make sure handlers are idempotent
          handler(data);
        });
      }, this.pollInterval);
    });
  }

  async getTransactionForChain(
    transactionId: string,
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
      transactionId: transactionId.toLowerCase(),
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
            receivingAddress: transaction.receivingAddress,
            callDataHash: transaction.callDataHash,
            transactionId: transaction.transactionId,
            sendingChainId: BigNumber.from(transaction.sendingChainId).toNumber(),
            receivingChainId: BigNumber.from(transaction.receivingChainId).toNumber(),
            amount: transaction.amount,
            expiry: transaction.expiry,
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
}
