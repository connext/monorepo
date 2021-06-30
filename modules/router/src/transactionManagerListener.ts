import { GraphQLClient } from "graphql-request";
import { BaseLogger } from "pino";
import { InvariantTransactionData } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import { getSdk, Sdk, TransactionStatus } from "./graphqlsdk";

export interface TransactionManagerListener {
  onSenderPrepare(handler: (data: SenderPrepareData) => any): Promise<void>;
  onReceiverPrepare(handler: (data: ReceiverPrepareData) => any): void;
  onSenderFulfill(handler: (data: SenderFulfillData) => any): void;
  onReceiverFulfill(handler: (data: ReceiverFulfillData) => any): void;
}

// TODO: is this the right type?
export type Transaction = SenderFulfillData;

// TODO: how to get types from subgraph?
export type SenderPrepareData = {
  amount: string;
  expiry: number;
  blockNumber: number;
  chainId: number;
  status: TransactionStatus;
  encodedBid: string;
  bidSignature: string;
} & InvariantTransactionData;

export type ReceiverPrepareData = SenderPrepareData;

export type SenderFulfillData = {
  status: TransactionStatus;
  amount: string;
  expiry: number;
  blockNumber: number;
  encodedBid: string;
  bidSignature: string;
  relayerFee: string;
  signature: string;
  receivingAddress: string;
  chainId: number;
} & InvariantTransactionData;

export type ReceiverFulfillData = SenderFulfillData;

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
  async onSenderPrepare(handler: (data: SenderPrepareData) => Promise<void>): Promise<void> {
    Object.keys(this.chainConfig).forEach(async cId => {
      const chainId = parseInt(cId);
      const sdk: Sdk = this.sdks[chainId];
      setInterval(async () => {
        const query = await sdk.GetSenderPrepareTransactions({
          routerId: this.routerAddress.toLowerCase(),
          sendingChainId: chainId,
        });

        this.logger.info({ transactions: query.transactions, chainId }, "Queried senderPrepare transactions");
        query.transactions.forEach(transaction => {
          const data: SenderPrepareData = {
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
          };

          // NOTE: this will call the handler every time the interval runs if the tx status is not changed
          // make sure handlers are idempotent
          handler(data);
        });
      }, this.pollInterval);
    });
  }

  onReceiverPrepare(handler: (data: ReceiverPrepareData) => void): void {
    Object.keys(this.chainConfig).forEach(async cId => {
      const chainId = parseInt(cId);
      const sdk: Sdk = this.sdks[chainId];
      setInterval(async () => {
        const query = await sdk.GetReceiverPrepareTransactions({
          routerId: this.routerAddress.toLowerCase(),
          receivingChainId: chainId,
        });

        this.logger.info({ transactions: query.transactions, chainId }, "Queried receiverPrepare transactions");
        query.transactions.forEach(transaction => {
          const data: ReceiverPrepareData = {
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
          };

          // NOTE: this will call the handler every time the interval runs if the tx status is not changed
          // make sure handlers are idempotent
          handler(data);
        });
      }, this.pollInterval);
    });
  }

  onReceiverFulfill(handler: (data: ReceiverFulfillData) => void): void {
    Object.keys(this.chainConfig).forEach(async cId => {
      const chainId = parseInt(cId);
      const sdk: Sdk = this.sdks[chainId];
      setInterval(async () => {
        const query = await sdk.GetReceiverFulfillTransactions({
          routerId: this.routerAddress.toLowerCase(),
          receivingChainId: chainId,
        });

        this.logger.info({ transactions: query.transactions, chainId }, "Queried receiverFulfill transactions");
        query.transactions.forEach(transaction => {
          const data: ReceiverFulfillData = {
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

          // NOTE: this will call the handler every time the interval runs if the tx status is not changed
          // make sure handlers are idempotent
          handler(data);
        });
      }, this.pollInterval);
    });
  }

  onSenderFulfill(handler: (data: SenderFulfillData) => void): void {
    Object.keys(this.chainConfig).forEach(async cId => {
      const chainId = parseInt(cId);
      const sdk: Sdk = this.sdks[chainId];
      setInterval(async () => {
        const query = await sdk.GetSenderFulfillTransactions({
          routerId: this.routerAddress.toLowerCase(),
          sendingChainId: chainId,
        });

        this.logger.info({ transactions: query.transactions, chainId }, "Queried senderFulfill transactions");
        query.transactions.forEach(transaction => {
          const data: SenderFulfillData = {
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
    return result.transactions.map(transaction => {
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
    return result.transactions.map(transaction => {
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
