// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextStagingXlayerTypes {
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
  stagingxlayer_BigDecimal: any;
  BigInt: any;
  stagingxlayer_Bytes: any;
  stagingxlayer_Int8: any;
};

export type stagingxlayer_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['stagingxlayer_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type stagingxlayer_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingxlayer_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingxlayer_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
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
  _change_block?: InputMaybe<stagingxlayer_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxlayer_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxlayer_AggregateRootProposed_filter>>>;
};

export type stagingxlayer_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type stagingxlayer_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxlayer_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxlayer_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxlayer_AggregateRoot_filter>>>;
};

export type stagingxlayer_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type stagingxlayer_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['stagingxlayer_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingxlayer_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['stagingxlayer_Bytes']>;
  localAsset?: Maybe<Scalars['stagingxlayer_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingxlayer_AssetStatus>;
};

export type stagingxlayer_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: stagingxlayer_Router;
  asset: stagingxlayer_Asset;
  feesEarned: Scalars['BigInt'];
};

export type stagingxlayer_AssetBalance_filter = {
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
  router_?: InputMaybe<stagingxlayer_Router_filter>;
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
  asset_?: InputMaybe<stagingxlayer_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxlayer_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxlayer_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxlayer_AssetBalance_filter>>>;
};

export type stagingxlayer_AssetBalance_orderBy =
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

export type stagingxlayer_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type stagingxlayer_AssetStatus_filter = {
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
  _change_block?: InputMaybe<stagingxlayer_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxlayer_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxlayer_AssetStatus_filter>>>;
};

export type stagingxlayer_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type stagingxlayer_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  key_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  key_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  key_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  key_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  key_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  key_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  localAsset?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
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
  status_?: InputMaybe<stagingxlayer_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxlayer_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxlayer_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxlayer_Asset_filter>>>;
};

export type stagingxlayer_Asset_orderBy =
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

export type stagingxlayer_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingxlayer_Block_height = {
  hash?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type stagingxlayer_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['stagingxlayer_Bytes']>;
  rootManager?: Maybe<Scalars['stagingxlayer_Bytes']>;
  mirrorConnector?: Maybe<Scalars['stagingxlayer_Bytes']>;
};

export type stagingxlayer_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxlayer_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxlayer_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxlayer_ConnectorMeta_filter>>>;
};

export type stagingxlayer_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingxlayer_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingxlayer_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingxlayer_TransferStatus>;
  routers?: Maybe<Array<stagingxlayer_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingxlayer_Bytes']>;
  delegate?: Maybe<Scalars['stagingxlayer_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingxlayer_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingxlayer_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingxlayer_Bytes']>;
  asset?: Maybe<stagingxlayer_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['stagingxlayer_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['stagingxlayer_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['stagingxlayer_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['stagingxlayer_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['stagingxlayer_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['stagingxlayer_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingxlayer_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_Router_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_Router_filter>;
};

export type stagingxlayer_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingxlayer_TransferStatus>;
  status_not?: InputMaybe<stagingxlayer_TransferStatus>;
  status_in?: InputMaybe<Array<stagingxlayer_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingxlayer_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<stagingxlayer_Router_filter>;
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
  to?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
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
  originSender?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
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
  asset_?: InputMaybe<stagingxlayer_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxlayer_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxlayer_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxlayer_DestinationTransfer_filter>>>;
};

export type stagingxlayer_DestinationTransfer_orderBy =
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

export type stagingxlayer_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingxlayer_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingxlayer_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
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
  _change_block?: InputMaybe<stagingxlayer_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxlayer_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxlayer_OptimisticRootFinalized_filter>>>;
};

export type stagingxlayer_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type stagingxlayer_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingxlayer_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['stagingxlayer_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['stagingxlayer_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['stagingxlayer_Bytes']>;
  root?: Maybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingxlayer_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<stagingxlayer_RootCount>;
};

export type stagingxlayer_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  leaf_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  message_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  message_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  message_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  message_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  message_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  message_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
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
  rootCount_?: InputMaybe<stagingxlayer_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxlayer_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxlayer_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxlayer_OriginMessage_filter>>>;
};

export type stagingxlayer_OriginMessage_orderBy =
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

export type stagingxlayer_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingxlayer_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingxlayer_TransferStatus>;
  messageHash?: Maybe<Scalars['stagingxlayer_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingxlayer_Bytes']>;
  delegate?: Maybe<Scalars['stagingxlayer_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingxlayer_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingxlayer_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingxlayer_Bytes']>;
  asset?: Maybe<stagingxlayer_Asset>;
  transactingAsset?: Maybe<Scalars['stagingxlayer_Bytes']>;
  message?: Maybe<stagingxlayer_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<stagingxlayer_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['stagingxlayer_Bytes']>;
  caller?: Maybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingxlayer_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['stagingxlayer_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type stagingxlayer_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_RelayerFee_filter>;
};

