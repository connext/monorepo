
import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextOptimismGoerliTypes {
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
  optimismgoerli_BigDecimal: any;
  BigInt: bigint;
  optimismgoerli_Bytes: any;
};

export type optimismgoerli_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['optimismgoerli_Bytes'];
};

export type optimismgoerli_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_AggregateRoot_orderBy =
  | 'id'
  | 'root';

export type optimismgoerli_Asset = {
  id: Scalars['ID'];
  key: Scalars['optimismgoerli_Bytes'];
  canonicalId: Scalars['optimismgoerli_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  adoptedAsset: Scalars['optimismgoerli_Bytes'];
  localAsset: Scalars['optimismgoerli_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type optimismgoerli_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: optimismgoerli_Router;
  asset: optimismgoerli_Asset;
};

export type optimismgoerli_AssetBalance_filter = {
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
  router_?: InputMaybe<optimismgoerli_Router_filter>;
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
  asset_?: InputMaybe<optimismgoerli_Asset_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type optimismgoerli_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  key_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  key_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  localAsset?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_Asset_orderBy =
  | 'id'
  | 'key'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber';

export type optimismgoerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type optimismgoerli_Block_height = {
  hash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type optimismgoerli_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['optimismgoerli_Bytes'];
  rootManager: Scalars['optimismgoerli_Bytes'];
  mirrorConnector: Scalars['optimismgoerli_Bytes'];
};

export type optimismgoerli_ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type optimismgoerli_DestinationMessage = {
  id: Scalars['ID'];
  leaf?: Maybe<Scalars['optimismgoerli_Bytes']>;
  processed?: Maybe<Scalars['Boolean']>;
  returnData?: Maybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['optimismgoerli_Bytes']>;
};

export type optimismgoerli_DestinationMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  leaf?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  leaf_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  processed?: InputMaybe<Scalars['Boolean']>;
  processed_not?: InputMaybe<Scalars['Boolean']>;
  processed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  processed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  returnData?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  returnData_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  returnData_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  returnData_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  returnData_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  returnData_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_DestinationMessage_orderBy =
  | 'id'
  | 'leaf'
  | 'processed'
  | 'returnData'
  | 'transactionHash';

export type optimismgoerli_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['optimismgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<optimismgoerli_TransferStatus>;
  routers?: Maybe<Array<optimismgoerli_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['optimismgoerli_Bytes']>;
  delegate?: Maybe<Scalars['optimismgoerli_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['optimismgoerli_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['optimismgoerli_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['optimismgoerli_Bytes']>;
  asset?: Maybe<optimismgoerli_Asset>;
  executedCaller?: Maybe<Scalars['optimismgoerli_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['optimismgoerli_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type optimismgoerli_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Router_filter>;
};

export type optimismgoerli_DestinationTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<optimismgoerli_TransferStatus>;
  status_not?: InputMaybe<optimismgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<optimismgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<optimismgoerli_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<optimismgoerli_Router_filter>;
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
  to?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  asset_?: InputMaybe<optimismgoerli_Asset_filter>;
  executedCaller?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  reconciledCaller?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_DestinationTransfer_orderBy =
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
export type optimismgoerli_OrderDirection =
  | 'asc'
  | 'desc';

export type optimismgoerli_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['optimismgoerli_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['optimismgoerli_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['optimismgoerli_Bytes']>;
  message?: Maybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['optimismgoerli_Bytes']>;
};

export type optimismgoerli_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  leaf_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  root?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  message?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  message_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  message_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_OriginMessage_orderBy =
  | 'id'
  | 'transferId'
  | 'destinationDomain'
  | 'leaf'
  | 'index'
  | 'root'
  | 'message'
  | 'transactionHash';

export type optimismgoerli_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['optimismgoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<optimismgoerli_TransferStatus>;
  messageHash?: Maybe<Scalars['optimismgoerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['optimismgoerli_Bytes']>;
  delegate?: Maybe<Scalars['optimismgoerli_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['optimismgoerli_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['optimismgoerli_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['optimismgoerli_Bytes']>;
  asset?: Maybe<optimismgoerli_Asset>;
  message?: Maybe<optimismgoerli_OriginMessage>;
  caller?: Maybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['optimismgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type optimismgoerli_OriginTransfer_filter = {
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
  transferId?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<optimismgoerli_TransferStatus>;
  status_not?: InputMaybe<optimismgoerli_TransferStatus>;
  status_in?: InputMaybe<Array<optimismgoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<optimismgoerli_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  to?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  canonicalId?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  asset_?: InputMaybe<optimismgoerli_Asset_filter>;
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
  message_?: InputMaybe<optimismgoerli_OriginMessage_filter>;
  caller?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_OriginTransfer_orderBy =
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

export type Query = {
  optimismgoerli_asset?: Maybe<optimismgoerli_Asset>;
  optimismgoerli_assets: Array<optimismgoerli_Asset>;
  optimismgoerli_assetBalance?: Maybe<optimismgoerli_AssetBalance>;
  optimismgoerli_assetBalances: Array<optimismgoerli_AssetBalance>;
  optimismgoerli_router?: Maybe<optimismgoerli_Router>;
  optimismgoerli_routers: Array<optimismgoerli_Router>;
  optimismgoerli_setting?: Maybe<optimismgoerli_Setting>;
  optimismgoerli_settings: Array<optimismgoerli_Setting>;
  optimismgoerli_relayer?: Maybe<optimismgoerli_Relayer>;
  optimismgoerli_relayers: Array<optimismgoerli_Relayer>;
  optimismgoerli_sequencer?: Maybe<optimismgoerli_Sequencer>;
  optimismgoerli_sequencers: Array<optimismgoerli_Sequencer>;
  optimismgoerli_stableSwap?: Maybe<optimismgoerli_StableSwap>;
  optimismgoerli_stableSwaps: Array<optimismgoerli_StableSwap>;
  optimismgoerli_originTransfer?: Maybe<optimismgoerli_OriginTransfer>;
  optimismgoerli_originTransfers: Array<optimismgoerli_OriginTransfer>;
  optimismgoerli_destinationTransfer?: Maybe<optimismgoerli_DestinationTransfer>;
  optimismgoerli_destinationTransfers: Array<optimismgoerli_DestinationTransfer>;
  optimismgoerli_originMessage?: Maybe<optimismgoerli_OriginMessage>;
  optimismgoerli_originMessages: Array<optimismgoerli_OriginMessage>;
  optimismgoerli_destinationMessage?: Maybe<optimismgoerli_DestinationMessage>;
  optimismgoerli_destinationMessages: Array<optimismgoerli_DestinationMessage>;
  optimismgoerli_aggregateRoot?: Maybe<optimismgoerli_AggregateRoot>;
  optimismgoerli_aggregateRoots: Array<optimismgoerli_AggregateRoot>;
  optimismgoerli_connectorMeta?: Maybe<optimismgoerli_ConnectorMeta>;
  optimismgoerli_connectorMetas: Array<optimismgoerli_ConnectorMeta>;
  optimismgoerli_rootMessageSent?: Maybe<optimismgoerli_RootMessageSent>;
  optimismgoerli_rootMessageSents: Array<optimismgoerli_RootMessageSent>;
  /** Access to subgraph metadata */
  optimismgoerli__meta?: Maybe<optimismgoerli__Meta_>;
};


export type Queryoptimismgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Asset_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_AssetBalance_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Router_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Setting_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Relayer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Sequencer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Sequencer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_StableSwap_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_OriginTransfer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_OriginMessage_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_DestinationMessage_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_AggregateRoot_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_ConnectorMeta_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_RootMessageSent_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimismgoerli__metaArgs = {
  block?: InputMaybe<optimismgoerli_Block_height>;
};

export type optimismgoerli_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['optimismgoerli_Bytes']>;
};

export type optimismgoerli_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  relayer_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type optimismgoerli_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['optimismgoerli_Bytes']>;
  caller?: Maybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['optimismgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type optimismgoerli_RootMessageSent_filter = {
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
  root?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
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
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_RootMessageSent_orderBy =
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

export type optimismgoerli_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['optimismgoerli_Bytes']>;
  recipient?: Maybe<Scalars['optimismgoerli_Bytes']>;
  proposedOwner?: Maybe<Scalars['optimismgoerli_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<optimismgoerli_AssetBalance>;
};


export type optimismgoerli_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_AssetBalance_filter>;
};

export type optimismgoerli_Router_filter = {
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
  owner?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  owner_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  recipient?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  recipient_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<optimismgoerli_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type optimismgoerli_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['optimismgoerli_Bytes']>;
};

export type optimismgoerli_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type optimismgoerli_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['optimismgoerli_Bytes'];
};

export type optimismgoerli_Setting_filter = {
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
  caller?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type optimismgoerli_StableSwap = {
  id: Scalars['ID'];
  canonicalId: Scalars['optimismgoerli_Bytes'];
  domain?: Maybe<Scalars['BigInt']>;
  swapPool: Scalars['optimismgoerli_Bytes'];
};

export type optimismgoerli_StableSwap_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  canonicalId?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['optimismgoerli_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['optimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimismgoerli_BlockChangedFilter>;
};

export type optimismgoerli_StableSwap_orderBy =
  | 'id'
  | 'canonicalId'
  | 'domain'
  | 'swapPool';

export type Subscription = {
  optimismgoerli_asset?: Maybe<optimismgoerli_Asset>;
  optimismgoerli_assets: Array<optimismgoerli_Asset>;
  optimismgoerli_assetBalance?: Maybe<optimismgoerli_AssetBalance>;
  optimismgoerli_assetBalances: Array<optimismgoerli_AssetBalance>;
  optimismgoerli_router?: Maybe<optimismgoerli_Router>;
  optimismgoerli_routers: Array<optimismgoerli_Router>;
  optimismgoerli_setting?: Maybe<optimismgoerli_Setting>;
  optimismgoerli_settings: Array<optimismgoerli_Setting>;
  optimismgoerli_relayer?: Maybe<optimismgoerli_Relayer>;
  optimismgoerli_relayers: Array<optimismgoerli_Relayer>;
  optimismgoerli_sequencer?: Maybe<optimismgoerli_Sequencer>;
  optimismgoerli_sequencers: Array<optimismgoerli_Sequencer>;
  optimismgoerli_stableSwap?: Maybe<optimismgoerli_StableSwap>;
  optimismgoerli_stableSwaps: Array<optimismgoerli_StableSwap>;
  optimismgoerli_originTransfer?: Maybe<optimismgoerli_OriginTransfer>;
  optimismgoerli_originTransfers: Array<optimismgoerli_OriginTransfer>;
  optimismgoerli_destinationTransfer?: Maybe<optimismgoerli_DestinationTransfer>;
  optimismgoerli_destinationTransfers: Array<optimismgoerli_DestinationTransfer>;
  optimismgoerli_originMessage?: Maybe<optimismgoerli_OriginMessage>;
  optimismgoerli_originMessages: Array<optimismgoerli_OriginMessage>;
  optimismgoerli_destinationMessage?: Maybe<optimismgoerli_DestinationMessage>;
  optimismgoerli_destinationMessages: Array<optimismgoerli_DestinationMessage>;
  optimismgoerli_aggregateRoot?: Maybe<optimismgoerli_AggregateRoot>;
  optimismgoerli_aggregateRoots: Array<optimismgoerli_AggregateRoot>;
  optimismgoerli_connectorMeta?: Maybe<optimismgoerli_ConnectorMeta>;
  optimismgoerli_connectorMetas: Array<optimismgoerli_ConnectorMeta>;
  optimismgoerli_rootMessageSent?: Maybe<optimismgoerli_RootMessageSent>;
  optimismgoerli_rootMessageSents: Array<optimismgoerli_RootMessageSent>;
  /** Access to subgraph metadata */
  optimismgoerli__meta?: Maybe<optimismgoerli__Meta_>;
};


export type Subscriptionoptimismgoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Asset_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_AssetBalance_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Router_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Router_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Setting_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Setting_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Relayer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Relayer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_Sequencer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_Sequencer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_StableSwap_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_OriginTransfer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_DestinationTransfer_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_OriginMessage_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_destinationMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_destinationMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_DestinationMessage_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_DestinationMessage_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_AggregateRoot_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_ConnectorMeta_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimismgoerli_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<optimismgoerli_OrderDirection>;
  where?: InputMaybe<optimismgoerli_RootMessageSent_filter>;
  block?: InputMaybe<optimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimismgoerli__metaArgs = {
  block?: InputMaybe<optimismgoerli_Block_height>;
};

export type optimismgoerli_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type optimismgoerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['optimismgoerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type optimismgoerli__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: optimismgoerli__Block_;
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
export type QueryConnextOptimismGoerliSdk = {
  /** null **/
  optimismgoerli_asset: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_asset'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_assetArgs, MeshContext>,
  /** null **/
  optimismgoerli_assets: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_assets'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_assetsArgs, MeshContext>,
  /** null **/
  optimismgoerli_assetBalance: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_assetBalance'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  optimismgoerli_assetBalances: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_assetBalances'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  optimismgoerli_router: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_router'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_routerArgs, MeshContext>,
  /** null **/
  optimismgoerli_routers: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_routers'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_routersArgs, MeshContext>,
  /** null **/
  optimismgoerli_setting: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_setting'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_settingArgs, MeshContext>,
  /** null **/
  optimismgoerli_settings: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_settings'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_settingsArgs, MeshContext>,
  /** null **/
  optimismgoerli_relayer: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_relayer'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_relayerArgs, MeshContext>,
  /** null **/
  optimismgoerli_relayers: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_relayers'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_relayersArgs, MeshContext>,
  /** null **/
  optimismgoerli_sequencer: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_sequencer'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_sequencerArgs, MeshContext>,
  /** null **/
  optimismgoerli_sequencers: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_sequencers'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_sequencersArgs, MeshContext>,
  /** null **/
  optimismgoerli_stableSwap: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_stableSwap'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_stableSwapArgs, MeshContext>,
  /** null **/
  optimismgoerli_stableSwaps: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_stableSwaps'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  optimismgoerli_originTransfer: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_originTransfer'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_originTransferArgs, MeshContext>,
  /** null **/
  optimismgoerli_originTransfers: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_originTransfers'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  optimismgoerli_destinationTransfer: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_destinationTransfer'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  optimismgoerli_destinationTransfers: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_destinationTransfers'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  optimismgoerli_originMessage: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_originMessage'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_originMessageArgs, MeshContext>,
  /** null **/
  optimismgoerli_originMessages: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_originMessages'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_originMessagesArgs, MeshContext>,
  /** null **/
  optimismgoerli_destinationMessage: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_destinationMessage'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_destinationMessageArgs, MeshContext>,
  /** null **/
  optimismgoerli_destinationMessages: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_destinationMessages'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_destinationMessagesArgs, MeshContext>,
  /** null **/
  optimismgoerli_aggregateRoot: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_aggregateRoot'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  optimismgoerli_aggregateRoots: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_aggregateRoots'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  optimismgoerli_connectorMeta: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_connectorMeta'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  optimismgoerli_connectorMetas: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_connectorMetas'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  optimismgoerli_rootMessageSent: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_rootMessageSent'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  optimismgoerli_rootMessageSents: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli_rootMessageSents'], ConnextOptimismGoerliTypes.Queryoptimismgoerli_rootMessageSentsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  optimismgoerli__meta: InContextSdkMethod<ConnextOptimismGoerliTypes.Query['optimismgoerli__meta'], ConnextOptimismGoerliTypes.Queryoptimismgoerli__metaArgs, MeshContext>
};

export type MutationConnextOptimismGoerliSdk = {

};

export type SubscriptionConnextOptimismGoerliSdk = {
  /** null **/
  optimismgoerli_asset: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_asset'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_assetArgs, MeshContext>,
  /** null **/
  optimismgoerli_assets: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_assets'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_assetsArgs, MeshContext>,
  /** null **/
  optimismgoerli_assetBalance: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_assetBalance'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  optimismgoerli_assetBalances: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_assetBalances'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  optimismgoerli_router: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_router'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_routerArgs, MeshContext>,
  /** null **/
  optimismgoerli_routers: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_routers'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_routersArgs, MeshContext>,
  /** null **/
  optimismgoerli_setting: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_setting'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_settingArgs, MeshContext>,
  /** null **/
  optimismgoerli_settings: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_settings'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_settingsArgs, MeshContext>,
  /** null **/
  optimismgoerli_relayer: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_relayer'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_relayerArgs, MeshContext>,
  /** null **/
  optimismgoerli_relayers: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_relayers'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_relayersArgs, MeshContext>,
  /** null **/
  optimismgoerli_sequencer: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_sequencer'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_sequencerArgs, MeshContext>,
  /** null **/
  optimismgoerli_sequencers: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_sequencers'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_sequencersArgs, MeshContext>,
  /** null **/
  optimismgoerli_stableSwap: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_stableSwap'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_stableSwapArgs, MeshContext>,
  /** null **/
  optimismgoerli_stableSwaps: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_stableSwaps'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  optimismgoerli_originTransfer: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_originTransfer'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_originTransferArgs, MeshContext>,
  /** null **/
  optimismgoerli_originTransfers: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_originTransfers'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_originTransfersArgs, MeshContext>,
  /** null **/
  optimismgoerli_destinationTransfer: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_destinationTransfer'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  optimismgoerli_destinationTransfers: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_destinationTransfers'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_destinationTransfersArgs, MeshContext>,
  /** null **/
  optimismgoerli_originMessage: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_originMessage'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_originMessageArgs, MeshContext>,
  /** null **/
  optimismgoerli_originMessages: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_originMessages'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_originMessagesArgs, MeshContext>,
  /** null **/
  optimismgoerli_destinationMessage: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_destinationMessage'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_destinationMessageArgs, MeshContext>,
  /** null **/
  optimismgoerli_destinationMessages: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_destinationMessages'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_destinationMessagesArgs, MeshContext>,
  /** null **/
  optimismgoerli_aggregateRoot: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_aggregateRoot'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_aggregateRootArgs, MeshContext>,
  /** null **/
  optimismgoerli_aggregateRoots: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_aggregateRoots'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_aggregateRootsArgs, MeshContext>,
  /** null **/
  optimismgoerli_connectorMeta: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_connectorMeta'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_connectorMetaArgs, MeshContext>,
  /** null **/
  optimismgoerli_connectorMetas: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_connectorMetas'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_connectorMetasArgs, MeshContext>,
  /** null **/
  optimismgoerli_rootMessageSent: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_rootMessageSent'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_rootMessageSentArgs, MeshContext>,
  /** null **/
  optimismgoerli_rootMessageSents: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli_rootMessageSents'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli_rootMessageSentsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  optimismgoerli__meta: InContextSdkMethod<ConnextOptimismGoerliTypes.Subscription['optimismgoerli__meta'], ConnextOptimismGoerliTypes.Subscriptionoptimismgoerli__metaArgs, MeshContext>
};
export type ConnextOptimismGoerliContext = {
      ["Connext_OptimismGoerli"]: { Query: QueryConnextOptimismGoerliSdk, Mutation: MutationConnextOptimismGoerliSdk, Subscription: SubscriptionConnextOptimismGoerliSdk },
      
    };