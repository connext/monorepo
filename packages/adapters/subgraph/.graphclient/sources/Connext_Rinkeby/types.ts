
import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextRinkebyTypes {
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
  rinkeby_BigDecimal: any;
  BigInt: bigint;
  rinkeby_Bytes: any;
};

export type rinkeby_Asset = {
  id: Scalars['ID'];
  local: Scalars['rinkeby_Bytes'];
  adoptedAsset: Scalars['rinkeby_Bytes'];
  canonicalId: Scalars['rinkeby_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type rinkeby_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: rinkeby_Router;
  asset: rinkeby_Asset;
};

export type rinkeby_AssetBalance_filter = {
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
  router_?: InputMaybe<rinkeby_Router_filter>;
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
  asset_?: InputMaybe<rinkeby_Asset_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<rinkeby_BlockChangedFilter>;
};

export type rinkeby_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type rinkeby_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  local?: InputMaybe<Scalars['rinkeby_Bytes']>;
  local_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  local_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  local_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  local_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  local_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  adoptedAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  canonicalId?: InputMaybe<Scalars['rinkeby_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
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
  _change_block?: InputMaybe<rinkeby_BlockChangedFilter>;
};

export type rinkeby_Asset_orderBy =
  | 'id'
  | 'local'
  | 'adoptedAsset'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'blockNumber';

export type rinkeby_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type rinkeby_Block_height = {
  hash?: InputMaybe<Scalars['rinkeby_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type rinkeby_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['rinkeby_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['rinkeby_Bytes']>;
  callData?: Maybe<Scalars['rinkeby_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  agent?: Maybe<Scalars['rinkeby_Bytes']>;
  recovery?: Maybe<Scalars['rinkeby_Bytes']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callback?: Maybe<Scalars['rinkeby_Bytes']>;
  callbackFee?: Maybe<Scalars['BigInt']>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  slippageTol?: Maybe<Scalars['BigInt']>;
  status?: Maybe<rinkeby_TransferStatus>;
  routers?: Maybe<Array<rinkeby_Router>>;
  originSender?: Maybe<Scalars['rinkeby_Bytes']>;
  transactingAsset?: Maybe<Scalars['rinkeby_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  localAsset?: Maybe<Scalars['rinkeby_Bytes']>;
  localAmount?: Maybe<Scalars['BigInt']>;
  sponsorVaultRelayerFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['rinkeby_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['rinkeby_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['rinkeby_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['rinkeby_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type rinkeby_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Router_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Router_filter>;
};

export type rinkeby_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  to_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
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
  agent?: InputMaybe<Scalars['rinkeby_Bytes']>;
  agent_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  agent_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  agent_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  agent_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  agent_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  recovery?: InputMaybe<Scalars['rinkeby_Bytes']>;
  recovery_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  recovery_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  recovery_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  recovery_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  recovery_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callback?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callback_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callback_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  callback_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  callback_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callback_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
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
  slippageTol?: InputMaybe<Scalars['BigInt']>;
  slippageTol_not?: InputMaybe<Scalars['BigInt']>;
  slippageTol_gt?: InputMaybe<Scalars['BigInt']>;
  slippageTol_lt?: InputMaybe<Scalars['BigInt']>;
  slippageTol_gte?: InputMaybe<Scalars['BigInt']>;
  slippageTol_lte?: InputMaybe<Scalars['BigInt']>;
  slippageTol_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippageTol_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<rinkeby_TransferStatus>;
  status_not?: InputMaybe<rinkeby_TransferStatus>;
  status_in?: InputMaybe<Array<rinkeby_TransferStatus>>;
  status_not_in?: InputMaybe<Array<rinkeby_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<rinkeby_Router_filter>;
  originSender?: InputMaybe<Scalars['rinkeby_Bytes']>;
  originSender_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
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
  executedCaller?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
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
  reconciledCaller?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
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
  _change_block?: InputMaybe<rinkeby_BlockChangedFilter>;
};

export type rinkeby_DestinationTransfer_orderBy =
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
  | 'slippageTol'
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
export type rinkeby_OrderDirection =
  | 'asc'
  | 'desc';

export type rinkeby_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['rinkeby_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['rinkeby_Bytes']>;
  callData?: Maybe<Scalars['rinkeby_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  agent?: Maybe<Scalars['rinkeby_Bytes']>;
  recovery?: Maybe<Scalars['rinkeby_Bytes']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callback?: Maybe<Scalars['rinkeby_Bytes']>;
  callbackFee?: Maybe<Scalars['BigInt']>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  slippageTol?: Maybe<Scalars['BigInt']>;
  status?: Maybe<rinkeby_TransferStatus>;
  message?: Maybe<Scalars['rinkeby_Bytes']>;
  transactingAsset?: Maybe<Scalars['rinkeby_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  bridgedAsset?: Maybe<Scalars['rinkeby_Bytes']>;
  bridgedAmount?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['rinkeby_Bytes']>;
  transactionHash?: Maybe<Scalars['rinkeby_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type rinkeby_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  to_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
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
  agent?: InputMaybe<Scalars['rinkeby_Bytes']>;
  agent_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  agent_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  agent_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  agent_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  agent_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  recovery?: InputMaybe<Scalars['rinkeby_Bytes']>;
  recovery_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  recovery_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  recovery_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  recovery_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  recovery_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callback?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callback_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callback_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  callback_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  callback_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callback_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
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
  slippageTol?: InputMaybe<Scalars['BigInt']>;
  slippageTol_not?: InputMaybe<Scalars['BigInt']>;
  slippageTol_gt?: InputMaybe<Scalars['BigInt']>;
  slippageTol_lt?: InputMaybe<Scalars['BigInt']>;
  slippageTol_gte?: InputMaybe<Scalars['BigInt']>;
  slippageTol_lte?: InputMaybe<Scalars['BigInt']>;
  slippageTol_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippageTol_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<rinkeby_TransferStatus>;
  status_not?: InputMaybe<rinkeby_TransferStatus>;
  status_in?: InputMaybe<Array<rinkeby_TransferStatus>>;
  status_not_in?: InputMaybe<Array<rinkeby_TransferStatus>>;
  message?: InputMaybe<Scalars['rinkeby_Bytes']>;
  message_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  message_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  bridgedAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  bridgedAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  bridgedAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  bridgedAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  bridgedAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  bridgedAmount?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_not?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['rinkeby_Bytes']>;
  caller_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactionHash?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
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
  _change_block?: InputMaybe<rinkeby_BlockChangedFilter>;
};

export type rinkeby_OriginTransfer_orderBy =
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
  | 'slippageTol'
  | 'status'
  | 'message'
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
  rinkeby_asset?: Maybe<rinkeby_Asset>;
  rinkeby_assets: Array<rinkeby_Asset>;
  rinkeby_assetBalance?: Maybe<rinkeby_AssetBalance>;
  rinkeby_assetBalances: Array<rinkeby_AssetBalance>;
  rinkeby_router?: Maybe<rinkeby_Router>;
  rinkeby_routers: Array<rinkeby_Router>;
  rinkeby_setting?: Maybe<rinkeby_Setting>;
  rinkeby_settings: Array<rinkeby_Setting>;
  rinkeby_relayer?: Maybe<rinkeby_Relayer>;
  rinkeby_relayers: Array<rinkeby_Relayer>;
  rinkeby_stableSwap?: Maybe<rinkeby_StableSwap>;
  rinkeby_stableSwaps: Array<rinkeby_StableSwap>;
  rinkeby_sponsorVault?: Maybe<rinkeby_SponsorVault>;
  rinkeby_sponsorVaults: Array<rinkeby_SponsorVault>;
  rinkeby_originTransfer?: Maybe<rinkeby_OriginTransfer>;
  rinkeby_originTransfers: Array<rinkeby_OriginTransfer>;
  rinkeby_destinationTransfer?: Maybe<rinkeby_DestinationTransfer>;
  rinkeby_destinationTransfers: Array<rinkeby_DestinationTransfer>;
  /** Access to subgraph metadata */
  rinkeby__meta?: Maybe<rinkeby__Meta_>;
};


export type Queryrinkeby_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Asset_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Asset_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_AssetBalance_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Router_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Router_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Setting_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Setting_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Relayer_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Relayer_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_StableSwap_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_StableSwap_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_sponsorVaultArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_sponsorVaultsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_SponsorVault_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_SponsorVault_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_OriginTransfer_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_DestinationTransfer_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby__metaArgs = {
  block?: InputMaybe<rinkeby_Block_height>;
};

export type rinkeby_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['rinkeby_Bytes']>;
};

export type rinkeby_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['rinkeby_Bytes']>;
  relayer_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<rinkeby_BlockChangedFilter>;
};

export type rinkeby_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type rinkeby_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['rinkeby_Bytes']>;
  recipient?: Maybe<Scalars['rinkeby_Bytes']>;
  proposedOwner?: Maybe<Scalars['rinkeby_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<rinkeby_AssetBalance>;
};


export type rinkeby_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_AssetBalance_filter>;
};

export type rinkeby_Router_filter = {
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
  owner?: InputMaybe<Scalars['rinkeby_Bytes']>;
  owner_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  recipient?: InputMaybe<Scalars['rinkeby_Bytes']>;
  recipient_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['rinkeby_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<rinkeby_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<rinkeby_BlockChangedFilter>;
};

export type rinkeby_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type rinkeby_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['rinkeby_Bytes'];
};

export type rinkeby_Setting_filter = {
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
  caller?: InputMaybe<Scalars['rinkeby_Bytes']>;
  caller_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<rinkeby_BlockChangedFilter>;
};

export type rinkeby_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type rinkeby_SponsorVault = {
  id: Scalars['ID'];
  sponsorVault: Scalars['rinkeby_Bytes'];
};

export type rinkeby_SponsorVault_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  sponsorVault?: InputMaybe<Scalars['rinkeby_Bytes']>;
  sponsorVault_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  sponsorVault_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  sponsorVault_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  sponsorVault_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  sponsorVault_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<rinkeby_BlockChangedFilter>;
};

export type rinkeby_SponsorVault_orderBy =
  | 'id'
  | 'sponsorVault';

export type rinkeby_StableSwap = {
  id: Scalars['ID'];
  canonicalId: Scalars['rinkeby_Bytes'];
  domain?: Maybe<Scalars['BigInt']>;
  swapPool: Scalars['rinkeby_Bytes'];
};

export type rinkeby_StableSwap_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  canonicalId?: InputMaybe<Scalars['rinkeby_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['rinkeby_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<rinkeby_BlockChangedFilter>;
};

export type rinkeby_StableSwap_orderBy =
  | 'id'
  | 'canonicalId'
  | 'domain'
  | 'swapPool';

export type Subscription = {
  rinkeby_asset?: Maybe<rinkeby_Asset>;
  rinkeby_assets: Array<rinkeby_Asset>;
  rinkeby_assetBalance?: Maybe<rinkeby_AssetBalance>;
  rinkeby_assetBalances: Array<rinkeby_AssetBalance>;
  rinkeby_router?: Maybe<rinkeby_Router>;
  rinkeby_routers: Array<rinkeby_Router>;
  rinkeby_setting?: Maybe<rinkeby_Setting>;
  rinkeby_settings: Array<rinkeby_Setting>;
  rinkeby_relayer?: Maybe<rinkeby_Relayer>;
  rinkeby_relayers: Array<rinkeby_Relayer>;
  rinkeby_stableSwap?: Maybe<rinkeby_StableSwap>;
  rinkeby_stableSwaps: Array<rinkeby_StableSwap>;
  rinkeby_sponsorVault?: Maybe<rinkeby_SponsorVault>;
  rinkeby_sponsorVaults: Array<rinkeby_SponsorVault>;
  rinkeby_originTransfer?: Maybe<rinkeby_OriginTransfer>;
  rinkeby_originTransfers: Array<rinkeby_OriginTransfer>;
  rinkeby_destinationTransfer?: Maybe<rinkeby_DestinationTransfer>;
  rinkeby_destinationTransfers: Array<rinkeby_DestinationTransfer>;
  /** Access to subgraph metadata */
  rinkeby__meta?: Maybe<rinkeby__Meta_>;
};


export type Subscriptionrinkeby_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Asset_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Asset_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_AssetBalance_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Router_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Router_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Setting_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Setting_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Relayer_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Relayer_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_StableSwap_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_StableSwap_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_sponsorVaultArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_sponsorVaultsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_SponsorVault_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_SponsorVault_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_OriginTransfer_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_DestinationTransfer_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby__metaArgs = {
  block?: InputMaybe<rinkeby_Block_height>;
};

export type rinkeby_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type rinkeby__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['rinkeby_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type rinkeby__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: rinkeby__Block_;
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
export type QueryConnextRinkebySdk = {
  /** null **/
  rinkeby_asset: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_asset'], ConnextRinkebyTypes.Queryrinkeby_assetArgs, MeshContext>,
  /** null **/
  rinkeby_assets: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_assets'], ConnextRinkebyTypes.Queryrinkeby_assetsArgs, MeshContext>,
  /** null **/
  rinkeby_assetBalance: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_assetBalance'], ConnextRinkebyTypes.Queryrinkeby_assetBalanceArgs, MeshContext>,
  /** null **/
  rinkeby_assetBalances: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_assetBalances'], ConnextRinkebyTypes.Queryrinkeby_assetBalancesArgs, MeshContext>,
  /** null **/
  rinkeby_router: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_router'], ConnextRinkebyTypes.Queryrinkeby_routerArgs, MeshContext>,
  /** null **/
  rinkeby_routers: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_routers'], ConnextRinkebyTypes.Queryrinkeby_routersArgs, MeshContext>,
  /** null **/
  rinkeby_setting: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_setting'], ConnextRinkebyTypes.Queryrinkeby_settingArgs, MeshContext>,
  /** null **/
  rinkeby_settings: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_settings'], ConnextRinkebyTypes.Queryrinkeby_settingsArgs, MeshContext>,
  /** null **/
  rinkeby_relayer: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_relayer'], ConnextRinkebyTypes.Queryrinkeby_relayerArgs, MeshContext>,
  /** null **/
  rinkeby_relayers: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_relayers'], ConnextRinkebyTypes.Queryrinkeby_relayersArgs, MeshContext>,
  /** null **/
  rinkeby_stableSwap: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_stableSwap'], ConnextRinkebyTypes.Queryrinkeby_stableSwapArgs, MeshContext>,
  /** null **/
  rinkeby_stableSwaps: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_stableSwaps'], ConnextRinkebyTypes.Queryrinkeby_stableSwapsArgs, MeshContext>,
  /** null **/
  rinkeby_sponsorVault: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_sponsorVault'], ConnextRinkebyTypes.Queryrinkeby_sponsorVaultArgs, MeshContext>,
  /** null **/
  rinkeby_sponsorVaults: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_sponsorVaults'], ConnextRinkebyTypes.Queryrinkeby_sponsorVaultsArgs, MeshContext>,
  /** null **/
  rinkeby_originTransfer: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_originTransfer'], ConnextRinkebyTypes.Queryrinkeby_originTransferArgs, MeshContext>,
  /** null **/
  rinkeby_originTransfers: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_originTransfers'], ConnextRinkebyTypes.Queryrinkeby_originTransfersArgs, MeshContext>,
  /** null **/
  rinkeby_destinationTransfer: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_destinationTransfer'], ConnextRinkebyTypes.Queryrinkeby_destinationTransferArgs, MeshContext>,
  /** null **/
  rinkeby_destinationTransfers: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_destinationTransfers'], ConnextRinkebyTypes.Queryrinkeby_destinationTransfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  rinkeby__meta: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby__meta'], ConnextRinkebyTypes.Queryrinkeby__metaArgs, MeshContext>
};

export type MutationConnextRinkebySdk = {

};

export type SubscriptionConnextRinkebySdk = {
  /** null **/
  rinkeby_asset: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_asset'], ConnextRinkebyTypes.Subscriptionrinkeby_assetArgs, MeshContext>,
  /** null **/
  rinkeby_assets: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_assets'], ConnextRinkebyTypes.Subscriptionrinkeby_assetsArgs, MeshContext>,
  /** null **/
  rinkeby_assetBalance: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_assetBalance'], ConnextRinkebyTypes.Subscriptionrinkeby_assetBalanceArgs, MeshContext>,
  /** null **/
  rinkeby_assetBalances: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_assetBalances'], ConnextRinkebyTypes.Subscriptionrinkeby_assetBalancesArgs, MeshContext>,
  /** null **/
  rinkeby_router: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_router'], ConnextRinkebyTypes.Subscriptionrinkeby_routerArgs, MeshContext>,
  /** null **/
  rinkeby_routers: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_routers'], ConnextRinkebyTypes.Subscriptionrinkeby_routersArgs, MeshContext>,
  /** null **/
  rinkeby_setting: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_setting'], ConnextRinkebyTypes.Subscriptionrinkeby_settingArgs, MeshContext>,
  /** null **/
  rinkeby_settings: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_settings'], ConnextRinkebyTypes.Subscriptionrinkeby_settingsArgs, MeshContext>,
  /** null **/
  rinkeby_relayer: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_relayer'], ConnextRinkebyTypes.Subscriptionrinkeby_relayerArgs, MeshContext>,
  /** null **/
  rinkeby_relayers: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_relayers'], ConnextRinkebyTypes.Subscriptionrinkeby_relayersArgs, MeshContext>,
  /** null **/
  rinkeby_stableSwap: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_stableSwap'], ConnextRinkebyTypes.Subscriptionrinkeby_stableSwapArgs, MeshContext>,
  /** null **/
  rinkeby_stableSwaps: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_stableSwaps'], ConnextRinkebyTypes.Subscriptionrinkeby_stableSwapsArgs, MeshContext>,
  /** null **/
  rinkeby_sponsorVault: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_sponsorVault'], ConnextRinkebyTypes.Subscriptionrinkeby_sponsorVaultArgs, MeshContext>,
  /** null **/
  rinkeby_sponsorVaults: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_sponsorVaults'], ConnextRinkebyTypes.Subscriptionrinkeby_sponsorVaultsArgs, MeshContext>,
  /** null **/
  rinkeby_originTransfer: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_originTransfer'], ConnextRinkebyTypes.Subscriptionrinkeby_originTransferArgs, MeshContext>,
  /** null **/
  rinkeby_originTransfers: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_originTransfers'], ConnextRinkebyTypes.Subscriptionrinkeby_originTransfersArgs, MeshContext>,
  /** null **/
  rinkeby_destinationTransfer: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_destinationTransfer'], ConnextRinkebyTypes.Subscriptionrinkeby_destinationTransferArgs, MeshContext>,
  /** null **/
  rinkeby_destinationTransfers: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_destinationTransfers'], ConnextRinkebyTypes.Subscriptionrinkeby_destinationTransfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  rinkeby__meta: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby__meta'], ConnextRinkebyTypes.Subscriptionrinkeby__metaArgs, MeshContext>
};
export type ConnextRinkebyContext = {
      ["Connext_Rinkeby"]: { Query: QueryConnextRinkebySdk, Mutation: MutationConnextRinkebySdk, Subscription: SubscriptionConnextRinkebySdk },
      
    };