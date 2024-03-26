// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextStagingAvalancheTypes {
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
  stagingavalanche_BigDecimal: any;
  BigInt: any;
  stagingavalanche_Bytes: any;
  stagingavalanche_Int8: any;
};

export type stagingavalanche_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['stagingavalanche_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type stagingavalanche_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingavalanche_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingavalanche_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
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
  _change_block?: InputMaybe<stagingavalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingavalanche_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingavalanche_AggregateRootProposed_filter>>>;
};

export type stagingavalanche_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type stagingavalanche_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingavalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingavalanche_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingavalanche_AggregateRoot_filter>>>;
};

export type stagingavalanche_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type stagingavalanche_Aggregation_interval =
  | 'hour'
  | 'day';

export type stagingavalanche_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['stagingavalanche_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingavalanche_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['stagingavalanche_Bytes']>;
  localAsset?: Maybe<Scalars['stagingavalanche_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingavalanche_AssetStatus>;
};

export type stagingavalanche_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: stagingavalanche_Router;
  asset: stagingavalanche_Asset;
  feesEarned: Scalars['BigInt'];
};

export type stagingavalanche_AssetBalance_filter = {
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
  router_?: InputMaybe<stagingavalanche_Router_filter>;
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
  asset_?: InputMaybe<stagingavalanche_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingavalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingavalanche_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingavalanche_AssetBalance_filter>>>;
};

export type stagingavalanche_AssetBalance_orderBy =
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

export type stagingavalanche_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type stagingavalanche_AssetStatus_filter = {
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
  _change_block?: InputMaybe<stagingavalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingavalanche_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingavalanche_AssetStatus_filter>>>;
};

export type stagingavalanche_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type stagingavalanche_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  key_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  key_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  key_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  key_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  key_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  key_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  localAsset?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
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
  status_?: InputMaybe<stagingavalanche_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingavalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingavalanche_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingavalanche_Asset_filter>>>;
};

export type stagingavalanche_Asset_orderBy =
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

export type stagingavalanche_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingavalanche_Block_height = {
  hash?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type stagingavalanche_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['stagingavalanche_Bytes']>;
  rootManager?: Maybe<Scalars['stagingavalanche_Bytes']>;
  mirrorConnector?: Maybe<Scalars['stagingavalanche_Bytes']>;
};

export type stagingavalanche_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingavalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingavalanche_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingavalanche_ConnectorMeta_filter>>>;
};

export type stagingavalanche_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingavalanche_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingavalanche_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingavalanche_TransferStatus>;
  routers?: Maybe<Array<stagingavalanche_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingavalanche_Bytes']>;
  delegate?: Maybe<Scalars['stagingavalanche_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingavalanche_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingavalanche_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingavalanche_Bytes']>;
  asset?: Maybe<stagingavalanche_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['stagingavalanche_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['stagingavalanche_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['stagingavalanche_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['stagingavalanche_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['stagingavalanche_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['stagingavalanche_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingavalanche_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_Router_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_Router_filter>;
};

export type stagingavalanche_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingavalanche_TransferStatus>;
  status_not?: InputMaybe<stagingavalanche_TransferStatus>;
  status_in?: InputMaybe<Array<stagingavalanche_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingavalanche_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<stagingavalanche_Router_filter>;
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
  to?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
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
  originSender?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
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
  asset_?: InputMaybe<stagingavalanche_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingavalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingavalanche_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingavalanche_DestinationTransfer_filter>>>;
};

export type stagingavalanche_DestinationTransfer_orderBy =
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

export type stagingavalanche_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingavalanche_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingavalanche_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
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
  _change_block?: InputMaybe<stagingavalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingavalanche_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingavalanche_OptimisticRootFinalized_filter>>>;
};

export type stagingavalanche_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type stagingavalanche_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingavalanche_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['stagingavalanche_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['stagingavalanche_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['stagingavalanche_Bytes']>;
  root?: Maybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingavalanche_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<stagingavalanche_RootCount>;
};

export type stagingavalanche_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  leaf_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  message_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  message_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  message_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  message_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  message_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  message_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
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
  rootCount_?: InputMaybe<stagingavalanche_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingavalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingavalanche_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingavalanche_OriginMessage_filter>>>;
};

export type stagingavalanche_OriginMessage_orderBy =
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

