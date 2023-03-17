// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextTestGoerliTypes {
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
  testgoerli_BigDecimal: any;
  BigInt: any;
  testgoerli_Bytes: any;
};

export type testgoerli_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['testgoerli_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type testgoerli_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_AggregateRoot_filter>>>;
};

export type testgoerli_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type testgoerli_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['testgoerli_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['testgoerli_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['testgoerli_Bytes']>;
  localAsset?: Maybe<Scalars['testgoerli_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<testgoerli_AssetStatus>;
};

export type testgoerli_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: testgoerli_Router;
  asset: testgoerli_Asset;
  feesEarned: Scalars['BigInt'];
};

export type testgoerli_AssetBalance_filter = {
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
  router_?: InputMaybe<testgoerli_Router_filter>;
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
  asset_?: InputMaybe<testgoerli_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_AssetBalance_filter>>>;
};

export type testgoerli_AssetBalance_orderBy =
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

export type testgoerli_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type testgoerli_AssetStatus_filter = {
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
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_AssetStatus_filter>>>;
};

export type testgoerli_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type testgoerli_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['testgoerli_Bytes']>;
  key_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  key_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  key_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  key_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  key_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  key_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  decimal?: InputMaybe<Scalars['BigInt']>;
  decimal_not?: InputMaybe<Scalars['BigInt']>;
  decimal_gt?: InputMaybe<Scalars['BigInt']>;
  decimal_lt?: InputMaybe<Scalars['BigInt']>;
  decimal_gte?: InputMaybe<Scalars['BigInt']>;
  decimal_lte?: InputMaybe<Scalars['BigInt']>;
  decimal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  decimal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalId?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['testgoerli_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  localAsset?: InputMaybe<Scalars['testgoerli_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  status_?: InputMaybe<testgoerli_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_Asset_filter>>>;
};

export type testgoerli_Asset_orderBy =
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

export type testgoerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type testgoerli_Block_height = {
  hash?: InputMaybe<Scalars['testgoerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type testgoerli_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['testgoerli_Bytes']>;
  rootManager?: Maybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector?: Maybe<Scalars['testgoerli_Bytes']>;
};

export type testgoerli_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_ConnectorMeta_filter>>>;
};

