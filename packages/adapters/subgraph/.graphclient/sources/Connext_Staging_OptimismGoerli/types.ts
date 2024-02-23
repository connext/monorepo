// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextStagingOptimismGoerliTypes {
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
  stagingoptimismgoerli_BigDecimal: any;
  BigInt: any;
  stagingoptimismgoerli_Bytes: any;
  stagingoptimismgoerli_Int8: any;
};

export type stagingoptimismgoerli_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['stagingoptimismgoerli_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type stagingoptimismgoerli_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingoptimismgoerli_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingoptimismgoerli_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_AggregateRootProposed_filter>>>;
};

export type stagingoptimismgoerli_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type stagingoptimismgoerli_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_AggregateRoot_filter>>>;
};

export type stagingoptimismgoerli_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type stagingoptimismgoerli_Aggregation_interval =
  | 'hour'
  | 'day';

export type stagingoptimismgoerli_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  localAsset?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingoptimismgoerli_AssetStatus>;
};

export type stagingoptimismgoerli_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: stagingoptimismgoerli_Router;
  asset: stagingoptimismgoerli_Asset;
  feesEarned: Scalars['BigInt'];
};

export type stagingoptimismgoerli_AssetBalance_filter = {
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
  router_?: InputMaybe<stagingoptimismgoerli_Router_filter>;
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
  asset_?: InputMaybe<stagingoptimismgoerli_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_AssetBalance_filter>>>;
};

export type stagingoptimismgoerli_AssetBalance_orderBy =
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

export type stagingoptimismgoerli_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type stagingoptimismgoerli_AssetStatus_filter = {
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
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_AssetStatus_filter>>>;
};

export type stagingoptimismgoerli_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type stagingoptimismgoerli_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  key_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  key_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  key_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  key_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  key_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  key_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  localAsset?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  status_?: InputMaybe<stagingoptimismgoerli_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_Asset_filter>>>;
};

export type stagingoptimismgoerli_Asset_orderBy =
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

export type stagingoptimismgoerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingoptimismgoerli_Block_height = {
  hash?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type stagingoptimismgoerli_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  rootManager?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  mirrorConnector?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
};

export type stagingoptimismgoerli_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_ConnectorMeta_filter>>>;
};

export type stagingoptimismgoerli_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingoptimismgoerli_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingoptimismgoerli_TransferStatus>;
  routers?: Maybe<Array<stagingoptimismgoerli_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  delegate?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  asset?: Maybe<stagingoptimismgoerli_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingoptimismgoerli_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_Router_filter>;
};

export type stagingoptimismgoerli_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingoptimismgoerli_TransferStatus>;
  status_not?: InputMaybe<stagingoptimismgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<stagingoptimismgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingoptimismgoerli_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<stagingoptimismgoerli_Router_filter>;
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
  to?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  originSender?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  asset_?: InputMaybe<stagingoptimismgoerli_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_DestinationTransfer_filter>>>;
};

export type stagingoptimismgoerli_DestinationTransfer_orderBy =
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

export type stagingoptimismgoerli_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingoptimismgoerli_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingoptimismgoerli_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_OptimisticRootFinalized_filter>>>;
};

export type stagingoptimismgoerli_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type stagingoptimismgoerli_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingoptimismgoerli_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<stagingoptimismgoerli_RootCount>;
};

export type stagingoptimismgoerli_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  leaf_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  message_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  message_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  message_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  message_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  message_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  message_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  rootCount_?: InputMaybe<stagingoptimismgoerli_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_OriginMessage_filter>>>;
};

export type stagingoptimismgoerli_OriginMessage_orderBy =
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

export type stagingoptimismgoerli_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingoptimismgoerli_TransferStatus>;
  messageHash?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  delegate?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  asset?: Maybe<stagingoptimismgoerli_Asset>;
  transactingAsset?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  message?: Maybe<stagingoptimismgoerli_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<stagingoptimismgoerli_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingoptimismgoerli_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_RelayerFee_filter>;
};

export type stagingoptimismgoerli_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingoptimismgoerli_TransferStatus>;
  status_not?: InputMaybe<stagingoptimismgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<stagingoptimismgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingoptimismgoerli_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  to?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  asset_?: InputMaybe<stagingoptimismgoerli_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  message_?: InputMaybe<stagingoptimismgoerli_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<stagingoptimismgoerli_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_OriginTransfer_filter>>>;
};

