import { gql, GraphQLClient } from "graphql-request";
import { BaseLogger } from "pino";
import { InvariantTransactionData } from "@connext/nxtp-utils"

import { Exact, GetPrepareTransactionsForRouterQuery, getSdk, TransactionStatus } from "./graphqlsdk";

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
  caller: string;
  status: TransactionStatus;
} & InvariantTransactionData;

export type ReceiverPrepareData = {
  amount: string;
  expiry: number;
  blockNumber: number;
  caller: string;
  status: TransactionStatus;
} & InvariantTransactionData;

export type SenderFulfillData = {
  amount: string;
  expiry: number;
  blockNumber: number;
  relayerFee: string;
  signature: string;
  caller: string;
  status: TransactionStatus;
} & InvariantTransactionData;

export type ReceiverFulfillData = {
  amount: string;
  expiry: number;
  blockNumber: number;
  relayerFee: string;
  signature: string;
  caller: string;
  receivingAddress: string;
  status: TransactionStatus;
} & InvariantTransactionData;

const getSenderPrepareQuery = gql`
  query GetPrepareTransactionsForRouter($routerId: String!, $sendingChainId: Int!) {
    transactions(where: { router: $routerId, sendingChainId: $sendingChainId, chainId: $sendingChainId }) {
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
    }
  }
`;

// imported
type GraphQlSdk = {
  GetPrepareTransactionsForRouter(
    variables: Exact<{ routerId: string; sendingChainId: number }>,
    requestHeaders?: Headers | string[][] | Record<string, string>,
  ): Promise<GetPrepareTransactionsForRouterQuery>;
};

export class SubgraphTransactionManagerListener implements TransactionManagerListener {
  private sdks!: Record<number, GraphQlSdk>;

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
    Object.keys(this.chainConfig).forEach(async chainId => {
      const sdk: GraphQlSdk = this.sdks[chainId];
      setInterval(async () => {
        const query = await sdk.GetPrepareTransactionsForRouter({ routerId: this.routerAddress, sendingChainId: 5 });
        query.transactions.forEach(transaction => {
          const data: SenderPrepareData = {
            transaction: {
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
              status: transaction.status,
              transactionId: transaction.transactionId,
              user: transaction.user.id,
              blockNumber: 0, // TODO
            },
          };
          handler(data);
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
