// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextStagingMainnetTypes {
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
  stagingmainnet_BigDecimal: any;
  BigInt: any;
  stagingmainnet_Bytes: any;
  stagingmainnet_Int8: any;
};

export type stagingmainnet_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['stagingmainnet_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type stagingmainnet_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingmainnet_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingmainnet_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_AggregateRootProposed_filter>>>;
};

export type stagingmainnet_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type stagingmainnet_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_AggregateRoot_filter>>>;
};

export type stagingmainnet_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type stagingmainnet_Aggregation_interval =
  | 'hour'
  | 'day';

export type stagingmainnet_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['stagingmainnet_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingmainnet_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['stagingmainnet_Bytes']>;
  localAsset?: Maybe<Scalars['stagingmainnet_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingmainnet_AssetStatus>;
};

export type stagingmainnet_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: stagingmainnet_Router;
  asset: stagingmainnet_Asset;
  feesEarned: Scalars['BigInt'];
};

export type stagingmainnet_AssetBalance_filter = {
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
  router_?: InputMaybe<stagingmainnet_Router_filter>;
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
  asset_?: InputMaybe<stagingmainnet_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_AssetBalance_filter>>>;
};

export type stagingmainnet_AssetBalance_orderBy =
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

export type stagingmainnet_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type stagingmainnet_AssetStatus_filter = {
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
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_AssetStatus_filter>>>;
};

export type stagingmainnet_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type stagingmainnet_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  key_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  key_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  key_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  key_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  key_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  key_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  localAsset?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  status_?: InputMaybe<stagingmainnet_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_Asset_filter>>>;
};

export type stagingmainnet_Asset_orderBy =
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

export type stagingmainnet_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingmainnet_Block_height = {
  hash?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type stagingmainnet_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['stagingmainnet_Bytes']>;
  rootManager?: Maybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector?: Maybe<Scalars['stagingmainnet_Bytes']>;
};

export type stagingmainnet_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_ConnectorMeta_filter>>>;
};

export type stagingmainnet_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingmainnet_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingmainnet_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingmainnet_TransferStatus>;
  routers?: Maybe<Array<stagingmainnet_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingmainnet_Bytes']>;
  delegate?: Maybe<Scalars['stagingmainnet_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingmainnet_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingmainnet_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingmainnet_Bytes']>;
  asset?: Maybe<stagingmainnet_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['stagingmainnet_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['stagingmainnet_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['stagingmainnet_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['stagingmainnet_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['stagingmainnet_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['stagingmainnet_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingmainnet_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_Router_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_Router_filter>;
};

export type stagingmainnet_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingmainnet_TransferStatus>;
  status_not?: InputMaybe<stagingmainnet_TransferStatus>;
  status_in?: InputMaybe<Array<stagingmainnet_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingmainnet_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<stagingmainnet_Router_filter>;
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
  to?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  originSender?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  asset_?: InputMaybe<stagingmainnet_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_DestinationTransfer_filter>>>;
};

export type stagingmainnet_DestinationTransfer_orderBy =
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

export type stagingmainnet_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingmainnet_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingmainnet_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_OptimisticRootFinalized_filter>>>;
};

export type stagingmainnet_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type stagingmainnet_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingmainnet_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['stagingmainnet_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['stagingmainnet_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['stagingmainnet_Bytes']>;
  root?: Maybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingmainnet_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<stagingmainnet_RootCount>;
};

export type stagingmainnet_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  leaf_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  message_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  message_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  message_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  message_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  message_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  message_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  rootCount_?: InputMaybe<stagingmainnet_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_OriginMessage_filter>>>;
};

export type stagingmainnet_OriginMessage_orderBy =
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

export type stagingmainnet_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingmainnet_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingmainnet_TransferStatus>;
  messageHash?: Maybe<Scalars['stagingmainnet_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingmainnet_Bytes']>;
  delegate?: Maybe<Scalars['stagingmainnet_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingmainnet_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingmainnet_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingmainnet_Bytes']>;
  asset?: Maybe<stagingmainnet_Asset>;
  transactingAsset?: Maybe<Scalars['stagingmainnet_Bytes']>;
  message?: Maybe<stagingmainnet_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<stagingmainnet_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['stagingmainnet_Bytes']>;
  caller?: Maybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingmainnet_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['stagingmainnet_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingmainnet_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_RelayerFee_filter>;
};

