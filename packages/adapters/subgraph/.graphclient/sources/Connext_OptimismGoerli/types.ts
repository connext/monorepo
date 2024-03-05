// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextOptimismGoerliTypes {
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
  optimismgoerli_BigDecimal: any;
  BigInt: any;
  optimismgoerli_Bytes: any;
  optimismgoerli_Int8: any;
};

export type optimismgoerli_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['optimismgoerli_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type optimismgoerli_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['optimismgoerli_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type optimismgoerli_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismgoerli_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismgoerli_AggregateRootProposed_filter>>>;
};

export type optimismgoerli_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type optimismgoerli_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismgoerli_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismgoerli_AggregateRoot_filter>>>;
};

export type optimismgoerli_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type optimismgoerli_Aggregation_interval =
  | 'hour'
  | 'day';

export type optimismgoerli_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['optimismgoerli_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['optimismgoerli_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['optimismgoerli_Bytes']>;
  localAsset?: Maybe<Scalars['optimismgoerli_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<optimismgoerli_AssetStatus>;
};

export type optimismgoerli_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: optimismgoerli_Router;
  asset: optimismgoerli_Asset;
  feesEarned: Scalars['BigInt'];
};

export type optimismgoerli_AssetBalance_filter = {
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
  router_?: InputMaybe<optimismgoerli_Router_filter>;
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
  asset_?: InputMaybe<optimismgoerli_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismgoerli_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismgoerli_AssetBalance_filter>>>;
};

export type optimismgoerli_AssetBalance_orderBy =
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

export type optimismgoerli_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type optimismgoerli_AssetStatus_filter = {
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
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismgoerli_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismgoerli_AssetStatus_filter>>>;
};

export type optimismgoerli_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type optimismgoerli_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  key_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  key_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  key_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  key_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  key_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  key_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  localAsset?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  status_?: InputMaybe<optimismgoerli_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismgoerli_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismgoerli_Asset_filter>>>;
};

export type optimismgoerli_Asset_orderBy =
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

export type optimismgoerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type optimismgoerli_Block_height = {
  hash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type optimismgoerli_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['optimismgoerli_Bytes']>;
  rootManager?: Maybe<Scalars['optimismgoerli_Bytes']>;
  mirrorConnector?: Maybe<Scalars['optimismgoerli_Bytes']>;
};

export type optimismgoerli_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismgoerli_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismgoerli_ConnectorMeta_filter>>>;
};

