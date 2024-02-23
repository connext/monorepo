// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextStagingPolygonTypes {
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
  stagingpolygon_BigDecimal: any;
  BigInt: any;
  stagingpolygon_Bytes: any;
  stagingpolygon_Int8: any;
};

export type stagingpolygon_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['stagingpolygon_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type stagingpolygon_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingpolygon_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingpolygon_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
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
  _change_block?: InputMaybe<stagingpolygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_AggregateRootProposed_filter>>>;
};

export type stagingpolygon_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type stagingpolygon_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_AggregateRoot_filter>>>;
};

export type stagingpolygon_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type stagingpolygon_Aggregation_interval =
  | 'hour'
  | 'day';

export type stagingpolygon_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['stagingpolygon_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingpolygon_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['stagingpolygon_Bytes']>;
  localAsset?: Maybe<Scalars['stagingpolygon_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingpolygon_AssetStatus>;
};

export type stagingpolygon_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: stagingpolygon_Router;
  asset: stagingpolygon_Asset;
  feesEarned: Scalars['BigInt'];
};

export type stagingpolygon_AssetBalance_filter = {
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
  router_?: InputMaybe<stagingpolygon_Router_filter>;
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
  asset_?: InputMaybe<stagingpolygon_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_AssetBalance_filter>>>;
};

export type stagingpolygon_AssetBalance_orderBy =
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

export type stagingpolygon_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type stagingpolygon_AssetStatus_filter = {
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
  _change_block?: InputMaybe<stagingpolygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_AssetStatus_filter>>>;
};

export type stagingpolygon_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type stagingpolygon_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  key_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  key_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  key_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  key_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  key_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  key_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  localAsset?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
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
  status_?: InputMaybe<stagingpolygon_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_Asset_filter>>>;
};

export type stagingpolygon_Asset_orderBy =
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

export type stagingpolygon_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingpolygon_Block_height = {
  hash?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type stagingpolygon_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['stagingpolygon_Bytes']>;
  rootManager?: Maybe<Scalars['stagingpolygon_Bytes']>;
  mirrorConnector?: Maybe<Scalars['stagingpolygon_Bytes']>;
};

export type stagingpolygon_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_ConnectorMeta_filter>>>;
};

export type stagingpolygon_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingpolygon_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingpolygon_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingpolygon_TransferStatus>;
  routers?: Maybe<Array<stagingpolygon_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingpolygon_Bytes']>;
  delegate?: Maybe<Scalars['stagingpolygon_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingpolygon_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingpolygon_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingpolygon_Bytes']>;
  asset?: Maybe<stagingpolygon_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['stagingpolygon_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['stagingpolygon_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['stagingpolygon_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['stagingpolygon_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['stagingpolygon_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['stagingpolygon_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingpolygon_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_Router_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_Router_filter>;
};

export type stagingpolygon_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingpolygon_TransferStatus>;
  status_not?: InputMaybe<stagingpolygon_TransferStatus>;
  status_in?: InputMaybe<Array<stagingpolygon_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingpolygon_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<stagingpolygon_Router_filter>;
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
  to?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
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
  originSender?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
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
  asset_?: InputMaybe<stagingpolygon_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_DestinationTransfer_filter>>>;
};

export type stagingpolygon_DestinationTransfer_orderBy =
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

export type stagingpolygon_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingpolygon_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingpolygon_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
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
  _change_block?: InputMaybe<stagingpolygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_OptimisticRootFinalized_filter>>>;
};

export type stagingpolygon_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type stagingpolygon_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingpolygon_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['stagingpolygon_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['stagingpolygon_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['stagingpolygon_Bytes']>;
  root?: Maybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingpolygon_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<stagingpolygon_RootCount>;
};

export type stagingpolygon_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  leaf_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  message_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  message_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  message_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  message_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  message_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  message_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
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
  rootCount_?: InputMaybe<stagingpolygon_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_OriginMessage_filter>>>;
};

export type stagingpolygon_OriginMessage_orderBy =
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

export type stagingpolygon_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingpolygon_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingpolygon_TransferStatus>;
  messageHash?: Maybe<Scalars['stagingpolygon_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingpolygon_Bytes']>;
  delegate?: Maybe<Scalars['stagingpolygon_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingpolygon_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingpolygon_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingpolygon_Bytes']>;
  asset?: Maybe<stagingpolygon_Asset>;
  transactingAsset?: Maybe<Scalars['stagingpolygon_Bytes']>;
  message?: Maybe<stagingpolygon_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<stagingpolygon_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['stagingpolygon_Bytes']>;
  caller?: Maybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingpolygon_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['stagingpolygon_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingpolygon_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_RelayerFee_filter>;
};