export type stagingoptimismgoerli_OriginTransfer_orderBy =
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
  stagingoptimismgoerli_asset?: Maybe<stagingoptimismgoerli_Asset>;
  stagingoptimismgoerli_assets: Array<stagingoptimismgoerli_Asset>;
  stagingoptimismgoerli_assetStatus?: Maybe<stagingoptimismgoerli_AssetStatus>;
  stagingoptimismgoerli_assetStatuses: Array<stagingoptimismgoerli_AssetStatus>;
  stagingoptimismgoerli_assetBalance?: Maybe<stagingoptimismgoerli_AssetBalance>;
  stagingoptimismgoerli_assetBalances: Array<stagingoptimismgoerli_AssetBalance>;
  stagingoptimismgoerli_router?: Maybe<stagingoptimismgoerli_Router>;
  stagingoptimismgoerli_routers: Array<stagingoptimismgoerli_Router>;
  stagingoptimismgoerli_routerDailyTVL?: Maybe<stagingoptimismgoerli_RouterDailyTVL>;
  stagingoptimismgoerli_routerDailyTVLs: Array<stagingoptimismgoerli_RouterDailyTVL>;
  stagingoptimismgoerli_routerLiquidityEvent?: Maybe<stagingoptimismgoerli_RouterLiquidityEvent>;
  stagingoptimismgoerli_routerLiquidityEvents: Array<stagingoptimismgoerli_RouterLiquidityEvent>;
  stagingoptimismgoerli_setting?: Maybe<stagingoptimismgoerli_Setting>;
  stagingoptimismgoerli_settings: Array<stagingoptimismgoerli_Setting>;
  stagingoptimismgoerli_relayer?: Maybe<stagingoptimismgoerli_Relayer>;
  stagingoptimismgoerli_relayers: Array<stagingoptimismgoerli_Relayer>;
  stagingoptimismgoerli_sequencer?: Maybe<stagingoptimismgoerli_Sequencer>;
  stagingoptimismgoerli_sequencers: Array<stagingoptimismgoerli_Sequencer>;
  stagingoptimismgoerli_relayerFee?: Maybe<stagingoptimismgoerli_RelayerFee>;
  stagingoptimismgoerli_relayerFees: Array<stagingoptimismgoerli_RelayerFee>;
  stagingoptimismgoerli_originTransfer?: Maybe<stagingoptimismgoerli_OriginTransfer>;
  stagingoptimismgoerli_originTransfers: Array<stagingoptimismgoerli_OriginTransfer>;
  stagingoptimismgoerli_destinationTransfer?: Maybe<stagingoptimismgoerli_DestinationTransfer>;
  stagingoptimismgoerli_destinationTransfers: Array<stagingoptimismgoerli_DestinationTransfer>;
  stagingoptimismgoerli_originMessage?: Maybe<stagingoptimismgoerli_OriginMessage>;
  stagingoptimismgoerli_originMessages: Array<stagingoptimismgoerli_OriginMessage>;
  stagingoptimismgoerli_aggregateRoot?: Maybe<stagingoptimismgoerli_AggregateRoot>;
  stagingoptimismgoerli_aggregateRoots: Array<stagingoptimismgoerli_AggregateRoot>;
  stagingoptimismgoerli_connectorMeta?: Maybe<stagingoptimismgoerli_ConnectorMeta>;
  stagingoptimismgoerli_connectorMetas: Array<stagingoptimismgoerli_ConnectorMeta>;
  stagingoptimismgoerli_rootCount?: Maybe<stagingoptimismgoerli_RootCount>;
  stagingoptimismgoerli_rootCounts: Array<stagingoptimismgoerli_RootCount>;
  stagingoptimismgoerli_rootMessageSent?: Maybe<stagingoptimismgoerli_RootMessageSent>;
  stagingoptimismgoerli_rootMessageSents: Array<stagingoptimismgoerli_RootMessageSent>;
  stagingoptimismgoerli_relayerFeesIncrease?: Maybe<stagingoptimismgoerli_RelayerFeesIncrease>;
  stagingoptimismgoerli_relayerFeesIncreases: Array<stagingoptimismgoerli_RelayerFeesIncrease>;
  stagingoptimismgoerli_slippageUpdate?: Maybe<stagingoptimismgoerli_SlippageUpdate>;
  stagingoptimismgoerli_slippageUpdates: Array<stagingoptimismgoerli_SlippageUpdate>;
  stagingoptimismgoerli_snapshotRoot?: Maybe<stagingoptimismgoerli_SnapshotRoot>;
  stagingoptimismgoerli_snapshotRoots: Array<stagingoptimismgoerli_SnapshotRoot>;
  stagingoptimismgoerli_spokeConnectorMode?: Maybe<stagingoptimismgoerli_SpokeConnectorMode>;
  stagingoptimismgoerli_spokeConnectorModes: Array<stagingoptimismgoerli_SpokeConnectorMode>;
  stagingoptimismgoerli_aggregateRootProposed?: Maybe<stagingoptimismgoerli_AggregateRootProposed>;
  stagingoptimismgoerli_aggregateRootProposeds: Array<stagingoptimismgoerli_AggregateRootProposed>;
  stagingoptimismgoerli_optimisticRootFinalized?: Maybe<stagingoptimismgoerli_OptimisticRootFinalized>;
  stagingoptimismgoerli_optimisticRootFinalizeds: Array<stagingoptimismgoerli_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingoptimismgoerli__meta?: Maybe<stagingoptimismgoerli__Meta_>;
};


