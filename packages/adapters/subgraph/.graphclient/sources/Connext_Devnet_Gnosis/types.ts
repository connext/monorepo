// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextDevnetGnosisTypes {
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
  devnetgnosis_BigDecimal: any;
  BigInt: any;
  devnetgnosis_Bytes: any;
};

export type devnetgnosis_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['devnetgnosis_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type devnetgnosis_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  root_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  root_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetgnosis_BlockChangedFilter>;
};

export type devnetgnosis_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type devnetgnosis_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['devnetgnosis_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['devnetgnosis_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['devnetgnosis_Bytes']>;
  localAsset?: Maybe<Scalars['devnetgnosis_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<devnetgnosis_AssetStatus>;
};

export type devnetgnosis_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: devnetgnosis_Router;
  asset: devnetgnosis_Asset;
  feesEarned: Scalars['BigInt'];
};

export type devnetgnosis_AssetBalance_filter = {
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
  router_?: InputMaybe<devnetgnosis_Router_filter>;
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
  asset_?: InputMaybe<devnetgnosis_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetgnosis_BlockChangedFilter>;
};

export type devnetgnosis_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'locked'
  | 'supplied'
  | 'removed'
  | 'router'
  | 'asset'
  | 'feesEarned';

export type devnetgnosis_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type devnetgnosis_AssetStatus_filter = {
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
  _change_block?: InputMaybe<devnetgnosis_BlockChangedFilter>;
};

export type devnetgnosis_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type devnetgnosis_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  key_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  key_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  decimal?: InputMaybe<Scalars['BigInt']>;
  decimal_not?: InputMaybe<Scalars['BigInt']>;
  decimal_gt?: InputMaybe<Scalars['BigInt']>;
  decimal_lt?: InputMaybe<Scalars['BigInt']>;
  decimal_gte?: InputMaybe<Scalars['BigInt']>;
  decimal_lte?: InputMaybe<Scalars['BigInt']>;
  decimal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  decimal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalId?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  localAsset?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
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
  status_?: InputMaybe<devnetgnosis_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetgnosis_BlockChangedFilter>;
};

export type devnetgnosis_Asset_orderBy =
  | 'id'
  | 'key'
  | 'decimal'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber'
  | 'status';

export type devnetgnosis_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type devnetgnosis_Block_height = {
  hash?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type devnetgnosis_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['devnetgnosis_Bytes']>;
  rootManager?: Maybe<Scalars['devnetgnosis_Bytes']>;
  mirrorConnector?: Maybe<Scalars['devnetgnosis_Bytes']>;
};

export type devnetgnosis_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  amb_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  rootManager?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetgnosis_BlockChangedFilter>;
};

