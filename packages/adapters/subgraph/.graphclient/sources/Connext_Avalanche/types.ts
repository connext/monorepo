// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextAvalancheTypes {
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
  avalanche_BigDecimal: any;
  BigInt: any;
  avalanche_Bytes: any;
  avalanche_Int8: any;
};

export type avalanche_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['avalanche_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type avalanche_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['avalanche_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type avalanche_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['avalanche_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
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
  _change_block?: InputMaybe<avalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<avalanche_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<avalanche_AggregateRootProposed_filter>>>;
};

export type avalanche_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type avalanche_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  root_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<avalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<avalanche_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<avalanche_AggregateRoot_filter>>>;
};

export type avalanche_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type avalanche_Aggregation_interval =
  | 'hour'
  | 'day';

export type avalanche_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['avalanche_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['avalanche_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['avalanche_Bytes']>;
  localAsset?: Maybe<Scalars['avalanche_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<avalanche_AssetStatus>;
};

export type avalanche_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: avalanche_Router;
  asset: avalanche_Asset;
  feesEarned: Scalars['BigInt'];
};

export type avalanche_AssetBalance_filter = {
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
  router_?: InputMaybe<avalanche_Router_filter>;
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
  asset_?: InputMaybe<avalanche_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<avalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<avalanche_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<avalanche_AssetBalance_filter>>>;
};

export type avalanche_AssetBalance_orderBy =
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

export type avalanche_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type avalanche_AssetStatus_filter = {
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
  _change_block?: InputMaybe<avalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<avalanche_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<avalanche_AssetStatus_filter>>>;
};

