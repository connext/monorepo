// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextDevnetXdaiTypes {
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
  devnetxdai_BigDecimal: any;
  BigInt: any;
  devnetxdai_Bytes: any;
};

export type devnetxdai_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['devnetxdai_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type devnetxdai_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  root_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetxdai_BlockChangedFilter>;
};

export type devnetxdai_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type devnetxdai_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['devnetxdai_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['devnetxdai_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['devnetxdai_Bytes']>;
  localAsset?: Maybe<Scalars['devnetxdai_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<devnetxdai_AssetStatus>;
};

export type devnetxdai_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: devnetxdai_Router;
  asset: devnetxdai_Asset;
  feesEarned: Scalars['BigInt'];
};

export type devnetxdai_AssetBalance_filter = {
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
  router_?: InputMaybe<devnetxdai_Router_filter>;
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
  asset_?: InputMaybe<devnetxdai_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetxdai_BlockChangedFilter>;
};

export type devnetxdai_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'locked'
  | 'supplied'
  | 'removed'
  | 'router'
  | 'asset'
  | 'feesEarned';

export type devnetxdai_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type devnetxdai_AssetStatus_filter = {
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
  _change_block?: InputMaybe<devnetxdai_BlockChangedFilter>;
};

export type devnetxdai_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type devnetxdai_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  key_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  key_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  decimal?: InputMaybe<Scalars['BigInt']>;
  decimal_not?: InputMaybe<Scalars['BigInt']>;
  decimal_gt?: InputMaybe<Scalars['BigInt']>;
  decimal_lt?: InputMaybe<Scalars['BigInt']>;
  decimal_gte?: InputMaybe<Scalars['BigInt']>;
  decimal_lte?: InputMaybe<Scalars['BigInt']>;
  decimal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  decimal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalId?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  localAsset?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
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
  status_?: InputMaybe<devnetxdai_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetxdai_BlockChangedFilter>;
};

export type devnetxdai_Asset_orderBy =
  | 'id'
  | 'key'
  | 'decimal'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber'
  | 'status';

export type devnetxdai_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type devnetxdai_Block_height = {
  hash?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type devnetxdai_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['devnetxdai_Bytes']>;
  rootManager?: Maybe<Scalars['devnetxdai_Bytes']>;
  mirrorConnector?: Maybe<Scalars['devnetxdai_Bytes']>;
};

export type devnetxdai_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  amb_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  rootManager?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetxdai_BlockChangedFilter>;
};

