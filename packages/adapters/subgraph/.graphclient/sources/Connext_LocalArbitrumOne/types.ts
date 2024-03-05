// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextLocalArbitrumOneTypes {
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
  localarbitrumone_BigDecimal: any;
  BigInt: any;
  localarbitrumone_Bytes: any;
  localarbitrumone_Int8: any;
};

export type localarbitrumone_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['localarbitrumone_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type localarbitrumone_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['localarbitrumone_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type localarbitrumone_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
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
  _change_block?: InputMaybe<localarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localarbitrumone_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localarbitrumone_AggregateRootProposed_filter>>>;
};

export type localarbitrumone_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type localarbitrumone_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  root_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localarbitrumone_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localarbitrumone_AggregateRoot_filter>>>;
};

export type localarbitrumone_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type localarbitrumone_Aggregation_interval =
  | 'hour'
  | 'day';

export type localarbitrumone_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['localarbitrumone_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['localarbitrumone_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['localarbitrumone_Bytes']>;
  localAsset?: Maybe<Scalars['localarbitrumone_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<localarbitrumone_AssetStatus>;
};

export type localarbitrumone_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: localarbitrumone_Router;
  asset: localarbitrumone_Asset;
  feesEarned: Scalars['BigInt'];
};

export type localarbitrumone_AssetBalance_filter = {
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
  router_?: InputMaybe<localarbitrumone_Router_filter>;
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
  asset_?: InputMaybe<localarbitrumone_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localarbitrumone_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localarbitrumone_AssetBalance_filter>>>;
};

export type localarbitrumone_AssetBalance_orderBy =
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

export type localarbitrumone_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type localarbitrumone_AssetStatus_filter = {
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
  _change_block?: InputMaybe<localarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localarbitrumone_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localarbitrumone_AssetStatus_filter>>>;
};

export type localarbitrumone_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type localarbitrumone_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  key_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  key_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  key_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  key_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  key_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  key_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  localAsset?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
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
  status_?: InputMaybe<localarbitrumone_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localarbitrumone_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localarbitrumone_Asset_filter>>>;
};

export type localarbitrumone_Asset_orderBy =
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

export type localarbitrumone_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type localarbitrumone_Block_height = {
  hash?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type localarbitrumone_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['localarbitrumone_Bytes']>;
  rootManager?: Maybe<Scalars['localarbitrumone_Bytes']>;
  mirrorConnector?: Maybe<Scalars['localarbitrumone_Bytes']>;
};

export type localarbitrumone_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  amb_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  amb_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  amb_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  amb_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  amb_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  rootManager?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localarbitrumone_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localarbitrumone_ConnectorMeta_filter>>>;
};

