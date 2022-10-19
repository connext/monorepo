// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace HubStagingGoerliTypes {
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
  staginggoerli_BigDecimal: any;
  BigInt: any;
  staginggoerli_Bytes: any;
};

export type staginggoerli_AggregatedMessageRoot = {
  id: Scalars['ID'];
  index: Scalars['BigInt'];
  receivedRoot: Scalars['staginggoerli_Bytes'];
  domain: Scalars['BigInt'];
};

export type staginggoerli_AggregatedMessageRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  receivedRoot?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  receivedRoot_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  receivedRoot_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  receivedRoot_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  receivedRoot_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  receivedRoot_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
};

export type staginggoerli_AggregatedMessageRoot_orderBy =
  | 'id'
  | 'index'
  | 'receivedRoot'
  | 'domain';

export type staginggoerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type staginggoerli_Block_height = {
  hash?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type staginggoerli_OptimismConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['staginggoerli_Bytes'];
  rootManager: Scalars['staginggoerli_Bytes'];
  mirrorConnector: Scalars['staginggoerli_Bytes'];
};

export type staginggoerli_OptimismConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
};

export type staginggoerli_OptimismConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

/** Defines the order direction, either ascending or descending */
export type staginggoerli_OrderDirection =
  | 'asc'
  | 'desc';

export type staginggoerli_PolygonConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['staginggoerli_Bytes'];
  rootManager: Scalars['staginggoerli_Bytes'];
  mirrorConnector: Scalars['staginggoerli_Bytes'];
};

export type staginggoerli_PolygonConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
};

export type staginggoerli_PolygonConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type Query = {
  staginggoerli_rootAggregated?: Maybe<staginggoerli_RootAggregated>;
  staginggoerli_rootAggregateds: Array<staginggoerli_RootAggregated>;
  staginggoerli_rootPropagated?: Maybe<staginggoerli_RootPropagated>;
  staginggoerli_rootPropagateds: Array<staginggoerli_RootPropagated>;
  staginggoerli_aggregatedMessageRoot?: Maybe<staginggoerli_AggregatedMessageRoot>;
  staginggoerli_aggregatedMessageRoots: Array<staginggoerli_AggregatedMessageRoot>;
  staginggoerli_polygonConnectorMeta?: Maybe<staginggoerli_PolygonConnectorMeta>;
  staginggoerli_polygonConnectorMetas: Array<staginggoerli_PolygonConnectorMeta>;
  staginggoerli_optimismConnectorMeta?: Maybe<staginggoerli_OptimismConnectorMeta>;
  staginggoerli_optimismConnectorMetas: Array<staginggoerli_OptimismConnectorMeta>;
  staginggoerli_rootMessageProcessed?: Maybe<staginggoerli_RootMessageProcessed>;
  staginggoerli_rootMessageProcesseds: Array<staginggoerli_RootMessageProcessed>;
  /** Access to subgraph metadata */
  staginggoerli__meta?: Maybe<staginggoerli__Meta_>;
};


export type Querystaginggoerli_rootAggregatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_rootAggregatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_RootAggregated_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_RootAggregated_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_rootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_rootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_RootPropagated_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_RootPropagated_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_aggregatedMessageRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_aggregatedMessageRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_AggregatedMessageRoot_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_AggregatedMessageRoot_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_polygonConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_polygonConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_PolygonConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_PolygonConnectorMeta_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_optimismConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_optimismConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_OptimismConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_OptimismConnectorMeta_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_RootMessageProcessed_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli__metaArgs = {
  block?: InputMaybe<staginggoerli_Block_height>;
};

export type staginggoerli_RootAggregated = {
  id: Scalars['ID'];
  domain: Scalars['BigInt'];
  receivedRoot: Scalars['staginggoerli_Bytes'];
  index: Scalars['BigInt'];
};

export type staginggoerli_RootAggregated_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  receivedRoot?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  receivedRoot_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  receivedRoot_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  receivedRoot_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  receivedRoot_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  receivedRoot_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
};

