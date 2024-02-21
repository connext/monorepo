// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextTestOptimismGoerliTypes {
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
  testoptimismgoerli_BigDecimal: any;
  BigInt: any;
  testoptimismgoerli_Bytes: any;
  testoptimismgoerli_Int8: any;
};

export type testoptimismgoerli_Aggregation_interval =
  | 'hour'
  | 'day';

export type testoptimismgoerli_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  local: Scalars['testoptimismgoerli_Bytes'];
  adoptedAsset: Scalars['testoptimismgoerli_Bytes'];
  canonicalId: Scalars['testoptimismgoerli_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type testoptimismgoerli_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: testoptimismgoerli_Router;
  asset: testoptimismgoerli_Asset;
};

export type testoptimismgoerli_AssetBalance_filter = {
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
  router_?: InputMaybe<testoptimismgoerli_Router_filter>;
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
  asset_?: InputMaybe<testoptimismgoerli_Asset_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_AssetBalance_filter>>>;
};

export type testoptimismgoerli_AssetBalance_orderBy =
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
  | 'asset__local'
  | 'asset__adoptedAsset'
  | 'asset__canonicalId'
  | 'asset__canonicalDomain'
  | 'asset__blockNumber';

export type testoptimismgoerli_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  key_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  key_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  key_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  key_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  key_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  key_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  local?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  local_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  local_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  local_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  local_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  local_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  local_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  local_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  local_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  local_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  adoptedAsset?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_Asset_filter>>>;
};

export type testoptimismgoerli_Asset_orderBy =
  | 'id'
  | 'key'
  | 'local'
  | 'adoptedAsset'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'blockNumber';

export type testoptimismgoerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type testoptimismgoerli_Block_height = {
  hash?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type testoptimismgoerli_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  callData?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  agent?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  recovery?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callback?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  callbackFee?: Maybe<Scalars['BigInt']>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  destinationMinOut?: Maybe<Scalars['BigInt']>;
  status?: Maybe<testoptimismgoerli_TransferStatus>;
  routers?: Maybe<Array<testoptimismgoerli_Router>>;
  originSender?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAsset?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  localAsset?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  localAmount?: Maybe<Scalars['BigInt']>;
  sponsorVaultRelayerFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type testoptimismgoerli_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_Router_filter>;
};

export type testoptimismgoerli_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
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
  agent?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  agent_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  agent_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  agent_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  agent_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  agent_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  agent_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  agent_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  agent_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  agent_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recovery?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recovery_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recovery_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recovery_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recovery_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recovery_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recovery_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  recovery_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  recovery_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recovery_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callback?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callback_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callback_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callback_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callback_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callback_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callback_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  callback_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  callback_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callback_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callbackFee?: InputMaybe<Scalars['BigInt']>;
  callbackFee_not?: InputMaybe<Scalars['BigInt']>;
  callbackFee_gt?: InputMaybe<Scalars['BigInt']>;
  callbackFee_lt?: InputMaybe<Scalars['BigInt']>;
  callbackFee_gte?: InputMaybe<Scalars['BigInt']>;
  callbackFee_lte?: InputMaybe<Scalars['BigInt']>;
  callbackFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  callbackFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationMinOut?: InputMaybe<Scalars['BigInt']>;
  destinationMinOut_not?: InputMaybe<Scalars['BigInt']>;
  destinationMinOut_gt?: InputMaybe<Scalars['BigInt']>;
  destinationMinOut_lt?: InputMaybe<Scalars['BigInt']>;
  destinationMinOut_gte?: InputMaybe<Scalars['BigInt']>;
  destinationMinOut_lte?: InputMaybe<Scalars['BigInt']>;
  destinationMinOut_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationMinOut_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<testoptimismgoerli_TransferStatus>;
  status_not?: InputMaybe<testoptimismgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<testoptimismgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<testoptimismgoerli_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<testoptimismgoerli_Router_filter>;
  originSender?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAsset?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  localAmount?: InputMaybe<Scalars['BigInt']>;
  localAmount_not?: InputMaybe<Scalars['BigInt']>;
  localAmount_gt?: InputMaybe<Scalars['BigInt']>;
  localAmount_lt?: InputMaybe<Scalars['BigInt']>;
  localAmount_gte?: InputMaybe<Scalars['BigInt']>;
  localAmount_lte?: InputMaybe<Scalars['BigInt']>;
  localAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sponsorVaultRelayerFee?: InputMaybe<Scalars['BigInt']>;
  sponsorVaultRelayerFee_not?: InputMaybe<Scalars['BigInt']>;
  sponsorVaultRelayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  sponsorVaultRelayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  sponsorVaultRelayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  sponsorVaultRelayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  sponsorVaultRelayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sponsorVaultRelayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
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
  reconciledCaller?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_DestinationTransfer_filter>>>;
};

