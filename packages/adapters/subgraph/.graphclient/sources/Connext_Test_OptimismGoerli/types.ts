// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextTestOptimismGoerliTypes {
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
  testoptimismgoerli_BigDecimal: any;
  BigInt: any;
  testoptimismgoerli_Bytes: any;
};

export type testoptimismgoerli_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['testoptimismgoerli_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type testoptimismgoerli_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_AggregateRoot_filter>>>;
};

export type testoptimismgoerli_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type testoptimismgoerli_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  localAsset?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<testoptimismgoerli_AssetStatus>;
};

export type testoptimismgoerli_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: testoptimismgoerli_Router;
  asset: testoptimismgoerli_Asset;
  feesEarned: Scalars['BigInt'];
};

export type testoptimismgoerli_AssetBalance_filter = {
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
  router_?: InputMaybe<testoptimismgoerli_Router_filter>;
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
  asset_?: InputMaybe<testoptimismgoerli_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_AssetBalance_filter>>>;
};

export type testoptimismgoerli_AssetBalance_orderBy =
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
  | 'asset__canonicalId'
  | 'asset__canonicalDomain'
  | 'asset__adoptedAsset'
  | 'asset__localAsset'
  | 'asset__blockNumber'
  | 'feesEarned';

export type testoptimismgoerli_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type testoptimismgoerli_AssetStatus_filter = {
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
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_AssetStatus_filter>>>;
};

export type testoptimismgoerli_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type testoptimismgoerli_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  key_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  key_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  key_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  key_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  key_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  key_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  decimal?: InputMaybe<Scalars['BigInt']>;
  decimal_not?: InputMaybe<Scalars['BigInt']>;
  decimal_gt?: InputMaybe<Scalars['BigInt']>;
  decimal_lt?: InputMaybe<Scalars['BigInt']>;
  decimal_gte?: InputMaybe<Scalars['BigInt']>;
  decimal_lte?: InputMaybe<Scalars['BigInt']>;
  decimal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  decimal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalId?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  localAsset?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
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
  status_?: InputMaybe<testoptimismgoerli_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_Asset_filter>>>;
};

export type testoptimismgoerli_Asset_orderBy =
  | 'id'
  | 'key'
  | 'decimal'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber'
  | 'status'
  | 'status__id'
  | 'status__status';

export type testoptimismgoerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type testoptimismgoerli_Block_height = {
  hash?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type testoptimismgoerli_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  rootManager?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  mirrorConnector?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
};

export type testoptimismgoerli_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_ConnectorMeta_filter>>>;
};

export type testoptimismgoerli_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type testoptimismgoerli_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<testoptimismgoerli_TransferStatus>;
  routers?: Maybe<Array<testoptimismgoerli_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  delegate?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  asset?: Maybe<testoptimismgoerli_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledCaller?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
};


export type testoptimismgoerli_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_Router_filter>;
};

export type testoptimismgoerli_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<testoptimismgoerli_TransferStatus>;
  status_not?: InputMaybe<testoptimismgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<testoptimismgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<testoptimismgoerli_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<testoptimismgoerli_Router_filter>;
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
  to?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  delegate?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  delegate_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
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
  originSender?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
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
  asset_?: InputMaybe<testoptimismgoerli_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledCaller?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_DestinationTransfer_filter>>>;
};

export type testoptimismgoerli_DestinationTransfer_orderBy =
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
  | 'reconciledCaller'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber'
  | 'reconciledTxOrigin';

/** Defines the order direction, either ascending or descending */
export type testoptimismgoerli_OrderDirection =
  | 'asc'
  | 'desc';

export type testoptimismgoerli_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  root?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<testoptimismgoerli_RootCount>;
};

export type testoptimismgoerli_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  leaf_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  message_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  message_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  message_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  message_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  message_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  message_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  root?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
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
  rootCount_?: InputMaybe<testoptimismgoerli_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_OriginMessage_filter>>>;
};

export type testoptimismgoerli_OriginMessage_orderBy =
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

