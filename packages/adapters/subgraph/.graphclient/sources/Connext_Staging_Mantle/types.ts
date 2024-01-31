// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextStagingMantleTypes {
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
  stagingmantle_BigDecimal: any;
  BigInt: any;
  stagingmantle_Bytes: any;
  stagingmantle_Int8: any;
};

export type stagingmantle_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['stagingmantle_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type stagingmantle_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingmantle_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingmantle_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
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
  _change_block?: InputMaybe<stagingmantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmantle_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmantle_AggregateRootProposed_filter>>>;
};

export type stagingmantle_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type stagingmantle_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmantle_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmantle_AggregateRoot_filter>>>;
};

export type stagingmantle_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type stagingmantle_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['stagingmantle_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingmantle_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['stagingmantle_Bytes']>;
  localAsset?: Maybe<Scalars['stagingmantle_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingmantle_AssetStatus>;
};

export type stagingmantle_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: stagingmantle_Router;
  asset: stagingmantle_Asset;
  feesEarned: Scalars['BigInt'];
};

export type stagingmantle_AssetBalance_filter = {
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
  router_?: InputMaybe<stagingmantle_Router_filter>;
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
  asset_?: InputMaybe<stagingmantle_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmantle_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmantle_AssetBalance_filter>>>;
};

export type stagingmantle_AssetBalance_orderBy =
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

export type stagingmantle_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type stagingmantle_AssetStatus_filter = {
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
  _change_block?: InputMaybe<stagingmantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmantle_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmantle_AssetStatus_filter>>>;
};

export type stagingmantle_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type stagingmantle_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  key_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  key_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  key_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  key_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  key_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  key_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  localAsset?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
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
  status_?: InputMaybe<stagingmantle_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmantle_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmantle_Asset_filter>>>;
};

export type stagingmantle_Asset_orderBy =
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

export type stagingmantle_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingmantle_Block_height = {
  hash?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type stagingmantle_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['stagingmantle_Bytes']>;
  rootManager?: Maybe<Scalars['stagingmantle_Bytes']>;
  mirrorConnector?: Maybe<Scalars['stagingmantle_Bytes']>;
};

export type stagingmantle_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmantle_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmantle_ConnectorMeta_filter>>>;
};

export type stagingmantle_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingmantle_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingmantle_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingmantle_TransferStatus>;
  routers?: Maybe<Array<stagingmantle_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingmantle_Bytes']>;
  delegate?: Maybe<Scalars['stagingmantle_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingmantle_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingmantle_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingmantle_Bytes']>;
  asset?: Maybe<stagingmantle_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['stagingmantle_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['stagingmantle_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['stagingmantle_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['stagingmantle_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['stagingmantle_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['stagingmantle_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingmantle_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_Router_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_Router_filter>;
};

export type stagingmantle_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingmantle_TransferStatus>;
  status_not?: InputMaybe<stagingmantle_TransferStatus>;
  status_in?: InputMaybe<Array<stagingmantle_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingmantle_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<stagingmantle_Router_filter>;
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
  to?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
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
  originSender?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
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
  asset_?: InputMaybe<stagingmantle_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmantle_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmantle_DestinationTransfer_filter>>>;
};

export type stagingmantle_DestinationTransfer_orderBy =
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

export type stagingmantle_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingmantle_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingmantle_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
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
  _change_block?: InputMaybe<stagingmantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmantle_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmantle_OptimisticRootFinalized_filter>>>;
};

export type stagingmantle_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type stagingmantle_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingmantle_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['stagingmantle_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['stagingmantle_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['stagingmantle_Bytes']>;
  root?: Maybe<Scalars['stagingmantle_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingmantle_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<stagingmantle_RootCount>;
};

export type stagingmantle_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  leaf_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  message_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  message_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  message_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  message_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  message_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  message_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
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
  rootCount_?: InputMaybe<stagingmantle_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmantle_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmantle_OriginMessage_filter>>>;
};

export type stagingmantle_OriginMessage_orderBy =
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