export type devnetxdai_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type devnetxdai_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['devnetxdai_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<devnetxdai_TransferStatus>;
  routers?: Maybe<Array<devnetxdai_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['devnetxdai_Bytes']>;
  delegate?: Maybe<Scalars['devnetxdai_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['devnetxdai_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['devnetxdai_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['devnetxdai_Bytes']>;
  asset?: Maybe<devnetxdai_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['devnetxdai_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['devnetxdai_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['devnetxdai_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['devnetxdai_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['devnetxdai_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['devnetxdai_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type devnetxdai_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_Router_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_Router_filter>;
};

export type devnetxdai_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<devnetxdai_TransferStatus>;
  status_not?: InputMaybe<devnetxdai_TransferStatus>;
  status_in?: InputMaybe<Array<devnetxdai_TransferStatus>>;
  status_not_in?: InputMaybe<Array<devnetxdai_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<devnetxdai_Router_filter>;
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
  to?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  to_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  to_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  delegate?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  delegate_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  callData_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
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
  originSender?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  originSender_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
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
  asset_?: InputMaybe<devnetxdai_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetxdai_BlockChangedFilter>;
};

export type devnetxdai_DestinationTransfer_orderBy =
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
export type devnetxdai_OrderDirection =
  | 'asc'
  | 'desc';

export type devnetxdai_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['devnetxdai_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['devnetxdai_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['devnetxdai_Bytes']>;
  root?: Maybe<Scalars['devnetxdai_Bytes']>;
  transactionHash?: Maybe<Scalars['devnetxdai_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<devnetxdai_RootCount>;
};

export type devnetxdai_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  leaf_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  message_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  message_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  root?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  root_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
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
  rootCount_?: InputMaybe<devnetxdai_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetxdai_BlockChangedFilter>;
};

export type devnetxdai_OriginMessage_orderBy =
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

export type devnetxdai_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['devnetxdai_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<devnetxdai_TransferStatus>;
  messageHash?: Maybe<Scalars['devnetxdai_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['devnetxdai_Bytes']>;
  delegate?: Maybe<Scalars['devnetxdai_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['devnetxdai_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['devnetxdai_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['devnetxdai_Bytes']>;
  asset?: Maybe<devnetxdai_Asset>;
  transactingAsset?: Maybe<Scalars['devnetxdai_Bytes']>;
  message?: Maybe<devnetxdai_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<devnetxdai_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['devnetxdai_Bytes']>;
  caller?: Maybe<Scalars['devnetxdai_Bytes']>;
  transactionHash?: Maybe<Scalars['devnetxdai_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['devnetxdai_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type devnetxdai_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_RelayerFee_filter>;
};

export type devnetxdai_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<devnetxdai_TransferStatus>;
  status_not?: InputMaybe<devnetxdai_TransferStatus>;
  status_in?: InputMaybe<Array<devnetxdai_TransferStatus>>;
  status_not_in?: InputMaybe<Array<devnetxdai_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
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
  to?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  to_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  to_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  delegate?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  delegate_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  callData_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  originSender_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
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
  asset_?: InputMaybe<devnetxdai_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
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
  message_?: InputMaybe<devnetxdai_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<devnetxdai_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  caller?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  caller_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetxdai_BlockChangedFilter>;
};

export type devnetxdai_OriginTransfer_orderBy =
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
  devnetxdai_asset?: Maybe<devnetxdai_Asset>;
  devnetxdai_assets: Array<devnetxdai_Asset>;
  devnetxdai_assetStatus?: Maybe<devnetxdai_AssetStatus>;
  devnetxdai_assetStatuses: Array<devnetxdai_AssetStatus>;
  devnetxdai_assetBalance?: Maybe<devnetxdai_AssetBalance>;
  devnetxdai_assetBalances: Array<devnetxdai_AssetBalance>;
  devnetxdai_router?: Maybe<devnetxdai_Router>;
  devnetxdai_routers: Array<devnetxdai_Router>;
  devnetxdai_routerDailyTVL?: Maybe<devnetxdai_RouterDailyTVL>;
  devnetxdai_routerDailyTVLs: Array<devnetxdai_RouterDailyTVL>;
  devnetxdai_setting?: Maybe<devnetxdai_Setting>;
  devnetxdai_settings: Array<devnetxdai_Setting>;
  devnetxdai_relayer?: Maybe<devnetxdai_Relayer>;
  devnetxdai_relayers: Array<devnetxdai_Relayer>;
  devnetxdai_sequencer?: Maybe<devnetxdai_Sequencer>;
  devnetxdai_sequencers: Array<devnetxdai_Sequencer>;
  devnetxdai_relayerFee?: Maybe<devnetxdai_RelayerFee>;
  devnetxdai_relayerFees: Array<devnetxdai_RelayerFee>;
  devnetxdai_originTransfer?: Maybe<devnetxdai_OriginTransfer>;
  devnetxdai_originTransfers: Array<devnetxdai_OriginTransfer>;
  devnetxdai_destinationTransfer?: Maybe<devnetxdai_DestinationTransfer>;
  devnetxdai_destinationTransfers: Array<devnetxdai_DestinationTransfer>;
  devnetxdai_originMessage?: Maybe<devnetxdai_OriginMessage>;
  devnetxdai_originMessages: Array<devnetxdai_OriginMessage>;
  devnetxdai_aggregateRoot?: Maybe<devnetxdai_AggregateRoot>;
  devnetxdai_aggregateRoots: Array<devnetxdai_AggregateRoot>;
  devnetxdai_connectorMeta?: Maybe<devnetxdai_ConnectorMeta>;
  devnetxdai_connectorMetas: Array<devnetxdai_ConnectorMeta>;
  devnetxdai_rootCount?: Maybe<devnetxdai_RootCount>;
  devnetxdai_rootCounts: Array<devnetxdai_RootCount>;
  devnetxdai_rootMessageSent?: Maybe<devnetxdai_RootMessageSent>;
  devnetxdai_rootMessageSents: Array<devnetxdai_RootMessageSent>;
  devnetxdai_relayerFeesIncrease?: Maybe<devnetxdai_RelayerFeesIncrease>;
  devnetxdai_relayerFeesIncreases: Array<devnetxdai_RelayerFeesIncrease>;
  devnetxdai_slippageUpdate?: Maybe<devnetxdai_SlippageUpdate>;
  devnetxdai_slippageUpdates: Array<devnetxdai_SlippageUpdate>;
  /** Access to subgraph metadata */
  devnetxdai__meta?: Maybe<devnetxdai__Meta_>;
};


export type Querydevnetxdai_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_Asset_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_Asset_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_AssetStatus_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_AssetBalance_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_Router_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_Router_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_RouterDailyTVL_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_Setting_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_Setting_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_Relayer_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_Relayer_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_Sequencer_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_Sequencer_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_RelayerFee_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_OriginTransfer_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_DestinationTransfer_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_OriginMessage_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_AggregateRoot_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_ConnectorMeta_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_RootCount_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_RootCount_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_RootMessageSent_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_RelayerFeesIncrease_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_SlippageUpdate_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetxdai__metaArgs = {
  block?: InputMaybe<devnetxdai_Block_height>;
};

export type devnetxdai_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['devnetxdai_Bytes']>;
};

export type devnetxdai_RelayerFee = {
  id: Scalars['ID'];
  transfer: devnetxdai_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['devnetxdai_Bytes'];
};

export type devnetxdai_RelayerFee_filter = {
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
  transfer_?: InputMaybe<devnetxdai_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  asset_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetxdai_BlockChangedFilter>;
};

export type devnetxdai_RelayerFee_orderBy =
  | 'id'
  | 'transfer'
  | 'fee'
  | 'asset';

export type devnetxdai_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: devnetxdai_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['devnetxdai_Bytes']>;
  caller: Scalars['devnetxdai_Bytes'];
  transactionHash: Scalars['devnetxdai_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type devnetxdai_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<devnetxdai_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  asset_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  caller?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  caller_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
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
  _change_block?: InputMaybe<devnetxdai_BlockChangedFilter>;
};

export type devnetxdai_RelayerFeesIncrease_orderBy =
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

export type devnetxdai_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  relayer_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetxdai_BlockChangedFilter>;
};

export type devnetxdai_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type devnetxdai_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type devnetxdai_RootCount_filter = {
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
  _change_block?: InputMaybe<devnetxdai_BlockChangedFilter>;
};

export type devnetxdai_RootCount_orderBy =
  | 'id'
  | 'count';

export type devnetxdai_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['devnetxdai_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['devnetxdai_Bytes']>;
  transactionHash?: Maybe<Scalars['devnetxdai_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type devnetxdai_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  root_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  caller_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
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
  _change_block?: InputMaybe<devnetxdai_BlockChangedFilter>;
};

export type devnetxdai_RootMessageSent_orderBy =
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

export type devnetxdai_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['devnetxdai_Bytes']>;
  recipient?: Maybe<Scalars['devnetxdai_Bytes']>;
  proposedOwner?: Maybe<Scalars['devnetxdai_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<devnetxdai_AssetBalance>;
};


export type devnetxdai_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_AssetBalance_filter>;
};

export type devnetxdai_RouterDailyTVL = {
  id: Scalars['ID'];
  router: devnetxdai_Router;
  asset: devnetxdai_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type devnetxdai_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<devnetxdai_Router_filter>;
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
  asset_?: InputMaybe<devnetxdai_Asset_filter>;
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
  _change_block?: InputMaybe<devnetxdai_BlockChangedFilter>;
};

export type devnetxdai_RouterDailyTVL_orderBy =
  | 'id'
  | 'router'
  | 'asset'
  | 'timestamp'
  | 'balance';

export type devnetxdai_Router_filter = {
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
  owner?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  owner_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  recipient?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  recipient_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<devnetxdai_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetxdai_BlockChangedFilter>;
};

export type devnetxdai_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type devnetxdai_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['devnetxdai_Bytes']>;
};

export type devnetxdai_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetxdai_BlockChangedFilter>;
};

export type devnetxdai_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type devnetxdai_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['devnetxdai_Bytes'];
};

export type devnetxdai_Setting_filter = {
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
  caller?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  caller_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetxdai_BlockChangedFilter>;
};

export type devnetxdai_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type devnetxdai_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: devnetxdai_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['devnetxdai_Bytes'];
  transactionHash: Scalars['devnetxdai_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type devnetxdai_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<devnetxdai_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  caller_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['devnetxdai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['devnetxdai_Bytes']>;
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
  _change_block?: InputMaybe<devnetxdai_BlockChangedFilter>;
};

export type devnetxdai_SlippageUpdate_orderBy =
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
  devnetxdai_asset?: Maybe<devnetxdai_Asset>;
  devnetxdai_assets: Array<devnetxdai_Asset>;
  devnetxdai_assetStatus?: Maybe<devnetxdai_AssetStatus>;
  devnetxdai_assetStatuses: Array<devnetxdai_AssetStatus>;
  devnetxdai_assetBalance?: Maybe<devnetxdai_AssetBalance>;
  devnetxdai_assetBalances: Array<devnetxdai_AssetBalance>;
  devnetxdai_router?: Maybe<devnetxdai_Router>;
  devnetxdai_routers: Array<devnetxdai_Router>;
  devnetxdai_routerDailyTVL?: Maybe<devnetxdai_RouterDailyTVL>;
  devnetxdai_routerDailyTVLs: Array<devnetxdai_RouterDailyTVL>;
  devnetxdai_setting?: Maybe<devnetxdai_Setting>;
  devnetxdai_settings: Array<devnetxdai_Setting>;
  devnetxdai_relayer?: Maybe<devnetxdai_Relayer>;
  devnetxdai_relayers: Array<devnetxdai_Relayer>;
  devnetxdai_sequencer?: Maybe<devnetxdai_Sequencer>;
  devnetxdai_sequencers: Array<devnetxdai_Sequencer>;
  devnetxdai_relayerFee?: Maybe<devnetxdai_RelayerFee>;
  devnetxdai_relayerFees: Array<devnetxdai_RelayerFee>;
  devnetxdai_originTransfer?: Maybe<devnetxdai_OriginTransfer>;
  devnetxdai_originTransfers: Array<devnetxdai_OriginTransfer>;
  devnetxdai_destinationTransfer?: Maybe<devnetxdai_DestinationTransfer>;
  devnetxdai_destinationTransfers: Array<devnetxdai_DestinationTransfer>;
  devnetxdai_originMessage?: Maybe<devnetxdai_OriginMessage>;
  devnetxdai_originMessages: Array<devnetxdai_OriginMessage>;
  devnetxdai_aggregateRoot?: Maybe<devnetxdai_AggregateRoot>;
  devnetxdai_aggregateRoots: Array<devnetxdai_AggregateRoot>;
  devnetxdai_connectorMeta?: Maybe<devnetxdai_ConnectorMeta>;
  devnetxdai_connectorMetas: Array<devnetxdai_ConnectorMeta>;
  devnetxdai_rootCount?: Maybe<devnetxdai_RootCount>;
  devnetxdai_rootCounts: Array<devnetxdai_RootCount>;
  devnetxdai_rootMessageSent?: Maybe<devnetxdai_RootMessageSent>;
  devnetxdai_rootMessageSents: Array<devnetxdai_RootMessageSent>;
  devnetxdai_relayerFeesIncrease?: Maybe<devnetxdai_RelayerFeesIncrease>;
  devnetxdai_relayerFeesIncreases: Array<devnetxdai_RelayerFeesIncrease>;
  devnetxdai_slippageUpdate?: Maybe<devnetxdai_SlippageUpdate>;
  devnetxdai_slippageUpdates: Array<devnetxdai_SlippageUpdate>;
  /** Access to subgraph metadata */
  devnetxdai__meta?: Maybe<devnetxdai__Meta_>;
};


