// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextBnbTypes {
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
  bnb_BigDecimal: any;
  BigInt: any;
  bnb_Bytes: any;
};

export type bnb_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['bnb_Bytes'];
};

export type bnb_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['bnb_Bytes']>;
  root_not?: InputMaybe<Scalars['bnb_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  root_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
};

export type bnb_AggregateRoot_orderBy =
  | 'id'
  | 'root';

export type bnb_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['bnb_Bytes']>;
  canonicalId?: Maybe<Scalars['bnb_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['bnb_Bytes']>;
  localAsset?: Maybe<Scalars['bnb_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type bnb_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: bnb_Router;
  asset: bnb_Asset;
  feesEarned: Scalars['BigInt'];
};

export type bnb_AssetBalance_filter = {
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
  router_?: InputMaybe<bnb_Router_filter>;
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
  asset_?: InputMaybe<bnb_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
};

export type bnb_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset'
  | 'feesEarned';

export type bnb_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['bnb_Bytes']>;
  key_not?: InputMaybe<Scalars['bnb_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  key_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['bnb_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['bnb_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  localAsset?: InputMaybe<Scalars['bnb_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['bnb_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
};

export type bnb_Asset_orderBy =
  | 'id'
  | 'key'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber';

export type bnb_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type bnb_Block_height = {
  hash?: InputMaybe<Scalars['bnb_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type bnb_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['bnb_Bytes']>;
  rootManager?: Maybe<Scalars['bnb_Bytes']>;
  mirrorConnector?: Maybe<Scalars['bnb_Bytes']>;
};

export type bnb_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['bnb_Bytes']>;
  amb_not?: InputMaybe<Scalars['bnb_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  rootManager?: InputMaybe<Scalars['bnb_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['bnb_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['bnb_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['bnb_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
};

export type bnb_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type bnb_DestinationMessage = {
  id: Scalars['ID'];
  leaf?: Maybe<Scalars['bnb_Bytes']>;
  processed?: Maybe<Scalars['Boolean']>;
  returnData?: Maybe<Scalars['bnb_Bytes']>;
  success?: Maybe<Scalars['Boolean']>;
  transactionHash?: Maybe<Scalars['bnb_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type bnb_DestinationMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  leaf?: InputMaybe<Scalars['bnb_Bytes']>;
  leaf_not?: InputMaybe<Scalars['bnb_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  processed?: InputMaybe<Scalars['Boolean']>;
  processed_not?: InputMaybe<Scalars['Boolean']>;
  processed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  processed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  returnData?: InputMaybe<Scalars['bnb_Bytes']>;
  returnData_not?: InputMaybe<Scalars['bnb_Bytes']>;
  returnData_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  returnData_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  returnData_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  returnData_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  success?: InputMaybe<Scalars['Boolean']>;
  success_not?: InputMaybe<Scalars['Boolean']>;
  success_in?: InputMaybe<Array<Scalars['Boolean']>>;
  success_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  transactionHash?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
};

export type bnb_DestinationMessage_orderBy =
  | 'id'
  | 'leaf'
  | 'processed'
  | 'returnData'
  | 'success'
  | 'transactionHash'
  | 'blockNumber';

export type bnb_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['bnb_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<bnb_TransferStatus>;
  routers?: Maybe<Array<bnb_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['bnb_Bytes']>;
  delegate?: Maybe<Scalars['bnb_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['bnb_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['bnb_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['bnb_Bytes']>;
  asset?: Maybe<bnb_Asset>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['bnb_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['bnb_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['bnb_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['bnb_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type bnb_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_Router_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_Router_filter>;
};

export type bnb_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_not?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<bnb_TransferStatus>;
  status_not?: InputMaybe<bnb_TransferStatus>;
  status_in?: InputMaybe<Array<bnb_TransferStatus>>;
  status_not_in?: InputMaybe<Array<bnb_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<bnb_Router_filter>;
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
  to?: InputMaybe<Scalars['bnb_Bytes']>;
  to_not?: InputMaybe<Scalars['bnb_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  to_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate_not?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['bnb_Bytes']>;
  callData_not?: InputMaybe<Scalars['bnb_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['bnb_Bytes']>;
  originSender_not?: InputMaybe<Scalars['bnb_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  asset_?: InputMaybe<bnb_Asset_filter>;
  routersFee?: InputMaybe<Scalars['BigInt']>;
  routersFee_not?: InputMaybe<Scalars['BigInt']>;
  routersFee_gt?: InputMaybe<Scalars['BigInt']>;
  routersFee_lt?: InputMaybe<Scalars['BigInt']>;
  routersFee_gte?: InputMaybe<Scalars['BigInt']>;
  routersFee_lte?: InputMaybe<Scalars['BigInt']>;
  routersFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  routersFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['bnb_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['bnb_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['bnb_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['bnb_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  reconciledCaller?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
};

export type bnb_DestinationTransfer_orderBy =
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
export type bnb_OrderDirection =
  | 'asc'
  | 'desc';

export type bnb_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['bnb_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['bnb_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['bnb_Bytes']>;
  message?: Maybe<Scalars['bnb_Bytes']>;
  transactionHash?: Maybe<Scalars['bnb_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<bnb_RootCount>;
};

export type bnb_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_not?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['bnb_Bytes']>;
  leaf_not?: InputMaybe<Scalars['bnb_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  root?: InputMaybe<Scalars['bnb_Bytes']>;
  root_not?: InputMaybe<Scalars['bnb_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  root_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  message?: InputMaybe<Scalars['bnb_Bytes']>;
  message_not?: InputMaybe<Scalars['bnb_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  message_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  rootCount_?: InputMaybe<bnb_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
};

export type bnb_OriginMessage_orderBy =
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

export type bnb_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['bnb_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<bnb_TransferStatus>;
  messageHash?: Maybe<Scalars['bnb_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['bnb_Bytes']>;
  delegate?: Maybe<Scalars['bnb_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['bnb_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['bnb_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['bnb_Bytes']>;
  asset?: Maybe<bnb_Asset>;
  message?: Maybe<bnb_OriginMessage>;
  caller?: Maybe<Scalars['bnb_Bytes']>;
  transactionHash?: Maybe<Scalars['bnb_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type bnb_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_not?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<bnb_TransferStatus>;
  status_not?: InputMaybe<bnb_TransferStatus>;
  status_in?: InputMaybe<Array<bnb_TransferStatus>>;
  status_not_in?: InputMaybe<Array<bnb_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['bnb_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['bnb_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  to?: InputMaybe<Scalars['bnb_Bytes']>;
  to_not?: InputMaybe<Scalars['bnb_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  to_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate_not?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['bnb_Bytes']>;
  callData_not?: InputMaybe<Scalars['bnb_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['bnb_Bytes']>;
  originSender_not?: InputMaybe<Scalars['bnb_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  asset_?: InputMaybe<bnb_Asset_filter>;
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
  message_?: InputMaybe<bnb_OriginMessage_filter>;
  caller?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_not?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
};

export type bnb_OriginTransfer_orderBy =
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

export type bnb_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['bnb_Bytes'];
};

export type bnb_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['bnb_Bytes']>;
  asset_not?: InputMaybe<Scalars['bnb_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
};

export type bnb_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  bnb_asset?: Maybe<bnb_Asset>;
  bnb_assets: Array<bnb_Asset>;
  bnb_assetBalance?: Maybe<bnb_AssetBalance>;
  bnb_assetBalances: Array<bnb_AssetBalance>;
  bnb_router?: Maybe<bnb_Router>;
  bnb_routers: Array<bnb_Router>;
  bnb_setting?: Maybe<bnb_Setting>;
  bnb_settings: Array<bnb_Setting>;
  bnb_relayer?: Maybe<bnb_Relayer>;
  bnb_relayers: Array<bnb_Relayer>;
  bnb_sequencer?: Maybe<bnb_Sequencer>;
  bnb_sequencers: Array<bnb_Sequencer>;
  bnb_originTransfer?: Maybe<bnb_OriginTransfer>;
  bnb_originTransfers: Array<bnb_OriginTransfer>;
  bnb_destinationTransfer?: Maybe<bnb_DestinationTransfer>;
  bnb_destinationTransfers: Array<bnb_DestinationTransfer>;
  bnb_originMessage?: Maybe<bnb_OriginMessage>;
  bnb_originMessages: Array<bnb_OriginMessage>;
  bnb_destinationMessage?: Maybe<bnb_DestinationMessage>;
  bnb_destinationMessages: Array<bnb_DestinationMessage>;
  bnb_aggregateRoot?: Maybe<bnb_AggregateRoot>;
  bnb_aggregateRoots: Array<bnb_AggregateRoot>;
  bnb_connectorMeta?: Maybe<bnb_ConnectorMeta>;
  bnb_connectorMetas: Array<bnb_ConnectorMeta>;
  bnb_rootCount?: Maybe<bnb_RootCount>;
  bnb_rootCounts: Array<bnb_RootCount>;
  bnb_rootMessageSent?: Maybe<bnb_RootMessageSent>;
  bnb_rootMessageSents: Array<bnb_RootMessageSent>;
  bnb_stableSwap?: Maybe<bnb_StableSwap>;
  bnb_stableSwaps: Array<bnb_StableSwap>;
  bnb_pooledToken?: Maybe<bnb_PooledToken>;
  bnb_pooledTokens: Array<bnb_PooledToken>;
  bnb_stableSwapLiquidity?: Maybe<bnb_StableSwapLiquidity>;
  bnb_stableSwapLiquidities: Array<bnb_StableSwapLiquidity>;
  /** Access to subgraph metadata */
  bnb__meta?: Maybe<bnb__Meta_>;
};


export type Querybnb_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_Asset_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_Asset_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_AssetBalance_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_Router_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_Router_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_Setting_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_Setting_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_Relayer_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_Relayer_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_Sequencer_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_Sequencer_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_OriginTransfer_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_DestinationTransfer_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_OriginMessage_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_DestinationMessage_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_AggregateRoot_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_ConnectorMeta_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_RootCount_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_RootCount_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_RootMessageSent_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_StableSwap_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_StableSwap_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_PooledToken_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_PooledToken_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_stableSwapLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb_stableSwapLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_StableSwapLiquidity_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_StableSwapLiquidity_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querybnb__metaArgs = {
  block?: InputMaybe<bnb_Block_height>;
};

export type bnb_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['bnb_Bytes']>;
};

export type bnb_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['bnb_Bytes']>;
  relayer_not?: InputMaybe<Scalars['bnb_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
};

export type bnb_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type bnb_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type bnb_RootCount_filter = {
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
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
};

export type bnb_RootCount_orderBy =
  | 'id'
  | 'count';

export type bnb_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['bnb_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['bnb_Bytes']>;
  transactionHash?: Maybe<Scalars['bnb_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type bnb_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['bnb_Bytes']>;
  root_not?: InputMaybe<Scalars['bnb_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  root_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_not?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
};

export type bnb_RootMessageSent_orderBy =
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

export type bnb_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['bnb_Bytes']>;
  recipient?: Maybe<Scalars['bnb_Bytes']>;
  proposedOwner?: Maybe<Scalars['bnb_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<bnb_AssetBalance>;
};


export type bnb_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_AssetBalance_filter>;
};

export type bnb_Router_filter = {
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
  owner?: InputMaybe<Scalars['bnb_Bytes']>;
  owner_not?: InputMaybe<Scalars['bnb_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  recipient?: InputMaybe<Scalars['bnb_Bytes']>;
  recipient_not?: InputMaybe<Scalars['bnb_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['bnb_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['bnb_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<bnb_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
};

export type bnb_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type bnb_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['bnb_Bytes']>;
};

export type bnb_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['bnb_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['bnb_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
};

export type bnb_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type bnb_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['bnb_Bytes'];
};

export type bnb_Setting_filter = {
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
  caller?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_not?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
};

export type bnb_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type bnb_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['bnb_Bytes']>;
  canonicalId?: Maybe<Scalars['bnb_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['bnb_Bytes']>;
  lpToken?: Maybe<Scalars['bnb_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<bnb_PooledToken>;
  tokenPrecisionMultipliers?: Maybe<Array<Scalars['BigInt']>>;
  balances: Array<Scalars['BigInt']>;
  adminFees?: Maybe<Array<Scalars['BigInt']>>;
};


export type bnb_StableSwappooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_PooledToken_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_PooledToken_filter>;
};

export type bnb_StableSwapLiquidity = {
  id: Scalars['ID'];
  provider: Scalars['bnb_Bytes'];
  stableSwap: bnb_StableSwap;
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply?: Maybe<Scalars['BigInt']>;
};

export type bnb_StableSwapLiquidity_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  provider?: InputMaybe<Scalars['bnb_Bytes']>;
  provider_not?: InputMaybe<Scalars['bnb_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  stableSwap_?: InputMaybe<bnb_StableSwap_filter>;
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
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
};

export type bnb_StableSwapLiquidity_orderBy =
  | 'id'
  | 'provider'
  | 'stableSwap'
  | 'tokenAmounts'
  | 'fees'
  | 'invariant'
  | 'lpTokenSupply';

export type bnb_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['bnb_Bytes']>;
  key_not?: InputMaybe<Scalars['bnb_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  key_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['bnb_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['bnb_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  lpToken?: InputMaybe<Scalars['bnb_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['bnb_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['bnb_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['bnb_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['bnb_Bytes']>;
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
  pooledTokens_?: InputMaybe<bnb_PooledToken_filter>;
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
  _change_block?: InputMaybe<bnb_BlockChangedFilter>;
};

export type bnb_StableSwap_orderBy =
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
  bnb_asset?: Maybe<bnb_Asset>;
  bnb_assets: Array<bnb_Asset>;
  bnb_assetBalance?: Maybe<bnb_AssetBalance>;
  bnb_assetBalances: Array<bnb_AssetBalance>;
  bnb_router?: Maybe<bnb_Router>;
  bnb_routers: Array<bnb_Router>;
  bnb_setting?: Maybe<bnb_Setting>;
  bnb_settings: Array<bnb_Setting>;
  bnb_relayer?: Maybe<bnb_Relayer>;
  bnb_relayers: Array<bnb_Relayer>;
  bnb_sequencer?: Maybe<bnb_Sequencer>;
  bnb_sequencers: Array<bnb_Sequencer>;
  bnb_originTransfer?: Maybe<bnb_OriginTransfer>;
  bnb_originTransfers: Array<bnb_OriginTransfer>;
  bnb_destinationTransfer?: Maybe<bnb_DestinationTransfer>;
  bnb_destinationTransfers: Array<bnb_DestinationTransfer>;
  bnb_originMessage?: Maybe<bnb_OriginMessage>;
  bnb_originMessages: Array<bnb_OriginMessage>;
  bnb_destinationMessage?: Maybe<bnb_DestinationMessage>;
  bnb_destinationMessages: Array<bnb_DestinationMessage>;
  bnb_aggregateRoot?: Maybe<bnb_AggregateRoot>;
  bnb_aggregateRoots: Array<bnb_AggregateRoot>;
  bnb_connectorMeta?: Maybe<bnb_ConnectorMeta>;
  bnb_connectorMetas: Array<bnb_ConnectorMeta>;
  bnb_rootCount?: Maybe<bnb_RootCount>;
  bnb_rootCounts: Array<bnb_RootCount>;
  bnb_rootMessageSent?: Maybe<bnb_RootMessageSent>;
  bnb_rootMessageSents: Array<bnb_RootMessageSent>;
  bnb_stableSwap?: Maybe<bnb_StableSwap>;
  bnb_stableSwaps: Array<bnb_StableSwap>;
  bnb_pooledToken?: Maybe<bnb_PooledToken>;
  bnb_pooledTokens: Array<bnb_PooledToken>;
  bnb_stableSwapLiquidity?: Maybe<bnb_StableSwapLiquidity>;
  bnb_stableSwapLiquidities: Array<bnb_StableSwapLiquidity>;
  /** Access to subgraph metadata */
  bnb__meta?: Maybe<bnb__Meta_>;
};


export type Subscriptionbnb_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_Asset_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_Asset_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_AssetBalance_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_Router_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_Router_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_Setting_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_Setting_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_Relayer_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_Relayer_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_Sequencer_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_Sequencer_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_OriginTransfer_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_DestinationTransfer_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_OriginMessage_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_DestinationMessage_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_AggregateRoot_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_ConnectorMeta_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_RootCount_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_RootCount_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_RootMessageSent_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_StableSwap_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_StableSwap_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_PooledToken_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_PooledToken_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_stableSwapLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb_stableSwapLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<bnb_StableSwapLiquidity_orderBy>;
  orderDirection?: InputMaybe<bnb_OrderDirection>;
  where?: InputMaybe<bnb_StableSwapLiquidity_filter>;
  block?: InputMaybe<bnb_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionbnb__metaArgs = {
  block?: InputMaybe<bnb_Block_height>;
};

export type bnb_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type bnb__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['bnb_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type bnb__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: bnb__Block_;
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
  bnb_asset: InContextSdkMethod<Query['bnb_asset'], Querybnb_assetArgs, MeshContext>,
  /** null **/
  bnb_assets: InContextSdkMethod<Query['bnb_assets'], Querybnb_assetsArgs, MeshContext>,
  /** null **/
  bnb_assetBalance: InContextSdkMethod<Query['bnb_assetBalance'], Querybnb_assetBalanceArgs, MeshContext>,
  /** null **/
  bnb_assetBalances: InContextSdkMethod<Query['bnb_assetBalances'], Querybnb_assetBalancesArgs, MeshContext>,
  /** null **/
  bnb_router: InContextSdkMethod<Query['bnb_router'], Querybnb_routerArgs, MeshContext>,
  /** null **/
  bnb_routers: InContextSdkMethod<Query['bnb_routers'], Querybnb_routersArgs, MeshContext>,
  /** null **/
  bnb_setting: InContextSdkMethod<Query['bnb_setting'], Querybnb_settingArgs, MeshContext>,
  /** null **/
  bnb_settings: InContextSdkMethod<Query['bnb_settings'], Querybnb_settingsArgs, MeshContext>,
  /** null **/
  bnb_relayer: InContextSdkMethod<Query['bnb_relayer'], Querybnb_relayerArgs, MeshContext>,
  /** null **/
  bnb_relayers: InContextSdkMethod<Query['bnb_relayers'], Querybnb_relayersArgs, MeshContext>,
  /** null **/
  bnb_sequencer: InContextSdkMethod<Query['bnb_sequencer'], Querybnb_sequencerArgs, MeshContext>,
  /** null **/
  bnb_sequencers: InContextSdkMethod<Query['bnb_sequencers'], Querybnb_sequencersArgs, MeshContext>,
  /** null **/
  bnb_originTransfer: InContextSdkMethod<Query['bnb_originTransfer'], Querybnb_originTransferArgs, MeshContext>,
  /** null **/
  bnb_originTransfers: InContextSdkMethod<Query['bnb_originTransfers'], Querybnb_originTransfersArgs, MeshContext>,
  /** null **/
  bnb_destinationTransfer: InContextSdkMethod<Query['bnb_destinationTransfer'], Querybnb_destinationTransferArgs, MeshContext>,
  /** null **/
  bnb_destinationTransfers: InContextSdkMethod<Query['bnb_destinationTransfers'], Querybnb_destinationTransfersArgs, MeshContext>,
  /** null **/
  bnb_originMessage: InContextSdkMethod<Query['bnb_originMessage'], Querybnb_originMessageArgs, MeshContext>,
  /** null **/
  bnb_originMessages: InContextSdkMethod<Query['bnb_originMessages'], Querybnb_originMessagesArgs, MeshContext>,
  /** null **/
  bnb_destinationMessage: InContextSdkMethod<Query['bnb_destinationMessage'], Querybnb_destinationMessageArgs, MeshContext>,
  /** null **/
  bnb_destinationMessages: InContextSdkMethod<Query['bnb_destinationMessages'], Querybnb_destinationMessagesArgs, MeshContext>,
  /** null **/
  bnb_aggregateRoot: InContextSdkMethod<Query['bnb_aggregateRoot'], Querybnb_aggregateRootArgs, MeshContext>,
  /** null **/
  bnb_aggregateRoots: InContextSdkMethod<Query['bnb_aggregateRoots'], Querybnb_aggregateRootsArgs, MeshContext>,
  /** null **/
  bnb_connectorMeta: InContextSdkMethod<Query['bnb_connectorMeta'], Querybnb_connectorMetaArgs, MeshContext>,
  /** null **/
  bnb_connectorMetas: InContextSdkMethod<Query['bnb_connectorMetas'], Querybnb_connectorMetasArgs, MeshContext>,
  /** null **/
  bnb_rootCount: InContextSdkMethod<Query['bnb_rootCount'], Querybnb_rootCountArgs, MeshContext>,
  /** null **/
  bnb_rootCounts: InContextSdkMethod<Query['bnb_rootCounts'], Querybnb_rootCountsArgs, MeshContext>,
  /** null **/
  bnb_rootMessageSent: InContextSdkMethod<Query['bnb_rootMessageSent'], Querybnb_rootMessageSentArgs, MeshContext>,
  /** null **/
  bnb_rootMessageSents: InContextSdkMethod<Query['bnb_rootMessageSents'], Querybnb_rootMessageSentsArgs, MeshContext>,
  /** null **/
  bnb_stableSwap: InContextSdkMethod<Query['bnb_stableSwap'], Querybnb_stableSwapArgs, MeshContext>,
  /** null **/
  bnb_stableSwaps: InContextSdkMethod<Query['bnb_stableSwaps'], Querybnb_stableSwapsArgs, MeshContext>,
  /** null **/
  bnb_pooledToken: InContextSdkMethod<Query['bnb_pooledToken'], Querybnb_pooledTokenArgs, MeshContext>,
  /** null **/
  bnb_pooledTokens: InContextSdkMethod<Query['bnb_pooledTokens'], Querybnb_pooledTokensArgs, MeshContext>,
  /** null **/
  bnb_stableSwapLiquidity: InContextSdkMethod<Query['bnb_stableSwapLiquidity'], Querybnb_stableSwapLiquidityArgs, MeshContext>,
  /** null **/
  bnb_stableSwapLiquidities: InContextSdkMethod<Query['bnb_stableSwapLiquidities'], Querybnb_stableSwapLiquiditiesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  bnb__meta: InContextSdkMethod<Query['bnb__meta'], Querybnb__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  bnb_asset: InContextSdkMethod<Subscription['bnb_asset'], Subscriptionbnb_assetArgs, MeshContext>,
  /** null **/
  bnb_assets: InContextSdkMethod<Subscription['bnb_assets'], Subscriptionbnb_assetsArgs, MeshContext>,
  /** null **/
  bnb_assetBalance: InContextSdkMethod<Subscription['bnb_assetBalance'], Subscriptionbnb_assetBalanceArgs, MeshContext>,
  /** null **/
  bnb_assetBalances: InContextSdkMethod<Subscription['bnb_assetBalances'], Subscriptionbnb_assetBalancesArgs, MeshContext>,
  /** null **/
  bnb_router: InContextSdkMethod<Subscription['bnb_router'], Subscriptionbnb_routerArgs, MeshContext>,
  /** null **/
  bnb_routers: InContextSdkMethod<Subscription['bnb_routers'], Subscriptionbnb_routersArgs, MeshContext>,
  /** null **/
  bnb_setting: InContextSdkMethod<Subscription['bnb_setting'], Subscriptionbnb_settingArgs, MeshContext>,
  /** null **/
  bnb_settings: InContextSdkMethod<Subscription['bnb_settings'], Subscriptionbnb_settingsArgs, MeshContext>,
  /** null **/
  bnb_relayer: InContextSdkMethod<Subscription['bnb_relayer'], Subscriptionbnb_relayerArgs, MeshContext>,
  /** null **/
  bnb_relayers: InContextSdkMethod<Subscription['bnb_relayers'], Subscriptionbnb_relayersArgs, MeshContext>,
  /** null **/
  bnb_sequencer: InContextSdkMethod<Subscription['bnb_sequencer'], Subscriptionbnb_sequencerArgs, MeshContext>,
  /** null **/
  bnb_sequencers: InContextSdkMethod<Subscription['bnb_sequencers'], Subscriptionbnb_sequencersArgs, MeshContext>,
  /** null **/
  bnb_originTransfer: InContextSdkMethod<Subscription['bnb_originTransfer'], Subscriptionbnb_originTransferArgs, MeshContext>,
  /** null **/
  bnb_originTransfers: InContextSdkMethod<Subscription['bnb_originTransfers'], Subscriptionbnb_originTransfersArgs, MeshContext>,
  /** null **/
  bnb_destinationTransfer: InContextSdkMethod<Subscription['bnb_destinationTransfer'], Subscriptionbnb_destinationTransferArgs, MeshContext>,
  /** null **/
  bnb_destinationTransfers: InContextSdkMethod<Subscription['bnb_destinationTransfers'], Subscriptionbnb_destinationTransfersArgs, MeshContext>,
  /** null **/
  bnb_originMessage: InContextSdkMethod<Subscription['bnb_originMessage'], Subscriptionbnb_originMessageArgs, MeshContext>,
  /** null **/
  bnb_originMessages: InContextSdkMethod<Subscription['bnb_originMessages'], Subscriptionbnb_originMessagesArgs, MeshContext>,
  /** null **/
  bnb_destinationMessage: InContextSdkMethod<Subscription['bnb_destinationMessage'], Subscriptionbnb_destinationMessageArgs, MeshContext>,
  /** null **/
  bnb_destinationMessages: InContextSdkMethod<Subscription['bnb_destinationMessages'], Subscriptionbnb_destinationMessagesArgs, MeshContext>,
  /** null **/
  bnb_aggregateRoot: InContextSdkMethod<Subscription['bnb_aggregateRoot'], Subscriptionbnb_aggregateRootArgs, MeshContext>,
  /** null **/
  bnb_aggregateRoots: InContextSdkMethod<Subscription['bnb_aggregateRoots'], Subscriptionbnb_aggregateRootsArgs, MeshContext>,
  /** null **/
  bnb_connectorMeta: InContextSdkMethod<Subscription['bnb_connectorMeta'], Subscriptionbnb_connectorMetaArgs, MeshContext>,
  /** null **/
  bnb_connectorMetas: InContextSdkMethod<Subscription['bnb_connectorMetas'], Subscriptionbnb_connectorMetasArgs, MeshContext>,
  /** null **/
  bnb_rootCount: InContextSdkMethod<Subscription['bnb_rootCount'], Subscriptionbnb_rootCountArgs, MeshContext>,
  /** null **/
  bnb_rootCounts: InContextSdkMethod<Subscription['bnb_rootCounts'], Subscriptionbnb_rootCountsArgs, MeshContext>,
  /** null **/
  bnb_rootMessageSent: InContextSdkMethod<Subscription['bnb_rootMessageSent'], Subscriptionbnb_rootMessageSentArgs, MeshContext>,
  /** null **/
  bnb_rootMessageSents: InContextSdkMethod<Subscription['bnb_rootMessageSents'], Subscriptionbnb_rootMessageSentsArgs, MeshContext>,
  /** null **/
  bnb_stableSwap: InContextSdkMethod<Subscription['bnb_stableSwap'], Subscriptionbnb_stableSwapArgs, MeshContext>,
  /** null **/
  bnb_stableSwaps: InContextSdkMethod<Subscription['bnb_stableSwaps'], Subscriptionbnb_stableSwapsArgs, MeshContext>,
  /** null **/
  bnb_pooledToken: InContextSdkMethod<Subscription['bnb_pooledToken'], Subscriptionbnb_pooledTokenArgs, MeshContext>,
  /** null **/
  bnb_pooledTokens: InContextSdkMethod<Subscription['bnb_pooledTokens'], Subscriptionbnb_pooledTokensArgs, MeshContext>,
  /** null **/
  bnb_stableSwapLiquidity: InContextSdkMethod<Subscription['bnb_stableSwapLiquidity'], Subscriptionbnb_stableSwapLiquidityArgs, MeshContext>,
  /** null **/
  bnb_stableSwapLiquidities: InContextSdkMethod<Subscription['bnb_stableSwapLiquidities'], Subscriptionbnb_stableSwapLiquiditiesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  bnb__meta: InContextSdkMethod<Subscription['bnb__meta'], Subscriptionbnb__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Bnb"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