export type stagingmainnet_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingmainnet_TransferStatus>;
  status_not?: InputMaybe<stagingmainnet_TransferStatus>;
  status_in?: InputMaybe<Array<stagingmainnet_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingmainnet_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  to?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  asset_?: InputMaybe<stagingmainnet_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  message_?: InputMaybe<stagingmainnet_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<stagingmainnet_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_OriginTransfer_filter>>>;
};

export type stagingmainnet_OriginTransfer_orderBy =
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
  stagingmainnet_asset?: Maybe<stagingmainnet_Asset>;
  stagingmainnet_assets: Array<stagingmainnet_Asset>;
  stagingmainnet_assetStatus?: Maybe<stagingmainnet_AssetStatus>;
  stagingmainnet_assetStatuses: Array<stagingmainnet_AssetStatus>;
  stagingmainnet_assetBalance?: Maybe<stagingmainnet_AssetBalance>;
  stagingmainnet_assetBalances: Array<stagingmainnet_AssetBalance>;
  stagingmainnet_router?: Maybe<stagingmainnet_Router>;
  stagingmainnet_routers: Array<stagingmainnet_Router>;
  stagingmainnet_routerDailyTVL?: Maybe<stagingmainnet_RouterDailyTVL>;
  stagingmainnet_routerDailyTVLs: Array<stagingmainnet_RouterDailyTVL>;
  stagingmainnet_routerLiquidityEvent?: Maybe<stagingmainnet_RouterLiquidityEvent>;
  stagingmainnet_routerLiquidityEvents: Array<stagingmainnet_RouterLiquidityEvent>;
  stagingmainnet_setting?: Maybe<stagingmainnet_Setting>;
  stagingmainnet_settings: Array<stagingmainnet_Setting>;
  stagingmainnet_relayer?: Maybe<stagingmainnet_Relayer>;
  stagingmainnet_relayers: Array<stagingmainnet_Relayer>;
  stagingmainnet_sequencer?: Maybe<stagingmainnet_Sequencer>;
  stagingmainnet_sequencers: Array<stagingmainnet_Sequencer>;
  stagingmainnet_relayerFee?: Maybe<stagingmainnet_RelayerFee>;
  stagingmainnet_relayerFees: Array<stagingmainnet_RelayerFee>;
  stagingmainnet_originTransfer?: Maybe<stagingmainnet_OriginTransfer>;
  stagingmainnet_originTransfers: Array<stagingmainnet_OriginTransfer>;
  stagingmainnet_destinationTransfer?: Maybe<stagingmainnet_DestinationTransfer>;
  stagingmainnet_destinationTransfers: Array<stagingmainnet_DestinationTransfer>;
  stagingmainnet_originMessage?: Maybe<stagingmainnet_OriginMessage>;
  stagingmainnet_originMessages: Array<stagingmainnet_OriginMessage>;
  stagingmainnet_aggregateRoot?: Maybe<stagingmainnet_AggregateRoot>;
  stagingmainnet_aggregateRoots: Array<stagingmainnet_AggregateRoot>;
  stagingmainnet_connectorMeta?: Maybe<stagingmainnet_ConnectorMeta>;
  stagingmainnet_connectorMetas: Array<stagingmainnet_ConnectorMeta>;
  stagingmainnet_rootCount?: Maybe<stagingmainnet_RootCount>;
  stagingmainnet_rootCounts: Array<stagingmainnet_RootCount>;
  stagingmainnet_rootMessageSent?: Maybe<stagingmainnet_RootMessageSent>;
  stagingmainnet_rootMessageSents: Array<stagingmainnet_RootMessageSent>;
  stagingmainnet_relayerFeesIncrease?: Maybe<stagingmainnet_RelayerFeesIncrease>;
  stagingmainnet_relayerFeesIncreases: Array<stagingmainnet_RelayerFeesIncrease>;
  stagingmainnet_slippageUpdate?: Maybe<stagingmainnet_SlippageUpdate>;
  stagingmainnet_slippageUpdates: Array<stagingmainnet_SlippageUpdate>;
  stagingmainnet_snapshotRoot?: Maybe<stagingmainnet_SnapshotRoot>;
  stagingmainnet_snapshotRoots: Array<stagingmainnet_SnapshotRoot>;
  stagingmainnet_spokeConnectorMode?: Maybe<stagingmainnet_SpokeConnectorMode>;
  stagingmainnet_spokeConnectorModes: Array<stagingmainnet_SpokeConnectorMode>;
  stagingmainnet_aggregateRootProposed?: Maybe<stagingmainnet_AggregateRootProposed>;
  stagingmainnet_aggregateRootProposeds: Array<stagingmainnet_AggregateRootProposed>;
  stagingmainnet_optimisticRootFinalized?: Maybe<stagingmainnet_OptimisticRootFinalized>;
  stagingmainnet_optimisticRootFinalizeds: Array<stagingmainnet_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingmainnet__meta?: Maybe<stagingmainnet__Meta_>;
};


