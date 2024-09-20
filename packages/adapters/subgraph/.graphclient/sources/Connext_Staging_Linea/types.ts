// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextStagingLineaTypes {
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
  staginglinea_BigDecimal: any;
  BigInt: any;
  staginglinea_Bytes: any;
};

export type staginglinea_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['staginglinea_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type staginglinea_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['staginglinea_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type staginglinea_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['staginglinea_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
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
  _change_block?: InputMaybe<staginglinea_BlockChangedFilter>;
};

export type staginglinea_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type staginglinea_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['staginglinea_Bytes']>;
  root_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  root_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginglinea_BlockChangedFilter>;
};

export type staginglinea_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type staginglinea_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['staginglinea_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['staginglinea_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['staginglinea_Bytes']>;
  localAsset?: Maybe<Scalars['staginglinea_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<staginglinea_AssetStatus>;
};

export type staginglinea_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: staginglinea_Router;
  asset: staginglinea_Asset;
  feesEarned: Scalars['BigInt'];
};

export type staginglinea_AssetBalance_filter = {
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
  router_?: InputMaybe<staginglinea_Router_filter>;
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
  asset_?: InputMaybe<staginglinea_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginglinea_BlockChangedFilter>;
};

export type staginglinea_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'locked'
  | 'supplied'
  | 'removed'
  | 'router'
  | 'asset'
  | 'feesEarned';

export type staginglinea_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type staginglinea_AssetStatus_filter = {
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
  _change_block?: InputMaybe<staginglinea_BlockChangedFilter>;
};

