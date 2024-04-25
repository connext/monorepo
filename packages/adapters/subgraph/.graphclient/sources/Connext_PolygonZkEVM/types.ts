// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextPolygonZkEvmTypes {
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
  polygonzkevm_BigDecimal: any;
  BigInt: any;
  polygonzkevm_Bytes: any;
  polygonzkevm_Int8: any;
  Timestamp: any;
};

export type polygonzkevm_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['polygonzkevm_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type polygonzkevm_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['polygonzkevm_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type polygonzkevm_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
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
  _change_block?: InputMaybe<polygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_AggregateRootProposed_filter>>>;
};

export type polygonzkevm_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type polygonzkevm_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  root_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_AggregateRoot_filter>>>;
};

export type polygonzkevm_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type polygonzkevm_Aggregation_interval =
  | 'hour'
  | 'day';

export type polygonzkevm_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['polygonzkevm_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['polygonzkevm_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['polygonzkevm_Bytes']>;
  localAsset?: Maybe<Scalars['polygonzkevm_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<polygonzkevm_AssetStatus>;
};

export type polygonzkevm_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: polygonzkevm_Router;
  asset: polygonzkevm_Asset;
  feesEarned: Scalars['BigInt'];
};

export type polygonzkevm_AssetBalance_filter = {
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
  router_?: InputMaybe<polygonzkevm_Router_filter>;
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
  asset_?: InputMaybe<polygonzkevm_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_AssetBalance_filter>>>;
};

export type polygonzkevm_AssetBalance_orderBy =
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

export type polygonzkevm_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type polygonzkevm_AssetStatus_filter = {
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
  _change_block?: InputMaybe<polygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_AssetStatus_filter>>>;
};

export type polygonzkevm_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type polygonzkevm_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  key_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  key_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  key_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  key_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  key_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  key_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  localAsset?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
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
  status_?: InputMaybe<polygonzkevm_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_Asset_filter>>>;
};

export type polygonzkevm_Asset_orderBy =
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

export type polygonzkevm_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type polygonzkevm_Block_height = {
  hash?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type polygonzkevm_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['polygonzkevm_Bytes']>;
  rootManager?: Maybe<Scalars['polygonzkevm_Bytes']>;
  mirrorConnector?: Maybe<Scalars['polygonzkevm_Bytes']>;
};

export type polygonzkevm_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  amb_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  amb_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  amb_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  amb_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  amb_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  rootManager?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_ConnectorMeta_filter>>>;
};

