// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextStagingArbitrumGoerliTypes {
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
  stagingarbitrumgoerli_BigDecimal: any;
  BigInt: any;
  stagingarbitrumgoerli_Bytes: any;
};

export type stagingarbitrumgoerli_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['stagingarbitrumgoerli_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type stagingarbitrumgoerli_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type stagingarbitrumgoerli_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  localAsset?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingarbitrumgoerli_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: stagingarbitrumgoerli_Router;
  asset: stagingarbitrumgoerli_Asset;
  feesEarned: Scalars['BigInt'];
};

export type stagingarbitrumgoerli_AssetBalance_filter = {
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
  router_?: InputMaybe<stagingarbitrumgoerli_Router_filter>;
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
  asset_?: InputMaybe<stagingarbitrumgoerli_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset'
  | 'feesEarned';

export type stagingarbitrumgoerli_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  key_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  key_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  key_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  key_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  key_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  key_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  localAsset?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_Asset_orderBy =
  | 'id'
  | 'key'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber';

export type stagingarbitrumgoerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingarbitrumgoerli_Block_height = {
  hash?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type stagingarbitrumgoerli_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  rootManager?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  mirrorConnector?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
};

export type stagingarbitrumgoerli_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingarbitrumgoerli_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingarbitrumgoerli_TransferStatus>;
  routers?: Maybe<Array<stagingarbitrumgoerli_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  delegate?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  asset?: Maybe<stagingarbitrumgoerli_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledCaller?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
};


export type stagingarbitrumgoerli_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_Router_filter>;
};

export type stagingarbitrumgoerli_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingarbitrumgoerli_TransferStatus>;
  status_not?: InputMaybe<stagingarbitrumgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<stagingarbitrumgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingarbitrumgoerli_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<stagingarbitrumgoerli_Router_filter>;
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
  to?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
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
  asset_?: InputMaybe<stagingarbitrumgoerli_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
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
  executedTxOrigin?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledCaller?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
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
  reconciledTxOrigin?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_DestinationTransfer_orderBy =
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
export type stagingarbitrumgoerli_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingarbitrumgoerli_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  root?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<stagingarbitrumgoerli_RootCount>;
};

export type stagingarbitrumgoerli_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  leaf_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  message_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  message_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  message_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  message_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  message_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  message_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  root?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
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
  rootCount_?: InputMaybe<stagingarbitrumgoerli_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_OriginMessage_orderBy =
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

export type stagingarbitrumgoerli_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingarbitrumgoerli_TransferStatus>;
  messageHash?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  delegate?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  asset?: Maybe<stagingarbitrumgoerli_Asset>;
  transacting?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  message?: Maybe<stagingarbitrumgoerli_OriginMessage>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
};

export type stagingarbitrumgoerli_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<stagingarbitrumgoerli_TransferStatus>;
  status_not?: InputMaybe<stagingarbitrumgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<stagingarbitrumgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingarbitrumgoerli_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
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
  to?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  to_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  to_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  to_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  to_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  delegate?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  delegate_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  callData_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  callData_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  callData_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  callData_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
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
  asset_?: InputMaybe<stagingarbitrumgoerli_Asset_filter>;
  transacting?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transacting_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transacting_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transacting_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transacting_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transacting_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transacting_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transacting_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transacting_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transacting_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
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
  message_?: InputMaybe<stagingarbitrumgoerli_OriginMessage_filter>;
  relayerFee?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
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
  txOrigin?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_OriginTransfer_orderBy =
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
  | 'transacting'
  | 'message'
  | 'relayerFee'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber'
  | 'txOrigin';

export type stagingarbitrumgoerli_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['stagingarbitrumgoerli_Bytes'];
};