export type testoptimismgoerli_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<testoptimismgoerli_TransferStatus>;
  messageHash?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  delegate?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  asset?: Maybe<testoptimismgoerli_Asset>;
  transactingAsset?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  message?: Maybe<testoptimismgoerli_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<testoptimismgoerli_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  caller?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
};


export type testoptimismgoerli_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_RelayerFee_filter>;
};

export type testoptimismgoerli_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<testoptimismgoerli_TransferStatus>;
  status_not?: InputMaybe<testoptimismgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<testoptimismgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<testoptimismgoerli_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
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
  to?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  delegate?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  delegate_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
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
  asset_?: InputMaybe<testoptimismgoerli_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
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
  message_?: InputMaybe<testoptimismgoerli_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<testoptimismgoerli_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_OriginTransfer_filter>>>;
};

export type testoptimismgoerli_OriginTransfer_orderBy =
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
  | 'txOrigin';

export type Query = {
  testoptimismgoerli_asset?: Maybe<testoptimismgoerli_Asset>;
  testoptimismgoerli_assets: Array<testoptimismgoerli_Asset>;
  testoptimismgoerli_assetStatus?: Maybe<testoptimismgoerli_AssetStatus>;
  testoptimismgoerli_assetStatuses: Array<testoptimismgoerli_AssetStatus>;
  testoptimismgoerli_assetBalance?: Maybe<testoptimismgoerli_AssetBalance>;
  testoptimismgoerli_assetBalances: Array<testoptimismgoerli_AssetBalance>;
  testoptimismgoerli_router?: Maybe<testoptimismgoerli_Router>;
  testoptimismgoerli_routers: Array<testoptimismgoerli_Router>;
  testoptimismgoerli_routerDailyTVL?: Maybe<testoptimismgoerli_RouterDailyTVL>;
  testoptimismgoerli_routerDailyTVLs: Array<testoptimismgoerli_RouterDailyTVL>;
  testoptimismgoerli_setting?: Maybe<testoptimismgoerli_Setting>;
  testoptimismgoerli_settings: Array<testoptimismgoerli_Setting>;
  testoptimismgoerli_relayer?: Maybe<testoptimismgoerli_Relayer>;
  testoptimismgoerli_relayers: Array<testoptimismgoerli_Relayer>;
  testoptimismgoerli_sequencer?: Maybe<testoptimismgoerli_Sequencer>;
  testoptimismgoerli_sequencers: Array<testoptimismgoerli_Sequencer>;
  testoptimismgoerli_relayerFee?: Maybe<testoptimismgoerli_RelayerFee>;
  testoptimismgoerli_relayerFees: Array<testoptimismgoerli_RelayerFee>;
  testoptimismgoerli_originTransfer?: Maybe<testoptimismgoerli_OriginTransfer>;
  testoptimismgoerli_originTransfers: Array<testoptimismgoerli_OriginTransfer>;
  testoptimismgoerli_destinationTransfer?: Maybe<testoptimismgoerli_DestinationTransfer>;
  testoptimismgoerli_destinationTransfers: Array<testoptimismgoerli_DestinationTransfer>;
  testoptimismgoerli_originMessage?: Maybe<testoptimismgoerli_OriginMessage>;
  testoptimismgoerli_originMessages: Array<testoptimismgoerli_OriginMessage>;
  testoptimismgoerli_aggregateRoot?: Maybe<testoptimismgoerli_AggregateRoot>;
  testoptimismgoerli_aggregateRoots: Array<testoptimismgoerli_AggregateRoot>;
  testoptimismgoerli_connectorMeta?: Maybe<testoptimismgoerli_ConnectorMeta>;
  testoptimismgoerli_connectorMetas: Array<testoptimismgoerli_ConnectorMeta>;
  testoptimismgoerli_rootCount?: Maybe<testoptimismgoerli_RootCount>;
  testoptimismgoerli_rootCounts: Array<testoptimismgoerli_RootCount>;
  testoptimismgoerli_rootMessageSent?: Maybe<testoptimismgoerli_RootMessageSent>;
  testoptimismgoerli_rootMessageSents: Array<testoptimismgoerli_RootMessageSent>;
  testoptimismgoerli_relayerFeesIncrease?: Maybe<testoptimismgoerli_RelayerFeesIncrease>;
  testoptimismgoerli_relayerFeesIncreases: Array<testoptimismgoerli_RelayerFeesIncrease>;
  testoptimismgoerli_slippageUpdate?: Maybe<testoptimismgoerli_SlippageUpdate>;
  testoptimismgoerli_slippageUpdates: Array<testoptimismgoerli_SlippageUpdate>;
  /** Access to subgraph metadata */
  testoptimismgoerli__meta?: Maybe<testoptimismgoerli__Meta_>;
};