export type staginggoerli_RootAggregated_orderBy =
  | 'id'
  | 'domain'
  | 'receivedRoot'
  | 'index';

export type staginggoerli_RootMessageProcessed = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  root?: Maybe<Scalars['staginggoerli_Bytes']>;
  caller?: Maybe<Scalars['staginggoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['staginggoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type staginggoerli_RootMessageProcessed_filter = {
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
  root?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  caller?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
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
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
};

export type staginggoerli_RootMessageProcessed_orderBy =
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

export type staginggoerli_RootPropagated = {
  id: Scalars['ID'];
  aggregate: Scalars['staginggoerli_Bytes'];
  domains?: Maybe<Array<Scalars['BigInt']>>;
  count: Scalars['BigInt'];
};

export type staginggoerli_RootPropagated_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregate?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregate_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregate_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  aggregate_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  aggregate_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregate_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  domains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
};

export type staginggoerli_RootPropagated_orderBy =
  | 'id'
  | 'aggregate'
  | 'domains'
  | 'count';

export type Subscription = {
  staginggoerli_rootAggregated?: Maybe<staginggoerli_RootAggregated>;
  staginggoerli_rootAggregateds: Array<staginggoerli_RootAggregated>;
  staginggoerli_rootPropagated?: Maybe<staginggoerli_RootPropagated>;
  staginggoerli_rootPropagateds: Array<staginggoerli_RootPropagated>;
  staginggoerli_aggregatedMessageRoot?: Maybe<staginggoerli_AggregatedMessageRoot>;
  staginggoerli_aggregatedMessageRoots: Array<staginggoerli_AggregatedMessageRoot>;
  staginggoerli_polygonConnectorMeta?: Maybe<staginggoerli_PolygonConnectorMeta>;
  staginggoerli_polygonConnectorMetas: Array<staginggoerli_PolygonConnectorMeta>;
  staginggoerli_optimismConnectorMeta?: Maybe<staginggoerli_OptimismConnectorMeta>;
  staginggoerli_optimismConnectorMetas: Array<staginggoerli_OptimismConnectorMeta>;
  staginggoerli_rootMessageProcessed?: Maybe<staginggoerli_RootMessageProcessed>;
  staginggoerli_rootMessageProcesseds: Array<staginggoerli_RootMessageProcessed>;
  /** Access to subgraph metadata */
  staginggoerli__meta?: Maybe<staginggoerli__Meta_>;
};


export type Subscriptionstaginggoerli_rootAggregatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_rootAggregatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_RootAggregated_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_RootAggregated_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_rootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_rootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_RootPropagated_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_RootPropagated_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_aggregatedMessageRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_aggregatedMessageRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_AggregatedMessageRoot_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_AggregatedMessageRoot_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_polygonConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_polygonConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_PolygonConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_PolygonConnectorMeta_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_optimismConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_optimismConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_OptimismConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_OptimismConnectorMeta_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_RootMessageProcessed_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli__metaArgs = {
  block?: InputMaybe<staginggoerli_Block_height>;
};

