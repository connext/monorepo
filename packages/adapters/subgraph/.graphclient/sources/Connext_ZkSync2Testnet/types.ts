// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextZkSync2TestnetTypes {
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
  zksync2testnet_BigDecimal: any;
  BigInt: any;
  zksync2testnet_Bytes: any;
};

export type zksync2testnet_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['zksync2testnet_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type zksync2testnet_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  root_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync2testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync2testnet_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync2testnet_AggregateRoot_filter>>>;
};

export type zksync2testnet_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type zksync2testnet_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['zksync2testnet_Bytes']>;
  canonicalId?: Maybe<Scalars['zksync2testnet_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['zksync2testnet_Bytes']>;
  localAsset?: Maybe<Scalars['zksync2testnet_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<zksync2testnet_AssetStatus>;
};

export type zksync2testnet_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: zksync2testnet_Router;
  asset: zksync2testnet_Asset;
  feesEarned: Scalars['BigInt'];
};

export type zksync2testnet_AssetBalance_filter = {
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
  router_?: InputMaybe<zksync2testnet_Router_filter>;
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
  asset_?: InputMaybe<zksync2testnet_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync2testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync2testnet_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync2testnet_AssetBalance_filter>>>;
};

export type zksync2testnet_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'router__id'
  | 'router__isActive'
  | 'router__owner'
  | 'router__recipient'
  | 'router__proposedOwner'
  | 'router__proposedTimestamp'
  | 'asset'
  | 'asset__id'
  | 'asset__key'
  | 'asset__canonicalId'
  | 'asset__canonicalDomain'
  | 'asset__adoptedAsset'
  | 'asset__localAsset'
  | 'asset__blockNumber'
  | 'feesEarned';

export type zksync2testnet_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type zksync2testnet_AssetStatus_filter = {
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
  _change_block?: InputMaybe<zksync2testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync2testnet_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync2testnet_AssetStatus_filter>>>;
};

export type zksync2testnet_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type zksync2testnet_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  key_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  key_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  key_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  key_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  key_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  key_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  canonicalId?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  localAsset?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
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
  status_?: InputMaybe<zksync2testnet_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync2testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync2testnet_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync2testnet_Asset_filter>>>;
};

export type zksync2testnet_Asset_orderBy =
  | 'id'
  | 'key'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber'
  | 'status'
  | 'status__id'
  | 'status__status';

export type zksync2testnet_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type zksync2testnet_Block_height = {
  hash?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type zksync2testnet_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['zksync2testnet_Bytes']>;
  rootManager?: Maybe<Scalars['zksync2testnet_Bytes']>;
  mirrorConnector?: Maybe<Scalars['zksync2testnet_Bytes']>;
};

export type zksync2testnet_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync2testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync2testnet_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync2testnet_ConnectorMeta_filter>>>;
};