export type optimismgoerli_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type optimismgoerli_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['optimismgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<optimismgoerli_TransferStatus>;
  routers?: Maybe<Array<optimismgoerli_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['optimismgoerli_Bytes']>;
  delegate?: Maybe<Scalars['optimismgoerli_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['optimismgoerli_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['optimismgoerli_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['optimismgoerli_Bytes']>;
  asset?: Maybe<optimismgoerli_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['optimismgoerli_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['optimismgoerli_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['optimismgoerli_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type optimismgoerli_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Router_filter>;
};

export type optimismgoerli_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<optimismgoerli_TransferStatus>;
  status_not?: InputMaybe<optimismgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<optimismgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<optimismgoerli_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<optimismgoerli_Router_filter>;
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
  to?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  originSender?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  asset_?: InputMaybe<optimismgoerli_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismgoerli_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismgoerli_DestinationTransfer_filter>>>;
};

export type optimismgoerli_DestinationTransfer_orderBy =
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

export type optimismgoerli_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['optimismgoerli_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type optimismgoerli_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismgoerli_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismgoerli_OptimisticRootFinalized_filter>>>;
};

export type optimismgoerli_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type optimismgoerli_OrderDirection =
  | 'asc'
  | 'desc';

export type optimismgoerli_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['optimismgoerli_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['optimismgoerli_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['optimismgoerli_Bytes']>;
  root?: Maybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['optimismgoerli_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<optimismgoerli_RootCount>;
};

export type optimismgoerli_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  leaf_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  message_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  message_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  message_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  message_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  message_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  message_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  rootCount_?: InputMaybe<optimismgoerli_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismgoerli_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismgoerli_OriginMessage_filter>>>;
};

export type optimismgoerli_OriginMessage_orderBy =
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

export type optimismgoerli_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['optimismgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<optimismgoerli_TransferStatus>;
  messageHash?: Maybe<Scalars['optimismgoerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['optimismgoerli_Bytes']>;
  delegate?: Maybe<Scalars['optimismgoerli_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['optimismgoerli_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['optimismgoerli_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['optimismgoerli_Bytes']>;
  asset?: Maybe<optimismgoerli_Asset>;
  transactingAsset?: Maybe<Scalars['optimismgoerli_Bytes']>;
  message?: Maybe<optimismgoerli_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<optimismgoerli_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['optimismgoerli_Bytes']>;
  caller?: Maybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['optimismgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['optimismgoerli_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type optimismgoerli_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_RelayerFee_filter>;
};

export type optimismgoerli_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<optimismgoerli_TransferStatus>;
  status_not?: InputMaybe<optimismgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<optimismgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<optimismgoerli_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  to?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  asset_?: InputMaybe<optimismgoerli_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  message_?: InputMaybe<optimismgoerli_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<optimismgoerli_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismgoerli_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismgoerli_OriginTransfer_filter>>>;
};

export type optimismgoerli_OriginTransfer_orderBy =
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
  optimismgoerli_asset?: Maybe<optimismgoerli_Asset>;
  optimismgoerli_assets: Array<optimismgoerli_Asset>;
  optimismgoerli_assetStatus?: Maybe<optimismgoerli_AssetStatus>;
  optimismgoerli_assetStatuses: Array<optimismgoerli_AssetStatus>;
  optimismgoerli_assetBalance?: Maybe<optimismgoerli_AssetBalance>;
  optimismgoerli_assetBalances: Array<optimismgoerli_AssetBalance>;
  optimismgoerli_router?: Maybe<optimismgoerli_Router>;
  optimismgoerli_routers: Array<optimismgoerli_Router>;
  optimismgoerli_routerDailyTVL?: Maybe<optimismgoerli_RouterDailyTVL>;
  optimismgoerli_routerDailyTVLs: Array<optimismgoerli_RouterDailyTVL>;
  optimismgoerli_routerLiquidityEvent?: Maybe<optimismgoerli_RouterLiquidityEvent>;
  optimismgoerli_routerLiquidityEvents: Array<optimismgoerli_RouterLiquidityEvent>;
  optimismgoerli_setting?: Maybe<optimismgoerli_Setting>;
  optimismgoerli_settings: Array<optimismgoerli_Setting>;
  optimismgoerli_relayer?: Maybe<optimismgoerli_Relayer>;
  optimismgoerli_relayers: Array<optimismgoerli_Relayer>;
  optimismgoerli_sequencer?: Maybe<optimismgoerli_Sequencer>;
  optimismgoerli_sequencers: Array<optimismgoerli_Sequencer>;
  optimismgoerli_relayerFee?: Maybe<optimismgoerli_RelayerFee>;
  optimismgoerli_relayerFees: Array<optimismgoerli_RelayerFee>;
  optimismgoerli_originTransfer?: Maybe<optimismgoerli_OriginTransfer>;
  optimismgoerli_originTransfers: Array<optimismgoerli_OriginTransfer>;
  optimismgoerli_destinationTransfer?: Maybe<optimismgoerli_DestinationTransfer>;
  optimismgoerli_destinationTransfers: Array<optimismgoerli_DestinationTransfer>;
  optimismgoerli_originMessage?: Maybe<optimismgoerli_OriginMessage>;
  optimismgoerli_originMessages: Array<optimismgoerli_OriginMessage>;
  optimismgoerli_aggregateRoot?: Maybe<optimismgoerli_AggregateRoot>;
  optimismgoerli_aggregateRoots: Array<optimismgoerli_AggregateRoot>;
  optimismgoerli_connectorMeta?: Maybe<optimismgoerli_ConnectorMeta>;
  optimismgoerli_connectorMetas: Array<optimismgoerli_ConnectorMeta>;
  optimismgoerli_rootCount?: Maybe<optimismgoerli_RootCount>;
  optimismgoerli_rootCounts: Array<optimismgoerli_RootCount>;
  optimismgoerli_rootMessageSent?: Maybe<optimismgoerli_RootMessageSent>;
  optimismgoerli_rootMessageSents: Array<optimismgoerli_RootMessageSent>;
  optimismgoerli_relayerFeesIncrease?: Maybe<optimismgoerli_RelayerFeesIncrease>;
  optimismgoerli_relayerFeesIncreases: Array<optimismgoerli_RelayerFeesIncrease>;
  optimismgoerli_slippageUpdate?: Maybe<optimismgoerli_SlippageUpdate>;
  optimismgoerli_slippageUpdates: Array<optimismgoerli_SlippageUpdate>;
  optimismgoerli_snapshotRoot?: Maybe<optimismgoerli_SnapshotRoot>;
  optimismgoerli_snapshotRoots: Array<optimismgoerli_SnapshotRoot>;
  optimismgoerli_spokeConnectorMode?: Maybe<optimismgoerli_SpokeConnectorMode>;
  optimismgoerli_spokeConnectorModes: Array<optimismgoerli_SpokeConnectorMode>;
  optimismgoerli_aggregateRootProposed?: Maybe<optimismgoerli_AggregateRootProposed>;
  optimismgoerli_aggregateRootProposeds: Array<optimismgoerli_AggregateRootProposed>;
  optimismgoerli_optimisticRootFinalized?: Maybe<optimismgoerli_OptimisticRootFinalized>;
  optimismgoerli_optimisticRootFinalizeds: Array<optimismgoerli_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  optimismgoerli__meta?: Maybe<optimismgoerli__Meta_>;
};


export type Queryoptimismgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Asset_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_AssetStatus_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_AssetBalance_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Router_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_RouterDailyTVL_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_RouterLiquidityEvent_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Setting_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Relayer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Sequencer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Sequencer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_RelayerFee_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_OriginTransfer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_OriginMessage_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_AggregateRoot_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_ConnectorMeta_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_RootCount_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_RootCount_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_RootMessageSent_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_RelayerFeesIncrease_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_SlippageUpdate_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_SnapshotRoot_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_SpokeConnectorMode_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_AggregateRootProposed_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_OptimisticRootFinalized_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli__metaArgs = {
  block?: InputMaybe<optimismgoerli_Block_height>;
};

export type optimismgoerli_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['optimismgoerli_Bytes']>;
};

export type optimismgoerli_RelayerFee = {
  id: Scalars['ID'];
  transfer: optimismgoerli_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['optimismgoerli_Bytes'];
};

export type optimismgoerli_RelayerFee_filter = {
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
  transfer_?: InputMaybe<optimismgoerli_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  asset_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  asset_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  asset_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  asset_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  asset_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismgoerli_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismgoerli_RelayerFee_filter>>>;
};

export type optimismgoerli_RelayerFee_orderBy =
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

export type optimismgoerli_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: optimismgoerli_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['optimismgoerli_Bytes']>;
  caller: Scalars['optimismgoerli_Bytes'];
  transactionHash: Scalars['optimismgoerli_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type optimismgoerli_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<optimismgoerli_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  asset_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  asset_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  asset_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  asset_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  asset_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismgoerli_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismgoerli_RelayerFeesIncrease_filter>>>;
};

export type optimismgoerli_RelayerFeesIncrease_orderBy =
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

export type optimismgoerli_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  relayer_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismgoerli_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismgoerli_Relayer_filter>>>;
};

export type optimismgoerli_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type optimismgoerli_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type optimismgoerli_RootCount_filter = {
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
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismgoerli_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismgoerli_RootCount_filter>>>;
};

export type optimismgoerli_RootCount_orderBy =
  | 'id'
  | 'count';

export type optimismgoerli_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['optimismgoerli_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['optimismgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type optimismgoerli_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismgoerli_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismgoerli_RootMessageSent_filter>>>;
};

export type optimismgoerli_RootMessageSent_orderBy =
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

export type optimismgoerli_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['optimismgoerli_Bytes']>;
  recipient?: Maybe<Scalars['optimismgoerli_Bytes']>;
  proposedOwner?: Maybe<Scalars['optimismgoerli_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<optimismgoerli_AssetBalance>;
};


export type optimismgoerli_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_AssetBalance_filter>;
};

export type optimismgoerli_RouterDailyTVL = {
  id: Scalars['ID'];
  router: optimismgoerli_Router;
  asset: optimismgoerli_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type optimismgoerli_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<optimismgoerli_Router_filter>;
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
  asset_?: InputMaybe<optimismgoerli_Asset_filter>;
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
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismgoerli_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismgoerli_RouterDailyTVL_filter>>>;
};

export type optimismgoerli_RouterDailyTVL_orderBy =
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

export type optimismgoerli_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<optimismgoerli_RouterLiquidityEventType>;
  router: optimismgoerli_Router;
  asset: optimismgoerli_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['optimismgoerli_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['optimismgoerli_Bytes'];
  nonce: Scalars['BigInt'];
};

export type optimismgoerli_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type optimismgoerli_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<optimismgoerli_RouterLiquidityEventType>;
  type_not?: InputMaybe<optimismgoerli_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<optimismgoerli_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<optimismgoerli_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<optimismgoerli_Router_filter>;
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
  asset_?: InputMaybe<optimismgoerli_Asset_filter>;
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
  caller?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismgoerli_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismgoerli_RouterLiquidityEvent_filter>>>;
};

export type optimismgoerli_RouterLiquidityEvent_orderBy =
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

export type optimismgoerli_Router_filter = {
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
  owner?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  owner_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  owner_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  owner_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  owner_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  owner_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  recipient?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  recipient_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<optimismgoerli_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismgoerli_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismgoerli_Router_filter>>>;
};

export type optimismgoerli_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type optimismgoerli_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['optimismgoerli_Bytes']>;
};