export type testoptimismgoerli_DestinationTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'agent'
  | 'recovery'
  | 'forceSlow'
  | 'receiveLocal'
  | 'callback'
  | 'callbackFee'
  | 'relayerFee'
  | 'destinationMinOut'
  | 'status'
  | 'routers'
  | 'originSender'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'localAsset'
  | 'localAmount'
  | 'sponsorVaultRelayerFee'
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
export type testoptimismgoerli_OrderDirection =
  | 'asc'
  | 'desc';

export type testoptimismgoerli_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  callData?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  agent?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  recovery?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callback?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  callbackFee?: Maybe<Scalars['BigInt']>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  destinationMinOut?: Maybe<Scalars['BigInt']>;
  status?: Maybe<testoptimismgoerli_TransferStatus>;
  originMinOut?: Maybe<Scalars['BigInt']>;
  transactingAsset?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  bridgedAsset?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  bridgedAmount?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type testoptimismgoerli_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
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
  agent?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  agent_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  agent_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  agent_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  agent_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  agent_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  agent_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  agent_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  agent_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  agent_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recovery?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recovery_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recovery_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recovery_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recovery_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recovery_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recovery_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  recovery_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  recovery_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recovery_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callback?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callback_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callback_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callback_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callback_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callback_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callback_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  callback_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  callback_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callback_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  callbackFee?: InputMaybe<Scalars['BigInt']>;
  callbackFee_not?: InputMaybe<Scalars['BigInt']>;
  callbackFee_gt?: InputMaybe<Scalars['BigInt']>;
  callbackFee_lt?: InputMaybe<Scalars['BigInt']>;
  callbackFee_gte?: InputMaybe<Scalars['BigInt']>;
  callbackFee_lte?: InputMaybe<Scalars['BigInt']>;
  callbackFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  callbackFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationMinOut?: InputMaybe<Scalars['BigInt']>;
  destinationMinOut_not?: InputMaybe<Scalars['BigInt']>;
  destinationMinOut_gt?: InputMaybe<Scalars['BigInt']>;
  destinationMinOut_lt?: InputMaybe<Scalars['BigInt']>;
  destinationMinOut_gte?: InputMaybe<Scalars['BigInt']>;
  destinationMinOut_lte?: InputMaybe<Scalars['BigInt']>;
  destinationMinOut_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationMinOut_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<testoptimismgoerli_TransferStatus>;
  status_not?: InputMaybe<testoptimismgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<testoptimismgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<testoptimismgoerli_TransferStatus>>;
  originMinOut?: InputMaybe<Scalars['BigInt']>;
  originMinOut_not?: InputMaybe<Scalars['BigInt']>;
  originMinOut_gt?: InputMaybe<Scalars['BigInt']>;
  originMinOut_lt?: InputMaybe<Scalars['BigInt']>;
  originMinOut_gte?: InputMaybe<Scalars['BigInt']>;
  originMinOut_lte?: InputMaybe<Scalars['BigInt']>;
  originMinOut_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originMinOut_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAsset?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAsset?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  bridgedAsset_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  bridgedAsset_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  bridgedAsset_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  bridgedAsset_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  bridgedAsset_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  bridgedAsset_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  bridgedAsset_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  bridgedAsset_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  bridgedAsset_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  bridgedAmount?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_not?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_OriginTransfer_filter>>>;
};

