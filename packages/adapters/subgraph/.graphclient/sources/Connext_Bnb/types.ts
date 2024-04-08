// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextBnbTypes {
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
  bnb_BigDecimal: any;
  BigInt: any;
  bnb_Bytes: any;
  bnb_Int8: any;
  Timestamp: any;
};

export type bnb_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['bnb_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type bnb_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['bnb_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type bnb_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['bnb_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['bnb_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<bnb_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<bnb_AggregateRootProposed_filter>>>;
};

export type bnb_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type bnb_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['bnb_Bytes']>;
  root_not?: InputMaybe<Scalars['bnb_Bytes']>;
  root_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  root_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  root_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  root_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  root_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<bnb_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<bnb_AggregateRoot_filter>>>;
};

export type bnb_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type bnb_Aggregation_interval =
  | 'hour'
  | 'day';

export type bnb_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['bnb_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['bnb_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['bnb_Bytes']>;
  localAsset?: Maybe<Scalars['bnb_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<bnb_AssetStatus>;
};

export type bnb_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: bnb_Router;
  asset: bnb_Asset;
  feesEarned: Scalars['BigInt'];
};

export type bnb_AssetBalance_filter = {
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
  router_?: InputMaybe<bnb_Router_filter>;
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
  asset_?: InputMaybe<bnb_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<bnb_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<bnb_AssetBalance_filter>>>;
};

export type bnb_AssetBalance_orderBy =
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

export type bnb_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type bnb_AssetStatus_filter = {
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
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<bnb_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<bnb_AssetStatus_filter>>>;
};

