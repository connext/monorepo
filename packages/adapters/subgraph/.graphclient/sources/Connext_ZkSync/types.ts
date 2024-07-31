// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextZkSyncTypes {
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
  zksync_BigDecimal: any;
  BigInt: any;
  zksync_Bytes: any;
  zksync_Int8: any;
  Timestamp: any;
};

export type zksync_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['zksync_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type zksync_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['zksync_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type zksync_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['zksync_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['zksync_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
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
  _change_block?: InputMaybe<zksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync_AggregateRootProposed_filter>>>;
};

export type zksync_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type zksync_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['zksync_Bytes']>;
  root_not?: InputMaybe<Scalars['zksync_Bytes']>;
  root_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  root_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  root_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  root_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  root_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync_AggregateRoot_filter>>>;
};

export type zksync_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type zksync_Aggregation_interval =
  | 'hour'
  | 'day';

export type zksync_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['zksync_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['zksync_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['zksync_Bytes']>;
  localAsset?: Maybe<Scalars['zksync_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<zksync_AssetStatus>;
};

export type zksync_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: zksync_Router;
  asset: zksync_Asset;
  feesEarned: Scalars['BigInt'];
};

export type zksync_AssetBalance_filter = {
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
  router_?: InputMaybe<zksync_Router_filter>;
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
  asset_?: InputMaybe<zksync_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync_AssetBalance_filter>>>;
};

export type zksync_AssetBalance_orderBy =
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

export type zksync_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type zksync_AssetStatus_filter = {
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
  _change_block?: InputMaybe<zksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync_AssetStatus_filter>>>;
};

