// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextStagingBaseTypes {
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
  stagingbase_BigDecimal: any;
  BigInt: any;
  stagingbase_Bytes: any;
  stagingbase_Int8: any;
};

export type stagingbase_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['stagingbase_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type stagingbase_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingbase_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingbase_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingbase_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
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
  _change_block?: InputMaybe<stagingbase_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingbase_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingbase_AggregateRootProposed_filter>>>;
};

export type stagingbase_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type stagingbase_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingbase_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingbase_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingbase_AggregateRoot_filter>>>;
};

export type stagingbase_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type stagingbase_Aggregation_interval =
  | 'hour'
  | 'day';

export type stagingbase_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['stagingbase_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingbase_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['stagingbase_Bytes']>;
  localAsset?: Maybe<Scalars['stagingbase_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingbase_AssetStatus>;
};

export type stagingbase_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: stagingbase_Router;
  asset: stagingbase_Asset;
  feesEarned: Scalars['BigInt'];
};

export type stagingbase_AssetBalance_filter = {
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
  router_?: InputMaybe<stagingbase_Router_filter>;
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
  asset_?: InputMaybe<stagingbase_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingbase_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingbase_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingbase_AssetBalance_filter>>>;
};

export type stagingbase_AssetBalance_orderBy =
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

export type stagingbase_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type stagingbase_AssetStatus_filter = {
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
  _change_block?: InputMaybe<stagingbase_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingbase_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingbase_AssetStatus_filter>>>;
};

export type stagingbase_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type stagingbase_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['stagingbase_Bytes']>;
  key_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  key_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  key_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  key_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  key_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  key_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingbase_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['stagingbase_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  localAsset?: InputMaybe<Scalars['stagingbase_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
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
  status_?: InputMaybe<stagingbase_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingbase_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingbase_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingbase_Asset_filter>>>;
};

export type stagingbase_Asset_orderBy =
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

export type stagingbase_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingbase_Block_height = {
  hash?: InputMaybe<Scalars['stagingbase_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type stagingbase_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['stagingbase_Bytes']>;
  rootManager?: Maybe<Scalars['stagingbase_Bytes']>;
  mirrorConnector?: Maybe<Scalars['stagingbase_Bytes']>;
};

export type stagingbase_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingbase_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingbase_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingbase_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingbase_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingbase_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingbase_ConnectorMeta_filter>>>;
};

