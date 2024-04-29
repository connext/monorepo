// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextArbitrumOneTypes {
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
  arbitrumone_BigDecimal: any;
  BigInt: any;
  arbitrumone_Bytes: any;
  arbitrumone_Int8: any;
  Timestamp: any;
};

export type arbitrumone_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['arbitrumone_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type arbitrumone_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['arbitrumone_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type arbitrumone_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumone_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumone_AggregateRootProposed_filter>>>;
};

export type arbitrumone_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type arbitrumone_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  root_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumone_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumone_AggregateRoot_filter>>>;
};

export type arbitrumone_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type arbitrumone_Aggregation_interval =
  | 'hour'
  | 'day';

export type arbitrumone_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['arbitrumone_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['arbitrumone_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['arbitrumone_Bytes']>;
  localAsset?: Maybe<Scalars['arbitrumone_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<arbitrumone_AssetStatus>;
};

export type arbitrumone_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: arbitrumone_Router;
  asset: arbitrumone_Asset;
  feesEarned: Scalars['BigInt'];
};

export type arbitrumone_AssetBalance_filter = {
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
  router_?: InputMaybe<arbitrumone_Router_filter>;
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
  asset_?: InputMaybe<arbitrumone_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumone_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumone_AssetBalance_filter>>>;
};

export type arbitrumone_AssetBalance_orderBy =
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

export type arbitrumone_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type arbitrumone_AssetStatus_filter = {
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
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumone_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumone_AssetStatus_filter>>>;
};

export type arbitrumone_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type arbitrumone_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  key_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  key_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  key_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  key_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  key_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  key_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  localAsset?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  status_?: InputMaybe<arbitrumone_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumone_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumone_Asset_filter>>>;
};

export type arbitrumone_Asset_orderBy =
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

export type arbitrumone_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type arbitrumone_Block_height = {
  hash?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type arbitrumone_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['arbitrumone_Bytes']>;
  rootManager?: Maybe<Scalars['arbitrumone_Bytes']>;
  mirrorConnector?: Maybe<Scalars['arbitrumone_Bytes']>;
};

export type arbitrumone_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  amb_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  amb_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  amb_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  amb_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  amb_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  rootManager?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumone_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumone_ConnectorMeta_filter>>>;
};

