// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextArbitrumSepoliaTypes {
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
  arbitrumsepolia_BigDecimal: any;
  BigInt: any;
  arbitrumsepolia_Bytes: any;
  arbitrumsepolia_Int8: any;
  Timestamp: any;
};

export type arbitrumsepolia_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['arbitrumsepolia_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type arbitrumsepolia_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['arbitrumsepolia_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type arbitrumsepolia_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
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
  _change_block?: InputMaybe<arbitrumsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_AggregateRootProposed_filter>>>;
};

export type arbitrumsepolia_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type arbitrumsepolia_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  root_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_AggregateRoot_filter>>>;
};

export type arbitrumsepolia_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type arbitrumsepolia_Aggregation_interval =
  | 'hour'
  | 'day';

export type arbitrumsepolia_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  localAsset?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<arbitrumsepolia_AssetStatus>;
};

export type arbitrumsepolia_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: arbitrumsepolia_Router;
  asset: arbitrumsepolia_Asset;
  feesEarned: Scalars['BigInt'];
};

export type arbitrumsepolia_AssetBalance_filter = {
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
  router_?: InputMaybe<arbitrumsepolia_Router_filter>;
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
  asset_?: InputMaybe<arbitrumsepolia_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_AssetBalance_filter>>>;
};

export type arbitrumsepolia_AssetBalance_orderBy =
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

export type arbitrumsepolia_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type arbitrumsepolia_AssetStatus_filter = {
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
  _change_block?: InputMaybe<arbitrumsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_AssetStatus_filter>>>;
};

export type arbitrumsepolia_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type arbitrumsepolia_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  key_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  key_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  key_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  key_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  key_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  key_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  localAsset?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
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
  status_?: InputMaybe<arbitrumsepolia_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_Asset_filter>>>;
};

export type arbitrumsepolia_Asset_orderBy =
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

export type arbitrumsepolia_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type arbitrumsepolia_Block_height = {
  hash?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type arbitrumsepolia_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  rootManager?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  mirrorConnector?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
};

export type arbitrumsepolia_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  amb_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  amb_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  amb_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  amb_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  amb_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  rootManager?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_ConnectorMeta_filter>>>;
};

export type arbitrumsepolia_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type arbitrumsepolia_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<arbitrumsepolia_TransferStatus>;
  routers?: Maybe<Array<arbitrumsepolia_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  delegate?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  asset?: Maybe<arbitrumsepolia_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type arbitrumsepolia_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_Router_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_Router_filter>;
};

export type arbitrumsepolia_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transferId_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<arbitrumsepolia_TransferStatus>;
  status_not?: InputMaybe<arbitrumsepolia_TransferStatus>;
  status_in?: InputMaybe<Array<arbitrumsepolia_TransferStatus>>;
  status_not_in?: InputMaybe<Array<arbitrumsepolia_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<arbitrumsepolia_Router_filter>;
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
  to?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  to_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  to_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  to_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  to_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  to_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  to_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  delegate?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  delegate_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  callData_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  callData_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  callData_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  callData_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  callData_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
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
  originSender?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  originSender_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
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
  asset_?: InputMaybe<arbitrumsepolia_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_DestinationTransfer_filter>>>;
};

export type arbitrumsepolia_DestinationTransfer_orderBy =
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

export type arbitrumsepolia_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['arbitrumsepolia_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type arbitrumsepolia_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
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
  _change_block?: InputMaybe<arbitrumsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_OptimisticRootFinalized_filter>>>;
};

export type arbitrumsepolia_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type arbitrumsepolia_OrderDirection =
  | 'asc'
  | 'desc';

export type arbitrumsepolia_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  root?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<arbitrumsepolia_RootCount>;
};

export type arbitrumsepolia_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transferId_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  leaf_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  message_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  message_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  message_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  message_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  message_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  message_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  root_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
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
  rootCount_?: InputMaybe<arbitrumsepolia_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_OriginMessage_filter>>>;
};

export type arbitrumsepolia_OriginMessage_orderBy =
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

export type arbitrumsepolia_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<arbitrumsepolia_TransferStatus>;
  messageHash?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  delegate?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  asset?: Maybe<arbitrumsepolia_Asset>;
  transactingAsset?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  message?: Maybe<arbitrumsepolia_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<arbitrumsepolia_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  caller?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type arbitrumsepolia_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_RelayerFee_filter>;
};

