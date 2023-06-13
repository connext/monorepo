// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextConsensysTestTypes {
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
  consensystest_BigDecimal: any;
  BigInt: any;
  consensystest_Bytes: any;
};

export type consensystest_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['consensystest_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type consensystest_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['consensystest_Bytes']>;
  root_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  root_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  root_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  root_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  root_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  root_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<consensystest_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<consensystest_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<consensystest_AggregateRoot_filter>>>;
};

export type consensystest_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type consensystest_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['consensystest_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['consensystest_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['consensystest_Bytes']>;
  localAsset?: Maybe<Scalars['consensystest_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<consensystest_AssetStatus>;
};

export type consensystest_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: consensystest_Router;
  asset: consensystest_Asset;
  feesEarned: Scalars['BigInt'];
};

export type consensystest_AssetBalance_filter = {
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
  router_?: InputMaybe<consensystest_Router_filter>;
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
  asset_?: InputMaybe<consensystest_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<consensystest_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<consensystest_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<consensystest_AssetBalance_filter>>>;
};

export type consensystest_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'locked'
  | 'supplied'
  | 'removed'
  | 'router'
  | 'asset'
  | 'feesEarned';

export type consensystest_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type consensystest_AssetStatus_filter = {
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
  _change_block?: InputMaybe<consensystest_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<consensystest_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<consensystest_AssetStatus_filter>>>;
};

