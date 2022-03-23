import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  amount: Scalars['BigInt'];
  assetId: Scalars['Bytes'];
  canonicalId: Scalars['Bytes'];
  id: Scalars['ID'];
  local: Scalars['Bytes'];
  router: Router;
};

export type AssetBalance_Filter = {
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetId?: InputMaybe<Scalars['Bytes']>;
  assetId_contains?: InputMaybe<Scalars['Bytes']>;
  assetId_in?: InputMaybe<Array<Scalars['Bytes']>>;
  assetId_not?: InputMaybe<Scalars['Bytes']>;
  assetId_not_contains?: InputMaybe<Scalars['Bytes']>;
  assetId_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  canonicalId?: InputMaybe<Scalars['Bytes']>;
  canonicalId_contains?: InputMaybe<Scalars['Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['Bytes']>>;
  canonicalId_not?: InputMaybe<Scalars['Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['Bytes']>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  local?: InputMaybe<Scalars['Bytes']>;
  local_contains?: InputMaybe<Scalars['Bytes']>;
  local_in?: InputMaybe<Array<Scalars['Bytes']>>;
  local_not?: InputMaybe<Scalars['Bytes']>;
  local_not_contains?: InputMaybe<Scalars['Bytes']>;
  local_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  router?: InputMaybe<Scalars['String']>;
  router_contains?: InputMaybe<Scalars['String']>;
  router_contains_nocase?: InputMaybe<Scalars['String']>;
  router_ends_with?: InputMaybe<Scalars['String']>;
  router_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_gt?: InputMaybe<Scalars['String']>;
  router_gte?: InputMaybe<Scalars['String']>;
  router_in?: InputMaybe<Array<Scalars['String']>>;
  router_lt?: InputMaybe<Scalars['String']>;
  router_lte?: InputMaybe<Scalars['String']>;
  router_not?: InputMaybe<Scalars['String']>;
  router_not_contains?: InputMaybe<Scalars['String']>;
  router_not_contains_nocase?: InputMaybe<Scalars['String']>;
  router_not_ends_with?: InputMaybe<Scalars['String']>;
  router_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_in?: InputMaybe<Array<Scalars['String']>>;
  router_not_starts_with?: InputMaybe<Scalars['String']>;
  router_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_starts_with?: InputMaybe<Scalars['String']>;
  router_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum AssetBalance_OrderBy {
  Amount = 'amount',
  AssetId = 'assetId',
  CanonicalId = 'canonicalId',
  Id = 'id',
  Local = 'local',
  Router = 'router'
}

/** The block at which the query should be executed. */
export type Block_Height = {
  /** Value containing a block hash */
  hash?: InputMaybe<Scalars['Bytes']>;
  /** Value containing a block number */
  number?: InputMaybe<Scalars['Int']>;
  /**
   * Value containing the minimum block number.
   * In the case of `number_gte`, the query will be executed on the latest block only if
   * the subgraph has progressed to or past the minimum block number.
   * Defaults to the latest block when omitted.
   *
   */
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  assetBalance?: Maybe<AssetBalance>;
  assetBalances: Array<AssetBalance>;
  router?: Maybe<Router>;
  routers: Array<Router>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryAssetBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAssetBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AssetBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AssetBalance_Filter>;
};


export type QueryRouterArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRoutersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Router_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Router_Filter>;
};


export type QueryTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transfer_Filter>;
};

export type Router = {
  __typename?: 'Router';
  assetBalances: Array<AssetBalance>;
  id: Scalars['ID'];
  transfers: Array<Transfer>;
};


export type RouterAssetBalancesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AssetBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetBalance_Filter>;
};


export type RouterTransfersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Transfer_Filter>;
};

export type Router_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum Router_OrderBy {
  AssetBalances = 'assetBalances',
  Id = 'id',
  Transfers = 'transfers'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  assetBalance?: Maybe<AssetBalance>;
  assetBalances: Array<AssetBalance>;
  router?: Maybe<Router>;
  routers: Array<Router>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAssetBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAssetBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AssetBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AssetBalance_Filter>;
};


export type SubscriptionRouterArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRoutersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Router_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Router_Filter>;
};


export type SubscriptionTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transfer_Filter>;
};

