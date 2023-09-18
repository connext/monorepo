// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextLocalArbitrumTypes {
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
  localarbitrum_BigDecimal: any;
  BigInt: any;
  localarbitrum_Bytes: any;
};

export type localarbitrum_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['localarbitrum_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type localarbitrum_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  root_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  root_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrum_BlockChangedFilter>;
};

export type localarbitrum_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type localarbitrum_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['localarbitrum_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['localarbitrum_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['localarbitrum_Bytes']>;
  localAsset?: Maybe<Scalars['localarbitrum_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<localarbitrum_AssetStatus>;
};

export type localarbitrum_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: localarbitrum_Router;
  asset: localarbitrum_Asset;
  feesEarned: Scalars['BigInt'];
};

export type localarbitrum_AssetBalance_filter = {
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
  router_?: InputMaybe<localarbitrum_Router_filter>;
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
  asset_?: InputMaybe<localarbitrum_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrum_BlockChangedFilter>;
};

export type localarbitrum_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'locked'
  | 'supplied'
  | 'removed'
  | 'router'
  | 'asset'
  | 'feesEarned';

export type localarbitrum_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type localarbitrum_AssetStatus_filter = {
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
  _change_block?: InputMaybe<localarbitrum_BlockChangedFilter>;
};

export type localarbitrum_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type localarbitrum_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  key_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  key_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  decimal?: InputMaybe<Scalars['BigInt']>;
  decimal_not?: InputMaybe<Scalars['BigInt']>;
  decimal_gt?: InputMaybe<Scalars['BigInt']>;
  decimal_lt?: InputMaybe<Scalars['BigInt']>;
  decimal_gte?: InputMaybe<Scalars['BigInt']>;
  decimal_lte?: InputMaybe<Scalars['BigInt']>;
  decimal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  decimal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalId?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  localAsset?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
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
  status_?: InputMaybe<localarbitrum_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrum_BlockChangedFilter>;
};

export type localarbitrum_Asset_orderBy =
  | 'id'
  | 'key'
  | 'decimal'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber'
  | 'status';

export type localarbitrum_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type localarbitrum_Block_height = {
  hash?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type localarbitrum_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['localarbitrum_Bytes']>;
  rootManager?: Maybe<Scalars['localarbitrum_Bytes']>;
  mirrorConnector?: Maybe<Scalars['localarbitrum_Bytes']>;
};

export type localarbitrum_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  amb_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  rootManager?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrum_BlockChangedFilter>;
};

