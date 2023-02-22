// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextTestOptimismTypes {
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
  testoptimism_BigDecimal: any;
  BigInt: any;
  testoptimism_Bytes: any;
};

export type testoptimism_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['testoptimism_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type testoptimism_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['testoptimism_Bytes']>;
  root_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  root_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  root_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  root_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  root_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  root_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimism_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimism_AggregateRoot_filter>>>;
};

export type testoptimism_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type testoptimism_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['testoptimism_Bytes']>;
  canonicalId?: Maybe<Scalars['testoptimism_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['testoptimism_Bytes']>;
  localAsset?: Maybe<Scalars['testoptimism_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type testoptimism_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: testoptimism_Router;
  asset: testoptimism_Asset;
  feesEarned: Scalars['BigInt'];
};

export type testoptimism_AssetBalance_filter = {
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
  router_?: InputMaybe<testoptimism_Router_filter>;
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
  asset_?: InputMaybe<testoptimism_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimism_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimism_AssetBalance_filter>>>;
};

export type testoptimism_AssetBalance_orderBy =
  | 'id'
  | 'amount'
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
  | 'asset__canonicalId'
  | 'asset__canonicalDomain'
  | 'asset__adoptedAsset'
  | 'asset__localAsset'
  | 'asset__blockNumber'
  | 'feesEarned';

export type testoptimism_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['testoptimism_Bytes']>;
  key_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  key_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  key_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  key_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  key_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  key_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['testoptimism_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  localAsset?: InputMaybe<Scalars['testoptimism_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimism_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimism_Asset_filter>>>;
};

export type testoptimism_Asset_orderBy =
  | 'id'
  | 'key'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber';

export type testoptimism_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type testoptimism_Block_height = {
  hash?: InputMaybe<Scalars['testoptimism_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type testoptimism_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['testoptimism_Bytes']>;
  rootManager?: Maybe<Scalars['testoptimism_Bytes']>;
  mirrorConnector?: Maybe<Scalars['testoptimism_Bytes']>;
};

export type testoptimism_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['testoptimism_Bytes']>;
  amb_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  amb_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  amb_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  amb_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  amb_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  rootManager?: InputMaybe<Scalars['testoptimism_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['testoptimism_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimism_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimism_ConnectorMeta_filter>>>;
};

export type testoptimism_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type testoptimism_DestinationMessage = {
  id: Scalars['ID'];
  leaf?: Maybe<Scalars['testoptimism_Bytes']>;
  processed?: Maybe<Scalars['Boolean']>;
  returnData?: Maybe<Scalars['testoptimism_Bytes']>;
  success?: Maybe<Scalars['Boolean']>;
  transactionHash?: Maybe<Scalars['testoptimism_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type testoptimism_DestinationMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  leaf?: InputMaybe<Scalars['testoptimism_Bytes']>;
  leaf_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  processed?: InputMaybe<Scalars['Boolean']>;
  processed_not?: InputMaybe<Scalars['Boolean']>;
  processed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  processed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  returnData?: InputMaybe<Scalars['testoptimism_Bytes']>;
  returnData_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  returnData_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  returnData_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  returnData_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  returnData_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  returnData_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  returnData_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  returnData_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  returnData_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  success?: InputMaybe<Scalars['Boolean']>;
  success_not?: InputMaybe<Scalars['Boolean']>;
  success_in?: InputMaybe<Array<Scalars['Boolean']>>;
  success_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  transactionHash?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimism_DestinationMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimism_DestinationMessage_filter>>>;
};

export type testoptimism_DestinationMessage_orderBy =
  | 'id'
  | 'leaf'
  | 'processed'
  | 'returnData'
  | 'success'
  | 'transactionHash'
  | 'blockNumber';

export type testoptimism_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['testoptimism_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<testoptimism_TransferStatus>;
  routers?: Maybe<Array<testoptimism_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['testoptimism_Bytes']>;
  delegate?: Maybe<Scalars['testoptimism_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['testoptimism_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['testoptimism_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['testoptimism_Bytes']>;
  asset?: Maybe<testoptimism_Asset>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['testoptimism_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['testoptimism_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['testoptimism_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['testoptimism_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type testoptimism_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_Router_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_Router_filter>;
};

export type testoptimism_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transferId_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<testoptimism_TransferStatus>;
  status_not?: InputMaybe<testoptimism_TransferStatus>;
  status_in?: InputMaybe<Array<testoptimism_TransferStatus>>;
  status_not_in?: InputMaybe<Array<testoptimism_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<testoptimism_Router_filter>;
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
  to?: InputMaybe<Scalars['testoptimism_Bytes']>;
  to_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  to_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  to_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  to_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  to_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  to_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  delegate?: InputMaybe<Scalars['testoptimism_Bytes']>;
  delegate_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['testoptimism_Bytes']>;
  callData_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  callData_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  callData_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  callData_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  callData_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['testoptimism_Bytes']>;
  originSender_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
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
  asset_?: InputMaybe<testoptimism_Asset_filter>;
  routersFee?: InputMaybe<Scalars['BigInt']>;
  routersFee_not?: InputMaybe<Scalars['BigInt']>;
  routersFee_gt?: InputMaybe<Scalars['BigInt']>;
  routersFee_lt?: InputMaybe<Scalars['BigInt']>;
  routersFee_gte?: InputMaybe<Scalars['BigInt']>;
  routersFee_lte?: InputMaybe<Scalars['BigInt']>;
  routersFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  routersFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['testoptimism_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['testoptimism_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
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
  reconciledCaller?: InputMaybe<Scalars['testoptimism_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['testoptimism_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimism_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimism_DestinationTransfer_filter>>>;
};

export type testoptimism_DestinationTransfer_orderBy =
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
  | 'originSender'
  | 'bridgedAmt'
  | 'normalizedIn'
  | 'canonicalId'
  | 'asset'
  | 'asset__id'
  | 'asset__key'
  | 'asset__canonicalId'
  | 'asset__canonicalDomain'
  | 'asset__adoptedAsset'
  | 'asset__localAsset'
  | 'asset__blockNumber'
  | 'routersFee'
  | 'executedCaller'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'reconciledCaller'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber';

/** Defines the order direction, either ascending or descending */
export type testoptimism_OrderDirection =
  | 'asc'
  | 'desc';

export type testoptimism_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['testoptimism_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['testoptimism_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['testoptimism_Bytes']>;
  message?: Maybe<Scalars['testoptimism_Bytes']>;
  transactionHash?: Maybe<Scalars['testoptimism_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<testoptimism_RootCount>;
};

export type testoptimism_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transferId_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['testoptimism_Bytes']>;
  leaf_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  root?: InputMaybe<Scalars['testoptimism_Bytes']>;
  root_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  root_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  root_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  root_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  root_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  root_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  message?: InputMaybe<Scalars['testoptimism_Bytes']>;
  message_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  message_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  message_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  message_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  message_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  message_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
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
  rootCount_?: InputMaybe<testoptimism_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimism_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimism_OriginMessage_filter>>>;
};

export type testoptimism_OriginMessage_orderBy =
  | 'id'
  | 'transferId'
  | 'destinationDomain'
  | 'leaf'
  | 'index'
  | 'root'
  | 'message'
  | 'transactionHash'
  | 'blockNumber'
  | 'rootCount'
  | 'rootCount__id'
  | 'rootCount__count';

export type testoptimism_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['testoptimism_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<testoptimism_TransferStatus>;
  messageHash?: Maybe<Scalars['testoptimism_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['testoptimism_Bytes']>;
  delegate?: Maybe<Scalars['testoptimism_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['testoptimism_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['testoptimism_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['testoptimism_Bytes']>;
  asset?: Maybe<testoptimism_Asset>;
  message?: Maybe<testoptimism_OriginMessage>;
  caller?: Maybe<Scalars['testoptimism_Bytes']>;
  transactionHash?: Maybe<Scalars['testoptimism_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type testoptimism_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transferId_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<testoptimism_TransferStatus>;
  status_not?: InputMaybe<testoptimism_TransferStatus>;
  status_in?: InputMaybe<Array<testoptimism_TransferStatus>>;
  status_not_in?: InputMaybe<Array<testoptimism_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['testoptimism_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
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
  to?: InputMaybe<Scalars['testoptimism_Bytes']>;
  to_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  to_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  to_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  to_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  to_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  to_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  delegate?: InputMaybe<Scalars['testoptimism_Bytes']>;
  delegate_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['testoptimism_Bytes']>;
  callData_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  callData_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  callData_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  callData_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  callData_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['testoptimism_Bytes']>;
  originSender_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
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
  asset_?: InputMaybe<testoptimism_Asset_filter>;
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
  message_?: InputMaybe<testoptimism_OriginMessage_filter>;
  caller?: InputMaybe<Scalars['testoptimism_Bytes']>;
  caller_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
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
  _change_block?: InputMaybe<testoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimism_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimism_OriginTransfer_filter>>>;
};

export type testoptimism_OriginTransfer_orderBy =
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
  | 'asset__canonicalId'
  | 'asset__canonicalDomain'
  | 'asset__adoptedAsset'
  | 'asset__localAsset'
  | 'asset__blockNumber'
  | 'message'
  | 'message__id'
  | 'message__transferId'
  | 'message__destinationDomain'
  | 'message__leaf'
  | 'message__index'
  | 'message__root'
  | 'message__message'
  | 'message__transactionHash'
  | 'message__blockNumber'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type testoptimism_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['testoptimism_Bytes'];
};

export type testoptimism_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['testoptimism_Bytes']>;
  asset_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  asset_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  asset_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  asset_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  asset_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimism_PooledToken_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimism_PooledToken_filter>>>;
};

export type testoptimism_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  testoptimism_asset?: Maybe<testoptimism_Asset>;
  testoptimism_assets: Array<testoptimism_Asset>;
  testoptimism_assetBalance?: Maybe<testoptimism_AssetBalance>;
  testoptimism_assetBalances: Array<testoptimism_AssetBalance>;
  testoptimism_router?: Maybe<testoptimism_Router>;
  testoptimism_routers: Array<testoptimism_Router>;
  testoptimism_setting?: Maybe<testoptimism_Setting>;
  testoptimism_settings: Array<testoptimism_Setting>;
  testoptimism_relayer?: Maybe<testoptimism_Relayer>;
  testoptimism_relayers: Array<testoptimism_Relayer>;
  testoptimism_sequencer?: Maybe<testoptimism_Sequencer>;
  testoptimism_sequencers: Array<testoptimism_Sequencer>;
  testoptimism_originTransfer?: Maybe<testoptimism_OriginTransfer>;
  testoptimism_originTransfers: Array<testoptimism_OriginTransfer>;
  testoptimism_destinationTransfer?: Maybe<testoptimism_DestinationTransfer>;
  testoptimism_destinationTransfers: Array<testoptimism_DestinationTransfer>;
  testoptimism_originMessage?: Maybe<testoptimism_OriginMessage>;
  testoptimism_originMessages: Array<testoptimism_OriginMessage>;
  testoptimism_destinationMessage?: Maybe<testoptimism_DestinationMessage>;
  testoptimism_destinationMessages: Array<testoptimism_DestinationMessage>;
  testoptimism_aggregateRoot?: Maybe<testoptimism_AggregateRoot>;
  testoptimism_aggregateRoots: Array<testoptimism_AggregateRoot>;
  testoptimism_connectorMeta?: Maybe<testoptimism_ConnectorMeta>;
  testoptimism_connectorMetas: Array<testoptimism_ConnectorMeta>;
  testoptimism_rootCount?: Maybe<testoptimism_RootCount>;
  testoptimism_rootCounts: Array<testoptimism_RootCount>;
  testoptimism_rootMessageSent?: Maybe<testoptimism_RootMessageSent>;
  testoptimism_rootMessageSents: Array<testoptimism_RootMessageSent>;
  testoptimism_stableSwap?: Maybe<testoptimism_StableSwap>;
  testoptimism_stableSwaps: Array<testoptimism_StableSwap>;
  testoptimism_pooledToken?: Maybe<testoptimism_PooledToken>;
  testoptimism_pooledTokens: Array<testoptimism_PooledToken>;
  testoptimism_stableSwapLiquidity?: Maybe<testoptimism_StableSwapLiquidity>;
  testoptimism_stableSwapLiquidities: Array<testoptimism_StableSwapLiquidity>;
  /** Access to subgraph metadata */
  testoptimism__meta?: Maybe<testoptimism__Meta_>;
};


export type Querytestoptimism_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_Asset_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_Asset_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_AssetBalance_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_Router_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_Router_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_Setting_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_Setting_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_Relayer_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_Relayer_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_Sequencer_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_Sequencer_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_OriginTransfer_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_DestinationTransfer_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_OriginMessage_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_DestinationMessage_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_AggregateRoot_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_ConnectorMeta_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_RootCount_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_RootCount_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_RootMessageSent_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_StableSwap_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_StableSwap_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_PooledToken_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_PooledToken_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_stableSwapLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism_stableSwapLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_StableSwapLiquidity_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_StableSwapLiquidity_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimism__metaArgs = {
  block?: InputMaybe<testoptimism_Block_height>;
};

export type testoptimism_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['testoptimism_Bytes']>;
};

export type testoptimism_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['testoptimism_Bytes']>;
  relayer_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimism_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimism_Relayer_filter>>>;
};

export type testoptimism_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type testoptimism_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type testoptimism_RootCount_filter = {
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
  _change_block?: InputMaybe<testoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimism_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimism_RootCount_filter>>>;
};

export type testoptimism_RootCount_orderBy =
  | 'id'
  | 'count';

export type testoptimism_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['testoptimism_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['testoptimism_Bytes']>;
  transactionHash?: Maybe<Scalars['testoptimism_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type testoptimism_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['testoptimism_Bytes']>;
  root_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  root_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  root_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  root_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  root_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  root_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['testoptimism_Bytes']>;
  caller_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
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
  _change_block?: InputMaybe<testoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimism_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimism_RootMessageSent_filter>>>;
};

export type testoptimism_RootMessageSent_orderBy =
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

export type testoptimism_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['testoptimism_Bytes']>;
  recipient?: Maybe<Scalars['testoptimism_Bytes']>;
  proposedOwner?: Maybe<Scalars['testoptimism_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<testoptimism_AssetBalance>;
};


export type testoptimism_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_AssetBalance_filter>;
};

export type testoptimism_Router_filter = {
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
  owner?: InputMaybe<Scalars['testoptimism_Bytes']>;
  owner_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  owner_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  owner_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  owner_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  owner_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  recipient?: InputMaybe<Scalars['testoptimism_Bytes']>;
  recipient_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['testoptimism_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<testoptimism_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimism_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimism_Router_filter>>>;
};

export type testoptimism_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type testoptimism_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['testoptimism_Bytes']>;
};

export type testoptimism_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['testoptimism_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimism_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimism_Sequencer_filter>>>;
};

export type testoptimism_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type testoptimism_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['testoptimism_Bytes'];
};

export type testoptimism_Setting_filter = {
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
  caller?: InputMaybe<Scalars['testoptimism_Bytes']>;
  caller_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimism_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimism_Setting_filter>>>;
};

export type testoptimism_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type testoptimism_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['testoptimism_Bytes']>;
  canonicalId?: Maybe<Scalars['testoptimism_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['testoptimism_Bytes']>;
  lpToken?: Maybe<Scalars['testoptimism_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<testoptimism_PooledToken>;
  tokenPrecisionMultipliers?: Maybe<Array<Scalars['BigInt']>>;
  balances: Array<Scalars['BigInt']>;
  adminFees?: Maybe<Array<Scalars['BigInt']>>;
};


export type testoptimism_StableSwappooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_PooledToken_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_PooledToken_filter>;
};

export type testoptimism_StableSwapLiquidity = {
  id: Scalars['ID'];
  provider: Scalars['testoptimism_Bytes'];
  stableSwap: testoptimism_StableSwap;
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply?: Maybe<Scalars['BigInt']>;
};

export type testoptimism_StableSwapLiquidity_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  provider?: InputMaybe<Scalars['testoptimism_Bytes']>;
  provider_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  provider_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  provider_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  provider_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  provider_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  stableSwap?: InputMaybe<Scalars['String']>;
  stableSwap_not?: InputMaybe<Scalars['String']>;
  stableSwap_gt?: InputMaybe<Scalars['String']>;
  stableSwap_lt?: InputMaybe<Scalars['String']>;
  stableSwap_gte?: InputMaybe<Scalars['String']>;
  stableSwap_lte?: InputMaybe<Scalars['String']>;
  stableSwap_in?: InputMaybe<Array<Scalars['String']>>;
  stableSwap_not_in?: InputMaybe<Array<Scalars['String']>>;
  stableSwap_contains?: InputMaybe<Scalars['String']>;
  stableSwap_contains_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_contains?: InputMaybe<Scalars['String']>;
  stableSwap_not_contains_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_starts_with?: InputMaybe<Scalars['String']>;
  stableSwap_starts_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_starts_with?: InputMaybe<Scalars['String']>;
  stableSwap_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_ends_with?: InputMaybe<Scalars['String']>;
  stableSwap_ends_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_ends_with?: InputMaybe<Scalars['String']>;
  stableSwap_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_?: InputMaybe<testoptimism_StableSwap_filter>;
  tokenAmounts?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmounts_not?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmounts_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmounts_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmounts_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmounts_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  fees?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_not?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  invariant?: InputMaybe<Scalars['BigInt']>;
  invariant_not?: InputMaybe<Scalars['BigInt']>;
  invariant_gt?: InputMaybe<Scalars['BigInt']>;
  invariant_lt?: InputMaybe<Scalars['BigInt']>;
  invariant_gte?: InputMaybe<Scalars['BigInt']>;
  invariant_lte?: InputMaybe<Scalars['BigInt']>;
  invariant_in?: InputMaybe<Array<Scalars['BigInt']>>;
  invariant_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lpTokenSupply?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_not?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_gt?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_lt?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_gte?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_lte?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lpTokenSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimism_StableSwapLiquidity_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimism_StableSwapLiquidity_filter>>>;
};

export type testoptimism_StableSwapLiquidity_orderBy =
  | 'id'
  | 'provider'
  | 'stableSwap'
  | 'stableSwap__id'
  | 'stableSwap__isActive'
  | 'stableSwap__key'
  | 'stableSwap__canonicalId'
  | 'stableSwap__domain'
  | 'stableSwap__swapPool'
  | 'stableSwap__lpToken'
  | 'stableSwap__initialA'
  | 'stableSwap__futureA'
  | 'stableSwap__initialATime'
  | 'stableSwap__futureATime'
  | 'stableSwap__swapFee'
  | 'stableSwap__adminFee'
  | 'tokenAmounts'
  | 'fees'
  | 'invariant'
  | 'lpTokenSupply';

export type testoptimism_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['testoptimism_Bytes']>;
  key_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  key_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  key_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  key_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  key_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  key_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['testoptimism_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  swapPool_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  swapPool_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  swapPool_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  swapPool_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  lpToken?: InputMaybe<Scalars['testoptimism_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['testoptimism_Bytes']>;
  lpToken_gt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  lpToken_lt?: InputMaybe<Scalars['testoptimism_Bytes']>;
  lpToken_gte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  lpToken_lte?: InputMaybe<Scalars['testoptimism_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['testoptimism_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['testoptimism_Bytes']>;
  initialA?: InputMaybe<Scalars['BigInt']>;
  initialA_not?: InputMaybe<Scalars['BigInt']>;
  initialA_gt?: InputMaybe<Scalars['BigInt']>;
  initialA_lt?: InputMaybe<Scalars['BigInt']>;
  initialA_gte?: InputMaybe<Scalars['BigInt']>;
  initialA_lte?: InputMaybe<Scalars['BigInt']>;
  initialA_in?: InputMaybe<Array<Scalars['BigInt']>>;
  initialA_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  futureA?: InputMaybe<Scalars['BigInt']>;
  futureA_not?: InputMaybe<Scalars['BigInt']>;
  futureA_gt?: InputMaybe<Scalars['BigInt']>;
  futureA_lt?: InputMaybe<Scalars['BigInt']>;
  futureA_gte?: InputMaybe<Scalars['BigInt']>;
  futureA_lte?: InputMaybe<Scalars['BigInt']>;
  futureA_in?: InputMaybe<Array<Scalars['BigInt']>>;
  futureA_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  initialATime?: InputMaybe<Scalars['BigInt']>;
  initialATime_not?: InputMaybe<Scalars['BigInt']>;
  initialATime_gt?: InputMaybe<Scalars['BigInt']>;
  initialATime_lt?: InputMaybe<Scalars['BigInt']>;
  initialATime_gte?: InputMaybe<Scalars['BigInt']>;
  initialATime_lte?: InputMaybe<Scalars['BigInt']>;
  initialATime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  initialATime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  futureATime?: InputMaybe<Scalars['BigInt']>;
  futureATime_not?: InputMaybe<Scalars['BigInt']>;
  futureATime_gt?: InputMaybe<Scalars['BigInt']>;
  futureATime_lt?: InputMaybe<Scalars['BigInt']>;
  futureATime_gte?: InputMaybe<Scalars['BigInt']>;
  futureATime_lte?: InputMaybe<Scalars['BigInt']>;
  futureATime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  futureATime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapFee?: InputMaybe<Scalars['BigInt']>;
  swapFee_not?: InputMaybe<Scalars['BigInt']>;
  swapFee_gt?: InputMaybe<Scalars['BigInt']>;
  swapFee_lt?: InputMaybe<Scalars['BigInt']>;
  swapFee_gte?: InputMaybe<Scalars['BigInt']>;
  swapFee_lte?: InputMaybe<Scalars['BigInt']>;
  swapFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adminFee?: InputMaybe<Scalars['BigInt']>;
  adminFee_not?: InputMaybe<Scalars['BigInt']>;
  adminFee_gt?: InputMaybe<Scalars['BigInt']>;
  adminFee_lt?: InputMaybe<Scalars['BigInt']>;
  adminFee_gte?: InputMaybe<Scalars['BigInt']>;
  adminFee_lte?: InputMaybe<Scalars['BigInt']>;
  adminFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adminFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pooledTokens?: InputMaybe<Array<Scalars['String']>>;
  pooledTokens_not?: InputMaybe<Array<Scalars['String']>>;
  pooledTokens_contains?: InputMaybe<Array<Scalars['String']>>;
  pooledTokens_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  pooledTokens_not_contains?: InputMaybe<Array<Scalars['String']>>;
  pooledTokens_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  pooledTokens_?: InputMaybe<testoptimism_PooledToken_filter>;
  tokenPrecisionMultipliers?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenPrecisionMultipliers_not?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenPrecisionMultipliers_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenPrecisionMultipliers_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenPrecisionMultipliers_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenPrecisionMultipliers_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  balances?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  adminFees?: InputMaybe<Array<Scalars['BigInt']>>;
  adminFees_not?: InputMaybe<Array<Scalars['BigInt']>>;
  adminFees_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  adminFees_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  adminFees_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  adminFees_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimism_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimism_StableSwap_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimism_StableSwap_filter>>>;
};

export type testoptimism_StableSwap_orderBy =
  | 'id'
  | 'isActive'
  | 'key'
  | 'canonicalId'
  | 'domain'
  | 'swapPool'
  | 'lpToken'
  | 'initialA'
  | 'futureA'
  | 'initialATime'
  | 'futureATime'
  | 'swapFee'
  | 'adminFee'
  | 'pooledTokens'
  | 'tokenPrecisionMultipliers'
  | 'balances'
  | 'adminFees';

export type Subscription = {
  testoptimism_asset?: Maybe<testoptimism_Asset>;
  testoptimism_assets: Array<testoptimism_Asset>;
  testoptimism_assetBalance?: Maybe<testoptimism_AssetBalance>;
  testoptimism_assetBalances: Array<testoptimism_AssetBalance>;
  testoptimism_router?: Maybe<testoptimism_Router>;
  testoptimism_routers: Array<testoptimism_Router>;
  testoptimism_setting?: Maybe<testoptimism_Setting>;
  testoptimism_settings: Array<testoptimism_Setting>;
  testoptimism_relayer?: Maybe<testoptimism_Relayer>;
  testoptimism_relayers: Array<testoptimism_Relayer>;
  testoptimism_sequencer?: Maybe<testoptimism_Sequencer>;
  testoptimism_sequencers: Array<testoptimism_Sequencer>;
  testoptimism_originTransfer?: Maybe<testoptimism_OriginTransfer>;
  testoptimism_originTransfers: Array<testoptimism_OriginTransfer>;
  testoptimism_destinationTransfer?: Maybe<testoptimism_DestinationTransfer>;
  testoptimism_destinationTransfers: Array<testoptimism_DestinationTransfer>;
  testoptimism_originMessage?: Maybe<testoptimism_OriginMessage>;
  testoptimism_originMessages: Array<testoptimism_OriginMessage>;
  testoptimism_destinationMessage?: Maybe<testoptimism_DestinationMessage>;
  testoptimism_destinationMessages: Array<testoptimism_DestinationMessage>;
  testoptimism_aggregateRoot?: Maybe<testoptimism_AggregateRoot>;
  testoptimism_aggregateRoots: Array<testoptimism_AggregateRoot>;
  testoptimism_connectorMeta?: Maybe<testoptimism_ConnectorMeta>;
  testoptimism_connectorMetas: Array<testoptimism_ConnectorMeta>;
  testoptimism_rootCount?: Maybe<testoptimism_RootCount>;
  testoptimism_rootCounts: Array<testoptimism_RootCount>;
  testoptimism_rootMessageSent?: Maybe<testoptimism_RootMessageSent>;
  testoptimism_rootMessageSents: Array<testoptimism_RootMessageSent>;
  testoptimism_stableSwap?: Maybe<testoptimism_StableSwap>;
  testoptimism_stableSwaps: Array<testoptimism_StableSwap>;
  testoptimism_pooledToken?: Maybe<testoptimism_PooledToken>;
  testoptimism_pooledTokens: Array<testoptimism_PooledToken>;
  testoptimism_stableSwapLiquidity?: Maybe<testoptimism_StableSwapLiquidity>;
  testoptimism_stableSwapLiquidities: Array<testoptimism_StableSwapLiquidity>;
  /** Access to subgraph metadata */
  testoptimism__meta?: Maybe<testoptimism__Meta_>;
};


export type Subscriptiontestoptimism_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_Asset_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_Asset_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_AssetBalance_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_Router_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_Router_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_Setting_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_Setting_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_Relayer_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_Relayer_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_Sequencer_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_Sequencer_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_OriginTransfer_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_DestinationTransfer_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_OriginMessage_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_DestinationMessage_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_AggregateRoot_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_ConnectorMeta_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_RootCount_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_RootCount_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_RootMessageSent_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_StableSwap_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_StableSwap_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_PooledToken_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_PooledToken_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_stableSwapLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism_stableSwapLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimism_StableSwapLiquidity_orderBy>;
  orderDirection?: InputMaybe<testoptimism_OrderDirection>;
  where?: InputMaybe<testoptimism_StableSwapLiquidity_filter>;
  block?: InputMaybe<testoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimism__metaArgs = {
  block?: InputMaybe<testoptimism_Block_height>;
};

export type testoptimism_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type testoptimism__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['testoptimism_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type testoptimism__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: testoptimism__Block_;
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
  testoptimism_asset: InContextSdkMethod<Query['testoptimism_asset'], Querytestoptimism_assetArgs, MeshContext>,
  /** null **/
  testoptimism_assets: InContextSdkMethod<Query['testoptimism_assets'], Querytestoptimism_assetsArgs, MeshContext>,
  /** null **/
  testoptimism_assetBalance: InContextSdkMethod<Query['testoptimism_assetBalance'], Querytestoptimism_assetBalanceArgs, MeshContext>,
  /** null **/
  testoptimism_assetBalances: InContextSdkMethod<Query['testoptimism_assetBalances'], Querytestoptimism_assetBalancesArgs, MeshContext>,
  /** null **/
  testoptimism_router: InContextSdkMethod<Query['testoptimism_router'], Querytestoptimism_routerArgs, MeshContext>,
  /** null **/
  testoptimism_routers: InContextSdkMethod<Query['testoptimism_routers'], Querytestoptimism_routersArgs, MeshContext>,
  /** null **/
  testoptimism_setting: InContextSdkMethod<Query['testoptimism_setting'], Querytestoptimism_settingArgs, MeshContext>,
  /** null **/
  testoptimism_settings: InContextSdkMethod<Query['testoptimism_settings'], Querytestoptimism_settingsArgs, MeshContext>,
  /** null **/
  testoptimism_relayer: InContextSdkMethod<Query['testoptimism_relayer'], Querytestoptimism_relayerArgs, MeshContext>,
  /** null **/
  testoptimism_relayers: InContextSdkMethod<Query['testoptimism_relayers'], Querytestoptimism_relayersArgs, MeshContext>,
  /** null **/
  testoptimism_sequencer: InContextSdkMethod<Query['testoptimism_sequencer'], Querytestoptimism_sequencerArgs, MeshContext>,
  /** null **/
  testoptimism_sequencers: InContextSdkMethod<Query['testoptimism_sequencers'], Querytestoptimism_sequencersArgs, MeshContext>,
  /** null **/
  testoptimism_originTransfer: InContextSdkMethod<Query['testoptimism_originTransfer'], Querytestoptimism_originTransferArgs, MeshContext>,
  /** null **/
  testoptimism_originTransfers: InContextSdkMethod<Query['testoptimism_originTransfers'], Querytestoptimism_originTransfersArgs, MeshContext>,
  /** null **/
  testoptimism_destinationTransfer: InContextSdkMethod<Query['testoptimism_destinationTransfer'], Querytestoptimism_destinationTransferArgs, MeshContext>,
  /** null **/
  testoptimism_destinationTransfers: InContextSdkMethod<Query['testoptimism_destinationTransfers'], Querytestoptimism_destinationTransfersArgs, MeshContext>,
  /** null **/
  testoptimism_originMessage: InContextSdkMethod<Query['testoptimism_originMessage'], Querytestoptimism_originMessageArgs, MeshContext>,
  /** null **/
  testoptimism_originMessages: InContextSdkMethod<Query['testoptimism_originMessages'], Querytestoptimism_originMessagesArgs, MeshContext>,
  /** null **/
  testoptimism_destinationMessage: InContextSdkMethod<Query['testoptimism_destinationMessage'], Querytestoptimism_destinationMessageArgs, MeshContext>,
  /** null **/
  testoptimism_destinationMessages: InContextSdkMethod<Query['testoptimism_destinationMessages'], Querytestoptimism_destinationMessagesArgs, MeshContext>,
  /** null **/
  testoptimism_aggregateRoot: InContextSdkMethod<Query['testoptimism_aggregateRoot'], Querytestoptimism_aggregateRootArgs, MeshContext>,
  /** null **/
  testoptimism_aggregateRoots: InContextSdkMethod<Query['testoptimism_aggregateRoots'], Querytestoptimism_aggregateRootsArgs, MeshContext>,
  /** null **/
  testoptimism_connectorMeta: InContextSdkMethod<Query['testoptimism_connectorMeta'], Querytestoptimism_connectorMetaArgs, MeshContext>,
  /** null **/
  testoptimism_connectorMetas: InContextSdkMethod<Query['testoptimism_connectorMetas'], Querytestoptimism_connectorMetasArgs, MeshContext>,
  /** null **/
  testoptimism_rootCount: InContextSdkMethod<Query['testoptimism_rootCount'], Querytestoptimism_rootCountArgs, MeshContext>,
  /** null **/
  testoptimism_rootCounts: InContextSdkMethod<Query['testoptimism_rootCounts'], Querytestoptimism_rootCountsArgs, MeshContext>,
  /** null **/
  testoptimism_rootMessageSent: InContextSdkMethod<Query['testoptimism_rootMessageSent'], Querytestoptimism_rootMessageSentArgs, MeshContext>,
  /** null **/
  testoptimism_rootMessageSents: InContextSdkMethod<Query['testoptimism_rootMessageSents'], Querytestoptimism_rootMessageSentsArgs, MeshContext>,
  /** null **/
  testoptimism_stableSwap: InContextSdkMethod<Query['testoptimism_stableSwap'], Querytestoptimism_stableSwapArgs, MeshContext>,
  /** null **/
  testoptimism_stableSwaps: InContextSdkMethod<Query['testoptimism_stableSwaps'], Querytestoptimism_stableSwapsArgs, MeshContext>,
  /** null **/
  testoptimism_pooledToken: InContextSdkMethod<Query['testoptimism_pooledToken'], Querytestoptimism_pooledTokenArgs, MeshContext>,
  /** null **/
  testoptimism_pooledTokens: InContextSdkMethod<Query['testoptimism_pooledTokens'], Querytestoptimism_pooledTokensArgs, MeshContext>,
  /** null **/
  testoptimism_stableSwapLiquidity: InContextSdkMethod<Query['testoptimism_stableSwapLiquidity'], Querytestoptimism_stableSwapLiquidityArgs, MeshContext>,
  /** null **/
  testoptimism_stableSwapLiquidities: InContextSdkMethod<Query['testoptimism_stableSwapLiquidities'], Querytestoptimism_stableSwapLiquiditiesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  testoptimism__meta: InContextSdkMethod<Query['testoptimism__meta'], Querytestoptimism__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  testoptimism_asset: InContextSdkMethod<Subscription['testoptimism_asset'], Subscriptiontestoptimism_assetArgs, MeshContext>,
  /** null **/
  testoptimism_assets: InContextSdkMethod<Subscription['testoptimism_assets'], Subscriptiontestoptimism_assetsArgs, MeshContext>,
  /** null **/
  testoptimism_assetBalance: InContextSdkMethod<Subscription['testoptimism_assetBalance'], Subscriptiontestoptimism_assetBalanceArgs, MeshContext>,
  /** null **/
  testoptimism_assetBalances: InContextSdkMethod<Subscription['testoptimism_assetBalances'], Subscriptiontestoptimism_assetBalancesArgs, MeshContext>,
  /** null **/
  testoptimism_router: InContextSdkMethod<Subscription['testoptimism_router'], Subscriptiontestoptimism_routerArgs, MeshContext>,
  /** null **/
  testoptimism_routers: InContextSdkMethod<Subscription['testoptimism_routers'], Subscriptiontestoptimism_routersArgs, MeshContext>,
  /** null **/
  testoptimism_setting: InContextSdkMethod<Subscription['testoptimism_setting'], Subscriptiontestoptimism_settingArgs, MeshContext>,
  /** null **/
  testoptimism_settings: InContextSdkMethod<Subscription['testoptimism_settings'], Subscriptiontestoptimism_settingsArgs, MeshContext>,
  /** null **/
  testoptimism_relayer: InContextSdkMethod<Subscription['testoptimism_relayer'], Subscriptiontestoptimism_relayerArgs, MeshContext>,
  /** null **/
  testoptimism_relayers: InContextSdkMethod<Subscription['testoptimism_relayers'], Subscriptiontestoptimism_relayersArgs, MeshContext>,
  /** null **/
  testoptimism_sequencer: InContextSdkMethod<Subscription['testoptimism_sequencer'], Subscriptiontestoptimism_sequencerArgs, MeshContext>,
  /** null **/
  testoptimism_sequencers: InContextSdkMethod<Subscription['testoptimism_sequencers'], Subscriptiontestoptimism_sequencersArgs, MeshContext>,
  /** null **/
  testoptimism_originTransfer: InContextSdkMethod<Subscription['testoptimism_originTransfer'], Subscriptiontestoptimism_originTransferArgs, MeshContext>,
  /** null **/
  testoptimism_originTransfers: InContextSdkMethod<Subscription['testoptimism_originTransfers'], Subscriptiontestoptimism_originTransfersArgs, MeshContext>,
  /** null **/
  testoptimism_destinationTransfer: InContextSdkMethod<Subscription['testoptimism_destinationTransfer'], Subscriptiontestoptimism_destinationTransferArgs, MeshContext>,
  /** null **/
  testoptimism_destinationTransfers: InContextSdkMethod<Subscription['testoptimism_destinationTransfers'], Subscriptiontestoptimism_destinationTransfersArgs, MeshContext>,
  /** null **/
  testoptimism_originMessage: InContextSdkMethod<Subscription['testoptimism_originMessage'], Subscriptiontestoptimism_originMessageArgs, MeshContext>,
  /** null **/
  testoptimism_originMessages: InContextSdkMethod<Subscription['testoptimism_originMessages'], Subscriptiontestoptimism_originMessagesArgs, MeshContext>,
  /** null **/
  testoptimism_destinationMessage: InContextSdkMethod<Subscription['testoptimism_destinationMessage'], Subscriptiontestoptimism_destinationMessageArgs, MeshContext>,
  /** null **/
  testoptimism_destinationMessages: InContextSdkMethod<Subscription['testoptimism_destinationMessages'], Subscriptiontestoptimism_destinationMessagesArgs, MeshContext>,
  /** null **/
  testoptimism_aggregateRoot: InContextSdkMethod<Subscription['testoptimism_aggregateRoot'], Subscriptiontestoptimism_aggregateRootArgs, MeshContext>,
  /** null **/
  testoptimism_aggregateRoots: InContextSdkMethod<Subscription['testoptimism_aggregateRoots'], Subscriptiontestoptimism_aggregateRootsArgs, MeshContext>,
  /** null **/
  testoptimism_connectorMeta: InContextSdkMethod<Subscription['testoptimism_connectorMeta'], Subscriptiontestoptimism_connectorMetaArgs, MeshContext>,
  /** null **/
  testoptimism_connectorMetas: InContextSdkMethod<Subscription['testoptimism_connectorMetas'], Subscriptiontestoptimism_connectorMetasArgs, MeshContext>,
  /** null **/
  testoptimism_rootCount: InContextSdkMethod<Subscription['testoptimism_rootCount'], Subscriptiontestoptimism_rootCountArgs, MeshContext>,
  /** null **/
  testoptimism_rootCounts: InContextSdkMethod<Subscription['testoptimism_rootCounts'], Subscriptiontestoptimism_rootCountsArgs, MeshContext>,
  /** null **/
  testoptimism_rootMessageSent: InContextSdkMethod<Subscription['testoptimism_rootMessageSent'], Subscriptiontestoptimism_rootMessageSentArgs, MeshContext>,
  /** null **/
  testoptimism_rootMessageSents: InContextSdkMethod<Subscription['testoptimism_rootMessageSents'], Subscriptiontestoptimism_rootMessageSentsArgs, MeshContext>,
  /** null **/
  testoptimism_stableSwap: InContextSdkMethod<Subscription['testoptimism_stableSwap'], Subscriptiontestoptimism_stableSwapArgs, MeshContext>,
  /** null **/
  testoptimism_stableSwaps: InContextSdkMethod<Subscription['testoptimism_stableSwaps'], Subscriptiontestoptimism_stableSwapsArgs, MeshContext>,
  /** null **/
  testoptimism_pooledToken: InContextSdkMethod<Subscription['testoptimism_pooledToken'], Subscriptiontestoptimism_pooledTokenArgs, MeshContext>,
  /** null **/
  testoptimism_pooledTokens: InContextSdkMethod<Subscription['testoptimism_pooledTokens'], Subscriptiontestoptimism_pooledTokensArgs, MeshContext>,
  /** null **/
  testoptimism_stableSwapLiquidity: InContextSdkMethod<Subscription['testoptimism_stableSwapLiquidity'], Subscriptiontestoptimism_stableSwapLiquidityArgs, MeshContext>,
  /** null **/
  testoptimism_stableSwapLiquidities: InContextSdkMethod<Subscription['testoptimism_stableSwapLiquidities'], Subscriptiontestoptimism_stableSwapLiquiditiesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  testoptimism__meta: InContextSdkMethod<Subscription['testoptimism__meta'], Subscriptiontestoptimism__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Test_Optimism"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
