// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace StableSwapPolygonZkEvmTypes {
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
  polygonzkevm_swap_BigDecimal: any;
  BigInt: any;
  polygonzkevm_swap_Bytes: any;
  polygonzkevm_swap_Int8: any;
};

export type polygonzkevm_swap_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['polygonzkevm_swap_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type polygonzkevm_swap_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['polygonzkevm_swap_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type polygonzkevm_swap_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
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
  _change_block?: InputMaybe<polygonzkevm_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_AggregateRootProposed_filter>>>;
};

export type polygonzkevm_swap_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type polygonzkevm_swap_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  root_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_AggregateRoot_filter>>>;
};

export type polygonzkevm_swap_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type polygonzkevm_swap_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  localAsset?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<polygonzkevm_swap_AssetStatus>;
};

export type polygonzkevm_swap_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: polygonzkevm_swap_Router;
  asset: polygonzkevm_swap_Asset;
  feesEarned: Scalars['BigInt'];
};

export type polygonzkevm_swap_AssetBalance_filter = {
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
  router_?: InputMaybe<polygonzkevm_swap_Router_filter>;
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
  asset_?: InputMaybe<polygonzkevm_swap_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_AssetBalance_filter>>>;
};

export type polygonzkevm_swap_AssetBalance_orderBy =
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

export type polygonzkevm_swap_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type polygonzkevm_swap_AssetStatus_filter = {
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
  _change_block?: InputMaybe<polygonzkevm_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_AssetStatus_filter>>>;
};

export type polygonzkevm_swap_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type polygonzkevm_swap_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  key_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  key_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  key_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  key_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  key_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  key_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  localAsset?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
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
  status_?: InputMaybe<polygonzkevm_swap_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_Asset_filter>>>;
};

export type polygonzkevm_swap_Asset_orderBy =
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

export type polygonzkevm_swap_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type polygonzkevm_swap_Block_height = {
  hash?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type polygonzkevm_swap_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  rootManager?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  mirrorConnector?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
};

export type polygonzkevm_swap_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  amb_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  amb_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  amb_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  amb_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  amb_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  rootManager?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_ConnectorMeta_filter>>>;
};

export type polygonzkevm_swap_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type polygonzkevm_swap_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<polygonzkevm_swap_TransferStatus>;
  routers?: Maybe<Array<polygonzkevm_swap_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  delegate?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  asset?: Maybe<polygonzkevm_swap_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type polygonzkevm_swap_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_Router_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_Router_filter>;
};

export type polygonzkevm_swap_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transferId_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<polygonzkevm_swap_TransferStatus>;
  status_not?: InputMaybe<polygonzkevm_swap_TransferStatus>;
  status_in?: InputMaybe<Array<polygonzkevm_swap_TransferStatus>>;
  status_not_in?: InputMaybe<Array<polygonzkevm_swap_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<polygonzkevm_swap_Router_filter>;
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
  to?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  to_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  to_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  to_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  to_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  to_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  to_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  delegate?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  delegate_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  callData_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  callData_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  callData_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  callData_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  callData_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
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
  originSender?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  originSender_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
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
  asset_?: InputMaybe<polygonzkevm_swap_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_DestinationTransfer_filter>>>;
};

export type polygonzkevm_swap_DestinationTransfer_orderBy =
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

export type polygonzkevm_swap_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['polygonzkevm_swap_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type polygonzkevm_swap_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
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
  _change_block?: InputMaybe<polygonzkevm_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_OptimisticRootFinalized_filter>>>;
};

export type polygonzkevm_swap_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type polygonzkevm_swap_OrderDirection =
  | 'asc'
  | 'desc';

export type polygonzkevm_swap_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  root?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<polygonzkevm_swap_RootCount>;
};

export type polygonzkevm_swap_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transferId_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  leaf_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  message_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  message_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  message_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  message_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  message_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  message_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  root_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
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
  rootCount_?: InputMaybe<polygonzkevm_swap_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_OriginMessage_filter>>>;
};

export type polygonzkevm_swap_OriginMessage_orderBy =
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

export type polygonzkevm_swap_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<polygonzkevm_swap_TransferStatus>;
  messageHash?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  delegate?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  asset?: Maybe<polygonzkevm_swap_Asset>;
  transactingAsset?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  message?: Maybe<polygonzkevm_swap_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<polygonzkevm_swap_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type polygonzkevm_swap_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_RelayerFee_filter>;
};

