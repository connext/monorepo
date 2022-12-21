// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextArbitrumGoerliTypes {
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
  arbitrumgoerli_BigDecimal: any;
  BigInt: any;
  arbitrumgoerli_Bytes: any;
};

export type arbitrumgoerli_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['arbitrumgoerli_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type arbitrumgoerli_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type arbitrumgoerli_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  localAsset?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type arbitrumgoerli_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: arbitrumgoerli_Router;
  asset: arbitrumgoerli_Asset;
  feesEarned: Scalars['BigInt'];
};

export type arbitrumgoerli_AssetBalance_filter = {
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
  router_?: InputMaybe<arbitrumgoerli_Router_filter>;
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
  asset_?: InputMaybe<arbitrumgoerli_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset'
  | 'feesEarned';

export type arbitrumgoerli_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  key_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  key_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  localAsset?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_Asset_orderBy =
  | 'id'
  | 'key'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber';

export type arbitrumgoerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type arbitrumgoerli_Block_height = {
  hash?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type arbitrumgoerli_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  rootManager?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  mirrorConnector?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
};

export type arbitrumgoerli_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type arbitrumgoerli_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<arbitrumgoerli_TransferStatus>;
  routers?: Maybe<Array<arbitrumgoerli_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  delegate?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  asset?: Maybe<arbitrumgoerli_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type arbitrumgoerli_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_Router_filter>;
};

export type arbitrumgoerli_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<arbitrumgoerli_TransferStatus>;
  status_not?: InputMaybe<arbitrumgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<arbitrumgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<arbitrumgoerli_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<arbitrumgoerli_Router_filter>;
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
  to?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  delegate?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  delegate_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
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
  asset_?: InputMaybe<arbitrumgoerli_Asset_filter>;
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
  executedCaller?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
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
  reconciledCaller?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
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
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_DestinationTransfer_orderBy =
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
  | 'reconciledCaller'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber';

/** Defines the order direction, either ascending or descending */
export type arbitrumgoerli_OrderDirection =
  | 'asc'
  | 'desc';

export type arbitrumgoerli_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  root?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<arbitrumgoerli_RootCount>;
};

export type arbitrumgoerli_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  leaf_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  message_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  message_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  root?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
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
  rootCount_?: InputMaybe<arbitrumgoerli_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_OriginMessage_orderBy =
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

export type arbitrumgoerli_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<arbitrumgoerli_TransferStatus>;
  messageHash?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  delegate?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  asset?: Maybe<arbitrumgoerli_Asset>;
  message?: Maybe<arbitrumgoerli_OriginMessage>;
  caller?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type arbitrumgoerli_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<arbitrumgoerli_TransferStatus>;
  status_not?: InputMaybe<arbitrumgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<arbitrumgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<arbitrumgoerli_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
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
  to?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  delegate?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  delegate_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
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
  asset_?: InputMaybe<arbitrumgoerli_Asset_filter>;
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
  message_?: InputMaybe<arbitrumgoerli_OriginMessage_filter>;
  caller?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
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
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_OriginTransfer_orderBy =
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

export type arbitrumgoerli_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['arbitrumgoerli_Bytes'];
};

