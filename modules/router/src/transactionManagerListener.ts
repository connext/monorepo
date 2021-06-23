import { gql, GraphQLClient } from "graphql-request";
import { Exact, GetPrepareTransactionsForRouterQuery, getSdk, TransactionStatus } from "./graphqlsdk";

export interface TransactionManagerListener {
  onSenderPrepare(handler: (data: SenderPrepareData) => any): Promise<void>;
  onReceiverPrepare(handler: (data: ReceiverPrepareData) => any): void;
  onSenderFulfill(handler: (data: SenderFulfillData) => any): void;
  onReceiverFulfill(handler: (data: ReceiverFulfillData) => any): void;
}

// TODO: how to get types from subgraph?
export type SenderPrepareData = {
  transaction: {
    transactionId: string;
    user: string;
    router: string;
    amount: string;
    sendingAssetId: string;
    receivingAssetId: string;
    sendingChainId: number;
    receivingChainId: number;
    receivingAddress: string;
    callData: string;
    expiry: number;
    status: TransactionStatus;
    chainId: number;
  };
};
export type ReceiverPrepareData = any;
export type SenderFulfillData = any;
export type ReceiverFulfillData = any;

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

export class SubgraphTransactionManagerListener implements TransactionManagerListener {
  private sdk: {
    GetPrepareTransactionsForRouter(
      variables: Exact<{ routerId: string; sendingChainId: number }>,
      requestHeaders?: Headers | string[][] | Record<string, string>,
    ): Promise<GetPrepareTransactionsForRouterQuery>;
  };

  constructor(subgraphUrl: string, private readonly routerAddress: string) {
    const client = new GraphQLClient(subgraphUrl);
    this.sdk = getSdk(client);
  }

  // handler methods need to listen to the subgraph and call handler on any new results that come in
  // we can do this either with Apollo refetching or subscriptions (but unknown if subgraphs support subscriptions)
  async onSenderPrepare(handler: (data: SenderPrepareData) => Promise<void>): Promise<void> {
    const query = await this.sdk.GetPrepareTransactionsForRouter({ routerId: this.routerAddress, sendingChainId: 5 });
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
        },
      };
      handler(data);
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