export type localarbitrum_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type localarbitrum_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['localarbitrum_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<localarbitrum_TransferStatus>;
  routers?: Maybe<Array<localarbitrum_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['localarbitrum_Bytes']>;
  delegate?: Maybe<Scalars['localarbitrum_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['localarbitrum_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['localarbitrum_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['localarbitrum_Bytes']>;
  asset?: Maybe<localarbitrum_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['localarbitrum_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['localarbitrum_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['localarbitrum_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['localarbitrum_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['localarbitrum_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['localarbitrum_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type localarbitrum_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_Router_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_Router_filter>;
};

export type localarbitrum_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transferId_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<localarbitrum_TransferStatus>;
  status_not?: InputMaybe<localarbitrum_TransferStatus>;
  status_in?: InputMaybe<Array<localarbitrum_TransferStatus>>;
  status_not_in?: InputMaybe<Array<localarbitrum_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<localarbitrum_Router_filter>;
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
  to?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  to_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  to_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  delegate?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  delegate_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  callData_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
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
  originSender?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  originSender_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
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
  asset_?: InputMaybe<localarbitrum_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrum_BlockChangedFilter>;
};

export type localarbitrum_DestinationTransfer_orderBy =
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
export type localarbitrum_OrderDirection =
  | 'asc'
  | 'desc';

export type localarbitrum_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['localarbitrum_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['localarbitrum_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['localarbitrum_Bytes']>;
  root?: Maybe<Scalars['localarbitrum_Bytes']>;
  transactionHash?: Maybe<Scalars['localarbitrum_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<localarbitrum_RootCount>;
};

export type localarbitrum_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transferId_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  leaf_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  message_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  message_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  root?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  root_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  root_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transactionHash?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
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
  rootCount_?: InputMaybe<localarbitrum_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrum_BlockChangedFilter>;
};

export type localarbitrum_OriginMessage_orderBy =
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

export type localarbitrum_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['localarbitrum_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<localarbitrum_TransferStatus>;
  messageHash?: Maybe<Scalars['localarbitrum_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['localarbitrum_Bytes']>;
  delegate?: Maybe<Scalars['localarbitrum_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['localarbitrum_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['localarbitrum_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['localarbitrum_Bytes']>;
  asset?: Maybe<localarbitrum_Asset>;
  transactingAsset?: Maybe<Scalars['localarbitrum_Bytes']>;
  message?: Maybe<localarbitrum_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<localarbitrum_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['localarbitrum_Bytes']>;
  caller?: Maybe<Scalars['localarbitrum_Bytes']>;
  transactionHash?: Maybe<Scalars['localarbitrum_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['localarbitrum_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type localarbitrum_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_RelayerFee_filter>;
};

export type localarbitrum_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transferId_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<localarbitrum_TransferStatus>;
  status_not?: InputMaybe<localarbitrum_TransferStatus>;
  status_in?: InputMaybe<Array<localarbitrum_TransferStatus>>;
  status_not_in?: InputMaybe<Array<localarbitrum_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
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
  to?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  to_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  to_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  delegate?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  delegate_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  callData_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  originSender_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
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
  asset_?: InputMaybe<localarbitrum_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
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
  message_?: InputMaybe<localarbitrum_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<localarbitrum_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  caller?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  caller_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transactionHash?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrum_BlockChangedFilter>;
};

export type localarbitrum_OriginTransfer_orderBy =
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
  localarbitrum_asset?: Maybe<localarbitrum_Asset>;
  localarbitrum_assets: Array<localarbitrum_Asset>;
  localarbitrum_assetStatus?: Maybe<localarbitrum_AssetStatus>;
  localarbitrum_assetStatuses: Array<localarbitrum_AssetStatus>;
  localarbitrum_assetBalance?: Maybe<localarbitrum_AssetBalance>;
  localarbitrum_assetBalances: Array<localarbitrum_AssetBalance>;
  localarbitrum_router?: Maybe<localarbitrum_Router>;
  localarbitrum_routers: Array<localarbitrum_Router>;
  localarbitrum_routerDailyTVL?: Maybe<localarbitrum_RouterDailyTVL>;
  localarbitrum_routerDailyTVLs: Array<localarbitrum_RouterDailyTVL>;
  localarbitrum_setting?: Maybe<localarbitrum_Setting>;
  localarbitrum_settings: Array<localarbitrum_Setting>;
  localarbitrum_relayer?: Maybe<localarbitrum_Relayer>;
  localarbitrum_relayers: Array<localarbitrum_Relayer>;
  localarbitrum_sequencer?: Maybe<localarbitrum_Sequencer>;
  localarbitrum_sequencers: Array<localarbitrum_Sequencer>;
  localarbitrum_relayerFee?: Maybe<localarbitrum_RelayerFee>;
  localarbitrum_relayerFees: Array<localarbitrum_RelayerFee>;
  localarbitrum_originTransfer?: Maybe<localarbitrum_OriginTransfer>;
  localarbitrum_originTransfers: Array<localarbitrum_OriginTransfer>;
  localarbitrum_destinationTransfer?: Maybe<localarbitrum_DestinationTransfer>;
  localarbitrum_destinationTransfers: Array<localarbitrum_DestinationTransfer>;
  localarbitrum_originMessage?: Maybe<localarbitrum_OriginMessage>;
  localarbitrum_originMessages: Array<localarbitrum_OriginMessage>;
  localarbitrum_aggregateRoot?: Maybe<localarbitrum_AggregateRoot>;
  localarbitrum_aggregateRoots: Array<localarbitrum_AggregateRoot>;
  localarbitrum_connectorMeta?: Maybe<localarbitrum_ConnectorMeta>;
  localarbitrum_connectorMetas: Array<localarbitrum_ConnectorMeta>;
  localarbitrum_rootCount?: Maybe<localarbitrum_RootCount>;
  localarbitrum_rootCounts: Array<localarbitrum_RootCount>;
  localarbitrum_rootMessageSent?: Maybe<localarbitrum_RootMessageSent>;
  localarbitrum_rootMessageSents: Array<localarbitrum_RootMessageSent>;
  localarbitrum_relayerFeesIncrease?: Maybe<localarbitrum_RelayerFeesIncrease>;
  localarbitrum_relayerFeesIncreases: Array<localarbitrum_RelayerFeesIncrease>;
  localarbitrum_slippageUpdate?: Maybe<localarbitrum_SlippageUpdate>;
  localarbitrum_slippageUpdates: Array<localarbitrum_SlippageUpdate>;
  /** Access to subgraph metadata */
  localarbitrum__meta?: Maybe<localarbitrum__Meta_>;
};


export type Querylocalarbitrum_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_Asset_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_Asset_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_AssetStatus_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_AssetBalance_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_Router_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_Router_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_RouterDailyTVL_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_Setting_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_Setting_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_Relayer_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_Relayer_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_Sequencer_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_Sequencer_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_RelayerFee_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_OriginTransfer_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_DestinationTransfer_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_OriginMessage_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_AggregateRoot_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_ConnectorMeta_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_RootCount_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_RootCount_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_RootMessageSent_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_RelayerFeesIncrease_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_SlippageUpdate_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalarbitrum__metaArgs = {
  block?: InputMaybe<localarbitrum_Block_height>;
};

export type localarbitrum_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['localarbitrum_Bytes']>;
};

export type localarbitrum_RelayerFee = {
  id: Scalars['ID'];
  transfer: localarbitrum_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['localarbitrum_Bytes'];
};

export type localarbitrum_RelayerFee_filter = {
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
  transfer_?: InputMaybe<localarbitrum_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  asset_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrum_BlockChangedFilter>;
};

export type localarbitrum_RelayerFee_orderBy =
  | 'id'
  | 'transfer'
  | 'fee'
  | 'asset';

export type localarbitrum_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: localarbitrum_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['localarbitrum_Bytes']>;
  caller: Scalars['localarbitrum_Bytes'];
  transactionHash: Scalars['localarbitrum_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type localarbitrum_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<localarbitrum_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  asset_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  caller?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  caller_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transactionHash?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
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
  _change_block?: InputMaybe<localarbitrum_BlockChangedFilter>;
};

export type localarbitrum_RelayerFeesIncrease_orderBy =
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

export type localarbitrum_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  relayer_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrum_BlockChangedFilter>;
};

export type localarbitrum_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type localarbitrum_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type localarbitrum_RootCount_filter = {
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
  _change_block?: InputMaybe<localarbitrum_BlockChangedFilter>;
};

export type localarbitrum_RootCount_orderBy =
  | 'id'
  | 'count';

export type localarbitrum_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['localarbitrum_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['localarbitrum_Bytes']>;
  transactionHash?: Maybe<Scalars['localarbitrum_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type localarbitrum_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  root_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  root_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  caller_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transactionHash?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
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
  _change_block?: InputMaybe<localarbitrum_BlockChangedFilter>;
};

export type localarbitrum_RootMessageSent_orderBy =
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

export type localarbitrum_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['localarbitrum_Bytes']>;
  recipient?: Maybe<Scalars['localarbitrum_Bytes']>;
  proposedOwner?: Maybe<Scalars['localarbitrum_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<localarbitrum_AssetBalance>;
};


export type localarbitrum_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_AssetBalance_filter>;
};

export type localarbitrum_RouterDailyTVL = {
  id: Scalars['ID'];
  router: localarbitrum_Router;
  asset: localarbitrum_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type localarbitrum_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<localarbitrum_Router_filter>;
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
  asset_?: InputMaybe<localarbitrum_Asset_filter>;
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
  _change_block?: InputMaybe<localarbitrum_BlockChangedFilter>;
};

export type localarbitrum_RouterDailyTVL_orderBy =
  | 'id'
  | 'router'
  | 'asset'
  | 'timestamp'
  | 'balance';

export type localarbitrum_Router_filter = {
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
  owner?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  owner_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  recipient?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  recipient_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<localarbitrum_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrum_BlockChangedFilter>;
};

export type localarbitrum_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type localarbitrum_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['localarbitrum_Bytes']>;
};

export type localarbitrum_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrum_BlockChangedFilter>;
};

export type localarbitrum_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type localarbitrum_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['localarbitrum_Bytes'];
};

export type localarbitrum_Setting_filter = {
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
  caller?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  caller_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localarbitrum_BlockChangedFilter>;
};

export type localarbitrum_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type localarbitrum_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: localarbitrum_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['localarbitrum_Bytes'];
  transactionHash: Scalars['localarbitrum_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type localarbitrum_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<localarbitrum_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  caller_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transactionHash?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localarbitrum_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localarbitrum_Bytes']>;
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
  _change_block?: InputMaybe<localarbitrum_BlockChangedFilter>;
};