export type localarbitrumone_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type localarbitrumone_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['localarbitrumone_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<localarbitrumone_TransferStatus>;
  routers?: Maybe<Array<localarbitrumone_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['localarbitrumone_Bytes']>;
  delegate?: Maybe<Scalars['localarbitrumone_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['localarbitrumone_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['localarbitrumone_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['localarbitrumone_Bytes']>;
  asset?: Maybe<localarbitrumone_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['localarbitrumone_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['localarbitrumone_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['localarbitrumone_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['localarbitrumone_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['localarbitrumone_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['localarbitrumone_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type localarbitrumone_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_Router_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_Router_filter>;
};

export type localarbitrumone_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transferId_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<localarbitrumone_TransferStatus>;
  status_not?: InputMaybe<localarbitrumone_TransferStatus>;
  status_in?: InputMaybe<Array<localarbitrumone_TransferStatus>>;
  status_not_in?: InputMaybe<Array<localarbitrumone_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<localarbitrumone_Router_filter>;
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
  to?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  to_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  to_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  to_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  to_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  to_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  to_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  delegate?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  delegate_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  callData_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  callData_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  callData_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  callData_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  callData_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
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
  originSender?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  originSender_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
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
  asset_?: InputMaybe<localarbitrumone_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localarbitrumone_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localarbitrumone_DestinationTransfer_filter>>>;
};

export type localarbitrumone_DestinationTransfer_orderBy =
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

export type localarbitrumone_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['localarbitrumone_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type localarbitrumone_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
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
  _change_block?: InputMaybe<localarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localarbitrumone_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localarbitrumone_OptimisticRootFinalized_filter>>>;
};

export type localarbitrumone_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type localarbitrumone_OrderDirection =
  | 'asc'
  | 'desc';

export type localarbitrumone_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['localarbitrumone_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['localarbitrumone_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['localarbitrumone_Bytes']>;
  root?: Maybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash?: Maybe<Scalars['localarbitrumone_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<localarbitrumone_RootCount>;
};

export type localarbitrumone_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transferId_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  leaf_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  message_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  message_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  message_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  message_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  message_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  message_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  root_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
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
  rootCount_?: InputMaybe<localarbitrumone_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localarbitrumone_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localarbitrumone_OriginMessage_filter>>>;
};

export type localarbitrumone_OriginMessage_orderBy =
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

export type localarbitrumone_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['localarbitrumone_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<localarbitrumone_TransferStatus>;
  messageHash?: Maybe<Scalars['localarbitrumone_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['localarbitrumone_Bytes']>;
  delegate?: Maybe<Scalars['localarbitrumone_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['localarbitrumone_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['localarbitrumone_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['localarbitrumone_Bytes']>;
  asset?: Maybe<localarbitrumone_Asset>;
  transactingAsset?: Maybe<Scalars['localarbitrumone_Bytes']>;
  message?: Maybe<localarbitrumone_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<localarbitrumone_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['localarbitrumone_Bytes']>;
  caller?: Maybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash?: Maybe<Scalars['localarbitrumone_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['localarbitrumone_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type localarbitrumone_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_RelayerFee_filter>;
};

export type localarbitrumone_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transferId_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<localarbitrumone_TransferStatus>;
  status_not?: InputMaybe<localarbitrumone_TransferStatus>;
  status_in?: InputMaybe<Array<localarbitrumone_TransferStatus>>;
  status_not_in?: InputMaybe<Array<localarbitrumone_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
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
  to?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  to_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  to_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  to_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  to_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  to_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  to_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  delegate?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  delegate_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  callData_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  callData_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  callData_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  callData_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  callData_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  originSender_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
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
  asset_?: InputMaybe<localarbitrumone_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
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
  message_?: InputMaybe<localarbitrumone_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<localarbitrumone_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localarbitrumone_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localarbitrumone_OriginTransfer_filter>>>;
};

export type localarbitrumone_OriginTransfer_orderBy =
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
  localarbitrumone_asset?: Maybe<localarbitrumone_Asset>;
  localarbitrumone_assets: Array<localarbitrumone_Asset>;
  localarbitrumone_assetStatus?: Maybe<localarbitrumone_AssetStatus>;
  localarbitrumone_assetStatuses: Array<localarbitrumone_AssetStatus>;
  localarbitrumone_assetBalance?: Maybe<localarbitrumone_AssetBalance>;
  localarbitrumone_assetBalances: Array<localarbitrumone_AssetBalance>;
  localarbitrumone_router?: Maybe<localarbitrumone_Router>;
  localarbitrumone_routers: Array<localarbitrumone_Router>;
  localarbitrumone_routerDailyTVL?: Maybe<localarbitrumone_RouterDailyTVL>;
  localarbitrumone_routerDailyTVLs: Array<localarbitrumone_RouterDailyTVL>;
  localarbitrumone_routerLiquidityEvent?: Maybe<localarbitrumone_RouterLiquidityEvent>;
  localarbitrumone_routerLiquidityEvents: Array<localarbitrumone_RouterLiquidityEvent>;
  localarbitrumone_setting?: Maybe<localarbitrumone_Setting>;
  localarbitrumone_settings: Array<localarbitrumone_Setting>;
  localarbitrumone_relayer?: Maybe<localarbitrumone_Relayer>;
  localarbitrumone_relayers: Array<localarbitrumone_Relayer>;
  localarbitrumone_sequencer?: Maybe<localarbitrumone_Sequencer>;
  localarbitrumone_sequencers: Array<localarbitrumone_Sequencer>;
  localarbitrumone_relayerFee?: Maybe<localarbitrumone_RelayerFee>;
  localarbitrumone_relayerFees: Array<localarbitrumone_RelayerFee>;
  localarbitrumone_originTransfer?: Maybe<localarbitrumone_OriginTransfer>;
  localarbitrumone_originTransfers: Array<localarbitrumone_OriginTransfer>;
  localarbitrumone_destinationTransfer?: Maybe<localarbitrumone_DestinationTransfer>;
  localarbitrumone_destinationTransfers: Array<localarbitrumone_DestinationTransfer>;
  localarbitrumone_originMessage?: Maybe<localarbitrumone_OriginMessage>;
  localarbitrumone_originMessages: Array<localarbitrumone_OriginMessage>;
  localarbitrumone_aggregateRoot?: Maybe<localarbitrumone_AggregateRoot>;
  localarbitrumone_aggregateRoots: Array<localarbitrumone_AggregateRoot>;
  localarbitrumone_connectorMeta?: Maybe<localarbitrumone_ConnectorMeta>;
  localarbitrumone_connectorMetas: Array<localarbitrumone_ConnectorMeta>;
  localarbitrumone_rootCount?: Maybe<localarbitrumone_RootCount>;
  localarbitrumone_rootCounts: Array<localarbitrumone_RootCount>;
  localarbitrumone_rootMessageSent?: Maybe<localarbitrumone_RootMessageSent>;
  localarbitrumone_rootMessageSents: Array<localarbitrumone_RootMessageSent>;
  localarbitrumone_relayerFeesIncrease?: Maybe<localarbitrumone_RelayerFeesIncrease>;
  localarbitrumone_relayerFeesIncreases: Array<localarbitrumone_RelayerFeesIncrease>;
  localarbitrumone_slippageUpdate?: Maybe<localarbitrumone_SlippageUpdate>;
  localarbitrumone_slippageUpdates: Array<localarbitrumone_SlippageUpdate>;
  localarbitrumone_snapshotRoot?: Maybe<localarbitrumone_SnapshotRoot>;
  localarbitrumone_snapshotRoots: Array<localarbitrumone_SnapshotRoot>;
  localarbitrumone_spokeConnectorMode?: Maybe<localarbitrumone_SpokeConnectorMode>;
  localarbitrumone_spokeConnectorModes: Array<localarbitrumone_SpokeConnectorMode>;
  localarbitrumone_aggregateRootProposed?: Maybe<localarbitrumone_AggregateRootProposed>;
  localarbitrumone_aggregateRootProposeds: Array<localarbitrumone_AggregateRootProposed>;
  localarbitrumone_optimisticRootFinalized?: Maybe<localarbitrumone_OptimisticRootFinalized>;
  localarbitrumone_optimisticRootFinalizeds: Array<localarbitrumone_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  localarbitrumone__meta?: Maybe<localarbitrumone__Meta_>;
};


export type Querylocalarbitrumone_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_Asset_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_Asset_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_AssetStatus_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_AssetBalance_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_Router_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_Router_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_RouterDailyTVL_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_RouterLiquidityEvent_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_Setting_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_Setting_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_Relayer_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_Relayer_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_Sequencer_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_Sequencer_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_RelayerFee_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_OriginTransfer_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_DestinationTransfer_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_OriginMessage_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_AggregateRoot_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_ConnectorMeta_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_RootCount_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_RootCount_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_RootMessageSent_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_RelayerFeesIncrease_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_SlippageUpdate_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_SnapshotRoot_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_SpokeConnectorMode_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_AggregateRootProposed_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_OptimisticRootFinalized_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrumone__metaArgs = {
  block?: InputMaybe<localarbitrumone_Block_height>;
};

export type localarbitrumone_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['localarbitrumone_Bytes']>;
};

export type localarbitrumone_RelayerFee = {
  id: Scalars['ID'];
  transfer: localarbitrumone_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['localarbitrumone_Bytes'];
};

export type localarbitrumone_RelayerFee_filter = {
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
  transfer_?: InputMaybe<localarbitrumone_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  asset_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  asset_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  asset_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  asset_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  asset_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localarbitrumone_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localarbitrumone_RelayerFee_filter>>>;
};

export type localarbitrumone_RelayerFee_orderBy =
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

export type localarbitrumone_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: localarbitrumone_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['localarbitrumone_Bytes']>;
  caller: Scalars['localarbitrumone_Bytes'];
  transactionHash: Scalars['localarbitrumone_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type localarbitrumone_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<localarbitrumone_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  asset_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  asset_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  asset_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  asset_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  asset_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
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
  _change_block?: InputMaybe<localarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localarbitrumone_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localarbitrumone_RelayerFeesIncrease_filter>>>;
};

export type localarbitrumone_RelayerFeesIncrease_orderBy =
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

export type localarbitrumone_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  relayer_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localarbitrumone_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localarbitrumone_Relayer_filter>>>;
};

export type localarbitrumone_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type localarbitrumone_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type localarbitrumone_RootCount_filter = {
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
  _change_block?: InputMaybe<localarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localarbitrumone_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localarbitrumone_RootCount_filter>>>;
};

export type localarbitrumone_RootCount_orderBy =
  | 'id'
  | 'count';

export type localarbitrumone_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['localarbitrumone_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash?: Maybe<Scalars['localarbitrumone_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type localarbitrumone_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  root_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
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
  _change_block?: InputMaybe<localarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localarbitrumone_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localarbitrumone_RootMessageSent_filter>>>;
};

export type localarbitrumone_RootMessageSent_orderBy =
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

export type localarbitrumone_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['localarbitrumone_Bytes']>;
  recipient?: Maybe<Scalars['localarbitrumone_Bytes']>;
  proposedOwner?: Maybe<Scalars['localarbitrumone_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<localarbitrumone_AssetBalance>;
};


export type localarbitrumone_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_AssetBalance_filter>;
};

export type localarbitrumone_RouterDailyTVL = {
  id: Scalars['ID'];
  router: localarbitrumone_Router;
  asset: localarbitrumone_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type localarbitrumone_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<localarbitrumone_Router_filter>;
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
  asset_?: InputMaybe<localarbitrumone_Asset_filter>;
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
  _change_block?: InputMaybe<localarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localarbitrumone_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localarbitrumone_RouterDailyTVL_filter>>>;
};

export type localarbitrumone_RouterDailyTVL_orderBy =
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

export type localarbitrumone_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<localarbitrumone_RouterLiquidityEventType>;
  router: localarbitrumone_Router;
  asset: localarbitrumone_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['localarbitrumone_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['localarbitrumone_Bytes'];
  nonce: Scalars['BigInt'];
};

export type localarbitrumone_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type localarbitrumone_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<localarbitrumone_RouterLiquidityEventType>;
  type_not?: InputMaybe<localarbitrumone_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<localarbitrumone_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<localarbitrumone_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<localarbitrumone_Router_filter>;
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
  asset_?: InputMaybe<localarbitrumone_Asset_filter>;
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
  caller?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localarbitrumone_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localarbitrumone_RouterLiquidityEvent_filter>>>;
};

export type localarbitrumone_RouterLiquidityEvent_orderBy =
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

export type localarbitrumone_Router_filter = {
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
  owner?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  owner_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  owner_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  owner_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  owner_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  owner_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  recipient?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  recipient_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<localarbitrumone_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localarbitrumone_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localarbitrumone_Router_filter>>>;
};

export type localarbitrumone_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type localarbitrumone_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['localarbitrumone_Bytes']>;
};

export type localarbitrumone_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localarbitrumone_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localarbitrumone_Sequencer_filter>>>;
};

