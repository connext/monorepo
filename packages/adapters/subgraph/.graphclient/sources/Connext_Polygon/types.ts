// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextPolygonTypes {
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
  polygon_BigDecimal: any;
  BigInt: any;
  polygon_Bytes: any;
};

export type polygon_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['polygon_Bytes'];
};

export type polygon_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['polygon_Bytes']>;
  root_not?: InputMaybe<Scalars['polygon_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  root_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_AggregateRoot_orderBy =
  | 'id'
  | 'root';

export type polygon_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['polygon_Bytes']>;
  canonicalId?: Maybe<Scalars['polygon_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['polygon_Bytes']>;
  localAsset?: Maybe<Scalars['polygon_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type polygon_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: polygon_Router;
  asset: polygon_Asset;
};

export type polygon_AssetBalance_filter = {
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
  router_?: InputMaybe<polygon_Router_filter>;
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
  asset_?: InputMaybe<polygon_Asset_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type polygon_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['polygon_Bytes']>;
  key_not?: InputMaybe<Scalars['polygon_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  key_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['polygon_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['polygon_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  localAsset?: InputMaybe<Scalars['polygon_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['polygon_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_Asset_orderBy =
  | 'id'
  | 'key'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber';

export type polygon_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type polygon_Block_height = {
  hash?: InputMaybe<Scalars['polygon_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type polygon_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['polygon_Bytes']>;
  rootManager?: Maybe<Scalars['polygon_Bytes']>;
  mirrorConnector?: Maybe<Scalars['polygon_Bytes']>;
};

export type polygon_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['polygon_Bytes']>;
  amb_not?: InputMaybe<Scalars['polygon_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  rootManager?: InputMaybe<Scalars['polygon_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['polygon_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['polygon_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['polygon_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type polygon_DestinationMessage = {
  id: Scalars['ID'];
  leaf?: Maybe<Scalars['polygon_Bytes']>;
  processed?: Maybe<Scalars['Boolean']>;
  returnData?: Maybe<Scalars['polygon_Bytes']>;
  success?: Maybe<Scalars['Boolean']>;
  transactionHash?: Maybe<Scalars['polygon_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type polygon_DestinationMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  leaf?: InputMaybe<Scalars['polygon_Bytes']>;
  leaf_not?: InputMaybe<Scalars['polygon_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  processed?: InputMaybe<Scalars['Boolean']>;
  processed_not?: InputMaybe<Scalars['Boolean']>;
  processed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  processed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  returnData?: InputMaybe<Scalars['polygon_Bytes']>;
  returnData_not?: InputMaybe<Scalars['polygon_Bytes']>;
  returnData_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  returnData_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  returnData_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  returnData_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  success?: InputMaybe<Scalars['Boolean']>;
  success_not?: InputMaybe<Scalars['Boolean']>;
  success_in?: InputMaybe<Array<Scalars['Boolean']>>;
  success_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  transactionHash?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_DestinationMessage_orderBy =
  | 'id'
  | 'leaf'
  | 'processed'
  | 'returnData'
  | 'success'
  | 'transactionHash'
  | 'blockNumber';

export type polygon_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['polygon_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<polygon_TransferStatus>;
  routers?: Maybe<Array<polygon_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['polygon_Bytes']>;
  delegate?: Maybe<Scalars['polygon_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['polygon_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['polygon_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['polygon_Bytes']>;
  asset?: Maybe<polygon_Asset>;
  executedCaller?: Maybe<Scalars['polygon_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['polygon_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['polygon_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['polygon_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type polygon_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_Router_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_Router_filter>;
};

export type polygon_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_not?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<polygon_TransferStatus>;
  status_not?: InputMaybe<polygon_TransferStatus>;
  status_in?: InputMaybe<Array<polygon_TransferStatus>>;
  status_not_in?: InputMaybe<Array<polygon_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<polygon_Router_filter>;
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
  to?: InputMaybe<Scalars['polygon_Bytes']>;
  to_not?: InputMaybe<Scalars['polygon_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  to_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate_not?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['polygon_Bytes']>;
  callData_not?: InputMaybe<Scalars['polygon_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['polygon_Bytes']>;
  originSender_not?: InputMaybe<Scalars['polygon_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  asset_?: InputMaybe<polygon_Asset_filter>;
  executedCaller?: InputMaybe<Scalars['polygon_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['polygon_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['polygon_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['polygon_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  reconciledCaller?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_DestinationTransfer_orderBy =
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
export type polygon_OrderDirection =
  | 'asc'
  | 'desc';

export type polygon_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['polygon_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['polygon_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['polygon_Bytes']>;
  message?: Maybe<Scalars['polygon_Bytes']>;
  transactionHash?: Maybe<Scalars['polygon_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<polygon_RootCount>;
};

export type polygon_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_not?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['polygon_Bytes']>;
  leaf_not?: InputMaybe<Scalars['polygon_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  root?: InputMaybe<Scalars['polygon_Bytes']>;
  root_not?: InputMaybe<Scalars['polygon_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  root_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  message?: InputMaybe<Scalars['polygon_Bytes']>;
  message_not?: InputMaybe<Scalars['polygon_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  message_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  rootCount_?: InputMaybe<polygon_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_OriginMessage_orderBy =
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

export type polygon_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['polygon_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<polygon_TransferStatus>;
  messageHash?: Maybe<Scalars['polygon_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['polygon_Bytes']>;
  delegate?: Maybe<Scalars['polygon_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['polygon_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['polygon_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['polygon_Bytes']>;
  asset?: Maybe<polygon_Asset>;
  message?: Maybe<polygon_OriginMessage>;
  caller?: Maybe<Scalars['polygon_Bytes']>;
  transactionHash?: Maybe<Scalars['polygon_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type polygon_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_not?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<polygon_TransferStatus>;
  status_not?: InputMaybe<polygon_TransferStatus>;
  status_in?: InputMaybe<Array<polygon_TransferStatus>>;
  status_not_in?: InputMaybe<Array<polygon_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['polygon_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['polygon_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  to?: InputMaybe<Scalars['polygon_Bytes']>;
  to_not?: InputMaybe<Scalars['polygon_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  to_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate_not?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['polygon_Bytes']>;
  callData_not?: InputMaybe<Scalars['polygon_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['polygon_Bytes']>;
  originSender_not?: InputMaybe<Scalars['polygon_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  asset_?: InputMaybe<polygon_Asset_filter>;
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
  message_?: InputMaybe<polygon_OriginMessage_filter>;
  caller?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_not?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_OriginTransfer_orderBy =
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

export type polygon_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['polygon_Bytes'];
};

export type polygon_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_not?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  polygon_asset?: Maybe<polygon_Asset>;
  polygon_assets: Array<polygon_Asset>;
  polygon_assetBalance?: Maybe<polygon_AssetBalance>;
  polygon_assetBalances: Array<polygon_AssetBalance>;
  polygon_router?: Maybe<polygon_Router>;
  polygon_routers: Array<polygon_Router>;
  polygon_setting?: Maybe<polygon_Setting>;
  polygon_settings: Array<polygon_Setting>;
  polygon_relayer?: Maybe<polygon_Relayer>;
  polygon_relayers: Array<polygon_Relayer>;
  polygon_sequencer?: Maybe<polygon_Sequencer>;
  polygon_sequencers: Array<polygon_Sequencer>;
  polygon_originTransfer?: Maybe<polygon_OriginTransfer>;
  polygon_originTransfers: Array<polygon_OriginTransfer>;
  polygon_destinationTransfer?: Maybe<polygon_DestinationTransfer>;
  polygon_destinationTransfers: Array<polygon_DestinationTransfer>;
  polygon_originMessage?: Maybe<polygon_OriginMessage>;
  polygon_originMessages: Array<polygon_OriginMessage>;
  polygon_destinationMessage?: Maybe<polygon_DestinationMessage>;
  polygon_destinationMessages: Array<polygon_DestinationMessage>;
  polygon_aggregateRoot?: Maybe<polygon_AggregateRoot>;
  polygon_aggregateRoots: Array<polygon_AggregateRoot>;
  polygon_connectorMeta?: Maybe<polygon_ConnectorMeta>;
  polygon_connectorMetas: Array<polygon_ConnectorMeta>;
  polygon_rootCount?: Maybe<polygon_RootCount>;
  polygon_rootCounts: Array<polygon_RootCount>;
  polygon_rootMessageSent?: Maybe<polygon_RootMessageSent>;
  polygon_rootMessageSents: Array<polygon_RootMessageSent>;
  polygon_stableSwap?: Maybe<polygon_StableSwap>;
  polygon_stableSwaps: Array<polygon_StableSwap>;
  polygon_pooledToken?: Maybe<polygon_PooledToken>;
  polygon_pooledTokens: Array<polygon_PooledToken>;
  polygon_stableSwapLiquidity?: Maybe<polygon_StableSwapLiquidity>;
  polygon_stableSwapLiquidities: Array<polygon_StableSwapLiquidity>;
  /** Access to subgraph metadata */
  polygon__meta?: Maybe<polygon__Meta_>;
};


export type Querypolygon_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_Asset_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_Asset_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_AssetBalance_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_Router_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_Router_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_Setting_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_Setting_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_Relayer_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_Relayer_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_Sequencer_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_Sequencer_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_OriginTransfer_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_DestinationTransfer_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_OriginMessage_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_DestinationMessage_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_AggregateRoot_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_ConnectorMeta_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_RootCount_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_RootCount_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_RootMessageSent_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_StableSwap_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_StableSwap_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_PooledToken_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_PooledToken_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_stableSwapLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_stableSwapLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_StableSwapLiquidity_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_StableSwapLiquidity_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon__metaArgs = {
  block?: InputMaybe<polygon_Block_height>;
};

export type polygon_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['polygon_Bytes']>;
};

export type polygon_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['polygon_Bytes']>;
  relayer_not?: InputMaybe<Scalars['polygon_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type polygon_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type polygon_RootCount_filter = {
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
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_RootCount_orderBy =
  | 'id'
  | 'count';

export type polygon_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['polygon_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['polygon_Bytes']>;
  transactionHash?: Maybe<Scalars['polygon_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type polygon_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['polygon_Bytes']>;
  root_not?: InputMaybe<Scalars['polygon_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  root_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_not?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_RootMessageSent_orderBy =
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

export type polygon_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['polygon_Bytes']>;
  recipient?: Maybe<Scalars['polygon_Bytes']>;
  proposedOwner?: Maybe<Scalars['polygon_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<polygon_AssetBalance>;
};


export type polygon_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_AssetBalance_filter>;
};

export type polygon_Router_filter = {
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
  owner?: InputMaybe<Scalars['polygon_Bytes']>;
  owner_not?: InputMaybe<Scalars['polygon_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  recipient?: InputMaybe<Scalars['polygon_Bytes']>;
  recipient_not?: InputMaybe<Scalars['polygon_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['polygon_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['polygon_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<polygon_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type polygon_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['polygon_Bytes']>;
};

export type polygon_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['polygon_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['polygon_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type polygon_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['polygon_Bytes'];
};

export type polygon_Setting_filter = {
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
  caller?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_not?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type polygon_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['polygon_Bytes']>;
  canonicalId?: Maybe<Scalars['polygon_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['polygon_Bytes']>;
  lpToken?: Maybe<Scalars['polygon_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<polygon_PooledToken>;
  tokenPrecisionMultipliers?: Maybe<Array<Scalars['BigInt']>>;
  balances: Array<Scalars['BigInt']>;
  adminFees?: Maybe<Array<Scalars['BigInt']>>;
};


export type polygon_StableSwappooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_PooledToken_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_PooledToken_filter>;
};

export type polygon_StableSwapLiquidity = {
  id: Scalars['ID'];
  provider: Scalars['polygon_Bytes'];
  stableSwap: polygon_StableSwap;
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply?: Maybe<Scalars['BigInt']>;
};

export type polygon_StableSwapLiquidity_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  provider?: InputMaybe<Scalars['polygon_Bytes']>;
  provider_not?: InputMaybe<Scalars['polygon_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  stableSwap_?: InputMaybe<polygon_StableSwap_filter>;
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
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_StableSwapLiquidity_orderBy =
  | 'id'
  | 'provider'
  | 'stableSwap'
  | 'tokenAmounts'
  | 'fees'
  | 'invariant'
  | 'lpTokenSupply';

export type polygon_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['polygon_Bytes']>;
  key_not?: InputMaybe<Scalars['polygon_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  key_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['polygon_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['polygon_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  lpToken?: InputMaybe<Scalars['polygon_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['polygon_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  pooledTokens_?: InputMaybe<polygon_PooledToken_filter>;
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
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_StableSwap_orderBy =
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
  polygon_asset?: Maybe<polygon_Asset>;
  polygon_assets: Array<polygon_Asset>;
  polygon_assetBalance?: Maybe<polygon_AssetBalance>;
  polygon_assetBalances: Array<polygon_AssetBalance>;
  polygon_router?: Maybe<polygon_Router>;
  polygon_routers: Array<polygon_Router>;
  polygon_setting?: Maybe<polygon_Setting>;
  polygon_settings: Array<polygon_Setting>;
  polygon_relayer?: Maybe<polygon_Relayer>;
  polygon_relayers: Array<polygon_Relayer>;
  polygon_sequencer?: Maybe<polygon_Sequencer>;
  polygon_sequencers: Array<polygon_Sequencer>;
  polygon_originTransfer?: Maybe<polygon_OriginTransfer>;
  polygon_originTransfers: Array<polygon_OriginTransfer>;
  polygon_destinationTransfer?: Maybe<polygon_DestinationTransfer>;
  polygon_destinationTransfers: Array<polygon_DestinationTransfer>;
  polygon_originMessage?: Maybe<polygon_OriginMessage>;
  polygon_originMessages: Array<polygon_OriginMessage>;
  polygon_destinationMessage?: Maybe<polygon_DestinationMessage>;
  polygon_destinationMessages: Array<polygon_DestinationMessage>;
  polygon_aggregateRoot?: Maybe<polygon_AggregateRoot>;
  polygon_aggregateRoots: Array<polygon_AggregateRoot>;
  polygon_connectorMeta?: Maybe<polygon_ConnectorMeta>;
  polygon_connectorMetas: Array<polygon_ConnectorMeta>;
  polygon_rootCount?: Maybe<polygon_RootCount>;
  polygon_rootCounts: Array<polygon_RootCount>;
  polygon_rootMessageSent?: Maybe<polygon_RootMessageSent>;
  polygon_rootMessageSents: Array<polygon_RootMessageSent>;
  polygon_stableSwap?: Maybe<polygon_StableSwap>;
  polygon_stableSwaps: Array<polygon_StableSwap>;
  polygon_pooledToken?: Maybe<polygon_PooledToken>;
  polygon_pooledTokens: Array<polygon_PooledToken>;
  polygon_stableSwapLiquidity?: Maybe<polygon_StableSwapLiquidity>;
  polygon_stableSwapLiquidities: Array<polygon_StableSwapLiquidity>;
  /** Access to subgraph metadata */
  polygon__meta?: Maybe<polygon__Meta_>;
};


export type Subscriptionpolygon_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_Asset_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_Asset_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_AssetBalance_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_Router_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_Router_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_Setting_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_Setting_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_Relayer_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_Relayer_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_Sequencer_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_Sequencer_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_OriginTransfer_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_DestinationTransfer_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_OriginMessage_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_DestinationMessage_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_AggregateRoot_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_ConnectorMeta_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_RootCount_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_RootCount_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_RootMessageSent_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_StableSwap_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_StableSwap_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_PooledToken_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_PooledToken_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_stableSwapLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_stableSwapLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_StableSwapLiquidity_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_StableSwapLiquidity_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon__metaArgs = {
  block?: InputMaybe<polygon_Block_height>;
};

export type polygon_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type polygon__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['polygon_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type polygon__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: polygon__Block_;
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
  polygon_asset: InContextSdkMethod<Query['polygon_asset'], Querypolygon_assetArgs, MeshContext>,
  /** null **/
  polygon_assets: InContextSdkMethod<Query['polygon_assets'], Querypolygon_assetsArgs, MeshContext>,
  /** null **/
  polygon_assetBalance: InContextSdkMethod<Query['polygon_assetBalance'], Querypolygon_assetBalanceArgs, MeshContext>,
  /** null **/
  polygon_assetBalances: InContextSdkMethod<Query['polygon_assetBalances'], Querypolygon_assetBalancesArgs, MeshContext>,
  /** null **/
  polygon_router: InContextSdkMethod<Query['polygon_router'], Querypolygon_routerArgs, MeshContext>,
  /** null **/
  polygon_routers: InContextSdkMethod<Query['polygon_routers'], Querypolygon_routersArgs, MeshContext>,
  /** null **/
  polygon_setting: InContextSdkMethod<Query['polygon_setting'], Querypolygon_settingArgs, MeshContext>,
  /** null **/
  polygon_settings: InContextSdkMethod<Query['polygon_settings'], Querypolygon_settingsArgs, MeshContext>,
  /** null **/
  polygon_relayer: InContextSdkMethod<Query['polygon_relayer'], Querypolygon_relayerArgs, MeshContext>,
  /** null **/
  polygon_relayers: InContextSdkMethod<Query['polygon_relayers'], Querypolygon_relayersArgs, MeshContext>,
  /** null **/
  polygon_sequencer: InContextSdkMethod<Query['polygon_sequencer'], Querypolygon_sequencerArgs, MeshContext>,
  /** null **/
  polygon_sequencers: InContextSdkMethod<Query['polygon_sequencers'], Querypolygon_sequencersArgs, MeshContext>,
  /** null **/
  polygon_originTransfer: InContextSdkMethod<Query['polygon_originTransfer'], Querypolygon_originTransferArgs, MeshContext>,
  /** null **/
  polygon_originTransfers: InContextSdkMethod<Query['polygon_originTransfers'], Querypolygon_originTransfersArgs, MeshContext>,
  /** null **/
  polygon_destinationTransfer: InContextSdkMethod<Query['polygon_destinationTransfer'], Querypolygon_destinationTransferArgs, MeshContext>,
  /** null **/
  polygon_destinationTransfers: InContextSdkMethod<Query['polygon_destinationTransfers'], Querypolygon_destinationTransfersArgs, MeshContext>,
  /** null **/
  polygon_originMessage: InContextSdkMethod<Query['polygon_originMessage'], Querypolygon_originMessageArgs, MeshContext>,
  /** null **/
  polygon_originMessages: InContextSdkMethod<Query['polygon_originMessages'], Querypolygon_originMessagesArgs, MeshContext>,
  /** null **/
  polygon_destinationMessage: InContextSdkMethod<Query['polygon_destinationMessage'], Querypolygon_destinationMessageArgs, MeshContext>,
  /** null **/
  polygon_destinationMessages: InContextSdkMethod<Query['polygon_destinationMessages'], Querypolygon_destinationMessagesArgs, MeshContext>,
  /** null **/
  polygon_aggregateRoot: InContextSdkMethod<Query['polygon_aggregateRoot'], Querypolygon_aggregateRootArgs, MeshContext>,
  /** null **/
  polygon_aggregateRoots: InContextSdkMethod<Query['polygon_aggregateRoots'], Querypolygon_aggregateRootsArgs, MeshContext>,
  /** null **/
  polygon_connectorMeta: InContextSdkMethod<Query['polygon_connectorMeta'], Querypolygon_connectorMetaArgs, MeshContext>,
  /** null **/
  polygon_connectorMetas: InContextSdkMethod<Query['polygon_connectorMetas'], Querypolygon_connectorMetasArgs, MeshContext>,
  /** null **/
  polygon_rootCount: InContextSdkMethod<Query['polygon_rootCount'], Querypolygon_rootCountArgs, MeshContext>,
  /** null **/
  polygon_rootCounts: InContextSdkMethod<Query['polygon_rootCounts'], Querypolygon_rootCountsArgs, MeshContext>,
  /** null **/
  polygon_rootMessageSent: InContextSdkMethod<Query['polygon_rootMessageSent'], Querypolygon_rootMessageSentArgs, MeshContext>,
  /** null **/
  polygon_rootMessageSents: InContextSdkMethod<Query['polygon_rootMessageSents'], Querypolygon_rootMessageSentsArgs, MeshContext>,
  /** null **/
  polygon_stableSwap: InContextSdkMethod<Query['polygon_stableSwap'], Querypolygon_stableSwapArgs, MeshContext>,
  /** null **/
  polygon_stableSwaps: InContextSdkMethod<Query['polygon_stableSwaps'], Querypolygon_stableSwapsArgs, MeshContext>,
  /** null **/
  polygon_pooledToken: InContextSdkMethod<Query['polygon_pooledToken'], Querypolygon_pooledTokenArgs, MeshContext>,
  /** null **/
  polygon_pooledTokens: InContextSdkMethod<Query['polygon_pooledTokens'], Querypolygon_pooledTokensArgs, MeshContext>,
  /** null **/
  polygon_stableSwapLiquidity: InContextSdkMethod<Query['polygon_stableSwapLiquidity'], Querypolygon_stableSwapLiquidityArgs, MeshContext>,
  /** null **/
  polygon_stableSwapLiquidities: InContextSdkMethod<Query['polygon_stableSwapLiquidities'], Querypolygon_stableSwapLiquiditiesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  polygon__meta: InContextSdkMethod<Query['polygon__meta'], Querypolygon__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  polygon_asset: InContextSdkMethod<Subscription['polygon_asset'], Subscriptionpolygon_assetArgs, MeshContext>,
  /** null **/
  polygon_assets: InContextSdkMethod<Subscription['polygon_assets'], Subscriptionpolygon_assetsArgs, MeshContext>,
  /** null **/
  polygon_assetBalance: InContextSdkMethod<Subscription['polygon_assetBalance'], Subscriptionpolygon_assetBalanceArgs, MeshContext>,
  /** null **/
  polygon_assetBalances: InContextSdkMethod<Subscription['polygon_assetBalances'], Subscriptionpolygon_assetBalancesArgs, MeshContext>,
  /** null **/
  polygon_router: InContextSdkMethod<Subscription['polygon_router'], Subscriptionpolygon_routerArgs, MeshContext>,
  /** null **/
  polygon_routers: InContextSdkMethod<Subscription['polygon_routers'], Subscriptionpolygon_routersArgs, MeshContext>,
  /** null **/
  polygon_setting: InContextSdkMethod<Subscription['polygon_setting'], Subscriptionpolygon_settingArgs, MeshContext>,
  /** null **/
  polygon_settings: InContextSdkMethod<Subscription['polygon_settings'], Subscriptionpolygon_settingsArgs, MeshContext>,
  /** null **/
  polygon_relayer: InContextSdkMethod<Subscription['polygon_relayer'], Subscriptionpolygon_relayerArgs, MeshContext>,
  /** null **/
  polygon_relayers: InContextSdkMethod<Subscription['polygon_relayers'], Subscriptionpolygon_relayersArgs, MeshContext>,
  /** null **/
  polygon_sequencer: InContextSdkMethod<Subscription['polygon_sequencer'], Subscriptionpolygon_sequencerArgs, MeshContext>,
  /** null **/
  polygon_sequencers: InContextSdkMethod<Subscription['polygon_sequencers'], Subscriptionpolygon_sequencersArgs, MeshContext>,
  /** null **/
  polygon_originTransfer: InContextSdkMethod<Subscription['polygon_originTransfer'], Subscriptionpolygon_originTransferArgs, MeshContext>,
  /** null **/
  polygon_originTransfers: InContextSdkMethod<Subscription['polygon_originTransfers'], Subscriptionpolygon_originTransfersArgs, MeshContext>,
  /** null **/
  polygon_destinationTransfer: InContextSdkMethod<Subscription['polygon_destinationTransfer'], Subscriptionpolygon_destinationTransferArgs, MeshContext>,
  /** null **/
  polygon_destinationTransfers: InContextSdkMethod<Subscription['polygon_destinationTransfers'], Subscriptionpolygon_destinationTransfersArgs, MeshContext>,
  /** null **/
  polygon_originMessage: InContextSdkMethod<Subscription['polygon_originMessage'], Subscriptionpolygon_originMessageArgs, MeshContext>,
  /** null **/
  polygon_originMessages: InContextSdkMethod<Subscription['polygon_originMessages'], Subscriptionpolygon_originMessagesArgs, MeshContext>,
  /** null **/
  polygon_destinationMessage: InContextSdkMethod<Subscription['polygon_destinationMessage'], Subscriptionpolygon_destinationMessageArgs, MeshContext>,
  /** null **/
  polygon_destinationMessages: InContextSdkMethod<Subscription['polygon_destinationMessages'], Subscriptionpolygon_destinationMessagesArgs, MeshContext>,
  /** null **/
  polygon_aggregateRoot: InContextSdkMethod<Subscription['polygon_aggregateRoot'], Subscriptionpolygon_aggregateRootArgs, MeshContext>,
  /** null **/
  polygon_aggregateRoots: InContextSdkMethod<Subscription['polygon_aggregateRoots'], Subscriptionpolygon_aggregateRootsArgs, MeshContext>,
  /** null **/
  polygon_connectorMeta: InContextSdkMethod<Subscription['polygon_connectorMeta'], Subscriptionpolygon_connectorMetaArgs, MeshContext>,
  /** null **/
  polygon_connectorMetas: InContextSdkMethod<Subscription['polygon_connectorMetas'], Subscriptionpolygon_connectorMetasArgs, MeshContext>,
  /** null **/
  polygon_rootCount: InContextSdkMethod<Subscription['polygon_rootCount'], Subscriptionpolygon_rootCountArgs, MeshContext>,
  /** null **/
  polygon_rootCounts: InContextSdkMethod<Subscription['polygon_rootCounts'], Subscriptionpolygon_rootCountsArgs, MeshContext>,
  /** null **/
  polygon_rootMessageSent: InContextSdkMethod<Subscription['polygon_rootMessageSent'], Subscriptionpolygon_rootMessageSentArgs, MeshContext>,
  /** null **/
  polygon_rootMessageSents: InContextSdkMethod<Subscription['polygon_rootMessageSents'], Subscriptionpolygon_rootMessageSentsArgs, MeshContext>,
  /** null **/
  polygon_stableSwap: InContextSdkMethod<Subscription['polygon_stableSwap'], Subscriptionpolygon_stableSwapArgs, MeshContext>,
  /** null **/
  polygon_stableSwaps: InContextSdkMethod<Subscription['polygon_stableSwaps'], Subscriptionpolygon_stableSwapsArgs, MeshContext>,
  /** null **/
  polygon_pooledToken: InContextSdkMethod<Subscription['polygon_pooledToken'], Subscriptionpolygon_pooledTokenArgs, MeshContext>,
  /** null **/
  polygon_pooledTokens: InContextSdkMethod<Subscription['polygon_pooledTokens'], Subscriptionpolygon_pooledTokensArgs, MeshContext>,
  /** null **/
  polygon_stableSwapLiquidity: InContextSdkMethod<Subscription['polygon_stableSwapLiquidity'], Subscriptionpolygon_stableSwapLiquidityArgs, MeshContext>,
  /** null **/
  polygon_stableSwapLiquidities: InContextSdkMethod<Subscription['polygon_stableSwapLiquidities'], Subscriptionpolygon_stableSwapLiquiditiesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  polygon__meta: InContextSdkMethod<Subscription['polygon__meta'], Subscriptionpolygon__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Polygon"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