export type stagingarbitrumgoerli_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  stagingarbitrumgoerli_asset?: Maybe<stagingarbitrumgoerli_Asset>;
  stagingarbitrumgoerli_assets: Array<stagingarbitrumgoerli_Asset>;
  stagingarbitrumgoerli_assetBalance?: Maybe<stagingarbitrumgoerli_AssetBalance>;
  stagingarbitrumgoerli_assetBalances: Array<stagingarbitrumgoerli_AssetBalance>;
  stagingarbitrumgoerli_router?: Maybe<stagingarbitrumgoerli_Router>;
  stagingarbitrumgoerli_routers: Array<stagingarbitrumgoerli_Router>;
  stagingarbitrumgoerli_setting?: Maybe<stagingarbitrumgoerli_Setting>;
  stagingarbitrumgoerli_settings: Array<stagingarbitrumgoerli_Setting>;
  stagingarbitrumgoerli_relayer?: Maybe<stagingarbitrumgoerli_Relayer>;
  stagingarbitrumgoerli_relayers: Array<stagingarbitrumgoerli_Relayer>;
  stagingarbitrumgoerli_transferRelayerFee?: Maybe<stagingarbitrumgoerli_TransferRelayerFee>;
  stagingarbitrumgoerli_transferRelayerFees: Array<stagingarbitrumgoerli_TransferRelayerFee>;
  stagingarbitrumgoerli_sequencer?: Maybe<stagingarbitrumgoerli_Sequencer>;
  stagingarbitrumgoerli_sequencers: Array<stagingarbitrumgoerli_Sequencer>;
  stagingarbitrumgoerli_originTransfer?: Maybe<stagingarbitrumgoerli_OriginTransfer>;
  stagingarbitrumgoerli_originTransfers: Array<stagingarbitrumgoerli_OriginTransfer>;
  stagingarbitrumgoerli_destinationTransfer?: Maybe<stagingarbitrumgoerli_DestinationTransfer>;
  stagingarbitrumgoerli_destinationTransfers: Array<stagingarbitrumgoerli_DestinationTransfer>;
  stagingarbitrumgoerli_originMessage?: Maybe<stagingarbitrumgoerli_OriginMessage>;
  stagingarbitrumgoerli_originMessages: Array<stagingarbitrumgoerli_OriginMessage>;
  stagingarbitrumgoerli_aggregateRoot?: Maybe<stagingarbitrumgoerli_AggregateRoot>;
  stagingarbitrumgoerli_aggregateRoots: Array<stagingarbitrumgoerli_AggregateRoot>;
  stagingarbitrumgoerli_connectorMeta?: Maybe<stagingarbitrumgoerli_ConnectorMeta>;
  stagingarbitrumgoerli_connectorMetas: Array<stagingarbitrumgoerli_ConnectorMeta>;
  stagingarbitrumgoerli_rootCount?: Maybe<stagingarbitrumgoerli_RootCount>;
  stagingarbitrumgoerli_rootCounts: Array<stagingarbitrumgoerli_RootCount>;
  stagingarbitrumgoerli_rootMessageSent?: Maybe<stagingarbitrumgoerli_RootMessageSent>;
  stagingarbitrumgoerli_rootMessageSents: Array<stagingarbitrumgoerli_RootMessageSent>;
  stagingarbitrumgoerli_stableSwap?: Maybe<stagingarbitrumgoerli_StableSwap>;
  stagingarbitrumgoerli_stableSwaps: Array<stagingarbitrumgoerli_StableSwap>;
  stagingarbitrumgoerli_pooledToken?: Maybe<stagingarbitrumgoerli_PooledToken>;
  stagingarbitrumgoerli_pooledTokens: Array<stagingarbitrumgoerli_PooledToken>;
  stagingarbitrumgoerli_stableSwapAddLiquidityEvent?: Maybe<stagingarbitrumgoerli_StableSwapAddLiquidityEvent>;
  stagingarbitrumgoerli_stableSwapAddLiquidityEvents: Array<stagingarbitrumgoerli_StableSwapAddLiquidityEvent>;
  stagingarbitrumgoerli_stableSwapRemoveLiquidityEvent?: Maybe<stagingarbitrumgoerli_StableSwapRemoveLiquidityEvent>;
  stagingarbitrumgoerli_stableSwapRemoveLiquidityEvents: Array<stagingarbitrumgoerli_StableSwapRemoveLiquidityEvent>;
  stagingarbitrumgoerli_stableSwapExchange?: Maybe<stagingarbitrumgoerli_StableSwapExchange>;
  stagingarbitrumgoerli_stableSwapExchanges: Array<stagingarbitrumgoerli_StableSwapExchange>;
  stagingarbitrumgoerli_swapDailyVolume?: Maybe<stagingarbitrumgoerli_SwapDailyVolume>;
  stagingarbitrumgoerli_swapDailyVolumes: Array<stagingarbitrumgoerli_SwapDailyVolume>;
  stagingarbitrumgoerli_swapHourlyVolume?: Maybe<stagingarbitrumgoerli_SwapHourlyVolume>;
  stagingarbitrumgoerli_swapHourlyVolumes: Array<stagingarbitrumgoerli_SwapHourlyVolume>;
  stagingarbitrumgoerli_swapWeeklyVolume?: Maybe<stagingarbitrumgoerli_SwapWeeklyVolume>;
  stagingarbitrumgoerli_swapWeeklyVolumes: Array<stagingarbitrumgoerli_SwapWeeklyVolume>;
  stagingarbitrumgoerli_stableSwapEvent?: Maybe<stagingarbitrumgoerli_StableSwapEvent>;
  stagingarbitrumgoerli_stableSwapEvents: Array<stagingarbitrumgoerli_StableSwapEvent>;
  stagingarbitrumgoerli_swapTradeVolume?: Maybe<stagingarbitrumgoerli_SwapTradeVolume>;
  stagingarbitrumgoerli_swapTradeVolumes: Array<stagingarbitrumgoerli_SwapTradeVolume>;
  /** Access to subgraph metadata */
  stagingarbitrumgoerli__meta?: Maybe<stagingarbitrumgoerli__Meta_>;
};


