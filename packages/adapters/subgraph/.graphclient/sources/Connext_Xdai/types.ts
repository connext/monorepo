// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextXdaiTypes {
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
  xdai_BigDecimal: any;
  BigInt: any;
  xdai_Bytes: any;
};

export type xdai_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['xdai_Bytes'];
};

export type xdai_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['xdai_Bytes']>;
  root_not?: InputMaybe<Scalars['xdai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_AggregateRoot_orderBy =
  | 'id'
  | 'root';

export type xdai_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['xdai_Bytes']>;
  canonicalId?: Maybe<Scalars['xdai_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['xdai_Bytes']>;
  localAsset?: Maybe<Scalars['xdai_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type xdai_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: xdai_Router;
  asset: xdai_Asset;
  feesEarned: Scalars['BigInt'];
};

export type xdai_AssetBalance_filter = {
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
  router_?: InputMaybe<xdai_Router_filter>;
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
  asset_?: InputMaybe<xdai_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset'
  | 'feesEarned';

export type xdai_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['xdai_Bytes']>;
  key_not?: InputMaybe<Scalars['xdai_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  key_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['xdai_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['xdai_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  localAsset?: InputMaybe<Scalars['xdai_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['xdai_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_Asset_orderBy =
  | 'id'
  | 'key'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber';

export type xdai_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type xdai_Block_height = {
  hash?: InputMaybe<Scalars['xdai_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type xdai_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['xdai_Bytes']>;
  rootManager?: Maybe<Scalars['xdai_Bytes']>;
  mirrorConnector?: Maybe<Scalars['xdai_Bytes']>;
};

export type xdai_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['xdai_Bytes']>;
  amb_not?: InputMaybe<Scalars['xdai_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  rootManager?: InputMaybe<Scalars['xdai_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['xdai_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['xdai_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['xdai_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type xdai_DestinationMessage = {
  id: Scalars['ID'];
  leaf?: Maybe<Scalars['xdai_Bytes']>;
  processed?: Maybe<Scalars['Boolean']>;
  returnData?: Maybe<Scalars['xdai_Bytes']>;
  success?: Maybe<Scalars['Boolean']>;
  transactionHash?: Maybe<Scalars['xdai_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type xdai_DestinationMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  leaf?: InputMaybe<Scalars['xdai_Bytes']>;
  leaf_not?: InputMaybe<Scalars['xdai_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  processed?: InputMaybe<Scalars['Boolean']>;
  processed_not?: InputMaybe<Scalars['Boolean']>;
  processed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  processed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  returnData?: InputMaybe<Scalars['xdai_Bytes']>;
  returnData_not?: InputMaybe<Scalars['xdai_Bytes']>;
  returnData_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  returnData_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  returnData_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  returnData_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  success?: InputMaybe<Scalars['Boolean']>;
  success_not?: InputMaybe<Scalars['Boolean']>;
  success_in?: InputMaybe<Array<Scalars['Boolean']>>;
  success_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  transactionHash?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_DestinationMessage_orderBy =
  | 'id'
  | 'leaf'
  | 'processed'
  | 'returnData'
  | 'success'
  | 'transactionHash'
  | 'blockNumber';

export type xdai_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['xdai_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<xdai_TransferStatus>;
  routers?: Maybe<Array<xdai_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['xdai_Bytes']>;
  delegate?: Maybe<Scalars['xdai_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['xdai_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['xdai_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['xdai_Bytes']>;
  asset?: Maybe<xdai_Asset>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['xdai_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['xdai_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['xdai_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['xdai_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type xdai_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Router_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Router_filter>;
};

export type xdai_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<xdai_TransferStatus>;
  status_not?: InputMaybe<xdai_TransferStatus>;
  status_in?: InputMaybe<Array<xdai_TransferStatus>>;
  status_not_in?: InputMaybe<Array<xdai_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<xdai_Router_filter>;
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
  to?: InputMaybe<Scalars['xdai_Bytes']>;
  to_not?: InputMaybe<Scalars['xdai_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  to_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate_not?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['xdai_Bytes']>;
  callData_not?: InputMaybe<Scalars['xdai_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['xdai_Bytes']>;
  originSender_not?: InputMaybe<Scalars['xdai_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  asset_?: InputMaybe<xdai_Asset_filter>;
  routersFee?: InputMaybe<Scalars['BigInt']>;
  routersFee_not?: InputMaybe<Scalars['BigInt']>;
  routersFee_gt?: InputMaybe<Scalars['BigInt']>;
  routersFee_lt?: InputMaybe<Scalars['BigInt']>;
  routersFee_gte?: InputMaybe<Scalars['BigInt']>;
  routersFee_lte?: InputMaybe<Scalars['BigInt']>;
  routersFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  routersFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['xdai_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['xdai_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['xdai_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['xdai_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  reconciledCaller?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_DestinationTransfer_orderBy =
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
export type xdai_OrderDirection =
  | 'asc'
  | 'desc';

export type xdai_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['xdai_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['xdai_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['xdai_Bytes']>;
  message?: Maybe<Scalars['xdai_Bytes']>;
  transactionHash?: Maybe<Scalars['xdai_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<xdai_RootCount>;
};

export type xdai_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['xdai_Bytes']>;
  leaf_not?: InputMaybe<Scalars['xdai_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  root?: InputMaybe<Scalars['xdai_Bytes']>;
  root_not?: InputMaybe<Scalars['xdai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  message?: InputMaybe<Scalars['xdai_Bytes']>;
  message_not?: InputMaybe<Scalars['xdai_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  message_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  rootCount_?: InputMaybe<xdai_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_OriginMessage_orderBy =
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

export type xdai_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['xdai_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<xdai_TransferStatus>;
  messageHash?: Maybe<Scalars['xdai_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['xdai_Bytes']>;
  delegate?: Maybe<Scalars['xdai_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['xdai_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['xdai_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['xdai_Bytes']>;
  asset?: Maybe<xdai_Asset>;
  message?: Maybe<xdai_OriginMessage>;
  caller?: Maybe<Scalars['xdai_Bytes']>;
  transactionHash?: Maybe<Scalars['xdai_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type xdai_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<xdai_TransferStatus>;
  status_not?: InputMaybe<xdai_TransferStatus>;
  status_in?: InputMaybe<Array<xdai_TransferStatus>>;
  status_not_in?: InputMaybe<Array<xdai_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['xdai_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['xdai_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  to?: InputMaybe<Scalars['xdai_Bytes']>;
  to_not?: InputMaybe<Scalars['xdai_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  to_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate_not?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['xdai_Bytes']>;
  callData_not?: InputMaybe<Scalars['xdai_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['xdai_Bytes']>;
  originSender_not?: InputMaybe<Scalars['xdai_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  asset_?: InputMaybe<xdai_Asset_filter>;
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
  message_?: InputMaybe<xdai_OriginMessage_filter>;
  caller?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_not?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_OriginTransfer_orderBy =
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

export type xdai_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['xdai_Bytes'];
};

export type xdai_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_not?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  xdai_asset?: Maybe<xdai_Asset>;
  xdai_assets: Array<xdai_Asset>;
  xdai_assetBalance?: Maybe<xdai_AssetBalance>;
  xdai_assetBalances: Array<xdai_AssetBalance>;
  xdai_router?: Maybe<xdai_Router>;
  xdai_routers: Array<xdai_Router>;
  xdai_setting?: Maybe<xdai_Setting>;
  xdai_settings: Array<xdai_Setting>;
  xdai_relayer?: Maybe<xdai_Relayer>;
  xdai_relayers: Array<xdai_Relayer>;
  xdai_sequencer?: Maybe<xdai_Sequencer>;
  xdai_sequencers: Array<xdai_Sequencer>;
  xdai_originTransfer?: Maybe<xdai_OriginTransfer>;
  xdai_originTransfers: Array<xdai_OriginTransfer>;
  xdai_destinationTransfer?: Maybe<xdai_DestinationTransfer>;
  xdai_destinationTransfers: Array<xdai_DestinationTransfer>;
  xdai_originMessage?: Maybe<xdai_OriginMessage>;
  xdai_originMessages: Array<xdai_OriginMessage>;
  xdai_destinationMessage?: Maybe<xdai_DestinationMessage>;
  xdai_destinationMessages: Array<xdai_DestinationMessage>;
  xdai_aggregateRoot?: Maybe<xdai_AggregateRoot>;
  xdai_aggregateRoots: Array<xdai_AggregateRoot>;
  xdai_connectorMeta?: Maybe<xdai_ConnectorMeta>;
  xdai_connectorMetas: Array<xdai_ConnectorMeta>;
  xdai_rootCount?: Maybe<xdai_RootCount>;
  xdai_rootCounts: Array<xdai_RootCount>;
  xdai_rootMessageSent?: Maybe<xdai_RootMessageSent>;
  xdai_rootMessageSents: Array<xdai_RootMessageSent>;
  xdai_stableSwap?: Maybe<xdai_StableSwap>;
  xdai_stableSwaps: Array<xdai_StableSwap>;
  xdai_pooledToken?: Maybe<xdai_PooledToken>;
  xdai_pooledTokens: Array<xdai_PooledToken>;
  xdai_stableSwapLiquidity?: Maybe<xdai_StableSwapLiquidity>;
  xdai_stableSwapLiquidities: Array<xdai_StableSwapLiquidity>;
  /** Access to subgraph metadata */
  xdai__meta?: Maybe<xdai__Meta_>;
};


export type Queryxdai_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Asset_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Asset_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_AssetBalance_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Router_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Router_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Setting_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Setting_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Relayer_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Relayer_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Sequencer_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Sequencer_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_OriginTransfer_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_DestinationTransfer_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_OriginMessage_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_DestinationMessage_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_AggregateRoot_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_ConnectorMeta_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_RootCount_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_RootCount_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_RootMessageSent_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_StableSwap_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_StableSwap_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_PooledToken_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_PooledToken_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_stableSwapLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_stableSwapLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_StableSwapLiquidity_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_StableSwapLiquidity_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai__metaArgs = {
  block?: InputMaybe<xdai_Block_height>;
};

export type xdai_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['xdai_Bytes']>;
};

export type xdai_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['xdai_Bytes']>;
  relayer_not?: InputMaybe<Scalars['xdai_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type xdai_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type xdai_RootCount_filter = {
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
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_RootCount_orderBy =
  | 'id'
  | 'count';

export type xdai_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['xdai_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['xdai_Bytes']>;
  transactionHash?: Maybe<Scalars['xdai_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type xdai_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['xdai_Bytes']>;
  root_not?: InputMaybe<Scalars['xdai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_not?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_RootMessageSent_orderBy =
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

export type xdai_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['xdai_Bytes']>;
  recipient?: Maybe<Scalars['xdai_Bytes']>;
  proposedOwner?: Maybe<Scalars['xdai_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<xdai_AssetBalance>;
};


export type xdai_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_AssetBalance_filter>;
};

export type xdai_Router_filter = {
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
  owner?: InputMaybe<Scalars['xdai_Bytes']>;
  owner_not?: InputMaybe<Scalars['xdai_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  recipient?: InputMaybe<Scalars['xdai_Bytes']>;
  recipient_not?: InputMaybe<Scalars['xdai_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['xdai_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['xdai_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<xdai_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type xdai_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['xdai_Bytes']>;
};

export type xdai_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['xdai_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['xdai_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type xdai_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['xdai_Bytes'];
};

export type xdai_Setting_filter = {
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
  caller?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_not?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type xdai_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['xdai_Bytes']>;
  canonicalId?: Maybe<Scalars['xdai_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['xdai_Bytes']>;
  lpToken?: Maybe<Scalars['xdai_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<xdai_PooledToken>;
  tokenPrecisionMultipliers?: Maybe<Array<Scalars['BigInt']>>;
  balances: Array<Scalars['BigInt']>;
  adminFees?: Maybe<Array<Scalars['BigInt']>>;
};


export type xdai_StableSwappooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_PooledToken_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_PooledToken_filter>;
};

export type xdai_StableSwapLiquidity = {
  id: Scalars['ID'];
  provider: Scalars['xdai_Bytes'];
  stableSwap: xdai_StableSwap;
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply?: Maybe<Scalars['BigInt']>;
};

export type xdai_StableSwapLiquidity_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  provider?: InputMaybe<Scalars['xdai_Bytes']>;
  provider_not?: InputMaybe<Scalars['xdai_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  stableSwap_?: InputMaybe<xdai_StableSwap_filter>;
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
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_StableSwapLiquidity_orderBy =
  | 'id'
  | 'provider'
  | 'stableSwap'
  | 'tokenAmounts'
  | 'fees'
  | 'invariant'
  | 'lpTokenSupply';

export type xdai_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['xdai_Bytes']>;
  key_not?: InputMaybe<Scalars['xdai_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  key_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['xdai_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['xdai_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  lpToken?: InputMaybe<Scalars['xdai_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['xdai_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  pooledTokens_?: InputMaybe<xdai_PooledToken_filter>;
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
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_StableSwap_orderBy =
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
  xdai_asset?: Maybe<xdai_Asset>;
  xdai_assets: Array<xdai_Asset>;
  xdai_assetBalance?: Maybe<xdai_AssetBalance>;
  xdai_assetBalances: Array<xdai_AssetBalance>;
  xdai_router?: Maybe<xdai_Router>;
  xdai_routers: Array<xdai_Router>;
  xdai_setting?: Maybe<xdai_Setting>;
  xdai_settings: Array<xdai_Setting>;
  xdai_relayer?: Maybe<xdai_Relayer>;
  xdai_relayers: Array<xdai_Relayer>;
  xdai_sequencer?: Maybe<xdai_Sequencer>;
  xdai_sequencers: Array<xdai_Sequencer>;
  xdai_originTransfer?: Maybe<xdai_OriginTransfer>;
  xdai_originTransfers: Array<xdai_OriginTransfer>;
  xdai_destinationTransfer?: Maybe<xdai_DestinationTransfer>;
  xdai_destinationTransfers: Array<xdai_DestinationTransfer>;
  xdai_originMessage?: Maybe<xdai_OriginMessage>;
  xdai_originMessages: Array<xdai_OriginMessage>;
  xdai_destinationMessage?: Maybe<xdai_DestinationMessage>;
  xdai_destinationMessages: Array<xdai_DestinationMessage>;
  xdai_aggregateRoot?: Maybe<xdai_AggregateRoot>;
  xdai_aggregateRoots: Array<xdai_AggregateRoot>;
  xdai_connectorMeta?: Maybe<xdai_ConnectorMeta>;
  xdai_connectorMetas: Array<xdai_ConnectorMeta>;
  xdai_rootCount?: Maybe<xdai_RootCount>;
  xdai_rootCounts: Array<xdai_RootCount>;
  xdai_rootMessageSent?: Maybe<xdai_RootMessageSent>;
  xdai_rootMessageSents: Array<xdai_RootMessageSent>;
  xdai_stableSwap?: Maybe<xdai_StableSwap>;
  xdai_stableSwaps: Array<xdai_StableSwap>;
  xdai_pooledToken?: Maybe<xdai_PooledToken>;
  xdai_pooledTokens: Array<xdai_PooledToken>;
  xdai_stableSwapLiquidity?: Maybe<xdai_StableSwapLiquidity>;
  xdai_stableSwapLiquidities: Array<xdai_StableSwapLiquidity>;
  /** Access to subgraph metadata */
  xdai__meta?: Maybe<xdai__Meta_>;
};


export type Subscriptionxdai_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Asset_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Asset_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_AssetBalance_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Router_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Router_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Setting_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Setting_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Relayer_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Relayer_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_Sequencer_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_Sequencer_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_OriginTransfer_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_DestinationTransfer_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_OriginMessage_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_DestinationMessage_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_AggregateRoot_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_ConnectorMeta_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_RootCount_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_RootCount_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_RootMessageSent_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_StableSwap_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_StableSwap_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_PooledToken_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_PooledToken_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_stableSwapLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_stableSwapLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_StableSwapLiquidity_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_StableSwapLiquidity_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai__metaArgs = {
  block?: InputMaybe<xdai_Block_height>;
};

export type xdai_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type xdai__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['xdai_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type xdai__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: xdai__Block_;
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
  xdai_asset: InContextSdkMethod<Query['xdai_asset'], Queryxdai_assetArgs, MeshContext>,
  /** null **/
  xdai_assets: InContextSdkMethod<Query['xdai_assets'], Queryxdai_assetsArgs, MeshContext>,
  /** null **/
  xdai_assetBalance: InContextSdkMethod<Query['xdai_assetBalance'], Queryxdai_assetBalanceArgs, MeshContext>,
  /** null **/
  xdai_assetBalances: InContextSdkMethod<Query['xdai_assetBalances'], Queryxdai_assetBalancesArgs, MeshContext>,
  /** null **/
  xdai_router: InContextSdkMethod<Query['xdai_router'], Queryxdai_routerArgs, MeshContext>,
  /** null **/
  xdai_routers: InContextSdkMethod<Query['xdai_routers'], Queryxdai_routersArgs, MeshContext>,
  /** null **/
  xdai_setting: InContextSdkMethod<Query['xdai_setting'], Queryxdai_settingArgs, MeshContext>,
  /** null **/
  xdai_settings: InContextSdkMethod<Query['xdai_settings'], Queryxdai_settingsArgs, MeshContext>,
  /** null **/
  xdai_relayer: InContextSdkMethod<Query['xdai_relayer'], Queryxdai_relayerArgs, MeshContext>,
  /** null **/
  xdai_relayers: InContextSdkMethod<Query['xdai_relayers'], Queryxdai_relayersArgs, MeshContext>,
  /** null **/
  xdai_sequencer: InContextSdkMethod<Query['xdai_sequencer'], Queryxdai_sequencerArgs, MeshContext>,
  /** null **/
  xdai_sequencers: InContextSdkMethod<Query['xdai_sequencers'], Queryxdai_sequencersArgs, MeshContext>,
  /** null **/
  xdai_originTransfer: InContextSdkMethod<Query['xdai_originTransfer'], Queryxdai_originTransferArgs, MeshContext>,
  /** null **/
  xdai_originTransfers: InContextSdkMethod<Query['xdai_originTransfers'], Queryxdai_originTransfersArgs, MeshContext>,
  /** null **/
  xdai_destinationTransfer: InContextSdkMethod<Query['xdai_destinationTransfer'], Queryxdai_destinationTransferArgs, MeshContext>,
  /** null **/
  xdai_destinationTransfers: InContextSdkMethod<Query['xdai_destinationTransfers'], Queryxdai_destinationTransfersArgs, MeshContext>,
  /** null **/
  xdai_originMessage: InContextSdkMethod<Query['xdai_originMessage'], Queryxdai_originMessageArgs, MeshContext>,
  /** null **/
  xdai_originMessages: InContextSdkMethod<Query['xdai_originMessages'], Queryxdai_originMessagesArgs, MeshContext>,
  /** null **/
  xdai_destinationMessage: InContextSdkMethod<Query['xdai_destinationMessage'], Queryxdai_destinationMessageArgs, MeshContext>,
  /** null **/
  xdai_destinationMessages: InContextSdkMethod<Query['xdai_destinationMessages'], Queryxdai_destinationMessagesArgs, MeshContext>,
  /** null **/
  xdai_aggregateRoot: InContextSdkMethod<Query['xdai_aggregateRoot'], Queryxdai_aggregateRootArgs, MeshContext>,
  /** null **/
  xdai_aggregateRoots: InContextSdkMethod<Query['xdai_aggregateRoots'], Queryxdai_aggregateRootsArgs, MeshContext>,
  /** null **/
  xdai_connectorMeta: InContextSdkMethod<Query['xdai_connectorMeta'], Queryxdai_connectorMetaArgs, MeshContext>,
  /** null **/
  xdai_connectorMetas: InContextSdkMethod<Query['xdai_connectorMetas'], Queryxdai_connectorMetasArgs, MeshContext>,
  /** null **/
  xdai_rootCount: InContextSdkMethod<Query['xdai_rootCount'], Queryxdai_rootCountArgs, MeshContext>,
  /** null **/
  xdai_rootCounts: InContextSdkMethod<Query['xdai_rootCounts'], Queryxdai_rootCountsArgs, MeshContext>,
  /** null **/
  xdai_rootMessageSent: InContextSdkMethod<Query['xdai_rootMessageSent'], Queryxdai_rootMessageSentArgs, MeshContext>,
  /** null **/
  xdai_rootMessageSents: InContextSdkMethod<Query['xdai_rootMessageSents'], Queryxdai_rootMessageSentsArgs, MeshContext>,
  /** null **/
  xdai_stableSwap: InContextSdkMethod<Query['xdai_stableSwap'], Queryxdai_stableSwapArgs, MeshContext>,
  /** null **/
  xdai_stableSwaps: InContextSdkMethod<Query['xdai_stableSwaps'], Queryxdai_stableSwapsArgs, MeshContext>,
  /** null **/
  xdai_pooledToken: InContextSdkMethod<Query['xdai_pooledToken'], Queryxdai_pooledTokenArgs, MeshContext>,
  /** null **/
  xdai_pooledTokens: InContextSdkMethod<Query['xdai_pooledTokens'], Queryxdai_pooledTokensArgs, MeshContext>,
  /** null **/
  xdai_stableSwapLiquidity: InContextSdkMethod<Query['xdai_stableSwapLiquidity'], Queryxdai_stableSwapLiquidityArgs, MeshContext>,
  /** null **/
  xdai_stableSwapLiquidities: InContextSdkMethod<Query['xdai_stableSwapLiquidities'], Queryxdai_stableSwapLiquiditiesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  xdai__meta: InContextSdkMethod<Query['xdai__meta'], Queryxdai__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  xdai_asset: InContextSdkMethod<Subscription['xdai_asset'], Subscriptionxdai_assetArgs, MeshContext>,
  /** null **/
  xdai_assets: InContextSdkMethod<Subscription['xdai_assets'], Subscriptionxdai_assetsArgs, MeshContext>,
  /** null **/
  xdai_assetBalance: InContextSdkMethod<Subscription['xdai_assetBalance'], Subscriptionxdai_assetBalanceArgs, MeshContext>,
  /** null **/
  xdai_assetBalances: InContextSdkMethod<Subscription['xdai_assetBalances'], Subscriptionxdai_assetBalancesArgs, MeshContext>,
  /** null **/
  xdai_router: InContextSdkMethod<Subscription['xdai_router'], Subscriptionxdai_routerArgs, MeshContext>,
  /** null **/
  xdai_routers: InContextSdkMethod<Subscription['xdai_routers'], Subscriptionxdai_routersArgs, MeshContext>,
  /** null **/
  xdai_setting: InContextSdkMethod<Subscription['xdai_setting'], Subscriptionxdai_settingArgs, MeshContext>,
  /** null **/
  xdai_settings: InContextSdkMethod<Subscription['xdai_settings'], Subscriptionxdai_settingsArgs, MeshContext>,
  /** null **/
  xdai_relayer: InContextSdkMethod<Subscription['xdai_relayer'], Subscriptionxdai_relayerArgs, MeshContext>,
  /** null **/
  xdai_relayers: InContextSdkMethod<Subscription['xdai_relayers'], Subscriptionxdai_relayersArgs, MeshContext>,
  /** null **/
  xdai_sequencer: InContextSdkMethod<Subscription['xdai_sequencer'], Subscriptionxdai_sequencerArgs, MeshContext>,
  /** null **/
  xdai_sequencers: InContextSdkMethod<Subscription['xdai_sequencers'], Subscriptionxdai_sequencersArgs, MeshContext>,
  /** null **/
  xdai_originTransfer: InContextSdkMethod<Subscription['xdai_originTransfer'], Subscriptionxdai_originTransferArgs, MeshContext>,
  /** null **/
  xdai_originTransfers: InContextSdkMethod<Subscription['xdai_originTransfers'], Subscriptionxdai_originTransfersArgs, MeshContext>,
  /** null **/
  xdai_destinationTransfer: InContextSdkMethod<Subscription['xdai_destinationTransfer'], Subscriptionxdai_destinationTransferArgs, MeshContext>,
  /** null **/
  xdai_destinationTransfers: InContextSdkMethod<Subscription['xdai_destinationTransfers'], Subscriptionxdai_destinationTransfersArgs, MeshContext>,
  /** null **/
  xdai_originMessage: InContextSdkMethod<Subscription['xdai_originMessage'], Subscriptionxdai_originMessageArgs, MeshContext>,
  /** null **/
  xdai_originMessages: InContextSdkMethod<Subscription['xdai_originMessages'], Subscriptionxdai_originMessagesArgs, MeshContext>,
  /** null **/
  xdai_destinationMessage: InContextSdkMethod<Subscription['xdai_destinationMessage'], Subscriptionxdai_destinationMessageArgs, MeshContext>,
  /** null **/
  xdai_destinationMessages: InContextSdkMethod<Subscription['xdai_destinationMessages'], Subscriptionxdai_destinationMessagesArgs, MeshContext>,
  /** null **/
  xdai_aggregateRoot: InContextSdkMethod<Subscription['xdai_aggregateRoot'], Subscriptionxdai_aggregateRootArgs, MeshContext>,
  /** null **/
  xdai_aggregateRoots: InContextSdkMethod<Subscription['xdai_aggregateRoots'], Subscriptionxdai_aggregateRootsArgs, MeshContext>,
  /** null **/
  xdai_connectorMeta: InContextSdkMethod<Subscription['xdai_connectorMeta'], Subscriptionxdai_connectorMetaArgs, MeshContext>,
  /** null **/
  xdai_connectorMetas: InContextSdkMethod<Subscription['xdai_connectorMetas'], Subscriptionxdai_connectorMetasArgs, MeshContext>,
  /** null **/
  xdai_rootCount: InContextSdkMethod<Subscription['xdai_rootCount'], Subscriptionxdai_rootCountArgs, MeshContext>,
  /** null **/
  xdai_rootCounts: InContextSdkMethod<Subscription['xdai_rootCounts'], Subscriptionxdai_rootCountsArgs, MeshContext>,
  /** null **/
  xdai_rootMessageSent: InContextSdkMethod<Subscription['xdai_rootMessageSent'], Subscriptionxdai_rootMessageSentArgs, MeshContext>,
  /** null **/
  xdai_rootMessageSents: InContextSdkMethod<Subscription['xdai_rootMessageSents'], Subscriptionxdai_rootMessageSentsArgs, MeshContext>,
  /** null **/
  xdai_stableSwap: InContextSdkMethod<Subscription['xdai_stableSwap'], Subscriptionxdai_stableSwapArgs, MeshContext>,
  /** null **/
  xdai_stableSwaps: InContextSdkMethod<Subscription['xdai_stableSwaps'], Subscriptionxdai_stableSwapsArgs, MeshContext>,
  /** null **/
  xdai_pooledToken: InContextSdkMethod<Subscription['xdai_pooledToken'], Subscriptionxdai_pooledTokenArgs, MeshContext>,
  /** null **/
  xdai_pooledTokens: InContextSdkMethod<Subscription['xdai_pooledTokens'], Subscriptionxdai_pooledTokensArgs, MeshContext>,
  /** null **/
  xdai_stableSwapLiquidity: InContextSdkMethod<Subscription['xdai_stableSwapLiquidity'], Subscriptionxdai_stableSwapLiquidityArgs, MeshContext>,
  /** null **/
  xdai_stableSwapLiquidities: InContextSdkMethod<Subscription['xdai_stableSwapLiquidities'], Subscriptionxdai_stableSwapLiquiditiesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  xdai__meta: InContextSdkMethod<Subscription['xdai__meta'], Subscriptionxdai__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Xdai"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
