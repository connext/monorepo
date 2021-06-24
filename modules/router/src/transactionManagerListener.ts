import { GraphQLClient } from "graphql-request";
import { BaseLogger } from "pino";
import { InvariantTransactionData } from "@connext/nxtp-utils";

import { getSdk, Sdk } from "./graphqlsdk";

export interface TransactionManagerListener {
  onSenderPrepare(handler: (data: SenderPrepareData) => any): Promise<void>;
  onReceiverPrepare(handler: (data: ReceiverPrepareData) => any): void;
  onSenderFulfill(handler: (data: SenderFulfillData) => any): void;
  onReceiverFulfill(handler: (data: ReceiverFulfillData) => any): void;
}

// TODO: how to get types from subgraph?
export type SenderPrepareData = {
  amount: string;
  expiry: number;
  blockNumber: number;
  chainId: number;
} & InvariantTransactionData;

export type ReceiverPrepareData = SenderPrepareData;

export type SenderFulfillData = {
  amount: string;
  expiry: number;
  blockNumber: number;
  relayerFee: string;
  signature: string;
  receivingAddress: string;
  chainId: number;
} & InvariantTransactionData;

export type ReceiverFulfillData = SenderFulfillData;

// imported

export class SubgraphTransactionManagerListener implements TransactionManagerListener {
  private sdks!: Record<number, Sdk>;

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
          routerId: this.routerAddress,
          sendingChainId: chainId,
        });

        this.logger.info({ transactions: query.transactions }, "Queried senderPrepare transactions");
        query.transactions.forEach(transaction => {
          const data: SenderPrepareData = {
            amount: transaction.amount,
            callData: transaction.callData,
            chainId: transaction.chainId,
            expiry: transaction.expiry,
            receivingAddress: transaction.receivingAddress,
            receivingAssetId: transaction.receivingAssetId,
            receivingChainId: transaction.receivingChainId,
            router: transaction.router.id,
            sendingAssetId: transaction.sendingAssetId,
            sendingChainId: transaction.sendingChainId,
            transactionId: transaction.transactionId,
            user: transaction.user.id,
            blockNumber: transaction.blockNumber,
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
          routerId: this.routerAddress,
          receivingChainId: chainId,
        });

        this.logger.info({ transactions: query.transactions }, "Queried receiverPrepare transactions");
        query.transactions.forEach(transaction => {
          const data: SenderPrepareData = {
            amount: transaction.amount,
            callData: transaction.callData,
            chainId: transaction.chainId,
            expiry: transaction.expiry,
            receivingAddress: transaction.receivingAddress,
            receivingAssetId: transaction.receivingAssetId,
            receivingChainId: transaction.receivingChainId,
            router: transaction.router.id,
            sendingAssetId: transaction.sendingAssetId,
            sendingChainId: transaction.sendingChainId,
            transactionId: transaction.transactionId,
            user: transaction.user.id,
            blockNumber: transaction.blockNumber,
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
          routerId: this.routerAddress,
          receivingChainId: chainId,
        });

        this.logger.info({ transactions: query.transactions }, "Queried receiverFulfill transactions");
        query.transactions.forEach(transaction => {
          const data: ReceiverFulfillData = {
            amount: transaction.amount,
            callData: transaction.callData,
            chainId: transaction.chainId,
            expiry: transaction.expiry,
            receivingAddress: transaction.receivingAddress,
            receivingAssetId: transaction.receivingAssetId,
            receivingChainId: transaction.receivingChainId,
            router: transaction.router.id,
            sendingAssetId: transaction.sendingAssetId,
            sendingChainId: transaction.sendingChainId,
            transactionId: transaction.transactionId,
            user: transaction.user.id,
            blockNumber: transaction.blockNumber,
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
          routerId: this.routerAddress,
          sendingChainId: chainId,
        });

        this.logger.info({ transactions: query.transactions }, "Queried senderFulfill transactions");
        query.transactions.forEach(transaction => {
          const data: ReceiverFulfillData = {
            amount: transaction.amount,
            callData: transaction.callData,
            chainId: transaction.chainId,
            expiry: transaction.expiry,
            receivingAddress: transaction.receivingAddress,
            receivingAssetId: transaction.receivingAssetId,
            receivingChainId: transaction.receivingChainId,
            router: transaction.router.id,
            sendingAssetId: transaction.sendingAssetId,
            sendingChainId: transaction.sendingChainId,
            transactionId: transaction.transactionId,
            user: transaction.user.id,
            blockNumber: transaction.blockNumber,
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
}
