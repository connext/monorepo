// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextStagingPolygonZkEvmTypes {
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
  stagingpolygonzkevm_BigDecimal: any;
  BigInt: any;
  stagingpolygonzkevm_Bytes: any;
  stagingpolygonzkevm_Int8: any;
};

export type stagingpolygonzkevm_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['stagingpolygonzkevm_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type stagingpolygonzkevm_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingpolygonzkevm_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingpolygonzkevm_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
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
  _change_block?: InputMaybe<stagingpolygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_AggregateRootProposed_filter>>>;
};

export type stagingpolygonzkevm_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type stagingpolygonzkevm_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_AggregateRoot_filter>>>;
};

export type stagingpolygonzkevm_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type stagingpolygonzkevm_Aggregation_interval =
  | 'hour'
  | 'day';

export type stagingpolygonzkevm_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  localAsset?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingpolygonzkevm_AssetStatus>;
};

export type stagingpolygonzkevm_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: stagingpolygonzkevm_Router;
  asset: stagingpolygonzkevm_Asset;
  feesEarned: Scalars['BigInt'];
};

export type stagingpolygonzkevm_AssetBalance_filter = {
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
  router_?: InputMaybe<stagingpolygonzkevm_Router_filter>;
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
  asset_?: InputMaybe<stagingpolygonzkevm_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_AssetBalance_filter>>>;
};

export type stagingpolygonzkevm_AssetBalance_orderBy =
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

export type stagingpolygonzkevm_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type stagingpolygonzkevm_AssetStatus_filter = {
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
  _change_block?: InputMaybe<stagingpolygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_AssetStatus_filter>>>;
};

export type stagingpolygonzkevm_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type stagingpolygonzkevm_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  key_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  key_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  key_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  key_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  key_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  key_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  localAsset?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
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
  status_?: InputMaybe<stagingpolygonzkevm_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_Asset_filter>>>;
};

export type stagingpolygonzkevm_Asset_orderBy =
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

export type stagingpolygonzkevm_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingpolygonzkevm_Block_height = {
  hash?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type stagingpolygonzkevm_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  rootManager?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  mirrorConnector?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
};

export type stagingpolygonzkevm_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_ConnectorMeta_filter>>>;
};

export type stagingpolygonzkevm_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingpolygonzkevm_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingpolygonzkevm_TransferStatus>;
  routers?: Maybe<Array<stagingpolygonzkevm_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  delegate?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  asset?: Maybe<stagingpolygonzkevm_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingpolygonzkevm_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_Router_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_Router_filter>;
};

export type stagingpolygonzkevm_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingpolygonzkevm_TransferStatus>;
  status_not?: InputMaybe<stagingpolygonzkevm_TransferStatus>;
  status_in?: InputMaybe<Array<stagingpolygonzkevm_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingpolygonzkevm_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<stagingpolygonzkevm_Router_filter>;
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
  to?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
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
  originSender?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
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
  asset_?: InputMaybe<stagingpolygonzkevm_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_DestinationTransfer_filter>>>;
};

export type stagingpolygonzkevm_DestinationTransfer_orderBy =
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

export type stagingpolygonzkevm_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingpolygonzkevm_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingpolygonzkevm_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
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
  _change_block?: InputMaybe<stagingpolygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_OptimisticRootFinalized_filter>>>;
};

export type stagingpolygonzkevm_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type stagingpolygonzkevm_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingpolygonzkevm_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<stagingpolygonzkevm_RootCount>;
};

export type stagingpolygonzkevm_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  leaf_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  message_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  message_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  message_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  message_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  message_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  message_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
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
  rootCount_?: InputMaybe<stagingpolygonzkevm_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_OriginMessage_filter>>>;
};

export type stagingpolygonzkevm_OriginMessage_orderBy =
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

export type stagingpolygonzkevm_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingpolygonzkevm_TransferStatus>;
  messageHash?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  delegate?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  asset?: Maybe<stagingpolygonzkevm_Asset>;
  transactingAsset?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  message?: Maybe<stagingpolygonzkevm_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<stagingpolygonzkevm_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingpolygonzkevm_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_RelayerFee_filter>;
};

export type stagingpolygonzkevm_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingpolygonzkevm_TransferStatus>;
  status_not?: InputMaybe<stagingpolygonzkevm_TransferStatus>;
  status_in?: InputMaybe<Array<stagingpolygonzkevm_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingpolygonzkevm_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
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
  to?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
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
  asset_?: InputMaybe<stagingpolygonzkevm_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
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
  message_?: InputMaybe<stagingpolygonzkevm_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<stagingpolygonzkevm_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_OriginTransfer_filter>>>;
};