export type stagingavalanche_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingavalanche_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingavalanche_TransferStatus>;
  messageHash?: Maybe<Scalars['stagingavalanche_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingavalanche_Bytes']>;
  delegate?: Maybe<Scalars['stagingavalanche_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingavalanche_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingavalanche_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingavalanche_Bytes']>;
  asset?: Maybe<stagingavalanche_Asset>;
  transactingAsset?: Maybe<Scalars['stagingavalanche_Bytes']>;
  message?: Maybe<stagingavalanche_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<stagingavalanche_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['stagingavalanche_Bytes']>;
  caller?: Maybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingavalanche_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['stagingavalanche_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingavalanche_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_RelayerFee_filter>;
};

export type stagingavalanche_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingavalanche_TransferStatus>;
  status_not?: InputMaybe<stagingavalanche_TransferStatus>;
  status_in?: InputMaybe<Array<stagingavalanche_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingavalanche_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
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
  to?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
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
  asset_?: InputMaybe<stagingavalanche_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
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
  message_?: InputMaybe<stagingavalanche_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<stagingavalanche_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingavalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingavalanche_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingavalanche_OriginTransfer_filter>>>;
};

export type stagingavalanche_OriginTransfer_orderBy =
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
  stagingavalanche_asset?: Maybe<stagingavalanche_Asset>;
  stagingavalanche_assets: Array<stagingavalanche_Asset>;
  stagingavalanche_assetStatus?: Maybe<stagingavalanche_AssetStatus>;
  stagingavalanche_assetStatuses: Array<stagingavalanche_AssetStatus>;
  stagingavalanche_assetBalance?: Maybe<stagingavalanche_AssetBalance>;
  stagingavalanche_assetBalances: Array<stagingavalanche_AssetBalance>;
  stagingavalanche_router?: Maybe<stagingavalanche_Router>;
  stagingavalanche_routers: Array<stagingavalanche_Router>;
  stagingavalanche_routerDailyTVL?: Maybe<stagingavalanche_RouterDailyTVL>;
  stagingavalanche_routerDailyTVLs: Array<stagingavalanche_RouterDailyTVL>;
  stagingavalanche_routerLiquidityEvent?: Maybe<stagingavalanche_RouterLiquidityEvent>;
  stagingavalanche_routerLiquidityEvents: Array<stagingavalanche_RouterLiquidityEvent>;
  stagingavalanche_setting?: Maybe<stagingavalanche_Setting>;
  stagingavalanche_settings: Array<stagingavalanche_Setting>;
  stagingavalanche_relayer?: Maybe<stagingavalanche_Relayer>;
  stagingavalanche_relayers: Array<stagingavalanche_Relayer>;
  stagingavalanche_sequencer?: Maybe<stagingavalanche_Sequencer>;
  stagingavalanche_sequencers: Array<stagingavalanche_Sequencer>;
  stagingavalanche_relayerFee?: Maybe<stagingavalanche_RelayerFee>;
  stagingavalanche_relayerFees: Array<stagingavalanche_RelayerFee>;
  stagingavalanche_originTransfer?: Maybe<stagingavalanche_OriginTransfer>;
  stagingavalanche_originTransfers: Array<stagingavalanche_OriginTransfer>;
  stagingavalanche_destinationTransfer?: Maybe<stagingavalanche_DestinationTransfer>;
  stagingavalanche_destinationTransfers: Array<stagingavalanche_DestinationTransfer>;
  stagingavalanche_originMessage?: Maybe<stagingavalanche_OriginMessage>;
  stagingavalanche_originMessages: Array<stagingavalanche_OriginMessage>;
  stagingavalanche_aggregateRoot?: Maybe<stagingavalanche_AggregateRoot>;
  stagingavalanche_aggregateRoots: Array<stagingavalanche_AggregateRoot>;
  stagingavalanche_connectorMeta?: Maybe<stagingavalanche_ConnectorMeta>;
  stagingavalanche_connectorMetas: Array<stagingavalanche_ConnectorMeta>;
  stagingavalanche_rootCount?: Maybe<stagingavalanche_RootCount>;
  stagingavalanche_rootCounts: Array<stagingavalanche_RootCount>;
  stagingavalanche_rootMessageSent?: Maybe<stagingavalanche_RootMessageSent>;
  stagingavalanche_rootMessageSents: Array<stagingavalanche_RootMessageSent>;
  stagingavalanche_relayerFeesIncrease?: Maybe<stagingavalanche_RelayerFeesIncrease>;
  stagingavalanche_relayerFeesIncreases: Array<stagingavalanche_RelayerFeesIncrease>;
  stagingavalanche_slippageUpdate?: Maybe<stagingavalanche_SlippageUpdate>;
  stagingavalanche_slippageUpdates: Array<stagingavalanche_SlippageUpdate>;
  stagingavalanche_snapshotRoot?: Maybe<stagingavalanche_SnapshotRoot>;
  stagingavalanche_snapshotRoots: Array<stagingavalanche_SnapshotRoot>;
  stagingavalanche_spokeConnectorMode?: Maybe<stagingavalanche_SpokeConnectorMode>;
  stagingavalanche_spokeConnectorModes: Array<stagingavalanche_SpokeConnectorMode>;
  stagingavalanche_aggregateRootProposed?: Maybe<stagingavalanche_AggregateRootProposed>;
  stagingavalanche_aggregateRootProposeds: Array<stagingavalanche_AggregateRootProposed>;
  stagingavalanche_optimisticRootFinalized?: Maybe<stagingavalanche_OptimisticRootFinalized>;
  stagingavalanche_optimisticRootFinalizeds: Array<stagingavalanche_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingavalanche__meta?: Maybe<stagingavalanche__Meta_>;
};