export type stagingxlayer_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingxlayer_TransferStatus>;
  status_not?: InputMaybe<stagingxlayer_TransferStatus>;
  status_in?: InputMaybe<Array<stagingxlayer_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingxlayer_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
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
  to?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
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
  asset_?: InputMaybe<stagingxlayer_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
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
  message_?: InputMaybe<stagingxlayer_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<stagingxlayer_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxlayer_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxlayer_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxlayer_OriginTransfer_filter>>>;
};

export type stagingxlayer_OriginTransfer_orderBy =
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
  stagingxlayer_asset?: Maybe<stagingxlayer_Asset>;
  stagingxlayer_assets: Array<stagingxlayer_Asset>;
  stagingxlayer_assetStatus?: Maybe<stagingxlayer_AssetStatus>;
  stagingxlayer_assetStatuses: Array<stagingxlayer_AssetStatus>;
  stagingxlayer_assetBalance?: Maybe<stagingxlayer_AssetBalance>;
  stagingxlayer_assetBalances: Array<stagingxlayer_AssetBalance>;
  stagingxlayer_router?: Maybe<stagingxlayer_Router>;
  stagingxlayer_routers: Array<stagingxlayer_Router>;
  stagingxlayer_routerDailyTVL?: Maybe<stagingxlayer_RouterDailyTVL>;
  stagingxlayer_routerDailyTVLs: Array<stagingxlayer_RouterDailyTVL>;
  stagingxlayer_routerLiquidityEvent?: Maybe<stagingxlayer_RouterLiquidityEvent>;
  stagingxlayer_routerLiquidityEvents: Array<stagingxlayer_RouterLiquidityEvent>;
  stagingxlayer_setting?: Maybe<stagingxlayer_Setting>;
  stagingxlayer_settings: Array<stagingxlayer_Setting>;
  stagingxlayer_relayer?: Maybe<stagingxlayer_Relayer>;
  stagingxlayer_relayers: Array<stagingxlayer_Relayer>;
  stagingxlayer_sequencer?: Maybe<stagingxlayer_Sequencer>;
  stagingxlayer_sequencers: Array<stagingxlayer_Sequencer>;
  stagingxlayer_relayerFee?: Maybe<stagingxlayer_RelayerFee>;
  stagingxlayer_relayerFees: Array<stagingxlayer_RelayerFee>;
  stagingxlayer_originTransfer?: Maybe<stagingxlayer_OriginTransfer>;
  stagingxlayer_originTransfers: Array<stagingxlayer_OriginTransfer>;
  stagingxlayer_destinationTransfer?: Maybe<stagingxlayer_DestinationTransfer>;
  stagingxlayer_destinationTransfers: Array<stagingxlayer_DestinationTransfer>;
  stagingxlayer_originMessage?: Maybe<stagingxlayer_OriginMessage>;
  stagingxlayer_originMessages: Array<stagingxlayer_OriginMessage>;
  stagingxlayer_aggregateRoot?: Maybe<stagingxlayer_AggregateRoot>;
  stagingxlayer_aggregateRoots: Array<stagingxlayer_AggregateRoot>;
  stagingxlayer_connectorMeta?: Maybe<stagingxlayer_ConnectorMeta>;
  stagingxlayer_connectorMetas: Array<stagingxlayer_ConnectorMeta>;
  stagingxlayer_rootCount?: Maybe<stagingxlayer_RootCount>;
  stagingxlayer_rootCounts: Array<stagingxlayer_RootCount>;
  stagingxlayer_rootMessageSent?: Maybe<stagingxlayer_RootMessageSent>;
  stagingxlayer_rootMessageSents: Array<stagingxlayer_RootMessageSent>;
  stagingxlayer_relayerFeesIncrease?: Maybe<stagingxlayer_RelayerFeesIncrease>;
  stagingxlayer_relayerFeesIncreases: Array<stagingxlayer_RelayerFeesIncrease>;
  stagingxlayer_slippageUpdate?: Maybe<stagingxlayer_SlippageUpdate>;
  stagingxlayer_slippageUpdates: Array<stagingxlayer_SlippageUpdate>;
  stagingxlayer_snapshotRoot?: Maybe<stagingxlayer_SnapshotRoot>;
  stagingxlayer_snapshotRoots: Array<stagingxlayer_SnapshotRoot>;
  stagingxlayer_spokeConnectorMode?: Maybe<stagingxlayer_SpokeConnectorMode>;
  stagingxlayer_spokeConnectorModes: Array<stagingxlayer_SpokeConnectorMode>;
  stagingxlayer_aggregateRootProposed?: Maybe<stagingxlayer_AggregateRootProposed>;
  stagingxlayer_aggregateRootProposeds: Array<stagingxlayer_AggregateRootProposed>;
  stagingxlayer_optimisticRootFinalized?: Maybe<stagingxlayer_OptimisticRootFinalized>;
  stagingxlayer_optimisticRootFinalizeds: Array<stagingxlayer_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingxlayer__meta?: Maybe<stagingxlayer__Meta_>;
};