export type stagingmantle_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingmantle_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingmantle_TransferStatus>;
  messageHash?: Maybe<Scalars['stagingmantle_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingmantle_Bytes']>;
  delegate?: Maybe<Scalars['stagingmantle_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingmantle_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingmantle_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingmantle_Bytes']>;
  asset?: Maybe<stagingmantle_Asset>;
  transactingAsset?: Maybe<Scalars['stagingmantle_Bytes']>;
  message?: Maybe<stagingmantle_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<stagingmantle_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['stagingmantle_Bytes']>;
  caller?: Maybe<Scalars['stagingmantle_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingmantle_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['stagingmantle_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingmantle_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_RelayerFee_filter>;
};

export type stagingmantle_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingmantle_TransferStatus>;
  status_not?: InputMaybe<stagingmantle_TransferStatus>;
  status_in?: InputMaybe<Array<stagingmantle_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingmantle_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
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
  to?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
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
  asset_?: InputMaybe<stagingmantle_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
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
  message_?: InputMaybe<stagingmantle_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<stagingmantle_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmantle_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmantle_OriginTransfer_filter>>>;
};

export type stagingmantle_OriginTransfer_orderBy =
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
  stagingmantle_asset?: Maybe<stagingmantle_Asset>;
  stagingmantle_assets: Array<stagingmantle_Asset>;
  stagingmantle_assetStatus?: Maybe<stagingmantle_AssetStatus>;
  stagingmantle_assetStatuses: Array<stagingmantle_AssetStatus>;
  stagingmantle_assetBalance?: Maybe<stagingmantle_AssetBalance>;
  stagingmantle_assetBalances: Array<stagingmantle_AssetBalance>;
  stagingmantle_router?: Maybe<stagingmantle_Router>;
  stagingmantle_routers: Array<stagingmantle_Router>;
  stagingmantle_routerDailyTVL?: Maybe<stagingmantle_RouterDailyTVL>;
  stagingmantle_routerDailyTVLs: Array<stagingmantle_RouterDailyTVL>;
  stagingmantle_routerLiquidityEvent?: Maybe<stagingmantle_RouterLiquidityEvent>;
  stagingmantle_routerLiquidityEvents: Array<stagingmantle_RouterLiquidityEvent>;
  stagingmantle_setting?: Maybe<stagingmantle_Setting>;
  stagingmantle_settings: Array<stagingmantle_Setting>;
  stagingmantle_relayer?: Maybe<stagingmantle_Relayer>;
  stagingmantle_relayers: Array<stagingmantle_Relayer>;
  stagingmantle_sequencer?: Maybe<stagingmantle_Sequencer>;
  stagingmantle_sequencers: Array<stagingmantle_Sequencer>;
  stagingmantle_relayerFee?: Maybe<stagingmantle_RelayerFee>;
  stagingmantle_relayerFees: Array<stagingmantle_RelayerFee>;
  stagingmantle_originTransfer?: Maybe<stagingmantle_OriginTransfer>;
  stagingmantle_originTransfers: Array<stagingmantle_OriginTransfer>;
  stagingmantle_destinationTransfer?: Maybe<stagingmantle_DestinationTransfer>;
  stagingmantle_destinationTransfers: Array<stagingmantle_DestinationTransfer>;
  stagingmantle_originMessage?: Maybe<stagingmantle_OriginMessage>;
  stagingmantle_originMessages: Array<stagingmantle_OriginMessage>;
  stagingmantle_aggregateRoot?: Maybe<stagingmantle_AggregateRoot>;
  stagingmantle_aggregateRoots: Array<stagingmantle_AggregateRoot>;
  stagingmantle_connectorMeta?: Maybe<stagingmantle_ConnectorMeta>;
  stagingmantle_connectorMetas: Array<stagingmantle_ConnectorMeta>;
  stagingmantle_rootCount?: Maybe<stagingmantle_RootCount>;
  stagingmantle_rootCounts: Array<stagingmantle_RootCount>;
  stagingmantle_rootMessageSent?: Maybe<stagingmantle_RootMessageSent>;
  stagingmantle_rootMessageSents: Array<stagingmantle_RootMessageSent>;
  stagingmantle_relayerFeesIncrease?: Maybe<stagingmantle_RelayerFeesIncrease>;
  stagingmantle_relayerFeesIncreases: Array<stagingmantle_RelayerFeesIncrease>;
  stagingmantle_slippageUpdate?: Maybe<stagingmantle_SlippageUpdate>;
  stagingmantle_slippageUpdates: Array<stagingmantle_SlippageUpdate>;
  stagingmantle_snapshotRoot?: Maybe<stagingmantle_SnapshotRoot>;
  stagingmantle_snapshotRoots: Array<stagingmantle_SnapshotRoot>;
  stagingmantle_spokeConnectorMode?: Maybe<stagingmantle_SpokeConnectorMode>;
  stagingmantle_spokeConnectorModes: Array<stagingmantle_SpokeConnectorMode>;
  stagingmantle_aggregateRootProposed?: Maybe<stagingmantle_AggregateRootProposed>;
  stagingmantle_aggregateRootProposeds: Array<stagingmantle_AggregateRootProposed>;
  stagingmantle_optimisticRootFinalized?: Maybe<stagingmantle_OptimisticRootFinalized>;
  stagingmantle_optimisticRootFinalizeds: Array<stagingmantle_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingmantle__meta?: Maybe<stagingmantle__Meta_>;
};