export type avalanche_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type avalanche_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['avalanche_Bytes']>;
  key_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  key_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  key_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  key_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  key_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  key_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['avalanche_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['avalanche_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  localAsset?: InputMaybe<Scalars['avalanche_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
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
  status_?: InputMaybe<avalanche_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<avalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<avalanche_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<avalanche_Asset_filter>>>;
};

export type avalanche_Asset_orderBy =
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

export type avalanche_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type avalanche_Block_height = {
  hash?: InputMaybe<Scalars['avalanche_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type avalanche_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['avalanche_Bytes']>;
  rootManager?: Maybe<Scalars['avalanche_Bytes']>;
  mirrorConnector?: Maybe<Scalars['avalanche_Bytes']>;
};

export type avalanche_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['avalanche_Bytes']>;
  amb_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  amb_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  amb_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  amb_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  amb_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  rootManager?: InputMaybe<Scalars['avalanche_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['avalanche_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<avalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<avalanche_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<avalanche_ConnectorMeta_filter>>>;
};

export type avalanche_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type avalanche_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['avalanche_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<avalanche_TransferStatus>;
  routers?: Maybe<Array<avalanche_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['avalanche_Bytes']>;
  delegate?: Maybe<Scalars['avalanche_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['avalanche_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['avalanche_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['avalanche_Bytes']>;
  asset?: Maybe<avalanche_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['avalanche_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['avalanche_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['avalanche_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['avalanche_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['avalanche_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['avalanche_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type avalanche_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_Router_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_Router_filter>;
};

export type avalanche_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['avalanche_Bytes']>;
  transferId_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<avalanche_TransferStatus>;
  status_not?: InputMaybe<avalanche_TransferStatus>;
  status_in?: InputMaybe<Array<avalanche_TransferStatus>>;
  status_not_in?: InputMaybe<Array<avalanche_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<avalanche_Router_filter>;
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
  to?: InputMaybe<Scalars['avalanche_Bytes']>;
  to_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  to_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  to_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  to_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  to_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  to_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  delegate?: InputMaybe<Scalars['avalanche_Bytes']>;
  delegate_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['avalanche_Bytes']>;
  callData_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  callData_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  callData_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  callData_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  callData_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
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
  originSender?: InputMaybe<Scalars['avalanche_Bytes']>;
  originSender_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['avalanche_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
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
  asset_?: InputMaybe<avalanche_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['avalanche_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['avalanche_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['avalanche_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['avalanche_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['avalanche_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['avalanche_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<avalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<avalanche_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<avalanche_DestinationTransfer_filter>>>;
};

export type avalanche_DestinationTransfer_orderBy =
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

export type avalanche_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['avalanche_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type avalanche_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['avalanche_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
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
  _change_block?: InputMaybe<avalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<avalanche_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<avalanche_OptimisticRootFinalized_filter>>>;
};

export type avalanche_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type avalanche_OrderDirection =
  | 'asc'
  | 'desc';

export type avalanche_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['avalanche_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['avalanche_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['avalanche_Bytes']>;
  root?: Maybe<Scalars['avalanche_Bytes']>;
  transactionHash?: Maybe<Scalars['avalanche_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<avalanche_RootCount>;
};

export type avalanche_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['avalanche_Bytes']>;
  transferId_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['avalanche_Bytes']>;
  leaf_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['avalanche_Bytes']>;
  message_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  message_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  message_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  message_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  message_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  message_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  root?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  root_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
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
  rootCount_?: InputMaybe<avalanche_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<avalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<avalanche_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<avalanche_OriginMessage_filter>>>;
};

export type avalanche_OriginMessage_orderBy =
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

export type avalanche_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['avalanche_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<avalanche_TransferStatus>;
  messageHash?: Maybe<Scalars['avalanche_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['avalanche_Bytes']>;
  delegate?: Maybe<Scalars['avalanche_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['avalanche_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['avalanche_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['avalanche_Bytes']>;
  asset?: Maybe<avalanche_Asset>;
  transactingAsset?: Maybe<Scalars['avalanche_Bytes']>;
  message?: Maybe<avalanche_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<avalanche_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['avalanche_Bytes']>;
  caller?: Maybe<Scalars['avalanche_Bytes']>;
  transactionHash?: Maybe<Scalars['avalanche_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['avalanche_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type avalanche_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_RelayerFee_filter>;
};

export type avalanche_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['avalanche_Bytes']>;
  transferId_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<avalanche_TransferStatus>;
  status_not?: InputMaybe<avalanche_TransferStatus>;
  status_in?: InputMaybe<Array<avalanche_TransferStatus>>;
  status_not_in?: InputMaybe<Array<avalanche_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['avalanche_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
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
  to?: InputMaybe<Scalars['avalanche_Bytes']>;
  to_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  to_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  to_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  to_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  to_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  to_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  delegate?: InputMaybe<Scalars['avalanche_Bytes']>;
  delegate_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['avalanche_Bytes']>;
  callData_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  callData_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  callData_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  callData_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  callData_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['avalanche_Bytes']>;
  originSender_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['avalanche_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
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
  asset_?: InputMaybe<avalanche_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
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
  message_?: InputMaybe<avalanche_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<avalanche_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['avalanche_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['avalanche_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<avalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<avalanche_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<avalanche_OriginTransfer_filter>>>;
};

export type avalanche_OriginTransfer_orderBy =
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
  avalanche_asset?: Maybe<avalanche_Asset>;
  avalanche_assets: Array<avalanche_Asset>;
  avalanche_assetStatus?: Maybe<avalanche_AssetStatus>;
  avalanche_assetStatuses: Array<avalanche_AssetStatus>;
  avalanche_assetBalance?: Maybe<avalanche_AssetBalance>;
  avalanche_assetBalances: Array<avalanche_AssetBalance>;
  avalanche_router?: Maybe<avalanche_Router>;
  avalanche_routers: Array<avalanche_Router>;
  avalanche_routerDailyTVL?: Maybe<avalanche_RouterDailyTVL>;
  avalanche_routerDailyTVLs: Array<avalanche_RouterDailyTVL>;
  avalanche_routerLiquidityEvent?: Maybe<avalanche_RouterLiquidityEvent>;
  avalanche_routerLiquidityEvents: Array<avalanche_RouterLiquidityEvent>;
  avalanche_setting?: Maybe<avalanche_Setting>;
  avalanche_settings: Array<avalanche_Setting>;
  avalanche_relayer?: Maybe<avalanche_Relayer>;
  avalanche_relayers: Array<avalanche_Relayer>;
  avalanche_sequencer?: Maybe<avalanche_Sequencer>;
  avalanche_sequencers: Array<avalanche_Sequencer>;
  avalanche_relayerFee?: Maybe<avalanche_RelayerFee>;
  avalanche_relayerFees: Array<avalanche_RelayerFee>;
  avalanche_originTransfer?: Maybe<avalanche_OriginTransfer>;
  avalanche_originTransfers: Array<avalanche_OriginTransfer>;
  avalanche_destinationTransfer?: Maybe<avalanche_DestinationTransfer>;
  avalanche_destinationTransfers: Array<avalanche_DestinationTransfer>;
  avalanche_originMessage?: Maybe<avalanche_OriginMessage>;
  avalanche_originMessages: Array<avalanche_OriginMessage>;
  avalanche_aggregateRoot?: Maybe<avalanche_AggregateRoot>;
  avalanche_aggregateRoots: Array<avalanche_AggregateRoot>;
  avalanche_connectorMeta?: Maybe<avalanche_ConnectorMeta>;
  avalanche_connectorMetas: Array<avalanche_ConnectorMeta>;
  avalanche_rootCount?: Maybe<avalanche_RootCount>;
  avalanche_rootCounts: Array<avalanche_RootCount>;
  avalanche_rootMessageSent?: Maybe<avalanche_RootMessageSent>;
  avalanche_rootMessageSents: Array<avalanche_RootMessageSent>;
  avalanche_relayerFeesIncrease?: Maybe<avalanche_RelayerFeesIncrease>;
  avalanche_relayerFeesIncreases: Array<avalanche_RelayerFeesIncrease>;
  avalanche_slippageUpdate?: Maybe<avalanche_SlippageUpdate>;
  avalanche_slippageUpdates: Array<avalanche_SlippageUpdate>;
  avalanche_snapshotRoot?: Maybe<avalanche_SnapshotRoot>;
  avalanche_snapshotRoots: Array<avalanche_SnapshotRoot>;
  avalanche_spokeConnectorMode?: Maybe<avalanche_SpokeConnectorMode>;
  avalanche_spokeConnectorModes: Array<avalanche_SpokeConnectorMode>;
  avalanche_aggregateRootProposed?: Maybe<avalanche_AggregateRootProposed>;
  avalanche_aggregateRootProposeds: Array<avalanche_AggregateRootProposed>;
  avalanche_optimisticRootFinalized?: Maybe<avalanche_OptimisticRootFinalized>;
  avalanche_optimisticRootFinalizeds: Array<avalanche_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  avalanche__meta?: Maybe<avalanche__Meta_>;
};


export type Queryavalanche_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_Asset_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_Asset_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_AssetStatus_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_AssetBalance_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_Router_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_Router_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_RouterDailyTVL_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_RouterLiquidityEvent_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_Setting_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_Setting_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_Relayer_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_Relayer_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_Sequencer_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_Sequencer_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_RelayerFee_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_OriginTransfer_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_DestinationTransfer_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_OriginMessage_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_AggregateRoot_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_ConnectorMeta_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_RootCount_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_RootCount_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_RootMessageSent_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_RelayerFeesIncrease_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_SlippageUpdate_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_SnapshotRoot_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_SpokeConnectorMode_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_AggregateRootProposed_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_OptimisticRootFinalized_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryavalanche__metaArgs = {
  block?: InputMaybe<avalanche_Block_height>;
};

export type avalanche_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['avalanche_Bytes']>;
};

export type avalanche_RelayerFee = {
  id: Scalars['ID'];
  transfer: avalanche_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['avalanche_Bytes'];
};

export type avalanche_RelayerFee_filter = {
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
  transfer_?: InputMaybe<avalanche_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['avalanche_Bytes']>;
  asset_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  asset_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  asset_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  asset_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  asset_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<avalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<avalanche_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<avalanche_RelayerFee_filter>>>;
};

export type avalanche_RelayerFee_orderBy =
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

export type avalanche_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: avalanche_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['avalanche_Bytes']>;
  caller: Scalars['avalanche_Bytes'];
  transactionHash: Scalars['avalanche_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type avalanche_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<avalanche_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['avalanche_Bytes']>;
  asset_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  asset_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  asset_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  asset_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  asset_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
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
  _change_block?: InputMaybe<avalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<avalanche_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<avalanche_RelayerFeesIncrease_filter>>>;
};

export type avalanche_RelayerFeesIncrease_orderBy =
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

export type avalanche_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['avalanche_Bytes']>;
  relayer_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<avalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<avalanche_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<avalanche_Relayer_filter>>>;
};

export type avalanche_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type avalanche_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type avalanche_RootCount_filter = {
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
  _change_block?: InputMaybe<avalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<avalanche_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<avalanche_RootCount_filter>>>;
};

export type avalanche_RootCount_orderBy =
  | 'id'
  | 'count';

export type avalanche_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['avalanche_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['avalanche_Bytes']>;
  transactionHash?: Maybe<Scalars['avalanche_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type avalanche_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  root_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
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
  _change_block?: InputMaybe<avalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<avalanche_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<avalanche_RootMessageSent_filter>>>;
};

export type avalanche_RootMessageSent_orderBy =
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

export type avalanche_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['avalanche_Bytes']>;
  recipient?: Maybe<Scalars['avalanche_Bytes']>;
  proposedOwner?: Maybe<Scalars['avalanche_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<avalanche_AssetBalance>;
};


export type avalanche_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_AssetBalance_filter>;
};

export type avalanche_RouterDailyTVL = {
  id: Scalars['ID'];
  router: avalanche_Router;
  asset: avalanche_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type avalanche_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<avalanche_Router_filter>;
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
  asset_?: InputMaybe<avalanche_Asset_filter>;
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
  _change_block?: InputMaybe<avalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<avalanche_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<avalanche_RouterDailyTVL_filter>>>;
};

export type avalanche_RouterDailyTVL_orderBy =
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

export type avalanche_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<avalanche_RouterLiquidityEventType>;
  router: avalanche_Router;
  asset: avalanche_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['avalanche_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['avalanche_Bytes'];
  nonce: Scalars['BigInt'];
};

export type avalanche_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type avalanche_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<avalanche_RouterLiquidityEventType>;
  type_not?: InputMaybe<avalanche_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<avalanche_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<avalanche_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<avalanche_Router_filter>;
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
  asset_?: InputMaybe<avalanche_Asset_filter>;
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
  caller?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<avalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<avalanche_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<avalanche_RouterLiquidityEvent_filter>>>;
};

export type avalanche_RouterLiquidityEvent_orderBy =
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

export type avalanche_Router_filter = {
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
  owner?: InputMaybe<Scalars['avalanche_Bytes']>;
  owner_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  owner_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  owner_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  owner_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  owner_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  recipient?: InputMaybe<Scalars['avalanche_Bytes']>;
  recipient_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['avalanche_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<avalanche_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<avalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<avalanche_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<avalanche_Router_filter>>>;
};

export type avalanche_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type avalanche_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['avalanche_Bytes']>;
};

export type avalanche_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['avalanche_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<avalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<avalanche_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<avalanche_Sequencer_filter>>>;
};

export type avalanche_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type avalanche_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['avalanche_Bytes'];
};

export type avalanche_Setting_filter = {
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
  caller?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<avalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<avalanche_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<avalanche_Setting_filter>>>;
};

export type avalanche_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type avalanche_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: avalanche_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['avalanche_Bytes'];
  transactionHash: Scalars['avalanche_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type avalanche_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<avalanche_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
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
  _change_block?: InputMaybe<avalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<avalanche_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<avalanche_SlippageUpdate_filter>>>;
};

export type avalanche_SlippageUpdate_orderBy =
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

export type avalanche_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['avalanche_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type avalanche_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_not?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_gt?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_lt?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_gte?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_lte?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['avalanche_Bytes']>>;
  root_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['avalanche_Bytes']>;
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
  _change_block?: InputMaybe<avalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<avalanche_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<avalanche_SnapshotRoot_filter>>>;
};

export type avalanche_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type avalanche_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type avalanche_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<avalanche_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<avalanche_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<avalanche_SpokeConnectorMode_filter>>>;
};

export type avalanche_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  avalanche_asset?: Maybe<avalanche_Asset>;
  avalanche_assets: Array<avalanche_Asset>;
  avalanche_assetStatus?: Maybe<avalanche_AssetStatus>;
  avalanche_assetStatuses: Array<avalanche_AssetStatus>;
  avalanche_assetBalance?: Maybe<avalanche_AssetBalance>;
  avalanche_assetBalances: Array<avalanche_AssetBalance>;
  avalanche_router?: Maybe<avalanche_Router>;
  avalanche_routers: Array<avalanche_Router>;
  avalanche_routerDailyTVL?: Maybe<avalanche_RouterDailyTVL>;
  avalanche_routerDailyTVLs: Array<avalanche_RouterDailyTVL>;
  avalanche_routerLiquidityEvent?: Maybe<avalanche_RouterLiquidityEvent>;
  avalanche_routerLiquidityEvents: Array<avalanche_RouterLiquidityEvent>;
  avalanche_setting?: Maybe<avalanche_Setting>;
  avalanche_settings: Array<avalanche_Setting>;
  avalanche_relayer?: Maybe<avalanche_Relayer>;
  avalanche_relayers: Array<avalanche_Relayer>;
  avalanche_sequencer?: Maybe<avalanche_Sequencer>;
  avalanche_sequencers: Array<avalanche_Sequencer>;
  avalanche_relayerFee?: Maybe<avalanche_RelayerFee>;
  avalanche_relayerFees: Array<avalanche_RelayerFee>;
  avalanche_originTransfer?: Maybe<avalanche_OriginTransfer>;
  avalanche_originTransfers: Array<avalanche_OriginTransfer>;
  avalanche_destinationTransfer?: Maybe<avalanche_DestinationTransfer>;
  avalanche_destinationTransfers: Array<avalanche_DestinationTransfer>;
  avalanche_originMessage?: Maybe<avalanche_OriginMessage>;
  avalanche_originMessages: Array<avalanche_OriginMessage>;
  avalanche_aggregateRoot?: Maybe<avalanche_AggregateRoot>;
  avalanche_aggregateRoots: Array<avalanche_AggregateRoot>;
  avalanche_connectorMeta?: Maybe<avalanche_ConnectorMeta>;
  avalanche_connectorMetas: Array<avalanche_ConnectorMeta>;
  avalanche_rootCount?: Maybe<avalanche_RootCount>;
  avalanche_rootCounts: Array<avalanche_RootCount>;
  avalanche_rootMessageSent?: Maybe<avalanche_RootMessageSent>;
  avalanche_rootMessageSents: Array<avalanche_RootMessageSent>;
  avalanche_relayerFeesIncrease?: Maybe<avalanche_RelayerFeesIncrease>;
  avalanche_relayerFeesIncreases: Array<avalanche_RelayerFeesIncrease>;
  avalanche_slippageUpdate?: Maybe<avalanche_SlippageUpdate>;
  avalanche_slippageUpdates: Array<avalanche_SlippageUpdate>;
  avalanche_snapshotRoot?: Maybe<avalanche_SnapshotRoot>;
  avalanche_snapshotRoots: Array<avalanche_SnapshotRoot>;
  avalanche_spokeConnectorMode?: Maybe<avalanche_SpokeConnectorMode>;
  avalanche_spokeConnectorModes: Array<avalanche_SpokeConnectorMode>;
  avalanche_aggregateRootProposed?: Maybe<avalanche_AggregateRootProposed>;
  avalanche_aggregateRootProposeds: Array<avalanche_AggregateRootProposed>;
  avalanche_optimisticRootFinalized?: Maybe<avalanche_OptimisticRootFinalized>;
  avalanche_optimisticRootFinalizeds: Array<avalanche_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  avalanche__meta?: Maybe<avalanche__Meta_>;
};


export type Subscriptionavalanche_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_Asset_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_Asset_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_AssetStatus_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_AssetBalance_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_Router_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_Router_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_RouterDailyTVL_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_RouterLiquidityEvent_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_Setting_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_Setting_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_Relayer_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_Relayer_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_Sequencer_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_Sequencer_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_RelayerFee_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_OriginTransfer_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_DestinationTransfer_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_OriginMessage_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_AggregateRoot_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_ConnectorMeta_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_RootCount_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_RootCount_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_RootMessageSent_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_RelayerFeesIncrease_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_SlippageUpdate_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_SnapshotRoot_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_SpokeConnectorMode_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_AggregateRootProposed_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<avalanche_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<avalanche_OrderDirection>;
  where?: InputMaybe<avalanche_OptimisticRootFinalized_filter>;
  block?: InputMaybe<avalanche_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionavalanche__metaArgs = {
  block?: InputMaybe<avalanche_Block_height>;
};

export type avalanche_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type avalanche__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['avalanche_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type avalanche__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: avalanche__Block_;
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
  avalanche_asset: InContextSdkMethod<Query['avalanche_asset'], Queryavalanche_assetArgs, MeshContext>,
  /** null **/
  avalanche_assets: InContextSdkMethod<Query['avalanche_assets'], Queryavalanche_assetsArgs, MeshContext>,
  /** null **/
  avalanche_assetStatus: InContextSdkMethod<Query['avalanche_assetStatus'], Queryavalanche_assetStatusArgs, MeshContext>,
  /** null **/
  avalanche_assetStatuses: InContextSdkMethod<Query['avalanche_assetStatuses'], Queryavalanche_assetStatusesArgs, MeshContext>,
  /** null **/
  avalanche_assetBalance: InContextSdkMethod<Query['avalanche_assetBalance'], Queryavalanche_assetBalanceArgs, MeshContext>,
  /** null **/
  avalanche_assetBalances: InContextSdkMethod<Query['avalanche_assetBalances'], Queryavalanche_assetBalancesArgs, MeshContext>,
  /** null **/
  avalanche_router: InContextSdkMethod<Query['avalanche_router'], Queryavalanche_routerArgs, MeshContext>,
  /** null **/
  avalanche_routers: InContextSdkMethod<Query['avalanche_routers'], Queryavalanche_routersArgs, MeshContext>,
  /** null **/
  avalanche_routerDailyTVL: InContextSdkMethod<Query['avalanche_routerDailyTVL'], Queryavalanche_routerDailyTVLArgs, MeshContext>,
  /** null **/
  avalanche_routerDailyTVLs: InContextSdkMethod<Query['avalanche_routerDailyTVLs'], Queryavalanche_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  avalanche_routerLiquidityEvent: InContextSdkMethod<Query['avalanche_routerLiquidityEvent'], Queryavalanche_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  avalanche_routerLiquidityEvents: InContextSdkMethod<Query['avalanche_routerLiquidityEvents'], Queryavalanche_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  avalanche_setting: InContextSdkMethod<Query['avalanche_setting'], Queryavalanche_settingArgs, MeshContext>,
  /** null **/
  avalanche_settings: InContextSdkMethod<Query['avalanche_settings'], Queryavalanche_settingsArgs, MeshContext>,
  /** null **/
  avalanche_relayer: InContextSdkMethod<Query['avalanche_relayer'], Queryavalanche_relayerArgs, MeshContext>,
  /** null **/
  avalanche_relayers: InContextSdkMethod<Query['avalanche_relayers'], Queryavalanche_relayersArgs, MeshContext>,
  /** null **/
  avalanche_sequencer: InContextSdkMethod<Query['avalanche_sequencer'], Queryavalanche_sequencerArgs, MeshContext>,
  /** null **/
  avalanche_sequencers: InContextSdkMethod<Query['avalanche_sequencers'], Queryavalanche_sequencersArgs, MeshContext>,
  /** null **/
  avalanche_relayerFee: InContextSdkMethod<Query['avalanche_relayerFee'], Queryavalanche_relayerFeeArgs, MeshContext>,
  /** null **/
  avalanche_relayerFees: InContextSdkMethod<Query['avalanche_relayerFees'], Queryavalanche_relayerFeesArgs, MeshContext>,
  /** null **/
  avalanche_originTransfer: InContextSdkMethod<Query['avalanche_originTransfer'], Queryavalanche_originTransferArgs, MeshContext>,
  /** null **/
  avalanche_originTransfers: InContextSdkMethod<Query['avalanche_originTransfers'], Queryavalanche_originTransfersArgs, MeshContext>,
  /** null **/
  avalanche_destinationTransfer: InContextSdkMethod<Query['avalanche_destinationTransfer'], Queryavalanche_destinationTransferArgs, MeshContext>,
  /** null **/
  avalanche_destinationTransfers: InContextSdkMethod<Query['avalanche_destinationTransfers'], Queryavalanche_destinationTransfersArgs, MeshContext>,
  /** null **/
  avalanche_originMessage: InContextSdkMethod<Query['avalanche_originMessage'], Queryavalanche_originMessageArgs, MeshContext>,
  /** null **/
  avalanche_originMessages: InContextSdkMethod<Query['avalanche_originMessages'], Queryavalanche_originMessagesArgs, MeshContext>,
  /** null **/
  avalanche_aggregateRoot: InContextSdkMethod<Query['avalanche_aggregateRoot'], Queryavalanche_aggregateRootArgs, MeshContext>,
  /** null **/
  avalanche_aggregateRoots: InContextSdkMethod<Query['avalanche_aggregateRoots'], Queryavalanche_aggregateRootsArgs, MeshContext>,
  /** null **/
  avalanche_connectorMeta: InContextSdkMethod<Query['avalanche_connectorMeta'], Queryavalanche_connectorMetaArgs, MeshContext>,
  /** null **/
  avalanche_connectorMetas: InContextSdkMethod<Query['avalanche_connectorMetas'], Queryavalanche_connectorMetasArgs, MeshContext>,
  /** null **/
  avalanche_rootCount: InContextSdkMethod<Query['avalanche_rootCount'], Queryavalanche_rootCountArgs, MeshContext>,
  /** null **/
  avalanche_rootCounts: InContextSdkMethod<Query['avalanche_rootCounts'], Queryavalanche_rootCountsArgs, MeshContext>,
  /** null **/
  avalanche_rootMessageSent: InContextSdkMethod<Query['avalanche_rootMessageSent'], Queryavalanche_rootMessageSentArgs, MeshContext>,
  /** null **/
  avalanche_rootMessageSents: InContextSdkMethod<Query['avalanche_rootMessageSents'], Queryavalanche_rootMessageSentsArgs, MeshContext>,
  /** null **/
  avalanche_relayerFeesIncrease: InContextSdkMethod<Query['avalanche_relayerFeesIncrease'], Queryavalanche_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  avalanche_relayerFeesIncreases: InContextSdkMethod<Query['avalanche_relayerFeesIncreases'], Queryavalanche_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  avalanche_slippageUpdate: InContextSdkMethod<Query['avalanche_slippageUpdate'], Queryavalanche_slippageUpdateArgs, MeshContext>,
  /** null **/
  avalanche_slippageUpdates: InContextSdkMethod<Query['avalanche_slippageUpdates'], Queryavalanche_slippageUpdatesArgs, MeshContext>,
  /** null **/
  avalanche_snapshotRoot: InContextSdkMethod<Query['avalanche_snapshotRoot'], Queryavalanche_snapshotRootArgs, MeshContext>,
  /** null **/
  avalanche_snapshotRoots: InContextSdkMethod<Query['avalanche_snapshotRoots'], Queryavalanche_snapshotRootsArgs, MeshContext>,
  /** null **/
  avalanche_spokeConnectorMode: InContextSdkMethod<Query['avalanche_spokeConnectorMode'], Queryavalanche_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  avalanche_spokeConnectorModes: InContextSdkMethod<Query['avalanche_spokeConnectorModes'], Queryavalanche_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  avalanche_aggregateRootProposed: InContextSdkMethod<Query['avalanche_aggregateRootProposed'], Queryavalanche_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  avalanche_aggregateRootProposeds: InContextSdkMethod<Query['avalanche_aggregateRootProposeds'], Queryavalanche_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  avalanche_optimisticRootFinalized: InContextSdkMethod<Query['avalanche_optimisticRootFinalized'], Queryavalanche_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  avalanche_optimisticRootFinalizeds: InContextSdkMethod<Query['avalanche_optimisticRootFinalizeds'], Queryavalanche_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  avalanche__meta: InContextSdkMethod<Query['avalanche__meta'], Queryavalanche__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  avalanche_asset: InContextSdkMethod<Subscription['avalanche_asset'], Subscriptionavalanche_assetArgs, MeshContext>,
  /** null **/
  avalanche_assets: InContextSdkMethod<Subscription['avalanche_assets'], Subscriptionavalanche_assetsArgs, MeshContext>,
  /** null **/
  avalanche_assetStatus: InContextSdkMethod<Subscription['avalanche_assetStatus'], Subscriptionavalanche_assetStatusArgs, MeshContext>,
  /** null **/
  avalanche_assetStatuses: InContextSdkMethod<Subscription['avalanche_assetStatuses'], Subscriptionavalanche_assetStatusesArgs, MeshContext>,
  /** null **/
  avalanche_assetBalance: InContextSdkMethod<Subscription['avalanche_assetBalance'], Subscriptionavalanche_assetBalanceArgs, MeshContext>,
  /** null **/
  avalanche_assetBalances: InContextSdkMethod<Subscription['avalanche_assetBalances'], Subscriptionavalanche_assetBalancesArgs, MeshContext>,
  /** null **/
  avalanche_router: InContextSdkMethod<Subscription['avalanche_router'], Subscriptionavalanche_routerArgs, MeshContext>,
  /** null **/
  avalanche_routers: InContextSdkMethod<Subscription['avalanche_routers'], Subscriptionavalanche_routersArgs, MeshContext>,
  /** null **/
  avalanche_routerDailyTVL: InContextSdkMethod<Subscription['avalanche_routerDailyTVL'], Subscriptionavalanche_routerDailyTVLArgs, MeshContext>,
  /** null **/
  avalanche_routerDailyTVLs: InContextSdkMethod<Subscription['avalanche_routerDailyTVLs'], Subscriptionavalanche_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  avalanche_routerLiquidityEvent: InContextSdkMethod<Subscription['avalanche_routerLiquidityEvent'], Subscriptionavalanche_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  avalanche_routerLiquidityEvents: InContextSdkMethod<Subscription['avalanche_routerLiquidityEvents'], Subscriptionavalanche_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  avalanche_setting: InContextSdkMethod<Subscription['avalanche_setting'], Subscriptionavalanche_settingArgs, MeshContext>,
  /** null **/
  avalanche_settings: InContextSdkMethod<Subscription['avalanche_settings'], Subscriptionavalanche_settingsArgs, MeshContext>,
  /** null **/
  avalanche_relayer: InContextSdkMethod<Subscription['avalanche_relayer'], Subscriptionavalanche_relayerArgs, MeshContext>,
  /** null **/
  avalanche_relayers: InContextSdkMethod<Subscription['avalanche_relayers'], Subscriptionavalanche_relayersArgs, MeshContext>,
  /** null **/
  avalanche_sequencer: InContextSdkMethod<Subscription['avalanche_sequencer'], Subscriptionavalanche_sequencerArgs, MeshContext>,
  /** null **/
  avalanche_sequencers: InContextSdkMethod<Subscription['avalanche_sequencers'], Subscriptionavalanche_sequencersArgs, MeshContext>,
  /** null **/
  avalanche_relayerFee: InContextSdkMethod<Subscription['avalanche_relayerFee'], Subscriptionavalanche_relayerFeeArgs, MeshContext>,
  /** null **/
  avalanche_relayerFees: InContextSdkMethod<Subscription['avalanche_relayerFees'], Subscriptionavalanche_relayerFeesArgs, MeshContext>,
  /** null **/
  avalanche_originTransfer: InContextSdkMethod<Subscription['avalanche_originTransfer'], Subscriptionavalanche_originTransferArgs, MeshContext>,
  /** null **/
  avalanche_originTransfers: InContextSdkMethod<Subscription['avalanche_originTransfers'], Subscriptionavalanche_originTransfersArgs, MeshContext>,
  /** null **/
  avalanche_destinationTransfer: InContextSdkMethod<Subscription['avalanche_destinationTransfer'], Subscriptionavalanche_destinationTransferArgs, MeshContext>,
  /** null **/
  avalanche_destinationTransfers: InContextSdkMethod<Subscription['avalanche_destinationTransfers'], Subscriptionavalanche_destinationTransfersArgs, MeshContext>,
  /** null **/
  avalanche_originMessage: InContextSdkMethod<Subscription['avalanche_originMessage'], Subscriptionavalanche_originMessageArgs, MeshContext>,
  /** null **/
  avalanche_originMessages: InContextSdkMethod<Subscription['avalanche_originMessages'], Subscriptionavalanche_originMessagesArgs, MeshContext>,
  /** null **/
  avalanche_aggregateRoot: InContextSdkMethod<Subscription['avalanche_aggregateRoot'], Subscriptionavalanche_aggregateRootArgs, MeshContext>,
  /** null **/
  avalanche_aggregateRoots: InContextSdkMethod<Subscription['avalanche_aggregateRoots'], Subscriptionavalanche_aggregateRootsArgs, MeshContext>,
  /** null **/
  avalanche_connectorMeta: InContextSdkMethod<Subscription['avalanche_connectorMeta'], Subscriptionavalanche_connectorMetaArgs, MeshContext>,
  /** null **/
  avalanche_connectorMetas: InContextSdkMethod<Subscription['avalanche_connectorMetas'], Subscriptionavalanche_connectorMetasArgs, MeshContext>,
  /** null **/
  avalanche_rootCount: InContextSdkMethod<Subscription['avalanche_rootCount'], Subscriptionavalanche_rootCountArgs, MeshContext>,
  /** null **/
  avalanche_rootCounts: InContextSdkMethod<Subscription['avalanche_rootCounts'], Subscriptionavalanche_rootCountsArgs, MeshContext>,
  /** null **/
  avalanche_rootMessageSent: InContextSdkMethod<Subscription['avalanche_rootMessageSent'], Subscriptionavalanche_rootMessageSentArgs, MeshContext>,
  /** null **/
  avalanche_rootMessageSents: InContextSdkMethod<Subscription['avalanche_rootMessageSents'], Subscriptionavalanche_rootMessageSentsArgs, MeshContext>,
  /** null **/
  avalanche_relayerFeesIncrease: InContextSdkMethod<Subscription['avalanche_relayerFeesIncrease'], Subscriptionavalanche_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  avalanche_relayerFeesIncreases: InContextSdkMethod<Subscription['avalanche_relayerFeesIncreases'], Subscriptionavalanche_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  avalanche_slippageUpdate: InContextSdkMethod<Subscription['avalanche_slippageUpdate'], Subscriptionavalanche_slippageUpdateArgs, MeshContext>,
  /** null **/
  avalanche_slippageUpdates: InContextSdkMethod<Subscription['avalanche_slippageUpdates'], Subscriptionavalanche_slippageUpdatesArgs, MeshContext>,
  /** null **/
  avalanche_snapshotRoot: InContextSdkMethod<Subscription['avalanche_snapshotRoot'], Subscriptionavalanche_snapshotRootArgs, MeshContext>,
  /** null **/
  avalanche_snapshotRoots: InContextSdkMethod<Subscription['avalanche_snapshotRoots'], Subscriptionavalanche_snapshotRootsArgs, MeshContext>,
  /** null **/
  avalanche_spokeConnectorMode: InContextSdkMethod<Subscription['avalanche_spokeConnectorMode'], Subscriptionavalanche_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  avalanche_spokeConnectorModes: InContextSdkMethod<Subscription['avalanche_spokeConnectorModes'], Subscriptionavalanche_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  avalanche_aggregateRootProposed: InContextSdkMethod<Subscription['avalanche_aggregateRootProposed'], Subscriptionavalanche_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  avalanche_aggregateRootProposeds: InContextSdkMethod<Subscription['avalanche_aggregateRootProposeds'], Subscriptionavalanche_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  avalanche_optimisticRootFinalized: InContextSdkMethod<Subscription['avalanche_optimisticRootFinalized'], Subscriptionavalanche_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  avalanche_optimisticRootFinalizeds: InContextSdkMethod<Subscription['avalanche_optimisticRootFinalizeds'], Subscriptionavalanche_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  avalanche__meta: InContextSdkMethod<Subscription['avalanche__meta'], Subscriptionavalanche__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Avalanche"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
