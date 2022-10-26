// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextStagingMumbaiTypes {
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
  stagingmumbai_BigDecimal: any;
  BigInt: any;
  stagingmumbai_Bytes: any;
};

export type stagingmumbai_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['stagingmumbai_Bytes'];
};

export type stagingmumbai_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_AggregateRoot_orderBy =
  | 'id'
  | 'root';

export type stagingmumbai_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['stagingmumbai_Bytes']>;
  canonicalId?: Maybe<Scalars['stagingmumbai_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['stagingmumbai_Bytes']>;
  localAsset?: Maybe<Scalars['stagingmumbai_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingmumbai_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: stagingmumbai_Router;
  asset: stagingmumbai_Asset;
};

export type stagingmumbai_AssetBalance_filter = {
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
  router_?: InputMaybe<stagingmumbai_Router_filter>;
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
  asset_?: InputMaybe<stagingmumbai_Asset_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type stagingmumbai_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  key_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  key_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  canonicalId?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  localAsset?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_Asset_orderBy =
  | 'id'
  | 'key'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber';

export type stagingmumbai_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingmumbai_Block_height = {
  hash?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type stagingmumbai_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['stagingmumbai_Bytes']>;
  rootManager?: Maybe<Scalars['stagingmumbai_Bytes']>;
  mirrorConnector?: Maybe<Scalars['stagingmumbai_Bytes']>;
};

export type stagingmumbai_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingmumbai_DestinationMessage = {
  id: Scalars['ID'];
  leaf?: Maybe<Scalars['stagingmumbai_Bytes']>;
  processed?: Maybe<Scalars['Boolean']>;
  returnData?: Maybe<Scalars['stagingmumbai_Bytes']>;
  success?: Maybe<Scalars['Boolean']>;
  transactionHash?: Maybe<Scalars['stagingmumbai_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingmumbai_DestinationMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  leaf?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  leaf_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  processed?: InputMaybe<Scalars['Boolean']>;
  processed_not?: InputMaybe<Scalars['Boolean']>;
  processed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  processed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  returnData?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  returnData_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  returnData_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  returnData_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  returnData_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  returnData_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  success?: InputMaybe<Scalars['Boolean']>;
  success_not?: InputMaybe<Scalars['Boolean']>;
  success_in?: InputMaybe<Array<Scalars['Boolean']>>;
  success_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  transactionHash?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_DestinationMessage_orderBy =
  | 'id'
  | 'leaf'
  | 'processed'
  | 'returnData'
  | 'success'
  | 'transactionHash'
  | 'blockNumber';

export type stagingmumbai_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingmumbai_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingmumbai_TransferStatus>;
  routers?: Maybe<Array<stagingmumbai_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingmumbai_Bytes']>;
  delegate?: Maybe<Scalars['stagingmumbai_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingmumbai_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingmumbai_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingmumbai_Bytes']>;
  asset?: Maybe<stagingmumbai_Asset>;
  executedCaller?: Maybe<Scalars['stagingmumbai_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['stagingmumbai_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['stagingmumbai_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['stagingmumbai_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type stagingmumbai_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_Router_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_Router_filter>;
};

export type stagingmumbai_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingmumbai_TransferStatus>;
  status_not?: InputMaybe<stagingmumbai_TransferStatus>;
  status_in?: InputMaybe<Array<stagingmumbai_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingmumbai_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<stagingmumbai_Router_filter>;
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
  to?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
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
  asset_?: InputMaybe<stagingmumbai_Asset_filter>;
  executedCaller?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
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
  reconciledCaller?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
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
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_DestinationTransfer_orderBy =
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
export type stagingmumbai_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingmumbai_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['stagingmumbai_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['stagingmumbai_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['stagingmumbai_Bytes']>;
  message?: Maybe<Scalars['stagingmumbai_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingmumbai_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<stagingmumbai_RootCount>;
};

export type stagingmumbai_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  leaf_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  root?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  message?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  message_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  message_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
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
  rootCount_?: InputMaybe<stagingmumbai_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_OriginMessage_orderBy =
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

export type stagingmumbai_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingmumbai_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingmumbai_TransferStatus>;
  messageHash?: Maybe<Scalars['stagingmumbai_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingmumbai_Bytes']>;
  delegate?: Maybe<Scalars['stagingmumbai_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingmumbai_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingmumbai_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingmumbai_Bytes']>;
  asset?: Maybe<stagingmumbai_Asset>;
  message?: Maybe<stagingmumbai_OriginMessage>;
  caller?: Maybe<Scalars['stagingmumbai_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingmumbai_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingmumbai_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingmumbai_TransferStatus>;
  status_not?: InputMaybe<stagingmumbai_TransferStatus>;
  status_in?: InputMaybe<Array<stagingmumbai_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingmumbai_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
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
  to?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
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
  asset_?: InputMaybe<stagingmumbai_Asset_filter>;
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
  message_?: InputMaybe<stagingmumbai_OriginMessage_filter>;
  caller?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
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
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_OriginTransfer_orderBy =
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
  stagingmumbai_asset?: Maybe<stagingmumbai_Asset>;
  stagingmumbai_assets: Array<stagingmumbai_Asset>;
  stagingmumbai_assetBalance?: Maybe<stagingmumbai_AssetBalance>;
  stagingmumbai_assetBalances: Array<stagingmumbai_AssetBalance>;
  stagingmumbai_router?: Maybe<stagingmumbai_Router>;
  stagingmumbai_routers: Array<stagingmumbai_Router>;
  stagingmumbai_setting?: Maybe<stagingmumbai_Setting>;
  stagingmumbai_settings: Array<stagingmumbai_Setting>;
  stagingmumbai_relayer?: Maybe<stagingmumbai_Relayer>;
  stagingmumbai_relayers: Array<stagingmumbai_Relayer>;
  stagingmumbai_sequencer?: Maybe<stagingmumbai_Sequencer>;
  stagingmumbai_sequencers: Array<stagingmumbai_Sequencer>;
  stagingmumbai_stableSwap?: Maybe<stagingmumbai_StableSwap>;
  stagingmumbai_stableSwaps: Array<stagingmumbai_StableSwap>;
  stagingmumbai_originTransfer?: Maybe<stagingmumbai_OriginTransfer>;
  stagingmumbai_originTransfers: Array<stagingmumbai_OriginTransfer>;
  stagingmumbai_destinationTransfer?: Maybe<stagingmumbai_DestinationTransfer>;
  stagingmumbai_destinationTransfers: Array<stagingmumbai_DestinationTransfer>;
  stagingmumbai_originMessage?: Maybe<stagingmumbai_OriginMessage>;
  stagingmumbai_originMessages: Array<stagingmumbai_OriginMessage>;
  stagingmumbai_destinationMessage?: Maybe<stagingmumbai_DestinationMessage>;
  stagingmumbai_destinationMessages: Array<stagingmumbai_DestinationMessage>;
  stagingmumbai_aggregateRoot?: Maybe<stagingmumbai_AggregateRoot>;
  stagingmumbai_aggregateRoots: Array<stagingmumbai_AggregateRoot>;
  stagingmumbai_connectorMeta?: Maybe<stagingmumbai_ConnectorMeta>;
  stagingmumbai_connectorMetas: Array<stagingmumbai_ConnectorMeta>;
  stagingmumbai_rootCount?: Maybe<stagingmumbai_RootCount>;
  stagingmumbai_rootCounts: Array<stagingmumbai_RootCount>;
  stagingmumbai_rootMessageSent?: Maybe<stagingmumbai_RootMessageSent>;
  stagingmumbai_rootMessageSents: Array<stagingmumbai_RootMessageSent>;
  /** Access to subgraph metadata */
  stagingmumbai__meta?: Maybe<stagingmumbai__Meta_>;
};


export type Querystagingmumbai_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_Asset_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_AssetBalance_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_Router_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_Router_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_Setting_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_Relayer_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_Sequencer_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_StableSwap_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_StableSwap_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_OriginTransfer_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_DestinationTransfer_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_OriginMessage_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_DestinationMessage_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_AggregateRoot_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_ConnectorMeta_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_RootCount_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_RootMessageSent_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai__metaArgs = {
  block?: InputMaybe<stagingmumbai_Block_height>;
};

export type stagingmumbai_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['stagingmumbai_Bytes']>;
};

export type stagingmumbai_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  relayer_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type stagingmumbai_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type stagingmumbai_RootCount_filter = {
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
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_RootCount_orderBy =
  | 'id'
  | 'count';

export type stagingmumbai_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['stagingmumbai_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['stagingmumbai_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingmumbai_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingmumbai_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
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
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_RootMessageSent_orderBy =
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

export type stagingmumbai_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['stagingmumbai_Bytes']>;
  recipient?: Maybe<Scalars['stagingmumbai_Bytes']>;
  proposedOwner?: Maybe<Scalars['stagingmumbai_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<stagingmumbai_AssetBalance>;
};


export type stagingmumbai_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_AssetBalance_filter>;
};

export type stagingmumbai_Router_filter = {
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
  owner?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  owner_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  recipient?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  recipient_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<stagingmumbai_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type stagingmumbai_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['stagingmumbai_Bytes']>;
};

export type stagingmumbai_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type stagingmumbai_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['stagingmumbai_Bytes'];
};

export type stagingmumbai_Setting_filter = {
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
  caller?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type stagingmumbai_StableSwap = {
  id: Scalars['ID'];
  canonicalId: Scalars['stagingmumbai_Bytes'];
  domain?: Maybe<Scalars['BigInt']>;
  swapPool: Scalars['stagingmumbai_Bytes'];
};

export type stagingmumbai_StableSwap_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  canonicalId?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_StableSwap_orderBy =
  | 'id'
  | 'canonicalId'
  | 'domain'
  | 'swapPool';

export type Subscription = {
  stagingmumbai_asset?: Maybe<stagingmumbai_Asset>;
  stagingmumbai_assets: Array<stagingmumbai_Asset>;
  stagingmumbai_assetBalance?: Maybe<stagingmumbai_AssetBalance>;
  stagingmumbai_assetBalances: Array<stagingmumbai_AssetBalance>;
  stagingmumbai_router?: Maybe<stagingmumbai_Router>;
  stagingmumbai_routers: Array<stagingmumbai_Router>;
  stagingmumbai_setting?: Maybe<stagingmumbai_Setting>;
  stagingmumbai_settings: Array<stagingmumbai_Setting>;
  stagingmumbai_relayer?: Maybe<stagingmumbai_Relayer>;
  stagingmumbai_relayers: Array<stagingmumbai_Relayer>;
  stagingmumbai_sequencer?: Maybe<stagingmumbai_Sequencer>;
  stagingmumbai_sequencers: Array<stagingmumbai_Sequencer>;
  stagingmumbai_stableSwap?: Maybe<stagingmumbai_StableSwap>;
  stagingmumbai_stableSwaps: Array<stagingmumbai_StableSwap>;
  stagingmumbai_originTransfer?: Maybe<stagingmumbai_OriginTransfer>;
  stagingmumbai_originTransfers: Array<stagingmumbai_OriginTransfer>;
  stagingmumbai_destinationTransfer?: Maybe<stagingmumbai_DestinationTransfer>;
  stagingmumbai_destinationTransfers: Array<stagingmumbai_DestinationTransfer>;
  stagingmumbai_originMessage?: Maybe<stagingmumbai_OriginMessage>;
  stagingmumbai_originMessages: Array<stagingmumbai_OriginMessage>;
  stagingmumbai_destinationMessage?: Maybe<stagingmumbai_DestinationMessage>;
  stagingmumbai_destinationMessages: Array<stagingmumbai_DestinationMessage>;
  stagingmumbai_aggregateRoot?: Maybe<stagingmumbai_AggregateRoot>;
  stagingmumbai_aggregateRoots: Array<stagingmumbai_AggregateRoot>;
  stagingmumbai_connectorMeta?: Maybe<stagingmumbai_ConnectorMeta>;
  stagingmumbai_connectorMetas: Array<stagingmumbai_ConnectorMeta>;
  stagingmumbai_rootCount?: Maybe<stagingmumbai_RootCount>;
  stagingmumbai_rootCounts: Array<stagingmumbai_RootCount>;
  stagingmumbai_rootMessageSent?: Maybe<stagingmumbai_RootMessageSent>;
  stagingmumbai_rootMessageSents: Array<stagingmumbai_RootMessageSent>;
  /** Access to subgraph metadata */
  stagingmumbai__meta?: Maybe<stagingmumbai__Meta_>;
};


export type Subscriptionstagingmumbai_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_Asset_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_AssetBalance_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_Router_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_Router_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_Setting_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_Relayer_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_Sequencer_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_StableSwap_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_StableSwap_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_OriginTransfer_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_DestinationTransfer_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_OriginMessage_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_DestinationMessage_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_AggregateRoot_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_ConnectorMeta_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_RootCount_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_RootMessageSent_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai__metaArgs = {
  block?: InputMaybe<stagingmumbai_Block_height>;
};

export type stagingmumbai_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type stagingmumbai__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingmumbai_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type stagingmumbai__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingmumbai__Block_;
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
  stagingmumbai_asset: InContextSdkMethod<Query['stagingmumbai_asset'], Querystagingmumbai_assetArgs, MeshContext>,
  /** null **/
  stagingmumbai_assets: InContextSdkMethod<Query['stagingmumbai_assets'], Querystagingmumbai_assetsArgs, MeshContext>,
  /** null **/
  stagingmumbai_assetBalance: InContextSdkMethod<Query['stagingmumbai_assetBalance'], Querystagingmumbai_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingmumbai_assetBalances: InContextSdkMethod<Query['stagingmumbai_assetBalances'], Querystagingmumbai_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingmumbai_router: InContextSdkMethod<Query['stagingmumbai_router'], Querystagingmumbai_routerArgs, MeshContext>,
  /** null **/
  stagingmumbai_routers: InContextSdkMethod<Query['stagingmumbai_routers'], Querystagingmumbai_routersArgs, MeshContext>,
  /** null **/
  stagingmumbai_setting: InContextSdkMethod<Query['stagingmumbai_setting'], Querystagingmumbai_settingArgs, MeshContext>,
  /** null **/
  stagingmumbai_settings: InContextSdkMethod<Query['stagingmumbai_settings'], Querystagingmumbai_settingsArgs, MeshContext>,
  /** null **/
  stagingmumbai_relayer: InContextSdkMethod<Query['stagingmumbai_relayer'], Querystagingmumbai_relayerArgs, MeshContext>,
  /** null **/
  stagingmumbai_relayers: InContextSdkMethod<Query['stagingmumbai_relayers'], Querystagingmumbai_relayersArgs, MeshContext>,
  /** null **/
  stagingmumbai_sequencer: InContextSdkMethod<Query['stagingmumbai_sequencer'], Querystagingmumbai_sequencerArgs, MeshContext>,
  /** null **/
  stagingmumbai_sequencers: InContextSdkMethod<Query['stagingmumbai_sequencers'], Querystagingmumbai_sequencersArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwap: InContextSdkMethod<Query['stagingmumbai_stableSwap'], Querystagingmumbai_stableSwapArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwaps: InContextSdkMethod<Query['stagingmumbai_stableSwaps'], Querystagingmumbai_stableSwapsArgs, MeshContext>,
  /** null **/
  stagingmumbai_originTransfer: InContextSdkMethod<Query['stagingmumbai_originTransfer'], Querystagingmumbai_originTransferArgs, MeshContext>,
  /** null **/
  stagingmumbai_originTransfers: InContextSdkMethod<Query['stagingmumbai_originTransfers'], Querystagingmumbai_originTransfersArgs, MeshContext>,
  /** null **/
  stagingmumbai_destinationTransfer: InContextSdkMethod<Query['stagingmumbai_destinationTransfer'], Querystagingmumbai_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingmumbai_destinationTransfers: InContextSdkMethod<Query['stagingmumbai_destinationTransfers'], Querystagingmumbai_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingmumbai_originMessage: InContextSdkMethod<Query['stagingmumbai_originMessage'], Querystagingmumbai_originMessageArgs, MeshContext>,
  /** null **/
  stagingmumbai_originMessages: InContextSdkMethod<Query['stagingmumbai_originMessages'], Querystagingmumbai_originMessagesArgs, MeshContext>,
  /** null **/
  stagingmumbai_destinationMessage: InContextSdkMethod<Query['stagingmumbai_destinationMessage'], Querystagingmumbai_destinationMessageArgs, MeshContext>,
  /** null **/
  stagingmumbai_destinationMessages: InContextSdkMethod<Query['stagingmumbai_destinationMessages'], Querystagingmumbai_destinationMessagesArgs, MeshContext>,
  /** null **/
  stagingmumbai_aggregateRoot: InContextSdkMethod<Query['stagingmumbai_aggregateRoot'], Querystagingmumbai_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingmumbai_aggregateRoots: InContextSdkMethod<Query['stagingmumbai_aggregateRoots'], Querystagingmumbai_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingmumbai_connectorMeta: InContextSdkMethod<Query['stagingmumbai_connectorMeta'], Querystagingmumbai_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingmumbai_connectorMetas: InContextSdkMethod<Query['stagingmumbai_connectorMetas'], Querystagingmumbai_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingmumbai_rootCount: InContextSdkMethod<Query['stagingmumbai_rootCount'], Querystagingmumbai_rootCountArgs, MeshContext>,
  /** null **/
  stagingmumbai_rootCounts: InContextSdkMethod<Query['stagingmumbai_rootCounts'], Querystagingmumbai_rootCountsArgs, MeshContext>,
  /** null **/
  stagingmumbai_rootMessageSent: InContextSdkMethod<Query['stagingmumbai_rootMessageSent'], Querystagingmumbai_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingmumbai_rootMessageSents: InContextSdkMethod<Query['stagingmumbai_rootMessageSents'], Querystagingmumbai_rootMessageSentsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingmumbai__meta: InContextSdkMethod<Query['stagingmumbai__meta'], Querystagingmumbai__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  stagingmumbai_asset: InContextSdkMethod<Subscription['stagingmumbai_asset'], Subscriptionstagingmumbai_assetArgs, MeshContext>,
  /** null **/
  stagingmumbai_assets: InContextSdkMethod<Subscription['stagingmumbai_assets'], Subscriptionstagingmumbai_assetsArgs, MeshContext>,
  /** null **/
  stagingmumbai_assetBalance: InContextSdkMethod<Subscription['stagingmumbai_assetBalance'], Subscriptionstagingmumbai_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingmumbai_assetBalances: InContextSdkMethod<Subscription['stagingmumbai_assetBalances'], Subscriptionstagingmumbai_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingmumbai_router: InContextSdkMethod<Subscription['stagingmumbai_router'], Subscriptionstagingmumbai_routerArgs, MeshContext>,
  /** null **/
  stagingmumbai_routers: InContextSdkMethod<Subscription['stagingmumbai_routers'], Subscriptionstagingmumbai_routersArgs, MeshContext>,
  /** null **/
  stagingmumbai_setting: InContextSdkMethod<Subscription['stagingmumbai_setting'], Subscriptionstagingmumbai_settingArgs, MeshContext>,
  /** null **/
  stagingmumbai_settings: InContextSdkMethod<Subscription['stagingmumbai_settings'], Subscriptionstagingmumbai_settingsArgs, MeshContext>,
  /** null **/
  stagingmumbai_relayer: InContextSdkMethod<Subscription['stagingmumbai_relayer'], Subscriptionstagingmumbai_relayerArgs, MeshContext>,
  /** null **/
  stagingmumbai_relayers: InContextSdkMethod<Subscription['stagingmumbai_relayers'], Subscriptionstagingmumbai_relayersArgs, MeshContext>,
  /** null **/
  stagingmumbai_sequencer: InContextSdkMethod<Subscription['stagingmumbai_sequencer'], Subscriptionstagingmumbai_sequencerArgs, MeshContext>,
  /** null **/
  stagingmumbai_sequencers: InContextSdkMethod<Subscription['stagingmumbai_sequencers'], Subscriptionstagingmumbai_sequencersArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwap: InContextSdkMethod<Subscription['stagingmumbai_stableSwap'], Subscriptionstagingmumbai_stableSwapArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwaps: InContextSdkMethod<Subscription['stagingmumbai_stableSwaps'], Subscriptionstagingmumbai_stableSwapsArgs, MeshContext>,
  /** null **/
  stagingmumbai_originTransfer: InContextSdkMethod<Subscription['stagingmumbai_originTransfer'], Subscriptionstagingmumbai_originTransferArgs, MeshContext>,
  /** null **/
  stagingmumbai_originTransfers: InContextSdkMethod<Subscription['stagingmumbai_originTransfers'], Subscriptionstagingmumbai_originTransfersArgs, MeshContext>,
  /** null **/
  stagingmumbai_destinationTransfer: InContextSdkMethod<Subscription['stagingmumbai_destinationTransfer'], Subscriptionstagingmumbai_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingmumbai_destinationTransfers: InContextSdkMethod<Subscription['stagingmumbai_destinationTransfers'], Subscriptionstagingmumbai_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingmumbai_originMessage: InContextSdkMethod<Subscription['stagingmumbai_originMessage'], Subscriptionstagingmumbai_originMessageArgs, MeshContext>,
  /** null **/
  stagingmumbai_originMessages: InContextSdkMethod<Subscription['stagingmumbai_originMessages'], Subscriptionstagingmumbai_originMessagesArgs, MeshContext>,
  /** null **/
  stagingmumbai_destinationMessage: InContextSdkMethod<Subscription['stagingmumbai_destinationMessage'], Subscriptionstagingmumbai_destinationMessageArgs, MeshContext>,
  /** null **/
  stagingmumbai_destinationMessages: InContextSdkMethod<Subscription['stagingmumbai_destinationMessages'], Subscriptionstagingmumbai_destinationMessagesArgs, MeshContext>,
  /** null **/
  stagingmumbai_aggregateRoot: InContextSdkMethod<Subscription['stagingmumbai_aggregateRoot'], Subscriptionstagingmumbai_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingmumbai_aggregateRoots: InContextSdkMethod<Subscription['stagingmumbai_aggregateRoots'], Subscriptionstagingmumbai_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingmumbai_connectorMeta: InContextSdkMethod<Subscription['stagingmumbai_connectorMeta'], Subscriptionstagingmumbai_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingmumbai_connectorMetas: InContextSdkMethod<Subscription['stagingmumbai_connectorMetas'], Subscriptionstagingmumbai_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingmumbai_rootCount: InContextSdkMethod<Subscription['stagingmumbai_rootCount'], Subscriptionstagingmumbai_rootCountArgs, MeshContext>,
  /** null **/
  stagingmumbai_rootCounts: InContextSdkMethod<Subscription['stagingmumbai_rootCounts'], Subscriptionstagingmumbai_rootCountsArgs, MeshContext>,
  /** null **/
  stagingmumbai_rootMessageSent: InContextSdkMethod<Subscription['stagingmumbai_rootMessageSent'], Subscriptionstagingmumbai_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingmumbai_rootMessageSents: InContextSdkMethod<Subscription['stagingmumbai_rootMessageSents'], Subscriptionstagingmumbai_rootMessageSentsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingmumbai__meta: InContextSdkMethod<Subscription['stagingmumbai__meta'], Subscriptionstagingmumbai__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Staging_Mumbai"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