export type optimismgoerli_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismgoerli_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismgoerli_Sequencer_filter>>>;
};

export type optimismgoerli_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type optimismgoerli_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['optimismgoerli_Bytes'];
};

export type optimismgoerli_Setting_filter = {
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
  caller?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismgoerli_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismgoerli_Setting_filter>>>;
};

export type optimismgoerli_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type optimismgoerli_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: optimismgoerli_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['optimismgoerli_Bytes'];
  transactionHash: Scalars['optimismgoerli_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type optimismgoerli_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<optimismgoerli_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismgoerli_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismgoerli_SlippageUpdate_filter>>>;
};

export type optimismgoerli_SlippageUpdate_orderBy =
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

export type optimismgoerli_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['optimismgoerli_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type optimismgoerli_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismgoerli_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismgoerli_SnapshotRoot_filter>>>;
};

export type optimismgoerli_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type optimismgoerli_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type optimismgoerli_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimismgoerli_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimismgoerli_SpokeConnectorMode_filter>>>;
};

export type optimismgoerli_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  optimismgoerli_asset?: Maybe<optimismgoerli_Asset>;
  optimismgoerli_assets: Array<optimismgoerli_Asset>;
  optimismgoerli_assetStatus?: Maybe<optimismgoerli_AssetStatus>;
  optimismgoerli_assetStatuses: Array<optimismgoerli_AssetStatus>;
  optimismgoerli_assetBalance?: Maybe<optimismgoerli_AssetBalance>;
  optimismgoerli_assetBalances: Array<optimismgoerli_AssetBalance>;
  optimismgoerli_router?: Maybe<optimismgoerli_Router>;
  optimismgoerli_routers: Array<optimismgoerli_Router>;
  optimismgoerli_routerDailyTVL?: Maybe<optimismgoerli_RouterDailyTVL>;
  optimismgoerli_routerDailyTVLs: Array<optimismgoerli_RouterDailyTVL>;
  optimismgoerli_routerLiquidityEvent?: Maybe<optimismgoerli_RouterLiquidityEvent>;
  optimismgoerli_routerLiquidityEvents: Array<optimismgoerli_RouterLiquidityEvent>;
  optimismgoerli_setting?: Maybe<optimismgoerli_Setting>;
  optimismgoerli_settings: Array<optimismgoerli_Setting>;
  optimismgoerli_relayer?: Maybe<optimismgoerli_Relayer>;
  optimismgoerli_relayers: Array<optimismgoerli_Relayer>;
  optimismgoerli_sequencer?: Maybe<optimismgoerli_Sequencer>;
  optimismgoerli_sequencers: Array<optimismgoerli_Sequencer>;
  optimismgoerli_relayerFee?: Maybe<optimismgoerli_RelayerFee>;
  optimismgoerli_relayerFees: Array<optimismgoerli_RelayerFee>;
  optimismgoerli_originTransfer?: Maybe<optimismgoerli_OriginTransfer>;
  optimismgoerli_originTransfers: Array<optimismgoerli_OriginTransfer>;
  optimismgoerli_destinationTransfer?: Maybe<optimismgoerli_DestinationTransfer>;
  optimismgoerli_destinationTransfers: Array<optimismgoerli_DestinationTransfer>;
  optimismgoerli_originMessage?: Maybe<optimismgoerli_OriginMessage>;
  optimismgoerli_originMessages: Array<optimismgoerli_OriginMessage>;
  optimismgoerli_aggregateRoot?: Maybe<optimismgoerli_AggregateRoot>;
  optimismgoerli_aggregateRoots: Array<optimismgoerli_AggregateRoot>;
  optimismgoerli_connectorMeta?: Maybe<optimismgoerli_ConnectorMeta>;
  optimismgoerli_connectorMetas: Array<optimismgoerli_ConnectorMeta>;
  optimismgoerli_rootCount?: Maybe<optimismgoerli_RootCount>;
  optimismgoerli_rootCounts: Array<optimismgoerli_RootCount>;
  optimismgoerli_rootMessageSent?: Maybe<optimismgoerli_RootMessageSent>;
  optimismgoerli_rootMessageSents: Array<optimismgoerli_RootMessageSent>;
  optimismgoerli_relayerFeesIncrease?: Maybe<optimismgoerli_RelayerFeesIncrease>;
  optimismgoerli_relayerFeesIncreases: Array<optimismgoerli_RelayerFeesIncrease>;
  optimismgoerli_slippageUpdate?: Maybe<optimismgoerli_SlippageUpdate>;
  optimismgoerli_slippageUpdates: Array<optimismgoerli_SlippageUpdate>;
  optimismgoerli_snapshotRoot?: Maybe<optimismgoerli_SnapshotRoot>;
  optimismgoerli_snapshotRoots: Array<optimismgoerli_SnapshotRoot>;
  optimismgoerli_spokeConnectorMode?: Maybe<optimismgoerli_SpokeConnectorMode>;
  optimismgoerli_spokeConnectorModes: Array<optimismgoerli_SpokeConnectorMode>;
  optimismgoerli_aggregateRootProposed?: Maybe<optimismgoerli_AggregateRootProposed>;
  optimismgoerli_aggregateRootProposeds: Array<optimismgoerli_AggregateRootProposed>;
  optimismgoerli_optimisticRootFinalized?: Maybe<optimismgoerli_OptimisticRootFinalized>;
  optimismgoerli_optimisticRootFinalizeds: Array<optimismgoerli_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  optimismgoerli__meta?: Maybe<optimismgoerli__Meta_>;
};


