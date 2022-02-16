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
  router?: InputMaybe<Scalars['String']>;
  router_contains?: InputMaybe<Scalars['String']>;
  router_ends_with?: InputMaybe<Scalars['String']>;
  router_gt?: InputMaybe<Scalars['String']>;
  router_gte?: InputMaybe<Scalars['String']>;
  router_in?: InputMaybe<Array<Scalars['String']>>;
  router_lt?: InputMaybe<Scalars['String']>;
  router_lte?: InputMaybe<Scalars['String']>;
  router_not?: InputMaybe<Scalars['String']>;
  router_not_contains?: InputMaybe<Scalars['String']>;
  router_not_ends_with?: InputMaybe<Scalars['String']>;
  router_not_in?: InputMaybe<Array<Scalars['String']>>;
  router_not_starts_with?: InputMaybe<Scalars['String']>;
  router_starts_with?: InputMaybe<Scalars['String']>;
};

export enum AssetBalance_OrderBy {
  Amount = 'amount',
  AssetId = 'assetId',
  CanonicalId = 'canonicalId',
  Id = 'id',
  Router = 'router'
}

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

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
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
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


export type QueryTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transaction_Filter>;
};

export type Router = {
  __typename?: 'Router';
  assetBalances: Array<AssetBalance>;
  id: Scalars['ID'];
  transactions: Array<Transaction>;
};


export type RouterAssetBalancesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AssetBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetBalance_Filter>;
};


export type RouterTransactionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Transaction_Filter>;
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
  Transactions = 'transactions'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  assetBalance?: Maybe<AssetBalance>;
  assetBalances: Array<AssetBalance>;
  router?: Maybe<Router>;
  routers: Array<Router>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
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


export type SubscriptionTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transaction_Filter>;
};

export type Transaction = {
  __typename?: 'Transaction';
  callData: Scalars['Bytes'];
  callTo: Scalars['Bytes'];
  chainId: Scalars['BigInt'];
  destinationDomain: Scalars['BigInt'];
  externalCallHash?: Maybe<Scalars['Bytes']>;
  fulfillBlockNumber?: Maybe<Scalars['BigInt']>;
  fulfillCaller?: Maybe<Scalars['Bytes']>;
  fulfillGasLimit?: Maybe<Scalars['BigInt']>;
  fulfillGasPrice?: Maybe<Scalars['BigInt']>;
  fulfillLocalAmount?: Maybe<Scalars['BigInt']>;
  fulfillTimestamp?: Maybe<Scalars['BigInt']>;
  fulfillTransactingAmount?: Maybe<Scalars['BigInt']>;
  fulfillTransactionHash?: Maybe<Scalars['Bytes']>;
  id: Scalars['ID'];
  localAsset: Scalars['Bytes'];
  nonce: Scalars['BigInt'];
  originDomain: Scalars['BigInt'];
  prepareBlockNumber?: Maybe<Scalars['BigInt']>;
  prepareCaller: Scalars['Bytes'];
  prepareGasLimit?: Maybe<Scalars['BigInt']>;
  prepareGasPrice?: Maybe<Scalars['BigInt']>;
  prepareLocalAmount: Scalars['BigInt'];
  prepareTimestamp?: Maybe<Scalars['BigInt']>;
  prepareTransactingAmount: Scalars['BigInt'];
  prepareTransactionHash?: Maybe<Scalars['Bytes']>;
  recipient: Scalars['Bytes'];
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledTransactionHash?: Maybe<Scalars['Bytes']>;
  router?: Maybe<Router>;
  status: TransactionStatus;
  transactingAsset: Scalars['Bytes'];
  transactionId: Scalars['Bytes'];
};

export enum TransactionStatus {
  Fulfilled = 'Fulfilled',
  Prepared = 'Prepared',
  Reconciled = 'Reconciled'
}