export type Querystagingmainnet_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_Asset_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_AssetStatus_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_AssetBalance_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_Router_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_Router_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_Setting_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_Relayer_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_Sequencer_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_RelayerFee_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_OriginTransfer_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_DestinationTransfer_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_OriginMessage_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_AggregateRoot_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_ConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_RootCount_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_RootMessageSent_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_SlippageUpdate_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_SnapshotRoot_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet__metaArgs = {
  block?: InputMaybe<stagingmainnet_Block_height>;
};

export type stagingmainnet_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['stagingmainnet_Bytes']>;
};

export type stagingmainnet_RelayerFee = {
  id: Scalars['ID'];
  transfer: stagingmainnet_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['stagingmainnet_Bytes'];
};

export type stagingmainnet_RelayerFee_filter = {
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
  transfer_?: InputMaybe<stagingmainnet_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_RelayerFee_filter>>>;
};

export type stagingmainnet_RelayerFee_orderBy =
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

export type stagingmainnet_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: stagingmainnet_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['stagingmainnet_Bytes']>;
  caller: Scalars['stagingmainnet_Bytes'];
  transactionHash: Scalars['stagingmainnet_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingmainnet_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<stagingmainnet_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_RelayerFeesIncrease_filter>>>;
};

export type stagingmainnet_RelayerFeesIncrease_orderBy =
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

export type stagingmainnet_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  relayer_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_Relayer_filter>>>;
};

export type stagingmainnet_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type stagingmainnet_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type stagingmainnet_RootCount_filter = {
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
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_RootCount_filter>>>;
};

export type stagingmainnet_RootCount_orderBy =
  | 'id'
  | 'count';

export type stagingmainnet_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['stagingmainnet_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingmainnet_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingmainnet_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_RootMessageSent_filter>>>;
};

export type stagingmainnet_RootMessageSent_orderBy =
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

export type stagingmainnet_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['stagingmainnet_Bytes']>;
  recipient?: Maybe<Scalars['stagingmainnet_Bytes']>;
  proposedOwner?: Maybe<Scalars['stagingmainnet_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<stagingmainnet_AssetBalance>;
};


export type stagingmainnet_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_AssetBalance_filter>;
};

export type stagingmainnet_RouterDailyTVL = {
  id: Scalars['ID'];
  router: stagingmainnet_Router;
  asset: stagingmainnet_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type stagingmainnet_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<stagingmainnet_Router_filter>;
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
  asset_?: InputMaybe<stagingmainnet_Asset_filter>;
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
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_RouterDailyTVL_filter>>>;
};

export type stagingmainnet_RouterDailyTVL_orderBy =
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

export type stagingmainnet_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<stagingmainnet_RouterLiquidityEventType>;
  router: stagingmainnet_Router;
  asset: stagingmainnet_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['stagingmainnet_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['stagingmainnet_Bytes'];
  nonce: Scalars['BigInt'];
};

export type stagingmainnet_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type stagingmainnet_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<stagingmainnet_RouterLiquidityEventType>;
  type_not?: InputMaybe<stagingmainnet_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<stagingmainnet_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<stagingmainnet_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<stagingmainnet_Router_filter>;
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
  asset_?: InputMaybe<stagingmainnet_Asset_filter>;
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
  caller?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_RouterLiquidityEvent_filter>>>;
};

export type stagingmainnet_RouterLiquidityEvent_orderBy =
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

