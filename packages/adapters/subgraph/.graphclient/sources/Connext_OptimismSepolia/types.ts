// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextOptimismSepoliaTypes {
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
  optimismsepolia_BigDecimal: any;
  BigInt: any;
  optimismsepolia_Bytes: any;
  optimismsepolia_Int8: any;
  Timestamp: any;
};

export type optimismsepolia_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['optimismsepolia_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type optimismsepolia_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['optimismsepolia_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type optimismsepolia_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
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
  _change_block?: InputMaybe<optimismsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismsepolia_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismsepolia_AggregateRootProposed_filter>>>;
};

export type optimismsepolia_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type optimismsepolia_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  root_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismsepolia_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismsepolia_AggregateRoot_filter>>>;
};

export type optimismsepolia_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type optimismsepolia_Aggregation_interval =
  | 'hour'
  | 'day';

export type optimismsepolia_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['optimismsepolia_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['optimismsepolia_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['optimismsepolia_Bytes']>;
  localAsset?: Maybe<Scalars['optimismsepolia_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<optimismsepolia_AssetStatus>;
};

export type optimismsepolia_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: optimismsepolia_Router;
  asset: optimismsepolia_Asset;
  feesEarned: Scalars['BigInt'];
};

export type optimismsepolia_AssetBalance_filter = {
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
  router_?: InputMaybe<optimismsepolia_Router_filter>;
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
  asset_?: InputMaybe<optimismsepolia_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismsepolia_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismsepolia_AssetBalance_filter>>>;
};

export type optimismsepolia_AssetBalance_orderBy =
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

export type optimismsepolia_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type optimismsepolia_AssetStatus_filter = {
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
  _change_block?: InputMaybe<optimismsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismsepolia_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismsepolia_AssetStatus_filter>>>;
};

export type optimismsepolia_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type optimismsepolia_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  key_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  key_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  key_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  key_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  key_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  key_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  localAsset?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
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
  status_?: InputMaybe<optimismsepolia_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismsepolia_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismsepolia_Asset_filter>>>;
};

export type optimismsepolia_Asset_orderBy =
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

export type optimismsepolia_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type optimismsepolia_Block_height = {
  hash?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type optimismsepolia_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['optimismsepolia_Bytes']>;
  rootManager?: Maybe<Scalars['optimismsepolia_Bytes']>;
  mirrorConnector?: Maybe<Scalars['optimismsepolia_Bytes']>;
};

export type optimismsepolia_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  amb_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  amb_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  amb_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  amb_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  amb_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  rootManager?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismsepolia_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismsepolia_ConnectorMeta_filter>>>;
};

