// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextStagingMetisTypes {
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
  stagingmetis_BigDecimal: any;
  BigInt: any;
  stagingmetis_Bytes: any;
  stagingmetis_Int8: any;
};

export type stagingmetis_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['stagingmetis_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type stagingmetis_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingmetis_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingmetis_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
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
  _change_block?: InputMaybe<stagingmetis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmetis_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmetis_AggregateRootProposed_filter>>>;
};

export type stagingmetis_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type stagingmetis_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmetis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmetis_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmetis_AggregateRoot_filter>>>;
};

export type stagingmetis_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type stagingmetis_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['stagingmetis_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingmetis_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['stagingmetis_Bytes']>;
  localAsset?: Maybe<Scalars['stagingmetis_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingmetis_AssetStatus>;
};

export type stagingmetis_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: stagingmetis_Router;
  asset: stagingmetis_Asset;
  feesEarned: Scalars['BigInt'];
};

export type stagingmetis_AssetBalance_filter = {
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
  router_?: InputMaybe<stagingmetis_Router_filter>;
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
  asset_?: InputMaybe<stagingmetis_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmetis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmetis_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmetis_AssetBalance_filter>>>;
};

export type stagingmetis_AssetBalance_orderBy =
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

export type stagingmetis_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type stagingmetis_AssetStatus_filter = {
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
  _change_block?: InputMaybe<stagingmetis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmetis_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmetis_AssetStatus_filter>>>;
};

export type stagingmetis_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type stagingmetis_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  key_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  key_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  key_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  key_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  key_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  key_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  localAsset?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
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
  status_?: InputMaybe<stagingmetis_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmetis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmetis_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmetis_Asset_filter>>>;
};

export type stagingmetis_Asset_orderBy =
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

export type stagingmetis_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingmetis_Block_height = {
  hash?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type stagingmetis_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['stagingmetis_Bytes']>;
  rootManager?: Maybe<Scalars['stagingmetis_Bytes']>;
  mirrorConnector?: Maybe<Scalars['stagingmetis_Bytes']>;
};

export type stagingmetis_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmetis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmetis_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmetis_ConnectorMeta_filter>>>;
};

export type stagingmetis_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingmetis_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingmetis_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingmetis_TransferStatus>;
  routers?: Maybe<Array<stagingmetis_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingmetis_Bytes']>;
  delegate?: Maybe<Scalars['stagingmetis_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingmetis_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingmetis_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingmetis_Bytes']>;
  asset?: Maybe<stagingmetis_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['stagingmetis_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['stagingmetis_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['stagingmetis_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['stagingmetis_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['stagingmetis_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['stagingmetis_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingmetis_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_Router_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_Router_filter>;
};

export type stagingmetis_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingmetis_TransferStatus>;
  status_not?: InputMaybe<stagingmetis_TransferStatus>;
  status_in?: InputMaybe<Array<stagingmetis_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingmetis_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<stagingmetis_Router_filter>;
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
  to?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
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
  originSender?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
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
  asset_?: InputMaybe<stagingmetis_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmetis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmetis_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmetis_DestinationTransfer_filter>>>;
};

export type stagingmetis_DestinationTransfer_orderBy =
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

export type stagingmetis_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingmetis_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingmetis_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
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
  _change_block?: InputMaybe<stagingmetis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmetis_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmetis_OptimisticRootFinalized_filter>>>;
};

export type stagingmetis_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type stagingmetis_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingmetis_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['stagingmetis_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['stagingmetis_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['stagingmetis_Bytes']>;
  root?: Maybe<Scalars['stagingmetis_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingmetis_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<stagingmetis_RootCount>;
};

export type stagingmetis_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  leaf_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  message_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  message_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  message_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  message_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  message_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  message_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
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
  rootCount_?: InputMaybe<stagingmetis_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmetis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmetis_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmetis_OriginMessage_filter>>>;
};

export type stagingmetis_OriginMessage_orderBy =
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

export type stagingmetis_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingmetis_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingmetis_TransferStatus>;
  messageHash?: Maybe<Scalars['stagingmetis_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingmetis_Bytes']>;
  delegate?: Maybe<Scalars['stagingmetis_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingmetis_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingmetis_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingmetis_Bytes']>;
  asset?: Maybe<stagingmetis_Asset>;
  transactingAsset?: Maybe<Scalars['stagingmetis_Bytes']>;
  message?: Maybe<stagingmetis_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<stagingmetis_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['stagingmetis_Bytes']>;
  caller?: Maybe<Scalars['stagingmetis_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingmetis_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['stagingmetis_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingmetis_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_RelayerFee_filter>;
};

