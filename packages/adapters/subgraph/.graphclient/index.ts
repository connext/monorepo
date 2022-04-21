// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Rinkeby_BigDecimal: any;
  BigInt: any;
  Rinkeby_Bytes: any;
  Kovan_BigDecimal: any;
  Kovan_Bytes: any;
};

export type Query = {
  Rinkeby_asset?: Maybe<Rinkeby_Asset>;
  Rinkeby_assets: Array<Rinkeby_Asset>;
  Rinkeby_assetBalance?: Maybe<Rinkeby_AssetBalance>;
  Rinkeby_assetBalances: Array<Rinkeby_AssetBalance>;
  Rinkeby_router?: Maybe<Rinkeby_Router>;
  Rinkeby_routers: Array<Rinkeby_Router>;
  Rinkeby_transfer?: Maybe<Rinkeby_Transfer>;
  Rinkeby_transfers: Array<Rinkeby_Transfer>;
  /** Access to subgraph metadata */
  Rinkeby__meta?: Maybe<Rinkeby__Meta_>;
  Kovan_asset?: Maybe<Kovan_Asset>;
  Kovan_assets: Array<Kovan_Asset>;
  Kovan_assetBalance?: Maybe<Kovan_AssetBalance>;
  Kovan_assetBalances: Array<Kovan_AssetBalance>;
  Kovan_router?: Maybe<Kovan_Router>;
  Kovan_routers: Array<Kovan_Router>;
  Kovan_transfer?: Maybe<Kovan_Transfer>;
  Kovan_transfers: Array<Kovan_Transfer>;
  /** Access to subgraph metadata */
  Kovan__meta?: Maybe<Kovan__Meta_>;
};


export type QueryRinkeby_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRinkeby_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rinkeby_Asset_orderBy>;
  orderDirection?: InputMaybe<Rinkeby_OrderDirection>;
  where?: InputMaybe<Rinkeby_Asset_filter>;
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRinkeby_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRinkeby_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rinkeby_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<Rinkeby_OrderDirection>;
  where?: InputMaybe<Rinkeby_AssetBalance_filter>;
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRinkeby_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRinkeby_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rinkeby_Router_orderBy>;
  orderDirection?: InputMaybe<Rinkeby_OrderDirection>;
  where?: InputMaybe<Rinkeby_Router_filter>;
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRinkeby_transferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRinkeby_transfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rinkeby_Transfer_orderBy>;
  orderDirection?: InputMaybe<Rinkeby_OrderDirection>;
  where?: InputMaybe<Rinkeby_Transfer_filter>;
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRinkeby__metaArgs = {
  block?: InputMaybe<Rinkeby_Block_height>;
};


export type QueryKovan_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryKovan_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Kovan_Asset_orderBy>;
  orderDirection?: InputMaybe<Kovan_OrderDirection>;
  where?: InputMaybe<Kovan_Asset_filter>;
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryKovan_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryKovan_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Kovan_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<Kovan_OrderDirection>;
  where?: InputMaybe<Kovan_AssetBalance_filter>;
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryKovan_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryKovan_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Kovan_Router_orderBy>;
  orderDirection?: InputMaybe<Kovan_OrderDirection>;
  where?: InputMaybe<Kovan_Router_filter>;
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryKovan_transferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryKovan_transfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Kovan_Transfer_orderBy>;
  orderDirection?: InputMaybe<Kovan_OrderDirection>;
  where?: InputMaybe<Kovan_Transfer_filter>;
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryKovan__metaArgs = {
  block?: InputMaybe<Kovan_Block_height>;
};

export type Subscription = {
  Rinkeby_asset?: Maybe<Rinkeby_Asset>;
  Rinkeby_assets: Array<Rinkeby_Asset>;
  Rinkeby_assetBalance?: Maybe<Rinkeby_AssetBalance>;
  Rinkeby_assetBalances: Array<Rinkeby_AssetBalance>;
  Rinkeby_router?: Maybe<Rinkeby_Router>;
  Rinkeby_routers: Array<Rinkeby_Router>;
  Rinkeby_transfer?: Maybe<Rinkeby_Transfer>;
  Rinkeby_transfers: Array<Rinkeby_Transfer>;
  /** Access to subgraph metadata */
  Rinkeby__meta?: Maybe<Rinkeby__Meta_>;
  Kovan_asset?: Maybe<Kovan_Asset>;
  Kovan_assets: Array<Kovan_Asset>;
  Kovan_assetBalance?: Maybe<Kovan_AssetBalance>;
  Kovan_assetBalances: Array<Kovan_AssetBalance>;
  Kovan_router?: Maybe<Kovan_Router>;
  Kovan_routers: Array<Kovan_Router>;
  Kovan_transfer?: Maybe<Kovan_Transfer>;
  Kovan_transfers: Array<Kovan_Transfer>;
  /** Access to subgraph metadata */
  Kovan__meta?: Maybe<Kovan__Meta_>;
};


export type SubscriptionRinkeby_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRinkeby_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rinkeby_Asset_orderBy>;
  orderDirection?: InputMaybe<Rinkeby_OrderDirection>;
  where?: InputMaybe<Rinkeby_Asset_filter>;
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRinkeby_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRinkeby_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rinkeby_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<Rinkeby_OrderDirection>;
  where?: InputMaybe<Rinkeby_AssetBalance_filter>;
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRinkeby_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRinkeby_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rinkeby_Router_orderBy>;
  orderDirection?: InputMaybe<Rinkeby_OrderDirection>;
  where?: InputMaybe<Rinkeby_Router_filter>;
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRinkeby_transferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRinkeby_transfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rinkeby_Transfer_orderBy>;
  orderDirection?: InputMaybe<Rinkeby_OrderDirection>;
  where?: InputMaybe<Rinkeby_Transfer_filter>;
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRinkeby__metaArgs = {
  block?: InputMaybe<Rinkeby_Block_height>;
};


export type SubscriptionKovan_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionKovan_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Kovan_Asset_orderBy>;
  orderDirection?: InputMaybe<Kovan_OrderDirection>;
  where?: InputMaybe<Kovan_Asset_filter>;
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionKovan_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionKovan_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Kovan_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<Kovan_OrderDirection>;
  where?: InputMaybe<Kovan_AssetBalance_filter>;
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionKovan_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionKovan_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Kovan_Router_orderBy>;
  orderDirection?: InputMaybe<Kovan_OrderDirection>;
  where?: InputMaybe<Kovan_Router_filter>;
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionKovan_transferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionKovan_transfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Kovan_Transfer_orderBy>;
  orderDirection?: InputMaybe<Kovan_OrderDirection>;
  where?: InputMaybe<Kovan_Transfer_filter>;
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionKovan__metaArgs = {
  block?: InputMaybe<Kovan_Block_height>;
};

export type Rinkeby_Asset = {
  id: Scalars['ID'];
  local: Scalars['Rinkeby_Bytes'];
  adoptedAsset: Scalars['Rinkeby_Bytes'];
  canonicalId: Scalars['Rinkeby_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type Rinkeby_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: Rinkeby_Router;
  asset: Rinkeby_Asset;
};

export type Rinkeby_AssetBalance_filter = {
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
  asset?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<Rinkeby_BlockChangedFilter>;
};

export type Rinkeby_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type Rinkeby_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  local?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  local_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  local_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  local_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  local_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  local_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  adoptedAsset?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  canonicalId?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<Rinkeby_BlockChangedFilter>;
};

export type Rinkeby_Asset_orderBy =
  | 'id'
  | 'local'
  | 'adoptedAsset'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'blockNumber';

export type Rinkeby_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Rinkeby_Block_height = {
  hash?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export type Rinkeby_OrderDirection =
  | 'asc'
  | 'desc';

export type Rinkeby_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['Rinkeby_Bytes']>;
  recipient?: Maybe<Scalars['Rinkeby_Bytes']>;
  proposedOwner?: Maybe<Scalars['Rinkeby_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<Rinkeby_AssetBalance>;
  transfers: Array<Rinkeby_Transfer>;
};


export type Rinkeby_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rinkeby_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<Rinkeby_OrderDirection>;
  where?: InputMaybe<Rinkeby_AssetBalance_filter>;
};


export type Rinkeby_RoutertransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rinkeby_Transfer_orderBy>;
  orderDirection?: InputMaybe<Rinkeby_OrderDirection>;
  where?: InputMaybe<Rinkeby_Transfer_filter>;
};

export type Rinkeby_Router_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  owner?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  owner_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  recipient?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  recipient_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<Rinkeby_BlockChangedFilter>;
};

export type Rinkeby_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances'
  | 'transfers';