export type localarbitrumone_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type localarbitrumone_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['localarbitrumone_Bytes'];
};

export type localarbitrumone_Setting_filter = {
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
  caller?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localarbitrumone_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localarbitrumone_Setting_filter>>>;
};

export type localarbitrumone_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type localarbitrumone_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: localarbitrumone_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['localarbitrumone_Bytes'];
  transactionHash: Scalars['localarbitrumone_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type localarbitrumone_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<localarbitrumone_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
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
  _change_block?: InputMaybe<localarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localarbitrumone_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localarbitrumone_SlippageUpdate_filter>>>;
};

export type localarbitrumone_SlippageUpdate_orderBy =
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

export type localarbitrumone_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['localarbitrumone_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type localarbitrumone_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_not?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_gt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_lt?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_gte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_lte?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['localarbitrumone_Bytes']>>;
  root_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['localarbitrumone_Bytes']>;
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
  _change_block?: InputMaybe<localarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localarbitrumone_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localarbitrumone_SnapshotRoot_filter>>>;
};

export type localarbitrumone_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type localarbitrumone_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type localarbitrumone_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<localarbitrumone_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localarbitrumone_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localarbitrumone_SpokeConnectorMode_filter>>>;
};

export type localarbitrumone_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  localarbitrumone_asset?: Maybe<localarbitrumone_Asset>;
  localarbitrumone_assets: Array<localarbitrumone_Asset>;
  localarbitrumone_assetStatus?: Maybe<localarbitrumone_AssetStatus>;
  localarbitrumone_assetStatuses: Array<localarbitrumone_AssetStatus>;
  localarbitrumone_assetBalance?: Maybe<localarbitrumone_AssetBalance>;
  localarbitrumone_assetBalances: Array<localarbitrumone_AssetBalance>;
  localarbitrumone_router?: Maybe<localarbitrumone_Router>;
  localarbitrumone_routers: Array<localarbitrumone_Router>;
  localarbitrumone_routerDailyTVL?: Maybe<localarbitrumone_RouterDailyTVL>;
  localarbitrumone_routerDailyTVLs: Array<localarbitrumone_RouterDailyTVL>;
  localarbitrumone_routerLiquidityEvent?: Maybe<localarbitrumone_RouterLiquidityEvent>;
  localarbitrumone_routerLiquidityEvents: Array<localarbitrumone_RouterLiquidityEvent>;
  localarbitrumone_setting?: Maybe<localarbitrumone_Setting>;
  localarbitrumone_settings: Array<localarbitrumone_Setting>;
  localarbitrumone_relayer?: Maybe<localarbitrumone_Relayer>;
  localarbitrumone_relayers: Array<localarbitrumone_Relayer>;
  localarbitrumone_sequencer?: Maybe<localarbitrumone_Sequencer>;
  localarbitrumone_sequencers: Array<localarbitrumone_Sequencer>;
  localarbitrumone_relayerFee?: Maybe<localarbitrumone_RelayerFee>;
  localarbitrumone_relayerFees: Array<localarbitrumone_RelayerFee>;
  localarbitrumone_originTransfer?: Maybe<localarbitrumone_OriginTransfer>;
  localarbitrumone_originTransfers: Array<localarbitrumone_OriginTransfer>;
  localarbitrumone_destinationTransfer?: Maybe<localarbitrumone_DestinationTransfer>;
  localarbitrumone_destinationTransfers: Array<localarbitrumone_DestinationTransfer>;
  localarbitrumone_originMessage?: Maybe<localarbitrumone_OriginMessage>;
  localarbitrumone_originMessages: Array<localarbitrumone_OriginMessage>;
  localarbitrumone_aggregateRoot?: Maybe<localarbitrumone_AggregateRoot>;
  localarbitrumone_aggregateRoots: Array<localarbitrumone_AggregateRoot>;
  localarbitrumone_connectorMeta?: Maybe<localarbitrumone_ConnectorMeta>;
  localarbitrumone_connectorMetas: Array<localarbitrumone_ConnectorMeta>;
  localarbitrumone_rootCount?: Maybe<localarbitrumone_RootCount>;
  localarbitrumone_rootCounts: Array<localarbitrumone_RootCount>;
  localarbitrumone_rootMessageSent?: Maybe<localarbitrumone_RootMessageSent>;
  localarbitrumone_rootMessageSents: Array<localarbitrumone_RootMessageSent>;
  localarbitrumone_relayerFeesIncrease?: Maybe<localarbitrumone_RelayerFeesIncrease>;
  localarbitrumone_relayerFeesIncreases: Array<localarbitrumone_RelayerFeesIncrease>;
  localarbitrumone_slippageUpdate?: Maybe<localarbitrumone_SlippageUpdate>;
  localarbitrumone_slippageUpdates: Array<localarbitrumone_SlippageUpdate>;
  localarbitrumone_snapshotRoot?: Maybe<localarbitrumone_SnapshotRoot>;
  localarbitrumone_snapshotRoots: Array<localarbitrumone_SnapshotRoot>;
  localarbitrumone_spokeConnectorMode?: Maybe<localarbitrumone_SpokeConnectorMode>;
  localarbitrumone_spokeConnectorModes: Array<localarbitrumone_SpokeConnectorMode>;
  localarbitrumone_aggregateRootProposed?: Maybe<localarbitrumone_AggregateRootProposed>;
  localarbitrumone_aggregateRootProposeds: Array<localarbitrumone_AggregateRootProposed>;
  localarbitrumone_optimisticRootFinalized?: Maybe<localarbitrumone_OptimisticRootFinalized>;
  localarbitrumone_optimisticRootFinalizeds: Array<localarbitrumone_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  localarbitrumone__meta?: Maybe<localarbitrumone__Meta_>;
};


