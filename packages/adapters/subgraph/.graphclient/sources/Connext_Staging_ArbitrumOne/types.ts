// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextStagingArbitrumOneTypes {
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
  stagingarbitrumone_BigDecimal: any;
  BigInt: any;
  stagingarbitrumone_Bytes: any;
  stagingarbitrumone_Int8: any;
};

export type stagingarbitrumone_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['stagingarbitrumone_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type stagingarbitrumone_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingarbitrumone_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingarbitrumone_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
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
  _change_block?: InputMaybe<stagingarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingarbitrumone_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingarbitrumone_AggregateRootProposed_filter>>>;
};

export type stagingarbitrumone_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type stagingarbitrumone_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingarbitrumone_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingarbitrumone_AggregateRoot_filter>>>;
};

export type stagingarbitrumone_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type stagingarbitrumone_Aggregation_interval =
  | 'hour'
  | 'day';

export type stagingarbitrumone_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  localAsset?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingarbitrumone_AssetStatus>;
};

export type stagingarbitrumone_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: stagingarbitrumone_Router;
  asset: stagingarbitrumone_Asset;
  feesEarned: Scalars['BigInt'];
};

export type stagingarbitrumone_AssetBalance_filter = {
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
  router_?: InputMaybe<stagingarbitrumone_Router_filter>;
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
  asset_?: InputMaybe<stagingarbitrumone_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingarbitrumone_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingarbitrumone_AssetBalance_filter>>>;
};

export type stagingarbitrumone_AssetBalance_orderBy =
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

export type stagingarbitrumone_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type stagingarbitrumone_AssetStatus_filter = {
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
  _change_block?: InputMaybe<stagingarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingarbitrumone_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingarbitrumone_AssetStatus_filter>>>;
};

export type stagingarbitrumone_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type stagingarbitrumone_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  key_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  key_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  key_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  key_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  key_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  key_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  localAsset?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
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
  status_?: InputMaybe<stagingarbitrumone_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingarbitrumone_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingarbitrumone_Asset_filter>>>;
};

export type stagingarbitrumone_Asset_orderBy =
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

export type stagingarbitrumone_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingarbitrumone_Block_height = {
  hash?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type stagingarbitrumone_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  rootManager?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  mirrorConnector?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
};

export type stagingarbitrumone_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingarbitrumone_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingarbitrumone_ConnectorMeta_filter>>>;
};

export type stagingarbitrumone_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingarbitrumone_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingarbitrumone_TransferStatus>;
  routers?: Maybe<Array<stagingarbitrumone_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  delegate?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  asset?: Maybe<stagingarbitrumone_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingarbitrumone_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_Router_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_Router_filter>;
};

export type stagingarbitrumone_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingarbitrumone_TransferStatus>;
  status_not?: InputMaybe<stagingarbitrumone_TransferStatus>;
  status_in?: InputMaybe<Array<stagingarbitrumone_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingarbitrumone_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<stagingarbitrumone_Router_filter>;
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
  to?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
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
  originSender?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
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
  asset_?: InputMaybe<stagingarbitrumone_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingarbitrumone_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingarbitrumone_DestinationTransfer_filter>>>;
};

export type stagingarbitrumone_DestinationTransfer_orderBy =
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

export type stagingarbitrumone_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingarbitrumone_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingarbitrumone_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
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
  _change_block?: InputMaybe<stagingarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingarbitrumone_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingarbitrumone_OptimisticRootFinalized_filter>>>;
};

export type stagingarbitrumone_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type stagingarbitrumone_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingarbitrumone_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  root?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<stagingarbitrumone_RootCount>;
};

export type stagingarbitrumone_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  leaf_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  message_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  message_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  message_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  message_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  message_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  message_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
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
  rootCount_?: InputMaybe<stagingarbitrumone_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingarbitrumone_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingarbitrumone_OriginMessage_filter>>>;
};

export type stagingarbitrumone_OriginMessage_orderBy =
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

export type stagingarbitrumone_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingarbitrumone_TransferStatus>;
  messageHash?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  delegate?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  asset?: Maybe<stagingarbitrumone_Asset>;
  transactingAsset?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  message?: Maybe<stagingarbitrumone_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<stagingarbitrumone_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  caller?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingarbitrumone_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_RelayerFee_filter>;
};