export type stagingpolygon_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingpolygon_TransferStatus>;
  status_not?: InputMaybe<stagingpolygon_TransferStatus>;
  status_in?: InputMaybe<Array<stagingpolygon_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingpolygon_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
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
  to?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
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
  asset_?: InputMaybe<stagingpolygon_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
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
  message_?: InputMaybe<stagingpolygon_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<stagingpolygon_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_OriginTransfer_filter>>>;
};

export type stagingpolygon_OriginTransfer_orderBy =
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
  stagingpolygon_asset?: Maybe<stagingpolygon_Asset>;
  stagingpolygon_assets: Array<stagingpolygon_Asset>;
  stagingpolygon_assetStatus?: Maybe<stagingpolygon_AssetStatus>;
  stagingpolygon_assetStatuses: Array<stagingpolygon_AssetStatus>;
  stagingpolygon_assetBalance?: Maybe<stagingpolygon_AssetBalance>;
  stagingpolygon_assetBalances: Array<stagingpolygon_AssetBalance>;
  stagingpolygon_router?: Maybe<stagingpolygon_Router>;
  stagingpolygon_routers: Array<stagingpolygon_Router>;
  stagingpolygon_routerDailyTVL?: Maybe<stagingpolygon_RouterDailyTVL>;
  stagingpolygon_routerDailyTVLs: Array<stagingpolygon_RouterDailyTVL>;
  stagingpolygon_routerLiquidityEvent?: Maybe<stagingpolygon_RouterLiquidityEvent>;
  stagingpolygon_routerLiquidityEvents: Array<stagingpolygon_RouterLiquidityEvent>;
  stagingpolygon_setting?: Maybe<stagingpolygon_Setting>;
  stagingpolygon_settings: Array<stagingpolygon_Setting>;
  stagingpolygon_relayer?: Maybe<stagingpolygon_Relayer>;
  stagingpolygon_relayers: Array<stagingpolygon_Relayer>;
  stagingpolygon_sequencer?: Maybe<stagingpolygon_Sequencer>;
  stagingpolygon_sequencers: Array<stagingpolygon_Sequencer>;
  stagingpolygon_relayerFee?: Maybe<stagingpolygon_RelayerFee>;
  stagingpolygon_relayerFees: Array<stagingpolygon_RelayerFee>;
  stagingpolygon_originTransfer?: Maybe<stagingpolygon_OriginTransfer>;
  stagingpolygon_originTransfers: Array<stagingpolygon_OriginTransfer>;
  stagingpolygon_destinationTransfer?: Maybe<stagingpolygon_DestinationTransfer>;
  stagingpolygon_destinationTransfers: Array<stagingpolygon_DestinationTransfer>;
  stagingpolygon_originMessage?: Maybe<stagingpolygon_OriginMessage>;
  stagingpolygon_originMessages: Array<stagingpolygon_OriginMessage>;
  stagingpolygon_aggregateRoot?: Maybe<stagingpolygon_AggregateRoot>;
  stagingpolygon_aggregateRoots: Array<stagingpolygon_AggregateRoot>;
  stagingpolygon_connectorMeta?: Maybe<stagingpolygon_ConnectorMeta>;
  stagingpolygon_connectorMetas: Array<stagingpolygon_ConnectorMeta>;
  stagingpolygon_rootCount?: Maybe<stagingpolygon_RootCount>;
  stagingpolygon_rootCounts: Array<stagingpolygon_RootCount>;
  stagingpolygon_rootMessageSent?: Maybe<stagingpolygon_RootMessageSent>;
  stagingpolygon_rootMessageSents: Array<stagingpolygon_RootMessageSent>;
  stagingpolygon_relayerFeesIncrease?: Maybe<stagingpolygon_RelayerFeesIncrease>;
  stagingpolygon_relayerFeesIncreases: Array<stagingpolygon_RelayerFeesIncrease>;
  stagingpolygon_slippageUpdate?: Maybe<stagingpolygon_SlippageUpdate>;
  stagingpolygon_slippageUpdates: Array<stagingpolygon_SlippageUpdate>;
  stagingpolygon_snapshotRoot?: Maybe<stagingpolygon_SnapshotRoot>;
  stagingpolygon_snapshotRoots: Array<stagingpolygon_SnapshotRoot>;
  stagingpolygon_spokeConnectorMode?: Maybe<stagingpolygon_SpokeConnectorMode>;
  stagingpolygon_spokeConnectorModes: Array<stagingpolygon_SpokeConnectorMode>;
  stagingpolygon_aggregateRootProposed?: Maybe<stagingpolygon_AggregateRootProposed>;
  stagingpolygon_aggregateRootProposeds: Array<stagingpolygon_AggregateRootProposed>;
  stagingpolygon_optimisticRootFinalized?: Maybe<stagingpolygon_OptimisticRootFinalized>;
  stagingpolygon_optimisticRootFinalizeds: Array<stagingpolygon_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingpolygon__meta?: Maybe<stagingpolygon__Meta_>;
};


