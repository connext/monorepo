import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};




export type AssetBalance = {
  __typename?: 'AssetBalance';
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: Router;
  assetId: Scalars['Bytes'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  lockedIn: Scalars['BigInt'];
  volumeIn: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  volume: Scalars['BigInt'];
  sendingPrepareTxCount: Scalars['BigInt'];
  sendingFulfillTxCount: Scalars['BigInt'];
  sendingCancelTxCount: Scalars['BigInt'];
  receivingPrepareTxCount: Scalars['BigInt'];
  receivingFulfillTxCount: Scalars['BigInt'];
  receivingCancelTxCount: Scalars['BigInt'];
};

export type AssetBalance_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  amount?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  router?: Maybe<Scalars['String']>;
  router_not?: Maybe<Scalars['String']>;
  router_gt?: Maybe<Scalars['String']>;
  router_lt?: Maybe<Scalars['String']>;
  router_gte?: Maybe<Scalars['String']>;
  router_lte?: Maybe<Scalars['String']>;
  router_in?: Maybe<Array<Scalars['String']>>;
  router_not_in?: Maybe<Array<Scalars['String']>>;
  router_contains?: Maybe<Scalars['String']>;
  router_not_contains?: Maybe<Scalars['String']>;
  router_starts_with?: Maybe<Scalars['String']>;
  router_not_starts_with?: Maybe<Scalars['String']>;
  router_ends_with?: Maybe<Scalars['String']>;
  router_not_ends_with?: Maybe<Scalars['String']>;
  assetId?: Maybe<Scalars['Bytes']>;
  assetId_not?: Maybe<Scalars['Bytes']>;
  assetId_in?: Maybe<Array<Scalars['Bytes']>>;
  assetId_not_in?: Maybe<Array<Scalars['Bytes']>>;
  assetId_contains?: Maybe<Scalars['Bytes']>;
  assetId_not_contains?: Maybe<Scalars['Bytes']>;
  supplied?: Maybe<Scalars['BigInt']>;
  supplied_not?: Maybe<Scalars['BigInt']>;
  supplied_gt?: Maybe<Scalars['BigInt']>;
  supplied_lt?: Maybe<Scalars['BigInt']>;
  supplied_gte?: Maybe<Scalars['BigInt']>;
  supplied_lte?: Maybe<Scalars['BigInt']>;
  supplied_in?: Maybe<Array<Scalars['BigInt']>>;
  supplied_not_in?: Maybe<Array<Scalars['BigInt']>>;
  removed?: Maybe<Scalars['BigInt']>;
  removed_not?: Maybe<Scalars['BigInt']>;
  removed_gt?: Maybe<Scalars['BigInt']>;
  removed_lt?: Maybe<Scalars['BigInt']>;
  removed_gte?: Maybe<Scalars['BigInt']>;
  removed_lte?: Maybe<Scalars['BigInt']>;
  removed_in?: Maybe<Array<Scalars['BigInt']>>;
  removed_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lockedIn?: Maybe<Scalars['BigInt']>;
  lockedIn_not?: Maybe<Scalars['BigInt']>;
  lockedIn_gt?: Maybe<Scalars['BigInt']>;
  lockedIn_lt?: Maybe<Scalars['BigInt']>;
  lockedIn_gte?: Maybe<Scalars['BigInt']>;
  lockedIn_lte?: Maybe<Scalars['BigInt']>;
  lockedIn_in?: Maybe<Array<Scalars['BigInt']>>;
  lockedIn_not_in?: Maybe<Array<Scalars['BigInt']>>;
  volumeIn?: Maybe<Scalars['BigInt']>;
  volumeIn_not?: Maybe<Scalars['BigInt']>;
  volumeIn_gt?: Maybe<Scalars['BigInt']>;
  volumeIn_lt?: Maybe<Scalars['BigInt']>;
  volumeIn_gte?: Maybe<Scalars['BigInt']>;
  volumeIn_lte?: Maybe<Scalars['BigInt']>;
  volumeIn_in?: Maybe<Array<Scalars['BigInt']>>;
  volumeIn_not_in?: Maybe<Array<Scalars['BigInt']>>;
  locked?: Maybe<Scalars['BigInt']>;
  locked_not?: Maybe<Scalars['BigInt']>;
  locked_gt?: Maybe<Scalars['BigInt']>;
  locked_lt?: Maybe<Scalars['BigInt']>;
  locked_gte?: Maybe<Scalars['BigInt']>;
  locked_lte?: Maybe<Scalars['BigInt']>;
  locked_in?: Maybe<Array<Scalars['BigInt']>>;
  locked_not_in?: Maybe<Array<Scalars['BigInt']>>;
  volume?: Maybe<Scalars['BigInt']>;
  volume_not?: Maybe<Scalars['BigInt']>;
  volume_gt?: Maybe<Scalars['BigInt']>;
  volume_lt?: Maybe<Scalars['BigInt']>;
  volume_gte?: Maybe<Scalars['BigInt']>;
  volume_lte?: Maybe<Scalars['BigInt']>;
  volume_in?: Maybe<Array<Scalars['BigInt']>>;
  volume_not_in?: Maybe<Array<Scalars['BigInt']>>;
  sendingPrepareTxCount?: Maybe<Scalars['BigInt']>;
  sendingPrepareTxCount_not?: Maybe<Scalars['BigInt']>;
  sendingPrepareTxCount_gt?: Maybe<Scalars['BigInt']>;
  sendingPrepareTxCount_lt?: Maybe<Scalars['BigInt']>;
  sendingPrepareTxCount_gte?: Maybe<Scalars['BigInt']>;
  sendingPrepareTxCount_lte?: Maybe<Scalars['BigInt']>;
  sendingPrepareTxCount_in?: Maybe<Array<Scalars['BigInt']>>;
  sendingPrepareTxCount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  sendingFulfillTxCount?: Maybe<Scalars['BigInt']>;
  sendingFulfillTxCount_not?: Maybe<Scalars['BigInt']>;
  sendingFulfillTxCount_gt?: Maybe<Scalars['BigInt']>;
  sendingFulfillTxCount_lt?: Maybe<Scalars['BigInt']>;
  sendingFulfillTxCount_gte?: Maybe<Scalars['BigInt']>;
  sendingFulfillTxCount_lte?: Maybe<Scalars['BigInt']>;
  sendingFulfillTxCount_in?: Maybe<Array<Scalars['BigInt']>>;
  sendingFulfillTxCount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  sendingCancelTxCount?: Maybe<Scalars['BigInt']>;
  sendingCancelTxCount_not?: Maybe<Scalars['BigInt']>;
  sendingCancelTxCount_gt?: Maybe<Scalars['BigInt']>;
  sendingCancelTxCount_lt?: Maybe<Scalars['BigInt']>;
  sendingCancelTxCount_gte?: Maybe<Scalars['BigInt']>;
  sendingCancelTxCount_lte?: Maybe<Scalars['BigInt']>;
  sendingCancelTxCount_in?: Maybe<Array<Scalars['BigInt']>>;
  sendingCancelTxCount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  receivingPrepareTxCount?: Maybe<Scalars['BigInt']>;
  receivingPrepareTxCount_not?: Maybe<Scalars['BigInt']>;
  receivingPrepareTxCount_gt?: Maybe<Scalars['BigInt']>;
  receivingPrepareTxCount_lt?: Maybe<Scalars['BigInt']>;
  receivingPrepareTxCount_gte?: Maybe<Scalars['BigInt']>;
  receivingPrepareTxCount_lte?: Maybe<Scalars['BigInt']>;
  receivingPrepareTxCount_in?: Maybe<Array<Scalars['BigInt']>>;
  receivingPrepareTxCount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  receivingFulfillTxCount?: Maybe<Scalars['BigInt']>;
  receivingFulfillTxCount_not?: Maybe<Scalars['BigInt']>;
  receivingFulfillTxCount_gt?: Maybe<Scalars['BigInt']>;
  receivingFulfillTxCount_lt?: Maybe<Scalars['BigInt']>;
  receivingFulfillTxCount_gte?: Maybe<Scalars['BigInt']>;
  receivingFulfillTxCount_lte?: Maybe<Scalars['BigInt']>;
  receivingFulfillTxCount_in?: Maybe<Array<Scalars['BigInt']>>;
  receivingFulfillTxCount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  receivingCancelTxCount?: Maybe<Scalars['BigInt']>;
  receivingCancelTxCount_not?: Maybe<Scalars['BigInt']>;
  receivingCancelTxCount_gt?: Maybe<Scalars['BigInt']>;
  receivingCancelTxCount_lt?: Maybe<Scalars['BigInt']>;
  receivingCancelTxCount_gte?: Maybe<Scalars['BigInt']>;
  receivingCancelTxCount_lte?: Maybe<Scalars['BigInt']>;
  receivingCancelTxCount_in?: Maybe<Array<Scalars['BigInt']>>;
  receivingCancelTxCount_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum AssetBalance_OrderBy {
  Id = 'id',
  Amount = 'amount',
  Router = 'router',
  AssetId = 'assetId',
  Supplied = 'supplied',
  Removed = 'removed',
  LockedIn = 'lockedIn',
  VolumeIn = 'volumeIn',
  Locked = 'locked',
  Volume = 'volume',
  SendingPrepareTxCount = 'sendingPrepareTxCount',
  SendingFulfillTxCount = 'sendingFulfillTxCount',
  SendingCancelTxCount = 'sendingCancelTxCount',
  ReceivingPrepareTxCount = 'receivingPrepareTxCount',
  ReceivingFulfillTxCount = 'receivingFulfillTxCount',
  ReceivingCancelTxCount = 'receivingCancelTxCount'
}



export type Block_Height = {
  hash?: Maybe<Scalars['Bytes']>;
  number?: Maybe<Scalars['Int']>;
  number_gte?: Maybe<Scalars['Int']>;
};


export type DayMetric = {
  __typename?: 'DayMetric';
  id: Scalars['ID'];
  dayStartTimestamp: Scalars['BigInt'];
  assetId: Scalars['String'];
  volume: Scalars['BigInt'];
  relayerFee: Scalars['BigInt'];
  sendingTxCount: Scalars['BigInt'];
  receivingTxCount: Scalars['BigInt'];
  cancelTxCount: Scalars['BigInt'];
  volumeIn: Scalars['BigInt'];
};

export type DayMetric_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  dayStartTimestamp?: Maybe<Scalars['BigInt']>;
  dayStartTimestamp_not?: Maybe<Scalars['BigInt']>;
  dayStartTimestamp_gt?: Maybe<Scalars['BigInt']>;
  dayStartTimestamp_lt?: Maybe<Scalars['BigInt']>;
  dayStartTimestamp_gte?: Maybe<Scalars['BigInt']>;
  dayStartTimestamp_lte?: Maybe<Scalars['BigInt']>;
  dayStartTimestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  dayStartTimestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  assetId?: Maybe<Scalars['String']>;
  assetId_not?: Maybe<Scalars['String']>;
  assetId_gt?: Maybe<Scalars['String']>;
  assetId_lt?: Maybe<Scalars['String']>;
  assetId_gte?: Maybe<Scalars['String']>;
  assetId_lte?: Maybe<Scalars['String']>;
  assetId_in?: Maybe<Array<Scalars['String']>>;
  assetId_not_in?: Maybe<Array<Scalars['String']>>;
  assetId_contains?: Maybe<Scalars['String']>;
  assetId_not_contains?: Maybe<Scalars['String']>;
  assetId_starts_with?: Maybe<Scalars['String']>;
  assetId_not_starts_with?: Maybe<Scalars['String']>;
  assetId_ends_with?: Maybe<Scalars['String']>;
  assetId_not_ends_with?: Maybe<Scalars['String']>;
  volume?: Maybe<Scalars['BigInt']>;
  volume_not?: Maybe<Scalars['BigInt']>;
  volume_gt?: Maybe<Scalars['BigInt']>;
  volume_lt?: Maybe<Scalars['BigInt']>;
  volume_gte?: Maybe<Scalars['BigInt']>;
  volume_lte?: Maybe<Scalars['BigInt']>;
  volume_in?: Maybe<Array<Scalars['BigInt']>>;
  volume_not_in?: Maybe<Array<Scalars['BigInt']>>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  relayerFee_not?: Maybe<Scalars['BigInt']>;
  relayerFee_gt?: Maybe<Scalars['BigInt']>;
  relayerFee_lt?: Maybe<Scalars['BigInt']>;
  relayerFee_gte?: Maybe<Scalars['BigInt']>;
  relayerFee_lte?: Maybe<Scalars['BigInt']>;
  relayerFee_in?: Maybe<Array<Scalars['BigInt']>>;
  relayerFee_not_in?: Maybe<Array<Scalars['BigInt']>>;
  sendingTxCount?: Maybe<Scalars['BigInt']>;
  sendingTxCount_not?: Maybe<Scalars['BigInt']>;
  sendingTxCount_gt?: Maybe<Scalars['BigInt']>;
  sendingTxCount_lt?: Maybe<Scalars['BigInt']>;
  sendingTxCount_gte?: Maybe<Scalars['BigInt']>;
  sendingTxCount_lte?: Maybe<Scalars['BigInt']>;
  sendingTxCount_in?: Maybe<Array<Scalars['BigInt']>>;
  sendingTxCount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  receivingTxCount?: Maybe<Scalars['BigInt']>;
  receivingTxCount_not?: Maybe<Scalars['BigInt']>;
  receivingTxCount_gt?: Maybe<Scalars['BigInt']>;
  receivingTxCount_lt?: Maybe<Scalars['BigInt']>;
  receivingTxCount_gte?: Maybe<Scalars['BigInt']>;
  receivingTxCount_lte?: Maybe<Scalars['BigInt']>;
  receivingTxCount_in?: Maybe<Array<Scalars['BigInt']>>;
  receivingTxCount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  cancelTxCount?: Maybe<Scalars['BigInt']>;
  cancelTxCount_not?: Maybe<Scalars['BigInt']>;
  cancelTxCount_gt?: Maybe<Scalars['BigInt']>;
  cancelTxCount_lt?: Maybe<Scalars['BigInt']>;
  cancelTxCount_gte?: Maybe<Scalars['BigInt']>;
  cancelTxCount_lte?: Maybe<Scalars['BigInt']>;
  cancelTxCount_in?: Maybe<Array<Scalars['BigInt']>>;
  cancelTxCount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  volumeIn?: Maybe<Scalars['BigInt']>;
  volumeIn_not?: Maybe<Scalars['BigInt']>;
  volumeIn_gt?: Maybe<Scalars['BigInt']>;
  volumeIn_lt?: Maybe<Scalars['BigInt']>;
  volumeIn_gte?: Maybe<Scalars['BigInt']>;
  volumeIn_lte?: Maybe<Scalars['BigInt']>;
  volumeIn_in?: Maybe<Array<Scalars['BigInt']>>;
  volumeIn_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum DayMetric_OrderBy {
  Id = 'id',
  DayStartTimestamp = 'dayStartTimestamp',
  AssetId = 'assetId',
  Volume = 'volume',
  RelayerFee = 'relayerFee',
  SendingTxCount = 'sendingTxCount',
  ReceivingTxCount = 'receivingTxCount',
  CancelTxCount = 'cancelTxCount',
  VolumeIn = 'volumeIn'
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  assetBalance?: Maybe<AssetBalance>;
  assetBalances: Array<AssetBalance>;
  router?: Maybe<Router>;
  routers: Array<Router>;
  dayMetric?: Maybe<DayMetric>;
  dayMetrics: Array<DayMetric>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryAssetBalanceArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAssetBalancesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AssetBalance_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<AssetBalance_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRouterArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRoutersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Router_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Router_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDayMetricArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDayMetricsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<DayMetric_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<DayMetric_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_MetaArgs = {
  block?: Maybe<Block_Height>;
};

export type Router = {
  __typename?: 'Router';
  id: Scalars['ID'];
  assetBalances: Array<AssetBalance>;
};


export type RouterAssetBalancesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AssetBalance_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<AssetBalance_Filter>;
};

export type Router_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum Router_OrderBy {
  Id = 'id',
  AssetBalances = 'assetBalances'
}

export type Subscription = {
  __typename?: 'Subscription';
  assetBalance?: Maybe<AssetBalance>;
  assetBalances: Array<AssetBalance>;
  router?: Maybe<Router>;
  routers: Array<Router>;
  dayMetric?: Maybe<DayMetric>;
  dayMetrics: Array<DayMetric>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionAssetBalanceArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAssetBalancesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AssetBalance_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<AssetBalance_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRouterArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRoutersArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Router_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Router_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDayMetricArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDayMetricsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<DayMetric_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<DayMetric_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_MetaArgs = {
  block?: Maybe<Block_Height>;
};

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type GetExpressiveAssetBalancesQueryVariables = Exact<{
  routerId: Scalars['String'];
}>;


export type GetExpressiveAssetBalancesQuery = { __typename?: 'Query', assetBalances: Array<{ __typename?: 'AssetBalance', amount: any, assetId: any, locked: any, supplied: any, removed: any }> };

export type GetBlockNumberQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBlockNumberQuery = { __typename?: 'Query', _meta?: Maybe<{ __typename?: '_Meta_', block: { __typename?: '_Block_', number: number } }> };


export const GetExpressiveAssetBalancesDocument = gql`
    query GetExpressiveAssetBalances($routerId: String!) {
  assetBalances(where: {router: $routerId}) {
    amount
    assetId
    locked
    supplied
    removed
  }
}
    `;
export const GetBlockNumberDocument = gql`
    query GetBlockNumber {
  _meta {
    block {
      number
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetExpressiveAssetBalances(variables: GetExpressiveAssetBalancesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetExpressiveAssetBalancesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetExpressiveAssetBalancesQuery>(GetExpressiveAssetBalancesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetExpressiveAssetBalances');
    },
    GetBlockNumber(variables?: GetBlockNumberQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetBlockNumberQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetBlockNumberQuery>(GetBlockNumberDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetBlockNumber');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;