export type stagingmetis_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingmetis_TransferStatus>;
  status_not?: InputMaybe<stagingmetis_TransferStatus>;
  status_in?: InputMaybe<Array<stagingmetis_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingmetis_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
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
  to?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
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
  asset_?: InputMaybe<stagingmetis_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
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
  message_?: InputMaybe<stagingmetis_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<stagingmetis_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmetis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmetis_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmetis_OriginTransfer_filter>>>;
};

export type stagingmetis_OriginTransfer_orderBy =
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
  stagingmetis_asset?: Maybe<stagingmetis_Asset>;
  stagingmetis_assets: Array<stagingmetis_Asset>;
  stagingmetis_assetStatus?: Maybe<stagingmetis_AssetStatus>;
  stagingmetis_assetStatuses: Array<stagingmetis_AssetStatus>;
  stagingmetis_assetBalance?: Maybe<stagingmetis_AssetBalance>;
  stagingmetis_assetBalances: Array<stagingmetis_AssetBalance>;
  stagingmetis_router?: Maybe<stagingmetis_Router>;
  stagingmetis_routers: Array<stagingmetis_Router>;
  stagingmetis_routerDailyTVL?: Maybe<stagingmetis_RouterDailyTVL>;
  stagingmetis_routerDailyTVLs: Array<stagingmetis_RouterDailyTVL>;
  stagingmetis_routerLiquidityEvent?: Maybe<stagingmetis_RouterLiquidityEvent>;
  stagingmetis_routerLiquidityEvents: Array<stagingmetis_RouterLiquidityEvent>;
  stagingmetis_setting?: Maybe<stagingmetis_Setting>;
  stagingmetis_settings: Array<stagingmetis_Setting>;
  stagingmetis_relayer?: Maybe<stagingmetis_Relayer>;
  stagingmetis_relayers: Array<stagingmetis_Relayer>;
  stagingmetis_sequencer?: Maybe<stagingmetis_Sequencer>;
  stagingmetis_sequencers: Array<stagingmetis_Sequencer>;
  stagingmetis_relayerFee?: Maybe<stagingmetis_RelayerFee>;
  stagingmetis_relayerFees: Array<stagingmetis_RelayerFee>;
  stagingmetis_originTransfer?: Maybe<stagingmetis_OriginTransfer>;
  stagingmetis_originTransfers: Array<stagingmetis_OriginTransfer>;
  stagingmetis_destinationTransfer?: Maybe<stagingmetis_DestinationTransfer>;
  stagingmetis_destinationTransfers: Array<stagingmetis_DestinationTransfer>;
  stagingmetis_originMessage?: Maybe<stagingmetis_OriginMessage>;
  stagingmetis_originMessages: Array<stagingmetis_OriginMessage>;
  stagingmetis_aggregateRoot?: Maybe<stagingmetis_AggregateRoot>;
  stagingmetis_aggregateRoots: Array<stagingmetis_AggregateRoot>;
  stagingmetis_connectorMeta?: Maybe<stagingmetis_ConnectorMeta>;
  stagingmetis_connectorMetas: Array<stagingmetis_ConnectorMeta>;
  stagingmetis_rootCount?: Maybe<stagingmetis_RootCount>;
  stagingmetis_rootCounts: Array<stagingmetis_RootCount>;
  stagingmetis_rootMessageSent?: Maybe<stagingmetis_RootMessageSent>;
  stagingmetis_rootMessageSents: Array<stagingmetis_RootMessageSent>;
  stagingmetis_relayerFeesIncrease?: Maybe<stagingmetis_RelayerFeesIncrease>;
  stagingmetis_relayerFeesIncreases: Array<stagingmetis_RelayerFeesIncrease>;
  stagingmetis_slippageUpdate?: Maybe<stagingmetis_SlippageUpdate>;
  stagingmetis_slippageUpdates: Array<stagingmetis_SlippageUpdate>;
  stagingmetis_snapshotRoot?: Maybe<stagingmetis_SnapshotRoot>;
  stagingmetis_snapshotRoots: Array<stagingmetis_SnapshotRoot>;
  stagingmetis_spokeConnectorMode?: Maybe<stagingmetis_SpokeConnectorMode>;
  stagingmetis_spokeConnectorModes: Array<stagingmetis_SpokeConnectorMode>;
  stagingmetis_aggregateRootProposed?: Maybe<stagingmetis_AggregateRootProposed>;
  stagingmetis_aggregateRootProposeds: Array<stagingmetis_AggregateRootProposed>;
  stagingmetis_optimisticRootFinalized?: Maybe<stagingmetis_OptimisticRootFinalized>;
  stagingmetis_optimisticRootFinalizeds: Array<stagingmetis_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingmetis__meta?: Maybe<stagingmetis__Meta_>;
};


