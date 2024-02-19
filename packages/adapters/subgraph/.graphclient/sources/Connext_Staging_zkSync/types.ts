// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextStagingZkSyncTypes {
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
  stagingzksync_BigDecimal: any;
  BigInt: any;
  stagingzksync_Bytes: any;
  stagingzksync_Int8: any;
};

export type stagingzksync_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['stagingzksync_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type stagingzksync_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingzksync_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingzksync_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
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
  _change_block?: InputMaybe<stagingzksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingzksync_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingzksync_AggregateRootProposed_filter>>>;
};

export type stagingzksync_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type stagingzksync_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingzksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingzksync_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingzksync_AggregateRoot_filter>>>;
};

export type stagingzksync_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type stagingzksync_Aggregation_interval =
  | 'hour'
  | 'day';

export type stagingzksync_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['stagingzksync_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingzksync_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['stagingzksync_Bytes']>;
  localAsset?: Maybe<Scalars['stagingzksync_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingzksync_AssetStatus>;
};

export type stagingzksync_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: stagingzksync_Router;
  asset: stagingzksync_Asset;
  feesEarned: Scalars['BigInt'];
};

export type stagingzksync_AssetBalance_filter = {
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
  router_?: InputMaybe<stagingzksync_Router_filter>;
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
  asset_?: InputMaybe<stagingzksync_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingzksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingzksync_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingzksync_AssetBalance_filter>>>;
};

export type stagingzksync_AssetBalance_orderBy =
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

export type stagingzksync_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type stagingzksync_AssetStatus_filter = {
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
  _change_block?: InputMaybe<stagingzksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingzksync_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingzksync_AssetStatus_filter>>>;
};

export type stagingzksync_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type stagingzksync_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  key_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  key_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  key_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  key_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  key_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  key_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  localAsset?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
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
  status_?: InputMaybe<stagingzksync_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingzksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingzksync_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingzksync_Asset_filter>>>;
};

export type stagingzksync_Asset_orderBy =
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

export type stagingzksync_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingzksync_Block_height = {
  hash?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type stagingzksync_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['stagingzksync_Bytes']>;
  rootManager?: Maybe<Scalars['stagingzksync_Bytes']>;
  mirrorConnector?: Maybe<Scalars['stagingzksync_Bytes']>;
};

export type stagingzksync_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingzksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingzksync_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingzksync_ConnectorMeta_filter>>>;
};

export type stagingzksync_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingzksync_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingzksync_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingzksync_TransferStatus>;
  routers?: Maybe<Array<stagingzksync_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingzksync_Bytes']>;
  delegate?: Maybe<Scalars['stagingzksync_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingzksync_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingzksync_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingzksync_Bytes']>;
  asset?: Maybe<stagingzksync_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['stagingzksync_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['stagingzksync_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['stagingzksync_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['stagingzksync_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['stagingzksync_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['stagingzksync_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingzksync_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_Router_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_Router_filter>;
};

export type stagingzksync_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingzksync_TransferStatus>;
  status_not?: InputMaybe<stagingzksync_TransferStatus>;
  status_in?: InputMaybe<Array<stagingzksync_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingzksync_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<stagingzksync_Router_filter>;
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
  to?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
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
  originSender?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
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
  asset_?: InputMaybe<stagingzksync_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingzksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingzksync_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingzksync_DestinationTransfer_filter>>>;
};

export type stagingzksync_DestinationTransfer_orderBy =
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

export type stagingzksync_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingzksync_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingzksync_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
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
  _change_block?: InputMaybe<stagingzksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingzksync_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingzksync_OptimisticRootFinalized_filter>>>;
};

export type stagingzksync_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type stagingzksync_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingzksync_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['stagingzksync_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['stagingzksync_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['stagingzksync_Bytes']>;
  root?: Maybe<Scalars['stagingzksync_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingzksync_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<stagingzksync_RootCount>;
};

export type stagingzksync_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  leaf_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  message_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  message_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  message_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  message_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  message_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  message_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
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
  rootCount_?: InputMaybe<stagingzksync_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingzksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingzksync_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingzksync_OriginMessage_filter>>>;
};

export type stagingzksync_OriginMessage_orderBy =
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