export type Querystagingmantle_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_Asset_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_AssetStatus_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_AssetBalance_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_Router_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_Router_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_Setting_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_Relayer_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_Sequencer_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_RelayerFee_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_OriginTransfer_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_DestinationTransfer_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_OriginMessage_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_AggregateRoot_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_ConnectorMeta_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_RootCount_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_RootMessageSent_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_SlippageUpdate_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_SnapshotRoot_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmantle__metaArgs = {
  block?: InputMaybe<stagingmantle_Block_height>;
};

export type stagingmantle_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['stagingmantle_Bytes']>;
};

export type stagingmantle_RelayerFee = {
  id: Scalars['ID'];
  transfer: stagingmantle_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['stagingmantle_Bytes'];
};

export type stagingmantle_RelayerFee_filter = {
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
  transfer_?: InputMaybe<stagingmantle_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmantle_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmantle_RelayerFee_filter>>>;
};

export type stagingmantle_RelayerFee_orderBy =
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

export type stagingmantle_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: stagingmantle_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['stagingmantle_Bytes']>;
  caller: Scalars['stagingmantle_Bytes'];
  transactionHash: Scalars['stagingmantle_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingmantle_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<stagingmantle_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
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
  _change_block?: InputMaybe<stagingmantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmantle_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmantle_RelayerFeesIncrease_filter>>>;
};

export type stagingmantle_RelayerFeesIncrease_orderBy =
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

export type stagingmantle_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  relayer_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmantle_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmantle_Relayer_filter>>>;
};

export type stagingmantle_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type stagingmantle_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type stagingmantle_RootCount_filter = {
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
  _change_block?: InputMaybe<stagingmantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmantle_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmantle_RootCount_filter>>>;
};

export type stagingmantle_RootCount_orderBy =
  | 'id'
  | 'count';

export type stagingmantle_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['stagingmantle_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['stagingmantle_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingmantle_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingmantle_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
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
  _change_block?: InputMaybe<stagingmantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmantle_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmantle_RootMessageSent_filter>>>;
};

export type stagingmantle_RootMessageSent_orderBy =
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

export type stagingmantle_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['stagingmantle_Bytes']>;
  recipient?: Maybe<Scalars['stagingmantle_Bytes']>;
  proposedOwner?: Maybe<Scalars['stagingmantle_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<stagingmantle_AssetBalance>;
};


export type stagingmantle_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_AssetBalance_filter>;
};

export type stagingmantle_RouterDailyTVL = {
  id: Scalars['ID'];
  router: stagingmantle_Router;
  asset: stagingmantle_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type stagingmantle_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<stagingmantle_Router_filter>;
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
  asset_?: InputMaybe<stagingmantle_Asset_filter>;
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
  _change_block?: InputMaybe<stagingmantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmantle_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmantle_RouterDailyTVL_filter>>>;
};

export type stagingmantle_RouterDailyTVL_orderBy =
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

export type stagingmantle_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<stagingmantle_RouterLiquidityEventType>;
  router: stagingmantle_Router;
  asset: stagingmantle_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['stagingmantle_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['stagingmantle_Bytes'];
  nonce: Scalars['BigInt'];
};

export type stagingmantle_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type stagingmantle_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<stagingmantle_RouterLiquidityEventType>;
  type_not?: InputMaybe<stagingmantle_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<stagingmantle_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<stagingmantle_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<stagingmantle_Router_filter>;
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
  asset_?: InputMaybe<stagingmantle_Asset_filter>;
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
  caller?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmantle_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmantle_RouterLiquidityEvent_filter>>>;
};