export type Querystagingxlayer_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_Asset_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_AssetStatus_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_AssetBalance_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_Router_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_Router_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_Setting_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_Relayer_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_Sequencer_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_RelayerFee_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_OriginTransfer_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_DestinationTransfer_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_OriginMessage_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_AggregateRoot_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_ConnectorMeta_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_RootCount_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_RootMessageSent_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_SlippageUpdate_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_SnapshotRoot_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingxlayer__metaArgs = {
  block?: InputMaybe<stagingxlayer_Block_height>;
};

export type stagingxlayer_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['stagingxlayer_Bytes']>;
};

export type stagingxlayer_RelayerFee = {
  id: Scalars['ID'];
  transfer: stagingxlayer_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['stagingxlayer_Bytes'];
};

export type stagingxlayer_RelayerFee_filter = {
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
  transfer_?: InputMaybe<stagingxlayer_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxlayer_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxlayer_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxlayer_RelayerFee_filter>>>;
};

export type stagingxlayer_RelayerFee_orderBy =
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

export type stagingxlayer_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: stagingxlayer_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['stagingxlayer_Bytes']>;
  caller: Scalars['stagingxlayer_Bytes'];
  transactionHash: Scalars['stagingxlayer_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingxlayer_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<stagingxlayer_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
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
  _change_block?: InputMaybe<stagingxlayer_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxlayer_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxlayer_RelayerFeesIncrease_filter>>>;
};

export type stagingxlayer_RelayerFeesIncrease_orderBy =
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

export type stagingxlayer_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  relayer_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxlayer_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxlayer_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxlayer_Relayer_filter>>>;
};

export type stagingxlayer_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type stagingxlayer_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type stagingxlayer_RootCount_filter = {
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
  _change_block?: InputMaybe<stagingxlayer_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxlayer_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxlayer_RootCount_filter>>>;
};

export type stagingxlayer_RootCount_orderBy =
  | 'id'
  | 'count';

export type stagingxlayer_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['stagingxlayer_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingxlayer_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingxlayer_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
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
  _change_block?: InputMaybe<stagingxlayer_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxlayer_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxlayer_RootMessageSent_filter>>>;
};

export type stagingxlayer_RootMessageSent_orderBy =
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

export type stagingxlayer_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['stagingxlayer_Bytes']>;
  recipient?: Maybe<Scalars['stagingxlayer_Bytes']>;
  proposedOwner?: Maybe<Scalars['stagingxlayer_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<stagingxlayer_AssetBalance>;
};


export type stagingxlayer_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_AssetBalance_filter>;
};

export type stagingxlayer_RouterDailyTVL = {
  id: Scalars['ID'];
  router: stagingxlayer_Router;
  asset: stagingxlayer_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type stagingxlayer_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<stagingxlayer_Router_filter>;
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
  asset_?: InputMaybe<stagingxlayer_Asset_filter>;
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
  _change_block?: InputMaybe<stagingxlayer_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxlayer_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxlayer_RouterDailyTVL_filter>>>;
};

export type stagingxlayer_RouterDailyTVL_orderBy =
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

export type stagingxlayer_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<stagingxlayer_RouterLiquidityEventType>;
  router: stagingxlayer_Router;
  asset: stagingxlayer_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['stagingxlayer_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['stagingxlayer_Bytes'];
  nonce: Scalars['BigInt'];
};

export type stagingxlayer_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type stagingxlayer_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<stagingxlayer_RouterLiquidityEventType>;
  type_not?: InputMaybe<stagingxlayer_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<stagingxlayer_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<stagingxlayer_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<stagingxlayer_Router_filter>;
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
  asset_?: InputMaybe<stagingxlayer_Asset_filter>;
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
  caller?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxlayer_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxlayer_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxlayer_RouterLiquidityEvent_filter>>>;
};

export type stagingxlayer_RouterLiquidityEvent_orderBy =
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

