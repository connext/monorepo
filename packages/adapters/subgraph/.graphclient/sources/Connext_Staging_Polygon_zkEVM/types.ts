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
  stagingpolygon_zkevm_BigDecimal: any;
  BigInt: any;
  stagingpolygon_zkevm_Bytes: any;
  stagingpolygon_zkevm_Int8: any;
};

export type stagingpolygon_zkevm_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['stagingpolygon_zkevm_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type stagingpolygon_zkevm_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingpolygon_zkevm_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingpolygon_zkevm_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
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
  _change_block?: InputMaybe<stagingpolygon_zkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_AggregateRootProposed_filter>>>;
};

export type stagingpolygon_zkevm_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type stagingpolygon_zkevm_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_zkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_AggregateRoot_filter>>>;
};

export type stagingpolygon_zkevm_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type stagingpolygon_zkevm_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  localAsset?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingpolygon_zkevm_AssetStatus>;
};

export type stagingpolygon_zkevm_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: stagingpolygon_zkevm_Router;
  asset: stagingpolygon_zkevm_Asset;
  feesEarned: Scalars['BigInt'];
};

export type stagingpolygon_zkevm_AssetBalance_filter = {
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
  router_?: InputMaybe<stagingpolygon_zkevm_Router_filter>;
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
  asset_?: InputMaybe<stagingpolygon_zkevm_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_zkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_AssetBalance_filter>>>;
};

export type stagingpolygon_zkevm_AssetBalance_orderBy =
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

export type stagingpolygon_zkevm_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type stagingpolygon_zkevm_AssetStatus_filter = {
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
  _change_block?: InputMaybe<stagingpolygon_zkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_AssetStatus_filter>>>;
};

export type stagingpolygon_zkevm_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type stagingpolygon_zkevm_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  key_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  key_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  key_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  key_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  key_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  key_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  localAsset?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
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
  status_?: InputMaybe<stagingpolygon_zkevm_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_zkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_Asset_filter>>>;
};

export type stagingpolygon_zkevm_Asset_orderBy =
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

export type stagingpolygon_zkevm_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingpolygon_zkevm_Block_height = {
  hash?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type stagingpolygon_zkevm_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  rootManager?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  mirrorConnector?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
};

export type stagingpolygon_zkevm_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_zkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_ConnectorMeta_filter>>>;
};

export type stagingpolygon_zkevm_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingpolygon_zkevm_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingpolygon_zkevm_TransferStatus>;
  routers?: Maybe<Array<stagingpolygon_zkevm_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  delegate?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  asset?: Maybe<stagingpolygon_zkevm_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingpolygon_zkevm_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_Router_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_Router_filter>;
};

export type stagingpolygon_zkevm_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingpolygon_zkevm_TransferStatus>;
  status_not?: InputMaybe<stagingpolygon_zkevm_TransferStatus>;
  status_in?: InputMaybe<Array<stagingpolygon_zkevm_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingpolygon_zkevm_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<stagingpolygon_zkevm_Router_filter>;
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
  to?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
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
  originSender?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
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
  asset_?: InputMaybe<stagingpolygon_zkevm_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_zkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_DestinationTransfer_filter>>>;
};

export type stagingpolygon_zkevm_DestinationTransfer_orderBy =
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

export type stagingpolygon_zkevm_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingpolygon_zkevm_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingpolygon_zkevm_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
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
  _change_block?: InputMaybe<stagingpolygon_zkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_OptimisticRootFinalized_filter>>>;
};

export type stagingpolygon_zkevm_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type stagingpolygon_zkevm_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingpolygon_zkevm_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<stagingpolygon_zkevm_RootCount>;
};

export type stagingpolygon_zkevm_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  leaf_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  message_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  message_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  message_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  message_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  message_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  message_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
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
  rootCount_?: InputMaybe<stagingpolygon_zkevm_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_zkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_OriginMessage_filter>>>;
};

export type stagingpolygon_zkevm_OriginMessage_orderBy =
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

export type stagingpolygon_zkevm_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingpolygon_zkevm_TransferStatus>;
  messageHash?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  delegate?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  asset?: Maybe<stagingpolygon_zkevm_Asset>;
  transactingAsset?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  message?: Maybe<stagingpolygon_zkevm_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<stagingpolygon_zkevm_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingpolygon_zkevm_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_RelayerFee_filter>;
};

export type stagingpolygon_zkevm_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingpolygon_zkevm_TransferStatus>;
  status_not?: InputMaybe<stagingpolygon_zkevm_TransferStatus>;
  status_in?: InputMaybe<Array<stagingpolygon_zkevm_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingpolygon_zkevm_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
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
  to?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
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
  asset_?: InputMaybe<stagingpolygon_zkevm_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
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
  message_?: InputMaybe<stagingpolygon_zkevm_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<stagingpolygon_zkevm_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_zkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_OriginTransfer_filter>>>;
};