export type stagingarbitrumone_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingarbitrumone_TransferStatus>;
  status_not?: InputMaybe<stagingarbitrumone_TransferStatus>;
  status_in?: InputMaybe<Array<stagingarbitrumone_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingarbitrumone_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
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
  to?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
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
  asset_?: InputMaybe<stagingarbitrumone_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
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
  message_?: InputMaybe<stagingarbitrumone_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<stagingarbitrumone_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingarbitrumone_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingarbitrumone_OriginTransfer_filter>>>;
};

export type stagingarbitrumone_OriginTransfer_orderBy =
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
  stagingarbitrumone_asset?: Maybe<stagingarbitrumone_Asset>;
  stagingarbitrumone_assets: Array<stagingarbitrumone_Asset>;
  stagingarbitrumone_assetStatus?: Maybe<stagingarbitrumone_AssetStatus>;
  stagingarbitrumone_assetStatuses: Array<stagingarbitrumone_AssetStatus>;
  stagingarbitrumone_assetBalance?: Maybe<stagingarbitrumone_AssetBalance>;
  stagingarbitrumone_assetBalances: Array<stagingarbitrumone_AssetBalance>;
  stagingarbitrumone_router?: Maybe<stagingarbitrumone_Router>;
  stagingarbitrumone_routers: Array<stagingarbitrumone_Router>;
  stagingarbitrumone_routerDailyTVL?: Maybe<stagingarbitrumone_RouterDailyTVL>;
  stagingarbitrumone_routerDailyTVLs: Array<stagingarbitrumone_RouterDailyTVL>;
  stagingarbitrumone_routerLiquidityEvent?: Maybe<stagingarbitrumone_RouterLiquidityEvent>;
  stagingarbitrumone_routerLiquidityEvents: Array<stagingarbitrumone_RouterLiquidityEvent>;
  stagingarbitrumone_setting?: Maybe<stagingarbitrumone_Setting>;
  stagingarbitrumone_settings: Array<stagingarbitrumone_Setting>;
  stagingarbitrumone_relayer?: Maybe<stagingarbitrumone_Relayer>;
  stagingarbitrumone_relayers: Array<stagingarbitrumone_Relayer>;
  stagingarbitrumone_sequencer?: Maybe<stagingarbitrumone_Sequencer>;
  stagingarbitrumone_sequencers: Array<stagingarbitrumone_Sequencer>;
  stagingarbitrumone_relayerFee?: Maybe<stagingarbitrumone_RelayerFee>;
  stagingarbitrumone_relayerFees: Array<stagingarbitrumone_RelayerFee>;
  stagingarbitrumone_originTransfer?: Maybe<stagingarbitrumone_OriginTransfer>;
  stagingarbitrumone_originTransfers: Array<stagingarbitrumone_OriginTransfer>;
  stagingarbitrumone_destinationTransfer?: Maybe<stagingarbitrumone_DestinationTransfer>;
  stagingarbitrumone_destinationTransfers: Array<stagingarbitrumone_DestinationTransfer>;
  stagingarbitrumone_originMessage?: Maybe<stagingarbitrumone_OriginMessage>;
  stagingarbitrumone_originMessages: Array<stagingarbitrumone_OriginMessage>;
  stagingarbitrumone_aggregateRoot?: Maybe<stagingarbitrumone_AggregateRoot>;
  stagingarbitrumone_aggregateRoots: Array<stagingarbitrumone_AggregateRoot>;
  stagingarbitrumone_connectorMeta?: Maybe<stagingarbitrumone_ConnectorMeta>;
  stagingarbitrumone_connectorMetas: Array<stagingarbitrumone_ConnectorMeta>;
  stagingarbitrumone_rootCount?: Maybe<stagingarbitrumone_RootCount>;
  stagingarbitrumone_rootCounts: Array<stagingarbitrumone_RootCount>;
  stagingarbitrumone_rootMessageSent?: Maybe<stagingarbitrumone_RootMessageSent>;
  stagingarbitrumone_rootMessageSents: Array<stagingarbitrumone_RootMessageSent>;
  stagingarbitrumone_relayerFeesIncrease?: Maybe<stagingarbitrumone_RelayerFeesIncrease>;
  stagingarbitrumone_relayerFeesIncreases: Array<stagingarbitrumone_RelayerFeesIncrease>;
  stagingarbitrumone_slippageUpdate?: Maybe<stagingarbitrumone_SlippageUpdate>;
  stagingarbitrumone_slippageUpdates: Array<stagingarbitrumone_SlippageUpdate>;
  stagingarbitrumone_snapshotRoot?: Maybe<stagingarbitrumone_SnapshotRoot>;
  stagingarbitrumone_snapshotRoots: Array<stagingarbitrumone_SnapshotRoot>;
  stagingarbitrumone_spokeConnectorMode?: Maybe<stagingarbitrumone_SpokeConnectorMode>;
  stagingarbitrumone_spokeConnectorModes: Array<stagingarbitrumone_SpokeConnectorMode>;
  stagingarbitrumone_aggregateRootProposed?: Maybe<stagingarbitrumone_AggregateRootProposed>;
  stagingarbitrumone_aggregateRootProposeds: Array<stagingarbitrumone_AggregateRootProposed>;
  stagingarbitrumone_optimisticRootFinalized?: Maybe<stagingarbitrumone_OptimisticRootFinalized>;
  stagingarbitrumone_optimisticRootFinalizeds: Array<stagingarbitrumone_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingarbitrumone__meta?: Maybe<stagingarbitrumone__Meta_>;
};


