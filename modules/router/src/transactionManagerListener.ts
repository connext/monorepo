import { gql, GraphQLClient } from "graphql-request";
import { BaseLogger } from "pino";
import { InvariantTransactionData } from "@connext/nxtp-utils";

import { Exact, GetPrepareTransactionsForRouterQuery, getSdk, TransactionStatus, Sdk } from "./graphqlsdk";

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

export type ReceiverPrepareData = {
  amount: string;
  expiry: number;
  blockNumber: number;
  caller: string;
  chainId: number;
} & InvariantTransactionData;

export type SenderFulfillData = {
  amount: string;
  expiry: number;
  blockNumber: number;
  relayerFee: string;
  signature: string;
  caller: string;
  chainId: number;
} & InvariantTransactionData;

export type ReceiverFulfillData = {
  amount: string;
  expiry: number;
  blockNumber: number;
  relayerFee: string;
  signature: string;
  caller: string;
  receivingAddress: string;
  chainId: number;
} & InvariantTransactionData;

const getSenderPrepareQuery = gql`
  query GetPrepareTransactionsForRouter($routerId: String!, $sendingChainId: Int!) {
    transactions(
      where: { router: $routerId, sendingChainId: $sendingChainId, chainId: $sendingChainId, status: Prepared }
    ) {
      id
      user {
        id
      }
      router {
        id
      }
      amount
      sendingAssetId
      receivingAssetId
      sendingChainId
      receivingChainId
      receivingAddress
      callData
      transactionId
      expiry
      status
      chainId
      blockNumber
    }
  }
`;

// imported

export class SubgraphTransactionManagerListener implements TransactionManagerListener {
  private sdks!: Record<number, Sdk>;
  private handled: Record<number, string[]> = {};

  constructor(
    private readonly chainConfig: { [chainId: number]: string },
    private readonly routerAddress: string,
    private readonly logger: BaseLogger,
    private readonly pollInterval = 15_000,
  ) {
    Object.entries(this.chainConfig).forEach(([chainId, subgraphUrl]) => {
      const client = new GraphQLClient(subgraphUrl);
      this.sdks[parseInt(chainId)] = getSdk(client);
      this.handled[parseInt(chainId)] = [];
    });
  }

  // handler methods need to listen to the subgraph and call handler on any new results that come in
  // we will need to keep track of which txs we have already handled and only call handlers on new results
  async onSenderPrepare(handler: (data: SenderPrepareData) => Promise<void>): Promise<void> {
    Object.keys(this.chainConfig).forEach(async chainId => {
      const sdk: Sdk = this.sdks[parseInt(chainId)];
      setInterval(async () => {
        const handledForChain = this.handled[parseInt(chainId)];
        const query = await sdk.GetPrepareTransactionsForRouter({
          routerId: this.routerAddress,
          sendingChainId: parseInt(chainId),
        });
        query.transactions.forEach(transaction => {
          // check if we have handled this txId yet
          if (!handledForChain.find(transaction.transactionId)) {
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
            handler(data);
          } else {
            this.logger.info({ transactionId: transaction.transactionId, chainId }, "Already handled transactionId");
          }
        });
      }, this.pollInterval);
    });
  }

  onReceiverPrepare(handler: (data: ReceiverPrepareData) => void): void {
    throw new Error("Method not implemented.");
  }

  onSenderFulfill(handler: (data: SenderFulfillData) => void): void {
    throw new Error("Method not implemented.");
  }

  onReceiverFulfill(handler: (data: ReceiverFulfillData) => void): void {
    throw new Error("Method not implemented.");
  }
}
