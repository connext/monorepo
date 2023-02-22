// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextTestMainnetTypes {
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
  testmainnet_BigDecimal: any;
  BigInt: any;
  testmainnet_Bytes: any;
};

export type testmainnet_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['testmainnet_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type testmainnet_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['testmainnet_Bytes']>;
  root_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmainnet_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmainnet_AggregateRoot_filter>>>;
};

export type testmainnet_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type testmainnet_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['testmainnet_Bytes']>;
  canonicalId?: Maybe<Scalars['testmainnet_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['testmainnet_Bytes']>;
  localAsset?: Maybe<Scalars['testmainnet_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type testmainnet_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: testmainnet_Router;
  asset: testmainnet_Asset;
  feesEarned: Scalars['BigInt'];
};

export type testmainnet_AssetBalance_filter = {
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
  router_?: InputMaybe<testmainnet_Router_filter>;
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
  asset_?: InputMaybe<testmainnet_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmainnet_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmainnet_AssetBalance_filter>>>;
};

export type testmainnet_AssetBalance_orderBy =
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

export type testmainnet_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['testmainnet_Bytes']>;
  key_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  key_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  key_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  key_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  key_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  key_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['testmainnet_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  localAsset?: InputMaybe<Scalars['testmainnet_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmainnet_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmainnet_Asset_filter>>>;
};

export type testmainnet_Asset_orderBy =
  | 'id'
  | 'key'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber';

export type testmainnet_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type testmainnet_Block_height = {
  hash?: InputMaybe<Scalars['testmainnet_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type testmainnet_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['testmainnet_Bytes']>;
  rootManager?: Maybe<Scalars['testmainnet_Bytes']>;
  mirrorConnector?: Maybe<Scalars['testmainnet_Bytes']>;
};

export type testmainnet_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['testmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['testmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['testmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmainnet_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmainnet_ConnectorMeta_filter>>>;
};

export type testmainnet_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type testmainnet_DestinationMessage = {
  id: Scalars['ID'];
  leaf?: Maybe<Scalars['testmainnet_Bytes']>;
  processed?: Maybe<Scalars['Boolean']>;
  returnData?: Maybe<Scalars['testmainnet_Bytes']>;
  success?: Maybe<Scalars['Boolean']>;
  transactionHash?: Maybe<Scalars['testmainnet_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type testmainnet_DestinationMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  leaf?: InputMaybe<Scalars['testmainnet_Bytes']>;
  leaf_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  processed?: InputMaybe<Scalars['Boolean']>;
  processed_not?: InputMaybe<Scalars['Boolean']>;
  processed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  processed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  returnData?: InputMaybe<Scalars['testmainnet_Bytes']>;
  returnData_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  returnData_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  returnData_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  returnData_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  returnData_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  returnData_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  returnData_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  returnData_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  returnData_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  success?: InputMaybe<Scalars['Boolean']>;
  success_not?: InputMaybe<Scalars['Boolean']>;
  success_in?: InputMaybe<Array<Scalars['Boolean']>>;
  success_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  transactionHash?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmainnet_DestinationMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmainnet_DestinationMessage_filter>>>;
};

export type testmainnet_DestinationMessage_orderBy =
  | 'id'
  | 'leaf'
  | 'processed'
  | 'returnData'
  | 'success'
  | 'transactionHash'
  | 'blockNumber';

export type testmainnet_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['testmainnet_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<testmainnet_TransferStatus>;
  routers?: Maybe<Array<testmainnet_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['testmainnet_Bytes']>;
  delegate?: Maybe<Scalars['testmainnet_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['testmainnet_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['testmainnet_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['testmainnet_Bytes']>;
  asset?: Maybe<testmainnet_Asset>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['testmainnet_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['testmainnet_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['testmainnet_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['testmainnet_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type testmainnet_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_Router_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_Router_filter>;
};

export type testmainnet_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transferId_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<testmainnet_TransferStatus>;
  status_not?: InputMaybe<testmainnet_TransferStatus>;
  status_in?: InputMaybe<Array<testmainnet_TransferStatus>>;
  status_not_in?: InputMaybe<Array<testmainnet_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<testmainnet_Router_filter>;
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
  to?: InputMaybe<Scalars['testmainnet_Bytes']>;
  to_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  to_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  to_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  to_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  to_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  to_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  delegate?: InputMaybe<Scalars['testmainnet_Bytes']>;
  delegate_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['testmainnet_Bytes']>;
  callData_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  callData_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  callData_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  callData_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  callData_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['testmainnet_Bytes']>;
  originSender_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
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
  asset_?: InputMaybe<testmainnet_Asset_filter>;
  routersFee?: InputMaybe<Scalars['BigInt']>;
  routersFee_not?: InputMaybe<Scalars['BigInt']>;
  routersFee_gt?: InputMaybe<Scalars['BigInt']>;
  routersFee_lt?: InputMaybe<Scalars['BigInt']>;
  routersFee_gte?: InputMaybe<Scalars['BigInt']>;
  routersFee_lte?: InputMaybe<Scalars['BigInt']>;
  routersFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  routersFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['testmainnet_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['testmainnet_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
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
  reconciledCaller?: InputMaybe<Scalars['testmainnet_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['testmainnet_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
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
  _change_block?: InputMaybe<testmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmainnet_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmainnet_DestinationTransfer_filter>>>;
};

export type testmainnet_DestinationTransfer_orderBy =
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
export type testmainnet_OrderDirection =
  | 'asc'
  | 'desc';

export type testmainnet_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['testmainnet_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['testmainnet_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['testmainnet_Bytes']>;
  message?: Maybe<Scalars['testmainnet_Bytes']>;
  transactionHash?: Maybe<Scalars['testmainnet_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<testmainnet_RootCount>;
};

export type testmainnet_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transferId_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['testmainnet_Bytes']>;
  leaf_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  root?: InputMaybe<Scalars['testmainnet_Bytes']>;
  root_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  message?: InputMaybe<Scalars['testmainnet_Bytes']>;
  message_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  message_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  message_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  message_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  message_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  message_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
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
  rootCount_?: InputMaybe<testmainnet_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmainnet_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmainnet_OriginMessage_filter>>>;
};

export type testmainnet_OriginMessage_orderBy =
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

export type testmainnet_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['testmainnet_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<testmainnet_TransferStatus>;
  messageHash?: Maybe<Scalars['testmainnet_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['testmainnet_Bytes']>;
  delegate?: Maybe<Scalars['testmainnet_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['testmainnet_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['testmainnet_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['testmainnet_Bytes']>;
  asset?: Maybe<testmainnet_Asset>;
  message?: Maybe<testmainnet_OriginMessage>;
  caller?: Maybe<Scalars['testmainnet_Bytes']>;
  transactionHash?: Maybe<Scalars['testmainnet_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type testmainnet_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transferId_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<testmainnet_TransferStatus>;
  status_not?: InputMaybe<testmainnet_TransferStatus>;
  status_in?: InputMaybe<Array<testmainnet_TransferStatus>>;
  status_not_in?: InputMaybe<Array<testmainnet_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['testmainnet_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
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
  to?: InputMaybe<Scalars['testmainnet_Bytes']>;
  to_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  to_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  to_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  to_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  to_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  to_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  delegate?: InputMaybe<Scalars['testmainnet_Bytes']>;
  delegate_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['testmainnet_Bytes']>;
  callData_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  callData_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  callData_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  callData_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  callData_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['testmainnet_Bytes']>;
  originSender_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
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
  asset_?: InputMaybe<testmainnet_Asset_filter>;
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
  message_?: InputMaybe<testmainnet_OriginMessage_filter>;
  caller?: InputMaybe<Scalars['testmainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
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
  _change_block?: InputMaybe<testmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmainnet_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmainnet_OriginTransfer_filter>>>;
};

export type testmainnet_OriginTransfer_orderBy =
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

export type testmainnet_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['testmainnet_Bytes'];
};

export type testmainnet_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['testmainnet_Bytes']>;
  asset_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  asset_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  asset_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  asset_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  asset_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmainnet_PooledToken_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmainnet_PooledToken_filter>>>;
};

export type testmainnet_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  testmainnet_asset?: Maybe<testmainnet_Asset>;
  testmainnet_assets: Array<testmainnet_Asset>;
  testmainnet_assetBalance?: Maybe<testmainnet_AssetBalance>;
  testmainnet_assetBalances: Array<testmainnet_AssetBalance>;
  testmainnet_router?: Maybe<testmainnet_Router>;
  testmainnet_routers: Array<testmainnet_Router>;
  testmainnet_setting?: Maybe<testmainnet_Setting>;
  testmainnet_settings: Array<testmainnet_Setting>;
  testmainnet_relayer?: Maybe<testmainnet_Relayer>;
  testmainnet_relayers: Array<testmainnet_Relayer>;
  testmainnet_sequencer?: Maybe<testmainnet_Sequencer>;
  testmainnet_sequencers: Array<testmainnet_Sequencer>;
  testmainnet_originTransfer?: Maybe<testmainnet_OriginTransfer>;
  testmainnet_originTransfers: Array<testmainnet_OriginTransfer>;
  testmainnet_destinationTransfer?: Maybe<testmainnet_DestinationTransfer>;
  testmainnet_destinationTransfers: Array<testmainnet_DestinationTransfer>;
  testmainnet_originMessage?: Maybe<testmainnet_OriginMessage>;
  testmainnet_originMessages: Array<testmainnet_OriginMessage>;
  testmainnet_destinationMessage?: Maybe<testmainnet_DestinationMessage>;
  testmainnet_destinationMessages: Array<testmainnet_DestinationMessage>;
  testmainnet_aggregateRoot?: Maybe<testmainnet_AggregateRoot>;
  testmainnet_aggregateRoots: Array<testmainnet_AggregateRoot>;
  testmainnet_connectorMeta?: Maybe<testmainnet_ConnectorMeta>;
  testmainnet_connectorMetas: Array<testmainnet_ConnectorMeta>;
  testmainnet_rootCount?: Maybe<testmainnet_RootCount>;
  testmainnet_rootCounts: Array<testmainnet_RootCount>;
  testmainnet_rootMessageSent?: Maybe<testmainnet_RootMessageSent>;
  testmainnet_rootMessageSents: Array<testmainnet_RootMessageSent>;
  testmainnet_stableSwap?: Maybe<testmainnet_StableSwap>;
  testmainnet_stableSwaps: Array<testmainnet_StableSwap>;
  testmainnet_pooledToken?: Maybe<testmainnet_PooledToken>;
  testmainnet_pooledTokens: Array<testmainnet_PooledToken>;
  testmainnet_stableSwapLiquidity?: Maybe<testmainnet_StableSwapLiquidity>;
  testmainnet_stableSwapLiquidities: Array<testmainnet_StableSwapLiquidity>;
  /** Access to subgraph metadata */
  testmainnet__meta?: Maybe<testmainnet__Meta_>;
};


export type Querytestmainnet_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_Asset_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_Asset_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_AssetBalance_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_Router_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_Router_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_Setting_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_Setting_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_Relayer_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_Relayer_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_Sequencer_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_Sequencer_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_OriginTransfer_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_DestinationTransfer_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_OriginMessage_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_DestinationMessage_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_AggregateRoot_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_ConnectorMeta_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_RootCount_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_RootCount_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_RootMessageSent_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_StableSwap_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_StableSwap_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_PooledToken_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_PooledToken_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_stableSwapLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet_stableSwapLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_StableSwapLiquidity_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_StableSwapLiquidity_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestmainnet__metaArgs = {
  block?: InputMaybe<testmainnet_Block_height>;
};

export type testmainnet_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['testmainnet_Bytes']>;
};

export type testmainnet_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['testmainnet_Bytes']>;
  relayer_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmainnet_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmainnet_Relayer_filter>>>;
};

export type testmainnet_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type testmainnet_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type testmainnet_RootCount_filter = {
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
  _change_block?: InputMaybe<testmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmainnet_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmainnet_RootCount_filter>>>;
};

export type testmainnet_RootCount_orderBy =
  | 'id'
  | 'count';

export type testmainnet_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['testmainnet_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['testmainnet_Bytes']>;
  transactionHash?: Maybe<Scalars['testmainnet_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type testmainnet_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['testmainnet_Bytes']>;
  root_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['testmainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
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
  _change_block?: InputMaybe<testmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmainnet_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmainnet_RootMessageSent_filter>>>;
};

export type testmainnet_RootMessageSent_orderBy =
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

export type testmainnet_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['testmainnet_Bytes']>;
  recipient?: Maybe<Scalars['testmainnet_Bytes']>;
  proposedOwner?: Maybe<Scalars['testmainnet_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<testmainnet_AssetBalance>;
};


export type testmainnet_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_AssetBalance_filter>;
};

export type testmainnet_Router_filter = {
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
  owner?: InputMaybe<Scalars['testmainnet_Bytes']>;
  owner_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  owner_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  owner_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  owner_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  owner_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  recipient?: InputMaybe<Scalars['testmainnet_Bytes']>;
  recipient_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['testmainnet_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<testmainnet_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmainnet_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmainnet_Router_filter>>>;
};

export type testmainnet_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type testmainnet_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['testmainnet_Bytes']>;
};

export type testmainnet_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['testmainnet_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmainnet_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmainnet_Sequencer_filter>>>;
};

export type testmainnet_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type testmainnet_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['testmainnet_Bytes'];
};

export type testmainnet_Setting_filter = {
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
  caller?: InputMaybe<Scalars['testmainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmainnet_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmainnet_Setting_filter>>>;
};

export type testmainnet_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type testmainnet_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['testmainnet_Bytes']>;
  canonicalId?: Maybe<Scalars['testmainnet_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['testmainnet_Bytes']>;
  lpToken?: Maybe<Scalars['testmainnet_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<testmainnet_PooledToken>;
  tokenPrecisionMultipliers?: Maybe<Array<Scalars['BigInt']>>;
  balances: Array<Scalars['BigInt']>;
  adminFees?: Maybe<Array<Scalars['BigInt']>>;
};


export type testmainnet_StableSwappooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_PooledToken_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_PooledToken_filter>;
};

export type testmainnet_StableSwapLiquidity = {
  id: Scalars['ID'];
  provider: Scalars['testmainnet_Bytes'];
  stableSwap: testmainnet_StableSwap;
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply?: Maybe<Scalars['BigInt']>;
};

export type testmainnet_StableSwapLiquidity_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  provider?: InputMaybe<Scalars['testmainnet_Bytes']>;
  provider_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  provider_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  provider_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  provider_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  provider_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
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
  stableSwap_?: InputMaybe<testmainnet_StableSwap_filter>;
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
  _change_block?: InputMaybe<testmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmainnet_StableSwapLiquidity_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmainnet_StableSwapLiquidity_filter>>>;
};

export type testmainnet_StableSwapLiquidity_orderBy =
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

export type testmainnet_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['testmainnet_Bytes']>;
  key_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  key_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  key_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  key_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  key_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  key_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['testmainnet_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  swapPool_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  swapPool_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  swapPool_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  swapPool_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  lpToken?: InputMaybe<Scalars['testmainnet_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['testmainnet_Bytes']>;
  lpToken_gt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  lpToken_lt?: InputMaybe<Scalars['testmainnet_Bytes']>;
  lpToken_gte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  lpToken_lte?: InputMaybe<Scalars['testmainnet_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['testmainnet_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['testmainnet_Bytes']>;
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
  pooledTokens_?: InputMaybe<testmainnet_PooledToken_filter>;
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
  _change_block?: InputMaybe<testmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testmainnet_StableSwap_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testmainnet_StableSwap_filter>>>;
};

export type testmainnet_StableSwap_orderBy =
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
  testmainnet_asset?: Maybe<testmainnet_Asset>;
  testmainnet_assets: Array<testmainnet_Asset>;
  testmainnet_assetBalance?: Maybe<testmainnet_AssetBalance>;
  testmainnet_assetBalances: Array<testmainnet_AssetBalance>;
  testmainnet_router?: Maybe<testmainnet_Router>;
  testmainnet_routers: Array<testmainnet_Router>;
  testmainnet_setting?: Maybe<testmainnet_Setting>;
  testmainnet_settings: Array<testmainnet_Setting>;
  testmainnet_relayer?: Maybe<testmainnet_Relayer>;
  testmainnet_relayers: Array<testmainnet_Relayer>;
  testmainnet_sequencer?: Maybe<testmainnet_Sequencer>;
  testmainnet_sequencers: Array<testmainnet_Sequencer>;
  testmainnet_originTransfer?: Maybe<testmainnet_OriginTransfer>;
  testmainnet_originTransfers: Array<testmainnet_OriginTransfer>;
  testmainnet_destinationTransfer?: Maybe<testmainnet_DestinationTransfer>;
  testmainnet_destinationTransfers: Array<testmainnet_DestinationTransfer>;
  testmainnet_originMessage?: Maybe<testmainnet_OriginMessage>;
  testmainnet_originMessages: Array<testmainnet_OriginMessage>;
  testmainnet_destinationMessage?: Maybe<testmainnet_DestinationMessage>;
  testmainnet_destinationMessages: Array<testmainnet_DestinationMessage>;
  testmainnet_aggregateRoot?: Maybe<testmainnet_AggregateRoot>;
  testmainnet_aggregateRoots: Array<testmainnet_AggregateRoot>;
  testmainnet_connectorMeta?: Maybe<testmainnet_ConnectorMeta>;
  testmainnet_connectorMetas: Array<testmainnet_ConnectorMeta>;
  testmainnet_rootCount?: Maybe<testmainnet_RootCount>;
  testmainnet_rootCounts: Array<testmainnet_RootCount>;
  testmainnet_rootMessageSent?: Maybe<testmainnet_RootMessageSent>;
  testmainnet_rootMessageSents: Array<testmainnet_RootMessageSent>;
  testmainnet_stableSwap?: Maybe<testmainnet_StableSwap>;
  testmainnet_stableSwaps: Array<testmainnet_StableSwap>;
  testmainnet_pooledToken?: Maybe<testmainnet_PooledToken>;
  testmainnet_pooledTokens: Array<testmainnet_PooledToken>;
  testmainnet_stableSwapLiquidity?: Maybe<testmainnet_StableSwapLiquidity>;
  testmainnet_stableSwapLiquidities: Array<testmainnet_StableSwapLiquidity>;
  /** Access to subgraph metadata */
  testmainnet__meta?: Maybe<testmainnet__Meta_>;
};


export type Subscriptiontestmainnet_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_Asset_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_Asset_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_AssetBalance_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_Router_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_Router_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_Setting_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_Setting_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_Relayer_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_Relayer_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_Sequencer_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_Sequencer_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_OriginTransfer_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_DestinationTransfer_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_OriginMessage_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_DestinationMessage_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_AggregateRoot_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_ConnectorMeta_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_RootCount_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_RootCount_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_RootMessageSent_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_StableSwap_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_StableSwap_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_PooledToken_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_PooledToken_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_stableSwapLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet_stableSwapLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testmainnet_StableSwapLiquidity_orderBy>;
  orderDirection?: InputMaybe<testmainnet_OrderDirection>;
  where?: InputMaybe<testmainnet_StableSwapLiquidity_filter>;
  block?: InputMaybe<testmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestmainnet__metaArgs = {
  block?: InputMaybe<testmainnet_Block_height>;
};

export type testmainnet_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type testmainnet__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['testmainnet_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type testmainnet__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: testmainnet__Block_;
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
  testmainnet_asset: InContextSdkMethod<Query['testmainnet_asset'], Querytestmainnet_assetArgs, MeshContext>,
  /** null **/
  testmainnet_assets: InContextSdkMethod<Query['testmainnet_assets'], Querytestmainnet_assetsArgs, MeshContext>,
  /** null **/
  testmainnet_assetBalance: InContextSdkMethod<Query['testmainnet_assetBalance'], Querytestmainnet_assetBalanceArgs, MeshContext>,
  /** null **/
  testmainnet_assetBalances: InContextSdkMethod<Query['testmainnet_assetBalances'], Querytestmainnet_assetBalancesArgs, MeshContext>,
  /** null **/
  testmainnet_router: InContextSdkMethod<Query['testmainnet_router'], Querytestmainnet_routerArgs, MeshContext>,
  /** null **/
  testmainnet_routers: InContextSdkMethod<Query['testmainnet_routers'], Querytestmainnet_routersArgs, MeshContext>,
  /** null **/
  testmainnet_setting: InContextSdkMethod<Query['testmainnet_setting'], Querytestmainnet_settingArgs, MeshContext>,
  /** null **/
  testmainnet_settings: InContextSdkMethod<Query['testmainnet_settings'], Querytestmainnet_settingsArgs, MeshContext>,
  /** null **/
  testmainnet_relayer: InContextSdkMethod<Query['testmainnet_relayer'], Querytestmainnet_relayerArgs, MeshContext>,
  /** null **/
  testmainnet_relayers: InContextSdkMethod<Query['testmainnet_relayers'], Querytestmainnet_relayersArgs, MeshContext>,
  /** null **/
  testmainnet_sequencer: InContextSdkMethod<Query['testmainnet_sequencer'], Querytestmainnet_sequencerArgs, MeshContext>,
  /** null **/
  testmainnet_sequencers: InContextSdkMethod<Query['testmainnet_sequencers'], Querytestmainnet_sequencersArgs, MeshContext>,
  /** null **/
  testmainnet_originTransfer: InContextSdkMethod<Query['testmainnet_originTransfer'], Querytestmainnet_originTransferArgs, MeshContext>,
  /** null **/
  testmainnet_originTransfers: InContextSdkMethod<Query['testmainnet_originTransfers'], Querytestmainnet_originTransfersArgs, MeshContext>,
  /** null **/
  testmainnet_destinationTransfer: InContextSdkMethod<Query['testmainnet_destinationTransfer'], Querytestmainnet_destinationTransferArgs, MeshContext>,
  /** null **/
  testmainnet_destinationTransfers: InContextSdkMethod<Query['testmainnet_destinationTransfers'], Querytestmainnet_destinationTransfersArgs, MeshContext>,
  /** null **/
  testmainnet_originMessage: InContextSdkMethod<Query['testmainnet_originMessage'], Querytestmainnet_originMessageArgs, MeshContext>,
  /** null **/
  testmainnet_originMessages: InContextSdkMethod<Query['testmainnet_originMessages'], Querytestmainnet_originMessagesArgs, MeshContext>,
  /** null **/
  testmainnet_destinationMessage: InContextSdkMethod<Query['testmainnet_destinationMessage'], Querytestmainnet_destinationMessageArgs, MeshContext>,
  /** null **/
  testmainnet_destinationMessages: InContextSdkMethod<Query['testmainnet_destinationMessages'], Querytestmainnet_destinationMessagesArgs, MeshContext>,
  /** null **/
  testmainnet_aggregateRoot: InContextSdkMethod<Query['testmainnet_aggregateRoot'], Querytestmainnet_aggregateRootArgs, MeshContext>,
  /** null **/
  testmainnet_aggregateRoots: InContextSdkMethod<Query['testmainnet_aggregateRoots'], Querytestmainnet_aggregateRootsArgs, MeshContext>,
  /** null **/
  testmainnet_connectorMeta: InContextSdkMethod<Query['testmainnet_connectorMeta'], Querytestmainnet_connectorMetaArgs, MeshContext>,
  /** null **/
  testmainnet_connectorMetas: InContextSdkMethod<Query['testmainnet_connectorMetas'], Querytestmainnet_connectorMetasArgs, MeshContext>,
  /** null **/
  testmainnet_rootCount: InContextSdkMethod<Query['testmainnet_rootCount'], Querytestmainnet_rootCountArgs, MeshContext>,
  /** null **/
  testmainnet_rootCounts: InContextSdkMethod<Query['testmainnet_rootCounts'], Querytestmainnet_rootCountsArgs, MeshContext>,
  /** null **/
  testmainnet_rootMessageSent: InContextSdkMethod<Query['testmainnet_rootMessageSent'], Querytestmainnet_rootMessageSentArgs, MeshContext>,
  /** null **/
  testmainnet_rootMessageSents: InContextSdkMethod<Query['testmainnet_rootMessageSents'], Querytestmainnet_rootMessageSentsArgs, MeshContext>,
  /** null **/
  testmainnet_stableSwap: InContextSdkMethod<Query['testmainnet_stableSwap'], Querytestmainnet_stableSwapArgs, MeshContext>,
  /** null **/
  testmainnet_stableSwaps: InContextSdkMethod<Query['testmainnet_stableSwaps'], Querytestmainnet_stableSwapsArgs, MeshContext>,
  /** null **/
  testmainnet_pooledToken: InContextSdkMethod<Query['testmainnet_pooledToken'], Querytestmainnet_pooledTokenArgs, MeshContext>,
  /** null **/
  testmainnet_pooledTokens: InContextSdkMethod<Query['testmainnet_pooledTokens'], Querytestmainnet_pooledTokensArgs, MeshContext>,
  /** null **/
  testmainnet_stableSwapLiquidity: InContextSdkMethod<Query['testmainnet_stableSwapLiquidity'], Querytestmainnet_stableSwapLiquidityArgs, MeshContext>,
  /** null **/
  testmainnet_stableSwapLiquidities: InContextSdkMethod<Query['testmainnet_stableSwapLiquidities'], Querytestmainnet_stableSwapLiquiditiesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  testmainnet__meta: InContextSdkMethod<Query['testmainnet__meta'], Querytestmainnet__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  testmainnet_asset: InContextSdkMethod<Subscription['testmainnet_asset'], Subscriptiontestmainnet_assetArgs, MeshContext>,
  /** null **/
  testmainnet_assets: InContextSdkMethod<Subscription['testmainnet_assets'], Subscriptiontestmainnet_assetsArgs, MeshContext>,
  /** null **/
  testmainnet_assetBalance: InContextSdkMethod<Subscription['testmainnet_assetBalance'], Subscriptiontestmainnet_assetBalanceArgs, MeshContext>,
  /** null **/
  testmainnet_assetBalances: InContextSdkMethod<Subscription['testmainnet_assetBalances'], Subscriptiontestmainnet_assetBalancesArgs, MeshContext>,
  /** null **/
  testmainnet_router: InContextSdkMethod<Subscription['testmainnet_router'], Subscriptiontestmainnet_routerArgs, MeshContext>,
  /** null **/
  testmainnet_routers: InContextSdkMethod<Subscription['testmainnet_routers'], Subscriptiontestmainnet_routersArgs, MeshContext>,
  /** null **/
  testmainnet_setting: InContextSdkMethod<Subscription['testmainnet_setting'], Subscriptiontestmainnet_settingArgs, MeshContext>,
  /** null **/
  testmainnet_settings: InContextSdkMethod<Subscription['testmainnet_settings'], Subscriptiontestmainnet_settingsArgs, MeshContext>,
  /** null **/
  testmainnet_relayer: InContextSdkMethod<Subscription['testmainnet_relayer'], Subscriptiontestmainnet_relayerArgs, MeshContext>,
  /** null **/
  testmainnet_relayers: InContextSdkMethod<Subscription['testmainnet_relayers'], Subscriptiontestmainnet_relayersArgs, MeshContext>,
  /** null **/
  testmainnet_sequencer: InContextSdkMethod<Subscription['testmainnet_sequencer'], Subscriptiontestmainnet_sequencerArgs, MeshContext>,
  /** null **/
  testmainnet_sequencers: InContextSdkMethod<Subscription['testmainnet_sequencers'], Subscriptiontestmainnet_sequencersArgs, MeshContext>,
  /** null **/
  testmainnet_originTransfer: InContextSdkMethod<Subscription['testmainnet_originTransfer'], Subscriptiontestmainnet_originTransferArgs, MeshContext>,
  /** null **/
  testmainnet_originTransfers: InContextSdkMethod<Subscription['testmainnet_originTransfers'], Subscriptiontestmainnet_originTransfersArgs, MeshContext>,
  /** null **/
  testmainnet_destinationTransfer: InContextSdkMethod<Subscription['testmainnet_destinationTransfer'], Subscriptiontestmainnet_destinationTransferArgs, MeshContext>,
  /** null **/
  testmainnet_destinationTransfers: InContextSdkMethod<Subscription['testmainnet_destinationTransfers'], Subscriptiontestmainnet_destinationTransfersArgs, MeshContext>,
  /** null **/
  testmainnet_originMessage: InContextSdkMethod<Subscription['testmainnet_originMessage'], Subscriptiontestmainnet_originMessageArgs, MeshContext>,
  /** null **/
  testmainnet_originMessages: InContextSdkMethod<Subscription['testmainnet_originMessages'], Subscriptiontestmainnet_originMessagesArgs, MeshContext>,
  /** null **/
  testmainnet_destinationMessage: InContextSdkMethod<Subscription['testmainnet_destinationMessage'], Subscriptiontestmainnet_destinationMessageArgs, MeshContext>,
  /** null **/
  testmainnet_destinationMessages: InContextSdkMethod<Subscription['testmainnet_destinationMessages'], Subscriptiontestmainnet_destinationMessagesArgs, MeshContext>,
  /** null **/
  testmainnet_aggregateRoot: InContextSdkMethod<Subscription['testmainnet_aggregateRoot'], Subscriptiontestmainnet_aggregateRootArgs, MeshContext>,
  /** null **/
  testmainnet_aggregateRoots: InContextSdkMethod<Subscription['testmainnet_aggregateRoots'], Subscriptiontestmainnet_aggregateRootsArgs, MeshContext>,
  /** null **/
  testmainnet_connectorMeta: InContextSdkMethod<Subscription['testmainnet_connectorMeta'], Subscriptiontestmainnet_connectorMetaArgs, MeshContext>,
  /** null **/
  testmainnet_connectorMetas: InContextSdkMethod<Subscription['testmainnet_connectorMetas'], Subscriptiontestmainnet_connectorMetasArgs, MeshContext>,
  /** null **/
  testmainnet_rootCount: InContextSdkMethod<Subscription['testmainnet_rootCount'], Subscriptiontestmainnet_rootCountArgs, MeshContext>,
  /** null **/
  testmainnet_rootCounts: InContextSdkMethod<Subscription['testmainnet_rootCounts'], Subscriptiontestmainnet_rootCountsArgs, MeshContext>,
  /** null **/
  testmainnet_rootMessageSent: InContextSdkMethod<Subscription['testmainnet_rootMessageSent'], Subscriptiontestmainnet_rootMessageSentArgs, MeshContext>,
  /** null **/
  testmainnet_rootMessageSents: InContextSdkMethod<Subscription['testmainnet_rootMessageSents'], Subscriptiontestmainnet_rootMessageSentsArgs, MeshContext>,
  /** null **/
  testmainnet_stableSwap: InContextSdkMethod<Subscription['testmainnet_stableSwap'], Subscriptiontestmainnet_stableSwapArgs, MeshContext>,
  /** null **/
  testmainnet_stableSwaps: InContextSdkMethod<Subscription['testmainnet_stableSwaps'], Subscriptiontestmainnet_stableSwapsArgs, MeshContext>,
  /** null **/
  testmainnet_pooledToken: InContextSdkMethod<Subscription['testmainnet_pooledToken'], Subscriptiontestmainnet_pooledTokenArgs, MeshContext>,
  /** null **/
  testmainnet_pooledTokens: InContextSdkMethod<Subscription['testmainnet_pooledTokens'], Subscriptiontestmainnet_pooledTokensArgs, MeshContext>,
  /** null **/
  testmainnet_stableSwapLiquidity: InContextSdkMethod<Subscription['testmainnet_stableSwapLiquidity'], Subscriptiontestmainnet_stableSwapLiquidityArgs, MeshContext>,
  /** null **/
  testmainnet_stableSwapLiquidities: InContextSdkMethod<Subscription['testmainnet_stableSwapLiquidities'], Subscriptiontestmainnet_stableSwapLiquiditiesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  testmainnet__meta: InContextSdkMethod<Subscription['testmainnet__meta'], Subscriptiontestmainnet__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Test_Mainnet"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
