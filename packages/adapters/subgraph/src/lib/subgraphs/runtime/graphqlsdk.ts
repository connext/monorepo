import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
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
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Asset = {
  __typename?: 'Asset';
  adoptedAsset: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  canonicalDomain: Scalars['BigInt'];
  canonicalId: Scalars['Bytes'];
  id: Scalars['ID'];
  local: Scalars['Bytes'];
};

export type AssetBalance = {
  __typename?: 'AssetBalance';
  amount: Scalars['BigInt'];
  asset: Asset;
  id: Scalars['ID'];
  router: Router;
};

export type AssetBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['String']>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  router?: InputMaybe<Scalars['String']>;
  router_contains?: InputMaybe<Scalars['String']>;
  router_contains_nocase?: InputMaybe<Scalars['String']>;
  router_ends_with?: InputMaybe<Scalars['String']>;
  router_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_gt?: InputMaybe<Scalars['String']>;
  router_gte?: InputMaybe<Scalars['String']>;
  router_in?: InputMaybe<Array<Scalars['String']>>;
  router_lt?: InputMaybe<Scalars['String']>;
  router_lte?: InputMaybe<Scalars['String']>;
  router_not?: InputMaybe<Scalars['String']>;
  router_not_contains?: InputMaybe<Scalars['String']>;
  router_not_contains_nocase?: InputMaybe<Scalars['String']>;
  router_not_ends_with?: InputMaybe<Scalars['String']>;
  router_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_in?: InputMaybe<Array<Scalars['String']>>;
  router_not_starts_with?: InputMaybe<Scalars['String']>;
  router_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_starts_with?: InputMaybe<Scalars['String']>;
  router_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum AssetBalance_OrderBy {
  Amount = 'amount',
  Asset = 'asset',
  Id = 'id',
  Router = 'router'
}