export type Querystagingarbitrumone_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_Asset_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_AssetStatus_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_AssetBalance_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_Router_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_Router_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_Setting_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_Relayer_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_Sequencer_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_RelayerFee_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_OriginTransfer_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_DestinationTransfer_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_OriginMessage_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_AggregateRoot_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_ConnectorMeta_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_RootCount_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_RootMessageSent_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_SlippageUpdate_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_SnapshotRoot_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumone__metaArgs = {
  block?: InputMaybe<stagingarbitrumone_Block_height>;
};

export type stagingarbitrumone_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
};

export type stagingarbitrumone_RelayerFee = {
  id: Scalars['ID'];
  transfer: stagingarbitrumone_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['stagingarbitrumone_Bytes'];
};

export type stagingarbitrumone_RelayerFee_filter = {
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
  transfer_?: InputMaybe<stagingarbitrumone_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingarbitrumone_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingarbitrumone_RelayerFee_filter>>>;
};

export type stagingarbitrumone_RelayerFee_orderBy =
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

export type stagingarbitrumone_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: stagingarbitrumone_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  caller: Scalars['stagingarbitrumone_Bytes'];
  transactionHash: Scalars['stagingarbitrumone_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingarbitrumone_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<stagingarbitrumone_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
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
  _change_block?: InputMaybe<stagingarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingarbitrumone_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingarbitrumone_RelayerFeesIncrease_filter>>>;
};

export type stagingarbitrumone_RelayerFeesIncrease_orderBy =
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

export type stagingarbitrumone_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  relayer_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingarbitrumone_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingarbitrumone_Relayer_filter>>>;
};

export type stagingarbitrumone_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type stagingarbitrumone_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type stagingarbitrumone_RootCount_filter = {
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
  _change_block?: InputMaybe<stagingarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingarbitrumone_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingarbitrumone_RootCount_filter>>>;
};

export type stagingarbitrumone_RootCount_orderBy =
  | 'id'
  | 'count';

export type stagingarbitrumone_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingarbitrumone_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
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
  _change_block?: InputMaybe<stagingarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingarbitrumone_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingarbitrumone_RootMessageSent_filter>>>;
};

export type stagingarbitrumone_RootMessageSent_orderBy =
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

export type stagingarbitrumone_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  recipient?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  proposedOwner?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<stagingarbitrumone_AssetBalance>;
};


export type stagingarbitrumone_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_AssetBalance_filter>;
};

export type stagingarbitrumone_RouterDailyTVL = {
  id: Scalars['ID'];
  router: stagingarbitrumone_Router;
  asset: stagingarbitrumone_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type stagingarbitrumone_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<stagingarbitrumone_Router_filter>;
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
  asset_?: InputMaybe<stagingarbitrumone_Asset_filter>;
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
  _change_block?: InputMaybe<stagingarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingarbitrumone_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingarbitrumone_RouterDailyTVL_filter>>>;
};

export type stagingarbitrumone_RouterDailyTVL_orderBy =
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

export type stagingarbitrumone_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<stagingarbitrumone_RouterLiquidityEventType>;
  router: stagingarbitrumone_Router;
  asset: stagingarbitrumone_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['stagingarbitrumone_Bytes'];
  nonce: Scalars['BigInt'];
};

