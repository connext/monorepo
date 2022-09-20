
import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextStagingOptimismGoerliTypes {
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
  stagingoptimismgoerli_BigDecimal: any;
  BigInt: bigint;
  stagingoptimismgoerli_Bytes: any;
};

export type stagingoptimismgoerli_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['stagingoptimismgoerli_Bytes'];
};

export type stagingoptimismgoerli_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_AggregateRoot_orderBy =
  | 'id'
  | 'root';

export type stagingoptimismgoerli_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  local: Scalars['stagingoptimismgoerli_Bytes'];
  adoptedAsset: Scalars['stagingoptimismgoerli_Bytes'];
  canonicalId: Scalars['stagingoptimismgoerli_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingoptimismgoerli_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: stagingoptimismgoerli_Router;
  asset: stagingoptimismgoerli_Asset;
};

export type stagingoptimismgoerli_AssetBalance_filter = {
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
  router_?: InputMaybe<stagingoptimismgoerli_Router_filter>;
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
  asset_?: InputMaybe<stagingoptimismgoerli_Asset_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type stagingoptimismgoerli_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  key_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  key_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  local?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  local_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  local_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  local_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  local_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  local_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  adoptedAsset?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_Asset_orderBy =
  | 'id'
  | 'key'
  | 'local'
  | 'adoptedAsset'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'blockNumber';

export type stagingoptimismgoerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingoptimismgoerli_Block_height = {
  hash?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type stagingoptimismgoerli_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['stagingoptimismgoerli_Bytes'];
  rootManager: Scalars['stagingoptimismgoerli_Bytes'];
  mirrorConnector: Scalars['stagingoptimismgoerli_Bytes'];
};

export type stagingoptimismgoerli_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingoptimismgoerli_DestinationMessage = {
  id: Scalars['ID'];
  leaf?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  processed?: Maybe<Scalars['Boolean']>;
  returnData?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
};

export type stagingoptimismgoerli_DestinationMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  leaf?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  leaf_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  processed?: InputMaybe<Scalars['Boolean']>;
  processed_not?: InputMaybe<Scalars['Boolean']>;
  processed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  processed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  returnData?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  returnData_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  returnData_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  returnData_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  returnData_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  returnData_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_DestinationMessage_orderBy =
  | 'id'
  | 'leaf'
  | 'processed'
  | 'returnData'
  | 'transactionHash';

export type stagingoptimismgoerli_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  agent?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recovery?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callback?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callbackFee?: Maybe<Scalars['BigInt']>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  destinationMinOut?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingoptimismgoerli_TransferStatus>;
  routers?: Maybe<Array<stagingoptimismgoerli_Router>>;
  originSender?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactingAsset?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  localAsset?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  localAmount?: Maybe<Scalars['BigInt']>;
  sponsorVaultRelayerFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type stagingoptimismgoerli_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_Router_filter>;
};

export type stagingoptimismgoerli_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  agent?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  agent_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  agent_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  agent_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  agent_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  agent_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recovery?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recovery_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recovery_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  recovery_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  recovery_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recovery_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callback?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callback_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callback_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  callback_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  callback_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callback_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  status?: InputMaybe<stagingoptimismgoerli_TransferStatus>;
  status_not?: InputMaybe<stagingoptimismgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<stagingoptimismgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingoptimismgoerli_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<stagingoptimismgoerli_Router_filter>;
  originSender?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAsset?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  executedCaller?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  reconciledCaller?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_DestinationTransfer_orderBy =
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
export type stagingoptimismgoerli_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingoptimismgoerli_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  message?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
};

export type stagingoptimismgoerli_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  leaf_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  root?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  message?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  message_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  message_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_OriginMessage_orderBy =
  | 'id'
  | 'transferId'
  | 'destinationDomain'
  | 'leaf'
  | 'index'
  | 'root'
  | 'message'
  | 'transactionHash';