export type Querystagingpolygon_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_Asset_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_AssetStatus_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_AssetBalance_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_Router_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_Router_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_Setting_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_Relayer_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_Sequencer_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_RelayerFee_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_OriginTransfer_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_DestinationTransfer_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_OriginMessage_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_AggregateRoot_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_ConnectorMeta_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_RootCount_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_RootMessageSent_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_SlippageUpdate_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_SnapshotRoot_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon__metaArgs = {
  block?: InputMaybe<stagingpolygon_Block_height>;
};

export type stagingpolygon_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['stagingpolygon_Bytes']>;
};

export type stagingpolygon_RelayerFee = {
  id: Scalars['ID'];
  transfer: stagingpolygon_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['stagingpolygon_Bytes'];
};

export type stagingpolygon_RelayerFee_filter = {
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
  transfer_?: InputMaybe<stagingpolygon_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_RelayerFee_filter>>>;
};

export type stagingpolygon_RelayerFee_orderBy =
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

export type stagingpolygon_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: stagingpolygon_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['stagingpolygon_Bytes']>;
  caller: Scalars['stagingpolygon_Bytes'];
  transactionHash: Scalars['stagingpolygon_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingpolygon_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<stagingpolygon_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
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
  _change_block?: InputMaybe<stagingpolygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_RelayerFeesIncrease_filter>>>;
};

export type stagingpolygon_RelayerFeesIncrease_orderBy =
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

export type stagingpolygon_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  relayer_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_Relayer_filter>>>;
};

export type stagingpolygon_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type stagingpolygon_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type stagingpolygon_RootCount_filter = {
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
  _change_block?: InputMaybe<stagingpolygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_RootCount_filter>>>;
};

export type stagingpolygon_RootCount_orderBy =
  | 'id'
  | 'count';

export type stagingpolygon_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['stagingpolygon_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingpolygon_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingpolygon_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
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
  _change_block?: InputMaybe<stagingpolygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_RootMessageSent_filter>>>;
};

export type stagingpolygon_RootMessageSent_orderBy =
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

export type stagingpolygon_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['stagingpolygon_Bytes']>;
  recipient?: Maybe<Scalars['stagingpolygon_Bytes']>;
  proposedOwner?: Maybe<Scalars['stagingpolygon_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<stagingpolygon_AssetBalance>;
};


export type stagingpolygon_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_AssetBalance_filter>;
};

export type stagingpolygon_RouterDailyTVL = {
  id: Scalars['ID'];
  router: stagingpolygon_Router;
  asset: stagingpolygon_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type stagingpolygon_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<stagingpolygon_Router_filter>;
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
  asset_?: InputMaybe<stagingpolygon_Asset_filter>;
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
  _change_block?: InputMaybe<stagingpolygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_RouterDailyTVL_filter>>>;
};

export type stagingpolygon_RouterDailyTVL_orderBy =
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

export type stagingpolygon_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<stagingpolygon_RouterLiquidityEventType>;
  router: stagingpolygon_Router;
  asset: stagingpolygon_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['stagingpolygon_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['stagingpolygon_Bytes'];
  nonce: Scalars['BigInt'];
};

export type stagingpolygon_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type stagingpolygon_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<stagingpolygon_RouterLiquidityEventType>;
  type_not?: InputMaybe<stagingpolygon_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<stagingpolygon_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<stagingpolygon_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<stagingpolygon_Router_filter>;
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
  asset_?: InputMaybe<stagingpolygon_Asset_filter>;
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
  caller?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_RouterLiquidityEvent_filter>>>;
};