export type localarbitrum_SlippageUpdate_orderBy =
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
  localarbitrum_asset?: Maybe<localarbitrum_Asset>;
  localarbitrum_assets: Array<localarbitrum_Asset>;
  localarbitrum_assetStatus?: Maybe<localarbitrum_AssetStatus>;
  localarbitrum_assetStatuses: Array<localarbitrum_AssetStatus>;
  localarbitrum_assetBalance?: Maybe<localarbitrum_AssetBalance>;
  localarbitrum_assetBalances: Array<localarbitrum_AssetBalance>;
  localarbitrum_router?: Maybe<localarbitrum_Router>;
  localarbitrum_routers: Array<localarbitrum_Router>;
  localarbitrum_routerDailyTVL?: Maybe<localarbitrum_RouterDailyTVL>;
  localarbitrum_routerDailyTVLs: Array<localarbitrum_RouterDailyTVL>;
  localarbitrum_setting?: Maybe<localarbitrum_Setting>;
  localarbitrum_settings: Array<localarbitrum_Setting>;
  localarbitrum_relayer?: Maybe<localarbitrum_Relayer>;
  localarbitrum_relayers: Array<localarbitrum_Relayer>;
  localarbitrum_sequencer?: Maybe<localarbitrum_Sequencer>;
  localarbitrum_sequencers: Array<localarbitrum_Sequencer>;
  localarbitrum_relayerFee?: Maybe<localarbitrum_RelayerFee>;
  localarbitrum_relayerFees: Array<localarbitrum_RelayerFee>;
  localarbitrum_originTransfer?: Maybe<localarbitrum_OriginTransfer>;
  localarbitrum_originTransfers: Array<localarbitrum_OriginTransfer>;
  localarbitrum_destinationTransfer?: Maybe<localarbitrum_DestinationTransfer>;
  localarbitrum_destinationTransfers: Array<localarbitrum_DestinationTransfer>;
  localarbitrum_originMessage?: Maybe<localarbitrum_OriginMessage>;
  localarbitrum_originMessages: Array<localarbitrum_OriginMessage>;
  localarbitrum_aggregateRoot?: Maybe<localarbitrum_AggregateRoot>;
  localarbitrum_aggregateRoots: Array<localarbitrum_AggregateRoot>;
  localarbitrum_connectorMeta?: Maybe<localarbitrum_ConnectorMeta>;
  localarbitrum_connectorMetas: Array<localarbitrum_ConnectorMeta>;
  localarbitrum_rootCount?: Maybe<localarbitrum_RootCount>;
  localarbitrum_rootCounts: Array<localarbitrum_RootCount>;
  localarbitrum_rootMessageSent?: Maybe<localarbitrum_RootMessageSent>;
  localarbitrum_rootMessageSents: Array<localarbitrum_RootMessageSent>;
  localarbitrum_relayerFeesIncrease?: Maybe<localarbitrum_RelayerFeesIncrease>;
  localarbitrum_relayerFeesIncreases: Array<localarbitrum_RelayerFeesIncrease>;
  localarbitrum_slippageUpdate?: Maybe<localarbitrum_SlippageUpdate>;
  localarbitrum_slippageUpdates: Array<localarbitrum_SlippageUpdate>;
  /** Access to subgraph metadata */
  localarbitrum__meta?: Maybe<localarbitrum__Meta_>;
};


