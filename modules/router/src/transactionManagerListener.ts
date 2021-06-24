import { gql, GraphQLClient } from "graphql-request";
import { BaseLogger } from "pino";
import { Exact, GetPrepareTransactionsForRouterQuery, getSdk, TransactionStatus } from "./graphqlsdk";

export interface TransactionManagerListener {
  onSenderPrepare(handler: (data: SenderPrepareData) => any): Promise<void>;
  onReceiverPrepare(handler: (data: ReceiverPrepareData) => any): void;
  onSenderFulfill(handler: (data: SenderFulfillData) => any): void;
  onReceiverFulfill(handler: (data: ReceiverFulfillData) => any): void;
}

// TODO: how to get types from subgraph?
/// Liquidity events
// event LiquidityAdded(
//   address router,
//   address assetId,
//   uint256 amount
// );

// event LiquidityRemoved(
//   address router,
//   address assetId,
//   uint256 amount,
//   address recipient
// );

/// Transaction events
type InvariantTransactionData = {
  transactionId: string;
  user: string;
  router: string;
  sendingAssetId: string;
  receivingAssetId: string;
  sendingChainId: number;
  receivingChainId: number;
  callData: string;
}

// event TransactionPrepared(
//   InvariantTransactionData txData,
//   uint256 amount,
//   uint256 expiry,
//   uint256 blockNumber,
//   address caller
// );

export type SenderPrepareData = {
  transaction: {
    amount: string;
    expiry: number;
    blockNumber: number;
    caller: string;
    // receivingAddress: string;
    // status: TransactionStatus;
  } & InvariantTransactionData;
};

export type ReceiverPrepareData = {
  transaction: {
    amount: string;
    expiry: number;
    blockNumber: number;
    caller: string;
    // receivingAddress: string;
    // status: TransactionStatus;
  } & InvariantTransactionData;
};

// event TransactionFulfilled(
//   InvariantTransactionData txData,
//   uint256 amount,
//   uint256 expiry,
//   uint256 blockNumber,
//   uint256 relayerFee,
//   bytes signature,
//   address caller
// );

export type SenderFulfillData = {
  transaction: {
    amount: string;
    expiry: number;
    blockNumber: number;
    relayerFee: string;
    signature: string;
    caller: string;
    // receivingAddress: string;
    // status: TransactionStatus;
  } & InvariantTransactionData;
};

export type ReceiverFulfillData = {
  transaction: {
    amount: string;
    expiry: number;
    blockNumber: number;
    relayerFee: string;
    signature: string;
    caller: string;
    // receivingAddress: string;
    // status: TransactionStatus;
  } & InvariantTransactionData;
};

// event TransactionCancelled(
//   InvariantTransactionData txData,
//   uint256 amount,
//   uint256 expiry,
//   uint256 blockNumber,
//   address caller
// );

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
