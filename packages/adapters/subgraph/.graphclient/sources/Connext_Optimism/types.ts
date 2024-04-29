// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextOptimismTypes {
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
  optimism_BigDecimal: any;
  BigInt: any;
  optimism_Bytes: any;
  optimism_Int8: any;
  Timestamp: any;
};

export type optimism_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['optimism_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type optimism_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['optimism_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type optimism_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['optimism_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['optimism_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_AggregateRootProposed_filter>>>;
};

export type optimism_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type optimism_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['optimism_Bytes']>;
  root_not?: InputMaybe<Scalars['optimism_Bytes']>;
  root_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  root_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  root_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  root_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  root_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_AggregateRoot_filter>>>;
};

export type optimism_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type optimism_Aggregation_interval =
  | 'hour'
  | 'day';

export type optimism_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['optimism_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['optimism_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['optimism_Bytes']>;
  localAsset?: Maybe<Scalars['optimism_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<optimism_AssetStatus>;
};

export type optimism_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: optimism_Router;
  asset: optimism_Asset;
  feesEarned: Scalars['BigInt'];
};

export type optimism_AssetBalance_filter = {
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
  router_?: InputMaybe<optimism_Router_filter>;
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
  asset_?: InputMaybe<optimism_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_AssetBalance_filter>>>;
};

export type optimism_AssetBalance_orderBy =
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

export type optimism_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type optimism_AssetStatus_filter = {
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
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_AssetStatus_filter>>>;
};