export type stagingbase_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingbase_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingbase_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingbase_TransferStatus>;
  routers?: Maybe<Array<stagingbase_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingbase_Bytes']>;
  delegate?: Maybe<Scalars['stagingbase_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingbase_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingbase_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingbase_Bytes']>;
  asset?: Maybe<stagingbase_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['stagingbase_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['stagingbase_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['stagingbase_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['stagingbase_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['stagingbase_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['stagingbase_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingbase_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_Router_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_Router_filter>;
};

export type stagingbase_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingbase_TransferStatus>;
  status_not?: InputMaybe<stagingbase_TransferStatus>;
  status_in?: InputMaybe<Array<stagingbase_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingbase_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<stagingbase_Router_filter>;
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
  to?: InputMaybe<Scalars['stagingbase_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingbase_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingbase_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
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
  originSender?: InputMaybe<Scalars['stagingbase_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingbase_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
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
  asset_?: InputMaybe<stagingbase_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['stagingbase_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['stagingbase_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['stagingbase_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['stagingbase_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['stagingbase_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['stagingbase_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingbase_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingbase_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingbase_DestinationTransfer_filter>>>;
};

export type stagingbase_DestinationTransfer_orderBy =
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

export type stagingbase_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingbase_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingbase_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingbase_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
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
  _change_block?: InputMaybe<stagingbase_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingbase_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingbase_OptimisticRootFinalized_filter>>>;
};

export type stagingbase_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type stagingbase_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingbase_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['stagingbase_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['stagingbase_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['stagingbase_Bytes']>;
  root?: Maybe<Scalars['stagingbase_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingbase_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<stagingbase_RootCount>;
};

export type stagingbase_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['stagingbase_Bytes']>;
  leaf_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['stagingbase_Bytes']>;
  message_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  message_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  message_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  message_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  message_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  message_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
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
  rootCount_?: InputMaybe<stagingbase_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingbase_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingbase_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingbase_OriginMessage_filter>>>;
};

export type stagingbase_OriginMessage_orderBy =
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

export type stagingbase_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingbase_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingbase_TransferStatus>;
  messageHash?: Maybe<Scalars['stagingbase_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingbase_Bytes']>;
  delegate?: Maybe<Scalars['stagingbase_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingbase_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingbase_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingbase_Bytes']>;
  asset?: Maybe<stagingbase_Asset>;
  transactingAsset?: Maybe<Scalars['stagingbase_Bytes']>;
  message?: Maybe<stagingbase_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<stagingbase_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['stagingbase_Bytes']>;
  caller?: Maybe<Scalars['stagingbase_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingbase_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['stagingbase_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingbase_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_RelayerFee_filter>;
};

export type stagingbase_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingbase_TransferStatus>;
  status_not?: InputMaybe<stagingbase_TransferStatus>;
  status_in?: InputMaybe<Array<stagingbase_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingbase_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['stagingbase_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
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
  to?: InputMaybe<Scalars['stagingbase_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingbase_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingbase_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['stagingbase_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingbase_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
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
  asset_?: InputMaybe<stagingbase_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
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
  message_?: InputMaybe<stagingbase_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<stagingbase_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['stagingbase_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['stagingbase_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingbase_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingbase_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingbase_OriginTransfer_filter>>>;
};

export type stagingbase_OriginTransfer_orderBy =
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
  stagingbase_asset?: Maybe<stagingbase_Asset>;
  stagingbase_assets: Array<stagingbase_Asset>;
  stagingbase_assetStatus?: Maybe<stagingbase_AssetStatus>;
  stagingbase_assetStatuses: Array<stagingbase_AssetStatus>;
  stagingbase_assetBalance?: Maybe<stagingbase_AssetBalance>;
  stagingbase_assetBalances: Array<stagingbase_AssetBalance>;
  stagingbase_router?: Maybe<stagingbase_Router>;
  stagingbase_routers: Array<stagingbase_Router>;
  stagingbase_routerDailyTVL?: Maybe<stagingbase_RouterDailyTVL>;
  stagingbase_routerDailyTVLs: Array<stagingbase_RouterDailyTVL>;
  stagingbase_routerLiquidityEvent?: Maybe<stagingbase_RouterLiquidityEvent>;
  stagingbase_routerLiquidityEvents: Array<stagingbase_RouterLiquidityEvent>;
  stagingbase_setting?: Maybe<stagingbase_Setting>;
  stagingbase_settings: Array<stagingbase_Setting>;
  stagingbase_relayer?: Maybe<stagingbase_Relayer>;
  stagingbase_relayers: Array<stagingbase_Relayer>;
  stagingbase_sequencer?: Maybe<stagingbase_Sequencer>;
  stagingbase_sequencers: Array<stagingbase_Sequencer>;
  stagingbase_relayerFee?: Maybe<stagingbase_RelayerFee>;
  stagingbase_relayerFees: Array<stagingbase_RelayerFee>;
  stagingbase_originTransfer?: Maybe<stagingbase_OriginTransfer>;
  stagingbase_originTransfers: Array<stagingbase_OriginTransfer>;
  stagingbase_destinationTransfer?: Maybe<stagingbase_DestinationTransfer>;
  stagingbase_destinationTransfers: Array<stagingbase_DestinationTransfer>;
  stagingbase_originMessage?: Maybe<stagingbase_OriginMessage>;
  stagingbase_originMessages: Array<stagingbase_OriginMessage>;
  stagingbase_aggregateRoot?: Maybe<stagingbase_AggregateRoot>;
  stagingbase_aggregateRoots: Array<stagingbase_AggregateRoot>;
  stagingbase_connectorMeta?: Maybe<stagingbase_ConnectorMeta>;
  stagingbase_connectorMetas: Array<stagingbase_ConnectorMeta>;
  stagingbase_rootCount?: Maybe<stagingbase_RootCount>;
  stagingbase_rootCounts: Array<stagingbase_RootCount>;
  stagingbase_rootMessageSent?: Maybe<stagingbase_RootMessageSent>;
  stagingbase_rootMessageSents: Array<stagingbase_RootMessageSent>;
  stagingbase_relayerFeesIncrease?: Maybe<stagingbase_RelayerFeesIncrease>;
  stagingbase_relayerFeesIncreases: Array<stagingbase_RelayerFeesIncrease>;
  stagingbase_slippageUpdate?: Maybe<stagingbase_SlippageUpdate>;
  stagingbase_slippageUpdates: Array<stagingbase_SlippageUpdate>;
  stagingbase_snapshotRoot?: Maybe<stagingbase_SnapshotRoot>;
  stagingbase_snapshotRoots: Array<stagingbase_SnapshotRoot>;
  stagingbase_spokeConnectorMode?: Maybe<stagingbase_SpokeConnectorMode>;
  stagingbase_spokeConnectorModes: Array<stagingbase_SpokeConnectorMode>;
  stagingbase_aggregateRootProposed?: Maybe<stagingbase_AggregateRootProposed>;
  stagingbase_aggregateRootProposeds: Array<stagingbase_AggregateRootProposed>;
  stagingbase_optimisticRootFinalized?: Maybe<stagingbase_OptimisticRootFinalized>;
  stagingbase_optimisticRootFinalizeds: Array<stagingbase_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingbase__meta?: Maybe<stagingbase__Meta_>;
};


export type Querystagingbase_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_Asset_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_AssetStatus_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_AssetBalance_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_Router_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_Router_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_Setting_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_Relayer_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_Sequencer_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_RelayerFee_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_OriginTransfer_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_DestinationTransfer_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_OriginMessage_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_AggregateRoot_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_ConnectorMeta_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_RootCount_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_RootMessageSent_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_SlippageUpdate_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_SnapshotRoot_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingbase__metaArgs = {
  block?: InputMaybe<stagingbase_Block_height>;
};

export type stagingbase_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['stagingbase_Bytes']>;
};

export type stagingbase_RelayerFee = {
  id: Scalars['ID'];
  transfer: stagingbase_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['stagingbase_Bytes'];
};

export type stagingbase_RelayerFee_filter = {
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
  transfer_?: InputMaybe<stagingbase_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingbase_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingbase_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingbase_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingbase_RelayerFee_filter>>>;
};

export type stagingbase_RelayerFee_orderBy =
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

export type stagingbase_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: stagingbase_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['stagingbase_Bytes']>;
  caller: Scalars['stagingbase_Bytes'];
  transactionHash: Scalars['stagingbase_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingbase_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<stagingbase_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingbase_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
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
  _change_block?: InputMaybe<stagingbase_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingbase_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingbase_RelayerFeesIncrease_filter>>>;
};

export type stagingbase_RelayerFeesIncrease_orderBy =
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

export type stagingbase_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['stagingbase_Bytes']>;
  relayer_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingbase_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingbase_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingbase_Relayer_filter>>>;
};

export type stagingbase_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type stagingbase_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type stagingbase_RootCount_filter = {
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
  _change_block?: InputMaybe<stagingbase_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingbase_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingbase_RootCount_filter>>>;
};

export type stagingbase_RootCount_orderBy =
  | 'id'
  | 'count';

export type stagingbase_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['stagingbase_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['stagingbase_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingbase_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingbase_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
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
  _change_block?: InputMaybe<stagingbase_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingbase_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingbase_RootMessageSent_filter>>>;
};

export type stagingbase_RootMessageSent_orderBy =
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

export type stagingbase_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['stagingbase_Bytes']>;
  recipient?: Maybe<Scalars['stagingbase_Bytes']>;
  proposedOwner?: Maybe<Scalars['stagingbase_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<stagingbase_AssetBalance>;
};


export type stagingbase_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_AssetBalance_filter>;
};

export type stagingbase_RouterDailyTVL = {
  id: Scalars['ID'];
  router: stagingbase_Router;
  asset: stagingbase_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type stagingbase_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<stagingbase_Router_filter>;
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
  asset_?: InputMaybe<stagingbase_Asset_filter>;
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
  _change_block?: InputMaybe<stagingbase_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingbase_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingbase_RouterDailyTVL_filter>>>;
};

export type stagingbase_RouterDailyTVL_orderBy =
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

export type stagingbase_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<stagingbase_RouterLiquidityEventType>;
  router: stagingbase_Router;
  asset: stagingbase_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['stagingbase_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['stagingbase_Bytes'];
  nonce: Scalars['BigInt'];
};

export type stagingbase_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type stagingbase_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<stagingbase_RouterLiquidityEventType>;
  type_not?: InputMaybe<stagingbase_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<stagingbase_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<stagingbase_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<stagingbase_Router_filter>;
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
  asset_?: InputMaybe<stagingbase_Asset_filter>;
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
  caller?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingbase_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingbase_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingbase_RouterLiquidityEvent_filter>>>;
};

export type stagingbase_RouterLiquidityEvent_orderBy =
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

export type stagingbase_Router_filter = {
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
  owner?: InputMaybe<Scalars['stagingbase_Bytes']>;
  owner_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  owner_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  owner_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  owner_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  owner_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  recipient?: InputMaybe<Scalars['stagingbase_Bytes']>;
  recipient_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['stagingbase_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<stagingbase_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingbase_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingbase_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingbase_Router_filter>>>;
};

export type stagingbase_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type stagingbase_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['stagingbase_Bytes']>;
};

export type stagingbase_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['stagingbase_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingbase_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingbase_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingbase_Sequencer_filter>>>;
};

export type stagingbase_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type stagingbase_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['stagingbase_Bytes'];
};

export type stagingbase_Setting_filter = {
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
  caller?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingbase_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingbase_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingbase_Setting_filter>>>;
};

export type stagingbase_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type stagingbase_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: stagingbase_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['stagingbase_Bytes'];
  transactionHash: Scalars['stagingbase_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingbase_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<stagingbase_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
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
  _change_block?: InputMaybe<stagingbase_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingbase_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingbase_SlippageUpdate_filter>>>;
};

export type stagingbase_SlippageUpdate_orderBy =
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

export type stagingbase_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['stagingbase_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingbase_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingbase_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingbase_Bytes']>;
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
  _change_block?: InputMaybe<stagingbase_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingbase_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingbase_SnapshotRoot_filter>>>;
};