export type zksync2testnet_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type zksync2testnet_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['zksync2testnet_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<zksync2testnet_TransferStatus>;
  routers?: Maybe<Array<zksync2testnet_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['zksync2testnet_Bytes']>;
  delegate?: Maybe<Scalars['zksync2testnet_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['zksync2testnet_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['zksync2testnet_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['zksync2testnet_Bytes']>;
  asset?: Maybe<zksync2testnet_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['zksync2testnet_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['zksync2testnet_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['zksync2testnet_Bytes']>;
  reconciledCaller?: Maybe<Scalars['zksync2testnet_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['zksync2testnet_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['zksync2testnet_Bytes']>;
};


export type zksync2testnet_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_Router_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_Router_filter>;
};

export type zksync2testnet_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transferId_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<zksync2testnet_TransferStatus>;
  status_not?: InputMaybe<zksync2testnet_TransferStatus>;
  status_in?: InputMaybe<Array<zksync2testnet_TransferStatus>>;
  status_not_in?: InputMaybe<Array<zksync2testnet_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<zksync2testnet_Router_filter>;
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
  to?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  to_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  to_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  to_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  to_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  to_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  to_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  delegate?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  delegate_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  callData_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  callData_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  callData_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  callData_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  callData_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
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
  originSender?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  originSender_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
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
  asset_?: InputMaybe<zksync2testnet_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  reconciledCaller?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync2testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync2testnet_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync2testnet_DestinationTransfer_filter>>>;
};

export type zksync2testnet_DestinationTransfer_orderBy =
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
  | 'asset__id'
  | 'asset__key'
  | 'asset__canonicalId'
  | 'asset__canonicalDomain'
  | 'asset__adoptedAsset'
  | 'asset__localAsset'
  | 'asset__blockNumber'
  | 'amount'
  | 'routersFee'
  | 'executedCaller'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'executedTxOrigin'
  | 'reconciledCaller'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber'
  | 'reconciledTxOrigin';

/** Defines the order direction, either ascending or descending */
export type zksync2testnet_OrderDirection =
  | 'asc'
  | 'desc';

export type zksync2testnet_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['zksync2testnet_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['zksync2testnet_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['zksync2testnet_Bytes']>;
  root?: Maybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash?: Maybe<Scalars['zksync2testnet_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<zksync2testnet_RootCount>;
};

export type zksync2testnet_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transferId_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  leaf_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  message_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  message_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  message_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  message_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  message_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  message_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  root?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  root_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
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
  rootCount_?: InputMaybe<zksync2testnet_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync2testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync2testnet_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync2testnet_OriginMessage_filter>>>;
};

export type zksync2testnet_OriginMessage_orderBy =
  | 'id'
  | 'transferId'
  | 'destinationDomain'
  | 'leaf'
  | 'index'
  | 'message'
  | 'root'
  | 'transactionHash'
  | 'blockNumber'
  | 'rootCount'
  | 'rootCount__id'
  | 'rootCount__count';

export type zksync2testnet_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['zksync2testnet_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<zksync2testnet_TransferStatus>;
  messageHash?: Maybe<Scalars['zksync2testnet_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['zksync2testnet_Bytes']>;
  delegate?: Maybe<Scalars['zksync2testnet_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['zksync2testnet_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['zksync2testnet_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['zksync2testnet_Bytes']>;
  asset?: Maybe<zksync2testnet_Asset>;
  transactingAsset?: Maybe<Scalars['zksync2testnet_Bytes']>;
  message?: Maybe<zksync2testnet_OriginMessage>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash?: Maybe<Scalars['zksync2testnet_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['zksync2testnet_Bytes']>;
};

export type zksync2testnet_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transferId_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<zksync2testnet_TransferStatus>;
  status_not?: InputMaybe<zksync2testnet_TransferStatus>;
  status_in?: InputMaybe<Array<zksync2testnet_TransferStatus>>;
  status_not_in?: InputMaybe<Array<zksync2testnet_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
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
  to?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  to_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  to_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  to_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  to_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  to_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  to_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  delegate?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  delegate_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  callData_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  callData_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  callData_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  callData_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  callData_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  originSender_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
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
  asset_?: InputMaybe<zksync2testnet_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
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
  message_?: InputMaybe<zksync2testnet_OriginMessage_filter>;
  relayerFee?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bumpRelayerFeeCount?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_not?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_gt?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_lt?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_gte?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_lte?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bumpRelayerFeeCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync2testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync2testnet_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync2testnet_OriginTransfer_filter>>>;
};

export type zksync2testnet_OriginTransfer_orderBy =
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
  | 'asset__id'
  | 'asset__key'
  | 'asset__canonicalId'
  | 'asset__canonicalDomain'
  | 'asset__adoptedAsset'
  | 'asset__localAsset'
  | 'asset__blockNumber'
  | 'transactingAsset'
  | 'message'
  | 'message__id'
  | 'message__transferId'
  | 'message__destinationDomain'
  | 'message__leaf'
  | 'message__index'
  | 'message__message'
  | 'message__root'
  | 'message__transactionHash'
  | 'message__blockNumber'
  | 'relayerFee'
  | 'bumpRelayerFeeCount'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber'
  | 'txOrigin';

export type Query = {
  zksync2testnet_asset?: Maybe<zksync2testnet_Asset>;
  zksync2testnet_assets: Array<zksync2testnet_Asset>;
  zksync2testnet_assetStatus?: Maybe<zksync2testnet_AssetStatus>;
  zksync2testnet_assetStatuses: Array<zksync2testnet_AssetStatus>;
  zksync2testnet_assetBalance?: Maybe<zksync2testnet_AssetBalance>;
  zksync2testnet_assetBalances: Array<zksync2testnet_AssetBalance>;
  zksync2testnet_router?: Maybe<zksync2testnet_Router>;
  zksync2testnet_routers: Array<zksync2testnet_Router>;
  zksync2testnet_routerDailyTVL?: Maybe<zksync2testnet_RouterDailyTVL>;
  zksync2testnet_routerDailyTVLs: Array<zksync2testnet_RouterDailyTVL>;
  zksync2testnet_setting?: Maybe<zksync2testnet_Setting>;
  zksync2testnet_settings: Array<zksync2testnet_Setting>;
  zksync2testnet_relayer?: Maybe<zksync2testnet_Relayer>;
  zksync2testnet_relayers: Array<zksync2testnet_Relayer>;
  zksync2testnet_sequencer?: Maybe<zksync2testnet_Sequencer>;
  zksync2testnet_sequencers: Array<zksync2testnet_Sequencer>;
  zksync2testnet_originTransfer?: Maybe<zksync2testnet_OriginTransfer>;
  zksync2testnet_originTransfers: Array<zksync2testnet_OriginTransfer>;
  zksync2testnet_destinationTransfer?: Maybe<zksync2testnet_DestinationTransfer>;
  zksync2testnet_destinationTransfers: Array<zksync2testnet_DestinationTransfer>;
  zksync2testnet_originMessage?: Maybe<zksync2testnet_OriginMessage>;
  zksync2testnet_originMessages: Array<zksync2testnet_OriginMessage>;
  zksync2testnet_aggregateRoot?: Maybe<zksync2testnet_AggregateRoot>;
  zksync2testnet_aggregateRoots: Array<zksync2testnet_AggregateRoot>;
  zksync2testnet_connectorMeta?: Maybe<zksync2testnet_ConnectorMeta>;
  zksync2testnet_connectorMetas: Array<zksync2testnet_ConnectorMeta>;
  zksync2testnet_rootCount?: Maybe<zksync2testnet_RootCount>;
  zksync2testnet_rootCounts: Array<zksync2testnet_RootCount>;
  zksync2testnet_rootMessageSent?: Maybe<zksync2testnet_RootMessageSent>;
  zksync2testnet_rootMessageSents: Array<zksync2testnet_RootMessageSent>;
  zksync2testnet_relayerFeesIncrease?: Maybe<zksync2testnet_RelayerFeesIncrease>;
  zksync2testnet_relayerFeesIncreases: Array<zksync2testnet_RelayerFeesIncrease>;
  zksync2testnet_slippageUpdate?: Maybe<zksync2testnet_SlippageUpdate>;
  zksync2testnet_slippageUpdates: Array<zksync2testnet_SlippageUpdate>;
  /** Access to subgraph metadata */
  zksync2testnet__meta?: Maybe<zksync2testnet__Meta_>;
};


export type Queryzksync2testnet_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_Asset_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_Asset_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_AssetStatus_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_AssetBalance_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_Router_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_Router_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_RouterDailyTVL_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_Setting_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_Setting_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_Relayer_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_Relayer_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_Sequencer_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_Sequencer_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_OriginTransfer_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_DestinationTransfer_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_OriginMessage_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_AggregateRoot_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_ConnectorMeta_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_RootCount_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_RootCount_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_RootMessageSent_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_RelayerFeesIncrease_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_SlippageUpdate_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryzksync2testnet__metaArgs = {
  block?: InputMaybe<zksync2testnet_Block_height>;
};

export type zksync2testnet_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['zksync2testnet_Bytes']>;
};

export type zksync2testnet_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: zksync2testnet_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  caller: Scalars['zksync2testnet_Bytes'];
  transactionHash: Scalars['zksync2testnet_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type zksync2testnet_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<zksync2testnet_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
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
  _change_block?: InputMaybe<zksync2testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync2testnet_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync2testnet_RelayerFeesIncrease_filter>>>;
};

export type zksync2testnet_RelayerFeesIncrease_orderBy =
  | 'id'
  | 'transfer'
  | 'transfer__id'
  | 'transfer__chainId'
  | 'transfer__transferId'
  | 'transfer__nonce'
  | 'transfer__status'
  | 'transfer__messageHash'
  | 'transfer__originDomain'
  | 'transfer__destinationDomain'
  | 'transfer__canonicalDomain'
  | 'transfer__to'
  | 'transfer__delegate'
  | 'transfer__receiveLocal'
  | 'transfer__callData'
  | 'transfer__slippage'
  | 'transfer__originSender'
  | 'transfer__bridgedAmt'
  | 'transfer__normalizedIn'
  | 'transfer__canonicalId'
  | 'transfer__transactingAsset'
  | 'transfer__relayerFee'
  | 'transfer__bumpRelayerFeeCount'
  | 'transfer__caller'
  | 'transfer__transactionHash'
  | 'transfer__timestamp'
  | 'transfer__gasPrice'
  | 'transfer__gasLimit'
  | 'transfer__blockNumber'
  | 'transfer__txOrigin'
  | 'increase'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type zksync2testnet_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  relayer_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync2testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync2testnet_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync2testnet_Relayer_filter>>>;
};

export type zksync2testnet_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type zksync2testnet_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type zksync2testnet_RootCount_filter = {
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
  _change_block?: InputMaybe<zksync2testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync2testnet_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync2testnet_RootCount_filter>>>;
};

export type zksync2testnet_RootCount_orderBy =
  | 'id'
  | 'count';

export type zksync2testnet_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['zksync2testnet_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash?: Maybe<Scalars['zksync2testnet_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type zksync2testnet_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  root_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
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
  _change_block?: InputMaybe<zksync2testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync2testnet_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync2testnet_RootMessageSent_filter>>>;
};

export type zksync2testnet_RootMessageSent_orderBy =
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

export type zksync2testnet_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['zksync2testnet_Bytes']>;
  recipient?: Maybe<Scalars['zksync2testnet_Bytes']>;
  proposedOwner?: Maybe<Scalars['zksync2testnet_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<zksync2testnet_AssetBalance>;
};


export type zksync2testnet_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_AssetBalance_filter>;
};

export type zksync2testnet_RouterDailyTVL = {
  id: Scalars['ID'];
  router: zksync2testnet_Router;
  asset: zksync2testnet_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type zksync2testnet_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<zksync2testnet_Router_filter>;
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
  asset_?: InputMaybe<zksync2testnet_Asset_filter>;
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
  _change_block?: InputMaybe<zksync2testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync2testnet_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync2testnet_RouterDailyTVL_filter>>>;
};

export type zksync2testnet_RouterDailyTVL_orderBy =
  | 'id'
  | 'router'
  | 'router__id'
  | 'router__isActive'
  | 'router__owner'
  | 'router__recipient'
  | 'router__proposedOwner'
  | 'router__proposedTimestamp'
  | 'asset'
  | 'asset__id'
  | 'asset__key'
  | 'asset__canonicalId'
  | 'asset__canonicalDomain'
  | 'asset__adoptedAsset'
  | 'asset__localAsset'
  | 'asset__blockNumber'
  | 'timestamp'
  | 'balance';

export type zksync2testnet_Router_filter = {
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
  owner?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  owner_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  owner_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  owner_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  owner_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  owner_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  recipient?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  recipient_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<zksync2testnet_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync2testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync2testnet_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync2testnet_Router_filter>>>;
};

export type zksync2testnet_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type zksync2testnet_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['zksync2testnet_Bytes']>;
};

export type zksync2testnet_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync2testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync2testnet_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync2testnet_Sequencer_filter>>>;
};