export type testoptimismgoerli_OriginTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'agent'
  | 'recovery'
  | 'forceSlow'
  | 'receiveLocal'
  | 'callback'
  | 'callbackFee'
  | 'relayerFee'
  | 'destinationMinOut'
  | 'status'
  | 'originMinOut'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'bridgedAsset'
  | 'bridgedAmount'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type Query = {
  testoptimismgoerli_asset?: Maybe<testoptimismgoerli_Asset>;
  testoptimismgoerli_assets: Array<testoptimismgoerli_Asset>;
  testoptimismgoerli_assetBalance?: Maybe<testoptimismgoerli_AssetBalance>;
  testoptimismgoerli_assetBalances: Array<testoptimismgoerli_AssetBalance>;
  testoptimismgoerli_router?: Maybe<testoptimismgoerli_Router>;
  testoptimismgoerli_routers: Array<testoptimismgoerli_Router>;
  testoptimismgoerli_setting?: Maybe<testoptimismgoerli_Setting>;
  testoptimismgoerli_settings: Array<testoptimismgoerli_Setting>;
  testoptimismgoerli_relayer?: Maybe<testoptimismgoerli_Relayer>;
  testoptimismgoerli_relayers: Array<testoptimismgoerli_Relayer>;
  testoptimismgoerli_stableSwap?: Maybe<testoptimismgoerli_StableSwap>;
  testoptimismgoerli_stableSwaps: Array<testoptimismgoerli_StableSwap>;
  testoptimismgoerli_sponsorVault?: Maybe<testoptimismgoerli_SponsorVault>;
  testoptimismgoerli_sponsorVaults: Array<testoptimismgoerli_SponsorVault>;
  testoptimismgoerli_originTransfer?: Maybe<testoptimismgoerli_OriginTransfer>;
  testoptimismgoerli_originTransfers: Array<testoptimismgoerli_OriginTransfer>;
  testoptimismgoerli_destinationTransfer?: Maybe<testoptimismgoerli_DestinationTransfer>;
  testoptimismgoerli_destinationTransfers: Array<testoptimismgoerli_DestinationTransfer>;
  /** Access to subgraph metadata */
  testoptimismgoerli__meta?: Maybe<testoptimismgoerli__Meta_>;
};


export type Querytestoptimismgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_Asset_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_AssetBalance_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_Router_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_Setting_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_Relayer_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_StableSwap_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_sponsorVaultArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_sponsorVaultsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_SponsorVault_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_SponsorVault_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_OriginTransfer_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestoptimismgoerli__metaArgs = {
  block?: InputMaybe<testoptimismgoerli_Block_height>;
};

export type testoptimismgoerli_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
};

export type testoptimismgoerli_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  relayer_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_Relayer_filter>>>;
};

export type testoptimismgoerli_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type testoptimismgoerli_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  recipient?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  proposedOwner?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<testoptimismgoerli_AssetBalance>;
};


export type testoptimismgoerli_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_AssetBalance_filter>;
};

export type testoptimismgoerli_Router_filter = {
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
  owner?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  owner_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  owner_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  owner_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  owner_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  owner_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recipient?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recipient_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<testoptimismgoerli_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_Router_filter>>>;
};

export type testoptimismgoerli_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type testoptimismgoerli_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['testoptimismgoerli_Bytes'];
};

export type testoptimismgoerli_Setting_filter = {
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
  caller?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_Setting_filter>>>;
};

export type testoptimismgoerli_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type testoptimismgoerli_SponsorVault = {
  id: Scalars['ID'];
  sponsorVault: Scalars['testoptimismgoerli_Bytes'];
};

export type testoptimismgoerli_SponsorVault_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  sponsorVault?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  sponsorVault_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  sponsorVault_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  sponsorVault_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  sponsorVault_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  sponsorVault_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  sponsorVault_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  sponsorVault_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  sponsorVault_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  sponsorVault_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_SponsorVault_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_SponsorVault_filter>>>;
};

export type testoptimismgoerli_SponsorVault_orderBy =
  | 'id'
  | 'sponsorVault';

export type testoptimismgoerli_StableSwap = {
  id: Scalars['ID'];
  canonicalId: Scalars['testoptimismgoerli_Bytes'];
  domain?: Maybe<Scalars['BigInt']>;
  swapPool: Scalars['testoptimismgoerli_Bytes'];
};

