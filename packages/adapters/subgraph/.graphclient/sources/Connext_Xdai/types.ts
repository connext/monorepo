// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextXdaiTypes {
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
  xdai_BigDecimal: any;
  BigInt: any;
  xdai_Bytes: any;
  xdai_Int8: any;
  Timestamp: any;
};

export type xdai_Aggregation_interval =
  | 'hour'
  | 'day';

export type xdai_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: xdai_Router;
  assetId: Scalars['xdai_Bytes'];
};

export type xdai_AssetBalance_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  router?: InputMaybe<Scalars['String']>;
  router_not?: InputMaybe<Scalars['String']>;
  router_gt?: InputMaybe<Scalars['String']>;
  router_lt?: InputMaybe<Scalars['String']>;
  router_gte?: InputMaybe<Scalars['String']>;
  router_lte?: InputMaybe<Scalars['String']>;
  router_in?: InputMaybe<Array<Scalars['String']>>;
  router_not_in?: InputMaybe<Array<Scalars['String']>>;
  router_contains?: InputMaybe<Scalars['String']>;
  router_contains_nocase?: InputMaybe<Scalars['String']>;
  router_not_contains?: InputMaybe<Scalars['String']>;
  router_not_contains_nocase?: InputMaybe<Scalars['String']>;
  router_starts_with?: InputMaybe<Scalars['String']>;
  router_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_starts_with?: InputMaybe<Scalars['String']>;
  router_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_ends_with?: InputMaybe<Scalars['String']>;
  router_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_ends_with?: InputMaybe<Scalars['String']>;
  router_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_?: InputMaybe<xdai_Router_filter>;
  assetId?: InputMaybe<Scalars['xdai_Bytes']>;
  assetId_not?: InputMaybe<Scalars['xdai_Bytes']>;
  assetId_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  assetId_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  assetId_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  assetId_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  assetId_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  assetId_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  assetId_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  assetId_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_AssetBalance_filter>>>;
};

export type xdai_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'router__id'
  | 'assetId';

export type xdai_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type xdai_Block_height = {
  hash?: InputMaybe<Scalars['xdai_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export type xdai_OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  xdai_assetBalance?: Maybe<xdai_AssetBalance>;
  xdai_assetBalances: Array<xdai_AssetBalance>;
  xdai_router?: Maybe<xdai_Router>;
  xdai_routers: Array<xdai_Router>;
  xdai_transaction?: Maybe<xdai_Transaction>;
  xdai_transactions: Array<xdai_Transaction>;
  xdai_user?: Maybe<xdai_User>;
  xdai_users: Array<xdai_User>;
  /** Access to subgraph metadata */
  xdai__meta?: Maybe<xdai__Meta_>;
};


export type Queryxdai_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_AssetBalance_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Router_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Router_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_transactionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_transactionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Transaction_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Transaction_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_userArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_usersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_User_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_User_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai__metaArgs = {
  block?: InputMaybe<xdai_Block_height>;
};

export type xdai_Router = {
  id: Scalars['ID'];
  assetBalances: Array<xdai_AssetBalance>;
  transactions: Array<xdai_Transaction>;
};


export type xdai_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_AssetBalance_filter>;
};


export type xdai_RoutertransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Transaction_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Transaction_filter>;
};

export type xdai_Router_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  assetBalances_?: InputMaybe<xdai_AssetBalance_filter>;
  transactions_?: InputMaybe<xdai_Transaction_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_Router_filter>>>;
};

export type xdai_Router_orderBy =
  | 'id'
  | 'assetBalances'
  | 'transactions';

export type Subscription = {
  xdai_assetBalance?: Maybe<xdai_AssetBalance>;
  xdai_assetBalances: Array<xdai_AssetBalance>;
  xdai_router?: Maybe<xdai_Router>;
  xdai_routers: Array<xdai_Router>;
  xdai_transaction?: Maybe<xdai_Transaction>;
  xdai_transactions: Array<xdai_Transaction>;
  xdai_user?: Maybe<xdai_User>;
  xdai_users: Array<xdai_User>;
  /** Access to subgraph metadata */
  xdai__meta?: Maybe<xdai__Meta_>;
};


export type Subscriptionxdai_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_AssetBalance_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Router_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Router_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_transactionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_transactionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Transaction_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Transaction_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_userArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_usersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_User_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_User_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai__metaArgs = {
  block?: InputMaybe<xdai_Block_height>;
};