export type polygonzkevm_swap_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transferId_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<polygonzkevm_swap_TransferStatus>;
  status_not?: InputMaybe<polygonzkevm_swap_TransferStatus>;
  status_in?: InputMaybe<Array<polygonzkevm_swap_TransferStatus>>;
  status_not_in?: InputMaybe<Array<polygonzkevm_swap_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
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
  to?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  to_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  to_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  to_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  to_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  to_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  to_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  delegate?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  delegate_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  callData_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  callData_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  callData_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  callData_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  callData_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  originSender_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
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
  asset_?: InputMaybe<polygonzkevm_swap_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
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
  message_?: InputMaybe<polygonzkevm_swap_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<polygonzkevm_swap_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_OriginTransfer_filter>>>;
};

export type polygonzkevm_swap_OriginTransfer_orderBy =
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
  polygonzkevm_swap_asset?: Maybe<polygonzkevm_swap_Asset>;
  polygonzkevm_swap_assets: Array<polygonzkevm_swap_Asset>;
  polygonzkevm_swap_assetStatus?: Maybe<polygonzkevm_swap_AssetStatus>;
  polygonzkevm_swap_assetStatuses: Array<polygonzkevm_swap_AssetStatus>;
  polygonzkevm_swap_assetBalance?: Maybe<polygonzkevm_swap_AssetBalance>;
  polygonzkevm_swap_assetBalances: Array<polygonzkevm_swap_AssetBalance>;
  polygonzkevm_swap_router?: Maybe<polygonzkevm_swap_Router>;
  polygonzkevm_swap_routers: Array<polygonzkevm_swap_Router>;
  polygonzkevm_swap_routerDailyTVL?: Maybe<polygonzkevm_swap_RouterDailyTVL>;
  polygonzkevm_swap_routerDailyTVLs: Array<polygonzkevm_swap_RouterDailyTVL>;
  polygonzkevm_swap_routerLiquidityEvent?: Maybe<polygonzkevm_swap_RouterLiquidityEvent>;
  polygonzkevm_swap_routerLiquidityEvents: Array<polygonzkevm_swap_RouterLiquidityEvent>;
  polygonzkevm_swap_setting?: Maybe<polygonzkevm_swap_Setting>;
  polygonzkevm_swap_settings: Array<polygonzkevm_swap_Setting>;
  polygonzkevm_swap_relayer?: Maybe<polygonzkevm_swap_Relayer>;
  polygonzkevm_swap_relayers: Array<polygonzkevm_swap_Relayer>;
  polygonzkevm_swap_sequencer?: Maybe<polygonzkevm_swap_Sequencer>;
  polygonzkevm_swap_sequencers: Array<polygonzkevm_swap_Sequencer>;
  polygonzkevm_swap_relayerFee?: Maybe<polygonzkevm_swap_RelayerFee>;
  polygonzkevm_swap_relayerFees: Array<polygonzkevm_swap_RelayerFee>;
  polygonzkevm_swap_originTransfer?: Maybe<polygonzkevm_swap_OriginTransfer>;
  polygonzkevm_swap_originTransfers: Array<polygonzkevm_swap_OriginTransfer>;
  polygonzkevm_swap_destinationTransfer?: Maybe<polygonzkevm_swap_DestinationTransfer>;
  polygonzkevm_swap_destinationTransfers: Array<polygonzkevm_swap_DestinationTransfer>;
  polygonzkevm_swap_originMessage?: Maybe<polygonzkevm_swap_OriginMessage>;
  polygonzkevm_swap_originMessages: Array<polygonzkevm_swap_OriginMessage>;
  polygonzkevm_swap_aggregateRoot?: Maybe<polygonzkevm_swap_AggregateRoot>;
  polygonzkevm_swap_aggregateRoots: Array<polygonzkevm_swap_AggregateRoot>;
  polygonzkevm_swap_connectorMeta?: Maybe<polygonzkevm_swap_ConnectorMeta>;
  polygonzkevm_swap_connectorMetas: Array<polygonzkevm_swap_ConnectorMeta>;
  polygonzkevm_swap_rootCount?: Maybe<polygonzkevm_swap_RootCount>;
  polygonzkevm_swap_rootCounts: Array<polygonzkevm_swap_RootCount>;
  polygonzkevm_swap_rootMessageSent?: Maybe<polygonzkevm_swap_RootMessageSent>;
  polygonzkevm_swap_rootMessageSents: Array<polygonzkevm_swap_RootMessageSent>;
  polygonzkevm_swap_relayerFeesIncrease?: Maybe<polygonzkevm_swap_RelayerFeesIncrease>;
  polygonzkevm_swap_relayerFeesIncreases: Array<polygonzkevm_swap_RelayerFeesIncrease>;
  polygonzkevm_swap_slippageUpdate?: Maybe<polygonzkevm_swap_SlippageUpdate>;
  polygonzkevm_swap_slippageUpdates: Array<polygonzkevm_swap_SlippageUpdate>;
  polygonzkevm_swap_snapshotRoot?: Maybe<polygonzkevm_swap_SnapshotRoot>;
  polygonzkevm_swap_snapshotRoots: Array<polygonzkevm_swap_SnapshotRoot>;
  polygonzkevm_swap_spokeConnectorMode?: Maybe<polygonzkevm_swap_SpokeConnectorMode>;
  polygonzkevm_swap_spokeConnectorModes: Array<polygonzkevm_swap_SpokeConnectorMode>;
  polygonzkevm_swap_aggregateRootProposed?: Maybe<polygonzkevm_swap_AggregateRootProposed>;
  polygonzkevm_swap_aggregateRootProposeds: Array<polygonzkevm_swap_AggregateRootProposed>;
  polygonzkevm_swap_optimisticRootFinalized?: Maybe<polygonzkevm_swap_OptimisticRootFinalized>;
  polygonzkevm_swap_optimisticRootFinalizeds: Array<polygonzkevm_swap_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  polygonzkevm_swap__meta?: Maybe<polygonzkevm_swap__Meta_>;
};