export type polygonzkevm_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type polygonzkevm_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['polygonzkevm_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<polygonzkevm_TransferStatus>;
  routers?: Maybe<Array<polygonzkevm_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['polygonzkevm_Bytes']>;
  delegate?: Maybe<Scalars['polygonzkevm_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['polygonzkevm_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['polygonzkevm_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['polygonzkevm_Bytes']>;
  asset?: Maybe<polygonzkevm_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['polygonzkevm_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['polygonzkevm_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['polygonzkevm_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['polygonzkevm_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['polygonzkevm_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['polygonzkevm_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type polygonzkevm_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_Router_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_Router_filter>;
};

export type polygonzkevm_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transferId_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<polygonzkevm_TransferStatus>;
  status_not?: InputMaybe<polygonzkevm_TransferStatus>;
  status_in?: InputMaybe<Array<polygonzkevm_TransferStatus>>;
  status_not_in?: InputMaybe<Array<polygonzkevm_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<polygonzkevm_Router_filter>;
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
  to?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  to_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  to_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  to_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  to_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  to_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  to_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  delegate?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  delegate_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  callData_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  callData_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  callData_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  callData_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  callData_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
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
  originSender?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  originSender_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
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
  asset_?: InputMaybe<polygonzkevm_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_DestinationTransfer_filter>>>;
};

export type polygonzkevm_DestinationTransfer_orderBy =
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

export type polygonzkevm_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['polygonzkevm_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type polygonzkevm_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
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
  _change_block?: InputMaybe<polygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_OptimisticRootFinalized_filter>>>;
};

export type polygonzkevm_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type polygonzkevm_OrderDirection =
  | 'asc'
  | 'desc';

export type polygonzkevm_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['polygonzkevm_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['polygonzkevm_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['polygonzkevm_Bytes']>;
  root?: Maybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash?: Maybe<Scalars['polygonzkevm_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<polygonzkevm_RootCount>;
};

export type polygonzkevm_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transferId_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  leaf_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  message_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  message_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  message_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  message_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  message_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  message_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  root_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
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
  rootCount_?: InputMaybe<polygonzkevm_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_OriginMessage_filter>>>;
};

export type polygonzkevm_OriginMessage_orderBy =
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

export type polygonzkevm_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['polygonzkevm_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<polygonzkevm_TransferStatus>;
  messageHash?: Maybe<Scalars['polygonzkevm_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['polygonzkevm_Bytes']>;
  delegate?: Maybe<Scalars['polygonzkevm_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['polygonzkevm_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['polygonzkevm_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['polygonzkevm_Bytes']>;
  asset?: Maybe<polygonzkevm_Asset>;
  transactingAsset?: Maybe<Scalars['polygonzkevm_Bytes']>;
  message?: Maybe<polygonzkevm_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<polygonzkevm_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['polygonzkevm_Bytes']>;
  caller?: Maybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash?: Maybe<Scalars['polygonzkevm_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['polygonzkevm_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type polygonzkevm_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_RelayerFee_filter>;
};

export type polygonzkevm_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transferId_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<polygonzkevm_TransferStatus>;
  status_not?: InputMaybe<polygonzkevm_TransferStatus>;
  status_in?: InputMaybe<Array<polygonzkevm_TransferStatus>>;
  status_not_in?: InputMaybe<Array<polygonzkevm_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
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
  to?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  to_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  to_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  to_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  to_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  to_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  to_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  delegate?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  delegate_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  callData_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  callData_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  callData_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  callData_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  callData_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  originSender_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
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
  asset_?: InputMaybe<polygonzkevm_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
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
  message_?: InputMaybe<polygonzkevm_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<polygonzkevm_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_OriginTransfer_filter>>>;
};

export type polygonzkevm_OriginTransfer_orderBy =
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
  polygonzkevm_asset?: Maybe<polygonzkevm_Asset>;
  polygonzkevm_assets: Array<polygonzkevm_Asset>;
  polygonzkevm_assetStatus?: Maybe<polygonzkevm_AssetStatus>;
  polygonzkevm_assetStatuses: Array<polygonzkevm_AssetStatus>;
  polygonzkevm_assetBalance?: Maybe<polygonzkevm_AssetBalance>;
  polygonzkevm_assetBalances: Array<polygonzkevm_AssetBalance>;
  polygonzkevm_router?: Maybe<polygonzkevm_Router>;
  polygonzkevm_routers: Array<polygonzkevm_Router>;
  polygonzkevm_routerDailyTVL?: Maybe<polygonzkevm_RouterDailyTVL>;
  polygonzkevm_routerDailyTVLs: Array<polygonzkevm_RouterDailyTVL>;
  polygonzkevm_routerLiquidityEvent?: Maybe<polygonzkevm_RouterLiquidityEvent>;
  polygonzkevm_routerLiquidityEvents: Array<polygonzkevm_RouterLiquidityEvent>;
  polygonzkevm_setting?: Maybe<polygonzkevm_Setting>;
  polygonzkevm_settings: Array<polygonzkevm_Setting>;
  polygonzkevm_relayer?: Maybe<polygonzkevm_Relayer>;
  polygonzkevm_relayers: Array<polygonzkevm_Relayer>;
  polygonzkevm_sequencer?: Maybe<polygonzkevm_Sequencer>;
  polygonzkevm_sequencers: Array<polygonzkevm_Sequencer>;
  polygonzkevm_relayerFee?: Maybe<polygonzkevm_RelayerFee>;
  polygonzkevm_relayerFees: Array<polygonzkevm_RelayerFee>;
  polygonzkevm_originTransfer?: Maybe<polygonzkevm_OriginTransfer>;
  polygonzkevm_originTransfers: Array<polygonzkevm_OriginTransfer>;
  polygonzkevm_destinationTransfer?: Maybe<polygonzkevm_DestinationTransfer>;
  polygonzkevm_destinationTransfers: Array<polygonzkevm_DestinationTransfer>;
  polygonzkevm_originMessage?: Maybe<polygonzkevm_OriginMessage>;
  polygonzkevm_originMessages: Array<polygonzkevm_OriginMessage>;
  polygonzkevm_aggregateRoot?: Maybe<polygonzkevm_AggregateRoot>;
  polygonzkevm_aggregateRoots: Array<polygonzkevm_AggregateRoot>;
  polygonzkevm_connectorMeta?: Maybe<polygonzkevm_ConnectorMeta>;
  polygonzkevm_connectorMetas: Array<polygonzkevm_ConnectorMeta>;
  polygonzkevm_rootCount?: Maybe<polygonzkevm_RootCount>;
  polygonzkevm_rootCounts: Array<polygonzkevm_RootCount>;
  polygonzkevm_rootMessageSent?: Maybe<polygonzkevm_RootMessageSent>;
  polygonzkevm_rootMessageSents: Array<polygonzkevm_RootMessageSent>;
  polygonzkevm_relayerFeesIncrease?: Maybe<polygonzkevm_RelayerFeesIncrease>;
  polygonzkevm_relayerFeesIncreases: Array<polygonzkevm_RelayerFeesIncrease>;
  polygonzkevm_slippageUpdate?: Maybe<polygonzkevm_SlippageUpdate>;
  polygonzkevm_slippageUpdates: Array<polygonzkevm_SlippageUpdate>;
  polygonzkevm_snapshotRoot?: Maybe<polygonzkevm_SnapshotRoot>;
  polygonzkevm_snapshotRoots: Array<polygonzkevm_SnapshotRoot>;
  polygonzkevm_spokeConnectorMode?: Maybe<polygonzkevm_SpokeConnectorMode>;
  polygonzkevm_spokeConnectorModes: Array<polygonzkevm_SpokeConnectorMode>;
  polygonzkevm_aggregateRootProposed?: Maybe<polygonzkevm_AggregateRootProposed>;
  polygonzkevm_aggregateRootProposeds: Array<polygonzkevm_AggregateRootProposed>;
  polygonzkevm_optimisticRootFinalized?: Maybe<polygonzkevm_OptimisticRootFinalized>;
  polygonzkevm_optimisticRootFinalizeds: Array<polygonzkevm_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  polygonzkevm__meta?: Maybe<polygonzkevm__Meta_>;
};


export type Querypolygonzkevm_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_Asset_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_Asset_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_AssetStatus_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_AssetBalance_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_Router_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_Router_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_RouterDailyTVL_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_RouterLiquidityEvent_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_Setting_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_Setting_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_Relayer_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_Relayer_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_Sequencer_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_Sequencer_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_RelayerFee_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_OriginTransfer_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_DestinationTransfer_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_OriginMessage_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_AggregateRoot_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_ConnectorMeta_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_RootCount_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_RootCount_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_RootMessageSent_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_RelayerFeesIncrease_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_SlippageUpdate_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_SnapshotRoot_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_SpokeConnectorMode_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_AggregateRootProposed_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_OptimisticRootFinalized_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm__metaArgs = {
  block?: InputMaybe<polygonzkevm_Block_height>;
};

export type polygonzkevm_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['polygonzkevm_Bytes']>;
};

export type polygonzkevm_RelayerFee = {
  id: Scalars['ID'];
  transfer: polygonzkevm_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['polygonzkevm_Bytes'];
};

export type polygonzkevm_RelayerFee_filter = {
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
  transfer_?: InputMaybe<polygonzkevm_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  asset_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  asset_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  asset_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  asset_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  asset_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_RelayerFee_filter>>>;
};

export type polygonzkevm_RelayerFee_orderBy =
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

export type polygonzkevm_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: polygonzkevm_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['polygonzkevm_Bytes']>;
  caller: Scalars['polygonzkevm_Bytes'];
  transactionHash: Scalars['polygonzkevm_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type polygonzkevm_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<polygonzkevm_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  asset_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  asset_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  asset_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  asset_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  asset_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
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
  _change_block?: InputMaybe<polygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_RelayerFeesIncrease_filter>>>;
};

export type polygonzkevm_RelayerFeesIncrease_orderBy =
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

export type polygonzkevm_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  relayer_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_Relayer_filter>>>;
};

export type polygonzkevm_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type polygonzkevm_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type polygonzkevm_RootCount_filter = {
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
  _change_block?: InputMaybe<polygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_RootCount_filter>>>;
};

export type polygonzkevm_RootCount_orderBy =
  | 'id'
  | 'count';

export type polygonzkevm_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['polygonzkevm_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash?: Maybe<Scalars['polygonzkevm_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type polygonzkevm_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  root_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
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
  _change_block?: InputMaybe<polygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_RootMessageSent_filter>>>;
};

export type polygonzkevm_RootMessageSent_orderBy =
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

export type polygonzkevm_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['polygonzkevm_Bytes']>;
  recipient?: Maybe<Scalars['polygonzkevm_Bytes']>;
  proposedOwner?: Maybe<Scalars['polygonzkevm_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<polygonzkevm_AssetBalance>;
};


export type polygonzkevm_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_AssetBalance_filter>;
};

export type polygonzkevm_RouterDailyTVL = {
  id: Scalars['ID'];
  router: polygonzkevm_Router;
  asset: polygonzkevm_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type polygonzkevm_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<polygonzkevm_Router_filter>;
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
  asset_?: InputMaybe<polygonzkevm_Asset_filter>;
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
  _change_block?: InputMaybe<polygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_RouterDailyTVL_filter>>>;
};

export type polygonzkevm_RouterDailyTVL_orderBy =
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

export type polygonzkevm_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<polygonzkevm_RouterLiquidityEventType>;
  router: polygonzkevm_Router;
  asset: polygonzkevm_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['polygonzkevm_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['polygonzkevm_Bytes'];
  nonce: Scalars['BigInt'];
};

export type polygonzkevm_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type polygonzkevm_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<polygonzkevm_RouterLiquidityEventType>;
  type_not?: InputMaybe<polygonzkevm_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<polygonzkevm_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<polygonzkevm_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<polygonzkevm_Router_filter>;
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
  asset_?: InputMaybe<polygonzkevm_Asset_filter>;
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
  caller?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_RouterLiquidityEvent_filter>>>;
};

export type polygonzkevm_RouterLiquidityEvent_orderBy =
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

export type polygonzkevm_Router_filter = {
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
  owner?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  owner_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  owner_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  owner_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  owner_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  owner_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  recipient?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  recipient_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<polygonzkevm_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_Router_filter>>>;
};

export type polygonzkevm_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type polygonzkevm_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['polygonzkevm_Bytes']>;
};

export type polygonzkevm_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_Sequencer_filter>>>;
};

