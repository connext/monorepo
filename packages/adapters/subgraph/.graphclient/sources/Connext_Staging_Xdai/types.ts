// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextStagingXdaiTypes {
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
  stagingxdai_BigDecimal: any;
  BigInt: any;
  stagingxdai_Bytes: any;
  stagingxdai_Int8: any;
};

export type stagingxdai_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['stagingxdai_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type stagingxdai_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingxdai_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingxdai_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
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
  _change_block?: InputMaybe<stagingxdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxdai_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxdai_AggregateRootProposed_filter>>>;
};

export type stagingxdai_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type stagingxdai_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxdai_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxdai_AggregateRoot_filter>>>;
};

export type stagingxdai_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type stagingxdai_Aggregation_interval =
  | 'hour'
  | 'day';

export type stagingxdai_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['stagingxdai_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingxdai_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['stagingxdai_Bytes']>;
  localAsset?: Maybe<Scalars['stagingxdai_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingxdai_AssetStatus>;
};

export type stagingxdai_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: stagingxdai_Router;
  asset: stagingxdai_Asset;
  feesEarned: Scalars['BigInt'];
};

export type stagingxdai_AssetBalance_filter = {
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
  router_?: InputMaybe<stagingxdai_Router_filter>;
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
  asset_?: InputMaybe<stagingxdai_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxdai_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxdai_AssetBalance_filter>>>;
};

export type stagingxdai_AssetBalance_orderBy =
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

export type stagingxdai_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type stagingxdai_AssetStatus_filter = {
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
  _change_block?: InputMaybe<stagingxdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxdai_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxdai_AssetStatus_filter>>>;
};

export type stagingxdai_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type stagingxdai_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  key_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  key_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  key_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  key_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  key_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  key_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  localAsset?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
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
  status_?: InputMaybe<stagingxdai_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxdai_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxdai_Asset_filter>>>;
};

export type stagingxdai_Asset_orderBy =
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

export type stagingxdai_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingxdai_Block_height = {
  hash?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type stagingxdai_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['stagingxdai_Bytes']>;
  rootManager?: Maybe<Scalars['stagingxdai_Bytes']>;
  mirrorConnector?: Maybe<Scalars['stagingxdai_Bytes']>;
};

export type stagingxdai_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxdai_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxdai_ConnectorMeta_filter>>>;
};

export type stagingxdai_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingxdai_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingxdai_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingxdai_TransferStatus>;
  routers?: Maybe<Array<stagingxdai_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingxdai_Bytes']>;
  delegate?: Maybe<Scalars['stagingxdai_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingxdai_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingxdai_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingxdai_Bytes']>;
  asset?: Maybe<stagingxdai_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['stagingxdai_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['stagingxdai_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['stagingxdai_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['stagingxdai_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['stagingxdai_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['stagingxdai_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingxdai_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_Router_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_Router_filter>;
};

export type stagingxdai_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingxdai_TransferStatus>;
  status_not?: InputMaybe<stagingxdai_TransferStatus>;
  status_in?: InputMaybe<Array<stagingxdai_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingxdai_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<stagingxdai_Router_filter>;
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
  to?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
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
  originSender?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
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
  asset_?: InputMaybe<stagingxdai_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxdai_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxdai_DestinationTransfer_filter>>>;
};

export type stagingxdai_DestinationTransfer_orderBy =
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

export type stagingxdai_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingxdai_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingxdai_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
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
  _change_block?: InputMaybe<stagingxdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxdai_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxdai_OptimisticRootFinalized_filter>>>;
};

export type stagingxdai_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type stagingxdai_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingxdai_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['stagingxdai_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['stagingxdai_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['stagingxdai_Bytes']>;
  root?: Maybe<Scalars['stagingxdai_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingxdai_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<stagingxdai_RootCount>;
};

export type stagingxdai_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  leaf_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  message_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  message_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  message_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  message_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  message_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  message_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
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
  rootCount_?: InputMaybe<stagingxdai_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxdai_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxdai_OriginMessage_filter>>>;
};

export type stagingxdai_OriginMessage_orderBy =
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