export type Querypolygonzkevm_swap_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_Asset_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_Asset_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_AssetStatus_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_AssetBalance_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_Router_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_Router_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_RouterDailyTVL_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_RouterLiquidityEvent_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_Setting_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_Setting_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_Relayer_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_Relayer_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_Sequencer_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_Sequencer_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_RelayerFee_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_OriginTransfer_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_DestinationTransfer_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_OriginMessage_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_AggregateRoot_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_ConnectorMeta_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_RootCount_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_RootCount_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_RootMessageSent_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_RelayerFeesIncrease_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_SlippageUpdate_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_SnapshotRoot_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_SpokeConnectorMode_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_AggregateRootProposed_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_OptimisticRootFinalized_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygonzkevm_swap__metaArgs = {
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
};

export type polygonzkevm_swap_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
};

export type polygonzkevm_swap_RelayerFee = {
  id: Scalars['ID'];
  transfer: polygonzkevm_swap_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['polygonzkevm_swap_Bytes'];
};

export type polygonzkevm_swap_RelayerFee_filter = {
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
  transfer_?: InputMaybe<polygonzkevm_swap_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  asset_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  asset_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  asset_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  asset_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  asset_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_RelayerFee_filter>>>;
};

export type polygonzkevm_swap_RelayerFee_orderBy =
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

export type polygonzkevm_swap_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: polygonzkevm_swap_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller: Scalars['polygonzkevm_swap_Bytes'];
  transactionHash: Scalars['polygonzkevm_swap_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type polygonzkevm_swap_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<polygonzkevm_swap_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  asset_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  asset_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  asset_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  asset_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  asset_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
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
  _change_block?: InputMaybe<polygonzkevm_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_RelayerFeesIncrease_filter>>>;
};

export type polygonzkevm_swap_RelayerFeesIncrease_orderBy =
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

export type polygonzkevm_swap_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  relayer_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_Relayer_filter>>>;
};

export type polygonzkevm_swap_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type polygonzkevm_swap_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type polygonzkevm_swap_RootCount_filter = {
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
  _change_block?: InputMaybe<polygonzkevm_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_RootCount_filter>>>;
};

export type polygonzkevm_swap_RootCount_orderBy =
  | 'id'
  | 'count';

export type polygonzkevm_swap_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type polygonzkevm_swap_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  root_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
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
  _change_block?: InputMaybe<polygonzkevm_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_RootMessageSent_filter>>>;
};

export type polygonzkevm_swap_RootMessageSent_orderBy =
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

export type polygonzkevm_swap_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  recipient?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  proposedOwner?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<polygonzkevm_swap_AssetBalance>;
};


export type polygonzkevm_swap_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_AssetBalance_filter>;
};

export type polygonzkevm_swap_RouterDailyTVL = {
  id: Scalars['ID'];
  router: polygonzkevm_swap_Router;
  asset: polygonzkevm_swap_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type polygonzkevm_swap_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<polygonzkevm_swap_Router_filter>;
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
  asset_?: InputMaybe<polygonzkevm_swap_Asset_filter>;
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
  _change_block?: InputMaybe<polygonzkevm_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_RouterDailyTVL_filter>>>;
};

export type polygonzkevm_swap_RouterDailyTVL_orderBy =
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

export type polygonzkevm_swap_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<polygonzkevm_swap_RouterLiquidityEventType>;
  router: polygonzkevm_swap_Router;
  asset: polygonzkevm_swap_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['polygonzkevm_swap_Bytes'];
  nonce: Scalars['BigInt'];
};