export type Querytestoptimismgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_Asset_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_AssetStatus_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_AssetBalance_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_Router_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_RouterDailyTVL_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_Setting_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_Relayer_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_Sequencer_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_Sequencer_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_RelayerFee_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_OriginTransfer_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_OriginMessage_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_AggregateRoot_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_ConnectorMeta_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_RootCount_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_RootCount_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_RootMessageSent_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_RelayerFeesIncrease_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_SlippageUpdate_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli__metaArgs = {
  block?: InputMaybe<testoptimismgoerli_Block_height>;
};

export type testoptimismgoerli_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
};

export type testoptimismgoerli_RelayerFee = {
  id: Scalars['ID'];
  transfer: testoptimismgoerli_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['testoptimismgoerli_Bytes'];
};

export type testoptimismgoerli_RelayerFee_filter = {
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
  transfer_?: InputMaybe<testoptimismgoerli_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  asset_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  asset_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  asset_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  asset_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  asset_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_RelayerFee_filter>>>;
};

export type testoptimismgoerli_RelayerFee_orderBy =
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
  | 'fee'
  | 'asset';

export type testoptimismgoerli_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: testoptimismgoerli_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  caller: Scalars['testoptimismgoerli_Bytes'];
  transactionHash: Scalars['testoptimismgoerli_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type testoptimismgoerli_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<testoptimismgoerli_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  asset_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  asset_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  asset_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  asset_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  asset_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_RelayerFeesIncrease_filter>>>;
};

export type testoptimismgoerli_RelayerFeesIncrease_orderBy =
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
  | 'increase'
  | 'asset'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type testoptimismgoerli_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  relayer_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_Relayer_filter>>>;
};

export type testoptimismgoerli_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type testoptimismgoerli_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type testoptimismgoerli_RootCount_filter = {
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
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_RootCount_filter>>>;
};

export type testoptimismgoerli_RootCount_orderBy =
  | 'id'
  | 'count';

export type testoptimismgoerli_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type testoptimismgoerli_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_RootMessageSent_filter>>>;
};

export type testoptimismgoerli_RootMessageSent_orderBy =
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

export type testoptimismgoerli_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  recipient?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  proposedOwner?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<testoptimismgoerli_AssetBalance>;
};


export type testoptimismgoerli_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_AssetBalance_filter>;
};

export type testoptimismgoerli_RouterDailyTVL = {
  id: Scalars['ID'];
  router: testoptimismgoerli_Router;
  asset: testoptimismgoerli_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type testoptimismgoerli_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<testoptimismgoerli_Router_filter>;
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
  asset_?: InputMaybe<testoptimismgoerli_Asset_filter>;
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
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_RouterDailyTVL_filter>>>;
};

export type testoptimismgoerli_RouterDailyTVL_orderBy =
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
  | 'asset__canonicalId'
  | 'asset__canonicalDomain'
  | 'asset__adoptedAsset'
  | 'asset__localAsset'
  | 'asset__blockNumber'
  | 'timestamp'
  | 'balance';

export type testoptimismgoerli_Router_filter = {
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
  owner?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  owner_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  owner_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  owner_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  owner_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  owner_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recipient?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recipient_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<testoptimismgoerli_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_Router_filter>>>;
};

export type testoptimismgoerli_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type testoptimismgoerli_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
};

export type testoptimismgoerli_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_Sequencer_filter>>>;
};