export type stagingxdai_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingxdai_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingxdai_TransferStatus>;
  messageHash?: Maybe<Scalars['stagingxdai_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingxdai_Bytes']>;
  delegate?: Maybe<Scalars['stagingxdai_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingxdai_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingxdai_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingxdai_Bytes']>;
  asset?: Maybe<stagingxdai_Asset>;
  transactingAsset?: Maybe<Scalars['stagingxdai_Bytes']>;
  message?: Maybe<stagingxdai_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<stagingxdai_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['stagingxdai_Bytes']>;
  caller?: Maybe<Scalars['stagingxdai_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingxdai_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['stagingxdai_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingxdai_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_RelayerFee_filter>;
};

export type stagingxdai_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingxdai_TransferStatus>;
  status_not?: InputMaybe<stagingxdai_TransferStatus>;
  status_in?: InputMaybe<Array<stagingxdai_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingxdai_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
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
  to?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
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
  asset_?: InputMaybe<stagingxdai_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
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
  message_?: InputMaybe<stagingxdai_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<stagingxdai_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxdai_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxdai_OriginTransfer_filter>>>;
};

export type stagingxdai_OriginTransfer_orderBy =
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
  stagingxdai_asset?: Maybe<stagingxdai_Asset>;
  stagingxdai_assets: Array<stagingxdai_Asset>;
  stagingxdai_assetStatus?: Maybe<stagingxdai_AssetStatus>;
  stagingxdai_assetStatuses: Array<stagingxdai_AssetStatus>;
  stagingxdai_assetBalance?: Maybe<stagingxdai_AssetBalance>;
  stagingxdai_assetBalances: Array<stagingxdai_AssetBalance>;
  stagingxdai_router?: Maybe<stagingxdai_Router>;
  stagingxdai_routers: Array<stagingxdai_Router>;
  stagingxdai_routerDailyTVL?: Maybe<stagingxdai_RouterDailyTVL>;
  stagingxdai_routerDailyTVLs: Array<stagingxdai_RouterDailyTVL>;
  stagingxdai_routerLiquidityEvent?: Maybe<stagingxdai_RouterLiquidityEvent>;
  stagingxdai_routerLiquidityEvents: Array<stagingxdai_RouterLiquidityEvent>;
  stagingxdai_setting?: Maybe<stagingxdai_Setting>;
  stagingxdai_settings: Array<stagingxdai_Setting>;
  stagingxdai_relayer?: Maybe<stagingxdai_Relayer>;
  stagingxdai_relayers: Array<stagingxdai_Relayer>;
  stagingxdai_sequencer?: Maybe<stagingxdai_Sequencer>;
  stagingxdai_sequencers: Array<stagingxdai_Sequencer>;
  stagingxdai_relayerFee?: Maybe<stagingxdai_RelayerFee>;
  stagingxdai_relayerFees: Array<stagingxdai_RelayerFee>;
  stagingxdai_originTransfer?: Maybe<stagingxdai_OriginTransfer>;
  stagingxdai_originTransfers: Array<stagingxdai_OriginTransfer>;
  stagingxdai_destinationTransfer?: Maybe<stagingxdai_DestinationTransfer>;
  stagingxdai_destinationTransfers: Array<stagingxdai_DestinationTransfer>;
  stagingxdai_originMessage?: Maybe<stagingxdai_OriginMessage>;
  stagingxdai_originMessages: Array<stagingxdai_OriginMessage>;
  stagingxdai_aggregateRoot?: Maybe<stagingxdai_AggregateRoot>;
  stagingxdai_aggregateRoots: Array<stagingxdai_AggregateRoot>;
  stagingxdai_connectorMeta?: Maybe<stagingxdai_ConnectorMeta>;
  stagingxdai_connectorMetas: Array<stagingxdai_ConnectorMeta>;
  stagingxdai_rootCount?: Maybe<stagingxdai_RootCount>;
  stagingxdai_rootCounts: Array<stagingxdai_RootCount>;
  stagingxdai_rootMessageSent?: Maybe<stagingxdai_RootMessageSent>;
  stagingxdai_rootMessageSents: Array<stagingxdai_RootMessageSent>;
  stagingxdai_relayerFeesIncrease?: Maybe<stagingxdai_RelayerFeesIncrease>;
  stagingxdai_relayerFeesIncreases: Array<stagingxdai_RelayerFeesIncrease>;
  stagingxdai_slippageUpdate?: Maybe<stagingxdai_SlippageUpdate>;
  stagingxdai_slippageUpdates: Array<stagingxdai_SlippageUpdate>;
  stagingxdai_snapshotRoot?: Maybe<stagingxdai_SnapshotRoot>;
  stagingxdai_snapshotRoots: Array<stagingxdai_SnapshotRoot>;
  stagingxdai_spokeConnectorMode?: Maybe<stagingxdai_SpokeConnectorMode>;
  stagingxdai_spokeConnectorModes: Array<stagingxdai_SpokeConnectorMode>;
  stagingxdai_aggregateRootProposed?: Maybe<stagingxdai_AggregateRootProposed>;
  stagingxdai_aggregateRootProposeds: Array<stagingxdai_AggregateRootProposed>;
  stagingxdai_optimisticRootFinalized?: Maybe<stagingxdai_OptimisticRootFinalized>;
  stagingxdai_optimisticRootFinalizeds: Array<stagingxdai_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingxdai__meta?: Maybe<stagingxdai__Meta_>;
};