export type stagingpolygon_zkevm_OriginTransfer_orderBy =
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
  stagingpolygon_zkevm_asset?: Maybe<stagingpolygon_zkevm_Asset>;
  stagingpolygon_zkevm_assets: Array<stagingpolygon_zkevm_Asset>;
  stagingpolygon_zkevm_assetStatus?: Maybe<stagingpolygon_zkevm_AssetStatus>;
  stagingpolygon_zkevm_assetStatuses: Array<stagingpolygon_zkevm_AssetStatus>;
  stagingpolygon_zkevm_assetBalance?: Maybe<stagingpolygon_zkevm_AssetBalance>;
  stagingpolygon_zkevm_assetBalances: Array<stagingpolygon_zkevm_AssetBalance>;
  stagingpolygon_zkevm_router?: Maybe<stagingpolygon_zkevm_Router>;
  stagingpolygon_zkevm_routers: Array<stagingpolygon_zkevm_Router>;
  stagingpolygon_zkevm_routerDailyTVL?: Maybe<stagingpolygon_zkevm_RouterDailyTVL>;
  stagingpolygon_zkevm_routerDailyTVLs: Array<stagingpolygon_zkevm_RouterDailyTVL>;
  stagingpolygon_zkevm_routerLiquidityEvent?: Maybe<stagingpolygon_zkevm_RouterLiquidityEvent>;
  stagingpolygon_zkevm_routerLiquidityEvents: Array<stagingpolygon_zkevm_RouterLiquidityEvent>;
  stagingpolygon_zkevm_setting?: Maybe<stagingpolygon_zkevm_Setting>;
  stagingpolygon_zkevm_settings: Array<stagingpolygon_zkevm_Setting>;
  stagingpolygon_zkevm_relayer?: Maybe<stagingpolygon_zkevm_Relayer>;
  stagingpolygon_zkevm_relayers: Array<stagingpolygon_zkevm_Relayer>;
  stagingpolygon_zkevm_sequencer?: Maybe<stagingpolygon_zkevm_Sequencer>;
  stagingpolygon_zkevm_sequencers: Array<stagingpolygon_zkevm_Sequencer>;
  stagingpolygon_zkevm_relayerFee?: Maybe<stagingpolygon_zkevm_RelayerFee>;
  stagingpolygon_zkevm_relayerFees: Array<stagingpolygon_zkevm_RelayerFee>;
  stagingpolygon_zkevm_originTransfer?: Maybe<stagingpolygon_zkevm_OriginTransfer>;
  stagingpolygon_zkevm_originTransfers: Array<stagingpolygon_zkevm_OriginTransfer>;
  stagingpolygon_zkevm_destinationTransfer?: Maybe<stagingpolygon_zkevm_DestinationTransfer>;
  stagingpolygon_zkevm_destinationTransfers: Array<stagingpolygon_zkevm_DestinationTransfer>;
  stagingpolygon_zkevm_originMessage?: Maybe<stagingpolygon_zkevm_OriginMessage>;
  stagingpolygon_zkevm_originMessages: Array<stagingpolygon_zkevm_OriginMessage>;
  stagingpolygon_zkevm_aggregateRoot?: Maybe<stagingpolygon_zkevm_AggregateRoot>;
  stagingpolygon_zkevm_aggregateRoots: Array<stagingpolygon_zkevm_AggregateRoot>;
  stagingpolygon_zkevm_connectorMeta?: Maybe<stagingpolygon_zkevm_ConnectorMeta>;
  stagingpolygon_zkevm_connectorMetas: Array<stagingpolygon_zkevm_ConnectorMeta>;
  stagingpolygon_zkevm_rootCount?: Maybe<stagingpolygon_zkevm_RootCount>;
  stagingpolygon_zkevm_rootCounts: Array<stagingpolygon_zkevm_RootCount>;
  stagingpolygon_zkevm_rootMessageSent?: Maybe<stagingpolygon_zkevm_RootMessageSent>;
  stagingpolygon_zkevm_rootMessageSents: Array<stagingpolygon_zkevm_RootMessageSent>;
  stagingpolygon_zkevm_relayerFeesIncrease?: Maybe<stagingpolygon_zkevm_RelayerFeesIncrease>;
  stagingpolygon_zkevm_relayerFeesIncreases: Array<stagingpolygon_zkevm_RelayerFeesIncrease>;
  stagingpolygon_zkevm_slippageUpdate?: Maybe<stagingpolygon_zkevm_SlippageUpdate>;
  stagingpolygon_zkevm_slippageUpdates: Array<stagingpolygon_zkevm_SlippageUpdate>;
  stagingpolygon_zkevm_snapshotRoot?: Maybe<stagingpolygon_zkevm_SnapshotRoot>;
  stagingpolygon_zkevm_snapshotRoots: Array<stagingpolygon_zkevm_SnapshotRoot>;
  stagingpolygon_zkevm_spokeConnectorMode?: Maybe<stagingpolygon_zkevm_SpokeConnectorMode>;
  stagingpolygon_zkevm_spokeConnectorModes: Array<stagingpolygon_zkevm_SpokeConnectorMode>;
  stagingpolygon_zkevm_aggregateRootProposed?: Maybe<stagingpolygon_zkevm_AggregateRootProposed>;
  stagingpolygon_zkevm_aggregateRootProposeds: Array<stagingpolygon_zkevm_AggregateRootProposed>;
  stagingpolygon_zkevm_optimisticRootFinalized?: Maybe<stagingpolygon_zkevm_OptimisticRootFinalized>;
  stagingpolygon_zkevm_optimisticRootFinalizeds: Array<stagingpolygon_zkevm_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingpolygon_zkevm__meta?: Maybe<stagingpolygon_zkevm__Meta_>;
};