export type Querystagingarbitrumgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_Asset_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_AssetBalance_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_Router_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_Setting_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_Relayer_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_transferRelayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_transferRelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_TransferRelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_TransferRelayerFee_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_Sequencer_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_OriginTransfer_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_OriginMessage_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_AggregateRoot_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_ConnectorMeta_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_RootCount_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_RootMessageSent_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_StableSwap_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_PooledToken_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_PooledToken_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_StableSwapExchange_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_SwapDailyVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_SwapHourlyVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_SwapWeeklyVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_StableSwapEvent_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_SwapTradeVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli__metaArgs = {
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
};

export type stagingarbitrumgoerli_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
};

export type stagingarbitrumgoerli_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  relayer_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type stagingarbitrumgoerli_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type stagingarbitrumgoerli_RootCount_filter = {
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
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_RootCount_orderBy =
  | 'id'
  | 'count';

export type stagingarbitrumgoerli_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingarbitrumgoerli_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
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
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_RootMessageSent_orderBy =
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

export type stagingarbitrumgoerli_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  recipient?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  proposedOwner?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<stagingarbitrumgoerli_AssetBalance>;
};


export type stagingarbitrumgoerli_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_AssetBalance_filter>;
};

export type stagingarbitrumgoerli_Router_filter = {
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
  owner?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  owner_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  owner_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  owner_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  owner_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  owner_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  recipient?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  recipient_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<stagingarbitrumgoerli_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type stagingarbitrumgoerli_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
};

export type stagingarbitrumgoerli_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type stagingarbitrumgoerli_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['stagingarbitrumgoerli_Bytes'];
};

export type stagingarbitrumgoerli_Setting_filter = {
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
  caller?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type stagingarbitrumgoerli_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  lpToken?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<stagingarbitrumgoerli_PooledToken>;
  tokenPrecisionMultipliers?: Maybe<Array<Scalars['BigInt']>>;
  balances: Array<Scalars['BigInt']>;
  adminFees?: Maybe<Array<Scalars['BigInt']>>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply?: Maybe<Scalars['BigInt']>;
};


export type stagingarbitrumgoerli_StableSwappooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_PooledToken_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_PooledToken_filter>;
};

export type stagingarbitrumgoerli_StableSwapAddLiquidityEvent = stagingarbitrumgoerli_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: stagingarbitrumgoerli_StableSwap;
  provider: Scalars['stagingarbitrumgoerli_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingarbitrumgoerli_Bytes'];
};

export type stagingarbitrumgoerli_StableSwapAddLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_StableSwap_filter>;
  provider?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
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
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_StableSwapAddLiquidityEvent_orderBy =
  | 'id'
  | 'stableSwap'
  | 'provider'
  | 'tokenAmounts'
  | 'fees'
  | 'invariant'
  | 'lpTokenSupply'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type stagingarbitrumgoerli_StableSwapEvent = {
  stableSwap: stagingarbitrumgoerli_StableSwap;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingarbitrumgoerli_Bytes'];
};

export type stagingarbitrumgoerli_StableSwapEvent_filter = {
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_StableSwap_filter>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_StableSwapEvent_orderBy =
  | 'stableSwap'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type stagingarbitrumgoerli_StableSwapExchange = {
  id: Scalars['ID'];
  stableSwap: stagingarbitrumgoerli_StableSwap;
  buyer: Scalars['stagingarbitrumgoerli_Bytes'];
  boughtId: Scalars['BigInt'];
  tokensBought: Scalars['BigInt'];
  soldId: Scalars['BigInt'];
  tokensSold: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingarbitrumgoerli_Bytes'];
};

export type stagingarbitrumgoerli_StableSwapExchange_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_StableSwap_filter>;
  buyer?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  buyer_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  buyer_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  buyer_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  buyer_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  buyer_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  boughtId?: InputMaybe<Scalars['BigInt']>;
  boughtId_not?: InputMaybe<Scalars['BigInt']>;
  boughtId_gt?: InputMaybe<Scalars['BigInt']>;
  boughtId_lt?: InputMaybe<Scalars['BigInt']>;
  boughtId_gte?: InputMaybe<Scalars['BigInt']>;
  boughtId_lte?: InputMaybe<Scalars['BigInt']>;
  boughtId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  boughtId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokensBought?: InputMaybe<Scalars['BigInt']>;
  tokensBought_not?: InputMaybe<Scalars['BigInt']>;
  tokensBought_gt?: InputMaybe<Scalars['BigInt']>;
  tokensBought_lt?: InputMaybe<Scalars['BigInt']>;
  tokensBought_gte?: InputMaybe<Scalars['BigInt']>;
  tokensBought_lte?: InputMaybe<Scalars['BigInt']>;
  tokensBought_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokensBought_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  soldId?: InputMaybe<Scalars['BigInt']>;
  soldId_not?: InputMaybe<Scalars['BigInt']>;
  soldId_gt?: InputMaybe<Scalars['BigInt']>;
  soldId_lt?: InputMaybe<Scalars['BigInt']>;
  soldId_gte?: InputMaybe<Scalars['BigInt']>;
  soldId_lte?: InputMaybe<Scalars['BigInt']>;
  soldId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  soldId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokensSold?: InputMaybe<Scalars['BigInt']>;
  tokensSold_not?: InputMaybe<Scalars['BigInt']>;
  tokensSold_gt?: InputMaybe<Scalars['BigInt']>;
  tokensSold_lt?: InputMaybe<Scalars['BigInt']>;
  tokensSold_gte?: InputMaybe<Scalars['BigInt']>;
  tokensSold_lte?: InputMaybe<Scalars['BigInt']>;
  tokensSold_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokensSold_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_StableSwapExchange_orderBy =
  | 'id'
  | 'stableSwap'
  | 'buyer'
  | 'boughtId'
  | 'tokensBought'
  | 'soldId'
  | 'tokensSold'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type stagingarbitrumgoerli_StableSwapRemoveLiquidityEvent = stagingarbitrumgoerli_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: stagingarbitrumgoerli_StableSwap;
  provider: Scalars['stagingarbitrumgoerli_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees?: Maybe<Array<Scalars['BigInt']>>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingarbitrumgoerli_Bytes'];
};