export type Querystagingxdai_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_Asset_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_AssetStatus_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_AssetBalance_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_Router_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_Router_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_Setting_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_Relayer_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_Sequencer_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_RelayerFee_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_OriginTransfer_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_DestinationTransfer_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_OriginMessage_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_AggregateRoot_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_ConnectorMeta_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_RootCount_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_RootMessageSent_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_SlippageUpdate_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_SnapshotRoot_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxdai__metaArgs = {
  block?: InputMaybe<stagingxdai_Block_height>;
};

export type stagingxdai_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['stagingxdai_Bytes']>;
};

export type stagingxdai_RelayerFee = {
  id: Scalars['ID'];
  transfer: stagingxdai_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['stagingxdai_Bytes'];
};

export type stagingxdai_RelayerFee_filter = {
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
  transfer_?: InputMaybe<stagingxdai_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxdai_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxdai_RelayerFee_filter>>>;
};

export type stagingxdai_RelayerFee_orderBy =
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

export type stagingxdai_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: stagingxdai_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['stagingxdai_Bytes']>;
  caller: Scalars['stagingxdai_Bytes'];
  transactionHash: Scalars['stagingxdai_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingxdai_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<stagingxdai_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
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
  _change_block?: InputMaybe<stagingxdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxdai_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxdai_RelayerFeesIncrease_filter>>>;
};

export type stagingxdai_RelayerFeesIncrease_orderBy =
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

export type stagingxdai_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  relayer_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxdai_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxdai_Relayer_filter>>>;
};

export type stagingxdai_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type stagingxdai_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type stagingxdai_RootCount_filter = {
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
  _change_block?: InputMaybe<stagingxdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxdai_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxdai_RootCount_filter>>>;
};

export type stagingxdai_RootCount_orderBy =
  | 'id'
  | 'count';

export type stagingxdai_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['stagingxdai_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['stagingxdai_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingxdai_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingxdai_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
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
  _change_block?: InputMaybe<stagingxdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxdai_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxdai_RootMessageSent_filter>>>;
};

export type stagingxdai_RootMessageSent_orderBy =
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

export type stagingxdai_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['stagingxdai_Bytes']>;
  recipient?: Maybe<Scalars['stagingxdai_Bytes']>;
  proposedOwner?: Maybe<Scalars['stagingxdai_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<stagingxdai_AssetBalance>;
};


export type stagingxdai_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_AssetBalance_filter>;
};

export type stagingxdai_RouterDailyTVL = {
  id: Scalars['ID'];
  router: stagingxdai_Router;
  asset: stagingxdai_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type stagingxdai_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<stagingxdai_Router_filter>;
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
  asset_?: InputMaybe<stagingxdai_Asset_filter>;
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
  _change_block?: InputMaybe<stagingxdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxdai_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxdai_RouterDailyTVL_filter>>>;
};

export type stagingxdai_RouterDailyTVL_orderBy =
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

export type stagingxdai_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<stagingxdai_RouterLiquidityEventType>;
  router: stagingxdai_Router;
  asset: stagingxdai_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['stagingxdai_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['stagingxdai_Bytes'];
  nonce: Scalars['BigInt'];
};