export type stagingmantle_RouterLiquidityEvent_orderBy =
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

export type stagingmantle_Router_filter = {
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
  owner?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  owner_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  owner_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  owner_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  owner_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  owner_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  recipient?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  recipient_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<stagingmantle_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmantle_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmantle_Router_filter>>>;
};

export type stagingmantle_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type stagingmantle_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['stagingmantle_Bytes']>;
};

export type stagingmantle_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmantle_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmantle_Sequencer_filter>>>;
};

export type stagingmantle_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type stagingmantle_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['stagingmantle_Bytes'];
};

export type stagingmantle_Setting_filter = {
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
  caller?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmantle_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmantle_Setting_filter>>>;
};

export type stagingmantle_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type stagingmantle_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: stagingmantle_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['stagingmantle_Bytes'];
  transactionHash: Scalars['stagingmantle_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingmantle_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<stagingmantle_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
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
  _change_block?: InputMaybe<stagingmantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmantle_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmantle_SlippageUpdate_filter>>>;
};

export type stagingmantle_SlippageUpdate_orderBy =
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

export type stagingmantle_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['stagingmantle_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingmantle_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingmantle_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingmantle_Bytes']>;
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
  _change_block?: InputMaybe<stagingmantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmantle_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmantle_SnapshotRoot_filter>>>;
};

export type stagingmantle_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type stagingmantle_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type stagingmantle_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<stagingmantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmantle_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmantle_SpokeConnectorMode_filter>>>;
};

export type stagingmantle_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  stagingmantle_asset?: Maybe<stagingmantle_Asset>;
  stagingmantle_assets: Array<stagingmantle_Asset>;
  stagingmantle_assetStatus?: Maybe<stagingmantle_AssetStatus>;
  stagingmantle_assetStatuses: Array<stagingmantle_AssetStatus>;
  stagingmantle_assetBalance?: Maybe<stagingmantle_AssetBalance>;
  stagingmantle_assetBalances: Array<stagingmantle_AssetBalance>;
  stagingmantle_router?: Maybe<stagingmantle_Router>;
  stagingmantle_routers: Array<stagingmantle_Router>;
  stagingmantle_routerDailyTVL?: Maybe<stagingmantle_RouterDailyTVL>;
  stagingmantle_routerDailyTVLs: Array<stagingmantle_RouterDailyTVL>;
  stagingmantle_routerLiquidityEvent?: Maybe<stagingmantle_RouterLiquidityEvent>;
  stagingmantle_routerLiquidityEvents: Array<stagingmantle_RouterLiquidityEvent>;
  stagingmantle_setting?: Maybe<stagingmantle_Setting>;
  stagingmantle_settings: Array<stagingmantle_Setting>;
  stagingmantle_relayer?: Maybe<stagingmantle_Relayer>;
  stagingmantle_relayers: Array<stagingmantle_Relayer>;
  stagingmantle_sequencer?: Maybe<stagingmantle_Sequencer>;
  stagingmantle_sequencers: Array<stagingmantle_Sequencer>;
  stagingmantle_relayerFee?: Maybe<stagingmantle_RelayerFee>;
  stagingmantle_relayerFees: Array<stagingmantle_RelayerFee>;
  stagingmantle_originTransfer?: Maybe<stagingmantle_OriginTransfer>;
  stagingmantle_originTransfers: Array<stagingmantle_OriginTransfer>;
  stagingmantle_destinationTransfer?: Maybe<stagingmantle_DestinationTransfer>;
  stagingmantle_destinationTransfers: Array<stagingmantle_DestinationTransfer>;
  stagingmantle_originMessage?: Maybe<stagingmantle_OriginMessage>;
  stagingmantle_originMessages: Array<stagingmantle_OriginMessage>;
  stagingmantle_aggregateRoot?: Maybe<stagingmantle_AggregateRoot>;
  stagingmantle_aggregateRoots: Array<stagingmantle_AggregateRoot>;
  stagingmantle_connectorMeta?: Maybe<stagingmantle_ConnectorMeta>;
  stagingmantle_connectorMetas: Array<stagingmantle_ConnectorMeta>;
  stagingmantle_rootCount?: Maybe<stagingmantle_RootCount>;
  stagingmantle_rootCounts: Array<stagingmantle_RootCount>;
  stagingmantle_rootMessageSent?: Maybe<stagingmantle_RootMessageSent>;
  stagingmantle_rootMessageSents: Array<stagingmantle_RootMessageSent>;
  stagingmantle_relayerFeesIncrease?: Maybe<stagingmantle_RelayerFeesIncrease>;
  stagingmantle_relayerFeesIncreases: Array<stagingmantle_RelayerFeesIncrease>;
  stagingmantle_slippageUpdate?: Maybe<stagingmantle_SlippageUpdate>;
  stagingmantle_slippageUpdates: Array<stagingmantle_SlippageUpdate>;
  stagingmantle_snapshotRoot?: Maybe<stagingmantle_SnapshotRoot>;
  stagingmantle_snapshotRoots: Array<stagingmantle_SnapshotRoot>;
  stagingmantle_spokeConnectorMode?: Maybe<stagingmantle_SpokeConnectorMode>;
  stagingmantle_spokeConnectorModes: Array<stagingmantle_SpokeConnectorMode>;
  stagingmantle_aggregateRootProposed?: Maybe<stagingmantle_AggregateRootProposed>;
  stagingmantle_aggregateRootProposeds: Array<stagingmantle_AggregateRootProposed>;
  stagingmantle_optimisticRootFinalized?: Maybe<stagingmantle_OptimisticRootFinalized>;
  stagingmantle_optimisticRootFinalizeds: Array<stagingmantle_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingmantle__meta?: Maybe<stagingmantle__Meta_>;
};


