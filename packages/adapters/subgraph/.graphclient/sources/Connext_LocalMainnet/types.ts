// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextLocalMainnetTypes {
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
  localmainnet_BigDecimal: any;
  BigInt: any;
  localmainnet_Bytes: any;
  localmainnet_Int8: any;
};

export type localmainnet_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['localmainnet_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type localmainnet_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['localmainnet_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type localmainnet_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_AggregateRootProposed_filter>>>;
};

export type localmainnet_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type localmainnet_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_AggregateRoot_filter>>>;
};

export type localmainnet_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type localmainnet_Aggregation_interval =
  | 'hour'
  | 'day';

export type localmainnet_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['localmainnet_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['localmainnet_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['localmainnet_Bytes']>;
  localAsset?: Maybe<Scalars['localmainnet_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<localmainnet_AssetStatus>;
};

export type localmainnet_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: localmainnet_Router;
  asset: localmainnet_Asset;
  feesEarned: Scalars['BigInt'];
};

export type localmainnet_AssetBalance_filter = {
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
  router_?: InputMaybe<localmainnet_Router_filter>;
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
  asset_?: InputMaybe<localmainnet_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_AssetBalance_filter>>>;
};

export type localmainnet_AssetBalance_orderBy =
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

export type localmainnet_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type localmainnet_AssetStatus_filter = {
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
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_AssetStatus_filter>>>;
};