export type testoptimismgoerli_StableSwap_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  canonicalId?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  swapPool_gt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  swapPool_lt?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  swapPool_gte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  swapPool_lte?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['testoptimismgoerli_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['testoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testoptimismgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testoptimismgoerli_StableSwap_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testoptimismgoerli_StableSwap_filter>>>;
};

export type testoptimismgoerli_StableSwap_orderBy =
  | 'id'
  | 'canonicalId'
  | 'domain'
  | 'swapPool';

export type Subscription = {
  testoptimismgoerli_asset?: Maybe<testoptimismgoerli_Asset>;
  testoptimismgoerli_assets: Array<testoptimismgoerli_Asset>;
  testoptimismgoerli_assetBalance?: Maybe<testoptimismgoerli_AssetBalance>;
  testoptimismgoerli_assetBalances: Array<testoptimismgoerli_AssetBalance>;
  testoptimismgoerli_router?: Maybe<testoptimismgoerli_Router>;
  testoptimismgoerli_routers: Array<testoptimismgoerli_Router>;
  testoptimismgoerli_setting?: Maybe<testoptimismgoerli_Setting>;
  testoptimismgoerli_settings: Array<testoptimismgoerli_Setting>;
  testoptimismgoerli_relayer?: Maybe<testoptimismgoerli_Relayer>;
  testoptimismgoerli_relayers: Array<testoptimismgoerli_Relayer>;
  testoptimismgoerli_stableSwap?: Maybe<testoptimismgoerli_StableSwap>;
  testoptimismgoerli_stableSwaps: Array<testoptimismgoerli_StableSwap>;
  testoptimismgoerli_sponsorVault?: Maybe<testoptimismgoerli_SponsorVault>;
  testoptimismgoerli_sponsorVaults: Array<testoptimismgoerli_SponsorVault>;
  testoptimismgoerli_originTransfer?: Maybe<testoptimismgoerli_OriginTransfer>;
  testoptimismgoerli_originTransfers: Array<testoptimismgoerli_OriginTransfer>;
  testoptimismgoerli_destinationTransfer?: Maybe<testoptimismgoerli_DestinationTransfer>;
  testoptimismgoerli_destinationTransfers: Array<testoptimismgoerli_DestinationTransfer>;
  /** Access to subgraph metadata */
  testoptimismgoerli__meta?: Maybe<testoptimismgoerli__Meta_>;
};


export type Subscriptiontestoptimismgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_Asset_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_AssetBalance_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_Router_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_Setting_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_Relayer_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_StableSwap_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_sponsorVaultArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_sponsorVaultsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_SponsorVault_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_SponsorVault_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_OriginTransfer_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testoptimismgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<testoptimismgoerli_OrderDirection>;
  where?: InputMaybe<testoptimismgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<testoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestoptimismgoerli__metaArgs = {
  block?: InputMaybe<testoptimismgoerli_Block_height>;
};

