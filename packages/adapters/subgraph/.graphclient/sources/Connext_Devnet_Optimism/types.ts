// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextDevnetOptimismTypes {
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
  devnetoptimism_BigDecimal: any;
  BigInt: any;
  devnetoptimism_Bytes: any;
};

export type devnetoptimism_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['devnetoptimism_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type devnetoptimism_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  root_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  root_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetoptimism_BlockChangedFilter>;
};

export type devnetoptimism_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type devnetoptimism_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['devnetoptimism_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['devnetoptimism_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['devnetoptimism_Bytes']>;
  localAsset?: Maybe<Scalars['devnetoptimism_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<devnetoptimism_AssetStatus>;
};

export type devnetoptimism_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: devnetoptimism_Router;
  asset: devnetoptimism_Asset;
  feesEarned: Scalars['BigInt'];
};

export type devnetoptimism_AssetBalance_filter = {
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
  locked?: InputMaybe<Scalars['BigInt']>;
  locked_not?: InputMaybe<Scalars['BigInt']>;
  locked_gt?: InputMaybe<Scalars['BigInt']>;
  locked_lt?: InputMaybe<Scalars['BigInt']>;
  locked_gte?: InputMaybe<Scalars['BigInt']>;
  locked_lte?: InputMaybe<Scalars['BigInt']>;
  locked_in?: InputMaybe<Array<Scalars['BigInt']>>;
  locked_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  supplied?: InputMaybe<Scalars['BigInt']>;
  supplied_not?: InputMaybe<Scalars['BigInt']>;
  supplied_gt?: InputMaybe<Scalars['BigInt']>;
  supplied_lt?: InputMaybe<Scalars['BigInt']>;
  supplied_gte?: InputMaybe<Scalars['BigInt']>;
  supplied_lte?: InputMaybe<Scalars['BigInt']>;
  supplied_in?: InputMaybe<Array<Scalars['BigInt']>>;
  supplied_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  removed?: InputMaybe<Scalars['BigInt']>;
  removed_not?: InputMaybe<Scalars['BigInt']>;
  removed_gt?: InputMaybe<Scalars['BigInt']>;
  removed_lt?: InputMaybe<Scalars['BigInt']>;
  removed_gte?: InputMaybe<Scalars['BigInt']>;
  removed_lte?: InputMaybe<Scalars['BigInt']>;
  removed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  removed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  router_?: InputMaybe<devnetoptimism_Router_filter>;
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
  asset_?: InputMaybe<devnetoptimism_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetoptimism_BlockChangedFilter>;
};

export type devnetoptimism_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'locked'
  | 'supplied'
  | 'removed'
  | 'router'
  | 'asset'
  | 'feesEarned';

export type devnetoptimism_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type devnetoptimism_AssetStatus_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  status?: InputMaybe<Scalars['Boolean']>;
  status_not?: InputMaybe<Scalars['Boolean']>;
  status_in?: InputMaybe<Array<Scalars['Boolean']>>;
  status_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetoptimism_BlockChangedFilter>;
};

export type devnetoptimism_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type devnetoptimism_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  key_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  key_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  decimal?: InputMaybe<Scalars['BigInt']>;
  decimal_not?: InputMaybe<Scalars['BigInt']>;
  decimal_gt?: InputMaybe<Scalars['BigInt']>;
  decimal_lt?: InputMaybe<Scalars['BigInt']>;
  decimal_gte?: InputMaybe<Scalars['BigInt']>;
  decimal_lte?: InputMaybe<Scalars['BigInt']>;
  decimal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  decimal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalId?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  localAsset?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<Scalars['String']>;
  status_not?: InputMaybe<Scalars['String']>;
  status_gt?: InputMaybe<Scalars['String']>;
  status_lt?: InputMaybe<Scalars['String']>;
  status_gte?: InputMaybe<Scalars['String']>;
  status_lte?: InputMaybe<Scalars['String']>;
  status_in?: InputMaybe<Array<Scalars['String']>>;
  status_not_in?: InputMaybe<Array<Scalars['String']>>;
  status_contains?: InputMaybe<Scalars['String']>;
  status_contains_nocase?: InputMaybe<Scalars['String']>;
  status_not_contains?: InputMaybe<Scalars['String']>;
  status_not_contains_nocase?: InputMaybe<Scalars['String']>;
  status_starts_with?: InputMaybe<Scalars['String']>;
  status_starts_with_nocase?: InputMaybe<Scalars['String']>;
  status_not_starts_with?: InputMaybe<Scalars['String']>;
  status_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  status_ends_with?: InputMaybe<Scalars['String']>;
  status_ends_with_nocase?: InputMaybe<Scalars['String']>;
  status_not_ends_with?: InputMaybe<Scalars['String']>;
  status_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  status_?: InputMaybe<devnetoptimism_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetoptimism_BlockChangedFilter>;
};

export type devnetoptimism_Asset_orderBy =
  | 'id'
  | 'key'
  | 'decimal'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber'
  | 'status';