export type stagingzksync_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingzksync_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingzksync_TransferStatus>;
  messageHash?: Maybe<Scalars['stagingzksync_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingzksync_Bytes']>;
  delegate?: Maybe<Scalars['stagingzksync_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingzksync_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingzksync_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingzksync_Bytes']>;
  asset?: Maybe<stagingzksync_Asset>;
  transactingAsset?: Maybe<Scalars['stagingzksync_Bytes']>;
  message?: Maybe<stagingzksync_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<stagingzksync_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['stagingzksync_Bytes']>;
  caller?: Maybe<Scalars['stagingzksync_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingzksync_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['stagingzksync_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingzksync_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_RelayerFee_filter>;
};

export type stagingzksync_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingzksync_TransferStatus>;
  status_not?: InputMaybe<stagingzksync_TransferStatus>;
  status_in?: InputMaybe<Array<stagingzksync_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingzksync_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
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
  to?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
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
  asset_?: InputMaybe<stagingzksync_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
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
  message_?: InputMaybe<stagingzksync_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<stagingzksync_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingzksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingzksync_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingzksync_OriginTransfer_filter>>>;
};

export type stagingzksync_OriginTransfer_orderBy =
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
  stagingzksync_asset?: Maybe<stagingzksync_Asset>;
  stagingzksync_assets: Array<stagingzksync_Asset>;
  stagingzksync_assetStatus?: Maybe<stagingzksync_AssetStatus>;
  stagingzksync_assetStatuses: Array<stagingzksync_AssetStatus>;
  stagingzksync_assetBalance?: Maybe<stagingzksync_AssetBalance>;
  stagingzksync_assetBalances: Array<stagingzksync_AssetBalance>;
  stagingzksync_router?: Maybe<stagingzksync_Router>;
  stagingzksync_routers: Array<stagingzksync_Router>;
  stagingzksync_routerDailyTVL?: Maybe<stagingzksync_RouterDailyTVL>;
  stagingzksync_routerDailyTVLs: Array<stagingzksync_RouterDailyTVL>;
  stagingzksync_routerLiquidityEvent?: Maybe<stagingzksync_RouterLiquidityEvent>;
  stagingzksync_routerLiquidityEvents: Array<stagingzksync_RouterLiquidityEvent>;
  stagingzksync_setting?: Maybe<stagingzksync_Setting>;
  stagingzksync_settings: Array<stagingzksync_Setting>;
  stagingzksync_relayer?: Maybe<stagingzksync_Relayer>;
  stagingzksync_relayers: Array<stagingzksync_Relayer>;
  stagingzksync_sequencer?: Maybe<stagingzksync_Sequencer>;
  stagingzksync_sequencers: Array<stagingzksync_Sequencer>;
  stagingzksync_relayerFee?: Maybe<stagingzksync_RelayerFee>;
  stagingzksync_relayerFees: Array<stagingzksync_RelayerFee>;
  stagingzksync_originTransfer?: Maybe<stagingzksync_OriginTransfer>;
  stagingzksync_originTransfers: Array<stagingzksync_OriginTransfer>;
  stagingzksync_destinationTransfer?: Maybe<stagingzksync_DestinationTransfer>;
  stagingzksync_destinationTransfers: Array<stagingzksync_DestinationTransfer>;
  stagingzksync_originMessage?: Maybe<stagingzksync_OriginMessage>;
  stagingzksync_originMessages: Array<stagingzksync_OriginMessage>;
  stagingzksync_aggregateRoot?: Maybe<stagingzksync_AggregateRoot>;
  stagingzksync_aggregateRoots: Array<stagingzksync_AggregateRoot>;
  stagingzksync_connectorMeta?: Maybe<stagingzksync_ConnectorMeta>;
  stagingzksync_connectorMetas: Array<stagingzksync_ConnectorMeta>;
  stagingzksync_rootCount?: Maybe<stagingzksync_RootCount>;
  stagingzksync_rootCounts: Array<stagingzksync_RootCount>;
  stagingzksync_rootMessageSent?: Maybe<stagingzksync_RootMessageSent>;
  stagingzksync_rootMessageSents: Array<stagingzksync_RootMessageSent>;
  stagingzksync_relayerFeesIncrease?: Maybe<stagingzksync_RelayerFeesIncrease>;
  stagingzksync_relayerFeesIncreases: Array<stagingzksync_RelayerFeesIncrease>;
  stagingzksync_slippageUpdate?: Maybe<stagingzksync_SlippageUpdate>;
  stagingzksync_slippageUpdates: Array<stagingzksync_SlippageUpdate>;
  stagingzksync_snapshotRoot?: Maybe<stagingzksync_SnapshotRoot>;
  stagingzksync_snapshotRoots: Array<stagingzksync_SnapshotRoot>;
  stagingzksync_spokeConnectorMode?: Maybe<stagingzksync_SpokeConnectorMode>;
  stagingzksync_spokeConnectorModes: Array<stagingzksync_SpokeConnectorMode>;
  stagingzksync_aggregateRootProposed?: Maybe<stagingzksync_AggregateRootProposed>;
  stagingzksync_aggregateRootProposeds: Array<stagingzksync_AggregateRootProposed>;
  stagingzksync_optimisticRootFinalized?: Maybe<stagingzksync_OptimisticRootFinalized>;
  stagingzksync_optimisticRootFinalizeds: Array<stagingzksync_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingzksync__meta?: Maybe<stagingzksync__Meta_>;
};