export type consensystest_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type consensystest_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['consensystest_Bytes']>;
  key_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  key_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  key_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  key_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  key_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  key_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  decimal?: InputMaybe<Scalars['BigInt']>;
  decimal_not?: InputMaybe<Scalars['BigInt']>;
  decimal_gt?: InputMaybe<Scalars['BigInt']>;
  decimal_lt?: InputMaybe<Scalars['BigInt']>;
  decimal_gte?: InputMaybe<Scalars['BigInt']>;
  decimal_lte?: InputMaybe<Scalars['BigInt']>;
  decimal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  decimal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalId?: InputMaybe<Scalars['consensystest_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['consensystest_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  localAsset?: InputMaybe<Scalars['consensystest_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
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
  status_?: InputMaybe<consensystest_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<consensystest_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<consensystest_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<consensystest_Asset_filter>>>;
};

export type consensystest_Asset_orderBy =
  | 'id'
  | 'key'
  | 'decimal'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber'
  | 'status';

export type consensystest_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type consensystest_Block_height = {
  hash?: InputMaybe<Scalars['consensystest_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type consensystest_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['consensystest_Bytes']>;
  rootManager?: Maybe<Scalars['consensystest_Bytes']>;
  mirrorConnector?: Maybe<Scalars['consensystest_Bytes']>;
};

export type consensystest_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['consensystest_Bytes']>;
  amb_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  amb_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  amb_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  amb_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  amb_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  rootManager?: InputMaybe<Scalars['consensystest_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['consensystest_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<consensystest_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<consensystest_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<consensystest_ConnectorMeta_filter>>>;
};

export type consensystest_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type consensystest_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['consensystest_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<consensystest_TransferStatus>;
  routers?: Maybe<Array<consensystest_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['consensystest_Bytes']>;
  delegate?: Maybe<Scalars['consensystest_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['consensystest_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['consensystest_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['consensystest_Bytes']>;
  asset?: Maybe<consensystest_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['consensystest_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['consensystest_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['consensystest_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['consensystest_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['consensystest_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['consensystest_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type consensystest_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_Router_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_Router_filter>;
};

export type consensystest_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['consensystest_Bytes']>;
  transferId_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<consensystest_TransferStatus>;
  status_not?: InputMaybe<consensystest_TransferStatus>;
  status_in?: InputMaybe<Array<consensystest_TransferStatus>>;
  status_not_in?: InputMaybe<Array<consensystest_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<consensystest_Router_filter>;
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
  to?: InputMaybe<Scalars['consensystest_Bytes']>;
  to_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  to_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  to_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  to_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  to_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  to_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  delegate?: InputMaybe<Scalars['consensystest_Bytes']>;
  delegate_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['consensystest_Bytes']>;
  callData_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  callData_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  callData_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  callData_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  callData_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
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
  originSender?: InputMaybe<Scalars['consensystest_Bytes']>;
  originSender_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['consensystest_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
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
  asset_?: InputMaybe<consensystest_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['consensystest_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['consensystest_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['consensystest_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['consensystest_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['consensystest_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['consensystest_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<consensystest_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<consensystest_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<consensystest_DestinationTransfer_filter>>>;
};

export type consensystest_DestinationTransfer_orderBy =
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
export type consensystest_OrderDirection =
  | 'asc'
  | 'desc';

export type consensystest_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['consensystest_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['consensystest_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['consensystest_Bytes']>;
  root?: Maybe<Scalars['consensystest_Bytes']>;
  transactionHash?: Maybe<Scalars['consensystest_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<consensystest_RootCount>;
};

export type consensystest_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['consensystest_Bytes']>;
  transferId_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['consensystest_Bytes']>;
  leaf_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['consensystest_Bytes']>;
  message_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  message_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  message_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  message_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  message_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  message_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  root?: InputMaybe<Scalars['consensystest_Bytes']>;
  root_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  root_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  root_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  root_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  root_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  root_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
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
  rootCount_?: InputMaybe<consensystest_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<consensystest_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<consensystest_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<consensystest_OriginMessage_filter>>>;
};

export type consensystest_OriginMessage_orderBy =
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

export type consensystest_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['consensystest_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<consensystest_TransferStatus>;
  messageHash?: Maybe<Scalars['consensystest_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['consensystest_Bytes']>;
  delegate?: Maybe<Scalars['consensystest_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['consensystest_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['consensystest_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['consensystest_Bytes']>;
  asset?: Maybe<consensystest_Asset>;
  transactingAsset?: Maybe<Scalars['consensystest_Bytes']>;
  message?: Maybe<consensystest_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<consensystest_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['consensystest_Bytes']>;
  caller?: Maybe<Scalars['consensystest_Bytes']>;
  transactionHash?: Maybe<Scalars['consensystest_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['consensystest_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type consensystest_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_RelayerFee_filter>;
};

export type consensystest_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['consensystest_Bytes']>;
  transferId_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<consensystest_TransferStatus>;
  status_not?: InputMaybe<consensystest_TransferStatus>;
  status_in?: InputMaybe<Array<consensystest_TransferStatus>>;
  status_not_in?: InputMaybe<Array<consensystest_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['consensystest_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
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
  to?: InputMaybe<Scalars['consensystest_Bytes']>;
  to_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  to_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  to_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  to_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  to_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  to_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  delegate?: InputMaybe<Scalars['consensystest_Bytes']>;
  delegate_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['consensystest_Bytes']>;
  callData_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  callData_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  callData_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  callData_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  callData_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['consensystest_Bytes']>;
  originSender_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['consensystest_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
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
  asset_?: InputMaybe<consensystest_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
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
  message_?: InputMaybe<consensystest_OriginMessage_filter>;
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
  relayerFees_?: InputMaybe<consensystest_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['consensystest_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['consensystest_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<consensystest_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<consensystest_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<consensystest_OriginTransfer_filter>>>;
};

export type consensystest_OriginTransfer_orderBy =
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
  consensystest_asset?: Maybe<consensystest_Asset>;
  consensystest_assets: Array<consensystest_Asset>;
  consensystest_assetStatus?: Maybe<consensystest_AssetStatus>;
  consensystest_assetStatuses: Array<consensystest_AssetStatus>;
  consensystest_assetBalance?: Maybe<consensystest_AssetBalance>;
  consensystest_assetBalances: Array<consensystest_AssetBalance>;
  consensystest_router?: Maybe<consensystest_Router>;
  consensystest_routers: Array<consensystest_Router>;
  consensystest_routerDailyTVL?: Maybe<consensystest_RouterDailyTVL>;
  consensystest_routerDailyTVLs: Array<consensystest_RouterDailyTVL>;
  consensystest_setting?: Maybe<consensystest_Setting>;
  consensystest_settings: Array<consensystest_Setting>;
  consensystest_relayer?: Maybe<consensystest_Relayer>;
  consensystest_relayers: Array<consensystest_Relayer>;
  consensystest_sequencer?: Maybe<consensystest_Sequencer>;
  consensystest_sequencers: Array<consensystest_Sequencer>;
  consensystest_relayerFee?: Maybe<consensystest_RelayerFee>;
  consensystest_relayerFees: Array<consensystest_RelayerFee>;
  consensystest_originTransfer?: Maybe<consensystest_OriginTransfer>;
  consensystest_originTransfers: Array<consensystest_OriginTransfer>;
  consensystest_destinationTransfer?: Maybe<consensystest_DestinationTransfer>;
  consensystest_destinationTransfers: Array<consensystest_DestinationTransfer>;
  consensystest_originMessage?: Maybe<consensystest_OriginMessage>;
  consensystest_originMessages: Array<consensystest_OriginMessage>;
  consensystest_aggregateRoot?: Maybe<consensystest_AggregateRoot>;
  consensystest_aggregateRoots: Array<consensystest_AggregateRoot>;
  consensystest_connectorMeta?: Maybe<consensystest_ConnectorMeta>;
  consensystest_connectorMetas: Array<consensystest_ConnectorMeta>;
  consensystest_rootCount?: Maybe<consensystest_RootCount>;
  consensystest_rootCounts: Array<consensystest_RootCount>;
  consensystest_rootMessageSent?: Maybe<consensystest_RootMessageSent>;
  consensystest_rootMessageSents: Array<consensystest_RootMessageSent>;
  consensystest_relayerFeesIncrease?: Maybe<consensystest_RelayerFeesIncrease>;
  consensystest_relayerFeesIncreases: Array<consensystest_RelayerFeesIncrease>;
  consensystest_slippageUpdate?: Maybe<consensystest_SlippageUpdate>;
  consensystest_slippageUpdates: Array<consensystest_SlippageUpdate>;
  /** Access to subgraph metadata */
  consensystest__meta?: Maybe<consensystest__Meta_>;
};


export type Queryconsensystest_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_Asset_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_Asset_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_AssetStatus_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_AssetBalance_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_Router_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_Router_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_RouterDailyTVL_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_Setting_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_Setting_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_Relayer_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_Relayer_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_Sequencer_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_Sequencer_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_RelayerFee_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_OriginTransfer_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_DestinationTransfer_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_OriginMessage_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_AggregateRoot_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_ConnectorMeta_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_RootCount_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_RootCount_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_RootMessageSent_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_RelayerFeesIncrease_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_SlippageUpdate_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryconsensystest__metaArgs = {
  block?: InputMaybe<consensystest_Block_height>;
};

export type consensystest_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['consensystest_Bytes']>;
};

export type consensystest_RelayerFee = {
  id: Scalars['ID'];
  transfer: consensystest_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['consensystest_Bytes'];
};

export type consensystest_RelayerFee_filter = {
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
  transfer_?: InputMaybe<consensystest_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['consensystest_Bytes']>;
  asset_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  asset_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  asset_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  asset_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  asset_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<consensystest_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<consensystest_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<consensystest_RelayerFee_filter>>>;
};

export type consensystest_RelayerFee_orderBy =
  | 'id'
  | 'transfer'
  | 'fee'
  | 'asset';

export type consensystest_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: consensystest_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['consensystest_Bytes']>;
  caller: Scalars['consensystest_Bytes'];
  transactionHash: Scalars['consensystest_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type consensystest_RelayerFeesIncrease_filter = {
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
  transfer_?: InputMaybe<consensystest_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['consensystest_Bytes']>;
  asset_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  asset_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  asset_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  asset_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  asset_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
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
  _change_block?: InputMaybe<consensystest_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<consensystest_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<consensystest_RelayerFeesIncrease_filter>>>;
};

export type consensystest_RelayerFeesIncrease_orderBy =
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

export type consensystest_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['consensystest_Bytes']>;
  relayer_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<consensystest_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<consensystest_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<consensystest_Relayer_filter>>>;
};

export type consensystest_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type consensystest_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type consensystest_RootCount_filter = {
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
  _change_block?: InputMaybe<consensystest_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<consensystest_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<consensystest_RootCount_filter>>>;
};

export type consensystest_RootCount_orderBy =
  | 'id'
  | 'count';

export type consensystest_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['consensystest_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['consensystest_Bytes']>;
  transactionHash?: Maybe<Scalars['consensystest_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type consensystest_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['consensystest_Bytes']>;
  root_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  root_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  root_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  root_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  root_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  root_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
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
  _change_block?: InputMaybe<consensystest_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<consensystest_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<consensystest_RootMessageSent_filter>>>;
};

export type consensystest_RootMessageSent_orderBy =
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

export type consensystest_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['consensystest_Bytes']>;
  recipient?: Maybe<Scalars['consensystest_Bytes']>;
  proposedOwner?: Maybe<Scalars['consensystest_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<consensystest_AssetBalance>;
};


export type consensystest_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_AssetBalance_filter>;
};

export type consensystest_RouterDailyTVL = {
  id: Scalars['ID'];
  router: consensystest_Router;
  asset: consensystest_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type consensystest_RouterDailyTVL_filter = {
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
  router_?: InputMaybe<consensystest_Router_filter>;
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
  asset_?: InputMaybe<consensystest_Asset_filter>;
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
  _change_block?: InputMaybe<consensystest_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<consensystest_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<consensystest_RouterDailyTVL_filter>>>;
};

export type consensystest_RouterDailyTVL_orderBy =
  | 'id'
  | 'router'
  | 'asset'
  | 'timestamp'
  | 'balance';

export type consensystest_Router_filter = {
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
  owner?: InputMaybe<Scalars['consensystest_Bytes']>;
  owner_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  owner_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  owner_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  owner_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  owner_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  recipient?: InputMaybe<Scalars['consensystest_Bytes']>;
  recipient_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['consensystest_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<consensystest_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<consensystest_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<consensystest_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<consensystest_Router_filter>>>;
};

export type consensystest_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type consensystest_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['consensystest_Bytes']>;
};

export type consensystest_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['consensystest_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<consensystest_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<consensystest_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<consensystest_Sequencer_filter>>>;
};

export type consensystest_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type consensystest_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['consensystest_Bytes'];
};

export type consensystest_Setting_filter = {
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
  caller?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<consensystest_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<consensystest_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<consensystest_Setting_filter>>>;
};

export type consensystest_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type consensystest_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: consensystest_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['consensystest_Bytes'];
  transactionHash: Scalars['consensystest_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type consensystest_SlippageUpdate_filter = {
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
  transfer_?: InputMaybe<consensystest_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['consensystest_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['consensystest_Bytes']>;
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
  _change_block?: InputMaybe<consensystest_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<consensystest_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<consensystest_SlippageUpdate_filter>>>;
};

export type consensystest_SlippageUpdate_orderBy =
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
  consensystest_asset?: Maybe<consensystest_Asset>;
  consensystest_assets: Array<consensystest_Asset>;
  consensystest_assetStatus?: Maybe<consensystest_AssetStatus>;
  consensystest_assetStatuses: Array<consensystest_AssetStatus>;
  consensystest_assetBalance?: Maybe<consensystest_AssetBalance>;
  consensystest_assetBalances: Array<consensystest_AssetBalance>;
  consensystest_router?: Maybe<consensystest_Router>;
  consensystest_routers: Array<consensystest_Router>;
  consensystest_routerDailyTVL?: Maybe<consensystest_RouterDailyTVL>;
  consensystest_routerDailyTVLs: Array<consensystest_RouterDailyTVL>;
  consensystest_setting?: Maybe<consensystest_Setting>;
  consensystest_settings: Array<consensystest_Setting>;
  consensystest_relayer?: Maybe<consensystest_Relayer>;
  consensystest_relayers: Array<consensystest_Relayer>;
  consensystest_sequencer?: Maybe<consensystest_Sequencer>;
  consensystest_sequencers: Array<consensystest_Sequencer>;
  consensystest_relayerFee?: Maybe<consensystest_RelayerFee>;
  consensystest_relayerFees: Array<consensystest_RelayerFee>;
  consensystest_originTransfer?: Maybe<consensystest_OriginTransfer>;
  consensystest_originTransfers: Array<consensystest_OriginTransfer>;
  consensystest_destinationTransfer?: Maybe<consensystest_DestinationTransfer>;
  consensystest_destinationTransfers: Array<consensystest_DestinationTransfer>;
  consensystest_originMessage?: Maybe<consensystest_OriginMessage>;
  consensystest_originMessages: Array<consensystest_OriginMessage>;
  consensystest_aggregateRoot?: Maybe<consensystest_AggregateRoot>;
  consensystest_aggregateRoots: Array<consensystest_AggregateRoot>;
  consensystest_connectorMeta?: Maybe<consensystest_ConnectorMeta>;
  consensystest_connectorMetas: Array<consensystest_ConnectorMeta>;
  consensystest_rootCount?: Maybe<consensystest_RootCount>;
  consensystest_rootCounts: Array<consensystest_RootCount>;
  consensystest_rootMessageSent?: Maybe<consensystest_RootMessageSent>;
  consensystest_rootMessageSents: Array<consensystest_RootMessageSent>;
  consensystest_relayerFeesIncrease?: Maybe<consensystest_RelayerFeesIncrease>;
  consensystest_relayerFeesIncreases: Array<consensystest_RelayerFeesIncrease>;
  consensystest_slippageUpdate?: Maybe<consensystest_SlippageUpdate>;
  consensystest_slippageUpdates: Array<consensystest_SlippageUpdate>;
  /** Access to subgraph metadata */
  consensystest__meta?: Maybe<consensystest__Meta_>;
};


export type Subscriptionconsensystest_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_Asset_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_Asset_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_AssetStatus_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_AssetBalance_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_Router_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_Router_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_RouterDailyTVL_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_Setting_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_Setting_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_Relayer_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_Relayer_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_Sequencer_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_Sequencer_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_RelayerFee_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_OriginTransfer_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_DestinationTransfer_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_OriginMessage_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_AggregateRoot_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_ConnectorMeta_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_RootCount_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_RootCount_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_RootMessageSent_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_RelayerFeesIncrease_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<consensystest_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<consensystest_OrderDirection>;
  where?: InputMaybe<consensystest_SlippageUpdate_filter>;
  block?: InputMaybe<consensystest_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionconsensystest__metaArgs = {
  block?: InputMaybe<consensystest_Block_height>;
};

export type consensystest_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type consensystest__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['consensystest_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type consensystest__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: consensystest__Block_;
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
  consensystest_asset: InContextSdkMethod<Query['consensystest_asset'], Queryconsensystest_assetArgs, MeshContext>,
  /** null **/
  consensystest_assets: InContextSdkMethod<Query['consensystest_assets'], Queryconsensystest_assetsArgs, MeshContext>,
  /** null **/
  consensystest_assetStatus: InContextSdkMethod<Query['consensystest_assetStatus'], Queryconsensystest_assetStatusArgs, MeshContext>,
  /** null **/
  consensystest_assetStatuses: InContextSdkMethod<Query['consensystest_assetStatuses'], Queryconsensystest_assetStatusesArgs, MeshContext>,
  /** null **/
  consensystest_assetBalance: InContextSdkMethod<Query['consensystest_assetBalance'], Queryconsensystest_assetBalanceArgs, MeshContext>,
  /** null **/
  consensystest_assetBalances: InContextSdkMethod<Query['consensystest_assetBalances'], Queryconsensystest_assetBalancesArgs, MeshContext>,
  /** null **/
  consensystest_router: InContextSdkMethod<Query['consensystest_router'], Queryconsensystest_routerArgs, MeshContext>,
  /** null **/
  consensystest_routers: InContextSdkMethod<Query['consensystest_routers'], Queryconsensystest_routersArgs, MeshContext>,
  /** null **/
  consensystest_routerDailyTVL: InContextSdkMethod<Query['consensystest_routerDailyTVL'], Queryconsensystest_routerDailyTVLArgs, MeshContext>,
  /** null **/
  consensystest_routerDailyTVLs: InContextSdkMethod<Query['consensystest_routerDailyTVLs'], Queryconsensystest_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  consensystest_setting: InContextSdkMethod<Query['consensystest_setting'], Queryconsensystest_settingArgs, MeshContext>,
  /** null **/
  consensystest_settings: InContextSdkMethod<Query['consensystest_settings'], Queryconsensystest_settingsArgs, MeshContext>,
  /** null **/
  consensystest_relayer: InContextSdkMethod<Query['consensystest_relayer'], Queryconsensystest_relayerArgs, MeshContext>,
  /** null **/
  consensystest_relayers: InContextSdkMethod<Query['consensystest_relayers'], Queryconsensystest_relayersArgs, MeshContext>,
  /** null **/
  consensystest_sequencer: InContextSdkMethod<Query['consensystest_sequencer'], Queryconsensystest_sequencerArgs, MeshContext>,
  /** null **/
  consensystest_sequencers: InContextSdkMethod<Query['consensystest_sequencers'], Queryconsensystest_sequencersArgs, MeshContext>,
  /** null **/
  consensystest_relayerFee: InContextSdkMethod<Query['consensystest_relayerFee'], Queryconsensystest_relayerFeeArgs, MeshContext>,
  /** null **/
  consensystest_relayerFees: InContextSdkMethod<Query['consensystest_relayerFees'], Queryconsensystest_relayerFeesArgs, MeshContext>,
  /** null **/
  consensystest_originTransfer: InContextSdkMethod<Query['consensystest_originTransfer'], Queryconsensystest_originTransferArgs, MeshContext>,
  /** null **/
  consensystest_originTransfers: InContextSdkMethod<Query['consensystest_originTransfers'], Queryconsensystest_originTransfersArgs, MeshContext>,
  /** null **/
  consensystest_destinationTransfer: InContextSdkMethod<Query['consensystest_destinationTransfer'], Queryconsensystest_destinationTransferArgs, MeshContext>,
  /** null **/
  consensystest_destinationTransfers: InContextSdkMethod<Query['consensystest_destinationTransfers'], Queryconsensystest_destinationTransfersArgs, MeshContext>,
  /** null **/
  consensystest_originMessage: InContextSdkMethod<Query['consensystest_originMessage'], Queryconsensystest_originMessageArgs, MeshContext>,
  /** null **/
  consensystest_originMessages: InContextSdkMethod<Query['consensystest_originMessages'], Queryconsensystest_originMessagesArgs, MeshContext>,
  /** null **/
  consensystest_aggregateRoot: InContextSdkMethod<Query['consensystest_aggregateRoot'], Queryconsensystest_aggregateRootArgs, MeshContext>,
  /** null **/
  consensystest_aggregateRoots: InContextSdkMethod<Query['consensystest_aggregateRoots'], Queryconsensystest_aggregateRootsArgs, MeshContext>,
  /** null **/
  consensystest_connectorMeta: InContextSdkMethod<Query['consensystest_connectorMeta'], Queryconsensystest_connectorMetaArgs, MeshContext>,
  /** null **/
  consensystest_connectorMetas: InContextSdkMethod<Query['consensystest_connectorMetas'], Queryconsensystest_connectorMetasArgs, MeshContext>,
  /** null **/
  consensystest_rootCount: InContextSdkMethod<Query['consensystest_rootCount'], Queryconsensystest_rootCountArgs, MeshContext>,
  /** null **/
  consensystest_rootCounts: InContextSdkMethod<Query['consensystest_rootCounts'], Queryconsensystest_rootCountsArgs, MeshContext>,
  /** null **/
  consensystest_rootMessageSent: InContextSdkMethod<Query['consensystest_rootMessageSent'], Queryconsensystest_rootMessageSentArgs, MeshContext>,
  /** null **/
  consensystest_rootMessageSents: InContextSdkMethod<Query['consensystest_rootMessageSents'], Queryconsensystest_rootMessageSentsArgs, MeshContext>,
  /** null **/
  consensystest_relayerFeesIncrease: InContextSdkMethod<Query['consensystest_relayerFeesIncrease'], Queryconsensystest_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  consensystest_relayerFeesIncreases: InContextSdkMethod<Query['consensystest_relayerFeesIncreases'], Queryconsensystest_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  consensystest_slippageUpdate: InContextSdkMethod<Query['consensystest_slippageUpdate'], Queryconsensystest_slippageUpdateArgs, MeshContext>,
  /** null **/
  consensystest_slippageUpdates: InContextSdkMethod<Query['consensystest_slippageUpdates'], Queryconsensystest_slippageUpdatesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  consensystest__meta: InContextSdkMethod<Query['consensystest__meta'], Queryconsensystest__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  consensystest_asset: InContextSdkMethod<Subscription['consensystest_asset'], Subscriptionconsensystest_assetArgs, MeshContext>,
  /** null **/
  consensystest_assets: InContextSdkMethod<Subscription['consensystest_assets'], Subscriptionconsensystest_assetsArgs, MeshContext>,
  /** null **/
  consensystest_assetStatus: InContextSdkMethod<Subscription['consensystest_assetStatus'], Subscriptionconsensystest_assetStatusArgs, MeshContext>,
  /** null **/
  consensystest_assetStatuses: InContextSdkMethod<Subscription['consensystest_assetStatuses'], Subscriptionconsensystest_assetStatusesArgs, MeshContext>,
  /** null **/
  consensystest_assetBalance: InContextSdkMethod<Subscription['consensystest_assetBalance'], Subscriptionconsensystest_assetBalanceArgs, MeshContext>,
  /** null **/
  consensystest_assetBalances: InContextSdkMethod<Subscription['consensystest_assetBalances'], Subscriptionconsensystest_assetBalancesArgs, MeshContext>,
  /** null **/
  consensystest_router: InContextSdkMethod<Subscription['consensystest_router'], Subscriptionconsensystest_routerArgs, MeshContext>,
  /** null **/
  consensystest_routers: InContextSdkMethod<Subscription['consensystest_routers'], Subscriptionconsensystest_routersArgs, MeshContext>,
  /** null **/
  consensystest_routerDailyTVL: InContextSdkMethod<Subscription['consensystest_routerDailyTVL'], Subscriptionconsensystest_routerDailyTVLArgs, MeshContext>,
  /** null **/
  consensystest_routerDailyTVLs: InContextSdkMethod<Subscription['consensystest_routerDailyTVLs'], Subscriptionconsensystest_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  consensystest_setting: InContextSdkMethod<Subscription['consensystest_setting'], Subscriptionconsensystest_settingArgs, MeshContext>,
  /** null **/
  consensystest_settings: InContextSdkMethod<Subscription['consensystest_settings'], Subscriptionconsensystest_settingsArgs, MeshContext>,
  /** null **/
  consensystest_relayer: InContextSdkMethod<Subscription['consensystest_relayer'], Subscriptionconsensystest_relayerArgs, MeshContext>,
  /** null **/
  consensystest_relayers: InContextSdkMethod<Subscription['consensystest_relayers'], Subscriptionconsensystest_relayersArgs, MeshContext>,
  /** null **/
  consensystest_sequencer: InContextSdkMethod<Subscription['consensystest_sequencer'], Subscriptionconsensystest_sequencerArgs, MeshContext>,
  /** null **/
  consensystest_sequencers: InContextSdkMethod<Subscription['consensystest_sequencers'], Subscriptionconsensystest_sequencersArgs, MeshContext>,
  /** null **/
  consensystest_relayerFee: InContextSdkMethod<Subscription['consensystest_relayerFee'], Subscriptionconsensystest_relayerFeeArgs, MeshContext>,
  /** null **/
  consensystest_relayerFees: InContextSdkMethod<Subscription['consensystest_relayerFees'], Subscriptionconsensystest_relayerFeesArgs, MeshContext>,
  /** null **/
  consensystest_originTransfer: InContextSdkMethod<Subscription['consensystest_originTransfer'], Subscriptionconsensystest_originTransferArgs, MeshContext>,
  /** null **/
  consensystest_originTransfers: InContextSdkMethod<Subscription['consensystest_originTransfers'], Subscriptionconsensystest_originTransfersArgs, MeshContext>,
  /** null **/
  consensystest_destinationTransfer: InContextSdkMethod<Subscription['consensystest_destinationTransfer'], Subscriptionconsensystest_destinationTransferArgs, MeshContext>,
  /** null **/
  consensystest_destinationTransfers: InContextSdkMethod<Subscription['consensystest_destinationTransfers'], Subscriptionconsensystest_destinationTransfersArgs, MeshContext>,
  /** null **/
  consensystest_originMessage: InContextSdkMethod<Subscription['consensystest_originMessage'], Subscriptionconsensystest_originMessageArgs, MeshContext>,
  /** null **/
  consensystest_originMessages: InContextSdkMethod<Subscription['consensystest_originMessages'], Subscriptionconsensystest_originMessagesArgs, MeshContext>,
  /** null **/
  consensystest_aggregateRoot: InContextSdkMethod<Subscription['consensystest_aggregateRoot'], Subscriptionconsensystest_aggregateRootArgs, MeshContext>,
  /** null **/
  consensystest_aggregateRoots: InContextSdkMethod<Subscription['consensystest_aggregateRoots'], Subscriptionconsensystest_aggregateRootsArgs, MeshContext>,
  /** null **/
  consensystest_connectorMeta: InContextSdkMethod<Subscription['consensystest_connectorMeta'], Subscriptionconsensystest_connectorMetaArgs, MeshContext>,
  /** null **/
  consensystest_connectorMetas: InContextSdkMethod<Subscription['consensystest_connectorMetas'], Subscriptionconsensystest_connectorMetasArgs, MeshContext>,
  /** null **/
  consensystest_rootCount: InContextSdkMethod<Subscription['consensystest_rootCount'], Subscriptionconsensystest_rootCountArgs, MeshContext>,
  /** null **/
  consensystest_rootCounts: InContextSdkMethod<Subscription['consensystest_rootCounts'], Subscriptionconsensystest_rootCountsArgs, MeshContext>,
  /** null **/
  consensystest_rootMessageSent: InContextSdkMethod<Subscription['consensystest_rootMessageSent'], Subscriptionconsensystest_rootMessageSentArgs, MeshContext>,
  /** null **/
  consensystest_rootMessageSents: InContextSdkMethod<Subscription['consensystest_rootMessageSents'], Subscriptionconsensystest_rootMessageSentsArgs, MeshContext>,
  /** null **/
  consensystest_relayerFeesIncrease: InContextSdkMethod<Subscription['consensystest_relayerFeesIncrease'], Subscriptionconsensystest_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  consensystest_relayerFeesIncreases: InContextSdkMethod<Subscription['consensystest_relayerFeesIncreases'], Subscriptionconsensystest_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  consensystest_slippageUpdate: InContextSdkMethod<Subscription['consensystest_slippageUpdate'], Subscriptionconsensystest_slippageUpdateArgs, MeshContext>,
  /** null **/
  consensystest_slippageUpdates: InContextSdkMethod<Subscription['consensystest_slippageUpdates'], Subscriptionconsensystest_slippageUpdatesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  consensystest__meta: InContextSdkMethod<Subscription['consensystest__meta'], Subscriptionconsensystest__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_ConsensysTest"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
