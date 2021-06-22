import { ApolloClient, InMemoryCache, gql, NormalizedCacheObject } from "@apollo/client";

export interface TransactionManagerListener {
  onSenderPrepare(handler: (data: SenderPrepareData) => void): void;
  onReceiverPrepare(handler: (data: ReceiverPrepareData) => void): void;
  onSenderFulfill(handler: (data: SenderFulfillData) => void): void;
  onReceiverFulfill(handler: (data: ReceiverFulfillData) => void): void;
}

// TODO: how to get types from subgraph?
export type SenderPrepareData = any;
export type ReceiverPrepareData = any;
export type SenderFulfillData = any;
export type ReceiverFulfillData = any;

export class SubgraphTransactionManagerListener implements TransactionManagerListener {
  private client: ApolloClient<NormalizedCacheObject>;
  constructor(subgraphUrl: string) {
    this.client = new ApolloClient({
      uri: subgraphUrl,
      cache: new InMemoryCache(),
    });
  }

  // handler methods need to listen to the subgraph and call handler on any new results that come in
  // we can do this either with Apollo refetching or subscriptions (but unknown if subgraphs support subscriptions)
  onSenderPrepare(handler: (data: SenderPrepareData) => void): void {
    throw new Error("Method not implemented.");
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
