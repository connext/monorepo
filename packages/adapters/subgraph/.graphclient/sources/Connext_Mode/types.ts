// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextModeTypes {
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
  mode_BigDecimal: any;
  BigInt: any;
  mode_Bytes: any;
  mode_Int8: any;
  Timestamp: any;
};

export type mode_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['mode_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type mode_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['mode_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type mode_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['mode_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['mode_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['mode_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['mode_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['mode_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['mode_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['mode_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
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
  _change_block?: InputMaybe<mode_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mode_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mode_AggregateRootProposed_filter>>>;
};

export type mode_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type mode_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['mode_Bytes']>;
  root_not?: InputMaybe<Scalars['mode_Bytes']>;
  root_gt?: InputMaybe<Scalars['mode_Bytes']>;
  root_lt?: InputMaybe<Scalars['mode_Bytes']>;
  root_gte?: InputMaybe<Scalars['mode_Bytes']>;
  root_lte?: InputMaybe<Scalars['mode_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  root_contains?: InputMaybe<Scalars['mode_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mode_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mode_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mode_AggregateRoot_filter>>>;
};

export type mode_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type mode_Aggregation_interval =
  | 'hour'
  | 'day';

export type mode_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['mode_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['mode_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['mode_Bytes']>;
  localAsset?: Maybe<Scalars['mode_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<mode_AssetStatus>;
};

export type mode_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: mode_Router;
  asset: mode_Asset;
  feesEarned: Scalars['BigInt'];
};

export type mode_AssetBalance_filter = {
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
  router_?: InputMaybe<mode_Router_filter>;
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
  asset_?: InputMaybe<mode_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mode_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mode_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mode_AssetBalance_filter>>>;
};

export type mode_AssetBalance_orderBy =
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

export type mode_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type mode_AssetStatus_filter = {
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
  _change_block?: InputMaybe<mode_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mode_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mode_AssetStatus_filter>>>;
};

export type mode_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type mode_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['mode_Bytes']>;
  key_not?: InputMaybe<Scalars['mode_Bytes']>;
  key_gt?: InputMaybe<Scalars['mode_Bytes']>;
  key_lt?: InputMaybe<Scalars['mode_Bytes']>;
  key_gte?: InputMaybe<Scalars['mode_Bytes']>;
  key_lte?: InputMaybe<Scalars['mode_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  key_contains?: InputMaybe<Scalars['mode_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['mode_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['mode_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['mode_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['mode_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['mode_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['mode_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['mode_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['mode_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['mode_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['mode_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['mode_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['mode_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['mode_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['mode_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  localAsset?: InputMaybe<Scalars['mode_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['mode_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['mode_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['mode_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['mode_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['mode_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['mode_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
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
  status_?: InputMaybe<mode_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mode_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mode_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mode_Asset_filter>>>;
};

export type mode_Asset_orderBy =
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

export type mode_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type mode_Block_height = {
  hash?: InputMaybe<Scalars['mode_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type mode_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['mode_Bytes']>;
  rootManager?: Maybe<Scalars['mode_Bytes']>;
  mirrorConnector?: Maybe<Scalars['mode_Bytes']>;
};

export type mode_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['mode_Bytes']>;
  amb_not?: InputMaybe<Scalars['mode_Bytes']>;
  amb_gt?: InputMaybe<Scalars['mode_Bytes']>;
  amb_lt?: InputMaybe<Scalars['mode_Bytes']>;
  amb_gte?: InputMaybe<Scalars['mode_Bytes']>;
  amb_lte?: InputMaybe<Scalars['mode_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['mode_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  rootManager?: InputMaybe<Scalars['mode_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['mode_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['mode_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['mode_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['mode_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['mode_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['mode_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['mode_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['mode_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['mode_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['mode_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['mode_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['mode_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['mode_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mode_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mode_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mode_ConnectorMeta_filter>>>;
};

export type mode_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type mode_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['mode_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<mode_TransferStatus>;
  routers?: Maybe<Array<mode_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['mode_Bytes']>;
  delegate?: Maybe<Scalars['mode_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['mode_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['mode_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['mode_Bytes']>;
  asset?: Maybe<mode_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['mode_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['mode_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['mode_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['mode_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['mode_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['mode_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type mode_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_Router_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_Router_filter>;
};

export type mode_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['mode_Bytes']>;
  transferId_not?: InputMaybe<Scalars['mode_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['mode_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['mode_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['mode_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['mode_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['mode_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<mode_TransferStatus>;
  status_not?: InputMaybe<mode_TransferStatus>;
  status_in?: InputMaybe<Array<mode_TransferStatus>>;
  status_not_in?: InputMaybe<Array<mode_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<mode_Router_filter>;
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
  to?: InputMaybe<Scalars['mode_Bytes']>;
  to_not?: InputMaybe<Scalars['mode_Bytes']>;
  to_gt?: InputMaybe<Scalars['mode_Bytes']>;
  to_lt?: InputMaybe<Scalars['mode_Bytes']>;
  to_gte?: InputMaybe<Scalars['mode_Bytes']>;
  to_lte?: InputMaybe<Scalars['mode_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  to_contains?: InputMaybe<Scalars['mode_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  delegate?: InputMaybe<Scalars['mode_Bytes']>;
  delegate_not?: InputMaybe<Scalars['mode_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['mode_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['mode_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['mode_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['mode_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['mode_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['mode_Bytes']>;
  callData_not?: InputMaybe<Scalars['mode_Bytes']>;
  callData_gt?: InputMaybe<Scalars['mode_Bytes']>;
  callData_lt?: InputMaybe<Scalars['mode_Bytes']>;
  callData_gte?: InputMaybe<Scalars['mode_Bytes']>;
  callData_lte?: InputMaybe<Scalars['mode_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['mode_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
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
  originSender?: InputMaybe<Scalars['mode_Bytes']>;
  originSender_not?: InputMaybe<Scalars['mode_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['mode_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['mode_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['mode_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['mode_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['mode_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['mode_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['mode_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['mode_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['mode_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['mode_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['mode_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['mode_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
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
  asset_?: InputMaybe<mode_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['mode_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['mode_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['mode_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['mode_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['mode_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['mode_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['mode_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['mode_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['mode_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['mode_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['mode_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['mode_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['mode_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['mode_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['mode_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['mode_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['mode_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['mode_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['mode_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['mode_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['mode_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['mode_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['mode_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['mode_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['mode_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['mode_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['mode_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['mode_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['mode_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['mode_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['mode_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['mode_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['mode_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['mode_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['mode_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['mode_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['mode_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['mode_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['mode_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['mode_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['mode_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['mode_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mode_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mode_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mode_DestinationTransfer_filter>>>;
};

export type mode_DestinationTransfer_orderBy =
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

export type mode_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['mode_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type mode_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['mode_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['mode_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['mode_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['mode_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['mode_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['mode_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['mode_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
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
  _change_block?: InputMaybe<mode_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mode_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mode_OptimisticRootFinalized_filter>>>;
};

export type mode_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type mode_OrderDirection =
  | 'asc'
  | 'desc';

export type mode_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['mode_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['mode_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['mode_Bytes']>;
  root?: Maybe<Scalars['mode_Bytes']>;
  transactionHash?: Maybe<Scalars['mode_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<mode_RootCount>;
};

export type mode_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['mode_Bytes']>;
  transferId_not?: InputMaybe<Scalars['mode_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['mode_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['mode_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['mode_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['mode_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['mode_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['mode_Bytes']>;
  leaf_not?: InputMaybe<Scalars['mode_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['mode_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['mode_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['mode_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['mode_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['mode_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['mode_Bytes']>;
  message_not?: InputMaybe<Scalars['mode_Bytes']>;
  message_gt?: InputMaybe<Scalars['mode_Bytes']>;
  message_lt?: InputMaybe<Scalars['mode_Bytes']>;
  message_gte?: InputMaybe<Scalars['mode_Bytes']>;
  message_lte?: InputMaybe<Scalars['mode_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  message_contains?: InputMaybe<Scalars['mode_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  root?: InputMaybe<Scalars['mode_Bytes']>;
  root_not?: InputMaybe<Scalars['mode_Bytes']>;
  root_gt?: InputMaybe<Scalars['mode_Bytes']>;
  root_lt?: InputMaybe<Scalars['mode_Bytes']>;
  root_gte?: InputMaybe<Scalars['mode_Bytes']>;
  root_lte?: InputMaybe<Scalars['mode_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  root_contains?: InputMaybe<Scalars['mode_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
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
  rootCount_?: InputMaybe<mode_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mode_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mode_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mode_OriginMessage_filter>>>;
};

export type mode_OriginMessage_orderBy =
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

export type mode_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['mode_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<mode_TransferStatus>;
  messageHash?: Maybe<Scalars['mode_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['mode_Bytes']>;
  delegate?: Maybe<Scalars['mode_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['mode_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['mode_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['mode_Bytes']>;
  asset?: Maybe<mode_Asset>;
  transactingAsset?: Maybe<Scalars['mode_Bytes']>;
  message?: Maybe<mode_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<mode_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['mode_Bytes']>;
  caller?: Maybe<Scalars['mode_Bytes']>;
  transactionHash?: Maybe<Scalars['mode_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['mode_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type mode_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_RelayerFee_filter>;
};

export type mode_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['mode_Bytes']>;
  transferId_not?: InputMaybe<Scalars['mode_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['mode_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['mode_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['mode_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['mode_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['mode_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<mode_TransferStatus>;
  status_not?: InputMaybe<mode_TransferStatus>;
  status_in?: InputMaybe<Array<mode_TransferStatus>>;
  status_not_in?: InputMaybe<Array<mode_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['mode_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['mode_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['mode_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['mode_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['mode_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['mode_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['mode_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
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
  to?: InputMaybe<Scalars['mode_Bytes']>;
  to_not?: InputMaybe<Scalars['mode_Bytes']>;
  to_gt?: InputMaybe<Scalars['mode_Bytes']>;
  to_lt?: InputMaybe<Scalars['mode_Bytes']>;
  to_gte?: InputMaybe<Scalars['mode_Bytes']>;
  to_lte?: InputMaybe<Scalars['mode_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  to_contains?: InputMaybe<Scalars['mode_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  delegate?: InputMaybe<Scalars['mode_Bytes']>;
  delegate_not?: InputMaybe<Scalars['mode_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['mode_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['mode_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['mode_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['mode_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['mode_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['mode_Bytes']>;
  callData_not?: InputMaybe<Scalars['mode_Bytes']>;
  callData_gt?: InputMaybe<Scalars['mode_Bytes']>;
  callData_lt?: InputMaybe<Scalars['mode_Bytes']>;
  callData_gte?: InputMaybe<Scalars['mode_Bytes']>;
  callData_lte?: InputMaybe<Scalars['mode_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['mode_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['mode_Bytes']>;
  originSender_not?: InputMaybe<Scalars['mode_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['mode_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['mode_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['mode_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['mode_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['mode_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['mode_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['mode_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['mode_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['mode_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['mode_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['mode_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['mode_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
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
  asset_?: InputMaybe<mode_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['mode_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['mode_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['mode_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['mode_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['mode_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['mode_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['mode_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
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
  message_?: InputMaybe<mode_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<mode_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['mode_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['mode_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['mode_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['mode_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['mode_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['mode_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['mode_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  caller?: InputMaybe<Scalars['mode_Bytes']>;
  caller_not?: InputMaybe<Scalars['mode_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mode_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mode_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mode_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mode_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mode_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['mode_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['mode_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['mode_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['mode_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['mode_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['mode_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['mode_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mode_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mode_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mode_OriginTransfer_filter>>>;
};

export type mode_OriginTransfer_orderBy =
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
  mode_asset?: Maybe<mode_Asset>;
  mode_assets: Array<mode_Asset>;
  mode_assetStatus?: Maybe<mode_AssetStatus>;
  mode_assetStatuses: Array<mode_AssetStatus>;
  mode_assetBalance?: Maybe<mode_AssetBalance>;
  mode_assetBalances: Array<mode_AssetBalance>;
  mode_router?: Maybe<mode_Router>;
  mode_routers: Array<mode_Router>;
  mode_routerDailyTVL?: Maybe<mode_RouterDailyTVL>;
  mode_routerDailyTVLs: Array<mode_RouterDailyTVL>;
  mode_routerLiquidityEvent?: Maybe<mode_RouterLiquidityEvent>;
  mode_routerLiquidityEvents: Array<mode_RouterLiquidityEvent>;
  mode_setting?: Maybe<mode_Setting>;
  mode_settings: Array<mode_Setting>;
  mode_relayer?: Maybe<mode_Relayer>;
  mode_relayers: Array<mode_Relayer>;
  mode_sequencer?: Maybe<mode_Sequencer>;
  mode_sequencers: Array<mode_Sequencer>;
  mode_relayerFee?: Maybe<mode_RelayerFee>;
  mode_relayerFees: Array<mode_RelayerFee>;
  mode_originTransfer?: Maybe<mode_OriginTransfer>;
  mode_originTransfers: Array<mode_OriginTransfer>;
  mode_destinationTransfer?: Maybe<mode_DestinationTransfer>;
  mode_destinationTransfers: Array<mode_DestinationTransfer>;
  mode_originMessage?: Maybe<mode_OriginMessage>;
  mode_originMessages: Array<mode_OriginMessage>;
  mode_aggregateRoot?: Maybe<mode_AggregateRoot>;
  mode_aggregateRoots: Array<mode_AggregateRoot>;
  mode_connectorMeta?: Maybe<mode_ConnectorMeta>;
  mode_connectorMetas: Array<mode_ConnectorMeta>;
  mode_rootCount?: Maybe<mode_RootCount>;
  mode_rootCounts: Array<mode_RootCount>;
  mode_rootMessageSent?: Maybe<mode_RootMessageSent>;
  mode_rootMessageSents: Array<mode_RootMessageSent>;
  mode_relayerFeesIncrease?: Maybe<mode_RelayerFeesIncrease>;
  mode_relayerFeesIncreases: Array<mode_RelayerFeesIncrease>;
  mode_slippageUpdate?: Maybe<mode_SlippageUpdate>;
  mode_slippageUpdates: Array<mode_SlippageUpdate>;
  mode_snapshotRoot?: Maybe<mode_SnapshotRoot>;
  mode_snapshotRoots: Array<mode_SnapshotRoot>;
  mode_spokeConnectorMode?: Maybe<mode_SpokeConnectorMode>;
  mode_spokeConnectorModes: Array<mode_SpokeConnectorMode>;
  mode_aggregateRootProposed?: Maybe<mode_AggregateRootProposed>;
  mode_aggregateRootProposeds: Array<mode_AggregateRootProposed>;
  mode_optimisticRootFinalized?: Maybe<mode_OptimisticRootFinalized>;
  mode_optimisticRootFinalizeds: Array<mode_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  mode__meta?: Maybe<mode__Meta_>;
};


export type Querymode_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_Asset_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_Asset_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_AssetStatus_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_AssetBalance_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_Router_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_Router_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_RouterDailyTVL_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_RouterLiquidityEvent_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_Setting_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_Setting_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_Relayer_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_Relayer_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_Sequencer_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_Sequencer_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_RelayerFee_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_OriginTransfer_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_DestinationTransfer_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_OriginMessage_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_AggregateRoot_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_ConnectorMeta_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_RootCount_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_RootCount_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_RootMessageSent_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_RelayerFeesIncrease_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_SlippageUpdate_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_SnapshotRoot_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_SpokeConnectorMode_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_AggregateRootProposed_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_OptimisticRootFinalized_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymode__metaArgs = {
  block?: InputMaybe<mode_Block_height>;
};

export type mode_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['mode_Bytes']>;
};

export type mode_RelayerFee = {
  id: Scalars['ID'];
  transfer: mode_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['mode_Bytes'];
};

export type mode_RelayerFee_filter = {
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
  transfer_?: InputMaybe<mode_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['mode_Bytes']>;
  asset_not?: InputMaybe<Scalars['mode_Bytes']>;
  asset_gt?: InputMaybe<Scalars['mode_Bytes']>;
  asset_lt?: InputMaybe<Scalars['mode_Bytes']>;
  asset_gte?: InputMaybe<Scalars['mode_Bytes']>;
  asset_lte?: InputMaybe<Scalars['mode_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['mode_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mode_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mode_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mode_RelayerFee_filter>>>;
};

export type mode_RelayerFee_orderBy =
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

export type mode_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: mode_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['mode_Bytes']>;
  caller: Scalars['mode_Bytes'];
  transactionHash: Scalars['mode_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type mode_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<mode_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['mode_Bytes']>;
  asset_not?: InputMaybe<Scalars['mode_Bytes']>;
  asset_gt?: InputMaybe<Scalars['mode_Bytes']>;
  asset_lt?: InputMaybe<Scalars['mode_Bytes']>;
  asset_gte?: InputMaybe<Scalars['mode_Bytes']>;
  asset_lte?: InputMaybe<Scalars['mode_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['mode_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  caller?: InputMaybe<Scalars['mode_Bytes']>;
  caller_not?: InputMaybe<Scalars['mode_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mode_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mode_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mode_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mode_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mode_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
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
  _change_block?: InputMaybe<mode_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mode_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mode_RelayerFeesIncrease_filter>>>;
};

export type mode_RelayerFeesIncrease_orderBy =
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

export type mode_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['mode_Bytes']>;
  relayer_not?: InputMaybe<Scalars['mode_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['mode_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['mode_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['mode_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['mode_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['mode_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mode_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mode_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mode_Relayer_filter>>>;
};

export type mode_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type mode_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type mode_RootCount_filter = {
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
  _change_block?: InputMaybe<mode_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mode_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mode_RootCount_filter>>>;
};

export type mode_RootCount_orderBy =
  | 'id'
  | 'count';

export type mode_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['mode_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['mode_Bytes']>;
  transactionHash?: Maybe<Scalars['mode_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type mode_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['mode_Bytes']>;
  root_not?: InputMaybe<Scalars['mode_Bytes']>;
  root_gt?: InputMaybe<Scalars['mode_Bytes']>;
  root_lt?: InputMaybe<Scalars['mode_Bytes']>;
  root_gte?: InputMaybe<Scalars['mode_Bytes']>;
  root_lte?: InputMaybe<Scalars['mode_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  root_contains?: InputMaybe<Scalars['mode_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['mode_Bytes']>;
  caller_not?: InputMaybe<Scalars['mode_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mode_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mode_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mode_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mode_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mode_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
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
  _change_block?: InputMaybe<mode_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mode_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mode_RootMessageSent_filter>>>;
};

export type mode_RootMessageSent_orderBy =
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

export type mode_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['mode_Bytes']>;
  recipient?: Maybe<Scalars['mode_Bytes']>;
  proposedOwner?: Maybe<Scalars['mode_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<mode_AssetBalance>;
};


export type mode_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_AssetBalance_filter>;
};

export type mode_RouterDailyTVL = {
  id: Scalars['ID'];
  router: mode_Router;
  asset: mode_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type mode_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<mode_Router_filter>;
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
  asset_?: InputMaybe<mode_Asset_filter>;
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
  _change_block?: InputMaybe<mode_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mode_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mode_RouterDailyTVL_filter>>>;
};

export type mode_RouterDailyTVL_orderBy =
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

export type mode_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<mode_RouterLiquidityEventType>;
  router: mode_Router;
  asset: mode_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['mode_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['mode_Bytes'];
  nonce: Scalars['BigInt'];
};

export type mode_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type mode_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<mode_RouterLiquidityEventType>;
  type_not?: InputMaybe<mode_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<mode_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<mode_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<mode_Router_filter>;
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
  asset_?: InputMaybe<mode_Asset_filter>;
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
  caller?: InputMaybe<Scalars['mode_Bytes']>;
  caller_not?: InputMaybe<Scalars['mode_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mode_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mode_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mode_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mode_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mode_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mode_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mode_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mode_RouterLiquidityEvent_filter>>>;
};

export type mode_RouterLiquidityEvent_orderBy =
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

export type mode_Router_filter = {
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
  owner?: InputMaybe<Scalars['mode_Bytes']>;
  owner_not?: InputMaybe<Scalars['mode_Bytes']>;
  owner_gt?: InputMaybe<Scalars['mode_Bytes']>;
  owner_lt?: InputMaybe<Scalars['mode_Bytes']>;
  owner_gte?: InputMaybe<Scalars['mode_Bytes']>;
  owner_lte?: InputMaybe<Scalars['mode_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['mode_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  recipient?: InputMaybe<Scalars['mode_Bytes']>;
  recipient_not?: InputMaybe<Scalars['mode_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['mode_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['mode_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['mode_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['mode_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['mode_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['mode_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['mode_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['mode_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['mode_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['mode_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['mode_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['mode_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<mode_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mode_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mode_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mode_Router_filter>>>;
};

export type mode_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type mode_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['mode_Bytes']>;
};

export type mode_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['mode_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['mode_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['mode_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['mode_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['mode_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['mode_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['mode_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mode_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mode_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mode_Sequencer_filter>>>;
};

export type mode_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type mode_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['mode_Bytes'];
};

export type mode_Setting_filter = {
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
  caller?: InputMaybe<Scalars['mode_Bytes']>;
  caller_not?: InputMaybe<Scalars['mode_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mode_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mode_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mode_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mode_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mode_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mode_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mode_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mode_Setting_filter>>>;
};

export type mode_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type mode_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: mode_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['mode_Bytes'];
  transactionHash: Scalars['mode_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type mode_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<mode_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['mode_Bytes']>;
  caller_not?: InputMaybe<Scalars['mode_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mode_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mode_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mode_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mode_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mode_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mode_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
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
  _change_block?: InputMaybe<mode_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mode_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mode_SlippageUpdate_filter>>>;
};

export type mode_SlippageUpdate_orderBy =
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

export type mode_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['mode_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type mode_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['mode_Bytes']>;
  root_not?: InputMaybe<Scalars['mode_Bytes']>;
  root_gt?: InputMaybe<Scalars['mode_Bytes']>;
  root_lt?: InputMaybe<Scalars['mode_Bytes']>;
  root_gte?: InputMaybe<Scalars['mode_Bytes']>;
  root_lte?: InputMaybe<Scalars['mode_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['mode_Bytes']>>;
  root_contains?: InputMaybe<Scalars['mode_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['mode_Bytes']>;
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
  _change_block?: InputMaybe<mode_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mode_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mode_SnapshotRoot_filter>>>;
};

export type mode_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type mode_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type mode_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<mode_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mode_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mode_SpokeConnectorMode_filter>>>;
};

export type mode_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  mode_asset?: Maybe<mode_Asset>;
  mode_assets: Array<mode_Asset>;
  mode_assetStatus?: Maybe<mode_AssetStatus>;
  mode_assetStatuses: Array<mode_AssetStatus>;
  mode_assetBalance?: Maybe<mode_AssetBalance>;
  mode_assetBalances: Array<mode_AssetBalance>;
  mode_router?: Maybe<mode_Router>;
  mode_routers: Array<mode_Router>;
  mode_routerDailyTVL?: Maybe<mode_RouterDailyTVL>;
  mode_routerDailyTVLs: Array<mode_RouterDailyTVL>;
  mode_routerLiquidityEvent?: Maybe<mode_RouterLiquidityEvent>;
  mode_routerLiquidityEvents: Array<mode_RouterLiquidityEvent>;
  mode_setting?: Maybe<mode_Setting>;
  mode_settings: Array<mode_Setting>;
  mode_relayer?: Maybe<mode_Relayer>;
  mode_relayers: Array<mode_Relayer>;
  mode_sequencer?: Maybe<mode_Sequencer>;
  mode_sequencers: Array<mode_Sequencer>;
  mode_relayerFee?: Maybe<mode_RelayerFee>;
  mode_relayerFees: Array<mode_RelayerFee>;
  mode_originTransfer?: Maybe<mode_OriginTransfer>;
  mode_originTransfers: Array<mode_OriginTransfer>;
  mode_destinationTransfer?: Maybe<mode_DestinationTransfer>;
  mode_destinationTransfers: Array<mode_DestinationTransfer>;
  mode_originMessage?: Maybe<mode_OriginMessage>;
  mode_originMessages: Array<mode_OriginMessage>;
  mode_aggregateRoot?: Maybe<mode_AggregateRoot>;
  mode_aggregateRoots: Array<mode_AggregateRoot>;
  mode_connectorMeta?: Maybe<mode_ConnectorMeta>;
  mode_connectorMetas: Array<mode_ConnectorMeta>;
  mode_rootCount?: Maybe<mode_RootCount>;
  mode_rootCounts: Array<mode_RootCount>;
  mode_rootMessageSent?: Maybe<mode_RootMessageSent>;
  mode_rootMessageSents: Array<mode_RootMessageSent>;
  mode_relayerFeesIncrease?: Maybe<mode_RelayerFeesIncrease>;
  mode_relayerFeesIncreases: Array<mode_RelayerFeesIncrease>;
  mode_slippageUpdate?: Maybe<mode_SlippageUpdate>;
  mode_slippageUpdates: Array<mode_SlippageUpdate>;
  mode_snapshotRoot?: Maybe<mode_SnapshotRoot>;
  mode_snapshotRoots: Array<mode_SnapshotRoot>;
  mode_spokeConnectorMode?: Maybe<mode_SpokeConnectorMode>;
  mode_spokeConnectorModes: Array<mode_SpokeConnectorMode>;
  mode_aggregateRootProposed?: Maybe<mode_AggregateRootProposed>;
  mode_aggregateRootProposeds: Array<mode_AggregateRootProposed>;
  mode_optimisticRootFinalized?: Maybe<mode_OptimisticRootFinalized>;
  mode_optimisticRootFinalizeds: Array<mode_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  mode__meta?: Maybe<mode__Meta_>;
};


export type Subscriptionmode_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_Asset_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_Asset_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_AssetStatus_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_AssetBalance_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_Router_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_Router_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_RouterDailyTVL_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_RouterLiquidityEvent_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_Setting_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_Setting_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_Relayer_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_Relayer_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_Sequencer_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_Sequencer_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_RelayerFee_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_OriginTransfer_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_DestinationTransfer_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_OriginMessage_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_AggregateRoot_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_ConnectorMeta_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_RootCount_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_RootCount_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_RootMessageSent_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_RelayerFeesIncrease_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_SlippageUpdate_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_SnapshotRoot_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_SpokeConnectorMode_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_AggregateRootProposed_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mode_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<mode_OrderDirection>;
  where?: InputMaybe<mode_OptimisticRootFinalized_filter>;
  block?: InputMaybe<mode_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmode__metaArgs = {
  block?: InputMaybe<mode_Block_height>;
};

export type mode_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type mode__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['mode_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['mode_Bytes']>;
};

/** The type for the top-level _meta field */
export type mode__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: mode__Block_;
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
  mode_asset: InContextSdkMethod<Query['mode_asset'], Querymode_assetArgs, MeshContext>,
  /** null **/
  mode_assets: InContextSdkMethod<Query['mode_assets'], Querymode_assetsArgs, MeshContext>,
  /** null **/
  mode_assetStatus: InContextSdkMethod<Query['mode_assetStatus'], Querymode_assetStatusArgs, MeshContext>,
  /** null **/
  mode_assetStatuses: InContextSdkMethod<Query['mode_assetStatuses'], Querymode_assetStatusesArgs, MeshContext>,
  /** null **/
  mode_assetBalance: InContextSdkMethod<Query['mode_assetBalance'], Querymode_assetBalanceArgs, MeshContext>,
  /** null **/
  mode_assetBalances: InContextSdkMethod<Query['mode_assetBalances'], Querymode_assetBalancesArgs, MeshContext>,
  /** null **/
  mode_router: InContextSdkMethod<Query['mode_router'], Querymode_routerArgs, MeshContext>,
  /** null **/
  mode_routers: InContextSdkMethod<Query['mode_routers'], Querymode_routersArgs, MeshContext>,
  /** null **/
  mode_routerDailyTVL: InContextSdkMethod<Query['mode_routerDailyTVL'], Querymode_routerDailyTVLArgs, MeshContext>,
  /** null **/
  mode_routerDailyTVLs: InContextSdkMethod<Query['mode_routerDailyTVLs'], Querymode_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  mode_routerLiquidityEvent: InContextSdkMethod<Query['mode_routerLiquidityEvent'], Querymode_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  mode_routerLiquidityEvents: InContextSdkMethod<Query['mode_routerLiquidityEvents'], Querymode_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  mode_setting: InContextSdkMethod<Query['mode_setting'], Querymode_settingArgs, MeshContext>,
  /** null **/
  mode_settings: InContextSdkMethod<Query['mode_settings'], Querymode_settingsArgs, MeshContext>,
  /** null **/
  mode_relayer: InContextSdkMethod<Query['mode_relayer'], Querymode_relayerArgs, MeshContext>,
  /** null **/
  mode_relayers: InContextSdkMethod<Query['mode_relayers'], Querymode_relayersArgs, MeshContext>,
  /** null **/
  mode_sequencer: InContextSdkMethod<Query['mode_sequencer'], Querymode_sequencerArgs, MeshContext>,
  /** null **/
  mode_sequencers: InContextSdkMethod<Query['mode_sequencers'], Querymode_sequencersArgs, MeshContext>,
  /** null **/
  mode_relayerFee: InContextSdkMethod<Query['mode_relayerFee'], Querymode_relayerFeeArgs, MeshContext>,
  /** null **/
  mode_relayerFees: InContextSdkMethod<Query['mode_relayerFees'], Querymode_relayerFeesArgs, MeshContext>,
  /** null **/
  mode_originTransfer: InContextSdkMethod<Query['mode_originTransfer'], Querymode_originTransferArgs, MeshContext>,
  /** null **/
  mode_originTransfers: InContextSdkMethod<Query['mode_originTransfers'], Querymode_originTransfersArgs, MeshContext>,
  /** null **/
  mode_destinationTransfer: InContextSdkMethod<Query['mode_destinationTransfer'], Querymode_destinationTransferArgs, MeshContext>,
  /** null **/
  mode_destinationTransfers: InContextSdkMethod<Query['mode_destinationTransfers'], Querymode_destinationTransfersArgs, MeshContext>,
  /** null **/
  mode_originMessage: InContextSdkMethod<Query['mode_originMessage'], Querymode_originMessageArgs, MeshContext>,
  /** null **/
  mode_originMessages: InContextSdkMethod<Query['mode_originMessages'], Querymode_originMessagesArgs, MeshContext>,
  /** null **/
  mode_aggregateRoot: InContextSdkMethod<Query['mode_aggregateRoot'], Querymode_aggregateRootArgs, MeshContext>,
  /** null **/
  mode_aggregateRoots: InContextSdkMethod<Query['mode_aggregateRoots'], Querymode_aggregateRootsArgs, MeshContext>,
  /** null **/
  mode_connectorMeta: InContextSdkMethod<Query['mode_connectorMeta'], Querymode_connectorMetaArgs, MeshContext>,
  /** null **/
  mode_connectorMetas: InContextSdkMethod<Query['mode_connectorMetas'], Querymode_connectorMetasArgs, MeshContext>,
  /** null **/
  mode_rootCount: InContextSdkMethod<Query['mode_rootCount'], Querymode_rootCountArgs, MeshContext>,
  /** null **/
  mode_rootCounts: InContextSdkMethod<Query['mode_rootCounts'], Querymode_rootCountsArgs, MeshContext>,
  /** null **/
  mode_rootMessageSent: InContextSdkMethod<Query['mode_rootMessageSent'], Querymode_rootMessageSentArgs, MeshContext>,
  /** null **/
  mode_rootMessageSents: InContextSdkMethod<Query['mode_rootMessageSents'], Querymode_rootMessageSentsArgs, MeshContext>,
  /** null **/
  mode_relayerFeesIncrease: InContextSdkMethod<Query['mode_relayerFeesIncrease'], Querymode_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  mode_relayerFeesIncreases: InContextSdkMethod<Query['mode_relayerFeesIncreases'], Querymode_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  mode_slippageUpdate: InContextSdkMethod<Query['mode_slippageUpdate'], Querymode_slippageUpdateArgs, MeshContext>,
  /** null **/
  mode_slippageUpdates: InContextSdkMethod<Query['mode_slippageUpdates'], Querymode_slippageUpdatesArgs, MeshContext>,
  /** null **/
  mode_snapshotRoot: InContextSdkMethod<Query['mode_snapshotRoot'], Querymode_snapshotRootArgs, MeshContext>,
  /** null **/
  mode_snapshotRoots: InContextSdkMethod<Query['mode_snapshotRoots'], Querymode_snapshotRootsArgs, MeshContext>,
  /** null **/
  mode_spokeConnectorMode: InContextSdkMethod<Query['mode_spokeConnectorMode'], Querymode_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  mode_spokeConnectorModes: InContextSdkMethod<Query['mode_spokeConnectorModes'], Querymode_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  mode_aggregateRootProposed: InContextSdkMethod<Query['mode_aggregateRootProposed'], Querymode_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  mode_aggregateRootProposeds: InContextSdkMethod<Query['mode_aggregateRootProposeds'], Querymode_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  mode_optimisticRootFinalized: InContextSdkMethod<Query['mode_optimisticRootFinalized'], Querymode_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  mode_optimisticRootFinalizeds: InContextSdkMethod<Query['mode_optimisticRootFinalizeds'], Querymode_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  mode__meta: InContextSdkMethod<Query['mode__meta'], Querymode__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  mode_asset: InContextSdkMethod<Subscription['mode_asset'], Subscriptionmode_assetArgs, MeshContext>,
  /** null **/
  mode_assets: InContextSdkMethod<Subscription['mode_assets'], Subscriptionmode_assetsArgs, MeshContext>,
  /** null **/
  mode_assetStatus: InContextSdkMethod<Subscription['mode_assetStatus'], Subscriptionmode_assetStatusArgs, MeshContext>,
  /** null **/
  mode_assetStatuses: InContextSdkMethod<Subscription['mode_assetStatuses'], Subscriptionmode_assetStatusesArgs, MeshContext>,
  /** null **/
  mode_assetBalance: InContextSdkMethod<Subscription['mode_assetBalance'], Subscriptionmode_assetBalanceArgs, MeshContext>,
  /** null **/
  mode_assetBalances: InContextSdkMethod<Subscription['mode_assetBalances'], Subscriptionmode_assetBalancesArgs, MeshContext>,
  /** null **/
  mode_router: InContextSdkMethod<Subscription['mode_router'], Subscriptionmode_routerArgs, MeshContext>,
  /** null **/
  mode_routers: InContextSdkMethod<Subscription['mode_routers'], Subscriptionmode_routersArgs, MeshContext>,
  /** null **/
  mode_routerDailyTVL: InContextSdkMethod<Subscription['mode_routerDailyTVL'], Subscriptionmode_routerDailyTVLArgs, MeshContext>,
  /** null **/
  mode_routerDailyTVLs: InContextSdkMethod<Subscription['mode_routerDailyTVLs'], Subscriptionmode_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  mode_routerLiquidityEvent: InContextSdkMethod<Subscription['mode_routerLiquidityEvent'], Subscriptionmode_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  mode_routerLiquidityEvents: InContextSdkMethod<Subscription['mode_routerLiquidityEvents'], Subscriptionmode_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  mode_setting: InContextSdkMethod<Subscription['mode_setting'], Subscriptionmode_settingArgs, MeshContext>,
  /** null **/
  mode_settings: InContextSdkMethod<Subscription['mode_settings'], Subscriptionmode_settingsArgs, MeshContext>,
  /** null **/
  mode_relayer: InContextSdkMethod<Subscription['mode_relayer'], Subscriptionmode_relayerArgs, MeshContext>,
  /** null **/
  mode_relayers: InContextSdkMethod<Subscription['mode_relayers'], Subscriptionmode_relayersArgs, MeshContext>,
  /** null **/
  mode_sequencer: InContextSdkMethod<Subscription['mode_sequencer'], Subscriptionmode_sequencerArgs, MeshContext>,
  /** null **/
  mode_sequencers: InContextSdkMethod<Subscription['mode_sequencers'], Subscriptionmode_sequencersArgs, MeshContext>,
  /** null **/
  mode_relayerFee: InContextSdkMethod<Subscription['mode_relayerFee'], Subscriptionmode_relayerFeeArgs, MeshContext>,
  /** null **/
  mode_relayerFees: InContextSdkMethod<Subscription['mode_relayerFees'], Subscriptionmode_relayerFeesArgs, MeshContext>,
  /** null **/
  mode_originTransfer: InContextSdkMethod<Subscription['mode_originTransfer'], Subscriptionmode_originTransferArgs, MeshContext>,
  /** null **/
  mode_originTransfers: InContextSdkMethod<Subscription['mode_originTransfers'], Subscriptionmode_originTransfersArgs, MeshContext>,
  /** null **/
  mode_destinationTransfer: InContextSdkMethod<Subscription['mode_destinationTransfer'], Subscriptionmode_destinationTransferArgs, MeshContext>,
  /** null **/
  mode_destinationTransfers: InContextSdkMethod<Subscription['mode_destinationTransfers'], Subscriptionmode_destinationTransfersArgs, MeshContext>,
  /** null **/
  mode_originMessage: InContextSdkMethod<Subscription['mode_originMessage'], Subscriptionmode_originMessageArgs, MeshContext>,
  /** null **/
  mode_originMessages: InContextSdkMethod<Subscription['mode_originMessages'], Subscriptionmode_originMessagesArgs, MeshContext>,
  /** null **/
  mode_aggregateRoot: InContextSdkMethod<Subscription['mode_aggregateRoot'], Subscriptionmode_aggregateRootArgs, MeshContext>,
  /** null **/
  mode_aggregateRoots: InContextSdkMethod<Subscription['mode_aggregateRoots'], Subscriptionmode_aggregateRootsArgs, MeshContext>,
  /** null **/
  mode_connectorMeta: InContextSdkMethod<Subscription['mode_connectorMeta'], Subscriptionmode_connectorMetaArgs, MeshContext>,
  /** null **/
  mode_connectorMetas: InContextSdkMethod<Subscription['mode_connectorMetas'], Subscriptionmode_connectorMetasArgs, MeshContext>,
  /** null **/
  mode_rootCount: InContextSdkMethod<Subscription['mode_rootCount'], Subscriptionmode_rootCountArgs, MeshContext>,
  /** null **/
  mode_rootCounts: InContextSdkMethod<Subscription['mode_rootCounts'], Subscriptionmode_rootCountsArgs, MeshContext>,
  /** null **/
  mode_rootMessageSent: InContextSdkMethod<Subscription['mode_rootMessageSent'], Subscriptionmode_rootMessageSentArgs, MeshContext>,
  /** null **/
  mode_rootMessageSents: InContextSdkMethod<Subscription['mode_rootMessageSents'], Subscriptionmode_rootMessageSentsArgs, MeshContext>,
  /** null **/
  mode_relayerFeesIncrease: InContextSdkMethod<Subscription['mode_relayerFeesIncrease'], Subscriptionmode_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  mode_relayerFeesIncreases: InContextSdkMethod<Subscription['mode_relayerFeesIncreases'], Subscriptionmode_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  mode_slippageUpdate: InContextSdkMethod<Subscription['mode_slippageUpdate'], Subscriptionmode_slippageUpdateArgs, MeshContext>,
  /** null **/
  mode_slippageUpdates: InContextSdkMethod<Subscription['mode_slippageUpdates'], Subscriptionmode_slippageUpdatesArgs, MeshContext>,
  /** null **/
  mode_snapshotRoot: InContextSdkMethod<Subscription['mode_snapshotRoot'], Subscriptionmode_snapshotRootArgs, MeshContext>,
  /** null **/
  mode_snapshotRoots: InContextSdkMethod<Subscription['mode_snapshotRoots'], Subscriptionmode_snapshotRootsArgs, MeshContext>,
  /** null **/
  mode_spokeConnectorMode: InContextSdkMethod<Subscription['mode_spokeConnectorMode'], Subscriptionmode_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  mode_spokeConnectorModes: InContextSdkMethod<Subscription['mode_spokeConnectorModes'], Subscriptionmode_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  mode_aggregateRootProposed: InContextSdkMethod<Subscription['mode_aggregateRootProposed'], Subscriptionmode_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  mode_aggregateRootProposeds: InContextSdkMethod<Subscription['mode_aggregateRootProposeds'], Subscriptionmode_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  mode_optimisticRootFinalized: InContextSdkMethod<Subscription['mode_optimisticRootFinalized'], Subscriptionmode_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  mode_optimisticRootFinalizeds: InContextSdkMethod<Subscription['mode_optimisticRootFinalizeds'], Subscriptionmode_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  mode__meta: InContextSdkMethod<Subscription['mode__meta'], Subscriptionmode__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Mode"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