export type stagingmainnet_Router_filter = {
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
  owner?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  owner_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  owner_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  owner_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  owner_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  owner_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  recipient?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  recipient_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<stagingmainnet_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_Router_filter>>>;
};

export type stagingmainnet_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type stagingmainnet_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['stagingmainnet_Bytes']>;
};

export type stagingmainnet_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_Sequencer_filter>>>;
};

export type stagingmainnet_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type stagingmainnet_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['stagingmainnet_Bytes'];
};

export type stagingmainnet_Setting_filter = {
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
  caller?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_Setting_filter>>>;
};

export type stagingmainnet_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type stagingmainnet_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: stagingmainnet_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['stagingmainnet_Bytes'];
  transactionHash: Scalars['stagingmainnet_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingmainnet_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<stagingmainnet_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_SlippageUpdate_filter>>>;
};

export type stagingmainnet_SlippageUpdate_orderBy =
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

export type stagingmainnet_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['stagingmainnet_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingmainnet_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_SnapshotRoot_filter>>>;
};

export type stagingmainnet_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type stagingmainnet_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type stagingmainnet_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_SpokeConnectorMode_filter>>>;
};

export type stagingmainnet_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  stagingmainnet_asset?: Maybe<stagingmainnet_Asset>;
  stagingmainnet_assets: Array<stagingmainnet_Asset>;
  stagingmainnet_assetStatus?: Maybe<stagingmainnet_AssetStatus>;
  stagingmainnet_assetStatuses: Array<stagingmainnet_AssetStatus>;
  stagingmainnet_assetBalance?: Maybe<stagingmainnet_AssetBalance>;
  stagingmainnet_assetBalances: Array<stagingmainnet_AssetBalance>;
  stagingmainnet_router?: Maybe<stagingmainnet_Router>;
  stagingmainnet_routers: Array<stagingmainnet_Router>;
  stagingmainnet_routerDailyTVL?: Maybe<stagingmainnet_RouterDailyTVL>;
  stagingmainnet_routerDailyTVLs: Array<stagingmainnet_RouterDailyTVL>;
  stagingmainnet_routerLiquidityEvent?: Maybe<stagingmainnet_RouterLiquidityEvent>;
  stagingmainnet_routerLiquidityEvents: Array<stagingmainnet_RouterLiquidityEvent>;
  stagingmainnet_setting?: Maybe<stagingmainnet_Setting>;
  stagingmainnet_settings: Array<stagingmainnet_Setting>;
  stagingmainnet_relayer?: Maybe<stagingmainnet_Relayer>;
  stagingmainnet_relayers: Array<stagingmainnet_Relayer>;
  stagingmainnet_sequencer?: Maybe<stagingmainnet_Sequencer>;
  stagingmainnet_sequencers: Array<stagingmainnet_Sequencer>;
  stagingmainnet_relayerFee?: Maybe<stagingmainnet_RelayerFee>;
  stagingmainnet_relayerFees: Array<stagingmainnet_RelayerFee>;
  stagingmainnet_originTransfer?: Maybe<stagingmainnet_OriginTransfer>;
  stagingmainnet_originTransfers: Array<stagingmainnet_OriginTransfer>;
  stagingmainnet_destinationTransfer?: Maybe<stagingmainnet_DestinationTransfer>;
  stagingmainnet_destinationTransfers: Array<stagingmainnet_DestinationTransfer>;
  stagingmainnet_originMessage?: Maybe<stagingmainnet_OriginMessage>;
  stagingmainnet_originMessages: Array<stagingmainnet_OriginMessage>;
  stagingmainnet_aggregateRoot?: Maybe<stagingmainnet_AggregateRoot>;
  stagingmainnet_aggregateRoots: Array<stagingmainnet_AggregateRoot>;
  stagingmainnet_connectorMeta?: Maybe<stagingmainnet_ConnectorMeta>;
  stagingmainnet_connectorMetas: Array<stagingmainnet_ConnectorMeta>;
  stagingmainnet_rootCount?: Maybe<stagingmainnet_RootCount>;
  stagingmainnet_rootCounts: Array<stagingmainnet_RootCount>;
  stagingmainnet_rootMessageSent?: Maybe<stagingmainnet_RootMessageSent>;
  stagingmainnet_rootMessageSents: Array<stagingmainnet_RootMessageSent>;
  stagingmainnet_relayerFeesIncrease?: Maybe<stagingmainnet_RelayerFeesIncrease>;
  stagingmainnet_relayerFeesIncreases: Array<stagingmainnet_RelayerFeesIncrease>;
  stagingmainnet_slippageUpdate?: Maybe<stagingmainnet_SlippageUpdate>;
  stagingmainnet_slippageUpdates: Array<stagingmainnet_SlippageUpdate>;
  stagingmainnet_snapshotRoot?: Maybe<stagingmainnet_SnapshotRoot>;
  stagingmainnet_snapshotRoots: Array<stagingmainnet_SnapshotRoot>;
  stagingmainnet_spokeConnectorMode?: Maybe<stagingmainnet_SpokeConnectorMode>;
  stagingmainnet_spokeConnectorModes: Array<stagingmainnet_SpokeConnectorMode>;
  stagingmainnet_aggregateRootProposed?: Maybe<stagingmainnet_AggregateRootProposed>;
  stagingmainnet_aggregateRootProposeds: Array<stagingmainnet_AggregateRootProposed>;
  stagingmainnet_optimisticRootFinalized?: Maybe<stagingmainnet_OptimisticRootFinalized>;
  stagingmainnet_optimisticRootFinalizeds: Array<stagingmainnet_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingmainnet__meta?: Maybe<stagingmainnet__Meta_>;
};