export type arbitrumgoerli_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  asset_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  arbitrumgoerli_asset?: Maybe<arbitrumgoerli_Asset>;
  arbitrumgoerli_assets: Array<arbitrumgoerli_Asset>;
  arbitrumgoerli_assetBalance?: Maybe<arbitrumgoerli_AssetBalance>;
  arbitrumgoerli_assetBalances: Array<arbitrumgoerli_AssetBalance>;
  arbitrumgoerli_router?: Maybe<arbitrumgoerli_Router>;
  arbitrumgoerli_routers: Array<arbitrumgoerli_Router>;
  arbitrumgoerli_setting?: Maybe<arbitrumgoerli_Setting>;
  arbitrumgoerli_settings: Array<arbitrumgoerli_Setting>;
  arbitrumgoerli_relayer?: Maybe<arbitrumgoerli_Relayer>;
  arbitrumgoerli_relayers: Array<arbitrumgoerli_Relayer>;
  arbitrumgoerli_sequencer?: Maybe<arbitrumgoerli_Sequencer>;
  arbitrumgoerli_sequencers: Array<arbitrumgoerli_Sequencer>;
  arbitrumgoerli_originTransfer?: Maybe<arbitrumgoerli_OriginTransfer>;
  arbitrumgoerli_originTransfers: Array<arbitrumgoerli_OriginTransfer>;
  arbitrumgoerli_destinationTransfer?: Maybe<arbitrumgoerli_DestinationTransfer>;
  arbitrumgoerli_destinationTransfers: Array<arbitrumgoerli_DestinationTransfer>;
  arbitrumgoerli_originMessage?: Maybe<arbitrumgoerli_OriginMessage>;
  arbitrumgoerli_originMessages: Array<arbitrumgoerli_OriginMessage>;
  arbitrumgoerli_aggregateRoot?: Maybe<arbitrumgoerli_AggregateRoot>;
  arbitrumgoerli_aggregateRoots: Array<arbitrumgoerli_AggregateRoot>;
  arbitrumgoerli_connectorMeta?: Maybe<arbitrumgoerli_ConnectorMeta>;
  arbitrumgoerli_connectorMetas: Array<arbitrumgoerli_ConnectorMeta>;
  arbitrumgoerli_rootCount?: Maybe<arbitrumgoerli_RootCount>;
  arbitrumgoerli_rootCounts: Array<arbitrumgoerli_RootCount>;
  arbitrumgoerli_rootMessageSent?: Maybe<arbitrumgoerli_RootMessageSent>;
  arbitrumgoerli_rootMessageSents: Array<arbitrumgoerli_RootMessageSent>;
  arbitrumgoerli_stableSwap?: Maybe<arbitrumgoerli_StableSwap>;
  arbitrumgoerli_stableSwaps: Array<arbitrumgoerli_StableSwap>;
  arbitrumgoerli_pooledToken?: Maybe<arbitrumgoerli_PooledToken>;
  arbitrumgoerli_pooledTokens: Array<arbitrumgoerli_PooledToken>;
  arbitrumgoerli_stableSwapLiquidity?: Maybe<arbitrumgoerli_StableSwapLiquidity>;
  arbitrumgoerli_stableSwapLiquidities: Array<arbitrumgoerli_StableSwapLiquidity>;
  /** Access to subgraph metadata */
  arbitrumgoerli__meta?: Maybe<arbitrumgoerli__Meta_>;
};


export type Queryarbitrumgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_Asset_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_AssetBalance_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_Router_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_Setting_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_Relayer_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_Sequencer_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_Sequencer_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_OriginTransfer_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_OriginMessage_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_AggregateRoot_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_ConnectorMeta_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_RootCount_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_RootCount_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_RootMessageSent_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_StableSwap_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_PooledToken_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_PooledToken_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_stableSwapLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_stableSwapLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_StableSwapLiquidity_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_StableSwapLiquidity_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli__metaArgs = {
  block?: InputMaybe<arbitrumgoerli_Block_height>;
};

export type arbitrumgoerli_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
};

export type arbitrumgoerli_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  relayer_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type arbitrumgoerli_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type arbitrumgoerli_RootCount_filter = {
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
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_RootCount_orderBy =
  | 'id'
  | 'count';

export type arbitrumgoerli_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type arbitrumgoerli_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
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
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_RootMessageSent_orderBy =
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

export type arbitrumgoerli_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  recipient?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  proposedOwner?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<arbitrumgoerli_AssetBalance>;
};


export type arbitrumgoerli_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_AssetBalance_filter>;
};

export type arbitrumgoerli_Router_filter = {
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
  owner?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  owner_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  recipient?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  recipient_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<arbitrumgoerli_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type arbitrumgoerli_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
};

export type arbitrumgoerli_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type arbitrumgoerli_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['arbitrumgoerli_Bytes'];
};

export type arbitrumgoerli_Setting_filter = {
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
  caller?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type arbitrumgoerli_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  lpToken?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<arbitrumgoerli_PooledToken>;
  tokenPrecisionMultipliers?: Maybe<Array<Scalars['BigInt']>>;
  balances: Array<Scalars['BigInt']>;
  adminFees?: Maybe<Array<Scalars['BigInt']>>;
};


export type arbitrumgoerli_StableSwappooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_PooledToken_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_PooledToken_filter>;
};

export type arbitrumgoerli_StableSwapLiquidity = {
  id: Scalars['ID'];
  provider: Scalars['arbitrumgoerli_Bytes'];
  stableSwap: arbitrumgoerli_StableSwap;
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply?: Maybe<Scalars['BigInt']>;
};

export type arbitrumgoerli_StableSwapLiquidity_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  provider?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  provider_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
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
  stableSwap_?: InputMaybe<arbitrumgoerli_StableSwap_filter>;
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
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_StableSwapLiquidity_orderBy =
  | 'id'
  | 'provider'
  | 'stableSwap'
  | 'tokenAmounts'
  | 'fees'
  | 'invariant'
  | 'lpTokenSupply';