export type stagingpolygonzkevm_OriginTransfer_orderBy =
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
  stagingpolygonzkevm_asset?: Maybe<stagingpolygonzkevm_Asset>;
  stagingpolygonzkevm_assets: Array<stagingpolygonzkevm_Asset>;
  stagingpolygonzkevm_assetStatus?: Maybe<stagingpolygonzkevm_AssetStatus>;
  stagingpolygonzkevm_assetStatuses: Array<stagingpolygonzkevm_AssetStatus>;
  stagingpolygonzkevm_assetBalance?: Maybe<stagingpolygonzkevm_AssetBalance>;
  stagingpolygonzkevm_assetBalances: Array<stagingpolygonzkevm_AssetBalance>;
  stagingpolygonzkevm_router?: Maybe<stagingpolygonzkevm_Router>;
  stagingpolygonzkevm_routers: Array<stagingpolygonzkevm_Router>;
  stagingpolygonzkevm_routerDailyTVL?: Maybe<stagingpolygonzkevm_RouterDailyTVL>;
  stagingpolygonzkevm_routerDailyTVLs: Array<stagingpolygonzkevm_RouterDailyTVL>;
  stagingpolygonzkevm_routerLiquidityEvent?: Maybe<stagingpolygonzkevm_RouterLiquidityEvent>;
  stagingpolygonzkevm_routerLiquidityEvents: Array<stagingpolygonzkevm_RouterLiquidityEvent>;
  stagingpolygonzkevm_setting?: Maybe<stagingpolygonzkevm_Setting>;
  stagingpolygonzkevm_settings: Array<stagingpolygonzkevm_Setting>;
  stagingpolygonzkevm_relayer?: Maybe<stagingpolygonzkevm_Relayer>;
  stagingpolygonzkevm_relayers: Array<stagingpolygonzkevm_Relayer>;
  stagingpolygonzkevm_sequencer?: Maybe<stagingpolygonzkevm_Sequencer>;
  stagingpolygonzkevm_sequencers: Array<stagingpolygonzkevm_Sequencer>;
  stagingpolygonzkevm_relayerFee?: Maybe<stagingpolygonzkevm_RelayerFee>;
  stagingpolygonzkevm_relayerFees: Array<stagingpolygonzkevm_RelayerFee>;
  stagingpolygonzkevm_originTransfer?: Maybe<stagingpolygonzkevm_OriginTransfer>;
  stagingpolygonzkevm_originTransfers: Array<stagingpolygonzkevm_OriginTransfer>;
  stagingpolygonzkevm_destinationTransfer?: Maybe<stagingpolygonzkevm_DestinationTransfer>;
  stagingpolygonzkevm_destinationTransfers: Array<stagingpolygonzkevm_DestinationTransfer>;
  stagingpolygonzkevm_originMessage?: Maybe<stagingpolygonzkevm_OriginMessage>;
  stagingpolygonzkevm_originMessages: Array<stagingpolygonzkevm_OriginMessage>;
  stagingpolygonzkevm_aggregateRoot?: Maybe<stagingpolygonzkevm_AggregateRoot>;
  stagingpolygonzkevm_aggregateRoots: Array<stagingpolygonzkevm_AggregateRoot>;
  stagingpolygonzkevm_connectorMeta?: Maybe<stagingpolygonzkevm_ConnectorMeta>;
  stagingpolygonzkevm_connectorMetas: Array<stagingpolygonzkevm_ConnectorMeta>;
  stagingpolygonzkevm_rootCount?: Maybe<stagingpolygonzkevm_RootCount>;
  stagingpolygonzkevm_rootCounts: Array<stagingpolygonzkevm_RootCount>;
  stagingpolygonzkevm_rootMessageSent?: Maybe<stagingpolygonzkevm_RootMessageSent>;
  stagingpolygonzkevm_rootMessageSents: Array<stagingpolygonzkevm_RootMessageSent>;
  stagingpolygonzkevm_relayerFeesIncrease?: Maybe<stagingpolygonzkevm_RelayerFeesIncrease>;
  stagingpolygonzkevm_relayerFeesIncreases: Array<stagingpolygonzkevm_RelayerFeesIncrease>;
  stagingpolygonzkevm_slippageUpdate?: Maybe<stagingpolygonzkevm_SlippageUpdate>;
  stagingpolygonzkevm_slippageUpdates: Array<stagingpolygonzkevm_SlippageUpdate>;
  stagingpolygonzkevm_snapshotRoot?: Maybe<stagingpolygonzkevm_SnapshotRoot>;
  stagingpolygonzkevm_snapshotRoots: Array<stagingpolygonzkevm_SnapshotRoot>;
  stagingpolygonzkevm_spokeConnectorMode?: Maybe<stagingpolygonzkevm_SpokeConnectorMode>;
  stagingpolygonzkevm_spokeConnectorModes: Array<stagingpolygonzkevm_SpokeConnectorMode>;
  stagingpolygonzkevm_aggregateRootProposed?: Maybe<stagingpolygonzkevm_AggregateRootProposed>;
  stagingpolygonzkevm_aggregateRootProposeds: Array<stagingpolygonzkevm_AggregateRootProposed>;
  stagingpolygonzkevm_optimisticRootFinalized?: Maybe<stagingpolygonzkevm_OptimisticRootFinalized>;
  stagingpolygonzkevm_optimisticRootFinalizeds: Array<stagingpolygonzkevm_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingpolygonzkevm__meta?: Maybe<stagingpolygonzkevm__Meta_>;
};