export type Querystagingavalanche_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_Asset_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_AssetStatus_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_AssetBalance_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_Router_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_Router_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_Setting_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_Relayer_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_Sequencer_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_RelayerFee_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_OriginTransfer_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_DestinationTransfer_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_OriginMessage_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_AggregateRoot_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_ConnectorMeta_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_RootCount_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_RootMessageSent_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_SlippageUpdate_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_SnapshotRoot_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingavalanche__metaArgs = {
  block?: InputMaybe<stagingavalanche_Block_height>;
};

export type stagingavalanche_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['stagingavalanche_Bytes']>;
};

export type stagingavalanche_RelayerFee = {
  id: Scalars['ID'];
  transfer: stagingavalanche_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['stagingavalanche_Bytes'];
};

export type stagingavalanche_RelayerFee_filter = {
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
  transfer_?: InputMaybe<stagingavalanche_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingavalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingavalanche_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingavalanche_RelayerFee_filter>>>;
};

export type stagingavalanche_RelayerFee_orderBy =
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

export type stagingavalanche_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: stagingavalanche_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['stagingavalanche_Bytes']>;
  caller: Scalars['stagingavalanche_Bytes'];
  transactionHash: Scalars['stagingavalanche_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingavalanche_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<stagingavalanche_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
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
  _change_block?: InputMaybe<stagingavalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingavalanche_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingavalanche_RelayerFeesIncrease_filter>>>;
};

export type stagingavalanche_RelayerFeesIncrease_orderBy =
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

export type stagingavalanche_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  relayer_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingavalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingavalanche_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingavalanche_Relayer_filter>>>;
};

export type stagingavalanche_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type stagingavalanche_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type stagingavalanche_RootCount_filter = {
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
  _change_block?: InputMaybe<stagingavalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingavalanche_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingavalanche_RootCount_filter>>>;
};

export type stagingavalanche_RootCount_orderBy =
  | 'id'
  | 'count';

export type stagingavalanche_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['stagingavalanche_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingavalanche_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingavalanche_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
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
  _change_block?: InputMaybe<stagingavalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingavalanche_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingavalanche_RootMessageSent_filter>>>;
};

export type stagingavalanche_RootMessageSent_orderBy =
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

export type stagingavalanche_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['stagingavalanche_Bytes']>;
  recipient?: Maybe<Scalars['stagingavalanche_Bytes']>;
  proposedOwner?: Maybe<Scalars['stagingavalanche_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<stagingavalanche_AssetBalance>;
};


export type stagingavalanche_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_AssetBalance_filter>;
};

export type stagingavalanche_RouterDailyTVL = {
  id: Scalars['ID'];
  router: stagingavalanche_Router;
  asset: stagingavalanche_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type stagingavalanche_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<stagingavalanche_Router_filter>;
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
  asset_?: InputMaybe<stagingavalanche_Asset_filter>;
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
  _change_block?: InputMaybe<stagingavalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingavalanche_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingavalanche_RouterDailyTVL_filter>>>;
};

export type stagingavalanche_RouterDailyTVL_orderBy =
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

export type stagingavalanche_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<stagingavalanche_RouterLiquidityEventType>;
  router: stagingavalanche_Router;
  asset: stagingavalanche_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['stagingavalanche_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['stagingavalanche_Bytes'];
  nonce: Scalars['BigInt'];
};