export type stagingpolygon_RouterLiquidityEvent_orderBy =
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

export type stagingpolygon_Router_filter = {
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
  owner?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  owner_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  owner_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  owner_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  owner_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  owner_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  recipient?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  recipient_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<stagingpolygon_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_Router_filter>>>;
};

export type stagingpolygon_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type stagingpolygon_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['stagingpolygon_Bytes']>;
};

export type stagingpolygon_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_Sequencer_filter>>>;
};

export type stagingpolygon_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type stagingpolygon_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['stagingpolygon_Bytes'];
};

export type stagingpolygon_Setting_filter = {
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
  caller?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_Setting_filter>>>;
};

export type stagingpolygon_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type stagingpolygon_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: stagingpolygon_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['stagingpolygon_Bytes'];
  transactionHash: Scalars['stagingpolygon_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingpolygon_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<stagingpolygon_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
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
  _change_block?: InputMaybe<stagingpolygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_SlippageUpdate_filter>>>;
};

export type stagingpolygon_SlippageUpdate_orderBy =
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

export type stagingpolygon_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['stagingpolygon_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingpolygon_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingpolygon_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingpolygon_Bytes']>;
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
  _change_block?: InputMaybe<stagingpolygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_SnapshotRoot_filter>>>;
};

export type stagingpolygon_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type stagingpolygon_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type stagingpolygon_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<stagingpolygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_SpokeConnectorMode_filter>>>;
};

export type stagingpolygon_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  stagingpolygon_asset?: Maybe<stagingpolygon_Asset>;
  stagingpolygon_assets: Array<stagingpolygon_Asset>;
  stagingpolygon_assetStatus?: Maybe<stagingpolygon_AssetStatus>;
  stagingpolygon_assetStatuses: Array<stagingpolygon_AssetStatus>;
  stagingpolygon_assetBalance?: Maybe<stagingpolygon_AssetBalance>;
  stagingpolygon_assetBalances: Array<stagingpolygon_AssetBalance>;
  stagingpolygon_router?: Maybe<stagingpolygon_Router>;
  stagingpolygon_routers: Array<stagingpolygon_Router>;
  stagingpolygon_routerDailyTVL?: Maybe<stagingpolygon_RouterDailyTVL>;
  stagingpolygon_routerDailyTVLs: Array<stagingpolygon_RouterDailyTVL>;
  stagingpolygon_routerLiquidityEvent?: Maybe<stagingpolygon_RouterLiquidityEvent>;
  stagingpolygon_routerLiquidityEvents: Array<stagingpolygon_RouterLiquidityEvent>;
  stagingpolygon_setting?: Maybe<stagingpolygon_Setting>;
  stagingpolygon_settings: Array<stagingpolygon_Setting>;
  stagingpolygon_relayer?: Maybe<stagingpolygon_Relayer>;
  stagingpolygon_relayers: Array<stagingpolygon_Relayer>;
  stagingpolygon_sequencer?: Maybe<stagingpolygon_Sequencer>;
  stagingpolygon_sequencers: Array<stagingpolygon_Sequencer>;
  stagingpolygon_relayerFee?: Maybe<stagingpolygon_RelayerFee>;
  stagingpolygon_relayerFees: Array<stagingpolygon_RelayerFee>;
  stagingpolygon_originTransfer?: Maybe<stagingpolygon_OriginTransfer>;
  stagingpolygon_originTransfers: Array<stagingpolygon_OriginTransfer>;
  stagingpolygon_destinationTransfer?: Maybe<stagingpolygon_DestinationTransfer>;
  stagingpolygon_destinationTransfers: Array<stagingpolygon_DestinationTransfer>;
  stagingpolygon_originMessage?: Maybe<stagingpolygon_OriginMessage>;
  stagingpolygon_originMessages: Array<stagingpolygon_OriginMessage>;
  stagingpolygon_aggregateRoot?: Maybe<stagingpolygon_AggregateRoot>;
  stagingpolygon_aggregateRoots: Array<stagingpolygon_AggregateRoot>;
  stagingpolygon_connectorMeta?: Maybe<stagingpolygon_ConnectorMeta>;
  stagingpolygon_connectorMetas: Array<stagingpolygon_ConnectorMeta>;
  stagingpolygon_rootCount?: Maybe<stagingpolygon_RootCount>;
  stagingpolygon_rootCounts: Array<stagingpolygon_RootCount>;
  stagingpolygon_rootMessageSent?: Maybe<stagingpolygon_RootMessageSent>;
  stagingpolygon_rootMessageSents: Array<stagingpolygon_RootMessageSent>;
  stagingpolygon_relayerFeesIncrease?: Maybe<stagingpolygon_RelayerFeesIncrease>;
  stagingpolygon_relayerFeesIncreases: Array<stagingpolygon_RelayerFeesIncrease>;
  stagingpolygon_slippageUpdate?: Maybe<stagingpolygon_SlippageUpdate>;
  stagingpolygon_slippageUpdates: Array<stagingpolygon_SlippageUpdate>;
  stagingpolygon_snapshotRoot?: Maybe<stagingpolygon_SnapshotRoot>;
  stagingpolygon_snapshotRoots: Array<stagingpolygon_SnapshotRoot>;
  stagingpolygon_spokeConnectorMode?: Maybe<stagingpolygon_SpokeConnectorMode>;
  stagingpolygon_spokeConnectorModes: Array<stagingpolygon_SpokeConnectorMode>;
  stagingpolygon_aggregateRootProposed?: Maybe<stagingpolygon_AggregateRootProposed>;
  stagingpolygon_aggregateRootProposeds: Array<stagingpolygon_AggregateRootProposed>;
  stagingpolygon_optimisticRootFinalized?: Maybe<stagingpolygon_OptimisticRootFinalized>;
  stagingpolygon_optimisticRootFinalizeds: Array<stagingpolygon_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingpolygon__meta?: Maybe<stagingpolygon__Meta_>;
};