export type staginggoerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['staginggoerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type staginggoerli__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: staginggoerli__Block_;
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
  staginggoerli_rootAggregated: InContextSdkMethod<Query['staginggoerli_rootAggregated'], Querystaginggoerli_rootAggregatedArgs, MeshContext>,
  /** null **/
  staginggoerli_rootAggregateds: InContextSdkMethod<Query['staginggoerli_rootAggregateds'], Querystaginggoerli_rootAggregatedsArgs, MeshContext>,
  /** null **/
  staginggoerli_rootPropagated: InContextSdkMethod<Query['staginggoerli_rootPropagated'], Querystaginggoerli_rootPropagatedArgs, MeshContext>,
  /** null **/
  staginggoerli_rootPropagateds: InContextSdkMethod<Query['staginggoerli_rootPropagateds'], Querystaginggoerli_rootPropagatedsArgs, MeshContext>,
  /** null **/
  staginggoerli_aggregatedMessageRoot: InContextSdkMethod<Query['staginggoerli_aggregatedMessageRoot'], Querystaginggoerli_aggregatedMessageRootArgs, MeshContext>,
  /** null **/
  staginggoerli_aggregatedMessageRoots: InContextSdkMethod<Query['staginggoerli_aggregatedMessageRoots'], Querystaginggoerli_aggregatedMessageRootsArgs, MeshContext>,
  /** null **/
  staginggoerli_polygonConnectorMeta: InContextSdkMethod<Query['staginggoerli_polygonConnectorMeta'], Querystaginggoerli_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  staginggoerli_polygonConnectorMetas: InContextSdkMethod<Query['staginggoerli_polygonConnectorMetas'], Querystaginggoerli_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  staginggoerli_optimismConnectorMeta: InContextSdkMethod<Query['staginggoerli_optimismConnectorMeta'], Querystaginggoerli_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  staginggoerli_optimismConnectorMetas: InContextSdkMethod<Query['staginggoerli_optimismConnectorMetas'], Querystaginggoerli_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  staginggoerli_rootMessageProcessed: InContextSdkMethod<Query['staginggoerli_rootMessageProcessed'], Querystaginggoerli_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  staginggoerli_rootMessageProcesseds: InContextSdkMethod<Query['staginggoerli_rootMessageProcesseds'], Querystaginggoerli_rootMessageProcessedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  staginggoerli__meta: InContextSdkMethod<Query['staginggoerli__meta'], Querystaginggoerli__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  staginggoerli_rootAggregated: InContextSdkMethod<Subscription['staginggoerli_rootAggregated'], Subscriptionstaginggoerli_rootAggregatedArgs, MeshContext>,
  /** null **/
  staginggoerli_rootAggregateds: InContextSdkMethod<Subscription['staginggoerli_rootAggregateds'], Subscriptionstaginggoerli_rootAggregatedsArgs, MeshContext>,
  /** null **/
  staginggoerli_rootPropagated: InContextSdkMethod<Subscription['staginggoerli_rootPropagated'], Subscriptionstaginggoerli_rootPropagatedArgs, MeshContext>,
  /** null **/
  staginggoerli_rootPropagateds: InContextSdkMethod<Subscription['staginggoerli_rootPropagateds'], Subscriptionstaginggoerli_rootPropagatedsArgs, MeshContext>,
  /** null **/
  staginggoerli_aggregatedMessageRoot: InContextSdkMethod<Subscription['staginggoerli_aggregatedMessageRoot'], Subscriptionstaginggoerli_aggregatedMessageRootArgs, MeshContext>,
  /** null **/
  staginggoerli_aggregatedMessageRoots: InContextSdkMethod<Subscription['staginggoerli_aggregatedMessageRoots'], Subscriptionstaginggoerli_aggregatedMessageRootsArgs, MeshContext>,
  /** null **/
  staginggoerli_polygonConnectorMeta: InContextSdkMethod<Subscription['staginggoerli_polygonConnectorMeta'], Subscriptionstaginggoerli_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  staginggoerli_polygonConnectorMetas: InContextSdkMethod<Subscription['staginggoerli_polygonConnectorMetas'], Subscriptionstaginggoerli_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  staginggoerli_optimismConnectorMeta: InContextSdkMethod<Subscription['staginggoerli_optimismConnectorMeta'], Subscriptionstaginggoerli_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  staginggoerli_optimismConnectorMetas: InContextSdkMethod<Subscription['staginggoerli_optimismConnectorMetas'], Subscriptionstaginggoerli_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  staginggoerli_rootMessageProcessed: InContextSdkMethod<Subscription['staginggoerli_rootMessageProcessed'], Subscriptionstaginggoerli_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  staginggoerli_rootMessageProcesseds: InContextSdkMethod<Subscription['staginggoerli_rootMessageProcesseds'], Subscriptionstaginggoerli_rootMessageProcessedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  staginggoerli__meta: InContextSdkMethod<Subscription['staginggoerli__meta'], Subscriptionstaginggoerli__metaArgs, MeshContext>
  };

  export type Context = {
      ["Hub_Staging_Goerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