export type zksync2testnet_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type zksync2testnet_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['zksync2testnet_Bytes'];
};

export type zksync2testnet_Setting_filter = {
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
  caller?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<zksync2testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync2testnet_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync2testnet_Setting_filter>>>;
};

export type zksync2testnet_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type zksync2testnet_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: zksync2testnet_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['zksync2testnet_Bytes'];
  transactionHash: Scalars['zksync2testnet_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type zksync2testnet_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<zksync2testnet_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['zksync2testnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['zksync2testnet_Bytes']>;
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
  _change_block?: InputMaybe<zksync2testnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<zksync2testnet_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<zksync2testnet_SlippageUpdate_filter>>>;
};

export type zksync2testnet_SlippageUpdate_orderBy =
  | 'id'
  | 'transfer'
  | 'transfer__id'
  | 'transfer__chainId'
  | 'transfer__transferId'
  | 'transfer__nonce'
  | 'transfer__status'
  | 'transfer__originDomain'
  | 'transfer__destinationDomain'
  | 'transfer__canonicalDomain'
  | 'transfer__to'
  | 'transfer__delegate'
  | 'transfer__receiveLocal'
  | 'transfer__callData'
  | 'transfer__slippage'
  | 'transfer__bumpSlippageCount'
  | 'transfer__originSender'
  | 'transfer__bridgedAmt'
  | 'transfer__normalizedIn'
  | 'transfer__canonicalId'
  | 'transfer__amount'
  | 'transfer__routersFee'
  | 'transfer__executedCaller'
  | 'transfer__executedTransactionHash'
  | 'transfer__executedTimestamp'
  | 'transfer__executedGasPrice'
  | 'transfer__executedGasLimit'
  | 'transfer__executedBlockNumber'
  | 'transfer__executedTxOrigin'
  | 'transfer__reconciledCaller'
  | 'transfer__reconciledTransactionHash'
  | 'transfer__reconciledTimestamp'
  | 'transfer__reconciledGasPrice'
  | 'transfer__reconciledGasLimit'
  | 'transfer__reconciledBlockNumber'
  | 'transfer__reconciledTxOrigin'
  | 'slippage'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type Subscription = {
  zksync2testnet_asset?: Maybe<zksync2testnet_Asset>;
  zksync2testnet_assets: Array<zksync2testnet_Asset>;
  zksync2testnet_assetStatus?: Maybe<zksync2testnet_AssetStatus>;
  zksync2testnet_assetStatuses: Array<zksync2testnet_AssetStatus>;
  zksync2testnet_assetBalance?: Maybe<zksync2testnet_AssetBalance>;
  zksync2testnet_assetBalances: Array<zksync2testnet_AssetBalance>;
  zksync2testnet_router?: Maybe<zksync2testnet_Router>;
  zksync2testnet_routers: Array<zksync2testnet_Router>;
  zksync2testnet_routerDailyTVL?: Maybe<zksync2testnet_RouterDailyTVL>;
  zksync2testnet_routerDailyTVLs: Array<zksync2testnet_RouterDailyTVL>;
  zksync2testnet_setting?: Maybe<zksync2testnet_Setting>;
  zksync2testnet_settings: Array<zksync2testnet_Setting>;
  zksync2testnet_relayer?: Maybe<zksync2testnet_Relayer>;
  zksync2testnet_relayers: Array<zksync2testnet_Relayer>;
  zksync2testnet_sequencer?: Maybe<zksync2testnet_Sequencer>;
  zksync2testnet_sequencers: Array<zksync2testnet_Sequencer>;
  zksync2testnet_originTransfer?: Maybe<zksync2testnet_OriginTransfer>;
  zksync2testnet_originTransfers: Array<zksync2testnet_OriginTransfer>;
  zksync2testnet_destinationTransfer?: Maybe<zksync2testnet_DestinationTransfer>;
  zksync2testnet_destinationTransfers: Array<zksync2testnet_DestinationTransfer>;
  zksync2testnet_originMessage?: Maybe<zksync2testnet_OriginMessage>;
  zksync2testnet_originMessages: Array<zksync2testnet_OriginMessage>;
  zksync2testnet_aggregateRoot?: Maybe<zksync2testnet_AggregateRoot>;
  zksync2testnet_aggregateRoots: Array<zksync2testnet_AggregateRoot>;
  zksync2testnet_connectorMeta?: Maybe<zksync2testnet_ConnectorMeta>;
  zksync2testnet_connectorMetas: Array<zksync2testnet_ConnectorMeta>;
  zksync2testnet_rootCount?: Maybe<zksync2testnet_RootCount>;
  zksync2testnet_rootCounts: Array<zksync2testnet_RootCount>;
  zksync2testnet_rootMessageSent?: Maybe<zksync2testnet_RootMessageSent>;
  zksync2testnet_rootMessageSents: Array<zksync2testnet_RootMessageSent>;
  zksync2testnet_relayerFeesIncrease?: Maybe<zksync2testnet_RelayerFeesIncrease>;
  zksync2testnet_relayerFeesIncreases: Array<zksync2testnet_RelayerFeesIncrease>;
  zksync2testnet_slippageUpdate?: Maybe<zksync2testnet_SlippageUpdate>;
  zksync2testnet_slippageUpdates: Array<zksync2testnet_SlippageUpdate>;
  /** Access to subgraph metadata */
  zksync2testnet__meta?: Maybe<zksync2testnet__Meta_>;
};