export type Transaction_Filter = {
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
  externalCallHash?: InputMaybe<Scalars['Bytes']>;
  externalCallHash_contains?: InputMaybe<Scalars['Bytes']>;
  externalCallHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  externalCallHash_not?: InputMaybe<Scalars['Bytes']>;
  externalCallHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  externalCallHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  fulfillBlockNumber?: InputMaybe<Scalars['BigInt']>;
  fulfillBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  fulfillBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  fulfillBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fulfillBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  fulfillBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  fulfillBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  fulfillBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fulfillCaller?: InputMaybe<Scalars['Bytes']>;
  fulfillCaller_contains?: InputMaybe<Scalars['Bytes']>;
  fulfillCaller_in?: InputMaybe<Array<Scalars['Bytes']>>;
  fulfillCaller_not?: InputMaybe<Scalars['Bytes']>;
  fulfillCaller_not_contains?: InputMaybe<Scalars['Bytes']>;
  fulfillCaller_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  fulfillGasLimit?: InputMaybe<Scalars['BigInt']>;
  fulfillGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  fulfillGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  fulfillGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fulfillGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  fulfillGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  fulfillGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  fulfillGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fulfillGasPrice?: InputMaybe<Scalars['BigInt']>;
  fulfillGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  fulfillGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  fulfillGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fulfillGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  fulfillGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  fulfillGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  fulfillGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fulfillLocalAmount?: InputMaybe<Scalars['BigInt']>;
  fulfillLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  fulfillLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  fulfillLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fulfillLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  fulfillLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  fulfillLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  fulfillLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fulfillTimestamp?: InputMaybe<Scalars['BigInt']>;
  fulfillTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  fulfillTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  fulfillTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fulfillTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  fulfillTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  fulfillTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  fulfillTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fulfillTransactingAmount?: InputMaybe<Scalars['BigInt']>;
  fulfillTransactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  fulfillTransactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  fulfillTransactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fulfillTransactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  fulfillTransactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  fulfillTransactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  fulfillTransactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fulfillTransactionHash?: InputMaybe<Scalars['Bytes']>;
  fulfillTransactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  fulfillTransactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  fulfillTransactionHash_not?: InputMaybe<Scalars['Bytes']>;
  fulfillTransactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  fulfillTransactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  localAsset?: InputMaybe<Scalars['Bytes']>;
  localAsset_contains?: InputMaybe<Scalars['Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  localAsset_not?: InputMaybe<Scalars['Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
  localAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
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
  prepareBlockNumber?: InputMaybe<Scalars['BigInt']>;
  prepareBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  prepareBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  prepareBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  prepareBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  prepareBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  prepareBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  prepareBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  prepareCaller?: InputMaybe<Scalars['Bytes']>;
  prepareCaller_contains?: InputMaybe<Scalars['Bytes']>;
  prepareCaller_in?: InputMaybe<Array<Scalars['Bytes']>>;
  prepareCaller_not?: InputMaybe<Scalars['Bytes']>;
  prepareCaller_not_contains?: InputMaybe<Scalars['Bytes']>;
  prepareCaller_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  prepareGasLimit?: InputMaybe<Scalars['BigInt']>;
  prepareGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  prepareGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  prepareGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  prepareGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  prepareGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  prepareGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  prepareGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  prepareGasPrice?: InputMaybe<Scalars['BigInt']>;
  prepareGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  prepareGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  prepareGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  prepareGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  prepareGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  prepareGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  prepareGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  prepareLocalAmount?: InputMaybe<Scalars['BigInt']>;
  prepareLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  prepareLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  prepareLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  prepareLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  prepareLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  prepareLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  prepareLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  prepareTimestamp?: InputMaybe<Scalars['BigInt']>;
  prepareTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  prepareTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  prepareTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  prepareTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  prepareTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  prepareTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  prepareTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  prepareTransactingAmount?: InputMaybe<Scalars['BigInt']>;
  prepareTransactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  prepareTransactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  prepareTransactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  prepareTransactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  prepareTransactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  prepareTransactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  prepareTransactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  prepareTransactionHash?: InputMaybe<Scalars['Bytes']>;
  prepareTransactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  prepareTransactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  prepareTransactionHash_not?: InputMaybe<Scalars['Bytes']>;
  prepareTransactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  prepareTransactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  recipient?: InputMaybe<Scalars['Bytes']>;
  recipient_contains?: InputMaybe<Scalars['Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  recipient_not?: InputMaybe<Scalars['Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  recipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  reconciledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTimestamp?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTransactionHash?: InputMaybe<Scalars['Bytes']>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  router?: InputMaybe<Scalars['String']>;
  router_contains?: InputMaybe<Scalars['String']>;
  router_ends_with?: InputMaybe<Scalars['String']>;
  router_gt?: InputMaybe<Scalars['String']>;
  router_gte?: InputMaybe<Scalars['String']>;
  router_in?: InputMaybe<Array<Scalars['String']>>;
  router_lt?: InputMaybe<Scalars['String']>;
  router_lte?: InputMaybe<Scalars['String']>;
  router_not?: InputMaybe<Scalars['String']>;
  router_not_contains?: InputMaybe<Scalars['String']>;
  router_not_ends_with?: InputMaybe<Scalars['String']>;
  router_not_in?: InputMaybe<Array<Scalars['String']>>;
  router_not_starts_with?: InputMaybe<Scalars['String']>;
  router_starts_with?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<TransactionStatus>;
  status_in?: InputMaybe<Array<TransactionStatus>>;
  status_not?: InputMaybe<TransactionStatus>;
  status_not_in?: InputMaybe<Array<TransactionStatus>>;
  transactingAsset?: InputMaybe<Scalars['Bytes']>;
  transactingAsset_contains?: InputMaybe<Scalars['Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactingAsset_not?: InputMaybe<Scalars['Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionId?: InputMaybe<Scalars['Bytes']>;
  transactionId_contains?: InputMaybe<Scalars['Bytes']>;
  transactionId_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionId_not?: InputMaybe<Scalars['Bytes']>;
  transactionId_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionId_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum Transaction_OrderBy {
  CallData = 'callData',
  CallTo = 'callTo',
  ChainId = 'chainId',
  DestinationDomain = 'destinationDomain',
  ExternalCallHash = 'externalCallHash',
  FulfillBlockNumber = 'fulfillBlockNumber',
  FulfillCaller = 'fulfillCaller',
  FulfillGasLimit = 'fulfillGasLimit',
  FulfillGasPrice = 'fulfillGasPrice',
  FulfillLocalAmount = 'fulfillLocalAmount',
  FulfillTimestamp = 'fulfillTimestamp',
  FulfillTransactingAmount = 'fulfillTransactingAmount',
  FulfillTransactionHash = 'fulfillTransactionHash',
  Id = 'id',
  LocalAsset = 'localAsset',
  Nonce = 'nonce',
  OriginDomain = 'originDomain',
  PrepareBlockNumber = 'prepareBlockNumber',
  PrepareCaller = 'prepareCaller',
  PrepareGasLimit = 'prepareGasLimit',
  PrepareGasPrice = 'prepareGasPrice',
  PrepareLocalAmount = 'prepareLocalAmount',
  PrepareTimestamp = 'prepareTimestamp',
  PrepareTransactingAmount = 'prepareTransactingAmount',
  PrepareTransactionHash = 'prepareTransactionHash',
  Recipient = 'recipient',
  ReconciledBlockNumber = 'reconciledBlockNumber',
  ReconciledGasLimit = 'reconciledGasLimit',
  ReconciledGasPrice = 'reconciledGasPrice',
  ReconciledTimestamp = 'reconciledTimestamp',
  ReconciledTransactionHash = 'reconciledTransactionHash',
  Router = 'router',
  Status = 'status',
  TransactingAsset = 'transactingAsset',
  TransactionId = 'transactionId'
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

export type GetPreparedTransactionsQueryVariables = Exact<{
  status: TransactionStatus;
  destinationDomain: Scalars['BigInt'];
  prepareBlockNumber: Scalars['BigInt'];
  nonce: Scalars['BigInt'];
}>;


export type GetPreparedTransactionsQuery = { __typename?: 'Query', transactions: Array<{ __typename?: 'Transaction', id: string, originDomain: any, destinationDomain: any, chainId: any, status: TransactionStatus, nonce: any, transactionId: any, recipient: any, transactingAsset: any, localAsset: any, prepareCaller: any, prepareTransactingAmount: any, prepareLocalAmount: any, callTo: any, callData: any, prepareTransactionHash?: any | null, prepareTimestamp?: any | null, prepareGasPrice?: any | null, prepareGasLimit?: any | null, prepareBlockNumber?: any | null, fulfillCaller?: any | null, fulfillTransactingAmount?: any | null, fulfillLocalAmount?: any | null, fulfillTransactionHash?: any | null, fulfillTimestamp?: any | null, fulfillGasPrice?: any | null, fulfillGasLimit?: any | null, fulfillBlockNumber?: any | null, externalCallHash?: any | null, reconciledTransactionHash?: any | null, reconciledTimestamp?: any | null, reconciledGasPrice?: any | null, reconciledGasLimit?: any | null, reconciledBlockNumber?: any | null, router?: { __typename?: 'Router', id: string } | null }> };


export const GetPreparedTransactionsDocument = gql`
    query GetPreparedTransactions($status: TransactionStatus!, $destinationDomain: BigInt!, $prepareBlockNumber: BigInt!, $nonce: BigInt!) {
  transactions(
    where: {status: Prepared, destinationDomain: $destinationDomain, prepareBlockNumber_gte: $prepareBlockNumber, nonce_gte: $nonce}
    orderBy: prepareBlockNumber
    orderDirection: desc
  ) {
    id
    originDomain
    destinationDomain
    chainId
    status
    nonce
    transactionId
    recipient
    router {
      id
    }
    transactingAsset
    localAsset
    prepareCaller
    prepareTransactingAmount
    prepareLocalAmount
    callTo
    callData
    prepareTransactionHash
    prepareTimestamp
    prepareGasPrice
    prepareGasLimit
    prepareBlockNumber
    fulfillCaller
    fulfillTransactingAmount
    fulfillLocalAmount
    fulfillTransactionHash
    fulfillTimestamp
    fulfillGasPrice
    fulfillGasLimit
    fulfillBlockNumber
    externalCallHash
    reconciledTransactionHash
    reconciledTimestamp
    reconciledGasPrice
    reconciledGasLimit
    reconciledBlockNumber
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetPreparedTransactions(variables: GetPreparedTransactionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPreparedTransactionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPreparedTransactionsQuery>(GetPreparedTransactionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPreparedTransactions');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;