export type arbitrumgoerli_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  key_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  key_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  lpToken?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
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
  pooledTokens_?: InputMaybe<arbitrumgoerli_PooledToken_filter>;
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
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_StableSwap_orderBy =
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
  arbitrumgoerli_asset?: Maybe<arbitrumgoerli_Asset>;
  arbitrumgoerli_assets: Array<arbitrumgoerli_Asset>;
  arbitrumgoerli_assetBalance?: Maybe<arbitrumgoerli_AssetBalance>;
  arbitrumgoerli_assetBalances: Array<arbitrumgoerli_AssetBalance>;
  arbitrumgoerli_router?: Maybe<arbitrumgoerli_Router>;
  arbitrumgoerli_routers: Array<arbitrumgoerli_Router>;
  arbitrumgoerli_setting?: Maybe<arbitrumgoerli_Setting>;
  arbitrumgoerli_settings: Array<arbitrumgoerli_Setting>;
  arbitrumgoerli_relayer?: Maybe<arbitrumgoerli_Relayer>;
  arbitrumgoerli_relayers: Array<arbitrumgoerli_Relayer>;
  arbitrumgoerli_sequencer?: Maybe<arbitrumgoerli_Sequencer>;
  arbitrumgoerli_sequencers: Array<arbitrumgoerli_Sequencer>;
  arbitrumgoerli_originTransfer?: Maybe<arbitrumgoerli_OriginTransfer>;
  arbitrumgoerli_originTransfers: Array<arbitrumgoerli_OriginTransfer>;
  arbitrumgoerli_destinationTransfer?: Maybe<arbitrumgoerli_DestinationTransfer>;
  arbitrumgoerli_destinationTransfers: Array<arbitrumgoerli_DestinationTransfer>;
  arbitrumgoerli_originMessage?: Maybe<arbitrumgoerli_OriginMessage>;
  arbitrumgoerli_originMessages: Array<arbitrumgoerli_OriginMessage>;
  arbitrumgoerli_aggregateRoot?: Maybe<arbitrumgoerli_AggregateRoot>;
  arbitrumgoerli_aggregateRoots: Array<arbitrumgoerli_AggregateRoot>;
  arbitrumgoerli_connectorMeta?: Maybe<arbitrumgoerli_ConnectorMeta>;
  arbitrumgoerli_connectorMetas: Array<arbitrumgoerli_ConnectorMeta>;
  arbitrumgoerli_rootCount?: Maybe<arbitrumgoerli_RootCount>;
  arbitrumgoerli_rootCounts: Array<arbitrumgoerli_RootCount>;
  arbitrumgoerli_rootMessageSent?: Maybe<arbitrumgoerli_RootMessageSent>;
  arbitrumgoerli_rootMessageSents: Array<arbitrumgoerli_RootMessageSent>;
  arbitrumgoerli_stableSwap?: Maybe<arbitrumgoerli_StableSwap>;
  arbitrumgoerli_stableSwaps: Array<arbitrumgoerli_StableSwap>;
  arbitrumgoerli_pooledToken?: Maybe<arbitrumgoerli_PooledToken>;
  arbitrumgoerli_pooledTokens: Array<arbitrumgoerli_PooledToken>;
  arbitrumgoerli_stableSwapLiquidity?: Maybe<arbitrumgoerli_StableSwapLiquidity>;
  arbitrumgoerli_stableSwapLiquidities: Array<arbitrumgoerli_StableSwapLiquidity>;
  /** Access to subgraph metadata */
  arbitrumgoerli__meta?: Maybe<arbitrumgoerli__Meta_>;
};


export type Subscriptionarbitrumgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_Asset_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_AssetBalance_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_Router_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_Setting_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_Relayer_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_Sequencer_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_Sequencer_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_OriginTransfer_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_OriginMessage_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_AggregateRoot_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_ConnectorMeta_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_RootCount_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_RootCount_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_RootMessageSent_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_StableSwap_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_PooledToken_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_PooledToken_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_stableSwapLiquidityArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_stableSwapLiquiditiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_StableSwapLiquidity_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_StableSwapLiquidity_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli__metaArgs = {
  block?: InputMaybe<arbitrumgoerli_Block_height>;
};