export type Asset_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  adoptedAsset?: InputMaybe<Scalars['Bytes']>;
  adoptedAsset_contains?: InputMaybe<Scalars['Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  adoptedAsset_not?: InputMaybe<Scalars['Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalId?: InputMaybe<Scalars['Bytes']>;
  canonicalId_contains?: InputMaybe<Scalars['Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['Bytes']>>;
  canonicalId_not?: InputMaybe<Scalars['Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['Bytes']>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  local?: InputMaybe<Scalars['Bytes']>;
  local_contains?: InputMaybe<Scalars['Bytes']>;
  local_in?: InputMaybe<Array<Scalars['Bytes']>>;
  local_not?: InputMaybe<Scalars['Bytes']>;
  local_not_contains?: InputMaybe<Scalars['Bytes']>;
  local_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum Asset_OrderBy {
  AdoptedAsset = 'adoptedAsset',
  BlockNumber = 'blockNumber',
  CanonicalDomain = 'canonicalDomain',
  CanonicalId = 'canonicalId',
  Id = 'id',
  Local = 'local'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type DestinationTransfer = {
  __typename?: 'DestinationTransfer';
  callData?: Maybe<Scalars['Bytes']>;
  chainId?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  executedAmount?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['Bytes']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedTransactionHash?: Maybe<Scalars['Bytes']>;
  id: Scalars['ID'];
  localAsset?: Maybe<Scalars['Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['Bytes']>;
  reconciledAmount?: Maybe<Scalars['BigInt']>;
  reconciledAsset?: Maybe<Scalars['Bytes']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['Bytes']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledTransactionHash?: Maybe<Scalars['Bytes']>;
  routers?: Maybe<Array<Router>>;
  status?: Maybe<TransferStatus>;
  to?: Maybe<Scalars['Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  transactingAsset?: Maybe<Scalars['Bytes']>;
  transferId?: Maybe<Scalars['Bytes']>;
};


export type DestinationTransferRoutersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Router_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Router_Filter>;
};

export type DestinationTransfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  callData?: InputMaybe<Scalars['Bytes']>;
  callData_contains?: InputMaybe<Scalars['Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['Bytes']>>;
  callData_not?: InputMaybe<Scalars['Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['Bytes']>;
  callData_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedAmount?: InputMaybe<Scalars['BigInt']>;
  executedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  executedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  executedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  executedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  executedAmount_not?: InputMaybe<Scalars['BigInt']>;
  executedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['Bytes']>;
  executedCaller_contains?: InputMaybe<Scalars['Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['Bytes']>>;
  executedCaller_not?: InputMaybe<Scalars['Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['Bytes']>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  executedGasLimit?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTimestamp?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTransactionHash?: InputMaybe<Scalars['Bytes']>;
  executedTransactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  executedTransactionHash_not?: InputMaybe<Scalars['Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  localAsset?: InputMaybe<Scalars['Bytes']>;
  localAsset_contains?: InputMaybe<Scalars['Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  localAsset_not?: InputMaybe<Scalars['Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
  localAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['Bytes']>;
  originSender_contains?: InputMaybe<Scalars['Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['Bytes']>>;
  originSender_not?: InputMaybe<Scalars['Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['Bytes']>;
  originSender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  reconciledAmount?: InputMaybe<Scalars['BigInt']>;
  reconciledAmount_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledAmount_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledAmount_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledAmount_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledAmount_not?: InputMaybe<Scalars['BigInt']>;
  reconciledAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledAsset?: InputMaybe<Scalars['Bytes']>;
  reconciledAsset_contains?: InputMaybe<Scalars['Bytes']>;
  reconciledAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  reconciledAsset_not?: InputMaybe<Scalars['Bytes']>;
  reconciledAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
  reconciledAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  reconciledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['Bytes']>;
  reconciledCaller_contains?: InputMaybe<Scalars['Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['Bytes']>>;
  reconciledCaller_not?: InputMaybe<Scalars['Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['Bytes']>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  reconciledGasLimit?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTimestamp?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTransactionHash?: InputMaybe<Scalars['Bytes']>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  status?: InputMaybe<TransferStatus>;
  status_in?: InputMaybe<Array<TransferStatus>>;
  status_not?: InputMaybe<TransferStatus>;
  status_not_in?: InputMaybe<Array<TransferStatus>>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAsset?: InputMaybe<Scalars['Bytes']>;
  transactingAsset_contains?: InputMaybe<Scalars['Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactingAsset_not?: InputMaybe<Scalars['Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transferId?: InputMaybe<Scalars['Bytes']>;
  transferId_contains?: InputMaybe<Scalars['Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transferId_not?: InputMaybe<Scalars['Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['Bytes']>;
  transferId_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum DestinationTransfer_OrderBy {
  CallData = 'callData',
  ChainId = 'chainId',
  DestinationDomain = 'destinationDomain',
  ExecutedAmount = 'executedAmount',
  ExecutedBlockNumber = 'executedBlockNumber',
  ExecutedCaller = 'executedCaller',
  ExecutedGasLimit = 'executedGasLimit',
  ExecutedGasPrice = 'executedGasPrice',
  ExecutedTimestamp = 'executedTimestamp',
  ExecutedTransactionHash = 'executedTransactionHash',
  Id = 'id',
  LocalAsset = 'localAsset',
  Nonce = 'nonce',
  OriginDomain = 'originDomain',
  OriginSender = 'originSender',
  ReconciledAmount = 'reconciledAmount',
  ReconciledAsset = 'reconciledAsset',
  ReconciledBlockNumber = 'reconciledBlockNumber',
  ReconciledCaller = 'reconciledCaller',
  ReconciledGasLimit = 'reconciledGasLimit',
  ReconciledGasPrice = 'reconciledGasPrice',
  ReconciledTimestamp = 'reconciledTimestamp',
  ReconciledTransactionHash = 'reconciledTransactionHash',
  Routers = 'routers',
  Status = 'status',
  To = 'to',
  TransactingAmount = 'transactingAmount',
  TransactingAsset = 'transactingAsset',
  TransferId = 'transferId'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type OriginTransfer = {
  __typename?: 'OriginTransfer';
  amount?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  bridgedAmount?: Maybe<Scalars['BigInt']>;
  bridgedAsset?: Maybe<Scalars['Bytes']>;
  callData?: Maybe<Scalars['Bytes']>;
  caller?: Maybe<Scalars['Bytes']>;
  chainId?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  id: Scalars['ID'];
  message?: Maybe<Scalars['Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['Bytes']>;
  transactingAsset?: Maybe<Scalars['Bytes']>;
  transactionHash?: Maybe<Scalars['Bytes']>;
  transferId?: Maybe<Scalars['Bytes']>;
};

export type OriginTransfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAmount?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_not?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAsset?: InputMaybe<Scalars['Bytes']>;
  bridgedAsset_contains?: InputMaybe<Scalars['Bytes']>;
  bridgedAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bridgedAsset_not?: InputMaybe<Scalars['Bytes']>;
  bridgedAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
  bridgedAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  callData?: InputMaybe<Scalars['Bytes']>;
  callData_contains?: InputMaybe<Scalars['Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['Bytes']>>;
  callData_not?: InputMaybe<Scalars['Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['Bytes']>;
  callData_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  caller?: InputMaybe<Scalars['Bytes']>;
  caller_contains?: InputMaybe<Scalars['Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['Bytes']>>;
  caller_not?: InputMaybe<Scalars['Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['Bytes']>;
  caller_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_not?: InputMaybe<Scalars['BigInt']>;
  gasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  message?: InputMaybe<Scalars['Bytes']>;
  message_contains?: InputMaybe<Scalars['Bytes']>;
  message_in?: InputMaybe<Array<Scalars['Bytes']>>;
  message_not?: InputMaybe<Scalars['Bytes']>;
  message_not_contains?: InputMaybe<Scalars['Bytes']>;
  message_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactingAsset?: InputMaybe<Scalars['Bytes']>;
  transactingAsset_contains?: InputMaybe<Scalars['Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactingAsset_not?: InputMaybe<Scalars['Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transferId?: InputMaybe<Scalars['Bytes']>;
  transferId_contains?: InputMaybe<Scalars['Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transferId_not?: InputMaybe<Scalars['Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['Bytes']>;
  transferId_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum OriginTransfer_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  BridgedAmount = 'bridgedAmount',
  BridgedAsset = 'bridgedAsset',
  CallData = 'callData',
  Caller = 'caller',
  ChainId = 'chainId',
  DestinationDomain = 'destinationDomain',
  GasLimit = 'gasLimit',
  GasPrice = 'gasPrice',
  Id = 'id',
  Message = 'message',
  Nonce = 'nonce',
  OriginDomain = 'originDomain',
  RelayerFee = 'relayerFee',
  Timestamp = 'timestamp',
  To = 'to',
  TransactingAsset = 'transactingAsset',
  TransactionHash = 'transactionHash',
  TransferId = 'transferId'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  asset?: Maybe<Asset>;
  assetBalance?: Maybe<AssetBalance>;
  assetBalances: Array<AssetBalance>;
  assets: Array<Asset>;
  destinationTransfer?: Maybe<DestinationTransfer>;
  destinationTransfers: Array<DestinationTransfer>;
  originTransfer?: Maybe<OriginTransfer>;
  originTransfers: Array<OriginTransfer>;
  router?: Maybe<Router>;
  routers: Array<Router>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryAssetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAssetBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAssetBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AssetBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AssetBalance_Filter>;
};


export type QueryAssetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Asset_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Asset_Filter>;
};


export type QueryDestinationTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDestinationTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DestinationTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DestinationTransfer_Filter>;
};


export type QueryOriginTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryOriginTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OriginTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OriginTransfer_Filter>;
};


export type QueryRouterArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRoutersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Router_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Router_Filter>;
};

export type Router = {
  __typename?: 'Router';
  assetBalances: Array<AssetBalance>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['Bytes']>;
  proposedOwner?: Maybe<Scalars['Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  recipient?: Maybe<Scalars['Bytes']>;
};


export type RouterAssetBalancesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AssetBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetBalance_Filter>;
};

export type Router_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  proposedOwner?: InputMaybe<Scalars['Bytes']>;
  proposedOwner_contains?: InputMaybe<Scalars['Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  proposedOwner_not?: InputMaybe<Scalars['Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['Bytes']>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  recipient?: InputMaybe<Scalars['Bytes']>;
  recipient_contains?: InputMaybe<Scalars['Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  recipient_not?: InputMaybe<Scalars['Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  recipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum Router_OrderBy {
  AssetBalances = 'assetBalances',
  Id = 'id',
  IsActive = 'isActive',
  Owner = 'owner',
  ProposedOwner = 'proposedOwner',
  ProposedTimestamp = 'proposedTimestamp',
  Recipient = 'recipient'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  asset?: Maybe<Asset>;
  assetBalance?: Maybe<AssetBalance>;
  assetBalances: Array<AssetBalance>;
  assets: Array<Asset>;
  destinationTransfer?: Maybe<DestinationTransfer>;
  destinationTransfers: Array<DestinationTransfer>;
  originTransfer?: Maybe<OriginTransfer>;
  originTransfers: Array<OriginTransfer>;
  router?: Maybe<Router>;
  routers: Array<Router>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAssetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAssetBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAssetBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AssetBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AssetBalance_Filter>;
};


export type SubscriptionAssetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Asset_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Asset_Filter>;
};


export type SubscriptionDestinationTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDestinationTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DestinationTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DestinationTransfer_Filter>;
};


export type SubscriptionOriginTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionOriginTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OriginTransfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OriginTransfer_Filter>;
};


export type SubscriptionRouterArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRoutersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Router_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Router_Filter>;
};

export enum TransferStatus {
  Completed = 'Completed',
  Executed = 'Executed',
  Reconciled = 'Reconciled'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type GetOriginTransfersQueryVariables = Exact<{
  originDomain: Scalars['BigInt'];
  destinationDomains?: InputMaybe<Array<Scalars['BigInt']> | Scalars['BigInt']>;
  nonce: Scalars['BigInt'];
  maxBlockNumber?: InputMaybe<Scalars['BigInt']>;
}>;


export type GetOriginTransfersQuery = { __typename?: 'Query', originTransfers: Array<{ __typename?: 'OriginTransfer', id: string, originDomain?: any | null, destinationDomain?: any | null, chainId?: any | null, transferId?: any | null, to?: any | null, nonce?: any | null, callData?: any | null, transactingAsset?: any | null, bridgedAsset?: any | null, amount?: any | null, bridgedAmount?: any | null, relayerFee?: any | null, caller?: any | null, message?: any | null, transactionHash?: any | null, timestamp?: any | null, gasPrice?: any | null, gasLimit?: any | null, blockNumber?: any | null }> };

export type GetOriginTransfersByIdsQueryVariables = Exact<{
  transferIds?: InputMaybe<Array<Scalars['Bytes']> | Scalars['Bytes']>;
}>;


export type GetOriginTransfersByIdsQuery = { __typename?: 'Query', originTransfers: Array<{ __typename?: 'OriginTransfer', id: string, originDomain?: any | null, destinationDomain?: any | null, chainId?: any | null, transferId?: any | null, to?: any | null, nonce?: any | null, callData?: any | null, transactingAsset?: any | null, bridgedAsset?: any | null, amount?: any | null, bridgedAmount?: any | null, relayerFee?: any | null, caller?: any | null, message?: any | null, transactionHash?: any | null, timestamp?: any | null, gasPrice?: any | null, gasLimit?: any | null, blockNumber?: any | null }> };

export type GetDestinationTransfersQueryVariables = Exact<{
  originDomain: Scalars['BigInt'];
  destinationDomains?: InputMaybe<Array<Scalars['BigInt']> | Scalars['BigInt']>;
  nonce: Scalars['BigInt'];
  status?: InputMaybe<TransferStatus>;
}>;


export type GetDestinationTransfersQuery = { __typename?: 'Query', destinationTransfers: Array<{ __typename?: 'DestinationTransfer', id: string, originDomain?: any | null, destinationDomain?: any | null, chainId?: any | null, status?: TransferStatus | null, transferId?: any | null, to?: any | null, nonce?: any | null, callData?: any | null, localAsset?: any | null, transactingAsset?: any | null, transactingAmount?: any | null, originSender?: any | null, executedCaller?: any | null, executedAmount?: any | null, executedTransactionHash?: any | null, executedTimestamp?: any | null, executedGasPrice?: any | null, executedGasLimit?: any | null, executedBlockNumber?: any | null, reconciledAsset?: any | null, reconciledAmount?: any | null, reconciledCaller?: any | null, reconciledTransactionHash?: any | null, reconciledTimestamp?: any | null, reconciledGasPrice?: any | null, reconciledGasLimit?: any | null, reconciledBlockNumber?: any | null, routers?: Array<{ __typename?: 'Router', id: string }> | null }> };

export type GetDestinationTransfersByIdsQueryVariables = Exact<{
  transferIds?: InputMaybe<Array<Scalars['Bytes']> | Scalars['Bytes']>;
  maxExecutedBlockNumber?: InputMaybe<Scalars['BigInt']>;
  maxReconciledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  status?: InputMaybe<TransferStatus>;
}>;


export type GetDestinationTransfersByIdsQuery = { __typename?: 'Query', destinationTransfers: Array<{ __typename?: 'DestinationTransfer', id: string, originDomain?: any | null, destinationDomain?: any | null, chainId?: any | null, status?: TransferStatus | null, transferId?: any | null, to?: any | null, nonce?: any | null, callData?: any | null, localAsset?: any | null, transactingAsset?: any | null, transactingAmount?: any | null, originSender?: any | null, executedCaller?: any | null, executedAmount?: any | null, executedTransactionHash?: any | null, executedTimestamp?: any | null, executedGasPrice?: any | null, executedGasLimit?: any | null, executedBlockNumber?: any | null, reconciledAsset?: any | null, reconciledAmount?: any | null, reconciledCaller?: any | null, reconciledTransactionHash?: any | null, reconciledTimestamp?: any | null, reconciledGasPrice?: any | null, reconciledGasLimit?: any | null, reconciledBlockNumber?: any | null, routers?: Array<{ __typename?: 'Router', id: string }> | null }> };

export type GetAssetByLocalQueryVariables = Exact<{
  local: Scalars['Bytes'];
}>;


export type GetAssetByLocalQuery = { __typename?: 'Query', assets: Array<{ __typename?: 'Asset', id: string, local: any, adoptedAsset: any, canonicalId: any, canonicalDomain: any, blockNumber: any }> };

export type GetAssetByCanonicalIdQueryVariables = Exact<{
  canonicalId: Scalars['Bytes'];
}>;


export type GetAssetByCanonicalIdQuery = { __typename?: 'Query', assets: Array<{ __typename?: 'Asset', id: string, local: any, adoptedAsset: any, canonicalId: any, canonicalDomain: any, blockNumber: any }> };

export type GetAssetBalanceQueryVariables = Exact<{
  assetBalanceId: Scalars['ID'];
}>;


export type GetAssetBalanceQuery = { __typename?: 'Query', assetBalance?: { __typename?: 'AssetBalance', amount: any, asset: { __typename?: 'Asset', canonicalId: any, canonicalDomain: any, local: any, adoptedAsset: any, blockNumber: any } } | null };

export type GetAssetBalancesQueryVariables = Exact<{
  router: Scalars['String'];
}>;


export type GetAssetBalancesQuery = { __typename?: 'Query', assetBalances: Array<{ __typename?: 'AssetBalance', amount: any, asset: { __typename?: 'Asset', canonicalId: any, canonicalDomain: any, local: any, adoptedAsset: any, blockNumber: any } }> };

export type GetRouterQueryVariables = Exact<{
  router: Scalars['ID'];
}>;


export type GetRouterQuery = { __typename?: 'Query', router?: { __typename?: 'Router', id: string } | null };


export const GetOriginTransfersDocument = gql`
    query GetOriginTransfers($originDomain: BigInt!, $destinationDomains: [BigInt!], $nonce: BigInt!, $maxBlockNumber: BigInt) {
  originTransfers(
    where: {destinationDomain_in: $destinationDomains, nonce_gte: $nonce, originDomain: $originDomain, blockNumber_lte: $maxBlockNumber}
    orderBy: blockNumber
    orderDirection: desc
  ) {
    id
    originDomain
    destinationDomain
    chainId
    transferId
    to
    nonce
    callData
    transactingAsset
    bridgedAsset
    amount
    bridgedAmount
    relayerFee
    caller
    message
    transactionHash
    timestamp
    gasPrice
    gasLimit
    blockNumber
  }
}
    `;
export const GetOriginTransfersByIdsDocument = gql`
    query GetOriginTransfersByIds($transferIds: [Bytes!]) {
  originTransfers(where: {transferId_in: $transferIds}) {
    id
    originDomain
    destinationDomain
    chainId
    transferId
    to
    nonce
    callData
    transactingAsset
    bridgedAsset
    amount
    bridgedAmount
    relayerFee
    caller
    message
    transactionHash
    timestamp
    gasPrice
    gasLimit
    blockNumber
  }
}
    `;
export const GetDestinationTransfersDocument = gql`
    query GetDestinationTransfers($originDomain: BigInt!, $destinationDomains: [BigInt!], $nonce: BigInt!, $status: TransferStatus) {
  destinationTransfers(
    where: {destinationDomain_in: $destinationDomains, nonce_gte: $nonce, originDomain: $originDomain, status: $status}
    orderBy: nonce
    orderDirection: desc
  ) {
    id
    originDomain
    destinationDomain
    chainId
    status
    transferId
    to
    nonce
    callData
    localAsset
    routers {
      id
    }
    transactingAsset
    transactingAmount
    originSender
    executedCaller
    executedAmount
    executedTransactionHash
    executedTimestamp
    executedGasPrice
    executedGasLimit
    executedBlockNumber
    reconciledAsset
    reconciledAmount
    reconciledCaller
    reconciledTransactionHash
    reconciledTimestamp
    reconciledGasPrice
    reconciledGasLimit
    reconciledBlockNumber
  }
}
    `;
export const GetDestinationTransfersByIdsDocument = gql`
    query GetDestinationTransfersByIds($transferIds: [Bytes!], $maxExecutedBlockNumber: BigInt, $maxReconciledBlockNumber: BigInt, $status: TransferStatus) {
  destinationTransfers(
    where: {transferId_in: $transferIds, executedBlockNumber_lte: $maxExecutedBlockNumber, reconciledBlockNumber_lte: $maxReconciledBlockNumber, status: $status}
  ) {
    id
    originDomain
    destinationDomain
    chainId
    status
    transferId
    to
    nonce
    callData
    localAsset
    routers {
      id
    }
    transactingAsset
    transactingAmount
    originSender
    executedCaller
    executedAmount
    executedTransactionHash
    executedTimestamp
    executedGasPrice
    executedGasLimit
    executedBlockNumber
    reconciledAsset
    reconciledAmount
    reconciledCaller
    reconciledTransactionHash
    reconciledTimestamp
    reconciledGasPrice
    reconciledGasLimit
    reconciledBlockNumber
  }
}
    `;
export const GetAssetByLocalDocument = gql`
    query GetAssetByLocal($local: Bytes!) {
  assets(where: {local: $local}) {
    id
    local
    adoptedAsset
    canonicalId
    canonicalDomain
    blockNumber
  }
}
    `;
export const GetAssetByCanonicalIdDocument = gql`
    query GetAssetByCanonicalId($canonicalId: Bytes!) {
  assets(
    where: {canonicalId: $canonicalId}
    orderBy: blockNumber
    orderDirection: desc
  ) {
    id
    local
    adoptedAsset
    canonicalId
    canonicalDomain
    blockNumber
  }
}
    `;
export const GetAssetBalanceDocument = gql`
    query GetAssetBalance($assetBalanceId: ID!) {
  assetBalance(id: $assetBalanceId) {
    amount
    asset {
      canonicalId
      canonicalDomain
      local
      adoptedAsset
      blockNumber
    }
  }
}
    `;
export const GetAssetBalancesDocument = gql`
    query GetAssetBalances($router: String!) {
  assetBalances(where: {router: $router}) {
    amount
    asset {
      canonicalId
      canonicalDomain
      local
      adoptedAsset
      blockNumber
    }
  }
}
    `;
export const GetRouterDocument = gql`
    query GetRouter($router: ID!) {
  router(id: $router) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetOriginTransfers(variables: GetOriginTransfersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetOriginTransfersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOriginTransfersQuery>(GetOriginTransfersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetOriginTransfers', 'query');
    },
    GetOriginTransfersByIds(variables?: GetOriginTransfersByIdsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetOriginTransfersByIdsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOriginTransfersByIdsQuery>(GetOriginTransfersByIdsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetOriginTransfersByIds', 'query');
    },
    GetDestinationTransfers(variables: GetDestinationTransfersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetDestinationTransfersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDestinationTransfersQuery>(GetDestinationTransfersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetDestinationTransfers', 'query');
    },
    GetDestinationTransfersByIds(variables?: GetDestinationTransfersByIdsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetDestinationTransfersByIdsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDestinationTransfersByIdsQuery>(GetDestinationTransfersByIdsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetDestinationTransfersByIds', 'query');
    },
    GetAssetByLocal(variables: GetAssetByLocalQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAssetByLocalQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAssetByLocalQuery>(GetAssetByLocalDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAssetByLocal', 'query');
    },
    GetAssetByCanonicalId(variables: GetAssetByCanonicalIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAssetByCanonicalIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAssetByCanonicalIdQuery>(GetAssetByCanonicalIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAssetByCanonicalId', 'query');
    },
    GetAssetBalance(variables: GetAssetBalanceQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAssetBalanceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAssetBalanceQuery>(GetAssetBalanceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAssetBalance', 'query');
    },
    GetAssetBalances(variables: GetAssetBalancesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAssetBalancesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAssetBalancesQuery>(GetAssetBalancesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAssetBalances', 'query');
    },
    GetRouter(variables: GetRouterQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetRouterQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetRouterQuery>(GetRouterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetRouter', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;