export type optimismsepolia_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type optimismsepolia_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['optimismsepolia_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<optimismsepolia_TransferStatus>;
  routers?: Maybe<Array<optimismsepolia_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['optimismsepolia_Bytes']>;
  delegate?: Maybe<Scalars['optimismsepolia_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['optimismsepolia_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['optimismsepolia_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['optimismsepolia_Bytes']>;
  asset?: Maybe<optimismsepolia_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['optimismsepolia_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['optimismsepolia_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['optimismsepolia_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['optimismsepolia_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['optimismsepolia_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['optimismsepolia_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type optimismsepolia_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_Router_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_Router_filter>;
};

export type optimismsepolia_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transferId_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<optimismsepolia_TransferStatus>;
  status_not?: InputMaybe<optimismsepolia_TransferStatus>;
  status_in?: InputMaybe<Array<optimismsepolia_TransferStatus>>;
  status_not_in?: InputMaybe<Array<optimismsepolia_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<optimismsepolia_Router_filter>;
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
  to?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  to_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  to_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  to_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  to_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  to_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  to_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  delegate?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  delegate_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  callData_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  callData_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  callData_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  callData_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  callData_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
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
  originSender?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  originSender_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
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
  asset_?: InputMaybe<optimismsepolia_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismsepolia_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismsepolia_DestinationTransfer_filter>>>;
};

export type optimismsepolia_DestinationTransfer_orderBy =
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

export type optimismsepolia_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['optimismsepolia_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type optimismsepolia_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
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
  _change_block?: InputMaybe<optimismsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismsepolia_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismsepolia_OptimisticRootFinalized_filter>>>;
};

export type optimismsepolia_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type optimismsepolia_OrderDirection =
  | 'asc'
  | 'desc';

export type optimismsepolia_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['optimismsepolia_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['optimismsepolia_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['optimismsepolia_Bytes']>;
  root?: Maybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash?: Maybe<Scalars['optimismsepolia_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<optimismsepolia_RootCount>;
};

export type optimismsepolia_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transferId_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  leaf_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  message_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  message_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  message_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  message_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  message_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  message_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  root_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
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
  rootCount_?: InputMaybe<optimismsepolia_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismsepolia_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismsepolia_OriginMessage_filter>>>;
};

export type optimismsepolia_OriginMessage_orderBy =
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

export type optimismsepolia_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['optimismsepolia_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<optimismsepolia_TransferStatus>;
  messageHash?: Maybe<Scalars['optimismsepolia_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['optimismsepolia_Bytes']>;
  delegate?: Maybe<Scalars['optimismsepolia_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['optimismsepolia_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['optimismsepolia_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['optimismsepolia_Bytes']>;
  asset?: Maybe<optimismsepolia_Asset>;
  transactingAsset?: Maybe<Scalars['optimismsepolia_Bytes']>;
  message?: Maybe<optimismsepolia_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<optimismsepolia_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['optimismsepolia_Bytes']>;
  caller?: Maybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash?: Maybe<Scalars['optimismsepolia_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['optimismsepolia_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type optimismsepolia_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_RelayerFee_filter>;
};

export type optimismsepolia_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transferId_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<optimismsepolia_TransferStatus>;
  status_not?: InputMaybe<optimismsepolia_TransferStatus>;
  status_in?: InputMaybe<Array<optimismsepolia_TransferStatus>>;
  status_not_in?: InputMaybe<Array<optimismsepolia_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
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
  to?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  to_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  to_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  to_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  to_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  to_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  to_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  delegate?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  delegate_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  callData_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  callData_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  callData_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  callData_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  callData_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  originSender_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
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
  asset_?: InputMaybe<optimismsepolia_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
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
  message_?: InputMaybe<optimismsepolia_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<optimismsepolia_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismsepolia_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismsepolia_OriginTransfer_filter>>>;
};

export type optimismsepolia_OriginTransfer_orderBy =
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
  optimismsepolia_asset?: Maybe<optimismsepolia_Asset>;
  optimismsepolia_assets: Array<optimismsepolia_Asset>;
  optimismsepolia_assetStatus?: Maybe<optimismsepolia_AssetStatus>;
  optimismsepolia_assetStatuses: Array<optimismsepolia_AssetStatus>;
  optimismsepolia_assetBalance?: Maybe<optimismsepolia_AssetBalance>;
  optimismsepolia_assetBalances: Array<optimismsepolia_AssetBalance>;
  optimismsepolia_router?: Maybe<optimismsepolia_Router>;
  optimismsepolia_routers: Array<optimismsepolia_Router>;
  optimismsepolia_routerDailyTVL?: Maybe<optimismsepolia_RouterDailyTVL>;
  optimismsepolia_routerDailyTVLs: Array<optimismsepolia_RouterDailyTVL>;
  optimismsepolia_routerLiquidityEvent?: Maybe<optimismsepolia_RouterLiquidityEvent>;
  optimismsepolia_routerLiquidityEvents: Array<optimismsepolia_RouterLiquidityEvent>;
  optimismsepolia_setting?: Maybe<optimismsepolia_Setting>;
  optimismsepolia_settings: Array<optimismsepolia_Setting>;
  optimismsepolia_relayer?: Maybe<optimismsepolia_Relayer>;
  optimismsepolia_relayers: Array<optimismsepolia_Relayer>;
  optimismsepolia_sequencer?: Maybe<optimismsepolia_Sequencer>;
  optimismsepolia_sequencers: Array<optimismsepolia_Sequencer>;
  optimismsepolia_relayerFee?: Maybe<optimismsepolia_RelayerFee>;
  optimismsepolia_relayerFees: Array<optimismsepolia_RelayerFee>;
  optimismsepolia_originTransfer?: Maybe<optimismsepolia_OriginTransfer>;
  optimismsepolia_originTransfers: Array<optimismsepolia_OriginTransfer>;
  optimismsepolia_destinationTransfer?: Maybe<optimismsepolia_DestinationTransfer>;
  optimismsepolia_destinationTransfers: Array<optimismsepolia_DestinationTransfer>;
  optimismsepolia_originMessage?: Maybe<optimismsepolia_OriginMessage>;
  optimismsepolia_originMessages: Array<optimismsepolia_OriginMessage>;
  optimismsepolia_aggregateRoot?: Maybe<optimismsepolia_AggregateRoot>;
  optimismsepolia_aggregateRoots: Array<optimismsepolia_AggregateRoot>;
  optimismsepolia_connectorMeta?: Maybe<optimismsepolia_ConnectorMeta>;
  optimismsepolia_connectorMetas: Array<optimismsepolia_ConnectorMeta>;
  optimismsepolia_rootCount?: Maybe<optimismsepolia_RootCount>;
  optimismsepolia_rootCounts: Array<optimismsepolia_RootCount>;
  optimismsepolia_rootMessageSent?: Maybe<optimismsepolia_RootMessageSent>;
  optimismsepolia_rootMessageSents: Array<optimismsepolia_RootMessageSent>;
  optimismsepolia_relayerFeesIncrease?: Maybe<optimismsepolia_RelayerFeesIncrease>;
  optimismsepolia_relayerFeesIncreases: Array<optimismsepolia_RelayerFeesIncrease>;
  optimismsepolia_slippageUpdate?: Maybe<optimismsepolia_SlippageUpdate>;
  optimismsepolia_slippageUpdates: Array<optimismsepolia_SlippageUpdate>;
  optimismsepolia_snapshotRoot?: Maybe<optimismsepolia_SnapshotRoot>;
  optimismsepolia_snapshotRoots: Array<optimismsepolia_SnapshotRoot>;
  optimismsepolia_spokeConnectorMode?: Maybe<optimismsepolia_SpokeConnectorMode>;
  optimismsepolia_spokeConnectorModes: Array<optimismsepolia_SpokeConnectorMode>;
  optimismsepolia_aggregateRootProposed?: Maybe<optimismsepolia_AggregateRootProposed>;
  optimismsepolia_aggregateRootProposeds: Array<optimismsepolia_AggregateRootProposed>;
  optimismsepolia_optimisticRootFinalized?: Maybe<optimismsepolia_OptimisticRootFinalized>;
  optimismsepolia_optimisticRootFinalizeds: Array<optimismsepolia_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  optimismsepolia__meta?: Maybe<optimismsepolia__Meta_>;
};


export type Queryoptimismsepolia_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_Asset_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_Asset_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_AssetStatus_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_AssetBalance_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_Router_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_Router_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_RouterDailyTVL_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_RouterLiquidityEvent_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_Setting_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_Setting_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_Relayer_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_Relayer_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_Sequencer_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_Sequencer_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_RelayerFee_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_OriginTransfer_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_DestinationTransfer_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_OriginMessage_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_AggregateRoot_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_ConnectorMeta_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_RootCount_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_RootCount_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_RootMessageSent_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_RelayerFeesIncrease_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_SlippageUpdate_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_SnapshotRoot_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_SpokeConnectorMode_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_AggregateRootProposed_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_OptimisticRootFinalized_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismsepolia__metaArgs = {
  block?: InputMaybe<optimismsepolia_Block_height>;
};

export type optimismsepolia_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['optimismsepolia_Bytes']>;
};

export type optimismsepolia_RelayerFee = {
  id: Scalars['ID'];
  transfer: optimismsepolia_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['optimismsepolia_Bytes'];
};

export type optimismsepolia_RelayerFee_filter = {
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
  transfer_?: InputMaybe<optimismsepolia_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  asset_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  asset_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  asset_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  asset_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  asset_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismsepolia_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismsepolia_RelayerFee_filter>>>;
};

export type optimismsepolia_RelayerFee_orderBy =
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

export type optimismsepolia_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: optimismsepolia_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['optimismsepolia_Bytes']>;
  caller: Scalars['optimismsepolia_Bytes'];
  transactionHash: Scalars['optimismsepolia_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type optimismsepolia_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<optimismsepolia_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  asset_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  asset_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  asset_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  asset_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  asset_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
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
  _change_block?: InputMaybe<optimismsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismsepolia_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismsepolia_RelayerFeesIncrease_filter>>>;
};

export type optimismsepolia_RelayerFeesIncrease_orderBy =
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

export type optimismsepolia_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  relayer_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismsepolia_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismsepolia_Relayer_filter>>>;
};

export type optimismsepolia_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type optimismsepolia_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type optimismsepolia_RootCount_filter = {
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
  _change_block?: InputMaybe<optimismsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismsepolia_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismsepolia_RootCount_filter>>>;
};

export type optimismsepolia_RootCount_orderBy =
  | 'id'
  | 'count';

export type optimismsepolia_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['optimismsepolia_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash?: Maybe<Scalars['optimismsepolia_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type optimismsepolia_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  root_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
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
  _change_block?: InputMaybe<optimismsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismsepolia_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismsepolia_RootMessageSent_filter>>>;
};

export type optimismsepolia_RootMessageSent_orderBy =
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

export type optimismsepolia_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['optimismsepolia_Bytes']>;
  recipient?: Maybe<Scalars['optimismsepolia_Bytes']>;
  proposedOwner?: Maybe<Scalars['optimismsepolia_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<optimismsepolia_AssetBalance>;
};


export type optimismsepolia_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_AssetBalance_filter>;
};

export type optimismsepolia_RouterDailyTVL = {
  id: Scalars['ID'];
  router: optimismsepolia_Router;
  asset: optimismsepolia_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type optimismsepolia_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<optimismsepolia_Router_filter>;
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
  asset_?: InputMaybe<optimismsepolia_Asset_filter>;
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
  _change_block?: InputMaybe<optimismsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismsepolia_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismsepolia_RouterDailyTVL_filter>>>;
};

export type optimismsepolia_RouterDailyTVL_orderBy =
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

export type optimismsepolia_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<optimismsepolia_RouterLiquidityEventType>;
  router: optimismsepolia_Router;
  asset: optimismsepolia_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['optimismsepolia_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['optimismsepolia_Bytes'];
  nonce: Scalars['BigInt'];
};

export type optimismsepolia_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type optimismsepolia_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<optimismsepolia_RouterLiquidityEventType>;
  type_not?: InputMaybe<optimismsepolia_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<optimismsepolia_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<optimismsepolia_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<optimismsepolia_Router_filter>;
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
  asset_?: InputMaybe<optimismsepolia_Asset_filter>;
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
  caller?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismsepolia_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismsepolia_RouterLiquidityEvent_filter>>>;
};

export type optimismsepolia_RouterLiquidityEvent_orderBy =
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

export type optimismsepolia_Router_filter = {
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
  owner?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  owner_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  owner_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  owner_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  owner_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  owner_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  recipient?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  recipient_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<optimismsepolia_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismsepolia_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismsepolia_Router_filter>>>;
};

export type optimismsepolia_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type optimismsepolia_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['optimismsepolia_Bytes']>;
};

export type optimismsepolia_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismsepolia_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismsepolia_Sequencer_filter>>>;
};