export type arbitrumone_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type arbitrumone_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['arbitrumone_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<arbitrumone_TransferStatus>;
  routers?: Maybe<Array<arbitrumone_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['arbitrumone_Bytes']>;
  delegate?: Maybe<Scalars['arbitrumone_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['arbitrumone_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['arbitrumone_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['arbitrumone_Bytes']>;
  asset?: Maybe<arbitrumone_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['arbitrumone_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['arbitrumone_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['arbitrumone_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['arbitrumone_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['arbitrumone_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['arbitrumone_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type arbitrumone_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_Router_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_Router_filter>;
};

export type arbitrumone_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<arbitrumone_TransferStatus>;
  status_not?: InputMaybe<arbitrumone_TransferStatus>;
  status_in?: InputMaybe<Array<arbitrumone_TransferStatus>>;
  status_not_in?: InputMaybe<Array<arbitrumone_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<arbitrumone_Router_filter>;
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
  to?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  to_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  to_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  to_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  to_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  to_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  to_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  callData_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  callData_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  callData_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  callData_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  callData_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  originSender?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  originSender_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  asset_?: InputMaybe<arbitrumone_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumone_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumone_DestinationTransfer_filter>>>;
};

export type arbitrumone_DestinationTransfer_orderBy =
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

export type arbitrumone_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['arbitrumone_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type arbitrumone_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumone_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumone_OptimisticRootFinalized_filter>>>;
};

export type arbitrumone_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type arbitrumone_OrderDirection =
  | 'asc'
  | 'desc';

export type arbitrumone_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['arbitrumone_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['arbitrumone_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['arbitrumone_Bytes']>;
  root?: Maybe<Scalars['arbitrumone_Bytes']>;
  transactionHash?: Maybe<Scalars['arbitrumone_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<arbitrumone_RootCount>;
};

export type arbitrumone_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  leaf_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  message_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  message_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  message_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  message_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  message_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  message_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  root_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  rootCount_?: InputMaybe<arbitrumone_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumone_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumone_OriginMessage_filter>>>;
};

export type arbitrumone_OriginMessage_orderBy =
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

export type arbitrumone_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['arbitrumone_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<arbitrumone_TransferStatus>;
  messageHash?: Maybe<Scalars['arbitrumone_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['arbitrumone_Bytes']>;
  delegate?: Maybe<Scalars['arbitrumone_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['arbitrumone_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['arbitrumone_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['arbitrumone_Bytes']>;
  asset?: Maybe<arbitrumone_Asset>;
  transactingAsset?: Maybe<Scalars['arbitrumone_Bytes']>;
  message?: Maybe<arbitrumone_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<arbitrumone_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['arbitrumone_Bytes']>;
  caller?: Maybe<Scalars['arbitrumone_Bytes']>;
  transactionHash?: Maybe<Scalars['arbitrumone_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['arbitrumone_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type arbitrumone_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_RelayerFee_filter>;
};

export type arbitrumone_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<arbitrumone_TransferStatus>;
  status_not?: InputMaybe<arbitrumone_TransferStatus>;
  status_in?: InputMaybe<Array<arbitrumone_TransferStatus>>;
  status_not_in?: InputMaybe<Array<arbitrumone_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  to?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  to_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  to_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  to_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  to_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  to_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  to_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  callData_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  callData_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  callData_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  callData_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  callData_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  originSender_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  asset_?: InputMaybe<arbitrumone_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  message_?: InputMaybe<arbitrumone_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<arbitrumone_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumone_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumone_OriginTransfer_filter>>>;
};

export type arbitrumone_OriginTransfer_orderBy =
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
  arbitrumone_asset?: Maybe<arbitrumone_Asset>;
  arbitrumone_assets: Array<arbitrumone_Asset>;
  arbitrumone_assetStatus?: Maybe<arbitrumone_AssetStatus>;
  arbitrumone_assetStatuses: Array<arbitrumone_AssetStatus>;
  arbitrumone_assetBalance?: Maybe<arbitrumone_AssetBalance>;
  arbitrumone_assetBalances: Array<arbitrumone_AssetBalance>;
  arbitrumone_router?: Maybe<arbitrumone_Router>;
  arbitrumone_routers: Array<arbitrumone_Router>;
  arbitrumone_routerDailyTVL?: Maybe<arbitrumone_RouterDailyTVL>;
  arbitrumone_routerDailyTVLs: Array<arbitrumone_RouterDailyTVL>;
  arbitrumone_routerLiquidityEvent?: Maybe<arbitrumone_RouterLiquidityEvent>;
  arbitrumone_routerLiquidityEvents: Array<arbitrumone_RouterLiquidityEvent>;
  arbitrumone_setting?: Maybe<arbitrumone_Setting>;
  arbitrumone_settings: Array<arbitrumone_Setting>;
  arbitrumone_relayer?: Maybe<arbitrumone_Relayer>;
  arbitrumone_relayers: Array<arbitrumone_Relayer>;
  arbitrumone_sequencer?: Maybe<arbitrumone_Sequencer>;
  arbitrumone_sequencers: Array<arbitrumone_Sequencer>;
  arbitrumone_relayerFee?: Maybe<arbitrumone_RelayerFee>;
  arbitrumone_relayerFees: Array<arbitrumone_RelayerFee>;
  arbitrumone_originTransfer?: Maybe<arbitrumone_OriginTransfer>;
  arbitrumone_originTransfers: Array<arbitrumone_OriginTransfer>;
  arbitrumone_destinationTransfer?: Maybe<arbitrumone_DestinationTransfer>;
  arbitrumone_destinationTransfers: Array<arbitrumone_DestinationTransfer>;
  arbitrumone_originMessage?: Maybe<arbitrumone_OriginMessage>;
  arbitrumone_originMessages: Array<arbitrumone_OriginMessage>;
  arbitrumone_aggregateRoot?: Maybe<arbitrumone_AggregateRoot>;
  arbitrumone_aggregateRoots: Array<arbitrumone_AggregateRoot>;
  arbitrumone_connectorMeta?: Maybe<arbitrumone_ConnectorMeta>;
  arbitrumone_connectorMetas: Array<arbitrumone_ConnectorMeta>;
  arbitrumone_rootCount?: Maybe<arbitrumone_RootCount>;
  arbitrumone_rootCounts: Array<arbitrumone_RootCount>;
  arbitrumone_rootMessageSent?: Maybe<arbitrumone_RootMessageSent>;
  arbitrumone_rootMessageSents: Array<arbitrumone_RootMessageSent>;
  arbitrumone_relayerFeesIncrease?: Maybe<arbitrumone_RelayerFeesIncrease>;
  arbitrumone_relayerFeesIncreases: Array<arbitrumone_RelayerFeesIncrease>;
  arbitrumone_slippageUpdate?: Maybe<arbitrumone_SlippageUpdate>;
  arbitrumone_slippageUpdates: Array<arbitrumone_SlippageUpdate>;
  arbitrumone_snapshotRoot?: Maybe<arbitrumone_SnapshotRoot>;
  arbitrumone_snapshotRoots: Array<arbitrumone_SnapshotRoot>;
  arbitrumone_spokeConnectorMode?: Maybe<arbitrumone_SpokeConnectorMode>;
  arbitrumone_spokeConnectorModes: Array<arbitrumone_SpokeConnectorMode>;
  arbitrumone_aggregateRootProposed?: Maybe<arbitrumone_AggregateRootProposed>;
  arbitrumone_aggregateRootProposeds: Array<arbitrumone_AggregateRootProposed>;
  arbitrumone_optimisticRootFinalized?: Maybe<arbitrumone_OptimisticRootFinalized>;
  arbitrumone_optimisticRootFinalizeds: Array<arbitrumone_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  arbitrumone__meta?: Maybe<arbitrumone__Meta_>;
};


export type Queryarbitrumone_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_Asset_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_Asset_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_AssetStatus_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_AssetBalance_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_Router_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_Router_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_RouterDailyTVL_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_RouterLiquidityEvent_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_Setting_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_Setting_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_Relayer_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_Relayer_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_Sequencer_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_Sequencer_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_RelayerFee_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_OriginTransfer_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_DestinationTransfer_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_OriginMessage_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_AggregateRoot_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_ConnectorMeta_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_RootCount_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_RootCount_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_RootMessageSent_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_RelayerFeesIncrease_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_SlippageUpdate_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_SnapshotRoot_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_SpokeConnectorMode_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_AggregateRootProposed_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_OptimisticRootFinalized_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone__metaArgs = {
  block?: InputMaybe<arbitrumone_Block_height>;
};

export type arbitrumone_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['arbitrumone_Bytes']>;
};

export type arbitrumone_RelayerFee = {
  id: Scalars['ID'];
  transfer: arbitrumone_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['arbitrumone_Bytes'];
};

export type arbitrumone_RelayerFee_filter = {
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
  transfer_?: InputMaybe<arbitrumone_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumone_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumone_RelayerFee_filter>>>;
};

export type arbitrumone_RelayerFee_orderBy =
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

export type arbitrumone_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: arbitrumone_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['arbitrumone_Bytes']>;
  caller: Scalars['arbitrumone_Bytes'];
  transactionHash: Scalars['arbitrumone_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type arbitrumone_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<arbitrumone_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumone_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumone_RelayerFeesIncrease_filter>>>;
};

export type arbitrumone_RelayerFeesIncrease_orderBy =
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

export type arbitrumone_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  relayer_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumone_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumone_Relayer_filter>>>;
};

export type arbitrumone_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type arbitrumone_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type arbitrumone_RootCount_filter = {
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
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumone_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumone_RootCount_filter>>>;
};

export type arbitrumone_RootCount_orderBy =
  | 'id'
  | 'count';

export type arbitrumone_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['arbitrumone_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['arbitrumone_Bytes']>;
  transactionHash?: Maybe<Scalars['arbitrumone_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type arbitrumone_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  root_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumone_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumone_RootMessageSent_filter>>>;
};

export type arbitrumone_RootMessageSent_orderBy =
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

export type arbitrumone_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['arbitrumone_Bytes']>;
  recipient?: Maybe<Scalars['arbitrumone_Bytes']>;
  proposedOwner?: Maybe<Scalars['arbitrumone_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<arbitrumone_AssetBalance>;
};


export type arbitrumone_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_AssetBalance_filter>;
};

export type arbitrumone_RouterDailyTVL = {
  id: Scalars['ID'];
  router: arbitrumone_Router;
  asset: arbitrumone_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type arbitrumone_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<arbitrumone_Router_filter>;
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
  asset_?: InputMaybe<arbitrumone_Asset_filter>;
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
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumone_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumone_RouterDailyTVL_filter>>>;
};

export type arbitrumone_RouterDailyTVL_orderBy =
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

export type arbitrumone_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<arbitrumone_RouterLiquidityEventType>;
  router: arbitrumone_Router;
  asset: arbitrumone_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['arbitrumone_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['arbitrumone_Bytes'];
  nonce: Scalars['BigInt'];
};

export type arbitrumone_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type arbitrumone_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<arbitrumone_RouterLiquidityEventType>;
  type_not?: InputMaybe<arbitrumone_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<arbitrumone_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<arbitrumone_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<arbitrumone_Router_filter>;
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
  asset_?: InputMaybe<arbitrumone_Asset_filter>;
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
  caller?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumone_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumone_RouterLiquidityEvent_filter>>>;
};

export type arbitrumone_RouterLiquidityEvent_orderBy =
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

export type arbitrumone_Router_filter = {
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
  owner?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  owner_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  owner_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  owner_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  owner_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  owner_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  recipient?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  recipient_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<arbitrumone_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumone_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumone_Router_filter>>>;
};

export type arbitrumone_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type arbitrumone_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['arbitrumone_Bytes']>;
};

export type arbitrumone_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumone_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumone_Sequencer_filter>>>;
};

export type arbitrumone_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type arbitrumone_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['arbitrumone_Bytes'];
};