export type xdai_Transaction = {
  id: Scalars['ID'];
  status: xdai_TransactionStatus;
  chainId: Scalars['BigInt'];
  preparedTimestamp: Scalars['BigInt'];
  receivingChainTxManagerAddress: Scalars['xdai_Bytes'];
  user: xdai_User;
  router: xdai_Router;
  initiator: Scalars['xdai_Bytes'];
  sendingAssetId: Scalars['xdai_Bytes'];
  receivingAssetId: Scalars['xdai_Bytes'];
  sendingChainFallback: Scalars['xdai_Bytes'];
  callTo: Scalars['xdai_Bytes'];
  receivingAddress: Scalars['xdai_Bytes'];
  callDataHash: Scalars['xdai_Bytes'];
  transactionId: Scalars['xdai_Bytes'];
  sendingChainId: Scalars['BigInt'];
  receivingChainId: Scalars['BigInt'];
  amount: Scalars['BigInt'];
  expiry: Scalars['BigInt'];
  preparedBlockNumber: Scalars['BigInt'];
  encryptedCallData: Scalars['String'];
  prepareCaller?: Maybe<Scalars['xdai_Bytes']>;
  bidSignature: Scalars['xdai_Bytes'];
  encodedBid: Scalars['String'];
  prepareTransactionHash: Scalars['xdai_Bytes'];
  prepareMeta?: Maybe<Scalars['xdai_Bytes']>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  signature?: Maybe<Scalars['xdai_Bytes']>;
  callData?: Maybe<Scalars['String']>;
  externalCallSuccess?: Maybe<Scalars['Boolean']>;
  externalCallIsContract?: Maybe<Scalars['Boolean']>;
  externalCallReturnData?: Maybe<Scalars['xdai_Bytes']>;
  fulfillCaller?: Maybe<Scalars['xdai_Bytes']>;
  fulfillTransactionHash?: Maybe<Scalars['xdai_Bytes']>;
  fulfillMeta?: Maybe<Scalars['xdai_Bytes']>;
  fulfillTimestamp?: Maybe<Scalars['BigInt']>;
  cancelCaller?: Maybe<Scalars['xdai_Bytes']>;
  cancelTransactionHash?: Maybe<Scalars['xdai_Bytes']>;
  cancelMeta?: Maybe<Scalars['xdai_Bytes']>;
  cancelTimestamp?: Maybe<Scalars['BigInt']>;
};

export type xdai_TransactionStatus =
  | 'Prepared'
  | 'Fulfilled'
  | 'Cancelled';