export type devnetgnosis_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type devnetgnosis_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['devnetgnosis_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<devnetgnosis_TransferStatus>;
  routers?: Maybe<Array<devnetgnosis_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['devnetgnosis_Bytes']>;
  delegate?: Maybe<Scalars['devnetgnosis_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['devnetgnosis_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['devnetgnosis_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['devnetgnosis_Bytes']>;
  asset?: Maybe<devnetgnosis_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['devnetgnosis_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['devnetgnosis_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['devnetgnosis_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['devnetgnosis_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['devnetgnosis_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['devnetgnosis_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type devnetgnosis_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_Router_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_Router_filter>;
};

export type devnetgnosis_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transferId_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<devnetgnosis_TransferStatus>;
  status_not?: InputMaybe<devnetgnosis_TransferStatus>;
  status_in?: InputMaybe<Array<devnetgnosis_TransferStatus>>;
  status_not_in?: InputMaybe<Array<devnetgnosis_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<devnetgnosis_Router_filter>;
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
  to?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  to_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  to_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  delegate?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  delegate_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  callData_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
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
  originSender?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  originSender_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
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
  asset_?: InputMaybe<devnetgnosis_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetgnosis_BlockChangedFilter>;
};

export type devnetgnosis_DestinationTransfer_orderBy =
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
export type devnetgnosis_OrderDirection =
  | 'asc'
  | 'desc';

export type devnetgnosis_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['devnetgnosis_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['devnetgnosis_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['devnetgnosis_Bytes']>;
  root?: Maybe<Scalars['devnetgnosis_Bytes']>;
  transactionHash?: Maybe<Scalars['devnetgnosis_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<devnetgnosis_RootCount>;
};

export type devnetgnosis_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transferId_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  leaf_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  message_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  message_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  root?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  root_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  root_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transactionHash?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
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
  rootCount_?: InputMaybe<devnetgnosis_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetgnosis_BlockChangedFilter>;
};

export type devnetgnosis_OriginMessage_orderBy =
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

export type devnetgnosis_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['devnetgnosis_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<devnetgnosis_TransferStatus>;
  messageHash?: Maybe<Scalars['devnetgnosis_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['devnetgnosis_Bytes']>;
  delegate?: Maybe<Scalars['devnetgnosis_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['devnetgnosis_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['devnetgnosis_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['devnetgnosis_Bytes']>;
  asset?: Maybe<devnetgnosis_Asset>;
  transactingAsset?: Maybe<Scalars['devnetgnosis_Bytes']>;
  message?: Maybe<devnetgnosis_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<devnetgnosis_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['devnetgnosis_Bytes']>;
  caller?: Maybe<Scalars['devnetgnosis_Bytes']>;
  transactionHash?: Maybe<Scalars['devnetgnosis_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['devnetgnosis_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type devnetgnosis_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_RelayerFee_filter>;
};

export type devnetgnosis_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transferId_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<devnetgnosis_TransferStatus>;
  status_not?: InputMaybe<devnetgnosis_TransferStatus>;
  status_in?: InputMaybe<Array<devnetgnosis_TransferStatus>>;
  status_not_in?: InputMaybe<Array<devnetgnosis_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
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
  to?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  to_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  to_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  delegate?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  delegate_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  callData_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  originSender_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
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
  asset_?: InputMaybe<devnetgnosis_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
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
  message_?: InputMaybe<devnetgnosis_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<devnetgnosis_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  caller?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  caller_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transactionHash?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetgnosis_BlockChangedFilter>;
};

export type devnetgnosis_OriginTransfer_orderBy =
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
  devnetgnosis_asset?: Maybe<devnetgnosis_Asset>;
  devnetgnosis_assets: Array<devnetgnosis_Asset>;
  devnetgnosis_assetStatus?: Maybe<devnetgnosis_AssetStatus>;
  devnetgnosis_assetStatuses: Array<devnetgnosis_AssetStatus>;
  devnetgnosis_assetBalance?: Maybe<devnetgnosis_AssetBalance>;
  devnetgnosis_assetBalances: Array<devnetgnosis_AssetBalance>;
  devnetgnosis_router?: Maybe<devnetgnosis_Router>;
  devnetgnosis_routers: Array<devnetgnosis_Router>;
  devnetgnosis_routerDailyTVL?: Maybe<devnetgnosis_RouterDailyTVL>;
  devnetgnosis_routerDailyTVLs: Array<devnetgnosis_RouterDailyTVL>;
  devnetgnosis_setting?: Maybe<devnetgnosis_Setting>;
  devnetgnosis_settings: Array<devnetgnosis_Setting>;
  devnetgnosis_relayer?: Maybe<devnetgnosis_Relayer>;
  devnetgnosis_relayers: Array<devnetgnosis_Relayer>;
  devnetgnosis_sequencer?: Maybe<devnetgnosis_Sequencer>;
  devnetgnosis_sequencers: Array<devnetgnosis_Sequencer>;
  devnetgnosis_relayerFee?: Maybe<devnetgnosis_RelayerFee>;
  devnetgnosis_relayerFees: Array<devnetgnosis_RelayerFee>;
  devnetgnosis_originTransfer?: Maybe<devnetgnosis_OriginTransfer>;
  devnetgnosis_originTransfers: Array<devnetgnosis_OriginTransfer>;
  devnetgnosis_destinationTransfer?: Maybe<devnetgnosis_DestinationTransfer>;
  devnetgnosis_destinationTransfers: Array<devnetgnosis_DestinationTransfer>;
  devnetgnosis_originMessage?: Maybe<devnetgnosis_OriginMessage>;
  devnetgnosis_originMessages: Array<devnetgnosis_OriginMessage>;
  devnetgnosis_aggregateRoot?: Maybe<devnetgnosis_AggregateRoot>;
  devnetgnosis_aggregateRoots: Array<devnetgnosis_AggregateRoot>;
  devnetgnosis_connectorMeta?: Maybe<devnetgnosis_ConnectorMeta>;
  devnetgnosis_connectorMetas: Array<devnetgnosis_ConnectorMeta>;
  devnetgnosis_rootCount?: Maybe<devnetgnosis_RootCount>;
  devnetgnosis_rootCounts: Array<devnetgnosis_RootCount>;
  devnetgnosis_rootMessageSent?: Maybe<devnetgnosis_RootMessageSent>;
  devnetgnosis_rootMessageSents: Array<devnetgnosis_RootMessageSent>;
  devnetgnosis_relayerFeesIncrease?: Maybe<devnetgnosis_RelayerFeesIncrease>;
  devnetgnosis_relayerFeesIncreases: Array<devnetgnosis_RelayerFeesIncrease>;
  devnetgnosis_slippageUpdate?: Maybe<devnetgnosis_SlippageUpdate>;
  devnetgnosis_slippageUpdates: Array<devnetgnosis_SlippageUpdate>;
  /** Access to subgraph metadata */
  devnetgnosis__meta?: Maybe<devnetgnosis__Meta_>;
};


export type Querydevnetgnosis_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_Asset_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_Asset_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_AssetStatus_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_AssetBalance_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_Router_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_Router_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_RouterDailyTVL_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_Setting_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_Setting_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_Relayer_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_Relayer_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_Sequencer_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_Sequencer_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_RelayerFee_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_OriginTransfer_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_DestinationTransfer_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_OriginMessage_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_AggregateRoot_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_ConnectorMeta_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_RootCount_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_RootCount_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_RootMessageSent_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_RelayerFeesIncrease_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_SlippageUpdate_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetgnosis__metaArgs = {
  block?: InputMaybe<devnetgnosis_Block_height>;
};

export type devnetgnosis_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['devnetgnosis_Bytes']>;
};

export type devnetgnosis_RelayerFee = {
  id: Scalars['ID'];
  transfer: devnetgnosis_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['devnetgnosis_Bytes'];
};

export type devnetgnosis_RelayerFee_filter = {
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
  transfer_?: InputMaybe<devnetgnosis_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  asset_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetgnosis_BlockChangedFilter>;
};

export type devnetgnosis_RelayerFee_orderBy =
  | 'id'
  | 'transfer'
  | 'fee'
  | 'asset';

export type devnetgnosis_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: devnetgnosis_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['devnetgnosis_Bytes']>;
  caller: Scalars['devnetgnosis_Bytes'];
  transactionHash: Scalars['devnetgnosis_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type devnetgnosis_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<devnetgnosis_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  asset_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  caller?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  caller_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transactionHash?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
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
  _change_block?: InputMaybe<devnetgnosis_BlockChangedFilter>;
};

export type devnetgnosis_RelayerFeesIncrease_orderBy =
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

export type devnetgnosis_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  relayer_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetgnosis_BlockChangedFilter>;
};

export type devnetgnosis_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type devnetgnosis_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type devnetgnosis_RootCount_filter = {
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
  _change_block?: InputMaybe<devnetgnosis_BlockChangedFilter>;
};

export type devnetgnosis_RootCount_orderBy =
  | 'id'
  | 'count';

export type devnetgnosis_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['devnetgnosis_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['devnetgnosis_Bytes']>;
  transactionHash?: Maybe<Scalars['devnetgnosis_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type devnetgnosis_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  root_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  root_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  caller_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transactionHash?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
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
  _change_block?: InputMaybe<devnetgnosis_BlockChangedFilter>;
};

export type devnetgnosis_RootMessageSent_orderBy =
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

export type devnetgnosis_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['devnetgnosis_Bytes']>;
  recipient?: Maybe<Scalars['devnetgnosis_Bytes']>;
  proposedOwner?: Maybe<Scalars['devnetgnosis_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<devnetgnosis_AssetBalance>;
};


export type devnetgnosis_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_AssetBalance_filter>;
};

export type devnetgnosis_RouterDailyTVL = {
  id: Scalars['ID'];
  router: devnetgnosis_Router;
  asset: devnetgnosis_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type devnetgnosis_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<devnetgnosis_Router_filter>;
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
  asset_?: InputMaybe<devnetgnosis_Asset_filter>;
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
  _change_block?: InputMaybe<devnetgnosis_BlockChangedFilter>;
};

export type devnetgnosis_RouterDailyTVL_orderBy =
  | 'id'
  | 'router'
  | 'asset'
  | 'timestamp'
  | 'balance';

export type devnetgnosis_Router_filter = {
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
  owner?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  owner_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  recipient?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  recipient_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<devnetgnosis_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetgnosis_BlockChangedFilter>;
};

export type devnetgnosis_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type devnetgnosis_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['devnetgnosis_Bytes']>;
};

export type devnetgnosis_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetgnosis_BlockChangedFilter>;
};

export type devnetgnosis_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type devnetgnosis_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['devnetgnosis_Bytes'];
};

export type devnetgnosis_Setting_filter = {
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
  caller?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  caller_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetgnosis_BlockChangedFilter>;
};

export type devnetgnosis_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type devnetgnosis_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: devnetgnosis_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['devnetgnosis_Bytes'];
  transactionHash: Scalars['devnetgnosis_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type devnetgnosis_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<devnetgnosis_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  caller_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transactionHash?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['devnetgnosis_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['devnetgnosis_Bytes']>;
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
  _change_block?: InputMaybe<devnetgnosis_BlockChangedFilter>;
};

export type devnetgnosis_SlippageUpdate_orderBy =
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
  devnetgnosis_asset?: Maybe<devnetgnosis_Asset>;
  devnetgnosis_assets: Array<devnetgnosis_Asset>;
  devnetgnosis_assetStatus?: Maybe<devnetgnosis_AssetStatus>;
  devnetgnosis_assetStatuses: Array<devnetgnosis_AssetStatus>;
  devnetgnosis_assetBalance?: Maybe<devnetgnosis_AssetBalance>;
  devnetgnosis_assetBalances: Array<devnetgnosis_AssetBalance>;
  devnetgnosis_router?: Maybe<devnetgnosis_Router>;
  devnetgnosis_routers: Array<devnetgnosis_Router>;
  devnetgnosis_routerDailyTVL?: Maybe<devnetgnosis_RouterDailyTVL>;
  devnetgnosis_routerDailyTVLs: Array<devnetgnosis_RouterDailyTVL>;
  devnetgnosis_setting?: Maybe<devnetgnosis_Setting>;
  devnetgnosis_settings: Array<devnetgnosis_Setting>;
  devnetgnosis_relayer?: Maybe<devnetgnosis_Relayer>;
  devnetgnosis_relayers: Array<devnetgnosis_Relayer>;
  devnetgnosis_sequencer?: Maybe<devnetgnosis_Sequencer>;
  devnetgnosis_sequencers: Array<devnetgnosis_Sequencer>;
  devnetgnosis_relayerFee?: Maybe<devnetgnosis_RelayerFee>;
  devnetgnosis_relayerFees: Array<devnetgnosis_RelayerFee>;
  devnetgnosis_originTransfer?: Maybe<devnetgnosis_OriginTransfer>;
  devnetgnosis_originTransfers: Array<devnetgnosis_OriginTransfer>;
  devnetgnosis_destinationTransfer?: Maybe<devnetgnosis_DestinationTransfer>;
  devnetgnosis_destinationTransfers: Array<devnetgnosis_DestinationTransfer>;
  devnetgnosis_originMessage?: Maybe<devnetgnosis_OriginMessage>;
  devnetgnosis_originMessages: Array<devnetgnosis_OriginMessage>;
  devnetgnosis_aggregateRoot?: Maybe<devnetgnosis_AggregateRoot>;
  devnetgnosis_aggregateRoots: Array<devnetgnosis_AggregateRoot>;
  devnetgnosis_connectorMeta?: Maybe<devnetgnosis_ConnectorMeta>;
  devnetgnosis_connectorMetas: Array<devnetgnosis_ConnectorMeta>;
  devnetgnosis_rootCount?: Maybe<devnetgnosis_RootCount>;
  devnetgnosis_rootCounts: Array<devnetgnosis_RootCount>;
  devnetgnosis_rootMessageSent?: Maybe<devnetgnosis_RootMessageSent>;
  devnetgnosis_rootMessageSents: Array<devnetgnosis_RootMessageSent>;
  devnetgnosis_relayerFeesIncrease?: Maybe<devnetgnosis_RelayerFeesIncrease>;
  devnetgnosis_relayerFeesIncreases: Array<devnetgnosis_RelayerFeesIncrease>;
  devnetgnosis_slippageUpdate?: Maybe<devnetgnosis_SlippageUpdate>;
  devnetgnosis_slippageUpdates: Array<devnetgnosis_SlippageUpdate>;
  /** Access to subgraph metadata */
  devnetgnosis__meta?: Maybe<devnetgnosis__Meta_>;
};


