
import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextLocal1338Types {
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
  local1338_BigDecimal: any;
  BigInt: bigint;
  local1338_Bytes: any;
};

export type local1338_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['local1338_Bytes']>;
  local: Scalars['local1338_Bytes'];
  adoptedAsset: Scalars['local1338_Bytes'];
  canonicalId: Scalars['local1338_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type local1338_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: local1338_Router;
  asset: local1338_Asset;
};

export type local1338_AssetBalance_filter = {
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
  router_?: InputMaybe<local1338_Router_filter>;
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
  asset_?: InputMaybe<local1338_Asset_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type local1338_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['local1338_Bytes']>;
  key_not?: InputMaybe<Scalars['local1338_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  key_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  local?: InputMaybe<Scalars['local1338_Bytes']>;
  local_not?: InputMaybe<Scalars['local1338_Bytes']>;
  local_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  local_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  local_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  local_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  adoptedAsset?: InputMaybe<Scalars['local1338_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['local1338_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_Asset_orderBy =
  | 'id'
  | 'key'
  | 'local'
  | 'adoptedAsset'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'blockNumber';

export type local1338_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type local1338_Block_height = {
  hash?: InputMaybe<Scalars['local1338_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type local1338_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['local1338_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['local1338_Bytes']>;
  callData?: Maybe<Scalars['local1338_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  agent?: Maybe<Scalars['local1338_Bytes']>;
  recovery?: Maybe<Scalars['local1338_Bytes']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callback?: Maybe<Scalars['local1338_Bytes']>;
  callbackFee?: Maybe<Scalars['BigInt']>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  destinationMinOut?: Maybe<Scalars['BigInt']>;
  status?: Maybe<local1338_TransferStatus>;
  routers?: Maybe<Array<local1338_Router>>;
  originSender?: Maybe<Scalars['local1338_Bytes']>;
  transactingAsset?: Maybe<Scalars['local1338_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  localAsset?: Maybe<Scalars['local1338_Bytes']>;
  localAmount?: Maybe<Scalars['BigInt']>;
  sponsorVaultRelayerFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['local1338_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['local1338_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['local1338_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['local1338_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type local1338_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Router_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Router_filter>;
};

export type local1338_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_not?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['local1338_Bytes']>;
  to_not?: InputMaybe<Scalars['local1338_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  to_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  callData?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_not?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  agent?: InputMaybe<Scalars['local1338_Bytes']>;
  agent_not?: InputMaybe<Scalars['local1338_Bytes']>;
  agent_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  agent_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  agent_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  agent_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  recovery?: InputMaybe<Scalars['local1338_Bytes']>;
  recovery_not?: InputMaybe<Scalars['local1338_Bytes']>;
  recovery_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  recovery_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  recovery_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  recovery_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callback?: InputMaybe<Scalars['local1338_Bytes']>;
  callback_not?: InputMaybe<Scalars['local1338_Bytes']>;
  callback_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  callback_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  callback_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  callback_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  status?: InputMaybe<local1338_TransferStatus>;
  status_not?: InputMaybe<local1338_TransferStatus>;
  status_in?: InputMaybe<Array<local1338_TransferStatus>>;
  status_not_in?: InputMaybe<Array<local1338_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<local1338_Router_filter>;
  originSender?: InputMaybe<Scalars['local1338_Bytes']>;
  originSender_not?: InputMaybe<Scalars['local1338_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['local1338_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['local1338_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAsset?: InputMaybe<Scalars['local1338_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['local1338_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  executedCaller?: InputMaybe<Scalars['local1338_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['local1338_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  reconciledCaller?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_DestinationTransfer_orderBy =
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
export type local1338_OrderDirection =
  | 'asc'
  | 'desc';

export type local1338_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['local1338_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['local1338_Bytes']>;
  callData?: Maybe<Scalars['local1338_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  agent?: Maybe<Scalars['local1338_Bytes']>;
  recovery?: Maybe<Scalars['local1338_Bytes']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callback?: Maybe<Scalars['local1338_Bytes']>;
  callbackFee?: Maybe<Scalars['BigInt']>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  destinationMinOut?: Maybe<Scalars['BigInt']>;
  status?: Maybe<local1338_TransferStatus>;
  originMinOut?: Maybe<Scalars['BigInt']>;
  transactingAsset?: Maybe<Scalars['local1338_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  bridgedAsset?: Maybe<Scalars['local1338_Bytes']>;
  bridgedAmount?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['local1338_Bytes']>;
  transactionHash?: Maybe<Scalars['local1338_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type local1338_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_not?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['local1338_Bytes']>;
  to_not?: InputMaybe<Scalars['local1338_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  to_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  callData?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_not?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  agent?: InputMaybe<Scalars['local1338_Bytes']>;
  agent_not?: InputMaybe<Scalars['local1338_Bytes']>;
  agent_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  agent_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  agent_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  agent_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  recovery?: InputMaybe<Scalars['local1338_Bytes']>;
  recovery_not?: InputMaybe<Scalars['local1338_Bytes']>;
  recovery_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  recovery_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  recovery_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  recovery_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callback?: InputMaybe<Scalars['local1338_Bytes']>;
  callback_not?: InputMaybe<Scalars['local1338_Bytes']>;
  callback_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  callback_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  callback_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  callback_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  status?: InputMaybe<local1338_TransferStatus>;
  status_not?: InputMaybe<local1338_TransferStatus>;
  status_in?: InputMaybe<Array<local1338_TransferStatus>>;
  status_not_in?: InputMaybe<Array<local1338_TransferStatus>>;
  originMinOut?: InputMaybe<Scalars['BigInt']>;
  originMinOut_not?: InputMaybe<Scalars['BigInt']>;
  originMinOut_gt?: InputMaybe<Scalars['BigInt']>;
  originMinOut_lt?: InputMaybe<Scalars['BigInt']>;
  originMinOut_gte?: InputMaybe<Scalars['BigInt']>;
  originMinOut_lte?: InputMaybe<Scalars['BigInt']>;
  originMinOut_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originMinOut_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAsset?: InputMaybe<Scalars['local1338_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['local1338_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAsset?: InputMaybe<Scalars['local1338_Bytes']>;
  bridgedAsset_not?: InputMaybe<Scalars['local1338_Bytes']>;
  bridgedAsset_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  bridgedAsset_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  bridgedAsset_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  bridgedAsset_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  bridgedAmount?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_not?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_not?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
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
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_OriginTransfer_orderBy =
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
  local1338_asset?: Maybe<local1338_Asset>;
  local1338_assets: Array<local1338_Asset>;
  local1338_assetBalance?: Maybe<local1338_AssetBalance>;
  local1338_assetBalances: Array<local1338_AssetBalance>;
  local1338_router?: Maybe<local1338_Router>;
  local1338_routers: Array<local1338_Router>;
  local1338_setting?: Maybe<local1338_Setting>;
  local1338_settings: Array<local1338_Setting>;
  local1338_relayer?: Maybe<local1338_Relayer>;
  local1338_relayers: Array<local1338_Relayer>;
  local1338_stableSwap?: Maybe<local1338_StableSwap>;
  local1338_stableSwaps: Array<local1338_StableSwap>;
  local1338_sponsorVault?: Maybe<local1338_SponsorVault>;
  local1338_sponsorVaults: Array<local1338_SponsorVault>;
  local1338_originTransfer?: Maybe<local1338_OriginTransfer>;
  local1338_originTransfers: Array<local1338_OriginTransfer>;
  local1338_destinationTransfer?: Maybe<local1338_DestinationTransfer>;
  local1338_destinationTransfers: Array<local1338_DestinationTransfer>;
  /** Access to subgraph metadata */
  local1338__meta?: Maybe<local1338__Meta_>;
};


export type Querylocal1338_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Asset_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Asset_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_AssetBalance_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Router_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Router_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Setting_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Setting_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Relayer_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Relayer_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_StableSwap_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_StableSwap_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_sponsorVaultArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_sponsorVaultsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_SponsorVault_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_SponsorVault_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_OriginTransfer_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_DestinationTransfer_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1338__metaArgs = {
  block?: InputMaybe<local1338_Block_height>;
};

export type local1338_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['local1338_Bytes']>;
};

export type local1338_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['local1338_Bytes']>;
  relayer_not?: InputMaybe<Scalars['local1338_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type local1338_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['local1338_Bytes']>;
  recipient?: Maybe<Scalars['local1338_Bytes']>;
  proposedOwner?: Maybe<Scalars['local1338_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<local1338_AssetBalance>;
};


export type local1338_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_AssetBalance_filter>;
};

export type local1338_Router_filter = {
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
  owner?: InputMaybe<Scalars['local1338_Bytes']>;
  owner_not?: InputMaybe<Scalars['local1338_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  recipient?: InputMaybe<Scalars['local1338_Bytes']>;
  recipient_not?: InputMaybe<Scalars['local1338_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['local1338_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['local1338_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<local1338_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type local1338_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['local1338_Bytes'];
};

export type local1338_Setting_filter = {
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
  caller?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_not?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type local1338_SponsorVault = {
  id: Scalars['ID'];
  sponsorVault: Scalars['local1338_Bytes'];
};

export type local1338_SponsorVault_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  sponsorVault?: InputMaybe<Scalars['local1338_Bytes']>;
  sponsorVault_not?: InputMaybe<Scalars['local1338_Bytes']>;
  sponsorVault_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  sponsorVault_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  sponsorVault_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  sponsorVault_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_SponsorVault_orderBy =
  | 'id'
  | 'sponsorVault';

export type local1338_StableSwap = {
  id: Scalars['ID'];
  canonicalId: Scalars['local1338_Bytes'];
  domain?: Maybe<Scalars['BigInt']>;
  swapPool: Scalars['local1338_Bytes'];
};

export type local1338_StableSwap_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  canonicalId?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['local1338_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['local1338_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['local1338_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['local1338_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1338_BlockChangedFilter>;
};

export type local1338_StableSwap_orderBy =
  | 'id'
  | 'canonicalId'
  | 'domain'
  | 'swapPool';

export type Subscription = {
  local1338_asset?: Maybe<local1338_Asset>;
  local1338_assets: Array<local1338_Asset>;
  local1338_assetBalance?: Maybe<local1338_AssetBalance>;
  local1338_assetBalances: Array<local1338_AssetBalance>;
  local1338_router?: Maybe<local1338_Router>;
  local1338_routers: Array<local1338_Router>;
  local1338_setting?: Maybe<local1338_Setting>;
  local1338_settings: Array<local1338_Setting>;
  local1338_relayer?: Maybe<local1338_Relayer>;
  local1338_relayers: Array<local1338_Relayer>;
  local1338_stableSwap?: Maybe<local1338_StableSwap>;
  local1338_stableSwaps: Array<local1338_StableSwap>;
  local1338_sponsorVault?: Maybe<local1338_SponsorVault>;
  local1338_sponsorVaults: Array<local1338_SponsorVault>;
  local1338_originTransfer?: Maybe<local1338_OriginTransfer>;
  local1338_originTransfers: Array<local1338_OriginTransfer>;
  local1338_destinationTransfer?: Maybe<local1338_DestinationTransfer>;
  local1338_destinationTransfers: Array<local1338_DestinationTransfer>;
  /** Access to subgraph metadata */
  local1338__meta?: Maybe<local1338__Meta_>;
};


export type Subscriptionlocal1338_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Asset_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Asset_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_AssetBalance_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Router_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Router_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Setting_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Setting_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_Relayer_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_Relayer_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_StableSwap_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_StableSwap_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_sponsorVaultArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_sponsorVaultsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_SponsorVault_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_SponsorVault_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_OriginTransfer_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1338_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<local1338_OrderDirection>;
  where?: InputMaybe<local1338_DestinationTransfer_filter>;
  block?: InputMaybe<local1338_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1338__metaArgs = {
  block?: InputMaybe<local1338_Block_height>;
};

export type local1338_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type local1338__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['local1338_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type local1338__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: local1338__Block_;
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

}
export type QueryConnextLocal1338Sdk = {
  /** null **/
  local1338_asset: InContextSdkMethod<ConnextLocal1338Types.Query['local1338_asset'], ConnextLocal1338Types.Querylocal1338_assetArgs, MeshContext>,
  /** null **/
  local1338_assets: InContextSdkMethod<ConnextLocal1338Types.Query['local1338_assets'], ConnextLocal1338Types.Querylocal1338_assetsArgs, MeshContext>,
  /** null **/
  local1338_assetBalance: InContextSdkMethod<ConnextLocal1338Types.Query['local1338_assetBalance'], ConnextLocal1338Types.Querylocal1338_assetBalanceArgs, MeshContext>,
  /** null **/
  local1338_assetBalances: InContextSdkMethod<ConnextLocal1338Types.Query['local1338_assetBalances'], ConnextLocal1338Types.Querylocal1338_assetBalancesArgs, MeshContext>,
  /** null **/
  local1338_router: InContextSdkMethod<ConnextLocal1338Types.Query['local1338_router'], ConnextLocal1338Types.Querylocal1338_routerArgs, MeshContext>,
  /** null **/
  local1338_routers: InContextSdkMethod<ConnextLocal1338Types.Query['local1338_routers'], ConnextLocal1338Types.Querylocal1338_routersArgs, MeshContext>,
  /** null **/
  local1338_setting: InContextSdkMethod<ConnextLocal1338Types.Query['local1338_setting'], ConnextLocal1338Types.Querylocal1338_settingArgs, MeshContext>,
  /** null **/
  local1338_settings: InContextSdkMethod<ConnextLocal1338Types.Query['local1338_settings'], ConnextLocal1338Types.Querylocal1338_settingsArgs, MeshContext>,
  /** null **/
  local1338_relayer: InContextSdkMethod<ConnextLocal1338Types.Query['local1338_relayer'], ConnextLocal1338Types.Querylocal1338_relayerArgs, MeshContext>,
  /** null **/
  local1338_relayers: InContextSdkMethod<ConnextLocal1338Types.Query['local1338_relayers'], ConnextLocal1338Types.Querylocal1338_relayersArgs, MeshContext>,
  /** null **/
  local1338_stableSwap: InContextSdkMethod<ConnextLocal1338Types.Query['local1338_stableSwap'], ConnextLocal1338Types.Querylocal1338_stableSwapArgs, MeshContext>,
  /** null **/
  local1338_stableSwaps: InContextSdkMethod<ConnextLocal1338Types.Query['local1338_stableSwaps'], ConnextLocal1338Types.Querylocal1338_stableSwapsArgs, MeshContext>,
  /** null **/
  local1338_sponsorVault: InContextSdkMethod<ConnextLocal1338Types.Query['local1338_sponsorVault'], ConnextLocal1338Types.Querylocal1338_sponsorVaultArgs, MeshContext>,
  /** null **/
  local1338_sponsorVaults: InContextSdkMethod<ConnextLocal1338Types.Query['local1338_sponsorVaults'], ConnextLocal1338Types.Querylocal1338_sponsorVaultsArgs, MeshContext>,
  /** null **/
  local1338_originTransfer: InContextSdkMethod<ConnextLocal1338Types.Query['local1338_originTransfer'], ConnextLocal1338Types.Querylocal1338_originTransferArgs, MeshContext>,
  /** null **/
  local1338_originTransfers: InContextSdkMethod<ConnextLocal1338Types.Query['local1338_originTransfers'], ConnextLocal1338Types.Querylocal1338_originTransfersArgs, MeshContext>,
  /** null **/
  local1338_destinationTransfer: InContextSdkMethod<ConnextLocal1338Types.Query['local1338_destinationTransfer'], ConnextLocal1338Types.Querylocal1338_destinationTransferArgs, MeshContext>,
  /** null **/
  local1338_destinationTransfers: InContextSdkMethod<ConnextLocal1338Types.Query['local1338_destinationTransfers'], ConnextLocal1338Types.Querylocal1338_destinationTransfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  local1338__meta: InContextSdkMethod<ConnextLocal1338Types.Query['local1338__meta'], ConnextLocal1338Types.Querylocal1338__metaArgs, MeshContext>
};

export type MutationConnextLocal1338Sdk = {

};

export type SubscriptionConnextLocal1338Sdk = {
  /** null **/
  local1338_asset: InContextSdkMethod<ConnextLocal1338Types.Subscription['local1338_asset'], ConnextLocal1338Types.Subscriptionlocal1338_assetArgs, MeshContext>,
  /** null **/
  local1338_assets: InContextSdkMethod<ConnextLocal1338Types.Subscription['local1338_assets'], ConnextLocal1338Types.Subscriptionlocal1338_assetsArgs, MeshContext>,
  /** null **/
  local1338_assetBalance: InContextSdkMethod<ConnextLocal1338Types.Subscription['local1338_assetBalance'], ConnextLocal1338Types.Subscriptionlocal1338_assetBalanceArgs, MeshContext>,
  /** null **/
  local1338_assetBalances: InContextSdkMethod<ConnextLocal1338Types.Subscription['local1338_assetBalances'], ConnextLocal1338Types.Subscriptionlocal1338_assetBalancesArgs, MeshContext>,
  /** null **/
  local1338_router: InContextSdkMethod<ConnextLocal1338Types.Subscription['local1338_router'], ConnextLocal1338Types.Subscriptionlocal1338_routerArgs, MeshContext>,
  /** null **/
  local1338_routers: InContextSdkMethod<ConnextLocal1338Types.Subscription['local1338_routers'], ConnextLocal1338Types.Subscriptionlocal1338_routersArgs, MeshContext>,
  /** null **/
  local1338_setting: InContextSdkMethod<ConnextLocal1338Types.Subscription['local1338_setting'], ConnextLocal1338Types.Subscriptionlocal1338_settingArgs, MeshContext>,
  /** null **/
  local1338_settings: InContextSdkMethod<ConnextLocal1338Types.Subscription['local1338_settings'], ConnextLocal1338Types.Subscriptionlocal1338_settingsArgs, MeshContext>,
  /** null **/
  local1338_relayer: InContextSdkMethod<ConnextLocal1338Types.Subscription['local1338_relayer'], ConnextLocal1338Types.Subscriptionlocal1338_relayerArgs, MeshContext>,
  /** null **/
  local1338_relayers: InContextSdkMethod<ConnextLocal1338Types.Subscription['local1338_relayers'], ConnextLocal1338Types.Subscriptionlocal1338_relayersArgs, MeshContext>,
  /** null **/
  local1338_stableSwap: InContextSdkMethod<ConnextLocal1338Types.Subscription['local1338_stableSwap'], ConnextLocal1338Types.Subscriptionlocal1338_stableSwapArgs, MeshContext>,
  /** null **/
  local1338_stableSwaps: InContextSdkMethod<ConnextLocal1338Types.Subscription['local1338_stableSwaps'], ConnextLocal1338Types.Subscriptionlocal1338_stableSwapsArgs, MeshContext>,
  /** null **/
  local1338_sponsorVault: InContextSdkMethod<ConnextLocal1338Types.Subscription['local1338_sponsorVault'], ConnextLocal1338Types.Subscriptionlocal1338_sponsorVaultArgs, MeshContext>,
  /** null **/
  local1338_sponsorVaults: InContextSdkMethod<ConnextLocal1338Types.Subscription['local1338_sponsorVaults'], ConnextLocal1338Types.Subscriptionlocal1338_sponsorVaultsArgs, MeshContext>,
  /** null **/
  local1338_originTransfer: InContextSdkMethod<ConnextLocal1338Types.Subscription['local1338_originTransfer'], ConnextLocal1338Types.Subscriptionlocal1338_originTransferArgs, MeshContext>,
  /** null **/
  local1338_originTransfers: InContextSdkMethod<ConnextLocal1338Types.Subscription['local1338_originTransfers'], ConnextLocal1338Types.Subscriptionlocal1338_originTransfersArgs, MeshContext>,
  /** null **/
  local1338_destinationTransfer: InContextSdkMethod<ConnextLocal1338Types.Subscription['local1338_destinationTransfer'], ConnextLocal1338Types.Subscriptionlocal1338_destinationTransferArgs, MeshContext>,
  /** null **/
  local1338_destinationTransfers: InContextSdkMethod<ConnextLocal1338Types.Subscription['local1338_destinationTransfers'], ConnextLocal1338Types.Subscriptionlocal1338_destinationTransfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  local1338__meta: InContextSdkMethod<ConnextLocal1338Types.Subscription['local1338__meta'], ConnextLocal1338Types.Subscriptionlocal1338__metaArgs, MeshContext>
};
export type ConnextLocal1338Context = {
      ["Connext_Local1338"]: { Query: QueryConnextLocal1338Sdk, Mutation: MutationConnextLocal1338Sdk, Subscription: SubscriptionConnextLocal1338Sdk },
      
    };