export type Subscriptionoptimismgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Asset_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_AssetStatus_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_AssetBalance_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Router_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_RouterDailyTVL_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_RouterLiquidityEvent_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Setting_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Relayer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Sequencer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Sequencer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_RelayerFee_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_OriginTransfer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_OriginMessage_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_AggregateRoot_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_ConnectorMeta_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_RootCount_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_RootCount_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_RootMessageSent_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_RelayerFeesIncrease_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_SlippageUpdate_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_SnapshotRoot_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_SpokeConnectorMode_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_AggregateRootProposed_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_OptimisticRootFinalized_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli__metaArgs = {
  block?: InputMaybe<optimismgoerli_Block_height>;
};

export type optimismgoerli_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type optimismgoerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['optimismgoerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type optimismgoerli__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: optimismgoerli__Block_;
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
  optimismgoerli_asset: InContextSdkMethod<Query['optimismgoerli_asset'], Queryoptimismgoerli_assetArgs, MeshContext>,
  /** null **/
  optimismgoerli_assets: InContextSdkMethod<Query['optimismgoerli_assets'], Queryoptimismgoerli_assetsArgs, MeshContext>,
  /** null **/
  optimismgoerli_assetStatus: InContextSdkMethod<Query['optimismgoerli_assetStatus'], Queryoptimismgoerli_assetStatusArgs, MeshContext>,
  /** null **/
  optimismgoerli_assetStatuses: InContextSdkMethod<Query['optimismgoerli_assetStatuses'], Queryoptimismgoerli_assetStatusesArgs, MeshContext>,
  /** null **/
  optimismgoerli_assetBalance: InContextSdkMethod<Query['optimismgoerli_assetBalance'], Queryoptimismgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  optimismgoerli_assetBalances: InContextSdkMethod<Query['optimismgoerli_assetBalances'], Queryoptimismgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  optimismgoerli_router: InContextSdkMethod<Query['optimismgoerli_router'], Queryoptimismgoerli_routerArgs, MeshContext>,
  /** null **/
  optimismgoerli_routers: InContextSdkMethod<Query['optimismgoerli_routers'], Queryoptimismgoerli_routersArgs, MeshContext>,
  /** null **/
  optimismgoerli_routerDailyTVL: InContextSdkMethod<Query['optimismgoerli_routerDailyTVL'], Queryoptimismgoerli_routerDailyTVLArgs, MeshContext>,
  /** null **/
  optimismgoerli_routerDailyTVLs: InContextSdkMethod<Query['optimismgoerli_routerDailyTVLs'], Queryoptimismgoerli_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  optimismgoerli_routerLiquidityEvent: InContextSdkMethod<Query['optimismgoerli_routerLiquidityEvent'], Queryoptimismgoerli_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  optimismgoerli_routerLiquidityEvents: InContextSdkMethod<Query['optimismgoerli_routerLiquidityEvents'], Queryoptimismgoerli_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  optimismgoerli_setting: InContextSdkMethod<Query['optimismgoerli_setting'], Queryoptimismgoerli_settingArgs, MeshContext>,
  /** null **/
  optimismgoerli_settings: InContextSdkMethod<Query['optimismgoerli_settings'], Queryoptimismgoerli_settingsArgs, MeshContext>,
  /** null **/
  optimismgoerli_relayer: InContextSdkMethod<Query['optimismgoerli_relayer'], Queryoptimismgoerli_relayerArgs, MeshContext>,
  /** null **/
  optimismgoerli_relayers: InContextSdkMethod<Query['optimismgoerli_relayers'], Queryoptimismgoerli_relayersArgs, MeshContext>,
  /** null **/
  optimismgoerli_sequencer: InContextSdkMethod<Query['optimismgoerli_sequencer'], Queryoptimismgoerli_sequencerArgs, MeshContext>,
  /** null **/
  optimismgoerli_sequencers: InContextSdkMethod<Query['optimismgoerli_sequencers'], Queryoptimismgoerli_sequencersArgs, MeshContext>,
  /** null **/
  optimismgoerli_relayerFee: InContextSdkMethod<Query['optimismgoerli_relayerFee'], Queryoptimismgoerli_relayerFeeArgs, MeshContext>,
  /** null **/
  optimismgoerli_relayerFees: InContextSdkMethod<Query['optimismgoerli_relayerFees'], Queryoptimismgoerli_relayerFeesArgs, MeshContext>,
  /** null **/
  optimismgoerli_originTransfer: InContextSdkMethod<Query['optimismgoerli_originTransfer'], Queryoptimismgoerli_originTransferArgs, MeshContext>,
  /** null **/
  optimismgoerli_originTransfers: InContextSdkMethod<Query['optimismgoerli_originTransfers'], Queryoptimismgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  optimismgoerli_destinationTransfer: InContextSdkMethod<Query['optimismgoerli_destinationTransfer'], Queryoptimismgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  optimismgoerli_destinationTransfers: InContextSdkMethod<Query['optimismgoerli_destinationTransfers'], Queryoptimismgoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  optimismgoerli_originMessage: InContextSdkMethod<Query['optimismgoerli_originMessage'], Queryoptimismgoerli_originMessageArgs, MeshContext>,
  /** null **/
  optimismgoerli_originMessages: InContextSdkMethod<Query['optimismgoerli_originMessages'], Queryoptimismgoerli_originMessagesArgs, MeshContext>,
  /** null **/
  optimismgoerli_aggregateRoot: InContextSdkMethod<Query['optimismgoerli_aggregateRoot'], Queryoptimismgoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  optimismgoerli_aggregateRoots: InContextSdkMethod<Query['optimismgoerli_aggregateRoots'], Queryoptimismgoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  optimismgoerli_connectorMeta: InContextSdkMethod<Query['optimismgoerli_connectorMeta'], Queryoptimismgoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  optimismgoerli_connectorMetas: InContextSdkMethod<Query['optimismgoerli_connectorMetas'], Queryoptimismgoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  optimismgoerli_rootCount: InContextSdkMethod<Query['optimismgoerli_rootCount'], Queryoptimismgoerli_rootCountArgs, MeshContext>,
  /** null **/
  optimismgoerli_rootCounts: InContextSdkMethod<Query['optimismgoerli_rootCounts'], Queryoptimismgoerli_rootCountsArgs, MeshContext>,
  /** null **/
  optimismgoerli_rootMessageSent: InContextSdkMethod<Query['optimismgoerli_rootMessageSent'], Queryoptimismgoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  optimismgoerli_rootMessageSents: InContextSdkMethod<Query['optimismgoerli_rootMessageSents'], Queryoptimismgoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  optimismgoerli_relayerFeesIncrease: InContextSdkMethod<Query['optimismgoerli_relayerFeesIncrease'], Queryoptimismgoerli_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  optimismgoerli_relayerFeesIncreases: InContextSdkMethod<Query['optimismgoerli_relayerFeesIncreases'], Queryoptimismgoerli_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  optimismgoerli_slippageUpdate: InContextSdkMethod<Query['optimismgoerli_slippageUpdate'], Queryoptimismgoerli_slippageUpdateArgs, MeshContext>,
  /** null **/
  optimismgoerli_slippageUpdates: InContextSdkMethod<Query['optimismgoerli_slippageUpdates'], Queryoptimismgoerli_slippageUpdatesArgs, MeshContext>,
  /** null **/
  optimismgoerli_snapshotRoot: InContextSdkMethod<Query['optimismgoerli_snapshotRoot'], Queryoptimismgoerli_snapshotRootArgs, MeshContext>,
  /** null **/
  optimismgoerli_snapshotRoots: InContextSdkMethod<Query['optimismgoerli_snapshotRoots'], Queryoptimismgoerli_snapshotRootsArgs, MeshContext>,
  /** null **/
  optimismgoerli_spokeConnectorMode: InContextSdkMethod<Query['optimismgoerli_spokeConnectorMode'], Queryoptimismgoerli_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  optimismgoerli_spokeConnectorModes: InContextSdkMethod<Query['optimismgoerli_spokeConnectorModes'], Queryoptimismgoerli_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  optimismgoerli_aggregateRootProposed: InContextSdkMethod<Query['optimismgoerli_aggregateRootProposed'], Queryoptimismgoerli_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  optimismgoerli_aggregateRootProposeds: InContextSdkMethod<Query['optimismgoerli_aggregateRootProposeds'], Queryoptimismgoerli_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  optimismgoerli_optimisticRootFinalized: InContextSdkMethod<Query['optimismgoerli_optimisticRootFinalized'], Queryoptimismgoerli_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  optimismgoerli_optimisticRootFinalizeds: InContextSdkMethod<Query['optimismgoerli_optimisticRootFinalizeds'], Queryoptimismgoerli_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  optimismgoerli__meta: InContextSdkMethod<Query['optimismgoerli__meta'], Queryoptimismgoerli__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  optimismgoerli_asset: InContextSdkMethod<Subscription['optimismgoerli_asset'], Subscriptionoptimismgoerli_assetArgs, MeshContext>,
  /** null **/
  optimismgoerli_assets: InContextSdkMethod<Subscription['optimismgoerli_assets'], Subscriptionoptimismgoerli_assetsArgs, MeshContext>,
  /** null **/
  optimismgoerli_assetStatus: InContextSdkMethod<Subscription['optimismgoerli_assetStatus'], Subscriptionoptimismgoerli_assetStatusArgs, MeshContext>,
  /** null **/
  optimismgoerli_assetStatuses: InContextSdkMethod<Subscription['optimismgoerli_assetStatuses'], Subscriptionoptimismgoerli_assetStatusesArgs, MeshContext>,
  /** null **/
  optimismgoerli_assetBalance: InContextSdkMethod<Subscription['optimismgoerli_assetBalance'], Subscriptionoptimismgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  optimismgoerli_assetBalances: InContextSdkMethod<Subscription['optimismgoerli_assetBalances'], Subscriptionoptimismgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  optimismgoerli_router: InContextSdkMethod<Subscription['optimismgoerli_router'], Subscriptionoptimismgoerli_routerArgs, MeshContext>,
  /** null **/
  optimismgoerli_routers: InContextSdkMethod<Subscription['optimismgoerli_routers'], Subscriptionoptimismgoerli_routersArgs, MeshContext>,
  /** null **/
  optimismgoerli_routerDailyTVL: InContextSdkMethod<Subscription['optimismgoerli_routerDailyTVL'], Subscriptionoptimismgoerli_routerDailyTVLArgs, MeshContext>,
  /** null **/
  optimismgoerli_routerDailyTVLs: InContextSdkMethod<Subscription['optimismgoerli_routerDailyTVLs'], Subscriptionoptimismgoerli_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  optimismgoerli_routerLiquidityEvent: InContextSdkMethod<Subscription['optimismgoerli_routerLiquidityEvent'], Subscriptionoptimismgoerli_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  optimismgoerli_routerLiquidityEvents: InContextSdkMethod<Subscription['optimismgoerli_routerLiquidityEvents'], Subscriptionoptimismgoerli_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  optimismgoerli_setting: InContextSdkMethod<Subscription['optimismgoerli_setting'], Subscriptionoptimismgoerli_settingArgs, MeshContext>,
  /** null **/
  optimismgoerli_settings: InContextSdkMethod<Subscription['optimismgoerli_settings'], Subscriptionoptimismgoerli_settingsArgs, MeshContext>,
  /** null **/
  optimismgoerli_relayer: InContextSdkMethod<Subscription['optimismgoerli_relayer'], Subscriptionoptimismgoerli_relayerArgs, MeshContext>,
  /** null **/
  optimismgoerli_relayers: InContextSdkMethod<Subscription['optimismgoerli_relayers'], Subscriptionoptimismgoerli_relayersArgs, MeshContext>,
  /** null **/
  optimismgoerli_sequencer: InContextSdkMethod<Subscription['optimismgoerli_sequencer'], Subscriptionoptimismgoerli_sequencerArgs, MeshContext>,
  /** null **/
  optimismgoerli_sequencers: InContextSdkMethod<Subscription['optimismgoerli_sequencers'], Subscriptionoptimismgoerli_sequencersArgs, MeshContext>,
  /** null **/
  optimismgoerli_relayerFee: InContextSdkMethod<Subscription['optimismgoerli_relayerFee'], Subscriptionoptimismgoerli_relayerFeeArgs, MeshContext>,
  /** null **/
  optimismgoerli_relayerFees: InContextSdkMethod<Subscription['optimismgoerli_relayerFees'], Subscriptionoptimismgoerli_relayerFeesArgs, MeshContext>,
  /** null **/
  optimismgoerli_originTransfer: InContextSdkMethod<Subscription['optimismgoerli_originTransfer'], Subscriptionoptimismgoerli_originTransferArgs, MeshContext>,
  /** null **/
  optimismgoerli_originTransfers: InContextSdkMethod<Subscription['optimismgoerli_originTransfers'], Subscriptionoptimismgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  optimismgoerli_destinationTransfer: InContextSdkMethod<Subscription['optimismgoerli_destinationTransfer'], Subscriptionoptimismgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  optimismgoerli_destinationTransfers: InContextSdkMethod<Subscription['optimismgoerli_destinationTransfers'], Subscriptionoptimismgoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  optimismgoerli_originMessage: InContextSdkMethod<Subscription['optimismgoerli_originMessage'], Subscriptionoptimismgoerli_originMessageArgs, MeshContext>,
  /** null **/
  optimismgoerli_originMessages: InContextSdkMethod<Subscription['optimismgoerli_originMessages'], Subscriptionoptimismgoerli_originMessagesArgs, MeshContext>,
  /** null **/
  optimismgoerli_aggregateRoot: InContextSdkMethod<Subscription['optimismgoerli_aggregateRoot'], Subscriptionoptimismgoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  optimismgoerli_aggregateRoots: InContextSdkMethod<Subscription['optimismgoerli_aggregateRoots'], Subscriptionoptimismgoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  optimismgoerli_connectorMeta: InContextSdkMethod<Subscription['optimismgoerli_connectorMeta'], Subscriptionoptimismgoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  optimismgoerli_connectorMetas: InContextSdkMethod<Subscription['optimismgoerli_connectorMetas'], Subscriptionoptimismgoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  optimismgoerli_rootCount: InContextSdkMethod<Subscription['optimismgoerli_rootCount'], Subscriptionoptimismgoerli_rootCountArgs, MeshContext>,
  /** null **/
  optimismgoerli_rootCounts: InContextSdkMethod<Subscription['optimismgoerli_rootCounts'], Subscriptionoptimismgoerli_rootCountsArgs, MeshContext>,
  /** null **/
  optimismgoerli_rootMessageSent: InContextSdkMethod<Subscription['optimismgoerli_rootMessageSent'], Subscriptionoptimismgoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  optimismgoerli_rootMessageSents: InContextSdkMethod<Subscription['optimismgoerli_rootMessageSents'], Subscriptionoptimismgoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  optimismgoerli_relayerFeesIncrease: InContextSdkMethod<Subscription['optimismgoerli_relayerFeesIncrease'], Subscriptionoptimismgoerli_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  optimismgoerli_relayerFeesIncreases: InContextSdkMethod<Subscription['optimismgoerli_relayerFeesIncreases'], Subscriptionoptimismgoerli_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  optimismgoerli_slippageUpdate: InContextSdkMethod<Subscription['optimismgoerli_slippageUpdate'], Subscriptionoptimismgoerli_slippageUpdateArgs, MeshContext>,
  /** null **/
  optimismgoerli_slippageUpdates: InContextSdkMethod<Subscription['optimismgoerli_slippageUpdates'], Subscriptionoptimismgoerli_slippageUpdatesArgs, MeshContext>,
  /** null **/
  optimismgoerli_snapshotRoot: InContextSdkMethod<Subscription['optimismgoerli_snapshotRoot'], Subscriptionoptimismgoerli_snapshotRootArgs, MeshContext>,
  /** null **/
  optimismgoerli_snapshotRoots: InContextSdkMethod<Subscription['optimismgoerli_snapshotRoots'], Subscriptionoptimismgoerli_snapshotRootsArgs, MeshContext>,
  /** null **/
  optimismgoerli_spokeConnectorMode: InContextSdkMethod<Subscription['optimismgoerli_spokeConnectorMode'], Subscriptionoptimismgoerli_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  optimismgoerli_spokeConnectorModes: InContextSdkMethod<Subscription['optimismgoerli_spokeConnectorModes'], Subscriptionoptimismgoerli_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  optimismgoerli_aggregateRootProposed: InContextSdkMethod<Subscription['optimismgoerli_aggregateRootProposed'], Subscriptionoptimismgoerli_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  optimismgoerli_aggregateRootProposeds: InContextSdkMethod<Subscription['optimismgoerli_aggregateRootProposeds'], Subscriptionoptimismgoerli_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  optimismgoerli_optimisticRootFinalized: InContextSdkMethod<Subscription['optimismgoerli_optimisticRootFinalized'], Subscriptionoptimismgoerli_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  optimismgoerli_optimisticRootFinalizeds: InContextSdkMethod<Subscription['optimismgoerli_optimisticRootFinalizeds'], Subscriptionoptimismgoerli_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  optimismgoerli__meta: InContextSdkMethod<Subscription['optimismgoerli__meta'], Subscriptionoptimismgoerli__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_OptimismGoerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
