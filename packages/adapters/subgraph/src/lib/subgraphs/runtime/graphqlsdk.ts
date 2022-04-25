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

export type Asset = {
  __typename?: 'Asset';
  adoptedAsset: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  canonicalDomain: Scalars['BigInt'];
  canonicalId: Scalars['Bytes'];
  id: Scalars['ID'];
  local: Scalars['Bytes'];
};

export type AssetBalance = {
  __typename?: 'AssetBalance';
  amount: Scalars['BigInt'];
  asset: Asset;
  id: Scalars['ID'];
  router: Router;
};

export type AssetBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['String']>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  Asset = 'asset',
  Id = 'id',
  Router = 'router'
}

export type Asset_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  adoptedAsset?: InputMaybe<Scalars['Bytes']>;
  adoptedAsset_contains?: InputMaybe<Scalars['Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  adoptedAsset_not?: InputMaybe<Scalars['Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
};

export enum Asset_OrderBy {
  AdoptedAsset = 'adoptedAsset',
  BlockNumber = 'blockNumber',
  CanonicalDomain = 'canonicalDomain',
  CanonicalId = 'canonicalId',
  Id = 'id',
  Local = 'local'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
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
  asset?: Maybe<Asset>;
  assetBalance?: Maybe<AssetBalance>;
  assetBalances: Array<AssetBalance>;
  assets: Array<Asset>;
  router?: Maybe<Router>;
  routers: Array<Router>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryAssetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
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


export type QueryAssetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Asset_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Asset_Filter>;
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
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['Bytes']>;
  proposedOwner?: Maybe<Scalars['Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  recipient?: Maybe<Scalars['Bytes']>;
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  proposedOwner?: InputMaybe<Scalars['Bytes']>;
  proposedOwner_contains?: InputMaybe<Scalars['Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  proposedOwner_not?: InputMaybe<Scalars['Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['Bytes']>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  recipient?: InputMaybe<Scalars['Bytes']>;
  recipient_contains?: InputMaybe<Scalars['Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  recipient_not?: InputMaybe<Scalars['Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  recipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum Router_OrderBy {
  AssetBalances = 'assetBalances',
  Id = 'id',
  IsActive = 'isActive',
  Owner = 'owner',
  ProposedOwner = 'proposedOwner',
  ProposedTimestamp = 'proposedTimestamp',
  Recipient = 'recipient',
  Transfers = 'transfers'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  asset?: Maybe<Asset>;
  assetBalance?: Maybe<AssetBalance>;
  assetBalances: Array<AssetBalance>;
  assets: Array<Asset>;
  router?: Maybe<Router>;
  routers: Array<Router>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAssetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
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


export type SubscriptionAssetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Asset_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Asset_Filter>;
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
  callData?: Maybe<Scalars['Bytes']>;
  callTo?: Maybe<Scalars['Bytes']>;
  chainId?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['Bytes']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedLocalAmount?: Maybe<Scalars['BigInt']>;
  executedLocalAsset?: Maybe<Scalars['Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedTransactingAmount?: Maybe<Scalars['BigInt']>;
  executedTransactingAsset?: Maybe<Scalars['Bytes']>;
  executedTransactionHash?: Maybe<Scalars['Bytes']>;
  id: Scalars['ID'];
  idx?: Maybe<Scalars['BigInt']>;
  nonce?: Maybe<Scalars['BigInt']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['Bytes']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledLocalAmount?: Maybe<Scalars['BigInt']>;
  reconciledLocalAsset?: Maybe<Scalars['Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledTransactionHash?: Maybe<Scalars['Bytes']>;
  router?: Maybe<Router>;
  status?: Maybe<TransferStatus>;
  to?: Maybe<Scalars['Bytes']>;
  transferId?: Maybe<Scalars['Bytes']>;
  xcalledBlockNumber?: Maybe<Scalars['BigInt']>;
  xcalledCaller?: Maybe<Scalars['Bytes']>;
  xcalledGasLimit?: Maybe<Scalars['BigInt']>;
  xcalledGasPrice?: Maybe<Scalars['BigInt']>;
  xcalledLocalAmount?: Maybe<Scalars['BigInt']>;
  xcalledLocalAsset?: Maybe<Scalars['Bytes']>;
  xcalledTimestamp?: Maybe<Scalars['BigInt']>;
  xcalledTransactingAmount?: Maybe<Scalars['BigInt']>;
  xcalledTransactingAsset?: Maybe<Scalars['Bytes']>;
  xcalledTransactionHash?: Maybe<Scalars['Bytes']>;
};

export enum TransferStatus {
  Executed = 'Executed',
  Reconciled = 'Reconciled',
  XCalled = 'XCalled'
}

export type Transfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
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
  executedTransactingAmount?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTransactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTransactingAsset?: InputMaybe<Scalars['Bytes']>;
  executedTransactingAsset_contains?: InputMaybe<Scalars['Bytes']>;
  executedTransactingAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  executedTransactingAsset_not?: InputMaybe<Scalars['Bytes']>;
  executedTransactingAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
  executedTransactingAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  executedTransactionHash?: InputMaybe<Scalars['Bytes']>;
  executedTransactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  executedTransactionHash_not?: InputMaybe<Scalars['Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
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
  reconciledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['Bytes']>;
  reconciledCaller_contains?: InputMaybe<Scalars['Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['Bytes']>>;
  reconciledCaller_not?: InputMaybe<Scalars['Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['Bytes']>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
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
  reconciledLocalAmount?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledLocalAsset?: InputMaybe<Scalars['Bytes']>;
  reconciledLocalAsset_contains?: InputMaybe<Scalars['Bytes']>;
  reconciledLocalAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  reconciledLocalAsset_not?: InputMaybe<Scalars['Bytes']>;
  reconciledLocalAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
  reconciledLocalAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
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
  xcalledTransactingAmount?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTransactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTransactingAsset?: InputMaybe<Scalars['Bytes']>;
  xcalledTransactingAsset_contains?: InputMaybe<Scalars['Bytes']>;
  xcalledTransactingAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  xcalledTransactingAsset_not?: InputMaybe<Scalars['Bytes']>;
  xcalledTransactingAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
  xcalledTransactingAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  xcalledTransactionHash?: InputMaybe<Scalars['Bytes']>;
  xcalledTransactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  xcalledTransactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  xcalledTransactionHash_not?: InputMaybe<Scalars['Bytes']>;
  xcalledTransactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  xcalledTransactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
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
  ExecutedTransactingAmount = 'executedTransactingAmount',
  ExecutedTransactingAsset = 'executedTransactingAsset',
  ExecutedTransactionHash = 'executedTransactionHash',
  Id = 'id',
  Idx = 'idx',
  Nonce = 'nonce',
  OriginDomain = 'originDomain',
  ReconciledBlockNumber = 'reconciledBlockNumber',
  ReconciledCaller = 'reconciledCaller',
  ReconciledGasLimit = 'reconciledGasLimit',
  ReconciledGasPrice = 'reconciledGasPrice',
  ReconciledLocalAmount = 'reconciledLocalAmount',
  ReconciledLocalAsset = 'reconciledLocalAsset',
  ReconciledTimestamp = 'reconciledTimestamp',
  ReconciledTransactionHash = 'reconciledTransactionHash',
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
  XcalledTransactingAmount = 'xcalledTransactingAmount',
  XcalledTransactingAsset = 'xcalledTransactingAsset',
  XcalledTransactionHash = 'xcalledTransactionHash'
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

export type GetTransfersQueryVariables = Exact<{
  originDomain: Scalars['BigInt'];
  destinationDomains?: InputMaybe<Array<Scalars['BigInt']> | Scalars['BigInt']>;
  nonce: Scalars['BigInt'];
}>;


export type GetTransfersQuery = { __typename?: 'Query', transfers: Array<{ __typename?: 'Transfer', id: string, originDomain?: any | null, destinationDomain?: any | null, chainId?: any | null, status?: TransferStatus | null, to?: any | null, transferId?: any | null, callTo?: any | null, callData?: any | null, idx?: any | null, nonce?: any | null, xcalledCaller?: any | null, xcalledTransactingAmount?: any | null, xcalledLocalAmount?: any | null, xcalledTransactingAsset?: any | null, xcalledLocalAsset?: any | null, xcalledTransactionHash?: any | null, xcalledTimestamp?: any | null, xcalledGasPrice?: any | null, xcalledGasLimit?: any | null, xcalledBlockNumber?: any | null, executedCaller?: any | null, executedTransactingAmount?: any | null, executedLocalAmount?: any | null, executedTransactingAsset?: any | null, executedLocalAsset?: any | null, executedTransactionHash?: any | null, executedTimestamp?: any | null, executedGasPrice?: any | null, executedGasLimit?: any | null, executedBlockNumber?: any | null, reconciledCaller?: any | null, reconciledLocalAsset?: any | null, reconciledLocalAmount?: any | null, reconciledTransactionHash?: any | null, reconciledTimestamp?: any | null, reconciledGasPrice?: any | null, reconciledGasLimit?: any | null, reconciledBlockNumber?: any | null, router?: { __typename?: 'Router', id: string } | null }> };

export type GetXCalledTransfersQueryVariables = Exact<{
  originDomain: Scalars['BigInt'];
  destinationDomains?: InputMaybe<Array<Scalars['BigInt']> | Scalars['BigInt']>;
  maxXCallBlockNumber: Scalars['BigInt'];
  nonce: Scalars['BigInt'];
}>;


export type GetXCalledTransfersQuery = { __typename?: 'Query', transfers: Array<{ __typename?: 'Transfer', id: string, originDomain?: any | null, destinationDomain?: any | null, chainId?: any | null, status?: TransferStatus | null, to?: any | null, transferId?: any | null, callTo?: any | null, callData?: any | null, idx?: any | null, nonce?: any | null, xcalledCaller?: any | null, xcalledTransactingAmount?: any | null, xcalledLocalAmount?: any | null, xcalledTransactingAsset?: any | null, xcalledLocalAsset?: any | null, xcalledTransactionHash?: any | null, xcalledTimestamp?: any | null, xcalledGasPrice?: any | null, xcalledGasLimit?: any | null, xcalledBlockNumber?: any | null, executedCaller?: any | null, executedTransactingAmount?: any | null, executedLocalAmount?: any | null, executedTransactingAsset?: any | null, executedLocalAsset?: any | null, executedTransactionHash?: any | null, executedTimestamp?: any | null, executedGasPrice?: any | null, executedGasLimit?: any | null, executedBlockNumber?: any | null, reconciledCaller?: any | null, reconciledLocalAsset?: any | null, reconciledLocalAmount?: any | null, reconciledTransactionHash?: any | null, reconciledTimestamp?: any | null, reconciledGasPrice?: any | null, reconciledGasLimit?: any | null, reconciledBlockNumber?: any | null, router?: { __typename?: 'Router', id: string } | null }> };

export type GetTransferQueryVariables = Exact<{
  transferId: Scalars['Bytes'];
}>;


export type GetTransferQuery = { __typename?: 'Query', transfers: Array<{ __typename?: 'Transfer', id: string, originDomain?: any | null, destinationDomain?: any | null, chainId?: any | null, status?: TransferStatus | null, to?: any | null, transferId?: any | null, callTo?: any | null, callData?: any | null, idx?: any | null, nonce?: any | null, xcalledCaller?: any | null, xcalledTransactingAmount?: any | null, xcalledLocalAmount?: any | null, xcalledTransactingAsset?: any | null, xcalledLocalAsset?: any | null, xcalledTransactionHash?: any | null, xcalledTimestamp?: any | null, xcalledGasPrice?: any | null, xcalledGasLimit?: any | null, xcalledBlockNumber?: any | null, executedCaller?: any | null, executedTransactingAmount?: any | null, executedLocalAmount?: any | null, executedTransactingAsset?: any | null, executedLocalAsset?: any | null, executedTransactionHash?: any | null, executedTimestamp?: any | null, executedGasPrice?: any | null, executedGasLimit?: any | null, executedBlockNumber?: any | null, reconciledCaller?: any | null, reconciledLocalAsset?: any | null, reconciledLocalAmount?: any | null, reconciledTransactionHash?: any | null, reconciledTimestamp?: any | null, reconciledGasPrice?: any | null, reconciledGasLimit?: any | null, reconciledBlockNumber?: any | null, router?: { __typename?: 'Router', id: string } | null }> };

export type GetExecutedTransfersByIdsQueryVariables = Exact<{
  transferIds?: InputMaybe<Array<Scalars['Bytes']> | Scalars['Bytes']>;
  maxExecutedBlockNumber: Scalars['BigInt'];
}>;


export type GetExecutedTransfersByIdsQuery = { __typename?: 'Query', transfers: Array<{ __typename?: 'Transfer', id: string, originDomain?: any | null, destinationDomain?: any | null, chainId?: any | null, status?: TransferStatus | null, to?: any | null, transferId?: any | null, callTo?: any | null, callData?: any | null, idx?: any | null, nonce?: any | null, xcalledTransactingAsset?: any | null, xcalledLocalAsset?: any | null, xcalledTransactingAmount?: any | null, xcalledLocalAmount?: any | null, xcalledCaller?: any | null, xcalledTransactionHash?: any | null, xcalledTimestamp?: any | null, xcalledGasPrice?: any | null, xcalledGasLimit?: any | null, xcalledBlockNumber?: any | null, executedCaller?: any | null, executedTransactingAmount?: any | null, executedLocalAmount?: any | null, executedTransactingAsset?: any | null, executedLocalAsset?: any | null, executedTransactionHash?: any | null, executedTimestamp?: any | null, executedGasPrice?: any | null, executedGasLimit?: any | null, executedBlockNumber?: any | null, reconciledCaller?: any | null, reconciledLocalAsset?: any | null, reconciledLocalAmount?: any | null, reconciledTransactionHash?: any | null, reconciledTimestamp?: any | null, reconciledGasPrice?: any | null, reconciledGasLimit?: any | null, reconciledBlockNumber?: any | null, router?: { __typename?: 'Router', id: string } | null }> };

export type GetReconciledTransfersByIdsQueryVariables = Exact<{
  transferIds?: InputMaybe<Array<Scalars['Bytes']> | Scalars['Bytes']>;
  maxReconciledBlockNumber: Scalars['BigInt'];
}>;


export type GetReconciledTransfersByIdsQuery = { __typename?: 'Query', transfers: Array<{ __typename?: 'Transfer', id: string, originDomain?: any | null, destinationDomain?: any | null, chainId?: any | null, status?: TransferStatus | null, to?: any | null, transferId?: any | null, callTo?: any | null, callData?: any | null, idx?: any | null, nonce?: any | null, xcalledTransactingAsset?: any | null, xcalledLocalAsset?: any | null, xcalledTransactingAmount?: any | null, xcalledLocalAmount?: any | null, xcalledCaller?: any | null, xcalledTransactionHash?: any | null, xcalledTimestamp?: any | null, xcalledGasPrice?: any | null, xcalledGasLimit?: any | null, xcalledBlockNumber?: any | null, executedCaller?: any | null, executedTransactingAmount?: any | null, executedLocalAmount?: any | null, executedTransactingAsset?: any | null, executedLocalAsset?: any | null, executedTransactionHash?: any | null, executedTimestamp?: any | null, executedGasPrice?: any | null, executedGasLimit?: any | null, executedBlockNumber?: any | null, reconciledCaller?: any | null, reconciledLocalAsset?: any | null, reconciledLocalAmount?: any | null, reconciledTransactionHash?: any | null, reconciledTimestamp?: any | null, reconciledGasPrice?: any | null, reconciledGasLimit?: any | null, reconciledBlockNumber?: any | null, router?: { __typename?: 'Router', id: string } | null }> };

export type GetTransfersStatusQueryVariables = Exact<{
  transferIds?: InputMaybe<Array<Scalars['Bytes']> | Scalars['Bytes']>;
}>;


export type GetTransfersStatusQuery = { __typename?: 'Query', transfers: Array<{ __typename?: 'Transfer', id: string, originDomain?: any | null, destinationDomain?: any | null, chainId?: any | null, status?: TransferStatus | null, to?: any | null, transferId?: any | null, callTo?: any | null, callData?: any | null, idx?: any | null, nonce?: any | null, xcalledTransactingAsset?: any | null, xcalledLocalAsset?: any | null, xcalledTransactingAmount?: any | null, xcalledLocalAmount?: any | null, xcalledCaller?: any | null, xcalledTransactionHash?: any | null, xcalledTimestamp?: any | null, xcalledGasPrice?: any | null, xcalledGasLimit?: any | null, xcalledBlockNumber?: any | null, executedCaller?: any | null, executedTransactingAmount?: any | null, executedLocalAmount?: any | null, executedTransactingAsset?: any | null, executedLocalAsset?: any | null, executedTransactionHash?: any | null, executedTimestamp?: any | null, executedGasPrice?: any | null, executedGasLimit?: any | null, executedBlockNumber?: any | null, reconciledCaller?: any | null, reconciledLocalAsset?: any | null, reconciledLocalAmount?: any | null, reconciledTransactionHash?: any | null, reconciledTimestamp?: any | null, reconciledGasPrice?: any | null, reconciledGasLimit?: any | null, reconciledBlockNumber?: any | null, router?: { __typename?: 'Router', id: string } | null }> };

export type GetAssetByLocalQueryVariables = Exact<{
  local: Scalars['Bytes'];
}>;


export type GetAssetByLocalQuery = { __typename?: 'Query', assets: Array<{ __typename?: 'Asset', id: string, local: any, adoptedAsset: any, canonicalId: any, canonicalDomain: any, blockNumber: any }> };

export type GetAssetByCanonicalIdQueryVariables = Exact<{
  canonicalId: Scalars['Bytes'];
}>;


export type GetAssetByCanonicalIdQuery = { __typename?: 'Query', assets: Array<{ __typename?: 'Asset', id: string, local: any, adoptedAsset: any, canonicalId: any, canonicalDomain: any, blockNumber: any }> };

export type GetAssetBalanceQueryVariables = Exact<{
  assetBalanceId: Scalars['ID'];
}>;


export type GetAssetBalanceQuery = { __typename?: 'Query', assetBalance?: { __typename?: 'AssetBalance', amount: any, asset: { __typename?: 'Asset', canonicalId: any, canonicalDomain: any, local: any, adoptedAsset: any, blockNumber: any } } | null };

export type GetAssetBalancesQueryVariables = Exact<{
  router: Scalars['String'];
}>;


export type GetAssetBalancesQuery = { __typename?: 'Query', assetBalances: Array<{ __typename?: 'AssetBalance', amount: any, asset: { __typename?: 'Asset', canonicalId: any, canonicalDomain: any, local: any, adoptedAsset: any, blockNumber: any } }> };

export type GetRouterQueryVariables = Exact<{
  router: Scalars['ID'];
}>;


export type GetRouterQuery = { __typename?: 'Query', router?: { __typename?: 'Router', id: string } | null };


export const GetTransfersDocument = gql`
    query GetTransfers($originDomain: BigInt!, $destinationDomains: [BigInt!], $nonce: BigInt!) {
  transfers(
    where: {destinationDomain_in: $destinationDomains, nonce_gte: $nonce, originDomain: $originDomain}
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
    xcalledTransactingAmount
    xcalledLocalAmount
    xcalledTransactingAsset
    xcalledLocalAsset
    xcalledTransactionHash
    xcalledTimestamp
    xcalledGasPrice
    xcalledGasLimit
    xcalledBlockNumber
    executedCaller
    executedTransactingAmount
    executedLocalAmount
    executedTransactingAsset
    executedLocalAsset
    executedTransactionHash
    executedTimestamp
    executedGasPrice
    executedGasLimit
    executedBlockNumber
    reconciledCaller
    reconciledLocalAsset
    reconciledLocalAmount
    reconciledTransactionHash
    reconciledTimestamp
    reconciledGasPrice
    reconciledGasLimit
    reconciledBlockNumber
  }
}
    `;
export const GetXCalledTransfersDocument = gql`
    query GetXCalledTransfers($originDomain: BigInt!, $destinationDomains: [BigInt!], $maxXCallBlockNumber: BigInt!, $nonce: BigInt!) {
  transfers(
    where: {originDomain: $originDomain, status: XCalled, destinationDomain_in: $destinationDomains, xcalledBlockNumber_lte: $maxXCallBlockNumber, nonce_gte: $nonce}
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
    xcalledTransactingAmount
    xcalledLocalAmount
    xcalledTransactingAsset
    xcalledLocalAsset
    xcalledTransactionHash
    xcalledTimestamp
    xcalledGasPrice
    xcalledGasLimit
    xcalledBlockNumber
    executedCaller
    executedTransactingAmount
    executedLocalAmount
    executedTransactingAsset
    executedLocalAsset
    executedTransactionHash
    executedTimestamp
    executedGasPrice
    executedGasLimit
    executedBlockNumber
    reconciledCaller
    reconciledLocalAsset
    reconciledLocalAmount
    reconciledTransactionHash
    reconciledTimestamp
    reconciledGasPrice
    reconciledGasLimit
    reconciledBlockNumber
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
    xcalledTransactingAmount
    xcalledLocalAmount
    xcalledTransactingAsset
    xcalledLocalAsset
    xcalledTransactionHash
    xcalledTimestamp
    xcalledGasPrice
    xcalledGasLimit
    xcalledBlockNumber
    executedCaller
    executedTransactingAmount
    executedLocalAmount
    executedTransactingAsset
    executedLocalAsset
    executedTransactionHash
    executedTimestamp
    executedGasPrice
    executedGasLimit
    executedBlockNumber
    reconciledCaller
    reconciledLocalAsset
    reconciledLocalAmount
    reconciledTransactionHash
    reconciledTimestamp
    reconciledGasPrice
    reconciledGasLimit
    reconciledBlockNumber
  }
}
    `;
export const GetExecutedTransfersByIdsDocument = gql`
    query GetExecutedTransfersByIds($transferIds: [Bytes!], $maxExecutedBlockNumber: BigInt!) {
  transfers(
    where: {transferId_in: $transferIds, executedBlockNumber_lte: $maxExecutedBlockNumber, status_in: [Executed]}
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
    xcalledTransactingAsset
    xcalledLocalAsset
    xcalledTransactingAmount
    xcalledLocalAmount
    xcalledCaller
    xcalledTransactionHash
    xcalledTimestamp
    xcalledGasPrice
    xcalledGasLimit
    xcalledBlockNumber
    executedCaller
    executedTransactingAmount
    executedLocalAmount
    executedTransactingAsset
    executedLocalAsset
    executedTransactionHash
    executedTimestamp
    executedGasPrice
    executedGasLimit
    executedBlockNumber
    reconciledCaller
    reconciledLocalAsset
    reconciledLocalAmount
    reconciledTransactionHash
    reconciledTimestamp
    reconciledGasPrice
    reconciledGasLimit
    reconciledBlockNumber
  }
}
    `;
export const GetReconciledTransfersByIdsDocument = gql`
    query GetReconciledTransfersByIds($transferIds: [Bytes!], $maxReconciledBlockNumber: BigInt!) {
  transfers(
    where: {transferId_in: $transferIds, reconciledBlockNumber_lte: $maxReconciledBlockNumber, status_in: [Reconciled]}
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
    xcalledTransactingAsset
    xcalledLocalAsset
    xcalledTransactingAmount
    xcalledLocalAmount
    xcalledCaller
    xcalledTransactionHash
    xcalledTimestamp
    xcalledGasPrice
    xcalledGasLimit
    xcalledBlockNumber
    executedCaller
    executedTransactingAmount
    executedLocalAmount
    executedTransactingAsset
    executedLocalAsset
    executedTransactionHash
    executedTimestamp
    executedGasPrice
    executedGasLimit
    executedBlockNumber
    reconciledCaller
    reconciledLocalAsset
    reconciledLocalAmount
    reconciledTransactionHash
    reconciledTimestamp
    reconciledGasPrice
    reconciledGasLimit
    reconciledBlockNumber
  }
}
    `;
export const GetTransfersStatusDocument = gql`
    query GetTransfersStatus($transferIds: [Bytes!]) {
  transfers(
    where: {transferId_in: $transferIds, status_in: [Executed, Reconciled]}
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
    xcalledTransactingAsset
    xcalledLocalAsset
    xcalledTransactingAmount
    xcalledLocalAmount
    xcalledCaller
    xcalledTransactionHash
    xcalledTimestamp
    xcalledGasPrice
    xcalledGasLimit
    xcalledBlockNumber
    executedCaller
    executedTransactingAmount
    executedLocalAmount
    executedTransactingAsset
    executedLocalAsset
    executedTransactionHash
    executedTimestamp
    executedGasPrice
    executedGasLimit
    executedBlockNumber
    reconciledCaller
    reconciledLocalAsset
    reconciledLocalAmount
    reconciledTransactionHash
    reconciledTimestamp
    reconciledGasPrice
    reconciledGasLimit
    reconciledBlockNumber
  }
}
    `;
export const GetAssetByLocalDocument = gql`
    query GetAssetByLocal($local: Bytes!) {
  assets(where: {local: $local}) {
    id
    local
    adoptedAsset
    canonicalId
    canonicalDomain
    blockNumber
  }
}
    `;
export const GetAssetByCanonicalIdDocument = gql`
    query GetAssetByCanonicalId($canonicalId: Bytes!) {
  assets(
    where: {canonicalId: $canonicalId}
    orderBy: blockNumber
    orderDirection: desc
  ) {
    id
    local
    adoptedAsset
    canonicalId
    canonicalDomain
    blockNumber
  }
}
    `;
export const GetAssetBalanceDocument = gql`
    query GetAssetBalance($assetBalanceId: ID!) {
  assetBalance(id: $assetBalanceId) {
    amount
    asset {
      canonicalId
      canonicalDomain
      local
      adoptedAsset
      blockNumber
    }
  }
}
    `;
export const GetAssetBalancesDocument = gql`
    query GetAssetBalances($router: String!) {
  assetBalances(where: {router: $router}) {
    amount
    asset {
      canonicalId
      canonicalDomain
      local
      adoptedAsset
      blockNumber
    }
  }
}
    `;
export const GetRouterDocument = gql`
    query GetRouter($router: ID!) {
  router(id: $router) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetTransfers(variables: GetTransfersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTransfersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTransfersQuery>(GetTransfersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTransfers', 'query');
    },
    GetXCalledTransfers(variables: GetXCalledTransfersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetXCalledTransfersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetXCalledTransfersQuery>(GetXCalledTransfersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetXCalledTransfers', 'query');
    },
    GetTransfer(variables: GetTransferQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTransferQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTransferQuery>(GetTransferDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTransfer', 'query');
    },
    GetExecutedTransfersByIds(variables: GetExecutedTransfersByIdsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetExecutedTransfersByIdsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetExecutedTransfersByIdsQuery>(GetExecutedTransfersByIdsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetExecutedTransfersByIds', 'query');
    },
    GetReconciledTransfersByIds(variables: GetReconciledTransfersByIdsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetReconciledTransfersByIdsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetReconciledTransfersByIdsQuery>(GetReconciledTransfersByIdsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetReconciledTransfersByIds', 'query');
    },
    GetTransfersStatus(variables?: GetTransfersStatusQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTransfersStatusQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTransfersStatusQuery>(GetTransfersStatusDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTransfersStatus', 'query');
    },
    GetAssetByLocal(variables: GetAssetByLocalQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAssetByLocalQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAssetByLocalQuery>(GetAssetByLocalDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAssetByLocal', 'query');
    },
    GetAssetByCanonicalId(variables: GetAssetByCanonicalIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAssetByCanonicalIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAssetByCanonicalIdQuery>(GetAssetByCanonicalIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAssetByCanonicalId', 'query');
    },
    GetAssetBalance(variables: GetAssetBalanceQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAssetBalanceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAssetBalanceQuery>(GetAssetBalanceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAssetBalance', 'query');
    },
    GetAssetBalances(variables: GetAssetBalancesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAssetBalancesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAssetBalancesQuery>(GetAssetBalancesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAssetBalances', 'query');
    },
    GetRouter(variables: GetRouterQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetRouterQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetRouterQuery>(GetRouterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetRouter', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;