export type Subscriptiondevnetgnosis_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_Asset_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_Asset_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_AssetStatus_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_AssetBalance_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_Router_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_Router_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_RouterDailyTVL_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_Setting_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_Setting_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_Relayer_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_Relayer_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_Sequencer_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_Sequencer_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_RelayerFee_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_OriginTransfer_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_DestinationTransfer_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_OriginMessage_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_AggregateRoot_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_ConnectorMeta_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_RootCount_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_RootCount_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_RootMessageSent_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_RelayerFeesIncrease_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetgnosis_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<devnetgnosis_OrderDirection>;
  where?: InputMaybe<devnetgnosis_SlippageUpdate_filter>;
  block?: InputMaybe<devnetgnosis_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetgnosis__metaArgs = {
  block?: InputMaybe<devnetgnosis_Block_height>;
};

export type devnetgnosis_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type devnetgnosis__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['devnetgnosis_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type devnetgnosis__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: devnetgnosis__Block_;
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
  devnetgnosis_asset: InContextSdkMethod<Query['devnetgnosis_asset'], Querydevnetgnosis_assetArgs, MeshContext>,
  /** null **/
  devnetgnosis_assets: InContextSdkMethod<Query['devnetgnosis_assets'], Querydevnetgnosis_assetsArgs, MeshContext>,
  /** null **/
  devnetgnosis_assetStatus: InContextSdkMethod<Query['devnetgnosis_assetStatus'], Querydevnetgnosis_assetStatusArgs, MeshContext>,
  /** null **/
  devnetgnosis_assetStatuses: InContextSdkMethod<Query['devnetgnosis_assetStatuses'], Querydevnetgnosis_assetStatusesArgs, MeshContext>,
  /** null **/
  devnetgnosis_assetBalance: InContextSdkMethod<Query['devnetgnosis_assetBalance'], Querydevnetgnosis_assetBalanceArgs, MeshContext>,
  /** null **/
  devnetgnosis_assetBalances: InContextSdkMethod<Query['devnetgnosis_assetBalances'], Querydevnetgnosis_assetBalancesArgs, MeshContext>,
  /** null **/
  devnetgnosis_router: InContextSdkMethod<Query['devnetgnosis_router'], Querydevnetgnosis_routerArgs, MeshContext>,
  /** null **/
  devnetgnosis_routers: InContextSdkMethod<Query['devnetgnosis_routers'], Querydevnetgnosis_routersArgs, MeshContext>,
  /** null **/
  devnetgnosis_routerDailyTVL: InContextSdkMethod<Query['devnetgnosis_routerDailyTVL'], Querydevnetgnosis_routerDailyTVLArgs, MeshContext>,
  /** null **/
  devnetgnosis_routerDailyTVLs: InContextSdkMethod<Query['devnetgnosis_routerDailyTVLs'], Querydevnetgnosis_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  devnetgnosis_setting: InContextSdkMethod<Query['devnetgnosis_setting'], Querydevnetgnosis_settingArgs, MeshContext>,
  /** null **/
  devnetgnosis_settings: InContextSdkMethod<Query['devnetgnosis_settings'], Querydevnetgnosis_settingsArgs, MeshContext>,
  /** null **/
  devnetgnosis_relayer: InContextSdkMethod<Query['devnetgnosis_relayer'], Querydevnetgnosis_relayerArgs, MeshContext>,
  /** null **/
  devnetgnosis_relayers: InContextSdkMethod<Query['devnetgnosis_relayers'], Querydevnetgnosis_relayersArgs, MeshContext>,
  /** null **/
  devnetgnosis_sequencer: InContextSdkMethod<Query['devnetgnosis_sequencer'], Querydevnetgnosis_sequencerArgs, MeshContext>,
  /** null **/
  devnetgnosis_sequencers: InContextSdkMethod<Query['devnetgnosis_sequencers'], Querydevnetgnosis_sequencersArgs, MeshContext>,
  /** null **/
  devnetgnosis_relayerFee: InContextSdkMethod<Query['devnetgnosis_relayerFee'], Querydevnetgnosis_relayerFeeArgs, MeshContext>,
  /** null **/
  devnetgnosis_relayerFees: InContextSdkMethod<Query['devnetgnosis_relayerFees'], Querydevnetgnosis_relayerFeesArgs, MeshContext>,
  /** null **/
  devnetgnosis_originTransfer: InContextSdkMethod<Query['devnetgnosis_originTransfer'], Querydevnetgnosis_originTransferArgs, MeshContext>,
  /** null **/
  devnetgnosis_originTransfers: InContextSdkMethod<Query['devnetgnosis_originTransfers'], Querydevnetgnosis_originTransfersArgs, MeshContext>,
  /** null **/
  devnetgnosis_destinationTransfer: InContextSdkMethod<Query['devnetgnosis_destinationTransfer'], Querydevnetgnosis_destinationTransferArgs, MeshContext>,
  /** null **/
  devnetgnosis_destinationTransfers: InContextSdkMethod<Query['devnetgnosis_destinationTransfers'], Querydevnetgnosis_destinationTransfersArgs, MeshContext>,
  /** null **/
  devnetgnosis_originMessage: InContextSdkMethod<Query['devnetgnosis_originMessage'], Querydevnetgnosis_originMessageArgs, MeshContext>,
  /** null **/
  devnetgnosis_originMessages: InContextSdkMethod<Query['devnetgnosis_originMessages'], Querydevnetgnosis_originMessagesArgs, MeshContext>,
  /** null **/
  devnetgnosis_aggregateRoot: InContextSdkMethod<Query['devnetgnosis_aggregateRoot'], Querydevnetgnosis_aggregateRootArgs, MeshContext>,
  /** null **/
  devnetgnosis_aggregateRoots: InContextSdkMethod<Query['devnetgnosis_aggregateRoots'], Querydevnetgnosis_aggregateRootsArgs, MeshContext>,
  /** null **/
  devnetgnosis_connectorMeta: InContextSdkMethod<Query['devnetgnosis_connectorMeta'], Querydevnetgnosis_connectorMetaArgs, MeshContext>,
  /** null **/
  devnetgnosis_connectorMetas: InContextSdkMethod<Query['devnetgnosis_connectorMetas'], Querydevnetgnosis_connectorMetasArgs, MeshContext>,
  /** null **/
  devnetgnosis_rootCount: InContextSdkMethod<Query['devnetgnosis_rootCount'], Querydevnetgnosis_rootCountArgs, MeshContext>,
  /** null **/
  devnetgnosis_rootCounts: InContextSdkMethod<Query['devnetgnosis_rootCounts'], Querydevnetgnosis_rootCountsArgs, MeshContext>,
  /** null **/
  devnetgnosis_rootMessageSent: InContextSdkMethod<Query['devnetgnosis_rootMessageSent'], Querydevnetgnosis_rootMessageSentArgs, MeshContext>,
  /** null **/
  devnetgnosis_rootMessageSents: InContextSdkMethod<Query['devnetgnosis_rootMessageSents'], Querydevnetgnosis_rootMessageSentsArgs, MeshContext>,
  /** null **/
  devnetgnosis_relayerFeesIncrease: InContextSdkMethod<Query['devnetgnosis_relayerFeesIncrease'], Querydevnetgnosis_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  devnetgnosis_relayerFeesIncreases: InContextSdkMethod<Query['devnetgnosis_relayerFeesIncreases'], Querydevnetgnosis_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  devnetgnosis_slippageUpdate: InContextSdkMethod<Query['devnetgnosis_slippageUpdate'], Querydevnetgnosis_slippageUpdateArgs, MeshContext>,
  /** null **/
  devnetgnosis_slippageUpdates: InContextSdkMethod<Query['devnetgnosis_slippageUpdates'], Querydevnetgnosis_slippageUpdatesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  devnetgnosis__meta: InContextSdkMethod<Query['devnetgnosis__meta'], Querydevnetgnosis__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  devnetgnosis_asset: InContextSdkMethod<Subscription['devnetgnosis_asset'], Subscriptiondevnetgnosis_assetArgs, MeshContext>,
  /** null **/
  devnetgnosis_assets: InContextSdkMethod<Subscription['devnetgnosis_assets'], Subscriptiondevnetgnosis_assetsArgs, MeshContext>,
  /** null **/
  devnetgnosis_assetStatus: InContextSdkMethod<Subscription['devnetgnosis_assetStatus'], Subscriptiondevnetgnosis_assetStatusArgs, MeshContext>,
  /** null **/
  devnetgnosis_assetStatuses: InContextSdkMethod<Subscription['devnetgnosis_assetStatuses'], Subscriptiondevnetgnosis_assetStatusesArgs, MeshContext>,
  /** null **/
  devnetgnosis_assetBalance: InContextSdkMethod<Subscription['devnetgnosis_assetBalance'], Subscriptiondevnetgnosis_assetBalanceArgs, MeshContext>,
  /** null **/
  devnetgnosis_assetBalances: InContextSdkMethod<Subscription['devnetgnosis_assetBalances'], Subscriptiondevnetgnosis_assetBalancesArgs, MeshContext>,
  /** null **/
  devnetgnosis_router: InContextSdkMethod<Subscription['devnetgnosis_router'], Subscriptiondevnetgnosis_routerArgs, MeshContext>,
  /** null **/
  devnetgnosis_routers: InContextSdkMethod<Subscription['devnetgnosis_routers'], Subscriptiondevnetgnosis_routersArgs, MeshContext>,
  /** null **/
  devnetgnosis_routerDailyTVL: InContextSdkMethod<Subscription['devnetgnosis_routerDailyTVL'], Subscriptiondevnetgnosis_routerDailyTVLArgs, MeshContext>,
  /** null **/
  devnetgnosis_routerDailyTVLs: InContextSdkMethod<Subscription['devnetgnosis_routerDailyTVLs'], Subscriptiondevnetgnosis_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  devnetgnosis_setting: InContextSdkMethod<Subscription['devnetgnosis_setting'], Subscriptiondevnetgnosis_settingArgs, MeshContext>,
  /** null **/
  devnetgnosis_settings: InContextSdkMethod<Subscription['devnetgnosis_settings'], Subscriptiondevnetgnosis_settingsArgs, MeshContext>,
  /** null **/
  devnetgnosis_relayer: InContextSdkMethod<Subscription['devnetgnosis_relayer'], Subscriptiondevnetgnosis_relayerArgs, MeshContext>,
  /** null **/
  devnetgnosis_relayers: InContextSdkMethod<Subscription['devnetgnosis_relayers'], Subscriptiondevnetgnosis_relayersArgs, MeshContext>,
  /** null **/
  devnetgnosis_sequencer: InContextSdkMethod<Subscription['devnetgnosis_sequencer'], Subscriptiondevnetgnosis_sequencerArgs, MeshContext>,
  /** null **/
  devnetgnosis_sequencers: InContextSdkMethod<Subscription['devnetgnosis_sequencers'], Subscriptiondevnetgnosis_sequencersArgs, MeshContext>,
  /** null **/
  devnetgnosis_relayerFee: InContextSdkMethod<Subscription['devnetgnosis_relayerFee'], Subscriptiondevnetgnosis_relayerFeeArgs, MeshContext>,
  /** null **/
  devnetgnosis_relayerFees: InContextSdkMethod<Subscription['devnetgnosis_relayerFees'], Subscriptiondevnetgnosis_relayerFeesArgs, MeshContext>,
  /** null **/
  devnetgnosis_originTransfer: InContextSdkMethod<Subscription['devnetgnosis_originTransfer'], Subscriptiondevnetgnosis_originTransferArgs, MeshContext>,
  /** null **/
  devnetgnosis_originTransfers: InContextSdkMethod<Subscription['devnetgnosis_originTransfers'], Subscriptiondevnetgnosis_originTransfersArgs, MeshContext>,
  /** null **/
  devnetgnosis_destinationTransfer: InContextSdkMethod<Subscription['devnetgnosis_destinationTransfer'], Subscriptiondevnetgnosis_destinationTransferArgs, MeshContext>,
  /** null **/
  devnetgnosis_destinationTransfers: InContextSdkMethod<Subscription['devnetgnosis_destinationTransfers'], Subscriptiondevnetgnosis_destinationTransfersArgs, MeshContext>,
  /** null **/
  devnetgnosis_originMessage: InContextSdkMethod<Subscription['devnetgnosis_originMessage'], Subscriptiondevnetgnosis_originMessageArgs, MeshContext>,
  /** null **/
  devnetgnosis_originMessages: InContextSdkMethod<Subscription['devnetgnosis_originMessages'], Subscriptiondevnetgnosis_originMessagesArgs, MeshContext>,
  /** null **/
  devnetgnosis_aggregateRoot: InContextSdkMethod<Subscription['devnetgnosis_aggregateRoot'], Subscriptiondevnetgnosis_aggregateRootArgs, MeshContext>,
  /** null **/
  devnetgnosis_aggregateRoots: InContextSdkMethod<Subscription['devnetgnosis_aggregateRoots'], Subscriptiondevnetgnosis_aggregateRootsArgs, MeshContext>,
  /** null **/
  devnetgnosis_connectorMeta: InContextSdkMethod<Subscription['devnetgnosis_connectorMeta'], Subscriptiondevnetgnosis_connectorMetaArgs, MeshContext>,
  /** null **/
  devnetgnosis_connectorMetas: InContextSdkMethod<Subscription['devnetgnosis_connectorMetas'], Subscriptiondevnetgnosis_connectorMetasArgs, MeshContext>,
  /** null **/
  devnetgnosis_rootCount: InContextSdkMethod<Subscription['devnetgnosis_rootCount'], Subscriptiondevnetgnosis_rootCountArgs, MeshContext>,
  /** null **/
  devnetgnosis_rootCounts: InContextSdkMethod<Subscription['devnetgnosis_rootCounts'], Subscriptiondevnetgnosis_rootCountsArgs, MeshContext>,
  /** null **/
  devnetgnosis_rootMessageSent: InContextSdkMethod<Subscription['devnetgnosis_rootMessageSent'], Subscriptiondevnetgnosis_rootMessageSentArgs, MeshContext>,
  /** null **/
  devnetgnosis_rootMessageSents: InContextSdkMethod<Subscription['devnetgnosis_rootMessageSents'], Subscriptiondevnetgnosis_rootMessageSentsArgs, MeshContext>,
  /** null **/
  devnetgnosis_relayerFeesIncrease: InContextSdkMethod<Subscription['devnetgnosis_relayerFeesIncrease'], Subscriptiondevnetgnosis_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  devnetgnosis_relayerFeesIncreases: InContextSdkMethod<Subscription['devnetgnosis_relayerFeesIncreases'], Subscriptiondevnetgnosis_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  devnetgnosis_slippageUpdate: InContextSdkMethod<Subscription['devnetgnosis_slippageUpdate'], Subscriptiondevnetgnosis_slippageUpdateArgs, MeshContext>,
  /** null **/
  devnetgnosis_slippageUpdates: InContextSdkMethod<Subscription['devnetgnosis_slippageUpdates'], Subscriptiondevnetgnosis_slippageUpdatesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  devnetgnosis__meta: InContextSdkMethod<Subscription['devnetgnosis__meta'], Subscriptiondevnetgnosis__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Devnet_Gnosis"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