export type Querystagingpolygonzkevm_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_Asset_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_AssetStatus_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_AssetBalance_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_Router_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_Router_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_Setting_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_Relayer_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_Sequencer_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_RelayerFee_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_OriginTransfer_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_DestinationTransfer_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_OriginMessage_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_AggregateRoot_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_ConnectorMeta_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_RootCount_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_RootMessageSent_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_SlippageUpdate_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_SnapshotRoot_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygonzkevm__metaArgs = {
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
};

export type stagingpolygonzkevm_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
};

export type stagingpolygonzkevm_RelayerFee = {
  id: Scalars['ID'];
  transfer: stagingpolygonzkevm_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['stagingpolygonzkevm_Bytes'];
};

export type stagingpolygonzkevm_RelayerFee_filter = {
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
  transfer_?: InputMaybe<stagingpolygonzkevm_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_RelayerFee_filter>>>;
};

export type stagingpolygonzkevm_RelayerFee_orderBy =
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

export type stagingpolygonzkevm_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: stagingpolygonzkevm_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller: Scalars['stagingpolygonzkevm_Bytes'];
  transactionHash: Scalars['stagingpolygonzkevm_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingpolygonzkevm_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<stagingpolygonzkevm_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
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
  _change_block?: InputMaybe<stagingpolygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_RelayerFeesIncrease_filter>>>;
};

export type stagingpolygonzkevm_RelayerFeesIncrease_orderBy =
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

export type stagingpolygonzkevm_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  relayer_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_Relayer_filter>>>;
};

export type stagingpolygonzkevm_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type stagingpolygonzkevm_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type stagingpolygonzkevm_RootCount_filter = {
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
  _change_block?: InputMaybe<stagingpolygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_RootCount_filter>>>;
};

export type stagingpolygonzkevm_RootCount_orderBy =
  | 'id'
  | 'count';

export type stagingpolygonzkevm_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingpolygonzkevm_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
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
  _change_block?: InputMaybe<stagingpolygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_RootMessageSent_filter>>>;
};

export type stagingpolygonzkevm_RootMessageSent_orderBy =
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

export type stagingpolygonzkevm_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  recipient?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  proposedOwner?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<stagingpolygonzkevm_AssetBalance>;
};


export type stagingpolygonzkevm_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_AssetBalance_filter>;
};

export type stagingpolygonzkevm_RouterDailyTVL = {
  id: Scalars['ID'];
  router: stagingpolygonzkevm_Router;
  asset: stagingpolygonzkevm_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type stagingpolygonzkevm_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<stagingpolygonzkevm_Router_filter>;
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
  asset_?: InputMaybe<stagingpolygonzkevm_Asset_filter>;
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
  _change_block?: InputMaybe<stagingpolygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_RouterDailyTVL_filter>>>;
};

export type stagingpolygonzkevm_RouterDailyTVL_orderBy =
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

export type stagingpolygonzkevm_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<stagingpolygonzkevm_RouterLiquidityEventType>;
  router: stagingpolygonzkevm_Router;
  asset: stagingpolygonzkevm_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['stagingpolygonzkevm_Bytes'];
  nonce: Scalars['BigInt'];
};

export type stagingpolygonzkevm_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type stagingpolygonzkevm_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<stagingpolygonzkevm_RouterLiquidityEventType>;
  type_not?: InputMaybe<stagingpolygonzkevm_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<stagingpolygonzkevm_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<stagingpolygonzkevm_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<stagingpolygonzkevm_Router_filter>;
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
  asset_?: InputMaybe<stagingpolygonzkevm_Asset_filter>;
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
  caller?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_RouterLiquidityEvent_filter>>>;
};