export type stagingoptimismgoerli_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  agent?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recovery?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callback?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callbackFee?: Maybe<Scalars['BigInt']>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  destinationMinOut?: Maybe<Scalars['BigInt']>;
  status?: Maybe<stagingoptimismgoerli_TransferStatus>;
  originMinOut?: Maybe<Scalars['BigInt']>;
  transactingAsset?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  bridgedAsset?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  bridgedAmount?: Maybe<Scalars['BigInt']>;
  message?: Maybe<stagingoptimismgoerli_OriginMessage>;
  caller?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingoptimismgoerli_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  agent?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  agent_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  agent_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  agent_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  agent_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  agent_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recovery?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recovery_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recovery_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  recovery_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  recovery_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recovery_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callback?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callback_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callback_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  callback_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  callback_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  callback_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  status?: InputMaybe<stagingoptimismgoerli_TransferStatus>;
  status_not?: InputMaybe<stagingoptimismgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<stagingoptimismgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingoptimismgoerli_TransferStatus>>;
  originMinOut?: InputMaybe<Scalars['BigInt']>;
  originMinOut_not?: InputMaybe<Scalars['BigInt']>;
  originMinOut_gt?: InputMaybe<Scalars['BigInt']>;
  originMinOut_lt?: InputMaybe<Scalars['BigInt']>;
  originMinOut_gte?: InputMaybe<Scalars['BigInt']>;
  originMinOut_lte?: InputMaybe<Scalars['BigInt']>;
  originMinOut_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originMinOut_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAsset?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAsset?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  bridgedAsset_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  bridgedAsset_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  bridgedAsset_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  bridgedAsset_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  bridgedAsset_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  message_?: InputMaybe<stagingoptimismgoerli_OriginMessage_filter>;
  caller?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_OriginTransfer_orderBy =
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
  stagingoptimismgoerli_asset?: Maybe<stagingoptimismgoerli_Asset>;
  stagingoptimismgoerli_assets: Array<stagingoptimismgoerli_Asset>;
  stagingoptimismgoerli_assetBalance?: Maybe<stagingoptimismgoerli_AssetBalance>;
  stagingoptimismgoerli_assetBalances: Array<stagingoptimismgoerli_AssetBalance>;
  stagingoptimismgoerli_router?: Maybe<stagingoptimismgoerli_Router>;
  stagingoptimismgoerli_routers: Array<stagingoptimismgoerli_Router>;
  stagingoptimismgoerli_setting?: Maybe<stagingoptimismgoerli_Setting>;
  stagingoptimismgoerli_settings: Array<stagingoptimismgoerli_Setting>;
  stagingoptimismgoerli_relayer?: Maybe<stagingoptimismgoerli_Relayer>;
  stagingoptimismgoerli_relayers: Array<stagingoptimismgoerli_Relayer>;
  stagingoptimismgoerli_stableSwap?: Maybe<stagingoptimismgoerli_StableSwap>;
  stagingoptimismgoerli_stableSwaps: Array<stagingoptimismgoerli_StableSwap>;
  stagingoptimismgoerli_sponsorVault?: Maybe<stagingoptimismgoerli_SponsorVault>;
  stagingoptimismgoerli_sponsorVaults: Array<stagingoptimismgoerli_SponsorVault>;
  stagingoptimismgoerli_originTransfer?: Maybe<stagingoptimismgoerli_OriginTransfer>;
  stagingoptimismgoerli_originTransfers: Array<stagingoptimismgoerli_OriginTransfer>;
  stagingoptimismgoerli_destinationTransfer?: Maybe<stagingoptimismgoerli_DestinationTransfer>;
  stagingoptimismgoerli_destinationTransfers: Array<stagingoptimismgoerli_DestinationTransfer>;
  stagingoptimismgoerli_originMessage?: Maybe<stagingoptimismgoerli_OriginMessage>;
  stagingoptimismgoerli_originMessages: Array<stagingoptimismgoerli_OriginMessage>;
  stagingoptimismgoerli_destinationMessage?: Maybe<stagingoptimismgoerli_DestinationMessage>;
  stagingoptimismgoerli_destinationMessages: Array<stagingoptimismgoerli_DestinationMessage>;
  stagingoptimismgoerli_aggregateRoot?: Maybe<stagingoptimismgoerli_AggregateRoot>;
  stagingoptimismgoerli_aggregateRoots: Array<stagingoptimismgoerli_AggregateRoot>;
  stagingoptimismgoerli_connectorMeta?: Maybe<stagingoptimismgoerli_ConnectorMeta>;
  stagingoptimismgoerli_connectorMetas: Array<stagingoptimismgoerli_ConnectorMeta>;
  stagingoptimismgoerli_rootMessageSent?: Maybe<stagingoptimismgoerli_RootMessageSent>;
  stagingoptimismgoerli_rootMessageSents: Array<stagingoptimismgoerli_RootMessageSent>;
  stagingoptimismgoerli_rootMessageProcessed?: Maybe<stagingoptimismgoerli_RootMessageProcessed>;
  stagingoptimismgoerli_rootMessageProcesseds: Array<stagingoptimismgoerli_RootMessageProcessed>;
  /** Access to subgraph metadata */
  stagingoptimismgoerli__meta?: Maybe<stagingoptimismgoerli__Meta_>;
};