export type Querystagingmetis_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_Asset_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_AssetStatus_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_AssetBalance_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_Router_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_Router_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_Setting_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_Relayer_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_Sequencer_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_RelayerFee_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_OriginTransfer_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_DestinationTransfer_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_OriginMessage_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_AggregateRoot_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_ConnectorMeta_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_RootCount_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_RootMessageSent_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_SlippageUpdate_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_SnapshotRoot_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmetis__metaArgs = {
  block?: InputMaybe<stagingmetis_Block_height>;
};

export type stagingmetis_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['stagingmetis_Bytes']>;
};

export type stagingmetis_RelayerFee = {
  id: Scalars['ID'];
  transfer: stagingmetis_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['stagingmetis_Bytes'];
};

export type stagingmetis_RelayerFee_filter = {
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
  transfer_?: InputMaybe<stagingmetis_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmetis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmetis_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmetis_RelayerFee_filter>>>;
};

export type stagingmetis_RelayerFee_orderBy =
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

export type stagingmetis_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: stagingmetis_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['stagingmetis_Bytes']>;
  caller: Scalars['stagingmetis_Bytes'];
  transactionHash: Scalars['stagingmetis_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingmetis_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<stagingmetis_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
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
  _change_block?: InputMaybe<stagingmetis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmetis_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmetis_RelayerFeesIncrease_filter>>>;
};

export type stagingmetis_RelayerFeesIncrease_orderBy =
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

export type stagingmetis_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  relayer_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmetis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmetis_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmetis_Relayer_filter>>>;
};

export type stagingmetis_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type stagingmetis_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type stagingmetis_RootCount_filter = {
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
  _change_block?: InputMaybe<stagingmetis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmetis_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmetis_RootCount_filter>>>;
};

export type stagingmetis_RootCount_orderBy =
  | 'id'
  | 'count';

export type stagingmetis_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['stagingmetis_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['stagingmetis_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingmetis_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingmetis_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
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
  _change_block?: InputMaybe<stagingmetis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmetis_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmetis_RootMessageSent_filter>>>;
};

export type stagingmetis_RootMessageSent_orderBy =
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

export type stagingmetis_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['stagingmetis_Bytes']>;
  recipient?: Maybe<Scalars['stagingmetis_Bytes']>;
  proposedOwner?: Maybe<Scalars['stagingmetis_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<stagingmetis_AssetBalance>;
};


export type stagingmetis_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_AssetBalance_filter>;
};

export type stagingmetis_RouterDailyTVL = {
  id: Scalars['ID'];
  router: stagingmetis_Router;
  asset: stagingmetis_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type stagingmetis_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<stagingmetis_Router_filter>;
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
  asset_?: InputMaybe<stagingmetis_Asset_filter>;
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
  _change_block?: InputMaybe<stagingmetis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmetis_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmetis_RouterDailyTVL_filter>>>;
};

export type stagingmetis_RouterDailyTVL_orderBy =
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

export type stagingmetis_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<stagingmetis_RouterLiquidityEventType>;
  router: stagingmetis_Router;
  asset: stagingmetis_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['stagingmetis_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['stagingmetis_Bytes'];
  nonce: Scalars['BigInt'];
};

export type stagingmetis_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type stagingmetis_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<stagingmetis_RouterLiquidityEventType>;
  type_not?: InputMaybe<stagingmetis_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<stagingmetis_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<stagingmetis_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<stagingmetis_Router_filter>;
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
  asset_?: InputMaybe<stagingmetis_Asset_filter>;
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
  caller?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmetis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmetis_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmetis_RouterLiquidityEvent_filter>>>;
};

