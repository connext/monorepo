// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextOptimismGoerliTypes {
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
  optimismgoerli_BigDecimal: any;
  BigInt: any;
  optimismgoerli_Bytes: any;
};

export type optimismgoerli_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['optimismgoerli_Bytes'];
};

export type optimismgoerli_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_AggregateRoot_orderBy =
  | 'id'
  | 'root';

export type optimismgoerli_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId?: Maybe<Scalars['optimismgoerli_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['optimismgoerli_Bytes']>;
  localAsset?: Maybe<Scalars['optimismgoerli_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type optimismgoerli_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: optimismgoerli_Router;
  asset: optimismgoerli_Asset;
  feesEarned: Scalars['BigInt'];
};

export type optimismgoerli_AssetBalance_filter = {
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
  router_?: InputMaybe<optimismgoerli_Router_filter>;
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
  asset_?: InputMaybe<optimismgoerli_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset'
  | 'feesEarned';

export type optimismgoerli_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  key_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  key_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  localAsset?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_Asset_orderBy =
  | 'id'
  | 'key'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber';

export type optimismgoerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type optimismgoerli_Block_height = {
  hash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type optimismgoerli_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['optimismgoerli_Bytes']>;
  rootManager?: Maybe<Scalars['optimismgoerli_Bytes']>;
  mirrorConnector?: Maybe<Scalars['optimismgoerli_Bytes']>;
};

export type optimismgoerli_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type optimismgoerli_DestinationMessage = {
  id: Scalars['ID'];
  leaf?: Maybe<Scalars['optimismgoerli_Bytes']>;
  processed?: Maybe<Scalars['Boolean']>;
  returnData?: Maybe<Scalars['optimismgoerli_Bytes']>;
  success?: Maybe<Scalars['Boolean']>;
  transactionHash?: Maybe<Scalars['optimismgoerli_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type optimismgoerli_DestinationMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  leaf?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  leaf_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  processed?: InputMaybe<Scalars['Boolean']>;
  processed_not?: InputMaybe<Scalars['Boolean']>;
  processed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  processed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  returnData?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  returnData_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  returnData_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  returnData_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  returnData_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  returnData_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  success?: InputMaybe<Scalars['Boolean']>;
  success_not?: InputMaybe<Scalars['Boolean']>;
  success_in?: InputMaybe<Array<Scalars['Boolean']>>;
  success_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  transactionHash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_DestinationMessage_orderBy =
  | 'id'
  | 'leaf'
  | 'processed'
  | 'returnData'
  | 'success'
  | 'transactionHash'
  | 'blockNumber';

export type optimismgoerli_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['optimismgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<optimismgoerli_TransferStatus>;
  routers?: Maybe<Array<optimismgoerli_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['optimismgoerli_Bytes']>;
  delegate?: Maybe<Scalars['optimismgoerli_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['optimismgoerli_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['optimismgoerli_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['optimismgoerli_Bytes']>;
  asset?: Maybe<optimismgoerli_Asset>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['optimismgoerli_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['optimismgoerli_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type optimismgoerli_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Router_filter>;
};

export type optimismgoerli_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<optimismgoerli_TransferStatus>;
  status_not?: InputMaybe<optimismgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<optimismgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<optimismgoerli_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<optimismgoerli_Router_filter>;
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
  to?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  asset_?: InputMaybe<optimismgoerli_Asset_filter>;
  routersFee?: InputMaybe<Scalars['BigInt']>;
  routersFee_not?: InputMaybe<Scalars['BigInt']>;
  routersFee_gt?: InputMaybe<Scalars['BigInt']>;
  routersFee_lt?: InputMaybe<Scalars['BigInt']>;
  routersFee_gte?: InputMaybe<Scalars['BigInt']>;
  routersFee_lte?: InputMaybe<Scalars['BigInt']>;
  routersFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  routersFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  reconciledCaller?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_DestinationTransfer_orderBy =
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
export type optimismgoerli_OrderDirection =
  | 'asc'
  | 'desc';

export type optimismgoerli_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['optimismgoerli_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['optimismgoerli_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['optimismgoerli_Bytes']>;
  message?: Maybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['optimismgoerli_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<optimismgoerli_RootCount>;
};

export type optimismgoerli_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  leaf_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  root?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  message?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  message_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  message_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  rootCount_?: InputMaybe<optimismgoerli_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_OriginMessage_orderBy =
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

export type optimismgoerli_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['optimismgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<optimismgoerli_TransferStatus>;
  messageHash?: Maybe<Scalars['optimismgoerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['optimismgoerli_Bytes']>;
  delegate?: Maybe<Scalars['optimismgoerli_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['optimismgoerli_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['optimismgoerli_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['optimismgoerli_Bytes']>;
  asset?: Maybe<optimismgoerli_Asset>;
  message?: Maybe<optimismgoerli_OriginMessage>;
  caller?: Maybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['optimismgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type optimismgoerli_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<optimismgoerli_TransferStatus>;
  status_not?: InputMaybe<optimismgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<optimismgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<optimismgoerli_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  to?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  asset_?: InputMaybe<optimismgoerli_Asset_filter>;
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
  message_?: InputMaybe<optimismgoerli_OriginMessage_filter>;
  caller?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_OriginTransfer_orderBy =
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

export type optimismgoerli_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['optimismgoerli_Bytes'];
};

export type optimismgoerli_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  asset_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  optimismgoerli_asset?: Maybe<optimismgoerli_Asset>;
  optimismgoerli_assets: Array<optimismgoerli_Asset>;
  optimismgoerli_assetBalance?: Maybe<optimismgoerli_AssetBalance>;
  optimismgoerli_assetBalances: Array<optimismgoerli_AssetBalance>;
  optimismgoerli_router?: Maybe<optimismgoerli_Router>;
  optimismgoerli_routers: Array<optimismgoerli_Router>;
  optimismgoerli_setting?: Maybe<optimismgoerli_Setting>;
  optimismgoerli_settings: Array<optimismgoerli_Setting>;
  optimismgoerli_relayer?: Maybe<optimismgoerli_Relayer>;
  optimismgoerli_relayers: Array<optimismgoerli_Relayer>;
  optimismgoerli_sequencer?: Maybe<optimismgoerli_Sequencer>;
  optimismgoerli_sequencers: Array<optimismgoerli_Sequencer>;
  optimismgoerli_originTransfer?: Maybe<optimismgoerli_OriginTransfer>;
  optimismgoerli_originTransfers: Array<optimismgoerli_OriginTransfer>;
  optimismgoerli_destinationTransfer?: Maybe<optimismgoerli_DestinationTransfer>;
  optimismgoerli_destinationTransfers: Array<optimismgoerli_DestinationTransfer>;
  optimismgoerli_originMessage?: Maybe<optimismgoerli_OriginMessage>;
  optimismgoerli_originMessages: Array<optimismgoerli_OriginMessage>;
  optimismgoerli_destinationMessage?: Maybe<optimismgoerli_DestinationMessage>;
  optimismgoerli_destinationMessages: Array<optimismgoerli_DestinationMessage>;
  optimismgoerli_aggregateRoot?: Maybe<optimismgoerli_AggregateRoot>;
  optimismgoerli_aggregateRoots: Array<optimismgoerli_AggregateRoot>;
  optimismgoerli_connectorMeta?: Maybe<optimismgoerli_ConnectorMeta>;
  optimismgoerli_connectorMetas: Array<optimismgoerli_ConnectorMeta>;
  optimismgoerli_rootCount?: Maybe<optimismgoerli_RootCount>;
  optimismgoerli_rootCounts: Array<optimismgoerli_RootCount>;
  optimismgoerli_rootMessageSent?: Maybe<optimismgoerli_RootMessageSent>;
  optimismgoerli_rootMessageSents: Array<optimismgoerli_RootMessageSent>;
  optimismgoerli_stableSwap?: Maybe<optimismgoerli_StableSwap>;
  optimismgoerli_stableSwaps: Array<optimismgoerli_StableSwap>;
  optimismgoerli_pooledToken?: Maybe<optimismgoerli_PooledToken>;
  optimismgoerli_pooledTokens: Array<optimismgoerli_PooledToken>;
  optimismgoerli_stableSwapLiquidity?: Maybe<optimismgoerli_StableSwapLiquidity>;
  optimismgoerli_stableSwapLiquidities: Array<optimismgoerli_StableSwapLiquidity>;
  /** Access to subgraph metadata */
  optimismgoerli__meta?: Maybe<optimismgoerli__Meta_>;
};


export type Queryoptimismgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Asset_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_AssetBalance_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Router_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Setting_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Relayer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Sequencer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Sequencer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_OriginTransfer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_OriginMessage_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_DestinationMessage_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_AggregateRoot_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_ConnectorMeta_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_RootCount_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_RootCount_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_RootMessageSent_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_StableSwap_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_PooledToken_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_PooledToken_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_stableSwapLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_stableSwapLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_StableSwapLiquidity_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_StableSwapLiquidity_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli__metaArgs = {
  block?: InputMaybe<optimismgoerli_Block_height>;
};

export type optimismgoerli_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['optimismgoerli_Bytes']>;
};

export type optimismgoerli_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  relayer_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type optimismgoerli_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type optimismgoerli_RootCount_filter = {
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
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_RootCount_orderBy =
  | 'id'
  | 'count';

export type optimismgoerli_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['optimismgoerli_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['optimismgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type optimismgoerli_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_RootMessageSent_orderBy =
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

export type optimismgoerli_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['optimismgoerli_Bytes']>;
  recipient?: Maybe<Scalars['optimismgoerli_Bytes']>;
  proposedOwner?: Maybe<Scalars['optimismgoerli_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<optimismgoerli_AssetBalance>;
};


export type optimismgoerli_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_AssetBalance_filter>;
};

export type optimismgoerli_Router_filter = {
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
  owner?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  owner_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  recipient?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  recipient_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<optimismgoerli_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type optimismgoerli_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['optimismgoerli_Bytes']>;
};

export type optimismgoerli_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type optimismgoerli_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['optimismgoerli_Bytes'];
};

export type optimismgoerli_Setting_filter = {
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
  caller?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type optimismgoerli_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId?: Maybe<Scalars['optimismgoerli_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['optimismgoerli_Bytes']>;
  lpToken?: Maybe<Scalars['optimismgoerli_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<optimismgoerli_PooledToken>;
  tokenPrecisionMultipliers?: Maybe<Array<Scalars['BigInt']>>;
  balances: Array<Scalars['BigInt']>;
  adminFees?: Maybe<Array<Scalars['BigInt']>>;
};


export type optimismgoerli_StableSwappooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_PooledToken_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_PooledToken_filter>;
};

export type optimismgoerli_StableSwapLiquidity = {
  id: Scalars['ID'];
  provider: Scalars['optimismgoerli_Bytes'];
  stableSwap: optimismgoerli_StableSwap;
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply?: Maybe<Scalars['BigInt']>;
};

export type optimismgoerli_StableSwapLiquidity_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  provider?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  provider_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  stableSwap_?: InputMaybe<optimismgoerli_StableSwap_filter>;
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
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_StableSwapLiquidity_orderBy =
  | 'id'
  | 'provider'
  | 'stableSwap'
  | 'tokenAmounts'
  | 'fees'
  | 'invariant'
  | 'lpTokenSupply';

export type optimismgoerli_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  key_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  key_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  lpToken?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  pooledTokens_?: InputMaybe<optimismgoerli_PooledToken_filter>;
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
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_StableSwap_orderBy =
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
  optimismgoerli_asset?: Maybe<optimismgoerli_Asset>;
  optimismgoerli_assets: Array<optimismgoerli_Asset>;
  optimismgoerli_assetBalance?: Maybe<optimismgoerli_AssetBalance>;
  optimismgoerli_assetBalances: Array<optimismgoerli_AssetBalance>;
  optimismgoerli_router?: Maybe<optimismgoerli_Router>;
  optimismgoerli_routers: Array<optimismgoerli_Router>;
  optimismgoerli_setting?: Maybe<optimismgoerli_Setting>;
  optimismgoerli_settings: Array<optimismgoerli_Setting>;
  optimismgoerli_relayer?: Maybe<optimismgoerli_Relayer>;
  optimismgoerli_relayers: Array<optimismgoerli_Relayer>;
  optimismgoerli_sequencer?: Maybe<optimismgoerli_Sequencer>;
  optimismgoerli_sequencers: Array<optimismgoerli_Sequencer>;
  optimismgoerli_originTransfer?: Maybe<optimismgoerli_OriginTransfer>;
  optimismgoerli_originTransfers: Array<optimismgoerli_OriginTransfer>;
  optimismgoerli_destinationTransfer?: Maybe<optimismgoerli_DestinationTransfer>;
  optimismgoerli_destinationTransfers: Array<optimismgoerli_DestinationTransfer>;
  optimismgoerli_originMessage?: Maybe<optimismgoerli_OriginMessage>;
  optimismgoerli_originMessages: Array<optimismgoerli_OriginMessage>;
  optimismgoerli_destinationMessage?: Maybe<optimismgoerli_DestinationMessage>;
  optimismgoerli_destinationMessages: Array<optimismgoerli_DestinationMessage>;
  optimismgoerli_aggregateRoot?: Maybe<optimismgoerli_AggregateRoot>;
  optimismgoerli_aggregateRoots: Array<optimismgoerli_AggregateRoot>;
  optimismgoerli_connectorMeta?: Maybe<optimismgoerli_ConnectorMeta>;
  optimismgoerli_connectorMetas: Array<optimismgoerli_ConnectorMeta>;
  optimismgoerli_rootCount?: Maybe<optimismgoerli_RootCount>;
  optimismgoerli_rootCounts: Array<optimismgoerli_RootCount>;
  optimismgoerli_rootMessageSent?: Maybe<optimismgoerli_RootMessageSent>;
  optimismgoerli_rootMessageSents: Array<optimismgoerli_RootMessageSent>;
  optimismgoerli_stableSwap?: Maybe<optimismgoerli_StableSwap>;
  optimismgoerli_stableSwaps: Array<optimismgoerli_StableSwap>;
  optimismgoerli_pooledToken?: Maybe<optimismgoerli_PooledToken>;
  optimismgoerli_pooledTokens: Array<optimismgoerli_PooledToken>;
  optimismgoerli_stableSwapLiquidity?: Maybe<optimismgoerli_StableSwapLiquidity>;
  optimismgoerli_stableSwapLiquidities: Array<optimismgoerli_StableSwapLiquidity>;
  /** Access to subgraph metadata */
  optimismgoerli__meta?: Maybe<optimismgoerli__Meta_>;
};


export type Subscriptionoptimismgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Asset_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_AssetBalance_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Router_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Setting_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Relayer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Sequencer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Sequencer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_OriginTransfer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_OriginMessage_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_DestinationMessage_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_AggregateRoot_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_ConnectorMeta_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_RootCount_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_RootCount_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_RootMessageSent_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_StableSwap_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_PooledToken_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_PooledToken_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_stableSwapLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_stableSwapLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_StableSwapLiquidity_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_StableSwapLiquidity_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli__metaArgs = {
  block?: InputMaybe<optimismgoerli_Block_height>;
};

export type optimismgoerli_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type optimismgoerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['optimismgoerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type optimismgoerli__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: optimismgoerli__Block_;
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
  optimismgoerli_asset: InContextSdkMethod<Query['optimismgoerli_asset'], Queryoptimismgoerli_assetArgs, MeshContext>,
  /** null **/
  optimismgoerli_assets: InContextSdkMethod<Query['optimismgoerli_assets'], Queryoptimismgoerli_assetsArgs, MeshContext>,
  /** null **/
  optimismgoerli_assetBalance: InContextSdkMethod<Query['optimismgoerli_assetBalance'], Queryoptimismgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  optimismgoerli_assetBalances: InContextSdkMethod<Query['optimismgoerli_assetBalances'], Queryoptimismgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  optimismgoerli_router: InContextSdkMethod<Query['optimismgoerli_router'], Queryoptimismgoerli_routerArgs, MeshContext>,
  /** null **/
  optimismgoerli_routers: InContextSdkMethod<Query['optimismgoerli_routers'], Queryoptimismgoerli_routersArgs, MeshContext>,
  /** null **/
  optimismgoerli_setting: InContextSdkMethod<Query['optimismgoerli_setting'], Queryoptimismgoerli_settingArgs, MeshContext>,
  /** null **/
  optimismgoerli_settings: InContextSdkMethod<Query['optimismgoerli_settings'], Queryoptimismgoerli_settingsArgs, MeshContext>,
  /** null **/
  optimismgoerli_relayer: InContextSdkMethod<Query['optimismgoerli_relayer'], Queryoptimismgoerli_relayerArgs, MeshContext>,
  /** null **/
  optimismgoerli_relayers: InContextSdkMethod<Query['optimismgoerli_relayers'], Queryoptimismgoerli_relayersArgs, MeshContext>,
  /** null **/
  optimismgoerli_sequencer: InContextSdkMethod<Query['optimismgoerli_sequencer'], Queryoptimismgoerli_sequencerArgs, MeshContext>,
  /** null **/
  optimismgoerli_sequencers: InContextSdkMethod<Query['optimismgoerli_sequencers'], Queryoptimismgoerli_sequencersArgs, MeshContext>,
  /** null **/
  optimismgoerli_originTransfer: InContextSdkMethod<Query['optimismgoerli_originTransfer'], Queryoptimismgoerli_originTransferArgs, MeshContext>,
  /** null **/
  optimismgoerli_originTransfers: InContextSdkMethod<Query['optimismgoerli_originTransfers'], Queryoptimismgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  optimismgoerli_destinationTransfer: InContextSdkMethod<Query['optimismgoerli_destinationTransfer'], Queryoptimismgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  optimismgoerli_destinationTransfers: InContextSdkMethod<Query['optimismgoerli_destinationTransfers'], Queryoptimismgoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  optimismgoerli_originMessage: InContextSdkMethod<Query['optimismgoerli_originMessage'], Queryoptimismgoerli_originMessageArgs, MeshContext>,
  /** null **/
  optimismgoerli_originMessages: InContextSdkMethod<Query['optimismgoerli_originMessages'], Queryoptimismgoerli_originMessagesArgs, MeshContext>,
  /** null **/
  optimismgoerli_destinationMessage: InContextSdkMethod<Query['optimismgoerli_destinationMessage'], Queryoptimismgoerli_destinationMessageArgs, MeshContext>,
  /** null **/
  optimismgoerli_destinationMessages: InContextSdkMethod<Query['optimismgoerli_destinationMessages'], Queryoptimismgoerli_destinationMessagesArgs, MeshContext>,
  /** null **/
  optimismgoerli_aggregateRoot: InContextSdkMethod<Query['optimismgoerli_aggregateRoot'], Queryoptimismgoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  optimismgoerli_aggregateRoots: InContextSdkMethod<Query['optimismgoerli_aggregateRoots'], Queryoptimismgoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  optimismgoerli_connectorMeta: InContextSdkMethod<Query['optimismgoerli_connectorMeta'], Queryoptimismgoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  optimismgoerli_connectorMetas: InContextSdkMethod<Query['optimismgoerli_connectorMetas'], Queryoptimismgoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  optimismgoerli_rootCount: InContextSdkMethod<Query['optimismgoerli_rootCount'], Queryoptimismgoerli_rootCountArgs, MeshContext>,
  /** null **/
  optimismgoerli_rootCounts: InContextSdkMethod<Query['optimismgoerli_rootCounts'], Queryoptimismgoerli_rootCountsArgs, MeshContext>,
  /** null **/
  optimismgoerli_rootMessageSent: InContextSdkMethod<Query['optimismgoerli_rootMessageSent'], Queryoptimismgoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  optimismgoerli_rootMessageSents: InContextSdkMethod<Query['optimismgoerli_rootMessageSents'], Queryoptimismgoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  optimismgoerli_stableSwap: InContextSdkMethod<Query['optimismgoerli_stableSwap'], Queryoptimismgoerli_stableSwapArgs, MeshContext>,
  /** null **/
  optimismgoerli_stableSwaps: InContextSdkMethod<Query['optimismgoerli_stableSwaps'], Queryoptimismgoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  optimismgoerli_pooledToken: InContextSdkMethod<Query['optimismgoerli_pooledToken'], Queryoptimismgoerli_pooledTokenArgs, MeshContext>,
  /** null **/
  optimismgoerli_pooledTokens: InContextSdkMethod<Query['optimismgoerli_pooledTokens'], Queryoptimismgoerli_pooledTokensArgs, MeshContext>,
  /** null **/
  optimismgoerli_stableSwapLiquidity: InContextSdkMethod<Query['optimismgoerli_stableSwapLiquidity'], Queryoptimismgoerli_stableSwapLiquidityArgs, MeshContext>,
  /** null **/
  optimismgoerli_stableSwapLiquidities: InContextSdkMethod<Query['optimismgoerli_stableSwapLiquidities'], Queryoptimismgoerli_stableSwapLiquiditiesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  optimismgoerli__meta: InContextSdkMethod<Query['optimismgoerli__meta'], Queryoptimismgoerli__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  optimismgoerli_asset: InContextSdkMethod<Subscription['optimismgoerli_asset'], Subscriptionoptimismgoerli_assetArgs, MeshContext>,
  /** null **/
  optimismgoerli_assets: InContextSdkMethod<Subscription['optimismgoerli_assets'], Subscriptionoptimismgoerli_assetsArgs, MeshContext>,
  /** null **/
  optimismgoerli_assetBalance: InContextSdkMethod<Subscription['optimismgoerli_assetBalance'], Subscriptionoptimismgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  optimismgoerli_assetBalances: InContextSdkMethod<Subscription['optimismgoerli_assetBalances'], Subscriptionoptimismgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  optimismgoerli_router: InContextSdkMethod<Subscription['optimismgoerli_router'], Subscriptionoptimismgoerli_routerArgs, MeshContext>,
  /** null **/
  optimismgoerli_routers: InContextSdkMethod<Subscription['optimismgoerli_routers'], Subscriptionoptimismgoerli_routersArgs, MeshContext>,
  /** null **/
  optimismgoerli_setting: InContextSdkMethod<Subscription['optimismgoerli_setting'], Subscriptionoptimismgoerli_settingArgs, MeshContext>,
  /** null **/
  optimismgoerli_settings: InContextSdkMethod<Subscription['optimismgoerli_settings'], Subscriptionoptimismgoerli_settingsArgs, MeshContext>,
  /** null **/
  optimismgoerli_relayer: InContextSdkMethod<Subscription['optimismgoerli_relayer'], Subscriptionoptimismgoerli_relayerArgs, MeshContext>,
  /** null **/
  optimismgoerli_relayers: InContextSdkMethod<Subscription['optimismgoerli_relayers'], Subscriptionoptimismgoerli_relayersArgs, MeshContext>,
  /** null **/
  optimismgoerli_sequencer: InContextSdkMethod<Subscription['optimismgoerli_sequencer'], Subscriptionoptimismgoerli_sequencerArgs, MeshContext>,
  /** null **/
  optimismgoerli_sequencers: InContextSdkMethod<Subscription['optimismgoerli_sequencers'], Subscriptionoptimismgoerli_sequencersArgs, MeshContext>,
  /** null **/
  optimismgoerli_originTransfer: InContextSdkMethod<Subscription['optimismgoerli_originTransfer'], Subscriptionoptimismgoerli_originTransferArgs, MeshContext>,
  /** null **/
  optimismgoerli_originTransfers: InContextSdkMethod<Subscription['optimismgoerli_originTransfers'], Subscriptionoptimismgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  optimismgoerli_destinationTransfer: InContextSdkMethod<Subscription['optimismgoerli_destinationTransfer'], Subscriptionoptimismgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  optimismgoerli_destinationTransfers: InContextSdkMethod<Subscription['optimismgoerli_destinationTransfers'], Subscriptionoptimismgoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  optimismgoerli_originMessage: InContextSdkMethod<Subscription['optimismgoerli_originMessage'], Subscriptionoptimismgoerli_originMessageArgs, MeshContext>,
  /** null **/
  optimismgoerli_originMessages: InContextSdkMethod<Subscription['optimismgoerli_originMessages'], Subscriptionoptimismgoerli_originMessagesArgs, MeshContext>,
  /** null **/
  optimismgoerli_destinationMessage: InContextSdkMethod<Subscription['optimismgoerli_destinationMessage'], Subscriptionoptimismgoerli_destinationMessageArgs, MeshContext>,
  /** null **/
  optimismgoerli_destinationMessages: InContextSdkMethod<Subscription['optimismgoerli_destinationMessages'], Subscriptionoptimismgoerli_destinationMessagesArgs, MeshContext>,
  /** null **/
  optimismgoerli_aggregateRoot: InContextSdkMethod<Subscription['optimismgoerli_aggregateRoot'], Subscriptionoptimismgoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  optimismgoerli_aggregateRoots: InContextSdkMethod<Subscription['optimismgoerli_aggregateRoots'], Subscriptionoptimismgoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  optimismgoerli_connectorMeta: InContextSdkMethod<Subscription['optimismgoerli_connectorMeta'], Subscriptionoptimismgoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  optimismgoerli_connectorMetas: InContextSdkMethod<Subscription['optimismgoerli_connectorMetas'], Subscriptionoptimismgoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  optimismgoerli_rootCount: InContextSdkMethod<Subscription['optimismgoerli_rootCount'], Subscriptionoptimismgoerli_rootCountArgs, MeshContext>,
  /** null **/
  optimismgoerli_rootCounts: InContextSdkMethod<Subscription['optimismgoerli_rootCounts'], Subscriptionoptimismgoerli_rootCountsArgs, MeshContext>,
  /** null **/
  optimismgoerli_rootMessageSent: InContextSdkMethod<Subscription['optimismgoerli_rootMessageSent'], Subscriptionoptimismgoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  optimismgoerli_rootMessageSents: InContextSdkMethod<Subscription['optimismgoerli_rootMessageSents'], Subscriptionoptimismgoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  optimismgoerli_stableSwap: InContextSdkMethod<Subscription['optimismgoerli_stableSwap'], Subscriptionoptimismgoerli_stableSwapArgs, MeshContext>,
  /** null **/
  optimismgoerli_stableSwaps: InContextSdkMethod<Subscription['optimismgoerli_stableSwaps'], Subscriptionoptimismgoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  optimismgoerli_pooledToken: InContextSdkMethod<Subscription['optimismgoerli_pooledToken'], Subscriptionoptimismgoerli_pooledTokenArgs, MeshContext>,
  /** null **/
  optimismgoerli_pooledTokens: InContextSdkMethod<Subscription['optimismgoerli_pooledTokens'], Subscriptionoptimismgoerli_pooledTokensArgs, MeshContext>,
  /** null **/
  optimismgoerli_stableSwapLiquidity: InContextSdkMethod<Subscription['optimismgoerli_stableSwapLiquidity'], Subscriptionoptimismgoerli_stableSwapLiquidityArgs, MeshContext>,
  /** null **/
  optimismgoerli_stableSwapLiquidities: InContextSdkMethod<Subscription['optimismgoerli_stableSwapLiquidities'], Subscriptionoptimismgoerli_stableSwapLiquiditiesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  optimismgoerli__meta: InContextSdkMethod<Subscription['optimismgoerli__meta'], Subscriptionoptimismgoerli__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_OptimismGoerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
