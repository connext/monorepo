// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextBaseTypes {
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
  base_BigDecimal: any;
  BigInt: any;
  base_Bytes: any;
  base_Int8: any;
  Timestamp: any;
};

export type base_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['base_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type base_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['base_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type base_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['base_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['base_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['base_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['base_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['base_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['base_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['base_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['base_Bytes']>;
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
  _change_block?: InputMaybe<base_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<base_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<base_AggregateRootProposed_filter>>>;
};

export type base_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type base_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['base_Bytes']>;
  root_not?: InputMaybe<Scalars['base_Bytes']>;
  root_gt?: InputMaybe<Scalars['base_Bytes']>;
  root_lt?: InputMaybe<Scalars['base_Bytes']>;
  root_gte?: InputMaybe<Scalars['base_Bytes']>;
  root_lte?: InputMaybe<Scalars['base_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  root_contains?: InputMaybe<Scalars['base_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<base_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<base_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<base_AggregateRoot_filter>>>;
};

export type base_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type base_Aggregation_interval =
  | 'hour'
  | 'day';

export type base_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['base_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['base_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['base_Bytes']>;
  localAsset?: Maybe<Scalars['base_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<base_AssetStatus>;
};

export type base_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: base_Router;
  asset: base_Asset;
  feesEarned: Scalars['BigInt'];
};

export type base_AssetBalance_filter = {
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
  router_?: InputMaybe<base_Router_filter>;
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
  asset_?: InputMaybe<base_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<base_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<base_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<base_AssetBalance_filter>>>;
};

export type base_AssetBalance_orderBy =
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

export type base_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type base_AssetStatus_filter = {
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
  _change_block?: InputMaybe<base_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<base_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<base_AssetStatus_filter>>>;
};

export type base_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type base_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['base_Bytes']>;
  key_not?: InputMaybe<Scalars['base_Bytes']>;
  key_gt?: InputMaybe<Scalars['base_Bytes']>;
  key_lt?: InputMaybe<Scalars['base_Bytes']>;
  key_gte?: InputMaybe<Scalars['base_Bytes']>;
  key_lte?: InputMaybe<Scalars['base_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  key_contains?: InputMaybe<Scalars['base_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['base_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['base_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['base_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['base_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['base_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['base_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['base_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['base_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['base_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['base_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['base_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['base_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['base_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['base_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['base_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  localAsset?: InputMaybe<Scalars['base_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['base_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['base_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['base_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['base_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['base_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['base_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['base_Bytes']>;
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
  status_?: InputMaybe<base_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<base_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<base_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<base_Asset_filter>>>;
};

export type base_Asset_orderBy =
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

export type base_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type base_Block_height = {
  hash?: InputMaybe<Scalars['base_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type base_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['base_Bytes']>;
  rootManager?: Maybe<Scalars['base_Bytes']>;
  mirrorConnector?: Maybe<Scalars['base_Bytes']>;
};

export type base_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['base_Bytes']>;
  amb_not?: InputMaybe<Scalars['base_Bytes']>;
  amb_gt?: InputMaybe<Scalars['base_Bytes']>;
  amb_lt?: InputMaybe<Scalars['base_Bytes']>;
  amb_gte?: InputMaybe<Scalars['base_Bytes']>;
  amb_lte?: InputMaybe<Scalars['base_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['base_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  rootManager?: InputMaybe<Scalars['base_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['base_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['base_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['base_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['base_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['base_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['base_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['base_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['base_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['base_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['base_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['base_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['base_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['base_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<base_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<base_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<base_ConnectorMeta_filter>>>;
};

export type base_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type base_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['base_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<base_TransferStatus>;
  routers?: Maybe<Array<base_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['base_Bytes']>;
  delegate?: Maybe<Scalars['base_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['base_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['base_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['base_Bytes']>;
  asset?: Maybe<base_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['base_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['base_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['base_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['base_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['base_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['base_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type base_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_Router_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_Router_filter>;
};

export type base_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['base_Bytes']>;
  transferId_not?: InputMaybe<Scalars['base_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['base_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['base_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['base_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['base_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['base_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<base_TransferStatus>;
  status_not?: InputMaybe<base_TransferStatus>;
  status_in?: InputMaybe<Array<base_TransferStatus>>;
  status_not_in?: InputMaybe<Array<base_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<base_Router_filter>;
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
  to?: InputMaybe<Scalars['base_Bytes']>;
  to_not?: InputMaybe<Scalars['base_Bytes']>;
  to_gt?: InputMaybe<Scalars['base_Bytes']>;
  to_lt?: InputMaybe<Scalars['base_Bytes']>;
  to_gte?: InputMaybe<Scalars['base_Bytes']>;
  to_lte?: InputMaybe<Scalars['base_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  to_contains?: InputMaybe<Scalars['base_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  delegate?: InputMaybe<Scalars['base_Bytes']>;
  delegate_not?: InputMaybe<Scalars['base_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['base_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['base_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['base_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['base_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['base_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['base_Bytes']>;
  callData_not?: InputMaybe<Scalars['base_Bytes']>;
  callData_gt?: InputMaybe<Scalars['base_Bytes']>;
  callData_lt?: InputMaybe<Scalars['base_Bytes']>;
  callData_gte?: InputMaybe<Scalars['base_Bytes']>;
  callData_lte?: InputMaybe<Scalars['base_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['base_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['base_Bytes']>;
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
  originSender?: InputMaybe<Scalars['base_Bytes']>;
  originSender_not?: InputMaybe<Scalars['base_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['base_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['base_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['base_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['base_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['base_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['base_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['base_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['base_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['base_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['base_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['base_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['base_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['base_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['base_Bytes']>;
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
  asset_?: InputMaybe<base_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['base_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['base_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['base_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['base_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['base_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['base_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['base_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['base_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['base_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['base_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['base_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['base_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['base_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['base_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['base_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['base_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['base_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['base_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['base_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['base_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['base_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['base_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['base_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['base_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['base_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['base_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['base_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['base_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['base_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['base_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['base_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['base_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['base_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['base_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['base_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['base_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['base_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['base_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['base_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['base_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['base_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['base_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['base_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['base_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<base_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<base_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<base_DestinationTransfer_filter>>>;
};

export type base_DestinationTransfer_orderBy =
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

export type base_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['base_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type base_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['base_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['base_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['base_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['base_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['base_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['base_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['base_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['base_Bytes']>;
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
  _change_block?: InputMaybe<base_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<base_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<base_OptimisticRootFinalized_filter>>>;
};

export type base_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type base_OrderDirection =
  | 'asc'
  | 'desc';

export type base_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['base_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['base_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['base_Bytes']>;
  root?: Maybe<Scalars['base_Bytes']>;
  transactionHash?: Maybe<Scalars['base_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<base_RootCount>;
};

export type base_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['base_Bytes']>;
  transferId_not?: InputMaybe<Scalars['base_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['base_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['base_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['base_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['base_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['base_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['base_Bytes']>;
  leaf_not?: InputMaybe<Scalars['base_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['base_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['base_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['base_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['base_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['base_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['base_Bytes']>;
  message_not?: InputMaybe<Scalars['base_Bytes']>;
  message_gt?: InputMaybe<Scalars['base_Bytes']>;
  message_lt?: InputMaybe<Scalars['base_Bytes']>;
  message_gte?: InputMaybe<Scalars['base_Bytes']>;
  message_lte?: InputMaybe<Scalars['base_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  message_contains?: InputMaybe<Scalars['base_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  root?: InputMaybe<Scalars['base_Bytes']>;
  root_not?: InputMaybe<Scalars['base_Bytes']>;
  root_gt?: InputMaybe<Scalars['base_Bytes']>;
  root_lt?: InputMaybe<Scalars['base_Bytes']>;
  root_gte?: InputMaybe<Scalars['base_Bytes']>;
  root_lte?: InputMaybe<Scalars['base_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  root_contains?: InputMaybe<Scalars['base_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['base_Bytes']>;
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
  rootCount_?: InputMaybe<base_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<base_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<base_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<base_OriginMessage_filter>>>;
};

export type base_OriginMessage_orderBy =
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

export type base_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['base_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<base_TransferStatus>;
  messageHash?: Maybe<Scalars['base_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['base_Bytes']>;
  delegate?: Maybe<Scalars['base_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['base_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['base_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['base_Bytes']>;
  asset?: Maybe<base_Asset>;
  transactingAsset?: Maybe<Scalars['base_Bytes']>;
  message?: Maybe<base_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<base_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['base_Bytes']>;
  caller?: Maybe<Scalars['base_Bytes']>;
  transactionHash?: Maybe<Scalars['base_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['base_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type base_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_RelayerFee_filter>;
};

export type base_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['base_Bytes']>;
  transferId_not?: InputMaybe<Scalars['base_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['base_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['base_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['base_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['base_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['base_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<base_TransferStatus>;
  status_not?: InputMaybe<base_TransferStatus>;
  status_in?: InputMaybe<Array<base_TransferStatus>>;
  status_not_in?: InputMaybe<Array<base_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['base_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['base_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['base_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['base_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['base_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['base_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['base_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['base_Bytes']>;
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
  to?: InputMaybe<Scalars['base_Bytes']>;
  to_not?: InputMaybe<Scalars['base_Bytes']>;
  to_gt?: InputMaybe<Scalars['base_Bytes']>;
  to_lt?: InputMaybe<Scalars['base_Bytes']>;
  to_gte?: InputMaybe<Scalars['base_Bytes']>;
  to_lte?: InputMaybe<Scalars['base_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  to_contains?: InputMaybe<Scalars['base_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  delegate?: InputMaybe<Scalars['base_Bytes']>;
  delegate_not?: InputMaybe<Scalars['base_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['base_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['base_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['base_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['base_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['base_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['base_Bytes']>;
  callData_not?: InputMaybe<Scalars['base_Bytes']>;
  callData_gt?: InputMaybe<Scalars['base_Bytes']>;
  callData_lt?: InputMaybe<Scalars['base_Bytes']>;
  callData_gte?: InputMaybe<Scalars['base_Bytes']>;
  callData_lte?: InputMaybe<Scalars['base_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['base_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['base_Bytes']>;
  originSender_not?: InputMaybe<Scalars['base_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['base_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['base_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['base_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['base_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['base_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['base_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['base_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['base_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['base_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['base_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['base_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['base_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['base_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['base_Bytes']>;
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
  asset_?: InputMaybe<base_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['base_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['base_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['base_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['base_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['base_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['base_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['base_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['base_Bytes']>;
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
  message_?: InputMaybe<base_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<base_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['base_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['base_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['base_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['base_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['base_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['base_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['base_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  caller?: InputMaybe<Scalars['base_Bytes']>;
  caller_not?: InputMaybe<Scalars['base_Bytes']>;
  caller_gt?: InputMaybe<Scalars['base_Bytes']>;
  caller_lt?: InputMaybe<Scalars['base_Bytes']>;
  caller_gte?: InputMaybe<Scalars['base_Bytes']>;
  caller_lte?: InputMaybe<Scalars['base_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['base_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['base_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['base_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['base_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['base_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['base_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['base_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['base_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['base_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<base_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<base_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<base_OriginTransfer_filter>>>;
};

export type base_OriginTransfer_orderBy =
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
  base_asset?: Maybe<base_Asset>;
  base_assets: Array<base_Asset>;
  base_assetStatus?: Maybe<base_AssetStatus>;
  base_assetStatuses: Array<base_AssetStatus>;
  base_assetBalance?: Maybe<base_AssetBalance>;
  base_assetBalances: Array<base_AssetBalance>;
  base_router?: Maybe<base_Router>;
  base_routers: Array<base_Router>;
  base_routerDailyTVL?: Maybe<base_RouterDailyTVL>;
  base_routerDailyTVLs: Array<base_RouterDailyTVL>;
  base_routerLiquidityEvent?: Maybe<base_RouterLiquidityEvent>;
  base_routerLiquidityEvents: Array<base_RouterLiquidityEvent>;
  base_setting?: Maybe<base_Setting>;
  base_settings: Array<base_Setting>;
  base_relayer?: Maybe<base_Relayer>;
  base_relayers: Array<base_Relayer>;
  base_sequencer?: Maybe<base_Sequencer>;
  base_sequencers: Array<base_Sequencer>;
  base_relayerFee?: Maybe<base_RelayerFee>;
  base_relayerFees: Array<base_RelayerFee>;
  base_originTransfer?: Maybe<base_OriginTransfer>;
  base_originTransfers: Array<base_OriginTransfer>;
  base_destinationTransfer?: Maybe<base_DestinationTransfer>;
  base_destinationTransfers: Array<base_DestinationTransfer>;
  base_originMessage?: Maybe<base_OriginMessage>;
  base_originMessages: Array<base_OriginMessage>;
  base_aggregateRoot?: Maybe<base_AggregateRoot>;
  base_aggregateRoots: Array<base_AggregateRoot>;
  base_connectorMeta?: Maybe<base_ConnectorMeta>;
  base_connectorMetas: Array<base_ConnectorMeta>;
  base_rootCount?: Maybe<base_RootCount>;
  base_rootCounts: Array<base_RootCount>;
  base_rootMessageSent?: Maybe<base_RootMessageSent>;
  base_rootMessageSents: Array<base_RootMessageSent>;
  base_relayerFeesIncrease?: Maybe<base_RelayerFeesIncrease>;
  base_relayerFeesIncreases: Array<base_RelayerFeesIncrease>;
  base_slippageUpdate?: Maybe<base_SlippageUpdate>;
  base_slippageUpdates: Array<base_SlippageUpdate>;
  base_snapshotRoot?: Maybe<base_SnapshotRoot>;
  base_snapshotRoots: Array<base_SnapshotRoot>;
  base_spokeConnectorMode?: Maybe<base_SpokeConnectorMode>;
  base_spokeConnectorModes: Array<base_SpokeConnectorMode>;
  base_aggregateRootProposed?: Maybe<base_AggregateRootProposed>;
  base_aggregateRootProposeds: Array<base_AggregateRootProposed>;
  base_optimisticRootFinalized?: Maybe<base_OptimisticRootFinalized>;
  base_optimisticRootFinalizeds: Array<base_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  base__meta?: Maybe<base__Meta_>;
};


export type Querybase_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_Asset_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_Asset_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_AssetStatus_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_AssetBalance_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_Router_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_Router_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_RouterDailyTVL_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_RouterLiquidityEvent_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_Setting_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_Setting_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_Relayer_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_Relayer_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_Sequencer_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_Sequencer_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_RelayerFee_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_OriginTransfer_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_DestinationTransfer_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_OriginMessage_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_AggregateRoot_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_ConnectorMeta_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_RootCount_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_RootCount_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_RootMessageSent_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_RelayerFeesIncrease_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_SlippageUpdate_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_SnapshotRoot_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_SpokeConnectorMode_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_AggregateRootProposed_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_OptimisticRootFinalized_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybase__metaArgs = {
  block?: InputMaybe<base_Block_height>;
};

export type base_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['base_Bytes']>;
};

export type base_RelayerFee = {
  id: Scalars['ID'];
  transfer: base_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['base_Bytes'];
};

export type base_RelayerFee_filter = {
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
  transfer_?: InputMaybe<base_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['base_Bytes']>;
  asset_not?: InputMaybe<Scalars['base_Bytes']>;
  asset_gt?: InputMaybe<Scalars['base_Bytes']>;
  asset_lt?: InputMaybe<Scalars['base_Bytes']>;
  asset_gte?: InputMaybe<Scalars['base_Bytes']>;
  asset_lte?: InputMaybe<Scalars['base_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['base_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<base_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<base_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<base_RelayerFee_filter>>>;
};

export type base_RelayerFee_orderBy =
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

export type base_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: base_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['base_Bytes']>;
  caller: Scalars['base_Bytes'];
  transactionHash: Scalars['base_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type base_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<base_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['base_Bytes']>;
  asset_not?: InputMaybe<Scalars['base_Bytes']>;
  asset_gt?: InputMaybe<Scalars['base_Bytes']>;
  asset_lt?: InputMaybe<Scalars['base_Bytes']>;
  asset_gte?: InputMaybe<Scalars['base_Bytes']>;
  asset_lte?: InputMaybe<Scalars['base_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['base_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  caller?: InputMaybe<Scalars['base_Bytes']>;
  caller_not?: InputMaybe<Scalars['base_Bytes']>;
  caller_gt?: InputMaybe<Scalars['base_Bytes']>;
  caller_lt?: InputMaybe<Scalars['base_Bytes']>;
  caller_gte?: InputMaybe<Scalars['base_Bytes']>;
  caller_lte?: InputMaybe<Scalars['base_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['base_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['base_Bytes']>;
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
  _change_block?: InputMaybe<base_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<base_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<base_RelayerFeesIncrease_filter>>>;
};

export type base_RelayerFeesIncrease_orderBy =
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

export type base_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['base_Bytes']>;
  relayer_not?: InputMaybe<Scalars['base_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['base_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['base_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['base_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['base_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['base_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<base_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<base_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<base_Relayer_filter>>>;
};

export type base_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type base_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type base_RootCount_filter = {
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
  _change_block?: InputMaybe<base_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<base_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<base_RootCount_filter>>>;
};

export type base_RootCount_orderBy =
  | 'id'
  | 'count';

export type base_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['base_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['base_Bytes']>;
  transactionHash?: Maybe<Scalars['base_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type base_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['base_Bytes']>;
  root_not?: InputMaybe<Scalars['base_Bytes']>;
  root_gt?: InputMaybe<Scalars['base_Bytes']>;
  root_lt?: InputMaybe<Scalars['base_Bytes']>;
  root_gte?: InputMaybe<Scalars['base_Bytes']>;
  root_lte?: InputMaybe<Scalars['base_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  root_contains?: InputMaybe<Scalars['base_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['base_Bytes']>;
  caller_not?: InputMaybe<Scalars['base_Bytes']>;
  caller_gt?: InputMaybe<Scalars['base_Bytes']>;
  caller_lt?: InputMaybe<Scalars['base_Bytes']>;
  caller_gte?: InputMaybe<Scalars['base_Bytes']>;
  caller_lte?: InputMaybe<Scalars['base_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['base_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['base_Bytes']>;
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
  _change_block?: InputMaybe<base_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<base_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<base_RootMessageSent_filter>>>;
};

export type base_RootMessageSent_orderBy =
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

export type base_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['base_Bytes']>;
  recipient?: Maybe<Scalars['base_Bytes']>;
  proposedOwner?: Maybe<Scalars['base_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<base_AssetBalance>;
};


export type base_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_AssetBalance_filter>;
};

export type base_RouterDailyTVL = {
  id: Scalars['ID'];
  router: base_Router;
  asset: base_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type base_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<base_Router_filter>;
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
  asset_?: InputMaybe<base_Asset_filter>;
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
  _change_block?: InputMaybe<base_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<base_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<base_RouterDailyTVL_filter>>>;
};

export type base_RouterDailyTVL_orderBy =
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

export type base_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<base_RouterLiquidityEventType>;
  router: base_Router;
  asset: base_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['base_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['base_Bytes'];
  nonce: Scalars['BigInt'];
};

export type base_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type base_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<base_RouterLiquidityEventType>;
  type_not?: InputMaybe<base_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<base_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<base_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<base_Router_filter>;
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
  asset_?: InputMaybe<base_Asset_filter>;
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
  caller?: InputMaybe<Scalars['base_Bytes']>;
  caller_not?: InputMaybe<Scalars['base_Bytes']>;
  caller_gt?: InputMaybe<Scalars['base_Bytes']>;
  caller_lt?: InputMaybe<Scalars['base_Bytes']>;
  caller_gte?: InputMaybe<Scalars['base_Bytes']>;
  caller_lte?: InputMaybe<Scalars['base_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['base_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['base_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<base_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<base_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<base_RouterLiquidityEvent_filter>>>;
};

export type base_RouterLiquidityEvent_orderBy =
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

export type base_Router_filter = {
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
  owner?: InputMaybe<Scalars['base_Bytes']>;
  owner_not?: InputMaybe<Scalars['base_Bytes']>;
  owner_gt?: InputMaybe<Scalars['base_Bytes']>;
  owner_lt?: InputMaybe<Scalars['base_Bytes']>;
  owner_gte?: InputMaybe<Scalars['base_Bytes']>;
  owner_lte?: InputMaybe<Scalars['base_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['base_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  recipient?: InputMaybe<Scalars['base_Bytes']>;
  recipient_not?: InputMaybe<Scalars['base_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['base_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['base_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['base_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['base_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['base_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['base_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['base_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['base_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['base_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['base_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['base_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['base_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<base_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<base_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<base_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<base_Router_filter>>>;
};

export type base_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type base_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['base_Bytes']>;
};

export type base_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['base_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['base_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['base_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['base_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['base_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['base_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['base_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<base_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<base_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<base_Sequencer_filter>>>;
};

export type base_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type base_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['base_Bytes'];
};

export type base_Setting_filter = {
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
  caller?: InputMaybe<Scalars['base_Bytes']>;
  caller_not?: InputMaybe<Scalars['base_Bytes']>;
  caller_gt?: InputMaybe<Scalars['base_Bytes']>;
  caller_lt?: InputMaybe<Scalars['base_Bytes']>;
  caller_gte?: InputMaybe<Scalars['base_Bytes']>;
  caller_lte?: InputMaybe<Scalars['base_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['base_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<base_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<base_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<base_Setting_filter>>>;
};

export type base_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type base_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: base_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['base_Bytes'];
  transactionHash: Scalars['base_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type base_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<base_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['base_Bytes']>;
  caller_not?: InputMaybe<Scalars['base_Bytes']>;
  caller_gt?: InputMaybe<Scalars['base_Bytes']>;
  caller_lt?: InputMaybe<Scalars['base_Bytes']>;
  caller_gte?: InputMaybe<Scalars['base_Bytes']>;
  caller_lte?: InputMaybe<Scalars['base_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['base_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['base_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['base_Bytes']>;
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
  _change_block?: InputMaybe<base_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<base_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<base_SlippageUpdate_filter>>>;
};

export type base_SlippageUpdate_orderBy =
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

export type base_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['base_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type base_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['base_Bytes']>;
  root_not?: InputMaybe<Scalars['base_Bytes']>;
  root_gt?: InputMaybe<Scalars['base_Bytes']>;
  root_lt?: InputMaybe<Scalars['base_Bytes']>;
  root_gte?: InputMaybe<Scalars['base_Bytes']>;
  root_lte?: InputMaybe<Scalars['base_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['base_Bytes']>>;
  root_contains?: InputMaybe<Scalars['base_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['base_Bytes']>;
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
  _change_block?: InputMaybe<base_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<base_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<base_SnapshotRoot_filter>>>;
};

export type base_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type base_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type base_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<base_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<base_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<base_SpokeConnectorMode_filter>>>;
};

export type base_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  base_asset?: Maybe<base_Asset>;
  base_assets: Array<base_Asset>;
  base_assetStatus?: Maybe<base_AssetStatus>;
  base_assetStatuses: Array<base_AssetStatus>;
  base_assetBalance?: Maybe<base_AssetBalance>;
  base_assetBalances: Array<base_AssetBalance>;
  base_router?: Maybe<base_Router>;
  base_routers: Array<base_Router>;
  base_routerDailyTVL?: Maybe<base_RouterDailyTVL>;
  base_routerDailyTVLs: Array<base_RouterDailyTVL>;
  base_routerLiquidityEvent?: Maybe<base_RouterLiquidityEvent>;
  base_routerLiquidityEvents: Array<base_RouterLiquidityEvent>;
  base_setting?: Maybe<base_Setting>;
  base_settings: Array<base_Setting>;
  base_relayer?: Maybe<base_Relayer>;
  base_relayers: Array<base_Relayer>;
  base_sequencer?: Maybe<base_Sequencer>;
  base_sequencers: Array<base_Sequencer>;
  base_relayerFee?: Maybe<base_RelayerFee>;
  base_relayerFees: Array<base_RelayerFee>;
  base_originTransfer?: Maybe<base_OriginTransfer>;
  base_originTransfers: Array<base_OriginTransfer>;
  base_destinationTransfer?: Maybe<base_DestinationTransfer>;
  base_destinationTransfers: Array<base_DestinationTransfer>;
  base_originMessage?: Maybe<base_OriginMessage>;
  base_originMessages: Array<base_OriginMessage>;
  base_aggregateRoot?: Maybe<base_AggregateRoot>;
  base_aggregateRoots: Array<base_AggregateRoot>;
  base_connectorMeta?: Maybe<base_ConnectorMeta>;
  base_connectorMetas: Array<base_ConnectorMeta>;
  base_rootCount?: Maybe<base_RootCount>;
  base_rootCounts: Array<base_RootCount>;
  base_rootMessageSent?: Maybe<base_RootMessageSent>;
  base_rootMessageSents: Array<base_RootMessageSent>;
  base_relayerFeesIncrease?: Maybe<base_RelayerFeesIncrease>;
  base_relayerFeesIncreases: Array<base_RelayerFeesIncrease>;
  base_slippageUpdate?: Maybe<base_SlippageUpdate>;
  base_slippageUpdates: Array<base_SlippageUpdate>;
  base_snapshotRoot?: Maybe<base_SnapshotRoot>;
  base_snapshotRoots: Array<base_SnapshotRoot>;
  base_spokeConnectorMode?: Maybe<base_SpokeConnectorMode>;
  base_spokeConnectorModes: Array<base_SpokeConnectorMode>;
  base_aggregateRootProposed?: Maybe<base_AggregateRootProposed>;
  base_aggregateRootProposeds: Array<base_AggregateRootProposed>;
  base_optimisticRootFinalized?: Maybe<base_OptimisticRootFinalized>;
  base_optimisticRootFinalizeds: Array<base_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  base__meta?: Maybe<base__Meta_>;
};


export type Subscriptionbase_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_Asset_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_Asset_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_AssetStatus_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_AssetBalance_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_Router_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_Router_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_RouterDailyTVL_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_RouterLiquidityEvent_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_Setting_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_Setting_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_Relayer_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_Relayer_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_Sequencer_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_Sequencer_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_RelayerFee_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_OriginTransfer_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_DestinationTransfer_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_OriginMessage_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_AggregateRoot_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_ConnectorMeta_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_RootCount_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_RootCount_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_RootMessageSent_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_RelayerFeesIncrease_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_SlippageUpdate_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_SnapshotRoot_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_SpokeConnectorMode_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_AggregateRootProposed_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<base_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<base_OrderDirection>;
  where?: InputMaybe<base_OptimisticRootFinalized_filter>;
  block?: InputMaybe<base_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbase__metaArgs = {
  block?: InputMaybe<base_Block_height>;
};

export type base_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type base__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['base_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['base_Bytes']>;
};

/** The type for the top-level _meta field */
export type base__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: base__Block_;
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
  base_asset: InContextSdkMethod<Query['base_asset'], Querybase_assetArgs, MeshContext>,
  /** null **/
  base_assets: InContextSdkMethod<Query['base_assets'], Querybase_assetsArgs, MeshContext>,
  /** null **/
  base_assetStatus: InContextSdkMethod<Query['base_assetStatus'], Querybase_assetStatusArgs, MeshContext>,
  /** null **/
  base_assetStatuses: InContextSdkMethod<Query['base_assetStatuses'], Querybase_assetStatusesArgs, MeshContext>,
  /** null **/
  base_assetBalance: InContextSdkMethod<Query['base_assetBalance'], Querybase_assetBalanceArgs, MeshContext>,
  /** null **/
  base_assetBalances: InContextSdkMethod<Query['base_assetBalances'], Querybase_assetBalancesArgs, MeshContext>,
  /** null **/
  base_router: InContextSdkMethod<Query['base_router'], Querybase_routerArgs, MeshContext>,
  /** null **/
  base_routers: InContextSdkMethod<Query['base_routers'], Querybase_routersArgs, MeshContext>,
  /** null **/
  base_routerDailyTVL: InContextSdkMethod<Query['base_routerDailyTVL'], Querybase_routerDailyTVLArgs, MeshContext>,
  /** null **/
  base_routerDailyTVLs: InContextSdkMethod<Query['base_routerDailyTVLs'], Querybase_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  base_routerLiquidityEvent: InContextSdkMethod<Query['base_routerLiquidityEvent'], Querybase_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  base_routerLiquidityEvents: InContextSdkMethod<Query['base_routerLiquidityEvents'], Querybase_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  base_setting: InContextSdkMethod<Query['base_setting'], Querybase_settingArgs, MeshContext>,
  /** null **/
  base_settings: InContextSdkMethod<Query['base_settings'], Querybase_settingsArgs, MeshContext>,
  /** null **/
  base_relayer: InContextSdkMethod<Query['base_relayer'], Querybase_relayerArgs, MeshContext>,
  /** null **/
  base_relayers: InContextSdkMethod<Query['base_relayers'], Querybase_relayersArgs, MeshContext>,
  /** null **/
  base_sequencer: InContextSdkMethod<Query['base_sequencer'], Querybase_sequencerArgs, MeshContext>,
  /** null **/
  base_sequencers: InContextSdkMethod<Query['base_sequencers'], Querybase_sequencersArgs, MeshContext>,
  /** null **/
  base_relayerFee: InContextSdkMethod<Query['base_relayerFee'], Querybase_relayerFeeArgs, MeshContext>,
  /** null **/
  base_relayerFees: InContextSdkMethod<Query['base_relayerFees'], Querybase_relayerFeesArgs, MeshContext>,
  /** null **/
  base_originTransfer: InContextSdkMethod<Query['base_originTransfer'], Querybase_originTransferArgs, MeshContext>,
  /** null **/
  base_originTransfers: InContextSdkMethod<Query['base_originTransfers'], Querybase_originTransfersArgs, MeshContext>,
  /** null **/
  base_destinationTransfer: InContextSdkMethod<Query['base_destinationTransfer'], Querybase_destinationTransferArgs, MeshContext>,
  /** null **/
  base_destinationTransfers: InContextSdkMethod<Query['base_destinationTransfers'], Querybase_destinationTransfersArgs, MeshContext>,
  /** null **/
  base_originMessage: InContextSdkMethod<Query['base_originMessage'], Querybase_originMessageArgs, MeshContext>,
  /** null **/
  base_originMessages: InContextSdkMethod<Query['base_originMessages'], Querybase_originMessagesArgs, MeshContext>,
  /** null **/
  base_aggregateRoot: InContextSdkMethod<Query['base_aggregateRoot'], Querybase_aggregateRootArgs, MeshContext>,
  /** null **/
  base_aggregateRoots: InContextSdkMethod<Query['base_aggregateRoots'], Querybase_aggregateRootsArgs, MeshContext>,
  /** null **/
  base_connectorMeta: InContextSdkMethod<Query['base_connectorMeta'], Querybase_connectorMetaArgs, MeshContext>,
  /** null **/
  base_connectorMetas: InContextSdkMethod<Query['base_connectorMetas'], Querybase_connectorMetasArgs, MeshContext>,
  /** null **/
  base_rootCount: InContextSdkMethod<Query['base_rootCount'], Querybase_rootCountArgs, MeshContext>,
  /** null **/
  base_rootCounts: InContextSdkMethod<Query['base_rootCounts'], Querybase_rootCountsArgs, MeshContext>,
  /** null **/
  base_rootMessageSent: InContextSdkMethod<Query['base_rootMessageSent'], Querybase_rootMessageSentArgs, MeshContext>,
  /** null **/
  base_rootMessageSents: InContextSdkMethod<Query['base_rootMessageSents'], Querybase_rootMessageSentsArgs, MeshContext>,
  /** null **/
  base_relayerFeesIncrease: InContextSdkMethod<Query['base_relayerFeesIncrease'], Querybase_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  base_relayerFeesIncreases: InContextSdkMethod<Query['base_relayerFeesIncreases'], Querybase_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  base_slippageUpdate: InContextSdkMethod<Query['base_slippageUpdate'], Querybase_slippageUpdateArgs, MeshContext>,
  /** null **/
  base_slippageUpdates: InContextSdkMethod<Query['base_slippageUpdates'], Querybase_slippageUpdatesArgs, MeshContext>,
  /** null **/
  base_snapshotRoot: InContextSdkMethod<Query['base_snapshotRoot'], Querybase_snapshotRootArgs, MeshContext>,
  /** null **/
  base_snapshotRoots: InContextSdkMethod<Query['base_snapshotRoots'], Querybase_snapshotRootsArgs, MeshContext>,
  /** null **/
  base_spokeConnectorMode: InContextSdkMethod<Query['base_spokeConnectorMode'], Querybase_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  base_spokeConnectorModes: InContextSdkMethod<Query['base_spokeConnectorModes'], Querybase_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  base_aggregateRootProposed: InContextSdkMethod<Query['base_aggregateRootProposed'], Querybase_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  base_aggregateRootProposeds: InContextSdkMethod<Query['base_aggregateRootProposeds'], Querybase_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  base_optimisticRootFinalized: InContextSdkMethod<Query['base_optimisticRootFinalized'], Querybase_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  base_optimisticRootFinalizeds: InContextSdkMethod<Query['base_optimisticRootFinalizeds'], Querybase_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  base__meta: InContextSdkMethod<Query['base__meta'], Querybase__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  base_asset: InContextSdkMethod<Subscription['base_asset'], Subscriptionbase_assetArgs, MeshContext>,
  /** null **/
  base_assets: InContextSdkMethod<Subscription['base_assets'], Subscriptionbase_assetsArgs, MeshContext>,
  /** null **/
  base_assetStatus: InContextSdkMethod<Subscription['base_assetStatus'], Subscriptionbase_assetStatusArgs, MeshContext>,
  /** null **/
  base_assetStatuses: InContextSdkMethod<Subscription['base_assetStatuses'], Subscriptionbase_assetStatusesArgs, MeshContext>,
  /** null **/
  base_assetBalance: InContextSdkMethod<Subscription['base_assetBalance'], Subscriptionbase_assetBalanceArgs, MeshContext>,
  /** null **/
  base_assetBalances: InContextSdkMethod<Subscription['base_assetBalances'], Subscriptionbase_assetBalancesArgs, MeshContext>,
  /** null **/
  base_router: InContextSdkMethod<Subscription['base_router'], Subscriptionbase_routerArgs, MeshContext>,
  /** null **/
  base_routers: InContextSdkMethod<Subscription['base_routers'], Subscriptionbase_routersArgs, MeshContext>,
  /** null **/
  base_routerDailyTVL: InContextSdkMethod<Subscription['base_routerDailyTVL'], Subscriptionbase_routerDailyTVLArgs, MeshContext>,
  /** null **/
  base_routerDailyTVLs: InContextSdkMethod<Subscription['base_routerDailyTVLs'], Subscriptionbase_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  base_routerLiquidityEvent: InContextSdkMethod<Subscription['base_routerLiquidityEvent'], Subscriptionbase_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  base_routerLiquidityEvents: InContextSdkMethod<Subscription['base_routerLiquidityEvents'], Subscriptionbase_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  base_setting: InContextSdkMethod<Subscription['base_setting'], Subscriptionbase_settingArgs, MeshContext>,
  /** null **/
  base_settings: InContextSdkMethod<Subscription['base_settings'], Subscriptionbase_settingsArgs, MeshContext>,
  /** null **/
  base_relayer: InContextSdkMethod<Subscription['base_relayer'], Subscriptionbase_relayerArgs, MeshContext>,
  /** null **/
  base_relayers: InContextSdkMethod<Subscription['base_relayers'], Subscriptionbase_relayersArgs, MeshContext>,
  /** null **/
  base_sequencer: InContextSdkMethod<Subscription['base_sequencer'], Subscriptionbase_sequencerArgs, MeshContext>,
  /** null **/
  base_sequencers: InContextSdkMethod<Subscription['base_sequencers'], Subscriptionbase_sequencersArgs, MeshContext>,
  /** null **/
  base_relayerFee: InContextSdkMethod<Subscription['base_relayerFee'], Subscriptionbase_relayerFeeArgs, MeshContext>,
  /** null **/
  base_relayerFees: InContextSdkMethod<Subscription['base_relayerFees'], Subscriptionbase_relayerFeesArgs, MeshContext>,
  /** null **/
  base_originTransfer: InContextSdkMethod<Subscription['base_originTransfer'], Subscriptionbase_originTransferArgs, MeshContext>,
  /** null **/
  base_originTransfers: InContextSdkMethod<Subscription['base_originTransfers'], Subscriptionbase_originTransfersArgs, MeshContext>,
  /** null **/
  base_destinationTransfer: InContextSdkMethod<Subscription['base_destinationTransfer'], Subscriptionbase_destinationTransferArgs, MeshContext>,
  /** null **/
  base_destinationTransfers: InContextSdkMethod<Subscription['base_destinationTransfers'], Subscriptionbase_destinationTransfersArgs, MeshContext>,
  /** null **/
  base_originMessage: InContextSdkMethod<Subscription['base_originMessage'], Subscriptionbase_originMessageArgs, MeshContext>,
  /** null **/
  base_originMessages: InContextSdkMethod<Subscription['base_originMessages'], Subscriptionbase_originMessagesArgs, MeshContext>,
  /** null **/
  base_aggregateRoot: InContextSdkMethod<Subscription['base_aggregateRoot'], Subscriptionbase_aggregateRootArgs, MeshContext>,
  /** null **/
  base_aggregateRoots: InContextSdkMethod<Subscription['base_aggregateRoots'], Subscriptionbase_aggregateRootsArgs, MeshContext>,
  /** null **/
  base_connectorMeta: InContextSdkMethod<Subscription['base_connectorMeta'], Subscriptionbase_connectorMetaArgs, MeshContext>,
  /** null **/
  base_connectorMetas: InContextSdkMethod<Subscription['base_connectorMetas'], Subscriptionbase_connectorMetasArgs, MeshContext>,
  /** null **/
  base_rootCount: InContextSdkMethod<Subscription['base_rootCount'], Subscriptionbase_rootCountArgs, MeshContext>,
  /** null **/
  base_rootCounts: InContextSdkMethod<Subscription['base_rootCounts'], Subscriptionbase_rootCountsArgs, MeshContext>,
  /** null **/
  base_rootMessageSent: InContextSdkMethod<Subscription['base_rootMessageSent'], Subscriptionbase_rootMessageSentArgs, MeshContext>,
  /** null **/
  base_rootMessageSents: InContextSdkMethod<Subscription['base_rootMessageSents'], Subscriptionbase_rootMessageSentsArgs, MeshContext>,
  /** null **/
  base_relayerFeesIncrease: InContextSdkMethod<Subscription['base_relayerFeesIncrease'], Subscriptionbase_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  base_relayerFeesIncreases: InContextSdkMethod<Subscription['base_relayerFeesIncreases'], Subscriptionbase_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  base_slippageUpdate: InContextSdkMethod<Subscription['base_slippageUpdate'], Subscriptionbase_slippageUpdateArgs, MeshContext>,
  /** null **/
  base_slippageUpdates: InContextSdkMethod<Subscription['base_slippageUpdates'], Subscriptionbase_slippageUpdatesArgs, MeshContext>,
  /** null **/
  base_snapshotRoot: InContextSdkMethod<Subscription['base_snapshotRoot'], Subscriptionbase_snapshotRootArgs, MeshContext>,
  /** null **/
  base_snapshotRoots: InContextSdkMethod<Subscription['base_snapshotRoots'], Subscriptionbase_snapshotRootsArgs, MeshContext>,
  /** null **/
  base_spokeConnectorMode: InContextSdkMethod<Subscription['base_spokeConnectorMode'], Subscriptionbase_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  base_spokeConnectorModes: InContextSdkMethod<Subscription['base_spokeConnectorModes'], Subscriptionbase_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  base_aggregateRootProposed: InContextSdkMethod<Subscription['base_aggregateRootProposed'], Subscriptionbase_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  base_aggregateRootProposeds: InContextSdkMethod<Subscription['base_aggregateRootProposeds'], Subscriptionbase_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  base_optimisticRootFinalized: InContextSdkMethod<Subscription['base_optimisticRootFinalized'], Subscriptionbase_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  base_optimisticRootFinalizeds: InContextSdkMethod<Subscription['base_optimisticRootFinalizeds'], Subscriptionbase_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  base__meta: InContextSdkMethod<Subscription['base__meta'], Subscriptionbase__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Base"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