export type optimism_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type optimism_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['optimism_Bytes']>;
  key_not?: InputMaybe<Scalars['optimism_Bytes']>;
  key_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  key_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  key_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  key_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  key_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['optimism_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['optimism_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  localAsset?: InputMaybe<Scalars['optimism_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['optimism_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  status_?: InputMaybe<optimism_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_Asset_filter>>>;
};

export type optimism_Asset_orderBy =
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

export type optimism_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type optimism_Block_height = {
  hash?: InputMaybe<Scalars['optimism_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type optimism_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['optimism_Bytes']>;
  rootManager?: Maybe<Scalars['optimism_Bytes']>;
  mirrorConnector?: Maybe<Scalars['optimism_Bytes']>;
};

export type optimism_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['optimism_Bytes']>;
  amb_not?: InputMaybe<Scalars['optimism_Bytes']>;
  amb_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  amb_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  amb_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  amb_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  rootManager?: InputMaybe<Scalars['optimism_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['optimism_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['optimism_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['optimism_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_ConnectorMeta_filter>>>;
};

export type optimism_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type optimism_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['optimism_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<optimism_TransferStatus>;
  routers?: Maybe<Array<optimism_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['optimism_Bytes']>;
  delegate?: Maybe<Scalars['optimism_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['optimism_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['optimism_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['optimism_Bytes']>;
  asset?: Maybe<optimism_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['optimism_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['optimism_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['optimism_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['optimism_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['optimism_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['optimism_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type optimism_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_Router_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_Router_filter>;
};

export type optimism_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_not?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<optimism_TransferStatus>;
  status_not?: InputMaybe<optimism_TransferStatus>;
  status_in?: InputMaybe<Array<optimism_TransferStatus>>;
  status_not_in?: InputMaybe<Array<optimism_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<optimism_Router_filter>;
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
  to?: InputMaybe<Scalars['optimism_Bytes']>;
  to_not?: InputMaybe<Scalars['optimism_Bytes']>;
  to_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  to_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  to_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  to_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  to_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate_not?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['optimism_Bytes']>;
  callData_not?: InputMaybe<Scalars['optimism_Bytes']>;
  callData_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  callData_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  callData_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  callData_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  originSender?: InputMaybe<Scalars['optimism_Bytes']>;
  originSender_not?: InputMaybe<Scalars['optimism_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  asset_?: InputMaybe<optimism_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['optimism_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['optimism_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['optimism_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['optimism_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['optimism_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['optimism_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_DestinationTransfer_filter>>>;
};

export type optimism_DestinationTransfer_orderBy =
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

export type optimism_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['optimism_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type optimism_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['optimism_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['optimism_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_OptimisticRootFinalized_filter>>>;
};

export type optimism_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type optimism_OrderDirection =
  | 'asc'
  | 'desc';

export type optimism_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['optimism_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['optimism_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['optimism_Bytes']>;
  root?: Maybe<Scalars['optimism_Bytes']>;
  transactionHash?: Maybe<Scalars['optimism_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<optimism_RootCount>;
};

export type optimism_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_not?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['optimism_Bytes']>;
  leaf_not?: InputMaybe<Scalars['optimism_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['optimism_Bytes']>;
  message_not?: InputMaybe<Scalars['optimism_Bytes']>;
  message_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  message_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  message_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  message_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  message_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  root?: InputMaybe<Scalars['optimism_Bytes']>;
  root_not?: InputMaybe<Scalars['optimism_Bytes']>;
  root_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  root_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  root_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  root_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  root_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  rootCount_?: InputMaybe<optimism_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_OriginMessage_filter>>>;
};

export type optimism_OriginMessage_orderBy =
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

export type optimism_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['optimism_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<optimism_TransferStatus>;
  messageHash?: Maybe<Scalars['optimism_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['optimism_Bytes']>;
  delegate?: Maybe<Scalars['optimism_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['optimism_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['optimism_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['optimism_Bytes']>;
  asset?: Maybe<optimism_Asset>;
  transactingAsset?: Maybe<Scalars['optimism_Bytes']>;
  message?: Maybe<optimism_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<optimism_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['optimism_Bytes']>;
  caller?: Maybe<Scalars['optimism_Bytes']>;
  transactionHash?: Maybe<Scalars['optimism_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['optimism_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type optimism_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_RelayerFee_filter>;
};

export type optimism_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_not?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<optimism_TransferStatus>;
  status_not?: InputMaybe<optimism_TransferStatus>;
  status_in?: InputMaybe<Array<optimism_TransferStatus>>;
  status_not_in?: InputMaybe<Array<optimism_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['optimism_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['optimism_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  to?: InputMaybe<Scalars['optimism_Bytes']>;
  to_not?: InputMaybe<Scalars['optimism_Bytes']>;
  to_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  to_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  to_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  to_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  to_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate_not?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['optimism_Bytes']>;
  callData_not?: InputMaybe<Scalars['optimism_Bytes']>;
  callData_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  callData_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  callData_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  callData_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['optimism_Bytes']>;
  originSender_not?: InputMaybe<Scalars['optimism_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  asset_?: InputMaybe<optimism_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['optimism_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['optimism_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  message_?: InputMaybe<optimism_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<optimism_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['optimism_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['optimism_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  caller?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['optimism_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['optimism_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_OriginTransfer_filter>>>;
};

export type optimism_OriginTransfer_orderBy =
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
  optimism_asset?: Maybe<optimism_Asset>;
  optimism_assets: Array<optimism_Asset>;
  optimism_assetStatus?: Maybe<optimism_AssetStatus>;
  optimism_assetStatuses: Array<optimism_AssetStatus>;
  optimism_assetBalance?: Maybe<optimism_AssetBalance>;
  optimism_assetBalances: Array<optimism_AssetBalance>;
  optimism_router?: Maybe<optimism_Router>;
  optimism_routers: Array<optimism_Router>;
  optimism_routerDailyTVL?: Maybe<optimism_RouterDailyTVL>;
  optimism_routerDailyTVLs: Array<optimism_RouterDailyTVL>;
  optimism_routerLiquidityEvent?: Maybe<optimism_RouterLiquidityEvent>;
  optimism_routerLiquidityEvents: Array<optimism_RouterLiquidityEvent>;
  optimism_setting?: Maybe<optimism_Setting>;
  optimism_settings: Array<optimism_Setting>;
  optimism_relayer?: Maybe<optimism_Relayer>;
  optimism_relayers: Array<optimism_Relayer>;
  optimism_sequencer?: Maybe<optimism_Sequencer>;
  optimism_sequencers: Array<optimism_Sequencer>;
  optimism_relayerFee?: Maybe<optimism_RelayerFee>;
  optimism_relayerFees: Array<optimism_RelayerFee>;
  optimism_originTransfer?: Maybe<optimism_OriginTransfer>;
  optimism_originTransfers: Array<optimism_OriginTransfer>;
  optimism_destinationTransfer?: Maybe<optimism_DestinationTransfer>;
  optimism_destinationTransfers: Array<optimism_DestinationTransfer>;
  optimism_originMessage?: Maybe<optimism_OriginMessage>;
  optimism_originMessages: Array<optimism_OriginMessage>;
  optimism_aggregateRoot?: Maybe<optimism_AggregateRoot>;
  optimism_aggregateRoots: Array<optimism_AggregateRoot>;
  optimism_connectorMeta?: Maybe<optimism_ConnectorMeta>;
  optimism_connectorMetas: Array<optimism_ConnectorMeta>;
  optimism_rootCount?: Maybe<optimism_RootCount>;
  optimism_rootCounts: Array<optimism_RootCount>;
  optimism_rootMessageSent?: Maybe<optimism_RootMessageSent>;
  optimism_rootMessageSents: Array<optimism_RootMessageSent>;
  optimism_relayerFeesIncrease?: Maybe<optimism_RelayerFeesIncrease>;
  optimism_relayerFeesIncreases: Array<optimism_RelayerFeesIncrease>;
  optimism_slippageUpdate?: Maybe<optimism_SlippageUpdate>;
  optimism_slippageUpdates: Array<optimism_SlippageUpdate>;
  optimism_snapshotRoot?: Maybe<optimism_SnapshotRoot>;
  optimism_snapshotRoots: Array<optimism_SnapshotRoot>;
  optimism_spokeConnectorMode?: Maybe<optimism_SpokeConnectorMode>;
  optimism_spokeConnectorModes: Array<optimism_SpokeConnectorMode>;
  optimism_aggregateRootProposed?: Maybe<optimism_AggregateRootProposed>;
  optimism_aggregateRootProposeds: Array<optimism_AggregateRootProposed>;
  optimism_optimisticRootFinalized?: Maybe<optimism_OptimisticRootFinalized>;
  optimism_optimisticRootFinalizeds: Array<optimism_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  optimism__meta?: Maybe<optimism__Meta_>;
};


export type Queryoptimism_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_Asset_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_Asset_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_AssetStatus_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_AssetBalance_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_Router_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_Router_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_RouterDailyTVL_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_RouterLiquidityEvent_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_Setting_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_Setting_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_Relayer_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_Relayer_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_Sequencer_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_Sequencer_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_RelayerFee_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_OriginTransfer_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_DestinationTransfer_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_OriginMessage_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_AggregateRoot_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_ConnectorMeta_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_RootCount_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_RootCount_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_RootMessageSent_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_RelayerFeesIncrease_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_SlippageUpdate_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_SnapshotRoot_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_SpokeConnectorMode_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_AggregateRootProposed_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_OptimisticRootFinalized_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism__metaArgs = {
  block?: InputMaybe<optimism_Block_height>;
};

export type optimism_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['optimism_Bytes']>;
};

export type optimism_RelayerFee = {
  id: Scalars['ID'];
  transfer: optimism_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['optimism_Bytes'];
};

export type optimism_RelayerFee_filter = {
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
  transfer_?: InputMaybe<optimism_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_not?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_RelayerFee_filter>>>;
};

export type optimism_RelayerFee_orderBy =
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

export type optimism_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: optimism_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['optimism_Bytes']>;
  caller: Scalars['optimism_Bytes'];
  transactionHash: Scalars['optimism_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type optimism_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<optimism_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_not?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  caller?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_RelayerFeesIncrease_filter>>>;
};

export type optimism_RelayerFeesIncrease_orderBy =
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

export type optimism_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['optimism_Bytes']>;
  relayer_not?: InputMaybe<Scalars['optimism_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_Relayer_filter>>>;
};

export type optimism_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type optimism_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type optimism_RootCount_filter = {
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
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_RootCount_filter>>>;
};

export type optimism_RootCount_orderBy =
  | 'id'
  | 'count';

export type optimism_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['optimism_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['optimism_Bytes']>;
  transactionHash?: Maybe<Scalars['optimism_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type optimism_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['optimism_Bytes']>;
  root_not?: InputMaybe<Scalars['optimism_Bytes']>;
  root_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  root_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  root_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  root_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  root_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_RootMessageSent_filter>>>;
};

export type optimism_RootMessageSent_orderBy =
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

export type optimism_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['optimism_Bytes']>;
  recipient?: Maybe<Scalars['optimism_Bytes']>;
  proposedOwner?: Maybe<Scalars['optimism_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<optimism_AssetBalance>;
};


export type optimism_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_AssetBalance_filter>;
};

export type optimism_RouterDailyTVL = {
  id: Scalars['ID'];
  router: optimism_Router;
  asset: optimism_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type optimism_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<optimism_Router_filter>;
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
  asset_?: InputMaybe<optimism_Asset_filter>;
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
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_RouterDailyTVL_filter>>>;
};

export type optimism_RouterDailyTVL_orderBy =
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

export type optimism_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<optimism_RouterLiquidityEventType>;
  router: optimism_Router;
  asset: optimism_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['optimism_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['optimism_Bytes'];
  nonce: Scalars['BigInt'];
};

export type optimism_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type optimism_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<optimism_RouterLiquidityEventType>;
  type_not?: InputMaybe<optimism_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<optimism_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<optimism_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<optimism_Router_filter>;
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
  asset_?: InputMaybe<optimism_Asset_filter>;
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
  caller?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_RouterLiquidityEvent_filter>>>;
};

export type optimism_RouterLiquidityEvent_orderBy =
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

export type optimism_Router_filter = {
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
  owner?: InputMaybe<Scalars['optimism_Bytes']>;
  owner_not?: InputMaybe<Scalars['optimism_Bytes']>;
  owner_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  owner_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  owner_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  owner_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  recipient?: InputMaybe<Scalars['optimism_Bytes']>;
  recipient_not?: InputMaybe<Scalars['optimism_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['optimism_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['optimism_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<optimism_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_Router_filter>>>;
};

export type optimism_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type optimism_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['optimism_Bytes']>;
};

export type optimism_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['optimism_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['optimism_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_Sequencer_filter>>>;
};

export type optimism_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type optimism_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['optimism_Bytes'];
};

export type optimism_Setting_filter = {
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
  caller?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_Setting_filter>>>;
};

export type optimism_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type optimism_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: optimism_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['optimism_Bytes'];
  transactionHash: Scalars['optimism_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type optimism_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<optimism_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_SlippageUpdate_filter>>>;
};

export type optimism_SlippageUpdate_orderBy =
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

export type optimism_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['optimism_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type optimism_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['optimism_Bytes']>;
  root_not?: InputMaybe<Scalars['optimism_Bytes']>;
  root_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  root_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  root_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  root_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  root_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_SnapshotRoot_filter>>>;
};

export type optimism_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type optimism_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type optimism_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_SpokeConnectorMode_filter>>>;
};

export type optimism_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  optimism_asset?: Maybe<optimism_Asset>;
  optimism_assets: Array<optimism_Asset>;
  optimism_assetStatus?: Maybe<optimism_AssetStatus>;
  optimism_assetStatuses: Array<optimism_AssetStatus>;
  optimism_assetBalance?: Maybe<optimism_AssetBalance>;
  optimism_assetBalances: Array<optimism_AssetBalance>;
  optimism_router?: Maybe<optimism_Router>;
  optimism_routers: Array<optimism_Router>;
  optimism_routerDailyTVL?: Maybe<optimism_RouterDailyTVL>;
  optimism_routerDailyTVLs: Array<optimism_RouterDailyTVL>;
  optimism_routerLiquidityEvent?: Maybe<optimism_RouterLiquidityEvent>;
  optimism_routerLiquidityEvents: Array<optimism_RouterLiquidityEvent>;
  optimism_setting?: Maybe<optimism_Setting>;
  optimism_settings: Array<optimism_Setting>;
  optimism_relayer?: Maybe<optimism_Relayer>;
  optimism_relayers: Array<optimism_Relayer>;
  optimism_sequencer?: Maybe<optimism_Sequencer>;
  optimism_sequencers: Array<optimism_Sequencer>;
  optimism_relayerFee?: Maybe<optimism_RelayerFee>;
  optimism_relayerFees: Array<optimism_RelayerFee>;
  optimism_originTransfer?: Maybe<optimism_OriginTransfer>;
  optimism_originTransfers: Array<optimism_OriginTransfer>;
  optimism_destinationTransfer?: Maybe<optimism_DestinationTransfer>;
  optimism_destinationTransfers: Array<optimism_DestinationTransfer>;
  optimism_originMessage?: Maybe<optimism_OriginMessage>;
  optimism_originMessages: Array<optimism_OriginMessage>;
  optimism_aggregateRoot?: Maybe<optimism_AggregateRoot>;
  optimism_aggregateRoots: Array<optimism_AggregateRoot>;
  optimism_connectorMeta?: Maybe<optimism_ConnectorMeta>;
  optimism_connectorMetas: Array<optimism_ConnectorMeta>;
  optimism_rootCount?: Maybe<optimism_RootCount>;
  optimism_rootCounts: Array<optimism_RootCount>;
  optimism_rootMessageSent?: Maybe<optimism_RootMessageSent>;
  optimism_rootMessageSents: Array<optimism_RootMessageSent>;
  optimism_relayerFeesIncrease?: Maybe<optimism_RelayerFeesIncrease>;
  optimism_relayerFeesIncreases: Array<optimism_RelayerFeesIncrease>;
  optimism_slippageUpdate?: Maybe<optimism_SlippageUpdate>;
  optimism_slippageUpdates: Array<optimism_SlippageUpdate>;
  optimism_snapshotRoot?: Maybe<optimism_SnapshotRoot>;
  optimism_snapshotRoots: Array<optimism_SnapshotRoot>;
  optimism_spokeConnectorMode?: Maybe<optimism_SpokeConnectorMode>;
  optimism_spokeConnectorModes: Array<optimism_SpokeConnectorMode>;
  optimism_aggregateRootProposed?: Maybe<optimism_AggregateRootProposed>;
  optimism_aggregateRootProposeds: Array<optimism_AggregateRootProposed>;
  optimism_optimisticRootFinalized?: Maybe<optimism_OptimisticRootFinalized>;
  optimism_optimisticRootFinalizeds: Array<optimism_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  optimism__meta?: Maybe<optimism__Meta_>;
};


export type Subscriptionoptimism_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_Asset_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_Asset_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_AssetStatus_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_AssetBalance_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_Router_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_Router_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_RouterDailyTVL_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_RouterLiquidityEvent_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_Setting_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_Setting_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_Relayer_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_Relayer_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_Sequencer_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_Sequencer_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_RelayerFee_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_OriginTransfer_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_DestinationTransfer_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_OriginMessage_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_AggregateRoot_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_ConnectorMeta_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_RootCount_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_RootCount_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_RootMessageSent_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_RelayerFeesIncrease_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_SlippageUpdate_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_SnapshotRoot_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_SpokeConnectorMode_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_AggregateRootProposed_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_OptimisticRootFinalized_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism__metaArgs = {
  block?: InputMaybe<optimism_Block_height>;
};

export type optimism_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type optimism__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['optimism_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['optimism_Bytes']>;
};

/** The type for the top-level _meta field */
export type optimism__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: optimism__Block_;
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
  optimism_asset: InContextSdkMethod<Query['optimism_asset'], Queryoptimism_assetArgs, MeshContext>,
  /** null **/
  optimism_assets: InContextSdkMethod<Query['optimism_assets'], Queryoptimism_assetsArgs, MeshContext>,
  /** null **/
  optimism_assetStatus: InContextSdkMethod<Query['optimism_assetStatus'], Queryoptimism_assetStatusArgs, MeshContext>,
  /** null **/
  optimism_assetStatuses: InContextSdkMethod<Query['optimism_assetStatuses'], Queryoptimism_assetStatusesArgs, MeshContext>,
  /** null **/
  optimism_assetBalance: InContextSdkMethod<Query['optimism_assetBalance'], Queryoptimism_assetBalanceArgs, MeshContext>,
  /** null **/
  optimism_assetBalances: InContextSdkMethod<Query['optimism_assetBalances'], Queryoptimism_assetBalancesArgs, MeshContext>,
  /** null **/
  optimism_router: InContextSdkMethod<Query['optimism_router'], Queryoptimism_routerArgs, MeshContext>,
  /** null **/
  optimism_routers: InContextSdkMethod<Query['optimism_routers'], Queryoptimism_routersArgs, MeshContext>,
  /** null **/
  optimism_routerDailyTVL: InContextSdkMethod<Query['optimism_routerDailyTVL'], Queryoptimism_routerDailyTVLArgs, MeshContext>,
  /** null **/
  optimism_routerDailyTVLs: InContextSdkMethod<Query['optimism_routerDailyTVLs'], Queryoptimism_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  optimism_routerLiquidityEvent: InContextSdkMethod<Query['optimism_routerLiquidityEvent'], Queryoptimism_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  optimism_routerLiquidityEvents: InContextSdkMethod<Query['optimism_routerLiquidityEvents'], Queryoptimism_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  optimism_setting: InContextSdkMethod<Query['optimism_setting'], Queryoptimism_settingArgs, MeshContext>,
  /** null **/
  optimism_settings: InContextSdkMethod<Query['optimism_settings'], Queryoptimism_settingsArgs, MeshContext>,
  /** null **/
  optimism_relayer: InContextSdkMethod<Query['optimism_relayer'], Queryoptimism_relayerArgs, MeshContext>,
  /** null **/
  optimism_relayers: InContextSdkMethod<Query['optimism_relayers'], Queryoptimism_relayersArgs, MeshContext>,
  /** null **/
  optimism_sequencer: InContextSdkMethod<Query['optimism_sequencer'], Queryoptimism_sequencerArgs, MeshContext>,
  /** null **/
  optimism_sequencers: InContextSdkMethod<Query['optimism_sequencers'], Queryoptimism_sequencersArgs, MeshContext>,
  /** null **/
  optimism_relayerFee: InContextSdkMethod<Query['optimism_relayerFee'], Queryoptimism_relayerFeeArgs, MeshContext>,
  /** null **/
  optimism_relayerFees: InContextSdkMethod<Query['optimism_relayerFees'], Queryoptimism_relayerFeesArgs, MeshContext>,
  /** null **/
  optimism_originTransfer: InContextSdkMethod<Query['optimism_originTransfer'], Queryoptimism_originTransferArgs, MeshContext>,
  /** null **/
  optimism_originTransfers: InContextSdkMethod<Query['optimism_originTransfers'], Queryoptimism_originTransfersArgs, MeshContext>,
  /** null **/
  optimism_destinationTransfer: InContextSdkMethod<Query['optimism_destinationTransfer'], Queryoptimism_destinationTransferArgs, MeshContext>,
  /** null **/
  optimism_destinationTransfers: InContextSdkMethod<Query['optimism_destinationTransfers'], Queryoptimism_destinationTransfersArgs, MeshContext>,
  /** null **/
  optimism_originMessage: InContextSdkMethod<Query['optimism_originMessage'], Queryoptimism_originMessageArgs, MeshContext>,
  /** null **/
  optimism_originMessages: InContextSdkMethod<Query['optimism_originMessages'], Queryoptimism_originMessagesArgs, MeshContext>,
  /** null **/
  optimism_aggregateRoot: InContextSdkMethod<Query['optimism_aggregateRoot'], Queryoptimism_aggregateRootArgs, MeshContext>,
  /** null **/
  optimism_aggregateRoots: InContextSdkMethod<Query['optimism_aggregateRoots'], Queryoptimism_aggregateRootsArgs, MeshContext>,
  /** null **/
  optimism_connectorMeta: InContextSdkMethod<Query['optimism_connectorMeta'], Queryoptimism_connectorMetaArgs, MeshContext>,
  /** null **/
  optimism_connectorMetas: InContextSdkMethod<Query['optimism_connectorMetas'], Queryoptimism_connectorMetasArgs, MeshContext>,
  /** null **/
  optimism_rootCount: InContextSdkMethod<Query['optimism_rootCount'], Queryoptimism_rootCountArgs, MeshContext>,
  /** null **/
  optimism_rootCounts: InContextSdkMethod<Query['optimism_rootCounts'], Queryoptimism_rootCountsArgs, MeshContext>,
  /** null **/
  optimism_rootMessageSent: InContextSdkMethod<Query['optimism_rootMessageSent'], Queryoptimism_rootMessageSentArgs, MeshContext>,
  /** null **/
  optimism_rootMessageSents: InContextSdkMethod<Query['optimism_rootMessageSents'], Queryoptimism_rootMessageSentsArgs, MeshContext>,
  /** null **/
  optimism_relayerFeesIncrease: InContextSdkMethod<Query['optimism_relayerFeesIncrease'], Queryoptimism_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  optimism_relayerFeesIncreases: InContextSdkMethod<Query['optimism_relayerFeesIncreases'], Queryoptimism_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  optimism_slippageUpdate: InContextSdkMethod<Query['optimism_slippageUpdate'], Queryoptimism_slippageUpdateArgs, MeshContext>,
  /** null **/
  optimism_slippageUpdates: InContextSdkMethod<Query['optimism_slippageUpdates'], Queryoptimism_slippageUpdatesArgs, MeshContext>,
  /** null **/
  optimism_snapshotRoot: InContextSdkMethod<Query['optimism_snapshotRoot'], Queryoptimism_snapshotRootArgs, MeshContext>,
  /** null **/
  optimism_snapshotRoots: InContextSdkMethod<Query['optimism_snapshotRoots'], Queryoptimism_snapshotRootsArgs, MeshContext>,
  /** null **/
  optimism_spokeConnectorMode: InContextSdkMethod<Query['optimism_spokeConnectorMode'], Queryoptimism_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  optimism_spokeConnectorModes: InContextSdkMethod<Query['optimism_spokeConnectorModes'], Queryoptimism_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  optimism_aggregateRootProposed: InContextSdkMethod<Query['optimism_aggregateRootProposed'], Queryoptimism_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  optimism_aggregateRootProposeds: InContextSdkMethod<Query['optimism_aggregateRootProposeds'], Queryoptimism_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  optimism_optimisticRootFinalized: InContextSdkMethod<Query['optimism_optimisticRootFinalized'], Queryoptimism_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  optimism_optimisticRootFinalizeds: InContextSdkMethod<Query['optimism_optimisticRootFinalizeds'], Queryoptimism_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  optimism__meta: InContextSdkMethod<Query['optimism__meta'], Queryoptimism__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  optimism_asset: InContextSdkMethod<Subscription['optimism_asset'], Subscriptionoptimism_assetArgs, MeshContext>,
  /** null **/
  optimism_assets: InContextSdkMethod<Subscription['optimism_assets'], Subscriptionoptimism_assetsArgs, MeshContext>,
  /** null **/
  optimism_assetStatus: InContextSdkMethod<Subscription['optimism_assetStatus'], Subscriptionoptimism_assetStatusArgs, MeshContext>,
  /** null **/
  optimism_assetStatuses: InContextSdkMethod<Subscription['optimism_assetStatuses'], Subscriptionoptimism_assetStatusesArgs, MeshContext>,
  /** null **/
  optimism_assetBalance: InContextSdkMethod<Subscription['optimism_assetBalance'], Subscriptionoptimism_assetBalanceArgs, MeshContext>,
  /** null **/
  optimism_assetBalances: InContextSdkMethod<Subscription['optimism_assetBalances'], Subscriptionoptimism_assetBalancesArgs, MeshContext>,
  /** null **/
  optimism_router: InContextSdkMethod<Subscription['optimism_router'], Subscriptionoptimism_routerArgs, MeshContext>,
  /** null **/
  optimism_routers: InContextSdkMethod<Subscription['optimism_routers'], Subscriptionoptimism_routersArgs, MeshContext>,
  /** null **/
  optimism_routerDailyTVL: InContextSdkMethod<Subscription['optimism_routerDailyTVL'], Subscriptionoptimism_routerDailyTVLArgs, MeshContext>,
  /** null **/
  optimism_routerDailyTVLs: InContextSdkMethod<Subscription['optimism_routerDailyTVLs'], Subscriptionoptimism_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  optimism_routerLiquidityEvent: InContextSdkMethod<Subscription['optimism_routerLiquidityEvent'], Subscriptionoptimism_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  optimism_routerLiquidityEvents: InContextSdkMethod<Subscription['optimism_routerLiquidityEvents'], Subscriptionoptimism_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  optimism_setting: InContextSdkMethod<Subscription['optimism_setting'], Subscriptionoptimism_settingArgs, MeshContext>,
  /** null **/
  optimism_settings: InContextSdkMethod<Subscription['optimism_settings'], Subscriptionoptimism_settingsArgs, MeshContext>,
  /** null **/
  optimism_relayer: InContextSdkMethod<Subscription['optimism_relayer'], Subscriptionoptimism_relayerArgs, MeshContext>,
  /** null **/
  optimism_relayers: InContextSdkMethod<Subscription['optimism_relayers'], Subscriptionoptimism_relayersArgs, MeshContext>,
  /** null **/
  optimism_sequencer: InContextSdkMethod<Subscription['optimism_sequencer'], Subscriptionoptimism_sequencerArgs, MeshContext>,
  /** null **/
  optimism_sequencers: InContextSdkMethod<Subscription['optimism_sequencers'], Subscriptionoptimism_sequencersArgs, MeshContext>,
  /** null **/
  optimism_relayerFee: InContextSdkMethod<Subscription['optimism_relayerFee'], Subscriptionoptimism_relayerFeeArgs, MeshContext>,
  /** null **/
  optimism_relayerFees: InContextSdkMethod<Subscription['optimism_relayerFees'], Subscriptionoptimism_relayerFeesArgs, MeshContext>,
  /** null **/
  optimism_originTransfer: InContextSdkMethod<Subscription['optimism_originTransfer'], Subscriptionoptimism_originTransferArgs, MeshContext>,
  /** null **/
  optimism_originTransfers: InContextSdkMethod<Subscription['optimism_originTransfers'], Subscriptionoptimism_originTransfersArgs, MeshContext>,
  /** null **/
  optimism_destinationTransfer: InContextSdkMethod<Subscription['optimism_destinationTransfer'], Subscriptionoptimism_destinationTransferArgs, MeshContext>,
  /** null **/
  optimism_destinationTransfers: InContextSdkMethod<Subscription['optimism_destinationTransfers'], Subscriptionoptimism_destinationTransfersArgs, MeshContext>,
  /** null **/
  optimism_originMessage: InContextSdkMethod<Subscription['optimism_originMessage'], Subscriptionoptimism_originMessageArgs, MeshContext>,
  /** null **/
  optimism_originMessages: InContextSdkMethod<Subscription['optimism_originMessages'], Subscriptionoptimism_originMessagesArgs, MeshContext>,
  /** null **/
  optimism_aggregateRoot: InContextSdkMethod<Subscription['optimism_aggregateRoot'], Subscriptionoptimism_aggregateRootArgs, MeshContext>,
  /** null **/
  optimism_aggregateRoots: InContextSdkMethod<Subscription['optimism_aggregateRoots'], Subscriptionoptimism_aggregateRootsArgs, MeshContext>,
  /** null **/
  optimism_connectorMeta: InContextSdkMethod<Subscription['optimism_connectorMeta'], Subscriptionoptimism_connectorMetaArgs, MeshContext>,
  /** null **/
  optimism_connectorMetas: InContextSdkMethod<Subscription['optimism_connectorMetas'], Subscriptionoptimism_connectorMetasArgs, MeshContext>,
  /** null **/
  optimism_rootCount: InContextSdkMethod<Subscription['optimism_rootCount'], Subscriptionoptimism_rootCountArgs, MeshContext>,
  /** null **/
  optimism_rootCounts: InContextSdkMethod<Subscription['optimism_rootCounts'], Subscriptionoptimism_rootCountsArgs, MeshContext>,
  /** null **/
  optimism_rootMessageSent: InContextSdkMethod<Subscription['optimism_rootMessageSent'], Subscriptionoptimism_rootMessageSentArgs, MeshContext>,
  /** null **/
  optimism_rootMessageSents: InContextSdkMethod<Subscription['optimism_rootMessageSents'], Subscriptionoptimism_rootMessageSentsArgs, MeshContext>,
  /** null **/
  optimism_relayerFeesIncrease: InContextSdkMethod<Subscription['optimism_relayerFeesIncrease'], Subscriptionoptimism_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  optimism_relayerFeesIncreases: InContextSdkMethod<Subscription['optimism_relayerFeesIncreases'], Subscriptionoptimism_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  optimism_slippageUpdate: InContextSdkMethod<Subscription['optimism_slippageUpdate'], Subscriptionoptimism_slippageUpdateArgs, MeshContext>,
  /** null **/
  optimism_slippageUpdates: InContextSdkMethod<Subscription['optimism_slippageUpdates'], Subscriptionoptimism_slippageUpdatesArgs, MeshContext>,
  /** null **/
  optimism_snapshotRoot: InContextSdkMethod<Subscription['optimism_snapshotRoot'], Subscriptionoptimism_snapshotRootArgs, MeshContext>,
  /** null **/
  optimism_snapshotRoots: InContextSdkMethod<Subscription['optimism_snapshotRoots'], Subscriptionoptimism_snapshotRootsArgs, MeshContext>,
  /** null **/
  optimism_spokeConnectorMode: InContextSdkMethod<Subscription['optimism_spokeConnectorMode'], Subscriptionoptimism_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  optimism_spokeConnectorModes: InContextSdkMethod<Subscription['optimism_spokeConnectorModes'], Subscriptionoptimism_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  optimism_aggregateRootProposed: InContextSdkMethod<Subscription['optimism_aggregateRootProposed'], Subscriptionoptimism_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  optimism_aggregateRootProposeds: InContextSdkMethod<Subscription['optimism_aggregateRootProposeds'], Subscriptionoptimism_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  optimism_optimisticRootFinalized: InContextSdkMethod<Subscription['optimism_optimisticRootFinalized'], Subscriptionoptimism_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  optimism_optimisticRootFinalizeds: InContextSdkMethod<Subscription['optimism_optimisticRootFinalizeds'], Subscriptionoptimism_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  optimism__meta: InContextSdkMethod<Subscription['optimism__meta'], Subscriptionoptimism__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Optimism"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