export type Subscriptionstagingpolygon_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_Asset_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_AssetStatus_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_AssetBalance_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_Router_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_Router_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_Setting_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_Relayer_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_Sequencer_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_RelayerFee_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_OriginTransfer_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_DestinationTransfer_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_OriginMessage_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_AggregateRoot_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_ConnectorMeta_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_RootCount_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_RootMessageSent_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_SlippageUpdate_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_SnapshotRoot_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_OrderDirection>;
  where?: InputMaybe<stagingpolygon_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingpolygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon__metaArgs = {
  block?: InputMaybe<stagingpolygon_Block_height>;
};

export type stagingpolygon_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type stagingpolygon__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingpolygon_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type stagingpolygon__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingpolygon__Block_;
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
  stagingpolygon_asset: InContextSdkMethod<Query['stagingpolygon_asset'], Querystagingpolygon_assetArgs, MeshContext>,
  /** null **/
  stagingpolygon_assets: InContextSdkMethod<Query['stagingpolygon_assets'], Querystagingpolygon_assetsArgs, MeshContext>,
  /** null **/
  stagingpolygon_assetStatus: InContextSdkMethod<Query['stagingpolygon_assetStatus'], Querystagingpolygon_assetStatusArgs, MeshContext>,
  /** null **/
  stagingpolygon_assetStatuses: InContextSdkMethod<Query['stagingpolygon_assetStatuses'], Querystagingpolygon_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingpolygon_assetBalance: InContextSdkMethod<Query['stagingpolygon_assetBalance'], Querystagingpolygon_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingpolygon_assetBalances: InContextSdkMethod<Query['stagingpolygon_assetBalances'], Querystagingpolygon_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingpolygon_router: InContextSdkMethod<Query['stagingpolygon_router'], Querystagingpolygon_routerArgs, MeshContext>,
  /** null **/
  stagingpolygon_routers: InContextSdkMethod<Query['stagingpolygon_routers'], Querystagingpolygon_routersArgs, MeshContext>,
  /** null **/
  stagingpolygon_routerDailyTVL: InContextSdkMethod<Query['stagingpolygon_routerDailyTVL'], Querystagingpolygon_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingpolygon_routerDailyTVLs: InContextSdkMethod<Query['stagingpolygon_routerDailyTVLs'], Querystagingpolygon_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingpolygon_routerLiquidityEvent: InContextSdkMethod<Query['stagingpolygon_routerLiquidityEvent'], Querystagingpolygon_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingpolygon_routerLiquidityEvents: InContextSdkMethod<Query['stagingpolygon_routerLiquidityEvents'], Querystagingpolygon_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingpolygon_setting: InContextSdkMethod<Query['stagingpolygon_setting'], Querystagingpolygon_settingArgs, MeshContext>,
  /** null **/
  stagingpolygon_settings: InContextSdkMethod<Query['stagingpolygon_settings'], Querystagingpolygon_settingsArgs, MeshContext>,
  /** null **/
  stagingpolygon_relayer: InContextSdkMethod<Query['stagingpolygon_relayer'], Querystagingpolygon_relayerArgs, MeshContext>,
  /** null **/
  stagingpolygon_relayers: InContextSdkMethod<Query['stagingpolygon_relayers'], Querystagingpolygon_relayersArgs, MeshContext>,
  /** null **/
  stagingpolygon_sequencer: InContextSdkMethod<Query['stagingpolygon_sequencer'], Querystagingpolygon_sequencerArgs, MeshContext>,
  /** null **/
  stagingpolygon_sequencers: InContextSdkMethod<Query['stagingpolygon_sequencers'], Querystagingpolygon_sequencersArgs, MeshContext>,
  /** null **/
  stagingpolygon_relayerFee: InContextSdkMethod<Query['stagingpolygon_relayerFee'], Querystagingpolygon_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingpolygon_relayerFees: InContextSdkMethod<Query['stagingpolygon_relayerFees'], Querystagingpolygon_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingpolygon_originTransfer: InContextSdkMethod<Query['stagingpolygon_originTransfer'], Querystagingpolygon_originTransferArgs, MeshContext>,
  /** null **/
  stagingpolygon_originTransfers: InContextSdkMethod<Query['stagingpolygon_originTransfers'], Querystagingpolygon_originTransfersArgs, MeshContext>,
  /** null **/
  stagingpolygon_destinationTransfer: InContextSdkMethod<Query['stagingpolygon_destinationTransfer'], Querystagingpolygon_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingpolygon_destinationTransfers: InContextSdkMethod<Query['stagingpolygon_destinationTransfers'], Querystagingpolygon_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingpolygon_originMessage: InContextSdkMethod<Query['stagingpolygon_originMessage'], Querystagingpolygon_originMessageArgs, MeshContext>,
  /** null **/
  stagingpolygon_originMessages: InContextSdkMethod<Query['stagingpolygon_originMessages'], Querystagingpolygon_originMessagesArgs, MeshContext>,
  /** null **/
  stagingpolygon_aggregateRoot: InContextSdkMethod<Query['stagingpolygon_aggregateRoot'], Querystagingpolygon_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingpolygon_aggregateRoots: InContextSdkMethod<Query['stagingpolygon_aggregateRoots'], Querystagingpolygon_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingpolygon_connectorMeta: InContextSdkMethod<Query['stagingpolygon_connectorMeta'], Querystagingpolygon_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingpolygon_connectorMetas: InContextSdkMethod<Query['stagingpolygon_connectorMetas'], Querystagingpolygon_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingpolygon_rootCount: InContextSdkMethod<Query['stagingpolygon_rootCount'], Querystagingpolygon_rootCountArgs, MeshContext>,
  /** null **/
  stagingpolygon_rootCounts: InContextSdkMethod<Query['stagingpolygon_rootCounts'], Querystagingpolygon_rootCountsArgs, MeshContext>,
  /** null **/
  stagingpolygon_rootMessageSent: InContextSdkMethod<Query['stagingpolygon_rootMessageSent'], Querystagingpolygon_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingpolygon_rootMessageSents: InContextSdkMethod<Query['stagingpolygon_rootMessageSents'], Querystagingpolygon_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingpolygon_relayerFeesIncrease: InContextSdkMethod<Query['stagingpolygon_relayerFeesIncrease'], Querystagingpolygon_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingpolygon_relayerFeesIncreases: InContextSdkMethod<Query['stagingpolygon_relayerFeesIncreases'], Querystagingpolygon_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingpolygon_slippageUpdate: InContextSdkMethod<Query['stagingpolygon_slippageUpdate'], Querystagingpolygon_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingpolygon_slippageUpdates: InContextSdkMethod<Query['stagingpolygon_slippageUpdates'], Querystagingpolygon_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingpolygon_snapshotRoot: InContextSdkMethod<Query['stagingpolygon_snapshotRoot'], Querystagingpolygon_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingpolygon_snapshotRoots: InContextSdkMethod<Query['stagingpolygon_snapshotRoots'], Querystagingpolygon_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingpolygon_spokeConnectorMode: InContextSdkMethod<Query['stagingpolygon_spokeConnectorMode'], Querystagingpolygon_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingpolygon_spokeConnectorModes: InContextSdkMethod<Query['stagingpolygon_spokeConnectorModes'], Querystagingpolygon_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingpolygon_aggregateRootProposed: InContextSdkMethod<Query['stagingpolygon_aggregateRootProposed'], Querystagingpolygon_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingpolygon_aggregateRootProposeds: InContextSdkMethod<Query['stagingpolygon_aggregateRootProposeds'], Querystagingpolygon_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingpolygon_optimisticRootFinalized: InContextSdkMethod<Query['stagingpolygon_optimisticRootFinalized'], Querystagingpolygon_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingpolygon_optimisticRootFinalizeds: InContextSdkMethod<Query['stagingpolygon_optimisticRootFinalizeds'], Querystagingpolygon_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingpolygon__meta: InContextSdkMethod<Query['stagingpolygon__meta'], Querystagingpolygon__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  stagingpolygon_asset: InContextSdkMethod<Subscription['stagingpolygon_asset'], Subscriptionstagingpolygon_assetArgs, MeshContext>,
  /** null **/
  stagingpolygon_assets: InContextSdkMethod<Subscription['stagingpolygon_assets'], Subscriptionstagingpolygon_assetsArgs, MeshContext>,
  /** null **/
  stagingpolygon_assetStatus: InContextSdkMethod<Subscription['stagingpolygon_assetStatus'], Subscriptionstagingpolygon_assetStatusArgs, MeshContext>,
  /** null **/
  stagingpolygon_assetStatuses: InContextSdkMethod<Subscription['stagingpolygon_assetStatuses'], Subscriptionstagingpolygon_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingpolygon_assetBalance: InContextSdkMethod<Subscription['stagingpolygon_assetBalance'], Subscriptionstagingpolygon_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingpolygon_assetBalances: InContextSdkMethod<Subscription['stagingpolygon_assetBalances'], Subscriptionstagingpolygon_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingpolygon_router: InContextSdkMethod<Subscription['stagingpolygon_router'], Subscriptionstagingpolygon_routerArgs, MeshContext>,
  /** null **/
  stagingpolygon_routers: InContextSdkMethod<Subscription['stagingpolygon_routers'], Subscriptionstagingpolygon_routersArgs, MeshContext>,
  /** null **/
  stagingpolygon_routerDailyTVL: InContextSdkMethod<Subscription['stagingpolygon_routerDailyTVL'], Subscriptionstagingpolygon_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingpolygon_routerDailyTVLs: InContextSdkMethod<Subscription['stagingpolygon_routerDailyTVLs'], Subscriptionstagingpolygon_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingpolygon_routerLiquidityEvent: InContextSdkMethod<Subscription['stagingpolygon_routerLiquidityEvent'], Subscriptionstagingpolygon_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingpolygon_routerLiquidityEvents: InContextSdkMethod<Subscription['stagingpolygon_routerLiquidityEvents'], Subscriptionstagingpolygon_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingpolygon_setting: InContextSdkMethod<Subscription['stagingpolygon_setting'], Subscriptionstagingpolygon_settingArgs, MeshContext>,
  /** null **/
  stagingpolygon_settings: InContextSdkMethod<Subscription['stagingpolygon_settings'], Subscriptionstagingpolygon_settingsArgs, MeshContext>,
  /** null **/
  stagingpolygon_relayer: InContextSdkMethod<Subscription['stagingpolygon_relayer'], Subscriptionstagingpolygon_relayerArgs, MeshContext>,
  /** null **/
  stagingpolygon_relayers: InContextSdkMethod<Subscription['stagingpolygon_relayers'], Subscriptionstagingpolygon_relayersArgs, MeshContext>,
  /** null **/
  stagingpolygon_sequencer: InContextSdkMethod<Subscription['stagingpolygon_sequencer'], Subscriptionstagingpolygon_sequencerArgs, MeshContext>,
  /** null **/
  stagingpolygon_sequencers: InContextSdkMethod<Subscription['stagingpolygon_sequencers'], Subscriptionstagingpolygon_sequencersArgs, MeshContext>,
  /** null **/
  stagingpolygon_relayerFee: InContextSdkMethod<Subscription['stagingpolygon_relayerFee'], Subscriptionstagingpolygon_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingpolygon_relayerFees: InContextSdkMethod<Subscription['stagingpolygon_relayerFees'], Subscriptionstagingpolygon_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingpolygon_originTransfer: InContextSdkMethod<Subscription['stagingpolygon_originTransfer'], Subscriptionstagingpolygon_originTransferArgs, MeshContext>,
  /** null **/
  stagingpolygon_originTransfers: InContextSdkMethod<Subscription['stagingpolygon_originTransfers'], Subscriptionstagingpolygon_originTransfersArgs, MeshContext>,
  /** null **/
  stagingpolygon_destinationTransfer: InContextSdkMethod<Subscription['stagingpolygon_destinationTransfer'], Subscriptionstagingpolygon_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingpolygon_destinationTransfers: InContextSdkMethod<Subscription['stagingpolygon_destinationTransfers'], Subscriptionstagingpolygon_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingpolygon_originMessage: InContextSdkMethod<Subscription['stagingpolygon_originMessage'], Subscriptionstagingpolygon_originMessageArgs, MeshContext>,
  /** null **/
  stagingpolygon_originMessages: InContextSdkMethod<Subscription['stagingpolygon_originMessages'], Subscriptionstagingpolygon_originMessagesArgs, MeshContext>,
  /** null **/
  stagingpolygon_aggregateRoot: InContextSdkMethod<Subscription['stagingpolygon_aggregateRoot'], Subscriptionstagingpolygon_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingpolygon_aggregateRoots: InContextSdkMethod<Subscription['stagingpolygon_aggregateRoots'], Subscriptionstagingpolygon_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingpolygon_connectorMeta: InContextSdkMethod<Subscription['stagingpolygon_connectorMeta'], Subscriptionstagingpolygon_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingpolygon_connectorMetas: InContextSdkMethod<Subscription['stagingpolygon_connectorMetas'], Subscriptionstagingpolygon_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingpolygon_rootCount: InContextSdkMethod<Subscription['stagingpolygon_rootCount'], Subscriptionstagingpolygon_rootCountArgs, MeshContext>,
  /** null **/
  stagingpolygon_rootCounts: InContextSdkMethod<Subscription['stagingpolygon_rootCounts'], Subscriptionstagingpolygon_rootCountsArgs, MeshContext>,
  /** null **/
  stagingpolygon_rootMessageSent: InContextSdkMethod<Subscription['stagingpolygon_rootMessageSent'], Subscriptionstagingpolygon_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingpolygon_rootMessageSents: InContextSdkMethod<Subscription['stagingpolygon_rootMessageSents'], Subscriptionstagingpolygon_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingpolygon_relayerFeesIncrease: InContextSdkMethod<Subscription['stagingpolygon_relayerFeesIncrease'], Subscriptionstagingpolygon_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingpolygon_relayerFeesIncreases: InContextSdkMethod<Subscription['stagingpolygon_relayerFeesIncreases'], Subscriptionstagingpolygon_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingpolygon_slippageUpdate: InContextSdkMethod<Subscription['stagingpolygon_slippageUpdate'], Subscriptionstagingpolygon_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingpolygon_slippageUpdates: InContextSdkMethod<Subscription['stagingpolygon_slippageUpdates'], Subscriptionstagingpolygon_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingpolygon_snapshotRoot: InContextSdkMethod<Subscription['stagingpolygon_snapshotRoot'], Subscriptionstagingpolygon_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingpolygon_snapshotRoots: InContextSdkMethod<Subscription['stagingpolygon_snapshotRoots'], Subscriptionstagingpolygon_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingpolygon_spokeConnectorMode: InContextSdkMethod<Subscription['stagingpolygon_spokeConnectorMode'], Subscriptionstagingpolygon_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingpolygon_spokeConnectorModes: InContextSdkMethod<Subscription['stagingpolygon_spokeConnectorModes'], Subscriptionstagingpolygon_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingpolygon_aggregateRootProposed: InContextSdkMethod<Subscription['stagingpolygon_aggregateRootProposed'], Subscriptionstagingpolygon_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingpolygon_aggregateRootProposeds: InContextSdkMethod<Subscription['stagingpolygon_aggregateRootProposeds'], Subscriptionstagingpolygon_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingpolygon_optimisticRootFinalized: InContextSdkMethod<Subscription['stagingpolygon_optimisticRootFinalized'], Subscriptionstagingpolygon_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingpolygon_optimisticRootFinalizeds: InContextSdkMethod<Subscription['stagingpolygon_optimisticRootFinalizeds'], Subscriptionstagingpolygon_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingpolygon__meta: InContextSdkMethod<Subscription['stagingpolygon__meta'], Subscriptionstagingpolygon__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Staging_Polygon"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