export type Querystagingzksync_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_Asset_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_AssetStatus_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_AssetBalance_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_Router_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_Router_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_Setting_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_Relayer_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_Sequencer_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_RelayerFee_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_OriginTransfer_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_DestinationTransfer_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_OriginMessage_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_AggregateRoot_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_ConnectorMeta_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_RootCount_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_RootMessageSent_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_SlippageUpdate_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_SnapshotRoot_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingzksync__metaArgs = {
  block?: InputMaybe<stagingzksync_Block_height>;
};

export type stagingzksync_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['stagingzksync_Bytes']>;
};

export type stagingzksync_RelayerFee = {
  id: Scalars['ID'];
  transfer: stagingzksync_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['stagingzksync_Bytes'];
};

export type stagingzksync_RelayerFee_filter = {
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
  transfer_?: InputMaybe<stagingzksync_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingzksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingzksync_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingzksync_RelayerFee_filter>>>;
};

export type stagingzksync_RelayerFee_orderBy =
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

export type stagingzksync_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: stagingzksync_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['stagingzksync_Bytes']>;
  caller: Scalars['stagingzksync_Bytes'];
  transactionHash: Scalars['stagingzksync_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingzksync_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<stagingzksync_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
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
  _change_block?: InputMaybe<stagingzksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingzksync_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingzksync_RelayerFeesIncrease_filter>>>;
};

export type stagingzksync_RelayerFeesIncrease_orderBy =
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

export type stagingzksync_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  relayer_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingzksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingzksync_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingzksync_Relayer_filter>>>;
};

export type stagingzksync_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type stagingzksync_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type stagingzksync_RootCount_filter = {
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
  _change_block?: InputMaybe<stagingzksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingzksync_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingzksync_RootCount_filter>>>;
};

export type stagingzksync_RootCount_orderBy =
  | 'id'
  | 'count';

export type stagingzksync_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['stagingzksync_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['stagingzksync_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingzksync_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingzksync_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
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
  _change_block?: InputMaybe<stagingzksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingzksync_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingzksync_RootMessageSent_filter>>>;
};

export type stagingzksync_RootMessageSent_orderBy =
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

export type stagingzksync_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['stagingzksync_Bytes']>;
  recipient?: Maybe<Scalars['stagingzksync_Bytes']>;
  proposedOwner?: Maybe<Scalars['stagingzksync_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<stagingzksync_AssetBalance>;
};


export type stagingzksync_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_AssetBalance_filter>;
};

export type stagingzksync_RouterDailyTVL = {
  id: Scalars['ID'];
  router: stagingzksync_Router;
  asset: stagingzksync_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type stagingzksync_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<stagingzksync_Router_filter>;
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
  asset_?: InputMaybe<stagingzksync_Asset_filter>;
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
  _change_block?: InputMaybe<stagingzksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingzksync_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingzksync_RouterDailyTVL_filter>>>;
};

export type stagingzksync_RouterDailyTVL_orderBy =
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

export type stagingzksync_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<stagingzksync_RouterLiquidityEventType>;
  router: stagingzksync_Router;
  asset: stagingzksync_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['stagingzksync_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['stagingzksync_Bytes'];
  nonce: Scalars['BigInt'];
};

