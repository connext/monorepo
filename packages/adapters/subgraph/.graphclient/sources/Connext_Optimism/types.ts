// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextOptimismTypes {
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
  optimism_BigDecimal: any;
  BigInt: any;
  optimism_Bytes: any;
};

export type optimism_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['optimism_Bytes'];
};

export type optimism_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['optimism_Bytes']>;
  root_not?: InputMaybe<Scalars['optimism_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  root_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_AggregateRoot_orderBy =
  | 'id'
  | 'root';

export type optimism_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['optimism_Bytes']>;
  canonicalId?: Maybe<Scalars['optimism_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['optimism_Bytes']>;
  localAsset?: Maybe<Scalars['optimism_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type optimism_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: optimism_Router;
  asset: optimism_Asset;
  feesEarned: Scalars['BigInt'];
};

export type optimism_AssetBalance_filter = {
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
  router_?: InputMaybe<optimism_Router_filter>;
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
  asset_?: InputMaybe<optimism_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset'
  | 'feesEarned';

export type optimism_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['optimism_Bytes']>;
  key_not?: InputMaybe<Scalars['optimism_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  key_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['optimism_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['optimism_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  localAsset?: InputMaybe<Scalars['optimism_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['optimism_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_Asset_orderBy =
  | 'id'
  | 'key'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber';

export type optimism_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type optimism_Block_height = {
  hash?: InputMaybe<Scalars['optimism_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type optimism_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['optimism_Bytes']>;
  rootManager?: Maybe<Scalars['optimism_Bytes']>;
  mirrorConnector?: Maybe<Scalars['optimism_Bytes']>;
};

export type optimism_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['optimism_Bytes']>;
  amb_not?: InputMaybe<Scalars['optimism_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  rootManager?: InputMaybe<Scalars['optimism_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['optimism_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['optimism_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['optimism_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type optimism_DestinationMessage = {
  id: Scalars['ID'];
  leaf?: Maybe<Scalars['optimism_Bytes']>;
  processed?: Maybe<Scalars['Boolean']>;
  returnData?: Maybe<Scalars['optimism_Bytes']>;
  success?: Maybe<Scalars['Boolean']>;
  transactionHash?: Maybe<Scalars['optimism_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type optimism_DestinationMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  leaf?: InputMaybe<Scalars['optimism_Bytes']>;
  leaf_not?: InputMaybe<Scalars['optimism_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  processed?: InputMaybe<Scalars['Boolean']>;
  processed_not?: InputMaybe<Scalars['Boolean']>;
  processed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  processed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  returnData?: InputMaybe<Scalars['optimism_Bytes']>;
  returnData_not?: InputMaybe<Scalars['optimism_Bytes']>;
  returnData_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  returnData_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  returnData_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  returnData_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  success?: InputMaybe<Scalars['Boolean']>;
  success_not?: InputMaybe<Scalars['Boolean']>;
  success_in?: InputMaybe<Array<Scalars['Boolean']>>;
  success_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  transactionHash?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_DestinationMessage_orderBy =
  | 'id'
  | 'leaf'
  | 'processed'
  | 'returnData'
  | 'success'
  | 'transactionHash'
  | 'blockNumber';

export type optimism_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['optimism_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<optimism_TransferStatus>;
  routers?: Maybe<Array<optimism_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['optimism_Bytes']>;
  delegate?: Maybe<Scalars['optimism_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['optimism_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['optimism_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['optimism_Bytes']>;
  asset?: Maybe<optimism_Asset>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['optimism_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['optimism_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['optimism_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['optimism_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type optimism_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_Router_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_Router_filter>;
};

export type optimism_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_not?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<optimism_TransferStatus>;
  status_not?: InputMaybe<optimism_TransferStatus>;
  status_in?: InputMaybe<Array<optimism_TransferStatus>>;
  status_not_in?: InputMaybe<Array<optimism_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<optimism_Router_filter>;
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
  to?: InputMaybe<Scalars['optimism_Bytes']>;
  to_not?: InputMaybe<Scalars['optimism_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  to_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate_not?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['optimism_Bytes']>;
  callData_not?: InputMaybe<Scalars['optimism_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['optimism_Bytes']>;
  originSender_not?: InputMaybe<Scalars['optimism_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  asset_?: InputMaybe<optimism_Asset_filter>;
  routersFee?: InputMaybe<Scalars['BigInt']>;
  routersFee_not?: InputMaybe<Scalars['BigInt']>;
  routersFee_gt?: InputMaybe<Scalars['BigInt']>;
  routersFee_lt?: InputMaybe<Scalars['BigInt']>;
  routersFee_gte?: InputMaybe<Scalars['BigInt']>;
  routersFee_lte?: InputMaybe<Scalars['BigInt']>;
  routersFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  routersFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['optimism_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['optimism_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['optimism_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['optimism_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  reconciledCaller?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_DestinationTransfer_orderBy =
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
export type optimism_OrderDirection =
  | 'asc'
  | 'desc';

export type optimism_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['optimism_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['optimism_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['optimism_Bytes']>;
  message?: Maybe<Scalars['optimism_Bytes']>;
  transactionHash?: Maybe<Scalars['optimism_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<optimism_RootCount>;
};

export type optimism_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_not?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['optimism_Bytes']>;
  leaf_not?: InputMaybe<Scalars['optimism_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  root?: InputMaybe<Scalars['optimism_Bytes']>;
  root_not?: InputMaybe<Scalars['optimism_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  root_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  message?: InputMaybe<Scalars['optimism_Bytes']>;
  message_not?: InputMaybe<Scalars['optimism_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  message_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  rootCount_?: InputMaybe<optimism_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_OriginMessage_orderBy =
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

export type optimism_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['optimism_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<optimism_TransferStatus>;
  messageHash?: Maybe<Scalars['optimism_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['optimism_Bytes']>;
  delegate?: Maybe<Scalars['optimism_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['optimism_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['optimism_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['optimism_Bytes']>;
  asset?: Maybe<optimism_Asset>;
  message?: Maybe<optimism_OriginMessage>;
  caller?: Maybe<Scalars['optimism_Bytes']>;
  transactionHash?: Maybe<Scalars['optimism_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type optimism_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_not?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<optimism_TransferStatus>;
  status_not?: InputMaybe<optimism_TransferStatus>;
  status_in?: InputMaybe<Array<optimism_TransferStatus>>;
  status_not_in?: InputMaybe<Array<optimism_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['optimism_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['optimism_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  to?: InputMaybe<Scalars['optimism_Bytes']>;
  to_not?: InputMaybe<Scalars['optimism_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  to_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate_not?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['optimism_Bytes']>;
  callData_not?: InputMaybe<Scalars['optimism_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['optimism_Bytes']>;
  originSender_not?: InputMaybe<Scalars['optimism_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  asset_?: InputMaybe<optimism_Asset_filter>;
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
  message_?: InputMaybe<optimism_OriginMessage_filter>;
  caller?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_OriginTransfer_orderBy =
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

export type optimism_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['optimism_Bytes'];
};

export type optimism_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_not?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  optimism_asset?: Maybe<optimism_Asset>;
  optimism_assets: Array<optimism_Asset>;
  optimism_assetBalance?: Maybe<optimism_AssetBalance>;
  optimism_assetBalances: Array<optimism_AssetBalance>;
  optimism_router?: Maybe<optimism_Router>;
  optimism_routers: Array<optimism_Router>;
  optimism_setting?: Maybe<optimism_Setting>;
  optimism_settings: Array<optimism_Setting>;
  optimism_relayer?: Maybe<optimism_Relayer>;
  optimism_relayers: Array<optimism_Relayer>;
  optimism_sequencer?: Maybe<optimism_Sequencer>;
  optimism_sequencers: Array<optimism_Sequencer>;
  optimism_originTransfer?: Maybe<optimism_OriginTransfer>;
  optimism_originTransfers: Array<optimism_OriginTransfer>;
  optimism_destinationTransfer?: Maybe<optimism_DestinationTransfer>;
  optimism_destinationTransfers: Array<optimism_DestinationTransfer>;
  optimism_originMessage?: Maybe<optimism_OriginMessage>;
  optimism_originMessages: Array<optimism_OriginMessage>;
  optimism_destinationMessage?: Maybe<optimism_DestinationMessage>;
  optimism_destinationMessages: Array<optimism_DestinationMessage>;
  optimism_aggregateRoot?: Maybe<optimism_AggregateRoot>;
  optimism_aggregateRoots: Array<optimism_AggregateRoot>;
  optimism_connectorMeta?: Maybe<optimism_ConnectorMeta>;
  optimism_connectorMetas: Array<optimism_ConnectorMeta>;
  optimism_rootCount?: Maybe<optimism_RootCount>;
  optimism_rootCounts: Array<optimism_RootCount>;
  optimism_rootMessageSent?: Maybe<optimism_RootMessageSent>;
  optimism_rootMessageSents: Array<optimism_RootMessageSent>;
  optimism_stableSwap?: Maybe<optimism_StableSwap>;
  optimism_stableSwaps: Array<optimism_StableSwap>;
  optimism_pooledToken?: Maybe<optimism_PooledToken>;
  optimism_pooledTokens: Array<optimism_PooledToken>;
  optimism_stableSwapLiquidity?: Maybe<optimism_StableSwapLiquidity>;
  optimism_stableSwapLiquidities: Array<optimism_StableSwapLiquidity>;
  /** Access to subgraph metadata */
  optimism__meta?: Maybe<optimism__Meta_>;
};


export type Queryoptimism_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_Asset_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_Asset_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_AssetBalance_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_Router_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_Router_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_Setting_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_Setting_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_Relayer_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_Relayer_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_Sequencer_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_Sequencer_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_OriginTransfer_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_DestinationTransfer_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_OriginMessage_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_DestinationMessage_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_AggregateRoot_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_ConnectorMeta_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_RootCount_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_RootCount_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_RootMessageSent_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_StableSwap_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_StableSwap_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_PooledToken_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_PooledToken_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_stableSwapLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_stableSwapLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_StableSwapLiquidity_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_StableSwapLiquidity_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism__metaArgs = {
  block?: InputMaybe<optimism_Block_height>;
};

export type optimism_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['optimism_Bytes']>;
};

export type optimism_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['optimism_Bytes']>;
  relayer_not?: InputMaybe<Scalars['optimism_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type optimism_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type optimism_RootCount_filter = {
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
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_RootCount_orderBy =
  | 'id'
  | 'count';

export type optimism_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['optimism_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['optimism_Bytes']>;
  transactionHash?: Maybe<Scalars['optimism_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type optimism_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['optimism_Bytes']>;
  root_not?: InputMaybe<Scalars['optimism_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  root_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_RootMessageSent_orderBy =
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

export type optimism_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['optimism_Bytes']>;
  recipient?: Maybe<Scalars['optimism_Bytes']>;
  proposedOwner?: Maybe<Scalars['optimism_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<optimism_AssetBalance>;
};


export type optimism_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_AssetBalance_filter>;
};

export type optimism_Router_filter = {
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
  owner?: InputMaybe<Scalars['optimism_Bytes']>;
  owner_not?: InputMaybe<Scalars['optimism_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  recipient?: InputMaybe<Scalars['optimism_Bytes']>;
  recipient_not?: InputMaybe<Scalars['optimism_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['optimism_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['optimism_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<optimism_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type optimism_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['optimism_Bytes']>;
};

export type optimism_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['optimism_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['optimism_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type optimism_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['optimism_Bytes'];
};

export type optimism_Setting_filter = {
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
  caller?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type optimism_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['optimism_Bytes']>;
  canonicalId?: Maybe<Scalars['optimism_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['optimism_Bytes']>;
  lpToken?: Maybe<Scalars['optimism_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<optimism_PooledToken>;
  tokenPrecisionMultipliers?: Maybe<Array<Scalars['BigInt']>>;
  balances: Array<Scalars['BigInt']>;
  adminFees?: Maybe<Array<Scalars['BigInt']>>;
};


export type optimism_StableSwappooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_PooledToken_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_PooledToken_filter>;
};

export type optimism_StableSwapLiquidity = {
  id: Scalars['ID'];
  provider: Scalars['optimism_Bytes'];
  stableSwap: optimism_StableSwap;
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply?: Maybe<Scalars['BigInt']>;
};

export type optimism_StableSwapLiquidity_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  provider?: InputMaybe<Scalars['optimism_Bytes']>;
  provider_not?: InputMaybe<Scalars['optimism_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  stableSwap_?: InputMaybe<optimism_StableSwap_filter>;
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
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_StableSwapLiquidity_orderBy =
  | 'id'
  | 'provider'
  | 'stableSwap'
  | 'tokenAmounts'
  | 'fees'
  | 'invariant'
  | 'lpTokenSupply';

export type optimism_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['optimism_Bytes']>;
  key_not?: InputMaybe<Scalars['optimism_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  key_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['optimism_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['optimism_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  lpToken?: InputMaybe<Scalars['optimism_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['optimism_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  pooledTokens_?: InputMaybe<optimism_PooledToken_filter>;
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
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_StableSwap_orderBy =
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
  optimism_asset?: Maybe<optimism_Asset>;
  optimism_assets: Array<optimism_Asset>;
  optimism_assetBalance?: Maybe<optimism_AssetBalance>;
  optimism_assetBalances: Array<optimism_AssetBalance>;
  optimism_router?: Maybe<optimism_Router>;
  optimism_routers: Array<optimism_Router>;
  optimism_setting?: Maybe<optimism_Setting>;
  optimism_settings: Array<optimism_Setting>;
  optimism_relayer?: Maybe<optimism_Relayer>;
  optimism_relayers: Array<optimism_Relayer>;
  optimism_sequencer?: Maybe<optimism_Sequencer>;
  optimism_sequencers: Array<optimism_Sequencer>;
  optimism_originTransfer?: Maybe<optimism_OriginTransfer>;
  optimism_originTransfers: Array<optimism_OriginTransfer>;
  optimism_destinationTransfer?: Maybe<optimism_DestinationTransfer>;
  optimism_destinationTransfers: Array<optimism_DestinationTransfer>;
  optimism_originMessage?: Maybe<optimism_OriginMessage>;
  optimism_originMessages: Array<optimism_OriginMessage>;
  optimism_destinationMessage?: Maybe<optimism_DestinationMessage>;
  optimism_destinationMessages: Array<optimism_DestinationMessage>;
  optimism_aggregateRoot?: Maybe<optimism_AggregateRoot>;
  optimism_aggregateRoots: Array<optimism_AggregateRoot>;
  optimism_connectorMeta?: Maybe<optimism_ConnectorMeta>;
  optimism_connectorMetas: Array<optimism_ConnectorMeta>;
  optimism_rootCount?: Maybe<optimism_RootCount>;
  optimism_rootCounts: Array<optimism_RootCount>;
  optimism_rootMessageSent?: Maybe<optimism_RootMessageSent>;
  optimism_rootMessageSents: Array<optimism_RootMessageSent>;
  optimism_stableSwap?: Maybe<optimism_StableSwap>;
  optimism_stableSwaps: Array<optimism_StableSwap>;
  optimism_pooledToken?: Maybe<optimism_PooledToken>;
  optimism_pooledTokens: Array<optimism_PooledToken>;
  optimism_stableSwapLiquidity?: Maybe<optimism_StableSwapLiquidity>;
  optimism_stableSwapLiquidities: Array<optimism_StableSwapLiquidity>;
  /** Access to subgraph metadata */
  optimism__meta?: Maybe<optimism__Meta_>;
};


export type Subscriptionoptimism_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_Asset_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_Asset_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_AssetBalance_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_Router_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_Router_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_Setting_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_Setting_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_Relayer_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_Relayer_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_Sequencer_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_Sequencer_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_OriginTransfer_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_DestinationTransfer_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_OriginMessage_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_DestinationMessage_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_AggregateRoot_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_ConnectorMeta_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_RootCount_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_RootCount_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_RootMessageSent_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_StableSwap_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_StableSwap_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_PooledToken_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_PooledToken_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_stableSwapLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_stableSwapLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_StableSwapLiquidity_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_StableSwapLiquidity_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism__metaArgs = {
  block?: InputMaybe<optimism_Block_height>;
};

export type optimism_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type optimism__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['optimism_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type optimism__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: optimism__Block_;
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
  optimism_asset: InContextSdkMethod<Query['optimism_asset'], Queryoptimism_assetArgs, MeshContext>,
  /** null **/
  optimism_assets: InContextSdkMethod<Query['optimism_assets'], Queryoptimism_assetsArgs, MeshContext>,
  /** null **/
  optimism_assetBalance: InContextSdkMethod<Query['optimism_assetBalance'], Queryoptimism_assetBalanceArgs, MeshContext>,
  /** null **/
  optimism_assetBalances: InContextSdkMethod<Query['optimism_assetBalances'], Queryoptimism_assetBalancesArgs, MeshContext>,
  /** null **/
  optimism_router: InContextSdkMethod<Query['optimism_router'], Queryoptimism_routerArgs, MeshContext>,
  /** null **/
  optimism_routers: InContextSdkMethod<Query['optimism_routers'], Queryoptimism_routersArgs, MeshContext>,
  /** null **/
  optimism_setting: InContextSdkMethod<Query['optimism_setting'], Queryoptimism_settingArgs, MeshContext>,
  /** null **/
  optimism_settings: InContextSdkMethod<Query['optimism_settings'], Queryoptimism_settingsArgs, MeshContext>,
  /** null **/
  optimism_relayer: InContextSdkMethod<Query['optimism_relayer'], Queryoptimism_relayerArgs, MeshContext>,
  /** null **/
  optimism_relayers: InContextSdkMethod<Query['optimism_relayers'], Queryoptimism_relayersArgs, MeshContext>,
  /** null **/
  optimism_sequencer: InContextSdkMethod<Query['optimism_sequencer'], Queryoptimism_sequencerArgs, MeshContext>,
  /** null **/
  optimism_sequencers: InContextSdkMethod<Query['optimism_sequencers'], Queryoptimism_sequencersArgs, MeshContext>,
  /** null **/
  optimism_originTransfer: InContextSdkMethod<Query['optimism_originTransfer'], Queryoptimism_originTransferArgs, MeshContext>,
  /** null **/
  optimism_originTransfers: InContextSdkMethod<Query['optimism_originTransfers'], Queryoptimism_originTransfersArgs, MeshContext>,
  /** null **/
  optimism_destinationTransfer: InContextSdkMethod<Query['optimism_destinationTransfer'], Queryoptimism_destinationTransferArgs, MeshContext>,
  /** null **/
  optimism_destinationTransfers: InContextSdkMethod<Query['optimism_destinationTransfers'], Queryoptimism_destinationTransfersArgs, MeshContext>,
  /** null **/
  optimism_originMessage: InContextSdkMethod<Query['optimism_originMessage'], Queryoptimism_originMessageArgs, MeshContext>,
  /** null **/
  optimism_originMessages: InContextSdkMethod<Query['optimism_originMessages'], Queryoptimism_originMessagesArgs, MeshContext>,
  /** null **/
  optimism_destinationMessage: InContextSdkMethod<Query['optimism_destinationMessage'], Queryoptimism_destinationMessageArgs, MeshContext>,
  /** null **/
  optimism_destinationMessages: InContextSdkMethod<Query['optimism_destinationMessages'], Queryoptimism_destinationMessagesArgs, MeshContext>,
  /** null **/
  optimism_aggregateRoot: InContextSdkMethod<Query['optimism_aggregateRoot'], Queryoptimism_aggregateRootArgs, MeshContext>,
  /** null **/
  optimism_aggregateRoots: InContextSdkMethod<Query['optimism_aggregateRoots'], Queryoptimism_aggregateRootsArgs, MeshContext>,
  /** null **/
  optimism_connectorMeta: InContextSdkMethod<Query['optimism_connectorMeta'], Queryoptimism_connectorMetaArgs, MeshContext>,
  /** null **/
  optimism_connectorMetas: InContextSdkMethod<Query['optimism_connectorMetas'], Queryoptimism_connectorMetasArgs, MeshContext>,
  /** null **/
  optimism_rootCount: InContextSdkMethod<Query['optimism_rootCount'], Queryoptimism_rootCountArgs, MeshContext>,
  /** null **/
  optimism_rootCounts: InContextSdkMethod<Query['optimism_rootCounts'], Queryoptimism_rootCountsArgs, MeshContext>,
  /** null **/
  optimism_rootMessageSent: InContextSdkMethod<Query['optimism_rootMessageSent'], Queryoptimism_rootMessageSentArgs, MeshContext>,
  /** null **/
  optimism_rootMessageSents: InContextSdkMethod<Query['optimism_rootMessageSents'], Queryoptimism_rootMessageSentsArgs, MeshContext>,
  /** null **/
  optimism_stableSwap: InContextSdkMethod<Query['optimism_stableSwap'], Queryoptimism_stableSwapArgs, MeshContext>,
  /** null **/
  optimism_stableSwaps: InContextSdkMethod<Query['optimism_stableSwaps'], Queryoptimism_stableSwapsArgs, MeshContext>,
  /** null **/
  optimism_pooledToken: InContextSdkMethod<Query['optimism_pooledToken'], Queryoptimism_pooledTokenArgs, MeshContext>,
  /** null **/
  optimism_pooledTokens: InContextSdkMethod<Query['optimism_pooledTokens'], Queryoptimism_pooledTokensArgs, MeshContext>,
  /** null **/
  optimism_stableSwapLiquidity: InContextSdkMethod<Query['optimism_stableSwapLiquidity'], Queryoptimism_stableSwapLiquidityArgs, MeshContext>,
  /** null **/
  optimism_stableSwapLiquidities: InContextSdkMethod<Query['optimism_stableSwapLiquidities'], Queryoptimism_stableSwapLiquiditiesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  optimism__meta: InContextSdkMethod<Query['optimism__meta'], Queryoptimism__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  optimism_asset: InContextSdkMethod<Subscription['optimism_asset'], Subscriptionoptimism_assetArgs, MeshContext>,
  /** null **/
  optimism_assets: InContextSdkMethod<Subscription['optimism_assets'], Subscriptionoptimism_assetsArgs, MeshContext>,
  /** null **/
  optimism_assetBalance: InContextSdkMethod<Subscription['optimism_assetBalance'], Subscriptionoptimism_assetBalanceArgs, MeshContext>,
  /** null **/
  optimism_assetBalances: InContextSdkMethod<Subscription['optimism_assetBalances'], Subscriptionoptimism_assetBalancesArgs, MeshContext>,
  /** null **/
  optimism_router: InContextSdkMethod<Subscription['optimism_router'], Subscriptionoptimism_routerArgs, MeshContext>,
  /** null **/
  optimism_routers: InContextSdkMethod<Subscription['optimism_routers'], Subscriptionoptimism_routersArgs, MeshContext>,
  /** null **/
  optimism_setting: InContextSdkMethod<Subscription['optimism_setting'], Subscriptionoptimism_settingArgs, MeshContext>,
  /** null **/
  optimism_settings: InContextSdkMethod<Subscription['optimism_settings'], Subscriptionoptimism_settingsArgs, MeshContext>,
  /** null **/
  optimism_relayer: InContextSdkMethod<Subscription['optimism_relayer'], Subscriptionoptimism_relayerArgs, MeshContext>,
  /** null **/
  optimism_relayers: InContextSdkMethod<Subscription['optimism_relayers'], Subscriptionoptimism_relayersArgs, MeshContext>,
  /** null **/
  optimism_sequencer: InContextSdkMethod<Subscription['optimism_sequencer'], Subscriptionoptimism_sequencerArgs, MeshContext>,
  /** null **/
  optimism_sequencers: InContextSdkMethod<Subscription['optimism_sequencers'], Subscriptionoptimism_sequencersArgs, MeshContext>,
  /** null **/
  optimism_originTransfer: InContextSdkMethod<Subscription['optimism_originTransfer'], Subscriptionoptimism_originTransferArgs, MeshContext>,
  /** null **/
  optimism_originTransfers: InContextSdkMethod<Subscription['optimism_originTransfers'], Subscriptionoptimism_originTransfersArgs, MeshContext>,
  /** null **/
  optimism_destinationTransfer: InContextSdkMethod<Subscription['optimism_destinationTransfer'], Subscriptionoptimism_destinationTransferArgs, MeshContext>,
  /** null **/
  optimism_destinationTransfers: InContextSdkMethod<Subscription['optimism_destinationTransfers'], Subscriptionoptimism_destinationTransfersArgs, MeshContext>,
  /** null **/
  optimism_originMessage: InContextSdkMethod<Subscription['optimism_originMessage'], Subscriptionoptimism_originMessageArgs, MeshContext>,
  /** null **/
  optimism_originMessages: InContextSdkMethod<Subscription['optimism_originMessages'], Subscriptionoptimism_originMessagesArgs, MeshContext>,
  /** null **/
  optimism_destinationMessage: InContextSdkMethod<Subscription['optimism_destinationMessage'], Subscriptionoptimism_destinationMessageArgs, MeshContext>,
  /** null **/
  optimism_destinationMessages: InContextSdkMethod<Subscription['optimism_destinationMessages'], Subscriptionoptimism_destinationMessagesArgs, MeshContext>,
  /** null **/
  optimism_aggregateRoot: InContextSdkMethod<Subscription['optimism_aggregateRoot'], Subscriptionoptimism_aggregateRootArgs, MeshContext>,
  /** null **/
  optimism_aggregateRoots: InContextSdkMethod<Subscription['optimism_aggregateRoots'], Subscriptionoptimism_aggregateRootsArgs, MeshContext>,
  /** null **/
  optimism_connectorMeta: InContextSdkMethod<Subscription['optimism_connectorMeta'], Subscriptionoptimism_connectorMetaArgs, MeshContext>,
  /** null **/
  optimism_connectorMetas: InContextSdkMethod<Subscription['optimism_connectorMetas'], Subscriptionoptimism_connectorMetasArgs, MeshContext>,
  /** null **/
  optimism_rootCount: InContextSdkMethod<Subscription['optimism_rootCount'], Subscriptionoptimism_rootCountArgs, MeshContext>,
  /** null **/
  optimism_rootCounts: InContextSdkMethod<Subscription['optimism_rootCounts'], Subscriptionoptimism_rootCountsArgs, MeshContext>,
  /** null **/
  optimism_rootMessageSent: InContextSdkMethod<Subscription['optimism_rootMessageSent'], Subscriptionoptimism_rootMessageSentArgs, MeshContext>,
  /** null **/
  optimism_rootMessageSents: InContextSdkMethod<Subscription['optimism_rootMessageSents'], Subscriptionoptimism_rootMessageSentsArgs, MeshContext>,
  /** null **/
  optimism_stableSwap: InContextSdkMethod<Subscription['optimism_stableSwap'], Subscriptionoptimism_stableSwapArgs, MeshContext>,
  /** null **/
  optimism_stableSwaps: InContextSdkMethod<Subscription['optimism_stableSwaps'], Subscriptionoptimism_stableSwapsArgs, MeshContext>,
  /** null **/
  optimism_pooledToken: InContextSdkMethod<Subscription['optimism_pooledToken'], Subscriptionoptimism_pooledTokenArgs, MeshContext>,
  /** null **/
  optimism_pooledTokens: InContextSdkMethod<Subscription['optimism_pooledTokens'], Subscriptionoptimism_pooledTokensArgs, MeshContext>,
  /** null **/
  optimism_stableSwapLiquidity: InContextSdkMethod<Subscription['optimism_stableSwapLiquidity'], Subscriptionoptimism_stableSwapLiquidityArgs, MeshContext>,
  /** null **/
  optimism_stableSwapLiquidities: InContextSdkMethod<Subscription['optimism_stableSwapLiquidities'], Subscriptionoptimism_stableSwapLiquiditiesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  optimism__meta: InContextSdkMethod<Subscription['optimism__meta'], Subscriptionoptimism__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Optimism"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