export type Querystagingpolygon_zkevm_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_Asset_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_AssetStatus_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_AssetBalance_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_Router_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_Router_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_Setting_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_Relayer_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_Sequencer_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_RelayerFee_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_OriginTransfer_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_DestinationTransfer_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_OriginMessage_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_AggregateRoot_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_ConnectorMeta_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_RootCount_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_RootMessageSent_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_SlippageUpdate_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_SnapshotRoot_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingpolygon_zkevm__metaArgs = {
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
};

export type stagingpolygon_zkevm_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
};

export type stagingpolygon_zkevm_RelayerFee = {
  id: Scalars['ID'];
  transfer: stagingpolygon_zkevm_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['stagingpolygon_zkevm_Bytes'];
};

export type stagingpolygon_zkevm_RelayerFee_filter = {
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
  transfer_?: InputMaybe<stagingpolygon_zkevm_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_zkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_RelayerFee_filter>>>;
};

export type stagingpolygon_zkevm_RelayerFee_orderBy =
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

export type stagingpolygon_zkevm_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: stagingpolygon_zkevm_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller: Scalars['stagingpolygon_zkevm_Bytes'];
  transactionHash: Scalars['stagingpolygon_zkevm_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingpolygon_zkevm_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<stagingpolygon_zkevm_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
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
  _change_block?: InputMaybe<stagingpolygon_zkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_RelayerFeesIncrease_filter>>>;
};

export type stagingpolygon_zkevm_RelayerFeesIncrease_orderBy =
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

export type stagingpolygon_zkevm_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  relayer_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_zkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_Relayer_filter>>>;
};

export type stagingpolygon_zkevm_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type stagingpolygon_zkevm_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type stagingpolygon_zkevm_RootCount_filter = {
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
  _change_block?: InputMaybe<stagingpolygon_zkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_RootCount_filter>>>;
};

export type stagingpolygon_zkevm_RootCount_orderBy =
  | 'id'
  | 'count';

export type stagingpolygon_zkevm_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingpolygon_zkevm_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
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
  _change_block?: InputMaybe<stagingpolygon_zkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_RootMessageSent_filter>>>;
};

export type stagingpolygon_zkevm_RootMessageSent_orderBy =
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

export type stagingpolygon_zkevm_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  recipient?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  proposedOwner?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<stagingpolygon_zkevm_AssetBalance>;
};


export type stagingpolygon_zkevm_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_AssetBalance_filter>;
};

export type stagingpolygon_zkevm_RouterDailyTVL = {
  id: Scalars['ID'];
  router: stagingpolygon_zkevm_Router;
  asset: stagingpolygon_zkevm_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type stagingpolygon_zkevm_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<stagingpolygon_zkevm_Router_filter>;
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
  asset_?: InputMaybe<stagingpolygon_zkevm_Asset_filter>;
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
  _change_block?: InputMaybe<stagingpolygon_zkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_RouterDailyTVL_filter>>>;
};

export type stagingpolygon_zkevm_RouterDailyTVL_orderBy =
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

export type stagingpolygon_zkevm_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<stagingpolygon_zkevm_RouterLiquidityEventType>;
  router: stagingpolygon_zkevm_Router;
  asset: stagingpolygon_zkevm_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['stagingpolygon_zkevm_Bytes'];
  nonce: Scalars['BigInt'];
};

export type stagingpolygon_zkevm_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type stagingpolygon_zkevm_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<stagingpolygon_zkevm_RouterLiquidityEventType>;
  type_not?: InputMaybe<stagingpolygon_zkevm_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<stagingpolygon_zkevm_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<stagingpolygon_zkevm_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<stagingpolygon_zkevm_Router_filter>;
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
  asset_?: InputMaybe<stagingpolygon_zkevm_Asset_filter>;
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
  caller?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_zkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_RouterLiquidityEvent_filter>>>;
};

