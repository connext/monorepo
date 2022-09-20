
import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextGoerliTypes {
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
  goerli_BigDecimal: any;
  BigInt: bigint;
  goerli_Bytes: any;
};

export type goerli_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['goerli_Bytes'];
};

export type goerli_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['goerli_Bytes']>;
  root_not?: InputMaybe<Scalars['goerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_AggregateRoot_orderBy =
  | 'id'
  | 'root';

export type goerli_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['goerli_Bytes']>;
  local: Scalars['goerli_Bytes'];
  adoptedAsset: Scalars['goerli_Bytes'];
  canonicalId: Scalars['goerli_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type goerli_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: goerli_Router;
  asset: goerli_Asset;
};

export type goerli_AssetBalance_filter = {
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
  router_?: InputMaybe<goerli_Router_filter>;
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
  asset_?: InputMaybe<goerli_Asset_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type goerli_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['goerli_Bytes']>;
  key_not?: InputMaybe<Scalars['goerli_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  key_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  local?: InputMaybe<Scalars['goerli_Bytes']>;
  local_not?: InputMaybe<Scalars['goerli_Bytes']>;
  local_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  local_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  local_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  local_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  adoptedAsset?: InputMaybe<Scalars['goerli_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['goerli_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_Asset_orderBy =
  | 'id'
  | 'key'
  | 'local'
  | 'adoptedAsset'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'blockNumber';

export type goerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type goerli_Block_height = {
  hash?: InputMaybe<Scalars['goerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type goerli_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['goerli_Bytes'];
  rootManager: Scalars['goerli_Bytes'];
  mirrorConnector: Scalars['goerli_Bytes'];
};

export type goerli_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type goerli_DestinationMessage = {
  id: Scalars['ID'];
  leaf?: Maybe<Scalars['goerli_Bytes']>;
  processed?: Maybe<Scalars['Boolean']>;
  returnData?: Maybe<Scalars['goerli_Bytes']>;
  transactionHash?: Maybe<Scalars['goerli_Bytes']>;
};

export type goerli_DestinationMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  leaf?: InputMaybe<Scalars['goerli_Bytes']>;
  leaf_not?: InputMaybe<Scalars['goerli_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  processed?: InputMaybe<Scalars['Boolean']>;
  processed_not?: InputMaybe<Scalars['Boolean']>;
  processed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  processed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  returnData?: InputMaybe<Scalars['goerli_Bytes']>;
  returnData_not?: InputMaybe<Scalars['goerli_Bytes']>;
  returnData_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  returnData_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  returnData_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  returnData_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_DestinationMessage_orderBy =
  | 'id'
  | 'leaf'
  | 'processed'
  | 'returnData'
  | 'transactionHash';

export type goerli_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['goerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['goerli_Bytes']>;
  callData?: Maybe<Scalars['goerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  agent?: Maybe<Scalars['goerli_Bytes']>;
  recovery?: Maybe<Scalars['goerli_Bytes']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callback?: Maybe<Scalars['goerli_Bytes']>;
  callbackFee?: Maybe<Scalars['BigInt']>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  destinationMinOut?: Maybe<Scalars['BigInt']>;
  status?: Maybe<goerli_TransferStatus>;
  routers?: Maybe<Array<goerli_Router>>;
  originSender?: Maybe<Scalars['goerli_Bytes']>;
  transactingAsset?: Maybe<Scalars['goerli_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  localAsset?: Maybe<Scalars['goerli_Bytes']>;
  localAmount?: Maybe<Scalars['BigInt']>;
  sponsorVaultRelayerFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['goerli_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['goerli_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['goerli_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type goerli_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Router_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Router_filter>;
};

export type goerli_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['goerli_Bytes']>;
  to_not?: InputMaybe<Scalars['goerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  callData?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  agent?: InputMaybe<Scalars['goerli_Bytes']>;
  agent_not?: InputMaybe<Scalars['goerli_Bytes']>;
  agent_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  agent_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  agent_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  agent_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  recovery?: InputMaybe<Scalars['goerli_Bytes']>;
  recovery_not?: InputMaybe<Scalars['goerli_Bytes']>;
  recovery_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  recovery_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  recovery_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  recovery_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callback?: InputMaybe<Scalars['goerli_Bytes']>;
  callback_not?: InputMaybe<Scalars['goerli_Bytes']>;
  callback_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  callback_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  callback_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  callback_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  status?: InputMaybe<goerli_TransferStatus>;
  status_not?: InputMaybe<goerli_TransferStatus>;
  status_in?: InputMaybe<Array<goerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<goerli_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<goerli_Router_filter>;
  originSender?: InputMaybe<Scalars['goerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['goerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAsset?: InputMaybe<Scalars['goerli_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['goerli_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  executedCaller?: InputMaybe<Scalars['goerli_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['goerli_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  reconciledCaller?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_DestinationTransfer_orderBy =
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
export type goerli_OrderDirection =
  | 'asc'
  | 'desc';

export type goerli_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['goerli_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['goerli_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['goerli_Bytes']>;
  message?: Maybe<Scalars['goerli_Bytes']>;
  transactionHash?: Maybe<Scalars['goerli_Bytes']>;
};

export type goerli_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['goerli_Bytes']>;
  leaf_not?: InputMaybe<Scalars['goerli_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  root?: InputMaybe<Scalars['goerli_Bytes']>;
  root_not?: InputMaybe<Scalars['goerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  message?: InputMaybe<Scalars['goerli_Bytes']>;
  message_not?: InputMaybe<Scalars['goerli_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  message_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_OriginMessage_orderBy =
  | 'id'
  | 'transferId'
  | 'destinationDomain'
  | 'leaf'
  | 'index'
  | 'root'
  | 'message'
  | 'transactionHash';

export type goerli_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['goerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['goerli_Bytes']>;
  callData?: Maybe<Scalars['goerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  agent?: Maybe<Scalars['goerli_Bytes']>;
  recovery?: Maybe<Scalars['goerli_Bytes']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callback?: Maybe<Scalars['goerli_Bytes']>;
  callbackFee?: Maybe<Scalars['BigInt']>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  destinationMinOut?: Maybe<Scalars['BigInt']>;
  status?: Maybe<goerli_TransferStatus>;
  originMinOut?: Maybe<Scalars['BigInt']>;
  transactingAsset?: Maybe<Scalars['goerli_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  bridgedAsset?: Maybe<Scalars['goerli_Bytes']>;
  bridgedAmount?: Maybe<Scalars['BigInt']>;
  message?: Maybe<goerli_OriginMessage>;
  caller?: Maybe<Scalars['goerli_Bytes']>;
  transactionHash?: Maybe<Scalars['goerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type goerli_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['goerli_Bytes']>;
  to_not?: InputMaybe<Scalars['goerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  callData?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  agent?: InputMaybe<Scalars['goerli_Bytes']>;
  agent_not?: InputMaybe<Scalars['goerli_Bytes']>;
  agent_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  agent_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  agent_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  agent_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  recovery?: InputMaybe<Scalars['goerli_Bytes']>;
  recovery_not?: InputMaybe<Scalars['goerli_Bytes']>;
  recovery_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  recovery_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  recovery_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  recovery_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callback?: InputMaybe<Scalars['goerli_Bytes']>;
  callback_not?: InputMaybe<Scalars['goerli_Bytes']>;
  callback_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  callback_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  callback_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  callback_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  status?: InputMaybe<goerli_TransferStatus>;
  status_not?: InputMaybe<goerli_TransferStatus>;
  status_in?: InputMaybe<Array<goerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<goerli_TransferStatus>>;
  originMinOut?: InputMaybe<Scalars['BigInt']>;
  originMinOut_not?: InputMaybe<Scalars['BigInt']>;
  originMinOut_gt?: InputMaybe<Scalars['BigInt']>;
  originMinOut_lt?: InputMaybe<Scalars['BigInt']>;
  originMinOut_gte?: InputMaybe<Scalars['BigInt']>;
  originMinOut_lte?: InputMaybe<Scalars['BigInt']>;
  originMinOut_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originMinOut_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAsset?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAsset?: InputMaybe<Scalars['goerli_Bytes']>;
  bridgedAsset_not?: InputMaybe<Scalars['goerli_Bytes']>;
  bridgedAsset_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  bridgedAsset_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  bridgedAsset_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  bridgedAsset_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  message_?: InputMaybe<goerli_OriginMessage_filter>;
  caller?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_OriginTransfer_orderBy =
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
  goerli_asset?: Maybe<goerli_Asset>;
  goerli_assets: Array<goerli_Asset>;
  goerli_assetBalance?: Maybe<goerli_AssetBalance>;
  goerli_assetBalances: Array<goerli_AssetBalance>;
  goerli_router?: Maybe<goerli_Router>;
  goerli_routers: Array<goerli_Router>;
  goerli_setting?: Maybe<goerli_Setting>;
  goerli_settings: Array<goerli_Setting>;
  goerli_relayer?: Maybe<goerli_Relayer>;
  goerli_relayers: Array<goerli_Relayer>;
  goerli_stableSwap?: Maybe<goerli_StableSwap>;
  goerli_stableSwaps: Array<goerli_StableSwap>;
  goerli_sponsorVault?: Maybe<goerli_SponsorVault>;
  goerli_sponsorVaults: Array<goerli_SponsorVault>;
  goerli_originTransfer?: Maybe<goerli_OriginTransfer>;
  goerli_originTransfers: Array<goerli_OriginTransfer>;
  goerli_destinationTransfer?: Maybe<goerli_DestinationTransfer>;
  goerli_destinationTransfers: Array<goerli_DestinationTransfer>;
  goerli_originMessage?: Maybe<goerli_OriginMessage>;
  goerli_originMessages: Array<goerli_OriginMessage>;
  goerli_destinationMessage?: Maybe<goerli_DestinationMessage>;
  goerli_destinationMessages: Array<goerli_DestinationMessage>;
  goerli_aggregateRoot?: Maybe<goerli_AggregateRoot>;
  goerli_aggregateRoots: Array<goerli_AggregateRoot>;
  goerli_connectorMeta?: Maybe<goerli_ConnectorMeta>;
  goerli_connectorMetas: Array<goerli_ConnectorMeta>;
  goerli_rootMessageSent?: Maybe<goerli_RootMessageSent>;
  goerli_rootMessageSents: Array<goerli_RootMessageSent>;
  goerli_rootMessageProcessed?: Maybe<goerli_RootMessageProcessed>;
  goerli_rootMessageProcesseds: Array<goerli_RootMessageProcessed>;
  /** Access to subgraph metadata */
  goerli__meta?: Maybe<goerli__Meta_>;
};


export type Querygoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Asset_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Asset_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AssetBalance_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Router_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Router_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Setting_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Setting_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Relayer_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_StableSwap_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_sponsorVaultArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_sponsorVaultsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_SponsorVault_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_SponsorVault_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_OriginTransfer_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_DestinationTransfer_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_OriginMessage_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_DestinationMessage_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AggregateRoot_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_ConnectorMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RootMessageSent_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RootMessageProcessed_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli__metaArgs = {
  block?: InputMaybe<goerli_Block_height>;
};

export type goerli_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['goerli_Bytes']>;
};

export type goerli_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['goerli_Bytes']>;
  relayer_not?: InputMaybe<Scalars['goerli_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type goerli_RootMessageProcessed = {
  id: Scalars['ID'];
  root?: Maybe<Scalars['goerli_Bytes']>;
  caller?: Maybe<Scalars['goerli_Bytes']>;
  transactionHash?: Maybe<Scalars['goerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type goerli_RootMessageProcessed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['goerli_Bytes']>;
  root_not?: InputMaybe<Scalars['goerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  caller?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_RootMessageProcessed_orderBy =
  | 'id'
  | 'root'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type goerli_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['goerli_Bytes']>;
  caller?: Maybe<Scalars['goerli_Bytes']>;
  transactionHash?: Maybe<Scalars['goerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type goerli_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['goerli_Bytes']>;
  root_not?: InputMaybe<Scalars['goerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  caller?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_RootMessageSent_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'root'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type goerli_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['goerli_Bytes']>;
  recipient?: Maybe<Scalars['goerli_Bytes']>;
  proposedOwner?: Maybe<Scalars['goerli_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<goerli_AssetBalance>;
};


export type goerli_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AssetBalance_filter>;
};

export type goerli_Router_filter = {
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
  owner?: InputMaybe<Scalars['goerli_Bytes']>;
  owner_not?: InputMaybe<Scalars['goerli_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  recipient?: InputMaybe<Scalars['goerli_Bytes']>;
  recipient_not?: InputMaybe<Scalars['goerli_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<goerli_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type goerli_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['goerli_Bytes'];
};

export type goerli_Setting_filter = {
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
  caller?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type goerli_SponsorVault = {
  id: Scalars['ID'];
  sponsorVault: Scalars['goerli_Bytes'];
};

export type goerli_SponsorVault_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  sponsorVault?: InputMaybe<Scalars['goerli_Bytes']>;
  sponsorVault_not?: InputMaybe<Scalars['goerli_Bytes']>;
  sponsorVault_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  sponsorVault_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  sponsorVault_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  sponsorVault_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_SponsorVault_orderBy =
  | 'id'
  | 'sponsorVault';

export type goerli_StableSwap = {
  id: Scalars['ID'];
  canonicalId: Scalars['goerli_Bytes'];
  domain?: Maybe<Scalars['BigInt']>;
  swapPool: Scalars['goerli_Bytes'];
};

export type goerli_StableSwap_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  canonicalId?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['goerli_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['goerli_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_StableSwap_orderBy =
  | 'id'
  | 'canonicalId'
  | 'domain'
  | 'swapPool';

export type Subscription = {
  goerli_asset?: Maybe<goerli_Asset>;
  goerli_assets: Array<goerli_Asset>;
  goerli_assetBalance?: Maybe<goerli_AssetBalance>;
  goerli_assetBalances: Array<goerli_AssetBalance>;
  goerli_router?: Maybe<goerli_Router>;
  goerli_routers: Array<goerli_Router>;
  goerli_setting?: Maybe<goerli_Setting>;
  goerli_settings: Array<goerli_Setting>;
  goerli_relayer?: Maybe<goerli_Relayer>;
  goerli_relayers: Array<goerli_Relayer>;
  goerli_stableSwap?: Maybe<goerli_StableSwap>;
  goerli_stableSwaps: Array<goerli_StableSwap>;
  goerli_sponsorVault?: Maybe<goerli_SponsorVault>;
  goerli_sponsorVaults: Array<goerli_SponsorVault>;
  goerli_originTransfer?: Maybe<goerli_OriginTransfer>;
  goerli_originTransfers: Array<goerli_OriginTransfer>;
  goerli_destinationTransfer?: Maybe<goerli_DestinationTransfer>;
  goerli_destinationTransfers: Array<goerli_DestinationTransfer>;
  goerli_originMessage?: Maybe<goerli_OriginMessage>;
  goerli_originMessages: Array<goerli_OriginMessage>;
  goerli_destinationMessage?: Maybe<goerli_DestinationMessage>;
  goerli_destinationMessages: Array<goerli_DestinationMessage>;
  goerli_aggregateRoot?: Maybe<goerli_AggregateRoot>;
  goerli_aggregateRoots: Array<goerli_AggregateRoot>;
  goerli_connectorMeta?: Maybe<goerli_ConnectorMeta>;
  goerli_connectorMetas: Array<goerli_ConnectorMeta>;
  goerli_rootMessageSent?: Maybe<goerli_RootMessageSent>;
  goerli_rootMessageSents: Array<goerli_RootMessageSent>;
  goerli_rootMessageProcessed?: Maybe<goerli_RootMessageProcessed>;
  goerli_rootMessageProcesseds: Array<goerli_RootMessageProcessed>;
  /** Access to subgraph metadata */
  goerli__meta?: Maybe<goerli__Meta_>;
};


export type Subscriptiongoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Asset_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Asset_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AssetBalance_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Router_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Router_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Setting_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Setting_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Relayer_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_StableSwap_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_sponsorVaultArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_sponsorVaultsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_SponsorVault_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_SponsorVault_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_OriginTransfer_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_DestinationTransfer_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_OriginMessage_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_DestinationMessage_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AggregateRoot_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_ConnectorMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RootMessageSent_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RootMessageProcessed_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli__metaArgs = {
  block?: InputMaybe<goerli_Block_height>;
};

export type goerli_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type goerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['goerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type goerli__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: goerli__Block_;
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
export type QueryConnextGoerliSdk = {
  /** null **/
  goerli_asset: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_asset'], ConnextGoerliTypes.Querygoerli_assetArgs, MeshContext>,
  /** null **/
  goerli_assets: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_assets'], ConnextGoerliTypes.Querygoerli_assetsArgs, MeshContext>,
  /** null **/
  goerli_assetBalance: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_assetBalance'], ConnextGoerliTypes.Querygoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  goerli_assetBalances: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_assetBalances'], ConnextGoerliTypes.Querygoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  goerli_router: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_router'], ConnextGoerliTypes.Querygoerli_routerArgs, MeshContext>,
  /** null **/
  goerli_routers: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_routers'], ConnextGoerliTypes.Querygoerli_routersArgs, MeshContext>,
  /** null **/
  goerli_setting: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_setting'], ConnextGoerliTypes.Querygoerli_settingArgs, MeshContext>,
  /** null **/
  goerli_settings: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_settings'], ConnextGoerliTypes.Querygoerli_settingsArgs, MeshContext>,
  /** null **/
  goerli_relayer: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_relayer'], ConnextGoerliTypes.Querygoerli_relayerArgs, MeshContext>,
  /** null **/
  goerli_relayers: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_relayers'], ConnextGoerliTypes.Querygoerli_relayersArgs, MeshContext>,
  /** null **/
  goerli_stableSwap: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_stableSwap'], ConnextGoerliTypes.Querygoerli_stableSwapArgs, MeshContext>,
  /** null **/
  goerli_stableSwaps: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_stableSwaps'], ConnextGoerliTypes.Querygoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  goerli_sponsorVault: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_sponsorVault'], ConnextGoerliTypes.Querygoerli_sponsorVaultArgs, MeshContext>,
  /** null **/
  goerli_sponsorVaults: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_sponsorVaults'], ConnextGoerliTypes.Querygoerli_sponsorVaultsArgs, MeshContext>,
  /** null **/
  goerli_originTransfer: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_originTransfer'], ConnextGoerliTypes.Querygoerli_originTransferArgs, MeshContext>,
  /** null **/
  goerli_originTransfers: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_originTransfers'], ConnextGoerliTypes.Querygoerli_originTransfersArgs, MeshContext>,
  /** null **/
  goerli_destinationTransfer: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_destinationTransfer'], ConnextGoerliTypes.Querygoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  goerli_destinationTransfers: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_destinationTransfers'], ConnextGoerliTypes.Querygoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  goerli_originMessage: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_originMessage'], ConnextGoerliTypes.Querygoerli_originMessageArgs, MeshContext>,
  /** null **/
  goerli_originMessages: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_originMessages'], ConnextGoerliTypes.Querygoerli_originMessagesArgs, MeshContext>,
  /** null **/
  goerli_destinationMessage: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_destinationMessage'], ConnextGoerliTypes.Querygoerli_destinationMessageArgs, MeshContext>,
  /** null **/
  goerli_destinationMessages: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_destinationMessages'], ConnextGoerliTypes.Querygoerli_destinationMessagesArgs, MeshContext>,
  /** null **/
  goerli_aggregateRoot: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_aggregateRoot'], ConnextGoerliTypes.Querygoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  goerli_aggregateRoots: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_aggregateRoots'], ConnextGoerliTypes.Querygoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  goerli_connectorMeta: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_connectorMeta'], ConnextGoerliTypes.Querygoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  goerli_connectorMetas: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_connectorMetas'], ConnextGoerliTypes.Querygoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  goerli_rootMessageSent: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_rootMessageSent'], ConnextGoerliTypes.Querygoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  goerli_rootMessageSents: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_rootMessageSents'], ConnextGoerliTypes.Querygoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  goerli_rootMessageProcessed: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_rootMessageProcessed'], ConnextGoerliTypes.Querygoerli_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  goerli_rootMessageProcesseds: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_rootMessageProcesseds'], ConnextGoerliTypes.Querygoerli_rootMessageProcessedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  goerli__meta: InContextSdkMethod<ConnextGoerliTypes.Query['goerli__meta'], ConnextGoerliTypes.Querygoerli__metaArgs, MeshContext>
};

export type MutationConnextGoerliSdk = {

};

export type SubscriptionConnextGoerliSdk = {
  /** null **/
  goerli_asset: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_asset'], ConnextGoerliTypes.Subscriptiongoerli_assetArgs, MeshContext>,
  /** null **/
  goerli_assets: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_assets'], ConnextGoerliTypes.Subscriptiongoerli_assetsArgs, MeshContext>,
  /** null **/
  goerli_assetBalance: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_assetBalance'], ConnextGoerliTypes.Subscriptiongoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  goerli_assetBalances: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_assetBalances'], ConnextGoerliTypes.Subscriptiongoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  goerli_router: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_router'], ConnextGoerliTypes.Subscriptiongoerli_routerArgs, MeshContext>,
  /** null **/
  goerli_routers: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_routers'], ConnextGoerliTypes.Subscriptiongoerli_routersArgs, MeshContext>,
  /** null **/
  goerli_setting: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_setting'], ConnextGoerliTypes.Subscriptiongoerli_settingArgs, MeshContext>,
  /** null **/
  goerli_settings: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_settings'], ConnextGoerliTypes.Subscriptiongoerli_settingsArgs, MeshContext>,
  /** null **/
  goerli_relayer: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_relayer'], ConnextGoerliTypes.Subscriptiongoerli_relayerArgs, MeshContext>,
  /** null **/
  goerli_relayers: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_relayers'], ConnextGoerliTypes.Subscriptiongoerli_relayersArgs, MeshContext>,
  /** null **/
  goerli_stableSwap: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_stableSwap'], ConnextGoerliTypes.Subscriptiongoerli_stableSwapArgs, MeshContext>,
  /** null **/
  goerli_stableSwaps: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_stableSwaps'], ConnextGoerliTypes.Subscriptiongoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  goerli_sponsorVault: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_sponsorVault'], ConnextGoerliTypes.Subscriptiongoerli_sponsorVaultArgs, MeshContext>,
  /** null **/
  goerli_sponsorVaults: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_sponsorVaults'], ConnextGoerliTypes.Subscriptiongoerli_sponsorVaultsArgs, MeshContext>,
  /** null **/
  goerli_originTransfer: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_originTransfer'], ConnextGoerliTypes.Subscriptiongoerli_originTransferArgs, MeshContext>,
  /** null **/
  goerli_originTransfers: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_originTransfers'], ConnextGoerliTypes.Subscriptiongoerli_originTransfersArgs, MeshContext>,
  /** null **/
  goerli_destinationTransfer: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_destinationTransfer'], ConnextGoerliTypes.Subscriptiongoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  goerli_destinationTransfers: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_destinationTransfers'], ConnextGoerliTypes.Subscriptiongoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  goerli_originMessage: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_originMessage'], ConnextGoerliTypes.Subscriptiongoerli_originMessageArgs, MeshContext>,
  /** null **/
  goerli_originMessages: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_originMessages'], ConnextGoerliTypes.Subscriptiongoerli_originMessagesArgs, MeshContext>,
  /** null **/
  goerli_destinationMessage: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_destinationMessage'], ConnextGoerliTypes.Subscriptiongoerli_destinationMessageArgs, MeshContext>,
  /** null **/
  goerli_destinationMessages: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_destinationMessages'], ConnextGoerliTypes.Subscriptiongoerli_destinationMessagesArgs, MeshContext>,
  /** null **/
  goerli_aggregateRoot: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_aggregateRoot'], ConnextGoerliTypes.Subscriptiongoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  goerli_aggregateRoots: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_aggregateRoots'], ConnextGoerliTypes.Subscriptiongoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  goerli_connectorMeta: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_connectorMeta'], ConnextGoerliTypes.Subscriptiongoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  goerli_connectorMetas: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_connectorMetas'], ConnextGoerliTypes.Subscriptiongoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  goerli_rootMessageSent: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_rootMessageSent'], ConnextGoerliTypes.Subscriptiongoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  goerli_rootMessageSents: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_rootMessageSents'], ConnextGoerliTypes.Subscriptiongoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  goerli_rootMessageProcessed: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_rootMessageProcessed'], ConnextGoerliTypes.Subscriptiongoerli_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  goerli_rootMessageProcesseds: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_rootMessageProcesseds'], ConnextGoerliTypes.Subscriptiongoerli_rootMessageProcessedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  goerli__meta: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli__meta'], ConnextGoerliTypes.Subscriptiongoerli__metaArgs, MeshContext>
};
export type ConnextGoerliContext = {
      ["Connext_Goerli"]: { Query: QueryConnextGoerliSdk, Mutation: MutationConnextGoerliSdk, Subscription: SubscriptionConnextGoerliSdk },
      
    };