export type stagingarbitrumone_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type stagingarbitrumone_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<stagingarbitrumone_RouterLiquidityEventType>;
  type_not?: InputMaybe<stagingarbitrumone_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<stagingarbitrumone_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<stagingarbitrumone_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<stagingarbitrumone_Router_filter>;
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
  asset_?: InputMaybe<stagingarbitrumone_Asset_filter>;
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
  caller?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingarbitrumone_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingarbitrumone_RouterLiquidityEvent_filter>>>;
};

export type stagingarbitrumone_RouterLiquidityEvent_orderBy =
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

export type stagingarbitrumone_Router_filter = {
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
  owner?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  owner_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  owner_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  owner_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  owner_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  owner_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  recipient?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  recipient_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<stagingarbitrumone_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingarbitrumone_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingarbitrumone_Router_filter>>>;
};

export type stagingarbitrumone_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type stagingarbitrumone_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
};

export type stagingarbitrumone_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingarbitrumone_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingarbitrumone_Sequencer_filter>>>;
};

export type stagingarbitrumone_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type stagingarbitrumone_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['stagingarbitrumone_Bytes'];
};

export type stagingarbitrumone_Setting_filter = {
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
  caller?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingarbitrumone_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingarbitrumone_Setting_filter>>>;
};

export type stagingarbitrumone_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type stagingarbitrumone_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: stagingarbitrumone_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['stagingarbitrumone_Bytes'];
  transactionHash: Scalars['stagingarbitrumone_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingarbitrumone_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<stagingarbitrumone_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
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
  _change_block?: InputMaybe<stagingarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingarbitrumone_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingarbitrumone_SlippageUpdate_filter>>>;
};

export type stagingarbitrumone_SlippageUpdate_orderBy =
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

export type stagingarbitrumone_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['stagingarbitrumone_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingarbitrumone_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingarbitrumone_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingarbitrumone_Bytes']>;
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
  _change_block?: InputMaybe<stagingarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingarbitrumone_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingarbitrumone_SnapshotRoot_filter>>>;
};

export type stagingarbitrumone_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type stagingarbitrumone_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type stagingarbitrumone_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<stagingarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingarbitrumone_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingarbitrumone_SpokeConnectorMode_filter>>>;
};