export type Querystagingoptimismgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_Asset_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_AssetStatus_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_AssetBalance_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_Router_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_Setting_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_Relayer_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_Sequencer_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_RelayerFee_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_OriginTransfer_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_OriginMessage_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_AggregateRoot_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_ConnectorMeta_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_RootCount_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_RootMessageSent_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_SlippageUpdate_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_SnapshotRoot_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli__metaArgs = {
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
};

export type stagingoptimismgoerli_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
};

export type stagingoptimismgoerli_RelayerFee = {
  id: Scalars['ID'];
  transfer: stagingoptimismgoerli_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['stagingoptimismgoerli_Bytes'];
};

export type stagingoptimismgoerli_RelayerFee_filter = {
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
  transfer_?: InputMaybe<stagingoptimismgoerli_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_RelayerFee_filter>>>;
};

export type stagingoptimismgoerli_RelayerFee_orderBy =
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

export type stagingoptimismgoerli_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: stagingoptimismgoerli_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller: Scalars['stagingoptimismgoerli_Bytes'];
  transactionHash: Scalars['stagingoptimismgoerli_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingoptimismgoerli_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<stagingoptimismgoerli_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_RelayerFeesIncrease_filter>>>;
};

export type stagingoptimismgoerli_RelayerFeesIncrease_orderBy =
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

export type stagingoptimismgoerli_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  relayer_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_Relayer_filter>>>;
};

export type stagingoptimismgoerli_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type stagingoptimismgoerli_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type stagingoptimismgoerli_RootCount_filter = {
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
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_RootCount_filter>>>;
};

export type stagingoptimismgoerli_RootCount_orderBy =
  | 'id'
  | 'count';

export type stagingoptimismgoerli_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingoptimismgoerli_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_RootMessageSent_filter>>>;
};

export type stagingoptimismgoerli_RootMessageSent_orderBy =
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

export type stagingoptimismgoerli_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recipient?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  proposedOwner?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<stagingoptimismgoerli_AssetBalance>;
};


export type stagingoptimismgoerli_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_AssetBalance_filter>;
};

export type stagingoptimismgoerli_RouterDailyTVL = {
  id: Scalars['ID'];
  router: stagingoptimismgoerli_Router;
  asset: stagingoptimismgoerli_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type stagingoptimismgoerli_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<stagingoptimismgoerli_Router_filter>;
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
  asset_?: InputMaybe<stagingoptimismgoerli_Asset_filter>;
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
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_RouterDailyTVL_filter>>>;
};

export type stagingoptimismgoerli_RouterDailyTVL_orderBy =
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

export type stagingoptimismgoerli_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<stagingoptimismgoerli_RouterLiquidityEventType>;
  router: stagingoptimismgoerli_Router;
  asset: stagingoptimismgoerli_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['stagingoptimismgoerli_Bytes'];
  nonce: Scalars['BigInt'];
};

export type stagingoptimismgoerli_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type stagingoptimismgoerli_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<stagingoptimismgoerli_RouterLiquidityEventType>;
  type_not?: InputMaybe<stagingoptimismgoerli_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<stagingoptimismgoerli_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<stagingoptimismgoerli_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<stagingoptimismgoerli_Router_filter>;
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
  asset_?: InputMaybe<stagingoptimismgoerli_Asset_filter>;
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
  caller?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_RouterLiquidityEvent_filter>>>;
};

