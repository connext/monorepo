// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextLocalOptimismTypes {
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
  localoptimism_BigDecimal: any;
  BigInt: any;
  localoptimism_Bytes: any;
  localoptimism_Int8: any;
};

export type localoptimism_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['localoptimism_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type localoptimism_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['localoptimism_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type localoptimism_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['localoptimism_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
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
  _change_block?: InputMaybe<localoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localoptimism_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localoptimism_AggregateRootProposed_filter>>>;
};

export type localoptimism_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type localoptimism_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  root_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localoptimism_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localoptimism_AggregateRoot_filter>>>;
};

export type localoptimism_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type localoptimism_Aggregation_interval =
  | 'hour'
  | 'day';

export type localoptimism_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['localoptimism_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['localoptimism_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['localoptimism_Bytes']>;
  localAsset?: Maybe<Scalars['localoptimism_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<localoptimism_AssetStatus>;
};

export type localoptimism_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: localoptimism_Router;
  asset: localoptimism_Asset;
  feesEarned: Scalars['BigInt'];
};

export type localoptimism_AssetBalance_filter = {
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
  router_?: InputMaybe<localoptimism_Router_filter>;
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
  asset_?: InputMaybe<localoptimism_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localoptimism_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localoptimism_AssetBalance_filter>>>;
};

export type localoptimism_AssetBalance_orderBy =
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

export type localoptimism_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type localoptimism_AssetStatus_filter = {
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
  _change_block?: InputMaybe<localoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localoptimism_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localoptimism_AssetStatus_filter>>>;
};