export type stagingbase_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type stagingbase_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type stagingbase_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<stagingbase_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingbase_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingbase_SpokeConnectorMode_filter>>>;
};

export type stagingbase_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  stagingbase_asset?: Maybe<stagingbase_Asset>;
  stagingbase_assets: Array<stagingbase_Asset>;
  stagingbase_assetStatus?: Maybe<stagingbase_AssetStatus>;
  stagingbase_assetStatuses: Array<stagingbase_AssetStatus>;
  stagingbase_assetBalance?: Maybe<stagingbase_AssetBalance>;
  stagingbase_assetBalances: Array<stagingbase_AssetBalance>;
  stagingbase_router?: Maybe<stagingbase_Router>;
  stagingbase_routers: Array<stagingbase_Router>;
  stagingbase_routerDailyTVL?: Maybe<stagingbase_RouterDailyTVL>;
  stagingbase_routerDailyTVLs: Array<stagingbase_RouterDailyTVL>;
  stagingbase_routerLiquidityEvent?: Maybe<stagingbase_RouterLiquidityEvent>;
  stagingbase_routerLiquidityEvents: Array<stagingbase_RouterLiquidityEvent>;
  stagingbase_setting?: Maybe<stagingbase_Setting>;
  stagingbase_settings: Array<stagingbase_Setting>;
  stagingbase_relayer?: Maybe<stagingbase_Relayer>;
  stagingbase_relayers: Array<stagingbase_Relayer>;
  stagingbase_sequencer?: Maybe<stagingbase_Sequencer>;
  stagingbase_sequencers: Array<stagingbase_Sequencer>;
  stagingbase_relayerFee?: Maybe<stagingbase_RelayerFee>;
  stagingbase_relayerFees: Array<stagingbase_RelayerFee>;
  stagingbase_originTransfer?: Maybe<stagingbase_OriginTransfer>;
  stagingbase_originTransfers: Array<stagingbase_OriginTransfer>;
  stagingbase_destinationTransfer?: Maybe<stagingbase_DestinationTransfer>;
  stagingbase_destinationTransfers: Array<stagingbase_DestinationTransfer>;
  stagingbase_originMessage?: Maybe<stagingbase_OriginMessage>;
  stagingbase_originMessages: Array<stagingbase_OriginMessage>;
  stagingbase_aggregateRoot?: Maybe<stagingbase_AggregateRoot>;
  stagingbase_aggregateRoots: Array<stagingbase_AggregateRoot>;
  stagingbase_connectorMeta?: Maybe<stagingbase_ConnectorMeta>;
  stagingbase_connectorMetas: Array<stagingbase_ConnectorMeta>;
  stagingbase_rootCount?: Maybe<stagingbase_RootCount>;
  stagingbase_rootCounts: Array<stagingbase_RootCount>;
  stagingbase_rootMessageSent?: Maybe<stagingbase_RootMessageSent>;
  stagingbase_rootMessageSents: Array<stagingbase_RootMessageSent>;
  stagingbase_relayerFeesIncrease?: Maybe<stagingbase_RelayerFeesIncrease>;
  stagingbase_relayerFeesIncreases: Array<stagingbase_RelayerFeesIncrease>;
  stagingbase_slippageUpdate?: Maybe<stagingbase_SlippageUpdate>;
  stagingbase_slippageUpdates: Array<stagingbase_SlippageUpdate>;
  stagingbase_snapshotRoot?: Maybe<stagingbase_SnapshotRoot>;
  stagingbase_snapshotRoots: Array<stagingbase_SnapshotRoot>;
  stagingbase_spokeConnectorMode?: Maybe<stagingbase_SpokeConnectorMode>;
  stagingbase_spokeConnectorModes: Array<stagingbase_SpokeConnectorMode>;
  stagingbase_aggregateRootProposed?: Maybe<stagingbase_AggregateRootProposed>;
  stagingbase_aggregateRootProposeds: Array<stagingbase_AggregateRootProposed>;
  stagingbase_optimisticRootFinalized?: Maybe<stagingbase_OptimisticRootFinalized>;
  stagingbase_optimisticRootFinalizeds: Array<stagingbase_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingbase__meta?: Maybe<stagingbase__Meta_>;
};