export type optimismsepolia_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type optimismsepolia_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['optimismsepolia_Bytes'];
};

export type optimismsepolia_Setting_filter = {
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
  caller?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismsepolia_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismsepolia_Setting_filter>>>;
};

export type optimismsepolia_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type optimismsepolia_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: optimismsepolia_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['optimismsepolia_Bytes'];
  transactionHash: Scalars['optimismsepolia_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type optimismsepolia_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<optimismsepolia_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
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
  _change_block?: InputMaybe<optimismsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismsepolia_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismsepolia_SlippageUpdate_filter>>>;
};

export type optimismsepolia_SlippageUpdate_orderBy =
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

export type optimismsepolia_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['optimismsepolia_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type optimismsepolia_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_not?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_gt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_lt?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_gte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_lte?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['optimismsepolia_Bytes']>>;
  root_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['optimismsepolia_Bytes']>;
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
  _change_block?: InputMaybe<optimismsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismsepolia_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismsepolia_SnapshotRoot_filter>>>;
};

export type optimismsepolia_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type optimismsepolia_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type optimismsepolia_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<optimismsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismsepolia_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismsepolia_SpokeConnectorMode_filter>>>;
};

export type optimismsepolia_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  optimismsepolia_asset?: Maybe<optimismsepolia_Asset>;
  optimismsepolia_assets: Array<optimismsepolia_Asset>;
  optimismsepolia_assetStatus?: Maybe<optimismsepolia_AssetStatus>;
  optimismsepolia_assetStatuses: Array<optimismsepolia_AssetStatus>;
  optimismsepolia_assetBalance?: Maybe<optimismsepolia_AssetBalance>;
  optimismsepolia_assetBalances: Array<optimismsepolia_AssetBalance>;
  optimismsepolia_router?: Maybe<optimismsepolia_Router>;
  optimismsepolia_routers: Array<optimismsepolia_Router>;
  optimismsepolia_routerDailyTVL?: Maybe<optimismsepolia_RouterDailyTVL>;
  optimismsepolia_routerDailyTVLs: Array<optimismsepolia_RouterDailyTVL>;
  optimismsepolia_routerLiquidityEvent?: Maybe<optimismsepolia_RouterLiquidityEvent>;
  optimismsepolia_routerLiquidityEvents: Array<optimismsepolia_RouterLiquidityEvent>;
  optimismsepolia_setting?: Maybe<optimismsepolia_Setting>;
  optimismsepolia_settings: Array<optimismsepolia_Setting>;
  optimismsepolia_relayer?: Maybe<optimismsepolia_Relayer>;
  optimismsepolia_relayers: Array<optimismsepolia_Relayer>;
  optimismsepolia_sequencer?: Maybe<optimismsepolia_Sequencer>;
  optimismsepolia_sequencers: Array<optimismsepolia_Sequencer>;
  optimismsepolia_relayerFee?: Maybe<optimismsepolia_RelayerFee>;
  optimismsepolia_relayerFees: Array<optimismsepolia_RelayerFee>;
  optimismsepolia_originTransfer?: Maybe<optimismsepolia_OriginTransfer>;
  optimismsepolia_originTransfers: Array<optimismsepolia_OriginTransfer>;
  optimismsepolia_destinationTransfer?: Maybe<optimismsepolia_DestinationTransfer>;
  optimismsepolia_destinationTransfers: Array<optimismsepolia_DestinationTransfer>;
  optimismsepolia_originMessage?: Maybe<optimismsepolia_OriginMessage>;
  optimismsepolia_originMessages: Array<optimismsepolia_OriginMessage>;
  optimismsepolia_aggregateRoot?: Maybe<optimismsepolia_AggregateRoot>;
  optimismsepolia_aggregateRoots: Array<optimismsepolia_AggregateRoot>;
  optimismsepolia_connectorMeta?: Maybe<optimismsepolia_ConnectorMeta>;
  optimismsepolia_connectorMetas: Array<optimismsepolia_ConnectorMeta>;
  optimismsepolia_rootCount?: Maybe<optimismsepolia_RootCount>;
  optimismsepolia_rootCounts: Array<optimismsepolia_RootCount>;
  optimismsepolia_rootMessageSent?: Maybe<optimismsepolia_RootMessageSent>;
  optimismsepolia_rootMessageSents: Array<optimismsepolia_RootMessageSent>;
  optimismsepolia_relayerFeesIncrease?: Maybe<optimismsepolia_RelayerFeesIncrease>;
  optimismsepolia_relayerFeesIncreases: Array<optimismsepolia_RelayerFeesIncrease>;
  optimismsepolia_slippageUpdate?: Maybe<optimismsepolia_SlippageUpdate>;
  optimismsepolia_slippageUpdates: Array<optimismsepolia_SlippageUpdate>;
  optimismsepolia_snapshotRoot?: Maybe<optimismsepolia_SnapshotRoot>;
  optimismsepolia_snapshotRoots: Array<optimismsepolia_SnapshotRoot>;
  optimismsepolia_spokeConnectorMode?: Maybe<optimismsepolia_SpokeConnectorMode>;
  optimismsepolia_spokeConnectorModes: Array<optimismsepolia_SpokeConnectorMode>;
  optimismsepolia_aggregateRootProposed?: Maybe<optimismsepolia_AggregateRootProposed>;
  optimismsepolia_aggregateRootProposeds: Array<optimismsepolia_AggregateRootProposed>;
  optimismsepolia_optimisticRootFinalized?: Maybe<optimismsepolia_OptimisticRootFinalized>;
  optimismsepolia_optimisticRootFinalizeds: Array<optimismsepolia_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  optimismsepolia__meta?: Maybe<optimismsepolia__Meta_>;
};