export type stagingpolygonzkevm_RouterLiquidityEvent_orderBy =
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

export type stagingpolygonzkevm_Router_filter = {
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
  owner?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  owner_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  owner_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  owner_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  owner_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  owner_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  recipient?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  recipient_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<stagingpolygonzkevm_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_Router_filter>>>;
};

export type stagingpolygonzkevm_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type stagingpolygonzkevm_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
};

export type stagingpolygonzkevm_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_Sequencer_filter>>>;
};

export type stagingpolygonzkevm_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type stagingpolygonzkevm_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['stagingpolygonzkevm_Bytes'];
};

export type stagingpolygonzkevm_Setting_filter = {
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
  caller?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_Setting_filter>>>;
};

export type stagingpolygonzkevm_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type stagingpolygonzkevm_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: stagingpolygonzkevm_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['stagingpolygonzkevm_Bytes'];
  transactionHash: Scalars['stagingpolygonzkevm_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingpolygonzkevm_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<stagingpolygonzkevm_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
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
  _change_block?: InputMaybe<stagingpolygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_SlippageUpdate_filter>>>;
};

export type stagingpolygonzkevm_SlippageUpdate_orderBy =
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

export type stagingpolygonzkevm_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['stagingpolygonzkevm_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingpolygonzkevm_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingpolygonzkevm_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingpolygonzkevm_Bytes']>;
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
  _change_block?: InputMaybe<stagingpolygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_SnapshotRoot_filter>>>;
};

export type stagingpolygonzkevm_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type stagingpolygonzkevm_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type stagingpolygonzkevm_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<stagingpolygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygonzkevm_SpokeConnectorMode_filter>>>;
};