export type Rinkeby_Transfer = {
  id: Scalars['ID'];
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  chainId?: Maybe<Scalars['BigInt']>;
  status?: Maybe<Rinkeby_TransferStatus>;
  to?: Maybe<Scalars['Rinkeby_Bytes']>;
  transferId?: Maybe<Scalars['Rinkeby_Bytes']>;
  callTo?: Maybe<Scalars['Rinkeby_Bytes']>;
  callData?: Maybe<Scalars['Rinkeby_Bytes']>;
  idx?: Maybe<Scalars['BigInt']>;
  nonce?: Maybe<Scalars['BigInt']>;
  router?: Maybe<Rinkeby_Router>;
  xcalledTransactingAsset?: Maybe<Scalars['Rinkeby_Bytes']>;
  xcalledLocalAsset?: Maybe<Scalars['Rinkeby_Bytes']>;
  xcalledTransactingAmount?: Maybe<Scalars['BigInt']>;
  xcalledLocalAmount?: Maybe<Scalars['BigInt']>;
  xcalledCaller?: Maybe<Scalars['Rinkeby_Bytes']>;
  xcalledTransactionHash?: Maybe<Scalars['Rinkeby_Bytes']>;
  xcalledTimestamp?: Maybe<Scalars['BigInt']>;
  xcalledGasPrice?: Maybe<Scalars['BigInt']>;
  xcalledGasLimit?: Maybe<Scalars['BigInt']>;
  xcalledBlockNumber?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['Rinkeby_Bytes']>;
  executedTransactingAmount?: Maybe<Scalars['BigInt']>;
  executedLocalAmount?: Maybe<Scalars['BigInt']>;
  executedTransactingAsset?: Maybe<Scalars['Rinkeby_Bytes']>;
  executedLocalAsset?: Maybe<Scalars['Rinkeby_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['Rinkeby_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['Rinkeby_Bytes']>;
  reconciledLocalAsset?: Maybe<Scalars['Rinkeby_Bytes']>;
  reconciledLocalAmount?: Maybe<Scalars['BigInt']>;
  reconciledTransactionHash?: Maybe<Scalars['Rinkeby_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};

export type Rinkeby_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled';

export type Rinkeby_Transfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<Rinkeby_TransferStatus>;
  status_not?: InputMaybe<Rinkeby_TransferStatus>;
  status_in?: InputMaybe<Array<Rinkeby_TransferStatus>>;
  status_not_in?: InputMaybe<Array<Rinkeby_TransferStatus>>;
  to?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  to_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  to_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  transferId?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  transferId_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  callTo?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  callTo_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  callTo_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  callTo_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  callTo_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  callTo_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  callData?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  callData_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  idx?: InputMaybe<Scalars['BigInt']>;
  idx_not?: InputMaybe<Scalars['BigInt']>;
  idx_gt?: InputMaybe<Scalars['BigInt']>;
  idx_lt?: InputMaybe<Scalars['BigInt']>;
  idx_gte?: InputMaybe<Scalars['BigInt']>;
  idx_lte?: InputMaybe<Scalars['BigInt']>;
  idx_in?: InputMaybe<Array<Scalars['BigInt']>>;
  idx_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  xcalledTransactingAsset?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledTransactingAsset_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledTransactingAsset_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  xcalledTransactingAsset_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  xcalledTransactingAsset_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledTransactingAsset_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledLocalAsset?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledLocalAsset_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledLocalAsset_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  xcalledLocalAsset_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  xcalledLocalAsset_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledLocalAsset_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledTransactingAmount?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTransactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledLocalAmount?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledCaller?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledCaller_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledCaller_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  xcalledCaller_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  xcalledCaller_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledCaller_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledTransactionHash?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledTransactionHash_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledTransactionHash_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  xcalledTransactionHash_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  xcalledTransactionHash_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledTransactionHash_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledTimestamp?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasPrice?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasLimit?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedTransactingAmount?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTransactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedLocalAmount?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTransactingAsset?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedTransactingAsset_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedTransactingAsset_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  executedTransactingAsset_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  executedTransactingAsset_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedTransactingAsset_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedLocalAsset?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedLocalAsset_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedLocalAsset_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  executedLocalAsset_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  executedLocalAsset_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedLocalAsset_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedTimestamp?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledLocalAsset?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledLocalAsset_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledLocalAsset_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  reconciledLocalAsset_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  reconciledLocalAsset_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledLocalAsset_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledLocalAmount?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTransactionHash?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledTimestamp?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<Rinkeby_BlockChangedFilter>;
};

export type Rinkeby_Transfer_orderBy =
  | 'id'
  | 'originDomain'
  | 'destinationDomain'
  | 'chainId'
  | 'status'
  | 'to'
  | 'transferId'
  | 'callTo'
  | 'callData'
  | 'idx'
  | 'nonce'
  | 'router'
  | 'xcalledTransactingAsset'
  | 'xcalledLocalAsset'
  | 'xcalledTransactingAmount'
  | 'xcalledLocalAmount'
  | 'xcalledCaller'
  | 'xcalledTransactionHash'
  | 'xcalledTimestamp'
  | 'xcalledGasPrice'
  | 'xcalledGasLimit'
  | 'xcalledBlockNumber'
  | 'executedCaller'
  | 'executedTransactingAmount'
  | 'executedLocalAmount'
  | 'executedTransactingAsset'
  | 'executedLocalAsset'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'reconciledCaller'
  | 'reconciledLocalAsset'
  | 'reconciledLocalAmount'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber';

export type Rinkeby__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Rinkeby_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type Rinkeby__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: Rinkeby__Block_;
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

export type Kovan_Asset = {
  id: Scalars['ID'];
  local: Scalars['Kovan_Bytes'];
  adoptedAsset: Scalars['Kovan_Bytes'];
  canonicalId: Scalars['Kovan_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type Kovan_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: Kovan_Router;
  asset: Kovan_Asset;
};

export type Kovan_AssetBalance_filter = {
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
  asset?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<Kovan_BlockChangedFilter>;
};

export type Kovan_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type Kovan_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  local?: InputMaybe<Scalars['Kovan_Bytes']>;
  local_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  local_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  local_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  local_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  local_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  adoptedAsset?: InputMaybe<Scalars['Kovan_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  canonicalId?: InputMaybe<Scalars['Kovan_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<Kovan_BlockChangedFilter>;
};

export type Kovan_Asset_orderBy =
  | 'id'
  | 'local'
  | 'adoptedAsset'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'blockNumber';

export type Kovan_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Kovan_Block_height = {
  hash?: InputMaybe<Scalars['Kovan_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export type Kovan_OrderDirection =
  | 'asc'
  | 'desc';

export type Kovan_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['Kovan_Bytes']>;
  recipient?: Maybe<Scalars['Kovan_Bytes']>;
  proposedOwner?: Maybe<Scalars['Kovan_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<Kovan_AssetBalance>;
  transfers: Array<Kovan_Transfer>;
};


export type Kovan_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Kovan_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<Kovan_OrderDirection>;
  where?: InputMaybe<Kovan_AssetBalance_filter>;
};


export type Kovan_RoutertransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Kovan_Transfer_orderBy>;
  orderDirection?: InputMaybe<Kovan_OrderDirection>;
  where?: InputMaybe<Kovan_Transfer_filter>;
};

export type Kovan_Router_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  owner?: InputMaybe<Scalars['Kovan_Bytes']>;
  owner_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  recipient?: InputMaybe<Scalars['Kovan_Bytes']>;
  recipient_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['Kovan_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<Kovan_BlockChangedFilter>;
};

export type Kovan_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances'
  | 'transfers';

export type Kovan_Transfer = {
  id: Scalars['ID'];
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  chainId?: Maybe<Scalars['BigInt']>;
  status?: Maybe<Kovan_TransferStatus>;
  to?: Maybe<Scalars['Kovan_Bytes']>;
  transferId?: Maybe<Scalars['Kovan_Bytes']>;
  callTo?: Maybe<Scalars['Kovan_Bytes']>;
  callData?: Maybe<Scalars['Kovan_Bytes']>;
  idx?: Maybe<Scalars['BigInt']>;
  nonce?: Maybe<Scalars['BigInt']>;
  router?: Maybe<Kovan_Router>;
  xcalledTransactingAsset?: Maybe<Scalars['Kovan_Bytes']>;
  xcalledLocalAsset?: Maybe<Scalars['Kovan_Bytes']>;
  xcalledTransactingAmount?: Maybe<Scalars['BigInt']>;
  xcalledLocalAmount?: Maybe<Scalars['BigInt']>;
  xcalledCaller?: Maybe<Scalars['Kovan_Bytes']>;
  xcalledTransactionHash?: Maybe<Scalars['Kovan_Bytes']>;
  xcalledTimestamp?: Maybe<Scalars['BigInt']>;
  xcalledGasPrice?: Maybe<Scalars['BigInt']>;
  xcalledGasLimit?: Maybe<Scalars['BigInt']>;
  xcalledBlockNumber?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['Kovan_Bytes']>;
  executedTransactingAmount?: Maybe<Scalars['BigInt']>;
  executedLocalAmount?: Maybe<Scalars['BigInt']>;
  executedTransactingAsset?: Maybe<Scalars['Kovan_Bytes']>;
  executedLocalAsset?: Maybe<Scalars['Kovan_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['Kovan_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['Kovan_Bytes']>;
  reconciledLocalAsset?: Maybe<Scalars['Kovan_Bytes']>;
  reconciledLocalAmount?: Maybe<Scalars['BigInt']>;
  reconciledTransactionHash?: Maybe<Scalars['Kovan_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};

export type Kovan_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled';

export type Kovan_Transfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<Kovan_TransferStatus>;
  status_not?: InputMaybe<Kovan_TransferStatus>;
  status_in?: InputMaybe<Array<Kovan_TransferStatus>>;
  status_not_in?: InputMaybe<Array<Kovan_TransferStatus>>;
  to?: InputMaybe<Scalars['Kovan_Bytes']>;
  to_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  to_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  transferId?: InputMaybe<Scalars['Kovan_Bytes']>;
  transferId_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  callTo?: InputMaybe<Scalars['Kovan_Bytes']>;
  callTo_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  callTo_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  callTo_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  callTo_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  callTo_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  callData?: InputMaybe<Scalars['Kovan_Bytes']>;
  callData_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  idx?: InputMaybe<Scalars['BigInt']>;
  idx_not?: InputMaybe<Scalars['BigInt']>;
  idx_gt?: InputMaybe<Scalars['BigInt']>;
  idx_lt?: InputMaybe<Scalars['BigInt']>;
  idx_gte?: InputMaybe<Scalars['BigInt']>;
  idx_lte?: InputMaybe<Scalars['BigInt']>;
  idx_in?: InputMaybe<Array<Scalars['BigInt']>>;
  idx_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  xcalledTransactingAsset?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledTransactingAsset_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledTransactingAsset_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  xcalledTransactingAsset_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  xcalledTransactingAsset_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledTransactingAsset_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledLocalAsset?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledLocalAsset_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledLocalAsset_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  xcalledLocalAsset_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  xcalledLocalAsset_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledLocalAsset_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledTransactingAmount?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTransactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledLocalAmount?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledCaller?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledCaller_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledCaller_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  xcalledCaller_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  xcalledCaller_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledCaller_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledTransactionHash?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledTransactionHash_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledTransactionHash_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  xcalledTransactionHash_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  xcalledTransactionHash_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledTransactionHash_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledTimestamp?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasPrice?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasLimit?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedTransactingAmount?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTransactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedLocalAmount?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTransactingAsset?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedTransactingAsset_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedTransactingAsset_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  executedTransactingAsset_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  executedTransactingAsset_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedTransactingAsset_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedLocalAsset?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedLocalAsset_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedLocalAsset_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  executedLocalAsset_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  executedLocalAsset_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedLocalAsset_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedTimestamp?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledLocalAsset?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledLocalAsset_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledLocalAsset_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  reconciledLocalAsset_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  reconciledLocalAsset_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledLocalAsset_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledLocalAmount?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTransactionHash?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledTimestamp?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<Kovan_BlockChangedFilter>;
};

export type Kovan_Transfer_orderBy =
  | 'id'
  | 'originDomain'
  | 'destinationDomain'
  | 'chainId'
  | 'status'
  | 'to'
  | 'transferId'
  | 'callTo'
  | 'callData'
  | 'idx'
  | 'nonce'
  | 'router'
  | 'xcalledTransactingAsset'
  | 'xcalledLocalAsset'
  | 'xcalledTransactingAmount'
  | 'xcalledLocalAmount'
  | 'xcalledCaller'
  | 'xcalledTransactionHash'
  | 'xcalledTimestamp'
  | 'xcalledGasPrice'
  | 'xcalledGasLimit'
  | 'xcalledBlockNumber'
  | 'executedCaller'
  | 'executedTransactingAmount'
  | 'executedLocalAmount'
  | 'executedTransactingAsset'
  | 'executedLocalAsset'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'reconciledCaller'
  | 'reconciledLocalAsset'
  | 'reconciledLocalAmount'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber';

export type Kovan__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Kovan_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type Kovan__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: Kovan__Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  Rinkeby_Asset: ResolverTypeWrapper<Rinkeby_Asset>;
  Rinkeby_AssetBalance: ResolverTypeWrapper<Rinkeby_AssetBalance>;
  Rinkeby_AssetBalance_filter: Rinkeby_AssetBalance_filter;
  Rinkeby_AssetBalance_orderBy: Rinkeby_AssetBalance_orderBy;
  Rinkeby_Asset_filter: Rinkeby_Asset_filter;
  Rinkeby_Asset_orderBy: Rinkeby_Asset_orderBy;
  Rinkeby_BigDecimal: ResolverTypeWrapper<Scalars['Rinkeby_BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Rinkeby_BlockChangedFilter: Rinkeby_BlockChangedFilter;
  Rinkeby_Block_height: Rinkeby_Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Rinkeby_Bytes: ResolverTypeWrapper<Scalars['Rinkeby_Bytes']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Rinkeby_OrderDirection: Rinkeby_OrderDirection;
  Rinkeby_Router: ResolverTypeWrapper<Rinkeby_Router>;
  Rinkeby_Router_filter: Rinkeby_Router_filter;
  Rinkeby_Router_orderBy: Rinkeby_Router_orderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  Rinkeby_Transfer: ResolverTypeWrapper<Rinkeby_Transfer>;
  Rinkeby_TransferStatus: Rinkeby_TransferStatus;
  Rinkeby_Transfer_filter: Rinkeby_Transfer_filter;
  Rinkeby_Transfer_orderBy: Rinkeby_Transfer_orderBy;
  Rinkeby__Block_: ResolverTypeWrapper<Rinkeby__Block_>;
  Rinkeby__Meta_: ResolverTypeWrapper<Rinkeby__Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
  Kovan_Asset: ResolverTypeWrapper<Kovan_Asset>;
  Kovan_AssetBalance: ResolverTypeWrapper<Kovan_AssetBalance>;
  Kovan_AssetBalance_filter: Kovan_AssetBalance_filter;
  Kovan_AssetBalance_orderBy: Kovan_AssetBalance_orderBy;
  Kovan_Asset_filter: Kovan_Asset_filter;
  Kovan_Asset_orderBy: Kovan_Asset_orderBy;
  Kovan_BigDecimal: ResolverTypeWrapper<Scalars['Kovan_BigDecimal']>;
  Kovan_BlockChangedFilter: Kovan_BlockChangedFilter;
  Kovan_Block_height: Kovan_Block_height;
  Kovan_Bytes: ResolverTypeWrapper<Scalars['Kovan_Bytes']>;
  Kovan_OrderDirection: Kovan_OrderDirection;
  Kovan_Router: ResolverTypeWrapper<Kovan_Router>;
  Kovan_Router_filter: Kovan_Router_filter;
  Kovan_Router_orderBy: Kovan_Router_orderBy;
  Kovan_Transfer: ResolverTypeWrapper<Kovan_Transfer>;
  Kovan_TransferStatus: Kovan_TransferStatus;
  Kovan_Transfer_filter: Kovan_Transfer_filter;
  Kovan_Transfer_orderBy: Kovan_Transfer_orderBy;
  Kovan__Block_: ResolverTypeWrapper<Kovan__Block_>;
  Kovan__Meta_: ResolverTypeWrapper<Kovan__Meta_>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Subscription: {};
  Rinkeby_Asset: Rinkeby_Asset;
  Rinkeby_AssetBalance: Rinkeby_AssetBalance;
  Rinkeby_AssetBalance_filter: Rinkeby_AssetBalance_filter;
  Rinkeby_Asset_filter: Rinkeby_Asset_filter;
  Rinkeby_BigDecimal: Scalars['Rinkeby_BigDecimal'];
  BigInt: Scalars['BigInt'];
  Rinkeby_BlockChangedFilter: Rinkeby_BlockChangedFilter;
  Rinkeby_Block_height: Rinkeby_Block_height;
  Boolean: Scalars['Boolean'];
  Rinkeby_Bytes: Scalars['Rinkeby_Bytes'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Rinkeby_Router: Rinkeby_Router;
  Rinkeby_Router_filter: Rinkeby_Router_filter;
  String: Scalars['String'];
  Rinkeby_Transfer: Rinkeby_Transfer;
  Rinkeby_Transfer_filter: Rinkeby_Transfer_filter;
  Rinkeby__Block_: Rinkeby__Block_;
  Rinkeby__Meta_: Rinkeby__Meta_;
  Kovan_Asset: Kovan_Asset;
  Kovan_AssetBalance: Kovan_AssetBalance;
  Kovan_AssetBalance_filter: Kovan_AssetBalance_filter;
  Kovan_Asset_filter: Kovan_Asset_filter;
  Kovan_BigDecimal: Scalars['Kovan_BigDecimal'];
  Kovan_BlockChangedFilter: Kovan_BlockChangedFilter;
  Kovan_Block_height: Kovan_Block_height;
  Kovan_Bytes: Scalars['Kovan_Bytes'];
  Kovan_Router: Kovan_Router;
  Kovan_Router_filter: Kovan_Router_filter;
  Kovan_Transfer: Kovan_Transfer;
  Kovan_Transfer_filter: Kovan_Transfer_filter;
  Kovan__Block_: Kovan__Block_;
  Kovan__Meta_: Kovan__Meta_;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  Rinkeby_asset?: Resolver<Maybe<ResolversTypes['Rinkeby_Asset']>, ParentType, ContextType, RequireFields<QueryRinkeby_assetArgs, 'id' | 'subgraphError'>>;
  Rinkeby_assets?: Resolver<Array<ResolversTypes['Rinkeby_Asset']>, ParentType, ContextType, RequireFields<QueryRinkeby_assetsArgs, 'skip' | 'first' | 'subgraphError'>>;
  Rinkeby_assetBalance?: Resolver<Maybe<ResolversTypes['Rinkeby_AssetBalance']>, ParentType, ContextType, RequireFields<QueryRinkeby_assetBalanceArgs, 'id' | 'subgraphError'>>;
  Rinkeby_assetBalances?: Resolver<Array<ResolversTypes['Rinkeby_AssetBalance']>, ParentType, ContextType, RequireFields<QueryRinkeby_assetBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  Rinkeby_router?: Resolver<Maybe<ResolversTypes['Rinkeby_Router']>, ParentType, ContextType, RequireFields<QueryRinkeby_routerArgs, 'id' | 'subgraphError'>>;
  Rinkeby_routers?: Resolver<Array<ResolversTypes['Rinkeby_Router']>, ParentType, ContextType, RequireFields<QueryRinkeby_routersArgs, 'skip' | 'first' | 'subgraphError'>>;
  Rinkeby_transfer?: Resolver<Maybe<ResolversTypes['Rinkeby_Transfer']>, ParentType, ContextType, RequireFields<QueryRinkeby_transferArgs, 'id' | 'subgraphError'>>;
  Rinkeby_transfers?: Resolver<Array<ResolversTypes['Rinkeby_Transfer']>, ParentType, ContextType, RequireFields<QueryRinkeby_transfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  Rinkeby__meta?: Resolver<Maybe<ResolversTypes['Rinkeby__Meta_']>, ParentType, ContextType, Partial<QueryRinkeby__metaArgs>>;
  Kovan_asset?: Resolver<Maybe<ResolversTypes['Kovan_Asset']>, ParentType, ContextType, RequireFields<QueryKovan_assetArgs, 'id' | 'subgraphError'>>;
  Kovan_assets?: Resolver<Array<ResolversTypes['Kovan_Asset']>, ParentType, ContextType, RequireFields<QueryKovan_assetsArgs, 'skip' | 'first' | 'subgraphError'>>;
  Kovan_assetBalance?: Resolver<Maybe<ResolversTypes['Kovan_AssetBalance']>, ParentType, ContextType, RequireFields<QueryKovan_assetBalanceArgs, 'id' | 'subgraphError'>>;
  Kovan_assetBalances?: Resolver<Array<ResolversTypes['Kovan_AssetBalance']>, ParentType, ContextType, RequireFields<QueryKovan_assetBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  Kovan_router?: Resolver<Maybe<ResolversTypes['Kovan_Router']>, ParentType, ContextType, RequireFields<QueryKovan_routerArgs, 'id' | 'subgraphError'>>;
  Kovan_routers?: Resolver<Array<ResolversTypes['Kovan_Router']>, ParentType, ContextType, RequireFields<QueryKovan_routersArgs, 'skip' | 'first' | 'subgraphError'>>;
  Kovan_transfer?: Resolver<Maybe<ResolversTypes['Kovan_Transfer']>, ParentType, ContextType, RequireFields<QueryKovan_transferArgs, 'id' | 'subgraphError'>>;
  Kovan_transfers?: Resolver<Array<ResolversTypes['Kovan_Transfer']>, ParentType, ContextType, RequireFields<QueryKovan_transfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  Kovan__meta?: Resolver<Maybe<ResolversTypes['Kovan__Meta_']>, ParentType, ContextType, Partial<QueryKovan__metaArgs>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  Rinkeby_asset?: SubscriptionResolver<Maybe<ResolversTypes['Rinkeby_Asset']>, "Rinkeby_asset", ParentType, ContextType, RequireFields<SubscriptionRinkeby_assetArgs, 'id' | 'subgraphError'>>;
  Rinkeby_assets?: SubscriptionResolver<Array<ResolversTypes['Rinkeby_Asset']>, "Rinkeby_assets", ParentType, ContextType, RequireFields<SubscriptionRinkeby_assetsArgs, 'skip' | 'first' | 'subgraphError'>>;
  Rinkeby_assetBalance?: SubscriptionResolver<Maybe<ResolversTypes['Rinkeby_AssetBalance']>, "Rinkeby_assetBalance", ParentType, ContextType, RequireFields<SubscriptionRinkeby_assetBalanceArgs, 'id' | 'subgraphError'>>;
  Rinkeby_assetBalances?: SubscriptionResolver<Array<ResolversTypes['Rinkeby_AssetBalance']>, "Rinkeby_assetBalances", ParentType, ContextType, RequireFields<SubscriptionRinkeby_assetBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  Rinkeby_router?: SubscriptionResolver<Maybe<ResolversTypes['Rinkeby_Router']>, "Rinkeby_router", ParentType, ContextType, RequireFields<SubscriptionRinkeby_routerArgs, 'id' | 'subgraphError'>>;
  Rinkeby_routers?: SubscriptionResolver<Array<ResolversTypes['Rinkeby_Router']>, "Rinkeby_routers", ParentType, ContextType, RequireFields<SubscriptionRinkeby_routersArgs, 'skip' | 'first' | 'subgraphError'>>;
  Rinkeby_transfer?: SubscriptionResolver<Maybe<ResolversTypes['Rinkeby_Transfer']>, "Rinkeby_transfer", ParentType, ContextType, RequireFields<SubscriptionRinkeby_transferArgs, 'id' | 'subgraphError'>>;
  Rinkeby_transfers?: SubscriptionResolver<Array<ResolversTypes['Rinkeby_Transfer']>, "Rinkeby_transfers", ParentType, ContextType, RequireFields<SubscriptionRinkeby_transfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  Rinkeby__meta?: SubscriptionResolver<Maybe<ResolversTypes['Rinkeby__Meta_']>, "Rinkeby__meta", ParentType, ContextType, Partial<SubscriptionRinkeby__metaArgs>>;
  Kovan_asset?: SubscriptionResolver<Maybe<ResolversTypes['Kovan_Asset']>, "Kovan_asset", ParentType, ContextType, RequireFields<SubscriptionKovan_assetArgs, 'id' | 'subgraphError'>>;
  Kovan_assets?: SubscriptionResolver<Array<ResolversTypes['Kovan_Asset']>, "Kovan_assets", ParentType, ContextType, RequireFields<SubscriptionKovan_assetsArgs, 'skip' | 'first' | 'subgraphError'>>;
  Kovan_assetBalance?: SubscriptionResolver<Maybe<ResolversTypes['Kovan_AssetBalance']>, "Kovan_assetBalance", ParentType, ContextType, RequireFields<SubscriptionKovan_assetBalanceArgs, 'id' | 'subgraphError'>>;
  Kovan_assetBalances?: SubscriptionResolver<Array<ResolversTypes['Kovan_AssetBalance']>, "Kovan_assetBalances", ParentType, ContextType, RequireFields<SubscriptionKovan_assetBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  Kovan_router?: SubscriptionResolver<Maybe<ResolversTypes['Kovan_Router']>, "Kovan_router", ParentType, ContextType, RequireFields<SubscriptionKovan_routerArgs, 'id' | 'subgraphError'>>;
  Kovan_routers?: SubscriptionResolver<Array<ResolversTypes['Kovan_Router']>, "Kovan_routers", ParentType, ContextType, RequireFields<SubscriptionKovan_routersArgs, 'skip' | 'first' | 'subgraphError'>>;
  Kovan_transfer?: SubscriptionResolver<Maybe<ResolversTypes['Kovan_Transfer']>, "Kovan_transfer", ParentType, ContextType, RequireFields<SubscriptionKovan_transferArgs, 'id' | 'subgraphError'>>;
  Kovan_transfers?: SubscriptionResolver<Array<ResolversTypes['Kovan_Transfer']>, "Kovan_transfers", ParentType, ContextType, RequireFields<SubscriptionKovan_transfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  Kovan__meta?: SubscriptionResolver<Maybe<ResolversTypes['Kovan__Meta_']>, "Kovan__meta", ParentType, ContextType, Partial<SubscriptionKovan__metaArgs>>;
}>;

export type Rinkeby_AssetResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Rinkeby_Asset'] = ResolversParentTypes['Rinkeby_Asset']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  local?: Resolver<ResolversTypes['Rinkeby_Bytes'], ParentType, ContextType>;
  adoptedAsset?: Resolver<ResolversTypes['Rinkeby_Bytes'], ParentType, ContextType>;
  canonicalId?: Resolver<ResolversTypes['Rinkeby_Bytes'], ParentType, ContextType>;
  canonicalDomain?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Rinkeby_AssetBalanceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Rinkeby_AssetBalance'] = ResolversParentTypes['Rinkeby_AssetBalance']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  router?: Resolver<ResolversTypes['Rinkeby_Router'], ParentType, ContextType>;
  asset?: Resolver<ResolversTypes['Rinkeby_Asset'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Rinkeby_BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Rinkeby_BigDecimal'], any> {
  name: 'Rinkeby_BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface Rinkeby_BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Rinkeby_Bytes'], any> {
  name: 'Rinkeby_Bytes';
}

export type Rinkeby_RouterResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Rinkeby_Router'] = ResolversParentTypes['Rinkeby_Router']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['Rinkeby_Bytes']>, ParentType, ContextType>;
  recipient?: Resolver<Maybe<ResolversTypes['Rinkeby_Bytes']>, ParentType, ContextType>;
  proposedOwner?: Resolver<Maybe<ResolversTypes['Rinkeby_Bytes']>, ParentType, ContextType>;
  proposedTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  assetBalances?: Resolver<Array<ResolversTypes['Rinkeby_AssetBalance']>, ParentType, ContextType, RequireFields<Rinkeby_RouterassetBalancesArgs, 'skip' | 'first'>>;
  transfers?: Resolver<Array<ResolversTypes['Rinkeby_Transfer']>, ParentType, ContextType, RequireFields<Rinkeby_RoutertransfersArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Rinkeby_TransferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Rinkeby_Transfer'] = ResolversParentTypes['Rinkeby_Transfer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  originDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  destinationDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  chainId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Rinkeby_TransferStatus']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['Rinkeby_Bytes']>, ParentType, ContextType>;
  transferId?: Resolver<Maybe<ResolversTypes['Rinkeby_Bytes']>, ParentType, ContextType>;
  callTo?: Resolver<Maybe<ResolversTypes['Rinkeby_Bytes']>, ParentType, ContextType>;
  callData?: Resolver<Maybe<ResolversTypes['Rinkeby_Bytes']>, ParentType, ContextType>;
  idx?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  nonce?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  router?: Resolver<Maybe<ResolversTypes['Rinkeby_Router']>, ParentType, ContextType>;
  xcalledTransactingAsset?: Resolver<Maybe<ResolversTypes['Rinkeby_Bytes']>, ParentType, ContextType>;
  xcalledLocalAsset?: Resolver<Maybe<ResolversTypes['Rinkeby_Bytes']>, ParentType, ContextType>;
  xcalledTransactingAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  xcalledLocalAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  xcalledCaller?: Resolver<Maybe<ResolversTypes['Rinkeby_Bytes']>, ParentType, ContextType>;
  xcalledTransactionHash?: Resolver<Maybe<ResolversTypes['Rinkeby_Bytes']>, ParentType, ContextType>;
  xcalledTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  xcalledGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  xcalledGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  xcalledBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedCaller?: Resolver<Maybe<ResolversTypes['Rinkeby_Bytes']>, ParentType, ContextType>;
  executedTransactingAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedLocalAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedTransactingAsset?: Resolver<Maybe<ResolversTypes['Rinkeby_Bytes']>, ParentType, ContextType>;
  executedLocalAsset?: Resolver<Maybe<ResolversTypes['Rinkeby_Bytes']>, ParentType, ContextType>;
  executedTransactionHash?: Resolver<Maybe<ResolversTypes['Rinkeby_Bytes']>, ParentType, ContextType>;
  executedTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledCaller?: Resolver<Maybe<ResolversTypes['Rinkeby_Bytes']>, ParentType, ContextType>;
  reconciledLocalAsset?: Resolver<Maybe<ResolversTypes['Rinkeby_Bytes']>, ParentType, ContextType>;
  reconciledLocalAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledTransactionHash?: Resolver<Maybe<ResolversTypes['Rinkeby_Bytes']>, ParentType, ContextType>;
  reconciledTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Rinkeby__Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Rinkeby__Block_'] = ResolversParentTypes['Rinkeby__Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Rinkeby_Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Rinkeby__Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Rinkeby__Meta_'] = ResolversParentTypes['Rinkeby__Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['Rinkeby__Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Kovan_AssetResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Kovan_Asset'] = ResolversParentTypes['Kovan_Asset']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  local?: Resolver<ResolversTypes['Kovan_Bytes'], ParentType, ContextType>;
  adoptedAsset?: Resolver<ResolversTypes['Kovan_Bytes'], ParentType, ContextType>;
  canonicalId?: Resolver<ResolversTypes['Kovan_Bytes'], ParentType, ContextType>;
  canonicalDomain?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Kovan_AssetBalanceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Kovan_AssetBalance'] = ResolversParentTypes['Kovan_AssetBalance']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  router?: Resolver<ResolversTypes['Kovan_Router'], ParentType, ContextType>;
  asset?: Resolver<ResolversTypes['Kovan_Asset'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Kovan_BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Kovan_BigDecimal'], any> {
  name: 'Kovan_BigDecimal';
}

export interface Kovan_BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Kovan_Bytes'], any> {
  name: 'Kovan_Bytes';
}

export type Kovan_RouterResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Kovan_Router'] = ResolversParentTypes['Kovan_Router']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['Kovan_Bytes']>, ParentType, ContextType>;
  recipient?: Resolver<Maybe<ResolversTypes['Kovan_Bytes']>, ParentType, ContextType>;
  proposedOwner?: Resolver<Maybe<ResolversTypes['Kovan_Bytes']>, ParentType, ContextType>;
  proposedTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  assetBalances?: Resolver<Array<ResolversTypes['Kovan_AssetBalance']>, ParentType, ContextType, RequireFields<Kovan_RouterassetBalancesArgs, 'skip' | 'first'>>;
  transfers?: Resolver<Array<ResolversTypes['Kovan_Transfer']>, ParentType, ContextType, RequireFields<Kovan_RoutertransfersArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Kovan_TransferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Kovan_Transfer'] = ResolversParentTypes['Kovan_Transfer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  originDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  destinationDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  chainId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Kovan_TransferStatus']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['Kovan_Bytes']>, ParentType, ContextType>;
  transferId?: Resolver<Maybe<ResolversTypes['Kovan_Bytes']>, ParentType, ContextType>;
  callTo?: Resolver<Maybe<ResolversTypes['Kovan_Bytes']>, ParentType, ContextType>;
  callData?: Resolver<Maybe<ResolversTypes['Kovan_Bytes']>, ParentType, ContextType>;
  idx?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  nonce?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  router?: Resolver<Maybe<ResolversTypes['Kovan_Router']>, ParentType, ContextType>;
  xcalledTransactingAsset?: Resolver<Maybe<ResolversTypes['Kovan_Bytes']>, ParentType, ContextType>;
  xcalledLocalAsset?: Resolver<Maybe<ResolversTypes['Kovan_Bytes']>, ParentType, ContextType>;
  xcalledTransactingAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  xcalledLocalAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  xcalledCaller?: Resolver<Maybe<ResolversTypes['Kovan_Bytes']>, ParentType, ContextType>;
  xcalledTransactionHash?: Resolver<Maybe<ResolversTypes['Kovan_Bytes']>, ParentType, ContextType>;
  xcalledTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  xcalledGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  xcalledGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  xcalledBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedCaller?: Resolver<Maybe<ResolversTypes['Kovan_Bytes']>, ParentType, ContextType>;
  executedTransactingAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedLocalAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedTransactingAsset?: Resolver<Maybe<ResolversTypes['Kovan_Bytes']>, ParentType, ContextType>;
  executedLocalAsset?: Resolver<Maybe<ResolversTypes['Kovan_Bytes']>, ParentType, ContextType>;
  executedTransactionHash?: Resolver<Maybe<ResolversTypes['Kovan_Bytes']>, ParentType, ContextType>;
  executedTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledCaller?: Resolver<Maybe<ResolversTypes['Kovan_Bytes']>, ParentType, ContextType>;
  reconciledLocalAsset?: Resolver<Maybe<ResolversTypes['Kovan_Bytes']>, ParentType, ContextType>;
  reconciledLocalAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledTransactionHash?: Resolver<Maybe<ResolversTypes['Kovan_Bytes']>, ParentType, ContextType>;
  reconciledTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Kovan__Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Kovan__Block_'] = ResolversParentTypes['Kovan__Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Kovan_Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Kovan__Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Kovan__Meta_'] = ResolversParentTypes['Kovan__Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['Kovan__Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Rinkeby_Asset?: Rinkeby_AssetResolvers<ContextType>;
  Rinkeby_AssetBalance?: Rinkeby_AssetBalanceResolvers<ContextType>;
  Rinkeby_BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Rinkeby_Bytes?: GraphQLScalarType;
  Rinkeby_Router?: Rinkeby_RouterResolvers<ContextType>;
  Rinkeby_Transfer?: Rinkeby_TransferResolvers<ContextType>;
  Rinkeby__Block_?: Rinkeby__Block_Resolvers<ContextType>;
  Rinkeby__Meta_?: Rinkeby__Meta_Resolvers<ContextType>;
  Kovan_Asset?: Kovan_AssetResolvers<ContextType>;
  Kovan_AssetBalance?: Kovan_AssetBalanceResolvers<ContextType>;
  Kovan_BigDecimal?: GraphQLScalarType;
  Kovan_Bytes?: GraphQLScalarType;
  Kovan_Router?: Kovan_RouterResolvers<ContextType>;
  Kovan_Transfer?: Kovan_TransferResolvers<ContextType>;
  Kovan__Block_?: Kovan__Block_Resolvers<ContextType>;
  Kovan__Meta_?: Kovan__Meta_Resolvers<ContextType>;
}>;


import { MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';

import { InContextSdkMethod } from '@graphql-mesh/types';


    export namespace ConnextRinkebyTypes {
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
  Rinkeby_BigDecimal: any;
  BigInt: any;
  Rinkeby_Bytes: any;
};

export type Rinkeby_Asset = {
  id: Scalars['ID'];
  local: Scalars['Rinkeby_Bytes'];
  adoptedAsset: Scalars['Rinkeby_Bytes'];
  canonicalId: Scalars['Rinkeby_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type Rinkeby_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: Rinkeby_Router;
  asset: Rinkeby_Asset;
};

export type Rinkeby_AssetBalance_filter = {
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
  asset?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<Rinkeby_BlockChangedFilter>;
};

export type Rinkeby_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type Rinkeby_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  local?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  local_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  local_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  local_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  local_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  local_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  adoptedAsset?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  canonicalId?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<Rinkeby_BlockChangedFilter>;
};

export type Rinkeby_Asset_orderBy =
  | 'id'
  | 'local'
  | 'adoptedAsset'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'blockNumber';

export type Rinkeby_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Rinkeby_Block_height = {
  hash?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export type Rinkeby_OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  Rinkeby_asset?: Maybe<Rinkeby_Asset>;
  Rinkeby_assets: Array<Rinkeby_Asset>;
  Rinkeby_assetBalance?: Maybe<Rinkeby_AssetBalance>;
  Rinkeby_assetBalances: Array<Rinkeby_AssetBalance>;
  Rinkeby_router?: Maybe<Rinkeby_Router>;
  Rinkeby_routers: Array<Rinkeby_Router>;
  Rinkeby_transfer?: Maybe<Rinkeby_Transfer>;
  Rinkeby_transfers: Array<Rinkeby_Transfer>;
  /** Access to subgraph metadata */
  Rinkeby__meta?: Maybe<Rinkeby__Meta_>;
};


export type QueryRinkeby_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRinkeby_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rinkeby_Asset_orderBy>;
  orderDirection?: InputMaybe<Rinkeby_OrderDirection>;
  where?: InputMaybe<Rinkeby_Asset_filter>;
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRinkeby_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRinkeby_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rinkeby_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<Rinkeby_OrderDirection>;
  where?: InputMaybe<Rinkeby_AssetBalance_filter>;
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRinkeby_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRinkeby_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rinkeby_Router_orderBy>;
  orderDirection?: InputMaybe<Rinkeby_OrderDirection>;
  where?: InputMaybe<Rinkeby_Router_filter>;
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRinkeby_transferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRinkeby_transfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rinkeby_Transfer_orderBy>;
  orderDirection?: InputMaybe<Rinkeby_OrderDirection>;
  where?: InputMaybe<Rinkeby_Transfer_filter>;
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRinkeby__metaArgs = {
  block?: InputMaybe<Rinkeby_Block_height>;
};

export type Rinkeby_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['Rinkeby_Bytes']>;
  recipient?: Maybe<Scalars['Rinkeby_Bytes']>;
  proposedOwner?: Maybe<Scalars['Rinkeby_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<Rinkeby_AssetBalance>;
  transfers: Array<Rinkeby_Transfer>;
};


export type Rinkeby_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rinkeby_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<Rinkeby_OrderDirection>;
  where?: InputMaybe<Rinkeby_AssetBalance_filter>;
};


export type Rinkeby_RoutertransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rinkeby_Transfer_orderBy>;
  orderDirection?: InputMaybe<Rinkeby_OrderDirection>;
  where?: InputMaybe<Rinkeby_Transfer_filter>;
};

export type Rinkeby_Router_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  owner?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  owner_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  recipient?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  recipient_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<Rinkeby_BlockChangedFilter>;
};

export type Rinkeby_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances'
  | 'transfers';

export type Subscription = {
  Rinkeby_asset?: Maybe<Rinkeby_Asset>;
  Rinkeby_assets: Array<Rinkeby_Asset>;
  Rinkeby_assetBalance?: Maybe<Rinkeby_AssetBalance>;
  Rinkeby_assetBalances: Array<Rinkeby_AssetBalance>;
  Rinkeby_router?: Maybe<Rinkeby_Router>;
  Rinkeby_routers: Array<Rinkeby_Router>;
  Rinkeby_transfer?: Maybe<Rinkeby_Transfer>;
  Rinkeby_transfers: Array<Rinkeby_Transfer>;
  /** Access to subgraph metadata */
  Rinkeby__meta?: Maybe<Rinkeby__Meta_>;
};


export type SubscriptionRinkeby_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRinkeby_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rinkeby_Asset_orderBy>;
  orderDirection?: InputMaybe<Rinkeby_OrderDirection>;
  where?: InputMaybe<Rinkeby_Asset_filter>;
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRinkeby_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRinkeby_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rinkeby_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<Rinkeby_OrderDirection>;
  where?: InputMaybe<Rinkeby_AssetBalance_filter>;
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRinkeby_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRinkeby_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rinkeby_Router_orderBy>;
  orderDirection?: InputMaybe<Rinkeby_OrderDirection>;
  where?: InputMaybe<Rinkeby_Router_filter>;
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRinkeby_transferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRinkeby_transfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rinkeby_Transfer_orderBy>;
  orderDirection?: InputMaybe<Rinkeby_OrderDirection>;
  where?: InputMaybe<Rinkeby_Transfer_filter>;
  block?: InputMaybe<Rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRinkeby__metaArgs = {
  block?: InputMaybe<Rinkeby_Block_height>;
};

export type Rinkeby_Transfer = {
  id: Scalars['ID'];
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  chainId?: Maybe<Scalars['BigInt']>;
  status?: Maybe<Rinkeby_TransferStatus>;
  to?: Maybe<Scalars['Rinkeby_Bytes']>;
  transferId?: Maybe<Scalars['Rinkeby_Bytes']>;
  callTo?: Maybe<Scalars['Rinkeby_Bytes']>;
  callData?: Maybe<Scalars['Rinkeby_Bytes']>;
  idx?: Maybe<Scalars['BigInt']>;
  nonce?: Maybe<Scalars['BigInt']>;
  router?: Maybe<Rinkeby_Router>;
  xcalledTransactingAsset?: Maybe<Scalars['Rinkeby_Bytes']>;
  xcalledLocalAsset?: Maybe<Scalars['Rinkeby_Bytes']>;
  xcalledTransactingAmount?: Maybe<Scalars['BigInt']>;
  xcalledLocalAmount?: Maybe<Scalars['BigInt']>;
  xcalledCaller?: Maybe<Scalars['Rinkeby_Bytes']>;
  xcalledTransactionHash?: Maybe<Scalars['Rinkeby_Bytes']>;
  xcalledTimestamp?: Maybe<Scalars['BigInt']>;
  xcalledGasPrice?: Maybe<Scalars['BigInt']>;
  xcalledGasLimit?: Maybe<Scalars['BigInt']>;
  xcalledBlockNumber?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['Rinkeby_Bytes']>;
  executedTransactingAmount?: Maybe<Scalars['BigInt']>;
  executedLocalAmount?: Maybe<Scalars['BigInt']>;
  executedTransactingAsset?: Maybe<Scalars['Rinkeby_Bytes']>;
  executedLocalAsset?: Maybe<Scalars['Rinkeby_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['Rinkeby_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['Rinkeby_Bytes']>;
  reconciledLocalAsset?: Maybe<Scalars['Rinkeby_Bytes']>;
  reconciledLocalAmount?: Maybe<Scalars['BigInt']>;
  reconciledTransactionHash?: Maybe<Scalars['Rinkeby_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};

export type Rinkeby_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled';

export type Rinkeby_Transfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<Rinkeby_TransferStatus>;
  status_not?: InputMaybe<Rinkeby_TransferStatus>;
  status_in?: InputMaybe<Array<Rinkeby_TransferStatus>>;
  status_not_in?: InputMaybe<Array<Rinkeby_TransferStatus>>;
  to?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  to_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  to_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  transferId?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  transferId_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  callTo?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  callTo_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  callTo_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  callTo_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  callTo_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  callTo_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  callData?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  callData_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  idx?: InputMaybe<Scalars['BigInt']>;
  idx_not?: InputMaybe<Scalars['BigInt']>;
  idx_gt?: InputMaybe<Scalars['BigInt']>;
  idx_lt?: InputMaybe<Scalars['BigInt']>;
  idx_gte?: InputMaybe<Scalars['BigInt']>;
  idx_lte?: InputMaybe<Scalars['BigInt']>;
  idx_in?: InputMaybe<Array<Scalars['BigInt']>>;
  idx_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  xcalledTransactingAsset?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledTransactingAsset_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledTransactingAsset_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  xcalledTransactingAsset_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  xcalledTransactingAsset_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledTransactingAsset_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledLocalAsset?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledLocalAsset_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledLocalAsset_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  xcalledLocalAsset_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  xcalledLocalAsset_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledLocalAsset_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledTransactingAmount?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTransactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledLocalAmount?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledCaller?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledCaller_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledCaller_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  xcalledCaller_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  xcalledCaller_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledCaller_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledTransactionHash?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledTransactionHash_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledTransactionHash_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  xcalledTransactionHash_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  xcalledTransactionHash_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledTransactionHash_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  xcalledTimestamp?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasPrice?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasLimit?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedTransactingAmount?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTransactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedLocalAmount?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTransactingAsset?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedTransactingAsset_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedTransactingAsset_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  executedTransactingAsset_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  executedTransactingAsset_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedTransactingAsset_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedLocalAsset?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedLocalAsset_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedLocalAsset_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  executedLocalAsset_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  executedLocalAsset_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedLocalAsset_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  executedTimestamp?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledLocalAsset?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledLocalAsset_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledLocalAsset_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  reconciledLocalAsset_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  reconciledLocalAsset_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledLocalAsset_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledLocalAmount?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTransactionHash?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['Rinkeby_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['Rinkeby_Bytes']>;
  reconciledTimestamp?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<Rinkeby_BlockChangedFilter>;
};

export type Rinkeby_Transfer_orderBy =
  | 'id'
  | 'originDomain'
  | 'destinationDomain'
  | 'chainId'
  | 'status'
  | 'to'
  | 'transferId'
  | 'callTo'
  | 'callData'
  | 'idx'
  | 'nonce'
  | 'router'
  | 'xcalledTransactingAsset'
  | 'xcalledLocalAsset'
  | 'xcalledTransactingAmount'
  | 'xcalledLocalAmount'
  | 'xcalledCaller'
  | 'xcalledTransactionHash'
  | 'xcalledTimestamp'
  | 'xcalledGasPrice'
  | 'xcalledGasLimit'
  | 'xcalledBlockNumber'
  | 'executedCaller'
  | 'executedTransactingAmount'
  | 'executedLocalAmount'
  | 'executedTransactingAsset'
  | 'executedLocalAsset'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'reconciledCaller'
  | 'reconciledLocalAsset'
  | 'reconciledLocalAmount'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber';

export type Rinkeby__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Rinkeby_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type Rinkeby__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: Rinkeby__Block_;
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

    }
    export type QueryConnextRinkebySdk = {
  /** null **/
  Rinkeby_asset: InContextSdkMethod<ConnextRinkebyTypes.Query['Rinkeby_asset'], ConnextRinkebyTypes.QueryRinkeby_assetArgs, MeshContext>,
  /** null **/
  Rinkeby_assets: InContextSdkMethod<ConnextRinkebyTypes.Query['Rinkeby_assets'], ConnextRinkebyTypes.QueryRinkeby_assetsArgs, MeshContext>,
  /** null **/
  Rinkeby_assetBalance: InContextSdkMethod<ConnextRinkebyTypes.Query['Rinkeby_assetBalance'], ConnextRinkebyTypes.QueryRinkeby_assetBalanceArgs, MeshContext>,
  /** null **/
  Rinkeby_assetBalances: InContextSdkMethod<ConnextRinkebyTypes.Query['Rinkeby_assetBalances'], ConnextRinkebyTypes.QueryRinkeby_assetBalancesArgs, MeshContext>,
  /** null **/
  Rinkeby_router: InContextSdkMethod<ConnextRinkebyTypes.Query['Rinkeby_router'], ConnextRinkebyTypes.QueryRinkeby_routerArgs, MeshContext>,
  /** null **/
  Rinkeby_routers: InContextSdkMethod<ConnextRinkebyTypes.Query['Rinkeby_routers'], ConnextRinkebyTypes.QueryRinkeby_routersArgs, MeshContext>,
  /** null **/
  Rinkeby_transfer: InContextSdkMethod<ConnextRinkebyTypes.Query['Rinkeby_transfer'], ConnextRinkebyTypes.QueryRinkeby_transferArgs, MeshContext>,
  /** null **/
  Rinkeby_transfers: InContextSdkMethod<ConnextRinkebyTypes.Query['Rinkeby_transfers'], ConnextRinkebyTypes.QueryRinkeby_transfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  Rinkeby__meta: InContextSdkMethod<ConnextRinkebyTypes.Query['Rinkeby__meta'], ConnextRinkebyTypes.QueryRinkeby__metaArgs, MeshContext>
};

export type MutationConnextRinkebySdk = {

};

export type SubscriptionConnextRinkebySdk = {
  /** null **/
  Rinkeby_asset: InContextSdkMethod<ConnextRinkebyTypes.Subscription['Rinkeby_asset'], ConnextRinkebyTypes.SubscriptionRinkeby_assetArgs, MeshContext>,
  /** null **/
  Rinkeby_assets: InContextSdkMethod<ConnextRinkebyTypes.Subscription['Rinkeby_assets'], ConnextRinkebyTypes.SubscriptionRinkeby_assetsArgs, MeshContext>,
  /** null **/
  Rinkeby_assetBalance: InContextSdkMethod<ConnextRinkebyTypes.Subscription['Rinkeby_assetBalance'], ConnextRinkebyTypes.SubscriptionRinkeby_assetBalanceArgs, MeshContext>,
  /** null **/
  Rinkeby_assetBalances: InContextSdkMethod<ConnextRinkebyTypes.Subscription['Rinkeby_assetBalances'], ConnextRinkebyTypes.SubscriptionRinkeby_assetBalancesArgs, MeshContext>,
  /** null **/
  Rinkeby_router: InContextSdkMethod<ConnextRinkebyTypes.Subscription['Rinkeby_router'], ConnextRinkebyTypes.SubscriptionRinkeby_routerArgs, MeshContext>,
  /** null **/
  Rinkeby_routers: InContextSdkMethod<ConnextRinkebyTypes.Subscription['Rinkeby_routers'], ConnextRinkebyTypes.SubscriptionRinkeby_routersArgs, MeshContext>,
  /** null **/
  Rinkeby_transfer: InContextSdkMethod<ConnextRinkebyTypes.Subscription['Rinkeby_transfer'], ConnextRinkebyTypes.SubscriptionRinkeby_transferArgs, MeshContext>,
  /** null **/
  Rinkeby_transfers: InContextSdkMethod<ConnextRinkebyTypes.Subscription['Rinkeby_transfers'], ConnextRinkebyTypes.SubscriptionRinkeby_transfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  Rinkeby__meta: InContextSdkMethod<ConnextRinkebyTypes.Subscription['Rinkeby__meta'], ConnextRinkebyTypes.SubscriptionRinkeby__metaArgs, MeshContext>
};


    export namespace ConnextKovanTypes {
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
  Kovan_BigDecimal: any;
  BigInt: any;
  Kovan_Bytes: any;
};

export type Kovan_Asset = {
  id: Scalars['ID'];
  local: Scalars['Kovan_Bytes'];
  adoptedAsset: Scalars['Kovan_Bytes'];
  canonicalId: Scalars['Kovan_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type Kovan_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: Kovan_Router;
  asset: Kovan_Asset;
};

export type Kovan_AssetBalance_filter = {
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
  asset?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<Kovan_BlockChangedFilter>;
};

export type Kovan_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type Kovan_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  local?: InputMaybe<Scalars['Kovan_Bytes']>;
  local_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  local_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  local_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  local_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  local_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  adoptedAsset?: InputMaybe<Scalars['Kovan_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  canonicalId?: InputMaybe<Scalars['Kovan_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<Kovan_BlockChangedFilter>;
};

export type Kovan_Asset_orderBy =
  | 'id'
  | 'local'
  | 'adoptedAsset'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'blockNumber';

export type Kovan_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Kovan_Block_height = {
  hash?: InputMaybe<Scalars['Kovan_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export type Kovan_OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  Kovan_asset?: Maybe<Kovan_Asset>;
  Kovan_assets: Array<Kovan_Asset>;
  Kovan_assetBalance?: Maybe<Kovan_AssetBalance>;
  Kovan_assetBalances: Array<Kovan_AssetBalance>;
  Kovan_router?: Maybe<Kovan_Router>;
  Kovan_routers: Array<Kovan_Router>;
  Kovan_transfer?: Maybe<Kovan_Transfer>;
  Kovan_transfers: Array<Kovan_Transfer>;
  /** Access to subgraph metadata */
  Kovan__meta?: Maybe<Kovan__Meta_>;
};


export type QueryKovan_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryKovan_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Kovan_Asset_orderBy>;
  orderDirection?: InputMaybe<Kovan_OrderDirection>;
  where?: InputMaybe<Kovan_Asset_filter>;
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryKovan_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryKovan_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Kovan_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<Kovan_OrderDirection>;
  where?: InputMaybe<Kovan_AssetBalance_filter>;
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryKovan_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryKovan_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Kovan_Router_orderBy>;
  orderDirection?: InputMaybe<Kovan_OrderDirection>;
  where?: InputMaybe<Kovan_Router_filter>;
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryKovan_transferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryKovan_transfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Kovan_Transfer_orderBy>;
  orderDirection?: InputMaybe<Kovan_OrderDirection>;
  where?: InputMaybe<Kovan_Transfer_filter>;
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryKovan__metaArgs = {
  block?: InputMaybe<Kovan_Block_height>;
};

export type Kovan_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['Kovan_Bytes']>;
  recipient?: Maybe<Scalars['Kovan_Bytes']>;
  proposedOwner?: Maybe<Scalars['Kovan_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<Kovan_AssetBalance>;
  transfers: Array<Kovan_Transfer>;
};


export type Kovan_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Kovan_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<Kovan_OrderDirection>;
  where?: InputMaybe<Kovan_AssetBalance_filter>;
};


export type Kovan_RoutertransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Kovan_Transfer_orderBy>;
  orderDirection?: InputMaybe<Kovan_OrderDirection>;
  where?: InputMaybe<Kovan_Transfer_filter>;
};

export type Kovan_Router_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  owner?: InputMaybe<Scalars['Kovan_Bytes']>;
  owner_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  recipient?: InputMaybe<Scalars['Kovan_Bytes']>;
  recipient_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['Kovan_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<Kovan_BlockChangedFilter>;
};

export type Kovan_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances'
  | 'transfers';

export type Subscription = {
  Kovan_asset?: Maybe<Kovan_Asset>;
  Kovan_assets: Array<Kovan_Asset>;
  Kovan_assetBalance?: Maybe<Kovan_AssetBalance>;
  Kovan_assetBalances: Array<Kovan_AssetBalance>;
  Kovan_router?: Maybe<Kovan_Router>;
  Kovan_routers: Array<Kovan_Router>;
  Kovan_transfer?: Maybe<Kovan_Transfer>;
  Kovan_transfers: Array<Kovan_Transfer>;
  /** Access to subgraph metadata */
  Kovan__meta?: Maybe<Kovan__Meta_>;
};


export type SubscriptionKovan_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionKovan_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Kovan_Asset_orderBy>;
  orderDirection?: InputMaybe<Kovan_OrderDirection>;
  where?: InputMaybe<Kovan_Asset_filter>;
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionKovan_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionKovan_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Kovan_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<Kovan_OrderDirection>;
  where?: InputMaybe<Kovan_AssetBalance_filter>;
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionKovan_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionKovan_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Kovan_Router_orderBy>;
  orderDirection?: InputMaybe<Kovan_OrderDirection>;
  where?: InputMaybe<Kovan_Router_filter>;
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionKovan_transferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionKovan_transfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Kovan_Transfer_orderBy>;
  orderDirection?: InputMaybe<Kovan_OrderDirection>;
  where?: InputMaybe<Kovan_Transfer_filter>;
  block?: InputMaybe<Kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionKovan__metaArgs = {
  block?: InputMaybe<Kovan_Block_height>;
};

export type Kovan_Transfer = {
  id: Scalars['ID'];
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  chainId?: Maybe<Scalars['BigInt']>;
  status?: Maybe<Kovan_TransferStatus>;
  to?: Maybe<Scalars['Kovan_Bytes']>;
  transferId?: Maybe<Scalars['Kovan_Bytes']>;
  callTo?: Maybe<Scalars['Kovan_Bytes']>;
  callData?: Maybe<Scalars['Kovan_Bytes']>;
  idx?: Maybe<Scalars['BigInt']>;
  nonce?: Maybe<Scalars['BigInt']>;
  router?: Maybe<Kovan_Router>;
  xcalledTransactingAsset?: Maybe<Scalars['Kovan_Bytes']>;
  xcalledLocalAsset?: Maybe<Scalars['Kovan_Bytes']>;
  xcalledTransactingAmount?: Maybe<Scalars['BigInt']>;
  xcalledLocalAmount?: Maybe<Scalars['BigInt']>;
  xcalledCaller?: Maybe<Scalars['Kovan_Bytes']>;
  xcalledTransactionHash?: Maybe<Scalars['Kovan_Bytes']>;
  xcalledTimestamp?: Maybe<Scalars['BigInt']>;
  xcalledGasPrice?: Maybe<Scalars['BigInt']>;
  xcalledGasLimit?: Maybe<Scalars['BigInt']>;
  xcalledBlockNumber?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['Kovan_Bytes']>;
  executedTransactingAmount?: Maybe<Scalars['BigInt']>;
  executedLocalAmount?: Maybe<Scalars['BigInt']>;
  executedTransactingAsset?: Maybe<Scalars['Kovan_Bytes']>;
  executedLocalAsset?: Maybe<Scalars['Kovan_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['Kovan_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['Kovan_Bytes']>;
  reconciledLocalAsset?: Maybe<Scalars['Kovan_Bytes']>;
  reconciledLocalAmount?: Maybe<Scalars['BigInt']>;
  reconciledTransactionHash?: Maybe<Scalars['Kovan_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};

export type Kovan_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled';

export type Kovan_Transfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<Kovan_TransferStatus>;
  status_not?: InputMaybe<Kovan_TransferStatus>;
  status_in?: InputMaybe<Array<Kovan_TransferStatus>>;
  status_not_in?: InputMaybe<Array<Kovan_TransferStatus>>;
  to?: InputMaybe<Scalars['Kovan_Bytes']>;
  to_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  to_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  transferId?: InputMaybe<Scalars['Kovan_Bytes']>;
  transferId_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  callTo?: InputMaybe<Scalars['Kovan_Bytes']>;
  callTo_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  callTo_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  callTo_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  callTo_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  callTo_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  callData?: InputMaybe<Scalars['Kovan_Bytes']>;
  callData_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  idx?: InputMaybe<Scalars['BigInt']>;
  idx_not?: InputMaybe<Scalars['BigInt']>;
  idx_gt?: InputMaybe<Scalars['BigInt']>;
  idx_lt?: InputMaybe<Scalars['BigInt']>;
  idx_gte?: InputMaybe<Scalars['BigInt']>;
  idx_lte?: InputMaybe<Scalars['BigInt']>;
  idx_in?: InputMaybe<Array<Scalars['BigInt']>>;
  idx_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  xcalledTransactingAsset?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledTransactingAsset_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledTransactingAsset_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  xcalledTransactingAsset_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  xcalledTransactingAsset_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledTransactingAsset_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledLocalAsset?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledLocalAsset_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledLocalAsset_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  xcalledLocalAsset_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  xcalledLocalAsset_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledLocalAsset_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledTransactingAmount?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTransactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledLocalAmount?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledCaller?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledCaller_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledCaller_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  xcalledCaller_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  xcalledCaller_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledCaller_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledTransactionHash?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledTransactionHash_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledTransactionHash_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  xcalledTransactionHash_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  xcalledTransactionHash_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledTransactionHash_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  xcalledTimestamp?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasPrice?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasLimit?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedTransactingAmount?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTransactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedLocalAmount?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTransactingAsset?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedTransactingAsset_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedTransactingAsset_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  executedTransactingAsset_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  executedTransactingAsset_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedTransactingAsset_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedLocalAsset?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedLocalAsset_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedLocalAsset_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  executedLocalAsset_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  executedLocalAsset_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedLocalAsset_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  executedTimestamp?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledLocalAsset?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledLocalAsset_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledLocalAsset_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  reconciledLocalAsset_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  reconciledLocalAsset_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledLocalAsset_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledLocalAmount?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTransactionHash?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['Kovan_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['Kovan_Bytes']>;
  reconciledTimestamp?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<Kovan_BlockChangedFilter>;
};

export type Kovan_Transfer_orderBy =
  | 'id'
  | 'originDomain'
  | 'destinationDomain'
  | 'chainId'
  | 'status'
  | 'to'
  | 'transferId'
  | 'callTo'
  | 'callData'
  | 'idx'
  | 'nonce'
  | 'router'
  | 'xcalledTransactingAsset'
  | 'xcalledLocalAsset'
  | 'xcalledTransactingAmount'
  | 'xcalledLocalAmount'
  | 'xcalledCaller'
  | 'xcalledTransactionHash'
  | 'xcalledTimestamp'
  | 'xcalledGasPrice'
  | 'xcalledGasLimit'
  | 'xcalledBlockNumber'
  | 'executedCaller'
  | 'executedTransactingAmount'
  | 'executedLocalAmount'
  | 'executedTransactingAsset'
  | 'executedLocalAsset'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'reconciledCaller'
  | 'reconciledLocalAsset'
  | 'reconciledLocalAmount'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber';

export type Kovan__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Kovan_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type Kovan__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: Kovan__Block_;
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

    }
    export type QueryConnextKovanSdk = {
  /** null **/
  Kovan_asset: InContextSdkMethod<ConnextKovanTypes.Query['Kovan_asset'], ConnextKovanTypes.QueryKovan_assetArgs, MeshContext>,
  /** null **/
  Kovan_assets: InContextSdkMethod<ConnextKovanTypes.Query['Kovan_assets'], ConnextKovanTypes.QueryKovan_assetsArgs, MeshContext>,
  /** null **/
  Kovan_assetBalance: InContextSdkMethod<ConnextKovanTypes.Query['Kovan_assetBalance'], ConnextKovanTypes.QueryKovan_assetBalanceArgs, MeshContext>,
  /** null **/
  Kovan_assetBalances: InContextSdkMethod<ConnextKovanTypes.Query['Kovan_assetBalances'], ConnextKovanTypes.QueryKovan_assetBalancesArgs, MeshContext>,
  /** null **/
  Kovan_router: InContextSdkMethod<ConnextKovanTypes.Query['Kovan_router'], ConnextKovanTypes.QueryKovan_routerArgs, MeshContext>,
  /** null **/
  Kovan_routers: InContextSdkMethod<ConnextKovanTypes.Query['Kovan_routers'], ConnextKovanTypes.QueryKovan_routersArgs, MeshContext>,
  /** null **/
  Kovan_transfer: InContextSdkMethod<ConnextKovanTypes.Query['Kovan_transfer'], ConnextKovanTypes.QueryKovan_transferArgs, MeshContext>,
  /** null **/
  Kovan_transfers: InContextSdkMethod<ConnextKovanTypes.Query['Kovan_transfers'], ConnextKovanTypes.QueryKovan_transfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  Kovan__meta: InContextSdkMethod<ConnextKovanTypes.Query['Kovan__meta'], ConnextKovanTypes.QueryKovan__metaArgs, MeshContext>
};

export type MutationConnextKovanSdk = {

};

export type SubscriptionConnextKovanSdk = {
  /** null **/
  Kovan_asset: InContextSdkMethod<ConnextKovanTypes.Subscription['Kovan_asset'], ConnextKovanTypes.SubscriptionKovan_assetArgs, MeshContext>,
  /** null **/
  Kovan_assets: InContextSdkMethod<ConnextKovanTypes.Subscription['Kovan_assets'], ConnextKovanTypes.SubscriptionKovan_assetsArgs, MeshContext>,
  /** null **/
  Kovan_assetBalance: InContextSdkMethod<ConnextKovanTypes.Subscription['Kovan_assetBalance'], ConnextKovanTypes.SubscriptionKovan_assetBalanceArgs, MeshContext>,
  /** null **/
  Kovan_assetBalances: InContextSdkMethod<ConnextKovanTypes.Subscription['Kovan_assetBalances'], ConnextKovanTypes.SubscriptionKovan_assetBalancesArgs, MeshContext>,
  /** null **/
  Kovan_router: InContextSdkMethod<ConnextKovanTypes.Subscription['Kovan_router'], ConnextKovanTypes.SubscriptionKovan_routerArgs, MeshContext>,
  /** null **/
  Kovan_routers: InContextSdkMethod<ConnextKovanTypes.Subscription['Kovan_routers'], ConnextKovanTypes.SubscriptionKovan_routersArgs, MeshContext>,
  /** null **/
  Kovan_transfer: InContextSdkMethod<ConnextKovanTypes.Subscription['Kovan_transfer'], ConnextKovanTypes.SubscriptionKovan_transferArgs, MeshContext>,
  /** null **/
  Kovan_transfers: InContextSdkMethod<ConnextKovanTypes.Subscription['Kovan_transfers'], ConnextKovanTypes.SubscriptionKovan_transfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  Kovan__meta: InContextSdkMethod<ConnextKovanTypes.Subscription['Kovan__meta'], ConnextKovanTypes.SubscriptionKovan__metaArgs, MeshContext>
};

export type ConnextRinkebyContext = {
      ["Connext_Rinkeby"]: { Query: QueryConnextRinkebySdk, Mutation: MutationConnextRinkebySdk, Subscription: SubscriptionConnextRinkebySdk },
    };

export type ConnextKovanContext = {
      ["Connext_Kovan"]: { Query: QueryConnextKovanSdk, Mutation: MutationConnextKovanSdk, Subscription: SubscriptionConnextKovanSdk },
    };

export type MeshContext = ConnextRinkebyContext & ConnextKovanContext & BaseMeshContext;


import { getMesh } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { fileURLToPath } from '@graphql-mesh/utils';
import ExternalModule_0 from '@graphql-mesh/cache-inmemory-lru';
import ExternalModule_1 from '@graphql-mesh/graphql';
import ExternalModule_2 from '@graphql-mesh/merger-stitching';
import ExternalModule_3 from '@graphql-mesh/transform-prefix';
import ExternalModule_4 from './sources/Connext_Rinkeby/introspectionSchema';
import ExternalModule_5 from './sources/Connext_Kovan/introspectionSchema';

const importedModules: Record<string, any> = {
  // @ts-ignore
  ["@graphql-mesh/cache-inmemory-lru"]: ExternalModule_0,
  // @ts-ignore
  ["@graphql-mesh/graphql"]: ExternalModule_1,
  // @ts-ignore
  ["@graphql-mesh/merger-stitching"]: ExternalModule_2,
  // @ts-ignore
  ["@graphql-mesh/transform-prefix"]: ExternalModule_3,
  // @ts-ignore
  [".graphclient/sources/Connext_Rinkeby/introspectionSchema"]: ExternalModule_4,
  // @ts-ignore
  [".graphclient/sources/Connext_Kovan/introspectionSchema"]: ExternalModule_5
};

const baseDir = pathModule.join(__dirname, '..');

const importFn = (moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  if (!(relativeModuleId in importedModules)) {
    throw new Error(`Cannot find module '${relativeModuleId}'.`);
  }
  return Promise.resolve(importedModules[relativeModuleId]);
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: 'ts',
}), {
  readonly: true,
  validate: false
});

import { GetMeshOptions } from '@graphql-mesh/runtime';
import { YamlConfig } from '@graphql-mesh/types';
import { parse } from 'graphql';
import { PubSub } from '@graphql-mesh/utils';
import MeshCache from '@graphql-mesh/cache-inmemory-lru';
import { DefaultLogger } from '@graphql-mesh/utils';
import GraphqlHandler from '@graphql-mesh/graphql'
import StitchingMerger from '@graphql-mesh/merger-stitching';
import PrefixTransform from '@graphql-mesh/transform-prefix';
import { resolveAdditionalResolvers } from '@graphql-mesh/utils';
import { parseWithCache } from '@graphql-mesh/utils';
export const rawConfig: YamlConfig.Config = {"sources":[{"name":"Connext_Kovan","handler":{"graphql":{"endpoint":"https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-v0-kovan"}},"transforms":[{"prefix":{"value":"Kovan_","includeRootOperations":true,"ignore":["_SubgraphErrorPolicy_"]}}]},{"name":"Connext_Rinkeby","handler":{"graphql":{"endpoint":"https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-v0-rinkeby"}},"transforms":[{"prefix":{"value":"Rinkeby_","includeRootOperations":true,"ignore":["_SubgraphErrorPolicy_"]}}]}]} as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const cache = new (MeshCache as any)({
      ...(rawConfig.cache || {}),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
    } as any)
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger('🕸️');
const sources = [];
const transforms = [];
const connextKovanTransforms = [];
const connextRinkebyTransforms = [];
const additionalTypeDefs = [] as any[];
const connextKovanHandler = new GraphqlHandler({
              name: rawConfig.sources[0].name,
              config: rawConfig.sources[0].handler["graphql"],
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child(rawConfig.sources[0].name),
              logger: logger.child(rawConfig.sources[0].name),
              importFn
            });
const connextRinkebyHandler = new GraphqlHandler({
              name: rawConfig.sources[1].name,
              config: rawConfig.sources[1].handler["graphql"],
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child(rawConfig.sources[1].name),
              logger: logger.child(rawConfig.sources[1].name),
              importFn
            });
const merger = new(StitchingMerger as any)({
        cache,
        pubsub,
        logger: logger.child('StitchingMerger'),
        store: rootStore.child('stitchingMerger')
      })
connextKovanTransforms.push(
                new PrefixTransform({
                  apiName: rawConfig.sources[0].name,
                  config: rawConfig.sources[0].transforms[0]["prefix"],
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                })
              );
connextRinkebyTransforms.push(
                new PrefixTransform({
                  apiName: rawConfig.sources[1].name,
                  config: rawConfig.sources[1].transforms[0]["prefix"],
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                })
              );
sources.push({
          name: 'Connext_Kovan',
          handler: connextKovanHandler,
          transforms: connextKovanTransforms
        })
sources.push({
          name: 'Connext_Rinkeby',
          handler: connextRinkebyHandler,
          transforms: connextRinkebyTransforms
        })
const additionalResolversRawConfig = [];
const additionalResolvers = await resolveAdditionalResolvers(
      baseDir,
      additionalResolversRawConfig,
      importFn,
      pubsub
  )
const liveQueryInvalidations = rawConfig.liveQueryInvalidations;
const additionalEnvelopPlugins = [];
const documents = documentsInSDL.map((documentSdl: string, i: number) => ({
              rawSDL: documentSdl,
              document: parseWithCache(documentSdl),
              location: `document_${i}.graphql`,
            }))

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    liveQueryInvalidations,
    additionalEnvelopPlugins,
    documents,
  };
}

export const documentsInSDL = /*#__PURE__*/ [];

export async function getBuiltGraphClient(): Promise<MeshInstance<MeshContext>> {
  const meshConfig = await getMeshOptions();
  return getMesh<MeshContext>(meshConfig);
}

export async function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const { sdkRequesterFactory } = await getBuiltGraphClient();
  return getSdk<TOperationContext>(sdkRequesterFactory(globalContext));
}

export type Requester<C= {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R>
export function getSdk<C>(requester: Requester<C>) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;