export type arbitrumsepolia_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transferId_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<arbitrumsepolia_TransferStatus>;
  status_not?: InputMaybe<arbitrumsepolia_TransferStatus>;
  status_in?: InputMaybe<Array<arbitrumsepolia_TransferStatus>>;
  status_not_in?: InputMaybe<Array<arbitrumsepolia_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
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
  to?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  to_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  to_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  to_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  to_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  to_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  to_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  delegate?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  delegate_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  callData_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  callData_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  callData_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  callData_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  callData_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  originSender_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
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
  asset_?: InputMaybe<arbitrumsepolia_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
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
  message_?: InputMaybe<arbitrumsepolia_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<arbitrumsepolia_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_OriginTransfer_filter>>>;
};

export type arbitrumsepolia_OriginTransfer_orderBy =
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
  arbitrumsepolia_asset?: Maybe<arbitrumsepolia_Asset>;
  arbitrumsepolia_assets: Array<arbitrumsepolia_Asset>;
  arbitrumsepolia_assetStatus?: Maybe<arbitrumsepolia_AssetStatus>;
  arbitrumsepolia_assetStatuses: Array<arbitrumsepolia_AssetStatus>;
  arbitrumsepolia_assetBalance?: Maybe<arbitrumsepolia_AssetBalance>;
  arbitrumsepolia_assetBalances: Array<arbitrumsepolia_AssetBalance>;
  arbitrumsepolia_router?: Maybe<arbitrumsepolia_Router>;
  arbitrumsepolia_routers: Array<arbitrumsepolia_Router>;
  arbitrumsepolia_routerDailyTVL?: Maybe<arbitrumsepolia_RouterDailyTVL>;
  arbitrumsepolia_routerDailyTVLs: Array<arbitrumsepolia_RouterDailyTVL>;
  arbitrumsepolia_routerLiquidityEvent?: Maybe<arbitrumsepolia_RouterLiquidityEvent>;
  arbitrumsepolia_routerLiquidityEvents: Array<arbitrumsepolia_RouterLiquidityEvent>;
  arbitrumsepolia_setting?: Maybe<arbitrumsepolia_Setting>;
  arbitrumsepolia_settings: Array<arbitrumsepolia_Setting>;
  arbitrumsepolia_relayer?: Maybe<arbitrumsepolia_Relayer>;
  arbitrumsepolia_relayers: Array<arbitrumsepolia_Relayer>;
  arbitrumsepolia_sequencer?: Maybe<arbitrumsepolia_Sequencer>;
  arbitrumsepolia_sequencers: Array<arbitrumsepolia_Sequencer>;
  arbitrumsepolia_relayerFee?: Maybe<arbitrumsepolia_RelayerFee>;
  arbitrumsepolia_relayerFees: Array<arbitrumsepolia_RelayerFee>;
  arbitrumsepolia_originTransfer?: Maybe<arbitrumsepolia_OriginTransfer>;
  arbitrumsepolia_originTransfers: Array<arbitrumsepolia_OriginTransfer>;
  arbitrumsepolia_destinationTransfer?: Maybe<arbitrumsepolia_DestinationTransfer>;
  arbitrumsepolia_destinationTransfers: Array<arbitrumsepolia_DestinationTransfer>;
  arbitrumsepolia_originMessage?: Maybe<arbitrumsepolia_OriginMessage>;
  arbitrumsepolia_originMessages: Array<arbitrumsepolia_OriginMessage>;
  arbitrumsepolia_aggregateRoot?: Maybe<arbitrumsepolia_AggregateRoot>;
  arbitrumsepolia_aggregateRoots: Array<arbitrumsepolia_AggregateRoot>;
  arbitrumsepolia_connectorMeta?: Maybe<arbitrumsepolia_ConnectorMeta>;
  arbitrumsepolia_connectorMetas: Array<arbitrumsepolia_ConnectorMeta>;
  arbitrumsepolia_rootCount?: Maybe<arbitrumsepolia_RootCount>;
  arbitrumsepolia_rootCounts: Array<arbitrumsepolia_RootCount>;
  arbitrumsepolia_rootMessageSent?: Maybe<arbitrumsepolia_RootMessageSent>;
  arbitrumsepolia_rootMessageSents: Array<arbitrumsepolia_RootMessageSent>;
  arbitrumsepolia_relayerFeesIncrease?: Maybe<arbitrumsepolia_RelayerFeesIncrease>;
  arbitrumsepolia_relayerFeesIncreases: Array<arbitrumsepolia_RelayerFeesIncrease>;
  arbitrumsepolia_slippageUpdate?: Maybe<arbitrumsepolia_SlippageUpdate>;
  arbitrumsepolia_slippageUpdates: Array<arbitrumsepolia_SlippageUpdate>;
  arbitrumsepolia_snapshotRoot?: Maybe<arbitrumsepolia_SnapshotRoot>;
  arbitrumsepolia_snapshotRoots: Array<arbitrumsepolia_SnapshotRoot>;
  arbitrumsepolia_spokeConnectorMode?: Maybe<arbitrumsepolia_SpokeConnectorMode>;
  arbitrumsepolia_spokeConnectorModes: Array<arbitrumsepolia_SpokeConnectorMode>;
  arbitrumsepolia_aggregateRootProposed?: Maybe<arbitrumsepolia_AggregateRootProposed>;
  arbitrumsepolia_aggregateRootProposeds: Array<arbitrumsepolia_AggregateRootProposed>;
  arbitrumsepolia_optimisticRootFinalized?: Maybe<arbitrumsepolia_OptimisticRootFinalized>;
  arbitrumsepolia_optimisticRootFinalizeds: Array<arbitrumsepolia_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  arbitrumsepolia__meta?: Maybe<arbitrumsepolia__Meta_>;
};


