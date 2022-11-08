// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextArbitrumOneTypes {
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
  arbitrumone_BigDecimal: any;
  BigInt: any;
  arbitrumone_Bytes: any;
};

export type arbitrumone_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['arbitrumone_Bytes'];
};

export type arbitrumone_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  root_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_AggregateRoot_orderBy =
  | 'id'
  | 'root';

export type arbitrumone_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['arbitrumone_Bytes']>;
  canonicalId?: Maybe<Scalars['arbitrumone_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['arbitrumone_Bytes']>;
  localAsset?: Maybe<Scalars['arbitrumone_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type arbitrumone_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: arbitrumone_Router;
  asset: arbitrumone_Asset;
  feesEarned: Scalars['BigInt'];
};

export type arbitrumone_AssetBalance_filter = {
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
  router_?: InputMaybe<arbitrumone_Router_filter>;
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
  asset_?: InputMaybe<arbitrumone_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset'
  | 'feesEarned';

export type arbitrumone_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  key_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  key_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  localAsset?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_Asset_orderBy =
  | 'id'
  | 'key'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber';

export type arbitrumone_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type arbitrumone_Block_height = {
  hash?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type arbitrumone_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['arbitrumone_Bytes']>;
  rootManager?: Maybe<Scalars['arbitrumone_Bytes']>;
  mirrorConnector?: Maybe<Scalars['arbitrumone_Bytes']>;
};

export type arbitrumone_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  amb_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  rootManager?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type arbitrumone_DestinationMessage = {
  id: Scalars['ID'];
  leaf?: Maybe<Scalars['arbitrumone_Bytes']>;
  processed?: Maybe<Scalars['Boolean']>;
  returnData?: Maybe<Scalars['arbitrumone_Bytes']>;
  success?: Maybe<Scalars['Boolean']>;
  transactionHash?: Maybe<Scalars['arbitrumone_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type arbitrumone_DestinationMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  leaf?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  leaf_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  processed?: InputMaybe<Scalars['Boolean']>;
  processed_not?: InputMaybe<Scalars['Boolean']>;
  processed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  processed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  returnData?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  returnData_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  returnData_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  returnData_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  returnData_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  returnData_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  success?: InputMaybe<Scalars['Boolean']>;
  success_not?: InputMaybe<Scalars['Boolean']>;
  success_in?: InputMaybe<Array<Scalars['Boolean']>>;
  success_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  transactionHash?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_DestinationMessage_orderBy =
  | 'id'
  | 'leaf'
  | 'processed'
  | 'returnData'
  | 'success'
  | 'transactionHash'
  | 'blockNumber';

export type arbitrumone_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['arbitrumone_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<arbitrumone_TransferStatus>;
  routers?: Maybe<Array<arbitrumone_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['arbitrumone_Bytes']>;
  delegate?: Maybe<Scalars['arbitrumone_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['arbitrumone_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['arbitrumone_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['arbitrumone_Bytes']>;
  asset?: Maybe<arbitrumone_Asset>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['arbitrumone_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['arbitrumone_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['arbitrumone_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['arbitrumone_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type arbitrumone_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_Router_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_Router_filter>;
};

export type arbitrumone_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<arbitrumone_TransferStatus>;
  status_not?: InputMaybe<arbitrumone_TransferStatus>;
  status_in?: InputMaybe<Array<arbitrumone_TransferStatus>>;
  status_not_in?: InputMaybe<Array<arbitrumone_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<arbitrumone_Router_filter>;
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
  to?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  to_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  to_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  callData_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  originSender_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  asset_?: InputMaybe<arbitrumone_Asset_filter>;
  routersFee?: InputMaybe<Scalars['BigInt']>;
  routersFee_not?: InputMaybe<Scalars['BigInt']>;
  routersFee_gt?: InputMaybe<Scalars['BigInt']>;
  routersFee_lt?: InputMaybe<Scalars['BigInt']>;
  routersFee_gte?: InputMaybe<Scalars['BigInt']>;
  routersFee_lte?: InputMaybe<Scalars['BigInt']>;
  routersFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  routersFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  reconciledCaller?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_DestinationTransfer_orderBy =
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
export type arbitrumone_OrderDirection =
  | 'asc'
  | 'desc';

export type arbitrumone_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['arbitrumone_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['arbitrumone_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['arbitrumone_Bytes']>;
  message?: Maybe<Scalars['arbitrumone_Bytes']>;
  transactionHash?: Maybe<Scalars['arbitrumone_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<arbitrumone_RootCount>;
};

export type arbitrumone_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  leaf_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  root?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  root_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  message?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  message_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  message_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  rootCount_?: InputMaybe<arbitrumone_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_OriginMessage_orderBy =
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

export type arbitrumone_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['arbitrumone_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<arbitrumone_TransferStatus>;
  messageHash?: Maybe<Scalars['arbitrumone_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['arbitrumone_Bytes']>;
  delegate?: Maybe<Scalars['arbitrumone_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['arbitrumone_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['arbitrumone_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['arbitrumone_Bytes']>;
  asset?: Maybe<arbitrumone_Asset>;
  message?: Maybe<arbitrumone_OriginMessage>;
  caller?: Maybe<Scalars['arbitrumone_Bytes']>;
  transactionHash?: Maybe<Scalars['arbitrumone_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type arbitrumone_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<arbitrumone_TransferStatus>;
  status_not?: InputMaybe<arbitrumone_TransferStatus>;
  status_in?: InputMaybe<Array<arbitrumone_TransferStatus>>;
  status_not_in?: InputMaybe<Array<arbitrumone_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  to?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  to_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  to_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  callData_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  originSender_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  asset_?: InputMaybe<arbitrumone_Asset_filter>;
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
  message_?: InputMaybe<arbitrumone_OriginMessage_filter>;
  caller?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_OriginTransfer_orderBy =
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

export type arbitrumone_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['arbitrumone_Bytes'];
};

export type arbitrumone_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  arbitrumone_asset?: Maybe<arbitrumone_Asset>;
  arbitrumone_assets: Array<arbitrumone_Asset>;
  arbitrumone_assetBalance?: Maybe<arbitrumone_AssetBalance>;
  arbitrumone_assetBalances: Array<arbitrumone_AssetBalance>;
  arbitrumone_router?: Maybe<arbitrumone_Router>;
  arbitrumone_routers: Array<arbitrumone_Router>;
  arbitrumone_setting?: Maybe<arbitrumone_Setting>;
  arbitrumone_settings: Array<arbitrumone_Setting>;
  arbitrumone_relayer?: Maybe<arbitrumone_Relayer>;
  arbitrumone_relayers: Array<arbitrumone_Relayer>;
  arbitrumone_sequencer?: Maybe<arbitrumone_Sequencer>;
  arbitrumone_sequencers: Array<arbitrumone_Sequencer>;
  arbitrumone_originTransfer?: Maybe<arbitrumone_OriginTransfer>;
  arbitrumone_originTransfers: Array<arbitrumone_OriginTransfer>;
  arbitrumone_destinationTransfer?: Maybe<arbitrumone_DestinationTransfer>;
  arbitrumone_destinationTransfers: Array<arbitrumone_DestinationTransfer>;
  arbitrumone_originMessage?: Maybe<arbitrumone_OriginMessage>;
  arbitrumone_originMessages: Array<arbitrumone_OriginMessage>;
  arbitrumone_destinationMessage?: Maybe<arbitrumone_DestinationMessage>;
  arbitrumone_destinationMessages: Array<arbitrumone_DestinationMessage>;
  arbitrumone_aggregateRoot?: Maybe<arbitrumone_AggregateRoot>;
  arbitrumone_aggregateRoots: Array<arbitrumone_AggregateRoot>;
  arbitrumone_connectorMeta?: Maybe<arbitrumone_ConnectorMeta>;
  arbitrumone_connectorMetas: Array<arbitrumone_ConnectorMeta>;
  arbitrumone_rootCount?: Maybe<arbitrumone_RootCount>;
  arbitrumone_rootCounts: Array<arbitrumone_RootCount>;
  arbitrumone_rootMessageSent?: Maybe<arbitrumone_RootMessageSent>;
  arbitrumone_rootMessageSents: Array<arbitrumone_RootMessageSent>;
  arbitrumone_stableSwap?: Maybe<arbitrumone_StableSwap>;
  arbitrumone_stableSwaps: Array<arbitrumone_StableSwap>;
  arbitrumone_pooledToken?: Maybe<arbitrumone_PooledToken>;
  arbitrumone_pooledTokens: Array<arbitrumone_PooledToken>;
  arbitrumone_stableSwapLiquidity?: Maybe<arbitrumone_StableSwapLiquidity>;
  arbitrumone_stableSwapLiquidities: Array<arbitrumone_StableSwapLiquidity>;
  /** Access to subgraph metadata */
  arbitrumone__meta?: Maybe<arbitrumone__Meta_>;
};


export type Queryarbitrumone_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_Asset_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_Asset_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_AssetBalance_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_Router_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_Router_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_Setting_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_Setting_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_Relayer_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_Relayer_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_Sequencer_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_Sequencer_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_OriginTransfer_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_DestinationTransfer_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_OriginMessage_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_DestinationMessage_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_AggregateRoot_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_ConnectorMeta_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_RootCount_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_RootCount_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_RootMessageSent_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_StableSwap_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_StableSwap_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_PooledToken_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_PooledToken_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_stableSwapLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_stableSwapLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_StableSwapLiquidity_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_StableSwapLiquidity_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone__metaArgs = {
  block?: InputMaybe<arbitrumone_Block_height>;
};

export type arbitrumone_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['arbitrumone_Bytes']>;
};

export type arbitrumone_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  relayer_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type arbitrumone_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type arbitrumone_RootCount_filter = {
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
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_RootCount_orderBy =
  | 'id'
  | 'count';

export type arbitrumone_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['arbitrumone_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['arbitrumone_Bytes']>;
  transactionHash?: Maybe<Scalars['arbitrumone_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type arbitrumone_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  root_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_RootMessageSent_orderBy =
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

export type arbitrumone_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['arbitrumone_Bytes']>;
  recipient?: Maybe<Scalars['arbitrumone_Bytes']>;
  proposedOwner?: Maybe<Scalars['arbitrumone_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<arbitrumone_AssetBalance>;
};


export type arbitrumone_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_AssetBalance_filter>;
};

export type arbitrumone_Router_filter = {
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
  owner?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  owner_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  recipient?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  recipient_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<arbitrumone_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type arbitrumone_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['arbitrumone_Bytes']>;
};

export type arbitrumone_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type arbitrumone_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['arbitrumone_Bytes'];
};

export type arbitrumone_Setting_filter = {
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
  caller?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type arbitrumone_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['arbitrumone_Bytes']>;
  canonicalId?: Maybe<Scalars['arbitrumone_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['arbitrumone_Bytes']>;
  lpToken?: Maybe<Scalars['arbitrumone_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<arbitrumone_PooledToken>;
  tokenPrecisionMultipliers?: Maybe<Array<Scalars['BigInt']>>;
  balances: Array<Scalars['BigInt']>;
  adminFees?: Maybe<Array<Scalars['BigInt']>>;
};


export type arbitrumone_StableSwappooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_PooledToken_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_PooledToken_filter>;
};

export type arbitrumone_StableSwapLiquidity = {
  id: Scalars['ID'];
  provider: Scalars['arbitrumone_Bytes'];
  stableSwap: arbitrumone_StableSwap;
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply?: Maybe<Scalars['BigInt']>;
};

export type arbitrumone_StableSwapLiquidity_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  provider?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  provider_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  stableSwap_?: InputMaybe<arbitrumone_StableSwap_filter>;
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
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_StableSwapLiquidity_orderBy =
  | 'id'
  | 'provider'
  | 'stableSwap'
  | 'tokenAmounts'
  | 'fees'
  | 'invariant'
  | 'lpTokenSupply';

export type arbitrumone_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  key_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  key_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  lpToken?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  pooledTokens_?: InputMaybe<arbitrumone_PooledToken_filter>;
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
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_StableSwap_orderBy =
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
  arbitrumone_asset?: Maybe<arbitrumone_Asset>;
  arbitrumone_assets: Array<arbitrumone_Asset>;
  arbitrumone_assetBalance?: Maybe<arbitrumone_AssetBalance>;
  arbitrumone_assetBalances: Array<arbitrumone_AssetBalance>;
  arbitrumone_router?: Maybe<arbitrumone_Router>;
  arbitrumone_routers: Array<arbitrumone_Router>;
  arbitrumone_setting?: Maybe<arbitrumone_Setting>;
  arbitrumone_settings: Array<arbitrumone_Setting>;
  arbitrumone_relayer?: Maybe<arbitrumone_Relayer>;
  arbitrumone_relayers: Array<arbitrumone_Relayer>;
  arbitrumone_sequencer?: Maybe<arbitrumone_Sequencer>;
  arbitrumone_sequencers: Array<arbitrumone_Sequencer>;
  arbitrumone_originTransfer?: Maybe<arbitrumone_OriginTransfer>;
  arbitrumone_originTransfers: Array<arbitrumone_OriginTransfer>;
  arbitrumone_destinationTransfer?: Maybe<arbitrumone_DestinationTransfer>;
  arbitrumone_destinationTransfers: Array<arbitrumone_DestinationTransfer>;
  arbitrumone_originMessage?: Maybe<arbitrumone_OriginMessage>;
  arbitrumone_originMessages: Array<arbitrumone_OriginMessage>;
  arbitrumone_destinationMessage?: Maybe<arbitrumone_DestinationMessage>;
  arbitrumone_destinationMessages: Array<arbitrumone_DestinationMessage>;
  arbitrumone_aggregateRoot?: Maybe<arbitrumone_AggregateRoot>;
  arbitrumone_aggregateRoots: Array<arbitrumone_AggregateRoot>;
  arbitrumone_connectorMeta?: Maybe<arbitrumone_ConnectorMeta>;
  arbitrumone_connectorMetas: Array<arbitrumone_ConnectorMeta>;
  arbitrumone_rootCount?: Maybe<arbitrumone_RootCount>;
  arbitrumone_rootCounts: Array<arbitrumone_RootCount>;
  arbitrumone_rootMessageSent?: Maybe<arbitrumone_RootMessageSent>;
  arbitrumone_rootMessageSents: Array<arbitrumone_RootMessageSent>;
  arbitrumone_stableSwap?: Maybe<arbitrumone_StableSwap>;
  arbitrumone_stableSwaps: Array<arbitrumone_StableSwap>;
  arbitrumone_pooledToken?: Maybe<arbitrumone_PooledToken>;
  arbitrumone_pooledTokens: Array<arbitrumone_PooledToken>;
  arbitrumone_stableSwapLiquidity?: Maybe<arbitrumone_StableSwapLiquidity>;
  arbitrumone_stableSwapLiquidities: Array<arbitrumone_StableSwapLiquidity>;
  /** Access to subgraph metadata */
  arbitrumone__meta?: Maybe<arbitrumone__Meta_>;
};


export type Subscriptionarbitrumone_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_Asset_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_Asset_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_AssetBalance_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_Router_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_Router_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_Setting_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_Setting_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_Relayer_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_Relayer_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_Sequencer_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_Sequencer_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_OriginTransfer_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_DestinationTransfer_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_OriginMessage_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_DestinationMessage_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_AggregateRoot_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_ConnectorMeta_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_RootCount_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_RootCount_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_RootMessageSent_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_StableSwap_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_StableSwap_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_PooledToken_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_PooledToken_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_stableSwapLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_stableSwapLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_StableSwapLiquidity_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_StableSwapLiquidity_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone__metaArgs = {
  block?: InputMaybe<arbitrumone_Block_height>;
};

export type arbitrumone_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type arbitrumone__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['arbitrumone_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type arbitrumone__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: arbitrumone__Block_;
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
  arbitrumone_asset: InContextSdkMethod<Query['arbitrumone_asset'], Queryarbitrumone_assetArgs, MeshContext>,
  /** null **/
  arbitrumone_assets: InContextSdkMethod<Query['arbitrumone_assets'], Queryarbitrumone_assetsArgs, MeshContext>,
  /** null **/
  arbitrumone_assetBalance: InContextSdkMethod<Query['arbitrumone_assetBalance'], Queryarbitrumone_assetBalanceArgs, MeshContext>,
  /** null **/
  arbitrumone_assetBalances: InContextSdkMethod<Query['arbitrumone_assetBalances'], Queryarbitrumone_assetBalancesArgs, MeshContext>,
  /** null **/
  arbitrumone_router: InContextSdkMethod<Query['arbitrumone_router'], Queryarbitrumone_routerArgs, MeshContext>,
  /** null **/
  arbitrumone_routers: InContextSdkMethod<Query['arbitrumone_routers'], Queryarbitrumone_routersArgs, MeshContext>,
  /** null **/
  arbitrumone_setting: InContextSdkMethod<Query['arbitrumone_setting'], Queryarbitrumone_settingArgs, MeshContext>,
  /** null **/
  arbitrumone_settings: InContextSdkMethod<Query['arbitrumone_settings'], Queryarbitrumone_settingsArgs, MeshContext>,
  /** null **/
  arbitrumone_relayer: InContextSdkMethod<Query['arbitrumone_relayer'], Queryarbitrumone_relayerArgs, MeshContext>,
  /** null **/
  arbitrumone_relayers: InContextSdkMethod<Query['arbitrumone_relayers'], Queryarbitrumone_relayersArgs, MeshContext>,
  /** null **/
  arbitrumone_sequencer: InContextSdkMethod<Query['arbitrumone_sequencer'], Queryarbitrumone_sequencerArgs, MeshContext>,
  /** null **/
  arbitrumone_sequencers: InContextSdkMethod<Query['arbitrumone_sequencers'], Queryarbitrumone_sequencersArgs, MeshContext>,
  /** null **/
  arbitrumone_originTransfer: InContextSdkMethod<Query['arbitrumone_originTransfer'], Queryarbitrumone_originTransferArgs, MeshContext>,
  /** null **/
  arbitrumone_originTransfers: InContextSdkMethod<Query['arbitrumone_originTransfers'], Queryarbitrumone_originTransfersArgs, MeshContext>,
  /** null **/
  arbitrumone_destinationTransfer: InContextSdkMethod<Query['arbitrumone_destinationTransfer'], Queryarbitrumone_destinationTransferArgs, MeshContext>,
  /** null **/
  arbitrumone_destinationTransfers: InContextSdkMethod<Query['arbitrumone_destinationTransfers'], Queryarbitrumone_destinationTransfersArgs, MeshContext>,
  /** null **/
  arbitrumone_originMessage: InContextSdkMethod<Query['arbitrumone_originMessage'], Queryarbitrumone_originMessageArgs, MeshContext>,
  /** null **/
  arbitrumone_originMessages: InContextSdkMethod<Query['arbitrumone_originMessages'], Queryarbitrumone_originMessagesArgs, MeshContext>,
  /** null **/
  arbitrumone_destinationMessage: InContextSdkMethod<Query['arbitrumone_destinationMessage'], Queryarbitrumone_destinationMessageArgs, MeshContext>,
  /** null **/
  arbitrumone_destinationMessages: InContextSdkMethod<Query['arbitrumone_destinationMessages'], Queryarbitrumone_destinationMessagesArgs, MeshContext>,
  /** null **/
  arbitrumone_aggregateRoot: InContextSdkMethod<Query['arbitrumone_aggregateRoot'], Queryarbitrumone_aggregateRootArgs, MeshContext>,
  /** null **/
  arbitrumone_aggregateRoots: InContextSdkMethod<Query['arbitrumone_aggregateRoots'], Queryarbitrumone_aggregateRootsArgs, MeshContext>,
  /** null **/
  arbitrumone_connectorMeta: InContextSdkMethod<Query['arbitrumone_connectorMeta'], Queryarbitrumone_connectorMetaArgs, MeshContext>,
  /** null **/
  arbitrumone_connectorMetas: InContextSdkMethod<Query['arbitrumone_connectorMetas'], Queryarbitrumone_connectorMetasArgs, MeshContext>,
  /** null **/
  arbitrumone_rootCount: InContextSdkMethod<Query['arbitrumone_rootCount'], Queryarbitrumone_rootCountArgs, MeshContext>,
  /** null **/
  arbitrumone_rootCounts: InContextSdkMethod<Query['arbitrumone_rootCounts'], Queryarbitrumone_rootCountsArgs, MeshContext>,
  /** null **/
  arbitrumone_rootMessageSent: InContextSdkMethod<Query['arbitrumone_rootMessageSent'], Queryarbitrumone_rootMessageSentArgs, MeshContext>,
  /** null **/
  arbitrumone_rootMessageSents: InContextSdkMethod<Query['arbitrumone_rootMessageSents'], Queryarbitrumone_rootMessageSentsArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwap: InContextSdkMethod<Query['arbitrumone_stableSwap'], Queryarbitrumone_stableSwapArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwaps: InContextSdkMethod<Query['arbitrumone_stableSwaps'], Queryarbitrumone_stableSwapsArgs, MeshContext>,
  /** null **/
  arbitrumone_pooledToken: InContextSdkMethod<Query['arbitrumone_pooledToken'], Queryarbitrumone_pooledTokenArgs, MeshContext>,
  /** null **/
  arbitrumone_pooledTokens: InContextSdkMethod<Query['arbitrumone_pooledTokens'], Queryarbitrumone_pooledTokensArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwapLiquidity: InContextSdkMethod<Query['arbitrumone_stableSwapLiquidity'], Queryarbitrumone_stableSwapLiquidityArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwapLiquidities: InContextSdkMethod<Query['arbitrumone_stableSwapLiquidities'], Queryarbitrumone_stableSwapLiquiditiesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  arbitrumone__meta: InContextSdkMethod<Query['arbitrumone__meta'], Queryarbitrumone__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  arbitrumone_asset: InContextSdkMethod<Subscription['arbitrumone_asset'], Subscriptionarbitrumone_assetArgs, MeshContext>,
  /** null **/
  arbitrumone_assets: InContextSdkMethod<Subscription['arbitrumone_assets'], Subscriptionarbitrumone_assetsArgs, MeshContext>,
  /** null **/
  arbitrumone_assetBalance: InContextSdkMethod<Subscription['arbitrumone_assetBalance'], Subscriptionarbitrumone_assetBalanceArgs, MeshContext>,
  /** null **/
  arbitrumone_assetBalances: InContextSdkMethod<Subscription['arbitrumone_assetBalances'], Subscriptionarbitrumone_assetBalancesArgs, MeshContext>,
  /** null **/
  arbitrumone_router: InContextSdkMethod<Subscription['arbitrumone_router'], Subscriptionarbitrumone_routerArgs, MeshContext>,
  /** null **/
  arbitrumone_routers: InContextSdkMethod<Subscription['arbitrumone_routers'], Subscriptionarbitrumone_routersArgs, MeshContext>,
  /** null **/
  arbitrumone_setting: InContextSdkMethod<Subscription['arbitrumone_setting'], Subscriptionarbitrumone_settingArgs, MeshContext>,
  /** null **/
  arbitrumone_settings: InContextSdkMethod<Subscription['arbitrumone_settings'], Subscriptionarbitrumone_settingsArgs, MeshContext>,
  /** null **/
  arbitrumone_relayer: InContextSdkMethod<Subscription['arbitrumone_relayer'], Subscriptionarbitrumone_relayerArgs, MeshContext>,
  /** null **/
  arbitrumone_relayers: InContextSdkMethod<Subscription['arbitrumone_relayers'], Subscriptionarbitrumone_relayersArgs, MeshContext>,
  /** null **/
  arbitrumone_sequencer: InContextSdkMethod<Subscription['arbitrumone_sequencer'], Subscriptionarbitrumone_sequencerArgs, MeshContext>,
  /** null **/
  arbitrumone_sequencers: InContextSdkMethod<Subscription['arbitrumone_sequencers'], Subscriptionarbitrumone_sequencersArgs, MeshContext>,
  /** null **/
  arbitrumone_originTransfer: InContextSdkMethod<Subscription['arbitrumone_originTransfer'], Subscriptionarbitrumone_originTransferArgs, MeshContext>,
  /** null **/
  arbitrumone_originTransfers: InContextSdkMethod<Subscription['arbitrumone_originTransfers'], Subscriptionarbitrumone_originTransfersArgs, MeshContext>,
  /** null **/
  arbitrumone_destinationTransfer: InContextSdkMethod<Subscription['arbitrumone_destinationTransfer'], Subscriptionarbitrumone_destinationTransferArgs, MeshContext>,
  /** null **/
  arbitrumone_destinationTransfers: InContextSdkMethod<Subscription['arbitrumone_destinationTransfers'], Subscriptionarbitrumone_destinationTransfersArgs, MeshContext>,
  /** null **/
  arbitrumone_originMessage: InContextSdkMethod<Subscription['arbitrumone_originMessage'], Subscriptionarbitrumone_originMessageArgs, MeshContext>,
  /** null **/
  arbitrumone_originMessages: InContextSdkMethod<Subscription['arbitrumone_originMessages'], Subscriptionarbitrumone_originMessagesArgs, MeshContext>,
  /** null **/
  arbitrumone_destinationMessage: InContextSdkMethod<Subscription['arbitrumone_destinationMessage'], Subscriptionarbitrumone_destinationMessageArgs, MeshContext>,
  /** null **/
  arbitrumone_destinationMessages: InContextSdkMethod<Subscription['arbitrumone_destinationMessages'], Subscriptionarbitrumone_destinationMessagesArgs, MeshContext>,
  /** null **/
  arbitrumone_aggregateRoot: InContextSdkMethod<Subscription['arbitrumone_aggregateRoot'], Subscriptionarbitrumone_aggregateRootArgs, MeshContext>,
  /** null **/
  arbitrumone_aggregateRoots: InContextSdkMethod<Subscription['arbitrumone_aggregateRoots'], Subscriptionarbitrumone_aggregateRootsArgs, MeshContext>,
  /** null **/
  arbitrumone_connectorMeta: InContextSdkMethod<Subscription['arbitrumone_connectorMeta'], Subscriptionarbitrumone_connectorMetaArgs, MeshContext>,
  /** null **/
  arbitrumone_connectorMetas: InContextSdkMethod<Subscription['arbitrumone_connectorMetas'], Subscriptionarbitrumone_connectorMetasArgs, MeshContext>,
  /** null **/
  arbitrumone_rootCount: InContextSdkMethod<Subscription['arbitrumone_rootCount'], Subscriptionarbitrumone_rootCountArgs, MeshContext>,
  /** null **/
  arbitrumone_rootCounts: InContextSdkMethod<Subscription['arbitrumone_rootCounts'], Subscriptionarbitrumone_rootCountsArgs, MeshContext>,
  /** null **/
  arbitrumone_rootMessageSent: InContextSdkMethod<Subscription['arbitrumone_rootMessageSent'], Subscriptionarbitrumone_rootMessageSentArgs, MeshContext>,
  /** null **/
  arbitrumone_rootMessageSents: InContextSdkMethod<Subscription['arbitrumone_rootMessageSents'], Subscriptionarbitrumone_rootMessageSentsArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwap: InContextSdkMethod<Subscription['arbitrumone_stableSwap'], Subscriptionarbitrumone_stableSwapArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwaps: InContextSdkMethod<Subscription['arbitrumone_stableSwaps'], Subscriptionarbitrumone_stableSwapsArgs, MeshContext>,
  /** null **/
  arbitrumone_pooledToken: InContextSdkMethod<Subscription['arbitrumone_pooledToken'], Subscriptionarbitrumone_pooledTokenArgs, MeshContext>,
  /** null **/
  arbitrumone_pooledTokens: InContextSdkMethod<Subscription['arbitrumone_pooledTokens'], Subscriptionarbitrumone_pooledTokensArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwapLiquidity: InContextSdkMethod<Subscription['arbitrumone_stableSwapLiquidity'], Subscriptionarbitrumone_stableSwapLiquidityArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwapLiquidities: InContextSdkMethod<Subscription['arbitrumone_stableSwapLiquidities'], Subscriptionarbitrumone_stableSwapLiquiditiesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  arbitrumone__meta: InContextSdkMethod<Subscription['arbitrumone__meta'], Subscriptionarbitrumone__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_ArbitrumOne"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