export type stagingmetis_RouterLiquidityEvent_orderBy =
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

export type stagingmetis_Router_filter = {
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
  owner?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  owner_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  owner_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  owner_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  owner_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  owner_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  recipient?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  recipient_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<stagingmetis_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmetis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmetis_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmetis_Router_filter>>>;
};

export type stagingmetis_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type stagingmetis_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['stagingmetis_Bytes']>;
};

export type stagingmetis_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmetis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmetis_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmetis_Sequencer_filter>>>;
};

export type stagingmetis_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type stagingmetis_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['stagingmetis_Bytes'];
};

export type stagingmetis_Setting_filter = {
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
  caller?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmetis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmetis_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmetis_Setting_filter>>>;
};

export type stagingmetis_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type stagingmetis_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: stagingmetis_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['stagingmetis_Bytes'];
  transactionHash: Scalars['stagingmetis_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingmetis_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<stagingmetis_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
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
  _change_block?: InputMaybe<stagingmetis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmetis_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmetis_SlippageUpdate_filter>>>;
};

export type stagingmetis_SlippageUpdate_orderBy =
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

export type stagingmetis_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['stagingmetis_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingmetis_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingmetis_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingmetis_Bytes']>;
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
  _change_block?: InputMaybe<stagingmetis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmetis_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmetis_SnapshotRoot_filter>>>;
};

export type stagingmetis_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type stagingmetis_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type stagingmetis_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<stagingmetis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmetis_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmetis_SpokeConnectorMode_filter>>>;
};

export type stagingmetis_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  stagingmetis_asset?: Maybe<stagingmetis_Asset>;
  stagingmetis_assets: Array<stagingmetis_Asset>;
  stagingmetis_assetStatus?: Maybe<stagingmetis_AssetStatus>;
  stagingmetis_assetStatuses: Array<stagingmetis_AssetStatus>;
  stagingmetis_assetBalance?: Maybe<stagingmetis_AssetBalance>;
  stagingmetis_assetBalances: Array<stagingmetis_AssetBalance>;
  stagingmetis_router?: Maybe<stagingmetis_Router>;
  stagingmetis_routers: Array<stagingmetis_Router>;
  stagingmetis_routerDailyTVL?: Maybe<stagingmetis_RouterDailyTVL>;
  stagingmetis_routerDailyTVLs: Array<stagingmetis_RouterDailyTVL>;
  stagingmetis_routerLiquidityEvent?: Maybe<stagingmetis_RouterLiquidityEvent>;
  stagingmetis_routerLiquidityEvents: Array<stagingmetis_RouterLiquidityEvent>;
  stagingmetis_setting?: Maybe<stagingmetis_Setting>;
  stagingmetis_settings: Array<stagingmetis_Setting>;
  stagingmetis_relayer?: Maybe<stagingmetis_Relayer>;
  stagingmetis_relayers: Array<stagingmetis_Relayer>;
  stagingmetis_sequencer?: Maybe<stagingmetis_Sequencer>;
  stagingmetis_sequencers: Array<stagingmetis_Sequencer>;
  stagingmetis_relayerFee?: Maybe<stagingmetis_RelayerFee>;
  stagingmetis_relayerFees: Array<stagingmetis_RelayerFee>;
  stagingmetis_originTransfer?: Maybe<stagingmetis_OriginTransfer>;
  stagingmetis_originTransfers: Array<stagingmetis_OriginTransfer>;
  stagingmetis_destinationTransfer?: Maybe<stagingmetis_DestinationTransfer>;
  stagingmetis_destinationTransfers: Array<stagingmetis_DestinationTransfer>;
  stagingmetis_originMessage?: Maybe<stagingmetis_OriginMessage>;
  stagingmetis_originMessages: Array<stagingmetis_OriginMessage>;
  stagingmetis_aggregateRoot?: Maybe<stagingmetis_AggregateRoot>;
  stagingmetis_aggregateRoots: Array<stagingmetis_AggregateRoot>;
  stagingmetis_connectorMeta?: Maybe<stagingmetis_ConnectorMeta>;
  stagingmetis_connectorMetas: Array<stagingmetis_ConnectorMeta>;
  stagingmetis_rootCount?: Maybe<stagingmetis_RootCount>;
  stagingmetis_rootCounts: Array<stagingmetis_RootCount>;
  stagingmetis_rootMessageSent?: Maybe<stagingmetis_RootMessageSent>;
  stagingmetis_rootMessageSents: Array<stagingmetis_RootMessageSent>;
  stagingmetis_relayerFeesIncrease?: Maybe<stagingmetis_RelayerFeesIncrease>;
  stagingmetis_relayerFeesIncreases: Array<stagingmetis_RelayerFeesIncrease>;
  stagingmetis_slippageUpdate?: Maybe<stagingmetis_SlippageUpdate>;
  stagingmetis_slippageUpdates: Array<stagingmetis_SlippageUpdate>;
  stagingmetis_snapshotRoot?: Maybe<stagingmetis_SnapshotRoot>;
  stagingmetis_snapshotRoots: Array<stagingmetis_SnapshotRoot>;
  stagingmetis_spokeConnectorMode?: Maybe<stagingmetis_SpokeConnectorMode>;
  stagingmetis_spokeConnectorModes: Array<stagingmetis_SpokeConnectorMode>;
  stagingmetis_aggregateRootProposed?: Maybe<stagingmetis_AggregateRootProposed>;
  stagingmetis_aggregateRootProposeds: Array<stagingmetis_AggregateRootProposed>;
  stagingmetis_optimisticRootFinalized?: Maybe<stagingmetis_OptimisticRootFinalized>;
  stagingmetis_optimisticRootFinalizeds: Array<stagingmetis_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingmetis__meta?: Maybe<stagingmetis__Meta_>;
};


