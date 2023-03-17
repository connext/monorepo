// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextTestArbitrumGoerliTypes {
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
  testarbitrumgoerli_BigDecimal: any;
  BigInt: any;
  testarbitrumgoerli_Bytes: any;
};

export type testarbitrumgoerli_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['testarbitrumgoerli_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type testarbitrumgoerli_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testarbitrumgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_AggregateRoot_filter>>>;
};

export type testarbitrumgoerli_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type testarbitrumgoerli_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  localAsset?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<testarbitrumgoerli_AssetStatus>;
};

export type testarbitrumgoerli_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: testarbitrumgoerli_Router;
  asset: testarbitrumgoerli_Asset;
  feesEarned: Scalars['BigInt'];
};

export type testarbitrumgoerli_AssetBalance_filter = {
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
  router_?: InputMaybe<testarbitrumgoerli_Router_filter>;
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
  asset_?: InputMaybe<testarbitrumgoerli_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testarbitrumgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_AssetBalance_filter>>>;
};

export type testarbitrumgoerli_AssetBalance_orderBy =
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

export type testarbitrumgoerli_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type testarbitrumgoerli_AssetStatus_filter = {
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
  _change_block?: InputMaybe<testarbitrumgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_AssetStatus_filter>>>;
};

export type testarbitrumgoerli_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type testarbitrumgoerli_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  key_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  key_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  key_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  key_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  key_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  key_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  decimal?: InputMaybe<Scalars['BigInt']>;
  decimal_not?: InputMaybe<Scalars['BigInt']>;
  decimal_gt?: InputMaybe<Scalars['BigInt']>;
  decimal_lt?: InputMaybe<Scalars['BigInt']>;
  decimal_gte?: InputMaybe<Scalars['BigInt']>;
  decimal_lte?: InputMaybe<Scalars['BigInt']>;
  decimal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  decimal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalId?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  localAsset?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
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
  status_?: InputMaybe<testarbitrumgoerli_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testarbitrumgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_Asset_filter>>>;
};

export type testarbitrumgoerli_Asset_orderBy =
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

export type testarbitrumgoerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type testarbitrumgoerli_Block_height = {
  hash?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type testarbitrumgoerli_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  rootManager?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  mirrorConnector?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
};

export type testarbitrumgoerli_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testarbitrumgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_ConnectorMeta_filter>>>;
};

export type testarbitrumgoerli_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type testarbitrumgoerli_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<testarbitrumgoerli_TransferStatus>;
  routers?: Maybe<Array<testarbitrumgoerli_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  delegate?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  asset?: Maybe<testarbitrumgoerli_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledCaller?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
};


export type testarbitrumgoerli_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_Router_filter>;
};

export type testarbitrumgoerli_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<testarbitrumgoerli_TransferStatus>;
  status_not?: InputMaybe<testarbitrumgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<testarbitrumgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<testarbitrumgoerli_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<testarbitrumgoerli_Router_filter>;
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
  to?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  to_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  to_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  to_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  to_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  delegate?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  delegate_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  callData_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  callData_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  callData_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  callData_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
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
  originSender?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
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
  asset_?: InputMaybe<testarbitrumgoerli_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledCaller?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testarbitrumgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_DestinationTransfer_filter>>>;
};

export type testarbitrumgoerli_DestinationTransfer_orderBy =
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
export type testarbitrumgoerli_OrderDirection =
  | 'asc'
  | 'desc';

export type testarbitrumgoerli_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  root?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<testarbitrumgoerli_RootCount>;
};

export type testarbitrumgoerli_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  leaf_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  message_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  message_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  message_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  message_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  message_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  message_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  root?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
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
  rootCount_?: InputMaybe<testarbitrumgoerli_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testarbitrumgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_OriginMessage_filter>>>;
};

export type testarbitrumgoerli_OriginMessage_orderBy =
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

export type testarbitrumgoerli_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<testarbitrumgoerli_TransferStatus>;
  messageHash?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  delegate?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  asset?: Maybe<testarbitrumgoerli_Asset>;
  transactingAsset?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  message?: Maybe<testarbitrumgoerli_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<testarbitrumgoerli_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
};