export type testoptimismgoerli_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type testoptimismgoerli_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['testoptimismgoerli_Bytes'];
};

export type testoptimismgoerli_Setting_filter = {
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
  caller?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_Setting_filter>>>;
};

export type testoptimismgoerli_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type testoptimismgoerli_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: testoptimismgoerli_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['testoptimismgoerli_Bytes'];
  transactionHash: Scalars['testoptimismgoerli_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type testoptimismgoerli_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<testoptimismgoerli_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_SlippageUpdate_filter>>>;
};

export type testoptimismgoerli_SlippageUpdate_orderBy =
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
  | 'transfer__reconciledCaller'
  | 'transfer__reconciledTransactionHash'
  | 'transfer__reconciledTimestamp'
  | 'transfer__reconciledGasPrice'
  | 'transfer__reconciledGasLimit'
  | 'transfer__reconciledBlockNumber'
  | 'transfer__reconciledTxOrigin'
  | 'slippage'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type Subscription = {
  testoptimismgoerli_asset?: Maybe<testoptimismgoerli_Asset>;
  testoptimismgoerli_assets: Array<testoptimismgoerli_Asset>;
  testoptimismgoerli_assetStatus?: Maybe<testoptimismgoerli_AssetStatus>;
  testoptimismgoerli_assetStatuses: Array<testoptimismgoerli_AssetStatus>;
  testoptimismgoerli_assetBalance?: Maybe<testoptimismgoerli_AssetBalance>;
  testoptimismgoerli_assetBalances: Array<testoptimismgoerli_AssetBalance>;
  testoptimismgoerli_router?: Maybe<testoptimismgoerli_Router>;
  testoptimismgoerli_routers: Array<testoptimismgoerli_Router>;
  testoptimismgoerli_routerDailyTVL?: Maybe<testoptimismgoerli_RouterDailyTVL>;
  testoptimismgoerli_routerDailyTVLs: Array<testoptimismgoerli_RouterDailyTVL>;
  testoptimismgoerli_setting?: Maybe<testoptimismgoerli_Setting>;
  testoptimismgoerli_settings: Array<testoptimismgoerli_Setting>;
  testoptimismgoerli_relayer?: Maybe<testoptimismgoerli_Relayer>;
  testoptimismgoerli_relayers: Array<testoptimismgoerli_Relayer>;
  testoptimismgoerli_sequencer?: Maybe<testoptimismgoerli_Sequencer>;
  testoptimismgoerli_sequencers: Array<testoptimismgoerli_Sequencer>;
  testoptimismgoerli_relayerFee?: Maybe<testoptimismgoerli_RelayerFee>;
  testoptimismgoerli_relayerFees: Array<testoptimismgoerli_RelayerFee>;
  testoptimismgoerli_originTransfer?: Maybe<testoptimismgoerli_OriginTransfer>;
  testoptimismgoerli_originTransfers: Array<testoptimismgoerli_OriginTransfer>;
  testoptimismgoerli_destinationTransfer?: Maybe<testoptimismgoerli_DestinationTransfer>;
  testoptimismgoerli_destinationTransfers: Array<testoptimismgoerli_DestinationTransfer>;
  testoptimismgoerli_originMessage?: Maybe<testoptimismgoerli_OriginMessage>;
  testoptimismgoerli_originMessages: Array<testoptimismgoerli_OriginMessage>;
  testoptimismgoerli_aggregateRoot?: Maybe<testoptimismgoerli_AggregateRoot>;
  testoptimismgoerli_aggregateRoots: Array<testoptimismgoerli_AggregateRoot>;
  testoptimismgoerli_connectorMeta?: Maybe<testoptimismgoerli_ConnectorMeta>;
  testoptimismgoerli_connectorMetas: Array<testoptimismgoerli_ConnectorMeta>;
  testoptimismgoerli_rootCount?: Maybe<testoptimismgoerli_RootCount>;
  testoptimismgoerli_rootCounts: Array<testoptimismgoerli_RootCount>;
  testoptimismgoerli_rootMessageSent?: Maybe<testoptimismgoerli_RootMessageSent>;
  testoptimismgoerli_rootMessageSents: Array<testoptimismgoerli_RootMessageSent>;
  testoptimismgoerli_relayerFeesIncrease?: Maybe<testoptimismgoerli_RelayerFeesIncrease>;
  testoptimismgoerli_relayerFeesIncreases: Array<testoptimismgoerli_RelayerFeesIncrease>;
  testoptimismgoerli_slippageUpdate?: Maybe<testoptimismgoerli_SlippageUpdate>;
  testoptimismgoerli_slippageUpdates: Array<testoptimismgoerli_SlippageUpdate>;
  /** Access to subgraph metadata */
  testoptimismgoerli__meta?: Maybe<testoptimismgoerli__Meta_>;
};


export type Subscriptiontestoptimismgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_Asset_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_AssetStatus_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_AssetBalance_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_Router_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_RouterDailyTVL_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_Setting_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_Relayer_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_Sequencer_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_Sequencer_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_RelayerFee_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_OriginTransfer_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_OriginMessage_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_AggregateRoot_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_ConnectorMeta_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_RootCount_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_RootCount_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_RootMessageSent_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_RelayerFeesIncrease_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_SlippageUpdate_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli__metaArgs = {
  block?: InputMaybe<testoptimismgoerli_Block_height>;
};

export type testoptimismgoerli_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type testoptimismgoerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type testoptimismgoerli__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: testoptimismgoerli__Block_;
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
  testoptimismgoerli_asset: InContextSdkMethod<Query['testoptimismgoerli_asset'], Querytestoptimismgoerli_assetArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_assets: InContextSdkMethod<Query['testoptimismgoerli_assets'], Querytestoptimismgoerli_assetsArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_assetStatus: InContextSdkMethod<Query['testoptimismgoerli_assetStatus'], Querytestoptimismgoerli_assetStatusArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_assetStatuses: InContextSdkMethod<Query['testoptimismgoerli_assetStatuses'], Querytestoptimismgoerli_assetStatusesArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_assetBalance: InContextSdkMethod<Query['testoptimismgoerli_assetBalance'], Querytestoptimismgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_assetBalances: InContextSdkMethod<Query['testoptimismgoerli_assetBalances'], Querytestoptimismgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_router: InContextSdkMethod<Query['testoptimismgoerli_router'], Querytestoptimismgoerli_routerArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_routers: InContextSdkMethod<Query['testoptimismgoerli_routers'], Querytestoptimismgoerli_routersArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_routerDailyTVL: InContextSdkMethod<Query['testoptimismgoerli_routerDailyTVL'], Querytestoptimismgoerli_routerDailyTVLArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_routerDailyTVLs: InContextSdkMethod<Query['testoptimismgoerli_routerDailyTVLs'], Querytestoptimismgoerli_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_setting: InContextSdkMethod<Query['testoptimismgoerli_setting'], Querytestoptimismgoerli_settingArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_settings: InContextSdkMethod<Query['testoptimismgoerli_settings'], Querytestoptimismgoerli_settingsArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_relayer: InContextSdkMethod<Query['testoptimismgoerli_relayer'], Querytestoptimismgoerli_relayerArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_relayers: InContextSdkMethod<Query['testoptimismgoerli_relayers'], Querytestoptimismgoerli_relayersArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_sequencer: InContextSdkMethod<Query['testoptimismgoerli_sequencer'], Querytestoptimismgoerli_sequencerArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_sequencers: InContextSdkMethod<Query['testoptimismgoerli_sequencers'], Querytestoptimismgoerli_sequencersArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_relayerFee: InContextSdkMethod<Query['testoptimismgoerli_relayerFee'], Querytestoptimismgoerli_relayerFeeArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_relayerFees: InContextSdkMethod<Query['testoptimismgoerli_relayerFees'], Querytestoptimismgoerli_relayerFeesArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_originTransfer: InContextSdkMethod<Query['testoptimismgoerli_originTransfer'], Querytestoptimismgoerli_originTransferArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_originTransfers: InContextSdkMethod<Query['testoptimismgoerli_originTransfers'], Querytestoptimismgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_destinationTransfer: InContextSdkMethod<Query['testoptimismgoerli_destinationTransfer'], Querytestoptimismgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_destinationTransfers: InContextSdkMethod<Query['testoptimismgoerli_destinationTransfers'], Querytestoptimismgoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_originMessage: InContextSdkMethod<Query['testoptimismgoerli_originMessage'], Querytestoptimismgoerli_originMessageArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_originMessages: InContextSdkMethod<Query['testoptimismgoerli_originMessages'], Querytestoptimismgoerli_originMessagesArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_aggregateRoot: InContextSdkMethod<Query['testoptimismgoerli_aggregateRoot'], Querytestoptimismgoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_aggregateRoots: InContextSdkMethod<Query['testoptimismgoerli_aggregateRoots'], Querytestoptimismgoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_connectorMeta: InContextSdkMethod<Query['testoptimismgoerli_connectorMeta'], Querytestoptimismgoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_connectorMetas: InContextSdkMethod<Query['testoptimismgoerli_connectorMetas'], Querytestoptimismgoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_rootCount: InContextSdkMethod<Query['testoptimismgoerli_rootCount'], Querytestoptimismgoerli_rootCountArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_rootCounts: InContextSdkMethod<Query['testoptimismgoerli_rootCounts'], Querytestoptimismgoerli_rootCountsArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_rootMessageSent: InContextSdkMethod<Query['testoptimismgoerli_rootMessageSent'], Querytestoptimismgoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_rootMessageSents: InContextSdkMethod<Query['testoptimismgoerli_rootMessageSents'], Querytestoptimismgoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_relayerFeesIncrease: InContextSdkMethod<Query['testoptimismgoerli_relayerFeesIncrease'], Querytestoptimismgoerli_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_relayerFeesIncreases: InContextSdkMethod<Query['testoptimismgoerli_relayerFeesIncreases'], Querytestoptimismgoerli_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_slippageUpdate: InContextSdkMethod<Query['testoptimismgoerli_slippageUpdate'], Querytestoptimismgoerli_slippageUpdateArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_slippageUpdates: InContextSdkMethod<Query['testoptimismgoerli_slippageUpdates'], Querytestoptimismgoerli_slippageUpdatesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  testoptimismgoerli__meta: InContextSdkMethod<Query['testoptimismgoerli__meta'], Querytestoptimismgoerli__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  testoptimismgoerli_asset: InContextSdkMethod<Subscription['testoptimismgoerli_asset'], Subscriptiontestoptimismgoerli_assetArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_assets: InContextSdkMethod<Subscription['testoptimismgoerli_assets'], Subscriptiontestoptimismgoerli_assetsArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_assetStatus: InContextSdkMethod<Subscription['testoptimismgoerli_assetStatus'], Subscriptiontestoptimismgoerli_assetStatusArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_assetStatuses: InContextSdkMethod<Subscription['testoptimismgoerli_assetStatuses'], Subscriptiontestoptimismgoerli_assetStatusesArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_assetBalance: InContextSdkMethod<Subscription['testoptimismgoerli_assetBalance'], Subscriptiontestoptimismgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_assetBalances: InContextSdkMethod<Subscription['testoptimismgoerli_assetBalances'], Subscriptiontestoptimismgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_router: InContextSdkMethod<Subscription['testoptimismgoerli_router'], Subscriptiontestoptimismgoerli_routerArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_routers: InContextSdkMethod<Subscription['testoptimismgoerli_routers'], Subscriptiontestoptimismgoerli_routersArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_routerDailyTVL: InContextSdkMethod<Subscription['testoptimismgoerli_routerDailyTVL'], Subscriptiontestoptimismgoerli_routerDailyTVLArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_routerDailyTVLs: InContextSdkMethod<Subscription['testoptimismgoerli_routerDailyTVLs'], Subscriptiontestoptimismgoerli_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_setting: InContextSdkMethod<Subscription['testoptimismgoerli_setting'], Subscriptiontestoptimismgoerli_settingArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_settings: InContextSdkMethod<Subscription['testoptimismgoerli_settings'], Subscriptiontestoptimismgoerli_settingsArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_relayer: InContextSdkMethod<Subscription['testoptimismgoerli_relayer'], Subscriptiontestoptimismgoerli_relayerArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_relayers: InContextSdkMethod<Subscription['testoptimismgoerli_relayers'], Subscriptiontestoptimismgoerli_relayersArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_sequencer: InContextSdkMethod<Subscription['testoptimismgoerli_sequencer'], Subscriptiontestoptimismgoerli_sequencerArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_sequencers: InContextSdkMethod<Subscription['testoptimismgoerli_sequencers'], Subscriptiontestoptimismgoerli_sequencersArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_relayerFee: InContextSdkMethod<Subscription['testoptimismgoerli_relayerFee'], Subscriptiontestoptimismgoerli_relayerFeeArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_relayerFees: InContextSdkMethod<Subscription['testoptimismgoerli_relayerFees'], Subscriptiontestoptimismgoerli_relayerFeesArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_originTransfer: InContextSdkMethod<Subscription['testoptimismgoerli_originTransfer'], Subscriptiontestoptimismgoerli_originTransferArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_originTransfers: InContextSdkMethod<Subscription['testoptimismgoerli_originTransfers'], Subscriptiontestoptimismgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_destinationTransfer: InContextSdkMethod<Subscription['testoptimismgoerli_destinationTransfer'], Subscriptiontestoptimismgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_destinationTransfers: InContextSdkMethod<Subscription['testoptimismgoerli_destinationTransfers'], Subscriptiontestoptimismgoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_originMessage: InContextSdkMethod<Subscription['testoptimismgoerli_originMessage'], Subscriptiontestoptimismgoerli_originMessageArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_originMessages: InContextSdkMethod<Subscription['testoptimismgoerli_originMessages'], Subscriptiontestoptimismgoerli_originMessagesArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_aggregateRoot: InContextSdkMethod<Subscription['testoptimismgoerli_aggregateRoot'], Subscriptiontestoptimismgoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_aggregateRoots: InContextSdkMethod<Subscription['testoptimismgoerli_aggregateRoots'], Subscriptiontestoptimismgoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_connectorMeta: InContextSdkMethod<Subscription['testoptimismgoerli_connectorMeta'], Subscriptiontestoptimismgoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_connectorMetas: InContextSdkMethod<Subscription['testoptimismgoerli_connectorMetas'], Subscriptiontestoptimismgoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_rootCount: InContextSdkMethod<Subscription['testoptimismgoerli_rootCount'], Subscriptiontestoptimismgoerli_rootCountArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_rootCounts: InContextSdkMethod<Subscription['testoptimismgoerli_rootCounts'], Subscriptiontestoptimismgoerli_rootCountsArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_rootMessageSent: InContextSdkMethod<Subscription['testoptimismgoerli_rootMessageSent'], Subscriptiontestoptimismgoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_rootMessageSents: InContextSdkMethod<Subscription['testoptimismgoerli_rootMessageSents'], Subscriptiontestoptimismgoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_relayerFeesIncrease: InContextSdkMethod<Subscription['testoptimismgoerli_relayerFeesIncrease'], Subscriptiontestoptimismgoerli_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_relayerFeesIncreases: InContextSdkMethod<Subscription['testoptimismgoerli_relayerFeesIncreases'], Subscriptiontestoptimismgoerli_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_slippageUpdate: InContextSdkMethod<Subscription['testoptimismgoerli_slippageUpdate'], Subscriptiontestoptimismgoerli_slippageUpdateArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_slippageUpdates: InContextSdkMethod<Subscription['testoptimismgoerli_slippageUpdates'], Subscriptiontestoptimismgoerli_slippageUpdatesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  testoptimismgoerli__meta: InContextSdkMethod<Subscription['testoptimismgoerli__meta'], Subscriptiontestoptimismgoerli__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Test_OptimismGoerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