export type testoptimismgoerli_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type testoptimismgoerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['testoptimismgoerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type testoptimismgoerli__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: testoptimismgoerli__Block_;
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
  testoptimismgoerli_asset: InContextSdkMethod<Query['testoptimismgoerli_asset'], Querytestoptimismgoerli_assetArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_assets: InContextSdkMethod<Query['testoptimismgoerli_assets'], Querytestoptimismgoerli_assetsArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_assetBalance: InContextSdkMethod<Query['testoptimismgoerli_assetBalance'], Querytestoptimismgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_assetBalances: InContextSdkMethod<Query['testoptimismgoerli_assetBalances'], Querytestoptimismgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_router: InContextSdkMethod<Query['testoptimismgoerli_router'], Querytestoptimismgoerli_routerArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_routers: InContextSdkMethod<Query['testoptimismgoerli_routers'], Querytestoptimismgoerli_routersArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_setting: InContextSdkMethod<Query['testoptimismgoerli_setting'], Querytestoptimismgoerli_settingArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_settings: InContextSdkMethod<Query['testoptimismgoerli_settings'], Querytestoptimismgoerli_settingsArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_relayer: InContextSdkMethod<Query['testoptimismgoerli_relayer'], Querytestoptimismgoerli_relayerArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_relayers: InContextSdkMethod<Query['testoptimismgoerli_relayers'], Querytestoptimismgoerli_relayersArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_stableSwap: InContextSdkMethod<Query['testoptimismgoerli_stableSwap'], Querytestoptimismgoerli_stableSwapArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_stableSwaps: InContextSdkMethod<Query['testoptimismgoerli_stableSwaps'], Querytestoptimismgoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_sponsorVault: InContextSdkMethod<Query['testoptimismgoerli_sponsorVault'], Querytestoptimismgoerli_sponsorVaultArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_sponsorVaults: InContextSdkMethod<Query['testoptimismgoerli_sponsorVaults'], Querytestoptimismgoerli_sponsorVaultsArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_originTransfer: InContextSdkMethod<Query['testoptimismgoerli_originTransfer'], Querytestoptimismgoerli_originTransferArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_originTransfers: InContextSdkMethod<Query['testoptimismgoerli_originTransfers'], Querytestoptimismgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_destinationTransfer: InContextSdkMethod<Query['testoptimismgoerli_destinationTransfer'], Querytestoptimismgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_destinationTransfers: InContextSdkMethod<Query['testoptimismgoerli_destinationTransfers'], Querytestoptimismgoerli_destinationTransfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  testoptimismgoerli__meta: InContextSdkMethod<Query['testoptimismgoerli__meta'], Querytestoptimismgoerli__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  testoptimismgoerli_asset: InContextSdkMethod<Subscription['testoptimismgoerli_asset'], Subscriptiontestoptimismgoerli_assetArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_assets: InContextSdkMethod<Subscription['testoptimismgoerli_assets'], Subscriptiontestoptimismgoerli_assetsArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_assetBalance: InContextSdkMethod<Subscription['testoptimismgoerli_assetBalance'], Subscriptiontestoptimismgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_assetBalances: InContextSdkMethod<Subscription['testoptimismgoerli_assetBalances'], Subscriptiontestoptimismgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_router: InContextSdkMethod<Subscription['testoptimismgoerli_router'], Subscriptiontestoptimismgoerli_routerArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_routers: InContextSdkMethod<Subscription['testoptimismgoerli_routers'], Subscriptiontestoptimismgoerli_routersArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_setting: InContextSdkMethod<Subscription['testoptimismgoerli_setting'], Subscriptiontestoptimismgoerli_settingArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_settings: InContextSdkMethod<Subscription['testoptimismgoerli_settings'], Subscriptiontestoptimismgoerli_settingsArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_relayer: InContextSdkMethod<Subscription['testoptimismgoerli_relayer'], Subscriptiontestoptimismgoerli_relayerArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_relayers: InContextSdkMethod<Subscription['testoptimismgoerli_relayers'], Subscriptiontestoptimismgoerli_relayersArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_stableSwap: InContextSdkMethod<Subscription['testoptimismgoerli_stableSwap'], Subscriptiontestoptimismgoerli_stableSwapArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_stableSwaps: InContextSdkMethod<Subscription['testoptimismgoerli_stableSwaps'], Subscriptiontestoptimismgoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_sponsorVault: InContextSdkMethod<Subscription['testoptimismgoerli_sponsorVault'], Subscriptiontestoptimismgoerli_sponsorVaultArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_sponsorVaults: InContextSdkMethod<Subscription['testoptimismgoerli_sponsorVaults'], Subscriptiontestoptimismgoerli_sponsorVaultsArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_originTransfer: InContextSdkMethod<Subscription['testoptimismgoerli_originTransfer'], Subscriptiontestoptimismgoerli_originTransferArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_originTransfers: InContextSdkMethod<Subscription['testoptimismgoerli_originTransfers'], Subscriptiontestoptimismgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_destinationTransfer: InContextSdkMethod<Subscription['testoptimismgoerli_destinationTransfer'], Subscriptiontestoptimismgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  testoptimismgoerli_destinationTransfers: InContextSdkMethod<Subscription['testoptimismgoerli_destinationTransfers'], Subscriptiontestoptimismgoerli_destinationTransfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  testoptimismgoerli__meta: InContextSdkMethod<Subscription['testoptimismgoerli__meta'], Subscriptiontestoptimismgoerli__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Test_OptimismGoerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
