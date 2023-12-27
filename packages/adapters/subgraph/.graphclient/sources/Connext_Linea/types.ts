// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextLineaTypes {
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
  linea_BigDecimal: any;
  BigInt: any;
  linea_Bytes: any;
};

export type linea_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['linea_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type linea_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['linea_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type linea_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['linea_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['linea_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['linea_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
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
  _change_block?: InputMaybe<linea_BlockChangedFilter>;
};

export type linea_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type linea_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['linea_Bytes']>;
  root_not?: InputMaybe<Scalars['linea_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  root_contains?: InputMaybe<Scalars['linea_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<linea_BlockChangedFilter>;
};

export type linea_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type linea_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['linea_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['linea_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['linea_Bytes']>;
  localAsset?: Maybe<Scalars['linea_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<linea_AssetStatus>;
};

export type linea_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: linea_Router;
  asset: linea_Asset;
  feesEarned: Scalars['BigInt'];
};

export type linea_AssetBalance_filter = {
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
  router_?: InputMaybe<linea_Router_filter>;
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
  asset_?: InputMaybe<linea_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<linea_BlockChangedFilter>;
};

export type linea_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'locked'
  | 'supplied'
  | 'removed'
  | 'router'
  | 'asset'
  | 'feesEarned';

export type linea_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type linea_AssetStatus_filter = {
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
  _change_block?: InputMaybe<linea_BlockChangedFilter>;
};

export type linea_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type linea_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['linea_Bytes']>;
  key_not?: InputMaybe<Scalars['linea_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  key_contains?: InputMaybe<Scalars['linea_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['linea_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['linea_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['linea_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['linea_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['linea_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['linea_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  localAsset?: InputMaybe<Scalars['linea_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['linea_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['linea_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
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
  status_?: InputMaybe<linea_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<linea_BlockChangedFilter>;
};

export type linea_Asset_orderBy =
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

export type linea_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type linea_Block_height = {
  hash?: InputMaybe<Scalars['linea_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type linea_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['linea_Bytes']>;
  rootManager?: Maybe<Scalars['linea_Bytes']>;
  mirrorConnector?: Maybe<Scalars['linea_Bytes']>;
};

export type linea_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['linea_Bytes']>;
  amb_not?: InputMaybe<Scalars['linea_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['linea_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  rootManager?: InputMaybe<Scalars['linea_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['linea_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['linea_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['linea_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['linea_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['linea_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<linea_BlockChangedFilter>;
};

export type linea_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type linea_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['linea_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<linea_TransferStatus>;
  routers?: Maybe<Array<linea_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['linea_Bytes']>;
  delegate?: Maybe<Scalars['linea_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['linea_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['linea_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['linea_Bytes']>;
  asset?: Maybe<linea_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['linea_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['linea_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['linea_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['linea_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['linea_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['linea_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type linea_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_Router_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_Router_filter>;
};

export type linea_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['linea_Bytes']>;
  transferId_not?: InputMaybe<Scalars['linea_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['linea_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<linea_TransferStatus>;
  status_not?: InputMaybe<linea_TransferStatus>;
  status_in?: InputMaybe<Array<linea_TransferStatus>>;
  status_not_in?: InputMaybe<Array<linea_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<linea_Router_filter>;
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
  to?: InputMaybe<Scalars['linea_Bytes']>;
  to_not?: InputMaybe<Scalars['linea_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  to_contains?: InputMaybe<Scalars['linea_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  delegate?: InputMaybe<Scalars['linea_Bytes']>;
  delegate_not?: InputMaybe<Scalars['linea_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['linea_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['linea_Bytes']>;
  callData_not?: InputMaybe<Scalars['linea_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['linea_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
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
  originSender?: InputMaybe<Scalars['linea_Bytes']>;
  originSender_not?: InputMaybe<Scalars['linea_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['linea_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['linea_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['linea_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['linea_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
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
  asset_?: InputMaybe<linea_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['linea_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['linea_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['linea_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['linea_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['linea_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['linea_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['linea_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['linea_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['linea_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['linea_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['linea_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['linea_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['linea_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['linea_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['linea_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['linea_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['linea_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['linea_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<linea_BlockChangedFilter>;
};

export type linea_DestinationTransfer_orderBy =
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

export type linea_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['linea_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type linea_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['linea_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['linea_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['linea_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
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
  _change_block?: InputMaybe<linea_BlockChangedFilter>;
};

export type linea_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type linea_OrderDirection =
  | 'asc'
  | 'desc';

export type linea_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['linea_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['linea_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['linea_Bytes']>;
  root?: Maybe<Scalars['linea_Bytes']>;
  transactionHash?: Maybe<Scalars['linea_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<linea_RootCount>;
};

export type linea_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['linea_Bytes']>;
  transferId_not?: InputMaybe<Scalars['linea_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['linea_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['linea_Bytes']>;
  leaf_not?: InputMaybe<Scalars['linea_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['linea_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['linea_Bytes']>;
  message_not?: InputMaybe<Scalars['linea_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  message_contains?: InputMaybe<Scalars['linea_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  root?: InputMaybe<Scalars['linea_Bytes']>;
  root_not?: InputMaybe<Scalars['linea_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  root_contains?: InputMaybe<Scalars['linea_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  transactionHash?: InputMaybe<Scalars['linea_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['linea_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['linea_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
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
  rootCount_?: InputMaybe<linea_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<linea_BlockChangedFilter>;
};

export type linea_OriginMessage_orderBy =
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

export type linea_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['linea_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<linea_TransferStatus>;
  messageHash?: Maybe<Scalars['linea_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['linea_Bytes']>;
  delegate?: Maybe<Scalars['linea_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['linea_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['linea_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['linea_Bytes']>;
  asset?: Maybe<linea_Asset>;
  transactingAsset?: Maybe<Scalars['linea_Bytes']>;
  message?: Maybe<linea_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<linea_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['linea_Bytes']>;
  caller?: Maybe<Scalars['linea_Bytes']>;
  transactionHash?: Maybe<Scalars['linea_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['linea_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type linea_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_RelayerFee_filter>;
};

export type linea_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['linea_Bytes']>;
  transferId_not?: InputMaybe<Scalars['linea_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['linea_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<linea_TransferStatus>;
  status_not?: InputMaybe<linea_TransferStatus>;
  status_in?: InputMaybe<Array<linea_TransferStatus>>;
  status_not_in?: InputMaybe<Array<linea_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['linea_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['linea_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['linea_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
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
  to?: InputMaybe<Scalars['linea_Bytes']>;
  to_not?: InputMaybe<Scalars['linea_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  to_contains?: InputMaybe<Scalars['linea_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  delegate?: InputMaybe<Scalars['linea_Bytes']>;
  delegate_not?: InputMaybe<Scalars['linea_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['linea_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['linea_Bytes']>;
  callData_not?: InputMaybe<Scalars['linea_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['linea_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['linea_Bytes']>;
  originSender_not?: InputMaybe<Scalars['linea_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['linea_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['linea_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['linea_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['linea_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
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
  asset_?: InputMaybe<linea_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['linea_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['linea_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['linea_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
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
  message_?: InputMaybe<linea_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<linea_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['linea_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['linea_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['linea_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  caller?: InputMaybe<Scalars['linea_Bytes']>;
  caller_not?: InputMaybe<Scalars['linea_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['linea_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  transactionHash?: InputMaybe<Scalars['linea_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['linea_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['linea_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['linea_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['linea_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['linea_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<linea_BlockChangedFilter>;
};

export type linea_OriginTransfer_orderBy =
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
  linea_asset?: Maybe<linea_Asset>;
  linea_assets: Array<linea_Asset>;
  linea_assetStatus?: Maybe<linea_AssetStatus>;
  linea_assetStatuses: Array<linea_AssetStatus>;
  linea_assetBalance?: Maybe<linea_AssetBalance>;
  linea_assetBalances: Array<linea_AssetBalance>;
  linea_router?: Maybe<linea_Router>;
  linea_routers: Array<linea_Router>;
  linea_routerDailyTVL?: Maybe<linea_RouterDailyTVL>;
  linea_routerDailyTVLs: Array<linea_RouterDailyTVL>;
  linea_routerLiquidityEvent?: Maybe<linea_RouterLiquidityEvent>;
  linea_routerLiquidityEvents: Array<linea_RouterLiquidityEvent>;
  linea_setting?: Maybe<linea_Setting>;
  linea_settings: Array<linea_Setting>;
  linea_relayer?: Maybe<linea_Relayer>;
  linea_relayers: Array<linea_Relayer>;
  linea_sequencer?: Maybe<linea_Sequencer>;
  linea_sequencers: Array<linea_Sequencer>;
  linea_relayerFee?: Maybe<linea_RelayerFee>;
  linea_relayerFees: Array<linea_RelayerFee>;
  linea_originTransfer?: Maybe<linea_OriginTransfer>;
  linea_originTransfers: Array<linea_OriginTransfer>;
  linea_destinationTransfer?: Maybe<linea_DestinationTransfer>;
  linea_destinationTransfers: Array<linea_DestinationTransfer>;
  linea_originMessage?: Maybe<linea_OriginMessage>;
  linea_originMessages: Array<linea_OriginMessage>;
  linea_aggregateRoot?: Maybe<linea_AggregateRoot>;
  linea_aggregateRoots: Array<linea_AggregateRoot>;
  linea_connectorMeta?: Maybe<linea_ConnectorMeta>;
  linea_connectorMetas: Array<linea_ConnectorMeta>;
  linea_rootCount?: Maybe<linea_RootCount>;
  linea_rootCounts: Array<linea_RootCount>;
  linea_rootMessageSent?: Maybe<linea_RootMessageSent>;
  linea_rootMessageSents: Array<linea_RootMessageSent>;
  linea_relayerFeesIncrease?: Maybe<linea_RelayerFeesIncrease>;
  linea_relayerFeesIncreases: Array<linea_RelayerFeesIncrease>;
  linea_slippageUpdate?: Maybe<linea_SlippageUpdate>;
  linea_slippageUpdates: Array<linea_SlippageUpdate>;
  linea_snapshotRoot?: Maybe<linea_SnapshotRoot>;
  linea_snapshotRoots: Array<linea_SnapshotRoot>;
  linea_spokeConnectorMode?: Maybe<linea_SpokeConnectorMode>;
  linea_spokeConnectorModes: Array<linea_SpokeConnectorMode>;
  linea_aggregateRootProposed?: Maybe<linea_AggregateRootProposed>;
  linea_aggregateRootProposeds: Array<linea_AggregateRootProposed>;
  linea_optimisticRootFinalized?: Maybe<linea_OptimisticRootFinalized>;
  linea_optimisticRootFinalizeds: Array<linea_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  linea__meta?: Maybe<linea__Meta_>;
};


export type Querylinea_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_Asset_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_Asset_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_AssetStatus_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_AssetBalance_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_Router_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_Router_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_RouterDailyTVL_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_RouterLiquidityEvent_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_Setting_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_Setting_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_Relayer_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_Relayer_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_Sequencer_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_Sequencer_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_RelayerFee_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_OriginTransfer_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_DestinationTransfer_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_OriginMessage_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_AggregateRoot_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_ConnectorMeta_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_RootCount_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_RootCount_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_RootMessageSent_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_RelayerFeesIncrease_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_SlippageUpdate_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_SnapshotRoot_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_SpokeConnectorMode_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_AggregateRootProposed_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_OptimisticRootFinalized_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylinea__metaArgs = {
  block?: InputMaybe<linea_Block_height>;
};

export type linea_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['linea_Bytes']>;
};

export type linea_RelayerFee = {
  id: Scalars['ID'];
  transfer: linea_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['linea_Bytes'];
};

export type linea_RelayerFee_filter = {
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
  transfer_?: InputMaybe<linea_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['linea_Bytes']>;
  asset_not?: InputMaybe<Scalars['linea_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['linea_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<linea_BlockChangedFilter>;
};

export type linea_RelayerFee_orderBy =
  | 'id'
  | 'transfer'
  | 'fee'
  | 'asset';

export type linea_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: linea_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['linea_Bytes']>;
  caller: Scalars['linea_Bytes'];
  transactionHash: Scalars['linea_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type linea_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<linea_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['linea_Bytes']>;
  asset_not?: InputMaybe<Scalars['linea_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['linea_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  caller?: InputMaybe<Scalars['linea_Bytes']>;
  caller_not?: InputMaybe<Scalars['linea_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['linea_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  transactionHash?: InputMaybe<Scalars['linea_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['linea_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['linea_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
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
  _change_block?: InputMaybe<linea_BlockChangedFilter>;
};

export type linea_RelayerFeesIncrease_orderBy =
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

export type linea_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['linea_Bytes']>;
  relayer_not?: InputMaybe<Scalars['linea_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['linea_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<linea_BlockChangedFilter>;
};

export type linea_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type linea_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type linea_RootCount_filter = {
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
  _change_block?: InputMaybe<linea_BlockChangedFilter>;
};

export type linea_RootCount_orderBy =
  | 'id'
  | 'count';

export type linea_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['linea_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['linea_Bytes']>;
  transactionHash?: Maybe<Scalars['linea_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type linea_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['linea_Bytes']>;
  root_not?: InputMaybe<Scalars['linea_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  root_contains?: InputMaybe<Scalars['linea_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['linea_Bytes']>;
  caller_not?: InputMaybe<Scalars['linea_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['linea_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  transactionHash?: InputMaybe<Scalars['linea_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['linea_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['linea_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
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
  _change_block?: InputMaybe<linea_BlockChangedFilter>;
};

export type linea_RootMessageSent_orderBy =
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

export type linea_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['linea_Bytes']>;
  recipient?: Maybe<Scalars['linea_Bytes']>;
  proposedOwner?: Maybe<Scalars['linea_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<linea_AssetBalance>;
};


export type linea_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_AssetBalance_filter>;
};

export type linea_RouterDailyTVL = {
  id: Scalars['ID'];
  router: linea_Router;
  asset: linea_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type linea_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<linea_Router_filter>;
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
  asset_?: InputMaybe<linea_Asset_filter>;
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
  _change_block?: InputMaybe<linea_BlockChangedFilter>;
};

export type linea_RouterDailyTVL_orderBy =
  | 'id'
  | 'router'
  | 'asset'
  | 'timestamp'
  | 'balance';

export type linea_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<linea_RouterLiquidityEventType>;
  router: linea_Router;
  asset: linea_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['linea_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['linea_Bytes'];
  nonce: Scalars['BigInt'];
};

export type linea_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type linea_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<linea_RouterLiquidityEventType>;
  type_not?: InputMaybe<linea_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<linea_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<linea_RouterLiquidityEventType>>;
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
  router_?: InputMaybe<linea_Router_filter>;
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
  asset_?: InputMaybe<linea_Asset_filter>;
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
  caller?: InputMaybe<Scalars['linea_Bytes']>;
  caller_not?: InputMaybe<Scalars['linea_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['linea_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
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
  transactionHash?: InputMaybe<Scalars['linea_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['linea_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['linea_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<linea_BlockChangedFilter>;
};

export type linea_RouterLiquidityEvent_orderBy =
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

export type linea_Router_filter = {
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
  owner?: InputMaybe<Scalars['linea_Bytes']>;
  owner_not?: InputMaybe<Scalars['linea_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['linea_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  recipient?: InputMaybe<Scalars['linea_Bytes']>;
  recipient_not?: InputMaybe<Scalars['linea_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['linea_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['linea_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['linea_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['linea_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<linea_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<linea_BlockChangedFilter>;
};

export type linea_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type linea_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['linea_Bytes']>;
};

export type linea_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['linea_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['linea_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['linea_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<linea_BlockChangedFilter>;
};

export type linea_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type linea_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['linea_Bytes'];
};

export type linea_Setting_filter = {
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
  caller?: InputMaybe<Scalars['linea_Bytes']>;
  caller_not?: InputMaybe<Scalars['linea_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['linea_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<linea_BlockChangedFilter>;
};

export type linea_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type linea_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: linea_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['linea_Bytes'];
  transactionHash: Scalars['linea_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type linea_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<linea_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['linea_Bytes']>;
  caller_not?: InputMaybe<Scalars['linea_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['linea_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
  transactionHash?: InputMaybe<Scalars['linea_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['linea_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['linea_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
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
  _change_block?: InputMaybe<linea_BlockChangedFilter>;
};

export type linea_SlippageUpdate_orderBy =
  | 'id'
  | 'transfer'
  | 'slippage'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type linea_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['linea_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type linea_SnapshotRoot_filter = {
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
  root?: InputMaybe<Scalars['linea_Bytes']>;
  root_not?: InputMaybe<Scalars['linea_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['linea_Bytes']>>;
  root_contains?: InputMaybe<Scalars['linea_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['linea_Bytes']>;
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
  _change_block?: InputMaybe<linea_BlockChangedFilter>;
};

export type linea_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type linea_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type linea_SpokeConnectorMode_filter = {
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
  _change_block?: InputMaybe<linea_BlockChangedFilter>;
};

export type linea_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  linea_asset?: Maybe<linea_Asset>;
  linea_assets: Array<linea_Asset>;
  linea_assetStatus?: Maybe<linea_AssetStatus>;
  linea_assetStatuses: Array<linea_AssetStatus>;
  linea_assetBalance?: Maybe<linea_AssetBalance>;
  linea_assetBalances: Array<linea_AssetBalance>;
  linea_router?: Maybe<linea_Router>;
  linea_routers: Array<linea_Router>;
  linea_routerDailyTVL?: Maybe<linea_RouterDailyTVL>;
  linea_routerDailyTVLs: Array<linea_RouterDailyTVL>;
  linea_routerLiquidityEvent?: Maybe<linea_RouterLiquidityEvent>;
  linea_routerLiquidityEvents: Array<linea_RouterLiquidityEvent>;
  linea_setting?: Maybe<linea_Setting>;
  linea_settings: Array<linea_Setting>;
  linea_relayer?: Maybe<linea_Relayer>;
  linea_relayers: Array<linea_Relayer>;
  linea_sequencer?: Maybe<linea_Sequencer>;
  linea_sequencers: Array<linea_Sequencer>;
  linea_relayerFee?: Maybe<linea_RelayerFee>;
  linea_relayerFees: Array<linea_RelayerFee>;
  linea_originTransfer?: Maybe<linea_OriginTransfer>;
  linea_originTransfers: Array<linea_OriginTransfer>;
  linea_destinationTransfer?: Maybe<linea_DestinationTransfer>;
  linea_destinationTransfers: Array<linea_DestinationTransfer>;
  linea_originMessage?: Maybe<linea_OriginMessage>;
  linea_originMessages: Array<linea_OriginMessage>;
  linea_aggregateRoot?: Maybe<linea_AggregateRoot>;
  linea_aggregateRoots: Array<linea_AggregateRoot>;
  linea_connectorMeta?: Maybe<linea_ConnectorMeta>;
  linea_connectorMetas: Array<linea_ConnectorMeta>;
  linea_rootCount?: Maybe<linea_RootCount>;
  linea_rootCounts: Array<linea_RootCount>;
  linea_rootMessageSent?: Maybe<linea_RootMessageSent>;
  linea_rootMessageSents: Array<linea_RootMessageSent>;
  linea_relayerFeesIncrease?: Maybe<linea_RelayerFeesIncrease>;
  linea_relayerFeesIncreases: Array<linea_RelayerFeesIncrease>;
  linea_slippageUpdate?: Maybe<linea_SlippageUpdate>;
  linea_slippageUpdates: Array<linea_SlippageUpdate>;
  linea_snapshotRoot?: Maybe<linea_SnapshotRoot>;
  linea_snapshotRoots: Array<linea_SnapshotRoot>;
  linea_spokeConnectorMode?: Maybe<linea_SpokeConnectorMode>;
  linea_spokeConnectorModes: Array<linea_SpokeConnectorMode>;
  linea_aggregateRootProposed?: Maybe<linea_AggregateRootProposed>;
  linea_aggregateRootProposeds: Array<linea_AggregateRootProposed>;
  linea_optimisticRootFinalized?: Maybe<linea_OptimisticRootFinalized>;
  linea_optimisticRootFinalizeds: Array<linea_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  linea__meta?: Maybe<linea__Meta_>;
};


export type Subscriptionlinea_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_Asset_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_Asset_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_AssetStatus_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_AssetBalance_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_Router_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_Router_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_RouterDailyTVL_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_RouterLiquidityEvent_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_Setting_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_Setting_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_Relayer_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_Relayer_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_Sequencer_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_Sequencer_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_RelayerFee_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_OriginTransfer_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_DestinationTransfer_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_OriginMessage_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_AggregateRoot_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_ConnectorMeta_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_RootCount_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_RootCount_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_RootMessageSent_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_RelayerFeesIncrease_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_SlippageUpdate_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_SnapshotRoot_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_SpokeConnectorMode_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_AggregateRootProposed_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<linea_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<linea_OrderDirection>;
  where?: InputMaybe<linea_OptimisticRootFinalized_filter>;
  block?: InputMaybe<linea_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlinea__metaArgs = {
  block?: InputMaybe<linea_Block_height>;
};

export type linea_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type linea__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['linea_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type linea__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: linea__Block_;
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
  linea_asset: InContextSdkMethod<Query['linea_asset'], Querylinea_assetArgs, MeshContext>,
  /** null **/
  linea_assets: InContextSdkMethod<Query['linea_assets'], Querylinea_assetsArgs, MeshContext>,
  /** null **/
  linea_assetStatus: InContextSdkMethod<Query['linea_assetStatus'], Querylinea_assetStatusArgs, MeshContext>,
  /** null **/
  linea_assetStatuses: InContextSdkMethod<Query['linea_assetStatuses'], Querylinea_assetStatusesArgs, MeshContext>,
  /** null **/
  linea_assetBalance: InContextSdkMethod<Query['linea_assetBalance'], Querylinea_assetBalanceArgs, MeshContext>,
  /** null **/
  linea_assetBalances: InContextSdkMethod<Query['linea_assetBalances'], Querylinea_assetBalancesArgs, MeshContext>,
  /** null **/
  linea_router: InContextSdkMethod<Query['linea_router'], Querylinea_routerArgs, MeshContext>,
  /** null **/
  linea_routers: InContextSdkMethod<Query['linea_routers'], Querylinea_routersArgs, MeshContext>,
  /** null **/
  linea_routerDailyTVL: InContextSdkMethod<Query['linea_routerDailyTVL'], Querylinea_routerDailyTVLArgs, MeshContext>,
  /** null **/
  linea_routerDailyTVLs: InContextSdkMethod<Query['linea_routerDailyTVLs'], Querylinea_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  linea_routerLiquidityEvent: InContextSdkMethod<Query['linea_routerLiquidityEvent'], Querylinea_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  linea_routerLiquidityEvents: InContextSdkMethod<Query['linea_routerLiquidityEvents'], Querylinea_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  linea_setting: InContextSdkMethod<Query['linea_setting'], Querylinea_settingArgs, MeshContext>,
  /** null **/
  linea_settings: InContextSdkMethod<Query['linea_settings'], Querylinea_settingsArgs, MeshContext>,
  /** null **/
  linea_relayer: InContextSdkMethod<Query['linea_relayer'], Querylinea_relayerArgs, MeshContext>,
  /** null **/
  linea_relayers: InContextSdkMethod<Query['linea_relayers'], Querylinea_relayersArgs, MeshContext>,
  /** null **/
  linea_sequencer: InContextSdkMethod<Query['linea_sequencer'], Querylinea_sequencerArgs, MeshContext>,
  /** null **/
  linea_sequencers: InContextSdkMethod<Query['linea_sequencers'], Querylinea_sequencersArgs, MeshContext>,
  /** null **/
  linea_relayerFee: InContextSdkMethod<Query['linea_relayerFee'], Querylinea_relayerFeeArgs, MeshContext>,
  /** null **/
  linea_relayerFees: InContextSdkMethod<Query['linea_relayerFees'], Querylinea_relayerFeesArgs, MeshContext>,
  /** null **/
  linea_originTransfer: InContextSdkMethod<Query['linea_originTransfer'], Querylinea_originTransferArgs, MeshContext>,
  /** null **/
  linea_originTransfers: InContextSdkMethod<Query['linea_originTransfers'], Querylinea_originTransfersArgs, MeshContext>,
  /** null **/
  linea_destinationTransfer: InContextSdkMethod<Query['linea_destinationTransfer'], Querylinea_destinationTransferArgs, MeshContext>,
  /** null **/
  linea_destinationTransfers: InContextSdkMethod<Query['linea_destinationTransfers'], Querylinea_destinationTransfersArgs, MeshContext>,
  /** null **/
  linea_originMessage: InContextSdkMethod<Query['linea_originMessage'], Querylinea_originMessageArgs, MeshContext>,
  /** null **/
  linea_originMessages: InContextSdkMethod<Query['linea_originMessages'], Querylinea_originMessagesArgs, MeshContext>,
  /** null **/
  linea_aggregateRoot: InContextSdkMethod<Query['linea_aggregateRoot'], Querylinea_aggregateRootArgs, MeshContext>,
  /** null **/
  linea_aggregateRoots: InContextSdkMethod<Query['linea_aggregateRoots'], Querylinea_aggregateRootsArgs, MeshContext>,
  /** null **/
  linea_connectorMeta: InContextSdkMethod<Query['linea_connectorMeta'], Querylinea_connectorMetaArgs, MeshContext>,
  /** null **/
  linea_connectorMetas: InContextSdkMethod<Query['linea_connectorMetas'], Querylinea_connectorMetasArgs, MeshContext>,
  /** null **/
  linea_rootCount: InContextSdkMethod<Query['linea_rootCount'], Querylinea_rootCountArgs, MeshContext>,
  /** null **/
  linea_rootCounts: InContextSdkMethod<Query['linea_rootCounts'], Querylinea_rootCountsArgs, MeshContext>,
  /** null **/
  linea_rootMessageSent: InContextSdkMethod<Query['linea_rootMessageSent'], Querylinea_rootMessageSentArgs, MeshContext>,
  /** null **/
  linea_rootMessageSents: InContextSdkMethod<Query['linea_rootMessageSents'], Querylinea_rootMessageSentsArgs, MeshContext>,
  /** null **/
  linea_relayerFeesIncrease: InContextSdkMethod<Query['linea_relayerFeesIncrease'], Querylinea_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  linea_relayerFeesIncreases: InContextSdkMethod<Query['linea_relayerFeesIncreases'], Querylinea_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  linea_slippageUpdate: InContextSdkMethod<Query['linea_slippageUpdate'], Querylinea_slippageUpdateArgs, MeshContext>,
  /** null **/
  linea_slippageUpdates: InContextSdkMethod<Query['linea_slippageUpdates'], Querylinea_slippageUpdatesArgs, MeshContext>,
  /** null **/
  linea_snapshotRoot: InContextSdkMethod<Query['linea_snapshotRoot'], Querylinea_snapshotRootArgs, MeshContext>,
  /** null **/
  linea_snapshotRoots: InContextSdkMethod<Query['linea_snapshotRoots'], Querylinea_snapshotRootsArgs, MeshContext>,
  /** null **/
  linea_spokeConnectorMode: InContextSdkMethod<Query['linea_spokeConnectorMode'], Querylinea_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  linea_spokeConnectorModes: InContextSdkMethod<Query['linea_spokeConnectorModes'], Querylinea_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  linea_aggregateRootProposed: InContextSdkMethod<Query['linea_aggregateRootProposed'], Querylinea_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  linea_aggregateRootProposeds: InContextSdkMethod<Query['linea_aggregateRootProposeds'], Querylinea_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  linea_optimisticRootFinalized: InContextSdkMethod<Query['linea_optimisticRootFinalized'], Querylinea_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  linea_optimisticRootFinalizeds: InContextSdkMethod<Query['linea_optimisticRootFinalizeds'], Querylinea_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  linea__meta: InContextSdkMethod<Query['linea__meta'], Querylinea__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  linea_asset: InContextSdkMethod<Subscription['linea_asset'], Subscriptionlinea_assetArgs, MeshContext>,
  /** null **/
  linea_assets: InContextSdkMethod<Subscription['linea_assets'], Subscriptionlinea_assetsArgs, MeshContext>,
  /** null **/
  linea_assetStatus: InContextSdkMethod<Subscription['linea_assetStatus'], Subscriptionlinea_assetStatusArgs, MeshContext>,
  /** null **/
  linea_assetStatuses: InContextSdkMethod<Subscription['linea_assetStatuses'], Subscriptionlinea_assetStatusesArgs, MeshContext>,
  /** null **/
  linea_assetBalance: InContextSdkMethod<Subscription['linea_assetBalance'], Subscriptionlinea_assetBalanceArgs, MeshContext>,
  /** null **/
  linea_assetBalances: InContextSdkMethod<Subscription['linea_assetBalances'], Subscriptionlinea_assetBalancesArgs, MeshContext>,
  /** null **/
  linea_router: InContextSdkMethod<Subscription['linea_router'], Subscriptionlinea_routerArgs, MeshContext>,
  /** null **/
  linea_routers: InContextSdkMethod<Subscription['linea_routers'], Subscriptionlinea_routersArgs, MeshContext>,
  /** null **/
  linea_routerDailyTVL: InContextSdkMethod<Subscription['linea_routerDailyTVL'], Subscriptionlinea_routerDailyTVLArgs, MeshContext>,
  /** null **/
  linea_routerDailyTVLs: InContextSdkMethod<Subscription['linea_routerDailyTVLs'], Subscriptionlinea_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  linea_routerLiquidityEvent: InContextSdkMethod<Subscription['linea_routerLiquidityEvent'], Subscriptionlinea_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  linea_routerLiquidityEvents: InContextSdkMethod<Subscription['linea_routerLiquidityEvents'], Subscriptionlinea_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  linea_setting: InContextSdkMethod<Subscription['linea_setting'], Subscriptionlinea_settingArgs, MeshContext>,
  /** null **/
  linea_settings: InContextSdkMethod<Subscription['linea_settings'], Subscriptionlinea_settingsArgs, MeshContext>,
  /** null **/
  linea_relayer: InContextSdkMethod<Subscription['linea_relayer'], Subscriptionlinea_relayerArgs, MeshContext>,
  /** null **/
  linea_relayers: InContextSdkMethod<Subscription['linea_relayers'], Subscriptionlinea_relayersArgs, MeshContext>,
  /** null **/
  linea_sequencer: InContextSdkMethod<Subscription['linea_sequencer'], Subscriptionlinea_sequencerArgs, MeshContext>,
  /** null **/
  linea_sequencers: InContextSdkMethod<Subscription['linea_sequencers'], Subscriptionlinea_sequencersArgs, MeshContext>,
  /** null **/
  linea_relayerFee: InContextSdkMethod<Subscription['linea_relayerFee'], Subscriptionlinea_relayerFeeArgs, MeshContext>,
  /** null **/
  linea_relayerFees: InContextSdkMethod<Subscription['linea_relayerFees'], Subscriptionlinea_relayerFeesArgs, MeshContext>,
  /** null **/
  linea_originTransfer: InContextSdkMethod<Subscription['linea_originTransfer'], Subscriptionlinea_originTransferArgs, MeshContext>,
  /** null **/
  linea_originTransfers: InContextSdkMethod<Subscription['linea_originTransfers'], Subscriptionlinea_originTransfersArgs, MeshContext>,
  /** null **/
  linea_destinationTransfer: InContextSdkMethod<Subscription['linea_destinationTransfer'], Subscriptionlinea_destinationTransferArgs, MeshContext>,
  /** null **/
  linea_destinationTransfers: InContextSdkMethod<Subscription['linea_destinationTransfers'], Subscriptionlinea_destinationTransfersArgs, MeshContext>,
  /** null **/
  linea_originMessage: InContextSdkMethod<Subscription['linea_originMessage'], Subscriptionlinea_originMessageArgs, MeshContext>,
  /** null **/
  linea_originMessages: InContextSdkMethod<Subscription['linea_originMessages'], Subscriptionlinea_originMessagesArgs, MeshContext>,
  /** null **/
  linea_aggregateRoot: InContextSdkMethod<Subscription['linea_aggregateRoot'], Subscriptionlinea_aggregateRootArgs, MeshContext>,
  /** null **/
  linea_aggregateRoots: InContextSdkMethod<Subscription['linea_aggregateRoots'], Subscriptionlinea_aggregateRootsArgs, MeshContext>,
  /** null **/
  linea_connectorMeta: InContextSdkMethod<Subscription['linea_connectorMeta'], Subscriptionlinea_connectorMetaArgs, MeshContext>,
  /** null **/
  linea_connectorMetas: InContextSdkMethod<Subscription['linea_connectorMetas'], Subscriptionlinea_connectorMetasArgs, MeshContext>,
  /** null **/
  linea_rootCount: InContextSdkMethod<Subscription['linea_rootCount'], Subscriptionlinea_rootCountArgs, MeshContext>,
  /** null **/
  linea_rootCounts: InContextSdkMethod<Subscription['linea_rootCounts'], Subscriptionlinea_rootCountsArgs, MeshContext>,
  /** null **/
  linea_rootMessageSent: InContextSdkMethod<Subscription['linea_rootMessageSent'], Subscriptionlinea_rootMessageSentArgs, MeshContext>,
  /** null **/
  linea_rootMessageSents: InContextSdkMethod<Subscription['linea_rootMessageSents'], Subscriptionlinea_rootMessageSentsArgs, MeshContext>,
  /** null **/
  linea_relayerFeesIncrease: InContextSdkMethod<Subscription['linea_relayerFeesIncrease'], Subscriptionlinea_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  linea_relayerFeesIncreases: InContextSdkMethod<Subscription['linea_relayerFeesIncreases'], Subscriptionlinea_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  linea_slippageUpdate: InContextSdkMethod<Subscription['linea_slippageUpdate'], Subscriptionlinea_slippageUpdateArgs, MeshContext>,
  /** null **/
  linea_slippageUpdates: InContextSdkMethod<Subscription['linea_slippageUpdates'], Subscriptionlinea_slippageUpdatesArgs, MeshContext>,
  /** null **/
  linea_snapshotRoot: InContextSdkMethod<Subscription['linea_snapshotRoot'], Subscriptionlinea_snapshotRootArgs, MeshContext>,
  /** null **/
  linea_snapshotRoots: InContextSdkMethod<Subscription['linea_snapshotRoots'], Subscriptionlinea_snapshotRootsArgs, MeshContext>,
  /** null **/
  linea_spokeConnectorMode: InContextSdkMethod<Subscription['linea_spokeConnectorMode'], Subscriptionlinea_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  linea_spokeConnectorModes: InContextSdkMethod<Subscription['linea_spokeConnectorModes'], Subscriptionlinea_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  linea_aggregateRootProposed: InContextSdkMethod<Subscription['linea_aggregateRootProposed'], Subscriptionlinea_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  linea_aggregateRootProposeds: InContextSdkMethod<Subscription['linea_aggregateRootProposeds'], Subscriptionlinea_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  linea_optimisticRootFinalized: InContextSdkMethod<Subscription['linea_optimisticRootFinalized'], Subscriptionlinea_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  linea_optimisticRootFinalizeds: InContextSdkMethod<Subscription['linea_optimisticRootFinalizeds'], Subscriptionlinea_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  linea__meta: InContextSdkMethod<Subscription['linea__meta'], Subscriptionlinea__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Linea"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