export type stagingzksync_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type stagingzksync_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<stagingzksync_RouterLiquidityEventType>;
  type_not?: InputMaybe<stagingzksync_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<stagingzksync_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<stagingzksync_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<stagingzksync_Router_filter>;
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
  asset_?: InputMaybe<stagingzksync_Asset_filter>;
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
  caller?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingzksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingzksync_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingzksync_RouterLiquidityEvent_filter>>>;
};

export type stagingzksync_RouterLiquidityEvent_orderBy =
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

export type stagingzksync_Router_filter = {
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
  owner?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  owner_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  owner_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  owner_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  owner_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  owner_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  recipient?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  recipient_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<stagingzksync_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingzksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingzksync_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingzksync_Router_filter>>>;
};

export type stagingzksync_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type stagingzksync_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['stagingzksync_Bytes']>;
};

export type stagingzksync_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingzksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingzksync_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingzksync_Sequencer_filter>>>;
};

export type stagingzksync_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type stagingzksync_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['stagingzksync_Bytes'];
};

export type stagingzksync_Setting_filter = {
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
  caller?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingzksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingzksync_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingzksync_Setting_filter>>>;
};

export type stagingzksync_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type stagingzksync_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: stagingzksync_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['stagingzksync_Bytes'];
  transactionHash: Scalars['stagingzksync_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingzksync_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<stagingzksync_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
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
  _change_block?: InputMaybe<stagingzksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingzksync_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingzksync_SlippageUpdate_filter>>>;
};

export type stagingzksync_SlippageUpdate_orderBy =
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

export type stagingzksync_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['stagingzksync_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingzksync_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingzksync_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingzksync_Bytes']>;
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
  _change_block?: InputMaybe<stagingzksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingzksync_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingzksync_SnapshotRoot_filter>>>;
};

export type stagingzksync_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type stagingzksync_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type stagingzksync_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<stagingzksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingzksync_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingzksync_SpokeConnectorMode_filter>>>;
};

export type stagingzksync_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  stagingzksync_asset?: Maybe<stagingzksync_Asset>;
  stagingzksync_assets: Array<stagingzksync_Asset>;
  stagingzksync_assetStatus?: Maybe<stagingzksync_AssetStatus>;
  stagingzksync_assetStatuses: Array<stagingzksync_AssetStatus>;
  stagingzksync_assetBalance?: Maybe<stagingzksync_AssetBalance>;
  stagingzksync_assetBalances: Array<stagingzksync_AssetBalance>;
  stagingzksync_router?: Maybe<stagingzksync_Router>;
  stagingzksync_routers: Array<stagingzksync_Router>;
  stagingzksync_routerDailyTVL?: Maybe<stagingzksync_RouterDailyTVL>;
  stagingzksync_routerDailyTVLs: Array<stagingzksync_RouterDailyTVL>;
  stagingzksync_routerLiquidityEvent?: Maybe<stagingzksync_RouterLiquidityEvent>;
  stagingzksync_routerLiquidityEvents: Array<stagingzksync_RouterLiquidityEvent>;
  stagingzksync_setting?: Maybe<stagingzksync_Setting>;
  stagingzksync_settings: Array<stagingzksync_Setting>;
  stagingzksync_relayer?: Maybe<stagingzksync_Relayer>;
  stagingzksync_relayers: Array<stagingzksync_Relayer>;
  stagingzksync_sequencer?: Maybe<stagingzksync_Sequencer>;
  stagingzksync_sequencers: Array<stagingzksync_Sequencer>;
  stagingzksync_relayerFee?: Maybe<stagingzksync_RelayerFee>;
  stagingzksync_relayerFees: Array<stagingzksync_RelayerFee>;
  stagingzksync_originTransfer?: Maybe<stagingzksync_OriginTransfer>;
  stagingzksync_originTransfers: Array<stagingzksync_OriginTransfer>;
  stagingzksync_destinationTransfer?: Maybe<stagingzksync_DestinationTransfer>;
  stagingzksync_destinationTransfers: Array<stagingzksync_DestinationTransfer>;
  stagingzksync_originMessage?: Maybe<stagingzksync_OriginMessage>;
  stagingzksync_originMessages: Array<stagingzksync_OriginMessage>;
  stagingzksync_aggregateRoot?: Maybe<stagingzksync_AggregateRoot>;
  stagingzksync_aggregateRoots: Array<stagingzksync_AggregateRoot>;
  stagingzksync_connectorMeta?: Maybe<stagingzksync_ConnectorMeta>;
  stagingzksync_connectorMetas: Array<stagingzksync_ConnectorMeta>;
  stagingzksync_rootCount?: Maybe<stagingzksync_RootCount>;
  stagingzksync_rootCounts: Array<stagingzksync_RootCount>;
  stagingzksync_rootMessageSent?: Maybe<stagingzksync_RootMessageSent>;
  stagingzksync_rootMessageSents: Array<stagingzksync_RootMessageSent>;
  stagingzksync_relayerFeesIncrease?: Maybe<stagingzksync_RelayerFeesIncrease>;
  stagingzksync_relayerFeesIncreases: Array<stagingzksync_RelayerFeesIncrease>;
  stagingzksync_slippageUpdate?: Maybe<stagingzksync_SlippageUpdate>;
  stagingzksync_slippageUpdates: Array<stagingzksync_SlippageUpdate>;
  stagingzksync_snapshotRoot?: Maybe<stagingzksync_SnapshotRoot>;
  stagingzksync_snapshotRoots: Array<stagingzksync_SnapshotRoot>;
  stagingzksync_spokeConnectorMode?: Maybe<stagingzksync_SpokeConnectorMode>;
  stagingzksync_spokeConnectorModes: Array<stagingzksync_SpokeConnectorMode>;
  stagingzksync_aggregateRootProposed?: Maybe<stagingzksync_AggregateRootProposed>;
  stagingzksync_aggregateRootProposeds: Array<stagingzksync_AggregateRootProposed>;
  stagingzksync_optimisticRootFinalized?: Maybe<stagingzksync_OptimisticRootFinalized>;
  stagingzksync_optimisticRootFinalizeds: Array<stagingzksync_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingzksync__meta?: Maybe<stagingzksync__Meta_>;
};