export type zksync_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type zksync_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['zksync_Bytes']>;
  key_not?: InputMaybe<Scalars['zksync_Bytes']>;
  key_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  key_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  key_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  key_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  key_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['zksync_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['zksync_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['zksync_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['zksync_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  localAsset?: InputMaybe<Scalars['zksync_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['zksync_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
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
  status_?: InputMaybe<zksync_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync_Asset_filter>>>;
};

export type zksync_Asset_orderBy =
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

export type zksync_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type zksync_Block_height = {
  hash?: InputMaybe<Scalars['zksync_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type zksync_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['zksync_Bytes']>;
  rootManager?: Maybe<Scalars['zksync_Bytes']>;
  mirrorConnector?: Maybe<Scalars['zksync_Bytes']>;
};

export type zksync_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['zksync_Bytes']>;
  amb_not?: InputMaybe<Scalars['zksync_Bytes']>;
  amb_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  amb_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  amb_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  amb_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  rootManager?: InputMaybe<Scalars['zksync_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['zksync_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['zksync_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['zksync_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync_ConnectorMeta_filter>>>;
};

export type zksync_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type zksync_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['zksync_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<zksync_TransferStatus>;
  routers?: Maybe<Array<zksync_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['zksync_Bytes']>;
  delegate?: Maybe<Scalars['zksync_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['zksync_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['zksync_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['zksync_Bytes']>;
  asset?: Maybe<zksync_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['zksync_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['zksync_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['zksync_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['zksync_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['zksync_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['zksync_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type zksync_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_Router_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_Router_filter>;
};

export type zksync_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['zksync_Bytes']>;
  transferId_not?: InputMaybe<Scalars['zksync_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<zksync_TransferStatus>;
  status_not?: InputMaybe<zksync_TransferStatus>;
  status_in?: InputMaybe<Array<zksync_TransferStatus>>;
  status_not_in?: InputMaybe<Array<zksync_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<zksync_Router_filter>;
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
  to?: InputMaybe<Scalars['zksync_Bytes']>;
  to_not?: InputMaybe<Scalars['zksync_Bytes']>;
  to_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  to_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  to_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  to_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  to_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  delegate?: InputMaybe<Scalars['zksync_Bytes']>;
  delegate_not?: InputMaybe<Scalars['zksync_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['zksync_Bytes']>;
  callData_not?: InputMaybe<Scalars['zksync_Bytes']>;
  callData_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  callData_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  callData_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  callData_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
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
  originSender?: InputMaybe<Scalars['zksync_Bytes']>;
  originSender_not?: InputMaybe<Scalars['zksync_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['zksync_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['zksync_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
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
  asset_?: InputMaybe<zksync_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['zksync_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['zksync_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['zksync_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['zksync_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['zksync_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['zksync_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['zksync_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['zksync_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['zksync_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['zksync_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['zksync_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['zksync_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync_DestinationTransfer_filter>>>;
};

export type zksync_DestinationTransfer_orderBy =
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

export type zksync_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['zksync_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type zksync_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['zksync_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['zksync_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
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
  _change_block?: InputMaybe<zksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync_OptimisticRootFinalized_filter>>>;
};

export type zksync_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type zksync_OrderDirection =
  | 'asc'
  | 'desc';

export type zksync_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['zksync_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['zksync_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['zksync_Bytes']>;
  root?: Maybe<Scalars['zksync_Bytes']>;
  transactionHash?: Maybe<Scalars['zksync_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<zksync_RootCount>;
};

export type zksync_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['zksync_Bytes']>;
  transferId_not?: InputMaybe<Scalars['zksync_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['zksync_Bytes']>;
  leaf_not?: InputMaybe<Scalars['zksync_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['zksync_Bytes']>;
  message_not?: InputMaybe<Scalars['zksync_Bytes']>;
  message_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  message_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  message_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  message_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  message_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  root?: InputMaybe<Scalars['zksync_Bytes']>;
  root_not?: InputMaybe<Scalars['zksync_Bytes']>;
  root_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  root_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  root_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  root_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  root_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
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
  rootCount_?: InputMaybe<zksync_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync_OriginMessage_filter>>>;
};

export type zksync_OriginMessage_orderBy =
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

export type zksync_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['zksync_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<zksync_TransferStatus>;
  messageHash?: Maybe<Scalars['zksync_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['zksync_Bytes']>;
  delegate?: Maybe<Scalars['zksync_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['zksync_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['zksync_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['zksync_Bytes']>;
  asset?: Maybe<zksync_Asset>;
  transactingAsset?: Maybe<Scalars['zksync_Bytes']>;
  message?: Maybe<zksync_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<zksync_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['zksync_Bytes']>;
  caller?: Maybe<Scalars['zksync_Bytes']>;
  transactionHash?: Maybe<Scalars['zksync_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['zksync_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type zksync_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_RelayerFee_filter>;
};

export type zksync_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['zksync_Bytes']>;
  transferId_not?: InputMaybe<Scalars['zksync_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<zksync_TransferStatus>;
  status_not?: InputMaybe<zksync_TransferStatus>;
  status_in?: InputMaybe<Array<zksync_TransferStatus>>;
  status_not_in?: InputMaybe<Array<zksync_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['zksync_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['zksync_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
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
  to?: InputMaybe<Scalars['zksync_Bytes']>;
  to_not?: InputMaybe<Scalars['zksync_Bytes']>;
  to_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  to_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  to_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  to_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  to_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  delegate?: InputMaybe<Scalars['zksync_Bytes']>;
  delegate_not?: InputMaybe<Scalars['zksync_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['zksync_Bytes']>;
  callData_not?: InputMaybe<Scalars['zksync_Bytes']>;
  callData_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  callData_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  callData_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  callData_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['zksync_Bytes']>;
  originSender_not?: InputMaybe<Scalars['zksync_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['zksync_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['zksync_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
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
  asset_?: InputMaybe<zksync_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['zksync_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['zksync_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
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
  message_?: InputMaybe<zksync_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<zksync_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['zksync_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['zksync_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  caller?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_not?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['zksync_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['zksync_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync_OriginTransfer_filter>>>;
};

export type zksync_OriginTransfer_orderBy =
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
  zksync_asset?: Maybe<zksync_Asset>;
  zksync_assets: Array<zksync_Asset>;
  zksync_assetStatus?: Maybe<zksync_AssetStatus>;
  zksync_assetStatuses: Array<zksync_AssetStatus>;
  zksync_assetBalance?: Maybe<zksync_AssetBalance>;
  zksync_assetBalances: Array<zksync_AssetBalance>;
  zksync_router?: Maybe<zksync_Router>;
  zksync_routers: Array<zksync_Router>;
  zksync_routerDailyTVL?: Maybe<zksync_RouterDailyTVL>;
  zksync_routerDailyTVLs: Array<zksync_RouterDailyTVL>;
  zksync_routerLiquidityEvent?: Maybe<zksync_RouterLiquidityEvent>;
  zksync_routerLiquidityEvents: Array<zksync_RouterLiquidityEvent>;
  zksync_setting?: Maybe<zksync_Setting>;
  zksync_settings: Array<zksync_Setting>;
  zksync_relayer?: Maybe<zksync_Relayer>;
  zksync_relayers: Array<zksync_Relayer>;
  zksync_sequencer?: Maybe<zksync_Sequencer>;
  zksync_sequencers: Array<zksync_Sequencer>;
  zksync_relayerFee?: Maybe<zksync_RelayerFee>;
  zksync_relayerFees: Array<zksync_RelayerFee>;
  zksync_originTransfer?: Maybe<zksync_OriginTransfer>;
  zksync_originTransfers: Array<zksync_OriginTransfer>;
  zksync_destinationTransfer?: Maybe<zksync_DestinationTransfer>;
  zksync_destinationTransfers: Array<zksync_DestinationTransfer>;
  zksync_originMessage?: Maybe<zksync_OriginMessage>;
  zksync_originMessages: Array<zksync_OriginMessage>;
  zksync_aggregateRoot?: Maybe<zksync_AggregateRoot>;
  zksync_aggregateRoots: Array<zksync_AggregateRoot>;
  zksync_connectorMeta?: Maybe<zksync_ConnectorMeta>;
  zksync_connectorMetas: Array<zksync_ConnectorMeta>;
  zksync_rootCount?: Maybe<zksync_RootCount>;
  zksync_rootCounts: Array<zksync_RootCount>;
  zksync_rootMessageSent?: Maybe<zksync_RootMessageSent>;
  zksync_rootMessageSents: Array<zksync_RootMessageSent>;
  zksync_relayerFeesIncrease?: Maybe<zksync_RelayerFeesIncrease>;
  zksync_relayerFeesIncreases: Array<zksync_RelayerFeesIncrease>;
  zksync_slippageUpdate?: Maybe<zksync_SlippageUpdate>;
  zksync_slippageUpdates: Array<zksync_SlippageUpdate>;
  zksync_snapshotRoot?: Maybe<zksync_SnapshotRoot>;
  zksync_snapshotRoots: Array<zksync_SnapshotRoot>;
  zksync_spokeConnectorMode?: Maybe<zksync_SpokeConnectorMode>;
  zksync_spokeConnectorModes: Array<zksync_SpokeConnectorMode>;
  zksync_aggregateRootProposed?: Maybe<zksync_AggregateRootProposed>;
  zksync_aggregateRootProposeds: Array<zksync_AggregateRootProposed>;
  zksync_optimisticRootFinalized?: Maybe<zksync_OptimisticRootFinalized>;
  zksync_optimisticRootFinalizeds: Array<zksync_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  zksync__meta?: Maybe<zksync__Meta_>;
};


export type Queryzksync_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_Asset_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_Asset_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_AssetStatus_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_AssetBalance_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_Router_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_Router_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_RouterDailyTVL_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_RouterLiquidityEvent_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_Setting_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_Setting_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_Relayer_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_Relayer_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_Sequencer_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_Sequencer_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_RelayerFee_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_OriginTransfer_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_DestinationTransfer_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_OriginMessage_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_AggregateRoot_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_ConnectorMeta_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_RootCount_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_RootCount_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_RootMessageSent_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_RelayerFeesIncrease_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_SlippageUpdate_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_SnapshotRoot_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_SpokeConnectorMode_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_AggregateRootProposed_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_OptimisticRootFinalized_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync__metaArgs = {
  block?: InputMaybe<zksync_Block_height>;
};

export type zksync_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['zksync_Bytes']>;
};

export type zksync_RelayerFee = {
  id: Scalars['ID'];
  transfer: zksync_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['zksync_Bytes'];
};

export type zksync_RelayerFee_filter = {
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
  transfer_?: InputMaybe<zksync_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['zksync_Bytes']>;
  asset_not?: InputMaybe<Scalars['zksync_Bytes']>;
  asset_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  asset_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  asset_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  asset_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync_RelayerFee_filter>>>;
};

export type zksync_RelayerFee_orderBy =
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

export type zksync_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: zksync_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['zksync_Bytes']>;
  caller: Scalars['zksync_Bytes'];
  transactionHash: Scalars['zksync_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type zksync_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<zksync_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['zksync_Bytes']>;
  asset_not?: InputMaybe<Scalars['zksync_Bytes']>;
  asset_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  asset_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  asset_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  asset_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  caller?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_not?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
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
  _change_block?: InputMaybe<zksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync_RelayerFeesIncrease_filter>>>;
};

export type zksync_RelayerFeesIncrease_orderBy =
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

export type zksync_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['zksync_Bytes']>;
  relayer_not?: InputMaybe<Scalars['zksync_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync_Relayer_filter>>>;
};

export type zksync_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type zksync_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type zksync_RootCount_filter = {
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
  _change_block?: InputMaybe<zksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync_RootCount_filter>>>;
};

export type zksync_RootCount_orderBy =
  | 'id'
  | 'count';

export type zksync_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['zksync_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['zksync_Bytes']>;
  transactionHash?: Maybe<Scalars['zksync_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type zksync_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['zksync_Bytes']>;
  root_not?: InputMaybe<Scalars['zksync_Bytes']>;
  root_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  root_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  root_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  root_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  root_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_not?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
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
  _change_block?: InputMaybe<zksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync_RootMessageSent_filter>>>;
};

export type zksync_RootMessageSent_orderBy =
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

export type zksync_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['zksync_Bytes']>;
  recipient?: Maybe<Scalars['zksync_Bytes']>;
  proposedOwner?: Maybe<Scalars['zksync_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<zksync_AssetBalance>;
};


export type zksync_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_AssetBalance_filter>;
};

export type zksync_RouterDailyTVL = {
  id: Scalars['ID'];
  router: zksync_Router;
  asset: zksync_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type zksync_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<zksync_Router_filter>;
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
  asset_?: InputMaybe<zksync_Asset_filter>;
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
  _change_block?: InputMaybe<zksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync_RouterDailyTVL_filter>>>;
};

export type zksync_RouterDailyTVL_orderBy =
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

export type zksync_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<zksync_RouterLiquidityEventType>;
  router: zksync_Router;
  asset: zksync_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['zksync_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['zksync_Bytes'];
  nonce: Scalars['BigInt'];
};

export type zksync_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type zksync_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<zksync_RouterLiquidityEventType>;
  type_not?: InputMaybe<zksync_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<zksync_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<zksync_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<zksync_Router_filter>;
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
  asset_?: InputMaybe<zksync_Asset_filter>;
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
  caller?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_not?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync_RouterLiquidityEvent_filter>>>;
};

export type zksync_RouterLiquidityEvent_orderBy =
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

export type zksync_Router_filter = {
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
  owner?: InputMaybe<Scalars['zksync_Bytes']>;
  owner_not?: InputMaybe<Scalars['zksync_Bytes']>;
  owner_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  owner_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  owner_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  owner_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  recipient?: InputMaybe<Scalars['zksync_Bytes']>;
  recipient_not?: InputMaybe<Scalars['zksync_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['zksync_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['zksync_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<zksync_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync_Router_filter>>>;
};

export type zksync_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type zksync_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['zksync_Bytes']>;
};

export type zksync_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['zksync_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['zksync_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync_Sequencer_filter>>>;
};

export type zksync_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type zksync_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['zksync_Bytes'];
};

export type zksync_Setting_filter = {
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
  caller?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_not?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync_Setting_filter>>>;
};

export type zksync_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type zksync_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: zksync_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['zksync_Bytes'];
  transactionHash: Scalars['zksync_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type zksync_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<zksync_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_not?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
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
  _change_block?: InputMaybe<zksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync_SlippageUpdate_filter>>>;
};

export type zksync_SlippageUpdate_orderBy =
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

export type zksync_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['zksync_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type zksync_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['zksync_Bytes']>;
  root_not?: InputMaybe<Scalars['zksync_Bytes']>;
  root_gt?: InputMaybe<Scalars['zksync_Bytes']>;
  root_lt?: InputMaybe<Scalars['zksync_Bytes']>;
  root_gte?: InputMaybe<Scalars['zksync_Bytes']>;
  root_lte?: InputMaybe<Scalars['zksync_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['zksync_Bytes']>>;
  root_contains?: InputMaybe<Scalars['zksync_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['zksync_Bytes']>;
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
  _change_block?: InputMaybe<zksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync_SnapshotRoot_filter>>>;
};

export type zksync_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type zksync_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type zksync_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<zksync_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync_SpokeConnectorMode_filter>>>;
};

export type zksync_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  zksync_asset?: Maybe<zksync_Asset>;
  zksync_assets: Array<zksync_Asset>;
  zksync_assetStatus?: Maybe<zksync_AssetStatus>;
  zksync_assetStatuses: Array<zksync_AssetStatus>;
  zksync_assetBalance?: Maybe<zksync_AssetBalance>;
  zksync_assetBalances: Array<zksync_AssetBalance>;
  zksync_router?: Maybe<zksync_Router>;
  zksync_routers: Array<zksync_Router>;
  zksync_routerDailyTVL?: Maybe<zksync_RouterDailyTVL>;
  zksync_routerDailyTVLs: Array<zksync_RouterDailyTVL>;
  zksync_routerLiquidityEvent?: Maybe<zksync_RouterLiquidityEvent>;
  zksync_routerLiquidityEvents: Array<zksync_RouterLiquidityEvent>;
  zksync_setting?: Maybe<zksync_Setting>;
  zksync_settings: Array<zksync_Setting>;
  zksync_relayer?: Maybe<zksync_Relayer>;
  zksync_relayers: Array<zksync_Relayer>;
  zksync_sequencer?: Maybe<zksync_Sequencer>;
  zksync_sequencers: Array<zksync_Sequencer>;
  zksync_relayerFee?: Maybe<zksync_RelayerFee>;
  zksync_relayerFees: Array<zksync_RelayerFee>;
  zksync_originTransfer?: Maybe<zksync_OriginTransfer>;
  zksync_originTransfers: Array<zksync_OriginTransfer>;
  zksync_destinationTransfer?: Maybe<zksync_DestinationTransfer>;
  zksync_destinationTransfers: Array<zksync_DestinationTransfer>;
  zksync_originMessage?: Maybe<zksync_OriginMessage>;
  zksync_originMessages: Array<zksync_OriginMessage>;
  zksync_aggregateRoot?: Maybe<zksync_AggregateRoot>;
  zksync_aggregateRoots: Array<zksync_AggregateRoot>;
  zksync_connectorMeta?: Maybe<zksync_ConnectorMeta>;
  zksync_connectorMetas: Array<zksync_ConnectorMeta>;
  zksync_rootCount?: Maybe<zksync_RootCount>;
  zksync_rootCounts: Array<zksync_RootCount>;
  zksync_rootMessageSent?: Maybe<zksync_RootMessageSent>;
  zksync_rootMessageSents: Array<zksync_RootMessageSent>;
  zksync_relayerFeesIncrease?: Maybe<zksync_RelayerFeesIncrease>;
  zksync_relayerFeesIncreases: Array<zksync_RelayerFeesIncrease>;
  zksync_slippageUpdate?: Maybe<zksync_SlippageUpdate>;
  zksync_slippageUpdates: Array<zksync_SlippageUpdate>;
  zksync_snapshotRoot?: Maybe<zksync_SnapshotRoot>;
  zksync_snapshotRoots: Array<zksync_SnapshotRoot>;
  zksync_spokeConnectorMode?: Maybe<zksync_SpokeConnectorMode>;
  zksync_spokeConnectorModes: Array<zksync_SpokeConnectorMode>;
  zksync_aggregateRootProposed?: Maybe<zksync_AggregateRootProposed>;
  zksync_aggregateRootProposeds: Array<zksync_AggregateRootProposed>;
  zksync_optimisticRootFinalized?: Maybe<zksync_OptimisticRootFinalized>;
  zksync_optimisticRootFinalizeds: Array<zksync_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  zksync__meta?: Maybe<zksync__Meta_>;
};


export type Subscriptionzksync_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_Asset_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_Asset_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_AssetStatus_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_AssetBalance_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_Router_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_Router_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_RouterDailyTVL_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_RouterLiquidityEvent_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_Setting_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_Setting_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_Relayer_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_Relayer_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_Sequencer_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_Sequencer_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_RelayerFee_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_OriginTransfer_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_DestinationTransfer_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_OriginMessage_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_AggregateRoot_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_ConnectorMeta_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_RootCount_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_RootCount_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_RootMessageSent_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_RelayerFeesIncrease_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_SlippageUpdate_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_SnapshotRoot_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_SpokeConnectorMode_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_AggregateRootProposed_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<zksync_OrderDirection>;
  where?: InputMaybe<zksync_OptimisticRootFinalized_filter>;
  block?: InputMaybe<zksync_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync__metaArgs = {
  block?: InputMaybe<zksync_Block_height>;
};

export type zksync_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type zksync__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['zksync_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['zksync_Bytes']>;
};

/** The type for the top-level _meta field */
export type zksync__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: zksync__Block_;
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
  zksync_asset: InContextSdkMethod<Query['zksync_asset'], Queryzksync_assetArgs, MeshContext>,
  /** null **/
  zksync_assets: InContextSdkMethod<Query['zksync_assets'], Queryzksync_assetsArgs, MeshContext>,
  /** null **/
  zksync_assetStatus: InContextSdkMethod<Query['zksync_assetStatus'], Queryzksync_assetStatusArgs, MeshContext>,
  /** null **/
  zksync_assetStatuses: InContextSdkMethod<Query['zksync_assetStatuses'], Queryzksync_assetStatusesArgs, MeshContext>,
  /** null **/
  zksync_assetBalance: InContextSdkMethod<Query['zksync_assetBalance'], Queryzksync_assetBalanceArgs, MeshContext>,
  /** null **/
  zksync_assetBalances: InContextSdkMethod<Query['zksync_assetBalances'], Queryzksync_assetBalancesArgs, MeshContext>,
  /** null **/
  zksync_router: InContextSdkMethod<Query['zksync_router'], Queryzksync_routerArgs, MeshContext>,
  /** null **/
  zksync_routers: InContextSdkMethod<Query['zksync_routers'], Queryzksync_routersArgs, MeshContext>,
  /** null **/
  zksync_routerDailyTVL: InContextSdkMethod<Query['zksync_routerDailyTVL'], Queryzksync_routerDailyTVLArgs, MeshContext>,
  /** null **/
  zksync_routerDailyTVLs: InContextSdkMethod<Query['zksync_routerDailyTVLs'], Queryzksync_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  zksync_routerLiquidityEvent: InContextSdkMethod<Query['zksync_routerLiquidityEvent'], Queryzksync_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  zksync_routerLiquidityEvents: InContextSdkMethod<Query['zksync_routerLiquidityEvents'], Queryzksync_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  zksync_setting: InContextSdkMethod<Query['zksync_setting'], Queryzksync_settingArgs, MeshContext>,
  /** null **/
  zksync_settings: InContextSdkMethod<Query['zksync_settings'], Queryzksync_settingsArgs, MeshContext>,
  /** null **/
  zksync_relayer: InContextSdkMethod<Query['zksync_relayer'], Queryzksync_relayerArgs, MeshContext>,
  /** null **/
  zksync_relayers: InContextSdkMethod<Query['zksync_relayers'], Queryzksync_relayersArgs, MeshContext>,
  /** null **/
  zksync_sequencer: InContextSdkMethod<Query['zksync_sequencer'], Queryzksync_sequencerArgs, MeshContext>,
  /** null **/
  zksync_sequencers: InContextSdkMethod<Query['zksync_sequencers'], Queryzksync_sequencersArgs, MeshContext>,
  /** null **/
  zksync_relayerFee: InContextSdkMethod<Query['zksync_relayerFee'], Queryzksync_relayerFeeArgs, MeshContext>,
  /** null **/
  zksync_relayerFees: InContextSdkMethod<Query['zksync_relayerFees'], Queryzksync_relayerFeesArgs, MeshContext>,
  /** null **/
  zksync_originTransfer: InContextSdkMethod<Query['zksync_originTransfer'], Queryzksync_originTransferArgs, MeshContext>,
  /** null **/
  zksync_originTransfers: InContextSdkMethod<Query['zksync_originTransfers'], Queryzksync_originTransfersArgs, MeshContext>,
  /** null **/
  zksync_destinationTransfer: InContextSdkMethod<Query['zksync_destinationTransfer'], Queryzksync_destinationTransferArgs, MeshContext>,
  /** null **/
  zksync_destinationTransfers: InContextSdkMethod<Query['zksync_destinationTransfers'], Queryzksync_destinationTransfersArgs, MeshContext>,
  /** null **/
  zksync_originMessage: InContextSdkMethod<Query['zksync_originMessage'], Queryzksync_originMessageArgs, MeshContext>,
  /** null **/
  zksync_originMessages: InContextSdkMethod<Query['zksync_originMessages'], Queryzksync_originMessagesArgs, MeshContext>,
  /** null **/
  zksync_aggregateRoot: InContextSdkMethod<Query['zksync_aggregateRoot'], Queryzksync_aggregateRootArgs, MeshContext>,
  /** null **/
  zksync_aggregateRoots: InContextSdkMethod<Query['zksync_aggregateRoots'], Queryzksync_aggregateRootsArgs, MeshContext>,
  /** null **/
  zksync_connectorMeta: InContextSdkMethod<Query['zksync_connectorMeta'], Queryzksync_connectorMetaArgs, MeshContext>,
  /** null **/
  zksync_connectorMetas: InContextSdkMethod<Query['zksync_connectorMetas'], Queryzksync_connectorMetasArgs, MeshContext>,
  /** null **/
  zksync_rootCount: InContextSdkMethod<Query['zksync_rootCount'], Queryzksync_rootCountArgs, MeshContext>,
  /** null **/
  zksync_rootCounts: InContextSdkMethod<Query['zksync_rootCounts'], Queryzksync_rootCountsArgs, MeshContext>,
  /** null **/
  zksync_rootMessageSent: InContextSdkMethod<Query['zksync_rootMessageSent'], Queryzksync_rootMessageSentArgs, MeshContext>,
  /** null **/
  zksync_rootMessageSents: InContextSdkMethod<Query['zksync_rootMessageSents'], Queryzksync_rootMessageSentsArgs, MeshContext>,
  /** null **/
  zksync_relayerFeesIncrease: InContextSdkMethod<Query['zksync_relayerFeesIncrease'], Queryzksync_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  zksync_relayerFeesIncreases: InContextSdkMethod<Query['zksync_relayerFeesIncreases'], Queryzksync_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  zksync_slippageUpdate: InContextSdkMethod<Query['zksync_slippageUpdate'], Queryzksync_slippageUpdateArgs, MeshContext>,
  /** null **/
  zksync_slippageUpdates: InContextSdkMethod<Query['zksync_slippageUpdates'], Queryzksync_slippageUpdatesArgs, MeshContext>,
  /** null **/
  zksync_snapshotRoot: InContextSdkMethod<Query['zksync_snapshotRoot'], Queryzksync_snapshotRootArgs, MeshContext>,
  /** null **/
  zksync_snapshotRoots: InContextSdkMethod<Query['zksync_snapshotRoots'], Queryzksync_snapshotRootsArgs, MeshContext>,
  /** null **/
  zksync_spokeConnectorMode: InContextSdkMethod<Query['zksync_spokeConnectorMode'], Queryzksync_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  zksync_spokeConnectorModes: InContextSdkMethod<Query['zksync_spokeConnectorModes'], Queryzksync_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  zksync_aggregateRootProposed: InContextSdkMethod<Query['zksync_aggregateRootProposed'], Queryzksync_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  zksync_aggregateRootProposeds: InContextSdkMethod<Query['zksync_aggregateRootProposeds'], Queryzksync_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  zksync_optimisticRootFinalized: InContextSdkMethod<Query['zksync_optimisticRootFinalized'], Queryzksync_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  zksync_optimisticRootFinalizeds: InContextSdkMethod<Query['zksync_optimisticRootFinalizeds'], Queryzksync_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  zksync__meta: InContextSdkMethod<Query['zksync__meta'], Queryzksync__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  zksync_asset: InContextSdkMethod<Subscription['zksync_asset'], Subscriptionzksync_assetArgs, MeshContext>,
  /** null **/
  zksync_assets: InContextSdkMethod<Subscription['zksync_assets'], Subscriptionzksync_assetsArgs, MeshContext>,
  /** null **/
  zksync_assetStatus: InContextSdkMethod<Subscription['zksync_assetStatus'], Subscriptionzksync_assetStatusArgs, MeshContext>,
  /** null **/
  zksync_assetStatuses: InContextSdkMethod<Subscription['zksync_assetStatuses'], Subscriptionzksync_assetStatusesArgs, MeshContext>,
  /** null **/
  zksync_assetBalance: InContextSdkMethod<Subscription['zksync_assetBalance'], Subscriptionzksync_assetBalanceArgs, MeshContext>,
  /** null **/
  zksync_assetBalances: InContextSdkMethod<Subscription['zksync_assetBalances'], Subscriptionzksync_assetBalancesArgs, MeshContext>,
  /** null **/
  zksync_router: InContextSdkMethod<Subscription['zksync_router'], Subscriptionzksync_routerArgs, MeshContext>,
  /** null **/
  zksync_routers: InContextSdkMethod<Subscription['zksync_routers'], Subscriptionzksync_routersArgs, MeshContext>,
  /** null **/
  zksync_routerDailyTVL: InContextSdkMethod<Subscription['zksync_routerDailyTVL'], Subscriptionzksync_routerDailyTVLArgs, MeshContext>,
  /** null **/
  zksync_routerDailyTVLs: InContextSdkMethod<Subscription['zksync_routerDailyTVLs'], Subscriptionzksync_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  zksync_routerLiquidityEvent: InContextSdkMethod<Subscription['zksync_routerLiquidityEvent'], Subscriptionzksync_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  zksync_routerLiquidityEvents: InContextSdkMethod<Subscription['zksync_routerLiquidityEvents'], Subscriptionzksync_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  zksync_setting: InContextSdkMethod<Subscription['zksync_setting'], Subscriptionzksync_settingArgs, MeshContext>,
  /** null **/
  zksync_settings: InContextSdkMethod<Subscription['zksync_settings'], Subscriptionzksync_settingsArgs, MeshContext>,
  /** null **/
  zksync_relayer: InContextSdkMethod<Subscription['zksync_relayer'], Subscriptionzksync_relayerArgs, MeshContext>,
  /** null **/
  zksync_relayers: InContextSdkMethod<Subscription['zksync_relayers'], Subscriptionzksync_relayersArgs, MeshContext>,
  /** null **/
  zksync_sequencer: InContextSdkMethod<Subscription['zksync_sequencer'], Subscriptionzksync_sequencerArgs, MeshContext>,
  /** null **/
  zksync_sequencers: InContextSdkMethod<Subscription['zksync_sequencers'], Subscriptionzksync_sequencersArgs, MeshContext>,
  /** null **/
  zksync_relayerFee: InContextSdkMethod<Subscription['zksync_relayerFee'], Subscriptionzksync_relayerFeeArgs, MeshContext>,
  /** null **/
  zksync_relayerFees: InContextSdkMethod<Subscription['zksync_relayerFees'], Subscriptionzksync_relayerFeesArgs, MeshContext>,
  /** null **/
  zksync_originTransfer: InContextSdkMethod<Subscription['zksync_originTransfer'], Subscriptionzksync_originTransferArgs, MeshContext>,
  /** null **/
  zksync_originTransfers: InContextSdkMethod<Subscription['zksync_originTransfers'], Subscriptionzksync_originTransfersArgs, MeshContext>,
  /** null **/
  zksync_destinationTransfer: InContextSdkMethod<Subscription['zksync_destinationTransfer'], Subscriptionzksync_destinationTransferArgs, MeshContext>,
  /** null **/
  zksync_destinationTransfers: InContextSdkMethod<Subscription['zksync_destinationTransfers'], Subscriptionzksync_destinationTransfersArgs, MeshContext>,
  /** null **/
  zksync_originMessage: InContextSdkMethod<Subscription['zksync_originMessage'], Subscriptionzksync_originMessageArgs, MeshContext>,
  /** null **/
  zksync_originMessages: InContextSdkMethod<Subscription['zksync_originMessages'], Subscriptionzksync_originMessagesArgs, MeshContext>,
  /** null **/
  zksync_aggregateRoot: InContextSdkMethod<Subscription['zksync_aggregateRoot'], Subscriptionzksync_aggregateRootArgs, MeshContext>,
  /** null **/
  zksync_aggregateRoots: InContextSdkMethod<Subscription['zksync_aggregateRoots'], Subscriptionzksync_aggregateRootsArgs, MeshContext>,
  /** null **/
  zksync_connectorMeta: InContextSdkMethod<Subscription['zksync_connectorMeta'], Subscriptionzksync_connectorMetaArgs, MeshContext>,
  /** null **/
  zksync_connectorMetas: InContextSdkMethod<Subscription['zksync_connectorMetas'], Subscriptionzksync_connectorMetasArgs, MeshContext>,
  /** null **/
  zksync_rootCount: InContextSdkMethod<Subscription['zksync_rootCount'], Subscriptionzksync_rootCountArgs, MeshContext>,
  /** null **/
  zksync_rootCounts: InContextSdkMethod<Subscription['zksync_rootCounts'], Subscriptionzksync_rootCountsArgs, MeshContext>,
  /** null **/
  zksync_rootMessageSent: InContextSdkMethod<Subscription['zksync_rootMessageSent'], Subscriptionzksync_rootMessageSentArgs, MeshContext>,
  /** null **/
  zksync_rootMessageSents: InContextSdkMethod<Subscription['zksync_rootMessageSents'], Subscriptionzksync_rootMessageSentsArgs, MeshContext>,
  /** null **/
  zksync_relayerFeesIncrease: InContextSdkMethod<Subscription['zksync_relayerFeesIncrease'], Subscriptionzksync_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  zksync_relayerFeesIncreases: InContextSdkMethod<Subscription['zksync_relayerFeesIncreases'], Subscriptionzksync_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  zksync_slippageUpdate: InContextSdkMethod<Subscription['zksync_slippageUpdate'], Subscriptionzksync_slippageUpdateArgs, MeshContext>,
  /** null **/
  zksync_slippageUpdates: InContextSdkMethod<Subscription['zksync_slippageUpdates'], Subscriptionzksync_slippageUpdatesArgs, MeshContext>,
  /** null **/
  zksync_snapshotRoot: InContextSdkMethod<Subscription['zksync_snapshotRoot'], Subscriptionzksync_snapshotRootArgs, MeshContext>,
  /** null **/
  zksync_snapshotRoots: InContextSdkMethod<Subscription['zksync_snapshotRoots'], Subscriptionzksync_snapshotRootsArgs, MeshContext>,
  /** null **/
  zksync_spokeConnectorMode: InContextSdkMethod<Subscription['zksync_spokeConnectorMode'], Subscriptionzksync_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  zksync_spokeConnectorModes: InContextSdkMethod<Subscription['zksync_spokeConnectorModes'], Subscriptionzksync_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  zksync_aggregateRootProposed: InContextSdkMethod<Subscription['zksync_aggregateRootProposed'], Subscriptionzksync_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  zksync_aggregateRootProposeds: InContextSdkMethod<Subscription['zksync_aggregateRootProposeds'], Subscriptionzksync_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  zksync_optimisticRootFinalized: InContextSdkMethod<Subscription['zksync_optimisticRootFinalized'], Subscriptionzksync_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  zksync_optimisticRootFinalizeds: InContextSdkMethod<Subscription['zksync_optimisticRootFinalizeds'], Subscriptionzksync_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  zksync__meta: InContextSdkMethod<Subscription['zksync__meta'], Subscriptionzksync__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_ZkSync"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