export type Subscriptionzksync2testnet_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_Asset_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_Asset_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_AssetStatus_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_AssetBalance_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_Router_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_Router_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_RouterDailyTVL_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_Setting_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_Setting_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_Relayer_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_Relayer_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_Sequencer_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_Sequencer_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_OriginTransfer_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_DestinationTransfer_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_OriginMessage_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_AggregateRoot_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_ConnectorMeta_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_RootCount_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_RootCount_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_RootMessageSent_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_RelayerFeesIncrease_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<zksync2testnet_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<zksync2testnet_OrderDirection>;
  where?: InputMaybe<zksync2testnet_SlippageUpdate_filter>;
  block?: InputMaybe<zksync2testnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionzksync2testnet__metaArgs = {
  block?: InputMaybe<zksync2testnet_Block_height>;
};

export type zksync2testnet_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type zksync2testnet__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['zksync2testnet_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type zksync2testnet__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: zksync2testnet__Block_;
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
  zksync2testnet_asset: InContextSdkMethod<Query['zksync2testnet_asset'], Queryzksync2testnet_assetArgs, MeshContext>,
  /** null **/
  zksync2testnet_assets: InContextSdkMethod<Query['zksync2testnet_assets'], Queryzksync2testnet_assetsArgs, MeshContext>,
  /** null **/
  zksync2testnet_assetStatus: InContextSdkMethod<Query['zksync2testnet_assetStatus'], Queryzksync2testnet_assetStatusArgs, MeshContext>,
  /** null **/
  zksync2testnet_assetStatuses: InContextSdkMethod<Query['zksync2testnet_assetStatuses'], Queryzksync2testnet_assetStatusesArgs, MeshContext>,
  /** null **/
  zksync2testnet_assetBalance: InContextSdkMethod<Query['zksync2testnet_assetBalance'], Queryzksync2testnet_assetBalanceArgs, MeshContext>,
  /** null **/
  zksync2testnet_assetBalances: InContextSdkMethod<Query['zksync2testnet_assetBalances'], Queryzksync2testnet_assetBalancesArgs, MeshContext>,
  /** null **/
  zksync2testnet_router: InContextSdkMethod<Query['zksync2testnet_router'], Queryzksync2testnet_routerArgs, MeshContext>,
  /** null **/
  zksync2testnet_routers: InContextSdkMethod<Query['zksync2testnet_routers'], Queryzksync2testnet_routersArgs, MeshContext>,
  /** null **/
  zksync2testnet_routerDailyTVL: InContextSdkMethod<Query['zksync2testnet_routerDailyTVL'], Queryzksync2testnet_routerDailyTVLArgs, MeshContext>,
  /** null **/
  zksync2testnet_routerDailyTVLs: InContextSdkMethod<Query['zksync2testnet_routerDailyTVLs'], Queryzksync2testnet_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  zksync2testnet_setting: InContextSdkMethod<Query['zksync2testnet_setting'], Queryzksync2testnet_settingArgs, MeshContext>,
  /** null **/
  zksync2testnet_settings: InContextSdkMethod<Query['zksync2testnet_settings'], Queryzksync2testnet_settingsArgs, MeshContext>,
  /** null **/
  zksync2testnet_relayer: InContextSdkMethod<Query['zksync2testnet_relayer'], Queryzksync2testnet_relayerArgs, MeshContext>,
  /** null **/
  zksync2testnet_relayers: InContextSdkMethod<Query['zksync2testnet_relayers'], Queryzksync2testnet_relayersArgs, MeshContext>,
  /** null **/
  zksync2testnet_sequencer: InContextSdkMethod<Query['zksync2testnet_sequencer'], Queryzksync2testnet_sequencerArgs, MeshContext>,
  /** null **/
  zksync2testnet_sequencers: InContextSdkMethod<Query['zksync2testnet_sequencers'], Queryzksync2testnet_sequencersArgs, MeshContext>,
  /** null **/
  zksync2testnet_originTransfer: InContextSdkMethod<Query['zksync2testnet_originTransfer'], Queryzksync2testnet_originTransferArgs, MeshContext>,
  /** null **/
  zksync2testnet_originTransfers: InContextSdkMethod<Query['zksync2testnet_originTransfers'], Queryzksync2testnet_originTransfersArgs, MeshContext>,
  /** null **/
  zksync2testnet_destinationTransfer: InContextSdkMethod<Query['zksync2testnet_destinationTransfer'], Queryzksync2testnet_destinationTransferArgs, MeshContext>,
  /** null **/
  zksync2testnet_destinationTransfers: InContextSdkMethod<Query['zksync2testnet_destinationTransfers'], Queryzksync2testnet_destinationTransfersArgs, MeshContext>,
  /** null **/
  zksync2testnet_originMessage: InContextSdkMethod<Query['zksync2testnet_originMessage'], Queryzksync2testnet_originMessageArgs, MeshContext>,
  /** null **/
  zksync2testnet_originMessages: InContextSdkMethod<Query['zksync2testnet_originMessages'], Queryzksync2testnet_originMessagesArgs, MeshContext>,
  /** null **/
  zksync2testnet_aggregateRoot: InContextSdkMethod<Query['zksync2testnet_aggregateRoot'], Queryzksync2testnet_aggregateRootArgs, MeshContext>,
  /** null **/
  zksync2testnet_aggregateRoots: InContextSdkMethod<Query['zksync2testnet_aggregateRoots'], Queryzksync2testnet_aggregateRootsArgs, MeshContext>,
  /** null **/
  zksync2testnet_connectorMeta: InContextSdkMethod<Query['zksync2testnet_connectorMeta'], Queryzksync2testnet_connectorMetaArgs, MeshContext>,
  /** null **/
  zksync2testnet_connectorMetas: InContextSdkMethod<Query['zksync2testnet_connectorMetas'], Queryzksync2testnet_connectorMetasArgs, MeshContext>,
  /** null **/
  zksync2testnet_rootCount: InContextSdkMethod<Query['zksync2testnet_rootCount'], Queryzksync2testnet_rootCountArgs, MeshContext>,
  /** null **/
  zksync2testnet_rootCounts: InContextSdkMethod<Query['zksync2testnet_rootCounts'], Queryzksync2testnet_rootCountsArgs, MeshContext>,
  /** null **/
  zksync2testnet_rootMessageSent: InContextSdkMethod<Query['zksync2testnet_rootMessageSent'], Queryzksync2testnet_rootMessageSentArgs, MeshContext>,
  /** null **/
  zksync2testnet_rootMessageSents: InContextSdkMethod<Query['zksync2testnet_rootMessageSents'], Queryzksync2testnet_rootMessageSentsArgs, MeshContext>,
  /** null **/
  zksync2testnet_relayerFeesIncrease: InContextSdkMethod<Query['zksync2testnet_relayerFeesIncrease'], Queryzksync2testnet_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  zksync2testnet_relayerFeesIncreases: InContextSdkMethod<Query['zksync2testnet_relayerFeesIncreases'], Queryzksync2testnet_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  zksync2testnet_slippageUpdate: InContextSdkMethod<Query['zksync2testnet_slippageUpdate'], Queryzksync2testnet_slippageUpdateArgs, MeshContext>,
  /** null **/
  zksync2testnet_slippageUpdates: InContextSdkMethod<Query['zksync2testnet_slippageUpdates'], Queryzksync2testnet_slippageUpdatesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  zksync2testnet__meta: InContextSdkMethod<Query['zksync2testnet__meta'], Queryzksync2testnet__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  zksync2testnet_asset: InContextSdkMethod<Subscription['zksync2testnet_asset'], Subscriptionzksync2testnet_assetArgs, MeshContext>,
  /** null **/
  zksync2testnet_assets: InContextSdkMethod<Subscription['zksync2testnet_assets'], Subscriptionzksync2testnet_assetsArgs, MeshContext>,
  /** null **/
  zksync2testnet_assetStatus: InContextSdkMethod<Subscription['zksync2testnet_assetStatus'], Subscriptionzksync2testnet_assetStatusArgs, MeshContext>,
  /** null **/
  zksync2testnet_assetStatuses: InContextSdkMethod<Subscription['zksync2testnet_assetStatuses'], Subscriptionzksync2testnet_assetStatusesArgs, MeshContext>,
  /** null **/
  zksync2testnet_assetBalance: InContextSdkMethod<Subscription['zksync2testnet_assetBalance'], Subscriptionzksync2testnet_assetBalanceArgs, MeshContext>,
  /** null **/
  zksync2testnet_assetBalances: InContextSdkMethod<Subscription['zksync2testnet_assetBalances'], Subscriptionzksync2testnet_assetBalancesArgs, MeshContext>,
  /** null **/
  zksync2testnet_router: InContextSdkMethod<Subscription['zksync2testnet_router'], Subscriptionzksync2testnet_routerArgs, MeshContext>,
  /** null **/
  zksync2testnet_routers: InContextSdkMethod<Subscription['zksync2testnet_routers'], Subscriptionzksync2testnet_routersArgs, MeshContext>,
  /** null **/
  zksync2testnet_routerDailyTVL: InContextSdkMethod<Subscription['zksync2testnet_routerDailyTVL'], Subscriptionzksync2testnet_routerDailyTVLArgs, MeshContext>,
  /** null **/
  zksync2testnet_routerDailyTVLs: InContextSdkMethod<Subscription['zksync2testnet_routerDailyTVLs'], Subscriptionzksync2testnet_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  zksync2testnet_setting: InContextSdkMethod<Subscription['zksync2testnet_setting'], Subscriptionzksync2testnet_settingArgs, MeshContext>,
  /** null **/
  zksync2testnet_settings: InContextSdkMethod<Subscription['zksync2testnet_settings'], Subscriptionzksync2testnet_settingsArgs, MeshContext>,
  /** null **/
  zksync2testnet_relayer: InContextSdkMethod<Subscription['zksync2testnet_relayer'], Subscriptionzksync2testnet_relayerArgs, MeshContext>,
  /** null **/
  zksync2testnet_relayers: InContextSdkMethod<Subscription['zksync2testnet_relayers'], Subscriptionzksync2testnet_relayersArgs, MeshContext>,
  /** null **/
  zksync2testnet_sequencer: InContextSdkMethod<Subscription['zksync2testnet_sequencer'], Subscriptionzksync2testnet_sequencerArgs, MeshContext>,
  /** null **/
  zksync2testnet_sequencers: InContextSdkMethod<Subscription['zksync2testnet_sequencers'], Subscriptionzksync2testnet_sequencersArgs, MeshContext>,
  /** null **/
  zksync2testnet_originTransfer: InContextSdkMethod<Subscription['zksync2testnet_originTransfer'], Subscriptionzksync2testnet_originTransferArgs, MeshContext>,
  /** null **/
  zksync2testnet_originTransfers: InContextSdkMethod<Subscription['zksync2testnet_originTransfers'], Subscriptionzksync2testnet_originTransfersArgs, MeshContext>,
  /** null **/
  zksync2testnet_destinationTransfer: InContextSdkMethod<Subscription['zksync2testnet_destinationTransfer'], Subscriptionzksync2testnet_destinationTransferArgs, MeshContext>,
  /** null **/
  zksync2testnet_destinationTransfers: InContextSdkMethod<Subscription['zksync2testnet_destinationTransfers'], Subscriptionzksync2testnet_destinationTransfersArgs, MeshContext>,
  /** null **/
  zksync2testnet_originMessage: InContextSdkMethod<Subscription['zksync2testnet_originMessage'], Subscriptionzksync2testnet_originMessageArgs, MeshContext>,
  /** null **/
  zksync2testnet_originMessages: InContextSdkMethod<Subscription['zksync2testnet_originMessages'], Subscriptionzksync2testnet_originMessagesArgs, MeshContext>,
  /** null **/
  zksync2testnet_aggregateRoot: InContextSdkMethod<Subscription['zksync2testnet_aggregateRoot'], Subscriptionzksync2testnet_aggregateRootArgs, MeshContext>,
  /** null **/
  zksync2testnet_aggregateRoots: InContextSdkMethod<Subscription['zksync2testnet_aggregateRoots'], Subscriptionzksync2testnet_aggregateRootsArgs, MeshContext>,
  /** null **/
  zksync2testnet_connectorMeta: InContextSdkMethod<Subscription['zksync2testnet_connectorMeta'], Subscriptionzksync2testnet_connectorMetaArgs, MeshContext>,
  /** null **/
  zksync2testnet_connectorMetas: InContextSdkMethod<Subscription['zksync2testnet_connectorMetas'], Subscriptionzksync2testnet_connectorMetasArgs, MeshContext>,
  /** null **/
  zksync2testnet_rootCount: InContextSdkMethod<Subscription['zksync2testnet_rootCount'], Subscriptionzksync2testnet_rootCountArgs, MeshContext>,
  /** null **/
  zksync2testnet_rootCounts: InContextSdkMethod<Subscription['zksync2testnet_rootCounts'], Subscriptionzksync2testnet_rootCountsArgs, MeshContext>,
  /** null **/
  zksync2testnet_rootMessageSent: InContextSdkMethod<Subscription['zksync2testnet_rootMessageSent'], Subscriptionzksync2testnet_rootMessageSentArgs, MeshContext>,
  /** null **/
  zksync2testnet_rootMessageSents: InContextSdkMethod<Subscription['zksync2testnet_rootMessageSents'], Subscriptionzksync2testnet_rootMessageSentsArgs, MeshContext>,
  /** null **/
  zksync2testnet_relayerFeesIncrease: InContextSdkMethod<Subscription['zksync2testnet_relayerFeesIncrease'], Subscriptionzksync2testnet_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  zksync2testnet_relayerFeesIncreases: InContextSdkMethod<Subscription['zksync2testnet_relayerFeesIncreases'], Subscriptionzksync2testnet_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  zksync2testnet_slippageUpdate: InContextSdkMethod<Subscription['zksync2testnet_slippageUpdate'], Subscriptionzksync2testnet_slippageUpdateArgs, MeshContext>,
  /** null **/
  zksync2testnet_slippageUpdates: InContextSdkMethod<Subscription['zksync2testnet_slippageUpdates'], Subscriptionzksync2testnet_slippageUpdatesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  zksync2testnet__meta: InContextSdkMethod<Subscription['zksync2testnet__meta'], Subscriptionzksync2testnet__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_ZkSync2Testnet"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
