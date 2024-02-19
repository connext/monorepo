// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextBaseGoerliTypes {
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
  basegoerli_BigDecimal: any;
  BigInt: any;
  basegoerli_Bytes: any;
  basegoerli_Int8: any;
};

export type basegoerli_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['basegoerli_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type basegoerli_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['basegoerli_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type basegoerli_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['basegoerli_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
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
  _change_block?: InputMaybe<basegoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<basegoerli_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<basegoerli_AggregateRootProposed_filter>>>;
};

export type basegoerli_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type basegoerli_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<basegoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<basegoerli_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<basegoerli_AggregateRoot_filter>>>;
};

export type basegoerli_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type basegoerli_Aggregation_interval =
  | 'hour'
  | 'day';

export type basegoerli_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['basegoerli_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['basegoerli_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['basegoerli_Bytes']>;
  localAsset?: Maybe<Scalars['basegoerli_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<basegoerli_AssetStatus>;
};

export type basegoerli_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: basegoerli_Router;
  asset: basegoerli_Asset;
  feesEarned: Scalars['BigInt'];
};

export type basegoerli_AssetBalance_filter = {
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
  router_?: InputMaybe<basegoerli_Router_filter>;
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
  asset_?: InputMaybe<basegoerli_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<basegoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<basegoerli_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<basegoerli_AssetBalance_filter>>>;
};

export type basegoerli_AssetBalance_orderBy =
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

export type basegoerli_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type basegoerli_AssetStatus_filter = {
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
  _change_block?: InputMaybe<basegoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<basegoerli_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<basegoerli_AssetStatus_filter>>>;
};