export type Querystagingoptimismgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_Asset_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_AssetBalance_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_Router_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_Setting_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_Relayer_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_StableSwap_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_sponsorVaultArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_sponsorVaultsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_SponsorVault_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_SponsorVault_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_OriginTransfer_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_OriginMessage_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_DestinationMessage_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_AggregateRoot_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_ConnectorMeta_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_RootMessageSent_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_RootMessageProcessed_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli__metaArgs = {
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
};

export type stagingoptimismgoerli_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
};

export type stagingoptimismgoerli_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  relayer_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type stagingoptimismgoerli_RootMessageProcessed = {
  id: Scalars['ID'];
  root?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingoptimismgoerli_RootMessageProcessed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_RootMessageProcessed_orderBy =
  | 'id'
  | 'root'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type stagingoptimismgoerli_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingoptimismgoerli_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_RootMessageSent_orderBy =
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

export type stagingoptimismgoerli_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recipient?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  proposedOwner?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<stagingoptimismgoerli_AssetBalance>;
};


export type stagingoptimismgoerli_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_AssetBalance_filter>;
};

export type stagingoptimismgoerli_Router_filter = {
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
  owner?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  owner_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recipient?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recipient_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<stagingoptimismgoerli_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type stagingoptimismgoerli_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['stagingoptimismgoerli_Bytes'];
};

