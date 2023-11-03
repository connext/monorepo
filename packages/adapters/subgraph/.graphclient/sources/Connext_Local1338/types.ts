// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextLocal1338Types {
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
  local1338_BigDecimal: any;
  BigInt: any;
  local1338_Bytes: any;
  local1338_Int8: any;
};

export type local1338_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['local1338_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type local1338_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['local1338_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type local1338_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['local1338_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['local1338_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<local1338_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<local1338_AggregateRootProposed_filter>>>;
};

export type local1338_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type local1338_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['local1338_Bytes']>;
  root_not?: InputMaybe<Scalars['local1338_Bytes']>;
  root_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  root_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  root_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  root_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  root_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<local1338_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<local1338_AggregateRoot_filter>>>;
};

export type local1338_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type local1338_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['local1338_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['local1338_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['local1338_Bytes']>;
  localAsset?: Maybe<Scalars['local1338_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<local1338_AssetStatus>;
};

export type local1338_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: local1338_Router;
  asset: local1338_Asset;
  feesEarned: Scalars['BigInt'];
};

export type local1338_AssetBalance_filter = {
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
  router_?: InputMaybe<local1338_Router_filter>;
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
  asset_?: InputMaybe<local1338_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<local1338_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<local1338_AssetBalance_filter>>>;
};

export type local1338_AssetBalance_orderBy =
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
  | 'asset__canonicalId'
  | 'asset__canonicalDomain'
  | 'asset__adoptedAsset'
  | 'asset__localAsset'
  | 'asset__blockNumber'
  | 'feesEarned';

export type local1338_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type local1338_AssetStatus_filter = {
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
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<local1338_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<local1338_AssetStatus_filter>>>;
};