export type stagingpolygon_zkevm_RouterLiquidityEvent_orderBy =
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

export type stagingpolygon_zkevm_Router_filter = {
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
  owner?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  owner_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  owner_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  owner_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  owner_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  owner_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  recipient?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  recipient_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<stagingpolygon_zkevm_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_zkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_Router_filter>>>;
};

export type stagingpolygon_zkevm_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type stagingpolygon_zkevm_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
};

export type stagingpolygon_zkevm_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_zkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_Sequencer_filter>>>;
};

export type stagingpolygon_zkevm_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type stagingpolygon_zkevm_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['stagingpolygon_zkevm_Bytes'];
};

export type stagingpolygon_zkevm_Setting_filter = {
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
  caller?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingpolygon_zkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_Setting_filter>>>;
};

export type stagingpolygon_zkevm_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type stagingpolygon_zkevm_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: stagingpolygon_zkevm_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['stagingpolygon_zkevm_Bytes'];
  transactionHash: Scalars['stagingpolygon_zkevm_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingpolygon_zkevm_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<stagingpolygon_zkevm_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
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
  _change_block?: InputMaybe<stagingpolygon_zkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_SlippageUpdate_filter>>>;
};

export type stagingpolygon_zkevm_SlippageUpdate_orderBy =
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

export type stagingpolygon_zkevm_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['stagingpolygon_zkevm_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingpolygon_zkevm_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingpolygon_zkevm_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingpolygon_zkevm_Bytes']>;
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
  _change_block?: InputMaybe<stagingpolygon_zkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_SnapshotRoot_filter>>>;
};

export type stagingpolygon_zkevm_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type stagingpolygon_zkevm_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type stagingpolygon_zkevm_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<stagingpolygon_zkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingpolygon_zkevm_SpokeConnectorMode_filter>>>;
};