export type stagingarbitrumgoerli_StableSwapRemoveLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_StableSwap_filter>;
  provider?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
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
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_StableSwapRemoveLiquidityEvent_orderBy =
  | 'id'
  | 'stableSwap'
  | 'provider'
  | 'tokenAmounts'
  | 'fees'
  | 'invariant'
  | 'lpTokenSupply'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type stagingarbitrumgoerli_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  key_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  key_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  key_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  key_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  key_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  key_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  swapPool_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  swapPool_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  swapPool_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  swapPool_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  lpToken?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  lpToken_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  lpToken_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  lpToken_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  lpToken_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
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
  pooledTokens_?: InputMaybe<stagingarbitrumgoerli_PooledToken_filter>;
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
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_StableSwap_orderBy =
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
  | 'adminFees'
  | 'invariant'
  | 'lpTokenSupply';

export type Subscription = {
  stagingarbitrumgoerli_asset?: Maybe<stagingarbitrumgoerli_Asset>;
  stagingarbitrumgoerli_assets: Array<stagingarbitrumgoerli_Asset>;
  stagingarbitrumgoerli_assetBalance?: Maybe<stagingarbitrumgoerli_AssetBalance>;
  stagingarbitrumgoerli_assetBalances: Array<stagingarbitrumgoerli_AssetBalance>;
  stagingarbitrumgoerli_router?: Maybe<stagingarbitrumgoerli_Router>;
  stagingarbitrumgoerli_routers: Array<stagingarbitrumgoerli_Router>;
  stagingarbitrumgoerli_setting?: Maybe<stagingarbitrumgoerli_Setting>;
  stagingarbitrumgoerli_settings: Array<stagingarbitrumgoerli_Setting>;
  stagingarbitrumgoerli_relayer?: Maybe<stagingarbitrumgoerli_Relayer>;
  stagingarbitrumgoerli_relayers: Array<stagingarbitrumgoerli_Relayer>;
  stagingarbitrumgoerli_transferRelayerFee?: Maybe<stagingarbitrumgoerli_TransferRelayerFee>;
  stagingarbitrumgoerli_transferRelayerFees: Array<stagingarbitrumgoerli_TransferRelayerFee>;
  stagingarbitrumgoerli_sequencer?: Maybe<stagingarbitrumgoerli_Sequencer>;
  stagingarbitrumgoerli_sequencers: Array<stagingarbitrumgoerli_Sequencer>;
  stagingarbitrumgoerli_originTransfer?: Maybe<stagingarbitrumgoerli_OriginTransfer>;
  stagingarbitrumgoerli_originTransfers: Array<stagingarbitrumgoerli_OriginTransfer>;
  stagingarbitrumgoerli_destinationTransfer?: Maybe<stagingarbitrumgoerli_DestinationTransfer>;
  stagingarbitrumgoerli_destinationTransfers: Array<stagingarbitrumgoerli_DestinationTransfer>;
  stagingarbitrumgoerli_originMessage?: Maybe<stagingarbitrumgoerli_OriginMessage>;
  stagingarbitrumgoerli_originMessages: Array<stagingarbitrumgoerli_OriginMessage>;
  stagingarbitrumgoerli_aggregateRoot?: Maybe<stagingarbitrumgoerli_AggregateRoot>;
  stagingarbitrumgoerli_aggregateRoots: Array<stagingarbitrumgoerli_AggregateRoot>;
  stagingarbitrumgoerli_connectorMeta?: Maybe<stagingarbitrumgoerli_ConnectorMeta>;
  stagingarbitrumgoerli_connectorMetas: Array<stagingarbitrumgoerli_ConnectorMeta>;
  stagingarbitrumgoerli_rootCount?: Maybe<stagingarbitrumgoerli_RootCount>;
  stagingarbitrumgoerli_rootCounts: Array<stagingarbitrumgoerli_RootCount>;
  stagingarbitrumgoerli_rootMessageSent?: Maybe<stagingarbitrumgoerli_RootMessageSent>;
  stagingarbitrumgoerli_rootMessageSents: Array<stagingarbitrumgoerli_RootMessageSent>;
  stagingarbitrumgoerli_stableSwap?: Maybe<stagingarbitrumgoerli_StableSwap>;
  stagingarbitrumgoerli_stableSwaps: Array<stagingarbitrumgoerli_StableSwap>;
  stagingarbitrumgoerli_pooledToken?: Maybe<stagingarbitrumgoerli_PooledToken>;
  stagingarbitrumgoerli_pooledTokens: Array<stagingarbitrumgoerli_PooledToken>;
  stagingarbitrumgoerli_stableSwapAddLiquidityEvent?: Maybe<stagingarbitrumgoerli_StableSwapAddLiquidityEvent>;
  stagingarbitrumgoerli_stableSwapAddLiquidityEvents: Array<stagingarbitrumgoerli_StableSwapAddLiquidityEvent>;
  stagingarbitrumgoerli_stableSwapRemoveLiquidityEvent?: Maybe<stagingarbitrumgoerli_StableSwapRemoveLiquidityEvent>;
  stagingarbitrumgoerli_stableSwapRemoveLiquidityEvents: Array<stagingarbitrumgoerli_StableSwapRemoveLiquidityEvent>;
  stagingarbitrumgoerli_stableSwapExchange?: Maybe<stagingarbitrumgoerli_StableSwapExchange>;
  stagingarbitrumgoerli_stableSwapExchanges: Array<stagingarbitrumgoerli_StableSwapExchange>;
  stagingarbitrumgoerli_swapDailyVolume?: Maybe<stagingarbitrumgoerli_SwapDailyVolume>;
  stagingarbitrumgoerli_swapDailyVolumes: Array<stagingarbitrumgoerli_SwapDailyVolume>;
  stagingarbitrumgoerli_swapHourlyVolume?: Maybe<stagingarbitrumgoerli_SwapHourlyVolume>;
  stagingarbitrumgoerli_swapHourlyVolumes: Array<stagingarbitrumgoerli_SwapHourlyVolume>;
  stagingarbitrumgoerli_swapWeeklyVolume?: Maybe<stagingarbitrumgoerli_SwapWeeklyVolume>;
  stagingarbitrumgoerli_swapWeeklyVolumes: Array<stagingarbitrumgoerli_SwapWeeklyVolume>;
  stagingarbitrumgoerli_stableSwapEvent?: Maybe<stagingarbitrumgoerli_StableSwapEvent>;
  stagingarbitrumgoerli_stableSwapEvents: Array<stagingarbitrumgoerli_StableSwapEvent>;
  stagingarbitrumgoerli_swapTradeVolume?: Maybe<stagingarbitrumgoerli_SwapTradeVolume>;
  stagingarbitrumgoerli_swapTradeVolumes: Array<stagingarbitrumgoerli_SwapTradeVolume>;
  /** Access to subgraph metadata */
  stagingarbitrumgoerli__meta?: Maybe<stagingarbitrumgoerli__Meta_>;
};


export type Subscriptionstagingarbitrumgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_Asset_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_AssetBalance_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_Router_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_Setting_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_Relayer_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_transferRelayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_transferRelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_TransferRelayerFee_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_TransferRelayerFee_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_Sequencer_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_Sequencer_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_OriginTransfer_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_OriginMessage_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_AggregateRoot_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_ConnectorMeta_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_RootCount_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_RootCount_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_RootMessageSent_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_StableSwap_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_PooledToken_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_PooledToken_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_StableSwapExchange_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_SwapDailyVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_SwapHourlyVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_SwapWeeklyVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_StableSwapEvent_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_SwapTradeVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli__metaArgs = {
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
};

export type stagingarbitrumgoerli_SwapDailyVolume = stagingarbitrumgoerli_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: stagingarbitrumgoerli_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingarbitrumgoerli_BigDecimal'];
};

export type stagingarbitrumgoerli_SwapDailyVolume_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_SwapDailyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type stagingarbitrumgoerli_SwapHourlyVolume = stagingarbitrumgoerli_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: stagingarbitrumgoerli_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingarbitrumgoerli_BigDecimal'];
};

export type stagingarbitrumgoerli_SwapHourlyVolume_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_SwapHourlyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type stagingarbitrumgoerli_SwapTradeVolume = {
  stableSwap: stagingarbitrumgoerli_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingarbitrumgoerli_BigDecimal'];
};

export type stagingarbitrumgoerli_SwapTradeVolume_filter = {
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_SwapTradeVolume_orderBy =
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type stagingarbitrumgoerli_SwapWeeklyVolume = stagingarbitrumgoerli_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: stagingarbitrumgoerli_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingarbitrumgoerli_BigDecimal'];
};

export type stagingarbitrumgoerli_SwapWeeklyVolume_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_SwapWeeklyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type stagingarbitrumgoerli_TransferRelayerFee = {
  id: Scalars['ID'];
  transferId: Scalars['stagingarbitrumgoerli_Bytes'];
  fee?: Maybe<Scalars['BigInt']>;
};