export type Queryarbitrumsepolia_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_Asset_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_Asset_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_AssetStatus_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_AssetBalance_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_Router_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_Router_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_RouterDailyTVL_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_RouterLiquidityEvent_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_Setting_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_Setting_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_Relayer_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_Relayer_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_Sequencer_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_Sequencer_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_RelayerFee_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_OriginTransfer_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_DestinationTransfer_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_OriginMessage_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_AggregateRoot_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_ConnectorMeta_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_RootCount_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_RootCount_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_RootMessageSent_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_RelayerFeesIncrease_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_SlippageUpdate_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_SnapshotRoot_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_SpokeConnectorMode_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_AggregateRootProposed_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_OptimisticRootFinalized_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia__metaArgs = {
  block?: InputMaybe<arbitrumsepolia_Block_height>;
};

export type arbitrumsepolia_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
};

export type arbitrumsepolia_RelayerFee = {
  id: Scalars['ID'];
  transfer: arbitrumsepolia_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['arbitrumsepolia_Bytes'];
};

export type arbitrumsepolia_RelayerFee_filter = {
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
  transfer_?: InputMaybe<arbitrumsepolia_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  asset_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  asset_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  asset_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  asset_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  asset_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_RelayerFee_filter>>>;
};

export type arbitrumsepolia_RelayerFee_orderBy =
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

export type arbitrumsepolia_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: arbitrumsepolia_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  caller: Scalars['arbitrumsepolia_Bytes'];
  transactionHash: Scalars['arbitrumsepolia_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type arbitrumsepolia_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<arbitrumsepolia_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  asset_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  asset_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  asset_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  asset_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  asset_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
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
  _change_block?: InputMaybe<arbitrumsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_RelayerFeesIncrease_filter>>>;
};

export type arbitrumsepolia_RelayerFeesIncrease_orderBy =
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

export type arbitrumsepolia_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  relayer_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_Relayer_filter>>>;
};

export type arbitrumsepolia_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type arbitrumsepolia_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type arbitrumsepolia_RootCount_filter = {
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
  _change_block?: InputMaybe<arbitrumsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_RootCount_filter>>>;
};

export type arbitrumsepolia_RootCount_orderBy =
  | 'id'
  | 'count';

export type arbitrumsepolia_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type arbitrumsepolia_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  root_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
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
  _change_block?: InputMaybe<arbitrumsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_RootMessageSent_filter>>>;
};

export type arbitrumsepolia_RootMessageSent_orderBy =
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

export type arbitrumsepolia_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  recipient?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  proposedOwner?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<arbitrumsepolia_AssetBalance>;
};


export type arbitrumsepolia_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_AssetBalance_filter>;
};

export type arbitrumsepolia_RouterDailyTVL = {
  id: Scalars['ID'];
  router: arbitrumsepolia_Router;
  asset: arbitrumsepolia_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type arbitrumsepolia_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<arbitrumsepolia_Router_filter>;
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
  asset_?: InputMaybe<arbitrumsepolia_Asset_filter>;
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
  _change_block?: InputMaybe<arbitrumsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_RouterDailyTVL_filter>>>;
};

export type arbitrumsepolia_RouterDailyTVL_orderBy =
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

export type arbitrumsepolia_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<arbitrumsepolia_RouterLiquidityEventType>;
  router: arbitrumsepolia_Router;
  asset: arbitrumsepolia_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['arbitrumsepolia_Bytes'];
  nonce: Scalars['BigInt'];
};