export type arbitrumgoerli_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type arbitrumgoerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type arbitrumgoerli__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: arbitrumgoerli__Block_;
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
  arbitrumgoerli_asset: InContextSdkMethod<Query['arbitrumgoerli_asset'], Queryarbitrumgoerli_assetArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_assets: InContextSdkMethod<Query['arbitrumgoerli_assets'], Queryarbitrumgoerli_assetsArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_assetBalance: InContextSdkMethod<Query['arbitrumgoerli_assetBalance'], Queryarbitrumgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_assetBalances: InContextSdkMethod<Query['arbitrumgoerli_assetBalances'], Queryarbitrumgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_router: InContextSdkMethod<Query['arbitrumgoerli_router'], Queryarbitrumgoerli_routerArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_routers: InContextSdkMethod<Query['arbitrumgoerli_routers'], Queryarbitrumgoerli_routersArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_setting: InContextSdkMethod<Query['arbitrumgoerli_setting'], Queryarbitrumgoerli_settingArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_settings: InContextSdkMethod<Query['arbitrumgoerli_settings'], Queryarbitrumgoerli_settingsArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_relayer: InContextSdkMethod<Query['arbitrumgoerli_relayer'], Queryarbitrumgoerli_relayerArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_relayers: InContextSdkMethod<Query['arbitrumgoerli_relayers'], Queryarbitrumgoerli_relayersArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_sequencer: InContextSdkMethod<Query['arbitrumgoerli_sequencer'], Queryarbitrumgoerli_sequencerArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_sequencers: InContextSdkMethod<Query['arbitrumgoerli_sequencers'], Queryarbitrumgoerli_sequencersArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_originTransfer: InContextSdkMethod<Query['arbitrumgoerli_originTransfer'], Queryarbitrumgoerli_originTransferArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_originTransfers: InContextSdkMethod<Query['arbitrumgoerli_originTransfers'], Queryarbitrumgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_destinationTransfer: InContextSdkMethod<Query['arbitrumgoerli_destinationTransfer'], Queryarbitrumgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_destinationTransfers: InContextSdkMethod<Query['arbitrumgoerli_destinationTransfers'], Queryarbitrumgoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_originMessage: InContextSdkMethod<Query['arbitrumgoerli_originMessage'], Queryarbitrumgoerli_originMessageArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_originMessages: InContextSdkMethod<Query['arbitrumgoerli_originMessages'], Queryarbitrumgoerli_originMessagesArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_aggregateRoot: InContextSdkMethod<Query['arbitrumgoerli_aggregateRoot'], Queryarbitrumgoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_aggregateRoots: InContextSdkMethod<Query['arbitrumgoerli_aggregateRoots'], Queryarbitrumgoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_connectorMeta: InContextSdkMethod<Query['arbitrumgoerli_connectorMeta'], Queryarbitrumgoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_connectorMetas: InContextSdkMethod<Query['arbitrumgoerli_connectorMetas'], Queryarbitrumgoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_rootCount: InContextSdkMethod<Query['arbitrumgoerli_rootCount'], Queryarbitrumgoerli_rootCountArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_rootCounts: InContextSdkMethod<Query['arbitrumgoerli_rootCounts'], Queryarbitrumgoerli_rootCountsArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_rootMessageSent: InContextSdkMethod<Query['arbitrumgoerli_rootMessageSent'], Queryarbitrumgoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_rootMessageSents: InContextSdkMethod<Query['arbitrumgoerli_rootMessageSents'], Queryarbitrumgoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwap: InContextSdkMethod<Query['arbitrumgoerli_stableSwap'], Queryarbitrumgoerli_stableSwapArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwaps: InContextSdkMethod<Query['arbitrumgoerli_stableSwaps'], Queryarbitrumgoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_pooledToken: InContextSdkMethod<Query['arbitrumgoerli_pooledToken'], Queryarbitrumgoerli_pooledTokenArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_pooledTokens: InContextSdkMethod<Query['arbitrumgoerli_pooledTokens'], Queryarbitrumgoerli_pooledTokensArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwapLiquidity: InContextSdkMethod<Query['arbitrumgoerli_stableSwapLiquidity'], Queryarbitrumgoerli_stableSwapLiquidityArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwapLiquidities: InContextSdkMethod<Query['arbitrumgoerli_stableSwapLiquidities'], Queryarbitrumgoerli_stableSwapLiquiditiesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  arbitrumgoerli__meta: InContextSdkMethod<Query['arbitrumgoerli__meta'], Queryarbitrumgoerli__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  arbitrumgoerli_asset: InContextSdkMethod<Subscription['arbitrumgoerli_asset'], Subscriptionarbitrumgoerli_assetArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_assets: InContextSdkMethod<Subscription['arbitrumgoerli_assets'], Subscriptionarbitrumgoerli_assetsArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_assetBalance: InContextSdkMethod<Subscription['arbitrumgoerli_assetBalance'], Subscriptionarbitrumgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_assetBalances: InContextSdkMethod<Subscription['arbitrumgoerli_assetBalances'], Subscriptionarbitrumgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_router: InContextSdkMethod<Subscription['arbitrumgoerli_router'], Subscriptionarbitrumgoerli_routerArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_routers: InContextSdkMethod<Subscription['arbitrumgoerli_routers'], Subscriptionarbitrumgoerli_routersArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_setting: InContextSdkMethod<Subscription['arbitrumgoerli_setting'], Subscriptionarbitrumgoerli_settingArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_settings: InContextSdkMethod<Subscription['arbitrumgoerli_settings'], Subscriptionarbitrumgoerli_settingsArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_relayer: InContextSdkMethod<Subscription['arbitrumgoerli_relayer'], Subscriptionarbitrumgoerli_relayerArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_relayers: InContextSdkMethod<Subscription['arbitrumgoerli_relayers'], Subscriptionarbitrumgoerli_relayersArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_sequencer: InContextSdkMethod<Subscription['arbitrumgoerli_sequencer'], Subscriptionarbitrumgoerli_sequencerArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_sequencers: InContextSdkMethod<Subscription['arbitrumgoerli_sequencers'], Subscriptionarbitrumgoerli_sequencersArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_originTransfer: InContextSdkMethod<Subscription['arbitrumgoerli_originTransfer'], Subscriptionarbitrumgoerli_originTransferArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_originTransfers: InContextSdkMethod<Subscription['arbitrumgoerli_originTransfers'], Subscriptionarbitrumgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_destinationTransfer: InContextSdkMethod<Subscription['arbitrumgoerli_destinationTransfer'], Subscriptionarbitrumgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_destinationTransfers: InContextSdkMethod<Subscription['arbitrumgoerli_destinationTransfers'], Subscriptionarbitrumgoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_originMessage: InContextSdkMethod<Subscription['arbitrumgoerli_originMessage'], Subscriptionarbitrumgoerli_originMessageArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_originMessages: InContextSdkMethod<Subscription['arbitrumgoerli_originMessages'], Subscriptionarbitrumgoerli_originMessagesArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_aggregateRoot: InContextSdkMethod<Subscription['arbitrumgoerli_aggregateRoot'], Subscriptionarbitrumgoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_aggregateRoots: InContextSdkMethod<Subscription['arbitrumgoerli_aggregateRoots'], Subscriptionarbitrumgoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_connectorMeta: InContextSdkMethod<Subscription['arbitrumgoerli_connectorMeta'], Subscriptionarbitrumgoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_connectorMetas: InContextSdkMethod<Subscription['arbitrumgoerli_connectorMetas'], Subscriptionarbitrumgoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_rootCount: InContextSdkMethod<Subscription['arbitrumgoerli_rootCount'], Subscriptionarbitrumgoerli_rootCountArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_rootCounts: InContextSdkMethod<Subscription['arbitrumgoerli_rootCounts'], Subscriptionarbitrumgoerli_rootCountsArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_rootMessageSent: InContextSdkMethod<Subscription['arbitrumgoerli_rootMessageSent'], Subscriptionarbitrumgoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_rootMessageSents: InContextSdkMethod<Subscription['arbitrumgoerli_rootMessageSents'], Subscriptionarbitrumgoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwap: InContextSdkMethod<Subscription['arbitrumgoerli_stableSwap'], Subscriptionarbitrumgoerli_stableSwapArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwaps: InContextSdkMethod<Subscription['arbitrumgoerli_stableSwaps'], Subscriptionarbitrumgoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_pooledToken: InContextSdkMethod<Subscription['arbitrumgoerli_pooledToken'], Subscriptionarbitrumgoerli_pooledTokenArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_pooledTokens: InContextSdkMethod<Subscription['arbitrumgoerli_pooledTokens'], Subscriptionarbitrumgoerli_pooledTokensArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwapLiquidity: InContextSdkMethod<Subscription['arbitrumgoerli_stableSwapLiquidity'], Subscriptionarbitrumgoerli_stableSwapLiquidityArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwapLiquidities: InContextSdkMethod<Subscription['arbitrumgoerli_stableSwapLiquidities'], Subscriptionarbitrumgoerli_stableSwapLiquiditiesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  arbitrumgoerli__meta: InContextSdkMethod<Subscription['arbitrumgoerli__meta'], Subscriptionarbitrumgoerli__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_ArbitrumGoerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