export type stagingxlayer_Router_filter = {
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
  owner?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  owner_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  owner_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  owner_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  owner_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  owner_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  recipient?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  recipient_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<stagingxlayer_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxlayer_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxlayer_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxlayer_Router_filter>>>;
};

export type stagingxlayer_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type stagingxlayer_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['stagingxlayer_Bytes']>;
};

export type stagingxlayer_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxlayer_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxlayer_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxlayer_Sequencer_filter>>>;
};

export type stagingxlayer_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type stagingxlayer_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['stagingxlayer_Bytes'];
};

export type stagingxlayer_Setting_filter = {
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
  caller?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingxlayer_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxlayer_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxlayer_Setting_filter>>>;
};

export type stagingxlayer_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type stagingxlayer_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: stagingxlayer_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['stagingxlayer_Bytes'];
  transactionHash: Scalars['stagingxlayer_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingxlayer_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<stagingxlayer_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
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
  _change_block?: InputMaybe<stagingxlayer_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxlayer_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxlayer_SlippageUpdate_filter>>>;
};

export type stagingxlayer_SlippageUpdate_orderBy =
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

export type stagingxlayer_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['stagingxlayer_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingxlayer_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingxlayer_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingxlayer_Bytes']>;
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
  _change_block?: InputMaybe<stagingxlayer_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxlayer_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxlayer_SnapshotRoot_filter>>>;
};

export type stagingxlayer_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type stagingxlayer_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type stagingxlayer_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<stagingxlayer_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingxlayer_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingxlayer_SpokeConnectorMode_filter>>>;
};

export type stagingxlayer_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  stagingxlayer_asset?: Maybe<stagingxlayer_Asset>;
  stagingxlayer_assets: Array<stagingxlayer_Asset>;
  stagingxlayer_assetStatus?: Maybe<stagingxlayer_AssetStatus>;
  stagingxlayer_assetStatuses: Array<stagingxlayer_AssetStatus>;
  stagingxlayer_assetBalance?: Maybe<stagingxlayer_AssetBalance>;
  stagingxlayer_assetBalances: Array<stagingxlayer_AssetBalance>;
  stagingxlayer_router?: Maybe<stagingxlayer_Router>;
  stagingxlayer_routers: Array<stagingxlayer_Router>;
  stagingxlayer_routerDailyTVL?: Maybe<stagingxlayer_RouterDailyTVL>;
  stagingxlayer_routerDailyTVLs: Array<stagingxlayer_RouterDailyTVL>;
  stagingxlayer_routerLiquidityEvent?: Maybe<stagingxlayer_RouterLiquidityEvent>;
  stagingxlayer_routerLiquidityEvents: Array<stagingxlayer_RouterLiquidityEvent>;
  stagingxlayer_setting?: Maybe<stagingxlayer_Setting>;
  stagingxlayer_settings: Array<stagingxlayer_Setting>;
  stagingxlayer_relayer?: Maybe<stagingxlayer_Relayer>;
  stagingxlayer_relayers: Array<stagingxlayer_Relayer>;
  stagingxlayer_sequencer?: Maybe<stagingxlayer_Sequencer>;
  stagingxlayer_sequencers: Array<stagingxlayer_Sequencer>;
  stagingxlayer_relayerFee?: Maybe<stagingxlayer_RelayerFee>;
  stagingxlayer_relayerFees: Array<stagingxlayer_RelayerFee>;
  stagingxlayer_originTransfer?: Maybe<stagingxlayer_OriginTransfer>;
  stagingxlayer_originTransfers: Array<stagingxlayer_OriginTransfer>;
  stagingxlayer_destinationTransfer?: Maybe<stagingxlayer_DestinationTransfer>;
  stagingxlayer_destinationTransfers: Array<stagingxlayer_DestinationTransfer>;
  stagingxlayer_originMessage?: Maybe<stagingxlayer_OriginMessage>;
  stagingxlayer_originMessages: Array<stagingxlayer_OriginMessage>;
  stagingxlayer_aggregateRoot?: Maybe<stagingxlayer_AggregateRoot>;
  stagingxlayer_aggregateRoots: Array<stagingxlayer_AggregateRoot>;
  stagingxlayer_connectorMeta?: Maybe<stagingxlayer_ConnectorMeta>;
  stagingxlayer_connectorMetas: Array<stagingxlayer_ConnectorMeta>;
  stagingxlayer_rootCount?: Maybe<stagingxlayer_RootCount>;
  stagingxlayer_rootCounts: Array<stagingxlayer_RootCount>;
  stagingxlayer_rootMessageSent?: Maybe<stagingxlayer_RootMessageSent>;
  stagingxlayer_rootMessageSents: Array<stagingxlayer_RootMessageSent>;
  stagingxlayer_relayerFeesIncrease?: Maybe<stagingxlayer_RelayerFeesIncrease>;
  stagingxlayer_relayerFeesIncreases: Array<stagingxlayer_RelayerFeesIncrease>;
  stagingxlayer_slippageUpdate?: Maybe<stagingxlayer_SlippageUpdate>;
  stagingxlayer_slippageUpdates: Array<stagingxlayer_SlippageUpdate>;
  stagingxlayer_snapshotRoot?: Maybe<stagingxlayer_SnapshotRoot>;
  stagingxlayer_snapshotRoots: Array<stagingxlayer_SnapshotRoot>;
  stagingxlayer_spokeConnectorMode?: Maybe<stagingxlayer_SpokeConnectorMode>;
  stagingxlayer_spokeConnectorModes: Array<stagingxlayer_SpokeConnectorMode>;
  stagingxlayer_aggregateRootProposed?: Maybe<stagingxlayer_AggregateRootProposed>;
  stagingxlayer_aggregateRootProposeds: Array<stagingxlayer_AggregateRootProposed>;
  stagingxlayer_optimisticRootFinalized?: Maybe<stagingxlayer_OptimisticRootFinalized>;
  stagingxlayer_optimisticRootFinalizeds: Array<stagingxlayer_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  stagingxlayer__meta?: Maybe<stagingxlayer__Meta_>;
};


