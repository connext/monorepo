// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextMumbaiTypes {
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
  mumbai_BigDecimal: any;
  BigInt: any;
  mumbai_Bytes: any;
  mumbai_Int8: any;
};

export type mumbai_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['mumbai_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type mumbai_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['mumbai_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type mumbai_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['mumbai_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mumbai_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mumbai_AggregateRootProposed_filter>>>;
};

export type mumbai_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type mumbai_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mumbai_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mumbai_AggregateRoot_filter>>>;
};

export type mumbai_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type mumbai_Aggregation_interval =
  | 'hour'
  | 'day';

export type mumbai_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['mumbai_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['mumbai_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['mumbai_Bytes']>;
  localAsset?: Maybe<Scalars['mumbai_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<mumbai_AssetStatus>;
};

export type mumbai_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: mumbai_Router;
  asset: mumbai_Asset;
  feesEarned: Scalars['BigInt'];
};

export type mumbai_AssetBalance_filter = {
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
  router_?: InputMaybe<mumbai_Router_filter>;
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
  asset_?: InputMaybe<mumbai_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mumbai_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mumbai_AssetBalance_filter>>>;
};

export type mumbai_AssetBalance_orderBy =
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

export type mumbai_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type mumbai_AssetStatus_filter = {
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
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mumbai_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mumbai_AssetStatus_filter>>>;
};

export type mumbai_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type mumbai_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['mumbai_Bytes']>;
  key_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  key_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  key_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  key_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  key_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  key_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['mumbai_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  localAsset?: InputMaybe<Scalars['mumbai_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  status_?: InputMaybe<mumbai_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mumbai_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mumbai_Asset_filter>>>;
};

export type mumbai_Asset_orderBy =
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

