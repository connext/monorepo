// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextX1TestnetTypes {
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
  x1testnet_BigDecimal: any;
  BigInt: any;
  x1testnet_Bytes: any;
  x1testnet_Int8: any;
};

export type x1testnet_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['x1testnet_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type x1testnet_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['x1testnet_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type x1testnet_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['x1testnet_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  rootTimestamp?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rootTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endOfDispute?: InputMaybe<Scalars['BigInt']>;
  endOfDispute_not?: InputMaybe<Scalars['BigInt']>;
  endOfDispute_gt?: InputMaybe<Scalars['BigInt']>;
  endOfDispute_lt?: InputMaybe<Scalars['BigInt']>;
  endOfDispute_gte?: InputMaybe<Scalars['BigInt']>;
  endOfDispute_lte?: InputMaybe<Scalars['BigInt']>;
  endOfDispute_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endOfDispute_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<x1testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<x1testnet_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<x1testnet_AggregateRootProposed_filter>>>;
};

export type x1testnet_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type x1testnet_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<x1testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<x1testnet_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<x1testnet_AggregateRoot_filter>>>;
};

export type x1testnet_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type x1testnet_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['x1testnet_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['x1testnet_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['x1testnet_Bytes']>;
  localAsset?: Maybe<Scalars['x1testnet_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<x1testnet_AssetStatus>;
};

export type x1testnet_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: x1testnet_Router;
  asset: x1testnet_Asset;
  feesEarned: Scalars['BigInt'];
};

export type x1testnet_AssetBalance_filter = {
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
  locked?: InputMaybe<Scalars['BigInt']>;
  locked_not?: InputMaybe<Scalars['BigInt']>;
  locked_gt?: InputMaybe<Scalars['BigInt']>;
  locked_lt?: InputMaybe<Scalars['BigInt']>;
  locked_gte?: InputMaybe<Scalars['BigInt']>;
  locked_lte?: InputMaybe<Scalars['BigInt']>;
  locked_in?: InputMaybe<Array<Scalars['BigInt']>>;
  locked_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  supplied?: InputMaybe<Scalars['BigInt']>;
  supplied_not?: InputMaybe<Scalars['BigInt']>;
  supplied_gt?: InputMaybe<Scalars['BigInt']>;
  supplied_lt?: InputMaybe<Scalars['BigInt']>;
  supplied_gte?: InputMaybe<Scalars['BigInt']>;
  supplied_lte?: InputMaybe<Scalars['BigInt']>;
  supplied_in?: InputMaybe<Array<Scalars['BigInt']>>;
  supplied_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  removed?: InputMaybe<Scalars['BigInt']>;
  removed_not?: InputMaybe<Scalars['BigInt']>;
  removed_gt?: InputMaybe<Scalars['BigInt']>;
  removed_lt?: InputMaybe<Scalars['BigInt']>;
  removed_gte?: InputMaybe<Scalars['BigInt']>;
  removed_lte?: InputMaybe<Scalars['BigInt']>;
  removed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  removed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  router_?: InputMaybe<x1testnet_Router_filter>;
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
  asset_?: InputMaybe<x1testnet_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<x1testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<x1testnet_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<x1testnet_AssetBalance_filter>>>;
};

export type x1testnet_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'locked'
  | 'supplied'
  | 'removed'
  | 'router'
  | 'router__id'
  | 'router__isActive'
  | 'router__owner'
  | 'router__recipient'
  | 'router__proposedOwner'
  | 'router__proposedTimestamp'
  | 'asset'
  | 'asset__id'
  | 'asset__key'
  | 'asset__decimal'
  | 'asset__adoptedDecimal'
  | 'asset__canonicalId'
  | 'asset__canonicalDomain'
  | 'asset__adoptedAsset'
  | 'asset__localAsset'
  | 'asset__blockNumber'
  | 'feesEarned';

export type x1testnet_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type x1testnet_AssetStatus_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  status?: InputMaybe<Scalars['Boolean']>;
  status_not?: InputMaybe<Scalars['Boolean']>;
  status_in?: InputMaybe<Array<Scalars['Boolean']>>;
  status_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<x1testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<x1testnet_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<x1testnet_AssetStatus_filter>>>;
};