export type arbitrumsepolia_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type arbitrumsepolia_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<arbitrumsepolia_RouterLiquidityEventType>;
  type_not?: InputMaybe<arbitrumsepolia_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<arbitrumsepolia_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<arbitrumsepolia_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<arbitrumsepolia_Router_filter>;
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
  asset_?: InputMaybe<arbitrumsepolia_Asset_filter>;
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
  caller?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_RouterLiquidityEvent_filter>>>;
};

export type arbitrumsepolia_RouterLiquidityEvent_orderBy =
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

export type arbitrumsepolia_Router_filter = {
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
  owner?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  owner_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  owner_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  owner_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  owner_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  owner_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  recipient?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  recipient_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<arbitrumsepolia_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_Router_filter>>>;
};

export type arbitrumsepolia_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type arbitrumsepolia_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
};

export type arbitrumsepolia_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_Sequencer_filter>>>;
};

export type arbitrumsepolia_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type arbitrumsepolia_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['arbitrumsepolia_Bytes'];
};

export type arbitrumsepolia_Setting_filter = {
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
  caller?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_Setting_filter>>>;
};

export type arbitrumsepolia_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type arbitrumsepolia_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: arbitrumsepolia_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['arbitrumsepolia_Bytes'];
  transactionHash: Scalars['arbitrumsepolia_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type arbitrumsepolia_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<arbitrumsepolia_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
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
  _change_block?: InputMaybe<arbitrumsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_SlippageUpdate_filter>>>;
};

export type arbitrumsepolia_SlippageUpdate_orderBy =
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

export type arbitrumsepolia_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['arbitrumsepolia_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type arbitrumsepolia_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_not?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_gt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_lt?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_gte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_lte?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_Bytes']>>;
  root_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['arbitrumsepolia_Bytes']>;
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
  _change_block?: InputMaybe<arbitrumsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_SnapshotRoot_filter>>>;
};

export type arbitrumsepolia_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type arbitrumsepolia_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type arbitrumsepolia_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<arbitrumsepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_SpokeConnectorMode_filter>>>;
};