export type Subscriptionlocalarbitrumone_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_Asset_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_Asset_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_AssetStatus_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_AssetBalance_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_Router_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_Router_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_RouterDailyTVL_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_RouterLiquidityEvent_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_Setting_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_Setting_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_Relayer_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_Relayer_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_Sequencer_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_Sequencer_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_RelayerFee_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_OriginTransfer_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_DestinationTransfer_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_OriginMessage_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_AggregateRoot_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_ConnectorMeta_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_RootCount_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_RootCount_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_RootMessageSent_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_RelayerFeesIncrease_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_SlippageUpdate_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_SnapshotRoot_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_SpokeConnectorMode_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_AggregateRootProposed_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrumone_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<localarbitrumone_OrderDirection>;
  where?: InputMaybe<localarbitrumone_OptimisticRootFinalized_filter>;
  block?: InputMaybe<localarbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrumone__metaArgs = {
  block?: InputMaybe<localarbitrumone_Block_height>;
};

export type localarbitrumone_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type localarbitrumone__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['localarbitrumone_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type localarbitrumone__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: localarbitrumone__Block_;
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
  localarbitrumone_asset: InContextSdkMethod<Query['localarbitrumone_asset'], Querylocalarbitrumone_assetArgs, MeshContext>,
  /** null **/
  localarbitrumone_assets: InContextSdkMethod<Query['localarbitrumone_assets'], Querylocalarbitrumone_assetsArgs, MeshContext>,
  /** null **/
  localarbitrumone_assetStatus: InContextSdkMethod<Query['localarbitrumone_assetStatus'], Querylocalarbitrumone_assetStatusArgs, MeshContext>,
  /** null **/
  localarbitrumone_assetStatuses: InContextSdkMethod<Query['localarbitrumone_assetStatuses'], Querylocalarbitrumone_assetStatusesArgs, MeshContext>,
  /** null **/
  localarbitrumone_assetBalance: InContextSdkMethod<Query['localarbitrumone_assetBalance'], Querylocalarbitrumone_assetBalanceArgs, MeshContext>,
  /** null **/
  localarbitrumone_assetBalances: InContextSdkMethod<Query['localarbitrumone_assetBalances'], Querylocalarbitrumone_assetBalancesArgs, MeshContext>,
  /** null **/
  localarbitrumone_router: InContextSdkMethod<Query['localarbitrumone_router'], Querylocalarbitrumone_routerArgs, MeshContext>,
  /** null **/
  localarbitrumone_routers: InContextSdkMethod<Query['localarbitrumone_routers'], Querylocalarbitrumone_routersArgs, MeshContext>,
  /** null **/
  localarbitrumone_routerDailyTVL: InContextSdkMethod<Query['localarbitrumone_routerDailyTVL'], Querylocalarbitrumone_routerDailyTVLArgs, MeshContext>,
  /** null **/
  localarbitrumone_routerDailyTVLs: InContextSdkMethod<Query['localarbitrumone_routerDailyTVLs'], Querylocalarbitrumone_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  localarbitrumone_routerLiquidityEvent: InContextSdkMethod<Query['localarbitrumone_routerLiquidityEvent'], Querylocalarbitrumone_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  localarbitrumone_routerLiquidityEvents: InContextSdkMethod<Query['localarbitrumone_routerLiquidityEvents'], Querylocalarbitrumone_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  localarbitrumone_setting: InContextSdkMethod<Query['localarbitrumone_setting'], Querylocalarbitrumone_settingArgs, MeshContext>,
  /** null **/
  localarbitrumone_settings: InContextSdkMethod<Query['localarbitrumone_settings'], Querylocalarbitrumone_settingsArgs, MeshContext>,
  /** null **/
  localarbitrumone_relayer: InContextSdkMethod<Query['localarbitrumone_relayer'], Querylocalarbitrumone_relayerArgs, MeshContext>,
  /** null **/
  localarbitrumone_relayers: InContextSdkMethod<Query['localarbitrumone_relayers'], Querylocalarbitrumone_relayersArgs, MeshContext>,
  /** null **/
  localarbitrumone_sequencer: InContextSdkMethod<Query['localarbitrumone_sequencer'], Querylocalarbitrumone_sequencerArgs, MeshContext>,
  /** null **/
  localarbitrumone_sequencers: InContextSdkMethod<Query['localarbitrumone_sequencers'], Querylocalarbitrumone_sequencersArgs, MeshContext>,
  /** null **/
  localarbitrumone_relayerFee: InContextSdkMethod<Query['localarbitrumone_relayerFee'], Querylocalarbitrumone_relayerFeeArgs, MeshContext>,
  /** null **/
  localarbitrumone_relayerFees: InContextSdkMethod<Query['localarbitrumone_relayerFees'], Querylocalarbitrumone_relayerFeesArgs, MeshContext>,
  /** null **/
  localarbitrumone_originTransfer: InContextSdkMethod<Query['localarbitrumone_originTransfer'], Querylocalarbitrumone_originTransferArgs, MeshContext>,
  /** null **/
  localarbitrumone_originTransfers: InContextSdkMethod<Query['localarbitrumone_originTransfers'], Querylocalarbitrumone_originTransfersArgs, MeshContext>,
  /** null **/
  localarbitrumone_destinationTransfer: InContextSdkMethod<Query['localarbitrumone_destinationTransfer'], Querylocalarbitrumone_destinationTransferArgs, MeshContext>,
  /** null **/
  localarbitrumone_destinationTransfers: InContextSdkMethod<Query['localarbitrumone_destinationTransfers'], Querylocalarbitrumone_destinationTransfersArgs, MeshContext>,
  /** null **/
  localarbitrumone_originMessage: InContextSdkMethod<Query['localarbitrumone_originMessage'], Querylocalarbitrumone_originMessageArgs, MeshContext>,
  /** null **/
  localarbitrumone_originMessages: InContextSdkMethod<Query['localarbitrumone_originMessages'], Querylocalarbitrumone_originMessagesArgs, MeshContext>,
  /** null **/
  localarbitrumone_aggregateRoot: InContextSdkMethod<Query['localarbitrumone_aggregateRoot'], Querylocalarbitrumone_aggregateRootArgs, MeshContext>,
  /** null **/
  localarbitrumone_aggregateRoots: InContextSdkMethod<Query['localarbitrumone_aggregateRoots'], Querylocalarbitrumone_aggregateRootsArgs, MeshContext>,
  /** null **/
  localarbitrumone_connectorMeta: InContextSdkMethod<Query['localarbitrumone_connectorMeta'], Querylocalarbitrumone_connectorMetaArgs, MeshContext>,
  /** null **/
  localarbitrumone_connectorMetas: InContextSdkMethod<Query['localarbitrumone_connectorMetas'], Querylocalarbitrumone_connectorMetasArgs, MeshContext>,
  /** null **/
  localarbitrumone_rootCount: InContextSdkMethod<Query['localarbitrumone_rootCount'], Querylocalarbitrumone_rootCountArgs, MeshContext>,
  /** null **/
  localarbitrumone_rootCounts: InContextSdkMethod<Query['localarbitrumone_rootCounts'], Querylocalarbitrumone_rootCountsArgs, MeshContext>,
  /** null **/
  localarbitrumone_rootMessageSent: InContextSdkMethod<Query['localarbitrumone_rootMessageSent'], Querylocalarbitrumone_rootMessageSentArgs, MeshContext>,
  /** null **/
  localarbitrumone_rootMessageSents: InContextSdkMethod<Query['localarbitrumone_rootMessageSents'], Querylocalarbitrumone_rootMessageSentsArgs, MeshContext>,
  /** null **/
  localarbitrumone_relayerFeesIncrease: InContextSdkMethod<Query['localarbitrumone_relayerFeesIncrease'], Querylocalarbitrumone_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  localarbitrumone_relayerFeesIncreases: InContextSdkMethod<Query['localarbitrumone_relayerFeesIncreases'], Querylocalarbitrumone_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  localarbitrumone_slippageUpdate: InContextSdkMethod<Query['localarbitrumone_slippageUpdate'], Querylocalarbitrumone_slippageUpdateArgs, MeshContext>,
  /** null **/
  localarbitrumone_slippageUpdates: InContextSdkMethod<Query['localarbitrumone_slippageUpdates'], Querylocalarbitrumone_slippageUpdatesArgs, MeshContext>,
  /** null **/
  localarbitrumone_snapshotRoot: InContextSdkMethod<Query['localarbitrumone_snapshotRoot'], Querylocalarbitrumone_snapshotRootArgs, MeshContext>,
  /** null **/
  localarbitrumone_snapshotRoots: InContextSdkMethod<Query['localarbitrumone_snapshotRoots'], Querylocalarbitrumone_snapshotRootsArgs, MeshContext>,
  /** null **/
  localarbitrumone_spokeConnectorMode: InContextSdkMethod<Query['localarbitrumone_spokeConnectorMode'], Querylocalarbitrumone_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  localarbitrumone_spokeConnectorModes: InContextSdkMethod<Query['localarbitrumone_spokeConnectorModes'], Querylocalarbitrumone_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  localarbitrumone_aggregateRootProposed: InContextSdkMethod<Query['localarbitrumone_aggregateRootProposed'], Querylocalarbitrumone_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  localarbitrumone_aggregateRootProposeds: InContextSdkMethod<Query['localarbitrumone_aggregateRootProposeds'], Querylocalarbitrumone_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  localarbitrumone_optimisticRootFinalized: InContextSdkMethod<Query['localarbitrumone_optimisticRootFinalized'], Querylocalarbitrumone_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  localarbitrumone_optimisticRootFinalizeds: InContextSdkMethod<Query['localarbitrumone_optimisticRootFinalizeds'], Querylocalarbitrumone_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  localarbitrumone__meta: InContextSdkMethod<Query['localarbitrumone__meta'], Querylocalarbitrumone__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  localarbitrumone_asset: InContextSdkMethod<Subscription['localarbitrumone_asset'], Subscriptionlocalarbitrumone_assetArgs, MeshContext>,
  /** null **/
  localarbitrumone_assets: InContextSdkMethod<Subscription['localarbitrumone_assets'], Subscriptionlocalarbitrumone_assetsArgs, MeshContext>,
  /** null **/
  localarbitrumone_assetStatus: InContextSdkMethod<Subscription['localarbitrumone_assetStatus'], Subscriptionlocalarbitrumone_assetStatusArgs, MeshContext>,
  /** null **/
  localarbitrumone_assetStatuses: InContextSdkMethod<Subscription['localarbitrumone_assetStatuses'], Subscriptionlocalarbitrumone_assetStatusesArgs, MeshContext>,
  /** null **/
  localarbitrumone_assetBalance: InContextSdkMethod<Subscription['localarbitrumone_assetBalance'], Subscriptionlocalarbitrumone_assetBalanceArgs, MeshContext>,
  /** null **/
  localarbitrumone_assetBalances: InContextSdkMethod<Subscription['localarbitrumone_assetBalances'], Subscriptionlocalarbitrumone_assetBalancesArgs, MeshContext>,
  /** null **/
  localarbitrumone_router: InContextSdkMethod<Subscription['localarbitrumone_router'], Subscriptionlocalarbitrumone_routerArgs, MeshContext>,
  /** null **/
  localarbitrumone_routers: InContextSdkMethod<Subscription['localarbitrumone_routers'], Subscriptionlocalarbitrumone_routersArgs, MeshContext>,
  /** null **/
  localarbitrumone_routerDailyTVL: InContextSdkMethod<Subscription['localarbitrumone_routerDailyTVL'], Subscriptionlocalarbitrumone_routerDailyTVLArgs, MeshContext>,
  /** null **/
  localarbitrumone_routerDailyTVLs: InContextSdkMethod<Subscription['localarbitrumone_routerDailyTVLs'], Subscriptionlocalarbitrumone_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  localarbitrumone_routerLiquidityEvent: InContextSdkMethod<Subscription['localarbitrumone_routerLiquidityEvent'], Subscriptionlocalarbitrumone_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  localarbitrumone_routerLiquidityEvents: InContextSdkMethod<Subscription['localarbitrumone_routerLiquidityEvents'], Subscriptionlocalarbitrumone_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  localarbitrumone_setting: InContextSdkMethod<Subscription['localarbitrumone_setting'], Subscriptionlocalarbitrumone_settingArgs, MeshContext>,
  /** null **/
  localarbitrumone_settings: InContextSdkMethod<Subscription['localarbitrumone_settings'], Subscriptionlocalarbitrumone_settingsArgs, MeshContext>,
  /** null **/
  localarbitrumone_relayer: InContextSdkMethod<Subscription['localarbitrumone_relayer'], Subscriptionlocalarbitrumone_relayerArgs, MeshContext>,
  /** null **/
  localarbitrumone_relayers: InContextSdkMethod<Subscription['localarbitrumone_relayers'], Subscriptionlocalarbitrumone_relayersArgs, MeshContext>,
  /** null **/
  localarbitrumone_sequencer: InContextSdkMethod<Subscription['localarbitrumone_sequencer'], Subscriptionlocalarbitrumone_sequencerArgs, MeshContext>,
  /** null **/
  localarbitrumone_sequencers: InContextSdkMethod<Subscription['localarbitrumone_sequencers'], Subscriptionlocalarbitrumone_sequencersArgs, MeshContext>,
  /** null **/
  localarbitrumone_relayerFee: InContextSdkMethod<Subscription['localarbitrumone_relayerFee'], Subscriptionlocalarbitrumone_relayerFeeArgs, MeshContext>,
  /** null **/
  localarbitrumone_relayerFees: InContextSdkMethod<Subscription['localarbitrumone_relayerFees'], Subscriptionlocalarbitrumone_relayerFeesArgs, MeshContext>,
  /** null **/
  localarbitrumone_originTransfer: InContextSdkMethod<Subscription['localarbitrumone_originTransfer'], Subscriptionlocalarbitrumone_originTransferArgs, MeshContext>,
  /** null **/
  localarbitrumone_originTransfers: InContextSdkMethod<Subscription['localarbitrumone_originTransfers'], Subscriptionlocalarbitrumone_originTransfersArgs, MeshContext>,
  /** null **/
  localarbitrumone_destinationTransfer: InContextSdkMethod<Subscription['localarbitrumone_destinationTransfer'], Subscriptionlocalarbitrumone_destinationTransferArgs, MeshContext>,
  /** null **/
  localarbitrumone_destinationTransfers: InContextSdkMethod<Subscription['localarbitrumone_destinationTransfers'], Subscriptionlocalarbitrumone_destinationTransfersArgs, MeshContext>,
  /** null **/
  localarbitrumone_originMessage: InContextSdkMethod<Subscription['localarbitrumone_originMessage'], Subscriptionlocalarbitrumone_originMessageArgs, MeshContext>,
  /** null **/
  localarbitrumone_originMessages: InContextSdkMethod<Subscription['localarbitrumone_originMessages'], Subscriptionlocalarbitrumone_originMessagesArgs, MeshContext>,
  /** null **/
  localarbitrumone_aggregateRoot: InContextSdkMethod<Subscription['localarbitrumone_aggregateRoot'], Subscriptionlocalarbitrumone_aggregateRootArgs, MeshContext>,
  /** null **/
  localarbitrumone_aggregateRoots: InContextSdkMethod<Subscription['localarbitrumone_aggregateRoots'], Subscriptionlocalarbitrumone_aggregateRootsArgs, MeshContext>,
  /** null **/
  localarbitrumone_connectorMeta: InContextSdkMethod<Subscription['localarbitrumone_connectorMeta'], Subscriptionlocalarbitrumone_connectorMetaArgs, MeshContext>,
  /** null **/
  localarbitrumone_connectorMetas: InContextSdkMethod<Subscription['localarbitrumone_connectorMetas'], Subscriptionlocalarbitrumone_connectorMetasArgs, MeshContext>,
  /** null **/
  localarbitrumone_rootCount: InContextSdkMethod<Subscription['localarbitrumone_rootCount'], Subscriptionlocalarbitrumone_rootCountArgs, MeshContext>,
  /** null **/
  localarbitrumone_rootCounts: InContextSdkMethod<Subscription['localarbitrumone_rootCounts'], Subscriptionlocalarbitrumone_rootCountsArgs, MeshContext>,
  /** null **/
  localarbitrumone_rootMessageSent: InContextSdkMethod<Subscription['localarbitrumone_rootMessageSent'], Subscriptionlocalarbitrumone_rootMessageSentArgs, MeshContext>,
  /** null **/
  localarbitrumone_rootMessageSents: InContextSdkMethod<Subscription['localarbitrumone_rootMessageSents'], Subscriptionlocalarbitrumone_rootMessageSentsArgs, MeshContext>,
  /** null **/
  localarbitrumone_relayerFeesIncrease: InContextSdkMethod<Subscription['localarbitrumone_relayerFeesIncrease'], Subscriptionlocalarbitrumone_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  localarbitrumone_relayerFeesIncreases: InContextSdkMethod<Subscription['localarbitrumone_relayerFeesIncreases'], Subscriptionlocalarbitrumone_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  localarbitrumone_slippageUpdate: InContextSdkMethod<Subscription['localarbitrumone_slippageUpdate'], Subscriptionlocalarbitrumone_slippageUpdateArgs, MeshContext>,
  /** null **/
  localarbitrumone_slippageUpdates: InContextSdkMethod<Subscription['localarbitrumone_slippageUpdates'], Subscriptionlocalarbitrumone_slippageUpdatesArgs, MeshContext>,
  /** null **/
  localarbitrumone_snapshotRoot: InContextSdkMethod<Subscription['localarbitrumone_snapshotRoot'], Subscriptionlocalarbitrumone_snapshotRootArgs, MeshContext>,
  /** null **/
  localarbitrumone_snapshotRoots: InContextSdkMethod<Subscription['localarbitrumone_snapshotRoots'], Subscriptionlocalarbitrumone_snapshotRootsArgs, MeshContext>,
  /** null **/
  localarbitrumone_spokeConnectorMode: InContextSdkMethod<Subscription['localarbitrumone_spokeConnectorMode'], Subscriptionlocalarbitrumone_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  localarbitrumone_spokeConnectorModes: InContextSdkMethod<Subscription['localarbitrumone_spokeConnectorModes'], Subscriptionlocalarbitrumone_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  localarbitrumone_aggregateRootProposed: InContextSdkMethod<Subscription['localarbitrumone_aggregateRootProposed'], Subscriptionlocalarbitrumone_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  localarbitrumone_aggregateRootProposeds: InContextSdkMethod<Subscription['localarbitrumone_aggregateRootProposeds'], Subscriptionlocalarbitrumone_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  localarbitrumone_optimisticRootFinalized: InContextSdkMethod<Subscription['localarbitrumone_optimisticRootFinalized'], Subscriptionlocalarbitrumone_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  localarbitrumone_optimisticRootFinalizeds: InContextSdkMethod<Subscription['localarbitrumone_optimisticRootFinalizeds'], Subscriptionlocalarbitrumone_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  localarbitrumone__meta: InContextSdkMethod<Subscription['localarbitrumone__meta'], Subscriptionlocalarbitrumone__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_LocalArbitrumOne"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