export type Subscriptiondevnetxdai_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_Asset_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_Asset_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_AssetStatus_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_AssetBalance_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_Router_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_Router_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_RouterDailyTVL_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_Setting_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_Setting_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_Relayer_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_Relayer_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_Sequencer_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_Sequencer_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_RelayerFee_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_OriginTransfer_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_DestinationTransfer_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_OriginMessage_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_AggregateRoot_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_ConnectorMeta_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_RootCount_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_RootCount_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_RootMessageSent_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_RelayerFeesIncrease_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetxdai_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<devnetxdai_OrderDirection>;
  where?: InputMaybe<devnetxdai_SlippageUpdate_filter>;
  block?: InputMaybe<devnetxdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetxdai__metaArgs = {
  block?: InputMaybe<devnetxdai_Block_height>;
};

export type devnetxdai_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type devnetxdai__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['devnetxdai_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type devnetxdai__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: devnetxdai__Block_;
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
  devnetxdai_asset: InContextSdkMethod<Query['devnetxdai_asset'], Querydevnetxdai_assetArgs, MeshContext>,
  /** null **/
  devnetxdai_assets: InContextSdkMethod<Query['devnetxdai_assets'], Querydevnetxdai_assetsArgs, MeshContext>,
  /** null **/
  devnetxdai_assetStatus: InContextSdkMethod<Query['devnetxdai_assetStatus'], Querydevnetxdai_assetStatusArgs, MeshContext>,
  /** null **/
  devnetxdai_assetStatuses: InContextSdkMethod<Query['devnetxdai_assetStatuses'], Querydevnetxdai_assetStatusesArgs, MeshContext>,
  /** null **/
  devnetxdai_assetBalance: InContextSdkMethod<Query['devnetxdai_assetBalance'], Querydevnetxdai_assetBalanceArgs, MeshContext>,
  /** null **/
  devnetxdai_assetBalances: InContextSdkMethod<Query['devnetxdai_assetBalances'], Querydevnetxdai_assetBalancesArgs, MeshContext>,
  /** null **/
  devnetxdai_router: InContextSdkMethod<Query['devnetxdai_router'], Querydevnetxdai_routerArgs, MeshContext>,
  /** null **/
  devnetxdai_routers: InContextSdkMethod<Query['devnetxdai_routers'], Querydevnetxdai_routersArgs, MeshContext>,
  /** null **/
  devnetxdai_routerDailyTVL: InContextSdkMethod<Query['devnetxdai_routerDailyTVL'], Querydevnetxdai_routerDailyTVLArgs, MeshContext>,
  /** null **/
  devnetxdai_routerDailyTVLs: InContextSdkMethod<Query['devnetxdai_routerDailyTVLs'], Querydevnetxdai_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  devnetxdai_setting: InContextSdkMethod<Query['devnetxdai_setting'], Querydevnetxdai_settingArgs, MeshContext>,
  /** null **/
  devnetxdai_settings: InContextSdkMethod<Query['devnetxdai_settings'], Querydevnetxdai_settingsArgs, MeshContext>,
  /** null **/
  devnetxdai_relayer: InContextSdkMethod<Query['devnetxdai_relayer'], Querydevnetxdai_relayerArgs, MeshContext>,
  /** null **/
  devnetxdai_relayers: InContextSdkMethod<Query['devnetxdai_relayers'], Querydevnetxdai_relayersArgs, MeshContext>,
  /** null **/
  devnetxdai_sequencer: InContextSdkMethod<Query['devnetxdai_sequencer'], Querydevnetxdai_sequencerArgs, MeshContext>,
  /** null **/
  devnetxdai_sequencers: InContextSdkMethod<Query['devnetxdai_sequencers'], Querydevnetxdai_sequencersArgs, MeshContext>,
  /** null **/
  devnetxdai_relayerFee: InContextSdkMethod<Query['devnetxdai_relayerFee'], Querydevnetxdai_relayerFeeArgs, MeshContext>,
  /** null **/
  devnetxdai_relayerFees: InContextSdkMethod<Query['devnetxdai_relayerFees'], Querydevnetxdai_relayerFeesArgs, MeshContext>,
  /** null **/
  devnetxdai_originTransfer: InContextSdkMethod<Query['devnetxdai_originTransfer'], Querydevnetxdai_originTransferArgs, MeshContext>,
  /** null **/
  devnetxdai_originTransfers: InContextSdkMethod<Query['devnetxdai_originTransfers'], Querydevnetxdai_originTransfersArgs, MeshContext>,
  /** null **/
  devnetxdai_destinationTransfer: InContextSdkMethod<Query['devnetxdai_destinationTransfer'], Querydevnetxdai_destinationTransferArgs, MeshContext>,
  /** null **/
  devnetxdai_destinationTransfers: InContextSdkMethod<Query['devnetxdai_destinationTransfers'], Querydevnetxdai_destinationTransfersArgs, MeshContext>,
  /** null **/
  devnetxdai_originMessage: InContextSdkMethod<Query['devnetxdai_originMessage'], Querydevnetxdai_originMessageArgs, MeshContext>,
  /** null **/
  devnetxdai_originMessages: InContextSdkMethod<Query['devnetxdai_originMessages'], Querydevnetxdai_originMessagesArgs, MeshContext>,
  /** null **/
  devnetxdai_aggregateRoot: InContextSdkMethod<Query['devnetxdai_aggregateRoot'], Querydevnetxdai_aggregateRootArgs, MeshContext>,
  /** null **/
  devnetxdai_aggregateRoots: InContextSdkMethod<Query['devnetxdai_aggregateRoots'], Querydevnetxdai_aggregateRootsArgs, MeshContext>,
  /** null **/
  devnetxdai_connectorMeta: InContextSdkMethod<Query['devnetxdai_connectorMeta'], Querydevnetxdai_connectorMetaArgs, MeshContext>,
  /** null **/
  devnetxdai_connectorMetas: InContextSdkMethod<Query['devnetxdai_connectorMetas'], Querydevnetxdai_connectorMetasArgs, MeshContext>,
  /** null **/
  devnetxdai_rootCount: InContextSdkMethod<Query['devnetxdai_rootCount'], Querydevnetxdai_rootCountArgs, MeshContext>,
  /** null **/
  devnetxdai_rootCounts: InContextSdkMethod<Query['devnetxdai_rootCounts'], Querydevnetxdai_rootCountsArgs, MeshContext>,
  /** null **/
  devnetxdai_rootMessageSent: InContextSdkMethod<Query['devnetxdai_rootMessageSent'], Querydevnetxdai_rootMessageSentArgs, MeshContext>,
  /** null **/
  devnetxdai_rootMessageSents: InContextSdkMethod<Query['devnetxdai_rootMessageSents'], Querydevnetxdai_rootMessageSentsArgs, MeshContext>,
  /** null **/
  devnetxdai_relayerFeesIncrease: InContextSdkMethod<Query['devnetxdai_relayerFeesIncrease'], Querydevnetxdai_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  devnetxdai_relayerFeesIncreases: InContextSdkMethod<Query['devnetxdai_relayerFeesIncreases'], Querydevnetxdai_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  devnetxdai_slippageUpdate: InContextSdkMethod<Query['devnetxdai_slippageUpdate'], Querydevnetxdai_slippageUpdateArgs, MeshContext>,
  /** null **/
  devnetxdai_slippageUpdates: InContextSdkMethod<Query['devnetxdai_slippageUpdates'], Querydevnetxdai_slippageUpdatesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  devnetxdai__meta: InContextSdkMethod<Query['devnetxdai__meta'], Querydevnetxdai__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  devnetxdai_asset: InContextSdkMethod<Subscription['devnetxdai_asset'], Subscriptiondevnetxdai_assetArgs, MeshContext>,
  /** null **/
  devnetxdai_assets: InContextSdkMethod<Subscription['devnetxdai_assets'], Subscriptiondevnetxdai_assetsArgs, MeshContext>,
  /** null **/
  devnetxdai_assetStatus: InContextSdkMethod<Subscription['devnetxdai_assetStatus'], Subscriptiondevnetxdai_assetStatusArgs, MeshContext>,
  /** null **/
  devnetxdai_assetStatuses: InContextSdkMethod<Subscription['devnetxdai_assetStatuses'], Subscriptiondevnetxdai_assetStatusesArgs, MeshContext>,
  /** null **/
  devnetxdai_assetBalance: InContextSdkMethod<Subscription['devnetxdai_assetBalance'], Subscriptiondevnetxdai_assetBalanceArgs, MeshContext>,
  /** null **/
  devnetxdai_assetBalances: InContextSdkMethod<Subscription['devnetxdai_assetBalances'], Subscriptiondevnetxdai_assetBalancesArgs, MeshContext>,
  /** null **/
  devnetxdai_router: InContextSdkMethod<Subscription['devnetxdai_router'], Subscriptiondevnetxdai_routerArgs, MeshContext>,
  /** null **/
  devnetxdai_routers: InContextSdkMethod<Subscription['devnetxdai_routers'], Subscriptiondevnetxdai_routersArgs, MeshContext>,
  /** null **/
  devnetxdai_routerDailyTVL: InContextSdkMethod<Subscription['devnetxdai_routerDailyTVL'], Subscriptiondevnetxdai_routerDailyTVLArgs, MeshContext>,
  /** null **/
  devnetxdai_routerDailyTVLs: InContextSdkMethod<Subscription['devnetxdai_routerDailyTVLs'], Subscriptiondevnetxdai_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  devnetxdai_setting: InContextSdkMethod<Subscription['devnetxdai_setting'], Subscriptiondevnetxdai_settingArgs, MeshContext>,
  /** null **/
  devnetxdai_settings: InContextSdkMethod<Subscription['devnetxdai_settings'], Subscriptiondevnetxdai_settingsArgs, MeshContext>,
  /** null **/
  devnetxdai_relayer: InContextSdkMethod<Subscription['devnetxdai_relayer'], Subscriptiondevnetxdai_relayerArgs, MeshContext>,
  /** null **/
  devnetxdai_relayers: InContextSdkMethod<Subscription['devnetxdai_relayers'], Subscriptiondevnetxdai_relayersArgs, MeshContext>,
  /** null **/
  devnetxdai_sequencer: InContextSdkMethod<Subscription['devnetxdai_sequencer'], Subscriptiondevnetxdai_sequencerArgs, MeshContext>,
  /** null **/
  devnetxdai_sequencers: InContextSdkMethod<Subscription['devnetxdai_sequencers'], Subscriptiondevnetxdai_sequencersArgs, MeshContext>,
  /** null **/
  devnetxdai_relayerFee: InContextSdkMethod<Subscription['devnetxdai_relayerFee'], Subscriptiondevnetxdai_relayerFeeArgs, MeshContext>,
  /** null **/
  devnetxdai_relayerFees: InContextSdkMethod<Subscription['devnetxdai_relayerFees'], Subscriptiondevnetxdai_relayerFeesArgs, MeshContext>,
  /** null **/
  devnetxdai_originTransfer: InContextSdkMethod<Subscription['devnetxdai_originTransfer'], Subscriptiondevnetxdai_originTransferArgs, MeshContext>,
  /** null **/
  devnetxdai_originTransfers: InContextSdkMethod<Subscription['devnetxdai_originTransfers'], Subscriptiondevnetxdai_originTransfersArgs, MeshContext>,
  /** null **/
  devnetxdai_destinationTransfer: InContextSdkMethod<Subscription['devnetxdai_destinationTransfer'], Subscriptiondevnetxdai_destinationTransferArgs, MeshContext>,
  /** null **/
  devnetxdai_destinationTransfers: InContextSdkMethod<Subscription['devnetxdai_destinationTransfers'], Subscriptiondevnetxdai_destinationTransfersArgs, MeshContext>,
  /** null **/
  devnetxdai_originMessage: InContextSdkMethod<Subscription['devnetxdai_originMessage'], Subscriptiondevnetxdai_originMessageArgs, MeshContext>,
  /** null **/
  devnetxdai_originMessages: InContextSdkMethod<Subscription['devnetxdai_originMessages'], Subscriptiondevnetxdai_originMessagesArgs, MeshContext>,
  /** null **/
  devnetxdai_aggregateRoot: InContextSdkMethod<Subscription['devnetxdai_aggregateRoot'], Subscriptiondevnetxdai_aggregateRootArgs, MeshContext>,
  /** null **/
  devnetxdai_aggregateRoots: InContextSdkMethod<Subscription['devnetxdai_aggregateRoots'], Subscriptiondevnetxdai_aggregateRootsArgs, MeshContext>,
  /** null **/
  devnetxdai_connectorMeta: InContextSdkMethod<Subscription['devnetxdai_connectorMeta'], Subscriptiondevnetxdai_connectorMetaArgs, MeshContext>,
  /** null **/
  devnetxdai_connectorMetas: InContextSdkMethod<Subscription['devnetxdai_connectorMetas'], Subscriptiondevnetxdai_connectorMetasArgs, MeshContext>,
  /** null **/
  devnetxdai_rootCount: InContextSdkMethod<Subscription['devnetxdai_rootCount'], Subscriptiondevnetxdai_rootCountArgs, MeshContext>,
  /** null **/
  devnetxdai_rootCounts: InContextSdkMethod<Subscription['devnetxdai_rootCounts'], Subscriptiondevnetxdai_rootCountsArgs, MeshContext>,
  /** null **/
  devnetxdai_rootMessageSent: InContextSdkMethod<Subscription['devnetxdai_rootMessageSent'], Subscriptiondevnetxdai_rootMessageSentArgs, MeshContext>,
  /** null **/
  devnetxdai_rootMessageSents: InContextSdkMethod<Subscription['devnetxdai_rootMessageSents'], Subscriptiondevnetxdai_rootMessageSentsArgs, MeshContext>,
  /** null **/
  devnetxdai_relayerFeesIncrease: InContextSdkMethod<Subscription['devnetxdai_relayerFeesIncrease'], Subscriptiondevnetxdai_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  devnetxdai_relayerFeesIncreases: InContextSdkMethod<Subscription['devnetxdai_relayerFeesIncreases'], Subscriptiondevnetxdai_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  devnetxdai_slippageUpdate: InContextSdkMethod<Subscription['devnetxdai_slippageUpdate'], Subscriptiondevnetxdai_slippageUpdateArgs, MeshContext>,
  /** null **/
  devnetxdai_slippageUpdates: InContextSdkMethod<Subscription['devnetxdai_slippageUpdates'], Subscriptiondevnetxdai_slippageUpdatesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  devnetxdai__meta: InContextSdkMethod<Subscription['devnetxdai__meta'], Subscriptiondevnetxdai__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Devnet_Xdai"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