export type polygonzkevm_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type polygonzkevm_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['polygonzkevm_Bytes'];
};

export type polygonzkevm_Setting_filter = {
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
  caller?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_Setting_filter>>>;
};

export type polygonzkevm_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type polygonzkevm_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: polygonzkevm_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['polygonzkevm_Bytes'];
  transactionHash: Scalars['polygonzkevm_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type polygonzkevm_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<polygonzkevm_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
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
  _change_block?: InputMaybe<polygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_SlippageUpdate_filter>>>;
};

export type polygonzkevm_SlippageUpdate_orderBy =
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

export type polygonzkevm_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['polygonzkevm_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type polygonzkevm_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_not?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_gt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_lt?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_gte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_lte?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['polygonzkevm_Bytes']>>;
  root_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['polygonzkevm_Bytes']>;
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
  _change_block?: InputMaybe<polygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_SnapshotRoot_filter>>>;
};

export type polygonzkevm_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type polygonzkevm_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type polygonzkevm_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<polygonzkevm_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_SpokeConnectorMode_filter>>>;
};

export type polygonzkevm_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  polygonzkevm_asset?: Maybe<polygonzkevm_Asset>;
  polygonzkevm_assets: Array<polygonzkevm_Asset>;
  polygonzkevm_assetStatus?: Maybe<polygonzkevm_AssetStatus>;
  polygonzkevm_assetStatuses: Array<polygonzkevm_AssetStatus>;
  polygonzkevm_assetBalance?: Maybe<polygonzkevm_AssetBalance>;
  polygonzkevm_assetBalances: Array<polygonzkevm_AssetBalance>;
  polygonzkevm_router?: Maybe<polygonzkevm_Router>;
  polygonzkevm_routers: Array<polygonzkevm_Router>;
  polygonzkevm_routerDailyTVL?: Maybe<polygonzkevm_RouterDailyTVL>;
  polygonzkevm_routerDailyTVLs: Array<polygonzkevm_RouterDailyTVL>;
  polygonzkevm_routerLiquidityEvent?: Maybe<polygonzkevm_RouterLiquidityEvent>;
  polygonzkevm_routerLiquidityEvents: Array<polygonzkevm_RouterLiquidityEvent>;
  polygonzkevm_setting?: Maybe<polygonzkevm_Setting>;
  polygonzkevm_settings: Array<polygonzkevm_Setting>;
  polygonzkevm_relayer?: Maybe<polygonzkevm_Relayer>;
  polygonzkevm_relayers: Array<polygonzkevm_Relayer>;
  polygonzkevm_sequencer?: Maybe<polygonzkevm_Sequencer>;
  polygonzkevm_sequencers: Array<polygonzkevm_Sequencer>;
  polygonzkevm_relayerFee?: Maybe<polygonzkevm_RelayerFee>;
  polygonzkevm_relayerFees: Array<polygonzkevm_RelayerFee>;
  polygonzkevm_originTransfer?: Maybe<polygonzkevm_OriginTransfer>;
  polygonzkevm_originTransfers: Array<polygonzkevm_OriginTransfer>;
  polygonzkevm_destinationTransfer?: Maybe<polygonzkevm_DestinationTransfer>;
  polygonzkevm_destinationTransfers: Array<polygonzkevm_DestinationTransfer>;
  polygonzkevm_originMessage?: Maybe<polygonzkevm_OriginMessage>;
  polygonzkevm_originMessages: Array<polygonzkevm_OriginMessage>;
  polygonzkevm_aggregateRoot?: Maybe<polygonzkevm_AggregateRoot>;
  polygonzkevm_aggregateRoots: Array<polygonzkevm_AggregateRoot>;
  polygonzkevm_connectorMeta?: Maybe<polygonzkevm_ConnectorMeta>;
  polygonzkevm_connectorMetas: Array<polygonzkevm_ConnectorMeta>;
  polygonzkevm_rootCount?: Maybe<polygonzkevm_RootCount>;
  polygonzkevm_rootCounts: Array<polygonzkevm_RootCount>;
  polygonzkevm_rootMessageSent?: Maybe<polygonzkevm_RootMessageSent>;
  polygonzkevm_rootMessageSents: Array<polygonzkevm_RootMessageSent>;
  polygonzkevm_relayerFeesIncrease?: Maybe<polygonzkevm_RelayerFeesIncrease>;
  polygonzkevm_relayerFeesIncreases: Array<polygonzkevm_RelayerFeesIncrease>;
  polygonzkevm_slippageUpdate?: Maybe<polygonzkevm_SlippageUpdate>;
  polygonzkevm_slippageUpdates: Array<polygonzkevm_SlippageUpdate>;
  polygonzkevm_snapshotRoot?: Maybe<polygonzkevm_SnapshotRoot>;
  polygonzkevm_snapshotRoots: Array<polygonzkevm_SnapshotRoot>;
  polygonzkevm_spokeConnectorMode?: Maybe<polygonzkevm_SpokeConnectorMode>;
  polygonzkevm_spokeConnectorModes: Array<polygonzkevm_SpokeConnectorMode>;
  polygonzkevm_aggregateRootProposed?: Maybe<polygonzkevm_AggregateRootProposed>;
  polygonzkevm_aggregateRootProposeds: Array<polygonzkevm_AggregateRootProposed>;
  polygonzkevm_optimisticRootFinalized?: Maybe<polygonzkevm_OptimisticRootFinalized>;
  polygonzkevm_optimisticRootFinalizeds: Array<polygonzkevm_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  polygonzkevm__meta?: Maybe<polygonzkevm__Meta_>;
};