export type stagingpolygonzkevm_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  stagingpolygonzkevm_asset?: Maybe<stagingpolygonzkevm_Asset>;
  stagingpolygonzkevm_assets: Array<stagingpolygonzkevm_Asset>;
  stagingpolygonzkevm_assetStatus?: Maybe<stagingpolygonzkevm_AssetStatus>;
  stagingpolygonzkevm_assetStatuses: Array<stagingpolygonzkevm_AssetStatus>;
  stagingpolygonzkevm_assetBalance?: Maybe<stagingpolygonzkevm_AssetBalance>;
  stagingpolygonzkevm_assetBalances: Array<stagingpolygonzkevm_AssetBalance>;
  stagingpolygonzkevm_router?: Maybe<stagingpolygonzkevm_Router>;
  stagingpolygonzkevm_routers: Array<stagingpolygonzkevm_Router>;
  stagingpolygonzkevm_routerDailyTVL?: Maybe<stagingpolygonzkevm_RouterDailyTVL>;
  stagingpolygonzkevm_routerDailyTVLs: Array<stagingpolygonzkevm_RouterDailyTVL>;
  stagingpolygonzkevm_routerLiquidityEvent?: Maybe<stagingpolygonzkevm_RouterLiquidityEvent>;
  stagingpolygonzkevm_routerLiquidityEvents: Array<stagingpolygonzkevm_RouterLiquidityEvent>;
  stagingpolygonzkevm_setting?: Maybe<stagingpolygonzkevm_Setting>;
  stagingpolygonzkevm_settings: Array<stagingpolygonzkevm_Setting>;
  stagingpolygonzkevm_relayer?: Maybe<stagingpolygonzkevm_Relayer>;
  stagingpolygonzkevm_relayers: Array<stagingpolygonzkevm_Relayer>;
  stagingpolygonzkevm_sequencer?: Maybe<stagingpolygonzkevm_Sequencer>;
  stagingpolygonzkevm_sequencers: Array<stagingpolygonzkevm_Sequencer>;
  stagingpolygonzkevm_relayerFee?: Maybe<stagingpolygonzkevm_RelayerFee>;
  stagingpolygonzkevm_relayerFees: Array<stagingpolygonzkevm_RelayerFee>;
  stagingpolygonzkevm_originTransfer?: Maybe<stagingpolygonzkevm_OriginTransfer>;
  stagingpolygonzkevm_originTransfers: Array<stagingpolygonzkevm_OriginTransfer>;
  stagingpolygonzkevm_destinationTransfer?: Maybe<stagingpolygonzkevm_DestinationTransfer>;
  stagingpolygonzkevm_destinationTransfers: Array<stagingpolygonzkevm_DestinationTransfer>;
  stagingpolygonzkevm_originMessage?: Maybe<stagingpolygonzkevm_OriginMessage>;
  stagingpolygonzkevm_originMessages: Array<stagingpolygonzkevm_OriginMessage>;
  stagingpolygonzkevm_aggregateRoot?: Maybe<stagingpolygonzkevm_AggregateRoot>;
  stagingpolygonzkevm_aggregateRoots: Array<stagingpolygonzkevm_AggregateRoot>;
  stagingpolygonzkevm_connectorMeta?: Maybe<stagingpolygonzkevm_ConnectorMeta>;
  stagingpolygonzkevm_connectorMetas: Array<stagingpolygonzkevm_ConnectorMeta>;
  stagingpolygonzkevm_rootCount?: Maybe<stagingpolygonzkevm_RootCount>;
  stagingpolygonzkevm_rootCounts: Array<stagingpolygonzkevm_RootCount>;
  stagingpolygonzkevm_rootMessageSent?: Maybe<stagingpolygonzkevm_RootMessageSent>;
  stagingpolygonzkevm_rootMessageSents: Array<stagingpolygonzkevm_RootMessageSent>;
  stagingpolygonzkevm_relayerFeesIncrease?: Maybe<stagingpolygonzkevm_RelayerFeesIncrease>;
  stagingpolygonzkevm_relayerFeesIncreases: Array<stagingpolygonzkevm_RelayerFeesIncrease>;
  stagingpolygonzkevm_slippageUpdate?: Maybe<stagingpolygonzkevm_SlippageUpdate>;
  stagingpolygonzkevm_slippageUpdates: Array<stagingpolygonzkevm_SlippageUpdate>;
  stagingpolygonzkevm_snapshotRoot?: Maybe<stagingpolygonzkevm_SnapshotRoot>;
  stagingpolygonzkevm_snapshotRoots: Array<stagingpolygonzkevm_SnapshotRoot>;
  stagingpolygonzkevm_spokeConnectorMode?: Maybe<stagingpolygonzkevm_SpokeConnectorMode>;
  stagingpolygonzkevm_spokeConnectorModes: Array<stagingpolygonzkevm_SpokeConnectorMode>;
  stagingpolygonzkevm_aggregateRootProposed?: Maybe<stagingpolygonzkevm_AggregateRootProposed>;
  stagingpolygonzkevm_aggregateRootProposeds: Array<stagingpolygonzkevm_AggregateRootProposed>;
  stagingpolygonzkevm_optimisticRootFinalized?: Maybe<stagingpolygonzkevm_OptimisticRootFinalized>;
  stagingpolygonzkevm_optimisticRootFinalizeds: Array<stagingpolygonzkevm_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingpolygonzkevm__meta?: Maybe<stagingpolygonzkevm__Meta_>;
};


export type Subscriptionstagingpolygonzkevm_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_Asset_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_AssetStatus_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_AssetBalance_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_Router_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_Router_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_Setting_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_Relayer_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_Sequencer_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_RelayerFee_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_OriginTransfer_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_DestinationTransfer_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_OriginMessage_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_AggregateRoot_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_ConnectorMeta_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_RootCount_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_RootMessageSent_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_SlippageUpdate_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_SnapshotRoot_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygonzkevm_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingpolygonzkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygonzkevm_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygonzkevm__metaArgs = {
  block?: InputMaybe<stagingpolygonzkevm_Block_height>;
};

