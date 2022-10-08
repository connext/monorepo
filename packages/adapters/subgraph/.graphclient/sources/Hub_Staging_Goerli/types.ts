
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
  staginggoerlihub_BigDecimal: any;
  BigInt: bigint;
  staginggoerlihub_Bytes: any;
};

export type staginggoerlihub_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type staginggoerlihub_Block_height = {
  hash?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type staginggoerlihub_OptimismConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['staginggoerlihub_Bytes'];
  rootManager: Scalars['staginggoerlihub_Bytes'];
  mirrorConnector: Scalars['staginggoerlihub_Bytes'];
};

export type staginggoerlihub_OptimismConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  amb_not?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['staginggoerlihub_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['staginggoerlihub_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  rootManager?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['staginggoerlihub_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['staginggoerlihub_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['staginggoerlihub_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['staginggoerlihub_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerlihub_BlockChangedFilter>;
};

export type staginggoerlihub_OptimismConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

/** Defines the order direction, either ascending or descending */
export type staginggoerlihub_OrderDirection =
  | 'asc'
  | 'desc';

export type staginggoerlihub_PolygonConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['staginggoerlihub_Bytes'];
  rootManager: Scalars['staginggoerlihub_Bytes'];
  mirrorConnector: Scalars['staginggoerlihub_Bytes'];
};

export type staginggoerlihub_PolygonConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  amb_not?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['staginggoerlihub_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['staginggoerlihub_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  rootManager?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['staginggoerlihub_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['staginggoerlihub_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['staginggoerlihub_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['staginggoerlihub_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerlihub_BlockChangedFilter>;
};

export type staginggoerlihub_PolygonConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type Query = {
  staginggoerlihub_rootAggregated?: Maybe<staginggoerlihub_RootAggregated>;
  staginggoerlihub_rootAggregateds: Array<staginggoerlihub_RootAggregated>;
  staginggoerlihub_rootPropagated?: Maybe<staginggoerlihub_RootPropagated>;
  staginggoerlihub_rootPropagateds: Array<staginggoerlihub_RootPropagated>;
  staginggoerlihub_polygonConnectorMeta?: Maybe<staginggoerlihub_PolygonConnectorMeta>;
  staginggoerlihub_polygonConnectorMetas: Array<staginggoerlihub_PolygonConnectorMeta>;
  staginggoerlihub_optimismConnectorMeta?: Maybe<staginggoerlihub_OptimismConnectorMeta>;
  staginggoerlihub_optimismConnectorMetas: Array<staginggoerlihub_OptimismConnectorMeta>;
  staginggoerlihub_rootMessageProcessed?: Maybe<staginggoerlihub_RootMessageProcessed>;
  staginggoerlihub_rootMessageProcesseds: Array<staginggoerlihub_RootMessageProcessed>;
  /** Access to subgraph metadata */
  staginggoerlihub__meta?: Maybe<staginggoerlihub__Meta_>;
};


export type Querystaginggoerlihub_rootAggregatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerlihub_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerlihub_rootAggregatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerlihub_RootAggregated_orderBy>;
  orderDirection?: InputMaybe<staginggoerlihub_OrderDirection>;
  where?: InputMaybe<staginggoerlihub_RootAggregated_filter>;
  block?: InputMaybe<staginggoerlihub_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerlihub_rootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerlihub_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerlihub_rootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerlihub_RootPropagated_orderBy>;
  orderDirection?: InputMaybe<staginggoerlihub_OrderDirection>;
  where?: InputMaybe<staginggoerlihub_RootPropagated_filter>;
  block?: InputMaybe<staginggoerlihub_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerlihub_polygonConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerlihub_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerlihub_polygonConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerlihub_PolygonConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<staginggoerlihub_OrderDirection>;
  where?: InputMaybe<staginggoerlihub_PolygonConnectorMeta_filter>;
  block?: InputMaybe<staginggoerlihub_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerlihub_optimismConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerlihub_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerlihub_optimismConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerlihub_OptimismConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<staginggoerlihub_OrderDirection>;
  where?: InputMaybe<staginggoerlihub_OptimismConnectorMeta_filter>;
  block?: InputMaybe<staginggoerlihub_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerlihub_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerlihub_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerlihub_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerlihub_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<staginggoerlihub_OrderDirection>;
  where?: InputMaybe<staginggoerlihub_RootMessageProcessed_filter>;
  block?: InputMaybe<staginggoerlihub_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerlihub__metaArgs = {
  block?: InputMaybe<staginggoerlihub_Block_height>;
};

export type staginggoerlihub_RootAggregated = {
  id: Scalars['ID'];
  domain: Scalars['BigInt'];
  receivedRoot: Scalars['staginggoerlihub_Bytes'];
  index: Scalars['BigInt'];
};

export type staginggoerlihub_RootAggregated_filter = {
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
  receivedRoot?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  receivedRoot_not?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  receivedRoot_in?: InputMaybe<Array<Scalars['staginggoerlihub_Bytes']>>;
  receivedRoot_not_in?: InputMaybe<Array<Scalars['staginggoerlihub_Bytes']>>;
  receivedRoot_contains?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  receivedRoot_not_contains?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerlihub_BlockChangedFilter>;
};

export type staginggoerlihub_RootAggregated_orderBy =
  | 'id'
  | 'domain'
  | 'receivedRoot'
  | 'index';

export type staginggoerlihub_RootMessageProcessed = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  root?: Maybe<Scalars['staginggoerlihub_Bytes']>;
  caller?: Maybe<Scalars['staginggoerlihub_Bytes']>;
  transactionHash?: Maybe<Scalars['staginggoerlihub_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type staginggoerlihub_RootMessageProcessed_filter = {
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
  root?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  root_not?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['staginggoerlihub_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['staginggoerlihub_Bytes']>>;
  root_contains?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  caller?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  caller_not?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['staginggoerlihub_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['staginggoerlihub_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  transactionHash?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['staginggoerlihub_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['staginggoerlihub_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
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
  _change_block?: InputMaybe<staginggoerlihub_BlockChangedFilter>;
};

export type staginggoerlihub_RootMessageProcessed_orderBy =
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

export type staginggoerlihub_RootPropagated = {
  id: Scalars['ID'];
  aggregate: Scalars['staginggoerlihub_Bytes'];
  domains?: Maybe<Array<Scalars['BigInt']>>;
  count: Scalars['BigInt'];
};

export type staginggoerlihub_RootPropagated_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregate?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  aggregate_not?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  aggregate_in?: InputMaybe<Array<Scalars['staginggoerlihub_Bytes']>>;
  aggregate_not_in?: InputMaybe<Array<Scalars['staginggoerlihub_Bytes']>>;
  aggregate_contains?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
  aggregate_not_contains?: InputMaybe<Scalars['staginggoerlihub_Bytes']>;
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
  _change_block?: InputMaybe<staginggoerlihub_BlockChangedFilter>;
};

export type staginggoerlihub_RootPropagated_orderBy =
  | 'id'
  | 'aggregate'
  | 'domains'
  | 'count';

export type Subscription = {
  staginggoerlihub_rootAggregated?: Maybe<staginggoerlihub_RootAggregated>;
  staginggoerlihub_rootAggregateds: Array<staginggoerlihub_RootAggregated>;
  staginggoerlihub_rootPropagated?: Maybe<staginggoerlihub_RootPropagated>;
  staginggoerlihub_rootPropagateds: Array<staginggoerlihub_RootPropagated>;
  staginggoerlihub_polygonConnectorMeta?: Maybe<staginggoerlihub_PolygonConnectorMeta>;
  staginggoerlihub_polygonConnectorMetas: Array<staginggoerlihub_PolygonConnectorMeta>;
  staginggoerlihub_optimismConnectorMeta?: Maybe<staginggoerlihub_OptimismConnectorMeta>;
  staginggoerlihub_optimismConnectorMetas: Array<staginggoerlihub_OptimismConnectorMeta>;
  staginggoerlihub_rootMessageProcessed?: Maybe<staginggoerlihub_RootMessageProcessed>;
  staginggoerlihub_rootMessageProcesseds: Array<staginggoerlihub_RootMessageProcessed>;
  /** Access to subgraph metadata */
  staginggoerlihub__meta?: Maybe<staginggoerlihub__Meta_>;
};


export type Subscriptionstaginggoerlihub_rootAggregatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerlihub_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerlihub_rootAggregatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerlihub_RootAggregated_orderBy>;
  orderDirection?: InputMaybe<staginggoerlihub_OrderDirection>;
  where?: InputMaybe<staginggoerlihub_RootAggregated_filter>;
  block?: InputMaybe<staginggoerlihub_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerlihub_rootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerlihub_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerlihub_rootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerlihub_RootPropagated_orderBy>;
  orderDirection?: InputMaybe<staginggoerlihub_OrderDirection>;
  where?: InputMaybe<staginggoerlihub_RootPropagated_filter>;
  block?: InputMaybe<staginggoerlihub_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerlihub_polygonConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerlihub_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerlihub_polygonConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerlihub_PolygonConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<staginggoerlihub_OrderDirection>;
  where?: InputMaybe<staginggoerlihub_PolygonConnectorMeta_filter>;
  block?: InputMaybe<staginggoerlihub_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerlihub_optimismConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerlihub_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerlihub_optimismConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerlihub_OptimismConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<staginggoerlihub_OrderDirection>;
  where?: InputMaybe<staginggoerlihub_OptimismConnectorMeta_filter>;
  block?: InputMaybe<staginggoerlihub_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerlihub_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerlihub_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerlihub_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerlihub_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<staginggoerlihub_OrderDirection>;
  where?: InputMaybe<staginggoerlihub_RootMessageProcessed_filter>;
  block?: InputMaybe<staginggoerlihub_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerlihub__metaArgs = {
  block?: InputMaybe<staginggoerlihub_Block_height>;
};

export type staginggoerlihub__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['staginggoerlihub_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type staginggoerlihub__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: staginggoerlihub__Block_;
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
export type QueryHubStagingGoerliSdk = {
  /** null **/
  staginggoerlihub_rootAggregated: InContextSdkMethod<HubStagingGoerliTypes.Query['staginggoerlihub_rootAggregated'], HubStagingGoerliTypes.Querystaginggoerlihub_rootAggregatedArgs, MeshContext>,
  /** null **/
  staginggoerlihub_rootAggregateds: InContextSdkMethod<HubStagingGoerliTypes.Query['staginggoerlihub_rootAggregateds'], HubStagingGoerliTypes.Querystaginggoerlihub_rootAggregatedsArgs, MeshContext>,
  /** null **/
  staginggoerlihub_rootPropagated: InContextSdkMethod<HubStagingGoerliTypes.Query['staginggoerlihub_rootPropagated'], HubStagingGoerliTypes.Querystaginggoerlihub_rootPropagatedArgs, MeshContext>,
  /** null **/
  staginggoerlihub_rootPropagateds: InContextSdkMethod<HubStagingGoerliTypes.Query['staginggoerlihub_rootPropagateds'], HubStagingGoerliTypes.Querystaginggoerlihub_rootPropagatedsArgs, MeshContext>,
  /** null **/
  staginggoerlihub_polygonConnectorMeta: InContextSdkMethod<HubStagingGoerliTypes.Query['staginggoerlihub_polygonConnectorMeta'], HubStagingGoerliTypes.Querystaginggoerlihub_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  staginggoerlihub_polygonConnectorMetas: InContextSdkMethod<HubStagingGoerliTypes.Query['staginggoerlihub_polygonConnectorMetas'], HubStagingGoerliTypes.Querystaginggoerlihub_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  staginggoerlihub_optimismConnectorMeta: InContextSdkMethod<HubStagingGoerliTypes.Query['staginggoerlihub_optimismConnectorMeta'], HubStagingGoerliTypes.Querystaginggoerlihub_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  staginggoerlihub_optimismConnectorMetas: InContextSdkMethod<HubStagingGoerliTypes.Query['staginggoerlihub_optimismConnectorMetas'], HubStagingGoerliTypes.Querystaginggoerlihub_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  staginggoerlihub_rootMessageProcessed: InContextSdkMethod<HubStagingGoerliTypes.Query['staginggoerlihub_rootMessageProcessed'], HubStagingGoerliTypes.Querystaginggoerlihub_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  staginggoerlihub_rootMessageProcesseds: InContextSdkMethod<HubStagingGoerliTypes.Query['staginggoerlihub_rootMessageProcesseds'], HubStagingGoerliTypes.Querystaginggoerlihub_rootMessageProcessedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  staginggoerlihub__meta: InContextSdkMethod<HubStagingGoerliTypes.Query['staginggoerlihub__meta'], HubStagingGoerliTypes.Querystaginggoerlihub__metaArgs, MeshContext>
};

export type MutationHubStagingGoerliSdk = {

};

export type SubscriptionHubStagingGoerliSdk = {
  /** null **/
  staginggoerlihub_rootAggregated: InContextSdkMethod<HubStagingGoerliTypes.Subscription['staginggoerlihub_rootAggregated'], HubStagingGoerliTypes.Subscriptionstaginggoerlihub_rootAggregatedArgs, MeshContext>,
  /** null **/
  staginggoerlihub_rootAggregateds: InContextSdkMethod<HubStagingGoerliTypes.Subscription['staginggoerlihub_rootAggregateds'], HubStagingGoerliTypes.Subscriptionstaginggoerlihub_rootAggregatedsArgs, MeshContext>,
  /** null **/
  staginggoerlihub_rootPropagated: InContextSdkMethod<HubStagingGoerliTypes.Subscription['staginggoerlihub_rootPropagated'], HubStagingGoerliTypes.Subscriptionstaginggoerlihub_rootPropagatedArgs, MeshContext>,
  /** null **/
  staginggoerlihub_rootPropagateds: InContextSdkMethod<HubStagingGoerliTypes.Subscription['staginggoerlihub_rootPropagateds'], HubStagingGoerliTypes.Subscriptionstaginggoerlihub_rootPropagatedsArgs, MeshContext>,
  /** null **/
  staginggoerlihub_polygonConnectorMeta: InContextSdkMethod<HubStagingGoerliTypes.Subscription['staginggoerlihub_polygonConnectorMeta'], HubStagingGoerliTypes.Subscriptionstaginggoerlihub_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  staginggoerlihub_polygonConnectorMetas: InContextSdkMethod<HubStagingGoerliTypes.Subscription['staginggoerlihub_polygonConnectorMetas'], HubStagingGoerliTypes.Subscriptionstaginggoerlihub_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  staginggoerlihub_optimismConnectorMeta: InContextSdkMethod<HubStagingGoerliTypes.Subscription['staginggoerlihub_optimismConnectorMeta'], HubStagingGoerliTypes.Subscriptionstaginggoerlihub_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  staginggoerlihub_optimismConnectorMetas: InContextSdkMethod<HubStagingGoerliTypes.Subscription['staginggoerlihub_optimismConnectorMetas'], HubStagingGoerliTypes.Subscriptionstaginggoerlihub_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  staginggoerlihub_rootMessageProcessed: InContextSdkMethod<HubStagingGoerliTypes.Subscription['staginggoerlihub_rootMessageProcessed'], HubStagingGoerliTypes.Subscriptionstaginggoerlihub_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  staginggoerlihub_rootMessageProcesseds: InContextSdkMethod<HubStagingGoerliTypes.Subscription['staginggoerlihub_rootMessageProcesseds'], HubStagingGoerliTypes.Subscriptionstaginggoerlihub_rootMessageProcessedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  staginggoerlihub__meta: InContextSdkMethod<HubStagingGoerliTypes.Subscription['staginggoerlihub__meta'], HubStagingGoerliTypes.Subscriptionstaginggoerlihub__metaArgs, MeshContext>
};
export type HubStagingGoerliContext = {
      ["Hub_Staging_Goerli"]: { Query: QueryHubStagingGoerliSdk, Mutation: MutationHubStagingGoerliSdk, Subscription: SubscriptionHubStagingGoerliSdk },
      
    };