export type testgoerli_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type testgoerli_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['testgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<testgoerli_TransferStatus>;
  routers?: Maybe<Array<testgoerli_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['testgoerli_Bytes']>;
  delegate?: Maybe<Scalars['testgoerli_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['testgoerli_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['testgoerli_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['testgoerli_Bytes']>;
  asset?: Maybe<testgoerli_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['testgoerli_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['testgoerli_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['testgoerli_Bytes']>;
  reconciledCaller?: Maybe<Scalars['testgoerli_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['testgoerli_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['testgoerli_Bytes']>;
};


export type testgoerli_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_Router_filter>;
};

export type testgoerli_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<testgoerli_TransferStatus>;
  status_not?: InputMaybe<testgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<testgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<testgoerli_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<testgoerli_Router_filter>;
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
  to?: InputMaybe<Scalars['testgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  to_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  to_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  to_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  to_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  delegate?: InputMaybe<Scalars['testgoerli_Bytes']>;
  delegate_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callData_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callData_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callData_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callData_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  originSender?: InputMaybe<Scalars['testgoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  asset_?: InputMaybe<testgoerli_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledCaller?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_DestinationTransfer_filter>>>;
};

export type testgoerli_DestinationTransfer_orderBy =
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
export type testgoerli_OrderDirection =
  | 'asc'
  | 'desc';

export type testgoerli_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['testgoerli_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['testgoerli_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['testgoerli_Bytes']>;
  root?: Maybe<Scalars['testgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['testgoerli_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<testgoerli_RootCount>;
};

export type testgoerli_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['testgoerli_Bytes']>;
  leaf_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['testgoerli_Bytes']>;
  message_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  message_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  message_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  message_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  message_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  message_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  rootCount_?: InputMaybe<testgoerli_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_OriginMessage_filter>>>;
};

export type testgoerli_OriginMessage_orderBy =
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

export type testgoerli_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['testgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<testgoerli_TransferStatus>;
  messageHash?: Maybe<Scalars['testgoerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['testgoerli_Bytes']>;
  delegate?: Maybe<Scalars['testgoerli_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['testgoerli_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['testgoerli_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['testgoerli_Bytes']>;
  asset?: Maybe<testgoerli_Asset>;
  transactingAsset?: Maybe<Scalars['testgoerli_Bytes']>;
  message?: Maybe<testgoerli_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<testgoerli_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['testgoerli_Bytes']>;
  caller?: Maybe<Scalars['testgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['testgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['testgoerli_Bytes']>;
};


export type testgoerli_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_RelayerFee_filter>;
};

export type testgoerli_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<testgoerli_TransferStatus>;
  status_not?: InputMaybe<testgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<testgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<testgoerli_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['testgoerli_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  to?: InputMaybe<Scalars['testgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  to_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  to_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  to_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  to_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  delegate?: InputMaybe<Scalars['testgoerli_Bytes']>;
  delegate_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callData_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callData_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callData_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callData_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['testgoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  asset_?: InputMaybe<testgoerli_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  message_?: InputMaybe<testgoerli_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<testgoerli_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['testgoerli_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['testgoerli_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_OriginTransfer_filter>>>;
};

export type testgoerli_OriginTransfer_orderBy =
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
  testgoerli_asset?: Maybe<testgoerli_Asset>;
  testgoerli_assets: Array<testgoerli_Asset>;
  testgoerli_assetStatus?: Maybe<testgoerli_AssetStatus>;
  testgoerli_assetStatuses: Array<testgoerli_AssetStatus>;
  testgoerli_assetBalance?: Maybe<testgoerli_AssetBalance>;
  testgoerli_assetBalances: Array<testgoerli_AssetBalance>;
  testgoerli_router?: Maybe<testgoerli_Router>;
  testgoerli_routers: Array<testgoerli_Router>;
  testgoerli_routerDailyTVL?: Maybe<testgoerli_RouterDailyTVL>;
  testgoerli_routerDailyTVLs: Array<testgoerli_RouterDailyTVL>;
  testgoerli_setting?: Maybe<testgoerli_Setting>;
  testgoerli_settings: Array<testgoerli_Setting>;
  testgoerli_relayer?: Maybe<testgoerli_Relayer>;
  testgoerli_relayers: Array<testgoerli_Relayer>;
  testgoerli_sequencer?: Maybe<testgoerli_Sequencer>;
  testgoerli_sequencers: Array<testgoerli_Sequencer>;
  testgoerli_relayerFee?: Maybe<testgoerli_RelayerFee>;
  testgoerli_relayerFees: Array<testgoerli_RelayerFee>;
  testgoerli_originTransfer?: Maybe<testgoerli_OriginTransfer>;
  testgoerli_originTransfers: Array<testgoerli_OriginTransfer>;
  testgoerli_destinationTransfer?: Maybe<testgoerli_DestinationTransfer>;
  testgoerli_destinationTransfers: Array<testgoerli_DestinationTransfer>;
  testgoerli_originMessage?: Maybe<testgoerli_OriginMessage>;
  testgoerli_originMessages: Array<testgoerli_OriginMessage>;
  testgoerli_aggregateRoot?: Maybe<testgoerli_AggregateRoot>;
  testgoerli_aggregateRoots: Array<testgoerli_AggregateRoot>;
  testgoerli_connectorMeta?: Maybe<testgoerli_ConnectorMeta>;
  testgoerli_connectorMetas: Array<testgoerli_ConnectorMeta>;
  testgoerli_rootCount?: Maybe<testgoerli_RootCount>;
  testgoerli_rootCounts: Array<testgoerli_RootCount>;
  testgoerli_rootMessageSent?: Maybe<testgoerli_RootMessageSent>;
  testgoerli_rootMessageSents: Array<testgoerli_RootMessageSent>;
  testgoerli_relayerFeesIncrease?: Maybe<testgoerli_RelayerFeesIncrease>;
  testgoerli_relayerFeesIncreases: Array<testgoerli_RelayerFeesIncrease>;
  testgoerli_slippageUpdate?: Maybe<testgoerli_SlippageUpdate>;
  testgoerli_slippageUpdates: Array<testgoerli_SlippageUpdate>;
  /** Access to subgraph metadata */
  testgoerli__meta?: Maybe<testgoerli__Meta_>;
};


export type Querytestgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_Asset_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_AssetStatus_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_AssetBalance_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_Router_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_RouterDailyTVL_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_Setting_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_Relayer_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_Sequencer_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_Sequencer_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_RelayerFee_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_OriginTransfer_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_OriginMessage_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_AggregateRoot_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_ConnectorMeta_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_RootCount_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_RootCount_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_RootMessageSent_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_RelayerFeesIncrease_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_SlippageUpdate_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli__metaArgs = {
  block?: InputMaybe<testgoerli_Block_height>;
};

export type testgoerli_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['testgoerli_Bytes']>;
};

export type testgoerli_RelayerFee = {
  id: Scalars['ID'];
  transfer: testgoerli_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['testgoerli_Bytes'];
};

export type testgoerli_RelayerFee_filter = {
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
  transfer_?: InputMaybe<testgoerli_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['testgoerli_Bytes']>;
  asset_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  asset_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  asset_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  asset_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  asset_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_RelayerFee_filter>>>;
};

export type testgoerli_RelayerFee_orderBy =
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

export type testgoerli_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: testgoerli_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['testgoerli_Bytes']>;
  caller: Scalars['testgoerli_Bytes'];
  transactionHash: Scalars['testgoerli_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type testgoerli_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<testgoerli_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['testgoerli_Bytes']>;
  asset_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  asset_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  asset_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  asset_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  asset_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_RelayerFeesIncrease_filter>>>;
};

export type testgoerli_RelayerFeesIncrease_orderBy =
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

export type testgoerli_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['testgoerli_Bytes']>;
  relayer_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_Relayer_filter>>>;
};

export type testgoerli_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type testgoerli_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type testgoerli_RootCount_filter = {
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
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_RootCount_filter>>>;
};

export type testgoerli_RootCount_orderBy =
  | 'id'
  | 'count';

export type testgoerli_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['testgoerli_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['testgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['testgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type testgoerli_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_RootMessageSent_filter>>>;
};

export type testgoerli_RootMessageSent_orderBy =
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

export type testgoerli_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['testgoerli_Bytes']>;
  recipient?: Maybe<Scalars['testgoerli_Bytes']>;
  proposedOwner?: Maybe<Scalars['testgoerli_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<testgoerli_AssetBalance>;
};


export type testgoerli_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_AssetBalance_filter>;
};

export type testgoerli_RouterDailyTVL = {
  id: Scalars['ID'];
  router: testgoerli_Router;
  asset: testgoerli_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type testgoerli_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<testgoerli_Router_filter>;
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
  asset_?: InputMaybe<testgoerli_Asset_filter>;
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
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_RouterDailyTVL_filter>>>;
};

export type testgoerli_RouterDailyTVL_orderBy =
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

export type testgoerli_Router_filter = {
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
  owner?: InputMaybe<Scalars['testgoerli_Bytes']>;
  owner_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  owner_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  owner_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  owner_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  owner_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  recipient?: InputMaybe<Scalars['testgoerli_Bytes']>;
  recipient_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['testgoerli_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<testgoerli_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_Router_filter>>>;
};

export type testgoerli_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type testgoerli_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['testgoerli_Bytes']>;
};

export type testgoerli_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['testgoerli_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_Sequencer_filter>>>;
};

export type testgoerli_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type testgoerli_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['testgoerli_Bytes'];
};

export type testgoerli_Setting_filter = {
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
  caller?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_Setting_filter>>>;
};

export type testgoerli_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type testgoerli_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: testgoerli_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['testgoerli_Bytes'];
  transactionHash: Scalars['testgoerli_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type testgoerli_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<testgoerli_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_SlippageUpdate_filter>>>;
};

export type testgoerli_SlippageUpdate_orderBy =
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
  testgoerli_asset?: Maybe<testgoerli_Asset>;
  testgoerli_assets: Array<testgoerli_Asset>;
  testgoerli_assetStatus?: Maybe<testgoerli_AssetStatus>;
  testgoerli_assetStatuses: Array<testgoerli_AssetStatus>;
  testgoerli_assetBalance?: Maybe<testgoerli_AssetBalance>;
  testgoerli_assetBalances: Array<testgoerli_AssetBalance>;
  testgoerli_router?: Maybe<testgoerli_Router>;
  testgoerli_routers: Array<testgoerli_Router>;
  testgoerli_routerDailyTVL?: Maybe<testgoerli_RouterDailyTVL>;
  testgoerli_routerDailyTVLs: Array<testgoerli_RouterDailyTVL>;
  testgoerli_setting?: Maybe<testgoerli_Setting>;
  testgoerli_settings: Array<testgoerli_Setting>;
  testgoerli_relayer?: Maybe<testgoerli_Relayer>;
  testgoerli_relayers: Array<testgoerli_Relayer>;
  testgoerli_sequencer?: Maybe<testgoerli_Sequencer>;
  testgoerli_sequencers: Array<testgoerli_Sequencer>;
  testgoerli_relayerFee?: Maybe<testgoerli_RelayerFee>;
  testgoerli_relayerFees: Array<testgoerli_RelayerFee>;
  testgoerli_originTransfer?: Maybe<testgoerli_OriginTransfer>;
  testgoerli_originTransfers: Array<testgoerli_OriginTransfer>;
  testgoerli_destinationTransfer?: Maybe<testgoerli_DestinationTransfer>;
  testgoerli_destinationTransfers: Array<testgoerli_DestinationTransfer>;
  testgoerli_originMessage?: Maybe<testgoerli_OriginMessage>;
  testgoerli_originMessages: Array<testgoerli_OriginMessage>;
  testgoerli_aggregateRoot?: Maybe<testgoerli_AggregateRoot>;
  testgoerli_aggregateRoots: Array<testgoerli_AggregateRoot>;
  testgoerli_connectorMeta?: Maybe<testgoerli_ConnectorMeta>;
  testgoerli_connectorMetas: Array<testgoerli_ConnectorMeta>;
  testgoerli_rootCount?: Maybe<testgoerli_RootCount>;
  testgoerli_rootCounts: Array<testgoerli_RootCount>;
  testgoerli_rootMessageSent?: Maybe<testgoerli_RootMessageSent>;
  testgoerli_rootMessageSents: Array<testgoerli_RootMessageSent>;
  testgoerli_relayerFeesIncrease?: Maybe<testgoerli_RelayerFeesIncrease>;
  testgoerli_relayerFeesIncreases: Array<testgoerli_RelayerFeesIncrease>;
  testgoerli_slippageUpdate?: Maybe<testgoerli_SlippageUpdate>;
  testgoerli_slippageUpdates: Array<testgoerli_SlippageUpdate>;
  /** Access to subgraph metadata */
  testgoerli__meta?: Maybe<testgoerli__Meta_>;
};


export type Subscriptiontestgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_Asset_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_AssetStatus_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_AssetBalance_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_Router_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_RouterDailyTVL_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_Setting_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_Relayer_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_Sequencer_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_Sequencer_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_RelayerFee_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_OriginTransfer_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_OriginMessage_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_AggregateRoot_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_ConnectorMeta_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_RootCount_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_RootCount_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_RootMessageSent_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_RelayerFeesIncrease_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_SlippageUpdate_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli__metaArgs = {
  block?: InputMaybe<testgoerli_Block_height>;
};

export type testgoerli_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type testgoerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['testgoerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type testgoerli__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: testgoerli__Block_;
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
  testgoerli_asset: InContextSdkMethod<Query['testgoerli_asset'], Querytestgoerli_assetArgs, MeshContext>,
  /** null **/
  testgoerli_assets: InContextSdkMethod<Query['testgoerli_assets'], Querytestgoerli_assetsArgs, MeshContext>,
  /** null **/
  testgoerli_assetStatus: InContextSdkMethod<Query['testgoerli_assetStatus'], Querytestgoerli_assetStatusArgs, MeshContext>,
  /** null **/
  testgoerli_assetStatuses: InContextSdkMethod<Query['testgoerli_assetStatuses'], Querytestgoerli_assetStatusesArgs, MeshContext>,
  /** null **/
  testgoerli_assetBalance: InContextSdkMethod<Query['testgoerli_assetBalance'], Querytestgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  testgoerli_assetBalances: InContextSdkMethod<Query['testgoerli_assetBalances'], Querytestgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  testgoerli_router: InContextSdkMethod<Query['testgoerli_router'], Querytestgoerli_routerArgs, MeshContext>,
  /** null **/
  testgoerli_routers: InContextSdkMethod<Query['testgoerli_routers'], Querytestgoerli_routersArgs, MeshContext>,
  /** null **/
  testgoerli_routerDailyTVL: InContextSdkMethod<Query['testgoerli_routerDailyTVL'], Querytestgoerli_routerDailyTVLArgs, MeshContext>,
  /** null **/
  testgoerli_routerDailyTVLs: InContextSdkMethod<Query['testgoerli_routerDailyTVLs'], Querytestgoerli_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  testgoerli_setting: InContextSdkMethod<Query['testgoerli_setting'], Querytestgoerli_settingArgs, MeshContext>,
  /** null **/
  testgoerli_settings: InContextSdkMethod<Query['testgoerli_settings'], Querytestgoerli_settingsArgs, MeshContext>,
  /** null **/
  testgoerli_relayer: InContextSdkMethod<Query['testgoerli_relayer'], Querytestgoerli_relayerArgs, MeshContext>,
  /** null **/
  testgoerli_relayers: InContextSdkMethod<Query['testgoerli_relayers'], Querytestgoerli_relayersArgs, MeshContext>,
  /** null **/
  testgoerli_sequencer: InContextSdkMethod<Query['testgoerli_sequencer'], Querytestgoerli_sequencerArgs, MeshContext>,
  /** null **/
  testgoerli_sequencers: InContextSdkMethod<Query['testgoerli_sequencers'], Querytestgoerli_sequencersArgs, MeshContext>,
  /** null **/
  testgoerli_relayerFee: InContextSdkMethod<Query['testgoerli_relayerFee'], Querytestgoerli_relayerFeeArgs, MeshContext>,
  /** null **/
  testgoerli_relayerFees: InContextSdkMethod<Query['testgoerli_relayerFees'], Querytestgoerli_relayerFeesArgs, MeshContext>,
  /** null **/
  testgoerli_originTransfer: InContextSdkMethod<Query['testgoerli_originTransfer'], Querytestgoerli_originTransferArgs, MeshContext>,
  /** null **/
  testgoerli_originTransfers: InContextSdkMethod<Query['testgoerli_originTransfers'], Querytestgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  testgoerli_destinationTransfer: InContextSdkMethod<Query['testgoerli_destinationTransfer'], Querytestgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  testgoerli_destinationTransfers: InContextSdkMethod<Query['testgoerli_destinationTransfers'], Querytestgoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  testgoerli_originMessage: InContextSdkMethod<Query['testgoerli_originMessage'], Querytestgoerli_originMessageArgs, MeshContext>,
  /** null **/
  testgoerli_originMessages: InContextSdkMethod<Query['testgoerli_originMessages'], Querytestgoerli_originMessagesArgs, MeshContext>,
  /** null **/
  testgoerli_aggregateRoot: InContextSdkMethod<Query['testgoerli_aggregateRoot'], Querytestgoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  testgoerli_aggregateRoots: InContextSdkMethod<Query['testgoerli_aggregateRoots'], Querytestgoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  testgoerli_connectorMeta: InContextSdkMethod<Query['testgoerli_connectorMeta'], Querytestgoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  testgoerli_connectorMetas: InContextSdkMethod<Query['testgoerli_connectorMetas'], Querytestgoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  testgoerli_rootCount: InContextSdkMethod<Query['testgoerli_rootCount'], Querytestgoerli_rootCountArgs, MeshContext>,
  /** null **/
  testgoerli_rootCounts: InContextSdkMethod<Query['testgoerli_rootCounts'], Querytestgoerli_rootCountsArgs, MeshContext>,
  /** null **/
  testgoerli_rootMessageSent: InContextSdkMethod<Query['testgoerli_rootMessageSent'], Querytestgoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  testgoerli_rootMessageSents: InContextSdkMethod<Query['testgoerli_rootMessageSents'], Querytestgoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  testgoerli_relayerFeesIncrease: InContextSdkMethod<Query['testgoerli_relayerFeesIncrease'], Querytestgoerli_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  testgoerli_relayerFeesIncreases: InContextSdkMethod<Query['testgoerli_relayerFeesIncreases'], Querytestgoerli_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  testgoerli_slippageUpdate: InContextSdkMethod<Query['testgoerli_slippageUpdate'], Querytestgoerli_slippageUpdateArgs, MeshContext>,
  /** null **/
  testgoerli_slippageUpdates: InContextSdkMethod<Query['testgoerli_slippageUpdates'], Querytestgoerli_slippageUpdatesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  testgoerli__meta: InContextSdkMethod<Query['testgoerli__meta'], Querytestgoerli__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  testgoerli_asset: InContextSdkMethod<Subscription['testgoerli_asset'], Subscriptiontestgoerli_assetArgs, MeshContext>,
  /** null **/
  testgoerli_assets: InContextSdkMethod<Subscription['testgoerli_assets'], Subscriptiontestgoerli_assetsArgs, MeshContext>,
  /** null **/
  testgoerli_assetStatus: InContextSdkMethod<Subscription['testgoerli_assetStatus'], Subscriptiontestgoerli_assetStatusArgs, MeshContext>,
  /** null **/
  testgoerli_assetStatuses: InContextSdkMethod<Subscription['testgoerli_assetStatuses'], Subscriptiontestgoerli_assetStatusesArgs, MeshContext>,
  /** null **/
  testgoerli_assetBalance: InContextSdkMethod<Subscription['testgoerli_assetBalance'], Subscriptiontestgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  testgoerli_assetBalances: InContextSdkMethod<Subscription['testgoerli_assetBalances'], Subscriptiontestgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  testgoerli_router: InContextSdkMethod<Subscription['testgoerli_router'], Subscriptiontestgoerli_routerArgs, MeshContext>,
  /** null **/
  testgoerli_routers: InContextSdkMethod<Subscription['testgoerli_routers'], Subscriptiontestgoerli_routersArgs, MeshContext>,
  /** null **/
  testgoerli_routerDailyTVL: InContextSdkMethod<Subscription['testgoerli_routerDailyTVL'], Subscriptiontestgoerli_routerDailyTVLArgs, MeshContext>,
  /** null **/
  testgoerli_routerDailyTVLs: InContextSdkMethod<Subscription['testgoerli_routerDailyTVLs'], Subscriptiontestgoerli_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  testgoerli_setting: InContextSdkMethod<Subscription['testgoerli_setting'], Subscriptiontestgoerli_settingArgs, MeshContext>,
  /** null **/
  testgoerli_settings: InContextSdkMethod<Subscription['testgoerli_settings'], Subscriptiontestgoerli_settingsArgs, MeshContext>,
  /** null **/
  testgoerli_relayer: InContextSdkMethod<Subscription['testgoerli_relayer'], Subscriptiontestgoerli_relayerArgs, MeshContext>,
  /** null **/
  testgoerli_relayers: InContextSdkMethod<Subscription['testgoerli_relayers'], Subscriptiontestgoerli_relayersArgs, MeshContext>,
  /** null **/
  testgoerli_sequencer: InContextSdkMethod<Subscription['testgoerli_sequencer'], Subscriptiontestgoerli_sequencerArgs, MeshContext>,
  /** null **/
  testgoerli_sequencers: InContextSdkMethod<Subscription['testgoerli_sequencers'], Subscriptiontestgoerli_sequencersArgs, MeshContext>,
  /** null **/
  testgoerli_relayerFee: InContextSdkMethod<Subscription['testgoerli_relayerFee'], Subscriptiontestgoerli_relayerFeeArgs, MeshContext>,
  /** null **/
  testgoerli_relayerFees: InContextSdkMethod<Subscription['testgoerli_relayerFees'], Subscriptiontestgoerli_relayerFeesArgs, MeshContext>,
  /** null **/
  testgoerli_originTransfer: InContextSdkMethod<Subscription['testgoerli_originTransfer'], Subscriptiontestgoerli_originTransferArgs, MeshContext>,
  /** null **/
  testgoerli_originTransfers: InContextSdkMethod<Subscription['testgoerli_originTransfers'], Subscriptiontestgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  testgoerli_destinationTransfer: InContextSdkMethod<Subscription['testgoerli_destinationTransfer'], Subscriptiontestgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  testgoerli_destinationTransfers: InContextSdkMethod<Subscription['testgoerli_destinationTransfers'], Subscriptiontestgoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  testgoerli_originMessage: InContextSdkMethod<Subscription['testgoerli_originMessage'], Subscriptiontestgoerli_originMessageArgs, MeshContext>,
  /** null **/
  testgoerli_originMessages: InContextSdkMethod<Subscription['testgoerli_originMessages'], Subscriptiontestgoerli_originMessagesArgs, MeshContext>,
  /** null **/
  testgoerli_aggregateRoot: InContextSdkMethod<Subscription['testgoerli_aggregateRoot'], Subscriptiontestgoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  testgoerli_aggregateRoots: InContextSdkMethod<Subscription['testgoerli_aggregateRoots'], Subscriptiontestgoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  testgoerli_connectorMeta: InContextSdkMethod<Subscription['testgoerli_connectorMeta'], Subscriptiontestgoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  testgoerli_connectorMetas: InContextSdkMethod<Subscription['testgoerli_connectorMetas'], Subscriptiontestgoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  testgoerli_rootCount: InContextSdkMethod<Subscription['testgoerli_rootCount'], Subscriptiontestgoerli_rootCountArgs, MeshContext>,
  /** null **/
  testgoerli_rootCounts: InContextSdkMethod<Subscription['testgoerli_rootCounts'], Subscriptiontestgoerli_rootCountsArgs, MeshContext>,
  /** null **/
  testgoerli_rootMessageSent: InContextSdkMethod<Subscription['testgoerli_rootMessageSent'], Subscriptiontestgoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  testgoerli_rootMessageSents: InContextSdkMethod<Subscription['testgoerli_rootMessageSents'], Subscriptiontestgoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  testgoerli_relayerFeesIncrease: InContextSdkMethod<Subscription['testgoerli_relayerFeesIncrease'], Subscriptiontestgoerli_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  testgoerli_relayerFeesIncreases: InContextSdkMethod<Subscription['testgoerli_relayerFeesIncreases'], Subscriptiontestgoerli_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  testgoerli_slippageUpdate: InContextSdkMethod<Subscription['testgoerli_slippageUpdate'], Subscriptiontestgoerli_slippageUpdateArgs, MeshContext>,
  /** null **/
  testgoerli_slippageUpdates: InContextSdkMethod<Subscription['testgoerli_slippageUpdates'], Subscriptiontestgoerli_slippageUpdatesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  testgoerli__meta: InContextSdkMethod<Subscription['testgoerli__meta'], Subscriptiontestgoerli__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Test_Goerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