export type testarbitrumgoerli_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_RelayerFee_filter>;
};

export type testarbitrumgoerli_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<testarbitrumgoerli_TransferStatus>;
  status_not?: InputMaybe<testarbitrumgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<testarbitrumgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<testarbitrumgoerli_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
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
  to?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  to_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  to_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  to_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  to_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  delegate?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  delegate_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  callData_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  callData_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  callData_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  callData_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
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
  asset_?: InputMaybe<testarbitrumgoerli_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
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
  message_?: InputMaybe<testarbitrumgoerli_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<testarbitrumgoerli_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testarbitrumgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_OriginTransfer_filter>>>;
};

export type testarbitrumgoerli_OriginTransfer_orderBy =
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
  testarbitrumgoerli_asset?: Maybe<testarbitrumgoerli_Asset>;
  testarbitrumgoerli_assets: Array<testarbitrumgoerli_Asset>;
  testarbitrumgoerli_assetStatus?: Maybe<testarbitrumgoerli_AssetStatus>;
  testarbitrumgoerli_assetStatuses: Array<testarbitrumgoerli_AssetStatus>;
  testarbitrumgoerli_assetBalance?: Maybe<testarbitrumgoerli_AssetBalance>;
  testarbitrumgoerli_assetBalances: Array<testarbitrumgoerli_AssetBalance>;
  testarbitrumgoerli_router?: Maybe<testarbitrumgoerli_Router>;
  testarbitrumgoerli_routers: Array<testarbitrumgoerli_Router>;
  testarbitrumgoerli_routerDailyTVL?: Maybe<testarbitrumgoerli_RouterDailyTVL>;
  testarbitrumgoerli_routerDailyTVLs: Array<testarbitrumgoerli_RouterDailyTVL>;
  testarbitrumgoerli_setting?: Maybe<testarbitrumgoerli_Setting>;
  testarbitrumgoerli_settings: Array<testarbitrumgoerli_Setting>;
  testarbitrumgoerli_relayer?: Maybe<testarbitrumgoerli_Relayer>;
  testarbitrumgoerli_relayers: Array<testarbitrumgoerli_Relayer>;
  testarbitrumgoerli_sequencer?: Maybe<testarbitrumgoerli_Sequencer>;
  testarbitrumgoerli_sequencers: Array<testarbitrumgoerli_Sequencer>;
  testarbitrumgoerli_relayerFee?: Maybe<testarbitrumgoerli_RelayerFee>;
  testarbitrumgoerli_relayerFees: Array<testarbitrumgoerli_RelayerFee>;
  testarbitrumgoerli_originTransfer?: Maybe<testarbitrumgoerli_OriginTransfer>;
  testarbitrumgoerli_originTransfers: Array<testarbitrumgoerli_OriginTransfer>;
  testarbitrumgoerli_destinationTransfer?: Maybe<testarbitrumgoerli_DestinationTransfer>;
  testarbitrumgoerli_destinationTransfers: Array<testarbitrumgoerli_DestinationTransfer>;
  testarbitrumgoerli_originMessage?: Maybe<testarbitrumgoerli_OriginMessage>;
  testarbitrumgoerli_originMessages: Array<testarbitrumgoerli_OriginMessage>;
  testarbitrumgoerli_aggregateRoot?: Maybe<testarbitrumgoerli_AggregateRoot>;
  testarbitrumgoerli_aggregateRoots: Array<testarbitrumgoerli_AggregateRoot>;
  testarbitrumgoerli_connectorMeta?: Maybe<testarbitrumgoerli_ConnectorMeta>;
  testarbitrumgoerli_connectorMetas: Array<testarbitrumgoerli_ConnectorMeta>;
  testarbitrumgoerli_rootCount?: Maybe<testarbitrumgoerli_RootCount>;
  testarbitrumgoerli_rootCounts: Array<testarbitrumgoerli_RootCount>;
  testarbitrumgoerli_rootMessageSent?: Maybe<testarbitrumgoerli_RootMessageSent>;
  testarbitrumgoerli_rootMessageSents: Array<testarbitrumgoerli_RootMessageSent>;
  testarbitrumgoerli_relayerFeesIncrease?: Maybe<testarbitrumgoerli_RelayerFeesIncrease>;
  testarbitrumgoerli_relayerFeesIncreases: Array<testarbitrumgoerli_RelayerFeesIncrease>;
  testarbitrumgoerli_slippageUpdate?: Maybe<testarbitrumgoerli_SlippageUpdate>;
  testarbitrumgoerli_slippageUpdates: Array<testarbitrumgoerli_SlippageUpdate>;
  /** Access to subgraph metadata */
  testarbitrumgoerli__meta?: Maybe<testarbitrumgoerli__Meta_>;
};