export type Subscriptionoptimismsepolia_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_Asset_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_Asset_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_AssetStatus_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_AssetBalance_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_Router_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_Router_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_RouterDailyTVL_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_RouterLiquidityEvent_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_Setting_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_Setting_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_Relayer_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_Relayer_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_Sequencer_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_Sequencer_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_RelayerFee_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_OriginTransfer_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_DestinationTransfer_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_OriginMessage_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_AggregateRoot_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_ConnectorMeta_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_RootCount_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_RootCount_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_RootMessageSent_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_RelayerFeesIncrease_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_SlippageUpdate_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_SnapshotRoot_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_SpokeConnectorMode_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_AggregateRootProposed_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismsepolia_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<optimismsepolia_OrderDirection>;
  where?: InputMaybe<optimismsepolia_OptimisticRootFinalized_filter>;
  block?: InputMaybe<optimismsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismsepolia__metaArgs = {
  block?: InputMaybe<optimismsepolia_Block_height>;
};

export type optimismsepolia_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type optimismsepolia__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['optimismsepolia_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['optimismsepolia_Bytes']>;
};

/** The type for the top-level _meta field */
export type optimismsepolia__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: optimismsepolia__Block_;
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
  optimismsepolia_asset: InContextSdkMethod<Query['optimismsepolia_asset'], Queryoptimismsepolia_assetArgs, MeshContext>,
  /** null **/
  optimismsepolia_assets: InContextSdkMethod<Query['optimismsepolia_assets'], Queryoptimismsepolia_assetsArgs, MeshContext>,
  /** null **/
  optimismsepolia_assetStatus: InContextSdkMethod<Query['optimismsepolia_assetStatus'], Queryoptimismsepolia_assetStatusArgs, MeshContext>,
  /** null **/
  optimismsepolia_assetStatuses: InContextSdkMethod<Query['optimismsepolia_assetStatuses'], Queryoptimismsepolia_assetStatusesArgs, MeshContext>,
  /** null **/
  optimismsepolia_assetBalance: InContextSdkMethod<Query['optimismsepolia_assetBalance'], Queryoptimismsepolia_assetBalanceArgs, MeshContext>,
  /** null **/
  optimismsepolia_assetBalances: InContextSdkMethod<Query['optimismsepolia_assetBalances'], Queryoptimismsepolia_assetBalancesArgs, MeshContext>,
  /** null **/
  optimismsepolia_router: InContextSdkMethod<Query['optimismsepolia_router'], Queryoptimismsepolia_routerArgs, MeshContext>,
  /** null **/
  optimismsepolia_routers: InContextSdkMethod<Query['optimismsepolia_routers'], Queryoptimismsepolia_routersArgs, MeshContext>,
  /** null **/
  optimismsepolia_routerDailyTVL: InContextSdkMethod<Query['optimismsepolia_routerDailyTVL'], Queryoptimismsepolia_routerDailyTVLArgs, MeshContext>,
  /** null **/
  optimismsepolia_routerDailyTVLs: InContextSdkMethod<Query['optimismsepolia_routerDailyTVLs'], Queryoptimismsepolia_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  optimismsepolia_routerLiquidityEvent: InContextSdkMethod<Query['optimismsepolia_routerLiquidityEvent'], Queryoptimismsepolia_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  optimismsepolia_routerLiquidityEvents: InContextSdkMethod<Query['optimismsepolia_routerLiquidityEvents'], Queryoptimismsepolia_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  optimismsepolia_setting: InContextSdkMethod<Query['optimismsepolia_setting'], Queryoptimismsepolia_settingArgs, MeshContext>,
  /** null **/
  optimismsepolia_settings: InContextSdkMethod<Query['optimismsepolia_settings'], Queryoptimismsepolia_settingsArgs, MeshContext>,
  /** null **/
  optimismsepolia_relayer: InContextSdkMethod<Query['optimismsepolia_relayer'], Queryoptimismsepolia_relayerArgs, MeshContext>,
  /** null **/
  optimismsepolia_relayers: InContextSdkMethod<Query['optimismsepolia_relayers'], Queryoptimismsepolia_relayersArgs, MeshContext>,
  /** null **/
  optimismsepolia_sequencer: InContextSdkMethod<Query['optimismsepolia_sequencer'], Queryoptimismsepolia_sequencerArgs, MeshContext>,
  /** null **/
  optimismsepolia_sequencers: InContextSdkMethod<Query['optimismsepolia_sequencers'], Queryoptimismsepolia_sequencersArgs, MeshContext>,
  /** null **/
  optimismsepolia_relayerFee: InContextSdkMethod<Query['optimismsepolia_relayerFee'], Queryoptimismsepolia_relayerFeeArgs, MeshContext>,
  /** null **/
  optimismsepolia_relayerFees: InContextSdkMethod<Query['optimismsepolia_relayerFees'], Queryoptimismsepolia_relayerFeesArgs, MeshContext>,
  /** null **/
  optimismsepolia_originTransfer: InContextSdkMethod<Query['optimismsepolia_originTransfer'], Queryoptimismsepolia_originTransferArgs, MeshContext>,
  /** null **/
  optimismsepolia_originTransfers: InContextSdkMethod<Query['optimismsepolia_originTransfers'], Queryoptimismsepolia_originTransfersArgs, MeshContext>,
  /** null **/
  optimismsepolia_destinationTransfer: InContextSdkMethod<Query['optimismsepolia_destinationTransfer'], Queryoptimismsepolia_destinationTransferArgs, MeshContext>,
  /** null **/
  optimismsepolia_destinationTransfers: InContextSdkMethod<Query['optimismsepolia_destinationTransfers'], Queryoptimismsepolia_destinationTransfersArgs, MeshContext>,
  /** null **/
  optimismsepolia_originMessage: InContextSdkMethod<Query['optimismsepolia_originMessage'], Queryoptimismsepolia_originMessageArgs, MeshContext>,
  /** null **/
  optimismsepolia_originMessages: InContextSdkMethod<Query['optimismsepolia_originMessages'], Queryoptimismsepolia_originMessagesArgs, MeshContext>,
  /** null **/
  optimismsepolia_aggregateRoot: InContextSdkMethod<Query['optimismsepolia_aggregateRoot'], Queryoptimismsepolia_aggregateRootArgs, MeshContext>,
  /** null **/
  optimismsepolia_aggregateRoots: InContextSdkMethod<Query['optimismsepolia_aggregateRoots'], Queryoptimismsepolia_aggregateRootsArgs, MeshContext>,
  /** null **/
  optimismsepolia_connectorMeta: InContextSdkMethod<Query['optimismsepolia_connectorMeta'], Queryoptimismsepolia_connectorMetaArgs, MeshContext>,
  /** null **/
  optimismsepolia_connectorMetas: InContextSdkMethod<Query['optimismsepolia_connectorMetas'], Queryoptimismsepolia_connectorMetasArgs, MeshContext>,
  /** null **/
  optimismsepolia_rootCount: InContextSdkMethod<Query['optimismsepolia_rootCount'], Queryoptimismsepolia_rootCountArgs, MeshContext>,
  /** null **/
  optimismsepolia_rootCounts: InContextSdkMethod<Query['optimismsepolia_rootCounts'], Queryoptimismsepolia_rootCountsArgs, MeshContext>,
  /** null **/
  optimismsepolia_rootMessageSent: InContextSdkMethod<Query['optimismsepolia_rootMessageSent'], Queryoptimismsepolia_rootMessageSentArgs, MeshContext>,
  /** null **/
  optimismsepolia_rootMessageSents: InContextSdkMethod<Query['optimismsepolia_rootMessageSents'], Queryoptimismsepolia_rootMessageSentsArgs, MeshContext>,
  /** null **/
  optimismsepolia_relayerFeesIncrease: InContextSdkMethod<Query['optimismsepolia_relayerFeesIncrease'], Queryoptimismsepolia_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  optimismsepolia_relayerFeesIncreases: InContextSdkMethod<Query['optimismsepolia_relayerFeesIncreases'], Queryoptimismsepolia_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  optimismsepolia_slippageUpdate: InContextSdkMethod<Query['optimismsepolia_slippageUpdate'], Queryoptimismsepolia_slippageUpdateArgs, MeshContext>,
  /** null **/
  optimismsepolia_slippageUpdates: InContextSdkMethod<Query['optimismsepolia_slippageUpdates'], Queryoptimismsepolia_slippageUpdatesArgs, MeshContext>,
  /** null **/
  optimismsepolia_snapshotRoot: InContextSdkMethod<Query['optimismsepolia_snapshotRoot'], Queryoptimismsepolia_snapshotRootArgs, MeshContext>,
  /** null **/
  optimismsepolia_snapshotRoots: InContextSdkMethod<Query['optimismsepolia_snapshotRoots'], Queryoptimismsepolia_snapshotRootsArgs, MeshContext>,
  /** null **/
  optimismsepolia_spokeConnectorMode: InContextSdkMethod<Query['optimismsepolia_spokeConnectorMode'], Queryoptimismsepolia_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  optimismsepolia_spokeConnectorModes: InContextSdkMethod<Query['optimismsepolia_spokeConnectorModes'], Queryoptimismsepolia_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  optimismsepolia_aggregateRootProposed: InContextSdkMethod<Query['optimismsepolia_aggregateRootProposed'], Queryoptimismsepolia_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  optimismsepolia_aggregateRootProposeds: InContextSdkMethod<Query['optimismsepolia_aggregateRootProposeds'], Queryoptimismsepolia_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  optimismsepolia_optimisticRootFinalized: InContextSdkMethod<Query['optimismsepolia_optimisticRootFinalized'], Queryoptimismsepolia_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  optimismsepolia_optimisticRootFinalizeds: InContextSdkMethod<Query['optimismsepolia_optimisticRootFinalizeds'], Queryoptimismsepolia_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  optimismsepolia__meta: InContextSdkMethod<Query['optimismsepolia__meta'], Queryoptimismsepolia__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  optimismsepolia_asset: InContextSdkMethod<Subscription['optimismsepolia_asset'], Subscriptionoptimismsepolia_assetArgs, MeshContext>,
  /** null **/
  optimismsepolia_assets: InContextSdkMethod<Subscription['optimismsepolia_assets'], Subscriptionoptimismsepolia_assetsArgs, MeshContext>,
  /** null **/
  optimismsepolia_assetStatus: InContextSdkMethod<Subscription['optimismsepolia_assetStatus'], Subscriptionoptimismsepolia_assetStatusArgs, MeshContext>,
  /** null **/
  optimismsepolia_assetStatuses: InContextSdkMethod<Subscription['optimismsepolia_assetStatuses'], Subscriptionoptimismsepolia_assetStatusesArgs, MeshContext>,
  /** null **/
  optimismsepolia_assetBalance: InContextSdkMethod<Subscription['optimismsepolia_assetBalance'], Subscriptionoptimismsepolia_assetBalanceArgs, MeshContext>,
  /** null **/
  optimismsepolia_assetBalances: InContextSdkMethod<Subscription['optimismsepolia_assetBalances'], Subscriptionoptimismsepolia_assetBalancesArgs, MeshContext>,
  /** null **/
  optimismsepolia_router: InContextSdkMethod<Subscription['optimismsepolia_router'], Subscriptionoptimismsepolia_routerArgs, MeshContext>,
  /** null **/
  optimismsepolia_routers: InContextSdkMethod<Subscription['optimismsepolia_routers'], Subscriptionoptimismsepolia_routersArgs, MeshContext>,
  /** null **/
  optimismsepolia_routerDailyTVL: InContextSdkMethod<Subscription['optimismsepolia_routerDailyTVL'], Subscriptionoptimismsepolia_routerDailyTVLArgs, MeshContext>,
  /** null **/
  optimismsepolia_routerDailyTVLs: InContextSdkMethod<Subscription['optimismsepolia_routerDailyTVLs'], Subscriptionoptimismsepolia_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  optimismsepolia_routerLiquidityEvent: InContextSdkMethod<Subscription['optimismsepolia_routerLiquidityEvent'], Subscriptionoptimismsepolia_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  optimismsepolia_routerLiquidityEvents: InContextSdkMethod<Subscription['optimismsepolia_routerLiquidityEvents'], Subscriptionoptimismsepolia_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  optimismsepolia_setting: InContextSdkMethod<Subscription['optimismsepolia_setting'], Subscriptionoptimismsepolia_settingArgs, MeshContext>,
  /** null **/
  optimismsepolia_settings: InContextSdkMethod<Subscription['optimismsepolia_settings'], Subscriptionoptimismsepolia_settingsArgs, MeshContext>,
  /** null **/
  optimismsepolia_relayer: InContextSdkMethod<Subscription['optimismsepolia_relayer'], Subscriptionoptimismsepolia_relayerArgs, MeshContext>,
  /** null **/
  optimismsepolia_relayers: InContextSdkMethod<Subscription['optimismsepolia_relayers'], Subscriptionoptimismsepolia_relayersArgs, MeshContext>,
  /** null **/
  optimismsepolia_sequencer: InContextSdkMethod<Subscription['optimismsepolia_sequencer'], Subscriptionoptimismsepolia_sequencerArgs, MeshContext>,
  /** null **/
  optimismsepolia_sequencers: InContextSdkMethod<Subscription['optimismsepolia_sequencers'], Subscriptionoptimismsepolia_sequencersArgs, MeshContext>,
  /** null **/
  optimismsepolia_relayerFee: InContextSdkMethod<Subscription['optimismsepolia_relayerFee'], Subscriptionoptimismsepolia_relayerFeeArgs, MeshContext>,
  /** null **/
  optimismsepolia_relayerFees: InContextSdkMethod<Subscription['optimismsepolia_relayerFees'], Subscriptionoptimismsepolia_relayerFeesArgs, MeshContext>,
  /** null **/
  optimismsepolia_originTransfer: InContextSdkMethod<Subscription['optimismsepolia_originTransfer'], Subscriptionoptimismsepolia_originTransferArgs, MeshContext>,
  /** null **/
  optimismsepolia_originTransfers: InContextSdkMethod<Subscription['optimismsepolia_originTransfers'], Subscriptionoptimismsepolia_originTransfersArgs, MeshContext>,
  /** null **/
  optimismsepolia_destinationTransfer: InContextSdkMethod<Subscription['optimismsepolia_destinationTransfer'], Subscriptionoptimismsepolia_destinationTransferArgs, MeshContext>,
  /** null **/
  optimismsepolia_destinationTransfers: InContextSdkMethod<Subscription['optimismsepolia_destinationTransfers'], Subscriptionoptimismsepolia_destinationTransfersArgs, MeshContext>,
  /** null **/
  optimismsepolia_originMessage: InContextSdkMethod<Subscription['optimismsepolia_originMessage'], Subscriptionoptimismsepolia_originMessageArgs, MeshContext>,
  /** null **/
  optimismsepolia_originMessages: InContextSdkMethod<Subscription['optimismsepolia_originMessages'], Subscriptionoptimismsepolia_originMessagesArgs, MeshContext>,
  /** null **/
  optimismsepolia_aggregateRoot: InContextSdkMethod<Subscription['optimismsepolia_aggregateRoot'], Subscriptionoptimismsepolia_aggregateRootArgs, MeshContext>,
  /** null **/
  optimismsepolia_aggregateRoots: InContextSdkMethod<Subscription['optimismsepolia_aggregateRoots'], Subscriptionoptimismsepolia_aggregateRootsArgs, MeshContext>,
  /** null **/
  optimismsepolia_connectorMeta: InContextSdkMethod<Subscription['optimismsepolia_connectorMeta'], Subscriptionoptimismsepolia_connectorMetaArgs, MeshContext>,
  /** null **/
  optimismsepolia_connectorMetas: InContextSdkMethod<Subscription['optimismsepolia_connectorMetas'], Subscriptionoptimismsepolia_connectorMetasArgs, MeshContext>,
  /** null **/
  optimismsepolia_rootCount: InContextSdkMethod<Subscription['optimismsepolia_rootCount'], Subscriptionoptimismsepolia_rootCountArgs, MeshContext>,
  /** null **/
  optimismsepolia_rootCounts: InContextSdkMethod<Subscription['optimismsepolia_rootCounts'], Subscriptionoptimismsepolia_rootCountsArgs, MeshContext>,
  /** null **/
  optimismsepolia_rootMessageSent: InContextSdkMethod<Subscription['optimismsepolia_rootMessageSent'], Subscriptionoptimismsepolia_rootMessageSentArgs, MeshContext>,
  /** null **/
  optimismsepolia_rootMessageSents: InContextSdkMethod<Subscription['optimismsepolia_rootMessageSents'], Subscriptionoptimismsepolia_rootMessageSentsArgs, MeshContext>,
  /** null **/
  optimismsepolia_relayerFeesIncrease: InContextSdkMethod<Subscription['optimismsepolia_relayerFeesIncrease'], Subscriptionoptimismsepolia_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  optimismsepolia_relayerFeesIncreases: InContextSdkMethod<Subscription['optimismsepolia_relayerFeesIncreases'], Subscriptionoptimismsepolia_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  optimismsepolia_slippageUpdate: InContextSdkMethod<Subscription['optimismsepolia_slippageUpdate'], Subscriptionoptimismsepolia_slippageUpdateArgs, MeshContext>,
  /** null **/
  optimismsepolia_slippageUpdates: InContextSdkMethod<Subscription['optimismsepolia_slippageUpdates'], Subscriptionoptimismsepolia_slippageUpdatesArgs, MeshContext>,
  /** null **/
  optimismsepolia_snapshotRoot: InContextSdkMethod<Subscription['optimismsepolia_snapshotRoot'], Subscriptionoptimismsepolia_snapshotRootArgs, MeshContext>,
  /** null **/
  optimismsepolia_snapshotRoots: InContextSdkMethod<Subscription['optimismsepolia_snapshotRoots'], Subscriptionoptimismsepolia_snapshotRootsArgs, MeshContext>,
  /** null **/
  optimismsepolia_spokeConnectorMode: InContextSdkMethod<Subscription['optimismsepolia_spokeConnectorMode'], Subscriptionoptimismsepolia_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  optimismsepolia_spokeConnectorModes: InContextSdkMethod<Subscription['optimismsepolia_spokeConnectorModes'], Subscriptionoptimismsepolia_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  optimismsepolia_aggregateRootProposed: InContextSdkMethod<Subscription['optimismsepolia_aggregateRootProposed'], Subscriptionoptimismsepolia_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  optimismsepolia_aggregateRootProposeds: InContextSdkMethod<Subscription['optimismsepolia_aggregateRootProposeds'], Subscriptionoptimismsepolia_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  optimismsepolia_optimisticRootFinalized: InContextSdkMethod<Subscription['optimismsepolia_optimisticRootFinalized'], Subscriptionoptimismsepolia_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  optimismsepolia_optimisticRootFinalizeds: InContextSdkMethod<Subscription['optimismsepolia_optimisticRootFinalizeds'], Subscriptionoptimismsepolia_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  optimismsepolia__meta: InContextSdkMethod<Subscription['optimismsepolia__meta'], Subscriptionoptimismsepolia__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_OptimismSepolia"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