export type arbitrumone_Setting_filter = {
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
  caller?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumone_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumone_Setting_filter>>>;
};

export type arbitrumone_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type arbitrumone_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: arbitrumone_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['arbitrumone_Bytes'];
  transactionHash: Scalars['arbitrumone_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type arbitrumone_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<arbitrumone_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumone_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumone_SlippageUpdate_filter>>>;
};

export type arbitrumone_SlippageUpdate_orderBy =
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

export type arbitrumone_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['arbitrumone_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type arbitrumone_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  root_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumone_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumone_SnapshotRoot_filter>>>;
};

export type arbitrumone_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type arbitrumone_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type arbitrumone_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumone_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumone_SpokeConnectorMode_filter>>>;
};

export type arbitrumone_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  arbitrumone_asset?: Maybe<arbitrumone_Asset>;
  arbitrumone_assets: Array<arbitrumone_Asset>;
  arbitrumone_assetStatus?: Maybe<arbitrumone_AssetStatus>;
  arbitrumone_assetStatuses: Array<arbitrumone_AssetStatus>;
  arbitrumone_assetBalance?: Maybe<arbitrumone_AssetBalance>;
  arbitrumone_assetBalances: Array<arbitrumone_AssetBalance>;
  arbitrumone_router?: Maybe<arbitrumone_Router>;
  arbitrumone_routers: Array<arbitrumone_Router>;
  arbitrumone_routerDailyTVL?: Maybe<arbitrumone_RouterDailyTVL>;
  arbitrumone_routerDailyTVLs: Array<arbitrumone_RouterDailyTVL>;
  arbitrumone_routerLiquidityEvent?: Maybe<arbitrumone_RouterLiquidityEvent>;
  arbitrumone_routerLiquidityEvents: Array<arbitrumone_RouterLiquidityEvent>;
  arbitrumone_setting?: Maybe<arbitrumone_Setting>;
  arbitrumone_settings: Array<arbitrumone_Setting>;
  arbitrumone_relayer?: Maybe<arbitrumone_Relayer>;
  arbitrumone_relayers: Array<arbitrumone_Relayer>;
  arbitrumone_sequencer?: Maybe<arbitrumone_Sequencer>;
  arbitrumone_sequencers: Array<arbitrumone_Sequencer>;
  arbitrumone_relayerFee?: Maybe<arbitrumone_RelayerFee>;
  arbitrumone_relayerFees: Array<arbitrumone_RelayerFee>;
  arbitrumone_originTransfer?: Maybe<arbitrumone_OriginTransfer>;
  arbitrumone_originTransfers: Array<arbitrumone_OriginTransfer>;
  arbitrumone_destinationTransfer?: Maybe<arbitrumone_DestinationTransfer>;
  arbitrumone_destinationTransfers: Array<arbitrumone_DestinationTransfer>;
  arbitrumone_originMessage?: Maybe<arbitrumone_OriginMessage>;
  arbitrumone_originMessages: Array<arbitrumone_OriginMessage>;
  arbitrumone_aggregateRoot?: Maybe<arbitrumone_AggregateRoot>;
  arbitrumone_aggregateRoots: Array<arbitrumone_AggregateRoot>;
  arbitrumone_connectorMeta?: Maybe<arbitrumone_ConnectorMeta>;
  arbitrumone_connectorMetas: Array<arbitrumone_ConnectorMeta>;
  arbitrumone_rootCount?: Maybe<arbitrumone_RootCount>;
  arbitrumone_rootCounts: Array<arbitrumone_RootCount>;
  arbitrumone_rootMessageSent?: Maybe<arbitrumone_RootMessageSent>;
  arbitrumone_rootMessageSents: Array<arbitrumone_RootMessageSent>;
  arbitrumone_relayerFeesIncrease?: Maybe<arbitrumone_RelayerFeesIncrease>;
  arbitrumone_relayerFeesIncreases: Array<arbitrumone_RelayerFeesIncrease>;
  arbitrumone_slippageUpdate?: Maybe<arbitrumone_SlippageUpdate>;
  arbitrumone_slippageUpdates: Array<arbitrumone_SlippageUpdate>;
  arbitrumone_snapshotRoot?: Maybe<arbitrumone_SnapshotRoot>;
  arbitrumone_snapshotRoots: Array<arbitrumone_SnapshotRoot>;
  arbitrumone_spokeConnectorMode?: Maybe<arbitrumone_SpokeConnectorMode>;
  arbitrumone_spokeConnectorModes: Array<arbitrumone_SpokeConnectorMode>;
  arbitrumone_aggregateRootProposed?: Maybe<arbitrumone_AggregateRootProposed>;
  arbitrumone_aggregateRootProposeds: Array<arbitrumone_AggregateRootProposed>;
  arbitrumone_optimisticRootFinalized?: Maybe<arbitrumone_OptimisticRootFinalized>;
  arbitrumone_optimisticRootFinalizeds: Array<arbitrumone_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  arbitrumone__meta?: Maybe<arbitrumone__Meta_>;
};