export type stagingpolygonzkevm_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type stagingpolygonzkevm__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingpolygonzkevm_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type stagingpolygonzkevm__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingpolygonzkevm__Block_;
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
  stagingpolygonzkevm_asset: InContextSdkMethod<Query['stagingpolygonzkevm_asset'], Querystagingpolygonzkevm_assetArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_assets: InContextSdkMethod<Query['stagingpolygonzkevm_assets'], Querystagingpolygonzkevm_assetsArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_assetStatus: InContextSdkMethod<Query['stagingpolygonzkevm_assetStatus'], Querystagingpolygonzkevm_assetStatusArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_assetStatuses: InContextSdkMethod<Query['stagingpolygonzkevm_assetStatuses'], Querystagingpolygonzkevm_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_assetBalance: InContextSdkMethod<Query['stagingpolygonzkevm_assetBalance'], Querystagingpolygonzkevm_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_assetBalances: InContextSdkMethod<Query['stagingpolygonzkevm_assetBalances'], Querystagingpolygonzkevm_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_router: InContextSdkMethod<Query['stagingpolygonzkevm_router'], Querystagingpolygonzkevm_routerArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_routers: InContextSdkMethod<Query['stagingpolygonzkevm_routers'], Querystagingpolygonzkevm_routersArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_routerDailyTVL: InContextSdkMethod<Query['stagingpolygonzkevm_routerDailyTVL'], Querystagingpolygonzkevm_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_routerDailyTVLs: InContextSdkMethod<Query['stagingpolygonzkevm_routerDailyTVLs'], Querystagingpolygonzkevm_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_routerLiquidityEvent: InContextSdkMethod<Query['stagingpolygonzkevm_routerLiquidityEvent'], Querystagingpolygonzkevm_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_routerLiquidityEvents: InContextSdkMethod<Query['stagingpolygonzkevm_routerLiquidityEvents'], Querystagingpolygonzkevm_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_setting: InContextSdkMethod<Query['stagingpolygonzkevm_setting'], Querystagingpolygonzkevm_settingArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_settings: InContextSdkMethod<Query['stagingpolygonzkevm_settings'], Querystagingpolygonzkevm_settingsArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_relayer: InContextSdkMethod<Query['stagingpolygonzkevm_relayer'], Querystagingpolygonzkevm_relayerArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_relayers: InContextSdkMethod<Query['stagingpolygonzkevm_relayers'], Querystagingpolygonzkevm_relayersArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_sequencer: InContextSdkMethod<Query['stagingpolygonzkevm_sequencer'], Querystagingpolygonzkevm_sequencerArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_sequencers: InContextSdkMethod<Query['stagingpolygonzkevm_sequencers'], Querystagingpolygonzkevm_sequencersArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_relayerFee: InContextSdkMethod<Query['stagingpolygonzkevm_relayerFee'], Querystagingpolygonzkevm_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_relayerFees: InContextSdkMethod<Query['stagingpolygonzkevm_relayerFees'], Querystagingpolygonzkevm_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_originTransfer: InContextSdkMethod<Query['stagingpolygonzkevm_originTransfer'], Querystagingpolygonzkevm_originTransferArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_originTransfers: InContextSdkMethod<Query['stagingpolygonzkevm_originTransfers'], Querystagingpolygonzkevm_originTransfersArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_destinationTransfer: InContextSdkMethod<Query['stagingpolygonzkevm_destinationTransfer'], Querystagingpolygonzkevm_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_destinationTransfers: InContextSdkMethod<Query['stagingpolygonzkevm_destinationTransfers'], Querystagingpolygonzkevm_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_originMessage: InContextSdkMethod<Query['stagingpolygonzkevm_originMessage'], Querystagingpolygonzkevm_originMessageArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_originMessages: InContextSdkMethod<Query['stagingpolygonzkevm_originMessages'], Querystagingpolygonzkevm_originMessagesArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_aggregateRoot: InContextSdkMethod<Query['stagingpolygonzkevm_aggregateRoot'], Querystagingpolygonzkevm_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_aggregateRoots: InContextSdkMethod<Query['stagingpolygonzkevm_aggregateRoots'], Querystagingpolygonzkevm_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_connectorMeta: InContextSdkMethod<Query['stagingpolygonzkevm_connectorMeta'], Querystagingpolygonzkevm_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_connectorMetas: InContextSdkMethod<Query['stagingpolygonzkevm_connectorMetas'], Querystagingpolygonzkevm_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_rootCount: InContextSdkMethod<Query['stagingpolygonzkevm_rootCount'], Querystagingpolygonzkevm_rootCountArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_rootCounts: InContextSdkMethod<Query['stagingpolygonzkevm_rootCounts'], Querystagingpolygonzkevm_rootCountsArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_rootMessageSent: InContextSdkMethod<Query['stagingpolygonzkevm_rootMessageSent'], Querystagingpolygonzkevm_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_rootMessageSents: InContextSdkMethod<Query['stagingpolygonzkevm_rootMessageSents'], Querystagingpolygonzkevm_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_relayerFeesIncrease: InContextSdkMethod<Query['stagingpolygonzkevm_relayerFeesIncrease'], Querystagingpolygonzkevm_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_relayerFeesIncreases: InContextSdkMethod<Query['stagingpolygonzkevm_relayerFeesIncreases'], Querystagingpolygonzkevm_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_slippageUpdate: InContextSdkMethod<Query['stagingpolygonzkevm_slippageUpdate'], Querystagingpolygonzkevm_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_slippageUpdates: InContextSdkMethod<Query['stagingpolygonzkevm_slippageUpdates'], Querystagingpolygonzkevm_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_snapshotRoot: InContextSdkMethod<Query['stagingpolygonzkevm_snapshotRoot'], Querystagingpolygonzkevm_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_snapshotRoots: InContextSdkMethod<Query['stagingpolygonzkevm_snapshotRoots'], Querystagingpolygonzkevm_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_spokeConnectorMode: InContextSdkMethod<Query['stagingpolygonzkevm_spokeConnectorMode'], Querystagingpolygonzkevm_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_spokeConnectorModes: InContextSdkMethod<Query['stagingpolygonzkevm_spokeConnectorModes'], Querystagingpolygonzkevm_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_aggregateRootProposed: InContextSdkMethod<Query['stagingpolygonzkevm_aggregateRootProposed'], Querystagingpolygonzkevm_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_aggregateRootProposeds: InContextSdkMethod<Query['stagingpolygonzkevm_aggregateRootProposeds'], Querystagingpolygonzkevm_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_optimisticRootFinalized: InContextSdkMethod<Query['stagingpolygonzkevm_optimisticRootFinalized'], Querystagingpolygonzkevm_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_optimisticRootFinalizeds: InContextSdkMethod<Query['stagingpolygonzkevm_optimisticRootFinalizeds'], Querystagingpolygonzkevm_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingpolygonzkevm__meta: InContextSdkMethod<Query['stagingpolygonzkevm__meta'], Querystagingpolygonzkevm__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  stagingpolygonzkevm_asset: InContextSdkMethod<Subscription['stagingpolygonzkevm_asset'], Subscriptionstagingpolygonzkevm_assetArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_assets: InContextSdkMethod<Subscription['stagingpolygonzkevm_assets'], Subscriptionstagingpolygonzkevm_assetsArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_assetStatus: InContextSdkMethod<Subscription['stagingpolygonzkevm_assetStatus'], Subscriptionstagingpolygonzkevm_assetStatusArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_assetStatuses: InContextSdkMethod<Subscription['stagingpolygonzkevm_assetStatuses'], Subscriptionstagingpolygonzkevm_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_assetBalance: InContextSdkMethod<Subscription['stagingpolygonzkevm_assetBalance'], Subscriptionstagingpolygonzkevm_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_assetBalances: InContextSdkMethod<Subscription['stagingpolygonzkevm_assetBalances'], Subscriptionstagingpolygonzkevm_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_router: InContextSdkMethod<Subscription['stagingpolygonzkevm_router'], Subscriptionstagingpolygonzkevm_routerArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_routers: InContextSdkMethod<Subscription['stagingpolygonzkevm_routers'], Subscriptionstagingpolygonzkevm_routersArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_routerDailyTVL: InContextSdkMethod<Subscription['stagingpolygonzkevm_routerDailyTVL'], Subscriptionstagingpolygonzkevm_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_routerDailyTVLs: InContextSdkMethod<Subscription['stagingpolygonzkevm_routerDailyTVLs'], Subscriptionstagingpolygonzkevm_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_routerLiquidityEvent: InContextSdkMethod<Subscription['stagingpolygonzkevm_routerLiquidityEvent'], Subscriptionstagingpolygonzkevm_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_routerLiquidityEvents: InContextSdkMethod<Subscription['stagingpolygonzkevm_routerLiquidityEvents'], Subscriptionstagingpolygonzkevm_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_setting: InContextSdkMethod<Subscription['stagingpolygonzkevm_setting'], Subscriptionstagingpolygonzkevm_settingArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_settings: InContextSdkMethod<Subscription['stagingpolygonzkevm_settings'], Subscriptionstagingpolygonzkevm_settingsArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_relayer: InContextSdkMethod<Subscription['stagingpolygonzkevm_relayer'], Subscriptionstagingpolygonzkevm_relayerArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_relayers: InContextSdkMethod<Subscription['stagingpolygonzkevm_relayers'], Subscriptionstagingpolygonzkevm_relayersArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_sequencer: InContextSdkMethod<Subscription['stagingpolygonzkevm_sequencer'], Subscriptionstagingpolygonzkevm_sequencerArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_sequencers: InContextSdkMethod<Subscription['stagingpolygonzkevm_sequencers'], Subscriptionstagingpolygonzkevm_sequencersArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_relayerFee: InContextSdkMethod<Subscription['stagingpolygonzkevm_relayerFee'], Subscriptionstagingpolygonzkevm_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_relayerFees: InContextSdkMethod<Subscription['stagingpolygonzkevm_relayerFees'], Subscriptionstagingpolygonzkevm_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_originTransfer: InContextSdkMethod<Subscription['stagingpolygonzkevm_originTransfer'], Subscriptionstagingpolygonzkevm_originTransferArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_originTransfers: InContextSdkMethod<Subscription['stagingpolygonzkevm_originTransfers'], Subscriptionstagingpolygonzkevm_originTransfersArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_destinationTransfer: InContextSdkMethod<Subscription['stagingpolygonzkevm_destinationTransfer'], Subscriptionstagingpolygonzkevm_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_destinationTransfers: InContextSdkMethod<Subscription['stagingpolygonzkevm_destinationTransfers'], Subscriptionstagingpolygonzkevm_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_originMessage: InContextSdkMethod<Subscription['stagingpolygonzkevm_originMessage'], Subscriptionstagingpolygonzkevm_originMessageArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_originMessages: InContextSdkMethod<Subscription['stagingpolygonzkevm_originMessages'], Subscriptionstagingpolygonzkevm_originMessagesArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_aggregateRoot: InContextSdkMethod<Subscription['stagingpolygonzkevm_aggregateRoot'], Subscriptionstagingpolygonzkevm_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_aggregateRoots: InContextSdkMethod<Subscription['stagingpolygonzkevm_aggregateRoots'], Subscriptionstagingpolygonzkevm_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_connectorMeta: InContextSdkMethod<Subscription['stagingpolygonzkevm_connectorMeta'], Subscriptionstagingpolygonzkevm_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_connectorMetas: InContextSdkMethod<Subscription['stagingpolygonzkevm_connectorMetas'], Subscriptionstagingpolygonzkevm_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_rootCount: InContextSdkMethod<Subscription['stagingpolygonzkevm_rootCount'], Subscriptionstagingpolygonzkevm_rootCountArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_rootCounts: InContextSdkMethod<Subscription['stagingpolygonzkevm_rootCounts'], Subscriptionstagingpolygonzkevm_rootCountsArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_rootMessageSent: InContextSdkMethod<Subscription['stagingpolygonzkevm_rootMessageSent'], Subscriptionstagingpolygonzkevm_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_rootMessageSents: InContextSdkMethod<Subscription['stagingpolygonzkevm_rootMessageSents'], Subscriptionstagingpolygonzkevm_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_relayerFeesIncrease: InContextSdkMethod<Subscription['stagingpolygonzkevm_relayerFeesIncrease'], Subscriptionstagingpolygonzkevm_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_relayerFeesIncreases: InContextSdkMethod<Subscription['stagingpolygonzkevm_relayerFeesIncreases'], Subscriptionstagingpolygonzkevm_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_slippageUpdate: InContextSdkMethod<Subscription['stagingpolygonzkevm_slippageUpdate'], Subscriptionstagingpolygonzkevm_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_slippageUpdates: InContextSdkMethod<Subscription['stagingpolygonzkevm_slippageUpdates'], Subscriptionstagingpolygonzkevm_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_snapshotRoot: InContextSdkMethod<Subscription['stagingpolygonzkevm_snapshotRoot'], Subscriptionstagingpolygonzkevm_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_snapshotRoots: InContextSdkMethod<Subscription['stagingpolygonzkevm_snapshotRoots'], Subscriptionstagingpolygonzkevm_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_spokeConnectorMode: InContextSdkMethod<Subscription['stagingpolygonzkevm_spokeConnectorMode'], Subscriptionstagingpolygonzkevm_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_spokeConnectorModes: InContextSdkMethod<Subscription['stagingpolygonzkevm_spokeConnectorModes'], Subscriptionstagingpolygonzkevm_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_aggregateRootProposed: InContextSdkMethod<Subscription['stagingpolygonzkevm_aggregateRootProposed'], Subscriptionstagingpolygonzkevm_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_aggregateRootProposeds: InContextSdkMethod<Subscription['stagingpolygonzkevm_aggregateRootProposeds'], Subscriptionstagingpolygonzkevm_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_optimisticRootFinalized: InContextSdkMethod<Subscription['stagingpolygonzkevm_optimisticRootFinalized'], Subscriptionstagingpolygonzkevm_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingpolygonzkevm_optimisticRootFinalizeds: InContextSdkMethod<Subscription['stagingpolygonzkevm_optimisticRootFinalizeds'], Subscriptionstagingpolygonzkevm_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingpolygonzkevm__meta: InContextSdkMethod<Subscription['stagingpolygonzkevm__meta'], Subscriptionstagingpolygonzkevm__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Staging_PolygonZkEVM"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