export type arbitrumsepolia_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  arbitrumsepolia_asset?: Maybe<arbitrumsepolia_Asset>;
  arbitrumsepolia_assets: Array<arbitrumsepolia_Asset>;
  arbitrumsepolia_assetStatus?: Maybe<arbitrumsepolia_AssetStatus>;
  arbitrumsepolia_assetStatuses: Array<arbitrumsepolia_AssetStatus>;
  arbitrumsepolia_assetBalance?: Maybe<arbitrumsepolia_AssetBalance>;
  arbitrumsepolia_assetBalances: Array<arbitrumsepolia_AssetBalance>;
  arbitrumsepolia_router?: Maybe<arbitrumsepolia_Router>;
  arbitrumsepolia_routers: Array<arbitrumsepolia_Router>;
  arbitrumsepolia_routerDailyTVL?: Maybe<arbitrumsepolia_RouterDailyTVL>;
  arbitrumsepolia_routerDailyTVLs: Array<arbitrumsepolia_RouterDailyTVL>;
  arbitrumsepolia_routerLiquidityEvent?: Maybe<arbitrumsepolia_RouterLiquidityEvent>;
  arbitrumsepolia_routerLiquidityEvents: Array<arbitrumsepolia_RouterLiquidityEvent>;
  arbitrumsepolia_setting?: Maybe<arbitrumsepolia_Setting>;
  arbitrumsepolia_settings: Array<arbitrumsepolia_Setting>;
  arbitrumsepolia_relayer?: Maybe<arbitrumsepolia_Relayer>;
  arbitrumsepolia_relayers: Array<arbitrumsepolia_Relayer>;
  arbitrumsepolia_sequencer?: Maybe<arbitrumsepolia_Sequencer>;
  arbitrumsepolia_sequencers: Array<arbitrumsepolia_Sequencer>;
  arbitrumsepolia_relayerFee?: Maybe<arbitrumsepolia_RelayerFee>;
  arbitrumsepolia_relayerFees: Array<arbitrumsepolia_RelayerFee>;
  arbitrumsepolia_originTransfer?: Maybe<arbitrumsepolia_OriginTransfer>;
  arbitrumsepolia_originTransfers: Array<arbitrumsepolia_OriginTransfer>;
  arbitrumsepolia_destinationTransfer?: Maybe<arbitrumsepolia_DestinationTransfer>;
  arbitrumsepolia_destinationTransfers: Array<arbitrumsepolia_DestinationTransfer>;
  arbitrumsepolia_originMessage?: Maybe<arbitrumsepolia_OriginMessage>;
  arbitrumsepolia_originMessages: Array<arbitrumsepolia_OriginMessage>;
  arbitrumsepolia_aggregateRoot?: Maybe<arbitrumsepolia_AggregateRoot>;
  arbitrumsepolia_aggregateRoots: Array<arbitrumsepolia_AggregateRoot>;
  arbitrumsepolia_connectorMeta?: Maybe<arbitrumsepolia_ConnectorMeta>;
  arbitrumsepolia_connectorMetas: Array<arbitrumsepolia_ConnectorMeta>;
  arbitrumsepolia_rootCount?: Maybe<arbitrumsepolia_RootCount>;
  arbitrumsepolia_rootCounts: Array<arbitrumsepolia_RootCount>;
  arbitrumsepolia_rootMessageSent?: Maybe<arbitrumsepolia_RootMessageSent>;
  arbitrumsepolia_rootMessageSents: Array<arbitrumsepolia_RootMessageSent>;
  arbitrumsepolia_relayerFeesIncrease?: Maybe<arbitrumsepolia_RelayerFeesIncrease>;
  arbitrumsepolia_relayerFeesIncreases: Array<arbitrumsepolia_RelayerFeesIncrease>;
  arbitrumsepolia_slippageUpdate?: Maybe<arbitrumsepolia_SlippageUpdate>;
  arbitrumsepolia_slippageUpdates: Array<arbitrumsepolia_SlippageUpdate>;
  arbitrumsepolia_snapshotRoot?: Maybe<arbitrumsepolia_SnapshotRoot>;
  arbitrumsepolia_snapshotRoots: Array<arbitrumsepolia_SnapshotRoot>;
  arbitrumsepolia_spokeConnectorMode?: Maybe<arbitrumsepolia_SpokeConnectorMode>;
  arbitrumsepolia_spokeConnectorModes: Array<arbitrumsepolia_SpokeConnectorMode>;
  arbitrumsepolia_aggregateRootProposed?: Maybe<arbitrumsepolia_AggregateRootProposed>;
  arbitrumsepolia_aggregateRootProposeds: Array<arbitrumsepolia_AggregateRootProposed>;
  arbitrumsepolia_optimisticRootFinalized?: Maybe<arbitrumsepolia_OptimisticRootFinalized>;
  arbitrumsepolia_optimisticRootFinalizeds: Array<arbitrumsepolia_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  arbitrumsepolia__meta?: Maybe<arbitrumsepolia__Meta_>;
};


export type Subscriptionarbitrumsepolia_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_Asset_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_Asset_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_AssetStatus_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_AssetBalance_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_Router_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_Router_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_RouterDailyTVL_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_RouterLiquidityEvent_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_Setting_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_Setting_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_Relayer_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_Relayer_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_Sequencer_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_Sequencer_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_RelayerFee_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_OriginTransfer_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_DestinationTransfer_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_OriginMessage_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_AggregateRoot_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_ConnectorMeta_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_RootCount_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_RootCount_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_RootMessageSent_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_RelayerFeesIncrease_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_SlippageUpdate_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_SnapshotRoot_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_SpokeConnectorMode_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_AggregateRootProposed_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_OptimisticRootFinalized_filter>;
  block?: InputMaybe<arbitrumsepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia__metaArgs = {
  block?: InputMaybe<arbitrumsepolia_Block_height>;
};

export type arbitrumsepolia_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type arbitrumsepolia__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['arbitrumsepolia_Bytes']>;
};

