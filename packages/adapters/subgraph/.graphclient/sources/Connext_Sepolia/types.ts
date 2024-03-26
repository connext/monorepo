// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextSepoliaTypes {
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
  sepolia_BigDecimal: any;
  BigInt: any;
  sepolia_Bytes: any;
  sepolia_Int8: any;
};

export type sepolia_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['sepolia_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type sepolia_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['sepolia_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type sepolia_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_AggregateRootProposed_filter>>>;
};

export type sepolia_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type sepolia_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  root_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_AggregateRoot_filter>>>;
};

export type sepolia_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type sepolia_Aggregation_interval =
  | 'hour'
  | 'day';

export type sepolia_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['sepolia_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['sepolia_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['sepolia_Bytes']>;
  localAsset?: Maybe<Scalars['sepolia_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<sepolia_AssetStatus>;
};

export type sepolia_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: sepolia_Router;
  asset: sepolia_Asset;
  feesEarned: Scalars['BigInt'];
};

export type sepolia_AssetBalance_filter = {
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
  router_?: InputMaybe<sepolia_Router_filter>;
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
  asset_?: InputMaybe<sepolia_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_AssetBalance_filter>>>;
};

export type sepolia_AssetBalance_orderBy =
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

export type sepolia_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type sepolia_AssetStatus_filter = {
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
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_AssetStatus_filter>>>;
};

