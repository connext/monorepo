// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextMantleTypes {
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
  mantle_BigDecimal: any;
  BigInt: any;
  mantle_Bytes: any;
  mantle_Int8: any;
  Timestamp: any;
};

export type mantle_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['mantle_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type mantle_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['mantle_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type mantle_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['mantle_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['mantle_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
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
  _change_block?: InputMaybe<mantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mantle_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mantle_AggregateRootProposed_filter>>>;
};

export type mantle_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type mantle_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['mantle_Bytes']>;
  root_not?: InputMaybe<Scalars['mantle_Bytes']>;
  root_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  root_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  root_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  root_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  root_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mantle_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mantle_AggregateRoot_filter>>>;
};

export type mantle_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type mantle_Aggregation_interval =
  | 'hour'
  | 'day';

export type mantle_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['mantle_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['mantle_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['mantle_Bytes']>;
  localAsset?: Maybe<Scalars['mantle_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<mantle_AssetStatus>;
};

export type mantle_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: mantle_Router;
  asset: mantle_Asset;
  feesEarned: Scalars['BigInt'];
};

export type mantle_AssetBalance_filter = {
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
  router_?: InputMaybe<mantle_Router_filter>;
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
  asset_?: InputMaybe<mantle_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mantle_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mantle_AssetBalance_filter>>>;
};

export type mantle_AssetBalance_orderBy =
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

export type mantle_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type mantle_AssetStatus_filter = {
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
  _change_block?: InputMaybe<mantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mantle_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mantle_AssetStatus_filter>>>;
};