export type polygonzkevm_swap_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type polygonzkevm_swap_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<polygonzkevm_swap_RouterLiquidityEventType>;
  type_not?: InputMaybe<polygonzkevm_swap_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<polygonzkevm_swap_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<polygonzkevm_swap_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<polygonzkevm_swap_Router_filter>;
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
  asset_?: InputMaybe<polygonzkevm_swap_Asset_filter>;
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
  caller?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_RouterLiquidityEvent_filter>>>;
};

export type polygonzkevm_swap_RouterLiquidityEvent_orderBy =
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

export type polygonzkevm_swap_Router_filter = {
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
  owner?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  owner_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  owner_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  owner_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  owner_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  owner_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  recipient?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  recipient_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<polygonzkevm_swap_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_Router_filter>>>;
};

export type polygonzkevm_swap_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type polygonzkevm_swap_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
};

export type polygonzkevm_swap_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_Sequencer_filter>>>;
};

export type polygonzkevm_swap_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type polygonzkevm_swap_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['polygonzkevm_swap_Bytes'];
};

export type polygonzkevm_swap_Setting_filter = {
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
  caller?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygonzkevm_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_Setting_filter>>>;
};

export type polygonzkevm_swap_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type polygonzkevm_swap_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: polygonzkevm_swap_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['polygonzkevm_swap_Bytes'];
  transactionHash: Scalars['polygonzkevm_swap_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type polygonzkevm_swap_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<polygonzkevm_swap_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
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
  _change_block?: InputMaybe<polygonzkevm_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_SlippageUpdate_filter>>>;
};

export type polygonzkevm_swap_SlippageUpdate_orderBy =
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

export type polygonzkevm_swap_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['polygonzkevm_swap_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type polygonzkevm_swap_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_not?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_gt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_lt?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_gte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_lte?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['polygonzkevm_swap_Bytes']>>;
  root_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['polygonzkevm_swap_Bytes']>;
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
  _change_block?: InputMaybe<polygonzkevm_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_SnapshotRoot_filter>>>;
};

export type polygonzkevm_swap_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type polygonzkevm_swap_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type polygonzkevm_swap_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<polygonzkevm_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<polygonzkevm_swap_SpokeConnectorMode_filter>>>;
};

export type polygonzkevm_swap_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  polygonzkevm_swap_asset?: Maybe<polygonzkevm_swap_Asset>;
  polygonzkevm_swap_assets: Array<polygonzkevm_swap_Asset>;
  polygonzkevm_swap_assetStatus?: Maybe<polygonzkevm_swap_AssetStatus>;
  polygonzkevm_swap_assetStatuses: Array<polygonzkevm_swap_AssetStatus>;
  polygonzkevm_swap_assetBalance?: Maybe<polygonzkevm_swap_AssetBalance>;
  polygonzkevm_swap_assetBalances: Array<polygonzkevm_swap_AssetBalance>;
  polygonzkevm_swap_router?: Maybe<polygonzkevm_swap_Router>;
  polygonzkevm_swap_routers: Array<polygonzkevm_swap_Router>;
  polygonzkevm_swap_routerDailyTVL?: Maybe<polygonzkevm_swap_RouterDailyTVL>;
  polygonzkevm_swap_routerDailyTVLs: Array<polygonzkevm_swap_RouterDailyTVL>;
  polygonzkevm_swap_routerLiquidityEvent?: Maybe<polygonzkevm_swap_RouterLiquidityEvent>;
  polygonzkevm_swap_routerLiquidityEvents: Array<polygonzkevm_swap_RouterLiquidityEvent>;
  polygonzkevm_swap_setting?: Maybe<polygonzkevm_swap_Setting>;
  polygonzkevm_swap_settings: Array<polygonzkevm_swap_Setting>;
  polygonzkevm_swap_relayer?: Maybe<polygonzkevm_swap_Relayer>;
  polygonzkevm_swap_relayers: Array<polygonzkevm_swap_Relayer>;
  polygonzkevm_swap_sequencer?: Maybe<polygonzkevm_swap_Sequencer>;
  polygonzkevm_swap_sequencers: Array<polygonzkevm_swap_Sequencer>;
  polygonzkevm_swap_relayerFee?: Maybe<polygonzkevm_swap_RelayerFee>;
  polygonzkevm_swap_relayerFees: Array<polygonzkevm_swap_RelayerFee>;
  polygonzkevm_swap_originTransfer?: Maybe<polygonzkevm_swap_OriginTransfer>;
  polygonzkevm_swap_originTransfers: Array<polygonzkevm_swap_OriginTransfer>;
  polygonzkevm_swap_destinationTransfer?: Maybe<polygonzkevm_swap_DestinationTransfer>;
  polygonzkevm_swap_destinationTransfers: Array<polygonzkevm_swap_DestinationTransfer>;
  polygonzkevm_swap_originMessage?: Maybe<polygonzkevm_swap_OriginMessage>;
  polygonzkevm_swap_originMessages: Array<polygonzkevm_swap_OriginMessage>;
  polygonzkevm_swap_aggregateRoot?: Maybe<polygonzkevm_swap_AggregateRoot>;
  polygonzkevm_swap_aggregateRoots: Array<polygonzkevm_swap_AggregateRoot>;
  polygonzkevm_swap_connectorMeta?: Maybe<polygonzkevm_swap_ConnectorMeta>;
  polygonzkevm_swap_connectorMetas: Array<polygonzkevm_swap_ConnectorMeta>;
  polygonzkevm_swap_rootCount?: Maybe<polygonzkevm_swap_RootCount>;
  polygonzkevm_swap_rootCounts: Array<polygonzkevm_swap_RootCount>;
  polygonzkevm_swap_rootMessageSent?: Maybe<polygonzkevm_swap_RootMessageSent>;
  polygonzkevm_swap_rootMessageSents: Array<polygonzkevm_swap_RootMessageSent>;
  polygonzkevm_swap_relayerFeesIncrease?: Maybe<polygonzkevm_swap_RelayerFeesIncrease>;
  polygonzkevm_swap_relayerFeesIncreases: Array<polygonzkevm_swap_RelayerFeesIncrease>;
  polygonzkevm_swap_slippageUpdate?: Maybe<polygonzkevm_swap_SlippageUpdate>;
  polygonzkevm_swap_slippageUpdates: Array<polygonzkevm_swap_SlippageUpdate>;
  polygonzkevm_swap_snapshotRoot?: Maybe<polygonzkevm_swap_SnapshotRoot>;
  polygonzkevm_swap_snapshotRoots: Array<polygonzkevm_swap_SnapshotRoot>;
  polygonzkevm_swap_spokeConnectorMode?: Maybe<polygonzkevm_swap_SpokeConnectorMode>;
  polygonzkevm_swap_spokeConnectorModes: Array<polygonzkevm_swap_SpokeConnectorMode>;
  polygonzkevm_swap_aggregateRootProposed?: Maybe<polygonzkevm_swap_AggregateRootProposed>;
  polygonzkevm_swap_aggregateRootProposeds: Array<polygonzkevm_swap_AggregateRootProposed>;
  polygonzkevm_swap_optimisticRootFinalized?: Maybe<polygonzkevm_swap_OptimisticRootFinalized>;
  polygonzkevm_swap_optimisticRootFinalizeds: Array<polygonzkevm_swap_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  polygonzkevm_swap__meta?: Maybe<polygonzkevm_swap__Meta_>;
};