export type bnb_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type bnb_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['bnb_Bytes']>;
  key_not?: InputMaybe<Scalars['bnb_Bytes']>;
  key_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  key_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  key_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  key_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  key_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['bnb_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['bnb_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  localAsset?: InputMaybe<Scalars['bnb_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['bnb_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  status_?: InputMaybe<bnb_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<bnb_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<bnb_Asset_filter>>>;
};

export type bnb_Asset_orderBy =
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

export type bnb_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type bnb_Block_height = {
  hash?: InputMaybe<Scalars['bnb_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type bnb_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['bnb_Bytes']>;
  rootManager?: Maybe<Scalars['bnb_Bytes']>;
  mirrorConnector?: Maybe<Scalars['bnb_Bytes']>;
};

export type bnb_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['bnb_Bytes']>;
  amb_not?: InputMaybe<Scalars['bnb_Bytes']>;
  amb_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  amb_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  amb_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  amb_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  rootManager?: InputMaybe<Scalars['bnb_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['bnb_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['bnb_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['bnb_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<bnb_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<bnb_ConnectorMeta_filter>>>;
};

export type bnb_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type bnb_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['bnb_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<bnb_TransferStatus>;
  routers?: Maybe<Array<bnb_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['bnb_Bytes']>;
  delegate?: Maybe<Scalars['bnb_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['bnb_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['bnb_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['bnb_Bytes']>;
  asset?: Maybe<bnb_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['bnb_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['bnb_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['bnb_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['bnb_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['bnb_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['bnb_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type bnb_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_Router_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_Router_filter>;
};

export type bnb_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_not?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<bnb_TransferStatus>;
  status_not?: InputMaybe<bnb_TransferStatus>;
  status_in?: InputMaybe<Array<bnb_TransferStatus>>;
  status_not_in?: InputMaybe<Array<bnb_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<bnb_Router_filter>;
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
  to?: InputMaybe<Scalars['bnb_Bytes']>;
  to_not?: InputMaybe<Scalars['bnb_Bytes']>;
  to_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  to_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  to_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  to_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  to_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate_not?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['bnb_Bytes']>;
  callData_not?: InputMaybe<Scalars['bnb_Bytes']>;
  callData_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  callData_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  callData_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  callData_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  originSender?: InputMaybe<Scalars['bnb_Bytes']>;
  originSender_not?: InputMaybe<Scalars['bnb_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  asset_?: InputMaybe<bnb_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['bnb_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['bnb_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['bnb_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['bnb_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['bnb_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['bnb_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<bnb_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<bnb_DestinationTransfer_filter>>>;
};

export type bnb_DestinationTransfer_orderBy =
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

export type bnb_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['bnb_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type bnb_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['bnb_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['bnb_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<bnb_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<bnb_OptimisticRootFinalized_filter>>>;
};

export type bnb_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type bnb_OrderDirection =
  | 'asc'
  | 'desc';

export type bnb_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['bnb_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['bnb_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['bnb_Bytes']>;
  root?: Maybe<Scalars['bnb_Bytes']>;
  transactionHash?: Maybe<Scalars['bnb_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<bnb_RootCount>;
};

export type bnb_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_not?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['bnb_Bytes']>;
  leaf_not?: InputMaybe<Scalars['bnb_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['bnb_Bytes']>;
  message_not?: InputMaybe<Scalars['bnb_Bytes']>;
  message_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  message_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  message_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  message_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  message_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  root?: InputMaybe<Scalars['bnb_Bytes']>;
  root_not?: InputMaybe<Scalars['bnb_Bytes']>;
  root_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  root_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  root_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  root_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  root_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  rootCount_?: InputMaybe<bnb_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<bnb_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<bnb_OriginMessage_filter>>>;
};

export type bnb_OriginMessage_orderBy =
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

export type bnb_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['bnb_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<bnb_TransferStatus>;
  messageHash?: Maybe<Scalars['bnb_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['bnb_Bytes']>;
  delegate?: Maybe<Scalars['bnb_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['bnb_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['bnb_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['bnb_Bytes']>;
  asset?: Maybe<bnb_Asset>;
  transactingAsset?: Maybe<Scalars['bnb_Bytes']>;
  message?: Maybe<bnb_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<bnb_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['bnb_Bytes']>;
  caller?: Maybe<Scalars['bnb_Bytes']>;
  transactionHash?: Maybe<Scalars['bnb_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['bnb_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type bnb_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_RelayerFee_filter>;
};

export type bnb_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_not?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<bnb_TransferStatus>;
  status_not?: InputMaybe<bnb_TransferStatus>;
  status_in?: InputMaybe<Array<bnb_TransferStatus>>;
  status_not_in?: InputMaybe<Array<bnb_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['bnb_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['bnb_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  to?: InputMaybe<Scalars['bnb_Bytes']>;
  to_not?: InputMaybe<Scalars['bnb_Bytes']>;
  to_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  to_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  to_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  to_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  to_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate_not?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['bnb_Bytes']>;
  callData_not?: InputMaybe<Scalars['bnb_Bytes']>;
  callData_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  callData_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  callData_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  callData_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['bnb_Bytes']>;
  originSender_not?: InputMaybe<Scalars['bnb_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  asset_?: InputMaybe<bnb_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['bnb_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['bnb_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  message_?: InputMaybe<bnb_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<bnb_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['bnb_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['bnb_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  caller?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_not?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['bnb_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['bnb_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<bnb_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<bnb_OriginTransfer_filter>>>;
};

export type bnb_OriginTransfer_orderBy =
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
  bnb_asset?: Maybe<bnb_Asset>;
  bnb_assets: Array<bnb_Asset>;
  bnb_assetStatus?: Maybe<bnb_AssetStatus>;
  bnb_assetStatuses: Array<bnb_AssetStatus>;
  bnb_assetBalance?: Maybe<bnb_AssetBalance>;
  bnb_assetBalances: Array<bnb_AssetBalance>;
  bnb_router?: Maybe<bnb_Router>;
  bnb_routers: Array<bnb_Router>;
  bnb_routerDailyTVL?: Maybe<bnb_RouterDailyTVL>;
  bnb_routerDailyTVLs: Array<bnb_RouterDailyTVL>;
  bnb_routerLiquidityEvent?: Maybe<bnb_RouterLiquidityEvent>;
  bnb_routerLiquidityEvents: Array<bnb_RouterLiquidityEvent>;
  bnb_setting?: Maybe<bnb_Setting>;
  bnb_settings: Array<bnb_Setting>;
  bnb_relayer?: Maybe<bnb_Relayer>;
  bnb_relayers: Array<bnb_Relayer>;
  bnb_sequencer?: Maybe<bnb_Sequencer>;
  bnb_sequencers: Array<bnb_Sequencer>;
  bnb_relayerFee?: Maybe<bnb_RelayerFee>;
  bnb_relayerFees: Array<bnb_RelayerFee>;
  bnb_originTransfer?: Maybe<bnb_OriginTransfer>;
  bnb_originTransfers: Array<bnb_OriginTransfer>;
  bnb_destinationTransfer?: Maybe<bnb_DestinationTransfer>;
  bnb_destinationTransfers: Array<bnb_DestinationTransfer>;
  bnb_originMessage?: Maybe<bnb_OriginMessage>;
  bnb_originMessages: Array<bnb_OriginMessage>;
  bnb_aggregateRoot?: Maybe<bnb_AggregateRoot>;
  bnb_aggregateRoots: Array<bnb_AggregateRoot>;
  bnb_connectorMeta?: Maybe<bnb_ConnectorMeta>;
  bnb_connectorMetas: Array<bnb_ConnectorMeta>;
  bnb_rootCount?: Maybe<bnb_RootCount>;
  bnb_rootCounts: Array<bnb_RootCount>;
  bnb_rootMessageSent?: Maybe<bnb_RootMessageSent>;
  bnb_rootMessageSents: Array<bnb_RootMessageSent>;
  bnb_relayerFeesIncrease?: Maybe<bnb_RelayerFeesIncrease>;
  bnb_relayerFeesIncreases: Array<bnb_RelayerFeesIncrease>;
  bnb_slippageUpdate?: Maybe<bnb_SlippageUpdate>;
  bnb_slippageUpdates: Array<bnb_SlippageUpdate>;
  bnb_snapshotRoot?: Maybe<bnb_SnapshotRoot>;
  bnb_snapshotRoots: Array<bnb_SnapshotRoot>;
  bnb_spokeConnectorMode?: Maybe<bnb_SpokeConnectorMode>;
  bnb_spokeConnectorModes: Array<bnb_SpokeConnectorMode>;
  bnb_aggregateRootProposed?: Maybe<bnb_AggregateRootProposed>;
  bnb_aggregateRootProposeds: Array<bnb_AggregateRootProposed>;
  bnb_optimisticRootFinalized?: Maybe<bnb_OptimisticRootFinalized>;
  bnb_optimisticRootFinalizeds: Array<bnb_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  bnb__meta?: Maybe<bnb__Meta_>;
};


export type Querybnb_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_Asset_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_Asset_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_AssetStatus_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_AssetBalance_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_Router_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_Router_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_RouterDailyTVL_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_RouterLiquidityEvent_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_Setting_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_Setting_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_Relayer_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_Relayer_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_Sequencer_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_Sequencer_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_RelayerFee_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_OriginTransfer_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_DestinationTransfer_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_OriginMessage_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_AggregateRoot_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_ConnectorMeta_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_RootCount_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_RootCount_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_RootMessageSent_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_RelayerFeesIncrease_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_SlippageUpdate_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_SnapshotRoot_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_SpokeConnectorMode_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_AggregateRootProposed_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_OptimisticRootFinalized_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb__metaArgs = {
  block?: InputMaybe<bnb_Block_height>;
};

export type bnb_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['bnb_Bytes']>;
};

export type bnb_RelayerFee = {
  id: Scalars['ID'];
  transfer: bnb_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['bnb_Bytes'];
};

export type bnb_RelayerFee_filter = {
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
  transfer_?: InputMaybe<bnb_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['bnb_Bytes']>;
  asset_not?: InputMaybe<Scalars['bnb_Bytes']>;
  asset_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  asset_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  asset_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  asset_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<bnb_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<bnb_RelayerFee_filter>>>;
};

export type bnb_RelayerFee_orderBy =
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

export type bnb_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: bnb_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['bnb_Bytes']>;
  caller: Scalars['bnb_Bytes'];
  transactionHash: Scalars['bnb_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type bnb_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<bnb_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['bnb_Bytes']>;
  asset_not?: InputMaybe<Scalars['bnb_Bytes']>;
  asset_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  asset_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  asset_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  asset_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  caller?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_not?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<bnb_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<bnb_RelayerFeesIncrease_filter>>>;
};

export type bnb_RelayerFeesIncrease_orderBy =
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

export type bnb_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['bnb_Bytes']>;
  relayer_not?: InputMaybe<Scalars['bnb_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<bnb_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<bnb_Relayer_filter>>>;
};

export type bnb_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type bnb_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type bnb_RootCount_filter = {
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
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<bnb_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<bnb_RootCount_filter>>>;
};

export type bnb_RootCount_orderBy =
  | 'id'
  | 'count';

export type bnb_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['bnb_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['bnb_Bytes']>;
  transactionHash?: Maybe<Scalars['bnb_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type bnb_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['bnb_Bytes']>;
  root_not?: InputMaybe<Scalars['bnb_Bytes']>;
  root_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  root_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  root_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  root_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  root_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_not?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<bnb_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<bnb_RootMessageSent_filter>>>;
};

export type bnb_RootMessageSent_orderBy =
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

export type bnb_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['bnb_Bytes']>;
  recipient?: Maybe<Scalars['bnb_Bytes']>;
  proposedOwner?: Maybe<Scalars['bnb_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<bnb_AssetBalance>;
};


export type bnb_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_AssetBalance_filter>;
};

export type bnb_RouterDailyTVL = {
  id: Scalars['ID'];
  router: bnb_Router;
  asset: bnb_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type bnb_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<bnb_Router_filter>;
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
  asset_?: InputMaybe<bnb_Asset_filter>;
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
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<bnb_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<bnb_RouterDailyTVL_filter>>>;
};

export type bnb_RouterDailyTVL_orderBy =
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

export type bnb_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<bnb_RouterLiquidityEventType>;
  router: bnb_Router;
  asset: bnb_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['bnb_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['bnb_Bytes'];
  nonce: Scalars['BigInt'];
};

export type bnb_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type bnb_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<bnb_RouterLiquidityEventType>;
  type_not?: InputMaybe<bnb_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<bnb_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<bnb_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<bnb_Router_filter>;
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
  asset_?: InputMaybe<bnb_Asset_filter>;
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
  caller?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_not?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<bnb_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<bnb_RouterLiquidityEvent_filter>>>;
};

export type bnb_RouterLiquidityEvent_orderBy =
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

export type bnb_Router_filter = {
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
  owner?: InputMaybe<Scalars['bnb_Bytes']>;
  owner_not?: InputMaybe<Scalars['bnb_Bytes']>;
  owner_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  owner_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  owner_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  owner_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  recipient?: InputMaybe<Scalars['bnb_Bytes']>;
  recipient_not?: InputMaybe<Scalars['bnb_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['bnb_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['bnb_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<bnb_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<bnb_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<bnb_Router_filter>>>;
};

export type bnb_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type bnb_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['bnb_Bytes']>;
};

export type bnb_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['bnb_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['bnb_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<bnb_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<bnb_Sequencer_filter>>>;
};

export type bnb_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type bnb_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['bnb_Bytes'];
};

export type bnb_Setting_filter = {
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
  caller?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_not?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<bnb_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<bnb_Setting_filter>>>;
};

export type bnb_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type bnb_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: bnb_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['bnb_Bytes'];
  transactionHash: Scalars['bnb_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type bnb_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<bnb_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_not?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<bnb_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<bnb_SlippageUpdate_filter>>>;
};

export type bnb_SlippageUpdate_orderBy =
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

export type bnb_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['bnb_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type bnb_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['bnb_Bytes']>;
  root_not?: InputMaybe<Scalars['bnb_Bytes']>;
  root_gt?: InputMaybe<Scalars['bnb_Bytes']>;
  root_lt?: InputMaybe<Scalars['bnb_Bytes']>;
  root_gte?: InputMaybe<Scalars['bnb_Bytes']>;
  root_lte?: InputMaybe<Scalars['bnb_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  root_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<bnb_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<bnb_SnapshotRoot_filter>>>;
};

export type bnb_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type bnb_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type bnb_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<bnb_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<bnb_SpokeConnectorMode_filter>>>;
};

export type bnb_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  bnb_asset?: Maybe<bnb_Asset>;
  bnb_assets: Array<bnb_Asset>;
  bnb_assetStatus?: Maybe<bnb_AssetStatus>;
  bnb_assetStatuses: Array<bnb_AssetStatus>;
  bnb_assetBalance?: Maybe<bnb_AssetBalance>;
  bnb_assetBalances: Array<bnb_AssetBalance>;
  bnb_router?: Maybe<bnb_Router>;
  bnb_routers: Array<bnb_Router>;
  bnb_routerDailyTVL?: Maybe<bnb_RouterDailyTVL>;
  bnb_routerDailyTVLs: Array<bnb_RouterDailyTVL>;
  bnb_routerLiquidityEvent?: Maybe<bnb_RouterLiquidityEvent>;
  bnb_routerLiquidityEvents: Array<bnb_RouterLiquidityEvent>;
  bnb_setting?: Maybe<bnb_Setting>;
  bnb_settings: Array<bnb_Setting>;
  bnb_relayer?: Maybe<bnb_Relayer>;
  bnb_relayers: Array<bnb_Relayer>;
  bnb_sequencer?: Maybe<bnb_Sequencer>;
  bnb_sequencers: Array<bnb_Sequencer>;
  bnb_relayerFee?: Maybe<bnb_RelayerFee>;
  bnb_relayerFees: Array<bnb_RelayerFee>;
  bnb_originTransfer?: Maybe<bnb_OriginTransfer>;
  bnb_originTransfers: Array<bnb_OriginTransfer>;
  bnb_destinationTransfer?: Maybe<bnb_DestinationTransfer>;
  bnb_destinationTransfers: Array<bnb_DestinationTransfer>;
  bnb_originMessage?: Maybe<bnb_OriginMessage>;
  bnb_originMessages: Array<bnb_OriginMessage>;
  bnb_aggregateRoot?: Maybe<bnb_AggregateRoot>;
  bnb_aggregateRoots: Array<bnb_AggregateRoot>;
  bnb_connectorMeta?: Maybe<bnb_ConnectorMeta>;
  bnb_connectorMetas: Array<bnb_ConnectorMeta>;
  bnb_rootCount?: Maybe<bnb_RootCount>;
  bnb_rootCounts: Array<bnb_RootCount>;
  bnb_rootMessageSent?: Maybe<bnb_RootMessageSent>;
  bnb_rootMessageSents: Array<bnb_RootMessageSent>;
  bnb_relayerFeesIncrease?: Maybe<bnb_RelayerFeesIncrease>;
  bnb_relayerFeesIncreases: Array<bnb_RelayerFeesIncrease>;
  bnb_slippageUpdate?: Maybe<bnb_SlippageUpdate>;
  bnb_slippageUpdates: Array<bnb_SlippageUpdate>;
  bnb_snapshotRoot?: Maybe<bnb_SnapshotRoot>;
  bnb_snapshotRoots: Array<bnb_SnapshotRoot>;
  bnb_spokeConnectorMode?: Maybe<bnb_SpokeConnectorMode>;
  bnb_spokeConnectorModes: Array<bnb_SpokeConnectorMode>;
  bnb_aggregateRootProposed?: Maybe<bnb_AggregateRootProposed>;
  bnb_aggregateRootProposeds: Array<bnb_AggregateRootProposed>;
  bnb_optimisticRootFinalized?: Maybe<bnb_OptimisticRootFinalized>;
  bnb_optimisticRootFinalizeds: Array<bnb_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  bnb__meta?: Maybe<bnb__Meta_>;
};


export type Subscriptionbnb_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_Asset_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_Asset_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_AssetStatus_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_AssetBalance_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_Router_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_Router_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_RouterDailyTVL_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_RouterLiquidityEvent_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_Setting_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_Setting_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_Relayer_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_Relayer_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_Sequencer_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_Sequencer_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_RelayerFee_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_OriginTransfer_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_DestinationTransfer_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_OriginMessage_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_AggregateRoot_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_ConnectorMeta_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_RootCount_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_RootCount_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_RootMessageSent_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_RelayerFeesIncrease_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_SlippageUpdate_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_SnapshotRoot_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_SpokeConnectorMode_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_AggregateRootProposed_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_OptimisticRootFinalized_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb__metaArgs = {
  block?: InputMaybe<bnb_Block_height>;
};

export type bnb_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type bnb__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['bnb_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['bnb_Bytes']>;
};

/** The type for the top-level _meta field */
export type bnb__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: bnb__Block_;
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
  bnb_asset: InContextSdkMethod<Query['bnb_asset'], Querybnb_assetArgs, MeshContext>,
  /** null **/
  bnb_assets: InContextSdkMethod<Query['bnb_assets'], Querybnb_assetsArgs, MeshContext>,
  /** null **/
  bnb_assetStatus: InContextSdkMethod<Query['bnb_assetStatus'], Querybnb_assetStatusArgs, MeshContext>,
  /** null **/
  bnb_assetStatuses: InContextSdkMethod<Query['bnb_assetStatuses'], Querybnb_assetStatusesArgs, MeshContext>,
  /** null **/
  bnb_assetBalance: InContextSdkMethod<Query['bnb_assetBalance'], Querybnb_assetBalanceArgs, MeshContext>,
  /** null **/
  bnb_assetBalances: InContextSdkMethod<Query['bnb_assetBalances'], Querybnb_assetBalancesArgs, MeshContext>,
  /** null **/
  bnb_router: InContextSdkMethod<Query['bnb_router'], Querybnb_routerArgs, MeshContext>,
  /** null **/
  bnb_routers: InContextSdkMethod<Query['bnb_routers'], Querybnb_routersArgs, MeshContext>,
  /** null **/
  bnb_routerDailyTVL: InContextSdkMethod<Query['bnb_routerDailyTVL'], Querybnb_routerDailyTVLArgs, MeshContext>,
  /** null **/
  bnb_routerDailyTVLs: InContextSdkMethod<Query['bnb_routerDailyTVLs'], Querybnb_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  bnb_routerLiquidityEvent: InContextSdkMethod<Query['bnb_routerLiquidityEvent'], Querybnb_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  bnb_routerLiquidityEvents: InContextSdkMethod<Query['bnb_routerLiquidityEvents'], Querybnb_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  bnb_setting: InContextSdkMethod<Query['bnb_setting'], Querybnb_settingArgs, MeshContext>,
  /** null **/
  bnb_settings: InContextSdkMethod<Query['bnb_settings'], Querybnb_settingsArgs, MeshContext>,
  /** null **/
  bnb_relayer: InContextSdkMethod<Query['bnb_relayer'], Querybnb_relayerArgs, MeshContext>,
  /** null **/
  bnb_relayers: InContextSdkMethod<Query['bnb_relayers'], Querybnb_relayersArgs, MeshContext>,
  /** null **/
  bnb_sequencer: InContextSdkMethod<Query['bnb_sequencer'], Querybnb_sequencerArgs, MeshContext>,
  /** null **/
  bnb_sequencers: InContextSdkMethod<Query['bnb_sequencers'], Querybnb_sequencersArgs, MeshContext>,
  /** null **/
  bnb_relayerFee: InContextSdkMethod<Query['bnb_relayerFee'], Querybnb_relayerFeeArgs, MeshContext>,
  /** null **/
  bnb_relayerFees: InContextSdkMethod<Query['bnb_relayerFees'], Querybnb_relayerFeesArgs, MeshContext>,
  /** null **/
  bnb_originTransfer: InContextSdkMethod<Query['bnb_originTransfer'], Querybnb_originTransferArgs, MeshContext>,
  /** null **/
  bnb_originTransfers: InContextSdkMethod<Query['bnb_originTransfers'], Querybnb_originTransfersArgs, MeshContext>,
  /** null **/
  bnb_destinationTransfer: InContextSdkMethod<Query['bnb_destinationTransfer'], Querybnb_destinationTransferArgs, MeshContext>,
  /** null **/
  bnb_destinationTransfers: InContextSdkMethod<Query['bnb_destinationTransfers'], Querybnb_destinationTransfersArgs, MeshContext>,
  /** null **/
  bnb_originMessage: InContextSdkMethod<Query['bnb_originMessage'], Querybnb_originMessageArgs, MeshContext>,
  /** null **/
  bnb_originMessages: InContextSdkMethod<Query['bnb_originMessages'], Querybnb_originMessagesArgs, MeshContext>,
  /** null **/
  bnb_aggregateRoot: InContextSdkMethod<Query['bnb_aggregateRoot'], Querybnb_aggregateRootArgs, MeshContext>,
  /** null **/
  bnb_aggregateRoots: InContextSdkMethod<Query['bnb_aggregateRoots'], Querybnb_aggregateRootsArgs, MeshContext>,
  /** null **/
  bnb_connectorMeta: InContextSdkMethod<Query['bnb_connectorMeta'], Querybnb_connectorMetaArgs, MeshContext>,
  /** null **/
  bnb_connectorMetas: InContextSdkMethod<Query['bnb_connectorMetas'], Querybnb_connectorMetasArgs, MeshContext>,
  /** null **/
  bnb_rootCount: InContextSdkMethod<Query['bnb_rootCount'], Querybnb_rootCountArgs, MeshContext>,
  /** null **/
  bnb_rootCounts: InContextSdkMethod<Query['bnb_rootCounts'], Querybnb_rootCountsArgs, MeshContext>,
  /** null **/
  bnb_rootMessageSent: InContextSdkMethod<Query['bnb_rootMessageSent'], Querybnb_rootMessageSentArgs, MeshContext>,
  /** null **/
  bnb_rootMessageSents: InContextSdkMethod<Query['bnb_rootMessageSents'], Querybnb_rootMessageSentsArgs, MeshContext>,
  /** null **/
  bnb_relayerFeesIncrease: InContextSdkMethod<Query['bnb_relayerFeesIncrease'], Querybnb_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  bnb_relayerFeesIncreases: InContextSdkMethod<Query['bnb_relayerFeesIncreases'], Querybnb_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  bnb_slippageUpdate: InContextSdkMethod<Query['bnb_slippageUpdate'], Querybnb_slippageUpdateArgs, MeshContext>,
  /** null **/
  bnb_slippageUpdates: InContextSdkMethod<Query['bnb_slippageUpdates'], Querybnb_slippageUpdatesArgs, MeshContext>,
  /** null **/
  bnb_snapshotRoot: InContextSdkMethod<Query['bnb_snapshotRoot'], Querybnb_snapshotRootArgs, MeshContext>,
  /** null **/
  bnb_snapshotRoots: InContextSdkMethod<Query['bnb_snapshotRoots'], Querybnb_snapshotRootsArgs, MeshContext>,
  /** null **/
  bnb_spokeConnectorMode: InContextSdkMethod<Query['bnb_spokeConnectorMode'], Querybnb_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  bnb_spokeConnectorModes: InContextSdkMethod<Query['bnb_spokeConnectorModes'], Querybnb_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  bnb_aggregateRootProposed: InContextSdkMethod<Query['bnb_aggregateRootProposed'], Querybnb_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  bnb_aggregateRootProposeds: InContextSdkMethod<Query['bnb_aggregateRootProposeds'], Querybnb_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  bnb_optimisticRootFinalized: InContextSdkMethod<Query['bnb_optimisticRootFinalized'], Querybnb_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  bnb_optimisticRootFinalizeds: InContextSdkMethod<Query['bnb_optimisticRootFinalizeds'], Querybnb_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  bnb__meta: InContextSdkMethod<Query['bnb__meta'], Querybnb__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  bnb_asset: InContextSdkMethod<Subscription['bnb_asset'], Subscriptionbnb_assetArgs, MeshContext>,
  /** null **/
  bnb_assets: InContextSdkMethod<Subscription['bnb_assets'], Subscriptionbnb_assetsArgs, MeshContext>,
  /** null **/
  bnb_assetStatus: InContextSdkMethod<Subscription['bnb_assetStatus'], Subscriptionbnb_assetStatusArgs, MeshContext>,
  /** null **/
  bnb_assetStatuses: InContextSdkMethod<Subscription['bnb_assetStatuses'], Subscriptionbnb_assetStatusesArgs, MeshContext>,
  /** null **/
  bnb_assetBalance: InContextSdkMethod<Subscription['bnb_assetBalance'], Subscriptionbnb_assetBalanceArgs, MeshContext>,
  /** null **/
  bnb_assetBalances: InContextSdkMethod<Subscription['bnb_assetBalances'], Subscriptionbnb_assetBalancesArgs, MeshContext>,
  /** null **/
  bnb_router: InContextSdkMethod<Subscription['bnb_router'], Subscriptionbnb_routerArgs, MeshContext>,
  /** null **/
  bnb_routers: InContextSdkMethod<Subscription['bnb_routers'], Subscriptionbnb_routersArgs, MeshContext>,
  /** null **/
  bnb_routerDailyTVL: InContextSdkMethod<Subscription['bnb_routerDailyTVL'], Subscriptionbnb_routerDailyTVLArgs, MeshContext>,
  /** null **/
  bnb_routerDailyTVLs: InContextSdkMethod<Subscription['bnb_routerDailyTVLs'], Subscriptionbnb_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  bnb_routerLiquidityEvent: InContextSdkMethod<Subscription['bnb_routerLiquidityEvent'], Subscriptionbnb_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  bnb_routerLiquidityEvents: InContextSdkMethod<Subscription['bnb_routerLiquidityEvents'], Subscriptionbnb_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  bnb_setting: InContextSdkMethod<Subscription['bnb_setting'], Subscriptionbnb_settingArgs, MeshContext>,
  /** null **/
  bnb_settings: InContextSdkMethod<Subscription['bnb_settings'], Subscriptionbnb_settingsArgs, MeshContext>,
  /** null **/
  bnb_relayer: InContextSdkMethod<Subscription['bnb_relayer'], Subscriptionbnb_relayerArgs, MeshContext>,
  /** null **/
  bnb_relayers: InContextSdkMethod<Subscription['bnb_relayers'], Subscriptionbnb_relayersArgs, MeshContext>,
  /** null **/
  bnb_sequencer: InContextSdkMethod<Subscription['bnb_sequencer'], Subscriptionbnb_sequencerArgs, MeshContext>,
  /** null **/
  bnb_sequencers: InContextSdkMethod<Subscription['bnb_sequencers'], Subscriptionbnb_sequencersArgs, MeshContext>,
  /** null **/
  bnb_relayerFee: InContextSdkMethod<Subscription['bnb_relayerFee'], Subscriptionbnb_relayerFeeArgs, MeshContext>,
  /** null **/
  bnb_relayerFees: InContextSdkMethod<Subscription['bnb_relayerFees'], Subscriptionbnb_relayerFeesArgs, MeshContext>,
  /** null **/
  bnb_originTransfer: InContextSdkMethod<Subscription['bnb_originTransfer'], Subscriptionbnb_originTransferArgs, MeshContext>,
  /** null **/
  bnb_originTransfers: InContextSdkMethod<Subscription['bnb_originTransfers'], Subscriptionbnb_originTransfersArgs, MeshContext>,
  /** null **/
  bnb_destinationTransfer: InContextSdkMethod<Subscription['bnb_destinationTransfer'], Subscriptionbnb_destinationTransferArgs, MeshContext>,
  /** null **/
  bnb_destinationTransfers: InContextSdkMethod<Subscription['bnb_destinationTransfers'], Subscriptionbnb_destinationTransfersArgs, MeshContext>,
  /** null **/
  bnb_originMessage: InContextSdkMethod<Subscription['bnb_originMessage'], Subscriptionbnb_originMessageArgs, MeshContext>,
  /** null **/
  bnb_originMessages: InContextSdkMethod<Subscription['bnb_originMessages'], Subscriptionbnb_originMessagesArgs, MeshContext>,
  /** null **/
  bnb_aggregateRoot: InContextSdkMethod<Subscription['bnb_aggregateRoot'], Subscriptionbnb_aggregateRootArgs, MeshContext>,
  /** null **/
  bnb_aggregateRoots: InContextSdkMethod<Subscription['bnb_aggregateRoots'], Subscriptionbnb_aggregateRootsArgs, MeshContext>,
  /** null **/
  bnb_connectorMeta: InContextSdkMethod<Subscription['bnb_connectorMeta'], Subscriptionbnb_connectorMetaArgs, MeshContext>,
  /** null **/
  bnb_connectorMetas: InContextSdkMethod<Subscription['bnb_connectorMetas'], Subscriptionbnb_connectorMetasArgs, MeshContext>,
  /** null **/
  bnb_rootCount: InContextSdkMethod<Subscription['bnb_rootCount'], Subscriptionbnb_rootCountArgs, MeshContext>,
  /** null **/
  bnb_rootCounts: InContextSdkMethod<Subscription['bnb_rootCounts'], Subscriptionbnb_rootCountsArgs, MeshContext>,
  /** null **/
  bnb_rootMessageSent: InContextSdkMethod<Subscription['bnb_rootMessageSent'], Subscriptionbnb_rootMessageSentArgs, MeshContext>,
  /** null **/
  bnb_rootMessageSents: InContextSdkMethod<Subscription['bnb_rootMessageSents'], Subscriptionbnb_rootMessageSentsArgs, MeshContext>,
  /** null **/
  bnb_relayerFeesIncrease: InContextSdkMethod<Subscription['bnb_relayerFeesIncrease'], Subscriptionbnb_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  bnb_relayerFeesIncreases: InContextSdkMethod<Subscription['bnb_relayerFeesIncreases'], Subscriptionbnb_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  bnb_slippageUpdate: InContextSdkMethod<Subscription['bnb_slippageUpdate'], Subscriptionbnb_slippageUpdateArgs, MeshContext>,
  /** null **/
  bnb_slippageUpdates: InContextSdkMethod<Subscription['bnb_slippageUpdates'], Subscriptionbnb_slippageUpdatesArgs, MeshContext>,
  /** null **/
  bnb_snapshotRoot: InContextSdkMethod<Subscription['bnb_snapshotRoot'], Subscriptionbnb_snapshotRootArgs, MeshContext>,
  /** null **/
  bnb_snapshotRoots: InContextSdkMethod<Subscription['bnb_snapshotRoots'], Subscriptionbnb_snapshotRootsArgs, MeshContext>,
  /** null **/
  bnb_spokeConnectorMode: InContextSdkMethod<Subscription['bnb_spokeConnectorMode'], Subscriptionbnb_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  bnb_spokeConnectorModes: InContextSdkMethod<Subscription['bnb_spokeConnectorModes'], Subscriptionbnb_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  bnb_aggregateRootProposed: InContextSdkMethod<Subscription['bnb_aggregateRootProposed'], Subscriptionbnb_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  bnb_aggregateRootProposeds: InContextSdkMethod<Subscription['bnb_aggregateRootProposeds'], Subscriptionbnb_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  bnb_optimisticRootFinalized: InContextSdkMethod<Subscription['bnb_optimisticRootFinalized'], Subscriptionbnb_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  bnb_optimisticRootFinalizeds: InContextSdkMethod<Subscription['bnb_optimisticRootFinalizeds'], Subscriptionbnb_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  bnb__meta: InContextSdkMethod<Subscription['bnb__meta'], Subscriptionbnb__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Bnb"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