export type stagingarbitrumgoerli_TransferRelayerFee_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_TransferRelayerFee_orderBy =
  | 'id'
  | 'transferId'
  | 'fee';

export type stagingarbitrumgoerli_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type stagingarbitrumgoerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type stagingarbitrumgoerli__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingarbitrumgoerli__Block_;
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
  stagingarbitrumgoerli_asset: InContextSdkMethod<Query['stagingarbitrumgoerli_asset'], Querystagingarbitrumgoerli_assetArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_assets: InContextSdkMethod<Query['stagingarbitrumgoerli_assets'], Querystagingarbitrumgoerli_assetsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_assetBalance: InContextSdkMethod<Query['stagingarbitrumgoerli_assetBalance'], Querystagingarbitrumgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_assetBalances: InContextSdkMethod<Query['stagingarbitrumgoerli_assetBalances'], Querystagingarbitrumgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_router: InContextSdkMethod<Query['stagingarbitrumgoerli_router'], Querystagingarbitrumgoerli_routerArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_routers: InContextSdkMethod<Query['stagingarbitrumgoerli_routers'], Querystagingarbitrumgoerli_routersArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_setting: InContextSdkMethod<Query['stagingarbitrumgoerli_setting'], Querystagingarbitrumgoerli_settingArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_settings: InContextSdkMethod<Query['stagingarbitrumgoerli_settings'], Querystagingarbitrumgoerli_settingsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_relayer: InContextSdkMethod<Query['stagingarbitrumgoerli_relayer'], Querystagingarbitrumgoerli_relayerArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_relayers: InContextSdkMethod<Query['stagingarbitrumgoerli_relayers'], Querystagingarbitrumgoerli_relayersArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_transferRelayerFee: InContextSdkMethod<Query['stagingarbitrumgoerli_transferRelayerFee'], Querystagingarbitrumgoerli_transferRelayerFeeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_transferRelayerFees: InContextSdkMethod<Query['stagingarbitrumgoerli_transferRelayerFees'], Querystagingarbitrumgoerli_transferRelayerFeesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_sequencer: InContextSdkMethod<Query['stagingarbitrumgoerli_sequencer'], Querystagingarbitrumgoerli_sequencerArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_sequencers: InContextSdkMethod<Query['stagingarbitrumgoerli_sequencers'], Querystagingarbitrumgoerli_sequencersArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_originTransfer: InContextSdkMethod<Query['stagingarbitrumgoerli_originTransfer'], Querystagingarbitrumgoerli_originTransferArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_originTransfers: InContextSdkMethod<Query['stagingarbitrumgoerli_originTransfers'], Querystagingarbitrumgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_destinationTransfer: InContextSdkMethod<Query['stagingarbitrumgoerli_destinationTransfer'], Querystagingarbitrumgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_destinationTransfers: InContextSdkMethod<Query['stagingarbitrumgoerli_destinationTransfers'], Querystagingarbitrumgoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_originMessage: InContextSdkMethod<Query['stagingarbitrumgoerli_originMessage'], Querystagingarbitrumgoerli_originMessageArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_originMessages: InContextSdkMethod<Query['stagingarbitrumgoerli_originMessages'], Querystagingarbitrumgoerli_originMessagesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_aggregateRoot: InContextSdkMethod<Query['stagingarbitrumgoerli_aggregateRoot'], Querystagingarbitrumgoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_aggregateRoots: InContextSdkMethod<Query['stagingarbitrumgoerli_aggregateRoots'], Querystagingarbitrumgoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_connectorMeta: InContextSdkMethod<Query['stagingarbitrumgoerli_connectorMeta'], Querystagingarbitrumgoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_connectorMetas: InContextSdkMethod<Query['stagingarbitrumgoerli_connectorMetas'], Querystagingarbitrumgoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_rootCount: InContextSdkMethod<Query['stagingarbitrumgoerli_rootCount'], Querystagingarbitrumgoerli_rootCountArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_rootCounts: InContextSdkMethod<Query['stagingarbitrumgoerli_rootCounts'], Querystagingarbitrumgoerli_rootCountsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_rootMessageSent: InContextSdkMethod<Query['stagingarbitrumgoerli_rootMessageSent'], Querystagingarbitrumgoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_rootMessageSents: InContextSdkMethod<Query['stagingarbitrumgoerli_rootMessageSents'], Querystagingarbitrumgoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwap: InContextSdkMethod<Query['stagingarbitrumgoerli_stableSwap'], Querystagingarbitrumgoerli_stableSwapArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwaps: InContextSdkMethod<Query['stagingarbitrumgoerli_stableSwaps'], Querystagingarbitrumgoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_pooledToken: InContextSdkMethod<Query['stagingarbitrumgoerli_pooledToken'], Querystagingarbitrumgoerli_pooledTokenArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_pooledTokens: InContextSdkMethod<Query['stagingarbitrumgoerli_pooledTokens'], Querystagingarbitrumgoerli_pooledTokensArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapAddLiquidityEvent: InContextSdkMethod<Query['stagingarbitrumgoerli_stableSwapAddLiquidityEvent'], Querystagingarbitrumgoerli_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapAddLiquidityEvents: InContextSdkMethod<Query['stagingarbitrumgoerli_stableSwapAddLiquidityEvents'], Querystagingarbitrumgoerli_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Query['stagingarbitrumgoerli_stableSwapRemoveLiquidityEvent'], Querystagingarbitrumgoerli_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Query['stagingarbitrumgoerli_stableSwapRemoveLiquidityEvents'], Querystagingarbitrumgoerli_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapExchange: InContextSdkMethod<Query['stagingarbitrumgoerli_stableSwapExchange'], Querystagingarbitrumgoerli_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapExchanges: InContextSdkMethod<Query['stagingarbitrumgoerli_stableSwapExchanges'], Querystagingarbitrumgoerli_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapDailyVolume: InContextSdkMethod<Query['stagingarbitrumgoerli_swapDailyVolume'], Querystagingarbitrumgoerli_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapDailyVolumes: InContextSdkMethod<Query['stagingarbitrumgoerli_swapDailyVolumes'], Querystagingarbitrumgoerli_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapHourlyVolume: InContextSdkMethod<Query['stagingarbitrumgoerli_swapHourlyVolume'], Querystagingarbitrumgoerli_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapHourlyVolumes: InContextSdkMethod<Query['stagingarbitrumgoerli_swapHourlyVolumes'], Querystagingarbitrumgoerli_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapWeeklyVolume: InContextSdkMethod<Query['stagingarbitrumgoerli_swapWeeklyVolume'], Querystagingarbitrumgoerli_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapWeeklyVolumes: InContextSdkMethod<Query['stagingarbitrumgoerli_swapWeeklyVolumes'], Querystagingarbitrumgoerli_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapEvent: InContextSdkMethod<Query['stagingarbitrumgoerli_stableSwapEvent'], Querystagingarbitrumgoerli_stableSwapEventArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapEvents: InContextSdkMethod<Query['stagingarbitrumgoerli_stableSwapEvents'], Querystagingarbitrumgoerli_stableSwapEventsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapTradeVolume: InContextSdkMethod<Query['stagingarbitrumgoerli_swapTradeVolume'], Querystagingarbitrumgoerli_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapTradeVolumes: InContextSdkMethod<Query['stagingarbitrumgoerli_swapTradeVolumes'], Querystagingarbitrumgoerli_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingarbitrumgoerli__meta: InContextSdkMethod<Query['stagingarbitrumgoerli__meta'], Querystagingarbitrumgoerli__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  stagingarbitrumgoerli_asset: InContextSdkMethod<Subscription['stagingarbitrumgoerli_asset'], Subscriptionstagingarbitrumgoerli_assetArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_assets: InContextSdkMethod<Subscription['stagingarbitrumgoerli_assets'], Subscriptionstagingarbitrumgoerli_assetsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_assetBalance: InContextSdkMethod<Subscription['stagingarbitrumgoerli_assetBalance'], Subscriptionstagingarbitrumgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_assetBalances: InContextSdkMethod<Subscription['stagingarbitrumgoerli_assetBalances'], Subscriptionstagingarbitrumgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_router: InContextSdkMethod<Subscription['stagingarbitrumgoerli_router'], Subscriptionstagingarbitrumgoerli_routerArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_routers: InContextSdkMethod<Subscription['stagingarbitrumgoerli_routers'], Subscriptionstagingarbitrumgoerli_routersArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_setting: InContextSdkMethod<Subscription['stagingarbitrumgoerli_setting'], Subscriptionstagingarbitrumgoerli_settingArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_settings: InContextSdkMethod<Subscription['stagingarbitrumgoerli_settings'], Subscriptionstagingarbitrumgoerli_settingsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_relayer: InContextSdkMethod<Subscription['stagingarbitrumgoerli_relayer'], Subscriptionstagingarbitrumgoerli_relayerArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_relayers: InContextSdkMethod<Subscription['stagingarbitrumgoerli_relayers'], Subscriptionstagingarbitrumgoerli_relayersArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_transferRelayerFee: InContextSdkMethod<Subscription['stagingarbitrumgoerli_transferRelayerFee'], Subscriptionstagingarbitrumgoerli_transferRelayerFeeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_transferRelayerFees: InContextSdkMethod<Subscription['stagingarbitrumgoerli_transferRelayerFees'], Subscriptionstagingarbitrumgoerli_transferRelayerFeesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_sequencer: InContextSdkMethod<Subscription['stagingarbitrumgoerli_sequencer'], Subscriptionstagingarbitrumgoerli_sequencerArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_sequencers: InContextSdkMethod<Subscription['stagingarbitrumgoerli_sequencers'], Subscriptionstagingarbitrumgoerli_sequencersArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_originTransfer: InContextSdkMethod<Subscription['stagingarbitrumgoerli_originTransfer'], Subscriptionstagingarbitrumgoerli_originTransferArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_originTransfers: InContextSdkMethod<Subscription['stagingarbitrumgoerli_originTransfers'], Subscriptionstagingarbitrumgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_destinationTransfer: InContextSdkMethod<Subscription['stagingarbitrumgoerli_destinationTransfer'], Subscriptionstagingarbitrumgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_destinationTransfers: InContextSdkMethod<Subscription['stagingarbitrumgoerli_destinationTransfers'], Subscriptionstagingarbitrumgoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_originMessage: InContextSdkMethod<Subscription['stagingarbitrumgoerli_originMessage'], Subscriptionstagingarbitrumgoerli_originMessageArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_originMessages: InContextSdkMethod<Subscription['stagingarbitrumgoerli_originMessages'], Subscriptionstagingarbitrumgoerli_originMessagesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_aggregateRoot: InContextSdkMethod<Subscription['stagingarbitrumgoerli_aggregateRoot'], Subscriptionstagingarbitrumgoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_aggregateRoots: InContextSdkMethod<Subscription['stagingarbitrumgoerli_aggregateRoots'], Subscriptionstagingarbitrumgoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_connectorMeta: InContextSdkMethod<Subscription['stagingarbitrumgoerli_connectorMeta'], Subscriptionstagingarbitrumgoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_connectorMetas: InContextSdkMethod<Subscription['stagingarbitrumgoerli_connectorMetas'], Subscriptionstagingarbitrumgoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_rootCount: InContextSdkMethod<Subscription['stagingarbitrumgoerli_rootCount'], Subscriptionstagingarbitrumgoerli_rootCountArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_rootCounts: InContextSdkMethod<Subscription['stagingarbitrumgoerli_rootCounts'], Subscriptionstagingarbitrumgoerli_rootCountsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_rootMessageSent: InContextSdkMethod<Subscription['stagingarbitrumgoerli_rootMessageSent'], Subscriptionstagingarbitrumgoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_rootMessageSents: InContextSdkMethod<Subscription['stagingarbitrumgoerli_rootMessageSents'], Subscriptionstagingarbitrumgoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwap: InContextSdkMethod<Subscription['stagingarbitrumgoerli_stableSwap'], Subscriptionstagingarbitrumgoerli_stableSwapArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwaps: InContextSdkMethod<Subscription['stagingarbitrumgoerli_stableSwaps'], Subscriptionstagingarbitrumgoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_pooledToken: InContextSdkMethod<Subscription['stagingarbitrumgoerli_pooledToken'], Subscriptionstagingarbitrumgoerli_pooledTokenArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_pooledTokens: InContextSdkMethod<Subscription['stagingarbitrumgoerli_pooledTokens'], Subscriptionstagingarbitrumgoerli_pooledTokensArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapAddLiquidityEvent: InContextSdkMethod<Subscription['stagingarbitrumgoerli_stableSwapAddLiquidityEvent'], Subscriptionstagingarbitrumgoerli_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapAddLiquidityEvents: InContextSdkMethod<Subscription['stagingarbitrumgoerli_stableSwapAddLiquidityEvents'], Subscriptionstagingarbitrumgoerli_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Subscription['stagingarbitrumgoerli_stableSwapRemoveLiquidityEvent'], Subscriptionstagingarbitrumgoerli_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Subscription['stagingarbitrumgoerli_stableSwapRemoveLiquidityEvents'], Subscriptionstagingarbitrumgoerli_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapExchange: InContextSdkMethod<Subscription['stagingarbitrumgoerli_stableSwapExchange'], Subscriptionstagingarbitrumgoerli_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapExchanges: InContextSdkMethod<Subscription['stagingarbitrumgoerli_stableSwapExchanges'], Subscriptionstagingarbitrumgoerli_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapDailyVolume: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swapDailyVolume'], Subscriptionstagingarbitrumgoerli_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapDailyVolumes: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swapDailyVolumes'], Subscriptionstagingarbitrumgoerli_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapHourlyVolume: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swapHourlyVolume'], Subscriptionstagingarbitrumgoerli_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapHourlyVolumes: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swapHourlyVolumes'], Subscriptionstagingarbitrumgoerli_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapWeeklyVolume: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swapWeeklyVolume'], Subscriptionstagingarbitrumgoerli_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapWeeklyVolumes: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swapWeeklyVolumes'], Subscriptionstagingarbitrumgoerli_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapEvent: InContextSdkMethod<Subscription['stagingarbitrumgoerli_stableSwapEvent'], Subscriptionstagingarbitrumgoerli_stableSwapEventArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapEvents: InContextSdkMethod<Subscription['stagingarbitrumgoerli_stableSwapEvents'], Subscriptionstagingarbitrumgoerli_stableSwapEventsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapTradeVolume: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swapTradeVolume'], Subscriptionstagingarbitrumgoerli_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapTradeVolumes: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swapTradeVolumes'], Subscriptionstagingarbitrumgoerli_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingarbitrumgoerli__meta: InContextSdkMethod<Subscription['stagingarbitrumgoerli__meta'], Subscriptionstagingarbitrumgoerli__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Staging_ArbitrumGoerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
