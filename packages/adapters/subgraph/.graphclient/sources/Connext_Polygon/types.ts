// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextPolygonTypes {
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
  polygon_BigDecimal: any;
  BigInt: any;
  polygon_Bytes: any;
  polygon_Int8: any;
  Timestamp: any;
};

export type polygon_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['polygon_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type polygon_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['polygon_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type polygon_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['polygon_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['polygon_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygon_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygon_AggregateRootProposed_filter>>>;
};

export type polygon_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type polygon_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['polygon_Bytes']>;
  root_not?: InputMaybe<Scalars['polygon_Bytes']>;
  root_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  root_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  root_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  root_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  root_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygon_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygon_AggregateRoot_filter>>>;
};

export type polygon_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type polygon_Aggregation_interval =
  | 'hour'
  | 'day';

export type polygon_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['polygon_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['polygon_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['polygon_Bytes']>;
  localAsset?: Maybe<Scalars['polygon_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<polygon_AssetStatus>;
};

export type polygon_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: polygon_Router;
  asset: polygon_Asset;
  feesEarned: Scalars['BigInt'];
};

export type polygon_AssetBalance_filter = {
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
  router_?: InputMaybe<polygon_Router_filter>;
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
  asset_?: InputMaybe<polygon_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygon_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygon_AssetBalance_filter>>>;
};

export type polygon_AssetBalance_orderBy =
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

export type polygon_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type polygon_AssetStatus_filter = {
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
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygon_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygon_AssetStatus_filter>>>;
};

