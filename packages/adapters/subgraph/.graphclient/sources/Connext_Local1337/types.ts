// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextLocal1337Types {
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
  local1337_BigDecimal: any;
  BigInt: any;
  local1337_Bytes: any;
};

export type local1337_AggregatedMessageRoot = {
  id: Scalars['ID'];
  index: Scalars['BigInt'];
  receivedRoot: Scalars['local1337_Bytes'];
  domain: Scalars['BigInt'];
};

export type local1337_AggregatedMessageRoot_filter = {
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
  receivedRoot?: InputMaybe<Scalars['local1337_Bytes']>;
  receivedRoot_not?: InputMaybe<Scalars['local1337_Bytes']>;
  receivedRoot_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  receivedRoot_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  receivedRoot_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  receivedRoot_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1337_BlockChangedFilter>;
};

export type local1337_AggregatedMessageRoot_orderBy =
  | 'id'
  | 'index'
  | 'receivedRoot'
  | 'domain';

export type local1337_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type local1337_Block_height = {
  hash?: InputMaybe<Scalars['local1337_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type local1337_OptimismConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['local1337_Bytes'];
  rootManager: Scalars['local1337_Bytes'];
  mirrorConnector: Scalars['local1337_Bytes'];
};

export type local1337_OptimismConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['local1337_Bytes']>;
  amb_not?: InputMaybe<Scalars['local1337_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  rootManager?: InputMaybe<Scalars['local1337_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['local1337_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['local1337_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['local1337_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1337_BlockChangedFilter>;
};

export type local1337_OptimismConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

/** Defines the order direction, either ascending or descending */
export type local1337_OrderDirection =
  | 'asc'
  | 'desc';

export type local1337_PolygonConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['local1337_Bytes'];
  rootManager: Scalars['local1337_Bytes'];
  mirrorConnector: Scalars['local1337_Bytes'];
};

export type local1337_PolygonConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['local1337_Bytes']>;
  amb_not?: InputMaybe<Scalars['local1337_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  rootManager?: InputMaybe<Scalars['local1337_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['local1337_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['local1337_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['local1337_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1337_BlockChangedFilter>;
};

export type local1337_PolygonConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type Query = {
  local1337_rootAggregated?: Maybe<local1337_RootAggregated>;
  local1337_rootAggregateds: Array<local1337_RootAggregated>;
  local1337_rootPropagated?: Maybe<local1337_RootPropagated>;
  local1337_rootPropagateds: Array<local1337_RootPropagated>;
  local1337_aggregatedMessageRoot?: Maybe<local1337_AggregatedMessageRoot>;
  local1337_aggregatedMessageRoots: Array<local1337_AggregatedMessageRoot>;
  local1337_polygonConnectorMeta?: Maybe<local1337_PolygonConnectorMeta>;
  local1337_polygonConnectorMetas: Array<local1337_PolygonConnectorMeta>;
  local1337_optimismConnectorMeta?: Maybe<local1337_OptimismConnectorMeta>;
  local1337_optimismConnectorMetas: Array<local1337_OptimismConnectorMeta>;
  local1337_rootMessageProcessed?: Maybe<local1337_RootMessageProcessed>;
  local1337_rootMessageProcesseds: Array<local1337_RootMessageProcessed>;
  /** Access to subgraph metadata */
  local1337__meta?: Maybe<local1337__Meta_>;
};


export type Querylocal1337_rootAggregatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_rootAggregatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_RootAggregated_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_RootAggregated_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_rootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_rootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_RootPropagated_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_RootPropagated_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_aggregatedMessageRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_aggregatedMessageRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_AggregatedMessageRoot_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_AggregatedMessageRoot_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_polygonConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_polygonConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_PolygonConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_PolygonConnectorMeta_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_optimismConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_optimismConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_OptimismConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_OptimismConnectorMeta_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_RootMessageProcessed_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocal1337__metaArgs = {
  block?: InputMaybe<local1337_Block_height>;
};

export type local1337_RootAggregated = {
  id: Scalars['ID'];
  domain: Scalars['BigInt'];
  receivedRoot: Scalars['local1337_Bytes'];
  index: Scalars['BigInt'];
};

export type local1337_RootAggregated_filter = {
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
  receivedRoot?: InputMaybe<Scalars['local1337_Bytes']>;
  receivedRoot_not?: InputMaybe<Scalars['local1337_Bytes']>;
  receivedRoot_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  receivedRoot_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  receivedRoot_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  receivedRoot_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<local1337_BlockChangedFilter>;
};

export type local1337_RootAggregated_orderBy =
  | 'id'
  | 'domain'
  | 'receivedRoot'
  | 'index';

export type local1337_RootMessageProcessed = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  root?: Maybe<Scalars['local1337_Bytes']>;
  caller?: Maybe<Scalars['local1337_Bytes']>;
  transactionHash?: Maybe<Scalars['local1337_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type local1337_RootMessageProcessed_filter = {
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
  root?: InputMaybe<Scalars['local1337_Bytes']>;
  root_not?: InputMaybe<Scalars['local1337_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  root_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  caller?: InputMaybe<Scalars['local1337_Bytes']>;
  caller_not?: InputMaybe<Scalars['local1337_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  transactionHash?: InputMaybe<Scalars['local1337_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['local1337_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
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
  _change_block?: InputMaybe<local1337_BlockChangedFilter>;
};

export type local1337_RootMessageProcessed_orderBy =
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

export type local1337_RootPropagated = {
  id: Scalars['ID'];
  aggregate: Scalars['local1337_Bytes'];
  domains?: Maybe<Array<Scalars['BigInt']>>;
  count: Scalars['BigInt'];
};

export type local1337_RootPropagated_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregate?: InputMaybe<Scalars['local1337_Bytes']>;
  aggregate_not?: InputMaybe<Scalars['local1337_Bytes']>;
  aggregate_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  aggregate_not_in?: InputMaybe<Array<Scalars['local1337_Bytes']>>;
  aggregate_contains?: InputMaybe<Scalars['local1337_Bytes']>;
  aggregate_not_contains?: InputMaybe<Scalars['local1337_Bytes']>;
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
  _change_block?: InputMaybe<local1337_BlockChangedFilter>;
};

export type local1337_RootPropagated_orderBy =
  | 'id'
  | 'aggregate'
  | 'domains'
  | 'count';

export type Subscription = {
  local1337_rootAggregated?: Maybe<local1337_RootAggregated>;
  local1337_rootAggregateds: Array<local1337_RootAggregated>;
  local1337_rootPropagated?: Maybe<local1337_RootPropagated>;
  local1337_rootPropagateds: Array<local1337_RootPropagated>;
  local1337_aggregatedMessageRoot?: Maybe<local1337_AggregatedMessageRoot>;
  local1337_aggregatedMessageRoots: Array<local1337_AggregatedMessageRoot>;
  local1337_polygonConnectorMeta?: Maybe<local1337_PolygonConnectorMeta>;
  local1337_polygonConnectorMetas: Array<local1337_PolygonConnectorMeta>;
  local1337_optimismConnectorMeta?: Maybe<local1337_OptimismConnectorMeta>;
  local1337_optimismConnectorMetas: Array<local1337_OptimismConnectorMeta>;
  local1337_rootMessageProcessed?: Maybe<local1337_RootMessageProcessed>;
  local1337_rootMessageProcesseds: Array<local1337_RootMessageProcessed>;
  /** Access to subgraph metadata */
  local1337__meta?: Maybe<local1337__Meta_>;
};


export type Subscriptionlocal1337_rootAggregatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_rootAggregatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_RootAggregated_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_RootAggregated_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_rootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_rootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_RootPropagated_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_RootPropagated_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_aggregatedMessageRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_aggregatedMessageRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_AggregatedMessageRoot_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_AggregatedMessageRoot_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_polygonConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_polygonConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_PolygonConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_PolygonConnectorMeta_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_optimismConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_optimismConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_OptimismConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_OptimismConnectorMeta_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<local1337_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<local1337_OrderDirection>;
  where?: InputMaybe<local1337_RootMessageProcessed_filter>;
  block?: InputMaybe<local1337_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocal1337__metaArgs = {
  block?: InputMaybe<local1337_Block_height>;
};

export type local1337__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['local1337_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type local1337__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: local1337__Block_;
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
  local1337_rootAggregated: InContextSdkMethod<Query['local1337_rootAggregated'], Querylocal1337_rootAggregatedArgs, MeshContext>,
  /** null **/
  local1337_rootAggregateds: InContextSdkMethod<Query['local1337_rootAggregateds'], Querylocal1337_rootAggregatedsArgs, MeshContext>,
  /** null **/
  local1337_rootPropagated: InContextSdkMethod<Query['local1337_rootPropagated'], Querylocal1337_rootPropagatedArgs, MeshContext>,
  /** null **/
  local1337_rootPropagateds: InContextSdkMethod<Query['local1337_rootPropagateds'], Querylocal1337_rootPropagatedsArgs, MeshContext>,
  /** null **/
  local1337_aggregatedMessageRoot: InContextSdkMethod<Query['local1337_aggregatedMessageRoot'], Querylocal1337_aggregatedMessageRootArgs, MeshContext>,
  /** null **/
  local1337_aggregatedMessageRoots: InContextSdkMethod<Query['local1337_aggregatedMessageRoots'], Querylocal1337_aggregatedMessageRootsArgs, MeshContext>,
  /** null **/
  local1337_polygonConnectorMeta: InContextSdkMethod<Query['local1337_polygonConnectorMeta'], Querylocal1337_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  local1337_polygonConnectorMetas: InContextSdkMethod<Query['local1337_polygonConnectorMetas'], Querylocal1337_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  local1337_optimismConnectorMeta: InContextSdkMethod<Query['local1337_optimismConnectorMeta'], Querylocal1337_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  local1337_optimismConnectorMetas: InContextSdkMethod<Query['local1337_optimismConnectorMetas'], Querylocal1337_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  local1337_rootMessageProcessed: InContextSdkMethod<Query['local1337_rootMessageProcessed'], Querylocal1337_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  local1337_rootMessageProcesseds: InContextSdkMethod<Query['local1337_rootMessageProcesseds'], Querylocal1337_rootMessageProcessedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  local1337__meta: InContextSdkMethod<Query['local1337__meta'], Querylocal1337__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  local1337_rootAggregated: InContextSdkMethod<Subscription['local1337_rootAggregated'], Subscriptionlocal1337_rootAggregatedArgs, MeshContext>,
  /** null **/
  local1337_rootAggregateds: InContextSdkMethod<Subscription['local1337_rootAggregateds'], Subscriptionlocal1337_rootAggregatedsArgs, MeshContext>,
  /** null **/
  local1337_rootPropagated: InContextSdkMethod<Subscription['local1337_rootPropagated'], Subscriptionlocal1337_rootPropagatedArgs, MeshContext>,
  /** null **/
  local1337_rootPropagateds: InContextSdkMethod<Subscription['local1337_rootPropagateds'], Subscriptionlocal1337_rootPropagatedsArgs, MeshContext>,
  /** null **/
  local1337_aggregatedMessageRoot: InContextSdkMethod<Subscription['local1337_aggregatedMessageRoot'], Subscriptionlocal1337_aggregatedMessageRootArgs, MeshContext>,
  /** null **/
  local1337_aggregatedMessageRoots: InContextSdkMethod<Subscription['local1337_aggregatedMessageRoots'], Subscriptionlocal1337_aggregatedMessageRootsArgs, MeshContext>,
  /** null **/
  local1337_polygonConnectorMeta: InContextSdkMethod<Subscription['local1337_polygonConnectorMeta'], Subscriptionlocal1337_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  local1337_polygonConnectorMetas: InContextSdkMethod<Subscription['local1337_polygonConnectorMetas'], Subscriptionlocal1337_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  local1337_optimismConnectorMeta: InContextSdkMethod<Subscription['local1337_optimismConnectorMeta'], Subscriptionlocal1337_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  local1337_optimismConnectorMetas: InContextSdkMethod<Subscription['local1337_optimismConnectorMetas'], Subscriptionlocal1337_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  local1337_rootMessageProcessed: InContextSdkMethod<Subscription['local1337_rootMessageProcessed'], Subscriptionlocal1337_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  local1337_rootMessageProcesseds: InContextSdkMethod<Subscription['local1337_rootMessageProcesseds'], Subscriptionlocal1337_rootMessageProcessedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  local1337__meta: InContextSdkMethod<Subscription['local1337__meta'], Subscriptionlocal1337__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Local1337"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