export type stagingavalanche_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type stagingavalanche_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<stagingavalanche_RouterLiquidityEventType>;
  type_not?: InputMaybe<stagingavalanche_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<stagingavalanche_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<stagingavalanche_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<stagingavalanche_Router_filter>;
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
  asset_?: InputMaybe<stagingavalanche_Asset_filter>;
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
  caller?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingavalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingavalanche_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingavalanche_RouterLiquidityEvent_filter>>>;
};

export type stagingavalanche_RouterLiquidityEvent_orderBy =
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

export type stagingavalanche_Router_filter = {
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
  owner?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  owner_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  owner_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  owner_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  owner_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  owner_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  recipient?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  recipient_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<stagingavalanche_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingavalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingavalanche_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingavalanche_Router_filter>>>;
};

export type stagingavalanche_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type stagingavalanche_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['stagingavalanche_Bytes']>;
};

export type stagingavalanche_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingavalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingavalanche_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingavalanche_Sequencer_filter>>>;
};

export type stagingavalanche_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type stagingavalanche_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['stagingavalanche_Bytes'];
};

export type stagingavalanche_Setting_filter = {
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
  caller?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingavalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingavalanche_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingavalanche_Setting_filter>>>;
};

export type stagingavalanche_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type stagingavalanche_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: stagingavalanche_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['stagingavalanche_Bytes'];
  transactionHash: Scalars['stagingavalanche_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingavalanche_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<stagingavalanche_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
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
  _change_block?: InputMaybe<stagingavalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingavalanche_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingavalanche_SlippageUpdate_filter>>>;
};

export type stagingavalanche_SlippageUpdate_orderBy =
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

export type stagingavalanche_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['stagingavalanche_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingavalanche_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingavalanche_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingavalanche_Bytes']>;
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
  _change_block?: InputMaybe<stagingavalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingavalanche_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingavalanche_SnapshotRoot_filter>>>;
};

export type stagingavalanche_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type stagingavalanche_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type stagingavalanche_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<stagingavalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingavalanche_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingavalanche_SpokeConnectorMode_filter>>>;
};

export type stagingavalanche_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  stagingavalanche_asset?: Maybe<stagingavalanche_Asset>;
  stagingavalanche_assets: Array<stagingavalanche_Asset>;
  stagingavalanche_assetStatus?: Maybe<stagingavalanche_AssetStatus>;
  stagingavalanche_assetStatuses: Array<stagingavalanche_AssetStatus>;
  stagingavalanche_assetBalance?: Maybe<stagingavalanche_AssetBalance>;
  stagingavalanche_assetBalances: Array<stagingavalanche_AssetBalance>;
  stagingavalanche_router?: Maybe<stagingavalanche_Router>;
  stagingavalanche_routers: Array<stagingavalanche_Router>;
  stagingavalanche_routerDailyTVL?: Maybe<stagingavalanche_RouterDailyTVL>;
  stagingavalanche_routerDailyTVLs: Array<stagingavalanche_RouterDailyTVL>;
  stagingavalanche_routerLiquidityEvent?: Maybe<stagingavalanche_RouterLiquidityEvent>;
  stagingavalanche_routerLiquidityEvents: Array<stagingavalanche_RouterLiquidityEvent>;
  stagingavalanche_setting?: Maybe<stagingavalanche_Setting>;
  stagingavalanche_settings: Array<stagingavalanche_Setting>;
  stagingavalanche_relayer?: Maybe<stagingavalanche_Relayer>;
  stagingavalanche_relayers: Array<stagingavalanche_Relayer>;
  stagingavalanche_sequencer?: Maybe<stagingavalanche_Sequencer>;
  stagingavalanche_sequencers: Array<stagingavalanche_Sequencer>;
  stagingavalanche_relayerFee?: Maybe<stagingavalanche_RelayerFee>;
  stagingavalanche_relayerFees: Array<stagingavalanche_RelayerFee>;
  stagingavalanche_originTransfer?: Maybe<stagingavalanche_OriginTransfer>;
  stagingavalanche_originTransfers: Array<stagingavalanche_OriginTransfer>;
  stagingavalanche_destinationTransfer?: Maybe<stagingavalanche_DestinationTransfer>;
  stagingavalanche_destinationTransfers: Array<stagingavalanche_DestinationTransfer>;
  stagingavalanche_originMessage?: Maybe<stagingavalanche_OriginMessage>;
  stagingavalanche_originMessages: Array<stagingavalanche_OriginMessage>;
  stagingavalanche_aggregateRoot?: Maybe<stagingavalanche_AggregateRoot>;
  stagingavalanche_aggregateRoots: Array<stagingavalanche_AggregateRoot>;
  stagingavalanche_connectorMeta?: Maybe<stagingavalanche_ConnectorMeta>;
  stagingavalanche_connectorMetas: Array<stagingavalanche_ConnectorMeta>;
  stagingavalanche_rootCount?: Maybe<stagingavalanche_RootCount>;
  stagingavalanche_rootCounts: Array<stagingavalanche_RootCount>;
  stagingavalanche_rootMessageSent?: Maybe<stagingavalanche_RootMessageSent>;
  stagingavalanche_rootMessageSents: Array<stagingavalanche_RootMessageSent>;
  stagingavalanche_relayerFeesIncrease?: Maybe<stagingavalanche_RelayerFeesIncrease>;
  stagingavalanche_relayerFeesIncreases: Array<stagingavalanche_RelayerFeesIncrease>;
  stagingavalanche_slippageUpdate?: Maybe<stagingavalanche_SlippageUpdate>;
  stagingavalanche_slippageUpdates: Array<stagingavalanche_SlippageUpdate>;
  stagingavalanche_snapshotRoot?: Maybe<stagingavalanche_SnapshotRoot>;
  stagingavalanche_snapshotRoots: Array<stagingavalanche_SnapshotRoot>;
  stagingavalanche_spokeConnectorMode?: Maybe<stagingavalanche_SpokeConnectorMode>;
  stagingavalanche_spokeConnectorModes: Array<stagingavalanche_SpokeConnectorMode>;
  stagingavalanche_aggregateRootProposed?: Maybe<stagingavalanche_AggregateRootProposed>;
  stagingavalanche_aggregateRootProposeds: Array<stagingavalanche_AggregateRootProposed>;
  stagingavalanche_optimisticRootFinalized?: Maybe<stagingavalanche_OptimisticRootFinalized>;
  stagingavalanche_optimisticRootFinalizeds: Array<stagingavalanche_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingavalanche__meta?: Maybe<stagingavalanche__Meta_>;
};


