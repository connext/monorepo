// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextXdaiTypes {
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
  xdai_BigDecimal: any;
  BigInt: any;
  xdai_Bytes: any;
  xdai_Int8: any;
};

export type xdai_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['xdai_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type xdai_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['xdai_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type xdai_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['xdai_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['xdai_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_AggregateRootProposed_filter>>>;
};

export type xdai_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type xdai_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['xdai_Bytes']>;
  root_not?: InputMaybe<Scalars['xdai_Bytes']>;
  root_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  root_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  root_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  root_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_AggregateRoot_filter>>>;
};

export type xdai_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type xdai_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['xdai_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['xdai_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['xdai_Bytes']>;
  localAsset?: Maybe<Scalars['xdai_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<xdai_AssetStatus>;
};

export type xdai_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: xdai_Router;
  asset: xdai_Asset;
  feesEarned: Scalars['BigInt'];
};

export type xdai_AssetBalance_filter = {
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
  router_?: InputMaybe<xdai_Router_filter>;
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
  asset_?: InputMaybe<xdai_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_AssetBalance_filter>>>;
};

export type xdai_AssetBalance_orderBy =
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

export type xdai_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type xdai_AssetStatus_filter = {
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
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_AssetStatus_filter>>>;
};

export type xdai_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type xdai_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['xdai_Bytes']>;
  key_not?: InputMaybe<Scalars['xdai_Bytes']>;
  key_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  key_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  key_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  key_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  key_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['xdai_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['xdai_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  localAsset?: InputMaybe<Scalars['xdai_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['xdai_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  status_?: InputMaybe<xdai_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_Asset_filter>>>;
};

export type xdai_Asset_orderBy =
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

export type xdai_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type xdai_Block_height = {
  hash?: InputMaybe<Scalars['xdai_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type xdai_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['xdai_Bytes']>;
  rootManager?: Maybe<Scalars['xdai_Bytes']>;
  mirrorConnector?: Maybe<Scalars['xdai_Bytes']>;
};

export type xdai_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['xdai_Bytes']>;
  amb_not?: InputMaybe<Scalars['xdai_Bytes']>;
  amb_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  amb_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  amb_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  amb_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  rootManager?: InputMaybe<Scalars['xdai_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['xdai_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['xdai_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['xdai_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_ConnectorMeta_filter>>>;
};

export type xdai_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type xdai_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['xdai_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<xdai_TransferStatus>;
  routers?: Maybe<Array<xdai_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['xdai_Bytes']>;
  delegate?: Maybe<Scalars['xdai_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['xdai_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['xdai_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['xdai_Bytes']>;
  asset?: Maybe<xdai_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['xdai_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['xdai_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['xdai_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['xdai_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['xdai_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['xdai_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type xdai_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Router_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Router_filter>;
};

export type xdai_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<xdai_TransferStatus>;
  status_not?: InputMaybe<xdai_TransferStatus>;
  status_in?: InputMaybe<Array<xdai_TransferStatus>>;
  status_not_in?: InputMaybe<Array<xdai_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<xdai_Router_filter>;
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
  to?: InputMaybe<Scalars['xdai_Bytes']>;
  to_not?: InputMaybe<Scalars['xdai_Bytes']>;
  to_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  to_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  to_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  to_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  to_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate_not?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['xdai_Bytes']>;
  callData_not?: InputMaybe<Scalars['xdai_Bytes']>;
  callData_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  callData_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  callData_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  callData_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  originSender?: InputMaybe<Scalars['xdai_Bytes']>;
  originSender_not?: InputMaybe<Scalars['xdai_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  asset_?: InputMaybe<xdai_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['xdai_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['xdai_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['xdai_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['xdai_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['xdai_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['xdai_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_DestinationTransfer_filter>>>;
};

export type xdai_DestinationTransfer_orderBy =
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

export type xdai_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['xdai_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type xdai_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['xdai_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['xdai_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_OptimisticRootFinalized_filter>>>;
};

export type xdai_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type xdai_OrderDirection =
  | 'asc'
  | 'desc';

export type xdai_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['xdai_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['xdai_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['xdai_Bytes']>;
  root?: Maybe<Scalars['xdai_Bytes']>;
  transactionHash?: Maybe<Scalars['xdai_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<xdai_RootCount>;
};

export type xdai_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['xdai_Bytes']>;
  leaf_not?: InputMaybe<Scalars['xdai_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['xdai_Bytes']>;
  message_not?: InputMaybe<Scalars['xdai_Bytes']>;
  message_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  message_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  message_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  message_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  message_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  root?: InputMaybe<Scalars['xdai_Bytes']>;
  root_not?: InputMaybe<Scalars['xdai_Bytes']>;
  root_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  root_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  root_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  root_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  rootCount_?: InputMaybe<xdai_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_OriginMessage_filter>>>;
};

export type xdai_OriginMessage_orderBy =
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

export type xdai_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['xdai_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<xdai_TransferStatus>;
  messageHash?: Maybe<Scalars['xdai_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['xdai_Bytes']>;
  delegate?: Maybe<Scalars['xdai_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['xdai_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['xdai_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['xdai_Bytes']>;
  asset?: Maybe<xdai_Asset>;
  transactingAsset?: Maybe<Scalars['xdai_Bytes']>;
  message?: Maybe<xdai_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<xdai_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['xdai_Bytes']>;
  caller?: Maybe<Scalars['xdai_Bytes']>;
  transactionHash?: Maybe<Scalars['xdai_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['xdai_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type xdai_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_RelayerFee_filter>;
};

export type xdai_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<xdai_TransferStatus>;
  status_not?: InputMaybe<xdai_TransferStatus>;
  status_in?: InputMaybe<Array<xdai_TransferStatus>>;
  status_not_in?: InputMaybe<Array<xdai_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['xdai_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['xdai_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  to?: InputMaybe<Scalars['xdai_Bytes']>;
  to_not?: InputMaybe<Scalars['xdai_Bytes']>;
  to_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  to_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  to_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  to_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  to_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate_not?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['xdai_Bytes']>;
  callData_not?: InputMaybe<Scalars['xdai_Bytes']>;
  callData_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  callData_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  callData_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  callData_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['xdai_Bytes']>;
  originSender_not?: InputMaybe<Scalars['xdai_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  asset_?: InputMaybe<xdai_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['xdai_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['xdai_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  message_?: InputMaybe<xdai_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<xdai_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['xdai_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['xdai_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  caller?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_not?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['xdai_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['xdai_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_OriginTransfer_filter>>>;
};

export type xdai_OriginTransfer_orderBy =
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
  xdai_asset?: Maybe<xdai_Asset>;
  xdai_assets: Array<xdai_Asset>;
  xdai_assetStatus?: Maybe<xdai_AssetStatus>;
  xdai_assetStatuses: Array<xdai_AssetStatus>;
  xdai_assetBalance?: Maybe<xdai_AssetBalance>;
  xdai_assetBalances: Array<xdai_AssetBalance>;
  xdai_router?: Maybe<xdai_Router>;
  xdai_routers: Array<xdai_Router>;
  xdai_routerDailyTVL?: Maybe<xdai_RouterDailyTVL>;
  xdai_routerDailyTVLs: Array<xdai_RouterDailyTVL>;
  xdai_routerLiquidityEvent?: Maybe<xdai_RouterLiquidityEvent>;
  xdai_routerLiquidityEvents: Array<xdai_RouterLiquidityEvent>;
  xdai_setting?: Maybe<xdai_Setting>;
  xdai_settings: Array<xdai_Setting>;
  xdai_relayer?: Maybe<xdai_Relayer>;
  xdai_relayers: Array<xdai_Relayer>;
  xdai_sequencer?: Maybe<xdai_Sequencer>;
  xdai_sequencers: Array<xdai_Sequencer>;
  xdai_relayerFee?: Maybe<xdai_RelayerFee>;
  xdai_relayerFees: Array<xdai_RelayerFee>;
  xdai_originTransfer?: Maybe<xdai_OriginTransfer>;
  xdai_originTransfers: Array<xdai_OriginTransfer>;
  xdai_destinationTransfer?: Maybe<xdai_DestinationTransfer>;
  xdai_destinationTransfers: Array<xdai_DestinationTransfer>;
  xdai_originMessage?: Maybe<xdai_OriginMessage>;
  xdai_originMessages: Array<xdai_OriginMessage>;
  xdai_aggregateRoot?: Maybe<xdai_AggregateRoot>;
  xdai_aggregateRoots: Array<xdai_AggregateRoot>;
  xdai_connectorMeta?: Maybe<xdai_ConnectorMeta>;
  xdai_connectorMetas: Array<xdai_ConnectorMeta>;
  xdai_rootCount?: Maybe<xdai_RootCount>;
  xdai_rootCounts: Array<xdai_RootCount>;
  xdai_rootMessageSent?: Maybe<xdai_RootMessageSent>;
  xdai_rootMessageSents: Array<xdai_RootMessageSent>;
  xdai_relayerFeesIncrease?: Maybe<xdai_RelayerFeesIncrease>;
  xdai_relayerFeesIncreases: Array<xdai_RelayerFeesIncrease>;
  xdai_slippageUpdate?: Maybe<xdai_SlippageUpdate>;
  xdai_slippageUpdates: Array<xdai_SlippageUpdate>;
  xdai_snapshotRoot?: Maybe<xdai_SnapshotRoot>;
  xdai_snapshotRoots: Array<xdai_SnapshotRoot>;
  xdai_spokeConnectorMode?: Maybe<xdai_SpokeConnectorMode>;
  xdai_spokeConnectorModes: Array<xdai_SpokeConnectorMode>;
  xdai_aggregateRootProposed?: Maybe<xdai_AggregateRootProposed>;
  xdai_aggregateRootProposeds: Array<xdai_AggregateRootProposed>;
  xdai_optimisticRootFinalized?: Maybe<xdai_OptimisticRootFinalized>;
  xdai_optimisticRootFinalizeds: Array<xdai_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  xdai__meta?: Maybe<xdai__Meta_>;
};


export type Queryxdai_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Asset_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Asset_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_AssetStatus_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_AssetBalance_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Router_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Router_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_RouterDailyTVL_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_RouterLiquidityEvent_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Setting_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Setting_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Relayer_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Relayer_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Sequencer_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Sequencer_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_RelayerFee_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_OriginTransfer_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_DestinationTransfer_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_OriginMessage_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_AggregateRoot_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_ConnectorMeta_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_RootCount_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_RootCount_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_RootMessageSent_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_RelayerFeesIncrease_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_SlippageUpdate_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_SnapshotRoot_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_SpokeConnectorMode_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_AggregateRootProposed_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_OptimisticRootFinalized_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai__metaArgs = {
  block?: InputMaybe<xdai_Block_height>;
};

export type xdai_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['xdai_Bytes']>;
};

export type xdai_RelayerFee = {
  id: Scalars['ID'];
  transfer: xdai_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['xdai_Bytes'];
};

export type xdai_RelayerFee_filter = {
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
  transfer_?: InputMaybe<xdai_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_not?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_RelayerFee_filter>>>;
};

export type xdai_RelayerFee_orderBy =
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

export type xdai_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: xdai_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['xdai_Bytes']>;
  caller: Scalars['xdai_Bytes'];
  transactionHash: Scalars['xdai_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type xdai_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<xdai_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_not?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  caller?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_not?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_RelayerFeesIncrease_filter>>>;
};

export type xdai_RelayerFeesIncrease_orderBy =
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

export type xdai_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['xdai_Bytes']>;
  relayer_not?: InputMaybe<Scalars['xdai_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_Relayer_filter>>>;
};

export type xdai_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type xdai_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type xdai_RootCount_filter = {
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
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_RootCount_filter>>>;
};

export type xdai_RootCount_orderBy =
  | 'id'
  | 'count';

export type xdai_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['xdai_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['xdai_Bytes']>;
  transactionHash?: Maybe<Scalars['xdai_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type xdai_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['xdai_Bytes']>;
  root_not?: InputMaybe<Scalars['xdai_Bytes']>;
  root_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  root_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  root_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  root_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_not?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_RootMessageSent_filter>>>;
};

export type xdai_RootMessageSent_orderBy =
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

export type xdai_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['xdai_Bytes']>;
  recipient?: Maybe<Scalars['xdai_Bytes']>;
  proposedOwner?: Maybe<Scalars['xdai_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<xdai_AssetBalance>;
};


export type xdai_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_AssetBalance_filter>;
};

export type xdai_RouterDailyTVL = {
  id: Scalars['ID'];
  router: xdai_Router;
  asset: xdai_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type xdai_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<xdai_Router_filter>;
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
  asset_?: InputMaybe<xdai_Asset_filter>;
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
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_RouterDailyTVL_filter>>>;
};

export type xdai_RouterDailyTVL_orderBy =
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

export type xdai_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<xdai_RouterLiquidityEventType>;
  router: xdai_Router;
  asset: xdai_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['xdai_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['xdai_Bytes'];
  nonce: Scalars['BigInt'];
};

export type xdai_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type xdai_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<xdai_RouterLiquidityEventType>;
  type_not?: InputMaybe<xdai_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<xdai_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<xdai_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<xdai_Router_filter>;
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
  asset_?: InputMaybe<xdai_Asset_filter>;
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
  caller?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_not?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_RouterLiquidityEvent_filter>>>;
};

export type xdai_RouterLiquidityEvent_orderBy =
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

export type xdai_Router_filter = {
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
  owner?: InputMaybe<Scalars['xdai_Bytes']>;
  owner_not?: InputMaybe<Scalars['xdai_Bytes']>;
  owner_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  owner_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  owner_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  owner_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  recipient?: InputMaybe<Scalars['xdai_Bytes']>;
  recipient_not?: InputMaybe<Scalars['xdai_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['xdai_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['xdai_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<xdai_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_Router_filter>>>;
};

export type xdai_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type xdai_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['xdai_Bytes']>;
};

export type xdai_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['xdai_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['xdai_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_Sequencer_filter>>>;
};

export type xdai_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type xdai_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['xdai_Bytes'];
};

export type xdai_Setting_filter = {
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
  caller?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_not?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_Setting_filter>>>;
};

export type xdai_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type xdai_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: xdai_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['xdai_Bytes'];
  transactionHash: Scalars['xdai_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type xdai_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<xdai_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_not?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_SlippageUpdate_filter>>>;
};

export type xdai_SlippageUpdate_orderBy =
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

export type xdai_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['xdai_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type xdai_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['xdai_Bytes']>;
  root_not?: InputMaybe<Scalars['xdai_Bytes']>;
  root_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  root_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  root_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  root_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_SnapshotRoot_filter>>>;
};

export type xdai_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type xdai_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type xdai_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<xdai_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<xdai_SpokeConnectorMode_filter>>>;
};

export type xdai_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  xdai_asset?: Maybe<xdai_Asset>;
  xdai_assets: Array<xdai_Asset>;
  xdai_assetStatus?: Maybe<xdai_AssetStatus>;
  xdai_assetStatuses: Array<xdai_AssetStatus>;
  xdai_assetBalance?: Maybe<xdai_AssetBalance>;
  xdai_assetBalances: Array<xdai_AssetBalance>;
  xdai_router?: Maybe<xdai_Router>;
  xdai_routers: Array<xdai_Router>;
  xdai_routerDailyTVL?: Maybe<xdai_RouterDailyTVL>;
  xdai_routerDailyTVLs: Array<xdai_RouterDailyTVL>;
  xdai_routerLiquidityEvent?: Maybe<xdai_RouterLiquidityEvent>;
  xdai_routerLiquidityEvents: Array<xdai_RouterLiquidityEvent>;
  xdai_setting?: Maybe<xdai_Setting>;
  xdai_settings: Array<xdai_Setting>;
  xdai_relayer?: Maybe<xdai_Relayer>;
  xdai_relayers: Array<xdai_Relayer>;
  xdai_sequencer?: Maybe<xdai_Sequencer>;
  xdai_sequencers: Array<xdai_Sequencer>;
  xdai_relayerFee?: Maybe<xdai_RelayerFee>;
  xdai_relayerFees: Array<xdai_RelayerFee>;
  xdai_originTransfer?: Maybe<xdai_OriginTransfer>;
  xdai_originTransfers: Array<xdai_OriginTransfer>;
  xdai_destinationTransfer?: Maybe<xdai_DestinationTransfer>;
  xdai_destinationTransfers: Array<xdai_DestinationTransfer>;
  xdai_originMessage?: Maybe<xdai_OriginMessage>;
  xdai_originMessages: Array<xdai_OriginMessage>;
  xdai_aggregateRoot?: Maybe<xdai_AggregateRoot>;
  xdai_aggregateRoots: Array<xdai_AggregateRoot>;
  xdai_connectorMeta?: Maybe<xdai_ConnectorMeta>;
  xdai_connectorMetas: Array<xdai_ConnectorMeta>;
  xdai_rootCount?: Maybe<xdai_RootCount>;
  xdai_rootCounts: Array<xdai_RootCount>;
  xdai_rootMessageSent?: Maybe<xdai_RootMessageSent>;
  xdai_rootMessageSents: Array<xdai_RootMessageSent>;
  xdai_relayerFeesIncrease?: Maybe<xdai_RelayerFeesIncrease>;
  xdai_relayerFeesIncreases: Array<xdai_RelayerFeesIncrease>;
  xdai_slippageUpdate?: Maybe<xdai_SlippageUpdate>;
  xdai_slippageUpdates: Array<xdai_SlippageUpdate>;
  xdai_snapshotRoot?: Maybe<xdai_SnapshotRoot>;
  xdai_snapshotRoots: Array<xdai_SnapshotRoot>;
  xdai_spokeConnectorMode?: Maybe<xdai_SpokeConnectorMode>;
  xdai_spokeConnectorModes: Array<xdai_SpokeConnectorMode>;
  xdai_aggregateRootProposed?: Maybe<xdai_AggregateRootProposed>;
  xdai_aggregateRootProposeds: Array<xdai_AggregateRootProposed>;
  xdai_optimisticRootFinalized?: Maybe<xdai_OptimisticRootFinalized>;
  xdai_optimisticRootFinalizeds: Array<xdai_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  xdai__meta?: Maybe<xdai__Meta_>;
};


export type Subscriptionxdai_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Asset_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Asset_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_AssetStatus_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_AssetBalance_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Router_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Router_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_RouterDailyTVL_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_RouterLiquidityEvent_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Setting_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Setting_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Relayer_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Relayer_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Sequencer_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Sequencer_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_RelayerFee_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_OriginTransfer_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_DestinationTransfer_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_OriginMessage_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_AggregateRoot_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_ConnectorMeta_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_RootCount_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_RootCount_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_RootMessageSent_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_RelayerFeesIncrease_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_SlippageUpdate_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_SnapshotRoot_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_SpokeConnectorMode_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_AggregateRootProposed_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_OptimisticRootFinalized_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai__metaArgs = {
  block?: InputMaybe<xdai_Block_height>;
};

export type xdai_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type xdai__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['xdai_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type xdai__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: xdai__Block_;
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
  xdai_asset: InContextSdkMethod<Query['xdai_asset'], Queryxdai_assetArgs, MeshContext>,
  /** null **/
  xdai_assets: InContextSdkMethod<Query['xdai_assets'], Queryxdai_assetsArgs, MeshContext>,
  /** null **/
  xdai_assetStatus: InContextSdkMethod<Query['xdai_assetStatus'], Queryxdai_assetStatusArgs, MeshContext>,
  /** null **/
  xdai_assetStatuses: InContextSdkMethod<Query['xdai_assetStatuses'], Queryxdai_assetStatusesArgs, MeshContext>,
  /** null **/
  xdai_assetBalance: InContextSdkMethod<Query['xdai_assetBalance'], Queryxdai_assetBalanceArgs, MeshContext>,
  /** null **/
  xdai_assetBalances: InContextSdkMethod<Query['xdai_assetBalances'], Queryxdai_assetBalancesArgs, MeshContext>,
  /** null **/
  xdai_router: InContextSdkMethod<Query['xdai_router'], Queryxdai_routerArgs, MeshContext>,
  /** null **/
  xdai_routers: InContextSdkMethod<Query['xdai_routers'], Queryxdai_routersArgs, MeshContext>,
  /** null **/
  xdai_routerDailyTVL: InContextSdkMethod<Query['xdai_routerDailyTVL'], Queryxdai_routerDailyTVLArgs, MeshContext>,
  /** null **/
  xdai_routerDailyTVLs: InContextSdkMethod<Query['xdai_routerDailyTVLs'], Queryxdai_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  xdai_routerLiquidityEvent: InContextSdkMethod<Query['xdai_routerLiquidityEvent'], Queryxdai_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  xdai_routerLiquidityEvents: InContextSdkMethod<Query['xdai_routerLiquidityEvents'], Queryxdai_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  xdai_setting: InContextSdkMethod<Query['xdai_setting'], Queryxdai_settingArgs, MeshContext>,
  /** null **/
  xdai_settings: InContextSdkMethod<Query['xdai_settings'], Queryxdai_settingsArgs, MeshContext>,
  /** null **/
  xdai_relayer: InContextSdkMethod<Query['xdai_relayer'], Queryxdai_relayerArgs, MeshContext>,
  /** null **/
  xdai_relayers: InContextSdkMethod<Query['xdai_relayers'], Queryxdai_relayersArgs, MeshContext>,
  /** null **/
  xdai_sequencer: InContextSdkMethod<Query['xdai_sequencer'], Queryxdai_sequencerArgs, MeshContext>,
  /** null **/
  xdai_sequencers: InContextSdkMethod<Query['xdai_sequencers'], Queryxdai_sequencersArgs, MeshContext>,
  /** null **/
  xdai_relayerFee: InContextSdkMethod<Query['xdai_relayerFee'], Queryxdai_relayerFeeArgs, MeshContext>,
  /** null **/
  xdai_relayerFees: InContextSdkMethod<Query['xdai_relayerFees'], Queryxdai_relayerFeesArgs, MeshContext>,
  /** null **/
  xdai_originTransfer: InContextSdkMethod<Query['xdai_originTransfer'], Queryxdai_originTransferArgs, MeshContext>,
  /** null **/
  xdai_originTransfers: InContextSdkMethod<Query['xdai_originTransfers'], Queryxdai_originTransfersArgs, MeshContext>,
  /** null **/
  xdai_destinationTransfer: InContextSdkMethod<Query['xdai_destinationTransfer'], Queryxdai_destinationTransferArgs, MeshContext>,
  /** null **/
  xdai_destinationTransfers: InContextSdkMethod<Query['xdai_destinationTransfers'], Queryxdai_destinationTransfersArgs, MeshContext>,
  /** null **/
  xdai_originMessage: InContextSdkMethod<Query['xdai_originMessage'], Queryxdai_originMessageArgs, MeshContext>,
  /** null **/
  xdai_originMessages: InContextSdkMethod<Query['xdai_originMessages'], Queryxdai_originMessagesArgs, MeshContext>,
  /** null **/
  xdai_aggregateRoot: InContextSdkMethod<Query['xdai_aggregateRoot'], Queryxdai_aggregateRootArgs, MeshContext>,
  /** null **/
  xdai_aggregateRoots: InContextSdkMethod<Query['xdai_aggregateRoots'], Queryxdai_aggregateRootsArgs, MeshContext>,
  /** null **/
  xdai_connectorMeta: InContextSdkMethod<Query['xdai_connectorMeta'], Queryxdai_connectorMetaArgs, MeshContext>,
  /** null **/
  xdai_connectorMetas: InContextSdkMethod<Query['xdai_connectorMetas'], Queryxdai_connectorMetasArgs, MeshContext>,
  /** null **/
  xdai_rootCount: InContextSdkMethod<Query['xdai_rootCount'], Queryxdai_rootCountArgs, MeshContext>,
  /** null **/
  xdai_rootCounts: InContextSdkMethod<Query['xdai_rootCounts'], Queryxdai_rootCountsArgs, MeshContext>,
  /** null **/
  xdai_rootMessageSent: InContextSdkMethod<Query['xdai_rootMessageSent'], Queryxdai_rootMessageSentArgs, MeshContext>,
  /** null **/
  xdai_rootMessageSents: InContextSdkMethod<Query['xdai_rootMessageSents'], Queryxdai_rootMessageSentsArgs, MeshContext>,
  /** null **/
  xdai_relayerFeesIncrease: InContextSdkMethod<Query['xdai_relayerFeesIncrease'], Queryxdai_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  xdai_relayerFeesIncreases: InContextSdkMethod<Query['xdai_relayerFeesIncreases'], Queryxdai_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  xdai_slippageUpdate: InContextSdkMethod<Query['xdai_slippageUpdate'], Queryxdai_slippageUpdateArgs, MeshContext>,
  /** null **/
  xdai_slippageUpdates: InContextSdkMethod<Query['xdai_slippageUpdates'], Queryxdai_slippageUpdatesArgs, MeshContext>,
  /** null **/
  xdai_snapshotRoot: InContextSdkMethod<Query['xdai_snapshotRoot'], Queryxdai_snapshotRootArgs, MeshContext>,
  /** null **/
  xdai_snapshotRoots: InContextSdkMethod<Query['xdai_snapshotRoots'], Queryxdai_snapshotRootsArgs, MeshContext>,
  /** null **/
  xdai_spokeConnectorMode: InContextSdkMethod<Query['xdai_spokeConnectorMode'], Queryxdai_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  xdai_spokeConnectorModes: InContextSdkMethod<Query['xdai_spokeConnectorModes'], Queryxdai_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  xdai_aggregateRootProposed: InContextSdkMethod<Query['xdai_aggregateRootProposed'], Queryxdai_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  xdai_aggregateRootProposeds: InContextSdkMethod<Query['xdai_aggregateRootProposeds'], Queryxdai_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  xdai_optimisticRootFinalized: InContextSdkMethod<Query['xdai_optimisticRootFinalized'], Queryxdai_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  xdai_optimisticRootFinalizeds: InContextSdkMethod<Query['xdai_optimisticRootFinalizeds'], Queryxdai_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  xdai__meta: InContextSdkMethod<Query['xdai__meta'], Queryxdai__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  xdai_asset: InContextSdkMethod<Subscription['xdai_asset'], Subscriptionxdai_assetArgs, MeshContext>,
  /** null **/
  xdai_assets: InContextSdkMethod<Subscription['xdai_assets'], Subscriptionxdai_assetsArgs, MeshContext>,
  /** null **/
  xdai_assetStatus: InContextSdkMethod<Subscription['xdai_assetStatus'], Subscriptionxdai_assetStatusArgs, MeshContext>,
  /** null **/
  xdai_assetStatuses: InContextSdkMethod<Subscription['xdai_assetStatuses'], Subscriptionxdai_assetStatusesArgs, MeshContext>,
  /** null **/
  xdai_assetBalance: InContextSdkMethod<Subscription['xdai_assetBalance'], Subscriptionxdai_assetBalanceArgs, MeshContext>,
  /** null **/
  xdai_assetBalances: InContextSdkMethod<Subscription['xdai_assetBalances'], Subscriptionxdai_assetBalancesArgs, MeshContext>,
  /** null **/
  xdai_router: InContextSdkMethod<Subscription['xdai_router'], Subscriptionxdai_routerArgs, MeshContext>,
  /** null **/
  xdai_routers: InContextSdkMethod<Subscription['xdai_routers'], Subscriptionxdai_routersArgs, MeshContext>,
  /** null **/
  xdai_routerDailyTVL: InContextSdkMethod<Subscription['xdai_routerDailyTVL'], Subscriptionxdai_routerDailyTVLArgs, MeshContext>,
  /** null **/
  xdai_routerDailyTVLs: InContextSdkMethod<Subscription['xdai_routerDailyTVLs'], Subscriptionxdai_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  xdai_routerLiquidityEvent: InContextSdkMethod<Subscription['xdai_routerLiquidityEvent'], Subscriptionxdai_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  xdai_routerLiquidityEvents: InContextSdkMethod<Subscription['xdai_routerLiquidityEvents'], Subscriptionxdai_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  xdai_setting: InContextSdkMethod<Subscription['xdai_setting'], Subscriptionxdai_settingArgs, MeshContext>,
  /** null **/
  xdai_settings: InContextSdkMethod<Subscription['xdai_settings'], Subscriptionxdai_settingsArgs, MeshContext>,
  /** null **/
  xdai_relayer: InContextSdkMethod<Subscription['xdai_relayer'], Subscriptionxdai_relayerArgs, MeshContext>,
  /** null **/
  xdai_relayers: InContextSdkMethod<Subscription['xdai_relayers'], Subscriptionxdai_relayersArgs, MeshContext>,
  /** null **/
  xdai_sequencer: InContextSdkMethod<Subscription['xdai_sequencer'], Subscriptionxdai_sequencerArgs, MeshContext>,
  /** null **/
  xdai_sequencers: InContextSdkMethod<Subscription['xdai_sequencers'], Subscriptionxdai_sequencersArgs, MeshContext>,
  /** null **/
  xdai_relayerFee: InContextSdkMethod<Subscription['xdai_relayerFee'], Subscriptionxdai_relayerFeeArgs, MeshContext>,
  /** null **/
  xdai_relayerFees: InContextSdkMethod<Subscription['xdai_relayerFees'], Subscriptionxdai_relayerFeesArgs, MeshContext>,
  /** null **/
  xdai_originTransfer: InContextSdkMethod<Subscription['xdai_originTransfer'], Subscriptionxdai_originTransferArgs, MeshContext>,
  /** null **/
  xdai_originTransfers: InContextSdkMethod<Subscription['xdai_originTransfers'], Subscriptionxdai_originTransfersArgs, MeshContext>,
  /** null **/
  xdai_destinationTransfer: InContextSdkMethod<Subscription['xdai_destinationTransfer'], Subscriptionxdai_destinationTransferArgs, MeshContext>,
  /** null **/
  xdai_destinationTransfers: InContextSdkMethod<Subscription['xdai_destinationTransfers'], Subscriptionxdai_destinationTransfersArgs, MeshContext>,
  /** null **/
  xdai_originMessage: InContextSdkMethod<Subscription['xdai_originMessage'], Subscriptionxdai_originMessageArgs, MeshContext>,
  /** null **/
  xdai_originMessages: InContextSdkMethod<Subscription['xdai_originMessages'], Subscriptionxdai_originMessagesArgs, MeshContext>,
  /** null **/
  xdai_aggregateRoot: InContextSdkMethod<Subscription['xdai_aggregateRoot'], Subscriptionxdai_aggregateRootArgs, MeshContext>,
  /** null **/
  xdai_aggregateRoots: InContextSdkMethod<Subscription['xdai_aggregateRoots'], Subscriptionxdai_aggregateRootsArgs, MeshContext>,
  /** null **/
  xdai_connectorMeta: InContextSdkMethod<Subscription['xdai_connectorMeta'], Subscriptionxdai_connectorMetaArgs, MeshContext>,
  /** null **/
  xdai_connectorMetas: InContextSdkMethod<Subscription['xdai_connectorMetas'], Subscriptionxdai_connectorMetasArgs, MeshContext>,
  /** null **/
  xdai_rootCount: InContextSdkMethod<Subscription['xdai_rootCount'], Subscriptionxdai_rootCountArgs, MeshContext>,
  /** null **/
  xdai_rootCounts: InContextSdkMethod<Subscription['xdai_rootCounts'], Subscriptionxdai_rootCountsArgs, MeshContext>,
  /** null **/
  xdai_rootMessageSent: InContextSdkMethod<Subscription['xdai_rootMessageSent'], Subscriptionxdai_rootMessageSentArgs, MeshContext>,
  /** null **/
  xdai_rootMessageSents: InContextSdkMethod<Subscription['xdai_rootMessageSents'], Subscriptionxdai_rootMessageSentsArgs, MeshContext>,
  /** null **/
  xdai_relayerFeesIncrease: InContextSdkMethod<Subscription['xdai_relayerFeesIncrease'], Subscriptionxdai_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  xdai_relayerFeesIncreases: InContextSdkMethod<Subscription['xdai_relayerFeesIncreases'], Subscriptionxdai_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  xdai_slippageUpdate: InContextSdkMethod<Subscription['xdai_slippageUpdate'], Subscriptionxdai_slippageUpdateArgs, MeshContext>,
  /** null **/
  xdai_slippageUpdates: InContextSdkMethod<Subscription['xdai_slippageUpdates'], Subscriptionxdai_slippageUpdatesArgs, MeshContext>,
  /** null **/
  xdai_snapshotRoot: InContextSdkMethod<Subscription['xdai_snapshotRoot'], Subscriptionxdai_snapshotRootArgs, MeshContext>,
  /** null **/
  xdai_snapshotRoots: InContextSdkMethod<Subscription['xdai_snapshotRoots'], Subscriptionxdai_snapshotRootsArgs, MeshContext>,
  /** null **/
  xdai_spokeConnectorMode: InContextSdkMethod<Subscription['xdai_spokeConnectorMode'], Subscriptionxdai_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  xdai_spokeConnectorModes: InContextSdkMethod<Subscription['xdai_spokeConnectorModes'], Subscriptionxdai_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  xdai_aggregateRootProposed: InContextSdkMethod<Subscription['xdai_aggregateRootProposed'], Subscriptionxdai_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  xdai_aggregateRootProposeds: InContextSdkMethod<Subscription['xdai_aggregateRootProposeds'], Subscriptionxdai_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  xdai_optimisticRootFinalized: InContextSdkMethod<Subscription['xdai_optimisticRootFinalized'], Subscriptionxdai_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  xdai_optimisticRootFinalizeds: InContextSdkMethod<Subscription['xdai_optimisticRootFinalizeds'], Subscriptionxdai_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  xdai__meta: InContextSdkMethod<Subscription['xdai__meta'], Subscriptionxdai__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Xdai"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
