import { ApolloClient, InMemoryCache, gql, NormalizedCacheObject } from "@apollo/client";

interface TransactionManager {
  onSenderPrepare(handler: () => void): void;
  onSenderPrepare(handler: () => void): void;
}

export class SubgraphTransactionManager implements TransactionManager {
  private client: ApolloClient<NormalizedCacheObject>;
  constructor(subgraphUrl: string) {
    this.client = new ApolloClient({
      uri: subgraphUrl,
      cache: new InMemoryCache(),
    });
  }
}