export type stagingoptimismgoerli_Setting_filter = {
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
  caller?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type stagingoptimismgoerli_SponsorVault = {
  id: Scalars['ID'];
  sponsorVault: Scalars['stagingoptimismgoerli_Bytes'];
};

export type stagingoptimismgoerli_SponsorVault_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  sponsorVault?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  sponsorVault_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  sponsorVault_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  sponsorVault_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  sponsorVault_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  sponsorVault_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_SponsorVault_orderBy =
  | 'id'
  | 'sponsorVault';

export type stagingoptimismgoerli_StableSwap = {
  id: Scalars['ID'];
  canonicalId: Scalars['stagingoptimismgoerli_Bytes'];
  domain?: Maybe<Scalars['BigInt']>;
  swapPool: Scalars['stagingoptimismgoerli_Bytes'];
};

export type stagingoptimismgoerli_StableSwap_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  canonicalId?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_StableSwap_orderBy =
  | 'id'
  | 'canonicalId'
  | 'domain'
  | 'swapPool';

export type Subscription = {
  stagingoptimismgoerli_asset?: Maybe<stagingoptimismgoerli_Asset>;
  stagingoptimismgoerli_assets: Array<stagingoptimismgoerli_Asset>;
  stagingoptimismgoerli_assetBalance?: Maybe<stagingoptimismgoerli_AssetBalance>;
  stagingoptimismgoerli_assetBalances: Array<stagingoptimismgoerli_AssetBalance>;
  stagingoptimismgoerli_router?: Maybe<stagingoptimismgoerli_Router>;
  stagingoptimismgoerli_routers: Array<stagingoptimismgoerli_Router>;
  stagingoptimismgoerli_setting?: Maybe<stagingoptimismgoerli_Setting>;
  stagingoptimismgoerli_settings: Array<stagingoptimismgoerli_Setting>;
  stagingoptimismgoerli_relayer?: Maybe<stagingoptimismgoerli_Relayer>;
  stagingoptimismgoerli_relayers: Array<stagingoptimismgoerli_Relayer>;
  stagingoptimismgoerli_stableSwap?: Maybe<stagingoptimismgoerli_StableSwap>;
  stagingoptimismgoerli_stableSwaps: Array<stagingoptimismgoerli_StableSwap>;
  stagingoptimismgoerli_sponsorVault?: Maybe<stagingoptimismgoerli_SponsorVault>;
  stagingoptimismgoerli_sponsorVaults: Array<stagingoptimismgoerli_SponsorVault>;
  stagingoptimismgoerli_originTransfer?: Maybe<stagingoptimismgoerli_OriginTransfer>;
  stagingoptimismgoerli_originTransfers: Array<stagingoptimismgoerli_OriginTransfer>;
  stagingoptimismgoerli_destinationTransfer?: Maybe<stagingoptimismgoerli_DestinationTransfer>;
  stagingoptimismgoerli_destinationTransfers: Array<stagingoptimismgoerli_DestinationTransfer>;
  stagingoptimismgoerli_originMessage?: Maybe<stagingoptimismgoerli_OriginMessage>;
  stagingoptimismgoerli_originMessages: Array<stagingoptimismgoerli_OriginMessage>;
  stagingoptimismgoerli_destinationMessage?: Maybe<stagingoptimismgoerli_DestinationMessage>;
  stagingoptimismgoerli_destinationMessages: Array<stagingoptimismgoerli_DestinationMessage>;
  stagingoptimismgoerli_aggregateRoot?: Maybe<stagingoptimismgoerli_AggregateRoot>;
  stagingoptimismgoerli_aggregateRoots: Array<stagingoptimismgoerli_AggregateRoot>;
  stagingoptimismgoerli_connectorMeta?: Maybe<stagingoptimismgoerli_ConnectorMeta>;
  stagingoptimismgoerli_connectorMetas: Array<stagingoptimismgoerli_ConnectorMeta>;
  stagingoptimismgoerli_rootMessageSent?: Maybe<stagingoptimismgoerli_RootMessageSent>;
  stagingoptimismgoerli_rootMessageSents: Array<stagingoptimismgoerli_RootMessageSent>;
  stagingoptimismgoerli_rootMessageProcessed?: Maybe<stagingoptimismgoerli_RootMessageProcessed>;
  stagingoptimismgoerli_rootMessageProcesseds: Array<stagingoptimismgoerli_RootMessageProcessed>;
  /** Access to subgraph metadata */
  stagingoptimismgoerli__meta?: Maybe<stagingoptimismgoerli__Meta_>;
};


export type Subscriptionstagingoptimismgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_Asset_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_AssetBalance_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_Router_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_Setting_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_Relayer_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_StableSwap_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_sponsorVaultArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_sponsorVaultsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_SponsorVault_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_SponsorVault_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_OriginTransfer_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_OriginMessage_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_DestinationMessage_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_AggregateRoot_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_ConnectorMeta_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_RootMessageSent_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_RootMessageProcessed_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli__metaArgs = {
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
};

export type stagingoptimismgoerli_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type stagingoptimismgoerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type stagingoptimismgoerli__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingoptimismgoerli__Block_;
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
export type QueryConnextStagingOptimismGoerliSdk = {
  /** null **/
  stagingoptimismgoerli_asset: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_asset'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_assetArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_assets: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_assets'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_assetsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_assetBalance: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_assetBalance'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_assetBalances: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_assetBalances'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_router: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_router'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_routerArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_routers: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_routers'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_routersArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_setting: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_setting'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_settingArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_settings: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_settings'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_settingsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_relayer: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_relayer'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_relayerArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_relayers: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_relayers'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_relayersArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwap: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_stableSwap'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_stableSwapArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwaps: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_stableSwaps'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_sponsorVault: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_sponsorVault'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_sponsorVaultArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_sponsorVaults: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_sponsorVaults'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_sponsorVaultsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_originTransfer: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_originTransfer'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_originTransferArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_originTransfers: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_originTransfers'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_destinationTransfer: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_destinationTransfer'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_destinationTransfers: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_destinationTransfers'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_originMessage: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_originMessage'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_originMessageArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_originMessages: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_originMessages'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_originMessagesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_destinationMessage: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_destinationMessage'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_destinationMessageArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_destinationMessages: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_destinationMessages'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_destinationMessagesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_aggregateRoot: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_aggregateRoot'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_aggregateRoots: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_aggregateRoots'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_connectorMeta: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_connectorMeta'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_connectorMetas: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_connectorMetas'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_rootMessageSent: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_rootMessageSent'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_rootMessageSents: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_rootMessageSents'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_rootMessageProcessed: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_rootMessageProcessed'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_rootMessageProcesseds: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli_rootMessageProcesseds'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli_rootMessageProcessedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingoptimismgoerli__meta: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Query['stagingoptimismgoerli__meta'], ConnextStagingOptimismGoerliTypes.Querystagingoptimismgoerli__metaArgs, MeshContext>
};

export type MutationConnextStagingOptimismGoerliSdk = {

};

export type SubscriptionConnextStagingOptimismGoerliSdk = {
  /** null **/
  stagingoptimismgoerli_asset: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_asset'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_assetArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_assets: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_assets'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_assetsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_assetBalance: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_assetBalance'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_assetBalances: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_assetBalances'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_router: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_router'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_routerArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_routers: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_routers'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_routersArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_setting: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_setting'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_settingArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_settings: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_settings'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_settingsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_relayer: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_relayer'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_relayerArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_relayers: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_relayers'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_relayersArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwap: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_stableSwap'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_stableSwapArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwaps: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_stableSwaps'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_sponsorVault: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_sponsorVault'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_sponsorVaultArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_sponsorVaults: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_sponsorVaults'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_sponsorVaultsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_originTransfer: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_originTransfer'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_originTransferArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_originTransfers: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_originTransfers'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_destinationTransfer: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_destinationTransfer'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_destinationTransfers: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_destinationTransfers'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_originMessage: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_originMessage'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_originMessageArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_originMessages: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_originMessages'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_originMessagesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_destinationMessage: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_destinationMessage'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_destinationMessageArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_destinationMessages: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_destinationMessages'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_destinationMessagesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_aggregateRoot: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_aggregateRoot'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_aggregateRoots: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_aggregateRoots'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_connectorMeta: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_connectorMeta'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_connectorMetas: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_connectorMetas'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_rootMessageSent: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_rootMessageSent'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_rootMessageSents: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_rootMessageSents'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_rootMessageSentsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_rootMessageProcessed: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_rootMessageProcessed'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_rootMessageProcesseds: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli_rootMessageProcesseds'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli_rootMessageProcessedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingoptimismgoerli__meta: InContextSdkMethod<ConnextStagingOptimismGoerliTypes.Subscription['stagingoptimismgoerli__meta'], ConnextStagingOptimismGoerliTypes.Subscriptionstagingoptimismgoerli__metaArgs, MeshContext>
};
export type ConnextStagingOptimismGoerliContext = {
      ["Connext_Staging_OptimismGoerli"]: { Query: QueryConnextStagingOptimismGoerliSdk, Mutation: MutationConnextStagingOptimismGoerliSdk, Subscription: SubscriptionConnextStagingOptimismGoerliSdk },
      
    };