export type Subscriptionstagingmantle_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_Asset_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_AssetStatus_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_AssetBalance_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_Router_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_Router_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_Setting_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_Relayer_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_Sequencer_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_RelayerFee_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_OriginTransfer_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_DestinationTransfer_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_OriginMessage_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_AggregateRoot_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_ConnectorMeta_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_RootCount_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_RootMessageSent_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_SlippageUpdate_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_SnapshotRoot_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmantle_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingmantle_OrderDirection>;
  where?: InputMaybe<stagingmantle_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingmantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmantle__metaArgs = {
  block?: InputMaybe<stagingmantle_Block_height>;
};

export type stagingmantle_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type stagingmantle__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingmantle_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type stagingmantle__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingmantle__Block_;
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
  stagingmantle_asset: InContextSdkMethod<Query['stagingmantle_asset'], Querystagingmantle_assetArgs, MeshContext>,
  /** null **/
  stagingmantle_assets: InContextSdkMethod<Query['stagingmantle_assets'], Querystagingmantle_assetsArgs, MeshContext>,
  /** null **/
  stagingmantle_assetStatus: InContextSdkMethod<Query['stagingmantle_assetStatus'], Querystagingmantle_assetStatusArgs, MeshContext>,
  /** null **/
  stagingmantle_assetStatuses: InContextSdkMethod<Query['stagingmantle_assetStatuses'], Querystagingmantle_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingmantle_assetBalance: InContextSdkMethod<Query['stagingmantle_assetBalance'], Querystagingmantle_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingmantle_assetBalances: InContextSdkMethod<Query['stagingmantle_assetBalances'], Querystagingmantle_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingmantle_router: InContextSdkMethod<Query['stagingmantle_router'], Querystagingmantle_routerArgs, MeshContext>,
  /** null **/
  stagingmantle_routers: InContextSdkMethod<Query['stagingmantle_routers'], Querystagingmantle_routersArgs, MeshContext>,
  /** null **/
  stagingmantle_routerDailyTVL: InContextSdkMethod<Query['stagingmantle_routerDailyTVL'], Querystagingmantle_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingmantle_routerDailyTVLs: InContextSdkMethod<Query['stagingmantle_routerDailyTVLs'], Querystagingmantle_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingmantle_routerLiquidityEvent: InContextSdkMethod<Query['stagingmantle_routerLiquidityEvent'], Querystagingmantle_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingmantle_routerLiquidityEvents: InContextSdkMethod<Query['stagingmantle_routerLiquidityEvents'], Querystagingmantle_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingmantle_setting: InContextSdkMethod<Query['stagingmantle_setting'], Querystagingmantle_settingArgs, MeshContext>,
  /** null **/
  stagingmantle_settings: InContextSdkMethod<Query['stagingmantle_settings'], Querystagingmantle_settingsArgs, MeshContext>,
  /** null **/
  stagingmantle_relayer: InContextSdkMethod<Query['stagingmantle_relayer'], Querystagingmantle_relayerArgs, MeshContext>,
  /** null **/
  stagingmantle_relayers: InContextSdkMethod<Query['stagingmantle_relayers'], Querystagingmantle_relayersArgs, MeshContext>,
  /** null **/
  stagingmantle_sequencer: InContextSdkMethod<Query['stagingmantle_sequencer'], Querystagingmantle_sequencerArgs, MeshContext>,
  /** null **/
  stagingmantle_sequencers: InContextSdkMethod<Query['stagingmantle_sequencers'], Querystagingmantle_sequencersArgs, MeshContext>,
  /** null **/
  stagingmantle_relayerFee: InContextSdkMethod<Query['stagingmantle_relayerFee'], Querystagingmantle_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingmantle_relayerFees: InContextSdkMethod<Query['stagingmantle_relayerFees'], Querystagingmantle_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingmantle_originTransfer: InContextSdkMethod<Query['stagingmantle_originTransfer'], Querystagingmantle_originTransferArgs, MeshContext>,
  /** null **/
  stagingmantle_originTransfers: InContextSdkMethod<Query['stagingmantle_originTransfers'], Querystagingmantle_originTransfersArgs, MeshContext>,
  /** null **/
  stagingmantle_destinationTransfer: InContextSdkMethod<Query['stagingmantle_destinationTransfer'], Querystagingmantle_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingmantle_destinationTransfers: InContextSdkMethod<Query['stagingmantle_destinationTransfers'], Querystagingmantle_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingmantle_originMessage: InContextSdkMethod<Query['stagingmantle_originMessage'], Querystagingmantle_originMessageArgs, MeshContext>,
  /** null **/
  stagingmantle_originMessages: InContextSdkMethod<Query['stagingmantle_originMessages'], Querystagingmantle_originMessagesArgs, MeshContext>,
  /** null **/
  stagingmantle_aggregateRoot: InContextSdkMethod<Query['stagingmantle_aggregateRoot'], Querystagingmantle_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingmantle_aggregateRoots: InContextSdkMethod<Query['stagingmantle_aggregateRoots'], Querystagingmantle_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingmantle_connectorMeta: InContextSdkMethod<Query['stagingmantle_connectorMeta'], Querystagingmantle_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingmantle_connectorMetas: InContextSdkMethod<Query['stagingmantle_connectorMetas'], Querystagingmantle_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingmantle_rootCount: InContextSdkMethod<Query['stagingmantle_rootCount'], Querystagingmantle_rootCountArgs, MeshContext>,
  /** null **/
  stagingmantle_rootCounts: InContextSdkMethod<Query['stagingmantle_rootCounts'], Querystagingmantle_rootCountsArgs, MeshContext>,
  /** null **/
  stagingmantle_rootMessageSent: InContextSdkMethod<Query['stagingmantle_rootMessageSent'], Querystagingmantle_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingmantle_rootMessageSents: InContextSdkMethod<Query['stagingmantle_rootMessageSents'], Querystagingmantle_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingmantle_relayerFeesIncrease: InContextSdkMethod<Query['stagingmantle_relayerFeesIncrease'], Querystagingmantle_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingmantle_relayerFeesIncreases: InContextSdkMethod<Query['stagingmantle_relayerFeesIncreases'], Querystagingmantle_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingmantle_slippageUpdate: InContextSdkMethod<Query['stagingmantle_slippageUpdate'], Querystagingmantle_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingmantle_slippageUpdates: InContextSdkMethod<Query['stagingmantle_slippageUpdates'], Querystagingmantle_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingmantle_snapshotRoot: InContextSdkMethod<Query['stagingmantle_snapshotRoot'], Querystagingmantle_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingmantle_snapshotRoots: InContextSdkMethod<Query['stagingmantle_snapshotRoots'], Querystagingmantle_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingmantle_spokeConnectorMode: InContextSdkMethod<Query['stagingmantle_spokeConnectorMode'], Querystagingmantle_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingmantle_spokeConnectorModes: InContextSdkMethod<Query['stagingmantle_spokeConnectorModes'], Querystagingmantle_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingmantle_aggregateRootProposed: InContextSdkMethod<Query['stagingmantle_aggregateRootProposed'], Querystagingmantle_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingmantle_aggregateRootProposeds: InContextSdkMethod<Query['stagingmantle_aggregateRootProposeds'], Querystagingmantle_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingmantle_optimisticRootFinalized: InContextSdkMethod<Query['stagingmantle_optimisticRootFinalized'], Querystagingmantle_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingmantle_optimisticRootFinalizeds: InContextSdkMethod<Query['stagingmantle_optimisticRootFinalizeds'], Querystagingmantle_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingmantle__meta: InContextSdkMethod<Query['stagingmantle__meta'], Querystagingmantle__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  stagingmantle_asset: InContextSdkMethod<Subscription['stagingmantle_asset'], Subscriptionstagingmantle_assetArgs, MeshContext>,
  /** null **/
  stagingmantle_assets: InContextSdkMethod<Subscription['stagingmantle_assets'], Subscriptionstagingmantle_assetsArgs, MeshContext>,
  /** null **/
  stagingmantle_assetStatus: InContextSdkMethod<Subscription['stagingmantle_assetStatus'], Subscriptionstagingmantle_assetStatusArgs, MeshContext>,
  /** null **/
  stagingmantle_assetStatuses: InContextSdkMethod<Subscription['stagingmantle_assetStatuses'], Subscriptionstagingmantle_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingmantle_assetBalance: InContextSdkMethod<Subscription['stagingmantle_assetBalance'], Subscriptionstagingmantle_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingmantle_assetBalances: InContextSdkMethod<Subscription['stagingmantle_assetBalances'], Subscriptionstagingmantle_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingmantle_router: InContextSdkMethod<Subscription['stagingmantle_router'], Subscriptionstagingmantle_routerArgs, MeshContext>,
  /** null **/
  stagingmantle_routers: InContextSdkMethod<Subscription['stagingmantle_routers'], Subscriptionstagingmantle_routersArgs, MeshContext>,
  /** null **/
  stagingmantle_routerDailyTVL: InContextSdkMethod<Subscription['stagingmantle_routerDailyTVL'], Subscriptionstagingmantle_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingmantle_routerDailyTVLs: InContextSdkMethod<Subscription['stagingmantle_routerDailyTVLs'], Subscriptionstagingmantle_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingmantle_routerLiquidityEvent: InContextSdkMethod<Subscription['stagingmantle_routerLiquidityEvent'], Subscriptionstagingmantle_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingmantle_routerLiquidityEvents: InContextSdkMethod<Subscription['stagingmantle_routerLiquidityEvents'], Subscriptionstagingmantle_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingmantle_setting: InContextSdkMethod<Subscription['stagingmantle_setting'], Subscriptionstagingmantle_settingArgs, MeshContext>,
  /** null **/
  stagingmantle_settings: InContextSdkMethod<Subscription['stagingmantle_settings'], Subscriptionstagingmantle_settingsArgs, MeshContext>,
  /** null **/
  stagingmantle_relayer: InContextSdkMethod<Subscription['stagingmantle_relayer'], Subscriptionstagingmantle_relayerArgs, MeshContext>,
  /** null **/
  stagingmantle_relayers: InContextSdkMethod<Subscription['stagingmantle_relayers'], Subscriptionstagingmantle_relayersArgs, MeshContext>,
  /** null **/
  stagingmantle_sequencer: InContextSdkMethod<Subscription['stagingmantle_sequencer'], Subscriptionstagingmantle_sequencerArgs, MeshContext>,
  /** null **/
  stagingmantle_sequencers: InContextSdkMethod<Subscription['stagingmantle_sequencers'], Subscriptionstagingmantle_sequencersArgs, MeshContext>,
  /** null **/
  stagingmantle_relayerFee: InContextSdkMethod<Subscription['stagingmantle_relayerFee'], Subscriptionstagingmantle_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingmantle_relayerFees: InContextSdkMethod<Subscription['stagingmantle_relayerFees'], Subscriptionstagingmantle_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingmantle_originTransfer: InContextSdkMethod<Subscription['stagingmantle_originTransfer'], Subscriptionstagingmantle_originTransferArgs, MeshContext>,
  /** null **/
  stagingmantle_originTransfers: InContextSdkMethod<Subscription['stagingmantle_originTransfers'], Subscriptionstagingmantle_originTransfersArgs, MeshContext>,
  /** null **/
  stagingmantle_destinationTransfer: InContextSdkMethod<Subscription['stagingmantle_destinationTransfer'], Subscriptionstagingmantle_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingmantle_destinationTransfers: InContextSdkMethod<Subscription['stagingmantle_destinationTransfers'], Subscriptionstagingmantle_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingmantle_originMessage: InContextSdkMethod<Subscription['stagingmantle_originMessage'], Subscriptionstagingmantle_originMessageArgs, MeshContext>,
  /** null **/
  stagingmantle_originMessages: InContextSdkMethod<Subscription['stagingmantle_originMessages'], Subscriptionstagingmantle_originMessagesArgs, MeshContext>,
  /** null **/
  stagingmantle_aggregateRoot: InContextSdkMethod<Subscription['stagingmantle_aggregateRoot'], Subscriptionstagingmantle_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingmantle_aggregateRoots: InContextSdkMethod<Subscription['stagingmantle_aggregateRoots'], Subscriptionstagingmantle_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingmantle_connectorMeta: InContextSdkMethod<Subscription['stagingmantle_connectorMeta'], Subscriptionstagingmantle_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingmantle_connectorMetas: InContextSdkMethod<Subscription['stagingmantle_connectorMetas'], Subscriptionstagingmantle_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingmantle_rootCount: InContextSdkMethod<Subscription['stagingmantle_rootCount'], Subscriptionstagingmantle_rootCountArgs, MeshContext>,
  /** null **/
  stagingmantle_rootCounts: InContextSdkMethod<Subscription['stagingmantle_rootCounts'], Subscriptionstagingmantle_rootCountsArgs, MeshContext>,
  /** null **/
  stagingmantle_rootMessageSent: InContextSdkMethod<Subscription['stagingmantle_rootMessageSent'], Subscriptionstagingmantle_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingmantle_rootMessageSents: InContextSdkMethod<Subscription['stagingmantle_rootMessageSents'], Subscriptionstagingmantle_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingmantle_relayerFeesIncrease: InContextSdkMethod<Subscription['stagingmantle_relayerFeesIncrease'], Subscriptionstagingmantle_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingmantle_relayerFeesIncreases: InContextSdkMethod<Subscription['stagingmantle_relayerFeesIncreases'], Subscriptionstagingmantle_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingmantle_slippageUpdate: InContextSdkMethod<Subscription['stagingmantle_slippageUpdate'], Subscriptionstagingmantle_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingmantle_slippageUpdates: InContextSdkMethod<Subscription['stagingmantle_slippageUpdates'], Subscriptionstagingmantle_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingmantle_snapshotRoot: InContextSdkMethod<Subscription['stagingmantle_snapshotRoot'], Subscriptionstagingmantle_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingmantle_snapshotRoots: InContextSdkMethod<Subscription['stagingmantle_snapshotRoots'], Subscriptionstagingmantle_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingmantle_spokeConnectorMode: InContextSdkMethod<Subscription['stagingmantle_spokeConnectorMode'], Subscriptionstagingmantle_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingmantle_spokeConnectorModes: InContextSdkMethod<Subscription['stagingmantle_spokeConnectorModes'], Subscriptionstagingmantle_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingmantle_aggregateRootProposed: InContextSdkMethod<Subscription['stagingmantle_aggregateRootProposed'], Subscriptionstagingmantle_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingmantle_aggregateRootProposeds: InContextSdkMethod<Subscription['stagingmantle_aggregateRootProposeds'], Subscriptionstagingmantle_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingmantle_optimisticRootFinalized: InContextSdkMethod<Subscription['stagingmantle_optimisticRootFinalized'], Subscriptionstagingmantle_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingmantle_optimisticRootFinalizeds: InContextSdkMethod<Subscription['stagingmantle_optimisticRootFinalizeds'], Subscriptionstagingmantle_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingmantle__meta: InContextSdkMethod<Subscription['stagingmantle__meta'], Subscriptionstagingmantle__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Staging_Mantle"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