export type sepolia_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type sepolia_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['sepolia_Bytes']>;
  key_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  key_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  key_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  key_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  key_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  key_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['sepolia_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['sepolia_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  localAsset?: InputMaybe<Scalars['sepolia_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  status_?: InputMaybe<sepolia_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_Asset_filter>>>;
};

export type sepolia_Asset_orderBy =
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

export type sepolia_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type sepolia_Block_height = {
  hash?: InputMaybe<Scalars['sepolia_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type sepolia_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['sepolia_Bytes']>;
  rootManager?: Maybe<Scalars['sepolia_Bytes']>;
  mirrorConnector?: Maybe<Scalars['sepolia_Bytes']>;
};

export type sepolia_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_ConnectorMeta_filter>>>;
};

export type sepolia_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type sepolia_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['sepolia_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<sepolia_TransferStatus>;
  routers?: Maybe<Array<sepolia_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['sepolia_Bytes']>;
  delegate?: Maybe<Scalars['sepolia_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['sepolia_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['sepolia_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['sepolia_Bytes']>;
  asset?: Maybe<sepolia_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['sepolia_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['sepolia_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['sepolia_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['sepolia_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['sepolia_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['sepolia_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type sepolia_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_Router_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_Router_filter>;
};

export type sepolia_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['sepolia_Bytes']>;
  transferId_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<sepolia_TransferStatus>;
  status_not?: InputMaybe<sepolia_TransferStatus>;
  status_in?: InputMaybe<Array<sepolia_TransferStatus>>;
  status_not_in?: InputMaybe<Array<sepolia_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<sepolia_Router_filter>;
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
  to?: InputMaybe<Scalars['sepolia_Bytes']>;
  to_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  to_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  to_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  to_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  to_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  to_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  delegate?: InputMaybe<Scalars['sepolia_Bytes']>;
  delegate_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['sepolia_Bytes']>;
  callData_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  callData_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  callData_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  callData_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  callData_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  originSender?: InputMaybe<Scalars['sepolia_Bytes']>;
  originSender_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['sepolia_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  asset_?: InputMaybe<sepolia_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['sepolia_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['sepolia_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['sepolia_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['sepolia_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['sepolia_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['sepolia_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_DestinationTransfer_filter>>>;
};

export type sepolia_DestinationTransfer_orderBy =
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

export type sepolia_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['sepolia_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type sepolia_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_OptimisticRootFinalized_filter>>>;
};

export type sepolia_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type sepolia_OrderDirection =
  | 'asc'
  | 'desc';

export type sepolia_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['sepolia_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['sepolia_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['sepolia_Bytes']>;
  root?: Maybe<Scalars['sepolia_Bytes']>;
  transactionHash?: Maybe<Scalars['sepolia_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<sepolia_RootCount>;
};

export type sepolia_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['sepolia_Bytes']>;
  transferId_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['sepolia_Bytes']>;
  leaf_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['sepolia_Bytes']>;
  message_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  message_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  message_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  message_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  message_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  message_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  root?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  root_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  rootCount_?: InputMaybe<sepolia_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_OriginMessage_filter>>>;
};

export type sepolia_OriginMessage_orderBy =
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

export type sepolia_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['sepolia_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<sepolia_TransferStatus>;
  messageHash?: Maybe<Scalars['sepolia_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['sepolia_Bytes']>;
  delegate?: Maybe<Scalars['sepolia_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['sepolia_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['sepolia_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['sepolia_Bytes']>;
  asset?: Maybe<sepolia_Asset>;
  transactingAsset?: Maybe<Scalars['sepolia_Bytes']>;
  message?: Maybe<sepolia_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<sepolia_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['sepolia_Bytes']>;
  caller?: Maybe<Scalars['sepolia_Bytes']>;
  transactionHash?: Maybe<Scalars['sepolia_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['sepolia_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type sepolia_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_RelayerFee_filter>;
};

export type sepolia_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['sepolia_Bytes']>;
  transferId_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<sepolia_TransferStatus>;
  status_not?: InputMaybe<sepolia_TransferStatus>;
  status_in?: InputMaybe<Array<sepolia_TransferStatus>>;
  status_not_in?: InputMaybe<Array<sepolia_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['sepolia_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  to?: InputMaybe<Scalars['sepolia_Bytes']>;
  to_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  to_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  to_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  to_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  to_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  to_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  delegate?: InputMaybe<Scalars['sepolia_Bytes']>;
  delegate_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['sepolia_Bytes']>;
  callData_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  callData_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  callData_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  callData_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  callData_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['sepolia_Bytes']>;
  originSender_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['sepolia_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  asset_?: InputMaybe<sepolia_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  message_?: InputMaybe<sepolia_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<sepolia_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['sepolia_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['sepolia_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_OriginTransfer_filter>>>;
};

export type sepolia_OriginTransfer_orderBy =
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
  sepolia_asset?: Maybe<sepolia_Asset>;
  sepolia_assets: Array<sepolia_Asset>;
  sepolia_assetStatus?: Maybe<sepolia_AssetStatus>;
  sepolia_assetStatuses: Array<sepolia_AssetStatus>;
  sepolia_assetBalance?: Maybe<sepolia_AssetBalance>;
  sepolia_assetBalances: Array<sepolia_AssetBalance>;
  sepolia_router?: Maybe<sepolia_Router>;
  sepolia_routers: Array<sepolia_Router>;
  sepolia_routerDailyTVL?: Maybe<sepolia_RouterDailyTVL>;
  sepolia_routerDailyTVLs: Array<sepolia_RouterDailyTVL>;
  sepolia_routerLiquidityEvent?: Maybe<sepolia_RouterLiquidityEvent>;
  sepolia_routerLiquidityEvents: Array<sepolia_RouterLiquidityEvent>;
  sepolia_setting?: Maybe<sepolia_Setting>;
  sepolia_settings: Array<sepolia_Setting>;
  sepolia_relayer?: Maybe<sepolia_Relayer>;
  sepolia_relayers: Array<sepolia_Relayer>;
  sepolia_sequencer?: Maybe<sepolia_Sequencer>;
  sepolia_sequencers: Array<sepolia_Sequencer>;
  sepolia_relayerFee?: Maybe<sepolia_RelayerFee>;
  sepolia_relayerFees: Array<sepolia_RelayerFee>;
  sepolia_originTransfer?: Maybe<sepolia_OriginTransfer>;
  sepolia_originTransfers: Array<sepolia_OriginTransfer>;
  sepolia_destinationTransfer?: Maybe<sepolia_DestinationTransfer>;
  sepolia_destinationTransfers: Array<sepolia_DestinationTransfer>;
  sepolia_originMessage?: Maybe<sepolia_OriginMessage>;
  sepolia_originMessages: Array<sepolia_OriginMessage>;
  sepolia_aggregateRoot?: Maybe<sepolia_AggregateRoot>;
  sepolia_aggregateRoots: Array<sepolia_AggregateRoot>;
  sepolia_connectorMeta?: Maybe<sepolia_ConnectorMeta>;
  sepolia_connectorMetas: Array<sepolia_ConnectorMeta>;
  sepolia_rootCount?: Maybe<sepolia_RootCount>;
  sepolia_rootCounts: Array<sepolia_RootCount>;
  sepolia_rootMessageSent?: Maybe<sepolia_RootMessageSent>;
  sepolia_rootMessageSents: Array<sepolia_RootMessageSent>;
  sepolia_relayerFeesIncrease?: Maybe<sepolia_RelayerFeesIncrease>;
  sepolia_relayerFeesIncreases: Array<sepolia_RelayerFeesIncrease>;
  sepolia_slippageUpdate?: Maybe<sepolia_SlippageUpdate>;
  sepolia_slippageUpdates: Array<sepolia_SlippageUpdate>;
  sepolia_snapshotRoot?: Maybe<sepolia_SnapshotRoot>;
  sepolia_snapshotRoots: Array<sepolia_SnapshotRoot>;
  sepolia_spokeConnectorMode?: Maybe<sepolia_SpokeConnectorMode>;
  sepolia_spokeConnectorModes: Array<sepolia_SpokeConnectorMode>;
  sepolia_aggregateRootProposed?: Maybe<sepolia_AggregateRootProposed>;
  sepolia_aggregateRootProposeds: Array<sepolia_AggregateRootProposed>;
  sepolia_optimisticRootFinalized?: Maybe<sepolia_OptimisticRootFinalized>;
  sepolia_optimisticRootFinalizeds: Array<sepolia_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  sepolia__meta?: Maybe<sepolia__Meta_>;
};


export type Querysepolia_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_Asset_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_Asset_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_AssetStatus_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_AssetBalance_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_Router_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_Router_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_RouterDailyTVL_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_RouterLiquidityEvent_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_Setting_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_Setting_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_Relayer_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_Relayer_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_Sequencer_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_Sequencer_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_RelayerFee_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_OriginTransfer_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_DestinationTransfer_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_OriginMessage_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_AggregateRoot_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_ConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_RootCount_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_RootCount_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_RootMessageSent_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_RelayerFeesIncrease_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_SlippageUpdate_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_SnapshotRoot_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_SpokeConnectorMode_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_AggregateRootProposed_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_OptimisticRootFinalized_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia__metaArgs = {
  block?: InputMaybe<sepolia_Block_height>;
};

export type sepolia_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['sepolia_Bytes']>;
};

export type sepolia_RelayerFee = {
  id: Scalars['ID'];
  transfer: sepolia_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['sepolia_Bytes'];
};

export type sepolia_RelayerFee_filter = {
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
  transfer_?: InputMaybe<sepolia_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['sepolia_Bytes']>;
  asset_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  asset_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  asset_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  asset_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  asset_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_RelayerFee_filter>>>;
};

export type sepolia_RelayerFee_orderBy =
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

export type sepolia_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: sepolia_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['sepolia_Bytes']>;
  caller: Scalars['sepolia_Bytes'];
  transactionHash: Scalars['sepolia_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type sepolia_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<sepolia_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['sepolia_Bytes']>;
  asset_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  asset_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  asset_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  asset_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  asset_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_RelayerFeesIncrease_filter>>>;
};

export type sepolia_RelayerFeesIncrease_orderBy =
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

export type sepolia_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['sepolia_Bytes']>;
  relayer_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_Relayer_filter>>>;
};

export type sepolia_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type sepolia_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type sepolia_RootCount_filter = {
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
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_RootCount_filter>>>;
};

export type sepolia_RootCount_orderBy =
  | 'id'
  | 'count';

export type sepolia_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['sepolia_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['sepolia_Bytes']>;
  transactionHash?: Maybe<Scalars['sepolia_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type sepolia_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  root_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_RootMessageSent_filter>>>;
};

export type sepolia_RootMessageSent_orderBy =
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

export type sepolia_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['sepolia_Bytes']>;
  recipient?: Maybe<Scalars['sepolia_Bytes']>;
  proposedOwner?: Maybe<Scalars['sepolia_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<sepolia_AssetBalance>;
};


export type sepolia_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_AssetBalance_filter>;
};

export type sepolia_RouterDailyTVL = {
  id: Scalars['ID'];
  router: sepolia_Router;
  asset: sepolia_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type sepolia_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<sepolia_Router_filter>;
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
  asset_?: InputMaybe<sepolia_Asset_filter>;
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
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_RouterDailyTVL_filter>>>;
};

export type sepolia_RouterDailyTVL_orderBy =
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

export type sepolia_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<sepolia_RouterLiquidityEventType>;
  router: sepolia_Router;
  asset: sepolia_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['sepolia_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['sepolia_Bytes'];
  nonce: Scalars['BigInt'];
};

export type sepolia_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type sepolia_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<sepolia_RouterLiquidityEventType>;
  type_not?: InputMaybe<sepolia_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<sepolia_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<sepolia_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<sepolia_Router_filter>;
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
  asset_?: InputMaybe<sepolia_Asset_filter>;
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
  caller?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_RouterLiquidityEvent_filter>>>;
};

export type sepolia_RouterLiquidityEvent_orderBy =
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

export type sepolia_Router_filter = {
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
  owner?: InputMaybe<Scalars['sepolia_Bytes']>;
  owner_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  owner_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  owner_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  owner_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  owner_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  recipient?: InputMaybe<Scalars['sepolia_Bytes']>;
  recipient_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['sepolia_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<sepolia_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_Router_filter>>>;
};

export type sepolia_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type sepolia_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['sepolia_Bytes']>;
};

export type sepolia_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['sepolia_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_Sequencer_filter>>>;
};

export type sepolia_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type sepolia_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['sepolia_Bytes'];
};

export type sepolia_Setting_filter = {
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
  caller?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_Setting_filter>>>;
};

export type sepolia_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type sepolia_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: sepolia_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['sepolia_Bytes'];
  transactionHash: Scalars['sepolia_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type sepolia_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<sepolia_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_SlippageUpdate_filter>>>;
};

export type sepolia_SlippageUpdate_orderBy =
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

export type sepolia_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['sepolia_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type sepolia_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  root_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_SnapshotRoot_filter>>>;
};

export type sepolia_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type sepolia_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type sepolia_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_SpokeConnectorMode_filter>>>;
};

export type sepolia_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  sepolia_asset?: Maybe<sepolia_Asset>;
  sepolia_assets: Array<sepolia_Asset>;
  sepolia_assetStatus?: Maybe<sepolia_AssetStatus>;
  sepolia_assetStatuses: Array<sepolia_AssetStatus>;
  sepolia_assetBalance?: Maybe<sepolia_AssetBalance>;
  sepolia_assetBalances: Array<sepolia_AssetBalance>;
  sepolia_router?: Maybe<sepolia_Router>;
  sepolia_routers: Array<sepolia_Router>;
  sepolia_routerDailyTVL?: Maybe<sepolia_RouterDailyTVL>;
  sepolia_routerDailyTVLs: Array<sepolia_RouterDailyTVL>;
  sepolia_routerLiquidityEvent?: Maybe<sepolia_RouterLiquidityEvent>;
  sepolia_routerLiquidityEvents: Array<sepolia_RouterLiquidityEvent>;
  sepolia_setting?: Maybe<sepolia_Setting>;
  sepolia_settings: Array<sepolia_Setting>;
  sepolia_relayer?: Maybe<sepolia_Relayer>;
  sepolia_relayers: Array<sepolia_Relayer>;
  sepolia_sequencer?: Maybe<sepolia_Sequencer>;
  sepolia_sequencers: Array<sepolia_Sequencer>;
  sepolia_relayerFee?: Maybe<sepolia_RelayerFee>;
  sepolia_relayerFees: Array<sepolia_RelayerFee>;
  sepolia_originTransfer?: Maybe<sepolia_OriginTransfer>;
  sepolia_originTransfers: Array<sepolia_OriginTransfer>;
  sepolia_destinationTransfer?: Maybe<sepolia_DestinationTransfer>;
  sepolia_destinationTransfers: Array<sepolia_DestinationTransfer>;
  sepolia_originMessage?: Maybe<sepolia_OriginMessage>;
  sepolia_originMessages: Array<sepolia_OriginMessage>;
  sepolia_aggregateRoot?: Maybe<sepolia_AggregateRoot>;
  sepolia_aggregateRoots: Array<sepolia_AggregateRoot>;
  sepolia_connectorMeta?: Maybe<sepolia_ConnectorMeta>;
  sepolia_connectorMetas: Array<sepolia_ConnectorMeta>;
  sepolia_rootCount?: Maybe<sepolia_RootCount>;
  sepolia_rootCounts: Array<sepolia_RootCount>;
  sepolia_rootMessageSent?: Maybe<sepolia_RootMessageSent>;
  sepolia_rootMessageSents: Array<sepolia_RootMessageSent>;
  sepolia_relayerFeesIncrease?: Maybe<sepolia_RelayerFeesIncrease>;
  sepolia_relayerFeesIncreases: Array<sepolia_RelayerFeesIncrease>;
  sepolia_slippageUpdate?: Maybe<sepolia_SlippageUpdate>;
  sepolia_slippageUpdates: Array<sepolia_SlippageUpdate>;
  sepolia_snapshotRoot?: Maybe<sepolia_SnapshotRoot>;
  sepolia_snapshotRoots: Array<sepolia_SnapshotRoot>;
  sepolia_spokeConnectorMode?: Maybe<sepolia_SpokeConnectorMode>;
  sepolia_spokeConnectorModes: Array<sepolia_SpokeConnectorMode>;
  sepolia_aggregateRootProposed?: Maybe<sepolia_AggregateRootProposed>;
  sepolia_aggregateRootProposeds: Array<sepolia_AggregateRootProposed>;
  sepolia_optimisticRootFinalized?: Maybe<sepolia_OptimisticRootFinalized>;
  sepolia_optimisticRootFinalizeds: Array<sepolia_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  sepolia__meta?: Maybe<sepolia__Meta_>;
};


export type Subscriptionsepolia_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_Asset_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_Asset_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_AssetStatus_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_AssetBalance_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_Router_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_Router_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_RouterDailyTVL_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_RouterLiquidityEvent_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_Setting_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_Setting_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_Relayer_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_Relayer_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_Sequencer_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_Sequencer_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_RelayerFee_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_OriginTransfer_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_DestinationTransfer_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_OriginMessage_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_AggregateRoot_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_ConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_RootCount_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_RootCount_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_RootMessageSent_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_RelayerFeesIncrease_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_SlippageUpdate_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_SnapshotRoot_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_SpokeConnectorMode_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_AggregateRootProposed_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_OptimisticRootFinalized_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia__metaArgs = {
  block?: InputMaybe<sepolia_Block_height>;
};

export type sepolia_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type sepolia__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['sepolia_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['sepolia_Bytes']>;
};

/** The type for the top-level _meta field */
export type sepolia__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: sepolia__Block_;
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
  sepolia_asset: InContextSdkMethod<Query['sepolia_asset'], Querysepolia_assetArgs, MeshContext>,
  /** null **/
  sepolia_assets: InContextSdkMethod<Query['sepolia_assets'], Querysepolia_assetsArgs, MeshContext>,
  /** null **/
  sepolia_assetStatus: InContextSdkMethod<Query['sepolia_assetStatus'], Querysepolia_assetStatusArgs, MeshContext>,
  /** null **/
  sepolia_assetStatuses: InContextSdkMethod<Query['sepolia_assetStatuses'], Querysepolia_assetStatusesArgs, MeshContext>,
  /** null **/
  sepolia_assetBalance: InContextSdkMethod<Query['sepolia_assetBalance'], Querysepolia_assetBalanceArgs, MeshContext>,
  /** null **/
  sepolia_assetBalances: InContextSdkMethod<Query['sepolia_assetBalances'], Querysepolia_assetBalancesArgs, MeshContext>,
  /** null **/
  sepolia_router: InContextSdkMethod<Query['sepolia_router'], Querysepolia_routerArgs, MeshContext>,
  /** null **/
  sepolia_routers: InContextSdkMethod<Query['sepolia_routers'], Querysepolia_routersArgs, MeshContext>,
  /** null **/
  sepolia_routerDailyTVL: InContextSdkMethod<Query['sepolia_routerDailyTVL'], Querysepolia_routerDailyTVLArgs, MeshContext>,
  /** null **/
  sepolia_routerDailyTVLs: InContextSdkMethod<Query['sepolia_routerDailyTVLs'], Querysepolia_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  sepolia_routerLiquidityEvent: InContextSdkMethod<Query['sepolia_routerLiquidityEvent'], Querysepolia_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  sepolia_routerLiquidityEvents: InContextSdkMethod<Query['sepolia_routerLiquidityEvents'], Querysepolia_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  sepolia_setting: InContextSdkMethod<Query['sepolia_setting'], Querysepolia_settingArgs, MeshContext>,
  /** null **/
  sepolia_settings: InContextSdkMethod<Query['sepolia_settings'], Querysepolia_settingsArgs, MeshContext>,
  /** null **/
  sepolia_relayer: InContextSdkMethod<Query['sepolia_relayer'], Querysepolia_relayerArgs, MeshContext>,
  /** null **/
  sepolia_relayers: InContextSdkMethod<Query['sepolia_relayers'], Querysepolia_relayersArgs, MeshContext>,
  /** null **/
  sepolia_sequencer: InContextSdkMethod<Query['sepolia_sequencer'], Querysepolia_sequencerArgs, MeshContext>,
  /** null **/
  sepolia_sequencers: InContextSdkMethod<Query['sepolia_sequencers'], Querysepolia_sequencersArgs, MeshContext>,
  /** null **/
  sepolia_relayerFee: InContextSdkMethod<Query['sepolia_relayerFee'], Querysepolia_relayerFeeArgs, MeshContext>,
  /** null **/
  sepolia_relayerFees: InContextSdkMethod<Query['sepolia_relayerFees'], Querysepolia_relayerFeesArgs, MeshContext>,
  /** null **/
  sepolia_originTransfer: InContextSdkMethod<Query['sepolia_originTransfer'], Querysepolia_originTransferArgs, MeshContext>,
  /** null **/
  sepolia_originTransfers: InContextSdkMethod<Query['sepolia_originTransfers'], Querysepolia_originTransfersArgs, MeshContext>,
  /** null **/
  sepolia_destinationTransfer: InContextSdkMethod<Query['sepolia_destinationTransfer'], Querysepolia_destinationTransferArgs, MeshContext>,
  /** null **/
  sepolia_destinationTransfers: InContextSdkMethod<Query['sepolia_destinationTransfers'], Querysepolia_destinationTransfersArgs, MeshContext>,
  /** null **/
  sepolia_originMessage: InContextSdkMethod<Query['sepolia_originMessage'], Querysepolia_originMessageArgs, MeshContext>,
  /** null **/
  sepolia_originMessages: InContextSdkMethod<Query['sepolia_originMessages'], Querysepolia_originMessagesArgs, MeshContext>,
  /** null **/
  sepolia_aggregateRoot: InContextSdkMethod<Query['sepolia_aggregateRoot'], Querysepolia_aggregateRootArgs, MeshContext>,
  /** null **/
  sepolia_aggregateRoots: InContextSdkMethod<Query['sepolia_aggregateRoots'], Querysepolia_aggregateRootsArgs, MeshContext>,
  /** null **/
  sepolia_connectorMeta: InContextSdkMethod<Query['sepolia_connectorMeta'], Querysepolia_connectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_connectorMetas: InContextSdkMethod<Query['sepolia_connectorMetas'], Querysepolia_connectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_rootCount: InContextSdkMethod<Query['sepolia_rootCount'], Querysepolia_rootCountArgs, MeshContext>,
  /** null **/
  sepolia_rootCounts: InContextSdkMethod<Query['sepolia_rootCounts'], Querysepolia_rootCountsArgs, MeshContext>,
  /** null **/
  sepolia_rootMessageSent: InContextSdkMethod<Query['sepolia_rootMessageSent'], Querysepolia_rootMessageSentArgs, MeshContext>,
  /** null **/
  sepolia_rootMessageSents: InContextSdkMethod<Query['sepolia_rootMessageSents'], Querysepolia_rootMessageSentsArgs, MeshContext>,
  /** null **/
  sepolia_relayerFeesIncrease: InContextSdkMethod<Query['sepolia_relayerFeesIncrease'], Querysepolia_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  sepolia_relayerFeesIncreases: InContextSdkMethod<Query['sepolia_relayerFeesIncreases'], Querysepolia_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  sepolia_slippageUpdate: InContextSdkMethod<Query['sepolia_slippageUpdate'], Querysepolia_slippageUpdateArgs, MeshContext>,
  /** null **/
  sepolia_slippageUpdates: InContextSdkMethod<Query['sepolia_slippageUpdates'], Querysepolia_slippageUpdatesArgs, MeshContext>,
  /** null **/
  sepolia_snapshotRoot: InContextSdkMethod<Query['sepolia_snapshotRoot'], Querysepolia_snapshotRootArgs, MeshContext>,
  /** null **/
  sepolia_snapshotRoots: InContextSdkMethod<Query['sepolia_snapshotRoots'], Querysepolia_snapshotRootsArgs, MeshContext>,
  /** null **/
  sepolia_spokeConnectorMode: InContextSdkMethod<Query['sepolia_spokeConnectorMode'], Querysepolia_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  sepolia_spokeConnectorModes: InContextSdkMethod<Query['sepolia_spokeConnectorModes'], Querysepolia_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  sepolia_aggregateRootProposed: InContextSdkMethod<Query['sepolia_aggregateRootProposed'], Querysepolia_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  sepolia_aggregateRootProposeds: InContextSdkMethod<Query['sepolia_aggregateRootProposeds'], Querysepolia_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  sepolia_optimisticRootFinalized: InContextSdkMethod<Query['sepolia_optimisticRootFinalized'], Querysepolia_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  sepolia_optimisticRootFinalizeds: InContextSdkMethod<Query['sepolia_optimisticRootFinalizeds'], Querysepolia_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  sepolia__meta: InContextSdkMethod<Query['sepolia__meta'], Querysepolia__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  sepolia_asset: InContextSdkMethod<Subscription['sepolia_asset'], Subscriptionsepolia_assetArgs, MeshContext>,
  /** null **/
  sepolia_assets: InContextSdkMethod<Subscription['sepolia_assets'], Subscriptionsepolia_assetsArgs, MeshContext>,
  /** null **/
  sepolia_assetStatus: InContextSdkMethod<Subscription['sepolia_assetStatus'], Subscriptionsepolia_assetStatusArgs, MeshContext>,
  /** null **/
  sepolia_assetStatuses: InContextSdkMethod<Subscription['sepolia_assetStatuses'], Subscriptionsepolia_assetStatusesArgs, MeshContext>,
  /** null **/
  sepolia_assetBalance: InContextSdkMethod<Subscription['sepolia_assetBalance'], Subscriptionsepolia_assetBalanceArgs, MeshContext>,
  /** null **/
  sepolia_assetBalances: InContextSdkMethod<Subscription['sepolia_assetBalances'], Subscriptionsepolia_assetBalancesArgs, MeshContext>,
  /** null **/
  sepolia_router: InContextSdkMethod<Subscription['sepolia_router'], Subscriptionsepolia_routerArgs, MeshContext>,
  /** null **/
  sepolia_routers: InContextSdkMethod<Subscription['sepolia_routers'], Subscriptionsepolia_routersArgs, MeshContext>,
  /** null **/
  sepolia_routerDailyTVL: InContextSdkMethod<Subscription['sepolia_routerDailyTVL'], Subscriptionsepolia_routerDailyTVLArgs, MeshContext>,
  /** null **/
  sepolia_routerDailyTVLs: InContextSdkMethod<Subscription['sepolia_routerDailyTVLs'], Subscriptionsepolia_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  sepolia_routerLiquidityEvent: InContextSdkMethod<Subscription['sepolia_routerLiquidityEvent'], Subscriptionsepolia_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  sepolia_routerLiquidityEvents: InContextSdkMethod<Subscription['sepolia_routerLiquidityEvents'], Subscriptionsepolia_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  sepolia_setting: InContextSdkMethod<Subscription['sepolia_setting'], Subscriptionsepolia_settingArgs, MeshContext>,
  /** null **/
  sepolia_settings: InContextSdkMethod<Subscription['sepolia_settings'], Subscriptionsepolia_settingsArgs, MeshContext>,
  /** null **/
  sepolia_relayer: InContextSdkMethod<Subscription['sepolia_relayer'], Subscriptionsepolia_relayerArgs, MeshContext>,
  /** null **/
  sepolia_relayers: InContextSdkMethod<Subscription['sepolia_relayers'], Subscriptionsepolia_relayersArgs, MeshContext>,
  /** null **/
  sepolia_sequencer: InContextSdkMethod<Subscription['sepolia_sequencer'], Subscriptionsepolia_sequencerArgs, MeshContext>,
  /** null **/
  sepolia_sequencers: InContextSdkMethod<Subscription['sepolia_sequencers'], Subscriptionsepolia_sequencersArgs, MeshContext>,
  /** null **/
  sepolia_relayerFee: InContextSdkMethod<Subscription['sepolia_relayerFee'], Subscriptionsepolia_relayerFeeArgs, MeshContext>,
  /** null **/
  sepolia_relayerFees: InContextSdkMethod<Subscription['sepolia_relayerFees'], Subscriptionsepolia_relayerFeesArgs, MeshContext>,
  /** null **/
  sepolia_originTransfer: InContextSdkMethod<Subscription['sepolia_originTransfer'], Subscriptionsepolia_originTransferArgs, MeshContext>,
  /** null **/
  sepolia_originTransfers: InContextSdkMethod<Subscription['sepolia_originTransfers'], Subscriptionsepolia_originTransfersArgs, MeshContext>,
  /** null **/
  sepolia_destinationTransfer: InContextSdkMethod<Subscription['sepolia_destinationTransfer'], Subscriptionsepolia_destinationTransferArgs, MeshContext>,
  /** null **/
  sepolia_destinationTransfers: InContextSdkMethod<Subscription['sepolia_destinationTransfers'], Subscriptionsepolia_destinationTransfersArgs, MeshContext>,
  /** null **/
  sepolia_originMessage: InContextSdkMethod<Subscription['sepolia_originMessage'], Subscriptionsepolia_originMessageArgs, MeshContext>,
  /** null **/
  sepolia_originMessages: InContextSdkMethod<Subscription['sepolia_originMessages'], Subscriptionsepolia_originMessagesArgs, MeshContext>,
  /** null **/
  sepolia_aggregateRoot: InContextSdkMethod<Subscription['sepolia_aggregateRoot'], Subscriptionsepolia_aggregateRootArgs, MeshContext>,
  /** null **/
  sepolia_aggregateRoots: InContextSdkMethod<Subscription['sepolia_aggregateRoots'], Subscriptionsepolia_aggregateRootsArgs, MeshContext>,
  /** null **/
  sepolia_connectorMeta: InContextSdkMethod<Subscription['sepolia_connectorMeta'], Subscriptionsepolia_connectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_connectorMetas: InContextSdkMethod<Subscription['sepolia_connectorMetas'], Subscriptionsepolia_connectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_rootCount: InContextSdkMethod<Subscription['sepolia_rootCount'], Subscriptionsepolia_rootCountArgs, MeshContext>,
  /** null **/
  sepolia_rootCounts: InContextSdkMethod<Subscription['sepolia_rootCounts'], Subscriptionsepolia_rootCountsArgs, MeshContext>,
  /** null **/
  sepolia_rootMessageSent: InContextSdkMethod<Subscription['sepolia_rootMessageSent'], Subscriptionsepolia_rootMessageSentArgs, MeshContext>,
  /** null **/
  sepolia_rootMessageSents: InContextSdkMethod<Subscription['sepolia_rootMessageSents'], Subscriptionsepolia_rootMessageSentsArgs, MeshContext>,
  /** null **/
  sepolia_relayerFeesIncrease: InContextSdkMethod<Subscription['sepolia_relayerFeesIncrease'], Subscriptionsepolia_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  sepolia_relayerFeesIncreases: InContextSdkMethod<Subscription['sepolia_relayerFeesIncreases'], Subscriptionsepolia_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  sepolia_slippageUpdate: InContextSdkMethod<Subscription['sepolia_slippageUpdate'], Subscriptionsepolia_slippageUpdateArgs, MeshContext>,
  /** null **/
  sepolia_slippageUpdates: InContextSdkMethod<Subscription['sepolia_slippageUpdates'], Subscriptionsepolia_slippageUpdatesArgs, MeshContext>,
  /** null **/
  sepolia_snapshotRoot: InContextSdkMethod<Subscription['sepolia_snapshotRoot'], Subscriptionsepolia_snapshotRootArgs, MeshContext>,
  /** null **/
  sepolia_snapshotRoots: InContextSdkMethod<Subscription['sepolia_snapshotRoots'], Subscriptionsepolia_snapshotRootsArgs, MeshContext>,
  /** null **/
  sepolia_spokeConnectorMode: InContextSdkMethod<Subscription['sepolia_spokeConnectorMode'], Subscriptionsepolia_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  sepolia_spokeConnectorModes: InContextSdkMethod<Subscription['sepolia_spokeConnectorModes'], Subscriptionsepolia_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  sepolia_aggregateRootProposed: InContextSdkMethod<Subscription['sepolia_aggregateRootProposed'], Subscriptionsepolia_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  sepolia_aggregateRootProposeds: InContextSdkMethod<Subscription['sepolia_aggregateRootProposeds'], Subscriptionsepolia_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  sepolia_optimisticRootFinalized: InContextSdkMethod<Subscription['sepolia_optimisticRootFinalized'], Subscriptionsepolia_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  sepolia_optimisticRootFinalizeds: InContextSdkMethod<Subscription['sepolia_optimisticRootFinalizeds'], Subscriptionsepolia_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  sepolia__meta: InContextSdkMethod<Subscription['sepolia__meta'], Subscriptionsepolia__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Sepolia"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