export type localmainnet_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type localmainnet_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['localmainnet_Bytes']>;
  key_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  key_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  key_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  key_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  key_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  key_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['localmainnet_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['localmainnet_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  localAsset?: InputMaybe<Scalars['localmainnet_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  status_?: InputMaybe<localmainnet_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_Asset_filter>>>;
};

export type localmainnet_Asset_orderBy =
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

export type localmainnet_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type localmainnet_Block_height = {
  hash?: InputMaybe<Scalars['localmainnet_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type localmainnet_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['localmainnet_Bytes']>;
  rootManager?: Maybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector?: Maybe<Scalars['localmainnet_Bytes']>;
};

export type localmainnet_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_ConnectorMeta_filter>>>;
};

export type localmainnet_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type localmainnet_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['localmainnet_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<localmainnet_TransferStatus>;
  routers?: Maybe<Array<localmainnet_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['localmainnet_Bytes']>;
  delegate?: Maybe<Scalars['localmainnet_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['localmainnet_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['localmainnet_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['localmainnet_Bytes']>;
  asset?: Maybe<localmainnet_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['localmainnet_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['localmainnet_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['localmainnet_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['localmainnet_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['localmainnet_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['localmainnet_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type localmainnet_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_Router_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_Router_filter>;
};

export type localmainnet_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transferId_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<localmainnet_TransferStatus>;
  status_not?: InputMaybe<localmainnet_TransferStatus>;
  status_in?: InputMaybe<Array<localmainnet_TransferStatus>>;
  status_not_in?: InputMaybe<Array<localmainnet_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<localmainnet_Router_filter>;
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
  to?: InputMaybe<Scalars['localmainnet_Bytes']>;
  to_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  to_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  to_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  to_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  to_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  to_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  delegate?: InputMaybe<Scalars['localmainnet_Bytes']>;
  delegate_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['localmainnet_Bytes']>;
  callData_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  callData_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  callData_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  callData_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  callData_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  originSender?: InputMaybe<Scalars['localmainnet_Bytes']>;
  originSender_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['localmainnet_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  asset_?: InputMaybe<localmainnet_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['localmainnet_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['localmainnet_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['localmainnet_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['localmainnet_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['localmainnet_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['localmainnet_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_DestinationTransfer_filter>>>;
};

export type localmainnet_DestinationTransfer_orderBy =
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

export type localmainnet_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['localmainnet_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type localmainnet_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_OptimisticRootFinalized_filter>>>;
};

export type localmainnet_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type localmainnet_OrderDirection =
  | 'asc'
  | 'desc';

export type localmainnet_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['localmainnet_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['localmainnet_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['localmainnet_Bytes']>;
  root?: Maybe<Scalars['localmainnet_Bytes']>;
  transactionHash?: Maybe<Scalars['localmainnet_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<localmainnet_RootCount>;
};

export type localmainnet_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transferId_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['localmainnet_Bytes']>;
  leaf_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['localmainnet_Bytes']>;
  message_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  message_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  message_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  message_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  message_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  message_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  rootCount_?: InputMaybe<localmainnet_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_OriginMessage_filter>>>;
};

export type localmainnet_OriginMessage_orderBy =
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

export type localmainnet_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['localmainnet_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<localmainnet_TransferStatus>;
  messageHash?: Maybe<Scalars['localmainnet_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['localmainnet_Bytes']>;
  delegate?: Maybe<Scalars['localmainnet_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['localmainnet_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['localmainnet_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['localmainnet_Bytes']>;
  asset?: Maybe<localmainnet_Asset>;
  transactingAsset?: Maybe<Scalars['localmainnet_Bytes']>;
  message?: Maybe<localmainnet_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<localmainnet_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['localmainnet_Bytes']>;
  caller?: Maybe<Scalars['localmainnet_Bytes']>;
  transactionHash?: Maybe<Scalars['localmainnet_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['localmainnet_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type localmainnet_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_RelayerFee_filter>;
};

export type localmainnet_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transferId_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<localmainnet_TransferStatus>;
  status_not?: InputMaybe<localmainnet_TransferStatus>;
  status_in?: InputMaybe<Array<localmainnet_TransferStatus>>;
  status_not_in?: InputMaybe<Array<localmainnet_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['localmainnet_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  to?: InputMaybe<Scalars['localmainnet_Bytes']>;
  to_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  to_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  to_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  to_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  to_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  to_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  delegate?: InputMaybe<Scalars['localmainnet_Bytes']>;
  delegate_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['localmainnet_Bytes']>;
  callData_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  callData_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  callData_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  callData_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  callData_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['localmainnet_Bytes']>;
  originSender_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['localmainnet_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  asset_?: InputMaybe<localmainnet_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  message_?: InputMaybe<localmainnet_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<localmainnet_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['localmainnet_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['localmainnet_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_OriginTransfer_filter>>>;
};

export type localmainnet_OriginTransfer_orderBy =
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
  localmainnet_asset?: Maybe<localmainnet_Asset>;
  localmainnet_assets: Array<localmainnet_Asset>;
  localmainnet_assetStatus?: Maybe<localmainnet_AssetStatus>;
  localmainnet_assetStatuses: Array<localmainnet_AssetStatus>;
  localmainnet_assetBalance?: Maybe<localmainnet_AssetBalance>;
  localmainnet_assetBalances: Array<localmainnet_AssetBalance>;
  localmainnet_router?: Maybe<localmainnet_Router>;
  localmainnet_routers: Array<localmainnet_Router>;
  localmainnet_routerDailyTVL?: Maybe<localmainnet_RouterDailyTVL>;
  localmainnet_routerDailyTVLs: Array<localmainnet_RouterDailyTVL>;
  localmainnet_routerLiquidityEvent?: Maybe<localmainnet_RouterLiquidityEvent>;
  localmainnet_routerLiquidityEvents: Array<localmainnet_RouterLiquidityEvent>;
  localmainnet_setting?: Maybe<localmainnet_Setting>;
  localmainnet_settings: Array<localmainnet_Setting>;
  localmainnet_relayer?: Maybe<localmainnet_Relayer>;
  localmainnet_relayers: Array<localmainnet_Relayer>;
  localmainnet_sequencer?: Maybe<localmainnet_Sequencer>;
  localmainnet_sequencers: Array<localmainnet_Sequencer>;
  localmainnet_relayerFee?: Maybe<localmainnet_RelayerFee>;
  localmainnet_relayerFees: Array<localmainnet_RelayerFee>;
  localmainnet_originTransfer?: Maybe<localmainnet_OriginTransfer>;
  localmainnet_originTransfers: Array<localmainnet_OriginTransfer>;
  localmainnet_destinationTransfer?: Maybe<localmainnet_DestinationTransfer>;
  localmainnet_destinationTransfers: Array<localmainnet_DestinationTransfer>;
  localmainnet_originMessage?: Maybe<localmainnet_OriginMessage>;
  localmainnet_originMessages: Array<localmainnet_OriginMessage>;
  localmainnet_aggregateRoot?: Maybe<localmainnet_AggregateRoot>;
  localmainnet_aggregateRoots: Array<localmainnet_AggregateRoot>;
  localmainnet_connectorMeta?: Maybe<localmainnet_ConnectorMeta>;
  localmainnet_connectorMetas: Array<localmainnet_ConnectorMeta>;
  localmainnet_rootCount?: Maybe<localmainnet_RootCount>;
  localmainnet_rootCounts: Array<localmainnet_RootCount>;
  localmainnet_rootMessageSent?: Maybe<localmainnet_RootMessageSent>;
  localmainnet_rootMessageSents: Array<localmainnet_RootMessageSent>;
  localmainnet_relayerFeesIncrease?: Maybe<localmainnet_RelayerFeesIncrease>;
  localmainnet_relayerFeesIncreases: Array<localmainnet_RelayerFeesIncrease>;
  localmainnet_slippageUpdate?: Maybe<localmainnet_SlippageUpdate>;
  localmainnet_slippageUpdates: Array<localmainnet_SlippageUpdate>;
  localmainnet_snapshotRoot?: Maybe<localmainnet_SnapshotRoot>;
  localmainnet_snapshotRoots: Array<localmainnet_SnapshotRoot>;
  localmainnet_spokeConnectorMode?: Maybe<localmainnet_SpokeConnectorMode>;
  localmainnet_spokeConnectorModes: Array<localmainnet_SpokeConnectorMode>;
  localmainnet_aggregateRootProposed?: Maybe<localmainnet_AggregateRootProposed>;
  localmainnet_aggregateRootProposeds: Array<localmainnet_AggregateRootProposed>;
  localmainnet_optimisticRootFinalized?: Maybe<localmainnet_OptimisticRootFinalized>;
  localmainnet_optimisticRootFinalizeds: Array<localmainnet_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  localmainnet__meta?: Maybe<localmainnet__Meta_>;
};


export type Querylocalmainnet_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_Asset_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_Asset_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_AssetStatus_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_AssetBalance_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_Router_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_Router_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_RouterDailyTVL_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_RouterLiquidityEvent_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_Setting_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_Setting_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_Relayer_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_Relayer_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_Sequencer_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_Sequencer_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_RelayerFee_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_OriginTransfer_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_DestinationTransfer_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_OriginMessage_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_AggregateRoot_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_ConnectorMeta_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_RootCount_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_RootCount_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_RootMessageSent_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_RelayerFeesIncrease_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_SlippageUpdate_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_SnapshotRoot_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_SpokeConnectorMode_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_AggregateRootProposed_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_OptimisticRootFinalized_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet__metaArgs = {
  block?: InputMaybe<localmainnet_Block_height>;
};

export type localmainnet_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['localmainnet_Bytes']>;
};

export type localmainnet_RelayerFee = {
  id: Scalars['ID'];
  transfer: localmainnet_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['localmainnet_Bytes'];
};

export type localmainnet_RelayerFee_filter = {
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
  transfer_?: InputMaybe<localmainnet_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['localmainnet_Bytes']>;
  asset_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  asset_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  asset_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  asset_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  asset_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_RelayerFee_filter>>>;
};

export type localmainnet_RelayerFee_orderBy =
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

export type localmainnet_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: localmainnet_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['localmainnet_Bytes']>;
  caller: Scalars['localmainnet_Bytes'];
  transactionHash: Scalars['localmainnet_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type localmainnet_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<localmainnet_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['localmainnet_Bytes']>;
  asset_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  asset_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  asset_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  asset_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  asset_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_RelayerFeesIncrease_filter>>>;
};

export type localmainnet_RelayerFeesIncrease_orderBy =
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

export type localmainnet_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['localmainnet_Bytes']>;
  relayer_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_Relayer_filter>>>;
};

export type localmainnet_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type localmainnet_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type localmainnet_RootCount_filter = {
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
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_RootCount_filter>>>;
};

export type localmainnet_RootCount_orderBy =
  | 'id'
  | 'count';

export type localmainnet_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['localmainnet_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['localmainnet_Bytes']>;
  transactionHash?: Maybe<Scalars['localmainnet_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type localmainnet_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_RootMessageSent_filter>>>;
};

export type localmainnet_RootMessageSent_orderBy =
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

export type localmainnet_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['localmainnet_Bytes']>;
  recipient?: Maybe<Scalars['localmainnet_Bytes']>;
  proposedOwner?: Maybe<Scalars['localmainnet_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<localmainnet_AssetBalance>;
};


export type localmainnet_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_AssetBalance_filter>;
};

export type localmainnet_RouterDailyTVL = {
  id: Scalars['ID'];
  router: localmainnet_Router;
  asset: localmainnet_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type localmainnet_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<localmainnet_Router_filter>;
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
  asset_?: InputMaybe<localmainnet_Asset_filter>;
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
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_RouterDailyTVL_filter>>>;
};

export type localmainnet_RouterDailyTVL_orderBy =
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

export type localmainnet_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<localmainnet_RouterLiquidityEventType>;
  router: localmainnet_Router;
  asset: localmainnet_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['localmainnet_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['localmainnet_Bytes'];
  nonce: Scalars['BigInt'];
};

export type localmainnet_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type localmainnet_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<localmainnet_RouterLiquidityEventType>;
  type_not?: InputMaybe<localmainnet_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<localmainnet_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<localmainnet_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<localmainnet_Router_filter>;
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
  asset_?: InputMaybe<localmainnet_Asset_filter>;
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
  caller?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_RouterLiquidityEvent_filter>>>;
};

export type localmainnet_RouterLiquidityEvent_orderBy =
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

export type localmainnet_Router_filter = {
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
  owner?: InputMaybe<Scalars['localmainnet_Bytes']>;
  owner_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  owner_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  owner_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  owner_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  owner_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  recipient?: InputMaybe<Scalars['localmainnet_Bytes']>;
  recipient_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['localmainnet_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<localmainnet_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_Router_filter>>>;
};

export type localmainnet_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type localmainnet_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['localmainnet_Bytes']>;
};

export type localmainnet_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['localmainnet_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_Sequencer_filter>>>;
};

export type localmainnet_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type localmainnet_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['localmainnet_Bytes'];
};

export type localmainnet_Setting_filter = {
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
  caller?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_Setting_filter>>>;
};

export type localmainnet_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type localmainnet_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: localmainnet_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['localmainnet_Bytes'];
  transactionHash: Scalars['localmainnet_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type localmainnet_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<localmainnet_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_SlippageUpdate_filter>>>;
};

export type localmainnet_SlippageUpdate_orderBy =
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

export type localmainnet_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['localmainnet_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type localmainnet_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_SnapshotRoot_filter>>>;
};

export type localmainnet_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type localmainnet_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type localmainnet_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_SpokeConnectorMode_filter>>>;
};

export type localmainnet_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  localmainnet_asset?: Maybe<localmainnet_Asset>;
  localmainnet_assets: Array<localmainnet_Asset>;
  localmainnet_assetStatus?: Maybe<localmainnet_AssetStatus>;
  localmainnet_assetStatuses: Array<localmainnet_AssetStatus>;
  localmainnet_assetBalance?: Maybe<localmainnet_AssetBalance>;
  localmainnet_assetBalances: Array<localmainnet_AssetBalance>;
  localmainnet_router?: Maybe<localmainnet_Router>;
  localmainnet_routers: Array<localmainnet_Router>;
  localmainnet_routerDailyTVL?: Maybe<localmainnet_RouterDailyTVL>;
  localmainnet_routerDailyTVLs: Array<localmainnet_RouterDailyTVL>;
  localmainnet_routerLiquidityEvent?: Maybe<localmainnet_RouterLiquidityEvent>;
  localmainnet_routerLiquidityEvents: Array<localmainnet_RouterLiquidityEvent>;
  localmainnet_setting?: Maybe<localmainnet_Setting>;
  localmainnet_settings: Array<localmainnet_Setting>;
  localmainnet_relayer?: Maybe<localmainnet_Relayer>;
  localmainnet_relayers: Array<localmainnet_Relayer>;
  localmainnet_sequencer?: Maybe<localmainnet_Sequencer>;
  localmainnet_sequencers: Array<localmainnet_Sequencer>;
  localmainnet_relayerFee?: Maybe<localmainnet_RelayerFee>;
  localmainnet_relayerFees: Array<localmainnet_RelayerFee>;
  localmainnet_originTransfer?: Maybe<localmainnet_OriginTransfer>;
  localmainnet_originTransfers: Array<localmainnet_OriginTransfer>;
  localmainnet_destinationTransfer?: Maybe<localmainnet_DestinationTransfer>;
  localmainnet_destinationTransfers: Array<localmainnet_DestinationTransfer>;
  localmainnet_originMessage?: Maybe<localmainnet_OriginMessage>;
  localmainnet_originMessages: Array<localmainnet_OriginMessage>;
  localmainnet_aggregateRoot?: Maybe<localmainnet_AggregateRoot>;
  localmainnet_aggregateRoots: Array<localmainnet_AggregateRoot>;
  localmainnet_connectorMeta?: Maybe<localmainnet_ConnectorMeta>;
  localmainnet_connectorMetas: Array<localmainnet_ConnectorMeta>;
  localmainnet_rootCount?: Maybe<localmainnet_RootCount>;
  localmainnet_rootCounts: Array<localmainnet_RootCount>;
  localmainnet_rootMessageSent?: Maybe<localmainnet_RootMessageSent>;
  localmainnet_rootMessageSents: Array<localmainnet_RootMessageSent>;
  localmainnet_relayerFeesIncrease?: Maybe<localmainnet_RelayerFeesIncrease>;
  localmainnet_relayerFeesIncreases: Array<localmainnet_RelayerFeesIncrease>;
  localmainnet_slippageUpdate?: Maybe<localmainnet_SlippageUpdate>;
  localmainnet_slippageUpdates: Array<localmainnet_SlippageUpdate>;
  localmainnet_snapshotRoot?: Maybe<localmainnet_SnapshotRoot>;
  localmainnet_snapshotRoots: Array<localmainnet_SnapshotRoot>;
  localmainnet_spokeConnectorMode?: Maybe<localmainnet_SpokeConnectorMode>;
  localmainnet_spokeConnectorModes: Array<localmainnet_SpokeConnectorMode>;
  localmainnet_aggregateRootProposed?: Maybe<localmainnet_AggregateRootProposed>;
  localmainnet_aggregateRootProposeds: Array<localmainnet_AggregateRootProposed>;
  localmainnet_optimisticRootFinalized?: Maybe<localmainnet_OptimisticRootFinalized>;
  localmainnet_optimisticRootFinalizeds: Array<localmainnet_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  localmainnet__meta?: Maybe<localmainnet__Meta_>;
};


export type Subscriptionlocalmainnet_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_Asset_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_Asset_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_AssetStatus_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_AssetBalance_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_Router_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_Router_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_RouterDailyTVL_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_RouterLiquidityEvent_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_Setting_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_Setting_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_Relayer_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_Relayer_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_Sequencer_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_Sequencer_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_RelayerFee_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_OriginTransfer_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_DestinationTransfer_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_OriginMessage_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_AggregateRoot_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_ConnectorMeta_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_RootCount_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_RootCount_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_RootMessageSent_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_RelayerFeesIncrease_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_SlippageUpdate_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_SnapshotRoot_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_SpokeConnectorMode_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_AggregateRootProposed_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_OptimisticRootFinalized_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet__metaArgs = {
  block?: InputMaybe<localmainnet_Block_height>;
};

export type localmainnet_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type localmainnet__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['localmainnet_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type localmainnet__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: localmainnet__Block_;
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
  localmainnet_asset: InContextSdkMethod<Query['localmainnet_asset'], Querylocalmainnet_assetArgs, MeshContext>,
  /** null **/
  localmainnet_assets: InContextSdkMethod<Query['localmainnet_assets'], Querylocalmainnet_assetsArgs, MeshContext>,
  /** null **/
  localmainnet_assetStatus: InContextSdkMethod<Query['localmainnet_assetStatus'], Querylocalmainnet_assetStatusArgs, MeshContext>,
  /** null **/
  localmainnet_assetStatuses: InContextSdkMethod<Query['localmainnet_assetStatuses'], Querylocalmainnet_assetStatusesArgs, MeshContext>,
  /** null **/
  localmainnet_assetBalance: InContextSdkMethod<Query['localmainnet_assetBalance'], Querylocalmainnet_assetBalanceArgs, MeshContext>,
  /** null **/
  localmainnet_assetBalances: InContextSdkMethod<Query['localmainnet_assetBalances'], Querylocalmainnet_assetBalancesArgs, MeshContext>,
  /** null **/
  localmainnet_router: InContextSdkMethod<Query['localmainnet_router'], Querylocalmainnet_routerArgs, MeshContext>,
  /** null **/
  localmainnet_routers: InContextSdkMethod<Query['localmainnet_routers'], Querylocalmainnet_routersArgs, MeshContext>,
  /** null **/
  localmainnet_routerDailyTVL: InContextSdkMethod<Query['localmainnet_routerDailyTVL'], Querylocalmainnet_routerDailyTVLArgs, MeshContext>,
  /** null **/
  localmainnet_routerDailyTVLs: InContextSdkMethod<Query['localmainnet_routerDailyTVLs'], Querylocalmainnet_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  localmainnet_routerLiquidityEvent: InContextSdkMethod<Query['localmainnet_routerLiquidityEvent'], Querylocalmainnet_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  localmainnet_routerLiquidityEvents: InContextSdkMethod<Query['localmainnet_routerLiquidityEvents'], Querylocalmainnet_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  localmainnet_setting: InContextSdkMethod<Query['localmainnet_setting'], Querylocalmainnet_settingArgs, MeshContext>,
  /** null **/
  localmainnet_settings: InContextSdkMethod<Query['localmainnet_settings'], Querylocalmainnet_settingsArgs, MeshContext>,
  /** null **/
  localmainnet_relayer: InContextSdkMethod<Query['localmainnet_relayer'], Querylocalmainnet_relayerArgs, MeshContext>,
  /** null **/
  localmainnet_relayers: InContextSdkMethod<Query['localmainnet_relayers'], Querylocalmainnet_relayersArgs, MeshContext>,
  /** null **/
  localmainnet_sequencer: InContextSdkMethod<Query['localmainnet_sequencer'], Querylocalmainnet_sequencerArgs, MeshContext>,
  /** null **/
  localmainnet_sequencers: InContextSdkMethod<Query['localmainnet_sequencers'], Querylocalmainnet_sequencersArgs, MeshContext>,
  /** null **/
  localmainnet_relayerFee: InContextSdkMethod<Query['localmainnet_relayerFee'], Querylocalmainnet_relayerFeeArgs, MeshContext>,
  /** null **/
  localmainnet_relayerFees: InContextSdkMethod<Query['localmainnet_relayerFees'], Querylocalmainnet_relayerFeesArgs, MeshContext>,
  /** null **/
  localmainnet_originTransfer: InContextSdkMethod<Query['localmainnet_originTransfer'], Querylocalmainnet_originTransferArgs, MeshContext>,
  /** null **/
  localmainnet_originTransfers: InContextSdkMethod<Query['localmainnet_originTransfers'], Querylocalmainnet_originTransfersArgs, MeshContext>,
  /** null **/
  localmainnet_destinationTransfer: InContextSdkMethod<Query['localmainnet_destinationTransfer'], Querylocalmainnet_destinationTransferArgs, MeshContext>,
  /** null **/
  localmainnet_destinationTransfers: InContextSdkMethod<Query['localmainnet_destinationTransfers'], Querylocalmainnet_destinationTransfersArgs, MeshContext>,
  /** null **/
  localmainnet_originMessage: InContextSdkMethod<Query['localmainnet_originMessage'], Querylocalmainnet_originMessageArgs, MeshContext>,
  /** null **/
  localmainnet_originMessages: InContextSdkMethod<Query['localmainnet_originMessages'], Querylocalmainnet_originMessagesArgs, MeshContext>,
  /** null **/
  localmainnet_aggregateRoot: InContextSdkMethod<Query['localmainnet_aggregateRoot'], Querylocalmainnet_aggregateRootArgs, MeshContext>,
  /** null **/
  localmainnet_aggregateRoots: InContextSdkMethod<Query['localmainnet_aggregateRoots'], Querylocalmainnet_aggregateRootsArgs, MeshContext>,
  /** null **/
  localmainnet_connectorMeta: InContextSdkMethod<Query['localmainnet_connectorMeta'], Querylocalmainnet_connectorMetaArgs, MeshContext>,
  /** null **/
  localmainnet_connectorMetas: InContextSdkMethod<Query['localmainnet_connectorMetas'], Querylocalmainnet_connectorMetasArgs, MeshContext>,
  /** null **/
  localmainnet_rootCount: InContextSdkMethod<Query['localmainnet_rootCount'], Querylocalmainnet_rootCountArgs, MeshContext>,
  /** null **/
  localmainnet_rootCounts: InContextSdkMethod<Query['localmainnet_rootCounts'], Querylocalmainnet_rootCountsArgs, MeshContext>,
  /** null **/
  localmainnet_rootMessageSent: InContextSdkMethod<Query['localmainnet_rootMessageSent'], Querylocalmainnet_rootMessageSentArgs, MeshContext>,
  /** null **/
  localmainnet_rootMessageSents: InContextSdkMethod<Query['localmainnet_rootMessageSents'], Querylocalmainnet_rootMessageSentsArgs, MeshContext>,
  /** null **/
  localmainnet_relayerFeesIncrease: InContextSdkMethod<Query['localmainnet_relayerFeesIncrease'], Querylocalmainnet_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  localmainnet_relayerFeesIncreases: InContextSdkMethod<Query['localmainnet_relayerFeesIncreases'], Querylocalmainnet_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  localmainnet_slippageUpdate: InContextSdkMethod<Query['localmainnet_slippageUpdate'], Querylocalmainnet_slippageUpdateArgs, MeshContext>,
  /** null **/
  localmainnet_slippageUpdates: InContextSdkMethod<Query['localmainnet_slippageUpdates'], Querylocalmainnet_slippageUpdatesArgs, MeshContext>,
  /** null **/
  localmainnet_snapshotRoot: InContextSdkMethod<Query['localmainnet_snapshotRoot'], Querylocalmainnet_snapshotRootArgs, MeshContext>,
  /** null **/
  localmainnet_snapshotRoots: InContextSdkMethod<Query['localmainnet_snapshotRoots'], Querylocalmainnet_snapshotRootsArgs, MeshContext>,
  /** null **/
  localmainnet_spokeConnectorMode: InContextSdkMethod<Query['localmainnet_spokeConnectorMode'], Querylocalmainnet_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  localmainnet_spokeConnectorModes: InContextSdkMethod<Query['localmainnet_spokeConnectorModes'], Querylocalmainnet_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  localmainnet_aggregateRootProposed: InContextSdkMethod<Query['localmainnet_aggregateRootProposed'], Querylocalmainnet_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  localmainnet_aggregateRootProposeds: InContextSdkMethod<Query['localmainnet_aggregateRootProposeds'], Querylocalmainnet_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  localmainnet_optimisticRootFinalized: InContextSdkMethod<Query['localmainnet_optimisticRootFinalized'], Querylocalmainnet_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  localmainnet_optimisticRootFinalizeds: InContextSdkMethod<Query['localmainnet_optimisticRootFinalizeds'], Querylocalmainnet_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  localmainnet__meta: InContextSdkMethod<Query['localmainnet__meta'], Querylocalmainnet__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  localmainnet_asset: InContextSdkMethod<Subscription['localmainnet_asset'], Subscriptionlocalmainnet_assetArgs, MeshContext>,
  /** null **/
  localmainnet_assets: InContextSdkMethod<Subscription['localmainnet_assets'], Subscriptionlocalmainnet_assetsArgs, MeshContext>,
  /** null **/
  localmainnet_assetStatus: InContextSdkMethod<Subscription['localmainnet_assetStatus'], Subscriptionlocalmainnet_assetStatusArgs, MeshContext>,
  /** null **/
  localmainnet_assetStatuses: InContextSdkMethod<Subscription['localmainnet_assetStatuses'], Subscriptionlocalmainnet_assetStatusesArgs, MeshContext>,
  /** null **/
  localmainnet_assetBalance: InContextSdkMethod<Subscription['localmainnet_assetBalance'], Subscriptionlocalmainnet_assetBalanceArgs, MeshContext>,
  /** null **/
  localmainnet_assetBalances: InContextSdkMethod<Subscription['localmainnet_assetBalances'], Subscriptionlocalmainnet_assetBalancesArgs, MeshContext>,
  /** null **/
  localmainnet_router: InContextSdkMethod<Subscription['localmainnet_router'], Subscriptionlocalmainnet_routerArgs, MeshContext>,
  /** null **/
  localmainnet_routers: InContextSdkMethod<Subscription['localmainnet_routers'], Subscriptionlocalmainnet_routersArgs, MeshContext>,
  /** null **/
  localmainnet_routerDailyTVL: InContextSdkMethod<Subscription['localmainnet_routerDailyTVL'], Subscriptionlocalmainnet_routerDailyTVLArgs, MeshContext>,
  /** null **/
  localmainnet_routerDailyTVLs: InContextSdkMethod<Subscription['localmainnet_routerDailyTVLs'], Subscriptionlocalmainnet_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  localmainnet_routerLiquidityEvent: InContextSdkMethod<Subscription['localmainnet_routerLiquidityEvent'], Subscriptionlocalmainnet_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  localmainnet_routerLiquidityEvents: InContextSdkMethod<Subscription['localmainnet_routerLiquidityEvents'], Subscriptionlocalmainnet_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  localmainnet_setting: InContextSdkMethod<Subscription['localmainnet_setting'], Subscriptionlocalmainnet_settingArgs, MeshContext>,
  /** null **/
  localmainnet_settings: InContextSdkMethod<Subscription['localmainnet_settings'], Subscriptionlocalmainnet_settingsArgs, MeshContext>,
  /** null **/
  localmainnet_relayer: InContextSdkMethod<Subscription['localmainnet_relayer'], Subscriptionlocalmainnet_relayerArgs, MeshContext>,
  /** null **/
  localmainnet_relayers: InContextSdkMethod<Subscription['localmainnet_relayers'], Subscriptionlocalmainnet_relayersArgs, MeshContext>,
  /** null **/
  localmainnet_sequencer: InContextSdkMethod<Subscription['localmainnet_sequencer'], Subscriptionlocalmainnet_sequencerArgs, MeshContext>,
  /** null **/
  localmainnet_sequencers: InContextSdkMethod<Subscription['localmainnet_sequencers'], Subscriptionlocalmainnet_sequencersArgs, MeshContext>,
  /** null **/
  localmainnet_relayerFee: InContextSdkMethod<Subscription['localmainnet_relayerFee'], Subscriptionlocalmainnet_relayerFeeArgs, MeshContext>,
  /** null **/
  localmainnet_relayerFees: InContextSdkMethod<Subscription['localmainnet_relayerFees'], Subscriptionlocalmainnet_relayerFeesArgs, MeshContext>,
  /** null **/
  localmainnet_originTransfer: InContextSdkMethod<Subscription['localmainnet_originTransfer'], Subscriptionlocalmainnet_originTransferArgs, MeshContext>,
  /** null **/
  localmainnet_originTransfers: InContextSdkMethod<Subscription['localmainnet_originTransfers'], Subscriptionlocalmainnet_originTransfersArgs, MeshContext>,
  /** null **/
  localmainnet_destinationTransfer: InContextSdkMethod<Subscription['localmainnet_destinationTransfer'], Subscriptionlocalmainnet_destinationTransferArgs, MeshContext>,
  /** null **/
  localmainnet_destinationTransfers: InContextSdkMethod<Subscription['localmainnet_destinationTransfers'], Subscriptionlocalmainnet_destinationTransfersArgs, MeshContext>,
  /** null **/
  localmainnet_originMessage: InContextSdkMethod<Subscription['localmainnet_originMessage'], Subscriptionlocalmainnet_originMessageArgs, MeshContext>,
  /** null **/
  localmainnet_originMessages: InContextSdkMethod<Subscription['localmainnet_originMessages'], Subscriptionlocalmainnet_originMessagesArgs, MeshContext>,
  /** null **/
  localmainnet_aggregateRoot: InContextSdkMethod<Subscription['localmainnet_aggregateRoot'], Subscriptionlocalmainnet_aggregateRootArgs, MeshContext>,
  /** null **/
  localmainnet_aggregateRoots: InContextSdkMethod<Subscription['localmainnet_aggregateRoots'], Subscriptionlocalmainnet_aggregateRootsArgs, MeshContext>,
  /** null **/
  localmainnet_connectorMeta: InContextSdkMethod<Subscription['localmainnet_connectorMeta'], Subscriptionlocalmainnet_connectorMetaArgs, MeshContext>,
  /** null **/
  localmainnet_connectorMetas: InContextSdkMethod<Subscription['localmainnet_connectorMetas'], Subscriptionlocalmainnet_connectorMetasArgs, MeshContext>,
  /** null **/
  localmainnet_rootCount: InContextSdkMethod<Subscription['localmainnet_rootCount'], Subscriptionlocalmainnet_rootCountArgs, MeshContext>,
  /** null **/
  localmainnet_rootCounts: InContextSdkMethod<Subscription['localmainnet_rootCounts'], Subscriptionlocalmainnet_rootCountsArgs, MeshContext>,
  /** null **/
  localmainnet_rootMessageSent: InContextSdkMethod<Subscription['localmainnet_rootMessageSent'], Subscriptionlocalmainnet_rootMessageSentArgs, MeshContext>,
  /** null **/
  localmainnet_rootMessageSents: InContextSdkMethod<Subscription['localmainnet_rootMessageSents'], Subscriptionlocalmainnet_rootMessageSentsArgs, MeshContext>,
  /** null **/
  localmainnet_relayerFeesIncrease: InContextSdkMethod<Subscription['localmainnet_relayerFeesIncrease'], Subscriptionlocalmainnet_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  localmainnet_relayerFeesIncreases: InContextSdkMethod<Subscription['localmainnet_relayerFeesIncreases'], Subscriptionlocalmainnet_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  localmainnet_slippageUpdate: InContextSdkMethod<Subscription['localmainnet_slippageUpdate'], Subscriptionlocalmainnet_slippageUpdateArgs, MeshContext>,
  /** null **/
  localmainnet_slippageUpdates: InContextSdkMethod<Subscription['localmainnet_slippageUpdates'], Subscriptionlocalmainnet_slippageUpdatesArgs, MeshContext>,
  /** null **/
  localmainnet_snapshotRoot: InContextSdkMethod<Subscription['localmainnet_snapshotRoot'], Subscriptionlocalmainnet_snapshotRootArgs, MeshContext>,
  /** null **/
  localmainnet_snapshotRoots: InContextSdkMethod<Subscription['localmainnet_snapshotRoots'], Subscriptionlocalmainnet_snapshotRootsArgs, MeshContext>,
  /** null **/
  localmainnet_spokeConnectorMode: InContextSdkMethod<Subscription['localmainnet_spokeConnectorMode'], Subscriptionlocalmainnet_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  localmainnet_spokeConnectorModes: InContextSdkMethod<Subscription['localmainnet_spokeConnectorModes'], Subscriptionlocalmainnet_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  localmainnet_aggregateRootProposed: InContextSdkMethod<Subscription['localmainnet_aggregateRootProposed'], Subscriptionlocalmainnet_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  localmainnet_aggregateRootProposeds: InContextSdkMethod<Subscription['localmainnet_aggregateRootProposeds'], Subscriptionlocalmainnet_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  localmainnet_optimisticRootFinalized: InContextSdkMethod<Subscription['localmainnet_optimisticRootFinalized'], Subscriptionlocalmainnet_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  localmainnet_optimisticRootFinalizeds: InContextSdkMethod<Subscription['localmainnet_optimisticRootFinalizeds'], Subscriptionlocalmainnet_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  localmainnet__meta: InContextSdkMethod<Subscription['localmainnet__meta'], Subscriptionlocalmainnet__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_LocalMainnet"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