export type devnetoptimism_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type devnetoptimism_Block_height = {
  hash?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type devnetoptimism_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['devnetoptimism_Bytes']>;
  rootManager?: Maybe<Scalars['devnetoptimism_Bytes']>;
  mirrorConnector?: Maybe<Scalars['devnetoptimism_Bytes']>;
};

export type devnetoptimism_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  amb_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  rootManager?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetoptimism_BlockChangedFilter>;
};

export type devnetoptimism_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type devnetoptimism_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['devnetoptimism_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<devnetoptimism_TransferStatus>;
  routers?: Maybe<Array<devnetoptimism_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['devnetoptimism_Bytes']>;
  delegate?: Maybe<Scalars['devnetoptimism_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['devnetoptimism_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['devnetoptimism_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['devnetoptimism_Bytes']>;
  asset?: Maybe<devnetoptimism_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['devnetoptimism_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['devnetoptimism_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['devnetoptimism_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['devnetoptimism_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['devnetoptimism_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['devnetoptimism_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type devnetoptimism_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_Router_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_Router_filter>;
};

export type devnetoptimism_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transferId_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<devnetoptimism_TransferStatus>;
  status_not?: InputMaybe<devnetoptimism_TransferStatus>;
  status_in?: InputMaybe<Array<devnetoptimism_TransferStatus>>;
  status_not_in?: InputMaybe<Array<devnetoptimism_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<devnetoptimism_Router_filter>;
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
  to?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  to_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  to_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  delegate?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  delegate_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  callData_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bumpSlippageCount?: InputMaybe<Scalars['BigInt']>;
  bumpSlippageCount_not?: InputMaybe<Scalars['BigInt']>;
  bumpSlippageCount_gt?: InputMaybe<Scalars['BigInt']>;
  bumpSlippageCount_lt?: InputMaybe<Scalars['BigInt']>;
  bumpSlippageCount_gte?: InputMaybe<Scalars['BigInt']>;
  bumpSlippageCount_lte?: InputMaybe<Scalars['BigInt']>;
  bumpSlippageCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bumpSlippageCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  originSender_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
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
  asset_?: InputMaybe<devnetoptimism_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetoptimism_BlockChangedFilter>;
};

export type devnetoptimism_DestinationTransfer_orderBy =
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
  | 'bumpSlippageCount'
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
  | 'executedTxOrigin'
  | 'executedTxNonce'
  | 'reconciledCaller'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber'
  | 'reconciledTxOrigin'
  | 'reconciledTxNonce';

/** Defines the order direction, either ascending or descending */
export type devnetoptimism_OrderDirection =
  | 'asc'
  | 'desc';

export type devnetoptimism_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['devnetoptimism_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['devnetoptimism_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['devnetoptimism_Bytes']>;
  root?: Maybe<Scalars['devnetoptimism_Bytes']>;
  transactionHash?: Maybe<Scalars['devnetoptimism_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<devnetoptimism_RootCount>;
};

export type devnetoptimism_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transferId_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  leaf_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  message_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  message_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  root?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  root_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  root_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transactionHash?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
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
  rootCount_?: InputMaybe<devnetoptimism_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetoptimism_BlockChangedFilter>;
};

export type devnetoptimism_OriginMessage_orderBy =
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

export type devnetoptimism_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['devnetoptimism_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<devnetoptimism_TransferStatus>;
  messageHash?: Maybe<Scalars['devnetoptimism_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['devnetoptimism_Bytes']>;
  delegate?: Maybe<Scalars['devnetoptimism_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['devnetoptimism_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['devnetoptimism_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['devnetoptimism_Bytes']>;
  asset?: Maybe<devnetoptimism_Asset>;
  transactingAsset?: Maybe<Scalars['devnetoptimism_Bytes']>;
  message?: Maybe<devnetoptimism_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<devnetoptimism_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['devnetoptimism_Bytes']>;
  caller?: Maybe<Scalars['devnetoptimism_Bytes']>;
  transactionHash?: Maybe<Scalars['devnetoptimism_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['devnetoptimism_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type devnetoptimism_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_RelayerFee_filter>;
};

export type devnetoptimism_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transferId_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<devnetoptimism_TransferStatus>;
  status_not?: InputMaybe<devnetoptimism_TransferStatus>;
  status_in?: InputMaybe<Array<devnetoptimism_TransferStatus>>;
  status_not_in?: InputMaybe<Array<devnetoptimism_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
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
  to?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  to_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  to_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  delegate?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  delegate_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  callData_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  originSender_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
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
  asset_?: InputMaybe<devnetoptimism_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
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
  message_?: InputMaybe<devnetoptimism_OriginMessage_filter>;
  bumpRelayerFeeCount?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_not?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_gt?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_lt?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_gte?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_lte?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bumpRelayerFeeCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFees?: InputMaybe<Array<Scalars['String']>>;
  relayerFees_not?: InputMaybe<Array<Scalars['String']>>;
  relayerFees_contains?: InputMaybe<Array<Scalars['String']>>;
  relayerFees_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  relayerFees_not_contains?: InputMaybe<Array<Scalars['String']>>;
  relayerFees_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  relayerFees_?: InputMaybe<devnetoptimism_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  caller?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  caller_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transactionHash?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetoptimism_BlockChangedFilter>;
};

export type devnetoptimism_OriginTransfer_orderBy =
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
  | 'transactingAsset'
  | 'message'
  | 'bumpRelayerFeeCount'
  | 'relayerFees'
  | 'initialRelayerFeeAsset'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber'
  | 'txOrigin'
  | 'txNonce';

export type Query = {
  devnetoptimism_asset?: Maybe<devnetoptimism_Asset>;
  devnetoptimism_assets: Array<devnetoptimism_Asset>;
  devnetoptimism_assetStatus?: Maybe<devnetoptimism_AssetStatus>;
  devnetoptimism_assetStatuses: Array<devnetoptimism_AssetStatus>;
  devnetoptimism_assetBalance?: Maybe<devnetoptimism_AssetBalance>;
  devnetoptimism_assetBalances: Array<devnetoptimism_AssetBalance>;
  devnetoptimism_router?: Maybe<devnetoptimism_Router>;
  devnetoptimism_routers: Array<devnetoptimism_Router>;
  devnetoptimism_routerDailyTVL?: Maybe<devnetoptimism_RouterDailyTVL>;
  devnetoptimism_routerDailyTVLs: Array<devnetoptimism_RouterDailyTVL>;
  devnetoptimism_setting?: Maybe<devnetoptimism_Setting>;
  devnetoptimism_settings: Array<devnetoptimism_Setting>;
  devnetoptimism_relayer?: Maybe<devnetoptimism_Relayer>;
  devnetoptimism_relayers: Array<devnetoptimism_Relayer>;
  devnetoptimism_sequencer?: Maybe<devnetoptimism_Sequencer>;
  devnetoptimism_sequencers: Array<devnetoptimism_Sequencer>;
  devnetoptimism_relayerFee?: Maybe<devnetoptimism_RelayerFee>;
  devnetoptimism_relayerFees: Array<devnetoptimism_RelayerFee>;
  devnetoptimism_originTransfer?: Maybe<devnetoptimism_OriginTransfer>;
  devnetoptimism_originTransfers: Array<devnetoptimism_OriginTransfer>;
  devnetoptimism_destinationTransfer?: Maybe<devnetoptimism_DestinationTransfer>;
  devnetoptimism_destinationTransfers: Array<devnetoptimism_DestinationTransfer>;
  devnetoptimism_originMessage?: Maybe<devnetoptimism_OriginMessage>;
  devnetoptimism_originMessages: Array<devnetoptimism_OriginMessage>;
  devnetoptimism_aggregateRoot?: Maybe<devnetoptimism_AggregateRoot>;
  devnetoptimism_aggregateRoots: Array<devnetoptimism_AggregateRoot>;
  devnetoptimism_connectorMeta?: Maybe<devnetoptimism_ConnectorMeta>;
  devnetoptimism_connectorMetas: Array<devnetoptimism_ConnectorMeta>;
  devnetoptimism_rootCount?: Maybe<devnetoptimism_RootCount>;
  devnetoptimism_rootCounts: Array<devnetoptimism_RootCount>;
  devnetoptimism_rootMessageSent?: Maybe<devnetoptimism_RootMessageSent>;
  devnetoptimism_rootMessageSents: Array<devnetoptimism_RootMessageSent>;
  devnetoptimism_relayerFeesIncrease?: Maybe<devnetoptimism_RelayerFeesIncrease>;
  devnetoptimism_relayerFeesIncreases: Array<devnetoptimism_RelayerFeesIncrease>;
  devnetoptimism_slippageUpdate?: Maybe<devnetoptimism_SlippageUpdate>;
  devnetoptimism_slippageUpdates: Array<devnetoptimism_SlippageUpdate>;
  /** Access to subgraph metadata */
  devnetoptimism__meta?: Maybe<devnetoptimism__Meta_>;
};


export type Querydevnetoptimism_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_Asset_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_Asset_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_AssetStatus_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_AssetBalance_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_Router_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_Router_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_RouterDailyTVL_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_Setting_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_Setting_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_Relayer_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_Relayer_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_Sequencer_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_Sequencer_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_RelayerFee_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_OriginTransfer_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_DestinationTransfer_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_OriginMessage_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_AggregateRoot_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_ConnectorMeta_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_RootCount_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_RootCount_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_RootMessageSent_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_RelayerFeesIncrease_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_SlippageUpdate_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetoptimism__metaArgs = {
  block?: InputMaybe<devnetoptimism_Block_height>;
};

export type devnetoptimism_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['devnetoptimism_Bytes']>;
};

export type devnetoptimism_RelayerFee = {
  id: Scalars['ID'];
  transfer: devnetoptimism_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['devnetoptimism_Bytes'];
};

export type devnetoptimism_RelayerFee_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transfer?: InputMaybe<Scalars['String']>;
  transfer_not?: InputMaybe<Scalars['String']>;
  transfer_gt?: InputMaybe<Scalars['String']>;
  transfer_lt?: InputMaybe<Scalars['String']>;
  transfer_gte?: InputMaybe<Scalars['String']>;
  transfer_lte?: InputMaybe<Scalars['String']>;
  transfer_in?: InputMaybe<Array<Scalars['String']>>;
  transfer_not_in?: InputMaybe<Array<Scalars['String']>>;
  transfer_contains?: InputMaybe<Scalars['String']>;
  transfer_contains_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_contains?: InputMaybe<Scalars['String']>;
  transfer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transfer_starts_with?: InputMaybe<Scalars['String']>;
  transfer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_starts_with?: InputMaybe<Scalars['String']>;
  transfer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_ends_with?: InputMaybe<Scalars['String']>;
  transfer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_ends_with?: InputMaybe<Scalars['String']>;
  transfer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_?: InputMaybe<devnetoptimism_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  asset_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetoptimism_BlockChangedFilter>;
};

export type devnetoptimism_RelayerFee_orderBy =
  | 'id'
  | 'transfer'
  | 'fee'
  | 'asset';

export type devnetoptimism_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: devnetoptimism_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['devnetoptimism_Bytes']>;
  caller: Scalars['devnetoptimism_Bytes'];
  transactionHash: Scalars['devnetoptimism_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type devnetoptimism_RelayerFeesIncrease_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transfer?: InputMaybe<Scalars['String']>;
  transfer_not?: InputMaybe<Scalars['String']>;
  transfer_gt?: InputMaybe<Scalars['String']>;
  transfer_lt?: InputMaybe<Scalars['String']>;
  transfer_gte?: InputMaybe<Scalars['String']>;
  transfer_lte?: InputMaybe<Scalars['String']>;
  transfer_in?: InputMaybe<Array<Scalars['String']>>;
  transfer_not_in?: InputMaybe<Array<Scalars['String']>>;
  transfer_contains?: InputMaybe<Scalars['String']>;
  transfer_contains_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_contains?: InputMaybe<Scalars['String']>;
  transfer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transfer_starts_with?: InputMaybe<Scalars['String']>;
  transfer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_starts_with?: InputMaybe<Scalars['String']>;
  transfer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_ends_with?: InputMaybe<Scalars['String']>;
  transfer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_ends_with?: InputMaybe<Scalars['String']>;
  transfer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_?: InputMaybe<devnetoptimism_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  asset_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  caller?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  caller_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transactionHash?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
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
  _change_block?: InputMaybe<devnetoptimism_BlockChangedFilter>;
};

export type devnetoptimism_RelayerFeesIncrease_orderBy =
  | 'id'
  | 'transfer'
  | 'increase'
  | 'asset'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type devnetoptimism_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  relayer_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetoptimism_BlockChangedFilter>;
};

export type devnetoptimism_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type devnetoptimism_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type devnetoptimism_RootCount_filter = {
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
  _change_block?: InputMaybe<devnetoptimism_BlockChangedFilter>;
};

export type devnetoptimism_RootCount_orderBy =
  | 'id'
  | 'count';

export type devnetoptimism_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['devnetoptimism_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['devnetoptimism_Bytes']>;
  transactionHash?: Maybe<Scalars['devnetoptimism_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type devnetoptimism_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  root_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  root_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  caller_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transactionHash?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
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
  _change_block?: InputMaybe<devnetoptimism_BlockChangedFilter>;
};

export type devnetoptimism_RootMessageSent_orderBy =
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

export type devnetoptimism_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['devnetoptimism_Bytes']>;
  recipient?: Maybe<Scalars['devnetoptimism_Bytes']>;
  proposedOwner?: Maybe<Scalars['devnetoptimism_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<devnetoptimism_AssetBalance>;
};


export type devnetoptimism_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_AssetBalance_filter>;
};

export type devnetoptimism_RouterDailyTVL = {
  id: Scalars['ID'];
  router: devnetoptimism_Router;
  asset: devnetoptimism_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type devnetoptimism_RouterDailyTVL_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
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
  router_?: InputMaybe<devnetoptimism_Router_filter>;
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
  asset_?: InputMaybe<devnetoptimism_Asset_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance?: InputMaybe<Scalars['BigInt']>;
  balance_not?: InputMaybe<Scalars['BigInt']>;
  balance_gt?: InputMaybe<Scalars['BigInt']>;
  balance_lt?: InputMaybe<Scalars['BigInt']>;
  balance_gte?: InputMaybe<Scalars['BigInt']>;
  balance_lte?: InputMaybe<Scalars['BigInt']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetoptimism_BlockChangedFilter>;
};

export type devnetoptimism_RouterDailyTVL_orderBy =
  | 'id'
  | 'router'
  | 'asset'
  | 'timestamp'
  | 'balance';

export type devnetoptimism_Router_filter = {
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
  owner?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  owner_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  recipient?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  recipient_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<devnetoptimism_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetoptimism_BlockChangedFilter>;
};

export type devnetoptimism_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type devnetoptimism_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['devnetoptimism_Bytes']>;
};

export type devnetoptimism_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetoptimism_BlockChangedFilter>;
};

export type devnetoptimism_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type devnetoptimism_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['devnetoptimism_Bytes'];
};

export type devnetoptimism_Setting_filter = {
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
  caller?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  caller_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetoptimism_BlockChangedFilter>;
};

export type devnetoptimism_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type devnetoptimism_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: devnetoptimism_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['devnetoptimism_Bytes'];
  transactionHash: Scalars['devnetoptimism_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type devnetoptimism_SlippageUpdate_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transfer?: InputMaybe<Scalars['String']>;
  transfer_not?: InputMaybe<Scalars['String']>;
  transfer_gt?: InputMaybe<Scalars['String']>;
  transfer_lt?: InputMaybe<Scalars['String']>;
  transfer_gte?: InputMaybe<Scalars['String']>;
  transfer_lte?: InputMaybe<Scalars['String']>;
  transfer_in?: InputMaybe<Array<Scalars['String']>>;
  transfer_not_in?: InputMaybe<Array<Scalars['String']>>;
  transfer_contains?: InputMaybe<Scalars['String']>;
  transfer_contains_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_contains?: InputMaybe<Scalars['String']>;
  transfer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transfer_starts_with?: InputMaybe<Scalars['String']>;
  transfer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_starts_with?: InputMaybe<Scalars['String']>;
  transfer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_ends_with?: InputMaybe<Scalars['String']>;
  transfer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_ends_with?: InputMaybe<Scalars['String']>;
  transfer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_?: InputMaybe<devnetoptimism_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  caller_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transactionHash?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['devnetoptimism_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['devnetoptimism_Bytes']>;
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
  _change_block?: InputMaybe<devnetoptimism_BlockChangedFilter>;
};

export type devnetoptimism_SlippageUpdate_orderBy =
  | 'id'
  | 'transfer'
  | 'slippage'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type Subscription = {
  devnetoptimism_asset?: Maybe<devnetoptimism_Asset>;
  devnetoptimism_assets: Array<devnetoptimism_Asset>;
  devnetoptimism_assetStatus?: Maybe<devnetoptimism_AssetStatus>;
  devnetoptimism_assetStatuses: Array<devnetoptimism_AssetStatus>;
  devnetoptimism_assetBalance?: Maybe<devnetoptimism_AssetBalance>;
  devnetoptimism_assetBalances: Array<devnetoptimism_AssetBalance>;
  devnetoptimism_router?: Maybe<devnetoptimism_Router>;
  devnetoptimism_routers: Array<devnetoptimism_Router>;
  devnetoptimism_routerDailyTVL?: Maybe<devnetoptimism_RouterDailyTVL>;
  devnetoptimism_routerDailyTVLs: Array<devnetoptimism_RouterDailyTVL>;
  devnetoptimism_setting?: Maybe<devnetoptimism_Setting>;
  devnetoptimism_settings: Array<devnetoptimism_Setting>;
  devnetoptimism_relayer?: Maybe<devnetoptimism_Relayer>;
  devnetoptimism_relayers: Array<devnetoptimism_Relayer>;
  devnetoptimism_sequencer?: Maybe<devnetoptimism_Sequencer>;
  devnetoptimism_sequencers: Array<devnetoptimism_Sequencer>;
  devnetoptimism_relayerFee?: Maybe<devnetoptimism_RelayerFee>;
  devnetoptimism_relayerFees: Array<devnetoptimism_RelayerFee>;
  devnetoptimism_originTransfer?: Maybe<devnetoptimism_OriginTransfer>;
  devnetoptimism_originTransfers: Array<devnetoptimism_OriginTransfer>;
  devnetoptimism_destinationTransfer?: Maybe<devnetoptimism_DestinationTransfer>;
  devnetoptimism_destinationTransfers: Array<devnetoptimism_DestinationTransfer>;
  devnetoptimism_originMessage?: Maybe<devnetoptimism_OriginMessage>;
  devnetoptimism_originMessages: Array<devnetoptimism_OriginMessage>;
  devnetoptimism_aggregateRoot?: Maybe<devnetoptimism_AggregateRoot>;
  devnetoptimism_aggregateRoots: Array<devnetoptimism_AggregateRoot>;
  devnetoptimism_connectorMeta?: Maybe<devnetoptimism_ConnectorMeta>;
  devnetoptimism_connectorMetas: Array<devnetoptimism_ConnectorMeta>;
  devnetoptimism_rootCount?: Maybe<devnetoptimism_RootCount>;
  devnetoptimism_rootCounts: Array<devnetoptimism_RootCount>;
  devnetoptimism_rootMessageSent?: Maybe<devnetoptimism_RootMessageSent>;
  devnetoptimism_rootMessageSents: Array<devnetoptimism_RootMessageSent>;
  devnetoptimism_relayerFeesIncrease?: Maybe<devnetoptimism_RelayerFeesIncrease>;
  devnetoptimism_relayerFeesIncreases: Array<devnetoptimism_RelayerFeesIncrease>;
  devnetoptimism_slippageUpdate?: Maybe<devnetoptimism_SlippageUpdate>;
  devnetoptimism_slippageUpdates: Array<devnetoptimism_SlippageUpdate>;
  /** Access to subgraph metadata */
  devnetoptimism__meta?: Maybe<devnetoptimism__Meta_>;
};


export type Subscriptiondevnetoptimism_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_Asset_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_Asset_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_AssetStatus_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_AssetBalance_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_Router_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_Router_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_RouterDailyTVL_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_Setting_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_Setting_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_Relayer_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_Relayer_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_Sequencer_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_Sequencer_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_RelayerFee_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_OriginTransfer_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_DestinationTransfer_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_OriginMessage_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_AggregateRoot_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_ConnectorMeta_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_RootCount_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_RootCount_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_RootMessageSent_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_RelayerFeesIncrease_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetoptimism_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<devnetoptimism_OrderDirection>;
  where?: InputMaybe<devnetoptimism_SlippageUpdate_filter>;
  block?: InputMaybe<devnetoptimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetoptimism__metaArgs = {
  block?: InputMaybe<devnetoptimism_Block_height>;
};

export type devnetoptimism_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type devnetoptimism__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['devnetoptimism_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type devnetoptimism__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: devnetoptimism__Block_;
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
  devnetoptimism_asset: InContextSdkMethod<Query['devnetoptimism_asset'], Querydevnetoptimism_assetArgs, MeshContext>,
  /** null **/
  devnetoptimism_assets: InContextSdkMethod<Query['devnetoptimism_assets'], Querydevnetoptimism_assetsArgs, MeshContext>,
  /** null **/
  devnetoptimism_assetStatus: InContextSdkMethod<Query['devnetoptimism_assetStatus'], Querydevnetoptimism_assetStatusArgs, MeshContext>,
  /** null **/
  devnetoptimism_assetStatuses: InContextSdkMethod<Query['devnetoptimism_assetStatuses'], Querydevnetoptimism_assetStatusesArgs, MeshContext>,
  /** null **/
  devnetoptimism_assetBalance: InContextSdkMethod<Query['devnetoptimism_assetBalance'], Querydevnetoptimism_assetBalanceArgs, MeshContext>,
  /** null **/
  devnetoptimism_assetBalances: InContextSdkMethod<Query['devnetoptimism_assetBalances'], Querydevnetoptimism_assetBalancesArgs, MeshContext>,
  /** null **/
  devnetoptimism_router: InContextSdkMethod<Query['devnetoptimism_router'], Querydevnetoptimism_routerArgs, MeshContext>,
  /** null **/
  devnetoptimism_routers: InContextSdkMethod<Query['devnetoptimism_routers'], Querydevnetoptimism_routersArgs, MeshContext>,
  /** null **/
  devnetoptimism_routerDailyTVL: InContextSdkMethod<Query['devnetoptimism_routerDailyTVL'], Querydevnetoptimism_routerDailyTVLArgs, MeshContext>,
  /** null **/
  devnetoptimism_routerDailyTVLs: InContextSdkMethod<Query['devnetoptimism_routerDailyTVLs'], Querydevnetoptimism_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  devnetoptimism_setting: InContextSdkMethod<Query['devnetoptimism_setting'], Querydevnetoptimism_settingArgs, MeshContext>,
  /** null **/
  devnetoptimism_settings: InContextSdkMethod<Query['devnetoptimism_settings'], Querydevnetoptimism_settingsArgs, MeshContext>,
  /** null **/
  devnetoptimism_relayer: InContextSdkMethod<Query['devnetoptimism_relayer'], Querydevnetoptimism_relayerArgs, MeshContext>,
  /** null **/
  devnetoptimism_relayers: InContextSdkMethod<Query['devnetoptimism_relayers'], Querydevnetoptimism_relayersArgs, MeshContext>,
  /** null **/
  devnetoptimism_sequencer: InContextSdkMethod<Query['devnetoptimism_sequencer'], Querydevnetoptimism_sequencerArgs, MeshContext>,
  /** null **/
  devnetoptimism_sequencers: InContextSdkMethod<Query['devnetoptimism_sequencers'], Querydevnetoptimism_sequencersArgs, MeshContext>,
  /** null **/
  devnetoptimism_relayerFee: InContextSdkMethod<Query['devnetoptimism_relayerFee'], Querydevnetoptimism_relayerFeeArgs, MeshContext>,
  /** null **/
  devnetoptimism_relayerFees: InContextSdkMethod<Query['devnetoptimism_relayerFees'], Querydevnetoptimism_relayerFeesArgs, MeshContext>,
  /** null **/
  devnetoptimism_originTransfer: InContextSdkMethod<Query['devnetoptimism_originTransfer'], Querydevnetoptimism_originTransferArgs, MeshContext>,
  /** null **/
  devnetoptimism_originTransfers: InContextSdkMethod<Query['devnetoptimism_originTransfers'], Querydevnetoptimism_originTransfersArgs, MeshContext>,
  /** null **/
  devnetoptimism_destinationTransfer: InContextSdkMethod<Query['devnetoptimism_destinationTransfer'], Querydevnetoptimism_destinationTransferArgs, MeshContext>,
  /** null **/
  devnetoptimism_destinationTransfers: InContextSdkMethod<Query['devnetoptimism_destinationTransfers'], Querydevnetoptimism_destinationTransfersArgs, MeshContext>,
  /** null **/
  devnetoptimism_originMessage: InContextSdkMethod<Query['devnetoptimism_originMessage'], Querydevnetoptimism_originMessageArgs, MeshContext>,
  /** null **/
  devnetoptimism_originMessages: InContextSdkMethod<Query['devnetoptimism_originMessages'], Querydevnetoptimism_originMessagesArgs, MeshContext>,
  /** null **/
  devnetoptimism_aggregateRoot: InContextSdkMethod<Query['devnetoptimism_aggregateRoot'], Querydevnetoptimism_aggregateRootArgs, MeshContext>,
  /** null **/
  devnetoptimism_aggregateRoots: InContextSdkMethod<Query['devnetoptimism_aggregateRoots'], Querydevnetoptimism_aggregateRootsArgs, MeshContext>,
  /** null **/
  devnetoptimism_connectorMeta: InContextSdkMethod<Query['devnetoptimism_connectorMeta'], Querydevnetoptimism_connectorMetaArgs, MeshContext>,
  /** null **/
  devnetoptimism_connectorMetas: InContextSdkMethod<Query['devnetoptimism_connectorMetas'], Querydevnetoptimism_connectorMetasArgs, MeshContext>,
  /** null **/
  devnetoptimism_rootCount: InContextSdkMethod<Query['devnetoptimism_rootCount'], Querydevnetoptimism_rootCountArgs, MeshContext>,
  /** null **/
  devnetoptimism_rootCounts: InContextSdkMethod<Query['devnetoptimism_rootCounts'], Querydevnetoptimism_rootCountsArgs, MeshContext>,
  /** null **/
  devnetoptimism_rootMessageSent: InContextSdkMethod<Query['devnetoptimism_rootMessageSent'], Querydevnetoptimism_rootMessageSentArgs, MeshContext>,
  /** null **/
  devnetoptimism_rootMessageSents: InContextSdkMethod<Query['devnetoptimism_rootMessageSents'], Querydevnetoptimism_rootMessageSentsArgs, MeshContext>,
  /** null **/
  devnetoptimism_relayerFeesIncrease: InContextSdkMethod<Query['devnetoptimism_relayerFeesIncrease'], Querydevnetoptimism_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  devnetoptimism_relayerFeesIncreases: InContextSdkMethod<Query['devnetoptimism_relayerFeesIncreases'], Querydevnetoptimism_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  devnetoptimism_slippageUpdate: InContextSdkMethod<Query['devnetoptimism_slippageUpdate'], Querydevnetoptimism_slippageUpdateArgs, MeshContext>,
  /** null **/
  devnetoptimism_slippageUpdates: InContextSdkMethod<Query['devnetoptimism_slippageUpdates'], Querydevnetoptimism_slippageUpdatesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  devnetoptimism__meta: InContextSdkMethod<Query['devnetoptimism__meta'], Querydevnetoptimism__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  devnetoptimism_asset: InContextSdkMethod<Subscription['devnetoptimism_asset'], Subscriptiondevnetoptimism_assetArgs, MeshContext>,
  /** null **/
  devnetoptimism_assets: InContextSdkMethod<Subscription['devnetoptimism_assets'], Subscriptiondevnetoptimism_assetsArgs, MeshContext>,
  /** null **/
  devnetoptimism_assetStatus: InContextSdkMethod<Subscription['devnetoptimism_assetStatus'], Subscriptiondevnetoptimism_assetStatusArgs, MeshContext>,
  /** null **/
  devnetoptimism_assetStatuses: InContextSdkMethod<Subscription['devnetoptimism_assetStatuses'], Subscriptiondevnetoptimism_assetStatusesArgs, MeshContext>,
  /** null **/
  devnetoptimism_assetBalance: InContextSdkMethod<Subscription['devnetoptimism_assetBalance'], Subscriptiondevnetoptimism_assetBalanceArgs, MeshContext>,
  /** null **/
  devnetoptimism_assetBalances: InContextSdkMethod<Subscription['devnetoptimism_assetBalances'], Subscriptiondevnetoptimism_assetBalancesArgs, MeshContext>,
  /** null **/
  devnetoptimism_router: InContextSdkMethod<Subscription['devnetoptimism_router'], Subscriptiondevnetoptimism_routerArgs, MeshContext>,
  /** null **/
  devnetoptimism_routers: InContextSdkMethod<Subscription['devnetoptimism_routers'], Subscriptiondevnetoptimism_routersArgs, MeshContext>,
  /** null **/
  devnetoptimism_routerDailyTVL: InContextSdkMethod<Subscription['devnetoptimism_routerDailyTVL'], Subscriptiondevnetoptimism_routerDailyTVLArgs, MeshContext>,
  /** null **/
  devnetoptimism_routerDailyTVLs: InContextSdkMethod<Subscription['devnetoptimism_routerDailyTVLs'], Subscriptiondevnetoptimism_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  devnetoptimism_setting: InContextSdkMethod<Subscription['devnetoptimism_setting'], Subscriptiondevnetoptimism_settingArgs, MeshContext>,
  /** null **/
  devnetoptimism_settings: InContextSdkMethod<Subscription['devnetoptimism_settings'], Subscriptiondevnetoptimism_settingsArgs, MeshContext>,
  /** null **/
  devnetoptimism_relayer: InContextSdkMethod<Subscription['devnetoptimism_relayer'], Subscriptiondevnetoptimism_relayerArgs, MeshContext>,
  /** null **/
  devnetoptimism_relayers: InContextSdkMethod<Subscription['devnetoptimism_relayers'], Subscriptiondevnetoptimism_relayersArgs, MeshContext>,
  /** null **/
  devnetoptimism_sequencer: InContextSdkMethod<Subscription['devnetoptimism_sequencer'], Subscriptiondevnetoptimism_sequencerArgs, MeshContext>,
  /** null **/
  devnetoptimism_sequencers: InContextSdkMethod<Subscription['devnetoptimism_sequencers'], Subscriptiondevnetoptimism_sequencersArgs, MeshContext>,
  /** null **/
  devnetoptimism_relayerFee: InContextSdkMethod<Subscription['devnetoptimism_relayerFee'], Subscriptiondevnetoptimism_relayerFeeArgs, MeshContext>,
  /** null **/
  devnetoptimism_relayerFees: InContextSdkMethod<Subscription['devnetoptimism_relayerFees'], Subscriptiondevnetoptimism_relayerFeesArgs, MeshContext>,
  /** null **/
  devnetoptimism_originTransfer: InContextSdkMethod<Subscription['devnetoptimism_originTransfer'], Subscriptiondevnetoptimism_originTransferArgs, MeshContext>,
  /** null **/
  devnetoptimism_originTransfers: InContextSdkMethod<Subscription['devnetoptimism_originTransfers'], Subscriptiondevnetoptimism_originTransfersArgs, MeshContext>,
  /** null **/
  devnetoptimism_destinationTransfer: InContextSdkMethod<Subscription['devnetoptimism_destinationTransfer'], Subscriptiondevnetoptimism_destinationTransferArgs, MeshContext>,
  /** null **/
  devnetoptimism_destinationTransfers: InContextSdkMethod<Subscription['devnetoptimism_destinationTransfers'], Subscriptiondevnetoptimism_destinationTransfersArgs, MeshContext>,
  /** null **/
  devnetoptimism_originMessage: InContextSdkMethod<Subscription['devnetoptimism_originMessage'], Subscriptiondevnetoptimism_originMessageArgs, MeshContext>,
  /** null **/
  devnetoptimism_originMessages: InContextSdkMethod<Subscription['devnetoptimism_originMessages'], Subscriptiondevnetoptimism_originMessagesArgs, MeshContext>,
  /** null **/
  devnetoptimism_aggregateRoot: InContextSdkMethod<Subscription['devnetoptimism_aggregateRoot'], Subscriptiondevnetoptimism_aggregateRootArgs, MeshContext>,
  /** null **/
  devnetoptimism_aggregateRoots: InContextSdkMethod<Subscription['devnetoptimism_aggregateRoots'], Subscriptiondevnetoptimism_aggregateRootsArgs, MeshContext>,
  /** null **/
  devnetoptimism_connectorMeta: InContextSdkMethod<Subscription['devnetoptimism_connectorMeta'], Subscriptiondevnetoptimism_connectorMetaArgs, MeshContext>,
  /** null **/
  devnetoptimism_connectorMetas: InContextSdkMethod<Subscription['devnetoptimism_connectorMetas'], Subscriptiondevnetoptimism_connectorMetasArgs, MeshContext>,
  /** null **/
  devnetoptimism_rootCount: InContextSdkMethod<Subscription['devnetoptimism_rootCount'], Subscriptiondevnetoptimism_rootCountArgs, MeshContext>,
  /** null **/
  devnetoptimism_rootCounts: InContextSdkMethod<Subscription['devnetoptimism_rootCounts'], Subscriptiondevnetoptimism_rootCountsArgs, MeshContext>,
  /** null **/
  devnetoptimism_rootMessageSent: InContextSdkMethod<Subscription['devnetoptimism_rootMessageSent'], Subscriptiondevnetoptimism_rootMessageSentArgs, MeshContext>,
  /** null **/
  devnetoptimism_rootMessageSents: InContextSdkMethod<Subscription['devnetoptimism_rootMessageSents'], Subscriptiondevnetoptimism_rootMessageSentsArgs, MeshContext>,
  /** null **/
  devnetoptimism_relayerFeesIncrease: InContextSdkMethod<Subscription['devnetoptimism_relayerFeesIncrease'], Subscriptiondevnetoptimism_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  devnetoptimism_relayerFeesIncreases: InContextSdkMethod<Subscription['devnetoptimism_relayerFeesIncreases'], Subscriptiondevnetoptimism_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  devnetoptimism_slippageUpdate: InContextSdkMethod<Subscription['devnetoptimism_slippageUpdate'], Subscriptiondevnetoptimism_slippageUpdateArgs, MeshContext>,
  /** null **/
  devnetoptimism_slippageUpdates: InContextSdkMethod<Subscription['devnetoptimism_slippageUpdates'], Subscriptiondevnetoptimism_slippageUpdatesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  devnetoptimism__meta: InContextSdkMethod<Subscription['devnetoptimism__meta'], Subscriptiondevnetoptimism__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Devnet_Optimism"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