export type stagingpolygon_zkevm_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  stagingpolygon_zkevm_asset?: Maybe<stagingpolygon_zkevm_Asset>;
  stagingpolygon_zkevm_assets: Array<stagingpolygon_zkevm_Asset>;
  stagingpolygon_zkevm_assetStatus?: Maybe<stagingpolygon_zkevm_AssetStatus>;
  stagingpolygon_zkevm_assetStatuses: Array<stagingpolygon_zkevm_AssetStatus>;
  stagingpolygon_zkevm_assetBalance?: Maybe<stagingpolygon_zkevm_AssetBalance>;
  stagingpolygon_zkevm_assetBalances: Array<stagingpolygon_zkevm_AssetBalance>;
  stagingpolygon_zkevm_router?: Maybe<stagingpolygon_zkevm_Router>;
  stagingpolygon_zkevm_routers: Array<stagingpolygon_zkevm_Router>;
  stagingpolygon_zkevm_routerDailyTVL?: Maybe<stagingpolygon_zkevm_RouterDailyTVL>;
  stagingpolygon_zkevm_routerDailyTVLs: Array<stagingpolygon_zkevm_RouterDailyTVL>;
  stagingpolygon_zkevm_routerLiquidityEvent?: Maybe<stagingpolygon_zkevm_RouterLiquidityEvent>;
  stagingpolygon_zkevm_routerLiquidityEvents: Array<stagingpolygon_zkevm_RouterLiquidityEvent>;
  stagingpolygon_zkevm_setting?: Maybe<stagingpolygon_zkevm_Setting>;
  stagingpolygon_zkevm_settings: Array<stagingpolygon_zkevm_Setting>;
  stagingpolygon_zkevm_relayer?: Maybe<stagingpolygon_zkevm_Relayer>;
  stagingpolygon_zkevm_relayers: Array<stagingpolygon_zkevm_Relayer>;
  stagingpolygon_zkevm_sequencer?: Maybe<stagingpolygon_zkevm_Sequencer>;
  stagingpolygon_zkevm_sequencers: Array<stagingpolygon_zkevm_Sequencer>;
  stagingpolygon_zkevm_relayerFee?: Maybe<stagingpolygon_zkevm_RelayerFee>;
  stagingpolygon_zkevm_relayerFees: Array<stagingpolygon_zkevm_RelayerFee>;
  stagingpolygon_zkevm_originTransfer?: Maybe<stagingpolygon_zkevm_OriginTransfer>;
  stagingpolygon_zkevm_originTransfers: Array<stagingpolygon_zkevm_OriginTransfer>;
  stagingpolygon_zkevm_destinationTransfer?: Maybe<stagingpolygon_zkevm_DestinationTransfer>;
  stagingpolygon_zkevm_destinationTransfers: Array<stagingpolygon_zkevm_DestinationTransfer>;
  stagingpolygon_zkevm_originMessage?: Maybe<stagingpolygon_zkevm_OriginMessage>;
  stagingpolygon_zkevm_originMessages: Array<stagingpolygon_zkevm_OriginMessage>;
  stagingpolygon_zkevm_aggregateRoot?: Maybe<stagingpolygon_zkevm_AggregateRoot>;
  stagingpolygon_zkevm_aggregateRoots: Array<stagingpolygon_zkevm_AggregateRoot>;
  stagingpolygon_zkevm_connectorMeta?: Maybe<stagingpolygon_zkevm_ConnectorMeta>;
  stagingpolygon_zkevm_connectorMetas: Array<stagingpolygon_zkevm_ConnectorMeta>;
  stagingpolygon_zkevm_rootCount?: Maybe<stagingpolygon_zkevm_RootCount>;
  stagingpolygon_zkevm_rootCounts: Array<stagingpolygon_zkevm_RootCount>;
  stagingpolygon_zkevm_rootMessageSent?: Maybe<stagingpolygon_zkevm_RootMessageSent>;
  stagingpolygon_zkevm_rootMessageSents: Array<stagingpolygon_zkevm_RootMessageSent>;
  stagingpolygon_zkevm_relayerFeesIncrease?: Maybe<stagingpolygon_zkevm_RelayerFeesIncrease>;
  stagingpolygon_zkevm_relayerFeesIncreases: Array<stagingpolygon_zkevm_RelayerFeesIncrease>;
  stagingpolygon_zkevm_slippageUpdate?: Maybe<stagingpolygon_zkevm_SlippageUpdate>;
  stagingpolygon_zkevm_slippageUpdates: Array<stagingpolygon_zkevm_SlippageUpdate>;
  stagingpolygon_zkevm_snapshotRoot?: Maybe<stagingpolygon_zkevm_SnapshotRoot>;
  stagingpolygon_zkevm_snapshotRoots: Array<stagingpolygon_zkevm_SnapshotRoot>;
  stagingpolygon_zkevm_spokeConnectorMode?: Maybe<stagingpolygon_zkevm_SpokeConnectorMode>;
  stagingpolygon_zkevm_spokeConnectorModes: Array<stagingpolygon_zkevm_SpokeConnectorMode>;
  stagingpolygon_zkevm_aggregateRootProposed?: Maybe<stagingpolygon_zkevm_AggregateRootProposed>;
  stagingpolygon_zkevm_aggregateRootProposeds: Array<stagingpolygon_zkevm_AggregateRootProposed>;
  stagingpolygon_zkevm_optimisticRootFinalized?: Maybe<stagingpolygon_zkevm_OptimisticRootFinalized>;
  stagingpolygon_zkevm_optimisticRootFinalizeds: Array<stagingpolygon_zkevm_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingpolygon_zkevm__meta?: Maybe<stagingpolygon_zkevm__Meta_>;
};


export type Subscriptionstagingpolygon_zkevm_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_Asset_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_AssetStatus_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_AssetBalance_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_Router_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_Router_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_Setting_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_Relayer_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_Sequencer_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_RelayerFee_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_OriginTransfer_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_DestinationTransfer_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_OriginMessage_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_AggregateRoot_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_ConnectorMeta_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_RootCount_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_RootMessageSent_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_SlippageUpdate_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_SnapshotRoot_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingpolygon_zkevm_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingpolygon_zkevm_OrderDirection>;
  where?: InputMaybe<stagingpolygon_zkevm_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingpolygon_zkevm__metaArgs = {
  block?: InputMaybe<stagingpolygon_zkevm_Block_height>;
};

