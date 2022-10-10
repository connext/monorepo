
import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextTestGoerliTypes {
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
  testgoerli_BigDecimal: any;
  BigInt: bigint;
  testgoerli_Bytes: any;
};

export type testgoerli_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['testgoerli_Bytes']>;
  local: Scalars['testgoerli_Bytes'];
  adoptedAsset: Scalars['testgoerli_Bytes'];
  canonicalId: Scalars['testgoerli_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type testgoerli_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: testgoerli_Router;
  asset: testgoerli_Asset;
};

export type testgoerli_AssetBalance_filter = {
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
  router_?: InputMaybe<testgoerli_Router_filter>;
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
  asset_?: InputMaybe<testgoerli_Asset_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
};

export type testgoerli_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type testgoerli_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['testgoerli_Bytes']>;
  key_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  key_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  local?: InputMaybe<Scalars['testgoerli_Bytes']>;
  local_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  local_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  local_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  local_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  local_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  adoptedAsset?: InputMaybe<Scalars['testgoerli_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
};

export type testgoerli_Asset_orderBy =
  | 'id'
  | 'key'
  | 'local'
  | 'adoptedAsset'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'blockNumber';

export type testgoerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type testgoerli_Block_height = {
  hash?: InputMaybe<Scalars['testgoerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type testgoerli_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['testgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['testgoerli_Bytes']>;
  callData?: Maybe<Scalars['testgoerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  agent?: Maybe<Scalars['testgoerli_Bytes']>;
  recovery?: Maybe<Scalars['testgoerli_Bytes']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callback?: Maybe<Scalars['testgoerli_Bytes']>;
  callbackFee?: Maybe<Scalars['BigInt']>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  destinationMinOut?: Maybe<Scalars['BigInt']>;
  status?: Maybe<testgoerli_TransferStatus>;
  routers?: Maybe<Array<testgoerli_Router>>;
  originSender?: Maybe<Scalars['testgoerli_Bytes']>;
  transactingAsset?: Maybe<Scalars['testgoerli_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  localAsset?: Maybe<Scalars['testgoerli_Bytes']>;
  localAmount?: Maybe<Scalars['BigInt']>;
  sponsorVaultRelayerFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['testgoerli_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['testgoerli_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['testgoerli_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['testgoerli_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type testgoerli_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_Router_filter>;
};

export type testgoerli_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['testgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callData?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  agent?: InputMaybe<Scalars['testgoerli_Bytes']>;
  agent_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  agent_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  agent_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  agent_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  agent_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  recovery?: InputMaybe<Scalars['testgoerli_Bytes']>;
  recovery_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  recovery_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  recovery_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  recovery_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  recovery_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callback?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callback_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callback_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  callback_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  callback_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callback_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  status?: InputMaybe<testgoerli_TransferStatus>;
  status_not?: InputMaybe<testgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<testgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<testgoerli_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<testgoerli_Router_filter>;
  originSender?: InputMaybe<Scalars['testgoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAsset?: InputMaybe<Scalars['testgoerli_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  executedCaller?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  reconciledCaller?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
};

export type testgoerli_DestinationTransfer_orderBy =
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
export type testgoerli_OrderDirection =
  | 'asc'
  | 'desc';

export type testgoerli_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['testgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['testgoerli_Bytes']>;
  callData?: Maybe<Scalars['testgoerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  agent?: Maybe<Scalars['testgoerli_Bytes']>;
  recovery?: Maybe<Scalars['testgoerli_Bytes']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callback?: Maybe<Scalars['testgoerli_Bytes']>;
  callbackFee?: Maybe<Scalars['BigInt']>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  destinationMinOut?: Maybe<Scalars['BigInt']>;
  status?: Maybe<testgoerli_TransferStatus>;
  originMinOut?: Maybe<Scalars['BigInt']>;
  transactingAsset?: Maybe<Scalars['testgoerli_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  bridgedAsset?: Maybe<Scalars['testgoerli_Bytes']>;
  bridgedAmount?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['testgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['testgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type testgoerli_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['testgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callData?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  agent?: InputMaybe<Scalars['testgoerli_Bytes']>;
  agent_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  agent_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  agent_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  agent_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  agent_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  recovery?: InputMaybe<Scalars['testgoerli_Bytes']>;
  recovery_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  recovery_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  recovery_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  recovery_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  recovery_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callback?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callback_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callback_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  callback_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  callback_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  callback_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  status?: InputMaybe<testgoerli_TransferStatus>;
  status_not?: InputMaybe<testgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<testgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<testgoerli_TransferStatus>>;
  originMinOut?: InputMaybe<Scalars['BigInt']>;
  originMinOut_not?: InputMaybe<Scalars['BigInt']>;
  originMinOut_gt?: InputMaybe<Scalars['BigInt']>;
  originMinOut_lt?: InputMaybe<Scalars['BigInt']>;
  originMinOut_gte?: InputMaybe<Scalars['BigInt']>;
  originMinOut_lte?: InputMaybe<Scalars['BigInt']>;
  originMinOut_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originMinOut_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAsset?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAsset?: InputMaybe<Scalars['testgoerli_Bytes']>;
  bridgedAsset_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  bridgedAsset_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  bridgedAsset_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  bridgedAsset_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  bridgedAsset_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  bridgedAmount?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_not?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
};

export type testgoerli_OriginTransfer_orderBy =
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
  testgoerli_asset?: Maybe<testgoerli_Asset>;
  testgoerli_assets: Array<testgoerli_Asset>;
  testgoerli_assetBalance?: Maybe<testgoerli_AssetBalance>;
  testgoerli_assetBalances: Array<testgoerli_AssetBalance>;
  testgoerli_router?: Maybe<testgoerli_Router>;
  testgoerli_routers: Array<testgoerli_Router>;
  testgoerli_setting?: Maybe<testgoerli_Setting>;
  testgoerli_settings: Array<testgoerli_Setting>;
  testgoerli_relayer?: Maybe<testgoerli_Relayer>;
  testgoerli_relayers: Array<testgoerli_Relayer>;
  testgoerli_stableSwap?: Maybe<testgoerli_StableSwap>;
  testgoerli_stableSwaps: Array<testgoerli_StableSwap>;
  testgoerli_sponsorVault?: Maybe<testgoerli_SponsorVault>;
  testgoerli_sponsorVaults: Array<testgoerli_SponsorVault>;
  testgoerli_originTransfer?: Maybe<testgoerli_OriginTransfer>;
  testgoerli_originTransfers: Array<testgoerli_OriginTransfer>;
  testgoerli_destinationTransfer?: Maybe<testgoerli_DestinationTransfer>;
  testgoerli_destinationTransfers: Array<testgoerli_DestinationTransfer>;
  /** Access to subgraph metadata */
  testgoerli__meta?: Maybe<testgoerli__Meta_>;
};


export type Querytestgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_Asset_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_AssetBalance_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_Router_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_Setting_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_Relayer_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_StableSwap_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_sponsorVaultArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_sponsorVaultsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_SponsorVault_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_SponsorVault_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_OriginTransfer_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli__metaArgs = {
  block?: InputMaybe<testgoerli_Block_height>;
};

export type testgoerli_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['testgoerli_Bytes']>;
};

export type testgoerli_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['testgoerli_Bytes']>;
  relayer_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
};

export type testgoerli_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type testgoerli_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['testgoerli_Bytes']>;
  recipient?: Maybe<Scalars['testgoerli_Bytes']>;
  proposedOwner?: Maybe<Scalars['testgoerli_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<testgoerli_AssetBalance>;
};


export type testgoerli_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_AssetBalance_filter>;
};

export type testgoerli_Router_filter = {
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
  owner?: InputMaybe<Scalars['testgoerli_Bytes']>;
  owner_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  recipient?: InputMaybe<Scalars['testgoerli_Bytes']>;
  recipient_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['testgoerli_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<testgoerli_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
};

export type testgoerli_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type testgoerli_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['testgoerli_Bytes'];
};

export type testgoerli_Setting_filter = {
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
  caller?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
};

export type testgoerli_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type testgoerli_SponsorVault = {
  id: Scalars['ID'];
  sponsorVault: Scalars['testgoerli_Bytes'];
};

export type testgoerli_SponsorVault_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  sponsorVault?: InputMaybe<Scalars['testgoerli_Bytes']>;
  sponsorVault_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  sponsorVault_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  sponsorVault_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  sponsorVault_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  sponsorVault_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
};

export type testgoerli_SponsorVault_orderBy =
  | 'id'
  | 'sponsorVault';

export type testgoerli_StableSwap = {
  id: Scalars['ID'];
  canonicalId: Scalars['testgoerli_Bytes'];
  domain?: Maybe<Scalars['BigInt']>;
  swapPool: Scalars['testgoerli_Bytes'];
};

export type testgoerli_StableSwap_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  canonicalId?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['testgoerli_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
};

export type testgoerli_StableSwap_orderBy =
  | 'id'
  | 'canonicalId'
  | 'domain'
  | 'swapPool';

export type Subscription = {
  testgoerli_asset?: Maybe<testgoerli_Asset>;
  testgoerli_assets: Array<testgoerli_Asset>;
  testgoerli_assetBalance?: Maybe<testgoerli_AssetBalance>;
  testgoerli_assetBalances: Array<testgoerli_AssetBalance>;
  testgoerli_router?: Maybe<testgoerli_Router>;
  testgoerli_routers: Array<testgoerli_Router>;
  testgoerli_setting?: Maybe<testgoerli_Setting>;
  testgoerli_settings: Array<testgoerli_Setting>;
  testgoerli_relayer?: Maybe<testgoerli_Relayer>;
  testgoerli_relayers: Array<testgoerli_Relayer>;
  testgoerli_stableSwap?: Maybe<testgoerli_StableSwap>;
  testgoerli_stableSwaps: Array<testgoerli_StableSwap>;
  testgoerli_sponsorVault?: Maybe<testgoerli_SponsorVault>;
  testgoerli_sponsorVaults: Array<testgoerli_SponsorVault>;
  testgoerli_originTransfer?: Maybe<testgoerli_OriginTransfer>;
  testgoerli_originTransfers: Array<testgoerli_OriginTransfer>;
  testgoerli_destinationTransfer?: Maybe<testgoerli_DestinationTransfer>;
  testgoerli_destinationTransfers: Array<testgoerli_DestinationTransfer>;
  /** Access to subgraph metadata */
  testgoerli__meta?: Maybe<testgoerli__Meta_>;
};


export type Subscriptiontestgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_Asset_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_AssetBalance_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_Router_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_Setting_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_Relayer_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_StableSwap_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_sponsorVaultArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_sponsorVaultsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_SponsorVault_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_SponsorVault_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_OriginTransfer_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli__metaArgs = {
  block?: InputMaybe<testgoerli_Block_height>;
};

export type testgoerli_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type testgoerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['testgoerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type testgoerli__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: testgoerli__Block_;
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
export type QueryConnextTestGoerliSdk = {
  /** null **/
  testgoerli_asset: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_asset'], ConnextTestGoerliTypes.Querytestgoerli_assetArgs, MeshContext>,
  /** null **/
  testgoerli_assets: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_assets'], ConnextTestGoerliTypes.Querytestgoerli_assetsArgs, MeshContext>,
  /** null **/
  testgoerli_assetBalance: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_assetBalance'], ConnextTestGoerliTypes.Querytestgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  testgoerli_assetBalances: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_assetBalances'], ConnextTestGoerliTypes.Querytestgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  testgoerli_router: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_router'], ConnextTestGoerliTypes.Querytestgoerli_routerArgs, MeshContext>,
  /** null **/
  testgoerli_routers: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_routers'], ConnextTestGoerliTypes.Querytestgoerli_routersArgs, MeshContext>,
  /** null **/
  testgoerli_setting: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_setting'], ConnextTestGoerliTypes.Querytestgoerli_settingArgs, MeshContext>,
  /** null **/
  testgoerli_settings: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_settings'], ConnextTestGoerliTypes.Querytestgoerli_settingsArgs, MeshContext>,
  /** null **/
  testgoerli_relayer: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_relayer'], ConnextTestGoerliTypes.Querytestgoerli_relayerArgs, MeshContext>,
  /** null **/
  testgoerli_relayers: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_relayers'], ConnextTestGoerliTypes.Querytestgoerli_relayersArgs, MeshContext>,
  /** null **/
  testgoerli_stableSwap: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_stableSwap'], ConnextTestGoerliTypes.Querytestgoerli_stableSwapArgs, MeshContext>,
  /** null **/
  testgoerli_stableSwaps: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_stableSwaps'], ConnextTestGoerliTypes.Querytestgoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  testgoerli_sponsorVault: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_sponsorVault'], ConnextTestGoerliTypes.Querytestgoerli_sponsorVaultArgs, MeshContext>,
  /** null **/
  testgoerli_sponsorVaults: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_sponsorVaults'], ConnextTestGoerliTypes.Querytestgoerli_sponsorVaultsArgs, MeshContext>,
  /** null **/
  testgoerli_originTransfer: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_originTransfer'], ConnextTestGoerliTypes.Querytestgoerli_originTransferArgs, MeshContext>,
  /** null **/
  testgoerli_originTransfers: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_originTransfers'], ConnextTestGoerliTypes.Querytestgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  testgoerli_destinationTransfer: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_destinationTransfer'], ConnextTestGoerliTypes.Querytestgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  testgoerli_destinationTransfers: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_destinationTransfers'], ConnextTestGoerliTypes.Querytestgoerli_destinationTransfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  testgoerli__meta: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli__meta'], ConnextTestGoerliTypes.Querytestgoerli__metaArgs, MeshContext>
};

export type MutationConnextTestGoerliSdk = {

};

export type SubscriptionConnextTestGoerliSdk = {
  /** null **/
  testgoerli_asset: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_asset'], ConnextTestGoerliTypes.Subscriptiontestgoerli_assetArgs, MeshContext>,
  /** null **/
  testgoerli_assets: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_assets'], ConnextTestGoerliTypes.Subscriptiontestgoerli_assetsArgs, MeshContext>,
  /** null **/
  testgoerli_assetBalance: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_assetBalance'], ConnextTestGoerliTypes.Subscriptiontestgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  testgoerli_assetBalances: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_assetBalances'], ConnextTestGoerliTypes.Subscriptiontestgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  testgoerli_router: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_router'], ConnextTestGoerliTypes.Subscriptiontestgoerli_routerArgs, MeshContext>,
  /** null **/
  testgoerli_routers: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_routers'], ConnextTestGoerliTypes.Subscriptiontestgoerli_routersArgs, MeshContext>,
  /** null **/
  testgoerli_setting: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_setting'], ConnextTestGoerliTypes.Subscriptiontestgoerli_settingArgs, MeshContext>,
  /** null **/
  testgoerli_settings: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_settings'], ConnextTestGoerliTypes.Subscriptiontestgoerli_settingsArgs, MeshContext>,
  /** null **/
  testgoerli_relayer: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_relayer'], ConnextTestGoerliTypes.Subscriptiontestgoerli_relayerArgs, MeshContext>,
  /** null **/
  testgoerli_relayers: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_relayers'], ConnextTestGoerliTypes.Subscriptiontestgoerli_relayersArgs, MeshContext>,
  /** null **/
  testgoerli_stableSwap: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_stableSwap'], ConnextTestGoerliTypes.Subscriptiontestgoerli_stableSwapArgs, MeshContext>,
  /** null **/
  testgoerli_stableSwaps: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_stableSwaps'], ConnextTestGoerliTypes.Subscriptiontestgoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  testgoerli_sponsorVault: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_sponsorVault'], ConnextTestGoerliTypes.Subscriptiontestgoerli_sponsorVaultArgs, MeshContext>,
  /** null **/
  testgoerli_sponsorVaults: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_sponsorVaults'], ConnextTestGoerliTypes.Subscriptiontestgoerli_sponsorVaultsArgs, MeshContext>,
  /** null **/
  testgoerli_originTransfer: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_originTransfer'], ConnextTestGoerliTypes.Subscriptiontestgoerli_originTransferArgs, MeshContext>,
  /** null **/
  testgoerli_originTransfers: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_originTransfers'], ConnextTestGoerliTypes.Subscriptiontestgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  testgoerli_destinationTransfer: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_destinationTransfer'], ConnextTestGoerliTypes.Subscriptiontestgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  testgoerli_destinationTransfers: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_destinationTransfers'], ConnextTestGoerliTypes.Subscriptiontestgoerli_destinationTransfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  testgoerli__meta: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli__meta'], ConnextTestGoerliTypes.Subscriptiontestgoerli__metaArgs, MeshContext>
};
export type ConnextTestGoerliContext = {
      ["Connext_Test_Goerli"]: { Query: QueryConnextTestGoerliSdk, Mutation: MutationConnextTestGoerliSdk, Subscription: SubscriptionConnextTestGoerliSdk },
      
    };