export type xdai_Transaction_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  status?: InputMaybe<xdai_TransactionStatus>;
  status_not?: InputMaybe<xdai_TransactionStatus>;
  status_in?: InputMaybe<Array<xdai_TransactionStatus>>;
  status_not_in?: InputMaybe<Array<xdai_TransactionStatus>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  preparedTimestamp?: InputMaybe<Scalars['BigInt']>;
  preparedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  preparedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  preparedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  preparedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  preparedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  preparedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  preparedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  receivingChainTxManagerAddress?: InputMaybe<Scalars['xdai_Bytes']>;
  receivingChainTxManagerAddress_not?: InputMaybe<Scalars['xdai_Bytes']>;
  receivingChainTxManagerAddress_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  receivingChainTxManagerAddress_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  receivingChainTxManagerAddress_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  receivingChainTxManagerAddress_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  receivingChainTxManagerAddress_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  receivingChainTxManagerAddress_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  receivingChainTxManagerAddress_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  receivingChainTxManagerAddress_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  user?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_contains_nocase?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_?: InputMaybe<xdai_User_filter>;
  router?: InputMaybe<Scalars['String']>;
  router_not?: InputMaybe<Scalars['String']>;
  router_gt?: InputMaybe<Scalars['String']>;
  router_lt?: InputMaybe<Scalars['String']>;
  router_gte?: InputMaybe<Scalars['String']>;
  router_lte?: InputMaybe<Scalars['String']>;
  router_in?: InputMaybe<Array<Scalars['String']>>;
  router_not_in?: InputMaybe<Array<Scalars['String']>>;
  router_contains?: InputMaybe<Scalars['String']>;
  router_contains_nocase?: InputMaybe<Scalars['String']>;
  router_not_contains?: InputMaybe<Scalars['String']>;
  router_not_contains_nocase?: InputMaybe<Scalars['String']>;
  router_starts_with?: InputMaybe<Scalars['String']>;
  router_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_starts_with?: InputMaybe<Scalars['String']>;
  router_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_ends_with?: InputMaybe<Scalars['String']>;
  router_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_ends_with?: InputMaybe<Scalars['String']>;
  router_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_?: InputMaybe<xdai_Router_filter>;
  initiator?: InputMaybe<Scalars['xdai_Bytes']>;
  initiator_not?: InputMaybe<Scalars['xdai_Bytes']>;
  initiator_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  initiator_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  initiator_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  initiator_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  initiator_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  initiator_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  initiator_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  initiator_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  sendingAssetId?: InputMaybe<Scalars['xdai_Bytes']>;
  sendingAssetId_not?: InputMaybe<Scalars['xdai_Bytes']>;
  sendingAssetId_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  sendingAssetId_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  sendingAssetId_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  sendingAssetId_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  sendingAssetId_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  sendingAssetId_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  sendingAssetId_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  sendingAssetId_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  receivingAssetId?: InputMaybe<Scalars['xdai_Bytes']>;
  receivingAssetId_not?: InputMaybe<Scalars['xdai_Bytes']>;
  receivingAssetId_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  receivingAssetId_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  receivingAssetId_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  receivingAssetId_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  receivingAssetId_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  receivingAssetId_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  receivingAssetId_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  receivingAssetId_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  sendingChainFallback?: InputMaybe<Scalars['xdai_Bytes']>;
  sendingChainFallback_not?: InputMaybe<Scalars['xdai_Bytes']>;
  sendingChainFallback_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  sendingChainFallback_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  sendingChainFallback_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  sendingChainFallback_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  sendingChainFallback_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  sendingChainFallback_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  sendingChainFallback_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  sendingChainFallback_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  callTo?: InputMaybe<Scalars['xdai_Bytes']>;
  callTo_not?: InputMaybe<Scalars['xdai_Bytes']>;
  callTo_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  callTo_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  callTo_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  callTo_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  callTo_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  callTo_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  callTo_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  callTo_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  receivingAddress?: InputMaybe<Scalars['xdai_Bytes']>;
  receivingAddress_not?: InputMaybe<Scalars['xdai_Bytes']>;
  receivingAddress_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  receivingAddress_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  receivingAddress_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  receivingAddress_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  receivingAddress_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  receivingAddress_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  receivingAddress_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  receivingAddress_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  callDataHash?: InputMaybe<Scalars['xdai_Bytes']>;
  callDataHash_not?: InputMaybe<Scalars['xdai_Bytes']>;
  callDataHash_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  callDataHash_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  callDataHash_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  callDataHash_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  callDataHash_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  callDataHash_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  callDataHash_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  callDataHash_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionId?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionId_not?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionId_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionId_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionId_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionId_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionId_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactionId_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactionId_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionId_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  sendingChainId?: InputMaybe<Scalars['BigInt']>;
  sendingChainId_not?: InputMaybe<Scalars['BigInt']>;
  sendingChainId_gt?: InputMaybe<Scalars['BigInt']>;
  sendingChainId_lt?: InputMaybe<Scalars['BigInt']>;
  sendingChainId_gte?: InputMaybe<Scalars['BigInt']>;
  sendingChainId_lte?: InputMaybe<Scalars['BigInt']>;
  sendingChainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sendingChainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  receivingChainId?: InputMaybe<Scalars['BigInt']>;
  receivingChainId_not?: InputMaybe<Scalars['BigInt']>;
  receivingChainId_gt?: InputMaybe<Scalars['BigInt']>;
  receivingChainId_lt?: InputMaybe<Scalars['BigInt']>;
  receivingChainId_gte?: InputMaybe<Scalars['BigInt']>;
  receivingChainId_lte?: InputMaybe<Scalars['BigInt']>;
  receivingChainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  receivingChainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiry?: InputMaybe<Scalars['BigInt']>;
  expiry_not?: InputMaybe<Scalars['BigInt']>;
  expiry_gt?: InputMaybe<Scalars['BigInt']>;
  expiry_lt?: InputMaybe<Scalars['BigInt']>;
  expiry_gte?: InputMaybe<Scalars['BigInt']>;
  expiry_lte?: InputMaybe<Scalars['BigInt']>;
  expiry_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiry_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  preparedBlockNumber?: InputMaybe<Scalars['BigInt']>;
  preparedBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  preparedBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  preparedBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  preparedBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  preparedBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  preparedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  preparedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  encryptedCallData?: InputMaybe<Scalars['String']>;
  encryptedCallData_not?: InputMaybe<Scalars['String']>;
  encryptedCallData_gt?: InputMaybe<Scalars['String']>;
  encryptedCallData_lt?: InputMaybe<Scalars['String']>;
  encryptedCallData_gte?: InputMaybe<Scalars['String']>;
  encryptedCallData_lte?: InputMaybe<Scalars['String']>;
  encryptedCallData_in?: InputMaybe<Array<Scalars['String']>>;
  encryptedCallData_not_in?: InputMaybe<Array<Scalars['String']>>;
  encryptedCallData_contains?: InputMaybe<Scalars['String']>;
  encryptedCallData_contains_nocase?: InputMaybe<Scalars['String']>;
  encryptedCallData_not_contains?: InputMaybe<Scalars['String']>;
  encryptedCallData_not_contains_nocase?: InputMaybe<Scalars['String']>;
  encryptedCallData_starts_with?: InputMaybe<Scalars['String']>;
  encryptedCallData_starts_with_nocase?: InputMaybe<Scalars['String']>;
  encryptedCallData_not_starts_with?: InputMaybe<Scalars['String']>;
  encryptedCallData_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  encryptedCallData_ends_with?: InputMaybe<Scalars['String']>;
  encryptedCallData_ends_with_nocase?: InputMaybe<Scalars['String']>;
  encryptedCallData_not_ends_with?: InputMaybe<Scalars['String']>;
  encryptedCallData_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  prepareCaller?: InputMaybe<Scalars['xdai_Bytes']>;
  prepareCaller_not?: InputMaybe<Scalars['xdai_Bytes']>;
  prepareCaller_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  prepareCaller_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  prepareCaller_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  prepareCaller_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  prepareCaller_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  prepareCaller_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  prepareCaller_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  prepareCaller_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  bidSignature?: InputMaybe<Scalars['xdai_Bytes']>;
  bidSignature_not?: InputMaybe<Scalars['xdai_Bytes']>;
  bidSignature_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  bidSignature_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  bidSignature_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  bidSignature_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  bidSignature_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  bidSignature_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  bidSignature_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  bidSignature_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  encodedBid?: InputMaybe<Scalars['String']>;
  encodedBid_not?: InputMaybe<Scalars['String']>;
  encodedBid_gt?: InputMaybe<Scalars['String']>;
  encodedBid_lt?: InputMaybe<Scalars['String']>;
  encodedBid_gte?: InputMaybe<Scalars['String']>;
  encodedBid_lte?: InputMaybe<Scalars['String']>;
  encodedBid_in?: InputMaybe<Array<Scalars['String']>>;
  encodedBid_not_in?: InputMaybe<Array<Scalars['String']>>;
  encodedBid_contains?: InputMaybe<Scalars['String']>;
  encodedBid_contains_nocase?: InputMaybe<Scalars['String']>;
  encodedBid_not_contains?: InputMaybe<Scalars['String']>;
  encodedBid_not_contains_nocase?: InputMaybe<Scalars['String']>;
  encodedBid_starts_with?: InputMaybe<Scalars['String']>;
  encodedBid_starts_with_nocase?: InputMaybe<Scalars['String']>;
  encodedBid_not_starts_with?: InputMaybe<Scalars['String']>;
  encodedBid_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  encodedBid_ends_with?: InputMaybe<Scalars['String']>;
  encodedBid_ends_with_nocase?: InputMaybe<Scalars['String']>;
  encodedBid_not_ends_with?: InputMaybe<Scalars['String']>;
  encodedBid_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  prepareTransactionHash?: InputMaybe<Scalars['xdai_Bytes']>;
  prepareTransactionHash_not?: InputMaybe<Scalars['xdai_Bytes']>;
  prepareTransactionHash_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  prepareTransactionHash_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  prepareTransactionHash_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  prepareTransactionHash_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  prepareTransactionHash_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  prepareTransactionHash_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  prepareTransactionHash_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  prepareTransactionHash_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  prepareMeta?: InputMaybe<Scalars['xdai_Bytes']>;
  prepareMeta_not?: InputMaybe<Scalars['xdai_Bytes']>;
  prepareMeta_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  prepareMeta_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  prepareMeta_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  prepareMeta_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  prepareMeta_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  prepareMeta_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  prepareMeta_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  prepareMeta_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  relayerFee?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  signature?: InputMaybe<Scalars['xdai_Bytes']>;
  signature_not?: InputMaybe<Scalars['xdai_Bytes']>;
  signature_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  signature_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  signature_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  signature_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  signature_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  signature_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  signature_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  signature_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  callData?: InputMaybe<Scalars['String']>;
  callData_not?: InputMaybe<Scalars['String']>;
  callData_gt?: InputMaybe<Scalars['String']>;
  callData_lt?: InputMaybe<Scalars['String']>;
  callData_gte?: InputMaybe<Scalars['String']>;
  callData_lte?: InputMaybe<Scalars['String']>;
  callData_in?: InputMaybe<Array<Scalars['String']>>;
  callData_not_in?: InputMaybe<Array<Scalars['String']>>;
  callData_contains?: InputMaybe<Scalars['String']>;
  callData_contains_nocase?: InputMaybe<Scalars['String']>;
  callData_not_contains?: InputMaybe<Scalars['String']>;
  callData_not_contains_nocase?: InputMaybe<Scalars['String']>;
  callData_starts_with?: InputMaybe<Scalars['String']>;
  callData_starts_with_nocase?: InputMaybe<Scalars['String']>;
  callData_not_starts_with?: InputMaybe<Scalars['String']>;
  callData_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  callData_ends_with?: InputMaybe<Scalars['String']>;
  callData_ends_with_nocase?: InputMaybe<Scalars['String']>;
  callData_not_ends_with?: InputMaybe<Scalars['String']>;
  callData_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  externalCallSuccess?: InputMaybe<Scalars['Boolean']>;
  externalCallSuccess_not?: InputMaybe<Scalars['Boolean']>;
  externalCallSuccess_in?: InputMaybe<Array<Scalars['Boolean']>>;
  externalCallSuccess_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  externalCallIsContract?: InputMaybe<Scalars['Boolean']>;
  externalCallIsContract_not?: InputMaybe<Scalars['Boolean']>;
  externalCallIsContract_in?: InputMaybe<Array<Scalars['Boolean']>>;
  externalCallIsContract_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  externalCallReturnData?: InputMaybe<Scalars['xdai_Bytes']>;
  externalCallReturnData_not?: InputMaybe<Scalars['xdai_Bytes']>;
  externalCallReturnData_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  externalCallReturnData_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  externalCallReturnData_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  externalCallReturnData_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  externalCallReturnData_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  externalCallReturnData_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  externalCallReturnData_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  externalCallReturnData_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillCaller?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillCaller_not?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillCaller_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillCaller_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillCaller_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillCaller_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillCaller_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  fulfillCaller_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  fulfillCaller_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillCaller_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillTransactionHash?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillTransactionHash_not?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillTransactionHash_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillTransactionHash_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillTransactionHash_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillTransactionHash_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillTransactionHash_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  fulfillTransactionHash_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  fulfillTransactionHash_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillTransactionHash_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillMeta?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillMeta_not?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillMeta_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillMeta_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillMeta_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillMeta_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillMeta_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  fulfillMeta_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  fulfillMeta_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillMeta_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  fulfillTimestamp?: InputMaybe<Scalars['BigInt']>;
  fulfillTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  fulfillTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  fulfillTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  fulfillTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  fulfillTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  fulfillTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fulfillTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cancelCaller?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelCaller_not?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelCaller_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelCaller_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelCaller_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelCaller_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelCaller_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  cancelCaller_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  cancelCaller_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelCaller_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelTransactionHash?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelTransactionHash_not?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelTransactionHash_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelTransactionHash_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelTransactionHash_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelTransactionHash_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelTransactionHash_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  cancelTransactionHash_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  cancelTransactionHash_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelTransactionHash_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelMeta?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelMeta_not?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelMeta_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelMeta_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelMeta_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelMeta_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelMeta_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  cancelMeta_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  cancelMeta_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelMeta_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  cancelTimestamp?: InputMaybe<Scalars['BigInt']>;
  cancelTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  cancelTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  cancelTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  cancelTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  cancelTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  cancelTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cancelTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_Transaction_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_Transaction_filter>>>;
};