export type x1testnet_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type x1testnet_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['x1testnet_Bytes']>;
  key_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  key_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  key_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  key_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  key_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  key_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  decimal?: InputMaybe<Scalars['BigInt']>;
  decimal_not?: InputMaybe<Scalars['BigInt']>;
  decimal_gt?: InputMaybe<Scalars['BigInt']>;
  decimal_lt?: InputMaybe<Scalars['BigInt']>;
  decimal_gte?: InputMaybe<Scalars['BigInt']>;
  decimal_lte?: InputMaybe<Scalars['BigInt']>;
  decimal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  decimal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedDecimal?: InputMaybe<Scalars['BigInt']>;
  adoptedDecimal_not?: InputMaybe<Scalars['BigInt']>;
  adoptedDecimal_gt?: InputMaybe<Scalars['BigInt']>;
  adoptedDecimal_lt?: InputMaybe<Scalars['BigInt']>;
  adoptedDecimal_gte?: InputMaybe<Scalars['BigInt']>;
  adoptedDecimal_lte?: InputMaybe<Scalars['BigInt']>;
  adoptedDecimal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedDecimal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalId?: InputMaybe<Scalars['x1testnet_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['x1testnet_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  localAsset?: InputMaybe<Scalars['x1testnet_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<Scalars['String']>;
  status_not?: InputMaybe<Scalars['String']>;
  status_gt?: InputMaybe<Scalars['String']>;
  status_lt?: InputMaybe<Scalars['String']>;
  status_gte?: InputMaybe<Scalars['String']>;
  status_lte?: InputMaybe<Scalars['String']>;
  status_in?: InputMaybe<Array<Scalars['String']>>;
  status_not_in?: InputMaybe<Array<Scalars['String']>>;
  status_contains?: InputMaybe<Scalars['String']>;
  status_contains_nocase?: InputMaybe<Scalars['String']>;
  status_not_contains?: InputMaybe<Scalars['String']>;
  status_not_contains_nocase?: InputMaybe<Scalars['String']>;
  status_starts_with?: InputMaybe<Scalars['String']>;
  status_starts_with_nocase?: InputMaybe<Scalars['String']>;
  status_not_starts_with?: InputMaybe<Scalars['String']>;
  status_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  status_ends_with?: InputMaybe<Scalars['String']>;
  status_ends_with_nocase?: InputMaybe<Scalars['String']>;
  status_not_ends_with?: InputMaybe<Scalars['String']>;
  status_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  status_?: InputMaybe<x1testnet_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<x1testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<x1testnet_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<x1testnet_Asset_filter>>>;
};

export type x1testnet_Asset_orderBy =
  | 'id'
  | 'key'
  | 'decimal'
  | 'adoptedDecimal'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber'
  | 'status'
  | 'status__id'
  | 'status__status';

export type x1testnet_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type x1testnet_Block_height = {
  hash?: InputMaybe<Scalars['x1testnet_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type x1testnet_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['x1testnet_Bytes']>;
  rootManager?: Maybe<Scalars['x1testnet_Bytes']>;
  mirrorConnector?: Maybe<Scalars['x1testnet_Bytes']>;
};

export type x1testnet_ConnectorMeta_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  spokeDomain?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_not?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_gt?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_lt?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_gte?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_lte?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  spokeDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hubDomain?: InputMaybe<Scalars['BigInt']>;
  hubDomain_not?: InputMaybe<Scalars['BigInt']>;
  hubDomain_gt?: InputMaybe<Scalars['BigInt']>;
  hubDomain_lt?: InputMaybe<Scalars['BigInt']>;
  hubDomain_gte?: InputMaybe<Scalars['BigInt']>;
  hubDomain_lte?: InputMaybe<Scalars['BigInt']>;
  hubDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hubDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amb?: InputMaybe<Scalars['x1testnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['x1testnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['x1testnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<x1testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<x1testnet_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<x1testnet_ConnectorMeta_filter>>>;
};

export type x1testnet_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type x1testnet_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['x1testnet_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<x1testnet_TransferStatus>;
  routers?: Maybe<Array<x1testnet_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['x1testnet_Bytes']>;
  delegate?: Maybe<Scalars['x1testnet_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['x1testnet_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['x1testnet_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['x1testnet_Bytes']>;
  asset?: Maybe<x1testnet_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['x1testnet_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['x1testnet_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['x1testnet_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['x1testnet_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['x1testnet_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['x1testnet_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type x1testnet_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_Router_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_Router_filter>;
};

export type x1testnet_DestinationTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transferId_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<x1testnet_TransferStatus>;
  status_not?: InputMaybe<x1testnet_TransferStatus>;
  status_in?: InputMaybe<Array<x1testnet_TransferStatus>>;
  status_not_in?: InputMaybe<Array<x1testnet_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<x1testnet_Router_filter>;
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
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['x1testnet_Bytes']>;
  to_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  to_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  to_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  to_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  to_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  to_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  delegate?: InputMaybe<Scalars['x1testnet_Bytes']>;
  delegate_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['x1testnet_Bytes']>;
  callData_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  callData_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  callData_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  callData_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  callData_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bumpSlippageCount?: InputMaybe<Scalars['BigInt']>;
  bumpSlippageCount_not?: InputMaybe<Scalars['BigInt']>;
  bumpSlippageCount_gt?: InputMaybe<Scalars['BigInt']>;
  bumpSlippageCount_lt?: InputMaybe<Scalars['BigInt']>;
  bumpSlippageCount_gte?: InputMaybe<Scalars['BigInt']>;
  bumpSlippageCount_lte?: InputMaybe<Scalars['BigInt']>;
  bumpSlippageCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bumpSlippageCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['x1testnet_Bytes']>;
  originSender_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  bridgedAmt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_not?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAmt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  normalizedIn?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_not?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_gt?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_lt?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_gte?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_lte?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_in?: InputMaybe<Array<Scalars['BigInt']>>;
  normalizedIn_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalId?: InputMaybe<Scalars['x1testnet_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
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
  asset_?: InputMaybe<x1testnet_Asset_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  routersFee?: InputMaybe<Scalars['BigInt']>;
  routersFee_not?: InputMaybe<Scalars['BigInt']>;
  routersFee_gt?: InputMaybe<Scalars['BigInt']>;
  routersFee_lt?: InputMaybe<Scalars['BigInt']>;
  routersFee_gte?: InputMaybe<Scalars['BigInt']>;
  routersFee_lte?: InputMaybe<Scalars['BigInt']>;
  routersFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  routersFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['x1testnet_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['x1testnet_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['x1testnet_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['x1testnet_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['x1testnet_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['x1testnet_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<x1testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<x1testnet_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<x1testnet_DestinationTransfer_filter>>>;
};

export type x1testnet_DestinationTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'status'
  | 'routers'
  | 'originDomain'
  | 'destinationDomain'
  | 'canonicalDomain'
  | 'to'
  | 'delegate'
  | 'receiveLocal'
  | 'callData'
  | 'slippage'
  | 'bumpSlippageCount'
  | 'originSender'
  | 'bridgedAmt'
  | 'normalizedIn'
  | 'canonicalId'
  | 'asset'
  | 'asset__id'
  | 'asset__key'
  | 'asset__decimal'
  | 'asset__adoptedDecimal'
  | 'asset__canonicalId'
  | 'asset__canonicalDomain'
  | 'asset__adoptedAsset'
  | 'asset__localAsset'
  | 'asset__blockNumber'
  | 'amount'
  | 'routersFee'
  | 'executedCaller'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'executedTxOrigin'
  | 'executedTxNonce'
  | 'reconciledCaller'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber'
  | 'reconciledTxOrigin'
  | 'reconciledTxNonce';

export type x1testnet_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['x1testnet_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type x1testnet_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['x1testnet_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<x1testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<x1testnet_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<x1testnet_OptimisticRootFinalized_filter>>>;
};

export type x1testnet_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type x1testnet_OrderDirection =
  | 'asc'
  | 'desc';

export type x1testnet_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['x1testnet_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['x1testnet_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['x1testnet_Bytes']>;
  root?: Maybe<Scalars['x1testnet_Bytes']>;
  transactionHash?: Maybe<Scalars['x1testnet_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<x1testnet_RootCount>;
};

export type x1testnet_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transferId_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['x1testnet_Bytes']>;
  leaf_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['x1testnet_Bytes']>;
  message_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  message_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  message_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  message_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  message_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  message_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rootCount?: InputMaybe<Scalars['String']>;
  rootCount_not?: InputMaybe<Scalars['String']>;
  rootCount_gt?: InputMaybe<Scalars['String']>;
  rootCount_lt?: InputMaybe<Scalars['String']>;
  rootCount_gte?: InputMaybe<Scalars['String']>;
  rootCount_lte?: InputMaybe<Scalars['String']>;
  rootCount_in?: InputMaybe<Array<Scalars['String']>>;
  rootCount_not_in?: InputMaybe<Array<Scalars['String']>>;
  rootCount_contains?: InputMaybe<Scalars['String']>;
  rootCount_contains_nocase?: InputMaybe<Scalars['String']>;
  rootCount_not_contains?: InputMaybe<Scalars['String']>;
  rootCount_not_contains_nocase?: InputMaybe<Scalars['String']>;
  rootCount_starts_with?: InputMaybe<Scalars['String']>;
  rootCount_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rootCount_not_starts_with?: InputMaybe<Scalars['String']>;
  rootCount_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rootCount_ends_with?: InputMaybe<Scalars['String']>;
  rootCount_ends_with_nocase?: InputMaybe<Scalars['String']>;
  rootCount_not_ends_with?: InputMaybe<Scalars['String']>;
  rootCount_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  rootCount_?: InputMaybe<x1testnet_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<x1testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<x1testnet_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<x1testnet_OriginMessage_filter>>>;
};

export type x1testnet_OriginMessage_orderBy =
  | 'id'
  | 'transferId'
  | 'destinationDomain'
  | 'leaf'
  | 'index'
  | 'message'
  | 'root'
  | 'transactionHash'
  | 'blockNumber'
  | 'rootCount'
  | 'rootCount__id'
  | 'rootCount__count';

export type x1testnet_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['x1testnet_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<x1testnet_TransferStatus>;
  messageHash?: Maybe<Scalars['x1testnet_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['x1testnet_Bytes']>;
  delegate?: Maybe<Scalars['x1testnet_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['x1testnet_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['x1testnet_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['x1testnet_Bytes']>;
  asset?: Maybe<x1testnet_Asset>;
  transactingAsset?: Maybe<Scalars['x1testnet_Bytes']>;
  message?: Maybe<x1testnet_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<x1testnet_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['x1testnet_Bytes']>;
  caller?: Maybe<Scalars['x1testnet_Bytes']>;
  transactionHash?: Maybe<Scalars['x1testnet_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['x1testnet_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type x1testnet_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_RelayerFee_filter>;
};

export type x1testnet_OriginTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transferId_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<x1testnet_TransferStatus>;
  status_not?: InputMaybe<x1testnet_TransferStatus>;
  status_in?: InputMaybe<Array<x1testnet_TransferStatus>>;
  status_not_in?: InputMaybe<Array<x1testnet_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['x1testnet_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
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
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['x1testnet_Bytes']>;
  to_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  to_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  to_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  to_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  to_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  to_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  delegate?: InputMaybe<Scalars['x1testnet_Bytes']>;
  delegate_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['x1testnet_Bytes']>;
  callData_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  callData_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  callData_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  callData_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  callData_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['x1testnet_Bytes']>;
  originSender_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  bridgedAmt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_not?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAmt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  normalizedIn?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_not?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_gt?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_lt?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_gte?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_lte?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_in?: InputMaybe<Array<Scalars['BigInt']>>;
  normalizedIn_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalId?: InputMaybe<Scalars['x1testnet_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
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
  asset_?: InputMaybe<x1testnet_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  message?: InputMaybe<Scalars['String']>;
  message_not?: InputMaybe<Scalars['String']>;
  message_gt?: InputMaybe<Scalars['String']>;
  message_lt?: InputMaybe<Scalars['String']>;
  message_gte?: InputMaybe<Scalars['String']>;
  message_lte?: InputMaybe<Scalars['String']>;
  message_in?: InputMaybe<Array<Scalars['String']>>;
  message_not_in?: InputMaybe<Array<Scalars['String']>>;
  message_contains?: InputMaybe<Scalars['String']>;
  message_contains_nocase?: InputMaybe<Scalars['String']>;
  message_not_contains?: InputMaybe<Scalars['String']>;
  message_not_contains_nocase?: InputMaybe<Scalars['String']>;
  message_starts_with?: InputMaybe<Scalars['String']>;
  message_starts_with_nocase?: InputMaybe<Scalars['String']>;
  message_not_starts_with?: InputMaybe<Scalars['String']>;
  message_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  message_ends_with?: InputMaybe<Scalars['String']>;
  message_ends_with_nocase?: InputMaybe<Scalars['String']>;
  message_not_ends_with?: InputMaybe<Scalars['String']>;
  message_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  message_?: InputMaybe<x1testnet_OriginMessage_filter>;
  bumpRelayerFeeCount?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_not?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_gt?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_lt?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_gte?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_lte?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bumpRelayerFeeCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFees?: InputMaybe<Array<Scalars['String']>>;
  relayerFees_not?: InputMaybe<Array<Scalars['String']>>;
  relayerFees_contains?: InputMaybe<Array<Scalars['String']>>;
  relayerFees_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  relayerFees_not_contains?: InputMaybe<Array<Scalars['String']>>;
  relayerFees_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  relayerFees_?: InputMaybe<x1testnet_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['x1testnet_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice?: InputMaybe<Scalars['BigInt']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit?: InputMaybe<Scalars['BigInt']>;
  gasLimit_not?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txOrigin?: InputMaybe<Scalars['x1testnet_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<x1testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<x1testnet_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<x1testnet_OriginTransfer_filter>>>;
};

export type x1testnet_OriginTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'status'
  | 'messageHash'
  | 'originDomain'
  | 'destinationDomain'
  | 'canonicalDomain'
  | 'to'
  | 'delegate'
  | 'receiveLocal'
  | 'callData'
  | 'slippage'
  | 'originSender'
  | 'bridgedAmt'
  | 'normalizedIn'
  | 'canonicalId'
  | 'asset'
  | 'asset__id'
  | 'asset__key'
  | 'asset__decimal'
  | 'asset__adoptedDecimal'
  | 'asset__canonicalId'
  | 'asset__canonicalDomain'
  | 'asset__adoptedAsset'
  | 'asset__localAsset'
  | 'asset__blockNumber'
  | 'transactingAsset'
  | 'message'
  | 'message__id'
  | 'message__transferId'
  | 'message__destinationDomain'
  | 'message__leaf'
  | 'message__index'
  | 'message__message'
  | 'message__root'
  | 'message__transactionHash'
  | 'message__blockNumber'
  | 'bumpRelayerFeeCount'
  | 'relayerFees'
  | 'initialRelayerFeeAsset'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber'
  | 'txOrigin'
  | 'txNonce';

export type Query = {
  x1testnet_asset?: Maybe<x1testnet_Asset>;
  x1testnet_assets: Array<x1testnet_Asset>;
  x1testnet_assetStatus?: Maybe<x1testnet_AssetStatus>;
  x1testnet_assetStatuses: Array<x1testnet_AssetStatus>;
  x1testnet_assetBalance?: Maybe<x1testnet_AssetBalance>;
  x1testnet_assetBalances: Array<x1testnet_AssetBalance>;
  x1testnet_router?: Maybe<x1testnet_Router>;
  x1testnet_routers: Array<x1testnet_Router>;
  x1testnet_routerDailyTVL?: Maybe<x1testnet_RouterDailyTVL>;
  x1testnet_routerDailyTVLs: Array<x1testnet_RouterDailyTVL>;
  x1testnet_routerLiquidityEvent?: Maybe<x1testnet_RouterLiquidityEvent>;
  x1testnet_routerLiquidityEvents: Array<x1testnet_RouterLiquidityEvent>;
  x1testnet_setting?: Maybe<x1testnet_Setting>;
  x1testnet_settings: Array<x1testnet_Setting>;
  x1testnet_relayer?: Maybe<x1testnet_Relayer>;
  x1testnet_relayers: Array<x1testnet_Relayer>;
  x1testnet_sequencer?: Maybe<x1testnet_Sequencer>;
  x1testnet_sequencers: Array<x1testnet_Sequencer>;
  x1testnet_relayerFee?: Maybe<x1testnet_RelayerFee>;
  x1testnet_relayerFees: Array<x1testnet_RelayerFee>;
  x1testnet_originTransfer?: Maybe<x1testnet_OriginTransfer>;
  x1testnet_originTransfers: Array<x1testnet_OriginTransfer>;
  x1testnet_destinationTransfer?: Maybe<x1testnet_DestinationTransfer>;
  x1testnet_destinationTransfers: Array<x1testnet_DestinationTransfer>;
  x1testnet_originMessage?: Maybe<x1testnet_OriginMessage>;
  x1testnet_originMessages: Array<x1testnet_OriginMessage>;
  x1testnet_aggregateRoot?: Maybe<x1testnet_AggregateRoot>;
  x1testnet_aggregateRoots: Array<x1testnet_AggregateRoot>;
  x1testnet_connectorMeta?: Maybe<x1testnet_ConnectorMeta>;
  x1testnet_connectorMetas: Array<x1testnet_ConnectorMeta>;
  x1testnet_rootCount?: Maybe<x1testnet_RootCount>;
  x1testnet_rootCounts: Array<x1testnet_RootCount>;
  x1testnet_rootMessageSent?: Maybe<x1testnet_RootMessageSent>;
  x1testnet_rootMessageSents: Array<x1testnet_RootMessageSent>;
  x1testnet_relayerFeesIncrease?: Maybe<x1testnet_RelayerFeesIncrease>;
  x1testnet_relayerFeesIncreases: Array<x1testnet_RelayerFeesIncrease>;
  x1testnet_slippageUpdate?: Maybe<x1testnet_SlippageUpdate>;
  x1testnet_slippageUpdates: Array<x1testnet_SlippageUpdate>;
  x1testnet_snapshotRoot?: Maybe<x1testnet_SnapshotRoot>;
  x1testnet_snapshotRoots: Array<x1testnet_SnapshotRoot>;
  x1testnet_spokeConnectorMode?: Maybe<x1testnet_SpokeConnectorMode>;
  x1testnet_spokeConnectorModes: Array<x1testnet_SpokeConnectorMode>;
  x1testnet_aggregateRootProposed?: Maybe<x1testnet_AggregateRootProposed>;
  x1testnet_aggregateRootProposeds: Array<x1testnet_AggregateRootProposed>;
  x1testnet_optimisticRootFinalized?: Maybe<x1testnet_OptimisticRootFinalized>;
  x1testnet_optimisticRootFinalizeds: Array<x1testnet_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  x1testnet__meta?: Maybe<x1testnet__Meta_>;
};


export type Queryx1testnet_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_Asset_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_Asset_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_AssetStatus_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_AssetBalance_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_Router_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_Router_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_RouterDailyTVL_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_RouterLiquidityEvent_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_Setting_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_Setting_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_Relayer_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_Relayer_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_Sequencer_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_Sequencer_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_RelayerFee_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_OriginTransfer_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_DestinationTransfer_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_OriginMessage_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_AggregateRoot_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_ConnectorMeta_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_RootCount_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_RootCount_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_RootMessageSent_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_RelayerFeesIncrease_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_SlippageUpdate_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_SnapshotRoot_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_SpokeConnectorMode_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_AggregateRootProposed_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_OptimisticRootFinalized_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryx1testnet__metaArgs = {
  block?: InputMaybe<x1testnet_Block_height>;
};

export type x1testnet_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['x1testnet_Bytes']>;
};

export type x1testnet_RelayerFee = {
  id: Scalars['ID'];
  transfer: x1testnet_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['x1testnet_Bytes'];
};

export type x1testnet_RelayerFee_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transfer?: InputMaybe<Scalars['String']>;
  transfer_not?: InputMaybe<Scalars['String']>;
  transfer_gt?: InputMaybe<Scalars['String']>;
  transfer_lt?: InputMaybe<Scalars['String']>;
  transfer_gte?: InputMaybe<Scalars['String']>;
  transfer_lte?: InputMaybe<Scalars['String']>;
  transfer_in?: InputMaybe<Array<Scalars['String']>>;
  transfer_not_in?: InputMaybe<Array<Scalars['String']>>;
  transfer_contains?: InputMaybe<Scalars['String']>;
  transfer_contains_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_contains?: InputMaybe<Scalars['String']>;
  transfer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transfer_starts_with?: InputMaybe<Scalars['String']>;
  transfer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_starts_with?: InputMaybe<Scalars['String']>;
  transfer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_ends_with?: InputMaybe<Scalars['String']>;
  transfer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_ends_with?: InputMaybe<Scalars['String']>;
  transfer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_?: InputMaybe<x1testnet_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['x1testnet_Bytes']>;
  asset_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  asset_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  asset_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  asset_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  asset_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<x1testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<x1testnet_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<x1testnet_RelayerFee_filter>>>;
};

export type x1testnet_RelayerFee_orderBy =
  | 'id'
  | 'transfer'
  | 'transfer__id'
  | 'transfer__chainId'
  | 'transfer__transferId'
  | 'transfer__nonce'
  | 'transfer__status'
  | 'transfer__messageHash'
  | 'transfer__originDomain'
  | 'transfer__destinationDomain'
  | 'transfer__canonicalDomain'
  | 'transfer__to'
  | 'transfer__delegate'
  | 'transfer__receiveLocal'
  | 'transfer__callData'
  | 'transfer__slippage'
  | 'transfer__originSender'
  | 'transfer__bridgedAmt'
  | 'transfer__normalizedIn'
  | 'transfer__canonicalId'
  | 'transfer__transactingAsset'
  | 'transfer__bumpRelayerFeeCount'
  | 'transfer__initialRelayerFeeAsset'
  | 'transfer__caller'
  | 'transfer__transactionHash'
  | 'transfer__timestamp'
  | 'transfer__gasPrice'
  | 'transfer__gasLimit'
  | 'transfer__blockNumber'
  | 'transfer__txOrigin'
  | 'transfer__txNonce'
  | 'fee'
  | 'asset';

export type x1testnet_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: x1testnet_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['x1testnet_Bytes']>;
  caller: Scalars['x1testnet_Bytes'];
  transactionHash: Scalars['x1testnet_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type x1testnet_RelayerFeesIncrease_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transfer?: InputMaybe<Scalars['String']>;
  transfer_not?: InputMaybe<Scalars['String']>;
  transfer_gt?: InputMaybe<Scalars['String']>;
  transfer_lt?: InputMaybe<Scalars['String']>;
  transfer_gte?: InputMaybe<Scalars['String']>;
  transfer_lte?: InputMaybe<Scalars['String']>;
  transfer_in?: InputMaybe<Array<Scalars['String']>>;
  transfer_not_in?: InputMaybe<Array<Scalars['String']>>;
  transfer_contains?: InputMaybe<Scalars['String']>;
  transfer_contains_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_contains?: InputMaybe<Scalars['String']>;
  transfer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transfer_starts_with?: InputMaybe<Scalars['String']>;
  transfer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_starts_with?: InputMaybe<Scalars['String']>;
  transfer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_ends_with?: InputMaybe<Scalars['String']>;
  transfer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_ends_with?: InputMaybe<Scalars['String']>;
  transfer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_?: InputMaybe<x1testnet_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['x1testnet_Bytes']>;
  asset_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  asset_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  asset_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  asset_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  asset_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice?: InputMaybe<Scalars['BigInt']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit?: InputMaybe<Scalars['BigInt']>;
  gasLimit_not?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<x1testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<x1testnet_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<x1testnet_RelayerFeesIncrease_filter>>>;
};

export type x1testnet_RelayerFeesIncrease_orderBy =
  | 'id'
  | 'transfer'
  | 'transfer__id'
  | 'transfer__chainId'
  | 'transfer__transferId'
  | 'transfer__nonce'
  | 'transfer__status'
  | 'transfer__messageHash'
  | 'transfer__originDomain'
  | 'transfer__destinationDomain'
  | 'transfer__canonicalDomain'
  | 'transfer__to'
  | 'transfer__delegate'
  | 'transfer__receiveLocal'
  | 'transfer__callData'
  | 'transfer__slippage'
  | 'transfer__originSender'
  | 'transfer__bridgedAmt'
  | 'transfer__normalizedIn'
  | 'transfer__canonicalId'
  | 'transfer__transactingAsset'
  | 'transfer__bumpRelayerFeeCount'
  | 'transfer__initialRelayerFeeAsset'
  | 'transfer__caller'
  | 'transfer__transactionHash'
  | 'transfer__timestamp'
  | 'transfer__gasPrice'
  | 'transfer__gasLimit'
  | 'transfer__blockNumber'
  | 'transfer__txOrigin'
  | 'transfer__txNonce'
  | 'increase'
  | 'asset'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type x1testnet_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['x1testnet_Bytes']>;
  relayer_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<x1testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<x1testnet_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<x1testnet_Relayer_filter>>>;
};

export type x1testnet_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type x1testnet_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type x1testnet_RootCount_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<x1testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<x1testnet_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<x1testnet_RootCount_filter>>>;
};

export type x1testnet_RootCount_orderBy =
  | 'id'
  | 'count';

export type x1testnet_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['x1testnet_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['x1testnet_Bytes']>;
  transactionHash?: Maybe<Scalars['x1testnet_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type x1testnet_RootMessageSent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  spokeDomain?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_not?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_gt?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_lt?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_gte?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_lte?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  spokeDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hubDomain?: InputMaybe<Scalars['BigInt']>;
  hubDomain_not?: InputMaybe<Scalars['BigInt']>;
  hubDomain_gt?: InputMaybe<Scalars['BigInt']>;
  hubDomain_lt?: InputMaybe<Scalars['BigInt']>;
  hubDomain_gte?: InputMaybe<Scalars['BigInt']>;
  hubDomain_lte?: InputMaybe<Scalars['BigInt']>;
  hubDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hubDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  root?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice?: InputMaybe<Scalars['BigInt']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit?: InputMaybe<Scalars['BigInt']>;
  gasLimit_not?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<x1testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<x1testnet_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<x1testnet_RootMessageSent_filter>>>;
};

export type x1testnet_RootMessageSent_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'root'
  | 'count'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type x1testnet_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['x1testnet_Bytes']>;
  recipient?: Maybe<Scalars['x1testnet_Bytes']>;
  proposedOwner?: Maybe<Scalars['x1testnet_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<x1testnet_AssetBalance>;
};


export type x1testnet_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_AssetBalance_filter>;
};

export type x1testnet_RouterDailyTVL = {
  id: Scalars['ID'];
  router: x1testnet_Router;
  asset: x1testnet_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type x1testnet_RouterDailyTVL_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
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
  router_?: InputMaybe<x1testnet_Router_filter>;
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
  asset_?: InputMaybe<x1testnet_Asset_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance?: InputMaybe<Scalars['BigInt']>;
  balance_not?: InputMaybe<Scalars['BigInt']>;
  balance_gt?: InputMaybe<Scalars['BigInt']>;
  balance_lt?: InputMaybe<Scalars['BigInt']>;
  balance_gte?: InputMaybe<Scalars['BigInt']>;
  balance_lte?: InputMaybe<Scalars['BigInt']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<x1testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<x1testnet_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<x1testnet_RouterDailyTVL_filter>>>;
};

export type x1testnet_RouterDailyTVL_orderBy =
  | 'id'
  | 'router'
  | 'router__id'
  | 'router__isActive'
  | 'router__owner'
  | 'router__recipient'
  | 'router__proposedOwner'
  | 'router__proposedTimestamp'
  | 'asset'
  | 'asset__id'
  | 'asset__key'
  | 'asset__decimal'
  | 'asset__adoptedDecimal'
  | 'asset__canonicalId'
  | 'asset__canonicalDomain'
  | 'asset__adoptedAsset'
  | 'asset__localAsset'
  | 'asset__blockNumber'
  | 'timestamp'
  | 'balance';

export type x1testnet_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<x1testnet_RouterLiquidityEventType>;
  router: x1testnet_Router;
  asset: x1testnet_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['x1testnet_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['x1testnet_Bytes'];
  nonce: Scalars['BigInt'];
};

export type x1testnet_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type x1testnet_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<x1testnet_RouterLiquidityEventType>;
  type_not?: InputMaybe<x1testnet_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<x1testnet_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<x1testnet_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<x1testnet_Router_filter>;
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
  asset_?: InputMaybe<x1testnet_Asset_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance?: InputMaybe<Scalars['BigInt']>;
  balance_not?: InputMaybe<Scalars['BigInt']>;
  balance_gt?: InputMaybe<Scalars['BigInt']>;
  balance_lt?: InputMaybe<Scalars['BigInt']>;
  balance_gte?: InputMaybe<Scalars['BigInt']>;
  balance_lte?: InputMaybe<Scalars['BigInt']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<x1testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<x1testnet_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<x1testnet_RouterLiquidityEvent_filter>>>;
};

export type x1testnet_RouterLiquidityEvent_orderBy =
  | 'id'
  | 'type'
  | 'router'
  | 'router__id'
  | 'router__isActive'
  | 'router__owner'
  | 'router__recipient'
  | 'router__proposedOwner'
  | 'router__proposedTimestamp'
  | 'asset'
  | 'asset__id'
  | 'asset__key'
  | 'asset__decimal'
  | 'asset__adoptedDecimal'
  | 'asset__canonicalId'
  | 'asset__canonicalDomain'
  | 'asset__adoptedAsset'
  | 'asset__localAsset'
  | 'asset__blockNumber'
  | 'amount'
  | 'balance'
  | 'caller'
  | 'blockNumber'
  | 'timestamp'
  | 'transactionHash'
  | 'nonce';

export type x1testnet_Router_filter = {
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
  owner?: InputMaybe<Scalars['x1testnet_Bytes']>;
  owner_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  owner_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  owner_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  owner_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  owner_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  recipient?: InputMaybe<Scalars['x1testnet_Bytes']>;
  recipient_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['x1testnet_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<x1testnet_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<x1testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<x1testnet_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<x1testnet_Router_filter>>>;
};

export type x1testnet_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type x1testnet_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['x1testnet_Bytes']>;
};

export type x1testnet_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['x1testnet_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<x1testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<x1testnet_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<x1testnet_Sequencer_filter>>>;
};

export type x1testnet_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type x1testnet_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['x1testnet_Bytes'];
};

export type x1testnet_Setting_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  maxRoutersPerTransfer?: InputMaybe<Scalars['BigInt']>;
  maxRoutersPerTransfer_not?: InputMaybe<Scalars['BigInt']>;
  maxRoutersPerTransfer_gt?: InputMaybe<Scalars['BigInt']>;
  maxRoutersPerTransfer_lt?: InputMaybe<Scalars['BigInt']>;
  maxRoutersPerTransfer_gte?: InputMaybe<Scalars['BigInt']>;
  maxRoutersPerTransfer_lte?: InputMaybe<Scalars['BigInt']>;
  maxRoutersPerTransfer_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxRoutersPerTransfer_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<x1testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<x1testnet_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<x1testnet_Setting_filter>>>;
};

export type x1testnet_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type x1testnet_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: x1testnet_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['x1testnet_Bytes'];
  transactionHash: Scalars['x1testnet_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type x1testnet_SlippageUpdate_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transfer?: InputMaybe<Scalars['String']>;
  transfer_not?: InputMaybe<Scalars['String']>;
  transfer_gt?: InputMaybe<Scalars['String']>;
  transfer_lt?: InputMaybe<Scalars['String']>;
  transfer_gte?: InputMaybe<Scalars['String']>;
  transfer_lte?: InputMaybe<Scalars['String']>;
  transfer_in?: InputMaybe<Array<Scalars['String']>>;
  transfer_not_in?: InputMaybe<Array<Scalars['String']>>;
  transfer_contains?: InputMaybe<Scalars['String']>;
  transfer_contains_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_contains?: InputMaybe<Scalars['String']>;
  transfer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transfer_starts_with?: InputMaybe<Scalars['String']>;
  transfer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_starts_with?: InputMaybe<Scalars['String']>;
  transfer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_ends_with?: InputMaybe<Scalars['String']>;
  transfer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_ends_with?: InputMaybe<Scalars['String']>;
  transfer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_?: InputMaybe<x1testnet_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice?: InputMaybe<Scalars['BigInt']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit?: InputMaybe<Scalars['BigInt']>;
  gasLimit_not?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<x1testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<x1testnet_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<x1testnet_SlippageUpdate_filter>>>;
};

export type x1testnet_SlippageUpdate_orderBy =
  | 'id'
  | 'transfer'
  | 'transfer__id'
  | 'transfer__chainId'
  | 'transfer__transferId'
  | 'transfer__nonce'
  | 'transfer__status'
  | 'transfer__originDomain'
  | 'transfer__destinationDomain'
  | 'transfer__canonicalDomain'
  | 'transfer__to'
  | 'transfer__delegate'
  | 'transfer__receiveLocal'
  | 'transfer__callData'
  | 'transfer__slippage'
  | 'transfer__bumpSlippageCount'
  | 'transfer__originSender'
  | 'transfer__bridgedAmt'
  | 'transfer__normalizedIn'
  | 'transfer__canonicalId'
  | 'transfer__amount'
  | 'transfer__routersFee'
  | 'transfer__executedCaller'
  | 'transfer__executedTransactionHash'
  | 'transfer__executedTimestamp'
  | 'transfer__executedGasPrice'
  | 'transfer__executedGasLimit'
  | 'transfer__executedBlockNumber'
  | 'transfer__executedTxOrigin'
  | 'transfer__executedTxNonce'
  | 'transfer__reconciledCaller'
  | 'transfer__reconciledTransactionHash'
  | 'transfer__reconciledTimestamp'
  | 'transfer__reconciledGasPrice'
  | 'transfer__reconciledGasLimit'
  | 'transfer__reconciledBlockNumber'
  | 'transfer__reconciledTxOrigin'
  | 'transfer__reconciledTxNonce'
  | 'slippage'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type x1testnet_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['x1testnet_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type x1testnet_SnapshotRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  spokeDomain?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_not?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_gt?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_lt?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_gte?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_lte?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  spokeDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  root?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_not?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['x1testnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['x1testnet_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<x1testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<x1testnet_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<x1testnet_SnapshotRoot_filter>>>;
};

export type x1testnet_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type x1testnet_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type x1testnet_SpokeConnectorMode_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  mode?: InputMaybe<Scalars['String']>;
  mode_not?: InputMaybe<Scalars['String']>;
  mode_gt?: InputMaybe<Scalars['String']>;
  mode_lt?: InputMaybe<Scalars['String']>;
  mode_gte?: InputMaybe<Scalars['String']>;
  mode_lte?: InputMaybe<Scalars['String']>;
  mode_in?: InputMaybe<Array<Scalars['String']>>;
  mode_not_in?: InputMaybe<Array<Scalars['String']>>;
  mode_contains?: InputMaybe<Scalars['String']>;
  mode_contains_nocase?: InputMaybe<Scalars['String']>;
  mode_not_contains?: InputMaybe<Scalars['String']>;
  mode_not_contains_nocase?: InputMaybe<Scalars['String']>;
  mode_starts_with?: InputMaybe<Scalars['String']>;
  mode_starts_with_nocase?: InputMaybe<Scalars['String']>;
  mode_not_starts_with?: InputMaybe<Scalars['String']>;
  mode_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  mode_ends_with?: InputMaybe<Scalars['String']>;
  mode_ends_with_nocase?: InputMaybe<Scalars['String']>;
  mode_not_ends_with?: InputMaybe<Scalars['String']>;
  mode_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<x1testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<x1testnet_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<x1testnet_SpokeConnectorMode_filter>>>;
};

export type x1testnet_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  x1testnet_asset?: Maybe<x1testnet_Asset>;
  x1testnet_assets: Array<x1testnet_Asset>;
  x1testnet_assetStatus?: Maybe<x1testnet_AssetStatus>;
  x1testnet_assetStatuses: Array<x1testnet_AssetStatus>;
  x1testnet_assetBalance?: Maybe<x1testnet_AssetBalance>;
  x1testnet_assetBalances: Array<x1testnet_AssetBalance>;
  x1testnet_router?: Maybe<x1testnet_Router>;
  x1testnet_routers: Array<x1testnet_Router>;
  x1testnet_routerDailyTVL?: Maybe<x1testnet_RouterDailyTVL>;
  x1testnet_routerDailyTVLs: Array<x1testnet_RouterDailyTVL>;
  x1testnet_routerLiquidityEvent?: Maybe<x1testnet_RouterLiquidityEvent>;
  x1testnet_routerLiquidityEvents: Array<x1testnet_RouterLiquidityEvent>;
  x1testnet_setting?: Maybe<x1testnet_Setting>;
  x1testnet_settings: Array<x1testnet_Setting>;
  x1testnet_relayer?: Maybe<x1testnet_Relayer>;
  x1testnet_relayers: Array<x1testnet_Relayer>;
  x1testnet_sequencer?: Maybe<x1testnet_Sequencer>;
  x1testnet_sequencers: Array<x1testnet_Sequencer>;
  x1testnet_relayerFee?: Maybe<x1testnet_RelayerFee>;
  x1testnet_relayerFees: Array<x1testnet_RelayerFee>;
  x1testnet_originTransfer?: Maybe<x1testnet_OriginTransfer>;
  x1testnet_originTransfers: Array<x1testnet_OriginTransfer>;
  x1testnet_destinationTransfer?: Maybe<x1testnet_DestinationTransfer>;
  x1testnet_destinationTransfers: Array<x1testnet_DestinationTransfer>;
  x1testnet_originMessage?: Maybe<x1testnet_OriginMessage>;
  x1testnet_originMessages: Array<x1testnet_OriginMessage>;
  x1testnet_aggregateRoot?: Maybe<x1testnet_AggregateRoot>;
  x1testnet_aggregateRoots: Array<x1testnet_AggregateRoot>;
  x1testnet_connectorMeta?: Maybe<x1testnet_ConnectorMeta>;
  x1testnet_connectorMetas: Array<x1testnet_ConnectorMeta>;
  x1testnet_rootCount?: Maybe<x1testnet_RootCount>;
  x1testnet_rootCounts: Array<x1testnet_RootCount>;
  x1testnet_rootMessageSent?: Maybe<x1testnet_RootMessageSent>;
  x1testnet_rootMessageSents: Array<x1testnet_RootMessageSent>;
  x1testnet_relayerFeesIncrease?: Maybe<x1testnet_RelayerFeesIncrease>;
  x1testnet_relayerFeesIncreases: Array<x1testnet_RelayerFeesIncrease>;
  x1testnet_slippageUpdate?: Maybe<x1testnet_SlippageUpdate>;
  x1testnet_slippageUpdates: Array<x1testnet_SlippageUpdate>;
  x1testnet_snapshotRoot?: Maybe<x1testnet_SnapshotRoot>;
  x1testnet_snapshotRoots: Array<x1testnet_SnapshotRoot>;
  x1testnet_spokeConnectorMode?: Maybe<x1testnet_SpokeConnectorMode>;
  x1testnet_spokeConnectorModes: Array<x1testnet_SpokeConnectorMode>;
  x1testnet_aggregateRootProposed?: Maybe<x1testnet_AggregateRootProposed>;
  x1testnet_aggregateRootProposeds: Array<x1testnet_AggregateRootProposed>;
  x1testnet_optimisticRootFinalized?: Maybe<x1testnet_OptimisticRootFinalized>;
  x1testnet_optimisticRootFinalizeds: Array<x1testnet_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  x1testnet__meta?: Maybe<x1testnet__Meta_>;
};


export type Subscriptionx1testnet_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_Asset_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_Asset_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_AssetStatus_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_AssetBalance_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_Router_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_Router_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_RouterDailyTVL_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_RouterLiquidityEvent_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_Setting_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_Setting_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_Relayer_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_Relayer_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_Sequencer_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_Sequencer_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_RelayerFee_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_OriginTransfer_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_DestinationTransfer_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_OriginMessage_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_AggregateRoot_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_ConnectorMeta_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_RootCount_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_RootCount_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_RootMessageSent_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_RelayerFeesIncrease_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_SlippageUpdate_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_SnapshotRoot_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_SpokeConnectorMode_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_AggregateRootProposed_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<x1testnet_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<x1testnet_OrderDirection>;
  where?: InputMaybe<x1testnet_OptimisticRootFinalized_filter>;
  block?: InputMaybe<x1testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionx1testnet__metaArgs = {
  block?: InputMaybe<x1testnet_Block_height>;
};

export type x1testnet_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type x1testnet__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['x1testnet_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type x1testnet__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: x1testnet__Block_;
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
  x1testnet_asset: InContextSdkMethod<Query['x1testnet_asset'], Queryx1testnet_assetArgs, MeshContext>,
  /** null **/
  x1testnet_assets: InContextSdkMethod<Query['x1testnet_assets'], Queryx1testnet_assetsArgs, MeshContext>,
  /** null **/
  x1testnet_assetStatus: InContextSdkMethod<Query['x1testnet_assetStatus'], Queryx1testnet_assetStatusArgs, MeshContext>,
  /** null **/
  x1testnet_assetStatuses: InContextSdkMethod<Query['x1testnet_assetStatuses'], Queryx1testnet_assetStatusesArgs, MeshContext>,
  /** null **/
  x1testnet_assetBalance: InContextSdkMethod<Query['x1testnet_assetBalance'], Queryx1testnet_assetBalanceArgs, MeshContext>,
  /** null **/
  x1testnet_assetBalances: InContextSdkMethod<Query['x1testnet_assetBalances'], Queryx1testnet_assetBalancesArgs, MeshContext>,
  /** null **/
  x1testnet_router: InContextSdkMethod<Query['x1testnet_router'], Queryx1testnet_routerArgs, MeshContext>,
  /** null **/
  x1testnet_routers: InContextSdkMethod<Query['x1testnet_routers'], Queryx1testnet_routersArgs, MeshContext>,
  /** null **/
  x1testnet_routerDailyTVL: InContextSdkMethod<Query['x1testnet_routerDailyTVL'], Queryx1testnet_routerDailyTVLArgs, MeshContext>,
  /** null **/
  x1testnet_routerDailyTVLs: InContextSdkMethod<Query['x1testnet_routerDailyTVLs'], Queryx1testnet_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  x1testnet_routerLiquidityEvent: InContextSdkMethod<Query['x1testnet_routerLiquidityEvent'], Queryx1testnet_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  x1testnet_routerLiquidityEvents: InContextSdkMethod<Query['x1testnet_routerLiquidityEvents'], Queryx1testnet_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  x1testnet_setting: InContextSdkMethod<Query['x1testnet_setting'], Queryx1testnet_settingArgs, MeshContext>,
  /** null **/
  x1testnet_settings: InContextSdkMethod<Query['x1testnet_settings'], Queryx1testnet_settingsArgs, MeshContext>,
  /** null **/
  x1testnet_relayer: InContextSdkMethod<Query['x1testnet_relayer'], Queryx1testnet_relayerArgs, MeshContext>,
  /** null **/
  x1testnet_relayers: InContextSdkMethod<Query['x1testnet_relayers'], Queryx1testnet_relayersArgs, MeshContext>,
  /** null **/
  x1testnet_sequencer: InContextSdkMethod<Query['x1testnet_sequencer'], Queryx1testnet_sequencerArgs, MeshContext>,
  /** null **/
  x1testnet_sequencers: InContextSdkMethod<Query['x1testnet_sequencers'], Queryx1testnet_sequencersArgs, MeshContext>,
  /** null **/
  x1testnet_relayerFee: InContextSdkMethod<Query['x1testnet_relayerFee'], Queryx1testnet_relayerFeeArgs, MeshContext>,
  /** null **/
  x1testnet_relayerFees: InContextSdkMethod<Query['x1testnet_relayerFees'], Queryx1testnet_relayerFeesArgs, MeshContext>,
  /** null **/
  x1testnet_originTransfer: InContextSdkMethod<Query['x1testnet_originTransfer'], Queryx1testnet_originTransferArgs, MeshContext>,
  /** null **/
  x1testnet_originTransfers: InContextSdkMethod<Query['x1testnet_originTransfers'], Queryx1testnet_originTransfersArgs, MeshContext>,
  /** null **/
  x1testnet_destinationTransfer: InContextSdkMethod<Query['x1testnet_destinationTransfer'], Queryx1testnet_destinationTransferArgs, MeshContext>,
  /** null **/
  x1testnet_destinationTransfers: InContextSdkMethod<Query['x1testnet_destinationTransfers'], Queryx1testnet_destinationTransfersArgs, MeshContext>,
  /** null **/
  x1testnet_originMessage: InContextSdkMethod<Query['x1testnet_originMessage'], Queryx1testnet_originMessageArgs, MeshContext>,
  /** null **/
  x1testnet_originMessages: InContextSdkMethod<Query['x1testnet_originMessages'], Queryx1testnet_originMessagesArgs, MeshContext>,
  /** null **/
  x1testnet_aggregateRoot: InContextSdkMethod<Query['x1testnet_aggregateRoot'], Queryx1testnet_aggregateRootArgs, MeshContext>,
  /** null **/
  x1testnet_aggregateRoots: InContextSdkMethod<Query['x1testnet_aggregateRoots'], Queryx1testnet_aggregateRootsArgs, MeshContext>,
  /** null **/
  x1testnet_connectorMeta: InContextSdkMethod<Query['x1testnet_connectorMeta'], Queryx1testnet_connectorMetaArgs, MeshContext>,
  /** null **/
  x1testnet_connectorMetas: InContextSdkMethod<Query['x1testnet_connectorMetas'], Queryx1testnet_connectorMetasArgs, MeshContext>,
  /** null **/
  x1testnet_rootCount: InContextSdkMethod<Query['x1testnet_rootCount'], Queryx1testnet_rootCountArgs, MeshContext>,
  /** null **/
  x1testnet_rootCounts: InContextSdkMethod<Query['x1testnet_rootCounts'], Queryx1testnet_rootCountsArgs, MeshContext>,
  /** null **/
  x1testnet_rootMessageSent: InContextSdkMethod<Query['x1testnet_rootMessageSent'], Queryx1testnet_rootMessageSentArgs, MeshContext>,
  /** null **/
  x1testnet_rootMessageSents: InContextSdkMethod<Query['x1testnet_rootMessageSents'], Queryx1testnet_rootMessageSentsArgs, MeshContext>,
  /** null **/
  x1testnet_relayerFeesIncrease: InContextSdkMethod<Query['x1testnet_relayerFeesIncrease'], Queryx1testnet_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  x1testnet_relayerFeesIncreases: InContextSdkMethod<Query['x1testnet_relayerFeesIncreases'], Queryx1testnet_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  x1testnet_slippageUpdate: InContextSdkMethod<Query['x1testnet_slippageUpdate'], Queryx1testnet_slippageUpdateArgs, MeshContext>,
  /** null **/
  x1testnet_slippageUpdates: InContextSdkMethod<Query['x1testnet_slippageUpdates'], Queryx1testnet_slippageUpdatesArgs, MeshContext>,
  /** null **/
  x1testnet_snapshotRoot: InContextSdkMethod<Query['x1testnet_snapshotRoot'], Queryx1testnet_snapshotRootArgs, MeshContext>,
  /** null **/
  x1testnet_snapshotRoots: InContextSdkMethod<Query['x1testnet_snapshotRoots'], Queryx1testnet_snapshotRootsArgs, MeshContext>,
  /** null **/
  x1testnet_spokeConnectorMode: InContextSdkMethod<Query['x1testnet_spokeConnectorMode'], Queryx1testnet_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  x1testnet_spokeConnectorModes: InContextSdkMethod<Query['x1testnet_spokeConnectorModes'], Queryx1testnet_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  x1testnet_aggregateRootProposed: InContextSdkMethod<Query['x1testnet_aggregateRootProposed'], Queryx1testnet_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  x1testnet_aggregateRootProposeds: InContextSdkMethod<Query['x1testnet_aggregateRootProposeds'], Queryx1testnet_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  x1testnet_optimisticRootFinalized: InContextSdkMethod<Query['x1testnet_optimisticRootFinalized'], Queryx1testnet_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  x1testnet_optimisticRootFinalizeds: InContextSdkMethod<Query['x1testnet_optimisticRootFinalizeds'], Queryx1testnet_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  x1testnet__meta: InContextSdkMethod<Query['x1testnet__meta'], Queryx1testnet__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  x1testnet_asset: InContextSdkMethod<Subscription['x1testnet_asset'], Subscriptionx1testnet_assetArgs, MeshContext>,
  /** null **/
  x1testnet_assets: InContextSdkMethod<Subscription['x1testnet_assets'], Subscriptionx1testnet_assetsArgs, MeshContext>,
  /** null **/
  x1testnet_assetStatus: InContextSdkMethod<Subscription['x1testnet_assetStatus'], Subscriptionx1testnet_assetStatusArgs, MeshContext>,
  /** null **/
  x1testnet_assetStatuses: InContextSdkMethod<Subscription['x1testnet_assetStatuses'], Subscriptionx1testnet_assetStatusesArgs, MeshContext>,
  /** null **/
  x1testnet_assetBalance: InContextSdkMethod<Subscription['x1testnet_assetBalance'], Subscriptionx1testnet_assetBalanceArgs, MeshContext>,
  /** null **/
  x1testnet_assetBalances: InContextSdkMethod<Subscription['x1testnet_assetBalances'], Subscriptionx1testnet_assetBalancesArgs, MeshContext>,
  /** null **/
  x1testnet_router: InContextSdkMethod<Subscription['x1testnet_router'], Subscriptionx1testnet_routerArgs, MeshContext>,
  /** null **/
  x1testnet_routers: InContextSdkMethod<Subscription['x1testnet_routers'], Subscriptionx1testnet_routersArgs, MeshContext>,
  /** null **/
  x1testnet_routerDailyTVL: InContextSdkMethod<Subscription['x1testnet_routerDailyTVL'], Subscriptionx1testnet_routerDailyTVLArgs, MeshContext>,
  /** null **/
  x1testnet_routerDailyTVLs: InContextSdkMethod<Subscription['x1testnet_routerDailyTVLs'], Subscriptionx1testnet_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  x1testnet_routerLiquidityEvent: InContextSdkMethod<Subscription['x1testnet_routerLiquidityEvent'], Subscriptionx1testnet_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  x1testnet_routerLiquidityEvents: InContextSdkMethod<Subscription['x1testnet_routerLiquidityEvents'], Subscriptionx1testnet_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  x1testnet_setting: InContextSdkMethod<Subscription['x1testnet_setting'], Subscriptionx1testnet_settingArgs, MeshContext>,
  /** null **/
  x1testnet_settings: InContextSdkMethod<Subscription['x1testnet_settings'], Subscriptionx1testnet_settingsArgs, MeshContext>,
  /** null **/
  x1testnet_relayer: InContextSdkMethod<Subscription['x1testnet_relayer'], Subscriptionx1testnet_relayerArgs, MeshContext>,
  /** null **/
  x1testnet_relayers: InContextSdkMethod<Subscription['x1testnet_relayers'], Subscriptionx1testnet_relayersArgs, MeshContext>,
  /** null **/
  x1testnet_sequencer: InContextSdkMethod<Subscription['x1testnet_sequencer'], Subscriptionx1testnet_sequencerArgs, MeshContext>,
  /** null **/
  x1testnet_sequencers: InContextSdkMethod<Subscription['x1testnet_sequencers'], Subscriptionx1testnet_sequencersArgs, MeshContext>,
  /** null **/
  x1testnet_relayerFee: InContextSdkMethod<Subscription['x1testnet_relayerFee'], Subscriptionx1testnet_relayerFeeArgs, MeshContext>,
  /** null **/
  x1testnet_relayerFees: InContextSdkMethod<Subscription['x1testnet_relayerFees'], Subscriptionx1testnet_relayerFeesArgs, MeshContext>,
  /** null **/
  x1testnet_originTransfer: InContextSdkMethod<Subscription['x1testnet_originTransfer'], Subscriptionx1testnet_originTransferArgs, MeshContext>,
  /** null **/
  x1testnet_originTransfers: InContextSdkMethod<Subscription['x1testnet_originTransfers'], Subscriptionx1testnet_originTransfersArgs, MeshContext>,
  /** null **/
  x1testnet_destinationTransfer: InContextSdkMethod<Subscription['x1testnet_destinationTransfer'], Subscriptionx1testnet_destinationTransferArgs, MeshContext>,
  /** null **/
  x1testnet_destinationTransfers: InContextSdkMethod<Subscription['x1testnet_destinationTransfers'], Subscriptionx1testnet_destinationTransfersArgs, MeshContext>,
  /** null **/
  x1testnet_originMessage: InContextSdkMethod<Subscription['x1testnet_originMessage'], Subscriptionx1testnet_originMessageArgs, MeshContext>,
  /** null **/
  x1testnet_originMessages: InContextSdkMethod<Subscription['x1testnet_originMessages'], Subscriptionx1testnet_originMessagesArgs, MeshContext>,
  /** null **/
  x1testnet_aggregateRoot: InContextSdkMethod<Subscription['x1testnet_aggregateRoot'], Subscriptionx1testnet_aggregateRootArgs, MeshContext>,
  /** null **/
  x1testnet_aggregateRoots: InContextSdkMethod<Subscription['x1testnet_aggregateRoots'], Subscriptionx1testnet_aggregateRootsArgs, MeshContext>,
  /** null **/
  x1testnet_connectorMeta: InContextSdkMethod<Subscription['x1testnet_connectorMeta'], Subscriptionx1testnet_connectorMetaArgs, MeshContext>,
  /** null **/
  x1testnet_connectorMetas: InContextSdkMethod<Subscription['x1testnet_connectorMetas'], Subscriptionx1testnet_connectorMetasArgs, MeshContext>,
  /** null **/
  x1testnet_rootCount: InContextSdkMethod<Subscription['x1testnet_rootCount'], Subscriptionx1testnet_rootCountArgs, MeshContext>,
  /** null **/
  x1testnet_rootCounts: InContextSdkMethod<Subscription['x1testnet_rootCounts'], Subscriptionx1testnet_rootCountsArgs, MeshContext>,
  /** null **/
  x1testnet_rootMessageSent: InContextSdkMethod<Subscription['x1testnet_rootMessageSent'], Subscriptionx1testnet_rootMessageSentArgs, MeshContext>,
  /** null **/
  x1testnet_rootMessageSents: InContextSdkMethod<Subscription['x1testnet_rootMessageSents'], Subscriptionx1testnet_rootMessageSentsArgs, MeshContext>,
  /** null **/
  x1testnet_relayerFeesIncrease: InContextSdkMethod<Subscription['x1testnet_relayerFeesIncrease'], Subscriptionx1testnet_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  x1testnet_relayerFeesIncreases: InContextSdkMethod<Subscription['x1testnet_relayerFeesIncreases'], Subscriptionx1testnet_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  x1testnet_slippageUpdate: InContextSdkMethod<Subscription['x1testnet_slippageUpdate'], Subscriptionx1testnet_slippageUpdateArgs, MeshContext>,
  /** null **/
  x1testnet_slippageUpdates: InContextSdkMethod<Subscription['x1testnet_slippageUpdates'], Subscriptionx1testnet_slippageUpdatesArgs, MeshContext>,
  /** null **/
  x1testnet_snapshotRoot: InContextSdkMethod<Subscription['x1testnet_snapshotRoot'], Subscriptionx1testnet_snapshotRootArgs, MeshContext>,
  /** null **/
  x1testnet_snapshotRoots: InContextSdkMethod<Subscription['x1testnet_snapshotRoots'], Subscriptionx1testnet_snapshotRootsArgs, MeshContext>,
  /** null **/
  x1testnet_spokeConnectorMode: InContextSdkMethod<Subscription['x1testnet_spokeConnectorMode'], Subscriptionx1testnet_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  x1testnet_spokeConnectorModes: InContextSdkMethod<Subscription['x1testnet_spokeConnectorModes'], Subscriptionx1testnet_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  x1testnet_aggregateRootProposed: InContextSdkMethod<Subscription['x1testnet_aggregateRootProposed'], Subscriptionx1testnet_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  x1testnet_aggregateRootProposeds: InContextSdkMethod<Subscription['x1testnet_aggregateRootProposeds'], Subscriptionx1testnet_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  x1testnet_optimisticRootFinalized: InContextSdkMethod<Subscription['x1testnet_optimisticRootFinalized'], Subscriptionx1testnet_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  x1testnet_optimisticRootFinalizeds: InContextSdkMethod<Subscription['x1testnet_optimisticRootFinalizeds'], Subscriptionx1testnet_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  x1testnet__meta: InContextSdkMethod<Subscription['x1testnet__meta'], Subscriptionx1testnet__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_X1Testnet"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