export type Querytestarbitrumgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_Asset_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_AssetStatus_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_AssetBalance_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_Router_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_RouterDailyTVL_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_Setting_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_Relayer_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_Sequencer_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_Sequencer_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_RelayerFee_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_OriginTransfer_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_OriginMessage_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_AggregateRoot_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_ConnectorMeta_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_RootCount_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_RootCount_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_RootMessageSent_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_RelayerFeesIncrease_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_SlippageUpdate_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestarbitrumgoerli__metaArgs = {
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
};

export type testarbitrumgoerli_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
};

export type testarbitrumgoerli_RelayerFee = {
  id: Scalars['ID'];
  transfer: testarbitrumgoerli_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['testarbitrumgoerli_Bytes'];
};

export type testarbitrumgoerli_RelayerFee_filter = {
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
  transfer_?: InputMaybe<testarbitrumgoerli_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  asset_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  asset_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  asset_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  asset_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  asset_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testarbitrumgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_RelayerFee_filter>>>;
};

export type testarbitrumgoerli_RelayerFee_orderBy =
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

export type testarbitrumgoerli_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: testarbitrumgoerli_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller: Scalars['testarbitrumgoerli_Bytes'];
  transactionHash: Scalars['testarbitrumgoerli_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type testarbitrumgoerli_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<testarbitrumgoerli_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  asset_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  asset_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  asset_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  asset_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  asset_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
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
  _change_block?: InputMaybe<testarbitrumgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_RelayerFeesIncrease_filter>>>;
};

export type testarbitrumgoerli_RelayerFeesIncrease_orderBy =
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

export type testarbitrumgoerli_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  relayer_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testarbitrumgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_Relayer_filter>>>;
};

export type testarbitrumgoerli_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type testarbitrumgoerli_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type testarbitrumgoerli_RootCount_filter = {
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
  _change_block?: InputMaybe<testarbitrumgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_RootCount_filter>>>;
};

export type testarbitrumgoerli_RootCount_orderBy =
  | 'id'
  | 'count';

export type testarbitrumgoerli_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type testarbitrumgoerli_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
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
  _change_block?: InputMaybe<testarbitrumgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_RootMessageSent_filter>>>;
};

export type testarbitrumgoerli_RootMessageSent_orderBy =
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

export type testarbitrumgoerli_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  recipient?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  proposedOwner?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<testarbitrumgoerli_AssetBalance>;
};


export type testarbitrumgoerli_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_AssetBalance_filter>;
};

export type testarbitrumgoerli_RouterDailyTVL = {
  id: Scalars['ID'];
  router: testarbitrumgoerli_Router;
  asset: testarbitrumgoerli_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type testarbitrumgoerli_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<testarbitrumgoerli_Router_filter>;
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
  asset_?: InputMaybe<testarbitrumgoerli_Asset_filter>;
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
  _change_block?: InputMaybe<testarbitrumgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_RouterDailyTVL_filter>>>;
};

export type testarbitrumgoerli_RouterDailyTVL_orderBy =
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

export type testarbitrumgoerli_Router_filter = {
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
  owner?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  owner_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  owner_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  owner_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  owner_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  owner_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  recipient?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  recipient_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<testarbitrumgoerli_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testarbitrumgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_Router_filter>>>;
};

export type testarbitrumgoerli_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type testarbitrumgoerli_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
};

export type testarbitrumgoerli_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testarbitrumgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_Sequencer_filter>>>;
};

export type testarbitrumgoerli_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type testarbitrumgoerli_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['testarbitrumgoerli_Bytes'];
};

export type testarbitrumgoerli_Setting_filter = {
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
  caller?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testarbitrumgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_Setting_filter>>>;
};

