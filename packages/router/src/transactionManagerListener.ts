import { GraphQLClient } from "graphql-request";
import { BaseLogger } from "pino";
import { TransactionFulfilledEvent, TransactionPreparedEvent } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";
import { v4 } from "uuid";

import { getSdk, Sdk } from "./graphqlsdk";

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
          { method, methodId, transactions: query.transactions, chainId },
          "Queried senderPrepare transactions",
        );
        query.transactions.forEach(async (transaction) => {
          // Make sure we didnt *already* prepare receiver tx
          // NOTE: if subgraph is out of date here, worst case is that the tx is
          // reverted. this is fine.
          const receiverTransaction = await this.getReceiverTransaction(
            transaction.transactionId,
            transaction.receivingChainId,
          );
          if (receiverTransaction) {
            this.logger.info({ method, methodId, receiverTransaction }, "Receiver transaction already prepared");
            return;
          }

          const data: TransactionPreparedEvent = {
            bidSignature: transaction.bidSignature,
            caller: transaction.caller,
            encodedBid: transaction.encodedBid,
            encryptedCallData: transaction.encryptedCallData,
            txData: {
              user: transaction.user,
              router: transaction.router,
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

        this.logger.info({ transactions: query.transactions, chainId }, "Queried receiverPrepare transactions");
        query.transactions.forEach((transaction) => {
          const data: TransactionPreparedEvent = {
            txData: {
              user: transaction.user,
              router: transaction.router,
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
            caller: transaction.caller,
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

        this.logger.info({ transactions: query.transactions, chainId }, "Queried receiverFulfill transactions");
        query.transactions.forEach((transaction) => {
          const data: TransactionFulfilledEvent = {
            txData: {
              user: transaction.user,
              router: transaction.router,
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
            caller: transaction.caller,
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

        this.logger.info({ transactions: query.transactions, chainId }, "Queried senderFulfill transactions");
        query.transactions.forEach((transaction) => {
          const data: TransactionFulfilledEvent = {
            txData: {
              user: transaction.user,
              router: transaction.router,
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
            caller: transaction.caller,
          };

          // NOTE: this will call the handler every time the interval runs if the tx status is not changed
          // make sure handlers are idempotent
          handler(data);
        });
      }, this.pollInterval);
    });
  }

  async getSenderTransaction(transactionId: string, sendingChainId: number): Promise<Transaction | undefined> {
    const sdk: Sdk = this.sdks[sendingChainId];
    const result = await sdk.GetSenderTransaction({
      transactionId: transactionId.toLowerCase(),
      sendingChainId,
    });
    return result.transactions.map((transaction) => {
      return {
        status: transaction.status,
        amount: transaction.amount,
        callData: transaction.callData,
        chainId: BigNumber.from(transaction.chainId).toNumber(),
        expiry: transaction.expiry,
        receivingAddress: transaction.receivingAddress,
        receivingAssetId: transaction.receivingAssetId,
        receivingChainId: BigNumber.from(transaction.receivingChainId).toNumber(),
        router: transaction.router.id,
        sendingAssetId: transaction.sendingAssetId,
        sendingChainId: BigNumber.from(transaction.sendingChainId).toNumber(),
        transactionId: transaction.transactionId,
        user: transaction.user.id,
        blockNumber: BigNumber.from(transaction.blockNumber).toNumber(),
        encodedBid: transaction.encodedBid,
        bidSignature: transaction.bidSignature,
        relayerFee: transaction.relayerFee,
        signature: transaction.signature,
      };
    })[0];
  }

  async getReceiverTransaction(transactionId: string, receivingChainId: number): Promise<Transaction | undefined> {
    const sdk: Sdk = this.sdks[receivingChainId];
    const result = await sdk.GetReceiverTransaction({
      transactionId: transactionId.toLowerCase(),
      receivingChainId,
    });
    return result.transactions.map((transaction) => {
      return {
        status: transaction.status,
        amount: transaction.amount,
        callData: transaction.callData,
        chainId: BigNumber.from(transaction.chainId).toNumber(),
        expiry: transaction.expiry,
        receivingAddress: transaction.receivingAddress,
        receivingAssetId: transaction.receivingAssetId,
        receivingChainId: BigNumber.from(transaction.receivingChainId).toNumber(),
        router: transaction.router.id,
        sendingAssetId: transaction.sendingAssetId,
        sendingChainId: BigNumber.from(transaction.sendingChainId).toNumber(),
        transactionId: transaction.transactionId,
        user: transaction.user.id,
        blockNumber: BigNumber.from(transaction.blockNumber).toNumber(),
        encodedBid: transaction.encodedBid,
        bidSignature: transaction.bidSignature,
        relayerFee: transaction.relayerFee,
        signature: transaction.signature,
      };
    })[0];
  }
}