export type staginglinea_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type staginglinea_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['staginglinea_Bytes']>;
  key_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  key_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['staginglinea_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['staginglinea_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  localAsset?: InputMaybe<Scalars['staginglinea_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
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
  status_?: InputMaybe<staginglinea_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginglinea_BlockChangedFilter>;
};

export type staginglinea_Asset_orderBy =
  | 'id'
  | 'key'
  | 'decimal'
  | 'adoptedDecimal'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber'
  | 'status';

export type staginglinea_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type staginglinea_Block_height = {
  hash?: InputMaybe<Scalars['staginglinea_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type staginglinea_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['staginglinea_Bytes']>;
  rootManager?: Maybe<Scalars['staginglinea_Bytes']>;
  mirrorConnector?: Maybe<Scalars['staginglinea_Bytes']>;
};

export type staginglinea_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['staginglinea_Bytes']>;
  amb_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  rootManager?: InputMaybe<Scalars['staginglinea_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['staginglinea_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginglinea_BlockChangedFilter>;
};

export type staginglinea_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type staginglinea_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['staginglinea_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<staginglinea_TransferStatus>;
  routers?: Maybe<Array<staginglinea_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['staginglinea_Bytes']>;
  delegate?: Maybe<Scalars['staginglinea_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['staginglinea_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['staginglinea_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['staginglinea_Bytes']>;
  asset?: Maybe<staginglinea_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['staginglinea_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['staginglinea_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['staginglinea_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['staginglinea_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['staginglinea_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['staginglinea_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type staginglinea_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_Router_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_Router_filter>;
};

export type staginglinea_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transferId_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<staginglinea_TransferStatus>;
  status_not?: InputMaybe<staginglinea_TransferStatus>;
  status_in?: InputMaybe<Array<staginglinea_TransferStatus>>;
  status_not_in?: InputMaybe<Array<staginglinea_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<staginglinea_Router_filter>;
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
  to?: InputMaybe<Scalars['staginglinea_Bytes']>;
  to_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  to_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  delegate?: InputMaybe<Scalars['staginglinea_Bytes']>;
  delegate_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['staginglinea_Bytes']>;
  callData_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
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
  originSender?: InputMaybe<Scalars['staginglinea_Bytes']>;
  originSender_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['staginglinea_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
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
  asset_?: InputMaybe<staginglinea_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['staginglinea_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['staginglinea_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['staginglinea_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['staginglinea_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['staginglinea_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['staginglinea_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginglinea_BlockChangedFilter>;
};

export type staginglinea_DestinationTransfer_orderBy =
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

export type staginglinea_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['staginglinea_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type staginglinea_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['staginglinea_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
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
  _change_block?: InputMaybe<staginglinea_BlockChangedFilter>;
};

export type staginglinea_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type staginglinea_OrderDirection =
  | 'asc'
  | 'desc';

export type staginglinea_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['staginglinea_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['staginglinea_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['staginglinea_Bytes']>;
  root?: Maybe<Scalars['staginglinea_Bytes']>;
  transactionHash?: Maybe<Scalars['staginglinea_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<staginglinea_RootCount>;
};

export type staginglinea_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transferId_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['staginglinea_Bytes']>;
  leaf_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['staginglinea_Bytes']>;
  message_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  message_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  root?: InputMaybe<Scalars['staginglinea_Bytes']>;
  root_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  root_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactionHash?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
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
  rootCount_?: InputMaybe<staginglinea_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginglinea_BlockChangedFilter>;
};

export type staginglinea_OriginMessage_orderBy =
  | 'id'
  | 'transferId'
  | 'destinationDomain'
  | 'leaf'
  | 'index'
  | 'message'
  | 'root'
  | 'transactionHash'
  | 'blockNumber'
  | 'rootCount';

export type staginglinea_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['staginglinea_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<staginglinea_TransferStatus>;
  messageHash?: Maybe<Scalars['staginglinea_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['staginglinea_Bytes']>;
  delegate?: Maybe<Scalars['staginglinea_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['staginglinea_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['staginglinea_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['staginglinea_Bytes']>;
  asset?: Maybe<staginglinea_Asset>;
  transactingAsset?: Maybe<Scalars['staginglinea_Bytes']>;
  message?: Maybe<staginglinea_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<staginglinea_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['staginglinea_Bytes']>;
  caller?: Maybe<Scalars['staginglinea_Bytes']>;
  transactionHash?: Maybe<Scalars['staginglinea_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['staginglinea_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type staginglinea_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_RelayerFee_filter>;
};

export type staginglinea_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transferId_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<staginglinea_TransferStatus>;
  status_not?: InputMaybe<staginglinea_TransferStatus>;
  status_in?: InputMaybe<Array<staginglinea_TransferStatus>>;
  status_not_in?: InputMaybe<Array<staginglinea_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['staginglinea_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
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
  to?: InputMaybe<Scalars['staginglinea_Bytes']>;
  to_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  to_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  delegate?: InputMaybe<Scalars['staginglinea_Bytes']>;
  delegate_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['staginglinea_Bytes']>;
  callData_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['staginglinea_Bytes']>;
  originSender_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['staginglinea_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
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
  asset_?: InputMaybe<staginglinea_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
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
  message_?: InputMaybe<staginglinea_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<staginglinea_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['staginglinea_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  caller?: InputMaybe<Scalars['staginglinea_Bytes']>;
  caller_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactionHash?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['staginglinea_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginglinea_BlockChangedFilter>;
};

export type staginglinea_OriginTransfer_orderBy =
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
  | 'transactingAsset'
  | 'message'
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
  staginglinea_asset?: Maybe<staginglinea_Asset>;
  staginglinea_assets: Array<staginglinea_Asset>;
  staginglinea_assetStatus?: Maybe<staginglinea_AssetStatus>;
  staginglinea_assetStatuses: Array<staginglinea_AssetStatus>;
  staginglinea_assetBalance?: Maybe<staginglinea_AssetBalance>;
  staginglinea_assetBalances: Array<staginglinea_AssetBalance>;
  staginglinea_router?: Maybe<staginglinea_Router>;
  staginglinea_routers: Array<staginglinea_Router>;
  staginglinea_routerDailyTVL?: Maybe<staginglinea_RouterDailyTVL>;
  staginglinea_routerDailyTVLs: Array<staginglinea_RouterDailyTVL>;
  staginglinea_routerLiquidityEvent?: Maybe<staginglinea_RouterLiquidityEvent>;
  staginglinea_routerLiquidityEvents: Array<staginglinea_RouterLiquidityEvent>;
  staginglinea_setting?: Maybe<staginglinea_Setting>;
  staginglinea_settings: Array<staginglinea_Setting>;
  staginglinea_relayer?: Maybe<staginglinea_Relayer>;
  staginglinea_relayers: Array<staginglinea_Relayer>;
  staginglinea_sequencer?: Maybe<staginglinea_Sequencer>;
  staginglinea_sequencers: Array<staginglinea_Sequencer>;
  staginglinea_relayerFee?: Maybe<staginglinea_RelayerFee>;
  staginglinea_relayerFees: Array<staginglinea_RelayerFee>;
  staginglinea_originTransfer?: Maybe<staginglinea_OriginTransfer>;
  staginglinea_originTransfers: Array<staginglinea_OriginTransfer>;
  staginglinea_destinationTransfer?: Maybe<staginglinea_DestinationTransfer>;
  staginglinea_destinationTransfers: Array<staginglinea_DestinationTransfer>;
  staginglinea_originMessage?: Maybe<staginglinea_OriginMessage>;
  staginglinea_originMessages: Array<staginglinea_OriginMessage>;
  staginglinea_aggregateRoot?: Maybe<staginglinea_AggregateRoot>;
  staginglinea_aggregateRoots: Array<staginglinea_AggregateRoot>;
  staginglinea_connectorMeta?: Maybe<staginglinea_ConnectorMeta>;
  staginglinea_connectorMetas: Array<staginglinea_ConnectorMeta>;
  staginglinea_rootCount?: Maybe<staginglinea_RootCount>;
  staginglinea_rootCounts: Array<staginglinea_RootCount>;
  staginglinea_rootMessageSent?: Maybe<staginglinea_RootMessageSent>;
  staginglinea_rootMessageSents: Array<staginglinea_RootMessageSent>;
  staginglinea_relayerFeesIncrease?: Maybe<staginglinea_RelayerFeesIncrease>;
  staginglinea_relayerFeesIncreases: Array<staginglinea_RelayerFeesIncrease>;
  staginglinea_slippageUpdate?: Maybe<staginglinea_SlippageUpdate>;
  staginglinea_slippageUpdates: Array<staginglinea_SlippageUpdate>;
  staginglinea_snapshotRoot?: Maybe<staginglinea_SnapshotRoot>;
  staginglinea_snapshotRoots: Array<staginglinea_SnapshotRoot>;
  staginglinea_spokeConnectorMode?: Maybe<staginglinea_SpokeConnectorMode>;
  staginglinea_spokeConnectorModes: Array<staginglinea_SpokeConnectorMode>;
  staginglinea_aggregateRootProposed?: Maybe<staginglinea_AggregateRootProposed>;
  staginglinea_aggregateRootProposeds: Array<staginglinea_AggregateRootProposed>;
  staginglinea_optimisticRootFinalized?: Maybe<staginglinea_OptimisticRootFinalized>;
  staginglinea_optimisticRootFinalizeds: Array<staginglinea_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  staginglinea__meta?: Maybe<staginglinea__Meta_>;
};


export type Querystaginglinea_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_Asset_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_Asset_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_AssetStatus_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_AssetBalance_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_Router_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_Router_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_RouterDailyTVL_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_RouterLiquidityEvent_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_Setting_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_Setting_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_Relayer_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_Relayer_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_Sequencer_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_Sequencer_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_RelayerFee_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_OriginTransfer_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_DestinationTransfer_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_OriginMessage_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_AggregateRoot_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_ConnectorMeta_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_RootCount_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_RootCount_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_RootMessageSent_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_RelayerFeesIncrease_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_SlippageUpdate_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_SnapshotRoot_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_SpokeConnectorMode_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_AggregateRootProposed_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_OptimisticRootFinalized_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginglinea__metaArgs = {
  block?: InputMaybe<staginglinea_Block_height>;
};

export type staginglinea_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['staginglinea_Bytes']>;
};

export type staginglinea_RelayerFee = {
  id: Scalars['ID'];
  transfer: staginglinea_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['staginglinea_Bytes'];
};

export type staginglinea_RelayerFee_filter = {
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
  transfer_?: InputMaybe<staginglinea_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['staginglinea_Bytes']>;
  asset_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginglinea_BlockChangedFilter>;
};

export type staginglinea_RelayerFee_orderBy =
  | 'id'
  | 'transfer'
  | 'fee'
  | 'asset';

export type staginglinea_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: staginglinea_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['staginglinea_Bytes']>;
  caller: Scalars['staginglinea_Bytes'];
  transactionHash: Scalars['staginglinea_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type staginglinea_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<staginglinea_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['staginglinea_Bytes']>;
  asset_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  caller?: InputMaybe<Scalars['staginglinea_Bytes']>;
  caller_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactionHash?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
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
  _change_block?: InputMaybe<staginglinea_BlockChangedFilter>;
};

export type staginglinea_RelayerFeesIncrease_orderBy =
  | 'id'
  | 'transfer'
  | 'increase'
  | 'asset'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type staginglinea_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['staginglinea_Bytes']>;
  relayer_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginglinea_BlockChangedFilter>;
};

export type staginglinea_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type staginglinea_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type staginglinea_RootCount_filter = {
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
  _change_block?: InputMaybe<staginglinea_BlockChangedFilter>;
};

export type staginglinea_RootCount_orderBy =
  | 'id'
  | 'count';

export type staginglinea_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['staginglinea_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['staginglinea_Bytes']>;
  transactionHash?: Maybe<Scalars['staginglinea_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type staginglinea_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['staginglinea_Bytes']>;
  root_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  root_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['staginglinea_Bytes']>;
  caller_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactionHash?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
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
  _change_block?: InputMaybe<staginglinea_BlockChangedFilter>;
};

export type staginglinea_RootMessageSent_orderBy =
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

export type staginglinea_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['staginglinea_Bytes']>;
  recipient?: Maybe<Scalars['staginglinea_Bytes']>;
  proposedOwner?: Maybe<Scalars['staginglinea_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<staginglinea_AssetBalance>;
};


export type staginglinea_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_AssetBalance_filter>;
};

export type staginglinea_RouterDailyTVL = {
  id: Scalars['ID'];
  router: staginglinea_Router;
  asset: staginglinea_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type staginglinea_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<staginglinea_Router_filter>;
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
  asset_?: InputMaybe<staginglinea_Asset_filter>;
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
  _change_block?: InputMaybe<staginglinea_BlockChangedFilter>;
};

export type staginglinea_RouterDailyTVL_orderBy =
  | 'id'
  | 'router'
  | 'asset'
  | 'timestamp'
  | 'balance';

export type staginglinea_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<staginglinea_RouterLiquidityEventType>;
  router: staginglinea_Router;
  asset: staginglinea_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['staginglinea_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['staginglinea_Bytes'];
  nonce: Scalars['BigInt'];
};

export type staginglinea_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type staginglinea_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<staginglinea_RouterLiquidityEventType>;
  type_not?: InputMaybe<staginglinea_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<staginglinea_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<staginglinea_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<staginglinea_Router_filter>;
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
  asset_?: InputMaybe<staginglinea_Asset_filter>;
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
  caller?: InputMaybe<Scalars['staginglinea_Bytes']>;
  caller_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginglinea_BlockChangedFilter>;
};

export type staginglinea_RouterLiquidityEvent_orderBy =
  | 'id'
  | 'type'
  | 'router'
  | 'asset'
  | 'amount'
  | 'balance'
  | 'caller'
  | 'blockNumber'
  | 'timestamp'
  | 'transactionHash'
  | 'nonce';

export type staginglinea_Router_filter = {
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
  owner?: InputMaybe<Scalars['staginglinea_Bytes']>;
  owner_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  recipient?: InputMaybe<Scalars['staginglinea_Bytes']>;
  recipient_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['staginglinea_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<staginglinea_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginglinea_BlockChangedFilter>;
};

export type staginglinea_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type staginglinea_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['staginglinea_Bytes']>;
};

export type staginglinea_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['staginglinea_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginglinea_BlockChangedFilter>;
};

export type staginglinea_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type staginglinea_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['staginglinea_Bytes'];
};

export type staginglinea_Setting_filter = {
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
  caller?: InputMaybe<Scalars['staginglinea_Bytes']>;
  caller_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginglinea_BlockChangedFilter>;
};

export type staginglinea_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type staginglinea_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: staginglinea_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['staginglinea_Bytes'];
  transactionHash: Scalars['staginglinea_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type staginglinea_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<staginglinea_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['staginglinea_Bytes']>;
  caller_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactionHash?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
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
  _change_block?: InputMaybe<staginglinea_BlockChangedFilter>;
};

export type staginglinea_SlippageUpdate_orderBy =
  | 'id'
  | 'transfer'
  | 'slippage'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type staginglinea_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['staginglinea_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type staginglinea_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['staginglinea_Bytes']>;
  root_not?: InputMaybe<Scalars['staginglinea_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['staginglinea_Bytes']>>;
  root_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['staginglinea_Bytes']>;
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
  _change_block?: InputMaybe<staginglinea_BlockChangedFilter>;
};

export type staginglinea_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type staginglinea_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type staginglinea_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<staginglinea_BlockChangedFilter>;
};

export type staginglinea_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  staginglinea_asset?: Maybe<staginglinea_Asset>;
  staginglinea_assets: Array<staginglinea_Asset>;
  staginglinea_assetStatus?: Maybe<staginglinea_AssetStatus>;
  staginglinea_assetStatuses: Array<staginglinea_AssetStatus>;
  staginglinea_assetBalance?: Maybe<staginglinea_AssetBalance>;
  staginglinea_assetBalances: Array<staginglinea_AssetBalance>;
  staginglinea_router?: Maybe<staginglinea_Router>;
  staginglinea_routers: Array<staginglinea_Router>;
  staginglinea_routerDailyTVL?: Maybe<staginglinea_RouterDailyTVL>;
  staginglinea_routerDailyTVLs: Array<staginglinea_RouterDailyTVL>;
  staginglinea_routerLiquidityEvent?: Maybe<staginglinea_RouterLiquidityEvent>;
  staginglinea_routerLiquidityEvents: Array<staginglinea_RouterLiquidityEvent>;
  staginglinea_setting?: Maybe<staginglinea_Setting>;
  staginglinea_settings: Array<staginglinea_Setting>;
  staginglinea_relayer?: Maybe<staginglinea_Relayer>;
  staginglinea_relayers: Array<staginglinea_Relayer>;
  staginglinea_sequencer?: Maybe<staginglinea_Sequencer>;
  staginglinea_sequencers: Array<staginglinea_Sequencer>;
  staginglinea_relayerFee?: Maybe<staginglinea_RelayerFee>;
  staginglinea_relayerFees: Array<staginglinea_RelayerFee>;
  staginglinea_originTransfer?: Maybe<staginglinea_OriginTransfer>;
  staginglinea_originTransfers: Array<staginglinea_OriginTransfer>;
  staginglinea_destinationTransfer?: Maybe<staginglinea_DestinationTransfer>;
  staginglinea_destinationTransfers: Array<staginglinea_DestinationTransfer>;
  staginglinea_originMessage?: Maybe<staginglinea_OriginMessage>;
  staginglinea_originMessages: Array<staginglinea_OriginMessage>;
  staginglinea_aggregateRoot?: Maybe<staginglinea_AggregateRoot>;
  staginglinea_aggregateRoots: Array<staginglinea_AggregateRoot>;
  staginglinea_connectorMeta?: Maybe<staginglinea_ConnectorMeta>;
  staginglinea_connectorMetas: Array<staginglinea_ConnectorMeta>;
  staginglinea_rootCount?: Maybe<staginglinea_RootCount>;
  staginglinea_rootCounts: Array<staginglinea_RootCount>;
  staginglinea_rootMessageSent?: Maybe<staginglinea_RootMessageSent>;
  staginglinea_rootMessageSents: Array<staginglinea_RootMessageSent>;
  staginglinea_relayerFeesIncrease?: Maybe<staginglinea_RelayerFeesIncrease>;
  staginglinea_relayerFeesIncreases: Array<staginglinea_RelayerFeesIncrease>;
  staginglinea_slippageUpdate?: Maybe<staginglinea_SlippageUpdate>;
  staginglinea_slippageUpdates: Array<staginglinea_SlippageUpdate>;
  staginglinea_snapshotRoot?: Maybe<staginglinea_SnapshotRoot>;
  staginglinea_snapshotRoots: Array<staginglinea_SnapshotRoot>;
  staginglinea_spokeConnectorMode?: Maybe<staginglinea_SpokeConnectorMode>;
  staginglinea_spokeConnectorModes: Array<staginglinea_SpokeConnectorMode>;
  staginglinea_aggregateRootProposed?: Maybe<staginglinea_AggregateRootProposed>;
  staginglinea_aggregateRootProposeds: Array<staginglinea_AggregateRootProposed>;
  staginglinea_optimisticRootFinalized?: Maybe<staginglinea_OptimisticRootFinalized>;
  staginglinea_optimisticRootFinalizeds: Array<staginglinea_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  staginglinea__meta?: Maybe<staginglinea__Meta_>;
};


export type Subscriptionstaginglinea_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_Asset_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_Asset_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_AssetStatus_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_AssetBalance_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_Router_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_Router_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_RouterDailyTVL_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_RouterLiquidityEvent_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_Setting_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_Setting_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_Relayer_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_Relayer_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_Sequencer_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_Sequencer_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_RelayerFee_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_OriginTransfer_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_DestinationTransfer_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_OriginMessage_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_AggregateRoot_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_ConnectorMeta_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_RootCount_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_RootCount_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_RootMessageSent_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_RelayerFeesIncrease_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_SlippageUpdate_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_SnapshotRoot_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_SpokeConnectorMode_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_AggregateRootProposed_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginglinea_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<staginglinea_OrderDirection>;
  where?: InputMaybe<staginglinea_OptimisticRootFinalized_filter>;
  block?: InputMaybe<staginglinea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginglinea__metaArgs = {
  block?: InputMaybe<staginglinea_Block_height>;
};

export type staginglinea_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type staginglinea__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['staginglinea_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type staginglinea__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: staginglinea__Block_;
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
  staginglinea_asset: InContextSdkMethod<Query['staginglinea_asset'], Querystaginglinea_assetArgs, MeshContext>,
  /** null **/
  staginglinea_assets: InContextSdkMethod<Query['staginglinea_assets'], Querystaginglinea_assetsArgs, MeshContext>,
  /** null **/
  staginglinea_assetStatus: InContextSdkMethod<Query['staginglinea_assetStatus'], Querystaginglinea_assetStatusArgs, MeshContext>,
  /** null **/
  staginglinea_assetStatuses: InContextSdkMethod<Query['staginglinea_assetStatuses'], Querystaginglinea_assetStatusesArgs, MeshContext>,
  /** null **/
  staginglinea_assetBalance: InContextSdkMethod<Query['staginglinea_assetBalance'], Querystaginglinea_assetBalanceArgs, MeshContext>,
  /** null **/
  staginglinea_assetBalances: InContextSdkMethod<Query['staginglinea_assetBalances'], Querystaginglinea_assetBalancesArgs, MeshContext>,
  /** null **/
  staginglinea_router: InContextSdkMethod<Query['staginglinea_router'], Querystaginglinea_routerArgs, MeshContext>,
  /** null **/
  staginglinea_routers: InContextSdkMethod<Query['staginglinea_routers'], Querystaginglinea_routersArgs, MeshContext>,
  /** null **/
  staginglinea_routerDailyTVL: InContextSdkMethod<Query['staginglinea_routerDailyTVL'], Querystaginglinea_routerDailyTVLArgs, MeshContext>,
  /** null **/
  staginglinea_routerDailyTVLs: InContextSdkMethod<Query['staginglinea_routerDailyTVLs'], Querystaginglinea_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  staginglinea_routerLiquidityEvent: InContextSdkMethod<Query['staginglinea_routerLiquidityEvent'], Querystaginglinea_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  staginglinea_routerLiquidityEvents: InContextSdkMethod<Query['staginglinea_routerLiquidityEvents'], Querystaginglinea_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  staginglinea_setting: InContextSdkMethod<Query['staginglinea_setting'], Querystaginglinea_settingArgs, MeshContext>,
  /** null **/
  staginglinea_settings: InContextSdkMethod<Query['staginglinea_settings'], Querystaginglinea_settingsArgs, MeshContext>,
  /** null **/
  staginglinea_relayer: InContextSdkMethod<Query['staginglinea_relayer'], Querystaginglinea_relayerArgs, MeshContext>,
  /** null **/
  staginglinea_relayers: InContextSdkMethod<Query['staginglinea_relayers'], Querystaginglinea_relayersArgs, MeshContext>,
  /** null **/
  staginglinea_sequencer: InContextSdkMethod<Query['staginglinea_sequencer'], Querystaginglinea_sequencerArgs, MeshContext>,
  /** null **/
  staginglinea_sequencers: InContextSdkMethod<Query['staginglinea_sequencers'], Querystaginglinea_sequencersArgs, MeshContext>,
  /** null **/
  staginglinea_relayerFee: InContextSdkMethod<Query['staginglinea_relayerFee'], Querystaginglinea_relayerFeeArgs, MeshContext>,
  /** null **/
  staginglinea_relayerFees: InContextSdkMethod<Query['staginglinea_relayerFees'], Querystaginglinea_relayerFeesArgs, MeshContext>,
  /** null **/
  staginglinea_originTransfer: InContextSdkMethod<Query['staginglinea_originTransfer'], Querystaginglinea_originTransferArgs, MeshContext>,
  /** null **/
  staginglinea_originTransfers: InContextSdkMethod<Query['staginglinea_originTransfers'], Querystaginglinea_originTransfersArgs, MeshContext>,
  /** null **/
  staginglinea_destinationTransfer: InContextSdkMethod<Query['staginglinea_destinationTransfer'], Querystaginglinea_destinationTransferArgs, MeshContext>,
  /** null **/
  staginglinea_destinationTransfers: InContextSdkMethod<Query['staginglinea_destinationTransfers'], Querystaginglinea_destinationTransfersArgs, MeshContext>,
  /** null **/
  staginglinea_originMessage: InContextSdkMethod<Query['staginglinea_originMessage'], Querystaginglinea_originMessageArgs, MeshContext>,
  /** null **/
  staginglinea_originMessages: InContextSdkMethod<Query['staginglinea_originMessages'], Querystaginglinea_originMessagesArgs, MeshContext>,
  /** null **/
  staginglinea_aggregateRoot: InContextSdkMethod<Query['staginglinea_aggregateRoot'], Querystaginglinea_aggregateRootArgs, MeshContext>,
  /** null **/
  staginglinea_aggregateRoots: InContextSdkMethod<Query['staginglinea_aggregateRoots'], Querystaginglinea_aggregateRootsArgs, MeshContext>,
  /** null **/
  staginglinea_connectorMeta: InContextSdkMethod<Query['staginglinea_connectorMeta'], Querystaginglinea_connectorMetaArgs, MeshContext>,
  /** null **/
  staginglinea_connectorMetas: InContextSdkMethod<Query['staginglinea_connectorMetas'], Querystaginglinea_connectorMetasArgs, MeshContext>,
  /** null **/
  staginglinea_rootCount: InContextSdkMethod<Query['staginglinea_rootCount'], Querystaginglinea_rootCountArgs, MeshContext>,
  /** null **/
  staginglinea_rootCounts: InContextSdkMethod<Query['staginglinea_rootCounts'], Querystaginglinea_rootCountsArgs, MeshContext>,
  /** null **/
  staginglinea_rootMessageSent: InContextSdkMethod<Query['staginglinea_rootMessageSent'], Querystaginglinea_rootMessageSentArgs, MeshContext>,
  /** null **/
  staginglinea_rootMessageSents: InContextSdkMethod<Query['staginglinea_rootMessageSents'], Querystaginglinea_rootMessageSentsArgs, MeshContext>,
  /** null **/
  staginglinea_relayerFeesIncrease: InContextSdkMethod<Query['staginglinea_relayerFeesIncrease'], Querystaginglinea_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  staginglinea_relayerFeesIncreases: InContextSdkMethod<Query['staginglinea_relayerFeesIncreases'], Querystaginglinea_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  staginglinea_slippageUpdate: InContextSdkMethod<Query['staginglinea_slippageUpdate'], Querystaginglinea_slippageUpdateArgs, MeshContext>,
  /** null **/
  staginglinea_slippageUpdates: InContextSdkMethod<Query['staginglinea_slippageUpdates'], Querystaginglinea_slippageUpdatesArgs, MeshContext>,
  /** null **/
  staginglinea_snapshotRoot: InContextSdkMethod<Query['staginglinea_snapshotRoot'], Querystaginglinea_snapshotRootArgs, MeshContext>,
  /** null **/
  staginglinea_snapshotRoots: InContextSdkMethod<Query['staginglinea_snapshotRoots'], Querystaginglinea_snapshotRootsArgs, MeshContext>,
  /** null **/
  staginglinea_spokeConnectorMode: InContextSdkMethod<Query['staginglinea_spokeConnectorMode'], Querystaginglinea_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  staginglinea_spokeConnectorModes: InContextSdkMethod<Query['staginglinea_spokeConnectorModes'], Querystaginglinea_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  staginglinea_aggregateRootProposed: InContextSdkMethod<Query['staginglinea_aggregateRootProposed'], Querystaginglinea_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  staginglinea_aggregateRootProposeds: InContextSdkMethod<Query['staginglinea_aggregateRootProposeds'], Querystaginglinea_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  staginglinea_optimisticRootFinalized: InContextSdkMethod<Query['staginglinea_optimisticRootFinalized'], Querystaginglinea_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  staginglinea_optimisticRootFinalizeds: InContextSdkMethod<Query['staginglinea_optimisticRootFinalizeds'], Querystaginglinea_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  staginglinea__meta: InContextSdkMethod<Query['staginglinea__meta'], Querystaginglinea__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  staginglinea_asset: InContextSdkMethod<Subscription['staginglinea_asset'], Subscriptionstaginglinea_assetArgs, MeshContext>,
  /** null **/
  staginglinea_assets: InContextSdkMethod<Subscription['staginglinea_assets'], Subscriptionstaginglinea_assetsArgs, MeshContext>,
  /** null **/
  staginglinea_assetStatus: InContextSdkMethod<Subscription['staginglinea_assetStatus'], Subscriptionstaginglinea_assetStatusArgs, MeshContext>,
  /** null **/
  staginglinea_assetStatuses: InContextSdkMethod<Subscription['staginglinea_assetStatuses'], Subscriptionstaginglinea_assetStatusesArgs, MeshContext>,
  /** null **/
  staginglinea_assetBalance: InContextSdkMethod<Subscription['staginglinea_assetBalance'], Subscriptionstaginglinea_assetBalanceArgs, MeshContext>,
  /** null **/
  staginglinea_assetBalances: InContextSdkMethod<Subscription['staginglinea_assetBalances'], Subscriptionstaginglinea_assetBalancesArgs, MeshContext>,
  /** null **/
  staginglinea_router: InContextSdkMethod<Subscription['staginglinea_router'], Subscriptionstaginglinea_routerArgs, MeshContext>,
  /** null **/
  staginglinea_routers: InContextSdkMethod<Subscription['staginglinea_routers'], Subscriptionstaginglinea_routersArgs, MeshContext>,
  /** null **/
  staginglinea_routerDailyTVL: InContextSdkMethod<Subscription['staginglinea_routerDailyTVL'], Subscriptionstaginglinea_routerDailyTVLArgs, MeshContext>,
  /** null **/
  staginglinea_routerDailyTVLs: InContextSdkMethod<Subscription['staginglinea_routerDailyTVLs'], Subscriptionstaginglinea_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  staginglinea_routerLiquidityEvent: InContextSdkMethod<Subscription['staginglinea_routerLiquidityEvent'], Subscriptionstaginglinea_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  staginglinea_routerLiquidityEvents: InContextSdkMethod<Subscription['staginglinea_routerLiquidityEvents'], Subscriptionstaginglinea_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  staginglinea_setting: InContextSdkMethod<Subscription['staginglinea_setting'], Subscriptionstaginglinea_settingArgs, MeshContext>,
  /** null **/
  staginglinea_settings: InContextSdkMethod<Subscription['staginglinea_settings'], Subscriptionstaginglinea_settingsArgs, MeshContext>,
  /** null **/
  staginglinea_relayer: InContextSdkMethod<Subscription['staginglinea_relayer'], Subscriptionstaginglinea_relayerArgs, MeshContext>,
  /** null **/
  staginglinea_relayers: InContextSdkMethod<Subscription['staginglinea_relayers'], Subscriptionstaginglinea_relayersArgs, MeshContext>,
  /** null **/
  staginglinea_sequencer: InContextSdkMethod<Subscription['staginglinea_sequencer'], Subscriptionstaginglinea_sequencerArgs, MeshContext>,
  /** null **/
  staginglinea_sequencers: InContextSdkMethod<Subscription['staginglinea_sequencers'], Subscriptionstaginglinea_sequencersArgs, MeshContext>,
  /** null **/
  staginglinea_relayerFee: InContextSdkMethod<Subscription['staginglinea_relayerFee'], Subscriptionstaginglinea_relayerFeeArgs, MeshContext>,
  /** null **/
  staginglinea_relayerFees: InContextSdkMethod<Subscription['staginglinea_relayerFees'], Subscriptionstaginglinea_relayerFeesArgs, MeshContext>,
  /** null **/
  staginglinea_originTransfer: InContextSdkMethod<Subscription['staginglinea_originTransfer'], Subscriptionstaginglinea_originTransferArgs, MeshContext>,
  /** null **/
  staginglinea_originTransfers: InContextSdkMethod<Subscription['staginglinea_originTransfers'], Subscriptionstaginglinea_originTransfersArgs, MeshContext>,
  /** null **/
  staginglinea_destinationTransfer: InContextSdkMethod<Subscription['staginglinea_destinationTransfer'], Subscriptionstaginglinea_destinationTransferArgs, MeshContext>,
  /** null **/
  staginglinea_destinationTransfers: InContextSdkMethod<Subscription['staginglinea_destinationTransfers'], Subscriptionstaginglinea_destinationTransfersArgs, MeshContext>,
  /** null **/
  staginglinea_originMessage: InContextSdkMethod<Subscription['staginglinea_originMessage'], Subscriptionstaginglinea_originMessageArgs, MeshContext>,
  /** null **/
  staginglinea_originMessages: InContextSdkMethod<Subscription['staginglinea_originMessages'], Subscriptionstaginglinea_originMessagesArgs, MeshContext>,
  /** null **/
  staginglinea_aggregateRoot: InContextSdkMethod<Subscription['staginglinea_aggregateRoot'], Subscriptionstaginglinea_aggregateRootArgs, MeshContext>,
  /** null **/
  staginglinea_aggregateRoots: InContextSdkMethod<Subscription['staginglinea_aggregateRoots'], Subscriptionstaginglinea_aggregateRootsArgs, MeshContext>,
  /** null **/
  staginglinea_connectorMeta: InContextSdkMethod<Subscription['staginglinea_connectorMeta'], Subscriptionstaginglinea_connectorMetaArgs, MeshContext>,
  /** null **/
  staginglinea_connectorMetas: InContextSdkMethod<Subscription['staginglinea_connectorMetas'], Subscriptionstaginglinea_connectorMetasArgs, MeshContext>,
  /** null **/
  staginglinea_rootCount: InContextSdkMethod<Subscription['staginglinea_rootCount'], Subscriptionstaginglinea_rootCountArgs, MeshContext>,
  /** null **/
  staginglinea_rootCounts: InContextSdkMethod<Subscription['staginglinea_rootCounts'], Subscriptionstaginglinea_rootCountsArgs, MeshContext>,
  /** null **/
  staginglinea_rootMessageSent: InContextSdkMethod<Subscription['staginglinea_rootMessageSent'], Subscriptionstaginglinea_rootMessageSentArgs, MeshContext>,
  /** null **/
  staginglinea_rootMessageSents: InContextSdkMethod<Subscription['staginglinea_rootMessageSents'], Subscriptionstaginglinea_rootMessageSentsArgs, MeshContext>,
  /** null **/
  staginglinea_relayerFeesIncrease: InContextSdkMethod<Subscription['staginglinea_relayerFeesIncrease'], Subscriptionstaginglinea_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  staginglinea_relayerFeesIncreases: InContextSdkMethod<Subscription['staginglinea_relayerFeesIncreases'], Subscriptionstaginglinea_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  staginglinea_slippageUpdate: InContextSdkMethod<Subscription['staginglinea_slippageUpdate'], Subscriptionstaginglinea_slippageUpdateArgs, MeshContext>,
  /** null **/
  staginglinea_slippageUpdates: InContextSdkMethod<Subscription['staginglinea_slippageUpdates'], Subscriptionstaginglinea_slippageUpdatesArgs, MeshContext>,
  /** null **/
  staginglinea_snapshotRoot: InContextSdkMethod<Subscription['staginglinea_snapshotRoot'], Subscriptionstaginglinea_snapshotRootArgs, MeshContext>,
  /** null **/
  staginglinea_snapshotRoots: InContextSdkMethod<Subscription['staginglinea_snapshotRoots'], Subscriptionstaginglinea_snapshotRootsArgs, MeshContext>,
  /** null **/
  staginglinea_spokeConnectorMode: InContextSdkMethod<Subscription['staginglinea_spokeConnectorMode'], Subscriptionstaginglinea_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  staginglinea_spokeConnectorModes: InContextSdkMethod<Subscription['staginglinea_spokeConnectorModes'], Subscriptionstaginglinea_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  staginglinea_aggregateRootProposed: InContextSdkMethod<Subscription['staginglinea_aggregateRootProposed'], Subscriptionstaginglinea_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  staginglinea_aggregateRootProposeds: InContextSdkMethod<Subscription['staginglinea_aggregateRootProposeds'], Subscriptionstaginglinea_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  staginglinea_optimisticRootFinalized: InContextSdkMethod<Subscription['staginglinea_optimisticRootFinalized'], Subscriptionstaginglinea_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  staginglinea_optimisticRootFinalizeds: InContextSdkMethod<Subscription['staginglinea_optimisticRootFinalizeds'], Subscriptionstaginglinea_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  staginglinea__meta: InContextSdkMethod<Subscription['staginglinea__meta'], Subscriptionstaginglinea__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Staging_Linea"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