export type mumbai_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type mumbai_Block_height = {
  hash?: InputMaybe<Scalars['mumbai_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type mumbai_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['mumbai_Bytes']>;
  rootManager?: Maybe<Scalars['mumbai_Bytes']>;
  mirrorConnector?: Maybe<Scalars['mumbai_Bytes']>;
};

export type mumbai_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['mumbai_Bytes']>;
  amb_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  amb_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  amb_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  amb_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  amb_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  rootManager?: InputMaybe<Scalars['mumbai_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['mumbai_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mumbai_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mumbai_ConnectorMeta_filter>>>;
};

export type mumbai_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type mumbai_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['mumbai_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<mumbai_TransferStatus>;
  routers?: Maybe<Array<mumbai_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['mumbai_Bytes']>;
  delegate?: Maybe<Scalars['mumbai_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['mumbai_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['mumbai_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['mumbai_Bytes']>;
  asset?: Maybe<mumbai_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['mumbai_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['mumbai_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['mumbai_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['mumbai_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['mumbai_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['mumbai_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type mumbai_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_Router_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_Router_filter>;
};

export type mumbai_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<mumbai_TransferStatus>;
  status_not?: InputMaybe<mumbai_TransferStatus>;
  status_in?: InputMaybe<Array<mumbai_TransferStatus>>;
  status_not_in?: InputMaybe<Array<mumbai_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<mumbai_Router_filter>;
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
  to?: InputMaybe<Scalars['mumbai_Bytes']>;
  to_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  to_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  to_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  to_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  to_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  to_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  delegate?: InputMaybe<Scalars['mumbai_Bytes']>;
  delegate_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['mumbai_Bytes']>;
  callData_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  callData_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  callData_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  callData_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  callData_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  originSender?: InputMaybe<Scalars['mumbai_Bytes']>;
  originSender_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  asset_?: InputMaybe<mumbai_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mumbai_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mumbai_DestinationTransfer_filter>>>;
};

export type mumbai_DestinationTransfer_orderBy =
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

export type mumbai_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['mumbai_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type mumbai_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['mumbai_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mumbai_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mumbai_OptimisticRootFinalized_filter>>>;
};

export type mumbai_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type mumbai_OrderDirection =
  | 'asc'
  | 'desc';

export type mumbai_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['mumbai_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['mumbai_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['mumbai_Bytes']>;
  root?: Maybe<Scalars['mumbai_Bytes']>;
  transactionHash?: Maybe<Scalars['mumbai_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<mumbai_RootCount>;
};

export type mumbai_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['mumbai_Bytes']>;
  leaf_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['mumbai_Bytes']>;
  message_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  message_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  message_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  message_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  message_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  message_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  root?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  rootCount_?: InputMaybe<mumbai_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mumbai_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mumbai_OriginMessage_filter>>>;
};

export type mumbai_OriginMessage_orderBy =
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

export type mumbai_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['mumbai_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<mumbai_TransferStatus>;
  messageHash?: Maybe<Scalars['mumbai_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['mumbai_Bytes']>;
  delegate?: Maybe<Scalars['mumbai_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['mumbai_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['mumbai_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['mumbai_Bytes']>;
  asset?: Maybe<mumbai_Asset>;
  transactingAsset?: Maybe<Scalars['mumbai_Bytes']>;
  message?: Maybe<mumbai_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<mumbai_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['mumbai_Bytes']>;
  caller?: Maybe<Scalars['mumbai_Bytes']>;
  transactionHash?: Maybe<Scalars['mumbai_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['mumbai_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type mumbai_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_RelayerFee_filter>;
};

export type mumbai_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<mumbai_TransferStatus>;
  status_not?: InputMaybe<mumbai_TransferStatus>;
  status_in?: InputMaybe<Array<mumbai_TransferStatus>>;
  status_not_in?: InputMaybe<Array<mumbai_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['mumbai_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  to?: InputMaybe<Scalars['mumbai_Bytes']>;
  to_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  to_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  to_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  to_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  to_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  to_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  delegate?: InputMaybe<Scalars['mumbai_Bytes']>;
  delegate_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['mumbai_Bytes']>;
  callData_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  callData_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  callData_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  callData_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  callData_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['mumbai_Bytes']>;
  originSender_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  asset_?: InputMaybe<mumbai_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  message_?: InputMaybe<mumbai_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<mumbai_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['mumbai_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['mumbai_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mumbai_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mumbai_OriginTransfer_filter>>>;
};

export type mumbai_OriginTransfer_orderBy =
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
  mumbai_asset?: Maybe<mumbai_Asset>;
  mumbai_assets: Array<mumbai_Asset>;
  mumbai_assetStatus?: Maybe<mumbai_AssetStatus>;
  mumbai_assetStatuses: Array<mumbai_AssetStatus>;
  mumbai_assetBalance?: Maybe<mumbai_AssetBalance>;
  mumbai_assetBalances: Array<mumbai_AssetBalance>;
  mumbai_router?: Maybe<mumbai_Router>;
  mumbai_routers: Array<mumbai_Router>;
  mumbai_routerDailyTVL?: Maybe<mumbai_RouterDailyTVL>;
  mumbai_routerDailyTVLs: Array<mumbai_RouterDailyTVL>;
  mumbai_routerLiquidityEvent?: Maybe<mumbai_RouterLiquidityEvent>;
  mumbai_routerLiquidityEvents: Array<mumbai_RouterLiquidityEvent>;
  mumbai_setting?: Maybe<mumbai_Setting>;
  mumbai_settings: Array<mumbai_Setting>;
  mumbai_relayer?: Maybe<mumbai_Relayer>;
  mumbai_relayers: Array<mumbai_Relayer>;
  mumbai_sequencer?: Maybe<mumbai_Sequencer>;
  mumbai_sequencers: Array<mumbai_Sequencer>;
  mumbai_relayerFee?: Maybe<mumbai_RelayerFee>;
  mumbai_relayerFees: Array<mumbai_RelayerFee>;
  mumbai_originTransfer?: Maybe<mumbai_OriginTransfer>;
  mumbai_originTransfers: Array<mumbai_OriginTransfer>;
  mumbai_destinationTransfer?: Maybe<mumbai_DestinationTransfer>;
  mumbai_destinationTransfers: Array<mumbai_DestinationTransfer>;
  mumbai_originMessage?: Maybe<mumbai_OriginMessage>;
  mumbai_originMessages: Array<mumbai_OriginMessage>;
  mumbai_aggregateRoot?: Maybe<mumbai_AggregateRoot>;
  mumbai_aggregateRoots: Array<mumbai_AggregateRoot>;
  mumbai_connectorMeta?: Maybe<mumbai_ConnectorMeta>;
  mumbai_connectorMetas: Array<mumbai_ConnectorMeta>;
  mumbai_rootCount?: Maybe<mumbai_RootCount>;
  mumbai_rootCounts: Array<mumbai_RootCount>;
  mumbai_rootMessageSent?: Maybe<mumbai_RootMessageSent>;
  mumbai_rootMessageSents: Array<mumbai_RootMessageSent>;
  mumbai_relayerFeesIncrease?: Maybe<mumbai_RelayerFeesIncrease>;
  mumbai_relayerFeesIncreases: Array<mumbai_RelayerFeesIncrease>;
  mumbai_slippageUpdate?: Maybe<mumbai_SlippageUpdate>;
  mumbai_slippageUpdates: Array<mumbai_SlippageUpdate>;
  mumbai_snapshotRoot?: Maybe<mumbai_SnapshotRoot>;
  mumbai_snapshotRoots: Array<mumbai_SnapshotRoot>;
  mumbai_spokeConnectorMode?: Maybe<mumbai_SpokeConnectorMode>;
  mumbai_spokeConnectorModes: Array<mumbai_SpokeConnectorMode>;
  mumbai_aggregateRootProposed?: Maybe<mumbai_AggregateRootProposed>;
  mumbai_aggregateRootProposeds: Array<mumbai_AggregateRootProposed>;
  mumbai_optimisticRootFinalized?: Maybe<mumbai_OptimisticRootFinalized>;
  mumbai_optimisticRootFinalizeds: Array<mumbai_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  mumbai__meta?: Maybe<mumbai__Meta_>;
};


export type Querymumbai_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_Asset_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_Asset_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_AssetStatus_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_AssetBalance_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_Router_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_Router_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_RouterDailyTVL_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_RouterLiquidityEvent_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_Setting_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_Setting_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_Relayer_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_Relayer_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_Sequencer_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_Sequencer_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_RelayerFee_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_OriginTransfer_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_DestinationTransfer_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_OriginMessage_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_AggregateRoot_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_ConnectorMeta_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_RootCount_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_RootCount_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_RootMessageSent_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_RelayerFeesIncrease_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_SlippageUpdate_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_SnapshotRoot_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_SpokeConnectorMode_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_AggregateRootProposed_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_OptimisticRootFinalized_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai__metaArgs = {
  block?: InputMaybe<mumbai_Block_height>;
};

export type mumbai_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['mumbai_Bytes']>;
};

export type mumbai_RelayerFee = {
  id: Scalars['ID'];
  transfer: mumbai_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['mumbai_Bytes'];
};

export type mumbai_RelayerFee_filter = {
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
  transfer_?: InputMaybe<mumbai_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['mumbai_Bytes']>;
  asset_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  asset_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  asset_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  asset_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  asset_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mumbai_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mumbai_RelayerFee_filter>>>;
};

export type mumbai_RelayerFee_orderBy =
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

export type mumbai_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: mumbai_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['mumbai_Bytes']>;
  caller: Scalars['mumbai_Bytes'];
  transactionHash: Scalars['mumbai_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type mumbai_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<mumbai_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['mumbai_Bytes']>;
  asset_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  asset_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  asset_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  asset_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  asset_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mumbai_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mumbai_RelayerFeesIncrease_filter>>>;
};

export type mumbai_RelayerFeesIncrease_orderBy =
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

export type mumbai_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['mumbai_Bytes']>;
  relayer_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mumbai_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mumbai_Relayer_filter>>>;
};

export type mumbai_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type mumbai_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type mumbai_RootCount_filter = {
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
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mumbai_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mumbai_RootCount_filter>>>;
};

export type mumbai_RootCount_orderBy =
  | 'id'
  | 'count';

export type mumbai_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['mumbai_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['mumbai_Bytes']>;
  transactionHash?: Maybe<Scalars['mumbai_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type mumbai_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mumbai_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mumbai_RootMessageSent_filter>>>;
};

export type mumbai_RootMessageSent_orderBy =
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

export type mumbai_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['mumbai_Bytes']>;
  recipient?: Maybe<Scalars['mumbai_Bytes']>;
  proposedOwner?: Maybe<Scalars['mumbai_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<mumbai_AssetBalance>;
};


export type mumbai_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_AssetBalance_filter>;
};

export type mumbai_RouterDailyTVL = {
  id: Scalars['ID'];
  router: mumbai_Router;
  asset: mumbai_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type mumbai_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<mumbai_Router_filter>;
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
  asset_?: InputMaybe<mumbai_Asset_filter>;
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
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mumbai_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mumbai_RouterDailyTVL_filter>>>;
};

export type mumbai_RouterDailyTVL_orderBy =
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

export type mumbai_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<mumbai_RouterLiquidityEventType>;
  router: mumbai_Router;
  asset: mumbai_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['mumbai_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['mumbai_Bytes'];
  nonce: Scalars['BigInt'];
};

export type mumbai_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type mumbai_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<mumbai_RouterLiquidityEventType>;
  type_not?: InputMaybe<mumbai_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<mumbai_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<mumbai_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<mumbai_Router_filter>;
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
  asset_?: InputMaybe<mumbai_Asset_filter>;
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
  caller?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mumbai_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mumbai_RouterLiquidityEvent_filter>>>;
};

export type mumbai_RouterLiquidityEvent_orderBy =
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

export type mumbai_Router_filter = {
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
  owner?: InputMaybe<Scalars['mumbai_Bytes']>;
  owner_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  owner_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  owner_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  owner_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  owner_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  recipient?: InputMaybe<Scalars['mumbai_Bytes']>;
  recipient_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['mumbai_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<mumbai_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mumbai_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mumbai_Router_filter>>>;
};

export type mumbai_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type mumbai_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['mumbai_Bytes']>;
};

export type mumbai_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['mumbai_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mumbai_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mumbai_Sequencer_filter>>>;
};

export type mumbai_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type mumbai_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['mumbai_Bytes'];
};

export type mumbai_Setting_filter = {
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
  caller?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mumbai_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mumbai_Setting_filter>>>;
};

export type mumbai_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type mumbai_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: mumbai_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['mumbai_Bytes'];
  transactionHash: Scalars['mumbai_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type mumbai_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<mumbai_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mumbai_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mumbai_SlippageUpdate_filter>>>;
};

export type mumbai_SlippageUpdate_orderBy =
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

export type mumbai_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['mumbai_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type mumbai_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mumbai_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mumbai_SnapshotRoot_filter>>>;
};

export type mumbai_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type mumbai_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type mumbai_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mumbai_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mumbai_SpokeConnectorMode_filter>>>;
};

export type mumbai_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  mumbai_asset?: Maybe<mumbai_Asset>;
  mumbai_assets: Array<mumbai_Asset>;
  mumbai_assetStatus?: Maybe<mumbai_AssetStatus>;
  mumbai_assetStatuses: Array<mumbai_AssetStatus>;
  mumbai_assetBalance?: Maybe<mumbai_AssetBalance>;
  mumbai_assetBalances: Array<mumbai_AssetBalance>;
  mumbai_router?: Maybe<mumbai_Router>;
  mumbai_routers: Array<mumbai_Router>;
  mumbai_routerDailyTVL?: Maybe<mumbai_RouterDailyTVL>;
  mumbai_routerDailyTVLs: Array<mumbai_RouterDailyTVL>;
  mumbai_routerLiquidityEvent?: Maybe<mumbai_RouterLiquidityEvent>;
  mumbai_routerLiquidityEvents: Array<mumbai_RouterLiquidityEvent>;
  mumbai_setting?: Maybe<mumbai_Setting>;
  mumbai_settings: Array<mumbai_Setting>;
  mumbai_relayer?: Maybe<mumbai_Relayer>;
  mumbai_relayers: Array<mumbai_Relayer>;
  mumbai_sequencer?: Maybe<mumbai_Sequencer>;
  mumbai_sequencers: Array<mumbai_Sequencer>;
  mumbai_relayerFee?: Maybe<mumbai_RelayerFee>;
  mumbai_relayerFees: Array<mumbai_RelayerFee>;
  mumbai_originTransfer?: Maybe<mumbai_OriginTransfer>;
  mumbai_originTransfers: Array<mumbai_OriginTransfer>;
  mumbai_destinationTransfer?: Maybe<mumbai_DestinationTransfer>;
  mumbai_destinationTransfers: Array<mumbai_DestinationTransfer>;
  mumbai_originMessage?: Maybe<mumbai_OriginMessage>;
  mumbai_originMessages: Array<mumbai_OriginMessage>;
  mumbai_aggregateRoot?: Maybe<mumbai_AggregateRoot>;
  mumbai_aggregateRoots: Array<mumbai_AggregateRoot>;
  mumbai_connectorMeta?: Maybe<mumbai_ConnectorMeta>;
  mumbai_connectorMetas: Array<mumbai_ConnectorMeta>;
  mumbai_rootCount?: Maybe<mumbai_RootCount>;
  mumbai_rootCounts: Array<mumbai_RootCount>;
  mumbai_rootMessageSent?: Maybe<mumbai_RootMessageSent>;
  mumbai_rootMessageSents: Array<mumbai_RootMessageSent>;
  mumbai_relayerFeesIncrease?: Maybe<mumbai_RelayerFeesIncrease>;
  mumbai_relayerFeesIncreases: Array<mumbai_RelayerFeesIncrease>;
  mumbai_slippageUpdate?: Maybe<mumbai_SlippageUpdate>;
  mumbai_slippageUpdates: Array<mumbai_SlippageUpdate>;
  mumbai_snapshotRoot?: Maybe<mumbai_SnapshotRoot>;
  mumbai_snapshotRoots: Array<mumbai_SnapshotRoot>;
  mumbai_spokeConnectorMode?: Maybe<mumbai_SpokeConnectorMode>;
  mumbai_spokeConnectorModes: Array<mumbai_SpokeConnectorMode>;
  mumbai_aggregateRootProposed?: Maybe<mumbai_AggregateRootProposed>;
  mumbai_aggregateRootProposeds: Array<mumbai_AggregateRootProposed>;
  mumbai_optimisticRootFinalized?: Maybe<mumbai_OptimisticRootFinalized>;
  mumbai_optimisticRootFinalizeds: Array<mumbai_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  mumbai__meta?: Maybe<mumbai__Meta_>;
};


export type Subscriptionmumbai_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_Asset_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_Asset_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_AssetStatus_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_AssetBalance_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_Router_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_Router_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_RouterDailyTVL_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_RouterLiquidityEvent_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_Setting_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_Setting_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_Relayer_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_Relayer_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_Sequencer_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_Sequencer_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_RelayerFee_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_OriginTransfer_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_DestinationTransfer_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_OriginMessage_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_AggregateRoot_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_ConnectorMeta_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_RootCount_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_RootCount_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_RootMessageSent_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_RelayerFeesIncrease_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_SlippageUpdate_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_SnapshotRoot_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_SpokeConnectorMode_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_AggregateRootProposed_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_OptimisticRootFinalized_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai__metaArgs = {
  block?: InputMaybe<mumbai_Block_height>;
};

export type mumbai_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type mumbai__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['mumbai_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type mumbai__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: mumbai__Block_;
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
  mumbai_asset: InContextSdkMethod<Query['mumbai_asset'], Querymumbai_assetArgs, MeshContext>,
  /** null **/
  mumbai_assets: InContextSdkMethod<Query['mumbai_assets'], Querymumbai_assetsArgs, MeshContext>,
  /** null **/
  mumbai_assetStatus: InContextSdkMethod<Query['mumbai_assetStatus'], Querymumbai_assetStatusArgs, MeshContext>,
  /** null **/
  mumbai_assetStatuses: InContextSdkMethod<Query['mumbai_assetStatuses'], Querymumbai_assetStatusesArgs, MeshContext>,
  /** null **/
  mumbai_assetBalance: InContextSdkMethod<Query['mumbai_assetBalance'], Querymumbai_assetBalanceArgs, MeshContext>,
  /** null **/
  mumbai_assetBalances: InContextSdkMethod<Query['mumbai_assetBalances'], Querymumbai_assetBalancesArgs, MeshContext>,
  /** null **/
  mumbai_router: InContextSdkMethod<Query['mumbai_router'], Querymumbai_routerArgs, MeshContext>,
  /** null **/
  mumbai_routers: InContextSdkMethod<Query['mumbai_routers'], Querymumbai_routersArgs, MeshContext>,
  /** null **/
  mumbai_routerDailyTVL: InContextSdkMethod<Query['mumbai_routerDailyTVL'], Querymumbai_routerDailyTVLArgs, MeshContext>,
  /** null **/
  mumbai_routerDailyTVLs: InContextSdkMethod<Query['mumbai_routerDailyTVLs'], Querymumbai_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  mumbai_routerLiquidityEvent: InContextSdkMethod<Query['mumbai_routerLiquidityEvent'], Querymumbai_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  mumbai_routerLiquidityEvents: InContextSdkMethod<Query['mumbai_routerLiquidityEvents'], Querymumbai_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  mumbai_setting: InContextSdkMethod<Query['mumbai_setting'], Querymumbai_settingArgs, MeshContext>,
  /** null **/
  mumbai_settings: InContextSdkMethod<Query['mumbai_settings'], Querymumbai_settingsArgs, MeshContext>,
  /** null **/
  mumbai_relayer: InContextSdkMethod<Query['mumbai_relayer'], Querymumbai_relayerArgs, MeshContext>,
  /** null **/
  mumbai_relayers: InContextSdkMethod<Query['mumbai_relayers'], Querymumbai_relayersArgs, MeshContext>,
  /** null **/
  mumbai_sequencer: InContextSdkMethod<Query['mumbai_sequencer'], Querymumbai_sequencerArgs, MeshContext>,
  /** null **/
  mumbai_sequencers: InContextSdkMethod<Query['mumbai_sequencers'], Querymumbai_sequencersArgs, MeshContext>,
  /** null **/
  mumbai_relayerFee: InContextSdkMethod<Query['mumbai_relayerFee'], Querymumbai_relayerFeeArgs, MeshContext>,
  /** null **/
  mumbai_relayerFees: InContextSdkMethod<Query['mumbai_relayerFees'], Querymumbai_relayerFeesArgs, MeshContext>,
  /** null **/
  mumbai_originTransfer: InContextSdkMethod<Query['mumbai_originTransfer'], Querymumbai_originTransferArgs, MeshContext>,
  /** null **/
  mumbai_originTransfers: InContextSdkMethod<Query['mumbai_originTransfers'], Querymumbai_originTransfersArgs, MeshContext>,
  /** null **/
  mumbai_destinationTransfer: InContextSdkMethod<Query['mumbai_destinationTransfer'], Querymumbai_destinationTransferArgs, MeshContext>,
  /** null **/
  mumbai_destinationTransfers: InContextSdkMethod<Query['mumbai_destinationTransfers'], Querymumbai_destinationTransfersArgs, MeshContext>,
  /** null **/
  mumbai_originMessage: InContextSdkMethod<Query['mumbai_originMessage'], Querymumbai_originMessageArgs, MeshContext>,
  /** null **/
  mumbai_originMessages: InContextSdkMethod<Query['mumbai_originMessages'], Querymumbai_originMessagesArgs, MeshContext>,
  /** null **/
  mumbai_aggregateRoot: InContextSdkMethod<Query['mumbai_aggregateRoot'], Querymumbai_aggregateRootArgs, MeshContext>,
  /** null **/
  mumbai_aggregateRoots: InContextSdkMethod<Query['mumbai_aggregateRoots'], Querymumbai_aggregateRootsArgs, MeshContext>,
  /** null **/
  mumbai_connectorMeta: InContextSdkMethod<Query['mumbai_connectorMeta'], Querymumbai_connectorMetaArgs, MeshContext>,
  /** null **/
  mumbai_connectorMetas: InContextSdkMethod<Query['mumbai_connectorMetas'], Querymumbai_connectorMetasArgs, MeshContext>,
  /** null **/
  mumbai_rootCount: InContextSdkMethod<Query['mumbai_rootCount'], Querymumbai_rootCountArgs, MeshContext>,
  /** null **/
  mumbai_rootCounts: InContextSdkMethod<Query['mumbai_rootCounts'], Querymumbai_rootCountsArgs, MeshContext>,
  /** null **/
  mumbai_rootMessageSent: InContextSdkMethod<Query['mumbai_rootMessageSent'], Querymumbai_rootMessageSentArgs, MeshContext>,
  /** null **/
  mumbai_rootMessageSents: InContextSdkMethod<Query['mumbai_rootMessageSents'], Querymumbai_rootMessageSentsArgs, MeshContext>,
  /** null **/
  mumbai_relayerFeesIncrease: InContextSdkMethod<Query['mumbai_relayerFeesIncrease'], Querymumbai_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  mumbai_relayerFeesIncreases: InContextSdkMethod<Query['mumbai_relayerFeesIncreases'], Querymumbai_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  mumbai_slippageUpdate: InContextSdkMethod<Query['mumbai_slippageUpdate'], Querymumbai_slippageUpdateArgs, MeshContext>,
  /** null **/
  mumbai_slippageUpdates: InContextSdkMethod<Query['mumbai_slippageUpdates'], Querymumbai_slippageUpdatesArgs, MeshContext>,
  /** null **/
  mumbai_snapshotRoot: InContextSdkMethod<Query['mumbai_snapshotRoot'], Querymumbai_snapshotRootArgs, MeshContext>,
  /** null **/
  mumbai_snapshotRoots: InContextSdkMethod<Query['mumbai_snapshotRoots'], Querymumbai_snapshotRootsArgs, MeshContext>,
  /** null **/
  mumbai_spokeConnectorMode: InContextSdkMethod<Query['mumbai_spokeConnectorMode'], Querymumbai_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  mumbai_spokeConnectorModes: InContextSdkMethod<Query['mumbai_spokeConnectorModes'], Querymumbai_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  mumbai_aggregateRootProposed: InContextSdkMethod<Query['mumbai_aggregateRootProposed'], Querymumbai_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  mumbai_aggregateRootProposeds: InContextSdkMethod<Query['mumbai_aggregateRootProposeds'], Querymumbai_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  mumbai_optimisticRootFinalized: InContextSdkMethod<Query['mumbai_optimisticRootFinalized'], Querymumbai_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  mumbai_optimisticRootFinalizeds: InContextSdkMethod<Query['mumbai_optimisticRootFinalizeds'], Querymumbai_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  mumbai__meta: InContextSdkMethod<Query['mumbai__meta'], Querymumbai__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  mumbai_asset: InContextSdkMethod<Subscription['mumbai_asset'], Subscriptionmumbai_assetArgs, MeshContext>,
  /** null **/
  mumbai_assets: InContextSdkMethod<Subscription['mumbai_assets'], Subscriptionmumbai_assetsArgs, MeshContext>,
  /** null **/
  mumbai_assetStatus: InContextSdkMethod<Subscription['mumbai_assetStatus'], Subscriptionmumbai_assetStatusArgs, MeshContext>,
  /** null **/
  mumbai_assetStatuses: InContextSdkMethod<Subscription['mumbai_assetStatuses'], Subscriptionmumbai_assetStatusesArgs, MeshContext>,
  /** null **/
  mumbai_assetBalance: InContextSdkMethod<Subscription['mumbai_assetBalance'], Subscriptionmumbai_assetBalanceArgs, MeshContext>,
  /** null **/
  mumbai_assetBalances: InContextSdkMethod<Subscription['mumbai_assetBalances'], Subscriptionmumbai_assetBalancesArgs, MeshContext>,
  /** null **/
  mumbai_router: InContextSdkMethod<Subscription['mumbai_router'], Subscriptionmumbai_routerArgs, MeshContext>,
  /** null **/
  mumbai_routers: InContextSdkMethod<Subscription['mumbai_routers'], Subscriptionmumbai_routersArgs, MeshContext>,
  /** null **/
  mumbai_routerDailyTVL: InContextSdkMethod<Subscription['mumbai_routerDailyTVL'], Subscriptionmumbai_routerDailyTVLArgs, MeshContext>,
  /** null **/
  mumbai_routerDailyTVLs: InContextSdkMethod<Subscription['mumbai_routerDailyTVLs'], Subscriptionmumbai_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  mumbai_routerLiquidityEvent: InContextSdkMethod<Subscription['mumbai_routerLiquidityEvent'], Subscriptionmumbai_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  mumbai_routerLiquidityEvents: InContextSdkMethod<Subscription['mumbai_routerLiquidityEvents'], Subscriptionmumbai_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  mumbai_setting: InContextSdkMethod<Subscription['mumbai_setting'], Subscriptionmumbai_settingArgs, MeshContext>,
  /** null **/
  mumbai_settings: InContextSdkMethod<Subscription['mumbai_settings'], Subscriptionmumbai_settingsArgs, MeshContext>,
  /** null **/
  mumbai_relayer: InContextSdkMethod<Subscription['mumbai_relayer'], Subscriptionmumbai_relayerArgs, MeshContext>,
  /** null **/
  mumbai_relayers: InContextSdkMethod<Subscription['mumbai_relayers'], Subscriptionmumbai_relayersArgs, MeshContext>,
  /** null **/
  mumbai_sequencer: InContextSdkMethod<Subscription['mumbai_sequencer'], Subscriptionmumbai_sequencerArgs, MeshContext>,
  /** null **/
  mumbai_sequencers: InContextSdkMethod<Subscription['mumbai_sequencers'], Subscriptionmumbai_sequencersArgs, MeshContext>,
  /** null **/
  mumbai_relayerFee: InContextSdkMethod<Subscription['mumbai_relayerFee'], Subscriptionmumbai_relayerFeeArgs, MeshContext>,
  /** null **/
  mumbai_relayerFees: InContextSdkMethod<Subscription['mumbai_relayerFees'], Subscriptionmumbai_relayerFeesArgs, MeshContext>,
  /** null **/
  mumbai_originTransfer: InContextSdkMethod<Subscription['mumbai_originTransfer'], Subscriptionmumbai_originTransferArgs, MeshContext>,
  /** null **/
  mumbai_originTransfers: InContextSdkMethod<Subscription['mumbai_originTransfers'], Subscriptionmumbai_originTransfersArgs, MeshContext>,
  /** null **/
  mumbai_destinationTransfer: InContextSdkMethod<Subscription['mumbai_destinationTransfer'], Subscriptionmumbai_destinationTransferArgs, MeshContext>,
  /** null **/
  mumbai_destinationTransfers: InContextSdkMethod<Subscription['mumbai_destinationTransfers'], Subscriptionmumbai_destinationTransfersArgs, MeshContext>,
  /** null **/
  mumbai_originMessage: InContextSdkMethod<Subscription['mumbai_originMessage'], Subscriptionmumbai_originMessageArgs, MeshContext>,
  /** null **/
  mumbai_originMessages: InContextSdkMethod<Subscription['mumbai_originMessages'], Subscriptionmumbai_originMessagesArgs, MeshContext>,
  /** null **/
  mumbai_aggregateRoot: InContextSdkMethod<Subscription['mumbai_aggregateRoot'], Subscriptionmumbai_aggregateRootArgs, MeshContext>,
  /** null **/
  mumbai_aggregateRoots: InContextSdkMethod<Subscription['mumbai_aggregateRoots'], Subscriptionmumbai_aggregateRootsArgs, MeshContext>,
  /** null **/
  mumbai_connectorMeta: InContextSdkMethod<Subscription['mumbai_connectorMeta'], Subscriptionmumbai_connectorMetaArgs, MeshContext>,
  /** null **/
  mumbai_connectorMetas: InContextSdkMethod<Subscription['mumbai_connectorMetas'], Subscriptionmumbai_connectorMetasArgs, MeshContext>,
  /** null **/
  mumbai_rootCount: InContextSdkMethod<Subscription['mumbai_rootCount'], Subscriptionmumbai_rootCountArgs, MeshContext>,
  /** null **/
  mumbai_rootCounts: InContextSdkMethod<Subscription['mumbai_rootCounts'], Subscriptionmumbai_rootCountsArgs, MeshContext>,
  /** null **/
  mumbai_rootMessageSent: InContextSdkMethod<Subscription['mumbai_rootMessageSent'], Subscriptionmumbai_rootMessageSentArgs, MeshContext>,
  /** null **/
  mumbai_rootMessageSents: InContextSdkMethod<Subscription['mumbai_rootMessageSents'], Subscriptionmumbai_rootMessageSentsArgs, MeshContext>,
  /** null **/
  mumbai_relayerFeesIncrease: InContextSdkMethod<Subscription['mumbai_relayerFeesIncrease'], Subscriptionmumbai_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  mumbai_relayerFeesIncreases: InContextSdkMethod<Subscription['mumbai_relayerFeesIncreases'], Subscriptionmumbai_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  mumbai_slippageUpdate: InContextSdkMethod<Subscription['mumbai_slippageUpdate'], Subscriptionmumbai_slippageUpdateArgs, MeshContext>,
  /** null **/
  mumbai_slippageUpdates: InContextSdkMethod<Subscription['mumbai_slippageUpdates'], Subscriptionmumbai_slippageUpdatesArgs, MeshContext>,
  /** null **/
  mumbai_snapshotRoot: InContextSdkMethod<Subscription['mumbai_snapshotRoot'], Subscriptionmumbai_snapshotRootArgs, MeshContext>,
  /** null **/
  mumbai_snapshotRoots: InContextSdkMethod<Subscription['mumbai_snapshotRoots'], Subscriptionmumbai_snapshotRootsArgs, MeshContext>,
  /** null **/
  mumbai_spokeConnectorMode: InContextSdkMethod<Subscription['mumbai_spokeConnectorMode'], Subscriptionmumbai_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  mumbai_spokeConnectorModes: InContextSdkMethod<Subscription['mumbai_spokeConnectorModes'], Subscriptionmumbai_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  mumbai_aggregateRootProposed: InContextSdkMethod<Subscription['mumbai_aggregateRootProposed'], Subscriptionmumbai_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  mumbai_aggregateRootProposeds: InContextSdkMethod<Subscription['mumbai_aggregateRootProposeds'], Subscriptionmumbai_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  mumbai_optimisticRootFinalized: InContextSdkMethod<Subscription['mumbai_optimisticRootFinalized'], Subscriptionmumbai_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  mumbai_optimisticRootFinalizeds: InContextSdkMethod<Subscription['mumbai_optimisticRootFinalizeds'], Subscriptionmumbai_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  mumbai__meta: InContextSdkMethod<Subscription['mumbai__meta'], Subscriptionmumbai__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Mumbai"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
