// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextTestMumbaiTypes {
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
  testmumbai_BigDecimal: any;
  BigInt: any;
  testmumbai_Bytes: any;
};

export type testmumbai_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['testmumbai_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type testmumbai_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['testmumbai_Bytes']>;
  root_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  root_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  root_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  root_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  root_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testmumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmumbai_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmumbai_AggregateRoot_filter>>>;
};

export type testmumbai_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type testmumbai_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['testmumbai_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['testmumbai_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['testmumbai_Bytes']>;
  localAsset?: Maybe<Scalars['testmumbai_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<testmumbai_AssetStatus>;
};

export type testmumbai_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: testmumbai_Router;
  asset: testmumbai_Asset;
  feesEarned: Scalars['BigInt'];
};

export type testmumbai_AssetBalance_filter = {
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
  router_?: InputMaybe<testmumbai_Router_filter>;
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
  asset_?: InputMaybe<testmumbai_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testmumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmumbai_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmumbai_AssetBalance_filter>>>;
};

export type testmumbai_AssetBalance_orderBy =
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

export type testmumbai_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type testmumbai_AssetStatus_filter = {
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
  _change_block?: InputMaybe<testmumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmumbai_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmumbai_AssetStatus_filter>>>;
};

export type testmumbai_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type testmumbai_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['testmumbai_Bytes']>;
  key_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  key_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  key_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  key_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  key_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  key_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  decimal?: InputMaybe<Scalars['BigInt']>;
  decimal_not?: InputMaybe<Scalars['BigInt']>;
  decimal_gt?: InputMaybe<Scalars['BigInt']>;
  decimal_lt?: InputMaybe<Scalars['BigInt']>;
  decimal_gte?: InputMaybe<Scalars['BigInt']>;
  decimal_lte?: InputMaybe<Scalars['BigInt']>;
  decimal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  decimal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalId?: InputMaybe<Scalars['testmumbai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['testmumbai_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  localAsset?: InputMaybe<Scalars['testmumbai_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
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
  status_?: InputMaybe<testmumbai_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testmumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmumbai_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmumbai_Asset_filter>>>;
};

export type testmumbai_Asset_orderBy =
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

export type testmumbai_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type testmumbai_Block_height = {
  hash?: InputMaybe<Scalars['testmumbai_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type testmumbai_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['testmumbai_Bytes']>;
  rootManager?: Maybe<Scalars['testmumbai_Bytes']>;
  mirrorConnector?: Maybe<Scalars['testmumbai_Bytes']>;
};

export type testmumbai_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['testmumbai_Bytes']>;
  amb_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  amb_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  amb_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  amb_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  amb_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  rootManager?: InputMaybe<Scalars['testmumbai_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['testmumbai_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testmumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmumbai_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmumbai_ConnectorMeta_filter>>>;
};

export type testmumbai_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type testmumbai_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['testmumbai_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<testmumbai_TransferStatus>;
  routers?: Maybe<Array<testmumbai_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['testmumbai_Bytes']>;
  delegate?: Maybe<Scalars['testmumbai_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['testmumbai_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['testmumbai_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['testmumbai_Bytes']>;
  asset?: Maybe<testmumbai_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['testmumbai_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['testmumbai_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['testmumbai_Bytes']>;
  reconciledCaller?: Maybe<Scalars['testmumbai_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['testmumbai_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['testmumbai_Bytes']>;
};


export type testmumbai_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_Router_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_Router_filter>;
};

export type testmumbai_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<testmumbai_TransferStatus>;
  status_not?: InputMaybe<testmumbai_TransferStatus>;
  status_in?: InputMaybe<Array<testmumbai_TransferStatus>>;
  status_not_in?: InputMaybe<Array<testmumbai_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<testmumbai_Router_filter>;
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
  to?: InputMaybe<Scalars['testmumbai_Bytes']>;
  to_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  to_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  to_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  to_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  to_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  to_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  delegate?: InputMaybe<Scalars['testmumbai_Bytes']>;
  delegate_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['testmumbai_Bytes']>;
  callData_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  callData_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  callData_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  callData_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  callData_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
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
  originSender?: InputMaybe<Scalars['testmumbai_Bytes']>;
  originSender_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['testmumbai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
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
  asset_?: InputMaybe<testmumbai_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['testmumbai_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['testmumbai_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['testmumbai_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  reconciledCaller?: InputMaybe<Scalars['testmumbai_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['testmumbai_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['testmumbai_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testmumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmumbai_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmumbai_DestinationTransfer_filter>>>;
};

export type testmumbai_DestinationTransfer_orderBy =
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
export type testmumbai_OrderDirection =
  | 'asc'
  | 'desc';

export type testmumbai_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['testmumbai_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['testmumbai_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['testmumbai_Bytes']>;
  root?: Maybe<Scalars['testmumbai_Bytes']>;
  transactionHash?: Maybe<Scalars['testmumbai_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<testmumbai_RootCount>;
};

export type testmumbai_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['testmumbai_Bytes']>;
  leaf_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['testmumbai_Bytes']>;
  message_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  message_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  message_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  message_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  message_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  message_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  root?: InputMaybe<Scalars['testmumbai_Bytes']>;
  root_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  root_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  root_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  root_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  root_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
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
  rootCount_?: InputMaybe<testmumbai_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testmumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmumbai_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmumbai_OriginMessage_filter>>>;
};

export type testmumbai_OriginMessage_orderBy =
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

export type testmumbai_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['testmumbai_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<testmumbai_TransferStatus>;
  messageHash?: Maybe<Scalars['testmumbai_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['testmumbai_Bytes']>;
  delegate?: Maybe<Scalars['testmumbai_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['testmumbai_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['testmumbai_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['testmumbai_Bytes']>;
  asset?: Maybe<testmumbai_Asset>;
  transactingAsset?: Maybe<Scalars['testmumbai_Bytes']>;
  message?: Maybe<testmumbai_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<testmumbai_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['testmumbai_Bytes']>;
  caller?: Maybe<Scalars['testmumbai_Bytes']>;
  transactionHash?: Maybe<Scalars['testmumbai_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['testmumbai_Bytes']>;
};


export type testmumbai_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_RelayerFee_filter>;
};

export type testmumbai_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<testmumbai_TransferStatus>;
  status_not?: InputMaybe<testmumbai_TransferStatus>;
  status_in?: InputMaybe<Array<testmumbai_TransferStatus>>;
  status_not_in?: InputMaybe<Array<testmumbai_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['testmumbai_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
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
  to?: InputMaybe<Scalars['testmumbai_Bytes']>;
  to_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  to_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  to_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  to_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  to_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  to_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  delegate?: InputMaybe<Scalars['testmumbai_Bytes']>;
  delegate_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['testmumbai_Bytes']>;
  callData_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  callData_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  callData_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  callData_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  callData_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['testmumbai_Bytes']>;
  originSender_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['testmumbai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
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
  asset_?: InputMaybe<testmumbai_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
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
  message_?: InputMaybe<testmumbai_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<testmumbai_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['testmumbai_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['testmumbai_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testmumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmumbai_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmumbai_OriginTransfer_filter>>>;
};

export type testmumbai_OriginTransfer_orderBy =
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
  testmumbai_asset?: Maybe<testmumbai_Asset>;
  testmumbai_assets: Array<testmumbai_Asset>;
  testmumbai_assetStatus?: Maybe<testmumbai_AssetStatus>;
  testmumbai_assetStatuses: Array<testmumbai_AssetStatus>;
  testmumbai_assetBalance?: Maybe<testmumbai_AssetBalance>;
  testmumbai_assetBalances: Array<testmumbai_AssetBalance>;
  testmumbai_router?: Maybe<testmumbai_Router>;
  testmumbai_routers: Array<testmumbai_Router>;
  testmumbai_routerDailyTVL?: Maybe<testmumbai_RouterDailyTVL>;
  testmumbai_routerDailyTVLs: Array<testmumbai_RouterDailyTVL>;
  testmumbai_setting?: Maybe<testmumbai_Setting>;
  testmumbai_settings: Array<testmumbai_Setting>;
  testmumbai_relayer?: Maybe<testmumbai_Relayer>;
  testmumbai_relayers: Array<testmumbai_Relayer>;
  testmumbai_sequencer?: Maybe<testmumbai_Sequencer>;
  testmumbai_sequencers: Array<testmumbai_Sequencer>;
  testmumbai_relayerFee?: Maybe<testmumbai_RelayerFee>;
  testmumbai_relayerFees: Array<testmumbai_RelayerFee>;
  testmumbai_originTransfer?: Maybe<testmumbai_OriginTransfer>;
  testmumbai_originTransfers: Array<testmumbai_OriginTransfer>;
  testmumbai_destinationTransfer?: Maybe<testmumbai_DestinationTransfer>;
  testmumbai_destinationTransfers: Array<testmumbai_DestinationTransfer>;
  testmumbai_originMessage?: Maybe<testmumbai_OriginMessage>;
  testmumbai_originMessages: Array<testmumbai_OriginMessage>;
  testmumbai_aggregateRoot?: Maybe<testmumbai_AggregateRoot>;
  testmumbai_aggregateRoots: Array<testmumbai_AggregateRoot>;
  testmumbai_connectorMeta?: Maybe<testmumbai_ConnectorMeta>;
  testmumbai_connectorMetas: Array<testmumbai_ConnectorMeta>;
  testmumbai_rootCount?: Maybe<testmumbai_RootCount>;
  testmumbai_rootCounts: Array<testmumbai_RootCount>;
  testmumbai_rootMessageSent?: Maybe<testmumbai_RootMessageSent>;
  testmumbai_rootMessageSents: Array<testmumbai_RootMessageSent>;
  testmumbai_relayerFeesIncrease?: Maybe<testmumbai_RelayerFeesIncrease>;
  testmumbai_relayerFeesIncreases: Array<testmumbai_RelayerFeesIncrease>;
  testmumbai_slippageUpdate?: Maybe<testmumbai_SlippageUpdate>;
  testmumbai_slippageUpdates: Array<testmumbai_SlippageUpdate>;
  /** Access to subgraph metadata */
  testmumbai__meta?: Maybe<testmumbai__Meta_>;
};


export type Querytestmumbai_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_Asset_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_Asset_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_AssetStatus_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_AssetBalance_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_Router_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_Router_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_RouterDailyTVL_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_Setting_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_Setting_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_Relayer_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_Relayer_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_Sequencer_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_Sequencer_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_RelayerFee_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_OriginTransfer_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_DestinationTransfer_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_OriginMessage_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_AggregateRoot_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_ConnectorMeta_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_RootCount_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_RootCount_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_RootMessageSent_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_RelayerFeesIncrease_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_SlippageUpdate_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmumbai__metaArgs = {
  block?: InputMaybe<testmumbai_Block_height>;
};

export type testmumbai_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['testmumbai_Bytes']>;
};

export type testmumbai_RelayerFee = {
  id: Scalars['ID'];
  transfer: testmumbai_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['testmumbai_Bytes'];
};

export type testmumbai_RelayerFee_filter = {
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
  transfer_?: InputMaybe<testmumbai_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['testmumbai_Bytes']>;
  asset_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  asset_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  asset_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  asset_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  asset_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testmumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmumbai_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmumbai_RelayerFee_filter>>>;
};

export type testmumbai_RelayerFee_orderBy =
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

export type testmumbai_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: testmumbai_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['testmumbai_Bytes']>;
  caller: Scalars['testmumbai_Bytes'];
  transactionHash: Scalars['testmumbai_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type testmumbai_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<testmumbai_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['testmumbai_Bytes']>;
  asset_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  asset_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  asset_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  asset_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  asset_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
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
  _change_block?: InputMaybe<testmumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmumbai_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmumbai_RelayerFeesIncrease_filter>>>;
};

export type testmumbai_RelayerFeesIncrease_orderBy =
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

export type testmumbai_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['testmumbai_Bytes']>;
  relayer_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testmumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmumbai_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmumbai_Relayer_filter>>>;
};

export type testmumbai_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type testmumbai_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type testmumbai_RootCount_filter = {
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
  _change_block?: InputMaybe<testmumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmumbai_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmumbai_RootCount_filter>>>;
};

export type testmumbai_RootCount_orderBy =
  | 'id'
  | 'count';

export type testmumbai_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['testmumbai_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['testmumbai_Bytes']>;
  transactionHash?: Maybe<Scalars['testmumbai_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type testmumbai_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['testmumbai_Bytes']>;
  root_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  root_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  root_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  root_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  root_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
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
  _change_block?: InputMaybe<testmumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmumbai_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmumbai_RootMessageSent_filter>>>;
};

export type testmumbai_RootMessageSent_orderBy =
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

export type testmumbai_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['testmumbai_Bytes']>;
  recipient?: Maybe<Scalars['testmumbai_Bytes']>;
  proposedOwner?: Maybe<Scalars['testmumbai_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<testmumbai_AssetBalance>;
};


export type testmumbai_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_AssetBalance_filter>;
};

export type testmumbai_RouterDailyTVL = {
  id: Scalars['ID'];
  router: testmumbai_Router;
  asset: testmumbai_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type testmumbai_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<testmumbai_Router_filter>;
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
  asset_?: InputMaybe<testmumbai_Asset_filter>;
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
  _change_block?: InputMaybe<testmumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmumbai_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmumbai_RouterDailyTVL_filter>>>;
};

export type testmumbai_RouterDailyTVL_orderBy =
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

export type testmumbai_Router_filter = {
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
  owner?: InputMaybe<Scalars['testmumbai_Bytes']>;
  owner_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  owner_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  owner_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  owner_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  owner_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  recipient?: InputMaybe<Scalars['testmumbai_Bytes']>;
  recipient_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['testmumbai_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<testmumbai_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testmumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmumbai_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmumbai_Router_filter>>>;
};

export type testmumbai_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type testmumbai_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['testmumbai_Bytes']>;
};

export type testmumbai_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['testmumbai_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testmumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmumbai_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmumbai_Sequencer_filter>>>;
};

export type testmumbai_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type testmumbai_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['testmumbai_Bytes'];
};

export type testmumbai_Setting_filter = {
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
  caller?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testmumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmumbai_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmumbai_Setting_filter>>>;
};

export type testmumbai_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type testmumbai_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: testmumbai_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['testmumbai_Bytes'];
  transactionHash: Scalars['testmumbai_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type testmumbai_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<testmumbai_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testmumbai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testmumbai_Bytes']>;
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
  _change_block?: InputMaybe<testmumbai_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmumbai_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmumbai_SlippageUpdate_filter>>>;
};

export type testmumbai_SlippageUpdate_orderBy =
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
  testmumbai_asset?: Maybe<testmumbai_Asset>;
  testmumbai_assets: Array<testmumbai_Asset>;
  testmumbai_assetStatus?: Maybe<testmumbai_AssetStatus>;
  testmumbai_assetStatuses: Array<testmumbai_AssetStatus>;
  testmumbai_assetBalance?: Maybe<testmumbai_AssetBalance>;
  testmumbai_assetBalances: Array<testmumbai_AssetBalance>;
  testmumbai_router?: Maybe<testmumbai_Router>;
  testmumbai_routers: Array<testmumbai_Router>;
  testmumbai_routerDailyTVL?: Maybe<testmumbai_RouterDailyTVL>;
  testmumbai_routerDailyTVLs: Array<testmumbai_RouterDailyTVL>;
  testmumbai_setting?: Maybe<testmumbai_Setting>;
  testmumbai_settings: Array<testmumbai_Setting>;
  testmumbai_relayer?: Maybe<testmumbai_Relayer>;
  testmumbai_relayers: Array<testmumbai_Relayer>;
  testmumbai_sequencer?: Maybe<testmumbai_Sequencer>;
  testmumbai_sequencers: Array<testmumbai_Sequencer>;
  testmumbai_relayerFee?: Maybe<testmumbai_RelayerFee>;
  testmumbai_relayerFees: Array<testmumbai_RelayerFee>;
  testmumbai_originTransfer?: Maybe<testmumbai_OriginTransfer>;
  testmumbai_originTransfers: Array<testmumbai_OriginTransfer>;
  testmumbai_destinationTransfer?: Maybe<testmumbai_DestinationTransfer>;
  testmumbai_destinationTransfers: Array<testmumbai_DestinationTransfer>;
  testmumbai_originMessage?: Maybe<testmumbai_OriginMessage>;
  testmumbai_originMessages: Array<testmumbai_OriginMessage>;
  testmumbai_aggregateRoot?: Maybe<testmumbai_AggregateRoot>;
  testmumbai_aggregateRoots: Array<testmumbai_AggregateRoot>;
  testmumbai_connectorMeta?: Maybe<testmumbai_ConnectorMeta>;
  testmumbai_connectorMetas: Array<testmumbai_ConnectorMeta>;
  testmumbai_rootCount?: Maybe<testmumbai_RootCount>;
  testmumbai_rootCounts: Array<testmumbai_RootCount>;
  testmumbai_rootMessageSent?: Maybe<testmumbai_RootMessageSent>;
  testmumbai_rootMessageSents: Array<testmumbai_RootMessageSent>;
  testmumbai_relayerFeesIncrease?: Maybe<testmumbai_RelayerFeesIncrease>;
  testmumbai_relayerFeesIncreases: Array<testmumbai_RelayerFeesIncrease>;
  testmumbai_slippageUpdate?: Maybe<testmumbai_SlippageUpdate>;
  testmumbai_slippageUpdates: Array<testmumbai_SlippageUpdate>;
  /** Access to subgraph metadata */
  testmumbai__meta?: Maybe<testmumbai__Meta_>;
};


export type Subscriptiontestmumbai_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_Asset_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_Asset_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_AssetStatus_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_AssetBalance_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_Router_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_Router_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_RouterDailyTVL_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_Setting_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_Setting_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_Relayer_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_Relayer_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_Sequencer_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_Sequencer_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_RelayerFee_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_OriginTransfer_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_DestinationTransfer_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_OriginMessage_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_AggregateRoot_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_ConnectorMeta_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_RootCount_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_RootCount_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_RootMessageSent_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_RelayerFeesIncrease_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmumbai_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<testmumbai_OrderDirection>;
  where?: InputMaybe<testmumbai_SlippageUpdate_filter>;
  block?: InputMaybe<testmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmumbai__metaArgs = {
  block?: InputMaybe<testmumbai_Block_height>;
};

export type testmumbai_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type testmumbai__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['testmumbai_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type testmumbai__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: testmumbai__Block_;
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
  testmumbai_asset: InContextSdkMethod<Query['testmumbai_asset'], Querytestmumbai_assetArgs, MeshContext>,
  /** null **/
  testmumbai_assets: InContextSdkMethod<Query['testmumbai_assets'], Querytestmumbai_assetsArgs, MeshContext>,
  /** null **/
  testmumbai_assetStatus: InContextSdkMethod<Query['testmumbai_assetStatus'], Querytestmumbai_assetStatusArgs, MeshContext>,
  /** null **/
  testmumbai_assetStatuses: InContextSdkMethod<Query['testmumbai_assetStatuses'], Querytestmumbai_assetStatusesArgs, MeshContext>,
  /** null **/
  testmumbai_assetBalance: InContextSdkMethod<Query['testmumbai_assetBalance'], Querytestmumbai_assetBalanceArgs, MeshContext>,
  /** null **/
  testmumbai_assetBalances: InContextSdkMethod<Query['testmumbai_assetBalances'], Querytestmumbai_assetBalancesArgs, MeshContext>,
  /** null **/
  testmumbai_router: InContextSdkMethod<Query['testmumbai_router'], Querytestmumbai_routerArgs, MeshContext>,
  /** null **/
  testmumbai_routers: InContextSdkMethod<Query['testmumbai_routers'], Querytestmumbai_routersArgs, MeshContext>,
  /** null **/
  testmumbai_routerDailyTVL: InContextSdkMethod<Query['testmumbai_routerDailyTVL'], Querytestmumbai_routerDailyTVLArgs, MeshContext>,
  /** null **/
  testmumbai_routerDailyTVLs: InContextSdkMethod<Query['testmumbai_routerDailyTVLs'], Querytestmumbai_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  testmumbai_setting: InContextSdkMethod<Query['testmumbai_setting'], Querytestmumbai_settingArgs, MeshContext>,
  /** null **/
  testmumbai_settings: InContextSdkMethod<Query['testmumbai_settings'], Querytestmumbai_settingsArgs, MeshContext>,
  /** null **/
  testmumbai_relayer: InContextSdkMethod<Query['testmumbai_relayer'], Querytestmumbai_relayerArgs, MeshContext>,
  /** null **/
  testmumbai_relayers: InContextSdkMethod<Query['testmumbai_relayers'], Querytestmumbai_relayersArgs, MeshContext>,
  /** null **/
  testmumbai_sequencer: InContextSdkMethod<Query['testmumbai_sequencer'], Querytestmumbai_sequencerArgs, MeshContext>,
  /** null **/
  testmumbai_sequencers: InContextSdkMethod<Query['testmumbai_sequencers'], Querytestmumbai_sequencersArgs, MeshContext>,
  /** null **/
  testmumbai_relayerFee: InContextSdkMethod<Query['testmumbai_relayerFee'], Querytestmumbai_relayerFeeArgs, MeshContext>,
  /** null **/
  testmumbai_relayerFees: InContextSdkMethod<Query['testmumbai_relayerFees'], Querytestmumbai_relayerFeesArgs, MeshContext>,
  /** null **/
  testmumbai_originTransfer: InContextSdkMethod<Query['testmumbai_originTransfer'], Querytestmumbai_originTransferArgs, MeshContext>,
  /** null **/
  testmumbai_originTransfers: InContextSdkMethod<Query['testmumbai_originTransfers'], Querytestmumbai_originTransfersArgs, MeshContext>,
  /** null **/
  testmumbai_destinationTransfer: InContextSdkMethod<Query['testmumbai_destinationTransfer'], Querytestmumbai_destinationTransferArgs, MeshContext>,
  /** null **/
  testmumbai_destinationTransfers: InContextSdkMethod<Query['testmumbai_destinationTransfers'], Querytestmumbai_destinationTransfersArgs, MeshContext>,
  /** null **/
  testmumbai_originMessage: InContextSdkMethod<Query['testmumbai_originMessage'], Querytestmumbai_originMessageArgs, MeshContext>,
  /** null **/
  testmumbai_originMessages: InContextSdkMethod<Query['testmumbai_originMessages'], Querytestmumbai_originMessagesArgs, MeshContext>,
  /** null **/
  testmumbai_aggregateRoot: InContextSdkMethod<Query['testmumbai_aggregateRoot'], Querytestmumbai_aggregateRootArgs, MeshContext>,
  /** null **/
  testmumbai_aggregateRoots: InContextSdkMethod<Query['testmumbai_aggregateRoots'], Querytestmumbai_aggregateRootsArgs, MeshContext>,
  /** null **/
  testmumbai_connectorMeta: InContextSdkMethod<Query['testmumbai_connectorMeta'], Querytestmumbai_connectorMetaArgs, MeshContext>,
  /** null **/
  testmumbai_connectorMetas: InContextSdkMethod<Query['testmumbai_connectorMetas'], Querytestmumbai_connectorMetasArgs, MeshContext>,
  /** null **/
  testmumbai_rootCount: InContextSdkMethod<Query['testmumbai_rootCount'], Querytestmumbai_rootCountArgs, MeshContext>,
  /** null **/
  testmumbai_rootCounts: InContextSdkMethod<Query['testmumbai_rootCounts'], Querytestmumbai_rootCountsArgs, MeshContext>,
  /** null **/
  testmumbai_rootMessageSent: InContextSdkMethod<Query['testmumbai_rootMessageSent'], Querytestmumbai_rootMessageSentArgs, MeshContext>,
  /** null **/
  testmumbai_rootMessageSents: InContextSdkMethod<Query['testmumbai_rootMessageSents'], Querytestmumbai_rootMessageSentsArgs, MeshContext>,
  /** null **/
  testmumbai_relayerFeesIncrease: InContextSdkMethod<Query['testmumbai_relayerFeesIncrease'], Querytestmumbai_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  testmumbai_relayerFeesIncreases: InContextSdkMethod<Query['testmumbai_relayerFeesIncreases'], Querytestmumbai_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  testmumbai_slippageUpdate: InContextSdkMethod<Query['testmumbai_slippageUpdate'], Querytestmumbai_slippageUpdateArgs, MeshContext>,
  /** null **/
  testmumbai_slippageUpdates: InContextSdkMethod<Query['testmumbai_slippageUpdates'], Querytestmumbai_slippageUpdatesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  testmumbai__meta: InContextSdkMethod<Query['testmumbai__meta'], Querytestmumbai__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  testmumbai_asset: InContextSdkMethod<Subscription['testmumbai_asset'], Subscriptiontestmumbai_assetArgs, MeshContext>,
  /** null **/
  testmumbai_assets: InContextSdkMethod<Subscription['testmumbai_assets'], Subscriptiontestmumbai_assetsArgs, MeshContext>,
  /** null **/
  testmumbai_assetStatus: InContextSdkMethod<Subscription['testmumbai_assetStatus'], Subscriptiontestmumbai_assetStatusArgs, MeshContext>,
  /** null **/
  testmumbai_assetStatuses: InContextSdkMethod<Subscription['testmumbai_assetStatuses'], Subscriptiontestmumbai_assetStatusesArgs, MeshContext>,
  /** null **/
  testmumbai_assetBalance: InContextSdkMethod<Subscription['testmumbai_assetBalance'], Subscriptiontestmumbai_assetBalanceArgs, MeshContext>,
  /** null **/
  testmumbai_assetBalances: InContextSdkMethod<Subscription['testmumbai_assetBalances'], Subscriptiontestmumbai_assetBalancesArgs, MeshContext>,
  /** null **/
  testmumbai_router: InContextSdkMethod<Subscription['testmumbai_router'], Subscriptiontestmumbai_routerArgs, MeshContext>,
  /** null **/
  testmumbai_routers: InContextSdkMethod<Subscription['testmumbai_routers'], Subscriptiontestmumbai_routersArgs, MeshContext>,
  /** null **/
  testmumbai_routerDailyTVL: InContextSdkMethod<Subscription['testmumbai_routerDailyTVL'], Subscriptiontestmumbai_routerDailyTVLArgs, MeshContext>,
  /** null **/
  testmumbai_routerDailyTVLs: InContextSdkMethod<Subscription['testmumbai_routerDailyTVLs'], Subscriptiontestmumbai_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  testmumbai_setting: InContextSdkMethod<Subscription['testmumbai_setting'], Subscriptiontestmumbai_settingArgs, MeshContext>,
  /** null **/
  testmumbai_settings: InContextSdkMethod<Subscription['testmumbai_settings'], Subscriptiontestmumbai_settingsArgs, MeshContext>,
  /** null **/
  testmumbai_relayer: InContextSdkMethod<Subscription['testmumbai_relayer'], Subscriptiontestmumbai_relayerArgs, MeshContext>,
  /** null **/
  testmumbai_relayers: InContextSdkMethod<Subscription['testmumbai_relayers'], Subscriptiontestmumbai_relayersArgs, MeshContext>,
  /** null **/
  testmumbai_sequencer: InContextSdkMethod<Subscription['testmumbai_sequencer'], Subscriptiontestmumbai_sequencerArgs, MeshContext>,
  /** null **/
  testmumbai_sequencers: InContextSdkMethod<Subscription['testmumbai_sequencers'], Subscriptiontestmumbai_sequencersArgs, MeshContext>,
  /** null **/
  testmumbai_relayerFee: InContextSdkMethod<Subscription['testmumbai_relayerFee'], Subscriptiontestmumbai_relayerFeeArgs, MeshContext>,
  /** null **/
  testmumbai_relayerFees: InContextSdkMethod<Subscription['testmumbai_relayerFees'], Subscriptiontestmumbai_relayerFeesArgs, MeshContext>,
  /** null **/
  testmumbai_originTransfer: InContextSdkMethod<Subscription['testmumbai_originTransfer'], Subscriptiontestmumbai_originTransferArgs, MeshContext>,
  /** null **/
  testmumbai_originTransfers: InContextSdkMethod<Subscription['testmumbai_originTransfers'], Subscriptiontestmumbai_originTransfersArgs, MeshContext>,
  /** null **/
  testmumbai_destinationTransfer: InContextSdkMethod<Subscription['testmumbai_destinationTransfer'], Subscriptiontestmumbai_destinationTransferArgs, MeshContext>,
  /** null **/
  testmumbai_destinationTransfers: InContextSdkMethod<Subscription['testmumbai_destinationTransfers'], Subscriptiontestmumbai_destinationTransfersArgs, MeshContext>,
  /** null **/
  testmumbai_originMessage: InContextSdkMethod<Subscription['testmumbai_originMessage'], Subscriptiontestmumbai_originMessageArgs, MeshContext>,
  /** null **/
  testmumbai_originMessages: InContextSdkMethod<Subscription['testmumbai_originMessages'], Subscriptiontestmumbai_originMessagesArgs, MeshContext>,
  /** null **/
  testmumbai_aggregateRoot: InContextSdkMethod<Subscription['testmumbai_aggregateRoot'], Subscriptiontestmumbai_aggregateRootArgs, MeshContext>,
  /** null **/
  testmumbai_aggregateRoots: InContextSdkMethod<Subscription['testmumbai_aggregateRoots'], Subscriptiontestmumbai_aggregateRootsArgs, MeshContext>,
  /** null **/
  testmumbai_connectorMeta: InContextSdkMethod<Subscription['testmumbai_connectorMeta'], Subscriptiontestmumbai_connectorMetaArgs, MeshContext>,
  /** null **/
  testmumbai_connectorMetas: InContextSdkMethod<Subscription['testmumbai_connectorMetas'], Subscriptiontestmumbai_connectorMetasArgs, MeshContext>,
  /** null **/
  testmumbai_rootCount: InContextSdkMethod<Subscription['testmumbai_rootCount'], Subscriptiontestmumbai_rootCountArgs, MeshContext>,
  /** null **/
  testmumbai_rootCounts: InContextSdkMethod<Subscription['testmumbai_rootCounts'], Subscriptiontestmumbai_rootCountsArgs, MeshContext>,
  /** null **/
  testmumbai_rootMessageSent: InContextSdkMethod<Subscription['testmumbai_rootMessageSent'], Subscriptiontestmumbai_rootMessageSentArgs, MeshContext>,
  /** null **/
  testmumbai_rootMessageSents: InContextSdkMethod<Subscription['testmumbai_rootMessageSents'], Subscriptiontestmumbai_rootMessageSentsArgs, MeshContext>,
  /** null **/
  testmumbai_relayerFeesIncrease: InContextSdkMethod<Subscription['testmumbai_relayerFeesIncrease'], Subscriptiontestmumbai_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  testmumbai_relayerFeesIncreases: InContextSdkMethod<Subscription['testmumbai_relayerFeesIncreases'], Subscriptiontestmumbai_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  testmumbai_slippageUpdate: InContextSdkMethod<Subscription['testmumbai_slippageUpdate'], Subscriptiontestmumbai_slippageUpdateArgs, MeshContext>,
  /** null **/
  testmumbai_slippageUpdates: InContextSdkMethod<Subscription['testmumbai_slippageUpdates'], Subscriptiontestmumbai_slippageUpdatesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  testmumbai__meta: InContextSdkMethod<Subscription['testmumbai__meta'], Subscriptiontestmumbai__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Test_Mumbai"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