export type Subscriptionstagingbase_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_Asset_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_AssetStatus_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_AssetBalance_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_Router_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_Router_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_Setting_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_Relayer_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_Sequencer_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_RelayerFee_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_OriginTransfer_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_DestinationTransfer_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_OriginMessage_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_AggregateRoot_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_ConnectorMeta_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_RootCount_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_RootMessageSent_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_SlippageUpdate_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_SnapshotRoot_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingbase_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingbase_OrderDirection>;
  where?: InputMaybe<stagingbase_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingbase_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingbase__metaArgs = {
  block?: InputMaybe<stagingbase_Block_height>;
};

export type stagingbase_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type stagingbase__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingbase_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type stagingbase__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingbase__Block_;
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
  stagingbase_asset: InContextSdkMethod<Query['stagingbase_asset'], Querystagingbase_assetArgs, MeshContext>,
  /** null **/
  stagingbase_assets: InContextSdkMethod<Query['stagingbase_assets'], Querystagingbase_assetsArgs, MeshContext>,
  /** null **/
  stagingbase_assetStatus: InContextSdkMethod<Query['stagingbase_assetStatus'], Querystagingbase_assetStatusArgs, MeshContext>,
  /** null **/
  stagingbase_assetStatuses: InContextSdkMethod<Query['stagingbase_assetStatuses'], Querystagingbase_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingbase_assetBalance: InContextSdkMethod<Query['stagingbase_assetBalance'], Querystagingbase_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingbase_assetBalances: InContextSdkMethod<Query['stagingbase_assetBalances'], Querystagingbase_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingbase_router: InContextSdkMethod<Query['stagingbase_router'], Querystagingbase_routerArgs, MeshContext>,
  /** null **/
  stagingbase_routers: InContextSdkMethod<Query['stagingbase_routers'], Querystagingbase_routersArgs, MeshContext>,
  /** null **/
  stagingbase_routerDailyTVL: InContextSdkMethod<Query['stagingbase_routerDailyTVL'], Querystagingbase_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingbase_routerDailyTVLs: InContextSdkMethod<Query['stagingbase_routerDailyTVLs'], Querystagingbase_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingbase_routerLiquidityEvent: InContextSdkMethod<Query['stagingbase_routerLiquidityEvent'], Querystagingbase_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingbase_routerLiquidityEvents: InContextSdkMethod<Query['stagingbase_routerLiquidityEvents'], Querystagingbase_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingbase_setting: InContextSdkMethod<Query['stagingbase_setting'], Querystagingbase_settingArgs, MeshContext>,
  /** null **/
  stagingbase_settings: InContextSdkMethod<Query['stagingbase_settings'], Querystagingbase_settingsArgs, MeshContext>,
  /** null **/
  stagingbase_relayer: InContextSdkMethod<Query['stagingbase_relayer'], Querystagingbase_relayerArgs, MeshContext>,
  /** null **/
  stagingbase_relayers: InContextSdkMethod<Query['stagingbase_relayers'], Querystagingbase_relayersArgs, MeshContext>,
  /** null **/
  stagingbase_sequencer: InContextSdkMethod<Query['stagingbase_sequencer'], Querystagingbase_sequencerArgs, MeshContext>,
  /** null **/
  stagingbase_sequencers: InContextSdkMethod<Query['stagingbase_sequencers'], Querystagingbase_sequencersArgs, MeshContext>,
  /** null **/
  stagingbase_relayerFee: InContextSdkMethod<Query['stagingbase_relayerFee'], Querystagingbase_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingbase_relayerFees: InContextSdkMethod<Query['stagingbase_relayerFees'], Querystagingbase_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingbase_originTransfer: InContextSdkMethod<Query['stagingbase_originTransfer'], Querystagingbase_originTransferArgs, MeshContext>,
  /** null **/
  stagingbase_originTransfers: InContextSdkMethod<Query['stagingbase_originTransfers'], Querystagingbase_originTransfersArgs, MeshContext>,
  /** null **/
  stagingbase_destinationTransfer: InContextSdkMethod<Query['stagingbase_destinationTransfer'], Querystagingbase_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingbase_destinationTransfers: InContextSdkMethod<Query['stagingbase_destinationTransfers'], Querystagingbase_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingbase_originMessage: InContextSdkMethod<Query['stagingbase_originMessage'], Querystagingbase_originMessageArgs, MeshContext>,
  /** null **/
  stagingbase_originMessages: InContextSdkMethod<Query['stagingbase_originMessages'], Querystagingbase_originMessagesArgs, MeshContext>,
  /** null **/
  stagingbase_aggregateRoot: InContextSdkMethod<Query['stagingbase_aggregateRoot'], Querystagingbase_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingbase_aggregateRoots: InContextSdkMethod<Query['stagingbase_aggregateRoots'], Querystagingbase_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingbase_connectorMeta: InContextSdkMethod<Query['stagingbase_connectorMeta'], Querystagingbase_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingbase_connectorMetas: InContextSdkMethod<Query['stagingbase_connectorMetas'], Querystagingbase_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingbase_rootCount: InContextSdkMethod<Query['stagingbase_rootCount'], Querystagingbase_rootCountArgs, MeshContext>,
  /** null **/
  stagingbase_rootCounts: InContextSdkMethod<Query['stagingbase_rootCounts'], Querystagingbase_rootCountsArgs, MeshContext>,
  /** null **/
  stagingbase_rootMessageSent: InContextSdkMethod<Query['stagingbase_rootMessageSent'], Querystagingbase_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingbase_rootMessageSents: InContextSdkMethod<Query['stagingbase_rootMessageSents'], Querystagingbase_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingbase_relayerFeesIncrease: InContextSdkMethod<Query['stagingbase_relayerFeesIncrease'], Querystagingbase_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingbase_relayerFeesIncreases: InContextSdkMethod<Query['stagingbase_relayerFeesIncreases'], Querystagingbase_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingbase_slippageUpdate: InContextSdkMethod<Query['stagingbase_slippageUpdate'], Querystagingbase_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingbase_slippageUpdates: InContextSdkMethod<Query['stagingbase_slippageUpdates'], Querystagingbase_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingbase_snapshotRoot: InContextSdkMethod<Query['stagingbase_snapshotRoot'], Querystagingbase_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingbase_snapshotRoots: InContextSdkMethod<Query['stagingbase_snapshotRoots'], Querystagingbase_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingbase_spokeConnectorMode: InContextSdkMethod<Query['stagingbase_spokeConnectorMode'], Querystagingbase_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingbase_spokeConnectorModes: InContextSdkMethod<Query['stagingbase_spokeConnectorModes'], Querystagingbase_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingbase_aggregateRootProposed: InContextSdkMethod<Query['stagingbase_aggregateRootProposed'], Querystagingbase_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingbase_aggregateRootProposeds: InContextSdkMethod<Query['stagingbase_aggregateRootProposeds'], Querystagingbase_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingbase_optimisticRootFinalized: InContextSdkMethod<Query['stagingbase_optimisticRootFinalized'], Querystagingbase_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingbase_optimisticRootFinalizeds: InContextSdkMethod<Query['stagingbase_optimisticRootFinalizeds'], Querystagingbase_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingbase__meta: InContextSdkMethod<Query['stagingbase__meta'], Querystagingbase__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  stagingbase_asset: InContextSdkMethod<Subscription['stagingbase_asset'], Subscriptionstagingbase_assetArgs, MeshContext>,
  /** null **/
  stagingbase_assets: InContextSdkMethod<Subscription['stagingbase_assets'], Subscriptionstagingbase_assetsArgs, MeshContext>,
  /** null **/
  stagingbase_assetStatus: InContextSdkMethod<Subscription['stagingbase_assetStatus'], Subscriptionstagingbase_assetStatusArgs, MeshContext>,
  /** null **/
  stagingbase_assetStatuses: InContextSdkMethod<Subscription['stagingbase_assetStatuses'], Subscriptionstagingbase_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingbase_assetBalance: InContextSdkMethod<Subscription['stagingbase_assetBalance'], Subscriptionstagingbase_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingbase_assetBalances: InContextSdkMethod<Subscription['stagingbase_assetBalances'], Subscriptionstagingbase_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingbase_router: InContextSdkMethod<Subscription['stagingbase_router'], Subscriptionstagingbase_routerArgs, MeshContext>,
  /** null **/
  stagingbase_routers: InContextSdkMethod<Subscription['stagingbase_routers'], Subscriptionstagingbase_routersArgs, MeshContext>,
  /** null **/
  stagingbase_routerDailyTVL: InContextSdkMethod<Subscription['stagingbase_routerDailyTVL'], Subscriptionstagingbase_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingbase_routerDailyTVLs: InContextSdkMethod<Subscription['stagingbase_routerDailyTVLs'], Subscriptionstagingbase_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingbase_routerLiquidityEvent: InContextSdkMethod<Subscription['stagingbase_routerLiquidityEvent'], Subscriptionstagingbase_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingbase_routerLiquidityEvents: InContextSdkMethod<Subscription['stagingbase_routerLiquidityEvents'], Subscriptionstagingbase_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingbase_setting: InContextSdkMethod<Subscription['stagingbase_setting'], Subscriptionstagingbase_settingArgs, MeshContext>,
  /** null **/
  stagingbase_settings: InContextSdkMethod<Subscription['stagingbase_settings'], Subscriptionstagingbase_settingsArgs, MeshContext>,
  /** null **/
  stagingbase_relayer: InContextSdkMethod<Subscription['stagingbase_relayer'], Subscriptionstagingbase_relayerArgs, MeshContext>,
  /** null **/
  stagingbase_relayers: InContextSdkMethod<Subscription['stagingbase_relayers'], Subscriptionstagingbase_relayersArgs, MeshContext>,
  /** null **/
  stagingbase_sequencer: InContextSdkMethod<Subscription['stagingbase_sequencer'], Subscriptionstagingbase_sequencerArgs, MeshContext>,
  /** null **/
  stagingbase_sequencers: InContextSdkMethod<Subscription['stagingbase_sequencers'], Subscriptionstagingbase_sequencersArgs, MeshContext>,
  /** null **/
  stagingbase_relayerFee: InContextSdkMethod<Subscription['stagingbase_relayerFee'], Subscriptionstagingbase_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingbase_relayerFees: InContextSdkMethod<Subscription['stagingbase_relayerFees'], Subscriptionstagingbase_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingbase_originTransfer: InContextSdkMethod<Subscription['stagingbase_originTransfer'], Subscriptionstagingbase_originTransferArgs, MeshContext>,
  /** null **/
  stagingbase_originTransfers: InContextSdkMethod<Subscription['stagingbase_originTransfers'], Subscriptionstagingbase_originTransfersArgs, MeshContext>,
  /** null **/
  stagingbase_destinationTransfer: InContextSdkMethod<Subscription['stagingbase_destinationTransfer'], Subscriptionstagingbase_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingbase_destinationTransfers: InContextSdkMethod<Subscription['stagingbase_destinationTransfers'], Subscriptionstagingbase_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingbase_originMessage: InContextSdkMethod<Subscription['stagingbase_originMessage'], Subscriptionstagingbase_originMessageArgs, MeshContext>,
  /** null **/
  stagingbase_originMessages: InContextSdkMethod<Subscription['stagingbase_originMessages'], Subscriptionstagingbase_originMessagesArgs, MeshContext>,
  /** null **/
  stagingbase_aggregateRoot: InContextSdkMethod<Subscription['stagingbase_aggregateRoot'], Subscriptionstagingbase_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingbase_aggregateRoots: InContextSdkMethod<Subscription['stagingbase_aggregateRoots'], Subscriptionstagingbase_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingbase_connectorMeta: InContextSdkMethod<Subscription['stagingbase_connectorMeta'], Subscriptionstagingbase_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingbase_connectorMetas: InContextSdkMethod<Subscription['stagingbase_connectorMetas'], Subscriptionstagingbase_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingbase_rootCount: InContextSdkMethod<Subscription['stagingbase_rootCount'], Subscriptionstagingbase_rootCountArgs, MeshContext>,
  /** null **/
  stagingbase_rootCounts: InContextSdkMethod<Subscription['stagingbase_rootCounts'], Subscriptionstagingbase_rootCountsArgs, MeshContext>,
  /** null **/
  stagingbase_rootMessageSent: InContextSdkMethod<Subscription['stagingbase_rootMessageSent'], Subscriptionstagingbase_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingbase_rootMessageSents: InContextSdkMethod<Subscription['stagingbase_rootMessageSents'], Subscriptionstagingbase_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingbase_relayerFeesIncrease: InContextSdkMethod<Subscription['stagingbase_relayerFeesIncrease'], Subscriptionstagingbase_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingbase_relayerFeesIncreases: InContextSdkMethod<Subscription['stagingbase_relayerFeesIncreases'], Subscriptionstagingbase_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingbase_slippageUpdate: InContextSdkMethod<Subscription['stagingbase_slippageUpdate'], Subscriptionstagingbase_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingbase_slippageUpdates: InContextSdkMethod<Subscription['stagingbase_slippageUpdates'], Subscriptionstagingbase_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingbase_snapshotRoot: InContextSdkMethod<Subscription['stagingbase_snapshotRoot'], Subscriptionstagingbase_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingbase_snapshotRoots: InContextSdkMethod<Subscription['stagingbase_snapshotRoots'], Subscriptionstagingbase_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingbase_spokeConnectorMode: InContextSdkMethod<Subscription['stagingbase_spokeConnectorMode'], Subscriptionstagingbase_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingbase_spokeConnectorModes: InContextSdkMethod<Subscription['stagingbase_spokeConnectorModes'], Subscriptionstagingbase_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingbase_aggregateRootProposed: InContextSdkMethod<Subscription['stagingbase_aggregateRootProposed'], Subscriptionstagingbase_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingbase_aggregateRootProposeds: InContextSdkMethod<Subscription['stagingbase_aggregateRootProposeds'], Subscriptionstagingbase_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingbase_optimisticRootFinalized: InContextSdkMethod<Subscription['stagingbase_optimisticRootFinalized'], Subscriptionstagingbase_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingbase_optimisticRootFinalizeds: InContextSdkMethod<Subscription['stagingbase_optimisticRootFinalizeds'], Subscriptionstagingbase_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingbase__meta: InContextSdkMethod<Subscription['stagingbase__meta'], Subscriptionstagingbase__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Staging_Base"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
