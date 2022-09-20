
import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextMumbaiTypes {
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
  mumbai_BigDecimal: any;
  BigInt: bigint;
  mumbai_Bytes: any;
};

export type mumbai_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['mumbai_Bytes'];
};

export type mumbai_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_AggregateRoot_orderBy =
  | 'id'
  | 'root';

export type mumbai_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['mumbai_Bytes']>;
  local: Scalars['mumbai_Bytes'];
  adoptedAsset: Scalars['mumbai_Bytes'];
  canonicalId: Scalars['mumbai_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type mumbai_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: mumbai_Router;
  asset: mumbai_Asset;
};

export type mumbai_AssetBalance_filter = {
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
  router_?: InputMaybe<mumbai_Router_filter>;
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
  asset_?: InputMaybe<mumbai_Asset_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type mumbai_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['mumbai_Bytes']>;
  key_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  key_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  local?: InputMaybe<Scalars['mumbai_Bytes']>;
  local_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  local_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  local_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  local_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  local_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  adoptedAsset?: InputMaybe<Scalars['mumbai_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_Asset_orderBy =
  | 'id'
  | 'key'
  | 'local'
  | 'adoptedAsset'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'blockNumber';

export type mumbai_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type mumbai_Block_height = {
  hash?: InputMaybe<Scalars['mumbai_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type mumbai_DestinationMessage = {
  id: Scalars['ID'];
  leaf?: Maybe<Scalars['mumbai_Bytes']>;
  processed?: Maybe<Scalars['Boolean']>;
  returnData?: Maybe<Scalars['mumbai_Bytes']>;
  transactionHash?: Maybe<Scalars['mumbai_Bytes']>;
};

export type mumbai_DestinationMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  leaf?: InputMaybe<Scalars['mumbai_Bytes']>;
  leaf_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  processed?: InputMaybe<Scalars['Boolean']>;
  processed_not?: InputMaybe<Scalars['Boolean']>;
  processed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  processed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  returnData?: InputMaybe<Scalars['mumbai_Bytes']>;
  returnData_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  returnData_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  returnData_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  returnData_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  returnData_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_DestinationMessage_orderBy =
  | 'id'
  | 'leaf'
  | 'processed'
  | 'returnData'
  | 'transactionHash';

export type mumbai_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['mumbai_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['mumbai_Bytes']>;
  callData?: Maybe<Scalars['mumbai_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  agent?: Maybe<Scalars['mumbai_Bytes']>;
  recovery?: Maybe<Scalars['mumbai_Bytes']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callback?: Maybe<Scalars['mumbai_Bytes']>;
  callbackFee?: Maybe<Scalars['BigInt']>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  destinationMinOut?: Maybe<Scalars['BigInt']>;
  status?: Maybe<mumbai_TransferStatus>;
  routers?: Maybe<Array<mumbai_Router>>;
  originSender?: Maybe<Scalars['mumbai_Bytes']>;
  transactingAsset?: Maybe<Scalars['mumbai_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  localAsset?: Maybe<Scalars['mumbai_Bytes']>;
  localAmount?: Maybe<Scalars['BigInt']>;
  sponsorVaultRelayerFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['mumbai_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['mumbai_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['mumbai_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['mumbai_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type mumbai_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_Router_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_Router_filter>;
};

export type mumbai_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['mumbai_Bytes']>;
  to_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  to_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  callData?: InputMaybe<Scalars['mumbai_Bytes']>;
  callData_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  agent?: InputMaybe<Scalars['mumbai_Bytes']>;
  agent_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  agent_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  agent_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  agent_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  agent_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  recovery?: InputMaybe<Scalars['mumbai_Bytes']>;
  recovery_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  recovery_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  recovery_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  recovery_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  recovery_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callback?: InputMaybe<Scalars['mumbai_Bytes']>;
  callback_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  callback_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  callback_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  callback_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  callback_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  status?: InputMaybe<mumbai_TransferStatus>;
  status_not?: InputMaybe<mumbai_TransferStatus>;
  status_in?: InputMaybe<Array<mumbai_TransferStatus>>;
  status_not_in?: InputMaybe<Array<mumbai_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<mumbai_Router_filter>;
  originSender?: InputMaybe<Scalars['mumbai_Bytes']>;
  originSender_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAsset?: InputMaybe<Scalars['mumbai_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  executedCaller?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  reconciledCaller?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_DestinationTransfer_orderBy =
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
export type mumbai_OrderDirection =
  | 'asc'
  | 'desc';

export type mumbai_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['mumbai_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['mumbai_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['mumbai_Bytes']>;
  message?: Maybe<Scalars['mumbai_Bytes']>;
  transactionHash?: Maybe<Scalars['mumbai_Bytes']>;
};

export type mumbai_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['mumbai_Bytes']>;
  leaf_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  root?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  root_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  message?: InputMaybe<Scalars['mumbai_Bytes']>;
  message_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  message_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_OriginMessage_orderBy =
  | 'id'
  | 'transferId'
  | 'destinationDomain'
  | 'leaf'
  | 'index'
  | 'root'
  | 'message'
  | 'transactionHash';

export type mumbai_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['mumbai_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['mumbai_Bytes']>;
  callData?: Maybe<Scalars['mumbai_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  agent?: Maybe<Scalars['mumbai_Bytes']>;
  recovery?: Maybe<Scalars['mumbai_Bytes']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callback?: Maybe<Scalars['mumbai_Bytes']>;
  callbackFee?: Maybe<Scalars['BigInt']>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  destinationMinOut?: Maybe<Scalars['BigInt']>;
  status?: Maybe<mumbai_TransferStatus>;
  originMinOut?: Maybe<Scalars['BigInt']>;
  transactingAsset?: Maybe<Scalars['mumbai_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  bridgedAsset?: Maybe<Scalars['mumbai_Bytes']>;
  bridgedAmount?: Maybe<Scalars['BigInt']>;
  message?: Maybe<mumbai_OriginMessage>;
  caller?: Maybe<Scalars['mumbai_Bytes']>;
  transactionHash?: Maybe<Scalars['mumbai_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type mumbai_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['mumbai_Bytes']>;
  to_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  to_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  callData?: InputMaybe<Scalars['mumbai_Bytes']>;
  callData_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  agent?: InputMaybe<Scalars['mumbai_Bytes']>;
  agent_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  agent_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  agent_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  agent_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  agent_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  recovery?: InputMaybe<Scalars['mumbai_Bytes']>;
  recovery_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  recovery_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  recovery_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  recovery_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  recovery_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callback?: InputMaybe<Scalars['mumbai_Bytes']>;
  callback_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  callback_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  callback_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  callback_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  callback_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  status?: InputMaybe<mumbai_TransferStatus>;
  status_not?: InputMaybe<mumbai_TransferStatus>;
  status_in?: InputMaybe<Array<mumbai_TransferStatus>>;
  status_not_in?: InputMaybe<Array<mumbai_TransferStatus>>;
  originMinOut?: InputMaybe<Scalars['BigInt']>;
  originMinOut_not?: InputMaybe<Scalars['BigInt']>;
  originMinOut_gt?: InputMaybe<Scalars['BigInt']>;
  originMinOut_lt?: InputMaybe<Scalars['BigInt']>;
  originMinOut_gte?: InputMaybe<Scalars['BigInt']>;
  originMinOut_lte?: InputMaybe<Scalars['BigInt']>;
  originMinOut_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originMinOut_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAsset?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAsset?: InputMaybe<Scalars['mumbai_Bytes']>;
  bridgedAsset_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  bridgedAsset_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  bridgedAsset_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  bridgedAsset_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  bridgedAsset_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  bridgedAmount?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_not?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  message_?: InputMaybe<mumbai_OriginMessage_filter>;
  caller?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_OriginTransfer_orderBy =
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
  | 'message'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type Query = {
  mumbai_asset?: Maybe<mumbai_Asset>;
  mumbai_assets: Array<mumbai_Asset>;
  mumbai_assetBalance?: Maybe<mumbai_AssetBalance>;
  mumbai_assetBalances: Array<mumbai_AssetBalance>;
  mumbai_router?: Maybe<mumbai_Router>;
  mumbai_routers: Array<mumbai_Router>;
  mumbai_setting?: Maybe<mumbai_Setting>;
  mumbai_settings: Array<mumbai_Setting>;
  mumbai_relayer?: Maybe<mumbai_Relayer>;
  mumbai_relayers: Array<mumbai_Relayer>;
  mumbai_stableSwap?: Maybe<mumbai_StableSwap>;
  mumbai_stableSwaps: Array<mumbai_StableSwap>;
  mumbai_sponsorVault?: Maybe<mumbai_SponsorVault>;
  mumbai_sponsorVaults: Array<mumbai_SponsorVault>;
  mumbai_originTransfer?: Maybe<mumbai_OriginTransfer>;
  mumbai_originTransfers: Array<mumbai_OriginTransfer>;
  mumbai_destinationTransfer?: Maybe<mumbai_DestinationTransfer>;
  mumbai_destinationTransfers: Array<mumbai_DestinationTransfer>;
  mumbai_originMessage?: Maybe<mumbai_OriginMessage>;
  mumbai_originMessages: Array<mumbai_OriginMessage>;
  mumbai_destinationMessage?: Maybe<mumbai_DestinationMessage>;
  mumbai_destinationMessages: Array<mumbai_DestinationMessage>;
  mumbai_aggregateRoot?: Maybe<mumbai_AggregateRoot>;
  mumbai_aggregateRoots: Array<mumbai_AggregateRoot>;
  mumbai_rootMessage?: Maybe<mumbai_RootMessage>;
  mumbai_rootMessages: Array<mumbai_RootMessage>;
  /** Access to subgraph metadata */
  mumbai__meta?: Maybe<mumbai__Meta_>;
};


export type Querymumbai_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_Asset_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_Asset_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_AssetBalance_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_Router_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_Router_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_Setting_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_Setting_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_Relayer_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_Relayer_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_StableSwap_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_StableSwap_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_sponsorVaultArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_sponsorVaultsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_SponsorVault_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_SponsorVault_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_OriginTransfer_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_DestinationTransfer_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_OriginMessage_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_DestinationMessage_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_AggregateRoot_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_rootMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_rootMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_RootMessage_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_RootMessage_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai__metaArgs = {
  block?: InputMaybe<mumbai_Block_height>;
};

export type mumbai_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['mumbai_Bytes']>;
};

export type mumbai_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['mumbai_Bytes']>;
  relayer_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type mumbai_RootMessage = {
  id: Scalars['ID'];
  data?: Maybe<Scalars['mumbai_Bytes']>;
  caller?: Maybe<Scalars['mumbai_Bytes']>;
  transactionHash?: Maybe<Scalars['mumbai_Bytes']>;
  logIndex?: Maybe<Scalars['BigInt']>;
  transactionLogIndex?: Maybe<Scalars['BigInt']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type mumbai_RootMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  data?: InputMaybe<Scalars['mumbai_Bytes']>;
  data_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  data_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  data_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  data_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  data_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  logIndex?: InputMaybe<Scalars['BigInt']>;
  logIndex_not?: InputMaybe<Scalars['BigInt']>;
  logIndex_gt?: InputMaybe<Scalars['BigInt']>;
  logIndex_lt?: InputMaybe<Scalars['BigInt']>;
  logIndex_gte?: InputMaybe<Scalars['BigInt']>;
  logIndex_lte?: InputMaybe<Scalars['BigInt']>;
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionLogIndex?: InputMaybe<Scalars['BigInt']>;
  transactionLogIndex_not?: InputMaybe<Scalars['BigInt']>;
  transactionLogIndex_gt?: InputMaybe<Scalars['BigInt']>;
  transactionLogIndex_lt?: InputMaybe<Scalars['BigInt']>;
  transactionLogIndex_gte?: InputMaybe<Scalars['BigInt']>;
  transactionLogIndex_lte?: InputMaybe<Scalars['BigInt']>;
  transactionLogIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionLogIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_RootMessage_orderBy =
  | 'id'
  | 'data'
  | 'caller'
  | 'transactionHash'
  | 'logIndex'
  | 'transactionLogIndex'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type mumbai_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['mumbai_Bytes']>;
  recipient?: Maybe<Scalars['mumbai_Bytes']>;
  proposedOwner?: Maybe<Scalars['mumbai_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<mumbai_AssetBalance>;
};


export type mumbai_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_AssetBalance_filter>;
};

export type mumbai_Router_filter = {
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
  owner?: InputMaybe<Scalars['mumbai_Bytes']>;
  owner_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  recipient?: InputMaybe<Scalars['mumbai_Bytes']>;
  recipient_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['mumbai_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<mumbai_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type mumbai_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['mumbai_Bytes'];
};

export type mumbai_Setting_filter = {
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
  caller?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type mumbai_SponsorVault = {
  id: Scalars['ID'];
  sponsorVault: Scalars['mumbai_Bytes'];
};

export type mumbai_SponsorVault_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  sponsorVault?: InputMaybe<Scalars['mumbai_Bytes']>;
  sponsorVault_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  sponsorVault_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  sponsorVault_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  sponsorVault_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  sponsorVault_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_SponsorVault_orderBy =
  | 'id'
  | 'sponsorVault';

export type mumbai_StableSwap = {
  id: Scalars['ID'];
  canonicalId: Scalars['mumbai_Bytes'];
  domain?: Maybe<Scalars['BigInt']>;
  swapPool: Scalars['mumbai_Bytes'];
};

export type mumbai_StableSwap_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  canonicalId?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['mumbai_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_StableSwap_orderBy =
  | 'id'
  | 'canonicalId'
  | 'domain'
  | 'swapPool';

export type Subscription = {
  mumbai_asset?: Maybe<mumbai_Asset>;
  mumbai_assets: Array<mumbai_Asset>;
  mumbai_assetBalance?: Maybe<mumbai_AssetBalance>;
  mumbai_assetBalances: Array<mumbai_AssetBalance>;
  mumbai_router?: Maybe<mumbai_Router>;
  mumbai_routers: Array<mumbai_Router>;
  mumbai_setting?: Maybe<mumbai_Setting>;
  mumbai_settings: Array<mumbai_Setting>;
  mumbai_relayer?: Maybe<mumbai_Relayer>;
  mumbai_relayers: Array<mumbai_Relayer>;
  mumbai_stableSwap?: Maybe<mumbai_StableSwap>;
  mumbai_stableSwaps: Array<mumbai_StableSwap>;
  mumbai_sponsorVault?: Maybe<mumbai_SponsorVault>;
  mumbai_sponsorVaults: Array<mumbai_SponsorVault>;
  mumbai_originTransfer?: Maybe<mumbai_OriginTransfer>;
  mumbai_originTransfers: Array<mumbai_OriginTransfer>;
  mumbai_destinationTransfer?: Maybe<mumbai_DestinationTransfer>;
  mumbai_destinationTransfers: Array<mumbai_DestinationTransfer>;
  mumbai_originMessage?: Maybe<mumbai_OriginMessage>;
  mumbai_originMessages: Array<mumbai_OriginMessage>;
  mumbai_destinationMessage?: Maybe<mumbai_DestinationMessage>;
  mumbai_destinationMessages: Array<mumbai_DestinationMessage>;
  mumbai_aggregateRoot?: Maybe<mumbai_AggregateRoot>;
  mumbai_aggregateRoots: Array<mumbai_AggregateRoot>;
  mumbai_rootMessage?: Maybe<mumbai_RootMessage>;
  mumbai_rootMessages: Array<mumbai_RootMessage>;
  /** Access to subgraph metadata */
  mumbai__meta?: Maybe<mumbai__Meta_>;
};


export type Subscriptionmumbai_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_Asset_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_Asset_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_AssetBalance_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_Router_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_Router_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_Setting_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_Setting_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_Relayer_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_Relayer_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_StableSwap_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_StableSwap_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_sponsorVaultArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_sponsorVaultsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_SponsorVault_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_SponsorVault_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_OriginTransfer_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_DestinationTransfer_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_OriginMessage_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_DestinationMessage_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_AggregateRoot_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_rootMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_rootMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_RootMessage_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_RootMessage_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai__metaArgs = {
  block?: InputMaybe<mumbai_Block_height>;
};

export type mumbai_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type mumbai__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['mumbai_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type mumbai__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: mumbai__Block_;
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
export type QueryConnextMumbaiSdk = {
  /** null **/
  mumbai_asset: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_asset'], ConnextMumbaiTypes.Querymumbai_assetArgs, MeshContext>,
  /** null **/
  mumbai_assets: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_assets'], ConnextMumbaiTypes.Querymumbai_assetsArgs, MeshContext>,
  /** null **/
  mumbai_assetBalance: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_assetBalance'], ConnextMumbaiTypes.Querymumbai_assetBalanceArgs, MeshContext>,
  /** null **/
  mumbai_assetBalances: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_assetBalances'], ConnextMumbaiTypes.Querymumbai_assetBalancesArgs, MeshContext>,
  /** null **/
  mumbai_router: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_router'], ConnextMumbaiTypes.Querymumbai_routerArgs, MeshContext>,
  /** null **/
  mumbai_routers: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_routers'], ConnextMumbaiTypes.Querymumbai_routersArgs, MeshContext>,
  /** null **/
  mumbai_setting: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_setting'], ConnextMumbaiTypes.Querymumbai_settingArgs, MeshContext>,
  /** null **/
  mumbai_settings: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_settings'], ConnextMumbaiTypes.Querymumbai_settingsArgs, MeshContext>,
  /** null **/
  mumbai_relayer: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_relayer'], ConnextMumbaiTypes.Querymumbai_relayerArgs, MeshContext>,
  /** null **/
  mumbai_relayers: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_relayers'], ConnextMumbaiTypes.Querymumbai_relayersArgs, MeshContext>,
  /** null **/
  mumbai_stableSwap: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_stableSwap'], ConnextMumbaiTypes.Querymumbai_stableSwapArgs, MeshContext>,
  /** null **/
  mumbai_stableSwaps: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_stableSwaps'], ConnextMumbaiTypes.Querymumbai_stableSwapsArgs, MeshContext>,
  /** null **/
  mumbai_sponsorVault: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_sponsorVault'], ConnextMumbaiTypes.Querymumbai_sponsorVaultArgs, MeshContext>,
  /** null **/
  mumbai_sponsorVaults: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_sponsorVaults'], ConnextMumbaiTypes.Querymumbai_sponsorVaultsArgs, MeshContext>,
  /** null **/
  mumbai_originTransfer: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_originTransfer'], ConnextMumbaiTypes.Querymumbai_originTransferArgs, MeshContext>,
  /** null **/
  mumbai_originTransfers: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_originTransfers'], ConnextMumbaiTypes.Querymumbai_originTransfersArgs, MeshContext>,
  /** null **/
  mumbai_destinationTransfer: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_destinationTransfer'], ConnextMumbaiTypes.Querymumbai_destinationTransferArgs, MeshContext>,
  /** null **/
  mumbai_destinationTransfers: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_destinationTransfers'], ConnextMumbaiTypes.Querymumbai_destinationTransfersArgs, MeshContext>,
  /** null **/
  mumbai_originMessage: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_originMessage'], ConnextMumbaiTypes.Querymumbai_originMessageArgs, MeshContext>,
  /** null **/
  mumbai_originMessages: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_originMessages'], ConnextMumbaiTypes.Querymumbai_originMessagesArgs, MeshContext>,
  /** null **/
  mumbai_destinationMessage: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_destinationMessage'], ConnextMumbaiTypes.Querymumbai_destinationMessageArgs, MeshContext>,
  /** null **/
  mumbai_destinationMessages: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_destinationMessages'], ConnextMumbaiTypes.Querymumbai_destinationMessagesArgs, MeshContext>,
  /** null **/
  mumbai_aggregateRoot: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_aggregateRoot'], ConnextMumbaiTypes.Querymumbai_aggregateRootArgs, MeshContext>,
  /** null **/
  mumbai_aggregateRoots: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_aggregateRoots'], ConnextMumbaiTypes.Querymumbai_aggregateRootsArgs, MeshContext>,
  /** null **/
  mumbai_rootMessage: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_rootMessage'], ConnextMumbaiTypes.Querymumbai_rootMessageArgs, MeshContext>,
  /** null **/
  mumbai_rootMessages: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai_rootMessages'], ConnextMumbaiTypes.Querymumbai_rootMessagesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  mumbai__meta: InContextSdkMethod<ConnextMumbaiTypes.Query['mumbai__meta'], ConnextMumbaiTypes.Querymumbai__metaArgs, MeshContext>
};

export type MutationConnextMumbaiSdk = {

};

export type SubscriptionConnextMumbaiSdk = {
  /** null **/
  mumbai_asset: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_asset'], ConnextMumbaiTypes.Subscriptionmumbai_assetArgs, MeshContext>,
  /** null **/
  mumbai_assets: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_assets'], ConnextMumbaiTypes.Subscriptionmumbai_assetsArgs, MeshContext>,
  /** null **/
  mumbai_assetBalance: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_assetBalance'], ConnextMumbaiTypes.Subscriptionmumbai_assetBalanceArgs, MeshContext>,
  /** null **/
  mumbai_assetBalances: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_assetBalances'], ConnextMumbaiTypes.Subscriptionmumbai_assetBalancesArgs, MeshContext>,
  /** null **/
  mumbai_router: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_router'], ConnextMumbaiTypes.Subscriptionmumbai_routerArgs, MeshContext>,
  /** null **/
  mumbai_routers: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_routers'], ConnextMumbaiTypes.Subscriptionmumbai_routersArgs, MeshContext>,
  /** null **/
  mumbai_setting: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_setting'], ConnextMumbaiTypes.Subscriptionmumbai_settingArgs, MeshContext>,
  /** null **/
  mumbai_settings: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_settings'], ConnextMumbaiTypes.Subscriptionmumbai_settingsArgs, MeshContext>,
  /** null **/
  mumbai_relayer: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_relayer'], ConnextMumbaiTypes.Subscriptionmumbai_relayerArgs, MeshContext>,
  /** null **/
  mumbai_relayers: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_relayers'], ConnextMumbaiTypes.Subscriptionmumbai_relayersArgs, MeshContext>,
  /** null **/
  mumbai_stableSwap: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_stableSwap'], ConnextMumbaiTypes.Subscriptionmumbai_stableSwapArgs, MeshContext>,
  /** null **/
  mumbai_stableSwaps: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_stableSwaps'], ConnextMumbaiTypes.Subscriptionmumbai_stableSwapsArgs, MeshContext>,
  /** null **/
  mumbai_sponsorVault: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_sponsorVault'], ConnextMumbaiTypes.Subscriptionmumbai_sponsorVaultArgs, MeshContext>,
  /** null **/
  mumbai_sponsorVaults: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_sponsorVaults'], ConnextMumbaiTypes.Subscriptionmumbai_sponsorVaultsArgs, MeshContext>,
  /** null **/
  mumbai_originTransfer: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_originTransfer'], ConnextMumbaiTypes.Subscriptionmumbai_originTransferArgs, MeshContext>,
  /** null **/
  mumbai_originTransfers: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_originTransfers'], ConnextMumbaiTypes.Subscriptionmumbai_originTransfersArgs, MeshContext>,
  /** null **/
  mumbai_destinationTransfer: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_destinationTransfer'], ConnextMumbaiTypes.Subscriptionmumbai_destinationTransferArgs, MeshContext>,
  /** null **/
  mumbai_destinationTransfers: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_destinationTransfers'], ConnextMumbaiTypes.Subscriptionmumbai_destinationTransfersArgs, MeshContext>,
  /** null **/
  mumbai_originMessage: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_originMessage'], ConnextMumbaiTypes.Subscriptionmumbai_originMessageArgs, MeshContext>,
  /** null **/
  mumbai_originMessages: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_originMessages'], ConnextMumbaiTypes.Subscriptionmumbai_originMessagesArgs, MeshContext>,
  /** null **/
  mumbai_destinationMessage: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_destinationMessage'], ConnextMumbaiTypes.Subscriptionmumbai_destinationMessageArgs, MeshContext>,
  /** null **/
  mumbai_destinationMessages: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_destinationMessages'], ConnextMumbaiTypes.Subscriptionmumbai_destinationMessagesArgs, MeshContext>,
  /** null **/
  mumbai_aggregateRoot: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_aggregateRoot'], ConnextMumbaiTypes.Subscriptionmumbai_aggregateRootArgs, MeshContext>,
  /** null **/
  mumbai_aggregateRoots: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_aggregateRoots'], ConnextMumbaiTypes.Subscriptionmumbai_aggregateRootsArgs, MeshContext>,
  /** null **/
  mumbai_rootMessage: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_rootMessage'], ConnextMumbaiTypes.Subscriptionmumbai_rootMessageArgs, MeshContext>,
  /** null **/
  mumbai_rootMessages: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai_rootMessages'], ConnextMumbaiTypes.Subscriptionmumbai_rootMessagesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  mumbai__meta: InContextSdkMethod<ConnextMumbaiTypes.Subscription['mumbai__meta'], ConnextMumbaiTypes.Subscriptionmumbai__metaArgs, MeshContext>
};
export type ConnextMumbaiContext = {
      ["Connext_Mumbai"]: { Query: QueryConnextMumbaiSdk, Mutation: MutationConnextMumbaiSdk, Subscription: SubscriptionConnextMumbaiSdk },
      
    };