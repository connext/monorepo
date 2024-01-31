// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextMetisTypes {
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
  metis_BigDecimal: any;
  BigInt: any;
  metis_Bytes: any;
  metis_Int8: any;
};

export type metis_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['metis_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type metis_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['metis_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type metis_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['metis_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['metis_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['metis_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['metis_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['metis_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['metis_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['metis_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
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
  _change_block?: InputMaybe<metis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<metis_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<metis_AggregateRootProposed_filter>>>;
};

export type metis_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type metis_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['metis_Bytes']>;
  root_not?: InputMaybe<Scalars['metis_Bytes']>;
  root_gt?: InputMaybe<Scalars['metis_Bytes']>;
  root_lt?: InputMaybe<Scalars['metis_Bytes']>;
  root_gte?: InputMaybe<Scalars['metis_Bytes']>;
  root_lte?: InputMaybe<Scalars['metis_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  root_contains?: InputMaybe<Scalars['metis_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<metis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<metis_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<metis_AggregateRoot_filter>>>;
};

export type metis_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type metis_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['metis_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['metis_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['metis_Bytes']>;
  localAsset?: Maybe<Scalars['metis_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<metis_AssetStatus>;
};

export type metis_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: metis_Router;
  asset: metis_Asset;
  feesEarned: Scalars['BigInt'];
};

export type metis_AssetBalance_filter = {
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
  router_?: InputMaybe<metis_Router_filter>;
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
  asset_?: InputMaybe<metis_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<metis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<metis_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<metis_AssetBalance_filter>>>;
};

export type metis_AssetBalance_orderBy =
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

export type metis_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type metis_AssetStatus_filter = {
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
  _change_block?: InputMaybe<metis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<metis_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<metis_AssetStatus_filter>>>;
};

export type metis_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type metis_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['metis_Bytes']>;
  key_not?: InputMaybe<Scalars['metis_Bytes']>;
  key_gt?: InputMaybe<Scalars['metis_Bytes']>;
  key_lt?: InputMaybe<Scalars['metis_Bytes']>;
  key_gte?: InputMaybe<Scalars['metis_Bytes']>;
  key_lte?: InputMaybe<Scalars['metis_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  key_contains?: InputMaybe<Scalars['metis_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['metis_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['metis_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['metis_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['metis_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['metis_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['metis_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['metis_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['metis_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['metis_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['metis_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['metis_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['metis_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['metis_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['metis_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  localAsset?: InputMaybe<Scalars['metis_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['metis_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['metis_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['metis_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['metis_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['metis_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['metis_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
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
  status_?: InputMaybe<metis_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<metis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<metis_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<metis_Asset_filter>>>;
};

export type metis_Asset_orderBy =
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

export type metis_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type metis_Block_height = {
  hash?: InputMaybe<Scalars['metis_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type metis_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['metis_Bytes']>;
  rootManager?: Maybe<Scalars['metis_Bytes']>;
  mirrorConnector?: Maybe<Scalars['metis_Bytes']>;
};

export type metis_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['metis_Bytes']>;
  amb_not?: InputMaybe<Scalars['metis_Bytes']>;
  amb_gt?: InputMaybe<Scalars['metis_Bytes']>;
  amb_lt?: InputMaybe<Scalars['metis_Bytes']>;
  amb_gte?: InputMaybe<Scalars['metis_Bytes']>;
  amb_lte?: InputMaybe<Scalars['metis_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['metis_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  rootManager?: InputMaybe<Scalars['metis_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['metis_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['metis_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['metis_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['metis_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['metis_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['metis_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['metis_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['metis_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['metis_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['metis_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['metis_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['metis_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['metis_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<metis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<metis_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<metis_ConnectorMeta_filter>>>;
};

export type metis_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type metis_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['metis_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<metis_TransferStatus>;
  routers?: Maybe<Array<metis_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['metis_Bytes']>;
  delegate?: Maybe<Scalars['metis_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['metis_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['metis_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['metis_Bytes']>;
  asset?: Maybe<metis_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['metis_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['metis_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['metis_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['metis_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['metis_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['metis_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type metis_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_Router_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_Router_filter>;
};

export type metis_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['metis_Bytes']>;
  transferId_not?: InputMaybe<Scalars['metis_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['metis_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['metis_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['metis_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['metis_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['metis_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<metis_TransferStatus>;
  status_not?: InputMaybe<metis_TransferStatus>;
  status_in?: InputMaybe<Array<metis_TransferStatus>>;
  status_not_in?: InputMaybe<Array<metis_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<metis_Router_filter>;
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
  to?: InputMaybe<Scalars['metis_Bytes']>;
  to_not?: InputMaybe<Scalars['metis_Bytes']>;
  to_gt?: InputMaybe<Scalars['metis_Bytes']>;
  to_lt?: InputMaybe<Scalars['metis_Bytes']>;
  to_gte?: InputMaybe<Scalars['metis_Bytes']>;
  to_lte?: InputMaybe<Scalars['metis_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  to_contains?: InputMaybe<Scalars['metis_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  delegate?: InputMaybe<Scalars['metis_Bytes']>;
  delegate_not?: InputMaybe<Scalars['metis_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['metis_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['metis_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['metis_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['metis_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['metis_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['metis_Bytes']>;
  callData_not?: InputMaybe<Scalars['metis_Bytes']>;
  callData_gt?: InputMaybe<Scalars['metis_Bytes']>;
  callData_lt?: InputMaybe<Scalars['metis_Bytes']>;
  callData_gte?: InputMaybe<Scalars['metis_Bytes']>;
  callData_lte?: InputMaybe<Scalars['metis_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['metis_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
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
  originSender?: InputMaybe<Scalars['metis_Bytes']>;
  originSender_not?: InputMaybe<Scalars['metis_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['metis_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['metis_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['metis_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['metis_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['metis_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['metis_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['metis_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['metis_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['metis_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['metis_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['metis_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['metis_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
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
  asset_?: InputMaybe<metis_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['metis_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['metis_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['metis_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['metis_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['metis_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['metis_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['metis_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['metis_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['metis_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['metis_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['metis_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['metis_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['metis_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['metis_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['metis_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['metis_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['metis_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['metis_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['metis_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['metis_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['metis_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['metis_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['metis_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['metis_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['metis_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['metis_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['metis_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['metis_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['metis_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['metis_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['metis_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['metis_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['metis_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['metis_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['metis_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['metis_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['metis_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['metis_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['metis_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['metis_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['metis_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['metis_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<metis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<metis_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<metis_DestinationTransfer_filter>>>;
};

export type metis_DestinationTransfer_orderBy =
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

export type metis_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['metis_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type metis_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['metis_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['metis_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['metis_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['metis_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['metis_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['metis_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['metis_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
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
  _change_block?: InputMaybe<metis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<metis_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<metis_OptimisticRootFinalized_filter>>>;
};

export type metis_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type metis_OrderDirection =
  | 'asc'
  | 'desc';

export type metis_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['metis_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['metis_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['metis_Bytes']>;
  root?: Maybe<Scalars['metis_Bytes']>;
  transactionHash?: Maybe<Scalars['metis_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<metis_RootCount>;
};

export type metis_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['metis_Bytes']>;
  transferId_not?: InputMaybe<Scalars['metis_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['metis_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['metis_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['metis_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['metis_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['metis_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['metis_Bytes']>;
  leaf_not?: InputMaybe<Scalars['metis_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['metis_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['metis_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['metis_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['metis_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['metis_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['metis_Bytes']>;
  message_not?: InputMaybe<Scalars['metis_Bytes']>;
  message_gt?: InputMaybe<Scalars['metis_Bytes']>;
  message_lt?: InputMaybe<Scalars['metis_Bytes']>;
  message_gte?: InputMaybe<Scalars['metis_Bytes']>;
  message_lte?: InputMaybe<Scalars['metis_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  message_contains?: InputMaybe<Scalars['metis_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  root?: InputMaybe<Scalars['metis_Bytes']>;
  root_not?: InputMaybe<Scalars['metis_Bytes']>;
  root_gt?: InputMaybe<Scalars['metis_Bytes']>;
  root_lt?: InputMaybe<Scalars['metis_Bytes']>;
  root_gte?: InputMaybe<Scalars['metis_Bytes']>;
  root_lte?: InputMaybe<Scalars['metis_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  root_contains?: InputMaybe<Scalars['metis_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
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
  rootCount_?: InputMaybe<metis_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<metis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<metis_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<metis_OriginMessage_filter>>>;
};

export type metis_OriginMessage_orderBy =
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

export type metis_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['metis_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<metis_TransferStatus>;
  messageHash?: Maybe<Scalars['metis_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['metis_Bytes']>;
  delegate?: Maybe<Scalars['metis_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['metis_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['metis_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['metis_Bytes']>;
  asset?: Maybe<metis_Asset>;
  transactingAsset?: Maybe<Scalars['metis_Bytes']>;
  message?: Maybe<metis_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<metis_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['metis_Bytes']>;
  caller?: Maybe<Scalars['metis_Bytes']>;
  transactionHash?: Maybe<Scalars['metis_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['metis_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type metis_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_RelayerFee_filter>;
};

export type metis_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['metis_Bytes']>;
  transferId_not?: InputMaybe<Scalars['metis_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['metis_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['metis_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['metis_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['metis_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['metis_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<metis_TransferStatus>;
  status_not?: InputMaybe<metis_TransferStatus>;
  status_in?: InputMaybe<Array<metis_TransferStatus>>;
  status_not_in?: InputMaybe<Array<metis_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['metis_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['metis_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['metis_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['metis_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['metis_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['metis_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['metis_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
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
  to?: InputMaybe<Scalars['metis_Bytes']>;
  to_not?: InputMaybe<Scalars['metis_Bytes']>;
  to_gt?: InputMaybe<Scalars['metis_Bytes']>;
  to_lt?: InputMaybe<Scalars['metis_Bytes']>;
  to_gte?: InputMaybe<Scalars['metis_Bytes']>;
  to_lte?: InputMaybe<Scalars['metis_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  to_contains?: InputMaybe<Scalars['metis_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  delegate?: InputMaybe<Scalars['metis_Bytes']>;
  delegate_not?: InputMaybe<Scalars['metis_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['metis_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['metis_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['metis_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['metis_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['metis_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['metis_Bytes']>;
  callData_not?: InputMaybe<Scalars['metis_Bytes']>;
  callData_gt?: InputMaybe<Scalars['metis_Bytes']>;
  callData_lt?: InputMaybe<Scalars['metis_Bytes']>;
  callData_gte?: InputMaybe<Scalars['metis_Bytes']>;
  callData_lte?: InputMaybe<Scalars['metis_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['metis_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['metis_Bytes']>;
  originSender_not?: InputMaybe<Scalars['metis_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['metis_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['metis_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['metis_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['metis_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['metis_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['metis_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['metis_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['metis_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['metis_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['metis_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['metis_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['metis_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
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
  asset_?: InputMaybe<metis_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['metis_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['metis_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['metis_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['metis_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['metis_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['metis_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['metis_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
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
  message_?: InputMaybe<metis_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<metis_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['metis_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['metis_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['metis_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['metis_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['metis_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['metis_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['metis_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  caller?: InputMaybe<Scalars['metis_Bytes']>;
  caller_not?: InputMaybe<Scalars['metis_Bytes']>;
  caller_gt?: InputMaybe<Scalars['metis_Bytes']>;
  caller_lt?: InputMaybe<Scalars['metis_Bytes']>;
  caller_gte?: InputMaybe<Scalars['metis_Bytes']>;
  caller_lte?: InputMaybe<Scalars['metis_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['metis_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['metis_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['metis_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['metis_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['metis_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['metis_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['metis_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['metis_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<metis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<metis_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<metis_OriginTransfer_filter>>>;
};

export type metis_OriginTransfer_orderBy =
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
  metis_asset?: Maybe<metis_Asset>;
  metis_assets: Array<metis_Asset>;
  metis_assetStatus?: Maybe<metis_AssetStatus>;
  metis_assetStatuses: Array<metis_AssetStatus>;
  metis_assetBalance?: Maybe<metis_AssetBalance>;
  metis_assetBalances: Array<metis_AssetBalance>;
  metis_router?: Maybe<metis_Router>;
  metis_routers: Array<metis_Router>;
  metis_routerDailyTVL?: Maybe<metis_RouterDailyTVL>;
  metis_routerDailyTVLs: Array<metis_RouterDailyTVL>;
  metis_routerLiquidityEvent?: Maybe<metis_RouterLiquidityEvent>;
  metis_routerLiquidityEvents: Array<metis_RouterLiquidityEvent>;
  metis_setting?: Maybe<metis_Setting>;
  metis_settings: Array<metis_Setting>;
  metis_relayer?: Maybe<metis_Relayer>;
  metis_relayers: Array<metis_Relayer>;
  metis_sequencer?: Maybe<metis_Sequencer>;
  metis_sequencers: Array<metis_Sequencer>;
  metis_relayerFee?: Maybe<metis_RelayerFee>;
  metis_relayerFees: Array<metis_RelayerFee>;
  metis_originTransfer?: Maybe<metis_OriginTransfer>;
  metis_originTransfers: Array<metis_OriginTransfer>;
  metis_destinationTransfer?: Maybe<metis_DestinationTransfer>;
  metis_destinationTransfers: Array<metis_DestinationTransfer>;
  metis_originMessage?: Maybe<metis_OriginMessage>;
  metis_originMessages: Array<metis_OriginMessage>;
  metis_aggregateRoot?: Maybe<metis_AggregateRoot>;
  metis_aggregateRoots: Array<metis_AggregateRoot>;
  metis_connectorMeta?: Maybe<metis_ConnectorMeta>;
  metis_connectorMetas: Array<metis_ConnectorMeta>;
  metis_rootCount?: Maybe<metis_RootCount>;
  metis_rootCounts: Array<metis_RootCount>;
  metis_rootMessageSent?: Maybe<metis_RootMessageSent>;
  metis_rootMessageSents: Array<metis_RootMessageSent>;
  metis_relayerFeesIncrease?: Maybe<metis_RelayerFeesIncrease>;
  metis_relayerFeesIncreases: Array<metis_RelayerFeesIncrease>;
  metis_slippageUpdate?: Maybe<metis_SlippageUpdate>;
  metis_slippageUpdates: Array<metis_SlippageUpdate>;
  metis_snapshotRoot?: Maybe<metis_SnapshotRoot>;
  metis_snapshotRoots: Array<metis_SnapshotRoot>;
  metis_spokeConnectorMode?: Maybe<metis_SpokeConnectorMode>;
  metis_spokeConnectorModes: Array<metis_SpokeConnectorMode>;
  metis_aggregateRootProposed?: Maybe<metis_AggregateRootProposed>;
  metis_aggregateRootProposeds: Array<metis_AggregateRootProposed>;
  metis_optimisticRootFinalized?: Maybe<metis_OptimisticRootFinalized>;
  metis_optimisticRootFinalizeds: Array<metis_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  metis__meta?: Maybe<metis__Meta_>;
};


export type Querymetis_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_Asset_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_Asset_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_AssetStatus_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_AssetBalance_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_Router_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_Router_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_RouterDailyTVL_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_RouterLiquidityEvent_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_Setting_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_Setting_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_Relayer_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_Relayer_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_Sequencer_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_Sequencer_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_RelayerFee_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_OriginTransfer_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_DestinationTransfer_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_OriginMessage_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_AggregateRoot_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_ConnectorMeta_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_RootCount_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_RootCount_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_RootMessageSent_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_RelayerFeesIncrease_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_SlippageUpdate_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_SnapshotRoot_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_SpokeConnectorMode_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_AggregateRootProposed_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_OptimisticRootFinalized_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymetis__metaArgs = {
  block?: InputMaybe<metis_Block_height>;
};

export type metis_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['metis_Bytes']>;
};

export type metis_RelayerFee = {
  id: Scalars['ID'];
  transfer: metis_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['metis_Bytes'];
};

export type metis_RelayerFee_filter = {
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
  transfer_?: InputMaybe<metis_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['metis_Bytes']>;
  asset_not?: InputMaybe<Scalars['metis_Bytes']>;
  asset_gt?: InputMaybe<Scalars['metis_Bytes']>;
  asset_lt?: InputMaybe<Scalars['metis_Bytes']>;
  asset_gte?: InputMaybe<Scalars['metis_Bytes']>;
  asset_lte?: InputMaybe<Scalars['metis_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['metis_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<metis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<metis_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<metis_RelayerFee_filter>>>;
};

export type metis_RelayerFee_orderBy =
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

export type metis_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: metis_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['metis_Bytes']>;
  caller: Scalars['metis_Bytes'];
  transactionHash: Scalars['metis_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type metis_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<metis_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['metis_Bytes']>;
  asset_not?: InputMaybe<Scalars['metis_Bytes']>;
  asset_gt?: InputMaybe<Scalars['metis_Bytes']>;
  asset_lt?: InputMaybe<Scalars['metis_Bytes']>;
  asset_gte?: InputMaybe<Scalars['metis_Bytes']>;
  asset_lte?: InputMaybe<Scalars['metis_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['metis_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  caller?: InputMaybe<Scalars['metis_Bytes']>;
  caller_not?: InputMaybe<Scalars['metis_Bytes']>;
  caller_gt?: InputMaybe<Scalars['metis_Bytes']>;
  caller_lt?: InputMaybe<Scalars['metis_Bytes']>;
  caller_gte?: InputMaybe<Scalars['metis_Bytes']>;
  caller_lte?: InputMaybe<Scalars['metis_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['metis_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
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
  _change_block?: InputMaybe<metis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<metis_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<metis_RelayerFeesIncrease_filter>>>;
};

export type metis_RelayerFeesIncrease_orderBy =
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

export type metis_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['metis_Bytes']>;
  relayer_not?: InputMaybe<Scalars['metis_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['metis_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['metis_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['metis_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['metis_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['metis_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<metis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<metis_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<metis_Relayer_filter>>>;
};

export type metis_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type metis_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type metis_RootCount_filter = {
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
  _change_block?: InputMaybe<metis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<metis_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<metis_RootCount_filter>>>;
};

export type metis_RootCount_orderBy =
  | 'id'
  | 'count';

export type metis_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['metis_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['metis_Bytes']>;
  transactionHash?: Maybe<Scalars['metis_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type metis_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['metis_Bytes']>;
  root_not?: InputMaybe<Scalars['metis_Bytes']>;
  root_gt?: InputMaybe<Scalars['metis_Bytes']>;
  root_lt?: InputMaybe<Scalars['metis_Bytes']>;
  root_gte?: InputMaybe<Scalars['metis_Bytes']>;
  root_lte?: InputMaybe<Scalars['metis_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  root_contains?: InputMaybe<Scalars['metis_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['metis_Bytes']>;
  caller_not?: InputMaybe<Scalars['metis_Bytes']>;
  caller_gt?: InputMaybe<Scalars['metis_Bytes']>;
  caller_lt?: InputMaybe<Scalars['metis_Bytes']>;
  caller_gte?: InputMaybe<Scalars['metis_Bytes']>;
  caller_lte?: InputMaybe<Scalars['metis_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['metis_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
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
  _change_block?: InputMaybe<metis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<metis_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<metis_RootMessageSent_filter>>>;
};

export type metis_RootMessageSent_orderBy =
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

export type metis_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['metis_Bytes']>;
  recipient?: Maybe<Scalars['metis_Bytes']>;
  proposedOwner?: Maybe<Scalars['metis_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<metis_AssetBalance>;
};


export type metis_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_AssetBalance_filter>;
};

export type metis_RouterDailyTVL = {
  id: Scalars['ID'];
  router: metis_Router;
  asset: metis_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type metis_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<metis_Router_filter>;
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
  asset_?: InputMaybe<metis_Asset_filter>;
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
  _change_block?: InputMaybe<metis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<metis_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<metis_RouterDailyTVL_filter>>>;
};

export type metis_RouterDailyTVL_orderBy =
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

export type metis_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<metis_RouterLiquidityEventType>;
  router: metis_Router;
  asset: metis_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['metis_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['metis_Bytes'];
  nonce: Scalars['BigInt'];
};

export type metis_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type metis_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<metis_RouterLiquidityEventType>;
  type_not?: InputMaybe<metis_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<metis_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<metis_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<metis_Router_filter>;
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
  asset_?: InputMaybe<metis_Asset_filter>;
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
  caller?: InputMaybe<Scalars['metis_Bytes']>;
  caller_not?: InputMaybe<Scalars['metis_Bytes']>;
  caller_gt?: InputMaybe<Scalars['metis_Bytes']>;
  caller_lt?: InputMaybe<Scalars['metis_Bytes']>;
  caller_gte?: InputMaybe<Scalars['metis_Bytes']>;
  caller_lte?: InputMaybe<Scalars['metis_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['metis_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<metis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<metis_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<metis_RouterLiquidityEvent_filter>>>;
};

export type metis_RouterLiquidityEvent_orderBy =
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

export type metis_Router_filter = {
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
  owner?: InputMaybe<Scalars['metis_Bytes']>;
  owner_not?: InputMaybe<Scalars['metis_Bytes']>;
  owner_gt?: InputMaybe<Scalars['metis_Bytes']>;
  owner_lt?: InputMaybe<Scalars['metis_Bytes']>;
  owner_gte?: InputMaybe<Scalars['metis_Bytes']>;
  owner_lte?: InputMaybe<Scalars['metis_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['metis_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  recipient?: InputMaybe<Scalars['metis_Bytes']>;
  recipient_not?: InputMaybe<Scalars['metis_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['metis_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['metis_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['metis_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['metis_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['metis_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['metis_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['metis_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['metis_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['metis_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['metis_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['metis_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['metis_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<metis_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<metis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<metis_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<metis_Router_filter>>>;
};

export type metis_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type metis_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['metis_Bytes']>;
};

export type metis_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['metis_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['metis_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['metis_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['metis_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['metis_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['metis_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['metis_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<metis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<metis_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<metis_Sequencer_filter>>>;
};

export type metis_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type metis_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['metis_Bytes'];
};

export type metis_Setting_filter = {
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
  caller?: InputMaybe<Scalars['metis_Bytes']>;
  caller_not?: InputMaybe<Scalars['metis_Bytes']>;
  caller_gt?: InputMaybe<Scalars['metis_Bytes']>;
  caller_lt?: InputMaybe<Scalars['metis_Bytes']>;
  caller_gte?: InputMaybe<Scalars['metis_Bytes']>;
  caller_lte?: InputMaybe<Scalars['metis_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['metis_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<metis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<metis_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<metis_Setting_filter>>>;
};

export type metis_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type metis_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: metis_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['metis_Bytes'];
  transactionHash: Scalars['metis_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type metis_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<metis_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['metis_Bytes']>;
  caller_not?: InputMaybe<Scalars['metis_Bytes']>;
  caller_gt?: InputMaybe<Scalars['metis_Bytes']>;
  caller_lt?: InputMaybe<Scalars['metis_Bytes']>;
  caller_gte?: InputMaybe<Scalars['metis_Bytes']>;
  caller_lte?: InputMaybe<Scalars['metis_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['metis_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['metis_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
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
  _change_block?: InputMaybe<metis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<metis_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<metis_SlippageUpdate_filter>>>;
};

export type metis_SlippageUpdate_orderBy =
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

export type metis_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['metis_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type metis_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['metis_Bytes']>;
  root_not?: InputMaybe<Scalars['metis_Bytes']>;
  root_gt?: InputMaybe<Scalars['metis_Bytes']>;
  root_lt?: InputMaybe<Scalars['metis_Bytes']>;
  root_gte?: InputMaybe<Scalars['metis_Bytes']>;
  root_lte?: InputMaybe<Scalars['metis_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['metis_Bytes']>>;
  root_contains?: InputMaybe<Scalars['metis_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['metis_Bytes']>;
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
  _change_block?: InputMaybe<metis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<metis_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<metis_SnapshotRoot_filter>>>;
};

export type metis_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type metis_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type metis_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<metis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<metis_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<metis_SpokeConnectorMode_filter>>>;
};

export type metis_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  metis_asset?: Maybe<metis_Asset>;
  metis_assets: Array<metis_Asset>;
  metis_assetStatus?: Maybe<metis_AssetStatus>;
  metis_assetStatuses: Array<metis_AssetStatus>;
  metis_assetBalance?: Maybe<metis_AssetBalance>;
  metis_assetBalances: Array<metis_AssetBalance>;
  metis_router?: Maybe<metis_Router>;
  metis_routers: Array<metis_Router>;
  metis_routerDailyTVL?: Maybe<metis_RouterDailyTVL>;
  metis_routerDailyTVLs: Array<metis_RouterDailyTVL>;
  metis_routerLiquidityEvent?: Maybe<metis_RouterLiquidityEvent>;
  metis_routerLiquidityEvents: Array<metis_RouterLiquidityEvent>;
  metis_setting?: Maybe<metis_Setting>;
  metis_settings: Array<metis_Setting>;
  metis_relayer?: Maybe<metis_Relayer>;
  metis_relayers: Array<metis_Relayer>;
  metis_sequencer?: Maybe<metis_Sequencer>;
  metis_sequencers: Array<metis_Sequencer>;
  metis_relayerFee?: Maybe<metis_RelayerFee>;
  metis_relayerFees: Array<metis_RelayerFee>;
  metis_originTransfer?: Maybe<metis_OriginTransfer>;
  metis_originTransfers: Array<metis_OriginTransfer>;
  metis_destinationTransfer?: Maybe<metis_DestinationTransfer>;
  metis_destinationTransfers: Array<metis_DestinationTransfer>;
  metis_originMessage?: Maybe<metis_OriginMessage>;
  metis_originMessages: Array<metis_OriginMessage>;
  metis_aggregateRoot?: Maybe<metis_AggregateRoot>;
  metis_aggregateRoots: Array<metis_AggregateRoot>;
  metis_connectorMeta?: Maybe<metis_ConnectorMeta>;
  metis_connectorMetas: Array<metis_ConnectorMeta>;
  metis_rootCount?: Maybe<metis_RootCount>;
  metis_rootCounts: Array<metis_RootCount>;
  metis_rootMessageSent?: Maybe<metis_RootMessageSent>;
  metis_rootMessageSents: Array<metis_RootMessageSent>;
  metis_relayerFeesIncrease?: Maybe<metis_RelayerFeesIncrease>;
  metis_relayerFeesIncreases: Array<metis_RelayerFeesIncrease>;
  metis_slippageUpdate?: Maybe<metis_SlippageUpdate>;
  metis_slippageUpdates: Array<metis_SlippageUpdate>;
  metis_snapshotRoot?: Maybe<metis_SnapshotRoot>;
  metis_snapshotRoots: Array<metis_SnapshotRoot>;
  metis_spokeConnectorMode?: Maybe<metis_SpokeConnectorMode>;
  metis_spokeConnectorModes: Array<metis_SpokeConnectorMode>;
  metis_aggregateRootProposed?: Maybe<metis_AggregateRootProposed>;
  metis_aggregateRootProposeds: Array<metis_AggregateRootProposed>;
  metis_optimisticRootFinalized?: Maybe<metis_OptimisticRootFinalized>;
  metis_optimisticRootFinalizeds: Array<metis_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  metis__meta?: Maybe<metis__Meta_>;
};


export type Subscriptionmetis_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_Asset_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_Asset_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_AssetStatus_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_AssetBalance_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_Router_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_Router_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_RouterDailyTVL_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_RouterLiquidityEvent_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_Setting_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_Setting_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_Relayer_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_Relayer_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_Sequencer_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_Sequencer_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_RelayerFee_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_OriginTransfer_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_DestinationTransfer_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_OriginMessage_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_AggregateRoot_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_ConnectorMeta_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_RootCount_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_RootCount_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_RootMessageSent_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_RelayerFeesIncrease_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_SlippageUpdate_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_SnapshotRoot_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_SpokeConnectorMode_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_AggregateRootProposed_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<metis_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<metis_OrderDirection>;
  where?: InputMaybe<metis_OptimisticRootFinalized_filter>;
  block?: InputMaybe<metis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmetis__metaArgs = {
  block?: InputMaybe<metis_Block_height>;
};

export type metis_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type metis__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['metis_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type metis__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: metis__Block_;
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
  metis_asset: InContextSdkMethod<Query['metis_asset'], Querymetis_assetArgs, MeshContext>,
  /** null **/
  metis_assets: InContextSdkMethod<Query['metis_assets'], Querymetis_assetsArgs, MeshContext>,
  /** null **/
  metis_assetStatus: InContextSdkMethod<Query['metis_assetStatus'], Querymetis_assetStatusArgs, MeshContext>,
  /** null **/
  metis_assetStatuses: InContextSdkMethod<Query['metis_assetStatuses'], Querymetis_assetStatusesArgs, MeshContext>,
  /** null **/
  metis_assetBalance: InContextSdkMethod<Query['metis_assetBalance'], Querymetis_assetBalanceArgs, MeshContext>,
  /** null **/
  metis_assetBalances: InContextSdkMethod<Query['metis_assetBalances'], Querymetis_assetBalancesArgs, MeshContext>,
  /** null **/
  metis_router: InContextSdkMethod<Query['metis_router'], Querymetis_routerArgs, MeshContext>,
  /** null **/
  metis_routers: InContextSdkMethod<Query['metis_routers'], Querymetis_routersArgs, MeshContext>,
  /** null **/
  metis_routerDailyTVL: InContextSdkMethod<Query['metis_routerDailyTVL'], Querymetis_routerDailyTVLArgs, MeshContext>,
  /** null **/
  metis_routerDailyTVLs: InContextSdkMethod<Query['metis_routerDailyTVLs'], Querymetis_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  metis_routerLiquidityEvent: InContextSdkMethod<Query['metis_routerLiquidityEvent'], Querymetis_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  metis_routerLiquidityEvents: InContextSdkMethod<Query['metis_routerLiquidityEvents'], Querymetis_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  metis_setting: InContextSdkMethod<Query['metis_setting'], Querymetis_settingArgs, MeshContext>,
  /** null **/
  metis_settings: InContextSdkMethod<Query['metis_settings'], Querymetis_settingsArgs, MeshContext>,
  /** null **/
  metis_relayer: InContextSdkMethod<Query['metis_relayer'], Querymetis_relayerArgs, MeshContext>,
  /** null **/
  metis_relayers: InContextSdkMethod<Query['metis_relayers'], Querymetis_relayersArgs, MeshContext>,
  /** null **/
  metis_sequencer: InContextSdkMethod<Query['metis_sequencer'], Querymetis_sequencerArgs, MeshContext>,
  /** null **/
  metis_sequencers: InContextSdkMethod<Query['metis_sequencers'], Querymetis_sequencersArgs, MeshContext>,
  /** null **/
  metis_relayerFee: InContextSdkMethod<Query['metis_relayerFee'], Querymetis_relayerFeeArgs, MeshContext>,
  /** null **/
  metis_relayerFees: InContextSdkMethod<Query['metis_relayerFees'], Querymetis_relayerFeesArgs, MeshContext>,
  /** null **/
  metis_originTransfer: InContextSdkMethod<Query['metis_originTransfer'], Querymetis_originTransferArgs, MeshContext>,
  /** null **/
  metis_originTransfers: InContextSdkMethod<Query['metis_originTransfers'], Querymetis_originTransfersArgs, MeshContext>,
  /** null **/
  metis_destinationTransfer: InContextSdkMethod<Query['metis_destinationTransfer'], Querymetis_destinationTransferArgs, MeshContext>,
  /** null **/
  metis_destinationTransfers: InContextSdkMethod<Query['metis_destinationTransfers'], Querymetis_destinationTransfersArgs, MeshContext>,
  /** null **/
  metis_originMessage: InContextSdkMethod<Query['metis_originMessage'], Querymetis_originMessageArgs, MeshContext>,
  /** null **/
  metis_originMessages: InContextSdkMethod<Query['metis_originMessages'], Querymetis_originMessagesArgs, MeshContext>,
  /** null **/
  metis_aggregateRoot: InContextSdkMethod<Query['metis_aggregateRoot'], Querymetis_aggregateRootArgs, MeshContext>,
  /** null **/
  metis_aggregateRoots: InContextSdkMethod<Query['metis_aggregateRoots'], Querymetis_aggregateRootsArgs, MeshContext>,
  /** null **/
  metis_connectorMeta: InContextSdkMethod<Query['metis_connectorMeta'], Querymetis_connectorMetaArgs, MeshContext>,
  /** null **/
  metis_connectorMetas: InContextSdkMethod<Query['metis_connectorMetas'], Querymetis_connectorMetasArgs, MeshContext>,
  /** null **/
  metis_rootCount: InContextSdkMethod<Query['metis_rootCount'], Querymetis_rootCountArgs, MeshContext>,
  /** null **/
  metis_rootCounts: InContextSdkMethod<Query['metis_rootCounts'], Querymetis_rootCountsArgs, MeshContext>,
  /** null **/
  metis_rootMessageSent: InContextSdkMethod<Query['metis_rootMessageSent'], Querymetis_rootMessageSentArgs, MeshContext>,
  /** null **/
  metis_rootMessageSents: InContextSdkMethod<Query['metis_rootMessageSents'], Querymetis_rootMessageSentsArgs, MeshContext>,
  /** null **/
  metis_relayerFeesIncrease: InContextSdkMethod<Query['metis_relayerFeesIncrease'], Querymetis_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  metis_relayerFeesIncreases: InContextSdkMethod<Query['metis_relayerFeesIncreases'], Querymetis_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  metis_slippageUpdate: InContextSdkMethod<Query['metis_slippageUpdate'], Querymetis_slippageUpdateArgs, MeshContext>,
  /** null **/
  metis_slippageUpdates: InContextSdkMethod<Query['metis_slippageUpdates'], Querymetis_slippageUpdatesArgs, MeshContext>,
  /** null **/
  metis_snapshotRoot: InContextSdkMethod<Query['metis_snapshotRoot'], Querymetis_snapshotRootArgs, MeshContext>,
  /** null **/
  metis_snapshotRoots: InContextSdkMethod<Query['metis_snapshotRoots'], Querymetis_snapshotRootsArgs, MeshContext>,
  /** null **/
  metis_spokeConnectorMode: InContextSdkMethod<Query['metis_spokeConnectorMode'], Querymetis_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  metis_spokeConnectorModes: InContextSdkMethod<Query['metis_spokeConnectorModes'], Querymetis_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  metis_aggregateRootProposed: InContextSdkMethod<Query['metis_aggregateRootProposed'], Querymetis_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  metis_aggregateRootProposeds: InContextSdkMethod<Query['metis_aggregateRootProposeds'], Querymetis_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  metis_optimisticRootFinalized: InContextSdkMethod<Query['metis_optimisticRootFinalized'], Querymetis_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  metis_optimisticRootFinalizeds: InContextSdkMethod<Query['metis_optimisticRootFinalizeds'], Querymetis_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  metis__meta: InContextSdkMethod<Query['metis__meta'], Querymetis__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  metis_asset: InContextSdkMethod<Subscription['metis_asset'], Subscriptionmetis_assetArgs, MeshContext>,
  /** null **/
  metis_assets: InContextSdkMethod<Subscription['metis_assets'], Subscriptionmetis_assetsArgs, MeshContext>,
  /** null **/
  metis_assetStatus: InContextSdkMethod<Subscription['metis_assetStatus'], Subscriptionmetis_assetStatusArgs, MeshContext>,
  /** null **/
  metis_assetStatuses: InContextSdkMethod<Subscription['metis_assetStatuses'], Subscriptionmetis_assetStatusesArgs, MeshContext>,
  /** null **/
  metis_assetBalance: InContextSdkMethod<Subscription['metis_assetBalance'], Subscriptionmetis_assetBalanceArgs, MeshContext>,
  /** null **/
  metis_assetBalances: InContextSdkMethod<Subscription['metis_assetBalances'], Subscriptionmetis_assetBalancesArgs, MeshContext>,
  /** null **/
  metis_router: InContextSdkMethod<Subscription['metis_router'], Subscriptionmetis_routerArgs, MeshContext>,
  /** null **/
  metis_routers: InContextSdkMethod<Subscription['metis_routers'], Subscriptionmetis_routersArgs, MeshContext>,
  /** null **/
  metis_routerDailyTVL: InContextSdkMethod<Subscription['metis_routerDailyTVL'], Subscriptionmetis_routerDailyTVLArgs, MeshContext>,
  /** null **/
  metis_routerDailyTVLs: InContextSdkMethod<Subscription['metis_routerDailyTVLs'], Subscriptionmetis_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  metis_routerLiquidityEvent: InContextSdkMethod<Subscription['metis_routerLiquidityEvent'], Subscriptionmetis_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  metis_routerLiquidityEvents: InContextSdkMethod<Subscription['metis_routerLiquidityEvents'], Subscriptionmetis_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  metis_setting: InContextSdkMethod<Subscription['metis_setting'], Subscriptionmetis_settingArgs, MeshContext>,
  /** null **/
  metis_settings: InContextSdkMethod<Subscription['metis_settings'], Subscriptionmetis_settingsArgs, MeshContext>,
  /** null **/
  metis_relayer: InContextSdkMethod<Subscription['metis_relayer'], Subscriptionmetis_relayerArgs, MeshContext>,
  /** null **/
  metis_relayers: InContextSdkMethod<Subscription['metis_relayers'], Subscriptionmetis_relayersArgs, MeshContext>,
  /** null **/
  metis_sequencer: InContextSdkMethod<Subscription['metis_sequencer'], Subscriptionmetis_sequencerArgs, MeshContext>,
  /** null **/
  metis_sequencers: InContextSdkMethod<Subscription['metis_sequencers'], Subscriptionmetis_sequencersArgs, MeshContext>,
  /** null **/
  metis_relayerFee: InContextSdkMethod<Subscription['metis_relayerFee'], Subscriptionmetis_relayerFeeArgs, MeshContext>,
  /** null **/
  metis_relayerFees: InContextSdkMethod<Subscription['metis_relayerFees'], Subscriptionmetis_relayerFeesArgs, MeshContext>,
  /** null **/
  metis_originTransfer: InContextSdkMethod<Subscription['metis_originTransfer'], Subscriptionmetis_originTransferArgs, MeshContext>,
  /** null **/
  metis_originTransfers: InContextSdkMethod<Subscription['metis_originTransfers'], Subscriptionmetis_originTransfersArgs, MeshContext>,
  /** null **/
  metis_destinationTransfer: InContextSdkMethod<Subscription['metis_destinationTransfer'], Subscriptionmetis_destinationTransferArgs, MeshContext>,
  /** null **/
  metis_destinationTransfers: InContextSdkMethod<Subscription['metis_destinationTransfers'], Subscriptionmetis_destinationTransfersArgs, MeshContext>,
  /** null **/
  metis_originMessage: InContextSdkMethod<Subscription['metis_originMessage'], Subscriptionmetis_originMessageArgs, MeshContext>,
  /** null **/
  metis_originMessages: InContextSdkMethod<Subscription['metis_originMessages'], Subscriptionmetis_originMessagesArgs, MeshContext>,
  /** null **/
  metis_aggregateRoot: InContextSdkMethod<Subscription['metis_aggregateRoot'], Subscriptionmetis_aggregateRootArgs, MeshContext>,
  /** null **/
  metis_aggregateRoots: InContextSdkMethod<Subscription['metis_aggregateRoots'], Subscriptionmetis_aggregateRootsArgs, MeshContext>,
  /** null **/
  metis_connectorMeta: InContextSdkMethod<Subscription['metis_connectorMeta'], Subscriptionmetis_connectorMetaArgs, MeshContext>,
  /** null **/
  metis_connectorMetas: InContextSdkMethod<Subscription['metis_connectorMetas'], Subscriptionmetis_connectorMetasArgs, MeshContext>,
  /** null **/
  metis_rootCount: InContextSdkMethod<Subscription['metis_rootCount'], Subscriptionmetis_rootCountArgs, MeshContext>,
  /** null **/
  metis_rootCounts: InContextSdkMethod<Subscription['metis_rootCounts'], Subscriptionmetis_rootCountsArgs, MeshContext>,
  /** null **/
  metis_rootMessageSent: InContextSdkMethod<Subscription['metis_rootMessageSent'], Subscriptionmetis_rootMessageSentArgs, MeshContext>,
  /** null **/
  metis_rootMessageSents: InContextSdkMethod<Subscription['metis_rootMessageSents'], Subscriptionmetis_rootMessageSentsArgs, MeshContext>,
  /** null **/
  metis_relayerFeesIncrease: InContextSdkMethod<Subscription['metis_relayerFeesIncrease'], Subscriptionmetis_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  metis_relayerFeesIncreases: InContextSdkMethod<Subscription['metis_relayerFeesIncreases'], Subscriptionmetis_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  metis_slippageUpdate: InContextSdkMethod<Subscription['metis_slippageUpdate'], Subscriptionmetis_slippageUpdateArgs, MeshContext>,
  /** null **/
  metis_slippageUpdates: InContextSdkMethod<Subscription['metis_slippageUpdates'], Subscriptionmetis_slippageUpdatesArgs, MeshContext>,
  /** null **/
  metis_snapshotRoot: InContextSdkMethod<Subscription['metis_snapshotRoot'], Subscriptionmetis_snapshotRootArgs, MeshContext>,
  /** null **/
  metis_snapshotRoots: InContextSdkMethod<Subscription['metis_snapshotRoots'], Subscriptionmetis_snapshotRootsArgs, MeshContext>,
  /** null **/
  metis_spokeConnectorMode: InContextSdkMethod<Subscription['metis_spokeConnectorMode'], Subscriptionmetis_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  metis_spokeConnectorModes: InContextSdkMethod<Subscription['metis_spokeConnectorModes'], Subscriptionmetis_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  metis_aggregateRootProposed: InContextSdkMethod<Subscription['metis_aggregateRootProposed'], Subscriptionmetis_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  metis_aggregateRootProposeds: InContextSdkMethod<Subscription['metis_aggregateRootProposeds'], Subscriptionmetis_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  metis_optimisticRootFinalized: InContextSdkMethod<Subscription['metis_optimisticRootFinalized'], Subscriptionmetis_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  metis_optimisticRootFinalizeds: InContextSdkMethod<Subscription['metis_optimisticRootFinalizeds'], Subscriptionmetis_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  metis__meta: InContextSdkMethod<Subscription['metis__meta'], Subscriptionmetis__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Metis"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