export type local1338_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type local1338_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['local1338_Bytes']>;
  key_not?: InputMaybe<Scalars['local1338_Bytes']>;
  key_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  key_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  key_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  key_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  key_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  decimal?: InputMaybe<Scalars['BigInt']>;
  decimal_not?: InputMaybe<Scalars['BigInt']>;
  decimal_gt?: InputMaybe<Scalars['BigInt']>;
  decimal_lt?: InputMaybe<Scalars['BigInt']>;
  decimal_gte?: InputMaybe<Scalars['BigInt']>;
  decimal_lte?: InputMaybe<Scalars['BigInt']>;
  decimal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  decimal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalId?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['local1338_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['local1338_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  localAsset?: InputMaybe<Scalars['local1338_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['local1338_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  status_?: InputMaybe<local1338_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<local1338_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<local1338_Asset_filter>>>;
};

export type local1338_Asset_orderBy =
  | 'id'
  | 'key'
  | 'decimal'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber'
  | 'status'
  | 'status__id'
  | 'status__status';

export type local1338_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type local1338_Block_height = {
  hash?: InputMaybe<Scalars['local1338_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type local1338_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['local1338_Bytes']>;
  rootManager?: Maybe<Scalars['local1338_Bytes']>;
  mirrorConnector?: Maybe<Scalars['local1338_Bytes']>;
};

export type local1338_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['local1338_Bytes']>;
  amb_not?: InputMaybe<Scalars['local1338_Bytes']>;
  amb_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  amb_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  amb_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  amb_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  rootManager?: InputMaybe<Scalars['local1338_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['local1338_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['local1338_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['local1338_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<local1338_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<local1338_ConnectorMeta_filter>>>;
};

export type local1338_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type local1338_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['local1338_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<local1338_TransferStatus>;
  routers?: Maybe<Array<local1338_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['local1338_Bytes']>;
  delegate?: Maybe<Scalars['local1338_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['local1338_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['local1338_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['local1338_Bytes']>;
  asset?: Maybe<local1338_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['local1338_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['local1338_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['local1338_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['local1338_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['local1338_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['local1338_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type local1338_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Router_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Router_filter>;
};

export type local1338_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_not?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<local1338_TransferStatus>;
  status_not?: InputMaybe<local1338_TransferStatus>;
  status_in?: InputMaybe<Array<local1338_TransferStatus>>;
  status_not_in?: InputMaybe<Array<local1338_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<local1338_Router_filter>;
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
  to?: InputMaybe<Scalars['local1338_Bytes']>;
  to_not?: InputMaybe<Scalars['local1338_Bytes']>;
  to_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  to_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  to_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  to_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  to_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate_not?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_not?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  originSender?: InputMaybe<Scalars['local1338_Bytes']>;
  originSender_not?: InputMaybe<Scalars['local1338_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  asset_?: InputMaybe<local1338_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['local1338_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['local1338_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<local1338_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<local1338_DestinationTransfer_filter>>>;
};

export type local1338_DestinationTransfer_orderBy =
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

export type local1338_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['local1338_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type local1338_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['local1338_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['local1338_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<local1338_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<local1338_OptimisticRootFinalized_filter>>>;
};

export type local1338_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type local1338_OrderDirection =
  | 'asc'
  | 'desc';

export type local1338_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['local1338_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['local1338_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['local1338_Bytes']>;
  root?: Maybe<Scalars['local1338_Bytes']>;
  transactionHash?: Maybe<Scalars['local1338_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<local1338_RootCount>;
};

export type local1338_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_not?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['local1338_Bytes']>;
  leaf_not?: InputMaybe<Scalars['local1338_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['local1338_Bytes']>;
  message_not?: InputMaybe<Scalars['local1338_Bytes']>;
  message_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  message_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  message_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  message_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  message_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  root?: InputMaybe<Scalars['local1338_Bytes']>;
  root_not?: InputMaybe<Scalars['local1338_Bytes']>;
  root_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  root_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  root_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  root_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  root_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  rootCount_?: InputMaybe<local1338_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<local1338_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<local1338_OriginMessage_filter>>>;
};

export type local1338_OriginMessage_orderBy =
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

export type local1338_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['local1338_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<local1338_TransferStatus>;
  messageHash?: Maybe<Scalars['local1338_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['local1338_Bytes']>;
  delegate?: Maybe<Scalars['local1338_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['local1338_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['local1338_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['local1338_Bytes']>;
  asset?: Maybe<local1338_Asset>;
  transactingAsset?: Maybe<Scalars['local1338_Bytes']>;
  message?: Maybe<local1338_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<local1338_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['local1338_Bytes']>;
  caller?: Maybe<Scalars['local1338_Bytes']>;
  transactionHash?: Maybe<Scalars['local1338_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['local1338_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type local1338_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_RelayerFee_filter>;
};

export type local1338_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_not?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<local1338_TransferStatus>;
  status_not?: InputMaybe<local1338_TransferStatus>;
  status_in?: InputMaybe<Array<local1338_TransferStatus>>;
  status_not_in?: InputMaybe<Array<local1338_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['local1338_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['local1338_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  to?: InputMaybe<Scalars['local1338_Bytes']>;
  to_not?: InputMaybe<Scalars['local1338_Bytes']>;
  to_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  to_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  to_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  to_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  to_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate_not?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_not?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['local1338_Bytes']>;
  originSender_not?: InputMaybe<Scalars['local1338_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  asset_?: InputMaybe<local1338_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['local1338_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['local1338_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  message_?: InputMaybe<local1338_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<local1338_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['local1338_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['local1338_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  caller?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_not?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['local1338_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['local1338_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<local1338_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<local1338_OriginTransfer_filter>>>;
};

export type local1338_OriginTransfer_orderBy =
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
  local1338_asset?: Maybe<local1338_Asset>;
  local1338_assets: Array<local1338_Asset>;
  local1338_assetStatus?: Maybe<local1338_AssetStatus>;
  local1338_assetStatuses: Array<local1338_AssetStatus>;
  local1338_assetBalance?: Maybe<local1338_AssetBalance>;
  local1338_assetBalances: Array<local1338_AssetBalance>;
  local1338_router?: Maybe<local1338_Router>;
  local1338_routers: Array<local1338_Router>;
  local1338_routerDailyTVL?: Maybe<local1338_RouterDailyTVL>;
  local1338_routerDailyTVLs: Array<local1338_RouterDailyTVL>;
  local1338_setting?: Maybe<local1338_Setting>;
  local1338_settings: Array<local1338_Setting>;
  local1338_relayer?: Maybe<local1338_Relayer>;
  local1338_relayers: Array<local1338_Relayer>;
  local1338_sequencer?: Maybe<local1338_Sequencer>;
  local1338_sequencers: Array<local1338_Sequencer>;
  local1338_relayerFee?: Maybe<local1338_RelayerFee>;
  local1338_relayerFees: Array<local1338_RelayerFee>;
  local1338_originTransfer?: Maybe<local1338_OriginTransfer>;
  local1338_originTransfers: Array<local1338_OriginTransfer>;
  local1338_destinationTransfer?: Maybe<local1338_DestinationTransfer>;
  local1338_destinationTransfers: Array<local1338_DestinationTransfer>;
  local1338_originMessage?: Maybe<local1338_OriginMessage>;
  local1338_originMessages: Array<local1338_OriginMessage>;
  local1338_aggregateRoot?: Maybe<local1338_AggregateRoot>;
  local1338_aggregateRoots: Array<local1338_AggregateRoot>;
  local1338_connectorMeta?: Maybe<local1338_ConnectorMeta>;
  local1338_connectorMetas: Array<local1338_ConnectorMeta>;
  local1338_rootCount?: Maybe<local1338_RootCount>;
  local1338_rootCounts: Array<local1338_RootCount>;
  local1338_rootMessageSent?: Maybe<local1338_RootMessageSent>;
  local1338_rootMessageSents: Array<local1338_RootMessageSent>;
  local1338_relayerFeesIncrease?: Maybe<local1338_RelayerFeesIncrease>;
  local1338_relayerFeesIncreases: Array<local1338_RelayerFeesIncrease>;
  local1338_slippageUpdate?: Maybe<local1338_SlippageUpdate>;
  local1338_slippageUpdates: Array<local1338_SlippageUpdate>;
  local1338_snapshotRoot?: Maybe<local1338_SnapshotRoot>;
  local1338_snapshotRoots: Array<local1338_SnapshotRoot>;
  local1338_spokeConnectorMode?: Maybe<local1338_SpokeConnectorMode>;
  local1338_spokeConnectorModes: Array<local1338_SpokeConnectorMode>;
  local1338_aggregateRootProposed?: Maybe<local1338_AggregateRootProposed>;
  local1338_aggregateRootProposeds: Array<local1338_AggregateRootProposed>;
  local1338_optimisticRootFinalized?: Maybe<local1338_OptimisticRootFinalized>;
  local1338_optimisticRootFinalizeds: Array<local1338_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  local1338__meta?: Maybe<local1338__Meta_>;
};


export type Querylocal1338_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Asset_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Asset_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_AssetStatus_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_AssetBalance_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Router_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Router_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_RouterDailyTVL_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Setting_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Setting_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Relayer_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Relayer_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Sequencer_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Sequencer_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_RelayerFee_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_OriginTransfer_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_DestinationTransfer_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_OriginMessage_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_AggregateRoot_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_ConnectorMeta_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_RootCount_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_RootCount_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_RootMessageSent_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_RelayerFeesIncrease_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_SlippageUpdate_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_SnapshotRoot_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_SpokeConnectorMode_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_AggregateRootProposed_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_OptimisticRootFinalized_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338__metaArgs = {
  block?: InputMaybe<local1338_Block_height>;
};

export type local1338_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['local1338_Bytes']>;
};

export type local1338_RelayerFee = {
  id: Scalars['ID'];
  transfer: local1338_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['local1338_Bytes'];
};

export type local1338_RelayerFee_filter = {
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
  transfer_?: InputMaybe<local1338_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['local1338_Bytes']>;
  asset_not?: InputMaybe<Scalars['local1338_Bytes']>;
  asset_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  asset_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  asset_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  asset_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<local1338_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<local1338_RelayerFee_filter>>>;
};

export type local1338_RelayerFee_orderBy =
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

export type local1338_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: local1338_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['local1338_Bytes']>;
  caller: Scalars['local1338_Bytes'];
  transactionHash: Scalars['local1338_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type local1338_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<local1338_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['local1338_Bytes']>;
  asset_not?: InputMaybe<Scalars['local1338_Bytes']>;
  asset_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  asset_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  asset_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  asset_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  caller?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_not?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<local1338_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<local1338_RelayerFeesIncrease_filter>>>;
};

export type local1338_RelayerFeesIncrease_orderBy =
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

export type local1338_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['local1338_Bytes']>;
  relayer_not?: InputMaybe<Scalars['local1338_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<local1338_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<local1338_Relayer_filter>>>;
};

export type local1338_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type local1338_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type local1338_RootCount_filter = {
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
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<local1338_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<local1338_RootCount_filter>>>;
};

export type local1338_RootCount_orderBy =
  | 'id'
  | 'count';

export type local1338_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['local1338_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['local1338_Bytes']>;
  transactionHash?: Maybe<Scalars['local1338_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type local1338_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['local1338_Bytes']>;
  root_not?: InputMaybe<Scalars['local1338_Bytes']>;
  root_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  root_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  root_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  root_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  root_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_not?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<local1338_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<local1338_RootMessageSent_filter>>>;
};

export type local1338_RootMessageSent_orderBy =
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

export type local1338_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['local1338_Bytes']>;
  recipient?: Maybe<Scalars['local1338_Bytes']>;
  proposedOwner?: Maybe<Scalars['local1338_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<local1338_AssetBalance>;
};


export type local1338_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_AssetBalance_filter>;
};

export type local1338_RouterDailyTVL = {
  id: Scalars['ID'];
  router: local1338_Router;
  asset: local1338_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type local1338_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<local1338_Router_filter>;
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
  asset_?: InputMaybe<local1338_Asset_filter>;
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
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<local1338_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<local1338_RouterDailyTVL_filter>>>;
};

export type local1338_RouterDailyTVL_orderBy =
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
  | 'asset__canonicalId'
  | 'asset__canonicalDomain'
  | 'asset__adoptedAsset'
  | 'asset__localAsset'
  | 'asset__blockNumber'
  | 'timestamp'
  | 'balance';

export type local1338_Router_filter = {
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
  owner?: InputMaybe<Scalars['local1338_Bytes']>;
  owner_not?: InputMaybe<Scalars['local1338_Bytes']>;
  owner_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  owner_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  owner_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  owner_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  recipient?: InputMaybe<Scalars['local1338_Bytes']>;
  recipient_not?: InputMaybe<Scalars['local1338_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['local1338_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['local1338_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<local1338_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<local1338_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<local1338_Router_filter>>>;
};

export type local1338_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type local1338_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['local1338_Bytes']>;
};

export type local1338_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['local1338_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['local1338_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<local1338_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<local1338_Sequencer_filter>>>;
};

export type local1338_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type local1338_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['local1338_Bytes'];
};

export type local1338_Setting_filter = {
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
  caller?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_not?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<local1338_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<local1338_Setting_filter>>>;
};

export type local1338_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type local1338_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: local1338_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['local1338_Bytes'];
  transactionHash: Scalars['local1338_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type local1338_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<local1338_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_not?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<local1338_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<local1338_SlippageUpdate_filter>>>;
};

export type local1338_SlippageUpdate_orderBy =
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

export type local1338_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['local1338_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type local1338_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['local1338_Bytes']>;
  root_not?: InputMaybe<Scalars['local1338_Bytes']>;
  root_gt?: InputMaybe<Scalars['local1338_Bytes']>;
  root_lt?: InputMaybe<Scalars['local1338_Bytes']>;
  root_gte?: InputMaybe<Scalars['local1338_Bytes']>;
  root_lte?: InputMaybe<Scalars['local1338_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  root_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<local1338_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<local1338_SnapshotRoot_filter>>>;
};

export type local1338_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type local1338_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type local1338_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<local1338_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<local1338_SpokeConnectorMode_filter>>>;
};

export type local1338_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  local1338_asset?: Maybe<local1338_Asset>;
  local1338_assets: Array<local1338_Asset>;
  local1338_assetStatus?: Maybe<local1338_AssetStatus>;
  local1338_assetStatuses: Array<local1338_AssetStatus>;
  local1338_assetBalance?: Maybe<local1338_AssetBalance>;
  local1338_assetBalances: Array<local1338_AssetBalance>;
  local1338_router?: Maybe<local1338_Router>;
  local1338_routers: Array<local1338_Router>;
  local1338_routerDailyTVL?: Maybe<local1338_RouterDailyTVL>;
  local1338_routerDailyTVLs: Array<local1338_RouterDailyTVL>;
  local1338_setting?: Maybe<local1338_Setting>;
  local1338_settings: Array<local1338_Setting>;
  local1338_relayer?: Maybe<local1338_Relayer>;
  local1338_relayers: Array<local1338_Relayer>;
  local1338_sequencer?: Maybe<local1338_Sequencer>;
  local1338_sequencers: Array<local1338_Sequencer>;
  local1338_relayerFee?: Maybe<local1338_RelayerFee>;
  local1338_relayerFees: Array<local1338_RelayerFee>;
  local1338_originTransfer?: Maybe<local1338_OriginTransfer>;
  local1338_originTransfers: Array<local1338_OriginTransfer>;
  local1338_destinationTransfer?: Maybe<local1338_DestinationTransfer>;
  local1338_destinationTransfers: Array<local1338_DestinationTransfer>;
  local1338_originMessage?: Maybe<local1338_OriginMessage>;
  local1338_originMessages: Array<local1338_OriginMessage>;
  local1338_aggregateRoot?: Maybe<local1338_AggregateRoot>;
  local1338_aggregateRoots: Array<local1338_AggregateRoot>;
  local1338_connectorMeta?: Maybe<local1338_ConnectorMeta>;
  local1338_connectorMetas: Array<local1338_ConnectorMeta>;
  local1338_rootCount?: Maybe<local1338_RootCount>;
  local1338_rootCounts: Array<local1338_RootCount>;
  local1338_rootMessageSent?: Maybe<local1338_RootMessageSent>;
  local1338_rootMessageSents: Array<local1338_RootMessageSent>;
  local1338_relayerFeesIncrease?: Maybe<local1338_RelayerFeesIncrease>;
  local1338_relayerFeesIncreases: Array<local1338_RelayerFeesIncrease>;
  local1338_slippageUpdate?: Maybe<local1338_SlippageUpdate>;
  local1338_slippageUpdates: Array<local1338_SlippageUpdate>;
  local1338_snapshotRoot?: Maybe<local1338_SnapshotRoot>;
  local1338_snapshotRoots: Array<local1338_SnapshotRoot>;
  local1338_spokeConnectorMode?: Maybe<local1338_SpokeConnectorMode>;
  local1338_spokeConnectorModes: Array<local1338_SpokeConnectorMode>;
  local1338_aggregateRootProposed?: Maybe<local1338_AggregateRootProposed>;
  local1338_aggregateRootProposeds: Array<local1338_AggregateRootProposed>;
  local1338_optimisticRootFinalized?: Maybe<local1338_OptimisticRootFinalized>;
  local1338_optimisticRootFinalizeds: Array<local1338_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  local1338__meta?: Maybe<local1338__Meta_>;
};


export type Subscriptionlocal1338_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Asset_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Asset_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_AssetStatus_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_AssetBalance_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Router_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Router_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_RouterDailyTVL_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Setting_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Setting_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Relayer_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Relayer_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Sequencer_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Sequencer_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_RelayerFee_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_OriginTransfer_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_DestinationTransfer_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_OriginMessage_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_AggregateRoot_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_ConnectorMeta_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_RootCount_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_RootCount_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_RootMessageSent_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_RelayerFeesIncrease_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_SlippageUpdate_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_SnapshotRoot_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_SpokeConnectorMode_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_AggregateRootProposed_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_OptimisticRootFinalized_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338__metaArgs = {
  block?: InputMaybe<local1338_Block_height>;
};

export type local1338_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type local1338__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['local1338_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type local1338__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: local1338__Block_;
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
  local1338_asset: InContextSdkMethod<Query['local1338_asset'], Querylocal1338_assetArgs, MeshContext>,
  /** null **/
  local1338_assets: InContextSdkMethod<Query['local1338_assets'], Querylocal1338_assetsArgs, MeshContext>,
  /** null **/
  local1338_assetStatus: InContextSdkMethod<Query['local1338_assetStatus'], Querylocal1338_assetStatusArgs, MeshContext>,
  /** null **/
  local1338_assetStatuses: InContextSdkMethod<Query['local1338_assetStatuses'], Querylocal1338_assetStatusesArgs, MeshContext>,
  /** null **/
  local1338_assetBalance: InContextSdkMethod<Query['local1338_assetBalance'], Querylocal1338_assetBalanceArgs, MeshContext>,
  /** null **/
  local1338_assetBalances: InContextSdkMethod<Query['local1338_assetBalances'], Querylocal1338_assetBalancesArgs, MeshContext>,
  /** null **/
  local1338_router: InContextSdkMethod<Query['local1338_router'], Querylocal1338_routerArgs, MeshContext>,
  /** null **/
  local1338_routers: InContextSdkMethod<Query['local1338_routers'], Querylocal1338_routersArgs, MeshContext>,
  /** null **/
  local1338_routerDailyTVL: InContextSdkMethod<Query['local1338_routerDailyTVL'], Querylocal1338_routerDailyTVLArgs, MeshContext>,
  /** null **/
  local1338_routerDailyTVLs: InContextSdkMethod<Query['local1338_routerDailyTVLs'], Querylocal1338_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  local1338_setting: InContextSdkMethod<Query['local1338_setting'], Querylocal1338_settingArgs, MeshContext>,
  /** null **/
  local1338_settings: InContextSdkMethod<Query['local1338_settings'], Querylocal1338_settingsArgs, MeshContext>,
  /** null **/
  local1338_relayer: InContextSdkMethod<Query['local1338_relayer'], Querylocal1338_relayerArgs, MeshContext>,
  /** null **/
  local1338_relayers: InContextSdkMethod<Query['local1338_relayers'], Querylocal1338_relayersArgs, MeshContext>,
  /** null **/
  local1338_sequencer: InContextSdkMethod<Query['local1338_sequencer'], Querylocal1338_sequencerArgs, MeshContext>,
  /** null **/
  local1338_sequencers: InContextSdkMethod<Query['local1338_sequencers'], Querylocal1338_sequencersArgs, MeshContext>,
  /** null **/
  local1338_relayerFee: InContextSdkMethod<Query['local1338_relayerFee'], Querylocal1338_relayerFeeArgs, MeshContext>,
  /** null **/
  local1338_relayerFees: InContextSdkMethod<Query['local1338_relayerFees'], Querylocal1338_relayerFeesArgs, MeshContext>,
  /** null **/
  local1338_originTransfer: InContextSdkMethod<Query['local1338_originTransfer'], Querylocal1338_originTransferArgs, MeshContext>,
  /** null **/
  local1338_originTransfers: InContextSdkMethod<Query['local1338_originTransfers'], Querylocal1338_originTransfersArgs, MeshContext>,
  /** null **/
  local1338_destinationTransfer: InContextSdkMethod<Query['local1338_destinationTransfer'], Querylocal1338_destinationTransferArgs, MeshContext>,
  /** null **/
  local1338_destinationTransfers: InContextSdkMethod<Query['local1338_destinationTransfers'], Querylocal1338_destinationTransfersArgs, MeshContext>,
  /** null **/
  local1338_originMessage: InContextSdkMethod<Query['local1338_originMessage'], Querylocal1338_originMessageArgs, MeshContext>,
  /** null **/
  local1338_originMessages: InContextSdkMethod<Query['local1338_originMessages'], Querylocal1338_originMessagesArgs, MeshContext>,
  /** null **/
  local1338_aggregateRoot: InContextSdkMethod<Query['local1338_aggregateRoot'], Querylocal1338_aggregateRootArgs, MeshContext>,
  /** null **/
  local1338_aggregateRoots: InContextSdkMethod<Query['local1338_aggregateRoots'], Querylocal1338_aggregateRootsArgs, MeshContext>,
  /** null **/
  local1338_connectorMeta: InContextSdkMethod<Query['local1338_connectorMeta'], Querylocal1338_connectorMetaArgs, MeshContext>,
  /** null **/
  local1338_connectorMetas: InContextSdkMethod<Query['local1338_connectorMetas'], Querylocal1338_connectorMetasArgs, MeshContext>,
  /** null **/
  local1338_rootCount: InContextSdkMethod<Query['local1338_rootCount'], Querylocal1338_rootCountArgs, MeshContext>,
  /** null **/
  local1338_rootCounts: InContextSdkMethod<Query['local1338_rootCounts'], Querylocal1338_rootCountsArgs, MeshContext>,
  /** null **/
  local1338_rootMessageSent: InContextSdkMethod<Query['local1338_rootMessageSent'], Querylocal1338_rootMessageSentArgs, MeshContext>,
  /** null **/
  local1338_rootMessageSents: InContextSdkMethod<Query['local1338_rootMessageSents'], Querylocal1338_rootMessageSentsArgs, MeshContext>,
  /** null **/
  local1338_relayerFeesIncrease: InContextSdkMethod<Query['local1338_relayerFeesIncrease'], Querylocal1338_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  local1338_relayerFeesIncreases: InContextSdkMethod<Query['local1338_relayerFeesIncreases'], Querylocal1338_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  local1338_slippageUpdate: InContextSdkMethod<Query['local1338_slippageUpdate'], Querylocal1338_slippageUpdateArgs, MeshContext>,
  /** null **/
  local1338_slippageUpdates: InContextSdkMethod<Query['local1338_slippageUpdates'], Querylocal1338_slippageUpdatesArgs, MeshContext>,
  /** null **/
  local1338_snapshotRoot: InContextSdkMethod<Query['local1338_snapshotRoot'], Querylocal1338_snapshotRootArgs, MeshContext>,
  /** null **/
  local1338_snapshotRoots: InContextSdkMethod<Query['local1338_snapshotRoots'], Querylocal1338_snapshotRootsArgs, MeshContext>,
  /** null **/
  local1338_spokeConnectorMode: InContextSdkMethod<Query['local1338_spokeConnectorMode'], Querylocal1338_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  local1338_spokeConnectorModes: InContextSdkMethod<Query['local1338_spokeConnectorModes'], Querylocal1338_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  local1338_aggregateRootProposed: InContextSdkMethod<Query['local1338_aggregateRootProposed'], Querylocal1338_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  local1338_aggregateRootProposeds: InContextSdkMethod<Query['local1338_aggregateRootProposeds'], Querylocal1338_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  local1338_optimisticRootFinalized: InContextSdkMethod<Query['local1338_optimisticRootFinalized'], Querylocal1338_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  local1338_optimisticRootFinalizeds: InContextSdkMethod<Query['local1338_optimisticRootFinalizeds'], Querylocal1338_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  local1338__meta: InContextSdkMethod<Query['local1338__meta'], Querylocal1338__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  local1338_asset: InContextSdkMethod<Subscription['local1338_asset'], Subscriptionlocal1338_assetArgs, MeshContext>,
  /** null **/
  local1338_assets: InContextSdkMethod<Subscription['local1338_assets'], Subscriptionlocal1338_assetsArgs, MeshContext>,
  /** null **/
  local1338_assetStatus: InContextSdkMethod<Subscription['local1338_assetStatus'], Subscriptionlocal1338_assetStatusArgs, MeshContext>,
  /** null **/
  local1338_assetStatuses: InContextSdkMethod<Subscription['local1338_assetStatuses'], Subscriptionlocal1338_assetStatusesArgs, MeshContext>,
  /** null **/
  local1338_assetBalance: InContextSdkMethod<Subscription['local1338_assetBalance'], Subscriptionlocal1338_assetBalanceArgs, MeshContext>,
  /** null **/
  local1338_assetBalances: InContextSdkMethod<Subscription['local1338_assetBalances'], Subscriptionlocal1338_assetBalancesArgs, MeshContext>,
  /** null **/
  local1338_router: InContextSdkMethod<Subscription['local1338_router'], Subscriptionlocal1338_routerArgs, MeshContext>,
  /** null **/
  local1338_routers: InContextSdkMethod<Subscription['local1338_routers'], Subscriptionlocal1338_routersArgs, MeshContext>,
  /** null **/
  local1338_routerDailyTVL: InContextSdkMethod<Subscription['local1338_routerDailyTVL'], Subscriptionlocal1338_routerDailyTVLArgs, MeshContext>,
  /** null **/
  local1338_routerDailyTVLs: InContextSdkMethod<Subscription['local1338_routerDailyTVLs'], Subscriptionlocal1338_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  local1338_setting: InContextSdkMethod<Subscription['local1338_setting'], Subscriptionlocal1338_settingArgs, MeshContext>,
  /** null **/
  local1338_settings: InContextSdkMethod<Subscription['local1338_settings'], Subscriptionlocal1338_settingsArgs, MeshContext>,
  /** null **/
  local1338_relayer: InContextSdkMethod<Subscription['local1338_relayer'], Subscriptionlocal1338_relayerArgs, MeshContext>,
  /** null **/
  local1338_relayers: InContextSdkMethod<Subscription['local1338_relayers'], Subscriptionlocal1338_relayersArgs, MeshContext>,
  /** null **/
  local1338_sequencer: InContextSdkMethod<Subscription['local1338_sequencer'], Subscriptionlocal1338_sequencerArgs, MeshContext>,
  /** null **/
  local1338_sequencers: InContextSdkMethod<Subscription['local1338_sequencers'], Subscriptionlocal1338_sequencersArgs, MeshContext>,
  /** null **/
  local1338_relayerFee: InContextSdkMethod<Subscription['local1338_relayerFee'], Subscriptionlocal1338_relayerFeeArgs, MeshContext>,
  /** null **/
  local1338_relayerFees: InContextSdkMethod<Subscription['local1338_relayerFees'], Subscriptionlocal1338_relayerFeesArgs, MeshContext>,
  /** null **/
  local1338_originTransfer: InContextSdkMethod<Subscription['local1338_originTransfer'], Subscriptionlocal1338_originTransferArgs, MeshContext>,
  /** null **/
  local1338_originTransfers: InContextSdkMethod<Subscription['local1338_originTransfers'], Subscriptionlocal1338_originTransfersArgs, MeshContext>,
  /** null **/
  local1338_destinationTransfer: InContextSdkMethod<Subscription['local1338_destinationTransfer'], Subscriptionlocal1338_destinationTransferArgs, MeshContext>,
  /** null **/
  local1338_destinationTransfers: InContextSdkMethod<Subscription['local1338_destinationTransfers'], Subscriptionlocal1338_destinationTransfersArgs, MeshContext>,
  /** null **/
  local1338_originMessage: InContextSdkMethod<Subscription['local1338_originMessage'], Subscriptionlocal1338_originMessageArgs, MeshContext>,
  /** null **/
  local1338_originMessages: InContextSdkMethod<Subscription['local1338_originMessages'], Subscriptionlocal1338_originMessagesArgs, MeshContext>,
  /** null **/
  local1338_aggregateRoot: InContextSdkMethod<Subscription['local1338_aggregateRoot'], Subscriptionlocal1338_aggregateRootArgs, MeshContext>,
  /** null **/
  local1338_aggregateRoots: InContextSdkMethod<Subscription['local1338_aggregateRoots'], Subscriptionlocal1338_aggregateRootsArgs, MeshContext>,
  /** null **/
  local1338_connectorMeta: InContextSdkMethod<Subscription['local1338_connectorMeta'], Subscriptionlocal1338_connectorMetaArgs, MeshContext>,
  /** null **/
  local1338_connectorMetas: InContextSdkMethod<Subscription['local1338_connectorMetas'], Subscriptionlocal1338_connectorMetasArgs, MeshContext>,
  /** null **/
  local1338_rootCount: InContextSdkMethod<Subscription['local1338_rootCount'], Subscriptionlocal1338_rootCountArgs, MeshContext>,
  /** null **/
  local1338_rootCounts: InContextSdkMethod<Subscription['local1338_rootCounts'], Subscriptionlocal1338_rootCountsArgs, MeshContext>,
  /** null **/
  local1338_rootMessageSent: InContextSdkMethod<Subscription['local1338_rootMessageSent'], Subscriptionlocal1338_rootMessageSentArgs, MeshContext>,
  /** null **/
  local1338_rootMessageSents: InContextSdkMethod<Subscription['local1338_rootMessageSents'], Subscriptionlocal1338_rootMessageSentsArgs, MeshContext>,
  /** null **/
  local1338_relayerFeesIncrease: InContextSdkMethod<Subscription['local1338_relayerFeesIncrease'], Subscriptionlocal1338_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  local1338_relayerFeesIncreases: InContextSdkMethod<Subscription['local1338_relayerFeesIncreases'], Subscriptionlocal1338_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  local1338_slippageUpdate: InContextSdkMethod<Subscription['local1338_slippageUpdate'], Subscriptionlocal1338_slippageUpdateArgs, MeshContext>,
  /** null **/
  local1338_slippageUpdates: InContextSdkMethod<Subscription['local1338_slippageUpdates'], Subscriptionlocal1338_slippageUpdatesArgs, MeshContext>,
  /** null **/
  local1338_snapshotRoot: InContextSdkMethod<Subscription['local1338_snapshotRoot'], Subscriptionlocal1338_snapshotRootArgs, MeshContext>,
  /** null **/
  local1338_snapshotRoots: InContextSdkMethod<Subscription['local1338_snapshotRoots'], Subscriptionlocal1338_snapshotRootsArgs, MeshContext>,
  /** null **/
  local1338_spokeConnectorMode: InContextSdkMethod<Subscription['local1338_spokeConnectorMode'], Subscriptionlocal1338_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  local1338_spokeConnectorModes: InContextSdkMethod<Subscription['local1338_spokeConnectorModes'], Subscriptionlocal1338_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  local1338_aggregateRootProposed: InContextSdkMethod<Subscription['local1338_aggregateRootProposed'], Subscriptionlocal1338_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  local1338_aggregateRootProposeds: InContextSdkMethod<Subscription['local1338_aggregateRootProposeds'], Subscriptionlocal1338_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  local1338_optimisticRootFinalized: InContextSdkMethod<Subscription['local1338_optimisticRootFinalized'], Subscriptionlocal1338_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  local1338_optimisticRootFinalizeds: InContextSdkMethod<Subscription['local1338_optimisticRootFinalizeds'], Subscriptionlocal1338_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  local1338__meta: InContextSdkMethod<Subscription['local1338__meta'], Subscriptionlocal1338__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Local1338"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