export type Subscriptionpolygonzkevm_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_Asset_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_Asset_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_AssetStatus_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_AssetBalance_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_Router_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_Router_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_RouterDailyTVL_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_RouterLiquidityEvent_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_Setting_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_Setting_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_Relayer_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_Relayer_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_Sequencer_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_Sequencer_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_RelayerFee_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_OriginTransfer_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_DestinationTransfer_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_OriginMessage_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_AggregateRoot_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_ConnectorMeta_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_RootCount_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_RootCount_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_RootMessageSent_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_RelayerFeesIncrease_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_SlippageUpdate_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_SnapshotRoot_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_SpokeConnectorMode_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_AggregateRootProposed_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_OrderDirection>;
  where?: InputMaybe<polygonzkevm_OptimisticRootFinalized_filter>;
  block?: InputMaybe<polygonzkevm_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm__metaArgs = {
  block?: InputMaybe<polygonzkevm_Block_height>;
};

export type polygonzkevm_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type polygonzkevm__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['polygonzkevm_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['polygonzkevm_Bytes']>;
};

/** The type for the top-level _meta field */
export type polygonzkevm__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: polygonzkevm__Block_;
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
  polygonzkevm_asset: InContextSdkMethod<Query['polygonzkevm_asset'], Querypolygonzkevm_assetArgs, MeshContext>,
  /** null **/
  polygonzkevm_assets: InContextSdkMethod<Query['polygonzkevm_assets'], Querypolygonzkevm_assetsArgs, MeshContext>,
  /** null **/
  polygonzkevm_assetStatus: InContextSdkMethod<Query['polygonzkevm_assetStatus'], Querypolygonzkevm_assetStatusArgs, MeshContext>,
  /** null **/
  polygonzkevm_assetStatuses: InContextSdkMethod<Query['polygonzkevm_assetStatuses'], Querypolygonzkevm_assetStatusesArgs, MeshContext>,
  /** null **/
  polygonzkevm_assetBalance: InContextSdkMethod<Query['polygonzkevm_assetBalance'], Querypolygonzkevm_assetBalanceArgs, MeshContext>,
  /** null **/
  polygonzkevm_assetBalances: InContextSdkMethod<Query['polygonzkevm_assetBalances'], Querypolygonzkevm_assetBalancesArgs, MeshContext>,
  /** null **/
  polygonzkevm_router: InContextSdkMethod<Query['polygonzkevm_router'], Querypolygonzkevm_routerArgs, MeshContext>,
  /** null **/
  polygonzkevm_routers: InContextSdkMethod<Query['polygonzkevm_routers'], Querypolygonzkevm_routersArgs, MeshContext>,
  /** null **/
  polygonzkevm_routerDailyTVL: InContextSdkMethod<Query['polygonzkevm_routerDailyTVL'], Querypolygonzkevm_routerDailyTVLArgs, MeshContext>,
  /** null **/
  polygonzkevm_routerDailyTVLs: InContextSdkMethod<Query['polygonzkevm_routerDailyTVLs'], Querypolygonzkevm_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  polygonzkevm_routerLiquidityEvent: InContextSdkMethod<Query['polygonzkevm_routerLiquidityEvent'], Querypolygonzkevm_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  polygonzkevm_routerLiquidityEvents: InContextSdkMethod<Query['polygonzkevm_routerLiquidityEvents'], Querypolygonzkevm_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  polygonzkevm_setting: InContextSdkMethod<Query['polygonzkevm_setting'], Querypolygonzkevm_settingArgs, MeshContext>,
  /** null **/
  polygonzkevm_settings: InContextSdkMethod<Query['polygonzkevm_settings'], Querypolygonzkevm_settingsArgs, MeshContext>,
  /** null **/
  polygonzkevm_relayer: InContextSdkMethod<Query['polygonzkevm_relayer'], Querypolygonzkevm_relayerArgs, MeshContext>,
  /** null **/
  polygonzkevm_relayers: InContextSdkMethod<Query['polygonzkevm_relayers'], Querypolygonzkevm_relayersArgs, MeshContext>,
  /** null **/
  polygonzkevm_sequencer: InContextSdkMethod<Query['polygonzkevm_sequencer'], Querypolygonzkevm_sequencerArgs, MeshContext>,
  /** null **/
  polygonzkevm_sequencers: InContextSdkMethod<Query['polygonzkevm_sequencers'], Querypolygonzkevm_sequencersArgs, MeshContext>,
  /** null **/
  polygonzkevm_relayerFee: InContextSdkMethod<Query['polygonzkevm_relayerFee'], Querypolygonzkevm_relayerFeeArgs, MeshContext>,
  /** null **/
  polygonzkevm_relayerFees: InContextSdkMethod<Query['polygonzkevm_relayerFees'], Querypolygonzkevm_relayerFeesArgs, MeshContext>,
  /** null **/
  polygonzkevm_originTransfer: InContextSdkMethod<Query['polygonzkevm_originTransfer'], Querypolygonzkevm_originTransferArgs, MeshContext>,
  /** null **/
  polygonzkevm_originTransfers: InContextSdkMethod<Query['polygonzkevm_originTransfers'], Querypolygonzkevm_originTransfersArgs, MeshContext>,
  /** null **/
  polygonzkevm_destinationTransfer: InContextSdkMethod<Query['polygonzkevm_destinationTransfer'], Querypolygonzkevm_destinationTransferArgs, MeshContext>,
  /** null **/
  polygonzkevm_destinationTransfers: InContextSdkMethod<Query['polygonzkevm_destinationTransfers'], Querypolygonzkevm_destinationTransfersArgs, MeshContext>,
  /** null **/
  polygonzkevm_originMessage: InContextSdkMethod<Query['polygonzkevm_originMessage'], Querypolygonzkevm_originMessageArgs, MeshContext>,
  /** null **/
  polygonzkevm_originMessages: InContextSdkMethod<Query['polygonzkevm_originMessages'], Querypolygonzkevm_originMessagesArgs, MeshContext>,
  /** null **/
  polygonzkevm_aggregateRoot: InContextSdkMethod<Query['polygonzkevm_aggregateRoot'], Querypolygonzkevm_aggregateRootArgs, MeshContext>,
  /** null **/
  polygonzkevm_aggregateRoots: InContextSdkMethod<Query['polygonzkevm_aggregateRoots'], Querypolygonzkevm_aggregateRootsArgs, MeshContext>,
  /** null **/
  polygonzkevm_connectorMeta: InContextSdkMethod<Query['polygonzkevm_connectorMeta'], Querypolygonzkevm_connectorMetaArgs, MeshContext>,
  /** null **/
  polygonzkevm_connectorMetas: InContextSdkMethod<Query['polygonzkevm_connectorMetas'], Querypolygonzkevm_connectorMetasArgs, MeshContext>,
  /** null **/
  polygonzkevm_rootCount: InContextSdkMethod<Query['polygonzkevm_rootCount'], Querypolygonzkevm_rootCountArgs, MeshContext>,
  /** null **/
  polygonzkevm_rootCounts: InContextSdkMethod<Query['polygonzkevm_rootCounts'], Querypolygonzkevm_rootCountsArgs, MeshContext>,
  /** null **/
  polygonzkevm_rootMessageSent: InContextSdkMethod<Query['polygonzkevm_rootMessageSent'], Querypolygonzkevm_rootMessageSentArgs, MeshContext>,
  /** null **/
  polygonzkevm_rootMessageSents: InContextSdkMethod<Query['polygonzkevm_rootMessageSents'], Querypolygonzkevm_rootMessageSentsArgs, MeshContext>,
  /** null **/
  polygonzkevm_relayerFeesIncrease: InContextSdkMethod<Query['polygonzkevm_relayerFeesIncrease'], Querypolygonzkevm_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  polygonzkevm_relayerFeesIncreases: InContextSdkMethod<Query['polygonzkevm_relayerFeesIncreases'], Querypolygonzkevm_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  polygonzkevm_slippageUpdate: InContextSdkMethod<Query['polygonzkevm_slippageUpdate'], Querypolygonzkevm_slippageUpdateArgs, MeshContext>,
  /** null **/
  polygonzkevm_slippageUpdates: InContextSdkMethod<Query['polygonzkevm_slippageUpdates'], Querypolygonzkevm_slippageUpdatesArgs, MeshContext>,
  /** null **/
  polygonzkevm_snapshotRoot: InContextSdkMethod<Query['polygonzkevm_snapshotRoot'], Querypolygonzkevm_snapshotRootArgs, MeshContext>,
  /** null **/
  polygonzkevm_snapshotRoots: InContextSdkMethod<Query['polygonzkevm_snapshotRoots'], Querypolygonzkevm_snapshotRootsArgs, MeshContext>,
  /** null **/
  polygonzkevm_spokeConnectorMode: InContextSdkMethod<Query['polygonzkevm_spokeConnectorMode'], Querypolygonzkevm_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  polygonzkevm_spokeConnectorModes: InContextSdkMethod<Query['polygonzkevm_spokeConnectorModes'], Querypolygonzkevm_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  polygonzkevm_aggregateRootProposed: InContextSdkMethod<Query['polygonzkevm_aggregateRootProposed'], Querypolygonzkevm_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  polygonzkevm_aggregateRootProposeds: InContextSdkMethod<Query['polygonzkevm_aggregateRootProposeds'], Querypolygonzkevm_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  polygonzkevm_optimisticRootFinalized: InContextSdkMethod<Query['polygonzkevm_optimisticRootFinalized'], Querypolygonzkevm_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  polygonzkevm_optimisticRootFinalizeds: InContextSdkMethod<Query['polygonzkevm_optimisticRootFinalizeds'], Querypolygonzkevm_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  polygonzkevm__meta: InContextSdkMethod<Query['polygonzkevm__meta'], Querypolygonzkevm__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  polygonzkevm_asset: InContextSdkMethod<Subscription['polygonzkevm_asset'], Subscriptionpolygonzkevm_assetArgs, MeshContext>,
  /** null **/
  polygonzkevm_assets: InContextSdkMethod<Subscription['polygonzkevm_assets'], Subscriptionpolygonzkevm_assetsArgs, MeshContext>,
  /** null **/
  polygonzkevm_assetStatus: InContextSdkMethod<Subscription['polygonzkevm_assetStatus'], Subscriptionpolygonzkevm_assetStatusArgs, MeshContext>,
  /** null **/
  polygonzkevm_assetStatuses: InContextSdkMethod<Subscription['polygonzkevm_assetStatuses'], Subscriptionpolygonzkevm_assetStatusesArgs, MeshContext>,
  /** null **/
  polygonzkevm_assetBalance: InContextSdkMethod<Subscription['polygonzkevm_assetBalance'], Subscriptionpolygonzkevm_assetBalanceArgs, MeshContext>,
  /** null **/
  polygonzkevm_assetBalances: InContextSdkMethod<Subscription['polygonzkevm_assetBalances'], Subscriptionpolygonzkevm_assetBalancesArgs, MeshContext>,
  /** null **/
  polygonzkevm_router: InContextSdkMethod<Subscription['polygonzkevm_router'], Subscriptionpolygonzkevm_routerArgs, MeshContext>,
  /** null **/
  polygonzkevm_routers: InContextSdkMethod<Subscription['polygonzkevm_routers'], Subscriptionpolygonzkevm_routersArgs, MeshContext>,
  /** null **/
  polygonzkevm_routerDailyTVL: InContextSdkMethod<Subscription['polygonzkevm_routerDailyTVL'], Subscriptionpolygonzkevm_routerDailyTVLArgs, MeshContext>,
  /** null **/
  polygonzkevm_routerDailyTVLs: InContextSdkMethod<Subscription['polygonzkevm_routerDailyTVLs'], Subscriptionpolygonzkevm_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  polygonzkevm_routerLiquidityEvent: InContextSdkMethod<Subscription['polygonzkevm_routerLiquidityEvent'], Subscriptionpolygonzkevm_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  polygonzkevm_routerLiquidityEvents: InContextSdkMethod<Subscription['polygonzkevm_routerLiquidityEvents'], Subscriptionpolygonzkevm_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  polygonzkevm_setting: InContextSdkMethod<Subscription['polygonzkevm_setting'], Subscriptionpolygonzkevm_settingArgs, MeshContext>,
  /** null **/
  polygonzkevm_settings: InContextSdkMethod<Subscription['polygonzkevm_settings'], Subscriptionpolygonzkevm_settingsArgs, MeshContext>,
  /** null **/
  polygonzkevm_relayer: InContextSdkMethod<Subscription['polygonzkevm_relayer'], Subscriptionpolygonzkevm_relayerArgs, MeshContext>,
  /** null **/
  polygonzkevm_relayers: InContextSdkMethod<Subscription['polygonzkevm_relayers'], Subscriptionpolygonzkevm_relayersArgs, MeshContext>,
  /** null **/
  polygonzkevm_sequencer: InContextSdkMethod<Subscription['polygonzkevm_sequencer'], Subscriptionpolygonzkevm_sequencerArgs, MeshContext>,
  /** null **/
  polygonzkevm_sequencers: InContextSdkMethod<Subscription['polygonzkevm_sequencers'], Subscriptionpolygonzkevm_sequencersArgs, MeshContext>,
  /** null **/
  polygonzkevm_relayerFee: InContextSdkMethod<Subscription['polygonzkevm_relayerFee'], Subscriptionpolygonzkevm_relayerFeeArgs, MeshContext>,
  /** null **/
  polygonzkevm_relayerFees: InContextSdkMethod<Subscription['polygonzkevm_relayerFees'], Subscriptionpolygonzkevm_relayerFeesArgs, MeshContext>,
  /** null **/
  polygonzkevm_originTransfer: InContextSdkMethod<Subscription['polygonzkevm_originTransfer'], Subscriptionpolygonzkevm_originTransferArgs, MeshContext>,
  /** null **/
  polygonzkevm_originTransfers: InContextSdkMethod<Subscription['polygonzkevm_originTransfers'], Subscriptionpolygonzkevm_originTransfersArgs, MeshContext>,
  /** null **/
  polygonzkevm_destinationTransfer: InContextSdkMethod<Subscription['polygonzkevm_destinationTransfer'], Subscriptionpolygonzkevm_destinationTransferArgs, MeshContext>,
  /** null **/
  polygonzkevm_destinationTransfers: InContextSdkMethod<Subscription['polygonzkevm_destinationTransfers'], Subscriptionpolygonzkevm_destinationTransfersArgs, MeshContext>,
  /** null **/
  polygonzkevm_originMessage: InContextSdkMethod<Subscription['polygonzkevm_originMessage'], Subscriptionpolygonzkevm_originMessageArgs, MeshContext>,
  /** null **/
  polygonzkevm_originMessages: InContextSdkMethod<Subscription['polygonzkevm_originMessages'], Subscriptionpolygonzkevm_originMessagesArgs, MeshContext>,
  /** null **/
  polygonzkevm_aggregateRoot: InContextSdkMethod<Subscription['polygonzkevm_aggregateRoot'], Subscriptionpolygonzkevm_aggregateRootArgs, MeshContext>,
  /** null **/
  polygonzkevm_aggregateRoots: InContextSdkMethod<Subscription['polygonzkevm_aggregateRoots'], Subscriptionpolygonzkevm_aggregateRootsArgs, MeshContext>,
  /** null **/
  polygonzkevm_connectorMeta: InContextSdkMethod<Subscription['polygonzkevm_connectorMeta'], Subscriptionpolygonzkevm_connectorMetaArgs, MeshContext>,
  /** null **/
  polygonzkevm_connectorMetas: InContextSdkMethod<Subscription['polygonzkevm_connectorMetas'], Subscriptionpolygonzkevm_connectorMetasArgs, MeshContext>,
  /** null **/
  polygonzkevm_rootCount: InContextSdkMethod<Subscription['polygonzkevm_rootCount'], Subscriptionpolygonzkevm_rootCountArgs, MeshContext>,
  /** null **/
  polygonzkevm_rootCounts: InContextSdkMethod<Subscription['polygonzkevm_rootCounts'], Subscriptionpolygonzkevm_rootCountsArgs, MeshContext>,
  /** null **/
  polygonzkevm_rootMessageSent: InContextSdkMethod<Subscription['polygonzkevm_rootMessageSent'], Subscriptionpolygonzkevm_rootMessageSentArgs, MeshContext>,
  /** null **/
  polygonzkevm_rootMessageSents: InContextSdkMethod<Subscription['polygonzkevm_rootMessageSents'], Subscriptionpolygonzkevm_rootMessageSentsArgs, MeshContext>,
  /** null **/
  polygonzkevm_relayerFeesIncrease: InContextSdkMethod<Subscription['polygonzkevm_relayerFeesIncrease'], Subscriptionpolygonzkevm_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  polygonzkevm_relayerFeesIncreases: InContextSdkMethod<Subscription['polygonzkevm_relayerFeesIncreases'], Subscriptionpolygonzkevm_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  polygonzkevm_slippageUpdate: InContextSdkMethod<Subscription['polygonzkevm_slippageUpdate'], Subscriptionpolygonzkevm_slippageUpdateArgs, MeshContext>,
  /** null **/
  polygonzkevm_slippageUpdates: InContextSdkMethod<Subscription['polygonzkevm_slippageUpdates'], Subscriptionpolygonzkevm_slippageUpdatesArgs, MeshContext>,
  /** null **/
  polygonzkevm_snapshotRoot: InContextSdkMethod<Subscription['polygonzkevm_snapshotRoot'], Subscriptionpolygonzkevm_snapshotRootArgs, MeshContext>,
  /** null **/
  polygonzkevm_snapshotRoots: InContextSdkMethod<Subscription['polygonzkevm_snapshotRoots'], Subscriptionpolygonzkevm_snapshotRootsArgs, MeshContext>,
  /** null **/
  polygonzkevm_spokeConnectorMode: InContextSdkMethod<Subscription['polygonzkevm_spokeConnectorMode'], Subscriptionpolygonzkevm_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  polygonzkevm_spokeConnectorModes: InContextSdkMethod<Subscription['polygonzkevm_spokeConnectorModes'], Subscriptionpolygonzkevm_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  polygonzkevm_aggregateRootProposed: InContextSdkMethod<Subscription['polygonzkevm_aggregateRootProposed'], Subscriptionpolygonzkevm_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  polygonzkevm_aggregateRootProposeds: InContextSdkMethod<Subscription['polygonzkevm_aggregateRootProposeds'], Subscriptionpolygonzkevm_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  polygonzkevm_optimisticRootFinalized: InContextSdkMethod<Subscription['polygonzkevm_optimisticRootFinalized'], Subscriptionpolygonzkevm_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  polygonzkevm_optimisticRootFinalizeds: InContextSdkMethod<Subscription['polygonzkevm_optimisticRootFinalizeds'], Subscriptionpolygonzkevm_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  polygonzkevm__meta: InContextSdkMethod<Subscription['polygonzkevm__meta'], Subscriptionpolygonzkevm__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_PolygonZkEVM"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