export type Subscriptionstagingmainnet_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_Asset_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_AssetStatus_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_AssetBalance_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_Router_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_Router_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_Setting_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_Relayer_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_Sequencer_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_RelayerFee_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_OriginTransfer_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_DestinationTransfer_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_OriginMessage_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_AggregateRoot_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_ConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_RootCount_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_RootMessageSent_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_SlippageUpdate_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_SnapshotRoot_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet__metaArgs = {
  block?: InputMaybe<stagingmainnet_Block_height>;
};

export type stagingmainnet_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type stagingmainnet__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingmainnet_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type stagingmainnet__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingmainnet__Block_;
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
  stagingmainnet_asset: InContextSdkMethod<Query['stagingmainnet_asset'], Querystagingmainnet_assetArgs, MeshContext>,
  /** null **/
  stagingmainnet_assets: InContextSdkMethod<Query['stagingmainnet_assets'], Querystagingmainnet_assetsArgs, MeshContext>,
  /** null **/
  stagingmainnet_assetStatus: InContextSdkMethod<Query['stagingmainnet_assetStatus'], Querystagingmainnet_assetStatusArgs, MeshContext>,
  /** null **/
  stagingmainnet_assetStatuses: InContextSdkMethod<Query['stagingmainnet_assetStatuses'], Querystagingmainnet_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingmainnet_assetBalance: InContextSdkMethod<Query['stagingmainnet_assetBalance'], Querystagingmainnet_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingmainnet_assetBalances: InContextSdkMethod<Query['stagingmainnet_assetBalances'], Querystagingmainnet_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingmainnet_router: InContextSdkMethod<Query['stagingmainnet_router'], Querystagingmainnet_routerArgs, MeshContext>,
  /** null **/
  stagingmainnet_routers: InContextSdkMethod<Query['stagingmainnet_routers'], Querystagingmainnet_routersArgs, MeshContext>,
  /** null **/
  stagingmainnet_routerDailyTVL: InContextSdkMethod<Query['stagingmainnet_routerDailyTVL'], Querystagingmainnet_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingmainnet_routerDailyTVLs: InContextSdkMethod<Query['stagingmainnet_routerDailyTVLs'], Querystagingmainnet_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingmainnet_routerLiquidityEvent: InContextSdkMethod<Query['stagingmainnet_routerLiquidityEvent'], Querystagingmainnet_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingmainnet_routerLiquidityEvents: InContextSdkMethod<Query['stagingmainnet_routerLiquidityEvents'], Querystagingmainnet_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingmainnet_setting: InContextSdkMethod<Query['stagingmainnet_setting'], Querystagingmainnet_settingArgs, MeshContext>,
  /** null **/
  stagingmainnet_settings: InContextSdkMethod<Query['stagingmainnet_settings'], Querystagingmainnet_settingsArgs, MeshContext>,
  /** null **/
  stagingmainnet_relayer: InContextSdkMethod<Query['stagingmainnet_relayer'], Querystagingmainnet_relayerArgs, MeshContext>,
  /** null **/
  stagingmainnet_relayers: InContextSdkMethod<Query['stagingmainnet_relayers'], Querystagingmainnet_relayersArgs, MeshContext>,
  /** null **/
  stagingmainnet_sequencer: InContextSdkMethod<Query['stagingmainnet_sequencer'], Querystagingmainnet_sequencerArgs, MeshContext>,
  /** null **/
  stagingmainnet_sequencers: InContextSdkMethod<Query['stagingmainnet_sequencers'], Querystagingmainnet_sequencersArgs, MeshContext>,
  /** null **/
  stagingmainnet_relayerFee: InContextSdkMethod<Query['stagingmainnet_relayerFee'], Querystagingmainnet_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingmainnet_relayerFees: InContextSdkMethod<Query['stagingmainnet_relayerFees'], Querystagingmainnet_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingmainnet_originTransfer: InContextSdkMethod<Query['stagingmainnet_originTransfer'], Querystagingmainnet_originTransferArgs, MeshContext>,
  /** null **/
  stagingmainnet_originTransfers: InContextSdkMethod<Query['stagingmainnet_originTransfers'], Querystagingmainnet_originTransfersArgs, MeshContext>,
  /** null **/
  stagingmainnet_destinationTransfer: InContextSdkMethod<Query['stagingmainnet_destinationTransfer'], Querystagingmainnet_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingmainnet_destinationTransfers: InContextSdkMethod<Query['stagingmainnet_destinationTransfers'], Querystagingmainnet_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingmainnet_originMessage: InContextSdkMethod<Query['stagingmainnet_originMessage'], Querystagingmainnet_originMessageArgs, MeshContext>,
  /** null **/
  stagingmainnet_originMessages: InContextSdkMethod<Query['stagingmainnet_originMessages'], Querystagingmainnet_originMessagesArgs, MeshContext>,
  /** null **/
  stagingmainnet_aggregateRoot: InContextSdkMethod<Query['stagingmainnet_aggregateRoot'], Querystagingmainnet_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingmainnet_aggregateRoots: InContextSdkMethod<Query['stagingmainnet_aggregateRoots'], Querystagingmainnet_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingmainnet_connectorMeta: InContextSdkMethod<Query['stagingmainnet_connectorMeta'], Querystagingmainnet_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_connectorMetas: InContextSdkMethod<Query['stagingmainnet_connectorMetas'], Querystagingmainnet_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootCount: InContextSdkMethod<Query['stagingmainnet_rootCount'], Querystagingmainnet_rootCountArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootCounts: InContextSdkMethod<Query['stagingmainnet_rootCounts'], Querystagingmainnet_rootCountsArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootMessageSent: InContextSdkMethod<Query['stagingmainnet_rootMessageSent'], Querystagingmainnet_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootMessageSents: InContextSdkMethod<Query['stagingmainnet_rootMessageSents'], Querystagingmainnet_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingmainnet_relayerFeesIncrease: InContextSdkMethod<Query['stagingmainnet_relayerFeesIncrease'], Querystagingmainnet_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingmainnet_relayerFeesIncreases: InContextSdkMethod<Query['stagingmainnet_relayerFeesIncreases'], Querystagingmainnet_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingmainnet_slippageUpdate: InContextSdkMethod<Query['stagingmainnet_slippageUpdate'], Querystagingmainnet_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingmainnet_slippageUpdates: InContextSdkMethod<Query['stagingmainnet_slippageUpdates'], Querystagingmainnet_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingmainnet_snapshotRoot: InContextSdkMethod<Query['stagingmainnet_snapshotRoot'], Querystagingmainnet_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingmainnet_snapshotRoots: InContextSdkMethod<Query['stagingmainnet_snapshotRoots'], Querystagingmainnet_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingmainnet_spokeConnectorMode: InContextSdkMethod<Query['stagingmainnet_spokeConnectorMode'], Querystagingmainnet_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingmainnet_spokeConnectorModes: InContextSdkMethod<Query['stagingmainnet_spokeConnectorModes'], Querystagingmainnet_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingmainnet_aggregateRootProposed: InContextSdkMethod<Query['stagingmainnet_aggregateRootProposed'], Querystagingmainnet_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingmainnet_aggregateRootProposeds: InContextSdkMethod<Query['stagingmainnet_aggregateRootProposeds'], Querystagingmainnet_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingmainnet_optimisticRootFinalized: InContextSdkMethod<Query['stagingmainnet_optimisticRootFinalized'], Querystagingmainnet_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingmainnet_optimisticRootFinalizeds: InContextSdkMethod<Query['stagingmainnet_optimisticRootFinalizeds'], Querystagingmainnet_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingmainnet__meta: InContextSdkMethod<Query['stagingmainnet__meta'], Querystagingmainnet__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  stagingmainnet_asset: InContextSdkMethod<Subscription['stagingmainnet_asset'], Subscriptionstagingmainnet_assetArgs, MeshContext>,
  /** null **/
  stagingmainnet_assets: InContextSdkMethod<Subscription['stagingmainnet_assets'], Subscriptionstagingmainnet_assetsArgs, MeshContext>,
  /** null **/
  stagingmainnet_assetStatus: InContextSdkMethod<Subscription['stagingmainnet_assetStatus'], Subscriptionstagingmainnet_assetStatusArgs, MeshContext>,
  /** null **/
  stagingmainnet_assetStatuses: InContextSdkMethod<Subscription['stagingmainnet_assetStatuses'], Subscriptionstagingmainnet_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingmainnet_assetBalance: InContextSdkMethod<Subscription['stagingmainnet_assetBalance'], Subscriptionstagingmainnet_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingmainnet_assetBalances: InContextSdkMethod<Subscription['stagingmainnet_assetBalances'], Subscriptionstagingmainnet_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingmainnet_router: InContextSdkMethod<Subscription['stagingmainnet_router'], Subscriptionstagingmainnet_routerArgs, MeshContext>,
  /** null **/
  stagingmainnet_routers: InContextSdkMethod<Subscription['stagingmainnet_routers'], Subscriptionstagingmainnet_routersArgs, MeshContext>,
  /** null **/
  stagingmainnet_routerDailyTVL: InContextSdkMethod<Subscription['stagingmainnet_routerDailyTVL'], Subscriptionstagingmainnet_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingmainnet_routerDailyTVLs: InContextSdkMethod<Subscription['stagingmainnet_routerDailyTVLs'], Subscriptionstagingmainnet_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingmainnet_routerLiquidityEvent: InContextSdkMethod<Subscription['stagingmainnet_routerLiquidityEvent'], Subscriptionstagingmainnet_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingmainnet_routerLiquidityEvents: InContextSdkMethod<Subscription['stagingmainnet_routerLiquidityEvents'], Subscriptionstagingmainnet_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingmainnet_setting: InContextSdkMethod<Subscription['stagingmainnet_setting'], Subscriptionstagingmainnet_settingArgs, MeshContext>,
  /** null **/
  stagingmainnet_settings: InContextSdkMethod<Subscription['stagingmainnet_settings'], Subscriptionstagingmainnet_settingsArgs, MeshContext>,
  /** null **/
  stagingmainnet_relayer: InContextSdkMethod<Subscription['stagingmainnet_relayer'], Subscriptionstagingmainnet_relayerArgs, MeshContext>,
  /** null **/
  stagingmainnet_relayers: InContextSdkMethod<Subscription['stagingmainnet_relayers'], Subscriptionstagingmainnet_relayersArgs, MeshContext>,
  /** null **/
  stagingmainnet_sequencer: InContextSdkMethod<Subscription['stagingmainnet_sequencer'], Subscriptionstagingmainnet_sequencerArgs, MeshContext>,
  /** null **/
  stagingmainnet_sequencers: InContextSdkMethod<Subscription['stagingmainnet_sequencers'], Subscriptionstagingmainnet_sequencersArgs, MeshContext>,
  /** null **/
  stagingmainnet_relayerFee: InContextSdkMethod<Subscription['stagingmainnet_relayerFee'], Subscriptionstagingmainnet_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingmainnet_relayerFees: InContextSdkMethod<Subscription['stagingmainnet_relayerFees'], Subscriptionstagingmainnet_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingmainnet_originTransfer: InContextSdkMethod<Subscription['stagingmainnet_originTransfer'], Subscriptionstagingmainnet_originTransferArgs, MeshContext>,
  /** null **/
  stagingmainnet_originTransfers: InContextSdkMethod<Subscription['stagingmainnet_originTransfers'], Subscriptionstagingmainnet_originTransfersArgs, MeshContext>,
  /** null **/
  stagingmainnet_destinationTransfer: InContextSdkMethod<Subscription['stagingmainnet_destinationTransfer'], Subscriptionstagingmainnet_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingmainnet_destinationTransfers: InContextSdkMethod<Subscription['stagingmainnet_destinationTransfers'], Subscriptionstagingmainnet_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingmainnet_originMessage: InContextSdkMethod<Subscription['stagingmainnet_originMessage'], Subscriptionstagingmainnet_originMessageArgs, MeshContext>,
  /** null **/
  stagingmainnet_originMessages: InContextSdkMethod<Subscription['stagingmainnet_originMessages'], Subscriptionstagingmainnet_originMessagesArgs, MeshContext>,
  /** null **/
  stagingmainnet_aggregateRoot: InContextSdkMethod<Subscription['stagingmainnet_aggregateRoot'], Subscriptionstagingmainnet_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingmainnet_aggregateRoots: InContextSdkMethod<Subscription['stagingmainnet_aggregateRoots'], Subscriptionstagingmainnet_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingmainnet_connectorMeta: InContextSdkMethod<Subscription['stagingmainnet_connectorMeta'], Subscriptionstagingmainnet_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_connectorMetas: InContextSdkMethod<Subscription['stagingmainnet_connectorMetas'], Subscriptionstagingmainnet_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootCount: InContextSdkMethod<Subscription['stagingmainnet_rootCount'], Subscriptionstagingmainnet_rootCountArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootCounts: InContextSdkMethod<Subscription['stagingmainnet_rootCounts'], Subscriptionstagingmainnet_rootCountsArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootMessageSent: InContextSdkMethod<Subscription['stagingmainnet_rootMessageSent'], Subscriptionstagingmainnet_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootMessageSents: InContextSdkMethod<Subscription['stagingmainnet_rootMessageSents'], Subscriptionstagingmainnet_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingmainnet_relayerFeesIncrease: InContextSdkMethod<Subscription['stagingmainnet_relayerFeesIncrease'], Subscriptionstagingmainnet_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingmainnet_relayerFeesIncreases: InContextSdkMethod<Subscription['stagingmainnet_relayerFeesIncreases'], Subscriptionstagingmainnet_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingmainnet_slippageUpdate: InContextSdkMethod<Subscription['stagingmainnet_slippageUpdate'], Subscriptionstagingmainnet_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingmainnet_slippageUpdates: InContextSdkMethod<Subscription['stagingmainnet_slippageUpdates'], Subscriptionstagingmainnet_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingmainnet_snapshotRoot: InContextSdkMethod<Subscription['stagingmainnet_snapshotRoot'], Subscriptionstagingmainnet_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingmainnet_snapshotRoots: InContextSdkMethod<Subscription['stagingmainnet_snapshotRoots'], Subscriptionstagingmainnet_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingmainnet_spokeConnectorMode: InContextSdkMethod<Subscription['stagingmainnet_spokeConnectorMode'], Subscriptionstagingmainnet_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingmainnet_spokeConnectorModes: InContextSdkMethod<Subscription['stagingmainnet_spokeConnectorModes'], Subscriptionstagingmainnet_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingmainnet_aggregateRootProposed: InContextSdkMethod<Subscription['stagingmainnet_aggregateRootProposed'], Subscriptionstagingmainnet_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingmainnet_aggregateRootProposeds: InContextSdkMethod<Subscription['stagingmainnet_aggregateRootProposeds'], Subscriptionstagingmainnet_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingmainnet_optimisticRootFinalized: InContextSdkMethod<Subscription['stagingmainnet_optimisticRootFinalized'], Subscriptionstagingmainnet_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingmainnet_optimisticRootFinalizeds: InContextSdkMethod<Subscription['stagingmainnet_optimisticRootFinalizeds'], Subscriptionstagingmainnet_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingmainnet__meta: InContextSdkMethod<Subscription['stagingmainnet__meta'], Subscriptionstagingmainnet__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Staging_Mainnet"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
