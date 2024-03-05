// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextGoerliTypes {
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
  goerli_BigDecimal: any;
  BigInt: any;
  goerli_Bytes: any;
  goerli_Int8: any;
};

export type goerli_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['goerli_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type goerli_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['goerli_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type goerli_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_AggregateRootProposed_filter>>>;
};

export type goerli_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type goerli_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['goerli_Bytes']>;
  root_not?: InputMaybe<Scalars['goerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_AggregateRoot_filter>>>;
};

export type goerli_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type goerli_Aggregation_interval =
  | 'hour'
  | 'day';

export type goerli_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['goerli_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['goerli_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['goerli_Bytes']>;
  localAsset?: Maybe<Scalars['goerli_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<goerli_AssetStatus>;
};

export type goerli_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: goerli_Router;
  asset: goerli_Asset;
  feesEarned: Scalars['BigInt'];
};

export type goerli_AssetBalance_filter = {
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
  router_?: InputMaybe<goerli_Router_filter>;
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
  asset_?: InputMaybe<goerli_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_AssetBalance_filter>>>;
};

export type goerli_AssetBalance_orderBy =
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

export type goerli_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type goerli_AssetStatus_filter = {
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_AssetStatus_filter>>>;
};

export type goerli_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type goerli_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['goerli_Bytes']>;
  key_not?: InputMaybe<Scalars['goerli_Bytes']>;
  key_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  key_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  key_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  key_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  key_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['goerli_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['goerli_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  localAsset?: InputMaybe<Scalars['goerli_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['goerli_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  status_?: InputMaybe<goerli_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_Asset_filter>>>;
};

export type goerli_Asset_orderBy =
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

export type goerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type goerli_Block_height = {
  hash?: InputMaybe<Scalars['goerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type goerli_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['goerli_Bytes']>;
  rootManager?: Maybe<Scalars['goerli_Bytes']>;
  mirrorConnector?: Maybe<Scalars['goerli_Bytes']>;
};

export type goerli_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_ConnectorMeta_filter>>>;
};

export type goerli_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type goerli_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['goerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<goerli_TransferStatus>;
  routers?: Maybe<Array<goerli_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['goerli_Bytes']>;
  delegate?: Maybe<Scalars['goerli_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['goerli_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['goerli_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['goerli_Bytes']>;
  asset?: Maybe<goerli_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['goerli_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['goerli_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['goerli_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['goerli_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['goerli_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type goerli_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Router_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Router_filter>;
};

export type goerli_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<goerli_TransferStatus>;
  status_not?: InputMaybe<goerli_TransferStatus>;
  status_in?: InputMaybe<Array<goerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<goerli_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<goerli_Router_filter>;
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
  to?: InputMaybe<Scalars['goerli_Bytes']>;
  to_not?: InputMaybe<Scalars['goerli_Bytes']>;
  to_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  to_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  to_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  to_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  delegate?: InputMaybe<Scalars['goerli_Bytes']>;
  delegate_not?: InputMaybe<Scalars['goerli_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  originSender?: InputMaybe<Scalars['goerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['goerli_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  asset_?: InputMaybe<goerli_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['goerli_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['goerli_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_DestinationTransfer_filter>>>;
};

export type goerli_DestinationTransfer_orderBy =
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

export type goerli_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['goerli_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type goerli_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_OptimisticRootFinalized_filter>>>;
};

export type goerli_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type goerli_OrderDirection =
  | 'asc'
  | 'desc';

export type goerli_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['goerli_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['goerli_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['goerli_Bytes']>;
  root?: Maybe<Scalars['goerli_Bytes']>;
  transactionHash?: Maybe<Scalars['goerli_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<goerli_RootCount>;
};

export type goerli_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['goerli_Bytes']>;
  leaf_not?: InputMaybe<Scalars['goerli_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['goerli_Bytes']>;
  message_not?: InputMaybe<Scalars['goerli_Bytes']>;
  message_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  message_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  message_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  message_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  message_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  root?: InputMaybe<Scalars['goerli_Bytes']>;
  root_not?: InputMaybe<Scalars['goerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  rootCount_?: InputMaybe<goerli_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_OriginMessage_filter>>>;
};

export type goerli_OriginMessage_orderBy =
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

export type goerli_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['goerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<goerli_TransferStatus>;
  messageHash?: Maybe<Scalars['goerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['goerli_Bytes']>;
  delegate?: Maybe<Scalars['goerli_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['goerli_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['goerli_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['goerli_Bytes']>;
  asset?: Maybe<goerli_Asset>;
  transactingAsset?: Maybe<Scalars['goerli_Bytes']>;
  message?: Maybe<goerli_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<goerli_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['goerli_Bytes']>;
  caller?: Maybe<Scalars['goerli_Bytes']>;
  transactionHash?: Maybe<Scalars['goerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['goerli_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type goerli_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RelayerFee_filter>;
};

export type goerli_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<goerli_TransferStatus>;
  status_not?: InputMaybe<goerli_TransferStatus>;
  status_in?: InputMaybe<Array<goerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<goerli_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['goerli_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  to?: InputMaybe<Scalars['goerli_Bytes']>;
  to_not?: InputMaybe<Scalars['goerli_Bytes']>;
  to_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  to_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  to_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  to_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  delegate?: InputMaybe<Scalars['goerli_Bytes']>;
  delegate_not?: InputMaybe<Scalars['goerli_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['goerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['goerli_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  asset_?: InputMaybe<goerli_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  message_?: InputMaybe<goerli_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<goerli_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['goerli_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['goerli_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  caller?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['goerli_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['goerli_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_OriginTransfer_filter>>>;
};

export type goerli_OriginTransfer_orderBy =
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
  goerli_asset?: Maybe<goerli_Asset>;
  goerli_assets: Array<goerli_Asset>;
  goerli_assetStatus?: Maybe<goerli_AssetStatus>;
  goerli_assetStatuses: Array<goerli_AssetStatus>;
  goerli_assetBalance?: Maybe<goerli_AssetBalance>;
  goerli_assetBalances: Array<goerli_AssetBalance>;
  goerli_router?: Maybe<goerli_Router>;
  goerli_routers: Array<goerli_Router>;
  goerli_routerDailyTVL?: Maybe<goerli_RouterDailyTVL>;
  goerli_routerDailyTVLs: Array<goerli_RouterDailyTVL>;
  goerli_routerLiquidityEvent?: Maybe<goerli_RouterLiquidityEvent>;
  goerli_routerLiquidityEvents: Array<goerli_RouterLiquidityEvent>;
  goerli_setting?: Maybe<goerli_Setting>;
  goerli_settings: Array<goerli_Setting>;
  goerli_relayer?: Maybe<goerli_Relayer>;
  goerli_relayers: Array<goerli_Relayer>;
  goerli_sequencer?: Maybe<goerli_Sequencer>;
  goerli_sequencers: Array<goerli_Sequencer>;
  goerli_relayerFee?: Maybe<goerli_RelayerFee>;
  goerli_relayerFees: Array<goerli_RelayerFee>;
  goerli_originTransfer?: Maybe<goerli_OriginTransfer>;
  goerli_originTransfers: Array<goerli_OriginTransfer>;
  goerli_destinationTransfer?: Maybe<goerli_DestinationTransfer>;
  goerli_destinationTransfers: Array<goerli_DestinationTransfer>;
  goerli_originMessage?: Maybe<goerli_OriginMessage>;
  goerli_originMessages: Array<goerli_OriginMessage>;
  goerli_aggregateRoot?: Maybe<goerli_AggregateRoot>;
  goerli_aggregateRoots: Array<goerli_AggregateRoot>;
  goerli_connectorMeta?: Maybe<goerli_ConnectorMeta>;
  goerli_connectorMetas: Array<goerli_ConnectorMeta>;
  goerli_rootCount?: Maybe<goerli_RootCount>;
  goerli_rootCounts: Array<goerli_RootCount>;
  goerli_rootMessageSent?: Maybe<goerli_RootMessageSent>;
  goerli_rootMessageSents: Array<goerli_RootMessageSent>;
  goerli_relayerFeesIncrease?: Maybe<goerli_RelayerFeesIncrease>;
  goerli_relayerFeesIncreases: Array<goerli_RelayerFeesIncrease>;
  goerli_slippageUpdate?: Maybe<goerli_SlippageUpdate>;
  goerli_slippageUpdates: Array<goerli_SlippageUpdate>;
  goerli_snapshotRoot?: Maybe<goerli_SnapshotRoot>;
  goerli_snapshotRoots: Array<goerli_SnapshotRoot>;
  goerli_spokeConnectorMode?: Maybe<goerli_SpokeConnectorMode>;
  goerli_spokeConnectorModes: Array<goerli_SpokeConnectorMode>;
  goerli_aggregateRootProposed?: Maybe<goerli_AggregateRootProposed>;
  goerli_aggregateRootProposeds: Array<goerli_AggregateRootProposed>;
  goerli_optimisticRootFinalized?: Maybe<goerli_OptimisticRootFinalized>;
  goerli_optimisticRootFinalizeds: Array<goerli_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  goerli__meta?: Maybe<goerli__Meta_>;
};


export type Querygoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Asset_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Asset_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AssetStatus_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AssetBalance_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Router_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Router_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RouterDailyTVL_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RouterLiquidityEvent_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Setting_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Setting_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Relayer_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Sequencer_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Sequencer_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RelayerFee_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_OriginTransfer_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_DestinationTransfer_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_OriginMessage_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AggregateRoot_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_ConnectorMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RootCount_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RootCount_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RootMessageSent_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RelayerFeesIncrease_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_SlippageUpdate_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_SnapshotRoot_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_SpokeConnectorMode_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AggregateRootProposed_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_OptimisticRootFinalized_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli__metaArgs = {
  block?: InputMaybe<goerli_Block_height>;
};

export type goerli_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['goerli_Bytes']>;
};

export type goerli_RelayerFee = {
  id: Scalars['ID'];
  transfer: goerli_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['goerli_Bytes'];
};

export type goerli_RelayerFee_filter = {
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
  transfer_?: InputMaybe<goerli_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['goerli_Bytes']>;
  asset_not?: InputMaybe<Scalars['goerli_Bytes']>;
  asset_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  asset_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  asset_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  asset_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_RelayerFee_filter>>>;
};

export type goerli_RelayerFee_orderBy =
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

export type goerli_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: goerli_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['goerli_Bytes']>;
  caller: Scalars['goerli_Bytes'];
  transactionHash: Scalars['goerli_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type goerli_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<goerli_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['goerli_Bytes']>;
  asset_not?: InputMaybe<Scalars['goerli_Bytes']>;
  asset_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  asset_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  asset_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  asset_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  caller?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_RelayerFeesIncrease_filter>>>;
};

export type goerli_RelayerFeesIncrease_orderBy =
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

export type goerli_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['goerli_Bytes']>;
  relayer_not?: InputMaybe<Scalars['goerli_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_Relayer_filter>>>;
};

export type goerli_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type goerli_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type goerli_RootCount_filter = {
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_RootCount_filter>>>;
};

export type goerli_RootCount_orderBy =
  | 'id'
  | 'count';

export type goerli_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['goerli_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['goerli_Bytes']>;
  transactionHash?: Maybe<Scalars['goerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type goerli_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['goerli_Bytes']>;
  root_not?: InputMaybe<Scalars['goerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_RootMessageSent_filter>>>;
};

export type goerli_RootMessageSent_orderBy =
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

export type goerli_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['goerli_Bytes']>;
  recipient?: Maybe<Scalars['goerli_Bytes']>;
  proposedOwner?: Maybe<Scalars['goerli_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<goerli_AssetBalance>;
};


export type goerli_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AssetBalance_filter>;
};

export type goerli_RouterDailyTVL = {
  id: Scalars['ID'];
  router: goerli_Router;
  asset: goerli_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type goerli_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<goerli_Router_filter>;
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
  asset_?: InputMaybe<goerli_Asset_filter>;
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_RouterDailyTVL_filter>>>;
};

export type goerli_RouterDailyTVL_orderBy =
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

export type goerli_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<goerli_RouterLiquidityEventType>;
  router: goerli_Router;
  asset: goerli_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['goerli_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['goerli_Bytes'];
  nonce: Scalars['BigInt'];
};

export type goerli_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type goerli_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<goerli_RouterLiquidityEventType>;
  type_not?: InputMaybe<goerli_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<goerli_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<goerli_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<goerli_Router_filter>;
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
  asset_?: InputMaybe<goerli_Asset_filter>;
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
  caller?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_RouterLiquidityEvent_filter>>>;
};

export type goerli_RouterLiquidityEvent_orderBy =
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

export type goerli_Router_filter = {
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
  owner?: InputMaybe<Scalars['goerli_Bytes']>;
  owner_not?: InputMaybe<Scalars['goerli_Bytes']>;
  owner_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  owner_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  owner_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  owner_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  recipient?: InputMaybe<Scalars['goerli_Bytes']>;
  recipient_not?: InputMaybe<Scalars['goerli_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<goerli_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_Router_filter>>>;
};

export type goerli_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type goerli_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['goerli_Bytes']>;
};

export type goerli_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['goerli_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['goerli_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_Sequencer_filter>>>;
};

export type goerli_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type goerli_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['goerli_Bytes'];
};

export type goerli_Setting_filter = {
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
  caller?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_Setting_filter>>>;
};

export type goerli_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type goerli_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: goerli_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['goerli_Bytes'];
  transactionHash: Scalars['goerli_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type goerli_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<goerli_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_SlippageUpdate_filter>>>;
};

export type goerli_SlippageUpdate_orderBy =
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

export type goerli_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['goerli_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type goerli_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['goerli_Bytes']>;
  root_not?: InputMaybe<Scalars['goerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_SnapshotRoot_filter>>>;
};

export type goerli_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type goerli_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type goerli_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_SpokeConnectorMode_filter>>>;
};

export type goerli_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  goerli_asset?: Maybe<goerli_Asset>;
  goerli_assets: Array<goerli_Asset>;
  goerli_assetStatus?: Maybe<goerli_AssetStatus>;
  goerli_assetStatuses: Array<goerli_AssetStatus>;
  goerli_assetBalance?: Maybe<goerli_AssetBalance>;
  goerli_assetBalances: Array<goerli_AssetBalance>;
  goerli_router?: Maybe<goerli_Router>;
  goerli_routers: Array<goerli_Router>;
  goerli_routerDailyTVL?: Maybe<goerli_RouterDailyTVL>;
  goerli_routerDailyTVLs: Array<goerli_RouterDailyTVL>;
  goerli_routerLiquidityEvent?: Maybe<goerli_RouterLiquidityEvent>;
  goerli_routerLiquidityEvents: Array<goerli_RouterLiquidityEvent>;
  goerli_setting?: Maybe<goerli_Setting>;
  goerli_settings: Array<goerli_Setting>;
  goerli_relayer?: Maybe<goerli_Relayer>;
  goerli_relayers: Array<goerli_Relayer>;
  goerli_sequencer?: Maybe<goerli_Sequencer>;
  goerli_sequencers: Array<goerli_Sequencer>;
  goerli_relayerFee?: Maybe<goerli_RelayerFee>;
  goerli_relayerFees: Array<goerli_RelayerFee>;
  goerli_originTransfer?: Maybe<goerli_OriginTransfer>;
  goerli_originTransfers: Array<goerli_OriginTransfer>;
  goerli_destinationTransfer?: Maybe<goerli_DestinationTransfer>;
  goerli_destinationTransfers: Array<goerli_DestinationTransfer>;
  goerli_originMessage?: Maybe<goerli_OriginMessage>;
  goerli_originMessages: Array<goerli_OriginMessage>;
  goerli_aggregateRoot?: Maybe<goerli_AggregateRoot>;
  goerli_aggregateRoots: Array<goerli_AggregateRoot>;
  goerli_connectorMeta?: Maybe<goerli_ConnectorMeta>;
  goerli_connectorMetas: Array<goerli_ConnectorMeta>;
  goerli_rootCount?: Maybe<goerli_RootCount>;
  goerli_rootCounts: Array<goerli_RootCount>;
  goerli_rootMessageSent?: Maybe<goerli_RootMessageSent>;
  goerli_rootMessageSents: Array<goerli_RootMessageSent>;
  goerli_relayerFeesIncrease?: Maybe<goerli_RelayerFeesIncrease>;
  goerli_relayerFeesIncreases: Array<goerli_RelayerFeesIncrease>;
  goerli_slippageUpdate?: Maybe<goerli_SlippageUpdate>;
  goerli_slippageUpdates: Array<goerli_SlippageUpdate>;
  goerli_snapshotRoot?: Maybe<goerli_SnapshotRoot>;
  goerli_snapshotRoots: Array<goerli_SnapshotRoot>;
  goerli_spokeConnectorMode?: Maybe<goerli_SpokeConnectorMode>;
  goerli_spokeConnectorModes: Array<goerli_SpokeConnectorMode>;
  goerli_aggregateRootProposed?: Maybe<goerli_AggregateRootProposed>;
  goerli_aggregateRootProposeds: Array<goerli_AggregateRootProposed>;
  goerli_optimisticRootFinalized?: Maybe<goerli_OptimisticRootFinalized>;
  goerli_optimisticRootFinalizeds: Array<goerli_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  goerli__meta?: Maybe<goerli__Meta_>;
};


export type Subscriptiongoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Asset_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Asset_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AssetStatus_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AssetBalance_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Router_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Router_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RouterDailyTVL_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RouterLiquidityEvent_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Setting_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Setting_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Relayer_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Sequencer_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Sequencer_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RelayerFee_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_OriginTransfer_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_DestinationTransfer_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_OriginMessage_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AggregateRoot_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_ConnectorMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RootCount_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RootCount_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RootMessageSent_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RelayerFeesIncrease_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_SlippageUpdate_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_SnapshotRoot_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_SpokeConnectorMode_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AggregateRootProposed_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_OptimisticRootFinalized_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli__metaArgs = {
  block?: InputMaybe<goerli_Block_height>;
};

export type goerli_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type goerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['goerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type goerli__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: goerli__Block_;
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
  goerli_asset: InContextSdkMethod<Query['goerli_asset'], Querygoerli_assetArgs, MeshContext>,
  /** null **/
  goerli_assets: InContextSdkMethod<Query['goerli_assets'], Querygoerli_assetsArgs, MeshContext>,
  /** null **/
  goerli_assetStatus: InContextSdkMethod<Query['goerli_assetStatus'], Querygoerli_assetStatusArgs, MeshContext>,
  /** null **/
  goerli_assetStatuses: InContextSdkMethod<Query['goerli_assetStatuses'], Querygoerli_assetStatusesArgs, MeshContext>,
  /** null **/
  goerli_assetBalance: InContextSdkMethod<Query['goerli_assetBalance'], Querygoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  goerli_assetBalances: InContextSdkMethod<Query['goerli_assetBalances'], Querygoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  goerli_router: InContextSdkMethod<Query['goerli_router'], Querygoerli_routerArgs, MeshContext>,
  /** null **/
  goerli_routers: InContextSdkMethod<Query['goerli_routers'], Querygoerli_routersArgs, MeshContext>,
  /** null **/
  goerli_routerDailyTVL: InContextSdkMethod<Query['goerli_routerDailyTVL'], Querygoerli_routerDailyTVLArgs, MeshContext>,
  /** null **/
  goerli_routerDailyTVLs: InContextSdkMethod<Query['goerli_routerDailyTVLs'], Querygoerli_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  goerli_routerLiquidityEvent: InContextSdkMethod<Query['goerli_routerLiquidityEvent'], Querygoerli_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  goerli_routerLiquidityEvents: InContextSdkMethod<Query['goerli_routerLiquidityEvents'], Querygoerli_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  goerli_setting: InContextSdkMethod<Query['goerli_setting'], Querygoerli_settingArgs, MeshContext>,
  /** null **/
  goerli_settings: InContextSdkMethod<Query['goerli_settings'], Querygoerli_settingsArgs, MeshContext>,
  /** null **/
  goerli_relayer: InContextSdkMethod<Query['goerli_relayer'], Querygoerli_relayerArgs, MeshContext>,
  /** null **/
  goerli_relayers: InContextSdkMethod<Query['goerli_relayers'], Querygoerli_relayersArgs, MeshContext>,
  /** null **/
  goerli_sequencer: InContextSdkMethod<Query['goerli_sequencer'], Querygoerli_sequencerArgs, MeshContext>,
  /** null **/
  goerli_sequencers: InContextSdkMethod<Query['goerli_sequencers'], Querygoerli_sequencersArgs, MeshContext>,
  /** null **/
  goerli_relayerFee: InContextSdkMethod<Query['goerli_relayerFee'], Querygoerli_relayerFeeArgs, MeshContext>,
  /** null **/
  goerli_relayerFees: InContextSdkMethod<Query['goerli_relayerFees'], Querygoerli_relayerFeesArgs, MeshContext>,
  /** null **/
  goerli_originTransfer: InContextSdkMethod<Query['goerli_originTransfer'], Querygoerli_originTransferArgs, MeshContext>,
  /** null **/
  goerli_originTransfers: InContextSdkMethod<Query['goerli_originTransfers'], Querygoerli_originTransfersArgs, MeshContext>,
  /** null **/
  goerli_destinationTransfer: InContextSdkMethod<Query['goerli_destinationTransfer'], Querygoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  goerli_destinationTransfers: InContextSdkMethod<Query['goerli_destinationTransfers'], Querygoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  goerli_originMessage: InContextSdkMethod<Query['goerli_originMessage'], Querygoerli_originMessageArgs, MeshContext>,
  /** null **/
  goerli_originMessages: InContextSdkMethod<Query['goerli_originMessages'], Querygoerli_originMessagesArgs, MeshContext>,
  /** null **/
  goerli_aggregateRoot: InContextSdkMethod<Query['goerli_aggregateRoot'], Querygoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  goerli_aggregateRoots: InContextSdkMethod<Query['goerli_aggregateRoots'], Querygoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  goerli_connectorMeta: InContextSdkMethod<Query['goerli_connectorMeta'], Querygoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  goerli_connectorMetas: InContextSdkMethod<Query['goerli_connectorMetas'], Querygoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  goerli_rootCount: InContextSdkMethod<Query['goerli_rootCount'], Querygoerli_rootCountArgs, MeshContext>,
  /** null **/
  goerli_rootCounts: InContextSdkMethod<Query['goerli_rootCounts'], Querygoerli_rootCountsArgs, MeshContext>,
  /** null **/
  goerli_rootMessageSent: InContextSdkMethod<Query['goerli_rootMessageSent'], Querygoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  goerli_rootMessageSents: InContextSdkMethod<Query['goerli_rootMessageSents'], Querygoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  goerli_relayerFeesIncrease: InContextSdkMethod<Query['goerli_relayerFeesIncrease'], Querygoerli_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  goerli_relayerFeesIncreases: InContextSdkMethod<Query['goerli_relayerFeesIncreases'], Querygoerli_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  goerli_slippageUpdate: InContextSdkMethod<Query['goerli_slippageUpdate'], Querygoerli_slippageUpdateArgs, MeshContext>,
  /** null **/
  goerli_slippageUpdates: InContextSdkMethod<Query['goerli_slippageUpdates'], Querygoerli_slippageUpdatesArgs, MeshContext>,
  /** null **/
  goerli_snapshotRoot: InContextSdkMethod<Query['goerli_snapshotRoot'], Querygoerli_snapshotRootArgs, MeshContext>,
  /** null **/
  goerli_snapshotRoots: InContextSdkMethod<Query['goerli_snapshotRoots'], Querygoerli_snapshotRootsArgs, MeshContext>,
  /** null **/
  goerli_spokeConnectorMode: InContextSdkMethod<Query['goerli_spokeConnectorMode'], Querygoerli_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  goerli_spokeConnectorModes: InContextSdkMethod<Query['goerli_spokeConnectorModes'], Querygoerli_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  goerli_aggregateRootProposed: InContextSdkMethod<Query['goerli_aggregateRootProposed'], Querygoerli_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  goerli_aggregateRootProposeds: InContextSdkMethod<Query['goerli_aggregateRootProposeds'], Querygoerli_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  goerli_optimisticRootFinalized: InContextSdkMethod<Query['goerli_optimisticRootFinalized'], Querygoerli_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  goerli_optimisticRootFinalizeds: InContextSdkMethod<Query['goerli_optimisticRootFinalizeds'], Querygoerli_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  goerli__meta: InContextSdkMethod<Query['goerli__meta'], Querygoerli__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  goerli_asset: InContextSdkMethod<Subscription['goerli_asset'], Subscriptiongoerli_assetArgs, MeshContext>,
  /** null **/
  goerli_assets: InContextSdkMethod<Subscription['goerli_assets'], Subscriptiongoerli_assetsArgs, MeshContext>,
  /** null **/
  goerli_assetStatus: InContextSdkMethod<Subscription['goerli_assetStatus'], Subscriptiongoerli_assetStatusArgs, MeshContext>,
  /** null **/
  goerli_assetStatuses: InContextSdkMethod<Subscription['goerli_assetStatuses'], Subscriptiongoerli_assetStatusesArgs, MeshContext>,
  /** null **/
  goerli_assetBalance: InContextSdkMethod<Subscription['goerli_assetBalance'], Subscriptiongoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  goerli_assetBalances: InContextSdkMethod<Subscription['goerli_assetBalances'], Subscriptiongoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  goerli_router: InContextSdkMethod<Subscription['goerli_router'], Subscriptiongoerli_routerArgs, MeshContext>,
  /** null **/
  goerli_routers: InContextSdkMethod<Subscription['goerli_routers'], Subscriptiongoerli_routersArgs, MeshContext>,
  /** null **/
  goerli_routerDailyTVL: InContextSdkMethod<Subscription['goerli_routerDailyTVL'], Subscriptiongoerli_routerDailyTVLArgs, MeshContext>,
  /** null **/
  goerli_routerDailyTVLs: InContextSdkMethod<Subscription['goerli_routerDailyTVLs'], Subscriptiongoerli_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  goerli_routerLiquidityEvent: InContextSdkMethod<Subscription['goerli_routerLiquidityEvent'], Subscriptiongoerli_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  goerli_routerLiquidityEvents: InContextSdkMethod<Subscription['goerli_routerLiquidityEvents'], Subscriptiongoerli_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  goerli_setting: InContextSdkMethod<Subscription['goerli_setting'], Subscriptiongoerli_settingArgs, MeshContext>,
  /** null **/
  goerli_settings: InContextSdkMethod<Subscription['goerli_settings'], Subscriptiongoerli_settingsArgs, MeshContext>,
  /** null **/
  goerli_relayer: InContextSdkMethod<Subscription['goerli_relayer'], Subscriptiongoerli_relayerArgs, MeshContext>,
  /** null **/
  goerli_relayers: InContextSdkMethod<Subscription['goerli_relayers'], Subscriptiongoerli_relayersArgs, MeshContext>,
  /** null **/
  goerli_sequencer: InContextSdkMethod<Subscription['goerli_sequencer'], Subscriptiongoerli_sequencerArgs, MeshContext>,
  /** null **/
  goerli_sequencers: InContextSdkMethod<Subscription['goerli_sequencers'], Subscriptiongoerli_sequencersArgs, MeshContext>,
  /** null **/
  goerli_relayerFee: InContextSdkMethod<Subscription['goerli_relayerFee'], Subscriptiongoerli_relayerFeeArgs, MeshContext>,
  /** null **/
  goerli_relayerFees: InContextSdkMethod<Subscription['goerli_relayerFees'], Subscriptiongoerli_relayerFeesArgs, MeshContext>,
  /** null **/
  goerli_originTransfer: InContextSdkMethod<Subscription['goerli_originTransfer'], Subscriptiongoerli_originTransferArgs, MeshContext>,
  /** null **/
  goerli_originTransfers: InContextSdkMethod<Subscription['goerli_originTransfers'], Subscriptiongoerli_originTransfersArgs, MeshContext>,
  /** null **/
  goerli_destinationTransfer: InContextSdkMethod<Subscription['goerli_destinationTransfer'], Subscriptiongoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  goerli_destinationTransfers: InContextSdkMethod<Subscription['goerli_destinationTransfers'], Subscriptiongoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  goerli_originMessage: InContextSdkMethod<Subscription['goerli_originMessage'], Subscriptiongoerli_originMessageArgs, MeshContext>,
  /** null **/
  goerli_originMessages: InContextSdkMethod<Subscription['goerli_originMessages'], Subscriptiongoerli_originMessagesArgs, MeshContext>,
  /** null **/
  goerli_aggregateRoot: InContextSdkMethod<Subscription['goerli_aggregateRoot'], Subscriptiongoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  goerli_aggregateRoots: InContextSdkMethod<Subscription['goerli_aggregateRoots'], Subscriptiongoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  goerli_connectorMeta: InContextSdkMethod<Subscription['goerli_connectorMeta'], Subscriptiongoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  goerli_connectorMetas: InContextSdkMethod<Subscription['goerli_connectorMetas'], Subscriptiongoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  goerli_rootCount: InContextSdkMethod<Subscription['goerli_rootCount'], Subscriptiongoerli_rootCountArgs, MeshContext>,
  /** null **/
  goerli_rootCounts: InContextSdkMethod<Subscription['goerli_rootCounts'], Subscriptiongoerli_rootCountsArgs, MeshContext>,
  /** null **/
  goerli_rootMessageSent: InContextSdkMethod<Subscription['goerli_rootMessageSent'], Subscriptiongoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  goerli_rootMessageSents: InContextSdkMethod<Subscription['goerli_rootMessageSents'], Subscriptiongoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  goerli_relayerFeesIncrease: InContextSdkMethod<Subscription['goerli_relayerFeesIncrease'], Subscriptiongoerli_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  goerli_relayerFeesIncreases: InContextSdkMethod<Subscription['goerli_relayerFeesIncreases'], Subscriptiongoerli_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  goerli_slippageUpdate: InContextSdkMethod<Subscription['goerli_slippageUpdate'], Subscriptiongoerli_slippageUpdateArgs, MeshContext>,
  /** null **/
  goerli_slippageUpdates: InContextSdkMethod<Subscription['goerli_slippageUpdates'], Subscriptiongoerli_slippageUpdatesArgs, MeshContext>,
  /** null **/
  goerli_snapshotRoot: InContextSdkMethod<Subscription['goerli_snapshotRoot'], Subscriptiongoerli_snapshotRootArgs, MeshContext>,
  /** null **/
  goerli_snapshotRoots: InContextSdkMethod<Subscription['goerli_snapshotRoots'], Subscriptiongoerli_snapshotRootsArgs, MeshContext>,
  /** null **/
  goerli_spokeConnectorMode: InContextSdkMethod<Subscription['goerli_spokeConnectorMode'], Subscriptiongoerli_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  goerli_spokeConnectorModes: InContextSdkMethod<Subscription['goerli_spokeConnectorModes'], Subscriptiongoerli_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  goerli_aggregateRootProposed: InContextSdkMethod<Subscription['goerli_aggregateRootProposed'], Subscriptiongoerli_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  goerli_aggregateRootProposeds: InContextSdkMethod<Subscription['goerli_aggregateRootProposeds'], Subscriptiongoerli_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  goerli_optimisticRootFinalized: InContextSdkMethod<Subscription['goerli_optimisticRootFinalized'], Subscriptiongoerli_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  goerli_optimisticRootFinalizeds: InContextSdkMethod<Subscription['goerli_optimisticRootFinalizeds'], Subscriptiongoerli_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  goerli__meta: InContextSdkMethod<Subscription['goerli__meta'], Subscriptiongoerli__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Goerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