export type basegoerli_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type basegoerli_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['basegoerli_Bytes']>;
  key_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  key_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  key_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  key_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  key_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  key_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['basegoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['basegoerli_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  localAsset?: InputMaybe<Scalars['basegoerli_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
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
  status_?: InputMaybe<basegoerli_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<basegoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<basegoerli_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<basegoerli_Asset_filter>>>;
};

export type basegoerli_Asset_orderBy =
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

export type basegoerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type basegoerli_Block_height = {
  hash?: InputMaybe<Scalars['basegoerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type basegoerli_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['basegoerli_Bytes']>;
  rootManager?: Maybe<Scalars['basegoerli_Bytes']>;
  mirrorConnector?: Maybe<Scalars['basegoerli_Bytes']>;
};

export type basegoerli_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['basegoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['basegoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['basegoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<basegoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<basegoerli_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<basegoerli_ConnectorMeta_filter>>>;
};

export type basegoerli_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type basegoerli_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['basegoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<basegoerli_TransferStatus>;
  routers?: Maybe<Array<basegoerli_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['basegoerli_Bytes']>;
  delegate?: Maybe<Scalars['basegoerli_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['basegoerli_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['basegoerli_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['basegoerli_Bytes']>;
  asset?: Maybe<basegoerli_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['basegoerli_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['basegoerli_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['basegoerli_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['basegoerli_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['basegoerli_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['basegoerli_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type basegoerli_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_Router_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_Router_filter>;
};

export type basegoerli_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<basegoerli_TransferStatus>;
  status_not?: InputMaybe<basegoerli_TransferStatus>;
  status_in?: InputMaybe<Array<basegoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<basegoerli_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<basegoerli_Router_filter>;
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
  to?: InputMaybe<Scalars['basegoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  to_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  to_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  to_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  to_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  delegate?: InputMaybe<Scalars['basegoerli_Bytes']>;
  delegate_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['basegoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  callData_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  callData_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  callData_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  callData_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
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
  originSender?: InputMaybe<Scalars['basegoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['basegoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
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
  asset_?: InputMaybe<basegoerli_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['basegoerli_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['basegoerli_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['basegoerli_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['basegoerli_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['basegoerli_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['basegoerli_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<basegoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<basegoerli_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<basegoerli_DestinationTransfer_filter>>>;
};

export type basegoerli_DestinationTransfer_orderBy =
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

export type basegoerli_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['basegoerli_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type basegoerli_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['basegoerli_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
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
  _change_block?: InputMaybe<basegoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<basegoerli_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<basegoerli_OptimisticRootFinalized_filter>>>;
};

export type basegoerli_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type basegoerli_OrderDirection =
  | 'asc'
  | 'desc';

export type basegoerli_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['basegoerli_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['basegoerli_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['basegoerli_Bytes']>;
  root?: Maybe<Scalars['basegoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['basegoerli_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<basegoerli_RootCount>;
};

export type basegoerli_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['basegoerli_Bytes']>;
  leaf_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['basegoerli_Bytes']>;
  message_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  message_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  message_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  message_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  message_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  message_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
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
  rootCount_?: InputMaybe<basegoerli_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<basegoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<basegoerli_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<basegoerli_OriginMessage_filter>>>;
};

export type basegoerli_OriginMessage_orderBy =
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

export type basegoerli_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['basegoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<basegoerli_TransferStatus>;
  messageHash?: Maybe<Scalars['basegoerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['basegoerli_Bytes']>;
  delegate?: Maybe<Scalars['basegoerli_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['basegoerli_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['basegoerli_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['basegoerli_Bytes']>;
  asset?: Maybe<basegoerli_Asset>;
  transactingAsset?: Maybe<Scalars['basegoerli_Bytes']>;
  message?: Maybe<basegoerli_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<basegoerli_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['basegoerli_Bytes']>;
  caller?: Maybe<Scalars['basegoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['basegoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['basegoerli_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type basegoerli_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_RelayerFee_filter>;
};

export type basegoerli_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<basegoerli_TransferStatus>;
  status_not?: InputMaybe<basegoerli_TransferStatus>;
  status_in?: InputMaybe<Array<basegoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<basegoerli_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['basegoerli_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
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
  to?: InputMaybe<Scalars['basegoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  to_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  to_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  to_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  to_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  delegate?: InputMaybe<Scalars['basegoerli_Bytes']>;
  delegate_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['basegoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  callData_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  callData_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  callData_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  callData_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['basegoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['basegoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
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
  asset_?: InputMaybe<basegoerli_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
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
  message_?: InputMaybe<basegoerli_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<basegoerli_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['basegoerli_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['basegoerli_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<basegoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<basegoerli_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<basegoerli_OriginTransfer_filter>>>;
};

export type basegoerli_OriginTransfer_orderBy =
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
  basegoerli_asset?: Maybe<basegoerli_Asset>;
  basegoerli_assets: Array<basegoerli_Asset>;
  basegoerli_assetStatus?: Maybe<basegoerli_AssetStatus>;
  basegoerli_assetStatuses: Array<basegoerli_AssetStatus>;
  basegoerli_assetBalance?: Maybe<basegoerli_AssetBalance>;
  basegoerli_assetBalances: Array<basegoerli_AssetBalance>;
  basegoerli_router?: Maybe<basegoerli_Router>;
  basegoerli_routers: Array<basegoerli_Router>;
  basegoerli_routerDailyTVL?: Maybe<basegoerli_RouterDailyTVL>;
  basegoerli_routerDailyTVLs: Array<basegoerli_RouterDailyTVL>;
  basegoerli_routerLiquidityEvent?: Maybe<basegoerli_RouterLiquidityEvent>;
  basegoerli_routerLiquidityEvents: Array<basegoerli_RouterLiquidityEvent>;
  basegoerli_setting?: Maybe<basegoerli_Setting>;
  basegoerli_settings: Array<basegoerli_Setting>;
  basegoerli_relayer?: Maybe<basegoerli_Relayer>;
  basegoerli_relayers: Array<basegoerli_Relayer>;
  basegoerli_sequencer?: Maybe<basegoerli_Sequencer>;
  basegoerli_sequencers: Array<basegoerli_Sequencer>;
  basegoerli_relayerFee?: Maybe<basegoerli_RelayerFee>;
  basegoerli_relayerFees: Array<basegoerli_RelayerFee>;
  basegoerli_originTransfer?: Maybe<basegoerli_OriginTransfer>;
  basegoerli_originTransfers: Array<basegoerli_OriginTransfer>;
  basegoerli_destinationTransfer?: Maybe<basegoerli_DestinationTransfer>;
  basegoerli_destinationTransfers: Array<basegoerli_DestinationTransfer>;
  basegoerli_originMessage?: Maybe<basegoerli_OriginMessage>;
  basegoerli_originMessages: Array<basegoerli_OriginMessage>;
  basegoerli_aggregateRoot?: Maybe<basegoerli_AggregateRoot>;
  basegoerli_aggregateRoots: Array<basegoerli_AggregateRoot>;
  basegoerli_connectorMeta?: Maybe<basegoerli_ConnectorMeta>;
  basegoerli_connectorMetas: Array<basegoerli_ConnectorMeta>;
  basegoerli_rootCount?: Maybe<basegoerli_RootCount>;
  basegoerli_rootCounts: Array<basegoerli_RootCount>;
  basegoerli_rootMessageSent?: Maybe<basegoerli_RootMessageSent>;
  basegoerli_rootMessageSents: Array<basegoerli_RootMessageSent>;
  basegoerli_relayerFeesIncrease?: Maybe<basegoerli_RelayerFeesIncrease>;
  basegoerli_relayerFeesIncreases: Array<basegoerli_RelayerFeesIncrease>;
  basegoerli_slippageUpdate?: Maybe<basegoerli_SlippageUpdate>;
  basegoerli_slippageUpdates: Array<basegoerli_SlippageUpdate>;
  basegoerli_snapshotRoot?: Maybe<basegoerli_SnapshotRoot>;
  basegoerli_snapshotRoots: Array<basegoerli_SnapshotRoot>;
  basegoerli_spokeConnectorMode?: Maybe<basegoerli_SpokeConnectorMode>;
  basegoerli_spokeConnectorModes: Array<basegoerli_SpokeConnectorMode>;
  basegoerli_aggregateRootProposed?: Maybe<basegoerli_AggregateRootProposed>;
  basegoerli_aggregateRootProposeds: Array<basegoerli_AggregateRootProposed>;
  basegoerli_optimisticRootFinalized?: Maybe<basegoerli_OptimisticRootFinalized>;
  basegoerli_optimisticRootFinalizeds: Array<basegoerli_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  basegoerli__meta?: Maybe<basegoerli__Meta_>;
};


export type Querybasegoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_Asset_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_AssetStatus_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_AssetBalance_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_Router_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_Router_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_RouterDailyTVL_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_RouterLiquidityEvent_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_Setting_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_Relayer_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_Sequencer_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_Sequencer_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_RelayerFee_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_OriginTransfer_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_DestinationTransfer_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_OriginMessage_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_AggregateRoot_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_ConnectorMeta_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_RootCount_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_RootCount_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_RootMessageSent_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_RelayerFeesIncrease_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_SlippageUpdate_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_SnapshotRoot_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_SpokeConnectorMode_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_AggregateRootProposed_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_OptimisticRootFinalized_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybasegoerli__metaArgs = {
  block?: InputMaybe<basegoerli_Block_height>;
};

export type basegoerli_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['basegoerli_Bytes']>;
};

export type basegoerli_RelayerFee = {
  id: Scalars['ID'];
  transfer: basegoerli_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['basegoerli_Bytes'];
};

export type basegoerli_RelayerFee_filter = {
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
  transfer_?: InputMaybe<basegoerli_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['basegoerli_Bytes']>;
  asset_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  asset_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  asset_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  asset_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  asset_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<basegoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<basegoerli_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<basegoerli_RelayerFee_filter>>>;
};

export type basegoerli_RelayerFee_orderBy =
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

export type basegoerli_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: basegoerli_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['basegoerli_Bytes']>;
  caller: Scalars['basegoerli_Bytes'];
  transactionHash: Scalars['basegoerli_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type basegoerli_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<basegoerli_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['basegoerli_Bytes']>;
  asset_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  asset_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  asset_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  asset_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  asset_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
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
  _change_block?: InputMaybe<basegoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<basegoerli_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<basegoerli_RelayerFeesIncrease_filter>>>;
};

export type basegoerli_RelayerFeesIncrease_orderBy =
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

export type basegoerli_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['basegoerli_Bytes']>;
  relayer_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<basegoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<basegoerli_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<basegoerli_Relayer_filter>>>;
};

export type basegoerli_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type basegoerli_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type basegoerli_RootCount_filter = {
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
  _change_block?: InputMaybe<basegoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<basegoerli_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<basegoerli_RootCount_filter>>>;
};

export type basegoerli_RootCount_orderBy =
  | 'id'
  | 'count';

export type basegoerli_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['basegoerli_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['basegoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['basegoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type basegoerli_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
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
  _change_block?: InputMaybe<basegoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<basegoerli_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<basegoerli_RootMessageSent_filter>>>;
};

export type basegoerli_RootMessageSent_orderBy =
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

export type basegoerli_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['basegoerli_Bytes']>;
  recipient?: Maybe<Scalars['basegoerli_Bytes']>;
  proposedOwner?: Maybe<Scalars['basegoerli_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<basegoerli_AssetBalance>;
};


export type basegoerli_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_AssetBalance_filter>;
};

export type basegoerli_RouterDailyTVL = {
  id: Scalars['ID'];
  router: basegoerli_Router;
  asset: basegoerli_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type basegoerli_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<basegoerli_Router_filter>;
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
  asset_?: InputMaybe<basegoerli_Asset_filter>;
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
  _change_block?: InputMaybe<basegoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<basegoerli_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<basegoerli_RouterDailyTVL_filter>>>;
};

export type basegoerli_RouterDailyTVL_orderBy =
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

export type basegoerli_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<basegoerli_RouterLiquidityEventType>;
  router: basegoerli_Router;
  asset: basegoerli_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['basegoerli_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['basegoerli_Bytes'];
  nonce: Scalars['BigInt'];
};

export type basegoerli_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type basegoerli_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<basegoerli_RouterLiquidityEventType>;
  type_not?: InputMaybe<basegoerli_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<basegoerli_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<basegoerli_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<basegoerli_Router_filter>;
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
  asset_?: InputMaybe<basegoerli_Asset_filter>;
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
  caller?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<basegoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<basegoerli_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<basegoerli_RouterLiquidityEvent_filter>>>;
};

export type basegoerli_RouterLiquidityEvent_orderBy =
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

export type basegoerli_Router_filter = {
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
  owner?: InputMaybe<Scalars['basegoerli_Bytes']>;
  owner_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  owner_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  owner_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  owner_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  owner_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  recipient?: InputMaybe<Scalars['basegoerli_Bytes']>;
  recipient_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['basegoerli_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<basegoerli_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<basegoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<basegoerli_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<basegoerli_Router_filter>>>;
};

export type basegoerli_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type basegoerli_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['basegoerli_Bytes']>;
};

export type basegoerli_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['basegoerli_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<basegoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<basegoerli_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<basegoerli_Sequencer_filter>>>;
};

export type basegoerli_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type basegoerli_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['basegoerli_Bytes'];
};

export type basegoerli_Setting_filter = {
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
  caller?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<basegoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<basegoerli_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<basegoerli_Setting_filter>>>;
};

export type basegoerli_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type basegoerli_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: basegoerli_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['basegoerli_Bytes'];
  transactionHash: Scalars['basegoerli_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type basegoerli_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<basegoerli_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
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
  _change_block?: InputMaybe<basegoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<basegoerli_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<basegoerli_SlippageUpdate_filter>>>;
};

export type basegoerli_SlippageUpdate_orderBy =
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

export type basegoerli_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['basegoerli_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type basegoerli_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['basegoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['basegoerli_Bytes']>;
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
  _change_block?: InputMaybe<basegoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<basegoerli_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<basegoerli_SnapshotRoot_filter>>>;
};

export type basegoerli_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type basegoerli_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type basegoerli_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<basegoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<basegoerli_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<basegoerli_SpokeConnectorMode_filter>>>;
};

export type basegoerli_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  basegoerli_asset?: Maybe<basegoerli_Asset>;
  basegoerli_assets: Array<basegoerli_Asset>;
  basegoerli_assetStatus?: Maybe<basegoerli_AssetStatus>;
  basegoerli_assetStatuses: Array<basegoerli_AssetStatus>;
  basegoerli_assetBalance?: Maybe<basegoerli_AssetBalance>;
  basegoerli_assetBalances: Array<basegoerli_AssetBalance>;
  basegoerli_router?: Maybe<basegoerli_Router>;
  basegoerli_routers: Array<basegoerli_Router>;
  basegoerli_routerDailyTVL?: Maybe<basegoerli_RouterDailyTVL>;
  basegoerli_routerDailyTVLs: Array<basegoerli_RouterDailyTVL>;
  basegoerli_routerLiquidityEvent?: Maybe<basegoerli_RouterLiquidityEvent>;
  basegoerli_routerLiquidityEvents: Array<basegoerli_RouterLiquidityEvent>;
  basegoerli_setting?: Maybe<basegoerli_Setting>;
  basegoerli_settings: Array<basegoerli_Setting>;
  basegoerli_relayer?: Maybe<basegoerli_Relayer>;
  basegoerli_relayers: Array<basegoerli_Relayer>;
  basegoerli_sequencer?: Maybe<basegoerli_Sequencer>;
  basegoerli_sequencers: Array<basegoerli_Sequencer>;
  basegoerli_relayerFee?: Maybe<basegoerli_RelayerFee>;
  basegoerli_relayerFees: Array<basegoerli_RelayerFee>;
  basegoerli_originTransfer?: Maybe<basegoerli_OriginTransfer>;
  basegoerli_originTransfers: Array<basegoerli_OriginTransfer>;
  basegoerli_destinationTransfer?: Maybe<basegoerli_DestinationTransfer>;
  basegoerli_destinationTransfers: Array<basegoerli_DestinationTransfer>;
  basegoerli_originMessage?: Maybe<basegoerli_OriginMessage>;
  basegoerli_originMessages: Array<basegoerli_OriginMessage>;
  basegoerli_aggregateRoot?: Maybe<basegoerli_AggregateRoot>;
  basegoerli_aggregateRoots: Array<basegoerli_AggregateRoot>;
  basegoerli_connectorMeta?: Maybe<basegoerli_ConnectorMeta>;
  basegoerli_connectorMetas: Array<basegoerli_ConnectorMeta>;
  basegoerli_rootCount?: Maybe<basegoerli_RootCount>;
  basegoerli_rootCounts: Array<basegoerli_RootCount>;
  basegoerli_rootMessageSent?: Maybe<basegoerli_RootMessageSent>;
  basegoerli_rootMessageSents: Array<basegoerli_RootMessageSent>;
  basegoerli_relayerFeesIncrease?: Maybe<basegoerli_RelayerFeesIncrease>;
  basegoerli_relayerFeesIncreases: Array<basegoerli_RelayerFeesIncrease>;
  basegoerli_slippageUpdate?: Maybe<basegoerli_SlippageUpdate>;
  basegoerli_slippageUpdates: Array<basegoerli_SlippageUpdate>;
  basegoerli_snapshotRoot?: Maybe<basegoerli_SnapshotRoot>;
  basegoerli_snapshotRoots: Array<basegoerli_SnapshotRoot>;
  basegoerli_spokeConnectorMode?: Maybe<basegoerli_SpokeConnectorMode>;
  basegoerli_spokeConnectorModes: Array<basegoerli_SpokeConnectorMode>;
  basegoerli_aggregateRootProposed?: Maybe<basegoerli_AggregateRootProposed>;
  basegoerli_aggregateRootProposeds: Array<basegoerli_AggregateRootProposed>;
  basegoerli_optimisticRootFinalized?: Maybe<basegoerli_OptimisticRootFinalized>;
  basegoerli_optimisticRootFinalizeds: Array<basegoerli_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  basegoerli__meta?: Maybe<basegoerli__Meta_>;
};


export type Subscriptionbasegoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_Asset_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_AssetStatus_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_AssetBalance_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_Router_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_Router_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_RouterDailyTVL_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_RouterLiquidityEvent_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_Setting_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_Relayer_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_Sequencer_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_Sequencer_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_RelayerFee_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_OriginTransfer_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_DestinationTransfer_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_OriginMessage_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_AggregateRoot_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_ConnectorMeta_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_RootCount_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_RootCount_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_RootMessageSent_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_RelayerFeesIncrease_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_SlippageUpdate_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_SnapshotRoot_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_SpokeConnectorMode_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_AggregateRootProposed_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<basegoerli_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<basegoerli_OrderDirection>;
  where?: InputMaybe<basegoerli_OptimisticRootFinalized_filter>;
  block?: InputMaybe<basegoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbasegoerli__metaArgs = {
  block?: InputMaybe<basegoerli_Block_height>;
};

export type basegoerli_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type basegoerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['basegoerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type basegoerli__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: basegoerli__Block_;
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
  basegoerli_asset: InContextSdkMethod<Query['basegoerli_asset'], Querybasegoerli_assetArgs, MeshContext>,
  /** null **/
  basegoerli_assets: InContextSdkMethod<Query['basegoerli_assets'], Querybasegoerli_assetsArgs, MeshContext>,
  /** null **/
  basegoerli_assetStatus: InContextSdkMethod<Query['basegoerli_assetStatus'], Querybasegoerli_assetStatusArgs, MeshContext>,
  /** null **/
  basegoerli_assetStatuses: InContextSdkMethod<Query['basegoerli_assetStatuses'], Querybasegoerli_assetStatusesArgs, MeshContext>,
  /** null **/
  basegoerli_assetBalance: InContextSdkMethod<Query['basegoerli_assetBalance'], Querybasegoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  basegoerli_assetBalances: InContextSdkMethod<Query['basegoerli_assetBalances'], Querybasegoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  basegoerli_router: InContextSdkMethod<Query['basegoerli_router'], Querybasegoerli_routerArgs, MeshContext>,
  /** null **/
  basegoerli_routers: InContextSdkMethod<Query['basegoerli_routers'], Querybasegoerli_routersArgs, MeshContext>,
  /** null **/
  basegoerli_routerDailyTVL: InContextSdkMethod<Query['basegoerli_routerDailyTVL'], Querybasegoerli_routerDailyTVLArgs, MeshContext>,
  /** null **/
  basegoerli_routerDailyTVLs: InContextSdkMethod<Query['basegoerli_routerDailyTVLs'], Querybasegoerli_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  basegoerli_routerLiquidityEvent: InContextSdkMethod<Query['basegoerli_routerLiquidityEvent'], Querybasegoerli_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  basegoerli_routerLiquidityEvents: InContextSdkMethod<Query['basegoerli_routerLiquidityEvents'], Querybasegoerli_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  basegoerli_setting: InContextSdkMethod<Query['basegoerli_setting'], Querybasegoerli_settingArgs, MeshContext>,
  /** null **/
  basegoerli_settings: InContextSdkMethod<Query['basegoerli_settings'], Querybasegoerli_settingsArgs, MeshContext>,
  /** null **/
  basegoerli_relayer: InContextSdkMethod<Query['basegoerli_relayer'], Querybasegoerli_relayerArgs, MeshContext>,
  /** null **/
  basegoerli_relayers: InContextSdkMethod<Query['basegoerli_relayers'], Querybasegoerli_relayersArgs, MeshContext>,
  /** null **/
  basegoerli_sequencer: InContextSdkMethod<Query['basegoerli_sequencer'], Querybasegoerli_sequencerArgs, MeshContext>,
  /** null **/
  basegoerli_sequencers: InContextSdkMethod<Query['basegoerli_sequencers'], Querybasegoerli_sequencersArgs, MeshContext>,
  /** null **/
  basegoerli_relayerFee: InContextSdkMethod<Query['basegoerli_relayerFee'], Querybasegoerli_relayerFeeArgs, MeshContext>,
  /** null **/
  basegoerli_relayerFees: InContextSdkMethod<Query['basegoerli_relayerFees'], Querybasegoerli_relayerFeesArgs, MeshContext>,
  /** null **/
  basegoerli_originTransfer: InContextSdkMethod<Query['basegoerli_originTransfer'], Querybasegoerli_originTransferArgs, MeshContext>,
  /** null **/
  basegoerli_originTransfers: InContextSdkMethod<Query['basegoerli_originTransfers'], Querybasegoerli_originTransfersArgs, MeshContext>,
  /** null **/
  basegoerli_destinationTransfer: InContextSdkMethod<Query['basegoerli_destinationTransfer'], Querybasegoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  basegoerli_destinationTransfers: InContextSdkMethod<Query['basegoerli_destinationTransfers'], Querybasegoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  basegoerli_originMessage: InContextSdkMethod<Query['basegoerli_originMessage'], Querybasegoerli_originMessageArgs, MeshContext>,
  /** null **/
  basegoerli_originMessages: InContextSdkMethod<Query['basegoerli_originMessages'], Querybasegoerli_originMessagesArgs, MeshContext>,
  /** null **/
  basegoerli_aggregateRoot: InContextSdkMethod<Query['basegoerli_aggregateRoot'], Querybasegoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  basegoerli_aggregateRoots: InContextSdkMethod<Query['basegoerli_aggregateRoots'], Querybasegoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  basegoerli_connectorMeta: InContextSdkMethod<Query['basegoerli_connectorMeta'], Querybasegoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  basegoerli_connectorMetas: InContextSdkMethod<Query['basegoerli_connectorMetas'], Querybasegoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  basegoerli_rootCount: InContextSdkMethod<Query['basegoerli_rootCount'], Querybasegoerli_rootCountArgs, MeshContext>,
  /** null **/
  basegoerli_rootCounts: InContextSdkMethod<Query['basegoerli_rootCounts'], Querybasegoerli_rootCountsArgs, MeshContext>,
  /** null **/
  basegoerli_rootMessageSent: InContextSdkMethod<Query['basegoerli_rootMessageSent'], Querybasegoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  basegoerli_rootMessageSents: InContextSdkMethod<Query['basegoerli_rootMessageSents'], Querybasegoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  basegoerli_relayerFeesIncrease: InContextSdkMethod<Query['basegoerli_relayerFeesIncrease'], Querybasegoerli_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  basegoerli_relayerFeesIncreases: InContextSdkMethod<Query['basegoerli_relayerFeesIncreases'], Querybasegoerli_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  basegoerli_slippageUpdate: InContextSdkMethod<Query['basegoerli_slippageUpdate'], Querybasegoerli_slippageUpdateArgs, MeshContext>,
  /** null **/
  basegoerli_slippageUpdates: InContextSdkMethod<Query['basegoerli_slippageUpdates'], Querybasegoerli_slippageUpdatesArgs, MeshContext>,
  /** null **/
  basegoerli_snapshotRoot: InContextSdkMethod<Query['basegoerli_snapshotRoot'], Querybasegoerli_snapshotRootArgs, MeshContext>,
  /** null **/
  basegoerli_snapshotRoots: InContextSdkMethod<Query['basegoerli_snapshotRoots'], Querybasegoerli_snapshotRootsArgs, MeshContext>,
  /** null **/
  basegoerli_spokeConnectorMode: InContextSdkMethod<Query['basegoerli_spokeConnectorMode'], Querybasegoerli_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  basegoerli_spokeConnectorModes: InContextSdkMethod<Query['basegoerli_spokeConnectorModes'], Querybasegoerli_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  basegoerli_aggregateRootProposed: InContextSdkMethod<Query['basegoerli_aggregateRootProposed'], Querybasegoerli_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  basegoerli_aggregateRootProposeds: InContextSdkMethod<Query['basegoerli_aggregateRootProposeds'], Querybasegoerli_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  basegoerli_optimisticRootFinalized: InContextSdkMethod<Query['basegoerli_optimisticRootFinalized'], Querybasegoerli_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  basegoerli_optimisticRootFinalizeds: InContextSdkMethod<Query['basegoerli_optimisticRootFinalizeds'], Querybasegoerli_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  basegoerli__meta: InContextSdkMethod<Query['basegoerli__meta'], Querybasegoerli__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  basegoerli_asset: InContextSdkMethod<Subscription['basegoerli_asset'], Subscriptionbasegoerli_assetArgs, MeshContext>,
  /** null **/
  basegoerli_assets: InContextSdkMethod<Subscription['basegoerli_assets'], Subscriptionbasegoerli_assetsArgs, MeshContext>,
  /** null **/
  basegoerli_assetStatus: InContextSdkMethod<Subscription['basegoerli_assetStatus'], Subscriptionbasegoerli_assetStatusArgs, MeshContext>,
  /** null **/
  basegoerli_assetStatuses: InContextSdkMethod<Subscription['basegoerli_assetStatuses'], Subscriptionbasegoerli_assetStatusesArgs, MeshContext>,
  /** null **/
  basegoerli_assetBalance: InContextSdkMethod<Subscription['basegoerli_assetBalance'], Subscriptionbasegoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  basegoerli_assetBalances: InContextSdkMethod<Subscription['basegoerli_assetBalances'], Subscriptionbasegoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  basegoerli_router: InContextSdkMethod<Subscription['basegoerli_router'], Subscriptionbasegoerli_routerArgs, MeshContext>,
  /** null **/
  basegoerli_routers: InContextSdkMethod<Subscription['basegoerli_routers'], Subscriptionbasegoerli_routersArgs, MeshContext>,
  /** null **/
  basegoerli_routerDailyTVL: InContextSdkMethod<Subscription['basegoerli_routerDailyTVL'], Subscriptionbasegoerli_routerDailyTVLArgs, MeshContext>,
  /** null **/
  basegoerli_routerDailyTVLs: InContextSdkMethod<Subscription['basegoerli_routerDailyTVLs'], Subscriptionbasegoerli_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  basegoerli_routerLiquidityEvent: InContextSdkMethod<Subscription['basegoerli_routerLiquidityEvent'], Subscriptionbasegoerli_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  basegoerli_routerLiquidityEvents: InContextSdkMethod<Subscription['basegoerli_routerLiquidityEvents'], Subscriptionbasegoerli_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  basegoerli_setting: InContextSdkMethod<Subscription['basegoerli_setting'], Subscriptionbasegoerli_settingArgs, MeshContext>,
  /** null **/
  basegoerli_settings: InContextSdkMethod<Subscription['basegoerli_settings'], Subscriptionbasegoerli_settingsArgs, MeshContext>,
  /** null **/
  basegoerli_relayer: InContextSdkMethod<Subscription['basegoerli_relayer'], Subscriptionbasegoerli_relayerArgs, MeshContext>,
  /** null **/
  basegoerli_relayers: InContextSdkMethod<Subscription['basegoerli_relayers'], Subscriptionbasegoerli_relayersArgs, MeshContext>,
  /** null **/
  basegoerli_sequencer: InContextSdkMethod<Subscription['basegoerli_sequencer'], Subscriptionbasegoerli_sequencerArgs, MeshContext>,
  /** null **/
  basegoerli_sequencers: InContextSdkMethod<Subscription['basegoerli_sequencers'], Subscriptionbasegoerli_sequencersArgs, MeshContext>,
  /** null **/
  basegoerli_relayerFee: InContextSdkMethod<Subscription['basegoerli_relayerFee'], Subscriptionbasegoerli_relayerFeeArgs, MeshContext>,
  /** null **/
  basegoerli_relayerFees: InContextSdkMethod<Subscription['basegoerli_relayerFees'], Subscriptionbasegoerli_relayerFeesArgs, MeshContext>,
  /** null **/
  basegoerli_originTransfer: InContextSdkMethod<Subscription['basegoerli_originTransfer'], Subscriptionbasegoerli_originTransferArgs, MeshContext>,
  /** null **/
  basegoerli_originTransfers: InContextSdkMethod<Subscription['basegoerli_originTransfers'], Subscriptionbasegoerli_originTransfersArgs, MeshContext>,
  /** null **/
  basegoerli_destinationTransfer: InContextSdkMethod<Subscription['basegoerli_destinationTransfer'], Subscriptionbasegoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  basegoerli_destinationTransfers: InContextSdkMethod<Subscription['basegoerli_destinationTransfers'], Subscriptionbasegoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  basegoerli_originMessage: InContextSdkMethod<Subscription['basegoerli_originMessage'], Subscriptionbasegoerli_originMessageArgs, MeshContext>,
  /** null **/
  basegoerli_originMessages: InContextSdkMethod<Subscription['basegoerli_originMessages'], Subscriptionbasegoerli_originMessagesArgs, MeshContext>,
  /** null **/
  basegoerli_aggregateRoot: InContextSdkMethod<Subscription['basegoerli_aggregateRoot'], Subscriptionbasegoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  basegoerli_aggregateRoots: InContextSdkMethod<Subscription['basegoerli_aggregateRoots'], Subscriptionbasegoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  basegoerli_connectorMeta: InContextSdkMethod<Subscription['basegoerli_connectorMeta'], Subscriptionbasegoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  basegoerli_connectorMetas: InContextSdkMethod<Subscription['basegoerli_connectorMetas'], Subscriptionbasegoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  basegoerli_rootCount: InContextSdkMethod<Subscription['basegoerli_rootCount'], Subscriptionbasegoerli_rootCountArgs, MeshContext>,
  /** null **/
  basegoerli_rootCounts: InContextSdkMethod<Subscription['basegoerli_rootCounts'], Subscriptionbasegoerli_rootCountsArgs, MeshContext>,
  /** null **/
  basegoerli_rootMessageSent: InContextSdkMethod<Subscription['basegoerli_rootMessageSent'], Subscriptionbasegoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  basegoerli_rootMessageSents: InContextSdkMethod<Subscription['basegoerli_rootMessageSents'], Subscriptionbasegoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  basegoerli_relayerFeesIncrease: InContextSdkMethod<Subscription['basegoerli_relayerFeesIncrease'], Subscriptionbasegoerli_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  basegoerli_relayerFeesIncreases: InContextSdkMethod<Subscription['basegoerli_relayerFeesIncreases'], Subscriptionbasegoerli_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  basegoerli_slippageUpdate: InContextSdkMethod<Subscription['basegoerli_slippageUpdate'], Subscriptionbasegoerli_slippageUpdateArgs, MeshContext>,
  /** null **/
  basegoerli_slippageUpdates: InContextSdkMethod<Subscription['basegoerli_slippageUpdates'], Subscriptionbasegoerli_slippageUpdatesArgs, MeshContext>,
  /** null **/
  basegoerli_snapshotRoot: InContextSdkMethod<Subscription['basegoerli_snapshotRoot'], Subscriptionbasegoerli_snapshotRootArgs, MeshContext>,
  /** null **/
  basegoerli_snapshotRoots: InContextSdkMethod<Subscription['basegoerli_snapshotRoots'], Subscriptionbasegoerli_snapshotRootsArgs, MeshContext>,
  /** null **/
  basegoerli_spokeConnectorMode: InContextSdkMethod<Subscription['basegoerli_spokeConnectorMode'], Subscriptionbasegoerli_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  basegoerli_spokeConnectorModes: InContextSdkMethod<Subscription['basegoerli_spokeConnectorModes'], Subscriptionbasegoerli_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  basegoerli_aggregateRootProposed: InContextSdkMethod<Subscription['basegoerli_aggregateRootProposed'], Subscriptionbasegoerli_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  basegoerli_aggregateRootProposeds: InContextSdkMethod<Subscription['basegoerli_aggregateRootProposeds'], Subscriptionbasegoerli_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  basegoerli_optimisticRootFinalized: InContextSdkMethod<Subscription['basegoerli_optimisticRootFinalized'], Subscriptionbasegoerli_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  basegoerli_optimisticRootFinalizeds: InContextSdkMethod<Subscription['basegoerli_optimisticRootFinalizeds'], Subscriptionbasegoerli_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  basegoerli__meta: InContextSdkMethod<Subscription['basegoerli__meta'], Subscriptionbasegoerli__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_BaseGoerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