/** The type for the top-level _meta field */
export type arbitrumsepolia__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: arbitrumsepolia__Block_;
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
  arbitrumsepolia_asset: InContextSdkMethod<Query['arbitrumsepolia_asset'], Queryarbitrumsepolia_assetArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_assets: InContextSdkMethod<Query['arbitrumsepolia_assets'], Queryarbitrumsepolia_assetsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_assetStatus: InContextSdkMethod<Query['arbitrumsepolia_assetStatus'], Queryarbitrumsepolia_assetStatusArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_assetStatuses: InContextSdkMethod<Query['arbitrumsepolia_assetStatuses'], Queryarbitrumsepolia_assetStatusesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_assetBalance: InContextSdkMethod<Query['arbitrumsepolia_assetBalance'], Queryarbitrumsepolia_assetBalanceArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_assetBalances: InContextSdkMethod<Query['arbitrumsepolia_assetBalances'], Queryarbitrumsepolia_assetBalancesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_router: InContextSdkMethod<Query['arbitrumsepolia_router'], Queryarbitrumsepolia_routerArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_routers: InContextSdkMethod<Query['arbitrumsepolia_routers'], Queryarbitrumsepolia_routersArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_routerDailyTVL: InContextSdkMethod<Query['arbitrumsepolia_routerDailyTVL'], Queryarbitrumsepolia_routerDailyTVLArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_routerDailyTVLs: InContextSdkMethod<Query['arbitrumsepolia_routerDailyTVLs'], Queryarbitrumsepolia_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_routerLiquidityEvent: InContextSdkMethod<Query['arbitrumsepolia_routerLiquidityEvent'], Queryarbitrumsepolia_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_routerLiquidityEvents: InContextSdkMethod<Query['arbitrumsepolia_routerLiquidityEvents'], Queryarbitrumsepolia_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_setting: InContextSdkMethod<Query['arbitrumsepolia_setting'], Queryarbitrumsepolia_settingArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_settings: InContextSdkMethod<Query['arbitrumsepolia_settings'], Queryarbitrumsepolia_settingsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_relayer: InContextSdkMethod<Query['arbitrumsepolia_relayer'], Queryarbitrumsepolia_relayerArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_relayers: InContextSdkMethod<Query['arbitrumsepolia_relayers'], Queryarbitrumsepolia_relayersArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_sequencer: InContextSdkMethod<Query['arbitrumsepolia_sequencer'], Queryarbitrumsepolia_sequencerArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_sequencers: InContextSdkMethod<Query['arbitrumsepolia_sequencers'], Queryarbitrumsepolia_sequencersArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_relayerFee: InContextSdkMethod<Query['arbitrumsepolia_relayerFee'], Queryarbitrumsepolia_relayerFeeArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_relayerFees: InContextSdkMethod<Query['arbitrumsepolia_relayerFees'], Queryarbitrumsepolia_relayerFeesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_originTransfer: InContextSdkMethod<Query['arbitrumsepolia_originTransfer'], Queryarbitrumsepolia_originTransferArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_originTransfers: InContextSdkMethod<Query['arbitrumsepolia_originTransfers'], Queryarbitrumsepolia_originTransfersArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_destinationTransfer: InContextSdkMethod<Query['arbitrumsepolia_destinationTransfer'], Queryarbitrumsepolia_destinationTransferArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_destinationTransfers: InContextSdkMethod<Query['arbitrumsepolia_destinationTransfers'], Queryarbitrumsepolia_destinationTransfersArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_originMessage: InContextSdkMethod<Query['arbitrumsepolia_originMessage'], Queryarbitrumsepolia_originMessageArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_originMessages: InContextSdkMethod<Query['arbitrumsepolia_originMessages'], Queryarbitrumsepolia_originMessagesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_aggregateRoot: InContextSdkMethod<Query['arbitrumsepolia_aggregateRoot'], Queryarbitrumsepolia_aggregateRootArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_aggregateRoots: InContextSdkMethod<Query['arbitrumsepolia_aggregateRoots'], Queryarbitrumsepolia_aggregateRootsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_connectorMeta: InContextSdkMethod<Query['arbitrumsepolia_connectorMeta'], Queryarbitrumsepolia_connectorMetaArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_connectorMetas: InContextSdkMethod<Query['arbitrumsepolia_connectorMetas'], Queryarbitrumsepolia_connectorMetasArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_rootCount: InContextSdkMethod<Query['arbitrumsepolia_rootCount'], Queryarbitrumsepolia_rootCountArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_rootCounts: InContextSdkMethod<Query['arbitrumsepolia_rootCounts'], Queryarbitrumsepolia_rootCountsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_rootMessageSent: InContextSdkMethod<Query['arbitrumsepolia_rootMessageSent'], Queryarbitrumsepolia_rootMessageSentArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_rootMessageSents: InContextSdkMethod<Query['arbitrumsepolia_rootMessageSents'], Queryarbitrumsepolia_rootMessageSentsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_relayerFeesIncrease: InContextSdkMethod<Query['arbitrumsepolia_relayerFeesIncrease'], Queryarbitrumsepolia_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_relayerFeesIncreases: InContextSdkMethod<Query['arbitrumsepolia_relayerFeesIncreases'], Queryarbitrumsepolia_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_slippageUpdate: InContextSdkMethod<Query['arbitrumsepolia_slippageUpdate'], Queryarbitrumsepolia_slippageUpdateArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_slippageUpdates: InContextSdkMethod<Query['arbitrumsepolia_slippageUpdates'], Queryarbitrumsepolia_slippageUpdatesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_snapshotRoot: InContextSdkMethod<Query['arbitrumsepolia_snapshotRoot'], Queryarbitrumsepolia_snapshotRootArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_snapshotRoots: InContextSdkMethod<Query['arbitrumsepolia_snapshotRoots'], Queryarbitrumsepolia_snapshotRootsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_spokeConnectorMode: InContextSdkMethod<Query['arbitrumsepolia_spokeConnectorMode'], Queryarbitrumsepolia_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_spokeConnectorModes: InContextSdkMethod<Query['arbitrumsepolia_spokeConnectorModes'], Queryarbitrumsepolia_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_aggregateRootProposed: InContextSdkMethod<Query['arbitrumsepolia_aggregateRootProposed'], Queryarbitrumsepolia_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_aggregateRootProposeds: InContextSdkMethod<Query['arbitrumsepolia_aggregateRootProposeds'], Queryarbitrumsepolia_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_optimisticRootFinalized: InContextSdkMethod<Query['arbitrumsepolia_optimisticRootFinalized'], Queryarbitrumsepolia_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_optimisticRootFinalizeds: InContextSdkMethod<Query['arbitrumsepolia_optimisticRootFinalizeds'], Queryarbitrumsepolia_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  arbitrumsepolia__meta: InContextSdkMethod<Query['arbitrumsepolia__meta'], Queryarbitrumsepolia__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  arbitrumsepolia_asset: InContextSdkMethod<Subscription['arbitrumsepolia_asset'], Subscriptionarbitrumsepolia_assetArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_assets: InContextSdkMethod<Subscription['arbitrumsepolia_assets'], Subscriptionarbitrumsepolia_assetsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_assetStatus: InContextSdkMethod<Subscription['arbitrumsepolia_assetStatus'], Subscriptionarbitrumsepolia_assetStatusArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_assetStatuses: InContextSdkMethod<Subscription['arbitrumsepolia_assetStatuses'], Subscriptionarbitrumsepolia_assetStatusesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_assetBalance: InContextSdkMethod<Subscription['arbitrumsepolia_assetBalance'], Subscriptionarbitrumsepolia_assetBalanceArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_assetBalances: InContextSdkMethod<Subscription['arbitrumsepolia_assetBalances'], Subscriptionarbitrumsepolia_assetBalancesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_router: InContextSdkMethod<Subscription['arbitrumsepolia_router'], Subscriptionarbitrumsepolia_routerArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_routers: InContextSdkMethod<Subscription['arbitrumsepolia_routers'], Subscriptionarbitrumsepolia_routersArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_routerDailyTVL: InContextSdkMethod<Subscription['arbitrumsepolia_routerDailyTVL'], Subscriptionarbitrumsepolia_routerDailyTVLArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_routerDailyTVLs: InContextSdkMethod<Subscription['arbitrumsepolia_routerDailyTVLs'], Subscriptionarbitrumsepolia_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_routerLiquidityEvent: InContextSdkMethod<Subscription['arbitrumsepolia_routerLiquidityEvent'], Subscriptionarbitrumsepolia_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_routerLiquidityEvents: InContextSdkMethod<Subscription['arbitrumsepolia_routerLiquidityEvents'], Subscriptionarbitrumsepolia_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_setting: InContextSdkMethod<Subscription['arbitrumsepolia_setting'], Subscriptionarbitrumsepolia_settingArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_settings: InContextSdkMethod<Subscription['arbitrumsepolia_settings'], Subscriptionarbitrumsepolia_settingsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_relayer: InContextSdkMethod<Subscription['arbitrumsepolia_relayer'], Subscriptionarbitrumsepolia_relayerArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_relayers: InContextSdkMethod<Subscription['arbitrumsepolia_relayers'], Subscriptionarbitrumsepolia_relayersArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_sequencer: InContextSdkMethod<Subscription['arbitrumsepolia_sequencer'], Subscriptionarbitrumsepolia_sequencerArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_sequencers: InContextSdkMethod<Subscription['arbitrumsepolia_sequencers'], Subscriptionarbitrumsepolia_sequencersArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_relayerFee: InContextSdkMethod<Subscription['arbitrumsepolia_relayerFee'], Subscriptionarbitrumsepolia_relayerFeeArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_relayerFees: InContextSdkMethod<Subscription['arbitrumsepolia_relayerFees'], Subscriptionarbitrumsepolia_relayerFeesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_originTransfer: InContextSdkMethod<Subscription['arbitrumsepolia_originTransfer'], Subscriptionarbitrumsepolia_originTransferArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_originTransfers: InContextSdkMethod<Subscription['arbitrumsepolia_originTransfers'], Subscriptionarbitrumsepolia_originTransfersArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_destinationTransfer: InContextSdkMethod<Subscription['arbitrumsepolia_destinationTransfer'], Subscriptionarbitrumsepolia_destinationTransferArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_destinationTransfers: InContextSdkMethod<Subscription['arbitrumsepolia_destinationTransfers'], Subscriptionarbitrumsepolia_destinationTransfersArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_originMessage: InContextSdkMethod<Subscription['arbitrumsepolia_originMessage'], Subscriptionarbitrumsepolia_originMessageArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_originMessages: InContextSdkMethod<Subscription['arbitrumsepolia_originMessages'], Subscriptionarbitrumsepolia_originMessagesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_aggregateRoot: InContextSdkMethod<Subscription['arbitrumsepolia_aggregateRoot'], Subscriptionarbitrumsepolia_aggregateRootArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_aggregateRoots: InContextSdkMethod<Subscription['arbitrumsepolia_aggregateRoots'], Subscriptionarbitrumsepolia_aggregateRootsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_connectorMeta: InContextSdkMethod<Subscription['arbitrumsepolia_connectorMeta'], Subscriptionarbitrumsepolia_connectorMetaArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_connectorMetas: InContextSdkMethod<Subscription['arbitrumsepolia_connectorMetas'], Subscriptionarbitrumsepolia_connectorMetasArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_rootCount: InContextSdkMethod<Subscription['arbitrumsepolia_rootCount'], Subscriptionarbitrumsepolia_rootCountArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_rootCounts: InContextSdkMethod<Subscription['arbitrumsepolia_rootCounts'], Subscriptionarbitrumsepolia_rootCountsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_rootMessageSent: InContextSdkMethod<Subscription['arbitrumsepolia_rootMessageSent'], Subscriptionarbitrumsepolia_rootMessageSentArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_rootMessageSents: InContextSdkMethod<Subscription['arbitrumsepolia_rootMessageSents'], Subscriptionarbitrumsepolia_rootMessageSentsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_relayerFeesIncrease: InContextSdkMethod<Subscription['arbitrumsepolia_relayerFeesIncrease'], Subscriptionarbitrumsepolia_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_relayerFeesIncreases: InContextSdkMethod<Subscription['arbitrumsepolia_relayerFeesIncreases'], Subscriptionarbitrumsepolia_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_slippageUpdate: InContextSdkMethod<Subscription['arbitrumsepolia_slippageUpdate'], Subscriptionarbitrumsepolia_slippageUpdateArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_slippageUpdates: InContextSdkMethod<Subscription['arbitrumsepolia_slippageUpdates'], Subscriptionarbitrumsepolia_slippageUpdatesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_snapshotRoot: InContextSdkMethod<Subscription['arbitrumsepolia_snapshotRoot'], Subscriptionarbitrumsepolia_snapshotRootArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_snapshotRoots: InContextSdkMethod<Subscription['arbitrumsepolia_snapshotRoots'], Subscriptionarbitrumsepolia_snapshotRootsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_spokeConnectorMode: InContextSdkMethod<Subscription['arbitrumsepolia_spokeConnectorMode'], Subscriptionarbitrumsepolia_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_spokeConnectorModes: InContextSdkMethod<Subscription['arbitrumsepolia_spokeConnectorModes'], Subscriptionarbitrumsepolia_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_aggregateRootProposed: InContextSdkMethod<Subscription['arbitrumsepolia_aggregateRootProposed'], Subscriptionarbitrumsepolia_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_aggregateRootProposeds: InContextSdkMethod<Subscription['arbitrumsepolia_aggregateRootProposeds'], Subscriptionarbitrumsepolia_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_optimisticRootFinalized: InContextSdkMethod<Subscription['arbitrumsepolia_optimisticRootFinalized'], Subscriptionarbitrumsepolia_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_optimisticRootFinalizeds: InContextSdkMethod<Subscription['arbitrumsepolia_optimisticRootFinalizeds'], Subscriptionarbitrumsepolia_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  arbitrumsepolia__meta: InContextSdkMethod<Subscription['arbitrumsepolia__meta'], Subscriptionarbitrumsepolia__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_ArbitrumSepolia"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