export type stagingxdai_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type stagingxdai_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<stagingxdai_RouterLiquidityEventType>;
  type_not?: InputMaybe<stagingxdai_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<stagingxdai_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<stagingxdai_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<stagingxdai_Router_filter>;
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
  asset_?: InputMaybe<stagingxdai_Asset_filter>;
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
  caller?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxdai_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxdai_RouterLiquidityEvent_filter>>>;
};

export type stagingxdai_RouterLiquidityEvent_orderBy =
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

export type stagingxdai_Router_filter = {
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
  owner?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  owner_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  owner_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  owner_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  owner_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  owner_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  recipient?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  recipient_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<stagingxdai_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxdai_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxdai_Router_filter>>>;
};

export type stagingxdai_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type stagingxdai_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['stagingxdai_Bytes']>;
};

export type stagingxdai_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxdai_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxdai_Sequencer_filter>>>;
};

export type stagingxdai_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type stagingxdai_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['stagingxdai_Bytes'];
};

export type stagingxdai_Setting_filter = {
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
  caller?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxdai_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxdai_Setting_filter>>>;
};

export type stagingxdai_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type stagingxdai_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: stagingxdai_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['stagingxdai_Bytes'];
  transactionHash: Scalars['stagingxdai_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingxdai_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<stagingxdai_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
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
  _change_block?: InputMaybe<stagingxdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxdai_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxdai_SlippageUpdate_filter>>>;
};

export type stagingxdai_SlippageUpdate_orderBy =
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

export type stagingxdai_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['stagingxdai_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingxdai_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingxdai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingxdai_Bytes']>;
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
  _change_block?: InputMaybe<stagingxdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxdai_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxdai_SnapshotRoot_filter>>>;
};

export type stagingxdai_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type stagingxdai_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type stagingxdai_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<stagingxdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxdai_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxdai_SpokeConnectorMode_filter>>>;
};

export type stagingxdai_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  stagingxdai_asset?: Maybe<stagingxdai_Asset>;
  stagingxdai_assets: Array<stagingxdai_Asset>;
  stagingxdai_assetStatus?: Maybe<stagingxdai_AssetStatus>;
  stagingxdai_assetStatuses: Array<stagingxdai_AssetStatus>;
  stagingxdai_assetBalance?: Maybe<stagingxdai_AssetBalance>;
  stagingxdai_assetBalances: Array<stagingxdai_AssetBalance>;
  stagingxdai_router?: Maybe<stagingxdai_Router>;
  stagingxdai_routers: Array<stagingxdai_Router>;
  stagingxdai_routerDailyTVL?: Maybe<stagingxdai_RouterDailyTVL>;
  stagingxdai_routerDailyTVLs: Array<stagingxdai_RouterDailyTVL>;
  stagingxdai_routerLiquidityEvent?: Maybe<stagingxdai_RouterLiquidityEvent>;
  stagingxdai_routerLiquidityEvents: Array<stagingxdai_RouterLiquidityEvent>;
  stagingxdai_setting?: Maybe<stagingxdai_Setting>;
  stagingxdai_settings: Array<stagingxdai_Setting>;
  stagingxdai_relayer?: Maybe<stagingxdai_Relayer>;
  stagingxdai_relayers: Array<stagingxdai_Relayer>;
  stagingxdai_sequencer?: Maybe<stagingxdai_Sequencer>;
  stagingxdai_sequencers: Array<stagingxdai_Sequencer>;
  stagingxdai_relayerFee?: Maybe<stagingxdai_RelayerFee>;
  stagingxdai_relayerFees: Array<stagingxdai_RelayerFee>;
  stagingxdai_originTransfer?: Maybe<stagingxdai_OriginTransfer>;
  stagingxdai_originTransfers: Array<stagingxdai_OriginTransfer>;
  stagingxdai_destinationTransfer?: Maybe<stagingxdai_DestinationTransfer>;
  stagingxdai_destinationTransfers: Array<stagingxdai_DestinationTransfer>;
  stagingxdai_originMessage?: Maybe<stagingxdai_OriginMessage>;
  stagingxdai_originMessages: Array<stagingxdai_OriginMessage>;
  stagingxdai_aggregateRoot?: Maybe<stagingxdai_AggregateRoot>;
  stagingxdai_aggregateRoots: Array<stagingxdai_AggregateRoot>;
  stagingxdai_connectorMeta?: Maybe<stagingxdai_ConnectorMeta>;
  stagingxdai_connectorMetas: Array<stagingxdai_ConnectorMeta>;
  stagingxdai_rootCount?: Maybe<stagingxdai_RootCount>;
  stagingxdai_rootCounts: Array<stagingxdai_RootCount>;
  stagingxdai_rootMessageSent?: Maybe<stagingxdai_RootMessageSent>;
  stagingxdai_rootMessageSents: Array<stagingxdai_RootMessageSent>;
  stagingxdai_relayerFeesIncrease?: Maybe<stagingxdai_RelayerFeesIncrease>;
  stagingxdai_relayerFeesIncreases: Array<stagingxdai_RelayerFeesIncrease>;
  stagingxdai_slippageUpdate?: Maybe<stagingxdai_SlippageUpdate>;
  stagingxdai_slippageUpdates: Array<stagingxdai_SlippageUpdate>;
  stagingxdai_snapshotRoot?: Maybe<stagingxdai_SnapshotRoot>;
  stagingxdai_snapshotRoots: Array<stagingxdai_SnapshotRoot>;
  stagingxdai_spokeConnectorMode?: Maybe<stagingxdai_SpokeConnectorMode>;
  stagingxdai_spokeConnectorModes: Array<stagingxdai_SpokeConnectorMode>;
  stagingxdai_aggregateRootProposed?: Maybe<stagingxdai_AggregateRootProposed>;
  stagingxdai_aggregateRootProposeds: Array<stagingxdai_AggregateRootProposed>;
  stagingxdai_optimisticRootFinalized?: Maybe<stagingxdai_OptimisticRootFinalized>;
  stagingxdai_optimisticRootFinalizeds: Array<stagingxdai_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingxdai__meta?: Maybe<stagingxdai__Meta_>;
};