export type Subscriptionarbitrumone_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_Asset_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_Asset_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_AssetStatus_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_AssetBalance_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_Router_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_Router_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_RouterDailyTVL_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_RouterLiquidityEvent_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_Setting_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_Setting_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_Relayer_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_Relayer_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_Sequencer_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_Sequencer_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_RelayerFee_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_OriginTransfer_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_DestinationTransfer_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_OriginMessage_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_AggregateRoot_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_ConnectorMeta_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_RootCount_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_RootCount_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_RootMessageSent_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_RelayerFeesIncrease_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_SlippageUpdate_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_SnapshotRoot_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_SpokeConnectorMode_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_AggregateRootProposed_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_OptimisticRootFinalized_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone__metaArgs = {
  block?: InputMaybe<arbitrumone_Block_height>;
};

export type arbitrumone_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type arbitrumone__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['arbitrumone_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['arbitrumone_Bytes']>;
};

/** The type for the top-level _meta field */
export type arbitrumone__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: arbitrumone__Block_;
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
  arbitrumone_asset: InContextSdkMethod<Query['arbitrumone_asset'], Queryarbitrumone_assetArgs, MeshContext>,
  /** null **/
  arbitrumone_assets: InContextSdkMethod<Query['arbitrumone_assets'], Queryarbitrumone_assetsArgs, MeshContext>,
  /** null **/
  arbitrumone_assetStatus: InContextSdkMethod<Query['arbitrumone_assetStatus'], Queryarbitrumone_assetStatusArgs, MeshContext>,
  /** null **/
  arbitrumone_assetStatuses: InContextSdkMethod<Query['arbitrumone_assetStatuses'], Queryarbitrumone_assetStatusesArgs, MeshContext>,
  /** null **/
  arbitrumone_assetBalance: InContextSdkMethod<Query['arbitrumone_assetBalance'], Queryarbitrumone_assetBalanceArgs, MeshContext>,
  /** null **/
  arbitrumone_assetBalances: InContextSdkMethod<Query['arbitrumone_assetBalances'], Queryarbitrumone_assetBalancesArgs, MeshContext>,
  /** null **/
  arbitrumone_router: InContextSdkMethod<Query['arbitrumone_router'], Queryarbitrumone_routerArgs, MeshContext>,
  /** null **/
  arbitrumone_routers: InContextSdkMethod<Query['arbitrumone_routers'], Queryarbitrumone_routersArgs, MeshContext>,
  /** null **/
  arbitrumone_routerDailyTVL: InContextSdkMethod<Query['arbitrumone_routerDailyTVL'], Queryarbitrumone_routerDailyTVLArgs, MeshContext>,
  /** null **/
  arbitrumone_routerDailyTVLs: InContextSdkMethod<Query['arbitrumone_routerDailyTVLs'], Queryarbitrumone_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  arbitrumone_routerLiquidityEvent: InContextSdkMethod<Query['arbitrumone_routerLiquidityEvent'], Queryarbitrumone_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  arbitrumone_routerLiquidityEvents: InContextSdkMethod<Query['arbitrumone_routerLiquidityEvents'], Queryarbitrumone_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  arbitrumone_setting: InContextSdkMethod<Query['arbitrumone_setting'], Queryarbitrumone_settingArgs, MeshContext>,
  /** null **/
  arbitrumone_settings: InContextSdkMethod<Query['arbitrumone_settings'], Queryarbitrumone_settingsArgs, MeshContext>,
  /** null **/
  arbitrumone_relayer: InContextSdkMethod<Query['arbitrumone_relayer'], Queryarbitrumone_relayerArgs, MeshContext>,
  /** null **/
  arbitrumone_relayers: InContextSdkMethod<Query['arbitrumone_relayers'], Queryarbitrumone_relayersArgs, MeshContext>,
  /** null **/
  arbitrumone_sequencer: InContextSdkMethod<Query['arbitrumone_sequencer'], Queryarbitrumone_sequencerArgs, MeshContext>,
  /** null **/
  arbitrumone_sequencers: InContextSdkMethod<Query['arbitrumone_sequencers'], Queryarbitrumone_sequencersArgs, MeshContext>,
  /** null **/
  arbitrumone_relayerFee: InContextSdkMethod<Query['arbitrumone_relayerFee'], Queryarbitrumone_relayerFeeArgs, MeshContext>,
  /** null **/
  arbitrumone_relayerFees: InContextSdkMethod<Query['arbitrumone_relayerFees'], Queryarbitrumone_relayerFeesArgs, MeshContext>,
  /** null **/
  arbitrumone_originTransfer: InContextSdkMethod<Query['arbitrumone_originTransfer'], Queryarbitrumone_originTransferArgs, MeshContext>,
  /** null **/
  arbitrumone_originTransfers: InContextSdkMethod<Query['arbitrumone_originTransfers'], Queryarbitrumone_originTransfersArgs, MeshContext>,
  /** null **/
  arbitrumone_destinationTransfer: InContextSdkMethod<Query['arbitrumone_destinationTransfer'], Queryarbitrumone_destinationTransferArgs, MeshContext>,
  /** null **/
  arbitrumone_destinationTransfers: InContextSdkMethod<Query['arbitrumone_destinationTransfers'], Queryarbitrumone_destinationTransfersArgs, MeshContext>,
  /** null **/
  arbitrumone_originMessage: InContextSdkMethod<Query['arbitrumone_originMessage'], Queryarbitrumone_originMessageArgs, MeshContext>,
  /** null **/
  arbitrumone_originMessages: InContextSdkMethod<Query['arbitrumone_originMessages'], Queryarbitrumone_originMessagesArgs, MeshContext>,
  /** null **/
  arbitrumone_aggregateRoot: InContextSdkMethod<Query['arbitrumone_aggregateRoot'], Queryarbitrumone_aggregateRootArgs, MeshContext>,
  /** null **/
  arbitrumone_aggregateRoots: InContextSdkMethod<Query['arbitrumone_aggregateRoots'], Queryarbitrumone_aggregateRootsArgs, MeshContext>,
  /** null **/
  arbitrumone_connectorMeta: InContextSdkMethod<Query['arbitrumone_connectorMeta'], Queryarbitrumone_connectorMetaArgs, MeshContext>,
  /** null **/
  arbitrumone_connectorMetas: InContextSdkMethod<Query['arbitrumone_connectorMetas'], Queryarbitrumone_connectorMetasArgs, MeshContext>,
  /** null **/
  arbitrumone_rootCount: InContextSdkMethod<Query['arbitrumone_rootCount'], Queryarbitrumone_rootCountArgs, MeshContext>,
  /** null **/
  arbitrumone_rootCounts: InContextSdkMethod<Query['arbitrumone_rootCounts'], Queryarbitrumone_rootCountsArgs, MeshContext>,
  /** null **/
  arbitrumone_rootMessageSent: InContextSdkMethod<Query['arbitrumone_rootMessageSent'], Queryarbitrumone_rootMessageSentArgs, MeshContext>,
  /** null **/
  arbitrumone_rootMessageSents: InContextSdkMethod<Query['arbitrumone_rootMessageSents'], Queryarbitrumone_rootMessageSentsArgs, MeshContext>,
  /** null **/
  arbitrumone_relayerFeesIncrease: InContextSdkMethod<Query['arbitrumone_relayerFeesIncrease'], Queryarbitrumone_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  arbitrumone_relayerFeesIncreases: InContextSdkMethod<Query['arbitrumone_relayerFeesIncreases'], Queryarbitrumone_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  arbitrumone_slippageUpdate: InContextSdkMethod<Query['arbitrumone_slippageUpdate'], Queryarbitrumone_slippageUpdateArgs, MeshContext>,
  /** null **/
  arbitrumone_slippageUpdates: InContextSdkMethod<Query['arbitrumone_slippageUpdates'], Queryarbitrumone_slippageUpdatesArgs, MeshContext>,
  /** null **/
  arbitrumone_snapshotRoot: InContextSdkMethod<Query['arbitrumone_snapshotRoot'], Queryarbitrumone_snapshotRootArgs, MeshContext>,
  /** null **/
  arbitrumone_snapshotRoots: InContextSdkMethod<Query['arbitrumone_snapshotRoots'], Queryarbitrumone_snapshotRootsArgs, MeshContext>,
  /** null **/
  arbitrumone_spokeConnectorMode: InContextSdkMethod<Query['arbitrumone_spokeConnectorMode'], Queryarbitrumone_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  arbitrumone_spokeConnectorModes: InContextSdkMethod<Query['arbitrumone_spokeConnectorModes'], Queryarbitrumone_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  arbitrumone_aggregateRootProposed: InContextSdkMethod<Query['arbitrumone_aggregateRootProposed'], Queryarbitrumone_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  arbitrumone_aggregateRootProposeds: InContextSdkMethod<Query['arbitrumone_aggregateRootProposeds'], Queryarbitrumone_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  arbitrumone_optimisticRootFinalized: InContextSdkMethod<Query['arbitrumone_optimisticRootFinalized'], Queryarbitrumone_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  arbitrumone_optimisticRootFinalizeds: InContextSdkMethod<Query['arbitrumone_optimisticRootFinalizeds'], Queryarbitrumone_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  arbitrumone__meta: InContextSdkMethod<Query['arbitrumone__meta'], Queryarbitrumone__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  arbitrumone_asset: InContextSdkMethod<Subscription['arbitrumone_asset'], Subscriptionarbitrumone_assetArgs, MeshContext>,
  /** null **/
  arbitrumone_assets: InContextSdkMethod<Subscription['arbitrumone_assets'], Subscriptionarbitrumone_assetsArgs, MeshContext>,
  /** null **/
  arbitrumone_assetStatus: InContextSdkMethod<Subscription['arbitrumone_assetStatus'], Subscriptionarbitrumone_assetStatusArgs, MeshContext>,
  /** null **/
  arbitrumone_assetStatuses: InContextSdkMethod<Subscription['arbitrumone_assetStatuses'], Subscriptionarbitrumone_assetStatusesArgs, MeshContext>,
  /** null **/
  arbitrumone_assetBalance: InContextSdkMethod<Subscription['arbitrumone_assetBalance'], Subscriptionarbitrumone_assetBalanceArgs, MeshContext>,
  /** null **/
  arbitrumone_assetBalances: InContextSdkMethod<Subscription['arbitrumone_assetBalances'], Subscriptionarbitrumone_assetBalancesArgs, MeshContext>,
  /** null **/
  arbitrumone_router: InContextSdkMethod<Subscription['arbitrumone_router'], Subscriptionarbitrumone_routerArgs, MeshContext>,
  /** null **/
  arbitrumone_routers: InContextSdkMethod<Subscription['arbitrumone_routers'], Subscriptionarbitrumone_routersArgs, MeshContext>,
  /** null **/
  arbitrumone_routerDailyTVL: InContextSdkMethod<Subscription['arbitrumone_routerDailyTVL'], Subscriptionarbitrumone_routerDailyTVLArgs, MeshContext>,
  /** null **/
  arbitrumone_routerDailyTVLs: InContextSdkMethod<Subscription['arbitrumone_routerDailyTVLs'], Subscriptionarbitrumone_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  arbitrumone_routerLiquidityEvent: InContextSdkMethod<Subscription['arbitrumone_routerLiquidityEvent'], Subscriptionarbitrumone_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  arbitrumone_routerLiquidityEvents: InContextSdkMethod<Subscription['arbitrumone_routerLiquidityEvents'], Subscriptionarbitrumone_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  arbitrumone_setting: InContextSdkMethod<Subscription['arbitrumone_setting'], Subscriptionarbitrumone_settingArgs, MeshContext>,
  /** null **/
  arbitrumone_settings: InContextSdkMethod<Subscription['arbitrumone_settings'], Subscriptionarbitrumone_settingsArgs, MeshContext>,
  /** null **/
  arbitrumone_relayer: InContextSdkMethod<Subscription['arbitrumone_relayer'], Subscriptionarbitrumone_relayerArgs, MeshContext>,
  /** null **/
  arbitrumone_relayers: InContextSdkMethod<Subscription['arbitrumone_relayers'], Subscriptionarbitrumone_relayersArgs, MeshContext>,
  /** null **/
  arbitrumone_sequencer: InContextSdkMethod<Subscription['arbitrumone_sequencer'], Subscriptionarbitrumone_sequencerArgs, MeshContext>,
  /** null **/
  arbitrumone_sequencers: InContextSdkMethod<Subscription['arbitrumone_sequencers'], Subscriptionarbitrumone_sequencersArgs, MeshContext>,
  /** null **/
  arbitrumone_relayerFee: InContextSdkMethod<Subscription['arbitrumone_relayerFee'], Subscriptionarbitrumone_relayerFeeArgs, MeshContext>,
  /** null **/
  arbitrumone_relayerFees: InContextSdkMethod<Subscription['arbitrumone_relayerFees'], Subscriptionarbitrumone_relayerFeesArgs, MeshContext>,
  /** null **/
  arbitrumone_originTransfer: InContextSdkMethod<Subscription['arbitrumone_originTransfer'], Subscriptionarbitrumone_originTransferArgs, MeshContext>,
  /** null **/
  arbitrumone_originTransfers: InContextSdkMethod<Subscription['arbitrumone_originTransfers'], Subscriptionarbitrumone_originTransfersArgs, MeshContext>,
  /** null **/
  arbitrumone_destinationTransfer: InContextSdkMethod<Subscription['arbitrumone_destinationTransfer'], Subscriptionarbitrumone_destinationTransferArgs, MeshContext>,
  /** null **/
  arbitrumone_destinationTransfers: InContextSdkMethod<Subscription['arbitrumone_destinationTransfers'], Subscriptionarbitrumone_destinationTransfersArgs, MeshContext>,
  /** null **/
  arbitrumone_originMessage: InContextSdkMethod<Subscription['arbitrumone_originMessage'], Subscriptionarbitrumone_originMessageArgs, MeshContext>,
  /** null **/
  arbitrumone_originMessages: InContextSdkMethod<Subscription['arbitrumone_originMessages'], Subscriptionarbitrumone_originMessagesArgs, MeshContext>,
  /** null **/
  arbitrumone_aggregateRoot: InContextSdkMethod<Subscription['arbitrumone_aggregateRoot'], Subscriptionarbitrumone_aggregateRootArgs, MeshContext>,
  /** null **/
  arbitrumone_aggregateRoots: InContextSdkMethod<Subscription['arbitrumone_aggregateRoots'], Subscriptionarbitrumone_aggregateRootsArgs, MeshContext>,
  /** null **/
  arbitrumone_connectorMeta: InContextSdkMethod<Subscription['arbitrumone_connectorMeta'], Subscriptionarbitrumone_connectorMetaArgs, MeshContext>,
  /** null **/
  arbitrumone_connectorMetas: InContextSdkMethod<Subscription['arbitrumone_connectorMetas'], Subscriptionarbitrumone_connectorMetasArgs, MeshContext>,
  /** null **/
  arbitrumone_rootCount: InContextSdkMethod<Subscription['arbitrumone_rootCount'], Subscriptionarbitrumone_rootCountArgs, MeshContext>,
  /** null **/
  arbitrumone_rootCounts: InContextSdkMethod<Subscription['arbitrumone_rootCounts'], Subscriptionarbitrumone_rootCountsArgs, MeshContext>,
  /** null **/
  arbitrumone_rootMessageSent: InContextSdkMethod<Subscription['arbitrumone_rootMessageSent'], Subscriptionarbitrumone_rootMessageSentArgs, MeshContext>,
  /** null **/
  arbitrumone_rootMessageSents: InContextSdkMethod<Subscription['arbitrumone_rootMessageSents'], Subscriptionarbitrumone_rootMessageSentsArgs, MeshContext>,
  /** null **/
  arbitrumone_relayerFeesIncrease: InContextSdkMethod<Subscription['arbitrumone_relayerFeesIncrease'], Subscriptionarbitrumone_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  arbitrumone_relayerFeesIncreases: InContextSdkMethod<Subscription['arbitrumone_relayerFeesIncreases'], Subscriptionarbitrumone_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  arbitrumone_slippageUpdate: InContextSdkMethod<Subscription['arbitrumone_slippageUpdate'], Subscriptionarbitrumone_slippageUpdateArgs, MeshContext>,
  /** null **/
  arbitrumone_slippageUpdates: InContextSdkMethod<Subscription['arbitrumone_slippageUpdates'], Subscriptionarbitrumone_slippageUpdatesArgs, MeshContext>,
  /** null **/
  arbitrumone_snapshotRoot: InContextSdkMethod<Subscription['arbitrumone_snapshotRoot'], Subscriptionarbitrumone_snapshotRootArgs, MeshContext>,
  /** null **/
  arbitrumone_snapshotRoots: InContextSdkMethod<Subscription['arbitrumone_snapshotRoots'], Subscriptionarbitrumone_snapshotRootsArgs, MeshContext>,
  /** null **/
  arbitrumone_spokeConnectorMode: InContextSdkMethod<Subscription['arbitrumone_spokeConnectorMode'], Subscriptionarbitrumone_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  arbitrumone_spokeConnectorModes: InContextSdkMethod<Subscription['arbitrumone_spokeConnectorModes'], Subscriptionarbitrumone_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  arbitrumone_aggregateRootProposed: InContextSdkMethod<Subscription['arbitrumone_aggregateRootProposed'], Subscriptionarbitrumone_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  arbitrumone_aggregateRootProposeds: InContextSdkMethod<Subscription['arbitrumone_aggregateRootProposeds'], Subscriptionarbitrumone_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  arbitrumone_optimisticRootFinalized: InContextSdkMethod<Subscription['arbitrumone_optimisticRootFinalized'], Subscriptionarbitrumone_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  arbitrumone_optimisticRootFinalizeds: InContextSdkMethod<Subscription['arbitrumone_optimisticRootFinalizeds'], Subscriptionarbitrumone_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  arbitrumone__meta: InContextSdkMethod<Subscription['arbitrumone__meta'], Subscriptionarbitrumone__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_ArbitrumOne"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