export type Transfer = {
  __typename?: 'Transfer';
  callData: Scalars['Bytes'];
  callTo: Scalars['Bytes'];
  chainId: Scalars['BigInt'];
  destinationDomain: Scalars['BigInt'];
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['Bytes']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedLocalAmount?: Maybe<Scalars['BigInt']>;
  executedLocalAsset?: Maybe<Scalars['Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedTransactionHash?: Maybe<Scalars['Bytes']>;
  executedTransferringAmount?: Maybe<Scalars['BigInt']>;
  executedTransferringAsset?: Maybe<Scalars['Bytes']>;
  id: Scalars['ID'];
  idx?: Maybe<Scalars['BigInt']>;
  nonce?: Maybe<Scalars['BigInt']>;
  originDomain: Scalars['BigInt'];
  router?: Maybe<Router>;
  status: TransferStatus;
  to: Scalars['Bytes'];
  transferId: Scalars['Bytes'];
  xcalledBlockNumber?: Maybe<Scalars['BigInt']>;
  xcalledCaller?: Maybe<Scalars['Bytes']>;
  xcalledGasLimit?: Maybe<Scalars['BigInt']>;
  xcalledGasPrice?: Maybe<Scalars['BigInt']>;
  xcalledLocalAmount?: Maybe<Scalars['BigInt']>;
  xcalledLocalAsset?: Maybe<Scalars['Bytes']>;
  xcalledTimestamp?: Maybe<Scalars['BigInt']>;
  xcalledTransactionHash?: Maybe<Scalars['Bytes']>;
  xcalledTransferringAmount?: Maybe<Scalars['BigInt']>;
  xcalledTransferringAsset?: Maybe<Scalars['Bytes']>;
};

export enum TransferStatus {
  Executed = 'Executed',
  Reconciled = 'Reconciled',
  XCalled = 'XCalled'
}

export type Transfer_Filter = {
  callData?: InputMaybe<Scalars['Bytes']>;
  callData_contains?: InputMaybe<Scalars['Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['Bytes']>>;
  callData_not?: InputMaybe<Scalars['Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['Bytes']>;
  callData_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  callTo?: InputMaybe<Scalars['Bytes']>;
  callTo_contains?: InputMaybe<Scalars['Bytes']>;
  callTo_in?: InputMaybe<Array<Scalars['Bytes']>>;
  callTo_not?: InputMaybe<Scalars['Bytes']>;
  callTo_not_contains?: InputMaybe<Scalars['Bytes']>;
  callTo_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['Bytes']>;
  executedCaller_contains?: InputMaybe<Scalars['Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['Bytes']>>;
  executedCaller_not?: InputMaybe<Scalars['Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['Bytes']>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  executedGasLimit?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedLocalAmount?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedLocalAsset?: InputMaybe<Scalars['Bytes']>;
  executedLocalAsset_contains?: InputMaybe<Scalars['Bytes']>;
  executedLocalAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  executedLocalAsset_not?: InputMaybe<Scalars['Bytes']>;
  executedLocalAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
  executedLocalAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  executedTimestamp?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTransactionHash?: InputMaybe<Scalars['Bytes']>;
  executedTransactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  executedTransactionHash_not?: InputMaybe<Scalars['Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  executedTransferringAmount?: InputMaybe<Scalars['BigInt']>;
  executedTransferringAmount_gt?: InputMaybe<Scalars['BigInt']>;
  executedTransferringAmount_gte?: InputMaybe<Scalars['BigInt']>;
  executedTransferringAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTransferringAmount_lt?: InputMaybe<Scalars['BigInt']>;
  executedTransferringAmount_lte?: InputMaybe<Scalars['BigInt']>;
  executedTransferringAmount_not?: InputMaybe<Scalars['BigInt']>;
  executedTransferringAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTransferringAsset?: InputMaybe<Scalars['Bytes']>;
  executedTransferringAsset_contains?: InputMaybe<Scalars['Bytes']>;
  executedTransferringAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  executedTransferringAsset_not?: InputMaybe<Scalars['Bytes']>;
  executedTransferringAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
  executedTransferringAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  idx?: InputMaybe<Scalars['BigInt']>;
  idx_gt?: InputMaybe<Scalars['BigInt']>;
  idx_gte?: InputMaybe<Scalars['BigInt']>;
  idx_in?: InputMaybe<Array<Scalars['BigInt']>>;
  idx_lt?: InputMaybe<Scalars['BigInt']>;
  idx_lte?: InputMaybe<Scalars['BigInt']>;
  idx_not?: InputMaybe<Scalars['BigInt']>;
  idx_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  router?: InputMaybe<Scalars['String']>;
  router_contains?: InputMaybe<Scalars['String']>;
  router_contains_nocase?: InputMaybe<Scalars['String']>;
  router_ends_with?: InputMaybe<Scalars['String']>;
  router_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_gt?: InputMaybe<Scalars['String']>;
  router_gte?: InputMaybe<Scalars['String']>;
  router_in?: InputMaybe<Array<Scalars['String']>>;
  router_lt?: InputMaybe<Scalars['String']>;
  router_lte?: InputMaybe<Scalars['String']>;
  router_not?: InputMaybe<Scalars['String']>;
  router_not_contains?: InputMaybe<Scalars['String']>;
  router_not_contains_nocase?: InputMaybe<Scalars['String']>;
  router_not_ends_with?: InputMaybe<Scalars['String']>;
  router_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_in?: InputMaybe<Array<Scalars['String']>>;
  router_not_starts_with?: InputMaybe<Scalars['String']>;
  router_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_starts_with?: InputMaybe<Scalars['String']>;
  router_starts_with_nocase?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<TransferStatus>;
  status_in?: InputMaybe<Array<TransferStatus>>;
  status_not?: InputMaybe<TransferStatus>;
  status_not_in?: InputMaybe<Array<TransferStatus>>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transferId?: InputMaybe<Scalars['Bytes']>;
  transferId_contains?: InputMaybe<Scalars['Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transferId_not?: InputMaybe<Scalars['Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['Bytes']>;
  transferId_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  xcalledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledCaller?: InputMaybe<Scalars['Bytes']>;
  xcalledCaller_contains?: InputMaybe<Scalars['Bytes']>;
  xcalledCaller_in?: InputMaybe<Array<Scalars['Bytes']>>;
  xcalledCaller_not?: InputMaybe<Scalars['Bytes']>;
  xcalledCaller_not_contains?: InputMaybe<Scalars['Bytes']>;
  xcalledCaller_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  xcalledGasLimit?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasPrice?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledLocalAmount?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledLocalAsset?: InputMaybe<Scalars['Bytes']>;
  xcalledLocalAsset_contains?: InputMaybe<Scalars['Bytes']>;
  xcalledLocalAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  xcalledLocalAsset_not?: InputMaybe<Scalars['Bytes']>;
  xcalledLocalAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
  xcalledLocalAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  xcalledTimestamp?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTransactionHash?: InputMaybe<Scalars['Bytes']>;
  xcalledTransactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  xcalledTransactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  xcalledTransactionHash_not?: InputMaybe<Scalars['Bytes']>;
  xcalledTransactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  xcalledTransactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  xcalledTransferringAmount?: InputMaybe<Scalars['BigInt']>;
  xcalledTransferringAmount_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledTransferringAmount_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledTransferringAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTransferringAmount_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledTransferringAmount_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledTransferringAmount_not?: InputMaybe<Scalars['BigInt']>;
  xcalledTransferringAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTransferringAsset?: InputMaybe<Scalars['Bytes']>;
  xcalledTransferringAsset_contains?: InputMaybe<Scalars['Bytes']>;
  xcalledTransferringAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  xcalledTransferringAsset_not?: InputMaybe<Scalars['Bytes']>;
  xcalledTransferringAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
  xcalledTransferringAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum Transfer_OrderBy {
  CallData = 'callData',
  CallTo = 'callTo',
  ChainId = 'chainId',
  DestinationDomain = 'destinationDomain',
  ExecutedBlockNumber = 'executedBlockNumber',
  ExecutedCaller = 'executedCaller',
  ExecutedGasLimit = 'executedGasLimit',
  ExecutedGasPrice = 'executedGasPrice',
  ExecutedLocalAmount = 'executedLocalAmount',
  ExecutedLocalAsset = 'executedLocalAsset',
  ExecutedTimestamp = 'executedTimestamp',
  ExecutedTransactionHash = 'executedTransactionHash',
  ExecutedTransferringAmount = 'executedTransferringAmount',
  ExecutedTransferringAsset = 'executedTransferringAsset',
  Id = 'id',
  Idx = 'idx',
  Nonce = 'nonce',
  OriginDomain = 'originDomain',
  Router = 'router',
  Status = 'status',
  To = 'to',
  TransferId = 'transferId',
  XcalledBlockNumber = 'xcalledBlockNumber',
  XcalledCaller = 'xcalledCaller',
  XcalledGasLimit = 'xcalledGasLimit',
  XcalledGasPrice = 'xcalledGasPrice',
  XcalledLocalAmount = 'xcalledLocalAmount',
  XcalledLocalAsset = 'xcalledLocalAsset',
  XcalledTimestamp = 'xcalledTimestamp',
  XcalledTransactionHash = 'xcalledTransactionHash',
  XcalledTransferringAmount = 'xcalledTransferringAmount',
  XcalledTransferringAsset = 'xcalledTransferringAsset'
}

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

export type GetXCalledTransfersQueryVariables = Exact<{
  destinationDomains?: InputMaybe<Array<Scalars['BigInt']> | Scalars['BigInt']>;
  maxXCallBlockNumber: Scalars['BigInt'];
  nonce: Scalars['BigInt'];
}>;


export type GetXCalledTransfersQuery = { __typename?: 'Query', transfers: Array<{ __typename?: 'Transfer', id: string, originDomain: any, destinationDomain: any, chainId: any, status: TransferStatus, to: any, transferId: any, callTo: any, callData: any, idx?: any | null, nonce?: any | null, xcalledCaller?: any | null, xcalledTransferringAmount?: any | null, xcalledLocalAmount?: any | null, xcalledTransferringAsset?: any | null, xcalledLocalAsset?: any | null, xcalledTransactionHash?: any | null, xcalledTimestamp?: any | null, xcalledGasPrice?: any | null, xcalledGasLimit?: any | null, xcalledBlockNumber?: any | null, executedCaller?: any | null, executedTransferringAmount?: any | null, executedLocalAmount?: any | null, executedTransferringAsset?: any | null, executedLocalAsset?: any | null, executedTransactionHash?: any | null, executedTimestamp?: any | null, executedGasPrice?: any | null, executedGasLimit?: any | null, executedBlockNumber?: any | null, router?: { __typename?: 'Router', id: string } | null }> };

export type GetTransferQueryVariables = Exact<{
  transferId: Scalars['Bytes'];
}>;


export type GetTransferQuery = { __typename?: 'Query', transfers: Array<{ __typename?: 'Transfer', id: string, originDomain: any, destinationDomain: any, chainId: any, status: TransferStatus, to: any, transferId: any, callTo: any, callData: any, idx?: any | null, nonce?: any | null, xcalledCaller?: any | null, xcalledTransferringAmount?: any | null, xcalledLocalAmount?: any | null, xcalledTransferringAsset?: any | null, xcalledLocalAsset?: any | null, xcalledTransactionHash?: any | null, xcalledTimestamp?: any | null, xcalledGasPrice?: any | null, xcalledGasLimit?: any | null, xcalledBlockNumber?: any | null, executedCaller?: any | null, executedTransferringAmount?: any | null, executedLocalAmount?: any | null, executedTransferringAsset?: any | null, executedLocalAsset?: any | null, executedTransactionHash?: any | null, executedTimestamp?: any | null, executedGasPrice?: any | null, executedGasLimit?: any | null, executedBlockNumber?: any | null, router?: { __typename?: 'Router', id: string } | null }> };

export type GetExecutedAndReconciledTransfersByIdsQueryVariables = Exact<{
  transferIds?: InputMaybe<Array<Scalars['Bytes']> | Scalars['Bytes']>;
  maxXCalledBlockNumber: Scalars['BigInt'];
}>;


export type GetExecutedAndReconciledTransfersByIdsQuery = { __typename?: 'Query', transfers: Array<{ __typename?: 'Transfer', id: string, originDomain: any, destinationDomain: any, chainId: any, status: TransferStatus, to: any, transferId: any, callTo: any, callData: any, idx?: any | null, nonce?: any | null, xcalledCaller?: any | null, xcalledTransferringAmount?: any | null, xcalledLocalAmount?: any | null, xcalledTransferringAsset?: any | null, xcalledLocalAsset?: any | null, xcalledTransactionHash?: any | null, xcalledTimestamp?: any | null, xcalledGasPrice?: any | null, xcalledGasLimit?: any | null, xcalledBlockNumber?: any | null, executedCaller?: any | null, executedTransferringAmount?: any | null, executedLocalAmount?: any | null, executedTransferringAsset?: any | null, executedLocalAsset?: any | null, executedTransactionHash?: any | null, executedTimestamp?: any | null, executedGasPrice?: any | null, executedGasLimit?: any | null, executedBlockNumber?: any | null, router?: { __typename?: 'Router', id: string } | null }> };


export const GetXCalledTransfersDocument = gql`
    query GetXCalledTransfers($destinationDomains: [BigInt!], $maxXCallBlockNumber: BigInt!, $nonce: BigInt!) {
  transfers(
    where: {status: XCalled, destinationDomain_in: $destinationDomains, xcalledBlockNumber_lte: $maxXCallBlockNumber, nonce_gte: $nonce}
    orderBy: xcalledBlockNumber
    orderDirection: desc
  ) {
    id
    originDomain
    destinationDomain
    chainId
    status
    to
    transferId
    callTo
    callData
    idx
    nonce
    router {
      id
    }
    xcalledCaller
    xcalledTransferringAmount
    xcalledLocalAmount
    xcalledTransferringAsset
    xcalledLocalAsset
    xcalledTransactionHash
    xcalledTimestamp
    xcalledGasPrice
    xcalledGasLimit
    xcalledBlockNumber
    executedCaller
    executedTransferringAmount
    executedLocalAmount
    executedTransferringAsset
    executedLocalAsset
    executedTransactionHash
    executedTimestamp
    executedGasPrice
    executedGasLimit
    executedBlockNumber
  }
}
    `;
export const GetTransferDocument = gql`
    query GetTransfer($transferId: Bytes!) {
  transfers(where: {transferId: $transferId}) {
    id
    originDomain
    destinationDomain
    chainId
    status
    to
    transferId
    callTo
    callData
    idx
    nonce
    router {
      id
    }
    xcalledCaller
    xcalledTransferringAmount
    xcalledLocalAmount
    xcalledTransferringAsset
    xcalledLocalAsset
    xcalledTransactionHash
    xcalledTimestamp
    xcalledGasPrice
    xcalledGasLimit
    xcalledBlockNumber
    executedCaller
    executedTransferringAmount
    executedLocalAmount
    executedTransferringAsset
    executedLocalAsset
    executedTransactionHash
    executedTimestamp
    executedGasPrice
    executedGasLimit
    executedBlockNumber
  }
}
    `;
export const GetExecutedAndReconciledTransfersByIdsDocument = gql`
    query GetExecutedAndReconciledTransfersByIds($transferIds: [Bytes!], $maxXCalledBlockNumber: BigInt!) {
  transfers(
    where: {transferId_in: $transferIds, xcalledBlockNumber_lte: $maxXCalledBlockNumber, status_in: [Executed, Reconciled]}
    orderBy: xcalledBlockNumber
    orderDirection: desc
  ) {
    id
    originDomain
    destinationDomain
    chainId
    status
    to
    transferId
    callTo
    callData
    idx
    nonce
    router {
      id
    }
    xcalledCaller
    xcalledTransferringAmount
    xcalledLocalAmount
    xcalledTransferringAsset
    xcalledLocalAsset
    xcalledTransactionHash
    xcalledTimestamp
    xcalledGasPrice
    xcalledGasLimit
    xcalledBlockNumber
    executedCaller
    executedTransferringAmount
    executedLocalAmount
    executedTransferringAsset
    executedLocalAsset
    executedTransactionHash
    executedTimestamp
    executedGasPrice
    executedGasLimit
    executedBlockNumber
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetXCalledTransfers(variables: GetXCalledTransfersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetXCalledTransfersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetXCalledTransfersQuery>(GetXCalledTransfersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetXCalledTransfers', 'query');
    },
    GetTransfer(variables: GetTransferQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTransferQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTransferQuery>(GetTransferDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTransfer', 'query');
    },
    GetExecutedAndReconciledTransfersByIds(variables: GetExecutedAndReconciledTransfersByIdsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetExecutedAndReconciledTransfersByIdsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetExecutedAndReconciledTransfersByIdsQuery>(GetExecutedAndReconciledTransfersByIdsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetExecutedAndReconciledTransfersByIds', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;