export type Subscriptionstagingxdai_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_Asset_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_AssetStatus_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_AssetBalance_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_Router_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_Router_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_Setting_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_Relayer_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_Sequencer_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_RelayerFee_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_OriginTransfer_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_DestinationTransfer_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_OriginMessage_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_AggregateRoot_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_ConnectorMeta_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_RootCount_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_RootMessageSent_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_SlippageUpdate_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_SnapshotRoot_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxdai_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingxdai_OrderDirection>;
  where?: InputMaybe<stagingxdai_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxdai__metaArgs = {
  block?: InputMaybe<stagingxdai_Block_height>;
};

export type stagingxdai_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type stagingxdai__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingxdai_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type stagingxdai__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingxdai__Block_;
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
  stagingxdai_asset: InContextSdkMethod<Query['stagingxdai_asset'], Querystagingxdai_assetArgs, MeshContext>,
  /** null **/
  stagingxdai_assets: InContextSdkMethod<Query['stagingxdai_assets'], Querystagingxdai_assetsArgs, MeshContext>,
  /** null **/
  stagingxdai_assetStatus: InContextSdkMethod<Query['stagingxdai_assetStatus'], Querystagingxdai_assetStatusArgs, MeshContext>,
  /** null **/
  stagingxdai_assetStatuses: InContextSdkMethod<Query['stagingxdai_assetStatuses'], Querystagingxdai_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingxdai_assetBalance: InContextSdkMethod<Query['stagingxdai_assetBalance'], Querystagingxdai_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingxdai_assetBalances: InContextSdkMethod<Query['stagingxdai_assetBalances'], Querystagingxdai_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingxdai_router: InContextSdkMethod<Query['stagingxdai_router'], Querystagingxdai_routerArgs, MeshContext>,
  /** null **/
  stagingxdai_routers: InContextSdkMethod<Query['stagingxdai_routers'], Querystagingxdai_routersArgs, MeshContext>,
  /** null **/
  stagingxdai_routerDailyTVL: InContextSdkMethod<Query['stagingxdai_routerDailyTVL'], Querystagingxdai_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingxdai_routerDailyTVLs: InContextSdkMethod<Query['stagingxdai_routerDailyTVLs'], Querystagingxdai_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingxdai_routerLiquidityEvent: InContextSdkMethod<Query['stagingxdai_routerLiquidityEvent'], Querystagingxdai_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingxdai_routerLiquidityEvents: InContextSdkMethod<Query['stagingxdai_routerLiquidityEvents'], Querystagingxdai_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingxdai_setting: InContextSdkMethod<Query['stagingxdai_setting'], Querystagingxdai_settingArgs, MeshContext>,
  /** null **/
  stagingxdai_settings: InContextSdkMethod<Query['stagingxdai_settings'], Querystagingxdai_settingsArgs, MeshContext>,
  /** null **/
  stagingxdai_relayer: InContextSdkMethod<Query['stagingxdai_relayer'], Querystagingxdai_relayerArgs, MeshContext>,
  /** null **/
  stagingxdai_relayers: InContextSdkMethod<Query['stagingxdai_relayers'], Querystagingxdai_relayersArgs, MeshContext>,
  /** null **/
  stagingxdai_sequencer: InContextSdkMethod<Query['stagingxdai_sequencer'], Querystagingxdai_sequencerArgs, MeshContext>,
  /** null **/
  stagingxdai_sequencers: InContextSdkMethod<Query['stagingxdai_sequencers'], Querystagingxdai_sequencersArgs, MeshContext>,
  /** null **/
  stagingxdai_relayerFee: InContextSdkMethod<Query['stagingxdai_relayerFee'], Querystagingxdai_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingxdai_relayerFees: InContextSdkMethod<Query['stagingxdai_relayerFees'], Querystagingxdai_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingxdai_originTransfer: InContextSdkMethod<Query['stagingxdai_originTransfer'], Querystagingxdai_originTransferArgs, MeshContext>,
  /** null **/
  stagingxdai_originTransfers: InContextSdkMethod<Query['stagingxdai_originTransfers'], Querystagingxdai_originTransfersArgs, MeshContext>,
  /** null **/
  stagingxdai_destinationTransfer: InContextSdkMethod<Query['stagingxdai_destinationTransfer'], Querystagingxdai_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingxdai_destinationTransfers: InContextSdkMethod<Query['stagingxdai_destinationTransfers'], Querystagingxdai_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingxdai_originMessage: InContextSdkMethod<Query['stagingxdai_originMessage'], Querystagingxdai_originMessageArgs, MeshContext>,
  /** null **/
  stagingxdai_originMessages: InContextSdkMethod<Query['stagingxdai_originMessages'], Querystagingxdai_originMessagesArgs, MeshContext>,
  /** null **/
  stagingxdai_aggregateRoot: InContextSdkMethod<Query['stagingxdai_aggregateRoot'], Querystagingxdai_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingxdai_aggregateRoots: InContextSdkMethod<Query['stagingxdai_aggregateRoots'], Querystagingxdai_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingxdai_connectorMeta: InContextSdkMethod<Query['stagingxdai_connectorMeta'], Querystagingxdai_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingxdai_connectorMetas: InContextSdkMethod<Query['stagingxdai_connectorMetas'], Querystagingxdai_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingxdai_rootCount: InContextSdkMethod<Query['stagingxdai_rootCount'], Querystagingxdai_rootCountArgs, MeshContext>,
  /** null **/
  stagingxdai_rootCounts: InContextSdkMethod<Query['stagingxdai_rootCounts'], Querystagingxdai_rootCountsArgs, MeshContext>,
  /** null **/
  stagingxdai_rootMessageSent: InContextSdkMethod<Query['stagingxdai_rootMessageSent'], Querystagingxdai_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingxdai_rootMessageSents: InContextSdkMethod<Query['stagingxdai_rootMessageSents'], Querystagingxdai_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingxdai_relayerFeesIncrease: InContextSdkMethod<Query['stagingxdai_relayerFeesIncrease'], Querystagingxdai_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingxdai_relayerFeesIncreases: InContextSdkMethod<Query['stagingxdai_relayerFeesIncreases'], Querystagingxdai_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingxdai_slippageUpdate: InContextSdkMethod<Query['stagingxdai_slippageUpdate'], Querystagingxdai_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingxdai_slippageUpdates: InContextSdkMethod<Query['stagingxdai_slippageUpdates'], Querystagingxdai_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingxdai_snapshotRoot: InContextSdkMethod<Query['stagingxdai_snapshotRoot'], Querystagingxdai_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingxdai_snapshotRoots: InContextSdkMethod<Query['stagingxdai_snapshotRoots'], Querystagingxdai_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingxdai_spokeConnectorMode: InContextSdkMethod<Query['stagingxdai_spokeConnectorMode'], Querystagingxdai_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingxdai_spokeConnectorModes: InContextSdkMethod<Query['stagingxdai_spokeConnectorModes'], Querystagingxdai_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingxdai_aggregateRootProposed: InContextSdkMethod<Query['stagingxdai_aggregateRootProposed'], Querystagingxdai_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingxdai_aggregateRootProposeds: InContextSdkMethod<Query['stagingxdai_aggregateRootProposeds'], Querystagingxdai_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingxdai_optimisticRootFinalized: InContextSdkMethod<Query['stagingxdai_optimisticRootFinalized'], Querystagingxdai_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingxdai_optimisticRootFinalizeds: InContextSdkMethod<Query['stagingxdai_optimisticRootFinalizeds'], Querystagingxdai_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingxdai__meta: InContextSdkMethod<Query['stagingxdai__meta'], Querystagingxdai__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  stagingxdai_asset: InContextSdkMethod<Subscription['stagingxdai_asset'], Subscriptionstagingxdai_assetArgs, MeshContext>,
  /** null **/
  stagingxdai_assets: InContextSdkMethod<Subscription['stagingxdai_assets'], Subscriptionstagingxdai_assetsArgs, MeshContext>,
  /** null **/
  stagingxdai_assetStatus: InContextSdkMethod<Subscription['stagingxdai_assetStatus'], Subscriptionstagingxdai_assetStatusArgs, MeshContext>,
  /** null **/
  stagingxdai_assetStatuses: InContextSdkMethod<Subscription['stagingxdai_assetStatuses'], Subscriptionstagingxdai_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingxdai_assetBalance: InContextSdkMethod<Subscription['stagingxdai_assetBalance'], Subscriptionstagingxdai_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingxdai_assetBalances: InContextSdkMethod<Subscription['stagingxdai_assetBalances'], Subscriptionstagingxdai_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingxdai_router: InContextSdkMethod<Subscription['stagingxdai_router'], Subscriptionstagingxdai_routerArgs, MeshContext>,
  /** null **/
  stagingxdai_routers: InContextSdkMethod<Subscription['stagingxdai_routers'], Subscriptionstagingxdai_routersArgs, MeshContext>,
  /** null **/
  stagingxdai_routerDailyTVL: InContextSdkMethod<Subscription['stagingxdai_routerDailyTVL'], Subscriptionstagingxdai_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingxdai_routerDailyTVLs: InContextSdkMethod<Subscription['stagingxdai_routerDailyTVLs'], Subscriptionstagingxdai_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingxdai_routerLiquidityEvent: InContextSdkMethod<Subscription['stagingxdai_routerLiquidityEvent'], Subscriptionstagingxdai_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingxdai_routerLiquidityEvents: InContextSdkMethod<Subscription['stagingxdai_routerLiquidityEvents'], Subscriptionstagingxdai_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingxdai_setting: InContextSdkMethod<Subscription['stagingxdai_setting'], Subscriptionstagingxdai_settingArgs, MeshContext>,
  /** null **/
  stagingxdai_settings: InContextSdkMethod<Subscription['stagingxdai_settings'], Subscriptionstagingxdai_settingsArgs, MeshContext>,
  /** null **/
  stagingxdai_relayer: InContextSdkMethod<Subscription['stagingxdai_relayer'], Subscriptionstagingxdai_relayerArgs, MeshContext>,
  /** null **/
  stagingxdai_relayers: InContextSdkMethod<Subscription['stagingxdai_relayers'], Subscriptionstagingxdai_relayersArgs, MeshContext>,
  /** null **/
  stagingxdai_sequencer: InContextSdkMethod<Subscription['stagingxdai_sequencer'], Subscriptionstagingxdai_sequencerArgs, MeshContext>,
  /** null **/
  stagingxdai_sequencers: InContextSdkMethod<Subscription['stagingxdai_sequencers'], Subscriptionstagingxdai_sequencersArgs, MeshContext>,
  /** null **/
  stagingxdai_relayerFee: InContextSdkMethod<Subscription['stagingxdai_relayerFee'], Subscriptionstagingxdai_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingxdai_relayerFees: InContextSdkMethod<Subscription['stagingxdai_relayerFees'], Subscriptionstagingxdai_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingxdai_originTransfer: InContextSdkMethod<Subscription['stagingxdai_originTransfer'], Subscriptionstagingxdai_originTransferArgs, MeshContext>,
  /** null **/
  stagingxdai_originTransfers: InContextSdkMethod<Subscription['stagingxdai_originTransfers'], Subscriptionstagingxdai_originTransfersArgs, MeshContext>,
  /** null **/
  stagingxdai_destinationTransfer: InContextSdkMethod<Subscription['stagingxdai_destinationTransfer'], Subscriptionstagingxdai_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingxdai_destinationTransfers: InContextSdkMethod<Subscription['stagingxdai_destinationTransfers'], Subscriptionstagingxdai_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingxdai_originMessage: InContextSdkMethod<Subscription['stagingxdai_originMessage'], Subscriptionstagingxdai_originMessageArgs, MeshContext>,
  /** null **/
  stagingxdai_originMessages: InContextSdkMethod<Subscription['stagingxdai_originMessages'], Subscriptionstagingxdai_originMessagesArgs, MeshContext>,
  /** null **/
  stagingxdai_aggregateRoot: InContextSdkMethod<Subscription['stagingxdai_aggregateRoot'], Subscriptionstagingxdai_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingxdai_aggregateRoots: InContextSdkMethod<Subscription['stagingxdai_aggregateRoots'], Subscriptionstagingxdai_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingxdai_connectorMeta: InContextSdkMethod<Subscription['stagingxdai_connectorMeta'], Subscriptionstagingxdai_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingxdai_connectorMetas: InContextSdkMethod<Subscription['stagingxdai_connectorMetas'], Subscriptionstagingxdai_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingxdai_rootCount: InContextSdkMethod<Subscription['stagingxdai_rootCount'], Subscriptionstagingxdai_rootCountArgs, MeshContext>,
  /** null **/
  stagingxdai_rootCounts: InContextSdkMethod<Subscription['stagingxdai_rootCounts'], Subscriptionstagingxdai_rootCountsArgs, MeshContext>,
  /** null **/
  stagingxdai_rootMessageSent: InContextSdkMethod<Subscription['stagingxdai_rootMessageSent'], Subscriptionstagingxdai_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingxdai_rootMessageSents: InContextSdkMethod<Subscription['stagingxdai_rootMessageSents'], Subscriptionstagingxdai_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingxdai_relayerFeesIncrease: InContextSdkMethod<Subscription['stagingxdai_relayerFeesIncrease'], Subscriptionstagingxdai_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingxdai_relayerFeesIncreases: InContextSdkMethod<Subscription['stagingxdai_relayerFeesIncreases'], Subscriptionstagingxdai_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingxdai_slippageUpdate: InContextSdkMethod<Subscription['stagingxdai_slippageUpdate'], Subscriptionstagingxdai_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingxdai_slippageUpdates: InContextSdkMethod<Subscription['stagingxdai_slippageUpdates'], Subscriptionstagingxdai_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingxdai_snapshotRoot: InContextSdkMethod<Subscription['stagingxdai_snapshotRoot'], Subscriptionstagingxdai_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingxdai_snapshotRoots: InContextSdkMethod<Subscription['stagingxdai_snapshotRoots'], Subscriptionstagingxdai_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingxdai_spokeConnectorMode: InContextSdkMethod<Subscription['stagingxdai_spokeConnectorMode'], Subscriptionstagingxdai_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingxdai_spokeConnectorModes: InContextSdkMethod<Subscription['stagingxdai_spokeConnectorModes'], Subscriptionstagingxdai_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingxdai_aggregateRootProposed: InContextSdkMethod<Subscription['stagingxdai_aggregateRootProposed'], Subscriptionstagingxdai_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingxdai_aggregateRootProposeds: InContextSdkMethod<Subscription['stagingxdai_aggregateRootProposeds'], Subscriptionstagingxdai_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingxdai_optimisticRootFinalized: InContextSdkMethod<Subscription['stagingxdai_optimisticRootFinalized'], Subscriptionstagingxdai_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingxdai_optimisticRootFinalizeds: InContextSdkMethod<Subscription['stagingxdai_optimisticRootFinalizeds'], Subscriptionstagingxdai_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingxdai__meta: InContextSdkMethod<Subscription['stagingxdai__meta'], Subscriptionstagingxdai__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Staging_Xdai"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