export type stagingpolygon_zkevm_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type stagingpolygon_zkevm__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingpolygon_zkevm_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type stagingpolygon_zkevm__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingpolygon_zkevm__Block_;
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
  stagingpolygon_zkevm_asset: InContextSdkMethod<Query['stagingpolygon_zkevm_asset'], Querystagingpolygon_zkevm_assetArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_assets: InContextSdkMethod<Query['stagingpolygon_zkevm_assets'], Querystagingpolygon_zkevm_assetsArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_assetStatus: InContextSdkMethod<Query['stagingpolygon_zkevm_assetStatus'], Querystagingpolygon_zkevm_assetStatusArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_assetStatuses: InContextSdkMethod<Query['stagingpolygon_zkevm_assetStatuses'], Querystagingpolygon_zkevm_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_assetBalance: InContextSdkMethod<Query['stagingpolygon_zkevm_assetBalance'], Querystagingpolygon_zkevm_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_assetBalances: InContextSdkMethod<Query['stagingpolygon_zkevm_assetBalances'], Querystagingpolygon_zkevm_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_router: InContextSdkMethod<Query['stagingpolygon_zkevm_router'], Querystagingpolygon_zkevm_routerArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_routers: InContextSdkMethod<Query['stagingpolygon_zkevm_routers'], Querystagingpolygon_zkevm_routersArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_routerDailyTVL: InContextSdkMethod<Query['stagingpolygon_zkevm_routerDailyTVL'], Querystagingpolygon_zkevm_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_routerDailyTVLs: InContextSdkMethod<Query['stagingpolygon_zkevm_routerDailyTVLs'], Querystagingpolygon_zkevm_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_routerLiquidityEvent: InContextSdkMethod<Query['stagingpolygon_zkevm_routerLiquidityEvent'], Querystagingpolygon_zkevm_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_routerLiquidityEvents: InContextSdkMethod<Query['stagingpolygon_zkevm_routerLiquidityEvents'], Querystagingpolygon_zkevm_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_setting: InContextSdkMethod<Query['stagingpolygon_zkevm_setting'], Querystagingpolygon_zkevm_settingArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_settings: InContextSdkMethod<Query['stagingpolygon_zkevm_settings'], Querystagingpolygon_zkevm_settingsArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_relayer: InContextSdkMethod<Query['stagingpolygon_zkevm_relayer'], Querystagingpolygon_zkevm_relayerArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_relayers: InContextSdkMethod<Query['stagingpolygon_zkevm_relayers'], Querystagingpolygon_zkevm_relayersArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_sequencer: InContextSdkMethod<Query['stagingpolygon_zkevm_sequencer'], Querystagingpolygon_zkevm_sequencerArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_sequencers: InContextSdkMethod<Query['stagingpolygon_zkevm_sequencers'], Querystagingpolygon_zkevm_sequencersArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_relayerFee: InContextSdkMethod<Query['stagingpolygon_zkevm_relayerFee'], Querystagingpolygon_zkevm_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_relayerFees: InContextSdkMethod<Query['stagingpolygon_zkevm_relayerFees'], Querystagingpolygon_zkevm_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_originTransfer: InContextSdkMethod<Query['stagingpolygon_zkevm_originTransfer'], Querystagingpolygon_zkevm_originTransferArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_originTransfers: InContextSdkMethod<Query['stagingpolygon_zkevm_originTransfers'], Querystagingpolygon_zkevm_originTransfersArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_destinationTransfer: InContextSdkMethod<Query['stagingpolygon_zkevm_destinationTransfer'], Querystagingpolygon_zkevm_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_destinationTransfers: InContextSdkMethod<Query['stagingpolygon_zkevm_destinationTransfers'], Querystagingpolygon_zkevm_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_originMessage: InContextSdkMethod<Query['stagingpolygon_zkevm_originMessage'], Querystagingpolygon_zkevm_originMessageArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_originMessages: InContextSdkMethod<Query['stagingpolygon_zkevm_originMessages'], Querystagingpolygon_zkevm_originMessagesArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_aggregateRoot: InContextSdkMethod<Query['stagingpolygon_zkevm_aggregateRoot'], Querystagingpolygon_zkevm_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_aggregateRoots: InContextSdkMethod<Query['stagingpolygon_zkevm_aggregateRoots'], Querystagingpolygon_zkevm_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_connectorMeta: InContextSdkMethod<Query['stagingpolygon_zkevm_connectorMeta'], Querystagingpolygon_zkevm_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_connectorMetas: InContextSdkMethod<Query['stagingpolygon_zkevm_connectorMetas'], Querystagingpolygon_zkevm_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_rootCount: InContextSdkMethod<Query['stagingpolygon_zkevm_rootCount'], Querystagingpolygon_zkevm_rootCountArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_rootCounts: InContextSdkMethod<Query['stagingpolygon_zkevm_rootCounts'], Querystagingpolygon_zkevm_rootCountsArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_rootMessageSent: InContextSdkMethod<Query['stagingpolygon_zkevm_rootMessageSent'], Querystagingpolygon_zkevm_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_rootMessageSents: InContextSdkMethod<Query['stagingpolygon_zkevm_rootMessageSents'], Querystagingpolygon_zkevm_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_relayerFeesIncrease: InContextSdkMethod<Query['stagingpolygon_zkevm_relayerFeesIncrease'], Querystagingpolygon_zkevm_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_relayerFeesIncreases: InContextSdkMethod<Query['stagingpolygon_zkevm_relayerFeesIncreases'], Querystagingpolygon_zkevm_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_slippageUpdate: InContextSdkMethod<Query['stagingpolygon_zkevm_slippageUpdate'], Querystagingpolygon_zkevm_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_slippageUpdates: InContextSdkMethod<Query['stagingpolygon_zkevm_slippageUpdates'], Querystagingpolygon_zkevm_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_snapshotRoot: InContextSdkMethod<Query['stagingpolygon_zkevm_snapshotRoot'], Querystagingpolygon_zkevm_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_snapshotRoots: InContextSdkMethod<Query['stagingpolygon_zkevm_snapshotRoots'], Querystagingpolygon_zkevm_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_spokeConnectorMode: InContextSdkMethod<Query['stagingpolygon_zkevm_spokeConnectorMode'], Querystagingpolygon_zkevm_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_spokeConnectorModes: InContextSdkMethod<Query['stagingpolygon_zkevm_spokeConnectorModes'], Querystagingpolygon_zkevm_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_aggregateRootProposed: InContextSdkMethod<Query['stagingpolygon_zkevm_aggregateRootProposed'], Querystagingpolygon_zkevm_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_aggregateRootProposeds: InContextSdkMethod<Query['stagingpolygon_zkevm_aggregateRootProposeds'], Querystagingpolygon_zkevm_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_optimisticRootFinalized: InContextSdkMethod<Query['stagingpolygon_zkevm_optimisticRootFinalized'], Querystagingpolygon_zkevm_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_optimisticRootFinalizeds: InContextSdkMethod<Query['stagingpolygon_zkevm_optimisticRootFinalizeds'], Querystagingpolygon_zkevm_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingpolygon_zkevm__meta: InContextSdkMethod<Query['stagingpolygon_zkevm__meta'], Querystagingpolygon_zkevm__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  stagingpolygon_zkevm_asset: InContextSdkMethod<Subscription['stagingpolygon_zkevm_asset'], Subscriptionstagingpolygon_zkevm_assetArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_assets: InContextSdkMethod<Subscription['stagingpolygon_zkevm_assets'], Subscriptionstagingpolygon_zkevm_assetsArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_assetStatus: InContextSdkMethod<Subscription['stagingpolygon_zkevm_assetStatus'], Subscriptionstagingpolygon_zkevm_assetStatusArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_assetStatuses: InContextSdkMethod<Subscription['stagingpolygon_zkevm_assetStatuses'], Subscriptionstagingpolygon_zkevm_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_assetBalance: InContextSdkMethod<Subscription['stagingpolygon_zkevm_assetBalance'], Subscriptionstagingpolygon_zkevm_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_assetBalances: InContextSdkMethod<Subscription['stagingpolygon_zkevm_assetBalances'], Subscriptionstagingpolygon_zkevm_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_router: InContextSdkMethod<Subscription['stagingpolygon_zkevm_router'], Subscriptionstagingpolygon_zkevm_routerArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_routers: InContextSdkMethod<Subscription['stagingpolygon_zkevm_routers'], Subscriptionstagingpolygon_zkevm_routersArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_routerDailyTVL: InContextSdkMethod<Subscription['stagingpolygon_zkevm_routerDailyTVL'], Subscriptionstagingpolygon_zkevm_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_routerDailyTVLs: InContextSdkMethod<Subscription['stagingpolygon_zkevm_routerDailyTVLs'], Subscriptionstagingpolygon_zkevm_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_routerLiquidityEvent: InContextSdkMethod<Subscription['stagingpolygon_zkevm_routerLiquidityEvent'], Subscriptionstagingpolygon_zkevm_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_routerLiquidityEvents: InContextSdkMethod<Subscription['stagingpolygon_zkevm_routerLiquidityEvents'], Subscriptionstagingpolygon_zkevm_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_setting: InContextSdkMethod<Subscription['stagingpolygon_zkevm_setting'], Subscriptionstagingpolygon_zkevm_settingArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_settings: InContextSdkMethod<Subscription['stagingpolygon_zkevm_settings'], Subscriptionstagingpolygon_zkevm_settingsArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_relayer: InContextSdkMethod<Subscription['stagingpolygon_zkevm_relayer'], Subscriptionstagingpolygon_zkevm_relayerArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_relayers: InContextSdkMethod<Subscription['stagingpolygon_zkevm_relayers'], Subscriptionstagingpolygon_zkevm_relayersArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_sequencer: InContextSdkMethod<Subscription['stagingpolygon_zkevm_sequencer'], Subscriptionstagingpolygon_zkevm_sequencerArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_sequencers: InContextSdkMethod<Subscription['stagingpolygon_zkevm_sequencers'], Subscriptionstagingpolygon_zkevm_sequencersArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_relayerFee: InContextSdkMethod<Subscription['stagingpolygon_zkevm_relayerFee'], Subscriptionstagingpolygon_zkevm_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_relayerFees: InContextSdkMethod<Subscription['stagingpolygon_zkevm_relayerFees'], Subscriptionstagingpolygon_zkevm_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_originTransfer: InContextSdkMethod<Subscription['stagingpolygon_zkevm_originTransfer'], Subscriptionstagingpolygon_zkevm_originTransferArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_originTransfers: InContextSdkMethod<Subscription['stagingpolygon_zkevm_originTransfers'], Subscriptionstagingpolygon_zkevm_originTransfersArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_destinationTransfer: InContextSdkMethod<Subscription['stagingpolygon_zkevm_destinationTransfer'], Subscriptionstagingpolygon_zkevm_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_destinationTransfers: InContextSdkMethod<Subscription['stagingpolygon_zkevm_destinationTransfers'], Subscriptionstagingpolygon_zkevm_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_originMessage: InContextSdkMethod<Subscription['stagingpolygon_zkevm_originMessage'], Subscriptionstagingpolygon_zkevm_originMessageArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_originMessages: InContextSdkMethod<Subscription['stagingpolygon_zkevm_originMessages'], Subscriptionstagingpolygon_zkevm_originMessagesArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_aggregateRoot: InContextSdkMethod<Subscription['stagingpolygon_zkevm_aggregateRoot'], Subscriptionstagingpolygon_zkevm_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_aggregateRoots: InContextSdkMethod<Subscription['stagingpolygon_zkevm_aggregateRoots'], Subscriptionstagingpolygon_zkevm_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_connectorMeta: InContextSdkMethod<Subscription['stagingpolygon_zkevm_connectorMeta'], Subscriptionstagingpolygon_zkevm_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_connectorMetas: InContextSdkMethod<Subscription['stagingpolygon_zkevm_connectorMetas'], Subscriptionstagingpolygon_zkevm_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_rootCount: InContextSdkMethod<Subscription['stagingpolygon_zkevm_rootCount'], Subscriptionstagingpolygon_zkevm_rootCountArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_rootCounts: InContextSdkMethod<Subscription['stagingpolygon_zkevm_rootCounts'], Subscriptionstagingpolygon_zkevm_rootCountsArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_rootMessageSent: InContextSdkMethod<Subscription['stagingpolygon_zkevm_rootMessageSent'], Subscriptionstagingpolygon_zkevm_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_rootMessageSents: InContextSdkMethod<Subscription['stagingpolygon_zkevm_rootMessageSents'], Subscriptionstagingpolygon_zkevm_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_relayerFeesIncrease: InContextSdkMethod<Subscription['stagingpolygon_zkevm_relayerFeesIncrease'], Subscriptionstagingpolygon_zkevm_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_relayerFeesIncreases: InContextSdkMethod<Subscription['stagingpolygon_zkevm_relayerFeesIncreases'], Subscriptionstagingpolygon_zkevm_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_slippageUpdate: InContextSdkMethod<Subscription['stagingpolygon_zkevm_slippageUpdate'], Subscriptionstagingpolygon_zkevm_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_slippageUpdates: InContextSdkMethod<Subscription['stagingpolygon_zkevm_slippageUpdates'], Subscriptionstagingpolygon_zkevm_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_snapshotRoot: InContextSdkMethod<Subscription['stagingpolygon_zkevm_snapshotRoot'], Subscriptionstagingpolygon_zkevm_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_snapshotRoots: InContextSdkMethod<Subscription['stagingpolygon_zkevm_snapshotRoots'], Subscriptionstagingpolygon_zkevm_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_spokeConnectorMode: InContextSdkMethod<Subscription['stagingpolygon_zkevm_spokeConnectorMode'], Subscriptionstagingpolygon_zkevm_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_spokeConnectorModes: InContextSdkMethod<Subscription['stagingpolygon_zkevm_spokeConnectorModes'], Subscriptionstagingpolygon_zkevm_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_aggregateRootProposed: InContextSdkMethod<Subscription['stagingpolygon_zkevm_aggregateRootProposed'], Subscriptionstagingpolygon_zkevm_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_aggregateRootProposeds: InContextSdkMethod<Subscription['stagingpolygon_zkevm_aggregateRootProposeds'], Subscriptionstagingpolygon_zkevm_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_optimisticRootFinalized: InContextSdkMethod<Subscription['stagingpolygon_zkevm_optimisticRootFinalized'], Subscriptionstagingpolygon_zkevm_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingpolygon_zkevm_optimisticRootFinalizeds: InContextSdkMethod<Subscription['stagingpolygon_zkevm_optimisticRootFinalizeds'], Subscriptionstagingpolygon_zkevm_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingpolygon_zkevm__meta: InContextSdkMethod<Subscription['stagingpolygon_zkevm__meta'], Subscriptionstagingpolygon_zkevm__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Staging_Polygon_zkEVM"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