export type stagingarbitrumone_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  stagingarbitrumone_asset?: Maybe<stagingarbitrumone_Asset>;
  stagingarbitrumone_assets: Array<stagingarbitrumone_Asset>;
  stagingarbitrumone_assetStatus?: Maybe<stagingarbitrumone_AssetStatus>;
  stagingarbitrumone_assetStatuses: Array<stagingarbitrumone_AssetStatus>;
  stagingarbitrumone_assetBalance?: Maybe<stagingarbitrumone_AssetBalance>;
  stagingarbitrumone_assetBalances: Array<stagingarbitrumone_AssetBalance>;
  stagingarbitrumone_router?: Maybe<stagingarbitrumone_Router>;
  stagingarbitrumone_routers: Array<stagingarbitrumone_Router>;
  stagingarbitrumone_routerDailyTVL?: Maybe<stagingarbitrumone_RouterDailyTVL>;
  stagingarbitrumone_routerDailyTVLs: Array<stagingarbitrumone_RouterDailyTVL>;
  stagingarbitrumone_routerLiquidityEvent?: Maybe<stagingarbitrumone_RouterLiquidityEvent>;
  stagingarbitrumone_routerLiquidityEvents: Array<stagingarbitrumone_RouterLiquidityEvent>;
  stagingarbitrumone_setting?: Maybe<stagingarbitrumone_Setting>;
  stagingarbitrumone_settings: Array<stagingarbitrumone_Setting>;
  stagingarbitrumone_relayer?: Maybe<stagingarbitrumone_Relayer>;
  stagingarbitrumone_relayers: Array<stagingarbitrumone_Relayer>;
  stagingarbitrumone_sequencer?: Maybe<stagingarbitrumone_Sequencer>;
  stagingarbitrumone_sequencers: Array<stagingarbitrumone_Sequencer>;
  stagingarbitrumone_relayerFee?: Maybe<stagingarbitrumone_RelayerFee>;
  stagingarbitrumone_relayerFees: Array<stagingarbitrumone_RelayerFee>;
  stagingarbitrumone_originTransfer?: Maybe<stagingarbitrumone_OriginTransfer>;
  stagingarbitrumone_originTransfers: Array<stagingarbitrumone_OriginTransfer>;
  stagingarbitrumone_destinationTransfer?: Maybe<stagingarbitrumone_DestinationTransfer>;
  stagingarbitrumone_destinationTransfers: Array<stagingarbitrumone_DestinationTransfer>;
  stagingarbitrumone_originMessage?: Maybe<stagingarbitrumone_OriginMessage>;
  stagingarbitrumone_originMessages: Array<stagingarbitrumone_OriginMessage>;
  stagingarbitrumone_aggregateRoot?: Maybe<stagingarbitrumone_AggregateRoot>;
  stagingarbitrumone_aggregateRoots: Array<stagingarbitrumone_AggregateRoot>;
  stagingarbitrumone_connectorMeta?: Maybe<stagingarbitrumone_ConnectorMeta>;
  stagingarbitrumone_connectorMetas: Array<stagingarbitrumone_ConnectorMeta>;
  stagingarbitrumone_rootCount?: Maybe<stagingarbitrumone_RootCount>;
  stagingarbitrumone_rootCounts: Array<stagingarbitrumone_RootCount>;
  stagingarbitrumone_rootMessageSent?: Maybe<stagingarbitrumone_RootMessageSent>;
  stagingarbitrumone_rootMessageSents: Array<stagingarbitrumone_RootMessageSent>;
  stagingarbitrumone_relayerFeesIncrease?: Maybe<stagingarbitrumone_RelayerFeesIncrease>;
  stagingarbitrumone_relayerFeesIncreases: Array<stagingarbitrumone_RelayerFeesIncrease>;
  stagingarbitrumone_slippageUpdate?: Maybe<stagingarbitrumone_SlippageUpdate>;
  stagingarbitrumone_slippageUpdates: Array<stagingarbitrumone_SlippageUpdate>;
  stagingarbitrumone_snapshotRoot?: Maybe<stagingarbitrumone_SnapshotRoot>;
  stagingarbitrumone_snapshotRoots: Array<stagingarbitrumone_SnapshotRoot>;
  stagingarbitrumone_spokeConnectorMode?: Maybe<stagingarbitrumone_SpokeConnectorMode>;
  stagingarbitrumone_spokeConnectorModes: Array<stagingarbitrumone_SpokeConnectorMode>;
  stagingarbitrumone_aggregateRootProposed?: Maybe<stagingarbitrumone_AggregateRootProposed>;
  stagingarbitrumone_aggregateRootProposeds: Array<stagingarbitrumone_AggregateRootProposed>;
  stagingarbitrumone_optimisticRootFinalized?: Maybe<stagingarbitrumone_OptimisticRootFinalized>;
  stagingarbitrumone_optimisticRootFinalizeds: Array<stagingarbitrumone_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingarbitrumone__meta?: Maybe<stagingarbitrumone__Meta_>;
};


export type Subscriptionstagingarbitrumone_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_Asset_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_AssetStatus_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_AssetBalance_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_Router_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_Router_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_Setting_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_Relayer_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_Sequencer_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_RelayerFee_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_OriginTransfer_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_DestinationTransfer_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_OriginMessage_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_AggregateRoot_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_ConnectorMeta_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_RootCount_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_RootMessageSent_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_SlippageUpdate_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_SnapshotRoot_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumone_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumone_OrderDirection>;
  where?: InputMaybe<stagingarbitrumone_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumone__metaArgs = {
  block?: InputMaybe<stagingarbitrumone_Block_height>;
};