export type xdai_Transaction_orderBy =
  | 'id'
  | 'status'
  | 'chainId'
  | 'preparedTimestamp'
  | 'receivingChainTxManagerAddress'
  | 'user'
  | 'user__id'
  | 'router'
  | 'router__id'
  | 'initiator'
  | 'sendingAssetId'
  | 'receivingAssetId'
  | 'sendingChainFallback'
  | 'callTo'
  | 'receivingAddress'
  | 'callDataHash'
  | 'transactionId'
  | 'sendingChainId'
  | 'receivingChainId'
  | 'amount'
  | 'expiry'
  | 'preparedBlockNumber'
  | 'encryptedCallData'
  | 'prepareCaller'
  | 'bidSignature'
  | 'encodedBid'
  | 'prepareTransactionHash'
  | 'prepareMeta'
  | 'relayerFee'
  | 'signature'
  | 'callData'
  | 'externalCallSuccess'
  | 'externalCallIsContract'
  | 'externalCallReturnData'
  | 'fulfillCaller'
  | 'fulfillTransactionHash'
  | 'fulfillMeta'
  | 'fulfillTimestamp'
  | 'cancelCaller'
  | 'cancelTransactionHash'
  | 'cancelMeta'
  | 'cancelTimestamp';

export type xdai_User = {
  id: Scalars['ID'];
  transactions: Array<xdai_Transaction>;
};


