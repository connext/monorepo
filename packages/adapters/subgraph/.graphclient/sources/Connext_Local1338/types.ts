// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextLocal1338Types {
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
  local1338_BigDecimal: any;
  BigInt: any;
  local1338_Bytes: any;
};

export type local1338_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['local1338_Bytes'];
};

export type local1338_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['local1338_Bytes']>;
  root_not?: InputMaybe<Scalars['local1338_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  root_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_AggregateRoot_orderBy =
  | 'id'
  | 'root';

export type local1338_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['local1338_Bytes']>;
  canonicalId?: Maybe<Scalars['local1338_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['local1338_Bytes']>;
  localAsset?: Maybe<Scalars['local1338_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type local1338_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: local1338_Router;
  asset: local1338_Asset;
};

export type local1338_AssetBalance_filter = {
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
  router_?: InputMaybe<local1338_Router_filter>;
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
  asset_?: InputMaybe<local1338_Asset_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type local1338_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['local1338_Bytes']>;
  key_not?: InputMaybe<Scalars['local1338_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  key_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['local1338_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['local1338_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  localAsset?: InputMaybe<Scalars['local1338_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['local1338_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_Asset_orderBy =
  | 'id'
  | 'key'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber';

export type local1338_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type local1338_Block_height = {
  hash?: InputMaybe<Scalars['local1338_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type local1338_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['local1338_Bytes']>;
  rootManager?: Maybe<Scalars['local1338_Bytes']>;
  mirrorConnector?: Maybe<Scalars['local1338_Bytes']>;
};

export type local1338_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['local1338_Bytes']>;
  amb_not?: InputMaybe<Scalars['local1338_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  rootManager?: InputMaybe<Scalars['local1338_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['local1338_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['local1338_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['local1338_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type local1338_DestinationMessage = {
  id: Scalars['ID'];
  leaf?: Maybe<Scalars['local1338_Bytes']>;
  processed?: Maybe<Scalars['Boolean']>;
  returnData?: Maybe<Scalars['local1338_Bytes']>;
  success?: Maybe<Scalars['Boolean']>;
  transactionHash?: Maybe<Scalars['local1338_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type local1338_DestinationMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  leaf?: InputMaybe<Scalars['local1338_Bytes']>;
  leaf_not?: InputMaybe<Scalars['local1338_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  processed?: InputMaybe<Scalars['Boolean']>;
  processed_not?: InputMaybe<Scalars['Boolean']>;
  processed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  processed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  returnData?: InputMaybe<Scalars['local1338_Bytes']>;
  returnData_not?: InputMaybe<Scalars['local1338_Bytes']>;
  returnData_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  returnData_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  returnData_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  returnData_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  success?: InputMaybe<Scalars['Boolean']>;
  success_not?: InputMaybe<Scalars['Boolean']>;
  success_in?: InputMaybe<Array<Scalars['Boolean']>>;
  success_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  transactionHash?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_DestinationMessage_orderBy =
  | 'id'
  | 'leaf'
  | 'processed'
  | 'returnData'
  | 'success'
  | 'transactionHash'
  | 'blockNumber';

export type local1338_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['local1338_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<local1338_TransferStatus>;
  routers?: Maybe<Array<local1338_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['local1338_Bytes']>;
  delegate?: Maybe<Scalars['local1338_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['local1338_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['local1338_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['local1338_Bytes']>;
  asset?: Maybe<local1338_Asset>;
  executedCaller?: Maybe<Scalars['local1338_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['local1338_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['local1338_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['local1338_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type local1338_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Router_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Router_filter>;
};

export type local1338_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_not?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<local1338_TransferStatus>;
  status_not?: InputMaybe<local1338_TransferStatus>;
  status_in?: InputMaybe<Array<local1338_TransferStatus>>;
  status_not_in?: InputMaybe<Array<local1338_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<local1338_Router_filter>;
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
  to?: InputMaybe<Scalars['local1338_Bytes']>;
  to_not?: InputMaybe<Scalars['local1338_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  to_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate_not?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_not?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['local1338_Bytes']>;
  originSender_not?: InputMaybe<Scalars['local1338_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  asset_?: InputMaybe<local1338_Asset_filter>;
  executedCaller?: InputMaybe<Scalars['local1338_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['local1338_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  reconciledCaller?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_DestinationTransfer_orderBy =
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
export type local1338_OrderDirection =
  | 'asc'
  | 'desc';

export type local1338_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['local1338_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['local1338_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['local1338_Bytes']>;
  message?: Maybe<Scalars['local1338_Bytes']>;
  transactionHash?: Maybe<Scalars['local1338_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<local1338_RootCount>;
};

export type local1338_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_not?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['local1338_Bytes']>;
  leaf_not?: InputMaybe<Scalars['local1338_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  root?: InputMaybe<Scalars['local1338_Bytes']>;
  root_not?: InputMaybe<Scalars['local1338_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  root_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  message?: InputMaybe<Scalars['local1338_Bytes']>;
  message_not?: InputMaybe<Scalars['local1338_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  message_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  rootCount_?: InputMaybe<local1338_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_OriginMessage_orderBy =
  | 'id'
  | 'transferId'
  | 'destinationDomain'
  | 'leaf'
  | 'index'
  | 'root'
  | 'message'
  | 'transactionHash'
  | 'blockNumber'
  | 'rootCount';

export type local1338_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['local1338_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<local1338_TransferStatus>;
  messageHash?: Maybe<Scalars['local1338_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['local1338_Bytes']>;
  delegate?: Maybe<Scalars['local1338_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['local1338_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['local1338_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['local1338_Bytes']>;
  asset?: Maybe<local1338_Asset>;
  message?: Maybe<local1338_OriginMessage>;
  caller?: Maybe<Scalars['local1338_Bytes']>;
  transactionHash?: Maybe<Scalars['local1338_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type local1338_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_not?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<local1338_TransferStatus>;
  status_not?: InputMaybe<local1338_TransferStatus>;
  status_in?: InputMaybe<Array<local1338_TransferStatus>>;
  status_not_in?: InputMaybe<Array<local1338_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['local1338_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['local1338_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  to?: InputMaybe<Scalars['local1338_Bytes']>;
  to_not?: InputMaybe<Scalars['local1338_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  to_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate_not?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_not?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['local1338_Bytes']>;
  originSender_not?: InputMaybe<Scalars['local1338_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  asset_?: InputMaybe<local1338_Asset_filter>;
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
  message_?: InputMaybe<local1338_OriginMessage_filter>;
  caller?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_not?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_OriginTransfer_orderBy =
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
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type Query = {
  local1338_asset?: Maybe<local1338_Asset>;
  local1338_assets: Array<local1338_Asset>;
  local1338_assetBalance?: Maybe<local1338_AssetBalance>;
  local1338_assetBalances: Array<local1338_AssetBalance>;
  local1338_router?: Maybe<local1338_Router>;
  local1338_routers: Array<local1338_Router>;
  local1338_setting?: Maybe<local1338_Setting>;
  local1338_settings: Array<local1338_Setting>;
  local1338_relayer?: Maybe<local1338_Relayer>;
  local1338_relayers: Array<local1338_Relayer>;
  local1338_sequencer?: Maybe<local1338_Sequencer>;
  local1338_sequencers: Array<local1338_Sequencer>;
  local1338_stableSwap?: Maybe<local1338_StableSwap>;
  local1338_stableSwaps: Array<local1338_StableSwap>;
  local1338_originTransfer?: Maybe<local1338_OriginTransfer>;
  local1338_originTransfers: Array<local1338_OriginTransfer>;
  local1338_destinationTransfer?: Maybe<local1338_DestinationTransfer>;
  local1338_destinationTransfers: Array<local1338_DestinationTransfer>;
  local1338_originMessage?: Maybe<local1338_OriginMessage>;
  local1338_originMessages: Array<local1338_OriginMessage>;
  local1338_destinationMessage?: Maybe<local1338_DestinationMessage>;
  local1338_destinationMessages: Array<local1338_DestinationMessage>;
  local1338_aggregateRoot?: Maybe<local1338_AggregateRoot>;
  local1338_aggregateRoots: Array<local1338_AggregateRoot>;
  local1338_connectorMeta?: Maybe<local1338_ConnectorMeta>;
  local1338_connectorMetas: Array<local1338_ConnectorMeta>;
  local1338_rootCount?: Maybe<local1338_RootCount>;
  local1338_rootCounts: Array<local1338_RootCount>;
  local1338_rootMessageSent?: Maybe<local1338_RootMessageSent>;
  local1338_rootMessageSents: Array<local1338_RootMessageSent>;
  /** Access to subgraph metadata */
  local1338__meta?: Maybe<local1338__Meta_>;
};


export type Querylocal1338_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Asset_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Asset_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_AssetBalance_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Router_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Router_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Setting_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Setting_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Relayer_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Relayer_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Sequencer_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Sequencer_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_StableSwap_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_StableSwap_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_OriginTransfer_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_DestinationTransfer_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_OriginMessage_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_DestinationMessage_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_AggregateRoot_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_ConnectorMeta_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_RootCount_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_RootCount_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_RootMessageSent_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338__metaArgs = {
  block?: InputMaybe<local1338_Block_height>;
};

export type local1338_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['local1338_Bytes']>;
};

export type local1338_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['local1338_Bytes']>;
  relayer_not?: InputMaybe<Scalars['local1338_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type local1338_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type local1338_RootCount_filter = {
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
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_RootCount_orderBy =
  | 'id'
  | 'count';

export type local1338_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['local1338_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['local1338_Bytes']>;
  transactionHash?: Maybe<Scalars['local1338_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type local1338_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['local1338_Bytes']>;
  root_not?: InputMaybe<Scalars['local1338_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  root_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_not?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_RootMessageSent_orderBy =
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

export type local1338_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['local1338_Bytes']>;
  recipient?: Maybe<Scalars['local1338_Bytes']>;
  proposedOwner?: Maybe<Scalars['local1338_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<local1338_AssetBalance>;
};


export type local1338_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_AssetBalance_filter>;
};

export type local1338_Router_filter = {
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
  owner?: InputMaybe<Scalars['local1338_Bytes']>;
  owner_not?: InputMaybe<Scalars['local1338_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  recipient?: InputMaybe<Scalars['local1338_Bytes']>;
  recipient_not?: InputMaybe<Scalars['local1338_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['local1338_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['local1338_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<local1338_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type local1338_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['local1338_Bytes']>;
};

export type local1338_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['local1338_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['local1338_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type local1338_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['local1338_Bytes'];
};

export type local1338_Setting_filter = {
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
  caller?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_not?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type local1338_StableSwap = {
  id: Scalars['ID'];
  canonicalId: Scalars['local1338_Bytes'];
  domain?: Maybe<Scalars['BigInt']>;
  swapPool: Scalars['local1338_Bytes'];
};

export type local1338_StableSwap_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  canonicalId?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['local1338_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['local1338_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_StableSwap_orderBy =
  | 'id'
  | 'canonicalId'
  | 'domain'
  | 'swapPool';

export type Subscription = {
  local1338_asset?: Maybe<local1338_Asset>;
  local1338_assets: Array<local1338_Asset>;
  local1338_assetBalance?: Maybe<local1338_AssetBalance>;
  local1338_assetBalances: Array<local1338_AssetBalance>;
  local1338_router?: Maybe<local1338_Router>;
  local1338_routers: Array<local1338_Router>;
  local1338_setting?: Maybe<local1338_Setting>;
  local1338_settings: Array<local1338_Setting>;
  local1338_relayer?: Maybe<local1338_Relayer>;
  local1338_relayers: Array<local1338_Relayer>;
  local1338_sequencer?: Maybe<local1338_Sequencer>;
  local1338_sequencers: Array<local1338_Sequencer>;
  local1338_stableSwap?: Maybe<local1338_StableSwap>;
  local1338_stableSwaps: Array<local1338_StableSwap>;
  local1338_originTransfer?: Maybe<local1338_OriginTransfer>;
  local1338_originTransfers: Array<local1338_OriginTransfer>;
  local1338_destinationTransfer?: Maybe<local1338_DestinationTransfer>;
  local1338_destinationTransfers: Array<local1338_DestinationTransfer>;
  local1338_originMessage?: Maybe<local1338_OriginMessage>;
  local1338_originMessages: Array<local1338_OriginMessage>;
  local1338_destinationMessage?: Maybe<local1338_DestinationMessage>;
  local1338_destinationMessages: Array<local1338_DestinationMessage>;
  local1338_aggregateRoot?: Maybe<local1338_AggregateRoot>;
  local1338_aggregateRoots: Array<local1338_AggregateRoot>;
  local1338_connectorMeta?: Maybe<local1338_ConnectorMeta>;
  local1338_connectorMetas: Array<local1338_ConnectorMeta>;
  local1338_rootCount?: Maybe<local1338_RootCount>;
  local1338_rootCounts: Array<local1338_RootCount>;
  local1338_rootMessageSent?: Maybe<local1338_RootMessageSent>;
  local1338_rootMessageSents: Array<local1338_RootMessageSent>;
  /** Access to subgraph metadata */
  local1338__meta?: Maybe<local1338__Meta_>;
};


export type Subscriptionlocal1338_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Asset_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Asset_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_AssetBalance_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Router_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Router_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Setting_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Setting_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Relayer_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Relayer_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Sequencer_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Sequencer_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_StableSwap_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_StableSwap_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_OriginTransfer_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_DestinationTransfer_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_OriginMessage_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_DestinationMessage_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_AggregateRoot_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_ConnectorMeta_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_RootCount_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_RootCount_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_RootMessageSent_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338__metaArgs = {
  block?: InputMaybe<local1338_Block_height>;
};

export type local1338_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type local1338__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['local1338_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type local1338__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: local1338__Block_;
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
  local1338_asset: InContextSdkMethod<Query['local1338_asset'], Querylocal1338_assetArgs, MeshContext>,
  /** null **/
  local1338_assets: InContextSdkMethod<Query['local1338_assets'], Querylocal1338_assetsArgs, MeshContext>,
  /** null **/
  local1338_assetBalance: InContextSdkMethod<Query['local1338_assetBalance'], Querylocal1338_assetBalanceArgs, MeshContext>,
  /** null **/
  local1338_assetBalances: InContextSdkMethod<Query['local1338_assetBalances'], Querylocal1338_assetBalancesArgs, MeshContext>,
  /** null **/
  local1338_router: InContextSdkMethod<Query['local1338_router'], Querylocal1338_routerArgs, MeshContext>,
  /** null **/
  local1338_routers: InContextSdkMethod<Query['local1338_routers'], Querylocal1338_routersArgs, MeshContext>,
  /** null **/
  local1338_setting: InContextSdkMethod<Query['local1338_setting'], Querylocal1338_settingArgs, MeshContext>,
  /** null **/
  local1338_settings: InContextSdkMethod<Query['local1338_settings'], Querylocal1338_settingsArgs, MeshContext>,
  /** null **/
  local1338_relayer: InContextSdkMethod<Query['local1338_relayer'], Querylocal1338_relayerArgs, MeshContext>,
  /** null **/
  local1338_relayers: InContextSdkMethod<Query['local1338_relayers'], Querylocal1338_relayersArgs, MeshContext>,
  /** null **/
  local1338_sequencer: InContextSdkMethod<Query['local1338_sequencer'], Querylocal1338_sequencerArgs, MeshContext>,
  /** null **/
  local1338_sequencers: InContextSdkMethod<Query['local1338_sequencers'], Querylocal1338_sequencersArgs, MeshContext>,
  /** null **/
  local1338_stableSwap: InContextSdkMethod<Query['local1338_stableSwap'], Querylocal1338_stableSwapArgs, MeshContext>,
  /** null **/
  local1338_stableSwaps: InContextSdkMethod<Query['local1338_stableSwaps'], Querylocal1338_stableSwapsArgs, MeshContext>,
  /** null **/
  local1338_originTransfer: InContextSdkMethod<Query['local1338_originTransfer'], Querylocal1338_originTransferArgs, MeshContext>,
  /** null **/
  local1338_originTransfers: InContextSdkMethod<Query['local1338_originTransfers'], Querylocal1338_originTransfersArgs, MeshContext>,
  /** null **/
  local1338_destinationTransfer: InContextSdkMethod<Query['local1338_destinationTransfer'], Querylocal1338_destinationTransferArgs, MeshContext>,
  /** null **/
  local1338_destinationTransfers: InContextSdkMethod<Query['local1338_destinationTransfers'], Querylocal1338_destinationTransfersArgs, MeshContext>,
  /** null **/
  local1338_originMessage: InContextSdkMethod<Query['local1338_originMessage'], Querylocal1338_originMessageArgs, MeshContext>,
  /** null **/
  local1338_originMessages: InContextSdkMethod<Query['local1338_originMessages'], Querylocal1338_originMessagesArgs, MeshContext>,
  /** null **/
  local1338_destinationMessage: InContextSdkMethod<Query['local1338_destinationMessage'], Querylocal1338_destinationMessageArgs, MeshContext>,
  /** null **/
  local1338_destinationMessages: InContextSdkMethod<Query['local1338_destinationMessages'], Querylocal1338_destinationMessagesArgs, MeshContext>,
  /** null **/
  local1338_aggregateRoot: InContextSdkMethod<Query['local1338_aggregateRoot'], Querylocal1338_aggregateRootArgs, MeshContext>,
  /** null **/
  local1338_aggregateRoots: InContextSdkMethod<Query['local1338_aggregateRoots'], Querylocal1338_aggregateRootsArgs, MeshContext>,
  /** null **/
  local1338_connectorMeta: InContextSdkMethod<Query['local1338_connectorMeta'], Querylocal1338_connectorMetaArgs, MeshContext>,
  /** null **/
  local1338_connectorMetas: InContextSdkMethod<Query['local1338_connectorMetas'], Querylocal1338_connectorMetasArgs, MeshContext>,
  /** null **/
  local1338_rootCount: InContextSdkMethod<Query['local1338_rootCount'], Querylocal1338_rootCountArgs, MeshContext>,
  /** null **/
  local1338_rootCounts: InContextSdkMethod<Query['local1338_rootCounts'], Querylocal1338_rootCountsArgs, MeshContext>,
  /** null **/
  local1338_rootMessageSent: InContextSdkMethod<Query['local1338_rootMessageSent'], Querylocal1338_rootMessageSentArgs, MeshContext>,
  /** null **/
  local1338_rootMessageSents: InContextSdkMethod<Query['local1338_rootMessageSents'], Querylocal1338_rootMessageSentsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  local1338__meta: InContextSdkMethod<Query['local1338__meta'], Querylocal1338__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  local1338_asset: InContextSdkMethod<Subscription['local1338_asset'], Subscriptionlocal1338_assetArgs, MeshContext>,
  /** null **/
  local1338_assets: InContextSdkMethod<Subscription['local1338_assets'], Subscriptionlocal1338_assetsArgs, MeshContext>,
  /** null **/
  local1338_assetBalance: InContextSdkMethod<Subscription['local1338_assetBalance'], Subscriptionlocal1338_assetBalanceArgs, MeshContext>,
  /** null **/
  local1338_assetBalances: InContextSdkMethod<Subscription['local1338_assetBalances'], Subscriptionlocal1338_assetBalancesArgs, MeshContext>,
  /** null **/
  local1338_router: InContextSdkMethod<Subscription['local1338_router'], Subscriptionlocal1338_routerArgs, MeshContext>,
  /** null **/
  local1338_routers: InContextSdkMethod<Subscription['local1338_routers'], Subscriptionlocal1338_routersArgs, MeshContext>,
  /** null **/
  local1338_setting: InContextSdkMethod<Subscription['local1338_setting'], Subscriptionlocal1338_settingArgs, MeshContext>,
  /** null **/
  local1338_settings: InContextSdkMethod<Subscription['local1338_settings'], Subscriptionlocal1338_settingsArgs, MeshContext>,
  /** null **/
  local1338_relayer: InContextSdkMethod<Subscription['local1338_relayer'], Subscriptionlocal1338_relayerArgs, MeshContext>,
  /** null **/
  local1338_relayers: InContextSdkMethod<Subscription['local1338_relayers'], Subscriptionlocal1338_relayersArgs, MeshContext>,
  /** null **/
  local1338_sequencer: InContextSdkMethod<Subscription['local1338_sequencer'], Subscriptionlocal1338_sequencerArgs, MeshContext>,
  /** null **/
  local1338_sequencers: InContextSdkMethod<Subscription['local1338_sequencers'], Subscriptionlocal1338_sequencersArgs, MeshContext>,
  /** null **/
  local1338_stableSwap: InContextSdkMethod<Subscription['local1338_stableSwap'], Subscriptionlocal1338_stableSwapArgs, MeshContext>,
  /** null **/
  local1338_stableSwaps: InContextSdkMethod<Subscription['local1338_stableSwaps'], Subscriptionlocal1338_stableSwapsArgs, MeshContext>,
  /** null **/
  local1338_originTransfer: InContextSdkMethod<Subscription['local1338_originTransfer'], Subscriptionlocal1338_originTransferArgs, MeshContext>,
  /** null **/
  local1338_originTransfers: InContextSdkMethod<Subscription['local1338_originTransfers'], Subscriptionlocal1338_originTransfersArgs, MeshContext>,
  /** null **/
  local1338_destinationTransfer: InContextSdkMethod<Subscription['local1338_destinationTransfer'], Subscriptionlocal1338_destinationTransferArgs, MeshContext>,
  /** null **/
  local1338_destinationTransfers: InContextSdkMethod<Subscription['local1338_destinationTransfers'], Subscriptionlocal1338_destinationTransfersArgs, MeshContext>,
  /** null **/
  local1338_originMessage: InContextSdkMethod<Subscription['local1338_originMessage'], Subscriptionlocal1338_originMessageArgs, MeshContext>,
  /** null **/
  local1338_originMessages: InContextSdkMethod<Subscription['local1338_originMessages'], Subscriptionlocal1338_originMessagesArgs, MeshContext>,
  /** null **/
  local1338_destinationMessage: InContextSdkMethod<Subscription['local1338_destinationMessage'], Subscriptionlocal1338_destinationMessageArgs, MeshContext>,
  /** null **/
  local1338_destinationMessages: InContextSdkMethod<Subscription['local1338_destinationMessages'], Subscriptionlocal1338_destinationMessagesArgs, MeshContext>,
  /** null **/
  local1338_aggregateRoot: InContextSdkMethod<Subscription['local1338_aggregateRoot'], Subscriptionlocal1338_aggregateRootArgs, MeshContext>,
  /** null **/
  local1338_aggregateRoots: InContextSdkMethod<Subscription['local1338_aggregateRoots'], Subscriptionlocal1338_aggregateRootsArgs, MeshContext>,
  /** null **/
  local1338_connectorMeta: InContextSdkMethod<Subscription['local1338_connectorMeta'], Subscriptionlocal1338_connectorMetaArgs, MeshContext>,
  /** null **/
  local1338_connectorMetas: InContextSdkMethod<Subscription['local1338_connectorMetas'], Subscriptionlocal1338_connectorMetasArgs, MeshContext>,
  /** null **/
  local1338_rootCount: InContextSdkMethod<Subscription['local1338_rootCount'], Subscriptionlocal1338_rootCountArgs, MeshContext>,
  /** null **/
  local1338_rootCounts: InContextSdkMethod<Subscription['local1338_rootCounts'], Subscriptionlocal1338_rootCountsArgs, MeshContext>,
  /** null **/
  local1338_rootMessageSent: InContextSdkMethod<Subscription['local1338_rootMessageSent'], Subscriptionlocal1338_rootMessageSentArgs, MeshContext>,
  /** null **/
  local1338_rootMessageSents: InContextSdkMethod<Subscription['local1338_rootMessageSents'], Subscriptionlocal1338_rootMessageSentsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  local1338__meta: InContextSdkMethod<Subscription['local1338__meta'], Subscriptionlocal1338__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Local1338"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