export type stagingarbitrumone_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type stagingarbitrumone__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingarbitrumone_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type stagingarbitrumone__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingarbitrumone__Block_;
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
  stagingarbitrumone_asset: InContextSdkMethod<Query['stagingarbitrumone_asset'], Querystagingarbitrumone_assetArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_assets: InContextSdkMethod<Query['stagingarbitrumone_assets'], Querystagingarbitrumone_assetsArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_assetStatus: InContextSdkMethod<Query['stagingarbitrumone_assetStatus'], Querystagingarbitrumone_assetStatusArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_assetStatuses: InContextSdkMethod<Query['stagingarbitrumone_assetStatuses'], Querystagingarbitrumone_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_assetBalance: InContextSdkMethod<Query['stagingarbitrumone_assetBalance'], Querystagingarbitrumone_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_assetBalances: InContextSdkMethod<Query['stagingarbitrumone_assetBalances'], Querystagingarbitrumone_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_router: InContextSdkMethod<Query['stagingarbitrumone_router'], Querystagingarbitrumone_routerArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_routers: InContextSdkMethod<Query['stagingarbitrumone_routers'], Querystagingarbitrumone_routersArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_routerDailyTVL: InContextSdkMethod<Query['stagingarbitrumone_routerDailyTVL'], Querystagingarbitrumone_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_routerDailyTVLs: InContextSdkMethod<Query['stagingarbitrumone_routerDailyTVLs'], Querystagingarbitrumone_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_routerLiquidityEvent: InContextSdkMethod<Query['stagingarbitrumone_routerLiquidityEvent'], Querystagingarbitrumone_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_routerLiquidityEvents: InContextSdkMethod<Query['stagingarbitrumone_routerLiquidityEvents'], Querystagingarbitrumone_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_setting: InContextSdkMethod<Query['stagingarbitrumone_setting'], Querystagingarbitrumone_settingArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_settings: InContextSdkMethod<Query['stagingarbitrumone_settings'], Querystagingarbitrumone_settingsArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_relayer: InContextSdkMethod<Query['stagingarbitrumone_relayer'], Querystagingarbitrumone_relayerArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_relayers: InContextSdkMethod<Query['stagingarbitrumone_relayers'], Querystagingarbitrumone_relayersArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_sequencer: InContextSdkMethod<Query['stagingarbitrumone_sequencer'], Querystagingarbitrumone_sequencerArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_sequencers: InContextSdkMethod<Query['stagingarbitrumone_sequencers'], Querystagingarbitrumone_sequencersArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_relayerFee: InContextSdkMethod<Query['stagingarbitrumone_relayerFee'], Querystagingarbitrumone_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_relayerFees: InContextSdkMethod<Query['stagingarbitrumone_relayerFees'], Querystagingarbitrumone_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_originTransfer: InContextSdkMethod<Query['stagingarbitrumone_originTransfer'], Querystagingarbitrumone_originTransferArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_originTransfers: InContextSdkMethod<Query['stagingarbitrumone_originTransfers'], Querystagingarbitrumone_originTransfersArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_destinationTransfer: InContextSdkMethod<Query['stagingarbitrumone_destinationTransfer'], Querystagingarbitrumone_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_destinationTransfers: InContextSdkMethod<Query['stagingarbitrumone_destinationTransfers'], Querystagingarbitrumone_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_originMessage: InContextSdkMethod<Query['stagingarbitrumone_originMessage'], Querystagingarbitrumone_originMessageArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_originMessages: InContextSdkMethod<Query['stagingarbitrumone_originMessages'], Querystagingarbitrumone_originMessagesArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_aggregateRoot: InContextSdkMethod<Query['stagingarbitrumone_aggregateRoot'], Querystagingarbitrumone_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_aggregateRoots: InContextSdkMethod<Query['stagingarbitrumone_aggregateRoots'], Querystagingarbitrumone_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_connectorMeta: InContextSdkMethod<Query['stagingarbitrumone_connectorMeta'], Querystagingarbitrumone_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_connectorMetas: InContextSdkMethod<Query['stagingarbitrumone_connectorMetas'], Querystagingarbitrumone_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_rootCount: InContextSdkMethod<Query['stagingarbitrumone_rootCount'], Querystagingarbitrumone_rootCountArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_rootCounts: InContextSdkMethod<Query['stagingarbitrumone_rootCounts'], Querystagingarbitrumone_rootCountsArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_rootMessageSent: InContextSdkMethod<Query['stagingarbitrumone_rootMessageSent'], Querystagingarbitrumone_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_rootMessageSents: InContextSdkMethod<Query['stagingarbitrumone_rootMessageSents'], Querystagingarbitrumone_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_relayerFeesIncrease: InContextSdkMethod<Query['stagingarbitrumone_relayerFeesIncrease'], Querystagingarbitrumone_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_relayerFeesIncreases: InContextSdkMethod<Query['stagingarbitrumone_relayerFeesIncreases'], Querystagingarbitrumone_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_slippageUpdate: InContextSdkMethod<Query['stagingarbitrumone_slippageUpdate'], Querystagingarbitrumone_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_slippageUpdates: InContextSdkMethod<Query['stagingarbitrumone_slippageUpdates'], Querystagingarbitrumone_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_snapshotRoot: InContextSdkMethod<Query['stagingarbitrumone_snapshotRoot'], Querystagingarbitrumone_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_snapshotRoots: InContextSdkMethod<Query['stagingarbitrumone_snapshotRoots'], Querystagingarbitrumone_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_spokeConnectorMode: InContextSdkMethod<Query['stagingarbitrumone_spokeConnectorMode'], Querystagingarbitrumone_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_spokeConnectorModes: InContextSdkMethod<Query['stagingarbitrumone_spokeConnectorModes'], Querystagingarbitrumone_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_aggregateRootProposed: InContextSdkMethod<Query['stagingarbitrumone_aggregateRootProposed'], Querystagingarbitrumone_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_aggregateRootProposeds: InContextSdkMethod<Query['stagingarbitrumone_aggregateRootProposeds'], Querystagingarbitrumone_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_optimisticRootFinalized: InContextSdkMethod<Query['stagingarbitrumone_optimisticRootFinalized'], Querystagingarbitrumone_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_optimisticRootFinalizeds: InContextSdkMethod<Query['stagingarbitrumone_optimisticRootFinalizeds'], Querystagingarbitrumone_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingarbitrumone__meta: InContextSdkMethod<Query['stagingarbitrumone__meta'], Querystagingarbitrumone__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  stagingarbitrumone_asset: InContextSdkMethod<Subscription['stagingarbitrumone_asset'], Subscriptionstagingarbitrumone_assetArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_assets: InContextSdkMethod<Subscription['stagingarbitrumone_assets'], Subscriptionstagingarbitrumone_assetsArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_assetStatus: InContextSdkMethod<Subscription['stagingarbitrumone_assetStatus'], Subscriptionstagingarbitrumone_assetStatusArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_assetStatuses: InContextSdkMethod<Subscription['stagingarbitrumone_assetStatuses'], Subscriptionstagingarbitrumone_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_assetBalance: InContextSdkMethod<Subscription['stagingarbitrumone_assetBalance'], Subscriptionstagingarbitrumone_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_assetBalances: InContextSdkMethod<Subscription['stagingarbitrumone_assetBalances'], Subscriptionstagingarbitrumone_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_router: InContextSdkMethod<Subscription['stagingarbitrumone_router'], Subscriptionstagingarbitrumone_routerArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_routers: InContextSdkMethod<Subscription['stagingarbitrumone_routers'], Subscriptionstagingarbitrumone_routersArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_routerDailyTVL: InContextSdkMethod<Subscription['stagingarbitrumone_routerDailyTVL'], Subscriptionstagingarbitrumone_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_routerDailyTVLs: InContextSdkMethod<Subscription['stagingarbitrumone_routerDailyTVLs'], Subscriptionstagingarbitrumone_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_routerLiquidityEvent: InContextSdkMethod<Subscription['stagingarbitrumone_routerLiquidityEvent'], Subscriptionstagingarbitrumone_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_routerLiquidityEvents: InContextSdkMethod<Subscription['stagingarbitrumone_routerLiquidityEvents'], Subscriptionstagingarbitrumone_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_setting: InContextSdkMethod<Subscription['stagingarbitrumone_setting'], Subscriptionstagingarbitrumone_settingArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_settings: InContextSdkMethod<Subscription['stagingarbitrumone_settings'], Subscriptionstagingarbitrumone_settingsArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_relayer: InContextSdkMethod<Subscription['stagingarbitrumone_relayer'], Subscriptionstagingarbitrumone_relayerArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_relayers: InContextSdkMethod<Subscription['stagingarbitrumone_relayers'], Subscriptionstagingarbitrumone_relayersArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_sequencer: InContextSdkMethod<Subscription['stagingarbitrumone_sequencer'], Subscriptionstagingarbitrumone_sequencerArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_sequencers: InContextSdkMethod<Subscription['stagingarbitrumone_sequencers'], Subscriptionstagingarbitrumone_sequencersArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_relayerFee: InContextSdkMethod<Subscription['stagingarbitrumone_relayerFee'], Subscriptionstagingarbitrumone_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_relayerFees: InContextSdkMethod<Subscription['stagingarbitrumone_relayerFees'], Subscriptionstagingarbitrumone_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_originTransfer: InContextSdkMethod<Subscription['stagingarbitrumone_originTransfer'], Subscriptionstagingarbitrumone_originTransferArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_originTransfers: InContextSdkMethod<Subscription['stagingarbitrumone_originTransfers'], Subscriptionstagingarbitrumone_originTransfersArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_destinationTransfer: InContextSdkMethod<Subscription['stagingarbitrumone_destinationTransfer'], Subscriptionstagingarbitrumone_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_destinationTransfers: InContextSdkMethod<Subscription['stagingarbitrumone_destinationTransfers'], Subscriptionstagingarbitrumone_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_originMessage: InContextSdkMethod<Subscription['stagingarbitrumone_originMessage'], Subscriptionstagingarbitrumone_originMessageArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_originMessages: InContextSdkMethod<Subscription['stagingarbitrumone_originMessages'], Subscriptionstagingarbitrumone_originMessagesArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_aggregateRoot: InContextSdkMethod<Subscription['stagingarbitrumone_aggregateRoot'], Subscriptionstagingarbitrumone_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_aggregateRoots: InContextSdkMethod<Subscription['stagingarbitrumone_aggregateRoots'], Subscriptionstagingarbitrumone_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_connectorMeta: InContextSdkMethod<Subscription['stagingarbitrumone_connectorMeta'], Subscriptionstagingarbitrumone_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_connectorMetas: InContextSdkMethod<Subscription['stagingarbitrumone_connectorMetas'], Subscriptionstagingarbitrumone_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_rootCount: InContextSdkMethod<Subscription['stagingarbitrumone_rootCount'], Subscriptionstagingarbitrumone_rootCountArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_rootCounts: InContextSdkMethod<Subscription['stagingarbitrumone_rootCounts'], Subscriptionstagingarbitrumone_rootCountsArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_rootMessageSent: InContextSdkMethod<Subscription['stagingarbitrumone_rootMessageSent'], Subscriptionstagingarbitrumone_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_rootMessageSents: InContextSdkMethod<Subscription['stagingarbitrumone_rootMessageSents'], Subscriptionstagingarbitrumone_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_relayerFeesIncrease: InContextSdkMethod<Subscription['stagingarbitrumone_relayerFeesIncrease'], Subscriptionstagingarbitrumone_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_relayerFeesIncreases: InContextSdkMethod<Subscription['stagingarbitrumone_relayerFeesIncreases'], Subscriptionstagingarbitrumone_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_slippageUpdate: InContextSdkMethod<Subscription['stagingarbitrumone_slippageUpdate'], Subscriptionstagingarbitrumone_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_slippageUpdates: InContextSdkMethod<Subscription['stagingarbitrumone_slippageUpdates'], Subscriptionstagingarbitrumone_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_snapshotRoot: InContextSdkMethod<Subscription['stagingarbitrumone_snapshotRoot'], Subscriptionstagingarbitrumone_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_snapshotRoots: InContextSdkMethod<Subscription['stagingarbitrumone_snapshotRoots'], Subscriptionstagingarbitrumone_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_spokeConnectorMode: InContextSdkMethod<Subscription['stagingarbitrumone_spokeConnectorMode'], Subscriptionstagingarbitrumone_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_spokeConnectorModes: InContextSdkMethod<Subscription['stagingarbitrumone_spokeConnectorModes'], Subscriptionstagingarbitrumone_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_aggregateRootProposed: InContextSdkMethod<Subscription['stagingarbitrumone_aggregateRootProposed'], Subscriptionstagingarbitrumone_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_aggregateRootProposeds: InContextSdkMethod<Subscription['stagingarbitrumone_aggregateRootProposeds'], Subscriptionstagingarbitrumone_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_optimisticRootFinalized: InContextSdkMethod<Subscription['stagingarbitrumone_optimisticRootFinalized'], Subscriptionstagingarbitrumone_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingarbitrumone_optimisticRootFinalizeds: InContextSdkMethod<Subscription['stagingarbitrumone_optimisticRootFinalizeds'], Subscriptionstagingarbitrumone_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingarbitrumone__meta: InContextSdkMethod<Subscription['stagingarbitrumone__meta'], Subscriptionstagingarbitrumone__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Staging_ArbitrumOne"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