export type stagingoptimismgoerli_RouterLiquidityEvent_orderBy =
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

export type stagingoptimismgoerli_Router_filter = {
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
  owner?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  owner_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  owner_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  owner_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  owner_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  owner_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recipient?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recipient_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<stagingoptimismgoerli_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_Router_filter>>>;
};

export type stagingoptimismgoerli_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type stagingoptimismgoerli_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
};

export type stagingoptimismgoerli_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_Sequencer_filter>>>;
};

export type stagingoptimismgoerli_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type stagingoptimismgoerli_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['stagingoptimismgoerli_Bytes'];
};

export type stagingoptimismgoerli_Setting_filter = {
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
  caller?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_Setting_filter>>>;
};

export type stagingoptimismgoerli_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type stagingoptimismgoerli_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: stagingoptimismgoerli_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['stagingoptimismgoerli_Bytes'];
  transactionHash: Scalars['stagingoptimismgoerli_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingoptimismgoerli_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<stagingoptimismgoerli_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_SlippageUpdate_filter>>>;
};

export type stagingoptimismgoerli_SlippageUpdate_orderBy =
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

export type stagingoptimismgoerli_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['stagingoptimismgoerli_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingoptimismgoerli_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_SnapshotRoot_filter>>>;
};

export type stagingoptimismgoerli_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type stagingoptimismgoerli_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type stagingoptimismgoerli_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_SpokeConnectorMode_filter>>>;
};

export type stagingoptimismgoerli_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  stagingoptimismgoerli_asset?: Maybe<stagingoptimismgoerli_Asset>;
  stagingoptimismgoerli_assets: Array<stagingoptimismgoerli_Asset>;
  stagingoptimismgoerli_assetStatus?: Maybe<stagingoptimismgoerli_AssetStatus>;
  stagingoptimismgoerli_assetStatuses: Array<stagingoptimismgoerli_AssetStatus>;
  stagingoptimismgoerli_assetBalance?: Maybe<stagingoptimismgoerli_AssetBalance>;
  stagingoptimismgoerli_assetBalances: Array<stagingoptimismgoerli_AssetBalance>;
  stagingoptimismgoerli_router?: Maybe<stagingoptimismgoerli_Router>;
  stagingoptimismgoerli_routers: Array<stagingoptimismgoerli_Router>;
  stagingoptimismgoerli_routerDailyTVL?: Maybe<stagingoptimismgoerli_RouterDailyTVL>;
  stagingoptimismgoerli_routerDailyTVLs: Array<stagingoptimismgoerli_RouterDailyTVL>;
  stagingoptimismgoerli_routerLiquidityEvent?: Maybe<stagingoptimismgoerli_RouterLiquidityEvent>;
  stagingoptimismgoerli_routerLiquidityEvents: Array<stagingoptimismgoerli_RouterLiquidityEvent>;
  stagingoptimismgoerli_setting?: Maybe<stagingoptimismgoerli_Setting>;
  stagingoptimismgoerli_settings: Array<stagingoptimismgoerli_Setting>;
  stagingoptimismgoerli_relayer?: Maybe<stagingoptimismgoerli_Relayer>;
  stagingoptimismgoerli_relayers: Array<stagingoptimismgoerli_Relayer>;
  stagingoptimismgoerli_sequencer?: Maybe<stagingoptimismgoerli_Sequencer>;
  stagingoptimismgoerli_sequencers: Array<stagingoptimismgoerli_Sequencer>;
  stagingoptimismgoerli_relayerFee?: Maybe<stagingoptimismgoerli_RelayerFee>;
  stagingoptimismgoerli_relayerFees: Array<stagingoptimismgoerli_RelayerFee>;
  stagingoptimismgoerli_originTransfer?: Maybe<stagingoptimismgoerli_OriginTransfer>;
  stagingoptimismgoerli_originTransfers: Array<stagingoptimismgoerli_OriginTransfer>;
  stagingoptimismgoerli_destinationTransfer?: Maybe<stagingoptimismgoerli_DestinationTransfer>;
  stagingoptimismgoerli_destinationTransfers: Array<stagingoptimismgoerli_DestinationTransfer>;
  stagingoptimismgoerli_originMessage?: Maybe<stagingoptimismgoerli_OriginMessage>;
  stagingoptimismgoerli_originMessages: Array<stagingoptimismgoerli_OriginMessage>;
  stagingoptimismgoerli_aggregateRoot?: Maybe<stagingoptimismgoerli_AggregateRoot>;
  stagingoptimismgoerli_aggregateRoots: Array<stagingoptimismgoerli_AggregateRoot>;
  stagingoptimismgoerli_connectorMeta?: Maybe<stagingoptimismgoerli_ConnectorMeta>;
  stagingoptimismgoerli_connectorMetas: Array<stagingoptimismgoerli_ConnectorMeta>;
  stagingoptimismgoerli_rootCount?: Maybe<stagingoptimismgoerli_RootCount>;
  stagingoptimismgoerli_rootCounts: Array<stagingoptimismgoerli_RootCount>;
  stagingoptimismgoerli_rootMessageSent?: Maybe<stagingoptimismgoerli_RootMessageSent>;
  stagingoptimismgoerli_rootMessageSents: Array<stagingoptimismgoerli_RootMessageSent>;
  stagingoptimismgoerli_relayerFeesIncrease?: Maybe<stagingoptimismgoerli_RelayerFeesIncrease>;
  stagingoptimismgoerli_relayerFeesIncreases: Array<stagingoptimismgoerli_RelayerFeesIncrease>;
  stagingoptimismgoerli_slippageUpdate?: Maybe<stagingoptimismgoerli_SlippageUpdate>;
  stagingoptimismgoerli_slippageUpdates: Array<stagingoptimismgoerli_SlippageUpdate>;
  stagingoptimismgoerli_snapshotRoot?: Maybe<stagingoptimismgoerli_SnapshotRoot>;
  stagingoptimismgoerli_snapshotRoots: Array<stagingoptimismgoerli_SnapshotRoot>;
  stagingoptimismgoerli_spokeConnectorMode?: Maybe<stagingoptimismgoerli_SpokeConnectorMode>;
  stagingoptimismgoerli_spokeConnectorModes: Array<stagingoptimismgoerli_SpokeConnectorMode>;
  stagingoptimismgoerli_aggregateRootProposed?: Maybe<stagingoptimismgoerli_AggregateRootProposed>;
  stagingoptimismgoerli_aggregateRootProposeds: Array<stagingoptimismgoerli_AggregateRootProposed>;
  stagingoptimismgoerli_optimisticRootFinalized?: Maybe<stagingoptimismgoerli_OptimisticRootFinalized>;
  stagingoptimismgoerli_optimisticRootFinalizeds: Array<stagingoptimismgoerli_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingoptimismgoerli__meta?: Maybe<stagingoptimismgoerli__Meta_>;
};


export type Subscriptionstagingoptimismgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_Asset_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_AssetStatus_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_AssetBalance_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_Router_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_Setting_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_Relayer_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_Sequencer_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_RelayerFee_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_OriginTransfer_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_OriginMessage_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_AggregateRoot_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_ConnectorMeta_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_RootCount_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_RootMessageSent_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_SlippageUpdate_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_SnapshotRoot_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli__metaArgs = {
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
};

export type stagingoptimismgoerli_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type stagingoptimismgoerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type stagingoptimismgoerli__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingoptimismgoerli__Block_;
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
  stagingoptimismgoerli_asset: InContextSdkMethod<Query['stagingoptimismgoerli_asset'], Querystagingoptimismgoerli_assetArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_assets: InContextSdkMethod<Query['stagingoptimismgoerli_assets'], Querystagingoptimismgoerli_assetsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_assetStatus: InContextSdkMethod<Query['stagingoptimismgoerli_assetStatus'], Querystagingoptimismgoerli_assetStatusArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_assetStatuses: InContextSdkMethod<Query['stagingoptimismgoerli_assetStatuses'], Querystagingoptimismgoerli_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_assetBalance: InContextSdkMethod<Query['stagingoptimismgoerli_assetBalance'], Querystagingoptimismgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_assetBalances: InContextSdkMethod<Query['stagingoptimismgoerli_assetBalances'], Querystagingoptimismgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_router: InContextSdkMethod<Query['stagingoptimismgoerli_router'], Querystagingoptimismgoerli_routerArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_routers: InContextSdkMethod<Query['stagingoptimismgoerli_routers'], Querystagingoptimismgoerli_routersArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_routerDailyTVL: InContextSdkMethod<Query['stagingoptimismgoerli_routerDailyTVL'], Querystagingoptimismgoerli_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_routerDailyTVLs: InContextSdkMethod<Query['stagingoptimismgoerli_routerDailyTVLs'], Querystagingoptimismgoerli_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_routerLiquidityEvent: InContextSdkMethod<Query['stagingoptimismgoerli_routerLiquidityEvent'], Querystagingoptimismgoerli_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_routerLiquidityEvents: InContextSdkMethod<Query['stagingoptimismgoerli_routerLiquidityEvents'], Querystagingoptimismgoerli_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_setting: InContextSdkMethod<Query['stagingoptimismgoerli_setting'], Querystagingoptimismgoerli_settingArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_settings: InContextSdkMethod<Query['stagingoptimismgoerli_settings'], Querystagingoptimismgoerli_settingsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_relayer: InContextSdkMethod<Query['stagingoptimismgoerli_relayer'], Querystagingoptimismgoerli_relayerArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_relayers: InContextSdkMethod<Query['stagingoptimismgoerli_relayers'], Querystagingoptimismgoerli_relayersArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_sequencer: InContextSdkMethod<Query['stagingoptimismgoerli_sequencer'], Querystagingoptimismgoerli_sequencerArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_sequencers: InContextSdkMethod<Query['stagingoptimismgoerli_sequencers'], Querystagingoptimismgoerli_sequencersArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_relayerFee: InContextSdkMethod<Query['stagingoptimismgoerli_relayerFee'], Querystagingoptimismgoerli_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_relayerFees: InContextSdkMethod<Query['stagingoptimismgoerli_relayerFees'], Querystagingoptimismgoerli_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_originTransfer: InContextSdkMethod<Query['stagingoptimismgoerli_originTransfer'], Querystagingoptimismgoerli_originTransferArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_originTransfers: InContextSdkMethod<Query['stagingoptimismgoerli_originTransfers'], Querystagingoptimismgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_destinationTransfer: InContextSdkMethod<Query['stagingoptimismgoerli_destinationTransfer'], Querystagingoptimismgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_destinationTransfers: InContextSdkMethod<Query['stagingoptimismgoerli_destinationTransfers'], Querystagingoptimismgoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_originMessage: InContextSdkMethod<Query['stagingoptimismgoerli_originMessage'], Querystagingoptimismgoerli_originMessageArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_originMessages: InContextSdkMethod<Query['stagingoptimismgoerli_originMessages'], Querystagingoptimismgoerli_originMessagesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_aggregateRoot: InContextSdkMethod<Query['stagingoptimismgoerli_aggregateRoot'], Querystagingoptimismgoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_aggregateRoots: InContextSdkMethod<Query['stagingoptimismgoerli_aggregateRoots'], Querystagingoptimismgoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_connectorMeta: InContextSdkMethod<Query['stagingoptimismgoerli_connectorMeta'], Querystagingoptimismgoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_connectorMetas: InContextSdkMethod<Query['stagingoptimismgoerli_connectorMetas'], Querystagingoptimismgoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_rootCount: InContextSdkMethod<Query['stagingoptimismgoerli_rootCount'], Querystagingoptimismgoerli_rootCountArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_rootCounts: InContextSdkMethod<Query['stagingoptimismgoerli_rootCounts'], Querystagingoptimismgoerli_rootCountsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_rootMessageSent: InContextSdkMethod<Query['stagingoptimismgoerli_rootMessageSent'], Querystagingoptimismgoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_rootMessageSents: InContextSdkMethod<Query['stagingoptimismgoerli_rootMessageSents'], Querystagingoptimismgoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_relayerFeesIncrease: InContextSdkMethod<Query['stagingoptimismgoerli_relayerFeesIncrease'], Querystagingoptimismgoerli_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_relayerFeesIncreases: InContextSdkMethod<Query['stagingoptimismgoerli_relayerFeesIncreases'], Querystagingoptimismgoerli_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_slippageUpdate: InContextSdkMethod<Query['stagingoptimismgoerli_slippageUpdate'], Querystagingoptimismgoerli_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_slippageUpdates: InContextSdkMethod<Query['stagingoptimismgoerli_slippageUpdates'], Querystagingoptimismgoerli_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_snapshotRoot: InContextSdkMethod<Query['stagingoptimismgoerli_snapshotRoot'], Querystagingoptimismgoerli_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_snapshotRoots: InContextSdkMethod<Query['stagingoptimismgoerli_snapshotRoots'], Querystagingoptimismgoerli_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_spokeConnectorMode: InContextSdkMethod<Query['stagingoptimismgoerli_spokeConnectorMode'], Querystagingoptimismgoerli_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_spokeConnectorModes: InContextSdkMethod<Query['stagingoptimismgoerli_spokeConnectorModes'], Querystagingoptimismgoerli_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_aggregateRootProposed: InContextSdkMethod<Query['stagingoptimismgoerli_aggregateRootProposed'], Querystagingoptimismgoerli_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_aggregateRootProposeds: InContextSdkMethod<Query['stagingoptimismgoerli_aggregateRootProposeds'], Querystagingoptimismgoerli_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_optimisticRootFinalized: InContextSdkMethod<Query['stagingoptimismgoerli_optimisticRootFinalized'], Querystagingoptimismgoerli_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_optimisticRootFinalizeds: InContextSdkMethod<Query['stagingoptimismgoerli_optimisticRootFinalizeds'], Querystagingoptimismgoerli_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingoptimismgoerli__meta: InContextSdkMethod<Query['stagingoptimismgoerli__meta'], Querystagingoptimismgoerli__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  stagingoptimismgoerli_asset: InContextSdkMethod<Subscription['stagingoptimismgoerli_asset'], Subscriptionstagingoptimismgoerli_assetArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_assets: InContextSdkMethod<Subscription['stagingoptimismgoerli_assets'], Subscriptionstagingoptimismgoerli_assetsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_assetStatus: InContextSdkMethod<Subscription['stagingoptimismgoerli_assetStatus'], Subscriptionstagingoptimismgoerli_assetStatusArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_assetStatuses: InContextSdkMethod<Subscription['stagingoptimismgoerli_assetStatuses'], Subscriptionstagingoptimismgoerli_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_assetBalance: InContextSdkMethod<Subscription['stagingoptimismgoerli_assetBalance'], Subscriptionstagingoptimismgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_assetBalances: InContextSdkMethod<Subscription['stagingoptimismgoerli_assetBalances'], Subscriptionstagingoptimismgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_router: InContextSdkMethod<Subscription['stagingoptimismgoerli_router'], Subscriptionstagingoptimismgoerli_routerArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_routers: InContextSdkMethod<Subscription['stagingoptimismgoerli_routers'], Subscriptionstagingoptimismgoerli_routersArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_routerDailyTVL: InContextSdkMethod<Subscription['stagingoptimismgoerli_routerDailyTVL'], Subscriptionstagingoptimismgoerli_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_routerDailyTVLs: InContextSdkMethod<Subscription['stagingoptimismgoerli_routerDailyTVLs'], Subscriptionstagingoptimismgoerli_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_routerLiquidityEvent: InContextSdkMethod<Subscription['stagingoptimismgoerli_routerLiquidityEvent'], Subscriptionstagingoptimismgoerli_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_routerLiquidityEvents: InContextSdkMethod<Subscription['stagingoptimismgoerli_routerLiquidityEvents'], Subscriptionstagingoptimismgoerli_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_setting: InContextSdkMethod<Subscription['stagingoptimismgoerli_setting'], Subscriptionstagingoptimismgoerli_settingArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_settings: InContextSdkMethod<Subscription['stagingoptimismgoerli_settings'], Subscriptionstagingoptimismgoerli_settingsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_relayer: InContextSdkMethod<Subscription['stagingoptimismgoerli_relayer'], Subscriptionstagingoptimismgoerli_relayerArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_relayers: InContextSdkMethod<Subscription['stagingoptimismgoerli_relayers'], Subscriptionstagingoptimismgoerli_relayersArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_sequencer: InContextSdkMethod<Subscription['stagingoptimismgoerli_sequencer'], Subscriptionstagingoptimismgoerli_sequencerArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_sequencers: InContextSdkMethod<Subscription['stagingoptimismgoerli_sequencers'], Subscriptionstagingoptimismgoerli_sequencersArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_relayerFee: InContextSdkMethod<Subscription['stagingoptimismgoerli_relayerFee'], Subscriptionstagingoptimismgoerli_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_relayerFees: InContextSdkMethod<Subscription['stagingoptimismgoerli_relayerFees'], Subscriptionstagingoptimismgoerli_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_originTransfer: InContextSdkMethod<Subscription['stagingoptimismgoerli_originTransfer'], Subscriptionstagingoptimismgoerli_originTransferArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_originTransfers: InContextSdkMethod<Subscription['stagingoptimismgoerli_originTransfers'], Subscriptionstagingoptimismgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_destinationTransfer: InContextSdkMethod<Subscription['stagingoptimismgoerli_destinationTransfer'], Subscriptionstagingoptimismgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_destinationTransfers: InContextSdkMethod<Subscription['stagingoptimismgoerli_destinationTransfers'], Subscriptionstagingoptimismgoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_originMessage: InContextSdkMethod<Subscription['stagingoptimismgoerli_originMessage'], Subscriptionstagingoptimismgoerli_originMessageArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_originMessages: InContextSdkMethod<Subscription['stagingoptimismgoerli_originMessages'], Subscriptionstagingoptimismgoerli_originMessagesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_aggregateRoot: InContextSdkMethod<Subscription['stagingoptimismgoerli_aggregateRoot'], Subscriptionstagingoptimismgoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_aggregateRoots: InContextSdkMethod<Subscription['stagingoptimismgoerli_aggregateRoots'], Subscriptionstagingoptimismgoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_connectorMeta: InContextSdkMethod<Subscription['stagingoptimismgoerli_connectorMeta'], Subscriptionstagingoptimismgoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_connectorMetas: InContextSdkMethod<Subscription['stagingoptimismgoerli_connectorMetas'], Subscriptionstagingoptimismgoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_rootCount: InContextSdkMethod<Subscription['stagingoptimismgoerli_rootCount'], Subscriptionstagingoptimismgoerli_rootCountArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_rootCounts: InContextSdkMethod<Subscription['stagingoptimismgoerli_rootCounts'], Subscriptionstagingoptimismgoerli_rootCountsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_rootMessageSent: InContextSdkMethod<Subscription['stagingoptimismgoerli_rootMessageSent'], Subscriptionstagingoptimismgoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_rootMessageSents: InContextSdkMethod<Subscription['stagingoptimismgoerli_rootMessageSents'], Subscriptionstagingoptimismgoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_relayerFeesIncrease: InContextSdkMethod<Subscription['stagingoptimismgoerli_relayerFeesIncrease'], Subscriptionstagingoptimismgoerli_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_relayerFeesIncreases: InContextSdkMethod<Subscription['stagingoptimismgoerli_relayerFeesIncreases'], Subscriptionstagingoptimismgoerli_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_slippageUpdate: InContextSdkMethod<Subscription['stagingoptimismgoerli_slippageUpdate'], Subscriptionstagingoptimismgoerli_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_slippageUpdates: InContextSdkMethod<Subscription['stagingoptimismgoerli_slippageUpdates'], Subscriptionstagingoptimismgoerli_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_snapshotRoot: InContextSdkMethod<Subscription['stagingoptimismgoerli_snapshotRoot'], Subscriptionstagingoptimismgoerli_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_snapshotRoots: InContextSdkMethod<Subscription['stagingoptimismgoerli_snapshotRoots'], Subscriptionstagingoptimismgoerli_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_spokeConnectorMode: InContextSdkMethod<Subscription['stagingoptimismgoerli_spokeConnectorMode'], Subscriptionstagingoptimismgoerli_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_spokeConnectorModes: InContextSdkMethod<Subscription['stagingoptimismgoerli_spokeConnectorModes'], Subscriptionstagingoptimismgoerli_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_aggregateRootProposed: InContextSdkMethod<Subscription['stagingoptimismgoerli_aggregateRootProposed'], Subscriptionstagingoptimismgoerli_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_aggregateRootProposeds: InContextSdkMethod<Subscription['stagingoptimismgoerli_aggregateRootProposeds'], Subscriptionstagingoptimismgoerli_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_optimisticRootFinalized: InContextSdkMethod<Subscription['stagingoptimismgoerli_optimisticRootFinalized'], Subscriptionstagingoptimismgoerli_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_optimisticRootFinalizeds: InContextSdkMethod<Subscription['stagingoptimismgoerli_optimisticRootFinalizeds'], Subscriptionstagingoptimismgoerli_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingoptimismgoerli__meta: InContextSdkMethod<Subscription['stagingoptimismgoerli__meta'], Subscriptionstagingoptimismgoerli__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Staging_OptimismGoerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