export type testarbitrumgoerli_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type testarbitrumgoerli_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: testarbitrumgoerli_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['testarbitrumgoerli_Bytes'];
  transactionHash: Scalars['testarbitrumgoerli_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type testarbitrumgoerli_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<testarbitrumgoerli_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testarbitrumgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testarbitrumgoerli_Bytes']>;
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
  _change_block?: InputMaybe<testarbitrumgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testarbitrumgoerli_SlippageUpdate_filter>>>;
};

export type testarbitrumgoerli_SlippageUpdate_orderBy =
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
  testarbitrumgoerli_asset?: Maybe<testarbitrumgoerli_Asset>;
  testarbitrumgoerli_assets: Array<testarbitrumgoerli_Asset>;
  testarbitrumgoerli_assetStatus?: Maybe<testarbitrumgoerli_AssetStatus>;
  testarbitrumgoerli_assetStatuses: Array<testarbitrumgoerli_AssetStatus>;
  testarbitrumgoerli_assetBalance?: Maybe<testarbitrumgoerli_AssetBalance>;
  testarbitrumgoerli_assetBalances: Array<testarbitrumgoerli_AssetBalance>;
  testarbitrumgoerli_router?: Maybe<testarbitrumgoerli_Router>;
  testarbitrumgoerli_routers: Array<testarbitrumgoerli_Router>;
  testarbitrumgoerli_routerDailyTVL?: Maybe<testarbitrumgoerli_RouterDailyTVL>;
  testarbitrumgoerli_routerDailyTVLs: Array<testarbitrumgoerli_RouterDailyTVL>;
  testarbitrumgoerli_setting?: Maybe<testarbitrumgoerli_Setting>;
  testarbitrumgoerli_settings: Array<testarbitrumgoerli_Setting>;
  testarbitrumgoerli_relayer?: Maybe<testarbitrumgoerli_Relayer>;
  testarbitrumgoerli_relayers: Array<testarbitrumgoerli_Relayer>;
  testarbitrumgoerli_sequencer?: Maybe<testarbitrumgoerli_Sequencer>;
  testarbitrumgoerli_sequencers: Array<testarbitrumgoerli_Sequencer>;
  testarbitrumgoerli_relayerFee?: Maybe<testarbitrumgoerli_RelayerFee>;
  testarbitrumgoerli_relayerFees: Array<testarbitrumgoerli_RelayerFee>;
  testarbitrumgoerli_originTransfer?: Maybe<testarbitrumgoerli_OriginTransfer>;
  testarbitrumgoerli_originTransfers: Array<testarbitrumgoerli_OriginTransfer>;
  testarbitrumgoerli_destinationTransfer?: Maybe<testarbitrumgoerli_DestinationTransfer>;
  testarbitrumgoerli_destinationTransfers: Array<testarbitrumgoerli_DestinationTransfer>;
  testarbitrumgoerli_originMessage?: Maybe<testarbitrumgoerli_OriginMessage>;
  testarbitrumgoerli_originMessages: Array<testarbitrumgoerli_OriginMessage>;
  testarbitrumgoerli_aggregateRoot?: Maybe<testarbitrumgoerli_AggregateRoot>;
  testarbitrumgoerli_aggregateRoots: Array<testarbitrumgoerli_AggregateRoot>;
  testarbitrumgoerli_connectorMeta?: Maybe<testarbitrumgoerli_ConnectorMeta>;
  testarbitrumgoerli_connectorMetas: Array<testarbitrumgoerli_ConnectorMeta>;
  testarbitrumgoerli_rootCount?: Maybe<testarbitrumgoerli_RootCount>;
  testarbitrumgoerli_rootCounts: Array<testarbitrumgoerli_RootCount>;
  testarbitrumgoerli_rootMessageSent?: Maybe<testarbitrumgoerli_RootMessageSent>;
  testarbitrumgoerli_rootMessageSents: Array<testarbitrumgoerli_RootMessageSent>;
  testarbitrumgoerli_relayerFeesIncrease?: Maybe<testarbitrumgoerli_RelayerFeesIncrease>;
  testarbitrumgoerli_relayerFeesIncreases: Array<testarbitrumgoerli_RelayerFeesIncrease>;
  testarbitrumgoerli_slippageUpdate?: Maybe<testarbitrumgoerli_SlippageUpdate>;
  testarbitrumgoerli_slippageUpdates: Array<testarbitrumgoerli_SlippageUpdate>;
  /** Access to subgraph metadata */
  testarbitrumgoerli__meta?: Maybe<testarbitrumgoerli__Meta_>;
};


export type Subscriptiontestarbitrumgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_Asset_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_AssetStatus_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_AssetBalance_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_Router_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_RouterDailyTVL_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_Setting_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_Relayer_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_Sequencer_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_Sequencer_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_RelayerFee_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_OriginTransfer_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_OriginMessage_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_AggregateRoot_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_ConnectorMeta_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_RootCount_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_RootCount_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_RootMessageSent_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_RelayerFeesIncrease_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testarbitrumgoerli_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<testarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<testarbitrumgoerli_SlippageUpdate_filter>;
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestarbitrumgoerli__metaArgs = {
  block?: InputMaybe<testarbitrumgoerli_Block_height>;
};

export type testarbitrumgoerli_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type testarbitrumgoerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['testarbitrumgoerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type testarbitrumgoerli__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: testarbitrumgoerli__Block_;
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
  testarbitrumgoerli_asset: InContextSdkMethod<Query['testarbitrumgoerli_asset'], Querytestarbitrumgoerli_assetArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_assets: InContextSdkMethod<Query['testarbitrumgoerli_assets'], Querytestarbitrumgoerli_assetsArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_assetStatus: InContextSdkMethod<Query['testarbitrumgoerli_assetStatus'], Querytestarbitrumgoerli_assetStatusArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_assetStatuses: InContextSdkMethod<Query['testarbitrumgoerli_assetStatuses'], Querytestarbitrumgoerli_assetStatusesArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_assetBalance: InContextSdkMethod<Query['testarbitrumgoerli_assetBalance'], Querytestarbitrumgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_assetBalances: InContextSdkMethod<Query['testarbitrumgoerli_assetBalances'], Querytestarbitrumgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_router: InContextSdkMethod<Query['testarbitrumgoerli_router'], Querytestarbitrumgoerli_routerArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_routers: InContextSdkMethod<Query['testarbitrumgoerli_routers'], Querytestarbitrumgoerli_routersArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_routerDailyTVL: InContextSdkMethod<Query['testarbitrumgoerli_routerDailyTVL'], Querytestarbitrumgoerli_routerDailyTVLArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_routerDailyTVLs: InContextSdkMethod<Query['testarbitrumgoerli_routerDailyTVLs'], Querytestarbitrumgoerli_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_setting: InContextSdkMethod<Query['testarbitrumgoerli_setting'], Querytestarbitrumgoerli_settingArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_settings: InContextSdkMethod<Query['testarbitrumgoerli_settings'], Querytestarbitrumgoerli_settingsArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_relayer: InContextSdkMethod<Query['testarbitrumgoerli_relayer'], Querytestarbitrumgoerli_relayerArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_relayers: InContextSdkMethod<Query['testarbitrumgoerli_relayers'], Querytestarbitrumgoerli_relayersArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_sequencer: InContextSdkMethod<Query['testarbitrumgoerli_sequencer'], Querytestarbitrumgoerli_sequencerArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_sequencers: InContextSdkMethod<Query['testarbitrumgoerli_sequencers'], Querytestarbitrumgoerli_sequencersArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_relayerFee: InContextSdkMethod<Query['testarbitrumgoerli_relayerFee'], Querytestarbitrumgoerli_relayerFeeArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_relayerFees: InContextSdkMethod<Query['testarbitrumgoerli_relayerFees'], Querytestarbitrumgoerli_relayerFeesArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_originTransfer: InContextSdkMethod<Query['testarbitrumgoerli_originTransfer'], Querytestarbitrumgoerli_originTransferArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_originTransfers: InContextSdkMethod<Query['testarbitrumgoerli_originTransfers'], Querytestarbitrumgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_destinationTransfer: InContextSdkMethod<Query['testarbitrumgoerli_destinationTransfer'], Querytestarbitrumgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_destinationTransfers: InContextSdkMethod<Query['testarbitrumgoerli_destinationTransfers'], Querytestarbitrumgoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_originMessage: InContextSdkMethod<Query['testarbitrumgoerli_originMessage'], Querytestarbitrumgoerli_originMessageArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_originMessages: InContextSdkMethod<Query['testarbitrumgoerli_originMessages'], Querytestarbitrumgoerli_originMessagesArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_aggregateRoot: InContextSdkMethod<Query['testarbitrumgoerli_aggregateRoot'], Querytestarbitrumgoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_aggregateRoots: InContextSdkMethod<Query['testarbitrumgoerli_aggregateRoots'], Querytestarbitrumgoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_connectorMeta: InContextSdkMethod<Query['testarbitrumgoerli_connectorMeta'], Querytestarbitrumgoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_connectorMetas: InContextSdkMethod<Query['testarbitrumgoerli_connectorMetas'], Querytestarbitrumgoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_rootCount: InContextSdkMethod<Query['testarbitrumgoerli_rootCount'], Querytestarbitrumgoerli_rootCountArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_rootCounts: InContextSdkMethod<Query['testarbitrumgoerli_rootCounts'], Querytestarbitrumgoerli_rootCountsArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_rootMessageSent: InContextSdkMethod<Query['testarbitrumgoerli_rootMessageSent'], Querytestarbitrumgoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_rootMessageSents: InContextSdkMethod<Query['testarbitrumgoerli_rootMessageSents'], Querytestarbitrumgoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_relayerFeesIncrease: InContextSdkMethod<Query['testarbitrumgoerli_relayerFeesIncrease'], Querytestarbitrumgoerli_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_relayerFeesIncreases: InContextSdkMethod<Query['testarbitrumgoerli_relayerFeesIncreases'], Querytestarbitrumgoerli_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_slippageUpdate: InContextSdkMethod<Query['testarbitrumgoerli_slippageUpdate'], Querytestarbitrumgoerli_slippageUpdateArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_slippageUpdates: InContextSdkMethod<Query['testarbitrumgoerli_slippageUpdates'], Querytestarbitrumgoerli_slippageUpdatesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  testarbitrumgoerli__meta: InContextSdkMethod<Query['testarbitrumgoerli__meta'], Querytestarbitrumgoerli__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  testarbitrumgoerli_asset: InContextSdkMethod<Subscription['testarbitrumgoerli_asset'], Subscriptiontestarbitrumgoerli_assetArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_assets: InContextSdkMethod<Subscription['testarbitrumgoerli_assets'], Subscriptiontestarbitrumgoerli_assetsArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_assetStatus: InContextSdkMethod<Subscription['testarbitrumgoerli_assetStatus'], Subscriptiontestarbitrumgoerli_assetStatusArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_assetStatuses: InContextSdkMethod<Subscription['testarbitrumgoerli_assetStatuses'], Subscriptiontestarbitrumgoerli_assetStatusesArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_assetBalance: InContextSdkMethod<Subscription['testarbitrumgoerli_assetBalance'], Subscriptiontestarbitrumgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_assetBalances: InContextSdkMethod<Subscription['testarbitrumgoerli_assetBalances'], Subscriptiontestarbitrumgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_router: InContextSdkMethod<Subscription['testarbitrumgoerli_router'], Subscriptiontestarbitrumgoerli_routerArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_routers: InContextSdkMethod<Subscription['testarbitrumgoerli_routers'], Subscriptiontestarbitrumgoerli_routersArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_routerDailyTVL: InContextSdkMethod<Subscription['testarbitrumgoerli_routerDailyTVL'], Subscriptiontestarbitrumgoerli_routerDailyTVLArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_routerDailyTVLs: InContextSdkMethod<Subscription['testarbitrumgoerli_routerDailyTVLs'], Subscriptiontestarbitrumgoerli_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_setting: InContextSdkMethod<Subscription['testarbitrumgoerli_setting'], Subscriptiontestarbitrumgoerli_settingArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_settings: InContextSdkMethod<Subscription['testarbitrumgoerli_settings'], Subscriptiontestarbitrumgoerli_settingsArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_relayer: InContextSdkMethod<Subscription['testarbitrumgoerli_relayer'], Subscriptiontestarbitrumgoerli_relayerArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_relayers: InContextSdkMethod<Subscription['testarbitrumgoerli_relayers'], Subscriptiontestarbitrumgoerli_relayersArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_sequencer: InContextSdkMethod<Subscription['testarbitrumgoerli_sequencer'], Subscriptiontestarbitrumgoerli_sequencerArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_sequencers: InContextSdkMethod<Subscription['testarbitrumgoerli_sequencers'], Subscriptiontestarbitrumgoerli_sequencersArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_relayerFee: InContextSdkMethod<Subscription['testarbitrumgoerli_relayerFee'], Subscriptiontestarbitrumgoerli_relayerFeeArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_relayerFees: InContextSdkMethod<Subscription['testarbitrumgoerli_relayerFees'], Subscriptiontestarbitrumgoerli_relayerFeesArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_originTransfer: InContextSdkMethod<Subscription['testarbitrumgoerli_originTransfer'], Subscriptiontestarbitrumgoerli_originTransferArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_originTransfers: InContextSdkMethod<Subscription['testarbitrumgoerli_originTransfers'], Subscriptiontestarbitrumgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_destinationTransfer: InContextSdkMethod<Subscription['testarbitrumgoerli_destinationTransfer'], Subscriptiontestarbitrumgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_destinationTransfers: InContextSdkMethod<Subscription['testarbitrumgoerli_destinationTransfers'], Subscriptiontestarbitrumgoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_originMessage: InContextSdkMethod<Subscription['testarbitrumgoerli_originMessage'], Subscriptiontestarbitrumgoerli_originMessageArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_originMessages: InContextSdkMethod<Subscription['testarbitrumgoerli_originMessages'], Subscriptiontestarbitrumgoerli_originMessagesArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_aggregateRoot: InContextSdkMethod<Subscription['testarbitrumgoerli_aggregateRoot'], Subscriptiontestarbitrumgoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_aggregateRoots: InContextSdkMethod<Subscription['testarbitrumgoerli_aggregateRoots'], Subscriptiontestarbitrumgoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_connectorMeta: InContextSdkMethod<Subscription['testarbitrumgoerli_connectorMeta'], Subscriptiontestarbitrumgoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_connectorMetas: InContextSdkMethod<Subscription['testarbitrumgoerli_connectorMetas'], Subscriptiontestarbitrumgoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_rootCount: InContextSdkMethod<Subscription['testarbitrumgoerli_rootCount'], Subscriptiontestarbitrumgoerli_rootCountArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_rootCounts: InContextSdkMethod<Subscription['testarbitrumgoerli_rootCounts'], Subscriptiontestarbitrumgoerli_rootCountsArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_rootMessageSent: InContextSdkMethod<Subscription['testarbitrumgoerli_rootMessageSent'], Subscriptiontestarbitrumgoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_rootMessageSents: InContextSdkMethod<Subscription['testarbitrumgoerli_rootMessageSents'], Subscriptiontestarbitrumgoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_relayerFeesIncrease: InContextSdkMethod<Subscription['testarbitrumgoerli_relayerFeesIncrease'], Subscriptiontestarbitrumgoerli_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_relayerFeesIncreases: InContextSdkMethod<Subscription['testarbitrumgoerli_relayerFeesIncreases'], Subscriptiontestarbitrumgoerli_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_slippageUpdate: InContextSdkMethod<Subscription['testarbitrumgoerli_slippageUpdate'], Subscriptiontestarbitrumgoerli_slippageUpdateArgs, MeshContext>,
  /** null **/
  testarbitrumgoerli_slippageUpdates: InContextSdkMethod<Subscription['testarbitrumgoerli_slippageUpdates'], Subscriptiontestarbitrumgoerli_slippageUpdatesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  testarbitrumgoerli__meta: InContextSdkMethod<Subscription['testarbitrumgoerli__meta'], Subscriptiontestarbitrumgoerli__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Test_ArbitrumGoerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