export type Subscriptionstagingmetis_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_Asset_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_AssetStatus_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_AssetBalance_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_Router_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_Router_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_Setting_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_Relayer_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_Sequencer_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_RelayerFee_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_OriginTransfer_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_DestinationTransfer_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_OriginMessage_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_AggregateRoot_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_ConnectorMeta_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_RootCount_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_RootMessageSent_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_SlippageUpdate_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_SnapshotRoot_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmetis_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingmetis_OrderDirection>;
  where?: InputMaybe<stagingmetis_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingmetis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmetis__metaArgs = {
  block?: InputMaybe<stagingmetis_Block_height>;
};

export type stagingmetis_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type stagingmetis__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingmetis_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type stagingmetis__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingmetis__Block_;
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
  stagingmetis_asset: InContextSdkMethod<Query['stagingmetis_asset'], Querystagingmetis_assetArgs, MeshContext>,
  /** null **/
  stagingmetis_assets: InContextSdkMethod<Query['stagingmetis_assets'], Querystagingmetis_assetsArgs, MeshContext>,
  /** null **/
  stagingmetis_assetStatus: InContextSdkMethod<Query['stagingmetis_assetStatus'], Querystagingmetis_assetStatusArgs, MeshContext>,
  /** null **/
  stagingmetis_assetStatuses: InContextSdkMethod<Query['stagingmetis_assetStatuses'], Querystagingmetis_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingmetis_assetBalance: InContextSdkMethod<Query['stagingmetis_assetBalance'], Querystagingmetis_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingmetis_assetBalances: InContextSdkMethod<Query['stagingmetis_assetBalances'], Querystagingmetis_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingmetis_router: InContextSdkMethod<Query['stagingmetis_router'], Querystagingmetis_routerArgs, MeshContext>,
  /** null **/
  stagingmetis_routers: InContextSdkMethod<Query['stagingmetis_routers'], Querystagingmetis_routersArgs, MeshContext>,
  /** null **/
  stagingmetis_routerDailyTVL: InContextSdkMethod<Query['stagingmetis_routerDailyTVL'], Querystagingmetis_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingmetis_routerDailyTVLs: InContextSdkMethod<Query['stagingmetis_routerDailyTVLs'], Querystagingmetis_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingmetis_routerLiquidityEvent: InContextSdkMethod<Query['stagingmetis_routerLiquidityEvent'], Querystagingmetis_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingmetis_routerLiquidityEvents: InContextSdkMethod<Query['stagingmetis_routerLiquidityEvents'], Querystagingmetis_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingmetis_setting: InContextSdkMethod<Query['stagingmetis_setting'], Querystagingmetis_settingArgs, MeshContext>,
  /** null **/
  stagingmetis_settings: InContextSdkMethod<Query['stagingmetis_settings'], Querystagingmetis_settingsArgs, MeshContext>,
  /** null **/
  stagingmetis_relayer: InContextSdkMethod<Query['stagingmetis_relayer'], Querystagingmetis_relayerArgs, MeshContext>,
  /** null **/
  stagingmetis_relayers: InContextSdkMethod<Query['stagingmetis_relayers'], Querystagingmetis_relayersArgs, MeshContext>,
  /** null **/
  stagingmetis_sequencer: InContextSdkMethod<Query['stagingmetis_sequencer'], Querystagingmetis_sequencerArgs, MeshContext>,
  /** null **/
  stagingmetis_sequencers: InContextSdkMethod<Query['stagingmetis_sequencers'], Querystagingmetis_sequencersArgs, MeshContext>,
  /** null **/
  stagingmetis_relayerFee: InContextSdkMethod<Query['stagingmetis_relayerFee'], Querystagingmetis_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingmetis_relayerFees: InContextSdkMethod<Query['stagingmetis_relayerFees'], Querystagingmetis_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingmetis_originTransfer: InContextSdkMethod<Query['stagingmetis_originTransfer'], Querystagingmetis_originTransferArgs, MeshContext>,
  /** null **/
  stagingmetis_originTransfers: InContextSdkMethod<Query['stagingmetis_originTransfers'], Querystagingmetis_originTransfersArgs, MeshContext>,
  /** null **/
  stagingmetis_destinationTransfer: InContextSdkMethod<Query['stagingmetis_destinationTransfer'], Querystagingmetis_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingmetis_destinationTransfers: InContextSdkMethod<Query['stagingmetis_destinationTransfers'], Querystagingmetis_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingmetis_originMessage: InContextSdkMethod<Query['stagingmetis_originMessage'], Querystagingmetis_originMessageArgs, MeshContext>,
  /** null **/
  stagingmetis_originMessages: InContextSdkMethod<Query['stagingmetis_originMessages'], Querystagingmetis_originMessagesArgs, MeshContext>,
  /** null **/
  stagingmetis_aggregateRoot: InContextSdkMethod<Query['stagingmetis_aggregateRoot'], Querystagingmetis_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingmetis_aggregateRoots: InContextSdkMethod<Query['stagingmetis_aggregateRoots'], Querystagingmetis_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingmetis_connectorMeta: InContextSdkMethod<Query['stagingmetis_connectorMeta'], Querystagingmetis_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingmetis_connectorMetas: InContextSdkMethod<Query['stagingmetis_connectorMetas'], Querystagingmetis_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingmetis_rootCount: InContextSdkMethod<Query['stagingmetis_rootCount'], Querystagingmetis_rootCountArgs, MeshContext>,
  /** null **/
  stagingmetis_rootCounts: InContextSdkMethod<Query['stagingmetis_rootCounts'], Querystagingmetis_rootCountsArgs, MeshContext>,
  /** null **/
  stagingmetis_rootMessageSent: InContextSdkMethod<Query['stagingmetis_rootMessageSent'], Querystagingmetis_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingmetis_rootMessageSents: InContextSdkMethod<Query['stagingmetis_rootMessageSents'], Querystagingmetis_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingmetis_relayerFeesIncrease: InContextSdkMethod<Query['stagingmetis_relayerFeesIncrease'], Querystagingmetis_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingmetis_relayerFeesIncreases: InContextSdkMethod<Query['stagingmetis_relayerFeesIncreases'], Querystagingmetis_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingmetis_slippageUpdate: InContextSdkMethod<Query['stagingmetis_slippageUpdate'], Querystagingmetis_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingmetis_slippageUpdates: InContextSdkMethod<Query['stagingmetis_slippageUpdates'], Querystagingmetis_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingmetis_snapshotRoot: InContextSdkMethod<Query['stagingmetis_snapshotRoot'], Querystagingmetis_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingmetis_snapshotRoots: InContextSdkMethod<Query['stagingmetis_snapshotRoots'], Querystagingmetis_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingmetis_spokeConnectorMode: InContextSdkMethod<Query['stagingmetis_spokeConnectorMode'], Querystagingmetis_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingmetis_spokeConnectorModes: InContextSdkMethod<Query['stagingmetis_spokeConnectorModes'], Querystagingmetis_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingmetis_aggregateRootProposed: InContextSdkMethod<Query['stagingmetis_aggregateRootProposed'], Querystagingmetis_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingmetis_aggregateRootProposeds: InContextSdkMethod<Query['stagingmetis_aggregateRootProposeds'], Querystagingmetis_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingmetis_optimisticRootFinalized: InContextSdkMethod<Query['stagingmetis_optimisticRootFinalized'], Querystagingmetis_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingmetis_optimisticRootFinalizeds: InContextSdkMethod<Query['stagingmetis_optimisticRootFinalizeds'], Querystagingmetis_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingmetis__meta: InContextSdkMethod<Query['stagingmetis__meta'], Querystagingmetis__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  stagingmetis_asset: InContextSdkMethod<Subscription['stagingmetis_asset'], Subscriptionstagingmetis_assetArgs, MeshContext>,
  /** null **/
  stagingmetis_assets: InContextSdkMethod<Subscription['stagingmetis_assets'], Subscriptionstagingmetis_assetsArgs, MeshContext>,
  /** null **/
  stagingmetis_assetStatus: InContextSdkMethod<Subscription['stagingmetis_assetStatus'], Subscriptionstagingmetis_assetStatusArgs, MeshContext>,
  /** null **/
  stagingmetis_assetStatuses: InContextSdkMethod<Subscription['stagingmetis_assetStatuses'], Subscriptionstagingmetis_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingmetis_assetBalance: InContextSdkMethod<Subscription['stagingmetis_assetBalance'], Subscriptionstagingmetis_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingmetis_assetBalances: InContextSdkMethod<Subscription['stagingmetis_assetBalances'], Subscriptionstagingmetis_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingmetis_router: InContextSdkMethod<Subscription['stagingmetis_router'], Subscriptionstagingmetis_routerArgs, MeshContext>,
  /** null **/
  stagingmetis_routers: InContextSdkMethod<Subscription['stagingmetis_routers'], Subscriptionstagingmetis_routersArgs, MeshContext>,
  /** null **/
  stagingmetis_routerDailyTVL: InContextSdkMethod<Subscription['stagingmetis_routerDailyTVL'], Subscriptionstagingmetis_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingmetis_routerDailyTVLs: InContextSdkMethod<Subscription['stagingmetis_routerDailyTVLs'], Subscriptionstagingmetis_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingmetis_routerLiquidityEvent: InContextSdkMethod<Subscription['stagingmetis_routerLiquidityEvent'], Subscriptionstagingmetis_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingmetis_routerLiquidityEvents: InContextSdkMethod<Subscription['stagingmetis_routerLiquidityEvents'], Subscriptionstagingmetis_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingmetis_setting: InContextSdkMethod<Subscription['stagingmetis_setting'], Subscriptionstagingmetis_settingArgs, MeshContext>,
  /** null **/
  stagingmetis_settings: InContextSdkMethod<Subscription['stagingmetis_settings'], Subscriptionstagingmetis_settingsArgs, MeshContext>,
  /** null **/
  stagingmetis_relayer: InContextSdkMethod<Subscription['stagingmetis_relayer'], Subscriptionstagingmetis_relayerArgs, MeshContext>,
  /** null **/
  stagingmetis_relayers: InContextSdkMethod<Subscription['stagingmetis_relayers'], Subscriptionstagingmetis_relayersArgs, MeshContext>,
  /** null **/
  stagingmetis_sequencer: InContextSdkMethod<Subscription['stagingmetis_sequencer'], Subscriptionstagingmetis_sequencerArgs, MeshContext>,
  /** null **/
  stagingmetis_sequencers: InContextSdkMethod<Subscription['stagingmetis_sequencers'], Subscriptionstagingmetis_sequencersArgs, MeshContext>,
  /** null **/
  stagingmetis_relayerFee: InContextSdkMethod<Subscription['stagingmetis_relayerFee'], Subscriptionstagingmetis_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingmetis_relayerFees: InContextSdkMethod<Subscription['stagingmetis_relayerFees'], Subscriptionstagingmetis_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingmetis_originTransfer: InContextSdkMethod<Subscription['stagingmetis_originTransfer'], Subscriptionstagingmetis_originTransferArgs, MeshContext>,
  /** null **/
  stagingmetis_originTransfers: InContextSdkMethod<Subscription['stagingmetis_originTransfers'], Subscriptionstagingmetis_originTransfersArgs, MeshContext>,
  /** null **/
  stagingmetis_destinationTransfer: InContextSdkMethod<Subscription['stagingmetis_destinationTransfer'], Subscriptionstagingmetis_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingmetis_destinationTransfers: InContextSdkMethod<Subscription['stagingmetis_destinationTransfers'], Subscriptionstagingmetis_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingmetis_originMessage: InContextSdkMethod<Subscription['stagingmetis_originMessage'], Subscriptionstagingmetis_originMessageArgs, MeshContext>,
  /** null **/
  stagingmetis_originMessages: InContextSdkMethod<Subscription['stagingmetis_originMessages'], Subscriptionstagingmetis_originMessagesArgs, MeshContext>,
  /** null **/
  stagingmetis_aggregateRoot: InContextSdkMethod<Subscription['stagingmetis_aggregateRoot'], Subscriptionstagingmetis_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingmetis_aggregateRoots: InContextSdkMethod<Subscription['stagingmetis_aggregateRoots'], Subscriptionstagingmetis_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingmetis_connectorMeta: InContextSdkMethod<Subscription['stagingmetis_connectorMeta'], Subscriptionstagingmetis_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingmetis_connectorMetas: InContextSdkMethod<Subscription['stagingmetis_connectorMetas'], Subscriptionstagingmetis_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingmetis_rootCount: InContextSdkMethod<Subscription['stagingmetis_rootCount'], Subscriptionstagingmetis_rootCountArgs, MeshContext>,
  /** null **/
  stagingmetis_rootCounts: InContextSdkMethod<Subscription['stagingmetis_rootCounts'], Subscriptionstagingmetis_rootCountsArgs, MeshContext>,
  /** null **/
  stagingmetis_rootMessageSent: InContextSdkMethod<Subscription['stagingmetis_rootMessageSent'], Subscriptionstagingmetis_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingmetis_rootMessageSents: InContextSdkMethod<Subscription['stagingmetis_rootMessageSents'], Subscriptionstagingmetis_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingmetis_relayerFeesIncrease: InContextSdkMethod<Subscription['stagingmetis_relayerFeesIncrease'], Subscriptionstagingmetis_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingmetis_relayerFeesIncreases: InContextSdkMethod<Subscription['stagingmetis_relayerFeesIncreases'], Subscriptionstagingmetis_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingmetis_slippageUpdate: InContextSdkMethod<Subscription['stagingmetis_slippageUpdate'], Subscriptionstagingmetis_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingmetis_slippageUpdates: InContextSdkMethod<Subscription['stagingmetis_slippageUpdates'], Subscriptionstagingmetis_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingmetis_snapshotRoot: InContextSdkMethod<Subscription['stagingmetis_snapshotRoot'], Subscriptionstagingmetis_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingmetis_snapshotRoots: InContextSdkMethod<Subscription['stagingmetis_snapshotRoots'], Subscriptionstagingmetis_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingmetis_spokeConnectorMode: InContextSdkMethod<Subscription['stagingmetis_spokeConnectorMode'], Subscriptionstagingmetis_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingmetis_spokeConnectorModes: InContextSdkMethod<Subscription['stagingmetis_spokeConnectorModes'], Subscriptionstagingmetis_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingmetis_aggregateRootProposed: InContextSdkMethod<Subscription['stagingmetis_aggregateRootProposed'], Subscriptionstagingmetis_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingmetis_aggregateRootProposeds: InContextSdkMethod<Subscription['stagingmetis_aggregateRootProposeds'], Subscriptionstagingmetis_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingmetis_optimisticRootFinalized: InContextSdkMethod<Subscription['stagingmetis_optimisticRootFinalized'], Subscriptionstagingmetis_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingmetis_optimisticRootFinalizeds: InContextSdkMethod<Subscription['stagingmetis_optimisticRootFinalizeds'], Subscriptionstagingmetis_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingmetis__meta: InContextSdkMethod<Subscription['stagingmetis__meta'], Subscriptionstagingmetis__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Staging_Metis"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