export type polygon_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type polygon_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['polygon_Bytes']>;
  key_not?: InputMaybe<Scalars['polygon_Bytes']>;
  key_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  key_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  key_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  key_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  key_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['polygon_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['polygon_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  localAsset?: InputMaybe<Scalars['polygon_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['polygon_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  status_?: InputMaybe<polygon_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygon_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygon_Asset_filter>>>;
};

export type polygon_Asset_orderBy =
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

export type polygon_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type polygon_Block_height = {
  hash?: InputMaybe<Scalars['polygon_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type polygon_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['polygon_Bytes']>;
  rootManager?: Maybe<Scalars['polygon_Bytes']>;
  mirrorConnector?: Maybe<Scalars['polygon_Bytes']>;
};

export type polygon_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['polygon_Bytes']>;
  amb_not?: InputMaybe<Scalars['polygon_Bytes']>;
  amb_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  amb_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  amb_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  amb_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  rootManager?: InputMaybe<Scalars['polygon_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['polygon_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['polygon_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['polygon_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygon_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygon_ConnectorMeta_filter>>>;
};

export type polygon_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type polygon_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['polygon_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<polygon_TransferStatus>;
  routers?: Maybe<Array<polygon_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['polygon_Bytes']>;
  delegate?: Maybe<Scalars['polygon_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['polygon_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['polygon_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['polygon_Bytes']>;
  asset?: Maybe<polygon_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['polygon_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['polygon_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['polygon_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['polygon_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['polygon_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['polygon_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type polygon_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_Router_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_Router_filter>;
};

export type polygon_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_not?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<polygon_TransferStatus>;
  status_not?: InputMaybe<polygon_TransferStatus>;
  status_in?: InputMaybe<Array<polygon_TransferStatus>>;
  status_not_in?: InputMaybe<Array<polygon_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<polygon_Router_filter>;
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
  to?: InputMaybe<Scalars['polygon_Bytes']>;
  to_not?: InputMaybe<Scalars['polygon_Bytes']>;
  to_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  to_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  to_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  to_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  to_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate_not?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['polygon_Bytes']>;
  callData_not?: InputMaybe<Scalars['polygon_Bytes']>;
  callData_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  callData_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  callData_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  callData_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  originSender?: InputMaybe<Scalars['polygon_Bytes']>;
  originSender_not?: InputMaybe<Scalars['polygon_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  asset_?: InputMaybe<polygon_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['polygon_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['polygon_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['polygon_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['polygon_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['polygon_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['polygon_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygon_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygon_DestinationTransfer_filter>>>;
};

export type polygon_DestinationTransfer_orderBy =
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

export type polygon_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['polygon_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type polygon_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['polygon_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['polygon_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygon_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygon_OptimisticRootFinalized_filter>>>;
};

export type polygon_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type polygon_OrderDirection =
  | 'asc'
  | 'desc';

export type polygon_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['polygon_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['polygon_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['polygon_Bytes']>;
  root?: Maybe<Scalars['polygon_Bytes']>;
  transactionHash?: Maybe<Scalars['polygon_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<polygon_RootCount>;
};

export type polygon_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_not?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['polygon_Bytes']>;
  leaf_not?: InputMaybe<Scalars['polygon_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['polygon_Bytes']>;
  message_not?: InputMaybe<Scalars['polygon_Bytes']>;
  message_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  message_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  message_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  message_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  message_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  root?: InputMaybe<Scalars['polygon_Bytes']>;
  root_not?: InputMaybe<Scalars['polygon_Bytes']>;
  root_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  root_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  root_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  root_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  root_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  rootCount_?: InputMaybe<polygon_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygon_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygon_OriginMessage_filter>>>;
};

export type polygon_OriginMessage_orderBy =
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

export type polygon_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['polygon_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<polygon_TransferStatus>;
  messageHash?: Maybe<Scalars['polygon_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['polygon_Bytes']>;
  delegate?: Maybe<Scalars['polygon_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['polygon_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['polygon_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['polygon_Bytes']>;
  asset?: Maybe<polygon_Asset>;
  transactingAsset?: Maybe<Scalars['polygon_Bytes']>;
  message?: Maybe<polygon_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<polygon_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['polygon_Bytes']>;
  caller?: Maybe<Scalars['polygon_Bytes']>;
  transactionHash?: Maybe<Scalars['polygon_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['polygon_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type polygon_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_RelayerFee_filter>;
};

export type polygon_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_not?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<polygon_TransferStatus>;
  status_not?: InputMaybe<polygon_TransferStatus>;
  status_in?: InputMaybe<Array<polygon_TransferStatus>>;
  status_not_in?: InputMaybe<Array<polygon_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['polygon_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['polygon_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  to?: InputMaybe<Scalars['polygon_Bytes']>;
  to_not?: InputMaybe<Scalars['polygon_Bytes']>;
  to_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  to_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  to_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  to_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  to_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate_not?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['polygon_Bytes']>;
  callData_not?: InputMaybe<Scalars['polygon_Bytes']>;
  callData_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  callData_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  callData_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  callData_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['polygon_Bytes']>;
  originSender_not?: InputMaybe<Scalars['polygon_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  asset_?: InputMaybe<polygon_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['polygon_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['polygon_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  message_?: InputMaybe<polygon_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<polygon_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['polygon_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['polygon_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  caller?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_not?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['polygon_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['polygon_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygon_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygon_OriginTransfer_filter>>>;
};

export type polygon_OriginTransfer_orderBy =
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
  polygon_asset?: Maybe<polygon_Asset>;
  polygon_assets: Array<polygon_Asset>;
  polygon_assetStatus?: Maybe<polygon_AssetStatus>;
  polygon_assetStatuses: Array<polygon_AssetStatus>;
  polygon_assetBalance?: Maybe<polygon_AssetBalance>;
  polygon_assetBalances: Array<polygon_AssetBalance>;
  polygon_router?: Maybe<polygon_Router>;
  polygon_routers: Array<polygon_Router>;
  polygon_routerDailyTVL?: Maybe<polygon_RouterDailyTVL>;
  polygon_routerDailyTVLs: Array<polygon_RouterDailyTVL>;
  polygon_routerLiquidityEvent?: Maybe<polygon_RouterLiquidityEvent>;
  polygon_routerLiquidityEvents: Array<polygon_RouterLiquidityEvent>;
  polygon_setting?: Maybe<polygon_Setting>;
  polygon_settings: Array<polygon_Setting>;
  polygon_relayer?: Maybe<polygon_Relayer>;
  polygon_relayers: Array<polygon_Relayer>;
  polygon_sequencer?: Maybe<polygon_Sequencer>;
  polygon_sequencers: Array<polygon_Sequencer>;
  polygon_relayerFee?: Maybe<polygon_RelayerFee>;
  polygon_relayerFees: Array<polygon_RelayerFee>;
  polygon_originTransfer?: Maybe<polygon_OriginTransfer>;
  polygon_originTransfers: Array<polygon_OriginTransfer>;
  polygon_destinationTransfer?: Maybe<polygon_DestinationTransfer>;
  polygon_destinationTransfers: Array<polygon_DestinationTransfer>;
  polygon_originMessage?: Maybe<polygon_OriginMessage>;
  polygon_originMessages: Array<polygon_OriginMessage>;
  polygon_aggregateRoot?: Maybe<polygon_AggregateRoot>;
  polygon_aggregateRoots: Array<polygon_AggregateRoot>;
  polygon_connectorMeta?: Maybe<polygon_ConnectorMeta>;
  polygon_connectorMetas: Array<polygon_ConnectorMeta>;
  polygon_rootCount?: Maybe<polygon_RootCount>;
  polygon_rootCounts: Array<polygon_RootCount>;
  polygon_rootMessageSent?: Maybe<polygon_RootMessageSent>;
  polygon_rootMessageSents: Array<polygon_RootMessageSent>;
  polygon_relayerFeesIncrease?: Maybe<polygon_RelayerFeesIncrease>;
  polygon_relayerFeesIncreases: Array<polygon_RelayerFeesIncrease>;
  polygon_slippageUpdate?: Maybe<polygon_SlippageUpdate>;
  polygon_slippageUpdates: Array<polygon_SlippageUpdate>;
  polygon_snapshotRoot?: Maybe<polygon_SnapshotRoot>;
  polygon_snapshotRoots: Array<polygon_SnapshotRoot>;
  polygon_spokeConnectorMode?: Maybe<polygon_SpokeConnectorMode>;
  polygon_spokeConnectorModes: Array<polygon_SpokeConnectorMode>;
  polygon_aggregateRootProposed?: Maybe<polygon_AggregateRootProposed>;
  polygon_aggregateRootProposeds: Array<polygon_AggregateRootProposed>;
  polygon_optimisticRootFinalized?: Maybe<polygon_OptimisticRootFinalized>;
  polygon_optimisticRootFinalizeds: Array<polygon_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  polygon__meta?: Maybe<polygon__Meta_>;
};


export type Querypolygon_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_Asset_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_Asset_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_AssetStatus_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_AssetBalance_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_Router_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_Router_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_RouterDailyTVL_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_RouterLiquidityEvent_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_Setting_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_Setting_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_Relayer_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_Relayer_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_Sequencer_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_Sequencer_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_RelayerFee_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_OriginTransfer_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_DestinationTransfer_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_OriginMessage_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_AggregateRoot_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_ConnectorMeta_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_RootCount_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_RootCount_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_RootMessageSent_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_RelayerFeesIncrease_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_SlippageUpdate_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_SnapshotRoot_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_SpokeConnectorMode_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_AggregateRootProposed_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_OptimisticRootFinalized_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon__metaArgs = {
  block?: InputMaybe<polygon_Block_height>;
};

export type polygon_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['polygon_Bytes']>;
};

export type polygon_RelayerFee = {
  id: Scalars['ID'];
  transfer: polygon_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['polygon_Bytes'];
};

export type polygon_RelayerFee_filter = {
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
  transfer_?: InputMaybe<polygon_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_not?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygon_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygon_RelayerFee_filter>>>;
};

export type polygon_RelayerFee_orderBy =
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

export type polygon_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: polygon_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['polygon_Bytes']>;
  caller: Scalars['polygon_Bytes'];
  transactionHash: Scalars['polygon_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type polygon_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<polygon_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_not?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  caller?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_not?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygon_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygon_RelayerFeesIncrease_filter>>>;
};

export type polygon_RelayerFeesIncrease_orderBy =
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

export type polygon_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['polygon_Bytes']>;
  relayer_not?: InputMaybe<Scalars['polygon_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygon_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygon_Relayer_filter>>>;
};

export type polygon_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type polygon_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type polygon_RootCount_filter = {
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
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygon_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygon_RootCount_filter>>>;
};

export type polygon_RootCount_orderBy =
  | 'id'
  | 'count';

export type polygon_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['polygon_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['polygon_Bytes']>;
  transactionHash?: Maybe<Scalars['polygon_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type polygon_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['polygon_Bytes']>;
  root_not?: InputMaybe<Scalars['polygon_Bytes']>;
  root_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  root_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  root_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  root_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  root_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_not?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygon_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygon_RootMessageSent_filter>>>;
};

export type polygon_RootMessageSent_orderBy =
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

export type polygon_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['polygon_Bytes']>;
  recipient?: Maybe<Scalars['polygon_Bytes']>;
  proposedOwner?: Maybe<Scalars['polygon_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<polygon_AssetBalance>;
};


export type polygon_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_AssetBalance_filter>;
};

export type polygon_RouterDailyTVL = {
  id: Scalars['ID'];
  router: polygon_Router;
  asset: polygon_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type polygon_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<polygon_Router_filter>;
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
  asset_?: InputMaybe<polygon_Asset_filter>;
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
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygon_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygon_RouterDailyTVL_filter>>>;
};

export type polygon_RouterDailyTVL_orderBy =
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

export type polygon_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<polygon_RouterLiquidityEventType>;
  router: polygon_Router;
  asset: polygon_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['polygon_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['polygon_Bytes'];
  nonce: Scalars['BigInt'];
};

export type polygon_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type polygon_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<polygon_RouterLiquidityEventType>;
  type_not?: InputMaybe<polygon_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<polygon_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<polygon_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<polygon_Router_filter>;
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
  asset_?: InputMaybe<polygon_Asset_filter>;
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
  caller?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_not?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygon_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygon_RouterLiquidityEvent_filter>>>;
};

export type polygon_RouterLiquidityEvent_orderBy =
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

export type polygon_Router_filter = {
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
  owner?: InputMaybe<Scalars['polygon_Bytes']>;
  owner_not?: InputMaybe<Scalars['polygon_Bytes']>;
  owner_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  owner_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  owner_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  owner_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  recipient?: InputMaybe<Scalars['polygon_Bytes']>;
  recipient_not?: InputMaybe<Scalars['polygon_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['polygon_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['polygon_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<polygon_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygon_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygon_Router_filter>>>;
};

export type polygon_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type polygon_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['polygon_Bytes']>;
};

export type polygon_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['polygon_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['polygon_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygon_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygon_Sequencer_filter>>>;
};

export type polygon_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type polygon_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['polygon_Bytes'];
};

export type polygon_Setting_filter = {
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
  caller?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_not?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygon_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygon_Setting_filter>>>;
};

export type polygon_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type polygon_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: polygon_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['polygon_Bytes'];
  transactionHash: Scalars['polygon_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type polygon_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<polygon_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_not?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygon_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygon_SlippageUpdate_filter>>>;
};

export type polygon_SlippageUpdate_orderBy =
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

export type polygon_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['polygon_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type polygon_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['polygon_Bytes']>;
  root_not?: InputMaybe<Scalars['polygon_Bytes']>;
  root_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  root_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  root_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  root_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  root_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygon_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygon_SnapshotRoot_filter>>>;
};

export type polygon_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type polygon_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type polygon_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygon_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygon_SpokeConnectorMode_filter>>>;
};

export type polygon_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  polygon_asset?: Maybe<polygon_Asset>;
  polygon_assets: Array<polygon_Asset>;
  polygon_assetStatus?: Maybe<polygon_AssetStatus>;
  polygon_assetStatuses: Array<polygon_AssetStatus>;
  polygon_assetBalance?: Maybe<polygon_AssetBalance>;
  polygon_assetBalances: Array<polygon_AssetBalance>;
  polygon_router?: Maybe<polygon_Router>;
  polygon_routers: Array<polygon_Router>;
  polygon_routerDailyTVL?: Maybe<polygon_RouterDailyTVL>;
  polygon_routerDailyTVLs: Array<polygon_RouterDailyTVL>;
  polygon_routerLiquidityEvent?: Maybe<polygon_RouterLiquidityEvent>;
  polygon_routerLiquidityEvents: Array<polygon_RouterLiquidityEvent>;
  polygon_setting?: Maybe<polygon_Setting>;
  polygon_settings: Array<polygon_Setting>;
  polygon_relayer?: Maybe<polygon_Relayer>;
  polygon_relayers: Array<polygon_Relayer>;
  polygon_sequencer?: Maybe<polygon_Sequencer>;
  polygon_sequencers: Array<polygon_Sequencer>;
  polygon_relayerFee?: Maybe<polygon_RelayerFee>;
  polygon_relayerFees: Array<polygon_RelayerFee>;
  polygon_originTransfer?: Maybe<polygon_OriginTransfer>;
  polygon_originTransfers: Array<polygon_OriginTransfer>;
  polygon_destinationTransfer?: Maybe<polygon_DestinationTransfer>;
  polygon_destinationTransfers: Array<polygon_DestinationTransfer>;
  polygon_originMessage?: Maybe<polygon_OriginMessage>;
  polygon_originMessages: Array<polygon_OriginMessage>;
  polygon_aggregateRoot?: Maybe<polygon_AggregateRoot>;
  polygon_aggregateRoots: Array<polygon_AggregateRoot>;
  polygon_connectorMeta?: Maybe<polygon_ConnectorMeta>;
  polygon_connectorMetas: Array<polygon_ConnectorMeta>;
  polygon_rootCount?: Maybe<polygon_RootCount>;
  polygon_rootCounts: Array<polygon_RootCount>;
  polygon_rootMessageSent?: Maybe<polygon_RootMessageSent>;
  polygon_rootMessageSents: Array<polygon_RootMessageSent>;
  polygon_relayerFeesIncrease?: Maybe<polygon_RelayerFeesIncrease>;
  polygon_relayerFeesIncreases: Array<polygon_RelayerFeesIncrease>;
  polygon_slippageUpdate?: Maybe<polygon_SlippageUpdate>;
  polygon_slippageUpdates: Array<polygon_SlippageUpdate>;
  polygon_snapshotRoot?: Maybe<polygon_SnapshotRoot>;
  polygon_snapshotRoots: Array<polygon_SnapshotRoot>;
  polygon_spokeConnectorMode?: Maybe<polygon_SpokeConnectorMode>;
  polygon_spokeConnectorModes: Array<polygon_SpokeConnectorMode>;
  polygon_aggregateRootProposed?: Maybe<polygon_AggregateRootProposed>;
  polygon_aggregateRootProposeds: Array<polygon_AggregateRootProposed>;
  polygon_optimisticRootFinalized?: Maybe<polygon_OptimisticRootFinalized>;
  polygon_optimisticRootFinalizeds: Array<polygon_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  polygon__meta?: Maybe<polygon__Meta_>;
};


export type Subscriptionpolygon_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_Asset_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_Asset_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_AssetStatus_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_AssetBalance_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_Router_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_Router_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_RouterDailyTVL_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_RouterLiquidityEvent_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_Setting_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_Setting_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_Relayer_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_Relayer_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_Sequencer_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_Sequencer_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_RelayerFee_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_OriginTransfer_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_DestinationTransfer_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_OriginMessage_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_AggregateRoot_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_ConnectorMeta_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_RootCount_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_RootCount_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_RootMessageSent_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_RelayerFeesIncrease_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_SlippageUpdate_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_SnapshotRoot_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_SpokeConnectorMode_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_AggregateRootProposed_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_OptimisticRootFinalized_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon__metaArgs = {
  block?: InputMaybe<polygon_Block_height>;
};

export type polygon_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type polygon__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['polygon_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['polygon_Bytes']>;
};

/** The type for the top-level _meta field */
export type polygon__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: polygon__Block_;
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
  polygon_asset: InContextSdkMethod<Query['polygon_asset'], Querypolygon_assetArgs, MeshContext>,
  /** null **/
  polygon_assets: InContextSdkMethod<Query['polygon_assets'], Querypolygon_assetsArgs, MeshContext>,
  /** null **/
  polygon_assetStatus: InContextSdkMethod<Query['polygon_assetStatus'], Querypolygon_assetStatusArgs, MeshContext>,
  /** null **/
  polygon_assetStatuses: InContextSdkMethod<Query['polygon_assetStatuses'], Querypolygon_assetStatusesArgs, MeshContext>,
  /** null **/
  polygon_assetBalance: InContextSdkMethod<Query['polygon_assetBalance'], Querypolygon_assetBalanceArgs, MeshContext>,
  /** null **/
  polygon_assetBalances: InContextSdkMethod<Query['polygon_assetBalances'], Querypolygon_assetBalancesArgs, MeshContext>,
  /** null **/
  polygon_router: InContextSdkMethod<Query['polygon_router'], Querypolygon_routerArgs, MeshContext>,
  /** null **/
  polygon_routers: InContextSdkMethod<Query['polygon_routers'], Querypolygon_routersArgs, MeshContext>,
  /** null **/
  polygon_routerDailyTVL: InContextSdkMethod<Query['polygon_routerDailyTVL'], Querypolygon_routerDailyTVLArgs, MeshContext>,
  /** null **/
  polygon_routerDailyTVLs: InContextSdkMethod<Query['polygon_routerDailyTVLs'], Querypolygon_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  polygon_routerLiquidityEvent: InContextSdkMethod<Query['polygon_routerLiquidityEvent'], Querypolygon_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  polygon_routerLiquidityEvents: InContextSdkMethod<Query['polygon_routerLiquidityEvents'], Querypolygon_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  polygon_setting: InContextSdkMethod<Query['polygon_setting'], Querypolygon_settingArgs, MeshContext>,
  /** null **/
  polygon_settings: InContextSdkMethod<Query['polygon_settings'], Querypolygon_settingsArgs, MeshContext>,
  /** null **/
  polygon_relayer: InContextSdkMethod<Query['polygon_relayer'], Querypolygon_relayerArgs, MeshContext>,
  /** null **/
  polygon_relayers: InContextSdkMethod<Query['polygon_relayers'], Querypolygon_relayersArgs, MeshContext>,
  /** null **/
  polygon_sequencer: InContextSdkMethod<Query['polygon_sequencer'], Querypolygon_sequencerArgs, MeshContext>,
  /** null **/
  polygon_sequencers: InContextSdkMethod<Query['polygon_sequencers'], Querypolygon_sequencersArgs, MeshContext>,
  /** null **/
  polygon_relayerFee: InContextSdkMethod<Query['polygon_relayerFee'], Querypolygon_relayerFeeArgs, MeshContext>,
  /** null **/
  polygon_relayerFees: InContextSdkMethod<Query['polygon_relayerFees'], Querypolygon_relayerFeesArgs, MeshContext>,
  /** null **/
  polygon_originTransfer: InContextSdkMethod<Query['polygon_originTransfer'], Querypolygon_originTransferArgs, MeshContext>,
  /** null **/
  polygon_originTransfers: InContextSdkMethod<Query['polygon_originTransfers'], Querypolygon_originTransfersArgs, MeshContext>,
  /** null **/
  polygon_destinationTransfer: InContextSdkMethod<Query['polygon_destinationTransfer'], Querypolygon_destinationTransferArgs, MeshContext>,
  /** null **/
  polygon_destinationTransfers: InContextSdkMethod<Query['polygon_destinationTransfers'], Querypolygon_destinationTransfersArgs, MeshContext>,
  /** null **/
  polygon_originMessage: InContextSdkMethod<Query['polygon_originMessage'], Querypolygon_originMessageArgs, MeshContext>,
  /** null **/
  polygon_originMessages: InContextSdkMethod<Query['polygon_originMessages'], Querypolygon_originMessagesArgs, MeshContext>,
  /** null **/
  polygon_aggregateRoot: InContextSdkMethod<Query['polygon_aggregateRoot'], Querypolygon_aggregateRootArgs, MeshContext>,
  /** null **/
  polygon_aggregateRoots: InContextSdkMethod<Query['polygon_aggregateRoots'], Querypolygon_aggregateRootsArgs, MeshContext>,
  /** null **/
  polygon_connectorMeta: InContextSdkMethod<Query['polygon_connectorMeta'], Querypolygon_connectorMetaArgs, MeshContext>,
  /** null **/
  polygon_connectorMetas: InContextSdkMethod<Query['polygon_connectorMetas'], Querypolygon_connectorMetasArgs, MeshContext>,
  /** null **/
  polygon_rootCount: InContextSdkMethod<Query['polygon_rootCount'], Querypolygon_rootCountArgs, MeshContext>,
  /** null **/
  polygon_rootCounts: InContextSdkMethod<Query['polygon_rootCounts'], Querypolygon_rootCountsArgs, MeshContext>,
  /** null **/
  polygon_rootMessageSent: InContextSdkMethod<Query['polygon_rootMessageSent'], Querypolygon_rootMessageSentArgs, MeshContext>,
  /** null **/
  polygon_rootMessageSents: InContextSdkMethod<Query['polygon_rootMessageSents'], Querypolygon_rootMessageSentsArgs, MeshContext>,
  /** null **/
  polygon_relayerFeesIncrease: InContextSdkMethod<Query['polygon_relayerFeesIncrease'], Querypolygon_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  polygon_relayerFeesIncreases: InContextSdkMethod<Query['polygon_relayerFeesIncreases'], Querypolygon_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  polygon_slippageUpdate: InContextSdkMethod<Query['polygon_slippageUpdate'], Querypolygon_slippageUpdateArgs, MeshContext>,
  /** null **/
  polygon_slippageUpdates: InContextSdkMethod<Query['polygon_slippageUpdates'], Querypolygon_slippageUpdatesArgs, MeshContext>,
  /** null **/
  polygon_snapshotRoot: InContextSdkMethod<Query['polygon_snapshotRoot'], Querypolygon_snapshotRootArgs, MeshContext>,
  /** null **/
  polygon_snapshotRoots: InContextSdkMethod<Query['polygon_snapshotRoots'], Querypolygon_snapshotRootsArgs, MeshContext>,
  /** null **/
  polygon_spokeConnectorMode: InContextSdkMethod<Query['polygon_spokeConnectorMode'], Querypolygon_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  polygon_spokeConnectorModes: InContextSdkMethod<Query['polygon_spokeConnectorModes'], Querypolygon_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  polygon_aggregateRootProposed: InContextSdkMethod<Query['polygon_aggregateRootProposed'], Querypolygon_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  polygon_aggregateRootProposeds: InContextSdkMethod<Query['polygon_aggregateRootProposeds'], Querypolygon_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  polygon_optimisticRootFinalized: InContextSdkMethod<Query['polygon_optimisticRootFinalized'], Querypolygon_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  polygon_optimisticRootFinalizeds: InContextSdkMethod<Query['polygon_optimisticRootFinalizeds'], Querypolygon_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  polygon__meta: InContextSdkMethod<Query['polygon__meta'], Querypolygon__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  polygon_asset: InContextSdkMethod<Subscription['polygon_asset'], Subscriptionpolygon_assetArgs, MeshContext>,
  /** null **/
  polygon_assets: InContextSdkMethod<Subscription['polygon_assets'], Subscriptionpolygon_assetsArgs, MeshContext>,
  /** null **/
  polygon_assetStatus: InContextSdkMethod<Subscription['polygon_assetStatus'], Subscriptionpolygon_assetStatusArgs, MeshContext>,
  /** null **/
  polygon_assetStatuses: InContextSdkMethod<Subscription['polygon_assetStatuses'], Subscriptionpolygon_assetStatusesArgs, MeshContext>,
  /** null **/
  polygon_assetBalance: InContextSdkMethod<Subscription['polygon_assetBalance'], Subscriptionpolygon_assetBalanceArgs, MeshContext>,
  /** null **/
  polygon_assetBalances: InContextSdkMethod<Subscription['polygon_assetBalances'], Subscriptionpolygon_assetBalancesArgs, MeshContext>,
  /** null **/
  polygon_router: InContextSdkMethod<Subscription['polygon_router'], Subscriptionpolygon_routerArgs, MeshContext>,
  /** null **/
  polygon_routers: InContextSdkMethod<Subscription['polygon_routers'], Subscriptionpolygon_routersArgs, MeshContext>,
  /** null **/
  polygon_routerDailyTVL: InContextSdkMethod<Subscription['polygon_routerDailyTVL'], Subscriptionpolygon_routerDailyTVLArgs, MeshContext>,
  /** null **/
  polygon_routerDailyTVLs: InContextSdkMethod<Subscription['polygon_routerDailyTVLs'], Subscriptionpolygon_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  polygon_routerLiquidityEvent: InContextSdkMethod<Subscription['polygon_routerLiquidityEvent'], Subscriptionpolygon_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  polygon_routerLiquidityEvents: InContextSdkMethod<Subscription['polygon_routerLiquidityEvents'], Subscriptionpolygon_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  polygon_setting: InContextSdkMethod<Subscription['polygon_setting'], Subscriptionpolygon_settingArgs, MeshContext>,
  /** null **/
  polygon_settings: InContextSdkMethod<Subscription['polygon_settings'], Subscriptionpolygon_settingsArgs, MeshContext>,
  /** null **/
  polygon_relayer: InContextSdkMethod<Subscription['polygon_relayer'], Subscriptionpolygon_relayerArgs, MeshContext>,
  /** null **/
  polygon_relayers: InContextSdkMethod<Subscription['polygon_relayers'], Subscriptionpolygon_relayersArgs, MeshContext>,
  /** null **/
  polygon_sequencer: InContextSdkMethod<Subscription['polygon_sequencer'], Subscriptionpolygon_sequencerArgs, MeshContext>,
  /** null **/
  polygon_sequencers: InContextSdkMethod<Subscription['polygon_sequencers'], Subscriptionpolygon_sequencersArgs, MeshContext>,
  /** null **/
  polygon_relayerFee: InContextSdkMethod<Subscription['polygon_relayerFee'], Subscriptionpolygon_relayerFeeArgs, MeshContext>,
  /** null **/
  polygon_relayerFees: InContextSdkMethod<Subscription['polygon_relayerFees'], Subscriptionpolygon_relayerFeesArgs, MeshContext>,
  /** null **/
  polygon_originTransfer: InContextSdkMethod<Subscription['polygon_originTransfer'], Subscriptionpolygon_originTransferArgs, MeshContext>,
  /** null **/
  polygon_originTransfers: InContextSdkMethod<Subscription['polygon_originTransfers'], Subscriptionpolygon_originTransfersArgs, MeshContext>,
  /** null **/
  polygon_destinationTransfer: InContextSdkMethod<Subscription['polygon_destinationTransfer'], Subscriptionpolygon_destinationTransferArgs, MeshContext>,
  /** null **/
  polygon_destinationTransfers: InContextSdkMethod<Subscription['polygon_destinationTransfers'], Subscriptionpolygon_destinationTransfersArgs, MeshContext>,
  /** null **/
  polygon_originMessage: InContextSdkMethod<Subscription['polygon_originMessage'], Subscriptionpolygon_originMessageArgs, MeshContext>,
  /** null **/
  polygon_originMessages: InContextSdkMethod<Subscription['polygon_originMessages'], Subscriptionpolygon_originMessagesArgs, MeshContext>,
  /** null **/
  polygon_aggregateRoot: InContextSdkMethod<Subscription['polygon_aggregateRoot'], Subscriptionpolygon_aggregateRootArgs, MeshContext>,
  /** null **/
  polygon_aggregateRoots: InContextSdkMethod<Subscription['polygon_aggregateRoots'], Subscriptionpolygon_aggregateRootsArgs, MeshContext>,
  /** null **/
  polygon_connectorMeta: InContextSdkMethod<Subscription['polygon_connectorMeta'], Subscriptionpolygon_connectorMetaArgs, MeshContext>,
  /** null **/
  polygon_connectorMetas: InContextSdkMethod<Subscription['polygon_connectorMetas'], Subscriptionpolygon_connectorMetasArgs, MeshContext>,
  /** null **/
  polygon_rootCount: InContextSdkMethod<Subscription['polygon_rootCount'], Subscriptionpolygon_rootCountArgs, MeshContext>,
  /** null **/
  polygon_rootCounts: InContextSdkMethod<Subscription['polygon_rootCounts'], Subscriptionpolygon_rootCountsArgs, MeshContext>,
  /** null **/
  polygon_rootMessageSent: InContextSdkMethod<Subscription['polygon_rootMessageSent'], Subscriptionpolygon_rootMessageSentArgs, MeshContext>,
  /** null **/
  polygon_rootMessageSents: InContextSdkMethod<Subscription['polygon_rootMessageSents'], Subscriptionpolygon_rootMessageSentsArgs, MeshContext>,
  /** null **/
  polygon_relayerFeesIncrease: InContextSdkMethod<Subscription['polygon_relayerFeesIncrease'], Subscriptionpolygon_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  polygon_relayerFeesIncreases: InContextSdkMethod<Subscription['polygon_relayerFeesIncreases'], Subscriptionpolygon_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  polygon_slippageUpdate: InContextSdkMethod<Subscription['polygon_slippageUpdate'], Subscriptionpolygon_slippageUpdateArgs, MeshContext>,
  /** null **/
  polygon_slippageUpdates: InContextSdkMethod<Subscription['polygon_slippageUpdates'], Subscriptionpolygon_slippageUpdatesArgs, MeshContext>,
  /** null **/
  polygon_snapshotRoot: InContextSdkMethod<Subscription['polygon_snapshotRoot'], Subscriptionpolygon_snapshotRootArgs, MeshContext>,
  /** null **/
  polygon_snapshotRoots: InContextSdkMethod<Subscription['polygon_snapshotRoots'], Subscriptionpolygon_snapshotRootsArgs, MeshContext>,
  /** null **/
  polygon_spokeConnectorMode: InContextSdkMethod<Subscription['polygon_spokeConnectorMode'], Subscriptionpolygon_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  polygon_spokeConnectorModes: InContextSdkMethod<Subscription['polygon_spokeConnectorModes'], Subscriptionpolygon_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  polygon_aggregateRootProposed: InContextSdkMethod<Subscription['polygon_aggregateRootProposed'], Subscriptionpolygon_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  polygon_aggregateRootProposeds: InContextSdkMethod<Subscription['polygon_aggregateRootProposeds'], Subscriptionpolygon_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  polygon_optimisticRootFinalized: InContextSdkMethod<Subscription['polygon_optimisticRootFinalized'], Subscriptionpolygon_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  polygon_optimisticRootFinalizeds: InContextSdkMethod<Subscription['polygon_optimisticRootFinalizeds'], Subscriptionpolygon_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  polygon__meta: InContextSdkMethod<Subscription['polygon__meta'], Subscriptionpolygon__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Polygon"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