export type Subscriptionstagingavalanche_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_Asset_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_AssetStatus_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_AssetBalance_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_Router_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_Router_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_Setting_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_Relayer_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_Sequencer_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_RelayerFee_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_OriginTransfer_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_DestinationTransfer_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_OriginMessage_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_AggregateRoot_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_ConnectorMeta_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_RootCount_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_RootMessageSent_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_SlippageUpdate_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_SnapshotRoot_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingavalanche_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingavalanche_OrderDirection>;
  where?: InputMaybe<stagingavalanche_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingavalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingavalanche__metaArgs = {
  block?: InputMaybe<stagingavalanche_Block_height>;
};

export type stagingavalanche_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type stagingavalanche__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingavalanche_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['stagingavalanche_Bytes']>;
};

/** The type for the top-level _meta field */
export type stagingavalanche__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingavalanche__Block_;
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
  stagingavalanche_asset: InContextSdkMethod<Query['stagingavalanche_asset'], Querystagingavalanche_assetArgs, MeshContext>,
  /** null **/
  stagingavalanche_assets: InContextSdkMethod<Query['stagingavalanche_assets'], Querystagingavalanche_assetsArgs, MeshContext>,
  /** null **/
  stagingavalanche_assetStatus: InContextSdkMethod<Query['stagingavalanche_assetStatus'], Querystagingavalanche_assetStatusArgs, MeshContext>,
  /** null **/
  stagingavalanche_assetStatuses: InContextSdkMethod<Query['stagingavalanche_assetStatuses'], Querystagingavalanche_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingavalanche_assetBalance: InContextSdkMethod<Query['stagingavalanche_assetBalance'], Querystagingavalanche_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingavalanche_assetBalances: InContextSdkMethod<Query['stagingavalanche_assetBalances'], Querystagingavalanche_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingavalanche_router: InContextSdkMethod<Query['stagingavalanche_router'], Querystagingavalanche_routerArgs, MeshContext>,
  /** null **/
  stagingavalanche_routers: InContextSdkMethod<Query['stagingavalanche_routers'], Querystagingavalanche_routersArgs, MeshContext>,
  /** null **/
  stagingavalanche_routerDailyTVL: InContextSdkMethod<Query['stagingavalanche_routerDailyTVL'], Querystagingavalanche_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingavalanche_routerDailyTVLs: InContextSdkMethod<Query['stagingavalanche_routerDailyTVLs'], Querystagingavalanche_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingavalanche_routerLiquidityEvent: InContextSdkMethod<Query['stagingavalanche_routerLiquidityEvent'], Querystagingavalanche_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingavalanche_routerLiquidityEvents: InContextSdkMethod<Query['stagingavalanche_routerLiquidityEvents'], Querystagingavalanche_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingavalanche_setting: InContextSdkMethod<Query['stagingavalanche_setting'], Querystagingavalanche_settingArgs, MeshContext>,
  /** null **/
  stagingavalanche_settings: InContextSdkMethod<Query['stagingavalanche_settings'], Querystagingavalanche_settingsArgs, MeshContext>,
  /** null **/
  stagingavalanche_relayer: InContextSdkMethod<Query['stagingavalanche_relayer'], Querystagingavalanche_relayerArgs, MeshContext>,
  /** null **/
  stagingavalanche_relayers: InContextSdkMethod<Query['stagingavalanche_relayers'], Querystagingavalanche_relayersArgs, MeshContext>,
  /** null **/
  stagingavalanche_sequencer: InContextSdkMethod<Query['stagingavalanche_sequencer'], Querystagingavalanche_sequencerArgs, MeshContext>,
  /** null **/
  stagingavalanche_sequencers: InContextSdkMethod<Query['stagingavalanche_sequencers'], Querystagingavalanche_sequencersArgs, MeshContext>,
  /** null **/
  stagingavalanche_relayerFee: InContextSdkMethod<Query['stagingavalanche_relayerFee'], Querystagingavalanche_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingavalanche_relayerFees: InContextSdkMethod<Query['stagingavalanche_relayerFees'], Querystagingavalanche_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingavalanche_originTransfer: InContextSdkMethod<Query['stagingavalanche_originTransfer'], Querystagingavalanche_originTransferArgs, MeshContext>,
  /** null **/
  stagingavalanche_originTransfers: InContextSdkMethod<Query['stagingavalanche_originTransfers'], Querystagingavalanche_originTransfersArgs, MeshContext>,
  /** null **/
  stagingavalanche_destinationTransfer: InContextSdkMethod<Query['stagingavalanche_destinationTransfer'], Querystagingavalanche_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingavalanche_destinationTransfers: InContextSdkMethod<Query['stagingavalanche_destinationTransfers'], Querystagingavalanche_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingavalanche_originMessage: InContextSdkMethod<Query['stagingavalanche_originMessage'], Querystagingavalanche_originMessageArgs, MeshContext>,
  /** null **/
  stagingavalanche_originMessages: InContextSdkMethod<Query['stagingavalanche_originMessages'], Querystagingavalanche_originMessagesArgs, MeshContext>,
  /** null **/
  stagingavalanche_aggregateRoot: InContextSdkMethod<Query['stagingavalanche_aggregateRoot'], Querystagingavalanche_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingavalanche_aggregateRoots: InContextSdkMethod<Query['stagingavalanche_aggregateRoots'], Querystagingavalanche_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingavalanche_connectorMeta: InContextSdkMethod<Query['stagingavalanche_connectorMeta'], Querystagingavalanche_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingavalanche_connectorMetas: InContextSdkMethod<Query['stagingavalanche_connectorMetas'], Querystagingavalanche_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingavalanche_rootCount: InContextSdkMethod<Query['stagingavalanche_rootCount'], Querystagingavalanche_rootCountArgs, MeshContext>,
  /** null **/
  stagingavalanche_rootCounts: InContextSdkMethod<Query['stagingavalanche_rootCounts'], Querystagingavalanche_rootCountsArgs, MeshContext>,
  /** null **/
  stagingavalanche_rootMessageSent: InContextSdkMethod<Query['stagingavalanche_rootMessageSent'], Querystagingavalanche_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingavalanche_rootMessageSents: InContextSdkMethod<Query['stagingavalanche_rootMessageSents'], Querystagingavalanche_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingavalanche_relayerFeesIncrease: InContextSdkMethod<Query['stagingavalanche_relayerFeesIncrease'], Querystagingavalanche_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingavalanche_relayerFeesIncreases: InContextSdkMethod<Query['stagingavalanche_relayerFeesIncreases'], Querystagingavalanche_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingavalanche_slippageUpdate: InContextSdkMethod<Query['stagingavalanche_slippageUpdate'], Querystagingavalanche_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingavalanche_slippageUpdates: InContextSdkMethod<Query['stagingavalanche_slippageUpdates'], Querystagingavalanche_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingavalanche_snapshotRoot: InContextSdkMethod<Query['stagingavalanche_snapshotRoot'], Querystagingavalanche_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingavalanche_snapshotRoots: InContextSdkMethod<Query['stagingavalanche_snapshotRoots'], Querystagingavalanche_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingavalanche_spokeConnectorMode: InContextSdkMethod<Query['stagingavalanche_spokeConnectorMode'], Querystagingavalanche_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingavalanche_spokeConnectorModes: InContextSdkMethod<Query['stagingavalanche_spokeConnectorModes'], Querystagingavalanche_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingavalanche_aggregateRootProposed: InContextSdkMethod<Query['stagingavalanche_aggregateRootProposed'], Querystagingavalanche_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingavalanche_aggregateRootProposeds: InContextSdkMethod<Query['stagingavalanche_aggregateRootProposeds'], Querystagingavalanche_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingavalanche_optimisticRootFinalized: InContextSdkMethod<Query['stagingavalanche_optimisticRootFinalized'], Querystagingavalanche_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingavalanche_optimisticRootFinalizeds: InContextSdkMethod<Query['stagingavalanche_optimisticRootFinalizeds'], Querystagingavalanche_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingavalanche__meta: InContextSdkMethod<Query['stagingavalanche__meta'], Querystagingavalanche__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  stagingavalanche_asset: InContextSdkMethod<Subscription['stagingavalanche_asset'], Subscriptionstagingavalanche_assetArgs, MeshContext>,
  /** null **/
  stagingavalanche_assets: InContextSdkMethod<Subscription['stagingavalanche_assets'], Subscriptionstagingavalanche_assetsArgs, MeshContext>,
  /** null **/
  stagingavalanche_assetStatus: InContextSdkMethod<Subscription['stagingavalanche_assetStatus'], Subscriptionstagingavalanche_assetStatusArgs, MeshContext>,
  /** null **/
  stagingavalanche_assetStatuses: InContextSdkMethod<Subscription['stagingavalanche_assetStatuses'], Subscriptionstagingavalanche_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingavalanche_assetBalance: InContextSdkMethod<Subscription['stagingavalanche_assetBalance'], Subscriptionstagingavalanche_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingavalanche_assetBalances: InContextSdkMethod<Subscription['stagingavalanche_assetBalances'], Subscriptionstagingavalanche_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingavalanche_router: InContextSdkMethod<Subscription['stagingavalanche_router'], Subscriptionstagingavalanche_routerArgs, MeshContext>,
  /** null **/
  stagingavalanche_routers: InContextSdkMethod<Subscription['stagingavalanche_routers'], Subscriptionstagingavalanche_routersArgs, MeshContext>,
  /** null **/
  stagingavalanche_routerDailyTVL: InContextSdkMethod<Subscription['stagingavalanche_routerDailyTVL'], Subscriptionstagingavalanche_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingavalanche_routerDailyTVLs: InContextSdkMethod<Subscription['stagingavalanche_routerDailyTVLs'], Subscriptionstagingavalanche_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingavalanche_routerLiquidityEvent: InContextSdkMethod<Subscription['stagingavalanche_routerLiquidityEvent'], Subscriptionstagingavalanche_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingavalanche_routerLiquidityEvents: InContextSdkMethod<Subscription['stagingavalanche_routerLiquidityEvents'], Subscriptionstagingavalanche_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingavalanche_setting: InContextSdkMethod<Subscription['stagingavalanche_setting'], Subscriptionstagingavalanche_settingArgs, MeshContext>,
  /** null **/
  stagingavalanche_settings: InContextSdkMethod<Subscription['stagingavalanche_settings'], Subscriptionstagingavalanche_settingsArgs, MeshContext>,
  /** null **/
  stagingavalanche_relayer: InContextSdkMethod<Subscription['stagingavalanche_relayer'], Subscriptionstagingavalanche_relayerArgs, MeshContext>,
  /** null **/
  stagingavalanche_relayers: InContextSdkMethod<Subscription['stagingavalanche_relayers'], Subscriptionstagingavalanche_relayersArgs, MeshContext>,
  /** null **/
  stagingavalanche_sequencer: InContextSdkMethod<Subscription['stagingavalanche_sequencer'], Subscriptionstagingavalanche_sequencerArgs, MeshContext>,
  /** null **/
  stagingavalanche_sequencers: InContextSdkMethod<Subscription['stagingavalanche_sequencers'], Subscriptionstagingavalanche_sequencersArgs, MeshContext>,
  /** null **/
  stagingavalanche_relayerFee: InContextSdkMethod<Subscription['stagingavalanche_relayerFee'], Subscriptionstagingavalanche_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingavalanche_relayerFees: InContextSdkMethod<Subscription['stagingavalanche_relayerFees'], Subscriptionstagingavalanche_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingavalanche_originTransfer: InContextSdkMethod<Subscription['stagingavalanche_originTransfer'], Subscriptionstagingavalanche_originTransferArgs, MeshContext>,
  /** null **/
  stagingavalanche_originTransfers: InContextSdkMethod<Subscription['stagingavalanche_originTransfers'], Subscriptionstagingavalanche_originTransfersArgs, MeshContext>,
  /** null **/
  stagingavalanche_destinationTransfer: InContextSdkMethod<Subscription['stagingavalanche_destinationTransfer'], Subscriptionstagingavalanche_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingavalanche_destinationTransfers: InContextSdkMethod<Subscription['stagingavalanche_destinationTransfers'], Subscriptionstagingavalanche_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingavalanche_originMessage: InContextSdkMethod<Subscription['stagingavalanche_originMessage'], Subscriptionstagingavalanche_originMessageArgs, MeshContext>,
  /** null **/
  stagingavalanche_originMessages: InContextSdkMethod<Subscription['stagingavalanche_originMessages'], Subscriptionstagingavalanche_originMessagesArgs, MeshContext>,
  /** null **/
  stagingavalanche_aggregateRoot: InContextSdkMethod<Subscription['stagingavalanche_aggregateRoot'], Subscriptionstagingavalanche_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingavalanche_aggregateRoots: InContextSdkMethod<Subscription['stagingavalanche_aggregateRoots'], Subscriptionstagingavalanche_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingavalanche_connectorMeta: InContextSdkMethod<Subscription['stagingavalanche_connectorMeta'], Subscriptionstagingavalanche_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingavalanche_connectorMetas: InContextSdkMethod<Subscription['stagingavalanche_connectorMetas'], Subscriptionstagingavalanche_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingavalanche_rootCount: InContextSdkMethod<Subscription['stagingavalanche_rootCount'], Subscriptionstagingavalanche_rootCountArgs, MeshContext>,
  /** null **/
  stagingavalanche_rootCounts: InContextSdkMethod<Subscription['stagingavalanche_rootCounts'], Subscriptionstagingavalanche_rootCountsArgs, MeshContext>,
  /** null **/
  stagingavalanche_rootMessageSent: InContextSdkMethod<Subscription['stagingavalanche_rootMessageSent'], Subscriptionstagingavalanche_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingavalanche_rootMessageSents: InContextSdkMethod<Subscription['stagingavalanche_rootMessageSents'], Subscriptionstagingavalanche_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingavalanche_relayerFeesIncrease: InContextSdkMethod<Subscription['stagingavalanche_relayerFeesIncrease'], Subscriptionstagingavalanche_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingavalanche_relayerFeesIncreases: InContextSdkMethod<Subscription['stagingavalanche_relayerFeesIncreases'], Subscriptionstagingavalanche_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingavalanche_slippageUpdate: InContextSdkMethod<Subscription['stagingavalanche_slippageUpdate'], Subscriptionstagingavalanche_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingavalanche_slippageUpdates: InContextSdkMethod<Subscription['stagingavalanche_slippageUpdates'], Subscriptionstagingavalanche_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingavalanche_snapshotRoot: InContextSdkMethod<Subscription['stagingavalanche_snapshotRoot'], Subscriptionstagingavalanche_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingavalanche_snapshotRoots: InContextSdkMethod<Subscription['stagingavalanche_snapshotRoots'], Subscriptionstagingavalanche_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingavalanche_spokeConnectorMode: InContextSdkMethod<Subscription['stagingavalanche_spokeConnectorMode'], Subscriptionstagingavalanche_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingavalanche_spokeConnectorModes: InContextSdkMethod<Subscription['stagingavalanche_spokeConnectorModes'], Subscriptionstagingavalanche_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingavalanche_aggregateRootProposed: InContextSdkMethod<Subscription['stagingavalanche_aggregateRootProposed'], Subscriptionstagingavalanche_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingavalanche_aggregateRootProposeds: InContextSdkMethod<Subscription['stagingavalanche_aggregateRootProposeds'], Subscriptionstagingavalanche_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingavalanche_optimisticRootFinalized: InContextSdkMethod<Subscription['stagingavalanche_optimisticRootFinalized'], Subscriptionstagingavalanche_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingavalanche_optimisticRootFinalizeds: InContextSdkMethod<Subscription['stagingavalanche_optimisticRootFinalizeds'], Subscriptionstagingavalanche_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingavalanche__meta: InContextSdkMethod<Subscription['stagingavalanche__meta'], Subscriptionstagingavalanche__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Staging_Avalanche"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