export type Subscriptionlocalarbitrum_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_Asset_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_Asset_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_AssetStatus_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_AssetBalance_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_Router_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_Router_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_RouterDailyTVL_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_Setting_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_Setting_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_Relayer_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_Relayer_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_Sequencer_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_Sequencer_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_RelayerFee_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_OriginTransfer_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_DestinationTransfer_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_OriginMessage_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_AggregateRoot_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_ConnectorMeta_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_RootCount_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_RootCount_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_RootMessageSent_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_RelayerFeesIncrease_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localarbitrum_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<localarbitrum_OrderDirection>;
  where?: InputMaybe<localarbitrum_SlippageUpdate_filter>;
  block?: InputMaybe<localarbitrum_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalarbitrum__metaArgs = {
  block?: InputMaybe<localarbitrum_Block_height>;
};

export type localarbitrum_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type localarbitrum__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['localarbitrum_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type localarbitrum__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: localarbitrum__Block_;
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
  localarbitrum_asset: InContextSdkMethod<Query['localarbitrum_asset'], Querylocalarbitrum_assetArgs, MeshContext>,
  /** null **/
  localarbitrum_assets: InContextSdkMethod<Query['localarbitrum_assets'], Querylocalarbitrum_assetsArgs, MeshContext>,
  /** null **/
  localarbitrum_assetStatus: InContextSdkMethod<Query['localarbitrum_assetStatus'], Querylocalarbitrum_assetStatusArgs, MeshContext>,
  /** null **/
  localarbitrum_assetStatuses: InContextSdkMethod<Query['localarbitrum_assetStatuses'], Querylocalarbitrum_assetStatusesArgs, MeshContext>,
  /** null **/
  localarbitrum_assetBalance: InContextSdkMethod<Query['localarbitrum_assetBalance'], Querylocalarbitrum_assetBalanceArgs, MeshContext>,
  /** null **/
  localarbitrum_assetBalances: InContextSdkMethod<Query['localarbitrum_assetBalances'], Querylocalarbitrum_assetBalancesArgs, MeshContext>,
  /** null **/
  localarbitrum_router: InContextSdkMethod<Query['localarbitrum_router'], Querylocalarbitrum_routerArgs, MeshContext>,
  /** null **/
  localarbitrum_routers: InContextSdkMethod<Query['localarbitrum_routers'], Querylocalarbitrum_routersArgs, MeshContext>,
  /** null **/
  localarbitrum_routerDailyTVL: InContextSdkMethod<Query['localarbitrum_routerDailyTVL'], Querylocalarbitrum_routerDailyTVLArgs, MeshContext>,
  /** null **/
  localarbitrum_routerDailyTVLs: InContextSdkMethod<Query['localarbitrum_routerDailyTVLs'], Querylocalarbitrum_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  localarbitrum_setting: InContextSdkMethod<Query['localarbitrum_setting'], Querylocalarbitrum_settingArgs, MeshContext>,
  /** null **/
  localarbitrum_settings: InContextSdkMethod<Query['localarbitrum_settings'], Querylocalarbitrum_settingsArgs, MeshContext>,
  /** null **/
  localarbitrum_relayer: InContextSdkMethod<Query['localarbitrum_relayer'], Querylocalarbitrum_relayerArgs, MeshContext>,
  /** null **/
  localarbitrum_relayers: InContextSdkMethod<Query['localarbitrum_relayers'], Querylocalarbitrum_relayersArgs, MeshContext>,
  /** null **/
  localarbitrum_sequencer: InContextSdkMethod<Query['localarbitrum_sequencer'], Querylocalarbitrum_sequencerArgs, MeshContext>,
  /** null **/
  localarbitrum_sequencers: InContextSdkMethod<Query['localarbitrum_sequencers'], Querylocalarbitrum_sequencersArgs, MeshContext>,
  /** null **/
  localarbitrum_relayerFee: InContextSdkMethod<Query['localarbitrum_relayerFee'], Querylocalarbitrum_relayerFeeArgs, MeshContext>,
  /** null **/
  localarbitrum_relayerFees: InContextSdkMethod<Query['localarbitrum_relayerFees'], Querylocalarbitrum_relayerFeesArgs, MeshContext>,
  /** null **/
  localarbitrum_originTransfer: InContextSdkMethod<Query['localarbitrum_originTransfer'], Querylocalarbitrum_originTransferArgs, MeshContext>,
  /** null **/
  localarbitrum_originTransfers: InContextSdkMethod<Query['localarbitrum_originTransfers'], Querylocalarbitrum_originTransfersArgs, MeshContext>,
  /** null **/
  localarbitrum_destinationTransfer: InContextSdkMethod<Query['localarbitrum_destinationTransfer'], Querylocalarbitrum_destinationTransferArgs, MeshContext>,
  /** null **/
  localarbitrum_destinationTransfers: InContextSdkMethod<Query['localarbitrum_destinationTransfers'], Querylocalarbitrum_destinationTransfersArgs, MeshContext>,
  /** null **/
  localarbitrum_originMessage: InContextSdkMethod<Query['localarbitrum_originMessage'], Querylocalarbitrum_originMessageArgs, MeshContext>,
  /** null **/
  localarbitrum_originMessages: InContextSdkMethod<Query['localarbitrum_originMessages'], Querylocalarbitrum_originMessagesArgs, MeshContext>,
  /** null **/
  localarbitrum_aggregateRoot: InContextSdkMethod<Query['localarbitrum_aggregateRoot'], Querylocalarbitrum_aggregateRootArgs, MeshContext>,
  /** null **/
  localarbitrum_aggregateRoots: InContextSdkMethod<Query['localarbitrum_aggregateRoots'], Querylocalarbitrum_aggregateRootsArgs, MeshContext>,
  /** null **/
  localarbitrum_connectorMeta: InContextSdkMethod<Query['localarbitrum_connectorMeta'], Querylocalarbitrum_connectorMetaArgs, MeshContext>,
  /** null **/
  localarbitrum_connectorMetas: InContextSdkMethod<Query['localarbitrum_connectorMetas'], Querylocalarbitrum_connectorMetasArgs, MeshContext>,
  /** null **/
  localarbitrum_rootCount: InContextSdkMethod<Query['localarbitrum_rootCount'], Querylocalarbitrum_rootCountArgs, MeshContext>,
  /** null **/
  localarbitrum_rootCounts: InContextSdkMethod<Query['localarbitrum_rootCounts'], Querylocalarbitrum_rootCountsArgs, MeshContext>,
  /** null **/
  localarbitrum_rootMessageSent: InContextSdkMethod<Query['localarbitrum_rootMessageSent'], Querylocalarbitrum_rootMessageSentArgs, MeshContext>,
  /** null **/
  localarbitrum_rootMessageSents: InContextSdkMethod<Query['localarbitrum_rootMessageSents'], Querylocalarbitrum_rootMessageSentsArgs, MeshContext>,
  /** null **/
  localarbitrum_relayerFeesIncrease: InContextSdkMethod<Query['localarbitrum_relayerFeesIncrease'], Querylocalarbitrum_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  localarbitrum_relayerFeesIncreases: InContextSdkMethod<Query['localarbitrum_relayerFeesIncreases'], Querylocalarbitrum_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  localarbitrum_slippageUpdate: InContextSdkMethod<Query['localarbitrum_slippageUpdate'], Querylocalarbitrum_slippageUpdateArgs, MeshContext>,
  /** null **/
  localarbitrum_slippageUpdates: InContextSdkMethod<Query['localarbitrum_slippageUpdates'], Querylocalarbitrum_slippageUpdatesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  localarbitrum__meta: InContextSdkMethod<Query['localarbitrum__meta'], Querylocalarbitrum__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  localarbitrum_asset: InContextSdkMethod<Subscription['localarbitrum_asset'], Subscriptionlocalarbitrum_assetArgs, MeshContext>,
  /** null **/
  localarbitrum_assets: InContextSdkMethod<Subscription['localarbitrum_assets'], Subscriptionlocalarbitrum_assetsArgs, MeshContext>,
  /** null **/
  localarbitrum_assetStatus: InContextSdkMethod<Subscription['localarbitrum_assetStatus'], Subscriptionlocalarbitrum_assetStatusArgs, MeshContext>,
  /** null **/
  localarbitrum_assetStatuses: InContextSdkMethod<Subscription['localarbitrum_assetStatuses'], Subscriptionlocalarbitrum_assetStatusesArgs, MeshContext>,
  /** null **/
  localarbitrum_assetBalance: InContextSdkMethod<Subscription['localarbitrum_assetBalance'], Subscriptionlocalarbitrum_assetBalanceArgs, MeshContext>,
  /** null **/
  localarbitrum_assetBalances: InContextSdkMethod<Subscription['localarbitrum_assetBalances'], Subscriptionlocalarbitrum_assetBalancesArgs, MeshContext>,
  /** null **/
  localarbitrum_router: InContextSdkMethod<Subscription['localarbitrum_router'], Subscriptionlocalarbitrum_routerArgs, MeshContext>,
  /** null **/
  localarbitrum_routers: InContextSdkMethod<Subscription['localarbitrum_routers'], Subscriptionlocalarbitrum_routersArgs, MeshContext>,
  /** null **/
  localarbitrum_routerDailyTVL: InContextSdkMethod<Subscription['localarbitrum_routerDailyTVL'], Subscriptionlocalarbitrum_routerDailyTVLArgs, MeshContext>,
  /** null **/
  localarbitrum_routerDailyTVLs: InContextSdkMethod<Subscription['localarbitrum_routerDailyTVLs'], Subscriptionlocalarbitrum_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  localarbitrum_setting: InContextSdkMethod<Subscription['localarbitrum_setting'], Subscriptionlocalarbitrum_settingArgs, MeshContext>,
  /** null **/
  localarbitrum_settings: InContextSdkMethod<Subscription['localarbitrum_settings'], Subscriptionlocalarbitrum_settingsArgs, MeshContext>,
  /** null **/
  localarbitrum_relayer: InContextSdkMethod<Subscription['localarbitrum_relayer'], Subscriptionlocalarbitrum_relayerArgs, MeshContext>,
  /** null **/
  localarbitrum_relayers: InContextSdkMethod<Subscription['localarbitrum_relayers'], Subscriptionlocalarbitrum_relayersArgs, MeshContext>,
  /** null **/
  localarbitrum_sequencer: InContextSdkMethod<Subscription['localarbitrum_sequencer'], Subscriptionlocalarbitrum_sequencerArgs, MeshContext>,
  /** null **/
  localarbitrum_sequencers: InContextSdkMethod<Subscription['localarbitrum_sequencers'], Subscriptionlocalarbitrum_sequencersArgs, MeshContext>,
  /** null **/
  localarbitrum_relayerFee: InContextSdkMethod<Subscription['localarbitrum_relayerFee'], Subscriptionlocalarbitrum_relayerFeeArgs, MeshContext>,
  /** null **/
  localarbitrum_relayerFees: InContextSdkMethod<Subscription['localarbitrum_relayerFees'], Subscriptionlocalarbitrum_relayerFeesArgs, MeshContext>,
  /** null **/
  localarbitrum_originTransfer: InContextSdkMethod<Subscription['localarbitrum_originTransfer'], Subscriptionlocalarbitrum_originTransferArgs, MeshContext>,
  /** null **/
  localarbitrum_originTransfers: InContextSdkMethod<Subscription['localarbitrum_originTransfers'], Subscriptionlocalarbitrum_originTransfersArgs, MeshContext>,
  /** null **/
  localarbitrum_destinationTransfer: InContextSdkMethod<Subscription['localarbitrum_destinationTransfer'], Subscriptionlocalarbitrum_destinationTransferArgs, MeshContext>,
  /** null **/
  localarbitrum_destinationTransfers: InContextSdkMethod<Subscription['localarbitrum_destinationTransfers'], Subscriptionlocalarbitrum_destinationTransfersArgs, MeshContext>,
  /** null **/
  localarbitrum_originMessage: InContextSdkMethod<Subscription['localarbitrum_originMessage'], Subscriptionlocalarbitrum_originMessageArgs, MeshContext>,
  /** null **/
  localarbitrum_originMessages: InContextSdkMethod<Subscription['localarbitrum_originMessages'], Subscriptionlocalarbitrum_originMessagesArgs, MeshContext>,
  /** null **/
  localarbitrum_aggregateRoot: InContextSdkMethod<Subscription['localarbitrum_aggregateRoot'], Subscriptionlocalarbitrum_aggregateRootArgs, MeshContext>,
  /** null **/
  localarbitrum_aggregateRoots: InContextSdkMethod<Subscription['localarbitrum_aggregateRoots'], Subscriptionlocalarbitrum_aggregateRootsArgs, MeshContext>,
  /** null **/
  localarbitrum_connectorMeta: InContextSdkMethod<Subscription['localarbitrum_connectorMeta'], Subscriptionlocalarbitrum_connectorMetaArgs, MeshContext>,
  /** null **/
  localarbitrum_connectorMetas: InContextSdkMethod<Subscription['localarbitrum_connectorMetas'], Subscriptionlocalarbitrum_connectorMetasArgs, MeshContext>,
  /** null **/
  localarbitrum_rootCount: InContextSdkMethod<Subscription['localarbitrum_rootCount'], Subscriptionlocalarbitrum_rootCountArgs, MeshContext>,
  /** null **/
  localarbitrum_rootCounts: InContextSdkMethod<Subscription['localarbitrum_rootCounts'], Subscriptionlocalarbitrum_rootCountsArgs, MeshContext>,
  /** null **/
  localarbitrum_rootMessageSent: InContextSdkMethod<Subscription['localarbitrum_rootMessageSent'], Subscriptionlocalarbitrum_rootMessageSentArgs, MeshContext>,
  /** null **/
  localarbitrum_rootMessageSents: InContextSdkMethod<Subscription['localarbitrum_rootMessageSents'], Subscriptionlocalarbitrum_rootMessageSentsArgs, MeshContext>,
  /** null **/
  localarbitrum_relayerFeesIncrease: InContextSdkMethod<Subscription['localarbitrum_relayerFeesIncrease'], Subscriptionlocalarbitrum_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  localarbitrum_relayerFeesIncreases: InContextSdkMethod<Subscription['localarbitrum_relayerFeesIncreases'], Subscriptionlocalarbitrum_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  localarbitrum_slippageUpdate: InContextSdkMethod<Subscription['localarbitrum_slippageUpdate'], Subscriptionlocalarbitrum_slippageUpdateArgs, MeshContext>,
  /** null **/
  localarbitrum_slippageUpdates: InContextSdkMethod<Subscription['localarbitrum_slippageUpdates'], Subscriptionlocalarbitrum_slippageUpdatesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  localarbitrum__meta: InContextSdkMethod<Subscription['localarbitrum__meta'], Subscriptionlocalarbitrum__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_LocalArbitrum"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