export type xdai_UsertransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Transaction_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Transaction_filter>;
};

export type xdai_User_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transactions_?: InputMaybe<xdai_Transaction_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_User_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_User_filter>>>;
};

export type xdai_User_orderBy =
  | 'id'
  | 'transactions';

export type xdai__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['xdai_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['xdai_Bytes']>;
};

/** The type for the top-level _meta field */
export type xdai__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: xdai__Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  xdai_assetBalance: InContextSdkMethod<Query['xdai_assetBalance'], Queryxdai_assetBalanceArgs, MeshContext>,
  /** null **/
  xdai_assetBalances: InContextSdkMethod<Query['xdai_assetBalances'], Queryxdai_assetBalancesArgs, MeshContext>,
  /** null **/
  xdai_router: InContextSdkMethod<Query['xdai_router'], Queryxdai_routerArgs, MeshContext>,
  /** null **/
  xdai_routers: InContextSdkMethod<Query['xdai_routers'], Queryxdai_routersArgs, MeshContext>,
  /** null **/
  xdai_transaction: InContextSdkMethod<Query['xdai_transaction'], Queryxdai_transactionArgs, MeshContext>,
  /** null **/
  xdai_transactions: InContextSdkMethod<Query['xdai_transactions'], Queryxdai_transactionsArgs, MeshContext>,
  /** null **/
  xdai_user: InContextSdkMethod<Query['xdai_user'], Queryxdai_userArgs, MeshContext>,
  /** null **/
  xdai_users: InContextSdkMethod<Query['xdai_users'], Queryxdai_usersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  xdai__meta: InContextSdkMethod<Query['xdai__meta'], Queryxdai__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  xdai_assetBalance: InContextSdkMethod<Subscription['xdai_assetBalance'], Subscriptionxdai_assetBalanceArgs, MeshContext>,
  /** null **/
  xdai_assetBalances: InContextSdkMethod<Subscription['xdai_assetBalances'], Subscriptionxdai_assetBalancesArgs, MeshContext>,
  /** null **/
  xdai_router: InContextSdkMethod<Subscription['xdai_router'], Subscriptionxdai_routerArgs, MeshContext>,
  /** null **/
  xdai_routers: InContextSdkMethod<Subscription['xdai_routers'], Subscriptionxdai_routersArgs, MeshContext>,
  /** null **/
  xdai_transaction: InContextSdkMethod<Subscription['xdai_transaction'], Subscriptionxdai_transactionArgs, MeshContext>,
  /** null **/
  xdai_transactions: InContextSdkMethod<Subscription['xdai_transactions'], Subscriptionxdai_transactionsArgs, MeshContext>,
  /** null **/
  xdai_user: InContextSdkMethod<Subscription['xdai_user'], Subscriptionxdai_userArgs, MeshContext>,
  /** null **/
  xdai_users: InContextSdkMethod<Subscription['xdai_users'], Subscriptionxdai_usersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  xdai__meta: InContextSdkMethod<Subscription['xdai__meta'], Subscriptionxdai__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Xdai"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