export type Subscriptionstagingxlayer_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_Asset_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_AssetStatus_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_AssetBalance_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_Router_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_Router_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_RouterDailyTVL_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_RouterLiquidityEvent_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_Setting_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_Relayer_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_Sequencer_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_RelayerFee_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_OriginTransfer_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_DestinationTransfer_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_OriginMessage_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_AggregateRoot_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_ConnectorMeta_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_RootCount_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_RootMessageSent_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_RelayerFeesIncrease_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_SlippageUpdate_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_SnapshotRoot_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_SpokeConnectorMode_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_AggregateRootProposed_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingxlayer_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingxlayer_OrderDirection>;
  where?: InputMaybe<stagingxlayer_OptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingxlayer_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingxlayer__metaArgs = {
  block?: InputMaybe<stagingxlayer_Block_height>;
};

export type stagingxlayer_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type stagingxlayer__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingxlayer_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type stagingxlayer__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingxlayer__Block_;
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
  stagingxlayer_asset: InContextSdkMethod<Query['stagingxlayer_asset'], Querystagingxlayer_assetArgs, MeshContext>,
  /** null **/
  stagingxlayer_assets: InContextSdkMethod<Query['stagingxlayer_assets'], Querystagingxlayer_assetsArgs, MeshContext>,
  /** null **/
  stagingxlayer_assetStatus: InContextSdkMethod<Query['stagingxlayer_assetStatus'], Querystagingxlayer_assetStatusArgs, MeshContext>,
  /** null **/
  stagingxlayer_assetStatuses: InContextSdkMethod<Query['stagingxlayer_assetStatuses'], Querystagingxlayer_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingxlayer_assetBalance: InContextSdkMethod<Query['stagingxlayer_assetBalance'], Querystagingxlayer_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingxlayer_assetBalances: InContextSdkMethod<Query['stagingxlayer_assetBalances'], Querystagingxlayer_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingxlayer_router: InContextSdkMethod<Query['stagingxlayer_router'], Querystagingxlayer_routerArgs, MeshContext>,
  /** null **/
  stagingxlayer_routers: InContextSdkMethod<Query['stagingxlayer_routers'], Querystagingxlayer_routersArgs, MeshContext>,
  /** null **/
  stagingxlayer_routerDailyTVL: InContextSdkMethod<Query['stagingxlayer_routerDailyTVL'], Querystagingxlayer_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingxlayer_routerDailyTVLs: InContextSdkMethod<Query['stagingxlayer_routerDailyTVLs'], Querystagingxlayer_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingxlayer_routerLiquidityEvent: InContextSdkMethod<Query['stagingxlayer_routerLiquidityEvent'], Querystagingxlayer_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingxlayer_routerLiquidityEvents: InContextSdkMethod<Query['stagingxlayer_routerLiquidityEvents'], Querystagingxlayer_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingxlayer_setting: InContextSdkMethod<Query['stagingxlayer_setting'], Querystagingxlayer_settingArgs, MeshContext>,
  /** null **/
  stagingxlayer_settings: InContextSdkMethod<Query['stagingxlayer_settings'], Querystagingxlayer_settingsArgs, MeshContext>,
  /** null **/
  stagingxlayer_relayer: InContextSdkMethod<Query['stagingxlayer_relayer'], Querystagingxlayer_relayerArgs, MeshContext>,
  /** null **/
  stagingxlayer_relayers: InContextSdkMethod<Query['stagingxlayer_relayers'], Querystagingxlayer_relayersArgs, MeshContext>,
  /** null **/
  stagingxlayer_sequencer: InContextSdkMethod<Query['stagingxlayer_sequencer'], Querystagingxlayer_sequencerArgs, MeshContext>,
  /** null **/
  stagingxlayer_sequencers: InContextSdkMethod<Query['stagingxlayer_sequencers'], Querystagingxlayer_sequencersArgs, MeshContext>,
  /** null **/
  stagingxlayer_relayerFee: InContextSdkMethod<Query['stagingxlayer_relayerFee'], Querystagingxlayer_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingxlayer_relayerFees: InContextSdkMethod<Query['stagingxlayer_relayerFees'], Querystagingxlayer_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingxlayer_originTransfer: InContextSdkMethod<Query['stagingxlayer_originTransfer'], Querystagingxlayer_originTransferArgs, MeshContext>,
  /** null **/
  stagingxlayer_originTransfers: InContextSdkMethod<Query['stagingxlayer_originTransfers'], Querystagingxlayer_originTransfersArgs, MeshContext>,
  /** null **/
  stagingxlayer_destinationTransfer: InContextSdkMethod<Query['stagingxlayer_destinationTransfer'], Querystagingxlayer_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingxlayer_destinationTransfers: InContextSdkMethod<Query['stagingxlayer_destinationTransfers'], Querystagingxlayer_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingxlayer_originMessage: InContextSdkMethod<Query['stagingxlayer_originMessage'], Querystagingxlayer_originMessageArgs, MeshContext>,
  /** null **/
  stagingxlayer_originMessages: InContextSdkMethod<Query['stagingxlayer_originMessages'], Querystagingxlayer_originMessagesArgs, MeshContext>,
  /** null **/
  stagingxlayer_aggregateRoot: InContextSdkMethod<Query['stagingxlayer_aggregateRoot'], Querystagingxlayer_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingxlayer_aggregateRoots: InContextSdkMethod<Query['stagingxlayer_aggregateRoots'], Querystagingxlayer_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingxlayer_connectorMeta: InContextSdkMethod<Query['stagingxlayer_connectorMeta'], Querystagingxlayer_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingxlayer_connectorMetas: InContextSdkMethod<Query['stagingxlayer_connectorMetas'], Querystagingxlayer_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingxlayer_rootCount: InContextSdkMethod<Query['stagingxlayer_rootCount'], Querystagingxlayer_rootCountArgs, MeshContext>,
  /** null **/
  stagingxlayer_rootCounts: InContextSdkMethod<Query['stagingxlayer_rootCounts'], Querystagingxlayer_rootCountsArgs, MeshContext>,
  /** null **/
  stagingxlayer_rootMessageSent: InContextSdkMethod<Query['stagingxlayer_rootMessageSent'], Querystagingxlayer_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingxlayer_rootMessageSents: InContextSdkMethod<Query['stagingxlayer_rootMessageSents'], Querystagingxlayer_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingxlayer_relayerFeesIncrease: InContextSdkMethod<Query['stagingxlayer_relayerFeesIncrease'], Querystagingxlayer_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingxlayer_relayerFeesIncreases: InContextSdkMethod<Query['stagingxlayer_relayerFeesIncreases'], Querystagingxlayer_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingxlayer_slippageUpdate: InContextSdkMethod<Query['stagingxlayer_slippageUpdate'], Querystagingxlayer_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingxlayer_slippageUpdates: InContextSdkMethod<Query['stagingxlayer_slippageUpdates'], Querystagingxlayer_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingxlayer_snapshotRoot: InContextSdkMethod<Query['stagingxlayer_snapshotRoot'], Querystagingxlayer_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingxlayer_snapshotRoots: InContextSdkMethod<Query['stagingxlayer_snapshotRoots'], Querystagingxlayer_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingxlayer_spokeConnectorMode: InContextSdkMethod<Query['stagingxlayer_spokeConnectorMode'], Querystagingxlayer_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingxlayer_spokeConnectorModes: InContextSdkMethod<Query['stagingxlayer_spokeConnectorModes'], Querystagingxlayer_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingxlayer_aggregateRootProposed: InContextSdkMethod<Query['stagingxlayer_aggregateRootProposed'], Querystagingxlayer_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingxlayer_aggregateRootProposeds: InContextSdkMethod<Query['stagingxlayer_aggregateRootProposeds'], Querystagingxlayer_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingxlayer_optimisticRootFinalized: InContextSdkMethod<Query['stagingxlayer_optimisticRootFinalized'], Querystagingxlayer_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingxlayer_optimisticRootFinalizeds: InContextSdkMethod<Query['stagingxlayer_optimisticRootFinalizeds'], Querystagingxlayer_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingxlayer__meta: InContextSdkMethod<Query['stagingxlayer__meta'], Querystagingxlayer__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  stagingxlayer_asset: InContextSdkMethod<Subscription['stagingxlayer_asset'], Subscriptionstagingxlayer_assetArgs, MeshContext>,
  /** null **/
  stagingxlayer_assets: InContextSdkMethod<Subscription['stagingxlayer_assets'], Subscriptionstagingxlayer_assetsArgs, MeshContext>,
  /** null **/
  stagingxlayer_assetStatus: InContextSdkMethod<Subscription['stagingxlayer_assetStatus'], Subscriptionstagingxlayer_assetStatusArgs, MeshContext>,
  /** null **/
  stagingxlayer_assetStatuses: InContextSdkMethod<Subscription['stagingxlayer_assetStatuses'], Subscriptionstagingxlayer_assetStatusesArgs, MeshContext>,
  /** null **/
  stagingxlayer_assetBalance: InContextSdkMethod<Subscription['stagingxlayer_assetBalance'], Subscriptionstagingxlayer_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingxlayer_assetBalances: InContextSdkMethod<Subscription['stagingxlayer_assetBalances'], Subscriptionstagingxlayer_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingxlayer_router: InContextSdkMethod<Subscription['stagingxlayer_router'], Subscriptionstagingxlayer_routerArgs, MeshContext>,
  /** null **/
  stagingxlayer_routers: InContextSdkMethod<Subscription['stagingxlayer_routers'], Subscriptionstagingxlayer_routersArgs, MeshContext>,
  /** null **/
  stagingxlayer_routerDailyTVL: InContextSdkMethod<Subscription['stagingxlayer_routerDailyTVL'], Subscriptionstagingxlayer_routerDailyTVLArgs, MeshContext>,
  /** null **/
  stagingxlayer_routerDailyTVLs: InContextSdkMethod<Subscription['stagingxlayer_routerDailyTVLs'], Subscriptionstagingxlayer_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  stagingxlayer_routerLiquidityEvent: InContextSdkMethod<Subscription['stagingxlayer_routerLiquidityEvent'], Subscriptionstagingxlayer_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingxlayer_routerLiquidityEvents: InContextSdkMethod<Subscription['stagingxlayer_routerLiquidityEvents'], Subscriptionstagingxlayer_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingxlayer_setting: InContextSdkMethod<Subscription['stagingxlayer_setting'], Subscriptionstagingxlayer_settingArgs, MeshContext>,
  /** null **/
  stagingxlayer_settings: InContextSdkMethod<Subscription['stagingxlayer_settings'], Subscriptionstagingxlayer_settingsArgs, MeshContext>,
  /** null **/
  stagingxlayer_relayer: InContextSdkMethod<Subscription['stagingxlayer_relayer'], Subscriptionstagingxlayer_relayerArgs, MeshContext>,
  /** null **/
  stagingxlayer_relayers: InContextSdkMethod<Subscription['stagingxlayer_relayers'], Subscriptionstagingxlayer_relayersArgs, MeshContext>,
  /** null **/
  stagingxlayer_sequencer: InContextSdkMethod<Subscription['stagingxlayer_sequencer'], Subscriptionstagingxlayer_sequencerArgs, MeshContext>,
  /** null **/
  stagingxlayer_sequencers: InContextSdkMethod<Subscription['stagingxlayer_sequencers'], Subscriptionstagingxlayer_sequencersArgs, MeshContext>,
  /** null **/
  stagingxlayer_relayerFee: InContextSdkMethod<Subscription['stagingxlayer_relayerFee'], Subscriptionstagingxlayer_relayerFeeArgs, MeshContext>,
  /** null **/
  stagingxlayer_relayerFees: InContextSdkMethod<Subscription['stagingxlayer_relayerFees'], Subscriptionstagingxlayer_relayerFeesArgs, MeshContext>,
  /** null **/
  stagingxlayer_originTransfer: InContextSdkMethod<Subscription['stagingxlayer_originTransfer'], Subscriptionstagingxlayer_originTransferArgs, MeshContext>,
  /** null **/
  stagingxlayer_originTransfers: InContextSdkMethod<Subscription['stagingxlayer_originTransfers'], Subscriptionstagingxlayer_originTransfersArgs, MeshContext>,
  /** null **/
  stagingxlayer_destinationTransfer: InContextSdkMethod<Subscription['stagingxlayer_destinationTransfer'], Subscriptionstagingxlayer_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingxlayer_destinationTransfers: InContextSdkMethod<Subscription['stagingxlayer_destinationTransfers'], Subscriptionstagingxlayer_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingxlayer_originMessage: InContextSdkMethod<Subscription['stagingxlayer_originMessage'], Subscriptionstagingxlayer_originMessageArgs, MeshContext>,
  /** null **/
  stagingxlayer_originMessages: InContextSdkMethod<Subscription['stagingxlayer_originMessages'], Subscriptionstagingxlayer_originMessagesArgs, MeshContext>,
  /** null **/
  stagingxlayer_aggregateRoot: InContextSdkMethod<Subscription['stagingxlayer_aggregateRoot'], Subscriptionstagingxlayer_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingxlayer_aggregateRoots: InContextSdkMethod<Subscription['stagingxlayer_aggregateRoots'], Subscriptionstagingxlayer_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingxlayer_connectorMeta: InContextSdkMethod<Subscription['stagingxlayer_connectorMeta'], Subscriptionstagingxlayer_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingxlayer_connectorMetas: InContextSdkMethod<Subscription['stagingxlayer_connectorMetas'], Subscriptionstagingxlayer_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingxlayer_rootCount: InContextSdkMethod<Subscription['stagingxlayer_rootCount'], Subscriptionstagingxlayer_rootCountArgs, MeshContext>,
  /** null **/
  stagingxlayer_rootCounts: InContextSdkMethod<Subscription['stagingxlayer_rootCounts'], Subscriptionstagingxlayer_rootCountsArgs, MeshContext>,
  /** null **/
  stagingxlayer_rootMessageSent: InContextSdkMethod<Subscription['stagingxlayer_rootMessageSent'], Subscriptionstagingxlayer_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingxlayer_rootMessageSents: InContextSdkMethod<Subscription['stagingxlayer_rootMessageSents'], Subscriptionstagingxlayer_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingxlayer_relayerFeesIncrease: InContextSdkMethod<Subscription['stagingxlayer_relayerFeesIncrease'], Subscriptionstagingxlayer_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  stagingxlayer_relayerFeesIncreases: InContextSdkMethod<Subscription['stagingxlayer_relayerFeesIncreases'], Subscriptionstagingxlayer_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  stagingxlayer_slippageUpdate: InContextSdkMethod<Subscription['stagingxlayer_slippageUpdate'], Subscriptionstagingxlayer_slippageUpdateArgs, MeshContext>,
  /** null **/
  stagingxlayer_slippageUpdates: InContextSdkMethod<Subscription['stagingxlayer_slippageUpdates'], Subscriptionstagingxlayer_slippageUpdatesArgs, MeshContext>,
  /** null **/
  stagingxlayer_snapshotRoot: InContextSdkMethod<Subscription['stagingxlayer_snapshotRoot'], Subscriptionstagingxlayer_snapshotRootArgs, MeshContext>,
  /** null **/
  stagingxlayer_snapshotRoots: InContextSdkMethod<Subscription['stagingxlayer_snapshotRoots'], Subscriptionstagingxlayer_snapshotRootsArgs, MeshContext>,
  /** null **/
  stagingxlayer_spokeConnectorMode: InContextSdkMethod<Subscription['stagingxlayer_spokeConnectorMode'], Subscriptionstagingxlayer_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  stagingxlayer_spokeConnectorModes: InContextSdkMethod<Subscription['stagingxlayer_spokeConnectorModes'], Subscriptionstagingxlayer_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  stagingxlayer_aggregateRootProposed: InContextSdkMethod<Subscription['stagingxlayer_aggregateRootProposed'], Subscriptionstagingxlayer_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  stagingxlayer_aggregateRootProposeds: InContextSdkMethod<Subscription['stagingxlayer_aggregateRootProposeds'], Subscriptionstagingxlayer_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  stagingxlayer_optimisticRootFinalized: InContextSdkMethod<Subscription['stagingxlayer_optimisticRootFinalized'], Subscriptionstagingxlayer_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingxlayer_optimisticRootFinalizeds: InContextSdkMethod<Subscription['stagingxlayer_optimisticRootFinalizeds'], Subscriptionstagingxlayer_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingxlayer__meta: InContextSdkMethod<Subscription['stagingxlayer__meta'], Subscriptionstagingxlayer__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Staging_Xlayer"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