export type mantle_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type mantle_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['mantle_Bytes']>;
  key_not?: InputMaybe<Scalars['mantle_Bytes']>;
  key_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  key_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  key_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  key_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  key_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['mantle_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['mantle_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['mantle_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['mantle_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  localAsset?: InputMaybe<Scalars['mantle_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['mantle_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
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
  status_?: InputMaybe<mantle_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mantle_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mantle_Asset_filter>>>;
};

export type mantle_Asset_orderBy =
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

export type mantle_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type mantle_Block_height = {
  hash?: InputMaybe<Scalars['mantle_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type mantle_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['mantle_Bytes']>;
  rootManager?: Maybe<Scalars['mantle_Bytes']>;
  mirrorConnector?: Maybe<Scalars['mantle_Bytes']>;
};

export type mantle_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['mantle_Bytes']>;
  amb_not?: InputMaybe<Scalars['mantle_Bytes']>;
  amb_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  amb_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  amb_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  amb_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  rootManager?: InputMaybe<Scalars['mantle_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['mantle_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['mantle_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['mantle_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mantle_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mantle_ConnectorMeta_filter>>>;
};

export type mantle_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type mantle_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['mantle_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<mantle_TransferStatus>;
  routers?: Maybe<Array<mantle_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['mantle_Bytes']>;
  delegate?: Maybe<Scalars['mantle_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['mantle_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['mantle_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['mantle_Bytes']>;
  asset?: Maybe<mantle_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['mantle_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['mantle_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['mantle_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['mantle_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['mantle_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['mantle_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type mantle_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_Router_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_Router_filter>;
};

export type mantle_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['mantle_Bytes']>;
  transferId_not?: InputMaybe<Scalars['mantle_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<mantle_TransferStatus>;
  status_not?: InputMaybe<mantle_TransferStatus>;
  status_in?: InputMaybe<Array<mantle_TransferStatus>>;
  status_not_in?: InputMaybe<Array<mantle_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<mantle_Router_filter>;
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
  to?: InputMaybe<Scalars['mantle_Bytes']>;
  to_not?: InputMaybe<Scalars['mantle_Bytes']>;
  to_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  to_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  to_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  to_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  to_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  delegate?: InputMaybe<Scalars['mantle_Bytes']>;
  delegate_not?: InputMaybe<Scalars['mantle_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['mantle_Bytes']>;
  callData_not?: InputMaybe<Scalars['mantle_Bytes']>;
  callData_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  callData_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  callData_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  callData_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
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
  originSender?: InputMaybe<Scalars['mantle_Bytes']>;
  originSender_not?: InputMaybe<Scalars['mantle_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['mantle_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['mantle_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
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
  asset_?: InputMaybe<mantle_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['mantle_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['mantle_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['mantle_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['mantle_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['mantle_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['mantle_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['mantle_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['mantle_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['mantle_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['mantle_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['mantle_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['mantle_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mantle_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mantle_DestinationTransfer_filter>>>;
};

export type mantle_DestinationTransfer_orderBy =
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

export type mantle_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['mantle_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type mantle_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['mantle_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['mantle_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
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
  _change_block?: InputMaybe<mantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mantle_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mantle_OptimisticRootFinalized_filter>>>;
};

export type mantle_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type mantle_OrderDirection =
  | 'asc'
  | 'desc';

export type mantle_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['mantle_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['mantle_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['mantle_Bytes']>;
  root?: Maybe<Scalars['mantle_Bytes']>;
  transactionHash?: Maybe<Scalars['mantle_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<mantle_RootCount>;
};

export type mantle_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['mantle_Bytes']>;
  transferId_not?: InputMaybe<Scalars['mantle_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['mantle_Bytes']>;
  leaf_not?: InputMaybe<Scalars['mantle_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['mantle_Bytes']>;
  message_not?: InputMaybe<Scalars['mantle_Bytes']>;
  message_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  message_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  message_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  message_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  message_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  root?: InputMaybe<Scalars['mantle_Bytes']>;
  root_not?: InputMaybe<Scalars['mantle_Bytes']>;
  root_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  root_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  root_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  root_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  root_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
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
  rootCount_?: InputMaybe<mantle_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mantle_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mantle_OriginMessage_filter>>>;
};

export type mantle_OriginMessage_orderBy =
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

export type mantle_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['mantle_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<mantle_TransferStatus>;
  messageHash?: Maybe<Scalars['mantle_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['mantle_Bytes']>;
  delegate?: Maybe<Scalars['mantle_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['mantle_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['mantle_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['mantle_Bytes']>;
  asset?: Maybe<mantle_Asset>;
  transactingAsset?: Maybe<Scalars['mantle_Bytes']>;
  message?: Maybe<mantle_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<mantle_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['mantle_Bytes']>;
  caller?: Maybe<Scalars['mantle_Bytes']>;
  transactionHash?: Maybe<Scalars['mantle_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['mantle_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type mantle_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_RelayerFee_filter>;
};

export type mantle_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['mantle_Bytes']>;
  transferId_not?: InputMaybe<Scalars['mantle_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<mantle_TransferStatus>;
  status_not?: InputMaybe<mantle_TransferStatus>;
  status_in?: InputMaybe<Array<mantle_TransferStatus>>;
  status_not_in?: InputMaybe<Array<mantle_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['mantle_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['mantle_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
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
  to?: InputMaybe<Scalars['mantle_Bytes']>;
  to_not?: InputMaybe<Scalars['mantle_Bytes']>;
  to_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  to_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  to_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  to_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  to_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  delegate?: InputMaybe<Scalars['mantle_Bytes']>;
  delegate_not?: InputMaybe<Scalars['mantle_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['mantle_Bytes']>;
  callData_not?: InputMaybe<Scalars['mantle_Bytes']>;
  callData_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  callData_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  callData_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  callData_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['mantle_Bytes']>;
  originSender_not?: InputMaybe<Scalars['mantle_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['mantle_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['mantle_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
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
  asset_?: InputMaybe<mantle_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['mantle_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['mantle_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
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
  message_?: InputMaybe<mantle_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<mantle_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['mantle_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['mantle_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  caller?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_not?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['mantle_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['mantle_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mantle_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mantle_OriginTransfer_filter>>>;
};

export type mantle_OriginTransfer_orderBy =
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
  mantle_asset?: Maybe<mantle_Asset>;
  mantle_assets: Array<mantle_Asset>;
  mantle_assetStatus?: Maybe<mantle_AssetStatus>;
  mantle_assetStatuses: Array<mantle_AssetStatus>;
  mantle_assetBalance?: Maybe<mantle_AssetBalance>;
  mantle_assetBalances: Array<mantle_AssetBalance>;
  mantle_router?: Maybe<mantle_Router>;
  mantle_routers: Array<mantle_Router>;
  mantle_routerDailyTVL?: Maybe<mantle_RouterDailyTVL>;
  mantle_routerDailyTVLs: Array<mantle_RouterDailyTVL>;
  mantle_routerLiquidityEvent?: Maybe<mantle_RouterLiquidityEvent>;
  mantle_routerLiquidityEvents: Array<mantle_RouterLiquidityEvent>;
  mantle_setting?: Maybe<mantle_Setting>;
  mantle_settings: Array<mantle_Setting>;
  mantle_relayer?: Maybe<mantle_Relayer>;
  mantle_relayers: Array<mantle_Relayer>;
  mantle_sequencer?: Maybe<mantle_Sequencer>;
  mantle_sequencers: Array<mantle_Sequencer>;
  mantle_relayerFee?: Maybe<mantle_RelayerFee>;
  mantle_relayerFees: Array<mantle_RelayerFee>;
  mantle_originTransfer?: Maybe<mantle_OriginTransfer>;
  mantle_originTransfers: Array<mantle_OriginTransfer>;
  mantle_destinationTransfer?: Maybe<mantle_DestinationTransfer>;
  mantle_destinationTransfers: Array<mantle_DestinationTransfer>;
  mantle_originMessage?: Maybe<mantle_OriginMessage>;
  mantle_originMessages: Array<mantle_OriginMessage>;
  mantle_aggregateRoot?: Maybe<mantle_AggregateRoot>;
  mantle_aggregateRoots: Array<mantle_AggregateRoot>;
  mantle_connectorMeta?: Maybe<mantle_ConnectorMeta>;
  mantle_connectorMetas: Array<mantle_ConnectorMeta>;
  mantle_rootCount?: Maybe<mantle_RootCount>;
  mantle_rootCounts: Array<mantle_RootCount>;
  mantle_rootMessageSent?: Maybe<mantle_RootMessageSent>;
  mantle_rootMessageSents: Array<mantle_RootMessageSent>;
  mantle_relayerFeesIncrease?: Maybe<mantle_RelayerFeesIncrease>;
  mantle_relayerFeesIncreases: Array<mantle_RelayerFeesIncrease>;
  mantle_slippageUpdate?: Maybe<mantle_SlippageUpdate>;
  mantle_slippageUpdates: Array<mantle_SlippageUpdate>;
  mantle_snapshotRoot?: Maybe<mantle_SnapshotRoot>;
  mantle_snapshotRoots: Array<mantle_SnapshotRoot>;
  mantle_spokeConnectorMode?: Maybe<mantle_SpokeConnectorMode>;
  mantle_spokeConnectorModes: Array<mantle_SpokeConnectorMode>;
  mantle_aggregateRootProposed?: Maybe<mantle_AggregateRootProposed>;
  mantle_aggregateRootProposeds: Array<mantle_AggregateRootProposed>;
  mantle_optimisticRootFinalized?: Maybe<mantle_OptimisticRootFinalized>;
  mantle_optimisticRootFinalizeds: Array<mantle_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  mantle__meta?: Maybe<mantle__Meta_>;
};


export type Querymantle_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_Asset_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_Asset_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_AssetStatus_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_AssetBalance_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_Router_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_Router_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_RouterDailyTVL_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_RouterLiquidityEvent_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_Setting_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_Setting_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_Relayer_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_Relayer_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_Sequencer_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_Sequencer_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_RelayerFee_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_OriginTransfer_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_DestinationTransfer_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_OriginMessage_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_AggregateRoot_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_ConnectorMeta_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_RootCount_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_RootCount_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_RootMessageSent_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_RelayerFeesIncrease_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_SlippageUpdate_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_SnapshotRoot_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_SpokeConnectorMode_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_AggregateRootProposed_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_OptimisticRootFinalized_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymantle__metaArgs = {
  block?: InputMaybe<mantle_Block_height>;
};

export type mantle_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['mantle_Bytes']>;
};

export type mantle_RelayerFee = {
  id: Scalars['ID'];
  transfer: mantle_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['mantle_Bytes'];
};

export type mantle_RelayerFee_filter = {
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
  transfer_?: InputMaybe<mantle_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['mantle_Bytes']>;
  asset_not?: InputMaybe<Scalars['mantle_Bytes']>;
  asset_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  asset_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  asset_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  asset_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mantle_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mantle_RelayerFee_filter>>>;
};

export type mantle_RelayerFee_orderBy =
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

export type mantle_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: mantle_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['mantle_Bytes']>;
  caller: Scalars['mantle_Bytes'];
  transactionHash: Scalars['mantle_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type mantle_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<mantle_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['mantle_Bytes']>;
  asset_not?: InputMaybe<Scalars['mantle_Bytes']>;
  asset_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  asset_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  asset_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  asset_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  caller?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_not?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
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
  _change_block?: InputMaybe<mantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mantle_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mantle_RelayerFeesIncrease_filter>>>;
};

export type mantle_RelayerFeesIncrease_orderBy =
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

export type mantle_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['mantle_Bytes']>;
  relayer_not?: InputMaybe<Scalars['mantle_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mantle_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mantle_Relayer_filter>>>;
};

export type mantle_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type mantle_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type mantle_RootCount_filter = {
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
  _change_block?: InputMaybe<mantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mantle_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mantle_RootCount_filter>>>;
};

export type mantle_RootCount_orderBy =
  | 'id'
  | 'count';

export type mantle_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['mantle_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['mantle_Bytes']>;
  transactionHash?: Maybe<Scalars['mantle_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type mantle_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['mantle_Bytes']>;
  root_not?: InputMaybe<Scalars['mantle_Bytes']>;
  root_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  root_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  root_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  root_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  root_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_not?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
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
  _change_block?: InputMaybe<mantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mantle_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mantle_RootMessageSent_filter>>>;
};

export type mantle_RootMessageSent_orderBy =
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

export type mantle_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['mantle_Bytes']>;
  recipient?: Maybe<Scalars['mantle_Bytes']>;
  proposedOwner?: Maybe<Scalars['mantle_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<mantle_AssetBalance>;
};


export type mantle_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_AssetBalance_filter>;
};

export type mantle_RouterDailyTVL = {
  id: Scalars['ID'];
  router: mantle_Router;
  asset: mantle_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type mantle_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<mantle_Router_filter>;
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
  asset_?: InputMaybe<mantle_Asset_filter>;
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
  _change_block?: InputMaybe<mantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mantle_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mantle_RouterDailyTVL_filter>>>;
};

export type mantle_RouterDailyTVL_orderBy =
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

export type mantle_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<mantle_RouterLiquidityEventType>;
  router: mantle_Router;
  asset: mantle_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['mantle_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['mantle_Bytes'];
  nonce: Scalars['BigInt'];
};

export type mantle_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type mantle_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<mantle_RouterLiquidityEventType>;
  type_not?: InputMaybe<mantle_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<mantle_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<mantle_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<mantle_Router_filter>;
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
  asset_?: InputMaybe<mantle_Asset_filter>;
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
  caller?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_not?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mantle_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mantle_RouterLiquidityEvent_filter>>>;
};

export type mantle_RouterLiquidityEvent_orderBy =
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

export type mantle_Router_filter = {
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
  owner?: InputMaybe<Scalars['mantle_Bytes']>;
  owner_not?: InputMaybe<Scalars['mantle_Bytes']>;
  owner_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  owner_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  owner_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  owner_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  recipient?: InputMaybe<Scalars['mantle_Bytes']>;
  recipient_not?: InputMaybe<Scalars['mantle_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['mantle_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['mantle_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<mantle_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mantle_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mantle_Router_filter>>>;
};

export type mantle_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type mantle_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['mantle_Bytes']>;
};

export type mantle_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['mantle_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['mantle_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mantle_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mantle_Sequencer_filter>>>;
};

export type mantle_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type mantle_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['mantle_Bytes'];
};

export type mantle_Setting_filter = {
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
  caller?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_not?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mantle_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mantle_Setting_filter>>>;
};

export type mantle_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type mantle_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: mantle_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['mantle_Bytes'];
  transactionHash: Scalars['mantle_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type mantle_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<mantle_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_not?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
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
  _change_block?: InputMaybe<mantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mantle_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mantle_SlippageUpdate_filter>>>;
};

export type mantle_SlippageUpdate_orderBy =
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

export type mantle_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['mantle_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type mantle_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['mantle_Bytes']>;
  root_not?: InputMaybe<Scalars['mantle_Bytes']>;
  root_gt?: InputMaybe<Scalars['mantle_Bytes']>;
  root_lt?: InputMaybe<Scalars['mantle_Bytes']>;
  root_gte?: InputMaybe<Scalars['mantle_Bytes']>;
  root_lte?: InputMaybe<Scalars['mantle_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['mantle_Bytes']>>;
  root_contains?: InputMaybe<Scalars['mantle_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['mantle_Bytes']>;
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
  _change_block?: InputMaybe<mantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mantle_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mantle_SnapshotRoot_filter>>>;
};

export type mantle_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type mantle_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type mantle_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<mantle_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mantle_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mantle_SpokeConnectorMode_filter>>>;
};

export type mantle_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  mantle_asset?: Maybe<mantle_Asset>;
  mantle_assets: Array<mantle_Asset>;
  mantle_assetStatus?: Maybe<mantle_AssetStatus>;
  mantle_assetStatuses: Array<mantle_AssetStatus>;
  mantle_assetBalance?: Maybe<mantle_AssetBalance>;
  mantle_assetBalances: Array<mantle_AssetBalance>;
  mantle_router?: Maybe<mantle_Router>;
  mantle_routers: Array<mantle_Router>;
  mantle_routerDailyTVL?: Maybe<mantle_RouterDailyTVL>;
  mantle_routerDailyTVLs: Array<mantle_RouterDailyTVL>;
  mantle_routerLiquidityEvent?: Maybe<mantle_RouterLiquidityEvent>;
  mantle_routerLiquidityEvents: Array<mantle_RouterLiquidityEvent>;
  mantle_setting?: Maybe<mantle_Setting>;
  mantle_settings: Array<mantle_Setting>;
  mantle_relayer?: Maybe<mantle_Relayer>;
  mantle_relayers: Array<mantle_Relayer>;
  mantle_sequencer?: Maybe<mantle_Sequencer>;
  mantle_sequencers: Array<mantle_Sequencer>;
  mantle_relayerFee?: Maybe<mantle_RelayerFee>;
  mantle_relayerFees: Array<mantle_RelayerFee>;
  mantle_originTransfer?: Maybe<mantle_OriginTransfer>;
  mantle_originTransfers: Array<mantle_OriginTransfer>;
  mantle_destinationTransfer?: Maybe<mantle_DestinationTransfer>;
  mantle_destinationTransfers: Array<mantle_DestinationTransfer>;
  mantle_originMessage?: Maybe<mantle_OriginMessage>;
  mantle_originMessages: Array<mantle_OriginMessage>;
  mantle_aggregateRoot?: Maybe<mantle_AggregateRoot>;
  mantle_aggregateRoots: Array<mantle_AggregateRoot>;
  mantle_connectorMeta?: Maybe<mantle_ConnectorMeta>;
  mantle_connectorMetas: Array<mantle_ConnectorMeta>;
  mantle_rootCount?: Maybe<mantle_RootCount>;
  mantle_rootCounts: Array<mantle_RootCount>;
  mantle_rootMessageSent?: Maybe<mantle_RootMessageSent>;
  mantle_rootMessageSents: Array<mantle_RootMessageSent>;
  mantle_relayerFeesIncrease?: Maybe<mantle_RelayerFeesIncrease>;
  mantle_relayerFeesIncreases: Array<mantle_RelayerFeesIncrease>;
  mantle_slippageUpdate?: Maybe<mantle_SlippageUpdate>;
  mantle_slippageUpdates: Array<mantle_SlippageUpdate>;
  mantle_snapshotRoot?: Maybe<mantle_SnapshotRoot>;
  mantle_snapshotRoots: Array<mantle_SnapshotRoot>;
  mantle_spokeConnectorMode?: Maybe<mantle_SpokeConnectorMode>;
  mantle_spokeConnectorModes: Array<mantle_SpokeConnectorMode>;
  mantle_aggregateRootProposed?: Maybe<mantle_AggregateRootProposed>;
  mantle_aggregateRootProposeds: Array<mantle_AggregateRootProposed>;
  mantle_optimisticRootFinalized?: Maybe<mantle_OptimisticRootFinalized>;
  mantle_optimisticRootFinalizeds: Array<mantle_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  mantle__meta?: Maybe<mantle__Meta_>;
};


export type Subscriptionmantle_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_Asset_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_Asset_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_AssetStatus_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_AssetBalance_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_Router_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_Router_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_RouterDailyTVL_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_RouterLiquidityEvent_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_Setting_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_Setting_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_Relayer_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_Relayer_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_Sequencer_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_Sequencer_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_RelayerFee_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_OriginTransfer_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_DestinationTransfer_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_OriginMessage_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_AggregateRoot_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_ConnectorMeta_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_RootCount_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_RootCount_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_RootMessageSent_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_RelayerFeesIncrease_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_SlippageUpdate_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_SnapshotRoot_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_SpokeConnectorMode_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_AggregateRootProposed_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mantle_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<mantle_OrderDirection>;
  where?: InputMaybe<mantle_OptimisticRootFinalized_filter>;
  block?: InputMaybe<mantle_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmantle__metaArgs = {
  block?: InputMaybe<mantle_Block_height>;
};

export type mantle_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type mantle__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['mantle_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['mantle_Bytes']>;
};

/** The type for the top-level _meta field */
export type mantle__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: mantle__Block_;
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
  mantle_asset: InContextSdkMethod<Query['mantle_asset'], Querymantle_assetArgs, MeshContext>,
  /** null **/
  mantle_assets: InContextSdkMethod<Query['mantle_assets'], Querymantle_assetsArgs, MeshContext>,
  /** null **/
  mantle_assetStatus: InContextSdkMethod<Query['mantle_assetStatus'], Querymantle_assetStatusArgs, MeshContext>,
  /** null **/
  mantle_assetStatuses: InContextSdkMethod<Query['mantle_assetStatuses'], Querymantle_assetStatusesArgs, MeshContext>,
  /** null **/
  mantle_assetBalance: InContextSdkMethod<Query['mantle_assetBalance'], Querymantle_assetBalanceArgs, MeshContext>,
  /** null **/
  mantle_assetBalances: InContextSdkMethod<Query['mantle_assetBalances'], Querymantle_assetBalancesArgs, MeshContext>,
  /** null **/
  mantle_router: InContextSdkMethod<Query['mantle_router'], Querymantle_routerArgs, MeshContext>,
  /** null **/
  mantle_routers: InContextSdkMethod<Query['mantle_routers'], Querymantle_routersArgs, MeshContext>,
  /** null **/
  mantle_routerDailyTVL: InContextSdkMethod<Query['mantle_routerDailyTVL'], Querymantle_routerDailyTVLArgs, MeshContext>,
  /** null **/
  mantle_routerDailyTVLs: InContextSdkMethod<Query['mantle_routerDailyTVLs'], Querymantle_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  mantle_routerLiquidityEvent: InContextSdkMethod<Query['mantle_routerLiquidityEvent'], Querymantle_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  mantle_routerLiquidityEvents: InContextSdkMethod<Query['mantle_routerLiquidityEvents'], Querymantle_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  mantle_setting: InContextSdkMethod<Query['mantle_setting'], Querymantle_settingArgs, MeshContext>,
  /** null **/
  mantle_settings: InContextSdkMethod<Query['mantle_settings'], Querymantle_settingsArgs, MeshContext>,
  /** null **/
  mantle_relayer: InContextSdkMethod<Query['mantle_relayer'], Querymantle_relayerArgs, MeshContext>,
  /** null **/
  mantle_relayers: InContextSdkMethod<Query['mantle_relayers'], Querymantle_relayersArgs, MeshContext>,
  /** null **/
  mantle_sequencer: InContextSdkMethod<Query['mantle_sequencer'], Querymantle_sequencerArgs, MeshContext>,
  /** null **/
  mantle_sequencers: InContextSdkMethod<Query['mantle_sequencers'], Querymantle_sequencersArgs, MeshContext>,
  /** null **/
  mantle_relayerFee: InContextSdkMethod<Query['mantle_relayerFee'], Querymantle_relayerFeeArgs, MeshContext>,
  /** null **/
  mantle_relayerFees: InContextSdkMethod<Query['mantle_relayerFees'], Querymantle_relayerFeesArgs, MeshContext>,
  /** null **/
  mantle_originTransfer: InContextSdkMethod<Query['mantle_originTransfer'], Querymantle_originTransferArgs, MeshContext>,
  /** null **/
  mantle_originTransfers: InContextSdkMethod<Query['mantle_originTransfers'], Querymantle_originTransfersArgs, MeshContext>,
  /** null **/
  mantle_destinationTransfer: InContextSdkMethod<Query['mantle_destinationTransfer'], Querymantle_destinationTransferArgs, MeshContext>,
  /** null **/
  mantle_destinationTransfers: InContextSdkMethod<Query['mantle_destinationTransfers'], Querymantle_destinationTransfersArgs, MeshContext>,
  /** null **/
  mantle_originMessage: InContextSdkMethod<Query['mantle_originMessage'], Querymantle_originMessageArgs, MeshContext>,
  /** null **/
  mantle_originMessages: InContextSdkMethod<Query['mantle_originMessages'], Querymantle_originMessagesArgs, MeshContext>,
  /** null **/
  mantle_aggregateRoot: InContextSdkMethod<Query['mantle_aggregateRoot'], Querymantle_aggregateRootArgs, MeshContext>,
  /** null **/
  mantle_aggregateRoots: InContextSdkMethod<Query['mantle_aggregateRoots'], Querymantle_aggregateRootsArgs, MeshContext>,
  /** null **/
  mantle_connectorMeta: InContextSdkMethod<Query['mantle_connectorMeta'], Querymantle_connectorMetaArgs, MeshContext>,
  /** null **/
  mantle_connectorMetas: InContextSdkMethod<Query['mantle_connectorMetas'], Querymantle_connectorMetasArgs, MeshContext>,
  /** null **/
  mantle_rootCount: InContextSdkMethod<Query['mantle_rootCount'], Querymantle_rootCountArgs, MeshContext>,
  /** null **/
  mantle_rootCounts: InContextSdkMethod<Query['mantle_rootCounts'], Querymantle_rootCountsArgs, MeshContext>,
  /** null **/
  mantle_rootMessageSent: InContextSdkMethod<Query['mantle_rootMessageSent'], Querymantle_rootMessageSentArgs, MeshContext>,
  /** null **/
  mantle_rootMessageSents: InContextSdkMethod<Query['mantle_rootMessageSents'], Querymantle_rootMessageSentsArgs, MeshContext>,
  /** null **/
  mantle_relayerFeesIncrease: InContextSdkMethod<Query['mantle_relayerFeesIncrease'], Querymantle_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  mantle_relayerFeesIncreases: InContextSdkMethod<Query['mantle_relayerFeesIncreases'], Querymantle_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  mantle_slippageUpdate: InContextSdkMethod<Query['mantle_slippageUpdate'], Querymantle_slippageUpdateArgs, MeshContext>,
  /** null **/
  mantle_slippageUpdates: InContextSdkMethod<Query['mantle_slippageUpdates'], Querymantle_slippageUpdatesArgs, MeshContext>,
  /** null **/
  mantle_snapshotRoot: InContextSdkMethod<Query['mantle_snapshotRoot'], Querymantle_snapshotRootArgs, MeshContext>,
  /** null **/
  mantle_snapshotRoots: InContextSdkMethod<Query['mantle_snapshotRoots'], Querymantle_snapshotRootsArgs, MeshContext>,
  /** null **/
  mantle_spokeConnectorMode: InContextSdkMethod<Query['mantle_spokeConnectorMode'], Querymantle_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  mantle_spokeConnectorModes: InContextSdkMethod<Query['mantle_spokeConnectorModes'], Querymantle_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  mantle_aggregateRootProposed: InContextSdkMethod<Query['mantle_aggregateRootProposed'], Querymantle_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  mantle_aggregateRootProposeds: InContextSdkMethod<Query['mantle_aggregateRootProposeds'], Querymantle_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  mantle_optimisticRootFinalized: InContextSdkMethod<Query['mantle_optimisticRootFinalized'], Querymantle_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  mantle_optimisticRootFinalizeds: InContextSdkMethod<Query['mantle_optimisticRootFinalizeds'], Querymantle_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  mantle__meta: InContextSdkMethod<Query['mantle__meta'], Querymantle__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  mantle_asset: InContextSdkMethod<Subscription['mantle_asset'], Subscriptionmantle_assetArgs, MeshContext>,
  /** null **/
  mantle_assets: InContextSdkMethod<Subscription['mantle_assets'], Subscriptionmantle_assetsArgs, MeshContext>,
  /** null **/
  mantle_assetStatus: InContextSdkMethod<Subscription['mantle_assetStatus'], Subscriptionmantle_assetStatusArgs, MeshContext>,
  /** null **/
  mantle_assetStatuses: InContextSdkMethod<Subscription['mantle_assetStatuses'], Subscriptionmantle_assetStatusesArgs, MeshContext>,
  /** null **/
  mantle_assetBalance: InContextSdkMethod<Subscription['mantle_assetBalance'], Subscriptionmantle_assetBalanceArgs, MeshContext>,
  /** null **/
  mantle_assetBalances: InContextSdkMethod<Subscription['mantle_assetBalances'], Subscriptionmantle_assetBalancesArgs, MeshContext>,
  /** null **/
  mantle_router: InContextSdkMethod<Subscription['mantle_router'], Subscriptionmantle_routerArgs, MeshContext>,
  /** null **/
  mantle_routers: InContextSdkMethod<Subscription['mantle_routers'], Subscriptionmantle_routersArgs, MeshContext>,
  /** null **/
  mantle_routerDailyTVL: InContextSdkMethod<Subscription['mantle_routerDailyTVL'], Subscriptionmantle_routerDailyTVLArgs, MeshContext>,
  /** null **/
  mantle_routerDailyTVLs: InContextSdkMethod<Subscription['mantle_routerDailyTVLs'], Subscriptionmantle_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  mantle_routerLiquidityEvent: InContextSdkMethod<Subscription['mantle_routerLiquidityEvent'], Subscriptionmantle_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  mantle_routerLiquidityEvents: InContextSdkMethod<Subscription['mantle_routerLiquidityEvents'], Subscriptionmantle_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  mantle_setting: InContextSdkMethod<Subscription['mantle_setting'], Subscriptionmantle_settingArgs, MeshContext>,
  /** null **/
  mantle_settings: InContextSdkMethod<Subscription['mantle_settings'], Subscriptionmantle_settingsArgs, MeshContext>,
  /** null **/
  mantle_relayer: InContextSdkMethod<Subscription['mantle_relayer'], Subscriptionmantle_relayerArgs, MeshContext>,
  /** null **/
  mantle_relayers: InContextSdkMethod<Subscription['mantle_relayers'], Subscriptionmantle_relayersArgs, MeshContext>,
  /** null **/
  mantle_sequencer: InContextSdkMethod<Subscription['mantle_sequencer'], Subscriptionmantle_sequencerArgs, MeshContext>,
  /** null **/
  mantle_sequencers: InContextSdkMethod<Subscription['mantle_sequencers'], Subscriptionmantle_sequencersArgs, MeshContext>,
  /** null **/
  mantle_relayerFee: InContextSdkMethod<Subscription['mantle_relayerFee'], Subscriptionmantle_relayerFeeArgs, MeshContext>,
  /** null **/
  mantle_relayerFees: InContextSdkMethod<Subscription['mantle_relayerFees'], Subscriptionmantle_relayerFeesArgs, MeshContext>,
  /** null **/
  mantle_originTransfer: InContextSdkMethod<Subscription['mantle_originTransfer'], Subscriptionmantle_originTransferArgs, MeshContext>,
  /** null **/
  mantle_originTransfers: InContextSdkMethod<Subscription['mantle_originTransfers'], Subscriptionmantle_originTransfersArgs, MeshContext>,
  /** null **/
  mantle_destinationTransfer: InContextSdkMethod<Subscription['mantle_destinationTransfer'], Subscriptionmantle_destinationTransferArgs, MeshContext>,
  /** null **/
  mantle_destinationTransfers: InContextSdkMethod<Subscription['mantle_destinationTransfers'], Subscriptionmantle_destinationTransfersArgs, MeshContext>,
  /** null **/
  mantle_originMessage: InContextSdkMethod<Subscription['mantle_originMessage'], Subscriptionmantle_originMessageArgs, MeshContext>,
  /** null **/
  mantle_originMessages: InContextSdkMethod<Subscription['mantle_originMessages'], Subscriptionmantle_originMessagesArgs, MeshContext>,
  /** null **/
  mantle_aggregateRoot: InContextSdkMethod<Subscription['mantle_aggregateRoot'], Subscriptionmantle_aggregateRootArgs, MeshContext>,
  /** null **/
  mantle_aggregateRoots: InContextSdkMethod<Subscription['mantle_aggregateRoots'], Subscriptionmantle_aggregateRootsArgs, MeshContext>,
  /** null **/
  mantle_connectorMeta: InContextSdkMethod<Subscription['mantle_connectorMeta'], Subscriptionmantle_connectorMetaArgs, MeshContext>,
  /** null **/
  mantle_connectorMetas: InContextSdkMethod<Subscription['mantle_connectorMetas'], Subscriptionmantle_connectorMetasArgs, MeshContext>,
  /** null **/
  mantle_rootCount: InContextSdkMethod<Subscription['mantle_rootCount'], Subscriptionmantle_rootCountArgs, MeshContext>,
  /** null **/
  mantle_rootCounts: InContextSdkMethod<Subscription['mantle_rootCounts'], Subscriptionmantle_rootCountsArgs, MeshContext>,
  /** null **/
  mantle_rootMessageSent: InContextSdkMethod<Subscription['mantle_rootMessageSent'], Subscriptionmantle_rootMessageSentArgs, MeshContext>,
  /** null **/
  mantle_rootMessageSents: InContextSdkMethod<Subscription['mantle_rootMessageSents'], Subscriptionmantle_rootMessageSentsArgs, MeshContext>,
  /** null **/
  mantle_relayerFeesIncrease: InContextSdkMethod<Subscription['mantle_relayerFeesIncrease'], Subscriptionmantle_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  mantle_relayerFeesIncreases: InContextSdkMethod<Subscription['mantle_relayerFeesIncreases'], Subscriptionmantle_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  mantle_slippageUpdate: InContextSdkMethod<Subscription['mantle_slippageUpdate'], Subscriptionmantle_slippageUpdateArgs, MeshContext>,
  /** null **/
  mantle_slippageUpdates: InContextSdkMethod<Subscription['mantle_slippageUpdates'], Subscriptionmantle_slippageUpdatesArgs, MeshContext>,
  /** null **/
  mantle_snapshotRoot: InContextSdkMethod<Subscription['mantle_snapshotRoot'], Subscriptionmantle_snapshotRootArgs, MeshContext>,
  /** null **/
  mantle_snapshotRoots: InContextSdkMethod<Subscription['mantle_snapshotRoots'], Subscriptionmantle_snapshotRootsArgs, MeshContext>,
  /** null **/
  mantle_spokeConnectorMode: InContextSdkMethod<Subscription['mantle_spokeConnectorMode'], Subscriptionmantle_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  mantle_spokeConnectorModes: InContextSdkMethod<Subscription['mantle_spokeConnectorModes'], Subscriptionmantle_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  mantle_aggregateRootProposed: InContextSdkMethod<Subscription['mantle_aggregateRootProposed'], Subscriptionmantle_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  mantle_aggregateRootProposeds: InContextSdkMethod<Subscription['mantle_aggregateRootProposeds'], Subscriptionmantle_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  mantle_optimisticRootFinalized: InContextSdkMethod<Subscription['mantle_optimisticRootFinalized'], Subscriptionmantle_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  mantle_optimisticRootFinalizeds: InContextSdkMethod<Subscription['mantle_optimisticRootFinalizeds'], Subscriptionmantle_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  mantle__meta: InContextSdkMethod<Subscription['mantle__meta'], Subscriptionmantle__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Mantle"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