export type localoptimism_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type localoptimism_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['localoptimism_Bytes']>;
  key_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  key_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  key_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  key_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  key_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  key_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['localoptimism_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['localoptimism_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  localAsset?: InputMaybe<Scalars['localoptimism_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
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
  status_?: InputMaybe<localoptimism_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localoptimism_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localoptimism_Asset_filter>>>;
};

export type localoptimism_Asset_orderBy =
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

export type localoptimism_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type localoptimism_Block_height = {
  hash?: InputMaybe<Scalars['localoptimism_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type localoptimism_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['localoptimism_Bytes']>;
  rootManager?: Maybe<Scalars['localoptimism_Bytes']>;
  mirrorConnector?: Maybe<Scalars['localoptimism_Bytes']>;
};

export type localoptimism_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['localoptimism_Bytes']>;
  amb_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  amb_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  amb_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  amb_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  amb_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  rootManager?: InputMaybe<Scalars['localoptimism_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['localoptimism_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localoptimism_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localoptimism_ConnectorMeta_filter>>>;
};

export type localoptimism_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type localoptimism_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['localoptimism_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<localoptimism_TransferStatus>;
  routers?: Maybe<Array<localoptimism_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['localoptimism_Bytes']>;
  delegate?: Maybe<Scalars['localoptimism_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['localoptimism_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['localoptimism_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['localoptimism_Bytes']>;
  asset?: Maybe<localoptimism_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['localoptimism_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['localoptimism_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['localoptimism_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['localoptimism_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['localoptimism_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['localoptimism_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type localoptimism_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_Router_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_Router_filter>;
};

export type localoptimism_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transferId_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<localoptimism_TransferStatus>;
  status_not?: InputMaybe<localoptimism_TransferStatus>;
  status_in?: InputMaybe<Array<localoptimism_TransferStatus>>;
  status_not_in?: InputMaybe<Array<localoptimism_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<localoptimism_Router_filter>;
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
  to?: InputMaybe<Scalars['localoptimism_Bytes']>;
  to_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  to_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  to_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  to_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  to_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  to_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  delegate?: InputMaybe<Scalars['localoptimism_Bytes']>;
  delegate_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['localoptimism_Bytes']>;
  callData_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  callData_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  callData_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  callData_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  callData_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
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
  originSender?: InputMaybe<Scalars['localoptimism_Bytes']>;
  originSender_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['localoptimism_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
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
  asset_?: InputMaybe<localoptimism_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['localoptimism_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['localoptimism_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['localoptimism_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['localoptimism_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['localoptimism_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['localoptimism_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localoptimism_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localoptimism_DestinationTransfer_filter>>>;
};

export type localoptimism_DestinationTransfer_orderBy =
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

export type localoptimism_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['localoptimism_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type localoptimism_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['localoptimism_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
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
  _change_block?: InputMaybe<localoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localoptimism_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localoptimism_OptimisticRootFinalized_filter>>>;
};

export type localoptimism_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type localoptimism_OrderDirection =
  | 'asc'
  | 'desc';

export type localoptimism_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['localoptimism_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['localoptimism_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['localoptimism_Bytes']>;
  root?: Maybe<Scalars['localoptimism_Bytes']>;
  transactionHash?: Maybe<Scalars['localoptimism_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<localoptimism_RootCount>;
};

export type localoptimism_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transferId_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['localoptimism_Bytes']>;
  leaf_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['localoptimism_Bytes']>;
  message_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  message_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  message_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  message_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  message_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  message_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  root_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
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
  rootCount_?: InputMaybe<localoptimism_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localoptimism_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localoptimism_OriginMessage_filter>>>;
};

export type localoptimism_OriginMessage_orderBy =
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

export type localoptimism_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['localoptimism_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<localoptimism_TransferStatus>;
  messageHash?: Maybe<Scalars['localoptimism_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['localoptimism_Bytes']>;
  delegate?: Maybe<Scalars['localoptimism_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['localoptimism_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['localoptimism_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['localoptimism_Bytes']>;
  asset?: Maybe<localoptimism_Asset>;
  transactingAsset?: Maybe<Scalars['localoptimism_Bytes']>;
  message?: Maybe<localoptimism_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<localoptimism_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['localoptimism_Bytes']>;
  caller?: Maybe<Scalars['localoptimism_Bytes']>;
  transactionHash?: Maybe<Scalars['localoptimism_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['localoptimism_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type localoptimism_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_RelayerFee_filter>;
};

export type localoptimism_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transferId_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<localoptimism_TransferStatus>;
  status_not?: InputMaybe<localoptimism_TransferStatus>;
  status_in?: InputMaybe<Array<localoptimism_TransferStatus>>;
  status_not_in?: InputMaybe<Array<localoptimism_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['localoptimism_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
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
  to?: InputMaybe<Scalars['localoptimism_Bytes']>;
  to_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  to_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  to_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  to_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  to_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  to_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  delegate?: InputMaybe<Scalars['localoptimism_Bytes']>;
  delegate_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['localoptimism_Bytes']>;
  callData_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  callData_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  callData_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  callData_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  callData_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['localoptimism_Bytes']>;
  originSender_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['localoptimism_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
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
  asset_?: InputMaybe<localoptimism_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
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
  message_?: InputMaybe<localoptimism_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<localoptimism_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['localoptimism_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['localoptimism_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localoptimism_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localoptimism_OriginTransfer_filter>>>;
};

export type localoptimism_OriginTransfer_orderBy =
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
  localoptimism_asset?: Maybe<localoptimism_Asset>;
  localoptimism_assets: Array<localoptimism_Asset>;
  localoptimism_assetStatus?: Maybe<localoptimism_AssetStatus>;
  localoptimism_assetStatuses: Array<localoptimism_AssetStatus>;
  localoptimism_assetBalance?: Maybe<localoptimism_AssetBalance>;
  localoptimism_assetBalances: Array<localoptimism_AssetBalance>;
  localoptimism_router?: Maybe<localoptimism_Router>;
  localoptimism_routers: Array<localoptimism_Router>;
  localoptimism_routerDailyTVL?: Maybe<localoptimism_RouterDailyTVL>;
  localoptimism_routerDailyTVLs: Array<localoptimism_RouterDailyTVL>;
  localoptimism_routerLiquidityEvent?: Maybe<localoptimism_RouterLiquidityEvent>;
  localoptimism_routerLiquidityEvents: Array<localoptimism_RouterLiquidityEvent>;
  localoptimism_setting?: Maybe<localoptimism_Setting>;
  localoptimism_settings: Array<localoptimism_Setting>;
  localoptimism_relayer?: Maybe<localoptimism_Relayer>;
  localoptimism_relayers: Array<localoptimism_Relayer>;
  localoptimism_sequencer?: Maybe<localoptimism_Sequencer>;
  localoptimism_sequencers: Array<localoptimism_Sequencer>;
  localoptimism_relayerFee?: Maybe<localoptimism_RelayerFee>;
  localoptimism_relayerFees: Array<localoptimism_RelayerFee>;
  localoptimism_originTransfer?: Maybe<localoptimism_OriginTransfer>;
  localoptimism_originTransfers: Array<localoptimism_OriginTransfer>;
  localoptimism_destinationTransfer?: Maybe<localoptimism_DestinationTransfer>;
  localoptimism_destinationTransfers: Array<localoptimism_DestinationTransfer>;
  localoptimism_originMessage?: Maybe<localoptimism_OriginMessage>;
  localoptimism_originMessages: Array<localoptimism_OriginMessage>;
  localoptimism_aggregateRoot?: Maybe<localoptimism_AggregateRoot>;
  localoptimism_aggregateRoots: Array<localoptimism_AggregateRoot>;
  localoptimism_connectorMeta?: Maybe<localoptimism_ConnectorMeta>;
  localoptimism_connectorMetas: Array<localoptimism_ConnectorMeta>;
  localoptimism_rootCount?: Maybe<localoptimism_RootCount>;
  localoptimism_rootCounts: Array<localoptimism_RootCount>;
  localoptimism_rootMessageSent?: Maybe<localoptimism_RootMessageSent>;
  localoptimism_rootMessageSents: Array<localoptimism_RootMessageSent>;
  localoptimism_relayerFeesIncrease?: Maybe<localoptimism_RelayerFeesIncrease>;
  localoptimism_relayerFeesIncreases: Array<localoptimism_RelayerFeesIncrease>;
  localoptimism_slippageUpdate?: Maybe<localoptimism_SlippageUpdate>;
  localoptimism_slippageUpdates: Array<localoptimism_SlippageUpdate>;
  localoptimism_snapshotRoot?: Maybe<localoptimism_SnapshotRoot>;
  localoptimism_snapshotRoots: Array<localoptimism_SnapshotRoot>;
  localoptimism_spokeConnectorMode?: Maybe<localoptimism_SpokeConnectorMode>;
  localoptimism_spokeConnectorModes: Array<localoptimism_SpokeConnectorMode>;
  localoptimism_aggregateRootProposed?: Maybe<localoptimism_AggregateRootProposed>;
  localoptimism_aggregateRootProposeds: Array<localoptimism_AggregateRootProposed>;
  localoptimism_optimisticRootFinalized?: Maybe<localoptimism_OptimisticRootFinalized>;
  localoptimism_optimisticRootFinalizeds: Array<localoptimism_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  localoptimism__meta?: Maybe<localoptimism__Meta_>;
};


export type Querylocaloptimism_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_Asset_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_Asset_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_AssetStatus_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_AssetBalance_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_Router_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_Router_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_RouterDailyTVL_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_RouterLiquidityEvent_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_Setting_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_Setting_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_Relayer_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_Relayer_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_Sequencer_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_Sequencer_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_RelayerFee_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_OriginTransfer_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_DestinationTransfer_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_OriginMessage_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_AggregateRoot_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_ConnectorMeta_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_RootCount_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_RootCount_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_RootMessageSent_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_RelayerFeesIncrease_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_SlippageUpdate_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_SnapshotRoot_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_SpokeConnectorMode_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_AggregateRootProposed_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_OptimisticRootFinalized_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocaloptimism__metaArgs = {
  block?: InputMaybe<localoptimism_Block_height>;
};

export type localoptimism_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['localoptimism_Bytes']>;
};

export type localoptimism_RelayerFee = {
  id: Scalars['ID'];
  transfer: localoptimism_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['localoptimism_Bytes'];
};

export type localoptimism_RelayerFee_filter = {
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
  transfer_?: InputMaybe<localoptimism_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['localoptimism_Bytes']>;
  asset_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  asset_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  asset_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  asset_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  asset_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localoptimism_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localoptimism_RelayerFee_filter>>>;
};

export type localoptimism_RelayerFee_orderBy =
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

export type localoptimism_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: localoptimism_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['localoptimism_Bytes']>;
  caller: Scalars['localoptimism_Bytes'];
  transactionHash: Scalars['localoptimism_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type localoptimism_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<localoptimism_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['localoptimism_Bytes']>;
  asset_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  asset_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  asset_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  asset_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  asset_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
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
  _change_block?: InputMaybe<localoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localoptimism_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localoptimism_RelayerFeesIncrease_filter>>>;
};

export type localoptimism_RelayerFeesIncrease_orderBy =
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

export type localoptimism_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['localoptimism_Bytes']>;
  relayer_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localoptimism_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localoptimism_Relayer_filter>>>;
};

export type localoptimism_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type localoptimism_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type localoptimism_RootCount_filter = {
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
  _change_block?: InputMaybe<localoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localoptimism_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localoptimism_RootCount_filter>>>;
};

export type localoptimism_RootCount_orderBy =
  | 'id'
  | 'count';

export type localoptimism_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['localoptimism_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['localoptimism_Bytes']>;
  transactionHash?: Maybe<Scalars['localoptimism_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type localoptimism_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  root_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
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
  _change_block?: InputMaybe<localoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localoptimism_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localoptimism_RootMessageSent_filter>>>;
};

export type localoptimism_RootMessageSent_orderBy =
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

export type localoptimism_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['localoptimism_Bytes']>;
  recipient?: Maybe<Scalars['localoptimism_Bytes']>;
  proposedOwner?: Maybe<Scalars['localoptimism_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<localoptimism_AssetBalance>;
};


export type localoptimism_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_AssetBalance_filter>;
};

export type localoptimism_RouterDailyTVL = {
  id: Scalars['ID'];
  router: localoptimism_Router;
  asset: localoptimism_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type localoptimism_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<localoptimism_Router_filter>;
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
  asset_?: InputMaybe<localoptimism_Asset_filter>;
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
  _change_block?: InputMaybe<localoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localoptimism_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localoptimism_RouterDailyTVL_filter>>>;
};

export type localoptimism_RouterDailyTVL_orderBy =
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

export type localoptimism_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<localoptimism_RouterLiquidityEventType>;
  router: localoptimism_Router;
  asset: localoptimism_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['localoptimism_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['localoptimism_Bytes'];
  nonce: Scalars['BigInt'];
};

export type localoptimism_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type localoptimism_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<localoptimism_RouterLiquidityEventType>;
  type_not?: InputMaybe<localoptimism_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<localoptimism_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<localoptimism_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<localoptimism_Router_filter>;
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
  asset_?: InputMaybe<localoptimism_Asset_filter>;
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
  caller?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localoptimism_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localoptimism_RouterLiquidityEvent_filter>>>;
};

export type localoptimism_RouterLiquidityEvent_orderBy =
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

export type localoptimism_Router_filter = {
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
  owner?: InputMaybe<Scalars['localoptimism_Bytes']>;
  owner_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  owner_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  owner_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  owner_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  owner_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  recipient?: InputMaybe<Scalars['localoptimism_Bytes']>;
  recipient_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['localoptimism_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<localoptimism_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localoptimism_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localoptimism_Router_filter>>>;
};

export type localoptimism_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type localoptimism_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['localoptimism_Bytes']>;
};

export type localoptimism_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['localoptimism_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localoptimism_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localoptimism_Sequencer_filter>>>;
};

export type localoptimism_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type localoptimism_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['localoptimism_Bytes'];
};

export type localoptimism_Setting_filter = {
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
  caller?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localoptimism_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localoptimism_Setting_filter>>>;
};

export type localoptimism_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type localoptimism_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: localoptimism_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['localoptimism_Bytes'];
  transactionHash: Scalars['localoptimism_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type localoptimism_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<localoptimism_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
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
  _change_block?: InputMaybe<localoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localoptimism_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localoptimism_SlippageUpdate_filter>>>;
};

export type localoptimism_SlippageUpdate_orderBy =
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

export type localoptimism_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['localoptimism_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type localoptimism_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_not?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_gt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_lt?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_gte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_lte?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['localoptimism_Bytes']>>;
  root_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['localoptimism_Bytes']>;
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
  _change_block?: InputMaybe<localoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localoptimism_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localoptimism_SnapshotRoot_filter>>>;
};

export type localoptimism_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type localoptimism_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type localoptimism_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<localoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localoptimism_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localoptimism_SpokeConnectorMode_filter>>>;
};

export type localoptimism_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  localoptimism_asset?: Maybe<localoptimism_Asset>;
  localoptimism_assets: Array<localoptimism_Asset>;
  localoptimism_assetStatus?: Maybe<localoptimism_AssetStatus>;
  localoptimism_assetStatuses: Array<localoptimism_AssetStatus>;
  localoptimism_assetBalance?: Maybe<localoptimism_AssetBalance>;
  localoptimism_assetBalances: Array<localoptimism_AssetBalance>;
  localoptimism_router?: Maybe<localoptimism_Router>;
  localoptimism_routers: Array<localoptimism_Router>;
  localoptimism_routerDailyTVL?: Maybe<localoptimism_RouterDailyTVL>;
  localoptimism_routerDailyTVLs: Array<localoptimism_RouterDailyTVL>;
  localoptimism_routerLiquidityEvent?: Maybe<localoptimism_RouterLiquidityEvent>;
  localoptimism_routerLiquidityEvents: Array<localoptimism_RouterLiquidityEvent>;
  localoptimism_setting?: Maybe<localoptimism_Setting>;
  localoptimism_settings: Array<localoptimism_Setting>;
  localoptimism_relayer?: Maybe<localoptimism_Relayer>;
  localoptimism_relayers: Array<localoptimism_Relayer>;
  localoptimism_sequencer?: Maybe<localoptimism_Sequencer>;
  localoptimism_sequencers: Array<localoptimism_Sequencer>;
  localoptimism_relayerFee?: Maybe<localoptimism_RelayerFee>;
  localoptimism_relayerFees: Array<localoptimism_RelayerFee>;
  localoptimism_originTransfer?: Maybe<localoptimism_OriginTransfer>;
  localoptimism_originTransfers: Array<localoptimism_OriginTransfer>;
  localoptimism_destinationTransfer?: Maybe<localoptimism_DestinationTransfer>;
  localoptimism_destinationTransfers: Array<localoptimism_DestinationTransfer>;
  localoptimism_originMessage?: Maybe<localoptimism_OriginMessage>;
  localoptimism_originMessages: Array<localoptimism_OriginMessage>;
  localoptimism_aggregateRoot?: Maybe<localoptimism_AggregateRoot>;
  localoptimism_aggregateRoots: Array<localoptimism_AggregateRoot>;
  localoptimism_connectorMeta?: Maybe<localoptimism_ConnectorMeta>;
  localoptimism_connectorMetas: Array<localoptimism_ConnectorMeta>;
  localoptimism_rootCount?: Maybe<localoptimism_RootCount>;
  localoptimism_rootCounts: Array<localoptimism_RootCount>;
  localoptimism_rootMessageSent?: Maybe<localoptimism_RootMessageSent>;
  localoptimism_rootMessageSents: Array<localoptimism_RootMessageSent>;
  localoptimism_relayerFeesIncrease?: Maybe<localoptimism_RelayerFeesIncrease>;
  localoptimism_relayerFeesIncreases: Array<localoptimism_RelayerFeesIncrease>;
  localoptimism_slippageUpdate?: Maybe<localoptimism_SlippageUpdate>;
  localoptimism_slippageUpdates: Array<localoptimism_SlippageUpdate>;
  localoptimism_snapshotRoot?: Maybe<localoptimism_SnapshotRoot>;
  localoptimism_snapshotRoots: Array<localoptimism_SnapshotRoot>;
  localoptimism_spokeConnectorMode?: Maybe<localoptimism_SpokeConnectorMode>;
  localoptimism_spokeConnectorModes: Array<localoptimism_SpokeConnectorMode>;
  localoptimism_aggregateRootProposed?: Maybe<localoptimism_AggregateRootProposed>;
  localoptimism_aggregateRootProposeds: Array<localoptimism_AggregateRootProposed>;
  localoptimism_optimisticRootFinalized?: Maybe<localoptimism_OptimisticRootFinalized>;
  localoptimism_optimisticRootFinalizeds: Array<localoptimism_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  localoptimism__meta?: Maybe<localoptimism__Meta_>;
};


export type Subscriptionlocaloptimism_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_Asset_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_Asset_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_AssetStatus_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_AssetBalance_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_Router_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_Router_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_RouterDailyTVL_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_RouterLiquidityEvent_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_Setting_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_Setting_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_Relayer_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_Relayer_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_Sequencer_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_Sequencer_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_RelayerFee_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_OriginTransfer_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_DestinationTransfer_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_OriginMessage_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_AggregateRoot_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_ConnectorMeta_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_RootCount_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_RootCount_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_RootMessageSent_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_RelayerFeesIncrease_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_SlippageUpdate_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_SnapshotRoot_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_SpokeConnectorMode_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_AggregateRootProposed_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localoptimism_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<localoptimism_OrderDirection>;
  where?: InputMaybe<localoptimism_OptimisticRootFinalized_filter>;
  block?: InputMaybe<localoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocaloptimism__metaArgs = {
  block?: InputMaybe<localoptimism_Block_height>;
};

export type localoptimism_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type localoptimism__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['localoptimism_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type localoptimism__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: localoptimism__Block_;
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
  localoptimism_asset: InContextSdkMethod<Query['localoptimism_asset'], Querylocaloptimism_assetArgs, MeshContext>,
  /** null **/
  localoptimism_assets: InContextSdkMethod<Query['localoptimism_assets'], Querylocaloptimism_assetsArgs, MeshContext>,
  /** null **/
  localoptimism_assetStatus: InContextSdkMethod<Query['localoptimism_assetStatus'], Querylocaloptimism_assetStatusArgs, MeshContext>,
  /** null **/
  localoptimism_assetStatuses: InContextSdkMethod<Query['localoptimism_assetStatuses'], Querylocaloptimism_assetStatusesArgs, MeshContext>,
  /** null **/
  localoptimism_assetBalance: InContextSdkMethod<Query['localoptimism_assetBalance'], Querylocaloptimism_assetBalanceArgs, MeshContext>,
  /** null **/
  localoptimism_assetBalances: InContextSdkMethod<Query['localoptimism_assetBalances'], Querylocaloptimism_assetBalancesArgs, MeshContext>,
  /** null **/
  localoptimism_router: InContextSdkMethod<Query['localoptimism_router'], Querylocaloptimism_routerArgs, MeshContext>,
  /** null **/
  localoptimism_routers: InContextSdkMethod<Query['localoptimism_routers'], Querylocaloptimism_routersArgs, MeshContext>,
  /** null **/
  localoptimism_routerDailyTVL: InContextSdkMethod<Query['localoptimism_routerDailyTVL'], Querylocaloptimism_routerDailyTVLArgs, MeshContext>,
  /** null **/
  localoptimism_routerDailyTVLs: InContextSdkMethod<Query['localoptimism_routerDailyTVLs'], Querylocaloptimism_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  localoptimism_routerLiquidityEvent: InContextSdkMethod<Query['localoptimism_routerLiquidityEvent'], Querylocaloptimism_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  localoptimism_routerLiquidityEvents: InContextSdkMethod<Query['localoptimism_routerLiquidityEvents'], Querylocaloptimism_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  localoptimism_setting: InContextSdkMethod<Query['localoptimism_setting'], Querylocaloptimism_settingArgs, MeshContext>,
  /** null **/
  localoptimism_settings: InContextSdkMethod<Query['localoptimism_settings'], Querylocaloptimism_settingsArgs, MeshContext>,
  /** null **/
  localoptimism_relayer: InContextSdkMethod<Query['localoptimism_relayer'], Querylocaloptimism_relayerArgs, MeshContext>,
  /** null **/
  localoptimism_relayers: InContextSdkMethod<Query['localoptimism_relayers'], Querylocaloptimism_relayersArgs, MeshContext>,
  /** null **/
  localoptimism_sequencer: InContextSdkMethod<Query['localoptimism_sequencer'], Querylocaloptimism_sequencerArgs, MeshContext>,
  /** null **/
  localoptimism_sequencers: InContextSdkMethod<Query['localoptimism_sequencers'], Querylocaloptimism_sequencersArgs, MeshContext>,
  /** null **/
  localoptimism_relayerFee: InContextSdkMethod<Query['localoptimism_relayerFee'], Querylocaloptimism_relayerFeeArgs, MeshContext>,
  /** null **/
  localoptimism_relayerFees: InContextSdkMethod<Query['localoptimism_relayerFees'], Querylocaloptimism_relayerFeesArgs, MeshContext>,
  /** null **/
  localoptimism_originTransfer: InContextSdkMethod<Query['localoptimism_originTransfer'], Querylocaloptimism_originTransferArgs, MeshContext>,
  /** null **/
  localoptimism_originTransfers: InContextSdkMethod<Query['localoptimism_originTransfers'], Querylocaloptimism_originTransfersArgs, MeshContext>,
  /** null **/
  localoptimism_destinationTransfer: InContextSdkMethod<Query['localoptimism_destinationTransfer'], Querylocaloptimism_destinationTransferArgs, MeshContext>,
  /** null **/
  localoptimism_destinationTransfers: InContextSdkMethod<Query['localoptimism_destinationTransfers'], Querylocaloptimism_destinationTransfersArgs, MeshContext>,
  /** null **/
  localoptimism_originMessage: InContextSdkMethod<Query['localoptimism_originMessage'], Querylocaloptimism_originMessageArgs, MeshContext>,
  /** null **/
  localoptimism_originMessages: InContextSdkMethod<Query['localoptimism_originMessages'], Querylocaloptimism_originMessagesArgs, MeshContext>,
  /** null **/
  localoptimism_aggregateRoot: InContextSdkMethod<Query['localoptimism_aggregateRoot'], Querylocaloptimism_aggregateRootArgs, MeshContext>,
  /** null **/
  localoptimism_aggregateRoots: InContextSdkMethod<Query['localoptimism_aggregateRoots'], Querylocaloptimism_aggregateRootsArgs, MeshContext>,
  /** null **/
  localoptimism_connectorMeta: InContextSdkMethod<Query['localoptimism_connectorMeta'], Querylocaloptimism_connectorMetaArgs, MeshContext>,
  /** null **/
  localoptimism_connectorMetas: InContextSdkMethod<Query['localoptimism_connectorMetas'], Querylocaloptimism_connectorMetasArgs, MeshContext>,
  /** null **/
  localoptimism_rootCount: InContextSdkMethod<Query['localoptimism_rootCount'], Querylocaloptimism_rootCountArgs, MeshContext>,
  /** null **/
  localoptimism_rootCounts: InContextSdkMethod<Query['localoptimism_rootCounts'], Querylocaloptimism_rootCountsArgs, MeshContext>,
  /** null **/
  localoptimism_rootMessageSent: InContextSdkMethod<Query['localoptimism_rootMessageSent'], Querylocaloptimism_rootMessageSentArgs, MeshContext>,
  /** null **/
  localoptimism_rootMessageSents: InContextSdkMethod<Query['localoptimism_rootMessageSents'], Querylocaloptimism_rootMessageSentsArgs, MeshContext>,
  /** null **/
  localoptimism_relayerFeesIncrease: InContextSdkMethod<Query['localoptimism_relayerFeesIncrease'], Querylocaloptimism_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  localoptimism_relayerFeesIncreases: InContextSdkMethod<Query['localoptimism_relayerFeesIncreases'], Querylocaloptimism_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  localoptimism_slippageUpdate: InContextSdkMethod<Query['localoptimism_slippageUpdate'], Querylocaloptimism_slippageUpdateArgs, MeshContext>,
  /** null **/
  localoptimism_slippageUpdates: InContextSdkMethod<Query['localoptimism_slippageUpdates'], Querylocaloptimism_slippageUpdatesArgs, MeshContext>,
  /** null **/
  localoptimism_snapshotRoot: InContextSdkMethod<Query['localoptimism_snapshotRoot'], Querylocaloptimism_snapshotRootArgs, MeshContext>,
  /** null **/
  localoptimism_snapshotRoots: InContextSdkMethod<Query['localoptimism_snapshotRoots'], Querylocaloptimism_snapshotRootsArgs, MeshContext>,
  /** null **/
  localoptimism_spokeConnectorMode: InContextSdkMethod<Query['localoptimism_spokeConnectorMode'], Querylocaloptimism_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  localoptimism_spokeConnectorModes: InContextSdkMethod<Query['localoptimism_spokeConnectorModes'], Querylocaloptimism_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  localoptimism_aggregateRootProposed: InContextSdkMethod<Query['localoptimism_aggregateRootProposed'], Querylocaloptimism_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  localoptimism_aggregateRootProposeds: InContextSdkMethod<Query['localoptimism_aggregateRootProposeds'], Querylocaloptimism_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  localoptimism_optimisticRootFinalized: InContextSdkMethod<Query['localoptimism_optimisticRootFinalized'], Querylocaloptimism_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  localoptimism_optimisticRootFinalizeds: InContextSdkMethod<Query['localoptimism_optimisticRootFinalizeds'], Querylocaloptimism_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  localoptimism__meta: InContextSdkMethod<Query['localoptimism__meta'], Querylocaloptimism__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  localoptimism_asset: InContextSdkMethod<Subscription['localoptimism_asset'], Subscriptionlocaloptimism_assetArgs, MeshContext>,
  /** null **/
  localoptimism_assets: InContextSdkMethod<Subscription['localoptimism_assets'], Subscriptionlocaloptimism_assetsArgs, MeshContext>,
  /** null **/
  localoptimism_assetStatus: InContextSdkMethod<Subscription['localoptimism_assetStatus'], Subscriptionlocaloptimism_assetStatusArgs, MeshContext>,
  /** null **/
  localoptimism_assetStatuses: InContextSdkMethod<Subscription['localoptimism_assetStatuses'], Subscriptionlocaloptimism_assetStatusesArgs, MeshContext>,
  /** null **/
  localoptimism_assetBalance: InContextSdkMethod<Subscription['localoptimism_assetBalance'], Subscriptionlocaloptimism_assetBalanceArgs, MeshContext>,
  /** null **/
  localoptimism_assetBalances: InContextSdkMethod<Subscription['localoptimism_assetBalances'], Subscriptionlocaloptimism_assetBalancesArgs, MeshContext>,
  /** null **/
  localoptimism_router: InContextSdkMethod<Subscription['localoptimism_router'], Subscriptionlocaloptimism_routerArgs, MeshContext>,
  /** null **/
  localoptimism_routers: InContextSdkMethod<Subscription['localoptimism_routers'], Subscriptionlocaloptimism_routersArgs, MeshContext>,
  /** null **/
  localoptimism_routerDailyTVL: InContextSdkMethod<Subscription['localoptimism_routerDailyTVL'], Subscriptionlocaloptimism_routerDailyTVLArgs, MeshContext>,
  /** null **/
  localoptimism_routerDailyTVLs: InContextSdkMethod<Subscription['localoptimism_routerDailyTVLs'], Subscriptionlocaloptimism_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  localoptimism_routerLiquidityEvent: InContextSdkMethod<Subscription['localoptimism_routerLiquidityEvent'], Subscriptionlocaloptimism_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  localoptimism_routerLiquidityEvents: InContextSdkMethod<Subscription['localoptimism_routerLiquidityEvents'], Subscriptionlocaloptimism_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  localoptimism_setting: InContextSdkMethod<Subscription['localoptimism_setting'], Subscriptionlocaloptimism_settingArgs, MeshContext>,
  /** null **/
  localoptimism_settings: InContextSdkMethod<Subscription['localoptimism_settings'], Subscriptionlocaloptimism_settingsArgs, MeshContext>,
  /** null **/
  localoptimism_relayer: InContextSdkMethod<Subscription['localoptimism_relayer'], Subscriptionlocaloptimism_relayerArgs, MeshContext>,
  /** null **/
  localoptimism_relayers: InContextSdkMethod<Subscription['localoptimism_relayers'], Subscriptionlocaloptimism_relayersArgs, MeshContext>,
  /** null **/
  localoptimism_sequencer: InContextSdkMethod<Subscription['localoptimism_sequencer'], Subscriptionlocaloptimism_sequencerArgs, MeshContext>,
  /** null **/
  localoptimism_sequencers: InContextSdkMethod<Subscription['localoptimism_sequencers'], Subscriptionlocaloptimism_sequencersArgs, MeshContext>,
  /** null **/
  localoptimism_relayerFee: InContextSdkMethod<Subscription['localoptimism_relayerFee'], Subscriptionlocaloptimism_relayerFeeArgs, MeshContext>,
  /** null **/
  localoptimism_relayerFees: InContextSdkMethod<Subscription['localoptimism_relayerFees'], Subscriptionlocaloptimism_relayerFeesArgs, MeshContext>,
  /** null **/
  localoptimism_originTransfer: InContextSdkMethod<Subscription['localoptimism_originTransfer'], Subscriptionlocaloptimism_originTransferArgs, MeshContext>,
  /** null **/
  localoptimism_originTransfers: InContextSdkMethod<Subscription['localoptimism_originTransfers'], Subscriptionlocaloptimism_originTransfersArgs, MeshContext>,
  /** null **/
  localoptimism_destinationTransfer: InContextSdkMethod<Subscription['localoptimism_destinationTransfer'], Subscriptionlocaloptimism_destinationTransferArgs, MeshContext>,
  /** null **/
  localoptimism_destinationTransfers: InContextSdkMethod<Subscription['localoptimism_destinationTransfers'], Subscriptionlocaloptimism_destinationTransfersArgs, MeshContext>,
  /** null **/
  localoptimism_originMessage: InContextSdkMethod<Subscription['localoptimism_originMessage'], Subscriptionlocaloptimism_originMessageArgs, MeshContext>,
  /** null **/
  localoptimism_originMessages: InContextSdkMethod<Subscription['localoptimism_originMessages'], Subscriptionlocaloptimism_originMessagesArgs, MeshContext>,
  /** null **/
  localoptimism_aggregateRoot: InContextSdkMethod<Subscription['localoptimism_aggregateRoot'], Subscriptionlocaloptimism_aggregateRootArgs, MeshContext>,
  /** null **/
  localoptimism_aggregateRoots: InContextSdkMethod<Subscription['localoptimism_aggregateRoots'], Subscriptionlocaloptimism_aggregateRootsArgs, MeshContext>,
  /** null **/
  localoptimism_connectorMeta: InContextSdkMethod<Subscription['localoptimism_connectorMeta'], Subscriptionlocaloptimism_connectorMetaArgs, MeshContext>,
  /** null **/
  localoptimism_connectorMetas: InContextSdkMethod<Subscription['localoptimism_connectorMetas'], Subscriptionlocaloptimism_connectorMetasArgs, MeshContext>,
  /** null **/
  localoptimism_rootCount: InContextSdkMethod<Subscription['localoptimism_rootCount'], Subscriptionlocaloptimism_rootCountArgs, MeshContext>,
  /** null **/
  localoptimism_rootCounts: InContextSdkMethod<Subscription['localoptimism_rootCounts'], Subscriptionlocaloptimism_rootCountsArgs, MeshContext>,
  /** null **/
  localoptimism_rootMessageSent: InContextSdkMethod<Subscription['localoptimism_rootMessageSent'], Subscriptionlocaloptimism_rootMessageSentArgs, MeshContext>,
  /** null **/
  localoptimism_rootMessageSents: InContextSdkMethod<Subscription['localoptimism_rootMessageSents'], Subscriptionlocaloptimism_rootMessageSentsArgs, MeshContext>,
  /** null **/
  localoptimism_relayerFeesIncrease: InContextSdkMethod<Subscription['localoptimism_relayerFeesIncrease'], Subscriptionlocaloptimism_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  localoptimism_relayerFeesIncreases: InContextSdkMethod<Subscription['localoptimism_relayerFeesIncreases'], Subscriptionlocaloptimism_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  localoptimism_slippageUpdate: InContextSdkMethod<Subscription['localoptimism_slippageUpdate'], Subscriptionlocaloptimism_slippageUpdateArgs, MeshContext>,
  /** null **/
  localoptimism_slippageUpdates: InContextSdkMethod<Subscription['localoptimism_slippageUpdates'], Subscriptionlocaloptimism_slippageUpdatesArgs, MeshContext>,
  /** null **/
  localoptimism_snapshotRoot: InContextSdkMethod<Subscription['localoptimism_snapshotRoot'], Subscriptionlocaloptimism_snapshotRootArgs, MeshContext>,
  /** null **/
  localoptimism_snapshotRoots: InContextSdkMethod<Subscription['localoptimism_snapshotRoots'], Subscriptionlocaloptimism_snapshotRootsArgs, MeshContext>,
  /** null **/
  localoptimism_spokeConnectorMode: InContextSdkMethod<Subscription['localoptimism_spokeConnectorMode'], Subscriptionlocaloptimism_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  localoptimism_spokeConnectorModes: InContextSdkMethod<Subscription['localoptimism_spokeConnectorModes'], Subscriptionlocaloptimism_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  localoptimism_aggregateRootProposed: InContextSdkMethod<Subscription['localoptimism_aggregateRootProposed'], Subscriptionlocaloptimism_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  localoptimism_aggregateRootProposeds: InContextSdkMethod<Subscription['localoptimism_aggregateRootProposeds'], Subscriptionlocaloptimism_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  localoptimism_optimisticRootFinalized: InContextSdkMethod<Subscription['localoptimism_optimisticRootFinalized'], Subscriptionlocaloptimism_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  localoptimism_optimisticRootFinalizeds: InContextSdkMethod<Subscription['localoptimism_optimisticRootFinalizeds'], Subscriptionlocaloptimism_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  localoptimism__meta: InContextSdkMethod<Subscription['localoptimism__meta'], Subscriptionlocaloptimism__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_LocalOptimism"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
