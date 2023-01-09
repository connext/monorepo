// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextLocal1337Types {
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
  local1337_BigDecimal: any;
  BigInt: any;
  local1337_Bytes: any;
};

export type local1337_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['local1337_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type local1337_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['local1337_Bytes']>;
  root_not?: InputMaybe<Scalars['local1337_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  root_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1337_BlockChangedFilter>;
};

export type local1337_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type local1337_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['local1337_Bytes']>;
  canonicalId?: Maybe<Scalars['local1337_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['local1337_Bytes']>;
  localAsset?: Maybe<Scalars['local1337_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type local1337_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: local1337_Router;
  asset: local1337_Asset;
  feesEarned: Scalars['BigInt'];
};

export type local1337_AssetBalance_filter = {
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
  router_?: InputMaybe<local1337_Router_filter>;
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
  asset_?: InputMaybe<local1337_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1337_BlockChangedFilter>;
};

export type local1337_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset'
  | 'feesEarned';

export type local1337_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['local1337_Bytes']>;
  key_not?: InputMaybe<Scalars['local1337_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  key_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  canonicalId?: InputMaybe<Scalars['local1337_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['local1337_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['local1337_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['local1337_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  localAsset?: InputMaybe<Scalars['local1337_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['local1337_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1337_BlockChangedFilter>;
};

export type local1337_Asset_orderBy =
  | 'id'
  | 'key'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber';

export type local1337_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type local1337_Block_height = {
  hash?: InputMaybe<Scalars['local1337_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type local1337_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['local1337_Bytes']>;
  rootManager?: Maybe<Scalars['local1337_Bytes']>;
  mirrorConnector?: Maybe<Scalars['local1337_Bytes']>;
};

export type local1337_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['local1337_Bytes']>;
  amb_not?: InputMaybe<Scalars['local1337_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  rootManager?: InputMaybe<Scalars['local1337_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['local1337_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['local1337_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['local1337_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1337_BlockChangedFilter>;
};

export type local1337_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type local1337_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['local1337_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<local1337_TransferStatus>;
  routers?: Maybe<Array<local1337_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['local1337_Bytes']>;
  delegate?: Maybe<Scalars['local1337_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['local1337_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['local1337_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['local1337_Bytes']>;
  asset?: Maybe<local1337_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['local1337_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['local1337_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['local1337_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['local1337_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type local1337_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_Router_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_Router_filter>;
};

export type local1337_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['local1337_Bytes']>;
  transferId_not?: InputMaybe<Scalars['local1337_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<local1337_TransferStatus>;
  status_not?: InputMaybe<local1337_TransferStatus>;
  status_in?: InputMaybe<Array<local1337_TransferStatus>>;
  status_not_in?: InputMaybe<Array<local1337_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<local1337_Router_filter>;
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
  to?: InputMaybe<Scalars['local1337_Bytes']>;
  to_not?: InputMaybe<Scalars['local1337_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  to_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  delegate?: InputMaybe<Scalars['local1337_Bytes']>;
  delegate_not?: InputMaybe<Scalars['local1337_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['local1337_Bytes']>;
  callData_not?: InputMaybe<Scalars['local1337_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['local1337_Bytes']>;
  originSender_not?: InputMaybe<Scalars['local1337_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['local1337_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['local1337_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
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
  asset_?: InputMaybe<local1337_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['local1337_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['local1337_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['local1337_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['local1337_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
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
  reconciledCaller?: InputMaybe<Scalars['local1337_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['local1337_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['local1337_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['local1337_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
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
  _change_block?: InputMaybe<local1337_BlockChangedFilter>;
};

export type local1337_DestinationTransfer_orderBy =
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
  | 'amount'
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
export type local1337_OrderDirection =
  | 'asc'
  | 'desc';

export type local1337_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['local1337_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['local1337_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['local1337_Bytes']>;
  root?: Maybe<Scalars['local1337_Bytes']>;
  transactionHash?: Maybe<Scalars['local1337_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<local1337_RootCount>;
};

export type local1337_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['local1337_Bytes']>;
  transferId_not?: InputMaybe<Scalars['local1337_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['local1337_Bytes']>;
  leaf_not?: InputMaybe<Scalars['local1337_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['local1337_Bytes']>;
  message_not?: InputMaybe<Scalars['local1337_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  message_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  root?: InputMaybe<Scalars['local1337_Bytes']>;
  root_not?: InputMaybe<Scalars['local1337_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  root_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  transactionHash?: InputMaybe<Scalars['local1337_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['local1337_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
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
  rootCount_?: InputMaybe<local1337_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1337_BlockChangedFilter>;
};

export type local1337_OriginMessage_orderBy =
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

export type local1337_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['local1337_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<local1337_TransferStatus>;
  messageHash?: Maybe<Scalars['local1337_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['local1337_Bytes']>;
  delegate?: Maybe<Scalars['local1337_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['local1337_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['local1337_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['local1337_Bytes']>;
  asset?: Maybe<local1337_Asset>;
  message?: Maybe<local1337_OriginMessage>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['local1337_Bytes']>;
  transactionHash?: Maybe<Scalars['local1337_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type local1337_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['local1337_Bytes']>;
  transferId_not?: InputMaybe<Scalars['local1337_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<local1337_TransferStatus>;
  status_not?: InputMaybe<local1337_TransferStatus>;
  status_in?: InputMaybe<Array<local1337_TransferStatus>>;
  status_not_in?: InputMaybe<Array<local1337_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['local1337_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['local1337_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
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
  to?: InputMaybe<Scalars['local1337_Bytes']>;
  to_not?: InputMaybe<Scalars['local1337_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  to_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  delegate?: InputMaybe<Scalars['local1337_Bytes']>;
  delegate_not?: InputMaybe<Scalars['local1337_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['local1337_Bytes']>;
  callData_not?: InputMaybe<Scalars['local1337_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['local1337_Bytes']>;
  originSender_not?: InputMaybe<Scalars['local1337_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['local1337_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['local1337_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
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
  asset_?: InputMaybe<local1337_Asset_filter>;
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
  message_?: InputMaybe<local1337_OriginMessage_filter>;
  relayerFee?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['local1337_Bytes']>;
  caller_not?: InputMaybe<Scalars['local1337_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  transactionHash?: InputMaybe<Scalars['local1337_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['local1337_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
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
  _change_block?: InputMaybe<local1337_BlockChangedFilter>;
};

export type local1337_OriginTransfer_orderBy =
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
  | 'message'
  | 'relayerFee'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type local1337_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['local1337_Bytes'];
};

export type local1337_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['local1337_Bytes']>;
  asset_not?: InputMaybe<Scalars['local1337_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1337_BlockChangedFilter>;
};

export type local1337_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  local1337_asset?: Maybe<local1337_Asset>;
  local1337_assets: Array<local1337_Asset>;
  local1337_assetBalance?: Maybe<local1337_AssetBalance>;
  local1337_assetBalances: Array<local1337_AssetBalance>;
  local1337_router?: Maybe<local1337_Router>;
  local1337_routers: Array<local1337_Router>;
  local1337_setting?: Maybe<local1337_Setting>;
  local1337_settings: Array<local1337_Setting>;
  local1337_relayer?: Maybe<local1337_Relayer>;
  local1337_relayers: Array<local1337_Relayer>;
  local1337_transferRelayerFee?: Maybe<local1337_TransferRelayerFee>;
  local1337_transferRelayerFees: Array<local1337_TransferRelayerFee>;
  local1337_sequencer?: Maybe<local1337_Sequencer>;
  local1337_sequencers: Array<local1337_Sequencer>;
  local1337_originTransfer?: Maybe<local1337_OriginTransfer>;
  local1337_originTransfers: Array<local1337_OriginTransfer>;
  local1337_destinationTransfer?: Maybe<local1337_DestinationTransfer>;
  local1337_destinationTransfers: Array<local1337_DestinationTransfer>;
  local1337_originMessage?: Maybe<local1337_OriginMessage>;
  local1337_originMessages: Array<local1337_OriginMessage>;
  local1337_aggregateRoot?: Maybe<local1337_AggregateRoot>;
  local1337_aggregateRoots: Array<local1337_AggregateRoot>;
  local1337_connectorMeta?: Maybe<local1337_ConnectorMeta>;
  local1337_connectorMetas: Array<local1337_ConnectorMeta>;
  local1337_rootCount?: Maybe<local1337_RootCount>;
  local1337_rootCounts: Array<local1337_RootCount>;
  local1337_rootMessageSent?: Maybe<local1337_RootMessageSent>;
  local1337_rootMessageSents: Array<local1337_RootMessageSent>;
  local1337_stableSwap?: Maybe<local1337_StableSwap>;
  local1337_stableSwaps: Array<local1337_StableSwap>;
  local1337_pooledToken?: Maybe<local1337_PooledToken>;
  local1337_pooledTokens: Array<local1337_PooledToken>;
  local1337_stableSwapLiquidity?: Maybe<local1337_StableSwapLiquidity>;
  local1337_stableSwapLiquidities: Array<local1337_StableSwapLiquidity>;
  /** Access to subgraph metadata */
  local1337__meta?: Maybe<local1337__Meta_>;
};


export type Querylocal1337_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_Asset_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_Asset_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_AssetBalance_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_Router_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_Router_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_Setting_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_Setting_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_Relayer_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_Relayer_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_transferRelayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_transferRelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_TransferRelayerFee_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_TransferRelayerFee_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_Sequencer_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_Sequencer_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_OriginTransfer_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_DestinationTransfer_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_OriginMessage_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_AggregateRoot_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_ConnectorMeta_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_RootCount_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_RootCount_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_RootMessageSent_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_StableSwap_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_StableSwap_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_PooledToken_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_PooledToken_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_stableSwapLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_stableSwapLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_StableSwapLiquidity_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_StableSwapLiquidity_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337__metaArgs = {
  block?: InputMaybe<local1337_Block_height>;
};

export type local1337_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['local1337_Bytes']>;
};

export type local1337_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['local1337_Bytes']>;
  relayer_not?: InputMaybe<Scalars['local1337_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1337_BlockChangedFilter>;
};

export type local1337_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type local1337_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type local1337_RootCount_filter = {
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
  _change_block?: InputMaybe<local1337_BlockChangedFilter>;
};

export type local1337_RootCount_orderBy =
  | 'id'
  | 'count';

export type local1337_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['local1337_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['local1337_Bytes']>;
  transactionHash?: Maybe<Scalars['local1337_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type local1337_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['local1337_Bytes']>;
  root_not?: InputMaybe<Scalars['local1337_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  root_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['local1337_Bytes']>;
  caller_not?: InputMaybe<Scalars['local1337_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  transactionHash?: InputMaybe<Scalars['local1337_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['local1337_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
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
  _change_block?: InputMaybe<local1337_BlockChangedFilter>;
};

export type local1337_RootMessageSent_orderBy =
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

export type local1337_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['local1337_Bytes']>;
  recipient?: Maybe<Scalars['local1337_Bytes']>;
  proposedOwner?: Maybe<Scalars['local1337_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<local1337_AssetBalance>;
};


export type local1337_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_AssetBalance_filter>;
};

export type local1337_Router_filter = {
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
  owner?: InputMaybe<Scalars['local1337_Bytes']>;
  owner_not?: InputMaybe<Scalars['local1337_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  recipient?: InputMaybe<Scalars['local1337_Bytes']>;
  recipient_not?: InputMaybe<Scalars['local1337_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['local1337_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['local1337_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<local1337_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1337_BlockChangedFilter>;
};

export type local1337_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type local1337_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['local1337_Bytes']>;
};

export type local1337_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['local1337_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['local1337_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1337_BlockChangedFilter>;
};

export type local1337_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type local1337_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['local1337_Bytes'];
};

export type local1337_Setting_filter = {
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
  caller?: InputMaybe<Scalars['local1337_Bytes']>;
  caller_not?: InputMaybe<Scalars['local1337_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1337_BlockChangedFilter>;
};

export type local1337_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type local1337_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['local1337_Bytes']>;
  canonicalId?: Maybe<Scalars['local1337_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['local1337_Bytes']>;
  lpToken?: Maybe<Scalars['local1337_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<local1337_PooledToken>;
  tokenPrecisionMultipliers?: Maybe<Array<Scalars['BigInt']>>;
  balances: Array<Scalars['BigInt']>;
  adminFees?: Maybe<Array<Scalars['BigInt']>>;
};


export type local1337_StableSwappooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_PooledToken_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_PooledToken_filter>;
};

export type local1337_StableSwapLiquidity = {
  id: Scalars['ID'];
  provider: Scalars['local1337_Bytes'];
  stableSwap: local1337_StableSwap;
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply?: Maybe<Scalars['BigInt']>;
};

export type local1337_StableSwapLiquidity_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  provider?: InputMaybe<Scalars['local1337_Bytes']>;
  provider_not?: InputMaybe<Scalars['local1337_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
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
  stableSwap_?: InputMaybe<local1337_StableSwap_filter>;
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
  _change_block?: InputMaybe<local1337_BlockChangedFilter>;
};

export type local1337_StableSwapLiquidity_orderBy =
  | 'id'
  | 'provider'
  | 'stableSwap'
  | 'tokenAmounts'
  | 'fees'
  | 'invariant'
  | 'lpTokenSupply';

export type local1337_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['local1337_Bytes']>;
  key_not?: InputMaybe<Scalars['local1337_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  key_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  canonicalId?: InputMaybe<Scalars['local1337_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['local1337_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['local1337_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['local1337_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  lpToken?: InputMaybe<Scalars['local1337_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['local1337_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
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
  pooledTokens_?: InputMaybe<local1337_PooledToken_filter>;
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
  _change_block?: InputMaybe<local1337_BlockChangedFilter>;
};

export type local1337_StableSwap_orderBy =
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
  local1337_asset?: Maybe<local1337_Asset>;
  local1337_assets: Array<local1337_Asset>;
  local1337_assetBalance?: Maybe<local1337_AssetBalance>;
  local1337_assetBalances: Array<local1337_AssetBalance>;
  local1337_router?: Maybe<local1337_Router>;
  local1337_routers: Array<local1337_Router>;
  local1337_setting?: Maybe<local1337_Setting>;
  local1337_settings: Array<local1337_Setting>;
  local1337_relayer?: Maybe<local1337_Relayer>;
  local1337_relayers: Array<local1337_Relayer>;
  local1337_transferRelayerFee?: Maybe<local1337_TransferRelayerFee>;
  local1337_transferRelayerFees: Array<local1337_TransferRelayerFee>;
  local1337_sequencer?: Maybe<local1337_Sequencer>;
  local1337_sequencers: Array<local1337_Sequencer>;
  local1337_originTransfer?: Maybe<local1337_OriginTransfer>;
  local1337_originTransfers: Array<local1337_OriginTransfer>;
  local1337_destinationTransfer?: Maybe<local1337_DestinationTransfer>;
  local1337_destinationTransfers: Array<local1337_DestinationTransfer>;
  local1337_originMessage?: Maybe<local1337_OriginMessage>;
  local1337_originMessages: Array<local1337_OriginMessage>;
  local1337_aggregateRoot?: Maybe<local1337_AggregateRoot>;
  local1337_aggregateRoots: Array<local1337_AggregateRoot>;
  local1337_connectorMeta?: Maybe<local1337_ConnectorMeta>;
  local1337_connectorMetas: Array<local1337_ConnectorMeta>;
  local1337_rootCount?: Maybe<local1337_RootCount>;
  local1337_rootCounts: Array<local1337_RootCount>;
  local1337_rootMessageSent?: Maybe<local1337_RootMessageSent>;
  local1337_rootMessageSents: Array<local1337_RootMessageSent>;
  local1337_stableSwap?: Maybe<local1337_StableSwap>;
  local1337_stableSwaps: Array<local1337_StableSwap>;
  local1337_pooledToken?: Maybe<local1337_PooledToken>;
  local1337_pooledTokens: Array<local1337_PooledToken>;
  local1337_stableSwapLiquidity?: Maybe<local1337_StableSwapLiquidity>;
  local1337_stableSwapLiquidities: Array<local1337_StableSwapLiquidity>;
  /** Access to subgraph metadata */
  local1337__meta?: Maybe<local1337__Meta_>;
};


export type Subscriptionlocal1337_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_Asset_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_Asset_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_AssetBalance_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_Router_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_Router_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_Setting_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_Setting_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_Relayer_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_Relayer_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_transferRelayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_transferRelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_TransferRelayerFee_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_TransferRelayerFee_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_Sequencer_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_Sequencer_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_OriginTransfer_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_DestinationTransfer_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_OriginMessage_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_AggregateRoot_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_ConnectorMeta_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_RootCount_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_RootCount_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_RootMessageSent_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_StableSwap_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_StableSwap_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_PooledToken_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_PooledToken_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_stableSwapLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_stableSwapLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_StableSwapLiquidity_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_StableSwapLiquidity_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337__metaArgs = {
  block?: InputMaybe<local1337_Block_height>;
};

export type local1337_TransferRelayerFee = {
  id: Scalars['ID'];
  transferId: Scalars['local1337_Bytes'];
  fee?: Maybe<Scalars['BigInt']>;
};

export type local1337_TransferRelayerFee_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['local1337_Bytes']>;
  transferId_not?: InputMaybe<Scalars['local1337_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1337_BlockChangedFilter>;
};

export type local1337_TransferRelayerFee_orderBy =
  | 'id'
  | 'transferId'
  | 'fee';

export type local1337_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type local1337__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['local1337_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type local1337__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: local1337__Block_;
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
  local1337_asset: InContextSdkMethod<Query['local1337_asset'], Querylocal1337_assetArgs, MeshContext>,
  /** null **/
  local1337_assets: InContextSdkMethod<Query['local1337_assets'], Querylocal1337_assetsArgs, MeshContext>,
  /** null **/
  local1337_assetBalance: InContextSdkMethod<Query['local1337_assetBalance'], Querylocal1337_assetBalanceArgs, MeshContext>,
  /** null **/
  local1337_assetBalances: InContextSdkMethod<Query['local1337_assetBalances'], Querylocal1337_assetBalancesArgs, MeshContext>,
  /** null **/
  local1337_router: InContextSdkMethod<Query['local1337_router'], Querylocal1337_routerArgs, MeshContext>,
  /** null **/
  local1337_routers: InContextSdkMethod<Query['local1337_routers'], Querylocal1337_routersArgs, MeshContext>,
  /** null **/
  local1337_setting: InContextSdkMethod<Query['local1337_setting'], Querylocal1337_settingArgs, MeshContext>,
  /** null **/
  local1337_settings: InContextSdkMethod<Query['local1337_settings'], Querylocal1337_settingsArgs, MeshContext>,
  /** null **/
  local1337_relayer: InContextSdkMethod<Query['local1337_relayer'], Querylocal1337_relayerArgs, MeshContext>,
  /** null **/
  local1337_relayers: InContextSdkMethod<Query['local1337_relayers'], Querylocal1337_relayersArgs, MeshContext>,
  /** null **/
  local1337_transferRelayerFee: InContextSdkMethod<Query['local1337_transferRelayerFee'], Querylocal1337_transferRelayerFeeArgs, MeshContext>,
  /** null **/
  local1337_transferRelayerFees: InContextSdkMethod<Query['local1337_transferRelayerFees'], Querylocal1337_transferRelayerFeesArgs, MeshContext>,
  /** null **/
  local1337_sequencer: InContextSdkMethod<Query['local1337_sequencer'], Querylocal1337_sequencerArgs, MeshContext>,
  /** null **/
  local1337_sequencers: InContextSdkMethod<Query['local1337_sequencers'], Querylocal1337_sequencersArgs, MeshContext>,
  /** null **/
  local1337_originTransfer: InContextSdkMethod<Query['local1337_originTransfer'], Querylocal1337_originTransferArgs, MeshContext>,
  /** null **/
  local1337_originTransfers: InContextSdkMethod<Query['local1337_originTransfers'], Querylocal1337_originTransfersArgs, MeshContext>,
  /** null **/
  local1337_destinationTransfer: InContextSdkMethod<Query['local1337_destinationTransfer'], Querylocal1337_destinationTransferArgs, MeshContext>,
  /** null **/
  local1337_destinationTransfers: InContextSdkMethod<Query['local1337_destinationTransfers'], Querylocal1337_destinationTransfersArgs, MeshContext>,
  /** null **/
  local1337_originMessage: InContextSdkMethod<Query['local1337_originMessage'], Querylocal1337_originMessageArgs, MeshContext>,
  /** null **/
  local1337_originMessages: InContextSdkMethod<Query['local1337_originMessages'], Querylocal1337_originMessagesArgs, MeshContext>,
  /** null **/
  local1337_aggregateRoot: InContextSdkMethod<Query['local1337_aggregateRoot'], Querylocal1337_aggregateRootArgs, MeshContext>,
  /** null **/
  local1337_aggregateRoots: InContextSdkMethod<Query['local1337_aggregateRoots'], Querylocal1337_aggregateRootsArgs, MeshContext>,
  /** null **/
  local1337_connectorMeta: InContextSdkMethod<Query['local1337_connectorMeta'], Querylocal1337_connectorMetaArgs, MeshContext>,
  /** null **/
  local1337_connectorMetas: InContextSdkMethod<Query['local1337_connectorMetas'], Querylocal1337_connectorMetasArgs, MeshContext>,
  /** null **/
  local1337_rootCount: InContextSdkMethod<Query['local1337_rootCount'], Querylocal1337_rootCountArgs, MeshContext>,
  /** null **/
  local1337_rootCounts: InContextSdkMethod<Query['local1337_rootCounts'], Querylocal1337_rootCountsArgs, MeshContext>,
  /** null **/
  local1337_rootMessageSent: InContextSdkMethod<Query['local1337_rootMessageSent'], Querylocal1337_rootMessageSentArgs, MeshContext>,
  /** null **/
  local1337_rootMessageSents: InContextSdkMethod<Query['local1337_rootMessageSents'], Querylocal1337_rootMessageSentsArgs, MeshContext>,
  /** null **/
  local1337_stableSwap: InContextSdkMethod<Query['local1337_stableSwap'], Querylocal1337_stableSwapArgs, MeshContext>,
  /** null **/
  local1337_stableSwaps: InContextSdkMethod<Query['local1337_stableSwaps'], Querylocal1337_stableSwapsArgs, MeshContext>,
  /** null **/
  local1337_pooledToken: InContextSdkMethod<Query['local1337_pooledToken'], Querylocal1337_pooledTokenArgs, MeshContext>,
  /** null **/
  local1337_pooledTokens: InContextSdkMethod<Query['local1337_pooledTokens'], Querylocal1337_pooledTokensArgs, MeshContext>,
  /** null **/
  local1337_stableSwapLiquidity: InContextSdkMethod<Query['local1337_stableSwapLiquidity'], Querylocal1337_stableSwapLiquidityArgs, MeshContext>,
  /** null **/
  local1337_stableSwapLiquidities: InContextSdkMethod<Query['local1337_stableSwapLiquidities'], Querylocal1337_stableSwapLiquiditiesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  local1337__meta: InContextSdkMethod<Query['local1337__meta'], Querylocal1337__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  local1337_asset: InContextSdkMethod<Subscription['local1337_asset'], Subscriptionlocal1337_assetArgs, MeshContext>,
  /** null **/
  local1337_assets: InContextSdkMethod<Subscription['local1337_assets'], Subscriptionlocal1337_assetsArgs, MeshContext>,
  /** null **/
  local1337_assetBalance: InContextSdkMethod<Subscription['local1337_assetBalance'], Subscriptionlocal1337_assetBalanceArgs, MeshContext>,
  /** null **/
  local1337_assetBalances: InContextSdkMethod<Subscription['local1337_assetBalances'], Subscriptionlocal1337_assetBalancesArgs, MeshContext>,
  /** null **/
  local1337_router: InContextSdkMethod<Subscription['local1337_router'], Subscriptionlocal1337_routerArgs, MeshContext>,
  /** null **/
  local1337_routers: InContextSdkMethod<Subscription['local1337_routers'], Subscriptionlocal1337_routersArgs, MeshContext>,
  /** null **/
  local1337_setting: InContextSdkMethod<Subscription['local1337_setting'], Subscriptionlocal1337_settingArgs, MeshContext>,
  /** null **/
  local1337_settings: InContextSdkMethod<Subscription['local1337_settings'], Subscriptionlocal1337_settingsArgs, MeshContext>,
  /** null **/
  local1337_relayer: InContextSdkMethod<Subscription['local1337_relayer'], Subscriptionlocal1337_relayerArgs, MeshContext>,
  /** null **/
  local1337_relayers: InContextSdkMethod<Subscription['local1337_relayers'], Subscriptionlocal1337_relayersArgs, MeshContext>,
  /** null **/
  local1337_transferRelayerFee: InContextSdkMethod<Subscription['local1337_transferRelayerFee'], Subscriptionlocal1337_transferRelayerFeeArgs, MeshContext>,
  /** null **/
  local1337_transferRelayerFees: InContextSdkMethod<Subscription['local1337_transferRelayerFees'], Subscriptionlocal1337_transferRelayerFeesArgs, MeshContext>,
  /** null **/
  local1337_sequencer: InContextSdkMethod<Subscription['local1337_sequencer'], Subscriptionlocal1337_sequencerArgs, MeshContext>,
  /** null **/
  local1337_sequencers: InContextSdkMethod<Subscription['local1337_sequencers'], Subscriptionlocal1337_sequencersArgs, MeshContext>,
  /** null **/
  local1337_originTransfer: InContextSdkMethod<Subscription['local1337_originTransfer'], Subscriptionlocal1337_originTransferArgs, MeshContext>,
  /** null **/
  local1337_originTransfers: InContextSdkMethod<Subscription['local1337_originTransfers'], Subscriptionlocal1337_originTransfersArgs, MeshContext>,
  /** null **/
  local1337_destinationTransfer: InContextSdkMethod<Subscription['local1337_destinationTransfer'], Subscriptionlocal1337_destinationTransferArgs, MeshContext>,
  /** null **/
  local1337_destinationTransfers: InContextSdkMethod<Subscription['local1337_destinationTransfers'], Subscriptionlocal1337_destinationTransfersArgs, MeshContext>,
  /** null **/
  local1337_originMessage: InContextSdkMethod<Subscription['local1337_originMessage'], Subscriptionlocal1337_originMessageArgs, MeshContext>,
  /** null **/
  local1337_originMessages: InContextSdkMethod<Subscription['local1337_originMessages'], Subscriptionlocal1337_originMessagesArgs, MeshContext>,
  /** null **/
  local1337_aggregateRoot: InContextSdkMethod<Subscription['local1337_aggregateRoot'], Subscriptionlocal1337_aggregateRootArgs, MeshContext>,
  /** null **/
  local1337_aggregateRoots: InContextSdkMethod<Subscription['local1337_aggregateRoots'], Subscriptionlocal1337_aggregateRootsArgs, MeshContext>,
  /** null **/
  local1337_connectorMeta: InContextSdkMethod<Subscription['local1337_connectorMeta'], Subscriptionlocal1337_connectorMetaArgs, MeshContext>,
  /** null **/
  local1337_connectorMetas: InContextSdkMethod<Subscription['local1337_connectorMetas'], Subscriptionlocal1337_connectorMetasArgs, MeshContext>,
  /** null **/
  local1337_rootCount: InContextSdkMethod<Subscription['local1337_rootCount'], Subscriptionlocal1337_rootCountArgs, MeshContext>,
  /** null **/
  local1337_rootCounts: InContextSdkMethod<Subscription['local1337_rootCounts'], Subscriptionlocal1337_rootCountsArgs, MeshContext>,
  /** null **/
  local1337_rootMessageSent: InContextSdkMethod<Subscription['local1337_rootMessageSent'], Subscriptionlocal1337_rootMessageSentArgs, MeshContext>,
  /** null **/
  local1337_rootMessageSents: InContextSdkMethod<Subscription['local1337_rootMessageSents'], Subscriptionlocal1337_rootMessageSentsArgs, MeshContext>,
  /** null **/
  local1337_stableSwap: InContextSdkMethod<Subscription['local1337_stableSwap'], Subscriptionlocal1337_stableSwapArgs, MeshContext>,
  /** null **/
  local1337_stableSwaps: InContextSdkMethod<Subscription['local1337_stableSwaps'], Subscriptionlocal1337_stableSwapsArgs, MeshContext>,
  /** null **/
  local1337_pooledToken: InContextSdkMethod<Subscription['local1337_pooledToken'], Subscriptionlocal1337_pooledTokenArgs, MeshContext>,
  /** null **/
  local1337_pooledTokens: InContextSdkMethod<Subscription['local1337_pooledTokens'], Subscriptionlocal1337_pooledTokensArgs, MeshContext>,
  /** null **/
  local1337_stableSwapLiquidity: InContextSdkMethod<Subscription['local1337_stableSwapLiquidity'], Subscriptionlocal1337_stableSwapLiquidityArgs, MeshContext>,
  /** null **/
  local1337_stableSwapLiquidities: InContextSdkMethod<Subscription['local1337_stableSwapLiquidities'], Subscriptionlocal1337_stableSwapLiquiditiesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  local1337__meta: InContextSdkMethod<Subscription['local1337__meta'], Subscriptionlocal1337__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Local1337"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