export type Subscriptionstagingzksync_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_Asset_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_AssetStatus_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_AssetBalance_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_Router_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_Router_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_Setting_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_Relayer_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_Sequencer_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_RelayerFee_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_OriginTransfer_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_DestinationTransfer_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_OriginMessage_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_AggregateRoot_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_ConnectorMeta_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_RootCount_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_RootMessageSent_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_SlippageUpdate_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_SnapshotRoot_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingzksync_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingzksync_OrderDirection>;
  where?: InputMaybe<stagingzksync_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingzksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingzksync__metaArgs = {
  block?: InputMaybe<stagingzksync_Block_height>;
};

export type stagingzksync_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type stagingzksync__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingzksync_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type stagingzksync__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingzksync__Block_;
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
  stagingzksync_asset: InContextSdkMethod<Query['stagingzksync_asset'], Querystagingzksync_assetArgs, MeshContext>,
  /** null **/
  stagingzksync_assets: InContextSdkMethod<Query['stagingzksync_assets'], Querystagingzksync_assetsArgs, MeshContext>,
  /** null **/
  stagingzksync_assetStatus: InContextSdkMethod<Query['stagingzksync_assetStatus'], Querystagingzksync_assetStatusArgs, MeshContext>,
  /** null **/
  stagingzksync_assetStatuses: InContextSdkMethod<Query['stagingzksync_assetStatuses'], Querystagingzksync_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingzksync_assetBalance: InContextSdkMethod<Query['stagingzksync_assetBalance'], Querystagingzksync_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingzksync_assetBalances: InContextSdkMethod<Query['stagingzksync_assetBalances'], Querystagingzksync_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingzksync_router: InContextSdkMethod<Query['stagingzksync_router'], Querystagingzksync_routerArgs, MeshContext>,
  /** null **/
  stagingzksync_routers: InContextSdkMethod<Query['stagingzksync_routers'], Querystagingzksync_routersArgs, MeshContext>,
  /** null **/
  stagingzksync_routerDailyTVL: InContextSdkMethod<Query['stagingzksync_routerDailyTVL'], Querystagingzksync_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingzksync_routerDailyTVLs: InContextSdkMethod<Query['stagingzksync_routerDailyTVLs'], Querystagingzksync_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingzksync_routerLiquidityEvent: InContextSdkMethod<Query['stagingzksync_routerLiquidityEvent'], Querystagingzksync_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingzksync_routerLiquidityEvents: InContextSdkMethod<Query['stagingzksync_routerLiquidityEvents'], Querystagingzksync_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingzksync_setting: InContextSdkMethod<Query['stagingzksync_setting'], Querystagingzksync_settingArgs, MeshContext>,
  /** null **/
  stagingzksync_settings: InContextSdkMethod<Query['stagingzksync_settings'], Querystagingzksync_settingsArgs, MeshContext>,
  /** null **/
  stagingzksync_relayer: InContextSdkMethod<Query['stagingzksync_relayer'], Querystagingzksync_relayerArgs, MeshContext>,
  /** null **/
  stagingzksync_relayers: InContextSdkMethod<Query['stagingzksync_relayers'], Querystagingzksync_relayersArgs, MeshContext>,
  /** null **/
  stagingzksync_sequencer: InContextSdkMethod<Query['stagingzksync_sequencer'], Querystagingzksync_sequencerArgs, MeshContext>,
  /** null **/
  stagingzksync_sequencers: InContextSdkMethod<Query['stagingzksync_sequencers'], Querystagingzksync_sequencersArgs, MeshContext>,
  /** null **/
  stagingzksync_relayerFee: InContextSdkMethod<Query['stagingzksync_relayerFee'], Querystagingzksync_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingzksync_relayerFees: InContextSdkMethod<Query['stagingzksync_relayerFees'], Querystagingzksync_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingzksync_originTransfer: InContextSdkMethod<Query['stagingzksync_originTransfer'], Querystagingzksync_originTransferArgs, MeshContext>,
  /** null **/
  stagingzksync_originTransfers: InContextSdkMethod<Query['stagingzksync_originTransfers'], Querystagingzksync_originTransfersArgs, MeshContext>,
  /** null **/
  stagingzksync_destinationTransfer: InContextSdkMethod<Query['stagingzksync_destinationTransfer'], Querystagingzksync_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingzksync_destinationTransfers: InContextSdkMethod<Query['stagingzksync_destinationTransfers'], Querystagingzksync_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingzksync_originMessage: InContextSdkMethod<Query['stagingzksync_originMessage'], Querystagingzksync_originMessageArgs, MeshContext>,
  /** null **/
  stagingzksync_originMessages: InContextSdkMethod<Query['stagingzksync_originMessages'], Querystagingzksync_originMessagesArgs, MeshContext>,
  /** null **/
  stagingzksync_aggregateRoot: InContextSdkMethod<Query['stagingzksync_aggregateRoot'], Querystagingzksync_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingzksync_aggregateRoots: InContextSdkMethod<Query['stagingzksync_aggregateRoots'], Querystagingzksync_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingzksync_connectorMeta: InContextSdkMethod<Query['stagingzksync_connectorMeta'], Querystagingzksync_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingzksync_connectorMetas: InContextSdkMethod<Query['stagingzksync_connectorMetas'], Querystagingzksync_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingzksync_rootCount: InContextSdkMethod<Query['stagingzksync_rootCount'], Querystagingzksync_rootCountArgs, MeshContext>,
  /** null **/
  stagingzksync_rootCounts: InContextSdkMethod<Query['stagingzksync_rootCounts'], Querystagingzksync_rootCountsArgs, MeshContext>,
  /** null **/
  stagingzksync_rootMessageSent: InContextSdkMethod<Query['stagingzksync_rootMessageSent'], Querystagingzksync_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingzksync_rootMessageSents: InContextSdkMethod<Query['stagingzksync_rootMessageSents'], Querystagingzksync_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingzksync_relayerFeesIncrease: InContextSdkMethod<Query['stagingzksync_relayerFeesIncrease'], Querystagingzksync_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingzksync_relayerFeesIncreases: InContextSdkMethod<Query['stagingzksync_relayerFeesIncreases'], Querystagingzksync_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingzksync_slippageUpdate: InContextSdkMethod<Query['stagingzksync_slippageUpdate'], Querystagingzksync_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingzksync_slippageUpdates: InContextSdkMethod<Query['stagingzksync_slippageUpdates'], Querystagingzksync_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingzksync_snapshotRoot: InContextSdkMethod<Query['stagingzksync_snapshotRoot'], Querystagingzksync_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingzksync_snapshotRoots: InContextSdkMethod<Query['stagingzksync_snapshotRoots'], Querystagingzksync_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingzksync_spokeConnectorMode: InContextSdkMethod<Query['stagingzksync_spokeConnectorMode'], Querystagingzksync_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingzksync_spokeConnectorModes: InContextSdkMethod<Query['stagingzksync_spokeConnectorModes'], Querystagingzksync_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingzksync_aggregateRootProposed: InContextSdkMethod<Query['stagingzksync_aggregateRootProposed'], Querystagingzksync_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingzksync_aggregateRootProposeds: InContextSdkMethod<Query['stagingzksync_aggregateRootProposeds'], Querystagingzksync_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingzksync_optimisticRootFinalized: InContextSdkMethod<Query['stagingzksync_optimisticRootFinalized'], Querystagingzksync_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingzksync_optimisticRootFinalizeds: InContextSdkMethod<Query['stagingzksync_optimisticRootFinalizeds'], Querystagingzksync_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingzksync__meta: InContextSdkMethod<Query['stagingzksync__meta'], Querystagingzksync__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  stagingzksync_asset: InContextSdkMethod<Subscription['stagingzksync_asset'], Subscriptionstagingzksync_assetArgs, MeshContext>,
  /** null **/
  stagingzksync_assets: InContextSdkMethod<Subscription['stagingzksync_assets'], Subscriptionstagingzksync_assetsArgs, MeshContext>,
  /** null **/
  stagingzksync_assetStatus: InContextSdkMethod<Subscription['stagingzksync_assetStatus'], Subscriptionstagingzksync_assetStatusArgs, MeshContext>,
  /** null **/
  stagingzksync_assetStatuses: InContextSdkMethod<Subscription['stagingzksync_assetStatuses'], Subscriptionstagingzksync_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingzksync_assetBalance: InContextSdkMethod<Subscription['stagingzksync_assetBalance'], Subscriptionstagingzksync_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingzksync_assetBalances: InContextSdkMethod<Subscription['stagingzksync_assetBalances'], Subscriptionstagingzksync_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingzksync_router: InContextSdkMethod<Subscription['stagingzksync_router'], Subscriptionstagingzksync_routerArgs, MeshContext>,
  /** null **/
  stagingzksync_routers: InContextSdkMethod<Subscription['stagingzksync_routers'], Subscriptionstagingzksync_routersArgs, MeshContext>,
  /** null **/
  stagingzksync_routerDailyTVL: InContextSdkMethod<Subscription['stagingzksync_routerDailyTVL'], Subscriptionstagingzksync_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingzksync_routerDailyTVLs: InContextSdkMethod<Subscription['stagingzksync_routerDailyTVLs'], Subscriptionstagingzksync_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingzksync_routerLiquidityEvent: InContextSdkMethod<Subscription['stagingzksync_routerLiquidityEvent'], Subscriptionstagingzksync_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingzksync_routerLiquidityEvents: InContextSdkMethod<Subscription['stagingzksync_routerLiquidityEvents'], Subscriptionstagingzksync_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingzksync_setting: InContextSdkMethod<Subscription['stagingzksync_setting'], Subscriptionstagingzksync_settingArgs, MeshContext>,
  /** null **/
  stagingzksync_settings: InContextSdkMethod<Subscription['stagingzksync_settings'], Subscriptionstagingzksync_settingsArgs, MeshContext>,
  /** null **/
  stagingzksync_relayer: InContextSdkMethod<Subscription['stagingzksync_relayer'], Subscriptionstagingzksync_relayerArgs, MeshContext>,
  /** null **/
  stagingzksync_relayers: InContextSdkMethod<Subscription['stagingzksync_relayers'], Subscriptionstagingzksync_relayersArgs, MeshContext>,
  /** null **/
  stagingzksync_sequencer: InContextSdkMethod<Subscription['stagingzksync_sequencer'], Subscriptionstagingzksync_sequencerArgs, MeshContext>,
  /** null **/
  stagingzksync_sequencers: InContextSdkMethod<Subscription['stagingzksync_sequencers'], Subscriptionstagingzksync_sequencersArgs, MeshContext>,
  /** null **/
  stagingzksync_relayerFee: InContextSdkMethod<Subscription['stagingzksync_relayerFee'], Subscriptionstagingzksync_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingzksync_relayerFees: InContextSdkMethod<Subscription['stagingzksync_relayerFees'], Subscriptionstagingzksync_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingzksync_originTransfer: InContextSdkMethod<Subscription['stagingzksync_originTransfer'], Subscriptionstagingzksync_originTransferArgs, MeshContext>,
  /** null **/
  stagingzksync_originTransfers: InContextSdkMethod<Subscription['stagingzksync_originTransfers'], Subscriptionstagingzksync_originTransfersArgs, MeshContext>,
  /** null **/
  stagingzksync_destinationTransfer: InContextSdkMethod<Subscription['stagingzksync_destinationTransfer'], Subscriptionstagingzksync_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingzksync_destinationTransfers: InContextSdkMethod<Subscription['stagingzksync_destinationTransfers'], Subscriptionstagingzksync_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingzksync_originMessage: InContextSdkMethod<Subscription['stagingzksync_originMessage'], Subscriptionstagingzksync_originMessageArgs, MeshContext>,
  /** null **/
  stagingzksync_originMessages: InContextSdkMethod<Subscription['stagingzksync_originMessages'], Subscriptionstagingzksync_originMessagesArgs, MeshContext>,
  /** null **/
  stagingzksync_aggregateRoot: InContextSdkMethod<Subscription['stagingzksync_aggregateRoot'], Subscriptionstagingzksync_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingzksync_aggregateRoots: InContextSdkMethod<Subscription['stagingzksync_aggregateRoots'], Subscriptionstagingzksync_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingzksync_connectorMeta: InContextSdkMethod<Subscription['stagingzksync_connectorMeta'], Subscriptionstagingzksync_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingzksync_connectorMetas: InContextSdkMethod<Subscription['stagingzksync_connectorMetas'], Subscriptionstagingzksync_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingzksync_rootCount: InContextSdkMethod<Subscription['stagingzksync_rootCount'], Subscriptionstagingzksync_rootCountArgs, MeshContext>,
  /** null **/
  stagingzksync_rootCounts: InContextSdkMethod<Subscription['stagingzksync_rootCounts'], Subscriptionstagingzksync_rootCountsArgs, MeshContext>,
  /** null **/
  stagingzksync_rootMessageSent: InContextSdkMethod<Subscription['stagingzksync_rootMessageSent'], Subscriptionstagingzksync_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingzksync_rootMessageSents: InContextSdkMethod<Subscription['stagingzksync_rootMessageSents'], Subscriptionstagingzksync_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingzksync_relayerFeesIncrease: InContextSdkMethod<Subscription['stagingzksync_relayerFeesIncrease'], Subscriptionstagingzksync_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingzksync_relayerFeesIncreases: InContextSdkMethod<Subscription['stagingzksync_relayerFeesIncreases'], Subscriptionstagingzksync_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingzksync_slippageUpdate: InContextSdkMethod<Subscription['stagingzksync_slippageUpdate'], Subscriptionstagingzksync_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingzksync_slippageUpdates: InContextSdkMethod<Subscription['stagingzksync_slippageUpdates'], Subscriptionstagingzksync_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingzksync_snapshotRoot: InContextSdkMethod<Subscription['stagingzksync_snapshotRoot'], Subscriptionstagingzksync_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingzksync_snapshotRoots: InContextSdkMethod<Subscription['stagingzksync_snapshotRoots'], Subscriptionstagingzksync_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingzksync_spokeConnectorMode: InContextSdkMethod<Subscription['stagingzksync_spokeConnectorMode'], Subscriptionstagingzksync_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingzksync_spokeConnectorModes: InContextSdkMethod<Subscription['stagingzksync_spokeConnectorModes'], Subscriptionstagingzksync_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingzksync_aggregateRootProposed: InContextSdkMethod<Subscription['stagingzksync_aggregateRootProposed'], Subscriptionstagingzksync_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingzksync_aggregateRootProposeds: InContextSdkMethod<Subscription['stagingzksync_aggregateRootProposeds'], Subscriptionstagingzksync_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingzksync_optimisticRootFinalized: InContextSdkMethod<Subscription['stagingzksync_optimisticRootFinalized'], Subscriptionstagingzksync_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingzksync_optimisticRootFinalizeds: InContextSdkMethod<Subscription['stagingzksync_optimisticRootFinalizeds'], Subscriptionstagingzksync_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingzksync__meta: InContextSdkMethod<Subscription['stagingzksync__meta'], Subscriptionstagingzksync__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Staging_zkSync"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