export type Subscriptionpolygonzkevm_swap_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_Asset_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_Asset_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_AssetStatus_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_AssetBalance_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_Router_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_Router_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_RouterDailyTVL_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_RouterLiquidityEvent_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_Setting_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_Setting_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_Relayer_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_Relayer_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_Sequencer_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_Sequencer_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_RelayerFee_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_OriginTransfer_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_DestinationTransfer_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_OriginMessage_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_AggregateRoot_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_ConnectorMeta_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_RootCount_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_RootCount_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_RootMessageSent_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_RelayerFeesIncrease_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_SlippageUpdate_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_SnapshotRoot_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_SpokeConnectorMode_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_AggregateRootProposed_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygonzkevm_swap_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<polygonzkevm_swap_OrderDirection>;
  where?: InputMaybe<polygonzkevm_swap_OptimisticRootFinalized_filter>;
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygonzkevm_swap__metaArgs = {
  block?: InputMaybe<polygonzkevm_swap_Block_height>;
};

export type polygonzkevm_swap_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type polygonzkevm_swap__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['polygonzkevm_swap_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type polygonzkevm_swap__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: polygonzkevm_swap__Block_;
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
  polygonzkevm_swap_asset: InContextSdkMethod<Query['polygonzkevm_swap_asset'], Querypolygonzkevm_swap_assetArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_assets: InContextSdkMethod<Query['polygonzkevm_swap_assets'], Querypolygonzkevm_swap_assetsArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_assetStatus: InContextSdkMethod<Query['polygonzkevm_swap_assetStatus'], Querypolygonzkevm_swap_assetStatusArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_assetStatuses: InContextSdkMethod<Query['polygonzkevm_swap_assetStatuses'], Querypolygonzkevm_swap_assetStatusesArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_assetBalance: InContextSdkMethod<Query['polygonzkevm_swap_assetBalance'], Querypolygonzkevm_swap_assetBalanceArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_assetBalances: InContextSdkMethod<Query['polygonzkevm_swap_assetBalances'], Querypolygonzkevm_swap_assetBalancesArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_router: InContextSdkMethod<Query['polygonzkevm_swap_router'], Querypolygonzkevm_swap_routerArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_routers: InContextSdkMethod<Query['polygonzkevm_swap_routers'], Querypolygonzkevm_swap_routersArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_routerDailyTVL: InContextSdkMethod<Query['polygonzkevm_swap_routerDailyTVL'], Querypolygonzkevm_swap_routerDailyTVLArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_routerDailyTVLs: InContextSdkMethod<Query['polygonzkevm_swap_routerDailyTVLs'], Querypolygonzkevm_swap_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_routerLiquidityEvent: InContextSdkMethod<Query['polygonzkevm_swap_routerLiquidityEvent'], Querypolygonzkevm_swap_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_routerLiquidityEvents: InContextSdkMethod<Query['polygonzkevm_swap_routerLiquidityEvents'], Querypolygonzkevm_swap_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_setting: InContextSdkMethod<Query['polygonzkevm_swap_setting'], Querypolygonzkevm_swap_settingArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_settings: InContextSdkMethod<Query['polygonzkevm_swap_settings'], Querypolygonzkevm_swap_settingsArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_relayer: InContextSdkMethod<Query['polygonzkevm_swap_relayer'], Querypolygonzkevm_swap_relayerArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_relayers: InContextSdkMethod<Query['polygonzkevm_swap_relayers'], Querypolygonzkevm_swap_relayersArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_sequencer: InContextSdkMethod<Query['polygonzkevm_swap_sequencer'], Querypolygonzkevm_swap_sequencerArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_sequencers: InContextSdkMethod<Query['polygonzkevm_swap_sequencers'], Querypolygonzkevm_swap_sequencersArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_relayerFee: InContextSdkMethod<Query['polygonzkevm_swap_relayerFee'], Querypolygonzkevm_swap_relayerFeeArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_relayerFees: InContextSdkMethod<Query['polygonzkevm_swap_relayerFees'], Querypolygonzkevm_swap_relayerFeesArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_originTransfer: InContextSdkMethod<Query['polygonzkevm_swap_originTransfer'], Querypolygonzkevm_swap_originTransferArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_originTransfers: InContextSdkMethod<Query['polygonzkevm_swap_originTransfers'], Querypolygonzkevm_swap_originTransfersArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_destinationTransfer: InContextSdkMethod<Query['polygonzkevm_swap_destinationTransfer'], Querypolygonzkevm_swap_destinationTransferArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_destinationTransfers: InContextSdkMethod<Query['polygonzkevm_swap_destinationTransfers'], Querypolygonzkevm_swap_destinationTransfersArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_originMessage: InContextSdkMethod<Query['polygonzkevm_swap_originMessage'], Querypolygonzkevm_swap_originMessageArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_originMessages: InContextSdkMethod<Query['polygonzkevm_swap_originMessages'], Querypolygonzkevm_swap_originMessagesArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_aggregateRoot: InContextSdkMethod<Query['polygonzkevm_swap_aggregateRoot'], Querypolygonzkevm_swap_aggregateRootArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_aggregateRoots: InContextSdkMethod<Query['polygonzkevm_swap_aggregateRoots'], Querypolygonzkevm_swap_aggregateRootsArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_connectorMeta: InContextSdkMethod<Query['polygonzkevm_swap_connectorMeta'], Querypolygonzkevm_swap_connectorMetaArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_connectorMetas: InContextSdkMethod<Query['polygonzkevm_swap_connectorMetas'], Querypolygonzkevm_swap_connectorMetasArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_rootCount: InContextSdkMethod<Query['polygonzkevm_swap_rootCount'], Querypolygonzkevm_swap_rootCountArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_rootCounts: InContextSdkMethod<Query['polygonzkevm_swap_rootCounts'], Querypolygonzkevm_swap_rootCountsArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_rootMessageSent: InContextSdkMethod<Query['polygonzkevm_swap_rootMessageSent'], Querypolygonzkevm_swap_rootMessageSentArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_rootMessageSents: InContextSdkMethod<Query['polygonzkevm_swap_rootMessageSents'], Querypolygonzkevm_swap_rootMessageSentsArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_relayerFeesIncrease: InContextSdkMethod<Query['polygonzkevm_swap_relayerFeesIncrease'], Querypolygonzkevm_swap_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_relayerFeesIncreases: InContextSdkMethod<Query['polygonzkevm_swap_relayerFeesIncreases'], Querypolygonzkevm_swap_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_slippageUpdate: InContextSdkMethod<Query['polygonzkevm_swap_slippageUpdate'], Querypolygonzkevm_swap_slippageUpdateArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_slippageUpdates: InContextSdkMethod<Query['polygonzkevm_swap_slippageUpdates'], Querypolygonzkevm_swap_slippageUpdatesArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_snapshotRoot: InContextSdkMethod<Query['polygonzkevm_swap_snapshotRoot'], Querypolygonzkevm_swap_snapshotRootArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_snapshotRoots: InContextSdkMethod<Query['polygonzkevm_swap_snapshotRoots'], Querypolygonzkevm_swap_snapshotRootsArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_spokeConnectorMode: InContextSdkMethod<Query['polygonzkevm_swap_spokeConnectorMode'], Querypolygonzkevm_swap_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_spokeConnectorModes: InContextSdkMethod<Query['polygonzkevm_swap_spokeConnectorModes'], Querypolygonzkevm_swap_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_aggregateRootProposed: InContextSdkMethod<Query['polygonzkevm_swap_aggregateRootProposed'], Querypolygonzkevm_swap_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_aggregateRootProposeds: InContextSdkMethod<Query['polygonzkevm_swap_aggregateRootProposeds'], Querypolygonzkevm_swap_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_optimisticRootFinalized: InContextSdkMethod<Query['polygonzkevm_swap_optimisticRootFinalized'], Querypolygonzkevm_swap_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_optimisticRootFinalizeds: InContextSdkMethod<Query['polygonzkevm_swap_optimisticRootFinalizeds'], Querypolygonzkevm_swap_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  polygonzkevm_swap__meta: InContextSdkMethod<Query['polygonzkevm_swap__meta'], Querypolygonzkevm_swap__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  polygonzkevm_swap_asset: InContextSdkMethod<Subscription['polygonzkevm_swap_asset'], Subscriptionpolygonzkevm_swap_assetArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_assets: InContextSdkMethod<Subscription['polygonzkevm_swap_assets'], Subscriptionpolygonzkevm_swap_assetsArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_assetStatus: InContextSdkMethod<Subscription['polygonzkevm_swap_assetStatus'], Subscriptionpolygonzkevm_swap_assetStatusArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_assetStatuses: InContextSdkMethod<Subscription['polygonzkevm_swap_assetStatuses'], Subscriptionpolygonzkevm_swap_assetStatusesArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_assetBalance: InContextSdkMethod<Subscription['polygonzkevm_swap_assetBalance'], Subscriptionpolygonzkevm_swap_assetBalanceArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_assetBalances: InContextSdkMethod<Subscription['polygonzkevm_swap_assetBalances'], Subscriptionpolygonzkevm_swap_assetBalancesArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_router: InContextSdkMethod<Subscription['polygonzkevm_swap_router'], Subscriptionpolygonzkevm_swap_routerArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_routers: InContextSdkMethod<Subscription['polygonzkevm_swap_routers'], Subscriptionpolygonzkevm_swap_routersArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_routerDailyTVL: InContextSdkMethod<Subscription['polygonzkevm_swap_routerDailyTVL'], Subscriptionpolygonzkevm_swap_routerDailyTVLArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_routerDailyTVLs: InContextSdkMethod<Subscription['polygonzkevm_swap_routerDailyTVLs'], Subscriptionpolygonzkevm_swap_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_routerLiquidityEvent: InContextSdkMethod<Subscription['polygonzkevm_swap_routerLiquidityEvent'], Subscriptionpolygonzkevm_swap_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_routerLiquidityEvents: InContextSdkMethod<Subscription['polygonzkevm_swap_routerLiquidityEvents'], Subscriptionpolygonzkevm_swap_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_setting: InContextSdkMethod<Subscription['polygonzkevm_swap_setting'], Subscriptionpolygonzkevm_swap_settingArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_settings: InContextSdkMethod<Subscription['polygonzkevm_swap_settings'], Subscriptionpolygonzkevm_swap_settingsArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_relayer: InContextSdkMethod<Subscription['polygonzkevm_swap_relayer'], Subscriptionpolygonzkevm_swap_relayerArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_relayers: InContextSdkMethod<Subscription['polygonzkevm_swap_relayers'], Subscriptionpolygonzkevm_swap_relayersArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_sequencer: InContextSdkMethod<Subscription['polygonzkevm_swap_sequencer'], Subscriptionpolygonzkevm_swap_sequencerArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_sequencers: InContextSdkMethod<Subscription['polygonzkevm_swap_sequencers'], Subscriptionpolygonzkevm_swap_sequencersArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_relayerFee: InContextSdkMethod<Subscription['polygonzkevm_swap_relayerFee'], Subscriptionpolygonzkevm_swap_relayerFeeArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_relayerFees: InContextSdkMethod<Subscription['polygonzkevm_swap_relayerFees'], Subscriptionpolygonzkevm_swap_relayerFeesArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_originTransfer: InContextSdkMethod<Subscription['polygonzkevm_swap_originTransfer'], Subscriptionpolygonzkevm_swap_originTransferArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_originTransfers: InContextSdkMethod<Subscription['polygonzkevm_swap_originTransfers'], Subscriptionpolygonzkevm_swap_originTransfersArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_destinationTransfer: InContextSdkMethod<Subscription['polygonzkevm_swap_destinationTransfer'], Subscriptionpolygonzkevm_swap_destinationTransferArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_destinationTransfers: InContextSdkMethod<Subscription['polygonzkevm_swap_destinationTransfers'], Subscriptionpolygonzkevm_swap_destinationTransfersArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_originMessage: InContextSdkMethod<Subscription['polygonzkevm_swap_originMessage'], Subscriptionpolygonzkevm_swap_originMessageArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_originMessages: InContextSdkMethod<Subscription['polygonzkevm_swap_originMessages'], Subscriptionpolygonzkevm_swap_originMessagesArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_aggregateRoot: InContextSdkMethod<Subscription['polygonzkevm_swap_aggregateRoot'], Subscriptionpolygonzkevm_swap_aggregateRootArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_aggregateRoots: InContextSdkMethod<Subscription['polygonzkevm_swap_aggregateRoots'], Subscriptionpolygonzkevm_swap_aggregateRootsArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_connectorMeta: InContextSdkMethod<Subscription['polygonzkevm_swap_connectorMeta'], Subscriptionpolygonzkevm_swap_connectorMetaArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_connectorMetas: InContextSdkMethod<Subscription['polygonzkevm_swap_connectorMetas'], Subscriptionpolygonzkevm_swap_connectorMetasArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_rootCount: InContextSdkMethod<Subscription['polygonzkevm_swap_rootCount'], Subscriptionpolygonzkevm_swap_rootCountArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_rootCounts: InContextSdkMethod<Subscription['polygonzkevm_swap_rootCounts'], Subscriptionpolygonzkevm_swap_rootCountsArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_rootMessageSent: InContextSdkMethod<Subscription['polygonzkevm_swap_rootMessageSent'], Subscriptionpolygonzkevm_swap_rootMessageSentArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_rootMessageSents: InContextSdkMethod<Subscription['polygonzkevm_swap_rootMessageSents'], Subscriptionpolygonzkevm_swap_rootMessageSentsArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_relayerFeesIncrease: InContextSdkMethod<Subscription['polygonzkevm_swap_relayerFeesIncrease'], Subscriptionpolygonzkevm_swap_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_relayerFeesIncreases: InContextSdkMethod<Subscription['polygonzkevm_swap_relayerFeesIncreases'], Subscriptionpolygonzkevm_swap_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_slippageUpdate: InContextSdkMethod<Subscription['polygonzkevm_swap_slippageUpdate'], Subscriptionpolygonzkevm_swap_slippageUpdateArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_slippageUpdates: InContextSdkMethod<Subscription['polygonzkevm_swap_slippageUpdates'], Subscriptionpolygonzkevm_swap_slippageUpdatesArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_snapshotRoot: InContextSdkMethod<Subscription['polygonzkevm_swap_snapshotRoot'], Subscriptionpolygonzkevm_swap_snapshotRootArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_snapshotRoots: InContextSdkMethod<Subscription['polygonzkevm_swap_snapshotRoots'], Subscriptionpolygonzkevm_swap_snapshotRootsArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_spokeConnectorMode: InContextSdkMethod<Subscription['polygonzkevm_swap_spokeConnectorMode'], Subscriptionpolygonzkevm_swap_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_spokeConnectorModes: InContextSdkMethod<Subscription['polygonzkevm_swap_spokeConnectorModes'], Subscriptionpolygonzkevm_swap_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_aggregateRootProposed: InContextSdkMethod<Subscription['polygonzkevm_swap_aggregateRootProposed'], Subscriptionpolygonzkevm_swap_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_aggregateRootProposeds: InContextSdkMethod<Subscription['polygonzkevm_swap_aggregateRootProposeds'], Subscriptionpolygonzkevm_swap_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_optimisticRootFinalized: InContextSdkMethod<Subscription['polygonzkevm_swap_optimisticRootFinalized'], Subscriptionpolygonzkevm_swap_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  polygonzkevm_swap_optimisticRootFinalizeds: InContextSdkMethod<Subscription['polygonzkevm_swap_optimisticRootFinalizeds'], Subscriptionpolygonzkevm_swap_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  polygonzkevm_swap__meta: InContextSdkMethod<Subscription['polygonzkevm_swap__meta'], Subscriptionpolygonzkevm_swap__metaArgs, MeshContext>
  };

  export type Context = {
      ["StableSwap_PolygonZkEvm"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
